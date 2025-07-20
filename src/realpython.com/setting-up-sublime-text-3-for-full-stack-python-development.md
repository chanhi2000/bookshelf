---
lang: en-US
title: "Setting Up Sublime Text 3 for Full Stack Python Development"
description: "Article(s) > Setting Up Sublime Text 3 for Full Stack Python Development"
icon: iconfont icon-subl
category:
  - Sublime Text
  - Python
  - Article(s)
tag:
  - blog
  - realpython.com
  - text-editor
  - sublimetext
  - sublime-text
  - subl
  - python
  - py
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Setting Up Sublime Text 3 for Full Stack Python Development"
    - property: og:description
      content: "Setting Up Sublime Text 3 for Full Stack Python Development"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/setting-up-sublime-text-3-for-full-stack-python-development.html
prev: /tool/sublimetext/articles/README.md
date: 2014-08-11
isOriginal: false
author:
  - name: 
    url : https://realpython.com/team/asantos/
cover: https://files.realpython.com/media/Setting-Up-Sublime-Text-3-for-Full-Stack-Python-Development_Watermarked.2cf294b0b61e.jpg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Sublime Text > Article(s)",
  "desc": "Article(s)",
  "link": "/tool/sublimetext/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Python > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Setting Up Sublime Text 3 for Full Stack Python Development"
  desc="This article details how to set up Sublime Text for full stack Python development."
  url="https://realpython.com/setting-up-sublime-text-3-for-full-stack-python-development"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/Setting-Up-Sublime-Text-3-for-Full-Stack-Python-Development_Watermarked.2cf294b0b61e.jpg"/>

[<FontIcon icon="iconfont icon-subl"/>Sublime Text 3](https://sublimetext.com/3) (ST3) is a lightweight, cross-platform code editor known for its speed, ease of use, and strong community support. It’s an incredible editor right out of the box, but the real power comes from the ability to enhance its functionality using Package Control and creating custom settings.

In this article, we’ll look at how to setup Sublime Text for full stack Python development (from front to back), enhance the basic functionality with custom themes and packages, and use many of the commands, features, and keyword shortcuts that make ST3 so powerful.

::: note

This tutorial assumes you’re using a Mac and are comfortable with the terminal. If you’re using Windows or Linux, many of the commands will vary, but you should be able to use Google to find the answers quickly given the info in this tutorial.

:::

Before we start, let’s address what I mean exactly by “full stack.”

In today’s world of HTML5 and mobile development, JavaScript is literally everywhere. EVERYWHERE. Python coupled with a framework such as [**Django**](/realpython.com/get-started-with-django-1.md) or Flask is not enough. To really develop a website from end-to-end, you must be familiar with JavaScript (and the various JavaScript frameworks), REST APIs, responsive design, and of course [**HTML and CSS**](/realpython.com/html-css-python.md), and so on.

Let’s face it: as a programmer, you are like any other craftsman. If you want to be the best you can be, then you need your tools to be sharp. Your [**development environment**](/realpython.com/effective-python-environment.md) must be set up for full stack development—which is exactly what we are going to do right now.

![](https://files.realpython.com/media/sublime-logo-python-logo.596cdae91f05.png)

---

## Features

Let’s start by looking at a few of the default features of Sublime Text 3:

::: tabs

@tab:active 1.

**Split Layouts** allow you to arrange your files in various split screens. This is useful when you are doing test driven development (Python code on one screen, test scripts on another) or working on the front end (HTML on one screen, CSS and/or JavaScript on another).

![A screenshot of the Sublime Text 3 Splitscreen Freature](https://files.realpython.com/media/st3_split_screen.83fd187fadf5.png)

@tab 2.

**[<FontIcon icon="iconfont icon-subl"/>Vintage Mode](https://sublimetext.com/docs/3/vintage.html)** provides you with [**`vi` commands**](/realpython.com/vim-and-python-a-match-made-in-heaven.md) for use within ST3.

@tab 3.

**Chrome-like Tabs** make navigating and editing several files much simpler.

@tab 4.

**Automatic loading of the last session** re-opens all files and folders you had open when you closed the editor the last time. I leave ST3 open all the time, with various projects open, so if I reset the computer, it opens the files and folders right back up.

@tab 5.

**Code Snippets** increase your productivity by giving you the ability to create common pieces of code with a single keyword. There are a number of default snippets. To try one for yourself, open a new file, type in `lorem`, and press <kbd>Tab</kbd>. You should get a paragraph of lorem ipsum text. Also, if you type `defs` and then press <kbd>Tab</kbd> in a Python file, it will setup a generic function.

:::

::: note

You can also create your own snippets: **Tools > New Snippet**. Refer to the [<FontIcon icon="iconfont icon-subl"/>documentation](http://sublimetext.info/docs/en/extensibility/snippets.html) for help, and also check out some of my snippets [here (<FontIcon icon="iconfont icon-github"/>`mjhea0/sublime-setup-for-python`)](https://github.com/mjhea0/sublime-setup-for-python/tree/master/dotfiles/snippets).

:::

---

## Customizing Sublime Text 3

After you download ST3, you can customize it.

### Install the `subl` command line tool

Just Like TextMate has the `mate` command, Sublime Text has a command line tool called [<FontIcon icon="iconfont icon-subl"/>`subl`](http://sublimetext.com/docs/3/osx_command_line.html) that allows you to open one file, or an entire directory of files and folders, from the terminal.

To enable this command, create a symbolic link to the `subl` binary:

```sh
sudo ln -s /Applications/Sublime\ Text.app/Contents/SharedSupport/bin/subl /usr/bin/subl
```
```

Ensure that the link works by opening Sublime:

```sh
subl
```

If that didn’t work, you probably need to add <FontIcon icon="fas fa-folder-open"/>`/bin` to your path:

```sh
echo "export PATH=~/bin:$PATH" >> ~/.profile
```

Then repeat step one.

::: note

If you are still having trouble, check out [<FontIcon icon="fa-brands fa-stack-overflow"/>this article](http://stackoverflow.com/questions/16199581/opening-sublime-text-on-command-line-as-subl-on-mac-os?lq=1) for help. You can also read up on creating the symbolic links in [<FontIcon icon="fa-brands fa-stack-overflow"/>Windows](http://stackoverflow.com/questions/9440639/sublime-text-from-command-line-win7?rq=1) and [<FontIcon icon="fa-brands fa-ubuntu"/>Linux](http://askubuntu.com/questions/273034/lauching-sublime-text-from-command-line).

:::

Now you can open a file or directory using the following commands:

```sh
# Open the current directory.
subl .

# Open a directory called tests.
subl ~/Documents/test

# Open a file called text.txt.
subl test.txt
```

If there are spaces in the path, you must surround the entire path in double quotes:

```sh
subl "~/Documents/test/my test file.txt"
```

To view all the commands, open up the help file:

```sh
subl --help
```

### Install Package Control

To begin taking advantage of the various [<FontIcon icon="iconfont icon-subl"/>packages](https://packagecontrol.io/) for extending Sublime’s functionality, you need to manually install the package manager called Package Control. Once you have it installed, you can use it to install, remove, and upgrade all other ST3 packages.

1. To install, copy the Python code for Sublime Text 3 found [<FontIcon icon="iconfont icon-subl"/>here](https://packagecontrol.io/installation#st3). Click **View > Show Console** to open the ST3 console. Paste the code into the console. Press <kbd>Enter</kbd>. Reboot ST3.
2. You can now install packages by using the keyboard shortcut <kbd>Cmd</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>. Start typing `install` until `Package Control: Install Package` appears. Press <kbd>Enter</kbd> and search for available packages.

Here are some other relevant commands:

- `List Packages` shows all your installed packages.
- `Remove Package` removes a specific package.
- `Upgrade Package` upgrades a specific package.
- `Upgrade/Overwrite All Packages` upgrades all your installed packages.

Check out the official [<FontIcon icon="iconfont icon-subl"/>documentation](https://packagecontrol.io/docs/usage) to view more commands.

![Package Control package manager in Sublime Text 3](https://files.realpython.com/media/st3_package_control.13d4617691d0.png)

### Create a Custom Settings File

You can fully configure Sublime Text using JSON-based settings files, so it’s easy to transfer or synchronize your customized settings to another system. First, we need to create our customized settings. It’s best to create a base file for all environments as well as language-specific settings files.

To set up a base file, click **Sublime Text > Preferences > Settings - User**. Add an empty JSON object to the file and add your settings like so:

```json
{
 // base settings
 "auto_complete": false,
 "sublimelinter": false,
 "tab_size": 2,
 "word_wrap": true
}
```

1. For language specific settings, click **Sublime Text > Preferences > Settings - More > Syntax Specific - User**. Then save the file using the following format: **LANGUAGE.sublime-settings**. For Python-specific settings, save the file as **Python.sublime-settings**.
2. You can obviously configure your settings to your liking. However, I highly recommend starting with my [base (<FontIcon icon="iconfont icon-github"/>`mjhea0/sublime-setup-for-python`)](https://github.com/mjhea0/sublime-setup-for-python/blob/master/dotfiles/Preferences.sublime-settings) and [Python-specific (<FontIcon icon="iconfont icon-github"/>`mjhea0/sublime-setup-for-python`)](https://github.com/mjhea0/sublime-setup-for-python/blob/master/dotfiles/Python.sublime-settings) settings and then making changes as you see fit.
3. Optional: You can use Dropbox to sync all your settings. Simply upload your settings files to [Dropbox (<FontIcon icon="iconfont icon-github"/>`miohtama/ztanesh`)](https://github.com/miohtama/ztanesh/blob/master/zsh-scripts/bin/setup-sync-sublime-over-dropbox.sh) and load them from there to sync the Sublime environments on all your machines.
4. A good reference for settings can be found at the [<FontIcon icon="iconfont icon-subl"/>Sublime Text Unofficial Documentation](http://sublime-text-unofficial-documentation.readthedocs.org/en/latest/reference/settings.html).

---

## Themes

ST3 also gives you the option to change the overall theme to better suit your personality. Design your own. Or, if you’re not artistically inclined, you can download one of the various custom [<FontIcon icon="iconfont icon-subl"/>themes](https://packagecontrol.io/browse/labels/theme) designed by the Sublime community through Package Control. Check out [<FontIcon icon="fas fa-globe"/>ColorSublime](http://colorsublime.com/) to preview themes before installing them.

The ever popular [<FontIcon icon="iconfont icon-subl"/>Soda Dark Theme](https://packagecontrol.io/packages/Theme%20-%20Soda) and the minimal [<FontIcon icon="iconfont icon-subl"/>Flatland](https://packagecontrol.io/packages/Theme%20-%20Flatland) are two of my personal favorites.

After installing a theme, make sure to update your base settings through **Sublime Text > Preferences > Settings - User**:

```json
{
 "theme": "Flatland Dark.sublime-theme",
 "color_scheme": "Packages/Theme - Flatland/Flatland Dark.tmTheme"
}
```

---

## Packages

Besides the packaged themes, I take advantage of the following packages to speed up my workflow.

### SideBarEnhancements

[<FontIcon icon="iconfont icon-subl"/>SideBarEnhancements](https://packagecontrol.io/packages/SideBarEnhancements) extends the number of menu options in the sidebar, speeding up your overall workflow. Options such as **New File** and **Duplicate** are essential and should be part of ST3 out of the box. The **Delete** option alone makes it worth downloading. This feature simply sends files to the Trash, which may seem trivial, but if you delete a file without it, then it’s very difficult to recover unless you’re using a version control system.

![Screenshot of the Sidebar Enhancements plugin for Sublime Text 3](https://files.realpython.com/media/st3_sidebar_enhancements.10d178edb862.png)

Download this now!

### Anaconda

[<FontIcon icon="iconfont icon-subl"/>Anaconda](https://packagecontrol.io/packages/Anaconda) is the ultimate Python package. It adds a number of IDE-like features to ST3 including the following:

- **Autocompletion** works by default, but there are a number of configuration [options (<FontIcon icon="iconfont icon-github"/>`DamnWidget/anaconda#anaconda-autocompletion`)](https://github.com/DamnWidget/anaconda#anaconda-autocompletion).
- **Code [<FontIcon icon="fa-brands fa-wikipedia-w"/>linting](http://en.wikipedia.org/wiki/Lint_%28software%29)** uses either PyLint or PyFlakes with PEP 8. I personally use a different linting package, as I will explain shortly, so I disable linting altogether within the user-defined Anaconda settings file, **Anaconda.sublime-settings**, via the file menu: **Sublime > Preferences > Package Settings > Anaconda > Settings - User**: `{"anaconda_linting": false}`
- **McCabe code complexity checker** runs the [<FontIcon icon="fa-brands fa-wikipedia-w"/>McCabe complexity checker](http://en.wikipedia.org/wiki/Cyclomatic_complexity) tool within a specific file. If you’re not familiar with what complexity is, be sure to visit the link above.
- **Goto Definitions** finds and displays the definition of any [**variable**](/realpython.com/python-variables.md), function, or class throughout your entire project.
- **Find Usage** quickly searches where a variable, function, or class has been used in a specific file.
- **Show Documentation** shows the [**docstring**](/realpython.com/documenting-python-code.md#documenting-your-python-code-base-using-docstrings) for functions or classes (if defined, of course).

![The "Show Documentation" feature of the Anaconda plugin for Sublime Text](https://files.realpython.com/media/st3_anaconda_show_docs.5574abda6481.png)

You can view all of the features [here (<FontIcon icon="iconfont icon-github"/>`DamnWidget/anaconda`)](https://github.com/DamnWidget/anaconda) or within the README file in ST3’s Package Settings: **Sublime Text > Preferences > Package Settings > Anaconda > README**.

::: note

[<FontIcon icon="iconfont icon-subl"/>SublimeCodeIntel](https://packagecontrol.io/packages/SublimeCodeIntel) is another popular package that has many of the same features as Anaconda. I suggest testing them both out.

:::

### Djaneiro

[<FontIcon icon="iconfont icon-subl"/>Djaneiro](https://packagecontrol.io/packages/Djaneiro) supports Django templating and keyword highlighting and provides useful code snippets (tab completions) for Sublime Text. The snippet system is an incredible time-saver. You can create common Django blocks with only a few keystrokes for templates, models, forms, and views. Check out the official [documentation (<FontIcon icon="iconfont icon-github"/>`squ1b3r/Djaneiro`)](https://github.com/squ1b3r/Djaneiro) to see a list of snippets.

My personal favorites are for templating: `var` creates `{{ }}` and `tag` creates `{% %}`.

### requirementstxt

[<FontIcon icon="iconfont icon-subl"/>requirementstxt](https://packagecontrol.io/packages/requirementstxt) provides autocompletion and syntax highlighting as well as a nice version management system for your <FontIcon icon="fas fa-file-lines"/>`requirements.txt` files.

### SublimeLinter

[<FontIcon icon="iconfont icon-subl"/>SublimeLinter](https://packagecontrol.io/packages/SublimeLinter) is a framework for ST3 linters. The package itself does not include any actual linters; those must be installed separately via Package Control using the **SublimeLinter-[linter_name]** naming syntax. You can view official linters [here (<FontIcon icon="iconfont icon-github"/>`SublimeLinter`)](https://github.com/SublimeLinter). There are also a number of third party linters, which can be viewed in Package Control. Check out the installation instructions [<FontIcon icon="fas fa-globe"/>here](http://sublimelinter.readthedocs.org/en/latest/installation.html).

For Python linting, I recommend using [<FontIcon icon="iconfont icon-subl"/>SublimeLinter-pyflakes](https://packagecontrol.io/packages/SublimeLinter-pyflakes) and [<FontIcon icon="iconfont icon-subl"/>SublimeLinter-pep8](https://packagecontrol.io/packages/SublimeLinter-pep8).

I also use [<FontIcon icon="iconfont icon-subl"/>SublimeLinter-jshint](https://packagecontrol.io/packages/SublimeLinter-jshint), [<FontIcon icon="iconfont icon-subl"/>SublimeLinter-pyyaml](https://packagecontrol.io/packages/SublimeLinter-pyyaml), [<FontIcon icon="iconfont icon-subl"/>SublimeLinter-csslint](https://packagecontrol.io/packages/SublimeLinter-csslint), [<FontIcon icon="iconfont icon-subl"/>SublimeLinter-html-tidy](https://packagecontrol.io/packages/SublimeLinter-html-tidy), and [<FontIcon icon="iconfont icon-subl"/>SublimeLinter-json](https://packagecontrol.io/packages/SublimeLinter-json).

::: note

Most of these linters have dependencies associated with them, so please read the installation instructions before installing.

:::

You can customize each linter in the user-defined **SublimeLinter.sublime-settings** file: **Sublime Text > Preferences > Package Settings > SublimeLinter > Settings - User**. For example, I ignore the following PEP 8 errors and warnings:

```json title="SublimeLinter.sublime-settings"
"pep8": {
 "@disable": false,
 "args": [],
 "excludes": [],
 "ignore": "E501,C0301,W0142,W0402,R0201,E1101,E1102,C0103,R0901,R0903,R0904,C1001,W0223,W0232,W0201,E1103,R0801,C0111",
 "max-line-length": 100,
 "select": ""
},
```

### GitGutter

[<FontIcon icon="iconfont icon-subl"/>GitGutter](https://packagecontrol.io/packages/GitGutter) shows little icons in ST3’s gutter area that indicate whether a line has been inserted, modified, or deleted since the last commit.

![Screenshot of the GitGutter plugin for Sublime Text 3](https://files.realpython.com/media/st3_gitgutter.73de764e6241.png)

::: note

If you want support for a number of distributed version control systems (Git, SVN, Bazaar, and Mercurial), check out [<FontIcon icon="iconfont icon-subl"/>Modific](https://packagecontrol.io/packages/Modific).

:::

### FTPSync

[<FontIcon icon="iconfont icon-subl"/>FTPSync](https://packagecontrol.io/packages/FTPSync) syncs your project with your remote files. Simply open the file to download it (if the remote file is newer than your local file) and upload it to your remote server with every save. That’s a great way to keep your local and remote(s) in sync. You’ll want to make sure to add at least one remote connection by clicking **Sublime Text > Preferences > Package Settings > FTPSync > Setup FTPSync**.

Sample settings:

```json
{
  "primary": {
    host: "ftp.mywebsite.com",
    username: "johnsmith",
    password: "secretpassword",
    path: "/www/",

    upload_on_save: true,
    tls: true
  }
}
```

I personally set the password to `null` because I don’t want it visible in that file. FTPSync just asks for my password after each save.

### AdvancedNewFile

[<FontIcon icon="iconfont icon-subl"/>AdvancedNewFile](https://packagecontrol.io/packages/AdvancedNewFile) is used to create a new folder or file from within ST3 with key bindings alone.

Simply bring up the AdvancedNewFile input through the appropriate key binding. Then, enter the path, along with the file name into the input field. Upon pressing <kbd>Enter</kbd>, the file will be created. In addition, if the directories specified do not yet exist, they will be created. By default, the path to the file being created will be filled shown in the status bar as you enter the path information.

For a more detailed explanation on its usage, check out the documentation on [GitHub (<FontIcon icon="iconfont icon-github"/>`skuroda/Sublime-AdvancedNewFile`)](https://github.com/skuroda/Sublime-AdvancedNewFile#usage). Be sure to read about Tab Completion as well as Predefined Aliases.

I replaced the normal <kbd>Cmd</kbd>+<kbd>N</kbd> command to create a new file with AdvancedNewFile by adding the following code to the **Key Bindings - User** file: **Sublime Text > Preferences > Package Settings > AdvancedNewFile > Key Bindings - User**:

```json
[
  { "keys": ["cmd+n"], "command": "advanced_new_file_new"}
]
```

You can also setup a default directory to start with: **Sublime Text > Preferences > Package Settings > AdvancedNewFile > Settings - User**

```json
{"default_initial": "/Users/michaelherman/Documents/repos"}
```

Now when I create a new file, the `/Users/michaelherman/Documents/repos` string is automatically inserted first, since 99% of the time I store all my scripts in that directory.

### Emmet

[<FontIcon icon="iconfont icon-subl"/>Emmet](https://packagecontrol.io/packages/Emmet), previously known as Zen Coding, uses simple abbreviations to generate HTML or CSS code snippets.

For example, if you type a bang, `!`, and press <kbd>Tab</kbd> in an HTML file, then the HTML5 doctype and a few basic tags will be generated:

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
</head>
<body>

</body>
</html>
```

Check out the official [<FontIcon icon="fas fa-globe"/>documentation](http://docs.emmet.io/) as well as this handy [<FontIcon icon="fas fa-globe"/>cheat sheet](http://docs.emmet.io/cheat-sheet/) for more info.

### Markdown Preview

[<FontIcon icon="iconfont icon-subl"/>Markdown Preview](https://packagecontrol.io/packages/Markdown%20Preview) is used for previewing and building markdown files.

To use, open the Package Manager and type `Markdown Preview` to show the available commands:

- Markdown Preview: Python Markdown: Preview in Browser
- Markdown Preview: Python Markdown: Export HTML in Sublime Text
- Markdown Preview: Python Markdown: Copy to Clipboard
- Markdown Preview: GitHub Flavored Markdown: Preview in Browser
- Markdown Preview: GitHub Flavored Markdown: Export HTML in Sublime Text
- Markdown Preview: GitHub Flavored Markdown: Copy to Clipboard
- Markdown Preview: Open Markdown Cheat Sheet

Once converted, the output file will be updated on each subsequent save.

---

## Keyboard Shortcuts

- **Goto Anything** <kbd>Cmd</kbd>+<kbd>P</kbd> is used for quickly finding and opening files. Just type in a part of a path and filename within a project and you can easily open that file. This is great for quickly opening files in large Django projects.
- **Goto Line Number** <kbd>Ctrl</kbd>+<kbd>G</kbd> takes you to a specific line number in an active file.
- **Goto Symbol** <kbd>Cmd</kbd>+<kbd>R</kbd> lists all functions and classes within a file to make them easier to find. Simply start typing the one you want.
- **Go to beginning of line** <kbd>Cmd</kbd>+<kbd>Left</kbd> and **Go to end of line** <kbd>Cmd</kbd>+<kbd>Right</kbd> help you navigate within lines.
- **Delete current line** <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>K</kbd> deletes the current line.
- **Multi-Edit** is by far my favorite shortcut:
  - Select a word and press <kbd>Cmd</kbd>+<kbd>D</kbd> to select the next same word. Then press <kbd>Cmd</kbd>+<kbd>D</kbd> again to select the next same word again, and so on.
  - Press <kbd>Cmd</kbd>+<kbd>Left</kbd> Button to create a cursor for editing everywhere you click.
- **Block select** Option+Left Button is used to select a block of text. It’s perfect for removing blank space when formatting a CSV file.

::: note

For more shortcuts, take a look at [<FontIcon icon="iconfont icon-subl"/>this article](http://sublime-text-unofficial-documentation.readthedocs.org/en/latest/reference/keyboard_shortcuts_osx.html).

```component VPCard
{
  "title": "Keyboard Shortcuts - OSX — Sublime Text Unofficial Documentation",
  "desc": "This topic is a draft and may contain wrong information.",
  "link": "https://sublime-text-unofficial-documentation.readthedocs.io/en/latest/reference/keyboard_shortcuts_osx.html/",
  "logo": "https://sublime-text-unofficial-documentation.readthedocs.io/favicon.ico",
  "background": "rgba(67,126,180,0.2)"
}
```

:::

---

## Custom Commands

It’s easy to write your own custom commands and key bindings with Python. I currently use this workflow:

1. Copy the path of the current file to the clipboard ([link (<FontIcon icon="iconfont icon-github"/>`mjhea0/sublime-setup-for-python`)](https://github.com/mjhea0/sublime-setup-for-python/blob/master/dotfiles/copy_path_to_clipboard.py)).
2. Close all tabs except the active one ([link (<FontIcon icon="iconfont icon-github"/>`mjhea0/sublime-setup-for-python`)](https://github.com/mjhea0/sublime-setup-for-python/blob/master/dotfiles/close_tabs.py)).

Install these by adding the Python files to your <FontIcon icon="fas fa-folder-open"/>`/Sublime Text 3/Packages/User` directory via the file menu (**Sublime > Preferences > Browse Packages**) and then opening the User directory. To complete the setup, bind them from the **Key Bindings - User** file (**Sublime Text > Preferences > Package Settings > AdvancedNewFile > Key Bindings - User**).

```json
[
  // Copy file name
  {
    "keys": ["cmd+shift+c"],
    "command": "copy_path_to_clipboard"
  },
  // Close all other tabs
  {
    "keys": ["cmd+alt+w"],
    "command": "close_tabs"
  }
]
```

---

## Additional Resources

1. [Community-maintained documentation](http://docs.sublimetext.info/en/latest/index.html)

```component VPCard
{
  "title": "Docs - Package Control",
  "desc": "",
  "link": "https://packagecontrol.io/docs/",
  "logo": "https://packagecontrol.io/favicon.ico",
  "background": "rgba(102,102,102,0.2)"
}
```

3. [Unofficial documentation reference](http://sublime-text-unofficial-documentation.readthedocs.org/en/latest/reference/reference.html)
4. [Pimp my Editor - Presentation](https://slides.com/nicklang/pimp-my-editor)

![](https://files.realpython.com/media/sublime-logo-python-logo.596cdae91f05.png)

---

## Conclusion

I hope that this article was helpful to you and that you were able to integrate some of the above packages and custom settings along with your own based on your personal preferences to improve your workflow.

If you have any questions or suggestions of your own, please let me know in the comments below. Finally, check out the dotfiles folder in this [repo (<FontIcon icon="iconfont icon-github"/>`mjhea0/sublime-setup-for-python`)](https://github.com/mjhea0/sublime-setup-for-python/tree/master/dotfiles) to view all the resources that I created. Cheers!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Setting Up Sublime Text 3 for Full Stack Python Development",
  "desc": "This article details how to set up Sublime Text for full stack Python development.",
  "link": "https://chanhi2000.github.io/bookshelf/realpython.com/setting-up-sublime-text-3-for-full-stack-python-development.html",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```
