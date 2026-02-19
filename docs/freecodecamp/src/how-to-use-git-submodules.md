---
lang: en-US
title: "How to Use Git Submodules – Explained With Examples"
description: "Article(s) > How to Use Git Submodules – Explained With Examples"
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
      content: "Article(s) > How to Use Git Submodules – Explained With Examples"
    - property: og:description
      content: "How to Use Git Submodules – Explained With Examples"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-git-submodules.html
prev: /programming/git/articles/README.md
date: 2024-05-08
isOriginal: false
author:
  - name: Jima Victor
    url: https://freecodecamp.org/news/author/webcodespace/
cover: https://freecodecamp.org/news/content/images/2024/05/git-submodules---cover-image.png
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
  name="How to Use Git Submodules – Explained With Examples"
  desc="Git is undeniably a very important tool for developers. It helps us collaborate seamlessly, track changes efficiently, and maintain project integrity across distributed environments. But as projects grow in complexity and scope, so do their dependenc..."
  url="https://freecodecamp.org/news/how-to-use-git-submodules"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2024/05/git-submodules---cover-image.png"/>

Git is undeniably a very important tool for developers. It helps us collaborate seamlessly, track changes efficiently, and maintain project integrity across distributed environments.

But as projects grow in complexity and scope, so do their dependencies. So we need a mechanism to properly manage these dependencies as they grow. This mechanism is known as Git submodules.

In this article, we'll delve into the world of Git submodules in order to have a better understanding of how they work.

::: note Prerequisites

- A basic understanding of Git and GitHub.
- Git installed.

:::

---

## What are Git Submodules?

A Git submodule refers to a Git repository that exists within another Git repository.

You can think of it as a child repository or a subset of a main repository.

Git submodules provide a structured way of including external repositories in a project while retaining the benefits of having a repository maintained separately.

---

## Difference between a Repository and a Submodule

A submodule is also a repository. The only difference between a submodule and a repository is the fact that a submodule can only exist as a Git repository inside another repository. If a submodule exists outside a repository, it can no longer be called a submodule. It can only be referred to as a repository.

All submodules are repositories but not all repositories are submodules.

---

## How to Add a Git Submodule

To add a Git submodule, first ensure that you are within a Git repository, and you have the URL of the remote repository you want to add as a submodule.

Then, use the `git submodule add` command, followed by the URL of the repository you want to add.

```sh
git submodule add <SUBMODULE_URL>
```

The above command will add the submodule at the root level of your main repository by default.

To specify a directory where you want the submodule to be located within your main repository, add the path argument to the command.

```sh
git submodule add <SUBMODULE_URL> <PATH>
```

::: info Where:

- `<SUBMODULE_URL>` is the URL of the Git repository that you want to add as a submodule.
- `<PATH>` is the path where you want the submodule to be added within your repository.

:::

---

## The <VPIcon icon="iconfont icon-git"/>`.gitmodules` File

Upon creating a new git submodule with the `git submodule add` command, a new file will be added to the root level of your main repository. That file is the <VPIcon icon="iconfont icon-git"/>`.gitmodules` file.

<VPIcon icon="iconfont icon-git"/>`.gitmodules` is a configuration file used by Git to store information about the submodules present in a repository. It contains details about each submodule, such as their URLs and paths.

This file helps ensure that when you clone or update a repository with submodules, Git knows where to fetch the submodule contents and which versions of the submodules to use.

Here's an example of what the <VPIcon icon="iconfont icon-git"/>`.gitmodules` file looks like:

```toml title=".gitmodules"
[submodule "example"]
    path = example
    url = https://github.com/example/example.git
```

If you have more than one submodule in your project, this is what your <VPIcon icon="iconfont icon-git"/>`.gitmodules` file will look like:

```toml title=".gitmodules"
[submodule "submodule1"]
    path = submodule1
    url = https://github.com/example/submodule1.git

[submodule "submodule2"]
    path = submodule2
    url = https://github.com/example/submodule2.git

[submodule "submodule3"]
    path = submodule3
    url = https://github.com/example/submodule3.git
```

---

## How not to Add a Submodule

Sometimes you may be tempted to use the `git clone` command to add a repository as a dependency within your repository. You should resist that temptation!

If you use the `git clone` command, you will get the following message on your Git Bash terminal: "You've added another git repository inside your current repository. Clones of the outer repository will not contain the contents of the embedded repository and will not know how to obtain it..."

![git clone command when trying to add a submodule](https://freecodecamp.org/news/content/images/2024/05/git_hint.PNG)

I got this message while trying to add a submodule to the <VPIcon icon="fas fa-folder-open"/>`theme/anake` directory using the `git clone` command.

There are mainly two reasons why you shouldn't use this command:

1. The submodule directory will be empty when you push your code to your remote repository.
2. Clones of the outer repository (main repo) will not contain the contents of the embedded repository (submodule) and will not know how to obtain it, as stated by Git in the message above.

And the above reasons are issues that stem from not having the <VPIcon icon="iconfont icon-git"/>`.gitmodules` file (which is automatically added when you use the `git submodule add` command) at the root level of your main repository.

Manually adding the <VPIcon icon="iconfont icon-git"/>`.gitmodules` file at the root level of your main repository will fix the above issues. However, creating a submodule using the `git submodule add` command would prevent them.

---

## How to Clone a Repository with a Git Submodule

There are two commands that you need to remember whenever you want to clone repositories with submodules in them. Those commands are:

`git submodule init`: This command initializes the submodules defined in the repository. When you clone a repository that contains submodules, Git doesn't automatically fetch the submodule contents. You need to run `git submodule init` to initialize them first.

Git reads the <VPIcon icon="iconfont icon-git"/>`.gitmodules` file in the repository to configure the submodules and prepares to fetch the submodule contents when you run `git submodule update`.

`git submodule update`: This command fetches the latest commits from the submodule repositories.

If there are new commits in the submodule repositories, you may need to run `git submodule update` to update the submodules to the latest state.

To clone repositories having submodules in them, the first thing you need to do is run the `git clone` command for that repository.

```sh
git clone <REPOSITORY_URL>
```

After that, run the `git submodule init` command at the root level of the main repository.

```sh
git submodule init
```

Then, finally, run the `git submodule update` command.

```sh
git submodule update
```

---

## Conclusion

Git submodules serve as a mechanism to efficiently manage dependencies within a project. They enable the seamless incorporation of external repositories into a main project, maintaining clear boundaries between components while facilitating collaboration.

By leveraging submodules, developers can streamline workflows, maintain project integrity, and facilitate efficient collaboration, ultimately contributing to more robust and scalable development processes.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Use Git Submodules – Explained With Examples",
  "desc": "Git is undeniably a very important tool for developers. It helps us collaborate seamlessly, track changes efficiently, and maintain project integrity across distributed environments. But as projects grow in complexity and scope, so do their dependenc...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-git-submodules.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
