---
lang: en-US
title: "How to Set Up Automated GitHub Workflows for Your Python and React Applications"
description: "Article(s) > How to Set Up Automated GitHub Workflows for Your Python and React Applications"
icon: iconfont icon-github
category:
  - DevOps
  - Github
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - github
  - github-action
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Set Up Automated GitHub Workflows for Your Python and React Applications"
    - property: og:description
      content: "How to Set Up Automated GitHub Workflows for Your Python and React Applications"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-set-up-automated-github-workflows-for-python-react-apps.html
prev: /devops/github/articles/README.md
date: 2024-11-08
isOriginal: false
author: Preston Osoro
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1730812659785/2975b117-81ee-4c73-ae24-6fb14e369714.png
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
  name="How to Set Up Automated GitHub Workflows for Your Python and React Applications"
  desc="Automating workflows is an essential step in helping you maintain code quality in your applications – especially when working on both frontend and backend code in a single repository. In this guide, we’ll walk through setting up automated GitHub work..."
  url="https://freecodecamp.org/news/how-to-set-up-automated-github-workflows-for-python-react-apps"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1730812659785/2975b117-81ee-4c73-ae24-6fb14e369714.png"/>

Automating workflows is an essential step in helping you maintain code quality in your applications – especially when working on both frontend and backend code in a single repository.

In this guide, we’ll walk through setting up automated GitHub workflows for a Python backend (using Flask or Django) and a React frontend. These workflows help test and validate code changes automatically, making sure any issues are caught early.

We’ll assume:

- You’ve already written unit tests for your React components and backend routes.
- Your project is set up as a monorepo, with separate directories for frontend and backend.
- You’re familiar with GitHub Actions, the platform we’ll use for automation, and that you’re using the `ubuntu-latest` environment provided by GitHub.

---

## Step 1: Create GitHub Actions Workflows

In this step, we’ll define two GitHub Actions workflows, one for the frontend and another for the backend. These workflows will run tests automatically whenever changes are pushed to the <FontIcon icon="fas fa-code-branch"/>`main` branch.

### What is a GitHub Action Workflow?

A GitHub Action workflow is a set of instructions that tell GitHub how to automatically execute tasks based on certain events.

Here, our workflows will run tests and deploy the app only if the tests pass. Workflows are triggered by events, such as a push to a branch, and consist of jobs that define the tasks we want to automate.

### Frontend CI/CD Pipeline

Let’s start by creating a new file in your repository at <FontIcon icon="fas fa-folder-open"/>`.github/workflows/`<FontIcon icon="iconfont icon-yaml"/>`frontend.yml`. This file will set up an automated pipeline to handle the frontend testing and deployment. Then, define the workflow with the following content:

```yaml title=".github/workflows/front.yml"
name: Frontend CI/CD Pipeline

on:
  push:
    branches:
      - main  

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Cache Node.js modules
        uses: actions/cache@v3
        with:
          path: ./frontend/node_modules
          key: ${{ runner.os }}-node-${{ hashFiles('./frontend/package-lock.json') }}
          restore-keys: |
            ${{ runner.os }}-node-

      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'

      - name: Install frontend dependencies
        run: yarn install
        working-directory: ./frontend 

      - name: Run frontend tests
        run: yarn test
        working-directory: ./frontend
```

Here’s a breakdown of what each part does:

1. `on: push`: This triggers the workflow whenever there’s a push to the `main` branch.
2. **Checkout code**: This step uses the GitHub Action to check out the repository code.
3. **Cache Node.js modules**: Caches `node_modules` to speed up workflow execution on subsequent runs.
4. **Set up Node.js**: Sets up the Node.js environment for dependency installation and testing.
5. **Install dependencies and run tests**: Installs packages with Yarn and then runs the pre-written tests to verify that the frontend works as expected.

### Backend CI/CD Pipeline

Now, let’s create a separate file for the backend workflow at <FontIcon icon="fas fa-folder-open"/>`.github/workflows/`<FontIcon icon="iconfont icon-yaml"/>`backend.yml`. This file will automate testing and deployment for the Python backend.

```yaml title=".github/workflows/backend.yml"
name: Backend CI/CD Pipeline

on:
  push:
    branches:
      - main  

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Cache Python packages
        uses: actions/cache@v3
        with:
          path: ~/.cache/pip
          key: ${{ runner.os }}-pip-${{ hashFiles('./backend/requirements.txt') }}
          restore-keys: |
            ${{ runner.os }}-pip-

      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.8'  

      - name: Create Virtual Environment
        run: python3 -m venv venv
        working-directory: ./backend

      - name: Install backend dependencies
        run: |
          source venv/bin/activate
          pip install -r requirements.txt  
        working-directory: ./backend

      - name: Configure DATABASE_URL securely
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
        run: |
          if [ -z "$DATABASE_URL" ]; then
            echo "DATABASE_URL is missing" >&2
            exit 1
          fi

      - name: Run tests with pytest
        run: |
          source venv/bin/activate
          pytest tests/ --doctest-modules -q --disable-warnings
        working-directory: ./backend  

      - name: Deploy to Production
        if: ${{ success() }}
        run: |
          echo "Deploying to production..."

      - name: Notify on Failure
        if: ${{ failure() }}
        run: |
          echo "Build failed! Sending notification..."
```

Here’s what this workflow does:

1. **Checks out code** and **caches Python packages** for faster execution on repeated runs.
2. **Sets up Python** and creates a virtual environment to isolate dependencies.
3. **Installs dependencies** in the virtual environment from <FontIcon icon="fas fa-file-lines"/>`requirements.txt`.
4. **Configures environment variables** securely with GitHub Secrets. In this example, we’re using a database URL that’s stored in a GitHub secret for secure access.
5. **Runs backend tests** with `pytest`, which checks that the backend routes and functions work correctly.

---

## Step 2: Configure Secrets

For security, let’s set up GitHub Secrets to store sensitive information, like database connection strings.

1. Go to your GitHub repository and select **Settings**.
2. In the sidebar, select **"Secrets and variables"** from the sidebar, then click on "**Actions**".
3. Add a new repository secret:
    - **Name**: `DATABASE_URL`
    - **Value**: Your actual database connection string.

Using GitHub Secrets keeps sensitive data safe and prevents it from appearing in your codebase.

---

## Step 3: Commit and Push Changes

Once your workflow files are ready, commit and push the changes to the <FontIcon icon="fas fa-code-branch"/>`main` branch. Each time you push changes to <FontIcon icon="fas fa-code-branch"/>`main`, GitHub Actions will trigger these workflows automatically, ensuring your code is thoroughly tested.

---

## Step 4: Monitor Workflow Runs

After pushing your changes, navigate to the **Actions** tab in your GitHub repository to monitor the workflow runs. Here’s what you’ll find:

- **Workflow runs**: This page lists each time a workflow is triggered. You can see if the workflow succeeded, failed, or is in progress.
- **Logs**: Click on a specific workflow run to view detailed logs. Logs are divided by steps, so you can see exactly where an issue occurred if something goes wrong.

### Identifying Issues in Logs

Each step’s log provides insights into any problems:

- If dependencies fail to install, you’ll see error messages specifying which package caused the issue.
- If tests fail, logs will list the specific tests and reasons for the failure, helping you debug quickly.
- For workflows that use secrets, errors related to missing secrets will appear in the environment setup steps, allowing you to fix any configuration issues.

By understanding how to interpret these logs, you can address issues proactively and ensure smooth, reliable deployments.

---

## Conclusion

By following these steps, you’ve set up automated GitHub workflows for both the frontend and backend of your application.

This setup ensures your tests run automatically with each push to the <FontIcon icon="fas fa-code-branch"/>`main` branch, helping maintain high code quality and reliability.

With automated workflows, you can focus more on building features and less on manually testing code, knowing that your workflows will alert you to any issues early on.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Set Up Automated GitHub Workflows for Your Python and React Applications",
  "desc": "Automating workflows is an essential step in helping you maintain code quality in your applications – especially when working on both frontend and backend code in a single repository. In this guide, we’ll walk through setting up automated GitHub work...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-set-up-automated-github-workflows-for-python-react-apps.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
