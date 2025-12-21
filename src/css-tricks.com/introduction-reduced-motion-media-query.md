---
lang: en-US
title: "An Introduction to the Reduced Motion Media Query"
description: "Article(s) > An Introduction to the Reduced Motion Media Query"
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
      content: "Article(s) > An Introduction to the Reduced Motion Media Query"
    - property: og:description
      content: "An Introduction to the Reduced Motion Media Query"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/introduction-reduced-motion-media-query.html
prev: /programming/css/articles/README.md
date: 2017-02-10
isOriginal: false
author:
  - name: Eric Bailey
    url : https://css-tricks.com/author/ericwbailey/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2017/02/falling.jpg
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
  name="An Introduction to the Reduced Motion Media Query"
  desc="The open web's success is built on interoperable technologies. The ability to control animation now exists alongside important features such as zooming"
  url="https://css-tricks.com/introduction-reduced-motion-media-query"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2017/02/falling.jpg"/>

The open web’s success is built on interoperable technologies. The ability to control animation now exists alongside important features such as zooming content, installing extensions, enabling high contrast display, loading custom stylesheets, or disabling JavaScript.

Sites all too often inundate their audiences with automatically playing, battery-draining, resource-hogging animations. The need for people being able to take back control of animations might be more prevalent than you may initially think.

---

## A brief history of Reduced Motion

When it was released in 2013, iOS 7 featured a dramatic reworking of the operating system’s visuals. Changes included translucency and blurring, a more simplified “flat” user interface, and dramatic motion effects such as full-screen zooming and panning.

While the new look was largely accepted, some people using the updated operating system [<VPIcon icon="fas fa-globe"/>reported experiencing motion sickness and vertigo](http://simplyaccessible.com/article/balance-awareness/). User interface movement didn’t correspond with users’ feeling of movement or spatial orientation, triggering the reported effects.

Although technology unintentionally inflicting adverse effects has existed before this, the popularity of iOS gave the issue prominence. Apple has great support for accessibility, so [<VPIcon icon="fa-brands fa-apple"/>an option in the operating system preferences](https://support.apple.com/en-us/HT202655) to disable motion effects for those with vestibular disorders was added in response.

---

## Vestibu-what?

Your vestibular system provides an internal sensor to communicate your body’s physical position and orientation in the world, and is key to controlling balance and eye movement.

[<VPIcon icon="fas fa-globe"/>Vestibular disorders](http://a11yproject.com/posts/understanding-vestibular-disorders/) can cause your vestibular system to struggle to make sense of what is happening, resulting in loss of balance and vertigo, migraines, nausea, and hearing loss. Anyone who has spun around too quickly is familiar with a confused vestibular system.

Vestibular disorders can be caused by both genetic and environmental factors. It’s part of the larger [<VPIcon icon="fas fa-globe"/>spectrum of conditions](http://webaim.org/intro/) that make up accessibility concerns and it affects more than [<VPIcon icon="fas fa-globe"/>70 million people](http://vestibular.org/understanding-vestibular-disorder).

---

## Pssh! I feel fine! This’ll never happen to me

Remember: [<VPIcon icon="fas fa-globe"/>we’re all just temporarily-abled](https://uxmag.com/articles/we-re-just-temporarily-abled). Maybe you’re born with the condition. Maybe you’ll come down with a fever or an ear infection. Maybe you’ll get carsick or seasick. Maybe you’ll develop a tumor. Or maybe you’ll just get older.

Feeling a little dizzy might not seem like that big a deal, but that moment of nausea might be a critical one: losing balance and falling down, a migraine during an interview, nausea-triggered vomiting while working a food service job, passing out while operating a car UI, etc.

So what can we do about it?

---

## Enter a new media query

Safari 10.1 [<VPIcon icon="fa-brands fa-safari"/>introduced the Reduced Motion Media Query](https://webkit.org/blog/7551/responsive-design-for-motion/). It is a non-vendor-prefixed declaration that allows developers to “create styles that avoid large areas of motion for users that specify a preference for reduced motion in System Preferences.”

The syntax is pretty straightforward:

```css
/* Applies styles when Reduced Motion is enabled */
@media screen and (prefers-reduced-motion: reduce) { }

@media screen and (prefers-reduced-motion) { }
```

Safari will parse this code and apply it to your site, letting you provide an alternative experience for users who have the Reduced Motion option enabled.

It’s worth noting that `(prefers-reduced-motion)` without the `reduce` keyword will evaluate as true. However, I find it’s better to be explicit in these sorts of circumstances, especially for newer and more obscure features.

You can also target the inverse:

```css
/* Applies styles when the user has made no preference known */
@media screen and (prefers-reduced-motion: no-preference) { }
```

Think of this new media query [<VPIcon icon="fas fa-globe"/>like `@supports`](https://lottejackson.com/learning/supports-will-change-your-life): describe the initial appearance, then modify the styles based on capability.

---

## How to test

So, how do we check this bad boy out? Provided you’re up to date with MacOS, you should be able to check it out in Safari.

Go to System Preferences, select the Accessibility category, select the Display tab, and enable the **Reduce Motion** option. You’ll see that the example animation in the CodePen example below updates when the checkbox is toggled: the pulsing circle is changed to an inert square:

Here’s a quick video if you don’t have access to this:

Need a more practical example of how the media query could be applied?

[<VPIcon icon="fas fa-globe"/>This feature from the New York Times](https://nytimes.com/interactive/2016/09/30/opinion/penn-station-reborn.html?_r=1) opens with full-screen autoplaying video that simulates falling from a great height.

![](https://i0.wp.com/css-tricks.com/wp-content/uploads/2017/02/falling.jpg?ssl=1)

Sudden, unexpected, and dramatic animations are strong candidates to trigger vertigo.

The Reduced Motion Media Query could provide an alternative experience that replaces the falling animation with a screenshot of the final frame of the animation.

In this updated experience the content of the article is still communicated thematically: A beautiful rendering of the proposed Gateway project to draw the reader in. The other less-dramatic animations in the feature could remain unchanged, as they are both subtle with their transitions and activated by the reader deliberately browsing the page.

The impact of the story is preserved while not having the potential to inflict harm on the person trying to read it. It’s a win-win!

---

## Hmph! Seems like a lot of work

Even if you ignore all the benefits of building accessible sites, it’s probably a good idea to [<VPIcon icon="fas fa-globe"/>get comfortable working with User Queries](https://decadecity.net/blog/2015/06/28/user-queries).

As capabilities traditionally controlled by the operating system are [<VPIcon icon="fas fa-globe"/>integrated into the browser](https://whatwebcando.today/), crafting experiences that gracefully adapt to a person’s preferences will become increasingly important. Reduced motion ~is likely to be~ soon will be [<VPIcon icon="fas fa-globe"/>supported by other browsers](https://drafts.csswg.org/mediaqueries-5/#prefers-reduced-motion) as part of a wave of new User Queries.

The browser’s opinion needs to also be considered—without a designed alternative, the browser’s fallback settings for reduced motion may not create a desirable experience. In fact, if animation alone communicates important information about your site, it may be lost.

---

## So, should I get just play it safe and get rid of all my animation?

Doing so would be an dramatic and not necessarily valid option. Animation, when used with discretion and restraint, can be a great way to communicate relationships between parts of your site or transitions between states, direct a person’s attention, simplify the understanding of complicated concepts, or to simply add some fun. Used properly, animations can even aid accessibility by helping [<VPIcon icon="fas fa-globe"/>address cognitive accessibility concerns](http://webaim.org/articles/cognitive/).

If you would like more information on what kinds of animation are more likely to trigger vestibular issues, [<VPIcon icon="fas fa-globe"/>Val Head](http://valhead.com/) has written [<VPIcon icon="fas fa-globe"/>an excellent post on A List Apart](http://alistapart.com/article/designing-safer-web-animation-for-motion-sensitivity) on the subject.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "An Introduction to the Reduced Motion Media Query",
  "desc": "The open web's success is built on interoperable technologies. The ability to control animation now exists alongside important features such as zooming",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/introduction-reduced-motion-media-query.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
