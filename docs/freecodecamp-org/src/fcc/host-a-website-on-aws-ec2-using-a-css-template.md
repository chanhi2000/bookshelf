---
lang: en-US
title: "How to Host a Website on AWS EC2 Using a CSS Template"
description: "Article(s) > How to Host a Website on AWS EC2 Using a CSS Template"
icon: fa-brands fa-aws
category:
  - DevOps
  - AWS
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - aws
  - amazon-web-services
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Host a Website on AWS EC2 Using a CSS Template"
    - property: og:description
      content: "How to Host a Website on AWS EC2 Using a CSS Template"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/host-a-website-on-aws-ec2-using-a-css-template.html
prev: /devops/aws/articles/README.md
date: 2024-11-09
isOriginal: false
author: Kedar Makode
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1731103973241/e1277a4c-3456-4f11-b809-24caf56ae13a.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "AWS > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/aws/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Host a Website on AWS EC2 Using a CSS Template"
  desc="Are you ready to take your web hosting skills to the next level by using a CSS template? Hosting a professional looking website doesn’t have to be complicated, and with AWS EC2, you can have your website live in no time! In this guide, I’ll show you ..."
  url="https://freecodecamp.org/news/host-a-website-on-aws-ec2-using-a-css-template"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1731103973241/e1277a4c-3456-4f11-b809-24caf56ae13a.png"/>

Are you ready to take your web hosting skills to the next level by using a CSS template? Hosting a professional looking website doesn’t have to be complicated, and with AWS EC2, you can have your website live in no time!

In this guide, I’ll show you how to host a website using a pre-designed template from [<VPIcon icon="fas fa-globe"/>**CSS templates**](https://free-css.com/free-css-templates) directly on your EC2 instance.

Before we dive into this guide, make sure you’ve gone through my [previous blog](/freecodecamp.org/how-to-launch-an-ec2-instance-and-a-web-server-using-httpd.md) on how to launch and connect to an EC2 instance. If you haven’t set up an EC2 instance yet, head over to that post first to get your instance up and running. Once that’s done, you’re all set to proceed!

---

## Step 1: Download the "Built Better" Template

For this tutorial, we’ll use the Built Better template, which is free and easy to set up.

Head over to [<VPIcon icon="fas fa-globe"/>this link](https://free-css.com/free-css-templates/page284/built-better) and download the template.

Right-click on the download button and select "Copy clean link". We’ll use this link to download the template directly into your EC2 instance.

---

## Step 2: Download the Template Directly to Your EC2 Instance

Now that you have the link to the template, let’s download it straight to your EC2 instance using `wget`.

Log in to your EC2 instance via SSH or MobaXterm (as covered in my [previous blog](/freecodecamp.org/connect-to-your-ec2-instance-using-mobaxterm.md)) and navigate to the <VPIcon icon="fas fa-folder-open"/>`/var/www/html` directory where your website files will be stored:

```sh
cd /var/www/html
```

Use the `wget` command followed by the copied link to download the "Built Better" template directly into your EC2 instance:

```sh
sudo wget https://www.free-css.com/assets/files/free-css-templates/download/page284/built-better.zip
```

::: note

After downloading, it's a good idea to check the file name to ensure it matches the file used in the subsequent commands. You can do this by running the `ls` command:

```sh
ls
```

:::

---

## Step 3: Unzip the Template Files

Now that the template has been downloaded, it’s time to extract it. Install the `unzip` utility if it’s not already installed:

```sh
sudo dnf install unzip -y
```

Then unzip the template:

```sh
sudo unzip built-better.zip -d /var/www/html/
```

After unzipping, make sure to check the folder name where the files were extracted from. You can do this by listing the contents of the <VPIcon icon="fas fa-folder-open"/>`/var/www/html` directory:

```sh
ls /var/www/html/
```

In this case, the unzipped contents are located inside a folder named <VPIcon icon="fas fa-folder-open"/>`html`. This folder contains all the template files. If the folder name is different in your case, adjust the following steps accordingly.

First, move the files from the <VPIcon icon="fas fa-folder-open"/>`html` folder to the root <VPIcon icon="fas fa-folder-open"/>`/var/www/html/` directory:

```sh
sudo mv /var/www/html/html/* /var/www/html/
```

Then remove the unnecessary folder:

```sh
sudo rm -r /var/www/html/html
```

Lastly, remove the ZIP file:

```sh
sudo rm built-better.zip
```

---

## Step 4: Set Up the Web Server to Host Your Template

If you haven’t already, make sure your Apache HTTPD web server is installed and running. You can follow these steps to ensure your server is ready:

Install Apache (if not installed):

```sh
sudo yum install httpd -y
```

Start the Apache service:

```sh
sudo systemctl start httpd
```

Enable Apache to start on boot:

```sh
sudo systemctl enable httpd
```

Now your web server should be up and running, ready to serve your template.

---

## Step 5: Test Your Website

Now for the exciting part seeing your site live! Open a browser and navigate to your EC2 instance’s public IP address. You should now see the Built Better template live and ready to go.

Here’s how to check:

- Find your EC2 instance’s public IP from the AWS EC2 dashboard.
- Enter the IP in your browser, like so: `http://your-ec2-public-ip`
- Your website should now be live with the Built Better template! 🎉

---

## Wrapping Up

Congratulations! You’ve successfully hosted a professional-looking website using the Built Better CSS template on your EC2 instance.

With just a few steps, you’ve moved from launching an EC2 instance to hosting a fully styled website, all using the AWS powerful cloud infrastructure.

You can follow me on

- [X (<VPIcon icon="fa-brands fa-x-twitter"/>`Kedar__98`)](https://x.com/Kedar__98)
- [LinkedIn (<VPIcon icon="fa-brands fa-linkedin"/>`kedar-makode-9833321ab`)](https://linkedin.com/in/kedar-makode-9833321ab/)

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Host a Website on AWS EC2 Using a CSS Template",
  "desc": "Are you ready to take your web hosting skills to the next level by using a CSS template? Hosting a professional looking website doesn’t have to be complicated, and with AWS EC2, you can have your website live in no time! In this guide, I’ll show you ...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/host-a-website-on-aws-ec2-using-a-css-template.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
