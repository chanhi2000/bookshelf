---
lang: en-US
title: "Learn the Basics of Git in Under 10 Minutes"
description: "Article(s) > Learn the Basics of Git in Under 10 Minutes"
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
      content: "Article(s) > Learn the Basics of Git in Under 10 Minutes"
    - property: og:description
      content: "Learn the Basics of Git in Under 10 Minutes"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/learn-the-basics-of-git-in-under-10-minutes.html
prev: /programming/git/articles/README.md
date: 2019-01-06
isOriginal: false
author:
  - Gowtham Venkatesan
cover: https://cdn-media-1.freecodecamp.org/images/1*4kDk9CZEEJBllqd3Fx549A.png
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
  name="Learn the Basics of Git in Under 10 Minutes"
  desc="Yes, the title is a clickbait. There is no way you can understand the basics of git technology in just 10 minutes. But you can get pretty close in about 25 minutes. And that is the purpose of this article. If you want to get sta..."
  url="https://freecodecamp.org/news/learn-the-basics-of-git-in-under-10-minutes-da548267cc91"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn-media-1.freecodecamp.org/images/1*4kDk9CZEEJBllqd3Fx549A.png"/>

Yes, the title is a clickbait. There is no way you can *understand* the basics of git technology in just 10 minutes. But you can get pretty close in about 25 minutes. And that is the purpose of this article.

If you want to get started on learning about Git technology, you’ve come to the right place. This is a comprehensive beginner’s guide to Git. There are many clients for Git. The technology is all the same no matter the client. But in this guide we’ll be using GitHub to understand Git.

::: info What is Version Control?

Version control is a system that records changes to a file or set of files over time so that you can recall specific versions later. So ideally, we can place any file in the computer on version control.

:::

::: info Here’s Why

A Version Control System (VCS) allows you to revert files back to a previous state, revert the entire project back to a previous state, review changes made over time, see who last modified something that might be causing a problem, who introduced an issue and when, and more. Using a VCS also means that if you screw things up or lose files, you can generally recover easily. And sometimes you just want to know **“who wrote this crap”**, and having access to that information is worthwhile?.

:::

---

## So What is Git?

Git is a version-control system for tracking changes in computer files and coordinating work on those files among multiple people. Git is a **_Distributed Version Control System_**. So Git does not necessarily rely on a central server to store all the versions of a project’s files. Instead, every user “clones” a copy of a repository (a collection of files) and has the **_full_** history of the project on their own hard drive. This clone has *all* of the metadata of the original while the original itself is stored on a self-hosted server or a third party hosting service like GitHub.

Git helps you **_keep track of the changes_** you make to your code. It is basically the history tab for your code editor(With no incognito mode ?). If at any point while coding you hit a fatal error and don’t know what’s causing it you can always revert back to the stable state. So it is very helpful for debugging. Or you can simply see what changes you made to your code over time.

![A simple example of version history of a file.](https://cdn-media-1.freecodecamp.org/images/1*Lp_67l9zwur7aaFAhpVDrg.png)

In the example above, all three cards represent different versions of the same file. We can select which version of the file we want to use at any point of time. So I can jump to and fro to any version of the file in the git time continuum.

Git also helps you **_synchronise code_** between multiple people. So imagine you and your friend are collaborating on a project. You both are working on the same project files. Now Git takes those changes you and your friend made independently and merges them to a single “**Master**” repository. So by using Git you can ensure you both are working on the most recent version of the repository. So you don’t have to worry about mailing your files to each other and working with a ridiculous number of copies of the original file. And collaborating long distance becomes as easy as HTML ?.

---

## Git Workflow

Before we start working with Git commands, it is necessary that you understand what it represents.

### What is a Repository?

A **repository** a.k.a. **repo** is nothing but a collection of source code.

### There are four fundamental elements in the Git Workflow.

**Working Directory**, **Staging Area**, **Local Repository** and **Remote Repository**.

![Diagram of a simple Git Workflow](https://cdn-media-1.freecodecamp.org/images/1*iL2J8k4ygQlg3xriKGimbQ.png)

**If you consider a file in your Working Directory, it can be in three possible states.**

1. **It can be staged.** Which means the files with the updated changes are marked to be committed to the local repository but not yet committed.
2. **It can be modified**. Which means the files with the updated changes are not yet stored in the local repository.
3. **It can be committed**. Which means that the changes you made to your file are safely stored in the local repository.
4. `git add` is a command used to add a file that is in the working directory to the staging area.
5. `git commit` is a command used to add all files that are staged to the local repository.
6. `git push` is a command used to add all committed files in the local repository to the remote repository. So in the remote repository, all files and changes will be visible to anyone with access to the remote repository.
7. `git fetch` is a command used to get files from the remote repository to the local repository but not into the working directory.
8. `git merge` is a command used to get the files from the local repository into the working directory.
9. `git pull` is command used to get files from the remote repository directly into the working directory. It is equivalent to a `git fetch` and a `git merge` .

**Now that we know what Git is and it’s basic terminologies, let’s see how we can place a file under git**. We’re going to do it the right way and the difficult way. Without any GUI applications.

I’m assuming you already have a file the you want to place under version control. If not create a sample folder named ‘MuskCult’ and place some sample code files in it.

### Step 0: Make a GitHub Account. Duh.

If you don't already have one, you can make one [<FontIcon icon="iconfont icon-github"/>here](https://github.com/join).

### Step 1: Make sure you have Git installed on you machine.

If you are on a <FontIcon icon="iconfont icon-macos"/>**Mac**, fire up the terminal and enter the following command:

```sh
git --version
```

This will prompt open an installer if you don’t already have git. So set it up using the installer. If you have git already, it’ll just show you which version of git you have installed.

If you are running <FontIcon icon="fa-brands fa-linux"/>**Linux**(deb), enter the following in the terminal:

```sh
sudo apt install git-all
```

If you are on <FontIcon icon="fa-brands fa-windows"/>**Windows**:

```sh
get a mac
```

Just kidding… Relax… The amount of people I triggered… Phew…  

Go to this [<FontIcon icon="fa-brands fa-apple"/>**link**](https://apple.com/macos/what-is/) or this [<FontIcon icon="iconfont icon-git"/>link](https://gitforwindows.org/) for more info on how to get it.

### Step 2: Tell Git who you are.

Introduce yourself. Slide in. Seriously, mention your Git username and email address, since every Git commit will use this information to identify you as the author.

```sh
git config --global user.name "YOUR_USERNAME"
git config --global user.email "im_satoshi@musk.com"
git config --global --list # To check the info you just provided
```

![](https://cdn-media-1.freecodecamp.org/images/1*JbyUdhLMEdglRxQk6PH7Vg.gif)

### Step 3: Generate/check your machine for existing SSH keys. (Optional)

Why you ask? Using the **SSH protocol**, you can **connect and authenticate** to r**emote servers and services**. With SSH keys, you can connect to GitHub without supplying your username or password at each visit.

- Follow this [<FontIcon icon="iconfont icon-github"/>link](https://help.github.com/articles/about-ssh/) to learn more about SSH.  
- [<FontIcon icon="iconfont icon-github"/>**Go here**](https://help.github.com/articles/checking-for-existing-ssh-keys/) to check if you have an existing SSH key.  
- [<FontIcon icon="iconfont icon-github"/>**Go here**](https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/) to generate a SSH Key.  
- [<FontIcon icon="iconfont icon-github"/>**Go here**](https://help.github.com/articles/adding-a-new-ssh-key-to-your-github-account/) to add the SSH key to your GitHub account.  
- And finally [<FontIcon icon="iconfont icon-github"/>**go here**](https://help.github.com/articles/testing-your-ssh-connection/) to test its connection.

If you did setup SSH, every git command that has a link you replace it by:

```plaintext
Instead of : https://github.com/username/reponame
You use    : git@github.com:username/reponame.git
Note       : You can use both ways alternatively
```

**I’ll be using SSH protocol in this tutorial.**

### Step 4: Let’s Git

Create a new repository on GitHub. Follow this [<FontIcon icon="iconfont icon-github"/>link](https://github.com/new).   Now, locate to the folder you want to place under git in your terminal.

```sh
cd Desktop/MuskCult
```

#### Initialize Git

And to place it under git, enter:

```sh
touch README.md    # To create a README file for the repository
git init           # Initiates an empty git repository
```

![](https://cdn-media-1.freecodecamp.org/images/1*Q_DUXRghgFQb9F47mUB6LQ.gif)

Now go edit the README.md file to provide information about the repository.

#### Add files to the Staging Area for commit

Now to add the files to the git repository for commit:

```sh
git add .  
# Adds all the files in the local repository and stages them for commit
#
# OR if you want to add a specific file
#
git add README.md 
# To add a specific file
```

#### Before we commit let’s see what files are staged

```sh
git status # Lists all new or modified files to be committed
```

![](https://cdn-media-1.freecodecamp.org/images/1*a2_hw7cMe2R9R_aI86dB-A.gif)

#### Commit Changes you made to your Git Repo

Now to commit files you added to your git repo:

```sh
git commit -m "First commit"
# The message in the " " is given so that the other users can read the message and see what changes you made
```

![](https://cdn-media-1.freecodecamp.org/images/1*LoUwFy29RkgCS7hCajd_3g.gif)

#### Uncommit Changes you just made to your Git Repo

Now suppose you just made some error in your code or placed an unwanted file inside the repository, you can unstage the files you just added using:

```sh
git reset HEAD~1
# Remove the most recent commit
# Commit again!
```

![](https://cdn-media-1.freecodecamp.org/images/1*rxOX_U-ZRmGfhgIhNWlDIQ.gif)

#### Add a remote origin and Push

Now each time you make changes in your files and save it, it won’t be automatically updated on GitHub. All the changes we made in the file are updated in the local repository. Now to update the changes to the master:

```sh
git remote add origin remote_repository_URL
# sets the new remote
```

The `git remote` command lets you create, view, and delete connections to other repositories.

```sh
git remote -v
# List the remote connections you have to other repositories.
```

The `git remote -v` command lists the URLs of the remote connections you have to other repositories.

```sh
git push -u origin master # pushes changes to origin
```

Now the `git push` command pushes the changes in your local repository up to the remote repository you specified as the origin.

![](https://cdn-media-1.freecodecamp.org/images/1*w-nfopsKIks_JRzFe5D8xA.gif)

And now if we go and check our repository page on GitHub it should look something like this:

![](https://cdn-media-1.freecodecamp.org/images/1*aQljQFkytY84BgmlVtpgmw.png)

And that’s it. You’ve just added the files to the repository you just created on GitHub.

#### See the Changes you made to your file

Once you start making changes on your files and you save them, the file won’t match the last version that was committed to git. To see the changes you just made:

```sh
git diff # To show the files changes not yet staged
```

![](https://cdn-media-1.freecodecamp.org/images/1*xym1QvvvWorfoyGMXv28Yg.gif)

#### Revert back to the last committed version to the Git Repo:

Now you can choose to revert back to the last committed version by entering:

```sh
git checkout .
#
# OR for a specific file
#
git checkout -- <filename>
```

![](https://cdn-media-1.freecodecamp.org/images/1*HYgYkfo3W4MUA8CJl12rXg.gif)

#### View Commit History

You can use the `git log` command to see the history of commit you made to your files:

```sh
git log
```

![](https://cdn-media-1.freecodecamp.org/images/1*9w7uBJcQMxc708DBw8Sewg.gif)

Each time you make changes that you want to be reflected on GitHub, the following are the most common flow of commands:

```sh
git add .
git status # Lists all new or modified files to be committed
git commit -m "Second commit"
git push -u origin master
```

![](https://cdn-media-1.freecodecamp.org/images/1*rWBJnBdF1V8YO_mi-jEfxA.gif)

Now if we go and see our repo, we can identify whether the commit was successful by looking at the commit message for each file.

![](https://cdn-media-1.freecodecamp.org/images/1*QHM8m5HGavHkdzPz06UWGw.png)

### Step 5: That’s all well and good… But How do I download and work on other repositories on GitHub?

#### Cloning a Git Repo

Locate to the directory you want to clone the repo. Copy the link of the repository you want and enter the following:

```sh
git clone remote_repository_URL
```

Feel free to go ahead and clone the repo I created above using: [<FontIcon icon="iconfont icon-github"/>`Gothamv/MuskCult`](https://github.com/Gothamv/MuskCult)

![](https://cdn-media-1.freecodecamp.org/images/1*6NACk8-IiBjbauM-k-aesQ.gif)

#### Pushing Changes to the Git Repo

Now you can work on the files you want and commit to changes locally. If you want to push changes to that repository you either have to be [<FontIcon icon="iconfont icon-github"/>added as a collaborator](https://help.github.com/articles/inviting-collaborators-to-a-personal-repository/) for the repository or you have create something known as pull request. Go and check out how to do one [<FontIcon icon="iconfont icon-github"/>here](https://help.github.com/articles/creating-a-pull-request/) and give me a pull request with your code file.

#### Collaborating

So imagine you and your friend are collaborating on a project. You both are working on the same project files. Each time you make some changes and push it into the master repo, your friend has to pull the changes that you pushed into the git repo. Meaning to make sure you’re working on the latest version of the git repo each time you start working, a git pull command is the way to go.

Now below is an example of a project my friend and I are collaborating on:

![There has just been a commit on the repo](https://cdn-media-1.freecodecamp.org/images/1*2-tl2rHsgPqiv88aI55CPw.png)

So to make sure those changes are reflected on my local copy of the repo:

```sh
git pull origin master
```

![](https://cdn-media-1.freecodecamp.org/images/1*ySDKu2OEdkc26yOUp-TJJQ.gif)

::: tip Here’s two more useful git commands

```sh
git fetch
#
# AND
#
git merge
```

:::

In the simplest terms, `git fetch` followed by a `git merge` equals a `git pull`. But then why do these exist?

When you use `git pull`, Git tries to automatically do your work for you. **It is context sensitive**, so Git will merge any pulled commits into the branch you are currently working in. `git pull` **automatically merges the commits without letting you review them first**.

When you `git fetch`, Git gathers any commits from the target branch that do not exist in your current branch and **stores them in your local repository**. However, **it does not merge them with your current branch**. This is particularly useful if you need to keep your repository up to date, but are working on something that might break if you update your files. To integrate the commits into your master branch, you use `git merge`.

### One More Thing

```plaintext
.gitignore
```

So what is it?

<FontIcon icon="iconfont icon-git"/>`.gitignore` tells git which files (or patterns) it should ignore. It's usually used to avoid committing transient files from your working directory that aren't useful to other collaborators, such as compilation products, temporary files IDEs create, etc.

![](https://cdn-media-1.freecodecamp.org/images/1*3NFtOjfz0NvNSwba7YCmDA.png)

So in the above example, files like **pycache**, .DS_Store are used by the system to store information for faster access. This is not useful for other collaborators. So we can tell git to ignore them by adding a <FontIcon icon="iconfont icon-git"/>`.gitignore` file.

Use the touch command to create the <FontIcon icon="iconfont icon-git"/>`.gitignore` file:

```sh
touch .gitignore
```

And you can add the following patterns to tell git to ignore such files.

```
*.cmake
*.DS_Store
/.user
/build
etc. depending upon the files you want git to untrack
```

![And that’s pretty much it for the basics. Stay tuned for Part 2 which will focus on Branch, Merge, Stash, Rebase etc.<br/>If you enjoyed the article, don’t forget to smash that Clap button and make sure you follow me for Part 2.<br/>Peace Out ✌️](https://cdn-media-1.freecodecamp.org/images/1*azp-S618Nvx4KigFrRABzQ.gif)

---

## References

<SiteInfo
  name="Adding locally hosted code to GitHub - GitHub Docs"
  desc="If your code is stored locally on your computer and is tracked by Git or not tracked by any version control system (VCS), you can import the code to GitHub using GitHub CLI or Git commands."
  url="https://docs.github.com/en/migrations/importing-source-code/using-the-command-line-to-import-source-code/adding-locally-hosted-code-to-github/"
  logo="https://docs.github.com/assets/cb-345/images/site/favicon.png"
  preview="https://github.githubassets.com/images/modules/open_graph/github-logo.png"/>

<SiteInfo
  name="How to undo (almost) anything with Git"
  desc="One of the most useful features of any version control system is the ability to ”undo” your mistakes. In Git, ”undo” can mean many slightly different things."
  url="https://github.blog/open-source/git/how-to-undo-almost-anything-with-git/"
  logo="https://github.blog/wp-content/uploads/2019/01/cropped-github-favicon-512.png?fit=192%2C192"
  preview="https://github.blog/wp-content/uploads/2019/03/community-twitter.png"/>

```component VPCard
{
  "title": "Common Git commands | GitLab",
  "desc": "GitLab product documentation.",
  "link": "https://docs.gitlab.com/ee/topics/git/commands.html/",
  "logo": "https://docs.gitlab.com/favicon.svg",
  "background": "rgba(46,42,103,0.2)"
}
```

<SiteInfo
  name="What is the difference between 'git pull' and 'git fetch'?"
  desc="What are the differences between git pull and git fetch?"
  url="https://stackoverflow.com/questions/292357/what-is-the-difference-between-git-pull-and-git-fetch/"
  logo="https://cdn.sstatic.net/Sites/stackoverflow/Img/favicon.ico?v=ec617d715196"
  preview="https://cdn.sstatic.net/Sites/stackoverflow/Img/apple-touch-icon@2.png?v=73d79a89bded"/>

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Learn the Basics of Git in Under 10 Minutes",
  "desc": "By Gowtham Venkatesan Yes, the title is a clickbait. There is no way you can understand the basics of git technology in just 10 minutes. But you can get pretty close in about 25 minutes. And that is the purpose of this article. If you want to get sta...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/learn-the-basics-of-git-in-under-10-minutes.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
