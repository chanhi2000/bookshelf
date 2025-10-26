---
lang: en-US
title: "An advanced guide to setting colors in CSS"
description: "Article(s) > An advanced guide to setting colors in CSS"
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
      content: "Article(s) > An advanced guide to setting colors in CSS"
    - property: og:description
      content: "An advanced guide to setting colors in CSS"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/advanced-guide-setting-colors-css.html
prev: /programming/css/articles/README.md
date: 2022-01-18
isOriginal: false
author:
  - name: Coner Murphy
    url: https://blog.logrocket.com/author/conermurphy/
cover: /assets/image/blog.logrocket.com/advanced-guide-setting-colors-css/banner.png
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
  name="An advanced guide to setting colors in CSS"
  desc="Learn the common and advanced techniques to apply colors with CSS to your projects including HEX, RBG, HSL, HWB, LAB, and LCH."
  url="https://blog.logrocket.com/advanced-guide-setting-colors-css"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/advanced-guide-setting-colors-css/banner.png"/>

Color is one of the first things you learn to apply as a web developer when learning CSS, but once you learn the basics, how often do you revisit it?

With advanced techniques, applying colors with CSS can provide more functionality and depth to projects. In this post, we’ll explore all the common and more advanced ways of applying colors with CSS including some of the exciting methods that will hopefully be widely adopted within CSS soon.

---

## Basic color syntax in CSS

We can’t talk about [**applying colors in CSS**](/blog.logrocket.com/colors-in-css-present-and-future.md) without covering the basics that everyone starts their journey in CSS with: keywords and HEX.

### Keywords

Often the first way new developers learn to apply colors with CSS is using the predefined list of color keywords in CSS. These are a series of words that equate to color that apply to elements:

```css
.SomeElement {
  color: blue;
  background-color: black;
}
```

There’s a fair amount of predefined words you can use. If you’re interested in seeing them, you can check out [<VPIcon icon="fa-brands fa-firefox"/>this section on the MDN page on color.](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#color_keywords)

### HEX values

At a certain point in your CSS journey, it’s natural for a developer to outgrow the predefined words available in CSS and need something more powerful. Often, the next step on the CSS color journey is understanding hexadecimal values, also known as HEX values.

HEX values are great because they are supported by every major browser and offer more flexibility and customizability than what’s offered by the standalone keywords.

However, the one major downside to HEX values is that they are not easily readable or understandable. For example, could you guess what color `#ff8c00` is? That’s right, it’s a bright orange color…

Other than being difficult to understand, they can also be hard to work with. Without using a color picker or a guide of some sort, making HEX values darker or lighter is difficult without fully comprehending how the HEX numerical system works.

And, even if you do have those aids, it’s not as simple or intuitive as just adjusting a single parameter.

Here are some other examples of colors in HEX:

```css
.SomeElement {
  color: #ffffff; /* White */
  background-color: #ff8c00; /* Orange-y color from before */
}
```

---

## Understanding RGB and HSL

Now that we’ve covered the basics of defining color on the web, let’s take a look at two more advanced but more flexible and useable alternatives: RGB and HSL.

### RGB

Red, green, and blue, or RGB, gives us access to the same colors as HEX but in a much more readable and user-friendly format. We define the color by using an `rgb()` function in CSS, which we will see in a moment when we look at some examples.

By using the three parameters passed to the function, we can create colors; however, note that the colors are additive, meaning the more red, green, and blue we add, the lighter the overall color will be.

If we set all three values as high as they go (to 255), then we will end up with white; if we set all three to 0, then we get black:

```css
background-color: rgb(255, 255, 255); /* White */
```

Working with RGB is a lot more logical than HEX while still providing the same colorspace to work within. Here are some examples showing HEX followed by the same RGB value to illustrate this:

```css
/* Dark Red */
#a60000;
rgb(166, 0, 0);
/* Light Blue */
#046cdb rgb(4, 108, 219);
```

![Showing The Colors Rendered With HEX and RGB, The Left Shows The Red With HEX Followed By RGB, And Light Blue On The Left](/assets/image/blog.logrocket.com/advanced-guide-setting-colors-css/showing-colors-rendered-hex-rgb.png)

Although it may not be immediately clear what the RGB yields, it’s a lot more readable than HEX. RGB is a lot better than HEX when it comes to making small changes to a color.

For example, if you wanted to add more red to a HEX color, would you know what to change and what to change it to? But, with RGB, you can just increment the red value by one or two to achieve this.

### HSL

Although RGB is nice and a step in the right direction from HEX, it still has its pitfalls when it comes to the question, “Can you make this 30% darker for me?”

Taking one of the RGB values from above, try to make one of those colors 30 percent darker without an aid. While you’ll probably do it faster than you would with HEX, it’s still far from ideal because RGB values don’t directly map to the lightness of the value.

To make the color darker, you would need to experiment with all three values to achieve the desired outcome. But, this is where the wonderful hue, saturation, and lightness (HSL) comes in.

As a developer, HSL is a dream because it provides a more logical method for handling colors and manipulating them because it uses parameters to adjust the color properties.

However, there is a bit of a steeper learning curve when using HSL because, unlike RGB where we deal with colors we already know (red, blue, and green), HSL requires us to learn some color science like the hue and saturation of colors.

Let’s now take a look at defining colors in HSL with its three main parameters to get a better understanding of how this color scheme works.

- The `hue` parameter represents the position on the color wheel, ranging from `0` to `360deg`
- The `saturation` parameter represents how saturated a color is, ranging from `0` to `100%`
- The `lightness` parameter represents how light a color is, ranging from `0` to `100%`

Note that if you set the lightness to `0`, regardless of the other parameters, you get black, and if you set it to `100%`, you get white.

[<VPIcon icon="fas fa-globe"/>Below is a diagram](https://researchgate.net/publication/335024102/figure/fig2/AS:789313210036225@1565198342617/a-Color-wheel-of-hue-b-The-HSL-model-Creative-Commons.ppm) that shows the HSL color space and how you can manipulate it using the three parameters outlined above.

![HSL Diagram Showing A 2D and 3D Color Wheel](/assets/image/blog.logrocket.com/advanced-guide-setting-colors-css/hsl-diagram.jpeg)

Here are the same colors that we defined previously with HEX and RGB, but now with their corresponding HSL values:

```css
/* Dark Red */
#a60000;
rgb(166, 0, 0);
hsl(0°, 100%, 33%);

/* Light Blue */
#046cdb rgb(4, 108, 219);
hsl(211°, 96%, 44%);
```

![Showing Colors Rendered In HEX, RGB, And HSL,Shown In Dark Red On The Left And Light Blue On The Right](/assets/image/blog.logrocket.com/advanced-guide-setting-colors-css/showing-colors-rendered-hex-rgb-hsl.png)

Once you understand the color science behind HSL and can manipulate its three properties, using HSL becomes a lot more flexible than RGB.

With HSL you can easily change the lightness of the color without online tools assistance. For example, imagine you have a button on a form that has a disabled state. With HSL, you can make the disabled state darker by simply decreasing the lightness parameter to achieve the effect.

On the other hand, with RGB, you would need to either need to experiment with the values or use an online tool to help, neither being an efficient process.

### Using the alpha channel with HSL and RGB

A final note to mention in regards to HSL and RGB is that you can now pass an optional fourth parameter to control the alpha channel; in layman’s terms, we’re controlling the transparency of the color. Here are some examples using that:

```css
hsl(211° 96% 44% / .5); /* 50% opacity */
hsl(0° 100% 33% / .25); /* 25% opacity */

rgb(166 0 0 / 0.7); /* 70% opacity */
rgb(4 108 219 / 0.3); /* 30% opacity */
```

The keen-eyed among you may also notice something different about the above syntax: that’s right, no commas. Thanks to [<VPIcon icon="iconfont icon-w3c"/>CSS Color Module Level 4](https://w3.org/TR/css-color-4), you can now use spaces to separate values and pass an optional fourth parameter preceded with a `/` to control the alpha channel.

---

## Using advanced color spaces

With the most common methods of defining colors in CSS covered, let’s take a look at some of the more experimental ways of defining color that is quite possibly the future of defining color in CSS.

These are currently considered experimental because of their limited browser support at the time of writing this post.

### HWB

Hue, whiteness, and blackness (HWB) is similar to HSL. The `hue` parameter can be set anywhere from `0` to `360deg`, but, unlike HSL, we can control the saturation and the lightness by controlling the amount of white or black added into the original hue we selected.

Try mixing HWB colors through the CodePen below. Note that HWB can only be seen in the [<VPIcon icon="fas fa-globe"/>Safari browser](https://caniuse.com/?search=hwb) or the Firefox Developer browser:

<CodePen
  user="conermurphy"
  slug-hash="bGoOWzJ"
  title="HWB Color Playground"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

But, why use HWB instead of something like HSL, which arguably provides more granular controls because it allows you to adjust the saturation of the color? Well, the reason HWB was designed was to be [<VPIcon icon="fas fa-globe"/>more intuitive for humans to use and faster to compute than other methods](https://drafts.csswg.org/css-color/#the-hwb-notation).

With HWB, if you want a lighter color, add white; if you want a darker color, add black. It doesn’t get simpler than that.

Here are our examples from before but with HWB added:

```css
/* Dark Red */
#a60000;
rgb(166 0 0);
hsl(0 100% 33%);
hwb(0 0% 35%);

/* Light Blue */
#046cdb rgb(4 108 219);
hsl(211 96% 44%);
hwb(211 2% 14%);
```

![Showing Colors Rendered In HEX, RGB, HSL, And HWB, Dark Red On The Left And Light Blue On The Right](/assets/image/blog.logrocket.com/advanced-guide-setting-colors-css/showing-colors-rendered-hex-rgb-hsl-hwb.png)

### LAB

Both LAB and LCH (which we’ll come to in a moment), are defined as device-independent colors, meaning that no matter where you apply the color coordinates, you get the same color output.

If you took a LAB value and applied it across different mediums, from a website, to digital art, to something physically printed, the color would remain the same. This uniformity is one of the key benefits of the LAB and LCH color spaces.

To use LAB, there are three parameters you need to pass in: `L`, `A`, and `B`.

The lightness (`L`) parameter, similar to others discussed in this article, accepts a percentage between 0 and 100 with `0%` as black and `100%` as white.

However, different from the other methods we’ve covered, LAB uses the a-axis (`A`) and b-axis (`B`) parameters to define color.

The `a` parameter represents how far along the a-axis in the LAB colorspace you want to go between green and red. Similarly, the `b` parameter represents how far along the b-axis in the LAB colorspace you want to go between blue and yellow.

Conceptually, LAB is one of the harder color spaces to grasp since it moves through space rather than linear numbers. So, here is a [<VPIcon icon="fas fa-globe"/>visual representation of the colorspace](https://researchgate.net/profile/Sudhir-Shukla-3/publication/23789543/figure/fig3/AS:276894424551429@1443028183655/The-cubical-CIE-Lab-color-space.png) to show how the values work together to create a color.

![Lab Color Space Diagram Showing The Axis That Control Color Manipulation Within A Sphere](/assets/image/blog.logrocket.com/advanced-guide-setting-colors-css/lab-color-space-diagram.png)

Also, here is another pen to show the LAB colorspace in use, but can only be seen in a Safari browser.

Here are our examples from before but with LAB added:

<CodePen
  user="conermurphy"
  slug-hash="GRMPEyb"
  title="LAB Color Playground"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

```css
/* Dark Red */
#a60000;
rgb(166 0 0);
hsl(0 100% 33%);
hwb(0 0% 35%);
lab(34% 58 48);

/* Light Blue */
#046cdb rgb(4 108 219);
hsl(211 96% 44%);
hwb(211 2% 14%);
lab(46% 17 -63);
```

[<VPIcon icon="fas fa-globe"/>If you are using Safari](https://caniuse.com/?search=LAB), you can view the LAB color rendered in the CodePen below.

<CodePen
  user="conermurphy"
  slug-hash="NWaejjE"
  title="CSS Colour Values"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

### LCH

The final colorspace and method for defining color in CSS we will look at is lightness, chroma, and hue (LCH).

Once again, similar to the other color functions that use a lightness value, the lightness parameter accepts a percentage between 0 and 100, with `0%` as black and `100%` as white.

However, LCH introduces chroma, which indicates the amount of color we want to use; conceptually it is similar to saturation in HSL, but chroma is theoretically limitless.

Before getting too excited, however, while chroma is theoretically limitless, there is, unfortunately, a limit on the colors our browsers and monitors can display. So, beyond a certain point (around `230`), the value you choose is unlikely to make any noticeable difference to the user.

And finally, as with HSL, the hue can be expressed from `0` to `360` with the value selected driven from the position on the color wheel.

---

## Why do we need advanced color spaces?

At this point, you may be rightfully asking why do we need color spaces in CSS like LAB and LCH; what’s wrong with HSL? With the introduction of LAB and LCH, developers can now access the entire spectrum of colors humans can perceive, while HSL (or the others) cannot.

The flipside to this however is the issues with syntax and support. The syntax for LAB and LCH are less intuitive and currently have very little browser support (Safari only), so you need to give a fallback value in another more widely supported method for the time being.

But, once the syntax has more support in other browsers, both LAB and LCH are powerful options for [<VPIcon icon="fas fa-globe"/>specifying colors in CSS](https://blog.logrocket.com/tag/css/).

As with LAB, LCH is also another tricky color space to grasp, so here is another [<VPIcon icon="fas fa-globe"/>diagram showing the LCH color space](https://researchgate.net/profile/Malgorzata-Perz/publication/265155524/figure/fig18/AS:295878511349770@1447554342906/A-Simplified-LCh-color-space-B-LCh-color-space.png) and how the parameters influence the color we get.

![LCH Diagram Showing 3D Example Of How Colors Are Picked Through A Wheel And Axis](/assets/image/blog.logrocket.com/advanced-guide-setting-colors-css/lch-diagram.png)

### Using the alpha channel in HWB, LAB, and LCH

Finally, as with the other color function in CSS, `hwb()`, `lab()`, and `lch()` can take a fourth optional parameter to control the alpha channel:

```css
hwb(0 0% 35% / .5);
lab(34% 58 48 / .24);
lch(34% 75 39 / .9);
```

Here are our examples from before but with LCH added:

```css
/* Dark Red */
#a60000;
rgb(166 0 0);
hsl(0 100% 33%);
hwb(0 0% 35%);
lab(34% 58 48);
lch(34% 75 39);

/* Light Blue */
#046cdb rgb(4 108 219);
hsl(211 96% 44%);
hwb(211 2% 14%);
lab(46% 17 -63);
lch(46% 65 285);
```

If you are using Safari, you can view the LCH color rendered in the CodePen below.

<CodePen
  user="conermurphy"
  slug-hash="NWaejjE"
  title="CSS Colour Values"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

---

## Browser support

The four methods for defining colors we looked at first (keywords, HEX, RGB, and HSL) are all widely supported across the major browsers, so you don’t need to worry about using them and wondering if they will work or not.

But, the methods for defining colors we looked at in the latter half of the article (HWB, LAB, and LCH) are still in the early days of support, so if you use them, define a fallback value in one of the four mentioned above to be safe.

If you’re curious to check out the browser support for the individual methods below are the links to each page on [<VPIcon icon="fas fa-globe"/>caniuse](https://caniuse.com):

```component VPCard
{
  "title": "types: `<color>`: RGB hexadecimal notation (`#RRGGBB`, `#RGB`, …) | Can I use... Support tables for HTML5, CSS3, etc",
  "desc": "types: `<color>`: RGB hexadecimal notation (`#RRGGBB`, `#RGB`, …)",
  "link": "https://caniuse.com/mdn-css_types_color_rgb_hexadecimal_notation/",
  "logo": "https://caniuse.com/img/favicon-128.png",
  "background": "rgba(122,58,20,0.2)"
}
```

- [RGB](https://caniuse.com/?search=RGB)
- [HSL](https://caniuse.com/?search=HSL)
- [HWB](https://caniuse.com/?search=HWB)
- [LAB](https://caniuse.com/?search=LAB)
- [LCH](https://caniuse.com/?search=LCH)

---

## Conclusion

So, that’s it! In this article, we covered every way [**you can set colors in CSS**](/blog.logrocket.com/how-to-manipulate-css-colors-with-javascript.md) including some of the new and exciting methods yet to become widely supported in CSS as well as why and how to use each method for your next project.

I hope you found this article on setting colors in CSS helpful. If you did, [please consider following me over on Twitter (<VPIcon icon="fa-brands fa-x-twitter"/>`MrConerMurphy`)](https://x.com/MrConerMurphy), where I post helpful and actionable tips and content on the JavaScript ecosystem and web development as a whole. Or if Twitter isn’t your thing, [<VPIcon icon="fas fa-globe"/>visit my blog](https://conermurphy.com/blog) for more of my content.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "An advanced guide to setting colors in CSS",
  "desc": "Learn the common and advanced techniques to apply colors with CSS to your projects including HEX, RBG, HSL, HWB, LAB, and LCH.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/advanced-guide-setting-colors-css.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
