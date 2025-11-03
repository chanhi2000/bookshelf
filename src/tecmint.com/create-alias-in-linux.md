---
lang: en-US
title: "How to Create Aliases (Shortcuts) for Common Commands in Linux"
description: "Article(s) > How to Create Aliases (Shortcuts) for Common Commands in Linux"
icon: iconfont icon-shell
category:
  - Shell
  - Linux
  - Debian
  - Article(s)
tag:
  - blog
  - tecmint.com
  - sh
  - shell
  - devops
  - linux
  - debian
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Create Aliases (Shortcuts) for Common Commands in Linux"
    - property: og:description
      content: "How to Create Aliases (Shortcuts) for Common Commands in Linux"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/tecmint.com/create-alias-in-linux.html
prev: /devops/linux-fedora/articles/README.md
date: 2025-07-30
isOriginal: false
author:
  - name: Marin Todorov
    url : https://tecmint.com/author/marintodorov89/
cover: https://tecmint.com/wp-content/uploads/2018/10/Create-Alias-in-Linux.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Linux - Fedora > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/linux-fedora/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Create Aliases (Shortcuts) for Common Commands in Linux"
  desc="In this article, we explain how to use Linux aliases to create shortcuts for frequently used terminal commands in Bash and other shells."
  url="https://tecmint.com/create-alias-in-linux"
  logo="https://tecmint.com/wp-content/uploads/2020/07/favicon.ico"
  preview="https://tecmint.com/wp-content/uploads/2018/10/Create-Alias-in-Linux.png"/>

Linux users often need to use one command over and over again. Typing or copying the same command over and over again reduces your productivity and distracts you from what you are supposed to be doing.

You can save yourself some time by [**creating aliases**](/tecmint.com/create-and-use-bash-aliases-in-linux.md) for your [**most commonly used commands**](/tecmint.com/most-used-linux-commands.md). Aliases are like custom shortcuts that represent a command (or set of commands) that can be executed with or without custom options. Chances are you are already using aliases on your Linux system without even knowing it.

---

## List Currently Defined Aliases in Linux

You can see a list of defined aliases on your profile by simply executing the **alias** command.

```sh{10} title="List Aliases in Linux"
alias
# 
# alias alert='notify-send --urgency=low -i "$([ $? = 0 ] && echo terminal || echo
# error) " "Ş(history|tail - n1|sed -e "|''s/^\s*[0-9]\+\s*//;s/[;&|]\s*alert$//'|'
# alias egrep='egrep - - color=auto'
# alias fgrep=' fgrep - -color=auto'
# alias grep='grep --color=auto'
# alias l='ls -CF'
# alias la='ls -A'
# alias ll='ls -alF'
# alias ls='ls --color=auto'
```

Here you can see the default aliases defined for your user in the **Ubuntu** system.

As you can see, executing the [**`ll` command**](/tecmint.com/ls-command-in-linux.md) is equivalent to running `ls -alF` command.

```sh
ll
# 
# drwxr-xr-x tecmint tecmint 4.0 KB Thu Jul 20 11:55:26 2023 ./
# drwxr-xr-x tecmint tecmint  68 KB Thu Jul 20 11:14:47 2023 ../
# .rw-rw-r-- tecmint tecmint  40 KB Mon May 29 10:55:48 2023 四 Git-Basics-for-Beginners.png
# .rw-rw-r-- tecmint tecmint  78 KB Fri May 26 09:59:33 2023 四 How to Fix "bash syntax error near unex
# ...
ls -alF
# 
# drwxr-xr-x tecmint tecmint 4.0 KB Thu Jul 20 11:55:26 2023 ./
# drwxr-xr-x tecmint tecmint  68 KB Thu Jul 20 11:14:47 2023 ../
# .rw-rw-r-- tecmint tecmint  40 KB Mon May 29 10:55:48 2023 四 Git-Basics-for-Beginners.png
# .rw-rw-r-- tecmint tecmint  78 KB Fri May 26 09:59:33 2023 四 How to Fix "bash syntax error near unex
# ...
```

![Listing Files in Linux](https://tecmint.com/wp-content/uploads/2018/10/Listing-Files-in-Linux.png)

You can create an alias with a single character that will be equivalent to a command of your choice.

---

## How to Create Aliases in Linux

Creating **aliases** is a relatively easy and quick process. You can create two types of **aliases** – **temporary** and **permanent**. We will review both types.

### Creating Temporary Aliases in Linux

What you need to do is type the word **alias** then use the name you wish to use to execute a command followed by `"="` sign and quote the command you wish to alias.

The syntax is as follows:

```sh
alias shortName="your custom command here"
```

Here is an actual example:

```sh
alias wr="cd /var/www/html"
```

You can then use `"wr"` shortcut to go to the webroot directory. The problem with that alias is that it will only be available for your current terminal session.

If you open a new terminal session, the alias will no longer be available. If you wish to save your aliases across sessions you will need a permanent alias.

### Creating Permanent Aliases in Linux

To keep **aliases** between sessions, you can save them in your user’s shell configuration profile file. This can be:

- Bash: <VPIcon icon="fas fa-folder-open"/>`~/`<VPIcon icon="fas fa-file-lines"/>`.bashrc`
- ZSH: <VPIcon icon="fas fa-folder-open"/>`~/`<VPIcon icon="fas fa-file-lines"/>`.zshrc`
- Fish: <VPIcon icon="fas fa-folder-open"/>`~/.config/fish/`<VPIcon icon="fas fa-file-lines"/>`config.fish`

The syntax you should use is practically the same as creating a temporary alias. The only difference comes from the fact that you will be saving it in a file this time. So for example, in bash, you can open a <VPIcon icon="fas fa-file-lines"/>`.bashrc` file with your favorite editor like this:

```sh
vim ~/.bashrc
```

Find a place in the file, where you want to keep the aliases. For example, you can add them at the end of the file. For organization purposes, you can leave a comment before your aliases something like this:

```sh
# My custom aliases
alias home=”ssh -i ~/.ssh/mykep.pem tecmint@192.168.0.100”
alias ll="ls -alF"
```

Save the file. The file will be automatically loaded in your next session. If you want to use the newly defined alias in the current session, issue the following command:

```sh
source ~/.bashrc
```

To remove an alias added via the command line can be unaliased using the unalias command.

```sh
unalias alias_name
unalias -a    # remove all alias>
```

---

## Optional: Use <VPIcon icon="fas fa-file-lines"/>`.bash_aliases` for Better Organization

In **Ubuntu** and some [**Debian-based systems**](/tecmint.com/debian-based-linux-distributions.md), it’s best practice to store your aliases in the <VPIcon icon="fas fa-file-lines"/>`.bash_aliases` file, which is sourced automatically by <VPIcon icon="fas fa-file-lines"/>`.bashrc` (unless explicitly disabled), which helps keep your <VPIcon icon="fas fa-file-lines"/>`.bashrc` clean and modular.

```sh
vim ~/.bash_aliases
```

Add your aliases here.

```sh title=".bash_aliases"
alias gs="git status"
alias c="clear"
```

Then reload:

```sh
source ~/.bash_aliases
```

::: tip Useful Aliases for Daily Linux Tasks

Here are some practical aliases developers and sysadmins often use:

```sh
alias gs="git status"
alias gp="git pull"
alias update="sudo apt update && sudo apt upgrade -y"
alias serve="python3 -m http.server"
alias ..="cd .."
alias ...="cd ../.."
```

:::

---

## Conclusion

This was a short example of how to create your own alias and execute frequently used commands without having to type each command again and again.

Now you can think about the commands you use the most and create shortcuts for them in your shell.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Create Aliases (Shortcuts) for Common Commands in Linux",
  "desc": "In this article, we explain how to use Linux aliases to create shortcuts for frequently used terminal commands in Bash and other shells.",
  "link": "https://chanhi2000.github.io/bookshelf/tecmint.com/create-alias-in-linux.html",
  "logo": "https://tecmint.com/wp-content/uploads/2020/07/favicon.ico",
  "background": "rgba(5,86,243,0.2)"
}
```
