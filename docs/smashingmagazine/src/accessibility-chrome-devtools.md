---
lang: en-US
title: "Accessibility In Chrome DevTools"
description: "Article(s) > Accessibility In Chrome DevTools"
icon: fa-brands fa-chrome
category:
  - Web Browser
  - Google
  - Chrome
  - Article(s)
tag:
  - blog
  - smashingmagazine.com
  - browser
  - webbrowser
  - web-browser
  - google
  - chrome
  - googlechrome
  - google-chrome
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Accessibility In Chrome DevTools"
    - property: og:description
      content: "Accessibility In Chrome DevTools"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/smashingmagazine.com/accessibility-chrome-devtools.html
prev: /tool/chrome/articles/README.md
date: 2020-08-13
isOriginal: false
author:
  - name: Umar Hansa
    url: https://smashingmagazine.com/author/umar-hansa/
cover: https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/1aaa4f81-68d8-4c74-aa38-6d843cbd0d72/accessibility-chrome-devtools.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Google Chrome > Article(s)",
  "desc": "Article(s)",
  "link": "/tool/chrome/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Accessibility In Chrome DevTools"
  desc="In this article, Umar Hansa will demonstrate some useful features in DevTools which can help you improve the accessibility of your website. For many websites, things like performance and accessibility are an afterthought. But as web developers, it’s best to strive to create the best possible experience we can for our users, regardless of their abilities. This article uses Google Chrome since it’s a browser I use and feel comfortable with. That being said, Firefox, Safari, and Edge have all made great strides in their developer tools, and they definitely have some great accessibility-related features of their own."
  url="https://smashingmagazine.com/2020/08/accessibility-chrome-devtools/"
  logo="https://smashingmagazine.com/images/favicon/favicon.svg"
  preview="https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/1aaa4f81-68d8-4c74-aa38-6d843cbd0d72/accessibility-chrome-devtools.png"/>

In this article, Umar Hansa will demonstrate some useful features in DevTools which can help you improve the accessibility of your website. For many websites, things like performance and accessibility are an afterthought. But as web developers, it’s best to strive to create the best possible experience we can for our users, regardless of their abilities. This article uses Google Chrome since it’s a browser I use and feel comfortable with. That being said, Firefox, Safari, and Edge have all made great strides in their developer tools, and they definitely have some great accessibility-related features of their own.

I spend a lot of time in DevTools, and in doing so, I’ve come to learn about some of the more ‘hidden’ features in DevTools and would love to share some of them with you in this article — specifically around accessibility.

This article uses Google Chrome since it’s a browser I use and feel comfortable with. That being said, Firefox, Safari, and Edge have all made great strides in their developer tools, and they definitely have some great accessibility-related features of their own.

You might already be familiar with DevTools, but here’s a quick reminder how to inspect an element on a webpage:

1. Open a webpage you are interested in inspecting, in Google Chrome
2. Use the shortcut <kbd>⌘</kbd>+<kbd>Shift</kbd>+<kbd>C</kbd> (<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>C</kbd> on Windows)
3. Your pointer is in Inspect Element mode, go ahead and click an element on the webpage

Just like that, you’ve opened up DevTools and have begun inspecting elements. The different panels correspond to different features, e.g. around JavaScript debugging, performance, and so on.

There are accessibility-related features scattered throughout, so let us explore what they do, where they live, and how to use them.

---

## Contrast Ratio

This is a feature to check whether the inspected text has a satisfactory color contrast against the background color.

Typically, a [<VPIcon icon="iconfont icon-w3c"/>high level of contrast](https://webaim.org/articles/contrast/) between the text color and underlying background color means more legible text for users of different abilities. In addition, it helps support users reading your text in a variety of [<VPIcon icon="iconfont icon-w3c"/>environmental conditions](https://w3.org/WAI/perspective-videos/contrast/), consider these examples which can impact how a user perceives text legibility:

- Looking at a screen while outside with lots of sunlight
- A mobile device has lowered its screen brightness all the way down to preserve battery life

::: info Understanding Success Criterion 1.4.3: Contrast (Minimum) (<VPIcon icon="iconfont icon-w3c"/><code>w3.org</code>)

> “The intent is to provide enough contrast between text and its background so that it can be read by people with moderately low vision.”  

```component VPCard
{
  "title": "Understanding Success Criterion 1.4.3: Contrast (Minimum) | WAI | W3C",
  "desc": "",
  "link": "https://w3.org/WAI/WCAG21/Understanding/contrast-minimum.html/",
  "logo": "https://w3.org/favicon.ico",
  "background": "rgba(0,90,156,0.2)"
}
```

:::

Using the contrast ratio tool can give us an immediate yes/no answer to the question: does this text meet the minimum contrast standard. Using this tool can help influence the design and [<VPIcon icon="fas fa-globe"/>color scheme](https://toolness.github.io/accessible-color-matrix/) of your website, which can lead to more readable content for users with low vision.

![Contrast ratio in the color picker tool ([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/069416b8-6099-4284-be39-914fe858f9fc/accessibility-chrome-devtools-contrast-ratio.png))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/069416b8-6099-4284-be39-914fe858f9fc/accessibility-chrome-devtools-contrast-ratio.png)

Available in the color picker tool, the contrast ratio feature can inform you on whether a minimum contrast requirement has been met. To access this feature:

1. Inspect a text element with the DevTools
2. Find the color property in the Styles pane, and click the small colored square to bring up the color picker tool
3. Click on the text which says ‘Contrast ratio’ which presents further information on this subject

The three ratios represent:

- Your current contrast ratio
- The [<VPIcon icon="iconfont icon-w3c"/>minimum](https://w3.org/WAI/WCAG21/quickref/#contrast-minimum) contrast ratio (AA)
- The [<VPIcon icon="iconfont icon-w3c"/>enhanced](https://w3.org/WAI/WCAG21/quickref/#contrast-enhanced) contrast ratio (AAA)

As an exercise for yourself: drag the circular color picker tool across the color spectrum and observe the points at which the minimum contrast and enhanced contrast ratios are satisfied.

This feature can also be reported to you through a Lighthouse Report, covered in Lighthouse section of this article.

---

## Accessibility Inspector

This refers to a DevTools pane which lets you view various accessibility properties and ARIA information for DOM nodes.

[<VPIcon icon="fa-brands fa-firefox"/>ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA) refers to a collection of properties, typically used in HTML, which in turn makes your website more accessible to individuals of different abilities. It’s absolutely worth using on your own websites, but it does require understanding the [<VPIcon icon="fa-brands fa-firefox"/>fundamentals of web accessibility](https://developer.mozilla.org/en-US/docs/Learn/Accessibility) to ensure you’re using it in a way which will help your users.

For example consider the following piece of HTML:

```html
<p class="alert" role="alert">
  That transaction was successful
</p>
```

An assistive device, such as a [<VPIcon icon="fa-brands fa-firefox"/>screen reader,](https://developer.mozilla.org/en-US/docs/Glossary/Screen_reader) can use the `role="alert"` property to announce such information to the user. The Accessibility pane within DevTools can cherry-pick such a property (`role`) and present it to you, so it’s clear what accessibility-related properties an element has.

Validating the information you see in this pane can help answer the question: “Am I coding accessibility incorrectly”, whether it’s syntactically or structurally, just keep in mind, applying accessibility techniques with the correct syntax, and having an [<VPIcon icon="iconfont icon-w3c"/>accessible website](https://w3.org/WAI/fundamentals/accessibility-intro/), are two different things!

![The accessibility pane within the Elements Panel ([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/9fa36b74-911c-4945-909d-f24608129e74/accessibility-chrome-devtools-a11y-inspector.png))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/9fa36b74-911c-4945-909d-f24608129e74/accessibility-chrome-devtools-a11y-inspector.png)

To start using this, you can open up the Accessibility pane with an inspected element:

1. Inspect any element on the page, e.g. a hyperlink or search box
2. Open up the Accessibility pane which is found in the Elements Panel

::: tip Bonus tip

Rather than having to locate the pane (it’s not open by default), I search for ‘Show Accessibility’ in the Command Menu (<kbd>⌘</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>).

:::

You’ll find a bunch of information here, such as:

- An [<VPIcon icon="iconfont icon-w3c"/>accessibility tree](https://w3.org/WAI/PF/aria-implementation/#intro_treetypes) (a subset of the DOM tree)
- [<VPIcon icon="fa-brands fa-firefox"/>ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA) attributes
- Computed accessibility properties (e.g. is something focusable, is it editable, does it pass form validation)

Depending on the inspected element, some of this information may not be applicable, for example, maybe an element legitimately does not need ARIA attributes.

As with most features in DevTools, what you see in this pane is ‘live’ — changes you make in the Elements Panel DOM Tree are reflected back to this pane immediately, making it helpful for correcting a misspelled ARIA attribute for example.

If you’re confident in your use of Accessibility, possibly because you’re using an alternative automated testing tool such as [<VPIcon icon="fas fa-globe"/>axe](https://deque.com/axe/), then you may not use this pane very often, and that’s okay.

If you’re interested in learning more while looking at real-world websites, I’ve made a 14-minute video on [<VPIcon icon="fa-brands fa-youtube"/>Accessibility debugging with Chrome DevTools](https://youtu.be/xWPMfcjhts8).

Play

Video on Accessibility debugging with Chrome DevTools

---

## Lighthouse

[<VPIcon icon="fa-brands fa-google"/>Lighthouse](https://developers.google.com/web/tools/lighthouse) is an automated website checker that can scan for best practices, accessibility, security, and more.

If you’ve done some reading on accessibility theory, and you want to learn how to effectively apply it to your own website, this is a great tool to use since it’s quite literally a point-and-click interface — no installation required. In addition, all of its audits are very instructional, informing you what failed, and why something failed.

Following the suggestions from this tool will almost certainly help improve the [<VPIcon icon="iconfont icon-webdev"/>accessibility](https://web.dev/accessibility-scoring/) of your site.

![A Lighthouse audit report ([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/a2278821-a2b8-42d6-bb65-6bf14e59e94c/accessibility-chrome-devtools-lighthouse.png))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/a2278821-a2b8-42d6-bb65-6bf14e59e94c/accessibility-chrome-devtools-lighthouse.png)

While checking for security, general web best practices, performance is helpful. Let’s focus on how to run an accessibility audit in Lighthouse:

1. Navigate to the Lighthouse panel in DevTools
2. Uncheck all categories, but keep ‘Accessibility’ checked
3. Click ‘Generate Report’
4. In the resulting report, click through the different suggestions to learn more about them

![Passed audits are still a good learning opportunity ([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/44e9cf35-5865-4186-b71c-96223e4fd949/accessibility-chrome-devtools-lighthouse-passed.png))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/44e9cf35-5865-4186-b71c-96223e4fd949/accessibility-chrome-devtools-lighthouse-passed.png)

If you want to learn more about Accessibility (I certainly do!), clicking through failed, but even passed audits are a great way to learn since almost each audit links off to dedicated web developer documentation on the audit itself, and why it’s important.

For the most part, the audit documentation pages are extremely succinct and I highly recommend them. Let’s take a look at the audit [<VPIcon icon="iconfont icon-webdev"/>documentation](https://web.dev/document-title/) for ensuring a `<title>` element is present. It specifies:

- How the Lighthouse title audit fails
- How to add a title
- Tips for creating great titles
- Example of a title *not* to use, along with a title worth using

And in the case of the document title documentation, it only took 300 words to explain those 4 points above.

One interesting thing to note, unlike the Accessibility pane, Lighthouse Audits are very instructional by default, making the Lighthouse panel a great place to visit when you’re just getting started out.

![The ‘Learn more’ link opens a new window to well written documentation ([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/d7b4bf85-3b35-471f-9dc1-457051154eb1/accessibility-chrome-devtools-lighthouse-learn-more.png))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/d7b4bf85-3b35-471f-9dc1-457051154eb1/accessibility-chrome-devtools-lighthouse-learn-more.png)

::: info From X (<VPIcon icon="fa-brands fa-x-twitter"/><code>x.com</code>)

> [As you become more advanced with building accessible pages, you may move away from pre-defined audits and spend more time in the accessibility pane.](https://twitter.com/share?text=%0aAs%20you%20become%20more%20advanced%20with%20building%20accessible%20pages,%20you%20may%20move%20away%20from%20pre-defined%20audits%20and%20spend%20more%20time%20in%20the%20accessibility%20pane.%0a&url=https://smashingmagazine.com%2f2020%2f08%2faccessibility-chrome-devtools%2f)

:::

---

## Emulate Vision Deficiencies

This is a DevTools feature to apply vision deficiencies, such as blurred vision, to the current page.

::: info (<VPIcon icon="iconfont icon-w3c"/><code>w3.org</code>)

> “Globally, approximately 1 in 12 men (8%) and 1 in 200 women have color vision deficiencies.”  

```component VPCard
{
  "title": "Accessibility Requirements for People with Low Vision",
  "desc": "",
  "link": "https://w3.org/TR/low-vision-needs/",
  "logo": "",
  "background": "rgba(244,245,255,0.2)"
}
```

:::

You’ll want to use this feature to help ensure your website meets the needs of your users. If your website is displaying an important image, you may discover that this image is difficult to comprehend for someone with [<VPIcon icon="fa-brands fa-wikipedia-w"/>tritanopia](https://en.wikipedia.org/wiki/Color_blindness) (impaired blue and yellow vision), or is even difficult to comprehend for someone with blurred vision.

::: info (<VPIcon icon="iconfont icon-w3c"/><code>w3.org</code>)

> “Some low visual acuity can be corrected with glasses, contact lenses, or surgery — and some cannot. Therefore, some people will have blurry vision (low visual acuity) no matter what.”  

```component VPCard
{
  "title": "Accessibility Requirements for People with Low Vision",
  "desc": "",
  "link": "https://w3.org/TR/low-vision-needs/",
  "logo": "",
  "background": "rgba(244,245,255,0.2)"
}
```

:::

For example, in the case of an image, you may find that there is a higher resolution image available for download while emulating blurred vision via DevTools, rather than a user with blurred vision can use and in turn comprehend what the image is showing. This will require some [**design/UX based problem-solving skills**](/smashingmagazine.com/designing-accessibility-inclusion.md) — possibly from you/your colleagues — but it can be the difference between meeting the needs of your users, or not meeting their needs.

::: note Please note

The following image is partially blurred, to demonstrate the ‘Blurred vision’ emulation feature of DevTools.

:::

![Blurred vision doesn’t affect colors on the page, but the other deficiencies do ([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/8b7629f2-b7ba-4467-847e-a749c7488b25/accessibility-chrome-devtools-emulating-blurred-vision.png))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/8b7629f2-b7ba-4467-847e-a749c7488b25/accessibility-chrome-devtools-emulating-blurred-vision.png)

You can try this feature out with the following steps:

1. Open the Command Menu (<kbd>⌘</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> or <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> on Windows)
2. Search for and select ‘Show rendering’
3. Select a vision deficiency such as ‘Blurred vision’ from the Emulate vision deficiencies section in the Rendering Pane.

Here are a few examples of vision deficiencies you can apply via DevTools:

- **Blurred vision**<br/>Where vision is less precise
- **Protanopia**<br/>Color blindness resulting from insensitivity to red light
- **Tritanopia**<br/>Impaired blue and yellow vision

Emulation features like this will not fully account for subtle differences in how such deficiencies manifest themselves with individuals, let alone the wide range of vision deficiencies out there. That being said, this feature can still help us as web developers with understanding and improving the accessibility of our pages.

---

## Inspect Element Tooltip

This feature refers to an improved tooltip which now surfaces accessibility-related information when you use the ‘Inspect Element’ feature. It’s a subtle, yet still very important feature since it can inform you of how accessible elements are, at a quick glance.

I say it’s important because in the case of the four other features mentioned in this article, they require intentional action on our part (click the generate report button, navigate to the Accessibility pane, open the color picker tool, and so on). However, for this feature, it surfaces in one of the most common actions of DevTools while inspecting an element.

As a short challenge for yourself, take a look at the following two screenshots. They demonstrate the enhanced DevTools Inspect Element tooltip which now has an accessibility section on there. Can you identify what the properties in that section represent?

![[<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/7a3dbe3e-72ce-40c3-9db4-fae993d60ad9/accessibility-chrome-devtools-inspect-tooltip.png)](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/7a3dbe3e-72ce-40c3-9db4-fae993d60ad9/accessibility-chrome-devtools-inspect-tooltip.png)

![[<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/a2120835-5cfc-47c1-9c62-25cd1d46354d/accessibility-chrome-devtools-inspect-tooltip-alt.png)](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/a2120835-5cfc-47c1-9c62-25cd1d46354d/accessibility-chrome-devtools-inspect-tooltip-alt.png)

You may notice that these are the exact same pieces of information we saw earlier — as part of the Contrast Ratio section and the Accessibility Inspector. They’re the same properties but surfaced in a (hopefully) simpler way.

Note: There’s also a “Keyboard-focusable” property in that tooltip (the very last item). This indicates whether or not the item is [<VPIcon icon="iconfont icon-webdev"/>keyboard accessible](https://web.dev/control-focus-with-tabindex/). If true, this will typically suggest the element in question can be focussed by tabbing to it.

The way I see it: Inspect Element is an extremely common use case within browser DevTools, so cherry-picking useful accessibility-related properties for the Inspect Element tooltip can serve as a helpful reminder, and prompt us as web developers to investigate further and ensure what we’re building is accessible.

---

## Conclusion

Web developer tooling to improve accessibility has improved rapidly over the years, but sometimes these tools are hidden away or simply undocumented. In this article, we explored some of those features which can hopefully help us when applying accessibility best practices to the websites we build.

Here’s a reminder of what we covered:

- **Contrast ratio**<br/>Check whether the inspected text element has a satisfactory contrast ratio.
- **Accessibility Inspector**<br/>View various accessibility properties and ARIA information.
- **Lighthouse**<br/>A website checker that covers best practices, accessibility, and more.
- **Emulate vision deficiencies**<br/>A tool to apply vision deficiencies (such as blurred vision) to the page.
- **Inspect Element Tooltip**<br/>An improved tooltip which surfaces accessibility-related information.

I make the [<VPIcon icon="fas fa-globe"/>Dev Tips](https://umaar.com/dev-tips/) mailing list if you want to keep up to date with over 200 web development tips! I also post loads of bonus web development resources on my [Twitter (<VPIcon icon="fa-brands fa-x-twitter"/>`umaar`)](https://x.com/umaar).

That’s it for now! Thank you for reading.

::: info Further Reading

```component VPCard
{
  "title": "Overflow Issues In CSS",
  "desc": "You may have come across horizontal scrollbar issues, especially on mobile, if you’re a front-end developer. Because there are many causes of scrollbar problems, there is no straightforward solution. Some issues can be fixed quickly, and some need a little debugging skill. In this article, Ahmad Shadeed will explore the causes of overflow issues and how to solve them. We will also explore how modern features in the developer tools (DevTools) can make the process of fixing and debugging easier.",
  "link": "/smashingmagazine.com/css-overflow-issues.md",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```

- [**A Designer’s Accessibility Advocacy Toolkit**](/smashingmagazine.com/web-designer-accessibility-advocacy-toolkit.md)
- [**Pricing Projects As A Freelancer Or Agency Owner**](/smashingmagazine.com/pricing-projects-freelancer-agency-owner.md)

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Accessibility In Chrome DevTools",
  "desc": "In this article, Umar Hansa will demonstrate some useful features in DevTools which can help you improve the accessibility of your website. For many websites, things like performance and accessibility are an afterthought. But as web developers, it’s best to strive to create the best possible experience we can for our users, regardless of their abilities. This article uses Google Chrome since it’s a browser I use and feel comfortable with. That being said, Firefox, Safari, and Edge have all made great strides in their developer tools, and they definitely have some great accessibility-related features of their own.",
  "link": "https://chanhi2000.github.io/bookshelf/smashingmagazine.com/accessibility-chrome-devtools.html",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```
