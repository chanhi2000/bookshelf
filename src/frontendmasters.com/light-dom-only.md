---
lang: en-US
title: "Light-DOM-Only Web Components are Sweet"
description: "Article(s) > Light-DOM-Only Web Components are Sweet"
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
      content: "Article(s) > Light-DOM-Only Web Components are Sweet"
    - property: og:description
      content: "Light-DOM-Only Web Components are Sweet"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/light-dom-only.html
prev: /programming/css/articles/README.md
date: 2023-12-08
isOriginal: false
author:
  - name: Chris Coyier
    url : https://frontendmasters.com/blog/author/chriscoyier/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/166
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
  name="Light-DOM-Only Web Components are Sweet"
  desc="First: the Light DOM is just… the regular DOM. When people talk about native Web Components, the Shadow DOM comes up a lot. I have extremely mixed feelings about the Shadow DOM. On one hand, it’s a powerful scoping tool. For example, CSS applied inside the Shadow DOM doesn’t “leak” outside, meaning you can be […]"
  url="https://frontendmasters.com/blog/light-dom-only/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/166"/>

First: the Light DOM is just… the regular DOM.

When people talk about native Web Components, the Shadow DOM comes up a lot. I have extremely mixed feelings about the Shadow DOM. On one hand, it’s a powerful scoping tool. For example, CSS applied inside the Shadow DOM doesn’t “leak” outside, meaning you can be freer with naming and not worry about selector conflicts. Also, JavaScript from the outside can’t reach in, meaning a `querySelectorAll` isn’t going to select things inside the Shadow DOM. It’s a protective barrier that is unique to Web Components. No library can offer this, and that’s cool.

That’s what the Shadow DOM *is.* What it *isn’t* is required for “HTML abstraction”, which I feel like it gets confused for. It had me confused for a while, anyway. If one of your goals for a Web Component is to hide away the HTML implementation details of a component, perhaps for ease-of-use, well, that’s great, but you can do that with the Shadow DOM *or* the Light DOM.

Let’s get into this.

---

## The Guts of a Custom Element Can Become Light DOM

Here’s a custom element defined as `alert-machine`:

```html
<alert-machine>
  <button>I'm a button.</button>
</alert-machine>
```

In order for that to do anything, we need to execute some JavaScript that defines that element and its functionality:

```js
class AlertMachine extends HTMLElement {
  connectedCallback() {
    this.querySelector("button").addEventListener("click", () => {
      alert("Alert machine strikes again.");
    });
  }
}

customElements.define("alert-machine", AlertMachine);
```

I kinda prefer the slightly more elaborate setup with a constructor that allows for methods and such:

```js
class AlertMachine extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.querySelector("button").addEventListener("click", this.doAlert);
  }

  doAlert() {
    alert("Alert machine strikes again.");
  }
}

customElements.define("alert-machine", AlertMachine);
```

Even if this is the first time you’re ever seeing Web Components code like this, you can make sense of it.

What I like about what is happening so far is that `<button>` in the HTML is going to render on the page just like… a… `<button>` in HTML. It’s 100% just like that:

1. It renders like a `<button>`
2. You can select it and style it from regular CSS with `button { }`
3. You can `querySelector` it from regular JavaScript

It’s no different than any other HTML on the page.

But notice the JavaScript *inside* the Web Component is adding a little extra functionality. That’s it. Neat.

<CodePen
  user="chriscoyier"
  slug-hash="PoVpZob"
  title="Light DOM Only Fun"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

---

## You Can Augment or Replace the HTML with Whatever

At this point, you might think:

1. *OK, whatever is inside the custom element is the Light DOM*. And:
2. *Well, that’s pretty limiting. I don’t want to have to be in charge of adding in all the needed HTML for every single component. That doesn’t bring very much value.*

That’s kinda true, but it doesn’t have to be the entire truth. You can totally wipe that away and inject your own HTML. You could keep that HTML but add more, wrapping things or whatever you need to do. Or you could just keep it as is. This is really no different than the possibilities with Shadow DOM. Do what you gotta do. You do lose the ability to use `<slot />`, which is pretty unfortunate, and I wish wasn’t true, but alas.

So if your goal is to abstract away a bunch of HTML to make your component easier to use, go for it!

But you probably should get on board with delivering a good set of HTML within your custom elements right in the delivered HTML. For one, that’s the fallback when JavaScript fails to load or run, which matters. But it’s not just a “fallback” or progressive enhancement technique entirely, it’s what is required for SSR (server-side rendering) which is also a performance concern and I think we all generally agree is a good idea.

While I think the possibility that *not* having a build process for Web Components is attractive, if what the build process buys you is good, solid, HTML, then it’s probably worth it. (I’m mostly thinking of [WebC (<FontIcon icon="iconfont icon-github"/>`11ty/webc`)](https://github.com/11ty/webc) and [<FontIcon icon="fas fa-globe"/>Enhance](https://enhance.dev/) here).

```html
<my-component>
  <div class="card">
    <h2>Good, solid, renderable, accessible, non-embarassing HTML in here.</h2>
  <div>
</my-component>
```

Take, for example, [<FontIcon icon="fas fa-globe"/>the Image Comparison Slider](https://cloudfour.com/thinks/building-an-accessible-image-comparison-web-component/) that Cloud Four put out as a Web Component:

```html
<image-compare>
  <img alt="Alt Text" src="path/to/image.jpg" />
  <img alt="Alt text" src="path/to/image.jpg" />
</image-compare>
```

Just two images! That’s a perfect fallback for this, because two images are exactly what you’re trying to show. But when the comparison slider loads, it’s got all sorts of other HTML that make it do the interactive stuff. That’s perfect.

Their slider *does* use the Shadow DOM, which is fine of course. And actually, they use `<slot />` to put the images into place in the abstracted HTML is pretty useful. But they didn’t *have* to, this all could be done in the Light DOM. It would be a little extra work producing the final HTML, but a hell of a lot easier for consumers to style.

[Jim Nielsen has a nice way of saying it](https://blog.jim-nielsen.com/2023/html-web-components/):

::: info Jim Nielsen (<FontIcon icon="fas fa-globe"/><code>blog.jim-nielsen.com</code>)

> This feature of web components[<FontIcon icon="fas fa-globe"/>encourages a design of composability](https://blog.jim-nielsen.com/2023/as-good-as-html/). Rather than an empty “shell component” that takes data and (using JavaScript exclusively) renders the entirety of its contents, web components encourage an approach of composing core content with HTML and then wrapping it in a custom element that enhances its contents with additional functionality.

```component VPCard
{
  "title": "HTML Web Components",
  "desc": "Writing about the big beautiful mess that is making things for the world wide web.",
  "link": "https://blog.jim-nielsen.com/2023/html-web-components/",
  "logo": "https://blog.jim-nielsen.com/favicon.ico",
  "background": "rgba(66,158,255,0.2)"
}
```

:::

---

## I don’t like styling the Shadow DOM

That’s kind of the rub here, for me. The main reason I’m so hot on Light DOM is that I find the styling story of Web Components using Shadow DOM annoying.

- Styling very specific things with `::part` is a very niche styling thing and to me, not a real styling solution.
- Styling by documenting somewhere that certain CSS `--custom-properties` are in use is also limited and not a real styling solution.
- Styling by injecting a `<style>` tag into some template literal in the JavaScript itself feels awkward and ad hoc to me and I’m not a fan.
- Styling with an adopted stylesheet means an additional web request for each component or back to the template literal thing which is either awkward or slow.

I don’t dislike that these options exist, I just don’t… like them. I’d rather be able to use the best styling API ever: regular CSS. There is some hope here, the idea of [“open stylable shadow roots” (<FontIcon icon="iconfont icon-github"/>`WICG/webcomponents`)](https://github.com/WICG/webcomponents/issues/909) might take hold.

---

## So what are we giving up again?

If you go all-Light-DOM with a Web Component, you lose:

- Encapsulation
- Slots

You gain the ability to use regular ol’ CSS from the parent page to style the thing. And, perhaps, a stronger reminder that Web Components should have good default HTML.

---

## What People Are Saying About Light DOM

They certainly resonate with Eric Meyer!

::: info Blinded By the Light DOM (<FontIcon icon="fas fa-globe"/><code>meyerweb.com</code>)

> I*like*the Light DOM. It’s designed to work together pretty well. This whole high-fantasy-flavored Shadowlands of the DOM thing just doesn’t sit right with me.
> 
> If they do for you, that’s great! Rock on with your bad self. I say all this mostly to set the stage for why I only recently had a breakthrough using web components, and now I quite like them. But not the shadow kind. I’m talking about Fully Light-DOM Components here.

<SiteInfo
  name="Blinded By the Light DOM"
  desc="I only recently had a breakthrough about using web components, and now I quite like them.  But not the shadow kind."
  url="https://meyerweb.com/eric/thoughts/2023/11/01/blinded-by-the-light-dom/"
  logo="https://meyerweb.com/favicon.ico"
  preview="https://meyerweb.com/ui/i/hamonshu/fb-og-image.png"/>

:::

Some baby bear just-right porridge from Jeremy Keith:

::: info HTML web components (<FontIcon icon="fas fa-globe"/><code>adactio.com</code>)

> Dave talks about how web components can be[<FontIcon icon="fas fa-globe"/>HTML with superpowers](https://daverupert.com/2021/10/html-with-superpowers/). I think that’s a good attitude to have. Instead of all-singing, all-dancing web components, it feels a lot more elegant to use web components to augment your existing markup with just enough extra behaviour.
> 
> Where does the shadow DOM come into all of this? It doesn’t. And that’s okay. I’m not saying it should be avoided completely, but it should be a last resort. See how far you can get with the composibility of regular HTML first.

<SiteInfo
  name="HTML web components"
  desc="Don’t replace. Augment."
  url="https://adactio.com/journal/20618/"
  logo="https://adactio.com/favicon-16x16.png"
  preview="https://adactio.com/images/photo-300.jpg"/>

:::

Mayank has a pretty hardline stance, and gets into similar problems I have with styling.

::: info Mayank (<FontIcon icon="fas fa-globe"/><code>mayank.co</code>)

> I’ve previously said[“shadow DOM is not fit for production use”](https://mayank.co/blog/web-components-are-not-components#shadow-dom-is-not-fit-for-production-use), a statement which attracted a surprising amount of heat. Maybe I’m asking for too much, but I would think that every respectable production-grade application has core needs — like accessibility, form participation, and the ability to work without JavaScript.
>
> Today though, I want to touch a little bit on the**styling**side of things.

```component VPCard
{
  "title": "Presentational shadow DOM",
  "desc": "Assorted thoughts on shadow DOM, div soups, and a cursed CSS idea.",
  "link": "https://mayank.co/blog/presentational-shadow-dom//",
  "logo": "https://mayank.co/favicon.ico",
  "background": "rgba(203,198,210,0.2)"
}
```

:::

Jim Neilsen used Light DOM only, found it useful, and even felt weird about it (*which you should not, Jim*)!

::: info Jim Neilsen (<FontIcon icon="fas fa-globe"/><code>blog.jim-nielsen.com</code>)

> Maybe I shouldn’t be using the term “web component” for what I’ve done here. I’m not using shadow DOM. I’m not using the templates or slots. I’m really only using[<FontIcon icon="fa-brands fa-firefox"/>custom elements](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements)to attach functionality to a specific kind of component.
> 
> But it still kinda feels like web components. All of this could’ve been accomplished with regular ole’ web techniques

```component VPCard
{
  "title": "Using Web Components on My Icon Galleries Websites",
  "desc": "Writing about the big beautiful mess that is making things for the world wide web.",
  "link": "https://blog.jim-nielsen.com/2023/web-components-icon-galleries/",
  "logo": "https://blog.jim-nielsen.com/favicon.ico",
  "background": "rgba(66,158,255,0.2)"
}
```

:::

Adam Stoddard is into it:

> No shadow DOM, no templates, just the regular old DOM, which we now get to call the much cooler sounding “light DOM”.

Adam specifically call out how cool the `connectedCallback` is. Whenever a custom element appears in the DOM it essentially auto-instantiates itself, which is an “unsung hero” of Web Components. Dave Rupert’s [<FontIcon icon="fas fa-globe"/>simple and useful `<fit-vids>`](https://daverupert.com/2023/10/fitvids-has-a-web-component-now/) has [no Shadow DOM in sight (<FontIcon icon="iconfont icon-github"/>`davatron5000/fit-vids`)](https://github.com/davatron5000/fit-vids/blob/main/fit-vids.js), it just applies a few styles to what it finds in the Light DOM, but another reason to use it is how it automatically applies the styles when it shows up in the DOM. If you were to use the old school fitvids.js library, you would have to re-call the library if new videos were injected after it ran the first time.

I’ll end with Miriam Suzanne:

::: info Miriam Suzanne (<FontIcon icon="fas fa-globe"/><code>oddbird.net</code>)

> Let the lightDOMhandle content wherever possible.

<SiteInfo
  name="HTML Web Components are Just JavaScript?"
  desc="I'm still getting used to this"
  url="https://oddbird.net/2023/11/17/components/"
  logo="https://oddbird.net/favicon-16x16.png"
  preview="https://oddbird.net/assets/images/blog/2023/oroboros-1600w.jpeg"/>

:::

---

How about y’all? How you feeling about the Light DOM approach?

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Light-DOM-Only Web Components are Sweet",
  "desc": "First: the Light DOM is just… the regular DOM. When people talk about native Web Components, the Shadow DOM comes up a lot. I have extremely mixed feelings about the Shadow DOM. On one hand, it’s a powerful scoping tool. For example, CSS applied inside the Shadow DOM doesn’t “leak” outside, meaning you can be […]",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/light-dom-only.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
