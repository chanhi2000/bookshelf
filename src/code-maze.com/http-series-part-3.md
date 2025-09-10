---
lang: en-US
title: "HTTP - Client Identification"
description: "Article(s) > HTTP - Client Identification"
icon: fas fa-computer
category: 
  - Engineering
  - Computer
  - Article(s)
tag: 
  - blog
  - code-maze.com
  - engineering
  - coen
  - computerengineering
  - computer-engineering
head:
  - - meta:
    - property: og:title
      content: "Article(s) > HTTP - Client Identification"
    - property: og:description
      content: "HTTP - Client Identification"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/code-maze.com/http-series-part-3.html
prev: /academics/coen/articles/README.md
date: 2017-07-08
isOriginal: false
author:
  - name: Vladimir Pecanac
    url : https://code-maze.com/author/codemaze_blog/
cover: /assets/image/code-maze.com/http-series-part-3/banner.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Computer Engineering > Article(s)",
  "desc": "Article(s)",
  "link": "/academics/coen/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="HTTP - Client Identification"
  desc="Let's answer the question of why the client identification is so important and how can Web servers identify you (your Web client)."
  url="https://code-maze.com/http-series-part-3/"
  logo="/assets/image/code-maze.com/favicon.png"
  preview="/assets/image/code-maze.com/http-series-part-3/banner.png"/>

Up until now, you learned about the basic concepts and some of the architectural aspects of HTTP. This leads us to the next important subject to the HTTP: client identification.

In this article, you’ll learn why client identification is important and how can Web servers identify you (your Web client). You will also get to see how that information is used and stored.

First, let’s see why would websites need to identify you.

---

## Client Identification and Why It’s Extremely Important

As you are most definitely aware, every website, or at least those that care enough about you and your actions, include some form of content personalization.

What do I mean by that?

Well, that includes suggested items if you visit an e-commerce website, or “the people you might know/want to connect with” on social networks, recommended videos, ads that almost spookily know what you need, news articles that are relevant to you and so on.

This effect feels like a double-edged sword. On one hand, it’s pretty nifty having personalized, custom content delivered to you. On the other hand, it can lead to the [<VPIcon icon="fa-brands fa-wikipedia-w"/>Confirmation bias](https://en.wikipedia.org/wiki/Confirmation_bias) that can result in all kinds of stereotypes and prejudice. There is an excellent Dilbert comic that touches upon Confirmation bias.

Yet, how can we live without knowing how our favorite team scored last night, or what celebrities did last night?

Either way, content personalization has become part of our daily lives we can’t and we probably don’t even want to do anything about it.

Let’s see how the Web servers can identify you to achieve this effect.

---

## Different Ways to Identify the Client

![multipass](/assets/image/code-maze.com/http-series-part-3/multipass-1024x427.jpg)

There are several ways that a Web server can identify you:

- **HTTP request headers**
- **IP address**
- **Long URLs**
- **Cookies**
- **Login information (authentication)**

Let’s go through each one. HTTP authentication is described in more detail in [**part 4**](/code-maze.com/http-authentication.md) of the [**HTTP series**](/code-maze.com/http-series.md).

---

## HTTP Request Headers Used for Identification

Web servers have a few ways to extract information about you directly from the [**HTTP request headers**](/code-maze.com/the-http-reference.md#headers).

Those headers are:

- **From**: contains users email address, if it’s provided
- **User-Agent**: contains the information about Web client
- **Referer**: contains the source user came from
- **Authorization**: contains username and password
- **Client-IP**: contains the users IP address
- **X-Forwarded-For**: contains user’s IP address (when going through the [**proxy server**](/code-maze.com/http-series-part-2.md#proxy-servers))
- **Cookie**: contains server-generated ID label

In theory, the **From header** would be ideal to uniquely identify the user, but in practice, this header is rarely used due to the security concerns of email collection.

The **user-agent header** contains information like the browser version, operating system. While this is important for customizing content, it doesn’t identify the user in a more relevant way.

The **Referer header** tells the server where the user is coming from. This information is used to improve the understanding of user behavior, but less so to identify it.

While these headers provide some useful information about the client, it is not enough to personalize content in a meaningful way.

The remaining headers offer more precise mechanisms of identification.

---

## IP Address

The method of client identification by IP address has been used more in the past when IP addresses weren’t so easily faked/swapped. Although it can be used as an additional security check, it just isn’t reliable enough to be used on its own.

Here are some of the reasons why:

- It **describes the machine**, not the user
- **NAT firewalls**: many ISPs (Internet service providers) use NAT firewalls to enhance security and deal with IP address shortage
- **Dynamic IP addresses**: users often get the dynamic IP address from the ISP
- **HTTP [proxies](/code-maze.com/http-series-part-2.md#proxy-servers) and [gateways](/code-maze.com/http-series-part-2.md#gateways)**: these can hide the original IP address. Some proxies use Client-IP or X-Forwarded-For to preserve the original IP address

---

## Long (Fat) URLs

It is not that uncommon to see websites utilize URLs to improve the user experience. They add more information as the user browses the website until URLs look complicated and illegible.

You can see what the long URL looks like by browsing the Amazon store.  

```plaintext
https://www.amazon.com/gp/product/1942788002/ref=s9u_psimh_gw_i2?ie=UTF8&fpl=fresh&pd_rd_i=1942788002&pd_rd_r=70BRSEN2K19345MWASF0&pd_rd_w=KpLza&pd_rd_wg=gTIeL&pf_rd_m=ATVPDKIKX0DER&pf_rd_s=&pf_rd_r=RWRKQXA6PBHQG52JTRW2&pf_rd_t=36701&pf_rd_p=1cf9d009-399c-49e1-901a-7b8786e59436&pf_rd_i=desktop
```

There are several problems when using this approach.

- It’s ugly
- Not shareable
- Breaks caching
- It’s limited to that session
- Increases the load on the server

---

## Cookies

The best client identification method up to date excluding the authentication. Developed by Netscape, but now every browser supports them.

There are two types of cookies: **session cookies** and **persistent cookies**. A session cookie is deleted upon leaving the browser, and persistent cookies are saved on disk and can last longer. For the session cookie to be treated as the persistent cookie, Max-Age or Expiry property needs to be set.

Modern browsers like Chrome and Firefox can keep background processes working when you shut them down so you can resume where you left off. This can result in the [<VPIcon icon="fa-brands fa-chrome"/>preservation of the session cookies](https://bugs.chromium.org/p/chromium/issues/detail?id=128513), so be careful.

So how do the cookies work?

Cookies contain a list of name=value pairs that server sets using [**`Set-Cookie` or `Set-Cookie2` response header**](/code-maze.com/the-http-reference.md#headers). Usually, the information stored in a cookie is some kind of client id, but some websites store other information as well.

The browser stores this information in its cookie database and returns it when the user visits the page/website next time. The browser can handle thousands of different cookies and it knows when to serve each one.

### Here is an example flow.

::: tip 1. User Agent -> Server**

```plaintext
POST /acme/login HTTP/1.1
[form data]
```

The user identifies itself via form input

:::

::: tip 2. Server -> User Agent

```plaintext
HTTP/1.1 200 OK
Set-Cookie2: Customer="WILE_E_COYOTE"; Version="1"; Path="/acme"
```

The server sends the Set-Cookie2 response header to instruct the User Agent (browser) to set the information about the user in a cookie.

:::

::: tip 3. User Agent -> Server

```plaintext
POST /acme/pickitem HTTP/1.1
Cookie: $Version="1"; Customer="WILE_E_COYOTE"; $Path="/acme"
[form data]
```

The user selects the item to the shop basket.

:::

::: tip 4. Server -> User Agent**

```plaintext
HTTP/1.1 200 OK
Set-Cookie2: Part_Number="Rocket_Launcher_0001"; Version="1"; Path="/acme"
```

Shopping basket contains an item.

::: tip 5. User Agent -> Server

```plaintext
POST /acme/shipping HTTP/1.1
Cookie: $Version="1"; Customer="WILE_E_COYOTE"; $Path="/acme"; 
        Part_Number="Rocket_Launcher_0001";
[form data]
```

The user selects the shipping method.

:::

::: tip 6. Server -> User Agent

```plaintext
HTTP/1.1 200 OK
Set-Cookie2: Shipping="FedEx"; Version="1"; Path="/acme"
```

The new cookie reflects the shipping method.

:::

::: tip 7. User Agent -> Server

```plaintext
POST /acme/process HTTP/1.1
Cookie: $Version="1";
        Customer="WILE_E_COYOTE"; $Path="/acme";
        Part_Number="Rocket_Launcher_0001"; $Path="/acme";
        Shipping="FedEx"; $Path="/acme"
[form data]
```

:::

That’s it.

There is one more thing I want you to be aware of. The cookies are not perfect either. Besides security concerns, there is also a problem with [<VPIcon icon="fas fa-globe"/>cookies colliding with the REST architectural style](https://infoq.com/articles/rest-anti-patterns). (The section about misusing cookies).

You can learn more about cookies in the [<VPIcon icon="fas fa-globe"/>RFC 2965](https://ietf.org/rfc/rfc2965.txt).

---

## Conclusion

This wraps it up for this part of the [**HTTP series**](/code-maze.com/http-series.md).

You have learned about the strengths of content personalization as well as it’s potential pitfalls. You are also aware of the different ways that servers can use to identify you. In [**part 4**](/code-maze.com/http-authentication.md) of the series, we will talk about the most important type of client identification: authentication.

If you found some of the concepts in this part unclear, refer to [**part 1**](/code-maze.com/http-series-part-1.md) and [**part 2**](/code-maze.com/http-series-part-2.md) of the [**HTTP series**](/code-maze.com/http-series.md).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "HTTP - Client Identification",
  "desc": "Let's answer the question of why the client identification is so important and how can Web servers identify you (your Web client).",
  "link": "https://chanhi2000.github.io/bookshelf/code-maze.com/http-series-part-3.html",
  "logo": "https://chanhi2000.github.io/bookshelf/assets/image/code-maze.com/favicon.png",
  "background": "rgba(22,22,22,0.2)"
}
```
