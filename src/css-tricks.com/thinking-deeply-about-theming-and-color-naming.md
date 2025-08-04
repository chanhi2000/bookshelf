---
lang: en-US
title: "Thinking Deeply About Theming and Color Naming"
description: "Article(s) > Thinking Deeply About Theming and Color Naming"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - JavaScript
  - Article(s)
tag:
  - blog
  - css-tricks.com
  - css
  - js
  - javascript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Thinking Deeply About Theming and Color Naming"
    - property: og:description
      content: "Thinking Deeply About Theming and Color Naming"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/thinking-deeply-about-theming-and-color-naming.html
prev: /programming/css/articles/README.md
date: 2025-08-04
isOriginal: false
author:
  - name: Zell Liew
    url : https://css-tricks.com/author/zellwk/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2018/07/abstract-color.jpg
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
  name="Thinking Deeply About Theming and Color Naming"
  desc="Today, I want to discuss a couple of patterns for naming color palettes that the community is using, and how I propose we can improve, so we achieve both flexibility and beauty."
  url="https://css-tricks.com/thinking-deeply-about-theming-and-color-naming"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2018/07/abstract-color.jpg"/>

As a front-end developer, I’ve been pretty curious about how other people code up their websites. So I tend to poke my head into design systems whenever I find one.

Then, late last year, a conversation with Geoff Graham set me off thinking even deeper about theming websites. (If you don’t know that dude, he’s the chief editor of this site, so that guy’s a pretty big deal, too.)

So I’ve been watching, pondering, and exploring:

- How can we create better themes?
- How can we allow increased flexibility in theming?
- How can we allow more colors to be used so that sites can be more alive and dimensional instead of being so flat all the time?

Today, I want to discuss a couple of patterns that the community is using, and how I propose we can improve, so we achieve both flexibility and beauty.

Hope you’re ready to go on a wild ride with me!

---

## Color Palettes

Let’s begin from the beginning. After all, how can you discuss theming without including colors into the site?

I think this problem is pretty much solved by now. Everyone has adopted systems that allows for various hues — along with multiple tints and shades — that can give some life to the design.

We don’t need to go very far to see this trend happening. For example, [<FontIcon icon="iconfont icon-tailwindcss"/>Tailwind CSS](https://tailwindcss.com/docs/colors) includes a ton of colors and their respective tones.

![A color palette matrix in rows of red, orange, amber, yellow, and lime. Each column is a square box with a color corresponding to its row, getting increasingly darker from left to right.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/07/tailwind-palette.webp?resize=842%2C355&ssl=1)

[<FontIcon icon="fas fa-globe"/>Open Props](https://open-props.style) by [<FontIcon icon="fas fa-globe"/>Adam Argyle](https://nerdy.dev) provides even more tones, up to 13 per color.

![A larger color palette with 19 rows of color, each with 13 columns showing the color getting darker from left to right.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/07/open-props.webp?resize=1453%2C612&ssl=1)

And [<FontIcon icon="fas fa-globe"/>Pico CSS](https://picocss.com/docs/colors) ups the ante by introducing 19 different tones per color.

![Two color palettes, one for red and one for pink, each with a grid of squares showing the variations going from light to dark.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/07/pico-palette.webp?resize=925%2C625&ssl=1)

Er… *this is not a race*, so the number of tones doesn’t really matter. What’s important is you get sufficient color tones to create subtle effects for various parts of the design.

### Designing Your Own Palette

Color palettes provided by these libraries and frameworks can be good starting points, but I’d argue that you almost never want to use them.

Why?

**Because colors create differentiation**; differentiation creates distinction; **distinction creates identity**.

You probably know this is true without me telling you.

- Sites that use Bootstrap, look like Bootstrap.
- Sites that use Tailwind, look like Tailwind.
- Sites that use shadcn, look like that too…

Of course there are makers who can break the mould, use Tailwind, and make it completely not like Tailwind. But that’s because they tweak many things.

Color is one of these things — one of the most important ones — but other important pieces include typography, spacing, the roundness of your corners… and many others. Covering those is a story for another day, and perhaps best covered by [<FontIcon icon="fas fa-globe"/>Jack McDade](https://jackmcdade.com) who teaches [<FontIcon icon="fas fa-globe"/>Radical Design](https://radicaldesigncourse.com).

So, if you don’t wanna drown in the sea of sameness — looking like everyone else — **creating your own color palettes is a first step forward**.

Now, you may be anxious about creating color palettes because there’s been lots of writing about the amount of work that goes into creating [<FontIcon icon="fas fa-globe"/>accessible](https://stephaniewalter.design/blog/tips-create-accessible-color-palette/) color [<FontIcon icon="fas fa-globe"/>palettes](https://stripe.com/blog/accessible-color-systems), so that might sound like a daunting task.

Plus, anything related to accessibility carries “Big Potential Consequences” and “Highly Shameful When Done Incorrectly,” so that can add extra pressure on you.

Throw all those pressures away.

Don’t be scared.

**Because if you want to create a corner of the internet that looks like you (or your company), breathes like you, acts like you, and exudes fun like you do, then gotta do what you gotta do**.

There are only two words you have to remember.

Just two words.

**Sufficient contrast.**

And you’re set for accessibility (design-wise, at least).

That’s it.

### Designing Color Palettes by Hand

I tend to design color palettes by hand — in Figma — when I design my websites. This seems to be the most natural process for me. (Or maybe I’m just influenced by how [<FontIcon icon="fas fa-globe"/>Jack designs stuff](https://radicaldesigncourse.com) 🙃).

If you do this, **there’s no need to stress about filling up tones from 50 to 950**. That’s because you’ll have no idea what colors would look nice before you fit them into the design. Stressing over tones is putting the cart before the horse.

Here’s a decent example. When I designed [<FontIcon icon="fas fa-globe"/>Splendid Labz](https://splendidlabz.com), I omitted a ton of color tones. Here’s an example of the pink color variables for the site.

![Showing 10 CSS variables for pink-based color variations defined in `oklch()`.](https://css-tricks.com/wp-content/uploads/2025/07/splendid-pink.svg)

- Notice I skipped values between 50 and 400? Well, I didn’t need ’em.
- Notice I added `200d` and `600d`? Well, I kinda wanted a desaturated (or muted) variant of these colors… which… could not be captured the existing systems. So I added `d` for desaturated 🙃.

[<FontIcon icon="fas fa-globe"/>You can see the results of that yourself](https://splendidlabz.com). It’s not too shabby in my opinion — with splashes of color that perhaps bring some joy to your face when you scroll through the site.

![The Splendid Labz homepage. Black background, yellow heading, white body text. Rediscover the joy of coding.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/07/splendid-site.webp?resize=1479%2C739&ssl=1)

You get the drift, yeah? It’s not too hard. So, don’t be scared and give that a try.

### Designing Color Palettes Programmatically

If you’re the kinda person that prefers generating colors programmatically (and of course you can hand-tweak them afterwards if you desire), here are a few generators you may fancy:

<SiteInfo
  name="RampenSau — Color ramp generator using curves within the HSL color model"
  desc="RampenSau is lightweight, dependency free and fast JavaScript function written in TypeScript. It generates color ramps based on a curve within the HSL color model. This page serves as preview for the variety of options the function takes."
  url="https://meodai.github.io/rampensau/"
  logo="data:image/png;base64,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"
  preview="https://meodai.github.io/rampensau/socialfb.png"/>

<SiteInfo
  name="Perceptual Palettes | Accessible Color Palette Generator"
  desc="Make accessibility rules easy with this color palette generator for complex design systems."
  url="https://perceptualpalettes.alexdunn.au/"
  logo="https://perceptualpalettes.alexdunn.au/favicon-16x16.png"
  preview="https://perceptualpalettes.alexdunn.au/ogimage.png"/>

```component VPCard
{
  "title": "Accessible Palette: Create color systems with consistent lightness and contrast",
  "desc": "Use CIELAB and LCh color models to create color systems with consistent lightness and WCAG contrast ratios.",
  "link": "https://accessiblepalette.com/",
  "logo": "https://accessiblepalette.com/favicon.png",
  "background": "rgba(32,36,43,0.2)"
}
```

Of these, I highly recommend checking out [<FontIcon icon="fas fa-globe"/>`@meodai`](https://web-cdn.bsky.app/profile/meodai.bsky.social/)‘s RampenSau because he’s really knowledgeable about the color space and does incredible work there. (Use the monochromatic feature to make this easy.)

---

## Using the Color Palettes

A thousand words later, we’re finally getting to the meat of this article. 😅

With a seemingly unlimited amount of options given by the color palettes, it makes sense to assume that we can use them however we want — **but when it comes to application, most systems seem to fall short**.

(Even *short* is generous. They actually seem to be *severely restricted*.)

For example, [<FontIcon icon="fas fa-globe"/>DaisyUI](https://daisyui.com) seems to support only two tones per color…

![Showing a table of color variables named by utility, including primary, secondary, and accent. The table contains a column showing the color in a square, a column for the color name, a column for the variable, and a column for use case.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/07/daisyui-vars.webp?resize=887%2C366&ssl=1)

[<FontIcon icon="fas fa-globe"/>Pico CSS](https://picocss.com), a system with one of the most options, on first glance, limits to 10 possible variants “*semantic class names*“.

![Showing 10 CSS variables naming color by their use, such as pico-primary-background and pico-primary-border.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/07/pico-primary.webp?resize=810%2C295&ssl=1)

But if you look deeper, we’re still looking at about two tones per “thing”:

- Primary (one tone)
- Background and background hover (two tones)
- Border and border hover (two tone)
- Underline (is this the same as border? More on this below.)
- And so on…

Which brings me to one very important and very puzzling question:

> If colors are so important, why do these frameworks allow only the utilization of so few colors?

I can’t answer this question because I’m not the creators behind those systems, but I’d guess these might be the possible causes:

1. These system designers might not be as sensitive to colors as visual designers.
2. Semantic class name confusion.
3. Values were simply meant as guidelines.

The second one a serious, and limiting, issue that we can deal with today.

As for the first, I’m not saying I’m a great designer. I’m simply saying that, with what I know and have discovered, something seems to be amiss here.

Anyway, let’s talk about the second point.

---

## Semantic Class Name Confusion

Observing the “semantic class names” these systems use actually unveil underlying confusion about what “semantic” means to the web development community.

Let’s go back to my remark about the [<FontIcon icon="fas fa-globe"/>`--pico-primary-underline` variable](https://picocss.com/docs/css-variables#all-css-variables) earlier with Pico CSS.

But if you look deeper, we’re still looking at about two tones per “thing”

- Primary (one tone)
- Background and background hover (two tones)
- Border and border hover (two tones)
- Underline (is this the same as border? More on this below)
- And so on…

Isn’t that an interesting remark? (I ask this question because `underline` and `border` can use *the same color to create a unifying effect*).

From what we can see here, the term “semantic” actually means two things conflated into one:

1. An order of hierarchy (`primary`, `secondary`, `tertiary`, etc)
2. The “thing” it was supposed to style

This gets even more confusing because the order of hierarchy can now be split into two parts:

1. A color-specific order (so `primary` means `red`, `secondary` means `blue`, and so on)
2. A use-case specific order (so a `heavy` button might be `primary`, while a `light` button might be `secondary`)

![Two differently styled buttons side-by-side, one solid blue with white text and one transparent with a red border and text. It is unclear which one is the primary button and which is the secondary button.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/07/semantic-confusion.webp?resize=1679%2C373&ssl=1)

Okay. I can hear you say “naming is hard.” [**Yes, that’s the common complaint**](/css-tricks.com/naming-things-is-only-getting-harder.md). But “naming is hard” because we conflate and reduce things without making distinctions.

I propose that:

1. We keep the hierarchy (`primary`, `secondary`, `tertiary`) to the color hue.
2. We name the strength, “oomph,” or weight of the button with a verb that describes their relative weight or appearance, like `outline`, `light`, `heavy`, `ghost`, etc.

![Four rows of color families, including pink, orange, yellow, and turquoise. Each has variations for heavy, light, outline, and ghost.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/07/weighted-buttons.webp?resize=745%2C375&ssl=1)

We can create the appearance variations easily with something I call **The Pigment System**. But perhaps that’s an article for another day.

Anyway, by creating this separation, we can now create a wealth amount of color combinations without being restricted by a single hierarchical dimension.

Moving on…

### The Second Problem With Semantics

Using the same example (just for simplicity, and definitely not trying to bash Pico CSS because I think they’re doing a really good job in their own right), we see that semantics are conflated by stating its hierarchy along what its supposed to style.

Examples are:

- `--pico-primary-background`
- `--pico-primary-border`

These two properties result in a problem when designing and developing the site later. If you consider these questions, you’d see the problems too:

First: By using `--pico-primary-background`…

- Does it mean we only have one main background color?
- What if we need other colors? Do we use `--pico-secondary-background`?
- What if we need more? Do we use `tertiary` (3rd), `quaternary` (4th), `quinary` (5th), and `senary` (6th) for other colors?

Second: What if we have variants of the same color? Do we use things like `--pico-primary-background-1`, `2`, `3`, and so on?

Third: Now, what if I need the same color for the `--pico-primary-background` and the `--pico-primary-border` of the same component? But I’d need another color for a second one?

This starts getting confusing and “semantics” begins to lose its meaning.

### What Semantics Actually Mean

Consulting [<FontIcon icon="fas fa-globe"/>Etymology](https://etymonline.com/search?q=semantic) and the dictionary gives us clues about how to actually be semantic — and keep meaning.

![Semantic, adjective. Relating to significance or meaning," 1894, from French sémantique, applied by Michel Bréal (1883) to the psychology of language, from Greek sēmantikos "significant," from semainein "to show by sign, signify, point out, indicate by a sign," from sēma "sign, mark, token; omen, portent; constellation; grave" (Doric sama), from PIE root *dheie- "to see, look" (source also of Sanskrit dhyati "he meditates;" see zen).](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/07/etymology-semantic.webp?resize=844%2C312&ssl=1)

![Semantic, relating to meaning in language or logic.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/07/dictionary-semantic.webp?resize=572%2C246&ssl=1)

Two things we can see here:

1. Semantics mean to indicate by a sign.
2. It can be related to meaning or logic.

What I’m noticing is that people generally ascribe “semantics” to words, as if only words can convey meanings and numbers cannot…

**But what if we broaden our scope and view numbers as semantic too** — since we know 100 is a much lighter tint and 900 is a dark shade, isn’t that semantics showing through numbers?

### Better Semantics

We already have a perfectly usable semantic system — using numbers — through the color palettes.

![Showing a color palette grid for the Tailwind framework.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/07/tailwind-palette.webp?resize=842%2C355)

This is highly semantic!

What we simply need is to adjust it such that we can use the system to *easily theme anything*.

How? Simple.

I made the argument above that the hierarchy (`primary`, `secondary`, etc.) should be used to refer to the colors.

- Then, if you have use `pink` color as your main (hence `primary`) color…
- You can simply set another color, say `orange` as your `secondary` color!

(Duh? Yeah, it’s obvious in hindsight.)

Implementing this into our code, we can do a one-to-one port between hierarchy and hues. If you do this via CSS, it can be manual and not very fun…

```css
.theme-pink {
  --color-primary-100: var(--color-pink-100);
  --color-primary-200: var(--color-pink-200);
  --color-primary-300: var(--color-pink-300);
  /* and so on ...*/

  --color-secondary-100: var(--color-orange-100);
  --color-secondary-200: var(--color-orange-200);
  --color-secondary-300: var(--color-orange-300);
  /* and so on ...*/
}
```

With Sass, you can run a quick loop and you’ll get these values quickly.

```scss
$themes: (
  pink: (
    primary: pink,
    secondary: orange
  )
);

$color-tones: 100, 200, 300, 400, 500, 600, 700, 800, 900;

@each $theme-name, $theme-colors in $themes {
  .theme-#{$theme-name} {
    @each $tone in $color-tones {
      --color-primary-#{$tone}: var(--color-#{map-get($theme-colors, primary)}-#{$tone});
      --color-secondary-#{$tone}: var(--color-#{map-get($theme-colors, secondary)}-#{$tone});
    }
  }
}
```

For Tailwind users, you could do a loop via a Tailwind plugin in v3, but I’m not quite sure how you would do this in v4. 

```js
// The plugin code
const plugin = require('tailwindcss/plugin')

module.exports = plugin(function ({ addUtilities, theme }) {
  const splendidThemes = theme('splendidThemes', {})
  const palette = theme('colors')
  // Collect all unique tone keys used by any color in any theme
  const allTones = new Set()
  Object.values(splendidThemes).forEach(themeConfig => {
    Object.values(themeConfig).forEach(colorName => {
      if (palette[colorName]) {
        Object.keys(palette[colorName]).forEach(tone => allTones.add(tone))
      }
    })
  })

  const utilities = {}

  Object.entries(splendidThemes).forEach(([themeName, themeConfig]) => {
    const themeClass = {}

    Object.entries(themeConfig).forEach(([role, colorName]) => {
      if (!palette[colorName]) return
      allTones.forEach(tone => {
        if (palette[colorName][tone] !== undefined) {
          themeClass[`--color-${role}-${tone}`] =
            `var(--color-${colorName}-${tone})`
        }
      })
    })

    utilities[`.theme-${themeName}`] = themeClass
  })

  addUtilities(utilities)
})
```

```js
// Using it in Tailwind v3
module.exports = {
  plugins: [
    require('path-to-splendid-themes.js')
  ]
  theme: {
    splendidThemes: {
      pink: {
        primary: 'pink',
        secondary: 'orange'
      },
      blue: {
        primary: 'blue',
        secondary: 'purple',
        tertiary: 'orange'
      }
    }
  },
}
```

Will this generate a lot of CSS variables?

Yes.

But will in affect performance?

Maybe, but I’d guess it won’t affect performance much, since this code is just a couple of bytes more. (Images, by contrast, weigh thousands of times more than these variables do.)

And now we no longer need to worry about knowing whether `background-1` or `background-2` is the right keyword. We can simply use the semantic numerals in our components:

```css
.card {
  background-color: var(--color-primary-500)
}

.card-muted {
  background-color: var(--color-primary-700);
}
```

---

## One More Note on Semantics

I think most frameworks get it right by creating component-level semantics. This makes a ton of sense.

For example, with Pico CSS, you can do this:

![Four CSS color variables named for utility, such as pico-card-background-color. Each variable is set to the value of another variable based on its type of color, such as pico-background-color.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/07/pico-component.webp?resize=796%2C124&ssl=1)

In your own creations, you might want to reduce the amount of namespaces (so you write less code; it’s less tedious, yeah?):

```css
.card-namespaced {
  --card-header-bg: var(--color-primary-600);
}

.card-without-namespace {
  --header-bg: var(--color-primary-600);
}
```

No “extra semantics” or even “namespacing” needed when the project doesn’t require it. Feel free to Keep It Simple and Sweet.

This brings me to a separate point on component vs global variables.

---

## Global Variables

Some variables should be global because they can propagate through the entirety of your site without you lifting a finger (that is, once you design the CSS variables appropriately).

An example of this with borders:

```css
:root {
  --border-width: 1px;
  --border-style: solid;
  --border-color: var(--color-neutral-700);
}
```

You can change the global `--border-color` variable and adjust everything at once. Great!

To use this sorta thing, you have to build your components with those variables in mind.

```css
.card {
  border: var(--border-width) var(--border-style) var(--border-color);
}
```

This can be easily created with Tailwind utilities or Sass mixins. ([**Tailwind utilities can be convenient Sass mixins**](/css-tricks.com/tailwinds-apply-feature-is-better-than-it-sounds.md)).

```scss
@utility border-scaffold {
  border: var(--border-width) var(--border-style) var(--border-color);
  border-radius: var(--radius);
}
```

Then we can easily apply them to the component:

```scss
.card {
  @apply border-scaffold;
}
```

To change the theme of the card, we can simply change the `--border-color` variable, without needing to include the `card-border` namespace.

```css
.card-red {
  --border-color: var(--color-red-500);
}
```

This way, authors get the ability to create multiple variations of the component without having to repeat the namespace variable. (*See, even the component namespace is unnecessary.*)

```css
.pico-card-red {
  --pico-card-background-color: var(--color-red-500);
}

.card-red {
  --bg-color: var(--color-red-500);
}
```

Now, I know we’re talking about colors and theming, and we segued into design systems and coding… but can you see that there’s a way to create a system that makes styling much easier and much more effective?

Well, I’ve been pondering this kinda thing a lot over at [<FontIcon icon="fas fa-globe"/>Splendid Labz](https://splendidlabz.com/), specifically in [<FontIcon icon="fas fa-globe"/>Splendid Styles](https://splendidlabz.com/solutions/styles/). Take a look if you are interested.

Enough tooting my own horn! Let’s go back to theming!

I think here are some other values that you might want to consider in your global variables:

```css
:root {
  --border-width: ...;
  --border-style: ...;
  --border-color: ...;

  --outline-width: ...;
  --outline-style: ...;
  --outline-focus-color: ...;
  --outline-offset: ...;

  --transition-duration: ...;
  --transition-delay: ...;
  --transition-easing: ...;
}
```

---

## How Important is All of This?

It depends on what you need.

**People who need a single theme can skip the entire conversation** we hashed out above because they can just use the color palettes and call it a day.

```css
.card {
  background: var(--color-pink-500);
  color: var(--color-pink-900);
}
```

**For those who need multiple themes with a simple design**, perhaps the stuff that Pico CSS, DaisyUI, and other frameworks have provided is sufficient.

![showing 20 CSS variables for colors with names based on scale, and utility. All variables are defined with the oklch color function.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/07/daisy-theme.webp?resize=1032%2C671&ssl=1)

What it takes to create a DaisyUI Theme.

**Side Rant:** Notice that DaisyUI contains variables for `--color-success` and `--color-danger`? Why? Isn’t it obvious and consistent enough that you can use `--color-red` for errors directly in your code? Why create an unnecessary abstraction? And why subject yourself to their limitations? Anyway, rant end. You get my point.

For those who want flexibility and lots of possible color shades to play with, you’ll need a more robust system like the one I suggested.

This whole thing reminds me of Jason’s Cohen’s article, [<FontIcon icon="fas fa-globe"/>“Rare things become common at scale”](https://longform.asmartbear.com/scale-rare/): what is okay at a lower level becomes not okay at a larger scale.

**So, take what you need. Improve what you wish to. And may this help you through your development journey.**

If you wanna check out what I’ve created for my design system, head over to [<FontIcon icon="fas fa-globe"/>Splendid Styles](https://splendidlabz.com/solutions/styles/). The documentation may still be lacking when this post gets published, but I’m trying to complete that as soon as I can.

And if you’re interested in the same amount of rigour I’ve described in this article — but applied to CSS layouts — consider checking out [<FontIcon icon="fas fa-globe"/>Splendid Layouts](https://splendidlabz.com/solutions/styles/) too. I haven’t been able to look back after I started using it.

Have fun theming!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Thinking Deeply About Theming and Color Naming",
  "desc": "Today, I want to discuss a couple of patterns for naming color palettes that the community is using, and how I propose we can improve, so we achieve both flexibility and beauty.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/thinking-deeply-about-theming-and-color-naming.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
