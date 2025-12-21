---
lang: en-US
title: "Should We Even Have :closed?"
description: "Article(s) > Should We Even Have :closed?"
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
      content: "Article(s) > Should We Even Have :closed?"
    - property: og:description
      content: "Should We Even Have :closed?"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/should-we-even-have-closed.html
prev: /programming/css/articles/README.md
date: 2025-11-20
isOriginal: false
author:
  - name: Sunkanmi Fafowora
    url : https://css-tricks.com/author/sunkanmifafowora/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2018/12/opinon-this-that-signs.png
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
  name="Should We Even Have :closed?"
  desc="Is there really a difference between using :not(:open) and :closed? As always, it depends. Sunkanmi Fafowora explains why :closed is currently not a thing."
  url="https://css-tricks.com/should-we-even-have-closed"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2018/12/opinon-this-that-signs.png"/>

For the past few months, I’ve been writing a lot of entries on pseudo-selectors in CSS, like [<VPIcon icon="iconfont icon-css-tricks"/>`::picker()`](https://css-tricks.com/almanac/pseudo-selectors/p/picker/) or [<VPIcon icon="iconfont icon-css-tricks"/>`::checkmark`](https://css-tricks.com/almanac/pseudo-selectors/c/checkmark/). And, in the process, I noticed I tend to use the `:open` pseudo-selector a lot in my examples — and in my work in general.

Borrowing words from the fine author of the [<VPIcon icon="iconfont icon-css-tricks"/>`:open`](https://css-tricks.com/almanac/pseudo-selectors/o/open/) entry in the Almanac:

> The CSS `:open` pseudo-selector targets elements that support open and closed states — such as the `<details>` and `<select>` elements — and selects them in their **open state**.

So, given this:

```css
details:open {
  background: lightblue;
  color: darkred;
}
```

We expect that the `<details>` element gets a light blue background and dark red text when it is in an open state (everywhere but Safari at the time I’m writing this):

<CodePen
  user="anon"
  slug-hash="gbPRoPp"
  title="initial demo for :open & :closed"
  :default-tab="['css','result']"
  :theme="dark"/>

But what if we want to select the “closed” state instead? That’s what we have the`:closed` pseudo-class for, right? It’s [supposed to match an element’s closed state (<VPIcon icon="iconfont icon-github"/>`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/issues/11039#issuecomment-2414919685). I say, *supposed* because it’s not specced yet.

But does it need to be specced at all? I only ask because we can still target an element’s closed state without it using [<VPIcon icon="iconfont icon-css-tricks"/>`:not()`](https://css-tricks.com/almanac/pseudo-selectors/n/not/):

```css
/* When details is _not_ open, but closed */
details:not(:open) {
  /* ... */
}
```

So, again: do we really need a `:closed` pseudo-class? The answer may surprise you! (Just kidding, this isn’t that sort of article…)

---

## Some background

Talks surrounding `:open` started in May 2022 when [Mason Freed (<VPIcon icon="iconfont icon-github"/>`mfreed7`)](https://github.com/mfreed7) raised [the issue (<VPIcon icon="iconfont icon-github"/>`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/issues/7319#issuecomment-2414693787) of adding `:open` (which was also considered being named `:top-layer` at the time) to target elements in the top layer (like popups):

Today, the OpenUI WC similarly [resolved (<VPIcon icon="iconfont icon-github"/>`openui/open-ui`)](https://github.com/openui/open-ui/issues/470#issuecomment-1138868669) to add a `:top-layer` pseudo class that should apply to (at least) elements using the [<VPIcon icon="fas fa-globe"/>Popup API](https://open-ui.org/components/popup.research.explainer) which are currently in the top layer. The intention for the naming and behavior, though, was that this pseudo class should also be general purpose. It should match any type of element in the top layer, including modal `<dialog>`, fullscreen elements, and `::backdrop` pseudo elements.

This sparked discourse on whether the name of the pseudo-element targeting the top layer of any type of element (e.g., popups, pickers, etc.) should either be `:open` or `:top-layer`. I, for one, was thrilled when the [CSSWG eventually decided on `:open` (<VPIcon icon="iconfont icon-github"/>`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/issues/7319#issuecomment-1225988203) in August 2022. The name makes a lot more sense to me because “open” assumes something in the top layer.

---

## To `:close` or `:not(:open)`?

Hold on, though! In September that same year, Mason asked whether or not we should have something like a `:closed` pseudo-class to accompany `:open`. That way, we can match elements in their “closed” states just as we can their “open” states. That makes a lot of sense, t least on the surface. [Tab Atkins (<VPIcon icon="iconfont icon-github"/>`tabatkins`)](https://github.com/tabatkins) chimed in:

> I love this definition, as I think it captures a concept of “openness” that lines up with what most developers think “open” means. I also think it makes it relatively straightforward for HTML to connect it to specific elements.
> 
> What do folks think?
> 
> Should we also talk about adding the corresponding `:closed` pseudo class? That would avoid the problem that `:not(:open)` *can match anything*, including things that don’t open or close.

And guess what? Everyone seemed to agree. Why? Because it made sense at the time. I mean, since we have a pseudo-class that targets elements in their `:open` state, surely it makes sense to have `:closed` to target elements in their closed states, right? Right??

**No**. There’s actually an issue with that line of reasoning. [Joey Arhar (<VPIcon icon="iconfont icon-github"/>`josepharhar`)](https://github.com/josepharhar) made a [comment about it (<VPIcon icon="iconfont icon-github"/>`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/issues/7319#issuecomment-2414693787) in October that same year:

> I opened a new issue about `:closed` because this doesn’t have consensus yet ([#11039 (<VPIcon icon="iconfont icon-github"/>`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/issues/11039)).

Wait, what happened to consensus? It’s the same question I raised at the top of this post. According to [Luke Warlow (<VPIcon icon="iconfont icon-github"/>`lukewarlow`)](https://github.com/lukewarlow):

> Making `:closed` match things that can never be open feels odd. And would essentially make it `:not(:open)` in which case do we even need `:closed`? Like we don’t have a `:popover-closed` because it’s the inverse of `:popover-open`.

---

## There is no `:closed`… for now

Fast forward one more month to November 2024. A consensus was made to start out with just `:open` and [remove `:closed` for the time being (<VPIcon icon="iconfont icon-github"/>`whatwg/html`)](https://github.com/whatwg/html/pull/10126#issuecomment-2501899670).

Dang. Nevertheless, according to [WHATWG (<VPIcon icon="iconfont icon-github"/>`whatwg/html`)](https://github.com/whatwg/html/pull/10126#issuecomment-2501899670) and [CSSWG (<VPIcon icon="iconfont icon-github"/>`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/issues/11039#issuecomment-2491673891), that decision could change in the future. In fact, [<VPIcon icon="fas fa-globe"/>Bramus](https://bram.us) dropped a useful note in there just a month before WHATWG made the decision:

Just dropping this as an FYI: `:read-only` is defined as `:not(:read-write)`, and [<VPIcon icon="fas fa-globe"/>that shipped](https://html.spec.whatwg.org/multipage/semantics-other.html#selector-read-only).

---

## Which do you find easier to understand?

Personally, I’m okay with `:closed` — or even using `:not(:open)` — so far as it works. In fact, I went ahead swapped `:closed` for `:not(:open)` in my  [<VPIcon icon="iconfont icon-css-tricks"/>`::checkmark`](https://css-tricks.com/almanac/pseudo-selectors/c/checkmark/) and [<VPIcon icon="iconfont icon-css-tricks"/>`::picker()`](https://css-tricks.com/almanac/pseudo-selectors/p/picker/) examples. That’s why they are they way they are today.

But! If you were to ask me which one comes easier to me on a typical day, I think I would say `:closed`. It’s easier for me to think in literal terms than negated statements.

What do you think, though? Would you prefer having `:closed` or just leaving it as `:not(:open)`?

If you’re like me and you love following discussions like this, you can always head over to [CSSWG drafts on GitHub (<VPIcon icon="iconfont icon-github"/>`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts) to watch or participate in the fun.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Should We Even Have :closed?",
  "desc": "Is there really a difference between using :not(:open) and :closed? As always, it depends. Sunkanmi Fafowora explains why :closed is currently not a thing.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/should-we-even-have-closed.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
