---
lang: en-US
title: "7 Essential Things To Do After Installing Arch Linux"
description: "Article(s) > 7 Essential Things To Do After Installing Arch Linux"
icon: iconfont icon-archlinux
category:
  - Linux
  - Arch Linux
  - Article(s)
tag:
  - blog
  - itsfoss.com
  - linux
  - arch
  - archlinux
  - arch-linux
head:
  - - meta:
    - property: og:title
      content: "Article(s) > 7 Essential Things To Do After Installing Arch Linux"
    - property: og:description
      content: "7 Essential Things To Do After Installing Arch Linux"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/itsfoss.com/things-to-do-after-installing-arch-linux.html
prev: /devops/linux-arch/articles/README.md
date: 2020-06-01
isOriginal: false
author: 
  - name: Abhishek Prakash
    url: https://itsfoss.com/author/abhishek/
cover: https://itsfoss.com/content/images/wordpress/2018/01/things-to-do-after-installing-arch-linux.jpg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Arch Linux > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/linux-arch/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="7 Essential Things To Do After Installing Arch Linux"
  desc="Brief: This tutorial shows you a few essential things to do after installing Arch Linux. This will help you get started with Arch Linux so that you can explore it further. Earlier I showed you how to install Arch Linux. Today, I am going to list a few basic and"
  url="https://itsfoss.com/things-to-do-after-installing-arch-linux"
  logo="https://itsfoss.com/content/images/size/w256h256/2022/12/android-chrome-192x192.png"
  preview="https://itsfoss.com/content/images/wordpress/2018/01/things-to-do-after-installing-arch-linux.jpg"/>

::: info Brief

This tutorial shows you a few essential things to do after installing Arch Linux. This will help you get started with Arch Linux so that you can explore it further.

:::

Earlier I showed you [how to install Arch Linux](/itsfoss.com/install-arch-linux.md). Today, I am going to list a few basic and yet important things to do after installing Arch Linux.

By this time, you probably already know that [<VPIcon icon="iconfont icon-archlinux"/>Arch Linux](https://archlinux.org/) comes with a minimal installation and lets you build your own system on top of it. From installing desktop environments to media codecs and your favorite applications, everything has to be done by you.

This do-it-yourself (DIY) approach is what many Arch Linux users prefer. If you want things running out of the box, [you should use Manjaro Linux](/itsfoss.com/why-use-manjaro-linux.md). Manjaro is based on Arch minus the hassle.

Cutting down the chit-chat, let’s see what to do after installing Arch Linux.

---

## Must to do things after installing Arch Linux

![Things To Do After Installing Arch Linux](https://itsfoss.com/content/images/wordpress/2018/01/things-to-do-after-installing-arch-linux.jpg)

While at It’s FOSS, we focus on beginner centric approach and hence we suggest plenty of GUI based approach, this won’t be the case here.

Arch Linux is sort of expert domain and we believe if you use Arch, you are not afraid of using the terminal. This is why the steps mentioned here are command line based.

### 0. Update your system

You might already have used the latest release, but it’s advisable to check for the latest update for your Arch System:

```sh
sudo pacman -Syu
```

### 1. Installing X server, Desktop Environment and Display Manager

Before installing a desktop environment (DE), you will need to install the [<VPIcon icon="fas fa-globe"/>X server](http://linfo.org/x_server.html) which is the most popular [display server](/itsfoss.com/display-server.md).

```sh
sudo pacman -S xorg
```

Once it’s completed, use any of the below commands to install your [favorite desktop environment](/itsfoss.com/best-linux-desktop-environments.md).

```sh
sudo pacman -S gnome gnome-extra # To install GNOME:
sudo pacman -S cinnamon nemo-fileroller # To install Cinnamon:
sudo pacman -S xfce4 xfce4-goodies # To install XFCE:
sudo pacman -S plasma # To install KDE:
sudo pacman -S mate mate-extra # To install MATE:
```

You will also need a [display manager](/itsfoss.com/display-manager.md) to log in to your desktop environment. For the ease, you can install [<VPIcon icon="fas fa-globe"/>LXDM](https://wiki.archlinux.org/index.php/LXDM).

```sh
pacman -S lxdm
```

Once installed, you can enable to start each time you reboot your system.

```sh
systemctl enable lxdm.service
```

Reboot your system and you will see the LXDMlogin screen, select your desktop environment from the list and login.

This is how my system looks like with LXDM and GNOME.

![Arch Linux with GNOME and LXDM](https://itsfoss.com/content/images/wordpress/2018/01/Desktop-800x434.jpg)

### 2. Install an LTS kernel

Why should you install LTS kernel in Arch Linux when it is supposed to be cutting edge?

Installing an LTS kernel means you have a more stable kernel with better support to older hardware. Also, the LTS kernels are supported for at least 2 years with bug fixes and performance enhancements.

If you rather choose to use the latest Linux kernel, you may find regression and bugs introduced by the latest kernel updates to your existing software and system. It’s not a certainty but it is definitely a possibility.For example, a [Kernel update broke GNOME](/itsfoss.com/fix-white-screen-login-arch-linux.md) in Arch based Linux some timeback.

This is why it is advisable to use an LTS kernel if you prefer a more stable system and/or have an older one. But the decision is yours to make.

Before you install an LTS kernel, [check the Linux kernel version](/itsfoss.com/find-which-kernel-version-is-running-in-ubuntu.md) you are using.

```sh
uname -r
```

To install the LTS kernel and Linux LTS headers, type the below command:

```sh
sudo pacman -S linux-lts
sudo pacman -S linux-lts-headers
```

At this point, the LTS version is the default one.

Once done, you can remove the older kernels by typing the below command. However, I prefer to keep it in “case” something goes wrong, I can boot into the other Linux kernel version.

```sh
sudo pacman -Rs linux
```

\[irp posts=”17095″ name=”Now You Can Try Linux From Scratch 8.0 in Live Session!”\]

### 3. Installing Yaourt

[<VPIcon icon="iconfont icon-archlinux"/>Yaourt](https://archlinux.fr/yaourt-en)stands for Yet AnOther User Repository Tool which can be used to search, download and install packages from the official repository as well as AUR.

[Arch User Repository](/itsfoss.com/aur-arch-linux.md) or [<VPIcon icon="iconfont icon-archlinux"/>AUR](https://wiki.archlinux.org/index.php/Arch_User_Repository) is a community-driven repository for Arch users and contains package descriptions to compile a package from source and install it.Most of the packages that make to the official repository start in the AUR first. Users contribute their own applications which are voted for or against and once it becomes popular enough, they areincluded in the official repository.

AUR contains lots of useful applications that are not found in the main repo can be installed from AUR with help of Yaourt. Yaourt is similar to what [Synaptic Package Manager](/itsfoss.com/synaptic-package-manager.md) does, and can be installed by following these steps:

Open <VPIcon icon="fas fa-folder-open"/>`/etc/`<VPIcon icon="fas fa-file-lines"/>`pacman.conf` file and add these lines at the bottom:

```toml title="pacman.conf"
[archlinuxfr]
SigLevel = Never
Server = http://repo.archlinux.fr/$arch
```

Save the change. Install Yaourt with the below command

```sh
sudo pacman -Syu yaourt
```

Use the command below to sync Yaourt with AUR:

```sh
yaourt -Syy
```

To install AUR packages, you can the below commands :

```sh
yaourt -S package-name
```

### 4. Install GUI Package Manager Pamac

The default package manager for Arch Linux is [<VPIcon icon="iconfont icon-archlinux"/>Pacman](https://wiki.archlinux.org/index.php/pacman) (Package Manager) and using Pacman is quite easy to install or remove a software.

However, it’s sometimes difficult to talk in commands. Pamac provides a GUI option for Pacman and works like Synaptic Package Manager or GNOME Software.

Pamac serves as a GUI tool for installing or updating packages and works well with Arch User Repository AUR.

#### How to install Pamac

Before you can use Pamac, you will need to have Yaourt (or Packer) installed first. Once done, type the below command in terminal to install Pamac.

```sh
yaourt -S pamac-aur
```

You can launch the GUI by searching for Add/Remove Software. It will show different packages that are available and installed and which all updates are needed.

![Pamac Package Manager](https://itsfoss.com/content/images/wordpress/2018/01/pamac-1-1.jpg)

However, by default, the AUR packagesare not enabled. To enable it, click on the options just beside the search option) and choose Preferences. Under the AUR tab, Enable AUR support.

![Enable AUR support in Pamac](https://itsfoss.com/content/images/wordpress/2018/01/AUR.png)

Installing software through Pamac is as easier as searching it through the GUI (which searches the community and AUR) and installing it with a click.

### 5.Installing Codecs and plugins

Of course, you are going to use your personal system for recreational works like watching videos and listening to your favorite song. But before that, you will have to install codecs for these audio and video files.

Type the below command inthe terminal:

```sh
sudo pacman -S a52dec faac faad2 flac jasper \
lame libdca libdv libmad libmpeg2 libtheora \
libvorbis libxv wavpack x264 xvidcore \
gstreamer0.10-plugins
```

However, installing a media player like VLC imports all the necessary codecs and installs it.

```sh
sudo pacman -S vlc
```

You may add a music player too:

```sh
sudo pacman -S amarok
```

### 6. Installing productive software

For day to day use and setting up your Arch system for productive use, you need some basic applications like an office suite, email client, a web browser etc.

```sh
sudo pacman -S libreoffice thunderbird firefox geditflashplugin \
skype dropbox aria2
```

Aria2 is a download manager, LibreOffice is the most popular open source office suite, Thunderbird is a cross-platform mail and chat client, Firefox is an open source and free web browser, Gedit is an editor, flashplugin installs flash, Skype is a popular messaging and video calling software and Dropbox - to store your file for anytime access.

Along with these, you will need archive managers

```sh
sudo pacman -S p7zip p7zip-plugins unrar tar rsync
```

This is of course just a suggestion. You can install [essential Linux applications](/itsfoss.com/essential-linux-applications.md) of your choice and your requirement.

### 7. Customizing the looks of your Arch Linux desktop

You can customize your Arch Linux by installing some nice flat themes or the conky monitoring tool.

::: tabs

@tab:active Installing themes

Some of the most liked themes are Arc GTK, flatplat, Vertex and Numix, which can be installed by below command:

```sh
yaourt -S arc-gtk-theme flatplat-theme-git vertex-themes
sudo pacman -S numix-themes
```

Go to settings > Appearance and change the default theme from there.

@tab Installing Conky

Conky is a free system manager application which can monitor and display memory usage, CPU statistics, disk storage, swap, CPU temperature and more.

To install conky, use below command :

```sh
sudo pacman -S conky
```

You can [configure conky yourself](/itsfoss.com/conky-gui-ubuntu-1304.md) which will need some digging into the ~/.conkyrc file or you can download your favorite one from web and replace the default conkyrc file. There is a detailed tutorial about conky and its configuration on the [<VPIcon icon="iconfont icon-archlinux"/>Arch Linux website.](https://wiki.archlinux.org/index.php/Conky)

:::

::: tip Additional tip

At any point in time, if you feel like removing any application (and its dependencies), you can use these commands:

```sh
sudo pacman -R package-name
```

It removes the package without removing the dependencies. If you want to remove the dependencies but leaving out the ones which are being used by some other application, below command will help:

```sh
sudo pacman -Rs package-name
```

:::

### Final Words

Arch Linux is a great distribution if you want to take control of everything, from setting up your favorite desktop environment to the tools you want to use. The [<VPIcon icon="iconfont icon-archlinux"/>Arch Wiki](https://wiki.archlinux.org/) is a great place to learn these things and in itself more than sufficient.

In this article, we have just listed out the most important things to do after installing Arch Linux. The rest is up to you to explore.

*By the way, what are the things you do after installing Arch Linux?*

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "7 Essential Things To Do After Installing Arch Linux",
  "desc": "Brief: This tutorial shows you a few essential things to do after installing Arch Linux. This will help you get started with Arch Linux so that you can explore it further. Earlier I showed you how to install Arch Linux. Today, I am going to list a few basic and",
  "link": "https://chanhi2000.github.io/bookshelf/itsfoss.com/things-to-do-after-installing-arch-linux.html",
  "logo": "https://itsfoss.com/content/images/size/w256h256/2022/12/android-chrome-192x192.png",
  "background": "rgba(53,121,127,0.2)"
}
```
