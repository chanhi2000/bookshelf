---
lang: en-US
title: "Installing the Much Hyped Hyprland on Linux"
description: "Article(s) > Installing the Much Hyped Hyprland on Linux"
icon: iconfont icon-hyprland
category:
  - Linux
  - Hyprland
  - Article(s)
tag:
  - blog
  - itsfoss.com
  - linux
  - hyprland
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Installing the Much Hyped Hyprland on Linux"
    - property: og:description
      content: "Installing the Much Hyped Hyprland on Linux"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/itsfoss.com/install-hyprland.html
prev: /tool/hyprland/articles/README.md
date: 2024-11-20
isOriginal: false
author: Sreenath
cover: https://itsfoss.com/content/images/2024/11/_install-hyprland-in-linux.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Hyprland > Article(s)",
  "desc": "Article(s)",
  "link": "/tool/hyprland/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Installing the Much Hyped Hyprland on Linux"
  desc="Let's get on the ”hyp” wagon by installing Hyprland on your Linux system."
  url="https://itsfoss.com/install-hyprland"
  logo="https://itsfoss.com/content/images/size/w256h256/2022/12/android-chrome-192x192.png"
  preview="https://itsfoss.com/content/images/2024/11/_install-hyprland-in-linux.png"/>

Hyprland is a dynamic tiling window compositor that is both highly customizable and provides plenty of eye candy.

It is also very popular in Linux ricing groups these days. And why not? If you are into customizing the looks of your desktop, Hyprland is surely worth all the hype.

Take a look at the screenshot below.

![Image credit: [<FontIcon icon="iconfont icon-github"/>`flick0/dotfiles`](https://github.com/flick0/dotfiles/blob/aurora/assets/fetch.png)](https://itsfoss.com/content/images/2024/11/hyprland.webp)

The official Hyprland video provides more detailed visuals:

Now, I am not trying to discourage you, but these things take a lot of effort if you try to configure on your own. Alternatively, you can use the dot files from someone else and get the same look as theirs.

I believe it's a good learning experience but something that should be done on a secondary system.

I tried it on a VM and although, Hyprland it is not officially supported in virtuacl machines, it still worked for most parts in my testing.

::: caution 🚧

Hyprland is in highly active development. Unlike GNOME and other desktop environments, you don't get a stable release which is supported for years.

:::

---

## Things to note before installing Hyprland

Before you start installing [<FontIcon icon="iconfont icon-hyprland"/>Hyprland](https://hyprland.org/), you need to understand a few points about stability and compatibility.

- Hyprland is not a beginner-centric window compositor.
- It is Wayland-only and not all Xorg-only application will work on Hyprland.
- Nvidia GPUs have limited compatibility due to their proprietary nature.
- It is not officially supported in virtual machines, but somehow it works. To get a better result, you should try it on a bare metal.
- If you are installing on a virtual machine, like VirtualBox, enable 3D Acceleration. Moreover, allow a RAM of at least 4 GB.

::: caution 🚧

I suggest either you try it in a spare machine first, or keep another stable window manager in the system, so that you don't lose your work while experimenting with Hyprland.

:::

---

## Install Hyprland with Arch Linux using archinstall script

Arch Linux, [NixOS](/itsfoss.com/nixos-tutorials.md) and openSUSE Tumbleweed are the most supported distribution when it comes to Hyprland.

In Arch Linux, if you are using the `archinstall` script, you have an option to select Hyprland as the desktop in Profile → Type → Desktop → Hyprland.

[![Select Hyprland during Arch Linux Installation using Archinstall script.](https://itsfoss.com/content/images/2024/10/hyprland-in-archinstall.png)](https://itsfoss.com/content/images/2024/10/hyprland-in-archinstall.png)

As you can see in the screenshot above, the installer has selected some necessary dependencies for Hyprland to work.

On the next step, it will ask you to have access to hardware. Here, I have gone with Polkit.

Similarly, the greeter will be automatically set to SDDM.

::: info 📋

If you are installing Hyprland as the only option, it is better to select SDDM. In case you are installing Hyprland on a GNOME setup, there is no need to install and configure SDDM, as GDM just works fine.

:::

On the additional packages installation prompt, install `hyprpaper` and `waybar`. Or do that after install and login.

```sh
sudo pacman -Syu hyprpaper waybar
```

::: info 📋

Hyprpaper is the wallpaper manager and Waybar is the bar, that host necessary panel buttons.

:::

That's it. You will have a working Hyprland set up.

::: caution 🚧

Hyprpaper needs to be enabled and configured to get a proper wallpaper to your screen. This will be discussed in another article.

:::

### Install Hyprland in base install

If you have installed [Arch Linux base installation following our guide](/itsfoss.com/install-arch-linux.md), then you need to install the Hyprland separately. To do that, log in to the base install and run the command:

```sh
sudo pacman -Syu hyprland hyprpaper xdg-desktop-portal-hyprland waybar wofi kitty sddm
```

Then enable the SDDM service using:

```sh
sudo systemctl enable sddm.service
```

Now, restart the system and login to Hyprland session.

---

## Install Hyprland in Ubuntu

Hyprland is also available in the default repo of Ubuntu since 24.10 Oracular Oriole. But it is highly not recommended to install Hyprland from this package.

Instead, I will discuss another method, through which you can set up a working Hyprland on Ubuntu.

::: caution 🚧

Here, I am using Ubuntu 24.0.1 as the distro. The method mentioned below has separate repositories for other versions. Please check you Ubuntu version before continuing.

:::

### Things to keep in mind before proceeding

- You should back up your system and important data before start installing.
- Ensure an active, uninterrupted internet connection.
- Version older than 24.04 won't work.
- Do not install SDDM.

Once you are ready, let's install.

### Install Hyprland in Ubuntu 24.04

First, you need to enable the source packages repo in Ubuntu. Search for Software and Updates and open it.

[![Open Software and Updates from Ubuntu Activities Overview](https://itsfoss.com/content/images/2024/10/software-and-updates-1.png)](https://itsfoss.com/content/images/2024/10/software-and-updates-1.png)

Go to the tab and enable the checkbox near sources.

[![Enable the source packages repository in Software and Updates app.](https://itsfoss.com/content/images/2024/10/enable-source-code-in-ubuntu.png)](https://itsfoss.com/content/images/2024/10/enable-source-code-in-ubuntu.png)

Click on close, and then use the Reload button. Now, update your system and install all pending updates.

```sh
sudo apt update && sudo apt upgrade
```

We use the Automated Hyprland Installer for Ubuntu to install Hyprland on Ubuntu. This offers a fast method to get started with Hyprland.

[Ubuntu-Hyprland](https://github.com/JaKooLit/Ubuntu-Hyprland/tree/24.04)

::: caution 🚧

There are methods to build Hyprland from source, but there are many hiccups included, which will put you in a long troubleshooting loop.

:::

Clone the Hyprland installer third-party repository.

```sh
git clone -b 24.04 --depth 1 \
https://github.com/JaKooLit/Ubuntu-Hyprland.git \
~/Ubuntu-Hyprland-24.04
```

Now, move inside the directory and give the installer file (`install.sh`) execution permission.

```sh
cd ~/Ubuntu-Hyprland-24.04
chmod +x install.sh
```

Run the installer.

::: caution 🚧

You should NOT run the installer as root.

:::

```sh
./install.sh
```

This will start the installer.

[![Starting Hyprland installer in Ubuntu.](https://itsfoss.com/content/images/2024/10/hyprland-installer-start.png)](https://itsfoss.com/content/images/2024/10/hyprland-installer-start.png)

::: caution 🚧

Only Hyprland up to v0.39.1 is compatible with Ubuntu 24.04. This is because of the version of required dependency in the Ubuntu repo remains as is, and Hyprland is a heavily active project, that changes the dependency requirements quite often.

:::

Read the note carefully and proceed by entering `y`.

Now, some questions will be asked on the topics:

- NVIDIA GPU: Hyprland may not work properly with NVIDIA, as said in an earlier section.
- Install GTK Themes for Dark Light function.
- Configure Bluetooth
- Install Thunar file manager.
- Install SDDM: This should be NO (n). Since Ubuntu has GDM and it works well.
- Install XDG-DESKTOP-PORTAL-HYPRLAND: This should be YES (y).
- Install ZSH
- Install nwg-look: This is for GTK Theming. It will take a long time to build. So you can skip (n) this.
- Installing on Asus ROG Laptops.
- Preconfigured Dot files: Yes (y), if you don't want to configure the looks from scratch.

[![Hyprland installer asks necessary questions to get required configuration values.](https://itsfoss.com/content/images/2024/10/all-installer-questions-hyprland.png)](https://itsfoss.com/content/images/2024/10/all-installer-questions-hyprland.png)

When asked, enter the sudo password to start installation.

Sit back and wait, while the installer completes the set-up process.

When asked, “Would you like to try to remove other XDG-Desktop-Portal-Implementations?”, give no.

Similarly, at the last stage, you will be asked to add yourself (the current user) to the input group. This might be necessary for some waybar functionalities.

If you are running in a VM and/or selected dot file install option, you will be asked more configuration options like:

- Select keyboard Layout
- Set Monitor resolution
- Set time format
- Keep/disable rainbow border animation.

These are shown in the screenshot below.

[![Preset dot file installtion asks several set up queries to fine tune the installation](https://itsfoss.com/content/images/2024/10/4-disable-rainbow-borders.png)](https://itsfoss.com/content/images/2024/10/4-disable-rainbow-borders.png)

Preset Dot Files

It also provides an option to download more wallpapers, but the size is greater than 600 MB.

Once all queries are answered properly, it will set the configuration accordingly.

Reboot the system.

When the system is rebooted, select the Hyprland session and Log in using your password.

[![Select the Hyprland session and login using the user credentials](https://itsfoss.com/content/images/2024/10/login-to-hyprland.png)](https://itsfoss.com/content/images/2024/10/login-to-hyprland.png)

You will be logged into the Hyprland desktop session.

[![Running the Hyprland session in Ubuntu](https://itsfoss.com/content/images/2024/10/hyprland-in-ubuntu.webp)](https://itsfoss.com/content/images/2024/10/hyprland-in-ubuntu.webp)

---

## Installing Hyprland in other Distributions

Hyprland is available in the repos of many other Linux distributions like openSUSE, Fedora, etc. The basic installation can be performed on these devices using:

- In Fedora,

```sh
sudo dnf install hyprland
```

There is also [<FontIcon icon="fas fa-globe"/>a COPR repository](https://copr.fedorainfracloud.org/coprs/solopasha/hyprland) for Fedora users for more updates.

- In openSUSE

```sh
sudo zypper in hyprland
```

You can read the [<FontIcon icon="fas fa-globe"/>official detailed installation manual](https://wiki.hyprland.org/Getting-Started/Installation/) for other distribution.

I'll be covering the waybar configuration and Hyprland customization tips in future articles. Stay tuned and [subscribe to our FOSS Weekly newsletter](https://itsfoss.com/newsletter/) so that you don't miss them.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Installing the Much Hyped Hyprland on Linux",
  "desc": "Let's get on the ”hyp” wagon by installing Hyprland on your Linux system.",
  "link": "https://chanhi2000.github.io/bookshelf/itsfoss.com/install-hyprland.html",
  "logo": "https://itsfoss.com/content/images/size/w256h256/2022/12/android-chrome-192x192.png",
  "background": "rgba(53,121,127,0.2)"
}
```
