---
lang: en-US
title: "How to Discover Hidden Subdomains as an Ethical Hacker"
description: "Article(s) > How to Discover Hidden Subdomains as an Ethical Hacker"
icon: fas fa-shield-halved
category:
  - DevOps
  - Security
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - security
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Discover Hidden Subdomains as an Ethical Hacker"
    - property: og:description
      content: "How to Discover Hidden Subdomains as an Ethical Hacker"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-discover-hidden-subdomains-as-an-ethical-hacker.html
prev: /devops/security/articles/README.md
date: 2025-01-08
isOriginal: false
author:
  - name: Manish Shivanandhan
    url : https://freecodecamp.org/news/author/manishshivanandhan/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1735806321604/dec39da9-6dd8-4a73-ba64-5cf894ce34f4.webp
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Security > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/security/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Discover Hidden Subdomains as an Ethical Hacker"
  desc="Subdomains are an essential part of a website’s infrastructure. They provide additional functions in a web application, such as APIs, admin portals, and staging environments. As an ethical hacker, discovering subdomains is a critical step in learning..."
  url="https://freecodecamp.org/news/how-to-discover-hidden-subdomains-as-an-ethical-hacker"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1735806321604/dec39da9-6dd8-4a73-ba64-5cf894ce34f4.webp"/>

Subdomains are an essential part of a website’s infrastructure. They provide additional functions in a web application, such as APIs, admin portals, and staging environments.

As an ethical hacker, discovering subdomains is a critical step in learning the attack surface of a target. Subdomains might not be protected well, unlike the main domain. So they can be a great entry point for security auditing or bug bounty programs.

In this article, I’ll walk you through how to find subdomains using multiple methods. We will use [tesla.com](http://tesla.com/) as our example in subdomain research.

::: note

tesla.com is part of bug bounty programs, so we have permission to scan it for subdomains. If you are doing this in another web application, make sure you have permission.

:::

---

## `Crt.sh`

One of the easiest ways to start is by checking Certificate Transparency (CT) logs using [<FontIcon icon="fas fa-globe"/>crt.sh](https://crt.sh/). This website records every SSL/TLS certificate issued for a domain, including subdomains.

To search for Tesla’s subdomains, visit [<FontIcon icon="fas fa-globe"/>crt.sh](https://crt.sh/) and enter `%.tesla.com` as the query. The `%` acts as a wildcard to match any subdomains.

Let's look at the results:

![tesla.com subdomain research - results of running tesla.com through crt.sh](https://cdn.hashnode.com/res/hashnode/image/upload/v1735806389562/eabc92c8-6fff-45fb-ba1c-00f582a31c4f.webp)

We can see a lot of interesting subdomains listed in the results. These subdomains may belong to different parts of Tesla’s infrastructure.

For example, `shop.tesla.com` is likely for their online store, while `api.tesla.com` could host application programming interfaces.

Using `crt.sh` is passive, meaning it doesn’t interact with the target, making it both safe and stealthy.

Note that [<FontIcon icon="fas fa-globe"/>crt.sh](http://crt.sh) will only display subdomains that have valid certificates. If a subdomain uses self-signed certificates or doesn’t use SSL/TLS at all, it may not appear in these logs. Despite this limitation, [<FontIcon icon="fas fa-globe"/>crt.sh](http://crt.sh) remains a quick and efficient starting point for subdomain enumeration.

---

## <FontIcon icon="iconfont icon-github"/>`aboul3la/Sublist3r`

[<FontIcon icon="iconfont icon-github"/>`aboul3la/Sublist3r`](https://github.com/aboul3la/Sublist3r) is an open-source tool to automate finding subdomains. It’s helpful in both security assessments and general reconnaissance.

By using multiple search engines (like Google, Bing, Yahoo, and more) Sublist3r finds subdomains that might otherwise remain hidden.

Sublist3r’s command-line interface is simple to use — you give it a domain, and Sublist3r goes to work.

Thanks to its open-source nature, it’s actively maintained and improved by the security community.

Sublist3r is not pre-installed on Kali, so lets go ahead and install it. First, clone the repository and install the requirements:

```sh
git clone https://github.com/aboul3la/Sublist3r.git
cd Sublist3r
sudo pip install -r requirements.txt
```

Now we are ready to use the sublist3r tool. Here is the syntax to use sublist3r:

```sh
python sublist3r.py -d tesla.com
```

After a few minutes, Sublist3r will return a list of discovered subdomains. The `-d` flag tells sublist3r that the domain to use is tesla.com

![sublist3r response](https://cdn.hashnode.com/res/hashnode/image/upload/v1735806446961/b2f239bf-5a9b-4da6-a875-d9326e2b0621.webp)

You can see that sublist3r has found more than 300 subdomains of `tesla.com`. Sublist3r is an excellent way to jump-start the recon process, especially if you want to automate the collection of subdomains without installing numerous separate tools.

Note that Sublist3r relies on the APIs of these search engines and other data sources. So it can sometimes miss subdomains that haven’t been crawled or indexed.

---

## Google Dorking

Google dorking (sometimes called “Google hacking”) refers to the practice of using special search queries on Google. These operators help to find hidden information, sensitive data, or other resources that would otherwise be hard to locate.

Common operators include `site:`, `inurl:`, `filetype:`, and `intitle:`, among many others. Let’s start with the `site:` operator:

```plaintext
site:*.tesla.com
```

This query searches for any subdomain of `tesla.com`. Here are some search results.

![`tesla.com` google dork](https://cdn.hashnode.com/res/hashnode/image/upload/v1735806489328/fb4187aa-aa35-45d7-b975-5487de0093e2.webp)

To dig deeper, try combining `site:` with other operators. For example, we can use the `inurl` operator with the keyword ‘admin’ to find URLs containing the word admin.

```plaintext
site:*.tesla.com inurl:admi
```

![02c44cdd-1bc3-4c8c-822a-16f883b6c166](https://cdn.hashnode.com/res/hashnode/image/upload/v1735806522371/02c44cdd-1bc3-4c8c-822a-16f883b6c166.webp)

By using these operators (known as Google dorks), you can filter search results to find specific file types, directories, or even private information that may be unintentionally exposed on the internet.

Dorking can produce a lot of data, so you may need to carefully filter your searches to avoid getting flooded with irrelevant information.

[Here is a full tutorial](https://stealthsecurity.sh/p/google-dorking-the-ultimate-guide-to-finding-hidden-information-on-the-web) on Google dorking.

---

## Fuzzing with GoBuster

Now what if the subdomains of a target are not listed anywhere on the internet? We fuzz for it.

Fuzzing is simply brute-forcing potential subdomain names by trying combinations from a wordlist. A wordlist is a list of words that we will use along with the fuzzing tool to see if a subdomain exists.

A subdomain wordlist can contain words like:

```plaintext
ftp
root
admin
portal
api
```

Tools like Gobuster and Ffuf can use a wordlist to check whether these subdomains exist. Here is a sample [<FontIcon icon="iconfont icon-github"/>subdomain wordlist](https://raw.githubusercontent.com/danielmiessler/SecLists/refs/heads/master/Discovery/DNS/subdomains-top1million-110000.txt).

### How Gobuster Works

[<FontIcon icon="fas fa-globe"/>Gobuster](https://stealthsecurity.sh/p/finding-hidden-directories-subdomains-s3-buckets-using-gobuster) is a fast brute-force tool for discovering hidden URLs, files, and directories within websites.

Ffuf is a wonderful web fuzzer, but Gobuster is a faster and more flexible alternative. Gobuster has support for extensions with which we can increase its capabilities.

Gobuster also can scale using multiple threads and perform parallel scans to speed up results.

Gobuster comes pre-installed in Kali Linux. Let’s run the following command to look for subdomains. You can find the word list under /usr/share/wordlists/SecLists in Kali Linux.

```sh
gobuster dns -d tesla.com -w /usr/share/wordlists/SecLists/Discovery/DNS/subdomains-top1million-110000.txt
```

The above command checks each word in the wordlist to see if it resolves to a valid subdomain.

![Here’s a sample output](https://cdn.hashnode.com/res/hashnode/image/upload/v1735806581200/46b3d437-9918-416c-a510-f647e9ac303e.webp)

Gobuster’s results show valid subdomains, including some that might not appear in public databases, like `staging.tesla.com` or `dev.tesla.com`.

Fuzzing should be combined with other methods since the results are only as good as the wordlist. For example, prod-version-2.tesla.com can be a subdomain which may not be a part of the wordlist.

---

## Other Methods for Subdomain Discovery

### DNS Zone Transfers

While rare, misconfigured DNS servers can allow zone transfers, revealing all subdomains at once. You can test this using `dig`:

```sh
dig axfr @ns1.tesla.com tesla.com
```

If the server is properly secured, it won’t allow a zone transfer. But if it’s misconfigured, you might uncover every subdomain Tesla uses.

### Online Tools

Websites like [<FontIcon icon="fas fa-globe"/>SecurityTrails](https://securitytrails.com/), [<FontIcon icon="fas fa-globe"/>Shodan](https://shodan.io/), and [<FontIcon icon="fas fa-globe"/>Censys](https://censys.io/) aggregate subdomain data. These tools provide a centralized view of publicly available information.

### Inspecting JavaScript Files

Subdomains often appear in a website’s JavaScript files. By examining Tesla’s website, you might find references to API endpoints or other subdomains.

---

## Post-Subdomain Discovery

Once you have a list of subdomains, we can probe them further. We may discover sign-in portals, development pages, or API endpoints.

Ethical hackers typically use port scanning and service enumeration tools like Nmap and Nikto to find the open ports and running services on each subdomain. Identifying outdated software, insecure protocols, or default credentials is often the next critical step, as these are common weak points in any environment.

Subdomains often show us the broader infrastructure of the website if they are left unprotected.

---

## Conclusion

Subdomain discovery is a critical skill for ethical hackers. It helps us understand the complete picture of a web application. The more we know, the better entry points we have to gain access.

Before using these techniques, always ensure you have proper authorization. Subdomain discovery helps with security audits by uncovering hidden assets and helping organizations protect themselves from potential threats.

For more practical tutorials on cybersecurity, join our [<FontIcon icon="fas fa-globe"/>weekly newsletter](https://stealthsecurity.sh/). If you want to practice these subdomain discovery techniques through a hands-on lab, join us at the [<FontIcon icon="fas fa-globe"/>Hacker’s Hub](https://skool.com/hackershub).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Discover Hidden Subdomains as an Ethical Hacker",
  "desc": "Subdomains are an essential part of a website’s infrastructure. They provide additional functions in a web application, such as APIs, admin portals, and staging environments. As an ethical hacker, discovering subdomains is a critical step in learning...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-discover-hidden-subdomains-as-an-ethical-hacker.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
