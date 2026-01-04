---
lang: en-US
title: "Scope in CSS"
description: "Article(s) > Scope in CSS"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - frontendmasters.com
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Scope in CSS"
    - property: og:description
      content: "Scope in CSS"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/scope-in-css.html
prev: /programming/css/articles/README.md
date: 2025-06-17
isOriginal: false
author:
  - name: Chris Coyier
    url : https://frontendmasters.com/blog/author/chriscoyier/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/6091
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
  name="Scope in CSS"
  desc="We've got @scope in CSS now, and it's got it's uses. But the concept of scope in CSS is a wider idea."
  url="https://frontendmasters.com/blog/scope-in-css/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/6091"/>

::: info

This is a written adaptation of my talk at CSS Day 2025. It was a lovely event, but I realize life is complicated and not everyone can make it to events like this. There are videos up paywalled at [<VPIcon icon="fas fa-globe"/>conffab.com](https://conffab.com/). I figure this written version can make my points as well.

If it’s helpful to have the slides, here ya go:

[<VPIcon icon="fas fa-file-pdf"/>`scope_slides.pdf` Download](https://frontendmasters.com/blog/wp-content/uploads/2025/06/Scope.pdf)

:::

![Chris Coyier presenting on stage at a conference, with a large audience seated in front of them. A screen displays coding content related to CSS.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/cssday-2025-368.jpg?resize=1024%2C683&ssl=1)

![I hate to break it to ya, but CSS is… mostly scope. The act of writing CSS is to:<br/><ol><li>Write some scope</li><li>Write some styles</li></ol>](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/Scope.002.jpeg?resize=1024%2C576&ssl=1)

![Even something like `.cool` is pretty extreme scoping. It *only* effects elements in the DOM that happen to have that *exact* class. OoooOoo rare.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/Scope.003.jpeg?resize=1024%2C576&ssl=1)

![It’s easy to think of CSS skill of being about knowing how to accomplish all the fancy styling bits. But the best CSS developers are also talented at knowing **where and how** to apply those styles. Scope.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/Scope.004.jpeg?resize=1024%2C576&ssl=1)

![Selectors are a big part of scoping, but there are other things in CSS that apply scope like `@media` queries, `@support`, and other at-rules.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/Scope.005.jpeg?resize=1024%2C576&ssl=1)

![Say we need to style a real-world design like this.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/Scope.006.jpeg?resize=1024%2C576&ssl=1)

![This part we could easily call a `.card` and apply reusable styles accordingly.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/Scope.007.jpeg?resize=1024%2C576&ssl=1)

![Later, a new element comes up that is fairly card-like. Should we re-use the class? We’re at a mental CSS crossroads. The padding is a bit different, the colors are a bit different, there is no border-radius…](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/Scope.008.jpeg?resize=1024%2C576&ssl=1)

![… meh. Screw it. Let’s call this one `.challenge-card`.<br/><br/>We’ve accomplished scoping with our little ol’ fingers and brain.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/Scope.009.jpeg?resize=1024%2C576&ssl=1)

![99% of all the CSS scoping I’ve done in my life has been just like the above. Just use a different name and selector in order to avoid unwanted style collisions. Done.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/Scope.010.jpeg?resize=1024%2C576&ssl=1)

![There *are* problems that can come up here though. And there are tools to help with those problems.<br/><br/>But let’s reach for tools when we *actually have the problem, not because the theoretical problem exists.*](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/Scope.011.jpeg?resize=1024%2C576&ssl=1)

![Regular ol CSS is “global” in nature.<br/><br/>Maybe your brain keeps thinking of using `.card` as a class name, only to discover it’s already being used. Worse, you write up your styles using that name, it all looks great, and you don’t realize you’ve steamrolled other parts of the site with your new clashing styles. Derp.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/Scope.012.jpeg?resize=1024%2C576&ssl=1)

![Two different developers at different times can choose the same names and selectors and cause issues, possibly without even knowing it. That’s probably the worst and most insidious problem.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/Scope.013.jpeg?resize=1024%2C576&ssl=1)

![We could call that “The Barstool Problem”.<br/><br/>That is, writing CSS that affects styles elsewhere that you didn’t intend.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/Scope.014.jpeg?resize=1024%2C576&ssl=1)

![If you face problems like this, which I’d say is a reasonable concern as soon as 2 or more people are working on a project, or the project is of Medium™ size or bigger, it may be time to tool the problem away.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/Scope.015.jpeg?resize=1024%2C576&ssl=1)

![There is stuff in the web platform to help… sort of. We’ll get to that. But let’s do userland tools first.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/Scope.018.jpeg?resize=1024%2C576&ssl=1)

![One approach to scoping styles is to process the HTML/CSS/JavaScript that we write such that the selectors being applied are unique and won’t cause The Barstool Problem.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/Scope.019.jpeg?resize=1024%2C576&ssl=1)

![CSS Modules is interesting in that this kind of scoping is the *only* thing that it does. It’s whole reason for existence is scoping class names.<br/><br/>It’s also 10 years old just recently, congrats CSS Modules!<br/><br/>I love how it was worked on in 2015 and that’s basically it. Feature complete for 10 years.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/Scope.020.jpeg?resize=1024%2C576&ssl=1)

![Here’s how it works.<br/><br/>You write regular CSS (nice!).<br/><br/>The CSS that ends up on the page is that class plus some gibberish, which accomplishes the scoping part.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/Scope.021.jpeg?resize=1024%2C576&ssl=1)

![How does the HTML know to match to that class? You import the styles in your JavaScript. What you get is an object that maps the class names you wrote to the gibberish ones that will match.<br/><br/>That’s it really. So CSS Modules is only relevant in JavaScript-produced markup.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/Scope.022.jpeg?resize=1024%2C576&ssl=1)

![No barstools will be kicked over in this situation. If 50 developers all use `.card` as a class name, they won’t clash.<br/><br/>In practice, giving the top-most element of the component a class name of `root` is nice because standard conventions mean you don’t have to think too hard about it.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/Scope.023.jpeg?resize=1024%2C576&ssl=1)

![I also enjoy how CSS Modules is just an idea. Tons of bundler-type applications support it, but they do so by just following the spec of how it should work.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/Scope.024.jpeg?resize=1024%2C576&ssl=1)

![Out in “the real world”, here’s a React component that imports a CSS files that uses CSS modules conventions (which *also* use Sass just for fun, it’s being processed anyway). The `className` is applied.<br/><br/>Crucially, this co-locates the styles and the component.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/Scope.025.jpeg?resize=1024%2C576&ssl=1)

![When you scope *and* co-locate styles, it really lessens the issue of “unused CSS”. All-global CSS tends to grow over time and lead to CSS files that developers are (rightfully) afraid to touch (barstools) and that are essentially wasted bandwidth.<br/><br/>Scoped, co-located CSS means it’s less likely there is unused CSS in those files. If the component isn’t used, the CSS doesn’t load at all (typically).](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/Scope.026.jpeg?resize=1024%2C576&ssl=1)

![Junk the component, junk the styles along with it. No more orphaned styles.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/Scope.027.jpeg?resize=1024%2C576&ssl=1)

![This style co-location happens in the concept of CSS-in-JS as well. Usually not my favorite approach to CSS, but I do like the idea of keeping the styling job close to the components themselves.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/Scope.028.jpeg?resize=1024%2C576&ssl=1)

![I do not think the world is better off because React is unopinionated about styles. We would have been better off if they just had a blessed styling technique.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/Scope.029.jpeg?resize=1024%2C576&ssl=1)

![Vue has a blessed styling technique which does scoping and it’s perfectly nice.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/Scope.030.jpeg?resize=1024%2C576&ssl=1)

![I like how the `[data-attribute]` it adds means you get to keep the exact class you authored too, which won’t change over time, so you’re maintaining nice hooks for people’s user stylesheets.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/Scope.031.jpeg?resize=1024%2C576&ssl=1)

![Svelte also has a blessed styling technique which scopes and it’s fine.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/Scope.032.jpeg?resize=1024%2C576&ssl=1)

![Can the web itself help us with selector scoping? Maybe not exactly like this, but we’ll see. The scoping it traditionally provides is either super loose (just use a different class) or super hardcore.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/Scope.033.jpeg?resize=1024%2C576&ssl=1)

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/Scope.034.jpeg?resize=1024%2C576&ssl=1)

![Websites can include other… websites. By way of the venerable `<iframe>`, of course. They are fraught with challenges, but they were foundational to the last three companies I worked at, so respect.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/Scope.035.jpeg?resize=1024%2C576&ssl=1)

![Also known as `iFrames`, of course.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/Scope.036.jpeg?resize=1024%2C576&ssl=1)

![Designed by Apple in California.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/Scope.037.jpeg?resize=1024%2C576&ssl=1)

![For real though, you can show web content with them, and there’s no way CSS from the outside will leak in or CSS from inside leak out. But they are a brick wall and not a practical choice just for this purpose alone.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/Scope.038.jpeg?resize=1024%2C576&ssl=1)

![Shadow DOM is also pretty hardcore scoping. Styles that inherit can sneak through a shadow DOM boundary (including custom properties), but little else. This hardcore scoping is largely why it exists.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/Scope.040.jpeg?resize=1024%2C576&ssl=1)

![The first time I came across the shadow DOM was when I advocated for `<use>` in SVG as a better alternative for icons than using icon fonts. When you `<use>` another bit of SVG, it clones it into a shadow root and becomes an `<svg>` of it’s own.<br/><br/>Form elements often use shadow roots to abstract away their UI implementations as well.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/Scope.041.jpeg?resize=1024%2C576&ssl=1)

![We can make our own shadow DOM now with [<VPIcon icon="fas fa-globe"/>Web Components](https://frontendmasters.com/courses/web-components/). But bear in mind you don’t have to. Keeping to the light DOM [**can be awfully nice**](/frontendmasters.com/light-dom-only.md).](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/Scope.042.jpeg?resize=1024%2C576&ssl=1)

![As we’ve covered, scoping can be kinda great, and the fact that we can opt-in to it in Web Components is nice. It’s a one-liner to make a custom element have a shadow DOM.<br/><br/>Here, I’m injecting a `<style>` tag into that shadow DOM, which will inherently be scoped.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/Scope.043.jpeg?resize=1024%2C576&ssl=1)

![The selector used in that style tag is simply: `button`. And notice that *only* the `<button>` that is within the Web Component is styled with it, not the `<button>` outside of it. Sometimes that’s exactly the goal.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/Scope.044.jpeg?resize=1024%2C576&ssl=1)

![Imagine not just a button but an entire system of components that only look the way they do because of baked-in scoped styles on themselves. No worries of their styles affecting other elements, or, for the most part, other styles coming in and screwing things up.<br/><br/>Sounds pretty good for design systems right?](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/Scope.045.jpeg?resize=1024%2C576&ssl=1)

![That’s not just an “oh yeah, hmmm, maybe that could work” situation. Pretty much all the major design systems ship with shadow DOM scoping.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/Scope.046.jpeg?resize=1024%2C576&ssl=1)

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/Scope.047-1.jpeg?resize=1024%2C576&ssl=1)

![When we talk about styling via classes, there used to be several different names of projects we could point to, but these days let’s be real: it’s [<VPIcon icon="iconfont icon-tailwindcss"/>Tailwind](https://tailwindcss.com/).](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/Scope.048.jpeg?resize=1024%2C576&ssl=1)

![Since you aren’t writing classes or other selectors to do styling in Tailwind, the styles you are applying are already scoped.<br/><br/>Even if it’s not the main reason people choose a tool like Tailwind, it is a potential benefit.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/Scope.049.jpeg?resize=1024%2C576&ssl=1)

![Even if I admit the approach isn’t for me, Tailwind does have some objectively good characteristics. One being that the CSS output is generally a good bit smaller than “normal” because of the de-duplication. Perhaps the HTML is a bit bigger, but it’s CSS that is more of a blocking resource, so it’s probably a net-win.<br/><br/>I mostly don’t like it because it feels like you need to know CSS anyway, and now you’ve got to use this leaky abstraction on top of it, and when I’ve tried it I feel like I’m not buying much.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/Scope.050.jpeg?resize=1024%2C576&ssl=1)

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/Scope.052.jpeg?resize=1024%2C576&ssl=1)

![CSS actually has a thing called [<VPIcon icon="fa-brands fa-firefox" />`@scope`](https://developer.mozilla.org/en-US/docs/Web/CSS/@scope) now. Props to Miriam Suzanne for brainchilding and shepherding it.<br/><br/>My knowledge of `@scope` is just from playing around and reading the work of people who write on MDN and for Google’s sites and fellow bloggers. So thank you to everyone who makes technical content. I probably read it.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/Scope.053.jpeg?resize=1024%2C576&ssl=1)

![If you’re wondering about browser support, basically the story is it’s waiting for Firefox, which already has it under a flag. It’s in [<VPIcon icon="iconfont icon-webdev"/>Interop 2025](https://web.dev/blog/interop-2025), so it shouldn’t be too long.<br/><br/>I’d say it doesn’t progressively enhance terribly well, so chill on it a sec.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/Scope.054.jpeg?resize=1024%2C576&ssl=1)

![The first glance at the syntax had me feeling it left, uh, something to be desired.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/Scope.055.jpeg?resize=1024%2C576&ssl=1)

![Here’s some perfectly reasonable HTML and some perfectly reasonable CSS to go with it.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/Scope.056.jpeg?resize=1024%2C576&ssl=1)

![Rather than writing `.card {}` we could write `@scope (.card) {}` and it’s… almost exactly the same functionality just more characters to type.<br/><br/>At least, that was my initial impression.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/Scope.057.jpeg?resize=1024%2C576&ssl=1)

![For the record, we should be able to test the support of it like this. But we can’t. Because `at-rule()`, [while agreed upon (<VPIcon icon="iconfont icon-github"/>`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/issues/2463#issuecomment-1016720310), isn’t implemented anywhere yet. When it is, it’s likely any browser that supports it will also support `@scope` so this will probably never be a useful combo.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/Scope.058.jpeg?resize=1024%2C576&ssl=1)

![While that very basic demo of the syntax isn’t dripping with usefulness, there are some somewhat niche things that `@scope` can do that do have their uses.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/Scope.059.jpeg?resize=1024%2C576&ssl=1)

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/Scope.060.jpeg?resize=1024%2C576&ssl=1)

![Nicole Sullivan blogged [<VPIcon icon="fas fa-globe"/>scope donuts](https://stubbornella.org/2011/10/08/scope-donuts/) in 2011 and it’s just now a thing. So that’s a lesson for you. If you want something in the web platform, make a good case for it then wait 15 years.<br/><br/>Donut scoping is a way to select an element and allow descendent selectors as usual, *up until a point you specify* where descendent selectors no longer apply.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/Scope.061.jpeg?resize=1024%2C576&ssl=1)

![I always think of element that contain body copy as a use case. Like chunks of converted markdown are special little bubbles with their own styles and you want to prevent other styles leaking int there that you don’t want.<br/><br/>Here’s an example of an article on WIRED where we can clearly see some body copy (and non-body copy).](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/Scope.062.jpeg?resize=1024%2C576&ssl=1)

![Links within body copy should be underlined. And they do that. Good job WIRED.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/Scope.063.jpeg?resize=1024%2C576&ssl=1)

![It’s arguable, but links in some other places may not need to be underlined as there is enough visual affordance that they are links anyway, like in navigation or article cards.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/Scope.064.jpeg?resize=1024%2C576&ssl=1)

![A common way to handle links-in-some-areas vs not-in-others is to let links be underlined by default, then select areas to remove them and remove them.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/Scope.065.jpeg?resize=1024%2C576&ssl=1)

![The reverse of that is to remove link underlines everywhere, and re-apply them places you want them, like in body copy content.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/Scope.066.jpeg?resize=1024%2C576&ssl=1)

![Donut scoping gives us a rather elegant way to express this idea. Remove links everywhere except within element with a class name of `content`. That reads decently well to me.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/Scope.067.jpeg?resize=1024%2C576&ssl=1)

![Donuts can have more than one hole, depending on what you’re doing in the DOM.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/Scope.068.jpeg?resize=1024%2C576&ssl=1)

![Massive upheaval in how we write CSS? No. But it’s a nice little niche tool and CSS is better for having it.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/Scope.069.jpeg?resize=1024%2C576&ssl=1)

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/Scope.070.jpeg?resize=1024%2C576&ssl=1)

![Proximity scope is rather amazing in that it’s an entirely new “level” by which the browser decides which CSS rules to apply. We’ll see that in a moment as we look at a basic use case.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/Scope.071.jpeg?resize=1024%2C576&ssl=1)

![I wouldn’t say it’s ultra common, but one way to implement color themes is to use class names on wrapper elements that signify which theme is to be used there.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/Scope.072.jpeg?resize=1024%2C576&ssl=1)

![Say we have a dark and a light theme, those themes have more jobs to do that set one `background-color` and one `color`. It might change *lots* of stuff.<br/><br/>Think about link colors. Blue links may need to be lighter on a dark color and darker on a light color. So we’re expressing that here with an `oklch()` color that adjusts the lightness.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/Scope.073.jpeg?resize=1024%2C576&ssl=1)

![Themes *could* be nested. Again maybe not ultra-common, but if they are just classes, it could be done. Imagine an entire page in light mode, but the footer swaps to dark mode as it’s a nice look. That might end up nested if we’re talking like…](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/Scope.074.jpeg?resize=1024%2C576&ssl=1)

```html
<body class="theme-light">
  ...
  <footer class="theme-dark">
  ...
```

![If we define our themes as single classes one after another, we might run into problems. Each theme will have an indentical specificity, so the *last* one declared will be the “most powerful” because of source order.<br/><br/>See the links now. Those links are technically within an element with `theme-light` *and* `theme-dark`. But `theme-light` is “more powerful” as it’s declared last, and thus we get the wrong color.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/Scope.075.jpeg?resize=1024%2C576&ssl=1)

![Scope can help here. By replacing those theme selectors with like `@scope (.theme-dark) {}` now **proximity scoping** kicks in.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/Scope.076.jpeg?resize=1024%2C576&ssl=1)

![Proximity is less powerful than specificity of selectors, but it’s *more* powerful than source order. That’s a little weird to wrap your mind around at first, I think. But this simple demo hopefully helps.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/Scope.077.jpeg?resize=1024%2C576&ssl=1)

![Because the `theme-light` class is “closer” in the DOM to those links, it will “win”. Source order doesn’t matter here anymore, it matters which of the otherwise-equal selectors has higher proximity.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/Scope.078.jpeg?resize=1024%2C576&ssl=1)

![Big sea change in CSS? Again, no, but CSS is better off for having this niche tool.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/Scope.079.jpeg?resize=1024%2C576&ssl=1)

![Anytime source order might be a concern, it’s possibly proximity styling can step in to help.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/Scope.080.jpeg?resize=1024%2C576&ssl=1)

![Imagine variation classes on a “card” element. If the variation classes have the same specificity as the base class, the worry is the base class will override what the variation is doing.<br/><br/>This could be the case in systems that bundle CSS in ways you don’t fully understand, or load CSS on demand in ways that even user actions may affect the order.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/Scope.081.jpeg?resize=1024%2C576&ssl=1)

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/Scope.082.jpeg?resize=1024%2C576&ssl=1)

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/Scope.083.jpeg?resize=1024%2C576&ssl=1)

![See this bit of HTML. Two `<div>`s, one of them with a `<style>` tag inside and one without.<br/><br/>Inside that `<style>` tag we immediately see an `@scope` at-rule, with no parens at all. What is the scope then? Used like this, the scope is the parent element of the `<style>`, so the `<div>` parent. From there, we can select that `<div>` or any descendants.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/Scope.084.jpeg?resize=1024%2C576&ssl=1)

![All the sudden we have a way to style from just one particular element downwards without even having to name it order use any selector at all.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/Scope.085.jpeg?resize=1024%2C576&ssl=1)

![I said the web platform doesn’t really have selector scoping help, but this is basically that. This is probably as close as we’ll ever get.<br/><br/>It feels like a pretty powerful concept to me.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/Scope.086.jpeg?resize=1024%2C576&ssl=1)

![What if we just did this “instead” of linking up CSS files and finding scoping solutions there? Maybe this is just how we style most everything on the page. Perhaps from the “component” level on down. Is that a reasonable thing to do?](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/Scope.087.jpeg?resize=1024%2C576&ssl=1)

![[I did attempt to build a demo (<VPIcon icon="fa-brands fa-codepen"/>`chriscoyier`)](https://codepen.io/editor/chriscoyier/pen/YPXyYqW) with 1,000 cards where one page loaded CSS “regularly” with one stylesheet that applies to all the cards. Then another page where each of the 1,000 cards has a `@scope`-d `<style>` block within it.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/Scope.088.jpeg?resize=1024%2C576&ssl=1)

![You’d think the 1,000 extra `<style>` blocks would be awful for performance, but, quite weirdly, the difference was almost undetectable. **I think this was a poor test though** as there was so much of the exact same code the browser was probably great at optimizing it. A better test would be tons of totally different components and include interactivity.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/Scope.089.jpeg?resize=1024%2C576&ssl=1)

![At a minimum, sprinkling in scoped styles into the DOM where you just want a bit of styles that will never “leak out” and screw up anything else is *super cool*.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/Scope.090.jpeg?resize=1024%2C576&ssl=1)

![Slide with a blue background and yellow text titled 'The Takeaways'.<br/><br/><ul><li>CSS is naturally scoped. That might be all you need.</li><li>Selector scoping is pretty sweet on large sites with teams. Lots of existing tools help with selector scoping, or avoid the need for it.</li><li>Native CSS @scope is nice to have. Donus scoping and proximity are a small upgrade to CSS.</li><li>`<style>` block @scope might be great. Tool-free component scoping. Can we make it performant?</li></ul>](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/Scope.093.jpeg?resize=1024%2C576&ssl=1)

Cheers!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Scope in CSS",
  "desc": "We've got @scope in CSS now, and it's got it's uses. But the concept of scope in CSS is a wider idea.",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/scope-in-css.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
