---
lang: en-US
title: "Sniffing Out the CSS Olfactive API"
description: "Article(s) > Sniffing Out the CSS Olfactive API"
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
      content: "Article(s) > Sniffing Out the CSS Olfactive API"
    - property: og:description
      content: "Sniffing Out the CSS Olfactive API"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/css-olfactive-api.html
prev: /programming/css/articles/README.md
date: 2026-04-01
isOriginal: false
author:
  - name: John Rhea
    url: https://css-tricks.com/author/johnrhea/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/03/olfactive-api.png
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
  name="Sniffing Out the CSS Olfactive API"
  desc="A deep sniff of the new CSS Olfactive API, a set of proposed features for immersive user experiences using smell."
  url="https://css-tricks.com/css-olfactive-api"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/03/olfactive-api.png"/>

A lot has happened in CSS in the last few years, but there’s nothing we needed less than the upcoming Olfactive API. Now, I know what you’re going to say, expanding the web in a more immersive way is a good thing, and in general I’d agree, but there’s no generalized hardware support for this yet and, in my opinion, it’s too much, too early.

First let’s look at the hardware. Disney World and other theme parks have done some niche so-called 4D movies (which is nonsense since there isn’t a fourth dimensional aspect, and if you consider time the fourth dimension then every movie is fourth dimensional). And a few startups have tried to bring [<VPIcon icon="fa-brands fa-wikipedia-w"/>olfactory senses](https://en.wikipedia.org/wiki/Olfactory_system) into the modern day, but as of this writing, the hardware isn’t consumer-ready yet. That said, it’s in active development and one startup assured me the technology would be available within the year. (And startups never, ever lie about when their products will launch, right?)

Even if it does come out within the year, would we even want this? I mean [<VPIcon icon="fa-brands fa-wikipedia-w"/>Smell-O-Vision](https://en.wikipedia.org/wiki/Smell-O-Vision) totally caught on, right? It’s definitely not considered one of the worst inventions of all time… But, alas, no one cares about the ravings of a mad man, at least, not *this* mad man, so the API rolls on.

Alright, I’m going to step off my soap box now and try to focus on the technology and how it works.

---

## Smell Tech

One of the fights currently going on in the CSS Working Group is whether we should limit smells to those considered pleasing by the perfume industry or whether to open websites to a much wider variety. For instance, while everyone’s olfactory sense is different, the perfume industry has centered on a selection of fragrances that will be pleasing to a wide swath of people.

That said, there are a large number of pleasing fragrances that would not be included in this, such as food-based smells: fresh baked bread etc. Fragrances that the Big Food Lobby is itching to include in their advertisements. As of now the CSS Olfactive API only includes the twelve general categories used by the perfume industry, but just like there are ways to expand the color gamut, the system is built to allow for expanded smells in the future should the number of available fragrance fragments increase.

---

## Smelly Families

You don’t have to look far online to find something called the [<VPIcon icon="fa-brands fa-wikipedia-w"/>Scent Wheel](https://en.wikipedia.org/wiki/Fragrance_wheel) (alternately called the Fragrance Wheel or the Wheel of Smell-Tune, but that last one is only used by me). There are four larger families of smell:

- Floral
- Amber (previously called Oriental)
- Woody
- Fresh

These four are each subdivided into additional categories though there are overlaps between where one of the larger families begins/ends and the sub families begin/end

- Floral:
  - Floral (`fl`)
  - Soft Floral (`sf`)
  - Floral Amber (`fa`)
- Amber:
  - Soft Amber (`sa`)
  - Amber (`am`)
  - Woody Amber (`wa`)
- Woody:
  - Woods (`wo`)
  - Mossy Woods (`mw`)
  - Dry Woods (`dw`)
- Fresh (`fr`)
  - Aromatic (`ar`)
  - Citrus (`ct`)
  - Water (`ho`)
  - Green (`gr`)
  - Fruity (`fu`)

It’s from these fifteen fragrance categories that a scent can be made by mixing different amounts using the two letter identifiers. (We’ll talk about this when we discuss the `scent()` function later on. Note that “Fresh” is the only large family with its own identifier (`fr`) as the other larger families are duplicated in the sub-families)

---

## Implementation

First of all, its implemented (wisely) in HTML in much the same way video and audio are with the addition of the `<scent>` element, and `<source>` was again used to give the browser different options for wafting the scent toward your sniffer. Three competing file formats are being developed `.smll`, `.arma`, and, I kid you not, `.smly`. One by Google, one by Mozilla, and one, again, not kidding, by Frank’s Fine Fragrances who intends to jump on this “fourth dimension of the web.”

```xml
<scent controls autosmell="none">
  <source src=“mossywoods.smll” type=“scent/smll”>
  <source src=“mossywoods.arma” type=“scent/arma”>
  <source src=“mossywoods.smly” type=“scent/smly”>
  <a href=“mossywoods.smll”>Smell our Mossy Woods scent</a>
</scent>
```

For accessibility, be sure that you set the `autosmell` attribute to `none`. In theory, this isn’t required, but some of the current hardware has a bug that turns on the wafter even if a smell hasn’t been activated.

However, similar to how you can use an image or video in the background of an element, you can also attach a scent profile to an element using the new `scent-profile` property.

`scent-profile` can take one of three things.

The keyword `none` (default):

```css
scent-profile: none;
```

A `url()` function and the path to a file e.g.:

```css
scent-profile: url(mossywoods.smll);
```

Or a set of aromatic identifiers using the `scent()` function:

```css
scent-profile: scent(wo, ho, fu);
```

This produces a scent that has notes of woody, water, and fruity which was described to me as “an orchard in the rain” but to me smelled more like “a wooden bowl of watered-down applesauce.” Please take that with a grain of salt, though, as I have been told I have “the nasal palette of a dead fish.”

You can add up to five scent sub-families at once. This is an arbitrary limit, but more than that would likely muddle the scent. Equal amounts of each will be used, but you can use the new `whf` unit to adjust how much of each is used. `100whf` is the most potent an aroma can be. Unlike most units, your implementation, must add up to `100whf` or less. If your numbers add up to more than 100, the browser will take the first `100whf`s it gets and ignore everything afterward.

```css
scent-profile: scent(wo 20whf, ho 13whf, fu 67whf);
```

…or you could reduce the overall scent by choosing `whf`s less than 100:

```css
scent-profile: scent(wo 5whf, ho 2whf, fu 14whf);
```

In the future, should other fragrances be allowed, they would simply need to add some new fragrance fragments from which to construct the aromatic air.

---

## Sniffing Out Limitations

One large concern for the working group was that some developer would go crazy placing `scent-profile`s on every single element, both overwhelming the user and muddling each scent used.

As such it was decided that the browser will only allow one `scent-profile` to be set per the parent element’s sub tree. This basically means that once you set a `scent-profile` on a particular element you cannot add a scent profile to any of its descendants, nor can you add a scent profile to any of its siblings. In this way, a scent profile set on a hungry selector (e.g. `*` or `div`) will create a fraction of the scent profiles than what might otherwise be created. While there are clearly easy ways to maliciously get around this limitation, it was thought that this should at least prevent a developer from accidentally overwhelming the user.

---

## Aromatic Accessibility

Since aromas can be overpowering they’ve also added a media-query:

```css
.reeks {
  scent-profile: scent(fl, fa, fu);
}

@media (prefers-reduced-pungency: reduce) {
  .reeks {
    scent-profile: scent(fl 10whf, fa 10whf, fu 10whf);
  }
}

@media (prefers-reduced-pungency: remove) {
  .reeks {
    scent-profile: none;
  }
}
```

---

## Browser Support

Surprisingly, despite Chrome Canary literally being named after a bird who would smell gas in the mine, Chrome has not yet begun experimenting with it. The only browser you can test things out on, as of this writing, is the KaiOS Browser.

---

## Conclusion

There you have it. I still don’t think we need this, but with the continuing march of technology it’s probably not something we can stop. So let’s make an agreement between you reading this and me here writing this that you’ll always use your new-found olfactory powers for good… *and* that you won’t ever say this article stinks.

::: info

Learn more about the [**CSS Olfactive API**](/css-tricks.com/front-end-april-fools-top-10.md).

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Sniffing Out the CSS Olfactive API",
  "desc": "A deep sniff of the new CSS Olfactive API, a set of proposed features for immersive user experiences using smell.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/css-olfactive-api.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
