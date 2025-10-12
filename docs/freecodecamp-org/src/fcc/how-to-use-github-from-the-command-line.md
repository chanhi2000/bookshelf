---
lang: en-US
title: "What is the GitHub CLI? How to Use GitHub from the Command Line"
description: "Article(s) > What is the GitHub CLI? How to Use GitHub from the Command Line"
icon: iconfont icon-github
category:
  - DevOps
  - Github
  - Git
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - github
  - github-cli
  - git
head:
  - - meta:
    - property: og:title
      content: "Article(s) > What is the GitHub CLI? How to Use GitHub from the Command Line"
    - property: og:description
      content: "What is the GitHub CLI? How to Use GitHub from the Command Line"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/how-to-use-github-from-the-command-line.html
prev: /devops/github/articles/README.md
date: 2025-09-27
isOriginal: false
author:
  - name: AYUSH MISHRA
    url : https://freecodecamp.org/news/author/Ayush01Mishra/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1758905411969/b1506cff-650a-4098-bd70-e8bb3b0bcb9a.png
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

```component VPCard
{
  "title": "Git > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/git/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="What is the GitHub CLI? How to Use GitHub from the Command Line"
  desc="The GitHub CLI (Command Line Interface) is a powerful tool developed by GitHub that allows developers to interact with GitHub directly from the terminal. It provides a simple way to perform many GitHub tasks without leaving the command line interface..."
  url="https://freecodecamp.org/news/how-to-use-github-from-the-command-line"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1758905411969/b1506cff-650a-4098-bd70-e8bb3b0bcb9a.png"/>

The GitHub CLI (Command Line Interface) is a powerful tool developed by GitHub that allows developers to interact with GitHub directly from the terminal. It provides a simple way to perform many GitHub tasks without leaving the command line interface, such as managing repositories, handling pull requests and issues, working with GitHub Actions, and more.

In this tutorial, you’ll to learn what the GitHub CLI is, how to install and set it up, and how to use it for everyday tasks such as creating repositories, managing issues and pull requests, working with GitHub Actions, and automating tasks using custom aliases. You’ll learn how to replace some functionalities on GitHub’s web interface with quick commands in your terminal.

---

## Overview of GitHub CLI

You can use the GitHub CLI to bridge the gap between GitHub's web interface and your local environment. You can perform various tasks such as creating issues, managing repositories, or even checking the status of your GitHub Actions workflows using the CLI. Using the CLI, you can perform almost all the tasks that you might complete on the GitHub website.

### Key Features of GitHub CLI

- **Repository management:** Easily create, clone, view, and manage repositories.
- **Pull requests and issues:** Manage pull requests and issues directly from the terminal, including creating, merging, and listing them.
- **GitHub Actions:** Interact with workflows and manage workflow runs.
- **Authentication:** Provides a secure way to authenticate with your GitHub account, supporting SSH keys, tokens, and OAuth.
- **Custom scripting:** Lets you create custom scripts and aliases to automate repetitive tasks and streamline development processes.

### Benefits of Using GitHub CLI

Suppose you’re working on a project, and you need to create a new issue on GitHub. Normally, you would switch to your browser, log in to GitHub, navigate to the repository, click on the “Issues” tab, and then click “New Issue.” With GitHub CLI, you can do all of this by typing a single command, without ever leaving your terminal. This makes your workflow faster and saves time.

---

## Installation and Setup

To install GitHub CLI on Windows, you can use the winget package manager. Winget is a command-line tool that allows you to install software easily.

### Installing GitHub CLI on Windows, macOS, and Linux

::: code-tabs#sh

@tab:active <VPIcon icon="fa-brands fa-windows"/>

Run the command given below:

```sh
winget install --id GitHub.cli
```

- `winget install`: Tells Windows to install a new software package.
- `--id GitHub.cli`: Specifies the exact package ID for GitHub CLI.

After running this command, GitHub CLI will be installed on your Windows system.

@tab <VPIcon icon="iconfont icon-macos"/>

You can use Homebrew to install GitHub CLI on macOS. Open your terminal and run:

```sh
brew install gh
```

@tab <VPIcon icon="fa-brands fa-linux"/>

On Linux, you can use your package manager. For example, on Ubuntu, you can run:

```sh
sudo apt install gh
```

:::

### Authenticating with a GitHub Account

After installing GitHub CLI, the next step is to authenticate it with your GitHub account.

#### Run Authentication Command

Type `gh auth login` in the terminal and press Enter.

```sh
gh auth login
```

You’ll then be prompted to select an authentication method. The recommended option is to authenticate via a web browser.

If you select the browser method, GitHub CLI will open a link in your default browser, where you can log in to GitHub.

#### Complete Authentication

After logging in, the browser will confirm that the GitHub CLI is connected to your account.

You can verify the authentication status by running:

```sh
gh auth status
```

---

## Navigating the GitHub CLI

The GitHub CLI is easy to navigate, and its command structure is intuitive.

### Command Structure and Syntax

GitHub CLI commands follow a simple and straightforward pattern:

```sh
gh [command] [subcommand] [flags]
```

- **Command:** The main action you want to perform (for example, repo, issue, pr).
- **Subcommand:** A specific task within the command (for example, create, list, view).
- **Flags:** Optional parameters that modify the command's behavior (for example, --title, --body).

### Commonly Used Commands and Flags

Here are some common GitHub CLI commands:

- **Creating a repository:** `gh repo create`
- **Listing issues:** `gh issue list`
- **Creating a pull request:** `gh pr create`
- **Viewing a repository's details:** `gh repo view`

To see all available commands and options, you can always run:

```sh
gh help
```

---

## How to Manage Repositories with the GitHub CLI

Let’s go through examples of some of the commands you’ll use the most often.

### Creating and Cloning Repositories

To create a new GitHub repository directly from the terminal, just use the following command:

```sh
gh repo create my-repo-name
```

To clone an existing repository, use the following command:

```sh
gh repo clone owner/repo-name
```

### Managing Branches and Pull Requests

GitHub CLI allows you to handle issues and pull requests (PRs) without leaving the terminal.

Switching branches or creating pull requests is simple. To create a new branch:

```sh
git checkout -b new-branch-name
```

Then, to create a pull request:

```sh
gh pr create --title "Your PR Title" --body "Description of your PR"
```

### Pushing and Pulling Changes

Push your changes to GitHub with this command:

```sh
git push origin branch-name
```

And pull the latest changes with:

```sh
git pull
```

### Working with GitHub Actions

GitHub CLI also supports GitHub Actions, allowing you to manage workflows directly from your terminal.

You can manually trigger workflows using the following:

```sh
gh workflow run workflow-name
```

And you can monitor the status of workflows with:

```sh
gh run list
```

To see detailed logs of a workflow, run this:

```sh
gh run view run-id --log
```

### Cloning and Forking Repositories

Cloning and forking are essential tasks when working on projects from other repositories.

To clone a repository, use this command:

```sh
gh repo clone <repository-name>
```

To fork a repository, do this:

```sh
gh repo fork <repository-url>
```

::: tip Example

Here’s what it would look like:

```sh
gh repo clone example-repo
```

```sh
gh repo fork https://github.com/username/repository-name
```

:::

### How to Work with GitHub Actions

Using the GitHub CLI, you can also manage GitHub Actions, which are automated tasks you can run in response to certain events in your repository.

#### Triggering and Monitoring Workflows

You can trigger a workflow manually like this:

```sh
gh workflow run <workflow-name>
```

And you can monitor workflow runs with this:

```sh
gh run list
```

#### Managing Workflow Runs and Logs

If you want to check the details of a specific workflow run, you can view logs directly from the CLI:

```sh
gh run view <run-id> --log
```

You can also use GitHub CLI commands to enhance your Continuous Integration/Continuous Deployment (CI/CD) pipelines, ensuring smooth automation and better control over our workflows.

### How to Update the GitHub CLI

To make sure that you’re using the latest version of GitHub CLI with all the latest features and fixes, you can update it using winget.

```sh
winget upgrade --id GitHub.cli
```

- `winget upgrade`: Checks for updates for the specified package.
- `--id GitHub.cli`: Identifies the GitHub CLI package for the upgrade.

---

## Advanced GitHub CLI Features and Integrations

The GitHub CLI is not only useful for performing basic tasks. You can also perform some advanced operations with its help.

### How to Manage Gists with the GitHub CLI

Gists are a simple way to share snippets of code. You can create, list, and manage your Gists right from the CLI. Here’s how you can create a gist:

```sh
gh gist create my-code-snippet.py
```

To list your gists:

```sh
gh gist list
```

### Interacting with Releases and Tags

To manage releases and tags, GitHub CLI provides commands to create, list, and delete releases. Here’s an example of creating a release:

```sh
gh release create v1.0.0
```

### How to Extend the GitHub CLI with Custom Scripts and Aliases

You can write your own scripts and integrate them into GitHub CLI, or create aliases for commands you use frequently to save time. Aliases let you create shortcuts for commands that you use often. For example, the command given below creates an alias `prlist` that will show all pull requests, regardless of their state:

```sh
gh alias set prlist "pr list --state all"
```

In the same manner, you can create a shortcut `co` to quickly check out a pull request branch without typing the full command each time. The command is given below:

```sh
gh alias set co "pr checkout"
```

### Troubleshooting Common Issues

If you face any issues, you can troubleshoot by checking the command syntax, ensuring your GitHub CLI is up to date, or consulting the documentation using the command:

```sh
gh help <command>
```

---

## Conclusion nb

GitHub CLI is an excellent tool that helps developers work directly from the terminal. It lets you manage repositories, handle pull requests and issues, trigger and monitor GitHub Actions, and even work with Gists.

You can save time and improve productivity as developers using this powerful tool. Keep exploring its new features and stay updated with the latest version.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "What is the GitHub CLI? How to Use GitHub from the Command Line",
  "desc": "The GitHub CLI (Command Line Interface) is a powerful tool developed by GitHub that allows developers to interact with GitHub directly from the terminal. It provides a simple way to perform many GitHub tasks without leaving the command line interface...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/how-to-use-github-from-the-command-line.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
