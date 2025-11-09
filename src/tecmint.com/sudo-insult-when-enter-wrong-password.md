---
lang: en-US
title: "Let Sudo Insult You When You Enter Incorrect Password"
description: "Article(s) > Let Sudo Insult You When You Enter Incorrect Password"
icon: fa-brands fa-linux
category:
  - DevOps
  - Linux
  - Fedora
  - Debian
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
      content: "Article(s) > Let Sudo Insult You When You Enter Incorrect Password"
    - property: og:description
      content: "Let Sudo Insult You When You Enter Incorrect Password"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/tecmint.com/sudo-insult-when-enter-wrong-password.html
prev: /devops/linux-fedora/articles/README.md
date: 2025-07-16
isOriginal: false
author:
  - name: Aaron Kili
    url : https://tecmint.com/author/aaronkili/
cover: https://tecmint.com/wp-content/uploads/2017/01/Sudo-Insult-Wrong-Password.png
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
  name="Let Sudo Insult You When You Enter Incorrect Password"
  desc="In this article, we will explain how to set a sudoers insult parameter for the sudo command to insult system users when they enter an incorrect password."
  url="https://tecmint.com/sudo-insult-when-enter-wrong-password"
  logo="https://tecmint.com/wp-content/uploads/2020/07/favicon.ico"
  preview="https://tecmint.com/wp-content/uploads/2017/01/Sudo-Insult-Wrong-Password.png"/>

**Sudoers** is the default `sudo` security policy plugin in Linux; however, experienced system administrators can specify a custom security policy as well as input and output logging plugins. It is driven by the <VPIcon icon="fas fa-folder-open"/>`/etc/`<VPIcon icon="fas fa-file-linse"/>`sudoers` file or, alternatively by **LDAP**.

You can define `sudoers` options like the `insults` option or several others in the file <VPIcon icon="fas fa-folder-open"/>`/etc/`<VPIcon icon="fas fa-file-linse"/>`sudoers`. It is set under the `Defaults` entries section. Read through our last article, which explains [10 Useful Sudoers Configurations for Setting ‘sudo’ in Linux](https://tecmint.com/sudoers-configurations-for-setting-sudo-in-linux/).

In this article, we will explain a `sudoers` configuration parameter to enable an individual or system administrator to set `sudo` command to insult system users who enter the wrong password.

Start by opening the file <VPIcon icon="fas fa-folder-open"/>`/etc/`<VPIcon icon="fas fa-file-linse"/>`sudoers` like so:

```sh
sudo visudo
```

Go to the `Defaults` section and add the following line:

```sh title="/etc/visudo"
Defaults   insults
```

This setting will make `sudo` print humorous or sarcastic messages every time a user enters an incorrect password.

Below is a sample of <VPIcon icon="fas fa-folder-open"/>`/etc/`<VPIcon icon="fas fa-file-linse"/>`sudoers` file on my system showing default entries.

![Set sudo Insults Parameter](https://tecmint.com/wp-content/uploads/2017/01/Set-sudo-Insults-Parameter.png)

From the screenshot above, you can see that there are many other defaults defined, such as sending mail to root each time a user enters a bad password, setting a secure path, configuring a custom sudo log file, and more.

Save the file and close it.

Run a command with `sudo` and enter the wrong password, then observe how `insults` option works:

```sh
sudo visudo
```

![sudo Insult in Action](https://tecmint.com/wp-content/uploads/2017/01/How-sudo-Insult-Works.png)

Each failed password attempt will now trigger a different sarcastic or humorous insult, selected randomly from a built-in set of messages compiled into the `sudo` binary.

::: note

When you configure the `insults` parameter, it disables the `badpass_message` parameter which prints a specific message on the command line (the default message is **“sorry, try again”**) in case a user enters the wrong password.


:::

To modify the message, add the `badpass_message` parameter to the <VPIcon icon="fas fa-folder-open"/>`/etc/`<VPIcon icon="fas fa-file-linse"/>`sudoers` file as shown below.

```sh
Defaults  badpass_message="Password is wrong, please try again"  # try to set a message of your own
```

![Set sudo badpassword Message](https://tecmint.com/wp-content/uploads/2017/01/Set-sudo-badpassword-Message.png)

Save the file and close it, then invoke `sudo` and see how it works, the message you set as the value of `badpass_message` will be printed every time you or any system user types a wrong password.

```sh
sudo visudo
```

![Sudo badpassword Message](https://tecmint.com/wp-content/uploads/2017/01/sudo-badpassword-Message.png)

::: note Remember

The `insults` and `badpass_message` options are mutually exclusive; you can only use one at a time. If both are present, badpass_message will override insults.

:::

---

## How to Remove or Revert Changes

If you ever decide to disable the `insults` or `badpass_message` options, the process is simple, just open the <VPIcon icon="fas fa-folder-open"/>`/etc/`<VPIcon icon="fas fa-file-linse"/>`sudoers` file using the `visudo` command.

```sh
sudo visudo
```

Once inside, locate the line that sets `Defaults` insults or `Defaults badpass_message`, and either delete it or comment it out by adding a `#` at the beginning of the line.

```sh title="/etc/visudo"
# Defaults insults
# Defaults badpass_message="Your custom message"
```

After making the necessary changes, save and close the file, which will revert `sudo` back to its default behavior, where it simply displays the standard “**Sorry, try again**” message on incorrect password attempts.

Always use `visudo` when editing this file to avoid configuration issues that could lock you out of admin access.

That’s all, in this article we reviewed how to set `sudo` to print insults when users type a wrong password. Do share your thoughts via the comment section below.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Let Sudo Insult You When You Enter Incorrect Password",
  "desc": "In this article, we will explain how to set a sudoers insult parameter for the sudo command to insult system users when they enter an incorrect password.",
  "link": "https://chanhi2000.github.io/bookshelf/tecmint.com/sudo-insult-when-enter-wrong-password.html",
  "logo": "https://tecmint.com/wp-content/uploads/2020/07/favicon.ico",
  "background": "rgba(5,86,243,0.2)"
}
```
