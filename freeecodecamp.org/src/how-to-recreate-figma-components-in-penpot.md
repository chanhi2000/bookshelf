---
lang: en-US
title: "How to Move Figma Components to Penpot"
description: "Article(s) > How to Move Figma Components to Penpot"
icon: fa-brands fa-figma
category:
  - Design
  - Figma
  - Penpot
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - design
  - figma
  - penpot
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Move Figma Components to Penpot"
    - property: og:description
      content: "How to Move Figma Components to Penpot"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-recreate-figma-components-in-penpot.html
prev: /tool/figma/articles/README.md
date: 2025-03-27
isOriginal: false
author:
  - name: Fatuma Abdullahi
    url : https://freecodecamp.org/news/author/HijabiCoder/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1743028701920/ef200f8f-888d-4658-a5b0-ffa483edbdcf.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Figma > Article(s)",
  "desc": "Article(s)",
  "link": "/tool/figma/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Penpot > Article(s)",
  "desc": "Article(s)",
  "link": "/tool/penpot/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Move Figma Components to Penpot"
  desc="Penpot is an open-source design tool for creating complete design systems. It is free, self-hostable, and allows multiple projects. Penpot supports reusable components and assets and allows files and libraries to be shared across projects. Penpot fil..."
  url="https://freecodecamp.org/news/how-to-recreate-figma-components-in-penpot"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1743028701920/ef200f8f-888d-4658-a5b0-ffa483edbdcf.png"/>

[<VPIcon icon="iconfont icon-penpot"/>Penpot](https://penpot.app/) is an open-source design tool for creating complete design systems. It is free, self-hostable, and allows multiple projects. Penpot supports reusable components and assets and allows files and libraries to be shared across projects. Penpot files can be exported in various formats to enhance collaboration.

Penpot designs directly translate to code that meets web standards, facilitating collaboration and hand-off between designers and developers.

This tutorial will walk you through recreating or moving existing [<VPIcon icon="fa-brands fa-figma"/>Figma](https://figma.com/) components to Penpot. It will include a rundown of the Penpot tool and how to use it, a brief comparison of the two tools, and important resources.

---

## How to Recreate Existing Figma Files in Penpot

There are two ways to move or recreate existing Codex components from Figma to Penpot: By using the community-supported migration tool or by manually recreating the components and files.

### Using the Community-Supported Migration Plugin

You can use [<VPIcon icon="fa-brands fa-figma"/>this plugin](https://figma.com/community/plugin/1219369440655168734/penpot-exporter) to move your Figma designs to Penpot. It is a straightforward way to migrate from Figma, especially if you have many components.

To do so, add it as a Figma plugin and find the option in the context menu. Then, click on the "Penpot Exporter" option to activate the plugin. The plugin will then create a zip file for your component and download it.

![A screenrecording illustrating how to add and use the "Penpot Exporter" plugin.](https://cdn.hashnode.com/res/hashnode/image/upload/v1742571496007/da97ad1b-6939-4bb9-9000-6c367a711797.gif)

Over in Penpot, in your Projects dashboard, click on the three dots context menu and select "Import Penpot files" to open a file picker window. Click on the zip file downloaded from Figma, and Penpot will create a new project with the same name as the zip file. This new project will contain your Figma component translated to the Penpot environment.

![An illustration of how to import files to Penpot](https://cdn.hashnode.com/res/hashnode/image/upload/v1742571779644/1ebeb54d-ce27-4987-b630-f101a60ee8d3.gif)

Looking at the new component, you'll notice that the migration plugin correctly picks up any child components and typography variables while keeping things fairly organized. But it does not pick up color variables.

### Manually Recreating Figma components

Another way to move Figma components to Penpot is to recreate them manually. While this option is more tedious than the previous one, it gives you fine-tuned control over how the component looks, how the files are organized, and how the assets are carried over.

It is an excellent excuse to spruce up the existing components, especially if there are few. It is also a good exercise for first-time users to grasp Penpot.

To effectively move components using this method, you will need to understand how Penpot works. The following concepts will help make this process more efficient.

---

## Understanding the Penpot User Interface

Penpot's UI is pretty similar to Figma's, except that Penpot defaults to Dark Mode. You have your controls on the right and your files, assets, and layers on the left, with a canvas in the middle.

![Alt: Screenshot of a Penpot UI with a left panel labeled "Layers" showing file structure, a central canvas labeled "Canvas," and a right panel with various design tools and settings.](https://cdn.hashnode.com/res/hashnode/image/upload/v1742811019699/ea5336e3-50a7-4771-bfa6-07a225390320.png)

Both have a toolbar that enables you to interact with the canvas. The toolbars have slightly different icons and names but have the same functionality. Notably, in Penpot, the Frame tool is called Board.

Penpot supports most of Figma's features, except for Design Tokens, which will be added soon.

---

## Understanding Penpot Layouts

Penpot supports Flex and Grid layouts. These layouts allow you to position items precisely and simplify creating fluid designs. For those familiar with CSS Grid and Flex, they work in the same way.

Flex layout allows you to organize the elements within a parent container, like a board or an encompassing shape, across one dimension, width, or height. It enables you to determine the spacing and positioning of the child elements via visual controls with labels on the right side panel.

![An illustration on how to use Penpot Flex Layout](https://cdn.hashnode.com/res/hashnode/image/upload/v1742571904634/c8bf8fc0-79a7-415f-916b-42da7c881ed8.gif)

Grid layouts allow the same controls as Flex layouts but with the added flexibility of simultaneously spanning a child element across both dimensions. This makes Grid layouts quite helpful in creating complex and nuanced designs.

---

## How to Create and Use Penpot Components

Creating a component in Penpot is relatively straightforward. You select the elements that will make up the component, then right-click and click "Create component," turning your selection into a component.

Your new component will be available under the "Assets" tab on the left side panel. To use, drag it onto the canvas.

You can also create copies of the component. By default, the copies are tied to the main component, and any changes to the main will be reflected in all copies. You can override this by detaching the copies from the context menu.

![A speedrun of how to create a Penpot Component](https://cdn.hashnode.com/res/hashnode/image/upload/v1742571991986/6dd4820b-0f3a-4d41-895d-cb9f5e7d4f52.gif)

---

## How to Create Reusable Assets in Penpot

Penpot has three asset types: Typography, Colors, and Components, with [<VPIcon icon="iconfont icon-penpot"/>Penpot design tokens](https://penpot.app/collaboration/design-tokens) coming very soon. Typography refers to information on font types and weights that make up text styles. Colors enable you to create and sort your repeated colors. Components refer to reusable design pieces and, in this context, include graphical items like icons and images.

To create a color or typography asset, click the "Assets" tab and the plus icon on the relevant accordion item. For color, it will open a color picker. Paste the hex value in the appropriate place, then save it. The color will show up in the accordion drop-down. You can click on it to give it a semantic name if desired.

![Screenshot of a Penpot UI showing a color palette with hex codes, a color picker, and local library assets.](https://cdn.hashnode.com/res/hashnode/image/upload/v1742809861347/9ae3b0fb-798b-4363-ab90-873c18a16793.png)

For typography, click on the plus icon at the relevant accordion. This will open a panel where you can specify the font, font weight, letter spacing, and line height. You can also change the asset's name after it's saved.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1742810318737/daf0e24f-7c4a-4c00-bb73-ccca7575bcf5.png)

---

## How to Add and Use Icons in Penpot

You can add icon packs and libraries in Penpot from the Project dashboard. At the bottom of the page, a banner containing a list of commonly used libraries is displayed. These libraries usually include a few icon packs. You can scroll through to choose one or click on the explore more option at the end of the slider to open up the dedicated Penpot templates page.

![Screenshot of Penpot UI's lower bottom showing "Penpot - Design System v2.0", "New Project 1", "Avataaars", "UX Notes", "Whiteboarding Kit", "Open Color Scheme", and "Flex Layout Playground". A sidebar labeled "Libraries & Templates" is visible on the right.](https://cdn.hashnode.com/res/hashnode/image/upload/v1742810534992/83b2eb72-4877-49b3-9d2e-02c37e0cb894.png)

If you find a relevant library from the bottom banner, click the download icon. Penpot will prompt you to add the selected library. Once you accept it, it will be added to the "Libraries" menu item on the left side panel.

If you click through to the dedicated templates page, clicking the download icon will download a Penpot file. You can then drag it to the projects page, and it will also be available in the "Libraries" section of the projects page.

To use the libraries within your project file, click the "Assets" tab on the left side panel, then click the "Libraries" button below it. This will open a modal with all your libraries listed under "Shared Libraries."

Click on the plus icon on the ones you want to use in your project. This will link that library to your project and be available in the left side panel. You can then search for any particular icon from the search bar and drag it onto the canvas.

![A gif illustrating how to link and delink libraries in the Penpot User Interface](https://cdn.hashnode.com/res/hashnode/image/upload/v1742571300138/3dbbc937-f727-4c03-987b-43ddb71b1608.gif)

To remove a library from your project, click on the libraries button. In the modal, under "libraries in this file," all used libraries are listed. Click on the link icon next to the library you want to remove. This will delink it and remove it from the side panel.

---

## Figma Vs. Penpot - My experience

As a first-time user of Penpot and a long-term casual user of Figma, I noticed some differences and encountered some teething problems.

### Swapping Out Icons

You can [<VPIcon icon="iconfont icon-penpot"/>swap out components](https://help.penpot.app/user-guide/components/#component-swap) in Penpot! It's too bad that I discovered this after I had finished my first component migration.

### Renaming Files and Folders

I struggled to find how to rename files and folders in Penpot. I kept looking for the shortcut or a menu item in the context menu. It turns out you have to double-click on the title to change it. You can rename files in the same way in Figma, but I just never did it like that.

### Adherence to Web Standards

I was pleasantly surprised at the code quality that Penpot provides, along with your designs. It meets the [<VPIcon icon="iconfont icon-w3c"/>w3c standards](https://w3.org/standards/), but the HTML could be more [<VPIcon icon="iconfont icon-webdev"/>semantic](https://web.dev/learn/html/semantic-html).

### Penpot Design System

Penpot avails its [<VPIcon icon="iconfont icon-penpot"/>design system](https://community.penpot.app/t/pencil-the-penpot-design-system/7152) along with lots of little libraries that help you understand how the tool works. This is very nice as it allows you to get a good understanding of design language and how to organize design systems.

### Limited Shape Options in the Toolbar

The Penpot toolbar lacks essential shapes such as pen, arrow, and triangle. While you can recreate this with the path tool or use a library to import them, it is definitely something I missed that was readily available in Figma.

It took me a few tries to get comfortable with Penpot and in the end, I really liked it. Plus, its open-source nature makes it even more endearing.

::: info Resources and Notes

Using Penpot has a learning curve, even if you are familiar with other design tools like Figma. These resources can help you get up to speed faster and make you more efficient with Penpot.

- [<VPIcon icon="fa-brands fa-youtube"/>Penpot video on layouts](https://youtube.com/live/64O8qi51Jqc?si=A6AVp1m8se3gl1ut)
- [<VPIcon icon="fa-brands fa-youtube"/>Penpot live on design tokens](https://youtube.com/live/aW0LNHLEI_Y?si=HATAWee8tH29Sgrq&t=1604)
- [<VPIcon icon="iconfont icon-penpot"/>Penpot documentation](https://help.penpot.app/user-guide/)
- [<VPIcon icon="fa-brands fa-figma"/>Penpot migration plugin](https://figma.com/community/plugin/1219369440655168734/penpot-exporter)
- [<VPIcon icon="iconfont icon-penpot"/>Penpot templates and libraries](https://penpot.app/libraries-templates)
- [<VPIcon icon="iconfont icon-penpot"/>Penpot design systems](https://penpot.app/blog/penpot-for-design-systems-101/)

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Move Figma Components to Penpot",
  "desc": "Penpot is an open-source design tool for creating complete design systems. It is free, self-hostable, and allows multiple projects. Penpot supports reusable components and assets and allows files and libraries to be shared across projects. Penpot fil...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-recreate-figma-components-in-penpot.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
