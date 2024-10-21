---
lang: en-US
title: "How to Automate Documentation Conversion with Pandoc in CI/CD Pipelines"
description: "Article(s) > How to Automate Documentation Conversion with Pandoc in CI/CD Pipelines"
icon: iconfont icon-shell
category:
  - Shell
  - Makefile
  - Github
  - DevOps
  - Docker
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - sh
  - shell
  - makefile
  - github
  - devops
  - docker
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Automate Documentation Conversion with Pandoc in CI/CD Pipelines"
    - property: og:description
      content: "How to Automate Documentation Conversion with Pandoc in CI/CD Pipelines"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-automate-documentation-conversion-with-pandoc-in-cicd-pipelines.html
prev: /programming/sh/articles/README.md
date: 2024-10-24
isOriginal: false
author: Preston Mayieka
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1729707865753/d1703b32-ccb4-4cd1-9c3e-3e66fef7e02f.png
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
  "title": "Docker > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/docker/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Automate Documentation Conversion with Pandoc in CI/CD Pipelines"
  desc="In any software project, documentation plays a crucial role in guiding developers, users, and stakeholders through the project's features and functionalities. As projects grow and evolve, managing documentation across various formats—whether it’s mar..."
  url="https://freecodecamp.org/news/how-to-automate-documentation-conversion-with-pandoc-in-cicd-pipelines"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1729707865753/d1703b32-ccb4-4cd1-9c3e-3e66fef7e02f.png"/>

In any software project, documentation plays a crucial role in guiding developers, users, and stakeholders through the project's features and functionalities.

As projects grow and evolve, managing documentation across various formats—whether it’s markdown, HTML, or PDF for offline use—can become a time-consuming and error-prone task.

[<FontIcon icon="fas fa-globe"/>Pandoc](https://pandoc.org/) is a powerful tool that allows you to convert documentation between formats seamlessly.

Still, even with Pandoc, manually converting files for every update can become a bottleneck in large projects or teams where documentation is frequently updated.

In this article, I’ll guide you through setting up shell scripts, using Makefiles, and integrating Pandoc into CI/CD pipelines to streamline your workflow and keep your documentation up-to-date with minimal effort.

---

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1729625689479/bfba6404-0a0c-4dab-9a15-0058b33c3c0c.png)

---

## Why Automate Documentation Conversion?

Manually converting documentation between formats in large projects can become a daunting task.

Whether you're generating **HTML**, **PDF**, or **DOCX** versions from the same source, repeating this process for every update leads to various challenges:

- **Time-Consuming**: Running manual commands to convert documentation every time you make a change eats into valuable development time when updates happen often.
- **Prone to Errors**: The manual process increases the likelihood of mistakes, such as using incorrect commands, missing steps, or generating outdated versions of your documentation. These inconsistencies can confuse both developers and end-users.
- **Difficult to Scale**: As projects grow in size, managing documents across different formats without automation can become unmanageable. Teams working in parallel may struggle to keep documentation synchronized, leading to mismatches between formats.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1729627548454/96b38163-5eda-4412-83fb-483180410c61.png)

By automating the conversion process with tools like Pandoc, you can overcome these challenges and enjoy a range of benefits:

- **Consistency**: Automation ensures that all versions of your documentation are always up-to-date and accurate. No matter the number of formats you're generating, the process remains standardized.
- **Efficiency**: Automated workflows free up time by handling repetitive tasks in the background, allowing teams to focus on development rather than manually managing documentation updates.
- **Scalability**: With automation, it’s straightforward to scale documentation efforts as your project grows. Whether you're maintaining a single document or an entire library of resources, automation makes sure everything stays synchronized with minimal effort.

The next section explores how to automate the conversion process.

---

## How to Automate Pandoc using Shell Scripts

By using [shell scripts (<FontIcon icon="fa-brands fa-medium"/>`@jadhav.swatissj99`)](https://medium.com/@jadhav.swatissj99/introduction-to-shell-scripting-automate-your-workflow-efficiently-d9415537e990), you can streamline the process of running [<FontIcon icon="fas fa-globe"/>PanDoc commands](https://pandoc.org/getting-started.html#step-6-converting-a-file), saving time and reducing the risk of errors associated with manual command execution.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1729627613042/5a2b2c62-3f67-42a5-81fe-5d4ff58714c3.png)

### Basic Shell Script for PanDoc Conversion

To get started, we’ll create a shell script that converts a single Markdown file into various formats.

For instance, here’s a script that converts <FontIcon icon="fa-brands fa-markdown"/>`input.md` into HTML and PDF:

```bash
#!/bin/bash

# Convert input.md to HTML and PDF
pandoc input.md -o output.html
pandoc input.md -o output.pdf

echo "Conversion complete!"
```

In the above script:

- The `#!/bin/bash` line indicates that the script should be run using the Bash shell.
- The pandoc commands convert the <FontIcon icon="fa-brands fa-markdown"/>`input.md` file into <FontIcon icon="fa-brands fa-html5"/>`output.html` and <FontIcon icon="fas fa-file-pdf"/>`output.pdf`.
- The `echo` command confirms that the conversion process is complete.

### Customizing the Script for Several Files

If you want to convert all Markdown files in a directory, you can customize your script to process several files at once.

For instance, here’s a script that converts <FontIcon icon="fa-brands fa-markdown"/>`input.md` into `HTML` and `PDF`:

```bash
#!/bin/bash

# Go through all the Markdown files present in the current directory
for file in *.md; do
  # Convert each Markdown file to PDF
  pandoc "$file" -o "${file%.md}.pdf"
done

echo "All conversions complete!"
```

In this script:

- The `for` loop iterates over each `.md` file in the current directory.
- The `pandoc` command converts each Markdown file to a PDF, preserving the original filename but changing the extension to `.pdf` with the `${file%.md}.pdf` syntax.
- The final `echo` confirms that all conversions are complete.

### Adding Error Handling and Complex Logic

To enhance your script's robustness, you can add error handling and extra logic.

For instance, perhaps you want to make sure that Pandoc is installed before proceeding, and handle cases where the input file may be missing.

The script will be as follows:

```bash
#!/bin/bash

# Check if Pandoc is installed
if ! command -v pandoc &> /dev/null; then
  echo "Pandoc is not installed. Please install it and try again."
  exit 1
fi

# Go through all the Markdown files present in the current directory
for file in *.md; do
  if [ -e "$file" ]; then
    # Convert each Markdown file to PDF
    pandoc "$file" -o "${file%.md}.pdf"
    echo "Converted $file to PDF."
  else
    echo "No Markdown files found."
  fi
done

echo "All conversions complete!"
```

In this enhanced script:

- The `if ! command -v pandoc &> /dev/null; then` line checks whether Pandoc is installed.
- The `if [ -e "$file" ]; then` statement checks if each Markdown file exists before attempting to convert it.
- An informative message is printed after each successful conversion, providing feedback on the process.

As your project grows in complexity, relying solely on shell scripts for automation can become difficult to manage when dealing with lots of files and frequent updates.

This is where <FontIcon icon="fas fa-hammer"/>`Makefiles` come in handy.

### Automating with Makefiles

A [<FontIcon icon="fas fa-globe"/>Makefile](https://opensource.com/article/18/8/what-how-makefile) is a special file that defines rules and commands for automating tasks in a project.

It’s widely used by developers to **compile code**, but developers can also leverage it for non-compilation tasks, such as converting documentation formats with Pandoc.

### A Makefile for Pandoc Conversions

Here’s an example of how you can create a Makefile to automate Pandoc conversions:

```makefile
all: html pdf

html:
    pandoc input.md -o output.html

pdf:
    pandoc input.md -o output.pdf
```

In this Makefile:

- `all` is the default target. When you run `make` without specifying a target, it will run the `html` and `pdf` targets sequentially.
- The `html` target runs a PanDoc command to convert <FontIcon icon="fa-brands fa-markdown"/>`input.md` into <FontIcon icon="fa-brands fa-html5"/>`output.html`.
- The `pdf` target runs a PanDoc command to convert <FontIcon icon="fa-brands fa-markdown"/>`input.md` into <FontIcon icon="fas fa-file-pdf"/>`output.pdf`.

To use this Makefile, run the following command in your terminal:

```bash
codemake
```

This will execute both the `html` and `pdf` targets, converting the Markdown file into both formats.

### Defining Dependencies in Makefiles

One of the major strengths of Makefiles is their ability to handle **dependencies**.

In the context of documentation conversion, you can specify which files to update when you **detect changes** in the source file.

Let’s look at an example:

```makefile
output.html: input.md
    pandoc input.md -o output.html

output.pdf: input.md
    pandoc input.md -o output.pdf
```

In this Makefile:

- The <FontIcon icon="fa-brands fa-html5"/>`output.html` and <FontIcon icon="fas fa-file-pdf"/>`output.pdf` files depend on <FontIcon icon="fa-brands fa-markdown"/>`input.md`.
- If you run make <FontIcon icon="fa-brands fa-html5"/>`output.html` or make <FontIcon icon="fa-brands fa-html5"/>`output.pdf`, Pandoc will regenerate the corresponding file if you update <FontIcon icon="fa-brands fa-markdown"/>`input.md` after the last time you created the output file.

This ensures that Pandoc converts the files that have changed, saving time when working on large documentation projects.

### Why Use Makefiles for Pandoc Automation?

Makefiles offer several advantages for automating Pandoc conversions in larger projects:

- **Efficiency**: Makefiles rebuild what’s necessary, meaning you won’t waste time converting files that haven’t changed.
- **Simplicity**: Once set up, running `make` simplifies the conversion process to a single command, making it easier for teams to maintain consistent documentation workflows.
- **Scalability**: As your project grows, you can add more targets and dependencies to the Makefile, automating everything from documentation to more complex build processes.

Makefiles are an excellent option for automating documentation conversions, when combined with Pandoc for multi-format outputs.

They help ensure that your workflow is **efficient** and your documentation remains up-to-date.

As modern development practices increasingly rely on [<FontIcon icon="fa-brands fa-redhat"/>Continuous Integration and Continuous Deployment (CI/CD)](https://redhat.com/en/topics/devops/what-is-ci-cd#:~:text=CI%2FCD%2C%20which%20stands%20for,a%20shared%20source%20code%20repository.), automating routine tasks such as documentation generation becomes essential.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1729626428543/8194dc35-8a1a-4d91-b4b0-8b8ce7174eba.jpeg)

Integrating Pandoc into your [<FontIcon icon="fa-brands fa-redhat"/>CI/CD pipelines](https://redhat.com/en/topics/devops/what-cicd-pipeline) allows for seamless documentation conversion and updates, ensuring that your docs are always up-to-date without manual intervention.

By automating this process, you can focus on coding and building, while your pipeline handles the conversion and distribution of your project documentation. Let’s explore how to set up Pandoc in a CI/CD pipeline to streamline your documentation workflows.

---

## How to Integrate Pandoc with CI/CD Pipelines

Automating documentation generation within your CI/CD pipeline brings significant benefits, including consistency, efficiency, and hands-off updates.

Whether you’re using [<FontIcon icon="iconfont icon-github"/>GitHub Actions](https://github.com/features/actions), [<FontIcon icon="fa-brands fa-gitlab"/>GitLab CI](https://about.gitlab.com/topics/ci-cd/), [<FontIcon icon="fa-brands fa-jenkins"/>Jenkins](https://jenkins.io/), or another automation tool, integrating Pandoc ensures that documentation gets generated and distributed whenever changes occur.

This approach reduces the risk of **outdated** or **inconsistent** documentation.

### Example: Setting Up Pandoc with GitHub Actions

Let’s walk through a clear example of how you can use **GitHub Actions** to automate the process of generating documentation with Pandoc.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1729626613665/ddc1ddd8-2049-4971-8883-1f86bd80a558.png)

Below is a basic workflow that converts a **Markdown file (`*.md`)** into a **PDF** whenever code gets pushed to the repository.

```yaml
name: Generate Documentation

on: [push]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      # Step 1: Checkout code from the repository
      - name: Checkout code
        uses: actions/checkout@v2

      # Step 2: Install Pandoc
      - name: Install Pandoc
        run: sudo apt-get install pandoc

      # Step 3: Convert Markdown to PDF
      - name: Convert Markdown to PDF
        run: pandoc input.md -o output.pdf

      # Step 4: Upload the generated PDF as an artifact
      - name: Upload Documentation
        uses: actions/upload-artifact@v2
        with:
          name: documentation
          path: output.pdf
```

Here’s a breakdown of each step:

- **Checkout Code**: The `actions/checkout@v2` action retrieves the latest code from your repository.
- **Install Pandoc**: This step installs Pandoc on the runner (in this case, an Ubuntu machine) so that it can gets used for the documentation conversion.
- **Convert Markdown to PDF**: The PanDoc command converts the <FontIcon icon="fa-brands fa-markdown"/>`input.md` file into <FontIcon icon="fas fa-file-pdf"/>`output.pdf`.
- **Upload Documentation**: This step saves the generated PDF as an artifact in the CI/CD pipeline, making it downloadable or accessible later

### Triggering on Documentation Updates

You can configure your CI/CD pipeline to trigger when documentation updates occur, for example, when changes get pushed to a <FontIcon icon="fas fa-code-branch"/>`docs` branch:

```yaml
on:
  push:
    branches:
      - docs
```

This setup ensures that your documentation gets regenerated when changes are specifically made to the documentation branch, reducing unnecessary rebuilds.

### Adapting for GitLab CI or Jenkins

While the above example uses GitHub Actions, the same principles work on other CI/CD systems like **GitLab CI** or **Jenkins**.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1729626674435/91e102a9-cb70-4819-bb0d-5a60f16dcdae.jpeg)

For instance, in GitLab CI, you could define a <FontIcon icon="fa-brands fa-gitlab"/>`.gitlab-ci.yml` file that follows similar steps to check out the code, install Pandoc, convert the files, and store the resulting documentation.

Integrating Pandoc into your CI/CD pipeline offers a reliable way to automate your documentation workflows, ensuring that your project docs are always current, accurate, and accessible.

---

## Advanced Automation Techniques

When your project reaches a stage where documentation needs to be generated frequently or across multiple environments, it’s essential to extend your automation strategy to maintain consistency and reliability.

### Automating with Cron Jobs

For projects where documentation updates occur frequently, but not always due to code pushes or commits, you can automate the process using [<FontIcon icon="fa-brands fa-wikipedia-w"/>**cron jobs**](https://en.wikipedia.org/wiki/Cron).

Cron allows you to **schedule tasks** at specific intervals, meaning your documentation can automatically get updated at set times without needing manual input.

For example, setting up a cron job to run every day at midnight to convert Markdown files to PDFs:

```bash
0 0 * * * /path/to/pandoc /path/to/input.md -o /path/to/output.pdf
```

With this cron job in place, Pandoc will automatically convert your Markdown files to PDFs at the specified time, ensuring that your documentation remains up-to-date without manual intervention.

### Ensuring Consistency with Docker

When working in a team or across various systems, ensuring that Pandoc runs consistently in different environments can be challenging.

[<FontIcon icon="fa-brands fa-docker"/>Docker](https://docker.com/) provides a solution to this by allowing you to package Pandoc and all its dependencies in a container, ensuring that the same setup gets used everywhere.

This is useful in CI/CD pipelines, where different environments (like local machines, staging, and production servers) can have different configurations.

You can use the official [Pandoc Docker image (<FontIcon icon="fa-brands fa-docker"/>`pandoc`)](https://hub.docker.com/u/pandoc) to simplify the setup process:

```bash
docker run --rm -v $(pwd):/data pandoc/core:latest input.md -o output.pdf
```

This command runs Pandoc inside a Docker container, using the latest version of Pandoc, and mounts your current directory to the container’s <FontIcon icon="fas fa-folder-open"/>`/data` directory.

By doing this, you ensure that no matter where the pipeline runs, the conversion will work the same way every time.

### Combining Tools for Efficiency

By combining tools like **cron jobs** and **Docker**, you can set up an advanced automation pipeline that ensures:

- **Scheduled updates**: Cron jobs trigger documentation generation at regular intervals.
- **Consistency across environments**: Docker ensures that Pandoc and its dependencies are the same on every machine.
- **Reliability**: Together, these tools help ensure that your documentation is always accurate, no matter where or when it’s generated.

These advanced techniques allow you to further streamline your documentation workflows, improving both efficiency and reliability as your project grows.

---

## Conclusion

Automating documentation conversion with Pandoc not only saves time but also ensures consistency and scalability as your project grows.

Whether you’re managing small or large projects, these techniques enable you to focus on coding and building, knowing that your documentation is automatically up-to-date and ready for distribution.

By embracing automation, you streamline your development process and enhance collaboration across teams, ensuring that your documentation evolves as efficiently as your code.

Now it’s time to apply these tools to your projects and enjoy the benefits of a fully automated documentation pipeline.

**Let’s stay in touch:**

- [Connect with me on LinkedIn (<FontIcon icon="fa-brands fa-linkedin"/>`preston-mayieka`)](https://linkedin.com/in/preston-mayieka/). I post regularly, so following me is a great idea.
- [Follow me on X (<FontIcon icon="fa-brands fa-x-twitter"/>`Preston_Mayieka`)](https://x.com/Preston_Mayieka)

Feel free to reach out through the channels above if you have any questions. I will be happy to help.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Automate Documentation Conversion with Pandoc in CI/CD Pipelines",
  "desc": "In any software project, documentation plays a crucial role in guiding developers, users, and stakeholders through the project's features and functionalities. As projects grow and evolve, managing documentation across various formats—whether it’s mar...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-automate-documentation-conversion-with-pandoc-in-cicd-pipelines.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
