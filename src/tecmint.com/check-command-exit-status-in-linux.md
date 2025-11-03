---
lang: en-US
title: "How to Check Exit Status for Command in Linux"
description: "Article(s) > How to Check Exit Status for Command in Linux"
icon: iconfont icon-shell
category:
  - Shell
  - Article(s)
tag:
  - blog
  - tecmint.com
  - linux
  - sh
  - shell
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Check Exit Status for Command in Linux"
    - property: og:description
      content: "How to Check Exit Status for Command in Linux"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/tecmint.com/check-command-exit-status-in-linux.html
prev: /programming/sh/articles/README.md
date: 2025-09-05
isOriginal: false
author:
  - name: Ravi Saive
    url : https://tecmint.com/author/admin/
cover: https://tecmint.com/wp-content/uploads/2025/09/Check-Command-Exit-Status-in-Linux.webp
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
  name="How to Check Exit Status for Command in Linux"
  desc="Learn what Linux exit status codes mean, how to check them using $?, and how they help in shell scripting with success & error examples."
  url="https://tecmint.com/check-command-exit-status-in-linux"
  logo="https://tecmint.com/wp-content/uploads/2020/07/favicon.ico"
  preview="https://tecmint.com/wp-content/uploads/2025/09/Check-Command-Exit-Status-in-Linux.webp"/>

When working on a Linux system, every command you run returns a `status code` (also called an `exit status` or `return code`) that tells you whether it ran successfully or failed.

As a Linux user, especially if you’re [<VPIcon icon="fas fa-globe"/>learning shell scripting](https://pro.tecmint.com/learn-bash-scripting) or troubleshooting, knowing how to check the **exit status** of a command is super important.

In this article, I’ll explain what **exit status** means, how to check it, and why it matters.

---

## What is Exit Status in Linux?

Whenever you [**run a command in Linux**](/tecmint.com/essential-linux-commands.md), the system quietly gives it a **scorecard** at the end, which is just a number called the **exit status** (or **return code**).

- If the number is `0`, it means, the command ran successfully, without any errors.
- If the number is not `0`, it means, the command failed to run in some way.

Think of it like this:

- `0` = “All good!”
- `1` = “Something went wrong (general error)”
- `2`, `127`, `126`, etc. = Different kinds of problems, like “**file not found**” or “**command not executable**“.

You don’t always see these numbers printed on the screen, but Linux stores them in a special variable called `$?`. You can check it anytime to know whether your last command worked or failed.

::: tip

These **exit codes** are especially important when you write Bash scripts because they help you make decisions depending on whether a command passed or failed.

:::

---

## How to Check Exit Status of a Command

In Linux, the **exit status** of the **last command** you ran is stored in a special shell variable called:

```sh
$?
```

The best way to understand **exit status** is by actually running commands.

### Example 1: Successful Command

```sh
ls
echo $?
```

::: info What happens here:

- First, `ls` lists the files in your current directory.
- Since the command worked without any issue, Linux sets the exit status to `0`.
- When we immediately check the status using `echo $?`, it prints `0`.

![Check Command Exit Status in Linux](https://tecmint.com/wp-content/uploads/2025/09/Check-Command-Exit-Status.png)

:::

A `0` exit code always means success. So in this case, the [**`ls` command**](/tecmint.com/ls-command-in-linux.md) did exactly what we expected.

### Example 2: Failed Command

```sh
ls /nonexistent
echo $?
```

::: info What happens here:

- We tried to list files inside a directory called `/nonexistent`.
- That directory does not exist on the system, so the `ls` command fails.
- Linux then sets the exit status to a non-zero number (in this case `2`).
- When we check with `echo $?`, we see:

![Check Exit Status of Failed Commands in Linux](https://tecmint.com/wp-content/uploads/2025/09/Check-Exit-Status-of-Failed-Commands-in-Linux.png)

:::

### Example 3: Using Exit Status in a Script

Exit statuses become really useful when you use them inside shell scripts, because scripts often need to make decisions based on whether a command succeeded or failed.

Let’s look at a simple example:

```sh
#!/bin/bash

ls /etc > /dev/null
if [ $? -eq 0 ]; then
    echo "Command successful!"
else
    echo "Command failed!"
fi
```

::: info What happens here:

- If the `ls` command works → prints “**Command successful!**”.
- If it fails → prints “**Command failed!**”.

:::

### A Cleaner Way: Using && and ||

Instead of checking `$?` every time, you can chain commands:

- `command && echo "Success"` → runs the second command **only if the first succeeded**.
- `command || echo "Failed"` → runs the second command **only if the first failed**.

::: tip Example

```sh
ls /etc && echo "Found it!" || echo "Not found!"
```

:::

::: details Common Exit Status Codes

Here are some frequently seen exit codes:

| Exit Code | Meaning |
| --- | --- |
| `0` | Success |
| `1` | General error |
| `2` | Misuse of shell command |
| `126` | Command found but not executable |
| `127` | Command not found |
| `130` | Script terminated by Ctrl+C |
| `255` | Exit status out of range |

:::

---

## Final Thoughts

The **exit status** is a small number, but it plays a big role in running commands interactively or writing shell scripts, understanding exit codes helps you debug problems and control your workflow.

Next time a command doesn’t work as expected, don’t just look at the error message, just check the **exit status** too!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Check Exit Status for Command in Linux",
  "desc": "Learn what Linux exit status codes mean, how to check them using $?, and how they help in shell scripting with success & error examples.",
  "link": "https://chanhi2000.github.io/bookshelf/tecmint.com/check-command-exit-status-in-linux.html",
  "logo": "https://tecmint.com/wp-content/uploads/2020/07/favicon.ico",
  "background": "rgba(5,86,243,0.2)"
}
```
