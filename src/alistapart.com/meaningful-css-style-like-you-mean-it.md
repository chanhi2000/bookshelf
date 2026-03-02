---
lang: en-US
title: "Meaningful CSS: Style Like You Mean It"
description: "Article(s) > Meaningful CSS: Style Like You Mean It"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - alistapart.com
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Meaningful CSS: Style Like You Mean It"
    - property: og:description
      content: "Meaningful CSS: Style Like You Mean It"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/alistapart.com/meaningful-css-style-like-you-mean-it.html
prev: /programming/css/articles/README.md
date: 2016-05-03
isOriginal: false
author:
  - name: Tim Baxter
    url: https://alistapart.com/author/tim-baxter/
cover: https://i0.wp.com/alistapart.com/wp-content/uploads/2016/05/Ala_meaningful-css.png?fit=1200%2C550&ssl=1
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
  name="Meaningful CSS: Style Like You Mean It"
  desc="Our markup too often remains a snarl of divs, our CSS a chaos of classes. Tim Baxter urges us to move beyond that. We can use real objects now instead of abstract representations. We can write CSS …"
  url="https://alistapart.com/article/meaningful-css-style-like-you-mean-it/"
  logo="https://i0.wp.com/alistapart.com/wp-content/uploads/2019/03/cropped-icon_navigation-laurel-512.jpg?fit=192%2C192&ssl=1"
  preview="https://i0.wp.com/alistapart.com/wp-content/uploads/2016/05/Ala_meaningful-css.png?fit=1200%2C550&ssl=1"/>

These days, we have a world of meaningful markup at our fingertips. HTML5 introduced a lavish new set of semantically meaningful elements and attributes, ARIA defined an entire additional platform to describe a rich internet, and microformats stepped in to provide still more standardized, nuanced concepts. It’s a golden age for rich, meaningful markup.

Yet our markup too often remains a tangle of `div`s, and our CSS is a morass of classes that bear little relationship to those `div`s. We nest `div` inside `div` inside `div`, and we give every `div` a stack of classes—but when we look in the CSS, our classes provide little insight into what we’re actually trying to define. Even when we do have semantic and meaningful markup, we end up redefining it with CSS classes that are inherently arbitrary. They have no intrinsic meaning.

We were warned about these patterns years ago:

::: info Jeffrey Zeldman, Designing with Web Standards (<VPIcon icon="fa-brands fa-wikipedia-w"/><code>en.wikipedia.org</code>)

> In a site afflicted by classitis, every blessed tag breaks out in its own swollen, blotchy class. Classitis is the measles of markup, obscuring meaning as it adds needless weight to every page.

<SiteInfo
  name="Designing with Web Standards - Wikipedia"
  desc="Designing with Web Standards, first published in 2003 with revised editions in 2007 and 2009, is a web development book by Jeffrey Zeldman. The book’s audience is primarily web development professionals who aim to produce design work that complies with web standards. The work is used as a textbook in over 85 colleges."
  url="https://en.wikipedia.org/wiki/Designing_with_Web_Standards/"
  logo="https://en.wikipedia.org/static/favicon/wikipedia.ico"
  preview="https://upload.wikimedia.org/wikipedia/en/d/df/Designing_with_web_standards.png"/>

:::

Along the same lines, the W3C [<VPIcon icon="iconfont icon-w3c"/>weighed in](https://w3.org/TR/WD-css2-971104/selector.html#h-6.3.2) with:

> CSS gives so much power to the “class” attribute, that authors could conceivably design their own “document language” based on elements with almost no associated presentation (such as DIV and SPAN in HTML) and assigning style information through the “class” attribute… **Authors should avoid this practice since the structural elements of a document language often have recognized and accepted meanings and author-defined classes may not.** (emphasis mine)

So why, exactly, does our CSS abuse classes so mercilessly, and why do we litter our markup with author-defined classes? Why can’t our CSS be as semantic and meaningful as our markup? Why can’t *both* be more semantic and meaningful, moving forward in tandem?

---

## Building better objects

A long time ago, as we emerged from the early days of CSS and began building increasingly larger sites and systems, we struggled to develop some sound conventions to wrangle our ever-growing CSS files. Out of that mess came [object-oriented CSS (<VPIcon icon="iconfont icon-github" />`stubbornella/oocss`)](https://github.com/stubbornella/oocss/wiki).

Our systems for safely building complex, reusable components created a metastasizing classitis problem—to the point where our markup today is too often written in the service of our CSS, instead of the other way around. If we try to write semantic, accessible markup, we’re still forced to tack on author-defined meanings to satisfy our CSS. Both our markup and our CSS reflect a time when we could only define objects with what we had: `div`s and classes. When in doubt, add more of both. It was safer, especially for older browsers, so we oriented around the most generic objects we could find.

Today, we can move beyond that. We can define better objects. We can create semantic, descriptive, and meaningful CSS that understands what it is describing and is as rich and accessible as the best modern markup. We can [<VPIcon icon="fa-brands fa-wikipedia-w"/>define the elephant](https://en.wikipedia.org/wiki/Blind_men_and_an_elephant#Buddhist) instead of saying things like `.pillar` and `.waterspout`.

---

## Clearing a few things up

But before we turn to defining better objects, let’s back up a bit and talk about what’s wrong with our objects today, with a little help from cartoonist [<VPIcon icon="fas fa-globe"/>Gary Larson](http://farside.com).

Larson once drew a Far Side [<VPIcon icon="fa-brands fa-tumblr"/>cartoon](http://tumblr.austinkleon.com/post/16641876753) in which a man carries around paint and marks everything he sees. “Door” drips across his front door, “Tree” marks his tree, and his cat is clearly labelled “Cat”. Satisfied, the man says, “That should clear a few things up.”

We are all Larson’s label-happy man. We write `<table class="table">` and `<form class="form">` without a moment’s hesitation. Looking at Github, one can find plenty of examples of `<main class="main">`. But why? [<VPIcon icon="iconfont icon-w3c"/>You can’t have more than one main element](https://w3.org/TR/html/grouping-content.html#the-main-element), so you already know how to reference it directly. The new elements in HTML5 are nearly a decade old now. We have no excuse for not using them well. We have no excuse for not expecting our fellow developers to know and understand them.

Why reinvent the semantic meanings already defined in the spec in our own classes? Why duplicate them, or muddy them?

An end-user may not notice or care if you stick a form class on your form element, but *you* should. You should care about bloating your markup and slowing down the user experience. You should care about readability. And if you’re getting paid to do this stuff, you should care about being the sort of professional who doesn’t write redundant slop. “Why should I care” was the death rattle of those advocating for table-based layouts, too.

---

## Start semantic

The first step to semantic, meaningful CSS is to start with semantic, meaningful markup. Classes are arbitrary, but HTML is not. In HTML, every element has a very specific, agreed-upon meaning, and so do its attributes. Good markup is inherently expressive, descriptive, semantic, and meaningful.

If and when the semantics of HTML5 fall short, we have ARIA, specifically designed to fill in the gaps. ARIA is too often dismissed as “just accessibility,” but really—true to its name—it’s about Accessible Rich Internet Applications. Which means it’s chock-full of expanded semantics.

For example, if you want to define a top-of-page header, you could create your own `.page-header` class, which would carry no real meaning. You could use a `header` element, but since you can have more than one `header` element, that’s probably not going to work. But ARIA’s `[role=banner]` is already there in the spec, definitively saying, “This is a top-of-page header.”

Once you have [<VPIcon icon="iconfont icon-w3c"/>`<header role="banner">`](https://w3.org/TR/wai-aria/roles#banner), adding an extra class is simply redundant and messy. In our CSS, we know exactly what we’re talking about, with no possible ambiguity.

And it’s not just about those big top-level [<VPIcon icon="iconfont icon-w3c"/>landmark elements](https://w3.org/TR/wai-aria/roles#landmark), either. ARIA provides a way to semantically note small, atomic-level elements like [<VPIcon icon="iconfont icon-w3c"/>alerts](https://w3.org/TR/wai-aria/roles#alert), too.

A word of caution: [<VPIcon icon="iconfont icon-w3c"/>don’t throw ARIA roles on elements that already have the same semantics](http://w3c.github.io/aria-in-html/#rule1). So for example, don’t write `<button role="button">`, because the semantics are already present in the element itself. Instead, use `[role=button]` on elements that should look and behave like buttons, and style accordingly:

```css
button,
[role=button] {
    … 
}
```

Anything marked as semantically matching a button will also get the same styles. By leveraging semantic markup, our CSS clearly incorporates elements based on their intended usage, not arbitrary groupings. By leveraging semantic markup, our components remain reusable. Good markup does not change from project to project.

Okay, but why?

Because:

- If you’re writing semantic, accessible markup already, then you dramatically reduce bloat and get cleaner, leaner, and more lightweight markup. It becomes easier for humans to read and will—in most cases—be faster to load and parse. You remove your author-defined detritus and leave the browser with known elements. Every element is there for a reason and provides meaning.
- On the other hand, if you’re currently wrangling `div`-and-class soup, then you score a major improvement in accessibility, because you’re now leveraging roles and markup that help assistive technologies. In addition, you standardize markup patterns, making repeating them easier and more consistent.
- You’re strongly encouraging a consistent visual language of reusable elements. A consistent visual language is key to a satisfactory user experience, and you’ll make your designers happy as you avoid uncanny-valley situations in which elements look mostly but not completely alike, or work slightly differently. Instead, if it looks like a duck and quacks like a duck, you’re ensuring it is, in fact, a `duck`, rather than a `rabbit.duck`.
- There’s no context-switching between CSS and HTML, because each is clearly describing what it’s doing according to a standards-based language.
- You’ll have more consistent markup patterns, because the right way is clear and simple, and the wrong way is harder.
- You don’t have to think of names nearly as much. Let the specs be your guide.
- It allows you to decouple from the CSS framework du jour.

Here’s another, more interesting scenario. Typical form markup might look something like this (or worse):

```html
<form class="form" method="POST" action=".">
  <div class="form-group">
    <label for="id-name-field">What’s Your Name</label>
    <input type="text" class="form-control text-input" name="name-field" id="id-name-field" />
  </div>
  <div class="form-group">
    <input type="submit" class="btn btn-primary" value="Enter" />
  </div>      
</form>
```

And then in the CSS, you’d see styles attached to all those classes. So we have a stack of classes describing that this is a form and that it has a couple of inputs in it. Then we add two classes to say that the button that submits this form is a button, and represents the primary action one can take with this form.

### Common vs. optimal form markup

| What you’ve been using | What you could use instead | Why |
| --- | --- | --- |
| `.form` | `form` | Most of your forms will—or at least should—follow consistent design patterns. Save additional identifiers for those that don’t. Have faith in your design patterns. |
| `.form-group` | `form > p` or `fieldset > p` | The [<VPIcon icon="iconfont icon-w3c"/>W3C recommends paragraph tags for wrapping form elements](https://w3.org/html/wg/spec/forms.html#writing-a-form-s-user-interface). This is a predictable, recommended pattern for wrapping form elements. |
| `.form-control` or `.text-input` | `[type=text]` | You already know it’s a text input. |
| `.btn` and `.btn-primary` or `.text-input` | `[type=submit]` | Submitting the form is inherently the primary action. |

In light of all that, here’s the new, improved markup.

```html
<form method="POST" action=".">
  <p>
    <label for="id-name-field">What’s Your Name</label>
    <input type="text" name="name-field" id="id-name-field" />
  </p>
  <p>
    <button type="submit">Enter</button>
  </p>
</form>
```

The functionality is exactly the same.

Or consider this CSS. You should be able to see exactly what it’s describing and exactly what it’s doing:

```css
[role=tab] {
  display: inline-block;
}
[role=tab][aria-selected=true] {
  background: tomato;
}

[role=tabpanel] {
  display: none;
}
[role=tabpanel][aria-expanded=true] {
  display: block;
}
```

Note that `[aria-hidden]` is more semantic than a utility `.hide` class, and could also be used here, but `aria-expanded` seems more appropriate. Neither necessarily needs to be tied to tabpanels, either.

In some cases, you’ll find no element or attribute in the spec that suits your needs. This is the exact problem that microformats and microdata were designed to solve, so you can often press them into service. Again, you’re retaining a standardized, semantic markup and having your CSS reflect that.

At first glance, it might seem like this would fail in the exact scenario that CSS naming structures were built to suit best: large projects, large teams. This is not necessarily the case. CSS class-naming patterns place rigid demands on the markup that must be followed. In other words, the CSS dictates the final HTML. The significant difference is that with a meaningful CSS technique, the styles reflect the markup rather than the other way around. One is not inherently more or less scalable. Both come with expectations.

One possible argument might be that ensuring all team members understand the correct markup patterns will be too hard. On the other hand, if there is any baseline level of knowledge we should expect of all web developers, surely that should be a solid working knowledge of HTML itself, not memorizing arcane class-naming rules. If nothing else, the patterns a team follows will be clear, established, well documented by the spec itself, and repeatable. Good markup and good CSS, reinforcing each other.

To suggest we shouldn’t write good markup and good CSS because some team members can’t understand basic HTML structures and semantics is a cop-out. Our industry can—and should—expect better. Otherwise, we’d still be building sites in tables because CSS layout is supposedly hard for inexperienced developers to understand. It’s an embarrassing argument.

Probably the hardest part of meaningful CSS is understanding when classes remain helpful and desirable. The goal is to use classes as they were intended to be used: as arbitrary groupings of elements. You’d want to create custom classes most often for a few cases:

- When there are not existing elements, attributes, or standardized data structures you can use. In some cases, you might truly have an object that the HTML spec, ARIA, and microformats all never accounted for. It shouldn’t happen often, but it is possible. Just be sure you’re not sticking a horn on a horse when you’re defining `.unicorn`.
- When you wish to arbitrarily group differing markup into one visual style. In this example, you want objects that are not the same to look like they are. In most cases, they should probably be the same, semantically, but you may have valid reasons for wanting to differentiate them.
- You’re building it as a utility mixin.

Another concern might be building up giant stacks of selectors. In some cases, building a wrapper class might be helpful, but generally speaking, you shouldn’t have a big stack of selectors because the elements themselves are semantically different elements and should not be sharing all that many styles. The point of meaningful CSS is that you know from your CSS that that `button` or `[role=button]` applies to all buttons, but `[type=submit]` is always the primary action item on the form.

We have so many more powerful attributes at our disposal today that we shouldn’t need big stacks of selectors. To have them would indicate sloppy thinking about what things truly are and how they are intended to be used within the overall system.

It’s time to up our CSS game. We can remain dogmatically attached to patterns developed in a time and place we have left behind, or we can move forward with CSS and markup that correspond to defined specs and standards. We can use real objects now, instead of creating abstract representations of them. The browser support is there. The standards and references are in place. We can start today. Only habit is stopping us.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Meaningful CSS: Style Like You Mean It",
  "desc": "Our markup too often remains a snarl of divs, our CSS a chaos of classes. Tim Baxter urges us to move beyond that. We can use real objects now instead of abstract representations. We can write CSS …",
  "link": "https://chanhi2000.github.io/bookshelf/alistapart.com/meaningful-css-style-like-you-mean-it.html",
  "logo": "https://i0.wp.com/alistapart.com/wp-content/uploads/2019/03/cropped-icon_navigation-laurel-512.jpg?fit=192%2C192&ssl=1",
  "background": "rgba(34,34,34,0.2)"
}
```
