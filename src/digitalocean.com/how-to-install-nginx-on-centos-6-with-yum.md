---
lang: en-US
title: "How To Install nginx on CentOS 6 with yum"
description: "Article(s) > How To Install nginx on CentOS 6 with yum"
icon: fa-brands fa-centos
category: 
  - Linux
  - Fedora
  - CentOS
  - NGINX
  - Article(s)
tag:
  - blog
  - digitalocean.com
  - linux
  - fedora
  - centos
  - nginx
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How To Install nginx on CentOS 6 with yum"
    - property: og:description
      content: "How To Install nginx on CentOS 6 with yum"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/digitalocean.com/how-to-install-nginx-on-centos-6-with-yum.html
prev: /devops/linux-fedora/articles/README.md
date: 2012-05-22
isOriginal: false
author: Etel Sverdlov
cover: https://community-cdn-digitalocean-com.global.ssl.fastly.net/Ad4WRH3PXeWsdTApnbe1v4vB
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Linux - Fedroa >  > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/linux-fedora/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "NGINX >  > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/nginx/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How To Install nginx on CentOS 6 with yum"
  desc="This articles covers how to install nginx, a web server, on a CentOS virtual server. This can be done with the Centos package installer, yum. "
  url="https://digitalocean.com/how-to-install-nginx-on-centos-6-with-yum"
  logo="https://digitalocean.com/_next/static/media/favicon.594d6067.ico"
  preview="https://community-cdn-digitalocean-com.global.ssl.fastly.net/Ad4WRH3PXeWsdTApnbe1v4vB"/>

---

::: critical Status: Deprecated

This article covers a version of CentOS that is no longer supported. If you are currently operating a server running CentOS 6, we highly recommend upgrading or migrating to a supported version of CentOS.

**Reason:**

[<FontIcon icon="fa-brands fa-centos"/>CentOS 6 reached end of life (EOL) on November 30th, 2020](https://wiki.centos.org/About/Product) and no longer receives security patches or updates. For this reason, this guide is no longer maintained.

**See Instead:**

This guide might still be useful as a reference, but may not work on other CentOS releases. If available, we strongly recommend using a guide written for the version of CentOS you are using.

:::

The following DigitalOcean tutorial may be of immediate interest, as it outlines installing Nginx on a CentOS 7 server:  

- [How To Install Nginx on CentOS 7](/digitalocean.com/how-to-install-nginx-on-centos-7.md)

::: info About Nginx

nginx is a high performance web server software. It is a much more flexible and lightweight program than apache.

:::

---

## Set Up

The steps in this tutorial require the user to have root privileges. You can see how to set that up in the [CentOS Initial Server Setup Tutorial](/digitalocean.com/initial-server-setup-with-centos-6.md) in steps 3 and 4.

---

## Step One—Install EPEL

EPEL stands for Extra Packages for Enterprise Linux. Because yum as a package manager does not include the latest version of nginx in its default repository, installing EPEL will make sure that nginx on CentOS stays up to date.

To install EPEL, open terminal and type in:

```sh
sudo yum install epel-release
```

---

## Step Two—Install nginx

To install nginx, open terminal and type in:

```sh
sudo yum install nginx
```

After you answer yes to the prompt twice (the first time relates to importing the EPEL gpg-key), nginx will finish installing on your virtual private server.

---

## Step Three—Start nginx

nginx does not start on its own. To get nginx running, type:

```sh
sudo /etc/init.d/nginx start
```

You can confirm that nginx has installed on your VPS by directing your browser to your IP address.

You can run the following command to reveal your server’s IP address.

```sh
ifconfig eth0 | grep inet | awk '{ print $2 }'
```

On the page, you will see the words, “Welcome to nginx”

Congratulations! You have now installed nginx.

---

## See More

Once you have nginx installed on your cloud server, you can go on to [install the Lemp Stack](/digitalocean.com/how-to-install-linux-nginx-mysql-php-lemp-stack-on-centos-6.md) or [Set Up a FTP Server](/digitalocean.com/how-to-set-up-vsftpd-on-centos-6--2.md)

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How To Install nginx on CentOS 6 with yum",
  "desc": "This articles covers how to install nginx, a web server, on a CentOS virtual server. This can be done with the Centos package installer, yum.",
  "link": "https://chanhi2000.github.io/bookshelf/digitalocean.com/how-to-install-nginx-on-centos-6-with-yum.html",
  "logo": "https://digitalocean.com/_next/static/media/favicon.594d6067.ico",
  "background": "rgba(44,103,246,0.2)"
}
```
