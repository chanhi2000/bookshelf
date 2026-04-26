---
lang: en-US
title: "Setting And Persisting Color Scheme Preferences With CSS And A “Touch” Of JavaScript"
description: "Article(s) > Setting And Persisting Color Scheme Preferences With CSS And A “Touch” Of JavaScript"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - JavaScript
  - Article(s)
tag:
  - blog
  - smashingmagazine.com
  - css
  - js
  - javascript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Setting And Persisting Color Scheme Preferences With CSS And A “Touch” Of JavaScript"
    - property: og:description
      content: "Setting And Persisting Color Scheme Preferences With CSS And A “Touch” Of JavaScript"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/smashingmagazine.com/setting-persisting-color-scheme-preferences-css-javascript.html
prev: /programming/css/articles/README.md
date: 2024-03-25
isOriginal: false
author:
  - name: Henry Bley-Vroman
    url: https://smashingmagazine.com/author/henry-bley-vroman/
cover: https://files.smashing.media/articles/setting-persisting-color-scheme-preferences-css-javascript/setting-persisting-color-scheme-preferences-css-javascript.jpg
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

```component VPCard
{
  "title": "JavaScript > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Setting And Persisting Color Scheme Preferences With CSS And A “Touch” Of JavaScript"
  desc="There are many ways to approach a “Dark Mode” feature that respects a user’s system color scheme preferences and allows for per-site customization. Henry Bley-Vroman walks through a new possibility that leans into cutting-edge CSS, with minimal JavaScript to support persisting the user’s color scheme preference across pages."
  url="https://smashingmagazine.com/2024/03/setting-persisting-color-scheme-preferences-css-javascript/"
  logo="https://smashingmagazine.com/images/favicon/favicon.svg"
  preview="https://files.smashing.media/articles/setting-persisting-color-scheme-preferences-css-javascript/setting-persisting-color-scheme-preferences-css-javascript.jpg"/>

There are many ways to approach a “Dark Mode” feature that respects a user’s system color scheme preferences and allows for per-site customization. With recent developments in CSS, core functionality that has always required JavaScript can now be done without it. Henry Bley-Vroman walks through a new possibility that leans into cutting-edge CSS, with minimal JavaScript to support persisting the user’s color scheme preference across pages.

Many modern websites give users the power to set a site-specific color scheme preference. A basic implementation is straightforward with JavaScript: listen for when a user changes a checkbox or clicks a button, toggle a class (or attribute) on the `<body>` element in response, and write the styles for that class to override design with a different color scheme.

CSS’s new [<VPIcon icon="fa-brands fa-firefox"/>`:has()` pseudo-class](https://developer.mozilla.org/en-US/docs/Web/CSS/:has), supported by major browsers since December 2023, opens many doors for front-end developers. I’m especially excited about leveraging it to modify UI in response to user interaction *without JavaScript*. Where previously we have used JavaScript to toggle classes or attributes (or to set styles directly), we can now pair `:has()` selectors with HTML’s native interactive elements.

Supporting a color scheme preference, like “Dark Mode,” is a great use case. We can use a `<select>` element anywhere that toggles color schemes based on the selected `<option>` — no JavaScript needed, save for a sprinkle to save the user’s choice, which we’ll get to further in.

---

## Respecting System Preferences

First, we’ll support a user’s system-wide color scheme preferences by adopting a “Light Mode”-first approach. In other words, we start with a light color scheme by default and swap it out for a dark color scheme for users who prefer it.

The [<VPIcon icon="fa-brands fa-firefox"/>`prefers-color-scheme`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) media feature detects the user’s system preference. Wrap “dark” styles in a `prefers-color-scheme: dark` media query.

```css
selector {
  /* light styles */

  @media (prefers-color-scheme: dark) {
    /* dark styles */
  }
}
```

Next, set the [<VPIcon icon="fa-brands fa-firefox"/>`color-scheme`](https://developer.mozilla.org/en-US/docs/Web/CSS/color-scheme) property to match the preferred color scheme. Setting `color-scheme: dark` switches the browser into its built-in dark mode, which includes a black default background, white default text, “dark” styles for scrollbars, and other elements that are difficult to target with CSS, and more. I’m using CSS variables to hint that the value is dynamic — and because I like the browser developer tools experience — but plain `color-scheme: light` and `color-scheme: dark` would work fine.

```css
:root {
  /* light styles here */
  color-scheme: var(--color-scheme, light);
  
  /* system preference is "dark" */
  @media (prefers-color-scheme: dark) {
    --color-scheme: dark;
    /* any additional dark styles here */
  }
}
```

---

## Giving Users Control

Now, to support *overriding* the system preference, let users choose between light (default) and dark color schemes at the page level.

HTML has native elements for handling user interactions. Using one of those controls, rather than, say, a `<div>` nest, improves the chances that assistive tech users will have a good experience. I’ll use a `<select>` menu with options for “system,” “light,” and “dark.” A group of `<input type="radio">` would work, too, if you wanted the options right on the surface instead of a dropdown menu.

```html
<select id="color-scheme">
  <option value="system" selected>System</option>
  <option value="light">Light</option>
  <option value="dark">Dark</option>
</select>
```

Before CSS gained `:has()`, responding to the user’s selected `<option>` required JavaScript, for example, setting an event listener on the `<select>` to toggle a class or attribute on `<html>` or `<body>`.

But now that we have `:has()`, we can now do this with CSS alone! You’ll save spending any of your performance budget on a dark mode script, plus the control will work even for users who have disabled JavaScript. And any “no-JS” folks on the project will be satisfied.

What we need is a selector that applies to the page when it `:has()` a `select` menu with a particular `[value]:checked`. Let’s translate that into CSS:

```css
:root:has(select option[value="dark"]:checked)
```

We’re defaulting to a light color scheme, so it’s enough to account for two possible dark color scheme scenarios:

1. The page-level color preference is “system,” and the system-level preference is “dark.”
2. The page-level color preference is “dark”.

The first one is a page-preference-aware iteration of our `prefers-color-scheme: dark` case. A “dark” system-level preference is no longer enough to warrant dark styles; we need a “dark” system-level preference and a “follow the system-level preference” at the page-level preference. We’ll wrap the `prefers-color-scheme` media query dark scheme styles with the `:has()` selector we just wrote:

```css
:root {
  /* light styles here */
  color-scheme: var(--color-scheme, light);
    
  /* page preference is "system", and system preference is "dark" */
  @media (prefers-color-scheme: dark) {
    &:has(#color-scheme option[value="system"]:checked) {
      --color-scheme: dark;
      /* any additional dark styles, again */
    }
  }
}
```

Notice that I’m using [<VPIcon icon="fa-brands fa-firefox"/>CSS Nesting](https://developer.mozilla.org/en-US/docs/Web/CSS/Nesting_selector) in that last snippet. [Baseline 2023 (<VPIcon icon="iconfont icon-github"/>`web-platform-dx/web-features`)](https://github.com/web-platform-dx/web-features/blob/main/docs/baseline.md) has it pegged as “Newly available across major browsers” which means support is good, but at the time of writing, support on Android browsers not included in [Baseline’s core browser set (<VPIcon icon="iconfont icon-github"/>`web-platform-dx/web-features`)](https://github.com/web-platform-dx/web-features/blob/main/docs/baseline.md#core-browser-set) is [<VPIcon icon="iconfont icon-caniuse"/>limited](https://caniuse.com/css-nesting). You can get the same result without nesting.

```css
:root {
  /* light styles */
  color-scheme: var(--color-scheme, light);
    
  /* page preference is "dark" */
  &:has(#color-scheme option[value="dark"]:checked) {
    --color-scheme: dark;
    /* any additional dark styles */
  }
}
```

For the second dark mode scenario, we’ll use nearly the exact same `:has()` selector as we did for the first scenario, this time checking whether the “dark” option — rather than the “system” option — is selected:

```css
:root {
  /* light styles */
  color-scheme: var(--color-scheme, light);
    
  /* page preference is "dark" */
  &:has(#color-scheme option[value="dark"]:checked) {
    --color-scheme: dark;
    /* any additional dark styles */
  }
    
  /* page preference is "system", and system preference is "dark" */
  @media (prefers-color-scheme: dark) {
    &:has(#color-scheme option[value="system"]:checked) {
      --color-scheme: dark;
      /* any additional dark styles, again */
    }
  }
}
```

Now the page’s styles respond to both changes in users’ system settings *and* user interaction with the page’s color preference UI — all with CSS!

But the colors change *instantly*. Let’s smooth the transition.

---

## Respecting Motion Preferences

Instantaneous style changes can feel inelegant in some cases, and this is one of them. So, let’s apply a CSS transition on the `:root` to “ease” the switch between color schemes. (Transition styles at the `:root` will cascade down to the rest of the page, which may necessitate adding `transition: none` or other transition overrides.)

Note that the CSS `color-scheme` property does not support transitions.

```css
:root {
  transition-duration: 200ms;
  transition-property: /* properties changed by your light/dark styles */;
}
```

Not all users will consider the addition of a transition a welcome improvement. Querying the [<VPIcon icon="fa-brands fa-firefox"/>`prefers-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) media feature allows us to account for a user’s motion preferences. If the value is set to `reduce`, then we remove the `transition-duration` to eliminate unwanted motion.

```css
:root {
  transition-duration: 200ms;
  transition-property: /* properties changed by your light/dark styles */;
    
  @media screen and (prefers-reduced-motion: reduce) {
    transition-duration: none;
  }
}
```

Transitions can also produce poor user experiences on devices that render changes slowly, for example, ones with e-ink screens. We can extend our “no motion condition” media query to account for that with the [<VPIcon icon="fa-brands fa-firefox"/>`update`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/update) media feature. If its value is `slow`, then we remove the `transition-duration`.

```css
:root {
  transition-duration: 200ms;
  transition-property: /* properties changed by your light/dark styles */;
    
  @media screen and (prefers-reduced-motion: reduce), (update: slow) {
    transition-duration: 0s;
  }
}
```

Let’s try out what we have so far in the following demo. Notice that, to work around `color-scheme`’s lack of transition support, I’ve explicitly styled the properties that should transition during theme changes.

<CodePen
  user="smashingmag"
  slug-hash="YzMVQja"
  title="CSS-only theme switcher (requires :has()) [forked]"
  :default-tab="['css','result']"
  :theme="dark"/>

Not bad! But what happens if the user refreshes the pages or navigates to another page? The reload effectively wipes out the user’s form selection, forcing the user to re-make the selection. That may be acceptable in some contexts, but it’s likely to go against user expectations. Let’s bring in JavaScript for a touch of progressive enhancement in the form of…

---

## Persistence

Here’s a vanilla JavaScript implementation. It’s a naive starting point — the functions and variables aren’t encapsulated but are instead properties on `window`. You’ll want to adapt this in a way that fits your site’s conventions, framework, library, and so on.

When the user changes the color scheme from the `<select>` menu, we’ll store the selected `<option>` value in a new `localStorage` item called `"preferredColorScheme"`. On subsequent page loads, we’ll check `localStorage` for the `"preferredColorScheme"` item. If it exists, and if its value corresponds to one of the form control options, we restore the user’s preference by programmatically updating the menu selection.

```js :collapsed-lines
/*
 * If a color scheme preference was previously stored,
 * select the corresponding option in the color scheme preference UI
 * unless it is already selected.
 */
function restoreColorSchemePreference() {
  const colorScheme = localStorage.getItem(colorSchemeStorageItemName);

  if (!colorScheme) {
    // There is no stored preference to restore
    return;
  }

  const option = colorSchemeSelectorEl.querySelector(`[value=${colorScheme}]`);  

  if (!option) {
    // The stored preference has no corresponding option in the UI.
    localStorage.removeItem(colorSchemeStorageItemName);
    return;
  }

  if (option.selected) {  
    // The stored preference's corresponding menu option is already selected
    return;
  }

  option.selected = true;
}

/*
 * Store an event target's value in localStorage under colorSchemeStorageItemName
 */
function storeColorSchemePreference({ target }) {
  const colorScheme = target.querySelector(":checked").value;
  localStorage.setItem(colorSchemeStorageItemName, colorScheme);
}

// The name under which the user's color scheme preference will be stored.
const colorSchemeStorageItemName = "preferredColorScheme";

// The color scheme preference front-end UI.
const colorSchemeSelectorEl = document.querySelector("#color-scheme");

if (colorSchemeSelectorEl) {
  restoreColorSchemePreference();

  // When the user changes their color scheme preference via the UI,
  // store the new preference.
  colorSchemeSelectorEl.addEventListener("input", storeColorSchemePreference);
}
```

Let’s try that out. Open this demo (perhaps in a new window), use the menu to change the color scheme, and then refresh the page to see your preference persist:

<CodePen
  user="smashingmag"
  slug-hash="GRLmEXX"
  title="CSS-only theme switcher (requires :has()) with JS persistence [forked]"
  :default-tab="['css','result']"
  :theme="dark"/>

If your system color scheme preference is “light” and you set the demo’s color scheme to “dark,” you may get the light mode styles for a moment immediately after reloading the page before the dark mode styles kick in. That’s because CodePen loads its own JavaScript before the demo’s scripts. That is out of my control, but you can take care to improve this persistence on your projects.

---

## Persistence Performance Considerations

Where things can get tricky is restoring the user’s preference *immediately* after the page loads. If the color scheme preference in `localStorage` is different from the user’s system-level color scheme preference, it’s possible the user will see the system preference color scheme before the page-level preference is restored. (Users who have selected the “System” option will never get that flash; neither will those whose system settings match their selected option in the form control.)

If your implementation is showing a [**“flash of inaccurate color theme”**](/css-tricks.com/flash-of-inaccurate-color-theme-fart.md), where is the problem happening? Generally speaking, the earlier the scripts appear on the page, the lower the risk. The “best option” for you will depend on your specific stack, of course.

---

## What About Browsers That Don’t Support `:has()`?

[<VPIcon icon="iconfont icon-caniuse"/>All major browsers support `:has()` today](https://caniuse.com/css-has) Lean into modern platforms if you can. But if you do need to consider legacy browsers, like Internet Explorer, there are two directions you can go: either hide or remove the color scheme picker for those browsers or make heavier use of JavaScript.

If you consider color scheme support itself a progressive enhancement, you can entirely hide the selection UI in browsers that don’t support `:has()`:

```css
@supports not selector(:has(body)) {
  @media (prefers-color-scheme: dark) {
    :root {
      /* dark styles here */
    }
  }

  #color-scheme {
    display: none;
  }
}
```

Otherwise, you’ll need to rely on a JavaScript solution not only for persistence but for the core functionality. Go back to that traditional event listener toggling a class or attribute.

The CSS-Tricks “[**Complete Guide to Dark Mode**](/css-tricks.com/a-complete-guide-to-dark-mode-on-the-web.md)” details several alternative approaches that you might consider as well when working on the legacy side of things.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Setting And Persisting Color Scheme Preferences With CSS And A “Touch” Of JavaScript",
  "desc": "There are many ways to approach a “Dark Mode” feature that respects a user’s system color scheme preferences and allows for per-site customization. Henry Bley-Vroman walks through a new possibility that leans into cutting-edge CSS, with minimal JavaScript to support persisting the user’s color scheme preference across pages.",
  "link": "https://chanhi2000.github.io/bookshelf/smashingmagazine.com/setting-persisting-color-scheme-preferences-css-javascript.html",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```
