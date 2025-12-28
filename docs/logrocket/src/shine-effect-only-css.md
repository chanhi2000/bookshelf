---
lang: en-US
title: "Create a shine effect using only CSS"
description: "Article(s) > Create a shine effect using only CSS"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - blog.logrocket.com
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Create a shine effect using only CSS"
    - property: og:description
      content: "Create a shine effect using only CSS"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/shine-effect-only-css.html
prev: /programming/css/articles/README.md
date: 2022-01-25
isOriginal: false
author:
  - name: Peter Aideloje
    url: https://blog.logrocket.com/author/peteraideloje/
cover: /assets/image/blog.logrocket.com/shine-effect-only-css/banner.png
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
  name="Create a shine effect using only CSS"
  desc="Create a shine effect using CSS to add an eye-catching visual that will help direct your users' attention."
  url="https://blog.logrocket.com/shine-effect-only-css"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/shine-effect-only-css/banner.png"/>

Used widely by software engineers, graphic designers, and both UI and UX professionals, CSS offers the ability to customize the design of your project by creating unique, eye-catching visuals. While some visual effects are relatively straightforward to achieve, [**others are more complicated, requiring detailed workarounds to obtain the desired output**](/blog.logrocket.com/guide-to-css-animation-for-javascript-developers.md).

In this article, we’ll learn how to implement a shine effect using only CSS. First, we’ll build a simple registration form, then apply the shine effect to a button on the form. At the end of this tutorial, you’ll be able to use this methodology to apply a similar shine effect to any element in your application.

::: note Prerequisites

To follow along with this tutorial, you’ll need the following:

- Basic knowledge of CSS and HTML
- A text editor like VS Code or Sublime Text installed on your machine

:::

To view the full code used in this tutorial, you can [clone this project via my GitHub (<VPIcon icon="iconfont icon-github"/>`aidelojep/Shine_effect_of_CSS`)](https://github.com/aidelojep/Shine_effect_of_CSS/). Let’s get started!

<SiteInfo
  name="aidelojep/Shine_effect_of_CSS"
  desc="This project focuses on using CSS shine effect to style a Registration form"
  url="https://github.com/aidelojep/Shine_effect_of_CSS/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/7a686988363f053b2c95d3b68dedb0ccb9d8c209baaf22e6223e0b177ba49e6f/aidelojep/Shine_effect_of_CSS"/>

---

## What is Cascading Style Sheets?

As the name implies, Cascading Style Sheets (CSS) is a language that helps developers add visual elements to the web by styling HTML elements in cascading order. Cascading indicates that the styling occurs from top to bottom, implying that the last styling effect attributed to an HTML element would override every other previous effect on that element.

---

## Styling elements with CSS

Let’s consider an example with the HTML code snippet below:

```html title="index.html"
<h1>Hello World!<h1>
```

Imagine we want to style the color of the HTML element to red. To do so, select the HTML element you want to style. You can do so by making a reference to the element’s name, ID, or class. In our example below, we’re using the header name `h1` to reference the HTML element to be styled.

Next, we’ll open curly braces and include the effect we intend to apply to the selected HTML element. Our only focus is to change the color of the HTML element to red, so we assign `red` to `color` as follows:

```css title="style.css"
h1 {
  color: red
}
```

Let’s consider styling an HTML element with `firstName` as its unique ID reference. By referencing an HTML element with `id`, we can target either a single or a smaller group of elements from a larger group of HTML elements in a container-like form, applying the effect collectively.

We can use `div` to save time that would have been spent styling individual elements. Keep in mind that the `id name` cannot begin with a number and is expected to be unique from other HTML elements:

```html title="index.html"
<div id = "firstName">

</div>
```

To select the HTML element, we’ll use the `#` hash character, followed by the `id`:

```css title="style.css"
#firstName {
  color: blue;
  font: 50%;
  text-align: center;
}
```

We could also add additional style effects to the HTML element above, like font size, text-alignment, and more. Another approach is to style our HTML elements using `class`, like in the code snippet below:

```html title="index.html"
<div class ="lastName">

</div>
```

To add a style effect of a `class` with CSS, we would have to use the period `.` character, followed by the `classname`. In this case, our `classname` is `lastName`:

```css title="style.css"
.lastName {
  color: black;
  font: 50%;
}
```

### CSS grouping

Alternately, we can use CSS grouping to collectively style our HTML elements. Before applying the style to each element, we group our HTML elements together by listing each element separated by a comma, allowing us to write less code:

```css title="style.css"
h1, h2, p{
  color: green;
  text-align: center;
  font: 100px;
  border-radius: none;
}
```

### CSS universal selector

The asterisk `*` character selects all the HTML elements on the page so that the CSS style will be applied to all of them:

```css title="style.css"
* {
  color: blue;
  text-align: center;
}
```

From the examples above, we observe that the role of CSS can be likened to a painter’s job. Let’s refer to the HTML elements as a building’s structure and the CSS effects as the paint on the building. Essentially, HTML and CSS always go hand-in-hand for a frontend development project or web layout.

---

## Types of CSS style effects

There are three ways to add effects to our HTML elements. For one, we can use external CSS styling, in which we place our CSS in a separate folder then use a hyperlink to link the CSS page, usually in the `<head>` section.

Inline CSS styling involves styling a single element with a unique style. Simply place the `style` attribute in front of the element you want to style. Inline styling usually occurs within the HTML element. Internal CSS styling is similar to inline CSS styling, and these terms are usually used interchangeably. Typically, internal CSS is found in the `<head>` section.

Recall that CSS is styled in a cascading format, and styles are created following this implementation. However, inline CSS provides an exception to this rule. Inline CSS styling has the highest priority over the other types of effects because it always overrides either the external or internal CSS styling.

---

## Styling a form with CSS

In this section, we’ll style a CSS form, then use transitions to add a shine effect to our form. The code below shows a regular HTML page, which we named `index.html`:

```html title="index.html"
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Shine Effect of Pure CSS</title>
  <link rel="stylesheet" href="style.css">
</head>

<body>
  <form>
    <h3>Registration</h3>
  </form>
  </div>
</body>

</html>
```

Now, we’ll create an input form on our HTML page by adding `email` and `password` input types to our form:

```html title="index.html"
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Shine Effect of Pure CSS</title>
  <link rel="stylesheet" href="style.css">
</head>

<body>
  <form>
    <h3 class="form-head">Registeration</h3> <input type="email" placeholder="Enter your email"> <input
      type="password" placeholder="Enter your password">
    <div class="button-action"> <button>Sign Up</button> </div>
  </form>
  </div>
</body>

</html>
```

Next, we’ll create a second file in our text editor and name it `style.css`. Inside this file, we’ll import a font from [Google Fonts](https://fonts.google.com). Afterward, we’ll apply our universal CSS selector by using the `*` asterisk character on our `style.css` folder, giving a base style to all our HTML elements:

```css title="style.css"
@import url('https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@1,500&display=swap');

* {
  margin: 0%;
  padding: 0%;
  font-family: 'Arial', 'sans-serif';
  box-sizing: border-box;
}
```

Next, we’ll include a `:root` pseudo-class selector to our style effects, and we’ll style our `body` and `form` elements as follows:

```css title="style.css"
@import url('https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@1,500&display=swap');

* {
  margin: 0%;
  padding: 0%;
  font-family: 'Arial', 'sans-serif';
  box-sizing: border-box;
}

:root {
  --first: purple;
}

body {
  background: radial-gradient(circle at center, cyan, rgb(77, 136, 212), blue), 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70vh;
}

form {
  width: 400px;
  margin: 0 auto;
  padding: 30px;
  box-shadow: 1px, 2px, 3px rgba(50, 50, 50, 0.87);
  background-color: white;
}
```

At this point, your form should look like the image below:

![Simple Form Styling CSS](/assets/image/blog.logrocket.com/shine-effect-only-css/simple-form-styling-css.jpeg)

Now, we’ll style our `form-head` class and add more effects to our `input` element, like `border` and `border-bottom`, as shown below:

```css title="style.css"
.form-head {
  font-size: 25px;
  text-align: center;
}

input {
  border: none;
  border-bottom: 2px solid var(--first);
}
```

The code snippet above results in the image below:

![Form Head Class Effects Registration Button](/assets/image/blog.logrocket.com/shine-effect-only-css/form-head-class-effects-registration-button.webp)

To wrap up the basics of our form, let’s add some additional properties to our `input` element:

```css title="style.css"
input {
  border: none;
  border-bottom: 2px solid var(--first);
  padding: 10px;
  outline: none;
  display: block;
  width: 100%;
  margin: 20px auto;
}
```

Now, our form will look like the image below:

![Form Basics Registration Button](/assets/image/blog.logrocket.com/shine-effect-only-css/form-basics-registration-button.jpeg)

---

## Adding a shine effect to our form button

Now, we’ll add a shine effect to our sign-up `button` element. We’ll start by changing the position of our button to the center of the form, then we’ll add`hover` , `linear-gradient`, and `transition` effects:

```css title="style.css"
.button-action {
  text-align: center;
}

button {
  border-radius: 8px;
  border: none;
  padding: 8px 12px;
  color: whitesmoke;
  background-color: purple;
  font-weight: 800;
  cursor: pointer;
  outline: none;
}
```

With the code snippet above, we can customize our button with certain properties like `color`, `font-weight`, `padding`, and `border-radius`. You can see the result in the image below:

![Customize Button Additional Properties](/assets/image/blog.logrocket.com/shine-effect-only-css/customize-button-additional-properties.jpeg)

Finally, we’ll add a shine effect to our `Sign Up` button, as shown in the code snippet below:

```css title="style.css"
.button-action {
  text-align: center;
}

button {
  border-radius: 8px;
  border: none;
  padding: 8px 12px;
  color: whitesmoke;
  background-color: purple;
  font-weight: 800;
  cursor: pointer;
  outline: none;
  background-repeat: no-repeat;
  background-position: -120px -120px, 0 0;
  background: linear-gradient(45deg, yellow, purple, red, blue);
  background-size: 250% 250%, 100% 100%;
  transition: background-position 1s ease;
}

button:hover {
  background: linear-gradient(35deg, brown, pink, green);
  background-position: 0 0;
  transition: 0.5s;
}
```

I included `linear-gradient` as an extra feature of the `background` property of the `button`, causing a blend of the selected default colors, yellow, purple, red, and blue. I indicated that I want these colors to be diagonal along a `45deg` angle.

Secondly, I added a `transition` property, which will determine how fast or slow the selected colors display after the user performs an action. I chose `1s` as the `ease`time for the colors to transition.

Then, I added a `button:hover` effect property, which acts like an event listener, where we’ll include the colors that create a shine-like effect. Now, whenever the button is hovered on or clicked on, the selected colors will become a mix of brown, pink, and green along a `35deg` angle. The transition time is set to `0.5`seconds, which is the duration before the effects are applied on the button. The `background-position` remains unchanged because we assign `0%` to both the right and left positions:

![Final CSS Shine Effect](/assets/image/blog.logrocket.com/shine-effect-only-css/final-css-shine-effect.jpeg)

You could also [<VPIcon icon="fa-brands fa-youtube"/>check out the effect on YouTube](https://youtu.be/NpAEQzeSoOE).

<VidStack src="youtube/NpAEQzeSoOE" />

---

## Conclusion

In this article, we covered how to add a visual shine effect to an HTML element using only CSS. First, we covered some important background information on CSS. Then, we built a simple registration form, and finally, we added a shine effect to a button on our form.

You can follow the steps outlined in this tutorial to add a similar effect to any type of project or webpage. Adding eye-catching visuals to your application can help engage users or direct their attention to where you want them to go.

I hope you enjoyed this article, and please be sure to leave a comment if you have any questions. Happy coding!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Create a shine effect using only CSS",
  "desc": "Create a shine effect using CSS to add an eye-catching visual that will help direct your users' attention.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/shine-effect-only-css.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
