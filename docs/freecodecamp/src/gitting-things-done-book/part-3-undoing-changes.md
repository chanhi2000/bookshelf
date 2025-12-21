---
lang: en-US
title: "Part 3 - Undoing Changes"
description: "Article(s) > (4/6) Gitting Things Done - A Visual and Practical Guide to Git [Full Book]"
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
      content: "Article(s) > (4/6) Gitting Things Done - A Visual and Practical Guide to Git [Full Book]"
    - property: og:description
      content: "Part 3 - Undoing Changes"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/gitting-things-done-book/part-3-undoing-changes.html
date: 2024-01-09
isOriginal: false
author:
  - name: Omer Rosenbaum
    url : https://freecodecamp.org/news/author/omerros/
cover: https://freecodecamp.org/news/content/images/2023/12/Gitting-Things-Done-Cover-with-Photo.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Gitting Things Done - A Visual and Practical Guide to Git [Full Book]",
  "desc": "Introduction Git is awesome. Most software developers use Git on a daily basis. But how many truly understand Git? Do you feel like you know what's going on under the hood as you use Git to perform various tasks? For example, what happens when you us...",
  "link": "/freecodecamp.org/gitting-things-done-book/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Gitting Things Done - A Visual and Practical Guide to Git [Full Book]"
  desc="Introduction Git is awesome. Most software developers use Git on a daily basis. But how many truly understand Git? Do you feel like you know what's going on under the hood as you use Git to perform various tasks? For example, what happens when you us..."
  url="https://freecodecamp.org/news/gitting-things-done-book/"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2023/12/Gitting-Things-Done-Cover-with-Photo.png"/>

Did you ever get to a point where you said: "Uh-oh, what did I just do?" I guess you have, just like about anyone who uses Git.

Perhaps you committed to the wrong branch. Perhaps you lost some code that you had written. Perhaps you committed something that you didn't mean to.

This part will give you the tools to rewrite history with confidence, thereby "undoing" all kinds of changes in Git. 

Just like the other parts of the book, this part will be practical yet in-depth - so instead of providing you with a list of things to do when things go wrong, we will understand the underlying mechanisms, so that you will feel confident whenever you get to the "uh-oh" moment. Actually, you will find these moments as opportunities for an interesting challenge, rather than a dreadful scenario.

---

## Chapter 9 - Git Reset

Our journey starts with a powerful command that can be used to undo many different actions with Git - `git reset`.

### A Short Reminder - Recording Changes

In [chapter 3](#heading-chapter-3-how-to-record-changes-in-git), you learned how to record changes in Git. If you remember everything from this part, feel free to jump to the next section.

It is very useful to think about Git as a system for recording snapshots of a filesystem in time. Considering a Git repository, it has three "states" or "trees":

1. The **working directory**, a directory that has a repository associated with it.
2. The **staging area (index)** which holds the tree for the next commit.
3. The **repository**, which is a collection of commits and references.

![The three "trees" of a Git repo](https://freecodecamp.org/news/content/images/2023/12/3_trees.png)

Note regarding the drawing conventions I use: I include `.git` within the working directory, to remind you that it is a folder within the project's folder on the filesystem. The `.git` folder actually contains the objects and references of the repository, as explained in [chapter 4](#heading-chapter-4-how-to-create-a-repo-from-scratch).

#### Hands-on Demonstration

Use `git init` to initialize a new repository. Write some text into a file called `1.txt`:

```sh
mkdir my_repo
cd my_repo
git init
echo Hello world > 1.txt
````

Out of the three tree states described above, where is `1.txt` now?

In the working tree, as it hasn't yet been introduced to the index.

![The file  is now a part of the working dir only](https://freecodecamp.org/news/content/images/2023/12/1_txt_working_dir.png) *The file `1.txt` is now a part of the working dir only*

In order to *stage* it, to *add* it to the index, use:

```sh
git add 1.txt
```

![Using  stages the file so it is now in the index as well](https://freecodecamp.org/news/content/images/2023/12/1_txt_index.png) *Using `git add` stages the file so it is now in the index as well*

Notice that once you stage `1.txt`, Git creates a blob object with the content of this file, and adds it to the internal object database (within `.git` folder), as covered in [chapter 3](#heading-chapter-3-how-to-record-changes-in-git) and [chapter 4](#heading-chapter-4-how-to-create-a-repo-from-scratch). I do not draw it as part of the "repository" as in this representation, the "repository" refers to a tree of commits and their references, and this blob has not been a part of any commit.

Now, use `git commit` to commit your changes to the repository:

```sh
git commit -m "Commit 1"
```

![Using  creates a commit object in the repository](https://freecodecamp.org/news/content/images/2023/12/commit_1.png) *Using `git commit` creates a commit object in the repository*

You created a new **commit** object, which includes a pointer to a **tree** describing the entire **working tree**. In this case, this tree consists only of `1.txt` within the root folder. In addition to a pointer to the tree, the commit object includes metadata, such as timestamps and author information.

When considering the diagrams, notice that we only have a single copy of the file `1.txt` on disk, and a corresponding blob object in Git's object database. The "repository" tree now shows this file as it is part of the active commit - that is, the commit object "Commit 1" points to a tree that points to the blob with the contents of `1.txt`, the same blob that the index is pointing to.

For more information about the objects in Git (such as commits and trees), refer to [chapter 1](#heading-chapter-1-git-objects).

Next, create a new file, and add it to the index, as before:

```sh
echo second file > 2.txt
git add 2.txt
```

![The file  is in the working dir and the index after staging it with ](https://freecodecamp.org/news/content/images/2023/12/2_txt_index.png) *The file `2.txt` is in the working dir and the index after staging it with `git add`*

Next, commit:

```sh
git commit -m "Commit 2"
```

Importantly, `git commit` does two things:

First, it creates a **commit object**, so there is an object within Git's internal object database with a corresponding SHA-1 value. This new commit object also points to the parent commit. That is the commit that `HEAD` was pointing to when you wrote the `git commit` command.

![A new commit object has been created, at first —  still points to the previous commit](https://freecodecamp.org/news/content/images/2023/12/new_commit_object.png) *A new commit object has been created, at first - `main` still points to the previous commit*

Second, `git commit` **moves the pointer of the active branch** — in our case, that would be `main`, to point to the newly created commit object.

![ also updates the active branch to point to the newly created commit object](https://freecodecamp.org/news/content/images/2023/12/commit_updates_active_branch.png) *`git commit` also updates the active branch to point to the newly created commit object*

### Introducing `git reset`

You will now learn how to reverse the process of introducing a commit. For that, you will get to know the command `git reset`.

#### `git reset --soft`

The very last step you did before was to `git commit`, which actually means two things — Git created a commit object and moved `main`, the active branch. To undo this step, use the following command:

```sh
git reset --soft HEAD~1
```

The syntax `HEAD~1` refers to the first parent of `HEAD`. Consider a case where I had more than one commit in the commit-graph, say "Commit 3" pointing to "Commit 2", which is, in turn, pointing to "Commit 1. And consider `HEAD` was pointing to "Commit 3". You could use `HEAD~1` to refer to "Commit 2", and `HEAD~2` would refer to "Commit 1".

So, back to the command: `git reset --soft HEAD~1`

This command asks Git to change whatever `HEAD` is pointing to. (Note: In the diagrams below, I use `*HEAD` for "whatever `HEAD` is pointing to".) In our example, `HEAD` is pointing to `main`. So Git will only change the pointer of `main` to point to `HEAD~1`. That is, `main` will point to "Commit 1".

However, this command did **not** affect the state of the index or the working tree. So if you use `git status` you will see that `2.txt` is staged, just like before you ran `git commit`:

![ shows that  is in the index, but not in the active commit](https://freecodecamp.org/news/content/images/2023/12/git_status_after_reset_soft.png) *`git status` shows that `2.txt` is in the index, but not in the active commit*

The state is now:

![Resetting  to "Commit 1"](https://freecodecamp.org/news/content/images/2023/12/reset_soft_1.png) *Resetting `main` to "Commit 1"*

(Note: I removed `2.txt` from the "repository" in the diagram as it is not part of the active commit - that is, the tree pointed to by "Commit 1" does not reference this file. However, it has not been removed from the file system - as it still exists in the working tree and the index.)

What about `git log`? It will start from `HEAD` , go to `main`, and then to "Commit 1":

![The output of ](https://freecodecamp.org/news/content/images/2023/12/git_log_after_reset_soft.png) *The output of `git log`*

Notice that this means that "Commit 2" is no longer reachable from our history.

Does that mean the commit object of "Commit 2" is deleted?

No, it's not deleted. It still resides within Git's internal object database of objects.

If you push the current history now, by using `git push`, Git will not push "Commit 2" to the remote server (as it is not reachable from the current `HEAD`), but the commit object *still exists* on your local copy of the repository.

Now, commit again - and use the commit message of "Commit 2.1" to differentiate this new object from the original "Commit 2":

```sh
git commit -m "Commit 2.1"
```

This is the resulting state:

![Creating a new commit](https://freecodecamp.org/news/content/images/2023/12/commit_2_1.png) *Creating a new commit*

I omitted "Commit 2" as it is not reachable from `HEAD`, even though its object exists in Git's internal object database.

Why are "Commit 2" and "Commit 2.1" different? Even if we used the same commit message, and even though they point to the same tree object (of the root folder consisting of `1.txt` and `2.txt`), they still have different timestamps, as they were created at different times. Both "Commit 2" and "Commit 2.1" now point to "Commit 1", but only "Commit 2.1" is reachable from `HEAD`.

#### `git reset --mixed`

It's time to undo even further. This time, use:

```sh
git reset --mixed HEAD~1
```

(Note: `--mixed` is the default switch for `git reset`.)

This command starts the same as `git reset --soft HEAD~1`. That is, the command takes the pointer of whatever `HEAD` is pointing to now, which is the `main` branch, and sets it to `HEAD~1`, in our example - "Commit 1".

![The first step of  is the same as ](https://freecodecamp.org/news/content/images/2023/12/git_reset_mixed_1.png) *The first step of `git reset --mixed` is the same as `git reset --soft`*

Next, Git goes further, effectively undoing the changes we made to the index. That is, changing the index so that it matches with the current `HEAD`, the new `HEAD` after setting it in the first step.

If we ran `git reset --mixed HEAD~1`, then `HEAD` (`main`) would be set to `HEAD~1` ("Commit 1"), and then Git would match the index to the state of "Commit 1" - in this case, it means that `2.txt` would no longer be part of the index.

![The second step of  is to match the index with the new ](https://freecodecamp.org/news/content/images/2023/12/git_reset_mixed_2.png) *The second step of `git reset --mixed` is to match the index with the new `HEAD`*

It's time to create a new commit with the state of the original "Commit 2". This time you need to stage `2.txt` again before creating it:

```sh
git add 2.txt
git commit -m "Commit 2.2"
```

![Creating "Commit 2.2"](https://freecodecamp.org/news/content/images/2023/12/commit_2_2.png) *Creating "Commit 2.2"*

Similarly to "Commit 2.1", I "name" this commit "Commit 2.2" to differentiate it from the original "Commit 2" or "Commit 2.1" - these commits result in the same state as the original "Commit 2", but they are different commit objects.

#### `git reset --hard`

Go on, undo even more!

This time, use the `--hard` switch, and run:

```sh
git reset --hard HEAD~1
```

Again, Git starts with the `--soft` stage, setting whatever `HEAD` is pointing to (`main`), to `HEAD~1` ("Commit 1").

![The first step of  is the same as ](https://freecodecamp.org/news/content/images/2023/12/git_reset_hard_1-1.png) *The first step of `git reset --hard` is the same as `git reset --soft`*

Next, moving on to the `--mixed` stage, matching the index with `HEAD`. That is, Git undoes the staging of `2.txt`.

![The second step of  is the same as ](https://freecodecamp.org/news/content/images/2023/12/git_reset_hard_2-1.png) *The second step of `git reset --hard` is the same as `git reset --mixed`*

Next comes the `--hard` step, where Git goes even further and matches the working dir with the stage of the index. In this case, it means removing `2.txt` also from the working dir.

![The third step of  matches the state of the working dir with that of the index](https://freecodecamp.org/news/content/images/2023/12/git_reset_hard_3.png) *The third step of `git reset --hard` matches the state of the working dir with that of the index*

So to introduce a change to Git, you have three steps: you change the working dir, the index, or the staging area, and then you commit a new snapshot with those changes. To undo these changes:

- If we use `git reset --soft`, we undo the commit step.
- If we use `git reset --mixed`, we also undo the staging step.
- If we use `git reset --hard`, we undo the changes to the working dir.

![The three main switches of ](https://freecodecamp.org/news/content/images/2023/12/git_reset_switches.png) *The three main switches of `git reset`*

### Real-Life Scenarios

#### Scenario #1

So in a real-life scenario, write "I love Git" into a file (`love.txt`), as we all love Git 😍. Go ahead, stage and commit this as well:

```sh
echo I love Git > love.txt
git add love.txt
git commit -m "Commit 2.3"
```

![Creating "Commit 2.3"](https://freecodecamp.org/news/content/images/2023/12/commit_2_3.png) *Creating "Commit 2.3"*

Also, save a tag so that you can get back to this commit later if needed:

```sh
git tag scenario-1
```

Oh, oops!

Actually, I didn't want you to commit it.

What I actually wanted you to do is write some more love words in this file before committing it.

What can you do?

Well, one way to overcome this would be to use `git reset --mixed HEAD~1`, effectively undoing both the committing and the staging actions you took:

```sh
git reset --mixed HEAD~1
```

![Undoing the staging and committing steps](https://freecodecamp.org/news/content/images/2023/12/reset_commit_2_3.png) *Undoing the staging and committing steps*

So `main` points to "Commit 1" again, and `love.txt` is no longer a part of the index. However, the file remains in the working dir. You can now add more content to it:

```sh
echo and Gitting Things Done >> love.txt
```

![Adding more love lyrics](https://freecodecamp.org/news/content/images/2023/12/adding_love_lyrics.png) *Adding more love lyrics*

Stage and commit your file:

```sh
git add love.txt
git commit -m "Commit 2.4"
```

![Introducing "Commit 2.4"](https://freecodecamp.org/news/content/images/2023/12/commit_2_4.png) *Introducing "Commit 2.4"*

Well done!

You got this clear, nice history of "Commit 2.4" pointing to "Commit 1".

You now have a new tool in your toolbox, `git reset`.

This tool is super, super useful, and you can accomplish almost anything with it. It's not always the most convenient tool to use, but it's capable of solving almost any rewriting-history scenario if you use it carefully.

For beginners, I recommend using only `git reset` for almost any time you want to undo in Git. Once you feel comfortable with it, move on to other tools.

#### Scenario #2

Let us consider another case.

Create a new file called `new.txt`; stage and commit:

```sh
echo this is a new file > new.txt
git add new.txt
git commit -m "Commit 3"
```

![Creating  and "Commit 3"](https://freecodecamp.org/news/content/images/2023/12/commit_3.png) *Creating `new.txt` and "Commit 3"*

(Note: In the drawing I omitted the files from the repository to avoid clutter. Commit 3 includes `1.txt`, `love.txt` and `new.txt` at this stage).

Oops. Actually, that's a mistake. You were on `main`, and I wanted you to create this commit on a feature branch. My bad 😇

There are two most important tools I want you to take from this chapter. The *second* is `git reset`. The first and by far more important one is to whiteboard the current state versus the state you want to be in.

For this scenario, the current state and the desired state look like so:

![Scenario #2: current-vs-desired states](https://freecodecamp.org/news/content/images/2023/12/scenario_2.png) *Scenario #2: current-vs-desired states*

(Note: In following diagrams, I will refer to the current state as the "original" state - before starting the process of rewriting history.)

You will notice three changes:

1. `main` points to "Commit 3" (the blue one) in the current state, but to "Commit 2.4" in the desired state.
2. `feature_branch` doesn't exist in the current state, yet it exists and points to "Commit 3" in the desired state.
3. `HEAD` points to `main` in the current state, and to `feature_branch` in the desired state.

If you can draw this and you know how to use `git reset`, you can definitely get yourself out of this situation.

So again, the most important thing is to take a breath and draw this out.

Observing the drawing above, how do you get from the current state to the desired one?

There are a few different ways of course, but I will present one option only for each scenario. Feel free to play around with other options as well.

You can start by using `git reset --soft HEAD~1`. This would set `main` to point to the previous commit, "Commit 2.4":

```sh
git reset --soft HEAD~1
```

![Changing ; "Commit 3 is still there, just not reachable from ](https://freecodecamp.org/news/content/images/2023/12/scenario_2_1.png) *Changing `main`: "Commit 3" is still there, just not reachable from `HEAD`*

Peeking at the current-vs-desired diagram again, you can see that you need a new branch, right? You can use `git switch -c feature_branch` for it, or `git checkout -b feature_branch` (which does the same thing):

```sh
git switch -c feature_branch
```

![Creating  branch](https://freecodecamp.org/news/content/images/2023/12/scenario_2_2.png) _Creating `feature_branch` branch_

This command also updates `HEAD` to point to the new branch.

Since you used `git reset --soft`, you didn't change the index, so it currently has exactly the state you want to commit - how convenient! You can simply commit to `feature_branch`:

```sh
git commit -m "Commit 3.1"
```

![Committing to  branch](https://freecodecamp.org/news/content/images/2023/12/commit_3_1.png) _Committing to `feature_branch` branch_

And you got to the desired state.

#### Scenario #3

Ready to apply your knowledge to additional cases?

Still on `feature_branch`, add some changes to `love.txt`, and create a new file called `cool.txt`. Stage them and commit:

```sh
echo Some changes >> love.txt
echo Git is cool > cool.txt
git add love.txt
git add cool.txt
git commit -m "Commit 4"
```

![The history, as well as the state of the index and the working dir after creating "Commit 4"](https://freecodecamp.org/news/content/images/2023/12/commit_4.png) *The history, as well as the state of the index and the working dir after creating "Commit 4"*

Oh, oops, actually I wanted you to create two *separate* commits, one with each change...

Want to try this one yourself (before reading on)?

You can undo the committing and staging steps:

```sh
git reset --mixed HEAD~1
```

Following this command, the index no longer includes those two changes, but they're both still in your file system:

![Resulting state after using ](https://freecodecamp.org/news/content/images/2023/12/reset_commit_4.png) *Resulting state after using `git reset --mixed HEAD~1`*

So now, if you only stage `love.txt`, you can commit it separately:

```sh
git add love.txt
git commit -m "Love"
```

![Resulting state after committing the changes to ](https://freecodecamp.org/news/content/images/2023/12/commit_love.png) *Resulting state after committing the changes to `love.txt`*

Then, do the same for `cool.txt`:

```sh
git add cool.txt
git commit -m "Cool"
```

![Committing separately](https://freecodecamp.org/news/content/images/2023/12/commit_separately.png) *Committing separately*

Nice!

#### Scenario #4

To clear up the state, switch to `main` and use `reset --hard` to make it point to "Commit 3.1", while setting the index and the working dir to the state of "Commit 3.1":

```sh
git checkout main
git reset --hard <SHA_OF_COMMIT_3_1>
```

![Resetting  to "Commit 3.1"](https://freecodecamp.org/news/content/images/2023/12/reset_main_commit_3_1.png) *Resetting `main` to "Commit 3.1"*

Create another file (`another.txt`) with some text, and add some text to `love.txt`. Stage both changes, and commit them:

```sh
echo Another file > another.txt
echo More love >> love.txt
git add another.txt
git add love.txt
git commit -m "Commit 4.1"
```

This should be the result:

![A new commit](https://freecodecamp.org/news/content/images/2023/12/commit_more_changes.png) *A new commit*

Oops...

So this time, I wanted it to be on another branch, but not a new branch, rather - an already-existing branch.

So what can you do?

I'll give you a hint. The answer is really short and really easy. What do we do first?

No, not `reset`. We *draw*. That's the first thing to do, as it would make everything else so much easier. So this is the current state:

![The new commit on  appears blue](https://freecodecamp.org/news/content/images/2023/12/scenario_4.png) *The new commit on `main` appears blue*

And the desired state?

![We want the "blue" commit to be on another, , branch\label{fig-scenario-4-1}](https://freecodecamp.org/news/content/images/2023/12/scenario_4_1-1.png) *We want the "blue" commit to be on another, `existing`, branch*

How do you get from the current state to the desired state, what would be easiest?

One way would be to use `git reset` as you did before, but there is another way that I would like you to try.

Note that the following commands indeed assume the branch `existing` exists on your repository, yet you haven't created it earlier. To match a state where this branch actually exists, you can use the following commands:

```sh
git checkout <SHA_OF_COMMIT_1>
git checkout -b existing
echo "Hello" > x.txt
git add x.txt
git commit -m "Commit X"
git checkout <SHA_OF_COMMIT_3_1> -- love.txt
git commit -m "Commit Y"
git checkout main
```

(The command `git checkout <SHA_OF_COMMIT_3_1> -- love.txt` copies the contents of `love.txt` from "Commit 3.1" to the index and the working dir, so that you can commit it on the `existing` branch. We need the state of `love.txt` on "Commit Y" to be the same as of "Commit 3.1" to avoid conflicts.)

Now your history should match the one shown in the picture with the caption "We want the "blue" commit to be on another, `existing`, branch".

First, move `HEAD` to point to existing branch:

```sh
git switch existing
```

![Switch to the  branch](https://freecodecamp.org/news/content/images/2023/12/switch_existing.png) *Switch to the `existing` branch*

Intuitively, what you want to do is take the changes introduced in "Commit 4.1", and apply these changes ("copy-paste") on top of `existing` branch. And Git has a tool just for that.

To ask Git to take the changes introduced between a commit and its parent commit and just apply these changes on the active branch, you can use `git cherry-pick`, a command we introduced in [chapter 8](#heading-chapter-8-understanding-git-rebase). This command takes the changes introduced in the specified revision and applies them to the state of the active commit. Run:

```sh
git cherry-pick <SHA_OF_COMMIT_4_1>
```

You can specify the SHA-1 identifier of the desired commit, but you can also use `git cherry-pick main`, as the commit whose changes you are applying is the one `main` is pointing to.

`git cherry-pick` also creates a new commit object, and updates the active branch to point to this new object, so the resulting state would be:

![The result after using ](https://freecodecamp.org/news/content/images/2023/12/cherry_pick.png) *The result after using `git cherry-pick`*

I mark the commit as "Commit 4.2" since it has a different timestamp, parent and SHA-1 value than "Commit 4.1", though the changes it introduces are the same.

You made good progress - the desired commit is now on the `existing` branch! But we don't want these changes to exist on `main` branch. `git cherry-pick` only applied the changes to the existing branch. How can you remove them from `main`?

One way would be to switch back to `main`, and then `reset` it:

```sh
git switch main
git reset --hard HEAD~1
```

And the result:

![The resulting state after resetting ](https://freecodecamp.org/news/content/images/2023/12/reset_cherry_pick.png) *The resulting state after resetting `main`*

You did it!

Note that `git cherry-pick` actually computes the difference between the specified commit and its parent, and then applies the difference to the active commit. This means that sometimes, Git won't be able to apply those changes due to a conflict.

Also, note that you can ask Git to `cherry-pick` the changes introduced in any commit, not only commits referenced by a branch.

### Recap - Git Reset

In this chapter, we learned how `git reset` operates, and clarified its three main modes of operation:

- `git reset --soft <commit>`, which changes whatever `HEAD` is pointing to - to `<commit>`.
- `git reset --mixed <commit>`, which goes through the `--soft` stage, and also sets the state of the index to match that of `HEAD`.
- `git reset --hard <commit>`, which goes through the `--soft` and `--mixed` stages, and then sets the state of the working dir to match that of the index.

You then applied your knowledge about `git reset` to solve some real-life issues that arise when using Git.

By understanding the way Git operates, and by whiteboarding the current state versus the desired state, you can confidently tackle all kinds of scenarios.

In the future chapters, we will cover additional Git commands and how they can help us solve all kinds of undesired situations.

---

## Chapter 10 - Additional Tools for Undoing Changes

In the previous chapter, you met `git reset`. Indeed, `git reset` is a super powerful tool, and I highly recommend to use it until you feel completely comfortable with it.

Yet, `git reset` is not the only tool at our disposal. Some of the times, it is not the most convenient tool to use. In others, it's just not enough. This short chapter touches a few tools that are helpful for undoing changes in Git.

### `git commit --amend`

Consider [Scenario #1](https://freecodecamp.org/news/p/f7b355ea-3f22-4613-8218-e95c67779d9f/scenario-1) from the previous chapter again. As a reminder, you wrote "I love Git" into a file (`love.txt`), staged and committed this file:

![Image](https://freecodecamp.org/news/content/images/2023/12/image-52.png) *The state after creating "Commit 2.3"*

And then I realized I didn't want you to commit it at that state, but rather - write some more love words in this file before committing it.

To match this state, simply checkout the tag you created, which points to "Commit 2.3":

```sh
git checkout scenario-1
```

In the previous chapter, when we introduced `git reset`, you solved this issue by using `git reset --mixed HEAD~1`, effectively undoing both the committing and the staging actions you took.

Now I would like you to consider another approach. Keep working at the state of the last introduced commit ("Commit 2.3", referenced by the tag "scenario-1"), and make the changes you want:

```sh
echo And I love this book >> love.txt
```

Add this change to the index:

```sh
git add love.txt
```

Now, you can use `git commit` with the `--amend` switch, which tells it to override the commit `HEAD` is pointing to. Actually, it will create another, new commit, pointing to `HEAD~1` ("Commit 1" in our example), and make `HEAD` point to this newly created commit. By providing the `-m` argument you can specify a new commit message as well:

```sh
git commit --amend -m "Commit 2.4"
```

After running this command, `HEAD` points to `main`, which points to "Commit 2.4", which in turn points to "Commit 1". The previous "Commit 2.3" is no longer reachable from the history.

![Image](https://freecodecamp.org/news/content/images/2023/12/commit_amend-1.png) *The state after using `git commit --amend` (Commit "2.3" is unreachable and thus not included in the drawing)*

This tool is useful when you want to quickly override the last commit you created. Indeed, you could use `git reset` to accomplish the same thing, but you can view `git commit --amend` as a more convenient shortcut.

### `git revert`

Okay, so another day, another problem.

Add the following text to `love.txt`, stage and commit as follows:

```sh
echo This is more tezt >> love.txt
git add love.txt
git commit -m "Commit 3"
```

![Committing "More changes"](https://freecodecamp.org/news/content/images/2023/12/git_revert_1-1.png) *The state after committing "Commit 3"*

And push it to the remote server:

```sh
git push origin HEAD
```

Um, oops 😓…

I just noticed something. I had a typo there. I wrote "This is more tezt" instead of "This is more text". Whoops. So what's the big problem now? I `push`ed, which means that someone else might have already `pull`ed those changes.

If I override those changes by using `git reset`, we will have different histories, and all hell might break loose. You can rewrite your own copy of the repo as much as you like until you `push` it.

Once you `push` the change, you need to be certain no one else has fetched those changes if you are going to rewrite history.

Alternatively, you can use another tool called `git revert`. This command takes the commit you're providing it with and computes the diff from its parent commit, just like `git cherry-pick`, but this time, it computes the *reverse* changes. That is, if in the specified commit you added a line, the reverse would delete the line, and vice versa.

In our case we are reverting "Commit 3", so the reverse would be to delete the line "This is more tezt" from `love.txt`. Since "Commit 3" is referenced by `main` and `HEAD`, we can use any of these named references in this command:

![Using  to undo the changes](https://freecodecamp.org/news/content/images/2023/12/git_revert_2.png) *Using `git revert` to undo the changes*

`git revert` created a new commit object, which means it's an addition to the history. By using `git revert`, you didn't rewrite history. You admitted your past mistake, and this commit is an acknowledgment that you made a mistake and now you fixed it.

Some would say it's the more mature way. Some would say it's not as clean a history as you would get if you used `git reset` to rewrite the previous commit. But this is a way to avoid rewriting history.

You can now fix the typo and commit again:

```sh
echo This is more text >> love.txt
git add love.txt
git commit -m "Commit 3.1"
```

![Redoing the changes](https://freecodecamp.org/news/content/images/2023/12/git_revert_3.png) *The resulting state after redoing the changes*

You can use `git revert` to revert a commit other than `HEAD`. Say that you want to reverse the parent of `HEAD`, you can use:

```sh
git revert HEAD~1
```

Or you could provide the SHA-1 of the commit to revert.

Notice that since Git will apply the reverse patch of the previous patch - this operation might fail, as the patch may no longer apply and you might get a conflict.

### Git Rebase as a Tool for Undoing Things

In [chapter 8](#heading-chapter-8-understanding-git-rebase), you learned about Git rebase. We then considered it mainly as a tool to combine changes introduced in different branches. Yet, as long as you haven't `push`ed your changes, using `rebase` on your own branch can be a very convenient way to rearrange your commit history.

For that, you would usually [rebase on a single branch](#heading-how-to-rebase-on-a-single-branch), and use interactive rebase. Consider again this example covered in [chapter 8](#heading-chapter-8-understanding-git-rebase), where I worked from `feature_branch_2`, and specifically edited the file `code.py`. I started by changing all strings to be wrapped by double quotes rather than single quotes:

![Changing  into  in ](https://freecodecamp.org/news/content/images/2023/12/code_py_4-1.png) *Changing `'` into `"` in `code.py`*

Then, I staged and committed:

```sh
git add code.py
git commit -m "Commit 17"
```

I then decided to add a new function at the beginning of the file:

![Adding the function ](https://freecodecamp.org/news/content/images/2023/12/code_py_5-1.png) _Adding the function `another_feature`_

Again, I staged and committed:

```sh
git add code.py
git commit -m "Commit 18"
```

And now I realized I actually forgot to change the single quotes to double quotes wrapping the `__main__` (as you might have noticed), so I did that too:

![Changing  into ](https://freecodecamp.org/news/content/images/2023/12/code_py_6-1.png) *Changing `'__main__'` into `"__main__"`*

Of course, I staged and committed this change:

```sh
git add code.py
git commit -m "Commit 19"
```

Now, consider the history:

![The commit history after introducing "Commit 19"](https://freecodecamp.org/news/content/images/2023/12/history_after_commit_19-1.png) *The commit history after introducing "Commit 19"*

As explained in [chapter 8](#heading-chapter-8-understanding-git-rebase), I got to a state with two commits that are related to one another, "Commit 17" and "Commit 19" (turning `'`s into `"`s), but they are split by the unrelated "Commit 18" (where I added a new function).

This is a classic case where `git rebase` would come in handy, to undo the local changes before `push`ing a clean history.

Intuitively, I want to edit the history here:

![These are the commits I want to edit](https://freecodecamp.org/news/content/images/2023/12/plan_edit_commits_17_18-1.png) *These are the commits I want to edit*

I can `rebase` the history from "Commit 17" to "Commit 19", on top of "Commit 15". To do that:

```sh
git rebase --interactive --onto <SHA_OF_COMMIT_15> <SHA_OF_COMMIT_15>
```

![Using  on a single branch](https://freecodecamp.org/news/content/images/2023/12/rebase_onto_4-1.png) *Using `rebase --onto` on a single branch*

This results in the following screen:

![Interactive rebase](https://freecodecamp.org/news/content/images/2023/12/interactive_rebase_4-1.png) *Interactive rebase*

So what would I do? I want to put "Commit 19" before "Commit 18", so it comes right after "Commit 17". I can go further and `squash` them together, like so:

![Interactive rebase - changing the order of commit and squashing](https://freecodecamp.org/news/content/images/2023/12/interactive_rebase_5-1.png) *Interactive rebase - changing the order of commit and squashing*

Now when I get prompted for a commit message, I can provide the message "Commit 17+19":

![Providing a commit message](https://freecodecamp.org/news/content/images/2023/12/interactive_rebase_6-1.png) *Providing a commit message*

And now, see our beautiful history:

![The resulting history](https://freecodecamp.org/news/content/images/2023/12/rebase_onto_5-1.png) *The resulting history*

The syntax used above, `git rebase --interactive --onto <COMMIT X> <COMMIT X>` would be the most commonly used syntax by those who use `rebase` regularly. The state of mind these developers usually have is to create atomic commits while working, all the time, without being scared to change them later. Then, before `push`ing their changes, they would `rebase` the entire set of changes since the last `push`, and rearrange it so the history becomes coherent.

### `git reflog`

Time to consider a more startling case.

Go back to "Commit 2.4":

```sh
git reset --hard <SHA_OF_COMMIT_2_4>
```

Get some work done, write some code, and add it to `love.txt`. Stage this change, and commit it:

```sh
echo lots of work >> love.txt
git add love.txt
git commit -m "Commit 3.2"
```

(I'm using "Commit 3.2" to indicate that this is not the same commit as "Commit 3" we used when explaining `git revert`.)

![Another commit](https://freecodecamp.org/news/content/images/2023/12/reflog_commit_3-1.png) *Another commit - "Commit 3.2"*

I did the same on my machine, and I used the `Up` arrow key on my keyboard to scroll back to previous commands, and then I hit `Enter`, and… Wow.

Whoops.

![Did I just ?](https://freecodecamp.org/news/content/images/2023/12/reflog_commit_3_reset.png) *Did I just `git reset -- hard`?*

Did I just use `git reset --hard`? 😨

What actually happened? As you learned in the [previous chapter](#heading-chapter-9-git-reset), Git moved the pointer to `HEAD~1`, so the last commit, with all of my precious work, is not reachable from the current history. Git also removed all the changes from the staging area, and then matched the working dir to the state of the staging area.

That is, everything matches this state where my work is… gone.

Freak out time. Freaking out.

But, really, is there a reason to freak out? Not really… We're relaxed people. What do we do? Well, intuitively, is the commit really, really gone?

No. Why not? It still exists inside the internal database of Git.

If I only knew where that is, I would know the `SHA-1` value that identifies this commit, and we could restore it. I could even undo the undoing, and `reset` back to this commit.

Actually, the only thing I really need here is the `SHA-1` of the "deleted" commit.

Now the question is, how do I find it? Would `git log` be useful?

Well, not really. `git log` would go to `HEAD`, which points to `main`, which points to the parent commit of the commit we are looking for. Then, `git log` would trace back through the parent chain, which does not include the commit with my precious work.

![ doesn't help in this case](https://freecodecamp.org/news/content/images/2023/12/reflog_git_log.png) *`git log` doesn't help in this case*

Thankfully, the very smart people who created Git also created a backup plan for us, and that is called the `reflog`.

While you work with Git, whenever you change `HEAD`, which you can do by using `git reset`, but also other commands like `git switch` or `git checkout`, Git adds an entry to the `reflog`.

![ shows us where  was](https://freecodecamp.org/news/content/images/2023/12/git_reflog.png) *`git reflog` shows us where `HEAD` was*

We found our commit! It's the one starting with `0fb929e`.

We can also relate to it by its "nickname" - `HEAD@{1}`. Similar to the way Git uses `HEAD~1` to get to the first parent of `HEAD`, and `HEAD~2` to refer to the second parent of `HEAD` and so on, Git uses `HEAD@{1}` to refer to the first *reflog* parent of `HEAD`, that is, where `HEAD` pointed to in the previous step.

We can also ask `git rev-parse` to show us its value:

![Using ](https://freecodecamp.org/news/content/images/2023/12/reflog_revparse.png) *Using `git rev-parse HEAD@{1}`*

Note: In case you are using Windows, you may need to wrap it with quotation marks - like so:

```sh
git rev-parse "HEAD@{1}"
```

Another way to view the `reflog` is by using `git log -g`, which asks `git log` to actually consider the `reflog`:

![The output of ](https://freecodecamp.org/news/content/images/2023/12/git_log_g.png) *The output of `git log -g`*

You can see in the output of `git log -g` that the `reflog`'s entry `HEAD@{0}`, just like `HEAD`, points to `main`, which points to "Commit 2". But the parent of that entry in the `reflog` points to "Commit 3".

So to get back to "Commit 3", you can just use `git reset --hard HEAD@{1}` (or the `SHA-1` value of "Commit 3"):

![Image](https://freecodecamp.org/news/content/images/2023/12/git_reflog_reset.png) *`git reset --hard HEAD@{1}`*

And now, if you `git log`:

![Our history is back!!!](https://freecodecamp.org/news/content/images/2023/12/git_log_2.png) *Our history is back!!!*

We saved the day!

What would happen if I used this command again? And ran `git reset --hard HEAD@{1}`?

Git would set `HEAD` to where `HEAD` was pointing before the last `reset`, meaning to "Commit 2". We can keep going all day:

![ again](https://freecodecamp.org/news/content/images/2023/12/git_reset_again.png) *`git reset --hard` again*

### Recap - Additional Tools for Undoing Changes

In the previous chapter, you learned how to use `git reset` to undo changes.

In this chapter, you extended your toolbox for undoing changes in Git with a few new commands:

- `git commit --amend` - which "overrides" the last commit with the stage of the index. Mostly useful when you just committed something and want to modify that last commit.
- `git revert` - which creates a new commit, that reverts a past commit by adding a new commit to the history with the reversed changes. Useful especially when the "faulty" commit has already been pushed to the remote.
- `git rebase` - which you already know from [chapter 8](#heading-chapter-8-understanding-git-rebase), and is useful for rewriting the history of multiple commits, especially before pushing them.
- `git reflog` (and `git log -g`) - which tracks all changes to `HEAD`, so you might find the SHA-1 value of a commit you need to get back to.

The most important tool, even more important than the tools I just listed, is to whiteboard the current situation vs the desired one. Trust me on this, it will make every situation seem less daunting and the solution more clear.

There are additional tools that allow you to reverse changes in Git (I will provide links in the [appendix](#heading-additional-references-by-part)), but the collection of tools covered here should prepare you to tackle any challenge with confidence.

---

## Chapter 11 - Exercises

This chapter includes a few exercises to deepen your understanding of the tools you learned in Part 3. The full version of this book also includes detailed solutions for each.

The exercises are found on this repository:

[https://github.com/Omerr/undo-exercises.git](https://github.com/Omerr/undo-exercises.git)

Each exercise exists on a branch with the name `exercise_XX`, so Exercise 1 is found on branch `exercise_01`, Exercise 2 is found on branch `exercise_02` and so on.

Note: As explained in previous chapters, if you work with commits that can be found on a remote server (which you are in this case, as you are using my repository "undo-exercises"), you should probably use `git revert` instead of `git reset`. Similar to `git rebase`, the command `git reset` also rewrites history - and thus you should refrain from using it on commits that others may have relied on.

For the purposes of these exercises, you can assume no one else has cloned or pulled code from the remote repository. Just remember - in real life, you should probably use `git revert` instead of commands that rewrite history in such cases.

### Exercise 1

On branch `exercise_01`, consider the file `hello.txt`:

![The file ](https://freecodecamp.org/news/content/images/2023/12/ex_01_1.png) *The file `hello.txt`*

This file includes a typo (in the last character). Find the commit that introduced this typo.

#### Exercise (1a)

Remove this commit from the reachable history using `git reset` (with the right arguments), fix the typo, and commit again. Consider your history.

Revert to the previous state.

#### Exercise (1b)

Remove the faulty commit using `git commit --amend`, and get to the same state of the history as in the end of exercise (1a).

Revert to the previous state.

#### Exercise (1c)

`revert` the faulty commit using `git revert` and fix the typo. Consider your history.

Revert to the previous state.

#### Exercise (1d)

Using `git rebase`, get to the same state as in the end of exercise (1a).

### Exercise 2

Switch to `exercise_02`, and consider the contents of `exercise_02.txt`:

![The contents of ](https://freecodecamp.org/news/content/images/2023/12/ex_02_1.png) _The contents of `exercise_02.txt`_

A simple file, with one character at each line.

Consider the history (using `git lol`):

![Image](https://freecodecamp.org/news/content/images/2023/12/ex_02_2.png) *`git lol`*

Oh my. Each character was introduced in a separate commit. That doesn't make any sense!

Use the tools you've acquired to create a history where the creation of `exercise_02.txt` is all done in a single commit.

### Exercise 3

Consider the history on branch `exercise_03`:

![The history on ](https://freecodecamp.org/news/content/images/2023/12/ex_03_1.png) _The history on `exercise_03`_

This seems like a mess. You will notice that:

- The order is skewed. We need "Commit 1" to be the earliest commit on this branch, and have "Initial Commit" as its parent, followed by "Commit 2" and so on.
- We shouldn't have "Commit 2a" and "Commit 2b", or "Commit 4a" and "Commit 4b" - these two pairs need to be combined into a single commit each - "Commit 2" and "Commit 4".
- There is a typo on the commit message of "Commit 1", it should not have 3 `m`s.

Fix these issues, but rely on the changes of each original commit. The resulting history should look like so:

![The desired history](https://freecodecamp.org/news/content/images/2023/12/ex_03_2.png) *The desired history*

### Exercise 4

This exercise actually consists of three branches: `exercise_04`, `exercise_04_a`, and `exercise_04_b`.

To see the history of these branches without others, use the following syntax:

```sh
git lol --branches="exercise_04*"
```

The result is:

![The output of ](https://freecodecamp.org/news/content/images/2023/12/ex_04_1.png) _The output of `git lol --branches="exercise_04*"`_

Your goal is to make `exercise_04_b` independent of `exercise_04_a`. That is, get to this history:

![The desired history](https://freecodecamp.org/news/content/images/2023/12/ex_04_2.png) *The desired history*

**Good luck!**
