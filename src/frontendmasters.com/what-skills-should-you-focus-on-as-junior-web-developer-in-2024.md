---
lang: en-US
title: "What Skills Should You Focus on as Junior Web Developer in 2024?"
description: "Article(s) > What Skills Should You Focus on as Junior Web Developer in 2024?"
icon: fas fa-user-tie
category: 
  - Career
  - Tip
  - Article(s)
tag:
  - blog
  - frontendmasters.com
  - career
  - tips
head:
  - - meta:
    - property: og:title
      content: "Article(s) > What Skills Should You Focus on as Junior Web Developer in 2024?"
    - property: og:description
      content: "What Skills Should You Focus on as Junior Web Developer in 2024?"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/what-skills-should-you-focus-on-as-junior-web-developer-in-2024.html
prev: /projects/career/articles/README.md
date: 2024-08-26
isOriginal: false
author: Frontend Masters Staff
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/3235
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Career > Article(s)",
  "desc": "Article(s)",
  "link": "/projects/career/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="What Skills Should You Focus on as Junior Web Developer in 2024?"
  desc="These are our recommendations for those of you early in your web developer journey. This is about tech and the real world stuff around it that you'll need."
  url="https://frontendmasters.com/blog/what-skills-should-you-focus-on-as-junior-web-developer-in-2024/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/3235"/>

Let’s say *Junior Web Developer* means you’re either just starting out learning, you’ve got a job but are early in your career, or somewhere between those. Our goal with this guide is to give you things to learn that we believe will serve you well. That is, they will **make you a better developer and ideally a more employable and promotable employee**.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/08/juniors.png?resize=1024%2C683&ssl=1)

---

## Fundamentals are always smart

Let’s not be `old-man-shakes-fist-at-kids.gif` about this, but learning the fundamentals of tech is demonstrateably useful. It’s true in basketball, it’s true for the piano, and it’s true in making websites. If you’re aiming at a long career in websites, the fundamentals are what powers it.

For a web developer, those are HTML, CSS, JavaScript, accessibility, image formats (e.g. PNG, SVG, JPG, etc.), data storage, API design and usage, HTTP, servers and backend languages, and lets throw version control in there. Do you need to have complete mastery over all of them? Nope. But you need a working knowledge of them.

The point of the fundamentals is how long-lasting and transferrable the knowledge is. It will serve you well no matter what *other* technologies a job might have you using, or when the abstractions over them change, as they are want to do.

Here’s an example regarding images on the web

All frameworks will handle images differently. They’ll all have their reasons for that.

For instance, Rails has [<FontIcon icon="iconfont icon-rails"/>a helper method like this: `image_tag()`](https://api.rubyonrails.org/v7.1.3.4/classes/ActionView/Helpers/AssetTagHelper.html). This helps you generate an `<img />` with a `src` that points to the image correctly, and helpfully generates browser-cache busting URL parameters. You’re on your own for optimization. If you want to try to use the responsive images syntax, only recently do they have [<FontIcon icon="fas fa-globe"/>rudimentary support](https://eagerworks.com/blog/rails-picture-tag-responsive-image-support).

[<FontIcon icon="iconfont icon-nextjs"/>The Next.js `<Image />` component](https://nextjs.org/docs/app/api-reference/components/image) is quite different in that it wants to *optimize* the image for you and output the image with the `srcset` syntax in order to serve right-size images to different devices, as well as provide a blur-up loading style. This is much fancier and helpful, but if you are trying to do something custom, like any `<picture>` element usage, you’ve gotta keep going down [<FontIcon icon="iconfont icon-nextjs"/>a proprietary rabbit hole](https://nextjs.org/docs/app/api-reference/components/image#getimageprops).

[<FontIcon icon="fas fa-globe"/>The Eleventy Image utility](https://11ty.dev/docs/plugins/image/) helps provide optimized image output for you to use however you want to construct your image HTML. It’s quite powerful in how many options it offers and features and formats it supports. But it’s intentionally unopinionated leaving much of a final implementation on your shoulders.

Those are all *very* different approaches.

A developer skilled in the fundamentals will understand how the `<img>` tag (and related elements and attributes) works in HTML and then layers on tools to help get there. That knowledge will translate from approach to approach and framework to framework. If you just use whatever a framework gives you and don’t dig into the fundamentals, you not only aren’t doing as good of a job as you could, but you lose knowledge between projects.

### Understand the Browser

This is literally what the term “front end” means. It means **the browser.**

“Back end” work revolves around servers. Servers that are *exactly known* and produce identical and reliable results each time they are used.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/08/browsers-complex.png?resize=1012%2C1024&ssl=1)

Browsers are much less *known* — that is — *one* browser will produce identical and reliable results when used, but users visit your website from thousands of different permutations of browsers, versions of those browsers, devices they run on, screen sizes they are looking at, with different features enabled, and more. The browser space is [<FontIcon icon="fas fa-globe"/>pretty complex and unpredictable](https://daverupert.com/2024/02/ui-states/).

Learning what the browser is doing and how to work with it is immensely useful. Your main tool in this endeavor is that browsers DevTools. [DevTools are very worth learning.](https://frontendmasters.com/courses/dev-tools/) DevTools allow you to do all sorts of inspection and analysis on a website like:

- Understand all the network requests that were made to produce the website you’re looking at
- Inspect any particular element on the page, see where it sits in the DOM tree, and see all associated styling information on it.
- See the original HTML that came down in the initial request for the page (e.g. “View Source”)
- Dig into the animations present on the page, slowing them down, reversing them, and generally controlling them to understand what is happening.
- Look at the storage (e.g. cookies, sessionStorage, etc) that apply to the current page
- And… no joke… easily hundreds more things, *most* of which will be useful at some point to you. (Try pressing <kbd>Command</kbd>-<kbd>Shift</kbd>-<kbd>P</kbd> within DevTools to see a menu of some of the things it can do.)

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/08/Screenshot-2024-08-19-at-8.19.45%E2%80%AFAM.png?resize=1024%2C440&ssl=1)

Seeing and being able to manipulate the DOM, as well as the active styles on any element, is incredibly useful alone.

Again, anything you learn on top of what browsers are natively doing is a purposeful abstraction. Learning what browsers are doing means that as higher-level technology changes (e.g. *a new framework!*) you’ll still have the underlying knowledge of how it all works.

### The Basics of HTML

Literally every website is HTML. It’s absolutely unavoidable, not that you’d want to avoid it, because it’s powerful and useful. Here are the basics to know first:

Use the semantic (meaning *appropriate* and *meaningful*) block tags of HTML. Using a `<div>` or `<span>` is a perfectly fine choice for a block or line of content (respectively) that you need to apply a class to to style, but use a `<section>`, `<article>`, `<header>`, `<footer>`, `<search>`, or `<aside>` if that is what the element contains.

Use `<a href="">` for links to pages and `<button>` for actions that aren’t navigating to pages.

Use `<h1>` … `<h6>` for headings, knowing that each level down is like marking a subsection, so an `<h3>` is like a header under a subsection of the nearest above `<h2>`.

Use semantic and *functional* forms that properly pair labels with inputs, like this:

```html
<form action="/login" method="post">
  <label>
    Email
    <input type="email" name="email" required>
  </label>
  <label>
    Password
    <input type="password" name="password" required>
  </label>
  <button>Log In</button>
</form>
```

Use the `id` attribute on elements in order to more easily select it in JavaScript, for accessibility associations, or to allow links to jump down to that element, and generally not for styling. Use the `class` attribute for CSS to select and style things. Use `data-*` attributes for arbitrary information from your own app you need to access via JavaScript later or select in CSS against, rather than making up your own attributes.

There is actually quite a lot to know about HTML, but this will bring you far. Do not push HTML away as some kind of toy language. It is absolutely fundamental to to the web and powerful in it’s own right. *Every* website uses and needs it.

::: details Here’s a semantic HTML document

```html :collapsed-lines
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sample Semantic Page</title>
</head>

<body>
  <header>
    <h1>Website</h1>
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
    <search>
      <form action="#" method="get">
        <label>
          Search
          <input type="search">
        </label>
      </form>
    </search>
  </header>

  <main>
    <article>
      <h2>Welcome to Our Website</h2>
      <p>This is an example of an article within a main element. Here you can include any content relevant to your main topic.</p>
    </article>
  </main>
  
  <aside>
    <h2>News</h2>
    <p>Latest updates and news can be found here.</p>
  </aside>

  <footer id="contact">
    <p>Contact us at <a href="mailto:info@example.com">info@example.com</a>.</p>
    <form action="#" method="post">
      <label for="name">Name:</label>
      <input type="text" id="name" name="name" required>

      <label for="email">Email:</label>
      <input type="email" id="email" name="email" required>

      <label for="message">Message:</label>
      <textarea id="message" name="message" required></textarea>

      <button type="submit">Send</button>
    </form>
  </footer>
  
</body>

</html>
```

::: info

[Complete Intro to Web Development](https://frontendmasters.com/courses/web-development-v3/) is free and covers all of this in one course.

:::

### The Basics of CSS

CSS is what styles the web. Some web developers end up embracing or even focusing on CSS, and some do not. That’s OK, but you have to respect it. Like HTML, *all* websites use it. CSS is so solid and powerful these days you can learn enough to be effective pretty quickly.

Layout might be the most important single thing you can learn in CSS, and thanks to grid layout, you’ve got a great tool for it at your fingertips. As [Miriam Suzanne says](https://frontendmasters.com/blog/wp-admin/post.php?post=3235&action=edit), more advanced CSS features can wait, *[learn grid now](https://frontendmasters.com/courses/css-grid/)*. Setting up a basic page layout is honestly quite satisfying:

```html
<div class="page">
  <main>
  </main>

  <aside>
  </aside>
</div>
```

```css
.page {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr 150px;

  @media (width < 400px) {
    grid-template-columns: 1fr;
  }
}
```

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/08/side-by-side.png?resize=1024%2C232&ssl=1)

Putting elements side by side is no small part of the job.

Setting up [<FontIcon icon="fa-brands fa-firefox"/>custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) (variables) is also a good practice, and colors is the perfect use. Giving yourself a set of colors to pick from will help keep your design consistent and easier to work with:

```css
html {
  --brand: red;
  --accent: yellow;

  --gray-extra-light: #f8f9fa;
  --gray-light: #dee2e6;
  --gray: #adb5bd;
  --gray-dark: #495057;
  --gray-extra-dark: #212529;
}

.box {
  background: var(--gray);
  border: 2px solid var(--gray-extra-dark);

  &.accent {
    border-color: var(--accent);
  }

  h2 {
    color: var(--brand);
  }
}
```

Oliver Reichenstein once famously wrote that [<FontIcon icon="fas fa-globe"/>Web Design is 95% Typography](https://ia.net/topics/the-web-is-all-about-typography-period). He’s not wrong. There is awful lot of words on the web trying to communicate with us, and they can be objectively well presented… or not.

Even if you learn and use a framework that abstracts aways CSS into HTML like [<FontIcon icon="iconfont icon-tailwindcss"/>Tailwind](https://tailwindcss.com/) (which is probably a smart choice particularly if you’re job hunting — [here’s a course](https://frontendmasters.com/courses/tailwind-css/)), the styles are ultimately applied with CSS and so knowing it behooves you.

There is a lot to know about CSS alone, but between a good foundation of layout, colors, and typography, you’ll be in good shape.

### The Basics of JavaScript

JavaScript is arguably the biggest and most important language in web development. It is all-powerful in the browser, dealing with interactivity, events, network requests, manipulating the DOM, and more. If you end up having a long career in web development, you’ll end up reading and writing a *lot* of JavaScript.

If you’re into web *design*, we’d recommend still being somewhat familiar with JavaScript, and [here’s our recommendations](/frontendmasters.com/5-things-designers-can-do-with-javascript.md) on what to learn that will serve you sell.

If you find yourself clicking with JavaScript, focusing on it isn’t a bad idea. We have lots of great courses on JavaScript, like a free course on [getting started with JavaScript](https://frontendmasters.com/courses/getting-started-javascript-v2/).

::: info

We have a fantastic learning path covering all the [essentials of web development](https://frontendmasters.com/learn/beginner/) or even a full path to [become a JavaScript master](https://frontendmasters.com/learn/javascript/) if video courses are your thing!

:::

---

## But… only fundamentals isn’t enough

It’s a tough job market out there. Employers are often looking for skills in a specific technology, especially in lieu of a lot of experience. If you find yourself clicking with some aspect of web design and development, you’d do well do go deep on it, as it will likely feel fulfilling to you while being easier to stick with. Plus, that helps turn you into someone [<FontIcon icon="fa-brands fa-wikipedia-w"/>T-shaped](https://en.wikipedia.org/wiki/T-shaped_skills) (deep experience in one area, wide experience with other areas) which is a common and desirable thing for web developers.

- If working with data clicks with you, lean into that.
- If you’re attracted to building systems, design systems are a big thing these days with companies have dedicated design system teams.
- If you enjoy illustration or animation, the web is a great place for that.
- If managing servers and processes sounds like something you’d be interested in, DevOps is a whole career path.

In back-end web development land, it’s not uncommon at all to find job postings for specific languages and technologies. Companies hire for things like a “Go Developer” or a “Python Developer”.

It’s a bit less common to hire for specific languages on the front-end, but it’s *very* common for companies to use the title **“Full-Stack Developer”** to describe what is likely mostly a front-end job. If you need to put **full-stack** on your resume to get you past the robot resume checkers, you should go for it (to get on the road, here’s our [full-stack learning path](https://frontendmasters.com/learn/fullstack/)). Aspects of full-stack development that touch the back end are likely rooted in data fetching and API development, and commonly in Node JavaScript, which nicely pairs with front-end knowledge.

If you’re more comfortable with saying “Front-End Developer”, in some poking around job boards and general job postings, that’s still a pretty common term used for hiring.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/08/full-stack.jpg?resize=1024%2C571&ssl=1)

### The job can be a more than half learning conventions

Say you’re a new web developer on the job, and you’re given a ticket to have a button open an informational popup for users to read for extra information. You have a solid grasp of the fundamentals, so you make a Pull Request where you implement this [as a popover](/frontendmasters.com/popover-api-is-here.md) (e.g. `<div id="extra-information" popover>Extra information.</div>`).

Then the feedback arrives: *… but that’s not how it’s done **here** …*

At this job, with this current code base, you:

1. Use the existing `<Popup />` element from the Design System.
2. Keep the content in the `Copy` package as HTML strings, so it can be translated.
3. Make an enum for it (e.g. `export const POPOVER_EXTRA_INFORMATION = "POPOVER_EXTRA_INFORMATION"`) so that anywhere that refers to this component or copy has a consistent name.
4. Has a component test ensuring it functions correctly.
5. Use special classes from the design system in order to create variations, rather than it’s own bespoke styles.

None of those things are really “fundamentals”, they are *conventions* that this particular code base has grown into over time to make it manageable. You might even bristle against them at first because they seem overzealous, overcomplicated, or antiquated. But give it time. Typically conventions like this are put in place to solve previous problems, and you may not have been around to feel those problems.

As the title of this section said, the actual work of a job might be more than half learning, using, and evolving these conventions.

---

## Learn a framework

Pick one!

It’s actually probably better to pick *one* (and a relatively popular one at that) and build something real/significant on it. Right now, the big front-end frameworks are:

1. [<FontIcon icon="iconfont icon-nextjs"/>Next.js](https://nextjs.org/) (React) — [React Learning Path](https://frontendmasters.com/learn/react/)
2. [<FontIcon icon="iconfont icon-nuxtjs"/>Nuxt](https://nuxt.com/) (Vue) — [Vue Learning Path](https://frontendmasters.com/learn/vue/)
3. [<FontIcon icon="iconfont icon-astro"/>Astro](https://astro.build/) (Multi-framework capable) — [Astro Course](https://frontendmasters.com/courses/astro/)

And if you’re intentionally *not* wanting to use a site where you’re writing JavaScript to build it:

1. [Hugo](https://gohugo.io/) (Go)
2. [Jekyll](https://jekyllrb.com/) (Ruby)
3. [Eleventy](https://11ty.dev/) (Node)

If what you’re building is a pure content site a classic Content Management System (CMS) is good choice, and here are some of the big ones:

- [WordPress](https://wordpress.org/) (PHP)
- [CraftCMS](https://craftcms.com/) (PHP)
- [<FontIcon icon="iconfont icon-strapi"/>Strapi](https://strapi.io/) (Node)

If you’re interested in more of a full stack framework that helps with back-end needs as well:

1. [<FontIcon icon="iconfont icon-rails"/>Ruby on Rails](https://rubyonrails.org/) (Ruby)
2. [<FontIcon icon="iconfont icon-django"/>Django](https://djangoproject.com/) (Python)
3. [Laravel](https://laravel.com/) (PHP)

You may hear advice that you should learn fundamentals and understand what a framework is doing before you leap into using the framework. That’s an understandable opinion, but frameworks are so common and come up in job descriptions enough that learning them early is not going to hurt you. Many people learn and framework and the underlaying technology together and over time.

The point of picking a framework is partially because they help you build websites faster by helping with a whole variety of things, including things that aren’t really a part of the web platform itself. For instance, websites are often built from **data**. Sure, a blog post is ultimately served as HTML, but the content, the title, the author, the tags, etc. are not *stored* as a big chunk of HTML, it is stored as data, and later templated into HTML. This gives you a practical level of control over what you’re building. A framework can help you retrieve that data and do the templating, and potentially even store and edit that data. That’s just to name one thing a framework can do that is awfully important.

A framework will likely also help you with URLs, otherwise known as *routing.* A framework like Next.js has “folder-based” routing, meaning you’re building the URLs your site will use based on the names of folders and files in the project itself. A framework like WordPress gives you control over the URLs through settings and the way you structure content, and much less so through files and folders. Learning these different conventions is interesting, as they are full of trade-offs. Evaluating trade-offs are a big part of leveling up as a developer.

Frameworks will also likely provide a way to build a site by combining together smaller pieces. JavaScript frameworks typically call them “components”, but any framework will have some abstraction for this idea. “Partials” and “includes” are similar ideas. Building websites from smaller parts is now well-established as the way that digital products are best-built. They can evolve into a design system, a way to systematize and bring consistency to otherwise large and unwieldily products. Components can be opinionated, in a good way, about what data they require. They can encapsulate logic, styles, and behavior. They can sometimes be loaded as needed to help with performance.

---

## General Tooling

It’s useful to understand how some tools help you with the fundamental languages. For, consider these tools that we’d generically refer to as processors:

- [TypeScript](https://frontendmasters.com/learn/typescript/) augments [JavaScript](https://frontendmasters.com/learn/javascript/) — [TypeScript Learning Path](https://frontendmasters.com/learn/typescript/)
- [SCSS](https://sass-lang.com/documentation/js-api/interfaces/options/) augments CSS
- [JSX](https://react.dev/learn/writing-markup-with-jsx) augments HTML

You don’t always need them, but it’s good to know when laying them on is a good idea. Most code bases, particularly at a job where you have a team and are working on a long-term project, are going to use a bunch of tools.

There are tools that… help run tools! If you’re using a framework, it’s common that a variety of tooling is already built in. For example Nuxt and Astro run [Vite](https://vitejs.dev/) under the hood, which does all sorts of things like running a server, processing TypeScript, and bundling. Vite is great and [worth learning](https://frontendmasters.com/courses/vite/).

There is great benefit to tools in the formatting and linting world as well. A formatting like [Prettier](https://prettier.io/) automatically formats your code in your code editor. Linting tools like [ESLint](https://eslint.org/) for JavaScript and [Stylelint](https://stylelint.io/) for CSS are helpful in warning you about problems in your code. These types of tools you typically make dependencies of your project, but express themselves mostly in your code editor. And let’s face it, [VS Code](https://code.visualstudio.com/) is the dominant code editor right now.

---

## Making a Complete Website

There is one thing you can do that might just light a spark inside you about this whole *building websites* thing. It’s build a website. For real though:

1. Buy a domain for something real
2. Figure out web hosting
3. Build the real website
4. Deploy it to the world

For example, buy your own name as a domain name. There are so many TLDs these days, you’ll find something that works. Now you’ve got real skin in the game. This is *your* website. It represents *you.* You’ll probably send people here on purpose, maybe for the rest of your life. You own this bit of digital real estate, and paid money to have it.

Getting a project like this done can be truly exhilarating, knowing that anyone in the world can see and interact with it. Now do it again!

You could build [a personal portfolio website](https://frontendmasters.com/courses/portfolio-website/) for this. Hosting doesn’t have to be hard or expensive, [we have a simple guide](/frontendmasters.com/exactly-how-to-deploy-local-files-to-make-a-live-website.md). Leveling up, Jem’s course can walk you through [setting up your own server from scratch](https://frontendmasters.com/courses/fullstack-v3/)

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/08/build-portfolio.png?resize=1024%2C798&ssl=1)

---

## The Most Important of All: Being Someone People Want to Work With

**Be friendly.** Nobody wants to work with a jerk.

I understand that you can’t snap your fingers and change your personality, but you can work on it. And just in case you have an idea that this industry prefers the *lone genius* type that you have to tiptoe around or get snapped at, please wipe that out of your mind because it isn’t true and it’s going to hurt you more than help. People hire other people. People give other people promotions. People are going to do that for people they like.

**Be interesting.** It’s a big world out there.

People want to work with people they like, respect, and think are worth getting to know. Are you super into building model ships? Did you recently become a more dedicated runner? Can you play the sitar? Are you a bit of a foodie? You don’t have to constantly prattle on about it, but you can bring all of yourself to professional situations. Intrigue people and remember that interesting solutions come from diverse places.

**Be valuable.** People don’t forget it when you help them.

Make sure you do your own work, but help other people with theirs, too. The most valuable people on any team are typically the *force multipliers*. A 10× developer isn’t a developer that is ten times better than an average developer, it’s a developer that multiplies the whole teams output by being helpful. That’s what will make you senior someday.

**Be smart.** You can *become* smart, particularly in niche areas, by putting in the time and learning them deeply. That’s what Frontend Masters is here for! Being smart is part of being valuable. Your expertise makes you that way, when you use it to solve problems and help people.

**Build a network.** You’re going to need to ask questions. A lot. Like, everyday. A network is just a way of saying you’ve got places to ask questions. Here are some Discords we like:

- [The Spicy Web Discord](https://discord.gg/CUuYVH7Qa9)
- [Lit Framework Discord](https://discord.com/invite/buildWithLit)
- [Next.js Discord](https://discord.com/invite/bUG2bvbtHy)
- [Astro Discord](https://discord.com/invite/astrodotbuild)
- [Tailwind CSS Discord](https://v1.tailwindcss.com/discord)
- [JavaScript.info Discord](https://discord.com/invite/AuEWpFkfD4)

And if you have a Frontend Masters membership, we have a Discord (look under the [Apps](https://frontendmasters.com/my-account/apps/) section of your account for access)

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/08/people.png?resize=1024%2C345&ssl=1)

---

## A Practical Step

**Do something every day.** Couple months of that and you’ve got yourself a awfully productive habit. For those of you with a job, you’re already doing this, so good job. This is more for the people who are trying to level up and get that job. An hour a day of learning and practicing is better than seven hours in one day.

---

## Know this:

It’s always going to be [a little uncomfortable](https://rachsmith.com/comfortable-with-the-struggle/). And by “always” we mean pretty much every day. You’ll sit down, have something you need to do, and not really understand how you’re going to do it. It can be frustrating and demoralizing. But computers are logical machines. Check out Julia Evan’s [Debugging Manifesto poster](https://store.wizardzines.com/products/poster-debugging-manifesto), it has a great line on it: “computers are always logical, even when it doesn’t feel that way.” There is a way through, and you’ll be able to find it. Take a walk, sleep it off, come back and try it again. This daily struggle is part of this career path.

---

## Things \*not\* to learn

We’d be hesitant to *stop* you from learning anything, particularly if your natural course of working and creating anything leads you there. If you’re trying to learn something that feels a bit like pulling teeth and you’re just learning it for the sake of learning it, that might be a good time to change course, just because there are no shortage of *other* things to learn that might click with you better.

---

## Good luck!

Feel free to comment below if you have your own thoughts on what a junior web developer these days should be focusing on, or to share your own journey.

We’ve been pointing to Frontend Masters courses here a lot, but can you blame us? It’s part of the journey. Our [Beginner Learning Path](https://frontendmasters.com/learn/beginner/) is nearly 40 hours, so that’ll keep you busy. It’s literally designed to make you career-ready. And beyond technical skills, we also have a completely free course on [Getting a Developer Job, v3](https://frontendmasters.com/courses/getting-a-job-v3/) when you feel like it’s time to hunt for a job!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "What Skills Should You Focus on as Junior Web Developer in 2024?",
  "desc": "These are our recommendations for those of you early in your web developer journey. This is about tech and the real world stuff around it that you'll need.",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/what-skills-should-you-focus-on-as-junior-web-developer-in-2024.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
