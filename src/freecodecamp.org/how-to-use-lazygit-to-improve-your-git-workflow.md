---
lang: en-US
title: "How to Use Lazygit to Improve Your Git Workflow"
description: "Article(s) > How to Use Lazygit to Improve Your Git Workflow"
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
      content: "Article(s) > How to Use Lazygit to Improve Your Git Workflow"
    - property: og:description
      content: "How to Use Lazygit to Improve Your Git Workflow"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-lazygit-to-improve-your-git-workflow.html
prev: /programming/git/articles/README.md
date: 2025-04-10
isOriginal: false
author:
  - name: Rajdeep Singh
    url : https://freecodecamp.org/news/author/officialrajdeepsingh/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1744293114488/5332db88-bff6-4aef-91eb-3423f3b95e1a.png
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
  name="How to Use Lazygit to Improve Your Git Workflow"
  desc="Lazygit is an open-source command line terminal UI for Git commands that I’ve used for the last couple of years, and it’s become my new best friend. Basically, the Lazygit tool is a wrapper for the Git command line that replaces it with a UI. Instead..."
  url="https://freecodecamp.org/news/how-to-use-lazygit-to-improve-your-git-workflow"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1744293114488/5332db88-bff6-4aef-91eb-3423f3b95e1a.png"/>

[<FontIcon icon="iconfont icon-github"/>`jesseduffield/lazygit`](https://github.com/jesseduffield/lazygit) is an open-source command line terminal UI for Git commands that I’ve used for the last couple of years, and it’s become my new best friend.

Basically, the Lazygit tool is a wrapper for the Git command line that replaces it with a UI. Instead of typing out Git commands again and again in your terminal, you can use keyboard shortcuts to commit, push, pull, create, edit, and delete branches in your project.

In simple terms, Lazygit helps you increase your productivity while working with Git.

In this article, we'll walk through the essential features of Lazygit, and I’ll show you how it works.

---

## How to Install Lazygit

Before we start, you’ll need to make sure it’s installed on your machine. You can install the tool in your system using the following methods (depending on your system):

::: code-tabs#sh

@tab:active <FontIcon icon="iconfont icon-macos"/>

You can [<FontIcon icon="iconfont icon-homebrew"/>install lazygit](https://formulae.brew.sh/formula/lazygit#default) in macOS using Homebrew like this:

```sh
brew install lazygit
```

@tab <FontIcon icon="fa-brands fa-windows"/>

You can [<FontIcon icon="iconfont icon-scoop"/>install lazygit](https://scoop.sh/#/apps?q=lazygit) in Windows using Scoop like this:

```sh
# Add the extras bucket
scoop bucket add extras

# Install lazygit
scoop install lazygit
```

@tab <FontIcon icon="iconfont icon-archlinux"/>

You can [<FontIcon icon="iconfont icon-archlinux"/>install lazygit](https://aur.archlinux.org/packages/lazygit-git) in Arch using Pacman like this:

```sh
sudo pacman -S lazygit
```

@tab <FontIcon icon="fa-brands fa-debian"/>,<FontIcon icon="fa-brands fa-ubuntu"/>,<FontIcon icon="iconfont icon-linuxmint"/>

You can install lazygit in Ubuntu and Debian using the following command:

```sh
LAZYGIT_VERSION=$(curl -s "https://api.github.com/repos/jesseduffield/lazygit/releases/latest" | \grep -Po '"tag_name": *"v\K[^"]*')
curl -Lo lazygit.tar.gz "https://github.com/jesseduffield/lazygit/releases/download/v${LAZYGIT_VERSION}/lazygit_${LAZYGIT_VERSION}_Linux_x86_64.tar.gz"
tar xf lazygit.tar.gz lazygit
sudo install lazygit -D -t /usr/local/bin/
```

Verify the correct installation of lazygit:

```sh
lazygit --version
#
# commit=, build date=, build source=nix, version=0.44.1, os=linux, arch=amd64, git version=2.47.0
```

@tab <FontIcon icon="fa-brands fa-fedora"/>,<FontIcon icon="fa-brands fa-centos"/>,<FontIcon icon="fa-brands fa-redhat"/>,<FontIcon icon="iconfont icon-rockylinux"/>

You can install lazygit in Fedora and RHEL using DNF like this:

```sh
sudo dnf copr enable atim/lazygit -y
sudo dnf install lazygit
```

@tab <FontIcon icon="iconfont icon-nixos"/>

You can [<FontIcon icon="iconfont icon-nixos"/>install lazygit](https://search.nixos.org/packages?channel=24.11&from=0&size=50&sort=relevance&type=packages&query=lazygit) in NixOS using the following method:

```sh
# with nix-shell
nix-shell -p lazygit

# with nix-env
nix-env -iA lazygit

# with /etc/nixos/configuration.nix
environment.systemPackages = [
  pkgs.lazygit
];
# or with enable lazygit flakes
nix run nixpkgs#lazygit
```

:::

---

## How to Use Lazygit

To use Lazygit, you don’t need any advanced knowledge about Lazygit or the Git CLI. If you are a beginner, that’s okay – I’ll walk you through the process and the basics here.

The main thing to understand is how the key mappings (shortcut keys) work. In this tutorial, I won’t discuss every key mapping, but I’ll teach you about some of the most common Lazygit key mappings which you’ll use on a daily basis. They’ll help you build a solid base for using the tool effectively.

To use Lazygit, first open the terminal you use. For example, I’m using the GNOME distro, so I’ll use the [<FontIcon icon="fa-brands fa-gitlab"/>Ptyxis terminal](https://gitlab.gnome.org/chergert/ptyxis).

Type the `lazygit` command in your terminal:

```sh
lazygit
```

The command output should look like this in your terminal:

![Lazygit cli demo](https://cdn.hashnode.com/res/hashnode/image/upload/v1743685042853/ab3f10f0-0d13-44d3-a86a-a58676cf30a5.gif)

The Lazygit UI is divided into six panels, or sections. Each panel serves a specific use case. Let’s explore these panels in more detail. You can see them highlighted in the image below:

![Explore the Lazygit panels](https://cdn.hashnode.com/res/hashnode/image/upload/v1743687006438/5ca2451e-d4a0-42a7-89b2-0b94fd4ca162.png)

### Panels or Sections in Lazygit

As I mentioned above, there are six main panels in Lazygit. They are:

1. Status
2. Files
3. Branches
4. Commits
5. Stash
6. Previews

The most important panels in Lazygit are files, branches, and commits, but we’ll examine each of the six now.

#### Status panel

The status panel provides an overview of your current repository and the current checked-out branch, including local and remote changes.

![Status panel in Lazygit](https://cdn.hashnode.com/res/hashnode/image/upload/v1743759630157/a7ef738b-5353-4941-9eb5-073d3235aaba.png)

Also, when you click on the status panel text, it opens a new tab or panel where it shows the recently opened repository list.

![Recently opened repos](https://cdn.hashnode.com/res/hashnode/image/upload/v1743760171736/8edb2f41-86ad-4e64-95f2-b1310d8c6f57.png)

#### Files panel

The Files panel shows lists of the files in your repository that have been modified or changed. You can see files that you’ve deleted or discarded and unstaged.

![Files panel in Lazygit](https://cdn.hashnode.com/res/hashnode/image/upload/v1743760570130/c891940b-4ba2-4fcb-a867-817b74e53618.png)

#### Branches panel

The Branches panel shows lists of local and remote branches which are available in this repository.

![Branches panel in lazygit](https://cdn.hashnode.com/res/hashnode/image/upload/v1743761276628/b34dc945-11c8-482d-8c4d-51783c68bf55.png)

#### Commits panel

The Commits panel shows a list of commits in the current branch, which allows you to view, checkout, or interact with (view/undo/and so on) specific commits.

![commits panel in lazygit](https://cdn.hashnode.com/res/hashnode/image/upload/v1743761671236/80a7321a-8d16-4add-bc4a-db52d2987836.png)

#### Stashes panel

The Stashes panel helps you manage your stashed changes, allowing you to apply, drop, or view them. Git stash is a location for storing uncommitted changes (modified, staged, or untracked files) in a hidden place, letting you switch branches without committing or discarding them.

![Stashes panel in laygit](https://cdn.hashnode.com/res/hashnode/image/upload/v1743764679570/d7233d92-cfb0-4757-a338-bcc3d9fec2b8.png)

#### Preview panel

The preview panel lets you preview unstaged changes, commits, logs, file content, and so on in Lazygit.

![Preview panel in lazygit](https://cdn.hashnode.com/res/hashnode/image/upload/v1743765844602/7c492361-bbcf-4d2c-8588-b0c3e8704132.png)

To switch between panels, use the left and right arrow keys or the specific keybindings displayed at the top of each panel.

Press <kbd>1</kbd> to open the Status panel, <kbd>2</kbd> for Files, <kbd>3</kbd> for Branches, <kbd>4</kbd> for Commits, and <kbd>5</kbd> for the Stash panel.

![Navigation between panels in lazygit](https://cdn.hashnode.com/res/hashnode/image/upload/v1743766590099/91689f4d-eba3-47cf-80a6-e18307c326cd.gif)

---

## Shortcuts and Key Mappings in Lazygit

Lazygit is especially popular because of its shortcuts. You don’t need to write the same Git commands in the terminal over and over. Rather, you just need to use a shortcut.

For example, usually when you commit a file, you’ll first add the file using `git add` and then commit the file using `git commit`.

But in Lazygit, you just have to select the file using your mouse or the up and down keys and press space to commit the file.

In Lazygit, everything works around the shortcut commands, and you use shortcuts to perform common Git operations. Here are a few essential commands we’ll go over in this tutorial:

- <kbd>a</kbd>: Stage or unstage all the files available in the Files panel.
- <kbd>space</kbd>: (file panel) – Stage or unstage a single file in the Files panel.
- <kbd>c</kbd>: Commit staged changes by opening a commit message editor.
- <kbd>p</kbd>: Push commits to the remote repository.
- <kbd>P</kbd>: Pull changes from the remote repository.
- <kbd>z</kbd>: Undo the commit.
- <kbd>s</kbd>: Stash changes, allowing you to switch branches or perform other operations.
- <kbd>S</kbd>: View and apply stashed changes.
- <kbd>n</kbd>: Create a new branch.
- <kbd>d</kbd>: Delete your branch.
- <kbd>y</kbd>: Copy to clipboard.
- <kbd>M</kbd>: Merge branch.
- <kbd>space</kbd> (branches panel) – Check out the selected target branch.
- <kbd>e</kbd>: Edit or open the file in an external editor.
- <kbd>q</kbd>: Quit Lazygit and return to the terminal.
- <kbd>d</kbd>: Discard any changes in the file.
- <kbd>?</kbd>: Open the keybinding menu.

Now let’s go over these shortcuts so you can understand how they work and see them in action.

### How to Commit a File

To commit a file in Lazygit, first select the file you need by pressing the <kbd>space</kbd> key or the <kbd>a</kbd> key or double-clicking on the file. Then press <kbd>c</kbd>, and a new panel should open. There, you can add a message and hit <kbd>enter</kbd> to commit the file.

![cbd83578-a286-482f-aeaa-31a9715a5483](https://cdn.hashnode.com/res/hashnode/image/upload/v1743770682782/cbd83578-a286-482f-aeaa-31a9715a5483.gif)

### How to Pull and Push Code

To pull remote code from the Git server (Github, GitLab, Gitea, and so on), you can press <kbd>p</kbd> (lower case p):

![decec44c-7622-432a-9da5-81b14b60ef8a](https://cdn.hashnode.com/res/hashnode/image/upload/v1743774642242/decec44c-7622-432a-9da5-81b14b60ef8a.gif)

To push local code into a Git server, you can press <kbd>P</kbd> (upper case P):

![37647a76-afe5-4d4b-acfc-fc85f1010749](https://cdn.hashnode.com/res/hashnode/image/upload/v1743842516002/37647a76-afe5-4d4b-acfc-fc85f1010749.gif)

### How to Create and Delete a Branch

To create a new branch in Lazygit, press <kbd>n</kbd>. A new panel will open where you’ll add the name of the branch and hit <kbd>Enter</kbd>.

![Create a new branch in lazygit](https://cdn.hashnode.com/res/hashnode/image/upload/v1743843881624/6c4db14e-0102-4333-be56-5d3796ab1c50.gif)

To delete a branch, press <kbd>d</kbd> and then specify whether you want to delete the branch in a local or remote repository. In the following example, I’m deleting a local branch.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1743847541934/34e378b6-03ac-4e6d-93d0-35aaeda39e57.gif)

::: note

To delete and create a new branch in Lazygit, first select the branch panel and then press the corresponding shortcut key for deleting a branch. Press the <kbd>d</kbd> key to delete, and then to create a branch press the <kbd>n</kbd> key. Otherwise, it won’t work.

:::

### How to Undo a Commit

To undo the last commit in Lazygit, just press <kbd>z</kbd>. A new panel will open, showing the details of the commit you are undoing. Then, hit <kbd>Enter</kbd>.

![Undo commit in lazygit](https://cdn.hashnode.com/res/hashnode/image/upload/v1743852917448/a3f2cab7-2806-48e4-a749-90f821b537dc.gif)

### How to Merge a Branch

To merge a branch, press <kbd>M</kbd> (capital M). To open the merge options, choose the merge type, then hit <kbd>Enter</kbd>.

#### Merge type:

- **Merge:** A standard merge, preserving the branch history.
- **Squash merge:** Combines all commits from the branch into a single commit on the target branch.
- **Squash merge and leave uncommitted**: Same as squash merge, but leaves the changes uncommitted.

![Merge branch in lazygit](https://cdn.hashnode.com/res/hashnode/image/upload/v1743921595283/e46e0c89-b69a-4462-acd3-295045c99dfd.gif)

### How to Resolve Merge Conflicts

To resolve merge conflicts in Lazygit, first merge a branch by pressing <kbd>M</kbd>, then choose the merge type (which I describe in the subsection on how to merge a branch) and hit <kbd>Enter</kbd>.

If any merge conflicts occur, the conflicting file(s) appear in the files panel. Press <kbd>Enter</kbd> to view the merge conflicts in the preview panel and navigate between conflicts using the <kbd><FontIcon icon="fas fa-arrow-up"/></kbd> and <kbd><FontIcon icon="fas fa-arrow-down"/></kbd> keys. Select the correct merge conflicts, press the <kbd>space</kbd> key, and your merge issue will be resolved.

![resolve merge conflicts in lazygit](https://cdn.hashnode.com/res/hashnode/image/upload/v1743921640247/e5b7f971-f027-47df-be4c-a90b356e24f8.gif)

### How to Discard Changes

To discard or drop any changes in a file or commit, press <kbd>d</kbd>.

![bc5b91fb-2d33-41d0-95b9-667478c4c8db](https://cdn.hashnode.com/res/hashnode/image/upload/v1743774406564/bc5b91fb-2d33-41d0-95b9-667478c4c8db.gif)

### How to Copy

To copy a file name, path, commit hash, message, URL, author, or any other details, first select the commit or file, then press <kbd>y</kbd> to copy the information.

![e23d9e5c-b0b4-40a0-8124-f94669b377c0](https://cdn.hashnode.com/res/hashnode/image/upload/v1743856793802/e23d9e5c-b0b4-40a0-8124-f94669b377c0.gif)

---

## Other Keybindings in Lazygit

There are other keybindings in Lazygit which I did not discuss in this article. To learn about every keybinding, you can check out the keybindings menu.

![Open the keybindings menu and press the <kbd>?</kbd>.](https://cdn.hashnode.com/res/hashnode/image/upload/v1743843262905/a4aba097-999b-4ff8-bd00-661181d96aad.gif)

![When you open the keybindings help menu, it changes according to the panel you’re in.](https://cdn.hashnode.com/res/hashnode/image/upload/v1743915037200/9339b7b1-b2a4-45e5-8a51-5be0a9f2a319.gif)

---

## Conclusion

Lazygit helps you become more productive when working with Git or Git commands. As a beginner, starting with Lazygit can be somewhat challenging because of its key mappings, but once you get the hang of them, they’re pretty easy to remember and use.

If you are a first-time Lazygit user, my suggestion is to avoid using Lazygit on a working repository. Instead, create a demo repository and try it out/practice.

To learn more about [LazyGit keybindings or shortcuts (<FontIcon icon="iconfont icon-github"/>`jesseduffield/lazygit`)](https://github.com/jesseduffield/lazygit/blob/master/docs/keybindings/Keybindings_en.md), you can refer to the Lazygit documentation. You can also check out the following YouTube tutorials for beginners:

- [<FontIcon icon="fa-brands fa-youtube"/>LazyGIt - A Faster, Easier Way to Use Git on Terminal & NeoVim](https://youtu.be/A6F_8ajlrYQ)
- [<FontIcon icon="fa-brands fa-youtube"/>Lazygit - The Best Way To Use Git On The Terminal & Neovim](https://youtu.be/Ihg37znaiBo)
- [<FontIcon icon="fa-brands fa-youtube"/>My new favorite way to use Git](https://youtu.be/06lEP59XAgM)
- [<FontIcon icon="fa-brands fa-youtube"/>LazyGit: Effortless Git in Your Terminal!](https://youtu.be/dSWJKcEiAaM)

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Use Lazygit to Improve Your Git Workflow",
  "desc": "Lazygit is an open-source command line terminal UI for Git commands that I’ve used for the last couple of years, and it’s become my new best friend. Basically, the Lazygit tool is a wrapper for the Git command line that replaces it with a UI. Instead...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-lazygit-to-improve-your-git-workflow.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
