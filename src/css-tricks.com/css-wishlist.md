---
lang: en-US
title: "CSS Wishlist: 21 Designer/Developers Sound Off"
description: "Article(s) > CSS Wishlist: 21 Designer/Developers Sound Off"
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
      content: "Article(s) > CSS Wishlist: 21 Designer/Developers Sound Off"
    - property: og:description
      content: "CSS Wishlist: 21 Designer/Developers Sound Off"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/css-wishlist.html
prev: /programming/css/articles/README.md
date: 2013-01-25
isOriginal: false
author:
  - name: Chris Coyier
    url : https://css-tricks.com/author/chriscoyier/
cover: https://i0.wp.com/css-tricks/wp-content/csstricks-uploads/css-gradshadow.jpg
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
  name="CSS Wishlist: 21 Designer/Developers Sound Off"
  desc="I asked a bunch of designers what they thought needed to change in CSS."
  url="https://css-tricks.com/css-wishlist"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks/wp-content/csstricks-uploads/css-gradshadow.jpg"/>

I asked a bunch of designers what they thought needed to change in CSS.

![](https://i0.wp.com/css-tricks.com/wp-content/csstricks-uploads/css-gradshadow.jpg?resize=150%2C150)

### [](#aa-wolfgang-bartelme)Wolfgang Bartelme

#### [](#aa-designer-at-bartelme-design)Designer at [Bartelme Design](http://www.bartelme.at/)

> I’d love to see cross-browser support for gradients, shadows, opacity masks and rounded corners. I guess that would not just dramatically reduce bandwidth, but also speed up production and customization.

![](https://i0.wp.com/css-tricks.com/wp-content/csstricks-uploads/css-boxmodel.jpg?resize=150%2C150)

### [](#aa-jon-hicks)Jon Hicks

#### [](#aa-designer-at-hicksdesign)Designer at [hicksdesign](http://www.hicksdesign.co.uk/)

> I would love a different box model! I find it bizarre that padding and border add the width of an object, and would love to be able to give something like a textarea 100% width and 3px padding without worrying what it’s going to do the layout. Perhaps something like padding-inside as a new selector?
> 
> In that vain I also wish I could specify a 100% width for an element, minus a set fixed width. Again, very useful when creating fluid designs with form elements!

![](https://i0.wp.com/css-tricks.com/wp-content/csstricks-uploads/css-css3.jpg?resize=150%2C150)

### [](#aa-andy-budd)Andy Budd

#### [](#aa-author-and-web-standards-pioneer-andybudd-com)Author and Web Standards Pioneer: [AndyBudd.com](http://www.andybudd.com/)

> Most of the stuff I want is in CSS3, so what I actually want is the core modules finished and implemented fully by at least two browser vendors.

![](https://i0.wp.com/css-tricks.com/wp-content/csstricks-uploads/css-slow.jpg?resize=150%2C150)

### [](#aa-david-walsh)David Walsh

#### [](#aa-web-development-blogger-david-walsh-blog)Web Development Blogger: [David Walsh Blog](http://davidwalsh.name/)

> I think that the lack of font abilities that we’ve been living with is a sin. Our other options for using non-standard web fonts, sIFR and utilizing images, are painful and have really held the creativity of the web back. I also believe that standard corner-rounding properties must be added — we’re all tired of creating rounded-corner images and browser-specific hacks to achieve our goals. Lastly, I wish CSS would be implemented in browsers faster. We’ve had little advancement in the past few years.

![](https://i0.wp.com/css-tricks.com/wp-content/csstricks-uploads/css-inherit.jpg?resize=150%2C150)

### [](#aa-collis-taeed)Collis Ta’eed

#### [](#aa-entrepreneur-blogger-designer-at-envato-home)Entrepreneur, Blogger, Designer at [Envato](http://envato.com/), [Home](http://collistaeed.com/)

> The biggest problem I have with my CSS is that with large sites it gets very unwieldy. On a site like FlashDen the CSS goes on for miles, and then I have a second set of sheets to apply to change all the styles for people visiting alternate versions of the site (ThemeForest or AudioJungle). Even with the best intentions, it’s pretty messy.
> 
> I wish that I could have an inheritance concept in CSS like you have in object oriented programming. So you could go:
> 
> ```css
> .button {  
>  /* some styles */
> }
> .button >> .sidebar_button { 
> /* inherits all of .button and adds new styles */
> }
> ```
> 
> I know that currently I could just define it like this:
> 
> ```css
> .button, .sidebar_button {  
> /* some styles */
> }
> .sidebar_button { 
> /* inherits all of .button and adds new styles */
> }
> ```
> 
> But somehow that doesn’t seem like an elegant way to do things. And if the first and second definitions happen to be separated by a large block of other CSS code, when you come back to read your CSS later, there is no way for you to know that .sidebar_button has some more styles attached to it. Whereas the inheritance version above, you can read that it’s a derivative of .button.

![](https://i0.wp.com/css-tricks.com/wp-content/csstricks-uploads/css-embed.jpg?resize=150%2C150)

### [](#aa-keith-robinson)Keith Robinson

#### [](#aa-creative-director-at-blue-flavor-home)Creative Director at [Blue Flavor](http://www.blueflavor.com/), [Home](http://www.dkeithrobinson.com/)

> I wish CSS could handle embedded fonts in the manner we use sIFR now,

![](https://i0.wp.com/css-tricks.com/wp-content/csstricks-uploads/redo.jpg?resize=150%2C150)

### [](#aa-shaun-inman)Shaun Inman

#### [](#aa-designer-developer-of-mint-home)Designer/Developer of [Mint](http://haveamint.com/), [Home](http://www.shauninman.com/)

> Here’s the thing, one more half-baked, tacked-on stopgap isn’t going to improve CSS in any meaningful way-it would only compound a fundamental flaw in its design. CSS feels like a style sheet implementation you’d find in a late 90’s desktop publishing app. It’s still very text-centric. Style sheets just weren’t designed for creating complex layouts. CSS’s layout features are tacked on-and 10 years later it definitely shows.
> 
> I’d love to see the CSS Text Module rewritten by experienced typographers and typesetters and the CSS Layout Module rewritten by experienced publication designers, both traditional and newfangled.
> 
> And sometime before 2022 if at all possible.

![](https://i0.wp.com/css-tricks.com/wp-content/csstricks-uploads/css-vars.jpg?resize=150%2C150)

### [](#aa-jeffrey-jordan-way)Jeffrey Jordan Way

#### [](#aa-editor-at-nettuts-and-themeforest-blog-home)Editor at [NETTUTS](http://nettuts.com) and [ThemeForest Blog](http://blog.themeforest.net/), [Home](http://www.detacheddesigns.com/)

> I wish we could assign variables in our stylesheets. For example, it would be nice if, rather than having to scroll to the top of my document every time I needed to grab the hex value for my chosen “blue”, I could simply assign that value to a variable called “myBlue”.
> 
> ```css
> var myBlue = #191955;
> 
> #someElement{
>   color: myBlue;
> }
> ```
> 
> This is a topic that has been debated to death, and truthfully, it might prove to be a bad idea. I’m still not sure. I could swing either way in such a discussion. Once you open that door, you sort of lose the whole concept of CSS. But, I think if done responsibly, variable assigning could potentially save us a great deal of time when designing.

![](https://i0.wp.com/css-tricks.com/wp-content/csstricks-uploads/css-multipleways.jpg?resize=150%2C150)

### [](#aa-steven-vandelay)Steven Vandelay

#### [](#aa-designer-at-vandelay-design)Designer at [Vandelay Design](http://vandelaydesign.com/)

> One of the great things about working with CSS is that there’s usually different ways to approach something that you’re trying to accomplish, but in some ways I would like to see more standardization when it comes to layouts.

![](https://i0.wp.com/css-tricks.com/wp-content/csstricks-uploads/css-tea.jpg?resize=150%2C150)

### [](#aa-andy-clarke)Andy Clarke

#### [](#aa-author-designer-and-developer-stuff-and-nonsense)Author, Designer, and Developer: [Stuff and Nonsense](http://www.stuffandnonsense.co.uk/)

> Well, aside from the obvious (making sure that Obama gets elected, making me very rich and making me a cup of nice tea) what I would like most from CSS are better layout tools to allow me to create rich, intricate designs without the need to add presentational elements into my markup. The CSS Working Group (of which I am a former member) have been working hard on these layout tools. I hope that before too long we will see the browser makers implementing these proposals (using -browser- extensions) so that designers and developers can experiment with them.

![](https://i0.wp.com/css-tricks.com/wp-content/csstricks-uploads/css-border.jpg?resize=150%2C150)

### [](#aa-chris-spooner)Chris Spooner

#### [](#aa-designer-at-spoongraphics-home)Designer at [SpoonGraphics](http://www.spoongraphics.co.uk/), [Home](http://www.chrisspooner.com/)

> Multiple Backgrounds, Rounded Corners, Border Images and Opacity are my first thoughts when asked what I wish CSS could do, then I remember - these are all in the pipeline for CSS3! In this case, my dreams are coming true in terms of CSS, which makes the question; Is there anything you wish Browsers could do?!
> 
> One CSS technique I wish there was a shorter technique for would be to easily make a two or three column layout with equal height sidebars without the use of the faux column method.

![](https://i0.wp.com/css-tricks.com/wp-content/csstricks-uploads/conditionals.jpg?resize=150%2C150)

### [](#aa-elliot-jay-stocks)Elliot Jay Stocks

#### [](#aa-designer-writer-and-speaker-home)Designer, Writer and Speaker, [Home](http://elliotjaystocks.com/blog/)

> I’d like to see conditionals natively supported in CSS without the need for workarounds such as (the excellent) [Conditional-CSS](http://conditional-css.com). Many people argue that browser detection is essentially something that should be handled outside of a stylesheet, but all of the HTML-based conditional comments I use to handle IE-specific code is entirely to call in ‘hack’ CSS files. The implementation of code along the lines of what we use to target Gecko- or WebKit-based browsers would be a hugely welcome addition for me.

![](https://i0.wp.com/css-tricks.com/wp-content/csstricks-uploads/css-layerstyles.jpg?resize=150%2C150)

### [](#aa-nick-la)Nick La

#### [](#aa-designer-web-designer-wall-n-design-studio)Designer - [Web Designer Wall](http://www.webdesignerwall.com/), [N.Design Studio](http://www.ndesign-studio.com/)

> I wish CSS could do layer styles like Photoshop where you can add: inner shadow, outer glow, bevel effects, etc. It would be even better if we could have layer blending mode.

![](https://i0.wp.com/css-tricks.com/wp-content/csstricks-uploads/css-vars.jpg?resize=150%2C150)

### [](#aa-jesse-bennett-chamberlaindesigner-at-31three)Jesse Bennett-Chamberlain

#### Designer at [31Three](http://31three.com/)

> The only thing that comes to mind would be variables. I don’t get my hands too dirty with code very much any more, but variables would be quite handy for when I do. Ask me what I would like Photoshop to do and I could give you a much longer answer :)

![](https://i0.wp.com/css-tricks.com/wp-content/csstricks-uploads/css-grouping.jpg?resize=150%2C150)

### [](#aa-volkan-gorgulu)Volkan Görgülü

#### [](#aa-designer-developer-web-deneyimleri)Designer / Developer - [Web Deneyimleri](http://webdeneyimleri.donanimhaber.com/)

> I wish instead of writing
> 
> #sample h1, #sample h2, #sample h3 —> (long and ugly)
> 
> something like this
> 
> #sample [h1, h2, h3] —> (short and clean)
> 
> would do the job :)
> 
> Another example can be
> 
> #sample a:link, #sample a:visited
> 
> #sample a [link, visited]

![](https://i0.wp.com/css-tricks.com/wp-content/csstricks-uploads/csswish-transpborder.jpg?resize=150%2C150)

### [](#aa-veerle-pieters)Veerle Pieters

#### [](#aa-designer-at-duoh-blog)Designer at [Duoh!](http://www.duoh.com/), [Blog](http://veerle.duoh.com/)

> I wish CSS had support for gradient borders and easier usage for transparency, like in InDesign or Quark for example. Applicable on every possible object, text etc. Easier and more logical way of floating elements. Lastly that we don’t have to wait on CSS 3 for another 5 years. I also wish that CSS would get mad and punish if some browsers don’t behave :)

![](https://i0.wp.com/css-tricks.com/wp-content/csstricks-uploads/csswish-css3.jpg?resize=150%2C150)

### [](#aa-jonathan-snook)Jonathan Snook

#### [](#aa-designer-developer-at-sidebar-creative-home)Designer/Developer at [Sidebar Creative](http://sidebarcreative.com/), [Home](http://snook.ca/)

> I’d love to see consistent implementations across all major browsers for CSS3 features like multiple backgrounds, border-radius, and border-image. CSS Transforms would be handy, too. They might seem gimmicky but there are plenty of practical reasons for it like long headers names for narrow columns in a data table. Being able to rotate elements would improve the design while maintaining accessibility (and avoiding have to resort to images). The landscape in 5 years will, I believe, offer us plenty of functionality we don’t enjoy now.

![](https://i0.wp.com/css-tricks.com/wp-content/csstricks-uploads/csswish-gridbased.jpg?resize=150%2C150)

### [](#aa-eric-meyer)Eric Meyer

#### [](#aa-web-standards-writer-and-speaker-home)Web Standards Writer and Speaker, [Home](http://meyerweb.com/)

> Strong grid-based layout. We still don’t have it, and it’s needed. At this point I honestly don’t care if it’s accomplished through CSS or some other new language.

![](https://i0.wp.com/css-tricks.com/wp-content/csstricks-uploads/csswish-coop.jpg?resize=150%2C150)

### [](#aa-cameron-moll)Cameron Moll

#### [](#aa-designer-speaker-author-home)Designer, Speaker, Author, [Home](http://cameronmoll.com/)

> First and foremost, I’d like CSS to answer my email.
> 
> Second, I’d like CSS to convince browser developers to cooperatively and incrementally include “future” CSS features and proposals today, rather than waiting for a full spec to be “officially” released.
> 
> Wishful thinking? Perhaps, though I anticipate the first may happen before the second.

![](https://i0.wp.com/css-tricks.com/wp-content/csstricks-uploads/csswish-typography.jpg?resize=150%2C150)

### [](#aa-dan-rubin)Dan Rubin

#### [](#aa-user-experience-director-at-sidebar-creative-home)User Experience Director at [Sidebar Creative](http://sidebarcreative.com/), [Home](http://superfluousbanter.org)

> I’d love to see the W3C bring in a proper typographer and book designer to help craft the type and layout parts of the specification. Someone like Robert Bringhurst would be ideal, as both an expert typographer and book designer, so the specification would be created with designers’ needs in mind, rather than by programmers.
> 
> In a feature-specific way, I would hope this results in much better typographic control, and a web equivalent to “master pages”, which are an old standard in print design software.

![](https://i0.wp.com/css-tricks.com/wp-content/csstricks-uploads/csswish-bgorigin.jpg?resize=150%2C150)

### [](#aa-stephanie-sullivan)Stephanie Sullivan

#### [](#aa-coder-trainer-writer-at-w3conversions)Coder, Trainer, Writer at [W3Conversions](http://www.w3conversions.com/)

> Outside the holy grail of creating equal height columns without using a faux method (while still supporting browsers like IE6 and IE7), I’d love to see a way to set background positioning from the bottom or right side of an element. No, I don’t mean setting them all the way to the bottom or right, of course we can do that now. I mean setting a background image that’s not quite at the bottom or right and remains a specific value away from it. It’s not possible to accurately determine the height of elements containing text, so setting the background image 350px from the top will give wildly variable results in relation to the bottom of the element. Having a reliable way to set a background image 20px from the bottom without adding a non-semantic wrapper, could in some circumstances be very helpful.

### [](#aa-some-great-ideas-from-the-comments)Some great ideas from the comments:

- [Andy Ford](http://aloestudios.com/):  
    *I’d like to see a “height-increment” property.*  
    Essentially making a block level element only grow in height in specified “chunks” rather than pixel by pixel.
- [Tony Freixas](http://www.tigerheron.com/):  
    *GUI applications have access to rich layout tools that could easily have been adapted to Web layout, but were completely ignored.*  
    Layout is definitely something that could be entirely re-written.
- [Andy Pemberton](http://www.andypemberton.com/):  
    *CSS needs a more advanced “fallback” support model.*  
    Right now, we can specify multiple fonts to ‘fallback’ to, but what if that fallback font really could use some negative letter-spacing too?

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "CSS Wishlist: 21 Designer/Developers Sound Off",
  "desc": "I asked a bunch of designers what they thought needed to change in CSS.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/css-wishlist.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
