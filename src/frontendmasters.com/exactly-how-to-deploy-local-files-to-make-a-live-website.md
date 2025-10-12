---
lang: en-US
title: "Exactly How to Deploy Local Files to Make a Live Website"
description: "Article(s) > Exactly How to Deploy Local Files to Make a Live Website"
icon: fas fa-network-wired
category:
  - DevOps
  - Article(s)
tag:
  - blog
  - frontendmasters.com
  - devops
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Exactly How to Deploy Local Files to Make a Live Website"
    - property: og:description
      content: "Exactly How to Deploy Local Files to Make a Live Website"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/exactly-how-to-deploy-local-files-to-make-a-live-website.html
prev: /devops/articles/README.md
date: 2024-05-17
isOriginal: false
author:
  - name: Chris Coyier
    url : https://frontendmasters.com/blog/author/chriscoyier/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/2018
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

[[toc]]

---

<SiteInfo
  name="Exactly How to Deploy Local Files to Make a Live Website"
  desc="A very basic step-by-step guide of exactly how to do it for static files like .html, .css, and .js files. "
  url="https://frontendmasters.com/blog/exactly-how-to-deploy-local-files-to-make-a-live-website/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/2018"/>

This post addresses a common question we get from the community:

> What’s the simplest way to deploy a website so I can share it with other people?

Cutting to the chase:

1. Sign up for Netlify
2. Go to Drop
3. Drop the folder of files there
4. Done

I’ll walk you through all this below, I just wanted to be clear about what we’re doing. We’re trying to go from playing around with code on your local computer to deploying a real website! The requirements are that the process is straightforward (dare I say: “easy”) and the service has a free tier. The goal with this article is to give you direct steps, not confuse the issue with too many considerations and options.

Now let’s get into more detail.


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

You’ve got some files that make a website.

Maybe those files are:

```plaintext title="file structure"
index.html
style.css  
script.js
```

Or maybe they are like this:

```plaintext title="file structure"
images/
  logo.png  
  hero.png  
  background.jpg  
index.html  
about.html  
contact.html  
style.css
```

We’ll call them (and you might hear them being referred to as) “static files”. These files exist on *your computer*. Maybe you created them yourself or you exported a Pen from CodePen. You can look at them in a web browser and it *looks* like a website.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/05/Screenshot-2024-05-15-at-3.40.14%E2%80%AFPM.png?resize=1024%2C840&ssl=1)

The example website we’ll use here is the wonderful [Personal Portfolio Page from Tiffany Du (<VPIcon icon="fa-brands fa-codepen"/>`tiffanyadu`)](https://codepen.io/tiffanyadu/pen/QpdMmr). The `file://` URL above will work on my computer, but not yours!

Now you want it to be a *real* website on the *real* internet.

Good on ya. This is a **powerful** moment. Your creation is about to be viewable by anyone in the world. **Rather than complicate things with options, let’s look at _one_ option that will get the job done.** Then we’ll talk about where to go from there.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/05/live-website-1.jpg?resize=1024%2C683&ssl=1)

---

## 1) Sign up for Netlify

This is not an ad for Netlify. We have no affiliation. [<VPIcon icon="fas fa-globe"/>Sign up here.](https://app.netlify.com/signup)

There are other options, and we’ll cover those later. We’re picking a path forward and going for it. Truth be told, Netlify is a good host particularly for static files like this and has a generous free starter plan. You can grow with Netlify as they ultimately handle any amount of traffic and have lots of advanced features as you need them.

---

## 2) Find the Folder of Files on your Computer

The *folder* is key here. You want to be able to select the folder that contains that initial `index.html` file that is the home page of your site.

Here’s mine, just sitting on my Desktop.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/05/folder.png?resize=814%2C1024&ssl=1)

It could be anywhere on your computer, depending on where you created it or downloaded it. You just need to be able to find it for the next step. It doesn’t matter if you’re using macOS, Windows, or Linux, you’ll be able to find and select the folder somewhere.

If you’ve exported from CodePen…

You’ll get a `.zip` file that you can double-click to “extract” into a folder. Inside *that* folder you’ll see a <VPIcon icon="fas fa-folder-open"/>`dist` folder, <VPIcon icon="fas fa-folder-open"/>`src` folder, and some other files. **It’s the <VPIcon icon="fas fa-folder-open"/>`dist` folder that you’ll use for the next step here.**

---

## 3) Go to Netlify Drop

Be logged in to Netlify and go here: `https://app.netlify.com/drop`

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/05/Screenshot-2024-05-16-at-3.53.45%E2%80%AFPM.png?resize=1024%2C733&ssl=1)

You can use this Drop app while logged out, but the resulting site is password-protected and only stays online for 1 hour. Being logged in will remove those restrictions, and unlock more options you’re very likely to want afterward, like customizing the URL.

---

## 4) Drop the Folder into the Drop Zone

Just like this:

You can see in the video that as soon as you’ve dropped the folder, the site instantly deploys, and you’ll be given a URL where the site is live at. You’re essentially done at this point! You can also see in the video that I changed the URL that I was auto-assigned to something a bit more readable.

Congrats! You’ve got your website live. I hope it feels good. 😎

---

## Doing More

The URL you’re given from Netlify is customizable, but it’s still what is called a subdomain. In that quick video above, I customized it to:

```http
https://my-cool-porfolio.netlify.app
```

Where `my-cool-porfolio` is the customizable part. Subdomains are fine. I actually [<VPIcon icon="fas fa-globe"/>quite like them](https://chriscoyier.net/2023/09/21/use-subdomains/)… when they are *your* subdomain. It’s reasonable, and I’d argue a good idea, to have your own domain name. Something like:

```http
https://your-name.com
```

The dashboard area in Netlify will essentially walk you through this. Domain names are never free though, so this part will cost money on a yearly basis.

Remember there are lots of fun “top level domains” (TLDs) as well. That is, the `.com` part of `website.com`. I’d encourage you to have fun there. Get yourself a `.me`, `.dev`, or heck, there is even a `.portfolio` you could get. [<VPIcon icon="fas fa-globe"/>I use `.net`](https://chriscoyier.net/) myself.

---

## Alternatives

There are plenty of other hosting services that can do this job. All these listed here are fairly major players, are somewhat **designed around hosting a static file website**, and (mostly) have free tiers.

| Hosting Service | Advantages | Disadvantages |
| --- | --- | --- |
| [<VPIcon icon="fa-brands fa-cloudflare"/>Cloudflare](https://cloudflare.com/) | [<VPIcon icon="fa-brands fa-cloudflare"/>Cloudflare Pages](https://pages.cloudflare.com/) has a drag and drop deployment option and advanced features much like Netlify and Vercel. | Nothing major. Largely just as easy as Netlify and similar features. |
| [<VPIcon icon="iconfont icon-vercel"/>Vercel](https://vercel.com/chris-coyiers-projects) | Vercel is a very comparable service to Netlify. It is essentially designed for this. | Requires code be in a Git repository. |
| [<VPIcon icon="iconfont icon-github"/>GitHub](https://github.com/) | [<VPIcon icon="iconfont icon-github"/>GitHub Pages](https://pages.github.com/) is designed for this. If your code is on GitHub anyway, this can be a natural choice. Note that [<VPIcon icon="fa-brands fa-gitlab"/>GitLab also has pages](https://docs.gitlab.com/ee/user/project/pages/), as well as [<VPIcon icon="fa-brands fa-bitbucket"/>Bitbucket](https://support.atlassian.com/bitbucket-cloud/docs/publishing-a-website-on-bitbucket-cloud/). | You’ll need to use Git. Learning Git is a great idea, but for absolute beginners this might be too much. Using a custom domain is more difficult. No advanced features to grow into. |
| [<VPIcon icon="fa-brands fa-aws"/>AWS](https://aws.amazon.com/) | [<VPIcon icon="fa-brands fa-aws"/>AWS Amplify](https://aws.amazon.com/amplify/) is designed to be the easy version of using AWS tools, and focuses on deploying sites. They offer a similar drag-and-drop deployment ([<VPIcon icon="fas fa-globe"/>screenshot](https://share.cleanshot.com/wRBlnl3h)). | Getting set up with an AWS account and generally navigating AWS at all nobody would call easy. |
| [<VPIcon icon="iconfont icon-firebase"/>Google Firebase](https://firebase.google.com/) | [<VPIcon icon="iconfont icon-firebase"/>Firebase Hosting](https://firebase.google.com/products/hosting) is largely in the same bucket as all of the above. | Requires CLI. People don’t generally use Firebase *just* for static hosting. It’s more commonly used for their realtime database features. |
| [<VPIcon icon="iconfont icon-microsoftazure"/>Microsoft Azure](https://azure.microsoft.com/en-us/free/search/?OCID=AIDcmmfq865whp_SEM__k_EAIaIQobChMItIzI8M-ThgMVm9XCBB169QIkEAAYASAAEgJnNPD_BwE_k_) | [<VPIcon icon="iconfont icon-microsoftazure"/>Azure Static Web Apps](https://azure.microsoft.com/en-us/products/app-service/static) is Microsoft’s product in the category that is largely in the same bucket as all of the above. | Just feels a little jankier than many others to me, although if you use other Azure products perhaps it feels more at home. Requires code to be in Git. |
| [<VPIcon icon="fas fa-globe"/>Render](https://render.com/) | [<VPIcon icon="fas fa-globe"/>Render Static Sites](https://docs.render.com/static-sites) is largely in the same bucket as all of the above. Hosts lots of other types of sites as well, so you could potentially have a single host for different types of sites. | Requires code be in a Git repository. |
| [<VPIcon icon="fas fa-globe"/>Kinsta](https://kinsta.com/) | [<VPIcon icon="fas fa-globe"/>Kinsta Static Site Hosting](https://kinsta.com/static-site-hosting/) is largely in the same bucket as all of the above. Hosts lots of other types of sites as well, so you could potentially have a single host for different types of sites. | Requires code be in a Git repository. |
| [<VPIcon icon="fas fa-globe"/>Surge](https://surge.sh/) | An early no-frills classic in this space. | Requires CLI. Feels abandoned. |
| [<VPIcon icon="fas fa-globe"/>Forge](https://getforge.com/pricing) |  | Looks like there is only a free trial, no free tier. But I literally couldn’t sign up to check it out, it felt entirely broken. |
| [<VPIcon icon="fas fa-globe"/>Static.app](https://static.app/pricing) | [<VPIcon icon="fas fa-youtube"/>Looks](https://youtu.be/1siRN0amOx4) like a pretty nice option! Drag and drop uploading. Very streamlined interface. | Only free trial, no free tier |
| [<VPIcon icon="fas fa-globe"/>Tiiny Host](https://tiiny.host/free-static-website-hosting/) | Also looks like a pretty nice option. Drag and drop uploading. Very streamlined interface. | I’ve seen a bunch of spam hosted on these URLs which makes me nervous. |

Let us know what you’ve used or tried!

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

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Exactly How to Deploy Local Files to Make a Live Website",
  "desc": "A very basic step-by-step guide of exactly how to do it for static files like .html, .css, and .js files. ",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/exactly-how-to-deploy-local-files-to-make-a-live-website.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
