---
lang: en-US
title: "Accessible SVGs: Perfect Patterns For Screen Reader Users"
description: "Article(s) > Accessible SVGs: Perfect Patterns For Screen Reader Users"
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
      content: "Article(s) > Accessible SVGs: Perfect Patterns For Screen Reader Users"
    - property: og:description
      content: "Accessible SVGs: Perfect Patterns For Screen Reader Users"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/smashingmagazine.com/accessible-svg-patterns-comparison.html
prev: /programming/css/articles/README.md
date: 2021-05-26
isOriginal: false
author:
  - name: Carie Fisher
    url: https://smashingmagazine.com/author/carie-fisher/
cover: https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/35bf2e3a-ae5b-49a3-843a-318b4c81f5af/accessible-svg-patterns.jpg
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
  name="Accessible SVGs: Perfect Patterns For Screen Reader Users"
  desc="Discover which SVG patterns we should avoid and which patterns are the most inclusive when comparing different combinations of OSs, browsers, and screen readers. Carie will also be running an online workshop on Accessible Front-End Patterns all around front-end accessibility. "
  url="https://smashingmagazine.com/2021/05/accessible-svg-patterns-comparison/"
  logo="https://smashingmagazine.com/images/favicon/favicon.svg"
  preview="https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/35bf2e3a-ae5b-49a3-843a-318b4c81f5af/accessible-svg-patterns.jpg"/>

Discover which SVG patterns we should avoid and which patterns are the most inclusive when comparing different combinations of OSs, browsers, and screen readers. Carie will also be running an online workshop on [<VPIcon icon="fas fa-globe"/>Accessible Front-End Patterns](https://smashingconf.com/online-workshops/workshops/carie-fisher) all around front-end accessibility.

While Scalable Vector Graphics (SVGs) were first introduced in the late 90s, they have seen a massive resurgence in popularity in the last decade due to their extreme flexibility, high fidelity, and relative lightness in a world where bandwidth and performance matter more than ever. Advancements in JavaScript and the introduction of CSS media queries such [<VPIcon icon="iconfont icon-caniuse"/>`@prefers-color-scheme`](https://caniuse.com) and [<VPIcon icon="iconfont icon-caniuse"/>`@prefers-reduced-motion`](https://caniuse.com) have extended the functionality of SVGs way beyond their initial use case of simply displaying vector images on a website.

As SVG technology advances, our understanding of how we design and develop SVGs needs to advance as well. Part of that advancement includes considering the impact of such designs and code on actual humans, aka our end users.

This article outlines **twelve distinct SVG patterns** found “in the wild” and each alternative description announced when accessed by different combinations of operating systems, browsers, and screen readers.

Of course, the following examples are not meant to be an exhaustive list of all the possible patterns being used in the digital sphere, but they do highlight some of the more popular or **ubiquitous SVG patterns** you might encounter. Continue reading to discover which SVG patterns you should avoid and which patterns are the most inclusive!

---

## Basic Alternative Descriptions Using The `<img>` Tag

The first group of four patterns utilizes the `<img>` tag linking out to an SVG file. This is a good choice for basic, uncomplicated images on your website, app, or other digital product. While the drawback to using this pattern is that you cannot easily control many visual elements or animations as an inline SVG, this pattern should render lighter and faster images overall and allow for easier maintenance on SVGs that you use in multiple locations.

### Pattern #1: `<img>` + `alt="[words]"`

![fox illustration presented in the codepen example](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/48790836-d63d-4447-b508-69a444240f88/1-accessible-svg-pattern-comparison.png)

```xml
<img class="fox" alt="What does the fox say?" src="https://upload.wikimedia.org/wikipedia/commons/3/39/Toicon-icon-fandom-howl.svg">
```

### Pattern #2: `<img>` + `role="img"` + `alt="[words]"`

![fox illustration presented in the codepen example](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/4ab0d4e8-cc8e-4d36-8569-d698dbb69c90/2-accessible-svg-pattern-comparison.png)

```xml
<img role="img" class="fox" alt="What does the fox say?" src="https://upload.wikimedia.org/wikipedia/commons/3/39/Toicon-icon-fandom-howl.svg">
```

### Pattern #3: `<img>` + `role="img"` + `aria-label="[words]"`

![fox illustration presented in the codepen example](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/2248286f-d55a-4d49-967f-76a3c153a7c5/3-accessible-svg-pattern-comparison.png)

```xml
<img role="img" class="fox" aria-label="What does the fox say?" src="https://upload.wikimedia.org/wikipedia/commons/3/39/Toicon-icon-fandom-howl.svg">
```

### Pattern #4: `<img>` + `role="img"` + `aria-labelledby="[ID]"`

![fox illustration presented in the codepen example](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/8dbe384a-56c6-4577-bc9b-f587b8c05663/4-accessible-svg-pattern-comparison.png)

```xml
<p id="caption1" class="visually-hidden">What does the fox say?</p>
<img role="img" aria-labelledby="caption1" class="fox" src="https://upload.wikimedia.org/wikipedia/commons/3/39/Toicon-icon-fandom-howl.svg">
```

---

## Basic Alternative Descriptions Using The `<svg>` Tag

The second group of four patterns utilizes the `<svg>` tag with an inline SVG file. Although adding the SVG code directly into the markup could potentially make the page a bit slower to load, that minor inefficiency will be offset by having more control over the visual elements or animations of your images. By adding your SVG to the HTML directly, you also have more options when it comes to providing image information to your screen reader users.

### Pattern #5: `<svg>` + `role="img"` + `<title>`

![fox illustration presented in the codepen example](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/b1be2146-4ed3-4dd0-b8aa-88ea70112d03/5-accessible-svg-pattern-comparison.png)

```xml
<svg role="img" ...>
  <title>What does the fox say?</title>
  [design code]
</svg>
```

### Pattern #6: `<svg>` + `role="img"` + `<text>`

![fox illustration presented in the codepen example](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/1db57e58-5d73-4fe5-b15f-23fec976b17d/6-accessible-svg-pattern-comparison.png)

```xml
<svg role="img" ...>
  <text class="visually-hidden" font-size="0">What does the fox say?</text>
  [design code]
</svg>
```

### Pattern #7: `<svg>` + `role="img"` + `<title>` + `aria-describedby="[ID]"`

![fox illustration presented in the codepen example](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/533e5f3a-d0b0-4e89-8642-fd355fb557f8/7-accessible-svg-pattern-comparison.png)

```xml
<svg role="img" aria-describedby="fox7" ...>
  <title id="fox7">What does the fox say?</title>
  [design code]
</svg>
```

### Pattern #8: `<svg>` + `role="img"` + `<title>` + `aria-labelledby="[ID]"`

![fox illustration presented in the codepen example](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/03c90ea4-a060-4ea4-a073-0fff9f08a12c/8-accessible-svg-pattern-comparison.png)

```xml
<svg role="img" aria-labelledby="fox8" ...>
  <title id="fox8">What does the fox say?</title>
  [design code]
</svg>
```

---

## Extended Alternative Descriptions Using The `<svg>` Tag

The last group of four patterns utilizes the `<svg>` tag with an inline SVG file, much like the second group. However, in this case, we are extending the simple alternative descriptions with additional information due to the complexity of the image.

This would be a good pattern choice for more complicated images that need more explanation. However, it is important to keep in mind that there are some people with disabilities — like cognitive disorders — who might benefit from having this additional image information readily available on the screen instead of buried in the SVG code.

Depending on the type and amount of information you need to add to your SVG, you might consider taking a different approach altogether.

### Pattern #9: `<svg>` + `role="img"` + `<title>` + `<text>`

![fox illustration presented in the codepen example](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/b20fc272-e17f-4feb-ade6-a3b918b6d535/9-accessible-svg-pattern-comparison.png)

```xml
<svg role="img" ...>
  <title>What does the fox say?</title>
  <text class="visually-hidden" font-size="0">Will we ever know?</text>
   [design code]
</svg>
```

### Pattern #10: `<svg>` + `role="img"` + `<title>` + `<desc>`

[![fox illustration presented in the codepen example](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/b62bed3c-3367-4e55-a4a1-06b350a5d239/10-accessible-svg-pattern-comparison.png)](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/b62bed3c-3367-4e55-a4a1-06b350a5d239/10-accessible-svg-pattern-comparison.png)

```xml
<svg role="img" ...>
   <title>What does the fox say?</title>
   <desc>Will we ever know?</desc>
   [design code]
</svg>
```

### Pattern #11: `<svg>` + `role="img"` + `<title>` + `<desc>` + `aria-labelledby="[ID]"`

[![fox illustration presented in the codepen example](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/b4061618-7397-4957-a887-bb259347df0b/11-accessible-svg-pattern-comparison.png)](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/b4061618-7397-4957-a887-bb259347df0b/11-accessible-svg-pattern-comparison.png)

```xml
<svg role="img" aria-labelledby="fox11 description11" ...>
   <title id="fox11">What does the fox say?</title>
   <desc id="description11">Will we ever know?</desc>
   [design code]
</svg>
```

### Pattern #12: `<svg>` + `role="img"` + `<title>` + `<desc>` + `aria-describedby="[ID]"`

![fox illustration presented in the codepen example](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/23280c8b-5499-42b9-8628-728172b891e2/12-accessible-svg-pattern-comparison.png)

```xml
<svg role="img" aria-describedby="fox12 description12" ...>
   <title id="fox12">What does the fox say?</title>
   <desc id="description12">Will we ever know?</desc>
   [design code]
</svg>
```

<CodePen
  user="smashingmag"
  slug-hash="dyvvbKj"
  title="Accessible SVG Pattern Comparison (Fox Version)"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## SVG Pattern Winners And Losers

By running various screen readers on different combinations of operating systems and browsers, we see definite patterns emerging in the [final results](#testing-results) table. There are some **clear SVG pattern winners and losers**, plus a few patterns somewhere in the middle that you could implement as long as you are aware of, and can accept their limitations. Looking over the results table, we can conclude the following:

::: info Basic Alternative Descriptions Using The `<img>` Tag (Group 1)

**Best In Show**

- Pattern 2: `<img>` + `role="img"` + `alt="[words]"`
- Pattern 3: `<img>` + `role="img"` + `aria-label="[words]"`

**Use Caution**

- Pattern 4: `<img>` + `role="img"` + `aria-labelledby="[ID]"`

**Not Recommended**

- Pattern 1: `<img>` + `alt="[words]"`

:::

::: info Basic Alternative Descriptions Using The `<svg>` Tag (Group 2)

**Best In Show**

- Pattern 5: `<svg>` + `role="img"` + `<title>`
- Pattern 8: `<svg>` + `role="img"` + `<title>` + `aria-labelledby="[ID]"`

#### Use Caution

- Pattern 7: `<svg>` + `role="img"` + `<title>` + `aria-describedby="[ID]"`

**Not Recommended**

- Pattern 6: `<svg>` + `role="img"` + `<text>`

:::

::: info Extended Alternative Descriptions Using The `<svg>` Tag (Group 3)

**Best In Show**

- Pattern 11: `<svg>` + `role="img"` + `<title>` + `<desc>` + `aria-labelledby="[ID]"`

**Note**: While this pattern is not perfect as it repeated alternative descriptions, it did not ignore any of the elements in the testing, unlike the “use caution” patterns.

**Use Caution**

- Pattern 9: `<svg>` + `role="img"` + `<title>` + `<text>`
- Pattern 10: `<svg>` + `role="img"` + `<title>` + `<desc>`
- Pattern 12: `<svg>` + `role="img"` + `<title>` + `<desc>` + `aria-describedby="[ID]"`

**Not Recommended**

- None of the patterns in this group completely failed the tests.

:::

---

## Testing Results

<CodePen
  user="smashingmag"
  slug-hash="YzZQBwG"
  title="Testing Results"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Wrapping Up

It is important to note that part of interpreting the results of the SVG pattern tests is understanding that creators of each screen reader have a **recommended browser(s)** that they fully support. This doesn’t mean you shouldn’t or couldn’t use a screen reader on a different browser, this just means that if you do, the results may not be as accurate as if you used the recommended one(s).

The pattern testing for this article did include some **combinations of browsers and screen readers** that may fall into the “fringe” category, but there are also notes on which [<VPIcon icon="fas fa-globe"/>combinations of operating systems, browsers, and screen readers](https://dequeuniversity.com/screenreaders/) are recommended for your own testing. The results of these tests should help you make the best SVG pattern decision possible, based on your pattern needs and constraints.

A reminder that before you settle on a pattern, please make sure you know the basics of [**how and when to create accessible images**](/smashingmagazine.com/accessible-images.md) and that you fully understand the [<VPIcon icon="iconfont icon-w3c"/>required alternative information needed](https://w3.org/WAI/tutorials/images/) for the different image types.

If you need additional help deciding on which pattern to use for your environment, check out the article [**Good, Better, Best: Untangling The Complex World Of Accessible Patterns**](/smashingmagazine.com/good-better-best-untangling-complex-world-accessible-patterns.md) to help you navigate the tricky waters of accessible patterns. Armed with all of this information and just a little bit of effort, your SVGs are well on their way to being more inclusive to all.

::: note Editor’s note

You can learn **best practices on accessibility** with Carie in her upcoming online workshop on [<VPIcon icon="fas fa-globe"/>Accessible Front-End Patterns](https://smashingconf.com/online-workshops/workshops/carie-fisher) — with guidelines, testing tools, assistive technology and inclusive design patterns. Online, and live.

:::

::: info Further Reading

```component VPCard
{
  "title": "SVG Coding Examples: Useful Recipes For Writing Vectors By Hand",
  "desc": "Myriam Frisano explores the basics of hand-coding SVGs with practical examples to demystify the inner workings of common SVG elements. In this guide, you’ll learn about asking the right questions to solve common positioning problems and how to leverage JavaScript so that, by the end, you can add “SVG coding” to your toolbox. You’ll also be able to declare proudly, “I know how to draw literal pictures with words!”",
  "link": "/smashingmagazine.com/svg-coding-examples-recipes-writing-vectors-by-hand.md",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```

- [**Why Optimizing Your Lighthouse Score Is Not Enough For A Fast Website**](/smashingmagazine.com/why-optimizing-lighthouse-score-not-enough-fast-website.md)
- [**Sticky Headers And Full-Height Elements: A Tricky Combination**](/smashingmagazine.com/sticky-headers-full-height-elements-tricky-combination.md)
- [**How A Bottom-Up Design Approach Enhances Site Accessibility**](/smashingmagazine.com/how-bottom-up-design-approach-enhances-site-accessibility.md)

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Accessible SVGs: Perfect Patterns For Screen Reader Users",
  "desc": "Discover which SVG patterns we should avoid and which patterns are the most inclusive when comparing different combinations of OSs, browsers, and screen readers. Carie will also be running an online workshop on Accessible Front-End Patterns all around front-end accessibility. ",
  "link": "https://chanhi2000.github.io/bookshelf/smashingmagazine.com/accessible-svg-patterns-comparison.html",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```
