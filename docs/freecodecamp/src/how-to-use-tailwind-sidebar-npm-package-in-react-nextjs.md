---
lang: en-US
title: "How to Use the tailwind-sidebar NPM Package in Your React and Next.js Apps"
description: "Article(s) > How to Use the tailwind-sidebar NPM Package in Your React and Next.js Apps"
icon: iconfont icon-tailwindcss
category:
  - Node.js
  - CSS
  - Tailwind CSS
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - css
  - tailwindcss
  - tailwind-css
  - react
  - reactjs
  - react-js
  - next
  - nextjs
  - next-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Use the tailwind-sidebar NPM Package in Your React and Next.js Apps"
    - property: og:description
      content: "How to Use the tailwind-sidebar NPM Package in Your React and Next.js Apps"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-tailwind-sidebar-npm-package-in-react-nextjs.html
prev: /programming/css-tailwind/articles/README.md
date: 2026-01-15
isOriginal: false
author:
  - name: Hitesh Chauhan
    url : https://freecodecamp.org/news/author/hiteshchauhan2023/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1768413200090/f31cbba6-9b9e-4719-bc07-13fe98049d52.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Tailwind CSS > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/css-tailwind/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "React.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-react/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Next.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-next/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Use the tailwind-sidebar NPM Package in Your React and Next.js Apps"
  desc="These days, developers are increasingly preferring utility-first CSS frameworks like Tailwind CSS to help them build fast, scalable, and highly customizable user interfaces. In this article, you’ll learn what the tailwind-sidebar NPM package is, how ..."
  url="https://freecodecamp.org/news/how-to-use-tailwind-sidebar-npm-package-in-react-nextjs"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1768413200090/f31cbba6-9b9e-4719-bc07-13fe98049d52.png"/>

These days, developers are increasingly preferring utility-first CSS frameworks like Tailwind CSS to help them build fast, scalable, and highly customizable user interfaces.

In this article, you’ll learn what the `tailwind-sidebar` NPM package is, how it works internally, and how to install and configure it in a real project. We’ll walk through setting up a responsive sidebar using Tailwind CSS, explore its key features with practical examples, and see how you can customize and control the sidebar behavior to fit different layouts and screen sizes.

If you’re building a React or Next.js application and want a lightweight yet powerful sidebar solution, [<VPIcon icon="fa-brands fa-npm"/>`tailwind-sidebar`](https://npmjs.com/package/tailwind-sidebar) is an excellent choice.

::: note Prerequisites

- Basic knowledge of JavaScript (ES6+)
- Familiarity with React fundamentals (components, props, JSX)
- Basic understanding of Next.js project structure and routing
- Experience using npm or yarn for package installation
- Working knowledge of Tailwind CSS

:::

---

## Introduction to the tailwind-sidebar NPM Package

The tailwind-sidebar NPM package is a modern, developer-friendly sidebar component that’s built entirely with Tailwind CSS. It’s designed to help developers create responsive, customizable, and accessible sidebars without the overhead of heavy UI frameworks.

### Understanding Tailwind Sidebar

`tailwind-sidebar` is a lightweight utility package designed to simplify building responsive sidebars using Tailwind CSS. Instead of manually handling sidebar state, transitions, and responsive behavior, the package provides a small JavaScript layer that works alongside Tailwind’s utility classes.

At its core, the package toggles Tailwind classes to control whether the sidebar is open or closed. This makes it framework-agnostic - it works with plain HTML, as well as frameworks like React, Vue, or Next.js, as long as Tailwind CSS is available.

Because it relies on Tailwind utilities rather than custom CSS, the sidebar stays easy to customize, extend, and maintain.

### What is Tailwind CSS?

Tailwind CSS is a utility-first CSS framework that lets you build modern, responsive user interfaces directly in your markup. Instead of predefined components, Tailwind provides low-level utility classes that give you full design control without leaving your HTML.

Tailwind Sidebar is built on top of Tailwind CSS, offering a clean, flexible, and highly customizable sidebar solution for modern web applications.

---

## Why Choose Tailwind Sidebar?

### Optimized Performance

Tailwind Sidebar relies on utility classes instead of heavy JavaScript logic. This means that it delivers fast load times and smooth interactions, and is ideal for performance-critical applications.

### Developer-Friendly

It doesn’t have any complex configuration or component APIs. If you know Tailwind CSS, you already know how to customize the sidebar.

### Easy Maintenance

With a simple and predictable structure, updates and custom changes are straightforward, making it suitable for both small projects and large-scale applications.

### Growing Tailwind Community

Tailwind CSS has a massive and active community. This means better tooling, regular updates, and a wealth of learning resources to support your development workflow.

---

## How to Get Started with Tailwind Sidebar

This section will walk you through installing and setting up `tailwind-sidebar` in a React and Next.js application. You’ll learn how to add a sidebar, create menus, add a logo, and customize navigation.

### Step 1: Install <VPIcon icon="fa-brands fa-npm"/>`tailwind-sidebar`

To begin, you’ll need to install [<VPIcon icon="fa-brands fa-npm"/>`tailwind-sidebar`](https://npmjs.com/package/tailwind-sidebar) into your React and Next.js project. You can do this using either npm or yarn.

::: code-tabs#sh

@tab:active <VPIcon icon="fa-brands fa-yarn"/>

```sh
yarn add tailwind-sidebar
```

@tab <VPIcon icon="fa-brands fa-npm"/>

```sh
npm i tailwind-sidebar
```

:::

This will add `tailwind-sidebar` and its dependencies to your project.

### Step 2: Import the Tailwind Sidebar Component

Once the package is installed, you can import the necessary components from tailwind-sidebar into your project. These components will allow you to customize the sidebar with menus, submenus, and even a logo.

```js
import {
  AMSidebar,
  AMMenuItem,
  AMMenu,
  AMSubmenu,
  AMLogo,
} from "tailwind-sidebar";
```

#### Adding Styles to Tailwind Sidebar

To use the default styles of tailwind-sidebar, you need to import its CSS file at the top of your project:

```js
import "tailwind-sidebar/styles.css";
```

### Step 3: Routing Setup for React and Next.Js

To enable navigation inside `tailwind-sidebar` components like `AMMenuItem` or `AMLogo`, you need to pass a link component from either react-router or next/link using the component prop inside the corresponding component, like what’s shown in the below example:

If you're using **React**:

```jsx
import { Link } from "react-router-dom";

<AMSidebar width={"270px"}>
  <AMLogo img="https://adminmart.com/wp-content/uploads/2024/03/logo-admin-mart-news.png"
    component={Link}
    href="/"
  >
    Adminmart
  </AMLogo>
  <AMMenu subHeading="HOME">
    <AMMenuItem
      icon={<Home />}
      link="/"  // Passing link to component for routing
      badge={true}
      badgeType="default"
      badgeColor={"bg-secondary"}
      isSelected={true}
    >
      {/* text for your link */}
      Link Text
    </AMMenuItem>
  </AMMenu>
</AMSidebar>
```

And if you're using **Next.js**:

```jsx
import Link from "next/link";

<AMSidebar width={"270px"}>
  <AMLogo img="https://adminmart.com/wp-content/uploads/2024/03/logo-admin-mart-news.png"
    component={Link} // Passing link to component for routing
    href="/"
  >
    AdminMart
  </AMLogo>
  <AMMenu subHeading="HOME">
    <AMMenuItem
      icon={<Home />}
      link="/tes"
      component={Link}
      isSelected={true}
    >
      Link Text {/* text for your link */}
    </AMMenuItem>
  </AMMenu>
</AMSidebar>
```

### Step 4: Initializing the Sidebar

Now we’ll set up the `AMSidebar` component in your application. You can set the width of the sidebar using the `width` prop. Here’s a simple example:

```jsx
<AMSidebar width={"270px"}> {/* pass the width you want your sidebar to have */

{/* Sidebar Content Goes Here */}

</AMSidebar>
```

This initializes the sidebar with a width of `270px`. You can adjust this width based on your design requirements.

### Step 5: Adding a Logo to the Sidebar

You can add a logo inside the sidebar by using the `AMLogo` component. To do so, you can provide an `img` prop to link to a CDN logo image. You can also make the logo clickable by passing a navigation link using the `component` and `href` props. Here’s how you can include a logo:

```jsx
<AMSidebar width={"270px"}>
  <AMLogo
    img="https://adminmart.com/wp-content/uploads/2024/03/logo-admin-mart-news.png"
    component={Link}
    href="/" 
  >        
    Adminmart
  </AMLogo>
</AMSidebar>
```

In this example, we’ve added a logo from a CDN using the `img` prop, used the `component` prop to pass the `Link`, and set the navigation path to `(/)` homepage using the `href` prop and set the text “AdminMart” as the name of the application.

### Step 6: Creating a Menu Inside the Sidebar

Now let’s create a menu inside the sidebar using the `AMMenu` component. You can specify a submenu heading using the `subHeading` prop. Inside the `AMMenu`, you can add `AMMenuItem` components for each item.

You can also provide a `link` prop along with the `component` prop to the `AMMenuItem` to turn the item into a clickable link.

Here’s how you can structure the menu:

```jsx
<AMSidebar
 width={"270px"}>
  <AMMenu subHeading="HOME">
    <AMMenuItem
      component={Link}
      link="/"
      badge="true"
      isSelected={true}
    >
      Modern
    </AMMenuItem>
    <AMMenuItem>eCommerce</AMMenuItem>
    <AMMenuItem>Analytical</AMMenuItem>
  </AMMenu>
</AMSidebar>
```

::: info In this example:

- We’ve added a `AMMenu` with the heading “HOME”.
- The first `AMMenuItem` has a `link` prop, so clicking it will navigate to the homepage `(/)`.
- The second and third `AMMenuItem` components are simple text items without links.

:::

You can use the `badge="true"` prop to indicate a badge or notification on the **AMMenuItem**. The `isSelected={true}` prop marks this menu item as currently selected or active (though you can customize this feature according to your needs).

### Step 7: Adding Submenus (Optional)

To add submenus inside the main menu, use the `AMSubmenu` component. The `AMSubmenu` can be nested inside the `AMMenu` component and contains its own set of `AMMenuItem`. Use the `title` prop to set the submenu heading

Here’s an example of adding a submenu:

```jsx
<AMSidebar  width={"270px"}>
  <AMMenu subHeading="SERVICES">
    <AMMenuItem  component={Link}   link="/web-development">Web Development</AMMenuItem>
    <AMMenuItem component={Link}  link="/seo-services">SEO Services</AMMenuItem>
    <AMSubmenu title="Marketing">
      <AMMenuItem component={Link}  link="/digital-marketing">Digital Marketing</AMMenuItem>
      <AMMenuItem component={Link}  link="/content-marketing">Content Marketing</AMMenuItem>
    </AMSubmenu>
  </AMMenu>
</AMSidebar>
```

::: info In this example:

- A submenu under the "Marketing" heading is added inside the "SERVICES" menu.
- The submenu contains two `AMMenuItem` with links to different service pages.

:::

---

## Features of Tailwind Sidebar

### Utility-First & Lightweight

Tailwind Sidebar is built entirely using Tailwind CSS utility classes. This means there’s no heavy JavaScript logic or extra styling framework, keeping your bundle size small and performance fast.

::: tip Code Example

```js
<AMSidebar width="260px" className="bg-gray-900 text-white">
  <AMMenu>
    <AMMenuItem>Dashboard</AMMenuItem>
  </AMMenu>
</AMSidebar>
```

:::

::: info What’s going on here

- `bg-gray-900 text-white`: Applies a dark background and white text *directly* via Tailwind classes (no separate CSS file).
- `width="260px"`: The component prop sets the sidebar width. Here, it shows how Tailwind utilities combine with props to control layout.

:::

Because all spacing and colors are from Tailwind classes, you don’t need additional custom styles.

### Fully Responsive Design

The sidebar adapts seamlessly to different screen sizes. Whether you’re building for desktop, tablet, or mobile, Tailwind Sidebar ensures a smooth and consistent navigation experience.

::: tip Example usage

```js
<AMSidebar width="260px" className="hidden md:block">
  <AMMenu>
    <AMMenuItem>Home</AMMenuItem>
  </AMMenu>
</AMSidebar>
```

:::

::: info What’s going on here

- `hidden md:block`: Uses Tailwind *responsive utility classes* to hide the component (`hidden`) on mobile screens and show it starting at the `md` breakpoint (`md:block`).

:::

This pattern is Tailwind’s common way of controlling visibility across breakpoints without media queries.

### Highly Customizable

Tailwind Sidebar allows full customization of colors, hover states, spacing, and typography directly through Tailwind classes. You can customize layout and animations – all without touching custom CSS files.

::: tip Example usage

```jsx
<AMMenuItem 
  className="hover:bg-blue-600 rounded-lg px-4 py-2"
>
  Analytics
</AMMenuItem>
```

:::

::: info What’s going on here:

- `hover:bg-blue-600`: When you hover the menu item, the background changes to blue, purely via Tailwind.
- `rounded-lg`: Adds rounded corners.
- `px-4 py-2`: Controls horizontal (`px`) and vertical (`py`) padding to adjust spacing.

:::

Together, these utilities show how Tailwind gives control of design details directly at the HTML/JSX level.

### Integration with React & Next.Js:

Tailwind Sidebar seamlessly integrates with both React & Next.js, offering a familiar and efficient development experience.

The sidebar works natively with both **React Router** and **Next.js routing** by passing the `Link` component.

::: code-tabs#jsx

@tab:active <VPIcon icon="fa-brands fa-react"/>

if you are using react then import link from

```jsx
{/*   */}
import { Link } from "react-router-dom";

<AMMenuItem component={Link} link="/dashboard">
  Dashboard 
</AMMenuItem>
```

@tab <VPIcon icon="iconfont icon-nextjs"/>

if you are using nextjs then import link from

```jsx
import Link from "next/link";

<AMMenuItem component={Link} link="/dashboard">
  Dashboard
</AMMenuItem>
```

:::

::: info What’s going on here:

- `component={Link} link="/dashboard"`: Shows how you pass your framework’s routing component into `AMMenuItem`, turning it into a real navigational link.

:::

This means Tailwind Sidebar adapts to both React Router and Next.js routing without boilerplate.

### Menu & Submenu Support

Organize your navigation with:

- Main menu items
- Nested submenus

This makes it easy to manage complex navigation structures while keeping the UI clean and intuitive.

::: tip Example usage

```jsx
<AMMenu subHeading="MANAGEMENT">
  <AMMenuItem>Users</AMMenuItem>
  <AMSubmenu title="Reports">
    <AMMenuItem>Sales</AMMenuItem>
    <AMMenuItem>Revenue</AMMenuItem>
  </AMSubmenu>
</AMMenu>
```

:::

::: info What’s going on here:

- `subHeading="SERVICES"`: Adds a labeled grouping for menu items.
- The nested `<AMSubmenu>` demonstrates how nested navigation is rendered and structured in JSX.

:::

This example clearly shows hierarchical menus without additional CSS – structure and Tailwind classes handle layout.

### Icon Support

The sidebar comes with built-in support for icons, allowing developers to enhance the visual appeal and usability of their application. Developers can use any icon library and provide the icon component.

::: tip Example using `lucide-react`

```jsx
import { Home } from "lucide-react";

<AMMenuItem 
  icon={<Home size={18} />}
>
  Home
</AMMenuItem>
```

:::

::: info What’s going on here:

- `icon={<Home size={18} />}`: Here, an icon component is passed as a prop.
- You control the size directly via the icon library (Lucide here) and Tailwind handles spacing/placement next to text.

:::

This illustrates how icons and text combine in the sidebar component.

### Smooth Transitions

Tailwind Sidebar provides built-in animation support through the animation prop. When enabled, menu items and submenus animate smoothly, improving the overall user experience without requiring custom CSS or JavaScript.

::: tip Example Usage

```jsx
<AMSidebar width="270px" animation={true}>
  <AMMenu subHeading="SETTINGS">
    <AMMenuItem>Profile</AMMenuItem>
    <AMMenuItem>Security</AMMenuItem>
  </AMMenu>
</AMSidebar>
```

:::

::: info What’s going on here:

- `animation={true}`: Enables built-in animation support.

:::

The example shows how adding this prop triggers smooth transitions defined by the component itself (still relying on Tailwind utilities internally). You don’t have to write CSS keyframes or transition utilities manually.

---

## Wrapping Up

You have now successfully integrated a fully functional sidebar in your React and Next.js application using `tailwind-sidebar`. You can further customize the sidebar by:

- Modifying the width and design.
- Adding more submenus, menu items, or icons.
- Using links to navigate between pages.

This setup provides a flexible, responsive, and easy-to-use sidebar, which is perfect for most web applications.

If you want to see how this kind of sidebar fits into a real dashboard layout, you can explore an open-source Tailwind CSS admin template at

<SiteInfo
  name="Free Shadcn Dashboard built with React and Tailwind - Tailwindadmin"
  desc="TailwindAdmin is free and Open Source Shadcn Dashboard Template built using React and Tailwind CSS. It provides stunning user interface with clean code, dashboard options, useful blocks and components to create your admin panel."
  url="https://tailwind-admin.com"
  logo="https://tailwind-admin.com/favicon.ico"
  preview="https://tailwind-admin.com/images/og-image/og-image.jpg"/>

::: info Try It Out

You can view the working demo of the tailwind-sidebar here: 

```component VPCard
{
  "title": "TailwindAdmin - ReactJS Tailwind",
  "desc": "",
  "link": "https://tailwind-admin-react-free.netlify.app/",
  "logo": "https://tailwind-admin-react-free.netlify.app/favicon.svg",
  "background": "rgba(93,135,255,0.2)"
}
```

:::

::: note

in this tutorial, we utilized `lucide-react` to construct this sidebar. Feel free to choose an alternative library or use different icons based on your specific requirements.

:::

::: info Other Sidebar NPM Packages

You can also try [Next.js Tailwind Sidebar (<VPIcon icon="fa-brands fa-npm"/>`nextjs-tailwind-sidebar`)](https://npmjs.com/package/nextjs-tailwind-sidebar) – a simple and responsive sidebar built for Next.js, and [React Tailwind Sidebar (<VPIcon icon="fa-brands fa-npm"/>`react-tailwind-sidebar`)](https://npmjs.com/package/react-tailwind-sidebar) – a lightweight Tailwind-based sidebar for React applications.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Use the tailwind-sidebar NPM Package in Your React and Next.js Apps",
  "desc": "These days, developers are increasingly preferring utility-first CSS frameworks like Tailwind CSS to help them build fast, scalable, and highly customizable user interfaces. In this article, you’ll learn what the tailwind-sidebar NPM package is, how ...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-tailwind-sidebar-npm-package-in-react-nextjs.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
