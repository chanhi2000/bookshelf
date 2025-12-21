---
lang: en-US
title: "Recreating Gmail’s Google Gemini Animation"
description: "Article(s) > Recreating Gmail’s Google Gemini Animation"
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
      content: "Article(s) > Recreating Gmail’s Google Gemini Animation"
    - property: og:description
      content: "Recreating Gmail’s Google Gemini Animation"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/recreating-gmails-google-gemini-animation.html
prev: /programming/css/articles/README.md
date: 2025-09-26
isOriginal: false
author:
  - name: John Rhea
    url : https://css-tricks.com/author/johnrhea/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/09/gemini-button.png
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
  name="Recreating Gmail’s Google Gemini Animation"
  desc="John Rhea challenged himself to recreate the fancy button using the new CSS shape() function sprinkled with animation to get things pretty close."
  url="https://css-tricks.com/recreating-gmails-google-gemini-animation"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/09/gemini-button.png"/>

I always see this Google Gemini button up in the corner in Gmail. When you hover over it, it does this cool animation where the little four-pointed star spins and the outer shape morphs between a couple different shapes that are also spinning.

![Animated gif of the Gemini button morphing between shapes in blue and purple,](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/09/s_772DD1240E939BB7207B787AFAEF6FD6A538BB31ECB901932A44C14EE29E1539_1758040071291_geminianimation.gif?resize=92%2C92&ssl=1)

I challenged myself to recreate the button using the new CSS [<VPIcon icon="iconfont icon-css-tricks"/>`shape()`](https://css-tricks.com/almanac/functions/s/shape/) function sprinkled with animation to get things pretty close. Let me walk you through it.

---

## Drawing the Shapes

Breaking it down, we need five shapes in total:

1. Four-pointed star
2. Flower-ish thing (yes, that’s the technical term)
3. Cylinder-ish thing (also the correct technical term)
4. Rounded hexagon
5. Circle

I drew these shapes in a graphics editing program (I like [<VPIcon icon="fas fa-globe"/>Affinity Designer](https://affinity.serif.com/en-us/designer/), but any app that lets you draw vector shapes should work), outputted them in SVG, and then used a tool, like [<VPIcon icon="fas fa-globe"/>Temani Afif’s generator](https://css-generators.com/svg-to-css/), to translate the SVG paths the program generated to the CSS `shape()` syntax.

Now, before I exported the shapes from Affinity Designer, I made sure the flower, hexagon, circle, and cylinder all had the same number of anchor points. If they don’t have the same number, then the shapes will jump from one to the next and won’t do any morphing. So, let’s use a consistent number of anchor points in each shape — even the circle — and we can watch these shapes morph into each other.

![A two by two grid of shapes. Top row, circle and flower. Bottom row cylinder and hexagon.](https://css-tricks.com/wp-content/uploads/2025/09/s_772DD1240E939BB7207B787AFAEF6FD6A538BB31ECB901932A44C14EE29E1539_1758152803569_shapespoints.svg)

I set twelve anchor points on each shape because that was the highest amount used (the hexagon had two points near each curved corner).

Something related (and possibly hard to solve, depending on your graphics program) is that some of my shapes were wildly contorted when animating between shapes. For example, many shapes became smaller and began spinning before morphing into the next shape, while others were much more seamless. I eventually figured out that the interpolation was matching each shape’s starting point and continued matching points as it followed the shape.

The result is that the matched points move between shapes, so if the starting point for one shape is on opposite side of the starting point of the second shape, a lot of movement is necessary to transition from one shape’s starting point to the next shape’s starting point.

![A circle shape and a flower shape sown next to each other with 12 points along each share. A third shape is shown overlapping the two shapes one on top of the other.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/09/pointmatching.jpg?resize=1000%2C1000&ssl=1)

<CodePen
  user="undeadinstitute"
  slug-hash="KwVPrKv"
  title="Game, Set, Matched"
  :default-tab="['css','result']"
  :theme="dark"/>

Luckily, the circle was the only shape that gave me trouble, so I was able to spin it (with some trial and error) until its starting point more closely matched the other starting points.

Another issue I ran into was that the cylinder-ish shape had two individual straight lines in `shape()` with `line` commands rather than using the `curve` command. This prevented the animation from morphing into the next shape. It immediately snapped to the next image without animating the transition, skipping ahead to the next shape (both when going into the cylinder and coming out of it).

I went back into Affinity Designer and ever-so-slightly added curvature to the two lines, and then it morphed perfectly. I initially thought this was a `shape()` quirk, but the same thing happened when I attempted the animation with the [`path()`](https://css-tricks.com/almanac/functions/p/path/) function, suggesting it’s more an interpolation limitation than it is a `shape()` limitation.

Once I finished adding my `shape()` values, I defined a CSS variable for each shape. This makes the later uses of each `shape()` more readable, not to mention easier to maintain. With twelve lines per shape the code is stinkin’ long (technical term) so we’ve put it behind an accordion menu.

::: details View Shape Code

```css :collapsed-lines
:root {
  --hexagon: shape(
    evenodd from 6.47% 67.001%,
    curve by 0% -34.002% with -1.1735% -7.7% / -1.1735% -26.302%, 
    curve by 7.0415% -12.1965% with 0.7075% -4.641% / 3.3765% -9.2635%, 
    curve by 29.447% -17.001% with 6.0815% -4.8665% / 22.192% -14.1675%, 
    curve by 14.083% 0% with 4.3725% -1.708% / 9.7105% -1.708%, 
    curve by 29.447% 17.001% with 7.255% 2.8335% / 23.3655% 12.1345%, 
    curve by 7.0415% 12.1965% with 3.665% 2.933% / 6.334% 7.5555%, 
    curve by 0% 34.002% with 1.1735% 7.7% / 1.1735% 26.302%, 
    curve by -7.0415% 12.1965% with -0.7075% 4.641% / -3.3765% 9.2635%, 
    curve by -29.447% 17.001% with -6.0815% 4.8665% / -22.192% 14.1675%, 
    curve by -14.083% 0% with -4.3725% 1.708% / -9.7105% 1.708%, 
    curve by -29.447% -17.001% with -7.255% -2.8335% / -23.3655% -12.1345%, 
    curve by -7.0415% -12.1965% with -3.665% -2.933% / -6.334% -7.5555%, 
    close
  );

  --flower: shape(
    evenodd from 17.9665% 82.0335%,
    curve by -12.349% -32.0335% with -13.239% -5.129% / -18.021% -15.402%, 
    curve by -0.0275% -22.203% with -3.1825% -9.331% / -3.074% -16.6605%, 
    curve by 12.3765% -9.8305% with 2.3835% -4.3365% / 6.565% -7.579%, 
    curve by 32.0335% -12.349% with 5.129% -13.239% / 15.402% -18.021%, 
    curve by 20.4535% -0.8665% with 8.3805% -2.858% / 15.1465% -3.062%, 
    curve by 11.58% 13.2155% with 5.225% 2.161% / 9.0355% 6.6475%, 
    curve by 12.349% 32.0335% with 13.239% 5.129% / 18.021% 15.402%, 
    curve by 0.5715% 21.1275% with 2.9805% 8.7395% / 3.0745% 15.723%, 
    curve by -12.9205% 10.906% with -2.26% 4.88% / -6.638% 8.472%, 
    curve by -32.0335% 12.349% with -5.129% 13.239% / -15.402% 18.021%, 
    curve by -21.1215% 0.5745% with -8.736% 2.9795% / -15.718% 3.0745%, 
    curve by -10.912% -12.9235% with -4.883% -2.2595% / -8.477% -6.6385%, 
    close
  );

  --cylinder: shape(
    evenodd from 10.5845% 59.7305%, 
    curve by 0% -19.461% with -0.113% -1.7525% / -0.11% -18.14%, 
    curve by 10.098% -26.213% with 0.837% -10.0375% / 3.821% -19.2625%, 
    curve by 29.3175% -13.0215% with 7.2175% -7.992% / 17.682% -13.0215%, 
    curve by 19.5845% 5.185% with 7.1265% 0% / 13.8135% 1.887%, 
    curve by 9.8595% 7.9775% with 3.7065% 2.1185% / 7.035% 4.8195%, 
    curve by 9.9715% 26.072% with 6.2015% 6.933% / 9.4345% 16.082%, 
    curve by 0% 19.461% with 0.074% 1.384% / 0.0745% 17.7715%, 
    curve by -13.0065% 29.1155% with -0.511% 11.5345% / -5.021% 21.933%, 
    curve by -26.409% 10.119% with -6.991% 6.288% / -16.254% 10.119%, 
    curve by -20.945% -5.9995% with -7.6935% 0% / -14.8755% -2.199%, 
    curve by -8.713% -7.404% with -3.255% -2.0385% / -6.1905% -4.537%, 
    curve by -9.7575% -25.831% with -6.074% -6.9035% / -9.1205% -15.963%, 
    close
  );

  --star: shape(
    evenodd from 50% 24.787%, 
    curve by 7.143% 18.016% with 0% 0% / 2.9725% 13.814%, 
    curve by 17.882% 7.197% with 4.171% 4.2025% / 17.882% 7.197%, 
    curve by -17.882% 8.6765% with 0% 0% / -13.711% 4.474%, 
    curve by -7.143% 16.5365% with -4.1705% 4.202% / -7.143% 16.5365%, 
    curve by -8.6115% -16.5365% with 0% 0% / -4.441% -12.3345%, 
    curve by -16.4135% -8.6765% with -4.171% -4.2025% / -16.4135% -8.6765%, 
    curve by 16.4135% -7.197% with 0% 0% / 12.2425% -2.9945%, 
    curve by 8.6115% -18.016% with 4.1705% -4.202% / 8.6115% -18.016%, 
    close
  );

  --circle: shape(
    evenodd from 13.482% 79.505%, 
    curve by -7.1945% -12.47% with -1.4985% -1.8575% / -6.328% -10.225%, 
    curve by 0.0985% -33.8965% with -4.1645% -10.7945% / -4.1685% -23.0235%, 
    curve by 6.9955% -12.101% with 1.72% -4.3825% / 4.0845% -8.458%, 
    curve by 30.125% -17.119% with 7.339% -9.1825% / 18.4775% -15.5135%, 
    curve by 13.4165% 0.095% with 4.432% -0.6105% / 8.9505% -0.5855%, 
    curve by 29.364% 16.9% with 11.6215% 1.77% / 22.102% 7.9015%, 
    curve by 7.176% 12.4145% with 3.002% 3.7195% / 5.453% 7.968%, 
    curve by -0.0475% 33.8925% with 4.168% 10.756% / 4.2305% 22.942%, 
    curve by -7.1135% 12.2825% with -1.74% 4.4535% / -4.1455% 8.592%, 
    curve by -29.404% 16.9075% with -7.202% 8.954% / -18.019% 15.137%, 
    curve by -14.19% -0.018% with -4.6635% 0.7255% / -9.4575% 0.7205%, 
    curve by -29.226% -16.8875% with -11.573% -1.8065% / -21.9955% -7.9235%, 
    close
  );
}
```

:::

If all that looks like gobbledygook to you, it largely does to me too (and I wrote the [<VPIcon icon="iconfont icon-css-tricks"/>`shape()` Almanac entry](https://css-tricks.com/almanac/functions/s/shape/)). As I said above, I converted them from stuff I drew to `shape()`s with a tool. If you can recognize the shapes from the custom property names, then you’ll have all you need to know to keep following along.

---

## Breaking Down the Animation

After staring at the Gmail animation for longer than I would like to admit, I was able to recognize six distinct phases:

First, on hover:

1. The four-pointed star spins to the right and changes color.
2. The fancy blue shape spreads out from underneath the star shape.
3. The fancy blue shape morphs into another shape while spinning.
4. The purplish color is wiped across the fancy blue shape.

Then, after hover:

5. The fancy blue shape contracts (basically the reverse of Phase 2).
6. The four-pointed star spins left and returns to its initial color (basically the reverse of Phase 1).

That’s the run sheet we’re working with! We’ll write the CSS for all that in a bit, but first I’d like to set up the HTML structure that we’re hooking into.

---

## The HTML

I’ve always wanted to be one of those front-enders who make jaw-dropping art out of CSS, like illustrating the Sistine chapel ceiling with a single `div` (cue someone commenting with a CodePen doing just that). But, alas, I decided I needed two `div`s to accomplish this challenge, and I thank you for looking past my shame. To those of you who turned up your nose and stopped reading after that admission: I can safely call you a Flooplegerp and you’ll never know it.

(To those of you still with me, I don’t actually know what a Flooplegerp is. But I’m sure it’s bad.)

Because the animation needs to spread out the blue shape from underneath the star shape, they need to be two separate shapes. And we can’t shrink or clip the main element to do this because that would obscure the star.

So, yeah, that’s why I’m reaching for a second `div`: to handle the fancy shape and how it needs to move and interact with the star shape.

```html
<div id="geminianimation">
  <div></div>
</div>
```

---

## The Basic CSS Styling

Each shape is essentially defined with the same box with the same dimensions and margin spacing.

```css
#geminianimation {
  width: 200px;
  aspect-ratio: 1/1;
  margin: 50px auto;
  position: relative;
}
```

We can clip the box to a particular shape using a pseudo-element. For example, let’s clip a star shape using the CSS variable (`--star`) we defined for it and set a background color on it:

```css
#geminianimation {
  width: 200px;
  aspect-ratio: 1;
  margin: 50px auto;
  position: relative;

  &::before {
    content: "";
    clip-path: var(--star);
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: #494949;
  }
}
```

<CodePen
  user="undeadinstitute"
  slug-hash="myeZZoX"
  title="Four Pointed Star"
  :default-tab="['css','result']"
  :theme="dark"/>

We can hook into the container’s child `div` and use it to establish the animation’s starting shape, which is the flower (clipped with our `--flower` variable):

```css
#geminianimation div {
  width: 100%;
  height: 100%;
  clip-path: var(--flower);
  background: linear-gradient(135deg, #217bfe, #078efb, #ac87eb, #217bfe);
}
```

What we get is a star shape stacked right on top of a flower shape. We’re almost done with our initial CSS, but in order to recreate the animated color wipes, we need a much larger surface that allows us to “change” colors by moving the background gradient’s position. Let’s move the gradient so that it is declared on a pseudo element instead of the child `div`, and size it up by `400%` to give us additional breathing room.

```css
#geminianimation div {
  width: 100%;
  height: 100%;
  clip-path: var(--flower);

  &::after {
    content: "";
    background: linear-gradient(135deg, #217bfe, #078efb, #ac87eb, #217bfe);
    width: 400%;
    height: 400%;
    position: absolute;
  }
}
```

Now we can clearly see how the shapes are positioned relative to each other:

<CodePen
  user="undeadinstitute"
  slug-hash="MYaNgao"
  title="The Fancy Shape"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Animating Phases 1 and 6

Now, I’ll admit, in my own hubris, I’ve turned up my very own schnoz at the humble [<VPIcon icon="iconfont icon-css-tricks"/>`transition`](https://css-tricks.com/almanac/properties/t/transition/) property because my thinking is typically, Transitions are great for getting started in animation and for quick things, but *real* animations are done with CSS keyframes. (Perhaps I, too, am a Flooplegerp.)

But now I see the error of my ways. I can write a set of keyframes that rotate the star 180 degrees, turn its color white(ish), and have it stay that way for as long as the element is hovered. What I can’t do is animate the star back to what it was when the element is un-hovered.

I can, however, do that with the `transition` property. To do this, we add `transition: 1s ease-in-out;` on the `::before`, adding the new background color and rotating things on `:hover` over the `#geminianimation` container. This accounts for the first and sixth phases of the animation we outlined earlier.

```css
#geminianimation {
  &::before {
    /* Existing styles */
    transition: 1s ease-in-out;
  }
  &:hover {
    &::before {
      transform: rotate(180deg);
      background-color: #FAFBFE;
    }
  }
}
```


---

## Animating Phases 2 and 5

We can do something similar for the second and fifth phases of the animation since they are mirror reflections of each other. Remember, in these phases, we’re spreading and contracting the fancy blue shape.

We can start by shrinking the inner `div`’s `scale` to zero initially, then expand it back to its original size (`scale: 1`) on `:hover` (again using transitions):

```css
#geminianimation {
  div {
    scale: 0;
    transition: 1s ease-in-out;
  }
  &:hover {
    div {
      scale: 1;
  }
}
```

<CodePen
  user="undeadinstitute"
  slug-hash="XJmvKVv"
  title="Hubris Reimagined"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Animating Phase 3

Now, we very well *could* tackle this with a `transition` like we did the last two sets, but we probably *should not* do it… that is, unless you want to weep bitter tears and curse the day you first heard of CSS… not that I know from personal experience or anything… ha ha… ha.

CSS keyframes are a better fit here because there are multiple states to animate between that would require defining and orchestrating several different transitions. [**Keyframes are more adept at tackling multi-step animations**](/css-tricks.com/using-multi-step-animations-transitions.md).

What we’re basically doing is animating between different shapes that we’ve already defined as CSS variables that clip the shapes. The browser will handle interpolating between the shapes, so all we need is to tell CSS which shape we want clipped at each phase (or “section”) of this set of keyframes:

```css
@keyframes shapeshift {
  0% { clip-path: var(--circle); }
  25% { clip-path: var(--flower); }
  50% { clip-path: var(--cylinder); }
  75% { clip-path: var(--hexagon); }
  100% { clip-path: var(--circle); }
}
```

Yes, we could combine the first and last keyframes (`0%` and `100%`) into a single step, but we’ll need them separated in a second because we also want to animate the rotation at the same time. We’ll set the initial rotation to `0turn` and the final rotation `1turn` so that it can keep spinning smoothly as long as the animation is continuing:

```css
@keyframes shapeshift {
  0% {
    clip-path: var(--circle);
    rotate: 0turn;
  }
  25% {
    clip-path: var(--flower);
  }
  50% {
    clip-path: var(--cylinder);
  }
  75% {
    clip-path: var(--hexagon);
  }
  100% {
    clip-path: var(--circle);
    rotate: 1turn;
  }
}
```

::: note

Yes, `turn` is indeed a [**CSS unit**](/css-tricks.com/css-length-units.md), albeit one that often goes overlooked.

:::

We want the animation to be smooth as it interpolates between shapes. So, I’m setting the animation’s timing function with `ease-in-out`. Unfortunately, this will also slow down the rotation as it starts and ends. However, because we’re both beginning and ending with the circle shape, the fact that the rotation slows coming out of 0% and slows again as it heads into 100% is not noticeable — a circle looks like a circle no matter its rotation. If we were ending with a different shape, the easing would be visible and I would use two separate sets of keyframes — one for the shape-shift and one for the rotation — and call them both on the `#geminianimation` child `div` .

```css
#geminianimation:hover {
  div {
    animation: shapeshift 5s ease-in-out infinite forwards;
  }
}
```

---

## Animating Phase 4

That said, we still do need one more set of keyframes, specifically for changing the shape’s color. Remember how we set a linear gradient on the parent container’s `::after` pseudo, then we also increased the pseudo’s `width` and `height`? Here’s that bit of code again:

```css
#geminianimation div {
  width: 100%;
  height: 100%;
  clip-path: var(--flower);

  &::after {
    content: "";
    background: linear-gradient(135deg, #217bfe, #078efb, #ac87eb, #217bfe);
    width: 400%;
    height: 400%;
    position: absolute;
  }
}
```

The gradient is that large because we’re only showing part of it at a time. And that means we can `translate` the gradient’s position to move the gradient at certain keyframes. `400%` can be nicely divided into quarters, so we can move the gradient by, say, three-quarters of its size. Since its parent, the `#geminianimation div`, is already spinning, we don’t need any fancy movements to make it feel like the color is coming from different directions. We just `translate` it linearly and the spin adds some variability to what direction the color wipe comes from.

```css
@keyframes gradientMove {
  0% {
    translate: 0 0;
  }
  100% {
    translate: -75% -75%;
  }
}
```

---

## One final refinement

Instead of using the flower as the default shape, let’s change it to circle. This smooths things out when the hover interaction causes the animation to stop and return to its initial position.

And there you have it:

<CodePen
  user="undeadinstitute"
  slug-hash="NPGQroO"
  title="Gmail Gemini Animation Remake"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Wrapping up

We did it! Is this exactly how Google accomplished the same thing? Probably not. In all honesty, I never inspected the animation code because I wanted to approach it from a clean slate and figure out how I would do it purely in CSS.

That’s the fun thing about a challenge like this: there are different ways to accomplish the same thing (or something similar), and your way of doing it is likely to be different than mine. It’s fun to see a variety of approaches.

Which leads me to ask: How would you have approached the Gemini button animation? What considerations would you take into account that maybe I haven’t?

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Recreating Gmail’s Google Gemini Animation",
  "desc": "John Rhea challenged himself to recreate the fancy button using the new CSS shape() function sprinkled with animation to get things pretty close.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/recreating-gmails-google-gemini-animation.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
