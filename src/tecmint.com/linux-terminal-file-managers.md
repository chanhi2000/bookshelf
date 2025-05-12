---
lang: ko-KR
title: "11 Best Linux Console File Managers"
description: "Article(s) > 11 Best Linux Console File Managers"
icon: fa-brands fa-debian
category: 
  - DevOps
  - Linux
  - Debian
  - Fedora
  - Article(s)
tag: 
  - blog
  - tecmint.com
  - devops
  - linux
  - debian
  - ubuntu
  - raspberry-pi
  - mint
  - linuxmint
  - linux-mint
  - kali
  - kalilinux
  - kali-linux
  - fedora
  - redhat
  - centos
  - rocky
head:
  - - meta:
    - property: og:title
      content: "Article(s) > 11 Best Linux Console File Managers"
    - property: og:description
      content: "11 Best Linux Console File Managers"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/tecmint.com/linux-terminal-file-managers.html
prev: /devops/linux-debian/articles/README.md
date: 2024-09-10
isOriginal: false
author:
  - name: Marin Todorov
    url : https://tecmint.com/author/marintodorov89/
cover: https://tecmint.com/wp-content/uploads/2019/02/Linux-Terminal-File-Managers.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Linux - Debain > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/linux-debian/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Linux - Fedora > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/linux-fedora/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="12 Best Linux Console File Managers"
  desc="Linux console file managers can be very helpful in day-to-day tasks, when managing files on a local machine, or when connected to a remote one."
  url="https://tecmint.com/linux-terminal-file-managers"
  logo="https://tecmint.com/wp-content/uploads/2020/07/favicon.ico"
  preview="https://tecmint.com/wp-content/uploads/2019/02/Linux-Terminal-File-Managers.png"/>

Linux console [**file managers**](/tecmint.com/top-best-lightweight-linux-file-managers.md) can be very helpful in day-to-day tasks, when managing files on a local machine, or when connected to a remote one. The visual console representation of the directory helps us [**quickly perform file/folder operations**](/tecmint.com/linux-file-operations-commands.md) and saves us some time.

::: info

You might also like: [**30 Best File Managers and Explorers [GUI + CLI] for Linux**](/tecmint.com/linux-file-managers.md)

:::

In this article, we are going to review some of the most frequently used Linux console file managers and their features and benefits.

---

## 1. GNU Midnight Commander

**Midnight Command**, often referred to simply as `mc` and is one of the top file managers discussed in this article. **Mc** comes with all kinds of useful features, aside from copying, moving, deleting, and creating files and directories you can change permissions and ownership, review archives, use it as an [**FTP client**](/tecmint.com/command-line-ftp-clients-for-linux.md), and many more.

![Gnu Midnight Commander](https://tecmint.com/wp-content/uploads/2019/02/Gnu-Midnight-Commander.png)

You can find our full review of the [**Midnight Commander a console-based file manager**](/tecmint.com/midnight-commander-a-console-based-file-manager-for-linux.md).

To install **Midnight Commander** you can use the following commands:

::: code-tabs#sh

@tab:active <FontIcon icon="fa-brands fa-debian"/>,<FontIcon icon="fa-brands fa-ubuntu"/>,<FontIcon icon="iconfont icon-linuxmint"/>

```sh
sudo apt install mc
```

@tab <FontIcon icon="fa-brands fa-fedora"/>,<FontIcon icon="fa-brands fa-centos"/>,<FontIcon icon="fa-brands fa-redhat"/>,<FontIcon icon="iconfont icon-rockylinux"/>

```sh
sudo dnf install mc
```

@tab <FontIcon icon="iconfont icon-gentoo"/>

```sh
sudo emerge -a sys-apps/mc
```

@tab <FontIcon icon="iconfont icon-alpine"/>

```sh
sudo apk add mc
```

@tab <FontIcon icon="iconfont icon-archlinux"/>

```sh
sudo pacman -S mc
```

@tab <FontIcon icon="fa-brands fa-opensuse"/>

```sh
sudo zypper install mc
```

@tab <FontIcon icon="fa-brands fa-freebsd"/>

```sh
sudo pkg install mc
```

:::

---

## 2. Ranger Console File Manager

freestar.config.enabled_slots.push({ placementName: "tecmint_incontent", slotId: "tecmint_incontent" });

**Ranger** is another top choice when looking for a console file manager. It has a vim-like interface, a preview of the selected file or directory, bookmarks mouse support, and tabbed view.

::: info

You can find our full review here: [**Ranger – a nice console file manager with vi key bindings**](/tecmint.com/ranger-console-file-manager-with-vi-key-bindings.md).

:::

To install **Ranger** you can use the following commands:

::: code-tabs#sh

@tab:active <FontIcon icon="fa-brands fa-debian"/>,<FontIcon icon="fa-brands fa-ubuntu"/>,<FontIcon icon="iconfont icon-linuxmint"/>

```sh
sudo apt install ranger
```

@tab <FontIcon icon="fa-brands fa-fedora"/>,<FontIcon icon="fa-brands fa-centos"/>,<FontIcon icon="fa-brands fa-redhat"/>,<FontIcon icon="iconfont icon-rockylinux"/>

```sh
sudo dnf install ranger
```

@tab <FontIcon icon="iconfont icon-gentoo"/>

```sh
sudo emerge -a sys-apps/ranger
```

@tab <FontIcon icon="iconfont icon-alpine"/>

```sh
sudo apk add ranger
```

@tab <FontIcon icon="iconfont icon-archlinux"/>

```sh
sudo pacman -S ranger
```

@tab <FontIcon icon="fa-brands fa-opensuse"/>

```sh
sudo zypper install ranger
```

@tab <FontIcon icon="fa-brands fa-freebsd"/>

```sh
sudo pkg install ranger
```

:::

![Ranger - Console File Manager](https://tecmint.com/wp-content/uploads/2019/02/Ranger-Console-File-Manager.png)

---

## 3. Cfiles Fast Terminal File Manager

**Cfiles** is a fast terminal file manager written in C and uses ncurses, similar to **ranger**, it also uses vi keybindings. It has a few dependencies such as `cp`, `mv`, `fzf`, `xdg-open`, and others. While it is lightweight, its installation requires a few more steps:

![Cfiles - Terminal File Manager](https://tecmint.com/wp-content/uploads/2019/02/Cfiles-Terminal-File-Manager.png)

To install **cfiles**, first, you need to install development tools using the following commands:

::: code-tabs#sh

@tab:active <FontIcon icon="fa-brands fa-debian"/>,<FontIcon icon="fa-brands fa-ubuntu"/>,<FontIcon icon="iconfont icon-linuxmint"/>

```sh
sudo apt install build-essential
```

@tab <FontIcon icon="fa-brands fa-fedora"/>,<FontIcon icon="fa-brands fa-centos"/>,<FontIcon icon="fa-brands fa-redhat"/>,<FontIcon icon="iconfont icon-rockylinux"/>

```sh
sudo yum groupinstall 'Development Tools'
```

:::

Next, clone the **cfiles** repository and install it using the following commands.

```sh
git clone https://github.com/mananapr/cfiles.git
cd cfiles
gcc cf.c -lncurses -o cf
sudo cp cf /usr/bin/            #Or copy somewhere else in your $PATH 
```

A more detailed review of **cfiles** can be found here: [**Cfiles a terminal file manager for Linux**](/tecmint.com/cfiles-terminal-file-manager-for-linux.md).

---

## 4. Vifm Console File Manager

**Vifm** is another command line-based file manager, which uses a curses interface. This one however copies some features from **mutter**. If you are a Vim user, you won’t need to learn a [**new set of commands**](/tecmint.com/most-used-linux-commands.md) to work with vifm. It uses the same keybindings and also has the ability to edit several kinds of files.

Similar to other console file managers, it has two panes and supports auto-completion. It also supports various of different views for the comparison of file trees. You can also execute remote commands with it.

![Vifm - Console File Manager](https://tecmint.com/wp-content/uploads/2019/02/Vifm-Console-File-Manager.png)

To install **Vifm** you can use the following commands:

::: code-tabs#sh

@tab:active <FontIcon icon="fa-brands fa-debian"/>,<FontIcon icon="fa-brands fa-ubuntu"/>,<FontIcon icon="iconfont icon-linuxmint"/>

```sh
sudo apt install vifm
```

@tab <FontIcon icon="fa-brands fa-fedora"/>,<FontIcon icon="fa-brands fa-centos"/>,<FontIcon icon="fa-brands fa-redhat"/>,<FontIcon icon="iconfont icon-rockylinux"/>

```sh
sudo dnf install vifm
```

@tab <FontIcon icon="iconfont icon-gentoo"/>

```sh
sudo emerge -a sys-apps/vifm
```

@tab <FontIcon icon="iconfont icon-alpine"/>

```sh
sudo apk add vifm
```

@tab <FontIcon icon="iconfont icon-archlinux"/>

```sh
sudo pacman -S vifm
```

@tab <FontIcon icon="fa-brands fa-opensuse"/>

```sh
sudo zypper install vifm
```

@tab <FontIcon icon="fa-brands fa-freebsd"/>

```sh
sudo pkg install vifm
```

:::

A more detailed review of **vifm** can be seen at [**Vifm command line-based file manager for Linux**](/tecmint.com/vifm-commandline-based-file-manager-for-linux.md).

---

## 5. Nnn Terminal File Browser

**Nnn** is the fastest console file manager in our list. While it has fewer features compared to other file managers, it is extremely lightweight and it is closest to a desktop file manager on what you can get on the console. The interaction is simple and allows new users to easily get used to the terminal.

![Nnn - Terminal File Browser](https://tecmint.com/wp-content/uploads/2019/02/Nnn-Terminal-File-Browser.png)

To install **nnn**, you can use the following command:

::: code-tabs#sh

@tab:active <FontIcon icon="fa-brands fa-debian"/>,<FontIcon icon="fa-brands fa-ubuntu"/>,<FontIcon icon="iconfont icon-linuxmint"/>

```sh
sudo apt install nnn
```

@tab <FontIcon icon="fa-brands fa-fedora"/>,<FontIcon icon="fa-brands fa-centos"/>,<FontIcon icon="fa-brands fa-redhat"/>,<FontIcon icon="iconfont icon-rockylinux"/>

```sh
sudo dnf install nnn
```

@tab <FontIcon icon="iconfont icon-gentoo"/>

```sh
sudo emerge -a sys-apps/nnn
```

@tab <FontIcon icon="iconfont icon-alpine"/>

```sh
sudo apk add nnn
```

@tab <FontIcon icon="iconfont icon-archlinux"/>

```sh
sudo pacman -S nnn
```

@tab <FontIcon icon="fa-brands fa-opensuse"/>

```sh
sudo zypper install nnn
```

@tab <FontIcon icon="fa-brands fa-freebsd"/>

```sh
sudo pkg install nnn
```

:::

A more detailed preview of **nnn** can be found at [**Nnn – a fast and friendly terminal file browser**](https://geeksmint.com/nnn-linux-terminal-file-browser/).

---

## 6. Lfm Last File Manager

**Lfm** shortened for **Last File Manager** is a curses-based console file manager written in Python. It can be used with 1 or 2 panes. It has some useful features such as filters, bookmarks, history, VFS for compressed files, tree view, and direct integration with the [**find command**](/tecmint.com/35-practical-examples-of-linux-find-command.md), [**grep utility**](/tecmint.com/12-practical-examples-of-linux-grep-command.md), [**df command**](/tecmint.com/how-to-check-disk-space-in-linux.md), and other tools. Customized themes are also available.

![Lfm - Last File Manager](https://tecmint.com/wp-content/uploads/2019/02/Lfm-Last-File-Manager.png)

To install **Lfm**, you can use the following command:

::: code-tabs#sh

@tab:active <FontIcon icon="fa-brands fa-debian"/>,<FontIcon icon="fa-brands fa-ubuntu"/>,<FontIcon icon="iconfont icon-linuxmint"/>

```sh
sudo apt install lfm
```

@tab <FontIcon icon="fa-brands fa-fedora"/>,<FontIcon icon="fa-brands fa-centos"/>,<FontIcon icon="fa-brands fa-redhat"/>,<FontIcon icon="iconfont icon-rockylinux"/>

```sh
sudo dnf install lfm
```

@tab <FontIcon icon="iconfont icon-gentoo"/>

```sh
sudo emerge -a sys-apps/lfm
```

@tab <FontIcon icon="iconfont icon-alpine"/>

```sh
sudo apk add lfm
```

@tab <FontIcon icon="iconfont icon-archlinux"/>

```sh
sudo pacman -S lfm
```

@tab <FontIcon icon="fa-brands fa-opensuse"/>

```sh
sudo zypper install lfm
```

@tab <FontIcon icon="fa-brands fa-freebsd"/>

```sh
sudo pkg install lfm
```

:::

You can also install **lfm** using the [**pip command**](/tecmint.com/install-pip-in-linux.md):

```sh
sudo pip install lfm
```

---

## 7. lf – List Files

**Lf** – “**List files**” is a command line file manager written in **Go**, inspired by **Ranger**. Originally it was meant to fill the gaps of missing features that the ranger had.

![lf - List Files ](https://tecmint.com/wp-content/uploads/2019/02/lf-List-files.png)

Some of the main features of **lf** are:

- It’s cross-platform – Linux, OSX, Windows (only partial).
- Single binary without any runtime dependencies.
- Low memory footprint.
- Configuration with shell commands.
- Customizable keybindings.

Future plans include the activation of mouse control.

To install **lf** simply download the binary-related build for your OS from the [lf releases (<FontIcon icon="iconfont icon-github"/>`gokcehan/lf`)](https://github.com/gokcehan/lf/releases) page.

---

## 8. WCM Commander

The last in our list is **WCM** command which is another cross-platform console file manager. The authors of the **WCM** commander meant to create a cross-platform file manager that mimics the features of **Far Manager**.

![WCM Commander](https://tecmint.com/wp-content/uploads/2019/02/WCM-Commander.png)

It has a built-in terminal, [**text editor**](/tecmint.com/best-open-source-linux-text-editors.md) and viewer, syntax highlighting, virtual filesystem, and a very fast user interface. Mouse support is also enabled. The package for each OS can be found on the [<FontIcon icon="fas fa-globe"/>WCM download](http://wcm.linderdaum.com/downloads/) page.

---

## 9. Walk Terminal File Manager

[Walk (<FontIcon icon="iconfont icon-github"/>`antonmedv/walk`)](https://github.com/antonmedv/walk) is a terminal-based navigator that serves as an alternative to the traditional [**`ls`**](/tecmint.com/ls-command-in-linux.md) and [**`cd`**](/tecmint.com/cd-command-in-linux.md) commands, It allows for quick navigation using fuzzy searching, cd integration is quite simple, and you can open Vim directly from the walk.

![Walk Terminal File Manager](https://tecmint.com/wp-content/uploads/2019/02/Walk-Terminal-File-Manager.png)

---

## 10. Superfile – Terminal-based File Manager

[<FontIcon icon="fas fa-globe"/>Superfile](https://superfile.netlify.app/) is a modern and stylish terminal-based file manager designed for efficient navigation and organization of files for developers and system administrators.

Its simple yet powerful interface allows users to browse, copy, move, and edit files directly from the command line. Superfile offers a range of convenient features, including customizable key bindings, tabbed browsing, multiple panels, and support for various file operations.

Whether you’re managing local files or remote servers, superfile’s efficiency and flexibility make it an ideal choice for anyone seeking a reliable and efficient file management solution.

![Superfile - Terminal-Based File Manager](https://tecmint.com/wp-content/uploads/2023/09/Superfile-Terminal-Based-File-Manager.webp)

---

## 11. Clifm – Fast File Manager

[Clifm (<FontIcon icon="iconfont icon-github"/>`leo-arch/clifm`)](https://github.com/leo-arch/clifm/) is a unique, lightning-fast command-line file manager that operates like a shell, allowing users to interact with their file system using familiar commands.

Unlike other terminal file managers like **Midnight Commander** or **Ranger**, which rely on menus, **Clifm** streamlines the experience by enabling direct command input, making it ideal for those comfortable with the command line.

![Clifm Terminal File Manager](https://tecmint.com/wp-content/uploads/2024/08/Clifm-Terminal-File-Manager.png)

---

## 12. Yazi – Blazing Fast Terminal File Manager

[Yazi (<FontIcon icon="iconfont icon-github"/>`sxyazi/yazi`)](https://github.com/sxyazi/yazi) is a fast and efficient terminal file manager written in Rust that uses asynchronous I/O to provide a smooth and responsive user experience.

**Yazi** supports multiple image protocols, including **Kitty**, **Konsole**, **iTerm2**, and **Mintty**, allowing it to display images directly in the terminal.

It also includes built-in code highlighting and image decoding, which helps to speed up file loading. It has a plugin system that allows users to customize its behavior and add new features.

Overall, **Yazi** is a powerful and flexible tool for managing files from the command line.

![Yazi - Blazing Fast Terminal File Manager](https://tecmint.com/wp-content/uploads/2024/08/Yazi-Fast-Terminal-File-Manager.webp)

---

## Conclusion

This was our short presentation on some of the top Linux console file managers. If you think we have missed one or like some of them more, please share your thoughts in the comment section.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "12 Best Linux Console File Managers",
  "desc": "Linux console file managers can be very helpful in day-to-day tasks, when managing files on a local machine, or when connected to a remote one.",
  "link": "https://chanhi2000.github.io/bookshelf/tecmint.com/linux-terminal-file-managers.html",
  "logo": "https://tecmint.com/wp-content/uploads/2020/07/favicon.ico",
  "background": "rgba(5,86,243,0.2)"
}
```
