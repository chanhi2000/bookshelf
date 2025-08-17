---
lang: en-US
title: "A Guide to SVG Animations (SMIL)"
description: "Article(s) > A Guide to SVG Animations (SMIL)"
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
      content: "Article(s) > A Guide to SVG Animations (SMIL)"
    - property: og:description
      content: "A Guide to SVG Animations (SMIL)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/guide-svg-animations-smil.html
prev: /programming/css/articles/README.md
date: 2025-03-28
isOriginal: false
author:
  - name: Sara Soueidan
    url : https://css-tricks.com/author/sarasoueidan/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2014/10/control-points.png
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
  name="A Guide to SVG Animations (SMIL)"
  desc="The following is a guest post by Sara Soueidan. Sara has a knack for digging deep into web features and explaining the heck out of them for the rest of us."
  url="https://css-tricks.com/guide-svg-animations-smil"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2014/10/control-points.png"/>

::: info

The following is a guest post by [<FontIcon icon="fas fa-globe"/>Sara Soueidan](http://sarasoueidan.com/). Sara has a knack for digging deep into web features and explaining the heck out of them for the rest of us. Here she digs into SMIL (and friends), and animation syntax built right into SVG, and gives us this epic guide.

:::

---

## Overview

SVG graphics can be animated using **animation elements**. The animation elements were initially defined in the [<FontIcon icon="iconfont icon-w3c"/>SMIL](https://w3.org/TR/2001/REC-smil-animation-20010904/) Animation specification; these elements include:

- `<animate></animate>`- which allows you to animate scalar attributes and properties over a period of time.
- `<set></set>` - which is a convenient shorthand for animate, which is useful for assigning animation values to non-numeric attributes and properties, such as the visibility property.
- `<animatemotion></animatemotion>` - which moves an element along a motion path.
- `<animatecolor></animatecolor>` - which modifies the color value of particular attributes or properties over time. Note that the element has been deprecated in favor of simply using the animate element to target properties that can take color values. Even though it’s still present in the SVG 1.1 specification, it is clearly noted that it has been deprecated; and it has been completely removed from the SVG 2 specification.

In addition to the animation elements defined in the SMIL spec, SVG includes extensions compatible with the SMIL animations spec; these extensions include attributes that extend the functionality of the element and additional animation elements. The SVG extensions include:

- `<animatetransform></animatetransform>` - allows you to animate one of SVG’s transformation attributes over time, such as the `transform` attribute.
- `path` *(attribute)* - allows any feature from SVG’s path data syntax to be specified in a path attribute to the `animateMotion` element (SMIL Animation only allows a subset of SVG’s path data syntax within a path attribute). We’ll talk more about `animateMotion` in an upcoming section.
- `<mpath></mpath>` - used in conjunction with the `animateMotion` element to reference a motion path that is to be used as a path for the motion. The mpath element is included inside the `animateMotion` element, before the closing tag.
- `keypoints` *(attribute)* - used as an attribute for `animateMotion` to provide precise control of the velocity of motion path animations.
- `rotate` *(attribute)* - used as an attribute for `animateMotion` to control whether an object is automatically rotated so that its x-axis points in the same direction (or opposite direction) as the directional tangent vector of the motion path. This attribute is the key to making motion along a path work as you’d expect. More about this in the `animateMotion` section.

SVG animations can be similar to CSS animations and transitions via by their nature. Keyframes are created, things move, colors change, etc. However, they can do somethings that CSS animations can’t do, which we’ll cover.

---

## Why use SVG animations?

SVGs can be [<FontIcon icon="fas fa-globe"/>styled and animated with CSS (slides)](https://slides.com/sarasoueidan/styling-animating-svgs-with-css--2#/). Basically, any transformation or transition animation that can be applied to an HTML element can also be applied to an SVG element. But there are some SVG properties that cannot be animated through CSS that can through SVG. An SVG path, for example, comes with a set of **data** (a `d=""` attribute) that defines that path’s shape. This data can be modified and animated through SMIL, but not CSS. This is because SVG elements are described by a set of attributes known as SVG *presentation attributes*. Some of these attributes can be set, modified, and animated using CSS, and others can’t.

So, many animations and effects can simply not be achieved using CSS at this time. The CSS SVG animation gaps can be filled by using either JavaScript or the declarative SVG animations derived from SMIL.

If you prefer using JavaScript, I recommend using [<FontIcon icon="fas fa-globe"/>snap.svg](http://snapsvg.io) by Dmitry Baranovsky, which is described as being “the jQuery of SVG”. Here’s [<FontIcon icon="fa-brands fa-codepen"/>a collection of examples](http://codepen.io/collection/edpyJ/) of that.

Or if you prefer a more declarative animation approach, you can use the SVG animation elements as we’ll cover in this guide!

Another advantage to SMIL over JS animations is that JS animations don’t work when the SVG is embedded as an `img` or used as a `background-image` in CSS. SMIL animations do work in both cases (or should, browser support pending). That’s a big advantage, in my opinion. You may find yourself choosing SMIL over other options because of that. This article is a guide to help you get started using SMIL today.

---

## Browser support and fallbacks

Browser support for SMIL animations is pretty decent. They work in all browsers except in Internet Explorer and Opera Mini. For a thorough overview of browser support, you can refer to the [<FontIcon icon="iconfont icon-caniuse"/>compatibility table on Can I Use](https://caniuse.com/#feat=svg-smil).

If you need to provide a fallback for SMIL animations, you can test for browser support on-the-fly using [<FontIcon icon="fas fa-globe"/>Modernizr](https://modernizr.com/). If SMIL is not supported, you can then provide some kind of fallback (JavaScript animations, an alternate experience, etc).

---

## Specifying the target of the animation with `xlink:href`

No matter which of the four animation elements you choose, you need to specify the target of the animation defined by that element.

In order to specify a target, you can use the `xlink:href` attribute. The attribute takes a URI reference to the element which is the target of this animation and which therefore will be modified over time. **The target element must be part of the current SVG document fragment.**

```xml
<rect id="cool_shape" ...="">
  <animate xlink:href="#cool_shape" ...=""></animate>
</rect>
```

If you’ve come across SVG animation elements before, you’ve probably seen them nested inside the element that they’re supposed to animate. This is possible as well as per the spec:

> If the `xlink:href` attribute is not provided, then the target element will be the immediate parent element of the current animation element.

```xml
<rect id="cool_shape" ...="">
  <animate ...=""></animate>
</rect>
```

So if you want to “encapsulate” the animation into the element it applies to, you can do that. And if you want to keep the animations separate somewhere else in the document, you can do that too, and specify the target of each animation using `xlink:href`. Both ways work just fine.

---

## Specifying the target property of the animation with `attributeName` and `attributeType`

All animation elements also share another attribute: `attributeName`. The `attributeName` attribute is used to specify the name of the attribute that you’re animating.

For example, if you want to animate the position of the center of a on the x-axis, you do that by specifying `cx` as the value for the `attributeName` attribute.

`attributeName` takes only one value, not a list of values, so, you can only animate one attribute at a time. If you want to animate more than one attribute, you need to define more than one animation for the element. This is something that I wish were different, and that I think CSS has an advantage over SMIL for. But then again, because of the values possible for other animation attributes (which we’ll cover next), it only makes sense to define only one attribute name at a time, otherwise the other attribute values can become too complex to work with.

When you specify the attribute name, you can add an XMLNS (short for XML namespace) prefix to indicate the namespace of the attribute. The namespace can also be specified using the `attributeType` attribute. For example, some attributes are part of the CSS namespace (which means that the attribute can be found as a CSS property as well) and others are XML-only. A table showing these attributes can be found [<FontIcon icon="fas fa-globe"/>here](https://slides.com/sarasoueidan/styling-animating-svgs-with-css#/10). The attributes in the table are not all of the SVG attributes. They are only the ones that can be set using CSS. Some of them are already available as CSS properties.

If the value for `attributeType` is not explicitly set or is set to `auto`, the browser must first search through the list of CSS properties for a matching property name, and if none is found, search the default XML namespace for the element.

For example, the following snippet animates the `opacity` of an SVG rectangle. Since the `opacity` attribute is also available as a CSS property, the `attributeType` is set to the CSS namespace:

```xml
<rect>
  <animate
    attributetype="CSS"
    attributename="opacity" 
    from="1" 
    to="0" 
    dur="5s" 
    repeatcount="indefinite">
  </animate>
</rect>
```

We’ll go over the other animation attributes in the upcoming examples below. Except where otherwise noted, all of the animation attributes are common to all of the animation elements.

---

## Animating an element’s attribute from one value to another over a duration of time, and specifying the end state: `from`, `by`, `to`, `dur` and `fill`

Let’s start by moving a circle from one position to another. We’re going to do that by changing the value of its `cx` attribute (which specifies the x-position of its center).

We’re going to use the element to do that. This element is used to animate one attribute at a time. Attributes that take numerical values and colors are usually animated with . For a list of attributes that can be animated, refer to [<FontIcon icon="iconfont icon-w3c"/>this table](https://w3.org/TR/SVG2/animate.html#AnimationAttributesAndProperties).

In order to change a value to another over a period of time, the `from`, `to`, and `dur` attributes are used. In addition to these, you will also want to specify *when* the animation should start with the `begin` attribute.

```xml
<circle id="my-circle" r="30" cx="50" cy="50" fill="orange">
  <animate xlink:href="#my-circle" attributename="cx" from="50" to="450" dur="1s" begin="click" fill="freeze"></animate>
</circle>
```

In the above example, we’ve defined a circle, and then called an animation on that circle. The center of the circle moves from the initial position at 50 units, to 450 units along the x-axis.

The `begin` value is set to `click`. This means that the circle will move when it is clicked. You can set this value to a time value as well. For example, `begin="0s"` will start the animation as soon as the page is loaded. You can **delay an animation** by setting a positive time value. For example, `begin="2s"` starts the animation two seconds after load.

What’s even more interesting about `begin` is that you can define values like `click + 1s` to start an animation **one second after the element is clicked!** What’s more, you can use other values that allow you to sync animations without having calculate the duration and delays of other animations. More about this later.

The `dur` attribute is similar to the `animation-duration` equivalent in CSS.

The `from` and `to` attributes are similar to the `from` and `to` keyframes in an animation’s `@keyframe` block in CSS:

```css
@keyframes moveCircle {
  from { /* start value */ }
  to { /* end value */ }
}
```

The `fill` attribute (which is rather unfortunately named the same as the `fill` attribute which defines the fill color of an element) is similar to the `animation-fill-mode` property, which specifies whether or not the element should return to its initial state after the animation is over. The values in SVG are similar to those in CSS, except use different names:

- `freeze`: The animation effect is defined to *freeze* the effect value at the last value of the active duration. The animation effect is “frozen” for the remainder of the document duration (or until the animation is restarted).
- `remove`: The animation effect is removed (no longer applied) when the active duration of the animation is over. After the active end of the animation, the animation no longer affects the target (unless the animation is restarted).

Try changing the values in the live demo to see how the animation is affected:

CodePen Embed Fallback
https://codepen.io/SaraSoueidan/pen/QWYWyr/e883265849147a0a4b712c5960c448a8
Guide to SVG Animations

The `by` attribute is used to specify a relative offset for the animation. As the name suggests, you can use it to specify the amount *by which* you want the animation to progress. The effect of `by` is almost only visible when you’re progressing over the animation duration in discrete steps, similar to the way it works with the CSS `steps()` function. The SVG equivalent to the CSS `steps()` function is `calcMode="discrete"`. We’ll get to the `calcMode` attribute later in the article.

Another case where the effect of `by` is more obvious is when you only specify the `to` attribute. An example of that would be if you use it with the `set` element which we will also cover later in the article.

And last but not least, `by` also comes in useful when you’re working with additive and accumulative animations. We will go over that later in the article.

### Restarting Animations with `restart`

It may be useful to prevent an animation from being restarted while it is active. To do that, SVG offers the `restart` attribute. You can set this attribute to one of three possible values:

- `always`: The animation can be restarted any time. This is the default value.
- `whenNotActive`: The animation can only be restarted when it is not active (i.e. after the active end). Attempts to restart the animation during its active duration are ignored.
- `never`: The element cannot be restarted for the remainder of the current simple duration of the parent time container. (In the case of SVG, since the parent time container is the SVG document fragment, then the animation cannot be restarted for the remainder of the document duration.)

### Naming animations and synchronizing them

Suppose we want to animate the position *and* the color of the circle, such that the change in color happens at the end of the moving animation. We can do that by setting the `begin` value of the color-changing animation to be equal to the `dur`ation of the moving animation; this is how we would normally do it in CSS.

SMIL, however, has a nice event-handling feature. We mentioned before that the `begin` attribute accepts values like `click + 5s`. This value is called an “event value”, and is in this case made up of an event reference followed by a “clock value”. The interesting part here is the naming of the second part: the “clock value”. Why is it not simply a “time value”? Well the answer is that you can literally use a [<FontIcon icon="iconfont icon-w3c"/>clock value](https://w3.org/TR/SVG2/animate.html#ClockValueSyntax) like “10min” or “01:33” which is equivalent to “1 minute and 33 seconds”, or even “02:30:03” (two hours, 30 minutes, and 3 seconds). At the time of this writing, clock values are *not fully implemented in any browser.*

So, if we were to go back to the previous demo and use `click + 01:30`, if a browser started supporting it, the animation would fire 1 minute and 30 seconds after the circle is clicked.

Another kind of value it can accept is the ID of another animation followed by an event reference. If you have two (or more) animations (whether they are applied to the same element or not!) and you want to synchronize them so that one of them starts relative to the other, you can do that without having to know the duration of the other animation.

For example, in the next demo, the blue rectangle starts moving 1 second after the circle animation starts. This is done by giving each animation an `ID`, and then using that ID with the `begin` event as shown in the following code:

```xml :collapsed-lines
<circle id="orange-circle" r="30" cx="50" cy="50" fill="orange">
  <rect id="blue-rectangle" width="50" height="50" x="25" y="200" fill="#0099cc"></rect>
  <animate 
    xlink:href="#orange-circle" 
    attributename="cx" 
    from="50" 
    to="450" 
    dur="5s" 
    begin="click" 
    fill="freeze" 
    id="circ-anim">
  </animate>
  <animate 
    xlink:href="#blue-rectangle" 
    attributename="x" 
    from="50" 
    to="425" 
    dur="5s" 
    begin="circ-anim.begin + 1s" 
    fill="freeze" 
    id="rect-anim">
  </animate>
</circle>
```

The `begin="circ-anim.begin + 1s"` is the part that tells the browser to start the rectangle’s animation 1 second after the beginning of the circle’s. You can check the live demo out:

CodePen Embed Fallback
https://codepen.io/SaraSoueidan/pen/NWoWZo/55195eee8647f438525b852000504c7a
Guide to SVG Animations

You can also start the rectangle animation after the circle animation ends using the `end` event:

```xml{7}
<animate 
  xlink:href="#blue-rectangle" 
  attributename="x" 
  from="50" 
  to="425" 
  dur="5s"
  begin="circ-anim.end" 
  fill="freeze" 
  id="rect-anim">
</animate>
```

You could even start it *before* the end of the circle’s animation:

```xml{7}
<animate
  xlink:href="#blue-rectangle"
  attributename="x" 
  from="50" 
  to="425" 
  dur="5s" 
  begin="circ-anim.end - 3s" 
  fill="freeze" 
  id="rect-anim">
</animate>
```

### Repeating Animations with `repeatCount`

If you want to run an animation more than once, you can do that using the `repeatCount` attribute. You can specify the number of times you want it to repeat, or use the `indefinite` keyword to have it repeat endlessly. So, if we were to repeat the circle’s animation for two times, the code would look like so:

```xml{8}
<animate
  xlink:href="#orange-circle"
  attributename="cx" 
  from="50" 
  to="450" 
  dur="5s" 
  begin="click" 
  repeatcount="2"
  fill="freeze" 
  id="circ-anim">
</animate> 
```

You can check the live demo out here. In the demo, I’ve set the repeat count to be `2` on the circle, and `indefinite` on the square.

CodePen Embed Fallback
https://codepen.io/SaraSoueidan/pen/ZEwpaO/d8e38406a5a90f4392a4bb85f6aadd78
Guide to SVG Animations

Notice how the animation restarts from the initial `from` value instead of the value it reached at the end of the animation. Unfortunately, SMIL does not include a way to go back and forth between the start and end values like CSS animations allow us to do. In CSS, the `animation-direction` property specifies whether or not an animation should play in reverse on some or all cycles or iterations. `animation-direction: alternate` value means that the animation cycle iterations that are odd counts are played in the normal direction, and the animation cycle iterations that are even counts are played in a reverse direction. This means that the first cycle will play from beginning to end, then the second cycle will play from the end back to the beginning, then the third cycle will play from the beginning to the end, and so on.

In SMIL to do that you would have to use JavaScript to explicitly change the values of the `from` and `to` attributes. Jon McPartland of the Big Bite Creative [<FontIcon icon="fas fa-globe"/>wrote a post](http://bigbitecreative.com/introduction-svg-animation/) a while back explaining how he did this for a menu icon animation that he worked on.

Another workaround is to specify the end value as the middle value and then have the end value be the same as the initial value. For example, you can set the animation to start `from` a value, and end at the same value as well with `to`, except that you specify what you *would have* set to be a final value, as an intermediate value between `from` and `to`.  
In CSS we would do that using something like this:

```css
@keyframes example {
  from, to {
    left: 0;
  }

  50% {
    left: 300px;
  }
}
```

The equivalent in SMIL is to use the `values` attribute, which we will explain shortly.

That said, the above workaround may or may not work for you depending on the kind of animation you’re after, and whether or not you are chaining animations, repeating them, or doing additive animations.

Here’s a nice, simple infinite animation using some delayed begin times by Miles Elam:

CodePen Embed Fallback
https://codepen.io/mileselam/pen/QWVYXR
Hexagon Ripple

### Restricting repetition time with `repeatDur`

Setting an element to repeat indefinitely may get annoying or not user-friendly if the animation resumes for a long time. So, it may be a good idea to restrict the repetition time to a certain period of time, and stop the repetition after some time relative to the beginning of the document. This is known as *presentation time*.

The presentation time indicates the **position in the timeline relative to the document begin of a given document fragment**. It is specified using the `repeatDur` attribute. Its syntax is similar to that of a clock value, but instead of being relative to another animation event or an interaction event, it’s relative to the beginning of the document.

For example, the following snippet will stop the repetition of the animation 1 minute and 30 seconds after the document begin:

```xml{9}
<animate 
  xlink:href="#orange-circle" 
  attributename="cx" 
  from="50" 
  to="450" 
  dur="2s" 
  begin="0s" 
  repeatcount="indefinite" 
  repeatdur="01:30" 
  fill="freeze" 
  id="circ-anim">
</animate>
```

And here is the live demo:

CodePen Embed Fallback
https://codepen.io/SaraSoueidan/pen/rNPMJj/366b9fba478e7ac1de2188f5a2594c3c
Guide to SVG Animations

### Synchronizing animations based on number of repetitions

Now let’s go back a step to the synchronizing between two animations topic. Indeed, in SMIL, you can synchronize animations so that one animation starts based on the number of repetitions of another. For example, you can start an animation after the nth-repetition of another, plus or minus an amount of time you may want to add.  
The following example starts the rectangle’s animation at the second repetition of the circle’s animation:

```xml{7}
<animate 
  xlink:href="#blue-rectangle"
  attributename="x" 
  from="50" 
  to="425" 
  dur="5s" 
  begin="circ-anim.repeat(2)" 
  fill="freeze" 
  id="rect-anim">
</animate>
```

The following is a live demo where the rectangle’s animation starts 2 seconds after the second repetition of the circle’s animation.

CodePen Embed Fallback
https://codepen.io/SaraSoueidan/pen/ZEwpaO/d8e38406a5a90f4392a4bb85f6aadd78
Guide to SVG Animations

And [<FontIcon icon="fas fa-globe"/>here is an example David Eisenberg put together for *SVG Essentials (2nd Edition)*.](http://oreillymedia.github.io/svg-essentials-examples/ch12/sync_repetition.html)

### Controlling animation keyframe values: `keyTimes` and `values`

In CSS, we can specify the values that we want our animated property to take in a certain frame during the animation. For example, if you’re animating the left offset of an element, instead of animating it from, say, 0 to 300 directly, you can animate it so that it takes certain values during certain frames like this:

```css
@keyframes example {
  0% {
    left: 0;
  }
  50% {
    left: 320px;
  }
  80% {
    left: 270px;
  }
  100% {
    left: 300px;
  }
}
```

The `0%`, `20%`, `80%`, and `100%` are the frames of the animation, and the values in each frame’s block are the values *for* each frame. The effect described above is one of an element bouncing off a wall, then back to the final position.

In SMIL, you can control the values per frame in a similar way, but the syntax is quite different.

To specify the keyframes, you use the `keyTimes` attribute. And then to specify the value of the animated property for each frame, you use the `values` attributes. The naming conventions in SMIL are quite convenient.

If we were to go back to our moving circle, and use values similar to the ones in the CSS keyframes above, the code will look like the following:

```xml{8-9}
<animate
  xlink:href="#orange-circle" 
  attributename="cx" 
  from="50" 
  to="450" 
  dur="2s" 
  begin="click" 
  values="50; 490; 350; 450" 
  keytimes="0; 0.5; 0.8; 1" 
  fill="freeze" 
  id="circ-anim">
</animate>
```

So what did we do there?

The first thing to notice here is that the keyframe times and intermediate values are specified as lists. The `keyTimes` attribute is a semicolon-separated list of time values used to control the pacing of the animation. Each time in the list corresponds to a value in the `values` attribute list, and defines when the value is used in the animation function. Each time value in the `keyTimes` list is specified as a floating point value between 0 and 1 (inclusive), representing a proportional offset into the simple duration of the animation element. So the keytimes are similar to those in CSS, except that, instead of specifying them as percentages, you specify them as a fraction.

The following is the live demo for the above code. Click on the circle to start the animation.

CodePen Embed Fallback
https://codepen.io/SaraSoueidan/pen/xxMjKE/ab87fd834cdf0af7ec27850e81b1c08a
Guide to SVG Animations

Note that if a list of values is used, the animation will apply the values in order over the course of the animation. If a list of `values` is specified, any `from`, `to` and `by` attribute values are ignored.

At this point, it is also worth mentioning that you can use `values` attribute without the `keyTimes` attribute — the values are automatically spread out evenly through the time (for every `calcMode` value other than `paced` (see next section).

### Controlling animation pace with custom easing: `calcMode`, and `keySplines`

I’m going to go for a CSS-SMIL comparison again because the SMIL syntax and concepts will be much simpler to understand if you’re already familiar with CSS animations.

In CSS, you can choose to change the default uniform animation pace and specify a custom easing function that controls the animation, using the `animation-timing-function` property. The timing function can be one of a few predefined keywords, or a [<FontIcon icon="fa-brands fa-wikipedia-w"/>cubic bezier](http://en.wikipedia.org/wiki/B%C3%A9zier_curve) function. The latter can be created using a tool such as [<FontIcon icon="fas fa-globe"/>this](http://cubic-bezier.com/#.17,.67,.85,.06) tool by Lea Verou.

In SMIL, the animation pace is specified using the `calcMode` attribute. The default animation pace is `linear` for all animation elements except `animateMotion` (we’ll get to it later in the article). In addition to the `linear` value, you can set the value to: `discrete`, `paced`, or `spline`.

- `discrete` specifies that the animation function will jump from one value to the next without any interpolation. This is similar to the `steps()` function in CSS.
- `paced` is similar to `linear`, except that it will ignore any intermediate progress times defined by `keyTimes`. It calculates out the distance between subsequent values and divides up the time accordingly. If your values are all in a linear order, you won’t notice the difference. But if they go back and forth, or if they are colours (which are treated as three-dimensional vector values), you will definitely see the intermediary values. [Here’s a demo courtesy of Amelia Bellamy-Royds (<FontIcon icon="fa-brands fa-codepen"/>`AmeliaBR`)](http://codepen.io/AmeliaBR/pen/EzAju/) that shows the difference between the three `calcMode` values mentioned so far.
- The fourth value accepted by `calcMode` is `spline`. It interpolates from one value in the `values` list to the next according to a time function defined by a cubic bezier spline. The points of the spline are defined in the `keyTimes` attribute, and the control points for each interval are defined in the `keySplines` attribute.

You’ve probably noticed the new attribute in the last sentence: the `keySplines` attribute. So, what does the `keySplines` attribute do?

Again, to the CSS equivalents.

In CSS, you can specify the animation pace *inside* every keyframe, instead of specifying one animation pace for the entire animation. This gives you better control over how each keyframe animation should proceed. An example using this feature is creating a bouncing ball effect. The keyframes for that may look like this:

```css :collapsed-lines
@keyframes bounce {
  0% {
    top: 0;
    animation-timing-function: ease-in;
  }
  15% {
    top: 200px;
    animation-timing-function: ease-out;
  }
  30% {
    top: 70px;
    animation-timing-function: ease-in;
  }
  45% {
    top: 200px;
    animation-timing-function: ease-out;
  }
  60% {
    top: 120px;
    animation-timing-function: ease-in;
  }
  75% {
    top: 200px;
    animation-timing-function: ease-out;
  }
  90% {
    top: 170px;
    animation-timing-function: ease-in;
  }
  100% {
    top: 200px;
    animation-timing-function: ease-out;
  }
}
```

Instead of keyword easing functions, we could have used the corresponding cubic-bezier functions:

- `ease-in` = `cubic-bezier(0.47, 0, 0.745, 0.715)`
- `ease-out` = `cubic-bezier(0.39, 0.575, 0.565, 1)`

Let’s start by specifying the key times and **list of `values`** for our orange circle to undergo the same bouncing effect:

```xml{8}
<animate 
  xlink:href="#orange-circle" 
  attributename="cy" 
  from="50" 
  to="250" 
  dur="3s" 
  begin="click" 
  values="50; 250; 120;250; 170; 250; 210; 250" 
  keytimes="0; 0.15; 0.3; 0.45; 0.6; 0.75; 0.9; 1" 
  fill="freeze" 
  id="circ-anim">
</animate>
```

The animation will be begin on click, and will freeze once it reaches the end value. Next, in order to specify the pace of each keyframe, we’re going to add the `keySplines` attribute.

The `keySplines` attribute takes in set of bezier **control points** associated with the `keyTimes` list, defining a cubic bezier function that controls interval pacing. The attribute value is a semicolon-separated list of control point descriptions. Each control point description is a set of four values: x1 y1 x2 y2, describing the bezier control points for one time segment. The values must all be in the range 0 to 1, and the attribute is ignored unless the `calcMode` is set to `spline`.

Instead of taking cubic-bezier functions as values, `keySplines` takes the coordinates of the two control points that are used to draw the curve. The control points can be seen in the following screenshot taken from Lea’s tool. The screenshot also shows the coordinates of each point, each colored with the same color as the point itself. For the `keySplines` attribute, it is these values that we are going to use to define the pace of the keyframe animations.

SMIL allows these values to be separated either by commas with optional whitespace, or by whitespace alone. The `keyTimes` values that define the associated segment are the bezier “anchor points”, and the `keySplines` values are the control points. Thus, there must be *one fewer* set of control points than there are `keyTimes`.

![](https://i0.wp.com/css-tricks.com/wp-content/uploads/2014/10/control-points.png)

If we go back to the bouncing ball example, the control point coordinates for the `ease-in` and `ease-out` functions are shown in the following images:

![](https://i0.wp.com/css-tricks.com/wp-content/uploads/2014/10/ease-in.png)

![](https://i0.wp.com/css-tricks.com/wp-content/uploads/2014/10/ease-out.png)

So, to translate that into the SVG animation element, we get the following code:

```xml
<animate 
  xlink:href="#orange-circle" 
  attributename="cy" 
  from="50" 
  to="250" 
  dur="3s" 
  begin="click" 
  values="50; 250; 120;250; 170; 250; 210; 250" 
  keytimes="0; 0.15; 0.3; 0.45; 0.6; 0.75; 0.9; 1" 
  keysplines="
    .42 0 1 1;
    0 0 .59 1;
    .42 0 1 1;
    0 0 .59 1;
    .42 0 1 1;
    0 0 .59 1;
    .42 0 1 1;
    0 0 .59 1;" 
  fill="freeze" 
  id="circ-anim">
</animate>
```

Here’s the live demo:

CodePen Embed Fallback
https://codepen.io/SaraSoueidan/pen/Vwgxmy/ecd0f3197b5fc0d7950ed94cc8afb97f
Guide to SVG Animations

If you only want to specify an overall easing function for the entire animation without any intermediate values, you would still have to specify the keyframes using the `keyTimes` attribute, but you would only specify the start and ending keyframes, namely `0; 1`, and no intermediate `values`.

### Additive & Accumulative Animations: `additive` and `accumulate`

Sometimes, it’s useful to define an animation that starts from where the previous animation ended; or one that uses the accumulative sum of the previous animations as a value to proceed by. For that, SVG has two conveniently named attributes: `additive` and `accumulate`.

Suppose you have an element whose width you want to “grow”, or a line whose length you want to increase, or an element that you want to move step by step from one position to the other, over separate steps. This feature is particularly useful for repeated animations.

Just like any other animation, you’re going to specify `from` and `to` values. However, when you set `additive` to `sum`, each of their values is going to be **relative to the original value of the animated attribute**.

So, back to our circle. For our circle, the initial position of `cx` is 50. When you set `from="0"` `to="100"`, the zero if actually the original 50, and the 100 is actually 50 + 100; in other words, it’s practically kind of like “`from="50" to="150"`“.

By doing that, we get the following result:

CodePen Embed Fallback
https://codepen.io/SaraSoueidan/pen/xxMzXy/77b1afdefe05eff8f1d538e0f3f8727e
Guide to SVG Animations

This is all the `additive` attribute does. It just specifies whether the `from` and `to` values should be relative to the current value or not. The attribute only takes one of two values: `sum` and `replace`. The latter is the default value, and it basically means that the `from` and `to` values are going to replace the current/original values, which may end up causing a weird jump before the animation starts. (Try replacing `sum` with `replace` in the above example for a better comparison.)

However, what if we want the values to be added such that the second repetition starts off from the ending value of the previous one? This is where the `accumulate` attribute comes in.

The `accumulate` attribute controls whether or not the animation is cumulative. The default value is `none`, which means that, when the animation is repeated for example, it’s going to start back from the beginning. You can, however, set it to `sum`, which specifies that each repeat iteration after the first builds upon the last value of the previous iteration.

So, if we were to go back to the previous animation and specify `accumulate="sum"`, we’d get the following prefferable result:

CodePen Embed Fallback
https://codepen.io/SaraSoueidan/pen/zYeaGp/e21b7dd0af3d0a6db2828362bee24d48
Guide to SVG Animations

Note that the `accumulate` attribute is ignored if the target attribute value does not support addition, or if the animation element does not repeat. It will also be ignored if the animation function is specified with only the `to` attribute.

### Specifying an animation’s end time with `end`

In addition to specifying when an animation begins, you can also specify when it ends, using the `end` attribute. For example, you can set an animation to repeat indefinitely, and then have it stop when another element starts animating. The `end` attribute takes values similar to those that the `begin` value takes. You can specify absolute or relative time values/offsets, repeat values, event values, etc.

For example, in the following demo, the orange circle moves slowly over a period of 30 seconds to the other side of the canvas. The green circle will also animate, but only when it’s clicked. The orange circle’s animation will end when the green circle’s animation starts. Click on the green circle to see the orange one stop:

CodePen Embed Fallback
https://codepen.io/SaraSoueidan/pen/LYqBpY/1a67cdf89a865d044e2993a81a4f26be
Guide to SVG Animations

The same kind of animation synchronization can be achieved for two animations applied to the same element, of course. For example, suppose we set the color of the circle to animate indefinitely changing from one value to another. Then, when the element is clicked, it moves to the other side. We’ll set it now so that the color animation stops as soon as the element is clicked and the moving animation is fired.

CodePen Embed Fallback
https://codepen.io/SaraSoueidan/pen/oNmMjg/71fa25f8bd43d55ca04fa2259cb7d5f5
Guide to SVG Animations

### Defining animation intervals using multiple `begin` and `end` values

Indeed, both the `begin` and `end` attributes accept a **list of semi-colon-separated values**. Each value in the `begin` attribute will correspond to a value in the `end` attribute, thus forming active and inactive animation intervals.

You can think of this as being similar to a moving car, where the car’s tires are active and then inactive for periods of time, depending on whether or not the car is moving. You can even create the animated car effect by applying to animations to the car: one that translates the car or moves it along a path that is also an additive and accumulative animation, and another animation that rotates the car’s tires in intervals that would be synchronized with the translation.

An example specifying multiple beginning and ending times (i.e. intervals) is the following demo, where the rectangle is rotated based on the defined intervals, changing from active to inactive accordingly. (Rerun the demo if you miss the animation.)

CodePen Embed Fallback
https://codepen.io/SaraSoueidan/pen/PoVBWj/cb46822d292b7a542eba729c897ed046
Guide to SVG Animations

Note that in the above example I’ve used the element to rotate the rectangle about its center. We’ll talk about this element in more detail in an upcoming section below.

Also note that, even if you set the `repeatCount` to `indefinite`, it will be overridden by the `end` values and will *not* repeat indefinitely.

### Restricting the active duration of an element using `min` and `max`

Just like you can restrict the repetition time of an animation, you can even restrict the **active duration** of an animation. The `min` and `max` attributes specify the minimum and maximum value of the active duration, respectively. They provide us with a way to control the lower and upper bound of the element active duration. Both attributes take a clock value as a value.

For `min`, that specifies the length of the minimum value of the active duration, measured in element active time. Value must be greater than or equal to 0, which is the default value and does not constrain the active duration at all.

For `max`, the clock value specifies the length of the maximum value of the active duration, measured in element active time. Value must also be greater than 0. The default value for `max` is `indefinite`. This does not constrain the active duration at all.

If both `min` and `max` attributes are specified then the `max` value must be greater than or equal to the `min` value. If this requirement is not fulfilled then both attributes are ignored.

But what defines the **active duration** of an element? We mentioned the repeat duration before, in addition to the “simple duration”, which is the duration of the animation without any repetition (specified using `dur`), so how do all of these work together? Which overrides what? and then what about the `end` attribute which would override and simply end the animation?

The way it happens is that the browser will *first* compute the active duration based on the `dur`, `repeatCount`, `repeatDur`, and `end` values. *Then*, it runs the computed duration against the specified `min` and `max` values. If the result is within the bounds, this first computed duration value is correct and will not be changed. Otherwise two situations may occur:

- If the first computed duration is greater than the `max` value, the active duration of the element is defined to be equal to the `max` value.
- If the first computed duration is less than the `min` value, the active duration of the element becomes equal to the `min` value and the behavior of the element is as follows:
  - If the repeating duration (or the simple duration if the element doesn’t repeat) of the element is greater than `min` then the element is played normally for the (`min` constrained) active duration.
  - Otherwise the element is played normally for its repeating duration (or simple duration if the element does not repeat) and then is frozen or not shown depending on the value of the `fill` attribute.

That leaves us with how the browser actually computes the active duration. For sake of brevity, I’m not going to get into the details here. But there is a very comprehensive table in the specification that shows the different combinations of the `dur`, `repeatCount`, `repeatDur`, and `end` attributes, and then shows what the active duration will be based on each combination. You can check the table out and read more about this [<FontIcon icon="iconfont icon-w3c"/>in this section of the specification](https://w3.org/TR/2001/REC-smil-animation-20010904/#ComputingActiveDur).

Lastly, if an element is defined to begin before its parent (e.g. with a simple negative offset value), the minimum duration is measured from the calculated begin time not the observed begin. This means that the `min` value may have no observed effect.

### Example: morphing paths

One of the attributes that can be animated in SMIL (but not in CSS) is the `d` attribute (short for *data*) of an SVG . The `d` attribute contains the data which defines the outline of the shape that you’re drawing. The path data consists of **a set of commands and coordinates** that tell the browser where and how to draw points, arcs, and lines that make up the final path.

Animating this attribute allows us to *morph* SVG paths and create [<FontIcon icon="fa-brands fa-codepen"/>shape tweening](http://codepen.io/noahblon/blog/an-intro-to-svg-animation-with-smil) effects. But, in order to be able to morph shapes, the start, end, and any intermediate path shapes need to have the exact same number of vertices/points, and they need to appear in the same order. If the number of vertices doesn’t match, the animation wouldn’t work. The reason for this is that the shape changing actually happens by moving the vertices, and interpolating their positions, so if one vertex is missing or does not match, the paths won’t be interpolated anymore.

To animate an SVG path, you specify the `attributeName` to be `d`, and then set the `from` and `to` values that specify the start and end shapes, and you can use the `values` attribute to specify any intermediate values you want the shape to go through in between.

For the sake of brevity, I won’t get into the details of how to do this here. Instead, you can read [<FontIcon icon="fa-brands fa-codepen"/>this excellent article by Noah Blon](http://codepen.io/noahblon/blog/an-intro-to-svg-animation-with-smil), in which he explains how he created a shape-tweening kind-of-loading animation using . The live demo for Noah’s article is this:

CodePen Embed Fallback
https://codepen.io/noahblon/pen/wvxmgv
Sitepoint Challenge #1 in SVG and SMIL

And here’s another morphing example by Felix Hornoiu:

CodePen Embed Fallback
https://codepen.io/felixhornoiu/pen/JjmVZw
SVG Countdown

You can even morph the values of a path being used as a clipping mask! An example of that by Heather Buchel:

CodePen Embed Fallback
https://codepen.io/hbuchel/pen/YzYMgd
Loading Animation with Morphing SVG!

---

## Animating along arbitrary paths: The Element

The element is my favorite SMIL animation element. You can use it to move an element along a path. You specify the motion path using one of two ways which we’re going to cover next, and then to set the element up so that is moves along that path.

The element accepts the same attributes mentioned earlier, plus three more: `keyPoints`, `rotate`, and `path`. Also, there is one difference regarding the `calcMode` attribute, where the default value is `paced` for , not `linear`.

### Specifying the motion path using the `path` attribute

The `path` attribute is used to specify the motion path. It is expressed in the same format and interpreted the same way as the `d` attribute on the `path` element. The effect of a motion path animation is to add a supplemental transformation matrix onto the current transformation matrix for the referenced object which causes a translation along the x- and y-axes of the current user coordinate system by the computed X and Y values computed over time. In other words, the path specified is calculated relative to the element’s current position, by using the path data to transform the element onto the path position.

For our circle, we’re going to animate it along a path that looks like the following:

![](https://i0.wp.com/css-tricks.com/wp-content/uploads/2022/08/path.png?resize=785%2C403&ssl=1)

The code required for the circle to move along this path is:

```xml
<animatemotion xlink:href="#circle" dur="1s" begin="click" fill="freeze" path="M0,0c3.2-3.4,18.4-0.6,23.4-0.6c5.7,0.1,10.8,0.9,16.3,2.3 c13.5,3.5,26.1,9.6,38.5,16.2c12.3,6.5,21.3,16.8,31.9,25.4c10.8,8.7,21,18.3,31.7,26.9c9.3,7.4,20.9,11.5,31.4,16.7
 c13.7,6.8,26.8,9.7,41.8,9c21.4-1,40.8-3.7,61.3-10.4c10.9-3.5,18.9-11.3,28.5-17.8c5.4-3.7,10.4-6.7,14.8-11.5
 c1.9-2.1,3.7-5.5,6.5-6.5"></animatemotion>
```

There is one thing I want to focus on here: the coordinates in the path data. The path starts by moving (**`M`**) to the point with coordinates `(0, 0)`, before it starts to draw a curve (**`c`**) to another point. It is important to note that the `(0, 0)` point is actually the position of the circle, no matter where it is — *not* the top-left corner of the coordinate system. As we mentioned above, the coordinates in the `path` attribute are relative to the current position of the element!

The result of the above code is:

CodePen Embed Fallback
https://codepen.io/SaraSoueidan/pen/YzBJxb/184082960ac3cc65d00b22f2551a330a
Guide to SVG Animations

If you were to specify the path starting from a point other than `(0, 0)`, the circle would abruptly jump by the amount specified in the beginning point. For example, suppose you draw a path in Illustrator and then export that path data to use as a motion path (that’s what I did the first time I did this); the exported path may look something like this:

```xml
<path 
  fill="none" 
  stroke="#000000" 
  stroke-miterlimit="10" 
  d="M100.4,102.2c3.2-3.4,18.4-0.6,23.4-0.6c5.7,0.1,10.8,0.9,16.3,2.3
    c13.5,3.5,26.1,9.6,38.5,16.2c12.3,6.5,21.3,16.8,31.9,25.4c10.8,8.7,21,18.3,31.7,26.9c9.3,7.4,20.9,11.5,31.4,16.7
    c13.7,6.8,26.8,9.7,41.8,9c21.4-1,40.8-3.7,61.3-10.4c10.9-3.5,18.9-11.3,28.5-17.8c5.4-3.7,10.4-6.7,14.8-11.5
    c1.9-2.1,3.7-5.5,6.5-6.5">
</path>
```

The starting point of the path in this case is `(100.4, 102.2)`. If we were to use this data as the motion path, the circle will jump by ~100 units to the right and ~102 units downwards, and *then* start the motion along the path relative to the new position. So, make sure to keep this in mind when you prepare the motion path for your animation.

If used, attributes `from`, `by`, `to` and `values` specify a shape on the current canvas which represents the motion path.

### Specifying the motion path using the element

There is also another way you can specify a motion path. Instead of using the relative `path` attribute, you can reference an external path using the element. The , a child of the element, would then reference the external path using the `xlink:href` attribute.

```xml
<animatemotion xlink:href="#circle" dur="1s" begin="click" fill="freeze">
  <mpath xlink:href="#motionPath"></mpath>
</animatemotion>
```

The motion path can be defined anywhere in the document; it can even be literally just *defined* inside a element and not rendered on the canvas at all. In the next example, the path is rendered because, in most cases, you may want to show the path that the element is moving along.

::: note

Note that, according to the specification:

> The various (x, y) points of the shape provide a supplemental transformation matrix onto the CTM for the referenced object which causes a translation along the x- and y-axes of the current user coordinate system by the (x,y) values of the shape computed over time. Thus, the referenced object is translated over time by the offset of the motion path relative to the origin of the current user coordinate system. The supplemental transformation is applied on top of any transformations due to the target element’s `transform` property or any animations on that attribute due to `animateTransform` elements on the target element.

:::

Again, the position of the circle is “multiplied” or “transformed” by the coordinates in the path data.

In the next example, we have a path in the middle of the canvas. The circle is positioned at the beginning of the path. Yet, when the motion path is applied, the circle does *not* start its motion from its current position. See the demo for a better explanation. Click on the circle to animate it.

CodePen Embed Fallback
https://codepen.io/SaraSoueidan/pen/NWoOXb/0642931398bf1cf3ed1ff9b3e6b52398
Guide to SVG Animations

See how the circle does follow the same shape of the path, but over a different position? This is due to the fact that the circle’s position is transformed by the values of the path data.

One way around this is to start with the circle being positioned at `(0, 0)`, so that when the path data is used to transform it, it will start and proceed as expected.

Another way is to apply a [<FontIcon icon="fas fa-globe"/>transformation](http://sarasoueidan.com/blog/svg-transformations/) that “resets” the coordinates of the circle so that they compute to zero before the path is applied.

The following is a modified version of the above demo, using a closed path and repeating the motion animation indefinitely.

CodePen Embed Fallback
https://codepen.io/SaraSoueidan/pen/ExrdEe/ef9f0e1242263cf23067b09be894cfa9
Guide to SVG Animations

### Override Rules for `<animatemotion></animatemotion>`

Since there are more than one way to do the same thing for `animateMotion`, it only makes sense to have override rules to specify which values override others.

The override rules for `animateMotion` are as follows:

- Regarding the definition of the motion path, the `mpath` element overrides the the `path` attribute, which overrides `values`, which overrides `from`, `by` and `to`.
- Regarding determining the points which correspond to the `keyTimes` attributes, the `keyPoints` attribute overrides `path`, which overrides `values`, which overrides `from`, `by` and `to`.

### Setting an element’s orientation along a motion path with `rotate`

In our previous example, the element we were animating along the path happened to be a circle. But what if we’re animating an element that has a certain orientation like, say for example, a car icon? The car icon in the following example is [<FontIcon icon="fas fa-globe"/>designed by Freepik](https://freepik.com/free-vector/transport-icons-collection_753635.htm).

In this example, I’ve replaced the circle with a group with an ID of “car”, which contains the element making up the group. Then, in order to avoid the problem with the motion along the path mentioned above, I’ve applied a transformation to the car to that translates it by a specific amount, so that the initial position ends up at (0, 0). The values inside the transformations are actually the coordinates of the point where the first path of the car starts drawing (right after the move command **M**).

The car then starts moving along the motion path. But… this is how the motion looks like:

CodePen Embed Fallback
https://codepen.io/SaraSoueidan/pen/poGxKW/3a300b8c4c0f9db4ff345f5d44992b74
Guide to SVG Animations

The car’s orientation is fixed, and does not change to match that of the motion path. In order to change that, we’re going to use the `rotate` attribute.

The `rotate` attribute takes one of three values:

- `auto`: Indicates that the object is rotated over time by the angle of the direction (i.e., directional tangent vector) of the motion path.
- `auto-reverse`: Indicates that the object is rotated over time by the angle of the direction (i.e., directional tangent vector) of the motion path plus 180 degrees.
- a number: Indicates that the target element has a constant rotation transformation applied to it, where the rotation angle is the specified number of degrees.

To fix the orientation of the car in the above example, we’ll start with setting the rotation value to `auto`. We’ll end up with the following result:

CodePen Embed Fallback
https://codepen.io/SaraSoueidan/pen/LYqgra/74af0bd0bbc7ca46d4d568ca0d473b40
Guide to SVG Animations

If you want the car to move outside the path, the `auto-reverse` value fixes that.

CodePen Embed Fallback
https://codepen.io/SaraSoueidan/pen/gOqBja/1027d099f0e9cca94f8f8865d169c49f
Guide to SVG Animations

This looks better, but we still have one problem: the car looks like it’s moving backwards along the path! In order to change that, we’d need to flip the car along its y-axis. This can be done by scaling it by a factor of “-1” along that axis. So, if we apply the transformation to the `g` with the `car` ID, the car will move forward as expected. The scaling transformation is just going to be chained with the previous translation we applied earlier.

And the final demo looks like this:

CodePen Embed Fallback
https://codepen.io/SaraSoueidan/pen/rNPqrK/48caf2f5fa42a8c154fcb5dec0dbe4d5
Guide to SVG Animations

### Controlling the animation distance along the motion path with `keyPoints`

The `keyPoints` attribute provides the ability to specify the progress along the motion path for each of the `keyTimes` specified values. If specified, `keyPoints` causes `keyTimes` to apply to the values in `keyPoints` rather than the points specified in the `values` attribute array or the points on the `path` attribute.

`keyPoints` takes a semicolon-separated list of floating point values between 0 and 1 and indicates how far along the motion path the object shall move at the moment in time specified by corresponding `keyTimes` value. Distance calculations are determined by the browser’s algorithms. Each progress value in the list corresponds to a value in the `keyTimes` attribute list. If a list of `keyPoints` is specified, there must be exactly as many values in the `keyPoints` list as in the `keyTimes` list.

One important thing to note here is to set the `calcMode` value to `linear` for `keyPoints` to work. It also looks like it *should* logically work with paced animation, if your key points move back and forth, but it doesn’t.

The following is an example by Amelia Bellamy-Royds (whose [CodePen profile (<FontIcon icon="fa-brands fa-codepen"/>`AmeliaBR`)](http://codepen.io/AmeliaBR/) you should totally check out) that uses `keyPoints` to mimic the behavior is starting a motion along a path from a pre-defined offset, because we currently don’t have that ability by default in SMIL.

CodePen Embed Fallback
https://codepen.io/AmeliaBR/pen/VwNvpw
Motion along a closed path, arbitrary start point

---

## Moving text along an arbitrary path

Moving text along an arbitrary path is different from moving other SVG elements along paths. To animate text, you’re going to have to use the element, not the element.

First, let’s start by positioning the text along a path. This can be done by nesting a element inside the element. The text that is going to be positioned along a path will be defined inside the element, not as a child of the element.

The `textPath` is then going to reference the actual path that we want to use, just like we did in the previous examples. The referenced path can also be either rendered on the canvas, or defined inside a . Check the code in the following demo out.

CodePen Embed Fallback
https://codepen.io/SaraSoueidan/pen/NWoOEp/ebfc92e45e24b29c266f50e6f617cdf5
Guide to SVG Animations

To animate the text along that path, we’re going to use the element to animate the `startOffset` attribute.

The `startOffset` represents the offset of the text on the path. 0% is the beginning of the path; 100% represents the end of it. So if, for example, the offset is set to 50%, the text will start halfway through the path. I think you can see where we’re going from here.

By animating the `startOffset`, we’re going to create the effect of text moving along the path. Check the code in the following demo out.

CodePen Embed Fallback
https://codepen.io/SaraSoueidan/pen/qBgJLw/501308e154923359ed1cdbfa29eadcc0
Guide to SVG Animations

---

## Animating transformations: The `<animatetransform></animatetransform>` Element

The element animates a transformation attribute on a target element, thereby allowing animations to control translation, scaling, rotation and/or skewing. It takes the same attributes mentioned for the element, plus an additional attribute: `type`.

The `type` attribute is used to specify the type of the transformation that’s being animated. It takes one of five values: `translate`, `scale`, `rotate`, `skewX`, and `skewY`.

The `from`, `by` and `to` attributes take a value expressed using the same syntax that is available for the given transformation type:

- For a `type="translate"`, each individual value is expressed as `<tx> [,<ty>]</ty></tx>`.
- For a `type="scale"`, each individual value is expressed as `<sx> [,<sy>]</sy></sx>`.
- For a `type="rotate"`, each individual value is expressed as `<rotate-angle> [<cx> <cy>]</cy></cx></rotate-angle>`.
- For a `type="skewX"` and `type="skewY"`, each individual value is expressed as `<skew-angle></skew-angle>`.

If you’re unfamiliar with the syntax for the SVG `transform` attribute functions, and for the sake of brevity of this article, and because the syntax details and how it works is outside the scope of this article, I recommend you read the article I’ve written about this a while back before you move on with this guide: [<FontIcon icon="fas fa-globe"/>“Understanding SVG Coordinate Systems and Transformations (Part 2): The `transform` Attribute”](http://sarasoueidan.com/blog/svg-transformations/).

Back to a previous demo, where we rotated the pink rectangle using the `<animatetransform></animatetransform>` element. The code for the rotation looks like the following:

```xml
<rect id="deepPink-rectangle" width="50" height="50" x="50" y="50" fill="deepPink">
  <animatetransform 
    xlink:href="#deepPink-rectangle" 
    attributename="transform" 
    attributetype="XML" 
    type="rotate" 
    from="0 75 75" 
    to="360 75 75" 
    dur="2s" 
    begin="0s" 
    repeatcount="indefinite" 
    fill="freeze"
  >
</rect>
```

The `from` and `to` attributes specify the angle of rotation (start and end) and the center of rotation. In both, the center of rotation remains the same, of course. If you don’t specify the center, it will be the top left corner of the SVG canvas. The live demo for the above code is the following:

CodePen Embed Fallback
https://codepen.io/SaraSoueidan/pen/OJdBqR/1bb859d4103d5e32b037f69e906319fb
Guide to SVG Animations

Here’s another fun example with a single `animateTransform` by Gabriel:

CodePen Embed Fallback
https://codepen.io/guerreiro/pen/rNZajZ
Orbit

Animating a single transformation is simple, however, things can get really messy and complicated when multiple transformations are included, especially because one `animateTransform` can override another, so instead of adding and chaining effects, you may end up with the complete opposite. That, in addition to the way SVG coordinate systems and transformations actually work (refer to the article mentioned earlier on the topic). The examples are vast, and outside the scope of this article. For transforming SVGs, I recommend using CSS transforms. Implementations are working on making the latter work perfectly with SVG, so you may never have to use SMIL for animating transformations in SVG at all.

---

## The `<set></set>` element

The `set` element provides a simple means of setting the value of an attribute for a specified duration. It supports all attribute types, including those that cannot reasonably be interpolated, such as string and boolean values. The `set` element is non-additive. The additive and accumulate attributes are not allowed, and will be ignored if specified.

Since is used to set an element *to* a specific value at and during a specific time, it does not accept all of the attributes mentioned for the previous animation elements. For example, it does not have a `from` or `by` attribute, because the value that changes does not change progressively over the period of time.

For `set`, you can specify the element you’re targeting, the attribute name and type, the `to` value, and the animation timing can be controlled with: `begin`, `dur`, `end`, `min`, `max`, `restart`, `repeatCount`, `repeatDur`, and `fill`.

The following is an example that sets the color of the rotating rectangle to blue when it is clicked. The color remains blue for a duration of 3 seconds, and then turns back to the original color. Every time the rectangle is clicked, the `set` animation is fired, and the color is changed for three seconds.

CodePen Embed Fallback
https://codepen.io/SaraSoueidan/pen/xxMyoe/af159baaf57bc38eb40288db722e1245
Guide to SVG Animations

---

## Elements, attributes and properties that can be animated

Not all SVG attributes can be animated, and not all of those that can be animated, can be animated using all the animation elements. For a complete list of all animatable attributes, and a table showing which of these can be animated by which elements, please refer to [<FontIcon icon="iconfont icon-w3c"/>this section of the SVG Animation specification](https://w3.org/TR/SVG2/animate.html#AnimationAttributesAndProperties).

---

## Final words

SMIL has a lot of potential, and I barely scratched the surface and only touched on the basics and technicalities of how they work in SVG. A lot of very impressive effects can be created, especially ones involving morphing and transforming shapes. The sky’s the limit. Go crazy! and don’t forget to share what you make with the community; we’d love to see what you’ve been up to. Thank you for reading!

::: note

This article has been updated based on [<FontIcon icon="iconfont icon-css-tricks"/>this discussion](https://css-tricks.com/guide-svg-animations-smil/#comment-1585895) in the comments below. Thanks for your input, Amelia.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "A Guide to SVG Animations (SMIL)",
  "desc": "The following is a guest post by Sara Soueidan. Sara has a knack for digging deep into web features and explaining the heck out of them for the rest of us.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/guide-svg-animations-smil.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
