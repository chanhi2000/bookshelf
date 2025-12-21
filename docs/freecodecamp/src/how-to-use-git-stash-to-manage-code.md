---
lang: en-US
title: "How to Use Git Stash to Efficiently Manage Your Code"
description: "Article(s) > How to Use Git Stash to Efficiently Manage Your Code"
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
      content: "Article(s) > How to Use Git Stash to Efficiently Manage Your Code"
    - property: og:description
      content: "How to Use Git Stash to Efficiently Manage Your Code"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/how-to-use-git-stash-to-manage-code.html
prev: /programming/git/articles/README.md
date: 2024-10-11
isOriginal: false
author: Okoro Emmanuel Nzube Derek
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1728563160215/147e5b8d-960d-4a90-ad2f-6d71337ac0ce.jpeg
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
  name="How to Use Git Stash to Efficiently Manage Your Code"
  desc="Sometimes when you’re coding, you need to leave a particular task incomplete to focus on another task - but you don't want to lose your progress. So what do you do? Fortunately, git stash comes to the rescue. In this article, you’ll learn all about t..."
  url="https://freecodecamp.org/how-to-use-git-stash-to-manage-code"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1728563160215/147e5b8d-960d-4a90-ad2f-6d71337ac0ce.jpeg"/>

Sometimes when you’re coding, you need to leave a particular task incomplete to focus on another task - but you don't want to lose your progress. So what do you do? Fortunately, `git stash` comes to the rescue.

In this article, you’ll learn all about the [<VPIcon icon="iconfont icon-git"/>git stash](https://git-scm.com/docs/git-stash) command and why it’s important to stash your code. By the end of this article, you will have firsthand knowledge of how to use the `git stash` command in your projects.

---

## Why Do We Stash?

[<VPIcon icon="iconfont icon-git"/>Git](https://git-scm.com/book/en/v2/Getting-Started-What-is-Git%3F) has provided us with the stash command, which makes our lives easier. The `git stash` command helps you save a draft of your current task, temporarily giving you time to attend to your new task without losing your progress on the previous task.

There are so many reasons why stashing is important. Here are some of them:

- **Resolving Conflicts within a Project**: In a collaboration setting, you, as a developer, get to work with other developers on a particular project. A merge conflict might occur, which might require you to pause your current task to handle the conflict. You can easily stash your current task and focus fully on resolving the merge conflict without having to worry about losing your progress.
- **Clean Working Environment**: You might want to start up a new task or want to pull a repository into your working environment. With stashing, you can clear your current working environment temporarily, making your work environment clean and ready to perform another task.
- **Switching branches**: `git stash` is very useful in this situation. You might be in the middle of something and it's not ready to be committed, but at that moment, you need to switch branches. With `git stash`, you can easily move to another branch and perform your other tasks.

---

## Pros and Cons of Stashing

Here are some of the pros (advantages) of using stash:

- It’s easy to use and understand
- It helps you save a draft of your current task and focus on another task.
- It comes in handy when trying to resolve conflicts like merge conflicts, `git fork`, and so on when working with other collaborators in a project.
- You can reapply your draft file not only on the branch you stashed it from but also on other branches.

As the saying goes "Anything that has an advantage also has a disadvantage". Here are some of the cons (disadvantages) of using stash:

- Stashing can lead to a merge conflict: A merge conflict can occur when reapplying your stashed draft to a branch which already has similar content to the draft, and you’ll need to resolve this manually.
- Cluster and Confusion: In a situation where you are working on a huge project with multiple sub-tasks, applying the stash command at various points might lead to a cluster of saved drafts. This can lead to confusion on the particular saved draft you would want to continue working on.

Now that we have seen some of the pros and cons of using `git stash`, let’s look at how `git stash` works and how to apply it to our project.

---

## How Git Stash Works

As we just discussed, `git stash` helps you save a draft of your current uncommitted changes. Now let's see how this happens using the analogy below.

When you run the `git stash` command, it puts your tracked file in a box and then removes/hides that box, making the environment/branch clean and free to use for another task. When you apply the stash command to the current branch you are working on, it saves a draft of all tracked files in that branch and reverts that branch to a clean slate.

To explain better, here’s an example:

![Image of How Git Stash Works](https://hackmd.io/_uploads/S1x5zSPhR.gif)

From the image above, we created a new project and already initialized `git` in it. We are currently on the "main" branch which is the default branch.

If we modify a file in the `main` branch and apply the `git stash` command, the modified file will be saved as a draft and your working environment will be reverted to the last commit you made (making it look like there was no modification in the first place).

Note: By default, you can only apply the stash command to tracked files in `git`.

### How to Create a Stash

Here is how you can go about creating a stash in your project.

Create a file you want to work on, maybe an <VPIcon icon="fa-brands fa-html5"/>`index.html` file or a <VPIcon icon="fa-brands fa-css3-alt"/>`style.css` file. Initialize `git` in your project by running the command `git init`. Add the file to the Git tracking stage by running `git add .` Then at this point, if you make any modifications and would like to come back later to complete it, you can run:

```sh
git stash
```

Here is a visual representation of the above process:

![Visual Representation of How to Create a stash](https://hackmd.io/_uploads/HJg8cHDh0.gif)

There are other stash commands you should know in order to control your stashed project. They include [List](https://git-scm.com/docs/git-stash#Documentation/git-stash.txt-listltlog-optionsgt), [Pop](https://git-scm.com/docs/git-stash#Documentation/git-stash.txt-pop--index-q--quietltstashgt), [Clear](https://git-scm.com/docs/git-stash#Documentation/git-stash.txt-clear), [Apply](https://git-scm.com/docs/git-stash#Documentation/git-stash.txt-apply--index-q--quietltstashgt), [Show](https://git-scm.com/docs/git-stash#Documentation/git-stash.txt-show-u--include-untracked--only-untrackedltdiff-optionsgtltstashgt), and a few others.

- **List**: The list command is mainly used to display the number of stashes made in a particular project. Just like an array, the stashed draft is numbered from 0 upwards. To use this command, run `git stash list`. Note: The stash command is arranged in such a way that when a change is stashed, it takes up the first position i.e."stash@{0}" while the other changes are pushed down.
- **Pop**: This command is used to retrieve an already stashed draft back into your project. When you apply the pop command, it automatically retrieves the latest stashed draft back into your working project and removes it from the stash list. Run the following command to pop a stash: `git stash pop`.
- **Clear**: When applied, this command is used to remove/delete all the stash entries. It is important to note that, when you use the clear command, you can recover the cleared stash again. You can use it by running this command: `git stash clear`.
- **Apply**: This command works just like the pop command, but the only difference is that the stashed draft is not removed from the list after it has been retrieved. This means that when you use the apply command, it retrieves the latest stashed draft back into your project but doesn't remove it from the stash list. Run the following to use the apply command: `git stash apply`.
- **Show**: This command is important because it helps show you the changes you made in the stashed draft. Use the following command to show a stash: `git stash show`.

---

## How to Handle Multiple Stashes in Your Project

Knowing how to handle multiple stashes in your project is important, as there may be times when you have more than 3-4 stashed drafts in your project.

Here is how to handle multiple stashes:

### Step One: Customize each stash with a specific message

This step is very important if you would like to avoid being confused in situations where you have multiple stashes.

![Multiple stashes with the Same messages](https://hackmd.io/_uploads/BkVtICNIA.png)

From the image above, we have a total of four stashes (that is, "stash@{0}" to "stash@{3)") and each stash bears the same message of "first commit". This might be confusing when we might want to pop or apply one of these stashes later in the future.

To sort this issue, all we have to do is assign a specific stash message to the next stash. We can do this by running the following command:

```sh
git stash save "New message/name goes here"
```

Here is how it looks:

![Multiple stashes with the different messages](https://hackmd.io/_uploads/HJH3IRNLA.png)

From the image above, you can clearly see the difference between the two latest stashes (that is, "stash@{0}" and "stash@{1}") and the others. The first two stashes have their own specific message, which makes it very easy to differentiate them from the rest.

### Step Two: Retrieve a specific stash instead of the latest stash

There are situations when you might want to retrieve a specific stashed draft rather than the latest stashed draft you just made. You can do this by using either:

```sh
git stash pop stash@{n}
# or
git stash apply stash@{n}
```

Where `n` indicates the stash ID you want to retrieve. This also works when you want to delete or clear a specific stashed draft.

### Step Three: Preview your stashed draft before you retrieve it.

Before you restore a stashed draft, it is important to preview it to ensure that it's the exact draft you want to restore. The `show` command helps you review the changes in the draft before restoring it. To do this, run the following command:

```sh
git stash show stash@{n}
```

---

## Real Use Cases for `git stash`

Here are some real-life case scenarios of when the git stash command is important.

- **During Debugging**: This happens a lot when you are in a collaboration setting. Let's say you are working with extra two developers on a project and one of them happens to encounter an error that needs your urgent attention. Using the `git stash` command is ideal in this situation.
- **When you are not ready to Commit**: This occurs often. There are situations where you are not ready to commit your changes to the repository. Stashing those changes is the best next step.
- **Returning the directory to its original state**: Returning the directory to its original state simply means cleaning out all changes made to the directory and making it look as if nothing was done to it. The `git stash` command helps you achieve this.

---

## Conclusion

The `git stash` command effortlessly helps you manage your project properly whether you are working alone or you’re in a collaboration setting.

This tool is vital to every developer who wants to flow freely and effortlessly while working on a project.

At this point, I believe you know what `git stash` is all about, why it is important and how to make use of it in your project.

Thank you for reading.

<!-- START: ARTICLE CARD -->
```component VPCard
{
  "title": "How to Use Git Stash to Efficiently Manage Your Code",
  "desc": "Sometimes when you’re coding, you need to leave a particular task incomplete to focus on another task - but you don't want to lose your progress. So what do you do? Fortunately, git stash comes to the rescue. In this article, you’ll learn all about t...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/how-to-use-git-stash-to-manage-code.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```