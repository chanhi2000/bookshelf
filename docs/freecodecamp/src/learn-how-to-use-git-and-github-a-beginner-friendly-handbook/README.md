---
lang: en-US
title: "Learn How to Use Git and GitHub – A Beginner-Friendly Handbook"
description: "Article(s) > Learn How to Use Git and GitHub – A Beginner-Friendly Handbook"
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
      content: "Article(s) > Learn How to Use Git and GitHub – A Beginner-Friendly Handbook"
    - property: og:description
      content: "Learn How to Use Git and GitHub – A Beginner-Friendly Handbook"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/learn-how-to-use-git-and-github-a-beginner-friendly-handbook.html
prev: /programming/git/articles/README.md
date: 2025-12-13
isOriginal: false
author:
  - name: Sumit Saha
    url : https://freecodecamp.org/news/author/sumitsaha/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1765495440352/0eadf330-7a89-4328-aed1-3c851d279a5d.png
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
  name="Learn How to Use Git and GitHub – A Beginner-Friendly Handbook"
  desc="In this handbook, you’re going to dive into something really exciting: Git and GitHub. To start, let’s clear one thing up: Git and GitHub are not the same thing. In short, Git is the tool that runs on your own computer and keeps track of changes in y..."
  url="https://freecodecamp.org/news/learn-how-to-use-git-and-github-a-beginner-friendly-handbook"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1765495440352/0eadf330-7a89-4328-aed1-3c851d279a5d.png"/>

In this handbook, you’re going to dive into something really exciting: Git and GitHub.

To start, let’s clear one thing up: Git and GitHub are not the same thing.

In short, Git is the tool that runs on your own computer and keeps track of changes in your files, while GitHub is an online platform that lets you store those Git projects in the cloud and collaborate with other people. Git works perfectly fine on its own, but GitHub makes teamwork, sharing, and backup much easier. They’re connected, yes, but completely different.

Think of it this way – Git is the “coffee,” and GitHub is the “coffee shop” where that coffee is served. Fun analogy, right? Don’t worry, in just a moment you’ll see exactly what that means.

---

## What Does Git Do?

So, let’s start by understanding what Git actually is and how it works. Simply put, Git is a powerful tool that constantly keeps track of every change you make to your files - and I mean *literally* all the time. Day or night, 365 days a year, Git records what changed, when it changed, who changed it, and even where it happened.

Now, what kind of files are we talking about? Almost any kind – not just code. It could be an image, a text file, JavaScript, PHP, Python, or even a video. No matter what you’re working on, Git tracks every single change. Pretty amazing, isn’t it?

But here’s the best part: the magic of Git doesn’t stop there. The coolest thing about Git is that it saves different versions of your files. Imagine you wrote some code and then made a few changes to it after a few days. Now you want to make sure the old version doesn’t get lost. That’s exactly where Git comes to the rescue. It lets you keep multiple versions of the same file effortlessly, and whenever you want, you can roll back to any previous version in just a moment.

By the end of this handbook, you’ll not only understand what Git and GitHub are, but you’ll also be able to use them confidently in real projects. You’ll learn how Git tracks changes locally, how repositories work, how to move changes through Git’s workflow, and how to collaborate with others using GitHub.

We’ll start from the very basics and gradually move toward more advanced concepts like branching, merging, resolving conflicts, and safely undoing mistakes – all with hands-on examples you can follow along with.

::: note Prerequisites

- **Basic File & Folder Navigation** – Using Finder / File Explorer.
- **CLI Usage** – Running simple commands in Terminal or Command Prompt.
- **Text Editor** – Any editor for opening and editing files.

I’ve also created a video to go along with this article. If you’re the type who likes to learn from video as well as text, you can check it out below:

<VidStack src="youtube/wNrbaAGE2PY" />

:::

---

## What is Git?

Git is most commonly used in coding projects, but its power goes far beyond just code. You can use Git to keep track of changes and maintain different versions of almost any file. This means you never have to worry about losing a file or accidentally overwriting something important.

Let’s look at a real-life example. Suppose you’re working on a project. You’ve spent hours writing code, your client loves it, and everything’s going great. Then, a month later, the client asks for some new changes. You make the updates as requested. But after a few days, the client comes back and says, “Actually, the old version was better.” Now you’re in trouble, right? Because you’ve already overwritten the original code. How do you get it back?

That’s exactly the kind of problem Git solves. This is why Git is known as a Version Control System – it keeps every version of your files or code safely stored, so you can go back to any previous state whenever you need to, without losing a thing.

Git was created by Linus Torvalds – the same brilliant mind behind Linux. And honestly, what he built is nothing short of genius. Most tools programmers use have a short lifespan, but Git is one of those rare ones that, once you learn it, stays useful for the rest of your career.

The best part? The basics of Git aren’t that hard to learn at all. It’s built around a few simple commands and concepts, and once you understand those, the whole system starts to make perfect sense.

Still, for beginners, Git can feel a little confusing at first – and that’s exactly why this handbook exists. Think of it not just as a tutorial, but as a complete learning resource for learning Git inside and out. We’ll cover all the essential topics you’ll actually use in real-world projects. And if you want to jump to a specific topic, you can easily find it by using the section headings in the table of contents after the intro.

If you follow this tutorial closely, you’ll be able to understand every part of Git, step by step.

### Git vs GitHub

Now, let’s move on to another important topic: the difference between Git and GitHub. Git is a tool that runs locally on your own computer. It tracks all the changes you make to your files and keeps everything organized.

But imagine this: you and your teammate are working on the same project. You’re coding on your own computer, and your teammate is working from another one. That means you both have different versions of the same project, right? And if your team has more members, there will be even more versions – each saved separately on their own machines.

This is exactly where GitHub comes in. When the project is complete, you’ll need to combine everyone’s work into one place to merge all those changes together. For that, you need a central hub where everyone can upload their updates. You push your work there, your teammate pushes theirs, and GitHub brings it all together.

GitHub acts as that central online server where your team’s entire project lives, making it easy for everyone to see, edit, and share updates in one place, without any confusion.

But GitHub isn’t the only place where you can host your Git repositories. There are other popular platforms too, like GitLab and Bitbucket. These are also widely used and trusted by developers around the world. Still, among all of them, GitHub remains the most popular and widely adopted platform.

That’s why in this tutorial, our focus will mainly be on GitHub. It’s now owned by Microsoft and is maintained with great care and attention. Especially in the programming community and in the world of open-source projects, GitHub’s contribution is truly remarkable.

So without wasting any more time, let’s dive in and explore how Git and GitHub actually work – and see some real-world use cases that will help you understand their power in action.

---

## Git Architecture – Local and Remote

Before you start working with Git, the most important thing is to understand its core concept: how it actually works and what its internal structure, or architecture, looks like.

Git is mainly divided into two major parts, **Local** and **Remote**.

- The **Local** part refers to your own computer, where you do all your work. This is where your files, code, and every change you make are stored.
- The **Remote** part, on the other hand, lives in the cloud. It’s where you push or upload your local work. In most cases, when you say “remote,” you’re usually referring to GitHub.

Now, let’s start with how the local part works. On your computer, the folder where you’re working on your project is called the **Working Directory**. This is where all the action happens: you write code, create new files, modify existing ones, and make changes as needed. And when you feel like, “Alright, this version looks good, I want to save this change,” that’s when you move on to the next stage in Git’s workflow.

So, what do you do next? You move your work to the “**stage**.” At first, this word might sound a bit unfamiliar, but once you use it a few times, it’ll make perfect sense. In simple terms, when you finish your work in the working directory, staging means you’re saying, “Alright, my changes are ready – they can move to the next step.” This staging process is the second phase in Git’s workflow.

Then comes the third phase where you take the staged files and send them to the local repository. You can think of the staging area as a middle ground – a temporary space where files sit between your working directory and the final save in the repository.

Once you’ve reviewed everything and you’re confident the work is correct, you “commit” it. Committing means permanently saving those changes to your local **repository** – that is, locking them in as a recorded version of your project’s history.

Now you might be wondering, what exactly is a repository? Simply put, a repository is a place where all the versions of your files and their complete change history are stored. In the case of a local repository, it’s a specific folder on your own computer. For a remote repository, it lives on a cloud server, like GitHub.

You can think of a repository as a digital cabinet for your code. It’s a secure place where Git neatly stores every record of your work and every change you’ve ever made. Inside this repository, Git automatically creates a few system files that track everything – your changes, history, commits, and more. These files are managed entirely by Git itself, and the whole system runs based on the data stored within them.

So if we summarize everything so far, it goes like this:

1. You work inside your local working directory.
2. Once you’re done, you stage your changes.
3. Then you commit those staged files to the local repository.

Up to this point, everything happens only on your own computer – nothing has been sent to the cloud yet. You need the cloud only when you want to share your code with others, access it from another computer, or keep it safely backed up.

That’s when you “push” your local repository to the remote repository. In other words, you upload it to GitHub. Think about it like this: just as you use Google Drive or OneDrive to store files, photos, or documents, you could technically keep everything only on your own device. But you store them in the cloud so that you can access them from anywhere, and even if something gets deleted locally, it stays safe online.

GitHub works the same way. It’s your cloud backup for code. So you see, the main purpose of this whole process is to make collaboration and remote access possible. Having a remote means you can easily send your code from the local repository to a cloud server, and if needed, pull that same code back to any other machine.

![Git Architecture](https://cdn.hashnode.com/res/hashnode/image/upload/v1765442130301/fa1908c2-c2ef-4a07-86dc-1d7d12b13a21.gif)

That’s the core idea of Git, and the foundation of the entire system rests on this simple concept. Beyond that, there’s nothing overly complex. Once you clearly understand this basic workflow, everything else in Git will feel much easier to grasp.

---

## Here’s What We’ll Cover:

1. [How to Install Git on Your Computer](#heading-how-to-install-git-on-your-computer)
2. [How to Create a Project and Initialize a Local Repository](#heading-how-to-create-a-project-and-install-a-local-repository)
3. [How to Create a Remote Repository on GitHub and Clone It](#heading-how-to-create-a-remote-repository-on-github-and-clone-it)
4. [How to Track Changes with `git status`](#heading-how-to-track-changes-with-git-status)
5. [How to Move Changes to the Staging Area with `git add`](#heading-how-to-move-changes-to-the-staging-agrea-with-git-add)
6. [How to Save Work Permanently with `git commit` (and Configure Git)](#heading-how-to-save-work-permanently-with-git-commit-and-configure-git)
7. [How to Delete and Restore Files with `git rm` and `git reset`](#heading-how-to-delete-and-restore-files-with-git-rm-and-git-reset)
8. [How to View Commit History with `git log`](#heading-how-to-view-commit-history-with-git-log)
9. [Branching and Merging in Git](#heading-branching-and-merging-in-git)
10. [How to Navigate History with `git checkout` and Compare Commits with `git diff`](#heading-how-to-navigate-history-with-git-checkout-and-compare-commits-with-git-diff)
11. [How to Work with Remotes: `git push`, `git fetch`, and `git pull`](#heading-how-to-work-with-remotes-git-push-git-fetch-and-git-pull)
12. [How to Undo Local Changes with `git restore`](#heading-how-to-undo-local-changes-with-git-restore)
13. [How to Temporarily Shelve Work with `git stash`](#heading-how-to-temporarily-shelve-staged-work-with-git-stash)
14. [How to Undo Commits Safely with `git revert`](#heading-how-to-undo-commits-safely-with-git-revert)
15. [How to Keep History Clean with `git rebase`](#heading-how-to-keep-history-clean-with-git-rebase)
16. [How to Collaborate on GitHub with Pull Requests](#heading-how-to-collaborate-on-github-with-pull-requests)
17. [Git & GitHub – Concise Summary](#heading-git-amp-github-concise-summary)

---

## How to Install Git on Your Computer

Now, let’s see how to get started using Git from scratch.

The very first step before working with Git is installing it on your computer. It might already be installed on your machine, so just check first.

If you do need to install Git, you can download it directly from the [<VPIcon icon="iconfont icon-git"/>official website](https://git-scm.com/downloads). There, you’ll find different versions for the three major operating systems – Windows, macOS, and Linux. Simply choose the one that matches your system, and you’ll get clear download instructions right there.

If you’re on Windows, click on the Windows option, and you’ll see two download choices: one for 32-bit and another for 64-bit systems. Just pick the one that matches your setup, download it, and run the installer.

For Mac users, when you select the macOS option, you’ll also find instructions on how to install Git using [<VPIcon icon="iconfont icon-homebrew"/>Homebrew](https://brew.sh/). Just follow those steps, and your installation will be done in no time.

And for those using Linux or other Unix-based systems, you can follow the installation guide provided on the site according to your distribution. The entire process is simple and straightforward.

Once you have Git installed, the next step is to open your terminal or command prompt. If you’re using a Mac, open the Terminal app. For Windows users, you can use either Command Prompt or PowerShell – both will work just fine.

But after installing Git, you’ll usually get a separate terminal called **Git Bash**. You can use that too if you prefer. Many developers like working in Git Bash because it feels very similar to a Linux terminal and makes running Git commands easy and intuitive.

On Windows, you can open Git Bash by right-clicking anywhere inside a folder and selecting **“Git Bash Here”.**

![Open Git Bash from inside any folder](https://cdn.hashnode.com/res/hashnode/image/upload/v1765568453563/43d574fe-ba17-4a8a-b7ae-ec0fa71d84eb.jpeg)

You can also open it by searching for **Git Bash** from the Start menu.

![Opening Git Bash from Start Menu](https://cdn.hashnode.com/res/hashnode/image/upload/v1765568550303/8e54b211-475b-4774-bbf6-6b76674d8fcf.png)

When it opens, you’ll see a terminal window that looks very similar to a Linux or macOS terminal, with a dark background and a command prompt ready to accept Git commands.

![Git Bash Terminal](https://cdn.hashnode.com/res/hashnode/image/upload/v1765567732235/e6edfc98-778b-47be-a70e-97821fa243c1.png)

For the rest of this tutorial, I’ll be using **macOS with the default Terminal app**, but the Git commands themselves are exactly the same on Windows (Git Bash) and Linux. If you’re using Windows or Linux, you can follow along using your terminal of choice – only the way you open the terminal may differ slightly.

So now open your terminal. The first thing you need to do is make sure Git is properly installed, right? To check that, type a simple command in the terminal:

```sh
git --version
```

Then press Enter. As soon as you do that, you’ll see an output on the terminal showing the version of Git installed on your machine. Keep in mind that the version number might not be the same for everyone – it depends on when you installed Git and which update you’re using.

If Git is installed correctly, you’ll see this version output. But if it isn’t installed, you’ll get an error message instead. Hopefully, Git is now properly set up on your machine, and you’re ready to start using it.

---

## How to Create a Project and Initialize a Local Repository

Now it’s time to get hands-on and do some practical work. As I mentioned earlier, Git can be implemented in any file or folder, right? So first, you need to create a few files and folders to work with.

Start by navigating to the desktop using the terminal:

```sh
cd ~/Desktop
```

Here, `cd` is a terminal command that stands for “change directory.” It simply means you’re moving from one folder to another. Hopefully, you’re already familiar with some basic terminal commands like `cd`, `pwd`, `touch`, and `mkdir`. If not, you can easily learn them using Google or tools like ChatGPT. They’re simple to understand.

Just remember, for Windows users, some of these commands might be slightly different. And keep in mind, commands like `cd`, `pwd`, `touch`, and `mkdir` are general terminal commands – not Git commands.

Now that you’re inside the Desktop directory, create a new folder where you’ll keep all your project files. Name it <VPIcon icon="fas fa-folder-open"/>`git-one`:

```sh
mkdir git-one
```

Press Enter. You’ve now created a new folder named <VPIcon icon="fas fa-folder-open"/>`git-one` inside the Desktop directory. Move into that folder like this:

```sh
cd git-one
```

You’re now inside the <VPIcon icon="fas fa-folder-open"/>`git-one` folder, and this is where your Git project begins. Inside the <VPIcon icon="fas fa-folder-open"/>`git-one` folder, create two files:

```sh
touch one.txt
touch two.txt
```

Next, create another folder named <VPIcon icon="fas fa-folder-open"/>`myfolder`:

```sh
mkdir myfolder
```

Then use `cd myfolder` to enter the folder. Inside this folder, create another file:

```sh
touch three.txt
```

Now check everything you’ve created in your file system. On macOS, for example, you can open the <VPIcon icon="fas fa-folder-open"/>`git-one` folder in Finder by running:

```sh
open .
```

Here, the dot means “the current folder.” As soon as you press Enter, Finder opens up. Inside the <VPIcon icon="fas fa-folder-open"/>`git-one` folder, you’ll see two files, <VPIcon icon="fas fa-file-lines"/>`one.txt` and <VPIcon icon="fas fa-file-lines"/>`two.txt`, and a folder named <VPIcon icon="fas fa-folder-open"/>`myfolder`, which contains the <VPIcon icon="fas fa-file-lines"/>`three.txt` file.

Now write something inside each of the files. Open <VPIcon icon="fas fa-file-lines"/>`one.txt` in a text editor, write `one`, and save it. Then open <VPIcon icon="fas fa-file-lines"/>`two.txt`, write `two`, and save that as well. Finally, go inside the <VPIcon icon="fas fa-folder-open"/>`myfolder` directory, open <VPIcon icon="fas fa-file-lines"/>`three.txt`, write `three`, and save it. Now all three files contain some content.

![Finder Open Git One Folder](https://cdn.hashnode.com/res/hashnode/image/upload/v1765442159140/ff01dfea-fe75-4b27-9a91-8133cd538f1f.gif)

This <VPIcon icon="fas fa-folder-open"/>`git-one` folder is your **working directory**. As mentioned earlier, this is the folder where you’re doing all your work, and where all your files are stored.

If you want Git to start monitoring everything inside this <VPIcon icon="fas fa-folder-open"/>`git-one` folder, you have to tell Git, “This is my project folder. Track all the changes here.” To do this, go back to the terminal, make sure you’re inside the <VPIcon icon="fas fa-folder-open"/>`git-one` folder, and type this:

```sh
git init
```

The word `init` means “initialize.” In other words, you’re telling Git to start working inside this folder from now on. Once you run the command, it shows a message: “Initialized empty Git repository.” That means Git has now started tracking this folder.

So how do you know that? Since you’re inside the <VPIcon icon="fas fa-folder-open"/>`git-one` folder, type this:

```sh
ls
```

You’ll see all the files and folders inside it. Now type:

```sh
ls -la
```

Notice that now you can also see a hidden directory named <VPIcon icon="iconfont icon-git"/>`.git`. The `ls -la` command lets you view hidden files and folders.

Operating systems hide certain files and folders by default to protect users from accidentally modifying or deleting critical system data. These hidden files usually store configuration, metadata, or internal information that regular users don’t need to touch. For example, you might see hidden files like `.env`, `.DS_Store`, or `.config` in different projects.

![Git Init and Hidden <VPIcon icon="iconfont icon-git"/>`.git` Folder](https://cdn.hashnode.com/res/hashnode/image/upload/v1765442184486/d3a47514-cf80-4401-ae98-cb96b8924464.png)

You can see a hidden folder named <VPIcon icon="iconfont icon-git"/>`.git` inside your project directory. Who created it? Git did. This <VPIcon icon="iconfont icon-git"/>`.git` folder is actually the core of the entire project. It’s where Git keeps all its internal data, such as which files have changed, who made the changes, and what the previous versions were. In short, everything Git does is stored right here.

The <VPIcon icon="iconfont icon-git"/>`.git` folder is hidden for the same reason: it contains Git’s internal database and configuration. You normally never edit anything inside <VPIcon icon="iconfont icon-git"/>`.git` manually. If this folder is deleted or corrupted, Git loses the entire history of the project. Hiding it helps prevent accidental damage.

From now on, Git will be able to track every change you make in your work. Let’s say you make some changes to the three files you created earlier. That means you now have a **local Git repository**. By running `git init`, Git created the hidden <VPIcon icon="iconfont icon-git"/>`.git` folder and started tracking this directory as a repository. From this point on, any changes you make to files inside this folder can be staged, committed, and recorded in Git’s history. Even though you haven’t made a commit yet, the repository already exists locally and is ready to track your work.

---

## How to Create a Remote Repository on GitHub and Clone It

You can also create a **remote repository** directly. I mentioned this earlier, so let’s see how to do it. Open your browser again and go to:

```plaintext
https://github.com
```

If you’re new, you’ll need to create an account on GitHub first. If you’re already logged in, you’ll see your profile. On the left side, you can see your repositories, feeds, and other details. Your goal is to store your local files on GitHub.

To do that, you need to create a new repository on GitHub. Click the blue **New** button. Just like you used `git init` to create a local repository, here you can initialize one in the cloud. Give it a name – for example, <VPIcon icon="fas fa-folder-open"/>`git-journey` – and in the description, write something like “You are learning Git and GitHub.” Keep it public so everyone can view it. Then click the **Create Repository** button. You’ve now created a new repository on GitHub.

Right now, the repository is completely empty – it doesn’t have any files in it. To add some files, click the **Create a new file** button, name it <VPIcon icon="fas fa-file-lines"/>`one.txt`, and inside the file, write `one`. Then click the **Commit changes** button. The term “commit” basically means “save.” Committing is like saving a file – nothing complicated. Don’t worry about this too much now, as I’ll explain commits in more detail later.

For now, there’s already a default commit message saying “Create one.txt,” so you can keep that as it is and click **Commit changes**. Next, create another file the same way – this time naming it <VPIcon icon="fas fa-file-lines"/>`two.txt`, writing `two` inside, and saving it. Now, if you check your GitHub repository, you can see two files there: <VPIcon icon="fas fa-file-lines"/>`one.txt` and <VPIcon icon="fas fa-file-lines"/>`two.txt`.

![GitHub New Repository with Two Files](https://cdn.hashnode.com/res/hashnode/image/upload/v1765442212397/732bc0ff-60e4-4d43-a863-b1760453ec80.gif)

At this point, you have two repositories – one on the cloud (GitHub), and another one locally on your computer. You initialized the local one yourself earlier, but now you want to bring the GitHub repository down to your machine by **cloning** it.

Go back to your terminal. Suppose you’re currently inside the <VPIcon icon="fas fa-folder-open"/>`git-one` folder, but you want to clone the remote repository onto your Desktop. In the terminal, type:

```sh
cd ../
```

This command takes you back to the Desktop. Now, you’re going to clone the remote repository – the one you just created on GitHub. For that, you need a link, which is the repository’s URL. Go back to GitHub, open that repository, and click on the **Code** button. There, you’ll see an HTTPS link. Copy that link. Then, in the terminal, type the following:

```sh
git clone <repository-https-link>
```

Replace `<repository-https-link>` with the link you just copied, and press Enter. Git pulls your GitHub repository down onto your local machine.

![Cloning GitHub Repository](https://cdn.hashnode.com/res/hashnode/image/upload/v1765442236567/d4ad9633-897c-421b-979f-121c77573078.gif)

After a few moments, the cloning process is complete. To verify whether the repository has been successfully cloned, type in the terminal:

```sh
ls
```

Remember that this command shows the list of folders in your current location. You’ll see a new folder named <VPIcon icon="fas fa-folder-open"/>`git-journey`, alongside your previous <VPIcon icon="fas fa-folder-open"/>`git-one` folder. Enter the <VPIcon icon="fas fa-folder-open"/>`git-journey` folder like this:

```sh
cd git-journey
```

You’re now inside the <VPIcon icon="fas fa-folder-open"/>`git-journey` directory. If you type this:

```sh
ls
```

you can see the contents of the folder. Inside it you should see the two files, <VPIcon icon="fas fa-file-lines"/>`one.txt` and <VPIcon icon="fas fa-file-lines"/>`two.txt`. To see hidden files, type:

```sh
ls -a
```

You’ll find a <VPIcon icon="iconfont icon-git"/>`.git` folder here as well. That proves this is also a complete Git repository, cloned from the cloud. Earlier, you saw the same thing in your local repository, right? So, this is how you can create a Git repository in two ways – one by initializing it locally, and the other by cloning it from GitHub or any other remote server. No matter which way you create it, to start working with Git, initialization is always required.

---

## How to Track Changes with `git status`

Now let’s look at something new. Suppose you’re currently inside the <VPIcon icon="fas fa-folder-open"/>`git-journey` folder. This is the repository you just cloned from the remote, right? If you make any changes to this repository – for example, you open the file <VPIcon icon="fas fa-file-lines"/>`one.txt` in a text editor, keep everything as it was, but add the number `1` at the end and save the file – you might want to know what exactly changed, or whether Git has detected the modification.

To check that, type in the terminal:

```sh
git status
```

As soon as you run this command, Git immediately tells you: `modified - one.txt`. This means Git has already detected the change you made in that file.

Now let’s say you make a small change in <VPIcon icon="fas fa-file-lines"/>`two.txt` as well – just adding a `2` at the end – and then run `git status` again. This time it shows `modified - two.txt`. That means both files have been changed, and Git has detected both modifications.

This is exactly how Git continuously keeps an eye on every change you make. It’s like it’s always watching over your project. At any moment, you can run the `git status` command to see which files have been modified or updated.

In a real project, you’ll often work with multiple files at the same time, right? In that case, `git status` gives you a clear summary of the overall situation: what has changed, which files are new, and which ones are modified.

So, up to this point, you’ve learned that you can initialize Git in two ways – either locally or from a remote repository. And with `git status`, you can easily check what changes have been made in your working directory.

![Git Status Showing Modified Files](https://cdn.hashnode.com/res/hashnode/image/upload/v1765442263827/d48beb32-1dcf-4dc6-81df-a64adced52c1.gif)

Now let’s move out of the working directory into the staging area.

---

## How to Move Changes to the Staging Area with `git add`

So far, you’ve only worked inside the **working directory**. That means you’ve created and modified files, but you haven’t yet told Git to keep those changes. Now you’re going to move them into the **staging area**.

In Git’s terminology, the process of moving changes from the working directory to the staging area is called **adding**. Simply put, `git add` means telling Git, “I want to keep this change.” Right now, inside the <VPIcon icon="fas fa-folder-open"/>`git-journey` folder, you have two files, and both have been modified.

Now create another folder inside <VPIcon icon="fas fa-folder-open"/>`git-journey`, named <VPIcon icon="fas fa-folder-open"/>`myFolder`:

```sh
mkdir myFolder
```

Use `cd myFolder` to enter that folder. Inside <VPIcon icon="fas fa-folder-open"/>`myFolder`, create a new file named <VPIcon icon="fas fa-file-lines"/>`three.txt`:

```sh
touch three.txt
```

Open <VPIcon icon="fas fa-file-lines"/>`three.txt` in your text editor, write `three`, and save the file. Now, you’ve made quite a few changes:

- You created a new folder.
- You added a new file.
- You modified some existing ones.

Your entire project has gone through multiple changes. Go back to the repository’s root folder (the <VPIcon icon="fas fa-folder-open"/>`git-journey` folder) by running this:

```sh
cd ..
```

From here, check which files have actually been changed:

```sh
git status
```

Git shows that two text files have been modified, and a new folder has been created. Git also says that the old files are “tracked,” while the new folder is “untracked.” Why is that? Because the old files came from the remote repository you cloned earlier, so Git already knows about them. But since <VPIcon icon="fas fa-folder-open"/>`myFolder` is newly created, Git doesn’t recognize it yet.

If you want to move everything to the staging area at once, you have two options: use `git add --all` or the shorter version `git add -A`. Both commands do exactly the same thing. Try it out:

```sh
git add --all
git status
```

![Git Add All and Status](https://cdn.hashnode.com/res/hashnode/image/upload/v1765442889338/448d6a6e-df96-4e74-be07-13d285f3ca5f.png)

Git has staged everything. All the changes you made are now “ready to commit.” You’ll learn more about commits in detail later. For now, just remember that when you use `git add --all`, Git takes every change and prepares it for the next commit. If you want to go back to the previous state – that is, remove everything from the staging area and return them to the working directory – type this:

```sh
git reset
git status
```

You’ll notice everything is back to the earlier state.

![Git Reset and Status](https://cdn.hashnode.com/res/hashnode/image/upload/v1765442910152/1b8a64da-813c-4925-846f-0a0b5527aa76.gif)

Now try `git add -A`:

```sh
git add -A
git status
```

![Git Add A and Status](https://cdn.hashnode.com/res/hashnode/image/upload/v1765442932087/5eb27c66-5fee-4d87-bc11-2fee381e9288.png)

You’ll see that Git has staged everything again. So whether you use `git add --all` or `git add -A`, both do the same thing – Git stages every change. Next, run:

```sh
git reset
git status
```

Everything is unstaged again. Now, in this state, if you type this:

```sh
git add .
```

![Git Add Dot and Status](https://cdn.hashnode.com/res/hashnode/image/upload/v1765442982841/bb3acfb7-b236-4230-8fd8-f48ef9c69093.png)

at first glance it seems like it’s doing the same thing as `git add --all`, as everything appears to be staged. But there’s an important difference. Reset again:

```sh
git reset
```

Now go inside the <VPIcon icon="fas fa-folder-open"/>`myFolder` directory:

```sh
cd myFolder
git add .
git status
```

![Git Add Dot Inside Folder and Status](https://cdn.hashnode.com/res/hashnode/image/upload/v1765443005193/c5d8a16e-d85d-431c-a56a-2a79326980fb.gif)

Git has only staged the <VPIcon icon="fas fa-file-lines"/>`three.txt` file that’s inside <VPIcon icon="fas fa-folder-open"/>`myFolder`. The other files in the root folder are still unstaged. This difference is really important:

- `git add --all` or `git add -A` stage every change across the entire project.
- `git add .` stages only the changes within the **current directory** (and its subdirectories).

Also, if there were a subfolder inside <VPIcon icon="fas fa-folder-open"/>`myFolder`, using the dot would still include the files inside that subfolder too. In simple terms, the dot means “the current directory and everything inside it.”

So now you’ve seen three variations of the `git add` command: `--all`, `-A`, and `.` (dot). The first two work exactly the same way, while the dot version is limited to the current directory. Now run:

```sh
git reset
git status
```

to bring everything back again. Return to the root folder:

```sh
cd ..
```

And stage everything again:

```sh
git add --all
```

Now all files are ready to commit. At this point, imagine you make some changes directly in the working directory. For example, you delete the file <VPIcon icon="fas fa-file-lines"/>`two.txt` and create a new one named <VPIcon icon="fas fa-file-lines"/>`four.txt`, writing `four` inside it. That means you’ve deleted one file and added another new one.

Check the status:

```sh
git status
```

Git shows that under “Changes to be committed,” the previously staged files are still there. But under “Changes not staged for commit,” it now lists <VPIcon icon="fas fa-file-lines"/>`two.txt` as deleted and <VPIcon icon="fas fa-file-lines"/>`four.txt` as untracked. Now type:

```sh
git add *
git status
```

![Git Add Asterisk and Status](https://cdn.hashnode.com/res/hashnode/image/upload/v1765443030396/e69e74ab-9980-48f4-bf94-dd1fe525faea.png)

Git has staged the newly created <VPIcon icon="fas fa-file-lines"/>`four.txt` file, but it hasn’t staged the deleted <VPIcon icon="fas fa-file-lines"/>`two.txt` file. That’s why it’s important to understand that `git add *` only stages **new or modified files**, but **not deleted ones**. So to summarize:

- `git add *` stages visible new/modified files, but not deletions.
- `git add .` stages changes in the current directory, including modifications and deletions.
- `git add -A` / `git add --all` stage all changes (additions, modifications, deletions) across the entire repo.

Reset again:

```sh
git reset
git status
```

If you want to stage only a specific file – say <VPIcon icon="fas fa-file-lines"/>`one.txt`, which has been modified – you can do that by typing:

```sh
git add one.txt
```

Similarly, if you want to stage a file inside a folder (for example the file inside <VPIcon icon="fas fa-folder-open"/>`myFolder`) you can write:

```sh
git add myFolder/three.txt
```

You can also stage a single file like this:

```sh
git add two.txt
git status
```

You’ll see that only <VPIcon icon="fas fa-file-lines"/>`two.txt` has been staged. You can also stage files by their extension. For example, to stage all <VPIcon icon="fas fa-file-lines"/>`.txt` files:

```sh
git reset
git add *.txt
git status
```

![Git Add Txt Files and Status](https://cdn.hashnode.com/res/hashnode/image/upload/v1765443054715/07804ce7-1389-41bf-a48a-f2e83c3c3456.gif)

This command stages all <VPIcon icon="fas fa-file-lines"/>`.txt` files in the current directory, excluding deleted ones and excluding files inside subfolders.

Finally, if you want to stage **everything** at once, a simple and common practice is to go to the root directory and type:

```sh
git add .
git status
```

All the changes are now staged together. That means all your changes have been moved from the working directory to the staging area.

---

## How to Save Work Permanently with `git commit` (and Configure Git)

So far, you’ve learned how to move changes from the working directory to the staging area using the `git add` command. Now let’s see how to save those changes from the staging area to the local repository. In Git’s language, this is called a **commit**. It means you’re confirming and saving your changes permanently.

You can think of it like getting ready for a party. You don’t just walk straight out the door. First, you stand in front of a mirror and check your clothes, shoes, accessories, and hair. That’s the stage where you make adjustments – maybe you realize, “This shirt doesn’t look good,” or “Let me change these shoes.” That’s an intermediate step. You haven’t left for the party yet – you’re just making sure everything is in order. If something’s off, you can fix it right there. Once you’re satisfied and everything looks perfect, that’s when you finally leave for the party.

Git works in the same way. Instead of going straight from the working directory to the local repository, you first move your changes to the staging area. This is an intermediate step where you can review, adjust, or even remove changes before saving them permanently. You don’t commit directly from the working directory because the staging area gives you a chance to verify everything before finalizing. When you finally “commit,” it means you’re sure everything is correct – no more mistakes – and now the work can be saved permanently. That’s why this process is called a commit.

First, check your current state:

```sh
git status
```

It shows that the staging area contains some changes that are ready but not yet committed. To commit them, write this:

```sh
git commit -m "I have made some changes to files"
```

The `-m` flag lets you add a short message describing what you changed.

Sometimes an error may appear the first time you try to commit. When you install Git for the first time and attempt a commit, you might see a message like this:

```plaintext
*** Please tell me who you are
```

![Git Commit Error - Please Tell Me Who You Are](https://cdn.hashnode.com/res/hashnode/image/upload/v1765443087625/11b0ecda-49e6-48e6-9171-4b3ec11f4478.png)

This is completely normal. It’s just Git’s way of asking for your identity before recording a commit. Git needs to know who is making the changes and from which email address. This information is attached to every commit in the project history, which later helps track who made which changes.

Fixing this issue is simple. Git tells you exactly what to do. Run the following two commands:

```sh
git config --global user.email "your@email.com"
git config --global user.name "your name"
```

By running these two commands, the problem is solved. The first command sets your email address, and the second sets your name. The `--global` flag means that this configuration will apply to your entire computer - so every Git commit you make from this machine will use the same name and email.

If you want to make the configuration specific to a single project, you can use the `--local` flag instead. That way, the settings will apply only to that particular repository.

In short, when you use Git for the first time, setting up your user configuration is mandatory. It’s part of the basic Git setup you need to do before committing. Once it’s configured, Git will automatically recognize your identity for all future commits. If Git is already configured, you don’t need to set it up again.

Now, let’s go back to the main task of making a commit:

```sh
git commit -m "I have made some changes to files"
```

![Git Commit Successful](https://cdn.hashnode.com/res/hashnode/image/upload/v1765443109452/9960deef-7e54-46f0-b0a2-328ab52a2b4a.png)

Now the commit is done. The terminal shows how many files were changed, how many lines were added, and how many were deleted. You can verify everything by checking the status:

```sh
git status
```

Everything looks clean now, meaning all the changes have been successfully saved in the local repository. From now on, whenever you make new changes to any file, you’ll have to stage and commit them again, just like before.

One more thing about commits: you can always roll back to the previous state if needed. To do that, type the following:

```sh
git reset HEAD~
git status
```

This command will undo the last commit and bring everything back to the working directory. You’ll see that all the files have returned to the working directory, ready to be staged again. You can now modify or commit them as you wish.

This shows how much control Git gives you over your work. It’s just about remembering the right commands.

Before we move on to deleting and restoring files, go ahead and make a new commit again so you’re working from a clean state:

```sh
git add .
git commit -m "I have made some changes to files"
```

---

## How to Delete and Restore Files with `git rm` and `git reset`

Now the commit is done. Manually delete the <VPIcon icon="fas fa-file-lines"/>`one.txt` file from your file system and then go back to the terminal. Type:

```sh
git status
```

Git shows that <VPIcon icon="fas fa-file-lines"/>`one.txt` has been deleted. If you then type:

```sh
git add .
```

the deletion will also be staged. Instead of deleting a file manually and then adding it again, you can perform both steps in a single command. If you want to delete a file and stage that deletion at the same time, type:

```sh
git rm four.txt
```

Here, <VPIcon icon="fas fa-file-lines"/>`four.txt` is just an example. This command deletes <VPIcon icon="fas fa-file-lines"/>`four.txt` and automatically moves that change to the staging area. Once you run this and check the status:

```sh
git status
```

![Git Rm and Status](https://cdn.hashnode.com/res/hashnode/image/upload/v1765443133023/f9d77e54-9829-4ff2-bd45-9e91b520bef0.gif)

you’ll notice that <VPIcon icon="fas fa-file-lines"/>`four.txt` has been deleted and staged. You no longer have to perform two separate steps – deleting and adding manually. You can do both at once with this shortcut.

If you check in your file explorer, you’ll see that <VPIcon icon="fas fa-file-lines"/>`four.txt` has disappeared. Now, roll back the deleted file using `git reset`. When you run a regular `git reset`, it only brings back the **staged changes**, not the deleted files. You’ll see the message “Unstaged changes after reset.” But if you check your file system, the deleted file hasn’t returned. That’s because a regular reset only brings back staging information, not the physical file. You can confirm this with:

```sh
git status
```

You’ll notice only the changes are back, and that manually deleted files are still missing. If you want to restore everything (both the changes and the deleted files) you have to run:

```sh
git reset --hard
```

Once you execute this, both your changes and the deleted files return to their previous state.

Now let’s explore the use of `git rm` a bit deeper. Suppose you want to remove a file. First, reset everything:

```sh
git reset --hard
```

![Git Reset Hard](https://cdn.hashnode.com/res/hashnode/image/upload/v1765443156544/ba29878e-c5b8-48a8-8110-d7f80bc9d5be.gif)

Now you’re back to your original state. Edit the <VPIcon icon="fas fa-file-lines"/>`four.txt` file and write `4` inside it. That means there’s now a modification in the working directory. If you try to delete it directly using:

```sh
git rm four.txt
```

the file isn’t deleted, and Git shows an error: “the following file has local modifications.” This means Git isn’t allowing the deletion because it has detected uncommitted changes in that file.

Before you can remove it, you either have to commit those changes or confirm that you truly want to discard them. If you’re sure you want to delete the file anyway, you can force it by using:

```sh
git rm -f four.txt
```

As soon as you run this command, the file is forcefully deleted. If you check your file explorer, you’ll see that <VPIcon icon="fas fa-file-lines"/>`four.txt` is gone. Now consider another situation. Run another hard reset:

```sh
git reset --hard
```

This brings everything back again. Modify <VPIcon icon="fas fa-file-lines"/>`four.txt` by writing `hello` inside it. Now, if you type:

```sh
git rm --cached four.txt
```

this removes the file from the staging area but keeps it physically in your working directory. Check it:

```sh
git status
```

You’ll see that <VPIcon icon="fas fa-file-lines"/>`four.txt` has moved to the “Untracked files” section: it’s no longer staged, but the file itself still exists in the system. That’s the difference between the `--force` and `--cached` flags:

- `git rm -f` completely deletes the file.
- `git rm --cached` removes the file from staging (and from tracking), but keeps it in your working directory.

Another useful command is:

```sh
git rm -r folder
```

Here, the `-r` flag stands for “recursive.” This means if the folder contains other subfolders or files, all of them will be removed recursively. If you mention the folder name without `-r`, then only that folder will be removed, not its contents. Try this out. Reset everything again:

```sh
git reset --hard
```

Now experiment with <VPIcon icon="fas fa-folder-open"/>`myFolder`:

```sh
git rm -r myFolder
git status
```

The folder is deleted from your file system as well, and <VPIcon icon="fas fa-folder-open"/>`myFolder` is listed as deleted and staged automatically. Reset everything again:

```sh
git reset --hard
```

---

## How to View Commit History with `git log`

So far, you’ve made quite a few commits. Now you’ll learn how to view those commits. Viewing commits means checking the **commit log**. In the terminal, type:

```sh
git log
```

![Git Log Showing Commit History](https://cdn.hashnode.com/res/hashnode/image/upload/v1765443180087/c4acc03d-e2a2-424e-b6e7-30b7cec94ddd.gif)

You’ll see the full commit history. You might see three commits, for example. Along with each one, there are details and messages that clearly describe what was done in that commit.

You’ll also notice long random strings which are **commit IDs**. Using these IDs, you can go back to previous versions later on. The first two commits might be the ones created when you made files while setting up your GitHub repository, and the last one might be when you modified some files recently.

If you want to view this log in a cleaner, more compact format, you can use:

```sh
git log --oneline
```

Once you run it, you’ll see a short summary of each commit with just the essential information. The commit IDs are also shown in a shortened format. These shortened IDs can also be used to return to any previous version later on.

---

## Branching and Merging in Git

Now let’s move on to one of Git’s most powerful and important features: **branching**. At the moment, your repository has only one branch. A branch in Git is like a separate line of development where you can work independently.

If you check the online repository you cloned earlier, you’ll see that the default branch is called **main**. This is the default branch where all work begins. In recent times, Git has shifted from calling it “master” to “main,” but the idea remains the same: the main branch is your project’s central line of development.

To understand branching more simply, imagine you’re working in the kitchen of a large restaurant. The **main branch** is the main kitchen where all the dishes are prepared and served to customers. Now, if your client wants to try a new dish or recipe, you wouldn’t experiment directly in that main kitchen, because if something goes wrong, it could ruin everything.

Instead, you create a separate *test kitchen* where you can safely prepare and test the new dish. Once the recipe is perfected, you bring it back into the main kitchen to serve it officially.

Git works exactly the same way. Instead of making changes directly in the main branch, you create a separate **development branch** where you test and commit all your changes. Once everything is stable and verified, you merge that branch back into the main branch. This ensures that your main project stays safe, while new features can be developed and tested without breaking anything.

In short, branching in Git provides a secure and organized intermediate step that allows you to review, test, and manage changes before merging them into the main codebase.

![Git Branching and Merging](https://cdn.hashnode.com/res/hashnode/image/upload/v1765443203531/fa09c9c1-c1e6-4617-bc35-8d16c7902b4d.gif)

Since I’ve already mentioned the word “merge”, let’s understand what it means. **Merging** simply means combining the changes from two branches into one. It’s an important concept for understanding how branches work.

In Git, you can create multiple branches – like <VPIcon icon="fas fa-code-branch"/>`staging`, <VPIcon icon="fas fa-code-branch"/>`development`, `frontend`, or `backend` – and work on each of them separately. Once all the changes are finalized and tested, they’re merged back into the main branch.

Right now, your application has only one branch. To see how many branches you have, type:

```sh
git branch
```

![Git Branch Command](https://cdn.hashnode.com/res/hashnode/image/upload/v1765443230339/361868df-dc2f-4b01-8773-5a6b16fb721f.png)

This command shows the list of all branches. At the moment, you may have only one, and the branch you’re currently in has a star (`*`) next to it.

To create a new branch, type `git branch` followed by the branch name. For example:

```sh
git branch development
git branch
```

![Git Create New Branch](https://cdn.hashnode.com/res/hashnode/image/upload/v1765443248217/e70e516a-1601-401e-a02a-6a25d020b97a.png)

You’ll see two branches listed: <VPIcon icon="fas fa-code-branch"/>`main` and <VPIcon icon="fas fa-code-branch"/>`development`. The star next to <VPIcon icon="fas fa-code-branch"/>`main` means you’re still on the main branch. You can easily switch from one branch to another.

When a new branch is created, it takes the exact state of the branch you were on at that moment. So, in this case, the <VPIcon icon="fas fa-code-branch"/>`development` branch is an exact copy of the <VPIcon icon="fas fa-code-branch"/>`main` branch. Whenever you create a new branch, it inherits the current state of the branch you’re in.

Now that you’ve created a new branch, switch to it:

```sh
git checkout development
git status
```

You’re now inside the <VPIcon icon="fas fa-code-branch"/>`development` branch. If you check the status, everything looks clean, because the <VPIcon icon="fas fa-code-branch"/>`development` branch was created with the same content as <VPIcon icon="fas fa-code-branch"/>`main`. Go to your file system and create a new file named <VPIcon icon="fas fa-file-lines"/>`three.txt`. Inside it, write `three`. Then, back in the terminal:

```sh
git status
git add .
git commit -m "I created three.txt and entered three there"
```

Now your commit is done inside the <VPIcon icon="fas fa-code-branch"/>`development` branch. Next, switch back to the main branch:

```sh
git checkout main
```

When you check your file system now, you’ll notice that <VPIcon icon="fas fa-file-lines"/>`three.txt` is no longer there. Why? Because the changes made in the <VPIcon icon="fas fa-code-branch"/>`development` branch exist only in that branch. Those changes haven’t been merged into <VPIcon icon="fas fa-code-branch"/>`main` yet. The moment you switch back to <VPIcon icon="fas fa-code-branch"/>`main`, Git automatically hides the changes made in <VPIcon icon="fas fa-code-branch"/>`development`, showing you only what exists in the main branch.

This demonstrates how much control Git has over your file system. When you switch branches, Git instantly adjusts which files are visible so that you only see the changes relevant to that specific branch. There’s no duplication or conflict in your file system, as Git manages everything seamlessly.

![Git Switch Branches and Isolated Changes](https://cdn.hashnode.com/res/hashnode/image/upload/v1765443271077/5e9a82df-941f-4692-8eb9-56da9e784085.gif)

In this way, you can create hundreds of branches, each containing its own set of changes, and Git will always show you a separate, isolated view for each one.

For any change to take effect, you must commit it. Whatever branch you’re working in, the commit must be made there. Once committed, Git understands that those changes belong exclusively to that specific branch. That’s why, when you switch back to the main branch, the changes made in the <VPIcon icon="fas fa-code-branch"/>`development` branch don’t appear there.

Now suppose you make a new change to the <VPIcon icon="fas fa-file-lines"/>`four.txt` file while you’re on the <VPIcon icon="fas fa-code-branch"/>`main` branch – you add a `4` to it. Then, if you check the status:

```sh
git status
git add .
git commit -m "I changed four.txt and added additional 4"
```

Now, both branches have changes – the <VPIcon icon="fas fa-code-branch"/>`main` branch has this new commit, and the <VPIcon icon="fas fa-code-branch"/>`development` branch still has its previous one. Since both branches now contain updates, you’ll need to merge the changes.

First, switch to the <VPIcon icon="fas fa-code-branch"/>`development` branch:

```sh
git checkout development
```

Now run:

```sh
git merge main -m "merging main into development"
```

![Git Merge Main into Development](https://cdn.hashnode.com/res/hashnode/image/upload/v1765443302835/c0510bc0-f03f-4203-9d51-b2bac312af5a.png)

After the merge, the changes made in the <VPIcon icon="fas fa-code-branch"/>`main` branch appear inside the <VPIcon icon="fas fa-code-branch"/>`development` branch as well. For example, the updated <VPIcon icon="fas fa-file-lines"/>`four.txt` file is now present in the <VPIcon icon="fas fa-code-branch"/>`development` branch alongside the previous changes. Both branches’ updates have been combined, and the <VPIcon icon="fas fa-code-branch"/>`development` branch now reflects all the latest modifications.

Next, switch back to the <VPIcon icon="fas fa-code-branch"/>`main` branch:

```sh
git checkout main
```

The changes from the <VPIcon icon="fas fa-code-branch"/>`development` branch haven’t yet appeared here. From <VPIcon icon="fas fa-code-branch"/>`main`, merge everything from <VPIcon icon="fas fa-code-branch"/>`development`:

```sh
git merge development -m "merging on main with development"
```

After running this command, you’ll see that the <VPIcon icon="fas fa-file-lines"/>`three.txt` file from the <VPIcon icon="fas fa-code-branch"/>`development` branch now appears in <VPIcon icon="fas fa-code-branch"/>`main` as well. Both branches’ changes have been successfully merged, and the merge process is complete.

### Understanding Merge Conflicts

Sometimes during a merge, conflicts may occur. A **merge conflict** happens when the same part of a file has been changed differently in two branches.

For example, if you modified <VPIcon icon="fas fa-file-lines"/>`one.txt` in the <VPIcon icon="fas fa-code-branch"/>`main` branch and someone else modified the exact same section of <VPIcon icon="fas fa-file-lines"/>`one.txt` in the <VPIcon icon="fas fa-code-branch"/>`development` branch, Git won’t know which version to keep.

In such cases, Git flags the file as having a conflict, and you have to resolve it manually by deciding which changes to keep – or by merging both versions yourself.

![Git Merge Conflict Example](https://cdn.hashnode.com/res/hashnode/image/upload/v1765443321837/154fb298-dd45-496f-b1c9-cc68c6b228c2.gif)

Right now, you’re on the <VPIcon icon="fas fa-code-branch"/>`main` branch. From here, you’ll create a new branch so that <VPIcon icon="fas fa-code-branch"/>`main` remains untouched while you simulate a conflict. Run:

```sh
git branch staging
git checkout staging
```

This creates a new branch named <VPIcon icon="fas fa-code-branch"/>`staging`, which contains all the latest updates from <VPIcon icon="fas fa-code-branch"/>`main`, and switches you to it. While working on the <VPIcon icon="fas fa-code-branch"/>`staging` branch, go to <VPIcon icon="fas fa-file-lines"/>`four.txt`. At the end of this file, there was the number `4`. Add `44` at the end and save the file. Now the <VPIcon icon="fas fa-code-branch"/>`staging` branch has a change.

Run the following:

```sh
git status
git add .
git commit -m "changed 44"
```

The <VPIcon icon="fas fa-code-branch"/>`staging` branch work is done. Next, switch back to the <VPIcon icon="fas fa-code-branch"/>`development` branch:

```sh
git checkout development
```

When you open <VPIcon icon="fas fa-file-lines"/>`four.txt` here, you don’t see the `44` you added earlier in <VPIcon icon="fas fa-code-branch"/>`staging`. So, write `444` and save the file. Then run:

```sh
git add .
git commit -m "added 444 on four.txt"
```

The <VPIcon icon="fas fa-code-branch"/>`development` branch now has its own separate change. While staying in the <VPIcon icon="fas fa-code-branch"/>`development` branch, try to merge the changes from the <VPIcon icon="fas fa-code-branch"/>`staging` branch:

```sh
git merge staging
```

![Git Merge Conflict Error](https://cdn.hashnode.com/res/hashnode/image/upload/v1765443344910/2991cf21-6397-45cb-aa96-70467a1244f8.png)

Git fails to merge automatically and shows an error:

```plaintext
Automatic merge failed; fix conflicts and then commit the result.
```

This happens because the same line in <VPIcon icon="fas fa-file-lines"/>`four.txt` was modified in both branches, <VPIcon icon="fas fa-code-branch"/>`staging` and <VPIcon icon="fas fa-code-branch"/>`development`. Git can’t decide which version should take priority, so it leaves the decision to you.

In this case, the developer working on the <VPIcon icon="fas fa-code-branch"/>`development` branch (or whoever is managing it) has to manually resolve the conflict. When you open <VPIcon icon="fas fa-file-lines"/>`four.txt` in a text editor, Git marks the conflicting section clearly, showing which part came from <VPIcon icon="fas fa-code-branch"/>`staging` and which part came from <VPIcon icon="fas fa-code-branch"/>`development`. You’ll see both the `44` from <VPIcon icon="fas fa-code-branch"/>`staging` and the `444` from <VPIcon icon="fas fa-code-branch"/>`development`. It’s now up to you to decide whether to keep one, remove one, or combine both changes.

While staying on the <VPIcon icon="fas fa-code-branch"/>`development` branch, you decide which version to keep – for example, `444`. You’ll then need to remove all the conflict markers, save the file, and then run:

```sh
git add .
git commit -m "merge conflict solved"
```

![Git Merge Conflict Markers](https://cdn.hashnode.com/res/hashnode/image/upload/v1765443365329/94fbc5e8-2cca-4423-b4ab-4f90898ea9c0.gif)

Now switch back to the <VPIcon icon="fas fa-code-branch"/>`staging` branch:

```sh
git checkout staging
```

When you open the file system and check <VPIcon icon="fas fa-file-lines"/>`four.txt`, it still shows `44`, meaning no change has been applied yet. At this point, you can choose to merge changes either into <VPIcon icon="fas fa-code-branch"/>`staging` or <VPIcon icon="fas fa-code-branch"/>`development` since both branches are now in sync in terms of expected final content.

From <VPIcon icon="fas fa-code-branch"/>`staging`, run:

```sh
git merge development
```

This time, Git merges everything smoothly without any conflict because both sides now contain compatible content. When you check the status:

```sh
git status
```

it shows everything is clean. Now, if you want to bring these merged changes into the <VPIcon icon="fas fa-code-branch"/>`main` branch, switch to it:

```sh
git checkout main
```

Once you’re on the <VPIcon icon="fas fa-code-branch"/>`main` branch and open the file system, you may notice that <VPIcon icon="fas fa-file-lines"/>`four.txt` doesn’t yet have the latest update. Merge the <VPIcon icon="fas fa-code-branch"/>`staging` branch:

```sh
git merge staging
```

![Git Merge Staging into Main](https://cdn.hashnode.com/res/hashnode/image/upload/v1765443386891/5b346d56-073a-4e58-a34c-736e2a25ba23.gif)

All the latest changes flow into the <VPIcon icon="fas fa-code-branch"/>`main` branch. The updates from both branches now combine into the final version. That’s how the entire process of merging and resolving merge conflicts works. You’ve now seen how branching works and how to switch from one branch to another using `git checkout`. Let’s dig a bit deeper into that command.

---

## How to Navigate History with `git checkout` and Compare Commits with `git diff`

Earlier, when we talked about `git log`, I mentioned that you can go back to a previous version using a commit ID. That’s what you’ll see now – and to do that, you’ll again use `git checkout`.

First, check your commit history:

```sh
git log --oneline
```

Suppose you have nine commits in your log. Make a small change. Open <VPIcon icon="fas fa-file-lines"/>`one.txt` and write `hello` inside it. Then stage and commit:

```sh
git add .
git commit -m "update one.txt file"
```

Next, run:

```sh
git log --oneline
```

All the commits are displayed. Now let’s say you want to switch back to one of your previous commits, specifically the one named “merging main into development.” To do that, copy the commit ID of that commit and type:

```sh
git checkout <that-commit-id>
```

![Git Checkout Previous Commit](https://cdn.hashnode.com/res/hashnode/image/upload/v1765443408851/61803cda-c1d2-4b19-a298-bf569e3e36f8.gif)

Earlier, when you switched branches, you used the branch name. This time, you’re using a commit ID instead. Remember, your commit ID will be different.

After running this command, the project moves from the <VPIcon icon="fas fa-code-branch"/>`main` branch to the exact state it was in at that previous commit. You must ensure that all your changes on <VPIcon icon="fas fa-code-branch"/>`main` are tracked and committed before doing this. If there are any untracked or uncommitted files, Git won’t allow you to checkout to a previous version.

Once you run the command, you’ll see that in the terminal, instead of showing <VPIcon icon="fas fa-code-branch"/>`main`, it now says something like:

```plaintext
HEAD detached at <commit-id>
```

That means you’ve successfully switched to that particular commit. If you open <VPIcon icon="fas fa-file-lines"/>`one.txt` now, you’ll notice that the `hello` line you added earlier is no longer there. This confirms that you’ve returned to the previous version of your project.

If you want to go back to your latest state – meaning returning to the main branch – use:

```sh
git checkout main
```

You’ve switched back to the <VPIcon icon="fas fa-code-branch"/>`main` branch, and you’re back to the most recent version of your project.

So now you’ve seen how to switch between commits and move from one version to another. Now we’ll explore how to compare one commit with another.

If you want to see the differences between your current commit and a previous commit (that is, what lines of code were added, what lines were deleted), you can do that easily using Git commands.

First, check your commit history again:

```sh
git log --oneline
```

Suppose there are now 10 commits in total. You’ll compare the commit “update one.txt file” with the previous one “merging main into development.” For that, you’ll need the commit IDs of both.

Since you’ve already run `git log`, copy those two IDs. Once you have them, write the command:

```sh
git diff <first-commit-id> <second-commit-id>
```

After running this command, Git shows the exact changes made between those two commits. The terminal displays which files were changed, what was removed (usually in red), and what was added (usually in green).

One important detail: in `git diff`, when you place the most recent commit ID first and the older one second, Git shows differences from the perspective of the newer commit – that is, what’s newly added or removed compared to the older one. If you reverse the order (older commit ID first and newer second), Git shows the opposite perspective. Try running the command both ways a few times and you’ll easily understand how the comparison works.

If you’re ever inside an interactive log or diff view, you can exit by pressing `q` on your keyboard. That closes the view immediately.

---

## How to Work with Remotes: `git push`, `git fetch`, and `git pull`

So far, everything you’ve done has been inside your local repository – staging files, making commits, and storing everything locally. But the real goal is to send those updates to the remote repository, like GitHub.

When you send local changes to a remote repository, that process is called a **push**. If any changes have been made in the remote repository that you want to bring into your local repository, you can use **fetch**.

When you run `git fetch`, the remote changes are downloaded into your local repository’s memory, but they won’t appear in your working directory yet. To update your working directory and see those changes in your files, you need to run `git pull`.

![Git Push Fetch Pull](https://cdn.hashnode.com/res/hashnode/image/upload/v1765443429569/e3d2882f-ad8e-4766-aa02-45633a983932.gif)

In short:

- **push** sends local changes to the remote.
- **fetch** brings remote changes into your local repository (but does not merge them into your working directory).
- **pull** fetches and merges; it updates your working directory immediately.

In other words:

```plaintext
git pull = git fetch + git merge
```

### Example: `git push`

You’ve already made several changes in your local repository, and now you want to push them to the remote <VPIcon icon="fas fa-code-branch"/>`main` branch. Since you’re currently on the <VPIcon icon="fas fa-code-branch"/>`main` branch, use:

```sh
git push origin main
```

![Git Push Main Branch](https://cdn.hashnode.com/res/hashnode/image/upload/v1765443452657/0e0d3603-bc38-4ec0-9517-687dbf83c393.gif)

Here, `origin` refers to the remote repository, and <VPIcon icon="fas fa-code-branch"/>`main` is the branch you want to push to. After running this command, all your latest commits are sent to the remote <VPIcon icon="fas fa-code-branch"/>`main` branch. If you check your repository on GitHub, you’ll see that everything is updated. But only the <VPIcon icon="fas fa-code-branch"/>`main` branch is pushed – other branches aren’t uploaded yet. This means you’ve only pushed your <VPIcon icon="fas fa-code-branch"/>`main` branch to the remote’s <VPIcon icon="fas fa-code-branch"/>`main`.

### Example: Pushing Other Branches

Switch to the <VPIcon icon="fas fa-code-branch"/>`staging` branch:

```sh
git checkout staging
git push origin staging
```

Git creates a new branch named <VPIcon icon="fas fa-code-branch"/>`staging` in the remote repository and pushes all your staging changes there. When you check GitHub again, you’ll see that the <VPIcon icon="fas fa-code-branch"/>`staging` branch has been created and updated.

Similarly, switch to the <VPIcon icon="fas fa-code-branch"/>`development` branch:

```sh
git checkout development
git push origin development
```

![Git Push Other Branches](https://cdn.hashnode.com/res/hashnode/image/upload/v1765443476135/9243730d-5d93-48aa-9d32-27ced9d8a762.gif)

The <VPIcon icon="fas fa-code-branch"/>`development` branch is also uploaded to the remote. Now all three branches (<VPIcon icon="fas fa-code-branch"/>`main`, <VPIcon icon="fas fa-code-branch"/>`staging`, and <VPIcon icon="fas fa-code-branch"/>`development`) are fully synced with the remote repository.

Finally, switch back to the <VPIcon icon="fas fa-code-branch"/>`main` branch again:

```sh
git checkout main
```

### Example: `git fetch`

Imagine you’ve already pushed your local changes to the remote. Now let’s see how `git fetch` works.

Suppose you make a change directly on GitHub. For example, open the file <VPIcon icon="fas fa-file-lines"/>`three.txt` on GitHub, type `3`, and commit the change. Now, the remote <VPIcon icon="fas fa-code-branch"/>`main` branch has a new update that your local <VPIcon icon="fas fa-code-branch"/>`main` branch doesn’t have – it’s behind the remote version. While staying on the local <VPIcon icon="fas fa-code-branch"/>`main` branch, bring in the latest changes from the remote:

```sh
git fetch
```

Git fetches the new changes from the remote repository, but those updates don’t yet appear in your local file system. For example, you won’t see the update in <VPIcon icon="fas fa-file-lines"/>`three.txt` until you merge the fetched changes. Once you run:

```sh
git merge
```

![Git Fetch and Merge](https://cdn.hashnode.com/res/hashnode/image/upload/v1765443499165/ff4f6389-ad36-434e-a2b2-8c321160607a.gif)

the remote changes are integrated into your local working directory as well.

### Example: `git pull`

Now, suppose you edit the remote <VPIcon icon="fas fa-file-lines"/>`three.txt` file again, this time adding `33` after `3` and committing it on GitHub. The remote <VPIcon icon="fas fa-code-branch"/>`main` branch is now ahead again.

To bring in all those updates and merge them into your local <VPIcon icon="fas fa-code-branch"/>`main` branch at once, use:

```sh
git pull
```

![Git Pull Command](https://cdn.hashnode.com/res/hashnode/image/upload/v1765443520831/0c438637-75f5-4743-a2d7-38cea3cd0d2e.gif)

`git pull` automatically performs both fetch and merge in a single command, meaning all the new remote changes, including the latest updates in <VPIcon icon="fas fa-file-lines"/>`three.txt`, immediately appear in your local files.

You’ve now learned how to:

- push changes from local to remote (`git push`),
- fetch changes from remote without merging (`git fetch`), and
- pull changes from remote while merging them automatically (`git pull`).

These three commands are among the most frequently used Git operations and are more than enough for most daily development work.

---

## How to Undo Local Changes with `git restore`

Now imagine you’re working on a project. You start developing a new feature, write a lot of new code, and modify several existing files. After some point, you realize that the approach you took isn’t working at all. But by then, you’ve already made changes across 10 to 15 different files – some with new code, some heavily modified.

In this situation, you want to discard everything and go back to the previous state. Would you really open each of those 10 to 15 files manually, remove all the new lines, and try to restore the old code one by one? How accurate or even possible would that be? Probably not at all.

In this case, the simplest answer is that it’s actually not practical manually. And the more complicated answer is that there’s no guarantee that everything will return to its exact previous state. This is exactly where the magic of the `git restore` command comes in.

The `git restore` command helps you revert any file or directory back to its previous state, meaning the state of the **last commit**. It’s mainly used to undo local uncommitted changes, or to remove changes that were added to the staging area using `git add`. Let’s test it. Suppose in <VPIcon icon="fas fa-file-lines"/>`one.txt`, you write:

```plaintext
new feature
```

This repository already had some committed history. Now you’re just trying to develop a new feature. After writing the new code, you realize that the change you made in <VPIcon icon="fas fa-file-lines"/>`one.txt` (adding `new feature`) was a mistake. The previous version was fine.

Since this change isn’t ready to be committed, you want to undo it and go back to the last committed state. To do that, run:

```sh
git restore one.txt
```

![Git Restore Single File](https://cdn.hashnode.com/res/hashnode/image/upload/v1765443545767/6e1bb71b-4228-40f5-bcec-23d094254355.gif)

As soon as you run this command, the file instantly reverts to its previous state – the exact version from the most recent commit.

If you want to restore an entire directory instead of a single file, type the directory name after `git restore` and it’ll bring everything in that folder back to the last committed version.

If you want to undo all changes across the entire repository, run:

```sh
git restore .
```

This restores every file to its last committed state. If you’ve already staged some changes using `git add`, you can still undo them using the `--staged` flag. For example:

```sh
git restore --staged fileName
# or
git restore --staged .
```

This removes the files from the staging area but keeps the working directory unchanged.

In summary, the `git restore` command helps you bring any file or directory back to its previous (last committed) state. It’s mainly used to undo local, uncommitted changes before they’re ever committed.

---

## How to Temporarily Shelve Work with `git stash`

Now imagine this: you’re working on a new branch, developing a big feature. It’s a long process, and you’ve already finished about half of it. But the work isn’t yet in a state to be committed.

Suddenly, another developer messages you saying there’s a new update on a different branch and you need to check it and give feedback. How will you switch branches without losing your unfinished work? Will you throw away all your progress using the `git restore` command?

Of course not. There’s no reason to go through that kind of hassle when Git gives you a much smarter way to handle this: using the `git stash` command.

With `git stash`, you can temporarily set aside your unfinished work, switch to another branch to do something else, and later bring all your changes back with a single command.

![Git Stash Command](https://cdn.hashnode.com/res/hashnode/image/upload/v1765443582135/733a4f46-6c92-4902-8c45-97cdcd55990f.gif)

Let’s see how it works. Suppose in <VPIcon icon="fas fa-file-lines"/>`one.txt`, you write:

```plaintext
another feature
```

You’re currently on the <VPIcon icon="fas fa-code-branch"/>`main` branch. Now you need to switch to the <VPIcon icon="fas fa-code-branch"/>`development` branch to review a new feature. So you type:

```sh
git checkout development
```

![Git Checkout Development Branch with Uncommitted Changes](https://cdn.hashnode.com/res/hashnode/image/upload/v1765443604514/8d70a915-8cac-49c8-8776-f4db7ed37bb5.png)

But Git throws an error:

```plaintext
error: Your local changes to the following files would be overwritten by checkout:
    one.txt
Please commit your changes or stash them before you switch branches.
Aborting
```

This happens because Git doesn’t allow switching branches when there are uncommitted changes – it’s protecting your work. But since your feature isn’t ready to be committed, this is exactly when you use `git stash`. Run:

```sh
git stash
```

The moment you execute this command, your uncommitted changes disappear from your working directory – but they’re not lost. Git has safely stored them in a temporary area called the **stash**. This lets you switch branches freely without affecting your unfinished work. Now, switch to the <VPIcon icon="fas fa-code-branch"/>`development` branch:

```sh
git checkout development
```

You’ve now successfully switched branches. You can review the new feature, make notes, and do whatever you need to. Once you’re done, switch back to your <VPIcon icon="fas fa-code-branch"/>`main` branch again:

```sh
git checkout main
```

Now, when you look around, you’ll see that your unfinished feature – the one you were working on earlier – isn’t there. It’s still saved in the stash. To bring it back, “pop” it out of the stash:

```sh
git stash pop
```

![Git Stash Use Example](https://cdn.hashnode.com/res/hashnode/image/upload/v1765443623961/17568e8b-ba41-4020-b7f2-00a9ae690a9c.gif)

As soon as you run this, all your stashed changes reappear in your working directory. The `pop` command restores the most recently stashed work and simultaneously removes it from the stash list. If you’ve stashed multiple times, Git keeps them all in order – newest on top, oldest at the bottom. When you pop, it brings back the most recent one first.

If you want to reapply the stashed changes **without removing them** from the stash list (so that you can reuse them later), use the `apply` command instead:

```sh
git stash apply
```

Your changes are restored, but they also remain safely stored in the stash for future use. You can stash again:

```sh
git stash
git stash apply
```

You’ll notice it behaves almost the same as before, and the changes come back just like when you used `pop`. You already know that Git can store multiple stashes, and you can view a list of all those stashed changes. To see that list, type:

```sh
git stash list
```

![Git Stash List Command](https://cdn.hashnode.com/res/hashnode/image/upload/v1765443645465/12d2c1f3-a529-4d36-aa55-2ff459a20b2c.gif)

You’ll see a list of all your saved stashes. Each stash item is marked with an identifier like `stash@{0}`, `stash@{1}`, and so on. You can use these identifiers to apply or pop specific stashes:

```sh
git stash pop stash@{0}
# or
git stash apply stash@{0}
```

Both commands work. The only difference is how they handle the stash afterward. To understand the difference more clearly, suppose you check your stash list:

```sh
git stash list
```

and see just one stash. If you previously used `git stash apply`, that stash item is still there. To remove a stash manually, use `git stash drop`. The `drop` command removes a specific stash from the stash list. For example:

```sh
git stash drop
git stash list
```

![Git Stash Drop Command](https://cdn.hashnode.com/res/hashnode/image/upload/v1765443664000/db9707b8-d32b-451c-8bd8-a0c992ef4f78.gif)

Now the stash list is empty. Since you used `git stash apply` earlier, all the changes are still in your working directory. Confirm that with:

```sh
git status
```

The changes you applied are still there. Now stash those changes again:

```sh
git stash
git stash list
```

You’ll see one stash entry again.

Then run:

```sh
git stash pop
git stash list
```

![Git Stash Pop Command](https://cdn.hashnode.com/res/hashnode/image/upload/v1765443683035/cdd67489-7797-4cce-a0de-a10506244460.gif)

The stashed changes are restored into your working directory, and the stash list is now empty. `pop` brings your changes back **and removes** them from the stash list – it’s like taking them out permanently. Stash something again:

```sh
git stash
git stash list
```

Now run:

```sh
git stash apply
git stash list
```

![Git Stash Apply Command](https://cdn.hashnode.com/res/hashnode/image/upload/v1765443701166/3df82aab-14d7-461a-8ee6-320609d3fdcb.gif)

The command works. Your files are restored, just like before. But the stash is still in the list. So here’s the key difference:

- `git stash pop` restores your changes **and removes** them from the stash list.
- `git stash apply` restores your changes but **keeps** them in the stash list for future use.

---

## How to Undo Commits Safely with `git revert`

Now let’s talk about `git revert`. The `git revert` command is used to undo the changes made in a previous commit – but instead of deleting that old commit, it creates a **new** one that reverses those changes. In other words, it cancels out the effects of a previous commit while keeping the project history completely clean and traceable.

That’s why it’s called “revert”: because it doesn’t delete any commit. Instead, it creates a new commit that brings the project back to its previous correct state. Simply put, `git revert` means fixing an old mistake without erasing it.

For example, imagine you accidentally added too much salt while cooking. Instead of throwing the whole dish away, you adjust the flavor by adding some extra ingredients to balance the saltiness. Similarly, `git revert` doesn’t delete the faulty commit – it corrects it through a new one.

![Git Revert Command](https://cdn.hashnode.com/res/hashnode/image/upload/v1765443720093/f7506aa8-e16b-4566-a0c8-f497e195b783.gif)

To revert something, you need its commit ID. Suppose in the file <VPIcon icon="fas fa-file-lines"/>`three.txt`, you added the line:

```plaintext
hello three
```

Then you run:

```sh
git add .
git commit -m "hello three"
```

Now, if you check the log:

```sh
git log --oneline
```

you’ll see there are 10 commits in total. You realize that the `"hello three"` commit introduced a bug and you want to remove it. Before that, copy the commit ID of `"hello three"` and then run:

```sh
git revert <that-commit-id>
```

After running the command, you’ll see a prompt asking for a commit message. You can type a custom message or simply keep the default one and exit (for example, by using `- wq` in Vim). Once you do that, the changes from `"hello three"` will be undone. Check the logs again:

```sh
git log --oneline
```

![Git Revert Specific Commit](https://cdn.hashnode.com/res/hashnode/image/upload/v1765443740518/c8ef43d8-78e8-4afe-8424-5a24d0987640.gif)

You’ll notice there’s a new commit added specifically for the revert. At this point, you might be reminded of `git reset`. The main difference between `git reset` and `git revert` is:

- `git reset` can take you back to a specific commit and discard all commits after that point, **without creating any new commit**.
- `git revert` removes the changes from a specific commit by **creating a new commit** that reverses it.

If your project is on GitHub or any remote repository, other contributors can also see the revert commit, ensuring clarity and preventing confusion.

Another key point is that if you check the logs after a reset, there’s no record of the removed commits. But when you use revert, you’ll clearly see an additional commit indicating that a revert took place.

---

## How to Keep History Clean with `git rebase`

Now let’s talk about Git Rebase. Imagine you’re starting to work on a new feature. You create a new branch called <VPIcon icon="fas fa-code-branch"/>`feature` by checking out from the <VPIcon icon="fas fa-code-branch"/>`main` branch. You begin developing the new feature, making changes bit by bit, and committing your progress as you go. Meanwhile, another developer adds more updates to the <VPIcon icon="fas fa-code-branch"/>`main` branch for production. Now you want to include those latest updates from <VPIcon icon="fas fa-code-branch"/>`main` into your <VPIcon icon="fas fa-code-branch"/>`feature` branch. What can you do?

There are several ways to handle this. As we’ve seen before, one option is to merge the <VPIcon icon="fas fa-code-branch"/>`main` branch into your <VPIcon icon="fas fa-code-branch"/>`feature` branch. If you do that, Git creates a new **merge commit**, and all the latest updates from <VPIcon icon="fas fa-code-branch"/>`main` are merged into your <VPIcon icon="fas fa-code-branch"/>`feature` branch.

But merging always creates an additional commit – you can see it clearly if you run `git log`. Some developers find these extra merge commits a bit messy. If you continue merging multiple times, your commit history can look cluttered.

![Git Rebase Command](https://cdn.hashnode.com/res/hashnode/image/upload/v1765443759550/d074c631-1e65-4ef3-a007-e2d7665eccd7.gif)

In such cases, a better solution is to use **Git Rebase**. When you perform a rebase, the base of your <VPIcon icon="fas fa-code-branch"/>`feature` branch changes. That means if you rebase onto <VPIcon icon="fas fa-code-branch"/>`main`, all the new commits from <VPIcon icon="fas fa-code-branch"/>`main` are applied directly into your <VPIcon icon="fas fa-code-branch"/>`feature` branch, and then your <VPIcon icon="fas fa-code-branch"/>`feature` branch commits are reapplied on top of them. While your <VPIcon icon="fas fa-code-branch"/>`main` branch’s code content remains the same, the commit history becomes much cleaner and more linear – and you can easily verify this using `git log`.

Let’s understand this with an example. Create a new branch called <VPIcon icon="fas fa-code-branch"/>`feature` from <VPIcon icon="fas fa-code-branch"/>`main`:

```sh
git branch feature
git checkout feature
```

You’re now inside the <VPIcon icon="fas fa-code-branch"/>`feature` branch. Open <VPIcon icon="fas fa-file-lines"/>`one.txt` and add the line:

```plaintext
adding dark mode functionality
```

Then stage and commit:

```sh
git add .
git commit -m "adding dark mode functionality"
```

Now switch back to the <VPIcon icon="fas fa-code-branch"/>`main` branch:

```sh
git checkout main
```

You’re now in the <VPIcon icon="fas fa-code-branch"/>`main` branch. Create a new file called <VPIcon icon="fas fa-file-lines"/>`two.txt` and write:

```plaintext
adding dark mode ui
```

Then stage and commit:

```sh
git add .
git commit -m "adding dark mode ui"
```

Now the <VPIcon icon="fas fa-code-branch"/>`main` branch has a new feature – “dark mode ui”. You want that same “dark mode ui” update to appear in your <VPIcon icon="fas fa-code-branch"/>`feature` branch as well. Switch back to your <VPIcon icon="fas fa-code-branch"/>`feature` branch:

```sh
git checkout feature
```

Your goal is to bring the latest updates from the <VPIcon icon="fas fa-code-branch"/>`main` branch into the <VPIcon icon="fas fa-code-branch"/>`feature` branch. But this time, we’ll do it using **rebase**.

To perform a Git rebase, you need to be on the branch you want to rebase, and then specify the branch from which you want to bring the changes. For example, if you’re currently on the <VPIcon icon="fas fa-code-branch"/>`feature` branch and want to bring in the changes from <VPIcon icon="fas fa-code-branch"/>`main`, run:

```sh
git rebase main
```

![Git Rebase Main into Feature](https://cdn.hashnode.com/res/hashnode/image/upload/v1765443782936/9dbfa229-e02a-40f3-8f91-14fcbf4c858e.gif)

Once you run this command, the rebase completes, and the “dark mode ui” update from the <VPIcon icon="fas fa-code-branch"/>`main` branch appears in your <VPIcon icon="fas fa-code-branch"/>`feature` branch.

Here’s what happens behind the scenes when you use rebase:

1. Git identifies the most recent common commit shared between your current branch (<VPIcon icon="fas fa-code-branch"/>`feature`) and the branch you’re rebasing onto (<VPIcon icon="fas fa-code-branch"/>`main`).
2. All the commits in your <VPIcon icon="fas fa-code-branch"/>`feature` branch that come after that common commit are temporarily set aside.
3. Git applies all the new commits from the <VPIcon icon="fas fa-code-branch"/>`main` branch into your <VPIcon icon="fas fa-code-branch"/>`feature` branch.
4. Finally, it reapplies the saved commits from the <VPIcon icon="fas fa-code-branch"/>`feature` branch on top of those <VPIcon icon="fas fa-code-branch"/>`main` commits, one by one.

The result is a clean, linear commit history that’s much tidier than what you get with merging. You can easily see this difference by running `git log`.

Just keep in mind that `git rebase` is powerful. So it’s not recommended to use it on **public repositories** or branches where multiple developers are working together. If you must use it, you should always inform your team beforehand. Otherwise, it can cause serious issues.

The reason is that rebase **rewrites existing commit history** – even the commit hashes (IDs) change. So, if someone else is working on the same branch, your rebased commits won’t match their local copies anymore, and they won’t be able to pull or sync normally.

![Git Rebase Warning](https://cdn.hashnode.com/res/hashnode/image/upload/v1765443802090/97b145e9-7b86-4106-99fe-683ef8d5025b.gif)

So before using rebase, make sure you fully understand where you’re applying it and whether it could cause problems for your collaborators. It’s perfectly safe to use rebase on your local or personal branches where only you’re working – just avoid rewriting commits that already exist on a shared remote branch.

---

## How to Collaborate on GitHub with Pull Requests

Before wrapping up, let’s discuss one last important topic: the **Pull Request**. When working with Git and GitHub, the term “Pull Request,” often shortened as “PR,” comes up frequently.

A Pull Request is essentially a request you make to merge your changes into another branch – usually the <VPIcon icon="fas fa-code-branch"/>`main` branch. It’s a way of saying, “I’ve made some changes in my branch. Please review them, and if everything looks good, merge them into the main branch.”

![GitHub Pull Request](https://cdn.hashnode.com/res/hashnode/image/upload/v1765443820127/5ea7b5ce-a06d-42d3-88d7-da5e818210dc.gif)

In other words, you typically don’t make changes directly to someone else’s repository. When you finish your work in your own branch, you create a Pull Request to ask for permission to merge your code into the main repository. That’s what a Pull Request is.

Go back to your <VPIcon icon="fas fa-folder-open"/>`git-journey` repository on GitHub. By now, you’ve already pushed your <VPIcon icon="fas fa-code-branch"/>`main`, <VPIcon icon="fas fa-code-branch"/>`staging`, and <VPIcon icon="fas fa-code-branch"/>`development` branches. At the top of the GitHub page, you’ll see several tabs: **Code**, **Issues**, **Pull requests**, and **Actions**.

Click on the **Pull requests** tab. Here, you’ll see a big green button labeled **New pull request**. This is where you can say, “I want to merge the changes from this branch into another branch.”

Once you click New pull request, GitHub shows you two dropdown menus:

- **base**: the branch where you want to merge the changes (select <VPIcon icon="fas fa-code-branch"/>`main` here).
- **compare**: the branch from which you want to bring the changes (select <VPIcon icon="fas fa-code-branch"/>`development`).

In other words, you’re saying, “I’ve made some updates in the <VPIcon icon="fas fa-code-branch"/>`development` branch, and now I want those updates to be merged into the <VPIcon icon="fas fa-code-branch"/>`main` branch.” GitHub automatically shows a detailed comparison: which files have been modified, which lines have been added, and which ones have been removed, with everything clearly visible. If everything looks good, scroll down and click **Create pull request**.

Give your PR a title, such as:

```plaintext
Merge development updates into main
```

In the description box, you can write something like:

```plaintext
This PR adds the latest updates and fixes from development to main.
```

Then click **Create pull request** to submit it. Now, if you go back to the **Pull requests** tab, you’ll see your newly created PR:

```plaintext
development → main
```

Click on it, and you’ll find three sections:

- **Conversation:** where you and your teammates can discuss or comment on the changes.
- **Commits**: which lists all the commits included in this PR.
- **Files changed**: which shows exactly what changes were made in which files.

If everything looks good after review, click the green **Merge pull request** button at the top, and then confirm by clicking **Confirm merge**. Once it’s done, GitHub displays a message:

```plaintext
Pull request successfully merged and closed.
```

![Pull Request Example](https://cdn.hashnode.com/res/hashnode/image/upload/v1765443840494/12e57fd1-64fb-412d-913d-599edebf1132.gif)

That means all the updates from the <VPIcon icon="fas fa-code-branch"/>`development` branch have now been successfully merged into <VPIcon icon="fas fa-code-branch"/>`main`.

This is how Pull Requests make code management much easier. Every change gets reviewed first and then merged into <VPIcon icon="fas fa-code-branch"/>`main`. As a result, the main branch stays stable, and the entire team can collaborate safely and efficiently.

---

## Git & GitHub – Concise Summary

### Git vs GitHub

- **Git**: Local version control tool that tracks every change to your files, lets you keep multiple versions, and roll back any time.
- **GitHub**: Online hosting platform for Git repositories that acts like a central “code server” so teams can share, review, and collaborate.
- Other Git hosts exist (GitLab, Bitbucket), but GitHub is the most widely used, especially for open source.

### Core Git Architecture & Workflow

- Work happens in the **working directory** (your project folder).
- When changes are ready, you move them to the **staging area** with `git add`.
- You permanently record a version in the **local repository** with `git commit`.
- The **remote repository** (for example, on GitHub) is a copy of your repo stored in the cloud for backup and collaboration.

Basic flow:

1. Edit files in the working directory.
2. Stage changes: `git add <files>` or `git add .`
3. Commit: `git commit -m "message"`
4. Sync with remote: `git push` / `git pull`

### Getting Started

- Install Git from the official site: [https://git-scm.com/downloads](https://git-scm.com/downloads).
- Check installation: `git --version`.
- Configure identity (needed before first commit):
  - `git config --global user.name "Your Name"`
  - `git config --global user.email "you@example.com"`
- Initialize a repo in a folder: `git init`.
- Or clone an existing repo from GitHub: `git clone <repo-url>`.

### Seeing & Moving Changes

- Check what changed and what’s staged: `git status`.
- Stage changes:
  - `git add --all` / `git add -A`: stage everything (adds, changes, deletions).
  - `git add .`: stage changes only in the current directory.
  - `git add <file>` or `git add *.txt`: stage specific files or patterns.
- Unstage everything (but keep edits in files): `git reset`.
- Save staged changes as a commit: `git commit -m "message"`.
- View commit history:
  - Full: `git log`
  - Compact: `git log --oneline`

### Deleting, Restoring, & Undoing

- Delete a tracked file and stage the deletion: `git rm <file>`.
  - Force delete changed file: `git rm -f <file>`.
  - Stop tracking but keep file: `git rm --cached <file>`.
- Undo staged changes only: `git reset`.
- Reset everything (including working directory) to last commit: `git reset --hard`.
- Restore file content back to last commit:
  - Single file: `git restore <file>`
  - All files: `git restore .`
- Undo a **commit** safely (create a new “fix” commit):
  - `git revert <commit-id>`
- Move HEAD and history back to an earlier commit (dangerous on shared branches):
  - Example: `git reset HEAD~` (undo last commit locally).

### Branching, Merging, & Conflicts

- A **branch** is an independent line of development (for example, <VPIcon icon="fas fa-code-branch"/>`main`, <VPIcon icon="fas fa-code-branch"/>`development`, <VPIcon icon="fas fa-code-branch"/>`staging`, <VPIcon icon="fas fa-code-branch"/>`feature`).
- List branches: `git branch`.
- Create branch: `git branch development`.
- Switch branch: `git checkout development` (or `git switch development` in newer Git).
- Typical workflow: keep <VPIcon icon="fas fa-code-branch"/>`main` stable, build new features on separate branches, then merge back.
- Merge another branch into the current one: `git merge <branch-name>`.
- If the same lines changed differently in two branches, you get a **merge conflict**:
  - Git marks conflicts in the file with `<<<<<<<`, `=======`, `>>>>>>>`.
  - You manually edit to the correct final content, then:
    - `git add .`
    - `git commit -m "merge conflict resolved"`

### Navigating & Comparing History

- Jump to an old commit (read-only “detached HEAD” state): `git checkout <commit-id>`
- Return to the latest <VPIcon icon="fas fa-code-branch"/>`main`: `git checkout main`.
- Compare two commits: `git diff <old-id> <new-id>` – shows what changed between them.

### Working with Remotes (GitHub)

- Push local branch to remote: `git push origin <branch>`.
- Fetch latest state from remote **without** updating your working files: `git fetch`
  - Then merge if needed: `git merge origin/main`
- Pull and merge in one step: `git pull` (equivalent to `fetch + merge`).

### Temporarily Shelving Work with `git stash`

- Use `git stash` when you have uncommitted work but need to switch branches.
- `git stash`: saves current changes and cleans your working directory.
- Switch branches, do other work, then come back and restore:
  - `git stash pop`: restore and remove from stash list.
  - `git stash apply`: restore but keep entry in the stash.
- See all stashes: `git stash list`.
- Remove a stash explicitly: `git stash drop`.

### Keeping History Clean with `git rebase`

- `git rebase <branch>` replays your current branch’s commits on top of another branch, creating a cleaner, linear history.
- Safe on your **own** local branches, but dangerous on shared/public branches because it rewrites commit history (IDs change).
- Common pattern: on <VPIcon icon="fas fa-code-branch"/>`feature` branch, run `git rebase main` to bring latest <VPIcon icon="fas fa-code-branch"/>`main` changes under your feature commits.

### Collaboration with Pull Requests (PRs)

- On GitHub, you usually:
    1. Push your feature branch.
    2. Open a **Pull Request** (PR) to request merging into <VPIcon icon="fas fa-code-branch"/>`main` (or another base branch).
    3. Teammates review code, discuss in comments, and approve.
    4. The PR is merged (and usually closed) once accepted.
- PRs keep <VPIcon icon="fas fa-code-branch"/>`main` stable and make reviews and history clearer.

### Big Picture Takeaways

- Git tracks every change, lets you move safely between versions, and protects you from losing work.
- GitHub (or other remotes) adds backup, sharing, and collaboration.
- Most day‑to‑day work is based on a small set of commands: `git status`, `git add`, `git commit`, `git push`, `git pull`, `git branch`, `git checkout`, `git merge`, `git log`.
- Advanced commands like `git reset`, `git restore`, `git revert`, `git stash`, and `git rebase` give you powerful ways to undo mistakes and keep history clean.

---

## Final Words

This tutorial on Git and GitHub has walked through the essential, day-to-day concepts in a step-by-step, practical way. It’s especially helpful for those who are just getting started. If you’ve always felt a bit intimidated or confused about using Git for the first time, this guide was created with you in mind.

If you found the information here valuable, feel free to share it with others who might benefit from it. I’d really appreciate your thoughts – mention me on X [<VPIcon icon="fa-brands fa-x-twitter"/>`@sumit_analyzen`](https://x.com/sumit_analyzen) or on Facebook [<VPIcon icon="fa-brands fa-meta"/>`@sumit.analyzen`](https://facebook.com/sumit.analyzen), [watch (<VPIcon icon="fa-brands fa-youtube"/>`logicBaseLabs`)](https://youtube.com/@logicBaseLabs) my coding tutorials, or simply [connect with me (<VPIcon icon="fa-brands fa-linkedin"/>`sumitanalyzen`)](https://linkedin.com/in/sumitanalyzen/) on LinkedIn. You can also checkout my official website [<VPIcon icon="fas fa-globe"/>sumitsaha.me](https://sumitsaha.me/) for more details about me.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Learn How to Use Git and GitHub – A Beginner-Friendly Handbook",
  "desc": "In this handbook, you’re going to dive into something really exciting: Git and GitHub. To start, let’s clear one thing up: Git and GitHub are not the same thing. In short, Git is the tool that runs on your own computer and keeps track of changes in y...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/learn-how-to-use-git-and-github-a-beginner-friendly-handbook.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
