---
lang: en-US
title: "I Learned The First Rule of ARIA the Hard Way"
description: "Article(s) > I Learned The First Rule of ARIA the Hard Way"
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
      content: "Article(s) > I Learned The First Rule of ARIA the Hard Way"
    - property: og:description
      content: "I Learned The First Rule of ARIA the Hard Way"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/i-learned-the-first-rule-of-aria-the-hard-way.html
prev: /programming/css/articles/README.md
date: 2026-01-21
isOriginal: false
author:
  - name: Hashim Quraishi
    url : https://css-tricks.com/author/hashimquraishi/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2020/08/accessibility-a11y.png
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
  name="I Learned The First Rule of ARIA the Hard Way"
  desc="Semantic HTML does a lot more accessibility work than we usually give it credit for already — and ARIA is simple to abuse when we use it both as a shortcut and as a supplement."
  url="https://css-tricks.com/i-learned-the-first-rule-of-aria-the-hard-way"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2020/08/accessibility-a11y.png"/>

Some time ago, I shipped a component that felt accessible by every measure I could test. Keyboard navigation worked. ARIA roles were correctly applied. Automated audits passed without a single complaint. And yet, a screen reader user couldn’t figure out how to trigger it. When I tested it myself with keyboard-only navigation and NVDA, I saw the same thing: the interaction simply didn’t behave the way I expected.

Nothing on the checklist flagged an error. Technically, everything was “right.” But in practice, the component wasn’t predictable. Here’s a simplified version of the component that caused the issue:

<CodePen
  user="anon"
  slug-hash="qENBxzP"
  title="Button with role='link' (ARIA misuse)"
  :default-tab="['css','result']"
  :theme="dark"/>

As you can see in the demo, the markup is not at all complicated:

```html
<button class="cta" role="link">Save changes</button>
```

And the fix was much easier than expected. I had to delete the ARIA `role` attribute that I had added with the best intentions.

<CodePen
  user="anon"
  slug-hash="LEZYdwq"
  title="Fixed: Native Button Without ARIA"
  :default-tab="['css','result']"
  :theme="dark"/>

The markup is even less complicated than before:

```html
<button class="cta">Save changes</button>
```

That experience changed how I think about accessibility. The biggest lesson was this: **Semantic HTML does a lot more accessibility work than we usually give it credit for already — and ARIA is simple to abuse when we use it both as a shortcut and as a supplement.**

Many of us already know [<VPIcon icon="iconfont icon-w3c"/>the first rule of ARIA](https://w3.org/TR/using-aria/#secondrule): don’t use it. Well, use it. But not if the accessible benefits and functionality you need are already baked in, which it was in my case before adding the `role` attribute.

Let me outline exactly what happened, step-by-step, because I think the my error is actually a pretty common practice. There are many articles out there that say exactly what I’m saying here, but I think it often helps to internalize it by hearing it through a real-life experience.

::: note

This article was tested using keyboard navigation and a screen reader (NVDA) to observe real interaction behavior across native and ARIA-modified elements.

:::

---

## 1: Start with the simplest possible markup

Again, this is merely a minimal page with a single native `<button>` and no ARIA. And by default, it allows keyboard focus and demonstrates the functionality of using Tab, Enter, and Space out of the box. Geoff recently made this case when [**explaining the accessibility benefits of semantic HTML elements**](/css-tricks.com/explaining-the-accessible-benefits-of-using-semantic-html-elements.md).

If the interaction triggers an action, then [**that element is a button**](/css-tricks.com/buttons-vs-links.md). And in this case, the `<button>` is designed to run a script that saves changes to a user profile:

```html
<button>Save changes</button>
```

That single line gives us a surprising amount for free:

- Keyboard activation with the `Enter` and `Space` keys
- Correct focus behavior
- A role that assistive technology already understands
- Consistent announcements across screen readers

At this point, there is *no* ARIA — and that’s intentional. But I did have an existing class for styling buttons in my CSS, so I added that:

```html
<button class="cta">Save changes</button>
```

---

## 2: Observe the native behavior before adding anything

With just the native element in place, I tested three things:

1. **Keyboard only** (Tab, Enter, Space)
2. **A screen reader** (listening to how the control is announced)
3. **Focus order** within the page

Everything behaved predictably. The browser was doing exactly what users expect. This step matters because it establishes a baseline. If something breaks later, you know it wasn’t HTML that caused it. In fact, we can see that everything is in perfect working order by inspecting the element in DevTool’s Accessibility panel.

![DevTools Accessibility panel showing the accessible role of button with a label of Semantic Button.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/01/s_9A57C4F0BA1949DC827C2F37A890F42010D59C3D51B76EB65DFC2B18EC963371_1766158725334_Screenshot2025-12-19at8.35.47AM.png?resize=674%2C314&ssl=1)

---

## 3: Add well‑intentioned ARIA

The problem crept in when I tried to make the button behave like a link:

```html
<button class="cta" role="link">Save changes</button>
```

I did this for styling and routing reasons. This button needed to be styled a little differently than the default `.cta` class and I figured I could use the ARIA attribute rather than using a modifier class. You can start to see how I let the styling dictate and influence the functionality. A `<button>` is still the correct element for this purpose, but I wanted it to look like a link because of the design requirements. Might as well give that element a `link` role then, right?

On the surface, nothing seemed broken. Automated tools stayed quiet. But in real use, the cracks showed quickly:

- Space no longer activated the control reliably.
- Screen readers announced conflicting roles.
- Keyboard users encountered behavior that didn’t fully match either a button or a link.

ARIA didn’t add clarity here; it introduced ambiguity. But I had already “tested” my work and nothing was screaming at me that I’d conflated the element’s `role` with another type of element. Again, all it takes is a quick look at DevTools.

![DevTools Accessibility panel showing the accessible role of link with a label of Semantic Button.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/01/s_9A57C4F0BA1949DC827C2F37A890F42010D59C3D51B76EB65DFC2B18EC963371_1766158840330_Screenshot2025-12-19at8.39.53AM.png?resize=840%2C348&ssl=1)

---

## 4: Back to semantics

The fix wasn’t clever. It was subtractive. I reverted my styles, used a class for styling, and went back to the semantic markup prior to changing the accessible role:

```html
<button class="cta">Save changes</button>
```

I know it sounds easy: if it’s an action, use a `<button>`. If it takes you somewhere, use a link (`<a>`). But, in practice, we’re making decisions with every key we type and it’s just as easy to conflate actions with destinations. In this case, I totally used the correct element! My mistake was thinking that ARIA was an appropriate styling hook for my CSS.

Once the correct element was in place — absent of ARIA — the issues disappeared. Instead, I could define a new classname and, you guessed it, use keep styles with styles.

```html
<button class="cta cta-alt">Save changes</button>
```

Just like that, I was able to style the element how I needed and the user who report the issue was able to confirm that everything worked as expected. It was an inadvertent mistake born of a basic misunderstanding about ARIA’s place in the stack.

---

## Why this keeps happening

ARIA attributes are used to define the nature of something but they do not redefine the behavioral default of the native elements. When we override semantics, we quietly take responsibility for:

- keyboard interactions,
- focus management,
- expected announcements, and
- platform‑specific quirks.

That’s a large surface area to maintain, and it’s why small ARIA changes can have outsized and unpredictable effects.

---

## A rule I now follow

Here’s the workflow that has saved me the most time and bugs:

1. Use native HTML to express intent.
2. Test with keyboard and a screen reader.
3. Add ARIA only to communicate *missing state*, not to redefine roles.

If ARIA feels like it’s doing heavy lifting, it’s usually a sign the markup is fighting the browser.

---

## Where ARIA *does* belong

One example would be a simple disclosure widget using a native `<button>` plus [<VPIcon icon="iconfont icon-w3c"/>`aria-expanded`](https://w3.org/TR/wai-aria-1.2/#aria-expanded) to communicate state — showing ARIA used to *add state*, not replace semantics.

<CodePen
  user="anon"
  slug-hash="WbxNzob"
  title="ARIA Used to Communicate State with aria-expanded"
  :default-tab="['css','result']"
  :theme="dark"/>

This demo uses a native `<button>` with `aria-expanded`, which is toggled with a sprinkle of JavaScript:

```js
const button = document.getElementById("toggle");
const panel = document.getElementById("panel");

button.addEventListener("click", () => {
  const expanded = button.getAttribute("aria-expanded") === "true";
  button.setAttribute("aria-expanded", !expanded);
  panel.hidden = expanded;
});
```

The accessible state (`true`/`false`) is communicated correctly without replacing the button’s semantics.

Now, I know that ARIA is essential when:

- communicating expanded or collapsed state,
- announcing dynamic updates,
- building truly custom widgets, and
- exposing relationships HTML can’t express.

Used this way, ARIA complements semantic HTML instead of competing with it.

---

## Let the platform work for you

The biggest accessibility improvement I’ve made wasn’t learning about more attributes — it was trusting the ones browsers already understand. Semantic HTML is not the baseline you move past. It’s the foundation that everything else depends on.

And that’s what I really hope you take away from my experience. We all make mistakes. It’s part of the job, unfortunately. But what good are they if we can’t learn from them, even if it takes a hard lesson.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "I Learned The First Rule of ARIA the Hard Way",
  "desc": "Semantic HTML does a lot more accessibility work than we usually give it credit for already — and ARIA is simple to abuse when we use it both as a shortcut and as a supplement.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/i-learned-the-first-rule-of-aria-the-hard-way.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
