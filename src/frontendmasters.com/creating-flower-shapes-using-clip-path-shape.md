---
lang: en-US
title: "Creating Flower Shapes using clip-path: shape()"
description: "Article(s) > Creating Flower Shapes using clip-path: shape()"
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
      content: "Article(s) > Creating Flower Shapes using clip-path: shape()"
    - property: og:description
      content: "Creating Flower Shapes using clip-path: shape()"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/creating-flower-shapes-using-clip-path-shape.html
prev: /programming/css/articles/README.md
date: 2025-05-12
isOriginal: false
author:
  - name: Temani Afif
    url : https://frontendmasters.com/blog/author/temaniafif/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/5824
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
  name="Creating Flower Shapes using clip-path: shape()"
  desc="Use the `arc` command within the `shape()` function we can draw a line that follows a circle from one point to the next, controlling the direction."
  url="https://frontendmasters.com/blog/creating-flower-shapes-using-clip-path-shape/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/5824"/>

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

In[**a previous article**](/frontendmasters.com/creating-flower-shapes-using-css-mask-trigonometric-functions.md), we used modern CSS features such as `mask`, trigonometric functions, and CSS variables to create flower-like shapes.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/05/8hogoSIf.png?resize=883%2C354&ssl=1)

The HTML code was a single element, which means we can apply the CSS to image elements and get cool frames like the demo below:

<CodePen
  user="t_afif"
  slug-hash="LYvPEeV"
  title="Flower shape using CSS mask"
  :default-tab="['css','result']"
  :theme="dark"/>

In this article, we are redoing the same shapes using the new `shape()` function, which I think will become my favorite CSS feature.

::: note

At the time of writing, only Chrome, Edge, and Safari have the full support of the features we will be using.

:::

---

## What is `shape()`?

You are probably familiar with`clip-path: polygon()`, right? A function that allows you to specify different points, draw straight lines between them and create various CSS shapes (I invite you to check[<VPIcon icon="fas fa-globe"/>my online collection of CSS shapes](https://css-shape.com/)to see some of them). I said “straight lines” because when it comes to curves,`clip-path`is very limited. We have`circle()`and`ellipse()`, but we cannot achieve complex shapes with them.

`shape()`is the new value that overcomes such limitation. In addition to straight lines, it allows us to draw curves. But If you check the[<VPIcon icon="fa-brands fa-firefox"/>MDN page](https://developer.mozilla.org/en-US/docs/Web/CSS/basic-shape/shape)or[<VPIcon icon="fas fa-globe"/>the specification](https://drafts.csswg.org/css-shapes-2/#shape-function), you can see that the syntax is a bit complex and not easy to grasp. It’s very similar to SVG path, which is good as it gives us a lot of options and flexibility, but it requires a lot of practice to get used to it.

I will not write a boring tutorial explaining the syntax and all the possible values, but rather focus on one command per article. In this article, we will study the`arc`command, and the next article will be about the`curve`command. And, of course, we are going to draw cool shapes. Otherwise it’s no fun!

---

## The `arc` Command

This command allows you to draw an elliptic arc between two points but I will only consider the particular case of a circle which is easier and the one you will need the most. Let’s start with some geometry to understand how it works.

If you have two points (A and B) and a radius, there are exactly two circles with the given radius that intersect with the points. The intersection of both circles gives us 4 possible arcs between A and B that we can identify with a size (small or large) and a direction (clockwise or counter-clockwise)

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/05/cxmPje61.png?resize=869%2C379&ssl=1)

The code will look like the below:

```css
clip-path: shape(from Xa Ya, arc to Xb Yb of R [large or small] [cw or ccw])
```

The first command of a shape is always a`from`to give the starting point, and then we use the`arc`to define the ending point, the radius, the size, and the direction.

Here is a demo to illustrate the different values:

<CodePen
  user="t_afif"
  slug-hash="gbbKPPP"
  title="Overview of the arc command"
  :default-tab="['css','result']"
  :theme="dark"/>

The points and the radii are the same. I am only changing the size and direction to choose one of the four possibilities. It should be noted that the size and direction aren’t mandatory. The defaults are`small`and`ccw`.

That’s all: we have what we need to draw flower shapes!

---

## [](#creating-the-flower-shape)Creating The Flower Shape

I will start with a figure from the previous article.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/05/fRZEXPDg.png?resize=775%2C338&ssl=1)

Using the mask method, we had to draw a big circle at the center and small circles placed around it. Using`shape()`, we need to draw the arcs of the small circles. The starting and ending points of each arc are placed where the circles touch each other.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/05/GI44EdNN.png?resize=491%2C294&ssl=1)

The code will look as follows:

```css
.flower { 
  clip-path: shape(from X0 Y0, 
     arc to X1 Y1 of R,
     arc to X2 Y2 of R,
     arc to X3 Y3 of R,
     arc to X4 Y4 of R,
     ...
     arc to Xn Yn of R
  )
}
```

And like I did with the mask method, I will rely on Sass to create a loop.

```scss
$n: 10;

.flower {
  $m: ();
  $m: append($m,from X0 Y0,comma);
  @for $i from 1 through $n {
    $m: append($m,arc to Xi Yi of R,comma);
  } 
  clip-path: shape(#{$m});
}
```

Now we need to identify the radius of the small circles (R) and the position of the different points (Xi, Yi). I already did the calculation of the radius in the previous article, so I will reuse the same value:

```scss
R = 50%/(1 + 1/math.sin(180deg/$n))
```

For the points, they are placed around the same circle so their coordinate can be written like below:

```scss
Xi = 50% + D*math.cos($i*360deg/$n)
Yi = 50% + D*math.sin($i*360deg/$n)
```

Here is a figure to illustrate the distance D and the radius R:

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/05/MeAjhk0c.png?resize=438%2C289&ssl=1)

I know you don’t want a boring geometry course so here is the value of D.

```scss
D = 50%/(math.tan(180deg/$n) + 1/math.cos(180deg/$n))
```

And the final code will be:

```scss
$n: 10;

.flower {
  $m: ();
  $r: 50%/(1 + 1/math.sin(180deg/$n));
  $d: 50%/(math.tan(180deg/$n) + 1/math.cos(180deg/$n));
  $m: append($m,from 
    50% + $d*math.cos(0) 
    50% + $d*math.sin(0),comma);
  @for $i from 1 through $n {
    $m: append($m,arc to 
      50% + $d*math.cos($i*360deg/$n)
      50% + $d*math.sin($i*360deg/$n)
      of $r,comma);
  } 
  clip-path: shape(#{$m});  
}
```

<CodePen
  user="t_afif"
  slug-hash="gbbKWZj"
  title="Flower shape using shape()"
  :default-tab="['css','result']"
  :theme="dark"/>

*Wait, we get the inverted shape instead? Why is that?*

We didn’t define the size and the direction of the arcs so by default the browser will use`small`and`ccw`. This gives us the inverted version of the flower. If you try the 4 different combinations (including the default one) you will get the following:

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/05/F6iWJIUP.png?resize=926%2C344&ssl=1)

`small ccw`and`large cw`give us the shape we are looking for. The`small cw`is an interesting variation, and the`large ccw`is a funny one. We can consider a CSS variable to easily control which shape we want to get.

<CodePen
  user="t_afif"
  slug-hash="vEErZEr"
  title="Adding CSS variable"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Combining Both Shapes

Now, what about the shape below?

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/05/0cXX5vtA.png?resize=648%2C399&ssl=1)

The idea is to use the same code and alternate between two arc configurations.

```scss :collapsed-lines
$n: 10;

.flower {
  $m: ();
  $r: 50%/(1 + 1/math.sin(180deg/$n));
  $d: 50%/(math.tan(180deg/$n) + 1/math.cos(180deg/$n));
  $m: append($m,from 
    50% + $d*math.cos(0) 
    50% + $d*math.sin(0),comma);
  @for $i from 1 through $n {
    $c:small ccw;
    @if $i % 2 == 0 {$c:large cw}
    $m: append($m,arc to 
      50% + $d*math.cos($i*360deg/$n)
      50% + $d*math.sin($i*360deg/$n)
      of $r $c,comma);
  } 
  clip-path: shape(#{$m});  
}
```

I introduced a new variable`$c`within the loop that will have the value`small ccw`when`$i`is odd and`large cw`otherwise.

<CodePen
  user="t_afif"
  slug-hash="pvvKwgj"
  title="Wavy flower shape using shape()"
  :default-tab="['css','result']"
  :theme="dark"/>

Cool right? The compiled code will look like the below:

```plaintext
clip-path:
  shape(from X0 Y0,   
     arc to X1 Y1 of R small ccw,  
     arc to X2 Y2 of R large cw,  
     arc to X3 Y3 of R small ccw,  
     arc to X4 Y4 of R large cw,  
     ...  
  )
```

The first arc will use the inner curve (`small ccw`), the next one the outer curve (`large cw`) and so on. We repeat this to get our wavy-flower shape!

---

## Optimizing The Code

We made a generic code that allow us to get any shape variation by simply controlling the size/direction of the arcs, but for each particular case, we can have a more simplified code.

For the inverted variation (`small ccw`), the value of`D`can be replaced by`50%`. This will simplify the formula and also increase the area covered by the shape. We also need to update the value of the radius.

```scss
$n: 10;

.flower {
  $m: ();
  $r: 50%*math.tan(180deg/$n);
  $m: append($m,from 
    50% + 50%*math.cos(0) 
    50% + 50%*math.sin(0),comma);
  @for $i from 1 through $n {
    $m: append($m,arc to 
      50% + 50%*math.cos($i*360deg/$n)
      50% + 50%*math.sin($i*360deg/$n)
      of $r,comma);
  } 
  clip-path: shape(#{$m});  
}
```

<CodePen
  user="t_afif"
  slug-hash="wBBXeoL"
  title="Optimizing the code"
  :default-tab="['css','result']"
  :theme="dark"/>

We can do the same for the main shape, but this time we can simplify the value of the radius and use`1%`.

```scss
$n: 10;

.flower {
  $m: ();
  $d: 50%/(math.cos(180deg/$n)*(1 + math.tan(180deg/$n)));
  $m: append($m,from 
    50% + $d*math.cos(0) 
    50% + $d*math.sin(0),comma);
  @for $i from 1 through $n {
    $m: append($m,arc to 
      50% + $d*math.cos($i*360deg/$n)
      50% + $d*math.sin($i*360deg/$n)
      of 1% cw,comma);
  } 
  clip-path: shape(#{$m});  
}
```

<CodePen
  user="t_afif"
  slug-hash="yyyEXbJ"
  title="Optimizing the code"
  :default-tab="['css','result']"
  :theme="dark"/>

This one is interesting because using`1%`as a radius is kind of strange and not intuitive. In the explanation of the arc command, I said that we have exactly two circles with the given radius that intersect with the two points, but what if the radius is smaller than half the distance between the points? No circles can meet that condition.

This case falls into an error handling where the browser will scale the radius until we can have at least one circle that meets the conditions (yes, it’s defined within[<VPIcon icon="fas fa-globe"/>the specification](https://drafts.csswg.org/css-shapes-2/#typedef-shape-arc-command)). That circle will simply have its radius equal to half the distance between both points. It also means we only have two arcs with the same size (`small`and`large`will be equal)

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/05/Bd23aq9Z.png?resize=699%2C397&ssl=1)

In other words, if you specify a small radius (like`1%`), you are telling the browser to find the radius value for you (a lazy but clever move!). This trick won’t work in all the situations but can be handy in many of them so don’t forget about it.

---

## Conclusion

We are done with this first article! You should have a good overview of the arc command and how to use it. I only studied the particular case of drawing circular arcs but once you get used to this you can move to the elliptic ones even if I think you will rarely need them.

Let’s end with a last demo of a heart shape, where I am using the arc command. Can you figure out how to do it before checking my code?

<CodePen
  user="t_afif"
  slug-hash="LEEbdrw"
  title="Heart shape using shape()"
  :default-tab="['css','result']"
  :theme="dark"/>

And don’t forget to bookmark[<VPIcon icon="fas fa-globe"/>my online generators](https://css-generators.com/)from where you can get the code of the flower shapes and more!

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

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Creating Flower Shapes using clip-path: shape()",
  "desc": "Use the `arc` command within the `shape()` function we can draw a line that follows a circle from one point to the next, controlling the direction.",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/creating-flower-shapes-using-clip-path-shape.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
