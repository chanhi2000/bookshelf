---
lang: en-US
title: "Tools You Can Use for Open Source Intelligence (OSINT) Gathering"
description: "Article(s) > Tools You Can Use for Open Source Intelligence (OSINT) Gathering"
icon: fas fa-shield-halved
category:
  - Security
  - Python
  - Shell
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - security
  - sec
  - python
  - py
  - shell
  - sh
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Tools You Can Use for Open Source Intelligence (OSINT) Gathering"
    - property: og:description
      content: "Tools You Can Use for Open Source Intelligence (OSINT) Gathering"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/tools-for-open-source-intelligence-gathering.html
prev: /devops/security/articles/README.md
date: 2024-10-29
isOriginal: false
author: Manish Shivanandhan
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1730102596033/092e5f4f-638a-437f-923f-89fba4185a61.jpeg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Security > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/security/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Python > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Shell > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/sh/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Tools You Can Use for Open Source Intelligence (OSINT) Gathering"
  desc="Welcome to the world of Open-Source Intelligence (OSINT). OSINT is all about gathering public information from various online sources. OSINT can come from social media, websites, search engines, and even public databases. You’d be surprised at how mu..."
  url="https://freecodecamp.org/news/tools-for-open-source-intelligence-gathering"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1730102596033/092e5f4f-638a-437f-923f-89fba4185a61.jpeg"/>

Welcome to the world of Open-Source Intelligence (OSINT). OSINT is all about gathering public information from various online sources.

OSINT can come from social media, websites, search engines, and even public databases. You’d be surprised at how much valuable information is out there. And it’s information that’s freely accessible to anyone with the right skills to find it.

OSINT techniques let you tap into this data to uncover patterns, track behaviours, and sometimes even make predictions.

Companies also use OSINT to protect themselves from cyber threats. Law enforcement uses it to investigate cases. And cybersecurity experts use it to identify potential vulnerabilities before attackers do.

In this article, you’ll learn the top seven tools used in Open Source Intelligence Gathering.

::: note

OSINT should always be used ethically. Respect privacy laws and understand the boundaries of legal data collection. The goal is to gather information responsibly for research, security, or investigative purposes.

:::

---

## Google Dorking — Search Engines on Steroids

Google Dorking is a technique that lets you use Google’s advanced search operators to find hidden data. These operators can narrow down your search results to exactly what you’re looking for, even if that data isn’t easy to find through a basic Google search.

For example, using `financial report site: miscosoft.com filetype:pdf` will give us the PDF files that contain the text “financial report” from the site [<VPIcon icon="fa-brands fa-microsoft"/>microsoft.com](http://microsoft.com).

![financial reports pdf](https://cdn.hashnode.com/res/hashnode/image/upload/v1730102651973/a1a2dc42-e130-45cd-8005-5bddfe7674ab.jpeg)

Other common operators include:

- `site:` to search within a specific website.
- `intitle:` to look for specific words in the title of web pages.
- `inurl:` to find specific terms in URLs.

[Here is a detailed tutorial on Google dorking](/freecodecamp.org/google-dorking-how-to-find-hidden-information-on-the-web.md) if you want to learn more.

Using Google Dorking, you can find documents, exposed files, login pages, and other information that might otherwise be buried.

---

## Harvesting Emails, IPs, and more using theHarvester

[<VPIcon icon="iconfont icon-github"/>`laramies/theHarvester`](https://github.com/laramies/theHarvester) is a tool specifically designed for OSINT gathering. It can collect email addresses, subdomains, IPs, and more by querying various search engines and databases.

It’s incredibly useful when you want to quickly gather information on a specific target, like a company or website.

To use theHarvester, you simply enter a domain, and it will scrape data from sources like Google, Bing, LinkedIn, and others. For example:

```sh
theHarvester -d kali.org -b bing
```

This command tells theHarvester to search Bing for information related to `kali.org`. In just a few seconds, you can get a list of emails, IP addresses, and other information that may be publicly available.

![theHarvester result for kali.org](https://cdn.hashnode.com/res/hashnode/image/upload/v1730102690834/44f66e2d-b1be-442f-b833-b1fc6923c9b8.jpeg)

---

## Extracting Metadata using ExifTool

Metadata is data about data. Files, like PDFs and images, often contain metadata that can reveal useful details.

This could include information like the author of a document, the software used to create it, and even the location where a photo was taken.

[<VPIcon icon="iconfont icon-github"/>`exiftool/exiftool`](https://github.com/exiftool/exiftool) specializes in extracting metadata from files. You can see information about where and when an image was taken, which can be crucial in certain investigations.

Using ExifTool is straightforward:

```sh
exiftool file.jpg
```

This command will display all available metadata for the given file.

![exif tool result](https://cdn.hashnode.com/res/hashnode/image/upload/v1730103140901/50c90fe3-e141-4034-969d-8209da4b6104.jpeg)

Be mindful when using metadata extraction tools, as some metadata may contain sensitive information.

---

## Automating Information Collection using Photon

[<VPIcon icon="iconfont icon-github"/>`s0md3v/Photon`](https://github.com/s0md3v/Photon) is a powerful web crawler designed to automate data collection from websites. Once you specify a target URL, Photon can go through the site, gathering information like links, images, emails, and even files.

Photon is particularly useful for large websites where manual data collection would take too long.

For instance:

```sh
python3 photon.py -u https://example.com -o output_folder
```

This command tells Photon to crawl `https://example.com` and save the collected data in a folder called <VPIcon icon="fas fa-folder-open"/>`output_folder`.

Here is a sample response from crawling the site archive.org:

![Photon sample response](https://cdn.hashnode.com/res/hashnode/image/upload/v1730103200363/f2679e98-f63e-4ecc-bed7-ae776b48301a.jpeg)

Photon can save a lot of time by gathering extensive data for you.

---

## Finding Usernames Across Platforms using Sherlock

Sherlock is a tool that searches for usernames across hundreds of social media platforms and websites. If you’re investigating someone or conducting a security assessment, Sherlock can quickly show you where a particular username exists online.

To use Sherlock:

```sh
python3 sherlock username
```

Replace `username` with the username you want to search for. Sherlock will tell you if the username is registered on platforms like Twitter, Facebook, Instagram, and more.

![Sherlock sample response](https://cdn.hashnode.com/res/hashnode/image/upload/v1730103240471/26843e89-42ca-4a57-a204-7877f74e10e0.jpeg)

This tool is especially useful for identifying the online presence of a person or entity.

---

## Visualizing Relationships using Maltego

[<VPIcon icon="fas fa-globe"/>Maltego](https://maltego.com/) is a unique OSINT tool that creates visual maps of relationships between people, companies, and entities. By using “transforms,” Maltego allows you to search across different data sources and map out connections.

![Maltego](https://cdn.hashnode.com/res/hashnode/image/upload/v1730103285033/947347c9-4773-49b6-9b10-8c84eb9f1c53.jpeg)

Maltego’s visual approach is helpful for investigations where you need to understand how different elements relate to each other. It’s popular among law enforcement and cybersecurity experts for mapping out complex networks.

---

## Shodan — Search Engine for Internet-Connected Devices

[<VPIcon icon="fas fa-globe"/>Shodan](https://shodan.io/) is a search engine specifically designed for finding Internet of Things (IoT) devices. It allows you to search for online devices like webcams, routers, servers, and more.

Shodan is widely used in cybersecurity to check for exposed devices that might have security vulnerabilities.

![Shodan](https://cdn.hashnode.com/res/hashnode/image/upload/v1730103337532/f4f07fb9-91ea-47c1-a858-1e67b0eac87a.jpeg)

To use Shodan, you’ll need an account. Once set up, you can search for devices by IP address, location, or device type.

Shodan’s powerful filtering options make it an essential tool for anyone monitoring connected devices. You can [read more about it here](/freecodecamp.org/shodan-what-to-know-about-the-internets-most-dangerous-search-engine.md).

---

## Conclusion

OSINT offers incredible power for gathering information, but with that power comes responsibility. These tools are designed to help you find public data, but you should always use them ethically and legally.

The goal of OSINT should be responsible data gathering for purposes like research, cybersecurity, or investigations — not for invading privacy or illegal activities.

For more tutorials on cybersecurity, [<VPIcon icon="fas fa-globe"/>**join our weekly newsletter**](https://stealthsecurity.sh/). If you are new to cybersecurity, check out the [<VPIcon icon="fas fa-globe"/>**Hacker’s Handbook**](https://book.stealthsecurity.sh/).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Tools You Can Use for Open Source Intelligence (OSINT) Gathering",
  "desc": "Welcome to the world of Open-Source Intelligence (OSINT). OSINT is all about gathering public information from various online sources. OSINT can come from social media, websites, search engines, and even public databases. You’d be surprised at how mu...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/tools-for-open-source-intelligence-gathering.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
