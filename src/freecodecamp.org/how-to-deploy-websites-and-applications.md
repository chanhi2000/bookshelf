---
lang: en-US
title: "How to Deploy Your Websites and Apps - User-Friendly Deployment Strategies"
description: "Article(s) > How to Deploy Your Websites and Apps - User-Friendly Deployment Strategies"
icon: fas fa-network-wired
category:
  - DevOps
  - Render
  - Vercel
  - Github
  - Netlify
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - render
  - vercel
  - github
  - netlify
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Deploy Your Websites and Apps - User-Friendly Deployment Strategies"
    - property: og:description
      content: "How to Deploy Your Websites and Apps - User-Friendly Deployment Strategies"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-deploy-websites-and-applications.html
prev: /devops/articles/README.md
date: 2023-08-09
isOriginal: false
author:
  - name: Ijeoma Igboagu
    url : https://freecodecamp.org/news/author/Ijay/
cover: https://freecodecamp.org/news/content/images/2023/08/cover-friendly-deploy.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Render > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/render/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Vercel > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/vercel/articles/README.md",
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
  "title": "Netlify > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/netlify/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Render > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/render/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Deploy Your Websites and Apps - User-Friendly Deployment Strategies"
  desc="Deploying your application is a key aspect of software development. Typically, having an app on your local system isn't enough - it needs to be accessible online. So choosing a suitable and user-friendly hosting and deployment plan is vital. The key ..."
  url="https://freecodecamp.org/news/how-to-deploy-websites-and-applications"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2023/08/cover-friendly-deploy.png"/>

Deploying your application is a key aspect of software development. Typically, having an app on your local system isn't enough - it needs to be accessible online. So choosing a suitable and user-friendly hosting and deployment plan is vital.

The key to making the right decision lies in understanding the goal of your application. Perhaps it’s a simple website, a one-page app, or it requires serverless or cloud functions. Having clarity about these aspects will significantly ease the deployment process.

In this article, we will look at a few popular methods for deploying your application that will help tackle these challenges.

---

## What to Consider when Deploying to a Hosting Platform

There are several factors to take into account when selecting a hosting platform:

1. **Purpose**: Before you host your application, consider the technologies you used to build it and how much storage the platform can handle.
2. **Interface**: A good interface is essential for a hosting platform. Look for a control panel or dashboard that allows you to easily administer your website.
3. **Reviews**: Look at the hosting service's reviews and read what other clients have to say.
4. **Security**: To safeguard your website and data, it is essential to have the right security measures in place.
5. **Support**: You should always have someone there to help you out when you need it.

### Why is Deploying an Application Important?

If you've built an app, there are various reasons you may want or need to deploy it, such as:

1. It showcases professionalism and credibility to users.
2. It increases the accessibility of the application to a broader audience.
3. It enables user interaction and feedback.
4. It facilitates data analysis and provides insights for informed decision-making.
5. It identifies areas for improvement in the application.

### What's the Benefit of Choosing a User-Friendly Deployment Method?

Opting for a more approachable deployment method brings significant advantages:

1. **Collaboration**: When working together as a team, it’s useful to have straightforward methods to deploy your application. This makes collaboration and teamwork easy. These will encourage cooperation throughout the deployment process.
2. **Efficiency**: A user-friendly deployment method simplifies the process.
3. **Simplicity**: Choosing a hosting platform that is easy to understand will benefit everyone involved.
4. **Reliability**: easy to use deployment methods ensure a more reliable application and minimise potential disruptions.

---

## How to Deploy a Website or App with Render

Render provides an interface for quick and straightforward publishing of static web content. Let's now go through how to deploy an app to Render step by step.

::: tabs

@tab:active Step 1

First, ensure you have deployed your work or code from your editor to your GitHub account.

@tab Step 2

Open a new browser tab and navigate to the [<FontIcon icon="iconfont icon-render"/>Render website](https://render.com/).

![render website](https://cdn.hashnode.com/res/hashnode/image/upload/v1743002851078/4bf085d2-7c38-432b-93bf-95f2b02368e7.gif)

@tab Step 3

Select the “GET STARTED” button on Render's home page to get going.

- You can use your GitHub, GitLab, or Bitbucket account when signing up. Choose the GitHub option and follow the steps to grant Render access to your GitHub account.
- If you already have a Render account, click the “Sign in” button to be redirected to the Sign-in page. You can sign in via email and authenticate using your Google account or your GitHub account.

![Render sign in page](https://cdn.hashnode.com/res/hashnode/image/upload/v1743002894595/542d8097-4fcc-409a-bc80-a599656152c9.gif)

@tab Step 4

Once you access the dashboard, click the “New” button.

![Dashboard of Render](https://cdn.hashnode.com/res/hashnode/image/upload/v1743002941009/36239b95-8cf3-4633-9b27-fb966a133270.png)

@tab Step 5

Upon doing so, a drop-down menu will appear. It'll show you a comprehensive list of services provided by Render.

![List of Services offered by render](https://cdn.hashnode.com/res/hashnode/image/upload/v1743003263069/d8053161-5ef1-4c1b-a047-c635c75df2eb.png)

@tab Step 6

Clicking “Static Site” from the drop-down menu will lead you to the “Create a New Static Site” page. From there, you can select the repository you wish to host.

![Create a New Static Site](https://cdn.hashnode.com/res/hashnode/image/upload/v1743003315411/fe9a7eb8-2303-48ad-b83a-fb471e821e05.png)

@tab Step 7

After selecting the repository you wish to host, you will be directed to the deployment platform. There, you can provide the necessary information to host the application and click the “Create Static Site” button for it to deploy.

![Deploying the app using Render](https://cdn.hashnode.com/res/hashnode/image/upload/v1743003358045/c37346e8-5793-40a3-95fc-17c388b110ed.png)

:::

Here's what the final output should look like:

![Hosted application](https://cdn.hashnode.com/res/hashnode/image/upload/v1743003407878/76f120fe-8754-4e7c-8746-6107f47d7425.png)

### Pros of Deploying With Render

- Render has a free tier for hosting basic static websites.
- It provides a flexible price structure that ensures transparency and cost-effectiveness.
- It makes deployment easy. They provide an interface and connection with standard development tools and platforms. It also supports a wide range of programming languages, frameworks, and databases.
- It delivers a variety of integrated features that improve the hosting experience.
- It has good customer service support.

### Cons of Deploying With Render

- Render specializes in static websites, Docker containers, and serverless functions.
- For more complex/bigger applications, there's a paid plan. You'll need to go through their price structure and understand the charges related to your usage.
- There is a learning curve, especially for newcomers to the platform.

---

## How to Deploy a Website or App with Surge

This friendly platform and tool make it quick and easy to deploy static websites online.

Deploying your static files to [<FontIcon icon="iconfont icon-surge"/>surge.sh](https://surge.sh/) is easy using the command-line interface (CLI).

This command-line interface (CLI) streamlines the process of hosting and distributing your online projects.

![Surge website](https://cdn.hashnode.com/res/hashnode/image/upload/v1743003449591/4825b5da-69a7-4780-924c-8c2206c82a96.png)

### Steps to Deploy Your Site Using Surge

First, in the terminal of your project, type the command `npm i -g surge`.

Then type the command `surge`.

And that's it! You can deploy your app without logging in into your GitHub account.

To see what you have deployed, first copy the successful link in the terminal. Then paste it into your browser. You should see something like this:

![Hosted site with Surge](https://cdn.hashnode.com/res/hashnode/image/upload/v1743003506734/70e7d551-2aa9-4023-980c-53a8fdd34d2d.png)

Like I mentioned before, Surge doesn't need extra code. You can easily deploy your app right from your editor's terminal by typing the command `surge`.

### Pros of Deploying with Surge

- **Easy to Use:** Surge provides a simple deployment for static websites.
- **Fast Deployment:** It has a quick deployment time.
- **Custom Domains:** It allows you to use your domain name for your website.
- **SSL Support:** It provides free SSL certificates.
- **Support for Single-Page Applications (SPAs):** It's well-suited for deploying single-page applications.

### Cons of Deploying with Surge

- **Limited Functions:** Surge is designed for static websites.
- **No Custom Server Configurations:** It streamlines the deployment process by abstracting away server configurations.
- **Premium Features:** This platform offers free hosting for basic usage, but you'll have to pay for more features.

---

## How to Deploy a Website or App with Vercel

Vercel is a hosting and deployment platform that specializes in modern web applications.

It is particularly well-suited for single-page applications, serverless operations, and static websites. It integrates with popular frameworks like Next.js and Gatsby.js, making deployments fast and simple.

### Steps to Deploy Your Site Using Vercel

First, ensure that you have deployed your work or code from your editor to your GitHub account.

Then open a new browser tab and navigate to [<FontIcon icon="iconfont icon-vercel"/>Vercel’s website](https://vercel.com/).

![Vercel website](https://cdn.hashnode.com/res/hashnode/image/upload/v1743003556995/7c48e8dc-6955-45c2-a068-c6c1b0e15cf6.png)

Head to the Vercel website and click the “Sign up” button on the homepage.

- Sign up using your GitHub account and follow the steps to grant Vercel access to your GitHub account. If you already have a Vercel account, click the “Login” button and enter your login information.
- After signing up or logging in, Vercel will request access to specific information from your GitHub account. Review the required permissions and permit Vercel to proceed.

Next, click on “Add New…” on the Vercel dashboard. This action will reveal a drop-down menu. From the menu, select “Project,” which will navigate you to the next page.

![Add New Project](https://cdn.hashnode.com/res/hashnode/image/upload/v1743003587862/a04db892-e3fe-4218-a60f-ed134e143006.gif)

On the next page, you will import your repository for deployment.

![Vercel Deployment](https://cdn.hashnode.com/res/hashnode/image/upload/v1743003630267/265499e1-d1cd-4083-a05c-68dc4c9e9741.gif)

Here's what the final output should look like:

![Hosted site](https://cdn.hashnode.com/res/hashnode/image/upload/v1743003666437/b418d602-42ca-4610-ae43-dc69bed0d954.gif)

When deploying your application to Vercel, you may encounter some errors, often caused by routing issues.

::: info To fix this

- Create a file under the root of your application called <FontIcon icon="iconfont icon-json"/>`vercel.json`.
- Inside the file, write the following code:

```json title="vercel.json"
{ "rewrites": [{ "source": "/(.*)", "destination": "/" }] }
```

![Inside your editor](https://cdn.hashnode.com/res/hashnode/image/upload/v1743003723518/6c44d496-331e-4d09-b221-f3c3dc6c688c.png)

:::

### Pros of Deploying With Vercel

- **Collaboration:** Vercel offers tools for effective teamwork, access control, and cooperative deployments.
- **Simple Deployment:** it simplifies delivering your web apps with ease.
- **Preview Deployments:** it allows you to share and review changes before they go live. This promotes collaboration and ensures a smooth and efficient workflow.
- **Scalability and Performance:** It still guarantees great performance even with a large number of people using it.
- **Git Integration:** it makes Git integration easy.

### Cons of Deploying With Vercel

- If you are new to Vercel, you must understand how to deploy and configure your application. Reading [<FontIcon icon="iconfont icon-vercel"/>Vercel’s documentation](https://vercel.com/docs) can help you get up to speed.
- Vercel is great for small to medium-sized projects, but it may not be the best fit for large-scale applications with complex backend needs. In such cases, developers may need a hosting solution that offers more customization and scalability.

---

## How to Deploy a Website or App with GitHub Pages

GitHub Pages is a straightforward and cost-free hosting service. You can use it to host static web pages or documentation.

You can publish your site using GitHub Pages by submitting your code to a GitHub account and setting up a repository. Let's go through the process now.

### Steps to Deploy Your Site Using GitHub Pages

To use GitHub Pages to host your website, follow these simple steps:

First, go to GitHub's [<FontIcon icon="iconfont icon-github"/>website](https://github.com/).

![Github website](https://cdn.hashnode.com/res/hashnode/image/upload/v1743003758359/0d8d7328-a8ad-4b79-a814-3a55b3a04bb1.png)

Then create a GitHub repository. If you don’t have a GitHub account, you'll need to click on “sign up”, or just click “sign in” if you already have an account.

![Github sign in button and sign up buttons](https://cdn.hashnode.com/res/hashnode/image/upload/v1743003801213/5362aa34-2ec8-430f-8809-01b42f574495.png)

Create a new repository by clicking the New button in the upper-right corner of your GitHub profile.

![Creating a new repository](https://cdn.hashnode.com/res/hashnode/image/upload/v1743003843884/8c918dbf-64bf-40c8-8f32-25fa6fef157d.png)

Give your repository a name that reflects your website.

![Repository name](https://cdn.hashnode.com/res/hashnode/image/upload/v1743003887101/51f0ab61-14b5-420c-95fb-27926b4dc566.gif)

Once you have finished the previous step, go back to your Editor. Copy the generated code and paste it into your editor.

![Code generated from new repository](https://cdn.hashnode.com/res/hashnode/image/upload/v1743003942149/3c063b52-2bc2-4897-84af-e30ca8da18cd.png)

The code in the image above is generated when creating a new repository.

Go to the settings page of the newly created repository.

![Clicking on settings](https://cdn.hashnode.com/res/hashnode/image/upload/v1743003981000/6a55ae7c-2b69-44bd-bbe2-deaa695b63a5.png)

Click on the settings option to redirect to the settings section. Locate and click on “Pages” in the left-hand side menu.

![GitHub pages section on the settings page](https://cdn.hashnode.com/res/hashnode/image/upload/v1743004028760/9130f72b-0e6a-4a18-a72a-da948eb67fec.gif)

To access GitHub Pages, click on the “Pages” section. Once you’re on the GitHub Pages section, click in the drop-down menu and choose either the “master” or “main” branch. Remember to save your selection.

![Enabling GitHub Pages to host your site](https://cdn.hashnode.com/res/hashnode/image/upload/v1743004108894/40fa0220-afba-4932-8900-1106046cf9e0.gif)

Refresh the page to find the link leading to your published website.

![Seeing your hosted site](https://cdn.hashnode.com/res/hashnode/image/upload/v1743004156941/3364fd42-d47e-40ea-b147-0fc0fa4f25c6.gif)

### Pros of Deploying With GitHub Pages

- GitHub Pages are simple to set up - and you can build your website there.
- It's free.
- GitHub’s version control system makes it simple to keep track of changes and work with others.
- GitHub Pages updates your website’s code whenever you make changes to it.
- It offers collaboration on projects with other developers.
- It ensures your website is safe through `HTTPS` (Hyper Text Transfer Protocol) encryption.

### Cons of Deploying With GitHub Pages

While GitHub Pages offer many advantages, there are a few considerations to keep in mind:

- If your website becomes too large due to file size, this can cause some performance issues.
- GitHub Pages may only support simple functions.
- Understanding Git, the version control system used by GitHub, is essential for managing your website’s code.

---

## How to Deploy a Website or App with Netlify

Netlify integrates with Git repositories and works well with static web pages and single-page apps.

### Steps to Deploy Your Site Using Netlify

First, you'll need to make sure that you have deployed your work or code from your editor to your GitHub account.

Then, open a new browser tab and navigate to the [<FontIcon icon="iconfont icon-netlify"/>Netlify website](https://netlify.com/).

![Netlify website](https://cdn.hashnode.com/res/hashnode/image/upload/v1743004199311/04a14b1c-d034-4274-8657-1a9eeaaf1839.png)

Head to the Netlify website and click the “Sign up” button on the homepage.

- Create an account by signing up with your GitHub, GitLab, or Bitbucket credentials.
- Select the GitHub option and follow the steps to grant Netlify access to your GitHub account.
- If you already have a Netlify account, click the “Login” button and enter your login information. After signing up or logging in, Netlify will request access to specific information from your GitHub account. Review the required permissions and permit Netlify to proceed.

Once you have finished registering, go to the dashboard where you will host your repository.

Netlify has two ways to host your project:

1. Drag-n-drop
2. Importing the source code from your repository to the site.
    

#### Using the Drag-n-Drop feature:

Once you have logged in, navigate to the left-hand side of the dashboard and select the “site” option.

![Netlify dashboard](https://cdn.hashnode.com/res/hashnode/image/upload/v1743004230273/ef1debf2-c475-4cd1-8930-4b5c0fd2c412.png)

Before deploying your project, it’s important to include an “index.html” file. Netlify recognizes this file as the main folder for hosting your project.

![Root <FontIcon icon="fa-brands fa-html5"/>`index.html` file](https://cdn.hashnode.com/res/hashnode/image/upload/v1743004285308/0387adf5-f015-44e0-bb91-1fb718bfdc04.png)

Go back to the website click on “site” and scroll down, you will see the drag-n-drop zone where you can drag and drop your file or you upload the folder.

![Netlify drag and drop](https://cdn.hashnode.com/res/hashnode/image/upload/v1743004356707/d7285059-51a0-4802-af41-1d81b560754f.png)

By using this feature your project will be deployed.

#### Importing the source code from your repository to the site:

First, upload your code to GitHub.

Then access the Netlify dashboard.

To access the option (drop-down) menu, click on “Add New Site”. Select “Import existing project.”

![Import existing project](https://cdn.hashnode.com/res/hashnode/image/upload/v1743004398011/0de1ad8d-3f36-47e9-8faa-626b399fb27e.png)

When you click on “Import existing project,” the system will direct you to a new page. Then you can import your repository from your GitHub account or any other storage account where you stored your source code.

![Connect to Git provider](https://cdn.hashnode.com/res/hashnode/image/upload/v1743004440693/669cf508-588e-47f9-8542-24552c073009.png)

When you click on this button, it will navigate you to the next page where you can choose the desired repository from the available options.

![Choosing repository from Netlify](https://cdn.hashnode.com/res/hashnode/image/upload/v1743004493978/578f1241-8b07-432d-a40a-ed6549aecb53.png)

After selecting the repository, the next step is configuring and deploying your site.

![Deploying from Netlify](https://cdn.hashnode.com/res/hashnode/image/upload/v1743004531244/4f5d1691-6cd7-4c86-8be8-fa423a6e8772.gif)

Here's the result:

![Hosted App](https://cdn.hashnode.com/res/hashnode/image/upload/v1743004569842/d7f6c8cf-855e-4d12-847b-9ec22b6bc177.gif)

When deploying your application to Netlify, you may encounter errors, often caused by routing issues.

::: info To fix this

Create a file called <FontIcon icon="fas fa-file-lines"/>`_redirects`, and inside write the following code:

```plaintext title="_redirect"
/* /index.html 200
```

::: tip Example

![Encounter error during deployment which is caused by routing issue](https://cdn.hashnode.com/res/hashnode/image/upload/v1743004628305/2fa06275-812f-42ed-8bf0-b30765a0a821.png)

:::

### Pros of Deploying with Netlify

- **Form handling capabilities:** Netlify makes handling forms on your websites easy. It has a simple API that allows you to collect and process form submissions. It also integrates with popular form providers like Zapier, Mailchimp, and Slack.
- **It’s easy to configure custom domains for your websites**: it makes it simple to manage your website’s domain and security. It also ensures that your websites are secure with `HTTPS`.
- **Web Hosting:** Netlify helps you host your websites and applications. It offers static site hosting, allowing you to deploy `HTML`, `CSS`, and `JavaScript` files straight from a Git repository or by drag-and-drop.
- **Simple Deployment:** it makes deploying your website or web app straightforward. When you connect your repository, it will deploy any changes you make.
- **Continuous Deployment:** When you make updates to your source code, Netlify builds and publishes your website for you. This ensures that your website always reflects the latest changes you’ve made.

### Cons of Deploying With Netlify

- **Project size:** This hosting platform is an excellent choice for small to medium-sized projects. But you should explore other hosting and deployment options as your website or app grows.
- **Limited Backend Capabilities:** Netlify prioritizes front-end development and static websites. Although it does have some backend functions, it may not be the best option for projects that need complex server-side processing.

---

## Conclusion

In conclusion, deploying an application is crucial so that users can access it and others can see your work. User-friendly deployment methods offer significant benefits, including collaboration, efficiency, simplicity, and reliability.

Here's a quick review of what we've covered here:

- Render offers a simple interface, affordable pricing, and built-in features.
- Surge offers fast deployment speeds, making deploying static websites a breeze.
- Vercel is an expert in creating cutting-edge web apps with scalability and preview deployments.
- If you’re looking for an easy-to-use option, consider GitHub Pages. It provides several advantages, including simplicity, free hosting, version control, and `HTTPS` encryption. But, it has limited functionality and technological limitations for more sophisticated applications.
- Netlify is a user-friendly platform that's great for quickly deploying static websites and web apps. It's perfect for projects that want easy setup, automatic deployment, and modern development features

What you choose will depend on the particular needs and objectives of your application and the technical know-how of the developers working on it.

And if you want to improve your Git skills, you can read this Git Command article.

If you found this tutorial helpful, please share it with fellow developers who may also find it interesting. You can also stay updated on my latest projects by following me on [Twitter (<FontIcon icon="fa-brands fa-x-twitter"/>`ijaydimples)](https://twitter.com/ijaydimples) and [LinkedIn (<FontIcon icon="fa-brands fa-linkedin"/>`ijeoma-igboagu`)](https://linkedin.com/in/ijeoma-igboagu/).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Deploy Your Websites and Apps - User-Friendly Deployment Strategies",
  "desc": "Deploying your application is a key aspect of software development. Typically, having an app on your local system isn't enough - it needs to be accessible online. So choosing a suitable and user-friendly hosting and deployment plan is vital. The key ...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-deploy-websites-and-applications.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
