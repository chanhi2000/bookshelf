---
lang: en-US
title: "The Simplest Way to Deploy Your Own Updatable Portfolio Site"
description: "Article(s) > The Simplest Way to Deploy Your Own Updatable Portfolio Site"
icon: iconfont icon-github
category:
  - DevOps
  - Github
  - Article(s)
tag:
  - blog
  - frontendmasters.com
  - devops
  - github
head:
  - - meta:
    - property: og:title
      content: "Article(s) > The Simplest Way to Deploy Your Own Updatable Portfolio Site"
    - property: og:description
      content: "The Simplest Way to Deploy Your Own Updatable Portfolio Site"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/the-simplest-way-to-deploy.html
prev: /devops/github/articles/README.md
date: 2025-05-29
isOriginal: false
author:
  - name: Chris Coyier
    url : https://frontendmasters.com/blog/author/chriscoyier/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/5784
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
  name="The Simplest Way to Deploy Your Own Updatable Portfolio Site"
  desc="For the true beginners out there! We'll put the files in a GitHub repo and connect it to Netlify to host it."
  url="https://frontendmasters.com/blog/the-simplest-way-to-deploy/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/5784"/>

Let’s say you’ve got a set of static files (HTML, CSS, JavaScript, images, etc) that build your website. Perhaps it’s your portfolio website, thanks to having taken Jen Kramer’s course [<FontIcon icon="fas fa-globe"/>Web Development Project: Personal Portfolio Website](https://frontendmasters.com/courses/portfolio-website/?utm_source=boost&utm_medium=blog&utm_campaign=boost), for example, but it could be anything.

![A file directory labeled 'portfolio' showing three files: <FontIcon icon="fa-brands fa-html5"/>`index.html`, <FontIcon icon="fa-brands fa-js"/>`script.js`, and <FontIcon icon="fa-brands fa-css3-alt"/>`style.css`, with their sizes and types displayed.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/05/Screenshot-2025-05-20-at-2.46.02%E2%80%AFPM.png?resize=1024%2C622&ssl=1)

Hey, what do you know, I’ve got some static files that make a nice personal portfolio page right here.

We’ve covered [**the very fastest way**](/frontendmasters.com/exactly-how-to-deploy-local-files-to-make-a-live-website.md) to get those files turned into a deployed website on the internet already, using [<FontIcon icon="fas fa-globe"/>Netlify’s tool](https://app.netlify.com/drop). That totally works, but we can take things a little further to make things easier on our future selves.

Websites tend to need to be *updated.* Technically, you can keep using that tool to drag-and-drop your entire site again. But since we’re here to learn to be a better developer, **let’s do better** than that. We’re going to start using Git and GitHub. Let’s do the steps.

::: info Article Series

```component VPCard
{
  "title": "Exactly How to Deploy Local Files to Make a Live Website",
  "desc": "A very basic step-by-step guide of exactly how to do it for static files like .html, .css, and .js files. ",
  "link": "/frontendmasters.com/exactly-how-to-deploy-local-files-to-make-a-live-website.md",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "The Simplest Way to Deploy Your Own Updatable Portfolio Site",
  "desc": "For the true beginners out there! We'll put the files in a GitHub repo and connect it to Netlify to host it.",
  "link": "/frontendmasters.com/the-simplest-way-to-deploy.md",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

:::

---

## Git?

Git is the name of the technology we’ll use, which is what they call a VCS or Version Control System. We’ll put our files in Git, then when we change anything, Git will know about it. Git allows us to “commit” those changes, which gives us a history of what changed. That alone is a great feature. But crucially, Git allows us to work with others (they can “pull” those commits) and most importantly for us today: connect other apps to Git. For example, when changes are pushed up, “deploy” the changes to the live website.

---

## 1) Make sure you have a GitHub account

There is a 99.99% chance you’ll need/want a GitHub account in your developer career. If you don’t already have one, [<FontIcon icon="iconfont icon-github"/>get one](https://github.com/signup?source=login):

![GitHub sign-up page showing fields for email, password, username, country/region, and email preferences, with a dark background and cartoonish character icons.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/05/Screenshot-2025-05-26-at-10.15.42%E2%80%AFAM.png?resize=1024%2C725&ssl=1)

[The accessibility of this page just got improved](https://annebovelett.eu/designers-your-excuse-is-gone-stunning-animated-and-accessible-yes-you-can/) while retaining a great design, good job team.

---

## 2) Get the GitHub Desktop App

We’re baby-steppin’ here, and I think it will be easier for us to use [<FontIcon icon="iconfont icon-github"/>the official GitHub app](https://github.com/apps/desktop) than it will be to use what developers call “the command line” to work with Git (but [<FontIcon icon="fas fa-globe"/>someday you can level up](https://frontendmasters.com/courses/everything-git/)).

![Screenshot of the GitHub Desktop application showcasing the interface with an emphasis on simplifying the Git workflow.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/05/Screenshot-2025-05-26-at-10.17.15%E2%80%AFAM.png?resize=1024%2C968&ssl=1)

It’s free.

Honestly, I’ve been using Git for a hot long while and I still use GUI apps like this ([**literally this**](/frontendmasters.com/tower-vs-github-desktop.md)) to work with Git as I prefer the visual nature of it. This is true of many of the talented developers I work with, who are are very capable of command line usage as well.

---

## 3) Make a Repo

“Repo” is just short for “repository”. You could make one locally and push it up to GitHub as a second step, but for whatever reason I prefer [<FontIcon icon="iconfont icon-github"/>making it on GitHub](https://github.com/new), “pulling it down” and going from there.

![Screenshot of the GitHub interface for creating a new repository, featuring fields for repository name, description, and options for initializing and licensing.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/05/Screenshot-2025-05-26-at-10.21.12%E2%80%AFAM.png?resize=833%2C1024&ssl=1)

You likely don’t need anything but the defaults here.

---

## 4) Pull the Repo from GitHub to your Local Computer

One reason to use the GitHub Desktop app we downloaded is that the GitHub website is nicely integrated with it, giving us a quick button to click:

![Screenshot of a GitHub repository page showcasing the options for setting up the repository in GitHub Desktop.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/05/CleanShot-2025-05-26-at-10.24.09%402x.png?resize=1024%2C972&ssl=1)

![Screenshot of the GitHub Desktop app showing the 'Clone a Repository' dialog, with fields for the repository URL and local path.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/05/Screenshot-2025-05-26-at-10.24.41%E2%80%AFAM.png?resize=1024%2C672&ssl=1)

I have a folder just called “GitHub” I put all my repos in.

This folder will essentially be empty. (In truth, it has a <FontIcon icon="fas fa-folder-open"/>`.git` folder inside of it, but most operating systems and code editors hide folders and files that start with a `.` by default so you don’t see it while browsing files.)

---

## 5) Put your static files in the folder you just pulled down

Now you can drag your static files into that “empty” folder that is your repo. When the files are in there, GitHub Desktop (and really, Git itself) will “see” those files as changes to the repo. So you’ll see this:

![Screen displaying a GitHub Desktop application with a portfolio repository, showing files index.html, script.js, and style.css marked as changed, along with a code window for editing index.html.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/05/Screenshot-2025-05-26-at-10.28.21%E2%80%AFAM.png?resize=1024%2C723&ssl=1)

(That <FontIcon icon="fas fa-file-lines"/>`.DS_Store` file is just an awkward thing macOS does. Try right-clicking that file and ignoring it and seeing what that does.)

---

## 6) Push your static files to the Repo

All those files are now selected (see the checkmarks). Type in a commit message (where it says “Summary (required)” in GitHub Desktop) and then clicking the blue Commit button.

After committing, you will no longer see any local changes, but you’ll see that “commit” you just did under the **History** tab. Your job now is to click the **Publish branch** button on in the upper right.

![Screenshot of the GitHub Desktop application showing the first commit in a repository named 'my-portfolio', with a list of changed files including index.html, script.js, and style.css.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/05/Screenshot-2025-05-26-at-10.30.54%E2%80%AFAM.png?resize=1024%2C737&ssl=1)

After you’ve done that, you’ll see the files you “pushed” up right on GitHub.com in your repo URL:

![Screenshot of a GitHub repository showing a personal portfolio project with files including index.html, script.js, and style.css, along with commit history and repository details.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/05/Screenshot-2025-05-26-at-10.32.40%E2%80%AFAM.png?resize=1024%2C832&ssl=1)

---

## 7) Now that your website files are on GitHub, we can deploy them to a live website

Just so you’re aware, GitHub has a product called [<FontIcon icon="iconfont icon-github"/>GitHub Pages](https://pages.github.com/) where we could just make GitHub itself the home of your website. That can be a good option, but we’re also fans of [<FontIcon icon="fas fa-globe"/>Netlify](https://netlify.com/) here and generally think that’s the best option for projects like this, so [<FontIcon icon="fas fa-globe"/>sign up for a free account at Netlify](https://app.netlify.com/signup) if you don’t have one.

---

## 8) Make a New Projects on Netlify

One you’re in, go to **Projects** and add a new one by selecting **Import an existing project.**

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/05/Screenshot-2025-05-28-at-6.47.16%E2%80%AFAM.png?resize=658%2C770&ssl=1)

![Then select GitHub as that’s where our project lives.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/05/Screenshot-2025-05-28-at-6.48.28%E2%80%AFAM-1.png?resize=1024%2C322&ssl=1)

![You may need to grant Netlify permissions on GitHub](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/05/Screenshot-2025-05-28-at-6.50.18%E2%80%AFAM.png?resize=643%2C1024&ssl=1)

![Once Netlify is authorized, you’ll see a list of your repos. Find the porfolio one we’re working with and click it](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/05/Screenshot-2025-05-28-at-6.50.44%E2%80%AFAM.png?resize=1024%2C433&ssl=1)

Now you pick the URL for it, which for now will be `your-chosen-name**.netlify.app`. You don’t need to change any other settings, so scroll down and **Deploy** it.

---

## 9) Your Website will Go Live

Netlify will work on deploying it, which should be pretty fast probably.

![Maybe a few minutes at worst.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/05/Screenshot-2025-05-28-at-7.02.23%E2%80%AFAM.png?resize=1024%2C681&ssl=1)

![Then it will be live!](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/05/Screenshot-2025-05-28-at-7.12.56%E2%80%AFAM.png?resize=966%2C804&ssl=1)

You can click that green link like you see above to see the website.

**You can share that URL with anyone in the world and they’ll be able to see it.** That’s the power of the world wide web. It’s awesome. Here’s a view of the files I uploaded:

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/05/Screenshot-2025-05-28-at-7.15.25%E2%80%AFAM.png?resize=1024%2C676&ssl=1)

---

## 10) Make Some Changes

Another wonderful part of working on websites is you can easily change them at any time. That’s part of why we’re working with Git, because we can push up those changes and keep track of them. We can also efficiently deploy only changed files and such.

If I change the files locally, the GitHub Desktop app will show me what has changed. I can check out those changes, confirming it’s exactly as I want, then type in a commit message and commit them, then click **Push origin** to both push the changes to GitHub and deploy the site on Netlify.

![Screenshot of a GitHub Desktop interface showing changes in HTML and CSS files, highlighting modifications to the text 'Frontend Developer' to 'Front-End Dev' with a commit message field.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/05/Screenshot-2025-05-28-at-7.24.26%E2%80%AFAM.png?resize=1024%2C737&ssl=1)

![Screenshot of a portfolio website featuring the text 'Hi, I'm Chris Front-End Dev' with a pink button labeled 'Contact' and navigation links.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/05/Screenshot-2025-05-28-at-7.26.58%E2%80%AFAM.png?resize=1024%2C662&ssl=1)

You really are a web designer and front-end developer now!

Next time we’ll take things just a smidge further, adding in a tool to help us build slightly more complex websites, which will make more clear why we’re using Netlify. And we’ll use a “real” domain name entirely of our own.

::: info Article Series

1. [Exactly How to Deploy Local Files to Make a Live Website](https://frontendmasters.com/blog/exactly-how-to-deploy-local-files-to-make-a-live-website/)
```component VPCard
{
  "title": "The Simplest Way to Deploy Your Own Updatable Portfolio Site",
  "desc": "For the true beginners out there! We'll put the files in a GitHub repo and connect it to Netlify to host it.",
  "link": "/frontendmasters.com/the-simplest-way-to-deploy.md",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The Simplest Way to Deploy Your Own Updatable Portfolio Site",
  "desc": "For the true beginners out there! We'll put the files in a GitHub repo and connect it to Netlify to host it.",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/the-simplest-way-to-deploy.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
