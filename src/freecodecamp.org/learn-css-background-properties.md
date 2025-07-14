---
lang: en-US
title: "Every CSS Background Property Illustrated and Explained with Code Examples 🎖️"
description: "Article(s) > Every CSS Background Property Illustrated and Explained with Code Examples 🎖️"
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
      content: "Article(s) > Every CSS Background Property Illustrated and Explained with Code Examples 🎖️"
    - property: og:description
      content: "Every CSS Background Property Illustrated and Explained with Code Examples 🎖️"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/learn-css-background-properties.html
prev: /programming/css/articles/README.md
date: 2021-04-03
isOriginal: false
author: Joy Shaheb
cover: https://freecodecamp.org/news/content/images/2021/03/FreeCodeCamp--1-.png
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
  name="Every CSS Background Property Illustrated and Explained with Code Examples 🎖️"
  desc="Today we're gonna learn about every single CSS background property with every possible value. We'll learn the short-hand, too. Let's go !🏅 Table of Contents All properties background-image background-size background-repeat background-position backg..."
  url="https://freecodecamp.org/news/learn-css-background-properties"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2021/03/FreeCodeCamp--1-.png"/>

Today we're gonna learn about every single CSS **background** property with every possible **value**. We'll learn the **short-hand**, too. Let's go !🏅

You can watch this tutorial on YouTube as well if you like:

---

## All Properties

This is a list of **All the properties** we're gonna discuss today.

![The red text at the end is the **shorthand**](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/l25y304vndphll4795hr.png)

### What Are CSS Background Properties?

![](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/iic3rs5ewx8c9xp6vryq.png)

CSS background properties let us to control the size and properties of images so that we can make **responsive images** for both smaller and larger screens. This in turn helps us create responsive websites.

For example,

- The property **background-size** allows us to reset the width and height of our image according to screen size.
- **background-position** allows us to tell the browser where to put the image on the screen.

And many more!

### How to Set Up the Project

![](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/u72rvfe5181640ikqa32.png)

Before coding, you need to know little bit of HTML, CSS, and how to use VS code.

To test out the properties and their values, follow these steps 👇

1. Create a new folder named 'BACKGROUND-PROJECT'. Open it in VS code.
2. Create <FontIcon icon="fa-brands fa-html5"/>`index.html` and <FontIcon icon="fa-brands fa-css3-alt"/><FontIcon icon="fa-brands fa-css3-alt"/>`style.css` files.
3. Install 'live server' on VS code.
4. Start live server.

Create one div with the class name 'container' inside the **body tag** in the HTML file.

```html title="index.html"
   <div class="container"></div>
```

In CSS, you **MUST** include a height for the container, otherwise we won't be able to see the image. In our case, we will set it to 100vh, like this:

```css title="style.css"
.container {
  height: 100vh;
}
```

### Download the images for the project

The images are on my **[GitHub repository (<FontIcon icon="iconfont icon-github"/>`JoyShaheb/Project-image-repo`)](https://github.com/JoyShaheb/Project-image-repo/tree/main/Background-property-images)**. Here's how to get them:

1. Visit and copy the link above ☝️
2. Go to [<FontIcon icon="fas fa-globe"/>downgit](https://minhaskamal.github.io/DownGit/#/home) and paste the link you copied
![Follow the steps in this video 👇](https://cloud.githubusercontent.com/assets/5456665/17822364/940bded8-6678-11e6-9603-b84d75bccec1.gif)

![And..... we're all set!](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/nmf39ig7wzdiunfje9lr.png)

Let's start coding 😊

### The CSS `background-image` property

![Using this property, we can add images **throughout our stylesheet.**](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/rhoch2auowlf2xdf4h8f.png)

We write the syntax after writing the selector name, like this:👇

```css title="style.css"
.container {
  /* We'll put image path/URL 👇 inside quotes */
  background-image: url(' ');
}
```

We can use background-image in **2 ways:**

- By locating **image path** in the directory
- By specifying the **image URL**

### How to Use `background-image` through the Directory Path

Here's the syntax for background-image when using the directory path 👇

```css title="style.css"
.container {
  /* Put  image  path  👇 inside quotes */
  background-image: url(' ');
}
```

![](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/1jfuda4p0ki1hish775o.png)

There are three cases when you'll want to specify an image path in our CSS:

1. When `image` and <FontIcon icon="fa-brands fa-css3-alt"/>`style.css` are in the same folder
2. When `image` is in the next folder
3. When `image` is in the previous folder

When `image` and <FontIcon icon="fa-brands fa-css3-alt"/>`style.css` are in the **Same Folder**, it looks something like the below. 👇

![Notice that **`kitty.png`** and **<FontIcon icon="fa-brands fa-css3-alt"/>`style.css`** are in the same parent folder named **Background-project**](https://freecodecamp.org/news/content/images/2021/04/Frame-25--1--1.png)

To locate the file path of the `kitty.png`, write the following code in <FontIcon icon="fa-brands fa-css3-alt"/>`style.css`:

```css title="style.css"
 .container {
   background-image: url("kitty.png");

   height: 100vh;
   /* set size & stop image repetition */
   background-repeat: no-repeat;
   background-size: contain;
 }
```

When the image is in the **Next Folder**, <FontIcon icon="fa-brands fa-css3-alt"/>`style.css` is in previous folder.

![Notice on the image below that `kitty.png` is in the Assets folder while <FontIcon icon="fa-brands fa-css3-alt"/>`style.css` is in the previous folder.](https://freecodecamp.org/news/content/images/2021/04/Frame-26.png)

To go forward and locate the file path of `kitty.png`, we write one dot and slash like this (./) after the quote in <FontIcon icon="fa-brands fa-css3-alt"/>`style.css`. Then we write the name of the folder then slash (/) and finally we write the name of image, like this:👇

```css title="style.css"
.container {
  background-image: url("./Assets/kitty.png");

  height: 100vh;
  /* set size & stop image repetition */
  background-repeat: no-repeat;
  background-size: contain;
}
```

If the image is in the **Previous Folder**, then we need to go back. Notice in the image below👇 that <FontIcon icon="fa-brands fa-css3-alt"/>`style.css` is in the <FontIcon icon="fas fa-folder-open"/>`src` folder and `kitty.png` is **outside the src folder.**

![Alt Text](https://freecodecamp.org/news/content/images/2021/04/Frame-27.png)

To go back and locate the file path of `kitty.png`, we write two dots and a slash (../) after the quote in <FontIcon icon="fa-brands fa-css3-alt"/>`style.css`. Then we write the name of the image, like this: 👇

```css title="style.css"
.container {
  background-image: url("../kitty.png");

  height: 100vh;
  /* set size & stop image repetition */
  background-repeat: no-repeat;
  background-size: contain;
}
```

### How to Use `background-image` by Direct Link

This is pretty easy.

![Write the property and insert the link inside `url()`.](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/szxp3jqyjyksrep1ep82.png)

To work with an image which is a **direct link,** we need to write the following code:

```css title="style.css"
/* example -> */
.container {
  background-image: url("https://dev-to-uploads.s3.amazonaws.com/uploads/articles/szxp3jqyjyksrep1ep82.png");

  height: 100vh;
  /* set size & stop image repetition */
  background-repeat: no-repeat;
  background-size: contain;
}
```

### The CSS background-size property

![We can adjust the size of an image using the `background-size` property.](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/xxbrgckb20fy8tmrg9ik.png)

We write the syntax after writing the selector name, like this 👇

```css title="style.css"
.container {
  /* We'll write values 👇 here */
  background-size: cover;
}
```

You can use background-size in **3 ways**:

- use the Cover / Contain value
- set the image width and height
- use auto

Let's start by discussing the **cover & contain values**.

![Bear size: \[718px X 614px\]](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/uixn5c8mrafpmlhth9iy.png)

#### Cover value

For this to work, we must include an image, set the height, and stop image repetition. We do that like this in CSS: 👇

```css title="style.css"
.container {
  background-image: url('cute-bear.png');
  background-repeat: no-repeat;
  background-size: cover;

  /* Must include the height */
  height: 100vh;
}
```

When we use this property, it will stretch the image to the whole screen even when we resize the window.

![Watch the video below to see how it looks](https://media.giphy.com/media/9OdZ0B1wjO1kdofBBu/giphy.gif)

### The contain value

Same steps here – we must include an image, set its height, and stop image repetition like this:👇

```css title="style.css"
.container {
  background-image: url('cute-bear.png');
  background-repeat: no-repeat;
  background-size: contain;

// Must include the height
  height: 100vh;
}
```

This value will preserve the image size \[Responsive Image\] even when we resize the window.

![Check out this video below to see how it works](https://media.giphy.com/media/VaqDcSh38DTz7YbV6p/giphy.gif)

### Image width and height

![We can set the width and height of the image using the `background-size` property](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/36p9azoztkvawbvy6244.png)

Here's the syntax in CSS: 👇

```css title="style.css"
.container {
  /* here, we see  width👇  &  👇 height */
  background-size: 200px   200px;
}
```

Also, don't forget to insert the image, set its height, and stop image repetition. The code snippet looks like this:

```css title="style.css"
.container {
  background-image: url('cute-bear.png');
  background-repeat: no-repeat;

  /* here, we see  width👇 &  👇 height */
  background-size: 200px  200px;

  /* Must include the height */
  height: 100vh;
}
```

### Auto sizing

When using this value, the image will stay at its original size. It won't change when we resize the window.

![It looks like this](https://media.giphy.com/media/hHc7ZhU7BB4NX8gLRR/giphy.gif)

---

## The CSS `background-repeat` property

![This property allows us to repeat the same image multiple times.](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/629rnxirqrdr8p5fapcd.png)

We write the syntax after writing the selector name, like this 👇

```css title="style.css"
.container {
  /* we'll change values 👇 here */
  background-repeat: repeat;
}
```

This property has six values:

- `repeat`
- `repeat-x`
- `repeat-y`
- `no-repeat`
- `space`
- `round`

Here are the results of each of these six values at a glance.

![Note that the kitty size in these examples is \[200px X 200px\].](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/jj2jwfwh0pboqpylkeq0.png)

![Round](https://media.giphy.com/media/3BUBxpCxmcDrBN4aZF/giphy.gif)

![Space](https://media.giphy.com/media/cO0jNSpVi0I3FWD62G/giphy.gif)

Now, Let's investigate what's happening with each value. BUT, before that, note that we need to insert an image using the `background-image` property, like this:

```css title="style.css"
.container {
   background-image: url('kitty.png');
   background-size: 200px 200px;
   background-repeat:; /* we will play with values here  */

   height: 100vh;
}
```

### The repeat value

By using this value, we can repeat the same image multiple times along **both the X and Y axes** as long as the screen space doesn't end.

![Here, the kitty size is 200px x 200px](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/26zsa1dn161pawjqxuqp.png)

To duplicate this result, we write ->

```css title="style.css"
.container {
   background-image: url('kitty.png');
   background-size: 200px 200px;
   background-repeat: repeat;

   height: 100vh;
}
```

### The repeat-x value

This value allows us to repeat the same image multiple times along the **X-Axis** as long as the screen space doesn't end.

![Kitty size: 200px X 200px](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/pl4znzrwcevpr5w1a4i5.png)

to make this happen, we write ->

```css title="style.css"
.container {
   background-image: url('kitty.png');
   background-size: 200px 200px;
   background-repeat: repeat-x;

   height: 100vh;
}
```

### The repeat-y value

This one works the same way as `repeat-x`, but works along the **Y-Axis** as long as the screen space doesn't end.

![Kitty size: 200px X 200px](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/7yo3i3bp8cw2r6zqhtvm.png)

for this outcome, we write ->

```css title="style.css"
.container {
   background-image: url('kitty.png');
   background-size: 200px 200px;
   background-repeat: repeat-y ;

   height: 100vh;
}
```

### The no-repeat value

We can have our original image without repetition using this value.

![Kitty size: 200px X 200px](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/p2okgurnuakrnqbyv6kr.png)

For this result, we write ->

```css title="style.css"
.container {
   background-image: url('kitty.png');
   background-size: 200px 200px;
   background-repeat: no-repeat ; 

   height: 100vh;
}
```

### The space value

This works both along the X and Y axes. We can see the main difference between the values **space and round** when we resize the window.

![Notice that we have **empty spaces** when we resize the window](https://media.giphy.com/media/cO0jNSpVi0I3FWD62G/giphy.gif)

to experiment with this value, write ->

```css title="style.css"
.container {
   background-image: url('kitty.png');
   background-size: 200px 200px;
   background-repeat: space ;

   height: 100vh;
}
```

### The round value

This works both along the X and Y axes.

![Notice that the image is **stretching** when we resize the window](https://media.giphy.com/media/3BUBxpCxmcDrBN4aZF/giphy.gif)

Follow along & write ->

```css title="style.css"
.container {
   background-image: url('kitty.png');
   background-size: 200px 200px;
   background-repeat: round ; 

   height: 100vh;
}
```

---

## The CSS background-position property

![This property is used to change the position of an image on the screen.](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/j4ndvr71f0yl9c44kbc7.png)

Here's the syntax: 👇

```css title="style.css"
.container {
  /* This is       X-Axis👇  &  👇 Y-Axis */
  background-position: 300px  200px;
}
```

Also, don't forget to insert the image, set its height, and stop image repetition. We've set the kitty size to 200px X 200px using the `background-size` property:

```css title="style.css"
.container {
  background-image: url("kitty-idea.png");
  background-size: 200px 200px;
  background-repeat: no-repeat;

  /* This is         X-Axis👇  & 👇 Y-Axis */
  background-position: 300px 200px;
  height: 100vh;
}
```

![And here's the result](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/65p2htkztmijbm1hxlug.png)

You can also use a combination of these values:

- `top`
- `left`
- `right`
- `bottom`
- percentage values

For an example, let's set our kitty at the very bottom right. Here's the code snippet for this:

```css title="style.css"
.container {
  background-image: url("kitty-idea.png");
  background-size: 200px 200px;
  background-repeat: no-repeat;

  /* This is         X-Axis👇  & 👇 Y-Axis */
  background-position: bottom right;
  height: 100vh;
}
```

![And here's the result](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ga6veuh8ea3yzq7nend2.png)

Calculating the available space of the screen, the `%` values determine the position of the image. Here's what it looks like in code:

```css title="style.css"
.container {
  background-image: url("kitty-idea.png");
  background-size: 200px 200px;
  background-repeat: no-repeat;

  /* This is         X-Axis👇  & 👇 Y-Axis */
  background-position: 25% 15%;
  height: 100vh;
}
```

![And here's the result](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/fazbxgdpkqeomum02qv7.png)

---

## The CSS background-origin property

![This property allows us to set the origin of our image across the CSS box model](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/wc2b6ypgcfdtol6am14g.png)

We write the syntax after writing the selector name, like this 👇

```css title="style.css"
.container {
  /* We'll write values   👇 here */
  background-origin: border-box;
}
```

Its four values are:

- `border-box`
- `padding-box`
- `content-box`
- `inherit`

In the standard CSS box model, the outermost part is the border.

![Then comes the padding and finally we have the content itself at the center](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/p3mdn6hpd1u892akrkj5.png)

![Here's the result of every property at a glance](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/27ptyulhvxqi4idrw68n.png)

To recreate these results:

- First we need an image, we need to stop image repetition, and set the height and width of **both the container and the image.**
- Once done, we will insert 40px of padding, otherwise we can't see the difference between the padding box and the content box.
- Then, insert a 25px red border. Set the border-style to dashed to get a **dashed border** on the screen.
- set the background-size to 400px & 400px

Here's what that looks like in code:

```css title="style.css"
.container {
  background-image: url('cute-girl.png');
  background-repeat: no-repeat;
  background-size: 400px 400px;

  /* Change  values here  👇  to see difference */
  background-origin: border-box;
  padding: 40px;
  border: 25px solid red;
  border-style: dashed;

  /* Width & height for container 👇 */
  width: 400px;
  height: 400px;
}
```

---

## The CSS background-clip property

This is the same as the `background-origin` property.

![The main difference is that `background-clip` **CUTS** the image to fit inside the box, while `background-origin` **PUSHES** the content inside the box to fit](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/r4ga97rke3kgppd7qlxn.png)

We write the syntax after writing the selector name, like this 👇

```css title="style.css"
.container {
  /* We'll write values   👇 here */
  background-clip: border-box;
}
```

Its four values are:

- `border-box`
- `padding-box`
- `content-box`
- `inherit`

![Here's the result of every property at a glance](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/xgd6sh8237bmvpnujl8r.png)

To recreate these results:

- First we need an image, we need to stop image repetition, and we need to set the height and width of **both the container and the image.**
- Once done, we will insert 40px padding, otherwise we won't be able to see the **difference** between the padding box and content box.
- Then, insert a 25px red border. Set the border-style to dashed to see the **dashed border** on screen.
- Set the background-size to 400px & 400px

The code looks like this:

```css title="style.css"
.container {
  background-image: url('cute-girl.png');
  background-repeat: no-repeat;
  background-size: 400px 400px;

  /* Change  values here  👇  to see difference */
  background-clip: border-box;
  padding: 40px;
  border: 25px solid red;
  border-style: dashed;

  /* Width & height for container 👇 */
  width: 400px;
  height: 400px;
}
```

---

## The CSS background-attachment property

![This property allows us to control the behavior of our content and image **when we scroll.**](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/n1xx67vtt5w3c861sskx.png)

We write the syntax after writing the selector name, like this 👇

```css title="style.css"
.container {
  //* We'll  change  values 👇  here */
  background-attachment: scroll;
}
```

Its three values are:

- `scroll`
- `fixed`
- `local`

When we use **`scroll`**, the image is fixed and we can freely scroll our content. The **`fixed`** value gives us a parallax effect on mouse scroll and **`local`** produces multiple images as long as our content doesn't end.

<SiteInfo
  name="All CSS Background Properties Explained in 5Minutes"
  desc="I remember when I first tried setting an image background in CSS.  What I thought would be a simple..."
  url="https://dev.to/hadrysmateusz/learn-all-8-background-css-properties-in-5-minutes-2lk4/"
  logo="https://media2.dev.to/dynamic/image/width=128,height=,fit=scale-down,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F8j7kvp660rqzt99zui8e.png"
  preview="https://media2.dev.to/dynamic/image/width=1000,height=500,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fi%2Fn0055t8pxjbirikn6mh9.png"/>

---

## The CSS background-color property

![You can use this property to fill your background with color.](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/mh7pe7phpj2vrvz304ma.png)

We write the syntax after writing the selector name, like this 👇

```css title="style.css"
.container {
  /* we'll change values 👇  here */
  background-color: red;
}
```

Out of the many options, the most popular ones are:

- Solid color by name or hex value
- Using the `RGB()` color function
- Using the `linear-gradient()` function

### How to get a solid background color by name or hex value

You can use color names to set the background color, like this:

```css title="style.css"
.container {
  background-color: red;
  height: 100vh;
}
```

Or, you can use a hex color code like this:

```css title="style.css"
.container {
  background-color: #ff0000; /* red color */
  height: 100vh;
}
```

You can check out these resources for more colors:

<SiteInfo
  name="Coolors - The super fast color palettes generator!"
  desc="Generate or browse beautiful color combinations for your designs."
  url="https://coolors.co/"
  logo="https://coolors.co/assets/img/favicon.png"
  preview="https://coolors.co/assets/img/og_image.png"/>

<SiteInfo
  name="Flat UI Colors 2 - 14 Color Palettes, 280 colors 🎨"
  desc="280 handpicked colors ready for COPY & PASTE"
  url="https://flatuicolors.com/"
  logo="https://flatuicolors.com/static/favicon.ico"
  preview="/static/facebook-share.png"/>

### How to use the `RBG()` color function to set background color

You can use `RGB()` color function to set the background color like this:

```css title="style.css"
.container {
  /* color name is "American River" */
  background-color: rgb(99, 110, 114);
  height: 100vh;
}
```

Or, you can use `RGBA()` to set both color and opacity like this:

```css title="style.css"
.container {
  /* The 0.5 at last represents        50% 👇 opacity  */
  background-color: rgba(99, 110, 114, 0.5);
  height: 100vh;
}
```

![This is an experiment with the color named 'Eton blue' with various opacity levels](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/yzc82sudq8es7ocok12g.png)

### How to set the background color with the `linear-gradient()` function

You can use this function to create a gradient color of more than 1 color.

![Here are some examples of gradient colors](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/f0j3e3r6kobycowckdxg.png)

You can visit [<FontIcon icon="fas fa-globe"/>this website](https://uigradients.com/#Summer) for more color resources with CSS code snippets.

![Let's recreate this background color](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/jkf21o97m7gqzpme810k.png)

`#22c1c3` represents the color on the left, and `#fdbb2d` represents color on right. `90deg` tells us how the two colors will be angled to create a gradient.

The code snippet looks like this:

```css title="style.css"
.container {
   background: linear-gradient(90deg, #22c1c3, #fdbb2d);  
   height: 100vh;
}
```

---

## The short-hand for these CSS properties

![This is the order of the shorthand for the background properties](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/newvcc4rvegnbkblwzyb.png)

For this experiment, let's put `kitty.png` in our browser with a blue background at 200px on the X-Axis and 200px on the Y-axis. The code snippet looks like this:

```css title="style.css"
.container {
  background-color: skyblue;
  background-image: url('kitty.png');
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: 200px 200px;
  height: 100vh;
}
```

And here's the code snippet using the shorthand:

```css title="style.css"
.container {
  background: skyblue url('kitty.png') no-repeat fixed 200px 200px;
  height: 100vh;
}
```

This shorthand really saves us time. If you want to skip one value, you can do it as long as you maintain the order of these properties.

---

## Conclusion

Here's your medal for reading till the the end ❤️

![Suggestions and criticisms are highly appreciated ❤️](https://dev-to-uploads.s3.amazonaws.com/i/usxsz1lstuwry3jlly4d.png)

::: info Joy Shaheb

- [Youtube (<FontIcon icon="fa-brands fa-youtube"/>`JoyShaheb`)](https://youtube.com/@JoyShaheb)
- [Twitter (<FontIcon icon="fa-brands fa-x-twitter"/>`JoyShaheb`)](https://x.com/JoyShaheb)
- [Instagram (<FontIcon icon="fa-brands fa-instagram"/>`joyshaheb`)](https://instagram.com/joyshaheb/)
- [<FontIcon icon="fas fa-globe"/>More layout Designs here](https://csslayout.io/patterns/)

:::

::: details Credits

<SiteInfo
  name="Photo by Yuri Adriel on Pexels"
  desc="Download this photo by Yuri Adriel for free on Pexels"
  url="https://pexels.com/photo/woman-lying-on-plants-2125610/"
  logo="https://pexels.com/assets/static/images/meta/pexels-icon.png"
  preview="https://images.pexels.com/photos/2125610/pexels-photo-2125610.jpeg?auto=compress&cs=tinysrgb&h=627&fit=crop&w=1200"/>

<SiteInfo
  name="50 free icons of Kitty avatars designed by Freepik"
  desc="Download now Kitty avatars Free Icons - Pack Lineal color | Available sources SVG, EPS, PSD, PNG files. Personal and Commercial use. #flaticon #icons #breed #pet #kitty"
  url="https://flaticon.com/packs/kitty-avatars-3/"
  logo="https://media.flaticon.com/dist/min/img/favicon.ico"
  preview="https://cdn-share-sprites.flaticon.com/pack/0/763/763740-kitty-avatars_facebook.jpg"/>
  
<SiteInfo
  name="Free Vector | Cute bear is happy cartoon illustration"
  desc="Download this Free Vector about Cute bear is happy cartoon illustration, and discover more than 15 Million Professional Graphic Resources on Freepik"
  url="https://freepik.com/free-vector/cute-bear-is-happy-cartoon-illustration_12341167.htm/"
  logo="https://fps.cdnpk.net/favicons/favicon-96x96.png"
  preview="https://img.freepik.com/free-vector/cute-bear-is-happy-cartoon-illustration_56104-432.jpg"/>

<SiteInfo
  name="Free Vector | Set of happy cute cats cartoon illustration"
  desc="Download this Free Vector about Set of happy cute cats cartoon illustration, and discover more than 15 Million Professional Graphic Resources on Freepik"
  url="https://freepik.com/free-vector/set-happy-cute-cats-cartoon-illustration_12566295.htm/"
  logo="https://fps.cdnpk.net/favicons/favicon-96x96.png"
  preview="https://img.freepik.com/free-vector/set-happy-cute-cats-cartoon-illustration_56104-460.jpg"/>

<SiteInfo
  name="Free Vector | Young girl in different gestures cartoon illustration"
  desc="Download this Free Vector about Young girl in different gestures cartoon illustration, and discover more than 15 Million Professional Graphic Resources on Freepik"
  url="https://freepik.com/free-vector/young-girl-different-gestures-cartoon-illustration_12566309.htm/"
  logo="https://fps.cdnpk.net/favicons/favicon-96x96.png"
  preview="https://img.freepik.com/free-vector/young-girl-different-gestures-cartoon-illustration_56104-465.jpg"/>

<SiteInfo
  name="Free Vector | Set of cute rabbit with duck feel happy and sad cartoon illustration"
  desc="Download this Free Vector about Set of cute rabbit with duck feel happy and sad cartoon illustration, and discover more than 15 Million Professional Graphic Resources on Freepik"
  url="https://freepik.com/free-vector/set-cute-rabbit-with-duck-feel-happy-sad-cartoon-illustration_12573654.htm/"
  logo="https://fps.cdnpk.net/favicons/favicon-96x96.png"
  preview="https://img.freepik.com/free-vector/set-cute-rabbit-with-duck-feel-happy-sad-cartoon-illustration_56104-478.jpg"/>

<SiteInfo
  name="Background | CSS-Tricks"
  desc="The background property in CSS allows you to control the background of any element (what paints underneath the content in that element). It is a shorthand"
  url="https://css-tricks.com/almanac/properties/b/background/"
  logo="https://i0.wp.com/css-tricks.com/wp-content/uploads/2021/07/star.png?fit=180%2C180&ssl=1"
  preview="https://css-tricks.com/wp-json/social-image-generator/v1/image/13963"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Every CSS Background Property Illustrated and Explained with Code Examples 🎖️",
  "desc": "Today we're gonna learn about every single CSS background property with every possible value. We'll learn the short-hand, too. Let's go !🏅 Table of Contents All properties background-image background-size background-repeat background-position backg...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/learn-css-background-properties.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
