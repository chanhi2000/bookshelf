---
lang: en-US
title: "Learn User Management in RHEL: A Comprehensive Guide"
description: "Article(s) > Learn User Management in RHEL: A Comprehensive Guide"
icon: fa-brands fa-redhat
category:
  - DevOps
  - Linux
  - Fedora
  - RedHat
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - linux
  - fedora
  - redhat
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Learn User Management in RHEL: A Comprehensive Guide"
    - property: og:description
      content: "Learn User Management in RHEL: A Comprehensive Guide"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/learn-user-management-in-rhel-a-comprehensive-guide.html
prev: /devops/linux-fedora/articles/README.md
date: 2025-02-19
isOriginal: false
author:
  - name: Tanishka Makode
    url : https://freecodecamp.org/news/author/tanishkamakode/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1739971027992/d19c4616-4c2e-4cc4-ac45-384e6520d1a8.png
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
  name="Learn User Management in RHEL: A Comprehensive Guide"
  desc="Imagine you're throwing a house party. You wouldn’t hand out keys to every guest, right? Some friends can roam freely, some should probably stick to the living room, and a few—well, let’s just say they need supervision. Managing users in RHEL is kind..."
  url="https://freecodecamp.org/news/learn-user-management-in-rhel-a-comprehensive-guide"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1739971027992/d19c4616-4c2e-4cc4-ac45-384e6520d1a8.png"/>

Imagine you're throwing a house party. You wouldn’t hand out keys to every guest, right? Some friends can roam freely, some should probably stick to the living room, and a few—well, let’s just say they need supervision.

Managing users in RHEL is kind of like that. You decide who gets in, what they can do, and how much control they have. Without proper management, things can get messy fast—like that friend who somehow DJs when no one asks.

So, let’s dive into user management and ensure your Linux system stays organized, secure, and drama-free! 🚀

---

## What is a User in Linux?

A user in Linux is an account that allows someone (or a process) to interact with the system. Since Linux is a multi-user operating system, multiple users can exist on the same system, each with their own settings, files, and permissions. Users can have different levels of permissions, which determine what they can access or modify on the system.

Linux categorizes users into three main types based on their roles and privileges:

1. Privileged Users: These users have unrestricted access to the entire system. They have the highest level of permissions and can perform any operation on the system. They can install/remove software, modify system files, create/manage users, and even delete everything. These users are also called root users.
2. System Users: The system creates these users to run background processes or services. They can’t login like a normal user. Their sole purpose is to manage system operations like databases, web servers and scheduled tasks.
3. Normal Users: These are the everyday users created by administrators or during system installation. They have their home directory and can store personal files and settings. They can’t modify system files but can execute tasks within their permission scope.

### Understanding `sudo` in User Management

The `sudo` (Superuser Do) command allows a regular user to execute administrative tasks with elevated privileges. Since user management tasks—such as adding, modifying, or deleting users—require root access, normal users must use `sudo` before these commands.

Note that the following commands are executed as the root user. If you are using a normal user account, you must prefix them with `sudo` to perform user management tasks.

Now let’s see how we manage users on RHEL.

---

## User Management Commands in Linux

### How to add a user

To create a new user account, use following command:

::: info Syntax

```sh
useradd [user_name]
```

::: tip Example

```sh
useradd Tanishka # Root user
sudo useradd Tanishka # Normal user
```

:::

Once you create a user, you can verify its existence in the <FontIcon icon="fas fa-folder-open"/>`/etc/`<FontIcon icon="fas fa-file-lines"/>`passwd` file. This file stores essential user account information (but **not passwords**, despite the name).

#### How to check if a user is created

To confirm the user entry in <FontIcon icon="fas fa-folder-open"/>`/etc/`<FontIcon icon="fas fa-file-lines"/>`passwd`, use one of the following methods:

::: tabs

@tab:active 1.

View the file using `cat` or `grep`

```sh
cat /etc/passwd # Displays entire file content
grep Tanishka /etc/passwd # Displays information about Tanishka user only
```

@tab 2.

Use `id` command

The `id` command is used to display a user’s **UID (User ID), GID (Group ID), and the groups they belong to**. It helps in verifying user information and checking permissions.

```sh
id Tanishka
# Displays user id of Tanishka,
# hence verifying user has been created
```

:::

Let’s understand what’s going on in the <FontIcon icon="fas fa-folder-open"/>`/etc/`<FontIcon icon="fas fa-file-lines"/>`passwd` fields. Each line in <FontIcon icon="fas fa-folder-open"/>`/etc/`<FontIcon icon="fas fa-file-lines"/>`passwd` represents a user account and contains seven fields separated by colons (`:`):

```sh
username:x:UID:GID:comment:home_directory:shell
```

| **Field** | **Description** |
| --- | --- |
| `username` | Name of the user (for example, john, admin). |
| `x` | Placeholder for the password (actual password is stored in /etc/shadow). |
| `UID` | User ID (for example, 1001 for a normal user, 0 for root). |
| `GID` | Group ID (primary group of the user). |
| `comment` | Optional user description (for example, full name or other info). |
| `home_directory` | User’s home directory (for example <FontIcon icon="fas fa-folder-open"/>`/home/john`). |
| `shell` | The default shell assigned to the user (for example, /bin/bash, /bin/sh, /usr/sbin/nologin). |

### How to Assign a Password

Once an account is created, it’s essential to assign a password to the account. Otherwise, that account can’t be logged in through a GUI login interface. To give a password to a user account, user this command:

::: info Syntax

```sh
passwd [user_name]
```

:::

::: tip Example

```sh
passwd Tanishka
```

:::

You will be prompted to enter the password. Enter the password and you’re all set! Even though user information is stored in <FontIcon icon="fas fa-folder-open"/>`/etc/`<FontIcon icon="fas fa-file-lines"/>`passwd` file, actual information about the password is stored in the <FontIcon icon="fas fa-folder-open"/>`/etc/`<FontIcon icon="fas fa-file-lines"/>`shadow` file (weird, I know…).

To see the content of the <FontIcon icon="fas fa-folder-open"/>`/etc/`<FontIcon icon="fas fa-file-lines"/>`shadow` file, use this command:

```sh
cat /etc/shadow
```

Each line in <FontIcon icon="fas fa-folder-open"/>`/etc/`<FontIcon icon="fas fa-file-lines"/>`shadow` represents a user account password and contains nine fields separated by colons (`:`):

```sh
username:password:lastchg:min:max:warn:inactive:expire:reserved
```

| Field | Description |
| --- | --- |
| `username` | User’s login name |
| `password` | Encrypted password or password status (for example, locked) |
| `lastchg` | Last password change (days since Jan 1, 1970) |
| `min` | Minimum days between password changes |
| `max` | Maximum days before password change is required |
| `warn` | Warning period before password expiration |
| `inactive` | Inactive period after password expiration |
| `expire` | Account expiration date (days since Jan 1, 1970) |
| `reserved` | Reserved for future use |

To change password aging information, you use the `chage` (short for change age) command like this:

::: info Syntax

```sh
chage [OPTIONS] [user_name]
```

:::

::: tip Example

```sh
chage -l tanishka # Lists the current password aging information
chage -m 10 tanishka # Sets the minimum days to change password
chage -M 10 tanishka # Sets the maximum days password must be changed
chage -W 7 tanishka # Sets the number of days before the password expires that the user will be warned to change the password
chage -I 10 tanishka # Sets the number of days after password expiration that the account will be disabled if not logged in
chage -E 2025-12-31 tanishka # Sets the date when the user account will expire 
chage -d 2024-12-25 tanishka # Sets the last password change date
```

:::

Now that you have learned to create users and assign passwords, you need to know how to switch between users. Let’s see that now.

### How to Switch Users

The `su` (Substitute User) command allows you to **switch from one user to another** without logging out of the current session.

::: info Syntax

```sh
su - [user_name]
```

:::

::: tip Example

```sh
su - Tanishka # Switches to Tanishka user
```

- `su` stands for "substitute user" (or "switch user").
- The `-` (hyphen) loads the target user's full environment, including their shell, path, and profile settings (similar to logging in as that user).
- If no username is provided, it switches to the root user by default.

:::

To return to original or root user, simply enter `exit`.

### Understanding Groups in Linux

Just like a party where guests can belong to different social circles, Linux groups allow users to be part of different permission levels. Groups help manage file access, system privileges, and administrative controls efficiently.

Linux has two types of groups:

#### 1. Primary Group:

- Every user has one primary group.
- When a user creates a new file, it belongs to their primary group.
- It is usually named the same as the username.

#### 2. Secondary Groups:

- A user can belong to multiple secondary groups.
- These groups provide additional permissions beyond the primary group.
- Users can be assigned to various secondary groups to access shared resources.

To check a user’s group membership:

```sh
id [user_name]
```

This displays the user’s UID, primary group (GID), and any secondary groups they belong to.

To add a new group:

```sh
groupadd [group_name]
```

### How to Modify a User

Sometimes, you might need to update user details, such as changing usernames, user IDs, group memberships, home directories, or login shells. You use the `usermod` command to modify existing user accounts while preserving their files and configurations.

::: info Syntax

```sh
usermod [OPTIONS] [user_name]
```

:::

Let’s break down the different options available for modifying user accounts.

#### 1. Change the username

If you want to rename an existing user, use the `-l` option:

::: info Syntax

```sh
usermod -l new_username old_username
```

:::

::: tip Example

```sh
usermod -l tanishkamakode tanishka
```

:::

This renames `tanishka` to `tanishkamakode`. Just keep in mind that the home directory remains the same (<FontIcon icon="fas fa-folder-open"/>`/home/tanishka`), so you might need to rename it manually.

To rename the home directory as well, use:

```sh
mv /home/tanishka /home/tanishkamakode
```

#### 2. Change the user id

Each user has a unique User ID (UID). If you need to change it, use `-u`.

::: info Syntax

```sh
usermod -u new_UID user_name
```

:::

::: tip Example

```sh
usermod -u 2001 tanishka
```

:::

This changes `tanishka`'s UID to `2001`. Before you do this, you’ll want to **make sure that no other user has the same UID.** This is important.

If the user owns files under the old UID, you should update them after changing the UID.

#### 3. Change the primary group

Every user belongs to a primary group. To change it, use `-g`.

::: info Syntax

```sh
usermod -g new_group user_name
```

Example:

```sh
usermod -g developers tanishka
```

This changes `tanishka`'s primary group to `developers`. Just keep in mind that `usermod -g developers tanishka` **removes** the user from all secondary groups. To avoid that, just make sure you check and re-add secondary groups as needed.

Also, the group must exist beforehand. To create a group, run this command:

::: info Syntax

```sh
groupadd [group_name]
```

Example:

```sh
groupadd developers
```

Now, to check tanishka’s group, do the following:

```sh
id tanishka
```

#### 4. Add to a secondary group

A user can belong to multiple secondary groups. Use `-G` to assign them.

::: info Syntax

```sh
usermod -G group1,group2 user_name
```

:::

::: tip Example

```sh
usermod -G linux,docker tanishka
```

:::

This adds `tanishka` to the `sudo` and `docker` groups. Just keep in mind that this **replaces** any existing secondary groups that the user might already belong to. To add groups without removing the current ones, use `-aG` (append to groups) like this:

```sh
usermod -aG linux,docker tanishka
```

#### 5. Change the home directory

You can change a user’s default home directory using `-d`.

::: info Syntax

```sh
usermod -d /new/home_directory user_name
```

:::

::: tip Example

```sh
usermod -d /home/tani tanishka
```

:::

This sets `tanishka`'s home directory to <FontIcon icon="fas fa-folder-open"/>`/home/tani`, but **it does not move existing files**. To move them, add the `-m` option:

```sh
usermod -d /home/tani -m tanishka
```

After moving the home directory, just make sure you’ve updated file ownership.

#### 6. Change the login shell

The default shell for a user can be changed using `-s`.

::: info Syntax

```sh
usermod -s /new/shell user_name
```

:::

::: tip Example

```sh
usermod -s /bin/zsh tanishka
```

:::

This changes `tanishka`'s default shell to `zsh`. Common shells include:

- `/bin/bash` (default)
- `/bin/sh`
- `/bin/zsh`
- `/usr/sbin/nologin` (to disable login)

With `usermod`, you can fine-tune user settings to match system requirements. Always check changes using:

```sh
id tanishka
grep tanishka /etc/passwd
```

---

## Final Words

In this article, we explored the fundamentals of user management in RHEL, a crucial aspect of system administration. We started with creating and managing users, then moved on to handling groups.

If you're new to Linux and want to build a strong foundation, check out my first tutorial on [**Basic Linux Commands**](/freecodecamp.org/guide-to-rhel-linux-basics.md), where I cover essential commands every beginner should know. You can also read my second tutorial on [**Vim**](/freecodecamp.org/how-to-use-the-vim-text-editor-intro-for-devs.md) to learn how to navigate and edit text efficiently in this powerful editor. These articles will complement what you’ve learned about user management here.

Keep practicing these commands, and soon they’ll become second nature to you. Mastery comes with repetition, so continue experimenting and applying these fundamentals in real-world scenarios.

Stay tuned for more articles. Get ready to take your RHEL skills to the next level.

[<FontIcon icon="fas fa-globe"/>Let’s connect!](https://linktr.ee/tanishkamakode)

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Learn User Management in RHEL: A Comprehensive Guide",
  "desc": "Imagine you're throwing a house party. You wouldn’t hand out keys to every guest, right? Some friends can roam freely, some should probably stick to the living room, and a few—well, let’s just say they need supervision. Managing users in RHEL is kind...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/learn-user-management-in-rhel-a-comprehensive-guide.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
