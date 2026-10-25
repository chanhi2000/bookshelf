---
lang: en-US
title: "PrefixFree: Break Free From CSS Prefix Hell"
description: "Article(s) > PrefixFree: Break Free From CSS Prefix Hell"
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
      content: "Article(s) > PrefixFree: Break Free From CSS Prefix Hell"
    - property: og:description
      content: "PrefixFree: Break Free From CSS Prefix Hell"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/smashingmagazine.com/prefixfree-break-free-from-css-prefix-hell.html
prev: /programming/css/articles/README.md
date: 2011-10-12
isOriginal: false
author:
  - name: Lea Verou
    url: https://smashingmagazine.com/author/lea-verou/
cover: https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/606cb0af-fa8d-47d5-81fd-abe9a5b69b20/prefixfree-main.jpg
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
  name="PrefixFree: Break Free From CSS Prefix Hell"
  desc="A solution for when prefixes cause maintenance troubles, bloat CSS files, and make it harder to tweak values. In this article, Lea Verou presents her recent tool: prefixfree."
  url="https://smashingmagazine.com/2011/10/prefixfree-break-free-from-css-prefix-hell/"
  logo="https://smashingmagazine.com/images/favicon/favicon.svg"
  preview="https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/606cb0af-fa8d-47d5-81fd-abe9a5b69b20/prefixfree-main.jpg"/>

A solution for when prefixes cause maintenance troubles, bloat CSS files, and make it harder to tweak values. In this article, Lea Verou presents her recent tool: prefixfree.

::: note Editor’s note

This article is the first piece in our new series introducing new, useful and freely available tools and techniques presented and released by active members of the Web design community. Lea Verou is well-known for her experiments with CSS and JavaScript and in this post she presents her recent tool, prefixfree, which will hopefully help you break free from the CSS prefix hell.

:::

### So What’s The Problem With Prefixes?

I’m sure we all agree that CSS3 is pretty cool and that it enables us to do things that were previously impossible. But those of us who use CSS3 a lot have surely experienced prefix hell, as seen in the snippet below (from a real style sheet!):

```css
.download {
   position: absolute;
   top: 1em;
   left: -1.5em;
   width: 6em;
   height: 6em;
   padding: 1em 0;
   background: #80A060;
   background-image: -webkit-linear-gradient(transparent, rgba(0,0,0,.3));
   background-image: -moz-linear-gradient(transparent, rgba(0,0,0,.3));
   background-image: -o-linear-gradient(transparent, rgba(0,0,0,.3));
   background-image: -ms-linear-gradient(transparent, rgba(0,0,0,.3));
   background-image: linear-gradient(transparent, rgba(0,0,0,.3));
   color: white;
   line-height: 1;
   font-size: 140%;
   text-align: center;
   text-decoration: none;
   text-shadow: .08em .08em .2em rgba(0,0,0,.6);
   -webkit-border-radius: 50%;
   -moz-border-radius: 50%;
   border-radius: 50%;
   -webkit-box-shadow: .1em .2em .4em -.2em black;
   -moz-box-shadow: .1em .2em .4em -.2em black;
   box-shadow: .1em .2em .4em -.2em black;
   -webkit-box-sizing: border-box;
   -moz-box-sizing: border-box;
   box-sizing: border-box;
   -ms-transform: rotate(15deg);
   -webkit-transform: rotate(15deg);
   -moz-transform: rotate(15deg);
   -o-transform: rotate(15deg);
   -ms-transform: rotate(15deg);
   transform: rotate(15deg);
   -webkit-animation: none;
   -moz-animation: none;
   animation: none;
}
```

I’m not saying that prefixes are bad. [**We need them**](/alistapart.com/prefix-or-posthack.md). But the reality is that, in most cases, they cause maintenance troubles, they bloat CSS files, and they make it harder to tweak values (because you have to do it up to five times).

### A Solution: prefixfree

The code I write in my live demo slides and presentations doesn’t have any prefixes, even for things like `@keyframes` or the `transition` property, which aren’t yet supported anywhere prefix-less. To be able to do this, I wrote a script that detects the prefix of the current browser and adds it where needed. Recently, I thought, why not adapt the script to process all of the CSS code on a page, so that the CSS in my style sheets is as elegant as the code in my demos? Shortly after, [<VPIcon icon="fas fa-globe"/>prefixfree](https://leaverou.github.com/prefixfree/) was born.

[![](https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/606cb0af-fa8d-47d5-81fd-abe9a5b69b20/prefixfree-main.jpg)](https://leaverou.github.com/prefixfree/)

The script essentially does everything in JavaScript’s power to allow you to **completely forget about vendor prefixes**. It processes linked style sheets (except the ones in `@import` rules), embedded style sheets, inline styles, even CSS added afterwards (such as in new elements, CSSOM property changes and lookups). And if, in rare cases, you want to use a different definition for a different engine (for example, because one’s implementation is buggy), you can still use prefixed CSS.

The good thing about *prefixfree* is that once the browser vendors drop their prefixes for CSS3 properties, you can just remove the script and your CSS will still work. Your code will continue to be valid CSS3 (so valid that it will even pass a CSS validator). Your code does not depend on it (unlike CSS preprocessors); rather, it functions more like a polyfill, smoothing out browser differences for the time being.

Another useful feature is that the script **auto-detects which properties need prefixing**. Its code has no property list. It detects which properties are supported and which of them are supported *only* with a prefix. Values, selectors and @rules are based on predefined lists, but they are still prefixed *only* when needed. No browser sniffing is involved; everything is based on feature detection.

[![](https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/7ab36c8d-a70f-4b3f-bebf-251ce29c5bc5/prefixfree-500px.jpg)](https://leaverou.github.com/prefixfree/)

Unlike [<VPIcon icon="fas fa-globe"/>other solutions](https://prefixr.com/), *prefixfree* adds the current prefix at runtime, so the user downloads a much smaller CSS file. Some might argue that pre-processed CSS is faster because no client-side processing is involved. To some extent, this is true, but in my experiments there was no significant lag. With the borderline exception of Opera, it was hardly noticeable.

Also, there are a few server-side solutions, but there are two main issues with those. Firstly, the file size of the CSS file is still huge, as it has to contain all the prefixes (and the unprefixed versions). And secondly, the server-side script has to maintain lists of properties at all times, because they cannot be automatically detected, like with *prefixfree*.

So, what does the rule above become with *prefixfree*? It becomes this beauty:

```css
.download {
   position: absolute;
   top: 1em;
   left: -1.5em;
   width: 6em;
   height: 6em;
   padding: 1em 0;
   background: #80A060;
   background-image: linear-gradient(transparent, rgba(0,0,0,.3));
   color: white;
   line-height: 1;
   font-size: 140%;
   text-align: center;
   text-decoration: none;
   text-shadow: .08em .08em .2em rgba(0,0,0,.6);
   border-radius: 50%;
   box-shadow: .1em .2em .4em -.2em black;
   box-sizing: border-box;
   transform: rotate(15deg);
   animation: none;
}
```

### Isn’t It Something That’s Better Done Server-Side?

This is a valid argument, and there are advantages and disadvantages to both approaches. Using a server-side script means that:

- It has to be updated very, very often as browser support changes and prefixes aren’t needed any more. PrefixFree automatically detects what needs a prefix and what doesn’t.
- All the prefixes need to be downloaded, which adds lots of bloat. In a medium size stylesheet, that’s far more bloat than the size of prefixfree.js.
- In cases of preprocessors like LESS and SASS, you depend on their proprietary syntax, so you can’t just remove the script after a few years.

However, there are some benefits to doing it on the server-side:

- It takes longer to download, but the user doesn’t see the un-CSS3-ed version of the style at all. With PrefixFree there will be a tiny delay.
- It will work the same even when JavaScript is disabled. Although, with PrefixFree, if the JS is disabled, the user will just see the design without some CSS3, but it will still be perfectly functional. If your CSS is written correctly, *the design should be functional without CSS3 anyway*.

Personally, I think it boils down to a matter of personal decision and whether the advantages are more important for you than the disadvantages.

::: info Download The Script On GitHub!

You can [<VPIcon icon="fas fa-globe"/>download prefixfree from GitHub](https://leaverou.github.com/prefixfree). The minified version is less than 5 KB, which becomes less than 2 KB after Gzip’ing. Please keep in mind that it’s still a very early beta and might have bugs. You can [help fix them (<VPIcon icon="iconfont icon-github"/>`LeaVerou/prefixfree`)](https://github.com/LeaVerou/prefixfree), or at least report them in the [issues tracker (<VPIcon icon="iconfont icon-github"/>`LeaVerou/prefixfree`)](https://github.com/LeaVerou/prefixfree/issues). Have fun!

:::

::: info Further Reading

```component VPCard
{
  "title": "An Ultimate Guide To CSS Pseudo Classes And Pseudo Elements",
  "desc": "CSS pseudo-classes and pseudo-elements can certainly be a handful. They provide so many possibilities that one can easily feel overwhelmed, but that’s the life of a web designer and developer! In this guide, Ricardo Zea will teach you all the things you need to keep in mind so that your pseudo-classes and pseudo-elements are well implemented. If you’re an experienced web designer or developer, you must know and have used most of the pseudo-classes and pseudo-elements discussed here. However, you might not have heard of one or two of them before.",
  "link": "/smashingmagazine.com/an-ultimate-guide-to-css-pseudo-classes-and-pseudo-elements.md",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```

```component VPCard
{
  "title": "CSS Variables: The Architecture Backbone",
  "desc": "Using a preprocessor does not automatically upgrade one’s code: A thorough foundation in CSS is a prerequisite. In Karen Menezes’ experience, badly architected and overly abstracted preprocessor code is much harder to debug and maintain than a large CSS file created with basic structure and common sense. Variables can be seen as the backbone of a well-constructed project. Well-commented and well-defined variables set a great foundation for a project of any size. By maintaining a variable-centric approach, we can structure our style sheets with a meaning and modularity that persist beyond the trends that come and go.",
  "link": "/smashingmagazine.com/variables-in-css-architecture.md",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```

```component VPCard
{
  "title": "Scaling Down The BEM Methodology For Small Projects",
  "desc": "To make the right choices for your project, you need to start with a general approach, or methodology. You probably already know of BEM, one of those methodologies developed by a big company, but Maxim Shirshin decided to try BEM on a smaller scale. He wanted the same benefits that Yandex gets from BEM: code sharing, a live style guide, scalability, faster development. He is now convinced that BEM applies to small projects as well. Maxim has written down his findings, in case you find them useful!",
  "link": "/smashingmagazine.com/bem-methodology-for-small-projects.md",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```

```component VPCard
{
  "title": "Flexbox Is As Easy As Pie: Designing CSS Layouts",
  "desc": "Flexible box layout is a new box model optimized for UI layout, and it makes a lot of tasks much easier, or even possible at all. Flexbox’s repertoire includes the simple centering of elements, the expansion and contraction of elements to fill available space, and source-code independent layout, among others abilities.",
  "link": "/smashingmagazine.com/centering-elements-with-flexbox.md",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "PrefixFree: Break Free From CSS Prefix Hell",
  "desc": "A solution for when prefixes cause maintenance troubles, bloat CSS files, and make it harder to tweak values. In this article, Lea Verou presents her recent tool: prefixfree.",
  "link": "https://chanhi2000.github.io/bookshelf/smashingmagazine.com/prefixfree-break-free-from-css-prefix-hell.html",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```
