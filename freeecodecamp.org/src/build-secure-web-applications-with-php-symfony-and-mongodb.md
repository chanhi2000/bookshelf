---
lang: en-US
title: "Build Secure Web Applications with PHP, Symfony, and MongoDB"
description: "Article(s) > Build Secure Web Applications with PHP, Symfony, and MongoDB"
icon: iconfont icon-symphony
category:
  - PHP
  - Symphony
  - Data Science
  - MongoDB
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - php
  - symphony
  - php-symphony
  - data-science
  - mongodb
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Build Secure Web Applications with PHP, Symfony, and MongoDB"
    - property: og:description
      content: "Build Secure Web Applications with PHP, Symfony, and MongoDB"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-secure-web-applications-with-php-symfony-and-mongodb.html
prev: /programming/php-symphony/articles/README.md
date: 2025-09-11
isOriginal: false
author:
  - name: Beau Carnes
    url : https://freecodecamp.org/news/author/beaucarnes/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1757573041841/0bbcb80c-76b9-4792-be3b-fba79ea344b1.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Symphony > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/php-symphony/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "MongoDB > Article(s)",
  "desc": "Article(s)",
  "link": "/data-science/mongodb/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Build Secure Web Applications with PHP, Symfony, and MongoDB"
  desc="Data breaches are a constant threat, and traditional encryption practices often aren't enough to protect sensitive information throughout its entire lifecycle. We just posted a course on the freeCodeCamp.org YouTube channel that will teach you how to..."
  url="https://freecodecamp.org/news/build-secure-web-applications-with-php-symfony-and-mongodb"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1757573041841/0bbcb80c-76b9-4792-be3b-fba79ea344b1.png"/>

Data breaches are a constant threat, and traditional encryption practices often aren't enough to protect sensitive information throughout its entire lifecycle.

We just posted a course on the freeCodeCamp.org YouTube channel that will teach you how to build applications that are truly secure from the ground up using PHP, Symfony, and MongoDB.

I developed this course. I will teach you how to build a system where data is protected not just at rest and in transit, but also while it's in use.

Throughout this comprehensive, step-by-step tutorial, you will build a fully functional personal finance application. The application will allow users to create accounts, log transactions, and view their financial information.

The core of this course focuses on solving a major challenge in application security which is how to perform queries on encrypted data. You'll learn how to find a user by their social security number or search for transactions within a specific amount range, all without ever decrypting the information on the database server.

I use MongoDB's Queryable Encryption to encrypt sensitive data on the client-side. This data is then stored as fully randomized encrypted fields in the database, yet you can still run equality and range-check queries on it. The server never has access to the unencrypted data or the encryption keys, keeping the data secure throughout its entire life cycle.

This tutorial is designed for developers who have some experience with PHP and a framework like Symfony or Laravel, but even if you're new to these technologies, you should be able to follow along.

Watch the full course now [<VPIcon icon="fa-brands fa-youtube"/>on the freeCodeCamp.org YouTube channel](https://youtu.be/UuknxVdqzb4) (1-hour watch).

<VidStack src="youtube/UuknxVdqzb4" />

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Build Secure Web Applications with PHP, Symfony, and MongoDB",
  "desc": "Data breaches are a constant threat, and traditional encryption practices often aren't enough to protect sensitive information throughout its entire lifecycle. We just posted a course on the freeCodeCamp.org YouTube channel that will teach you how to...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-secure-web-applications-with-php-symfony-and-mongodb.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
