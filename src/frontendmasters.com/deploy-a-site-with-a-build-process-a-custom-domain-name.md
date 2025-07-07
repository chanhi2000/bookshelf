---
lang: en-US
title: "Deploy a Site with a Build Process & a Custom Domain Name"
description: "Article(s) > Deploy a Site with a Build Process & a Custom Domain Name"
icon: fas fa-network-wired
category:
  - DevOps
  - Cloudflare
  - Netlify
  - Article(s)
tag:
  - blog
  - frontendmasters.com
  - devops
  - cloudflare
  - netlify
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Deploy a Site with a Build Process & a Custom Domain Name"
    - property: og:description
      content: "Deploy a Site with a Build Process & a Custom Domain Name"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/deploy-a-site-with-a-build-process-a-custom-domain-name.html
prev: /devops/articles/README.md
date: 2025-07-12
isOriginal: false
author:
  - name: Chris Coyier
    url : https://frontendmasters.com/blog/author/chriscoyier/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/6028
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "DevOps > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Cloudflare > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/cloudflare/articles/README.md",
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

[[toc]]

---

<SiteInfo
  name="Deploy a Site with a Build Process & a Custom Domain Name"
  desc="The last part of this series is taking our site that we've got in GitHub and addng an Astro build process to it, then mapping a domain we own to the Netlify-hosted site."
  url="https://frontendmasters.com/blog/deploy-a-site-with-a-build-process-a-custom-domain-name/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/6028"/>

What we’ve done so far in this series is look at the *absolute easiest* way to take some static files and turn them into a Real Website (one that anyone in the world can see). Then we took things one step further and did the very practical step of putting the code on GitHub, which was then able to update our Netlify-hosted site with changes.

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

```component VPCard
{
  "title": "Deploy a Site with a Build Process & a Custom Domain Name",
  "desc": "The last part of this series is taking our site that we've got in GitHub and addng an Astro build process to it, then mapping a domain we own to the Netlify-hosted site.",
  "link": "/frontendmasters.com/deploy-a-site-with-a-build-process-a-custom-domain-name.md",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

:::

Now we’re in Part 3, and we’ll pick up where we left off once again, and do two more very practical things:

1. Use a site-building tool (we’ll use [Astro](https://astro.build/))
2. Use a real domain name

Once we’re done, we’ll be doing what dare-I-say *most* websites are doing. While we’re keeping this very beginner-focused, here’s the general outline for how websites operate: use tools to create files that become websites, place those files in version control, and utilize services to host our site.

---

## Adding a Build Process

### Why?

Why slap a build process onto a simple site?

It’s true: *you don’t always need a build process*, and I think *avoiding* adding tools is a better lesson than adding them because you think you have to. So I want to be clear here that we’re doing it here because we’re *learning.* But here are some reasons why we might:

- It can make content management easier. In our case, let’s build out some of the content with Markdown files, so that adding and changing content is potentially a bit easier and more flexible than editing one big HTML file.
- The build process can help slot in additional tools for helping with things like performance, writing in other languages, or doing responsible things like running tests.

We’ll be adding [<FontIcon icon="iconfont icon-astro"/>Astro](https://astro.build/) as the site-building tool for us, so it’s the tool that will be running the build process.

### Incorporating

The trick here is to scaffold a new, bare-bones Astro site, then move the HTML/CSS/JavaScript assets from our existing project into place in the Astro project.

Astro is clear that the right way to get started is using the command line. So far in this series, we’ve avoided the command line, using the GitHub Desktop app to do Git work, where git is natively a command line tool. But we’ve got no choice here, so let’s do it. I hope this isn’t a showstopper for anyone, but I think it’s outside the scope of this series to explain the command line. Naturally, there is a great course right here: [<FontIcon icon="fas fa-globe"/>Complete Intro to Linux and the Command-Line](https://frontendmasters.com/courses/linux-command-line/). The good news is that any operating system will have a free and perfectly serviceable command line app for you to use (like Terminal.app on macOS), and we won’t need it for long. We just need to get it open, then copy/paste the command Astro says to run on their homepage:

![A terminal window displaying a command prompt with the last login time and a command to create an Astro project using npm.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/07/terminal.png?resize=1024%2C710&ssl=1)

It’ll ask you a series of questions, where the default answer is likely fine, and you’ll end up with all the necessary files to run a basic Astro site.

::: note Slightly tricky part here for an absolute beginner

It’s going to make the Astro site into a folder, and that folder might have a strange, random name (if you didn’t name it yourself during the scaffolding questions). So in the terminal, you’ll type `cd [name-of-folder]` to “move” into it (“cd” is “change directory”). From *inside* that folder, now you can type `npm run dev` and it will *run* the Astro site. This is a change from our previous entirely static site. Now, when we’re *working* on our Astro site, we need to run it like we just did.

![We get lots of little niceties from working this way, like when we edit the code and save, the browser immediately updates to show the changes.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/07/Screenshot-2025-07-11-at-8.10.11%E2%80%AFAM.png?resize=1024%2C814&ssl=1)

:::

Now this looks absolutely nothing like our site, which is expected. We now need to move our HTML/CSS/JavaScript into the Astro-scaffolded files. These will be jobs like:

- HTML needs to move into `.astro` files to take best advantage of Astro features. So it’s likey our simple setup will involve porting most of it to an `src/pages/index.astro` file.
- Moving CSS and JavaScript assets into `src/assets` and linking them up how Astro likes to do it.

It might be useful to look at [my Git Commit that does this conversion (<FontIcon icon="iconfont icon-github"/>`chriscoyier/my-portfolio`)](https://github.com/chriscoyier/my-portfolio/commit/632126a8d41843c7a1784956469781e98f5a1d7c).

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/07/CleanShot-2025-07-11-at-12.59.39%402x.png?resize=1024%2C796&ssl=1)

It’s essentially our job to review the Astro site’s structure and integrate our existing code into the Astro setup.

### Taking Advantage of Astro Features

Our plan was to build out some of our content using Markdown files. We’re jamming in this concept because we’re learning and it’s interesting. But it’s also a fairly common need and project requirement. So let’s do it with the “work” section of our portfolio site.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/07/Screenshot-2025-07-11-at-1.15.41%E2%80%AFPM.png?resize=1024%2C601&ssl=1)

We’ve got these six images here. Let’s flesh out that section and make it actually powered by six Markdown files that link up the image but also have actual information about the project we worked on. This is a portfolio after all!

This is a perfect situation for Astro’s [<FontIcon icon="iconfont icon-astro"/>content collections](https://docs.astro.build/en/guides/content-collections/). We can define what we want a work item to be like from a data perspective, then make Markdown files for each item.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/07/CleanShot-2025-07-11-at-13.21.16%402x.png?resize=1024%2C766&ssl=1)

You can absolutely do all this work by hand. I might argue that you should. More than once. But I also don’t want to be ignorant to the AI revolution in how developers are working these days. I also think that fairly rote tasks like this are done usually *quite well* by AI agents. That’s particularly true here, as we’re doing something very basic and with-the-grain in a fairly popular framework with good open documentation.

I used an AI agent myself to do this job because I wanted to give it a whirl! I had just heard of [<FontIcon icon="fa-brands fa-google"/>Jules](https://jules.google.com/) from Google so I gave that one a try, but there are so many other choices. I’ve used Cursor a bunch which just launched [<FontIcon icon="iconfont icon-cursor"/>a web version of agents](https://cursor.com/agents) which seems interesting, for example.

I told Jules:

> in index.astro, there is a div with class “work__container”. I want to turn that area into an Astro Collection. Each of those images should actually be a markdown file. That markdown file has more stuff in it like a title and description as well as the image.

I’m sure it would have been happy to take follow-up instructions and all that, but this single prompt did the job just fine, and it ended up [as a PR (Pull Request) against the GitHub repo we set up (<FontIcon icon="iconfont icon-github"/>`chriscoyier/my-portfolio`)](https://github.com/chriscoyier/my-portfolio/pull/1).

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/07/Screenshot-2025-07-11-at-1.30.21%E2%80%AFPM.png?resize=1024%2C925&ssl=1)

Just a little hand-tweaking of that new <FontIcon icon="iconfont icon-astro"/>`Work.astro` file, and we have a nice new section that will be easy to update in the future by simple editing Markdown files.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/07/Screenshot-2025-07-11-at-1.48.28%E2%80%AFPM.png?resize=1024%2C736&ssl=1)

---

## Updating Netlify

We need to tell Netlify that our site is different now! No longer is it entirely static files. It’s true that Astro *makes* totally static files that can essentially be served in the same way, but when you use a site-building tool like Astro, the approach is to have the build process run when you deploy the site. That might sound a little strange if you’re learning about this for the first time, but it’s true.

When Astro builds your site for you locally, it builds your website in a folder called <FontIcon icon="fas fa-folder-open"/>`dist`. You can see that in the <FontIcon icon="iconfont icon-git"/>`.gitignore` file that came into existence when we scaffolded Astro, dist is in there, which means “do not track any of the files in that folder in Git”, meaning they don’t go to GitHub at all, and don’t go to Netlify. The reason for that is generally that it’s just noisy. The changes to those “built” files will occur on almost every commit, and it’s not particularly interesting to see those files change in Git. It’s interesting to see what you, the author, changed, not the changes to the built files. So, because Netlify doesn’t have them, it can just build them for itself.

We need to go into the Netlify settings for our project into **Build & deploy > Continuous deployment > Build settings.**

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/07/Screenshot-2025-07-11-at-1.58.13%E2%80%AFPM.png?resize=1024%2C281&ssl=1)

We update our “build command” to `npm run build` and the “publish directory” to <FontIcon icon="fas fa-folder-open"/>`dist`.

Netlify is smart enough to do this itself when you add an Astro project from the get-go, but here we’re changing the site from totally static to Astro, so it’s our job to update it.

A new deployment from Netlify (which you can do from a new commit to GitHub or **Deploys > Trigger Deploy** in the Netlify dashboard) and we’re in business:

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/07/Screenshot-2025-07-11-at-2.00.39%E2%80%AFPM.png?resize=865%2C1024&ssl=1)

---

## Adding a Real Domain Name

Right now I’ve got `mycoolpersonalportfolio.netlify.app` which is indeed a “real” domain name. But it’s just the free subdomain that Netlify gives you. It’s neat you can customize it, but it doesn’t have quite the professional feel that your own domain name would have. For example, my real website is at `chriscoyier.net` and that feels much better to me.

A domain like that is something you *own.* You have to buy it, and you can have it forever as long as you pay the renewal costs. In a sense, the domain name is almost more important than the website that’s on it since the content can and will change but the domain name won’t.

Netlify itself will help you buy a domain name. And honestly, it’s almost surely the easiest path forward here to do that, as they are incentivized to make it easy and work flawlessly. That’s fine, it’ll get the job done.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/07/CleanShot-2025-07-11-at-14.10.50%402x.png?resize=1024%2C357&ssl=1)

But personally, I like to keep the domains I own registered separately from the web host. Let’s say you want to leave Netlify hosting one day, wouldn’t that be weird to manage the domain at Netlify while dealing with the hosting somewhere else? It feels weird to me, like the incentives are now off.

I have most of my domains on [<FontIcon icon="fas fa-globe"/>GoDaddy](https://godaddy.com/), which is a big, popular choice, but I’ve heard good things about [<FontIcon icon="fas fa-globe"/>Porkbun](https://porkbun.com/), there is [<FontIcon icon="fa-brands fa-cloudflare"/>Cloudflare](https://cloudflare.com/products/registrar/), and a million others.

I own `coyier.dev` and I’ve never done anything with it, so what I’ll do is set it up as the domain for this project.

### Updating DNS

The trick is updating the DNS information for the domain name I own to what Netlify wants to host the site properly. In Netlify, I go to **Domain Management** and get to this area. At the same time, I’m logged into GoDaddy and find my way to the DNS **nameservers** area. I need to update the nameservers in GoDaddy to the ones Netlify tells me to use.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/07/CleanShot-2025-07-11-at-14.16.30%402x.png?resize=1024%2C562&ssl=1)

It’s likely to take a couple of hours for you to see this actually work. DNS is strange and mysterious though, requiring routers around the world to learn this new information, so it’s possible it takes 24 hours or more.

Once this process is done. The *DNS is resolving*, as they say, we’re done here!

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/07/Screenshot-2025-07-11-at-2.32.15%E2%80%AFPM.png?resize=1024%2C849&ssl=1)

---

## We did it

We’ve done what we set out to do. We have a portfolio website for ourselves.

The code for it we got on GitHub, which is a great place for it. Just think, if we drop our computer into a lake, when we get a new computer, we can just pull the code down again from GitHub and away we go. We could even invite a friend to help us with it and our changes will merge together.

We’re using Astro to build the site, which does all sorts of useful things for us like making the best static website it can make. We’re taking advantage of it’s build process to manage the **work** area of the site so it’ll be easy to add and change things.

We have Netlify hosting the site for us, which makes the website a *real* website that anyone in the world can visit. Netlify even builds our website for us when we commit new code to GitHub. This keeps our GitHub repo nice and clean.

We have a *real* domain name that we’ve “pointed” at Netlify. This gives us a nice level of professionalism and control.

If you’ve used this as a guide to do this work, I’d love to hear from you. You’re well on your web to becoming a web professional. If you’re anything like me, you get a nice sense of satisfaction from this whole process. 💜

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Deploy a Site with a Build Process & a Custom Domain Name",
  "desc": "The last part of this series is taking our site that we've got in GitHub and addng an Astro build process to it, then mapping a domain we own to the Netlify-hosted site.",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/deploy-a-site-with-a-build-process-a-custom-domain-name.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
