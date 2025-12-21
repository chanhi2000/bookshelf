---
lang: en-US
title: "Style Queries are Almost Like Mixins (But Mixins Would Be Better)"
description: "Article(s) > Style Queries are Almost Like Mixins (But Mixins Would Be Better)"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - frontendmasters.com
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Style Queries are Almost Like Mixins (But Mixins Would Be Better)"
    - property: og:description
      content: "Style Queries are Almost Like Mixins (But Mixins Would Be Better)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/css-does-need-mixins.html
prev: /programming/css/articles/README.md
date: 2024-07-12
isOriginal: false
author:
  - name: Chris Coyier
    url : https://frontendmasters.com/blog/author/chriscoyier/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/3002
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
  name="Style Queries are Almost Like Mixins (But Mixins Would Be Better)"
  desc="Having a named block of styles to apply in CSS can be useful, and newfangled Style Queries are pretty close to that. We look at one use case here, how Sass did mixins better, and hope for a native solution. "
  url="https://frontendmasters.com/blog/css-does-need-mixins/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/3002"/>

I was styling a menu thing the other day, and it had some decently nested selectors. Normally I’m a pretty big fan of putting a class right on the thing you want to style and keeping CSS selectors pretty “flat” in that they are just that class alone. But for menus and the semantic HTML within, a little nesting seemed reasonable. For instance this HTML:

```html
<nav class="site-nav">
  <ul>
    <li><a href="#">Home</a></li>
    <li><a href="#">Contact</a></li>
    <li><a href="#">About</a></li>
    <li><a href="#">History</a></li>
  </ul>
</nav>
```

Can lead to this kind of CSS:

```css
.site-nav {
  > ul {
    > li {
      > a {
        &:hover, 
        &:focus {
        }
      }
    }
  }
}
```

I can see how that turns some people off, but honestly it doesn’t bother me that much. The structure is reliable here and I’d rather this setup in CSS than a class on every one of those links in the HTML.

If we get into *sub-*menu territory though, it gets gnarlier:

```css
.site-nav {
  > ul {
    > li {
      > ul { /* sub menu */
        > li {
          > a {
            &:hover,
            &:focus {
              
            }
          }
        }
      }
    }
  }
}
```

I’m willing to admit this is probably a bit too far in nesting town 😬. Particularly because at each of those nested levels there will be a bunch of styling and it will become hard to reason about quite quickly.

It occurred to me that the (newfangled, not production-ready) CSS style queries might be able to jump in and help here, because they behave a bit like a mixin.

Mixin?

Yeah! That’s what Sass called the concept, anyway. A mixin allows us to *name* a block of styles, then call them as needed. So…

```scss
@mixin linkHovered {
  background: red;
  color: white; 
}

.site-nav {
  > ul {
    > li {
      > a {
        &:hover, 
        &:focus {
          @include linkHovered;
        }
      }
    }
  }
}
```

So now we’ve *kind of* flattened out the styles a bit. We have this re-usable chunk of styles that we can just call rather than nest the styles so deeply.

What I wanted to try here was using Style Queries (and *not* Sass), but unfortunately it’s not quite as clean as I’d like. After using Sass for so long, this is what I wanted to work:

```css
/* Invalid! Doesn't select anything */
@container style(--linkHovered) {
  background: red;
}

.site-nav {
  > ul {
    > li {
      > a {
        &:hover, &:focus {
          --linkHovered: true;
        }
      }
    }
  }
}
```

But that’s a no-go. The `@container` style query either needs to be nested within the other styles so that it has an implied selector (which defeats the “flatten the styles” purpose) or it needs an explicit selector inside it. So it needs to be like this:

```css
@container style(--hasLinkHovered) {
  a {
    background: red;
  }
}

.site-nav {
  > ul {
    > li {
      &:has(> a:hover, > a:focus) {
        --hasLinkHovered: true;
      }
    }
  }
}
```

That works ([<VPIcon icon="iconfont icon-caniuse"/>where supported](https://caniuse.com/css-container-queries-style)):

<CodePen
  user="chriscoyier"
  slug-hash="gONpgVe"
  title="Style Query Mixin"
  :default-tab="['css','result']"
  :theme="dark"/>

I just don’t love it. You have to set the Custom Property higher up in the nesting because container styles can’t style the thing they query. Plus now the true selector is a combination of the nesting and what’s in the container style query which is an awful brainbuster to keep track of.

This is *not* to say that Style Queries aren’t useful. They totally are, and I’m sure we’ll uncover lots of cool use cases in the coming years. I’m just saying that shoehorning them to behave exactly like mixins isn’t great.

It sure would be nice if [<VPIcon icon="fas fa-globe"/>CSS got native mixins](https://css.oddbird.net/sasslike/mixins-functions/)!

It would be yet another Sass feature making it’s way into the platform. In the case of mixins, it would be a great win, because the CSS would be more efficient than the way Sass had to express the mixin concept back in CSS. If you used a `@mixin` 10 times under different selectors, those styles blocks would be barfed out 10 duplicate times in the CSS. Perhaps not the worlds biggest deal thanks to file compression, but certainly not as efficient as the language itself just referring to a single block of styles.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Style Queries are Almost Like Mixins (But Mixins Would Be Better)",
  "desc": "Having a named block of styles to apply in CSS can be useful, and newfangled Style Queries are pretty close to that. We look at one use case here, how Sass did mixins better, and hope for a native solution. ",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/css-does-need-mixins.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
