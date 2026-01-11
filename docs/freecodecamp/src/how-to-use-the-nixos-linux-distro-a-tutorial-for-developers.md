---
lang: en-US
title: "How to Use the NixOS Linux Distro – A Tutorial for Developers"
description: "Article(s) > How to Use the NixOS Linux Distro – A Tutorial for Developers"
icon: iconfont icon-nixos
category:
  - DevOps
  - Linux
  - NixOS
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - linux
  - nix
  - nixos
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Use the NixOS Linux Distro – A Tutorial for Developers"
    - property: og:description
      content: "How to Use the NixOS Linux Distro – A Tutorial for Developers"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-the-nixos-linux-distro-a-tutorial-for-developers.html
prev: /devops/linux-nixos/articles/README.md
date: 2026-01-15
isOriginal: false
author:
  - name: Rajdeep Singh
    url : https://freecodecamp.org/news/author/officialrajdeepsingh/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1768330530946/99ecef9a-4654-4281-9443-2039455c121e.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "NixOS > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/linux-nixos/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Use the NixOS Linux Distro – A Tutorial for Developers"
  desc="NixOS is a Linux distribution based on the Nix package manager and the Nix language. It’s first stable release was in 2013, and it uses a declarative, reproducible system configuration that allows atomic upgrades and rollbacks. The Nix language is a ..."
  url="https://freecodecamp.org/news/how-to-use-the-nixos-linux-distro-a-tutorial-for-developers"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1768330530946/99ecef9a-4654-4281-9443-2039455c121e.png"/>

NixOS is a Linux distribution based on the Nix package manager and the Nix language. It’s first stable release was in 2013, and it uses a declarative, reproducible system configuration that allows atomic upgrades and rollbacks.

The Nix language is a specialized, purely functional programming language. It’s used by the Nix package manager to build packages and the NixOS operating system for declarative system configuration and software packaging.

Unlike traditional Linux distributions, NixOS utilizes the Nix programming language to describe the entire system, including packages, services, users, networking, and even the bootloader – all of which are defined through a declarative configuration. This approach enables NixOS to generate complete system profiles, allowing for reproducible deployments, atomic upgrades, and easier system rollbacks.

In simpler terms, in NixOS, you can configure your programs, services, and users, and install new system-wide packages or applications directly within the <VPIcon icon="iconfont icon-nixos"/>`configuration.nix` file – which you can then share directly with others.

Also, if anything goes wrong with your current NixOS generation during the system build time, you can roll back to a previous NixOS generation (after switching to a new generation – more on this below).

![NixOS - what it is, and what it is not](https://cdn.hashnode.com/res/hashnode/image/upload/v1768044273038/62862f39-0706-4611-8a91-0b3ab2839a02.png)

In this tutorial, I’ll explain in detail what NixOS is, how it works, its benefits, and how to set it up on your machine or laptop in a beginner-friendly way.

::: note Prerequisites

To work with NixOS and the Nix package manager, there are no specific prerequisites if you have at least a couple years of experience with Ubuntu, Debian, or any other distribution. Having some basic knowledge of the Nix language is a plus.

:::

---

## What is a Declarative Configuration?

In the declarative approach, we use a file (such as a YAML, JSON, or Nix) to describe the configuration for hardware and software components, such as systems, networking, users, boot loader, services (like with systems), and more, in one file.

NixOS uses the <VPIcon icon="iconfont icon-nixos"/>`configuration.nix` file for its declarative configuration. By default, the <VPIcon icon="iconfont icon-nixos"/>`configuration.nix` file looks like this:

```nix :collapsed-lines title="/etc/nixos/configuration.nix"
{ config, pkgs, ... }:
{

  imports = [
      ./hardware-configuration.nix
   ];

  boot.loader.systemd-boot.enable = true;
  boot.loader.efi.canTouchEfiVariables = true;

  networking.hostName = "nixos"; # Define your hostname.

  # Enable networking
  networking.networkmanager.enable = true;

  # Set your time zone.
  time.timeZone = "Asia/Kolkata";

  # Select internationalisation properties.
  i18n.defaultLocale = "en_IN";

  i18n.extraLocaleSettings = {
    LC_ADDRESS = "en_IN";
    LC_IDENTIFICATION = "en_IN";
    LC_MEASUREMENT = "en_IN";
    LC_MONETARY = "en_IN";
    LC_NAME = "en_IN";
    LC_NUMERIC = "en_IN";
    LC_PAPER = "en_IN";
    LC_TELEPHONE = "en_IN";
    LC_TIME = "en_IN";
  };

  # Enable the X11 windowing system.
  services.xserver.enable = true;

  # Enable the GNOME Desktop Environment.
  services.xserver.displayManager.gdm.enable = true;
  services.xserver.desktopManager.gnome.enable = true;

  # remove preinstall or  unused package in gnome
  environment.gnome.excludePackages = with pkgs; [ gnome-tour gnome.gnome-music nixos-render-docs  ];
  services.xserver.excludePackages = with  pkgs; [ xterm ];

  # Configure keymap in X11
  services.xserver.xkb = {
    layout = "us";
    variant = "";
  };

  # Enable sound with pipewire.
  sound.enable = true;
  hardware.pulseaudio.enable = false;
  security.rtkit.enable = true;
  services.pipewire = {
    enable = true;
    alsa.enable = true;
    alsa.support32Bit = true;
    pulse.enable = true;
  };

  # Define a user account. Don't forget to set a password with ‘passwd’.
  users.users.officialrajdeepsingh = {
    isNormalUser = true;
    description = "officialrajdeepsingh";
    extraGroups = [ "networkmanager" "wheel" "docker" ];
    packages = with pkgs; [
      google-chrome
    ];
  };

  # Enable automatic login for the user.
  services.xserver.displayManager.autoLogin.enable = true;
  services.xserver.displayManager.autoLogin.user = "officialrajdeepsingh";

  # Workaround for GNOME autologin: https://github.com/NixOS/nixpkgs/issues/103746#issuecomment-945091229
  systemd.services."getty@tty1".enable = false;
  systemd.services."autovt@tty1".enable = false;


  services.openssh = {
      enable = true;
      settings = {
        PasswordAuthentication = true;
      };
  };
  system.stateVersion = "23.05"; # Did you read the comment?
}
```

You can edit the configuration.nix file to easily enable NGINX and Git using NixOS options. NixOS options let you choose whether to turn features on or off and configure how they should work.

```nix title="/etc/nixos/configuration.nix"
services.nginx.enable = true;
programs.git.enable = true;

....
```

Every time you modify the <VPIcon icon="iconfont icon-nixos"/>`configuration.nix` file to apply changes to NixOS, you’ll need to build your NixOS using the following command:

```sh
sudo nixos-rebuild switch
```

The `nixos-rebuild` command generates a new NixOS generation based on your configuration file. This **generation** is a complete, immutable snapshot of your system's configuration (packages, services, settings) that’s created every time you run that `nixos-rebuild` command.

The switch flag helps to build and activate the new generation at the same time, and make it the default boot in NixOS.

![NixOS generation list](https://cdn.hashnode.com/res/hashnode/image/upload/v1768129947654/a21a336e-277e-4566-8b69-d4574ef86c27.png)

After a system update, if the new generation isn’t desirable, you can roll back or switch to a previous generation using the `nixos-rebuild switch --rollback` command. For example, if I’m currently on generation 22, which is the default boot, and I don't like this generation, I can use the `rollback` flag to switch back to generation 21 in NixOS.

The NixOS rollback feature helps you test new functions and features to see if they work properly when you install new applications or programs on NixOS.

### Why is the Declarative Approach (Declarative Configuration) used in NixOS?

The Declarative Approach is particularly useful because it allows you to share your NixOS configuration file with other developers using GitHub and GitLab. By using the <VPIcon icon="iconfont icon-nixos"/>`configuration.nix` file, other developers can build the same system or machine (making it reproducible).

This approach also helps you manage configurations because all your settings are in one place, making it easy to adjust them at any time.

### What Are Reproducible Systems?

This concept of reproducibility is important. In NixOS, we can achieve reproducibility using the <VPIcon icon="iconfont icon-nixos"/>`configuration.nix` file. For example, when two developers use the same NixOS configuration file on their machines, they can achieve highly reproducible and consistent system setups.

This is one feature that makes NixOS so useful for developers, teams, CI/CD, servers, and DevOps. With NixOS, you can avoid the common issue of "it doesn't work on my machine."

---

## How Does NixOS Work?

NixOS works differently compared to traditional Linux distributions. In traditional Linux distros, such as Ubuntu and Debian, you can use the apt command to install a new application or program in your distro, like this:

```sh
sudo apt install git # Install git package
sudo apt install nodejs # Install node.js package
sudo apt install npm  # Install NPM package
```

But as we discussed above, NixOS uses a declarative configuration approach that’s immutable, reproducible, and portable.

This means that you can’t install any packages or programs like Git, Chrome, Firefox, Node, Deno, Bun, and so on using the apt, dkpg, or pacman commands (as NixOS uses its own package manager, Nix).

Instead, you edit the <VPIcon icon="iconfont icon-nixos"/>`configuration.nix` file and mention your package and program, such as Node.js, NGINX, or Git in the file and rebuild your NixOS using the nixos-rebuild command.

```nix title="/etc/nixos/configuration.nix"
services.nginx.enable = true;
programs.git.enable = true;

environment.systemPackages = [
  pkgs.nodejs_24
];
```

Again, this creates a new generation every time you modify the NixOS configuration and run the `nixos-rebuild` command in your system.

To understand in more detail how NixOS works, check out this [<VPIcon icon="iconfont icon-nixos"/>more in-depth tutorial](https://nixos.org/guides/how-nix-works/).

---

## What Are the Benefits of Using NixOS?

There are many benefits to using NixOS over a traditional distro, some of which I’ve already mentioned. Let’s summarize them here:

1. **Declarative configuration**: All settings for your system, including programs, applications, and services, are written in a single configuration file rather than being installed manually.
2. **Instant rollbacks**: There's no need to worry about breaking your system. If something goes wrong during an update, you can easily revert to the previous version.
3. **Safe updates**: Updates either complete successfully or don’t apply at all, ensuring your system never ends up in a half-broken state.
4. **Reproducible systems**: With the same configuration, you can recreate the same system every time, eliminating issues like "it doesn’t work on my machine."
5. **No dependency conflicts**: Multiple versions of applications can coexist without issues, allowing different programs such as Node.js and Python to operate together seamlessly.
6. **Extensive package ecosystem**: The Nix Packages collection comprises thousands of up-to-date packages maintained by the NixOS community.
7. **Setting up a new machine**: Copy your configuration file, rebuild the system, and complete the setup in just a few minutes, whether for a laptop or a server.
8. **Immutable system**: The design of an immutable system keeps core system paths unchanged. This prevents accidental alterations and enhances reliability, as core components become read-only and cannot be modified after the initial build.

---

## When Would NixOS Not Be the Best Choice?

There are various situations where NixOS may not be the best choice for you. Here are some of the main issues:

1. NixOS has a steep learning curve, particularly for beginner and intermediate developers.
2. It doesn’t offer a simple one-click installation solution for applications and programs on your machine or laptop.
3. You can’t install system-wide applications or programs without editing the NixOS configuration files and rebuilding the system.
4. NixOS lacks a larger community and readily available tutorials compared to Ubuntu, and its documentation is not very beginner-friendly – so you may need to rely on your own resources.

---

## How to Set Up NixOS and the Nix Package Manager on Your Laptop

Now we’re ready to dive in and set up NixOS. But what you need to install depends on your operating system:

- On macOS or Windows, you’ll install Nix, the package manager. This lets you use Nix to install and manage software on your existing operating system. You **don’t** install NixOS itself on macOS or Windows.
- On Linux, installing NixOS means installing a new OS (it’s like installing Ubuntu or Debian).

Because NixOS is a full operating system, you’ll need to install it on a fresh machine or partition, which will typically erase existing data during installation unless you set up dual-booting.

And remember, while NixOS is a Linux distribution, it works differently (than Ubuntu or Debian, for example) because the entire system is configured declaratively using Nix.

### Install Nix Package Manager

The following command helps you to install the Nix language and the Nix Package Manager on macOS and Windows (via WSL).

```sh
# Windows: Multi-user installation (recommended)
sh <(curl --proto '=https' --tlsv1.2 -L https://nixos.org/nix/install) --daemon

# Windows: Single-user installation
sh <(curl --proto '=https' --tlsv1.2 -L https://nixos.org/nix/install) --no-daemon

# MacOS:
sh <(curl --proto '=https' --tlsv1.2 -L https://nixos.org/nix/install)
```

If you’re a newcomer, before running the command I recommend [<VPIcon icon="iconfont icon-nixos"/>watching this tutorial on YouTube](https://nixos.org/download/#nix-install-macos) and checking out the official documentation.

### Install NixOS

You can install the NixOS distro with a Linux command. Before proceeding, make sure you meet the following requirements:

- A USB drive (8 GB or more)
- A second computer (to create the USB)
- A backup of your data (installation can erase the disk)
- An internet connection (Wi-Fi or Ethernet)

There are multiple steps for installing NixOS on your machine or laptop. You can check out the following tutorial, which describes in detail how you can install NixOS on your machine very easily.

<VidStack src="youtube/N39_cg8QyT4" />

---

## How to Install a Package in NixOS

NixOS has a large registry of active packages, with 120,000 packages available. Every package you install from the stable channel is built reproducibly and reviewed by the Nix community, so you shouldn’t encounter any issues.

Installing a new package on NixOS using the Nix Package Manager is quite simple. First, visit the [<VPIcon icon="iconfont icon-nixos"/>NixOS Packages Search](https://search.nixos.org/packages) site.

![Search package on NixOS packages website](https://cdn.hashnode.com/res/hashnode/image/upload/v1767107353823/ae26031b-5395-4e36-87ed-d7b4cdd2be9f.png)

Then just search for the package that you’re looking for. In our case, we’ll search for Neovim – and then just type the package name in the search input and hit enter.

![Search for neovim on the packages website](https://cdn.hashnode.com/res/hashnode/image/upload/v1768142068118/34333980-65ae-4231-a7a2-9919e3135bcd.png)

Copy the resulting code it shows, and paste it into your <VPIcon icon="iconfont icon-nixos"/>`configuration.nix` file:

```nix title="/etc/nixos/configuration.nix"
environment.systemPackages = [
  pkgs.neovim # add inside file.
];
```

Then rebuild your NixOS using the `sudo nixos-rebuild switch` command. Remember that you’ll need to do this whenever you make changes to the <VPIcon icon="iconfont icon-nixos"/>`configuration.nix` file.

::: tip Demo (How to Install Neovim in NixOS)

![Screenshot of a text editor displaying a configuration file with commented instructions and settings for installing software packages like Firefox on a system. The interface includes options such as Exit, Save, and Execute at the bottom. Copyright by Low Orbit Flux](https://cdn.hashnode.com/res/hashnode/image/upload/v1768146169478/d941876f-abf0-49f6-b1cc-182c608c094e.gif)

<VidStack src="youtube/wFP9CbaeMe0" />

---

## FAQ

::: details Is NixOS only for advanced users?

No, NixOS can be a great fit for anyone. Due to its steeper learning curve, beginners may struggle at first – but once you understand it, I bet you’ll love it.

:::

::: details Why is the Nix language so weird?

Nix is purely functional and is designed for reproducible builds. It’s not a general-purpose language and is rather a configuration language. You’ll only need 10–15% of the language for daily use.

:::

::: details How is NixOS different from Ubuntu / Arch?

Let’s compare some important NixOS features with other distros:

| Feature | Ubuntu / Arch | NixOS |
| --- | --- | --- |
| Install apps | Manual | Declarative |
| Rollbacks | No | Yes |
| System config | Spread everywhere | One file |
| Reproducibility | Hard | Built-in |
| Learning curve | Low | High |

:::

::: details Can I use NixOS for development?

Yes, NixOS is an excellent distro for:

- Frontend development (Node, Bun, Deno)
- Backend development (Go, Rust, Python)
- Consistent development environments across machines
- CI/CD reproducibility

::: details Is NixOS good for daily use?

Yes – NixOS has an initial learning phase that can be difficult, but once you get past it, you can use NixOS on your work laptops, servers, home PCs, and development machines.

::: details Should I learn NixOS as a beginner developer?

To be honest, if you want quick results, NixOS may not be for you. But if you're aiming for long-term mastery, you will definitely like NixOS.

::: details Does NixOS work on macOS and Windows?

Yes, you can use Nix and the Nix Package Manager on macOS and Windows, and they work well. You can install and package software using the Nix configuration file as mentioned in this tutorial.

:::

---

## Conclusion

I think that NixOS is the best Linux distro – but it’s not super beginner-friendly. Still, I prefer it because it’s a powerful and reliable distro that’s designed for users who value control, reproducibility, and safety.

Managing the entire system through declarative configuration enables consistent setups, safe upgrades, and easy rollbacks. This makes it especially suitable for developers, DevOps engineers, and infrastructure-focused teams.

Just keep in mind that NixOS is not for everyone. Its learning curve and configuration-driven workflow can be steep for beginners, casual users, or those who want quick, click-and-install convenience. So check it out and decide if it’s right for you and your team.

To Learn more beginner tutorials on NixOS, check out [the NixOS (<VPIcon icon="fa-brands fa-medium" />`thenixos) publication on Medium.

<SiteInfo
  name="The NixOS"
  desc="The NixOS publication is a place to share and explore NixOS, Nix, and the Nix Package Manager."
  url="https://medium.com/thenixos/"
  logo="https://miro.medium.com/v2/5d8de952517e8160e40ef9841c781cdc14a5db313057fa3c3de41c6f5b494b19"
  preview="https://miro.medium.com/v2/resize:fit:500/1*ye7WHUDBuVUf_oxT_XT45A.png"/>

<SiteInfo
  name="What is Declarative Configuration in NixOS? Understanding Declarative vs Imperative Approaches?"
  desc="Comparing Declarative and Imperative distros in Linux."
  url="https://medium.com/thenixos/what-is-declarative-configuration-in-nixos-understanding-declarative-vs-imperative-approaches-d24d4d144df6/"
  logo="https://miro.medium.com/v2/5d8de952517e8160e40ef9841c781cdc14a5db313057fa3c3de41c6f5b494b19"
  preview="https://miro.medium.com/v2/resize:fit:1200/1*1EsR43bZeDFSFojDEz8siA.png"/>

<SiteInfo
  name="Understand the difference between Home Manager vs Nix Flake in NixOS?"
  desc="Essentials Guide about Home Manager and Nix Flake."
  url="https://medium.com/thenixos/understand-the-difference-between-home-manager-vs-nix-flake-in-nixos-0511dc8c1a93/"
  logo="https://miro.medium.com/v2/5d8de952517e8160e40ef9841c781cdc14a5db313057fa3c3de41c6f5b494b19"
  preview="https://miro.medium.com/v2/resize:fit:1200/1*wJwL2p_G4MaTCBBlK_V49w.png"/>

<SiteInfo
  name="Why did I choose NixOS, and what are the advantages and disadvantages of using NixOS?"
  desc="Understand why NixOS is not for beginners."
  url="https://medium.com/thenixos/why-did-i-choose-nixos-and-what-are-the-advantages-and-disadvantages-of-using-nixos-afaaf95f7d8e/"
  logo="https://miro.medium.com/v2/5d8de952517e8160e40ef9841c781cdc14a5db313057fa3c3de41c6f5b494b19"
  preview="https://miro.medium.com/v2/resize:fit:1200/1*5bLQ5un9K9bVCaeAYDYPTA.png"/>

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Use the NixOS Linux Distro – A Tutorial for Developers",
  "desc": "NixOS is a Linux distribution based on the Nix package manager and the Nix language. It’s first stable release was in 2013, and it uses a declarative, reproducible system configuration that allows atomic upgrades and rollbacks. The Nix language is a ...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-the-nixos-linux-distro-a-tutorial-for-developers.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
