---
lang: en-US
title: "Your Accessibility Claims Are Wrong, Unless…"
description: "Article(s) > Your Accessibility Claims Are Wrong, Unless…"
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
      content: "Article(s) > Your Accessibility Claims Are Wrong, Unless…"
    - property: og:description
      content: "Your Accessibility Claims Are Wrong, Unless…"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/adrianroselli.com/your-accessibility-claims-are-wrong-unless.html
prev: /programming/css/articles/README.md
date: 2022-11-15
isOriginal: false
author:
  - name: https://adrianroselli.com
    url: https://adrianroselli.com/contact
cover: https://adrianroselli.com/wp-content/uploads/2022/11/Clark_Stanleys_Snake_Oil_Liniment-197x300.png
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
  name="Your Accessibility Claims Are Wrong, Unless…"
  desc="Now that it is a market differentiator to talk about accessibility in projects, that’s all many do — talk about it. In a sea of pop-dev noise, “accessibility” can be claimed with little risk someone will challenge it. If someone does, the response is often a fine balance between silence…"
  url="https://adrianroselli.com/2022/11/your-accessibility-claims-are-wrong-unless.html"
  logo="https://adrianroselli.com/wp-content/themes/AAR/favicon.png"
  preview="https://adrianroselli.com/wp-content/uploads/2022/11/Clark_Stanleys_Snake_Oil_Liniment-197x300.png"/>

![Flyer for Clark Stanley’s Snake Oil Liniment.](https://adrianroselli.com/wp-content/uploads/2022/11/Clark_Stanleys_Snake_Oil_Liniment.png)

Now that it is a market differentiator to talk about accessibility in projects, that’s all many do — [**talk about it**](/adrianroselli.com/accessibility-gaps-in-mvps.md). In a sea of pop-dev noise, “accessibility” can be claimed with little risk someone will challenge it. If someone does, the response is often a fine balance between silence and accusations.

I offer some approaches you can and should take before you set expectations about the accessibility of your *thing* — code or article or talk or whatever.

---

## Stop

I am breaking this up into content creators and their backers. Content creators may write articles, make demos, deliver talks, host podcasts, and plenty more. Their backers may be tech companies, dev sites, industry events, or even browser makers.

### For Content Creators

If you are discussing or creating a new pattern or library or technology or talk or article or whatever:

1. Don’t assert **anything** about how it works with assistive technology.
2. Don’t assert **anything** about its accessibility.

Be honest and say that you don’t know. It’s ok not to know, so admit it freely. Reader beware and all that.

### For Organizations Backing Those Content Creators

If you are backing that content creator:

1. Get them (paid) support, training, or an expert to test with or coach them on assistive technology.
2. Ensure your your content creators are frank about the (lack of) accessibility considerations and make it a visible and standard clause in everything they create.

Otherwise you risk leaving them hanging when they publish problematic content, making them feel like they are standing alone in the cold. Never mind how that affects your brand.

---

## Unless…

Unless you (or the designated editors) ask a few questions:

1. Assistive technology (AT) questions:
    - Are you a daily user of AT?
    - Are you involving daily users of AT?
    - Do you already use AT for testing?
    - Do you know how to use the AT?
    - Do you have a daily user of AT involved?
    - Are you aware there is AT besides screen readers?
    - Do you consider system settings to be AT?
2. Accessibility questions:
    - Do you mean WCAG (and if so, which SCs)?
    - Do you mean ADA?
    - Do you mean Section 504?
    - Do you mean Section 508?
    - Do you mean ACAA?
    - Do you mean CVAA?
    - Do you mean ACA?
    - Do you mean AODA?
    - Do you mean EN 301 549?
    - Do you mean “works with a specific AT”?
    - Do you mean usable by everyone regardless of ability?

For the AT questions, the more “no”s you had the less likely you should make any assertions about how your *thing* works in AT.

For the accessibility definition questions, readers may believe the *thing* you wrote conforms with all those laws or guidelines (and many more). Also, one of those was a red herring that I hope you caught as soon as you saw it.

### Resources

For more information on what it means for something to be accessible, head over to the W3C’s [<VPIcon icon="iconfont icon-w3c"/>Web Accessibility Initiative](https://w3.org/WAI/) and dive in. For the red herring I referenced, [**it was the ADA**](/adrianroselli.com/ada-web-site-compliance-still-not-a-thing.md).

For AT, I am going to focus on screen readers since it is where I see the most alarmingly wrong information from “expert” developers promoting their *thing*. Consider that ARIA is useful only for screen readers and [**ARIA mis-use**](/adrianroselli.com/uncanny-a11y.md)
<!-- TODO:  --> is a multiplier of bad for screen reader users.

#### Screen Readers

Get some screen readers. Plural. Ideally you will cover JAWS, NVDA, VoiceOver on macOS, TalkBack, and VoiceOver on iOS. Don’t use solely VoiceOver; it is more opinionated and does not always reflect what the majority of screen reader users experience.

::: tabs

@tab:active <VPIcon icon="fa-brands fa-windows"/>

- [Download the free NVDA](https://nvaccess.org/) screen reader (but please [donate to support it](https://nvaccess.org/support-us/#donation-support)). Pair it with Firefox.
  - [Browse Mode](https://nvaccess.org/files/nvda/documentation/userGuide.html?#BrowseMode)
- [Download JAWS](https://freedomscientific.com/Downloads/JAWS) and use it in 40 minute increments for free. Pair it with Chrome.
  - [JAWS Hotkeys](https://freedomscientific.com/training/jaws/hotkeys/#wb)
- [Use Narrator](https://support.microsoft.com/en-us/windows/complete-guide-to-narrator-e4397a0d-ef4f-b386-d8ae-c172f109bdb1) (it is built in, though not a first choice for most users). Pair it with Edge.
  - [Narrator keyboard commands and touch gestures](https://support.microsoft.com/en-us/windows/appendix-b-narrator-keyboard-commands-and-touch-gestures-8bdab3f4-b3e9-4554-7f28-8b15bd37410a#WindowsVersion=Windows_11)

@tab <VPIcon icon="iconfont icon-macos"/>

- [<VPIcon icon="fa-brands fa-apple"/>Use VoiceOver](https://support.apple.com/guide/voiceover/welcome/10) (it is built in). Pair it with Safari.
  - [<VPIcon icon="fa-brands fa-apple"/>Use VoiceOver to browse webpages on Mac](https://support.apple.com/guide/voiceover/browse-webpages-vo27974/10/mac/13.0)
  - [<VPIcon icon="fa-brands fa-apple"/>VoiceOver Command Charts](https://help.apple.com/voiceover/command-charts/)

@tab <VPIcon icon="fa-brands fa-android"/>

- [<VPIcon icon="fa-brands fa-google"/>Use TalkBack](https://support.google.com/accessibility/android/answer/6283677?hl=en) (it is built in). Pair it with Chrome and maybe Firefox.
  - [<VPIcon icon="fa-brands fa-google"/>Use TalkBack gestures](https://support.google.com/accessibility/android/answer/6151827)
  - [<VPIcon icon="fa-brands fa-google"/>Use TalkBack to browse the web with Chrome](https://support.google.com/accessibility/android/answer/2633135)
  - [<VPIcon icon="fa-brands fa-google"/>Use TalkBack keyboard shortcuts](https://support.google.com/accessibility/android/answer/6110948)

@tab <VPIcon icon="iconfont icon-ios"/>

- [<VPIcon icon="fa-brands fa-apple"/>Use VoiceOver](https://apple.com/accessibility/iphone/vision/) (it is built in). Pair it with Safari.
  - [<VPIcon icon="fa-brands fa-apple"/>Learn VoiceOver gestures on iPhone](https://support.apple.com/guide/iphone/learn-voiceover-gestures-iph3e2e2281/16.0/ios/16.0)
  - [<VPIcon icon="fa-brands fa-apple"/>Use VoiceOver on iPhone with an Apple external keyboard](https://support.apple.com/guide/iphone/use-voiceover-with-an-apple-external-keyboard-iph6c494dc6/16.0/ios/16.0)
  - [<VPIcon icon="fa-brands fa-apple"/>Learn VoiceOver gestures on iPad](https://support.apple.com/guide/ipad/learn-voiceover-gestures-ipad9a246584/16.0/ipados/16.0)
  - [<VPIcon icon="fa-brands fa-apple"/>Use VoiceOver on iPad with an Apple external keyboard](https://support.apple.com/guide/ipad/use-voiceover-with-an-apple-external-keyboard-ipad9a246749/16.0/ipados/16.0)

@tab <VPIcon icon="fa-brands fa-ubuntu"/>

- [<VPIcon icon="fas fa-globe"/>Use Orca](https://help.gnome.org/users/orca/stable/). Pair it with Firefox.
  - [<VPIcon icon="fas fa-globe"/>Reading Documents and Web Pages](https://help.gnome.org/users/orca/stable/index.html.en#reading)
  - [<VPIcon icon="fas fa-globe"/>Reading Commands](https://help.gnome.org/users/orca/stable/commands_reading.html.en)
  - [<VPIcon icon="fas fa-globe"/>Structural Navigation Commands](https://help.gnome.org/users/orca/stable/commands_structural_navigation.html.en)

<VPIcon icon="fa-brands fa-chrome"/>ChromeOS

- [<VPIcon icon="fas fa-globe"/>Use ChromeVox](https://chromevox.com/chromeos/getting_started.html) (but only use ChromeVox in this scenario, not as a plug-in for Chrome on Windows or macOS).

:::

Keyboard shortcuts are necessary to use a desktop screen reader well (don’t rely on hitting the Tab↹ key over and over). For mobile screen readers, learn the gestures versus swiping right repeatedly. Keep in mind mobile screen reader users often use keyboards too.

```component VPCard
{
  "title": "Basic screen reader commands for accessibility testing - TPGi — a Vispero company",
  "desc": "Updated 1st Feb 2016. When you test your website with a screen reader there are a few basic commands you should know. Just remember not to make design decisions based...",
  "link": "https://tpgi.com/basic-screen-reader-commands-for-accessibility-testing//",
  "logo": "https://tpgi.com/nitropack_static/mQEwzWSbUyjHeEeyxnxPBGwRyfDLSUho/assets/images/optimized/rev-371d5ec/www.tpgi.com/wp-content/themes/bedstone/favicons/favicon.ico",
  "background": "rgba(10,45,71,0.2)"
}
```

```component VPCard
{
  "title": "Understanding screen reader interaction modes - Tink - Léonie Watson",
  "desc": "Windows screen readers have multiple modes of interaction, and depending on the task being carried out they’ll automatically switch to the most appropriate mode. This post explains why Windows screen readers behave the way they do, and how your code can influence that behaviour.",
  "link": "https://tink.uk/understanding-screen-reader-interaction-modes//",
  "logo": "https://tink.uk/favicons/favicon.ico",
  "background": "rgba(211,189,255,0.2)"
}
```

<SiteInfo
  name="Browsing with a desktop screen reader - TetraLogical"
  desc="In our first post from our browsing with assistive technologies series, we discuss desktop screen readers. You can also explore browsing with a mobile screen reader, browsing with a keyboard, browsing with screen magnification and browsing with speech recognition."
  url="https://tetralogical.com/blog/2021/09/29/browsing-with-a-desktop-screen-reader//"
  logo="https://tetralogical.com/_images/favicons/icon.svg"
  preview="https://tetralogical.com/_images/screenshots/blog-2021-09-29-browsing-with-a-desktop-screen-reader.png"/>

<SiteInfo
  name="Browsing with a mobile screen reader - TetraLogical"
  desc="In our second post from our browsing with assistive technology series, we discuss mobile screen readers. You can also explore browsing with desktop screen readers, browsing with a keyboard, browsing with screen magnification and browsing with speech recognition."
  url="https://tetralogical.com/blog/2021/10/05/browsing-with-a-mobile-screen-reader//"
  logo="https://tetralogical.com/_images/favicons/icon.svg"
  preview="https://tetralogical.com/_images/screenshots/blog-2021-10-05-browsing-with-a-mobile-screen-reader.png"/>

```component VPCard
{
  "title": "WebAIM: Screen Reader User Survey #9 Results",
  "desc": "In May - June 2021, WebAIM surveyed preferences of screen reader users. We received 1568 valid responses. This was a follow-up to 8 previous surveys that were conducted between January 2009 and September 2019.",
  "link": "https://webaim.org/projects/screenreadersurvey9/#browsercombos/",
  "logo": "https://webaim.org/media/favicon.ico",
  "background": "rgba(191,23,34,0.2)"
}
```

Note I did not touch on pairing with Braille displays (that was a pun). As you go down that path there will be more to learn, including how content may be truncated to fit a Braille display.

*Added 28 November 2022*: Sara Soueidan has posted an excerpt from her forthcoming [<VPIcon icon="fas fa-globe"/>Practical Accessibility course](https://practical-accessibility.today/) that goes into far more detail than I do above, including for macOS users who do not have a Windows machine (though you should get your boss/client to just buy you one, they are cheap): [<VPIcon icon="fas fa-globe"/>Setting up a screen reader testing environment on your computer](https://sarasoueidan.com/blog/testing-environment-setup/)

#### Other AT

There is plenty of other assistive technology. The boring keyboard is the most common one, though it does not always look like the one mounted to your laptop (or have the same number of keys).

Do you know [**how Space and Enter↵ behave differently**](/adrianroselli.com/brief-note-on-buttons-enter-and-space.md)
 when pressing a native `<button>`? If not, then probably test those scenarios for your fancy custom button widget.

Centre for Accessibility Australia has a nifty resource for using the [<VPIcon icon="fas fa-globe"/>accessibility features built into your OS or device](https://accessibility.org.au/setting-up/). Read through it. Try them all out. Try them out on your *thing*. Ask users of those settings to try your *thing*. Lather, rinse, repeat.

- [Browsing with a keyboard](https://tetralogical.com/blog/2021/10/26/browsing-with-a-keyboard/) by Henny Swan.
  - [<VPIcon icon="fa-brands fa-apple"/>Enable Full Keyboard Access (FKA) on macOS](https://support.apple.com/guide/mac-help/navigate-your-mac-using-full-keyboard-access-mchlc06d1059/mac) from Apple Support.
  - [<VPIcon icon="fa-brands fa-apple"/>Enable Tab support in desktop Safari](https://support.apple.com/en-gb/guide/safari/ibrw1075/17.0/mac/14.0#:~:text=Press%20Tab%20to%20highlight%20each%20item%20on%20a%20web%20page) from Apple Support.
  - [<VPIcon icon="fa-brands fa-apple"/>Enable FKA on iOS](https://support.apple.com/guide/iphone/control-iphone-with-an-external-keyboard-ipha4375873f/ios) from Apple Support.
  - [<VPIcon icon="fa-brands fa-apple"/>Enable FKA on iPadOS](https://support.apple.com/guide/ipad/control-ipad-with-an-external-keyboard-ipad5f765d6f/ipados) from Apple Support.

<SiteInfo
  name="Browsing with speech recognition - TetraLogical"
  desc="In our fifth and final post from our browsing with assistive technology series, we discuss browsing with speech recognition. You can also explore browsing with a desktop screen reader, browsing with a mobile screen reader, browsing with a keyboard, and browsing with screen magnification."
  url="https://tetralogical.com/blog/2021/11/15/browsing-with-speech-recognition//"
  logo="https://tetralogical.com/_images/favicons/icon.svg"
  preview="https://tetralogical.com/_images/screenshots/blog-2021-11-15-browsing-with-speech-recognition.png"/>

<VidStack src="youtube/1OBoXqM3B4A" />

#### Best Practices

Validate your stuff. I know that is trickier with custom elements and fancy frameworks, but just using the [<VPIcon icon="iconfont icon-w3c"/>W3C HTML Nu Checker](https://validator.w3.org/nu/) could keep you from easy mistakes like typos.

Remember that if you start building features for assorted user preferences, everything related to accessibility still applies. For example, if you make a dark mode it still has to honor WCAG contrast minimums.

Other system settings aren’t necessarily AT, but not honoring them can be disabling for many. For example, [**Windows High Contrast Mode**](/adrianroselli.com/whcm-and-system-colors.md) (AKA Contrast Themes or forced-colors mode). You don’t choose the colors, the users do from a limited palette. Which you should not override. But for which you may need to account in what elements you choose.

#### Show Your Work

Don’t assert the *thing* works in screen readers (for example) and leave it at that. Tell me *which* screen readers (plural). Tell me which versions of those screen readers on which operating systems with which browsers and which versions of those browsers.

Tell me how you tested it, which commands, which interaction mode (sticking with screen readers here), what was announced, where they differed.

Better yet, make a video. A human captioned video. That does not autoplay. Showing AT with standard commands. And no mouse (still using screen readers as my example). Most screen readers have a speech viewer or log which is a good start. Beware that those [**logs often do not fully represent what is announced**](https://adrianroselli.com/2020/08/speech-viewer-logs-of-lies.html)
<!-- TODO: /adrianroselli.com/speech-viewer-logs-of-lies.md -->.

For an extreme example of both approaches, see the [Results section](/2022/04/accessible-description-exposure.html#Results) in my post [**Accessible Description Exposure**](https://adrianroselli.com/2022/04/accessible-description-exposure.html)
<!-- TODO: /adrianroselli.com/accessible-description-exposure.md -->. It includes announcements, how I navigated, videos, and even screen shots of the elements lists. This way users have steps to recreate it.

Though that may be overkill for most. You could get by with something like, “Only VoiceOver on macOS announced the *thing*; JAWS, NVDA, and TalkBack ignored it no matter how I navigated.” Obviously include details on your testing kit somewhere so folks understand which versions of which screen readers with which browsers.

Do not rely on the output of the accessibility inspector in your browser dev tools. What is exposed there may be different than what is exposed in the OS accessibility APIs and thus exposed to users.

And, for the love of His Noodly Appendage, do *not* use “a11y” in your long-form writing. Write it out.

---

## Wrap-up

To try to distill this into the main takeaways:

- For content creators, these resources I shared can help you level up your work. This may make it easier for your *thing* to gain traction when you demonstrate its accessibility chops
- For organizations backing those content creators, if your accessibility reviewers don’t already know the resources I reference, they may need more support. If you don’t have accessibility reviewers, get some.
- For accessibility practitioners (not mentioned until now, but hopefully reading and maybe correcting me), don’t do free labor. Get paid for your knowledge and skill.
- For the resources I linked, they will get stale as new versions of things come out. So, you know, do some legwork and find the most recent versions of them as needed.

Each day articles and talks and demos are shoved into our timelines, making us feel like we are falling behind. If you want to make a *thing*, maybe these resources can help calm that feeling by boosting your work quality in ways most do not properly consider — the accessibility of it.

::: info Other Posts

[**Earlier post: Accessibility ‘Gaps’ in MVPs**](/adrianroselli.com/accessibility-gaps-in-mvps.md)

[**More recent post: Brief Note on aria-readonly Support**](/adrianroselli.com/brief-note-on-aria-readonly-support-html.md)

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Your Accessibility Claims Are Wrong, Unless…",
  "desc": "Now that it is a market differentiator to talk about accessibility in projects, that’s all many do — talk about it. In a sea of pop-dev noise, “accessibility” can be claimed with little risk someone will challenge it. If someone does, the response is often a fine balance between silence…",
  "link": "https://chanhi2000.github.io/bookshelf/adrianroselli.com/your-accessibility-claims-are-wrong-unless.html",
  "logo": "https://adrianroselli.com/wp-content/themes/AAR/favicon.png",
  "background": "rgba(0,0,0,0.2)"
}
```
