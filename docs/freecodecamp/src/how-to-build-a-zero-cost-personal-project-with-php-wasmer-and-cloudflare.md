---
lang: en-US
title: "How to Build a Zero-Cost Personal Project with PHP, Wasmer, and Cloudflare"
description: "Article(s) > How to Build a Zero-Cost Personal Project with PHP, Wasmer, and Cloudflare"
icon: fa-brands fa-php
category:
  - PHP
  - DevOps
  - Cloudflare
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - php
  - devops
  - cloudflare
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build a Zero-Cost Personal Project with PHP, Wasmer, and Cloudflare"
    - property: og:description
      content: "How to Build a Zero-Cost Personal Project with PHP, Wasmer, and Cloudflare"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-zero-cost-personal-project-with-php-wasmer-and-cloudflare.html
prev: /programming/php/articles/README.md
date: 2026-07-02
isOriginal: false
author:
  - name: Jakub T. Jankiewicz
    url: https://freecodecamp.org/news/author/jcubic/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/ac7d0b26-c611-4454-847e-cf69d28a04f8.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "PHP > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/php/articles/README.md",
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

[[toc]]

---

<SiteInfo
  name="How to Build a Zero-Cost Personal Project with PHP, Wasmer, and Cloudflare"
  desc="Recently, I wanted to reinvigorate my open-source project Clarity, an icon theme for Linux (GTK+). The icons allow users to create custom colors by adding SVG templates. And I wanted to have a platfor"
  url="https://freecodecamp.org/news/how-to-build-a-zero-cost-personal-project-with-php-wasmer-and-cloudflare"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/ac7d0b26-c611-4454-847e-cf69d28a04f8.png"/>

Recently, I wanted to reinvigorate my open-source project Clarity, an icon theme for Linux (GTK+).

The icons allow users to create custom colors by adding SVG templates. And I wanted to have a platform where users would be able to submit their own custom templates for the icons.

The problem is that if I create a new website for my project that requires recurring payment, and I'm no longer alive, the website will disappear. So to keep it going in perpetuity, I needed a **free domain** and **free hosting**. I decided to use PHP for this new project.

In this article, I'll show you step by step how to:

- Get a free .eu.org domain.
- Set up name servers on Cloudflare.
- Set up hosting on [<VPIcon icon="fas fa-globe"/>Wasmer](https://wasmer.io/?utm_source=freecodecamp&utm_medium=article&utm_campaign=jcubic).
- Glue everything together.

::: note Requirements

For this article, I assume that you already have a GitHub account and know how to create Git repositories. You should also have a Cloudflare account. The code uses PHP, but you don't need to know it to go through this tutorial. Wasmer supports other languages and frameworks that you can use instead if you like.

:::

---

## About Wasmer

First, let me explain how hosting works with Wasmer. You may have had problems with hosting tools that take too long to wake up your project when it hasn't been used for a while. Well, you'll be happy to learn that in Wasmer, a cold start takes less than 90 milliseconds.

Applications on Wasmer are stateless, so if you want to keep user data, you'll need a persistent store. It natively supports cloud MySQL instances and network protocols for external PostgreSQL and MySQL/MariaDB, as well as file-based SQLite through persistent volumes.

Wasmer also supports Python, Rust, PHP, and Node.js, and it plans to support GoLang soon, too.

You can host applications in Django, Flask, FastAPI, WordPress, Symfony, Laravel, Next.js, Nuxt, Hugo, Astro, Vite, and others as well, so you have lots of options.

The platform also supports [<VPIcon icon="fa-brands fa-wikipedia-w"/>CGI](https://en.wikipedia.org/wiki/Common_Gateway_Interface), which allows you to use any language that compiles to a binary executable like Rust, C, or C++.

---

## What is DNS?

Now is a good time to explain what DNS is. DNS stands for Domain Name System, and it's a way to translate human-readable names like freecodecamp.org to the IP address of a server where the website or web app is located.

In short, the system works like a tree of servers. At the root there's the Root Server, which directs your request to the TLD (Top-Level Domain) Server responsible for `.org` extensions.

This TLD server points to the specific Authoritative Name Server of the domain. A Name Server is a specialized server that acts as a storage folder for a domain's official DNS records, telling the internet exactly where to find the website's assets.

Inside these records, you'll find different types of pointers. One common type is the CNAME record (Canonical Name). Instead of pointing a domain directly to an IP address, a CNAME record acts as an alias that maps one domain name to another domain name. For example, it can forward `www.freecodecamp.org` to the root `freecodecamp.org`.

---

## How to Create a Wasmer Account

Let's jump in and create a Wasmer account so we can get started. To do this, you need to go to [<VPIcon icon="fas fa-globe"/>wasmer.io](https://wasmer.io/) and pick the Hobby plan:

![Wasmer sign up page that allows you to pick Hobby or Pro plan](https://cdn.hashnode.com/uploads/covers/60fdacd518fbbb77c946882e/6a00593d-5e5a-41d2-bc82-c3b061f22ff8.png)

Then create an account:

![A Screenshot of a Wasmer page were you create your account. It has username, email, password form and allows you to use Google/GitHub to create your account.](https://cdn.hashnode.com/uploads/covers/60fdacd518fbbb77c946882e/8299cdf3-57be-4424-a68d-a07c08cbde68.png)

The simplest way forward is to connect to your GitHub:

![The screenshot that shows a popup to authorise Wasmer page when you use GitHub as you authentication](https://cdn.hashnode.com/uploads/covers/60fdacd518fbbb77c946882e/26a3a344-011b-4a37-8d22-275ac6c02f6f.png)

After you authorize via GitHub, you should be logged in and see your avatar in the top right corner:

![Wasmer screenshot showing an avatar and a menu that shows signed in as jcubic with links to your profile, settings, join discord, and sign out.](https://cdn.hashnode.com/uploads/covers/60fdacd518fbbb77c946882e/67abeb45-ca0b-44d7-a5e3-1eefecdcae5b.png)

---

## How to Create a Wasmer PHP Project

First, you need to create a new GitHub repository for your PHP project. For this tutorial, I created one with a simple <VPIcon icon="fa-brands fa-php"/>`index.php` file that shows my new domain name (I'll show you how to register the domain name in a bit).

```php title="index.php"
<?php

header("Content-Type: text/plain");
echo "clarity-icons.eu.org";

?>
```

After you commit the file, this is how your repo should look on GitHub:

![A screenshot of the GitHub repo with a single <VPIcon icon="fa-brands fa-php"/>`index.php` file and no README](https://cdn.hashnode.com/uploads/covers/60fdacd518fbbb77c946882e/e50b9e14-5f2f-427c-b868-217155ec8871.png)

[This was my repository (<VPIcon icon="iconfont icon-github"/>`jcubic/Clarity-icons`)](https://github.com/jcubic/Clarity-icons). But then I decided to add the website as part of my [main repo (<VPIcon icon="iconfont icon-github"/>`jcubic/Clarity`)](https://github.com/jcubic/Clarity).

After you create a GitHub account, you have to tell Wasmer about it. To do this, you need to add a Wasmer GitHub account. Create a new project and click "Add GitHub Account":

![A screenshot of a page in Wasmer that shows at the top two cards one to import from GitHub and one to drag & drop your site. At the bottom are list of Templates: Wordpress Starter, Flask Starter, Hugo Starter, Gatsby Starter](https://cdn.hashnode.com/uploads/covers/60fdacd518fbbb77c946882e/49e2e192-2b20-4a5f-baba-c68aa61acdc2.png)

You should see a popup where you can select the account where you want to install the Wasmer app. If you're not part of any organization on GitHub, you should see only your own GitHub profile. Select that one.

![A screenshot of a modal that allows you to install Wasmer app into your account or organization](https://cdn.hashnode.com/uploads/covers/60fdacd518fbbb77c946882e/18a96d88-d473-4aae-b9cc-0e39c4c81737.png)

It should redirect you to GitHub, where you can either provide access to all repositories or pick the one you want. I usually just give access to specific repositories. So I've selected my new repo here:

![A screenshot of a page that allows Wasmer app to give projects. The option to select all repositories is unselected and instead a single repo jcubic/clarity-icons is. There is a button labeled Install and Authorize.](https://cdn.hashnode.com/uploads/covers/60fdacd518fbbb77c946882e/330e4072-3b9b-42d5-96b6-fac681f1074f.png)

After you set up permissions, you'll need to import the app into Wasmer:

![A screnshot with a card that says Import from GitHub that has a dropdown with GitHub icon and jcubic name. Below there is a repository called clarity-icons and a button labeled Import](https://cdn.hashnode.com/uploads/covers/60fdacd518fbbb77c946882e/93267bbb-0321-4335-a9aa-2f4e491d2724.png)

After you click import, you can set up some details about your project like the owner, project link, and so on:

![A screesnhot of the page where you can configure the project.  It shows the project link (clarity-icons.wasmer.app), project preset with selected PHP and version 8.3](https://cdn.hashnode.com/uploads/covers/60fdacd518fbbb77c946882e/3d5be9b9-8fbd-4f7f-8b4a-88044b2b064d.png)

After you click "Deploy", you'll need to wait awhile for deployment to happen:

![A screenshot of page that says Configure Project completed and shows a deployment progress indicator](https://cdn.hashnode.com/uploads/covers/60fdacd518fbbb77c946882e/961a7494-e05a-4691-bae8-e5bef94ec206.png)

When it finishes, you should see this celebration page with confettii:

![Deployment congratulations page with confetti](https://cdn.hashnode.com/uploads/covers/60fdacd518fbbb77c946882e/0bd084d2-66e4-4dc2-9789-473efbd58383.png)

When you go to the dashboard, you should see that the app is running:

![Main Wasmer project dashboard for clarity-icons project with status ready and screenshot of the website](https://cdn.hashnode.com/uploads/covers/60fdacd518fbbb77c946882e/2b2ffdfb-7239-49ee-8166-ea228ff6c680.png)

This is how the website looks live:

![A screenshot of the browser windows that shows URL clarity-icons.wasmer.app. The page shows text: clarity-icons.eu.org](https://cdn.hashnode.com/uploads/covers/60fdacd518fbbb77c946882e/1987b13c-cd8f-4ccb-936d-89c5fc284084.png)

In the settings, you can see how to add a custom domain (that we'll set up in a minute).

![A screenshot of DNS configuration for the clarity-icons project. IT shows CNAME record that you need to add to enable a custom domain.](https://cdn.hashnode.com/uploads/covers/60fdacd518fbbb77c946882e/5a7f5775-c9b9-49be-987b-276916104cee.png)

It shows the CNAME DNS record that you need to include in order for the custom domain to work properly.

---

## How to Set Up Cloudflare

Next, we'll set up Cloudflare, which allows you to manage DNS. We'll keep our new domain there.

After you create a Cloudflare account, you'll need to go into the domain overview section:

![A screenshot of the page where you can add a new domain](https://cdn.hashnode.com/uploads/covers/60fdacd518fbbb77c946882e/b9962ff0-9d7d-4b46-be40-67c2eec85797.png)

Click "Add domain" and pick "Connect a domain":

![A screenshot of a page with a list of options: Connect a domain, Transfer a domain, and Buy a domain](https://cdn.hashnode.com/uploads/covers/60fdacd518fbbb77c946882e/0feaf033-a185-41ae-998a-5bdf4c5f77f4.png)

Then you need to name your domain:

![a form to connect your domain with one input box that has domain name "clarity-icons.eu.org"](https://cdn.hashnode.com/uploads/covers/60fdacd518fbbb77c946882e/176d8c85-b85d-4969-b7cf-ab1cd7220a90.png)

Then pick the Free plan:

![Option to pick one of the 4 plans, the first on the left is Free $0](https://cdn.hashnode.com/uploads/covers/60fdacd518fbbb77c946882e/aad724cf-f59f-48c7-8071-cc3106aaf77f.png)

After you create your domain (you'll need to wait a few seconds), you can set up DNS records (we already have the CNAME from Wasmer).

![A screenshot of page to configure DNS without any record](https://cdn.hashnode.com/uploads/covers/60fdacd518fbbb77c946882e/82d6fcda-ab5e-477e-b09b-e8a379a7050f.png)

Add a new CNAME record from Wasmer:

![A screenshot of a page for domain clarity-icons.eu.org with one DNS CNAME record that has the name clarity-icons and ID from Wasmer](https://cdn.hashnode.com/uploads/covers/60fdacd518fbbb77c946882e/f4c9c419-cf3e-4667-adf9-14c22917978e.png)

After you click "Continue activation" you should see this page with two nameservers:

![A screenshot of the page that shows how to add Cloudflare name servers](https://cdn.hashnode.com/uploads/covers/60fdacd518fbbb77c946882e/18874ad2-3136-46ef-8a26-b763ab3b2ff0.png)

We'll use those two domain names when we register the eu.org domain.

---

## How to Register an eu.org Domain

To create a .eu.org domain, you first have to create an account. For this, you'll need to visit [<VPIcon icon="fas fa-globe"/>nic.eu.org/arf/en/contact/create/](https://nic.eu.org/arf/en/contact/create/) and fill in the details, like your address and a phone number. That type of information is required for any domain you register.

![A screenshot of a simple form that has user details: username, email, password, address, phone number and a button labeled create](https://cdn.hashnode.com/uploads/covers/60fdacd518fbbb77c946882e/dc97078f-fa42-4c9f-893b-db08a5f9504b.png)

In the above screenshot, I've added "Fax" instead of "Phone". I corrected that later. You can always edit the information if you make a mistake.

After you click create, you should see this page showing that you successfully created your contact page:

![A pages that says: Contact sucessfully create as JTJ18-FREE. Please check instructions sent t o jcubic@jcubic.pl to validate it.](https://cdn.hashnode.com/uploads/covers/60fdacd518fbbb77c946882e/99b74695-4902-488c-9d0c-4078cd654deb.png)

After you validate your email (click the activation link), you should see this page stating that your contact handle is now valid:

![A page with text "Your contact handle is now valid"](https://cdn.hashnode.com/uploads/covers/60fdacd518fbbb77c946882e/d4c25b8b-af6c-4d41-b8eb-ae4012303766.png)

After you log in, you'll see a form where you can add domains:

![Authenticated page for JTJ18-FREE user account, with a button to add a new domain.](https://cdn.hashnode.com/uploads/covers/60fdacd518fbbb77c946882e/2a413835-2d7c-4657-8e0e-10f0a456a7ea.png)

Then just click and select a domain name.

I initially picked the clarity-icons.eu.org domain, but on the page [<VPIcon icon="fas fa-globe"/>nic.eu.org/opendomains.html](https://nic.eu.org/opendomains.html), they don't recommend using a .eu.org directly. Instead, they recommend picking one of the subdomains (an additional prefix name with a dot). I've picked .pl.eu.org since I'm from Poland.

![A screenshot of a form to add a new domain with user information](https://cdn.hashnode.com/uploads/covers/60fdacd518fbbb77c946882e/88b2f036-5374-47cb-a408-521ccd42253e.png)

The process of creating a .eu.org can take a few days. I registered an account on the 1st of June and got the below email on the 6th of June. So a week is a safe bet.

![Email confirmation that says that the clarity.pl.eu.org was created with details about domain and text: "Please allow about half a day for propagation"](https://cdn.hashnode.com/uploads/covers/60fdacd518fbbb77c946882e/f89b6cc1-34ea-4d91-b8ea-6f600cb194a4.png)

The domain appeared after about 24 hours.

I've checked the next day, and my domain, [<VPIcon icon="fas fa-globe"/>clarity.pl.eu.org](https://clarity.pl.eu.org/) was up.

---

## Conclusion

Creating a sustainable website for your open-source project that will remain long after you're gone is possible. This type of setup is also great for small personal projects.

If you have any questions, you can contact me on [Twitter/X (<VPIcon icon="fa-brands fa-x-twitter"/>`jcubic`)](https://x.com/jcubic), my DMs are open. You can also check out my [<VPIcon icon="fas fa-globe"/>personal blog](https://jakub.jankiewicz.org/blog/).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build a Zero-Cost Personal Project with PHP, Wasmer, and Cloudflare",
  "desc": "Recently, I wanted to reinvigorate my open-source project Clarity, an icon theme for Linux (GTK+). The icons allow users to create custom colors by adding SVG templates. And I wanted to have a platfor",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-zero-cost-personal-project-with-php-wasmer-and-cloudflare.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
