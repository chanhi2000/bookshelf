---
lang: en-US
title: "An Introduction to the Linux Terminal"
description: "Article(s) > An Introduction to the Linux Terminal"
icon: iconfont icon-shell
category:
  - Shell
  - Article(s)
tag:
  - blog
  - digitalocean.com
  - sh
  - shell
head:
  - - meta:
    - property: og:title
      content: "Article(s) > An Introduction to the Linux Terminal"
    - property: og:description
      content: "An Introduction to the Linux Terminal"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/digitalocean.com/an-introduction-to-the-linux-terminal.html
prev: /programming/sh/articles/README.md
date: 2014-11-15
isOriginal: false
author:
  - name: Mitchell Anicas
    url: https://digitalocean.com//community/users/manicas
cover: https://community-cdn-digitalocean-com.global.ssl.fastly.net/oEuFmi4ntgxcSdj79jgypZro
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
  name="An Introduction to the Linux Terminal"
  desc="This tutorial covers getting started with the terminal, the Linux command line, and executing commands. If you are new to Linux, you will want to familiarize… "
  url="https://digitalocean.com/community/tutorials/an-introduction-to-the-linux-terminal"
  logo="https://digitalocean.com/_next/static/media/favicon.594d6067.ico"
  preview="https://community-cdn-digitalocean-com.global.ssl.fastly.net/oEuFmi4ntgxcSdj79jgypZro"/>

This tutorial, which is the first in a series that teaches Linux fundamentals, covers getting started with the terminal, the Linux command line, and executing commands. If you are new to Linux, you will want to familiarize yourself with the terminal, as it is the standard way to interact with a Linux server.

If you would like to get the most out of this tutorial, you will need a Linux server to connect to and use. If you do not already have one, you can quickly spin one up by following this link: [<VPIcon icon="fa-brands fa-digital-ocean"/>How To Create A DigitalOcean Droplet](https://docs.digitalocean.com/products/droplets/how-to/create/). This tutorial is written for an Ubuntu 22.04 server but the general principles apply to any other distribution of Linux.

Let’s get started by going over what a terminal emulator is.

---

## Terminal Emulator

A terminal emulator is a program that allows the use of the terminal in a graphical environment. As most people use an OS with a graphical user interface (GUI) for their day-to-day computer needs, the use of a terminal emulator is a necessity for most Linux server users.

Here are some free, commonly-used terminal emulators by operating system:

- **Mac OS X**: Terminal (default), iTerm 2
- **Windows**: ConEmu, Windows Terminal, PuTTy
- **Linux**: Gnome Terminal, Konsole, XTerm

Each terminal emulator has its own set of features. In general, you should expect a modern terminal emulator to support tabbed windows and text highlighting.

---

## The Shell

In a Linux system, the *shell* is a command-line interface that interprets a user’s commands and script files, and tells the server’s operating system what to do with them. There are several shells that are widely used, such as the *Bourne-Again shell* (`bash`) and *Z shell* (`zsh`). Each shell has its own feature set and intricacies regarding how commands are interpreted, but they all feature input and output redirection, variables, and condition-testing, among other things.

This tutorial was written using the *Bourne-Again shell*, usually referred to as `bash`, which is the default shell for most Linux distributions, including Ubuntu, Fedora, and RHEL.

---

## The Command Prompt

When you first login to a server, you will typically be greeted by the *Message of the Day* (MOTD), which is typically an informational message that includes miscellaneous information such as the version of the Linux distribution that the server is running. After the MOTD, you will be dropped into the command prompt, or shell prompt, which is where you can issue commands to the server.

The information that is presented at the command prompt can be customized by the user, but here is an example of the default Ubuntu 20.04 command prompt:

```sh
sammy@webapp:~$
```

Here is a breakdown of the composition of the command prompt:

- `sammy`: The *username* of the current user
- `webapp`: The *hostname* of the server
- `~`: The *current directory*. In `bash`, which is the default shell, the `~`, or tilde, is a special character that expands to the path of the current user’s *home directory*; in this case, it represents <VPIcon icon="fas fa-folder-open"/>`/home/sammy`
- `$`: The prompt symbol. This denotes the end of the command prompt, after which the user’s keyboard input will appear

Here is an example of what the command prompt might look like, if logged in as `root` and in the <VPIcon icon="fas fa-folder-open"/>`/var/log` directory:

```sh
root@webapp:/var/log#
```

Note that the symbol that ends the command prompt is a `#`, which is the standard prompt symbol for `root`. In Linux, the `root` user is the *superuser* account, which is a special user account that can perform system-wide administrative functions. It is an unrestricted user that has permission to perform any task on a server.

---

## Running Commands

Commands can be issued at the command prompt by specifying the name of an executable file, which can be a binary program or a script. There are many standard Linux commands and utilities that are installed with the OS, that allow you to navigate the file system, install and software packages, and configure the system and applications.

An instance of a running command is known as a **process**. When a command is executed in the *foreground*, which is the default way that commands are executed, the user must wait for the process to finish before being returned to the command prompt, at which point they can continue issuing more commands.

It is important to note that almost everything in Linux is case-sensitive, including file and directory names, commands, arguments, and options. If something is not working as expected, double-check the spelling and case of your commands!

Here are a few examples that will cover the fundamentals of executing commands.

::: note

If you’re not already connected to a Linux server, now is a good time to log in. If you have a Linux server but are having trouble connecting, follow this link: [<VPIcon icon="fa-brands fa-digital-ocean"/>How to Connect to Your Droplet with SSH](https://docs.digitalocean.com/products/droplets/how-to/connect-with-ssh/).

:::

### Without Arguments or Options

To run a command without any arguments or options, type in the name of the command and press <kbd>Enter</kbd>.

If you run a command like this, it will exhibit its default behavior, which varies from command to command. For example, if you run the `cd` command without any arguments, you will be returned to your current user’s home directory. The `ls` command will print a listing of the current directory’s files and directories. The `ip` command without any arguments will print a message that shows you how to use the `ip` command.

Try running the `ls` command with no arguments to list the files and directories in your current directory (there may be none):

```sh
ls
```

### With Arguments

Many commands accept *arguments*, or *parameters*, which can affect the behavior of a command. For example, the most common way to use the `cd` command is to pass it a single argument that specifies which directory to change to. For example, to change to the <VPIcon icon="fas fa-folder-open"/>`/usr/bin` directory, where many standard commands are installed, you would issue this command:

```sh
cd /usr/bin
```

The `cd` component is the command, and the first argument <VPIcon icon="fas fa-folder-open"/>`/usr/bin` follows the command. Note how your command prompt’s current path has been updated.

Try running the `ls` command to see the files that are in your new current directory.

```sh
ls
#
# grub-mkrescue                        sdiff                              zgrep
# grub-mkstandalone                    sed                                zipdetails
# grub-mount                           see                                zless
# grub-ntldr-img                       select-editor                      zmore
# grub-render-label                    semver                             znew
# grub-script-check                    sensible-browser
```

### With Options

Most commands accept *options*, also known as *flags* or *switches*, that modify the behavior of the command. Options follow a command, and are indicated by a single `-` character followed by one or more *options*, which are represented by individual upper- or lower-case letters. Some multi-word options can start with `--`, followed by the flag text.

For an example of how options work, let’s look at the `ls` command. Here are a couple of common options that come in handy when using `ls`:

- `-l`: print a “long listing”, which includes extra details such as permissions, ownership, file sizes, and timestamps
- `-a`: list *all* of a directory’s files, including hidden ones (that start with `.`)

To use the `-l` flag with `ls`, use this command:

```sh
ls -l
```

Note that the listing includes the same files as before, but with additional information about each file.

As mentioned earlier, options can often be grouped together. If you want to use the `-l` and `-a` option together, you could run `ls -l -a`, or just combine them like in this command:

```sh
ls -la
```

Note that the listing includes the hidden `.` and `..` directories in the listing, because of the `-a` option.

### With Options and Arguments

Options and arguments can almost always be combined, when running commands.

For example, you could check the contents of <VPIcon icon="fas fa-folder-open"/>`/home`, regardless of your current directory, by running this `ls` command:

```sh
ls -la /home
```

`ls` is the command, `-la` are the options, and <VPIcon icon="fas fa-folder-open"/>`/home` is the argument that indicates which file or directory to list. This should print a detailed listing of the <VPIcon icon="fas fa-folder-open"/>`/home` directory, which should contain the home directories of all of the normal users on the server.

---

## Environment Variables

Environment variables are named values that are used to change how commands and processes are executed. When you first log in to a server, several environment variables will be set according to a few configuration files by default.

### View All Environment Variables

To view all of the environment variables that are set for a particular terminal session, run the `env` command.

There will likely be a lot of output. Look for the `PATH` entry:

```sh
env
#
# PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games
```

The `PATH` environment variable is a colon-delimited list of directories where the shell will look for executable programs or scripts when a command is issued. For example, the `env` command is located in <VPIcon icon="fas fa-folder-open"/>`/usr/bin`, and you are able to run it without specifying its full path because its path is in the `PATH` environment variable.

### View the Value of a Variable

The value of an environment variable can be retrieved by prefixing the variable name with a `$`. This will *expand* the referenced variable to its value.

For example, to print out the value of the `PATH` variable, you may use the `echo` command:

```sh
echo $PATH
```

Or you could use the `HOME` variable, which is set to your user’s home directory by default, to change to your home directory like this:

```sh
cd $HOME
```

If you try to access an environment variable that hasn’t been set, it will be expanded to nothing; an empty string.

### Setting Environment Variables

Now that you know how to view your environment variables, you should learn how to set them.

To set an environment variable, all you need to do is start with a variable name, followed immediately by an `=` sign, followed immediately by its desired value:

```sh
VAR=value
```

Note that if you set an existing variable, the original value will be overwritten. If the variable did not exist in the first place, it will be created.

Bash includes a command called `export` which exports a variable so it will be inherited by child processes. This allows you to use scripts that reference an exported environment variable from your current session.

You can also reference existing variables when setting a variable. For example, if you installed an application to <VPIcon icon="fas fa-folder-open"/>`/opt/app/bin`, you could add that directory to the end of your `PATH` environment variable with this command:

```sh
export PATH=$PATH:/opt/app/bin
```

Now verify that <VPIcon icon="fas fa-folder-open"/>`/opt/app/bin` has been added to the end of your `PATH` variable with `echo`:

```sh
echo $PATH
```

Keep in mind that setting environment variables in this way only sets them for your current session. This means if you log out or otherwise change to another session, the changes you made to the environment will not be preserved. There is a way to permanently change environment variables, but this will be covered in a later tutorial.

---

## Conclusion

Now that you have begun to learn about the Linux terminal (and a few commands), you should have a good foundation for expanding your knowledge of Linux commands. Read the [**next tutorial in this series**](/digitalocean.com/basic-linux-navigation-and-file-management.md) to learn how to navigate, view, and edit files and their permissions.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "An Introduction to the Linux Terminal",
  "desc": "This tutorial covers getting started with the terminal, the Linux command line, and executing commands. If you are new to Linux, you will want to familiarize… ",
  "link": "https://chanhi2000.github.io/bookshelf/digitalocean.com/an-introduction-to-the-linux-terminal.html",
  "logo": "https://digitalocean.com/_next/static/media/favicon.594d6067.ico",
  "background": "rgba(44,103,246,0.2)"
}
```
