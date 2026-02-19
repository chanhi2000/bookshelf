---
lang: en-US
title: "Hosting on Heroku with a Custom Domain and SSL"
description: "Article(s) > Hosting on Heroku with a Custom Domain and SSL"
icon: iconfont icon-heroku
category:
  - DevOps
  - Heroku
  - Article(s)
tag:
  - blog
  - typescript.tv
  - devops
  - heroku
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Hosting on Heroku with a Custom Domain and SSL"
    - property: og:description
      content: "Hosting on Heroku with a Custom Domain and SSL"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/hosting-on-heroku-with-a-custom-domain-and-ssl.html
prev: /devops/heroku/articles/README.md
date: 2024-09-25
isOriginal: false
author:
  - name: Benny Neugebauer
    url: https://stackoverflow.com/users/451634/benny-neugebauer
cover: https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Heroku > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/heroku/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Hosting on Heroku with a Custom Domain and SSL"
  desc="Learn how to host a TypeScript project on Heroku with a custom domain and SSL. Add your domain to Heroku, configure nameservers, set up A records, and add an SSL certificate using ACM for secure access."
  url="https://typescript.tv/hands-on/hosting-on-heroku-with-a-custom-domain-and-ssl"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp"/>

Learn how to host a TypeScript project on Heroku with a custom domain and SSL. Add your domain to Heroku, configure nameservers, set up A records, and add an SSL certificate using ACM for secure access.

I recently hosted a TypeScript project on Heroku, using a custom domain with SSL. I registered the domain through a different provider and used a Heroku Web Dyno for hosting. In this tutorial, I'll guide you through configuring your custom domain's nameservers to work with Heroku and setting up SSL for secure access.

::: info TL;DR

1. Add the domain to Heroku in your app settings
2. Resolve the "DNS Target" from Heroku to an IP address
3. Add the resolved IP address as an "A record" for your root domain in your DNS
4. Remove any other A records (for subdomains) from your DNS
5. Add an SSL certificate using "ACM" in Heroku

:::

---

## Add a Custom Domain on Heroku

The first step is to add your custom domain to Heroku:

1. Navigate to your Heroku app settings.
2. Under the "Domains" section, click "Add Domain".
3. Enter your domain name without any subdomain (e.g., welovecoding.com).
4. After adding the domain, Heroku will provide you with a "DNS Target," which is a Heroku DNS address like something-cryptic.herokudns.com.
5. This "DNS Target" needs to be added to your DNS provider as either a CNAME or ALIAS record.

---

## Add Nameserver Records

To point your custom domain to Heroku’s servers, you’ll need to configure the nameserver settings in your DNS provider.

There are two important records to configure: A (Address) records and CNAME (Canonical Name) records.

An **A record** maps a domain name to a specific IP address (IPv4 or IPv6). It is used for root domains (e.g., welovecoding.com) and must resolve to a concrete IP address.

A **CNAME record** maps one domain name to another. It is used for subdomains (e.g., [<VPIcon icon="fas fa-globe"/>welovecoding.com](https://welovecoding.com)) but cannot be applied to root domains.

Since I wanted to link my root domain to Heroku, I needed to create an A record. Heroku provides a "DNS Target," but it doesn’t give you a direct IP address. To get the IP address, I ran a simple terminal command:

```sh
ping something-cryptic.herokudns.com
```

This command returned the IP address of Heroku’s server, which I then used to create the A record in my DNS provider's settings, pointing my root domain to that IP address.

---

## Add an SSL Certificate

To ensure secure access to your website using HTTPS, you’ll need an SSL certificate. Heroku makes it easy to manage SSL certificates with their **Automatic Certificate Management (ACM)**.

It can be set up this way:

1. Navigate to your Heroku app settings.
2. Under the "SSL Certificates" section, click "Configure SSL".
3. Select "Automatic Certificate Management (ACM)".

ACM will automatically issue and manage your SSL certificate, eliminating the need for manual renewals or updates. However, note that ACM does not support wildcard subdomains. Therefore, I had to remove any wildcard entries, such as \*.welovecoding.com, from my DNS settings.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Hosting on Heroku with a Custom Domain and SSL",
  "desc": "Learn how to host a TypeScript project on Heroku with a custom domain and SSL. Add your domain to Heroku, configure nameservers, set up A records, and add an SSL certificate using ACM for secure access.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/hosting-on-heroku-with-a-custom-domain-and-ssl.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
