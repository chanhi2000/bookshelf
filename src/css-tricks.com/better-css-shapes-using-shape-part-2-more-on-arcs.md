---
lang: en-US
title: "Better CSS Shapes Using shape() — Part 2: More on Arcs"
description: "Article(s) > Better CSS Shapes Using shape() — Part 2: More on Arcs"
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
      content: "Article(s) > Better CSS Shapes Using shape() — Part 2: More on Arcs"
    - property: og:description
      content: "Better CSS Shapes Using shape() — Part 2: More on Arcs"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/better-css-shapes-using-shape-part-2-more-on-arcs.html
prev: /programming/css/articles/README.md
date: 2025-05-30
isOriginal: false
author:
  - name: Temani Afif
    url: https://css-tricks.com/author/afiftemani/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/05/shape-fuinction-featured.webp
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
  name="Better CSS Shapes Using shape() — Part 2: More on Arcs"
  desc="This is the second part of a series that dives deep into the CSS shape() command, continuing with a more detailed look at the arc command."
  url="https://css-tricks.com/better-css-shapes-using-shape-part-2-more-on-arcs"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/05/shape-fuinction-featured.webp"/>

Ready for the second part? We are still exploring the `shape()` function, and more precisely, the arc command. I hope you took the time to digest [**the first part**](/css-tricks.com/better-css-shapes-using-shape-part-1-lines-and-arcs.md) because we will jump straight into creating more shapes!

As a reminder, the `shape()` function is only supported in Chrome 137+ and Safari 18.4+ as I’m writing this in May 2025.

::: info Series: Better CSS Shapes Using <code>shape()</code>

```component VPCard
{
  "title": "Better CSS Shapes Using shape() — Part 1: Lines and Arcs",
  "desc": "This is the first part of a series that dives deep into the shape function, starting with shapes that use lines and arcs.",
  "link": "/css-tricks.com/better-css-shapes-using-shape-part-1-lines-and-arcs.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

```component VPCard
{
  "title": "Better CSS Shapes Using shape() — Part 2: More on Arcs",
  "desc": "This is the second part of a series that dives deep into the CSS shape() command, continuing with a more detailed look at the arc command.",
  "link": "/css-tricks.com/better-css-shapes-using-shape-part-2-more-on-arcs.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

```component VPCard
{
  "title": "Better CSS Shapes Using shape() — Part 3: Curves",
  "desc": "This is the third article in a series about the CSS shape() function. We've covered drawing lines and arcs in previous articles and, this time, we look specifically at the curve command and how to use it for drawing complex shapes.",
  "link": "/css-tricks.com/better-css-shapes-using-shape-part-3-curves.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

```component VPCard
{
  "title": "Better CSS Shapes Using shape() — Part 4: Close and Move",
  "desc": "The shape() function's close and move commands may not be ones you reach for often, but are incredibly useful for certain shapes.",
  "link": "/css-tricks.com/better-css-shapes-using-shape-part-4-close-and-move.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

:::

---

## Sector shape

Another classic shape that can also be used in pie-like charts.

![A series of three semi-circles.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/05/s_8CE93768242FD9A6B9E096BADABB68650B618F30768964FE1F5B79353F471E4D_1747235922130_image.png.webp?resize=719%2C312&ssl=1)

It’s already clear that we have one arc. As for the points, we have two points that don’t move and one that moves depending on how much the sector is filled.

![Diagram showing the fixed and variable lengths of an arc shape.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/05/s_8CE93768242FD9A6B9E096BADABB68650B618F30768964FE1F5B79353F471E4D_1747236487932_image.png.webp?resize=595%2C403&ssl=1)

The code will look like this:

```css
.sector {
  --v: 35; /* [0 100]*/
  
  aspect-ratio: 1;
  clip-path: shape(from top, arc to X Y of R, line to center);
}
```

We define a variable that will control the filling of the sector. It has a value between `0` and `100`. To draw the shape, we start from the `top`, create an arc until the point (X, Y), and then we move to the `center`.

> Are we allowed to use keyword values like `top` and `center`?

Yes! Unlike the `polygon()` function, we have keywords for the particular cases such as `top`, `bottom`, `left`, etc. It’s exactly like `background-position` that way. I don’t think I need to detail this part as it’s trivial, but it’s good to know because it can make your shape a bit easier to read.

The radius of the arc should be equal to `50%`. We are working with a square element and the sector, which is a portion of a circle, need to fill the whole element so the radius is equal to half the width (or height).[^1]

[^1]: The `arc` command is defined to draw elliptical arcs by taking two radii, but if we define one radius value, it means that the vertical and horizontal radius will use that same value and we have circular arcs. When it’s a length, it’s trivial, but when we use percentages, the value will resolve against the [<VPIcon icon="iconfont icon-w3c"/>direction-agnostic size](https://drafts.csswg.org/css-shapes-2/#direction-agnostic-size), which is equal to the length of the diagonal of the box, divided by `sqrt(2)`.<br/>In our case, we have a square element so 50% of the direction-agnostic size will be equal to 50% of `sqrt(Width² + Height²)/sqrt(2)`. And since both width and height are equal, we end with 50% of the width (or the height).

As for the point, it’s placed within that circle, and its position depends on the V value. You don’t want a boring math explanation, right? No need for it, here is the formula of X and Y:

```none
X = 50% + 50% * sin(V * 3.6deg)
Y = 50% - 50% * cos(V * 3.6deg)
```

Our code becomes:

```css
.sector {
  --v: 35; /* [0 100] */
  
  aspect-ratio: 1;
  clip-path: shape(from top,
    arc to calc(50% + 50% * sin(var(--v) * 3.6deg)) 
           calc(50% - 50% * cos(var(--v) * 3.6deg)) of 50%,
    line to center);
}
```

<CodePen
  user="anon"
  slug-hash="WbbPMKr"
  title="first try"
  :default-tab="['css','result']"
  :theme="dark"/>

Hmm, the result is not good, but there are no mistakes in the code. Can you figure out what we are missing?

It’s the size and direction of the arc!

Remember what I told you in the last article? You will always have trouble with them, but if we try the different combinations, we can easily fix the issue. In our case, we need to use: `small cw`.

<CodePen
  user="anon"
  slug-hash="WbbPMLw"
  title="Trying small"
  :default-tab="['css','result']"
  :theme="dark"/>

Better! Let’s try it with more values and see how the shape behaves:

<CodePen
  user="anon"
  slug-hash="zxxeReR"
  title="still not good"
  :default-tab="['css','result']"
  :theme="dark"/>

Oops, some values are good, but others not so much. The direction needs to be clockwise, but maybe we should use `large` instead of `small`? Let’s try:

<CodePen
  user="anon"
  slug-hash="jEEdZoy"
  title="still not good"
  :default-tab="['css','result']"
  :theme="dark"/>

Still not working. The issue here is that we are moving one point of the arc based on the V value, and this movement creates a different configuration for the `arc` command.

Here is an interactive demo to better visualize what is happening:

<CodePen
  user="anon"
  slug-hash="LEEqJVp"
  title="large vs small\"
  :default-tab="['css','result']"
  :theme="dark"/>

When you update the value, notice how `large cw` always tries to follow the largest arc between the points, while `small cw` tries to follow the smallest one. When the value is smaller than `50`, `small cw` gives us a good result. But when it’s bigger than `50`, the `large cw` combination is the good one.

I know, it’s a bit tricky and I wanted to study this particular example to emphasize the fact that we can have a lot of headaches working with arcs. But the more issues we face, the better we get at fixing them.

The solution in this case is pretty simple. We keep the use of `large cw` and add a `border-radius` to the element. If you check the previous demo, you will notice that even if `large cw` is not producing a good result, it’s filling the area we want. All we need to do is clip the extra space and a simple `border-radius: 50%` will do the job!

<CodePen
  user="anon"
  slug-hash="KwwJxgr"
  title="adding border-radius"
  :default-tab="['css','result']"
  :theme="dark"/>

I am keeping the `box-shadow` in there so we can see the arc, but we can clearly see how `border-radius` is making a difference on the main shape.

There is still one edge case we need to consider. When the value is equal to `100`, both points of the arc will have the same coordinates, which is logical since the sector is full and we have a circle. But when it’s the case, the arc will do nothing by definition and we won’t get a full circle.

To fix this, we can limit the value to, for example, `99.99` to avoid reaching `100`. It’s kind of hacky, but it does the job.

```css
.sector {
  --v: 35; /* [0 100]*/
  
  --_v: min(99.99, var(--v));
  aspect-ratio: 1;
  clip-path: shape(from top,
    arc to calc(50% + 50% * sin(var(--_v) * 3.6deg)) 
           calc(50% - 50% * cos(var(--_v) * 3.6deg)) of 50% large cw,
    line to center);
  border-radius: 50%;
}
```

Now our shape is perfect! And don’t forget that you can apply it to image elements:

<CodePen
  user="anon"
  slug-hash="dPPamPL"
  title="Sector shape using shape()"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Arc shape

Similar to the sector shape, we can also create an arc shape. After all, we are working with the `arc` command, so we have to do it.

![A series of three circular rings at various lengths.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/05/s_8CE93768242FD9A6B9E096BADABB68650B618F30768964FE1F5B79353F471E4D_1747257617920_image.png.webp?resize=783%2C335&ssl=1)

We already have half the code since it’s basically a sector shape without the inner part. We simply need to add more commands to cut the inner part.

![Diagram showing the arc points of a semi-circle shape. There are two arcs, one on the outside and one on the inside. They are joined by straight lines.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/05/s_8CE93768242FD9A6B9E096BADABB68650B618F30768964FE1F5B79353F471E4D_1747258392197_image.png.webp?resize=640%2C436&ssl=1)

```css
.arc {
  --v: 35; 
  --b: 30px;
  
  --_v: min(99.99, var(--v));
  aspect-ratio: 1;
  clip-path: shape(from top,
    arc to calc(50% + 50% * sin(var(--_v) * 3.6deg)) 
           calc(50% - 50% * cos(var(--_v) * 3.6deg)) of 50% cw large,
    
    line to calc(50% + (50% - var(--b)) * sin(var(--_v) * 3.6deg)) 
            calc(50% - (50% - var(--b)) * cos(var(--_v) * 3.6deg)),
    arc to 50% var(--b) of calc(50% - var(--b)) large
  );
  border-radius: 50%;
}
```

From the sector shape, we remove the `line to center` piece and replace it with another `line` command that moves to a point placed on the inner circle. If you compare its coordinates with the previous point, you will see an offset equal to `--b`, which is a variable that defines the arc’s thickness. Then we draw an arc in the opposite direction (`ccw`) until the point `50% var(--b)`, which is also a point with an offset equal to `--b` from the top.

I am not defining the direction of the second arc since, by default, the browser will use `ccw`.

<CodePen
  user="anon"
  slug-hash="XJJOxMM"
  title="arc shape first try"
  :default-tab="['css','result']"
  :theme="dark"/>

Ah, the same issue we hit with the sector shape is striking again! Not all the values are giving a good result due to the same logic we saw earlier, and, as you can see, `border-radius` is not fixing it. This time, we need to find a way to conditionally change the size of the arc based on the value. It should be `large` when V is bigger than `50`, and `small` otherwise.

Conditions in CSS? Yes, it’s possible! First, let’s convert the V value like this:

```css
--_f: round(down, var(--_v), 50)
```

The value is within the range `[0 99.99]` (don’t forget that we don’t want to reach the value 100). We use `round()` to make sure it’s always equal to a multiple of a specific value, which is `50` in our case. If the value is smaller than `50`, the result is `0`, otherwise it’s `50`.

There are only two possible values, so we can easily add a condition. If `--_f` is equal to `0` we use small; otherwise, we use large:

```css{6-7}
.arc {
  --v: 35;
  --b: 30px;
  
  --_v: min(99.99, var(--v));
  --_f: round(down,var(--_v), 50);
  --_c: if(style(--_f: 0): small; else: large);
  clip-path: shape(from top,
    arc to calc(50% + 50% * sin(var(--_v) * 3.6deg)) 
           calc(50% - 50% * cos(var(--_v) * 3.6deg)) of 50% cw var(--_c),
    line to calc(50% + (50% - var(--b)) * sin(var(--_v) * 3.6deg)) 
            calc(50% - (50% - var(--b)) * cos(var(--_v) * 3.6deg)),
    arc to 50% var(--b) of calc(50% - var(--b)) var(--_c)
  );
}
```

I know what you are thinking, but let me tell you that the above code is valid. You probably don’t know it yet, but CSS has recently introduced [**inline conditionals using an `if()` syntax**](/css-tricks.com/if-css-gets-inline-conditionals.md). It’s still early to play with it, but we have found a perfect use case for it. Here is a demo that you can test using Chrome Canary:

<CodePen
  user="anon"
  slug-hash="myyvzVG"
  title="Arc shape using if()"
  :default-tab="['css','result']"
  :theme="dark"/>

Another way to express conditions is to rely on [**style queries**](/css-tricks.com/digging-deeper-into-container-style-queries.md) that have better support:

```css{8}
.arc {
  --v: 35;
  --b: 30px;
  
  --_v: min(99.99, var(--v));
  --_f: round(down, var(--_v), 50);
  aspect-ratio: 1;
  container-name: arc;
}
.arc:before {
  content: "";
  clip-path: shape(from top,
    arc to calc(50% + 50% * sin(var(--_v) * 3.6deg)) 
           calc(50% - 50% * cos(var(--_v) * 3.6deg)) of 50% cw var(--_c, large),
    line to calc(50% + (50% - var(--b)) * sin(var(--_v) * 3.6deg)) 
            calc(50% - (50% - var(--b)) * cos(var(--_v) * 3.6deg)),
    arc to 50% var(--b) of calc(50% - var(--b)) var(--_c, large)
  );
  @container style(--_f: 0) { --_c: small }
}
```

The logic is the same but, this feature requires a parent-child relation, which is why I am using a pseudo-element. By default, the size will be `large`, and if the value of `--_f` is equal to `0`, we switch to `small`.

<CodePen
  user="anon"
  slug-hash="PwwVyZX"
  title="arc shape using style queries"
  :default-tab="['css','result']"
  :theme="dark"/>

Note that we have to register the variable `--_f` using `@property` to be able to either use the `if()` function or style queries.

Did you notice another subtle change I have made to the shape? I removed `border-radius` and I applied the conditional logic to the first arc. Both have the same issue, but `border-radius` can fix only one of them while the conditional logic can fix both, so we can optimize the code a little.

---

## Arc shape with rounded edges

What about adding rounded edges to our arc? It’s better, right?

![A series of three semi-circles with rounded edges at varying lengths.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/05/s_8CE93768242FD9A6B9E096BADABB68650B618F30768964FE1F5B79353F471E4D_1747262479797.webp?resize=691%2C291&ssl=1)

Can you see how it’s done? Take it as a small exercise and update the code from the previous examples to add those rounded edges. I hope you are able to find it by yourself because the changes are pretty straightforward — we update one `line` command with an `arc` command and we add another `arc` command at the end.

```css{4-5,7}
clip-path: shape(from top,
  arc to calc(50% + 50% * sin(var(--_v) * 3.6deg)) 
         calc(50% - 50% * cos(var(--_v) * 3.6deg)) of 50% cw var(--_c, large),
  arc to calc(50% + (50% - var(--b)) * sin(var(--_v) * 3.6deg))
         calc(50% - (50% - var(--b)) * cos(var(--_v) * 3.6deg)) of 1% cw,
  arc to 50% var(--b) of calc(50% - var(--b)) var(--_c, large),
  arc to top of 1% cw
);
```

If you do not understand the changes, get out a pen and paper, then draw the shape to better see the four arcs we are drawing. Previously, we had two arcs and two lines, but now we are working with arcs instead of lines.

And did you remember the trick of using a `1%` value for the radius? The new arcs are half circles, so we can rely on that trick where you specify a tiny radius and the browser will do the job for you and find the correct value!

<CodePen
  user="anon"
  slug-hash="jEEdeRV"
  title="Arc shape with rounded edges"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Conclusion

We are done — enough about the `arc` command! I had to write two articles that focus on this command because it’s the trickiest one, but I hope it’s now clear how to use it and how to handle the direction and size thing, as that is probably the source of most headaches.

By the way, I have only studied the case of circular arcs because, in reality, we can specify two radii and draw elliptical ones, which is even more complex. Unless you want to become a `shape()` master, you will rarely need elliptical arcs, so don’t bother yourself with them.

Until the next article, [**I wrote an article for Frontend Masters**](/master.dev/creating-flower-shapes-using-clip-path-shape.md) where you can create more fancy shapes using the `arc` command that is a good follow-up to this one.

![Three shapes. The first looks like a flower. The second looks like a sun. The third looks like a blob.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/05/8hogoSIf.webp?resize=883%2C354&ssl=1)

::: info Series: Better CSS Shapes Using <code>shape()</code>

```component VPCard
{
  "title": "Better CSS Shapes Using shape() — Part 1: Lines and Arcs",
  "desc": "This is the first part of a series that dives deep into the shape function, starting with shapes that use lines and arcs.",
  "link": "/css-tricks.com/better-css-shapes-using-shape-part-1-lines-and-arcs.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

```component VPCard
{
  "title": "Better CSS Shapes Using shape() — Part 2: More on Arcs",
  "desc": "This is the second part of a series that dives deep into the CSS shape() command, continuing with a more detailed look at the arc command.",
  "link": "/css-tricks.com/better-css-shapes-using-shape-part-2-more-on-arcs.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

```component VPCard
{
  "title": "Better CSS Shapes Using shape() — Part 3: Curves",
  "desc": "This is the third article in a series about the CSS shape() function. We've covered drawing lines and arcs in previous articles and, this time, we look specifically at the curve command and how to use it for drawing complex shapes.",
  "link": "/css-tricks.com/better-css-shapes-using-shape-part-3-curves.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

```component VPCard
{
  "title": "Better CSS Shapes Using shape() — Part 4: Close and Move",
  "desc": "The shape() function's close and move commands may not be ones you reach for often, but are incredibly useful for certain shapes.",
  "link": "/css-tricks.com/better-css-shapes-using-shape-part-4-close-and-move.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Better CSS Shapes Using shape() — Part 2: More on Arcs",
  "desc": "This is the second part of a series that dives deep into the CSS shape() command, continuing with a more detailed look at the arc command.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/better-css-shapes-using-shape-part-2-more-on-arcs.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
