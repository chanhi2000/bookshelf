---
lang: en-US
title: "10 Core Linux Interview Questions and Answers – Part 4"
description: "Article(s) > 10 Core Linux Interview Questions and Answers – Part 4"
icon: fa-brands fa-linux
category:
  - DevOps
  - Linux
  - Fedora
  - Debain
  - Article(s)
tag:
  - blog
  - tecmint.com
  - devops
  - linux
  - fedora
  - debian
head:
  - - meta:
    - property: og:title
      content: "Article(s) > 10 Core Linux Interview Questions and Answers – Part 4"
    - property: og:description
      content: "10 Core Linux Interview Questions and Answers – Part 4"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/tecmint.com/core-linux-interview-questions-and-answers.html
prev: /devops/linux-fedora/articles/README.md
date: 2025-07-10
isOriginal: false
author:
  - name: Ravi Saive
    url : https://tecmint.com/author/admin/
cover: https://tecmint.com/wp-content/uploads/2014/01/core-linux-shell-questions-answers.webp
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

```component VPCard
{
  "title": "Linux - Debian > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/linux-debian/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="10 Core Linux Interview Questions and Answers – Part 4"
  desc="In this Part 4, we’re bringing you 10 more core Linux questions, focused on shell commands, shortcuts, and real-world usage."
  url="https://tecmint.com/core-linux-interview-questions-and-answers"
  logo="https://tecmint.com/wp-content/uploads/2020/07/favicon.ico"
  preview="https://tecmint.com/wp-content/uploads/2014/01/core-linux-shell-questions-answers.webp"/>

Thanks again for the amazing response to [**Parts 1**](/tecmint.com/basic-linux-interview-questions-and-answers.md), [**2**](/tecmint.com/linux-interview-questions-and-answers..md), and [**3**](/tecmint.com/linux-interview-questions-and-answers-for-linux-beginners.md) of our **Linux Interview Questions** series here on Tecmint.

Your continued feedback and encouragement inspire us to keep creating content that’s practical, easy to digest, and super helpful, whether you’re just getting started or prepping for your next technical interview.

In this **Part 4**, we’re bringing you 10 more core Linux questions, focused on shell commands, shortcuts, and real-world usage. As always, the goal is to help you learn something new while keeping it light and beginner-friendly.

These questions are based on real-world tasks and scenarios I’ve come across in my day-to-day work as a Linux system administrator. This guide is helpful if you’re getting ready for a job interview, trying to get better at using the command line, or just want to learn something new about Linux.

---

## 1. How do you define a macro or bind a key to a command in Bash?

To define a macro or bind a key to a command in Bash, you can use the `bind` command, which is a built-in feature in Bash that allows you to assign custom commands to specific keys, essentially creating keyboard shortcuts.

First, you’ll need to figure out the escape sequence that your terminal sends when you press the key you want to bind. The easiest way to do this is by pressing `Ctrl + v`, followed by the key (for example, `F12`), which will print something like `^[[24~`, which is the escape code for that key.

Once you have the escape sequence, you can bind the key to a command using the following syntax:

```sh
bind '"\e[24~":"date"'
```

In this example, pressing `F12` will run the [**`date` command**](/tecmint.com/change-linux-system-date-and-time.md). Just keep in mind that escape sequences may differ depending on your terminal emulator, so the sequence for `F12` on one system might not be the same on another.

---

## 2. How do I list all available commands?

If you’re new to Linux or just curious about what commands are available in your environment, there’s a handy [**built-in Bash command**](/tecmint.com/essential-linux-commands.md) for that.

Simply type `compgen -c` in your terminal, which will output a complete list of all executable commands that your shell recognizes, including built-ins, aliases, and programs in your system’s PATH.

It’s a great way to explore and discover new tools you might not have known existed.

```sh
compgen -c
```

---

## 3. How can I print the directory stack?

To view the current directory stack in Linux, you can use the `dirs` command, which is particularly useful when you’re working with directory navigation using [**`pushd` and `popd`**](/tecmint.com/pushd-and-popd-linux-filesystem-navigation.md), as it shows the list of directories stored in the stack.

When you run `dirs`, it prints the directories in the order they were added, with the current directory listed first. For example, if you’ve used `pushd` to switch between directories, executing:

```sh
dirs
```

might return something like:

```sh
/usr/share/X11
```

This indicates that `/usr/share/X11` is currently at the top of the directory stack.

---

## 4. How do I remove all background jobs without restarting?

If you have a bunch of background or suspended jobs and you want to clean them up without rebooting your system, you can use the `disown -r` command in Bash, which tells the shell to remove all jobs (running or stopped) from its job table.

In simple terms, it detaches these jobs from the current shell session, so the shell no longer tracks or responds to them. It’s a neat way to tidy up without actually [**killing the processes**](/tecmint.com/find-and-kill-running-processes-pid-in-linux.md) or restarting the system.

```sh
disown -r
```

---

## 5. What does the hash command do in Bash?

The `hash` command in Bash is used to manage the shell’s internal hash table, which stores the full path of commands that have been executed. When you run a command, Bash looks it up in this table instead of searching through directories every time, which makes command execution faster.

By simply running `hash` in the terminal, you can see how many times each command has been used and which path Bash is using for it. For example, if you’ve run [**`ls`**](/tecmint.com/ls-command-in-linux.md) and `su` a couple of times, the output might look like this:

```sh
hits    command
   2    /bin/ls
   2    /bin/su
```

This is especially useful for checking which commands are frequently used and confirming that Bash is resolving them from the expected locations.

---

## 6. Which Bash command is used for integer arithmetic?

In Bash, the `let` command is commonly used to [**perform arithmetic operations**](/tecmint.com/awk-arithmetic-operations.md) on integers, which evaluates arithmetic expressions and is particularly useful in scripts where simple math is required.

For example, suppose you want to add two numbers:

```sh
let a=5
let b=10
let c=a+b
echo $c
```

This will output `15`, as it adds the values of `a` and `b` and stores the result in `c`. You can also use `let` with other operators like `-`, `*`, `/`, `%`, etc.

---

## 7. How do you view a large text file one page at a time?

When you’re dealing with a massive text file and don’t want everything to flood your terminal at once, you need a way to scroll through it page by page. A common method is to use the `more` command in combination with [**`cat`**](/tecmint.com/cat-command-linux.md), like this:

```sh
cat bigfile.txt | more
```

This works fine, showing one screen of text at a time, and lets you move forward with a key press. However, a better and more flexible option is to use the [**`less` command**](/tecmint.com/linux-more-command-and-less-command-examples.md) directly:

```sh
less bigfile.txt
```

The `less` command allows you to scroll both forward and backward, search within the file, and navigate with the arrow keys or page up/down. It’s widely considered the go-to tool for reading large files in the terminal.

---

## 8. Who owns the data dictionary in Linux (or a typical database)?

In **MySQL**, the data dictionary is managed internally by the MySQL server itself rather than being owned by a specific user, like in **Oracle**. However, the `root` user (the default administrative user) has full access to all databases, including system schemas that contain dictionary-like data.

**MySQL** stores metadata and system information in internal databases such as `mysql`, `information_schema`, and `performance_schema`. These schemas provide insights into users, permissions, system configuration, and table definitions, but they are controlled and maintained by the server, not by any individual database user.

---

## 9. How do I find out what a command does in Linux?

Let’s say you come across a command like `zcat` while exploring the `/bin` directory, and you have no idea what it does. Instead of blindly running it, there’s a safer and smarter way to learn about it.

Just use the `whatis` command, which gives you a brief, one-line description pulled directly from the command’s man page.

For example, you can run:

```sh
whatis zcat
```

And you’ll get an output like:

```plaintext title="output"
zcat (1) - compress or expand files
```

This short summary is super useful when you need a quick understanding of a command without diving deep into the [**full `man` page**](/tecmint.com/linux-man-pages.md).

---

## 10. How do you check disk quotas and the number of files used per user?

To view a summary of disk usage and user-specific file quotas, you can use the following command, which will scans all file systems listed in `/etc/mtab` that have quotas enabled and display the number of files (inodes) and the amount of disk space used by each user, along with their defined limits

```sh
repquota -a command
```

Just make sure that disk quotas are properly configured and active on your system; otherwise, the command won’t return meaningful results, which is especially useful in multi-user environments where managing resource limits is critical.

---

## Final Thoughts

That’s a wrap for now! These questions may seem simple, but they reflect real-life tasks and often pop up in interviews. Bookmark them, try them out, and share with your fellow Linux learners.

Until next time, keep exploring, keep experimenting, and stay tuned for more hands-on Linux and FOSS content!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "10 Core Linux Interview Questions and Answers – Part 4",
  "desc": "In this Part 4, we’re bringing you 10 more core Linux questions, focused on shell commands, shortcuts, and real-world usage.",
  "link": "https://chanhi2000.github.io/bookshelf/tecmint.com/core-linux-interview-questions-and-answers.html",
  "logo": "https://tecmint.com/wp-content/uploads/2020/07/favicon.ico",
  "background": "rgba(5,86,243,0.2)"
}
```
