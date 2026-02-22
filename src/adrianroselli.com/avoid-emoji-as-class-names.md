---
lang: en-US
title: "Avoid Emoji as Class Names"
description: "Article(s) > Avoid Emoji as Class Names"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - adrianroselli.com
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Avoid Emoji as Class Names"
    - property: og:description
      content: "Avoid Emoji as Class Names"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/adrianroselli.com/avoid-emoji-as-class-names.html
prev: /programming/css/articles/README.md
date: 2017-10-20
isOriginal: false
author:
  - name: https://adrianroselli.com
    url: https://adrianroselli.com/contact
cover: https://adrianroselli.com/wp-content/uploads/2017/10/Emoji-VSCode-300x300.png
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
  name="Avoid Emoji as Class Names"
  desc="The title of this post is not broad enough. Avoid emoji as any identifier, whether as strings in your script, IDs on your elements, classes for your CSS, and so on. As soon as you start using emoji, you are blocking some users from being able to understand or use…"
  url="https://adrianroselli.com/2017/10/avoid-emoji-as-class-names.html"
  logo="https://adrianroselli.com/wp-content/themes/AAR/favicon.png"
  preview="https://adrianroselli.com/wp-content/uploads/2017/10/Emoji-VSCode-300x300.png"/>

The title of this post is not broad enough. Avoid emoji as any identifier, whether as strings in your script, IDs on your elements, classes for your CSS, and so on.

As soon as you start using emoji, you are blocking some users from being able to understand or use your code. It doesn’t matter how popular the technique becomes ([or doesn’t (<VPIcon icon="fa-brands fa-x-twitter"/>`Punkter_si`)](https://x.com/Punkter_si/status/915545019175636993)).

This post leans on techniques I outline in my post [**Accessible Emoji, Tweaked**](/adrianroselli.com/accessible-emoji-tweaked.md) to make the emoji I reference here accessible for a broader range of users.

---

## Who Uses Emoji in Code?

A reason I have seen most trumpeted for using emoji are from those claiming a single emoji character can shave bytes off of files (versus long identifiers). Another common reason is that some developers consider them easier to recognize.

Granted, as more developers lean on verbose naming conventions like [<VPIcon icon="fas fa-globe"/>BEM](http://getbem.com/introduction/), I can understand the appeal of `.🔍` over `.global-site-search--full__field`.

---

## Who it Affects

Allow me to run at this with my experience working across countries, languages, and abilities. Maybe something will be familiar to you here. You may also have use cases beyond what I have outlined below.

### Those on Disparate Platforms

Some platforms allow you to use emoji that are not rendered (or at least not rendered the same) on other platforms. While I have known about private-use Unicode ranges with custom emoji for years, I was not aware that a platform would allow users to easily access them. Or that their limited utility across platforms would not be presented to user. [Until I saw one in a tweet (<VPIcon icon="fa-brands fa-x-twitter"/>`FriendlyAshley`)](https://twitter.com/FriendlyAshley/status/816748379875246086).

While some on macOS or iOS may think that  is a perfectly valid emoji to represent the Apple logo, for those on other platforms it renders as a square or some other glyph.

Bear this in mind if, for example, you want to denote a style specific to Apple users and maybe avoid emoji altogether, since it can be tempting to make a style declaration like `button.` and never know that developers on other platforms will not benefit from the at-a-glance understanding you were hoping to convey.

This, of course, completely ignores the fact that many code editors cannot even display emoji (Emacs, for example).

### Those Who Need More Contrast

I work in non-ideal conditions all the time. I work on airplanes, in airports, in cafes, on my patio, on my porch, in hotels, in restaurants, in libraries, and so in. In all these cases lighting is often an issue, sometimes with unexpected shards of sunlight shooting across my screen.

I can kick the contrast up on my text editors, turn my screen brightness all the way up, and even constantly turn to block the light. But when I am trying to tell the difference between two emoji whose shapes and colors are similar, this can be quite tricky. For example, 💿 and 📀 have gotten me (never mind how these render under the new Windows 10 grayscale mode).

Instead of just scanning an HTML file for class names referenced in CSS, I have to use a *Find* feature to locate the emoji in the code that matches the glyph in the CSS. This is an unnecessary waste of time for any developer.

![CD and DVD emoji as seen in page content using Windows Grayscale Mode (they look nearly the same).](https://adrianroselli.com/wp-content/uploads/2017/10/Emoji_WGSM.png)

![CD and DVD emoji as seen in page content using Windows High Contrast Mode (they look exactly the same).](https://adrianroselli.com/wp-content/uploads/2017/10/Emoji_WHCM.png)

The first image shows the CD and DVD emoji using the new Windows Grayscale Mode (they look nearly the same). The second image shows the same emoji in Windows High Contrast Mode (they look exactly the same).

### Those From Different Backgrounds

This is pretty broad, but let’s consider that you are working on a team that is *not* made up exclusively of white middle-class twenty-something American guys. On the one hand, you want to code quickly. On the other hand, you maybe don’t want to create confusion with your efforts. Let’s take a couple easy examples that don’t give away my failure to understand the hip emoji of today.

So what do you when you want to reference multilingual content on a page? I have seen a flag used more than once to indicate a language, but that runs the risk of being completely misunderstood by speakers of the language as well as citizens of that country. For example, using the Portuguese flag (🇵🇹, which sometimes renders as the text *PT*) for a Portuguese-language section of a Brazilian site would be bad form, and potentially offensive.

Let’s go in a different direction and instead consider whether you want to render emoji that show people. Not just because the emotions conveyed by many of them are so confusing and potentially culturally varied, but also just deciding the skin tone can be tricky (think contrast issues again). I don’t know what 👨‍💻 is supposed to convey, 👌🏿 is not only a confusing gesture to many, but with this skin tone can be hard to see in my night-themed editor, and 😳 is so different across platforms that I have no idea what it even means.

### Those Who Use Screen Readers

First, we need to remember that [**not all screen reader users are blind**](/adrianroselli.com/not-all-screen-reader-users-are-blind.md). For example, my vision is ace (sorta) but I have come to use screen readers for some mundane tasks. Screen readers also come in great variety, but we really only need one of the popular ones to fail to support emoji in code, and you will have just excluded an entire audience.

In this case, I think a demonstration is more powerful than just telling you what happens. I fired up Visual Studio Code (which supports emoji, unlike Emacs, for example). Visual Studio Code has a screen reader mode, so I dived in using both JAWS and NVDA.

<VidStack src="https://adrianroselli.com/wp-content/uploads/2017/10/Emoji-CSS_JAWS.mp4" />

This example uses JAWS, which fails to announce 🥓 and .

<VidStack src="https://adrianroselli.com/wp-content/uploads/2017/10/Emoji-CSS_NVDA.mp4" />

This example uses NVDA, which fails to announce 🖰, 🖮, and .

I made another video using NVDA and Visual Studio Code on my other machine, [<VPIcon icon="fas fa-file-video"/>which you are welcome to view](https://adrianroselli.com/wp-content/uploads/2017/10/Emoji-CSS_NVDA-2.mp4), and it announces none of the emoji. So there is that too.

If you want to test it yourself, [here is the code I used (<VPIcon icon="fa-brands fa-codepen" />`aardrian`)](https://codepen.io/aardrian/pen/dVajmz?editors=0100):

<CodePen
  user="aardrian"
  slug-hash="dVajmz"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="dark"/>

### Those Who Want to Share

Note that when I tried to just paste that block of CSS into WordPress as-is, WordPress stripped some of the emoji. That’s why I opted to use CodePen, which itself struggles with rendering all the emoji. Which is another factor to consider should you ever want to blog a tutorial using emoji.

Identifying *why* these two platforms (WordPress and CodePen) behave the way they do is outside the scope of this post. Instead, it is worth just being aware that there is an issue in two (at least) popular platforms that developers use to share code.

![Screen shot of a CodePen embed where each emoji is replaced by the question-mark-in-diamond glyph.](https://adrianroselli.com/wp-content/uploads/2017/10/Emoji_CodePen-embed_Chrome62-Win.png)

The CodePen embed used above as seen on Chrome 62 on Windows 10 (Fall 2017 CU). Each emoji is replaced by the question-mark-in-diamond glyph, which is slightly more exciting than the outlined blank rectangle. Both Firefox and Edge display the embedded Emoji fine.

---

## Conclusion

To me it seems pretty evident that using emoji as identifiers in your HTML, CSS, or JavaScript is not very practical. The bytes you might save are outweighed by the potential for making your code harder to maintain.

Instead, ask yourself why you want to use emoji this way, and if the answer is just that it is for fun, don’t do it. Certainly not if you ever want to use it with anyone else.

::: note Update: April 23, 2018

Please, when making demo sites, experiments, code resources, etc., avoid using emoji. I saw a nifty resource shared to Twitter today and within five hours it prompted these tweets:

> Emoji grid area names ftw
>
> Redacted, April 23, 2018

> Oh my god I never knew you could use emojis as grid-area names and I'm totally doing that from now on 👀
>
> Redacted, April 23, 2018

> You had me at emoji named grid areas. Great stuff, thanks!
>
> Redacted, April 23, 2018

For all the reasons I outline in this post, please be careful where you put emoji. Don’t use them in your code, and don’t use them in demos.

:::

::: note Update: May 3, 2018

I fear it may be too late.

> ![Screen shot from a CodePen showing emoji used as CSS variable names.](https://adrianroselli.com/wp-content/uploads/2017/10/emoji_tweet_innovati.jpg)
> 
> You can use emojis in CSS Variables 😎 What emojis will you use? 🎨 🎚 🎛 📦 📏 📌 🆙 🔡 🔠 🔝 🔚 🔙 ☑️ 🔕 ⁉️ [https://codepen.io/… (<VPIcon icon="fa-brands fa-codepen" />`tomhodgins`)](https://codepen.io/tomhodgins/pen/ELWbvG) via [@CodePen (<VPIcon icon="fa-brands fa-x-twitter" />`CodePen?ref_src=twsrc%5Etfw`)](https://twitter.com/CodePen?ref_src=twsrc%5Etfw)
> 
> Redacted, May 1, 2018

::: note Update: July 17, 2018

The post [CSS Quick Tip: The Valid Characters in a Custom CSS Selector](https://pineco.de/css-quick-tip-the-valid-characters-in-a-custom-css-selector/) does not explicitly mention emoji, but does point out the potential hassle with escaping and maintenance for any selectors in the Unicode (U+0031) range.

:::

::: info Other Posts

[**Earlier post: Slides from A11yTOConf**](/adrianroselli.com/slides-from-a11ytoconf.md)

```component VPCard
{
  "title": "Don’t Use ARIA Menu Roles for Site Nav",
  "desc": "Once again, the advice is in the title of the post. But I will ramble anyway since you scrolled this far. First run with the advice, and then review some background on ARIA and how navigation and menu items are defined. This way you can tap out quickly when it…",
  "link": "/adrianroselli.com/dont-use-aria-menu-roles-for-site-nav.md",
  "logo": "https://adrianroselli.com/wp-content/themes/AAR/favicon.png",
  "background": "rgba(0,0,0,0.2)"
}
```

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Avoid Emoji as Class Names",
  "desc": "The title of this post is not broad enough. Avoid emoji as any identifier, whether as strings in your script, IDs on your elements, classes for your CSS, and so on. As soon as you start using emoji, you are blocking some users from being able to understand or use…",
  "link": "https://chanhi2000.github.io/bookshelf/adrianroselli.com/avoid-emoji-as-class-names.html",
  "logo": "https://adrianroselli.com/wp-content/themes/AAR/favicon.png",
  "background": "rgba(0,0,0,0.2)"
}
```
