---
lang: en-US
title: "How to @scope CSS Now That It’s Baseline"
description: "Article(s) > How to @scope CSS Now That It’s Baseline"
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
      content: "Article(s) > How to @scope CSS Now That It’s Baseline"
    - property: og:description
      content: "How to @scope CSS Now That It’s Baseline"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/how-to-scope-css-now-that-its-baseline.html
prev: /programming/css/articles/README.md
date: 2026-01-05
isOriginal: false
author:
  - name: Daniel Schwarz
    url : https://frontendmasters.com/blog/author/danielschwarz/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/8146
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
  name="How to @scope CSS Now That It’s Baseline"
  desc="There is a way to declare a scope on a specific selector, a specific selector *down to* another selector, or with no "
  url="https://frontendmasters.com/blog/how-to-scope-css-now-that-its-baseline/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/8146"/>

Firefox 146 now supports `@scope` in CSS, joining Chrome and Safari, meaning that it’s now supported in all major web browsers, earning it the “Baseline: Newly Available” tag.

This `@scope` at-rule defines a new scope context in CSS. The `:scope` pseudo-class represents the root of said context (otherwise known as the ‘scope root’), and all this means is that we have some new and exciting ways of writing and organizing CSS, so today I’ll demonstrate the different ways of using `@scope` and the benefits of each one.

You can use an `@scope` block in any CSS, be it within a stylesheet that you `<link>` up or a `<style>` block within HTML. In fact, the latter has some interesting properties we’ll get to.

Whichever way you use CSS, the rules are, by default, *globally* scoped. For example, in the demo below, even though the CSS rules are nested within the `<main>`, they apply to the *whole* document:

```html
<header></header>

<main>
  <style> /* No scoping applied. Global scope. */
    header, footer {
      background: rgb(from green r g b / 30%);
    } </style>

  <header></header>
  <section></section>
  <footer></footer>
</main>

<footer></footer>
```

<CodePen
  user="anon"
  slug-hash="bNpZExp"
  title="Global scope demo (<style> in <body>)"
  :default-tab="['css','result']"
  :theme="dark"/>

Styles in a CSS stylesheet are also globally scoped by default.

---

## `@scope` in a `<style>` Block

However, `@scope` can be used to limit the CSS to the ‘scope root’ (which in this case is `<main>`, because the `<style>` is a direct child of `<main>`). In addition, within the `@scope` at-rule, `:scope` selects this scope root:

```html{5}
<header></header>

<main>
  <style>
    @scope {
      /* Scope root */
      :scope { /* Selects the <main> */

        /* <header>/<footer> within scope root */
        header, footer {
          background: rgb(from green r g b / 30%);
        }
      }
    }
  </style>

  <header></header>
  <section></section>
  <footer></footer>
</main>

<footer></footer>
```

<CodePen
  user="anon"
  slug-hash="pvyqPyx"
  title="@scope demo (<style> in <body>)"
  :default-tab="['css','result']"
  :theme="dark"/>

If needed, we can narrow the scope, or actually, *stop* the scoping at a particular second selector. In the example below I’ve added a ‘scope limit’ — specifically, I’ve defined the scope as from `<main>` (implicitly) to `<section>`. The scope is non-inclusive, so `:scope > *` selects the `<header>` and `<footer>` (excluding `<section>`, since it’s outside of the scope). `main` and `section` don’t select anything as, again, they’re out-of-scope, but we can continue to select `<main>` by using `:scope`:

```html{3} :collapsed-lines
<main>
  <style>
    @scope to (section) {
      /* Selects nothing */
      main, section {
        color: red;
      }

      /* However, this selects <main> */
      :scope {
        font-weight: bold;
      }

      /* Selects scoped direct children */
      :scope > * {
        background: rgb(from green r g b / 30%);
      }

      /* This also works */
      & > * {
        background: rgb(from green r g b / 30%);
      }

      /* As does this */
      > * {
        background: rgb(from green r g b / 30%);
      }
    }
  </style>

  <header></header>
  <section></section>
  <footer></footer>
</main>
```

<CodePen
  user="anon"
  slug-hash="JoXxmVG"
  title="@scope demo (<style> in <body> with scope limit)"
  :default-tab="['css','result']"
  :theme="dark"/>

When you use the `to` keyword it is [<VPIcon icon="fas fa-globe"/>known as ‘donut scope’](https://stubbornella.org/2011/10/08/scope-donuts/). In the image below you can see why (the rings of the donuts include the scope root and scope limit, but it’s what’s in the donut hole that’s actually included in the scope):

![Nothing inside that `<section>` could be selected at all, because the “donut” stops there. That’s the hole in the donut.](https://i0.wp.com/paper-attachments.dropboxusercontent.com/s_05A451BC8E0C7AF681B379AA604FF16D6795164F6C12DE76D454EB6091BC131E_1766605018994_donut-scope.png?ssl=1)

::: note

The `<style>` element itself can be selected by the universal selector (`*`), so if you were to, for example, set `display` to anything other than `none`, the CSS would hilariously output as a raw string (but still work, somehow):

<CodePen
  user="anon"
  slug-hash="PwNMJYd"
  title="Non-hidden <style>"
  :default-tab="['css','result']"
  :theme="dark"/>

To get really weird, style the `<style>` element like you would a `<pre>` tag and add the `contenteditable` attribute!

:::

Notably, you don’t *need* to use the `:scope` selector or an equivalent, that’s just helpful for clarity or adding specificity to the selector if needed.

```html
<p>
  <style>
    @scope {
      color: red;
    }
  </style>
  
  I'll be red.
</p>

<p>I'll be whatever color is inherited.</p>
```

The potential benefits of scoping in a `<style>` block are:

- HTML and CSS are kept together
- No external resource to download (even if you load CSS asynchronously to stop it from render-blocking, which risks [<VPIcon icon="iconfont icon-webdev"/>Cumulative Layout Shift](https://web.dev/articles/cls) anyway, external resources must be downloaded in full before they can be rendered, which isn’t ideal)
- CSS always renders with the HTML, which means no Cumulative Layout Shift, and when not deferring non-[**critical CSS**](/smashingmagazine.com/understanding-critical-css.md), is the best way to prioritize resources efficiently

Keep in mind that the CSS will output more times than is necessary if you’re reusing the component, which is very anti-[DRY (<VPIcon icon="fa-brands fa-medium" />`@nipun.rajput6586s`)](https://medium.com/@nipun.rajput6586s/the-dry-principle-in-programming-a-comprehensive-guide-e0504a4b393a) and why you’ll want to combine this type of scoped CSS with other types of CSS where appropriate. With that in mind, let’s talk about using `@scope` with internal and external CSS.

---

## `@scope` in a CSS file

When using `@scope` with a CSS file, we must specify the scope root (and optionally the end scope) within the `@scope` at-rule manually, like this:

```css
@scope (main) to (section) {
  > * {
    background: rgb(from green r g b / 30%);
  }
}
```

This is actually true for `<style>` blocks as well. If you specify the scope with a selector (with or without the `to` selector), it will behave the same way. The distinction with a `<style>` block is when you *don’t* specify a selector, the scope becomes the parent element.

<CodePen
  user="anon"
  slug-hash="WbwLjrJ"
  title="@scope demo (in/external CSS with scope root/limit)"
  :default-tab="['css','result']"
  :theme="dark"/>

The benefit of this method is that it’s DRY, so you won’t be repeating yourself. However, there are quite a few drawbacks:

- CSS is a render blocking resource
- Potential Cumulative Layout Shift (if loading external CSS asynchronously)
- HTML and CSS *aren’t* kept together

---

## Other ways to use `:scope`

What’s interesting is that, if we use `:scope` outside of `@scope`, it selects the *global* scope root, which in HTML is `<html>`:

```css
/* Global scope root */
html { }

/* Selects the same thing */
:root { }

/* Selects the same thing! */
:scope { }
```

I don’t know why we’d select `:scope` instead of `:root` or `html`, but it makes sense that we can do so, and explains why `:scope` was supported before `@scope`.

`:scope` can also be used in the `querySelector()`, `querySelectorAll()`, `matches()`, and `closest()` JavaScript DOM APIs, where `:scope` refers to the element on which the method is called. Take the following HTML markup, for example:

```html
<section>
  <div>
    Child div
    <div>Grandchild div</div>
  </div>
</section>
```

While trying to select the direct child `<div>` only:

- `section.querySelectorAll("div").forEach(e => e.style.marginLeft = "3rem")` undesirably but expectedly selects both `<div>`s
- `section.querySelectorAll("> div").forEach(e => e.style.marginLeft = "3rem")` doesn’t work (even though, as demonstrated earlier, `> div` *would* work in CSS)
- Luckily, `section.querySelectorAll(":scope > div").forEach(e => e.style.marginLeft = "3rem")` targets the child div only, as desired
- `section.querySelectorAll("& > div").forEach(e => e.style.marginLeft = "3rem")` also works, as it would in CSS

<CodePen
  user="anon"
  slug-hash="GgZPgpR"
  title=":scope demo (JavaScript)"
  :default-tab="['css','result']"
  :theme="dark"/>

Fun fact, we can also use `&` instead of `:scope`:

```css
& {
  /* Instead of html, :root, or :scope */
}

@scope (main) to (section) {
  & {
    /* Instead of :scope */
  }
}
```

---

## A Well-Balanced Approach to Serving and Writing Scoped CSS

I was really looking forward to `@scope`, and it securing full browser support in the last minute of 2025 made it my feature of the year. Regardless of what types of websites you build, you’ll find all ways of implementing `@scope` quite useful, although I think you’ll often use all implementations together, in harmony.

It will depend on the type of website that you’re building and how much you want to balance CSS organization with web performance.

Personally, I like splitting CSS into reusable modules, including them as internal CSS using templating logic only when needed (e.g., `forms.css` on `/contact`), and then using in-HTML scoped `<style>`s for one-time or once-per-page components. That way we can avoid render-blocking external CSS without causing Cumulative Layout Shift (CLS) and still have fairly organized CSS. One thing to consider though is that CSS isn’t cached with these methods, so you’ll need to determine whether they’re worth that.

If you’re building heavy front-ends, caching external CSS will be better and fewer bytes overall, but you can totally serve CSS using all methods at once (as appropriate) and use `@scope` with all of them.

In any case though, the ultimate benefit is, of course, that we’re able to write much simpler selectors by defining new scope roots.

All in all, the future of CSS could look like this:

```css title="global.css"
body {
  color: #111;
}

section {
  background: #eee;

  h2 {
    color: #000;
  }
}
```

```css title="home.css"
@scope (section.home-only) {
  :scope {
    background: #111;

    h2 {
      color: #fff;
    }
  }
}
```

```html :collapsed-lines
<!DOCTYPE html>
<html>

<head>
  <!-- Site-wide styles -->
  <link rel="stylesheet" href="global.css">

  <style>
    /* Reusable BUT critical/above-the-fold, so not for global.css */
    @scope (header) {
      height: 100vh;
    }

    /* Include home.css conditionally */
    {% if template.name == "index" %}{% render "home.css" %}{% endif %}
  </style>

</head>

<body>
  <header>
    <h1>Critical/above-the-fold content</h1>
  </header>

  <main>
    <section>
      <h2>Default section (styles from external CSS)</h2>
    </section>

    <section class="home-only">
      <h2>Home-only section (styles from internal CSS)</h2>
    </section>

    <section class="home-only">
      <h2>Home-only section (styles from internal CSS)</h2>
    </section>

    <section class="home-only">
      <h2>Home-only section (styles from internal CSS)</h2>
    </section>

    <section>
      <style>
        @scope {
          :scope {
            background: #f00;

            h2 {
              color: #fff;
            }
          }
      </style>

      <h2>Unique section (styles from in-HTML CSS)</h2>
    </section>

  </main>
</body>

</html>
```

This is a very simple example. If we imagine that `section.home-only` is a much more complex selector, `@scope` enables us to write it once and then refer to it as `:scope` thereafter.

<CodePen
  user="anon"
  slug-hash="emzYPaZ"
  title="Scoped CSS demo"
  :default-tab="['css','result']"
  :theme="dark"/>

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to @scope CSS Now That It’s Baseline",
  "desc": "There is a way to declare a scope on a specific selector, a specific selector *down to* another selector, or with no ",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/how-to-scope-css-now-that-its-baseline.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
