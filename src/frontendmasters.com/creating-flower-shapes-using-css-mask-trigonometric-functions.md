---
lang: en-US
title: "Creating Flower Shapes using CSS Mask & Trigonometric Functions"
description: "Article(s) > Creating Flower Shapes using CSS Mask & Trigonometric Functions"
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
      content: "Article(s) > Creating Flower Shapes using CSS Mask & Trigonometric Functions"
    - property: og:description
      content: "Creating Flower Shapes using CSS Mask & Trigonometric Functions"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/creating-flower-shapes-using-css-mask-trigonometric-functions.html
prev: /programming/css/articles/README.md
date: 2024-02-29
isOriginal: false
author:
  - name: Temani Afif
    url : https://frontendmasters.com/blog/author/temaniafif/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/1021
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
  name="Creating Flower Shapes using CSS Mask & Trigonometric Functions"
  desc="Creating unusual shapes is always a fun exercise and a good way to practice your CSS skills. One might argue that SVG is better for this job, but nowadays we have a lot of new CSS tricks that allow us to create shapes with a clean and optimized code. Through this two-article series, we will […]"
  url="https://frontendmasters.com/blog/creating-flower-shapes-using-css-mask-trigonometric-functions/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/1021"/>

Creating unusual shapes is always a fun exercise and a good way to practice your CSS skills. One might argue that SVG is better for this job, but nowadays we have a lot of new CSS tricks that allow us to create shapes with a clean and optimized code. Through this two-article series, we will explore what can be done with CSS nowadays.

::: info Article Series

```component VPCard
{
  "title": "Creating Flower Shapes using clip-path: shape()",
  "desc": "Use the `arc` command within the `shape()` function we can draw a line that follows a circle from one point to the next, controlling the direction.",
  "link": "/frontendmasters.com/creating-flower-shapes-using-clip-path-shape.md",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

1. [Creating Wavy Circles with Fancy Animations in CSS](https://frontendmasters.com/blog/creating-wavy-circles-with-fancy-animations/)
<!-- TODO: /frontendmasters.com/creating-wavy-circles-with-fancy-animations.md  -->

```component VPCard
{
  "title": "Creating Flower Shapes using CSS Mask & Trigonometric Functions",
  "desc": "Creating unusual shapes is always a fun exercise and a good way to practice your CSS skills. One might argue that SVG is better for this job, but nowadays we have a lot of new CSS tricks that allow us to create shapes with a clean and optimized code. Through this two-article series, we will […]",
  "link": "/frontendmasters.com/creating-flower-shapes-using-css-mask-trigonometric-functions.md",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "Creating Blob Shapes using clip-path: shape()",
  "desc": "Blobs! Gooey weird shapes you can fill with any background and even animate. ",
  "link": "/frontendmasters.com/creating-blob-shapes-using-clip-path-shape.md",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

:::

In this article, we are going to create flower-like shapes. We are going to rely on modern features like mask, trigonometric functions, CSS variables, etc.

![four flower-like shapes with purple to pink gradients. two of them have petals and two of them have spikes. two of them are filled and two of them are outlined.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/02/emMTHfAN.png?resize=749%2C448&ssl=1)

Before we start, you can take a look at [<VPIcon icon="fas fa-globe"/>my online generator for flower shapes](https://css-generators.com/flower-shapes/) to get an overview of what we are building here. You can easily define your settings and get the CSS code in no time. Some of the code we will be writing can be complex so it’s always good to have a generator to make our life easy. That said I invite you to keep reading to understand the logic behind the code you are copying and be able to tweak it if needed.

---

## [](#the-geometry-of-a-flower-shape)The Geometry of A Flower Shape

The structure of the flower shape can be seen as small circles placed around a bigger one.

![final shape showing it is built from one large circle and many smaller ones.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/02/JrgVmGSG.png?resize=775%2C338&ssl=1)

Consider that the small circles touch each other without overlapping each other. This will make the calculation a bit challenging as we will need accurate formulas. Turns out this is a perfect use case for trigonometric functions in CSS.

The shape can be controlled using 2 variables; the number of small circles (`N`) and their radius (`R`). From there we can identify the size of the whole shape and the radius of the big circle.

Here is a figure to illustrate some of the values and from where we can extract the different formulas.

![geometry of the circles showing the radius comparisons.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/02/s_8902C59F87FE310188B36E4009897C666C3E33E25BC1C2DF285794D452BA158A_1708953029181_image.png?resize=587%2C425&ssl=1)

I won’t start a boring geometry course so I will jump straight to the formulas we need to use. The size of the element is equal to

```css
2 * (X + R) = 2 * (R/sin(180deg/N) + R) = 2 * R * (1 + 1/sin(180deg/N))
```

<!-- TODO: latex로 변환 -->

and the radius of the big circle is equal to

```css
C  = R/tan(180deg/N)
```

<!-- TODO: latex로 변환 -->

We have all that we need to start writing some code.

---

## Coding The Shape

The main challenge is to rely on a single element. We are not going to consider a complex HTML structure where each circle is a different element. Instead, we will only use *one* element (and no pseudo-elements either!)

I mentioned `mask`, we’ll be using that, and gradients will allow us to do the shape drawing we want to do. Since it’s all about circles we are going to use `radial-gradient()`. We will also use a bit of Sass (for the looping feature) to control the number of circles. The number of gradients will depend on the number of circles and with Sass we can write a loop to generate the needed gradients.

Let’s start by setting the different variables and the shape size:

```css
$n: 12; /* the number of circles/petals */

.flower {
  --r: 30px; /* the radius of the small circles */
  width: calc(2*var(--r)*(1 + 1/sin(180deg/#{$n})));
  aspect-ratio: 1;
  mask: radial-gradient(#000 calc(var(--r)/tan(180deg/#{$n})),#0000 0);
  background: /* you background coloration */
}
```

Nothing fancy so far, we simply translated the previous formulas using code. I also added the big circle so all that we are missing is the small ones. The Sass code to generate them will look like this:

```scss
$m: (); /* empty variable */
@for $i from 1 through ($n) { /* loop through the number of circles*/
  $m: append($m, 
    radial-gradient(50% 50%,#000 100%,#0000) no-repeat
    x y / calc(2*var(--r)) calc(2*var(--r)), 
  comma);
}
```

`--r` defines the radius so the size of each gradient will be equal to `calc(2*var(--r))`. Then we need to identify the position of each gradient (the `x y`).

Here as well, we need to consider some geometry formulas

```css
x = calc(50% + 50%*cos(360deg*#{$i/$n})) 
y = calc(50% + 50%*sin(360deg*#{$i/$n}))
```

The final code will be:

```scss
$n: 6; /* the number of circles/petals */

.flower {
  --r: 30px; /* the radius of the small circles */
  width: calc(2*var(--r)*(1 + 1/sin(180deg/#{$n})));
  aspect-ratio: 1;
  $m: (); /* empty variable */
  @for $i from 1 through ($n) { /* loop through the number of circles*/
    $m: append($m, 
      radial-gradient(50% 50%,#000 100%,#0000) no-repeat
      calc(50% + 50%*cos(360deg*#{$i/$n})) 
      calc(50% + 50%*sin(360deg*#{$i/$n}))
     / calc(2*var(--r)) calc(2*var(--r)), 
    comma);
  }
  mask: radial-gradient(#000 calc(var(--r)/tan(180deg/#{$n})),#0000 0),{$m};
  background: /* you background coloration */
}
```

Note how the `mask` property takes the value generated using Sass in addition to the gradient that creates the big circle.

Our shape is done!

<CodePen
  user="t_afif"
  slug-hash="NWJQYNx"
  title="Flower shape using CSS mask"
  :default-tab="['css','result']"
  :theme="dark"/>

The size of the shape is controlled by the radius of the small circles but we can do the opposite which is probably more convenient since we generally want to control the width/height of our element.

```css
.flower {
  --w: 200px; /* the size */
  --r: calc(var(--w)/(2*(1 + 1/sin(180deg/#{$n}))));
  width: var(--w);
  /* same as before */
}
```

<CodePen
  user="t_afif"
  slug-hash="VwRoXPR"
  title="Flower shape using CSS mask"
  :default-tab="['css','result']"
  :theme="dark"/>

We can even optimize the previous code a little and get rid the of `--w` variable. The latter is defining the width/height of the element and gradients can access such value using percentages we can write the code like below:

```scss
$n: 12; /* the number of circles/petals */

.flower {  
  width: 300px; /* the size */
  --r: calc(50%/(1 + 1/sin(180deg/#{$n}))); /* using percentage instead of --w */
  aspect-ratio: 1;
  $m: (); /* empty variable */
  @for $i from 1 through ($n) { /* loop through the number of circles*/
    $m: append($m, 
      radial-gradient(50% 50%,#000 100%,#0000) no-repeat
      calc(50% + 50%*cos(360deg*#{$i/$n})) 
      calc(50% + 50%*sin(360deg*#{$i/$n}))
     / calc(2*var(--r)) calc(2*var(--r)), 
    comma);
  }
  mask: radial-gradient(100% 100%,#000 calc(var(--r)/tan(180deg/#{$n})),#0000 0),#{$m};
}
```

Now by adjusting the width you control the size of the whole shape. Here is an interactive demo where you can resize the element and see how the shape adjusts automatically. Try it below with the resizer handle on the bottom right of the box:

<CodePen
  user="t_afif"
  slug-hash="abMeGEb"
  title="Responsive flower shape using CSS mask"
  :default-tab="['css','result']"
  :theme="dark"/>

Voilà! We did a nice flower shape without hack or complex code and you can easily control it by adjusting a few variables. You either use the above code or you consider [<VPIcon icon="fas fa-globe"/>my online generator](https://css-generators.com/flower-shapes/) to get the generated CSS without the variables and Sass.

---

## Inverting the shape

Let’s try a different shape this time. It’s somehow the invert of the previous one where the circular part is going inside instead of outside. Well, a figure worth a thousand words.

![spiky flower shape with purple to orange coloring](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/02/s_8902C59F87FE310188B36E4009897C666C3E33E25BC1C2DF285794D452BA158A_1708960190302_image.png?resize=411%2C404&ssl=1)

The code to get the above shape is the same as the previous one, but we are going to introduce`mask-composite`. The idea is to cut the small circles from the bigger one which translates to a“subtract”composition.

Here is a figure to illustrate the process:

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/02/AzkwW2ZD.png?resize=611%2C487&ssl=1)

The code of mask will look like this:

```css
mask: 
 radial-gradient(100% 100%,#000 calc(var(--r)/tan(180deg/#{$n})),#0000 0) subtract,
 #{$m};
```

And here is the one of the previous shape to compare both:

```css
mask: 
 radial-gradient(100% 100%,#000 calc(var(--r)/tan(180deg/#{$n})),#0000 0),
 #{$m};
```

The only difference is the value of composition “subtract”. And since the remaining code is also the same, we can introduce a variable to control which one to use:

```css
$n: 12; /* the number of circles/petals */

.flower {
  width: 300px;
  aspect-ratio: 1;
  --r: calc(50%/(1 + 1/sin(180deg/#{$n})));
  $m: (); /* empty variable */
  @for $i from 1 through ($n) { /* loop through the number of circles*/
    $m: append($m, 
      radial-gradient(50% 50%,#000 100%,#0000) no-repeat
      calc(50% + 50%*cos(360deg*#{$i/$n})) 
      calc(50% + 50%*sin(360deg*#{$i/$n}))
     / calc(2*var(--r)) calc(2*var(--r)), 
    comma);
  }
  mask: radial-gradient(100% 100%,#000 calc(var(--r)/tan(180deg/#{$n})),#0000 0) var(--alt,),#{$m};
}
.alt {
  --alt: subtract;
}
```

<CodePen
  user="t_afif"
  slug-hash="zYbgaGr"
  title="Flower shape using CSS mask"
  :default-tab="['css','result']"
  :theme="dark"/>

The `var(--alt,)` will default to nothing when the variable is not specified and we get the code of the first shape. By adding the composition value, we get the second shape. Two different shapes with the same code.

::: note Why not simply add `mask-composite: subtract`?

This won’t work because it will apply a “subtract” composition between all the gradient layers whereas we want the composition to happen only between the big circle and the small ones. If you want to use `mask-composite` it should have the following value:

```css
mask-composite: subtract, add, add, ..., add;
```

We perform and “add” composition between the small circles (the default composition) then we “subtract” the result from the big circle. It’s clear that adding one value inside the shorthand version is easier.

:::

---

## The Border-Only Version

Now let’s tackle the border-only version of the previous shapes. We are also going to rely on `mask-composite` and the same code structure.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/02/s_8902C59F87FE310188B36E4009897C666C3E33E25BC1C2DF285794D452BA158A_1708987376830_image.png?resize=824%2C364&ssl=1)

First of all, let’s introduce a new variable to control the border thickness and update the code that generates the small circles.

```scss
$n: 12; /* the number of circles/petals */

.flower {
  --b: 10px; /* the border thickness*/

  width: 300px;
  aspect-ratio: 1;
  --r: calc(50%/(1 + 1/sin(180deg/#{$n})));
  $m: (); /* empty variable */
  @for $i from 1 through ($n) { /* loop through the number of circles*/
    $m: append($m, 
      radial-gradient(50% 50%,#0000 calc(100% - var(--b)),#000 0 100%,#0000) no-repeat
      calc(50% + 50%*cos(360deg*#{$i/$n})) 
      calc(50% + 50%*sin(360deg*#{$i/$n}))
     / calc(2*var(--r)) calc(2*var(--r)), 
    comma);
  }
  mask: #{$m};
}
```

<CodePen
  user="t_afif"
  slug-hash="poYMGpv"
  title="border-only circles around another circle"
  :default-tab="['css','result']"
  :theme="dark"/>

Nothing complex so far. Instead of full circles, we are getting a border-only version. This time we don’t want them to touch each other but rather overlap a bit to have a continuous shape.

We need to increase the radius a little from this

```scss
--r: calc(50%/(1 + 1/sin(180deg/#{$n})));
```

To this:

```scss
--r:calc((50% + var(--b)/(2*sin(180deg/#{$n})))/(1 + 1/sin(180deg/#{$n})));
```

Again some geometry stuff but you don’t really need to accurately understand all the formulas. I did the hard work to identify them and you only need to understand the main trick. In the end, all you have to do is update a few variables to control the shape or get the code from [<VPIcon icon="fas fa-globe"/>my generator](https://css-generators.com/flower-shapes/).

The result so far:

<CodePen
  user="t_afif"
  slug-hash="abMeXYW"
  title="Adding the overlap"
  :default-tab="['css','result']"
  :theme="dark"/>

Now, we use `mask-composite` with another gradient to hide some parts and get our final shapes. Here is a figure to illustrate the process for both shapes.

For the first shape:

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/02/s_8902C59F87FE310188B36E4009897C666C3E33E25BC1C2DF285794D452BA158A_1708986701525_image.png?resize=564%2C447&ssl=1)

And for the second one:

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/02/s_8902C59F87FE310188B36E4009897C666C3E33E25BC1C2DF285794D452BA158A_1708986728215_image.png?resize=564%2C447&ssl=1)

In both cases, I am introducing an extra gradient that will intersect with the small circles. The difference between each shape is the coloration of the extra gradient. In the first case, we have transparent inside and filling outside and for the second case, we have the opposite.

```scss
/* first shape */
mask:
 radial-gradient(100% 100%,#0000 calc(var(--r)/tan(180deg/#{$n}) - var(--b)/(2*tan(180deg/#{$n}))),#000 0) intersect, 
 #{$m};
/* second shape */
mask:
 radial-gradient(100% 100%,#000 calc(var(--r)/tan(180deg/#{$n}) - var(--b)/(2*tan(180deg/#{$n}))),#0000 0) intersect, 
 #{$m};
```

And here is the full code with both variations:

<CodePen
  user="t_afif"
  slug-hash="xxBvBwW"
  title="Border-only flower shape using CSS mask"
  :default-tab="['css','result']"
  :theme="dark"/>

If you have some trouble visualizing how `mask-composite` works, I invite you to read [<VPIcon icon="fas fa-globe"/>the crash course written by Ana Tudor](https://css-tricks.com/mask-compositing-the-crash-course/) where you will find a more in-depth exploration.

---

## One More Shape

Another flower? Let’s go!

![blob like shape, sort of like a gear with smoothed over cogs.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/02/s_8902C59F87FE310188B36E4009897C666C3E33E25BC1C2DF285794D452BA158A_1709024827938_image.png?resize=749%2C448&ssl=1)

This time, it’s your turn to figure out the code. Consider this as a small piece of homework to practice what we have learned together. As a hint, here is a figure that illustrates the `mask-composite` you need to perform, or maybe you will figure out another idea! If so don’t hesitate to share it in the comment section

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/02/image.png?resize=1001%2C486&ssl=1)

Here is [the code of my implementation(<VPIcon icon="fa-brands fa-codepen"/>`t_afif`)](https://codepen.io/t_afif/pen/JjVPjWZ/687389c54821a0763e97bb22cbdc6481) but make a try before checking it so you can compare your method with mine. Take the time to study this last example because it will be the starting point of [**our second article**](//frontendmasters.com/creating-wavy-circles-with-fancy-animations.md).
<!-- TODO: /frontendmasters.com/creating-wavy-circles-with-fancy-animations.md -->

---

## Conclusion

I hope you enjoyed this little experimentation using CSS mask and trigonometric functions. You are probably not going to use such shapes in a real project but creating them is a good way to learn new features. If you have to remember one thing from this article it’s the use of `mask-composite`. It’s a powerful property that can help you create complex shapes.

It is worth noting that since we are using `mask`, we can easily apply our shape to image elements.

<CodePen
  user="t_afif"
  slug-hash="LYvPEeV"
  title="Flower shape using CSS mask"
  :default-tab="['css','result']"
  :theme="dark"/>

Don’t forget to bookmark [<VPIcon icon="fas fa-globe"/>my flower shapes generator](https://css-generators.com/flower-shapes/) so you can easily grab the code whenever you need it. I also have more [<VPIcon icon="fas fa-globe"/>CSS generators](http://css-generators.com/) that invite you to check. Most of them rely on CSS mask as well and I have a detailed article linked to each one.

I will close this article with a few mesmerizing animations involving some flower shapes.

<CodePen
  user="t_afif"
  slug-hash="NWJVdaw"
  title="Flower animation 🌺"
  :default-tab="['css','result']"
  :theme="dark"/>

<CodePen
  user="t_afif"
  slug-hash="vYPwrPo"
  title="Flower animation 🌺"
  :default-tab="['css','result']"
  :theme="dark"/>

<CodePen
  user="t_afif"
  slug-hash="BabgjVO"
  title="Flower animation 🌺"
  :default-tab="['css','result']"
  :theme="dark"/>

::: info Article Series

```component VPCard
{
  "title": "Creating Flower Shapes using CSS Mask & Trigonometric Functions",
  "desc": "Creating unusual shapes is always a fun exercise and a good way to practice your CSS skills. One might argue that SVG is better for this job, but nowadays we have a lot of new CSS tricks that allow us to create shapes with a clean and optimized code. Through this two-article series, we will […]",
  "link": "/frontendmasters.com/creating-flower-shapes-using-css-mask-trigonometric-functions.md",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

2. [Creating Wavy Circles with Fancy Animations in CSS](https://frontendmasters.com/blog/creating-wavy-circles-with-fancy-animations/)
<!-- TODO: /frontendmasters.com/creating-wavy-circles-with-fancy-animations.md  -->
```component VPCard
{
  "title": "Creating Flower Shapes using clip-path: shape()",
  "desc": "Use the `arc` command within the `shape()` function we can draw a line that follows a circle from one point to the next, controlling the direction.",
  "link": "/frontendmasters.com/creating-flower-shapes-using-clip-path-shape.md",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Creating Flower Shapes using CSS Mask & Trigonometric Functions",
  "desc": "Creating unusual shapes is always a fun exercise and a good way to practice your CSS skills. One might argue that SVG is better for this job, but nowadays we have a lot of new CSS tricks that allow us to create shapes with a clean and optimized code. Through this two-article series, we will […]",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/creating-flower-shapes-using-css-mask-trigonometric-functions.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
