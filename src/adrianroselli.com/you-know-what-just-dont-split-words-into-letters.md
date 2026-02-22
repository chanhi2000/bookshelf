---
lang: en-US
title: "You Know What? Just Don’t Split Words into Letters"
description: "Article(s) > You Know What? Just Don’t Split Words into Letters"
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
      content: "Article(s) > You Know What? Just Don’t Split Words into Letters"
    - property: og:description
      content: "You Know What? Just Don’t Split Words into Letters"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/adrianroselli.com/you-know-what-just-dont-split-words-into-letters.html
prev: /programming/css/articles/README.md
date: 2026-02-06
isOriginal: false
author:
  - name: https://adrianroselli.com
    url: https://adrianroselli.com/contact
cover: https://adrianroselli.com/wp-content/uploads/2026/02/SplitText-Narr_poster-300x169.jpg
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
  name="You Know What? Just Don’t Split Words into Letters"
  desc="This is an unplanned part two for Barriers from Links with ARIA. The title reflects my exasperation because this isn’t new, I’ve simply failed to be explicit about it over the last decade or so. In 2012 I vented about TypeButter using <kern style=”letter-spacing: -0.01em;”> for each letter. In 2020…"
  url="https://adrianroselli.com/2026/02/you-know-what-just-dont-split-words-into-letters.html"
  logo="https://adrianroselli.com/wp-content/themes/AAR/favicon.png"
  preview="https://adrianroselli.com/wp-content/uploads/2026/02/SplitText-Narr_poster-300x169.jpg"/>

This is an unplanned part two for [**Barriers from Links with ARIA**](https://adrianroselli.com/2026/01/barriers-from-links-with-aria.html)<!-- TODO: /adrianroselli.com/barriers-from-links-with-aria.md -->. The title reflects my exasperation because this isn’t new, I’ve simply failed to be explicit about it over the last decade or so.

In 2012 [<VPIcon icon="fas fa-globe"/>I vented about TypeButter](https://xcancel.com/aardrian/status/184979227232309248) using `<kern style="letter-spacing: -0.01em;">` for each letter. In 2020 [<VPIcon icon="fas fa-globe"/>I noted the AWWWards site](https://xcancel.com/aardrian/status/1220115927011938309) wrapped every letter in a `<div>` for animation, which screen readers presented letter by letter. In 2022, [i<VPIcon icon="fas fa-globe"/>t was BeeLine Reader](https://xcancel.com/aardrian/status/1494400740286246917) using `<span>`s to achieve gradients across a word.

In 2026 I am finally writing about it because GSAP has its [<VPIcon icon="iconfont icon-gsap"/>SplitText plug-in asserting screen reader support](https://gsap.com/docs/v3/Plugins/SplitText/#screen-reader-accessibility) that doesn’t stand up to use. I appreciate the [<VPIcon icon="fa-brands fa-youtube"/>embedded video](https://youtu.be/L1afzNAhI40?t=821) explains how it should work, and even includes an unnamed screen reader demo, but GSAP assumes authors will use SplitText in a very specific way and fails to note potential problems. That’s a bummer because now I have to be the buzzkill.

---

## GSAP’s Demo

This is the animation demo on the SplitText page (or go to the [debug view (<VPIcon icon="fa-brands fa-codepen" />`GreenSock`)](https://cdpn.io/GreenSock/debug/xxmaNYj) if you want to test it):

<CodePen
  user="GreenSock"
  slug-hash="xxmaNYj"
  title="SplitText Demo"
  :default-tab="['css','result']"
  :theme="dark"/>

I also [made a fork (<VPIcon icon="fa-brands fa-codepen" />`aardrian`)](https://codepen.io/aardrian/pen/dPXjgwG), just in case GSAP changes the code later (which would mess with future testing).

The simplest way to test this is to fire up a screen reader and try navigating the page with whatever method you prefer. You may get different results than I did, but that’s the fun of testing! Though I did get confirmation [<VPIcon icon="fas fa-globe"/>from one](https://dragonscave.space/@MostlyBlindGamer/116014749485642673), [<VPIcon icon="fas fa-globe"/>then another](https://node.isonomia.net/@modulux/statuses/01KGNCVAG4WQH82FA6SDZ075P3), [<VPIcon icon="fas fa-globe"/>then a third](https://dragonscave.space/@menelion/116014953936550552) screen reader user.

If you press the “Characters” button, this is the HTML output of the first line of text (which is in its own `<div>`):

```html :collapsed-lines
<div aria-hidden="true" style="position: relative; display: block; text-align: center;">
  <div aria-hidden="true" style="position: relative; display: inline-block;">
    <div aria-hidden="true" style="position: relative; display: inline-block; translate: none; rotate: none; scale: none; opacity: 1; transform: translate(0px);">B</div>
    <div aria-hidden="true" style="position: relative; display: inline-block; translate: none; rotate: none; scale: none; opacity: 1; transform: translate(0px);">r</div>
    <div aria-hidden="true" style="position: relative; display: inline-block; translate: none; rotate: none; scale: none; opacity: 1; transform: translate(0px);">e</div>
    <div aria-hidden="true" style="position: relative; display: inline-block; translate: none; rotate: none; scale: none; opacity: 1; transform: translate(0px);">a</div>
    <div aria-hidden="true" style="position: relative; display: inline-block; translate: none; rotate: none; scale: none; opacity: 1; transform: translate(0px);">k</div>
  </div>
  <div aria-hidden="true" style="position: relative; display: inline-block;">
    <div aria-hidden="true" style="position: relative; display: inline-block; translate: none; rotate: none; scale: none; opacity: 1; transform: translate(0px);">a</div>
    <div aria-hidden="true" style="position: relative; display: inline-block; translate: none; rotate: none; scale: none; opacity: 1; transform: translate(0px);">p</div>
    <div aria-hidden="true" style="position: relative; display: inline-block; translate: none; rotate: none; scale: none; opacity: 1; transform: translate(0px);">a</div>
    <div aria-hidden="true" style="position: relative; display: inline-block; translate: none; rotate: none; scale: none; opacity: 1; transform: translate(0px);">r</div>
    <div aria-hidden="true" style="position: relative; display: inline-block; translate: none; rotate: none; scale: none; opacity: 1; transform: translate(0px);">t</div>
  </div>
  <div aria-hidden="true" style="position: relative; display: inline-block;">
    <div aria-hidden="true" style="position: relative; display: inline-block; translate: none; rotate: none; scale: none; opacity: 1; transform: translate(0px);">H</div>
    <div aria-hidden="true" style="position: relative; display: inline-block; translate: none; rotate: none; scale: none; opacity: 1; transform: translate(0px);">T</div>
    <div aria-hidden="true" style="position: relative; display: inline-block; translate: none; rotate: none; scale: none; opacity: 1; transform: translate(0px);">M</div>
    <div aria-hidden="true" style="position: relative; display: inline-block; translate: none; rotate: none; scale: none; opacity: 1; transform: translate(0px);">L</div>
  </div>
  <div aria-hidden="true" style="position: relative; display: inline-block;">
    <div aria-hidden="true" style="position: relative; display: inline-block; translate: none; rotate: none; scale: none; opacity: 1; transform: translate(0px);">t</div>
    <div aria-hidden="true" style="position: relative; display: inline-block; translate: none; rotate: none; scale: none; opacity: 1; transform: translate(0px);">e</div>
    <div aria-hidden="true" style="position: relative; display: inline-block; translate: none; rotate: none; scale: none; opacity: 1; transform: translate(0px);">x</div>
    <div aria-hidden="true" style="position: relative; display: inline-block; translate: none; rotate: none; scale: none; opacity: 1; transform: translate(0px);">t</div>
  </div>
  <div aria-hidden="true" style="position: relative; display: inline-block;">
    <div aria-hidden="true" style="position: relative; display: inline-block; translate: none; rotate: none; scale: none; opacity: 1; transform: translate(0px);">i</div>
    <div aria-hidden="true" style="position: relative; display: inline-block; translate: none; rotate: none; scale: none; opacity: 1; transform: translate(0px);">n</div>
    <div aria-hidden="true" style="position: relative; display: inline-block; translate: none; rotate: none; scale: none; opacity: 1; transform: translate(0px);">t</div>
    <div aria-hidden="true" style="position: relative; display: inline-block; translate: none; rotate: none; scale: none; opacity: 1; transform: translate(0px);">o</div>
  </div>
</div>
```

Five words.

---

## The ARIA Non-Solution

The demo uses a [<VPIcon icon="iconfont icon-w3c"/>`<div>`, which in the HTML AAM maps to the `generic` role](https://w3.org/TR/html-aam-1.0/#el-div). The problem here is that the [<VPIcon icon="fas fa-globe"/>`generic` role does not allow itself to be named by the author](https://w3c.github.io/aria/#namefromprohibited) — which means [<VPIcon icon="fas fa-globe"/>`aria-label` is prohibited on it](https://w3c.github.io/aria/#aria-label).

The [<VPIcon icon="iconfont icon-gsap"/>example code GSAP offers](https://gsap.com/docs/v3/Plugins/SplitText/#built-in-aria), however, shows headings instead ([<VPIcon icon="fas fa-globe"/>which allow `aria-label`](https://w3c.github.io/aria/#heading)). It makes no mention of the restrictions on which roles allow `aria-label`. An author might think nothing of using `aria-label` on a `<div>`. Kind of like the embedded GSAP demo.

When `aria-label` is used on an element that allows it, the GSAP page makes no mention of other risks. I’ve repeatedly said [**`aria-label` may not auto-translate for users**](/adrianroselli.com/aria-label-does-not-translate.md). It also doesn’t talk about [<VPIcon icon="iconfont icon-w3c"/>WCAG SC 2.5.3 Label in Name](https://w3.org/WAI/WCAG22/Understanding/label-in-name.html) risks when `aria-label` is applied to any control.

---

## Hiding Content

Kind of a nitpick, but the GSAP page links to a CSS-Tricks post that itself simply links to Scott’s [<VPIcon icon="fas fa-globe"/>Inclusively Hidden](https://scottohara.me/blog/2017/04/14/inclusively-hidden.html) post. Scott’s post got an update in 2023. CSS-Tricks’ post did not. I consider that a disservice to both Scott and readers.

---

## Videos

I hate making these videos. It takes so much time. But it’s evidence. Or proof. Or something.

NVDA 2025.3.2 with Firefox 147.0.2. The text is announced both before and after animation.
<VidStack src="https://adrianroselli.com/wp-content/uploads/2026/02/SplitText-NVDA.mp4" />

JAWS 2026.2512.50 with Chrome 144. The text is never announced.
<VidStack src="https://adrianroselli.com/wp-content/uploads/2026/02/SplitText-JAWS.mp4" />

Narrator Win 11 25H2 26200.7623 with Edge 144. Only the first letter of the text is ever announced.
<VidStack src="https://adrianroselli.com/wp-content/uploads/2026/02/SplitText-Narr.mp4" />

VoiceOver macOS 26.2 with Safari 26.2. Only a sub-set of the letters is exposed, and those are read letter-by-letter. This video is more sloppy owing to not feeding the audio properly and an electrician poking holes in my walls.
<VidStack src="https://adrianroselli.com/wp-content/uploads/2026/02/SplitText-VO.mp4" />

Orca Ubuntu 25.04 with Firefox 146. The text is announced both before and after animation.
<VidStack src="https://adrianroselli.com/wp-content/uploads/2026/02/SplitText-Orca.mp4" />

I was going to make videos for VoiceOver iPadOS with Safari, TalkBack with Chrome, and TalkBack with Firefox, but I got tired. If you’ve been reading my blog long enough, then [**you should know the commands to give it a try**](/adrianroselli.com/your-accessibility-claims-are-wrong-unless.md#SRs).

Similarly, you can [**pop open the Braille viewers on the desktop**](/adrianroselli.com/jaws-nvda-and-voiceover-braille-viewers.md) and see how those perform.

---

## Results

I’ve reduced these to a binary yes/no. I also added mobile results, for which I made no videos.

### SplitText in Screen Readers

| Pairing | Works? |
| :---: | :---: |
| NVDA / Firefox | yes |
| JAWS / Chrome | ❌ |
| Narrator / Edge | ❌ |
| VO macOS / Safari | ❌ |
| Orca / Firefox | ❌ |
| TalkBack / Chrome | yes |
| TalkBack / Firefox | ❌ |
| VO iPadOS / Safari | ❌ |

---

## Bug Report

This post is a warning to authors. I’ve also filed an issue with GSAP asking the SplitText page to clarify the risks and limitations: [#642 Screen Readers do not expose SplitText (<VPIcon icon="iconfont icon-github" />`greensock/GSAP`)](https://github.com/greensock/GSAP/issues/642)

I don’t expect them to be able to jump on the bug report immediately, and they will almost definitely want to perform further testing. So until they can tackle it, I strongly recommend avoiding SplitText.

---

## Wrap-up

If you need to split words into their constituent letters in order to adjust kerning, give them gradients, animate them, or whatever, well, no you don’t. Find another method.

If the GSAP people who guaranteed their approach works with screen readers got it wrong, it seems likely you will too. Unless you have all the screen reader, browser, platform, and TTS variations along with the screen reader navigation skills needed to perform ongoing and robust testing.

Which you don’t.

::: note Update: Same Damn Day

 Sorry, your browser doesn’t support embedded videos, but don’t worry, you can [<VPIcon icon="fas fa-file-video"/>download it](https://adrianroselli.com/wp-content/uploads/2026/02/ui-dot-shit.mp4).

Turn your terminal into is completed letter by letter first with an interface designer, which is deleted letter by letter and replaced with a frontend wizard, and then replaced by an accessibility expert. The browser dev tools show it’s all in a `<span>` with an `aria-label`.

The makers of Tailwind, dissatisfied with pushing verbose class names on human authors only, have decided to target LLMs with [<VPIcon icon="fas fa-globe"/>ui.sh](https://ui.sh/) (pronounced “wish”). While this [<VPIcon icon="fas fa-globe"/>hilarious](https://front-end.social/@mayank/116015669183729724), [<VPIcon icon="fas fa-globe"/>non-parody](https://toot.cafe/@thomaswilburn/116019993666382011) home page doesn’t make the mistake of wrapping every letter in its own element, it does make the mistake of using `aria-label`.

I’ve decided it warrants a mention here.

The good news is this will help guarantee the need for human accessibility practitioners over poorly-trained LLMs.

:::

::: note Update: 10 February 2026

[<VPIcon icon="fas fa-globe"/>Jeffrey Yasskin says](https://hachyderm.io/@jyasskin/116019609903019948) the W3C TAG was looking at a proposal for `<canvas>` to split a JavaScript string into glyphs to render them in the canvas, with the TAG asking for the proposal to squeeze those “letter” into the DOM. I say “was” because as of yesterday the TAG closed it as “unsatisfied.” Read the [TAG’s (via Matt) reasoning for why (<VPIcon icon="iconfont icon-github" />`w3ctag/design-reviews`)](https://github.com/w3ctag/design-reviews/issues/1095#issuecomment-3872160989). Also, [<VPIcon icon="fas fa-globe"/>Jeffrey added more context on Masto](https://hachyderm.io/@jyasskin/116048766717619337).

:::

::: info Other Posts

[**Earlier post: Barriers from Links with ARIA**](/adrianroselli.com/barriers-from-links-with-aria.md)

```component VPCard
{
  "title": "Honoring Mobile OS Text Size",
  "desc": "If your users scale the text size in Android or iDeviceOS, that doesn’t always affect the size of text on a web page. It’s a function of browser and authored code, as opposed to a standardized approach. That may be changing. Support The current state of affairs in the three…",
  "link": "/adrianroselli.com/honoring-mobile-os-text-size.md",
  "logo": "https://adrianroselli.com/wp-content/themes/AAR/favicon.png",
  "background": "rgba(0,0,0,0.2)"
}
```

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "You Know What? Just Don’t Split Words into Letters",
  "desc": "This is an unplanned part two for Barriers from Links with ARIA. The title reflects my exasperation because this isn’t new, I’ve simply failed to be explicit about it over the last decade or so. In 2012 I vented about TypeButter using <kern style=”letter-spacing: -0.01em;”> for each letter. In 2020…",
  "link": "https://chanhi2000.github.io/bookshelf/adrianroselli.com/you-know-what-just-dont-split-words-into-letters.html",
  "logo": "https://adrianroselli.com/wp-content/themes/AAR/favicon.png",
  "background": "rgba(0,0,0,0.2)"
}
```
