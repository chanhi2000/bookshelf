---
lang: en-US
title: "Backgrounds for the Box Model (and why it can be useful)"
description: "Article(s) > Backgrounds for the Box Model (and why it can be useful)"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - frontendmasters.com
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Backgrounds for the Box Model (and why it can be useful)"
    - property: og:description
      content: "Backgrounds for the Box Model (and why it can be useful)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/backgrounds-for-the-box-model-and-why-it-can-be-useful.html
prev: /programming/css/articles/README.md
date: 2024-09-02
isOriginal: false
author: 
  - name: Chris Coyier
    url: https://frontendmasters.com/blog/author/chriscoyier/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/3716
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
  name="Backgrounds for the Box Model (and why it can be useful)"
  desc="You can limit how far the background-image of an element applies by using background-clip. That means you can apply *different* backgrounds to, say, the padding and border."
  url="https://frontendmasters.com/blog/backgrounds-for-the-box-model-and-why-it-can-be-useful/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/3716"/>

I had someone write to me the other day that they were trying to visualize the different parts of the box model. They said they would just code up an example themselves, but there is no way to, say, set a background color for *just* the “padding” area of an element.

What they were talking about is something like this, the box model diagram available in DevTools:

![Box Model in Chrome DevTools](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/09/box-model.png?resize=594%2C366&ssl=1)

I said, I think you… can! actually!

The trick lays in using the `background-clip` property in CSS, which allows you to stop the `background-image` property at different points in the box model. Here’s a really basic example of doing that, using the same colors as the model above:

<CodePen
  user="chriscoyier"
  slug-hash="OJeBjGZ"
  title="Box Model with Colors"
  :default-tab="['css','result']"
  :theme="dark"/>

The only one I’m “faking” there is the very outer shape (margin), which is drawn with an `outline`. It does match the value of `margin` though so it’s basically real!

I was a bit inspired to keep going, making all the values dynamic, so I made this, which labels the section as well.

<CodePen
  user="chriscoyier"
  slug-hash="gONzpYb"
  title="Box Model with Colors"
  :default-tab="['css','result']"
  :theme="dark"/>

I put a grid of content around it so that you could see the element push others away like the real box model does.

Is this actually useful ever? Sometimes!

Just the other day Wes Bos posted a really nice button effect and then re-created in HTML and CSS:

There is no real big problem with how Wes did it there, but he did use an extra element as well as pseudo elements to get it done. [Here’s his demo. (<VPIcon icon="fa-brands fa-codepen"/>`wesbos`)](https://codepen.io/wesbos/pen/PoraMVV)

<CodePen
  user="wesbos"
  slug-hash="PoraMVV"
  title="Cool Button Outline"
  :default-tab="['css','result']"
  :theme="dark"/>

Ana Tudor [chimed in (<VPIcon icon="fa-brands fa-x-twitter"/>`anatudor`)](https://x.com/anatudor/status/1828680421078421627) that it could be done without using any extra elements, and guess how? Background clipping!

I took a crack at that, and aside from a bit of an awkward need to set the `background-size`, I think I got it working:

<CodePen
  user="chriscoyier"
  slug-hash="JjQmrYE"
  title="Rotating Border Glow Effect with Background Clip"
  :default-tab="['css','result']"
  :theme="dark"/>

This may actually be truly useful sometimes. For example, a CMS that is happy to spit out a `<button>` element but doesn’t offer inner HTML control of it. If you don’t need that anyway and can pull of the effect in CSS entirely, you’re in business.

Because I’m a glutton for punishment sometimes, I also decided to have a crack at it using `border-image` as well, which despite being the lest scrutable CSS property of all time, seems at least conceptually like the correct thing to use. I was able to get it working!

<CodePen
  user="chriscoyier"
  slug-hash="MWMPwVe"
  title="Rotating Border Glow Effect with Border-Image"
  :default-tab="['css','result']"
  :theme="dark"/>

But for whatever reason `border-image` is incompatible with `border-radius`, so, whatever, that sucks.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Backgrounds for the Box Model (and why it can be useful)",
  "desc": "You can limit how far the background-image of an element applies by using background-clip. That means you can apply *different* backgrounds to, say, the padding and border.",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/backgrounds-for-the-box-model-and-why-it-can-be-useful.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
