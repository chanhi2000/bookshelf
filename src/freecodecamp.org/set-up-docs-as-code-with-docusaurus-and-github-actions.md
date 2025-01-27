---
lang: en-US
title: "How to Set Up Documentation as Code with Docusaurus and GitHub Actions"
description: "Article(s) > How to Set Up Documentation as Code with Docusaurus and GitHub Actions"
icon: iconfont icon-github-actions
category:
  - DevOps
  - Github
  - Github Actions
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - github
  - github-actions
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Set Up Documentation as Code with Docusaurus and GitHub Actions"
    - property: og:description
      content: "How to Set Up Documentation as Code with Docusaurus and GitHub Actions"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/set-up-docs-as-code-with-docusaurus-and-github-actions.html
prev: /devops/github/articles/README.md
date: 2025-02-06
isOriginal: false
author:
  - name: EZINNE ANNE EMILIA
    url : https://freecodecamp.org/news/author/ezinnecodes/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1738248926082/9a2a6855-00d4-4e25-a8bd-c1d645f21de5.png
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
  name="How to Set Up Documentation as Code with Docusaurus and GitHub Actions"
  desc="For technical writers, keeping documentation up to date manually can be really frustrating. Issues like outdated guides, broken links, and missing updates are a pain, and they can make writers less productive. These issues can also make it harder for..."
  url="https://freecodecamp.org/news/set-up-docs-as-code-with-docusaurus-and-github-actions"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1738248926082/9a2a6855-00d4-4e25-a8bd-c1d645f21de5.png"/>

For technical writers, keeping documentation up to date manually can be really frustrating. Issues like outdated guides, broken links, and missing updates are a pain, and they can make writers less productive. These issues can also make it harder for people to effectively use the docs and get correct information.

Documentation as code, or docs as code, is an approach to managing documentation that treats the docs like a codebase. It lets you version, automatically update, and review your docs just like you would do in a codebase. Docs as code helps you make sure that your docs are up to date and that users can gain access to accurate information.

This tutorial will show you how to:

- Create a documentation website using Docusaurus.
- Track changes with Git and GitHub.
- Build and deploy it to a hosting platform.
- Set up a workflow to perform grammatical reviews using GitHub Actions before you merge your changes.

::: note Prerequisites

This tutorial is beginner-friendly, but there are some tools you’ll need to have or know in order to follow along:

- [<FontIcon icon="iconfont icon-vscode"/>VSCode IDE (or other IDE of your choice)](https://code.visualstudio.com/download).
- [<FontIcon icon="fa-brands fa-node"/>Node.js and npm installed.](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [<FontIcon icon="iconfont icon-github"/>A GitHub account.](https://github.com/)
- [**A reasonable knowledge of how to use Git and GitHub.**](/freecodecamp.org/gitting-things-done-book/README.md)

:::

---

## Why Do Technical Writers Use Docs as Code?

Before we dive in, let’s quickly talk about what "docs as code" is and why it matters. Back in 2015, two technical writers at Google came up with the idea to make it easier for developers to contribute to documentation and to better organize their company documents. There were times when they needed to write about an application they were working on, but things were really disorganized. So they came up with this process. Since then, many companies have adopted the approach.

Docs as code is now a popular approach to managing documentation, and it’s supported by many tools that are designed to treat documentation like code. Tom Johnson explains this concept in more detail in [<FontIcon icon="fas fa-globe"/>his article on docs as code](https://idratherbewriting.com/learnapidoc/pubapis_docs_as_code.html).

Traditional documentation relies on Word documents and PDFs, where changes are tracked manually or through document revision history. Writers must update and publish content manually, with no way to automate routine tasks.

On the other hand, docs as code borrows principles and tools from software development to make documentation more structured, versioned, and automated. The documentation is stored in version control (like Git), written in lightweight markup languages, and gets updated alongside the code.

This approach ensures that documentation evolves alongside the software, maintains high quality, and allows for efficient collaboration, just like writing code.

### Tools We’ll Use in This Tutorial

Let’s review the main tools we’ll be using for this tutorial:

1. Docusaurus is a tool created by Facebook for creating documentation websites. It supports markdown and mdx. It also supports versioning and custom themes, making it easy to create user-friendly and professional docs.
2. Vale is a customizable style and grammar checker for writers. It ensures consistent language, tone, and style across technical documents. There are other good linters you could use for review apart from Vale, but that’s what we’ll be using here.
3. GitHub Actions: A CI/CD tool for automating workflows directly in GitHub. It helps you test, build, and deploy code with ease.

---

## Step 1: Install Docusaurus

Open your command line terminal and enter the following:

```sh
npx create-docusaurus@latest docs-as-code-tutorial classic
```

`docs-as-code-tutorial` is the name I am using for the site. You can replace it with any other site name if you wish. Select JavaScript as the language you want to use. This will begin to create a new Docusaurus site. After running the code, you’ll see the <FontIcon icon="fas fa-folder-open"/>`docs-as-code-tutorial` folder in your VSCode workspace. Navigate to the folder.

Next, start the development server so you can see your docs.

```sh
cd docs-as-code-tutorial
npm start
```

With this, the site will start running at `localhost:3000`.

![When you view the site, you’ll see pre-generated content.](https://cdn.hashnode.com/res/hashnode/image/upload/v1737868185569/0cf96b6c-770a-4965-b017-1fe54796c673.png)

So, in the next step, you’ll to create a repository and link the local folder to your remote repository.


---

## Step 2: Create a Repository

Now, you need to create a repository for the `docs-as-code-tutorial`. So go to your GitHub account and create a new repository.

After creating the repository, you’ll need to link the repository to the folder in your VSCode workspace.

Open a new terminal and run these commands:

```sh
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/myname/docs-as-code-tutorial.git
git push -u origin main
```

With that, you have linked the repository, and Git will start tracking your changes.

---

## Step 3: Customize your Docs in the <FontIcon icon="fa-brands fa-js"/>`docusaurus.config.js` File

Before you begin customizing, create a branch where you can make your changes as you push it to the main branch.

```sh
git checkout -b "new_branch"
```

The <FontIcon icon="fa-brands fa-js"/>`docusaurus.config.js` file is where you can make most of the edits to your site. Change the `title` property to `Docs as code`.

```js
const config = {
  title: 'Docs as code',
  tagline: 'Documentation as code',
  // rest of your code
  navbar: {
    title: 'Docs as code',
    // rest of your code
  },
}
```

That will show as the new title when you preview the docs. This is simply an illustration to display how Docusaurus works. You can further customize the site to your desired style, but we won’t go into more detail on that here (as the main purpose of this tutorial is to show how to set up your docs as code).

![After making the changes, the site should look a bit different.](https://cdn.hashnode.com/res/hashnode/image/upload/v1737869529640/c4dab104-9f8b-4dad-a3a5-250d15d4552d.png)

You can push the changes now.

```sh
git commit -am "first commit"
git push --set-upstream origin new_branch
```

---

## Step 4: Edit Your Docs

For this tutorial, I’ll be making edits in the <FontIcon icon="fas fa-folder-open"/>`docs` section. Go to <FontIcon icon="fa-brands fa-markdown"/>`intro.md` and replace the markdown text with this writeup:

```md :collapsed-lines
# How to set up docs-as-code

Documentation-as-code is a great means to push changes made in your local machine to your docs live site. To accomplish this, you need an IDE, a static site generator, a Git repository, CI/CD to set up workflows, and a hosting platform. 

---

## Why do technical writers do docs-as-code?

Documentation-as-code is a great means to push changes made in your local machine to your docs live site. To accomplish this, you need an IDE, a static site generator, a Git repository, CI/CD to set up workflows, and a hosting platform.
```

After making the edits, preview your docs.

![<FontIcon icon="fa-brands fa-markdown"/>`intro.md` displaying the writeup ](https://cdn.hashnode.com/res/hashnode/image/upload/v1737870301247/dba83233-a11c-4ec0-aeaf-b11e525ca090.png)

---

## Step 5: Add the Linting Feature

Add the Vale linter to your docs to review errors. To do that, install the Vale CLI with any of these commands.

::: tabs

@tab:active <FontIcon icon="fa-brands fa-windows"/>

```sh
choco install vale
```

@tab <FontIcon icon="iconfont icon-macos"/>

```sh
brew install vale
```

@tab <FontIcon icon="fa-brands fa-linux"/>

```sh
snap install vale
```

:::

### How to set up Vale

As I mentioned earlier, Vale is a customizable style and grammer checking tool. This means you can set it up to review your docs exactly how you want.

Vale uses the Vale style guide when performing reviews to spot errors and make suggestions. But you can add your company’s style guide or any other style guide to it if you prefer. There are public style guides you can use like the Google style guide, Microsoft style guide, and so on. For this tutorial, we’ll be using the Microsoft style guide.

If you don’t already have it, you’ll need to [get the Microsoft style guide (<FontIcon icon="iconfont icon-github"/>`errata-ai/Microsoft`)](https://github.com/errata-ai/Microsoft/releases/download/v0.7.0/Microsoft.zip), download it, and unzip it. Create a styles folder and move the Microsoft folder to the styles folder.

This should be your file path:

```plaintext title="file structure"
- docs-as-code-tutorial
  //other folders
  - styles
    - Microsoft
  //other folders
```

In your docs, create a <FontIcon icon="fas fa-file-lines"/>`.vale.ini` file and add it to your root.

Add this code in it:

```plaintext title=".vale.ini"
StylesPath = styles

MinAlertLevel = suggestion

[*.md]

BasedOnStyles = Vale, Microsoft
```

Let’s understand what’s going on here:

- The `StylesPath` is set to the styles folder where you added the Microsoft style guide you downloaded. The MinAlertLevel sets Vale alerts to `suggestion` – this means that Vale will highlight suggestions, warnings, and errors found in your docs. If the MinAlertLevel is set to errors, then Vale will highlight errors only. If set to warnings, then it’ll highlight warnings and errors (and so on).
- `[*.md]` tells Vale to go through `.md` files only.
- `BasedOnStyles` indicates which style guide you are using for the linting. In this case, it’s the Microsoft style guide and Vale style guide. So when the linter is running, it will highlight suggestions, warnings, and errors using the specified style guides.

To test your docs, run `vale intro.md` (assuming you still have the `intro.md` file).

This should be the output:

```plaintext title="output"
✔ 0 errors, 0 warnings and 0 suggestions in stdin.
```

---

## Step 6: Build the Site

To do this, run `npm run build`. After that, you can preview the build with `npm run serve`.

---

## Step 7: Deploy the Site

There are different hosting platforms where you can host your live site. This tutorial covers two hosting options: GitHub Pages and Netlify.

### Deploy with GitHub Pages

To deploy to GitHub Pages, you’ll need to set your repository name and GitHub username/organization name in the <FontIcon icon="fa-brands fa-js"/>`docusauraus.config.js` file.

```js
{
  // ...
  // Set the production url of your site here
  url: 'https://ezinneanne.github.io/',

  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/docs-as-code-tutorial/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'ezinneanne', // Usually your GitHub org/user name.

  projectName: 'docs-as-code-tutorial', // Usually your repo name.
  // ...
}
```

You can deploy the site to GitHub Pages in the following ways:

::: tabs

@tab:active <FontIcon icon="fas fa-gears"/>

```batch
CMD /C "set "GIT_USER=<GITHUB_USERNAME>" && yarn deploy"
```

@tab <FontIcon icon="iconfont icon-powershell"/>

```powershell
cmd /C 'set "GIT_USER=<GITHUB_USERNAME>" && yarn deploy'
```

@tab <FontIcon icon="fa-brands fa-linux"/>

```sh
GIT_USER=<GITHUB_USERNAME> yarn deploy
```

:::

Just make sure you replace `<GITHUB_USERNAME>` with your username on GitHub.

![Voilà! The site is deployed at [<FontIcon icon="fas fa-globe"/>https://ezinneanne.github.io/docs-as-code-tutorial/](https://ezinneanne.github.io/docs-as-code-tutorial/).](https://cdn.hashnode.com/res/hashnode/image/upload/v1737918709225/3eb12747-4a13-4c17-a7ad-ab6ee84b64ff.png)

### Deploy with Netlify

To deploy to Netlify, you only need the production URL and base URL:

```js
{
  // ...
  // Set the production url of your site here
  url: 'https://docs-as-code-tutorial.netlify.app',
  baseUrl: '/',
  // ...
}
```

1. Go to your [<FontIcon icon="fas fa-globe"/>Netlify account](https://netlify.com/) and link your repository.
2. Click on `Add new site`.
3. Click on `import an existing project`.
4. Connect to your GitHub account and select the `docs-as-code-tutorial` repository.
5. Give your site a name, it should be the same as the URL in your `docusaurus.config.js`.
6. Add the publish directory which is `build` and the build command which is `npm run build`. Then Netlify will deploy to your default branch `main`, unless you specify otherwise.
7. Finally, deploy!

You should see the site running at [<FontIcon icon="fas fa-globe"/>https://docs-as-code-tutorial.netlify.app/](https://docs-as-code-tutorial.netlify.app/).

For other deployment options, [<FontIcon icon="fas fa-globe"/>you can check out the Docusauraus documentation](https://docusaurus.io/docs/deployment).

---

## Step 8: Set Up a Documentation Workflow Using GitHub Actions

Now we’ll set up a workflow for the documentation. In GitHub, when you deploy to GitHub Pages, it sets up a default workflow for you at `pages-build-deployments`.

Netlify also automates deployments but does not create a workflow file in your repository. Instead, it manages the process through its platform, monitoring your repository for changes and running builds based on your settings. In this tutorial, we will set up a workflow with GitHub Actions that automates Vale running linting checks through the docs.

Create a <FontIcon icon="fas fa-folder-open"/>`.github/workflows` directory and add a <FontIcon icon="iconfont icon-yaml"/>`vale-linter.yml` file in it.

Add this code in it:

```yaml :collapsed-lines title=".github/workflows/vale-linter.yml"
name: Vale Lint Checker

# Trigger the workflow on specific events.
on:
  push: # Run on every push to the main branch.
    branches:
      - main
  pull_request: # Run on pull requests targeting any branch.
    branches:
      - '*'
  workflow_dispatch: # Allow manual triggering from the Actions tab.

jobs:
  prose:
    runs-on: ubuntu-latest
    steps:
      # Step 1: Check out the repository code.
      - name: Checkout Code
        uses: actions/checkout@v3 

      # Step 2: Set up Node.js
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 16 # Use Node.js 16 or higher

      # Step 3: Run Vale lint checks.
      - name: Vale Lint
        uses: errata-ai/vale-action@reviewdog
        with:
          files: .
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

After making these changes, run the following commands:

```sh
git add .
git commit -m “changes”
```

Finally push to the repository with `git push`.

![Go to the `Actions` tab on your repository. You should see the workflow running:](https://cdn.hashnode.com/res/hashnode/image/upload/v1737521586319/3d554246-f8e6-4885-bac5-2cead1b3dd56.png)

![Click on the `changes` button and click on the job `prose`.](https://cdn.hashnode.com/res/hashnode/image/upload/v1737970927236/632e2753-5d2e-474b-a05e-74a9affa634d.png)

Now, you should see all the lines in your <FontIcon icon="fa-brands fa-markdown"/>`.md` files highlighted by Vale.

With this, your docs are set up to run like a codebase! You can make changes, and when you push, review, and merge, it will sync automatically.

Keep in mind that this is for Netlify. For GitHub Pages, you’ll need to set up a workflow for automatic deployment.

---

## Summary

In this tutorial, you have learned how to set up documentation as code using Docusaurus. You also saw how to deploy your documentation to a live site, and automate the linting workflow with Vale and GitHub Actions.

[<FontIcon icon="iconfont icon-github"/>There are other workflows](https://docs.github.com/en/actions/use-cases-and-examples/creating-an-example-workflow) you can set up to ease the workload in managing your doc site. Remember, the main point is to organize and structure your docs while automating regular documentation practices using software development tools. This lets you focus on the most important thing which is creating quality content for your readers.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Set Up Documentation as Code with Docusaurus and GitHub Actions",
  "desc": "For technical writers, keeping documentation up to date manually can be really frustrating. Issues like outdated guides, broken links, and missing updates are a pain, and they can make writers less productive. These issues can also make it harder for...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/set-up-docs-as-code-with-docusaurus-and-github-actions.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
