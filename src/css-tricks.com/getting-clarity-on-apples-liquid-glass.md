---
lang: en-US
title: "Getting Clarity on Apple's Liquid Glass"
description: "Article(s) > Getting Clarity on Apple's Liquid Glass"
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
      content: "Article(s) > Getting Clarity on Apple's Liquid Glass"
    - property: og:description
      content: "Getting Clarity on Apple's Liquid Glass"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/getting-clarity-on-apples-liquid-glass.html
prev: /programming/css/articles/README.md
date: 2025-07-17
isOriginal: false
author:
  - name: Geoff Graham
    url : https://css-tricks.com/author/geoffgraham/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/07/liquid-glass-still.png
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
  name="Getting Clarity on Apple's Liquid Glass"
  desc="Gathered notes on Liquid Glass, Apple’s new design language that was introduced at WWDC 2025. These links are a choice selection of posts and resources that I've found helpful for understanding the context of Liquid Glass, as well as techniques for recreating it in code."
  url="https://css-tricks.com/getting-clarity-on-apples-liquid-glass"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/07/liquid-glass-still.png"/>

Folks have a lot to say about “liquid glass,” the design aesthetic that Apple introduced at [<VPIcon icon="fa-brands fa-apple"/>WWDC 2025](https://developer.apple.com/wwdc25/). Some love it, some hate it, and others jumped straight into seeing how to they could create it in CSS.

There’s a lot to love, hate, and experience with liquid glass. You can love the way content reflects against backgrounds. You can hate the poor contrast between foreground and background. And you can be eager to work with it. All of those can be true at the same time.

![Image credit: [<VPIcon icon="fa-brands fa-apple"/>Apple](https://apple.com/newsroom/2025/06/apple-introduces-a-delightful-and-elegant-new-software-design/)](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/07/Apple-WWDC25-Liquid-Glass-Icon-Composer-250609_big.jpg.large_2x.jpg?resize=1960%2C1102&ssl=1)

I, for one, am generally neutral with things like this for that exact reason. I’m intrigued by liquid glass, but hold some concern about legibility, particularly as someone who already struggles with the legibility of Apple’s existing design system (notably in Control Center). And I love looking at the [<VPIcon icon="fa-brands fa-codepen"/>many and clever ways](https://codepen.io/search/collections?q=Liquid%2520glass) that devs have tried to replicate liquid glass in their own experiments.

So, I’m in the process of gathering notes on the topic as I wrap my head around this “new” (or not-so-new, [<VPIcon icon="fas fa-globe"/>depending on who’s talking](https://bsky.app/profile/thomasfuchs.at/post/3lthgojtmbs27)) thing and figure out where it fits in my own work. These links are a choice selection of posts that I’ve found helpful and definitely not meant to be an exhaustive list of what’s out there.

---

## WWDC Introduction

Always a good idea to start with information straight from the horse’s mouth.

<VidStack src="youtube/jGztGfRujSE" />

In short:

- It’s the first design system that is universally applied to all of Apple’s platforms, as opposed to a single platform like Apple’s last major overhaul, iOS 7.
- It’s designed to refract light and dynamically react to user interactions.
- By “dynamic” we’re referring to UI elements updating into others as the context changes, such as displaying additional controls. This sounds a lot like the [<VPIcon icon="fa-brands fa-apple"/>Dynamic Island](https://developer.apple.com/news/?id=mis6swzt), supporting shape-shifting animations.
- There’s a focus on freeing up space by removing hard rectangular edges, allowing UI elements to become part of the content and respond to context.

Apple also released a more in-depth video aimed at introducing liquid glass to designers and developers.

<VidStack src="youtube/IrGYUq1mklk  " />

::: important In short:

- Liquid glass is an evolution of the “aqua” blue interface from [<VPIcon icon="fa-brands fa-wikipedia-w"/>macOS 10](https://en.wikipedia.org/wiki/Mac_OS_X_10.0), the real-time introduced in [<VPIcon icon="fa-brands fa-wikipedia-w"/>iOS 7](https://en.wikipedia.org/wiki/IOS_7), the “fluidity” of [<VPIcon icon="fa-brands fa-wikipedia-w"/>iOS 10](https://en.wikipedia.org/wiki/IOS_10), the flexibility of the Dynamic Island, and the immersive interface of [<VPIcon icon="fa-brands fa-apple"/>visionOS](https://developer.apple.com/visionos/).
- It’s a “digital meta-material” that dynamically bends and shapes light while moving fluidly like water.
- It’s at least partially a response to hardware devices adopting deeper rounded corners.
- Lensing: Background elements are bended and warped rather than scattering light as it’s been in previous designs. There’s gel-like feel to elements.
- Translucence helps reveal what is underneath a control, such as a progress indicator you can scrub more precisely by seeing what is behind the surface.
- Controls are persistent between views for establishing a relationship between controls and states. This reminds me of the [**View Transition API**](/css-tricks.com/toe-dipping-into-view-transitions.md).
- Elements automatically adapt to light and dark modes.
- Liquid glass is composed of layers: highlight (light casting and movement), shadow (added depth for separation between foreground and background), and illumination (the flexible properties of the material).
- It is not meant to be used *everywhere* but is most effective for the navigation layer. And avoid using glass on glass.
- There are two variants: regular (most versatile) and clear (does not have adaptive behaviors for allowing content to be more visible below the surface).
- Glass can be tinted different colors.

:::

---

## Documentation

![Wireframe of a mobile app screen header with boxes representing the parts of a navigation.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/07/liquid-glass-documentation.png?resize=1926%2C946)

Right on cue, Apple has already made a number of developer resources available for using and implementing liquid glass that are handy references.

<SiteInfo
  name="Liquid Glass | Apple Developer Documentation"
  desc="Learn how to design and develop beautiful interfaces that leverage Liquid Glass."
  url="https://developer.apple.com/documentation/technologyoverviews/liquid-glass/"
  logo="https://developer.apple.com/favicon.ico"
  preview="https://developer.apple.com/tutorials/developer-og.jpg"/>

<SiteInfo
  name="Adopting Liquid Glass | Apple Developer Documentation"
  desc="Find out how to bring the new material to your app."
  url="https://developer.apple.com/documentation/technologyoverviews/adopting-liquid-glass/"
  logo="https://developer.apple.com/favicon.ico"
  preview="https://developer.apple.com/tutorials/developer-og.jpg"/>

<SiteInfo
  name="Landmarks: Building an app with Liquid Glass | Apple Developer Documentation"
  desc="Enhance your app experience with system-provided and custom Liquid Glass."
  url="https://developer.apple.com/documentation/SwiftUI/Landmarks-Building-an-app-with-Liquid-Glass/"
  logo="https://developer.apple.com/favicon.ico"
  preview="https://developer.apple.com/tutorials/developer-og.jpg"/>

<SiteInfo
  name="Applying Liquid Glass to custom views | Apple Developer Documentation"
  desc="Configure, combine, and morph views using Liquid Glass effects."
  url="https://developer.apple.com/documentation/swiftui/applying-liquid-glass-to-custom-views/"
  logo="https://developer.apple.com/favicon.ico"
  preview="https://developer.apple.com/tutorials/developer-og.jpg"/>

---

## ‘Beautiful’ and ‘Hard to Read’: Designers React to Apple’s Liquid Glass Update

[<VPIcon icon="fas fa-globe"/>This Wired piece](https://wired.com/story/designers-react-to-apple-liquid-glass/) is a nice general overview of what liquid glass is and context about how it was introduced at WWDC 2025. I like getting a take on this from a general tech perspective as opposed to, say, someone’s quick hot take. It’s a helpful pulse on what’s happening from a high level without a bunch of hyperbole, setting the stage for digging deeper into things.

In short:

- Apple is calling this “Liquid Glass.”
- It’s Apple’s first significant UI overhaul in 10 years.
- It will be implemented across all of Apple’s platforms, including iOS, macOS, iPadOS, and even the Vision Pro headset from which it was inspired.
- “From a technical perspective, it’s a very impressive effect. I applaud the time and effort it must have taken to mimic refraction and dispersion of light to such a high degree.”
- “Similar to the first beta for iOS 7, what we’ve seen so far is rough on the edges and potentially veers into distracting or challenging to read, especially for users with visual impairments.”

---

## Accessibility

Let’s get right to the heart of where the pushback against liquid glass is coming from. While the aesthetic, purpose, and principles of liquid glass are broadly applauded, many are concerned about the legibility of content against a glass surface.

Traditionally, we fill backgrounds with solid or opaque solid color to establish contrast between the foreground and background, but with refracted light, color plays less a role and it’s possible that highlighting or dimming a light source will not produce enough contrast, particularly for those with low-vision. WCAG 2.2 emphasizes color and font size for improving contrast and does provide guidance for something that’s amorphous like liquid glass where bending the content below it is what establishes contrast.

<SiteInfo
  name="Apple’s “Liquid Glass” and What It Means for Accessibility | Idreezus"
  desc="What does it mean when the world’s most influential tech company prioritizes aesthetics over readability?"
  url="https://idreezus.com/learn/apples-liquid-glass-and-what-it-means-for-accessibility/"
  logo="https://cdn.prod.website-files.com/67ee078d39cb0adb0f53a878/6837b8aeb6b42925a1349e11_favicon-3.png"
  preview="https://cdn.prod.website-files.com/67fe04ba5870aa971b77bb96/6847e615f3ec6bf2a4ba9c7c_cover-photo.jpg"/>

- “When you have translucent elements letting background colors bleed through, you’re creating variable contrast ratios that might work well over one background, but fail over a bright photo of the sunset.”
- “Apple turned the iPhone’s notch into the Dynamic Island, Android phones that don’t have notches started making fake notches, just so they could have a Dynamic Island too. That’s influence. But here they are making what looks like a purely aesthetic decision without addressing the accessibility implications.”
- “People with dyslexia, who already struggle with busy backgrounds and low-contrast text, now deal with an interface where visual noise is baked into the design language. People with attention disorders may have their focus messed up when they see multiple translucent layers creating a whole lot of visual noise.”
- “It’s like having a grand entrance and a side door marked ‘accessible.’ Technically compliant. But missing the point.”
- “The legal landscape adds another layer. There’s thousands of digital accessibility lawsuits filed in the U.S. yearly for violating the ADA, or the American Disabilities Act. Companies are paying millions in settlements. But this is Apple. They have millions. Plus all the resources in the world to save them from legal risks. But their influence means they’re setting precedents.”

```component VPCard
{
  "title": "Liquid Glass: Apple vs accessibility | Revert to Saved: A blog about design, gaming and technology",
  "desc": "Candid commentary on technology, retro games, Macs and other things, written by Craig Grannell.",
  "link": "https://reverttosaved.com/2025/06/10/liquid-glass-apple-vs-accessibility//",
  "logo": "ps://reverttosaved.com/favicon.ico",
  "background": "rgba(249,212,118,0.2)"
}
```

- “Yet even in Apple’s press release, linked earlier, there are multiple screenshots where key interface components are, at best, very difficult to read. That is the new foundational point for Apple design. And those screenshots will have been designed to show the best of things.”
- “Apple is still very often reactive rather than proactive regarding vision accessibility. Even today, there are major problems with the previous versions of its operating systems (one example being the vestibular trigger if you tap-hold the Focus button in Control Centre). One year on, they aren’t fixed.”
- “State, correctly, that Apple is a leader in accessibility. But stop assuming that just because this new design might be OK for you and because Apple has controls in place that might help people avoid the worst effects of design changes, everything is just peachy. Because it isn’t.”

<SiteInfo
  name="Liquid Glass"
  desc="Thoughts on the UI paradigm shift Apple just introduced with Liquid Glass."
  url="https://hvpandya.com/liquid-glass/"
  logo="https://hvpandya.com/assets/favicon/favicon.ico"
  preview="https://hvpandya.com/assets/og-images/og-liquid-glass.png?t=1709640696"/>

- “The effect is technically impressive, but it introduces a layer of visual processing between you and your memories. What was once immediate now feels mediated. What was once direct now feels filtered.”
- “While Apple’s rationale for Liquid Glass centers on ‘seeing’ content through a refractive surface, user interface controls are not meant to be seen—they are meant to be operated. When you tap a button, slide a slider, or toggle a switch, you are not observing these elements. You are manipulating them directly.”
- “Buttons become amorphous shapes. Sliders lose their mechanical clarity. Toggle switches abandon their physical affordances. They appear as abstract forms floating behind glass—beautiful perhaps, but disconnected from the fundamental purpose of interface controls: to invite and respond to direct manipulation.”
- “The most forward-thinking interface design today focuses on invisibility - making the interaction so seamless that the interface itself disappears. Liquid Glass makes the interface more visible, more present, and more demanding of attention.”

```component VPCard
{
  "title": "Liquid glass, now with frosted tips",
  "desc": "As many now have commented on, today's OS 26 betas tone down the liquid glass effect quite a bit on many elements in the operating system, and I've collected a few that stand out to me. Ignore any subtle size differences. The beta 2 screenshots are from an iPhone 16",
  "link": "https://birchtree.me/blog/liquid-glass-now-with-frosted-tips//",
  "logo": "https://birchtree.me/content/images/size/w256h256/2025/03/birchtreefavi.png",
  "background": "rgba(203,166,247,0.2)"
}
```

- It’s easy to dump on liquid glass in its introductory form, but it’s worth remembering that it’s in beta and that Apple is actively developing it ahead of its formal release.
- A lot has changed between the Beta 2 and Beta 3 releases. The opacity between glass and content has been bumped up in several key areas.

![Comparing Developer Beta 2 (top) and Developer Beta 3 (bottom) of a bottom navigation bar. The previous version is clearer and more difficult to read because it blends in with the background more than the newer version, which increases the amount of frost in the background layer.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/07/image.png?resize=1600%2C1306&ssl=1)

---

## Tutorials, Generators, and Frameworks

It’s fun to see the difference approaches many folks have used to re-create the liquid glass effect in these early days. It amazes me that there is already a deluge of tutorials, generators, and even UI frameworks when we’re only a month past the WWDC 2025 introduction.

- [<VPIcon icon="fa-brands fa-youtube"/>Create this trendy blurry glass effect with CSS](https://youtu.be/dsZ7RN9ItR4) (Kevin Powell)
- [<VPIcon icon="fa-brands fa-youtube"/>Liquid Glass design using CSS](https://youtu.be/kTOLrsDlKQA) (Nordcraft)
- [<VPIcon icon="fas fa-globe"/>Adopting Apple’s Liquid Glass: Examples and best practices](https://blog.logrocket.com/ux-design/adopting-liquid-glass-examples-best-practices/) (LogRocket)
- [<VPIcon icon="fa-brands fa-figma"/>Liquid Glass Figma File](https://figma.com/community/file/1514237154489556536/ios-26-liquid-glass)
- [<VPIcon icon="fas fa-globe"/>CSS Liquid Glass Effects](https://designfast.io/liquid-glass) (DesignFast)
- [<VPIcon icon="fas fa-globe"/>Liquid Glass UI Framework](https://liquidglassui.org)
- [<VPIcon icon="fas fa-globe"/>Liquid Glass CSS Generator](https://liquid-glass.pro/generator.html)

---

## Experiments

Let’s drop in a few interesting demos that folks have created. To be clear, glass-based interfaces are not new and have been plenty explored, which you can find over at CodePen in abundance. These are recent experiments. The most common approaches appear to reach for SVG filters and background blurs, though there are many programmatic demos as well.

Using a CSS-only approach with an SVG filter with `backdrop-filter` with a series of nested containers that sorta mimics how Apple describes glass as being composed of three layers (highlight, shadow and illumination):

<CodePen
  user="lucasromerodb"
  slug-hash="vEOWpYM"
  title="Liquid Glass Effect macOS (button background)"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

Same sort of deal here, but in the context of a theme toggle switch that demonstrates how glass can be tinted:

<CodePen
  user="DedaloD"
  slug-hash="JodwNzX"
  title="Apple Liquid glass switcher"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

Comparing a straight-up CSS blur with an SVG backdrop:

<CodePen
  user="nitnelav"
  slug-hash="myJKQme"
  title="Apple Liquid Glass Experiments"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

Contextual example of a slider component:

<CodePen
  user="maxuiux"
  slug-hash="VYLQJoy"
  title="Slider Button Liquid Glass Apple iOS 26 - 2025"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

Using WebGL:

<CodePen
  user="shingidad"
  slug-hash="jEPxMgW"
  title="Liquid Glass Shader"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

---

## Assorted links and coverage

A few more links from this browser tab group I have open:

<SiteInfo
  name="Apple’s Liquid Glass is exactly as ambitious as Apple"
  desc="Apple just introduced its biggest redesign in a decade. It may be that long before we know if it’s any good."
  url="https://fastcompany.com/91349477/apples-liquid-glass-is-exactly-as-ambitious-as-apple/"
  logo="https://fastcompany.com/icon2.png?b678e518725dc009"
  preview="https://images.fastcompany.com/image/upload/f_webp,q_auto,c_fit/wp-cms-2/2025/06/p-2-91349477-mark-wilson-apple-take.jpg"/>

<SiteInfo
  name="Apple unveils iOS 26 with Liquid Glass redesign, CarPlay updates, Games app, much more - 9to5Mac"
  desc="Apple has officially announced iOS 26, the successor to iOS 18. The renamed software update starts with a new design...."
  url="https://9to5mac.com/2025/06/09/ios-26/"
  logo="https://9to5mac.com/wp-content/uploads/sites/6/2019/10/cropped-cropped-mac1-1.png?w=192"
  preview="https://i0.wp.com/9to5mac.com/wp-content/uploads/sites/6/2025/06/wwdc-2025-13.10.07.jpg?resize=1200%2C628&quality=82&strip=all&ssl=1"/>

<SiteInfo
  name="Apple Announces All-New 'Liquid Glass' Software Redesign Across iOS 26 and More"
  desc="Apple today announced a complete redesign of all of its major software platforms called ”Liquid Glass.”   Announced simultaneously for iOS,..."
  url="https://macrumors.com/2025/06/09/apple-announces-liquid-glass/"
  logo="https://images.macrumors.com/images-new/favicon-16x16.png"
  preview="https://images.macrumors.com/t/6A0LQekAXCvO_IWogJltHl_sIXs=/1600x/article-new/2025/06/liquid-glass.jpg"/>
  
<SiteInfo
  name="Apple just added more frost to its Liquid Glass design"
  desc="Frosty."
  url="https://theverge.com/news/700066/apple-liquid-glass-frosted-ios-26-developer-beta/"
  logo="https://theverge.com/static-assets/icons/android-chrome-512x512.png"
  preview="https://platform.theverge.com/wp-content/uploads/sites/2/2025/07/apple-liquid-glass.jpg?quality=90&strip=all&crop=0%2C3.4216870907457%2C100%2C93.156625818509&w=1200"/>

<SiteInfo
  name="Apple tones down Liquid Glass effect in iOS 26 beta 3"
  desc="Apple has released the third developer beta of iOS 26, bringing a subtle but noticeable change to the system's design language. In this update, Apple has toned down the intensity of the Liquid Glass effect across the operating system, making the translucent, glass-like elements in navigation bars and certain apps less pronounced. Liquid Glass is"
  url="https://theapplepost.com/2025/07/07/68703/apple-tones-down-liquid-glass-effect-in-ios-26-beta-3//"
  logo="https://theapplepost.com/wp-content/uploads/2020/02/cropped-theapplepost.com-logo-192x192.png"
  preview="https://theapplepost.com/wp-content/uploads/2025/06/iOS-26-iPhone-16-Pro-Max-—-The-Apple-Post.jpg"/>

<SiteInfo
  name="More assorted notes on Liquid Glass"
  desc="Discussing icon design, and commenting on some passages of Apple's Adopting Liquid Glass document."
  url="https://morrick.me/archives/10068/"
  logo="https://i0.wp.com/morrick.me/wp-content/uploads/2017/10/cropped-new-R-logo-red-siteicon.png?fit=192%2C192&ssl=1"
  preview="https://morrick.me/wp-content/uploads/2025/06/11-macosxhig2009-1119.png"/>

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Getting Clarity on Apple's Liquid Glass",
  "desc": "Gathered notes on Liquid Glass, Apple’s new design language that was introduced at WWDC 2025. These links are a choice selection of posts and resources that I've found helpful for understanding the context of Liquid Glass, as well as techniques for recreating it in code.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/getting-clarity-on-apples-liquid-glass.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
