---
lang: en-US
title: "Getting Creative With HTML Dialog"
description: "Article(s) > Getting Creative With HTML Dialog"
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
      content: "Article(s) > Getting Creative With HTML Dialog"
    - property: og:description
      content: "Getting Creative With HTML Dialog"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/getting-creative-with-html-dialog.html
prev: /programming/css/articles/README.md
date: 2025-06-03
isOriginal: false
author:
  - name: Andy Clarke
    url : https://css-tricks.com/author/andyclarke/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/05/s_EE59C5A105545DD153C51E60D867441DC316D04D9E44A41B5CC2A0033D85A746_1747693352461_2025-05-17-3.webp
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
  name="Getting Creative With HTML Dialog"
  desc="So, how can you take dialogue box design beyond the generic look of frameworks and templates? How can you style them to reflect a brand’s visual identity and help to tell its stories? Here’s how I do it in CSS using ::backdrop, backdrop-filter, and animations."
  url="https://css-tricks.com/getting-creative-with-html-dialog"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/05/s_EE59C5A105545DD153C51E60D867441DC316D04D9E44A41B5CC2A0033D85A746_1747693352461_2025-05-17-3.webp"/>

Like ’em or loath ’em, whether you’re showing an alert, a message, or a newsletter signup, dialogue boxes draw attention to a particular piece of content without sending someone to a different page. In the past, dialogues relied on a mix of divisions, ARIA, and JavaScript. But the [**HTML `dialog` element**](/css-tricks.com/some-hands-on-with-the-html-dialog-element.md) has made them more accessible and style-able in countless ways.

So, how can you take dialogue box design beyond the generic look of frameworks and templates? How can you style them to reflect a brand’s visual identity and help to tell its stories? Here’s how I do it in CSS using [<VPIcon icon="iconfont icon-css-tricks"/>`::backdrop`](https://css-tricks.com/almanac/pseudo-selectors/b/backdrop/), [<VPIcon icon="iconfont icon-css-tricks"/>`backdrop-filter`](https://css-tricks.com/almanac/properties/b/backdrop-filter/), and animations.

![Design by Andy Clarke, Stuff & Nonsense. Mike Worth’s website will launch in June 2025, but you can see examples from this article on CodePen.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/05/6Cols-BQ.png?resize=1600%2C1080&ssl=1)

I mentioned [**before**](/css-tricks.com/revisiting-css-border-image.md) that Emmy-award-winning game composer Mike Worth hired me to create a highly graphical design. Mike loves ’90s animation, and he challenged me to find ways to incorporate its retro style without making a pastiche. However, I also needed to achieve that retro feel while maintaining accessibility, performance, responsiveness, and semantics.

---

## A brief overview of `dialog` and `::backdrop`

Let’s run through a quick refresher.

::: note

While I mostly refer to “dialogue boxes” throughout, the HTML element is spelt `dialog`.

:::

`dialog` is an HTML element designed for implementing modal and non-modal dialogue boxes in products and website interfaces. It comes with built-in functionality, including closing a box using the keyboard `Esc` key, focus trapping to keep it inside the box, show and hide methods, and a `::backdrop` pseudo-element for styling a box’s overlay.

The HTML markup is just what you might expect:

```html
<dialog>
  <h2>Keep me informed</h2>
  <!-- ... -->
  <button>Close</button>
</dialog>
```

This type of dialogue box is hidden by default, but adding the `open` attribute makes it visible when the page loads:

```html
<dialog open>
  <h2>Keep me informed</h2>
  <!-- ... -->
  <button>Close</button>
</dialog>
```

I can’t imagine too many applications for non-modals which are open by default, so ordinarily I need a button which opens a dialogue box:

```html
<dialog>
  <!-- ... -->
</dialog>
<button>Keep me informed</button>
```

Plus a little bit of JavaScript, which opens the modal:

```js
const dialog = document.querySelector("dialog");
const showButton = document.querySelector("dialog + button");
showButton.addEventListener("click", () => {
  dialog.showModal();
});
```

Closing a dialogue box also requires JavaScript:

```js
const closeButton = document.querySelector("dialog button");
closeButton.addEventListener("click", () => {
  dialog.close();
});
```

Unless the box contains a form using `method="dialog"`, which allows it to close automatically on submit without JavaScript:

```html
<dialog>
  <form method="dialog">
    <button>Submit</button>
  </form>
</dialog>
```

The `dialog` element was developed to be accessible out of the box. It traps focus, supports the `Esc` key, and behaves like a proper modal. But to help screen readers announce dialogue boxes properly, you’ll want to add an `aria-labelledby` attribute. This tells assistive technology where to find the dialogue box’s title so it can be read aloud when the modal opens.

```html
<dialog aria-labelledby="dialog-title">
  <h2 id="dialog-title">Keep me informed</h2>
  <!-- ... -->
</dialog>
```

Most tutorials I’ve seen include very little styling for `dialog` and `::backdrop`, which might explain why so many dialogue boxes have little more than border radii and a `box-shadow` applied.

![Out-of-the-box dialogue designs](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/05/s_EE59C5A105545DD153C51E60D867441DC316D04D9E44A41B5CC2A0033D85A746_1747693318934_2025-05-17-2.webp?resize=1600%2C1080&ssl=1)

I believe that every element in a design — no matter how small or infrequently seen — is an opportunity to present a brand and tell a story about its products or services. I know there are moments during someone’s journey through a design where paying special attention to design can make their experience more memorable.

Dialogue boxes are just one of those moments, and Mike Worth’s design offers plenty of opportunities to reflect his brand or connect directly to someone’s place in Mike’s story. That might be by styling a newsletter sign-up dialogue to match the scrolls in his news section.

![Mike Worth concept design, designed by Andy Clarke, Stuff & Nonsense.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/05/s_EE59C5A105545DD153C51E60D867441DC316D04D9E44A41B5CC2A0033D85A746_1747693352461_2025-05-17-3-1.webp?resize=1600%2C1080&ssl=1)

Or making the form modal on his error pages look like a comic-book speech balloon.

![Mike Worth concept design, designed by Andy Clarke, Stuff & Nonsense.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/05/s_EE59C5A105545DD153C51E60D867441DC316D04D9E44A41B5CC2A0033D85A746_1747693372945_2025-05-17-4.webp?resize=1600%2C1080&ssl=1)

---

## `dialog` in action

Mike’s drop-down navigation menu looks like an ancient stone tablet.

![Mike Worth, designed by Andy Clarke, Stuff & Nonsense.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/05/s_EE59C5A105545DD153C51E60D867441DC316D04D9E44A41B5CC2A0033D85A746_1747693396867_2025-05-17-5.webp?resize=1600%2C1080&ssl=1)

I wanted to extend this look to his dialogue boxes with a three-dimensional tablet and a jungle leaf-filled backdrop.

![Mike Worth, designed by Andy Clarke, Stuff & Nonsense.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/05/dialog.webp?resize=1600%2C1080&ssl=1)

This `dialog` contains a newsletter sign-up form with an email input and a submit button:

```html
<dialog>
  <h2>Keep me informed</h2>
  <form>
    <label for="email" data-visibility="hidden">Email address</label>
    <input type="email" id="email" required>
    <button>Submit</button>
  </form>
  <button>x</button>
</dialog>
```

I started by applying dimensions to the `dialog` and adding the SVG stone tablet background image:

```css
dialog {
  width: 420px;
  height: 480px;
  background-color: transparent;
  background-image: url("dialog.svg");
  background-repeat: no-repeat;
  background-size: contain;
}
```

Then, I added the leafy green background image to the dialogue box’s generated backdrop using the `::backdrop` pseudo element selector:

```css
dialog::backdrop {
  background-image: url("backdrop.svg");
  background-size: cover;
}
```

![Mike Worth, designed by Andy Clarke, Stuff & Nonsense.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/05/dialog-signup-form.webp?resize=1600%2C1080)

I needed to make it clear to anyone filling in Mike’s form that their email address is in a valid format. So I combined [<VPIcon icon="iconfont icon-css-tricks"/>`:has`](https://css-tricks.com/almanac/pseudo-selectors/h/has/) and [<VPIcon icon="iconfont icon-css-tricks"/>`:valid`](https://css-tricks.com/almanac/pseudo-selectors/v/valid/) CSS pseudo-class selectors to change the color of the submit button from grey to green:

```css
dialog:has(input:valid) button {
  background-color: #7e8943;
  color: #fff;
}
```

I also wanted this interaction to reflect Mike’s fun personality. So, I also changed the `dialog` background image and applied a rubberband animation to the box when someone inputs a valid email address:

```css
dialog:has(input:valid) {
  background-image: url("dialog-valid.svg");
  animation: rubberBand 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
}

@keyframes rubberBand {
  from { transform: scale3d(1, 1, 1); }
  30% { transform: scale3d(1.25, 0.75, 1); }
  40% { transform: scale3d(0.75, 1.25, 1); }
  50% { transform: scale3d(1.15, 0.85, 1); }
  65% { transform: scale3d(0.95, 1.05, 1); }
  75% { transform: scale3d(1.05, 0.95, 1); }
  to { transform: scale3d(1, 1, 1); }
}
```

::: tip

Daniel Eden’s [<VPIcon icon="fas fa-globe"/>Animate.css library](https://animate.style) is a fabulous source of “Just-add-water CSS animations” like the rubberband I used for this dialogue box.

:::

Changing how an element looks when it contains a valid input is a fabulous way to add interactions that are, at the same time, fun and valuable for the user.

![Mike Worth, designed by Andy Clarke, Stuff & Nonsense.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/05/s_EE59C5A105545DD153C51E60D867441DC316D04D9E44A41B5CC2A0033D85A746_1747693579867_2025-05-17-7-3.webp?resize=1600%2C1080&ssl=1)

That combination of `:has` and `:valid` selectors can even be extended to the `::backdrop` pseudo-class, to change the backdrop’s background image:

```css
dialog:has(input:valid)::backdrop {
  background-image: url("backdrop-valid.svg");
}
```

Try it for yourself:

<CodePen
  user="anon"
  slug-hash="preview/OPPYQjZ"
  title="Mike Worth’s dialog"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Conclusion

We often think of dialogue boxes as functional elements, as necessary interruptions, but nothing more. But when you treat them as opportunities for expression, even the smallest parts of a design can help shape a product or website’s personality.

The HTML `dialog` element, with its built-in behaviours and styling potential, opens up opportunities for branding and creative storytelling. There’s no reason a dialogue box can’t be as distinctive as the rest of your design.

---

## Andy Clarke

Often referred to as one of the pioneers of web design, [<VPIcon icon="fas fa-globe"/>Andy Clarke](https://stuffandnonsense.co.uk/) has been instrumental in pushing the boundaries of web design and is known for his creative and visually stunning designs. His work has inspired countless designers to explore the full potential of product and website design.

Andy’s written several industry-leading books, including ‘Transcending CSS,’ ‘Hardboiled Web Design,’ and ‘Art Direction for the Web.’ He’s also worked with businesses of all sizes and industries to achieve their goals through design.

Visit Andy’s studio, [<VPIcon icon="fas fa-globe"/>Stuff & Nonsense](https://stuffandnonsense.co.uk/), and check out his [<VPIcon icon="fas fa-globe"/>Contract Killer](https://stuffandnonsense.co.uk/projects/contract-killer), the popular web design contract template trusted by thousands of web designers and developers.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Getting Creative With HTML Dialog",
  "desc": "So, how can you take dialogue box design beyond the generic look of frameworks and templates? How can you style them to reflect a brand’s visual identity and help to tell its stories? Here’s how I do it in CSS using ::backdrop, backdrop-filter, and animations.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/getting-creative-with-html-dialog.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
