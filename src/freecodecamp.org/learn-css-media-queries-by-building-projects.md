---
lang: en-US
title: "Learn CSS Media Queries by Building Three Projects"
description: "Article(s) > Learn CSS Media Queries by Building Three Projects"
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
      content: "Article(s) > Learn CSS Media Queries by Building Three Projects"
    - property: og:description
      content: "Learn CSS Media Queries by Building Three Projects"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/learn-css-media-queries-by-building-projects.html
prev: /programming/cs/articles/README.md
date: 2021-04-27
isOriginal: false
author: Joy Shaheb
cover: https://freecodecamp.org/news/content/images/2021/04/FCC-Thumbnail.png
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
  name="Learn CSS Media Queries by Building Three Projects"
  desc="Today we're going to learn how to use CSS Media Queries to build responsive websites. And we'll practice what we learn by completing three projects. Let's go 🏅 Table of Contents What are CSS Media Queries? Steps to follow The Syntax Practice Projec..."
  url="https://freecodecamp.org/news/learn-css-media-queries-by-building-projects"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2021/04/FCC-Thumbnail.png"/>

Today we're going to learn how to use CSS Media Queries to build responsive websites. And we'll practice what we learn by completing three projects. Let's go 🏅

![Topics to discuss at a glance](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/7vrrjohwnmdvbtexg1r2.png)

You can watch this tutorial on YouTube as well if you like:

<VidStack src="youtube/HY8q4TD3KGM" />

---

## What are CSS Media Queries?

![](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/kyjadc0b95rjuzjlcgck.png)

CSS Media Queries allow you to create responsive websites across all screen sizes, ranging from desktop to mobile. So you can see why it's important to learn this topic.

![Here's a demo of the magic of Media Queries](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/bb0qwxrhg0705lvs6ihs.png)

We'll build this in project 2 below. This layout is called the **Card Layout**. You can see more Layout Examples [<FontIcon icon="fas fa-globe"/>here!](https://csslayout.io/patterns/)

---

## How to Set Up the Project

![](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/9wa8xgu2o74y2d60cq3g.png)

For this project, you need to know little bit of HTML, CSS, and how to work with VS code. Follow along with me ->

1. Create a folder named "Project-1"
2. Open VS Code
3. Create <FontIcon icon="fa-brands fa-html5"/>`index.html`, <FontIcon icon="fa-brands fa-css3-alt"/>`style.scss`, and <FontIcon icon="fa-brands fa-js"/><FontIcon icon="fa-brands fa-js"/>`main.js` files
4. Install Live Server and SASS Compiler
5. Run Live Server and SASS Compiler

---

## HTML

In HTML, write this code inside the body tag 👇

```html title="index.html"
<div class = "container"></div>
```

We also need to see the exact size of our window.

![Here's a demo of what I mean](https://media.giphy.com/media/06zg3tXmCsfA6hX5zo/giphy.gif)

So, write this line inside the html file:

```html title="index.html"
<div id="size"></div>
```

---

## What is SCSS?

We'll Use SCSS, not CSS. But..... what is SCSS?

![](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/q5a3hp7070ls26dovja2.png)

SCSS is a pre-processor of CSS which is more powerful than regular CSS. Using SCSS we can ->

1. Nest our selectors like a branch of a tree and better manage our code.
2. Store various values into variables
3. Use Mixins to stop code repetition and save time

And much more!

In our SCSS, we'll remove our default browser settings, and we'll change box-sizing, font-size, and font-family like this: 👇

```scss title="style.scss"
* {
  margin : 0px;
  padding : 0px;
  box-sizing : border-box; 

  body {
    font-size : 35px;
    font-family : sans-serif;
  }
}
```

**Don't forget** to set the `height` of the `.container` class. Otherwise we'll fail to achieve our desired results:

```scss title="style.scss"
.container {
  height : 100vh;
}
```

Remember the additional id we wrote in HTML? We'll style it and position it in our browser here:

```scss title="style.scss"
#size {
  position: absolute;

  /* positioning screen size below our main text */
  top : 60%;
  left: 50%;

  transform: translateX(-50%);

  color : red;
  font-size : 35px;
}
```

---

## JavaScript

We need to update our screen size inside our id every time we resize our window. So, write this code in your <FontIcon icon="fa-brands fa-js"/>`main.js` file:

```js title="main.js"
// 'screen' is name 👇 of a function
window.onresize = screen;
window.onload = screen;

// Function named 'screen' 👇

function screen() {
  Width = window.innerWidth;
  document.getElementById("size").innerHTML 
   = "Width : " + Width + " px" 
}
```

---

## Download the images for the project

![](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/u72rvfe5181640ikqa32.png)

Responsive website also means **Responsive Images**. So we're also going to make our images responsive in this project. The images are on my **[GitHub repository (<FontIcon icon="iconfont icon-github"/>`JoyShaheb/Project-image-repo`)](https://github.com/JoyShaheb/Project-image-repo/tree/main/Media-Query-Project)**. Here's how to get them:

1. Visit and copy the link above ☝️
2. Go to **[<FontIcon icon="fas fa-globe"/>downgit](https://minhaskamal.github.io/DownGit/#/home)** and paste the link you copied
3. Follow the steps in this video 👇

![Down Git Steps to follow](https://cloud.githubusercontent.com/assets/5456665/17822364/940bded8-6678-11e6-9603-b84d75bccec1.gif)

And.... we're all set! Let's start coding. 😊

![](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/u5qj78v41btdq7sewdzs.png)

---

## CSS Media Query Syntax

Here's the syntax of a Media Query:

```scss title="style.scss"
@media screen and (max-width: 768px) {
  .container{
   //Your code's here
  }
}
```

And here's an illustrated explanation ->

![The Syntax](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/e1wvg9w8co1hq3d24uxi.png)

Let's divide the syntax into four sections:

1. Media Query Declaration
2. The Media Type
3. `min-width` & `max-width` Functions
4. The Code itself

---

## To understand all 4 section of the syntax, let's start our **First Project**:

![](https://media.giphy.com/media/t4QOOfmnupAqnHcI9H/giphy.gif)

We'll build this. ☝️ It's a small project where the background-color changes on resizing the window by taking one small step at a time. Let's start!

### The HTML

Place the following code inside your HTML, like this:

```html title="index.html"
<div class = "container">
   <div class = "text">
      Hello Screen !
   </div>
</div>
```

### The SCSS

Now, we'll store four color codes inside variables like this:👇

```scss title="style.scss"
$color-1 : #cdb4db ; // Mobile
$color-2 : #fff1e6 ; // Tablet
$color-3 : #52b788 ; // Laptop
$color-4 : #bee1e6 ; // Desktop
```

You can find more colors at [<FontIcon icon="fas fa-globe"/>coolors.co](https://coolors.co/palettes/trending) if you want to choose your own.

Now, at the bottom, target the `.container` and `.text` classes. We'll also center our text like this👇

```scss title="style.scss"
.container {
  /* To place text at center */
  display : grid;
  place-items : center;

  background-color : $color-1;
  height : 100vh;
}

.text {
 // keep it blank for now
}
```

So far so good!

![](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/grc7r9mbpw7yvoisgj6c.png)

---

## 1. How to declare media queries

Media Queries start with the `@media` declaration. The main purpose of writing this is to **tell the browser** that we have specified a media query. In your CSS, write it like this:👇

```scss
@media
```

---

## 2. How to Set the Media Type

This is used to specify the nature of the device we're working with. The four values are:

- all
- print
- screen
- speech

![Here's the purpose of each of the values at a glance](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ea8yqchxnmdlqyq9es0m.png)

We declare the **media type** after the `@media` declaration, like this:

```scss
@media screen
```

---

## Why do we write the "and" operator?

![](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/t8qezvhk9m896ns97jta.png)

Let's say we're placing an order at a restaurant, "A burger `and` a pizza". Notice that the two orders are separated by `and`.

Likewise, the media type, min-width, and max-width functions are basically conditions we are giving to the browser. We don't write the `and` operator if we have one condition. Like this ->

```scss
@media screen {
  .container {
     // Your code here 
  }
}
```

We write the `and` operator if we have two conditions, like this:

```scss
@media screen and (max-width: 768px) {
  .container{
     // Your code here 
  }
}
```

You can also skip the media type and work with just min-width & max-width, like this:

```scss
/* Targeting screen sizes between 480px & 768px */
@media (min-width: 480px) and (max-width: 768px) {
  .container {
     /* Your code here */
  }
}
```

If you have three conditions or more, you can use a **comma**, like this:

```scss
/* Targeting screen sizes between 480px & 768px */
@media screen, (min-width: 480px) and (max-width: 768px) {
  .container {
     /* Your code here */
  }
}
```

---

## 3. How to Use the min-width & max-width Functions

Let's discuss the Most important component of a media query, screen breakpoints.

To be honest, there's no such thing as a standard screen break-point guide because there are so many screen sizes on the market. But, for our project, we'll follow [<FontIcon icon="fas fa-globe"/>The Official Bootstrap 5](https://getbootstrap.com/docs/5.0/layout/breakpoints/) screen break-point values. 

![Here they are](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/7pqqlkxksxgouje83vhw.png)

Here's a list of every device screen resolution on [<FontIcon icon="fas fa-globe"/>CSS-Tricks](https://css-tricks.com/snippets/css/media-queries-for-standard-devices/).

### The `max-width` function

Using this function, we are creating a boundary. This will work as long as we are **inside the boundary**. Here's a sample 

![Our Boundary is `500px`](https://media.giphy.com/media/50L0raPo5ZSdxCOlmP/giphy.gif)

Notice how the light purple color gets **Disabled** when we hit above 500px.

To recreate this, write this code in SCSS:

```scss title="style.scss"
.container {
  background-color: white ;
  height: 100vh;
  display: grid;
  place-items: center;
}
```

At the bottom, insert the media query like this 👇

```scss title="style.scss"
@media screen and (max-width: 500px) {
  .container {
    background-color: $color-1;
  }
}
```

### The `min-width` function

We are also creating a boundary here. But this will work if we go **outside the boundary**. Here's a sample: 👇

![Our boundary is `500px`](https://media.giphy.com/media/iThpfWPRTBSQXn2gpO/giphy.gif)

Notice how the light purple color gets **enabled** after we hit above 500px width.

To recreate this, write this code in SCSS:

```scss title="style.scss"
.container {
  background-color: white ;
  height: 100vh;
  display: grid;
  place-items: center;
}
```

At the bottom, insert the media query like this: 👇

```scss
@media screen and (min-width: 500px) {
   .container {
     background-color: $color-1;
   }
}
```

To sum it up, remember that:

![`max-width` sets styles inside the set boundary](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/227jg6drq6faqc47e2ox.png)

![`min-width` sets styles outside the set boundary](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/e8ds85udh6l20hdh6lbm.png)

---

## The code itself

Let's put our first project together!

We will have four screen breakpoints:

- Mobile -> 576px
- Tablet -> 768px
- Laptop -> 992px
- Desktop -> 1200px

Yes, we are following the official [<FontIcon icon="fas fa-globe"/>bootstrap 5](https://getbootstrap.com/docs/5.0/layout/breakpoints/) screen breakpoints.

![And each breakpoint will get these colors](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/d42pdgggmovcrsq8p61n.png)

For four device types, we will have four Media Queries. Before touching the media queries, first let's store the breakpoint values in variables, like this:

::: note

Don't forget to add the `$` sign

```scss title="style.scss"
$mobile  : 576px;
$tablet  : 768px;
$laptop  : 992px; 
$desktop : 1200px;
```

:::

And our `.container` class should look like this:

```scss title="style.scss"
.container {
  background-color: white ;
  height: 100vh;
  display: grid;
  place-items: center;
}
```

We're all 50% done! Now let's setup the four media queries.

---

## But Wait...

![](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/net2cuugxdaz9idwbwhl.png)

You need to follow the proper order while writing the media queries. Start writing from the **largest display to the smallest display.**

### First breakpoint for desktop – `1200px`

For the desktop screen, write this code in SCSS:👇

```scss title="style.scss"
/* using variable here which is  👇 1200px */
@media screen and (max-width: $desktop) {
  .container {
    background-color: $color-4;
  }
}
```

![And here's the result](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/w1cuuy0m4zw57sh9zdzf.png)

### Second breakpoint for laptop – `992px`

For laptop screens, write this code in SCSS: 👇

```scss title="style.scss"
/* using variable here which is  👇 992px */
@media screen and (max-width: $laptop) {
  .container {
    background-color: $color-3;
  }
}
```

![And here's the result](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/fng9y622xtb9pa6ngfwj.png)

### Third breakpoint for tablet – `768px`

For tablets screens, write this code in SCSS: 👇

```scss
/* using variable here which is  👇 768px */
@media screen and (max-width: $tablet) {
  .container {
    background-color: $color-2;
  }
}
```

![And here's the result](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/7wqp9xjt4gg272pc3hkt.png)

### Fourth breakpoint for mobile – `576px`

For mobile screens, write this code in SCSS: 👇

```scss title="style.scss"
// using variable here which is  👇 576px
@media screen and (max-width: $mobile) {
  .container {
    background-color: $color-1;
  }
}
```

![And here's the result](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/z10764qm7cjjc8a2yb7j.png)

---

## Let's build some projects using CSS Media Queries

### How to Build a Responsive Portfolio

We'll build a small responsive Website for our second project.

![Here's what the desktop view will look like](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ay01oqdseulalsw3gpdh.png)

![And here's the mobile view](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/hob05vxov52hrm5quz0a.png)

Okay then, let's start coding! First, let's work with the desktop view by taking small baby steps.

### Before we start

Create a folder named 'images' inside our Project-1 Folder. Place all the images you downloaded from my [GitHub Repository (<FontIcon icon="iconfont icon-github"/>`JoyShaheb/Project-image-repo`)](https://github.com/JoyShaheb/Project-image-repo/tree/main/Media-Query-Project) inside the images folder.

### The HTML

#### Step 1 – Create the sections

We'll create three sections for our website. Write this code in your HTML:

```html title="index.html"
<div class="container"> 
    <div class="header"></div>
    <div class="main"></div>
    <div class="footer"></div>
</div>
```

#### Step 2 – Logo and menu items

We'll place the logo and menu items inside the `.header` div, like this:

```html title="index.html"
<div class="header">
    <div class="header__logo">Miya Ruma</div>
    <div class="header__menu">
        <div class="header__menu-1"> Home </div>
        <div class="header__menu-2"> Portfolio </div>
        <div class="header__menu-3"> Contacts </div>
    </div>
</div>
```

#### Step 3 – Image and text

We'll place the image and text inside the `.main` div, like this:

```html title="index.html"
<div class="main">
    <div class="main__image"></div>
    <div class="main__text">
       <div class="main__text-1">Hello 👋</div>
       <div class="main__text-2">I'm <span>Miya Ruma</span></div>
       <div class="main__text-3">A Designer From</div>
       <div class="main__text-4">Tokyo, Japan</div>
    </div>
</div>
```

#### Step 4 – Social media icons

We'll place the social media icons inside the `.footer` div, like this:

```html
<div class="footer">
    <div class="footer__instagram">
        <img src="./images/instagram.png" alt="">
    </div>
    <div class="footer__twitter">
        <img src="./images/twitter-sign.png" alt="">
    </div>
    <div class="footer__dribbble">
        <img src="./images/dribbble-logo.png" alt="">
    </div>
    <div class="footer__behance">
        <img src="./images/behance.png" alt="">
    </div>
</div>
```

### The SCSS

![](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/8ou3jrlk5g9mjodfh88n.png)

#### Step 1 – Update the SCSS

Delete everything inside our SCSS and write this code instead:

```scss title="style.scss"
* {
  // placing Margin to left & right
  margin: 0px 5px;

  padding: 0px;
  box-sizing: border-box;

  body {
    font-family: sans-serif;
  }
}
```

![This is what we have so far](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/3egdxy9f5wf8xgc2ekn8.png)

#### Step 2 – Select all classes in HTML

Select all the classes we created in HTML on our stylesheet.

```scss title="style.scss"
.container { }
.header { }
.main { }
.footer { }
```

#### Step 3 – Select all children

Now select all the children of the parent classes.

```scss title="style.scss"
.header {
  &__logo { }
  &__menu { }
}
.main {
  &__image { }
  &__text { }
}
.footer {
  [class ^="footer__"]{ }
}
```

::: note 

`&__logo` nested inside `.header` is a shortcut of `.header__logo`.

:::

#### Step 4 – Define the .container

Define the `.container` for the desktop layout, like this:

```scss title="style.scss"
.container {
  /* Defining height */
  height: 100vh;
  display: flex;
  flex-direction: column;
}
```

Apply `display: flex;` to `.header` and to the menu items so that it behaves like a row, not a column:

```scss title="style.scss"
.header {
  display: flex;
  flex-direction: row;
  &__logo { }
  &__menu {
    display: flex;
    flex-direction: row;
  }
}
```

Divide each section and create borders to see what we are doing:

```scss title="style.scss"
.header {
  display: flex;
  /* The border & height */
  border: 2px solid red;
  height: 10%;
  /* Other selectors are here */
}
.main {
  /* The border & height */
  border: 2px solid black;
  height: 80%;
  /* Other selectors are here */
}
.footer {
  /* Border & height */
  border: 2px solid green;
  height: 10%;
  /* Other selectors are here */
}
```

![And here's the result](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/o77rk1bj2m722jf41mju.png)

#### Step 5 – Complete `.header` styling

Let's complete the styling of our `.header` section using flex-box properties and the appropriate font-size:

```scss title="style.scss"
.header {
  /* height */
  height: 10%;

  display: flex;
  /* Aligning logo & menu at center */
  align-items: center;

  /* space between logo & menu */
  justify-content: space-between;

  &__logo {
    font-size: 4vw;
  }

  &__menu {
    display: flex;
    font-size: 2.5vw;

  /* to put gap between menu items */
    gap: 15px;
  }
}
```

![And here's the result](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/kx4d43xmeggdaw2h2pdf.png)

#### Step 6 – Add the image

![](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/7tyojtcpe7o1o9mukum6.png)

Let's add the image inside `.main` section and create a partition for image and text.

```scss title="style.scss"
.main {
  /* image & text will act like a row */
  display: flex;
  flex-direction: row;

  /* The border & height */
  border: 2px solid black;
  height: 80%;

  &__image {
    /* Adding the image */
    background-image: url("./images/Portrait.png");
    /* will cover half of screen width */
    width: 50%;
  }

  &__text {
    /* will cover half of screen width */
    width: 50%;
  }
}
```

![The result is a bit ugly at the moment, but don't lose hope~](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/2q13at8wcniamqpwh7jv.png)

#### Step7 – Make the image responsive

Style the image to be responsive like this:

```scss title="style.scss"
.main {
  &__image {
    /* make image fluid */
    background-size: contain;

    /* stop image repetition */
    background-repeat: no-repeat;

    /* position the image */
    background-position: left center;
  }
}
```

![And here's what we have so far](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/24r955u9wwww9vdwwhk5.png)

The image is responsive all the way from **4k** to your **smart watch screen**. Don't believe me? Open chrome developer tools and test it yourself and see.

You can learn more about [Background Properties here](/freecodecamp.org/learn-css-background-properties.md) if you want to make responsive images for responsive websites.

![4k test](https://media.giphy.com/media/7Us5yEqyNW6IkOR1fs/giphy.gif)

#### Step 8 – Style the text

Let's style our text now. First, we'll bring it to the exact center with this code:

```scss title="style.scss"
.main {
  &__text {
    /* will cover half of screen width */
    width: 50%;
    display: flex;
    flex-direction: column;

    /* To bring it at the center */
    justify-content: center;
    align-items: center;
  }

  /* To color The name */
  span {
    color: red;
  }

}
```

Now, let's set font sizes for the text:

```scss title="style.scss"
.main {
  &__text {
    /* To add gaps between texts vertically */
    gap: 15px;

    /* font size for "hello" */
    &-1 {
      font-size: 10vw;
    }

    /* font size for other texts */
    &-2,&-3,&-4 {
      font-size: 5vw;
    }
  }
}
```

![The result looks like this](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/kne4bezy1ft0ro6ore0p.png)

At this point, you can remove all the borders we placed inside our header, main, and footer classes.

#### Step 9 – The footer section

First, resize the images like this:

```scss
.footer{
  [class^="footer__"] {
    img {
      width: 5.3vw;
    }
  }
}
```

Then, position the images to our desired place, with a small gap between the icons, like this:

```scss
.footer{
  display: flex;
  flex-direction: row;

// To align icons along x-axis
  align-items: center;
// placing image to the right side
  justify-content: flex-end;
// Gap between icons
  gap: 20px;

// margin to right side of icons 
  margin-right: 10%;
}
```

![And here's the result, without the guides](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/itzk2rwz621vjm1k833c.png)

#### Step 10 – The mobile layout

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/9w8h1owma15wmrzqb5cd.png)

Create a media query at the 650px mark and style the `.header` class like this:

```scss title="style.scss"
@media (max-width: 650px) {
  .header {
    /* To place logo at center */
    justify-content: center;
    &__logo {
      font-size: 40px;
    }
    /*hiding the menu on mobile device */
    &__menu {
      display: none;
    }
  }
}
```

#### Step 11 – Center .main

Now, place the .main section at the exact center with this code:

```scss title="style.scss"
@media (max-width: 650px) {
  /* styles of header section of step-10... */
  /* main section here  */
  .main {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
```

#### Step 12 – Style the image and text for mobile

Style the image and text for mobile layout like this:

```scss title="style.scss"
@media (max-width: 650px) {
  .main {
    &__image {
      /* Image size */
      height: 200px;
      width: 200px;
      background-size: 100%;
      /* To have rounded image */
      border-radius: 100%;
      background-position: center;
    }

    /* Styles for the text - */
    &__text {
      width: 100%;
      &-1 {
        display: none;
      }
      &-2, &-3, &-4 {
        font-size: 30px;
      }
    }
  }
}
```

### Step 13 – Style the footer for mobile

The last step is to style the footer section for the mobile layout:

```scss title="style.scss"
@media (max-width: 650px) {
  .footer {
    /* placing icons along the X-axis */
    justify-content: center;
    margin: 0px;
    [class^="footer__"] {
      /* Resizing images for mobile layout */
      img {
        width: 45px;
        height: 45px;
      }
    }
  }
}
```

![And here's our result](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/7dxzqtz8it2xhzpxf4ll.png)

---

## Project 3 – How to Build a Card Layout

![In project 3, we'll build this](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/tf2o5njarct4ew24dnqj.png)

So let's start.

### The SCSS

On your stylesheet, delete everything except the styles of `#size`. And then add this code there:

```scss title="style.scss"
* {
  margin: 0px;
  padding: 0px 10px;
  box-sizing: border-box;

  body {
    font-family: sans-serif;
    font-size: 55px;
  }
}

#size {
  position: absolute;
  /* Positioning the text */
  top: 60%;
  left: 50%;
  transform: translateX(-50%);
  /* color & size of text */
  color: red;
  font-size: 40px;
}
```

### The HTML

Your HTML should look like this inside the body tags: 👇

```html title="index.html"
<div class="container"> 
   <!-- We'll place code here --> 
</div>

<!-- This will show our window width Live --> 
<div id="size"></div>
```

Now, create three classes with class names `.row-*` like this 👇 inside `.container`:

```html title="index.html"
<div class="container"> 
   <div class="row-1"></div>
   <div class="row-2"></div>
   <div class="row-3"></div>
</div>
```

Each row will have three boxes with class names `.box-*` like this. 👇 And yes, you'll insert letters inside the boxes:

```html title="index.html"
<div class="container"> 
   <div class="row-1">
       <div class="box-1">A</div>
       <div class="box-2">B</div>
       <div class="box-3">C</div>
   </div>
   <div class="row-2">
       <div class="box-4">D</div>
       <div class="box-5">E</div>
       <div class="box-6">F</div>
   </div>
   <div class="row-3">
       <div class="box-7">G</div>
       <div class="box-8">H</div>
       <div class="box-9">I</div>
   </div>
</div>
```

![We're done with the HTML part, and the result should look like this](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/u3jg1iphmhefdpn8gy12.png)

### The SCSS

Follow these small baby steps one by one to style the project.

#### Step 1 – Add some SCSS code

To select and style all the boxes and rows together, this is what we write in our CSS: 👇

```scss title="style.scss"
.container {
  /* styles here */
}

[class ^="row-"] {
  /* Styles applied on all rows */
}

[class ^="box-"] {
  /* Styles applied on all boxes */
}
```

#### Step 2 – Make boxes behave like rows

Boxes should behave like a row. This code will make that happen:

```scss title="style.scss"
[class ^="row-"] {
  display: flex;
  flex-direction: row;
}
```

![And here's the result](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/4utfjrr1bfmwwh81rb1a.png)

#### Step 3 – Define the boxes

Expand the boxes across the width and height and place the letters at the center.

```scss title="style.scss"
[class ^="box-"] {
  background-color: #c4c4c4;
  border: 2px solid black;

  /* Defining the size of the boxes */
  width : (100%)/3;
  height: (100vh)/3;

  /* Place letter at the center */
  display: grid;
  place-items: center;
}
```

![Here's the result](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/g4m7snz4kklns6xjinzh.png)

#### Step 4 – Create gaps between rows

Next we'll create a gap between the rows, like this:

```scss title="style.scss"
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  /* Creating gap between rows */
  gap: 30px;
}
```

Now let's create a gap between the boxes:

```scss title="style.scss"
[class ^="row-"] {
  display: flex;
  flex-direction: row;
  /* Creating gap between boxes */
  gap : 30px;
}
```

![And here's what it looks like](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/xpus9dx40nxzysz9iceh.png)

#### Step 5 – Set up the mobile layout

Create the media query which will be applied at the 650px mark:

```scss title="style.scss"
@media (max-width: 650px){
  // We'll write code here
}
```

Change the orientation of the boxes on the mobile screen from row to column, and stretch the boxes to 100% of the width with this code:

```scss title="style.scss"
@media (max-width: 650px){

  /* Change orientation */
  [class ^="row-"] {
    flex-direction: column;
  }

  /* Change width of boxes */
  [class ^="box-"] {
    width: 100%;
  }
}
```

![And here's the final mobile result](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/pyis7sloasdv03lljhn9.png)

By the way, project 2 is a part of [this article](/freecodecamp.org/learn-flexbox-build-5-layouts.md) of mine. If you're interested to learn more and practice both your Flexbox and media query skills, then go for it!

---

## Conclusion

Here's your medal for reading all the way until the end ❤️

![Suggestions and criticisms are highly appreciated ❤️](https://dev-to-uploads.s3.amazonaws.com/i/usxsz1lstuwry3jlly4d.png)

::: info Joy Shaheb

- [Youtube (<FontIcon icon="fa-brands fa-youtube"/>`JoyShaheb`)](https://youtube.com/@JoyShaheb)
- [Twitter (<FontIcon icon="fa-brands fa-x-twitter"/>`JoyShaheb`)](https://x.com/JoyShaheb)
- [Instagram (<FontIcon icon="fa-brands fa-instagram"/>`joyshaheb`)](https://instagram.com/joyshaheb/)

:::

::: details Credits

<SiteInfo
  name="CSS Media Queries Guide | CSS-Tricks"
  desc="CSS Media queries are a way to target browser by certain characteristics, features, and user preferences, then apply styles based on those things."
  url="https://css-tricks.com/a-complete-guide-to-css-media-queries//"
  logo="https://i0.wp.com/css-tricks.com/wp-content/uploads/2021/07/star.png?fit=180%2C180&ssl=1"
  preview="https://css-tricks.com/wp-json/social-image-generator/v1/image/319964"/>

<SiteInfo
  name="Photo by Min An on Pexels"
  desc="Download this photo by Min An for free on Pexels"
  url="https://pexels.com/photo/woman-wearing-brown-bucket-cap-732425/"
  logo="https://pexels.com/assets/static/images/meta/pexels-icon.png"
  preview="https://images.pexels.com/photos/732425/pexels-photo-732425.jpeg?auto=compress&cs=tinysrgb&h=627&fit=crop&w=1200"/>

<SiteInfo
  name="Free Vector | Cute Panda Hug Boba Milk Tea Cartoon Icon Illustration. Animal Drink Icon Concept Premium. Flat Cartoon Style"
  desc="Download this Free Vector about Cute Panda Hug Boba Milk Tea Cartoon Icon Illustration. Animal Drink Icon Concept Premium. Flat Cartoon Style, and discover more than 15 Million Professional Graphic Resources on Freepik"
  url="https://freepik.com/free-vector/cute-panda-hug-boba-milk-tea-cartoon-icon-illustration-animal-drink-icon-concept-premium-flat-cartoon-style_12571361.htm/"
  logo="https://fps.cdnpk.net/favicons/favicon-96x96.png"
  preview="https://img.freepik.com/free-vector/cute-panda-hug-boba-milk-tea-cartoon-icon-illustration-animal-drink-icon-concept-premium-flat-cartoon-style_138676-2678.jpg"/>

<SiteInfo
  name="Free Vector | Kawaii fast food cute ice cream and cookie illustration "
  desc="Download this Free Vector about Kawaii fast food cute ice cream and cookie illustration , and discover more than 15 Million Professional Graphic Resources on Freepik"
  url="https://freepik.com/free-vector/kawaii-fast-food-cute-ice-cream-cookie-illustration_5769154.htm/"
  logo="https://fps.cdnpk.net/favicons/favicon-96x96.png"
  preview="https://img.freepik.com/free-vector/kawaii-fast-food-cute-ice-cream-cookie-illustration_24908-60632.jpg"/>

<SiteInfo
  name="Free Vector | Cute cats set of funny character cartoon illustration"
  desc="Download this Free Vector about Cute cats set of funny character cartoon illustration, and discover more than 15 Million Professional Graphic Resources on Freepik"
  url="https://freepik.com/free-vector/cute-cats-set-funny-character-cartoon-illustration_12566246.htm/"
  logo="https://fps.cdnpk.net/favicons/favicon-96x96.png"
  preview="https://img.freepik.com/free-vector/cute-cats-set-funny-character-cartoon-illustration_56104-441.jpg"/>

<SiteInfo
  name="Free Vector | Collection of kawaii bubble tea"
  desc="Download this Free Vector about Collection of kawaii bubble tea, and discover more than 15 Million Professional Graphic Resources on Freepik"
  url="https://freepik.com/free-vector/collection-kawaii-bubble-tea_10048123.htm/"
  logo="https://fps.cdnpk.net/favicons/favicon-96x96.png"
  preview="https://img.freepik.com/free-vector/collection-kawaii-bubble-tea_23-2148664331.jpg"/>

<SiteInfo
  name="50 free icons of Unicorn designed by Freepik"
  desc="Download now Unicorn Free Icons - Pack Lineal color | Available sources SVG, EPS, PSD, PNG files. Personal and Commercial use. #flaticon #icons #unicorn #smileys #emoticons"
  url="https://flaticon.com/packs/unicorn-4/"
  logo="https://media.flaticon.com/dist/min/img/favicon.ico"
  preview="https://cdn-share-sprites.flaticon.com/pack/3/3468/3468074-unicorn_facebook.jpg"/>

<SiteInfo
  name="50 free icons of Kitty avatars designed by Freepik"
  desc="Download now Kitty avatars Free Icons - Pack Lineal color | Available sources SVG, EPS, PSD, PNG files. Personal and Commercial use. #flaticon #icons #breed #pet #kitty"
  url="https://flaticon.com/packs/kitty-avatars-3/"
  logo="https://media.flaticon.com/dist/min/img/favicon.ico"
  preview="https://cdn-share-sprites.flaticon.com/pack/0/763/763740-kitty-avatars_facebook.jpg"/>

<SiteInfo
  name="Instagram free icons designed by Freepik"
  desc="Free vector icon. Download thousands of free icons of social media in SVG, PSD, PNG, EPS format or as ICON FONT #flaticon #icon #instagramlogo #instagram #instagramsketched"
  url="https://flaticon.com/free-icon/instagram_1384031/"
  logo="https://media.flaticon.com/dist/min/img/favicon.ico"
  preview="https://cdn-icons-png.flaticon.com/256/1384/1384031.png"/>

<SiteInfo
  name="Twitter Sign free icons designed by Dave Gandy"
  desc="Free vector icon. Download thousands of free icons of logo in SVG, PSD, PNG, EPS format or as ICON FONT #flaticon #icon #twitter #twittersocialbadge #bird"
  url="https://flaticon.com/free-icon/twitter-sign_25347/"
  logo="https://media.flaticon.com/dist/min/img/favicon.ico"
  preview="https://cdn-icons-png.flaticon.com/256/25/25347.png"/>

<SiteInfo
  name="Behance free icons designed by Roundicons"
  desc="Free vector icon. Download thousands of free icons of social media in SVG, PSD, PNG, EPS format or as ICON FONT #flaticon #icon #BehanceNetwork #behance #logo"
  url="https://flaticon.com/free-icon/behance_254383/"
  logo="https://media.flaticon.com/dist/min/img/favicon.ico"
  preview="https://cdn-icons-png.flaticon.com/256/254/254383.png"/>

<SiteInfo
  name="Dribbble Logo free icons designed by Freepik"
  desc="Free vector icon. Download thousands of free icons of social media in SVG, PSD, PNG, EPS format or as ICON FONT #flaticon #icon #dribbble #basketball #megaball"
  url="https://flaticon.com/free-icon/dribbble-logo_87400/"
  logo="https://media.flaticon.com/dist/min/img/favicon.ico"
  preview="https://cdn-icons-png.flaticon.com/256/87/87400.png"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Learn CSS Media Queries by Building Three Projects",
  "desc": "Today we're going to learn how to use CSS Media Queries to build responsive websites. And we'll practice what we learn by completing three projects. Let's go 🏅 Table of Contents What are CSS Media Queries? Steps to follow The Syntax Practice Projec...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/learn-css-media-queries-by-building-projects.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
