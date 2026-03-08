---
lang: en-US
title: "Logical Operations with CSS Variables"
description: "Article(s) > Logical Operations with CSS Variables"
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
      content: "Article(s) > Logical Operations with CSS Variables"
    - property: og:description
      content: "Logical Operations with CSS Variables"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/logical-operations-with-css-variables.html
prev: /programming/css/articles/README.md
date: 2019-09-11
isOriginal: false
author:
  - name: Ana Tudor
    url: https://css-tricks.com/author/thebabydino/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2019/09/logical-operators.png
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
  name="Logical Operations with CSS Variables"
  desc="Very often, while using switch variables (a variable that's either 0 or 1, a concept that's explained in a greater detail in in this post), I wish I could"
  url="https://css-tricks.com/logical-operations-with-css-variables"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2019/09/logical-operators.png"/>

Very often, while using switch variables (a variable that’s either `0` or `1`, a concept that’s explained in a greater detail in [**in this post**](/css-tricks.com/dry-switching-with-css-variables-the-difference-of-one-declaration.md)), I wish I could perform logical operations on them. We don’t have functions like `not(var(--i))` or `and(var(--i), var(--k))` in CSS, but we can emulate these and more with arithmetic operations in a `calc()` function.

This article is going to show you what `calc()` formulas we need to use for each logical operation and explain how and why they are used with a couple of use cases that lead to the writing of this article.

---

## How: the formulas

### `not`

This is a pretty straightforward one: we subtract the switch variable (let’s call it `--j`) from `1`:

```css
--notj: calc(1 - var(--j))
```

If `--j` is `0`, then `--notj` is `1` (`1 - 0`). If `j` is `1`, then `--notj` is `0` (`1 - 1`).

### `and`

Now, if you’ve ever taken electronics classes (particularly something like Programmed Logic Systems or Integrated Circuits), then you already know what formula we need to use here. But let’s not jump straight into it.

The `and` of two operands is true if and only if both are true. The two operands in our case are two switch variables (let’s call them `--k` and `--i`). Each of them can be either `0` or `1`, independently of the other. This means we can be in one out of four possible scenarios:

- `--k: 0`, `--i: 0`
- `--k: 0`, `--i: 1`
- `--k: 1`, `--i: 0`
- `--k: 1`, `--i: 1`

The result of the `and` operation is `1` if both our switch variables are `1` and `0` otherwise. Looking at it the other way, this result is `0` if at least one of the two switch variables is `0`.

Now you need to think of it this way: the result of what arithmetic operation is `0` if at least one of the two operands is `0`? That’s multiplication, as multiplying anything by `0` gives us `0`!

So, our `--and` formula is:

```css
--and: calc(var(--k)*var(--i))
```

Considering each of our four possible scenarios, we have:

- for `--k: 0`, `--i: 0`, we have that `--and` is `0` (`0*0`)
- for `--k: 0`, `--i: 1`, we have that `--and` is `0` (`0*1`)
- for `--k: 1`, `--i: 0`, we have that `--and` is `0` (`1*0`)
- for `--k: 1`, `--i: 1`, we have that `--and` is `1` (`1*1`)

### `nand`

Since `nand` is `not and`, we need to replace the `--j` in the `not` formula with the formula for `and`:

```css
--nand: calc(1 - var(--k)*var(--i))
```

For each of our four possible scenarios, we get:

- for `--k: 0`, `--i: 0`, we have that `--nand` is `1` (`1 - 0*0 = 1 - 0`)
- for `--k: 0`, `--i: 1`, we have that `--nand` is `1` (`1 - 0*1 = 1 - 0`)
- for `--k: 1`, `--i: 0`, we have that `--nand` is `1` (`1 - 1*0 = 1 - 0`)
- for `--k: 1`, `--i: 1`, we have that `--nand` is `0` (`1 - 1*1 = 1 - 1`)

### `or`

The result of the `or` operation is `1` if at least one of our switch variables is `1` and `0` otherwise (if both of them are `0`).

The first instinct here is to go for addition, but while that gives us `0` if both `--k` and `--i` are `0` and `1` if one is `0` and the other one is `1`, it gives us `2` if both of them are `1`. So that doesn’t really work.

But we can use the good old [<VPIcon icon="fa-brands fa-wikipedia-w"/>De Morgan’s laws](https://en.wikipedia.org/wiki/De_Morgan%27s_laws), one of which states:

> `not (A or B) = (not A) and (not B)`

This means the result of the `or` operation is the negation of the `and` operation between the negations of `--k` and `--i`. Putting this into CSS, we have:

```css
--or: calc(1 - (1 - var(--k))*(1 - var(--i)))
```

For each scenario, we get:

- for `--k: 0`, `--i: 0`, we have that `--or` is `0` (`1 - (1 - 0)*(1 - 0) = 1 - 1*1 = 1 - 1`)
- for `--k: 0`, `--i: 1`, we have that `--or` is `1` (`1 - (1 - 0)*(1 - 1) = 1 - 1*0 = 1 - 0`)
- for `--k: 1`, `--i: 0`, we have that `--or` is `1` (`1 - (1 - 1)*(1 - 0) = 1 - 0*1 = 1 - 0`)
- for `--k: 1`, `--i: 1`, we have that `--or` is `1` (`1 - (1 - 1)*(1 - 1) = 1 - 0*0 = 1 - 0`)

### `nor`

Since `nor` is `not or`, we have:

```css
--nor: calc((1 - var(--k))*(1 - var(--i)))
```

For each of our four possible scenarios, we get:

- for `--k: 0`, `--i: 0`, we have that `--nor` is `1` (`(1 - 0)*(1 - 0) = 1*1`)
- for `--k: 0`, `--i: 1`, we have that `--nor` is `0` (`(1 - 0)*(1 - 1) = 1*0`)
- for `--k: 1`, `--i: 0`, we have that `--nor` is `0` (`(1 - 1)*(1 - 0) = 0*1`)
- for `--k: 1`, `--i: 1`, we have that `--nor` is `0` (`(1 - 1)*(1 - 1) = 0*0`)

### `xor`

The result of the `xor` operation is `1` when one of the two operands is `1` and the other one is `0`. This feels trickier at first, but, if we think this means the two operands need to be different for the result to be `1` (otherwise it’s `0`), we stumble upon the right arithmetic operation to use inside `calc()`: subtraction!

If `--k` and `--i` are equal, then subtracting `--i` from `--k` gives us `0`. Otherwise, if we have `--k: 0`, `--i: 1`, the result of the same subtraction is `-1`; if we have `--k: 1`, `--i: 0`, the result is `1`.

Close, but not quite! We get the result we want in three out of four scenarios, but we need to get `1`, not `-1` in the `--k: 0`, `--i: 1` scenario.

However, one thing that `-1`, `0` and `1` have in common is that multiplying them with themselves gives us their absolute value (which is `1` for both `-1` and `1`). So the actual solution is to multiply this difference with itself:

```css
--xor: calc((var(--k) - var(--i))*(var(--k) - var(--i)))
```

Testing each of our four possible scenarios, we have:

- for `--k: 0`, `--i: 0`, we have that `--xor` is `0` (`(0 - 0)*(0 - 0) = 0*0`)
- for `--k: 0`, `--i: 1`, we have that `--xor` is `1` (`(0 - 1)*(0 - 1) = -1*-1`)
- for `--k: 1`, `--i: 0`, we have that `--xor` is `1` (`(1 - 0)*(1 - 0) = 1*1`)
- for `--k: 1`, `--i: 1`, we have that `--xor` is `0` (`(1 - 1)*(1 - 1) = 0*0`)

---

## Why: Use cases

Let’s see a couple of examples that make use of logical operations in CSS. Note that I won’t detail other aspects of these demos as they’re outside the scope of this particular article.

### Hide disabled panel only on small screens

This is a use case I came across while working on an interactive demo that lets users control various parameters to change a visual result. For more knowledgeable users, there’s also a panel of advanced controls that’s disabled by default. It can, however, be enabled in order to get access to manually controlling even more parameters.

Since this demo is supposed to be responsive, the layout changes with the viewport. We also don’t want things to get crammed on smaller screens if we can avoid it, so there’s no point in showing the advanced controls if they’re disabled and we’re in the narrow screen case.

The screenshot collage below shows the results we get for each the four possible scenarios.

![Collage of the possible cases.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2019/07/ex_0_collage-1024x833.png?resize=1024%2C833&ssl=1)

So let’s see what this means in terms of CSS!

First off, on the `<body>`, we use a switch that goes from `0` in the narrow screen case to `1` in the wide screen case. We also change the `flex-direction` this way (if you want a more detailed explanation of how this works, check out my [**second article**](/css-tricks.com/dry-state-switching-with-css-variables-fallbacks-and-invalid-values.md) on DRY switching with CSS variables).

```scss
body {
  --k: var(--wide, 0);
  display: flex;
  flex-direction: var(--wide, column);

  @media (orientation: landscape) { --wide: 1 }
}
```

We then have a second switch on the advanced controls panel. This second switch is `0` if the checkbox is unchecked and `1` if the checkbox is `:checked`. With the help of this switch, we give our advanced controls panel a disabled look (via a `filter` chain) and we also disable it (via `pointer-events`). Here, `not` comes in handy, as we want to decrease the contrast and the opacity in the disabled case:

```scss
.advanced {
  --i: var(--enabled, 0);
  --noti: calc(1 - var(--i));
  filter: 
    contrast(calc(1 - var(--noti)*.9)) 
    opacity(calc(1 - var(--noti)*.7));
  pointer-events: var(--enabled, none);
	
  [id='toggle']:checked ~ & { --enabled: 1 }
}
```

We want the advanced controls panel to stay expanded if we’re in the wide screen case (so if `--k` is `1`), regardless of whether the checkbox is `:checked` or not, *or* if the checkbox is `:checked` (so if `--i` is `1`), regardless of whether we’re in the wide screen case or not.

This is precisely the `or` operation!

So we compute an `--or` variable:

```scss
.advanced {
  /* same as before */
  --or: calc(1 - (1 - var(--k))*(1 - var(--i)));
}
```

If this `--or` variable is `0`, this means we’re in the narrow screen case *and* our checkbox is unchecked, so we want to zero the `height` of the advanced controls panel and also its vertical `margin`:

```scss
.advanced {
  /* same as before */
  margin: calc(var(--or)*#{$mv}) 0;
  height: calc(var(--or)*#{$h});
}
```

This gives us the desired result ([live demo (<VPIcon icon="fa-brands fa-codepen" />`thebabydino`)](https://codepen.io/thebabydino/pen/XLzaKV)).

<CodePen
  user="thebabydino"
  slug-hash="XLzaKV"
  title="Hide advanced controls on narrow screens if not enabled"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

### Use the same formulas to position multiple faces of a 3D shape

This is a use case I came across while working on the personal project of [<VPIcon icon="fa-brands fa-codepen"/>CSS-ing](https://codepen.io/collection/eErLu/) the [<VPIcon icon="fa-brands fa-wikipedia-w"/>Johnson solids](https://en.wikipedia.org/wiki/Johnson_solid) this summer.

Let’s take a look at one of these shapes, for example, the gyroelongated pentagonal rotunda ([<VPIcon icon="fa-brands fa-wikipedia-w"/>J25](https://en.wikipedia.org/wiki/Gyroelongated_pentagonal_rotunda)), in order to see how logical operations are useful here.

<VidStack src="https://css-tricks.com/wp-content/uploads/2019/09/compound_shape.mp4" />
<!-- The shape we want to get. -->

This shape is made up out of a [<VPIcon icon="fa-brands fa-wikipedia-w"/>pentagonal rotunda](https://en.wikipedia.org/wiki/Pentagonal_rotunda) without the big decagonal base and a [<VPIcon icon="fa-brands fa-wikipedia-w"/>decagonal antiprism](https://en.wikipedia.org/wiki/Decagonal_antiprism) without its top decagon. The interactive demo below shows how these two components can be built by folding their [<VPIcon icon="fa-brands fa-wikipedia-w"/>nets](https://en.wikipedia.org/wiki/Net_(polyhedron)) of faces into 3D and then joined to give us the shape we want.

<CodePen
  user="thebabydino"
  slug-hash="zVLBge"
  title="Folding nets of J6 + AP10 = J25"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

As it can be seen above, the faces are either a part of the antiprism or a part of the rotunda. This is where we introduce our first switch variable `--i`. This is `0` for the faces that are a part of the antiprism and `1` for the faces that are a part of the rotunda. The antiprism faces have a class of `.mid` because we can add another rotunda to the other antiprism base and then the antiprism would be in the middle. The rotunda faces have a class of `.cup` because this part does look like a coffee cup… without a handle!

<VidStack src="https://css-tricks.com/wp-content/uploads/2019/09/cup.mp4" />
<!-- The rotunda looks like an upside down up cup without a handle. -->

```scss
.mid { --i: 0 }
.cup { --i: 1 }
```

Focusing only on the lateral faces, these can have a vertex pointing up or down. This is where we introduce our second variable `--k`. This is `0` if they have a vertex pointing up (such faces have a `.dir` class) and `1` if they’re reversed and have a vertex pointing down (these faces have a class of `.rev`)

```scss
.dir { --k: 0 }
.rev { --k: 1 }
```

The antiprism has `10` lateral faces (all triangles) pointing up, each attached to an edge of its decagonal base that’s also a base for the compound shape. It also has `10` lateral faces (all triangles as well) pointing down, each attached to an edge of its other decagonal base (the one that’s also the decagonal base of the rotunda and is therefore not a base for the compound shape).

The rotunda has `10` lateral faces pointing up, alternating triangles and pentagons, each attached to the decagonal base that’s also a base for the antiprism (so it’s not a base for the compound shape as well). It also has `5` lateral faces, all triangles, pointing down, each attached to an edge of its pentagonal base.

The interactive demo below allows us to better see each of these four groups of faces by highlighting only one at a time. You can use the arrows at the bottom to pick which group of faces gets highlighted. You can also enable the rotation around the y axis and change the shape’s tilt.

<CodePen
  user="thebabydino"
  slug-hash="GVrVvK"
  title="Types of lateral gyroelongated rotunda faces"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

As previously mentioned, the lateral faces can be either triangles or pentagons:

```scss
.s3gon { --p: 0 }
.s5gon { --p: 1 }
```

Since all of their lateral faces (`.lat`) of both the antiprism and the rotunda have one edge in common with one of the two base faces of each shape, we call these common edges the base edges of the lateral faces.

The interactive demo below highlights these edges, their end points and their mid points and allows viewing the shapes from various angles thanks to the auto-rotations around the y axis which can be started/ paused at any moment and to the manual rotations around the x axis which can be controlled via the sliders.

<CodePen
  user="thebabydino"
  slug-hash="qzMLzO"
  title="Highlight vertices and midpoints of base edges"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

In order to make things easier for ourselves, we set the `transform-origin` of the `.lat` faces on the middle of their base edges (bottom horizontal edges).

![Highlighting the base edges and their midpoints ([live (<VPIcon icon="fa-brands fa-codepen" />`thebabydino`)](https://codepen.io/thebabydino/pen/GbPvvb)).](https://css-tricks.com/wp-content/uploads/2019/07/lat_face_base.svg)

We also make sure we position these faces such as to have these midpoints dead in the middle of the scene element containing our entire 3D shape.

Having the `transform-origin` coincide with the midpoint the base edge means that any rotation we perform on a face is going to happen around the midpoint of its base edge, as illustrated by the interactive demo below:

<CodePen
  user="thebabydino"
  slug-hash="XLQOoE"
  title="Rotate poly around base midpoint"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

We place our lateral faces where we want them to be in four steps:

1. We rotate them around their y axis such that their base edges are now parallel to their final positions. (This also rotates their local system of coordinates — the z axis of an element always points in the direction that element faces.)
2. We translate them such that their base edges coincide with their final positions (along the edges of the base faces of the two components).
3. If they need to have a vertex pointing down, we rotate them around their z axis by half a turn.
4. We rotate them around their x axis into their final positions

These steps are illustrated by the interactive demo below, where you can go through them and also rotate the entire shape (using the play/pause button for the y axis rotation and the slider for the x axis rotation).

<CodePen
  user="thebabydino"
  slug-hash="orKomV"
  title="Building: gyroelongated pentagonal rotunda (lateral faces)"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

The y axis rotation value is based mostly on the face indices and less on our switch variables, though it depends on these as well.

The structure is as follows:

```pug
- var n = 5; //- number of edges/ vertices of small base

section.scene
  //- 3D shape element
  .s3d
    //- the faces, each a 2D shape element (.s2d)
    
    //- lateral (.lat) antiprism (.mid) faces, 
    //- first half pointing up (.dir), others pointing down (.rev)
    //- all of them being triangles (.s3gon)
    - for(var j = 0; j < 4*n; j++)
      .s2d.mid.lat.s3gon(class=j < 2*n ? 'dir' : 'rev')
    
    //- lateral (.lat) rotunda (.cup) faces that point up (.dir), 
    //- both triangles (.s3gon) and pentagons (.s5gon)
    - for(var j = 0; j < n; j++)
      .s2d.cup.lat.s3gon.dir
      .s2d.cup.lat.s5gon.dir
    //- lateral (.lat) rotunda (.cup) faces that point down (.rev)
    //- all of them triangles (.s3gon)
    - for(var j = 0; j < n; j++)
      .s2d.cup.lat.s3gon.rev

    //- base faces, 
    //- one for the antiprism (.mid), 
    //- the other for the rotunda (.cup)
    .s2d.mid.base(class=`s${2*n}gon`)
    .s2d.cup.base(class=`s${n}gon`)
```

Which gives us the following HTML:

```html
<section class="scene">
  <div class="s3d">
    <!-- LATERAL faces -->
    <div class="s2d mid lat s3gon dir"></div>
    <!-- 9 more identical faces, 
         so we have 10 lateral antiprism faces pointing up -->

    <div class="s2d mid lat s3gon rev"></div>
    <!-- 9 more identical faces, 
         so we have 10 lateral antiprism faces pointing down -->

    <div class="s2d cup lat s3gon dir"></div>
    <div class="s2d cup lat s5gon dir"></div>
    <!-- 4 more identical pairs, 
         so we have 10 lateral rotunda faces pointing up -->

    <div class="s2d cup lat s3gon rev"></div>
    <!-- 4 more identical faces, 
         so we have 5 lateral rotunda faces pointing down -->

    <!-- BASE faces -->
    <div class="s2d mid base s10gon"></div>
    <div class="s2d cup base s5gon"></div>
  </div>
</section>
```

This means faces `0... 9` are the `10` lateral antiprism faces pointing up, faces `10... 19` are the `10` lateral antiprism faces pointing down, faces `20... 29` are the `10` lateral rotunda faces pointing up and faces `30... 34` are the `5` lateral rotunda faces pointing down.

So what we do here is set an index `--idx` on the lateral faces.

```scss
$n: 5; // number of edges/ vertices of small base

.lat {
  @for $i from 0 to 2*$n {
    &:nth-child(#{2*$n}n + #{$i + 1}) { --idx: #{$i} }
  }
}
```

This index starts at `0` for each group of faces, which means the indices for faces `0... 9`, `10... 19` and `20... 29` go from `0` through `9`, while the indices for faces `30... 34` go from `0` through `4`. Great, but if we just multiply these indices with the base angle[#note-1] of the common decagon to get the y axis rotation we want at this step:

```scss
--ay: calc(var(--idx)*#{$ba10gon});

transform: rotatey(var(--ay))
```

…then we get the following final result. I’m showing the final result here because it’s a bit difficult to see what’s wrong by looking at the intermediate result we get after only applying the rotation around the y axis.

<CodePen
  user="thebabydino"
  slug-hash="eYOWZzO"
  title="y rotation strictly based on index - oops!"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

This is… not quite what we were going for!

So let’s see what problems the above result has and how to solve them with the help of our switch variables and boolean operations on them.

The first issue is that the lateral antiprism faces pointing up need to be offset by half of a regular decagon’s base angle. This means adding or subtracting `.5` from `--idx` before multiplying with the base angle, *but only for these faces*.

<CodePen
  user="thebabydino"
  slug-hash="JjPWeXL"
  title="Position of antiprism faces pointing up"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

The faces we want to target are the faces for which both of `--i` and `--k` are `0`, so what we need here is multiply the result of their `nor` with `.5`:

```scss
--nor: calc((1 - var(--k))*(1 - var(--i)));
--j: calc(var(--idx) + var(--nor)*.5);
--ay: calc(var(--j)*#{$ba10gon});

transform: rotatey(var(--ay));
```

The second issue is that the lateral rotunda faces pointing down are not distributed as they should be, such that each of them has a base edge in common with the base pentagon and the vertex opposing the base in common with the triangular rotunda faces pointing up. This means multiplying `--idx` by `2`, but only for these faces.

<CodePen
  user="thebabydino"
  slug-hash="ZEzedzp"
  title="Position of cupola faces pointing down"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

What we’re targeting now are the faces for which both `--i` and `--k` are `1` (so the faces for which the result of the `and` operation is `1`), so what we need is to multiply `--idx` with `1` plus their `and`:

```scss
--and: calc(var(--k)*var(--i));
--nor: calc((1 - var(--k))*(1 - var(--i)));
--j: calc((1 + var(--and))*var(--idx) + var(--nor)*.5);
--ay: calc(var(--j)*#{$ba10gon});

transform: rotatey(var(--ay));
```

The next step is the translation for which we use `translate3d()`. We don’t move any of our faces left or right, so the value along the x axis is always `0`. We do move them however vertically (along the y axis) and forward (along the z axis)

Vertically, we want the cup faces that will later get rotated to point down to have their base edge in the plane of the small (pentagonal) base of the cup (and of the compound shape). This means the faces for which `--i` is `1` and `--k` is `1` get moved up (negative direction) by half the total height of the compound shape (a total height which we have computed to be `$h`). So we need the `and` operation here.

```scss
// same as before
--and: calc(var(--i)*var(--k));
--y: calc(var(--and)*#{-.5*$h});

transform: rotatey(var(--ay)) 
           translate3d(0, var(--y, 0), var(--z, 0));
```

We also want all the other cup faces as well as the antiprism faces that will eventually point down to have their base edge in the common plane between the cup and the antiprism. This means the faces for which `--i` is `1` and `--k` is `0` as well as the faces for which `--i` is `0` and `--k` is `1` get translated down (positive direction) by half the height of the compound shape and then back up (negative direction) by the height of the antiprism (`$h-mid`). And what do you know, this is the `xor` operation!

```scss
// same as before
--xor: calc((var(--k) - var(--i))*(var(--k) - var(--i)));
--and: calc(var(--i)*var(--k));
--y: calc(var(--xor)*#{.5*$h - $h-mid} - 
          var(--and)*#{.5*$h});

transform: rotatey(var(--ay)) 
           translate3d(0, var(--y, 0), var(--z, 0));
```

Finally, we want the antiprism faces that will remain pointing up to be in the bottom base plane of the compound shape (and of the antiprism). This means the faces for which `--i` is `0` and `--k` is `0` get translated down (positive direction) by half the total height of the compound shape. So what we use here is the `nor` operation!

```scss
// same as before
--nor: calc((1 - var(--k))*(1 - var(--i)));
--xor: calc((var(--k) - var(--i))*(var(--k) - var(--i)));
--and: calc(var(--i)*var(--k));

--y: calc(var(--nor)*#{.5*$h} + 
          var(--xor)*#{.5*$h - $h-mid} - 
          var(--and)*#{.5*$h});

transform: rotatey(var(--ay)) 
           translate3d(0, var(--y, 0), var(--z, 0));
```

<CodePen
  user="thebabydino"
  slug-hash="qBWmNzg"
  title="Building compound shape: translating faces so their bases are in the final planes"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

Along the z direction, we want to move the faces such that their base edges coincide with the edges of the base faces of the compound shape or the edges of the common base (which is not a face of the compound shape) shared by the two 3D components. For the top faces of the cup (which we later rotate to point down), the placement is on the edges of a pentagon, while for all the other faces of the compound shape, the placement is on the edges of a decagon.

This means the faces for which `--i` is `1` and `--k` is `1` get translated forward by the inradius of the pentagonal base while all the other faces get translated forward by the inradius of a decagonal base. So the operations we need here are `and` and `nand`!

```scss
// same as before
--and: calc(var(--i)*var(--k));
--nand: calc(1 - var(--and));
--z: calc(var(--and)*#{$ri5gon} + var(--nand)*#{$ri10gon});

transform: rotatey(var(--ay)) 
           translate3d(0, var(--y, 0), var(--z, 0));
```

<CodePen
  user="thebabydino"
  slug-hash="GRKmjKJ"
  title="Building compound shape: translating face bases on edges of base/ section polygons"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

Next, we want to make all `.rev` (for which `--k` is `1`) faces point down. This is pretty straightforward and doesn’t require any logical operation, we just need to add a half a turn rotation around the z axis to the transform chain, but only for the faces for which `--k` is `1`:

```scss
// same as before
--az: calc(var(--k)*.5turn);

transform: rotatey(var(--ay)) 
           translate3d(0, var(--y), var(--z))
           rotate(var(--az));
```

<CodePen
  user="thebabydino"
  slug-hash="qBWmaOw"
  title="Building compound shape: rotating faces to point down if necessary"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

The pentagonal faces (for which `--p` is `1`) are then all rotated around the x axis by a certain angle:

```scss
--ax: calc(var(--p)*#{$ax5});
```

In the case of the triangular faces (for which `--p` is `0`, meaning we need to use `--notp`), we have a certain rotation angle for the faces of the antiprism (`$ax3-mid`), another angle for the faces of the rotunda that point up (`$ax3-cup-dir`) and yet another angle for the rotunda faces pointing down (`$ax3-cup-red`).

The antiprism faces are those for which `--i` is `0`, so we need to multiply their corresponding angle value with `--noti` here. The rotunda faces are those for which `--i` is `1`, and out of these, the ones pointing up are those for which `--k` is `0` and the ones pointing down are those for which `--k` is `1`.

```scss
--notk: calc(1 - var(--k));
--noti: calc(1 - var(--i));
--notp: calc(1 - var(--p));

--ax: calc(var(--notp)*(var(--noti)*#{$ax3-mid} + 
                        var(--i)*(var(--notk)*#{$ax3-cup-dir} + var(--k)*#{$ax3-cup-rev})) +
           var(--p)*#{$ax5});

transform: rotatey(var(--ay)) 
           translate3d(0, var(--y), var(--z))
           rotate(var(--az)) 
           rotatex(var(--ax));
```

This gives us the final result!

<CodePen
  user="thebabydino"
  slug-hash="LYPyRQY"
  title="Building compound shape: rotating faces into final position"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

---

## Note-1

For any regular polygon (such as any of the faces of our shapes), the arc corresponding to one edge, as well as the angle between the circumradii to this edge’s ends (our base angle) is a full circle (360°) over the number of edges. In the case of an equilateral triangle, the angle is 360°/3 = 120°. For a regular pentagon, the angle is 360°/5 = 72°. For a regular decagon, the angle is 360°/10 = 36°.

<CodePen
  user="thebabydino"
  slug-hash="QbBWZb"
  title="construct regular polygon"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Logical Operations with CSS Variables",
  "desc": "Very often, while using switch variables (a variable that's either 0 or 1, a concept that's explained in a greater detail in in this post), I wish I could",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/logical-operations-with-css-variables.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
