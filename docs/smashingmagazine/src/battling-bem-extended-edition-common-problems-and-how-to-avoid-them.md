---
lang: en-US
title: "Battling BEM CSS: 10 Common Problems And How To Avoid Them"
description: "Article(s) > Battling BEM CSS: 10 Common Problems And How To Avoid Them"
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
      content: "Article(s) > Battling BEM CSS: 10 Common Problems And How To Avoid Them"
    - property: og:description
      content: "Battling BEM CSS: 10 Common Problems And How To Avoid Them"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/smashingmagazine.com/battling-bem-extended-edition-common-problems-and-how-to-avoid-them.html
prev: /programming/css/articles/README.md
date: 2016-06-01
isOriginal: false
author:
  - name: David Berner
    url : https://smashingmagazine.com/author/davidberner/
cover: https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/c5ff1e9d-e791-4004-ac3e-106377c999fc/bem-website-tools-opt.png
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
  name="Battling BEM CSS: 10 Common Problems And How To Avoid Them"
  desc="BEM has been an absolute lifesaver for me in my effort to create applications in a modular, component-driven way. David Berner has been using it for nearly three years now, and the problems above are the few stumbling blocks he’s hit along the way. This article aims to be useful for people who are already BEM enthusiasts and wish to use it more effectively or people who are curious to learn more about it.
"
  url="https://smashingmagazine.com/2016/06/battling-bem-extended-edition-common-problems-and-how-to-avoid-them/"
  logo="https://smashingmagazine.com/images/favicon/favicon.svg"
  preview="https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/c5ff1e9d-e791-4004-ac3e-106377c999fc/bem-website-tools-opt.png"/>

BEM has been an absolute lifesaver for me in my effort to create applications in a modular, component-driven way. David Berner has been using it for nearly three years now, and the problems above are the few stumbling blocks he’s hit along the way. This article aims to be useful for people who are already BEM enthusiasts and wish to use it more effectively or people who are curious to learn more about it.

Whether you’ve just discovered BEM or are an old hand (in web terms anyway!), you probably appreciate what a useful methodology it is. If you don’t know what BEM is, I suggest you read about it on the [<VPIcon icon="fas fa-globe"/>BEM website](https://en.bem.info/) before continuing with this post, because I’ll be using terms that assume a basic understanding of this CSS methodology.

![Battling BEM CSS: 10 Common Problems And How To Avoid Them](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/c5ff1e9d-e791-4004-ac3e-106377c999fc/bem-website-tools-opt.png)

This article aims to be useful for people who are already BEM enthusiasts and wish to use it more effectively or people who are curious to learn more about it.

Now, I’m under no illusion that this is a beautiful way to name things. It’s absolutely not. One of things that put me off of adopting it for such a long time was how eye-gougingly ugly the syntax is. The designer in me didn’t want my sexy markup cluttered with dirty double-underscores and foul double-hyphens.

The developer in me looked at it pragmatically. And, eventually, the logical, modular way of building a user interface outweighed the right-side of my brain that complained, “But it’s not pretty enough!”. I certainly don’t recommend picking a living-room centrepiece this way, but when you need a life jacket (as you do in a sea of CSS), I’ll take function over form any day. Anyway, enough rambling. Here are the 10 dilemmas I’ve battled with and some tips on how to deal with them.

---

## 1. “What To Do About ‘Grandchild’ Selectors (And Beyond)?”

To clarify, you would use a grandchild selector when you need to reference an element that is nested two levels deep. These bad boys are the bane of my life, and I’m sure their misuse is one of the reasons people have an immediate aversion to BEM. I’ll give you an example:

```html
<div class="c-card">
  <div class="c-card__header">
    <!-- Here comes the grandchild… -->
    <h2 class="c-card__header__title">Title text here</h2>
  </div>
  <div class="c-card__body">
    <p class="c-card__body__text">Lorem ipsum dolor sit amet, consectetur</p>
    <p class="c-card__body__text">Adipiscing elit.
      <a href="/somelink.html" class="c-card__body__text__link">Pellentesque amet</a>
    </p>
  </div>
</div>
```

As you might imagine, naming in this way can quickly get out of hand, and the more nested a component is, the more hideous and unreadable the class names become. I’ve used a short block name of `c-card` and the short element names of `body`, `text` and `link`, but you can imagine how out of control it gets when the initial block element is named something like `c-drop-down-menu`.

I believe the double-underscore pattern should appear only once in a selector name. BEM stands for `BlockElement–Modifier**`, **not** `BlockElement__Element–Modifier`. So, avoid multiple element level naming. If you’re getting to great-great-great-grandchild levels, then you’ll probably want to revisit your component structure anyway.

BEM naming isn’t strictly tied to the DOM, so it doesn’t matter how many levels deep a descendent element is nested. The naming convention is there to help you identify relationships with the top-level component block — in this case, `c-card`.

This is how I would treat the same card component:

```html
<div class="c-card">
  <div class="c-card__header">
    <h2 class="c-card__title">Title text here</h2>
  </div>

  <div class="c-card__body">
    <img class="c-card__img" src="some-img.png" alt="description">
    <p class="c-card__text">Lorem ipsum dolor sit amet, consectetur</p>
    <p class="c-card__text">Adipiscing elit.
      <a href="/somelink.html" class="c-card__link">Pellentesque amet</a>
    </p>
  </div>
</div>
```

This means that all of the descendent elements will be affected only by the card block. So, we would be able to move the text and images into `c-card**header**` **or even introduce a new `c-card`**`footer` element without breaking the semantic structure.

---

## 2. “Should I Be Namespacing?”

By now, you’ve probably noticed the use of `c-` littered throughout my code samples. This stands for “component” and forms the basis of how I namespace my BEM classes. This idea stems from Harry Robert’s [<VPIcon icon="fas fa-globe"/>namespacing technique](https://csswizardry.com/2015/03/more-transparent-ui-code-with-namespaces/), which improves code readability.

This is the system I have adopted, and many of the prefixes will appear throughout the code samples in this article:

| Type | Prefix | Examples | Description |
| --- | --- | --- | --- |
| Component | `c-` | `c-card` `c-checklist` | Form the backbone of an application and contain all of the cosmetics for a standalone component. |
| Layout module | `l-` | `l-grid` `l-container` | These modules have no cosmetics and are purely used to position `c-` components and structure an application’s layout. |
| Helpers | `h-` | `h-show` `h-hide` | These utility classes have a single function, often using `!important` to boost their specificity. (Commonly used for positioning or visibility.) |
| States | `is-`, `has-` | `is-visible` `has-loaded` | Indicate different states that a `c-` component can have. More detail on this concept can be found inside problem 6 below, but |
| JavaScript hooks | `js-` | `js-tab-switcher` | These indicate that JavaScript behavior is attached to a component. No styles should be associated with them; they are purely used to enable easier manipulation with script. |

I have found that using these namespaces has made my code infinitely more readable. Even if I don’t manage to sell you on BEM, this is definitely a key takeaway.

You could adopt many other namespaces, like `qa-` for quality-assurance testing, `ss-` for server-side hooks, etc. But the list above is a good starting point, and you can introduce others as you get comfortable with the technique.

You’ll see a good example of the utility of this style of namespacing in the next problem.

---

## 3. “What Should I Name Wrappers?”

Some components require a parent wrapper (or container) that dictates the layout of the children. In these cases, I always try to abstract the layout away into a layout module, such as `l-grid`, and insert each component as the contents of each `l-grid__item`.

In our card example, if we wanted to lay out a list of four `c-card`s, I would use the following markup:

```html
<ul class="l-grid">
  <li class="l-grid__item">
    <div class="c-card">
      <div class="c-card__header">[…]</div>
      <div class="c-card__body">[…]</div>
    </div>
  </li>
  <li class="l-grid__item">
    <div class="c-card">
      <div class="c-card__header">[…]</div>
      <div class="c-card__body">[…]</div>
    </div>
  </li>
  <li class="l-grid__item">
    <div class="c-card">
      <div class="c-card__header">[…]</div>
      <div class="c-card__body">[…]</div>
    </div>
  </li>
  <li class="l-grid__item">
    <div class="c-card">
      <div class="c-card__header">[…]</div>
      <div class="c-card__body">[…]</div>
    </div>
  </li>
</ul>

```

You should now have a solid idea of how layout modules and component namespaces should play together.

Don’t be afraid to use a little extra markup to save yourself a massive headache. No one is going to pat you on the back for shaving off a couple of `<div>` tags!

In some instances, this isn’t possible. If, for example, your grid isn’t going to give you the result you want or you simply want something semantic to name a parent element, what should you do? I tend to opt for the word `container` or `list`, depending on the scenario. Sticking with our cards example, I might use `<div class="l-cards-container">[…]</div>` or `<ul class="l-cards-list">[…]</ul>`, depending on the use case. The key is to be consistent with your naming convention.

---

## 4. “Cross-Component… Components?”

Another issue commonly faced is a component whose styling or positioning is affected by its parent container. Various solutions to this problem are [<VPIcon icon="fas fa-globe"/>covered in detail by Simurai](https://simurai.com/blog/2015/05/11/nesting-components). I’ll just fill you in on what I believe is the most scalable approach.

To summarize, let’s assume we want to add a `c-button` into the `card__body` of our previous example. The button is already its own component and is marked up like this:

```html
<button class="c-button c-button--primary">Click me!</button>
```

If there are no styling differences in the regular button component, then there is no problem. We would just drop it in like so:

```html
<div class="c-card">
  <div class="c-card__header">
    <h2 class="c-card__title">Title text here</h3>
  </div>
  <div class="c-card__body">
    <img class="c-card__img" src="some-img.png">
    <p class="c-card__text">Lorem ipsum dolor sit amet, consectetur</p>
    <p class="c-card__text">Adipiscing elit. Pellentesque.</p>

    <!-- Our nested button component -->
    <button class="c-button c-button--primary">Click me!</button>
  </div>
</div>
```

However, what happens when there are a few subtle styling differences — for example, we want to make it a bit smaller, with fully rounded corners, but only when it’s a part of a `c-card` component?

Previously, I stated that I find a cross-component class to be the most robust solution:

```html
<div class="c-card">
  <div class="c-card__header">
    <h2 class="c-card__title">Title text here</h3>
  </div>

  <div class="c-card__body">
    <img class="c-card__img" src="some-img.png">
    <p class="c-card__text">Lorem ipsum dolor sit amet, consectetur</p>
    <p class="c-card__text">Adipiscing elit. Pellentesque.</p>

    <!-- My *old* cross-component approach -->
    <button class="c-button c-card__c-button">Click me!</button>
  </div>
</div>
```

This is what is [<VPIcon icon="fas fa-globe"/>known on the BEM website](https://en.bem.info/forum/4/) as a “mix.” I have, however, changed my stance on this approach, following some great comments from Esteban Lussich.

In the example above, the `c-card__c-button` class is trying to modify one or more existing properties of `c-button`, but it will depend on the source order (or even specificity) in order to successfully apply them. The `c-card__c-button` class will work only if it is declared after the `c-button` block in the source code, which could quickly get out of hand as you build more of these cross-components. (Whacking on an `!important` is, of course, an option, but I certainly wouldn’t encourage it!)

The cosmetics of a truly modular UI element should be totally agnostic of the element’s parent container — it should look the same regardless of where you drop it. Adding a class from another component for bespoke styling, as the “mix” approach does, violates the [<VPIcon icon="fa-brands fa-wikipedia-w"/>open/closed](https://en.wikipedia.org/wiki/Open/closed_principle) principle of component-driven design — i.e there should be no dependency on another module for aesthetics.

Your best bet is to use a modifier for these small cosmetic differences, because you may well find that you wish to reuse them elsewhere as your project grows.

```html
<button class="c-button c-button--rounded c-button--small">Click me!</button>
```

Even if you never use those additional classes again, at least you won’t be tied to the parent container, specificity or source order to apply the modifications.

Of course, the other option is to go back to your designer and tell them that the button should be consistent with the rest of the buttons on the website and to avoid this issue altogether… but that’s one for another day.

---

## 5. “Modifier Or New Component?”

One of the biggest problems is deciding where a component ends and a new one begins. In the `c-card` example, you might later create another component named `c-panel` with very similar styling attributes but a few noticeable differences.

But what determines whether there should be two components, `c-panel` and `c-card`, or simply a modifier for `c-card` that applies the unique styles?

It’s very easy to over-modularize and make everything a component. I recommend starting with modifiers, but if you find that your specific component CSS file is getting difficult to manage, then it’s probably time to break out a few of those modifiers. A good indicator is when you find yourself having to reset all of the “block” CSS in order to style your new modifier — this, to me, suggests new component time.

The best way, if you work with other developers or designers, is to ask them for an opinion. Grab them for a couple of minutes and discuss it. I know this answer is a bit of a cop-out, but for a large application, it’s vital that you all understand what modules are available and agree on exactly what constitutes a component.

---

## 6. “How To Handle States?”

This is a common problem, particularly when you’re styling a component in an active or open state. Let’s say our cards have an active state; so, when clicked on, they stand out with a nice border styling treatment. How do you go about naming that class?

The way I see it, you have two options really: either a standalone state hook or a BEM-like naming modifier at the component level:

```html
<!-- standalone state hook -->
<div class="c-card is-active">
  […]
</div>

<!-- or BEM modifier -->
<div class="c-card c-card--is-active">
  […]
</div>
```

While I like the idea of keeping the BEM-like naming for consistency, the advantage of the standalone class is that it makes it easy to use JavaScript to apply generic state hooks to any component. When you have to apply specific modifier-based state classes with script, this becomes more problematic. It is, of course, entirely possible, but it means writing a lot more [<VPIcon icon="fas fa-globe"/>JavaScript](https://smashingmagazine.com/tag/javascript) for each possibility.

Sticking to a standard set of state hooks makes sense. Chris Pearce has [compiled a good list (<VPIcon icon="iconfont icon-github"/>`chris-pearce/css-guidelines`)](https://github.com/chris-pearce/css-guidelines#state-hooks), so I recommend just pinching those.

---

## 7. “When Is It OK **Not** To Add A Class To An Element?”

I can understand people being overwhelmed by the sheer number of classes required to build a complex piece of UI, especially if they’re not used to assigning a class to every tag.

Typically, I will attach classes to anything that needs to be styled differently in the context of the component. I will often leave `p` tags classless, unless the component requires them to look unique in that context.

Granted, this could mean your markup will contain a lot of classes. Ultimately, though, your components will be able to live independently and be dropped anywhere without a risk of side effects.

Due to the global nature of CSS, putting a class on everything gives us control over exactly how our components render. The initial mental discomfort caused is well worth the benefits of a fully modular system.

---

## 8. “How To Nest Components?”

Suppose we want to display a checklist in our `c-card` component. Here is a demonstation of how **not** to mark this up:

```xml
<div class="c-card">
  <div class="c-card__header">
    <h2 class="c-card__title">Title text here</h3>
  </div>

  <div class="c-card__body">
    <p>I would like to buy:</p>

    <!-- Uh oh! A nested component -->
    <ul class="c-card__checklist">
      <li class="c-card__checklist__item">
        <input id="option_1" type="checkbox" name="checkbox" class="c-card__checklist__input">
        <label for="option_1" class="c-card__checklist__label">Apples</label>
      </li>
      <li class="c-card__checklist__item">
        <input id="option_2" type="checkbox" name="checkbox" class="c-card__checklist__input">
        <label for="option_2" class="c-card__checklist__label">Pears</label>
      </li>
     </ul>
  </div>
  <!-- .c-card__body -->
</div>
<!-- .c-card -->
```

We have a couple of problems here. One is the grandparent selector that we covered in section 1. The second is that all of the styles applied to `c-card**checklist**item` are scoped to this specific use case and won’t be reusable.

My preference here would be to break out the list itself into a layout module and the checklist items into their own components, enabling them to be used independently elsewhere. This brings our `l-` namespacing back into play as well:

```html
<div class="c-card">
  <div class="c-card__header">
    <h2 class="c-card__title">Title text here</h3>
  </div>

  <div class="c-card__body">
    <p>I would like to buy:</p>

    <!-- Much nicer - a layout module -->
    <ul class="l-list">
      <li class="l-list__item">

        <!-- A reusable nested component -->
        <div class="c-checkbox">
          <input id="option_1" type="checkbox" name="checkbox" class="c-checkbox__input">
          <label for="option_1" class="c-checkbox__label">Apples</label>
        </div>
      </li>
      <li class="l-list__item">
        <div class="c-checkbox">
          <input id="option_2" type="checkbox" name="checkbox" class="c-checkbox__input">
          <label for="option_2" class="c-checkbox__label">Pears</label>
        </div>
      </li>
    </ul>
    <!-- .l-list -->

    </div>
    <!-- .c-card__body -->
</div>
<!-- .c-card -->
```

This saves you from having to repeat the styles, and it means we can use both the `l-list` and `c-checkbox` in other areas of our application. It does mean a little more markup, but it’s a small price to pay for readability, encapsulation and reusability. You’ve probably noticed these are common themes!

---

## 9. “Won’t Components End Up With A Million Classes?”

Some argue that having a lot of classes per element is not great, and `–modifiers` can certainly add up. Personally, I don’t find this to be problematic, because it means the code is more readable and I know exactly what it is supposed to be doing.

For context, this is an example of four classes being needed to style a button:

```html
<button class="c-button c-button--primary c-button--huge  is-active">Click me!</button>
```

I get that this syntax is not the prettiest to gaze upon, but it is explicit.

However, if this is giving you a major headache, you could look at the extension technique that Sergey Zarouski came up with. Essentially, we would use `.className [class^=“className”], [class*=” className”]` in the style sheet to emulate extension functionality in vanilla CSS. If this syntax looks familiar to you, that’s because it is very similar to the way [<VPIcon icon="fas fa-globe"/>Icomoon](https://icomoon.io/) handles its icon selectors.

With this technique, your output might look something like this:

```html
<button class="c-button--primary-huge  is-active">Click me!</button>
```

I don’t know whether the performance hit of using the `class^=` and `class*=` selectors is much greater than using individual classes at scale, but in theory this is a cool alternative. I’m fine with the multi-class option myself, but I thought this deserved a mention for those who prefer an alternative.

---

## 10. “Can We Change A Component’s Type Responsively?”

This was a problem posed to me by Arie Thulank and is one for which I struggled to come up with a 100% concrete solution.

An example of this might be a dropdown menu that converts to a set of tabs at a given breakpoint, or offscreen navigation that switches to a menu bar at a given breakpoint.

Essentially, one component would have two very different cosmetic treatments, dictated by a media query.

My inclination for these two particular examples is just to build a `c-navigation` component, because at both breakpoints this is essentially what it is doing. But it got me thinking, what about a list of images that converts to a carousel on bigger screens? This seems like an edge case to me, and as long as it is well documented and commented, I think it is perfectly reasonable to create a one-off standalone component for this type of UI, with explicit naming (like `c-image-list-to-carousel`).

Harry Roberts has written about [<VPIcon icon="fas fa-globe"/>responsive suffixes](https://csswizardry.com/2015/08/bemit-taking-the-bem-naming-convention-a-step-further/), which is one way to handle this. His approach is intended more for changes in layout and print styles, rather than shifts of entire components, but I don’t see why the technique couldn’t be applied here. So, essentially you would author classes like this:

```xml
<ul class="c-image-list@small-screen c-carousel@large-screen">
```

These would then live in your media queries for the respective screen sizes. Pro tip: You have to escape the `@` sign in your CSS with a backslash, like so:

```css
.c-image-list\@small-screen {
    /* styles here */
}
```

I haven’t had much cause to create these type of components, but this feels like a very developer-friendly way to do it, if you have to. The next person coming in should be able to easily understand your intention. I’m not advocating for names like `small-screen` and `large-screen` — they are used here purely for readability.

---

## Summary

BEM has been an absolute lifesaver for me in my effort to create applications in a modular, component-driven way. I’ve been using it for nearly three years now, and the problems above are the few stumbling blocks I’ve hit along the way. I hope you’ve found this article useful, and if you’ve not given BEM a go yet, I highly encourage you to do so.

::: note

This is an enhanced version of my original article “[Battling BEM: 5 Common Problems and How to Avoid Them (<VPIcon icon="fa-brands fa-medium"/>`fed-or-dead`)](https://medium.com/fed-or-dead/battling-bem-5-common-problems-and-how-to-avoid-them-5bbd23dee319#.xbw2qszc1),” which appeared on Medium. I’ve added five more common problems, (some of which were asked about in the comments of that article) and I have altered my views on one of the original problems.

:::

::: info Further Reading

```component VPCard
{
  "title": "BEM: A New Front-End Methodology",
  "desc": "This article is the sixth in our new series that introduces the latest, useful and freely available tools and techniques, developed and released by active members of the Web design community. The first article covered PrefixFree the second introduced Foundation, a responsive framework; the third presented Sisyphus.js, a library for Gmail-like client-side drafts, the fourth covered a free plugin called GuideGuide and the fifth presented Erskine Design's responsive grid generator Gridpak. Today, we are happy to feature a toolkit devised by Yandex: BEM.",
  "link": "/smashingmagazine.com/a-new-front-end-methodology-bem.md",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```

```component VPCard
{
  "title": "Scaling Down The BEM Methodology For Small Projects",
  "desc": "To make the right choices for your project, you need to start with a general approach, or methodology. You probably already know of BEM, one of those methodologies developed by a big company, but Maxim Shirshin decided to try BEM on a smaller scale. He wanted the same benefits that Yandex gets from BEM: code sharing, a live style guide, scalability, faster development. He is now convinced that BEM applies to small projects as well. Maxim has written down his findings, in case you find them useful!",
  "link": "/smashingmagazine.com/bem-methodology-for-small-projects.md",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```

```component VPCard
{
  "title": "The Evolution Of The BEM Methodology",
  "desc": "In this article, Maxim Shirshin will introduce us to the history of the BEM methodology. BEM is a collection of ideas and methods. Companies and teams can integrate it into their existing workflow gradually, finding out what works best for them, using a unified language that consists of powerful terms: blocks, elements, modifiers. Learn about the challenges that a big company faces when gradually building an entire ecosystem of services with an ever-growing team of developers.
",
  "link": "/smashingmagazine.com/the-history-of-the-bem-methodology.md",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```

- [**Getting Started With Neon Branching**](/smashingmagazine.com/getting-started-with-neon-branching.md)

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Battling BEM CSS: 10 Common Problems And How To Avoid Them",
  "desc": "BEM has been an absolute lifesaver for me in my effort to create applications in a modular, component-driven way. David Berner has been using it for nearly three years now, and the problems above are the few stumbling blocks he’s hit along the way. This article aims to be useful for people who are already BEM enthusiasts and wish to use it more effectively or people who are curious to learn more about it.",
  "link": "https://chanhi2000.github.io/bookshelf/smashingmagazine.com/battling-bem-extended-edition-common-problems-and-how-to-avoid-them.html",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```
