---
lang: en-US
title: "A Deep Dive into the Inline Background Overlap Problem"
description: "Article(s) > A Deep Dive into the Inline Background Overlap Problem"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - frontendmasters.com
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > A Deep Dive into the Inline Background Overlap Problem"
    - property: og:description
      content: "A Deep Dive into the Inline Background Overlap Problem"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/overlapping-inline-backgrounds.html
prev: /programming/css/articles/README.md
date: 2025-03-18
isOriginal: false
author:
  - name: Ana Tudor
    url : https://frontendmasters.com/blog/author/anatudor/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/5330
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
  name="A Deep Dive into the Inline Background Overlap Problem"
  desc="`box-decoration-break: clone;` in CSS can help us make for interesting backgrounds across lines of text that break, but when opacity gets involved, things can get complicated."
  url="https://frontendmasters.com/blog/overlapping-inline-backgrounds/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/5330"/>

A[tweet by Lucas Bonomi (<FontIcon icon="fa-brands fa-x-twitter"/>`LukyVJ`)](https://x.com/LukyVJ/status/1894338305795244316)got me thinking about this problem: how to get a semitransparent background following some inline text with padding, but without the overlap problem that can be seen in the image below.

![Screenshot showing three lines of text, middle aligned, each with its own semitransparent background and padding. The padding on each line leads to intersection, and where we have intersection, the semi-transparent background becomes more opaque. The challenge is to get this result without the increase in alpha in the intersection areas.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/03/416732169-9cbb369e-7dab-4ad1-b345-aefbdfaa50c9.png?resize=1024%2C250&ssl=1)

the problem at hand: the overlapping parts appear darker because of the layered opacity

[<FontIcon icon="fas fa-globe"/>Temani Afif](https://frontendmasters.com/blog/author/temaniafif/) had already [suggested (<FontIcon icon="fa-brands fa-x-twitter"/>`ChallengesCss`)](https://x.com/ChallengesCss/status/1894354015531450664) using an SVG`filter`solution, and that was my first instinct too.

While the initial problem has a pretty simple solution, more complex variations lead me down a deep rabbit hole and I thought the journey was worth sharing in an article.

---

## The initial problem and exact particular solution

We start with some middle-aligned text wrapped inside a`p`and a`span`. The`span`gets `padding`, `border-radius`,and a semi-transparent`background`.

```css
p > span {
  padding: .25em;
  border-radius: 5px;
  background: rgb(0 0 0/ var(--a, .7));
  color: #fff;
  box-decoration-break: clone
}
```

We’re also setting`box-decoration-break: clone`so that each wrapped line gets its own`padding`and corner rounding (this is a very neat CSS feature that’s[<FontIcon icon="fas fa-globe"/>worth looking into](https://css-tricks.com/decorating-lines-of-text-with-box-decoration-break/)if you’re not familiar with it).

The result of the above code looks as follows:

![what the above CSS gives us: the overlap problem](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/03/419917091-aeb8f280-1a3b-4827-85c1-c6bf6425fb96.png?resize=800%2C192&ssl=1)

This is pretty much the same as the screenshot Lucas posted, so let’s see how we can fix it with an SVG`filter`!

The first step is to make the`background`of the`span`opaque by setting`--a`to`1`. This gets rid of the overlap increasing alpha problem because there is no more transparency. To restore that transparency, we use an SVG`filter`. We’ll get to that in a moment, but for now, these are the styles we add:

```css
/* same other styles as before */
p {
  --a: 1;
  filter: url(#alpha)
}
```

The SVG`filter`needs to live inside an`svg`element. Since this`svg`element only contains our`filter`and no actual SVG graphics to be displayed on the screen, it is functionally the same as a`style`element, so there’s no need for it to be visible/ take up space in the document flow.

```xml
<svg width='0' height='0' aria-hidden='true'>
  <filter id='alpha'>
    <!-- filter content goes here -->
  </filter>
</svg>
```

```css
svg[height='0'][aria-hidden='true'] { position: fixed }
```

The first primitive,[<FontIcon icon="fas fa-globe"/>`feComponentTransfer`](https://webplatform.github.io/docs/svg/elements/feComponentTransfer/), takes the`SourceAlpha`(basically, the`filter`input, with the RGB channels of all pixels zeroed, all pixels become black, but keep their alpha) as input ([<FontIcon icon="fa-brands fa-firefox"/>`in`](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/in)) and scales it to the desired alpha, basically giving us the semitransparent version of the shape of the`span`background. This is because the input alpha is`1`within the`span`background area and`0`outside it. Multiplying the desired alpha with`1`leaves it unchanged, while multiplying it with`0`… well, zeroes it.

```xml
<svg width='0' height='0' aria-hidden='true'>
  <filter id='alpha'>
    <feComponentTransfer in='SourceAlpha' result='back'>
      <feFuncA type='linear' slope='.7'/>
    </feComponentTransfer>
  </filter>
</svg>
```

We’ve also named the[<FontIcon icon="fa-brands fa-firefox"/>`result`](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/result)of this primitive`back`so we can reference it later in primitives not immediately folowing this particular`feComponentTransfer`one.

![result of the first filter step: the semitransparent black background](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/03/419932978-df9f8eed-00ef-45b7-a954-bd8e7cbcf753-1.png?resize=800%2C192&ssl=1)


Now we have the semi-transparent multi-line`span`background with no increase in alpha in the overlap areas. But we still need to get the text and add it on top of it.

Next, we have a[<FontIcon icon="fa-brands fa-firefox"/>`feColorMatrix`](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feColorMatrix)primitive that uses the[<FontIcon icon="fas fa-globe"/>green channel as an alpha mask](https://bsky.app/profile/anatudor.bsky.social/post/3kqibnwoquk2m)(the second value on the last row of the matrix is the only non-zero one) and maxes out (sets to`100%`) all RGB channels of the output (last column, first three rows), basically[<FontIcon icon="fas fa-globe"/>painting the output](https://bsky.app/profile/anatudor.bsky.social/post/3kojyswsn2q2w)white with an alpha equal to the input green channel value. This means the result is full transparency where the input’s green channel is zero (everywhere outside the white text) and opaque white where it’s maxed out (just for the white text).

```xml{6-12}
<svg width="0" height="0" aria-hidden="true">
  <filter id="alpha">
    <feComponentTransfer in="SourceAlpha" result="back">
      <feFuncA type="linear" slope=".7" />
    </feComponentTransfer>
    <feColorMatrix
      in="SourceGraphic"
      values="0 0 0 0 1 
              0 0 0 0 1
              0 0 0 0 1
              0 1 0 0 0"
    />
  </filter>
</svg>
```

Note that by default, the inputs of any primitives other than the very first one in the`filter`get set to the result of the primitive right before, so for this`feColorMatrix`primitive we need to explicitly set the input`in`to`SourceGraphic`.

Also note that there’s a reason behind using the green channel to extract the text. This is because when using Chrome and a wide gamut display, we may hit[<FontIcon icon="fa-brands fa-chrome"/>a bug](https://issues.chromium.org/issues/373410239)which causes`feColorMatrix`to find for example red in what’s `0%` red, `100%` green and `0%` blue. And it’s not just that, but extracting the red channel out of`100%` red, `0%` green and`0%` blue doesn’t give us`100%` red, but a lower value.

To get an idea of just how bad the problem is, check out the comparison screenshot below – everything should have all channels either maxed out or zeroed (like on the left), there should be no in betweens (like on the right).

![expected vs. wide gamut problem ([<FontIcon icon="fa-brands fa-codepen"/>live test](https://cdpn.io/pen/debug/KwKvRKr))](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/03/420838686-97a8bda8-f32c-4e6b-8ce7-4a2ff63feeb3.png?resize=1024%2C547&ssl=1)

After a bunch of tests, it results the problem is less noticeable when using the green channel (compared to when using the blue or red channels), so we’re trying to limit this bug on the hardware where it’s possible to hit it.

We now have just the white text:

![result of the second filter step: just the white text](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/03/419943848-cc3f8df9-621a-4c95-9227-9b64c8abd320.png?resize=800%2C192&ssl=1)

The final step is to place the semi-transparent black background underneath it ([<FontIcon icon="fa-brands fa-firefox"/>`in2`](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/in2)specifies the bottom layer):

```xml{13}
<svg width="0" height="0" aria-hidden="true">
  <filter id="alpha">
    <feComponentTransfer in="SourceAlpha" result="back">
      <feFuncA type="linear" slope=".7" />
    </feComponentTransfer>
    <feColorMatrix
      in="SourceGraphic"
      values="0 0 0 0 1
              0 0 0 0 1
              0 0 0 0 1
              0 1 0 0 0"
    />
    <feBlend in2="back" />
  </filter>
</svg>
```

I see[<FontIcon icon="fa-brands fa-firefox"/>`feMerge`](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feMerge)often used for this, but here we only have two layers, so I find[<FontIcon icon="fa-brands fa-firefox"/>`feBlend`](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feBlend)(with the default[<FontIcon icon="fa-brands fa-firefox"/>`mode`](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/mode)of`normal`which just places the top layer`in`over the bottom layer`in2`) a much simpler solution.

Note that we’re not specifying`in`explicitly because, by default, it’s the result of the previous primitive, the`feColorMatrix`. This is also why we didn’t bother with setting the`result`attribute like we did for the first primitive, the`feComponentTransfer`one because the output of this`feColorMatrix` primitive only gets fed automatically into the`in`input of the final primitive and nowhere else after that.

Cool, right?

![the desired result ([live demo (<FontIcon icon="fa-brands fa-codepen"/>`thebabydino`)](https://codepen.io/thebabydino/pen/gbOwxGL))](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/03/419953162-16382e11-1781-4ac9-af5b-3d49ac010d7a.png?resize=800%2C192&ssl=1)

---

## Expanding the problem scope

I thought this was a neat trick worth sharing, so I posted about it on social media, which lead to an interesting conversation on Mastodon.

### A related problem

Patrick H. Lauke[<FontIcon icon="fas fa-globe"/>pointed me](https://mastodon.social/@patrick_h_lauke/114064700058785709)to[a CodePen demo (<FontIcon icon="fa-brands fa-codepen"/>`patrickhlauke`)](https://codepen.io/patrickhlauke/pen/jOzJwvZ)he had made a few years back, higlighting a related problem I wasn’t hitting with the quick demo I had shared: the background of the later lines covering up the text of the ones right before them.

My demo wasn’t hitting this problem because I had tried to stay reasonably close to the initial challenge screenshot, so I hadn’t used a big enough`padding`to run into it. But let’s say we increase the`padding`of the`span`from`.25em`to`.5em`(and also remove the`filter`to make the problem more obvious).

![the bigger padding problem](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/03/419959733-8c866d6c-e940-4e24-b27e-294025425e69.png?resize=800%2C192&ssl=1)

### The simplest case: separate spans, opaque backgrounds, black/ white text

We first consider the case when we only have separate words wrapped in spans with opaque backgrounds and the text is either black or white (or at least very close). In this very simple case, a properly set`mix-blend-mode`on`span`elements (`darken`for black text,`lighten`for white) suffices, there’s no need for an SVG`filter`.

![isolated spans on opaque contrasting background](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/03/419973578-7e5dd953-22e5-4106-8a96-ed4a240ffcfe.png?resize=800%2C342&ssl=1)

Both`darken`and`lighten`value work on a per pixel, per channel basis. For each pixel of the input, they take either the minimum (`darken`) or the maximum (`lighten`) channel value betwen the two blended layers to produce the result.

Black always has all channels smaller or at most equal to those of anything else. So when we blend any background layer with black text using the`darken`blend mode, the result always shows the black text where there is overlap because the`0%`-valued channels of the black text are always the result of the minimum computation.

White always has all channels bigger or at most equal to those of anything else. So when we blend any background layer with white text using the`lighten`blend mode, the result always shows the white text where there is overlap because the`100%`-valued channels of the white text are always the result of the maximum computation.

Now this works fine as it is when we don’t have any backdrop behind or when the backdrop is either white for black text or black for white text. In other cases, for example if we have a busy image behind, things don’t look as good as the`span`elements also get blended with the image backdrop.

![isolated spans on busy background problem](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/03/419983532-e37313d6-3ab8-4f77-850f-84b6ff6cdb41.png?resize=800%2C342&ssl=1)

Luckily, the fix is straightforward: we just need to set`isolation: isolate`on the parent paragraph!

![isolated spans on busy background solution ([live demo (<FontIcon icon="fa-brands fa-codepen"/>`thebabydino`)](https://codepen.io/thebabydino/pen/ogNzGpw))](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/03/419990476-c8acfa01-453b-46be-a940-f2f7d9919e13.png?resize=800%2C342&ssl=1)

### Slightly more complex: long wrapping span, opaque background, black/ white text

In this case, the`mix-blend-mode`solution isn’t enough anymore because the point of it was to blend the`span`background with the text of the parent paragraph that gets covered. But now it’s the`span`‘s own text that gets covered by the`background`of its next line.

![long wrapping span problem in spite of mix-blend-mode](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/03/420042481-0b030caf-58d6-4dcd-8e37-9c1ffe97a930.png?resize=800%2C264&ssl=1)

To get around this, we wrap the entire`span`in another`span`and set the `padding` and `background` only on the outer`span`(`p > span`). This causes the black/white text of the inner`span`as well as that of the paragraph around the spans to get blended with the outer`span`background.

![long wrapping span nesting solution ([live demo (<FontIcon icon="fa-brands fa-codepen"/>`thebabydino`)](https://codepen.io/thebabydino/pen/azbpKpg))](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/03/420043339-b2559f56-e965-4ae6-812a-75c0d41c8275.png?resize=800%2C423&ssl=1)

If you’ve checked the above demo in Firefox, you may have noticed that it doesn’t work. This is due to[<FontIcon icon="fa-brands fa-firefox"/>bug 1951653](https://bugzilla.mozilla.org/show_bug.cgi?id=1951653).

In the particular case when the*entire*text in the paragraph is wrapped in a`span`, we can avoid the Firefox bug by setting the`mix-blend-mode`property*only*on the inner`span`(`span span`).

However, in the case above, where we also have paragraph text outside the outer`span`too, this unfortunately still leaves us with the problem of that text before the long`span`getting covered by the background of the next`span`line.

![Firefox workaround not good enough if there’s paragraph text before the long wrapping span](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/03/420044455-77799210-3b25-4312-98a7-4cc296a9cdba.png?resize=800%2C264&ssl=1)

### The most complex case: transparent background where neither the text nor the background are black/white

In this case, the blending solution isn’t enough anymore and we need an SVG`filter`one.

Going back to our original demo, we need to apply the solution from the previous case: wrap the`span`in another, set the`padding`and`background`only on the outer one (`p > span`), blend*only*the inner`span`element with the outer one to ensure our solution works cross-browser (since we have white text, we use the`lighten`mode) and prevent blending with anything outside the containing paragraph`p`by setting`isolation: isolate`on it.

```css
p {
  color: #fff;
  isolation: isolate;
  filter: url(#alpha)
}

p > span {
  padding: .5em;
  border-radius: 5px;
  background: #000;
  box-decoration-break: clone;

  span { mix-blend-mode: lighten }
}
```

![the desired result in the bigger padding case ([live demo (<FontIcon icon="fa-brands fa-codepen"/>`thebabydino`)](https://codepen.io/thebabydino/pen/pvormNg))](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/03/420278763-d87f1df8-cc99-4e42-9aab-03662273003a.png?resize=800%2C192&ssl=1)

But what we want here is to move away from black/ white text and background, so let’s see how to do that.

#### Set RGBA values in the SVG filter

If we wanted to have a background that’s not semi-transparent black, but a semi-transparent dark blue, let’s say`rgb(25 25 112)`(which can also be written as`rgb(9.8% 9.8% 43.9%)`), as well as gold-orange text, let’s say`rgb(255 165 0)`(which can also be written as`rgb(100% 64.7% 0%)`), then we use`feColorMatrix`as the first primitive as well and alter the final column values on the first three matrix rows for both the first matrix giving us the background and the second one giving us the text to use the decimal representation of the three percentage RGB values:

```xml
<svg width="0" height="0" aria-hidden="true">
  <filter id="alpha" color-interpolation-filters="sRGB">
    <feColorMatrix
      values="0 0 0 0  .098 
              0 0 0 0  .098 
              0 0 0 0  .439 
              0 0 0 .7 0"
      result="back"
    />
    <feColorMatrix
      in="SourceGraphic"
      values="0 0 0 0 1 
              0 0 0 0 .647 
              0 0 0 0 0 
              0 1 0 0 0"
    />
    <feBlend in2="back" />
  </filter>
</svg>
```

Other than the`id`, we’ve now also set[<FontIcon icon="fa-brands fa-firefox"/>another attribute](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/color-interpolation-filters)on the`filter`element. We aren’t going into it because I don’t really understand much about it, but just know that this attribute with this value needs to be added on any SVG`filter`that messes with the RGB channels. Otherwise, the result won’t be consistent between browsers (the default is`linearRGB`in theory, but only the`sRGB`value seems to work in Safari) and it may not match expectations (the`sRGB`value is the one that gives us the result we want). Previously, having just white text on a black background, we didn’t really need it and it was safe to skip it, but now we have to include it.

![golden text on dark blue background using the method of setting the RGB values in the SVG filter ([live demo (<FontIcon icon="fa-brands fa-codepen"/>`thebabydino`)](https://codepen.io/thebabydino/pen/yyLgWjQ))](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/03/420321413-7ec2fa9c-4667-40ef-a0a0-5192a5333d30.png?resize=800%2C192&ssl=1)

The problem with this solution is that it involves hardcoding the RGBA values for both the`span`background and text in the SVG`filter`, meaning we can’t control them from the CSS.

Let’s try another approach!

#### Set RGBA values upstream of the SVG filter

First, we set them as custom properties upstream of the`svg`:

```css
body {
  --a: .5;
  --back-c: rgb(25 25 112/ var(--a));
  --text-c: rgb(255 165 0)
}
```

Then we modify the`filter`a bit. We use`SourceAlpha`to give us the background area, though we still extract the text area via a`feColorMatrix`primitive and save it as`text`, but this time we don’t care about the RGB values, we won’t use them anyway. We also flood the entire`filter`area with`--back-c`and`--text-c`(using[<FontIcon icon="fa-brands fa-firefox"/>`feFlood`](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feFlood)), but then, out of the entire area, we only keep what’s at the intersection ([<FontIcon icon="fa-brands fa-firefox"/>`operator='in'`](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/operator#fecomposite)of[<FontIcon icon="fa-brands fa-firefox"/>`feComposite`](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feComposite)) with the`SourceAlpha`and`text`areas respectively. Finally, we stack these intersections (via`feBlend`), with the text on top.

```xml
<svg width="0" height="0" aria-hidden="true">
  <filter id="alpha" color-interpolation-filters="sRGB">
    <feFlood flood-color="var(--back-c)" />
    <feComposite in2="SourceAlpha" operator="in" result="back" />
    <feColorMatrix
      in="SourceGraphic"
      values="0 0 0 0 0 
              0 0 0 0 
              0 0 0 0 0 
              0 1 0 0 0"
      result="text"
    />
    <feFlood flood-color="var(--text-c)" />
    <feComposite in2="text" operator="in" />
    <feBlend in2="back" />
  </filter>
</svg>
```

This allows us to control both the text and background from the CSS.

However, the values of`--back-c`and`--text-c`are those of the`feFlood`primitive, not those on the element the`filter`applies to. So for any different text or background, we need to have a different `filter`.

If that’s difficult to grasp, let’s say we want two different options, the same golden-orange text on a dark blue background and also dark blue text on a pink background.

```css
body {
  --a: .7;

  --back-c-1: rgb(25 25 112/ var(--a));
  --text-c-1: rgb(255 165 0);

  --back-c-2: rgb(255 105 180/ var(--a));
  --text-c-2: rgb(25 25 112);

  --back-c: var(--back-c-1);
  --text-c: var(--text-c-1)
}
```

Now we can change`--back-c`and`--text-c`on the second paragraph:

```css
p:nth-child(2) {
  --back-c: var(--back-c-2);
  --text-c: var(--text-c-2)
}
```

But changing these variables on the second paragraph[doesn’t do anything (<FontIcon icon="fa-brands fa-codepen"/>`thebabydino`)](https://codepen.io/thebabydino/pen/JojEqBo)for the result of the SVG`filter`applied to it because the values for`--back-c`and`--text-c`that get used by the`filter`are*always*those set upstream from it on the`body`.

<VidStack src="https://videopress.com/61a5e22d-4593-4de2-b46e-71400201ee3a" />

Unfortunately, this is just how things are for SVG filters, even though CSS ones don’t have this limitation, like the comparison below shows.

![CSS vs. SVG drop-shadow filter using a variable for`flood-color`([live demo (<FontIcon icon="fa-brands fa-codepen"/>`thebabydino`)](https://codepen.io/thebabydino/pen/ZYEJBZr))](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/03/421036374-6abf5652-0b1c-4fbe-89dd-e381a3cc1900.png?resize=800%2C778&ssl=1)

#### Set RGB values in the CSS, fix alpha in the SVG filter

Amelia Bellamy-Royds[<FontIcon icon="fas fa-globe"/>suggested](https://mastodon.social/@AmeliaBR@front-end.social/114065645349479429)a`feComponentTransfer`[approach (<FontIcon icon="fa-brands fa-codepen"/>`AmeliaBR`)](https://codepen.io/AmeliaBR/pen/XJWjEmM?editors=1100)that allows setting the palette from the CSS and then using the SVG`filter`only to take care of the increase in alpha where there is overlap.

What Amelia’s`filter`does is use`feComponentTransfer`to preserve the alpha of everything that’s fully transparent (the area outside the span) or fully opaque (the text), but map a bunch of alpha values in between to the desired background alpha`a`. This should also catch and map the background overlap alpha (which is$a+a-a\times{a}=2\times{a}-a\times{a}$– for more details, see this[<FontIcon icon="fas fa-globe"/>Adventures in CSS Semi-Transparency Land](https://css-tricks.com/adventures-in-css-semi-transparency-land/)article) to`a`.

This is a very smart solution and it seems to work really well for this particular background and text case as well as for similar cases. But there are still issues, points where it breaks.

First off, if we increase the alpha to something like`.75`, we start seeing an overlap.

![overlap problem becoming visible when alpha is bumped up to`.75`](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/03/420356221-86ba9f46-d026-4138-9975-04f6f8acddf8.png?resize=800%2C192&ssl=1)

My first instinct was to do what Amelia also suggests doing in the comments to her version – increase the number of intervals as the alpha gets closer to the ends of the`[0, 1]`interval.

Since I’m using [<FontIcon icon="iconfont icon-pug"/>Pug](https://pugjs.org/api/getting-started.html) to generate the markup anyway, I figured this would be a good way to first measure how large the base intervals would need to be – and by that I mean the minimum between the distance between the ends of the`[0, 1]`interval and the desired alpha as well as the overlap alpha.

We’re excluding`2*a - a*a`and`1 - a`from the minimum computation since`a`is subunitary, so`a`is always bigger than`a*a`, which results in`a`being always smaller than`2*a - a*a = a*(2 - a)`, which also results in`1 + a*a - 2*a`being smaller than`1 - a`.

Then we get how many such base intervals`u`we could fit between`0`and`1`, round up this number (`n`) and then generate the list of alpha values (for`tableValues`) which remains`0`and`1`at the ends, but is set to`a`everywhere in between.

```pug
- let u = Math.min(a, 1 + a*a - 2*a);
- let n = Math.ceil(1/u);
- let v = new Array(n + 1).fill(0).map((_, i) => i*(n - i) ? a : i/n)

feFuncA(type='table' tableValues=v.join(' '))
```

This does indeed fix the background overlap problem for any alpha, though it still means we need different filters for different alphas. Here is what gets generated for a few different alpha values:

```xml :collapsed-lines
<!-- a = .8 -->
<feFuncA type='table' 
         tableValues='0 .8 .8 .8 .8 .8 .8 .8 .8 .8 .8 .8 .8 .8 .8 .8 .8 .8 .8 .8 .8 .8 .8 .8 .8 1'/>

<!-- a = .75 -->
<feFuncA type='table' tableValues='0 .75 .75 .75 .75 .75 .75 .75 .75 .75 .75 .75 .75 .75 .75 .75 1'/>

<!-- a = .65 -->
<feFuncA type='table' tableValues='0 .65 .65 .65 .65 .65 .65 .65 .65 1'/>

<!-- a = .5 -->
<feFuncA type='table' tableValues='0 .5 .5 .5 1'/>

<!-- a = .35 -->
<feFuncA type='table' tableValues='0 .35 .35 1'/>

<!-- a = .2 -->
<feFuncA type='table' tableValues='0 .2 .2 .2 .2 1'/>

<!-- a = .1 -->
<feFuncA type='table' tableValues='0 .1 .1 .1 .1 .1 .1 .1 .1 .1 1'/>

<!-- a = .05 -->
<feFuncA type='table' 
         tableValues='0 .05 .05 .05 .05 .05 .05 .05 .05 .05 .05 .05 .05 .05 .05 .05 .05 .05 .05 .05 1'/>
```

We also have another bigger problem: due to font anti-aliasing, the`feComponentTransfer` messes up the text for lower value alphas and the lower the value, the worse the problem looks.

Font anti-aliasing makes the edge pixels of text semi-transparent in order to avoid a[<FontIcon icon="fas fa-globe"/>jagged, pixelated, ugly](https://bsky.app/profile/anatudor.bsky.social/post/3kzquolz3xs2c), even broken look. For comparison, below is the same text without vs. with anti-aliasing, at normal size and scaled up 12 times:

![without vs. with anti-aliasing](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/03/420568656-a726cc27-9ef9-46a2-84d4-943370d2a18f.png?resize=800%2C360&ssl=1)

Those semi-transparent font edge pixels placed on top of the semi-transparent background also give us semi-transparent pixels. At the same time, our`filter`maps the alpha of more and more of the semi-transparent pixels of the input to the desired background alpha`a`as this`a`nears the ends of the`[0, 1]`interval. As`a`nears`0`, then almost all semi-transparent edge pixels get this very low`a`alpha, making them much more transparent than they should be and causing an eroded look for our text.

<VidStack src="https://videos.files.wordpress.com/Ge3Bu3Oa/421803224-f729daa9-2153-40e1-ae97-222eea2327da-1_mp4_hd.original.jpg?w=680" />

<CodePen
  user="thebabydino"
  slug-hash="MYWoVKB"
  title="no alpha increase on inline background overlap #5a: fancy palette, dynamic alpha fix"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

I guess a simple fix for that would be to only map to the desired alpha`a`the smallest number of alpha points possible and let all others keep their initial alpha. This would mean that the first alpha point we map to the desired alpha`a`is equal to it or the nearest smaller than it, while the last one is equal to the overlap alpha`2*a - a*a`or the nearest bigger than it.

For example, if the desired alpha`a`is`.2`, then the overlap alpha is$0.2 +0.2-0.2\times{0.2}=0.36$. The base interval`u`is`.2`,`n`is$\frac{1}{0.2}=5$, so we generate$n+1=6$alpha points:

```plaintext
0 .2 .4 .6 .8 1
```

If before we mapped all those between`0`and`1`to the desired alpha`.2`, now we only map to the desired alpha`a`, those loosely matching the`[.2, .36]`interval – that is,`.2`and`.4`:

```plaintext
0 .2 .2 .6 .8 1
```

In general, that means our values array would become:

```pug
- let v = new Array(n + 1).fill(0);
- v = v.map((_, i) => (i*(n - i) && (i + 1)/n > a && (i - 1)/n < a*(2 - a)) ? a : i/n);
```

Probably ensuring the values outside the interval mapped to`a`are evenly distributed would be the more correct solution, but this simpler trick also seems to work really well when it comes to fixing the text erosion problem.

<VidStack src="https://videos.files.wordpress.com/2vnkFRZP/antialiasing_mp4_hd.original.jpg?w=680" />

<CodePen
  user="thebabydino"
  slug-hash="QwWgxMG"
  title="no alpha increase on inline background overlap #5b: fancy palette, better dynamic alpha fix"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

But you may have noticed there’s still a problem and this is not an SVG`filter`one, it comes from the CSS.

To make it more obvious, let’s put result right next to what we got via the earlier method of seting the RGBA values from the SVG`filter`– can you see it?

<VidStack src="https://videos.files.wordpress.com/Pz5L7juY/comparison_mp4_hd.original.jpg?w=680" />

<CodePen
  user="thebabydino"
  slug-hash="qEBjwzx"
  title="no alpha increase on inline background overlap #6: comparisons"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

If you can’t spot it in the recording above, how about when we have a diagonal middle split in between the result we get when we bake into the filter all RGBA values and the result we get with this alpha fix method via`feComponentTransfer`?

![split comparison](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/03/420592423-5ee58be4-e3b6-475d-8353-dbdd07b28506.png?resize=800%2C374&ssl=1)

It’s pretty subtle here, but if you think it looks like this latest method is making the text a bit more faded, particularly at higher alpha values, you’re right.

This is because the blending fix for the background overlapping text problem results in the text`color`not being preserved. This was precisely why we switched from a blending-only solution to an SVG`filter`one in the case when the text isn’t black or white (or close enough and the particular choice of text and background preserves the text post-blending exactly as it was set).

A lot of text and background combinations don’t make this very obvious because, in order to have[<FontIcon icon="fa-brands fa-firefox"/>a good contrast ratio](https://developer.mozilla.org/en-US/docs/Web/Accessibility/Guides/Understanding_WCAG/Perceivable/Color_contrast), we often need either the text or the background behind it to be very dark or very bright – which means there’s a chance all three RGB channels of the text are either below or above the corresponding RGB channels of the background, or even if one of the channels is deviating on the other side, it’s not deviating enough to make a noticeable difference. But sometimes we can still see there’s a problem, as illustrated by the interactive demo below, which allows changing the palette.

<CodePen
  user="thebabydino"
  slug-hash="jEOwgoP"
  title="no alpha increase on inline background overlap #7: various palettes for dynamic alpha fix"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

All of these palettes were chosen to have a good contrast ratio. Even so, there is some degree of text fading*for all of them*. And while it’s not easy to spot that for the first five, it’s way more noticeable for the second to last one and almost impossible to miss for the final one.

Let’s take the second to last one, which uses a lighter blue than our initial palette, so it has a somewhat lower contrast making the problem more obvious. The higher the alpha gets, what should be golden text on a semitransparent deep blue background looks more pink-ish. This is due to the text being`rgb(100% 74.51% 4.31%)`and the background being`rgb(22.75% 21.18% 100%)`(we leave out the transparency for now and assume the alpha is`1`). Blending these using the`lighten`blend mode means taking the maximum value out of the two for each channel – that is,`100%`(`max(100%, 22.75%)`) for the red channel,`74.51%`(`max(74.51%, 21.18%)`) for the green one and`100%`(`max(4.31%, 100%)`) for the blue one. That means our text is`rgb(100% 74.51% 100%)`, a light pink, which is different from the`color`value of`rgb(100% 74.51% 4.31%)`(golden) we’ve set.

<VidStack src="https://videos.files.wordpress.com/kNkKLwer/varying-alpha_mp4_hd.original.jpg?w=680" />

The final text and background combination makes the problem even more clear. The higher the alpha gets, what should be lime text on a semitransparent blue background looks more like aqua text. This is due to the text being`rgb(0% 100% 0%)`and the background being`rgb(0% 0% 100%)`(again, we leave out the transparency for now and assume the alpha is`1`). Blending these using the`lighten`blend mode means taking the maximum value out of the two for each channel – that is,`0%`(`max(0%, 0%)`) for the red channel,`100%`(`max(100%, 0%)`) for the green one and`100%`(`max(0%, 100%)`) for the blue one. That means our text is`rgb(0% 100% 100%)`, so aqua, which is different from the`color`value of`rgb(0% 100% 0%)`(lime) we’ve set.

<VidStack src="https://videos.files.wordpress.com/6vWnDPhz/final-palette_mp4_hd.original.jpg?w=680" />

So what now? Well, the one solution I’ve been able to find is to pass in the text and background shapes separate from the RGBA values used for them. I’ve tried approaching this in multiple ways and ended up hitting bugs in all browsers. Tiling bugs in Safari and Chrome, a weird Windows-specific bug in Firefox, the same wide gamut bug mentioned before in Chrome… bugs everywhere.

So now we’re not going through all of my failed experiments, of which there were many, we’re just looking at the one solution I’ve managed to get working reasonably well across various browser, OS and hardware combinations.

#### Set shapes and RGBA values in the CSS, pass them to the SVG filter via different channels/ alpha points

The shape of the span background and that of the text get passed to the SVG filter using the`1`alpha point. That means we have white text on black background, all opaque, so we can extract it in the SVG by mapping all alpha points except`1`to`0`.

We pass the text and background RGB values using the`.75`and`.25`alpha points – this allows us to extract them in the SVG`filter`by mapping their corresponding alpha points to`1`, while all other alpha points are`0`.

Finally, we pass the alpha value to the SVG via the green channel, using the`.5`alpha point. By mapping the`.5`alpha point to`1`, while all other alpha points get mapped to`0`, we can extract in the SVG`filter`the desired background alpha value via the green channel value.

This means we have five alpha points (`0`,`.25`,`.5`,`.75`and`1`), so we’re going to need to use five values for the`tableValues`attribute of`feFuncA`, all of them zeroed, except the one corresponding to the point we’re interested in and which we map to`1`.

In order to do this, we first add an absolutely positioned, non-clickable pseudo on the`p`element. This pseudo has a`border`and two shadows (an outer one and an`inset`one) and is offset outwards (using a negative`inset`) to compensate for both the`inset`shadow and the`border`, so that there is no visible part of this pseudo intersecting the`span`background shape.

```scss
p {
  --a: 0.7;
  --text-c: rgb(255 165 0);
  --back-c: rgb(25 25 112);
  position: relative;

  &::after {
    position: absolute;
    inset: -2em;
    border: solid 1em rgb(0% calc(var(--a) * 100%) 0%/ 0.5);
    box-shadow: inset 0 0 0 1em rgba(from var(--text-c) r g b/ 0.75),
      0 0 0 1em rgba(from var(--back-c) r g b/ 0.25);
    pointer-events: none;
    content: "";
  }
}
```

The first shadow is an`inset`one using the desired text RGB value and a`.75`alpha, which allows us to pass the RGB value to the SVG`filter`via the`.75`alpha point. The second shadow is an outer one using the desired background RGB value and a`.25`alpha, which allows us to pass the RGB value to the SVG`filter`via the`.25`alpha point.

The`border-color`uses the desired`span`background alpha value on the green channel (we’re using the green channel due to the same Chrome wide gamut bug mentioned earlier in this article) and has a`.5`alpha. This allows us to pass to the SVG`filter`the value of the desired`span`background alpha as the green channel value using the`.5`alpha point.

The negative`inset`(`-2em`) is set to compensate for both the`inset`shadow (with a`1em`spread) and for the`border`(with a`1em`width) because it’s very important that none of the visible parts of the pseudo (the`border`and the`box-shadow`using the`.25`,`.5`and`.75`alpha points) intersect the shape of the`span`background (using the`1`alpha point).

The`pointer-events: none`property is there in order to avoid any interference with the`span`text selection. We could have also used`z-index: -1`, since there is no intersection between the visible parts of the pseudo and the`span`background shape. Both of them do the job and in this case, it really doesn’t matter which we choose to use.

What we have so far definitely doesn’t look great, but… we’re getting there!

![before applying any filter](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/03/420622735-172f79d1-5f49-4c70-9b01-c9cde68974c0.png?resize=800%2C400&ssl=1)

Moving on to the`filter`, we start in a similar manner as before, by getting the`opaque`part. To do so, we preserve just just the fifth alpha point (`1`), while mapping all others to`0`. Everything that intially has an alpha of`0`(transparent part inside the frames around the`span`shape),`.25`(outermost dark blue frame),`.5`(middle green frame) or`.75`(innermost golden frame) becomes transparent.

```xml
<svg width='0' height='0' aria-hidden='true'>
  <filter id='go' color-interpolation-filters='sRGB'>
    <feComponentTransfer result='opaque'>
      <feFuncA type='table' tableValues='0 0 0 0 1'/>
    </feComponentTransfer>
  </filter>
</svg>
```

We’ve saved this result as`opaque`for when we need to use it later.

![the opaque result](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/03/420622938-0a6221ab-593a-4f45-93ca-1dc28820428e.png?resize=800%2C400&ssl=1)

Next, from the initial`filter`input, we extract the background RGB area by mapping the second (`.25`) alpha point to`1`, while mapping all others to`0`. Note that we don’t want the input of the second primitive to be the`result`of the first one, but the`filter`input, so we explicitly specify `in`as`SourceGraphic`.

```xml{7-9}
<svg width="0" height="0" aria-hidden="true">
  <filter id="go" color-interpolation-filters="sRGB">
    <feComponentTransfer result="opaque">
      <feFuncA type="table" tableValues="0 0 0 0 1" />
    </feComponentTransfer>

    <feComponentTransfer in="SourceGraphic">
      <feFuncA type="table" tableValues="0 1 0 0 0" />
    </feComponentTransfer>
  </filter>
</svg>
```

In theory, this second`feComponentTransfer`extracts second just the background RGB area (pseudo outer shadow area, using the second alpha point,`.25`). In practice, can you see what else it has picked up?

![the outer frame using the background RGB](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/03/420623150-858f198f-0791-40de-8dae-7a4af30623f7.png?resize=800%2C400&ssl=1)

If you cannot pick it up (it’s not easy), let’s remove the image backdrop and circle the problem areas:

![highlighting the problem areas](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/03/420624040-f48d5f15-0298-4ea1-923a-3dfcbdd96b92.png?resize=800%2C400&ssl=1)

Those black pixels it picks up are again due to anti-aliasing. At the rounded corners of the`span`background lines, we have semitransparent pixels in order for these corners to look smooth, not jagged. But then our second`feComponentTransfer` maps the pixels in the`[0, .25]`interval to`[0, 1]` and the pixels in the`[.25, .5]` interval to`[1, 0]`. And this doesn’t catch just the pixels of the pseudo’s outer shadow using the`.25`alpha point, but also the pixels in the`[0, .5]`interval at those rounded corners of those`span`background lines, which get a non-zero alpha too.

Now in our particular case where we have a black`span`background, we can safely just ignore those pixels when moving on to the next step. But if we were to have a red background there, things would be very different and those pixels could cause a lot of trouble.

That’s because at the next step we expand the background RGB frame we got to cover the entire`filter`area and we do that with a`feMorphology`primitive using the`dilate`operation. What this does is the following: for every channel of every pixel, it takes the*maximum*of all the values of that channel for the pixels lying within the specified`radius`(from the current pixel) along both the*x*and the*y*axes in both the negative and positive direction.

Below, you can see how this works for a channel whose values are either maxed out (`1`) or zeroed (`0`). For every pixel of the input (green outline around the current one), the corresponding output value for the same channel is the maximum of all the values for that channel in the vicinity of the current pixel (within the red square).

<VidStack src="https://videos.files.wordpress.com/SVWv7R53/dialation_mp4_hd_1080p.original.jpg?h=821" />

For our purpose, we first care about the alpha channel, since this turns opaque all transparent pixels that are within the specified`radius`from any opaque one along both axes in both directions, effectively dilating our frame to fill the area inside it.

But the maximum computation happens for the RGB channels too. Black has zero for all RGB channels, so those stray pixels don’t affect the result of the maximum computation since every single one of the RGB channels of the frame is above zero, which makes them be the result of the maximum for every single one of the RGB channels.

```xml{7-9,11-13}
<svg width="0" height="0" aria-hidden="true">
  <filter
    id="go"
    color-interpolation-filters="sRGB"
    primitiveUnits="objectBoundingBox"
  >
    <feComponentTransfer result="opaque">
      <feFuncA type="table" tableValues="0 0 0 0 1" />
    </feComponentTransfer>
    
    <feComponentTransfer in="SourceGraphic">
      <feFuncA type="table" tableValues="0 1 0 0 0" />
    </feComponentTransfer>
    <feMorphology operator="dilate" radius=".5" result="back-rgb" />
  </filter>
</svg>
```

Note that the`filter`now has`primitiveUnits`set to`objectBoundingBox`so values for attributes such as the`radius`attribute of`feMorphology`are not pixel values anymore, but relative to the`filter`input box size. This is because the size of our`filter`area is given by its input, whose exact pixel size is determined by the text content which we have no way of knowing. So we switch to relative units.

<VidStack src="https://videos.files.wordpress.com/y9XaZrfy/incresing-dialation_mp4_hd.original.jpg?w=680" />

There are two things to keep in mind here.

One, I’m not exactly happy to have to use such a relatively large dilation value, as it can negatively impact performance (at least from the tests on my laptop, the performance hit is obvious in both Firefox and Epiphany for the final demo). But unfortunately, my initial idea of extracting small squares in the top left corner and then tiling them ran into at least one different bug in every browser on at least one OS, so I guess this dilation was the only option left.

Two, if we had a red (`rgb(100% 0% 0%)`) instead of a black (`rgb(0% 0% 0%)`) background, then the maxed up red channel would cause trouble since`100%`is a bigger value than the`9.8%`of the frame (desired RGB being`rgb(9.8% 9.8% 43.9%)`), so then we’d end up with those pesky corner pixels bloating up and turning the intersection with the dilated frame purple, a mix (`rgb(max(100%, 9.8%) max(0%, 9.8%) max(0%, 43.9%))`) between the red channel of the initial red`span`background and the green and blue channels of the frame (which has the desired RGB value for the background and whose red channel we’d lose this way).

<VidStack src="https://videos.files.wordpress.com/WKB25WuV/increasing-dialation_mp4_hd.original.jpg?w=680" />

In such a case where a red input area would “contaminate” our desired background RGB, we’d first need to apply a small erosion to get rid of those pesky corner pixels*before*we apply the dilation. Erosion works in a similar manner to dilation, except we take the*minimum*channel value of all pixels within the set`radius`along both axes in both directions.

<VidStack src="https://videos.files.wordpress.com/GWdvgYeJ/erosion_mp4_hd_1080p.original.jpg?h=816" />

In our case, we care about the alpha channel erosions, all the transparent pixels around zeroing the alpha of those few ones we didn’t really mean to pick up.

```xml
<feMorphology radius='.01'/>
```

Note that`erode`is the default`operator`, so we don’t need to explicitly set it.

Back to our case, after dilating the frame to fill the entire`filter`area with the desired background RGB and saving this result as`back-rgb`, we extract (again, out of the initial`filter`input) the desired alpha as the green channel value of the pseudo border with a`.5`alpha. This means another`feComponentTransfer`, this time one mapping all alpha points to`0`, except for the third one (`.5`), which gets mapped to`1`(though in this one case the exact alpha it gets mapped to doesn’t really matter as long as its non-zero).

```xml{16-18}
<svg width="0" height="0" aria-hidden="true">
  <filter
    id="go"
    color-interpolation-filters="sRGB"
    primitiveUnits="objectBoundingBox"
  >
    <feComponentTransfer result="opaque">
      <feFuncA type="table" tableValues="0 0 0 0 1" />
    </feComponentTransfer>

    <feComponentTransfer in="SourceGraphic">
      <feFuncA type="table" tableValues="0 1 0 0 0" />
    </feComponentTransfer>
    <feMorphology operator="dilate" radius=".5" result="back-rgb" />

    <feComponentTransfer in="SourceGraphic">
      <feFuncA type="table" tableValues="0 0 1 0 0" />
    </feComponentTransfer>
  </filter>
</svg>
```

This gives us a green frame (red and blue channels zeroed, green channel set to the value of the desired alpha for the background of the`span`lines):

![the middle frame using the desired alpha on the green channel](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/03/421526552-d7aa5011-b420-42ad-86e9-7c218867d0f0.png?resize=800%2C416&ssl=1)

Now you can probably guess what follows: we`dilate`this green frame to cover the entire`filter`area. Again, we have those stray black pixels, but since they’re black, their channel values just get discarded when we perform the dilation, so we don’t need that erosion step in between.

```xml{19}
<svg width="0" height="0" aria-hidden="true">
  <filter
    id="go"
    color-interpolation-filters="sRGB"
    primitiveUnits="objectBoundingBox"
  >
    <feComponentTransfer result="opaque">
      <feFuncA type="table" tableValues="0 0 0 0 1" />
    </feComponentTransfer>

    <feComponentTransfer in="SourceGraphic">
      <feFuncA type="table" tableValues="0 1 0 0 0" />
    </feComponentTransfer>
    <feMorphology operator="dilate" radius=".5" result="back-rgb" />

    <feComponentTransfer in="SourceGraphic">
      <feFuncA type="table" tableValues="0 0 1 0 0" />
    </feComponentTransfer>
    <feMorphology operator="dilate" radius=".5" />
  </filter>
</svg>
```

We don’t save the`result`of this primitive this time, but we’ll get to that in a moment. This is what we have now – not too exciting yet, though things are about to change.

![middle frame dilated to fill entire filter area](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/03/421563823-bef2a12e-63c3-48ae-8c03-ab698869dae1-1.png?resize=800%2C512&ssl=1)

Next, we use`feColorMatrix`to give this layer covering the entire`filter`area an alpha equal to that of its green channel. This is why we don’t save the result of the second`feMorphology`– because we only feed it into the input of the very next primitive,`feColorMatrix`and then we don’t need it anywhere after that. We don’t care about the RGB values of the`result`, only about the alpha, so we just zero them all.

```xml{20-25} :collapsed-lines
<svg width="0" height="0" aria-hidden="true">
  <filter
    id="go"
    color-interpolation-filters="sRGB"
    primitiveUnits="objectBoundingBox"
  >
    <feComponentTransfer result="opaque">
      <feFuncA type="table" tableValues="0 0 0 0 1" />
    </feComponentTransfer>
    
    <feComponentTransfer in="SourceGraphic">
      <feFuncA type="table" tableValues="0 1 0 0 0" />
    </feComponentTransfer>
    <feMorphology operator="dilate" radius=".5" result="back-rgb" />
    
    <feComponentTransfer in="SourceGraphic">
      <feFuncA type="table" tableValues="0 0 1 0 0" />
    </feComponentTransfer>
    <feMorphology operator="dilate" radius=".5" />
    <feColorMatrix 
      values="0 0 0 0 0
              0 0 0 0 0
              0 0 0 0 0
              0 1 0 0 0"
    />
  </filter>
</svg>
```

Basically, what this`feColorMatrix`does is set the output alpha channel to be equal to the input green channel (well, to`1`multiplied with the input green channel), regardless of the values of the other input channels (red, blue, alpha). This way, we recover the alpha channel from the green one.

![alpha value finally on the alpha channel](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/03/421564769-35c90577-cc28-417d-8f11-fd28e1baaf26.png?resize=800%2C512&ssl=1)

Next step is to intersect the previously saved`back-rgb`result with this one, so we keep the RGB channels of that layer and the alpha channel of this one.

```xml{26} :collapsed-lines
<svg width="0" height="0" aria-hidden="true">
  <filter
    id="go"
    color-interpolation-filters="sRGB"
    primitiveUnits="objectBoundingBox"
  >
    <feComponentTransfer result="opaque">
      <feFuncA type="table" tableValues="0 0 0 0 1" />
    </feComponentTransfer>

    <feComponentTransfer in="SourceGraphic">
      <feFuncA type="table" tableValues="0 1 0 0 0" />
    </feComponentTransfer>
    <feMorphology operator="dilate" radius=".5" result="back-rgb" />

    <feComponentTransfer in="SourceGraphic">
      <feFuncA type="table" tableValues="0 0 1 0 0" />
    </feComponentTransfer>
    <feMorphology operator="dilate" radius=".5" />
    <feColorMatrix
      values="0 0 0 0 0
              0 0 0 0 0
              0 0 0 0 0
              0 1 0 0 0"
    />
    <feComposite in="back-rgb" operator="in" />
  </filter>
</svg>
```

What happens here is the alphas of the two input layers (`1`for`back-rgb`and the desired`span`background alpha for the other) are multiplied to give us the output alpha. At the same time, we only keep the RGB values of the top one (`back-rgb`) for the output.

![the desired semi-transparent background, filling the filter area](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/03/421566248-cb88abc1-50fa-407c-9820-6484b5272908.png?resize=800%2C512&ssl=1)

We now have the entire filter area covered by a layer with the desired RGBA for the`span`background lines, so the next step is to restrict it to the area of those`span`lines,`opaque`. That is, only keep it at the intersection with that area and save the`result`as`back`.

```xml{27} :collapsed-lines
<svg width="0" height="0" aria-hidden="true">
  <filter
    id="go"
    color-interpolation-filters="sRGB"
    primitiveUnits="objectBoundingBox"
  >
    <feComponentTransfer result="opaque">
      <feFuncA type="table" tableValues="0 0 0 0 1" />
    </feComponentTransfer>

    <feComponentTransfer in="SourceGraphic">
      <feFuncA type="table" tableValues="0 1 0 0 0" />
    </feComponentTransfer>
    <feMorphology operator="dilate" radius=".5" result="back-rgb" />

    <feComponentTransfer in="SourceGraphic">
      <feFuncA type="table" tableValues="0 0 1 0 0" />
    </feComponentTransfer>
    <feMorphology operator="dilate" radius=".5" />
    <feColorMatrix
      values="0 0 0 0 0
              0 0 0 0 0
              0 0 0 0 0
              0 1 0 0 0"
    />
    <feComposite in="back-rgb" operator="in" />
    <feComposite in2="opaque" operator="in" result="back" />
  </filter>
</svg>
```

It finally looks like we’re getting somewhere!

![the semi-transparent dark blue background of the`span`](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/03/421567092-20782bfb-8bd8-47a4-955d-1f7e8f7638b2.png?resize=800%2C416&ssl=1)

Next, we can move on to the text!

We start by extracting the text RGB area by mapping the fourth (`.75`) alpha point to`1`, while mapping all others to`0`. Again, we explicitly specify `in` as `SourceGraphic`.

```xml{29-31} :collapsed-lines
<svg width="0" height="0" aria-hidden="true">
  <filter
    id="go"
    color-interpolation-filters="sRGB"
    primitiveUnits="objectBoundingBox"
  >
    <feComponentTransfer result="opaque">
      <feFuncA type="table" tableValues="0 0 0 0 1" />
    </feComponentTransfer>

    <feComponentTransfer in="SourceGraphic">
      <feFuncA type="table" tableValues="0 1 0 0 0" />
    </feComponentTransfer>
    <feMorphology operator="dilate" radius=".5" result="back-rgb" />

    <feComponentTransfer in="SourceGraphic">
      <feFuncA type="table" tableValues="0 0 1 0 0" />
    </feComponentTransfer>
    <feMorphology operator="dilate" radius=".5" />
    <feColorMatrix
      values="0 0 0 0 0
              0 0 0 0 0
              0 0 0 0 0
              0 1 0 0 0"
    />
    <feComposite in="back-rgb" operator="in" />
    <feComposite in2="opaque" operator="in" result="back" />

    <feComponentTransfer in="SourceGraphic">
      <feFuncA type="table" tableValues="0 0 0 1 0" />
    </feComponentTransfer>
  </filter>
</svg>
```

This gives us yet another frame, this time one in the gold we want for the text.

![the inner frame using the text RGB](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/03/421568337-289ed7d9-92db-4c73-b5e0-9fcd041b98b3.png?resize=800%2C416&ssl=1)

Just like we did for the other frames, we`dilate`this one too in order to make it fill the entire`filter`area and save this result as`text-rgb`.

```xml{32} :collapsed-lines
<svg width="0" height="0" aria-hidden="true">
  <filter
    id="go"
    color-interpolation-filters="sRGB"
    primitiveUnits="objectBoundingBox"
  >
    <feComponentTransfer result="opaque">
      <feFuncA type="table" tableValues="0 0 0 0 1" />
    </feComponentTransfer>
    
    <feComponentTransfer in="SourceGraphic">
      <feFuncA type="table" tableValues="0 1 0 0 0" />
    </feComponentTransfer>
    <feMorphology operator="dilate" radius=".5" result="back-rgb" />

    <feComponentTransfer in="SourceGraphic">
      <feFuncA type="table" tableValues="0 0 1 0 0" />
    </feComponentTransfer>
    <feMorphology operator="dilate" radius=".5" />
    <feColorMatrix 
      values="0 0 0 0 0
              0 0 0 0 0
              0 0 0 0 0
              0 1 0 0 0"
    />
    <feComposite in="back-rgb" operator="in" />
    <feComposite in2="opaque" operator="in" result="back" />

    <feComponentTransfer in="SourceGraphic">
      <feFuncA type="table" tableValues="0 0 0 1 0" />
    </feComponentTransfer>
    <feMorphology operator="dilate" radius=".5" result="text-rgb" />
  </filter>
</svg>
```

![inner frame dilated to fill entire filter area](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/03/421569320-65eb1151-e0fa-4d6e-a024-25b6ccadde1c.png?resize=800%2C512&ssl=1)

Then we extract the text shape from the`opaque`layer, just like we did before, using the green channel like an alpha mask.

```xml{33-39} :collapsed-lines
<svg width="0" height="0" aria-hidden="true">
  <filter
    id="go"
    color-interpolation-filters="sRGB"
    primitiveUnits="objectBoundingBox"
  >
    <feComponentTransfer result="opaque">
      <feFuncA type="table" tableValues="0 0 0 0 1" />
    </feComponentTransfer>
      
    <feComponentTransfer in="SourceGraphic">
      <feFuncA type="table" tableValues="0 1 0 0 0" />
    </feComponentTransfer>
    <feMorphology operator="dilate" radius=".5" result="back-rgb" />
  
    <feComponentTransfer in="SourceGraphic">
      <feFuncA type="table" tableValues="0 0 1 0 0" />
    </feComponentTransfer>
    <feMorphology operator="dilate" radius=".5" />
    <feColorMatrix 
      values="0 0 0 0 0
              0 0 0 0 0
              0 0 0 0 0
              0 1 0 0 0"
    />
    <feComposite in="back-rgb" operator="in" />
    <feComposite in2="opaque" operator="in" result="back" />
  
    <feComponentTransfer in="SourceGraphic">
      <feFuncA type="table" tableValues="0 0 0 1 0" />
    </feComponentTransfer>
    <feMorphology operator="dilate" radius=".5" result="text-rgb" />
    <feColorMatrix
      in="opaque"
      values="0 0 0 0 0
              0 0 0 0 0
              0 0 0 0 0
              0 1 0 0 0"
    />
  </filter>
</svg>
```

::: tabs

@tab:active <FontIcon icon="fa-brands fa-chrome"/>

My expectation was that this would give us just the text shape like below, which is what happens in Chrome.

![the text shape extracted using the green channel (Chrome)](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/03/421569898-090dbf24-dc65-4dff-830b-b538d97c6128.png?resize=800%2C416&ssl=1)

@tab <FontIcon icon="fa-brands fa-firefox"/>

However, Firefox does something interesting here and thinking it through, I’m not entirely sure it’s wrong.

![Firefox extracting more than just the text shapes](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/03/421581023-73fac2b0-fa13-4029-b449-71036fdc48b7.png?resize=800%2C416&ssl=1)

:::

What seems to happen is that Chrome forgets all about the RGB values of the semi-transparent areas of the pseudo and just zeroes them when zeroing their alphas in the first `feComponentTransfer` primitive to extract the`opaque`part (the`span`with white text on solid black background). Then when using the green channel as an alpha mask on the opaque part, all that’s not transparent is the white text, where the green channel is maxed out.

However, Firefox doesn’t seem to throw away the RGB values of those semi-transparent frames created by the`border`and`box-shadow`on the pseudo, even if it also zeroes their alphas via the first primitive as well. So even though the`opaque`result looks the same in both browsers, it’s not really the same. Then when we get to this latest`feColorMatrix`step, Firefox finds green in those now fully transparent frames because even though their alpha got zeroed to get the`opaque`result, their RGB values got preserved.

Whichever browser is right, there’s a very simple way to get the result we want cross-browser: intersect what we have now with the`opaque`result. It doesn’t even matter the RGB values of which layer we choose to preserve as a result of this intersection because we won’t be using them anyway.

```xml{40} :collapsed-lines
<svg width="0" height="0" aria-hidden="true">
  <filter
    id="go"
    color-interpolation-filters="sRGB"
    primitiveUnits="objectBoundingBox"
  >
    <feComponentTransfer result="opaque">
      <feFuncA type="table" tableValues="0 0 0 0 1" />
    </feComponentTransfer>
      
    <feComponentTransfer in="SourceGraphic">
      <feFuncA type="table" tableValues="0 1 0 0 0" />
    </feComponentTransfer>
    <feMorphology operator="dilate" radius=".5" result="back-rgb" />
    
    <feComponentTransfer in="SourceGraphic">
      <feFuncA type="table" tableValues="0 0 1 0 0" />
    </feComponentTransfer>
    <feMorphology operator="dilate" radius=".5" />
    <feColorMatrix 
      values="0 0 0 0 0
              0 0 0 0 0
              0 0 0 0 0
              0 1 0 0 0"
    />
    <feComposite in="back-rgb" operator="in" />
    <feComposite in2="opaque" operator="in" result="back" />
    
    <feComponentTransfer in="SourceGraphic">
      <feFuncA type="table" tableValues="0 0 0 1 0" />
    </feComponentTransfer>
    <feMorphology operator="dilate" radius=".5" result="text-rgb" />
    <feColorMatrix
      in="opaque"
      values="0 0 0 0 0
              0 0 0 0 0
              0 0 0 0 0
              0 1 0 0 0"
    />
    <feComposite in="opaque" operator="in" />
  </filter>
</svg>
```

The next step is to keep the`text-rgb`layer only at the intersection with the text we just got.

```xml{41} :collapsed-lines
<svg width="0" height="0" aria-hidden="true">
  <filter
    id="go"
    color-interpolation-filters="sRGB"
    primitiveUnits="objectBoundingBox"
  >
    <feComponentTransfer result="opaque">
      <feFuncA type="table" tableValues="0 0 0 0 1" />
    </feComponentTransfer>
        
    <feComponentTransfer in="SourceGraphic">
      <feFuncA type="table" tableValues="0 1 0 0 0" />
    </feComponentTransfer>
    <feMorphology operator="dilate" radius=".5" result="back-rgb" />
      
    <feComponentTransfer in="SourceGraphic">
      <feFuncA type="table" tableValues="0 0 1 0 0" />
    </feComponentTransfer>
    <feMorphology operator="dilate" radius=".5" />
    <feColorMatrix 
      values="0 0 0 0 0
              0 0 0 0 0
              0 0 0 0 0
              0 1 0 0 0"
    />
    <feComposite in="back-rgb" operator="in" />
    <feComposite in2="opaque" operator="in" result="back" />
      
    <feComponentTransfer in="SourceGraphic">
      <feFuncA type="table" tableValues="0 0 0 1 0" />
    </feComponentTransfer>
    <feMorphology operator="dilate" radius=".5" result="text-rgb" />
    <feColorMatrix
      in="opaque"
      values="0 0 0 0 0
              0 0 0 0 0
              0 0 0 0 0
              0 1 0 0 0"
    />
    <feComposite in="opaque" operator="in" />
    <feComposite in="text-rgb" operator="in" />
  </filter>
</svg>
```

![the golden text of the`span`](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/03/421573835-3385e69e-5c01-4d25-9863-281e7d5e4a23.png?resize=800%2C416&ssl=1)

Finally, we place this on top of the`back`layer with a`feBlend`, just like we did before.

```xml{42} :collapsed-lines
<svg width="0" height="0" aria-hidden="true">
  <filter
    id="go"
    color-interpolation-filters="sRGB"
    primitiveUnits="objectBoundingBox"
  >
    <feComponentTransfer result="opaque">
      <feFuncA type="table" tableValues="0 0 0 0 1" />
    </feComponentTransfer>
          
    <feComponentTransfer in="SourceGraphic">
      <feFuncA type="table" tableValues="0 1 0 0 0" />
    </feComponentTransfer>
    <feMorphology operator="dilate" radius=".5" result="back-rgb" />
      
    <feComponentTransfer in="SourceGraphic">
      <feFuncA type="table" tableValues="0 0 1 0 0" />
    </feComponentTransfer>
    <feMorphology operator="dilate" radius=".5" />
    <feColorMatrix 
      values="0 0 0 0 0
              0 0 0 0 0
              0 0 0 0 0
              0 1 0 0 0"
    />
    <feComposite in="back-rgb" operator="in" />
    <feComposite in2="opaque" operator="in" result="back" />
        
    <feComponentTransfer in="SourceGraphic">
      <feFuncA type="table" tableValues="0 0 0 1 0" />
    </feComponentTransfer>
    <feMorphology operator="dilate" radius=".5" result="text-rgb" />
    <feColorMatrix
      in="opaque"
      values="0 0 0 0 0
              0 0 0 0 0
              0 0 0 0 0
              0 1 0 0 0"
    />
    <feComposite in="opaque" operator="in" />
    <feComposite in="text-rgb" operator="in" />
    <feBlend in2="back" />
  </filter>
</svg>
```

This is our final result!

<CodePen
  user="thebabydino"
  slug-hash="XJWaMMb"
  title="inline semitransparent text background with no overlap #8b"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

This allows us to have full control from the CSS over the text and background RGB, as well as over the background alpha, without needing to hardcode any of them in the SVG`filter`, which means we don’t need a different SVG`filter`if we want to set a different value for any of them on one o the elements the filter is applied to.

Now you may be thinking… well, this looks ugly with those semi-transparent frames before the filter is`applied`, so what if the filter fails? Well, the fix is really simple.`clip-path`gets applied after `filter`, so we can clip out those frames. They still get used for the`filter`if the`filter`is applied, but if it fails, we are still left with the very reasonable choice of white text on black background.

The following demo has different text and background combinations for each paragraph. All paragraphs use the exact same`filter`(the one above), they just have different values for`--text-c`,`--back-c`and`--a`.

<CodePen
  user="thebabydino"
  slug-hash="EaxmJag"
  title="inline semitransparent text background with no overlap #8c"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "A Deep Dive into the Inline Background Overlap Problem",
  "desc": "`box-decoration-break: clone;` in CSS can help us make for interesting backgrounds across lines of text that break, but when opacity gets involved, things can get complicated.",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/overlapping-inline-backgrounds.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
