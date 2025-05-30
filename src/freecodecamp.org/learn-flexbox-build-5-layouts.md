---
lang: en-US
title: "Learn CSS Flexbox by Building 5 Responsive Layouts"
description: "Article(s) > Learn CSS Flexbox by Building 5 Responsive Layouts"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Learn CSS Flexbox by Building 5 Responsive Layouts"
    - property: og:description
      content: "Learn CSS Flexbox by Building 5 Responsive Layouts"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/learn-flexbox-build-5-layouts.html
prev: /programming/css/articles/README.md
date: 2021-03-30
isOriginal: false
author: Joy Shaheb
cover: https://freecodecamp.org/news/content/images/2021/03/FCC--4-.png
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
  name="Learn CSS Flexbox by Building 5 Responsive Layouts"
  desc="Here's a practical guide to help you learn CSS Flexbox in 2021 by building 5 responsive layouts. Let's dive right in.🥇 Table of Contents Flexbox Architecture Setup Level-1 Level-2 Level-3 Level-4 Level-5 Conclusion You can check out the Figma desi..."
  url="https://freecodecamp.org/news/learn-flexbox-build-5-layouts"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2021/03/FCC--4-.png"/>

Here's a practical guide to help you learn CSS Flexbox in 2021 by building 5 responsive layouts. Let's dive right in.🥇

::: info

You can [**<FontIcon icon="iconfont icon-figma"/>check out the Figma design here**](https://figma.com/file/d1bG4msAzxixv9jWP8e4nA/Master-CSS-Flexbox-Layout?node-id=0%3A1)

You can also watch this tutorial on my YouTube channel here:

<VidStack src="youtube/m8BSEUUB5so" />

:::

---

## What is Flexbox?

![](https://freecodecamp.org/news/content/images/2021/03/Desktop---1--6--1.png)

We need a blueprint when constructing a house. In the same way, we need a blueprint to **layout** our **content across our browser.** At the same time, we need to make **responsive layouts** for **various screen sizes.**

This is what **Flexbox** helps us do – create responsive layouts.

### Flexbox Architecture

So how does Flexbox architecture work? The `flex-items` \[Contents\] are distributed along the **Main Axis** and **Cross Axis.** And, depending on the `flex-direction` property, the layout position changes between rows and columns.

![Flex Box Architecture](https://dev-to-uploads.s3.amazonaws.com/i/hy2oqjvsbk60ef92nktg.png)

### Flexbox Chart

This chart contains **every possible property and value** you can use when using flexbox. You can reference it while doing the project and experimenting with different values.

![Flex Box Chart](https://dev-to-uploads.s3.amazonaws.com/i/gv3jyh4xt4fbwtq1qejn.png)

---

## Before We Get Started...

![Image](https://freecodecamp.org/news/content/images/2021/03/Desktop---2--1-.png)

You need to know **a little bit of HTML** and **CSS**. Throughout this tutorial, you'll learn how Flexbox works, how its various properties and values work, and how media queries work (which help us make responsive websites).

![Project Setup](https://freecodecamp.org/news/content/images/2021/03/Frame-2--2-.png)

Before coding, we need to save some values in variables and clear the default browser styles. Along with that, we will define some media query mixins to save time and avoid code repetition.

:::

![SCSS](https://freecodecamp.org/news/content/images/2021/03/Frame-3--3-.png)

**SCSS** is a preprocessor of CSS which gives us much more functionality than regular CSS.

For example, we can nest child classes inside their parent class, store values in variables, and much more. It really helps us save time.

Let's start playing around with SCSS. Open [<FontIcon icon="fa-brands fa-codepen"/>CodePen](https://codepen.io/) or any code editor and go through this with me, these step by step.👇

### How to Enable SCSS in Codepen 👇

![SCSS](https://media.giphy.com/media/AkEzX8BD8Ef23fyGXP/giphy.gif)

First, define the border color, gap, and padding values in your variables.

```scss title="style.scss"
$gap: 4vh;
$padding: 4vh;
$color: #48CAE4;
```

Next, define various screen breakpoints in the SCSS map. **Remember,** on our SCSS map, \[mobile, tablet, and desktop\] are **keys** and the pixels are **values**.

```scss title="style.scss"
$bp: (
  mobile: 480px,
  tablet: 768px,
  desktop: 1440px,
);
```

To save time and code, when defining media queries we'll use **mixins and loop** the breakpoints we defined above. 👆

```scss title="style.scss"
@mixin query($display) {
  @each $key, $value in $bp {

    //  defining max-width
    @if ($display == $key) {
      @media (max-width: $value) {@content;}
    }
  }
}
```

Now we have to **change the default styles of our browser**. We remove the margin and padding and set the box-sizing to border-box.

```scss title="style.scss"
/* Changing The Default Settings.. */
* {
  margin:0px;
  padding: 0px;
  box-sizing: border-box;

  /* Changing the body here */
  body{
    width: 100%;
    min-height: 100vh;
    font-family: sans-serif;
    font-size: 45px;
  }
}
```

Let's talk about the relationship between the HTML classes we're going to use. Always remember that Flexbox works on child classes.

For example, Flexbox properties defined on the **Container class** work on **Block**, and properties defined on the **Block class** work on the **Box class**. Here's an illustrated explanation of what I mean: 👇

![FLOW](https://dev-to-uploads.s3.amazonaws.com/i/ivmqdkg948wclyfs1n0t.png)

Now let's create these layouts. We'll start with an easier difficulty level and move to more advanced layouts.

### Layout Difficulty Level-1 – How to Build a Card Layout

![Level-1](https://dev-to-uploads.s3.amazonaws.com/i/yjx1adsec062quujq7ke.png)

The **container class** will hold 3 children -> block-1, block-2, and block-3. The **block-1** class will carry 3 boxes -> box-1, box-2, and box-3. The same rules apply for the **block-2 and block-3** classes, but the values will be changed.

```html title="index.html"
<div class="container">
  <!-- block-1 has 3 children, box-1,box-2,box-3 -->
  <div class="block-1">
    <div class="box-1"> A </div>
    <div class="box-2"> B </div>
    <div class="box-3"> C </div>
  </div>
  <!-- similar to block-1, values are changed -->
  <div class="block-2">
    <div class="box-4"> D </div>
    <div class="box-5"> E </div>
    <div class="box-6"> F </div>
  </div>
  <!-- similar to block-1, values are changed -->
  <div class="block-3">
    <div class="box-7"> G </div>
    <div class="box-8"> H </div>
    <div class="box-9"> I </div>
  </div>
</div>
```

Now, we're going to style our container class. Remember, to trigger Flexbox and access all its powers, you need to write `display: flex;` like this:

```scss title="style.scss"
/* Style rules for container class */
.container {
  display: flex;
  /* to lay .block-* classes in a column */
  flex-direction: column;
  /* Setting gap between the .block-* classes */
  gap: $gap;
  // to set some padding & border inside
  padding: $padding;
  border: 1vh solid $color;
}
```

Select all the `.block-*` classes and style them together. At the same time, at the bottom, we will define our media query using the **mixin** we created during the setup phase.

```scss title="style.scss"
[class ^="block-"] {
  /* To lay the boxes in a row. */
  display: flex;
  flex-direction: row;
  /* 
   * Removing border(1vh+1vh), gap, & padding from the height
   * And then equally distributing spaces between the 
   * .block-* classes by dividing it by 3 
   */
  height: (100vh-2vh -$gap*2-$padding*2) / 3;

  /* putting gap between .box-* classes */
  gap: $gap;

  /* Style rules for mobile display */
  @include query (mobile) {
    flex-direction: column;
    /* you can pick any value you wish. */
    height: 500px;
  }
}
```

Alright then, next select all the `.box-*` classes and style them together like this:

```scss title="style.scss"
[class ^="box-"] {
  /* To set the text at center of every box */
  display: flex;
  justify-content: center;
  align-items: center;
  /*
   * To divide spaces among the boxes
   * try flex-gap:1; you can see the difference.
   * flex-grow: 1; // 1+1+1 =3 => 1/3 X 100% => 33.33% each
   */
  flex-basis: (100%)/3; /* 33.33% each */
  border: 2px solid black;
  border-radius: 10px;
  background-color: #c1c1c1;
}
```

### Layout Difficulty Level-2 – How to Build a Nav Bar Layout

![Level-2](https://dev-to-uploads.s3.amazonaws.com/i/dhkcw4npzbmp34lcm4yf.png)

Remove the HTML code of level-1 and write this code instead. Basically it's **1 parent class with 4 child classes.**

```html title="index.html"
<div class="container">
  <div class="item-1"> Home </div>
  <div class="item-2"> About </div>
  <div class="item-3"> Services </div>
  <div class="item-4"> Contact </div>
</div>
```

Here are the style rules for the **container class** for level-2. At the bottom, we will set up a media query using the mixin.

```scss title="style.scss"
.container {
  font-size: 35px;
  display: flex;

  /* To set orientation of the items */
  flex-direction: row;

  /*  To distribute available space */
  justify-content: space-evenly;
  padding: $padding;
  border: 1vh solid $color;

  /*  style rules starts from Tablet Screens */
  @include query(tablet) {
    height: 100vh;
    /* Changing orientation of the items */
    flex-direction: column;
    align-items: center;

    /* Setting gap for items Vertically */
    gap: $gap 
  }
}
```

### Layout Difficulty Level-3 – How to Build a Sidebar Layout

![Level-3](https://dev-to-uploads.s3.amazonaws.com/i/evaqt7tcdldtu7g3f9io.png)

Now, we'll work with this code block:

```html title="index.html"
<div class="container">
  <div class="block-1"> Left </div>
  <div class="block-2"> Right </div>
</div>
```

The Style rules of the **container class** with the media query mixin are included at the bottom for level-3:

```scss title="style.scss"
.container{
  display: flex;
  flex-direction: row;
  gap: $gap;
  padding: $padding;

  /* Style Rules for Mobile Display */
  @include query(mobile) {
    flex-direction: column;
  }
}
```

Here, we select and style all **`.block-*` classes** along with the media query for mobile display:

```scss title="style.scss"
[class ^="block-"] {
  /* To put the left, right text at center */
  display: flex;
  justify-content: center;
  align-items: center;
  
  border: 4px solid $color;
  /* Setting height of each block */
  height: 100vh -$padding*2;

  /* Style Rules for Mobile Display */
  @include query(mobile) {
    height: 50vh -$padding*2;
  }
}
```

Now we individually target the block-1 and block-2 classes. We also change the flex-grow value in order to distribute screen space.

```scss title="style.scss"
/* Style Rules Left Block */
.block-1 {
  /* will occupy 20% of the Available width */
  flex-grow: 2;
}
/* Style Rules Right Block */
.block-2 {
  /* will occupy 80% of the Available width */
  flex-grow: 8;
}
```

### Layout Difficulty Level-4 – How to Build a Card Layout #2

![Level-4](https://dev-to-uploads.s3.amazonaws.com/i/6bwmcadjacdyh5fobk1d.png)

The HTML rules here are similar to level-1 with a few changes:

```html title="index.html"
<div class="container">
  <div class="block-1">
    <div class="box-1"> A </div>
  </div>
  <div class="block-2">
    <div class="box-2"> B </div>
    <div class="box-3"> E </div>
  </div>
  <div class="block-3">
    <div class="box-4"> C </div>
    <div class="box-5"> D </div>
  </div>
</div>
```

Style the container class like this:

```scss title="style.scss"
.container {
  display: flex;
  flex-direction: column;
  padding: $padding;
  gap: $gap;
}
```

Next, select and style all the **`block-*` classes** together along with the media query mixin at the bottom for mobile devices:

```scss title="style.scss"
[class ^="block-"] {
  display: flex;
  flex-direction: row;
  gap: $gap;

  /* Removing Padding, Gap & divide by 3 */
  height: (100vh -$gap*2 -$padding*2)/3;

  /* Style Rules for Mobile Version   */
  @include query(mobile) {
    flex-direction: column;
  }
}
```

Now select and style all the **`box-*` classes** together:

```scss title="style.scss"
[class ^="box-"] {
  /* To place the letter at center */
  display: flex;
  justify-content: center;
  align-items: center;

  /* Border, Border-radius & background-color */
  border: 1vh solid $color;
  border-radius: 10px;
  background-color: #c1c1c1;
}
```

Now, we'll individually target the boxes and **use flex-basis to distribute screen space.**

```scss title="style.scss"
/* A */
.box-1 {
  flex-basis: 100%;
}

/* B & D */
.box-2, .box-5 {
  flex-basis: 70%;
}
/* E  & C */
.box-3,.box-4 {
  flex-basis: 30%
}
```

Finally, we will include the media query mixin for the mobile version.

```scss title="style.scss"
/* Style Rules for Mobile Version */
@include query(mobile) {
  .block-2 {
    height: (100vh*2)/3; /* 66.66vh */
  }
  .block-3 {
    flex-direction: row;
  }

  /* Selecting B, E, C, D */
  .box-2,.box-3,.box-4,.box-5 {
    flex-basis: 50%;
  }
}
```

### Layout Difficulty Level-5 – The Holy Grail of Layouts

![Level-5](https://dev-to-uploads.s3.amazonaws.com/i/8lb4gh8povgvcb40iz0h.png)

The HTML rules here are similar to **level-1** and **level-4** with a few changes:

```html title="index.html"
<div class="container">
  <div class="block-1">
    <div class="box-1"> A </div>
  </div>

  <div class="block-2">
    <div class="box-2"> B </div>
    <div class="box-3"> C </div>
    <div class="box-4"> D </div>
  </div>

  <div class="block-3">
    <div class="box-5"> E </div>
  </div>
</div>
```

First, change the **container class styles** like this:

```scss title="style.scss"
.container {
  display: flex;
  flex-direction: column;
  gap: $gap;
  padding: $padding;
}
```

Then, target and style all **`block-*` classes** together.

```scss title="style.scss"
/* Style rules of all .block-* */
[class ^="block-"] {
  display: flex;
  flex-direction: row;
  gap: $gap;
}
```

Next, target and style all **`box-*` classes** together.

```scss title="style.scss"
/* Style rules of all .box-* */
[class ^="box-"] {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1vh solid $color;
  border-radius: 10px;
}
```

Then individually target the boxes and **use `flex-basis` to distribute screen space.**

```scss title="style.scss"
/* Defining A & E Together */
.box-1,.box-5 {
  flex-basis: 100%;
  height: 20vh;
}

/* Defining C here */
.box-3 {
  flex-basis: 60%;
  /* Removing Gap & padding */
  height: 60vh -$gap*2-$padding*2;
}

/* Defining B & D Together */
.box-2,.box-4 {
  flex-basis: 20%;
}
```

Lastly, include the media query mixin for the mobile version. Notice that we are **hiding box-2** for the mobile version.

```scss title="style.scss"
/* Media query for mobile Screen */
@include query(mobile) {
  .block-2 {
    flex-direction: column;
    height: 60vh;
  }
  /* Hiding our B block */
  .box-2 {
    display: none;
  }
  /* Increasing Height of C   */
  .box-3 {
    flex-basis: 80%;
  }
}
```

---

## Conclusion

Thanks for following along! Hopefully now you understand the basics of Flexbox. Here's your medal for reading till the end. ❤️

Suggestions and criticisms are highly appreciated ❤️ Do get in touch with me via the social media links below if you have any questions.

![](https://dev-to-uploads.s3.amazonaws.com/i/usxsz1lstuwry3jlly4d.png)

::: info Joy Shaheb

- [Youtube (<FontIcon icon="fa-brands fa-youtube"/>`JoyShaheb`)](https://youtube.com/@JoyShaheb)
- [Twitter (<FontIcon icon="fa-brands fa-x-twitter"/>`JoyShaheb`)](https://x.com/JoyShaheb)
- [Instagram (<FontIcon icon="fa-brands fa-instagram"/>`joyshaheb`)](https://instagram.com/joyshaheb/)
- [<FontIcon icon="fas fa-globe"/>More layout Designs here](https://csslayout.io/patterns/)

:::

::: details Image Credits

<SiteInfo
  name="50 free icons of Kitty avatars designed by Freepik"
  desc="Download now Kitty avatars Free Icons - Pack Lineal color | Available sources SVG, EPS, PSD, PNG files. Personal and Commercial use. #flaticon #icons #breed #pet #kitty"
  url="https://flaticon.com/packs/kitty-avatars-3/"
  logo="https://media.flaticon.com/dist/min/img/favicon.ico"
  preview="https://cdn-share-sprites.flaticon.com/pack/0/763/763740-kitty-avatars_facebook.jpg"/>

<SiteInfo
  name="Free Vector | Cute cats set of funny character cartoon illustration"
  desc="Download this Free Vector about Cute cats set of funny character cartoon illustration, and discover more than 15 Million Professional Graphic Resources on Freepik"
  url="https://freepik.com/free-vector/cute-cats-set-funny-character-cartoon-illustration_12566246.htm/"
  logo="https://fps.cdnpk.net/favicons/favicon-96x96.png"
  preview="https://img.freepik.com/free-vector/cute-cats-set-funny-character-cartoon-illustration_56104-441.jpg"/>

<SiteInfo
  name="Free Vector | Set of cute rabbit with duck  cartoon illustration"
  desc="Download this Free Vector about Set of cute rabbit with duck  cartoon illustration, and discover more than 15 Million Professional Graphic Resources on Freepik"
  url="https://freepik.com/free-vector/set-cute-rabbit-with-duck-cartoon-illustration_12573651.htm/"
  logo="https://fps.cdnpk.net/favicons/favicon-96x96.png"
  preview="https://img.freepik.com/free-vector/set-cute-rabbit-with-duck-cartoon-illustration_56104-475.jpg"/>

<SiteInfo
  name="Free Vector | Cute Bear character cartoon illustration"
  desc="Download this Free Vector about Cute Bear character cartoon illustration, and discover more than 15 Million Professional Graphic Resources on Freepik"
  url="https://freepik.com/free-vector/cute-bear-character-cartoon-illustration_12341164.htm/"
  logo="https://fps.cdnpk.net/favicons/favicon-96x96.png"
  preview="https://img.freepik.com/free-vector/cute-bear-character-cartoon-illustration_56104-431.jpg"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Learn CSS Flexbox by Building 5 Responsive Layouts",
  "desc": "Here's a practical guide to help you learn CSS Flexbox in 2021 by building 5 responsive layouts. Let's dive right in.🥇 Table of Contents Flexbox Architecture Setup Level-1 Level-2 Level-3 Level-4 Level-5 Conclusion You can check out the Figma desi...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/learn-flexbox-build-5-layouts.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
