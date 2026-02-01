---
lang: en-US
title: "Better Ordered Lists (Using Simple PHP and CSS)"
description: "Article(s) > Better Ordered Lists (Using Simple PHP and CSS)"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - PHP
  - Article(s)
tag:
  - blog
  - css-tricks.com
  - css
  - php
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Better Ordered Lists (Using Simple PHP and CSS)"
    - property: og:description
      content: "Better Ordered Lists (Using Simple PHP and CSS)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/better-ordered-lists-using-simple-php-and-css.html
prev: /programming/css/articles/README.md
date: 2007-10-27
isOriginal: false
author:
  - name: Chris Coyier
    url : https://css-tricks.com/author/chriscoyier/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2007/10/nicenumberedlists.jpg
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

```component VPCard
{
  "title": "PHP > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/php/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Better Ordered Lists (Using Simple PHP and CSS)"
  desc="Ordered lists are boring! Sure you can apply background images and do quite a bit of sprucing up to a regular ordered list, but you just don't get enough"
  url="https://css-tricks.com/better-ordered-lists-using-simple-php-and-css"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2007/10/nicenumberedlists.jpg"/>

**Ordered lists are boring!** Sure you can apply background images and do quite a bit of sprucing up to a regular ordered list, but you just don’t get enough control over the **number itself.** Here is an example where you ditch the traditional ordered list and create your own!

If you set up a loop, or are already within an existing loop (think WordPress comments), the possibility for cool numbered lists presents itself. Just set up an integer variable in PHP that increments itself while the loop is running. Then echo the variable out where you need it and style it with CSS.

In this example, I used an h2 element with a huge font size, gray color, floated to the left, with a little right margin. This technique is nice ‘n’ bulletproof because it doesn’t use any graphic elements to contain the number.

![](https://i0.wp.com/css-tricks.com/wp-content/uploads/2007/10/nicenumberedlists.jpg)

Here is an example of a simple PHP loop:

```php
<?php for ($i = 1; ; $i++) { 

   if ($i > 9) {
      break;
   }  ?>

   <div class="comment-box">
      <h2 class="number"><?php echo $i ?></h2>
      <p>CONTENT GOES HERE.</p>
   </div>

<?php } ?> 
```

Here is the applicable CSS:

```css
h2.number {
  position: relative;
  top: 0px;
  left: 0px;
  font-size: 10em;
  color: #ccc;
  float: left;
  margin-right: 10px
}

#page-wrap {
  width: 760px;
  background: white;
  margin: 0 auto;
  padding: 10px 0px 50px 0px;
  background: white url(images/gradient2-bg.gif) bottom repeat-x;
}

#description-area {
  padding: 20px;
}

.comment-box {
  margin: 0px 0px 50px 50px;
  padding: 20px;
  width: 240px;
  border: 1px solid black;
  float: left;
}
```

::: info

```component VPCard
{
  "title": "PHP Numbered Lists from CSS-Tricks",
  "desc": "Ordered lists are boring! If you are within a loop, the possibility for cool numbered lists presents itself. Just set up a simple integer variable in PHP that increments itself while the loop is running. Then echo the variable out where you need it and style it with CSS. This could be easily adapted to be used within the comment loops within WordPress, which is where I got the idea to do this",
  "link": "https://css-tricks.com/examples/phpNumberedLists//",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

[<VPIcon icon="fas fa-file-zipper"/>DOWNLOAD EXAMPLE](https://css-tricks.com/examples/phpNumberedLists.zip)

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Better Ordered Lists (Using Simple PHP and CSS)",
  "desc": "Ordered lists are boring! Sure you can apply background images and do quite a bit of sprucing up to a regular ordered list, but you just don't get enough",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/better-ordered-lists-using-simple-php-and-css.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
