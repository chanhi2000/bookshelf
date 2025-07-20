---
lang: en-US
title: "Toe Dipping Into View Transitions"
description: "Article(s) > Toe Dipping Into View Transitions"
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
      content: "Article(s) > Toe Dipping Into View Transitions"
    - property: og:description
      content: "Toe Dipping Into View Transitions"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/toe-dipping-into-view-transitions.html
prev: /programming/css/articles/README.md
date: 2025-02-21
isOriginal: false
author:
  - name: Geoff Graham
    url : https://css-tricks.com/author/geoffgraham/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2019/12/css-tricks-logo-gradient-outline.png
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
  name="Toe Dipping Into View Transitions"
  desc="The View Transitions API is more a set of features than it is about any one particular thing. And it gets complex fast. But in this post, we’ll cover a couple ways to dip your toes into the waters without having to dive in head-first."
  url="https://css-tricks.com/toe-dipping-into-view-transitions"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2019/12/css-tricks-logo-gradient-outline.png"/>

I’ll be honest and say that the View Transition API intimidates me more than a smidge. There are plenty of tutorials with the most impressive demos showing how we can animate the transition between two pages, and they usually start with the [<FontIcon icon="iconfont icon-css-tricks"/>simplest of all examples](https://css-tricks.com/snippets/css/basic-view-transition/).

```css
@view-transition {
  navigation: auto;
}
```

That’s usually where the simplicity ends and the tutorials venture deep into JavaScript territory. There’s nothing wrong with that, of course, except that it’s a mental leap for someone like me who learns by building up rather than leaping through. So, I was darned inspired when I saw [<FontIcon icon="fas fa-globe"/>Uncle Dave](https://daverupert.com/2023/05/getting-started-view-transitions/) and [<FontIcon icon="fas fa-globe"/>Jim Neilsen](https://blog.jim-nielsen.com/2025/view-transition-name-gotchas/) trading tips on a super practical transition: post titles.

You can see how it works on Jim’s site:

<VidStack src="https://css-tricks.com/wp-content/uploads/2025/02/Screen-Recording-2025-02-14-at-2.22.14%E2%80%AFPM.mov" />

This is the perfect sort of toe-dipping experiment I like for trying new things. And it starts with the same little `@view-transition` snippet which is used to opt both pages into the View Transitions API: the page we’re on and the page we’re navigating to. From here on out, we can think of those as the “new” page and the “old” page, respectively.

I was able to get the same effect going on my personal blog:

<VidStack src="https://css-tricks.com/wp-content/uploads/2025/02/Screen-Recording-2025-02-14-at-2.31.25%E2%80%AFPM.mov" />

Perfect little exercise for a blog, right? It starts by setting the `view-transition-name` on the elements we want to participate in the transition which, in this case, is the post title on the “old” page and the post title on the “new” page.

![](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/02/Screenshot-2025-02-14-at-2.34.28%E2%80%AFPM.png?resize=2460%2C1570&ssl=1)

So, if this is our markup:

```html
<h1 class="post-title">Notes</h1>
<a class="post-link" href="/link-to-post"></a>
```

…we can give them the same `view-transition-name` in CSS:

```css
.post-title { view-transition-name: post-title; }
.post-link { view-transition-name: post-title; }
```

Dave is quick to point out that we can make sure we respect users who prefer reduced motion and only apply this if their system preferences allow for motion:

```css
@media not (prefers-reduced-motion: reduce) {
  .post-title { view-transition-name: post-title; }
  .post-link { view-transition-name: post-title; }
}
```

If those were the only two elements on the page, then this would work fine. But what we have is a list of post links and all of them have to have their own unique `view-transition-name`. This is where Jim got a little stuck in his work because how in the heck do you accomplish that when new blog posts are published all the time? Do you have to edit your CSS and come up with a new transition name each and every time you want to post new content? Nah, there’s got to be a better way.

And there is. Or, at least there will be. It’s just not standard yet. Bramus, in fact, wrote about it very recently when [<FontIcon icon="fas fa-globe"/>discussing Chrome’s work on the `attr()` function](https://bram.us/2025/01/20/css-attr-gets-an-upgrade/) which will be able to generate a series of unique identifiers in a single declaration. Check out this CSS from the future:

```html
<style>
  .card[id] {
    view-transition-name: attr(id type(<custom-ident>), none); /* card-1, card-2, card-3, … */
    view-transition-class: card;
  }
</style>

<div class="cards">
  <div class="card" id="card-1"></div>
  <div class="card" id="card-2"></div>
  <div class="card" id="card-3"></div>
  <div class="card" id="card-4"></div>
</div>
```

Daaaaa-aaaang that is going to be handy! I want it *now*, darn it! Gotta have to wait not only for Chrome to develop it, but for other browsers to adopt and implement it as well, so who knows when we’ll actually get it. For now, the best bet is to use a little programmatic logic directly in the template. My site runs on WordPress, so I’ve got access to PHP and can generate an inline style that sets the `view-transition-name` on both elements.

The post title is in the template for my individual blog posts. That’s the <FontIcon icon="fa-brands fa-php"/>`single.php` file in WordPress parlance.

```php title="single.php"
<?php the_title( 
  '<h1 class="post-single__title" style="view-transition-name: post-' . get_the_id() . '">', '</h1>'
); ?>
```

The post links are in the template for post archives. That’s typically <FontIcon icon="fa-brands fa-php"/>`archive.php` in WordPress:

```php title="archive.php"
<?php the_title(
  '<h2 class="post-link><a href="' . esc_url( get_permalink() ) .'" rel="bookmark" style="view-transition-name: post-' . get_the_id() . '">', '</a></h2>' 
); ?>
```

See what’s happening there? The `view-transition-name` property is set on both transition elements directly inline, using PHP to generate the name based on the post’s assigned ID in WordPress. Another way to do it is to drop a `<style>` tag in the template and plop the logic in there. Both are equally icky compared to what `attr()` will be able to do in the future, so pick your poison.

The important thing is that now both elements share the same `view-transition-name` and that we also have already opted into `@view-transition`. With those two ingredients in place, the transition works! We don’t even need to define `@keyframes` (but you totally could) because the default transition does all the heavy lifting.

In the same toe-dipping spirit, I caught the latest issue of [<FontIcon icon="fas fa-globe"/>Modern Web Weekly](https://modern-web-weekly.ghost.io) and love this little sprinkle of view transition on radio inputs:

<CodePen
  user="geoffgraham"
  slug-hash="MYWwJEd"
  title="Modern Web Weekly Radio View Transition"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

Notice the JavaScript that is needed to prevent the radio’s default clicking behavior in order to allow the transition to run before the input is checked.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Toe Dipping Into View Transitions",
  "desc": "The View Transitions API is more a set of features than it is about any one particular thing. And it gets complex fast. But in this post, we’ll cover a couple ways to dip your toes into the waters without having to dive in head-first.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/toe-dipping-into-view-transitions.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
