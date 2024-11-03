---
lang: en-US
title: "Google Dorking: How to Find Hidden Information on the Web"
description: "Article(s) > Google Dorking: How to Find Hidden Information on the Web"
icon: fas fa-shield-halved
category:
  - Security
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - security
  - sec
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Google Dorking: How to Find Hidden Information on the Web"
    - property: og:description
      content: "Google Dorking: How to Find Hidden Information on the Web"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/google-dorking-how-to-find-hidden-information-on-the-web.html
prev: /devops/security/articles/README.md
date: 2024-10-26
isOriginal: false
author: Manish Shivanandhan
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1729872503418/1e5921bc-52ba-4410-86a3-5e96a2c22405.jpeg
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
  name="Google Dorking: How to Find Hidden Information on the Web"
  desc="Let’s learn how to find hidden information online by using advanced search operators on Google. The internet holds vast amounts of information. Much of this information is accessible through Google. But did you know you can use Google in ways beyond ..."
  url="https://freecodecamp.org/news/google-dorking-how-to-find-hidden-information-on-the-web"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1729872503418/1e5921bc-52ba-4410-86a3-5e96a2c22405.jpeg"/>

Let’s learn how to find hidden information online by using advanced search operators on Google.

The internet holds vast amounts of information. Much of this information is accessible through Google.

But did you know you can use Google in ways beyond simple searches? There’s a method called “Google Dorking” that lets you do this.

Google Dorking helps you find hidden or overlooked data on websites. It uses advanced search operators to locate hidden files, sensitive data, and more.

Google Dorking allows us to be very specific with our searches. Instead of just typing in regular keywords, we combine them with operators. These operators help Google narrow down its search results.

Before we dive in, a word of caution. While Google Dorking can be a powerful tool for research or cybersecurity testing, it also carries some risks. Using it for unauthorized access to secure information is illegal. So use it safely and correctly!

Now let’s learn how to “dork” Google.

---

## Google Dorking Operators

Here’s a list of every common Google Dorking operator along with its purpose.

### Site

Restricts search results to a specific domain or website. Example: `site: example.com` will show results only from that site.

### InTitle

Searches for pages with a specific word or phrase in the page title. Example: `intitle:login` will find pages with "login" in the title.

![InTitle results](https://cdn.hashnode.com/res/hashnode/image/upload/v1729872545025/c2c88f8b-d14c-4da4-91f5-78ea9d87fb48.jpeg)

### InURL

The `inurl` operator is used to find specific words within the URL structure of web pages. It can help locate pages with particular keywords embedded in their web address.

For example, using `inurl:login` with other terms like `inurl:customer` or `inurl:secure` can reveal login pages for different sites.

An example of its use is `inurl: admin`. This displays URLs containing “admin,” often leading to administrative or management pages.

For more advanced searches, `inurl:pho?id=` can be useful to identify sites that might be vulnerable to SQL injection. URLs structured this way often include database query strings.

### FileType

The `filetype` operator enables users to search for documents with a specific file extension. This includes extensions like PDF, DOC, or XLS.

The `filetype` operator makes it helpful for locating publicly accessible reports, presentations, and documents. For instance, `filetype:pdf financial report` finds PDF files related to financial reporting.

Combining `filetype` with certain keywords allows for more targeted searches. For example, searching `filetype:xlsx budget` could find Excel files related to budget details.

`filetype:docx confidential` might reveal DOCX documents containing potentially sensitive terms like “confidential,” leading to internal-use files that may be accessible publicly.

### Cache

Shows Google’s cached version of a webpage, even if it’s been removed. Example: `cache: example.com` shows the cached version of that page.

### AllInText

Searches for pages that contain all the specified words in the body text. Example: `allintext:"username password"` will return pages with both words in the text.

![All in text results](https://cdn.hashnode.com/res/hashnode/image/upload/v1729872601325/87fbbd02-d5b0-43c0-9893-cef035927711.jpeg)

### AllInTitle

Searches for pages with all specified words in the title. Example: `allintitle:login admin` finds pages with both words in the title.

### AllInUrl

Searches for pages with multiple specified words in the URL. Example: `allinurl:admin login` finds URLs that contain both "admin" and "login."

### InAnchor

Finds pages with specific text in anchor links (the clickable text of a link). Example: `inanchor:"click here"` finds links where the clickable text is "click here."

### Before and After

Finds pages published before or after a specific date. Example: `before:2020` will find pages published before 2020. `after:2020` will find pages published after 2020. ![Before and after results](https://cdn.hashnode.com/res/hashnode/image/upload/v1729872642187/5e3a17ca-c428-4711-82d8-c904182d1d58.jpeg)

### OR

Combines two search terms and returns results containing either of them. Example: `admin OR login` shows pages with either "admin" or "login."

### Minus (-)

Excludes specific words from the search results. Example: `admin -login` shows pages with “admin” but without “login.”

### Asterisk (\*)

Acts as a wildcard to substitute any word or phrase. Example: `"admin * login"` will find pages with any word between "admin" and "login."

### InText

Searches for specific words in the main body of the page, not just titles or URLs. Example: `intext:"confidential"` finds pages where "confidential" appears in the content.

### Location

Restricts results to a specific geographical location. Example: `location:USA` shows results focused on the USA.

---

## How to Protect Yourself from Google Dorking

If you own a website or manage sensitive information online, understanding Google Dorking can help you secure your data. Here are some steps you can take to protect yourself:

1. **Use Robots.txt Files** The robots.txt file on a website tells search engines what content they shouldn’t index. Make sure that sensitive web pages or files are protected from being indexed by Google.
2. **Use Password Protection** If certain parts of your website are sensitive, use password protection. Google can’t access password-protected content, so it won’t show up in search results.
3. **Avoid Storing Sensitive Files Publicly** Do not store sensitive information like database backups, configuration files, or email lists on publicly accessible parts of your server.
4. **Regularly Check for Exposed Information** Use your own Google Dorking searches to see if sensitive files are showing up on Google. This can help you catch and secure information before anyone else finds it.
5. **Use Web Vulnerability Scanners** Tools like OWASP ZAP or Burp Suite can help you scan your own site for exposed data. These tools may catch things that you might overlook manually.

---

## Conclusion

Google Dorking can be both helpful and dangerous, depending on how you use it. On one hand, it lets you uncover hidden information and refine your search skills. On the other, it can expose sensitive data if used irresponsibly.

Understanding the techniques of Google Dorking can make you a better internet user and help you secure your own data.

To learn how to hack machines in the real world, join our private community [<FontIcon icon="fas fa-globe"/>Hacker's Hub.](https://skool.com/hackershub)

<SiteInfo
  name="Hacker's Hub"
  desc="Ethical hacking for beginners. Tutorials, Courses, Workshops and more. "
  url="https://skool.com/hackershub/about/"
  logo="https://assets.skool.com/skool/ed24268642ae417a9b8e3b9827cdd1fd.ico"
  preview="https://assets.skool.com/f/53e73ecfe18c47848fcc2e4596b333f9/4819f2512ae348c9859dd98b90d7d2936b59ddcd52c34f4eb31e357210012e05"/>
  
<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Google Dorking: How to Find Hidden Information on the Web",
  "desc": "Let’s learn how to find hidden information online by using advanced search operators on Google. The internet holds vast amounts of information. Much of this information is accessible through Google. But did you know you can use Google in ways beyond ...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/google-dorking-how-to-find-hidden-information-on-the-web.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
