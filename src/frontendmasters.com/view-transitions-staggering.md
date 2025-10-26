---
lang: en-US
title: "View Transitions Staggering"
description: "Article(s) > View Transitions Staggering"
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
      content: "Article(s) > View Transitions Staggering"
    - property: og:description
      content: "View Transitions Staggering"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/view-transitions-staggering.html
prev: /programming/css/articles/README.md
date: 2024-10-22
isOriginal: false
author:
  - name: Chris Coyier
    url : https://frontendmasters.com/blog/author/chriscoyier/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/4232
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
  name="View Transitions Staggering"
  desc="When you use View Transitions on multiple elements, it can be a very nice look to stagger them out a little bit. It's possible now, but a bit finicky. Let's take a look at some code, present and future, that will help. "
  url="https://frontendmasters.com/blog/view-transitions-staggering/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/4232"/>

I love view transitions. When you’re using view transitions to move *multiple items*, I think staggering them is cool effect and a reasonable ask for doing so succinctly. While I was playing with this recently I learned a lot and a number of different related tech and syntax came up, so I thought I’d document it. Blogging y’all, it’s cool. [**You should.**](/frontendmasters.com/guest-writing-for-boost.md)

---

## Example

So let’s say we have a menu kinda thing that can open & close. It’s just an example, feel free to use your imagination to consider two states of any UI with multiple elements. Here’s ours:

![Closed](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/10/cdpn.io_pen_debug_GRVvgLR.png?resize=551%2C1024&ssl=1)

![Open](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/10/cdpn.io_pen_debug_GRVvgLR-1.png?resize=551%2C1024&ssl=1)

View Transitions is a great way to handle animating this menu open. I won’t beat around the bush with a working example. Here’s that:

<CodePen
  user="chriscoyier"
  slug-hash="GRVvgLR"
  title="View Transition Staggers with Sass"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

That works in all browsers ([<VPIcon icon="fas fa-globe"/>see support](https://caniuse.com/view-transitions)). It animates (with staggering) in Chrome and Safari, and at this time of this writing, just instantly opens and closes in Firefox (which is fine, just less fancy).

---

## Unique View Transition Names

In order to make the view transition work at all, every single item needs a unique `view-transition-name`. Otherwise the items will not animate on their own. If you ever seen a view transition that has a simple fade-out-fade-in, when you were trying to see movement, it’s probably a problem with unique `view-transition-name`s.

This brings me to my first point. Generating unique `view-transition-name`s is a bit cumbersome. In a “real world” application, it’s probably not *that* big of a deal as you’ll likely be using some kind of templating that could add it. Some variation of this:

```html
<div class="card"
     style="view-transition-name: card-<%= card.id %>">

<!-- turns into -->

<div class="card" 
     style="view-transition-name: card-987adf87aodfasd;">
```

But… you don’t *always* have access to something like that, and even when you do, isn’t it a bit weird that the only real practical way to apply these is from the HTML and not the CSS? Don’t love it. In my simple example, I use Pug to create a loop to do it.

```pug
#grid
  - const items = 10;
  - for (let i = 0; i < items; i++)
    div(style=`view-transition-name: item-${i};`)`
```

That Pug code turns into:

```html
<div id="grid">
  <div style="view-transition-name: item-0;"></div>
  <div style="view-transition-name: item-1;"></div>
  <div style="view-transition-name: item-2;"></div>
  <div style="view-transition-name: item-3;"></div>
  <div style="view-transition-name: item-4;"></div>
  <div style="view-transition-name: item-5;"></div>
  <div style="view-transition-name: item-6;"></div>
  <div style="view-transition-name: item-7;"></div>
  <div style="view-transition-name: item-8;"></div>
  <div style="view-transition-name: item-9;"></div>
</div>
```

Jen Simmons [made the point about how odd this is (<VPIcon icon="iconfont icon-github"/>`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/issues/8320#issuecomment-2023077559).

This is being improved, I hear. [The CSSWG has resolved to (<VPIcon icon="iconfont icon-github"/>`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/issues/8320#issuecomment-2344208387)…

> Add three keywords, one for ID attribute, one for element identity, and one that does fallback between the two.

Which sounds likely we’ll be able to do something like:

```css
#grid {
  > div {
    view-transition-name: auto; 
  }
}
```

This makes me think that it could break in cross-document view transitions, but… I don’t think it actually will if you use the `id` attribute on elements and the `view-transition-name` ends up being based on that. Should be sweet.

---

## Customizing the Animation

We’ve got another issue here. It wasn’t just a Pug loop need to pull of the view transition staggering, it’s a Sass loop as well. That’s because in order to control the animation (applying an `animation-delay` which will achieve the staggering), we need to give a pseudo class selector the `view-transition-name`, which are all unique. So…

```css
::view-transition-group(item-0) {
  animation-delay: 0s;
}
::view-transition-group(item-1) {
  animation-delay: 0.01s;
}
::view-transition-group(item-0) {
  animation-delay: 0.02s;
}
/* etc. */
```

That’s just as cumbersome as the HTML part, except maybe even more-so, as it’s less and less common we even have a CSS processor like Sass to help. If we do, we can do it like this:

```scss
@for $i from 0 through 9 {
  ::view-transition-group(item-#{$i}) {
    animation-delay: $i * 0.01s;
  }
}
```

### Making Our Own Sibling Indexes with Custom Properties

How much do we need to delay each animation in order to stagger it? Well it should be a different timing, probably increasing slightly for each element.

```plaintext title="outptu"
1st element = 0s delay  
2nd element = 0.01s delay  
3rd element - 0.02s delay  
etc
```

How do we know which element is the 1st, 2nd, 3rd, etc? Well we could use `:nth-child(1)`, `:nth-child(2)` etc, but that saves us nothing. We still have super repetitive CSS that all but requires a CSS processor to manage.

Since we’re already applying unique `view-transition-name`s at the HTML level, we could apply the element’s “index” at that level too, like:

```pug
#grid
  - const items = 10;
  - for (let i = 0; i < items; i++)
    div(style=`view-transition-name: item-${i}; --sibling-index: ${i};`) #{icons[i]}`
```

Which gets us that index as a custom property:

```html
<div id="grid">
  <div style="view-transition-name: item-0; --sibling-index: 0;"> </div>
  <div style="view-transition-name: item-1; --sibling-index: 1;"> </div>
  <div style="view-transition-name: item-2; --sibling-index: 2;"> </div>
  <div style="view-transition-name: item-3; --sibling-index: 3;"> </div>
  <div style="view-transition-name: item-4; --sibling-index: 4;"> </div>
  <div style="view-transition-name: item-5; --sibling-index: 5;"> </div>
  <div style="view-transition-name: item-6; --sibling-index: 6;"> </div>
  <div style="view-transition-name: item-7; --sibling-index: 7;"> </div>
  <div style="view-transition-name: item-8; --sibling-index: 8;"> </div>
  <div style="view-transition-name: item-9; --sibling-index: 9;"> </div>
</div>
```

### … but does that actually help us?

Not really?

It seems like we should be able to use that value *rather* than the CSS processor value, like…

```scss
@for $i from 0 through 9 {
  ::view-transition-group(item-#{$i}) {
    animation-delay: calc(var(--sibling-index) * 0.01s);
  }
}
```

But there are two problems with this:

1. We need the Sass loop anyway for the view transition names
2. It doesn’t work

Lolz. There is something about the CSS custom property that doesn’t get applied do the `::view-transition-group` like you would expect it to. Or at least *\*I\** would expect it to. 🤷

---

## Enter `view-transition-class`

There is a way to target and control the CSS animation of *a selected bunch* of elements at once, without having to apply a `::view-transition-group` to *individual* elements. That’s like this:

```scss{3}
#grid {
  > div {
    view-transition-class: item;
  }
}
```

Notice that’s *class* not *name* in the property name. Now we can use that to select all the elements rather than using a loop.

```scss{6-9}
/* Matches a single element with `view-transition-name: item-5` */
::view-transition-group(item-5) {
  animation-delay: 0.05s;
}

/* Matches all elements with `view-transition-class: item` */
::view-transition-group(*.item) {
  animation-delay: 0.05s;
}
```

That `*.` syntax is what makes it use the class instead of the name. That’s how I understand it at least!

So with this, we’re *getting closer* to having staggering working without needing a CSS processor:

```scss
::view-transition-group(*.item) {
  animation-delay: calc(var(--sibling-index) * 0.01s);
}
```

Except: that doesn’t work. It doesn’t work because `--sibling-index` doesn’t seem available to the pseudo class selector we’re using there. I have no idea if that is a bug or not, but it feels like it is to me.

---

## Real Sibling Index in CSS

We’re kinda “faking” sibling index with custom properties here, but we wouldn’t have to do that forever. The [CSSWG has resolved (<VPIcon icon="iconfont icon-github"/>`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/issues/4559#issuecomment-1642880894):

> `sibling-count()` and `sibling-index()` to css-values-5 ED

I’m told Chrome is going to throw engineering at it in Q4 2024, so we should see an implementation soon.

So then mayyyyybe we’d see this working:

```scss
::view-transition-group(*.item) {
  animation-delay: calc(sibling-index() * 0.01s);
}
```

Now that’s enabling view transitions staggering beautifully easily, so I’m going to cross my fingers there.

### Random Stagger

And speaking of newfangled CSS, `random()` should be coming to native CSS at some point somewhat soon as well as I belive that’s been given the thumbs up. So rather than perfectly even staggering, we could do like…

```scss
::view-transition-group(*.item) {
  animation-delay: calc(random() * 0.01s);
}
```

Faking that with Sass if fun!

<CodePen
  user="chriscoyier"
  slug-hash="JjgrNLx"
  title="View Transition Staggers with Sass + Random"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

### Sibling Count is Useful Too

Sometimes you need to know *how many* items there are also, so you can control timing and delays such that, for example, the last animation can end when the first one starts again. Here’s an example from Stephen Shaw with fakes values as Custom Properties showing how that would be used.

<CodePen
  user="shshaw"
  slug-hash="LYEEKMQ"
  title="sibling-count() and sibling-index() fade example"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

One line above could be written removing the need for custom properties:

```scss
/* before */
animation-delay: calc(2s * (var(--sibling-index) / var(--sibling-count)));

/* after */
animation-delay: calc(2s * (sibling-index() / sibling-count()));
```

---

## Overflow is a small bummer

I just noticed while working on this particular demo that during a view transition, the elements that are animating are moved to something like a “top layer” in the document, meaning they do not respect the `overflow` of parent elements and whatnot. See example:

<CodePen
  user="chriscoyier"
  slug-hash="XWveRxx"
  title="View Transition Staggers with Sass Overflow Issue"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

Don’t love that, but I’m sure there are huge tradeoffs that I’m just not aware of. I’ve been told this is actually a desirable trait of view transitions 🤷.

---

## p.s. DevTools Can Inspect This Stuff

In Chrome-based browsers, open the Animations tab and slow down the animations way down.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/10/Screenshot-2024-10-22-at-9.36.15%E2%80%AFAM.png?resize=1012%2C790&ssl=1)

The mid-animation, you can use that Pause icon to literally stop them. It’s just easier to see everything when it’s stopped. Then you’ll see a `:view-transition` element at the top of the DOM and you can drill into it an inspect what’s going on.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/10/Screenshot-2024-10-22-at-9.37.56%E2%80%AFAM.png?resize=810%2C416&ssl=1)

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "View Transitions Staggering",
  "desc": "When you use View Transitions on multiple elements, it can be a very nice look to stagger them out a little bit. It's possible now, but a bit finicky. Let's take a look at some code, present and future, that will help. ",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/view-transitions-staggering.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
