---
lang: en-US
title: "Let’s Use the Emergent CSS random() Function in all the Browsers"
description: "Article(s) > Let’s Use the Emergent CSS random() Function in all the Browsers"
icon: fa-brands fa-css3-alt
category:
  - Node.js
  - CSS
  - Article(s)
tag:
  - blog
  - css-tricks.com
  - node
  - nodejs
  - node-js
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Let’s Use the Emergent CSS random() Function in all the Browsers"
    - property: og:description
      content: "Let’s Use the Emergent CSS random() Function in all the Browsers"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/css-random-function-polyfill.html
prev: /programming/css/articles/README.md
date: 2026-08-31
isOriginal: false
author:
  - name: Lee Meyer
    url: https://css-tricks.com/author/leemeyer/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/08/random-stars-shuffle.webp
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Node.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-node/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

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
  name="Let’s Use the Emergent CSS random() Function in all the Browsers"
  desc="The journey to create a polyfill for the upcoming CSS random() function that works in all browsers."
  url="https://css-tricks.com/css-random-function-polyfill"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/08/random-stars-shuffle.webp"/>

The creator of the TV show *[<VPIcon icon="fas fa-globe"/>The Good Place](https://theguardian.com/tv-and-radio/2018/jan/30/the-good-place-how-a-sitcom-made-philosophy-seem-cool)* wrote [<VPIcon icon="fa-brands fa-wikipedia-w"/>a tie-in book about moral philosophy](https://en.wikipedia.org/wiki/How_to_Be_Perfect) which includes a chapter called “The Luck of the Draw,” discussing how the [<VPIcon icon="fa-brands fa-wikipedia-w"/>myth of meritocracy](https://en.wikipedia.org/wiki/Myth_of_meritocracy) leads people to “underestimate the role that luck has played in their lives.” Given how [<VPIcon icon="fas fa-globe"/>God seems to play dice with the universe](https://archive.org/details/doesgodplaydicet00stew/mode/2up), there is something compelling in the way [<VPIcon icon="fas fa-globe"/>art imitates life](https://hdsr.mitpress.mit.edu/pub/x5yq8vmk/release/1) when websites embrace [**controlled chaos in their designs**](/smashingmagazine.com/designing-uncertainty-how-ai-supercharges-probabilistic-thinking.md). The jury is out on whether extreme versions of this nondeterminism such as [**generative UI**](/css-tricks.com/generative-ui-notes.md) are a helpful usage of unpredictable UX. Indeed, when I see the YouTube comments reacting to [<VPIcon icon="fa-brands fa-youtube"/>Google’s upcoming usage of GenUI in search](https://youtu.be/7l7U-6Qk0Jk), maybe it’s taking the idea too far down a bad path. But there is still something about the idea of a webpage that exists in a state of subtle flux each time you land on it, the same way [<VPIcon icon="fa-brands fa-wikipedia-w"/>you can’t step into the same river twice](https://en.wikipedia.org/wiki/Heraclitus#You_cannot_step_into_the_same_river_twice).

---

## Real-world use cases for randomness

I’m a consultant who often works on short-term, greenfield projects, which provide me with a window into the zeitgeist and the trends companies think are the future. It’s no coincidence that the idea of randomness permeated one of my recent projects. That’s epitomized by a burst of confetti to give the user a sense of excitement when they run a [<VPIcon icon="fas fa-globe"/>random draw](https://plexus.co/random-draw-software) they configured. And like many a UI feature in the corporate world, the simple idea of confetti was subject to several revisions to make every randomized particle align with the client’s brand.

In fact, the requirements became custom enough that we ended up ditching the JavaScript plugin we were using and rolled our own confetti implementation! This illustrates the tension between the conflicting needs for chaos and control in UX, even in a fun feature like random confetti.

Wouldn’t it be nice if we could wield controlled presentational randomness in the presentation layer without leaving CSS?

---

## The CSS `random()` function emerges function emerges

If unpredictable user experiences are having a moment, it follows that CSS will do its part to make randomized layouts easy to implement. [<VPIcon icon="fa-brands fa-youtube"/>The creators of CSS have always been on a mission to harvest common UI patterns into declarative CSS standards](https://youtu.be/EEJBJGNmzkI?si=Nd0WevnLo1c5fZ-D). In keeping with that spirit, we see that in late 2025, [<VPIcon icon="fa-brands fa-safari"/>Safari became the first browser to support the CSS `random()` spec](https://webkit.org/blog/17640/webkit-features-for-safari-26-2/#css), as part of an update that emphasized “letting you solve common use cases with HTML and CSS alone, [<VPIcon icon="iconfont icon-w3c"/>paving the cowpaths](https://w3.org/TR/html-design-principles/#pave-the-cowpaths), and reducing the need for JavaScript or third-party frameworks.”

Since then, cool demos and discussions of `random()` keep popping up. For instance, Schalk Neethling showed us how CSS `random()` [<VPIcon icon="fas fa-globe"/>can give us fine-grained control over the infamous confetti effect](https://css-confetti.schalkneethling.com/), and [**Alvaro Montoro made a strong argument**](/css-tricks.com/the-importance-of-native-randomness-in-css.md) that CSS turns out to be the most suitable language for such tasks. He points out this approach is in line with the [<VPIcon icon="iconfont icon-w3c"/>Rule of Least Power](https://w3.org/2001/tag/doc/leastPower.html), which encourages “solving a problem using the least powerful language capable of expressing and solving it.”

Now the bad news: half a year after Safari introduced CSS `random()`, there isn’t clarity on when it will land in the other browsers. At time of writing, there are signs of life that both [<VPIcon icon="fa-brands fa-chrome"/>Chrome](https://issues.chromium.org/issues/413385732) and [<VPIcon icon="fa-brands fa-firefox"/>Firefox](https://bugzilla.mozilla.org/show_bug.cgi?id=1836588#a100336653_329583) have been working on it, but no guarantees about when we will be able to use it outside of the Apple world, even behind a browser flag.

So, it seems currently I can only try the online demos of CSS `random()` on my work MacBook and not on my PC where I do my personal projects. I am tempted to write my own implementation, but the [<VPIcon icon="fa-brands fa-firefox"/>syntax is surprisingly intricate](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/random), mostly because of elaborate random caching and keying semantics, combined with the options for base values and intervals. Even if I could manage to get all those details correct, CSS `random()` is part of [<VPIcon icon="iconfont icon-w3c"/>an editor’s draft spec](https://drafts.csswg.org/css-values-5/) that’s in the “early exploration phase” and “major breaking changes are expected.”

On top of that, from [**my dive into CSS polyfills in my article on `::nth-letter`**](/css-tricks.com/using-nonexistent-nth-letter-selector-now.md#how-to-write-an-impossible-polyfill), we know the whole idea of a CSS polyfill can be a minefield.

With all these obstacles in mind, a person would have to be a special breed of crazy to attempt to polyfill CSS `random()`.

---

## Let’s polyfill CSS `random()`

One of the commenters on a neat [<VPIcon icon="fa-brands fa-youtube"/>YouTube demo](https://youtu.be/Uy3xsfAD8s0?si=R8wzF6v5FS7mOLdU) of the feature marvelled that it’s a “feature that works ONLY IN SAFARI?!? Did the Earth get flipped upside down?” Indeed, I am more accustomed to getting my first opportunity to experience emergent features in Chrome, which [<VPIcon icon="fas fa-globe"/>means my friends on iPhones often can’t run my experiments](https://assets.publishing.service.gov.uk/media/667d2f0caec8650b100900c0/WP2_-_The_requirement_for_browsers_operating_on_iOS_devices_to_use_Apple_s_WebKit_browser_engine_1.pdf).

And yet, in the case of `random()`, it’s darkly poetic that a feature based on chance appears in an unexpected place where many of us can’t use it. In fact, even Safari users may benefit from my [<VPIcon icon="fa-brands fa-npm"/>`css-random-polyfill` package](https://npmjs.com/package/css-random-polyfill), because [<VPIcon icon="fa-brands fa-safari"/>Safari updates are tied to the OS](https://support.apple.com/en-au/102665), meaning not everyone can upgrade to the latest version of the browser. Besides, we know how much Apple loves it when you [<VPIcon icon="fa-brands fa-youtube"/>hack their stuff to improve compatibility](https://youtu.be/WXqVV8_GORE).

Jokes aside, Apple seems serious about the [<VPIcon icon="fa-brands fa-apple"/>“hackability” and transparency of everything about the open source WebKit engine that powers Safari](https://opensource.apple.com/projects/webkit/), and most of the demos I’ve used to test my polyfill are forks of demos from the WebKit blog, in which [<VPIcon icon="fa-brands fa-safari"/>the Apple Safari team showed off the possibilities for CSS `random()` back when it was in Safari preview](https://webkit.org/blog/17285/rolling-the-dice-with-css-random/).

---

## Demo: Random starfield

Here’s my cross-browser version of the first demo from the Safari team’s article. It’s a randomly scattered field of stars fading in and out at random intervals. The larger, four-pointed stars all tilt at the same randomly selected angle. All stars have subtle, randomly hued shadows around them.

<CodePen
  link="https://codepen.io/editor/leemeyer/pen/01a01bf2-923c-750e-9fc5-b239d20e7e1a"
  title="random stars, CSS random() polyfill"
  :default-tab="['css','result']"
  :theme="dark"/>

To migrate [the Safari-only original (<VPIcon icon="fa-brands fa-codepen"/>`jdatapple`)](https://codepen.io/jdatapple/pen/YPyELeV) to a version that works in Chrome and Firefox, we need to change the HTML to reference my polyfill script and add the `randomized` marker class to all elements that we want to polyfill.

```html
<!-- the script processes usages of css random on page load -->
<script src="https://unpkg.com/css-random-polyfill@latest/dist/css-random-polyfill.js"></script>

<!-- 200 star divs, we add the "randomized" marker class so css-random-polyfill knows which elements to target  -->
<div class="randomized star"></div>
<div class="randomized star"></div>
<!-- etc. -->
<div class="randomized star fourpointed"></div>
<div class="randomized star fourpointed"></div>
<div class="randomized star fourpointed"></div>
<div class="randomized star fourpointed"></div>
<div class="randomized star fourpointed"></div>
```

As for the CSS, unlike my [`:nth-letter` polyfill (<VPIcon icon="fa-brands fa-npm"/>`@leemeyer/nth-letter`)](https://npmjs.com/package/@leemeyer/nth-letter) which uses a nonstandard selector that has to be [**translated into valid CSS at runtime**](/css-tricks.com/using-nonexistent-nth-letter-selector-now.md#translating-nth-letter-into-valid-css) — and introduces [**drawbacks in the process**](/css-tricks.com/using-nonexistent-nth-letter-selector-now.md#the-actual-ending) — this time we need to support a new *function* in CSS instead of a new *selector*. It turns out the CSS we can use in this situation is technically valid, even in browsers that have never heard of CSS `random()`. More later on why it is valid, but for now, just notice that anywhere we want a random value, we store it in an intermediate custom property, and we always have to follow the convention that the property name starts with the prefix `--random`.

```css
.star {
  --random-star-size: random(1px, 7px, 1px);
  background-color: white;
  border-radius: 50%;
  aspect-ratio: 1/1;
  width: var(--random-star-size);
  position: fixed;

  --random-top: random(0%, 100%);
  --random-left: random(0%, 100%);
  top: var(--random-top);
  left: var(--random-left);

  --random-hue: random(0, 360);
  filter: drop-shadow(0px 0px calc(var(--random-star-size) * 0.7) oklch(0.7 0.2 var(--random-hue)))
    drop-shadow(0px 0px calc(var(--random-star-size) * 3) white);
  mix-blend-mode: hard-light;

  --random-speed: random(2s, 5s);
  animation: fade-in var(--random-speed);
  animation-iteration-count: infinite;

  --random-delay: random(2s, 5s);
  animation-delay: var(--random-delay);
  animation-direction: normal;
}
```

This starfield demo showcases a few different variations of the supported `random()` syntax, such as [<VPIcon icon="fa-brands fa-firefox"/>the optional third argument for specifying a step interval](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/random#calc-sum) which, in this case, is used to randomly select only whole number values within the range:

```css
--random-star-size: random(1px, 7px, 1px);
```

…and the `element-shared` base value, which we use here to tilt every four-pointed star by the same randomly selected angle.

```css
.star.fourpointed {
  --random-rotation: random(element-shared, -45deg, 45deg);
  rotate: var(--random-rotation);
}
```

::: note

In the original starfield demo, most of the random values were used inline, which is admittedly more elegant. The spec that includes `random()` [<VPIcon icon="iconfont icon-w3c"/>makes it clear](https://drafts.csswg.org/css-values-5/#resolve-property) that this kind of function “can be used in place of any part of any property’s value,” just like `calc()` or `min()`. So, by requiring extra ceremony and conventions, the polyfill is supporting a subset of what we will get with native `random()`. To see the glass half-full, it means the CSS stays compatible with the native implementation: we could delete the script reference to the polyfill once native support goes baseline and our code will still work, like it does today when it detects native support in Safari. in this case the polyfill does not process `random()` calls at all and it lets Safari do all the work. This is a compromise I can live with, especially if the alternative is to press our noses against the glass of Safari-only demos on YouTube and make [<VPIcon icon="fa-brands fa-youtube"/>comments](https://youtu.be/Uy3xsfAD8s0&lc=UgwPfwR1vktdRWN_Y2R4AaABAg) such as one viewer did: “Can’t wait to use this in prod in 4 years.”

:::

---

## Demo: Random Colored Grid Cells

[**Chris Coyier said**](/blog.master.dev/very-early-playing-with-random-in-css.md) of the original starfield demo from Apple that he found it “pretty darn compelling!” I agree, and when I was testing my polyfill, that demo was fun to watch randomly twinkling, refresh and see the stars scatter differently using an emergent, declarative CSS standard. By contrast, I can’t say I have ever sat around wishing I could create a 100×100 CSS grid with randomly multicolored cells, so this example from the Safari team feels a bit like a contrived excuse to randomize something. However, it did help me test the polyfill support of a few different variations of the syntax.

<CodePen
  link="https://codepen.io/editor/leemeyer/pen/01a01bf2-d843-766a-a1a3-095d59e6de20"
  title="random grid, CSS random() polyfill"
  :default-tab="['css','result']"
  :theme="dark"/>

The polyfill allows for some flexible syntax. You can see that references to custom properties passed to the `random()` function get substituted as expected, and you can see that inlining multiple `random()` calls in the same value works. For example, we can create a [**`grid-area` shorthand property**](/css-tricks.com/almanac-properties/grid-area.md) value with randomized `row-start` and `column-start` values.

```css
.rectangle {
  --random-grid-area: random(1, var(--rows), 1) / random(1, var(--columns), 1);
  grid-area: var(--random-grid-area);
}
```

---

## Demo: Wheel of fortune

This example is from [<VPIcon icon="fas fa-globe"/>Tim Nguyen from the Safari team](https://conffab.com/presenter/tim-nguyen/). To continue the themes of chance and synchronicity, I’ll mention that I had the good fortune to meet Tim last year when I spoke at [**Web Directions 2025**](/css-tricks.com/postcard-from-web-directions-dev-summit-2025.md). [<VPIcon icon="fas fa-globe"/>My talk](https://conffab.com/presentation/supercharged-scrolling-with-css/) came right after [<VPIcon icon="fas fa-globe"/>his talk](https://conffab.com/presentation/form-control-styling-2/), and now that I’m forking his CSS `random()` demo to create a cross-browser version, he is once again a tough act to follow.

<CodePen
  link="https://codepen.io/editor/leemeyer/pen/01a01bf3-2b7e-70bf-99a3-ebd01969fa18"
  title="wheel, CSS random polyfill"
  :default-tab="['css','result']"
  :theme="dark"/>

You can see in this example that the final random position of the wheel uses a different unit for its step interval parameter than for the minimum and maximum parameters.

```css
@keyframes spin {
  from {
    rotate: 0deg;
  }
  to {
    rotate: var(--random-rotation);
  }
}

#wheel {
  --random-rotation: random(2turn, 10turn, 20deg);
}
```

The mix of types is supported because [<VPIcon icon="fa-brands fa-firefox"/>the specs say](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/random#calc-sum_calc-sum) the values must be “resolvable to the same data type,” so we are able to mix units as long as they are in the same “overall data type,” such as `turn` and `deg`, familiar from the way CSS `calc()` adds values with different units when it makes sense, using [<VPIcon icon="fa-brands fa-firefox"/>CSS typed arithmetic](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Values_and_units/Using_typed_arithmetic).

:::: note

To make the demo work with the polyfill, I had to define the variable in a CSS class that will be applied when the polyfill first loads, in contrast to Tim’s original demo which uses the `random()` function inside a keyframes animation that was applied based on a checkbox hack. That’s because, for now, the polyfill only processes the computed styles that are applied to elements when the page first loads. Since all my tests pass with this implementation, I am leaving it like that for now in the interest of [<VPIcon icon="fas fa-globe"/>doing the simplest thing that could possibly work](https://shinesolutions.com/2018/12/21/doing-the-simplest-thing-that-can-possibly-work-if-youre-not-sure-what-to-do-next/). There are ways we could explore to make the polyfill react to dynamic changes to the [<VPIcon icon="fas fa-globe"/>computed styles](https://observe.style/) and/or the [<VPIcon icon="fa-brands fa-firefox"/>DOM](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver).

:::

---

## Demo: Random squares

[<VPIcon icon="fas fa-globe"/>Chris Coyier](https://chriscoyier.net/) has a knack for writing code that’s either as tricky or as simple as needed to get his point across, and his [CodePen “Very basic random() in CSS” (<VPIcon icon="fa-brands fa-codepen"/>`chriscoyier`)](https://codepen.io/chriscoyier/pen/ZYbjYLB) is maybe the simplest demo of CSS `random()` possible, showing three randomly positioned squares with random colors. Below is my cross-browser version, which I also modified to randomize the size of the squares, as a test that my polyfill supports [<VPIcon icon="fa-brands fa-firefox"/>random value sharing using custom keys](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/random#random-value-sharing).

<CodePen
  link="https://codepen.io/editor/leemeyer/pen/01a01bf1-e81f-724e-bb6e-d574ac0c5bd6"
  title="random() squares in CSS polyfill"
  :default-tab="['css','result']"
  :theme="dark"/>

Here is the code I added to make each square have a random height that is equal to its random width:

```css
--random-height: random(--side, 40px, 100px);
--random-width: random(--side, 40px, 100px);

width: var(--random-height);
height: var(--random-width);
```

This reassures that we are supporting the correct syntax. Admittedly, custom keys will be more useful in the real native version, which won’t need the intermediate variables. Since we are using intermediate custom properties, we could just have used one custom property named `--side` and referenced that for both the `height` and `width` values.

---

## Chromium-only bonus demo: Simulate `random-item` using a custom CSS function

Many of the above demos include random colors. That’s achieved by passing random numeric values into CSS color functions such as [**`rgb()`**](/css-tricks.com/almanac-functions/rgb.m) or [**`lch()`**](/css-tricks.com/almanac-functions/lch.m). But if we had a list of specific colors we wanted to randomly choose from, we can’t do that easily, which is why the spec for the CSS values and units module mentions the [<VPIcon icon="iconfont icon-w3c"/>`random-item()` function](https://drafts.csswg.org/css-values-5/#random-item), although no browser currently implements it (except for experimental [<VPIcon icon="fa-brands fa-safari"/>support](https://webkit.org/blog/18194/release-notes-for-safari-technology-preview-251/?via=dailydev) in safari preview). If we had this function, we could select a random color or anything else from an arbitrary list of values:

```css
random-item(element-shared, red, blue, green);
```

The `random-item` function takes a mandatory first argument of the type [<VPIcon icon="iconfont icon-w3c"/>`random-caching-options`](https://w3.org/TR/css-values-5/#typedef-random-caching-options), the same as CSS `random()`, but then it takes a variable length list of arguments to randomly select from, rather than a minimum and maximum value.

I don’t feel like complicating the polyfill to support a CSS syntax that isn’t implemented in any browser — evidently I only give myself permission to do that [**once a year**](/css-tricks.com/using-nonexistent-nth-letter-selector-now.md). But now that we have a version of CSS `random()` in Chromium which also supports [<VPIcon icon="fa-brands fa-firefox"/>CSS custom functions](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Custom_functions_and_mixins/Using_custom_functions) and [<VPIcon icon="fa-brands fa-chrome"/>inline conditionals](https://developer.chrome.com/blog/if-article), it’s hard to resist seeing what happens if we combine all these weird and wonderful things into one experiment. It turns out these features together can get us pretty darn close to the functionality we’d get from `random-item()`.

```css
--random-index: random(element-shared, 1, 5, 1);
--random-color: --item(var(--random-index), aqua, purple, pink, grey, green);
```

If you’re using a Chromium-based browser, you can see the code in action in this version of the squares demo which sets all three elements to the same color randomly selected from the list.

<CodePen
  link="https://codepen.io/editor/leemeyer/pen/01a01bf2-265f-717f-b460-6d85281229f3"
  title="random() squares with one random-item() color"
  :default-tab="['css','result']"
  :theme="dark"/>

The implementation of my generic `--item` custom CSS function takes an `--index` argument followed by 10 optional arguments. These could be increased to any number of arguments you think will be the realistic maximum size of a collection you would need. Each of the optional arguments is made optional by [<VPIcon icon="fa-brands fa-firefox"/>defaulting](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@function#specifying_default_values) it to an [<VPIcon icon="iconfont icon-w3c"/>empty value](https://w3.org/TR/css-variables-1/?utm_source=chatgpt.com#guaranteed-invalid), so the caller of the function only needs to pass in the arguments it needs to index. Lastly, the function maps the `--index` to the argument at that index, because CSS custom functions do not [<VPIcon icon="fa-brands fa-firefox"/>support variable length collections of arguments the way JavaScript functions do](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters).

```css
@function --item(--index,
  --arg-1: ,
  --arg-2: ,
  --arg-3: ,
  --arg-4: ,
  --arg-5: ,
  --arg-6: ,
  --arg-7: ,
  --arg-8: ,
  --arg-9: ,
  --arg-10: ) {

  result: if(
    style(--index: 1): var(--arg-1);
    style(--index: 2): var(--arg-2);
    style(--index: 3): var(--arg-3);
    style(--index: 4): var(--arg-4);
    style(--index: 5): var(--arg-5);
    style(--index: 6): var(--arg-6);
    style(--index: 7): var(--arg-7);
    style(--index: 8): var(--arg-8);
    style(--index: 9): var(--arg-9);
    else: var(--arg-10);
  );
}
```

::: note Sidenote

This generic helper function is interesting, because [**Temani Afif**](/css-tricks.com/author.md#afiftemani/) has [**demonstrated cool use cases**](/smashingmagazine.com/define-array-colors-css.md) for being able to choose from a list of colors using an `--index` variable, but the solution he created was specific to the color data type and he [**freely admits**](/smashingmagazine.com/define-array-colors-css/#what-are-the-limitations.md) it’s “more of a hack than a CSS feature. So, use it cautiously.” By contrast, the custom function approach will work with a list of any data type, and I wouldn’t describe it as a hack because it’s using CSS standards as intended, albeit emergent standards that aren’t available in all browsers just yet.

:::

---

## How the polyfill works

Now we have gained confidence in our `random()` polyfill, you might be curious how it works. Is this a good time to level with you and say I don’t fully know? That’s [<VPIcon icon="fas fa-gloibe"/>a very 2026 predicament](https://gruhn.me/blog/2026-08-03/), but thankfully it’s not because of AI.

As I hinted at the start, my level of eagerness to use new CSS syntax before it’s supported is matched only by my level of laziness to implement and maintain my own version of `random()`, so I went hunting for an open source JavaScript implementation and was pleasantly surprised it exists!

As you might expect, it’s not designed for the exact purpose I want it for. it’s in an implementation that’s designed to be used at build-time rather than on the client, as a [PostCSS plugin (<VPIcon icon="fa-brands fa-npm"/>`@csstools/postcss-random-function`)](https://npmjs.com/package/@csstools/postcss-random-function). Digging through the source we see that this plugin wraps the MIT-licensed `@csstools/css-calc` which has no dependencies and isn’t coupled to PostCSS. The [Readme (<VPIcon icon="fa-brands fa-npm"/>`@csstools/css-calc`)](https://npmjs.com/package/@csstools/css-calc) for this package says it only implements the older [<VPIcon icon="iconfont icon-w3c"/>CSS Values and Units Module Level 4](https://drafts.csswg.org/css-values-4/), but we see from the [commit history (<VPIcon icon="iconfont icon-github"/>`csstools/postcss-plugins`)](https://github.com/csstools/postcss-plugins/pull/1873) that it’s recently had an “update to latest spec” of `random()` and we see it [passing automated tests (<VPIcon icon="iconfont icon-github"/>`csstools/postcss-plugins`)](https://github.com/csstools/postcss-plugins/pull/1873/changes#diff-d97a85e10702c8fccbcbbb644230067ac27dc6f5e63c62154a39a8be71a2799f) for the kind of random goodness we have been enjoying in this article.

My main question is how on earth we are going to hook it up to client-side CSS, but it turns out not to be too much custom code:

```js :collapsed-lines
import { calc } from "@csstools/css-calc";
const calcFn = calc;

if (!CSS.supports("width", "random(0px, 100px)")) {
  const styleTag = document.createElement("style");
  styleTag.textContent = ".randomized { display: none; }";
  document.head.appendChild(styleTag);
  const elementIDs = new WeakMap();
  const documentID = crypto.randomUUID();

  document.querySelectorAll(".randomized").forEach((element) => {
    const styles = getComputedStyle(element);
    [...styles]
      .filter((property) => property.startsWith("--random"))
      .forEach((propertyName) => {
        const css = styles.getPropertyValue(propertyName);
        const value = resolveRandom(css, {
          element,
          propertyName,
          documentID,
          elementIDs,
          calcFn,
          crypto,
        });
      element.style.setProperty(propertyName, value);
    });
  });
  if (styleTag.parentNode) {
    styleTag.parentNode.removeChild(styleTag);
  }
}

function resolveRandom(css, { element, propertyName, documentID, elementIDs, calcFn, crypto }) {
  const patchedCss = css.replace(
    /random\(\s*(?!(?:[^,]*\b(?:shared|scoped)\b|fixed\b|--))([^,]+),/gi,
    (_, expression) => `random(fixed ${Math.random()}, ${expression},`
  );

  return calcFn(patchedCss, {
    precision: 5,
    toCanonicalUnits: true,
    randomCaching: {
      documentID,
      elementID: elementIDs.getOrInsert(element, `element-${crypto.randomUUID()}`),
      propertyName,
    },
  });
}
```

Let’s translate this code into natural language steps:

1. If we detect that the browser supports native CSS `random()`, then the polyfill will do nothing and let the browser handle any calls in CSS to `random()`.
2. If it doesn’t support the feature, we temporarily hide all elements marked as `.randomized` to prevent a flicker.
3. We loop through all the `--random` prefixed properties in any element that has the  `.randomized` CSS class.
4. For each `--random` custom property, we take advantage of the [<VPIcon icon="iconfont icon-w3c"/>fact](https://w3.org/TR/css-variables-1/#syntax) that the “allowed syntax for [<VPIcon icon="iconfont icon-w3c"/>custom properties](https://w3.org/TR/css-variables-1/#custom-property) is extremely permissive,” which means that even if the CSS parser does not understand an expression used in the value for a property such as `--random-grid-area: random(1, var(--rows), 1) / random(1, var(--columns), 1)`, the value will be parsed into a string which can “be read and acted on by JavaScript.” The browser will also resolve any calls to `var()` and substitute those into the computed value, regardless of any surrounding gibberish it can’t interpret.
5. We generate unique surrogate identifiers for the document and each randomized element we pass to `@csstools/css-calc` together with the expression string that contains each usage of `random()`. This allows CSS Tools to respect the random caching rules such as `element-shared`.
6. If no base is specified in a usage of `random()`, the library doesn’t seem to generate evenly distributed values (for example, the stars in the first test kept ending up in weird clusters), so we break out the proverbial [<VPIcon icon="fas fa-globe"/>duct tape](https://joelonsoftware.com/2009/09/23/the-duct-tape-programmer/) and patch the problem by injecting a fixed randomly generated base value if the user didn’t provide one.
7. Using the value we get back from `@csstools/css-calc` interpreting the `random()` call, we set the property to that value with an inline style on the randomized element.
8. We remove the class declaration we injected to hide the randomized elements while we were resolving them.

Point 4 is a big deal. Interpreting arbitrary custom property values using CSS is the closest we have in present day CSS to an honest-to-goodness documented extension point for the language. Since arbitrary expressions in custom variable values are valid and can be read by JavaScript via the computed styles, this approach has the potential to avoid many of the [<VPIcon icon="fas fa-globe"/>known downsides of polyfilling CSS](https://philipwalton.com/articles/the-dark-side-of-polyfilling-css/) such as refetching and rewriting stylesheets, doing our own parsing of CSS, and other fun but dangerous pastimes.

---

## Random parting thoughts

Fittingly, it’s only by good luck that an open source project has already done most of the work we need to be able to run CSS `random()` in any browser while we wait for native support. A lot of people claim they can’t wait for this feature to be available in more browsers, so it will be interesting to see whether people choose to wait now that a polyfill exists. Seeing Chris Coyier’s [<VPIcon icon="fa-brands fa-youtube"/>reaction](https://youtube.com/live/agjJMAxPajQ?si=-ro_5sUyXh9Xl6kc&t=707) to the starfield demo, his enthusiasm was contagious! I had a similar moment when I first got the demo working in other browsers. Let me know if having this polyfill available sparks creativity for your own projects. I definitely have ideas for some more advanced use cases for it, which is what prompted me to polyfill it.

Till next time, happy randomizing from your friendly neighbourhood random guy.

<SiteInfo
  name="css-random-polyfill"
  desc="Polyfill for CSS random(). Latest version: 0.1.9, last published: 16 days ago. Start using css-random-polyfill in your project by running `npm i css-random-polyfill`. There are no other projects in the npm registry using css-random-polyfill."
  url="https://npmjs.com/package/css-random-polyfill/"
  logo="https://static-production.npmjs.com/da3ab40fb0861d15c83854c29f5f2962.png"
  preview="https://static-production.npmjs.com/338e4905a2684ca96e08c7780fc68412.png"/>

```component VPCard
{
  "title": "cross-browser CSS random() demos - a Collection by  Lee Meyer on CodePen",
  "desc": "",
  "link": "https://codepen.io/collection/WQdYLw/",
  "logo": "https://cpwebassets.codepen.io/assets/favicon/favicon-aec34940fbc1a6e787974dcd360f2c6b63348d4b1f4e06c77743096d55480f33.ico",
  "background": "rgba(112,204,124,0.2)"
}
```

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Let’s Use the Emergent CSS random() Function in all the Browsers",
  "desc": "The journey to create a polyfill for the upcoming CSS random() function that works in all browsers.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/css-random-function-polyfill.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
