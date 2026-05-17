---
lang: en-US
title: "Testing Safari on a Budget"
description: "Article(s) > Testing Safari on a Budget"
icon: fa-brands fa-safari
category:
  - DevOps
  - Apple
  - macOS
  - Browser
  - Safari
  - Article(s)
tag:
  - blog
  - frontendmasters.com
  - devops
  - apple
  - macos
  - browser
  - safari
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Testing Safari on a Budget"
    - property: og:description
      content: "Testing Safari on a Budget"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/testing-safari-on-a-budget.html
prev: /devops/macos/articles/README.md
date: 2026-05-20
isOriginal: false
author:
  - name: Declan Chidlow
    url: https://frontendmasters.com/blog/author/declanchidlow/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/9672
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "macOS > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/macos/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Safari > Article(s)",
  "desc": "Article(s)",
  "link": "/tool/safari/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Testing Safari on a Budget"
  desc="Good luck on non-Apple devices! You may want to try remote hardware or an online service. Or go refurbished and try to keep the cost down."
  url="https://frontendmasters.com/blog/testing-safari-on-a-budget/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/9672"/>

If you’re building for the web, you need to test in the browsers your users are likely to use. For Chrome, Firefox, and derivatives thereof, that is easy enough on almost any general-purpose computing device. However, for Safari, it is a bit harder. Safari is *only* available on Apple’s platforms (though it was on Microsoft Windows from 2007 until 2012). If you don’t have an Apple device, you can’t legitimately install Safari.

For many people, buying an entirely new computer just to test a single web browser is understandably out of reach, especially if a Mac isn’t their primary device. Testing on Safari is really important, however, because it is the second-most-used browser, at 17% market share, and *every* browser on iPadOS and iOS is currently just Safari with a different interface.

Chrome, Firefox, and every other browser currently available on the Apple App Store are WebKit-based. While some jurisdictions have required that Apple allow other browser engines, none have been released as of writing.

---

## Other WebKit Browsers

Safari uses the WebKit browser engine and isn’t the only browser to do so. WebKit is open-source and has been implemented by a few browsers.

[<VPIcon icon="iconfont icon-gnome"/>GNOME Web](https://apps.gnome.org/Epiphany/), also known as Epiphany, is a feature-rich WebKit-based browser for Linux. It is even mentioned on the [<VPIcon icon="fa-brands fa-safari"/>WebKit Downloads page](https://webkit.org/downloads/). As wonderful as it is, however, it doesn’t provide a 1:1 Safari experience. Rendering is ever so slightly different, and Safari also has many of its own quirks. The same is true for other WebKit browsers.

Safari uses many native operating system features, such as input methods. When Liquid Glass launched, some people told me that interfaces across my sites had broken. Not due to a WebKit bug or due to any issue inherent to my sites, but due to Safari’s new browser chrome and changes to macOS, iPadOS, and iOS. Safari also offers exclusive features and integrations, such as Apple Pay, specific iCloud Keychain behaviors, support for certain video codecs, and Safari-only browser extensions.

---

## Web-Based Testing Platforms

There are services that will provide you with access to Safari on a paid subscription basis. Most well-known is probably [<VPIcon icon="fas fa-globe"/>BrowserStack](https://browserstack.com). Other options include [<VPIcon icon="fas fa-globe"/>Browserling](https://browserling.com), [<VPIcon icon="fas fa-globe"/>TestingBot](https://testingbot.com/), [<VPIcon icon="fas fa-globe"/>Autonoma](https://getautonoma.com/), and [<VPIcon icon="fas fa-globe"/>Sauce Labs](https://saucelabs.com/).

![A Safari window viewing the Frontend Masters website is open in MacOS Tahoe within BrowserStack’s interface, contained within a tab in Chrome. The interface has options to switch browsers, configure the view, stop the session, and more.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2026/05/image2.png?resize=1024%2C709&ssl=1)

They often present a huge number of functions but are imperfect. Because you’re remotely streaming a Safari session, you don’t have full access and control. A poor or spotty internet connection can prevent you from testing entirely. Even with a good connection, I’ve personally never had an overly smooth experience, which makes it hard to evaluate performance, animation fluidity, or the minutiae of visuals.

---

## Remote Hardware and Virtualization

If you’re capable and willing to take a more complex approach, [<VPIcon icon="fa-brands fa-aws"/>Amazon Web Services](https://aws.amazon.com/ec2/instance-types/mac/), [<VPIcon icon="fas fa-globe"/>MacinCloud](https://macincloud.com/), [<VPIcon icon="fas fa-globe"/>Scaleway](https://scaleway.com/en/apple-mac-mini/), and other similar services offer rented access to Macs. This can be a viable solution if you’re on a budget, but it comes with drawbacks. First of all, it is complex and can be confusing. Secondly, it is inconvenient.

It allows you to do everything a real Mac can (because it is a real Mac), but streaming means it falls victim to many of the same flaws mentioned by online testers. Depending on the service and plan you use, you might also not have a persistent install, which forces you to configure things and download required software whenever you need to use the device. If you’re savvy, you can write some automations to automate the configuration process.

On the upside, you don’t have to do any computer maintenance or similar.

---

## Automated CI/CD Runners

You can automatically have your site tested with WebKit or full Safari using various continuous integration (CI) and continuous deployment (CD) runners, so tests run when changes are made or released. Locally, you can use [<VPIcon icon="iconfont icon-playwright"/>Playwright](https://playwright.dev/), which has WebKit testing support, but if that doesn’t fit your needs, you can use cloud services such as [GitHub Actions (<VPIcon icon="iconfont icon-github"/>`features/actions`)](https://github.com/features/actions), [<VPIcon icon="iconfont icon-gitlab"/>GitLab CI](https://about.gitlab.com/solutions/continuous-integration/), or [<VPIcon icon="iconfont icon-circle-ci"/>CircleCI](https://circleci.com/) to run tests with real Safari. You can script workflows that capture inputs and take screenshots or videos for your reference, which can be helpful for seeing failures. Unfortunately, such an approach doesn’t fully represent the experience of using the site in Safari. It also makes it hard to debug issues, given the lack of an immediately interactive Web Inspector.

---

## Buy a Mac

The most comprehensive solution is to buy a Macintosh. A Mac not only lets you test in desktop Safari but also allows you to test in Safari on iOS and iPadOS via device simulators in Xcode. You can test multiple versions through a convenient interface directly on your Mac, without needing to buy separate devices. On a Mac, you can also install [<VPIcon icon="fa-brands fa-apple"/>Safari Technology Preview](https://developer.apple.com/safari/technology-preview/) to test upcoming Safari features, or configure a macOS virtual machine to test with an older release of desktop Safari. Unfortunately, Macs are *expensive*. However, you can get a reasonable deal on older models.

If you’re buying a Mac secondhand, make sure you know the full picture. You’ll want to know how much storage and memory (RAM) it has, what chipset it uses, and, if it is a MacBook, its battery health. In addition, you’ll want to know the details of the physical condition.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2026/05/image1.png?resize=1024%2C753&ssl=1)

You can get most of those details by opening the Apple menu in the top-left-hand corner and selecting ‘About This Mac’. To see the exact battery health, open System Settings, go to Battery, then press the information button (🛈) next to Battery Health. You’ll ideally want above 80%, as that is the point where you start to see significant impacts on the battery’s ability to hold a charge.

Macs are largely not upgradable, which is worth considering when purchasing. The amount of RAM and storage you have is likely the amount you’re stuck with. Also, ensure that your Mac is supported by the latest versions of macOS, as Safari versions are tied to the OS.

If you’re savvy, you can find a capable Mac for a price comparable to a longer-term subscription to an online testing service, with the added benefit that you get full control over the computer and you own it outright. You might even be able to resell it once you’ve finished with it. Some considerations for getting a good price:

- You might be able to claim a Mac as a business expense.
- If you’re a student, Apple offers student discounts.
- Lots of students have Macs and upgrade or sell them at the end of the school year. That can be a good time to strike.
- When offices upgrade their computer fleet, they sometimes sell their computers at reduced prices.
- Apple offers [<VPIcon icon="fa-brands fa-apple"/>refurbished devices](https://apple.com/shop/refurbished).

You can also consider buying a Mac in poorer condition. MacBooks particularly are often available at much lower prices if damaged. Chassis damage, such as scratches and dents, can be purely cosmetic and reduce the price without compromising functionality. Damage to the screen, keyboard, trackpad, ports, and other less-critical parts can be more substantial but can be worked around. However, I’d very much advise staying far away from water damage. If water has ingressed, it can be a slow and silent killer. It might seem okay, but that is no guarantee. Also, be wary of faults that seem related to the logic board, such as random power-offs, graphical corruption, and nonworking ports – these can all indicate more deeply rooted issues.

If you find a MacBook with a faulty screen, you might look towards the phenomenon of ‘headless MacBooks’ or ‘slaptops’, which are MacBooks that once had broken screens that have since been removed without disrupting other functionality. An external display is then used, either wired or wirelessly via AirPlay.

---

## Wrapping Up

I hope this guidance helps you test and debug your sites in Safari. It is unfortunate that it is such a costly endeavor. In an ideal world, Apple would release Safari for other operating systems, such as Windows and Linux, or allow easier creation of macOS virtual machines on non-Mac devices. Unfortunately, with Apple further moving to their own in-house chips, compatibility is only getting further away – not closer. With the cheaper [<VPIcon icon="fa-brands fa-apple"/>MacBook Neo](https://apple.com/macbook-neo/), it might be becoming more affordable to buy a device for testing in Safari, but the price isn’t quite negligible yet.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Testing Safari on a Budget",
  "desc": "Good luck on non-Apple devices! You may want to try remote hardware or an online service. Or go refurbished and try to keep the cost down.",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/testing-safari-on-a-budget.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
