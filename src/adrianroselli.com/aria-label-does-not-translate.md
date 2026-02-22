---
lang: en-US
title: "aria-label Does Not Translate"
description: "Article(s) > aria-label Does Not Translate"
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
      content: "Article(s) > aria-label Does Not Translate"
    - property: og:description
      content: "aria-label Does Not Translate"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/adrianroselli.com/aria-label-does-not-translate.html
prev: /programming/css/articles/README.md
date: 2019-11-07
isOriginal: false
author:
  - name: https://adrianroselli.com
    url: https://adrianroselli.com/contact
cover: https://adrianroselli.com/wp-content/uploads/2019/11/translate_thumb.png
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
  name="aria-label Does Not Translate"
  desc="As of my 25 July 2025 update at the end of this post, aria-label auto-translation support is less spotty than when I first wrote this post, but still unreliable. It does, actually. Sometimes. One of the big risks of using ARIA to define text content is that it often gets…"
  url="https://adrianroselli.com/2019/11/aria-label-does-not-translate.html"
  logo="https://adrianroselli.com/wp-content/themes/AAR/favicon.png"
  preview="https://adrianroselli.com/wp-content/uploads/2019/11/translate_thumb.png"/>

As of my 25 July 2025 update at the end of this post, `aria-label` auto-translation support is less spotty than when I first wrote this post, but still unreliable.

It does, actually. Sometimes.

One of the big risks of using ARIA to define text content is that it often gets overlooked in translation. Automated translation services often do not capture it. Those who pay for localization services all too often miss content in ARIA attributes when sending text strings to localization vendors.

That means content buried in [<VPIcon icon="iconfont icon-w3c"/>`aria-label`](https://w3.org/TR/wai-aria-1.1/#aria-label), [<VPIcon icon="iconfont icon-w3c"/>`aria-placeholder`](https://w3.org/TR/wai-aria-1.1/#aria-placeholder), [<VPIcon icon="iconfont icon-w3c"/>`aria-roledescription`](https://w3.org/TR/wai-aria-1.1/#aria-roledescription), or [<VPIcon icon="iconfont icon-w3c"/>`aria-valuetext`](https://w3.org/TR/wai-aria-1.1/#aria-valuetext) can end up being read to users in a language different than their own. The very thing we are adding to *help* screen reader users can be excluding them instead.

That makes constructs like the following particularly dangerous (from my post [**Uncanny A11y**](https://adrianroselli.com/2019/02/uncanny-a11y.html)<!-- TODO: /adrianroselli.com/uncanny-a11y.md -->):

```html
<a href="http://example.com/" target="_blank" aria-label="Opens in a new window">Visit their site</a>
```

```html
<button aria-label="Cancel">Close</button>
```

```html
<span class="status-meta">Only those with <a href="https://help.github.com/articles/what-are-the-different-access-permissions" class="tooltipped tooltipped-s" aria-label="Learn more about permission levels">write access</a> to this repository can merge pull requests.</span>
```

---

## Browsers

Browsers may or may not help users.

:::: tabs

@tab:active <VPIcon icon="fa-brands fa-chrome"/>

Updated 4 March 2023: Chrome may have regressed or my prior tests were not detailed enough. Either way, below I demonstrate Chrome failing to auto-translate `aria-label`.

::: note No Longer True

*November 2019*: In May plenty of users who live in the overlap of accessibility and internationalization were thrilled to hear [Google Chrome would translate `aria-label`](https://twitter.com/rob_dodson/status/1131939695120699392). The promise of [ARIA 1.2 for translatable ARIA attributes](https://w3c.github.io/aria/#translatable-states-and-properties) had arrived early. Messaging from Chrome, however, was unclear and [many took it to mean](https://twitter.com/mmatuzo/status/1138087533496164354) Google Translate itself was updated.

Chrome calls out to the Google Translate API on a page and, per [Issue 933519: Translate aria-label attributes](https://bugs.chromium.org/p/chromium/issues/detail?id=933519), translates the four ARIA attributes I listed above. This is great for Chrome users. Not so great for Firefox, (legacy) Edge, Internet Explorer, Safari, Vivaldi, Brave, Opera, etc. users.

:::

@tab <VPIcon icon="fa-brands fa-edge"/>

[Updated 4 March 2023](#Update04): Chrome may have regressed or my prior tests were not detailed enough. Either way, below I demonstrate Chrome failing to auto-translate `aria-label`.

::: note No Longer True

*November 2019*: There is some good and unexpected news for Edge (Chromiedge) users. While I have not seen this promoted anywhere, Edge will translate at least `aria-label`. Note that if you are still using legacy Edge you will not get this benefit. More reason to upgrade.

![Screen shots comparing a pre- and post-translated page in Edge.](https://adrianroselli.com/wp-content/uploads/2019/11/translate_ChromiEdge.jpg)

A Norwegian government page with Norwegian-language text in the `aria-label`. When the page has been translated to English in the browser (Edge Dev 80.0.320.4), the `aria-label` is also translated to English.

:::

::: note Seemingly Still Accurate

*4 August 2022*: Testing again with Edge shows what may be a regression. I visited [<VPIcon icon="fas fa-globe"/>gov.il/he/](https://gov.il/he) and let Edge auto-translate the page to English. I visually confirmed all the text changed to English. Then I popped open the dev tools and searched for all instances of `aria-label` ([**using XPath**](https://adrianroselli.com/2021/04/xpath-for-in-browser-testing.html)<!-- TODO: /adrianroselli.com/xpath-for-in-browser-testing.md --> of `//*[@aria-label]`).

Both `aria-label` instances were still in Hebrew. I confirmed that the other content in the dev tools reflected the English translation, but the ARIA text persisted in its Hebrewness: `<input … aria-label="חיפוש באתר gov.il" …>` and `<a … aria-label="תפריט ראשי סגור" …>`

:::

@tab <VPIcon icon="fa-brands fa-safari"/>

See the 6 March 2023 update

@tab <VPIcon icon="fa-brands fa-firefox"/>

See the 28 January 2024 update.

::::

---

## Auto-Translators

If you are a user of any other browser, you can always hop over to an online translation service.

### Google Translate

Assuming you can find how to submit a URL for a full-page translation, you will find that [<VPIcon icon="fa-brands fa-google"/>Google Translate](https://translate.google.com/) will not translate those ARIA attributes. As an example, I took [**one of my posts about emoji**](/adrianroselli.com/avoid-emoji-as-class-names.md), which leans on `aria-label` and turns those values into visible tool-tips. The [<VPIcon icon="fa-brands fa-google"/>version of that page from Google Translate](https://translate.google.com/translate?hl=&sl=en&tl=es&u=http%3A%2F%2Fadrianroselli.com%2F2017%2F10%2Favoid-emoji-as-class-names.html) does not translate them.

![Two examples from Google Translate.](https://adrianroselli.com/wp-content/uploads/2019/11/translate_Google.jpg)

Google Translate will happily grab the rest of the content on the page, but falls down when it gets to `aria-label`. In these screen shots I am translating the page to Spanish but the `aria-label` remains in English.

### Bing Translator

*Updated 4 March 2023*: Bing Translate no longer seems to translate web pages.

#### No Longer True

[<VPIcon icon="iconfont icon-bing"/>Bing Translator](https://bing.com/translator/) is hit-and-miss, catching some but not all. Which means it performed *better* than Google Translate. If you visit the [<VPIcon icon="fas fa-globe"/>translated version of the same page](https://translatetheweb.com/?ref=TVert&from=&to=es&a=https://adrianroselli.com/2017/10/avoid-emoji-as-class-names.html) from above, you will see some `aria-label`s translate and some do not.

![Two examples from Bing Translator.](https://adrianroselli.com/wp-content/uploads/2019/11/translate_Bing.jpg)

Bing Translator fared about fifty-fifty when it encountered `aria-label`. In these screen shots I am translating the page to Spanish and showing one `aria-label` gets translated to Spanish, another does not.

---

## For Developers

With the spotty accuracy of automated translation for ARIA attributes, avoid forcing your users to rely on machine translation services. If you already have a process (and budget) to translate (localize) text strings with humans, then you will need to ensure you capture all the strings that may not be visible on the page.

A more sustainable approach (which applies if you have no localization budget) might come earlier in the process — avoid using `aria-label`. The other three translatable ARIA attributes seem to have little traction so far so I am deferring on those.

Instead, lean on traditional ways of assigning an accessible name, such as visible text in a control (such as a `<button>`) or its related `<label>`. This has the benefit of immediately supporting WCAG 2.1 Success Crition [<VPIcon icon="iconfont icon-w3c"/>2.5.3 Label in Name](https://w3.org/WAI/WCAG21/quickref/#label-in-name) (A).

If your control does not have visible text (buttons with icons, for example), look for existing text on the page that you can reference via `aria-labelledby`. I give an example in my post [**Uniquely Labeling Fields in a Table**](/adrianroselli.com/uniquely-labeling-fields-in-a-table.md).

If you can count on CSS working and still need to hide text (or cannot find the text you want already in the larger control), then you can use a hidden text technique. The caution here is that it may still be missed by people who pull text strings from a page for translation.

```css
/* Proven method to visually hide something but */
/* still make it available to assistive technology */
.visually-hidden {
  position: absolute;
  top: auto;
  overflow: hidden;
  clip: rect(1px 1px 1px 1px); /* IE 6/7 */
  clip: rect(1px, 1px, 1px, 1px);
  width: 1px;
  height: 1px;
  white-space: nowrap;
}
```

This CSS may look familiar to you. I use it often in my posts. These styles are sometimes classed as `.sr-only`, but I avoid that name since it is implies a function it does not have (targeting screen readers).

---

## Recap

Even with support in Chrome and (new) Edge for translating ARIA attributes, it is a risky approach to rely on machines to translate content.

To help users, avoid using ARIA to hold content. In particular, instead of `aria-label`, lean on:

1. Native HTML techniques,
2. `aria-labelledby` pointing at existing visible text,
3. Visibly-hidden content that is still in the page.

For more detail on each of these, see my January 2020 post [**My Priority of Methods for Labeling a Control**](/adrianroselli.com/my-priority-of-methods-for-labeling-a-control.md).

::: note Update: 12 December 2019

Just as `aria-labelledby` has `aria-describedby` as its cousin, `aria-label` is getting `aria-description` ([issue (<VPIcon icon="iconfont icon-github" />`w3c/aria#891`)](https://github.com/w3c/aria/issues/891), [pull request (<VPIcon icon="iconfont icon-github" />`w3c/aria`)](https://github.com/w3c/aria/pull/1137)).

The caveats to using `aria-label` that I outline above will easily apply to `aria-description` until it gets traction in browsers and assistive technologies and translation services. So be very careful relying on it.

Separately, please do not do this (at least not without testing it in the screen readers and browsers your audience actually uses): `[aria-description]::after { content: attr(aria-description); }`

:::

::: note Update: 19 November 2020

In quick test with Safari 14 on macOS 11 (what the kids call Big Sur) using its built-in translation feature, for the few languages it supports and on sites it correctly recognizes as being in a foreign language, Safari translates `aria-label`.

Too many caveats.

:::

::: note Update: 4 August 2022

Edge may have regressed. See the Edge Update above.

I also confirmed that Safari (though TP 149) offers no auto-translation for the sample page in that update.

All this means is that the title of this post is still accurate.

:::

::: note Update: 4 March 2023

Support for auto-translating `aria-label` values is apparently *worse* than when I wrote this post in late 2019 and may have regressed since improvements I recorded after that date. You should of course test your own work.

I visited the [<VPIcon icon="fas fa-globe"/>Norwegian government home page](https://regjeringen.no/no/id4/) and looked for instances of `aria-label` that are exposed to users. I started off by searching for any node not hidden (`//*[not(@aria-hidden)]//*[@aria-label][not(@aria-hidden)]`) and found a download button in a video player:

```html
<div
 class="gobrain-controller
  gobrain-fn-download-video
  gobrain-hoverable
  gobrain-focusable
  gobrain-translate-aria-label"
 tabindex="0"
 data-internal-gobrain-translation-key="downloadButton"
 aria-label="Last ned video, åpner et nytt vindu"
 role="button">
```

Using a Chrome 110 Incognito window and InPrivate window for Edge 110, both for Windows, I confirmed neither browser auto-translates the text. I confirmed it with a screen reader and by comparing with other nodes that were auto-translated to make sure the DOM and speech buffer had been updated.

Clearly I did not do an exhaustive test of every possible variation. I did, however, identify a common pattern in the wild that does not auto-translate.

![Chrome dev tools confirming the button has an accessible name from its aria-label.](https://adrianroselli.com/wp-content/uploads/2019/11/aria-label_Chrome_before.jpg)

![Chrome dev tools confirming the page has been translated but the button aria-label has not changed, nor has its accessible name.](https://adrianroselli.com/wp-content/uploads/2019/11/aria-label_Chrome_after.jpg)

![The Chrome auto-translate option showing English as an option.](https://adrianroselli.com/wp-content/uploads/2019/11/aria-label_Chrome_dialog.jpg)

![Dev tools showing other nodes in the DOM have been auto-translated.](https://adrianroselli.com/wp-content/uploads/2019/11/aria-label_Chrome_confirm-DOM.jpg)

Chrome 110 dev tools confirms the button is in Norwegian both before and after the rest of the content has auto-translated. Included in the screen shots is the browser prompt to translate the page and a confirmation other nodes were auto-translated.

![Edge dev tools confirming the button has an accessible name from its aria-label.](https://adrianroselli.com/wp-content/uploads/2019/11/aria-label_Edge_before.jpg")

![Edge dev tools confirming the page has been translated but the button aria-label has not changed, nor has its accessible name.](https://adrianroselli.com/wp-content/uploads/2019/11/aria-label_Edge_after.jpg)

![The Edge auto-translate option showing English as an option.](https://adrianroselli.com/wp-content/uploads/2019/11/aria-label_Edge_dialog.jpg)

![Dev tools showing other nodes in the DOM have been auto-translated.](https://adrianroselli.com/wp-content/uploads/2019/11/aria-label_Edge_confirm-DOM.jpg)

Edge 110 dev tools confirms the button is in Norwegian both before and after the rest of the content has auto-translated. Included in the screen shots is the browser prompt to translate the page and a confirmation other nodes were auto-translated.

Firefox 110 and Safari 16.3 still do not offer an option to auto-translate.

Bing Translator seems to no longer accept URLs for translation.

Google Translate still misses the same examples as before.

:::

::: note Update: 6 March 2023

Eric Eggert noted my example hits a language not supported by Apple’s translation service:

> [<VPIcon icon="fas fa-globe"/>@aardrian](https://toot.cafe/@aardrian) Norway is not yet a language supported by Safari’s autotranslation. German is, and aria-labels are properly translated.
> 
> You can try it here: [<VPIcon icon="fas fa-globe"/>bundesregierung.de/breg-de](https://bundesregierung.de/breg-de)
> 
> Here is a list of the supported languages: [<VPIcon icon="fa-brands fa-apple"/>apple.com/ios/feature-availability/#translate-systemwide-translation](https://apple.com/ios/feature-availability/#translate-systemwide-translation)
> 
> (More info here: [<VPIcon icon="fa-brands fa-apple"/>support.apple.com/guide/safari/webpage-translation-in-safari-on-mac-ibrw6ea421e3/16.1/mac/13.0](https://support.apple.com/guide/safari/webpage-translation-in-safari-on-mac-ibrw6ea421e3/16.1/mac/13.0))
> 
> ![Screenshot with the translated “Open Menu” aria attribute](https://adrianroselli.com/wp-content/uploads/2019/11/toot_yatil_aria-label-translate-after.png) ![Screenshot of HTML with an aria-label="Menü öffnen"](https://adrianroselli.com/wp-content/uploads/2019/11/toot_yatil_aria-label-translate-before.png)
>
> Eric Eggert (@yatil@toot.cafe) [Mar 06, 2023, 10:34](https://toot.cafe/@yatil/109977066654964636)

Supported languages as of this writing (note that two of them are English and none are Norwegian):

- English (United Kingdom)
- English (United States)
- Mandarin Chinese (China mainland)
- Mandarin Chinese (Taiwan)
- French (France)
- German (Germany)
- Italian (Italy)
- Japanese
- Korean
- Spanish (Spain)
- Portuguese (Brazil)
- Arabic
- Russian

When I re-tested using the German page Eric provided using Chrome, I found that most instances of `aria-label` translated. For example, `//*[@aria-label="Menü öffnen"]` was translated while `//*[@aria-label="Nach oben"]` (the hidden one) was not. My guess is the browser makes some decisions based on element visibility.

Edge ignored the `aria-label`s.

To recap:

- Chrome sometimes auto-translates `aria-label`.
- Safari on macOS translates `aria-label` if it is one of 13 languages.
- Edge persists in its regression and does not translate `aria-label`.
- Firefox still does not offer an option to auto-translate.
- Bing Translator seems to no longer accept URLs for translation.
- Google Translate still misses the same examples as before.

The core thesis of this post still stands — you cannot rely on `aria-label` being auto-translated.

:::

::: note Update: 28 January 2024

[<VPIcon icon="fa-brands fa-firefox"/>Firefox 118 added auto-translation support](https://support.mozilla.org/en-US/kb/website-translation), but it got some [<VPIcon icon="fas fa-globe"/>updates in Firefox 122](https://theregister.com/2024/01/25/firefox_122_is_out/). I visited [<VPIcon icon="fas fa-globe"/>gov.il/he](https://gov.il/he) (Hebrew, but with `lang="en"`), [<VPIcon icon="fas fa-globe"/>regjeringen.no/no/id4/](https://regjeringen.no/no/id4/) (Norwegian, but with `lang="nb"` for Bokmål), and [<VPIcon icon="fas fa-globe"/>bundesregierung.de/breg-de](https://bundesregierung.de/breg-de) (German, with `lang="de"`). Firefox only offered to auto-translate the German page.

Only German was listed in my Firefox settings as an option for offline automated translation, but I had not installed it and I was not offline. I am making no assertions about how the language codes of the pages may or may not have factored into Firefox’s auto-translation prompts.

Inspecting the German page for non-hidden ARIA labels, I found none had been translated. For example, `//*[@aria-label="Menü öffnen"]` was not translated.

There is a bug filed to translate ARIA attributes, [<VPIcon icon="fa-brands fa-firefox"/>1871419 [meta] Translate Relevant Attributes in Full Page Translations](https://bugzilla.mozilla.org/show_bug.cgi?id=1871419), shared with me [on Masto (<VPIcon icon="fa-brands fa-mastodon"/>`@Thain`)](https://mastodon.social/@Thain/111839350921390637).

The core thesis of this post still stands — you cannot rely on `aria-label` being auto-translated.

:::

::: note Update: 25 July 2025

Callum McMenamin asked [<VPIcon icon="fas fa-globe"/>Do ARIA attributes get translated?](https://openaccess.nz/blog/do-aria-attributes-get-translated/) and found that `aria-label` (the topic of this post) *does* get translated. Based on my own experience, the methodology seemed to miss a few points. So I re-ran my own tests.

I visited the three pages from my last update, used the desktop browser’s built-in translation features, scrolled the page up and down to ensure all content got translated, then inspected and searched for `//*[not(@aria-hidden)]//*[@aria-label][not(@aria-hidden)]`. I marked the cases where it failed to work as expected.

- [<VPIcon icon="fas fa-globe"/>gov.il/he](https://gov.il/he) (Hebrew, but with `lang="en"`), 5 instances:
  - Firefox 140
    - All translated.
  - Chrome 138
    - All translated.
  - Edge 138
    - All translated.
  - Safari 18.5
    - Did not offer to translate the page.
- [<VPIcon icon="fas fa-globe"/>regjeringen.no/no/id4/](https://regjeringen.no/no/id4/) (Norwegian, but with `lang="nb"` for Bokmål), 2 instances:
  - Firefox 140
    - Did not offer to translate the page.
  - Chrome 138
    - All translated.
  - Edge 138
    - Did not translate the 1033×0 visible `<nav>` that contains the visible font size and language switchers.
  - Safari 18.5
    - Did not offer to translate the page.
- [<VPIcon icon="fas fa-globe"/>bundesregierung.de/breg-de](https://bundesregierung.de/breg-de) (German, with `lang="de"`), 48 instances:
  - Firefox 140
    - Did not translate content in nodes that were descendants of or were themselves `display: none` nodes,
    - Did not translate content in nodes that were descendants of or were themselves `display: none` nodes after they became visible,
    - Did not translate content with `lang="fr"`,
    - Did not translate the dynamic `aria-label`.
  - Chrome 138
    - Did not translate content in nodes that were descendants of or were themselves `display: none` nodes,
    - Did not translate content in nodes that were descendants of or were themselves `display: none` nodes after they became visible,
    - Did not translate the dynamic `aria-label`.
  - Edge 138
    - Did not translate content in nodes that were descendants of or were themselves `display: none` nodes,
    - Did not translate content in nodes that were descendants of or were themselves `display: none` nodes after they became visible,
    - Did not translate content with `lang="fr"`,
    - Did not translate the dynamic `aria-label`.
    - Did not translate anything with a dimension of 0 (one or both axes) at render, such as the mobile navigation wrapper (`#bpa-flyout-topics`).
  - Safari 18.5
    - Did not translate content with `lang="fr"`,
    - Did not translate the dynamic `aria-label`.

To recap for July 2025 using desktop browsers: Safari will only translate between [<VPIcon icon="fa-brands fa-apple"/>(currently) 21 languages](https://apple.com/ios/feature-availability/#translate-systemwide-translation). Firefox may not offer to translate for some languages. Chrome, Edge, and Firefox will not translate hidden content, even if it becomes visible later. No browser translated dynamic `aria-label`.

This does appear to be a legit Safari bug, however: [<VPIcon icon="fa-brands fa-safari"/>Paragraphs with `<code>` elements fail to translate](https://bugs.webkit.org/show_bug.cgi?id=296244)

:::

::: info Other Posts

[**Earlier post: Internet Turns 50, Just Might Catch On**](https://adrianroselli.com/2019/10/internet-turns-50-just-might-catch-on.html)<!-- TODO: /adrianroselli.com/internet-turns-50-just-might-catch-on.md -->

[**More recent post: CSS Logical Properties**](https://adrianroselli.com/2019/11/css-logical-properties.html)<!-- TODO: /adrianroselli.com/css-logical-properties.md -->

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "aria-label Does Not Translate",
  "desc": "As of my 25 July 2025 update at the end of this post, aria-label auto-translation support is less spotty than when I first wrote this post, but still unreliable. It does, actually. Sometimes. One of the big risks of using ARIA to define text content is that it often gets…",
  "link": "https://chanhi2000.github.io/bookshelf/adrianroselli.com/aria-label-does-not-translate.html",
  "logo": "https://adrianroselli.com/wp-content/themes/AAR/favicon.png",
  "background": "rgba(0,0,0,0.2)"
}
```
