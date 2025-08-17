---
lang: en-US
title: "8 Vim Tips And Tricks That Will Make You A Pro User"
description: "Article(s) > 8 Vim Tips And Tricks That Will Make You A Pro User"
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
head:
  - - meta:
    - property: og:title
      content: "Article(s) > 8 Vim Tips And Tricks That Will Make You A Pro User"
    - property: og:description
      content: "8 Vim Tips And Tricks That Will Make You A Pro User"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/itsfoss.com/pro-vim-tips.html
prev: /tool/vim/articles/README.md
date: 2017-03-29
isOriginal: false
author: Sylvain Leroux
cover: https://itsfoss.com/content/images/wordpress/2017/02/vim-tips-tricks.jpg
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
  name="8 Vim Tips And Tricks That Will Make You A Pro User"
  desc="Brief: In this article, I’ll show you some of my favorites Vim tricks with practical examples.If you don’t use Vim, these tips might not give reasons for using Vim but if you use it already, you’ll definitely become a better Vim user. Even if I recently"
  url="https://itsfoss.com/pro-vim-tips"
  logo="https://itsfoss.com/content/images/size/w256h256/2022/12/android-chrome-192x192.png"
  preview="https://itsfoss.com/content/images/wordpress/2017/02/vim-tips-tricks.jpg"/>

::: info Brief

In this article, I’ll show you some of my favorites **Vim tricks** with practical examples.If you don’t use Vim, these tips might not give **reasons for using Vim** but if you use it already, you’ll definitely become a better Vim user.*

:::

Even if I recently started to use [<FontIcon icon="fas fa-globe"/>Atom](https://atom.io/) more and more, I can hardly pass a day without using [<FontIcon icon="iconfont icon-vim"/>Vim](http://vim.org/). Not because I’m forced to. But because I feel that comfortable.

Yes,*comfortable*. A very strange word when talking about Vi or any of its clone isn’t it? And I agree, it is certainly not the most *intuitive* text editor.

But with some practice and by training a little bit your memory, you can perform apparently complex editing tasks in only afew keystrokes. Something that I’ve never really found with any other [command line text editors for Linux](/itsfoss.com/command-line-text-editors-linux.md).

But, instead of writing yet-an-other-vi-introduction, I chose today to let you touch the real power behind Vi(m) by presenting you few *tricks* I really use — and I miss in most if not all other editors.I will not give you the complete explanation of all those tricks, but I strongly encourage you to try and experiment with them until you get some grasp on how they work.

If you liked Vim and want to master it completely, you can also enroll into [online Vim course provided by Linux Training Academy](https://itsfoss.com/recommends/vim-linux-training-academy/).

---

## 8 Vim tricks to get more out of it

![Best Vim Tips and Tricks for pro users](https://itsfoss.com/content/images/wordpress/2017/02/vim-tips-tricks-800x450.jpg)

Let me repeat: I strongly encourage you to try those example by yourself. Unfortunately, WordPress does not necessary do a good job to preserve the exact content of my examples & commands — especially regarding empty lines or quotes. So, for your convenience, you can download the samples used here from the link below:

<SiteInfo
  name="YesIKnowIT/VIM01: Example from Yes, I Know IT / It's FOSS article https://itsfoss.com/?p=14419"
  desc="Example from Yes, I Know IT / It's FOSS article https://itsfoss.com/?p=14419"
  url="https://github.com/YesIKnowIT/VIM01/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/e3513dbd45e65b4f82c20c64c9eb8e8a6ed827655cbb82ef58f4b0b9214d065d/YesIKnowIT/VIM01"/>

Each example comes with the original text (.orig) and a Bash script (.sh) invoking Vim with the command illustrated in this article.

### 1. Changing capitalization in Vim

Am I the only one using that feature? Or is this because I’m doomed working with people believing that WRITING ALL CAPS IS COOL?

Anyway, when programming, when adding a copyright notice, or even after a copy-paste, it is not that uncommon to have to change text capitalization. In that respect, Vim is much more evolved than the original Vi. And I bless every dayBram Moolenaar for his great work:

::: tabs

@tab:active Original text

```plaintext title="Original text"
copyright (c) <year> by <copyright holder>

Usage of the works is permitted provided that this instrument is retained with the works, so that any entity that uses the works is notified of this instrument.  
Disclaimer: the works are without warranty.
```

> **Commands**
> 
> - `~`: Switch case
> - `:$norm gUU`: Convert the last line to uppercase `{not in Vi}`

@tab Modified text

```plaintext title="Modified text"
Copyright (c) <year> by <copyright holder>

Usage of the works is permitted provided that this instrument is retained with the works, so that any entity that uses the works is notified of this instrument.  
DISCLAIMER: THE WORKS ARE WITHOUT WARRANTY.
```

:::

![](https://itsfoss.com/content/images/wordpress/2017/02/changing-capitalization.png)

### 2. Vim search and replace tips

This one I use *every* day. Why is this still not present in *all*text editor? Of course, most editors have some kind of search replace feature. But how many do really have the power of regex and substitution patterns? Of course, this is more complex to master than basic *string* substitutions. But I just couldn’t live without that feature. At such point, I sometimes see myself copying/pasting from some GUI editors into a terminal running *sed* and back. But Vi has that embedded since 40 years or so…

::: tabs

@tab:active Original text

```plaintext title="Original text"
Does a boy get a chance to paint black a fence every day? That put the thing in a new light. Ben Rogers stopped nibbling his apple. Tom swept his brush daintily back and forth-stepped back to note the effect-added a touch here and there-criticised the effect again-Ben watching every move and getting more and more interested, more and more absorbed.
```

> **Commands**
> 
> - `:s/black/white/`: Replace thefirst occurrence of the string ‘black’ by ‘white’
> - `:s/Ben\\( Rogers\\)\\@!/Ben Rogers/g`: Replace every occurrence of the string ‘Ben’ by ‘Ben Rogers’ except when ‘Rogers’ was already present
> - `:s/.\*/<p>\\r&\\r<\\/p>/`:Wrap the line between `<p>` and `</p>`
> - `:-1s/-/\\&mdash;/g`: Replace every occurrence of the string ‘`-`‘ by ‘`&mdash;`’ in the preceding line

@tab Modified text

```plaintext title="Modified text"
<p>  
Does a boy get a chance to paint white a fence every day? That put the thing in a new light. Ben Rogers stopped nibbling his apple. Tom swept his brush daintily back and forth&mdash;stepped back to note the effect&mdash;added a touch here and there&mdash;criticised the effect again&mdash;Ben Rogers watching every move and getting more and more interested, more and more absorbed.  
</p>
```

:::

![](https://itsfoss.com/content/images/wordpress/2017/02/those-picket-fences-recall-me-of-the-letters-v-i-m.jpg)

Those picket fences recall me of ViM…

### 3. Moving things around in no time

Yes, copy-paste and drag-n-drop are great tools. But sometimes it is just too boring to scroll through an entire document to find where to paste my text, and then scroll in the opposite direction to bring the cursor back to its initial location.

::: tabs

@tab:active Original text

```plaintext title="Original text"
Pros:  
* Fast  
* Powerfull  
* Reliable  
* Not user-friendlyCons:  
* Portable  
* Addictive
```

> **Commands**
> 
> - `/Power/`: Go to thefirst line containing the string ‘Power’
> - `ddp`: Swap the current line with the next one
> - `:/user-friendly/m$`: Move the next line containing the string ‘user-friendly’ to the end of the file
> - `g;`: Bring back cursor to theprevious position
> - `:/Cons/+1m-2`: Move two lines up the line following ‘Cons’

@tab Modified text

```plaintext title="Modified text"
Pros:  

* Fast  
* Reliable  
* Powerfull  
* PortableCons:  
* Addictive  
* Not user-friendly
```

:::

![](https://itsfoss.com/content/images/wordpress/2017/02/moving-things-around-in-no-time.png)

### 4. Applying commands on an address range

GUI editors may allow you to apply some commands on the entire file, or only on the current selection. Sometimes, we have more options, like before or after the cursor. But Vi(m) allows a much more expressive description of the range on which a given command has to be applied:

::: tabs

@tab:active Original text

```plaintext title="Original text"
<div>
<table>
<tr><td>Pen name</td><td>Real name</td></tr>
<tr><td>Mark Twain</td><td>Samuel Clemens</td></tr>
<tr><td>Lewis Carroll</td><td>Charles Dodgson</td></tr>
<tr><td>Richard Bachman</td><td>Stephen King</td></tr>
</table>
<p>Many writers have chosen to write under a pen name.</p>
</div>
```

> **Commands**
> 
> - `:/<table>/,/<\\/table>/g/^$/d`: Delete empty lines between lines containing `<table>` and `</table>`
> - `:/^$/;/^$/-1m1`: Move text between the next two empty lines after line 1 (notice the use of a semi-colon here)
> - `:2,$-1>`: Raise indentation of text bewteen line 2 and the penultimate line

@tab Modified text

```plaintext title="Modified text"
<div>  
   
 <p>Many writers have chosen to write under a pen name.</p>  
   
 <table>  
 <tr><td>Pen name</td><td>Real name</td></tr>  
 <tr><td>Mark Twain</td><td>Samuel Clemens</td></tr>  
 <tr><td>Lewis Carroll</td><td>Charles Dodgson</td></tr>  
 <tr><td>Richard Bachman</td><td>Stephen King</td></tr>  
 </table>  
   
</div>
```

:::

![](https://itsfoss.com/content/images/wordpress/2017/02/applying-commands-on-an-address-range.png)

### 5. Vim piping commands examples

This one is absolutely a *meta-trick* in the direct spirit of Unix-philosophy. Vi allows you to process part of your buffer through an *external* command. This is great when you need things that are not doable directly in Vi — or for things that are not *easily* doable in Vi. My favorite use case for this feature is to sort data — but it has virtually limitless power:

::: tabs

@tab:active Original text

```plaintext title="Original text"
tee >(echo $(wc -l) most recent data) << EOT  
Aug, 2016 2.11%  
Sep, 2016 2.23%  
Oct, 2016 2.18%  
Nov, 2016 2.31%  
Dec, 2016 2.21%  
Jan, 2017 2.27%  
Mar, 2016 1.78%  
Apr, 2016 1.65%  
May, 2016 1.79%  
Jun, 2016 2.02%  
Jul, 2016 2.33%  
EOTLinux Market Share on Desktop  
source: https://www.netmarketshare.com
```

> **Commands**
> 
> - `:2,/^EOT/-1!sort -k2n -k1M`: Sort data by year and month
> - `:$r!date “+Data obtained the \\%c”`: Add the output of the `date` command at the end of the file
> - `:1,/^EOT/!bash`: Execute the embedded script and replace it by its result

@tab Modified text

```plaintext title="Modified text"
Mar, 2016 1.78%  
Apr, 2016 1.65%  
May, 2016 1.79%  
Jun, 2016 2.02%  
Jul, 2016 2.33%  
Aug, 2016 2.11%  
Sep, 2016 2.23%  
Oct, 2016 2.18%  
Nov, 2016 2.31%  
Dec, 2016 2.21%  
Jan, 2017 2.27%  
11 most recent dataLinux Market Share on Desktop  
source: https://www.netmarketshare.com  
Data obtained the Thu 09 Feb 2017 11:07:34 PM CET
```

:::

![](https://itsfoss.com/content/images/wordpress/2017/02/piping-commands.png)

### 6. Typing less

When writing formal documentation, there is always some unusually long and complicated terms you have to repeat. It can be a brand or product name. Some location. A copyright notice. And so on. Obviously, each instance of those *big words* must be spelled correctly and using the exact same capitalization and punctuation. The abbreviation feature of Vim is a ust there

::: tabs

@tab:active Typed text

```plaintext title="Typed text"
apple was founded in 1977. 
The apple logo is an apple^V. 
```

> **Commands**
>
> - `^V`: <kbd>Ctrl</kbd>+<kbd>V</kbd>
> - `:ab apple Apple Computer, Inc.`: Introduce a new abbreviation
> - `i`: Switch to insert mode

@tab Result

```plaintext title="Result"
Apple Computer, Inc. was founded in 1977. 
The Apple Computer, Inc. logo is an apple.
```

:::

![](https://itsfoss.com/content/images/wordpress/2017/02/typing-less.png)

### 7. Getting help in Vim

Ok, there is Intenet. But people still using the *man*like me will appreciatethe *inline* help. You can obtain help by topic. Or by command. Always useful when you don’t remember the exact syntax or options for **Vim commands** — or if you’re unsure the command you need is a `normal` command or an `ex:` command.

::: info Try this!

- `:helphelp`
- `:helpm`
- `:help:m`

:::

### 8. Scripting in Vim

When using Vi(m) you’re basically using a *visual* front end to another underlying editor called *ex*. Maybe did you noticedhow many commands in the examples above starts by a colon(`:`)?That’s because those are *ex* commands. And this is yet another advantage of Vi(m) over so many text editors: not only you can use it *interactively* — but you can also *script* it.

Why wouldsomeone want to do that? Speaking for myself, I find that a great way to automate some text processing. Beside, you can see a typical example straight from my hard drive.

There is probably some mysterious commands in that ex script, but I can tell you this will remove any (eventually present) header from a script and will replace it by another one read from the NEW.HEADER file — adding a # before each added line. There is no doubt I could I’ve done that using other tools than ex. Indeed, that was even the subject of one of our [previous Bash Challenge](/itsfoss.com/bash-challenge-8.md). But ex *is*definitely an option.

::: note How mysterious…

- `ex some.script << EOT`
- `0pu\_`
- `1,/^\[^#\]/-1d`
- `0r NEW.HEADER`  
- `1,.s/^/# /`  
- `wq`
- `EOT`

:::

As I said it initially, this article was absolutely not a tutorial, nor an introduction to Vi(m). Just some **_Vim tips_** to show you *why* someone could still like that editor despite all other [modern code editors for Linux](/itsfoss.com/best-modern-open-source-code-editors-for-linux.md) available today. In some sense, I shared with you some of my favorite spells. But in the great tradition of wizardry, I didn’t unveil *how* exactly they work.

So, dear apprentices, don’t hesitate to use the comment section below to share your own incantations or countercharms — or if you dare, to explain those tricks!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "8 Vim Tips And Tricks That Will Make You A Pro User",
  "desc": "Brief: In this article, I’ll show you some of my favorites Vim tricks with practical examples.If you don’t use Vim, these tips might not give reasons for using Vim but if you use it already, you’ll definitely become a better Vim user. Even if I recently",
  "link": "https://chanhi2000.github.io/bookshelf/itsfoss.com/pro-vim-tips.html",
  "logo": "https://itsfoss.com/content/images/size/w256h256/2022/12/android-chrome-192x192.png",
  "background": "rgba(53,121,127,0.2)"
}
```
