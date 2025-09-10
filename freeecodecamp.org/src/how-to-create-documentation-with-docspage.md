---
lang: en-US
title: "How to Create Documentation with docs.page - A Beginner's Tutorial"
description: "Article(s) > How to Create Documentation with docs.page - A Beginner's Tutorial"
icon: fa-brands fa-node
category:
  - Node.js
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Create Documentation with docs.page - A Beginner's Tutorial"
    - property: og:description
      content: "How to Create Documentation with docs.page - A Beginner's Tutorial"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-create-documentation-with-docspage.html
prev: /programming/js-node/articles/README.md
date: 2025-05-07
isOriginal: false
author:
  - name: Rajdeep Singh
    url : https://freecodecamp.org/news/author/officialrajdeepsingh/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1746471569068/23f70d3e-a76e-4287-a6a9-579c23a4fcb2.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Node.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-node/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Create Documentation with docs.page - A Beginner's Tutorial"
  desc="One of the most tedious tasks for every startup, company, and open-source project is often building and managing documentation - especially for medium to large-scale documentation websites. docs.page is an open-source documentation tool that helps yo..."
  url="https://freecodecamp.org/news/how-to-create-documentation-with-docspage"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1746471569068/23f70d3e-a76e-4287-a6a9-579c23a4fcb2.png"/>

One of the most tedious tasks for every startup, company, and open-source project is often building and managing documentation - especially for medium to large-scale documentation websites.

[<VPIcon icon="fas fa-globe"/>docs.page](http://docs.page) is an open-source documentation tool that helps you create instant, fast, beautiful, and responsive documentation websites with minimal configuration. It is an open-source project developed by Invertase, a company known for creating developer tools and SDKs.

docs.page is designed to streamline the process of publishing documentation by sourcing content directly from public GitHub repositories.

::: info Key Features:

- Zero configuration: you create a 'docs.json' file and a 'docs' directory. Inside the docs directory, you can create files using the .mdx extension, and docs.page will generate your documentation site.
- Customizable: docs.page allows you to add your logo, social links, theme, analytics, navigation, and more through a simple configuration file.
- Live previews: enables viewing of documentation for any branch, pull request, or specific commit, facilitating real-time collaboration and review.
- Hot reload: the Hot Reload feature provides real-time previews of documentation changes while editing Markdown (.mdx) files. This feature enhances the local development workflow, enabling instant updates without manual refreshes or rebuilds.
- GitHub bot integration: provides a GitHub bot that automatically generates URLs for pull request documentation previews.
- MDX support: you can write documentation in Markdown to utilize MDX, which enables you to use React components, such as tabs, Cards, Tweets, and Steps, directly within your Markdown file.
- Search functionality: integrates with DocSearch to offer full-text search capabilities within your documentation.
- Responsive resign: ensures that your documentation is accessible and visually appealing across a range of devices and screen sizes.
- Dark/light mode: offers theme customization to switch between dark and light modes.
- Code block highlighting: provides syntax highlighting and content copying features for code blocks.

Check out the code [available in my GitHub repository (<VPIcon icon="iconfont icon-github"/>`officialrajdeepsingh/docs-page-demo`)](https://github.com/officialrajdeepsingh/docs-page-demo).

:::

---

## How Does docs.page Work?

You can easily start creating your documentation page using the [<VPIcon icon="fas fa-globe"/>docs.page CLI](https://use.docs.page/cli). It helps you set up a local documentation project by running the following command:

```sh
pnpm dlx @docs.page/cli init docs.page
# 
# ? Are you sure you want to setup and install docs.page in /home/officialrajdeepsingh/medium/docs.page? yes
# Files created:
#  - docs.json: Configuration file for your documentation site
#  - docs/index.mdx: The home page of your documentation site
#  - docs/next-steps.mdx: A page to help you get started with docs.page
#
# Initialization complete. To preview your documentation site, vist https://docs.page/preview in your browser.
```

After creating your project with the docs.page CLI, your project structure should appear as follows:

```plaintext title="file structure"
.
├── docs
│   ├── index.mdx
│   └── next-steps.mdx
└── docs.json

2 directories, 3 files
```

The <VPIcon icon="fas fa-folder-open"/>`docs` folder contains the Markdown file for your documentation, and the <VPIcon icon="iconfont icon-json"/> <VPIcon icon="iconfont icon-json"/>`docs.json` file includes the configuration for your website, such as the header, sidebar, logo, theme, and other settings.

---

## How to Enable Live Preview in docs.page

You can set up live preview of your local documentation in real-time in the browser - but it's a little different: you don't need to run any development commands on your laptop or machine.

To open the live preview of your local documentation, first visit [<VPIcon icon="fas fa-globe"/>https://docs.page](https://docs.page) and click the **Local Preview** button.

![Live preview your local documentation in real-time directly in the browser.](https://cdn.hashnode.com/res/hashnode/image/upload/v1745671253187/c2e6ce0b-aedb-4e7e-b680-68e590fc4018.png)

Next, select the documentation project on your laptop or machine and click the "**Select Directory**" button.

![ click on the "Select Directory" button and select directory](https://cdn.hashnode.com/res/hashnode/image/upload/v1745664832273/fc03e2d5-02c0-4bce-b40c-a2599ef72195.png)

After clicking the "Select Directory" button, a new window will open depending on your operating system. Its UI may appear different. Then you need to select the project.

![Select the Directory](https://cdn.hashnode.com/res/hashnode/image/upload/v1745664861969/39a31043-22e8-4d6b-a883-19be0a59ca4d.png)

After selecting the folder, you will see the following alert message in the browser (“Let site view files?”). To view the live preview of your documentation website, click the "View files" button.

![Click on View files button](https://cdn.hashnode.com/res/hashnode/image/upload/v1745664971450/8ec6f635-a2e4-401e-8fa8-cf49c4e06b9a.png)

Now you can see a local live preview of the documentation website in the browser, and any changes you make locally will instantly reflect in the browser. By default, your documentation website should appear as follows:

![Live preview your documentation website in the browser](https://cdn.hashnode.com/res/hashnode/image/upload/v1745674174727/dd4f1820-ce04-4244-b395-b055bb8d236a.png)

Next, you’ll learn about configuring the Logo, Theme, Header, Social Links, Sidebar, SEO, search, and more on your docs. You’ll also learn how to use the pre-built components, Front Matter, and assets on docs.page, and finally, how to deploy your documentation website.

---

## How to Configure docs.page

![Configure docs.page in the <VPIcon icon="iconfont icon-json"/>`docs.json` file.](https://cdn.hashnode.com/res/hashnode/image/upload/v1745834873075/6c9dd17b-20e2-40dc-87a1-39cc27cf9a20.png)

The <VPIcon icon="iconfont icon-json"/>`docs.json` file is the primary file for configuring your documentation. Below is a [<VPIcon icon="fas fa-globe"/>list of all available configuration options](https://use.docs.page/configuration), which you can use to modify the logos, theme, analytics, and more on your docs.

### Properties

- Basic properties
- Logo
- Theme
- Header
- Anchors
- Social Links
- SEO
- Variables
- Search
- Scripts
- Content
- Tabs
- Sidebar

There’s so much you can configure using docs.page - but in this tutorial, we’ll focus on some of the most important options:

### Basic Properties

![Basic properties such as name, description and favicon](https://cdn.hashnode.com/res/hashnode/image/upload/v1745915741849/802ba7e3-ae6b-4628-856f-0d78aa4e1bfc.png)

docs.page includes basic common properties, such as name, description, and favicon, which is very important for SEO.

- name (string): The name of your project. It appears in the header and is used for things like SEO metadata.
- description (string): A summary of your project. This is used in meta tags and social preview images.
- favicon (string | Favicon object): Specifies the favicon shown in the browser tab. You can provide either a single string URL or use a Favicon object to define different icons for light and dark modes:
  - light (string): URL for the favicon in light mode.
  - dark (string): URL for the favicon in dark mode.

```json title="docs.json'
{
  "name": "Docs.page",
  "description": "Ship documentation, like you ship code",
  "favicon": "https://static.invertase.io/assets/docs.page/docs-page-logo.png",
   # or
  "favicon": {
    "light": "https://cdn-icons-png.flaticon.com/24/9664/9664027.png",
    "dark": "https://cdn-icons-png.flaticon.com/24/9643/9643115.png"
  }
}
```

### Logo

![Configure the logo for your documentation](https://cdn.hashnode.com/res/hashnode/image/upload/v1745750725706/1f3f2775-91d8-4365-88b4-1a43160d12c3.png)

Now it’s time to configure the logo for your documentation, which will appear in the header and be used for social preview images.

The minimum height of the logo must be 24px. You can provide URLS for both a light and a dark logo. If you only provide a light or dark logo, and it doesn't work, you may experience issues where your logo doesn't appear on the website when toggling the theme.

You can add the logo to the documentation in two ways:

- First way:

```json title="docs.json"
{
  "name": "My Docs",
  "logo": "https://cdn-icons-png.flaticon.com/24/2702/2702154.png",
}
```

- Second way:

```json title="docs.json"
{
  "name": "My Docs",
  "logo": {
    "light": "https://cdn-icons-png.flaticon.com/24/2702/2702154.png",
    "dark": "https://cdn-icons-png.flaticon.com/24/2702/2702172.png"
  }
}
```

### Theme

Configuring the theme in your documentation is easy. If you don’t provide a theme, the default theme will be used in your documentation.

docs.page includes a theme property in docs.json, which holds a Theme object as its value with the properties `defaultTheme`, `primary`, `primaryLight`, `backgroundLight`, and `backgroundDark`.

- `defaultTheme`: You can select a theme, dark or light.
- `primary`: The primary colour is used for links, buttons, and other interactive elements.
- `primaryLight`: The `primaryLight` colour option is used in light mode. If your primary light option is not specified in the <VPIcon icon="iconfont icon-json"/>`docs.json` file, then the primary colour will be used.
- `primaryDark`: The `primaryDark` colour option is used in dark mode. If your `primaryDark` option is not specified in the <VPIcon icon="iconfont icon-json"/>`docs.json` file, then the primary color will be used.
- `backgroundLight`: The `backgroundLight` option is used to specify the background color of your documentation in light mode.
- `backgroundDark`: The `backgroundDark` option is used to specify the background color of your documentation in dark mode.

```json title="docs.json"
{
  "theme": {
    "defaultTheme": "dark",
    "primary": "#de40eb",
    "primaryLight": "#BFA213",
    "backgroundLight": "#e0cfff",
    "backgroundDark": "#00101f"
  },
}
```

### Header

![configuration of the header in your documentation](https://cdn.hashnode.com/res/hashnode/image/upload/v1745912602721/2430492a-8d58-4f4b-bc4c-e22f8cb7b52f.png)

Configuring the header in your documentation includes the following properties: `showName`, `showThemeToggle`, `showGitHubCard`, and links.

- `showName`: The `showName` option displays the documentation name next to the logo in the header and defaults it is true.
- `showThemeToggle`: The `showThemeToggle` option displays the theme toggle button in the header (and defaults to true).
- `showGitHubCard`: The `showGitHubCard` option displays the GitHub card in the header and defaults to true.
- Links: The links option contains an array of Link objects to display a navigation in the header of your documentation.

```json title="docs.json"
{
  "header": {
    "showName": false,
    "showGitHubCard": false,
    "links": [
      {
        "title": "GitHub",
        "href": "https://github.com/officialrajdeepsingh/docs-page-demo"
      },
      {
        "title": "X",
        "href": "https://x.com/Official_R_deep"
      },
      {
        "title": "Linkedin",
        "href": "https://www.linkedin.com/in/officalrajdeepsingh"
      }
    ]
  }
}
```

### Social Links

![configuration of the social links in your documentation](https://cdn.hashnode.com/res/hashnode/image/upload/v1745910990442/f48a4b34-d20f-4155-b19a-d8af8a202801.png)

The social option contains an object of key-value pairs where the key represents the social platform and the value corresponds to the username or ID. Here’s how you can add them:

```json title="docs.json"
{
  "social": {
    "github": "officialrajdeepsingh/docs-page-demo",
    "x": "@Official_R_deep",
    "linkedin": "officalrajdeepsingh"
  }
}
```

### SEO

The SEO option configures the SEO settings for your documentation. The noindex option tells search engines not to index your documentation, and it defaults to false.

```json title="docs.json"
{
  "noindex": true
}
```

### Search

![configuration of the search in your documentation](https://cdn.hashnode.com/res/hashnode/image/upload/v1745909928336/a85c4f21-712d-4096-be08-15d605668a68.png)

To enable search functionality on your documentation site, you can integrate Algolia DocSearch by configuring the docsearch object in your <VPIcon icon="iconfont icon-json"/>`docs.json` file like this:

```json title="docs.json"
{
 "search": {
    "docsearch": {
      "appId": "YOUR_APP_ID",
      "apiKey": "YOUR_API_KEY",
      "indexName": "YOUR_INDEX_NAME"
    }
  }
}
```

### Tabs

![configuration of the tab in your documentation](https://cdn.hashnode.com/res/hashnode/image/upload/v1745909877477/9248bfa7-ed16-4d2a-9d2a-6624d4690123.png)

Tabs are an array of objects displayed at the top of your documentation website.

#### Properties

Each Tab object includes the following properties:

- id (string, required): A unique identifier for the tab.
- title (string, required): The text label displayed on the tab.
- href (string, required): The URL to navigate to when the tab is clicked.
- locale (string, optional): If set, this tab is displayed only when viewing documentation for the specified locale.

Here’s an example of a couple tabs:

```json
{
  "tabs": [
    {
      "id": "root",
      "title": "Documentation",
      "href": "/"
    },
    {
      "id": "components",
      "title": "Components",
      "href": "/components"
    }
  ],
}
```

### Sidebar

To display the sidebar on your website, you can configure or define it in the <VPIcon icon="iconfont icon-json"/>`docs.json` file your documentation, which will appear in the sidebar of your site.

![configuration of the sidebar in your documentation](https://cdn.hashnode.com/res/hashnode/image/upload/v1745911338226/f3404a5d-b715-4e26-97c9-ce8169fe8d6b.png)

Essentially, a sidebar is a list of links that appears on the side of your documentation. You can organize links using groups and pages by providing an array of sidebar objects.

#### Options:

- pages: The pages option takes a list of page links to display in the sidebar. It accepts the following options:
  - title (required): The title of the sidebar item.
  - href (required): The URL to link to when the sidebar item is clicked.
  - icon (optional): The icon to display next to the sidebar item.
- group (string): The title of the group under which the sidebar item will be displayed. If not provided, the item will appear at the top level of the sidebar.
- href (string): The URL the sidebar item will link to when clicked.
- icon (string): The name of the icon to display next to the sidebar item.
- tab (string): If set, the sidebar item will only be shown when a specific tab (matching the provided tab ID) is active.

```json :collapsed-lines title="docs.json"
{
  "sidebar": [
    {
      "pages": [
        {
          "title": "Overview",
          "href": "/",
          "icon": "book"
        },
        {
          "title": "Configuration",
          "href": "/configuration",
          "icon": "gear"
        }
      ]
    },
    {
      "group": "Components",
      "icon": "grip",
      "pages": [
        {
          "title": "Getting Started",
          "href": "/components",
          "icon": "rocket"
        },
        {
          "title": "Accordion",
          "href": "/components/accordion",
          "icon": "square-caret-down"
        },
        {
          "title": "Callouts",
          "href": "/components/callouts",
          "icon": "bullhorn"
        },
        {
          "title": "Cards",
          "href": "/components/cards",
          "icon": "square-full"
        }
      ]
    }
  ]
}
```

If you want to learn more about this, check out the [<VPIcon icon="fas fa-globe"/>documentation here](https://use.docs.page/configuration#sidebar).

---

## How to Use Pre-built Components in docs.page

docs.page comes with [<VPIcon icon="fas fa-globe"/>15 pre-built components](https://use.docs.page/components), so you don't need to import components into your MDX file. You can use them directly in your MDX file.

In the following example, I’m using the Info Callout component directly within the MDX file, without importing it.

```mdx title="index.mdx"
---
title: Welcome to docs.page!
description: Get started with docs.page
---

Welcome to docs.page! The init command you just ran has created a basic file struture in your project to help you get started.

---

## Walkthrough

### Configuration

In the root of your directory a new `docs.json` file has been created. This file is used to configure your documentation site. You can customize the name, description, and sidebar, theme, logos and more using this file.

<Info>Here's a basic example of what the file looks like: </Info>
```

---

## How to Diagnose Errors in docs.page

If you encounter any errors on your documentation website, you can view all the errors by clicking the diagnostics button.

![diagnosing the error in docs.page](https://cdn.hashnode.com/res/hashnode/image/upload/v1745863994785/16ec2f9a-86e6-4808-abdb-73513a54d428.png)

---

## How to Use Frontmatter

Front matter is a block of YAML placed at the beginning of a Markdown file, enclosed between triple-dash `(---)` lines.

Frontmatter is a way to customise the metadata page directly within your Markdown files, and most importantly, frontmatter is used for SEO.

````mdx title="docs/getting-started.mdx"
---
title: Welcome to Awesome Project
description: Some awesome docs!
---

# Welcome!
````

Below is a list of some of the [<VPIcon icon="fas fa-globe"/>important frontmatter properties](https://use.docs.page/frontmatter) in docs.page, including their type and default values:

- `title` (string): The page’s title used in metadata, social cards, and displayed as the main heading.
- `description` (string): A summary of the page appears in metadata for SEO and link previews.
- `image` (string): URL of an asset used in social cards and (if enabled) shown at the top of the page.
- `redirect` (string): A URL to forward visitors to. When set, the page’s content is bypassed.
- `showPageTitle` (boolean): Toggle whether the page title appears as a heading at the top.
- `showPageImage` (boolean): Toggle whether the front-matter image is rendered at the top.
- `noindex` (boolean): If true, instructs search engines not to index the page.

[<VPIcon icon="fas fa-globe"/>Refer to the documentation](https://use.docs.page/frontmatter) for more detail and other frontmatter property information.

---

## How to Add Assets to Your Docs

You can include assets, such as images and videos, in your documentation. You can add both remote and local assets.

### Remote Assets

To add remote assets to your documentation, you can reference them directly in your markdown files.

For example, to include an image from a URL:

````mdx title="getting-started.mdx"
---
title: Welcome to get started
description: Some awesome docs!
---

# Welcome!

![Natural](https://cdn.pixabay.com/photo/2023/04/19/19/11/lake-7938396_960_720.jpg)
````

### Local Assets

To use local assets in your documentation, create an <VPIcon icon="fas fa-folder-open"/>`assets` folder inside the <VPIcon icon="fas fa-folder-open"/>`docs/` directory. Then, add images and videos to the assets folder and reference them in your Markdown files.

Check out the following to better understand:

```plaintext title="file structure
docs/
  assets/
    natural.png
  index.mdx
```

Within your markdown file, you can reference the image using a relative path:

```mdx
![Description](/assets/natural.png)
```

### Different between Local vs Remote Assets

Local assets (PNG, JPG, PDF, and so on) are files stored within your project's public folder, while remote assets are files hosted on an external server. You can access your local assets using your domain URL.

```mdx
![Natural](./assets/logo.png)
```

On the other hand, remote assets are stored on a different server (image hosting), as I mentioned. You can access remote assets with a full URL.

The best examples of remote assets include images from Unsplash, Pixabay, and Pexels that can be used directly in your MDX file.

```mdx
![Natural](https://images.unsplash.com/photo-1728044849236-5e8a061e1895)
```

You can use remote and local assets based on your requirements - both have advantages and disadvantages. With remote assets, you can add an image directly in your mdx file. When using local assets, you add an image to the public folder and then reference it in your mdx file.

---

## How to Publish Your Documentation Website

With docs.page, you can easily publish your documentation website. No configuration is required - once your documentation website is ready, you can just push your local code to a GitHub repository.

You can now access your documentation website immediately via the docs.page domain.

For example, if your GitHub repository is officialrajdeepsingh/docs-page-demo, your documentation will be available at [<VPIcon icon="fas fa-globe"/>https://docs.page/officialrajdeepsingh/docs-page-demo](https://docs.page/officialrajdeepsingh/docs-page-demo).

![publish your documentation website](https://cdn.hashnode.com/res/hashnode/image/upload/v1745849817613/c1b7b095-121d-4b64-bd7b-a834ca87f8b5.png)

---

## How to Live Preview Upcoming Changes to Your Docs Website

You can view previews of upcoming changes to your documentation before going public. As your documentation website grows, use the [<VPIcon icon="iconfont icon-github"/>docs.page Github app](https://github.com/apps/docs-page) - any pull request you create in your Github repository automatically generates a unique live preview URL.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1746278906018/0a299083-ff0a-4aea-a94e-95f94741e9af.png)

To configure the docs page of the GitHub application in your repository, follow these steps:

1. Go to [<VPIcon icon="fas fa-github"/>https://github.com/apps/docs-page](https://github.com/apps/docs-page)
2. Click on the install button.
3. Select the GitHub account
4. Select All and single repository.
5. Click on the install button
6. Next, enter the password and OTP.
7. Now if your application is successful, install it in your repository.

![Creates live previews in your github repository](https://cdn.hashnode.com/res/hashnode/image/upload/v1746280111575/06d449cd-917a-4908-8d5e-db90cffd3c0f.gif)

Whenever you or another developer create a pull request in your repository, the docs page application creates live previews for you.

---

## Conclusion

docs.page is a free, open-source project that allows you to create instant, fast, and beautiful documentation without requiring any configuration.

I think docs.page offers the best solution for documentation. You can easily set up and deploy your documentation website with the help of docs.page cloud service.

For now, it’s completely free to deploy a documentation website with a [<VPIcon icon="fas fa-globe"/>docs.page](http://docs.page), and I hope it stays that way.

If [<VPIcon icon="fas fa-globe"/>docs.page](http://docs.page) ever decides to charge for their services, that could be troublesome. Hopefully, in that case, they’ll provide a clear guide on how to deploy your website on another cloud platform.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Create Documentation with docs.page - A Beginner's Tutorial",
  "desc": "One of the most tedious tasks for every startup, company, and open-source project is often building and managing documentation - especially for medium to large-scale documentation websites. docs.page is an open-source documentation tool that helps yo...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-create-documentation-with-docspage.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
