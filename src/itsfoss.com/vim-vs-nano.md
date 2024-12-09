---
lang: en-US
title: "Vim vs Nano: What Should You Choose?"
description: "Article(s) > Vim vs Nano: What Should You Choose?"
icon: iconfont icon-vim
category:
  - Linux
  - Shell
  - Vim
  - Article(s)
tag:
  - blog
  - itsfoss.com
  - linux
  - shell
  - cli
  - vim
  - nano
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Vim vs Nano: What Should You Choose?"
    - property: og:description
      content: "Vim vs Nano: What Should You Choose?"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/itsfoss.com/vim-vs-nano.html
prev: /tool/vim/articles/README.md
date: 2022-02-02
isOriginal: false
author: Pratham Patel
cover: https://itsfoss.com/content/images/wordpress/2022/01/vim-vs-nano.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Vim > Article(s)",
  "desc": "Article(s)",
  "link": "/tool/vim/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Vim vs Nano: What Should You Choose?"
  desc="Vim and Nano are two popular terminal text editors. How are they different? What's best for you? Let us find out."
  url="https://itsfoss.com/vim-vs-nano"
  logo="https://itsfoss.com/content/images/size/w256h256/2022/12/android-chrome-192x192.png"
  preview="https://itsfoss.com/content/images/wordpress/2022/01/vim-vs-nano.png"/>

We need to utilize the text editor to take notes, write a program, or edit a system configuration file to get something done.

Your Linux distribution already comes pre-installed with text editors, no matter the requirements.

You will most likely notice some of the [best modern text editors](/itsfoss.com/best-modern-open-source-code-editors-for-linux.md) like Gedit, Geany, Kate, etc., pre-installed in your Linux distribution. However, these are all GUI-based programs.

What if you want to access a text editor through the terminal? You should also find it built-in to your Linux distribution.

![Vim and Nano are some of the most popular [CLI text editors](/itsfoss.com/command-line-text-editors-linux.md).](https://itsfoss.com/content/images/wordpress/2022/01/vim-vs-nano.png)

But, what makes them so popular? What should you pick as your text editor? Let me highlight the differences between Vim and nano to help you decide.

---

## 1. Introducing the Terminal-based Editors

nano and Vim offer most of the essential features. While nano comes built-in on most Linux distros, you will have to install Vim manually.

To compare the two, let me give you a brief introduction to both.

### Vim

![Vim Screenshot](https://itsfoss.com/content/images/wordpress/2020/07/vim-screenshot.jpg)

Vim is a bettered version of the “Vi” text editor, developed in 1991. Hence, Vim stands for “Vi improved”

Vi was a terminal-based text editor initially developed for the Unix operating system in 1976. So, Vim is an enhanced version of it, with modern capabilities.

It is also referred to as a “programmer’s text editor”, considering it features various features that can help edit program files. While it offers some advanced functionalities, you can also edit plain text files.

### GNU nano

![Nano Editor Screenshot](https://itsfoss.com/content/images/wordpress/2020/07/nano-editor-screenshot.jpg)

GNU nano (or we call it “nano” throughout the article) is a simple terminal-based text editor inspired by Pico. This Unix-based text editor was a part of Pine email suite developed by The University of Washington in 1989. Pico text editor did not feature a GPL (license), which made it tough to include in Linux distros.

So, nano was developed as a free replacement to it. The nano editor was initially known as “tip” and then renamed right before Richard Stallman declared it an official GNU program.

The striking highlight of this editor is its ease of use and minimal learning curve. You do not necessarily need to be a programmer to use nano.

---

## 2. Feature Differences

Here are the key feature differences between Vim and nano.

### Key Features of Vim

- Multi-level Undo
- Syntax highlighting
- Command line editing
- Filename completion
- Multi-windows and buffers
- Folds
- Sessions
- Macro

### Key Features of Nano

- Opening multiple files
- Scrolling per line
- Undo/Redo
- Syntax coloring
- Line Numbering

Note that, Vim, in general, offers more advanced functionalities. However, both of them offer the essentials for editing system configuration files, programming, and text editing.

---

## 3. Using the Text Editors

Opening a file in Vim or nano is as easy as typing the name of the editor you want to use, followed by the file’s path. The path can be either absolute or a relative path to the file:

```sh
vim Documents/text.txt
nano Documents/text.txt
```

But there’s much more than just accessing or opening a file using the text editor, right?

If you want a quick list of things, here are some comparison points based on my usage:

| Vim | Nano |
| --- | --- |
| Mode-driven editor | Easy to use (frequently usable functions and their key combos are listed at the bottom) |
| Huge learning curve in the beginning | Non-existent learning curve |
| Session recovery | Meant for quick edits |
| Syntax highlighting/coloring |  |
| Offers advanced capabilities |  |

The primary difference between nano and Vim is that the intended audiences are very different.

### Vim

Vim is a mode-driven editor. That means alphabetical, numeric and punctuation keys all have to do a unique thing when pressed—instead of typing out a character on screen.

The modes include:

- Normal mode
- Visual mode
- Insert mode
- Command-line command
- Command-line editing

By default, when you launch Vim, it opens in the **Normal** mode. Each key has its unique function and does not immediately start typing the characters pressed.

Even with all the modes, you can [<FontIcon icon="fas fa-globe"/>configure Vim as a writing tool](https://news.itsfoss.com/configuring-vim-writing/) if you want.

To know more about such exciting things, you can refer to our resource on [basic Vim commands](https://linuxhandbook.com/basic-vim-commands/) and [Vim tips and tricks article](/itsfoss.com/pro-vim-tips.md) as well.

![Terminal screen when you launch Vim (without arguments)](https://itsfoss.com/content/images/wordpress/2022/01/01_vim_interface-800x430.webp)

In the normal mode, pressing specific keys will move your cursor.

For example, if you press <kbd>l</kbd> (lowercase L), it will move the cursor to one character right, pressing <kbd>h</kbd> key will move the cursor one character to the left.

If you want to move the cursor one line down, you press the <kbd>j</kbd> key and, to move it back up one line, you should press the <kbd>k</kbd> key.

Making **<kbd>l</kbd>+<kbd>k</kbd>+<kbd>j</kbd>+<kbd>h</kbd>** the navigational keys in the normal mode. While you can use the arrow keys to move around, it’s just more efficient this way.

**These are the basic navigational keys in Vim.**

The next most commonly used keys are ‘*<kbd>w</kbd>, <kbd>b</kbd>, <kbd>e</kbd>**.

- Pressing the <kbd>w</kbd> key moves the cursor to the next word. If it already at the start of a word, it moves to the start of the next word.
- Pressing the <kbd>b</kbd> key moves the cursor to the beginning of the word on the left.
- And, the ‘e’ key moves the cursor to the end of the word on the right.

You can even mix numbers (as prefixes) with these keys. For instance, pressing <kbd>6</kbd>+<kbd>w</kbd>’ will move the cursor six words forward.

If you want to get into a mode, you will have to press key combinations like:

- <kbd>i</kbd> for insert mode
- <kbd>Ctrl</kbd>+<kbd>C</kbd> for going back to the normal mode
- `:wq` for writing to the file and closing the window

Ultimately, we have [listed multiple ways to exit Vim](/itsfoss.com/how-to-exit-vim.md), if you’re curious.

It’s just the tip of the iceberg. To learn more about Vim, you can use the `vimtutor` command that gives you information on most basic commands to delete, edit, save a file, etc.

![vimtutor](https://itsfoss.com/content/images/wordpress/2022/03/vimtutor.png)

### GNU nano

Nano has a basic interface for interaction that gives you critical information at the bottom of the window.

To get a head start, you can refer to our [`nano` editor guide](https://itsfoss.com/nano-editor-guide/).

![Terminal screen when you launch `nano` (without arguments)](https://itsfoss.com/content/images/wordpress/2022/01/03_nano_interface-800x430.webp)

You do not need to refer to the man page or any documentation to perform the basic actions. This is why nano is considered user-friendly, compared to Vim.

That being said, a few terms used in `nano` are still “old terminologies”—an example being the “Write Out”, “Where Is” phrases instead of “Save” and “Find” respectively.

But, that’s not a big deal.

While it is easy to get used to, it isn’t entirely the same as using Notepad or Gedit (GUI programs).

For example, the key combination to perform the cut operation is usually <kbd>“Ctrl</kbd> + <kbd>X</kbd>” in most modern-day editors but in nano, it is <kbd>Ctrl</kbd>+<kbd>K</kbd>.

The <kbd>^</kbd> symbol is used to denote the use of the <kbd>Ctrl</kbd> key as a modifier key and used with the combination with the key(s) next to it.

You also find key combinations like <kbd>Ctrl</kbd> + <kbd>F</kbd> (to move the cursor forward), <kbd>Ctrl</kbd> + <kbd>B</kbd> (navigate backward). Some shortcuts include:

- <kbd>Ctrl</kbd> + <kbd>X</kbd> to exit
- <kbd>Ctrl</kbd> + <kbd>O</kbd> to write (or save as)
- <kbd>Alt</kbd> + <kbd>U</kbd> to undo last action
- <kbd>Ctrl</kbd> + <kbd>←</kbd> one word backward
- <kbd>Ctrl</kbd> + <kbd>→</kbd> one word forward

You can take a look at [<FontIcon icon="fas fa-globe"/>GNU Nano’s official cheat sheet](https://nano-editor.org/dist/latest/cheatsheet.html) to learn more shortcuts.

Overall, nano is a more beginner-friendly editor that simply gets out of your way when all you want to do is edit a file once in a while.

---

## 4. The learning curve

Considering all the information above, you must have realized that Vim is distinct from the traditional text editor that you’re used to.

That is true, which is why Vim can seem tough in the initial stage of learning.

However, for power users, advanced abilities like using macros, auto-completion, and others matter, and can save time.

So, if you are a programmer, or happen to edit numerous files every now often, Vim’s learning curve can be fruitful.

On the other side, nano offers a minimal learning curve, and can feel more familiar to GUI-based text editors like Gedit or Notepad.

---

## What’s Best for You? Vim vs Nano

Vim and nano are both capable terminal-based text editors. But they differ drastically when it comes to how you want to interact with and use said editor.

Vim is flexible and can adapt to a variety of workflows, assuming that you get used to how it works.

In contrast, nano is simple to work with and can help you edit anything you want.

If you’re still not sure, I recommend starting using nano first. And, if you think that you need to get things done faster, and want more features, switch to Vim.

---

## Frequently Asked Questions

Moving forward, let me address a few questions that will help you get a head start:

### Is Vim better than nano?

Technically, yes. But, if you do not require all of its features offered, it could feel overwhelming to use.

### Do programmers use Vim?

System administrators and programmers love Vim for its advanced capabilities. So, yes, they tend to use it.

### Is nano more popular?

Arguably yes. Nano is a terminal-based editor used by most users. Furthermore, it comes built-in with most Linux distributions.  
  
Hence, it is generally popular among users, while Vim remains an editor for a specific group of people.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Vim vs Nano: What Should You Choose?",
  "desc": "Vim and Nano are two popular terminal text editors. How are they different? What's best for you? Let us find out.",
  "link": "https://chanhi2000.github.io/bookshelf/itsfoss.com/vim-vs-nano.html",
  "logo": "https://itsfoss.com/content/images/size/w256h256/2022/12/android-chrome-192x192.png",
  "background": "rgba(53,121,127,0.2)"
}
```
