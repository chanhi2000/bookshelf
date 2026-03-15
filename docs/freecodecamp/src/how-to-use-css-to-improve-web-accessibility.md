---
lang: en-US
title: "How to Use CSS to Improve Web Accessibility"
description: "Article(s) > How to Use CSS to Improve Web Accessibility"
icon: fa-brands fa-css3-alt
category: 
  - CSS
  - Article(s)
tag: 
  - blog
  - freecodecamp.org
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Use CSS to Improve Web Accessibility"
    - property: og:description
      content: "How to Use CSS to Improve Web Accessibility"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-css-to-improve-web-accessibility.html
prev: /programming/css/articles/README.md
date: 2024-09-19
isOriginal: false
author:
  - name: Elizabeth Lola
    url: https://freecodecamp.org/news/author/elizabethmeshioye/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1726577970240/02631676-6492-4b83-a057-b9c2048709ee.jpeg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "CSS > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/css/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

---

<SiteInfo
  name="How to Use CSS to Improve Web Accessibility"
  desc="Did you know that CSS can play a significant role in web accessibility? While CSS primarily handles the visual presentation of a webpage, when you use it properly it can enhance the user’s experience and improve accessibility. In this article, I'll s..."
  url="https://freecodecamp.org/news/how-to-use-css-to-improve-web-accessibility"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1726577970240/02631676-6492-4b83-a057-b9c2048709ee.jpeg"/>

Did you know that CSS can play a significant role in web accessibility? While CSS primarily handles the visual presentation of a webpage, when you use it properly it can enhance the user’s experience and improve accessibility.

In this article, I'll share some ways CSS can support accessibility so you can start using these techniques in your own projects.

::: note Prerequisites

To follow along with this tutorial, you should have a basic understanding of HTML, CSS, and a little bit of Javascript.

:::

---

## Update Focus Styles

The browser provides default focus styles for interactive elements like buttons or input fields. But sometimes these default focus styles might not be ideal for your design system – especially if the colors used in your design are too close to the default colors. This might make it difficult to notice.

Also, different browsers have different default focus styles and you might want to standardize the focus styles to ensure uniformity.

You can change the default focus style of an element in CSS using the `:focus` pseudo-class. For example, the default focus style for an input element is a blue outline in Chrome and a blue outline with outline offset in Firefox, to update the default focus styles of an input element you can do this:

```css
input:focus {
  outline: 2px solid #007BFF;
  outline-offset: 2px;
  border-radius: 1rem;
}
```

---

## Avoid Content Shifts

Content shifts can happen when you’re lazy loading images, where images load progressively as the user scrolls down the page. Sometimes the image pushes the content around it downwards, shifting the text you're reading out of place.

Content shifts can also happen during dynamic content fetching, especially when new content like text, images, or ads is added to the page without reserving space for it in advance.

Content shifts can be frustrating, especially for users:

- With cognitive disabilities who may lose track of where they are in the content.
- Using screen magnifiers, where the shift can cause them to lose their zoomed-in focus.
- Navigating with a keyboard, as it can mess up the natural tab order and make navigation confusing.

You can pre-allocate space for content to prevent shifts by using the `min-height` or `aspect-ratio` properties. Here's how you can allocate space for an image to prevent content shift before the image has fully loaded.

```css
img {
  width: 100%;
  height: auto;
  aspect-ratio: 16/9;
  object-fit: cover; /* Ensures the image fits well within the allocated space */
}
```

You can also use animations or transitions when dynamically loading content to add smooth transitions for new content. So, instead of a sudden shift, the content slides in gracefully, reducing the perception of disruption.

```css
.new-content {
  transition: margin 0.3s ease-in-out, opacity 0.3s ease-in-out;
}
```

---

## Reduce Motion

Rapid animations or really complex transitions can be disorienting for users with motion sensitivity, which could lead to discomfort like headaches, dizziness, or vertigo (for users with vestibular disorders).

You can use CSS’s `prefers-reduced-motion` media query to reduce or disable animations for users.

Personally, instead of disabling animations completely, I replace complex, distracting animations with more subtle ones to maintain functionality while respecting user preferences.

Here's how to use `prefers-reduced-motion` to create a simpler animation:

```css
/* Default animation */
@keyframes complexAnimation {
  0% { transform: translateX(0); opacity: 0; }
  50% { transform: translateX(100px); opacity: 0.5; }
  100% { transform: translateX(0); opacity: 1; }
}

.element {
  animation: complexAnimation 2s ease-in-out;
}

/* Simpler animation for reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  @keyframes simpleAnimation {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }

  .element {
    animation: simpleAnimation 1s ease-in-out;
  }
}
```

Here’s an example from the code above. If you have reduced motion enabled you’ll see a fading ball instead of a moving ball:

<CodePen
  user="leezee"
  slug-hash="PorrrQW"
  title="Reduced Motion"
  :default-tab="['css','result']"
  :theme="dark"/>

::: note

If you want to see the reduced motion in action, you can enable it in the [<VPIcon icon="fa-brands fa-chrome"/>rendering tab on Google Chrome](https://developer.chrome.com/docs/devtools/rendering).

:::

---

## Focus Within for Nested Elements

You can highlight or style a parent element when any of its child elements receive focus to make it clear which group (like form inputs or dropdown menus) is currently being interacted with.

To do this, you can use CSS’s `:focus-within` pseudo-class which is used to style an element when any of its descendants receive focus either through keyboard navigation or user interaction.

For example, to highlight a fieldset when any item in the group is focused in a grouped control, you can do this:

```html
<style>
 fieldset {
   padding: 10px;
   border: 1px solid #ccc;
 }

 fieldset:focus-within {
   border-color: #007BFF; /* highlight the fieldset when a user focuses on any input */
 }
</style>

<fieldset>
  <legend>Choose a color:</legend>
  <label><input type="radio" name="color" value="red"> Red</label>
  <label><input type="radio" name="color" value="green"> Green</label>
  <label><input type="radio" name="color" value="blue"> Blue</label>
</fieldset>
```

---

## Customize Contrast Options

Sometimes you may be working on a design that uses lots of colors and might not maintain high contrast between text and background to fit an aesthetic. Or perhaps you're working on a design with lots of bright colors. In these cases, you should consider how your application renders for different users.

Some users with low vision or certain types of color blindness might need high contrast mode to differentiate text from the background more clearly. Other users sensitive to bright colors might prefer a softer, less jarring visual experience.

Some of these users might have their systems set to high or low contrast to help improve their experience. To customize their experience, you can use the CSS `prefers-contrast` media query.

The `prefers-contrast` media query allows you to tailor the contrast of your website or application based on the user's system settings.

Here's an example of using `prefers-contrast`:

```css
/* default styling preference */
body {
  background-color: white;
  color: black;
}

/* high contrast preference */
@media (prefers-contrast: more) {
  body {
    background-color: black;
    color: white;
  }
  a {
    color: yellow;
  }
}
/* low contrast preference */

@media (prefers-contrast: less) {
  body {
    background-color: #f0f0f0;
    color: #333;
  }
  a {
    color: #555;
  }
}
```

<CodePen
  user="leezee"
  slug-hash="dyBBxgV"
  title="Prefers contrast"
  :default-tab="['css','result']"
  :theme="dark"/>

In the example above, the `prefers-contrast: more` option ensures that when a user prefers high contrast, the background is black and the text is white, with yellow links for better visibility.

The `prefers-contrast: less` adjusts the color scheme to a softer color for users who prefer less contrast. The default style is used if the user has no specific contrast preference or if their preference is not detected.

::: note

If your design uses minimal colors and maintains high contrast between text and background or you're working with a design where text is minimal and the focus is on visual content (like image galleries or video players), you might not need `prefers-contrast` as much. But it's still good practice to consider contrasts.

:::

---

## Enable Dark Mode

You can use CSS to accommodate users’ preferences for dark or light modes. You can achieve this through the CSS `prefers-color-scheme` media query. The browser can detect the user's color preference and apply the style if provided in CSS.

Here's an example of how you can add a dark mode style to your site using CSS variables:

```css
:root {
  --background-color: #ffffff;
  --text-color: #000000;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background-color: #000000;
    --text-color: #ffffff;
  }
}

body {
  background-color: var(--background-color);
  color: var(--text-color);
}
```

In the example above, the variables get updated if the browser detects a dark color scheme preference.

If you want to allow users to toggle between modes manually, you can use JavaScript for this:

```html :collapsed-lines
<style>
 /* Default light mode styles */
  body {
   background-color: #ffffff;
   color: #000000;
  }
 /* Dark mode styles */
  body.dark-mode {
   background-color: #000000;
   color: #ffffff;
  }
</style>

<button id="toggle-theme">Toggle Theme</button>

<script>
  const toggleButton = document.getElementById('toggle-theme');
  toggleButton.addEventListener('click', () => {
   document.body.classList.toggle('dark-mode');
  });
</script>
```

---

## Use `rem` Units for Responsive Typography

Using `rem` units for responsive typography can help enhance accessibility to adapt more dynamically to a user's preference. Since `rem` is relative to the root font size (typically set by the browser or user), it scales with changes in the base font size. This helps ensure that text remains readable without breaking layouts.

Users can set a preferred font size in their browser or operating system for better readability. When you use `rem`, the website content scales according to this setting which ensures that the text is not too small or too large for the users (which can happen when using fixed units like `px`).

When users zoom in using browser settings or increase their preferred text size, the `rem`-based text will scale appropriately.

The default root font size (usually 16px) is typically inherited from the browser, but you can set it explicitly if needed:

```css
html {
  font-size: 100%; /* Default 16px */
}
```

After setting the root font size, you can use `rem` unit for the rest of your content. For example:

```css
h1 {
  font-size: 2.5rem; /* Equivalent to 40px if root is 16px */
}

p {
  font-size: 1rem; /* Equivalent to 16px */
}
```

---

## Use Animations to Enhance UX

CSS animations can enhance accessibility when used thoughtfully. They can help create an engaging and understandable experience for users.

Here are some ways that animations can help improve accessibility:

- You can use animations to indicate loading state to visually communicate to users that the system is working on a task.
- Using animated text effects, like fades or scaling on headlines or important sections, can help guide users' eyes to important content. This can be useful for people with cognitive disabilities who benefit from clear visual hierarchies.
- Subtle transitions for state change instead of having abrupt changes (like a modal popping up instantly) can create smoother transitions between different interface states.
- Using animated highlights or shaking effects on form fields can provide visual feedback to users about input errors. You should pair these animations with labels or ARIA attributes to make it clear what the user needs to correct.
- Animations can help users track focus, especially keyboard users or those with visual impairments. CSS transitions that highlight focused elements (for example by enlarging buttons or changing the border) assist users in understanding where they are within the page.

::: tip Best Practices

- Ensure animations are used purposefully, not just for aesthetic reasons.
- Avoid overly long or continuous animations that can distract or annoy users.
- Combine animations with other accessible features, such as screen reader announcements, to ensure all users understand content changes.

:::

---

## Conclusion

When considering accessibility, well-structured HTML forms the foundation of an accessible page – but CSS also plays a vital role in enhancing that structure.

CSS alone cannot fix poorly structured HTML. But when it’s applied thoughtfully to a solid foundation, it ensures a more inclusive and engaging experience by improving visual hierarchy, readability, and interaction for users of all abilities.

Combining accessible HTML with CSS not only improves the user interface but also provides support for assistive technologies.

Thank you so much for reading this article. If you found it helpful, consider sharing. Happy coding!

::: info

You can connect with me on [LinkedIn (<VPIcon icon="fa-brands fa-linkedin"/>`elizabeth-meshioye`)](https://linkedin.com/in/elizabeth-meshioye/).

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Use CSS to Improve Web Accessibility",
  "desc": "Did you know that CSS can play a significant role in web accessibility? While CSS primarily handles the visual presentation of a webpage, when you use it properly it can enhance the user’s experience and improve accessibility. In this article, I'll s...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/ㅏㄱ.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
