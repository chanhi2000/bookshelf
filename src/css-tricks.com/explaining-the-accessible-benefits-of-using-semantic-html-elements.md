---
lang: en-US
title: "Explaining the Accessible Benefits of Using Semantic HTML Elements"
description: "Article(s) > Explaining the Accessible Benefits of Using Semantic HTML Elements"
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
      content: "Article(s) > Explaining the Accessible Benefits of Using Semantic HTML Elements"
    - property: og:description
      content: "Explaining the Accessible Benefits of Using Semantic HTML Elements"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/explaining-the-accessible-benefits-of-using-semantic-html-elements.html
prev: /programming/css/articles/README.md
date: 2025-11-06
isOriginal: false
author:
  - name: Geoff Graham
    url : https://css-tricks.com/author/geoffgraham/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2019/11/screaming-button.png
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
  name="Explaining the Accessible Benefits of Using Semantic HTML Elements"
  desc="Why should you use a semantic <button> instead of a generic <div>? Accessibility, right? By how exactly does it help accessibility?"
  url="https://css-tricks.com/explaining-the-accessible-benefits-of-using-semantic-html-elements"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2019/11/screaming-button.png"/>

Here’s something you’ll spot in the wild:

```html
<div class="btn" role="button">Custom Button</div>
```

This is one of those [**code smells**](/css-tricks.com/css-code-smells.md) that makes me stop in my tracks because we know there’s a semantic `<button>` element that we can use instead. There’s a whole other thing about conflating anchors (e.g., `<a class="btn">`) and buttons, but that’s not exactly what we’re talking about here, and [**we have a great guide on it**](/css-tricks.com/a-complete-guide-to-links-and-buttons.md).

A semantic `<button>` element makes a lot more sense than reaching for a `<div>` because, well, *semantics*. At least that’s what the code smell triggers for me. I can generically name some of the semantical benefits we get from a `<button>` off the top of my head:

- Interactive states
- Focus indicators
- Keyboard support

But I find myself unable to explicitly define those benefits. They’re more like talking points I’ve retained than clear arguments for using `<button>` over `<div>`. But as I’ve made my way through Sara Soueidan’s [<VPIcon icon="fas fa-globe"/>_Practical Accessibility_ course](https://practical-accessibility.today), I’m getting a much clearer picture of *why* `<button>` is a best practice.

Let’s compare the two approaches:

<CodePen
  user="geoffgraham"
  slug-hash="JoGMdLz"
  title="Div vs. Button"
  :default-tab="['css','result']"
  :theme="dark"/>

Did you know that you can inspect the semantics of these directly in DevTools? I’m ashamed to admit that I didn’t before watching Sara’s course.

![](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/10/Screenshot-2025-10-17-at-10.20.49-AM-430x1024.png?resize=430%2C1024&ssl=1)

![](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/10/Screenshot-2025-10-17-at-10.22.52-AM-440x1024.png?resize=440%2C1024&ssl=1)

There’s clearly a difference between the two “buttons” and it’s more than visual. Notice a few things:

- The `<button>` gets exposed as a `button` role while the `<div>` is a `generic` role. We already knew that.
- The `<button>` gets an accessible label that’s equal to its content.
- The `<button>` is focusable and gets a click listener right out of the box.

I’m not sure exactly *why* someone would reach for a `<div>` over a `<button>`. But if I had to wager a guess, it’s probably because styling `<button>` is tougher that styling a `<div>`. You’ve got to reset all those user agent styles which feels like an extra step in the process when a `<div>` comes with no styling opinions whatsoever, save for it being a block-level element as far as document flow goes.

I don’t get that reasoning when all it take to reset a button’s styles is a CSS one-liner:

<CodePen
  user="geoffgraham"
  slug-hash="jEWZrgX"
  title="Div vs. Button"
  :default-tab="['css','result']"
  :theme="dark"/>

From here, we can use the exact same class to get the exact same appearance:

<CodePen
  user="geoffgraham"
  slug-hash="XJXZjbJ"
  title="Div vs. Button: Unset Styles"
  :default-tab="['css','result']"
  :theme="dark"/>

What seems like more work is the effort it takes to re-create the same built-in benefits we get from a semantic `<button>` specifically for a `<div>`. Sara’s course has given me the exact language to put words to the code smells:

- **The div does not have `Tab` focus by default.** It is not recognized by the browser as an interactive element, even after giving it a button role. The role does not add behavior, only how it is presented to screen readers. We need to give it a `tabindex`.
- **But even then, we can’t operate the button on `Space` or `Return`.** We need to add that interactive behavior as well, likely using a JavaScript listener for a button press to fire a function.
- **Did you know that the `Space` and `Return` keys do different things?** [<VPIcon icon="fas fa-globe"/>Adrian Roselli explains it nicely](https://adrianroselli.com/2022/04/brief-note-on-buttons-enter-and-space.html?Theme=Light), and it was a big TIL moment for me. Probably need different listeners to account for both interactions.
- **And, of course, we need to account for a `disabled` state.** All it takes is a single HTML attribute on a `<button>`, but a `<div>` probably needs yet another function that looks for some sort of data-attribute and then sets `disabled` on it.

*Oh, but hey, we can slap `<div role=button>` on there, right?* It’s super tempting to go there, but all that does is expose the `<div>` as a button to assistive technology. It’s announced as a button, but does nothing to recreate the interactions needed for the complete user experience a `<button>` does. And no amount of styling will fix those semantics, either. We can make a `<div>` look like a button, but it’s not one despite its appearances.

Anyway, that’s all I wanted to share. Using semantic elements where possible is one of those “best practice” statements we pick up along the way. I teach it to my students, but am guilty of relying on the high-level “it helps accessibility” reasoning that is just as generic as a `<div>`. Now I have specific talking points for explaining *why* that’s the case, as well as a “new-to-me” weapon in my DevTools arsenal to inspect and confirm those points.

*Thanks, Sara!* This is merely the tip of the iceberg as far as what I’m learning (and will continue to learn) from [<VPIcon icon="fas fa-globe"/>the course](https://practical-accessibility.today).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Explaining the Accessible Benefits of Using Semantic HTML Elements",
  "desc": "Why should you use a semantic <button> instead of a generic <div>? Accessibility, right? By how exactly does it help accessibility?",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/explaining-the-accessible-benefits-of-using-semantic-html-elements.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
