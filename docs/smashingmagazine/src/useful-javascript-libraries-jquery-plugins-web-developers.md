---
lang: en-US
title: "Practical JavaScript Libraries and jQuery Plugins"
description: "Article(s) > Practical JavaScript Libraries and jQuery Plugins"
icon: iconfont icon-jQuery
category:
  - JavaScript
  - jQuery
  - Article(s)
tag:
  - blog
  - smashingmagazine.com
  - js
  - javascript
  - jquery
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Practical JavaScript Libraries and jQuery Plugins"
    - property: og:description
      content: "Practical JavaScript Libraries and jQuery Plugins"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/smashingmagazine.com/useful-javascript-libraries-jquery-plugins-web-developers.html
prev: /programming/js/articles/README.md
date: 2012-09-23
isOriginal: false
author:
  - name: Vitaly Friedman
    url: https://smashingmagazine.com/author/vitaly-friedman/
cover: https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/28346827-2584-45f2-b364-652e094db636/complexify.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "JavaScript > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Practical JavaScript Libraries and jQuery Plugins"
  desc="In this two-part overview, we feature some of the most useful JavaScript and jQuery libraries which could be just the right solutions for your common problems. We hope that this overview will help you find or rediscover some tools that you could use in your next projects."
  url="https://smashingmagazine.com/2012/09/useful-javascript-libraries-jquery-plugins-web-developers/"
  logo="https://smashingmagazine.com/images/favicon/favicon.svg"
  preview="https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/28346827-2584-45f2-b364-652e094db636/complexify.png"/>

In this two-part overview, we feature some of the most useful JavaScript and jQuery libraries which could be just the right solutions for your common problems. We hope that this overview will help you find or rediscover some tools that you could use in your next projects.

If you have a problem and need a solution for it, chances are high that a JavaScript library or jQuery plugin exists that was created to solve this very problem. Such libraries are always great to have in your bookmarks or in your local folders, especially if you aren’t a big fan of cross-browser debugging.

A JavaScript library isn’t always the best solution: it should never be a single point of failure for any website, and neither should a website rely on JavaScript making the content potentially inaccessible. Progressive enhancement is our friend; sometimes JavaScript won’t load properly, or won’t be supported — e.g. users of mobile devices might run into [<VPIcon icon="fas fa-globe"/>latency issues](https://igvita.com/2012/07/19/latency-the-new-web-performance-bottleneck/) or [<VPIcon icon="iconfont icon-slideshare"/>performance issues](https://slideshare.net/stoyan/javascript-performance-patterns) with some JavaScript-libraries. Often large all-around JavaScript libraries such as jQuery might be an overkill, while tiny JavaScript micro-libraries could serve as good, “light” alternatives for a particular problem. We’ll present some of them today.

In this two-part overview, we feature some of the most useful JavaScript and [**jQuery**](/smashingmagazine.com/50-jquery-function-demos-for-aspiring-web-developers.md) libraries which could be just the right solutions for your common problems. You might know some of these libraries, but you probably don’t know all of them. In either case, we hope that this overview will help you find or rediscover some tools that you could use in your next projects.

Due to the length of this post, we’ve split it into two parts for your convenience:

::: info Article Series

- **Part 1: Web Forms, Typography, Time-Savers and Images**

```component VPCard
{
  "title": "Useful JavaScript Libraries and jQuery Plugins — Part 2",
  "desc": "In this two-part overview, we feature some of the most useful JavaScript and jQuery libraries which could be just the right solutions for your common problems. We hope that this overview will help you find or rediscover some tools that you could use in your next projects.",
  "link": "/smashingmagazine.com/useful-javascript-libraries-jquery-plugins-part-2.md",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```

:::

::: info Quick Overview:

Below you’ll find a brief overview and links to the libraries and tools featured in this post. They are supposed to help you find just the right tool quickly without browsing the whole page.

- **Web Forms:** framework - [auto-saving drafts](https://smashingmagazine.com/2011/12/05/sisyphus-js-client-side-drafts-and-more/) - [file upload (<VPIcon icon="iconfont icon-github"/>`blueimp/jQuery-File-Upload`)](https://github.com/blueimp/jQuery-File-Upload) (and [resuming large downloads (<VPIcon icon="iconfont icon-github"/>`23/resumable.js`)](https://github.com/23/resumable.js)) - [select boxes](https://ivaynberg.github.com/select2/) - [modal boxes](https://labs.voronianski.com/jquery.avgrund.js/) - [form accordion (<VPIcon icon="iconfont icon-github"/>`OliverJAsh/FormAccordion`)](https://github.com/OliverJAsh/FormAccordion) - [dynamic labels (<VPIcon icon="iconfont icon-github"/>`remybach/jQuery.superLabels`)](https://github.com/remybach/jQuery.superLabels) - [drop-down with images](https://designwithpc.com/Plugins/ddSlick) - [tooltips](https://projects.nickstakenburg.com/tipped) - [extended input](https://textextjs.com/) - [form validation](https://rickharrison.github.com/validate.js/) - credit card validation ([alternative](https://egrappler.com/jquery-credit-card-validation-plugin-smart-validate/)) - [email check (<VPIcon icon="iconfont icon-github"/>`Kicksend/mailcheck`)](https://github.com/Kicksend/mailcheck) - [password complexity (<VPIcon icon="iconfont icon-github"/>`danpalmer/jquery.complexify.js`)](https://github.com/danpalmer/jquery.complexify.js)
- **Web Typography:** repairing vertical baseline - [align text to a grid (<VPIcon icon="iconfont icon-github"/>`ftlabs/ftcolumnflow`)](https://github.com/ftlabs/ftcolumnflow) - [responsive measure](https://jbrewer.github.com/Responsive-Measure/) - [fixing widows](https://artequalswork.com/posts/on-widows.php) - [fluid line height](https://nicewebtype.com/notes/2012/02/03/molten-leading-or-fluid-line-height/) - [scalable headlines](https://fittextjs.com/) (or smart headlines) - [Lettering.js](https://letteringjs.com/) - [Kerning.js](https://kerningjs.com/)
- **Little Time-Savers:** [exchange rates and currency](https://josscrowcroft.github.com/money.js/) - [date/time formatting](https://momentjs.com/) - [relative timestamps](https://pragmaticly.github.com/smart-time-ago/) - [number and currency formatting](https://josscrowcroft.github.com/accounting.js/) - [cookies.js (<VPIcon icon="iconfont icon-github"/>`ScottHamper/Cookies`)](https://github.com/ScottHamper/Cookies) - [zip.js](https://gildas-lormeau.github.com/zip.js/) - [extra string methods](https://stringjs.com/) - [countdown.js](https://countdownjs.org/) - [sticky content](https://viget.com/inspire/jquery-stick-em) - [Google Maps](https://hpneo.github.com/gmaps/) - [progress bar](https://widgets.better2web.com/loader/) - [favicon notifications](https://lipka.github.com/piecon/) (or [Notificon (<VPIcon icon="iconfont icon-github"/>`makeable/Notificon`)](https://github.com/makeable/Notificon))
- **Images, Maps, Graphs:** [world maps](https://jvectormap.com/) - [subway map](https://kalyani.com/2010/10/subway-map-visualization-jquery-plugin/) - [Google maps](https://hpneo.github.com/gmaps/) - [SVG fallback](https://twostepmedia.co.uk/svgeezy/) - [gauges](https://justgage.com/) - [graphs](https://arborjs.org/) - [timeline](https://timeline.verite.co/) - [Retina display](https://retinajs.com/) - [magnifying glass](https://thecodeplayer.com/walkthrough/magnifying-glass-for-images-using-jquery-and-css3) - [interactive graphs](https://code.shutterstock.com/rickshaw/) - [plots](https://flotcharts.org/) - [time visualization](https://square.github.com/cubism/)

:::

---

## Web Forms and Input Validation

### Select2 jQuery Plugin

```component VPCard
{
  "title": "Select2",
  "desc": "The jQuery replacement for select boxes",
  "link": "https://select2.org/",
  "logo": "https://select2.org/images/favicon.ico",
  "background": "rgba(84,109,120,0.2)"
}
```

<SiteInfo
  name="select2/select2"
  desc="Select2 is a jQuery based replacement for select boxes. It supports searching, remote data sets, and infinite scrolling of results."
  url="https://github.com/select2/select2/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/040bf8edef8ca8ab685544d8e98535271bdb07cbc5d049d674d4c1ea2963e01a/select2/select2"/>

A jQuery-plugin for replacement and enhancement of `<select>`-boxes. The plugin supports search, remote data sets, and infinite scrolling of results. Users can just start typing what they’re looking for. Non-matching entries are removed from the view, and options can be selected using “Enter” or a mouse click. The plug-in works with standard select input fields as well as with multiple selects and `optgroup`. It also has support for `selected`, `disabled` and default text (HTML5’s `placeholder` attribute). The plug-in is based on [<VPIcon icon="iconfont icon-github"/>`harvesthq/chosen`](https://github.com/harvesthq/chosen/), an alternative solution which is currently available in jQuery, MooTools and Prototype flavors and as a Drupal 7 module.

![JavaScript Library](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/f272c7af-5977-4e04-aef2-3f88e58b81db/select2.gif)

### jQueryCoreUISelect

Another cross-browser solution to enhance the `<select>` element with jQuery and CSS. Requires jQuery 1.6 or higher. It provides full customization, support of `optiongroup`, automatic calculations, keyboard support, callback functions and is compatible with mobile devices.

![jQueryCoreUISelect](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/2009713b-2eed-4099-9457-dbfd064ab55c/select.png)

### Sisyphus.js

```component VPCard
{
  "title": "Auto-Save User’s Input In Your Forms With HTML5 And Sisyphus.js",
  "desc": "Have you ever been filling out a long form online or writing an eloquent and spirited comment when suddenly the browser crashes? Or perhaps you closed the browser tab accidentally, or your Internet connection cuts off, or the electricity goes down (and, being ever obedient to Murphy’s Law, you had no backup power supply). If not, then you’re lucky. But no one is protected from such minor catastrophes.",
  "link": "htt/smashingmagazine.com/sisyphus-js-client-side-drafts-and-more.md",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```

This script allows Gmail-like auto-saving of drafts. It stores form data to the HTML5 local storage of the user’s browser and restores it when the user reloads or reopens the page or opens the page in a new tab. The data is cleared from local storage when the user submits or resets the form.

![Sisyphus.js](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/3bddb98e-482c-43ea-adcd-425bb7706f82/sisyphus-js.jpg)

### jQuery Credit Card Validator

This library attaches to the input event (with a fallback to the keyup event) and so every time a number in the input field changes, it calls a validation function. When a card is recognized, the credit card type is highlighted; and if the credit card number is correct, it is highlighted with a green checkmark as well. The plugin supports American Express, Diners Club, Discover Card, JCB, Laser, Maestro, MasterCard, Visa and Visa Electron. You might want to consider [<VPIcon icon="fas fa-globe"/>credit cards JavaScript validator](https://davidwalsh.name/validate-credit-cards) and the [<VPIcon icon="fas fa-globe"/>Smart Validate Credit Card Validation plugin](https://egrappler.com/jquery-credit-card-validation-plugin-smart-validate/).

![JavaScript Library](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/d84639c9-ec5b-4e80-96f4-f13290198930/jquery-creditcard.jpg)

### TextExt

```component VPCard
{
  "title": "Main - textextjs.com",
  "desc": "Main",
  "link": "https://textextjs.com/",
  "logo": "https://textextjs.com/wp-content/uploads/2025/04/9dfed4e714-free.png",
  "background": "rgba(0,0,0,0.2)"
}
```

This library allows you to transform HTML text into input fields, without resorting to code inflation. The plugin inserts aesthetic as well as practical input possibilities, e.g. Tags, Ajax, Focus and others.

![TextExt](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/8db7fc90-ba4f-473e-90ba-b34c280ad3cc/textext.jpg)

### Avgrund: Better Modal Boxes

~~https://labs.voronianski.com/jquery.avgrund.js/~~

A jQuery plugin for displaying a depth illusion between popup and page. The [original script by Hakim El Hattab (<VPIcon icon="iconfont icon-github"/>`hakimel/avgrund`)](https://github.com/hakimel/avgrund/) uses CSS transitions and transformations, and the plugin gracefully degrades in those that do not support transitions and transforms. MIT licensed.

![Avgrund: Better Modal Boxes](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/a73a1a9e-8b2e-47de-91bb-6bda59b5edbf/modal.png)

### VisualSearch.js

~~https://documentcloud.github.com/visualsearch/~~

This library enhances ordinary search boxes with the ability to autocomplete faceted search queries. You can specify the facets for completion, along with the completable values for any facet. You can retrieve the search query as a structured object, so you don’t have to parse the query string yourself.

### Ideal Forms Framework

A very comprehensive jQuery plugin for building and validating responsive HTML5 forms. It provides keyboard support, customizable input types, “on the spot” validation, localization and HTML5 `placeholder` polyfill. Supported in IE8+, Chrome, Firefox, Opera, iOS5+, Android 4.0+.

![Ideal Forms Framework](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/3a6b9920-83f3-4391-9d57-930a0a85c4e8/ideal-forms.png)

### Mailcheck

<SiteInfo
  name="mailcheck/mailcheck"
  desc="Reduce misspelled email addresses in your web apps."
  url="https://github.com/mailcheck/mailcheck/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/f8adb180ac2b3a3373178c699ec394226f249f9f01911b5a227b5b369d132459/mailcheck/mailcheck"/>

With this JavaScript spell-checker you can suggests another domain when the user misspells it in an email address. Mailcheck helps effectively reducing sign up typos. While it already includes some domains, you can easily supply your own.

![Mailcheck](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/29beb562-dff6-44be-9d4e-98c4d38f6eb1/mailcheck.gif)

### Validate.js

```component VPCard
{
  "title": "validate.js",
  "desc": "Lightweight form validation library in JavaScript ready to include in any web application.",
  "link": "https://rickharrison.github.io/validate.js/",
  "logo": "ps://rickharrison.github.io/favicon.ico",
  "background": "rgba(255,66,0,0.2)"
}
```

<SiteInfo
  name="rickharrison/validate.js: Lightweight JavaScript form validation library inspired by CodeIgniter."
  desc="Lightweight JavaScript form validation library inspired by CodeIgniter. - rickharrison/validate.js"
  url="https://github.com/rickharrison/validate.js/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/26fa577d32651151078e4226554e1f666f4240073faae3e3f2e8060a2fafdbde/rickharrison/validate.js"/>

A lightweight JavaScript form validation library. You can validate form fields using over a dozen rules and set custom messages; the library doesn’t have any dependencies and you can define your own validation callbacks for custom rules. Works in all major browsers (even IE6!).

![JavaScript Library](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/d476c8a1-6dae-4a8c-bb31-ff622f55b4d7/validate-js.jpg)

### jQuery File Upload

```component VPCard
{
  "title": "jQuery File Upload Demo",
  "desc": "File Upload widget with multiple file selection, drag&drop support, progress bars, validation and preview images, audio and video for jQuery. Supports cross-domain, chunked and resumable file uploads and client-side image resizing. Works with any server-side platform (PHP, Python, Ruby on Rails, Java, Node.js, Go etc.) that supports standard HTML form file uploads.",
  "link": "https://blueimp.github.io/jQuery-File-Upload//",
  "logo": "https://blueimp.github.io/favicon.ico",
  "background": "rgba(51,122,183,0.2)"
}
```

<SiteInfo
  name="blueimp/jQuery-File-Upload"
  desc="File Upload widget with multiple file selection, drag&amp;drop support, progress bar, validation and preview images, audio and video for jQuery. Supports cross-domain, chunked and resumable file up..."
  url="https://github.com/blueimp/jQuery-File-Upload/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/f5983589c83fcdcc970123b0001f794d2172ad50ff1b507f83b00bd8f037d410/blueimp/jQuery-File-Upload"/>

File Upload widget with multiple file selection, drag&drop-support, progress bars and preview images. It supports cross-domain, chunked and resumable file uploads and client-side image resizing. Works with any server-side platform (PHP, Python, Ruby on Rails, Java, Node.js, Go etc.) that supports standard HTML form file uploads.

![JavaScript Library](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/5cee9406-8276-47ce-82aa-1d3434f036e6/fileupload-jquery.jpg)

### Grumble.js

<SiteInfo
  name="jamescryer/grumble.js"
  desc="jQuery plugin to add 360 rotatable bubble style tooltips"
  url="https://github.com/jamescryer/grumble.js/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/ced650c6ce35e2e0b074910f0a7fcdacc0fe975436d347a00fa0618e8bb14b33/jamescryer/grumble.js"/>

This jQuery plugin provides tool tips without being limited to cardinal directions. A *grumble* can be rotated around a given element at any angle, all 360 degrees and at any distance — with CSS. Works in Internet Explorer 6+ and modern browsers. Also, check [<VPIcon icon="fas fa-globe"/>Tipped](https://projects.nickstakenburg.com/tipped), a larger library of various designs and implementations of tooltips with an extensive API.

![Grumble.js](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/22534814-2a0b-4590-8f61-387bd0361705/grumble-js.jpg)

### Dialogs For Twitter Bootstrap

```component VPCard
{
  "title": "— Bootbox.js — alert, confirm, prompt, and flexible dialogs for the Bootstrap framework",
  "desc": "Bootbox.js - alert, confirm, prompt, and flexible dialogs for the Bootstrap framework",
  "link": "https://bootboxjs.com/",
  "logo": "https://bootboxjs.com/favicon-16x16.png",
  "background": "rgba(unde186,33,80,0.2)"
}
```

<SiteInfo
  name="bootboxjs/bootbox"
  desc="Wrappers for JavaScript alert(), confirm() and other flexible dialogs using Twitter's bootstrap framework"
  url="https://github.com/bootboxjs/bootbox/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/0870331e8948bb128cb5dbbcf769ad829f9ff0b834c29ccd3a0c0ec9cf62f02d/bootboxjs/bootbox"/>

A small JavaScript library which allows you to create dialog boxes using Twitter’s Bootstrap modals, without having to worry about creating, managing or removing any of the required DOM elements or JS event handlers. You might want to check out the [<VPIcon icon="fas fa-globe"/>Date Range Picket for Bootstrap](https://dangrossman.info/2012/08/20/a-date-range-picker-for-twitter-bootstrap/) as well as a growing library of [<VPIcon icon="fas fa-globe"/>HTML Snippets for Twitter Bootstrap](https://bootsnipp.com/).

![JavaScript Library](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/6203718e-e600-4ef7-95a0-a25b8f987c4f/bootbox.jpg)

### ddSlick

~~https://designwithpc.com/Plugins/ddSlick~~

Prashant Chaudhary has realeased a free lightweight jQuery plugin that lets you create a custom drop-down that can include images, a short description, along with your usual text and value. It also supports callback functions on selection. You could use [<VPIcon icon="fas fa-globe"/>CSS3 Drop-Downs](https://azadcreative.com/2012/01/bulletproof-css3-dropdown-navigation-menu/) as well.

![ddSlick](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/cef3581d-8394-4a01-aa18-6a14e4c37b70/ddslick.jpg)

### noty

```component VPCard
{
  "title": "Nedim Arabacı",
  "desc": "Developer, software manager, and creator.",
  "link": "https://ned.im/",
  "logo": "https://ned.im/icon1.png?fc77faa2268d9af4",
  "background": "rgba(2,2,2,0.2)"
}
```

<SiteInfo
  name="needim/noty"
  desc="⛔️ DEPRECATED - Dependency-free notification library that makes it easy to create alert - success - error - warning - information - confirmation messages as an alternative the standard alert dialog..."
  url="https://github.com/needim/noty/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/4db1a23c7d2b11e495263336660e1ed69fc280785153d82007fd58c0efb11dc8/needim/noty"/>

This jQuery plugin makes it easy to create alert, success, error, warning, information and confirmation messages. The notification can be positioned anywhere on the page and you can customize the text, animation, speed and buttons easily.

![noty](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/fae60a99-8ceb-4df3-87d8-d61eb42d4d2d/noty1.jpg)

### jQuery.complexify.js

<SiteInfo
  name="danpalmer/jquery.complexify.js"
  desc="Complexify helps you to accurately gauge the quality of a user's password to give them visual feedback, and to enforce a minimum level of security."
  url="https://github.com/danpalmer/jquery.complexify.js/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/3d5fda371ed11865e8b04db20520870927058ac295e4dd33313a61d462d37245/danpalmer/jquery.complexify.js"/>

Complexify helps you to accurately gauge the quality of a user’s password to give them visual feedback, and to enforce a minimum level of security.

![JavaScript Library](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/28346827-2584-45f2-b364-652e094db636/complexify.png)

### Numberfy

With Numberfy you can integrate native support for line numbers in your website’s text areas. On every key press in the text area, the text area’s current value is split into lines. This script will not work in IE due to a bug in the text-wrap properties.

### FormAccordion

A jQuery plugin for easily hiding and revealing related form fields conditionally.

### jQuery.superLabels

<SiteInfo
  name="remybach/jQuery.superLabels"
  desc="Give your forms a helping of awesome!"
  url="https://github.com/remybach/jQuery.superLabels/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/70f2adc4d97065857c9738ab34f8ef060e8c3bfaaa4d6f0c11b9743af16c8bf2/remybach/jQuery.superLabels"/>

You can use the library to give your forms a fade-out label. This implementation makes the label slide across the field when gaining focus and fade out when a value is entered. A fallback is provided as well.

### cryptico

<SiteInfo
  name="wwwtyro/cryptico"
  desc="An easy-to-use encryption system utilizing RSA and AES for javascript. - wwwtyro/cryptico"
  url="https://github.com/wwwtyro/cryptico/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/75f3dea81657d6c0110af10aea3ce41da7ca127858124a5f9cb8835bbe9c3308/wwwtyro/cryptico"/>

An encryption system utilizing RSA and AES for JavaScript.

---

## Web Typography Libraries And Plugins

### Baseline.js

A jQuery plugin for restoring baselines thrown off by odd image sizes. To use it, you just call the plugin passing the height of your baseline as a variable. You can also define multiple baselines for different responsive breakpoints.

![Baseline.js](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/3e8460d1-abbc-44a8-ab91-e81eacff581b/baseline-js.png)

### FTColumnflow

<SiteInfo
  name="ftlabs/ftcolumnflow"
  desc="A polyfill that fixes the inadequacies of CSS column layouts"
  url="https://github.com/ftlabs/ftcolumnflow/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/7069af35fc955827e4554aca50589f1bef2e44aa46487188bcd0fe21aca29f05/ftlabs/ftcolumnflow"/>

Developed by the development team of Financial Times, this library is essentially a polyfill that fixes the inadequacies of CSS column layouts. With the library, you can provide configurable column widths, gutters and margins, define elements spanning columns, keep-with-next to avoid headings at the bottom of a column, group columns into pages and standardize line height to align text baseline to a grid.

![FTcolumnflow](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/7ff192dd-3a8b-4fca-863e-68c46ca8b301/financialtimes.gif)

### Responsive Measure jQuery Plugin

<SiteInfo
  name="jbrewer/Responsive-Measure"
  desc="Responsive-Measure."
  url="https://github.com/jbrewer/Responsive-Measure/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/d2f1bafd4c0a183689596e6ba72934fd5d193d14ce7946851f417ee0e045f550/jbrewer/Responsive-Measure"/>

A simple script that allows you to pass in a selector (ideally the container where your primary content will go), which generates the ideal font size needed to produce the ideal measure for your text. The script also generates a resolution-independent font-scale based on the ideal font-size. Created by Josh Brewer.

![Baseline.js](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/cf874ac6-2f03-4177-834f-247909d64a14/responsive-measure.gif)

### The Widow Tamer

<SiteInfo
  name="On Widows, and How to Tame Them"
  desc="angling from the last line of a paragraph, a typographic widow is a thought fragment severed from its context. They are the result of careless typography – and should be policed – but given the current fluid nature of our web, widows appear with impunity throughout our pages. They are a blind spot, because to notice would invite outrage on the current futility of fighting such details in our ever-responsive layouts."
  url="https://artequalswork.com/posts/on-widows.php/"
  logo="https://artequalswork.com/img/logo-fin.svg"
  preview="https://artequalswork.com/img/aew-soc-image.png"/>

The Widow Tamer is a small JavaScript library that automatically “fixes” typographic widows. It’s designed to work with responsive sites, fixing widows as it finds them on resize or orientation change.

![JavaScript Library](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/41214d44-9884-4db7-b0b5-a1cf56685cf0/widow-tamer.gif)

### Fluid Line-Height

~~https://nicewebtype.com/notes/2012/02/03/molten-leading-or-fluid-line-height/~~

With his article, Tim Brown inspired developers to release tools that adjust `line-height` for optimum readability on responsive websites. The so-called *molten-leading* binds the height of the line to an element’s minimum and maximum width. jQuery-minLineHeight is a jQuery plugin that works similarly with minimum and maximum width association.

![Nice Web Type](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/ef1cc126-930a-4dc3-9308-dd9f5755e853/molten-leading.gif)

### FitText.js

<SiteInfo
  name="davatron5000/FitText.js"
  desc="A jQuery plugin for inflating web type."
  url="https://github.com/davatron5000/FitText.js/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/c0ec5e6a0341d5fe063e32bb9462d1c80ac9b9fb5d1345cb30c66be441a53f7e/davatron5000/FitText.js"/>

```component VPCard
{
  "title": "FitText - A plugin for inflating web type",
  "desc": "FitText makes font-sizes flexible. Use this plugin on your fluid or responsive layout to achieve scalable headlines that fill the width of a parent element.",
  "link": "https://fittextjs.com/",
  "logo": "https://fittextjs.com/favicon.ico",
  "background": "rgba(196,64,50,0.2)"
}
```

This jQuery plugin helps you create scalable headlines that fill the width of a parent element in your fluid or responsive layouts. You might want to check out [<VPIcon icon="fas fa-globe"/>Lettering.js](https://fittextjs.com/) as well to get a complete down-to-the-letter control of letters in your projects.

![FitText.js](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/c2b4fe68-589f-4e13-b498-3d86597b9d2b/fittextjs1.jpg)

### Kerning.js

<SiteInfo
  name="What is Kerning?: Free Kerning Visualizer Tool & How to Master the Art of Professional Typography"
  desc="﻿ Kerning is a critical skill in the realm of typography that deals with the spacing between characters to achieve visual harmony. It’s not merely about setting a uniform space, but rather adjusting the distance to account for the unique shapes and sizes of letters, ensuring readability and aesthetically pleasing text. Mastering kerning can be […]"
  url="https://webupon.com/blog/what-is-kerning/"
  logo="https://webupon.com/wp-content/uploads/2024/02/cropped-WEUP-favicon1-192x192.png"
  preview="https://webupon.com/wp-content/uploads/2024/04/pexels-mihai-vlasceanu-1438445-1024x758.jpg"/>

This library lets you kern, style, transform, and scale your Web type with CSS rules, automatically. You can adjust pairings, introduce font conditionals and augment properties.

![Kerning.js](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/f30a5c2d-ebd2-4e63-88de-366c4c0ddf17/kerningjs1.gif)

### SlabText.js

The script splits headlines into rows before resizing each row to fill the available horizontal space. The ideal number of characters to set on each row is calculated by dividing the available width by the pixel font-size – the script then uses this ideal character count to split the headline into word combinations that are displayed as separate rows of text.

![Nice Web Type](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/675203ab-4b58-4988-b411-398516f788dc/slabtextjs1.gif)

---

## Little Time-Savers

### money.js: Open-Source Exchange Rates and Currency Conversion

~~https://josscrowcroft.github.com/money.js/~~

Joss Crowcroft has created an *Open Source Exchange Rates API*, which provides up-to-date, flexible and portable currency-conversion data that can be used in any application, framework or language (not just JavaScript). It has no access fees, no rate limits, no nasty XML: just free, hourly updated exchange rates in JSON. Joss also built *money.js*, a JavaScript currency conversion library that can be easily integrated in any website. A demo playground and detailed documentation are provided on the website, and the source code is available on GitHub.

![JavaScript Library](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/e134a87b-2344-4557-bff3-52d998709e23/money-js.gif)

### Accounting.js: Easier Number And Currency Formatting

~~https://josscrowcroft.github.com/accounting.js/~~

This simple, tiny JavaScript library will solve your currency and numbers-related formatting hassles, and it even includes optional Excel-style column rendering to line up symbols and decimals. It will make all of your numbers and currencies look much more uniform and professional.

![JavaScript Library](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/f08742a7-16e2-4d8c-8305-5d4c22441b3e/accounting-js.gif)

### Moment.js: Format Dates And Times

```component VPCard
{
  "title": "Moment.js | Home",
  "desc": "Parse, validate, manipulate, and display dates and times in JavaScript.",
  "link": "https://momentjs.com/",
  "logo": "https://momentjs.com/static/img/moment-favicon.png",
  "background": "rgba(und97,178,167,0.2)"
}
```

*Moment.js* is a lightweight JavaScript library which lets you format, parse and manipulate dates. You can add or subtract dates from one another, as well as parse things like Unix Timestamps. Display options include formatted dates, time from now, difference, time from another moment, native date and support for leap years.

![JavaScript Library](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/4664b225-7395-4eff-90ca-4158f63171f7/moment-js.gif)

### Smart Time Ago

<SiteInfo
  name="pragmaticly/smart-time-ago"
  desc="Smart Time Ago is a little jQuery library to update the relative timestamps in your document."
  url="https://github.com/pragmaticly/smart-time-ago/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/cae834d7b3598c56b56c07e4b8230091b5412e9421f6c504b0c65593d77b70e6/pragmaticly/smart-time-ago"/>

This little jQuery library provides you with an intelligent way of updating relative timestamps in your documents. *Smart Time Ago* checks and updates every 60 seconds the relative time, within a scope which you specify at the start. It checks the newest time in your scope and tunes the checking time interval to a proper value. The tool can be used as a jQuery plugin, or - if using node - can be installed from npm.

![Smart Time Ago](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/93fa6c1e-a3b4-4034-bb59-65cee91d31c1/js-libraries-102.jpg)

### sortByTimeAgo.js

<SiteInfo
  name="cjstewart88/sortByTimeAgo"
  desc="This is a jQuery plugin that takes an array of objects with timeAgo properties and sorts them from newest to oldest."
  url="https://github.com/cjstewart88/sortByTimeAgo/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/a9ee8bc567cf2ee86734831c932388732bbd56ee694dd89601dbc8b357793db7/cjstewart88/sortByTimeAgo"/>

A little JavaScript library that takes an array of objects with `TimeAgo` properties and sorts them from newest to oldest.

### Piecon

```component VPCard
{
  "title": "(14%) Piecon / Pie charts in your favicon!",
  "desc": "Pie charts in your favicon! A tiny javascript library for dynamically generating progress pie charts in your favicons.",
  "link": "https://lipka.github.io/piecon/",
  "logo": "https://lipka.github.io/favicon.ico",
  "background": "rgba(4,4,4,0.2)"
}
```

Piecon is a tiny JavaScript library for dynamically generating progress pie charts in your favicons. It has been tested to work in Chrome 15+, Firefox 9+ and Opera 11+.

![Piecon](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/6913c4bd-a105-4e89-8212-a1abecbdeb17/piecon.jpg)

### Notificon: Favicon Notifications and Alerts

<SiteInfo
  name="makeable/Notificon"
  desc="Favicon Notifications / Alerts."
  url="https://github.com/makeable/Notificon/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/bbc5af294d300b39504fc86d779209be40f8aaa5a3d5639f9520bb147689c760/makeable/Notificon"/>

Matt Williams’ *Notificon* is a JavaScript library for creating favicon alerts and notifications. Instead of having to create a number of favicons and serving them to the client, you can specify a label and a favicon (the default being the current favicon), and it will generate a favicon notification for you. The script currently works with Chrome 6+, Firefox 2+ and Opera, but it’s a nice little add-on for browsers that support it.

### jQuery Stick ‘em: Make Content Sticky on Scroll, to a Point

<SiteInfo
  name="Page Not Found | Viget"
  desc="Viget is a full-service interactive agency that helps plan, design, build, and measure successful websites and digital products."
  url="https://viget.com/inspire/jquery-stick-em/"
  logo="https://viget.com/favicon.ico"
  preview="https://viget.com/images/viget-social-share-1200.png"/>

A problem: some of the images in the layout are very tall, so by the time you scrolled down to the bottom of the images, you would have to scroll back up just to read the description of the images or navigation items. The solution: make the content sticky as you are scrolling. This library solves this problem.

![jQuery Stick ’em](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/4f7a7426-a3fc-4200-82f9-4084328c538e/viget2.jpg)

### Countdown.js

```component VPCard
{
  "title": "Countdown.js",
  "desc": "A simple JavaScript API for producing an accurate, intuitive description of the timespan between two Date instances.",
  "link": "https://countdownjs.org",
  "logo": "https://countdownjs.org/favicon.ico",
  "background": "rgba(153,153,153,0.2)"
}
```

Human descriptions for a span of time are often fuzzier than a computer naturally computes. For example, how long does “in 1 month” mean? We casually talk about four weeks, but in fact there is only one month in a year which is four weeks long. *Countdown.js* tackles this problem by producing an accurate and intuitive description of timespans which are consistent as time goes on.

### geolib

<SiteInfo
  name="manuelbieh/geolib"
  desc="Zero dependency library to provide some basic geo functions"
  url="https://github.com/manuelbieh/geolib/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/147d72d3c7d01d558d06e55ba49e720516f24c4bb2434f77c41d33e2f77fabd7/manuelbieh/geolib"/>

A small library to provide some basic geo functions like distance calculation, conversion of decimal coordinates to sexagesimal and vice versa.

![Geolib.js](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/c8e9b957-ef77-4aa4-bd85-71ba9f77b149/geolib.jpg)

### Cookies.js

<SiteInfo
  name="ScottHamper/Cookies"
  desc="JavaScript Client-Side Cookie Manipulation Library"
  url="https://github.com/ScottHamper/Cookies/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/eaea9c4f172d9c3cee76b5f083d68f72ac398671858c3b6fa2f30800af453de9/ScottHamper/Cookies"/>

Cookies.js is a small client-side JavaScript library that makes managing cookies easy. It caches cookie values, making sequential reads faster, supports AMD / CommonJS loaders and is supported in Chrome, Firefox 3+, Safari 4+, Opera 10+ and Internet Explorer 6+.

### firstImpression.js

~~https://ravelrumba.com/blog/firstimpression-js-library-detecting-new-visitors/~~

firstImpression.js is a micro-library (1 Kb minified) that answers the simple question, “Has this user visited this site before?” The detection doesn’t require much logic, so the majority of the code is just a plain JavaScript port of the popular [jquery.cookie (<VPIcon icon="iconfont icon-github"/>`carhartl/jquery-cookie`)](https://github.com/carhartl/jquery-cookie) plugin.

### Chirp.js: Tweets On Your Website

~~https://lab.rog.ie/chirp/~~

A lightweight templating JavaScript library that enables you to display tweets on your website. Client-side caching is available; and you can set if you’d like to show retweets and replies, too.

![Chirp.js: Tweets on your website](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/914d24ab-6936-4533-a3fe-78b4f791e1b8/chirp-js.png)

### simpleWeather jQuery Plugin

~~https://monkeecreate.github.com/jquery.simpleWeather/~~

A simple jQuery plugin to display the weather information for any location. The data is pulled from the public Yahoo! Weather feed via the YQL API.

### zip.js

~~https://gildas-lormeau.github.com/zip.js/~~

A JavaScript library to zip and unzip files. *zip.js* provides a low-level API for writing and reading large zip files (up to 4GB with File Writer API). Works with Chrome, Firefox, Safari 6 and (unfortunately) Internet Explorer 10+. With Safari 5 and IE9, you must disable Web Workers and use a [<VPIcon icon="fa-brands fa-atlassian"/>Typed Array polyfill](https://bitbucket.org/lindenlab/llsd/raw/7d2646cd3f9b/js/typedarray.js).

### string.js

~~https://stringjs.com/~~

A library that provides extra String methods to normalize text strings and manipulate them.

---

## Images, Maps, Graphs And Visualization Libraries

### jVectorMap

~~https://jvectormap.com/~~

jVectorMap is a jQuery plugin that renders SVG and VML vector maps in browsers ranging from the ancient Internet Explorer 6 to modern browsers. jVectorMap uses JavaScript, CSS, HTML, SVG or VML, and no Flash or any other proprietary browser plugin is required.

![JavaScript Library](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/c35d1238-1bb5-4a0c-a5c5-f26eee03aea8/js7.png)

### Subway Map Visualization jQuery Plugin

~~https://kalyani.com/2010/10/subway-map-visualization-jquery-plugin/~~

If you often deal with government projects, university departments or any websites of sophisticated organizations, every now and again you’ll be asked to design a nice visualization that would explain the various divisions, structures and internal hierarchy of those organizations. Where do you start? Well, creating a Subway Map-alike visualization is an option worth considering.

![JavaScript Library](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/f8ca8bf8-af99-4621-a4f1-c9251cc229fe/nl-12.jpg)

### GMaps.js

```component VPCard
{
  "title": "gmaps.js — Google Maps API with less pain and more fun",
  "desc": "the easiest way to use Google Maps",
  "link": "https://hpneo.dev/gmaps/",
  "logo": "https://hpneo.dev/favicon.ico",
  "background": "rgba(76,130,183,0.2)"
}
```

<SiteInfo
  name="hpneo/gmaps"
  desc="the easiest way to use Google Maps."
  url="https://github.com/hpneo/gmaps/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/b2050408828b26de52ebccbc7cef33965cfdf7da648347d027c161f9f2588ec3/hpneo/gmaps"/>

This library allows you to easily use Google Maps in your projects. Extensive documentation or large amount of code aren’t required anymore. You might want to check out [<VPIcon icon="fas fa-globe"/>Gmap3 jQuery plugin](https://gmap3.net/) as well.

![GMaps.js](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/65c47f88-f510-4824-8bcf-105452fff5c7/gmaps.jpg)

### Leaflet: Open-Source Interactive Maps With JavaScript

A library for creating tile-based interactive maps for desktop and mobile browsers. An easy-to-use API is available, and the tool emphasizes usability, performance, flexibility and excellent browser support. The library offers a variety of map layers, including tiles, markers, pop-ups, image overlays and GeoJSON. It supports panning on both mobile and desktop browsers, double-tap zoom on mobile browsers (plus multi-touch zoom on iOS) and more. On iOS, hardware acceleration is enabled, and Leaflet has a modular structure that lets you reduce the size of the library to make it even faster. The project is open source and available for further development and forking on GitHub.

![JavaScript Library](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/b8138844-1e29-42b4-a8c6-bcf6803ebcf6/leaflet.jpg)

### SVGeezy: A JavaScript plugin For SVG Fallbacks

~~https://twostepmedia.co.uk/svgeezy/~~

A JavaScript library which detects SVG images on your website and automatically “looks” for a standard image fallback for those older, less capable browsers. Created by Ben Howdle and Jack Smith.

![SVGeezy - a JS plugin for SVG fallbacks](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/09ef10a7-6d64-470e-8976-d8c382e9c9b8/svg.png)

### Retina.js

~~https://retinajs.com/~~

A script that checks each image on your website, when it’s loaded by a user, and replaces low-resolution image with their high-resolution equivalent, if available. It’s assumed that you use Apple’s high resolution modifier (`@2x`) to designate high resolution versions of images.

### JustGage

~~https://justgage.com/~~

A JavaScript library for generating and animating gauges. Based on Raphaël library for vector drawing, it’s resolution-independent and works in all modern browsers.

![JustGage](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/dcf516bc-8b81-4515-be09-5ea3bb5a16e6/gauge.gif)

### arbor.js

```component VPCard
{
  "title": "arbor.js",
  "desc": "a graph visualization library using web workers and jQuery",
  "link": "https://arborjs.org//",
  "logo": "https://arborjs.org/favicon.ico",
  "background": "rgba(120,120,120,0.2)"
}
```

A graph visualization library for building trees with connected nodes of data. Arbor.js is essentially a layout algorithm with abstractions for graph organization and screen refresh handling.

![Arbor.js](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/a09067e8-79a2-4b28-b67e-eae658662940/atlas.gif)

### Timeline: Generate Timelines To Visualize Data

~~https://timeline.verite.co/~~

This library is supposed to pull in media from different sources. It has built-in support for pulling in data from Twitter, YouTube, Flickr, Vimeo, Google Maps and SoundCloud—and more will be included in the near future. You can easily fill in data from a Google spreadsheet, or use a more detailed method such as JSON to create your time-line. You can also host it on your website by using the Timeline jQuery plugin. The library is available on [GitHub (<VPIcon icon="iconfont icon-github"/>`VeriteCo/Timeline`)](https://github.com/VeriteCo/Timeline), or as [<VPIcon icon="fa-brands fa-wordpress"/>WordPress plugin](https://wordpress.org/extend/plugins/timeline-verite-shortcode/).

![JavaScript Library](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/0b389fd7-4154-4c27-a65b-8ded1dccac9a/nl-61.jpg)

### Unicon

~~https://github.com/filamentgroup/unicon~~

Unicon is a Grunt.js task that makes it easy to manage icons and background images for all devices, preferring HD (retina) SVG icons but also provides fallback support for standard definition browsers, and old browsers alike. From a CSS perspective, it’s easy to use, as it generates a class referencing each icon, and doesn’t use CSS sprites.

### Foresight.js

<SiteInfo
  name="adamdbradley/foresight.js"
  desc="DEPRECATED: Prior to recent developments with the picture element, Foresight.js gaves webpages the ability to tell if the user&#39;s device is capable of viewing high-resolution images before the i..."
  url="https://github.com/adamdbradley/foresight.js/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/5725841d49c63582824a83641d75113474a3e547191fd457002b4b70316ec866/adamdbradley/foresight.js"/>

This device recognition library, gives websites the ability to gauge the users device capabilities before the image is requested from the server. Judging display resolution and network speed, it customizes the img src attribute to optimize the websites image resolution to the individual users hardware.

### A Magnifying Glass With CSS3 And jQuery

```component VPCard
{
  "title": "Magnifying glass for image zoom using Jquery and CSS3",
  "desc": "Learn to make a realistic magnifying glass using Jquery and CSS3. Hover above the image to see the action.",
  "link": "https://thecodeplayer.com/walkthrough/magnifying-glass-for-images-using-jquery-and-css3/",
  "logo": "https://thecodeplayer.com/favicon.ico",
  "background": "rgba(23,170,190,0.2)"
}
```

This technique achieves an aesthetically pleasing visual effect. The CSS3 `box-shadow` and `border-radius` properties are used to create the magnifying glass itself, while jQuery is used to detect the cursor coordinates and mouse movements and present the larger image. And when your cursor moves off the image, the magnifying glass elegantly fades away. The included tutorial makes it very easy to learn and understand how to achieve this effect. The technique includes both a small and a large image in the markup, so optimizing the technique to load a larger image on demand might be a good idea.

![JavaScript Library](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/078394f1-023f-4c05-8d1a-24d8987a14c2/nl-2.jpg)

### Rickshaw

~~https://code.shutterstock.com/rickshaw/~~

This free and open source JavaScript toolkit provides the elements which you need to create interactive graphs, such as renderers, legends, hovers and range selectors. Rickshaw is based on D3, graphs are drawn with standard SVG and styled with CSS.

![Rickshaw](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/03fb7d38-8d0c-417d-8a93-7ccba2de269f/js-libraries-111.jpg)

### Flot: Plotting For jQuery

```component VPCard
{
  "title": "Flot: Attractive JavaScript plotting for jQuery",
  "desc": "Flot is a pure JavaScript plotting library for jQuery, with a focus on simple usage, attractive looks and interactive features.",
  "link": "https://flotcharts.org/",
  "logo": "https://flotcharts.org/favicon.ico",
  "background": "rgba(120,120,120,0.2)"
}
```

A JavaScript plotting library for jQuery, supports Internet Explorer 6+, Chrome, Firefox 2+, Safari 3+ and Opera 9.5+. You can use different types of graphs, use multiple axes, annotate a chart, update graphs with AJAX, provide support for zooming and interaction with the data points, use stacked charts, theresholding the data, apply pie charts and plot prerendered images.

![Flot.js](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/59524058-62ce-4152-954a-f8bc7b33e1d9/flotjs.jpg)

### Chronoline.js

```component VPCard
{
  "title": "Chronoline.js",
  "desc": "Chronoline.js : chronoline.js is a library for making a chronology timeline out of events on a horizontal timescale.",
  "link": "https://stoicloofah.github.io/chronoline.js//",
  "logo": "https://stoicloofah.github.io/favicon.ico",
  "background": "rgba(33,33,33,0.2)"
}
```

<SiteInfo
  name="StoicLoofah/chronoline.js"
  desc="chronoline.js is a library for making a chronology timeline out of events on a horizontal timescale."
  url="https://github.com/StoicLoofah/chronoline.js/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/e33dc23c5aba424c320acb28f5a2b127ff655d1fcdd59f0508dffc2d99ff4dce/StoicLoofah/chronoline.js"/>

*Chronoline.js* is a library that allows you to create a chronology time-line out of events on a horizontal timescale. From a list of dates and events, it can generate a graphical representation of schedules, historical events, deadlines, and more.

![JavaScript Library](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/14c86ff7-ccb9-4e44-92e8-c7a954114f3a/js13.png)

### Cubism

<SiteInfo
  name="square/cubism"
  desc="Cubism.js: A JavaScript library for time series visualization."
  url="https://github.com/square/cubism/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/5143bdb855bd86e487ac7b9698da4fb71994c0215904c9319b03f8c98bad904c/square/cubism"/>

This D3 plugin helps you to visualize time series and construct better real-time dashboards, pulling data from Graphite, Cube and other sources. Cubism scales and reduces server load by pulling only the most recent values. Cubism can scale easily to hundreds of metrics updating every ten seconds. Cubism’s horizon charts allow you to see many more metrics at-a-glance space than standard area charts.

![Cubism](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/981d54ea-ae10-46f0-a6ea-6b000ea54b91/js-libraries-112.jpg)

### Envision.js

```component VPCard
{
  "title": "humble software development - envision",
  "desc": "Humble software development provides JavaScript, HTML5, Canvas and information search and retrieval software development.",
  "link": "https://humblesoftware.com/envision/",
  "logo": "https://humblesoftware.com/images/favicon.ico",
  "background": "rgba(78,71,69,0.2)"
}
```

<SiteInfo
  name="HumbleSoftware/envisionjs"
  desc="Dynamic HTML5 visualization."
  url="https://github.com/HumbleSoftware/envisionjs/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/de555d32959cb4eacca292396dcf2f48e30c66da251e10f7bfdc1d10abf1bb1a/HumbleSoftware/envisionjs"/>

An alternative library for creating fast, dynamic and interactive HTML5 visualizations.

![JavaScript Library](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/8a4d9f5a-4d7e-4545-b337-78ba044ba716/js9.png)

### Data Visualization JavaScript Libraries

```component VPCard
{
  "title": "Datavisualization.ch Selected Tools",
  "desc": "Datavisualization.ch Selected Tools is a collection of tools that we, the people behind Datavisualization.ch, work with on a daily basis and recommend warmly.",
  "link": "https://selection.datavisualization.ch/",
  "logo": "https://selection.datavisualization.ch/favicon.ico",
  "background": "rgba(238,0,17,0.2)"
}
```

A growing, curated collection of data visualization JavaScript libraries that make it easier to create meaningful and beautiful data visualizations. If you haven’t one a useful data visualization library in the list above, you’ll definitely find the right one in this overview.

![Data Visualization JavaScript Libraries](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/c2c5ac8d-1762-468e-b3ce-f32c84245c9b/dataviz.png)

---

## Last Click

### jQuery Fundamentals

~~https://jqfundamentals.com/~~

This HTML book is designed to get you comfortable working through common problems you’ll be called upon to solve using jQuery. You can read the content and try the various interactive examples. Each chapter will cover a concept and give you a chance to try example code related to the concept. Written by Rebecca Murphey and recently updated by her and the rest of the gang at Bocoup.

![JavaScript Library](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/01b0ee96-ec06-4b8d-a8c7-bf7fb9eee977/jquery-fundamentals.gif)

### JavaScript Patterns Collection

~~https://shichuan.github.io/javascript-patterns/~~

A JavaScript pattern and anti-pattern collection that covers function patterns, jQuery patterns, jQuery plugin patterns, design patterns, general patterns, literals and constructor patterns, object creation patterns, code reuse patterns, DOM and browser patterns.

![JavaScript Library](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/9ca04ad8-dfd3-46b9-b2fe-830c477610f4/js-patterns.gif)

### JavaScript Garden

<SiteInfo
  name="BonsaiDen/JavaScript-Garden"
  desc="A collection of documentation about the most quirky parts of the JavaScript language."
  url="https://github.com/BonsaiDen/JavaScript-Garden/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/be2290c2f153421f7b9bfd35c60bf2d46a94d348819dd93fd49ee9ea6def1933/BonsaiDen/JavaScript-Garden"/>

A growing collection of documentation about the most quirky parts of the JavaScript programming language. It gives advice to avoid common mistakes and subtle bugs, as well as performance issues and bad practices, that non-expert JavaScript programmers may encounter on their endeavors into the depths of the language.

![JavaScript Library](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/59e2a359-5d10-4db0-bb41-c7d397ebc74b/javascript-garden.gif)

::: info Further Reading

- [**Helpful JavaScript & jQuery Tools, Libraries & Plugins**](/smashingmagazine.com/useful-javascript-and-jquery-tools-libraries-plugins.md)
- [**40 Useful jQuery Techniques and Plugins**](/smashingmagazine.com/45-useful-jquery-techniques-and-plugins.md)
- [**Useful HTML-, CSS- and JavaScript Tools and Libraries**](/smashingmagazine.com/useful-html-css-and-javascript-tools-and-libraries.md)

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Practical JavaScript Libraries and jQuery Plugins",
  "desc": "In this two-part overview, we feature some of the most useful JavaScript and jQuery libraries which could be just the right solutions for your common problems. We hope that this overview will help you find or rediscover some tools that you could use in your next projects.",
  "link": "https://chanhi2000.github.io/bookshelf/smashingmagazine.com/useful-javascript-libraries-jquery-plugins-web-developers.html",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```
