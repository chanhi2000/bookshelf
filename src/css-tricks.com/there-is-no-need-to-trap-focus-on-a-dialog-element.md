---
lang: en-US
title: "There is No Need to Trap Focus on a Dialog Element"
description: "Article(s) > There is No Need to Trap Focus on a Dialog Element"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - css-tricks.com
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > There is No Need to Trap Focus on a Dialog Element"
    - property: og:description
      content: "There is No Need to Trap Focus on a Dialog Element"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/there-is-no-need-to-trap-focus-on-a-dialog-element.html
prev: /programming/css/articles/README.md
date: 2026-01-26
isOriginal: false
author:
  - name: Zell Liew
    url : https://css-tricks.com/author/zellwk/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2019/04/tab-key.png
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
  name="There is No Need to Trap Focus on a Dialog Element"
  desc="Accessibility advice around modals have commonly taught us to trap focus within the modal. Upon further research, it seems like we no longer need to trap focus within the <dialog> (even in modal mode)."
  url="https://css-tricks.com/there-is-no-need-to-trap-focus-on-a-dialog-element"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2019/04/tab-key.png"/>

I was building a `Modal` component that uses the `<dialog>` element’s `showModal` method. While testing the component, I discovered I could tab out of the `<dialog>` (in modal mode) and onto the address bar.

And I was surprised — accessibility advice around modals have commonly taught us to trap focus within the modal. So this seems wrong to me.

Upon further [research (<VPIcon icon="iconfont icon-github" />`whatwg/html`)](https://github.com/whatwg/html/issues/8339), it seems like we no longer need to trap focus within the `<dialog>` (even in modal mode). So, the focus-trapping is deprecated advice if you use `<dialog>`.

---

## Some notes for you

Instead of asking you to read through the entire [GitHub Issue (<VPIcon icon="iconfont icon-github" />`whatwg/html`)](https://github.com/whatwg/html/issues/8339) detailing the discussion, I summarized a couple of key points from notable people below.

Here are some [comments (<VPIcon icon="iconfont icon-github" />`whatwg/html`)](https://github.com/whatwg/html/issues/8339#issuecomment-1263470105) from Scott O’Hara that tells us about the history and context of the focus-trapping advice:

> WCAG is *not* normatively stating focus must be trapped within a dialog. Rather, the normative WCAG spec makes zero mention of requirements for focus behavior in a dialog.
>
> The informative [<VPIcon icon="iconfont icon-w3c"/>2.4.3 focus order understanding doc](https://w3.org/WAI/WCAG21/Understanding/focus-order.html) *does* talk about limiting focus behavior within a dialog – but again, this is in the context of a scripted custom dialog and was written long before `inert` or `<dialog>` were widely available.
>
> The purpose of the APG is to demonstrate how to use ARIA. And, without using native HTML features like `<dialog>` or `inert`, it is far easier to trap focus within the custom dialog than it is to achieve the behavior that the `<dialog>` element has.
>
> Both the APG modal dialog and the WCAG understanding doc were written long before the `inert` attribute or the `<dialog>` element were widely supported. And, the alternative to instructing developers to trap focus in the dialog would have been to tell them that they needed to ensure that all focusable elements in the web page, outside of the modal dialog, received a `tabindex=-1`.

Léonie Watson [weighs in (<VPIcon icon="iconfont icon-github" />`whatwg/html`)](https://github.com/whatwg/html/issues/8339#issuecomment-1758129923) and explains why it’s okay for a screen-reader user to move focus to the address bar:

> In the page context you can choose to Tab out of the bottom and around the browser chrome, you can use a keyboard command to move straight to the address bar or open a particular menu, you can close the tab, and so on. This gives people a choice about how, why, and what they do to escape out of the context.
>
> It seems logical (to me at least) for the same options to be available to people when in a dialog context instead of a page context.

Finally, [Matatk (<VPIcon icon="iconfont icon-github" />`whatwg/html`)](https://github.com/whatwg/html/issues/8339#issuecomment-1822591131) shared the conclusion from the W3C’s Accessible Platform Architectures (APA) Working Group that okay-ed the notion that `<dialog>`‘s `showModal` method doesn’t need to trap focus.

> We addressed this question in the course of several APA meetings and came to the conclusion that the current behavior of the native dialog element should be kept as it is. So, that you can tab from the dialog to the browser functionalities.
>
> We see especially the benefit that keyboard users can, for example, open a new tab to look something important up or to change a browser setting this way. At the same time, the dialog element thus provides an additional natural escape mechanism (i.e. moving to the address bar) in, for example, kiosk situations where the user cannot use other standard keyboard shortcuts.

From what I’m reading, it sounds like we don’t have to worry about focus trapping if we’re properly using the Dialog API’s `showModal` method!

Hope this news make it easier for you to build components. 😉

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "There is No Need to Trap Focus on a Dialog Element",
  "desc": "Accessibility advice around modals have commonly taught us to trap focus within the modal. Upon further research, it seems like we no longer need to trap focus within the <dialog> (even in modal mode).",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/there-is-no-need-to-trap-focus-on-a-dialog-element.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
