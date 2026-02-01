---
lang: en-US
title: "Powerful CSS-Techniques For Effective Coding"
description: "Article(s) > Powerful CSS-Techniques For Effective Coding"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - smashingmagazine.com
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Powerful CSS-Techniques For Effective Coding"
    - property: og:description
      content: "Powerful CSS-Techniques For Effective Coding"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/smashingmagazine.com/powerful-css-techniques-for-effective-coding.html
prev: /programming/css/articles/README.md
date: 2008-02-21
isOriginal: false
author:
  - name: Vitaly Friedman
    url : https://smashingmagazine.com/author/vitaly-friedman/
cover: https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/1d08a86e-3d1f-4e96-b65a-35cdc0777b34/silverback.jpg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "CSS > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/css/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Powerful CSS-Techniques For Effective Coding"
  desc="Sometimes being a web-developer is just damn hard. Particularly **coding** is often responsible for slowing down our workflow, reducing the quality of our work and sleepless nights with pizza and coffee laying around the laptop. Reason: with a number of incompatibility issues and quite creative rendering engines it sometimes takes too much time to find a workaround for some problem without addressing browsers with quirky hacks. And that's where ready-to-use solutions developed by other designers come in handy."
  url="https://smashingmagazine.com/2008/02/powerful-css-techniques-for-effective-coding/"
  logo="https://smashingmagazine.com/images/favicon/favicon.svg"
  preview="https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/1d08a86e-3d1f-4e96-b65a-35cdc0777b34/silverback.jpg"/>

Sometimes being a web-developer is just damn hard. Particularly **coding** is often responsible for slowing down our workflow, reducing the quality of our work and sleepless nights with pizza and coffee laying around the laptop. Reason: with a number of incompatibility issues and quite creative rendering engines it sometimes takes too much time to find a workaround for some problem without addressing browsers with quirky hacks. And that’s where ready-to-use solutions developed by other designers come in handy.

Sometimes being a web-developer is just damn hard. Particularly **coding** is often responsible for slowing down our workflow, reducing the quality of our work and sleepless nights with pizza and coffee laying around the laptop. Reason: with a number of incompatibility issues and quite creative rendering engines it sometimes takes too much time to find a workaround for some problem without addressing browsers with quirky hacks. And that’s where ready-to-use solutions developed by other designers come in handy.

One year ago we’ve published the post with [**53 CSS-Techniques You Couldn’t Live Without**](/smashingmagazine.com/53-css-techniques-you-couldnt-live-without.md) where we provided references to the **most useful CSS-techniques** which are often used in almost every project. Over the last year we’ve been observing what’s happening with the CSS-based web-development, and we collected most useful CSS-techniques we’ve stumbled upon — for us and for our readers.

::: info Further Reading on SmashingMag:

- [50 New Useful CSS Techniques, Tutorials and Tools](https://smashingmagazine.com/2010/10/50-new-useful-css-techniques-tutorials-and-tools/)
- [50 New CSS Techniques For Your Next Web Design](https://smashingmagazine.com/2009/07/50-new-css-techniques-for-your-next-web-design/)
- [50 Useful Coding Techniques (CSS Layouts, Visual Effects and Forms)](https://smashingmagazine.com/2010/02/50-css-and-javascript-techniques-for-layouts-forms-and-visual-effects/)
- [50 Useful Tools and Resources For Web Designers](https://smashingmagazine.com/2010/07/50-useful-tools-and-resources-for-web-designers/)

:::

In this post we present **50 new CSS-techniques, ideas and ready-to-use solutions for effective coding**. You definitely know some of them, but definitely not all of them. Some technique is missing? Let us know in the comments to this post.

Thanks to all developers who contributed to the [CSS-based design](https://smashingmagazine.com/2007/05/70-expert-ideas-for-better-css-coding-2/) over the last year. The community appreciates it.

---

## CSS-Techniques

<!-- [CSS Server-Side Pre-Processor](https://shauninman.com/archive/2007/06/27/css_server_side_pre_processor)

[![CSS-Technique](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/22a22975-7bfb-48a9-b30e-8b421677bb79/css03.png)](https://shauninman.com/archive/2007/06/27/css_server_side_pre_processor)

[Advanced CSS Menu](https://webdesignerwall.com/tutorials/advanced-css-menu/)

[![CSS-techniques - Advanced CSS Menu](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/3571db71-2641-47bd-afc4-533b96e7e820/css32.png)](https://webdesignerwall.com/tutorials/advanced-css-menu/)

1. [Styling File Inputs with CSS and the DOM](https://shauninman.com/archive/2007/09/10/styling_file_inputs_with_css_and_the_dom)

File inputs (`<input type=“file” />`) are the bane of beautiful form design. No rendering engine provides the granular control over their presentation designers desire. This simple, three-part progressive enhancement provides the markup, CSS, and JavaScript to address the long-standing irritation.

[![CSS-Technique](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/bad172f4-7cf0-45c6-b627-2d44134c95ff/css01.png)](https://shauninman.com/archive/2007/09/10/styling_file_inputs_with_css_and_the_dom)

 -->

```component VPCard
{
  "title": "Derek Powazek -   A Savvy Approach to Copyright Messaging",
  "desc": "I’m a photographer. I’m also a web geek. And those two sides of my brain sometimes fight with each other. As a photographer, I’m outraged when people grab photos off the web and use them without consideration of copyright. I’ve been fighting this “It’s on the internet, so it must be free!” ignorance for more than a decade.",
  "link": "https://powazek.com/posts/867/",
  "logo": "https://powazek.com/favicon.ico",
  "background": "rgba(244,245,255,0.2)"
}
```

Derek Powazek suggests adding a copyright message to a photo and use CSS to crop its view. This is supposed to accomplish the goal of adding robust copyright information without defacing your own work.

![](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/ef76c172-c849-4138-9460-51bc8e915cba/css50.png)

<SiteInfo
  name="Advanced Web Design Menu Effect Using Only CSS"
  desc="We demonstrate the power of CSS by creating an interactive menu experience without javascript."
  url="https://threesevenmarketing.com/blog/advanced-css-menu-trick//"
  logo="https://threesevenmarketing.com/wp-content/uploads/2026/01/cropped-Favicon-192x192.png"
  preview="https://threesevenmarketing.com/blog-assets/images/adv_menu_lrg.jpg"/>

What we want to do here, is instead of simply altering the state of the navigation item the user is currently rolling over, we want to alter the non navigation items as well.

![](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/d6def32e-e402-4c87-b6c8-a4bb384b91b1/css60.png)

<!-- 1. [CSS hover effect](https://veerle.duoh.com/blog/comments/css_hover_effect/)

[![CSS-techniques - CSS hover effect | Veerle's blog](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/3b2235df-c6a3-40d9-9074-ade83e6650af/css47.png)](https://veerle.duoh.com/blog/comments/css_hover_effect/)

1. [Creating a table with dynamically highlighted columns like Crazy Egg’s pricing table](https://askthecssguy.com/2007/08/creating_a_table_with_dynamica.html)

[![CSS-techniques - Creating a table with dynamically highlighted columns like Crazy Egg's pricing table](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/6a9f69be-1703-41f0-a5aa-d0ace4fee1f0/css43.png)](https://askthecssguy.com/2007/08/creating_a_table_with_dynamica.html)

1. [Rediscovering the Button Element](https://particletree.com/features/rediscovering-the-button-element/)

[![CSS-techniques - Particletree » Rediscovering the Button Element](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/4d5c1013-e44f-44ad-9d00-143a12f1a028/css54.png)](https://particletree.com/features/rediscovering-the-button-element/)

1. [A CSS styled table version 2](https://veerle.duoh.com/blog/comments/a_css_styled_table_version_2/)

[![CSS-techniques - A CSS styled table version 2 | Veerle's blog](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/e506406c-05bc-4865-bed6-f33545d3f8e6/css46.png)](https://veerle.duoh.com/blog/comments/a_css_styled_table_version_2/)

1. [CSS Step Menu](https://codylindley.com/CSS/325/css-step-menu)

A method of designing the so-called step-menus, which have some steps users have to go through in order to achieve some aim. This menu offers a varying amount of steps, dependent upon the type of user accessing the application.

[![Stepmenu](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/2177c7a2-c635-4059-8b8e-e46f3b0faa0b/css52.png "Stepmenu")](https://codylindley.com/CSS/325/css-step-menu) -->

```component VPCard
{
  "title": "Creating bulletproof graphic link buttons with CSS | 456 Berea Street",
  "desc": "How to use CSS and two images to create flexible, shrinkwrapping, image based link buttons.",
  "link": "https://456bereastreet.com/archive/200705/creating_bulletproof_graphic_link_buttons_with_css//",
  "logo": "https://456bereastreet.com/favicon.ico",
  "background": "rgba(51,51,51,0.2)"
}
```

![CSS-techniques - Creating bulletproof graphic link buttons with CSS | 456 Berea Street](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/b9d61236-8de2-458a-b2b4-1f40231d8c34/css19.png)

```component VPCard
{
  "title": "Better Ordered Lists (Using Simple PHP and CSS)",
  "desc": "Ordered lists are boring! Sure you can apply background images and do quite a bit of sprucing up to a regular ordered list, but you just don't get enough",
  "link": "/css-tricks.com/better-ordered-lists-using-simple-php-and-css.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

Ordered lists are boring! Sure you can apply background images and do quite a bit of sprucing up to a regular ordered list, but you just don’t get enough control over the number itself.

![Screenshot](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/d687bba9-919b-4ab9-a840-17fa58d6391a/css51.png)

```component VPCard
{
  "title": "CSS Dock Menu",
  "desc": "If you are a big Mac fan, you will love this CSS dock menu. It is using Jquery library and Fisheye component from Interface and some of my icons. It comes with two dock position: top and bottom. This CSS dock menu is perfect to add on to my iTheme. Here I will show you how to implement it to your web page",
  "link": "https://ndesign-studio.com/blog/css-dock-menu/",
  "logo": "https://ndesign-studio.com/favicon.ico",
  "background": "rgba(229,0,0,0.2)"
}
```

![CSS-techniques - CSS Dock Menu](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/8a973b42-6117-4016-a032-e786cbfe2526/css48.png)

```component VPCard
{
  "title": "Fade Out Bottom",
  "desc": "This is a cool effect where the bottom of the page seems to fade out. The technique makes use of an fixed position div (bottom: 0px;) with a transparent PNG image and a high z-index value. There is also a fix in place for IE 6",
  "link": "https://css-tricks.com/examples/FadeOutBottom//",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(34,34,34,0.2)"
}
```

This is a demonstration of the effect where the bottom of the page seems to fade out. The technique makes use of an fixed position div (bottom: 0%) with a transparent PNG image and a high z-index value.

![CSS-techniques - Fade Out Bottom](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/7b8f46d1-e815-4130-a5a9-f4a75911e1e3/css59.png)

<!-- 1. [How to Style an A to Z Index with CSS](https://smileycat.com/miaow/archives/000211.php)

[![CSS-techniques - How to Style an A to Z Index with CSS | Smiley Cat Web Design](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/0a7c2e71-c60d-429d-b85b-b66e0642d021/css35.png)](https://smileycat.com/miaow/archives/000211.php)

1. [CSS List Boxes](https://mikecherim.com/gbcms_xml/news_page.php?id=24#n24)

Using a simple unordered list this experiment aligns the boxes across the page with the end result being to showcase items like services, products, or specials. One of cool thing about this — if you turn off styles — is the extractable semantics with the headings and paragraphs used.

[![List Boxes](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/3d2c280b-9cd1-4d4a-9821-0fefb2e047ae/listboxes.jpg "Lists Boxes")](https://mikecherim.com/gbcms_xml/news_page.php?id=24#n24)

1. [How-to create a “Table of Contents” Navigation](https://5thirtyone.com/archives/776)

In as little as 8 lines of HTML, and 5 lines of CSS, the Table Of Contents Navigation block can be integrated in your site ready for even more styling.

[![Table of Contents](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/5a768e51-583a-4527-a08b-a1febc1f9c8a/toc.gif "Table of Contents")](https://5thirtyone.com/archives/776)

1. [CSS Recipe for Success](https://search-this.com/2007/11/26/css-a-recipe-for-success/)

[![CSS-techniques - CSS - A Recipe for Success](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/14a65582-3598-4d70-ae86-de4de68ae4b7/css12.png)](https://search-this.com/2007/11/26/css-a-recipe-for-success/)

1. [Partial Opacity](https://cssplay.co.uk/opacity/png.html)

[![CSS-techniques - Stu Nicholls | CSSplay | Partial Opacity](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/049b5025-2cc0-4c1a-af01-f71967207071/css33.png)](https://cssplay.co.uk/opacity/png.html)

1. [CSS Double Lists](https://mikecherim.com/experiments/css_double_lists.php)

[![CSS-techniques - CSS: Double Lists | Mike’s Experiments | MikeCherim.com](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/f51e4b2f-1e4d-4d28-8222-eb9e8462fc31/css37.png)](https://mikecherim.com/experiments/css_double_lists.php)

1. [Perspective Text with CSS](https://mikecherim.com/gbcms_xml/news_page.php?id=30#n30)

[![CSS-techniques - Mike’s Experiments: Archives Page | A Record of My Madness | Powered by the GreenBeast CMS RSS Newsmaker - -](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/6f802205-8968-45ee-8a13-86772a259f81/css29.png)](https://mikecherim.com/gbcms_xml/news_page.php?id=30#n30) -->

1. [Better Email Links: Featuring CSS Attribute Selectors](https://css-tricks.com/better-email-links-featuring-css-attribute-selectors/)

Learn how to generate code for displaying the e-mail automatically once mailto is used. CSS Attribute Selectors in action which is not supported by Internet Explorer 6 and 7. [![Screenshot](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/45001c9c-fec4-4ae2-b0ad-91c83601e0ec/bel.png)](https://css-tricks.com/better-email-links-featuring-css-attribute-selectors/)

1. [CSS: Menu Descriptions](https://mikecherim.com/experiments/css_menu_descriptions.php#)

This is a CSS technique that could be useful if you want to give users accessible added content such as tool-tips, notifications, or alerts, without adding unnecessary clutter to your page. And since it doesn’t rely of JavaScript, it should be useful to everyone, even disabled users.

[![Screenshot](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/4f925655-6f08-4eb3-9d2c-981ac37cdbbc/css61.png)](https://mikecherim.com/experiments/css_menu_descriptions.php)

---

## Further Techniques

1. [CSS Transparency Settings for All Browsers](https://css-tricks.com/css-transparency-settings-for-all-broswers/)

[![CSS-techniques - CSS Transparency Settings for All Browsers](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/6af18fc3-274a-4ef4-a14f-3527dc80bae8/css11.png)](https://css-tricks.com/css-transparency-settings-for-all-broswers/)

1. [Custom Reading Containers](https://devlounge.net/articles/custom-reading-containers)

This amazing little script allows the user to resize any container.

1. [Eric Meyer’s CSS Reset](https://meyerweb.com/eric/tools/css/reset/)

[![CSS-techniques - CSS Tools: Reset CSS](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/d53adf42-20f6-4ecb-97d4-d73a07f54999/css27.png)](https://meyerweb.com/eric/tools/css/reset/)

1. [PNG Overlay](https://sonspring.com/journal/png-overlay)

Create a transparent PNG overlay which can be used as a mask / frame around regular JPEG or GIF so users can upload photos without having to worry about using any graphics program to apply filters, plus it saves time.

1. [Turning Lists into Trees](https://odyniec.net/articles/turning-lists-into-trees/)

[![CSS-techniques - odyniec.net](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/6f802205-8968-45ee-8a13-86772a259f81/css29.png)](https://odyniec.net/articles/turning-lists-into-trees/)

1. [Create Resizable Images With CSS](https://smileycat.com/miaow/archives/000648.php)

[![CSS-techniques - Create Resizable Images With CSS | Smiley Cat Web Design](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/0bf04dcf-983c-42f2-8fd4-e85d689fa125/css40.png)](https://smileycat.com/miaow/archives/000648.php)

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Powerful CSS-Techniques For Effective Coding",
  "desc": "Sometimes being a web-developer is just damn hard. Particularly **coding** is often responsible for slowing down our workflow, reducing the quality of our work and sleepless nights with pizza and coffee laying around the laptop. Reason: with a number of incompatibility issues and quite creative rendering engines it sometimes takes too much time to find a workaround for some problem without addressing browsers with quirky hacks. And that's where ready-to-use solutions developed by other designers come in handy.",
  "link": "https://chanhi2000.github.io/bookshelf/smashingmagazine.com/powerful-css-techniques-for-effective-coding.html",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```
