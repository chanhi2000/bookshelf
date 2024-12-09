---
lang: en-US
title: "Beginner's Guide to Install and Use Conky in Ubuntu Linux"
description: "Article(s) > Beginner's Guide to Install and Use Conky in Ubuntu Linux"
icon: fa-brands fa-ubuntu
category:
  - Linux
  - Debian
  - Ubuntu
  - Article(s)
tag:
  - blog
  - itsfoss.com
  - linux
  - debain
  - ubuntu
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Beginner's Guide to Install and Use Conky in Ubuntu Linux"
    - property: og:description
      content: "Beginner's Guide to Install and Use Conky in Ubuntu Linux"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/itsfoss.com/conky-gui-ubuntu-1304.html
prev: /devops/linux-debian/articles/README.md
date: 2013-07-28
isOriginal: false
author: Abhishek Prakash
cover: https://itsfoss.com/content/images/2024/11/conky.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Linux - Debian > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/linux-debian/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Beginner's Guide to Install and Use Conky in Ubuntu Linux"
  desc="Learn all the essentials about using Conky to customize and beautify your Linux desktop."
  url="https://itsfoss.com/conky-gui-ubuntu-1304"
  logo="https://itsfoss.com/content/images/size/w256h256/2022/12/android-chrome-192x192.png"
  preview="https://itsfoss.com/content/images/2024/11/conky.png"/>

You might have seen such a screenshot of a Linux desktop in various discussion forums.

![An example of Conky script, [shared by Mustafa (<FontIcon icon="iconfont icon-github"/>`mustafaozhan/GoogleIntegratedSystemConky`)](https://github.com/mustafaozhan/GoogleIntegratedSystemConky)](https://itsfoss.com/content/images/2024/11/conky-example.png)

And you may wonder how did the other guy displayed CPU, memory and other information on the desktop. The answer lies in one word: Conky.

In this tutorial, I'll tell you about:

- What is Conky?
- Using Conky easily with Conky Manager
- Taking the difficult route of command line to use Conky on any Linux system

Excited? Let's begin.

---

## What is Conky?

[<FontIcon icon="fas fa-globe"/>Conky](http://conky.sourceforge.net/) is a lightweight [system monitor](/itsfoss.com/linux-system-monitoring-tools.md) available on Linux and BSD. It can display the system information and statistics such as CPU consumption, disk usage, RAM utilization, network speed, etc. in an elegant way. All the information is displayed on top of your wallpaper. It gives your desktop a live wallpaper feel.

The looks of the displayed information can be changed via Conky configuration file. For example, take a look at this 'hacker themed Conky':

![HaxOS Conky: [<FontIcon icon="fas fa-globe"/>Image Source](https://deviantart.com/daviddavioblue/art/haxOS-Conky-454353060)](https://itsfoss.com/content/images/2024/11/conky-example.jpg)

The problem with Conky is that it is more of a text-based application. Which means you have to change its configuration file to tweak the display.

Conky is extremely configurable, and you can change every aspect of it by modifying its configuration file. But the complex way of installing and configuring Conky usually scares away the Linux beginners.

Don’t worry! You can still use Conky easily thanks to a GUI tool called Conky Manager. I’ll show you both GUI and command line way of installing Conky themes.

---

## Easier Method: Use Conky with Conky Manager GUI tool

[Conky Manager 2](https://github.com/zcot/conky-manager2) is a GUI tool you can use to install, manage Conky themes on your system.

::: note 📋

The original Conky-Manager project was developed by Tony George, who has given us friendly tools like [Aptik](/itsfoss.com/restore-apps-ppa-ubuntu-aptik.md) and [Timeshift to backup Linux install](/itsfoss.com/backup-restore-linux-timeshift.md). The product was abandoned but has been forked into another project. Interestingly, the new version is available from Tony's PPA.

:::

### Install Conky Manager in Ubuntu and other Ubuntu-based distributions

You can install Conky Manager version 2.7 using PPA. Use the following commands in terminal:

```sh
sudo add-apt-repository ppa:teejee2008/foss
sudo apt update
sudo apt install conky-manager2 conky-all
```

I see that the older Conky Manager (version 2.3) is available in Arch and Fedora repositrories.

You can install Conky Manager in [Arch Linux from Extra repository](/itsfoss.com/arch-linux-repos.md):

```sh
sudo pacman -S conky-manager
```

And in Fedora with:

```sh
sudo dnf install conky-manager
```

### Using Conky with Conky Manager

Once installed, you can start Conky Manager from the menu.

![Open the Conky Manager 2 app from Ubuntu Activities Over view.](https://itsfoss.com/content/images/2024/11/open-conky-manager-2-from-activities-overview.png)

Open Conky Manager 2

As I said before, using Conky Manager is like using a wallpaper application.

### Change Conky theme

Conky Manager comes with several predefined sets of Conky themes.

Using them is easy. All you got to do is to **select a theme and check the “enable” box in front of it**, and it will be displayed on your desktop immediately.

Alternatively, you can also preview a Conky which opens up in a bottom panel to show the look of the selected Conky.

[![Conky Manager app home screen. Click on Preview to get the preview of a Conky theme without applying it to your desktop.](https://itsfoss.com/content/images/2024/11/conky-manager-home-screen.png)](https://itsfoss.com/content/images/2024/11/conky-manager-home-screen.png)

::: tip 💡

You can have multiple Conky running at the same time

:::

![Multiple Conky on the same system](https://itsfoss.com/content/images/2024/11/conky-desktop.webp)

### Edit a Conky in Conky Manager

You can change the alignment, transparency, size, time, etc. of the displayed Conky theme and/or its widget.

This is important as most of the themes have predefined settings which might not be suitable for all. So if you want the Conky to be displayed at the center rather than on the right side of the screen, you can do that here.

Click on a Conky theme you want to change. Now, click on the Widget settings button in the toolbar as shown in the screenshot below.

![Select a theme and use the edit button to edit the theme's effects.](https://itsfoss.com/content/images/2024/11/edit-a-conky-effects-in-conky-manager-2.png)

### Using additional options to autostart Conky

You may want to start the Conky automatically at startup time so that you won't need to run Conky Manager manually each time.

To do this, click on the settings button on the right side of the toolbar. Here toggle the “**Run Conky at system startup**” box.

![Autostart Conky using the respective toggle button in Conky manager settings.](https://itsfoss.com/content/images/2024/11/autostart-conky.png)

### Importing new Conky files

Conky Manager comes with several default Conky themes. What if you want more Conkys? Conky Manager 2 gives you the option of importing other Conky themes in it. You can import themes in .7z, .cmtp, .zip, etc.

::: caution 🚧

Not all external Conky themes would work flawlessly. Remove them if they don't suit you.

:::

Popular art sites like DeviantArt provides Conky configurations. You can find Conky files, that can be imported using Conky Manager.

<SiteInfo
  name="Smooth information updated conky. Conky Manager by speedracker on DeviantArt"
  desc="Download such a Conky theme archive file"
  url="https://deviantart.com/speedracker/art/Smooth-information-updated-conky-Conky-Manager-506340482/"
  logo="https://st.deviantart.net/eclipse/icons/favicon-v2-32x32.png"
  preview="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/i/16f945b3-63f7-4556-8e2f-efe40d25e661/d8dgmte-b522e65a-a636-47b1-926f-03e4d95731b7.png/v1/fill/w_1192,h_670,q_70,strp/smooth_information_updated_conky__conky_manager_by_speedracker_d8dgmte-pre.jpg"/>

Now, in the Conky Manager, click on the “Import Conky Manager Theme Pack” button.

![Click on “Import Theme Pack” button. You can find this in the main toolbar of Conky Manager application.](https://itsfoss.com/content/images/2024/11/import-a-conky-theme.png)

From the file chooser, select the downloaded archive file. Once completed, it will show you a success message.

![If theme import is successful, you will get a dialog box mentioning the import is a success.](https://itsfoss.com/content/images/2024/11/conky-manager-import-successful.png)

Now, the new theme will also appear in the Conky Manager home screen for you to enable.

### Generate a preview of the custom theme

::: caution 🚧

This may not work all the time.

:::

Conky Manager 2 provides a way to generate a preview image for the downloaded custom Conky theme. For this, click on the custom theme appearing in Conky Manager home page.

Now, click on the “Generate Preview” button on the toolbar.

![After selecting the custom theme, click on the Generate preview button in the toolbar of Conky Manager.](https://itsfoss.com/content/images/2024/11/generate-a-preview-image-for-a-custom-conky.png)

You can see a preview is generated in the bottom preview bar.

![A preview is generated for a third-party Conky theme in Conky Manager 2 Application.](https://itsfoss.com/content/images/2024/11/preview-generated-for-selected-custom-theme-conky.png)

---

## Advanced Method: Use Conky in command line

I am going to assume that you are [familiar with basic Linux commands](/itsfoss.com/linux-terminal-basics.md) such as copying files and changing directories for this part of Conky tutorial.

Let’s first install Conky in your system. Most Linux distributions have the `conky-all` package. You can use this package to install Conky and other packages that many Conky scripts use.

In Debian and Ubuntu-based systems, use the command below:

```sh
sudo apt install conky-all
```

Once you have installed this package, you can run the Conky using the following command:

```sh
conky
```

It will display the default Conky installed with the above-mentioned package. The default config file is located in <FontIcon icon="fas fa-folder-open"/>`/etc/conky` directory. Conky actually relies on the config file <FontIcon icon="fas fa-file-lines"/>`.conkyrc` located in the home directory. If there is no such file in the system, it uses the <FontIcon icon="fas fa-folder-open"/>`/etc/conky/`<FontIcon icon="fas fa-file-lines"/>`conky.config` file.

And as you may see, it might not be the best-looking or well-integrated Conky for your system.

![Default Conky is not the best one, obviously](https://itsfoss.com/content/images/2024/11/default-conky-view-in-ubuntu.png)

So, what’s the solution, then? Well, you have two options. Either you modify the Conky on your own, or you download a Conky theme from the internet and use it.

To modify the Conky on your own, you need to know a thing or two about the Conky settings.

### Where can you find Conky themes? How do you use different types of Conky themes?

This is not something that can be easily answered. You can search for the term Conky on [<FontIcon icon="fas fa-globe"/>DeviantArt](https://deviantart.com/) or [<FontIcon icon="fas fa-globe"/>OpenDesktop](https://opendesktop.org/search?projectSearchText=conky). You can also search on GitHub.

::: caution 🚧

Most of the Conky themes are created by hobbyists and at times these will be outdated. You may be able to tweak it to your need , but if you are looking for something plug and play, not every Conky theme will do that.

:::

Using these Conky themes is similar to using [source code installation](/itsfoss.com/install-software-from-source-code.md). A good Conky theme will come with a README or other help file that tells you what to change in the Conky theme files and other important things about using the Conky theme. Most of the time you have to change the path to image files or Lua script.

Some Conky themes don’t have any instructions, and you have to manually explore what needs to be changed in the Lua script or Conky configuration files.

Most of the Conky themes will come in the following formats:

- Just a single file named `conkyrc` or `conky.conf` or something similar
- Complete package for Conky Manager: Simply import it into Conky Manager.
- Conky package with Lua scripts, wallpapers, etc.
- Shell script or make install: should have a README file to help you out.

Let’s discuss the two of the common kinds with examples.

### Example 1: Install qclocktwo Conky to display time in words

Go to DeviantArt and [<FontIcon icon="fas fa-globe"/>download the qclocktwo Conky](https://mowgli-writes.deviantart.com/art/qlocktwo-conky-470067388). Extract the downloaded file and you’ll see a file named `qclocktwo`.

![Extract the downloaded "qclocktwo" archive file using Nautilus file manager right-click menu.](https://itsfoss.com/content/images/2024/11/extract-the-downloaded-conky-qclocktwo-archive-file.png)

Extract Downloaded Conky

Now you have two options to run this Conky. Either you use a command like this:

```sh
conky -c ~/Downloads/qclocktwo
```

Or you rename the file `qclocktwo` to <FontIcon icon="fas fa-file-lines"/>`.conkyrc` and move it to the home directory, i.e., `~/`. This way, when you run the command `conky`, the `qclocktwo` Conky will be run.

The problem with the second approach is that if you ever use another Conky by renaming it to <FontIcon icon="fas fa-file-lines"/>`.conkyrc`, you’ll lose the previous Conky.

In either case, you’ll see a beautiful Conky theme displaying time in the following fashion:

![The "qclocktwo" Conky is shown in the desktop.](https://itsfoss.com/content/images/2024/11/conky-with-qclocktwo-config.png)

### Example 2: Install Conky with Lua script

You’ll find many Conky themes that have their own wallpapers, images along with a Lua file and Conky configuration file.

Using [Lua scripts (<FontIcon icon="iconfont icon-github"/>`brndnmtthws/conky`)](https://github.com/brndnmtthws/conky/wiki/Using-Lua-scripts-in-conky:-How-does-a-lua-script-work), Conky themes can create some graphics (if I can call it that) such as rings, clocks etc. This further enhances the capability of Conky where you see the system information with more animated elements.

Let’s see it with an example. Download the [<FontIcon icon="fas fa-globe"/>Kit-Kat Conky](https://etlesteam.deviantart.com/art/Conky-KIT-KAT-583590943). After extracting the downloaded files, you’ll see that there is a `conkyrc` file and a Lua file under the `scripts` folder.

The main thing to look for here is the path to the lua file in the Conky configuration file. So if you open the `conkyrc_Kit-kat` file, you’ll see that the path in `lua_load` expects the lua file to be in the location <FontIcon icon="fas fa-folder-open"/>`~/.conky/Kit-Kat/scripts/lua`.

![The "lua_load" line in the Conky lua script, opened in GNOME Text Editor.](https://itsfoss.com/content/images/2024/11/location-of-the-lua-script-points-to-kitkat-config-conky.png)

`lua_load` location in Config file

You have two options here. Either you copy the entire Kit-Kat folder to the <FontIcon icon="fas fa-folder-open"/>`~/.conky` directory, or you change the Conky configuration file and set the path to the current location of the Lua script file. It is always better to put the files in <FontIcon icon="fas fa-folder-open"/>`~/.conky` to avoid unnecessary troubles.

Once you have done one of the above two things, you need to use the `conky` command with the path to the config file of Kit-Kat Conky.

```sh
conky -c .conky/Kit-Kat/conkyrc_Kit-Kat
```

And then you’ll see an analog clock ticking in the top-right corner of your desktop.

![Conky with Kit-Kat widget. Showing a digital clock at the top-right of the desktop.](https://itsfoss.com/content/images/2024/11/conky-kitkat-config-look-in-desktop.png)

---

## Few things to keep in mind about Conky

Before you start experimenting with Conky, here are a few more things you should know:

- Most Conky themes on the internet are outdated. Be prepared to be disappointed when you see issues after issues in the Conky.
- You can have more than one Conky in use at the same time. Just use the Conky command in the following fashion: `conky -c path_to_conky_1 path_to_conky_2`.
- You can also [set Conky commands to run them at startup](/itsfoss.com/manage-startup-applications-ubuntu.md).

---

## Enjoy Conky

Here are a couple of Conky themes I liked.

![[<FontIcon icon="fas fa-globe"/>Grey Minimalistic](https://deviantart.com/bryantlloyd/art/Grey-Minimalistic-634726564): Manual install possible. (Works in Ubuntu)](https://itsfoss.com/content/images/2024/11/grey-minimalist-conky.png)

![[<FontIcon icon="fas fa-globe"/>Smooth Information](https://deviantart.com/speedracker/art/Smooth-information-updated-conky-Conky-Manager-506340482): Use it via Conky Manager. (Works in Ubuntu)](https://itsfoss.com/content/images/2024/11/smooth-information-updated-conky.png)

Overall, I found Conky Manager easy to use and quite useful. It has some nice Conkys to start with. It is a nice app for beginners to use Conky in GUI. What do you say? Do you like it? Let me know of your views.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Beginner's Guide to Install and Use Conky in Ubuntu Linux",
  "desc": "Learn all the essentials about using Conky to customize and beautify your Linux desktop.",
  "link": "https://chanhi2000.github.io/bookshelf/itsfoss.com/conky-gui-ubuntu-1304.html",
  "logo": "https://itsfoss.com/content/images/size/w256h256/2022/12/android-chrome-192x192.png",
  "background": "rgba(53,121,127,0.2)"
}
```
