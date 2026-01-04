---
lang: en-US
title: "Smashing Animations Part 1: How Classic Cartoons Inspire Modern CSS"
description: "Article(s) > Smashing Animations Part 1: How Classic Cartoons Inspire Modern CSS"
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
      content: "Article(s) > Smashing Animations Part 1: How Classic Cartoons Inspire Modern CSS"
    - property: og:description
      content: "Smashing Animations Part 1: How Classic Cartoons Inspire Modern CSS"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/smashingmagazine.com/smashing-animations-part-1-classic-cartoons-inspire-css.html
prev: /programming/css/articles/README.md
date: 2025-05-07
isOriginal: false
author:
  - name: Andy Clarke
    url : https://smashingmagazine.com/author/andy-clarke/
cover: https://files.smashing.media/articles/smashing-animations-part-1-classic-cartoons-inspire-css/smashing-animations-part-1-classic-cartoons-inspire-css.jpg
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
  name="Smashing Animations Part 1: How Classic Cartoons Inspire Modern CSS"
  desc="Have you ever thought about how the limitations of early cartoon animations might relate to web design today? From looping backgrounds to minimal frame changes, these retro animation techniques have surprising parallels to modern CSS. In this article, pioneering author and web designer [Andy Clarke](https://stuffandnonsense.co.uk) shows how he applied these principles to Emmy-winning composer Mike Worth’s new website, using CSS to craft engaging and fun animations that bring his world to life."
  url="https://smashingmagazine.com/2025/05/smashing-animations-part-1-classic-cartoons-inspire-css/"
  logo="https://smashingmagazine.com/images/favicon/favicon.svg"
  preview="https://files.smashing.media/articles/smashing-animations-part-1-classic-cartoons-inspire-css/smashing-animations-part-1-classic-cartoons-inspire-css.jpg"/>

Have you ever thought about how the limitations of early cartoon animations might relate to web design today? From looping backgrounds to minimal frame changes, these retro animation techniques have surprising parallels to modern CSS. In this article, pioneering author and web designer [<VPIcon icon="fas fa-globe"/>Andy Clarke](https://stuffandnonsense.co.uk) shows how he applied these principles to Emmy-winning composer Mike Worth’s new website, using CSS to craft engaging and fun animations that bring his world to life.

Browser makers didn’t take long to add the movement capabilities to CSS. The simple `:hover` pseudo-class came first, and a bit later, the `transition`s between two states. Then came the ability to change states across a set of `@keyframes` and, most recently, scroll-driven animations that link keyframes to the scroll position.

Even with these added capabilities, **CSS animations have remained relatively rudimentary**. They remind me of the [<VPIcon icon="fa-brands fa-wikipedia-w"/>Hanna-Barbera](https://en.wikipedia.org/wiki/Hanna-Barbera) animated series I grew up watching on TV.

These animated shorts lacked the budgets given to live-action or animated movies. They were also far lower than those available when William Hanna and Joseph Barbera made Tom and Jerry shorts while working for MGM Cartoons. This meant the animators needed to develop techniques to work around their cost restrictions and the technical limitations of the time.

They used fewer frames per second and far fewer cells. Instead of using a different image for each frame, they repeated each one several times. They reused cells as frequently as possible by zooming and overlaying additional elements to construct a new scene. They kept bodies mainly static and overlayed eyes, mouths, and legs to create the illusion of talking and walking. Instead of reducing the quality of these cartoons, these constraints created a charm often lacking in more recent, bigger-budget, and technically advanced productions.

![[<VPIcon icon="fas fa-file-image"/>Large preview](https://files.smashing.media/articles/smashing-animations-part-1-classic-cartoons-inspire-css/3-yogi-bear-show.png)](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/smashing-animations-part-1-classic-cartoons-inspire-css/3-yogi-bear-show.png)

The simple and efficient techniques developed by Hanna-Barbera’s animators can be implemented using CSS. Modern layout tools allow web developers to layer elements. Scaleable Vector Graphics (SVG) can contain several frames, and developers needn’t resort to JavaScript; they can use CSS to change an element’s `opacity`, `position`, and `visibility`. But what are some reasons for doing this?

Animations bring static experiences to life. They can **improve usability** by guiding people’s actions and delighting or surprising them when interacting with a design. When carefully considered, animations can reinforce branding and help tell stories about a brand.

![Design by Andy Clarke, Stuff & Nonsense. Mike Worth’s website will launch in June 2025, but you can see examples from this article on CodePen. ([<VPIcon icon="fas fa-file-image"/>Large preview](https://files.smashing.media/articles/smashing-animations-part-1-classic-cartoons-inspire-css/4-andy-clarke-design.png))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/smashing-animations-part-1-classic-cartoons-inspire-css/4-andy-clarke-design.png)

---

## Introducing Mike Worth

I’ve recently been working on a new website for Emmy-award-winning game composer Mike Worth. He hired me to create a bold, retro-style design that showcases his work. I used CSS animations throughout to delight and surprise his audience as they move through his website.

Mike loves ’80s and ’90s animation — especially Disney’s [<VPIcon icon="fa-brands fa-wikipedia-w"/>Duck Tales](https://en.wikipedia.org/wiki/DuckTales_(1987_TV_series)). Unsurprisingly, my taste in cartoons stretches back a little further to the 1960s [<VPIcon icon="fa-brands fa-wikipedia-w"/>Hanna-Barbera](https://en.wikipedia.org/wiki/Hanna-Barbera) shows like Dastardly and Muttley in *Their Flying Machines*, *Scooby-Doo*, *The Perils of Penelope Pitstop*, *Wacky Races*, and, of course, [<VPIcon icon="fa-brands fa-wikipedia-w"/>Yogi Bear](https://en.wikipedia.org/wiki/Yogi_Bear).

So, to explain how this era of animation relates to CSS, I’ve chosen an episode of *The Yogi Bear Show*, “[<VPIcon icon="fa-brands fa-youtube"/>Home Sweet Jellystone](https://youtu.be/CPnmzcmKgA0),” first broadcast in 1961. In this story, Ranger Smith inherits a mansion and (spoiler alert) leaves Jellystone.

![The Yogi Bear Show, copyright Warner Bros. Entertainment Inc. ([<VPIcon icon="fas fa-file-image"/>Large preview](https://files.smashing.media/articles/smashing-animations-part-1-classic-cartoons-inspire-css/5-yogi-bear-show-home-sweet-jellystone.png))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/smashing-animations-part-1-classic-cartoons-inspire-css/5-yogi-bear-show-home-sweet-jellystone.png)

---

## Dissecting Movement

In this episode, Hanna-Barbera’s techniques become apparent as soon as a postman arrives with a telegram for Ranger Smith. The camera pans sideways across a landscape painting by background artist Robert Gentle to create the illusion that the postman is moving.

![The Yogi Bear Show, copyright Warner Bros. Entertainment Inc. (Author’s recreation) ([<VPIcon icon="fas fa-file-image"/>Large preview](https://files.smashing.media/articles/smashing-animations-part-1-classic-cartoons-inspire-css/6-yogi-bear-show-author-recreation.png))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/smashing-animations-part-1-classic-cartoons-inspire-css/6-yogi-bear-show-author-recreation.png)

The background loops when a scene lasts longer than a single pan of Robert Gentle’s landscape painting, with bushes and trees appearing repeatedly.

![The Yogi Bear Show, copyright Warner Bros. Entertainment Inc. ([<VPIcon icon="fas fa-file-image"/>Large preview](https://files.smashing.media/articles/smashing-animations-part-1-classic-cartoons-inspire-css/7-yogi-bear-dissecting-movement.png))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/smashing-animations-part-1-classic-cartoons-inspire-css/7-yogi-bear-dissecting-movement.png)

This can be recreated using a single element and an animation that changes the position of its background image:

```css
@keyframes background-scroll {
  0% { background-position: 2750px 0; }
  100% { background-position: 0 0; }
}

div {
  overflow: hidden;
  width: 100vw;
  height: 540px;
  background-image: url("…");
  background-size: 2750px 540px;
  background-repeat: repeat-x;
  animation: background-scroll 5s linear infinite;
}
```

<CodePen
  user="smashingmag"
  slug-hash="NPPzgyq"
  title="Yogi Bear background image scroll [forked]"
  :default-tab="['css','result']"
  :theme="dark"/>

Although beautifully executed, Robert Gentle’s background paintings were often remarkably simple. The mansion’s interior background rushes past to create the illusion of Ranger Smith dashing across it, so it needed very few details.

![The Yogi Bear Show, copyright Warner Bros. Entertainment Inc. ([<VPIcon icon="fas fa-file-image"/>Large preview](https://files.smashing.media/articles/smashing-animations-part-1-classic-cartoons-inspire-css/8-robert-gentle-background-painting.png))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/smashing-animations-part-1-classic-cartoons-inspire-css/8-robert-gentle-background-painting.png)

**The economy of movement** was essential for producing these animated shorts cheaply and efficiently. The postman’s motorcycle bounces, and only his head position and facial expressions change, which adds a subtle hint of realism.

![The Yogi Bear Show, copyright Warner Bros. Entertainment Inc. Sequence shortened. ([<VPIcon icon="fas fa-file-image"/>Large preview](https://files.smashing.media/articles/smashing-animations-part-1-classic-cartoons-inspire-css/9-yogi-bear-sequence-shortened.png))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/smashing-animations-part-1-classic-cartoons-inspire-css/9-yogi-bear-sequence-shortened.png)

Likewise, only Ranger Smith’s facial expression and leg positions change throughout his walk cycle as he dashes through his mansion. The rest of his body stays static.

![The Yogi Bear Show, copyright Warner Bros. Entertainment Inc. Sequence shortened. ([<VPIcon icon="fas fa-file-image"/>Large preview](https://files.smashing.media/articles/smashing-animations-part-1-classic-cartoons-inspire-css/10-yogi-bear-sequence-shortened.png))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/smashing-animations-part-1-classic-cartoons-inspire-css/10-yogi-bear-sequence-shortened.png)

In a discarded scene from my design for his website, the orangutan adventurer mascot I created for Mike Worth can be seen driving across the landscape.

![Mike Worth’s website will launch in June 2025, but you can see examples from this article on CodePen. ([<VPIcon icon="fas fa-file-image"/>Large preview](https://files.smashing.media/articles/smashing-animations-part-1-classic-cartoons-inspire-css/11-mike-worth-website.png))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/smashing-animations-part-1-classic-cartoons-inspire-css/11-mike-worth-website.png)

I drew directly from **Hanna-Barbera’s bouncing and scrolling technique** for this scene by using two keyframe animations: `background-scroll` and `bumpy-ride`. The infinitely scrolling background works just like before:

```css
@keyframes background-scroll {
  0% { background-position: 960px 0; }
  100% { background-position: 0 0; }
}
```

I created the appearance of his bumpy ride by animating changes to the keyframes’ `translate` values:

```css
@keyframes bumpy-ride {
  0% { translate: 0 0; }
  10% { translate: 0 -5px; }
  20% { translate: 0 3px; }
  30% { translate: 0 -3px; }
  40% { translate: 0 5px; }
  50% { translate: 0 -10px; }
  60% { translate: 0 4px; }
  70% { translate: 0 -2px; }
  80% { translate: 0 7px; }
  90% { translate: 0 -4px; }
  100% { translate: 0 0; }
}

figure {
  /* ... */
  animation: background-scroll 5s linear infinite;
}

img {
  /* ... */
  animation: bumpy-ride 1.5s infinite ease-in-out;
}
```

<CodePen
  user="smashingmag"
  slug-hash="ByyVZrB"
  title="Mike Worth background image scroll [forked]"
  :default-tab="['css','result']"
  :theme="dark"/>

As Michelle Barker wrote about [**here at Smashing Magazine**](/smashingmagazine.com/respecting-users-motion-preferences.md) back in 2021:

> “When working with motion on the web, it’s important to consider that not everyone experiences it the same way. What might feel smooth and slick to some might be annoying or distracting to others — or worse, induce feelings of sickness or even cause seizures.”  
>
> — Michelle Barker

You can prevent that from happening by turning off animations when someone has chosen reduced motion in their browser by using the `prefers-reduced-motion` media query:

```css
@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; }
}
```

---

## Reusing Elements

Since each episode’s budget and production time were limited, William Hanna and Joseph Barbera created a streamlined process for producing their animations. They used as few as 2,000 individual drawings and just a few background paintings per episode, often reusing them on several episodes.

![The Yogi Bear Show, copyright Warner Bros. Entertainment Inc. ([<VPIcon icon="fas fa-file-image"/>Large preview](https://files.smashing.media/articles/smashing-animations-part-1-classic-cartoons-inspire-css/12-yogi-bear-background-painting.png))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/smashing-animations-part-1-classic-cartoons-inspire-css/12-yogi-bear-background-painting.png)

Watch the episode and you’ll see these trees appear over and over again throughout “Home Sweet Jellystone.” Behind Yogi and Boo-Boo on the track, in the bushes, and scaled up in this close-up of Boo-Boo:

![The Yogi Bear Show, copyright Warner Bros. Entertainment Inc. ([<VPIcon icon="fas fa-file-image"/>Large preview](https://files.smashing.media/articles/smashing-animations-part-1-classic-cartoons-inspire-css/1-yogi-bear-show-reusing-elements.png))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/smashing-animations-part-1-classic-cartoons-inspire-css/1-yogi-bear-show-reusing-elements.png)

The animators also frequently **layered foreground elements onto these background paintings** to create a variety of new scenes:

![On the left: The Yogi Bear Show, copyright Warner Bros. Entertainment Inc. On the right: Author’s edit.([<VPIcon icon="fas fa-file-image"/>Large preview](https://files.smashing.media/articles/smashing-animations-part-1-classic-cartoons-inspire-css/2-layered-foreground-elements.png))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/smashing-animations-part-1-classic-cartoons-inspire-css/2-layered-foreground-elements.png)

In my deleted scene from Mike Worth’s website, I introduced these rocks into the foreground to add depth to the animation:

![Mike Worth’s website will launch in June 2025, but you can see examples from this article on CodePen. ([<VPIcon icon="fas fa-file-image"/>Large preview](https://files.smashing.media/articles/smashing-animations-part-1-classic-cartoons-inspire-css/13-layered-foreground-elements.png))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/smashing-animations-part-1-classic-cartoons-inspire-css/13-layered-foreground-elements.png)

If I were using bitmap images, this would require just one additional image:

```html
<figure>
  <img id="bumpy-ride" src="..." alt="" />
  <img id="apes-rock" src="..." alt="" />
</figure>
```

```css
figure {
  position: relative; 

  #bumpy-ride { ... }

  #apes-rock {
    position: absolute;
    width: 960px;
    left: calc(50% - 480px);
    bottom: 0;
  }
}
```

<CodePen
  user="smashingmag"
  slug-hash="xbbzraj"
  title="Mike Worth layered animation [forked]"
  :default-tab="['css','result']"
  :theme="dark"/>

Had I continued developing this scene, I might’ve added a slower scrolling animation to those rocks to introduce a parallax effect for even greater realism.

---

## Looping Frames Create Movement

To meet their limited budget and production schedules, Hanna Barbera’s animators carefully planned their animations and cleverly **only animated specific elements**. While heads and facial expressions make characters talk and their legs change to make them walk, most characters’ bodies remain relatively static. So, throughout this entire scene of Ranger Smith walking and talking his way across his cabin, only his face and legs are animated:

![Looping Frames of Ranger Smith walking, where only his face and legs are animated](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/smashing-animations-part-1-classic-cartoons-inspire-css/14-looping-frames.png)

The Yogi Bear Show, copyright Warner Bros. Entertainment Inc. ([<VPIcon icon="fas fa-file-image"/>Large preview](https://files.smashing.media/articles/smashing-animations-part-1-classic-cartoons-inspire-css/14-looping-frames.png))

Likewise, when the ranger reads his telegram, only his eyes and mouth move:

![Looping Frames of Ranger Smith reading a telegram](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/smashing-animations-part-1-classic-cartoons-inspire-css/15-looping-frames-movement.png)

The Yogi Bear Show, copyright Warner Bros. Entertainment Inc. ([<VPIcon icon="fas fa-file-image"/>Large preview](https://files.smashing.media/articles/smashing-animations-part-1-classic-cartoons-inspire-css/15-looping-frames-movement.png))

If you’ve wondered why both Ranger Smith and Yogi Bear wear collars and neckties, it’s so the line between their animated heads and faces and static bodies is obscured:

![Yogi Bear wearing a collar](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/smashing-animations-part-1-classic-cartoons-inspire-css/16-yogi-bear.png)

The Yogi Bear Show, copyright Warner Bros. Entertainment Inc. Author’s recreation. ([<VPIcon icon="fas fa-file-image"/>Large preview](https://files.smashing.media/articles/smashing-animations-part-1-classic-cartoons-inspire-css/16-yogi-bear.png))

> [<VPIcon icon="fa-brands fa-x-twitter"/>SVG delivers incredible performance and also offers fantastic flexibility when animating elements. The ability to embed one SVG inside another and to manipulate groups and other elements using CSS makes it ideal for animations.](https://twitter.com/share?text=%0aSVG%20delivers%20incredible%20performance%20and%20also%20offers%20fantastic%20flexibility%20when%20animating%20elements.%20The%20ability%20to%20embed%20one%20SVG%20inside%20another%20and%20to%20manipulate%20groups%20and%20other%20elements%20using%20CSS%20makes%20it%20ideal%20for%20animations.%0a&url=https://smashingmagazine.com%2f2025%2f05%2fsmashing-animations-part-1-classic-cartoons-inspire-css%2f)

I replicated how Hanna-Barbera made Ranger Smith and other characters’ mouths move by first including a group that contains the ranger’s body and head, which remain static throughout. Then, I added six more groups, each containing one frame of his mouth moving:

```xml
<svg>
  <!-- static elements -->
  <g>...</g>

  <!-- animation frames -->
  <g class="frame-1">...</g>
  <g class="frame-2">...</g>
  <g class="frame-3">...</g>
  <g class="frame-4">...</g>
  <g class="frame-5">...</g>
  <g class="frame-6">...</g>
</svg>
```

I used CSS custom properties to define the speed at which characters’ mouths move and how many frames are in the animation:

```css
:root {
  --animation-duration: 1s;
  --frame-count: 6;
}
```

Then, I applied a keyframe animation to show and hide each frame:

```css
@keyframes ranger-talking {
  0% { visibility: visible; }
  16.67% { visibility: hidden; }
  100% { visibility: hidden; }
}

[class*="frame"] {
  visibility: hidden;
  animation: ranger-talking var(--animation-duration) infinite;
}
```

Before finally setting a delay, which makes each frame visible at the correct time:

```css
.frame-1 {
  animation-delay: calc(var(--animation-duration) * 0 / var(--frame-count));
}

/* ... */

.frame-6 {
  animation-delay: calc(var(--animation-duration) * 5 / var(--frame-count));
}
```

<CodePen
  user="smashingmag"
  slug-hash="QwwxgJE"
  title="Ranger Smith talking [forked]"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Working With Mike Worth

When Mike Worth and I sat down to discuss working together, we both understood that there would be neither the budget nor the time to create a short animated cartoon for his website. We also knew that video would be the correct format for a fully animated production, but we were keen to explore how CSS could bring what would’ve otherwise been static images to life. So, this begs the question of *why* and *when* to use CSS animations.

### Ambient Animations

> Subtle ambient animations contribute to a website’s atmosphere and help with storytelling without distracting from its content or functionality.

For Mike Worth’s about-page illustration, I shone shafts of light onto a stone tablet to add depth to an otherwise flat image. Inside my SVG, I added a `path` for the light and reduced its `opacity` to `.25`:

```xml
<svg>
  <!-- ... -->
  <path class="light-shaft" fill="#F1DCA9" opacity=".25" d=""/>
</svg>
```

I then defined an SVG filter to blur the edges of my light shafts and linked it to my `path`:

```xml
<defs>
  <filter id="light-shaft" width="100%" height="100%" x="0" y="0" filterUnits="objectBoundingBox">
  <feGaussianBlur in="SourceGraphic" stdDeviation="20"/>
  </filter>
</defs>

<svg>
  <!-- ... -->
  <path class="light-shaft" filter="url(#light-shaft)" … />
</svg>
```

Finally, I added a subtle ambient animation that rotates the light shafts and creates a more natural feel:

```css
@keyframes shaft-rotate {
  0% { rotate: 2deg; }
  50% { rotate: -2deg; }
  100% { rotate: 2deg; }
}

.light-shaft {
  animation: shaft-rotate 20s infinite;
  transform-origin: 100% 0;
}
```

<CodePen
  user="smashingmag"
  slug-hash="bNNKROE"
  title="Mike Worth’s about page animation [forked]"
  :default-tab="['css','result']"
  :theme="dark"/>

Can you throw more light on Mike’s navigation?

<CodePen
  user="smashingmag"
  slug-hash="ZYYRyVJ"
  title="Light up Mike Worth about page [forked]"
  :default-tab="['css','result']"
  :theme="dark"/>

### Animations On Interactions

> In the same way that a `:hover` pseudo-class provides valuable visual feedback when someone interacts with an element, CSS animations can create a deeper connection between people and a design.

I included an Easter egg interaction on Mike Worth’s review page illustration. The big red button turns the desk lamp on and off, much to the consternation of Mike’s orangutan mascot, who’s trying to study his map. To implement this, I applied a `data-` attribute to the SVG illustration:

```xml
<svg … data-lights="lights-on">
  <!-- ... -->
</svg>
```

And added a red button for any curious visitor to press:

```xml
<a href="javascript:void(0);" id="light-switch" title="Lights on/off">
  <path fill="#0a0908" d="..."/>
  <ellipse fill="#9c1621" … />
  <path fill="#fff" d="..."/>
</a>
```

When someone presses that red button, the light goes out, which is made possible by changing the value of the SVG’s `data-` attribute from `lights-on` to `lights-off`.

Several elements within the illustration light up when the desk lamp is on. To make this happen, I applied a class value to those specific items:

```xml
<path class="lamp-glow" />
```

And used the data-attribute value to toggle the glow on and off when someone presses the lamp’s button:

```css
[data-lights="lights-on"] .lamp-glow {
  opacity: 1;
  transition: opacity .25s linear;
}

[data-lights="lights-off"] .lamp-glow {
  opacity: .25;
  transition: opacity .25s linear;
}
```

When someone turns the lamp on, it flickers at what appears to be random intervals. I first applied a class value to the flickering elements:

```xml
<path class="lamp-flicker" />
```

Then, I hid them when the lamp was turned off:

```css
[data-lights="lights-off"] .lamp-flicker {
  visibility: hidden;
}
```

Finally, I created a keyframe animation that flickers the lamp light’s `opacity` at seemingly random intervals:

```css
@keyframes lamp-flicker {
  0%, 19.9%, 22%, 62.9%, 64%, 64.9%, 70%, 100% { opacity: 1; }
  20%, 21.9%, 63%, 63.9%, 65%, 69.9% { opacity: .5; }
}

[data-lights="lights-on"] .lamp-flicker {
  animation: lamp-flicker 3s 3s linear infinite;
}
```

Animations can also tempt people to venture deeper into a design, so I made the crystal skull on the desk vibrate to hint at something more to discover:

```html
<a href="/easter-egg">
  <g id="crystal-skull">...</g>
</a>
```

```css
@keyframes crystal-skull-vibrate {
  0% { translate: 0 0; }
  20% { translate: -2px 2px; }
  40% { translate: -2px -2px; }
  60% { translate: 2px 2px; }
  80% { translate: 2px -2px; }
  100% { translate: 0 0; }
}

#crystal-skull:hover {
  animation: crystal-skull-vibrate .5s ease 0s infinite normal forwards;
}
```

<CodePen
  user="smashingmag"
  slug-hash="YPPvQBg"
  title="Mike Worth’s review page animation [forked]"
  :default-tab="['css','result']"
  :theme="dark"/>

### Animations Tell Stories

> When carefully considered, animations can reflect a brand’s identity and help tell its story.

Mike Worth’s brand is high-energy — just like his personality — and the story he tells about his work as a video game composer is engaging and playful. Mike wanted every interaction with his website to bring his personality to the screen.

Should someone get lost along their journey, they’ll end up on Mike’s 404 page, where his hero has a sinking feeling. While Mike’s orangutan adventurer slips deeper and deeper into the quicksand, animated bubbles rise:

```xml
<g>
  <circle class="four-oh-dear-bubble" ... />
  <circle class="four-oh-dear-bubble" ... />
  <circle class="four-oh-dear-bubble" ... />
  <!-- ... -->
</g>
```

```css :collapsed-liens
@keyframes four-oh-dear-bubbles {
  0% { 
    animation-timing-function: ease-in; 
    opacity: 1; 
    transform: translateY(45px);
  }
  24% { 
    opacity: 1; 
  }
  40% { 
    animation-timing-function: ease-in; 
    translate: 0 24px;
  }
  65% { 
    animation-timing-function: ease-in;
    translate: 0 12px;
  }
  82% { 
    animation-timing-function: ease-in;
    translate: 0 6px;
  }
  93% { 
    animation-timing-function: ease-in;
    translate: 0 4px;
  }
  25%, 55%, 75%, 87% { 
    animation-timing-function: ease-out;
    translate: 0 0;
  }
  100% { 
    animation-timing-function: ease-out;
    opacity: 1; 
    translate: 0 0;
  }
}

.four-oh-dear-bubble {
  animation: four-oh-dear-bubbles 2s ease 0s infinite alternate forwards; }
```

<CodePen
  user="smashingmag"
  slug-hash="ZYYRyPX"
  title="Mike Worth’s 404 page animation [forked]"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Bringing It All To Life

Just as the animators at Hanna-Barbera turned technical limitations into their signature style, CSS animations enable web professionals to craft characterful experiences. By layering elements, looping frames, and applying subtle movement, you can inject personality into a design while improving someone’s experience.

![The Yogi Bear Show, copyright Warner Bros. Entertainment Inc. ([<VPIcon icon="fas fa-file-image"/>Large preview](https://files.smashing.media/articles/smashing-animations-part-1-classic-cartoons-inspire-css/17-yogi-bear.png))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/smashing-animations-part-1-classic-cartoons-inspire-css/17-yogi-bear.png)

In my design for Mike Worth’s website, **animation isn’t just for decoration; it tells a compelling story about him and his work**. Every movement reflects his brand identity and makes his website an extension of his creative world.

> [Think beyond movement the next time you reach for a CSS animation. Consider emotions, identity, and mood, too. After all, a well-considered animation can do more than catch someone’s eye. It can capture their imagination.](https://twitter.com/share?text=%0aThink%20beyond%20movement%20the%20next%20time%20you%20reach%20for%20a%20CSS%20animation.%20Consider%20emotions,%20identity,%20and%20mood,%20too.%20After%20all,%20a%20well-considered%20animation%20can%20do%20more%20than%20catch%20someone%e2%80%99s%20eye.%20It%20can%20capture%20their%20imagination.%0a&url=https://smashingmagazine.com%2f2025%2f05%2fsmashing-animations-part-1-classic-cartoons-inspire-css%2f)

![[<VPIcon icon="fas fa-file-image"/>Large preview](https://files.smashing.media/articles/smashing-animations-part-1-classic-cartoons-inspire-css/18-the-end-painting.png)](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/smashing-animations-part-1-classic-cartoons-inspire-css/18-the-end-painting.png)

Mike Worth’s website will launch in June 2025, but you can [<VPIcon icon="fa-brands fa-codepen"/>see examples from this article on CodePen](https://codepen.io/collection/YwMKPb) now.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Smashing Animations Part 1: How Classic Cartoons Inspire Modern CSS",
  "desc": "Have you ever thought about how the limitations of early cartoon animations might relate to web design today? From looping backgrounds to minimal frame changes, these retro animation techniques have surprising parallels to modern CSS. In this article, pioneering author and web designer [Andy Clarke](https://stuffandnonsense.co.uk) shows how he applied these principles to Emmy-winning composer Mike Worth’s new website, using CSS to craft engaging and fun animations that bring his world to life.",
  "link": "https://chanhi2000.github.io/bookshelf/smashingmagazine.com/smashing-animations-part-1-classic-cartoons-inspire-css.html",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```
