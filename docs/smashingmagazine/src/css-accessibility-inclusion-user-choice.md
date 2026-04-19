---
lang: en-US
title: "CSS And Accessibility: Inclusion Through User Choice"
description: "Article(s) > CSS And Accessibility: Inclusion Through User Choice"
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
      content: "Article(s) > CSS And Accessibility: Inclusion Through User Choice"
    - property: og:description
      content: "CSS And Accessibility: Inclusion Through User Choice"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/smashingmagazine.com/css-accessibility-inclusion-user-choice.html
prev: /programming/css/articles/README.md
date: 2023-08-01
isOriginal: false
author:
  - name: Carie Fisher
    url: https://smashingmagazine.com/author/carie-fisher/
cover: https://files.smashing.media/articles/css-accessibility-inclusion-user-choice/css-accessibility-inclusion-user-choice.jpg
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
  name="CSS And Accessibility: Inclusion Through User Choice"
  desc="In this article, Carie Fisher outlines which CSS media features are available for detecting user preferences and how they are used to design and build more inclusive user experiences."
  url="https://smashingmagazine.com/2023/08/css-accessibility-inclusion-user-choice/"
  logo="https://smashingmagazine.com/images/favicon/favicon.svg"
  preview="https://files.smashing.media/articles/css-accessibility-inclusion-user-choice/css-accessibility-inclusion-user-choice.jpg"/>

It is challenging to accurately understand the preferences of over 7.8 billion people at any given time. Carie Fisher outlines which CSS media features are available for detecting user preferences and how they are used to design and build more inclusive experiences.

We make a series of choices every day. Get up early to work out or hit the snooze button? Double foam mocha latte or decaf green tea? Tabs or spaces? Our choices, even the seemingly insignificant ones, shape our identities and influence our perspectives on the world. In today’s modern landscape, we have come to expect a broad range of choices, regardless of the products or services we seek. However, this has not always been the case.

For example, there was a time when the world had only one font family. The first known typeface, a variant of [<VPIcon icon="fa-brands fa-wikipedia-w"/>Blackletter](https://en.wikipedia.org/wiki/Blackletter), graced Johannes Gutenberg’s pioneering printing press in 1440. The first set of publicly-available [<VPIcon icon="fas fa-globe"/>GUI colors](https://webtrainingguides.com/css-color-names-the-tragicomedy) shipped with the 10th version of the [<VPIcon icon="fas fa-globe"/>X Window System](https://x.org/wiki/) consisted of 69 primary shades and 138 entries to account for various color variations (e.g., “dark red”). In September 1995, a Netscape programmer, Brendan Eich, introduced “Mocha,” a scripting language that would later be renamed LiveScript and eventually [<VPIcon icon="fa-brands fa-wikipedia-w"/>JavaScript](https://en.wikipedia.org/wiki/JavaScript).

Fast forward to the present day, and we now have access to over [<VPIcon icon="fas fa-globe"/>650,000 web fonts](https://kinsta.com/blog/web-safe-fonts), a hexadecimal system capable of representing [<VPIcon icon="fa-brands fa-wikipedia-w"/>16,777,216 colors](https://en.wikipedia.org/wiki/Web_colors), and over [<VPIcon icon="fa-brands fa-wikipedia-w"/>100 public-facing JavaScript frameworks and libraries](https://en.wikipedia.org/wiki/List_of_JavaScript_libraries) to choose from. While this is great news for professionals designing and building user interfaces, what choices are we giving actual users? Shouldn’t they have a say in their experience?

---

## CSS Media Features

While designers and developers may have some insights into user needs, it is very challenging to understand the actual user preferences of 7.8 billion people at any given time. Supporting the needs of individuals with disabilities and assistive technology adds a layer of complexity to an already complex situation. Nonetheless, designers and developers are responsible for addressing these user needs as best we can by providing accessible choices. One promising solution is **user-focused [<VPIcon icon="fa-brands fa-firefox"/>CSS media features](https://developer.mozilla.org/en-US/docs/Web/CSS/@media#media_features)** that allow us to customize the user experience and cater to individual preferences.

---

## Media Features For Color

Let’s first focus on CSS media features for color. Color plays a vital role in design, impacting how we perceive brands. Studies suggest that [<VPIcon icon="fas fa-globe"/>color alone](https://emerald.com/insight/content/doi/10.1108/00251740610673332/full/html) can influence up to 90% of snap judgments about products. Considering the large number of people worldwide with visual deficiencies such as color blindness and low vision, developers and designers have a significant opportunity to improve accessibility with this element alone.

### `prefers-color-scheme`

The [<VPIcon icon="fa-brands fa-firefox"/>`prefers-color-scheme` CSS media feature](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) helps identify whether users prefer light or dark color themes. Users can indicate their preferences through settings in the operating system or user agent.

There are two values for this CSS media feature: `light` and `dark`. Typically, the default theme presented to users is the light version, even if the user expresses no preference. However, the opposite can also be true, and websites or apps default to a dark theme and switch to a light theme using the `media (prefers-color-scheme: light)` media feature and corresponding code.

Users opting for a dark mode signifies their preference for a dark-themed page. Using `media (prefers-color-scheme: dark)`, various theme elements, such as text, links, and buttons, are adjusted to ensure they stand out against darker background colors.

In the past, there was also a `no-preference` value to indicate when users had no theme preference. However, user agents now treat light themes as the default, rendering the `no-preference` value obsolete.

```css
@media (prefers-color-scheme: dark) {
  body {
    background-color: #282828;
  }

  .without [data-word="without"] .char:before,
  .without [data-word="without"] .char:after {
    color: #fff;
  }
}
```

![Default color scheme (top) and dark mode (bottom). ([Demo <VPIcon icon="fa-brands fa-codepen"/>`cariefisher`)](https://codepen.io/cariefisher/pen/JjmmRxZ))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/css-accessibility-inclusion-user-choice/color-light-dark.png)

The [<VPIcon icon="iconfont icon-caniuse"/>`prefers-color-scheme`](https://caniuse.com/mdn-css_at-rules_media_prefers-color-scheme) is one of the most widely used CSS media features today and it has a very large percentage of browser support at 94%. It is so popular that additional values may be introduced in the future to express more specific preferences or color schemes, such as sepia or grayscale.

Switching from the default light mode to dark mode is relatively straightforward. Consult the user setting guides for [<VPIcon icon="fa-brands fa-apple"/>Mac](https://support.apple.com/guide/mac-help/use-a-light-or-dark-appearance-mchl52e1c2d2/mac) and [<VPIcon icon="fa-brands fa-windows"/>Windows](https://support.microsoft.com/en-us/windows/change-colors-in-windows-d26ef4d6-819a-581c-1581-493cfcc005fe) operating systems to learn more (select the relevant hardware and operating system version), then navigate to a browser that supports this CSS media feature.

::: tip Pro-tip

A more sophisticated solution to demo user preference settings is using Chrome’s [<VPIcon icon="fa-brands fa-chrome"/>Rendering tab](https://developer.chrome.com/docs/devtools/rendering) coupled with [<VPIcon icon="fa-brands fa-youtube"/>CSS media features emulator](https://youtu.be/gOkM1L6azEI) to easily switch from light to dark modes to [<VPIcon icon="fa-brands fa-chrome"/>emulate `prefers-color-scheme`](https://developer.chrome.com/docs/devtools/rendering/emulate-css/#emulate-css-media-feature-prefers-color-scheme) as users experience it. This solution is convenient for live demos where you need to show the user preference changes quickly or emulate media features not fully supported by your OS or browser.

:::

![Browser support for `prefers-color-scheme` at the time of writing. ([<VPIcon icon="fas fa-file-image"/>Large preview](https://files.smashing.media/articles/css-accessibility-inclusion-user-choice/prefers-color-scheme.png))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/css-accessibility-inclusion-user-choice/prefers-color-scheme.png)

### `forced-colors`

The [<VPIcon icon="fa-brands fa-firefox"/>`forced-colors` CSS media feature](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/forced-colors) enables the detection of the forced colors mode enforced by the user agent. This mode imposes a limited color palette the user chooses onto the page. This newer media feature provides an alternative approach to handle colors for non-Window devices, and we expect it will replace Windows High Contrast Mode in the future.

There are two values for the forced-colors media feature: `none` and `active`. The `media (forced-colors: none)` value indicates that the forced colors mode is inactive and uses the default color scheme, while the `media (forced-colors: active)` value means that the forced colors mode is active and the user agent enforces the user-selected limited color palette.

It’s worth noting that enabling `forced-colors` mode does not necessarily imply a preference for higher contrast. The color adjustments align with the user’s choice, which may not strictly fit into the low or high-contrast categories.

::: note

There are some [<VPIcon icon="fa-brands fa-firefox"/>properties affected by the `forced-color` mode](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/forced-colors#properties_affected_by_forced-color_mode) that you need to be aware of when designing and testing your forced-colors theme. Check out Eric Bailey’s article “[Wind**ows High Contrast Mode, Forced Colors Mode And CSS Custom Properties**](/smashingmagazine.com/windows-high-contrast-colors-mode-css-custom-properties.md)” for more information about this media feature and its integration with CSS custom properties.

:::

```css
@media (forced-colors: active) {
  body {
    background-color: #fcba03;
  }

  .without [data-word="without"] .char:before,
  .without [data-word="without"] .char:after {
    color: #ac1663;
  }

  .without {
    color: #004a72;
  }
}
```

![Forced colors active. ([Demo (<VPIcon icon="fa-brands fa-codepen"/>`cariefisher`)](https://codepen.io/cariefisher/pen/JjmmRxZ))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/css-accessibility-inclusion-user-choice/color-forced.png)

The [<VPIcon icon="iconfont icon-caniuse"/>`forced-colors` CSS media feature](http://caniuse.com/mdn-css_at-rules_media_forced-colors) is currently supported by 31% of the most popular browsers, including desktop versions of Chrome, Edge, and Firefox. Although the browser support for this feature is increasing, not all operating systems currently offer a setting to activate the forced colors mode. The [<VPIcon icon="fa-brands fa-windows"/>Windows](https://support.microsoft.com/en-us/windows/change-color-contrast-in-windows-fedc744c-90ac-69df-aed5-c8a90125e696) operating system is the only exception, as it provides the necessary functionality for users to create customized themes that override the default ones by utilizing the Windows High Contrast mode.

If you are using a non-Windows machine, you can emulate the behavior of this media feature by following the steps mentioned earlier in the `prefers-color-scheme` section using Chrome’s [<VPIcon icon="fa-brands fa-chrome"/>Rendering tab](https://developer.chrome.com/docs/devtools/rendering/#open-rendering) and emulator, but with a focus on [<VPIcon icon="fa-brands fa-chrome"/>emulating `forced-colors`](https://developer.chrome.com/docs/devtools/rendering/emulate-css/#emulate-css-media-feature-forced-colors) instead.

![Browser support for `@prefers-forced-colors` at the time of writing. ([<VPIcon icon="fas fa-file-image"/>Large preview](https://files.smashing.media/articles/css-accessibility-inclusion-user-choice/forced-colors.png))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/css-accessibility-inclusion-user-choice/forced-colors.png)

### `inverted-colors`

The [<VPIcon icon="fa-brands fa-firefox"/>`inverted-colors` CSS media feature](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/inverted-colors) determines whether to show the content in its standard colors or if it reverses the colors.

Two modes are available for the `inverted-colors` media feature: `none` and `inverted`. The `media (inverted-colors: none)` value indicates that the forced colors mode is not activated and uses the default color scheme. Using the `media (inverted-colors: inverted)` value indicates that all pixels within the displayed area have been inverted and renders the inverted color theme when a user chooses this option.

When writing code for the `inverted-colors` CSS media feature, one option is to write your code using the [<VPIcon icon="fas fa-globe"/>`inverted` value](https://wtools.io/invert-color-code-online) of what you want a user to see to ensure correct rendering after applying the user’s setting.

For example, you want your element’s background to be `#e87b2d`, which is a tangerine orange. In the theme code, you would write the opposite color, `#1784d2`, powder blue. Incorporating this inverse color into the code renders the intended tangerine orange instead of its inverse when users enable the `inverted-colors` setting.

```css
@media (inverted-colors: inverted) {
  body {
    background-color: #99cc66;
  }

  .without [data-word="without"] .char:before,
  .without [data-word="without"] .char:after {
    color: #ee1166;
  }

  .without {
    color: #111111;
  }
}
```

![The top ([demo (<VPIcon icon="fa-brands fa-codepen"/>`cariefisher`)](https://codepen.io/cariefisher/pen/JjmmRxZ)) is what the code looks like before it is inverted. The image below ([demo (<VPIcon icon="fa-brands fa-codepen"/>`cariefisher`)](https://codepen.io/cariefisher/pen/JjmmRxZ)) is what can actually be seen when the filter is activated. (Image credit: ) ([<VPIcon icon="fas fa-file-image"/>Large preview](https://files.smashing.media/articles/css-accessibility-inclusion-user-choice/inverted-colors-green-purple.png))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/css-accessibility-inclusion-user-choice/inverted-colors-green-purple.png)

Current browser support for [<VPIcon icon="fa-brands fa-firefox"/>`inverted-colors`](https://caniuse.com/mdn-css_at-rules_media_inverted-colors) is 20% for Safari desktop and iOS browsers. While Chrome’s Rendering tab and emulator do not work for this particular media feature, you can [<VPIcon icon="fa-brands fa-firefox"/>emulate `inverted-colors`](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Experimental_features#inverted-colors_media_feature) using Firefox (version 114 or newer).

1. Open a new tab in Firefox and type or paste `about:config` in the address bar, and press Enter/Return. Click the button acknowledging that you will be careful.
2. In the search box, enter `layout.css.inverted-colors` and wait for the list to be filtered.
3. Use the toggle button to switch the preference from `false` to `true`.
4. Enable the inverted colors setting in your operating system and navigate to a webpage or code example with the `inverted-colors` theme to observe the inverted effect.

The setting for the `inverted-colors` media feature is available on [<VPIcon icon="fa-brands fa-apple"/>Mac](https://support.apple.com/guide/mac-help/change-display-settings-for-accessibility-unac089/mac) and [<VPIcon icon="fa-brands fa-windows"/>Windows](https://support.microsoft.com/en-gb/office/use-color-and-contrast-for-accessibility-in-microsoft-365-bb11486d-fc7d-4cd9-b344-16e2bc2a2387#bkmk_invertwin11) operating systems.

![Browser support for `inverted-colors` at the time of writing. ([<VPIcon icon="fas fa-file-image"/>Large preview](https://files.smashing.media/articles/css-accessibility-inclusion-user-choice/inverted-colors.png))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/css-accessibility-inclusion-user-choice/inverted-colors.png)

---

## Media Features For Contrast

Next, let’s talk about CSS media features related to contrast. Contrast plays a crucial role in conveying visual information to users, working hand in hand with color. When proper levels of color contrast are not implemented, it becomes difficult to distinguish essential elements such as text, icons, and important graphics. As a result, the design can become inaccessible not only to the 46 million people worldwide with low vision but also to older adults, individuals using monochrome displays, or those in specific situations like low lighting in a room.

### `prefers-contrast`

The [<VPIcon icon="fa-brands fa-firefox"/>`prefers-contrast` CSS media feature](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-contrast) detects the user’s preference for higher or lower contrast on a page. The feature uses the information to make appropriate adjustments, such as modifying the contrast ratio between colors nearby or altering the visual prominence of elements, such as adjusting their borders, to better suit the user’s contrast requirements.

There are four values for this CSS media feature: `no-preference`, `less`, `more`, and `custom`. The `media (prefers-contrast: no-preference)` value indicates that the user has no preference (or did not choose one since it is the default setting), and the `media (prefers-contrast: less)` value indicates a user’s preference for less contrast. Conversely, the `media (prefers-contrast: more)` value indicates a user’s preference for stronger contrast.

The `media (prefers-contrast: custom)` value is a bit more complex as it allows users to use a custom set of colors — which could be specific to contrast — or choose a palette. For example, a user could select a theme composed entirely of shades of blue, primary colors, or even a rainbow theme — anything they choose.

::: note

When a user selects the custom contrast setting, it will align with the color palette defined by users of `forced-colors: active` value, so be sure to account for that in the code.

```css
@media (prefers-contrast: more) {
  .title2 {
    color: var(--clr-6);
  }

  .aurora2__item:nth-of-type(1),
  .aurora2__item:nth-of-type(2),
  .aurora2__item:nth-of-type(3),
  .aurora2__item:nth-of-type(4) {
    background-color: var(--clr-6);
  }
}

@media (prefers-contrast: less) {
  .title {
    color: var(--clr-5);
  }

  .aurora__item:nth-of-type(1),
  .aurora__item:nth-of-type(2),
  .aurora__item:nth-of-type(3),
  .aurora__item:nth-of-type(4) {
    background-color: var(--clr-5);
  }
}

@media (prefers-contrast: custom) {
  .aurora2__item:nth-of-type(1) {
    background-color: var(--clr-1);
  }
  .aurora2__item:nth-of-type(2) {
    background-color: var(--clr-2);
  }
  .aurora2__item:nth-of-type(3) {
    background-color: var(--clr-3);
  }
  .aurora2__item:nth-of-type(4) {
    background-color: var(--clr-4);
  }
}
```

![Comparing contrast preferences, clockwise starting at top-left: Default, Less, More, and Custom. ([Demo (<VPIcon icon="fa-brands fa-codepen"/>`cariefisher`)](https://codepen.io/cariefisher/pen/GRYYmoR)) ([<VPIcon icon="fas fa-file-image"/>Large preview](https://files.smashing.media/articles/css-accessibility-inclusion-user-choice/prefers-contrast-comparisons.jpg))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/css-accessibility-inclusion-user-choice/prefers-contrast-comparisons.jpg)

:::

Currently, 91% of the most widely used browsers offer support for the [<VPIcon icon="iconfont icon-caniuse"/>`prefers-contrast` media feature](https://caniuse.com/mdn-css_at-rules_media_prefers-contrast). However, the majority of this support is focused on enhancing contrast rather than reducing it or allowing for personalized contrast themes.

To effectively demo and test all the different contrast options for this CSS media feature, use the Chrome [<VPIcon icon="fa-brands fa-chrome"/>Rendering tab](https://developer.chrome.com/docs/devtools/rendering/#open-rendering) and emulator as described earlier, but with a specific emphasis on [<VPIcon icon="fa-brands fa-chrome"/>emulating the `prefers-contrast` media feature](https://developer.chrome.com/docs/devtools/rendering/emulate-css/#emulate-css-media-feature-prefers-contrast) this time.

![Browser support for `@prefers-contrast` at the time of writing. ([<VPIcon icon="fas fa-file-image"/>Large preview](https://files.smashing.media/articles/css-accessibility-inclusion-user-choice/prefers-color-scheme.png))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/css-accessibility-inclusion-user-choice/prefers-color-scheme.png)

### `prefers-reduced-transparency`

The [<VPIcon icon="fa-brands fa-firefox"/>`prefers-reduced-transparency` CSS media feature](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-transparency) determines if the user has requested the system to use fewer transparent or translucent layer effects.

It takes one of two possible values: `no-preference` and `reduce`. The `media (prefers-reduced-transparency: no-preference)` value indicates that the user has not specified any preference for the system (this is also the default setting). On the other hand, the `media (prefers-reduced-transparency: reduce)` value indicates that the user has informed the system about their preference for an interface that minimizes the application of transparent or translucent layer effects.

```css
@media (prefers-reduced-transparency: reduce) {
  .title,
  .title2 {
    opacity: 0.7;
  }
}
```

![Comparing transparency preferences: Default (top) and Reduced (bottom). ([Demo (<VPIcon icon="fa-brands fa-codepen"/>`cariefisher`)](https://codepen.io/cariefisher/pen/GRYYmoR)) ([<VPIcon icon="fas fa-file-image"/>Large preview](https://files.smashing.media/articles/css-accessibility-inclusion-user-choice/prefers-reduced-transparency-comparison.jpg))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/css-accessibility-inclusion-user-choice/prefers-reduced-transparency-comparison.jpg)

The current browser support for [<VPIcon icon="iconfont icon-caniuse"/>`@prefers-reduced-transparency`](https://caniuse.com/mdn-css_at-rules_media_prefers-reduced-transparency) stands at 0%. This CSS media feature is highly experimental and should not be utilized in production code at the time I’m writing this article.

However, if you wish to [<VPIcon icon="fa-brands fa-firefox"/>emulate the `prefers-reduced-transparency` media feature behavior](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Experimental_features#prefers-reduced-transparency_media_feature), you can follow these steps using Firefox (version 113 or newer).

1. Open a new tab in Firefox and type or paste `about:config` in the address bar, and press Enter/Return. Click the button acknowledging that you will be careful.
2. In the search box, type or paste `layout.css.prefers-reduced-transparency` and wait for the list to be filtered.
3. Use the toggle button to switch the preference from the default state of false to true.
4. Adjust your operating system’s [<VPIcon icon="fa-brands fa-firefox"/>transparency settings](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-transparency#user_preferences) and navigate to a webpage or code example with the `prefers-reduced-transparency` theme to observe the effect of reduced transparency.

![Browser support for `@prefers-reduced-transparency` at the time of writing. ([<VPIcon icon="fas fa-file-image"/>Large preview](https://files.smashing.media/articles/css-accessibility-inclusion-user-choice/prefers-reduced-transparency.png))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/css-accessibility-inclusion-user-choice/prefers-reduced-transparency.png)

---

## Media Features For Motion

Lastly, let’s turn our focus to motion. Whether it involves videos, GIFs, or SVGs, movement can enrich our online experiences. However, this media type can also adversely affect many individuals. People with vestibular disabilities, seizure disorders, and migraine disorders can benefit from accessible media. CSS media features for motion allow us to incorporate both dynamic movement and static states for elements, enabling us to have the best of both worlds.

### `prefers-reduced-motion`

Using the [<VPIcon icon="fa-brands fa-firefox"/>`prefers-reduced-motion` CSS media feature](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) helps determine whether the user has requested the system to minimize the usage of non-essential motion.

This CSS media feature accepts one of two values: `no-preference` and `reduce`. The `media (prefers-reduced-motion: no-preference)` value indicates that the user has not specified any preference for the system (this is also the default setting). Conversely, the `media (prefers-reduced-motion: reduce)` value indicates that the user has informed the system about their preference for an interface that eliminates or substitutes motion-based animations that may cause discomfort or serve as distractions for them.

```css
@media (prefers-reduced-motion: reduce) {
  .bg-rainbow {
    animation: none;
  }

  .perfection {
    .word {
      .char {
        animation: slide-down 5s cubic-bezier(0.75, 0, 0.25, 1) both;
        animation-delay: calc(#{$delay} + (0.5s * var(--word-index)));
      }
    }

    [data-word="perfection"] {
      animation: slide-over 4.5s cubic-bezier(0.5, 0, 0.25, 1) both;
      animation-delay: $delay;

      .char {
        animation: none;
        visibility: hidden;
      }

      .char:before,
      .char:after {
        animation: split-in 4.5s cubic-bezier(0.75, 0, 0.25, 1) both alternate;
        animation-delay: calc(
          3s + -0.2s * (var(--char-total) - var(--char-index))
        );
      }
    }
  }
}
```

You can compare the difference in the following videos and by viewing a [live demo (<VPIcon icon="fa-brands fa-codepen"/>`cariefisher`)](https://codepen.io/cariefisher/pen/zYmmZZZ).

<VidStack src="vimeo/843454067" />

<VidStack src="vimeo/843454316" />

The [<VPIcon icon="fa-brands fa-chrome"/><VPIcon icon="fa-brands fa-firefox"/>`prefers-reduced-motion`](https://caniuse.com/mdn-css_at-rules_media_prefers-reduced-motion) CSS media feature boasts the broadest browser support among all other CSS media features, with an impressive 94% support across the latest versions of the most popular desktop and mobile browsers. Most operating systems offer a [<VPIcon icon="fa-brands fa-chrome"/><VPIcon icon="fa-brands fa-firefox"/>reduced motion setting](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion#user_preferences) that you can use for demo purposes. Alternatively, you can [<VPIcon icon="fa-brands fa-chrome"/>emulate `prefers-reduced-motion`](https://developer.chrome.com/docs/devtools/rendering/emulate-css/#emulate-css-media-feature-prefers-reduced-motion) using Chrome’s [<VPIcon icon="fa-brands fa-chrome"/>Rendering tab](https://developer.chrome.com/docs/devtools/rendering/#open-rendering) and emulator.

Unlike other media features, the main questions regarding the `prefers-reduced-motion` media feature revolve less around browser and operating system support and more around determining the degree and manner of motion reduction. For instance, should the motion be slowed down, prevented from infinite loops, or entirely stopped? There are many aspects to consider when defining the [**reduced motion states**](/smashingmagazine.com/design-reduced-motion-sensitivities.md) of your moving elements. When in doubt, think: [<VPIcon icon="iconfont icon-webdev"/>less is more](https://web.dev/prefers-reduced-motion).

![Browser support for `prefers-reduced-motion` at the time of writing. ([<VPIcon icon="fas fa-file-image"/>Large preview](https://files.smashing.media/articles/css-accessibility-inclusion-user-choice/prefers-reduced-motion.png))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/css-accessibility-inclusion-user-choice/prefers-reduced-motion.png)

### `prefers-reduced-data`

Last but certainly not least, let’s examine the [<VPIcon icon="fa-brands fa-firefox"/>`prefers-reduced-data` CSS media feature](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-data). This media feature determines whether the user prefers to receive alternate content that consumes less data when rendering the page.

This CSS media feature has two possible values: `no-preference` and `reduce`. The `media (prefers-reduced-motion: no-preference)` value indicates that the user has not specified any preference for the system (which is also the default setting). On the other hand, the `media (prefers-reduced-data: reduce)` value indicates that the user has expressed a preference for lightweight alternate content.

Unlike other CSS media features, a user’s preference for the `prefers-reduced-data` media feature could vary. It may be a system-wide setting exposed by the operating system or settings controlled by the user agent. In the case of the user agent, they may determine this value based on the same user or system preference used for setting the [<VPIcon icon="fa-brands fa-firefox"/>Save-Data](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Save-Data) HTTP request header.

Note that the Save-Data network client request header is still considered experimental technology, but it has achieved a remarkable [<VPIcon icon="iconfont icon-caniuse"/>72% browser support](https://caniuse.com/mdn-http_headers_save-data) across various browsers, except Safari and Firefox on desktop and mobile.

```css
@media (prefers-reduced-data: reduce) {
  .bg-rainbow {
    animation: none;
  }

  .perfection {
    .word {
      .char {
        animation: none;
      }
    }

    [data-word="perfection"] {
      animation: none;

      .char {
        animation: none;
        visibility: hidden;
      }

      .char:before,
      .char:after {
        animation: none;
      }
    }
  }
}
```

![Visual rendering of `@media (prefers-reduced-data: reduce`. ([Demo (<VPIcon icon="fa-brands fa-codepen"/>`cariefisher`)](http://codepen.io/cariefisher/pen/zYmmZZZ)) ([<VPIcon icon="fas fa-file-image"/>Large preview](https://files.smashing.media/articles/css-accessibility-inclusion-user-choice/demo-prefers-redued-data.png))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/css-accessibility-inclusion-user-choice/demo-prefers-redued-data.png)

Similar to `prefers-reduced-transparency`, the [<VPIcon icon="iconfont icon-caniuse"/>`prefers-reduced-data`](https://caniuse.com/mdn-css_at-rules_media_prefers-reduced-data) CSS media feature is highly experimental and should not be utilized in production code at this time as the current browser support for it stands at 0%.

However, if you wish to emulate the `prefers-reduced-data` behavior, you can follow these steps using Chrome (version 85 or newer).

1. Open a new tab in Chrome and type or paste `chrome://flags` in the address bar and press Enter/Return.
2. In the search box, type or paste `experimental-web-platform-features` and wait for the list to be filtered.
3. Use the dropdown option to switch the preference from the default state of disabled to enabled.
4. Use the Chrome [<VPIcon icon="fa-brands fa-chrome"/>Rendering tab](https://developer.chrome.com/docs/devtools/rendering/#open-rendering) and choose the appropriate CSS media feature to emulate.

Note that you can also enable the `prefers-reduced-data` feature in Edge, Opera, and Chrome Android (all behind the same `experimental-web-platform-features` flag), but it is less clear how you would emulate the media feature without the rendering tab and emulator found in the desktop version of Chrome.

[![Browser support for <code>prefers-reduced-data</code> at the time of writing](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/css-accessibility-inclusion-user-choice/prefers-reduced-data.png)](https://files.smashing.media/articles/css-accessibility-inclusion-user-choice/prefers-reduced-data.png)

Browser support for `prefers-reduced-data` at the time of writing. ([<VPIcon icon="fas fa-file-image"/>Large preview](https://files.smashing.media/articles/css-accessibility-inclusion-user-choice/prefers-reduced-data.png))

---

## Amplifying Inclusion Through User Choice

In the tech world, accessibility often receives criticism, particularly with aesthetics and advanced features. However, this negative perception can be changed. It is possible to incorporate stunning design and innovative functionality while prioritizing accessibility by leveraging CSS user-focused media features that address **color**, **contrast**, and **motion**.

Today, by incorporating all available options for each CSS media feature currently supported by browsers (with support exceeding 90%), you can provide users with 16 combinations of options. However, when the browsers and operating systems implement and support more experimental media features, the impact on user customization expands significantly to a staggering 256 combinations of options. A large number of possible options truly amplifies the potential impact designers and developers can have on user experiences.

As professionals within the technology industry, our goal should be to ensure that digital products are accessible to all individuals. By offering users the ability to personalize their experience, we can include an array of remarkable features in a responsible manner. Our job is to provide options and let people choose their own adventure.

::: info Further Reading On SmashingMag

- “[**Creating A High-Contrast Design System With CSS Custom Properties**](/smashingmagazine.com/creating-high-contrast-design-system-css-custom-properties.md),” Brecht De Ruyte
- “[**A Step-By-Step Guide To Building Accessible Carousels**](/smashingmagazine.com/guide-building-accessible-carousels.md),” Sonja Weckenmann
- “[**Designing Age-Inclusive Products: Guidelines And Best Practices**](/smashingmagazine.com/designing-age-inclusive-products-guidelines-best-practices.md),” Michal Halperin Ben Zvi
- “[**A Guide To Keyboard Accessibility: HTML And CSS (Part 1)**](/smashingmagazine.com/guide-keyboard-accessibility-html-css-part1.md),” Cristian Díaz

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "CSS And Accessibility: Inclusion Through User Choice",
  "desc": "In this article, Carie Fisher outlines which CSS media features are available for detecting user preferences and how they are used to design and build more inclusive user experiences.",
  "link": "https://chanhi2000.github.io/bookshelf/smashingmagazine.com/css-accessibility-inclusion-user-choice.html",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```
