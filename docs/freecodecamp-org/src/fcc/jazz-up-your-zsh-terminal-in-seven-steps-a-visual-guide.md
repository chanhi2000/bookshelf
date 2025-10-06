---
lang: en-US
title: "Jazz Up Your “ZSH” Terminal In Seven Steps - A Visual Guide"
description: "Article(s) > Jazz Up Your “ZSH” Terminal In Seven Steps - A Visual Guide"
icon: iconfont icon-shell
category:
  - Shell
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - sh
  - zsh
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Jazz Up Your “ZSH” Terminal In Seven Steps - A Visual Guide"
    - property: og:description
      content: "Jazz Up Your “ZSH” Terminal In Seven Steps - A Visual Guide"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/jazz-up-your-zsh-terminal-in-seven-steps-a-visual-guide.html
prev: /programming/sh/articles/README.md
date: 2018-03-13
isOriginal: false
author: rajaraodv
cover: https://cdn-media-1.freecodecamp.org/images/1*Sk54-oKGwIS_3BRk1S4N7A.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Shell > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/sh/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Jazz Up Your “ZSH” Terminal In Seven Steps - A Visual Guide"
  desc="By rajaraodv In this blog I’ll cover installing ITerm2, ZSH shell, “oh my ZSH”, Themes, ITerm2 color schemes, “oh my ZSH” plugins and enable “ligature” support to help create a beautiful and powerful Terminal. If you want to just make your regular B..."
  url="https://freecodecamp.org/news/jazz-up-your-zsh-terminal-in-seven-steps-a-visual-guide-e81a8fd59a38"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn-media-1.freecodecamp.org/images/1*Sk54-oKGwIS_3BRk1S4N7A.png"/>

In this blog I’ll cover installing ITerm2, ZSH shell, "oh my ZSH", Themes, ITerm2 color schemes, "oh my ZSH" plugins and enable "ligature" support to help create a beautiful and powerful Terminal.

::: note

If you want to just make your regular Bash Terminal powerful, take a look at my previous blog: "[Jazz Up Your Bash Terminal (<FontIcon icon="fa-brands fa-medium"/>`rajaraodv`)](https://medium.com/@rajaraodv/jazz-up-your-bash-terminal-a-step-by-step-guide-with-pictures-80267554cb22)". But ZSH explained in this blog is more powerful stuff.

:::

---

## Summary:

We’ll be covering a lot of things. This may be confusing, so here is the summary of what we will be doing.

1. Install ITerm2 - This is a better alternative to the default Terminal
2. Install latest ZSH shell - This is more powerful than the regular bash shell. We will switch ITerm2 to use ZSH shell.
3. Install "Oh My ZSH "- This is a CLI tool to easily configure ZSH and add themes and plugins to ZSH
4. Add two types of Themes using "Oh My ZSH" - some themes need extra steps so we will cover both
5. Install different ITerm2 Schemes - These are just color schemes for the UI
6. Add two different Plugins using "Oh My ZSH" to improve productivity
7. Enable "ligature" support so when you write an arrow **\=>**;, it appears like a real arr**o**w →

![](https://cdn-media-1.freecodecamp.org/images/1*k3akUSSgJsBjjzMkAAN9tQ.gif)

---

## Step 1 - Install ITerm2

A lot of programmers like [<FontIcon icon="fas fa-globe"/>ITerm2](https://iterm2.com) instead of the default Terminal. It is similar to the Terminal, but has lots of features of its own. It of course can run ZSH, Bash, and other shells inside it.

The following video shows some of the new features of Item 2 (v3).

::: note

For this blog we’ll use ITerm2. When I mention "Terminal", I mean ITerm2. Although the steps are the same for both Terminal or ITerm2. 

:::

---

## Step 2 - Change Shell To ZSH

The following video shows why ZSH is better than just a bash shell.

### Option 1 - Use Mac’s own ZSH

Mac comes with a ZSH out-of-the-box, so we don’t need to install it. However, sometimes it’s an older version of ZSH. Typically it’s located at /bin/zsh. To use it, all we need to do is to change shell (chsh).

::: tabs

@tab:active 1.

Open the Terminal (or ITerm2) and type the following command.

```sh
chsh -s $(which zsh)
```

@tab 2.

Enter the password and it will change the shell, upon logout and login.

@tab 3.

**Logout and re-login**

@tab 4.

To test, open the Terminal and type the following, and it should say zsh.

```sh
echo $0
#
# zsh
```

:::

### Option 2 - Install Homebrew and Install latest ZSH via Homebrew

This option is pretty common among users, because some of the plugins only work with the latest ZSH.

Homebrew, simply said, is a command line installer for all sorts of software. Let’s install that first.

::: tabs

@tab:active 1.

**Install Homebrew by running the following command.**

```sh
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

@tab 2.

If you get Command Line Tools for Xcode error, it means you haven’t installed the CLI tools for Xcode. *If you don’t get the error, you can skip this step, because you already have it installed.*

XCode Developer CLI tools are used by various apps that manipulate core OSX features. So make sure to install the Xcode CLI tools by running the following command.

```sh
xcode-select --install
```

> Note: The above command opens up Mac’s installer and installs the XCode Developer CLI tools. If it doesn’t work, try `xcode-select -r` to reset.

@tab 3.

**Install ZSH via Homebrew**

Run the following command to install ZSH. It gets installed at `/usr/local/bin/zsh` PS: Mac’s default ZSH is at `/bin/zsh`

```sh
brew install zsh
```

@tab 4.

**Use the Homebrew version of ZSH**

Run the following command. You will be prompted to enter Mac’s password.

```sh
chsh -s /usr/local/bin/zsh
```

@tab 5.

**Logout and log back in.**

@tab 6.

**Test if we are using ZSH and the correct ZSH**

```sh
echo $0
#
# zsh

which zsh
# 
# /usr/local/bin/zsh   
```

:::

---

## Step 3 - "Oh My ZSH"

![](https://cdn-media-1.freecodecamp.org/images/1*Sk54-oKGwIS_3BRk1S4N7A.png)

"Oh My ZSH" is a plugin that runs on top of ZSH. It provides default config for ZSH (`~/.zshrc` file) and also provides themes and more features.

> From what I know, most power users who use ZSH also use "Oh My ZSH".

::: tabs

@tab:active 1.

**Install "Oh My ZSH"**

Run the following command to install "oh My ZSH".

```sh
sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```

![Oh My ZSH is installed](https://cdn-media-1.freecodecamp.org/images/1*9X_r8cgGVOIwS8PiPZnS7A.png)

@tab 2.

**Close and quit ITerm2 and reopen it.**

It should look something like below. Notice that the prompt has changed and the theme is a bit different - That’s "Oh My ZSH" in action for you.

![Initial Oh My ZSH Theme](https://cdn-media-1.freecodecamp.org/images/1*8Ot5gJq4R_iCXJqlkDPGow.png)

:::

---

## Step 4 - Change Themes And Install Fonts

In this step, we’ll add two different "Oh My ZSH" Themes. "Oh My ZSH" comes with [tons of themes (<FontIcon icon="iconfont icon-github"/>`robbyrussell/oh-my-zsh`)](https://github.com/robbyrussell/oh-my-zsh/wiki/Themes).

::: note PS

But some Themes need extra steps like installing specific fonts and so on.

:::

To set a Theme, simply open `~/.zshrc` file (created by "Oh My ZSH") and change the theme as shown below.

:::  note PS

<FontIcon icon="fas fa-file-lines"/>`.zshrc` is the config file for ZSH shell. People who don’t use "Oh My ZSH" will have to manually create this file and add any configs themselves. "Oh My ZSH" automatically creates this file if it doesn’t exist and then adds its own set of configs into this file.

:::

#### Theme 1 - Let’s add a Theme called "**Avit**"

::: tabs

@tab:active 1.

Open <FontIcon icon="fas fa-file-lines"/>`.zshrc`

```sh
open ~/.zshrc
```

@tab 2.

**Change the Theme to "Avit"**

You can browse all the "Oh My ZSH" Themes [here (<FontIcon icon="iconfont icon-github"/>`robbyrussell/oh-my-zsh`)](https://github.com/robbyrussell/oh-my-zsh/wiki/Themes). To change the Theme, simply change the `ZSH_THEME` value in `~/.zshrc` file from **robbyrussell** to **Avit**.

![](https://cdn-media-1.freecodecamp.org/images/1*yzCfQpf-7oVs3SPelf1Imw.png)

@tab 3.

**Update ZSH config**

Run the following command to update the config.

```sh
source ~/.zshrc
```

![Your command prompt in Avit Theme](https://cdn-media-1.freecodecamp.org/images/1*jdA_I2AykgRqAKTRVSY3Eg.png)

@tab 4.

**Change the background color and font size**

Open ITerm2 > Preferences > Profiles > Colors and change the background black color to use 20% gray as shown below.

![Use 20% Gray background](https://cdn-media-1.freecodecamp.org/images/1*NjFS-nVNi0O8lDSoHLUleg.png)

Then open Text > Change Font and change the size to 14pt.

![Change font to 14pt](https://cdn-media-1.freecodecamp.org/images/1*8rl1Nc5oqqtd7RSjzo8K4w.png)

![A clean and beautiful Iterm2 with ZSH!](https://cdn-media-1.freecodecamp.org/images/1*CjzxD0L9jyqK0bp5zLB8lg.png)

OK, Let’s install a different Theme that needs fonts.

#### Theme 2 - Installing "agnoster" Oh My ZSH theme

This is a popular theme because it emulates the [<FontIcon icon="fas fa-globe"/>Powerline](https://powerline.readthedocs.io/en/latest/overview.html#screenshots) Python app that enhances the terminal. The following picture shows how it looks. But this theme also needs us to install Powerline themes.

![agnoster Oh My ZSH theme](https://cdn-media-1.freecodecamp.org/images/1*vLlx2GBxwk1NAOa-eLOCyw.png)

::: tabs

@tab:active 1.

**Install [Powerline fonts (<FontIcon icon="iconfont icon-github"/>`powerline/fonts`)](https://github.com/powerline/fonts.git)**

```sh
git clone https://github.com/powerline/fonts.git
cd fonts
./install.sh
```

@tab 2.

**Change the Theme to "agnoster"**

```sh
open ~/.zshrc
# Set ZSH_THEME="agnoster" and save the file
```

@tab 3.

**Quit ITerm2 and reopen it.**

@tab 4.

**Set Powerline font**

You can set any Powerline patched font you like. All the fonts end with **_"for Powerline"_**.

Open `ITerm2 > Preferences > Profiles > Text > Change Font` and set it to something that has "for Powerline". I’m choosing **_"Meslo LG DZ for Powerline"_** font.

![Meslo LG DZ for Powerline Iterm2 font](https://cdn-media-1.freecodecamp.org/images/1*S9KIZotQcq4dNoBESM0v3w.png)

:::

::: note

If you are confused about the fonts and Themes: the Themes are for "Oh My ZSH" and ZSH shell and the fonts are for the Iterm2 itself.

:::

All Done

![At this point your Terminal should look like this](https://cdn-media-1.freecodecamp.org/images/1*vLlx2GBxwk1NAOa-eLOCyw.png)

---

## Step 5 - Install iTerm2 "color schemes" (ITerm2 Themes)

There are plenty of gorgeous color schemes for iTerm2. These schemes change the foreground color, background color, cursor color, and so on. You can find them at [<FontIcon icon="iconfont icon-github"/>`mbadolato/iTerm2-Color-Schemes`](https://github.com/mbadolato/iTerm2-Color-Schemes) Github repo.

::: note

These are just color schemes of the ITerm2 UI and don’t deal with the command prompt’s look and feel like "Oh My ZSH"’s themes (other than just changing colors).

:::

Follow these steps to install them.

1. Download the [<FontIcon icon="iconfont icon-github"/>`mbadolato/iTerm2-Color-Schemes`](https://github.com/mbadolato/iTerm2-Color-Schemes) as a zip file and extract it
2. The "Schemes" folder contains all the color scheme files - they end with `.itermcolors`
3. Open `iTerm2 > Preferences > Profile > Colors > Color Presets > Import`
4. In the import window, navigate to the "Schemes" folder (from step 2)
5. Select all the files so you can import all the color schemes at once
6. Simply select whichever color scheme you like.

> My favorites are **Batman** and **Argonaut**

::: tabs

@tab:active Batman

![Batman Iterm2 Theme](https://cdn-media-1.freecodecamp.org/images/1*LHZaKiNSSp5PX0RRTS5ITw.png)

@tab Argonaut

![Argonaut color scheme](https://cdn-media-1.freecodecamp.org/images/1*yFbKJQbBwNRbtU4dFM2UVA.png)

:::

---

## Step 6 - Install Plugins

Plugins add more functionalities to your workflow. By default "Oh My ZSH" already has the "git" plugin! and that’s why you were able to see all those Git statuses in the prompts in earlier screenshots. Let’s add another one to see how it works.

::: note

In this section, we’ll install two different plugins to show how they work.

:::

### Plugin 1 - Add Syntax Highlighting Plugin

The Syntax Highlighting plugin adds beautiful colors to the commands you are typing as shown below.

![](https://cdn-media-1.freecodecamp.org/images/1*f_RqoUuzWvcVhATPzr2i7A.png)

::: tabs

@tab:active 1.

Clone the zsh-syntax-highlighting plugin’s repo and copy it to the "Oh My ZSH" plugins directory.

```sh
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
```

@tab 2.

Activate the plugin in `~/.zshrc` by adding `zsh-syntax-highlighting` to the Plugins section as shown below.

![Add a new plugin in a new line inside plugins section](https://cdn-media-1.freecodecamp.org/images/1*1sGebsi0qMQMAvPLo64ARQ.png)

@tab 3.

Re-read zshrc configuration

```sh
source ~/.zshrc
```

:::

### Plugin 2 - Add ZSH-AutoSuggestion Plugin

This plugin auto suggests any of the previous commands. Pretty handy!

![To select the completion, simply press → key.](https://cdn-media-1.freecodecamp.org/images/1*ZiTrbBVUGLWe4OwRL1Ytrg.gif)

::: tabs

@tab:active 1.

**Install the plugin**

```sh
git clone https://github.com/zsh-users/zsh-autosuggestions $ZSH_CUSTOM/plugins/zsh-autosuggestions
```

> **PS**: `ZSH_CUSTOM` points to `~/.oh-my-zsh/custom`

@tab 2.

Open `~/.zshrc` and add `zsh-autosuggestions`

![](https://cdn-media-1.freecodecamp.org/images/1*pshPBacVfZgHaKdlG1cajg.png)

:::

---

## Step 7 - Use Ligature Support

There are various fonts that help make operators like less than, double equals, right arrow, not equals, and so on look beautiful. For example, every time you type: =>, it becomes: →.

![](https://cdn-media-1.freecodecamp.org/images/1*OIpApVPLobonxDMEkaAbaA.png)

To use this, we need fonts that support ligatures. We also need to enable it in ITerm2. [<FontIcon icon="iconfont icon-github"/>`tonsky/FiraCode`](https://github.com/tonsky/FiraCode) is one such font. Follow the steps to install and enable ligatures.

1. Download the [<FontIcon icon="iconfont icon-github"/>`tonsky/FiraCode`](https://github.com/tonsky/FiraCode) repo and extract the zip file (or clone it)
2. Open the `dstr > ttf` folder and double click on all the `*.ttf` files and select the "Install font" button to install each of the font variations.
3. Navigate to `ITerm2 | Preferences | Profiles | Text`
4. **Select `Use Ligatures` checkbox**
5. Click on `Change Font` and select `Fira Code Regular` font

![](https://cdn-media-1.freecodecamp.org/images/1*kFynRP_J2Q42WA5TGtPphA.png)

---

## Summary

We have covered a lot in this blog starting from installing latest ZSH via Homebrew, Oh My ZSH, Plugins, Themes, enable "ligatures" for FiraCode font.

### ECMAScript 2015+

1. *[Check out these useful ECMAScript 2015 (ES6) tips and tricks](https://freecodecamp.org/news/check-out-these-useful-ecmascript-2015-es6-tips-and-tricks-6db105590377/)*
2. [*5 JavaScript "Bad" Parts That Are Fixed In ES6*](https://medium.com/@rajaraodv/5-javascript-bad-parts-that-are-fixed-in-es6-c7c45d44fd81#.7e2s6cghy)
3. [*Is "Class" In ES6 The New "Bad" Part?*](https://medium.com/@rajaraodv/is-class-in-es6-the-new-bad-part-6c4e6fe1ee65#.4hqgpj2uv)

### Terminal Improvements

1. *[How to Jazz Up Your Terminal - A Step By Step Guide With Pictures](https://freecodecamp.org/news/jazz-up-your-bash-terminal-a-step-by-step-guide-with-pictures-80267554cb22/)*
2. *[Jazz Up Your “ZSH” Terminal In Seven Steps - A Visual Guide](https://freecodecamp.org/news/jazz-up-your-zsh-terminal-in-seven-steps-a-visual-guide-e81a8fd59a38/)*

### WWW

1. *[A Fascinating And Messy History Of The Web And JavaScript](https://freecodecamp.org/news/a-fascinating-and-messy-history-of-the-web-and-javascript-video-8978dc7bda75/)*

### Virtual DOM

1. [*Inner Workings Of The Virtual DOM*](https://medium.com/@rajaraodv/the-inner-workings-of-virtual-dom-666ee7ad47cf)

### React Performance

1. [*Two Quick Ways To Reduce React App’s Size In Production*](https://medium.com/@rajaraodv/two-quick-ways-to-reduce-react-apps-size-in-production-82226605771a#.6lepbl7ae)
2. [*Using Preact Instead Of React*](https://medium.com/@rajaraodv/using-preact-instead-of-react-70f40f53107c#.7fzp0lyo3)

### Functional Programming

1. [*JavaScript Is Turing Complete - Explained*](https://medium.com/@rajaraodv/javascript-is-turing-complete-explained-41a34287d263#.6t0b2w66p)
2. [*Functional Programming In JS - With Practical Examples (Part 1)*](https://medium.com/@rajaraodv/functional-programming-in-js-with-practical-examples-part-1-87c2b0dbc276#.fbgrmoa7g)
3. *[Functional Programming In JS - With Practical Examples (Part 2)](https://freecodecamp.org/news/functional-programming-in-js-with-practical-examples-part-2-429d2e8ccc9e/)*
4. [*Why Redux Need Reducers To Be "Pure Functions"*](https://medium.com/@rajaraodv/why-redux-needs-reducers-to-be-pure-functions-d438c58ae468#.bntrywxrf)

### WebPack

1. [*Webpack - The Confusing Parts*](https://medium.com/@rajaraodv/webpack-the-confusing-parts-58712f8fcad9#.6ot6deo2b)
2. [*Webpack & Hot Module Replacement \[HMR\]*](https://medium.com/@rajaraodv/webpack-hot-module-replacement-hmr-e756a726a07#.y667mx4lg) *(under-the-hood)*
3. [*Webpack’s HMR And React-Hot-Loader - The Missing Manual*](https://medium.com/@rajaraodv/webpacks-hmr-react-hot-loader-the-missing-manual-232336dc0d96#.fbb1e7ehl)

### Draft.js

1. [*Why Draft.js And Why You Should Contribute*](https://medium.com/@rajaraodv/why-draft-js-and-why-you-should-contribute-460c4a69e6c8#.jp1tsvsqc)
2. [*How Draft.js Represents Rich Text Data*](https://medium.com/@rajaraodv/how-draft-js-represents-rich-text-data-eeabb5f25cf2#.hh0ue85lo)

### React And Redux

1. [*Step by Step Guide To Building React Redux Apps*](https://medium.com/@rajaraodv/step-by-step-guide-to-building-react-redux-apps-using-mocks-48ca0f47f9a#.s7zsgq3u1)
2. [*A Guide For Building A React Redux CRUD App*](https://medium.com/@rajaraodv/a-guide-for-building-a-react-redux-crud-app-7fe0b8943d0f#.g99gruhdz) *(3-page app)*
3. [*Using Middlewares In React Redux Apps*](https://medium.com/@rajaraodv/using-middlewares-in-react-redux-apps-f7c9652610c6#.oentrjqpj)
4. [*Adding A Robust Form Validation To React Redux Apps*](https://medium.com/@rajaraodv/adding-a-robust-form-validation-to-react-redux-apps-616ca240c124#.jq013tkr1)
5. [*Securing React Redux Apps With JWT Tokens*](https://medium.com/@rajaraodv/securing-react-redux-apps-with-jwt-tokens-fcfe81356ea0#.xci6o9s6w)
6. [*Handling Transactional Emails In React Redux Apps*](https://medium.com/@rajaraodv/handling-transactional-emails-in-react-redux-apps-8b1134748f76#.a24nenmnt)
7. [*The Anatomy Of A React Redux App*](https://medium.com/@rajaraodv/the-anatomy-of-a-react-redux-app-759282368c5a#.7wwjs8eqo)
8. [*Why Redux Need Reducers To Be "Pure Functions"*](https://medium.com/@rajaraodv/why-redux-needs-reducers-to-be-pure-functions-d438c58ae468#.bntrywxrf)
9. [*Two Quick Ways To Reduce React App’s Size In Production*](https://medium.com/@rajaraodv/two-quick-ways-to-reduce-react-apps-size-in-production-82226605771a#.6lepbl7ae)

#### If this was useful, please click the clap ? button below a few times to show your support! ⬇⬇⬇ ??

If you have questions, please feel free to ask me on [Twitter (<FontIcon icon="fa-brands fa-x-twitter"/>`rajaraodv`)](https://x.com/rajaraodv)

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Jazz Up Your “ZSH” Terminal In Seven Steps - A Visual Guide",
  "desc": "By rajaraodv In this blog I’ll cover installing ITerm2, ZSH shell, “oh my ZSH”, Themes, ITerm2 color schemes, “oh my ZSH” plugins and enable “ligature” support to help create a beautiful and powerful Terminal. If you want to just make your regular B...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/jazz-up-your-zsh-terminal-in-seven-steps-a-visual-guide-e81a8fd59a38.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
