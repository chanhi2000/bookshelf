---
lang: en-US
title: "How to Set Up GitHub CLI on WSL2"
description: "Article(s) > How to Set Up GitHub CLI on WSL2"
icon: iconfont icon-github
category:
  - DevOps
  - Github
  - Windows
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - github
  - win
  - windows
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Set Up GitHub CLI on WSL2"
    - property: og:description
      content: "How to Set Up GitHub CLI on WSL2"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/github-cli-wsl2-guide.html
prev: /devops/github/articles/README.md
date: 2025-08-15
isOriginal: false
author:
  - name: Ayu Adiati
    url : https://freecodecamp.org/news/author/adiatiayu/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1755202477019/fbc68131-107a-40ae-9dae-c14224d0866a.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Github > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/github/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Set Up GitHub CLI on WSL2"
  desc="Recently, I set up WSL2 and Ubuntu on my Windows 11 to work on some open-source projects. Since I also maintain these projects, I installed GitHub CLI to ease my workflow. I successfully installed the GitHub CLI, but failed to authenticate it. The er..."
  url="https://freecodecamp.org/news/github-cli-wsl2-guide"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1755202477019/fbc68131-107a-40ae-9dae-c14224d0866a.png"/>

Recently, I set up WSL2 and Ubuntu on my Windows 11 to work on some open-source projects. Since I also maintain these projects, I installed [<FontIcon icon="iconfont icon-github"/>GitHub CLI](https://cli.github.com/) to ease my workflow. I successfully installed the GitHub CLI, but failed to authenticate it.

The error message `failed to authenticate via web browser: Too many requests have been made in the same timeframe. (slow_down)` appeared on my terminal, while on the web browser, it indicated that the authentication was successful.

![A message says "Congratulations, you're all set," marking GitHub CLI authentication is successful](https://cdn.hashnode.com/res/hashnode/image/upload/v1754718774837/0d1de969-a1e3-4f0a-a3ce-e3c4661ce0d0.png)

I googled and found some workarounds that I tried, but only one worked like a charm!

After finally solving the tricky authentication issue for GitHub CLI on WSL2, I've put together this guide. It's a complete walkthrough for a solution that works, covering everything from a smooth installation to ongoing management.

::: note Prerequisites

Before getting started, ensure that you have these installed on your Windows machine:

- WSL2
- A Linux distro
- Windows PowerShell
- [<FontIcon icon="fa-brands fa-windows"/>Windows Terminal](https://learn.microsoft.com/en-us/windows/terminal/install) (optional)

:::

To follow the instructions in this article, you can use Windows PowerShell terminal as an administrator.

Alternatively, if you have Windows Terminal installed, you can use the Linux terminal by clicking the ‘down arrow’ icon at the top and selecting the distro.

![Dropdown menu at Windows Terminal](https://cdn.hashnode.com/res/hashnode/image/upload/v1754677301223/7e846117-3fd1-42a2-ab3e-029e94672aca.png)

---

## How to Install GitHub CLI on WSL2

You can use the installation process described here if you use Ubuntu, Debian, or Raspberry Pi OS (apt) distros. For other distros other than those mentioned here, you can walk through the installation process that's available on the [GitHub CLI official docs (<FontIcon icon="iconfont icon-github"/>`cli/cli`)](https://github.com/cli/cli/blob/trunk/docs/install_linux.md).

To install GitHub CLI in WSL2:

### 1. Run this command:

```sh
(type -p wget >/dev/null || (sudo apt update && sudo apt install wget -y)) \
    && sudo mkdir -p -m 755 /etc/apt/keyrings \
    && out=$(mktemp) && wget -nv -O$out https://cli.github.com/packages/githubcli-archive-keyring.gpg \
    && cat $out | sudo tee /etc/apt/keyrings/githubcli-archive-keyring.gpg > /dev/null \
    && sudo chmod go+r /etc/apt/keyrings/githubcli-archive-keyring.gpg \
    && sudo mkdir -p -m 755 /etc/apt/sources.list.d \
    && echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null \
    && sudo apt update \
    && sudo apt install gh -y
```

### 2. Type your Linux password when you get prompted.

### 3. Ensure the GitHub CLI is installed by running `gh --version` command

If the installation is successful, you should see something like this in your terminal:

```sh
gh version 2.76.2 (2025-07-30)
#
# https://github.com/cli/cli/releases/tag/v2.76.2
```

---

## How to Authenticate GitHub CLI on WSL2 with Your GitHub Account

Before you can use GitHub CLI, you must first authenticate it. You will get an `HTTP 401: Bad credentials (https://api.github.com/graphql)` error message if you run any GitHub CLI command without authenticating.

To authenticate GitHub CLI with your GitHub account:

1) Run the `gh auth login` command in your terminal.
2) You will receive several prompts, and you need to choose the methods you prefer. Here’s what I selected in each prompt:

```plaintext
? Where do you use GitHub? GitHub.com
? What is your preferred protocol for Git operations on this host? HTTPS
? How would you like to authenticate GitHub CLI? Login with a web browser
```

After answering all prompts, you should get the message to copy a one-time code as shown below. You **don’t need to copy the code** at this point.

```plaintext title="output"
# ! First copy your one-time code: XXXX—XXXX
```

3) Press ‘Enter’. It automatically opens the "Device Activation" page on your browser.
4) Click the green ‘Continue’ button.

![GitHub Device Activation page on a browser](https://cdn.hashnode.com/res/hashnode/image/upload/v1754848322666/2a4af9ab-c197-4ec9-802f-ad9b4f24375c.png)

GitHub should ask you to enter the code displayed on your terminal, as shown in the screenshot below. But here’s the trick! **Don’t paste any code, and don’t close the browser**. Let’s first get back to your terminal.

![GitHub Device Activation page on a browser](https://cdn.hashnode.com/res/hashnode/image/upload/v1754722491767/d84534da-522f-4e82-84c2-a1bfc75940ef.png)

Now you might get this error message on your terminal:

```plaintext title="output"
grep: /proc/sys/fs/binfmt_misc/WSLInterop: No such file or directory
WSL Interopability is disabled. Please enable it before using WSL.
grep: /proc/sys/fs/binfmt_misc/WSLInterop: No such file or directory
[error] WSL Interoperability is disabled. Please enable it before using WSL.
```

5) Press <kbd>Ctrl</kbd>+<kbd>C</kbd> to stop the process if it's still running, or let it stop by itself. Once it's stopped, you should see this message:

```plaintext title="output"
failed to authenticate via web browser: Too many requests have been made in the same timeframe. (slow_down)
```

6) Run the `gh auth login` command again and repeat the process to select the methods of your choice. This time, when it asks you to press ‘Enter’, **don’t press it**.
7) Copy the latest code and return to the "Device Activation" page that you left open in your browser.
8) Paste the code that you copied and click the green ‘Continue’ button.
9) Click the green ‘Authorize github’ button after GitHub redirects you to the “Authorize GitHub CLI” page. You should now see the message “Congratulations, you're all set!”
10) Get back to your terminal and press ‘Enter’. Doing so triggers these actions:
    - It automatically opens a new “Device Activation” page in your browser. You can safely ignore this.
    - In the terminal, you first see the error message as in step 4. Don’t do anything and wait for a little bit. Then, you get:

```plaintext title="output"
  ✓ Authentication complete.
  - gh config set -h github.com git_protocol https
  ✓ Configured git protocol
  ! Authentication credentials saved in plain text
  ✓ Logged in as YOUR-GITHUB-USERNAME
  ! You were already logged in to this account
```

And GitHub CLI is now successfully authenticated!

::: note

> Credit goes to [username “ikeyan” on GitHub for their GitHub CLI authentication solution (<FontIcon icon="iconfont icon-github"/>`cli/cli`)](https://github.com/cli/cli/discussions/6884#discussioncomment-10176332)!

<SiteInfo
  name="Failing to authenticate on new wsl setup · cli/cli · Discussion #6884"
  desc="I'm in the process of setting up a new machine but in doing so I'm failing to authenticate with gh auth login. Here's the terminal output: ❯ gh auth login ? What account do you want to log into? Gi..."
  url="https://github.com/cli/cli/discussions/6884#discussioncomment-10176332"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/19454db2888327c0f8f5c23e91e296fba8c68c0546e00e1accf2078e60d006ee/cli/cli/discussions/6884"/>


:::

---

## How to Upgrade GitHub CLI on WSL2

It’s always a good practice to regularly check for package and dependency updates, and upgrade to the newest version when it’s available — this includes GitHub CLI. To check for updates and upgrade the version of GitHub CLI:

1. Run the `sudo apt update` command in your terminal. This command fetches the list of available updates.
2. Type your Linux password when you get prompted.
3. If you need to upgrade your GitHub CLI, run `sudo apt install gh`. This command installs the newest version of GitHub CLI.
4. Type your Linux password when you get prompted.

Now your GitHub CLI has the newest version.

---

## How to Uninstall GitHub CLI on WSL2

If one day you feel like you don’t need to use GitHub CLI anymore, you can uninstall it by following these steps:

1. Run the `sudo apt remove gh` command in your terminal.
2. Type your Linux password when you get prompted.
3. Press <kbd>Y</kbd> to continue the uninstall process.

GitHub CLI is now uninstalled from your WSL environment.

---

## How to Revoke GitHub CLI Access on GitHub

After uninstalling the GitHub CLI, you might think your account access is gone, but it's not. The authentication you granted is still active. If you don't plan on using the CLI again, it's a good practice to revoke this access.

Here's how to do it directly from your GitHub account:

1) On your GitHub account, click your profile picture on the top right and click ‘Settings’.

![Settings option on dropdown menu at GitHub](https://cdn.hashnode.com/res/hashnode/image/upload/v1754725091482/8fb8a0fd-8dbd-4342-9fe8-309a13d72c39.png)

2) On the left side bar, find ‘Integrations’ and click ‘Applications’.

![Applications tab in the Integrations settings on GitHub](https://cdn.hashnode.com/res/hashnode/image/upload/v1754815240842/ca49d207-6ee2-476f-a53d-bde53b2d57dd.png)

3) Click the ‘Authorized OAuth Apps’ tab on top.

![Authorized OAuth Apps tab on GitHub](https://cdn.hashnode.com/res/hashnode/image/upload/v1754815346304/a360f7dc-7024-44c3-8e19-15d94b35ce8e.png)

4) Find GitHub CLI and click the ‘three dots’ icon next to it.
5) Click ‘Revoke’.

![Revoke option on GitHub to revoke an authorized OAuth apps](https://cdn.hashnode.com/res/hashnode/image/upload/v1754725454783/dd544380-482a-4385-97c1-4ebc35026658.png)

6) Confirm it by clicking the ‘I understand, revoke access’ button.

Now, GitHub CLI doesn’t have access to your GitHub account.

---

## Final Words

::: info 🖼️ Credit cover image

<SiteInfo
  name="unDraw - Open source illustrations for any idea"
  desc="Open-source illustrations for any idea you can imagine and create. Build beautiful websites, products and applications with your color, for free."
  url="https://undraw.co"
  logo="https://undraw.co/favicon.ico"
  preview="https://cdn.undraw.co/static/ud24ogimage.png"/>


:::

Thank you for reading! Last, you can find me on [X (<FontIcon icon="fa-brands fa-x-twitter"/>`AdiatiAyu`)](https://x.com/@AdiatiAyu) and [LinkedIn (<FontIcon icon="fa-brands fa-linkedin"/>`adiatiayu`)](https://linkedin.com/in/adiatiayu/). Let's connect! 😊

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Set Up GitHub CLI on WSL2",
  "desc": "Recently, I set up WSL2 and Ubuntu on my Windows 11 to work on some open-source projects. Since I also maintain these projects, I installed GitHub CLI to ease my workflow. I successfully installed the GitHub CLI, but failed to authenticate it. The er...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/github-cli-wsl2-guide.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
