---
lang: en-US
title: "Getting Started with RHEL: A Beginner’s Guide to Linux Basics"
description: "Article(s) > Getting Started with RHEL: A Beginner’s Guide to Linux Basics"
icon: fa-brands fa-redhat
category:
  - DevOps 
  - Linux
  - Fedora
  - Redhat
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - linux
  - fedora
  - redhat
  - rhel
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Getting Started with RHEL: A Beginner’s Guide to Linux Basics"
    - property: og:description
      content: "Getting Started with RHEL: A Beginner’s Guide to Linux Basics"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/guide-to-rhel-linux-basics.html
prev: /devops/linux-fedora/articles/README.md
date: 2025-01-11
isOriginal: false
author:
  - name: Tanishka Makode
    url : https://freecodecamp.org/news/author/tanishkamakode/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1736533985344/a521db07-d7eb-47db-a71c-4949e0761b9e.jpeg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Fedroa > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/linux-fedora/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Getting Started with RHEL: A Beginner’s Guide to Linux Basics"
  desc="Imagine an operating system so reliable that it powers the world’s biggest servers, the fastest supercomputers, and even the cloud infrastructure of leading tech companies. Welcome to Red Hat Enterprise Linux (RHEL) — the backbone of modern IT system..."
  url="https://freecodecamp.org/news/guide-to-rhel-linux-basics"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1736533985344/a521db07-d7eb-47db-a71c-4949e0761b9e.jpeg"/>

Imagine an operating system so reliable that it powers the world’s biggest servers, the fastest supercomputers, and even the cloud infrastructure of leading tech companies. Welcome to Red Hat Enterprise Linux (RHEL) — the backbone of modern IT systems.

Whether you’re a complete novice exploring Linux for the first time or an experienced professional looking to brush up on your basics, you’re in the right place. This tutorial is your starting point to uncover the power, stability, and versatility of RHEL.

But what makes RHEL stand out in the crowded Linux ecosystem? Why do companies like Google, Amazon, and NASA rely on it? Let’s dive in and explore everything you need to know to begin your journey with Red Hat Enterprise Linux.

---

## A Little Backstory

Have you ever wondered where it all began? Before there was Linux, there was **UNIX**, a revolutionary operating system created in the 1970s that changed the way computers worked. Designed for stability, multitasking, and scalability, UNIX became the foundation upon which modern operating systems were built.

Fast forward to 1991, when a 21-year-old Finnish computer science student named Linus Torvalds at the University of Helsinki decided to create his own operating system kernel as a hobby project. Little did he know, this hobby would evolve into Linux, a game-changing open-source operating system that would redefine the tech world.

Now here’s the fun part: how did Linux get its name? Originally, Linus wanted to call it “Freax” (a combination of “free,” “freak,” and “Unix”). But when he uploaded the project files to a server managed by his friend Ari Lemmke, Ari thought “Freax” didn’t sound appealing enough. So, without telling Linus, Ari named the directory “Linux” instead — a clever blend of **Linus + Unix**. And the rest, as they say, is history.

---

## What Makes Linux Special?

Unlike traditional operating systems, Linux was open-source, meaning anyone could view, modify, and distribute the code freely. This sparked a wave of innovation, allowing developers around the world to create their own versions of Linux, tailored to different needs.

What truly sets Linux apart is the global community of developers and enthusiasts who constantly improve and innovate. This collaborative approach ensures that Linux stays at the forefront of technology, evolving with the needs of its users.

Today, Linux isn’t just one operating system — it’s an entire family of distributions (or distros). From user-friendly versions like Ubuntu and Fedora to enterprise-grade solutions like RHEL, there’s a Linux for everyone. In this article, we’ll focus on RHEL and why it’s a great choice for certain projects.

If you want to explore the fascinating variety of Linux distros, you can check out this [<FontIcon icon="fa-brands fa-wikipedia-w"/>Wikipedia page on Linux distributions](https://en.wikipedia.org/wiki/Linux_distribution) to see just how diverse the Linux ecosystem is.

### Why Red Hat Enterprise Linux?

Red Hat Enterprise Linux (RHEL) is like the reliable, no-nonsense friend you call when you're organizing a big, important event.

Sure, you could ask your fun but unpredictable friends (like open-source Linux distros) to help, but there's always a chance they'll forget the chairs or crash halfway through the party.

RHEL, on the other hand, is built for stability and comes with a professional support team that’s on call 24/7 to fix anything that goes wrong. It’s tested thoroughly to make sure it works perfectly with all the tools and gadgets big companies use, so there are no surprises.

RHEL’s blend of reliability, security, performance, and support makes it the go-to operating system for enterprises, cementing its importance in the IT landscape.

Here’s a summary of RHEL’s benefits and features:

#### 1. Enterprise-Grade Stability and Reliability

RHEL is designed to meet the demands of mission-critical workloads, ensuring systems run consistently and predictably. Its long lifecycle support ensures businesses can rely on it without worrying about frequent upgrades or compatibility issues. This makes it an ideal choice for applications where downtime is unacceptable.

#### 2. Comprehensive Security Features

Security is paramount in enterprise environments, and RHEL excels with robust features such as SELinux (Security-Enhanced Linux) and regular security updates. The proactive approach to identifying and addressing vulnerabilities helps organizations comply with industry regulations and maintain the integrity of their systems.

#### 3. Scalability and Performance Optimization

RHEL is optimized to deliver high performance for a wide range of hardware architectures and workloads, including cloud, on-premises, and hybrid setups. Its ability to scale efficiently makes it suitable for small-scale applications as well as large data centers and enterprise-grade workloads.

#### 4. Extensive Ecosystem and Professional Support

RHEL benefits from Red Hat’s extensive ecosystem of certified hardware, software, and cloud providers. Enterprises have access to a wealth of tested and certified solutions, along with 24/7 support from Red Hat. This ensures any technical issues are resolved promptly, minimizing downtime and enhancing productivity.

---

## How to Set Up Your Practice Environment for Linux Commands

Before we jump into learning and practising Linux commands, you’ll need to set up an environment where you can run these commands. Here are three great options to consider:

### 1. Using the Terminal on Your Linux Machine

If you’re already using Linux, the terminal is your go-to interface for interacting with the system. All Linux commands are executed here, and it’s the ideal environment to start practising.

You can open the terminal and directly type your commands to see them in action.

### 2. Using **VMware or Oracle VirtualBox

If you don’t want to install Linux directly on your main machine, using a virtual machine (VM) is a great solution. Virtualization tools like VMware or Oracle VirtualBox allow you to run a full Linux distribution as a guest operating system without affecting your primary system. This way, you can experiment freely in an isolated environment.

#### How to use a VM

- Install [<FontIcon icon="iconfont icon-vmware"/>VMware Workstation Player](https://blogs.vmware.com/workstation/2024/05/vmware-workstation-pro-now-available-free-for-personal-use.html) or [<FontIcon icon="iconfont icon-virtualbox"/>Oracle VirtualBox](https://virtualbox.org/wiki/Downloads?) on your computer.
- Download the RHEL ISO Image. You can obtain the RHEL ISO by following these steps:
    1. Register for a Red Hat Developer Account (it’s free):
        - Go to the Red Hat Developer Program.
        - Create an account (it’s free for individual developers).
        - After registering, sign in to your Red Hat account.
    2. Download the ISO:
        - Visit the RHEL Download Page after logging in.
        - Choose the ISO image for RHEL (you may select the latest version).
        - Click Download and save the ISO file on your local system.

Once your VM is running, you can use it to practice commands and explore Linux.

### 3. KillerCoda: An Online Linux Environment

If you’re looking for an entirely online solution, KillerCoda is a fantastic option. It provides an interactive Linux terminal right in your browser, so you don’t need to install anything on your local machine.

Visit the [<FontIcon icon="fas fa-globe"/>KillerCoda](https://killercoda.com/pawelpiwosz/course/linuxFundamentals) website and you will see scenario-based lessons.

Now you should be all set.

---

## Introduction to Basic Linux Commands

One of the key features that makes Linux so versatile is its command-line interface (CLI). This is where you can interact with the system by typing commands. These commands allow you to perform a variety of tasks like managing files, directories, system resources, and much more.

Now, we’ll explore some essential Linux commands that every beginner should know. These commands are simple yet powerful tools that can help you navigate and manage your Linux environment efficiently.

### Basic Linux Commands

#### 1. `echo`

The `echo` command is used to display text or variables to the terminal. It is one of the most commonly used commands in Linux and is helpful for displaying messages, variable values, and even system information.

::: info `echo` syntax

```sh
echo [OPTION] [STRING]
```

:::

::: tip Example

```sh
echo Hello # Prints 'Hello' on terminal
echo -n Hey # Does not output a trailing newline

name="Tanishka"
echo "Hello, $name" # Prints variables
```

:::

Option `-e` allows echo commands to enable escape sequences.

Here are some other options you can use with `echo`:

1. `\n` - New line: Moves the output to the next line.
2. `\t` - Tab: Adds a tab space.
3. `\v` - Vertical Tab: Adds a tab as the cursor moves to the next vertical position.
4. `\b` - Backspace: Removes the last character.
5. `\\` - Backslash: Prints a backslash.

::: tip Example

```sh
echo -e "Hello World\nThis is a new line."
# Hello World
# This is a new line.

echo -e "Hello World\tThis is tabbed."
# Hello World    This is tabbed.

echo -e "Hello\vWorld\vThis is vertically spaced."
# Hello
#       World
#             This is vertically spaced.

echo -e "This is a backslash: \\"
# This is a backslash: \
```

:::

#### 2. `whoami`

The `whoami` command is used to display the username of the currently logged-in user.

::: info `whoami` syntax:

```sh
whoami
```

:::

::: tip Example

```sh
whoami #tanishkamakode
```

:::

#### 3. `pwd`

The `pwd` command is used to display the current working directory.

::: info `pwd` syntax:

```sh
pwd [OPTION]
```

:::

::: tip Example

```sh
pwd # /home/tanishkamakode
pwd -L # Displays logical current working directory i.e. shows symlinks (shortcut path ,if exists)
pwd -P # Displays physical current working directory i.e. shows resolved path (original path of shortcut ,if exists)
```

:::

#### 4. `ls`

The `ls` command is used to list the files and directories in the current working directory or specified directory.

::: info `ls` syntax:

```sh
ls [OPTION] [PATH]
```

:::

::: tip Example

```sh
ls # Lists files and directories at current working directory
```

:::

Here are some options you can use with `ls`:

- `ls -l`: Lists detailed information about files and directories
- `ls -lh`: Lists detailed information about files and directories with size in human readable format
- `ls -a`: Lists all hidden files
- `ls -R`: Lists recursive content of directory

#### 5. `date`

The `date` command is used to display or set the system date and time.

::: info `date` syntax

```sh
date [OPTION] [FORMAT_SPECIFIER]
```

:::

::: tip Example

```sh
date # Displays current date and time
date +"%d/%m/%Y" # Displays date month year
date +"%H:%M:%S" # Displays hours minutes seconds
date -u # Displays date in UTC time
date --set "2024-06-05" # Sets date to given YYYY-MM-DD
date -d "yesterday" # Displays yesterday's date
date -d "tomorrow" # Displays tomorrow's date
date -d "7 days" # Displays date of 7 days from today
```

:::

Options you can use with the date command:

1. `-u`: Displays date and time in UTC.
2. `-d`: Displays or sets the date/time to a specific string (e.g., "yesterday", "7 days ago").
3. `%d`: Day of the month (01 to 31).
4. `%m`: Month of the year (01 to 12).
5. `%y`: Last two digits of the year (00 to 99).
6. `%Y`: Full year (for example, 2025).

```sh
date -u # Displays date in UTC time
date -d "yesterday" # Displays yesterday's date
date -d "tomorrow" # Displays tommorow's date
date -d "7 days" # Displays date of 7 days from today
date +"%d/%m/%Y" # Displays date month year
date +"%H:%M:%S" # Displays hours minutes seconds
```

#### 6. `cal`

The `cal` command is used to display calendar details. If no options are given, the current month is displayed.

::: info `cal` syntax:

```sh
cal [OPTIONS]
```

:::

::: tip Example

```sh
cal # Displays current month calendar
cal --highlight # Highlights current date
```

:::

Options you can use with the `cal` command:

1. `--highlight`: Highlights the current date in the calendar.
2. `-3`: Displays the previous, current, and next month.
3. `-m`: Displays the current month in a multi-line format.
4. `-y`: Displays the calendar for the entire year.
5. `-A [N]`: Displays N months ahead of the current month.
6. `-B [N]`: Displays N months before the current month.
7. `cal [year]`: Displays the calendar for the entire year.
8. `cal [month] [year]`: Displays the calendar for the specified month and year.

```sh
cal 2024 # Displays the calendar for all months of 2024
cal 06 2024 # Displays the calendar for the 6th month (June) of 2024
cal -m # Displays the current month in multi-line format
cal -A 3 # Displays the 3 months ahead of the current month
cal -B 2 # Displays the 2 months before the current month
```

#### 7. `nl`

The `nl` command is used to add line number to file content.

::: info `nl` syntax:

```sh
nl [OPTIONS] [FILENAME]
```

:::

::: tip Example

```sh
nl file.txt # Displays file content with line numbers
nl -b a file.txt # Numbers all lines
nl -b t file.txt # Number non-empty lines only
nl -s ') ' file.txt # Adds a separator between the line number and the content -
# 1) First line
# 2) Second line
```

:::

As you can see in the code above, there are other options you can use with the `nl` command, too.

### File Creation and Handling Commands

#### 1. `touch`

The `touch` command is used to create an empty file or update the last modified time if a file exists.

::: info `touch` syntax:

```sh
touch [OPTIONS] [FILENAME]
```

:::

::: tip Example

```sh
touch file.txt # Creates a single file - file.txt
touch file1.txt file2.txt file3.txt # Creates multiple files
touch file{1..10}.txt # Creates files with given range names (file1.txt file2.txt upto file10.txt)
```

:::

#### 2. `cat`

The `cat` command concatenates files and also displays the content of files.

::: info `cat` syntax:

```sh
cat [OPTIONS] [FILENAME]
```

:::

::: tip Example

```sh
cat file.txt # Displays content of file.txt
cat file1.txt file2.txt > merged.txt # Overrides content of two files in merged.txt
cat file1.txt >> file2.txt # Appends content of first file to second file
cat -n file.txt # Displays the content along with line numbers

cat > file.txt OR cat >> file.txt # > for overriding, >> for appending
# This allows you to create a new file with a prompt to enter the content
# If file already exists, teminal will read the content you enter.
# Once you’re done with writing content,
# press Ctrl + D (detach).
# Or Ctrl + C but make sure you enter this on new line
# or else current line content will not be appended to the file.
```

:::

### Directory Creation and Handling

#### 1. `mkdir`

The `mkdir` command is used to create a directory.

::: info `mkdir` syntax

```sh
mkdir [OPTIONS] [DIRECTORYNAME]
```

:::

::: tip Example

```sh
mkdir folder # Creates a single directory
mkdir fol1 fol2 fol3 # Creates multiple directories
mkdir fol{1..10} # Creates directories with given range names
mkdir -p /myData/data # Creates nested directories
ls -R /myData # Verify if nested directories created
mkdir -v fol1 fol2 fol3 # Verbose mode i.e confirmation of directory creation on terminal
```

:::

#### 2. `cd`

The `cd` command is used to change the directory - that is, to navigate between directories.

::: info `cd` syntax:

```sh
cd [DIRECTORY]
```

:::

::: tip Example

```sh
cd myFolder # Relative path, starting from current directroy
cd /home/myFolder # Absolute path, starting from root /
cd .. # Goes to one level above current directory
cd ../.. # Goes to two level above current directory
cd OR cd ~ # Goes to home directory
cd - # Switched to directory you were in previously
```

:::

### Copy, Move, and Remove Files and Directories

#### 1. `cp`

The `cp` command is used to copy files and directories from one location to another.

::: info `cp` syntax

```sh
cp [OPTIONS] [SOURCE] [DESTINATION]
```

:::

::: tip Example

```sh
cp myFile.txt /home/newFolder # Copies myFile.txt to newFolder
cp myFile1.txt myFile2.txt /home/newFolder # Copies multiple files to newFolder
cp -r oldData /home/newData # Recursively copies content of oldData directory to newData directory
cp -i file.txt /home/Folder # Asks for confirmation while overriding file.txt that already exists in Folder
cp -v oldData /home/newData # Verbose output i.e. confirmation of copying the directory 
cp -f file.txt /newFolder # Copies the file forecfully
```

#### 2. `mv`

The `mv` command is used to move files and directories from one location to another. It is also used to rename a file or a directory.

::: info `mv` syntax

```sh
mv [OPTIONS] [SOURCE] [DESTINATION]
```

:::

::: tip Example

```sh
mv myFile.txt /home/newFolder # Moves myFile to newFolder
mv myFile1.txt myFile2.txt /home/newFolder # Moves multiple files to newFolder
mv -i file.txt /home/sample # Asks before overriding the file.txt that already exists in sample
mv -v oldData /home/sample # Verbose mode i.e. confirmation of moving directory oldData in sample directory
mv oldFile.txt newFile.txt # Renames the file
```

:::

#### 3. `rm`

The `rm` command is used to remove files and directories.

::: info `rm` syntax:

```sh
rm [OPTIONS] [FILENAME OR DIRECTORYNAME]
```

:::

::: tip Example

```sh
rm file.txt # Removes single file
rm file1.txt file2.txt # Removes multiple files
rm emptyDir # Won't work for empty directory (Next command will handle this case!)
rm -r myData # Removed a non-empty directory recursively
rm -r -i myData # Asks for confirmation before deleting each file
rm -r -f myData # Removes a non-empty directory recursively without confirmation
rm -r -f -v myData # Removes a non-empty directory recursively without confirmation in verbose mode
```

:::

#### 4. `rmdir`

The `rmdir` command is used to remove empty directories only.

::: info `rmdir` syntax

```sh
rmdir [OPTIONS] [FILENAME OR DIRECTORYNAME]
```

:::

::: tip Example

```sh
rmdir emptyDir # Removes empty directory emptyDir
rmdir myDir1 myDir2 myDir3 # Removes multiple empty directories
rmdir myDir # Won't work for non-empty directories (Use 'rm -r dir_name' for this case!)
```

:::

---

## Final Words

Congratulations! You've successfully learned the basics of Red Hat Enterprise Linux (RHEL) and the essential commands that form the foundation of Linux systems.

Keep practicing these commands, and soon they'll become second nature to you. Mastery comes with repetition, so continue experimenting and applying these fundamentals in real-world scenarios.

Stay tuned for more articles. Get ready to take your RHEL skills to the next level.

<SiteInfo
  name="Tanishka Makode | Twitter | Linktree"
  desc="Let's connect!"
  url="https://linktr.ee/tanishkamakode/"
  logo="https://assets.production.linktr.ee/profiles/_next/static/logo-assets/favicon-16x16.png"
  preview="https://linktr.ee/og/image/tanishkamakode.jpg"/>

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Getting Started with RHEL: A Beginner’s Guide to Linux Basics",
  "desc": "Imagine an operating system so reliable that it powers the world’s biggest servers, the fastest supercomputers, and even the cloud infrastructure of leading tech companies. Welcome to Red Hat Enterprise Linux (RHEL) — the backbone of modern IT system...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/guide-to-rhel-linux-basics.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
