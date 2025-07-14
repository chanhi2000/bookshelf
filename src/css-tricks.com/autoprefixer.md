---
lang: en-US
title: "Autoprefixer: A Postprocessor for Dealing with Vendor Prefixes in the Best Possible Way"
description: "Article(s) > Autoprefixer: A Postprocessor for Dealing with Vendor Prefixes in the Best Possible Way"
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
      content: "Article(s) > Autoprefixer: A Postprocessor for Dealing with Vendor Prefixes in the Best Possible Way"
    - property: og:description
      content: "Autoprefixer: A Postprocessor for Dealing with Vendor Prefixes in the Best Possible Way"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/autoprefixer.html
prev: /programming/css/articles/README.md
date: 2017-04-13
isOriginal: false
author:
  - name: Andrey Sitnik
    url : https://css-tricks.com/author/andreysitnik/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2013/08/autoprefixer-logo.png
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
  name="Autoprefixer: A Postprocessor for Dealing with Vendor Prefixes in the Best Possible Way"
  desc="The following is a guest post by Andrey Sitnik, the creator of the Autoprefixer tool, a ”postprocessor” for handling vendor prefixes in CSS. Why use this"
  url="https://css-tricks.com/autoprefixer"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks/wp-content/uploads/2013/08/autoprefixer-logo.png"/>

::: info

The following is a guest post by [Andrey Sitnik (<FontIcon icon="iconfont icon-github"/>`ai`)](https://github.com/ai), the creator of the [Autoprefixer (<FontIcon icon="iconfont icon-github"/>`ai/autoprefixer`)](https://github.com/ai/autoprefixer) tool, a “postprocessor” for handling vendor prefixes in CSS. Why use this instead of your preprocessor or another tool? Many reasons. Andrey will explain.

:::

[Autoprefixer (<FontIcon icon="iconfont icon-github"/>`ai/autoprefixer`)](https://github.com/ai/autoprefixer) parses CSS files and adds vendor prefixes to CSS rules using the [<FontIcon icon="iconfont icon-caniuse"/>Can I Use](https://caniuse.com/) database to determine which prefixes are needed.

All you have to do is add it to your asset building tool ([<FontIcon icon="iconfont icon-grunt"/>Grunt](http://gruntjs.com/), for instance) and you can totally forget about CSS vendor prefixes. Just write regular CSS according to the latest W3C specifications without any prefixes. Like this:

```css
a {
  transition: transform 1s
}
```

Autoprefixer uses a database with current browser popularity and properties support to apply prefixes for you:

```css
a {
  -webkit-transition: -webkit-transform 1s;
  transition: -ms-transform 1s;
  transition: transform 1s
}
```

![Autoprefixer logo by [<FontIcon icon="fas fa-globe"/>Anton Lovchikov](http://antiflash.ru/)](https://i0.wp.com/css-tricks.com/wp-content/uploads/2013/08/autoprefixer-logo.png)

---

## The Problem

We can, of course, write vendor CSS prefixes by hand, but it can be tedious and error-prone.

We can use services like [<FontIcon icon="fas fa-globe"/>Prefixr](http://prefixr.com/) and text editor plugins, but it is still exhausting to work with big blocks of repeating code.

We can use mixin libraries with preproccesors like [<FontIcon icon="fas fa-globe"/>Compass](http://compass-style.org/) for Sass or [<FontIcon icon="fas fa-globe"/>nib](http://visionmedia.github.io/nib/) for Stylus. They solve a lot of problems, but create other problems instead. They force us to use a new syntax. They iterate much slower than modern browsers do, so a stable release can have a lot of unnecessary prefixes, and sometimes we need to create our own mixins.

And Compass does not really hide prefixes from you since you still need to decide on a lot of questions, for example: Do I need to write a mixin for `border-radius`? Do I need to split arguments for `+transition` by comma?

Lea Verou’s [<FontIcon icon="fas fa-globe"/>-prefix-free](http://leaverou.github.io/prefixfree/) came closest to solving this problem, but using client side libraries is not such a good idea when you take end-user perfomance into account. To avoid doing the same job again and again, it is better to build CSS once: during asset building or project deployment.

---

## Under the Hood

Instead of being a preprocessor – such as Sass and Stylus – Autoprefixer is a postprocessor. It doesn’t use any specific syntax and works with common CSS. Autoprefixer can be easily integrated with Sass and Stylus, since it runs after CSS is already compiled.

Autoprefixer is based on [Rework (<FontIcon icon="iconfont icon-github"/>`visionmedia/rework`)](https://github.com/visionmedia/rework), a framework for writing your own CSS postproccesors. Rework parses CSS to useful JavaScript structure and exports it back to CSS after your manipulations.

Each version of Autoprefixer contains a copy of latest Can I Use data:

- List of current browsers and their popularity.
- List of prefixes required for new CSS properties, values and selectors.

By default, Autoprefixer will support 2 latest versions of major browsers, much like [<FontIcon icon="fa-brands fa-google"/>Google does](http://support.google.com/a/bin/answer.py?answer=33864). But you can choose, what browsers are supported in your project, by name (like **“ff 21”**) or by pattern:

- Last 2 version of each major browsers using **“last 2 versions”**.
- With more that 1 % of global usage statistics using **“> 1%”**.
- Only newer versions by **“ff > 20”** or **“ff >= 20”**.

Then Autoprefixer calculates which prefixes are required and which are outdated.

When Autoprefixer adds prefixes to your CSS, it doesn’t forget about fixing syntax differences. This way, CSS is produced according to the latest W3C specs:

```css
a {
  background: linear-gradient(to top, black, white);
  display: flex
}
::placeholder {
  color: #ccc
}
```

compiles to:

```css
a {
  background: -webkit-linear-gradient(bottom, black, white);
  background: linear-gradient(to top, black, white);
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex
}
:-ms-input-placeholder {
  color: #ccc
}
::-moz-placeholder {
  color: #ccc
}
::-webkit-input-placeholder {
  color: #ccc
}
::placeholder {
  color: #ccc
}
```

Autoprefixer cleans outdated prefixes as well (from legacy code or CSS libraries like Bootstrap), so the following code:

```css
a {
  -webkit-border-radius: 5px;
  border-radius: 5px
}
```

compiles to:

```css
a {
  border-radius: 5px
}
```

So after Autoprefixer, CSS will contain only actual vendor prefixes. After [<FontIcon icon="fas fa-globe"/>Fotorama](http://fotorama.io/) switched from Compass to Autoprefixer, the CSS file size [decreased (<FontIcon icon="fa-brands fa-x-twitter"/>`fotoramajs`)](https://twitter.com/fotoramajs/status/362686759944982528) by almost 20%.

---

## Demo

If you still don’t use any kind of tool to automate the building of your assets, be sure to check out [<FontIcon icon="iconfont icon-grunt"/>Grunt](http://gruntjs.com/). I highly recommend to start using build tools. This can open you a whole new world of “sugar” syntaxes, time-saving mixin libraries and useful image processing tools. All of developers’ productivity methods to save a lot of nerves and time (the freedom to choose languages, code re-use, the ability to use third-party libraries) are available now for front-end programmers.

Let’s create a project directory and write simple CSS in <FontIcon icon="fa-brands fa-css3-alt"/>`style.css`:

```css
a { }
```

For this example, we will use Grunt. First, we will need to install `grunt-autoprefixer` using npm:

```sh
npm install grunt-cli grunt-contrib-watch grunt-autoprefixer
```

Then we should create <FontIcon icon="fa-brands fa-js"/>`Gruntfile.js` and enable Autoprefixer:

```js title="Gruntfile.js"
module.exports = function (grunt) {
  grunt.initConfig({
    autoprefixer: {
      dist: {
        files: {
          "build/style.css": "style.css",
        },
      },
    },
    watch: {
      styles: {
        files: ["style.css"],
        tasks: ["autoprefixer"],
      },
    },
  });
  grunt.loadNpmTasks("grunt-autoprefixer");
  grunt.loadNpmTasks("grunt-contrib-watch");
};
```

This config enables the compilation of <FontIcon icon="fa-brands fa-css3-alt"/>`style.css` to <FontIcon icon="fas fa-folder-open"/>`build/`<FontIcon icon="fa-brands fa-css3-alt"/>`style.css` using Autoprefixer. Also we will use `grunt-contrib-watch` to recompile <FontIcon icon="fas fa-folder-open"/>`build/`<FontIcon icon="fa-brands fa-css3-alt"/>`style.css` every time style.css changes.

Let’s start Grunt’s Watch:

```sh
./node_modules/.bin/grunt watch
```

Now, we’ll add a CSS3 expression to <FontIcon icon="fa-brands fa-css3-alt"/>`style.css` and save the file:

```css title="style.css"
a {
  width: calc(50% - 2em)
}
```

The magic has just happened and now we have a <FontIcon icon="fas fa-folder-open"/>`build/`<FontIcon icon="fa-brands fa-css3-alt"/>`style.css` file. Grunt detected the change in <FontIcon icon="fa-brands fa-css3-alt"/>`style.css` and launched the Autoprefixer task. Autoprefixer did find the `calc()` value unit, that [needs a vendor](https://caniuse.com/calc) prefix for Safari 6.

```css title="style.css"
a {
  width: -webkit-calc(50% - 2em);
  width: calc(50% - 2em)
}
```

Now we’ll add a little bit more complicated CSS3 to <FontIcon icon="fa-brands fa-css3-alt"/>`style.css` and save the file:

```css title="style.css"
a {
  width: calc(50% - 2em);
  transition: transform 1s
}
```

Autoprefixer already knows that Chrome, Safari 6 and Opera 15 [<FontIcon icon="iconfont icon-caniuse"/>need](https://caniuse.com/css-transitions) prefixes for `transition` and `transform`. But IE 9 also needs a prefix for `transform`, which we used as value in `transition`.

```css title="style.css"
a {
  width: -webkit-calc(1% + 1em);
  width: calc(1% + 1em);
  -webkit-transition: -webkit-transform 1s;
  transition: -ms-transform 1s;
  transition: transform 1s
 }
```

Autoprefixer is designed to perform all the dirty work for you. It will check the Can I Use database, write all the prefixes needed and it does understand the difference between specifications as well. Welcome to the future of CSS3 — no more vendor prefixes!

---

## What Next?

1. Autoprefixer supports Ruby on Rails, [<FontIcon icon="fas fa-globe"/>Middleman](http://middlemanapp.com/), [<FontIcon icon="iconfont icon-github"/>`nodeca/mincer`](https://github.com/nodeca/mincer), Grunt, Sublime Text. Learn more about how to use it with your environment in the [documentation (<FontIcon icon="iconfont icon-github"/>`ai/autoprefixer`)](https://github.com/ai/autoprefixer#usage).
2. If your environment doesn’t support Autoprefixer yet, please, [report it (<FontIcon icon="iconfont icon-github"/>`ai/autoprefixer`)](https://github.com/ai/autoprefixer/issues/new) and I’ll try to help.
3. Follow [<FontIcon icon="fa-brands fa-x-twitter"/>`@autoprefixer`](https://twitter.com/autoprefixer) for info on updates and new features.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Autoprefixer: A Postprocessor for Dealing with Vendor Prefixes in the Best Possible Way",
  "desc": "The following is a guest post by Andrey Sitnik, the creator of the Autoprefixer tool, a ”postprocessor” for handling vendor prefixes in CSS. Why use this",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/autoprefixer.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
