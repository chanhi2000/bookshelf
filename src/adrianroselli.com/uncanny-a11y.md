---
lang: en-US
title: "Uncanny A11y"
description: "Article(s) > Uncanny A11y"
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
      content: "Article(s) > Uncanny A11y"
    - property: og:description
      content: "Uncanny A11y"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/adrianroselli.com/uncanny-a11y.html
prev: /programming/css/articles/README.md
date: 2019-02-15
isOriginal: false
author:
  - name: https://adrianroselli.com
    url: https://adrianroselli.com/contact
cover: https://adrianroselli.com/wp-content/uploads/2019/01/uncanny-a11y-300x300.jpg
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
  name="Uncanny A11y"
  desc="The pun in the title is that some people pronounce the a11y numeronym as “alley”. That makes the full title sound like uncanny valley, the concept of human-looking things seeming almost, but not quite, human and therefore creepy. In accessibility, the same thing can happen. Developers can try so hard…"
  url="https://adrianroselli.com/2019/02/uncanny-a11y.html"
  logo="https://adrianroselli.com/wp-content/themes/AAR/favicon.png"
  preview="https://adrianroselli.com/wp-content/uploads/2019/01/uncanny-a11y-300x300.jpg"/>

The pun in the title is that some people pronounce the [**a11y numeronym**](/adrianroselli.com/a11y-accessibility.md) as “alley”. That makes the full title sound like *[<VPIcon icon="fa-brands fa-wikipedia-w"/>uncanny valley](https://en.wikipedia.org/wiki/Uncanny_valley)*, the concept of human-looking things seeming almost, but not quite, human and therefore creepy.

In accessibility, the same thing can happen. Developers can try so hard to make sure something is accessible that the entire experience becomes weird, confusing, or downright unusable.

There are generally two things that contribute to this:

1. thinking that using code, *all* the code, is the best way to make something accessible, and
2. not testing with users who have disabilities.

---

## Unfortunate Examples

![Original photo by Kevin Hale (photo no longer on Flickr), text added. [<VPIcon icon="fas fa-globe"/>CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).](https://adrianroselli.com/wp-content/uploads/2019/01/uncanny-a11y.jpg)

These examples reflect real sites. I see them over and over. These examples also do not trigger automated accessibility checkers because they are technically doing nothing wrong.

### Just `tabindex` Everything

Sometimes when developers first realize that screen reader users do not use a mouse (mostly), but instead rely on a keyboard, they can get a bit overzealous. These developers build a table and realize they cannot tab to individual cells on their computer. This is confirmed when testing using a screen reader. They rediscover this with lists, headings, regions, and so on.

Without knowing that screen readers have built-in controls to navigate tables (and lists and headings and regions), they believe that adding `tabindex` to every element guarantees keyboard access. I come in and I see the following:

```html
<h2 tabindex="0">Do Not Do This</h2>
<table tabindex="0">
  <tr>
    <th tabindex="0">Author</th>
    <th tabindex="0">Title</th>
    <th tabindex="0">Year</th>
  </tr>
  <tr>
    <td tabindex="0">Emma Dorothy Eliza Nevitte Southworth</td>
    <td tabindex="0">The Hidden Hand</td>
    <td tabindex="0">1888</td>
  </tr>
</table>
```

This is compounded when using positive `tabindex` values. Many developers do not realize those items will come first in the tab order, before any other native controls and controls with `tabindex="0"`. This can easily make the visual layout of the page fall out of sync with the page order. Some, however, do this intentionally.

### Using `aria-label` As a Hint

The trick with `aria-label` is that it overrides the built-in accessible name on a standard control. Sometimes developers will add `aria-label` thinking it is a hint for screen reader users, not realizing that they have made a link useless or a button confusing.

In the following code the link will be announced only as Opens in a new window, the button as Cancel. The button may be confusing for a user who wants to close an alert but thinks he may be canceling an entire process instead.

```html
<a href="http://example.com/" target="_blank" aria-label="Opens in a new window">Visit their site</a>
<button aria-label="Cancel">Close</button>
```

Following is an example from GitHub. When a screen reader user reads this content, she will hear Only those with Link Learn more about permission levels to this repository can merge pull requests.

```html
<span class="status-meta">Only those with <a href="https://help.github.com/articles/what-are-the-different-access-permissions" class="tooltipped tooltipped-s" aria-label="Learn more about permission levels">write access</a> to this repository can merge pull requests.</span>
```

Some developers lean on `aria-label` to populate tool-tips, further confusing its true purpose.

::: note Added 27 May 2022

The Mount Sinai web site employs the User1st overlay. When the overlay loads, through no action from the user, it overrides [every link on the page (<VPIcon icon="fa-brands fa-x-twitter"/>`aardrian`)](https://x.com/aardrian/status/1530165470355136512) (the line feed is in the User1st code):

```html
<a href="http://giving.mountsinai.org/msorghp" target="_blank" aria-label="To make this website accessible to screen reader, press combination of alt and 1 keys.
  To stop getting this message, press the combination of alt and 2 keys.">Make a Gift</a>
```

:::

### Unhelpful `alt` Text

Too often every image on a site is preceded with “photo of” or “picture of”. Authors generally do not know that screen readers pre-pend the announcement of alt text with “Graphic”, so these users will hear “Graphic photo of a silver car.”

```html
<img src="…" alt="Photo of a silver car.">
<img src="…" alt="Picture of a screen shot of the WIndows Mobile home screen.">
```

Some authors believe that every nuance of an image must be conveyed. They may write entire paragraphs to convey the contents of a photo, when all that is needed in context of the page is something as simple as “A coffee mug”. Compounding this is when authors think that alt text is re-usable everywhere without changes, when often the point of an image will change based on its use and context.

```html
<p>Come try our coffee!<br>
<img src="…" alt="A four ounce white porcelain mug with a square handle on a matching white saucer, both resting on a dark wood table polished to a gloss; in the mug is a mound of white foam with dark edges at the rim.">
</p>
```

For images used as links the `alt` text not only needs to be brief, but it also needs to convey the point of the link. If I am linking to a bag of coffee beans on an ecommerce site, “A coffee mug” won’t do. If I am linking to a company via its logo, then Visit our partner Enron logo sounds weird.

```html
<p>
Visit our partner <a href="http://example.com"><img src="…" alt="Enron logo"></a>.
</p>
```

Some outlets have applauded the efforts of Facebook to auto-generate alternative text for images so that users (or, more imporantly, brands) would not need to. The problem is that AI cannot understand the author intent of an image. Generated text also read like a machine, eg: Graphic. Image may contain: 2 people, people smiling, eyeglasses, outdoor and closeup.

```html
<img src="…" alt="Image may contain: 2 people, people smiling, eyeglasses, outdoor and closeup.">
```

Similarly, alternative text for an image in one part of a site might need to be different elsewhere on the same site.

### Overriding Default Pronunciation

Sometimes a developer will start testing with a screen reader and decide that [<VPIcon icon="fa-brands fa-stack-overflow"/>the way a screen reader pronounces words is wrong](https://stackoverflow.com/questions/43491644/how-can-i-override-a-screen-readers-pronunciation-of-a-word-in-a-sentence-witho/43496525). When this happens, instead of accepting that maybe users don’t care, they may try to code around it (and the resultant screen reader pauses for hidden content). Usually it is just a hidden span, but I have seen some *robust* solutions:

```html
Please enter your 
<ruby>
  <rt aria-hidden="true" style="font-size: 1em"><!--Standard-->licence</rt>
  <rt style="display: inline-block; width: 1px; height: 1px; overflow: hidden"><!--Phonetic-->license</rt>
</ruby>
number
```

It is not restricted to pronunciation. Often currencies, temperatures, time spans, dates, and so on can confuse a developer listening to it for the first time. It can be particularly taxing for users when developers make them even more verbose (and [<VPIcon icon="fa-brands fa-stack-overflow"/>compound it by making each one a tab-stop](https://stackoverflow.com/questions/39696554/how-to-make-voice0ver-read-dates-correctly/39775620)).

```html
<div tabindex="0" aria-label="September 16th 2016">16</div>
<div tabindex="0" aria-label="September Sixteenth Two Thousand and Sixteen">16</div>
```

I have also run into cases where developers truly believe every foreign word used in a sentence, including common idioms, must be wrapped in a container with a `lang` attribute. The frustration comes when the screen reader pauses at the container, not to mention when the word sounds different than it has every other time for the user.

```html
<p>I hope this <span lang="it">cappuccino</span> and <span lang="fr">croissant</span> are covered under my <span lang="la">per diem</span> expenses.</p>
```

Punctuation can also be mis-applied, particularly in image alternative text or hint text, where authors assume every fragment is a full sentence and warrants a period.

```html
<p>This is the best <img src="…" alt="Pie."> I have ever had, and I do not like <img src="…" alt="Peach."> normally.</p>
```

In that case, even first-time screen reader testers will probably recognize the impact of the two periods.

::: note Added 7 July 2023

I go into more detail in my post [**Don’t Override Screen Reader Pronunciation**](/adrianroselli.com/dont-override-screen-reader-pronunciation.md)
<!-- TODO: /adrianroselli.com/dont-override-screen-reader-pronunciation.md -->.

:::

### Mis-using `aria-roledescription`

Every time I see `aria-roledescription` in the wild, it is to offer hint text. Something like this painfully real example:

```html
<a href="[…]" […] ariaroledescription="Press enter to activate the menu.">
  200
</a>
```

This developer has effectively told the screen reader that instead of announcing 200, link to replace it and say 200, Press enter to activate the menu.

There is no HTML element by that name. There is no ARIA widget by that name. It is meaningless and hides the control type. Is it a button? A menu bar? A select? A disclosure widget?

For screen readers that correctly (per spec) override the native role with what the developer provides, the user will have little understanding what the control is. The screen reader may still offer its instructions, perhaps as You are currently on a Press enter to activate the menu inside of web content. To activate this, press Control Option Space.

I have put together more reasons why you should [**be careful using `aria-roledescription`**](/adrianroselli.com/avoid-aria-roledescription.md).

### Providing Control Instructions

Many devs think they have to tell screen reader users how a control works, regardless of the fact that using the correct HTML and/or ARIA will allow screen readers to convey that to users.

Besides that being incredibly verbose, it can also be wrong.

```html
<button aria-label="Click button to mark">
  [icon]
</button>
```

Never mind that this overrides the accessible name of the control, this is obviously problematic for a user who does not use a mouse, such as most screen reader users. TalkBack, for example, will tell a user to double-tap to activate when encountering a button.

```html
<a href="[…]">
  Services<span class="visually-hidden">, tap to follow</span>
</a>
```

Even if you go so far as to test for a touch display and think you can offer instructions appropriate for the context, [you will still be wrong (<VPIcon icon="fa-brands fa-x-twitter"/>`patrick_h_lauke`)](https://x.com/patrick_h_lauke/status/1298333178478956544). Keyboards paired with mobile phones while running screen readers is incredibly common, so telling the user to tap is contextually wrong. Never mind devices with multiple form factors.

Obviously for custom controls and complex widgets you likely need to offer some basic instructions. Otherwise a screen reader is going to take context into account and provide instructions specific to the platform. It will indicate when the custom accelerator key is needed (JAWS key, Narrator key, VoiceOver key, etc.). It will adapt to a touch screen and tell a user when a tap, swipe, or hardware control is needed. Do not pre-judge what hardware the user has available and can use.

### ARIA Authoring Practices

The [<VPIcon icon="iconfont icon-w3c"/>ARIA Authoring Practices](https://w3.org/TR/wai-aria-practices-1.1/) is considered a go-to resource for pre-built accessible patterns. Essentially, a free pattern library for the taking. It is not a standard even though some treat it as one. It is only a note — a bunch of material that may be useful to some authors.

These patterns try very hard to mimic native operating system patterns. However with those efforts they generally do not identify [current browser support or bugs (<VPIcon icon="iconfont icon-github"/>`w3c/aria-practices#978`)](https://github.com/w3c/aria-practices/issues/978), often [do not disclose dependencies (<VPIcon icon="iconfont icon-github"/>`w3c/aria-practices#842`)](https://github.com/w3c/aria-practices/issues/842) clearly, are [not mobile-first (<VPIcon icon="iconfont icon-github"/>`w3c/aria-practices#428`)](https://github.com/w3c/aria-practices/issues/420) (if at all), fail to note the [absence of necessary JavaScript events (<VPIcon icon="iconfont icon-github"/>`w3c/aria-practices#8`)](https://github.com/w3c/aria-practices/issues/8#issuecomment-436287252), disagree with [published W3C tutorials (<VPIcon icon="iconfont icon-github"/>`w3c/aria-practices#831`)](https://github.com/w3c/aria-practices/issues/831), and in many cases are [not fully tested (<VPIcon icon="iconfont icon-github"/>`w3c/aria-practices#975`)](https://github.com/w3c/aria-practices/issues/975). There are open issues [where users complain (<VPIcon icon="iconfont icon-github"/>`w3c/aria-practices#557`)](https://github.com/w3c/aria-practices/issues/557) that the [recommended patterns are cumbersome (<VPIcon icon="iconfont icon-github"/>`w3c/aria-practices#353`)](https://github.com/w3c/aria-practices/issues/353) or confusing. These problems [result in large platforms encoding (<VPIcon icon="fa-brands fa-x-twitter"/>`CharlieCroom`)](https://x.com/CharlieCroom/status/1042798596918132736) confounding interface patterns.

As they are integrated into projects and usability testing is performed, the gaps are becoming more and more apparent. Teams that did not expend the effort to test them are losing their trust in W3C recommendations as a result. I say this with confidence because I am the guy standing in front of rooms of 30 developers at a time on a twice-monthly basis having these conversations.

::: info

I have written in more detail on a couple of these patterns:

```component VPCard
{
  "title": "Don’t Use ARIA Menu Roles for Site Nav",
  "desc": "Once again, the advice is in the title of the post. But I will ramble anyway since you scrolled this far. First run with the advice, and then review some background on ARIA and how navigation and menu items are defined. This way you can tap out quickly when it…",
  "link": "/adrianroselli.com/dont-use-aria-menu-roles-for-site-nav.md",
  "logo": "https://adrianroselli.com/wp-content/themes/AAR/favicon.png",
  "background": "rgba(0,0,0,0.2)"
}
```

```component VPCard
{
  "title": "Hey, It’s Still OK to Use Tables",
  "desc": "Baby Boomerangutuang, one of the Tick’s students. He was just shouting It’s OK to play with dolls! Consider this post to be the sequel to my 2012 post It’s OK to Use Tables. Here I will go into bit more detail based on the state of accessible efforts I see…",
  "link": "/adrianroselli.com/hey-its-still-ok-to-use-tables.md",
  "logo": "https://adrianroselli.com/wp-content/themes/AAR/favicon.png",
  "background": "rgba(0,0,0,0.2)"
}
```

- [**ARIA Grid As an Anti-Pattern**](/adrianroselli.com/aria-grid-as-an-anti-pattern.md)
<!-- TODO: /adrianroselli.com/aria-grid-as-an-anti-pattern.md -->
- [**Maybe You Don’t Need a Date Picker**](/adrianroselli.com/maybe-you-dont-need-a-date-picker.md#Update04) (added 8 February 2024 because APG added a date picker some time ago and I missed it)

:::

#### Update 20 May 2022: APG Relaunches

On Global Accessibility Awareness Day (GAAD) 2022, the APG relaunched and rebranded itself as an accessible pattern library:

::: info WAI at W3C (<VPIcon icon="fa-brands fa-x-twitter"/><code>x.com/w3c_awi</code>)

> Want to use [<VPIcon icon="fa-brands fa-x-twitter"/>#ARIA](https://x.com/hashtag/ARIA) to make your web apps more [<VPIcon icon="fa-brands fa-x-twitter"/>#accessible](https://x.com/hashtag/accessible), yet tired of slogging through a LONG doc? Good news: ARIA Authoring Practices Guide (APG) is redesigned as shorter pages![<VPIcon icon="iconfont icon-w3c"/>w3.org/WAI/ARIA/apg/](https://w3.org/WAI/ARIA/apg/)  
>
> (related email: [<VPIcon icon="iconfont icon-w3c"/>lists.w3.org/Archives/Public/public-wai-…](https://lists.w3.org/Archives/Public/public-wai-announce/2022AprJun/0003.html)) [#a11y](https://x.com/hashtag/a11y) [#ARIAapg](https://x.com/hashtag/ARIAapg) [#GAAD](https://x.com/hashtag/GAAD) [#WebApps](https://x.com/hashtag/WebApps)

:::

I am thrilled this no longer looks like a standards doc and is much easier to navigate.

I am *less* thrilled this [left a pile of 404s (<VPIcon icon="iconfont icon-github"/>`w3c/aria-practices`)](https://github.com/w3c/aria-practices/issues/2335) with the move, implies it is a ready-to-use pattern library, [obfuscates the (watered down) warnings (<VPIcon icon="iconfont icon-github"/>`w3c/aria-practices#2336`)](https://github.com/w3c/aria-practices/issues/2336) I fought so hard to get added, quietly hid some of its worst patterns with no acknowledgment in years-old issues, appears to have happened outside the W3C redesign project with Studio24, and [introduced WCAG issues (<VPIcon icon="iconfont icon-github"/>`w3c/aria-practices#2338`)](https://github.com/w3c/aria-practices/issues/2338).

#### Update 30 April 2023: APG Adds Support Charts

Despite claims, APG’s support charts are not ARIA support charts and they are not analogous to Can I Use. While brand new and likely to grow, their scope is still strictly APG patterns. I go into more detail in my post [**No, APG’s Support Charts Are Not ‘Can I Use’ for ARIA**](/adrianroselli.com/no-apgs-support-charts-are-not-can-i-use-for-aria.md).

I include comparisons with Can I Use and a11ySupport. I also note that APG is still stuck on screen readers only, which means it creates gaps for other assistive technologies and allows WCAG violations.

### The Marketing Term ‘AI’

*Added 8 July 2023*. I am going to take the large language model (LLM) popularized by ChatGPT and OpenAI. While marketed as artificial intelligence (AI), this is little more than a dynamic autocomplete [<VPIcon icon="fas fa-globe"/>designed to sound truthy](https://softwarecrisis.dev/letters/llmentalist/).

As I have written before, [**No, ‘AI’ Will Not Fix Accessibility**](/adrianroselli.com/no-ai-will-not-fix-accessibility.md)
<!-- TODO: /adrianroselli.com/no-ai-will-not-fix-accessibility.md -->.

This does not stop companies from marketing fake-AI to solve accessibility problems (with [<VPIcon icon="fas fa-globe"/>breathless parroting by non-journalists](https://web.archive.org/web/20230703154259/https://www.forbes.com/sites/stevenaquino/2023/06/29/audioeye-shares-results-of-ai-and-accessibility-study-says-it-illustrates-tremendous-potential-for-responsible-use/?sh=64c011718987)) regardless of [**hilariously bad outcomes**](/adrianroselli.com/userway-will-get-you-sued.html#MoreFakeAI) from egregiously inaccessible tools.

Here is UserWay’s output when asked for a text entry field for a numeric 6-digit 2-factor authentication page (this within a code block with `aria-hidden="true"`):

```html
<label for="otp">Enter the OTP:</label>
<input type="text" id="otp" pattern="[0-9]*" inputmode="numeric" maxlength="6" aria-label="OTP" required>
```

Or asking for a password field with some standard requirements:

> The title attribute provides a description of the password requirements for screen readers.

Or when fed this obviously nonsensical code:

```html
<div role="button" aria-pressed="false" aria-selected="true" type="submit" aria-label="Get started" title="Get started" href="/sign-up">
  <span aria-hidden="true">Get started</span>
</div>
```

UserWay returned this with a false justification for *every attribute*:

```html
<a role="button" aria-pressed="false" aria-selected="true" aria-label="Get started" title="Get started" href="/sign-up">
  Get started
</a>
```

Granted, expecting fake-AI to create better outcomes for humans is a stretch given the incredibly [negative feedback (<VPIcon icon="iconfont icon-github"/>`mdn/yari#9208`)](https://github.com/mdn/yari/issues/9208#issuecomment-1615245134) MDN [has received (<VPIcon icon="iconfont icon-github"/>`mdn/yari#9230`)](https://github.com/mdn/yari/issues/9230#issuecomment-1622352446) from its two efforts to have fake-AI explain even simple code blocks that themselves are not accessibility issues.

Since LLMs are trained off many of the poor practices I cite throughout this post, LLMs actively regurgitate similar bad advice.

### Targeting Code Validation

*30 July 2024*. Over the years I have encountered developers who rely on validators to control their code quality. The problem is that validators only care about syntax, not how things are exposed to users.

I first wrote about this in 2016 in my post [**Be Wary of Nesting Roles**](https://adrianroselli.com/2016/12/be-wary-of-nesting-roles.html)
<!-- TODO: /adrianroselli.com/be-wary-of-nesting-roles.md -->. In that post I show nested interactive roles. So a validator would rightly flag this as invalid HTML:

```html
<button>
  Foo
  <button>
    Bar
  </button>
</button>
```

But it would at the time allow this:

```html
<div role="button">
  Foo
  <div role="button">
    Bar
  </div>
</div>
```

While the validator closed that gap, there are cases where authors may not agree. If you are using an ARIA role to [avoid generating errors with an invalid HTML structure (<VPIcon icon="iconfont icon-github"/>`validator/validator#1432`)](https://github.com/validator/validator/issues/1432), then it is incumbent on you to test with *all* the assistive technologies. Especially if you are charged with documenting the scientific record for all of humanity.

Otherwise you cannot act surprised when a screen reader behaves erratically when encountering this untested and invalid structure.

In short, don’t do this:

```html
<div role="paragraph">
  content starts here
  <table>
   …
  </table>
  content goes here
  <ul>
   …
  </ul>
  more content here
</div>
```

All of humanity will find it confounding.

---

## What You Can Do

Sorry, your browser doesn’t support embedded videos, but don’t worry, you can [<VPIcon icon="fas fa-file-audio"/>download it](https://adrianroselli.com/wp-content/uploads/2019/02/TurboTax-laughing-robot.mp4).

Creepy somewhat anthropomorphic robot with a plastic boy’s face says, I am sad, then throws its head back with a child’s laugh and almost no expression change.

I have a couple suggestions.

### Test with Users

The bulk of these issues are a function of not knowing how real users actually surf. Developers make assumptions about what will be easier *for* a screen reader user (or zoom user, or voice user, …) without testing it *with* screen reader users (or zoom users, or voice users, …).

I cannot teach you how to start testing with users if you never have before. I can, however, direct you to video and slides of my talk [**Inclusive Usability Testing**](/adrianroselli.com/slides-inclusive-usability-testing-wordcamp-london.html) that covers some of the logistical aspects of incorporating users into your process.

### Maybe Code Less

Some developers don’t know what these elements, attributes, or features really do, so they end up keeping defaults or adding arbitrary values. Again, without testing with users or assistive technology they have little way of knowing what a mess they have created.

If developers worked to follow the three, no, *five* [<VPIcon icon="iconfont icon-w3c"/>Rules of ARIA](https://w3.org/TR/using-aria/#notes2), much of this might solve itself:

1. If you can use a native HTML element or attribute with the semantics and behavior you require already built in, instead of re-purposing an element and adding an ARIA role, state or property to make it accessible, then do so ([<VPIcon icon="iconfont icon-w3c"/>rule 1 reference](https://w3.org/TR/using-aria/#rule1)).
2. Do not change native semantics, unless you really have to ([<VPIcon icon="iconfont icon-w3c"/>rule 2 reference](https://w3.org/TR/using-aria/#second)).
3. All interactive ARIA controls must be usable with the keyboard. If you create a widget that a user can click or tap or drag or drop or slide or scroll, a user must also be able to navigate to the widget and perform an equivalent action using the keyboard ([<VPIcon icon="iconfont icon-w3c"/>rule 3 reference](https://w3.org/TR/using-aria/#third)).
4. Do not use `role="presentation"` or `aria-hidden="true"` on a focusable element ([<VPIcon icon="iconfont icon-w3c"/>rule 4 reference](https://w3.org/TR/using-aria/#fourth)).
5. All interactive elements must have an accessible name ([<VPIcon icon="iconfont icon-w3c"/>rule 5 reference](https://w3.org/TR/using-aria/#fifth)).

---

## Wrap-up

I will likely add more curious patterns as I find them. If you want to comment with some you have seen, note that I am focused on *technically valid* code that is unusable and has gotten that way as a result of someone trying to make it more usable or accessible.

::: note Update: 3 February 2022

Eric Eggert talks about the challenges that developers make for disabled users when the developers try to make something “accessible” without any understanding of disabilities or experience with the technology in his post [<VPIcon icon="fas fa-globe"/>No Accessibility Without Disabilities](https://yatil.net/blog/no-accessibility-without-disabilities). As I do, he also cites tables, terrible alternative text, and `tabindex` everywhere.

:::

::: info Other Posts

```component VPCard
{
  "title": "A Strongly Worded Letter",
  "desc": "Last week while whining about having accessibility contributions to FOSS projects dismissed, I had a Twitter conversation about when the same thing happens with clients. I have a method to deal with that, however, which I briefly outlined on Twitter. I promised to expand on it in a blog post,…",
  "link": "/adrianroselli.com/a-strongly-worded-letter.md",
  "logo": "https://adrianroselli.com/wp-content/themes/AAR/favicon.png",
  "background": "rgba(0,0,0,0.2)"
}
```

[**More recent post: Avoid Default Field Validation**](/adrianroselli.com/avoid-default-field-validation.md)
<!-- TODO: /adrianroselli.com/avoid-default-field-validation.md -->

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Uncanny A11y",
  "desc": "The pun in the title is that some people pronounce the a11y numeronym as “alley”. That makes the full title sound like uncanny valley, the concept of human-looking things seeming almost, but not quite, human and therefore creepy. In accessibility, the same thing can happen. Developers can try so hard…",
  "link": "https://chanhi2000.github.io/bookshelf/adrianroselli.com/uncanny-a11y.html",
  "logo": "https://adrianroselli.com/wp-content/themes/AAR/favicon.png",
  "background": "rgba(0,0,0,0.2)"
}
```
