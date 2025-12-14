---
lang: en-US
title: "Exploring Multi-Brand Systems with Tokens and Composability"
description: "Article(s) > Exploring Multi-Brand Systems with Tokens and Composability"
icon: iconfont icon-vuejs
category:
  - Node.js
  - Vue.js
  - Article(s)
tag:
  - blog
  - frontendmasters.com
  - node
  - nodejs
  - node-js
  - vue
  - vuejs
  - vue-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Exploring Multi-Brand Systems with Tokens and Composability"
    - property: og:description
      content: "Exploring Multi-Brand Systems with Tokens and Composability"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/exploring-multi-brand-systems-with-tokens-and-composability.html
prev: /programming/js-vue/articles/README.md
date: 2025-12-19
isOriginal: false
author:
  - name: Adam Sedwick
    url : https://frontendmasters.com/blog/author/adam-sedwick/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/8041
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Vue.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-vue/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Exploring Multi-Brand Systems with Tokens and Composability"
  desc="Exploring a Card component made hyper flexible though use of easily changeable custom properties, props, and slots."
  url="https://frontendmasters.com/blog/exploring-multi-brand-systems-with-tokens-and-composability/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/8041"/>

Design systems aren’t just about keeping everything looking the same; they’re about making things flexible enough to handle whatever gets thrown at them.

When you’re juggling multiple brands or different use‑cases, a rigid component can feel more limiting than helpful. That’s where **_tokens_, _composition_, and _configuration_** come in. Tokens let you swap out brand colors and styles without rewriting code, composition gives you building blocks you can remix into new layouts, and configuration keeps all those variations tidy and predictable. Put them together, and suddenly a single component can stretch to fit diverse brands, layouts, and experiences all without breaking from the system.

Let’s look at a typical “Card” component that is designed with all three of these things in mind such that it can support usage across different brands without breaking a sweat.

---

## Setting up the Basic Card Structure

Say our project calls for a simple card. The card has a toggle-able banner that accepts a text string, a thumbnail image, title, description, and a button.

![A card showcasing Red Rocks Park and Amphitheatre with a featured location banner, a vibrant image of a concert, title, description, and a button inviting users to view events.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/12/image6.png?resize=732%2C746&ssl=1)

::: note

In this article, all examples are written in Vue, but these principles are not Vue specific. They can be used in any design system that builds from components, even native Web Components.

:::

Our component should end up looking something like this:

```vue :collapsed-lines
<template>
  <article class="system-card">
    <div class="system-card-media">
      <span v-if="bannerText" class="system-card-banner">
        {{ bannerText }}
      </span>
      <img :src="imageUrl" :alt="imageAlt" class="system-card-image" />
    </div>

    <div class="system-card-content">
      <h3 class="system-card-title">{{ title }}</h3>
      <p class="system-card-description">{{ description }}</p>
      <button class="system-card-button">{{ buttonText }}</button>
    </div>
  </article>
</template>

<script setup> defineOptions({ name: "SystemCard" });

defineProps({
  bannerText: { type: String, default: null },
  imageUrl: { type: String, default: "<https://via.placeholder.com/350x150>" },
  imageAlt: { type: String, default: "Card Image" },
  title: { type: String, default: "Card Title" },
  description: {
    type: String,
    default:
      "This is a description of the card content. It provides more details about the card.",
  },
  buttonText: { type: String, default: "Learn More" },
}); </script>

<style scoped> .system-card {
  background: #fff;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.system-card-media {
  display: flex;
  flex-direction: column;
}

.system-card-banner {
  background-color: #a3533c;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  padding: 4px;
  text-align: center;
  width: 100%;
}

.system-card-content {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

/* ... other card styling, like .system-card-button */</style>
```

The Card is then used like this:

```xml
<SystemCard
  bannerText="Featured Location"
  imageUrl="image/of/red-rock.jpg"
  imageAlt="Red Rocks Amphitheater during a night concert"
  title="Red Rocks Park and Amphitheater"
  description="There's No Better Place to See The Stars."
  buttonText="View Events"
/>
```

---

## Supporting Multiple Brands/Themes with Tokens

At the most basic level, we can modify this card to support different brands or themes through the use of tokens or variables. I will be using CSS Custom Properties (variables) for all examples in this article, but tokens are not limited to just CSS, you can learn more about Design Tokens from the [<VPIcon icon="iconfont icon-w3c"/>Design Tokens Community Group](https://w3.org/community/design-tokens/) (which just shipped their [<VPIcon icon="iconfont icon-w3c"/>first stable version](https://w3.org/community/design-tokens/2025/10/28/design-tokens-specification-reaches-first-stable-version/)!)

All of our existing markup stays the same, but we need to modify the CSS to use variables for configuration. While we’re at it, we should also look at any duplicate or hard-coded values and convert those to variable as well to maintain clean, reusable code.

Our new style declarations should look like this:

```html
<style scoped> /* These root variables are likely to be set up in a more global stylesheet */
:root {
  --system-card-bg-color: #ffffff;
  --system-card-accent-bg-color: #a3533c;
  --system-card-accent-text-color: #ffffff;

  --system-card-border-radius: 8px;
  --system-card-padding: 16px;
  --system-card-gap: 8px;
}

.system-card {
  background: var(--system-card-bg-color);
  border-radius: var(--system-card-border-radius);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.system-card-media {
  display: flex;
  flex-direction: column;
}

.system-card-banner {
  background-color: var(--system-card-accent-bg-color);
  color: var(--system-card-accent-text-color);
  font-size: 14px;
  font-weight: 600;
  padding: 4px;
  text-align: center;
  width: 100%;
}

.system-card-content {
  padding: var(--system-card-padding);
  display: flex;
  flex-direction: column;
  gap: var(--system-card-gap);
}
... 
</style>
```

Now that our component is using tokens, we can create a custom class and assign those tokens new values. Simply by swapping from statically assigned values to dynamic tokens; CSS Custom Properties in this case, we have enabled our card component to support different visual themes.

```xml
<SystemCard
  class="custom-blue-card"
  bannerText="Featured Location"
  imageUrl="image/of/shedd-aquarium.jpg"
  imageAlt="Underwater tunnel at the Shedd Aquarium"
  title="Shedd Aquarium"
  description="Look Nature in the Eye."
  butonText="Plan Your Visit"
/>
```

```css{2-3}
.custom-blue-card {
  --system-card-accent-bg-color: #328198;
  --system-card-accent-text-color: #00070B;
}
```

Alternatively, we could add a new property on the component that assigns a class with new token definitions if we have a known set of themes we want to support:

```xml{8}
<SystemCard
  bannerText="Featured Location"
  imageUrl="image/of/shedd-aquarium.jpg"
  imageAlt="Underwater tunnel at the Shedd Aquarium"
  title="Shedd Aquarium"
  description="Look Nature in the Eye."
  butonText="Plan Your Visit"
  theme="light-blue"
/>
```

```css{3-4}
/* These would likely be global overrides in a global stylesheet */
.theme--light-blue {
  --system-card-accent-bg-color: #328198;
  --system-card-accent-text-color: #00070B;
}
```

![Card displaying Shedd Aquarium with a featured location banner, an underwater scene, title 'Shedd Aquarium', description 'Look Nature in the Eye.' and a button 'Plan Your Visit'.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/12/image3.png?resize=732%2C746&ssl=1)

---

## Customizing Content with Composable Slots

A description is great, but what if we want to show a list of details instead? In a situation like this we have two options, either maintain unique code for every different variation of the component, or create composable areas within a single component that engineers can write custom code into, in programming these are often referred to as *slots*.

Taking our code from before:

```html
<template>
  <article class="system-card">
    <div class="system-card-media">
      <span v-if="bannerText" class="system-card-banner">{{ bannerText }}</span>
      <img :src="imageUrl" :alt="imageAlt" class="system-card-image" />
    </div>
    <div class="system-card-content">
      <h3 class="system-card-title">{{ title }}</h3>
      <p class="system-card-description">{{ description }}</p>
      <button class="system-card-button">{{ buttonText }}</button>
    </div>
  </article>
</template>
```

We can modify our code to replace the `.system-card-description` element with a slot, we’ll use the name card-details to identify what we expect the contents of this slot to be.

```html{9}
<template>
  <article class="system-card">
    <div class="system-card-media">
      <span v-if="bannerText" class="system-card-banner">{{ bannerText }}</span>
      <img :src="imageUrl" :alt="imageAlt" class="system-card-image" />
    </div>
    <div class="system-card-content">
      <h3 class="system-card-title">{{ title }}</h3>
      <slot name="card-details" />
      <button class="system-card-button">{{ buttonText }}</button>
    </div>
  </article>
</template>
```

For the existing cards with a tagline we can simply place the `.system-card-description` element within the slot to achieve the same result.

```xml{8-10}
<SystemCard
  bannerText="Featured Location"
  imageUrl="image/of/shedd-aquarium.jpg"
  imageAlt="Underwater tunnel at the Shedd Aquarium"
  title="Shedd Aquarium"  butonText="Plan Your Visit"
  theme="light-blue"
>
<!-- This is our slot -->
<p class="system-card-description">Look Nature in the Eye.</p>
<!-- This is our slot -->
</SystemCard>
```

![A card component showcasing the Shedd Aquarium with a featured location banner, an underwater scene, and a call-to-action button.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/12/image1.png?resize=732%2C746&ssl=1)

By creating a slot however, we’ve now opened up the possibility for custom content within in. The team can now create a snippet of code to display the list of highlights producing a unique variation on the existing component without completely breaking away from the system.

Component usage could then look like this:

```xml
<SystemCard
  bannerText="Featured Location"
  imageUrl="image/of/shedd-aquarium.jpg"
  imageAlt="Underwater tunnel at the Shedd Aquarium"
  title="Shedd Aquarium"  butonText="Plan Your Visit"
  theme="light-blue"
>
  <!-- This is our slot -->
  <ul class="highlight-list">
    <li class="highlight-item">
      <p class="highlight-text">Touch Experiences</p>
    </li>
    <li class="highlight-item">
      <p class="highlight-text">Animal Encounters</p>
    </li>
    <li class="highlight-item">
      <p class="highlight-text">Stingray Feedings</p>
    </li>
  </ul>
  <!-- This is our slot -->
</SystemCard>
```

Producing a result like this:

![A card design showcasing the Shedd Aquarium with a featured location banner, an underwater scene, and a list of available experiences including 'Touch Experiences', 'Animal Encounters', and 'Stringray Feedings'. Below, there is a button labeled 'Plan Your Visit'.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/12/image2.png?resize=732%2C842&ssl=1)

### A Note on Keeping Things Organized

The concept of completely free and open slots is likely terrifying to a designer or engineer who is focused on maintaining clean and organized code since now we’re allowing people to add whatever custom work they want to an area.

To avoid this we can provide “ready-made” child components that we would *prefer* teams use in these areas, whether through a predetermined list of parts that we know consumers will want, or by paying attention to and adopting repeated usage patterns.

In our examples so far we know we want to support system-card-description and a new system-card-list as options for this space; we can create those as smaller components or “partials.” Engineering and design teams can then use those formally adopted and verified options when they fit their needs, and they maintain all of the benefits of using system components over needing to create custom solutions.

Using these partials might look like this:

```xml{8-10}
<SystemCard
  bannerText="Featured Location"
  imageUrl="image/of/shedd-aquarium.jpg"
  imageAlt="Underwater tunnel at the Shedd Aquarium"
  title="Shedd Aquarium"  butonText="Plan Your Visit"
  theme="light-blue"
>
  <!-- This is our slot -->
  <SystemCardDescription text="Look Nature in the Eye.">
  <!-- This is our slot -->
</SystemCard>
```

or:

```xml{8-10}
<SystemCard
  bannerText="Featured Location"
  imageUrl="image/of/shedd-aquarium.jpg"
  imageAlt="Underwater tunnel at the Shedd Aquarium"
  title="Shedd Aquarium"  butonText="Plan Your Visit"
  theme="light-blue"
>
  <!-- This is our slot -->
  <SystemCardList items="[array of items]">
  <!-- This is our slot -->
</SystemCard>
```

---

## Extending Configuration and Composability for Further Customization

Using slots and partials for configuration and composition is not limited to single areas within a component either, once you start thinking in this model you can create incredibly flexible components that can support a vast array of different styles and layouts.

Examining our card component through the lenses of composition and configuration we can create a layout like this.

![An aerial view of the Adler Planetarium showcasing its unique dome structure and surrounding landscape, featuring a prominent banner reading 'Escape to the Stars'. Below, there is a section displaying the title 'Adler Planetarium' and a list of upcoming events.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/12/image5.png?resize=732%2C942&ssl=1)

The first thing we need to do is identify what pieces are *configurable* and what pieces are *composable*. Configurable elements are typically controlled through attributes, where composable sections are typically slots.

In our case the location of the `.card-media__banner` can be configurable to either the top or bottom of the image.

As for composition, we’ve taken the entire system-card-content area and turned it into a slot, allowing users of the component to build out whatever layout meets their needs. In this case we’re putting the button first, followed by the title, a list of details, and social links..

The component code now looks like this:

```vue
<template>
  <article class="system-card">
    <CardMedia
      :bannerText="bannerText"
      :bannerLocation="bannerLocation"
      :imageUrl="imageUrl"
      :imageAlt="imageAlt"
    />
    <div class="system-card-content">
      <slot name="card-content" />
    </div>
  </article>
</template>

<script setup> import CardMedia from "./partials/CardMedia.vue";

defineOptions({ name: "SystemCard" });

defineProps({
  bannerText: { type: String, default: null },
  bannerLocation: { type: String, default: "top" },
  imageUrl: { type: String, default: "<https://via.placeholder.com/350x150>" },
  imageAlt: { type: String, default: "Card Image" },
  title: { type: String, default: "Card Title" },
  description: {
    type: String,
    default:
      "This is a description of the card content. It provides more details about the card.",
  },
  buttonText: { type: String, default: "Learn More" },
}); </script>
```

and in use:

```vue
<SystemCard
  bannerText="Escape to the Stars"
  bannerLocation="bottom"
  imageUrl="image/of/adler-planetarium.jpg"
  imageAlt="Aerial view or Adler Planetarium"
>
  <SystemButton type="filled" text="Join Us" iconEnd="arrow-right" />
  <SystemCardTitle text="Adler Planetarium" />
  <SystemCardList
    title="Upcoming Events and Shows"
    items="[array of items]">
    <SystemCardSocials
      facebook="link.to.social"
      twitter="link.to.social"
      youtube="link.to.social"
      instagram="link.to.social"
    />
  </SystemCardList>
</SystemCard>
```

We’ve moved the banner and image to a new partial we’re importing called `CardMedia` that partial is then passed the prop bannerLocation and determines whether the banner should appear on the top of bottom of the image. Now, because our entire content area is a slot we’ve added multiple elements as children of the `SystemCard`; we’ve got a `SystemButton`, `SystemCardTitle`, `SystemCardSocial`, and our `SystemCardList` from before, in a new layout that we have defined ourselves all while continuing to use the design system without breaking.

Our final result is a highly adaptable card that supports all of our examples through the use of configuration through props and configuration through custom slots.

![Three card components showcasing different featured locations with images, titles, descriptions, and action buttons.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/12/image4.png?resize=1024%2C436&ssl=1)

---

## Turning Principles into Practice

Supporting multiple brands and use‑cases doesn’t have to mean duplicating components or maintaining endless forks of code. By grounding your system in **_tokens_**, **_composition_**, and **_configuration_**, you can keep one core component flexible enough to handle divergent needs.

- **Tokens**: Centralize design decisions like color, spacing, and typography so brand shifts are a matter of swapping variables or themes, not rewriting CSS.
- **Composition (slots/partials)**: Create structured areas where teams can plug in approved variations, reducing the need for custom one‑offs while still allowing an escape hatch when needed.
- **Configuration (props/attributes)**: Expose common and repeated options for styles, layouts, and behavior so components adapt without breaking consistency.

The payoff is huge: fewer bespoke components to maintain, faster delivery across brands, and a system that scales without losing cohesion. Instead of fighting divergence, you’re designing for it, and that’s how systems stay resilient in the real world.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Exploring Multi-Brand Systems with Tokens and Composability",
  "desc": "Exploring a Card component made hyper flexible though use of easily changeable custom properties, props, and slots.",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/exploring-multi-brand-systems-with-tokens-and-composability.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
