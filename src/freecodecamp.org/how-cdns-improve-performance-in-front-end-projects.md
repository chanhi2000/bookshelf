---
lang: en-US
title: "How to Use CDNs to Improve Performance in your Front-end Projects"
description: "Article(s) > How to Use CDNs to Improve Performance in your Front-end Projects"
icon: fas fa-pen-ruler
category: 
  - Design
  - System
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - design
  - system
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Use CDNs to Improve Performance in your Front-end Projects"
    - property: og:description
      content: "How to Use CDNs to Improve Performance in your Front-end Projects"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-cdns-improve-performance-in-front-end-projects.html
prev: /academics/system-design/articles/README.md
date: 2024-10-15
isOriginal: false
author: Timothy Olanrewaju
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1728820334493/8ef2738f-c2ac-42d3-be3f-5a6a3bddbdbd.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "System Design > Article(s)",
  "desc": "Article(s)",
  "link": "/academics/system-design/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Use CDNs to Improve Performance in your Front-end Projects"
  desc="In web development, styling plays a crucial role in the visual presentation of web applications. According to a study by Adobe, 59% of users would choose a beautifully designed website over a “simple and plain” design. So designs that are crafted in ..."
  url="https://freecodecamp.org/news/how-cdns-improve-performance-in-front-end-projects"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1728820334493/8ef2738f-c2ac-42d3-be3f-5a6a3bddbdbd.png"/>

In web development, styling plays a crucial role in the visual presentation of web applications. According to a study by Adobe, 59% of users would choose a beautifully designed website over a “simple and plain” design. So designs that are crafted in a visually appealing way tend to attract users to consume content on a website.

In recent times, there has been a steady rise in styling tools that you can use to elevate the visual appeal of your websites. Such tools include CSS frameworks, animation libraries, icon libraries, and typography libraries. These tools offer customization flexibility, responsiveness, and consistency.

One awesome thing about these styling tools is that they bundle stylistic effects in a file which you can access via a Content Delivery Network (CDN).

In this article, we’ll be looking extensively at CDNs, how they work, their different hosting methods, the differences between them, their pros and cons, and the best use-cases of the methods for your project.

Let's dive straight into it!

---

## What is a CDN?

A CDN, or Content Delivery Network, is a system of distributed servers that delivers web content (like images, stylesheets, scripts and other resources) to users, reliably and efficiently.

### How does a CDN work?

A CDN’s primary function is to cache and serve both static and dynamic web content to users. It achieves this by using the following:

- **Origin Server**: This is the main server where all content is originally hosted.
- **Edge Servers**: These are servers distributed in different geographical locations to serve web content to users closer to them.
- **Caching**: This is a way of storing content on edge servers to reduce repeated requests to the origin server.
- **DNS Routing**: This is the mechanism that reroutes users to the nearest edge servers based on their location.

![Diagram showing origin server communicating with different edge servers](https://cdn.hashnode.com/res/hashnode/image/upload/v1728819505243/6389ac39-e1d2-4348-9f97-8ee370eecd7f.png)

This is what happens when a user clicks on a CDN link:

- If trying to access the resource for the first time, the request hits the origin server.
- The origin server sends the resource to the user as a response and also sends a copy to the edge server located geographically closest to the user.
- The edge server caches the copy.
- When the user wants to access the resources again, the edge server (not the origin server) sends over the cached copy.

### Real-World Analogy to Explain CDNs

To further explain how the CDN works, I’ll give an analogy to make it clearer. Imagine having an account with a bank that has its headquarters in New York (origin server).

You don’t expect customers who live far away from New York to be scampering to the headquarters any time they encounter issues. Instead, the bank provides branches (edge servers) in different locations to cater to the needs of their customers. Customers can easily walk into any branch nearest to them and get their issues or transactions sorted.

The branches have every customer's account information and transaction logs (cached data). Every branch of that bank delivers the same services and can satisfy their customers regardless of their distance from the headquarters.

The distribution of branches in different locations helps reduce the traffic that would have caused delays if the bank had just the headquarters as the only option. On contacting the bank's customer service on an issue, you would most likely be redirected to the nearest bank branch to you (DNS Routing)!

---

## Why are CDNs Important?

There are many reasons why CDNs many websites use CDNs these days. Some of the key benefits are:

1. **Improved Website Performance:** CDNs can compress files and optimize images automatically, which helps speed up load time.
2. **Efficient Resource Storage:** With CDNs, styling resources are stored and managed properly. Resources are also stored in files matching their content types.
3. **Better Search Engine Optimization (SEO):** Using CDNs directly speeds up load time which in turn impacts search engine rankings. Google considers site speed a key metric that allows web pages to show up higher in search engines.
4. **Better User Experience:** Users prefer faster and more responsive websites to slow and unresponsive ones. With a better user experience, a website is sure to receive more engagement and lower bounce rates.

---

## Different Ways to Use a CDN

There are three ways you can access CDN resources in your project:

- Remote Hosting
- Local Hosting
- Hybrid Hosting

### Remote Hosted CDN

Remote CDN links allow developers to access styling resources from a third-party server by simply linking to the CDN in their HTML files via the `link` or `script` tag.

Bootstrap, for example, has two primary CDN links – one for CSS stylesheet and another for JavaScript (handles dynamic interaction like dropdowns, pop-overs, and so on).

To use a Bootstrap stylesheet in your project, you need to add this single line - `https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css`

And for the JavaScript: `https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js`

::: tabs

@tab:active How to find remote CDN links

The best way to identify thte remote CDN links of your desired styling tool is to visit their official documentation site and look for the direct links there.

@tab Advantages of a remote CDN:

1. **Easy to Use:** You don’t need to download, manage, or upload files with CDN links. All you need to do is insert a single line of code in your HTML file and you are good to go.
2. **Global Caching:** whenever you visit a website that uses CDN links, it downloads the resources on loading the page and then saves it in your browser cache. On subsequent visits to the same website or other sites that use the same CDN, it fetches from the cache and displays these resources more quickly. This is one of the biggest advantages of using CDN links, as it improves website load time.
3. **Optimized Global Delivery:** CDNs are built to deliver content to users around the world by serving files from edge servers closest to users. This helps reduce the time it takes data to transfer across a network, also known as latency, and boosts performance for international users.
4. **Reduced Server Load:** Due to the CDN fetching data from an external source, the load on your server is reduced, which is helpful for high-traffic websites.
5. **Real-Time Updates:** Companies that own CDN links carry out periodic bug fixing, security patching, and feature updates, which can be beneficial for your project. These updates are reflected as soon as they are released.

@tab Disadvantages of a remote CDN:

1. **Customization Limitations:** Styling components in remote CDNs are standard and unmodified. To modify them, you would have to override the specific styles in your local file which can introduce complexities.
2. **No Control over Updates:** When automatic updates are made, they can cause problems in your web applications. If the changes being introduced include drastic changes, it can affect your website’s layout or behavior in a big way.
3. **Dependency on Third-Party Availability:** If the CDN service experiences hitches like downtime or slowness, it can lead to broken styles thus, affecting your site’s performance negatively.
4. **Privacy and Security Concerns:** Links referencing an external source can pose serious security concerns, as they can be used to track users and get vital information. It is important to include only trusted CDN link sources in your web project to avoid breaches.

:::

### Locally Hosted CDN

These are CDN resources downloaded from a remote CDN and saved within your project folder or hosted on a local server. This approach allows you to have full control over the resources.

::: tabs

@tab:active How to host CDN resources locally:

Hosting locally is straightforward and easy. All you have to do is:

- Access the resource by navigating to the CDN link URL (for example, `https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css`).
- Copy the code found in the URL.
- Create a file with the appropriate file extension (.css, .js) within your project folder.
- Paste and save.
- Reference the file in your HTML document.

If you follow these steps, you should be able to localize the CDN resource and access its styling locally.

@tab Advantages of a locally hosted CDN:

1. **Full Control over Files:** With resources resident within your project folder/server, you’re in full control of your files as there will be no unexpected outages, changes, or updates that might break your site.
2. **Offline Availability:** Local hosting ensures that your styling resources are always available, especially for users with little or no network. This is perfect for building Progressive Web Applications (PWAs).
3. **Customization:** There’s be no need for overrides, as your styling can be modified from within your project files.
4. **Security:** By localizing CDN resources, you reduce the risk of potential third-party attacks on your project to the barest minimum.

@tab Disadvantages of a locally hosted CDN:

1. **No Global Caching:** There is no benefit of global caching when resources are hosted locally. This will result in slower load time for first-time visitors.
2. **Increased Server Load:** With files residing locally, the load on the server increases especially as traffic increases. This approach puts a burden on the server and its capacity has to be considered.
3. **Manual Updates:** While hosting locally gives you control over updates, you’ll need to manually track and apply updates to your stylesheets when necessary. Also, missing security updates could make your site vulnerable.
4. **Regional Performance Impact:** If your server is located in a specific region, users from faraway places may encounter slower load times because the content has to travel greater distances.

:::

### Hybrid Hosted CDN

This approach involves the combination of using both the remote link and local hosting of CDN resources. A hybrid approach – which involves using remote CDNs for core libraries and local hosting for custom stylesheets – may strike the perfect balance between performance and control.

::: tabs

@tab:active Best Approach to Use

The decision between remote and local hosting of of your CDN styling resources depends on factors such as project performance needs, user base, and security. Your choice should depend on the suitability of the approach to your project and should elevate the performance levels.

@tab Best use-cases for a remote CDN:

1. **Global User Base:** If your website is to be accessed by a large, globally distributed audience, using the remote option would work best due to its performance and caching advantage.
2. **Fast Integration:** In a situation where you want to develop and deploy a project in the shortest period of time, using the remote CDN link is quick and easy.
3. **Low-Traffic Website:** Small projects such as portfolio sites and blogs are better served using a remote CDN link so as not to put a strain on the server. It also leads to easier implementation.

@tab Best use-cases for a locally hosted CDN:

1. **High Security Needs:** For applications that require tight security due to the sensitivity of their operations, hosting the CDN resources locally will reduce third-party risks and vulnerabilities.
2. **Offline Applications:** For web applications that work offline, localizing styling resources would be the best option.
3. **Customization Requirements:** If you need to create your tailored styling versions, hosting them locally is the best option.

:::

---

## Conclusion

In this guide, you’ve learned what a CDN is, how you can host your CDN, and some of the benefits, drawbacks, and best use-cases for each approach.

Remote CDNs provide speed, convenience and reduced server load, while local hosting offers greater control, security, and customization options.

Ultimately, the best approach depends on your specific use case, audience, and priorities.

You can connect with me on [LinkedIn (<FontIcon icon="fa-brands fa-linkedin"/>`timothy-olanrewaju750`)](https://linkedin.com/in/timothy-olanrewaju750/) or [X (<FontIcon icon="fa-brands fa-x-twitter"/>`SmoothTee_DC`)](https://x.com/SmoothTee_DC) for more frontend-related posts and articles.

See you on the next one!

<!-- START: ARTICLE CARD -->
```component VPCard
{
  "title": "How to Use CDNs to Improve Performance in your Front-end Projects",
  "desc": "In web development, styling plays a crucial role in the visual presentation of web applications. According to a study by Adobe, 59% of users would choose a beautifully designed website over a “simple and plain” design. So designs that are crafted in ...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-cdns-improve-performance-in-front-end-projects.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
