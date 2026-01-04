---
lang: en-US
title: "Scrollytelling on Steroids With Scroll-State Queries"
description: "Article(s) > Scrollytelling on Steroids With Scroll-State Queries"
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
      content: "Article(s) > Scrollytelling on Steroids With Scroll-State Queries"
    - property: og:description
      content: "Scrollytelling on Steroids With Scroll-State Queries"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/scrollytelling-on-steroids-with-scroll-state-queries.html
prev: /programming/css/articles/README.md
date: 2025-12-02
isOriginal: false
author:
  - name: Lee Meyer
    url : https://css-tricks.com/author/leemeyer/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/11/taylor-flowe-aXeVH4FcS1k-unsplash-scaled.jpg
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
  name="Scrollytelling on Steroids With Scroll-State Queries"
  desc="Unconvinced of the value of scrollytelling? Alright, skeptic, let’s first warm up with some common use cases for scroll-based styling."
  url="https://css-tricks.com/scrollytelling-on-steroids-with-scroll-state-queries"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/11/taylor-flowe-aXeVH4FcS1k-unsplash-scaled.jpg"/>

::: info [<VPIcon icon="fa-brands fa-wiki-w"/>Photopia](https://en.wikipedia.org/wiki/Photopia) by [<VPIcon icon="fa-brands fa-wikipedia-w"/>Adam Cadre](https://en.wikipedia.org/wiki/Adam_Cadre)

> Read you a story? What fun would that be? I’ve got a better idea: let’s tell a story together.

:::

Do you think of scrolling as a more modern way of reading than turning pages in a book? Nope, the concept originated in ancient Egypt, and it’s older than what we now classify as books. It’s based on how our ancestors read [<VPIcon icon="fa-brands fa-wikipedia-w"/>ancient physical scrolls](https://en.wikipedia.org/wiki/Scroll), the earliest form of editable text in the history of writing. I am Jewish, so I remember my earliest non-digital scrolling experience was horizontally scrolling the [<VPIcon icon="fa-brands fa-wikipedia-w"/>Torah](https://en.wikipedia.org/wiki/Torah), which can be more [<VPIcon icon="fas fa-globe"/>immersive](https://reconstructingjudaism.org/article/holding-torah-in-our-hands/) than traditionally scrolling a webpage. The physical actions to navigate texts have captured the imagination of many a storyteller, leading authors to [<VPIcon icon="fa-brands fa-wikipedia-w"/>gamify the act of turning pages](https://en.wikipedia.org/wiki/Choose_Your_Own_Adventure) and to create stories that incorporate the [<VPIcon icon="fas fa-globe"/>physical actions of opening a book and turning pages](https://donotopenthisbook.com/) as part of the [<VPIcon icon="fa-brands fa-wikipedia-w"/>narrative](https://en.wikipedia.org/wiki/If_on_a_winter%27s_night_a_traveler). However, innovative experiences using non-standard scrolling haven’t been explored as thoroughly.

![Photo by [<VPIcon icon="iconfont icon-unsplash"/>Taylor Flowe](https://unsplash.com/@taypaigey) on [<VPIcon icon="iconfont icon-unsplash"/>Unsplash](https://unsplash.com/photos/white-and-brown-wooden-table-aXeVH4FcS1k)](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/11/taylor-flowe-aXeVH4FcS1k-unsplash-scaled.jpg?resize=2560%2C1707&ssl=1)

I can sympathize with [those who (<VPIcon icon="fa-brands fa-reddit"/>`webdev`)](https://reddit.com/r/webdev/comments/1drlxdv/why_the_fuck_do_all_the_fancy_websites_feel_the/) dismiss [<VPIcon icon="fas fa-globe"/>scrollytelling](https://en.wiktionary.org/wiki/scrollytelling) as a gimmick: it can be an annoyance if it’s just for the sake of cleverness, but my favorite examples I’ve seen over the years tell [<VPIcon icon="fas fa-globe"/>stories we couldn’t otherwise](https://designrush.com/best-designs/websites/the-walking-dead-zombiefied). There’s something uniquely immersive about stories driven by a mechanic that has lived in our species’ collective muscle memory since ancient days.

Still unconvinced of the value of scrollytelling? Alright, hypothetical annoying skeptic, let’s first warm up with some common use cases for scroll-based styling.

---

## Popular scroll-based designs we can simplify with modern CSS

It’s awesome that Chrome has [**solid support**](/css-tricks.com/unleash-the-power-of-scroll-driven-animations.md) for native scroll-driven animations without requiring JavaScript, and we see that both [<VPIcon icon="fa-brands fa-safari"/>Safari](https://developer.apple.com/documentation/safari-technology-preview-release-notes/stp-release-215#New-Features) and [<VPIcon icon="fa-brands fa-firefox" />Firefox](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Experimental_features#scroll-driven_animations) are actively working on support for the new scroll-driven standards. These new features facilitate optimized, smooth scroll-driven animations. The support via pure CSS syntax makes scroll-driven animation a more approachable option for designers who may be more comfortable with CSS than with the [<VPIcon icon="fa-brands fa-chrome"/>equivalent JavaScript](https://developer.chrome.com/blog/scroll-animation-performance-case-study#new_scroll-driven_animations_javascript_api_versus_classic_javascript).

Indeed, even though I am a full-stack developer who is [<VPIcon icon="fas fa-globe"/>supposed to know everything](https://andyshora.com/full-stack-developers.html), I found having scroll-driven animation built into the browser and available with a few lines of CSS gets my [**creativity flowing**](/css-tricks.com/slide-through-unlimited-dimensions-with-css-scroll-timelines.md), inspiring me to [**experiment**](/css-tricks.com/web-slinger-css-like-wow-js-but-with-css-y-scroll-animations.md) more than if I had to go through hoops of a proprietary [<VPIcon icon="fas fa-globe"/>library](https://simpleparallax.com/) and writing JavaScript, which in the past might include messing with [intersection observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) and fiddly code.

If animation timelines weren’t enough, Chrome has now introduced support for [<VPIcon icon="fa-brands fa-firefox" />CSS carousel](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_overflow/CSS_carousels), [`scroll-initial-target` (<VPIcon icon="iconfont icon-github"/>`DavMila/explainer-scroll-initial-target`)](https://github.com/DavMila/explainer-scroll-initial-target), and [<VPIcon icon="fa-brands fa-chrome"/>`scroll-state` queries](https://developer.chrome.com/blog/css-scroll-state-queries)—all of which provide opportunities to control scrolling behaviors in CSS and style all the things based on scrolling.

In my opinion, `scroll-state` is more of an evolutionary than revolutionary addition to the growing range of scroll-related CSS features. Animation timelines are so powerful that they can be hacked to achieve many of the same effects we can implement with `scroll-state` queries. Therefore, think of `scroll-state` as a highly convenient, simplified subset of what we can do in more verbose hacky ways with animation timelines and/or view timelines.

Some examples of effects `scroll-state` simplifies are:

1. Before `scroll-state` queries existed, you could hack [<VPIcon icon="fa-brands fa-firefox" />view progress timelines](https://developer.mozilla.org/en-US/docs/Web/CSS/view-timeline) to create scroll-triggered animations, but we now have [<VPIcon icon="fa-brands fa-chrome"/>snapped](https://developer.chrome.com/blog/css-scroll-state-queries#snapped) [<VPIcon icon="fa-brands fa-chrome"/>`scroll-state` queries](https://developer.chrome.com/blog/css-scroll-state-queries#snapped) to achieve [<VPIcon icon="fa-brands fa-chrome"/>similar effects](https://developer.chrome.com/blog/css-scroll-state-queries#animating_in_slide_elements).
2. Before `snapped` queries existed, Bramus demonstrated a hack [**to simulate a hypothetical `:snapped`**](/bram.us/faking-a-snapped-selector-with-scroll-driven-animations.md) selector using scroll-driven animations.
3. Before [<VPIcon icon="fa-brands fa-firefox" />`scrollable` queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_conditional_rules/Container_scroll-state_queries#using_scrollable_queries) existed, Bramus [**showed how we could do similar things**](/bram.us/solved-by-css-scroll-driven-animations-detect-if-an-element-can-scroll-or-not.md) using `scroll-timeline.`

Take a moment to appreciate that Bramus is from the future, and to reflect on how `scroll-state` can simplify common UI patterns, such as [<VPIcon icon="iconfont icon-css-tricks"/>scroll shadows](https://css-tricks.com/books/greatest-css-tricks/scroll-shadows/), which Chris Coyier said might be his “favorite CSS trick of all time.” This year, Kevin Hamer [**showed**](/css-tricks.com/modern-scroll-shadows-using-scroll-driven-animations.md) how `scroll-timeline` can achieve scroll shadows in CSS with fewer tricks. It’s excellent, but the only thing better than clever CSS tricks is that scroll shadows no longer require a trick at all. Hacking CSS is fun, but there is something to be said for that warm fuzzy feeling that CSS was made just for your use case. This [<VPIcon icon="fa-brands fa-chrome"/>demo](https://developer.chrome.com/blog/css-scroll-state-queries#indicate_scroll_with_shadows) from the Chrome blog shows how scroll shadows and other visual affordances are easy to implement with `scroll-state`.

But the popularity of Kevin’s article suggests that normal, sane people will gravitate to practical use cases for the new CSS scroll-based features. In fact, a normal and sane author might end the article here. Unfortunately, as I revealed in a [**previous article**](/css-tricks.com/worlds-collide-keyframe-collision-detection-using-style-queries.md), I have been cursed by a spooky shopkeeper who sells CSS tricks at a haunted carnival, so I now roam the earth attempting the unthinkable with pure CSS.

::: important Decision time

> As you reach this paragraph in the article, you realize that when you scroll, it fast-forwards reality. Therefore, after we end the discussion of scroll shadows, the shadows swallow the world outside your window, except for two glowing words hovering near your house: CSS TRICKS. You wander out through your front door and meet a street vendor standing beneath the neon sign. The letters give her multiple shadows as if she has thrown them down like discarded masks, undecided about which shade of night to wear. On the table before her lies a weathered scroll. It unrolls on its own, whispering misremembered fragments from a [forgotten CSS-Tricks article](/css-tricks.com/worlds-collide-keyframe-collision-detection-using-style-queries.md): “A scroll trigger is a point of no return, like a trap sprung once the hapless user scrolls past a certain point.”
>
> The neon flickers like a glitch, revealing another of the shopkeeper’s faces: a fire demon doppleganger of yourself who is the villain of the CodePen we’ll descend into if you scroll further.
>
> “Will you continue?” the fire demon hisses. “Will you scroll deeper into the madness at the far edges of CSS?

:::

---

## Non-linear scrollytelling

Evidently, you are game to play with fire, so check out the pure CSS experiment below, which demonstrates a technique I call “nonlinear scrollytelling,” in which the user controls the outcome of a visual story by deciding which direction to scroll next. It’s a scrolling *Choose Your Own Adventure*. But if your browser is less adventurous than you are, watch the screen recording instead. The experiment will only work on Chromium-based browsers for now, because it relies on `scroll-state`, `animation-timeline`, `scroll-initial-target` and [<VPIcon icon="fa-brands fa-chrome"/>CSS inline conditionals](https://developer.chrome.com/blog/if-article).

<VidStack src="youtube/cseY_nbKHaw" />

<CodePen
  user="leemeyer"
  slug-hash="zxrmzQw"
  title="Nonlinear Scrollytelling"
  :default-tab="['css','result']"
  :theme="dark"/>

I haven’t seen this technique in the wild, so let me know in the comments if you have seen other examples of the idea. For now, I’ll claim credit for pioneering the mechanics — but I give credit to the talented [<VPIcon icon="fas fa-globe"/>Dead Revolver](https://deadrevolver.thousand-pixel.com/) for creating the awesome, affordable [<VPIcon icon="fas fa-globe"/>pixel art bundle](https://itch.io/s/130900/platformer-bundle) I used for most of the graphics. The animated lightsaber icon was ripped from this cool [CodePen (<VPIcon icon="fa-brands fa-codepen"/>`andy1729`)](https://codepen.io/andy1729/pen/GZBBZX) by Ujjawal Anand, and I used ChatGPT to draw the climbable building. To make the bad guy, I reused the same spritesheet from the player character, but I implemented the [<VPIcon icon="fas fa-globe"/>Mirror Match trope](https://tvtropes.org/pmwiki/pmwiki.php/Main/MirrorMatch) from Mortal Kombat, using color shifting to create a “new” character who I [<VPIcon icon="fas fa-globe"/>evilized](https://miraculousladybug.fandom.com/wiki/Kamiko) by casting the following spell in CSS:

```css
.evil-twin {
  transform: rotateY(180deg);
  filter: invert(24%) sepia(99%) saturate(5431%) hue-rotate(354deg) brightness(93%) contrast(122%);
  background-image: url(/* same spritesheet as the player character */);
}
```

It’s cool that CSS helps recycle existing assets for those like me who are drawing-challenged. I also wanted to make sure that well-supported CSS features like `transform` and `filter` didn’t feel left out of the fun in an experiment filled with newer, emergent CSS features.

But if you’ve come this far, you’re probably eager to understand the scroll-related CSS logic.

---

## Our story begins in the middle of the end

You may have noticed our experiment earns extra crazy points as soon as it loads, by starting at the middle of the bottom of the page so that the player can choose whether to scroll left to run away, or scroll right to walk unarmed towards the bad guy if the player wants to compete with the madness level of the game’s creator.

[This explainer for the emergent `scroll-initial-target` property (<VPIcon icon="iconfont icon-github"/>`DavMila/explainer-scroll-initial-target`)](https://github.com/DavMila/explainer-scroll-initial-target) shows that controlling scroll position on load was previously possible by hacking CSS animations and the [<VPIcon icon="iconfont icon-css-tricks"/>`scroll-snap-align`](https://css-tricks.com/almanac/properties/s/scroll-snap-align/) property. However, similar to what we discussed above about the value proposition of `scroll-state`, a feature like `scroll-initial-target` is exciting because it simplifies something that previously required verbose, fragile hacks, which can now be replaced with more succinct and reliable CSS:

```css
.spawn-point {
  position: absolute;
  left: 400vw;
  scroll-initial-target: nearest;
}
```

As cool as this is, we should only subvert expectations for how a webpage behaves if we have a sufficient reason. For instance, CSS like the above could have simplified [**my pure CSS swiper experiment**](/css-tricks.com/web-slinger-css-across-the-swiper-verse.md), but Chrome [<VPIcon icon="fas fa-globe"/>only added `scroll-initial-target` in February 2025](https://webstatus.dev/features/scroll-initial-target), the month after I wrote that article. Using `scroll-initial-target` would be justified in the swiper scenario, since the crux of that design was that the user started in the middle with the option to swipe left or right.

A similar dilemma is central to the opening of our scrollytelling narrative. The disorienting experience of finding ourselves in an unexpected scroll position with only the option to scroll horizontally heightens the drama, as the user has to adapt to an unusual way of interacting while the bad guy rapidly approaches. I’m feeling generous, so let’s give the user 20 seconds to figure it out, but you can experiment with different timeframes by editing the `--chase-time` custom property at the top of the source file.

We’re going to create a CSS implementation of the [slasher movie trope in which a walking aggressor can’t be outrun (<VPIcon icon="fa-brands fa-reddit"/>`AskScienceFiction`)](https://reddit.com/r/AskScienceFiction/comments/1cwinkn/general_horror_how_do_slow_walking_stalking/). We do that by marking the bad guy as `position: fixed`, then adding an infinite walk-cycle animation and another animation that moves him relentlessly from right to left across the screen. Meanwhile, we give the player character a running animation and position him based on a horizontal animation timeline. He can run, but he can’t hide.

```css :collapsed-lines
body {
  .idle {
    animation: idleAnim 1s steps(6) infinite;
  }

    /* --scroll-direction is populated using the clever property Bramus demonstrates 
  here https://www.bram.us/2023/10/23/css-scroll-detection */

  .sprite {
    transform: rotateY(calc(1deg * min(0, var(--scroll-direction) * 180)));
  }

  @container not style(--scroll-direction: 0) {
    .sprite {
      animation: runAnim 0.8s steps(8) infinite;
    }
  }

  .evil-twin-wrapper {
    position: fixed;
    bottom: 5px;
    z-index: 1000;
    margin-left: var(--enemy-x-offset);
    /* we'll explain later how we detect the way the game should end */
    --follow: if(style(--game-state: ending): paused; else: running); 
    animation: var(--chase-time) forwards linear evil-twin-chase var(--follow);
  }
}
```

He can’t hide, but we’ll next introduce a second scroll-based decision point using `scroll-state` to detect when our hero has been backed into a corner and see if we can help him.

---

## How `scroll-state` could save your life

As our hero runs away to the left, the buildings and sky in the cityscape background show off a few layers of [**parallax scrolling**](/css-tricks.com/bringing-back-parallax-with-scroll-driven-css-animations.md) by assigning each layer an anonymous animation timeline and an animation that moves each layer faster than the layer behind it.

```css :collapsed-lines
.sky, .buildings-back, .buildings-mid, .sky-vertical, .buildings-back-vertical, .buildings-mid-vertical {
  position: fixed;
  top: 0;
  left: 0;
  width: 800%;
  height: max(100vh, 300px);
  background-size: auto max(100vh, 300px);
  background-repeat: repeat-x;
  animation-timing-function: linear;
  animation-timeline: scroll(x);
}

/*...repetitively assign the corresponding animations to each layer...*/

@keyframes move-sky {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-2.5%);
  }
}

@keyframes move-back {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-6.25%);
  }
}

@keyframes move-mid {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-12.5%);
  }
}
```

This usage of animation timelines is what they were designed for, which is why the code is straightforward. If we had to, we could push the boundaries and use the same technique to set a Houdini variable in an animation timeline to detect when the player reaches the left corner of the screen — but thanks to `scroll-state` queries, we have a cleaner option.

```css
@container scroll-state((scrollable: left)) {
  body {
    overflow-y: hidden;
  }
}

@container scroll-state((scrollable: bottom)) {
  body {
    width: 0;
  }
}
```

That’s all we need to toggle vertical and horizontal scrolling based on position! This is the basis that allows the player to escape from being slashed by the bad guy. Now we can scroll up and down to climb the ladder only when the player reaches the left corner where the ladder is, and disallow horizontal scrolling while he is climbing.

I could have made the game detect reaching the left of the screen using animation timelines, but that would involve [<VPIcon icon="fas fa-globe"/>custom property toggles](https://ryanmulligan.dev/blog/scroll-triggered-animations-style-queries/), which are more verbose and error-prone.

When the player climbs to the top of the ladder to collect the lightsaber, we do need one toggle property so the game will remember we have collected the weapon, but it’s simpler than if we had used animation timelines.

```css :collapsed-lines
@keyframes collect-saber {
  from {
    --player-has-saber: false;
  }
  to {
    --player-has-saber: true;
  }
}

body {
  animation: .25s forwards var(--saber-collection-state, paused) collect-saber;
}

@container scroll-state(not (scrollable: top)) {
  body {
    --saber-collection-state: running;
  }
}


@container style(--player-has-saber: true) {
  .sprite {
    background-image: url(/*combat spritesheet*/);
  }

  .lightsaber {
    visibility: hidden;
  }
}
```

Contrariwise, the animation cycle while the sprite is climbing the ladder is a job for `animation-timeline` used to assign an anonymous vertical timeline to the player sprite. This is applied conditionally when our `scroll-state` query detects that the player is between the bottom and the top of the ladder. It’s a nice example of how animation timelines and `scroll-state` queries are good at different things, and work well together.

```css
@container scroll-state((scrollable: top) and ((scrollable: bottom))) {
  .player-wrapper {
    .sprite {
      animation: climbAnim 1s steps(8);
      animation-timeline: scroll(root y);
      animation-iteration-count: 10;
    }
  }
}
```

---

## Finish him with fatal conditionality

We apply the techniques I discovered in my [**CSS collision detection article**](/css-tricks.com/worlds-collide-keyframe-collision-detection-using-style-queries.md) to detect when the two characters meet for their showdown. At that point, we want to disable scrolling entirely and display the appropriate non-interactive endgame [<VPIcon icon="fas fa-globe"/>cutscene](https://tvtropes.org/pmwiki/pmwiki.php/Main/Cutscene) depending on the choices our user made. Notice that if we detect the good guy won, he only strikes with the sword once, whereas the bad guy will continue to slash infinitely, even after the good guy is dead. What can I say — I was working on this CodePen around Halloween.

In the past, I wrote an [**article questioning the need for inline CSS conditionals**](/css-tricks.com/the-what-if-machine-bringing-the-iffy-future-of-css-into-the-present.md) — but now that they’ve [**landed in Chrome**](/css-tricks.com/lightly-poking-at-the-css-if-function-in-chrome-137.md), I find them addictive, especially when creating a heavily conditional CSS experiment like nonlinear scrollytelling. I like to imagine that the new `if()` function stands for [<VPIcon icon="fa-brands fa-wikipedia-w"/>Interactive Fiction](https://en.wikipedia.org/wiki/Interactive_fiction). Below is how I detect the endgame conditions and choose which animations to play in the final cutscene. I am not sure of the most readable way to space out `if()` code in CSS, so feel free to start holy wars on that topic in the comments.

```css :collapsed-lines
body {
  --min-of-player-and-enemy-x: min(var(--player-x-offset), var(--enemy-x-offset) - 10px);
  --max-of-player-and-enemy-y: max(var(--player-y-offset, 5px));
  --game-state:
    if(
      style(--min-of-player-and-enemy-x: calc(var(--enemy-x-offset) - 10px)) and style(--max-of-player-and-enemy-y: 5px): 
        ending; 
      else: 
        playing
    );
  overflow:
    if(
      style(--game-state: ending): 
        hidden; 
      else: 
        scroll
    );
}

@container style(--player-has-saber: true) and style(--game-state: ending) {
  .player-wrapper {
    .sprite {
      animation: attack 0.7s steps(4) forwards;
    }

  .speech-bubble {
    animation: show-endgame-message 3s linear 1s forwards;

    &::before {
      content: 'Refresh the page to play again';
    }
  }
    
  .evil-twin-wrapper {
    .evil-twin {
      evil-twin-die 0.8s steps(4) .7s forwards;
    }
  }
}

@container style(--player-has-saber: false) and style(--game-state: ending) {
  .player-wrapper {
    .sprite {
      animation: player-die .8s steps(6) .7s forwards;
    }
  }

  .evil-twin-wrapper {
    .speech-bubble {
      animation: show-endgame-message 3s linear 1s forwards;
      display: block;

      &::before {
        content: 'Baha! Refresh the page to fight me again';
      }
      .evil-twin {
        attack 0.8s steps(4) infinite;
      }
    }
  }
}
```

---

## Should we non-linearly scrollytell all the things?

I am glad you asked, hypothetical troll who wrote that heading. Of course, even putting the technical challenges aside, you know that this won’t always be the right approach for a website. As Andy Clarke recently pointed out here on CSS-Tricks, [**design is storytelling**](/css-tricks.com/getting-creative-with-small-screens.md). The needs of every story are different, but I found my little pixel art guy’s [<VPIcon icon="fas fa-globe"/>emotional story arc](https://nofilmschool.com/story-arcs) requires non-linear scrollytelling.

I think this particular example isn’t a gimmick and is a legitimate form of web design expression. The demo tells a simple story, but my wife pointed out that a personal situation I am dealing with has strong analogies to the pixel guy’s journey. He finds himself in a situation where the only sane option is to allow himself to be backed into a corner, but when all seems lost, he finds a way to rise above the adversity. Then he learns that the moral high ground is its own form of trap, so he must put his own spin on the [<VPIcon icon="fas fa-globe"/>wisdom of Sun Tzu](https://goodreads.com/quotes/428786-to-know-your-enemy-you-must-become-your-enemy) that “to know your enemy, you must become your enemy.” He apparently lowers himself back to the aggressor’s level — but he only does what is necessary. The bitterwseet moral is that survival sometimes requires taking a leaf out of the [<VPIcon icon="fas fa-globe"/>enemy’s book](https://goodreads.com/book/show/13539039-the-wisdom-of-psychopaths) — but the user has been guiding the hero through this story, which helps the audience to understand that the good guy’s motivations are not comparable to those of his adversary. While testing the CodePen, I found the story moving and even suspenseful in an 8-bit nostalgia kind of way, even if some of that suspense was my uncertainty about whether I would get it working.

From a technical point of view, I think building a full-scale website based on this idea would require a mix of CSS and JavaScript, because storing state in CSS currently requires hacks (like [<VPIcon icon="fas fa-globe"/>this one](https://odland.dev/2023/06/18/scroll-persisted-state.html), which is cool but also highly experimental). The paused animation approach to remember that the player collected the sword can glitch due to timer drift, so there is a small chance the dude will start the game with the lightsaber already in his hand! If you resize the window during the endgame, you can glitch the game, and then things get really weird. By contrast, something like the [<VPIcon icon="fa-brands fa-firefox" />scroll snap events](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll_snap/Using_scroll_snap_events) — already supported in Chrome — would allow us to store state and even play sounds using a script that fires based on scroll interactions.

It seems like we already have enough in CSS to build a site like [<VPIcon icon="fas fa-globe"/>this one](https://prevint.pt/en/), which uses horizontal multimedia scrollytelling to raise awareness that interpersonal violence exists on a continuum and tends to escalate if the target is unable to recognize the early warning signs. That’s a worthy topic I [**unfortunately have some experience with**](/css-tricks.com/applying-the-web-dev-mindset-to-dealing-with-life-challenges.md), and the usage of horizontal scrollytelling to address it demonstrates that a wide variety of stories can be told engagingly through scrollytelling.

::: info <VPIcon icon="fa-brands fa-wikipedia-w"/>Jorge Luis Borges

> I leave to the various futures (not to all) my garden of forking paths.

<SiteInfo
  name="The Garden of Forking Paths - Wikipedia"
  desc="The Garden of Forking Paths (original Spanish title: El jardín de senderos que se bifurcan) is a 1941 short story by Argentine writer and poet Jorge Luis Borges. It is the title story in the collection El jardín de senderos que se bifurcan (1941), wh..."
  url="https://en.wikipedia.org/wiki/The_Garden_of_Forking_Paths/"
  logo="/static/favicon/wikipedia.ico"
  preview="https://upload.wikimedia.org/wikipedia/en/c/c9/ElJard%C3%ADnDeSenderosQueSeBifurcan.jpg"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Scrollytelling on Steroids With Scroll-State Queries",
  "desc": "Unconvinced of the value of scrollytelling? Alright, skeptic, let’s first warm up with some common use cases for scroll-based styling.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/scrollytelling-on-steroids-with-scroll-state-queries.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
