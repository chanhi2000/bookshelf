---
lang: en-US
title: "How to Speed Up Website Loading by Removing Extra Bits and Bytes"
description: "Article(s) > How to Speed Up Website Loading by Removing Extra Bits and Bytes"
icon: fas fa-network-wired
category:
  - DevOps
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - 
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Speed Up Website Loading by Removing Extra Bits and Bytes"
    - property: og:description
      content: "How to Speed Up Website Loading by Removing Extra Bits and Bytes"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/speed-up-website-loading.html
prev: /devops/articles/README.md
date: 2025-02-25
isOriginal: false
author:
  - name: Alex Tray
    url : https://freecodecamp.org/news/author/trayalex812/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1740094347867/d1097d7b-776f-4228-8088-7726b827271f.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "DevOps > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Speed Up Website Loading by Removing Extra Bits and Bytes"
  desc="Let’s start with an interesting fact: according to research done by Akamai, a 1-second delay in loading a website’s page can decrease the conversion rate by 7%. We are currently living in a fast-paced world, where time is money for everyone. People e..."
  url="https://freecodecamp.org/news/speed-up-website-loading"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1740094347867/d1097d7b-776f-4228-8088-7726b827271f.png"/>

Let’s start with an interesting fact: according to research done by [<FontIcon icon="fas fa-globe"/>Akamai](https://akamai.com/newsroom/press-release/akamai-releases-spring-2017-state-of-online-retail-performance-report), a 1-second delay in loading a website’s page can decrease the conversion rate by 7%.

We are currently living in a fast-paced world, where time is money for everyone. People expect their favorite websites to load lightning-fast. A slow loading speed will not only make them go to the competitor but will also hurt the [**website's ranking**](/freecodecamp.org/how-to-use-on-page-seo-techniques-to-rank-on-the-first-page.md) in the SERP.

But the main question is, who’s the culprit? Those extra bits and bytes that almost every site contains. These are unnecessary code files, unoptimized images, and many more. But by following the right approach, you can easily strip away these inefficiencies and achieve excellent loading speed.

In this article, I will be discussing that approach in detail, so stick around with me till the very end.

---

## Why Does Loading Speed Matter?

There are several reasons why the loading speed of a website is considered essential. Here are some of the major ones.

### 1. Google Ranking Factor:

Website loading speed is a confirmed ranking factor. This means that search engines like Google definitely consider the loading time when evaluating a website’s quality. Usually, the [<FontIcon icon="fas fa-globe"/>ideal loading speed](https://sematext.com/glossary/page-load-time/) is between 0 and 2 seconds. However, 3 seconds is also sometimes acceptable.

In case your site does not fulfill this criteria, then there is a high probability that it may receive a penalty from Google. This will result in lower rankings in the targeted niche – which no webmaster or business wants.

### 2. Impact on User Experience:

A slow loading speed is capable of single-handedly destroying the entire user experience. When the website does not load quickly in front of the visitor, they may close it and move on to another site to find the required information, product, or service.

This will decrease the number of user engagements and increase the overall bounce rate of the site. And a high bounce rate increases the chances of facing a penalty from Google.

### 3. Negative Brand Perception:

For online businesses or brands, their authority and image are everything. When their official site takes too much time to load, it ultimately damages the brand’s perception or credibility in their minds. They will think about how you can deliver a top-notch service or product when you aren’t able to properly manage a website.

This negative impression will not only reduce customer engagement but also conversions.

### 4. Retaining Mobile Users:

Mobile contributes to [<FontIcon icon="fas fa-globe"/>58% of the global internet traffic](https://mobiloud.com/blog/what-percentage-of-internet-traffic-is-mobile). It is also true mobile networks often have slow internet speed issues as compared to Wi-Fi. This can be especially true for people living in rural areas. So, that’s why you should always prioritize loading speed to efficiently retain mobile users.

---

## How to Remove Extra Bits & Bytes from the Website – Different Strategies

Here are some of the most proven strategies you can utilize to remove extra bits and bytes from your websites.

### 1. Perform Code Optimization:

Excessive HTML, CSS, and JavaScript can greatly slow down a website. Due to the large code file, the host server will have to transfer more packets to the client browser, ultimately resulting in slow loading.

To resolve this issue, it is always recommended to perform code optimization. The most widely known and used technique for this purpose is minification. It refers to the process of removing all the:

- Unnecessary characters
- White spaces
- Line breaks
- Comments
- Unused elements.

But you’ll want to make sure that the code works as before, even after minification.

Optimizing code boosts application performance by reducing execution time and resource consumption. Refactor inefficient loops, minimize database queries, and leverage caching to enhance speed. You can use profiling tools to identify bottlenecks and streamline functions for smoother, faster performance.

To demonstrate better, below I have discussed an example:

::: tip Example

**Unoptimized JavaScript Code:**

```js
greet(name) {
    if (!name) {
        console.log("Hello, Guest!");
    } else {
        console.log("Hello, " + name + "!");
    }
}
greet("John");
```

**Minified Version:**

```js
function greet(n){console.log("Hello, "+(n||"Guest")+"!")}greet("John");
```

:::

As you can see, I created the minified version by removing all the line breaks and whitespaces. Apart from this, I used shortened variables, like “**n**” instead of “**Name**.” Finally, I also replaced the If Else statement with a shorter n || "Guest" expression.

This is how you can easily condense the entire HTML, CSS, and JavaScript code of your website, and enhance the overall loading speed.

Just keep in mind that there are multiple downsides of code minification. For instance, it significantly impacts code readability and can cause challenges in debugging and maintenance. So use this approach judiciously.

### 2.  Image & Media Optimization:

Apart from code, unoptimized images, [<FontIcon icon="fas fa-globe"/>logo files](https://logocreator.io/blog/logo-file-formats/) and other media files are often the main culprits behind the slow [**loading speed**](/freecodecamp.org/developers-guide-to-website-speed-optimization.md) of a website. This means that you also need to optimize them as well. There are numerous things you can do in this regard.

First of all – you should reduce the image size in terms of storage. It is generally recommended that each [<FontIcon icon="fas fa-globe"/>picture should be less than 500 KB in size](https://foregroundweb.com/image-size/). But note that this size can vary depending on the use case.

It’s also a good idea to choose next-generation picture formats like WebP instead of typical ones like JPEG or PNG. When it comes to video files, it’s also helpful if you go with the embedded ones from platforms like YouTube.

**Now, let us explain all this with a proper example (Before & After).**

Let’s say that a website uses a 2MB JPEG image for its blog post. Its optimization process will involve the following steps:

- Resize the image first. The recommended dimensions are 1200x800.
- Compress the image size using image compression tools (we’ll discuss one such tool later in this article)
- Now, convert the JPEG file into WebP format.
- Add alternative text before publishing

**After optimization:**

- The image file size will now be reduced to KBS somewhere around 120Kb.
- Your website will experience better loading speed as well as an improved user experience.

One more tip that you can consider is [**lazy loading**](/freecodecamp.org/how-lazy-loading-works-in-web-development.md). This means only loading the images and videos when they are about to be consumed.

By taking care of these few things, you can efficiently optimize images and media files to achieve faster loading speeds.

### 3. Manage Plugins & Scripts:

Your website may contain unused plugins and scripts that can cause bloat. So, to remove the extra bits and bytes, it is essential to perform regular check-ins.

First, make sure you deactivate and delete all the plugins that aren’t needed. Then, start exploring more lightweight alternatives for plugins that you are actively using. If you find any, go for them and uninstall the bulky ones to improve performance and enhance security, especially for processes like identity verification. Ensure you’re using the latest, most optimized version..

For example, Revolution Slider is a heavy plugin. It loads large scripts and images on every page, even when not needed. This ultimately affects the overall website speed. Some of its lightweight alternatives that you might consider for this include [<FontIcon icon="fas fa-globe"/>Smart Slider 3](https://smartslider3.com/), or any other CSS-based slider.

Next comes script management. Here you should first limit any third-party scripts, such as excessive code tracking, social media widgets, and embedded content. Apart from this, don’t forget to totally disable scripts on the pages where they aren’t required.

One useful example here is Google Analytics which loads tracking scripts on every page, increasing the request time. To fix this issue, you can use [<FontIcon icon="fa-brands fa-google"/>Google Tag Manager](https://tagmanager.google.com/) to load the scripts only when they are needed.

Additionally, you can use [<FontIcon icon="fas fa-globe"/>no-code workflow automation tools](https://blaze.tech/post/no-code-automation-how-to-streamline-your-business-now) like Zapier, Make, or Uncanny Automator which help streamline processes by reducing reliance on heavy plugins and scripts.

### 4. Server & Hosting Upgrades:

This is the final strategy that you can consider. Your hosting provider plays a key role in deciding the loading speed of the website. So, it’s a good idea to upgrade your hosting plan and get it from a reputable and credible service.

Also, do not forget to enable server-side compression. Doing so will automatically reduce the file sizes before transmission. Optimizing database performance is equally crucial, as [<FontIcon icon="fas fa-globe"/>database observability enables database pipeline analytics](https://liquibase.com/resources/guides/database-observability), helping to identify inefficiencies, reduce query execution time, and enhance overall site responsiveness.

Also, take steps to optimize the database queries. You can do this by removing unnecessary data while also caching data mechanisms. There are also specialized plugins available for this like [<FontIcon icon="fas fa-globe"/>WP-Optimize](https://wordpress.org/plugins/wp-optimize/). It effectively cleans up all the unnecessary data saving valuable time and effort.

You should also start caching queries. Store all the frequent ones in memory. This will significantly reduce database load.

```sql
SELECT * FROM products WHERE category = 'Laptops' CACHE;
```

This prevents the server from re-executing the same query repeatedly.

So, these are some of the proven strategies you can apply to eliminate additional bits & bytes from the website to achieve faster loading.

---

## Tools That You Can Use to Streamline the Process

To simplify the process of optimizing website loading speed, you can consider utilizing the following tools.

1. Minifier

<SiteInfo
  name="Minify JS and CSS online, or include the minifier in your project for on-the-fly compression."
  desc="Minify JS and CSS online, or include the minifier in your project for on-the-fly compression."
  url="https://minifier.org/"
  logo="https://minifier.org/web_assets/frontend/img/favicon.ico"
  preview="https://minifier.org/img/logo_150.png"/>

First of all, we have Minifier, a dedicated tool that is specifically designed to automate the code minification process with a single click. It is available for free and works for HTML, CSS, and JavaScript codes.

Besides this, the tool features a user-intuitive interface so that you can quickly navigate through it. The minifier is trained according to both development and minification to ensure maximum speed and accuracy in the output.

All you need to do is either paste or upload the code file into the tool, hit the “**Minify**” button, and get a condensed version. You can check out the below screenshot to get a better idea how it works.

![Screenshot showing Minify result](https://lh7-rt.googleusercontent.com/docsz/AD_4nXcu5gaAosAaUCZQ7oIp3J_m_CIEyAshp2Ob6rmguvQOQvxuuz6rXJ1QdO_FSD_McnO1S-fkqv38cY7B0e4s5xBtjNa78mVns2VZRe3iUemWxR-dKgct9-OJkb6YIO2fTkhB_W3If4DYj6hb2vnzknY?key=W-8S2j9mlTlf7KW39H_m9bHu)

Minify also offers a wide variety of other useful tools you can use if needed. Some notable options include JSON minifier and XML formatter, among others.

So now there is no need to spend time and effort on manually minifying your code for better loading speed. You can just use this tool and get the job done with a single click.

### 2. TinyPNG

<SiteInfo
  name="TinyPNG – Compress AVIF, WebP, PNG and JPEG images"
  desc="Free online image optimizer for faster websites! Reduce the file size of your AVIF, WEBP, JPEG and PNG images while preserving the image quality. "
  url="https://tinypng.com/"
  logo="https://tinypng.com/images/favicon.ico"
  preview="https://tinypng.com/images/social/website.jpg"/>


![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXckb9b-_Pfw-T4icivrTC6g_pnhjpu3BSK0s-7ussuhsRRY22qGNe8DAyUINv8GgGQ5DmY579muEPcGkCjRsbSZofP9XZ1y3xqPBYriFDyh_2vl6yWM4fNYBKaA7k5Jx05pRjjw3ShVU3tT3JjeHwM?key=W-8S2j9mlTlf7KW39H_m9bHu)

Many of you may have heard of or even used this tool. It is an image compression tool that will help you effectively reduce your image sizes for optimization. The good thing is that TinyPNG perfectly preserves the original quality of the picture (in terms of resolution) even after the compression.

All you need to do is upload the required photo from your local storage, and the tool will automatically provide a compressed version. Don’t worry about the file format, as TinyPNG supports JPG, PNG, JPEG, and many more.

The tool even provides the percentage of how much the uploaded image was compressed, like -51%, and so on. It also mentions the size of the compressed photo in terms of KBs. So, in case you are not satisfied with the file size, you can further compress it.

### 3. PNG to WebP Converter

```component VPCard
{
  "title": "PNG to WEBP | CloudConvert",
  "desc": ">PNG to WEBP Converter - CloudConvert is a free & fast online file conversion service.",
  "link": "https://cloudconvert.com/png-to-webp/",
  "logo": "https://cloudconvert.com/png-to-webp/images/logo_flat_32.png",
  "background": "rgba(152,47,45,0.2)"
}
```

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXcSaBUNNRRqk5A4EetHdg1CK1P6F-Ro213s3DnifuZZFF24BNJZHsP_qXjVe1rn72iPH2jZd707JRsOSIUe7PzEAH7jE0ccacHXaEbqJ0YDILtM4K4gF5IYao0wOpJ13jw-xNOzrKaJiRP926kjqQ?key=W-8S2j9mlTlf7KW39H_m9bHu)

As I mentioned earlier, I recommend using next-gen image formats like WebP instead of older formats when possible. Usually, the widely used format is PNG, but to seamlessly convert into WebP, you can use this PNG to WebP converter.

It’s available for free and does not ask for registration/signup. Simply visit the page and start performing conversions. The conversion is performed without causing any damage to the image’s quality and formatting.

The tool also offers many extra features. For instance, you can adjust both the image’s width and height. You can also set image quality (WebP compression level) if required. And it doesn’t stop here – you can even select the right fit for the photo from the following options:

- Max
- Crop
- Scale

### 4. Google PageSpeed Insight

<SiteInfo
  name="PageSpeed Insights"
  desc="Make employees, applications and networks faster and more secure everywhere, while reducing complexity and cost."
  url="https://pagespeed.web.dev/"
  logo="https://pagespeed.web.dev/gstatic.com/pagespeed/insights/ui/logo/favicon_48.png"
  preview="www.gstatic.com/pagespeed/insights/ui/img/graphic-home-hero.svg"/>

How can you enhance the loading speed of the website when you don’t even know which elements are causing issues? For this purpose, Google PageSpeed Insight is the best solution. It is developed and managed by Google.

The tool effectively crawls the given page link and highlights all the issues that are causing slow loading. It even provides four different scores (0-100) for evaluation. These include:

- Performance
- Accessibility
- Best Practices
- SEO

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXet-k73bv-y0HQXbGHfrcntmms8k_nQvcrrADNI3w9cBrFKGv9CAkMSEdOCWHFVyuRQxVXaUseYQxIa_2GA9Hl7TzDGSSO_vZqZliiX32ZNdkvoQZYhCf4i3PyKtGHOzk8pwqZ6O-gZRCwPC3gzBt0?key=W-8S2j9mlTlf7KW39H_m9bHu)

The good thing is that Google PageSpeed Insights evaluates the page for both mobile and desktop users. The results are also provided separately. The areas of improvement are highlighted in red, along with the necessary instructions you can take. The good parts are marked with green.

By utilizing this tool, you can easily evaluate your website and then make efforts to improve the loading speed.

### 5. Cloudflare

<SiteInfo
  name="Connect, protect, and build everywhere"
  desc="Make employees, applications and networks faster and more secure everywhere, while reducing complexity and cost."
  url="https://cloudflare.com/"
  logo="https://cloudflare.com/favicon.ico"
  preview="https://cf-assets.cloudflare.com/slt3lc6tev37/2FNnxFZOBEha1W2MhF44EN/e9438de558c983ccce8129ddc20e1b8b/CF_MetaImage_1200x628.png"/>

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXeKEUhCvUoLArPXA_KRMaH4ws28-YXc6OSzP9idKqis14maZynQIrYUoHaJWF1LJ20q7UcFjAhUGc7WRKpk1S37tkaanh5VRqguD2u7ICzp5eFY5e0mMNjZJU_yl-YCm2O1hdaq2gsnwpWJDbPMGGI?key=W-8S2j9mlTlf7KW39H_m9bHu)

Last but not least, Cloudflare is a good tool that helps enhance the loading speed of a website by using its global content delivery network (CDN). With this feature, it caches static content across different servers worldwide. This ultimately reduces the overall latency and improves loading speed for users in different locations.

Besides this, Cloudflare also offers a bunch of other features. For example, it automatically minifies HTML, CSS, and JavaScript files. It can even compress and convert images into next-gen formats, especially WebP.

It offers a robust DNS resolution that reduces lookup times and helps the page load faster. This feature also protects the site from DDoS attacks.

---

## Wrapping Up

If you want to experience higher ranking and increased user engagement, then you need to optimize your website’s loading speed. The extra bits and bytes like code files, media, and so on can cause real hurdles – but don’t worry.

By using these strategies and tools, you’ll be able to speed up page loading in no time. I hope you found this article interesting and valuable.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Speed Up Website Loading by Removing Extra Bits and Bytes",
  "desc": "Let’s start with an interesting fact: according to research done by Akamai, a 1-second delay in loading a website’s page can decrease the conversion rate by 7%. We are currently living in a fast-paced world, where time is money for everyone. People e...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/speed-up-website-loading.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
