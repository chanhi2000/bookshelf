---
lang: en-US
title: "Snippets in Svelte 5"
description: "Article(s) > Snippets in Svelte 5"
icon: iconfont icon-svelte
category:
  - Node.js
  - Svelte.js
  - Article(s)
tag:
  - blog
  - frontendmasters.com
  - node
  - nodejs
  - node-js
  - svelte
  - sveltejs
  - svelte-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Snippets in Svelte 5"
    - property: og:description
      content: "Snippets in Svelte 5"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/snippets-in-svelte-5.html
prev: /programming/js-svelte/articles/README.md
date: 2024-08-07
isOriginal: false
author: Adam Rackis
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/3341
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Svelte.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-svelte/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Snippets in Svelte 5"
  desc="Out with slots, in with snippets."
  url="https://frontendmasters.com/blog/snippets-in-svelte-5"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/3341"/>

This post is the second in a 3-part series on Svelte 5.[Part one](/frontendmasters.com/introducing-svelte-5.md)was a basic introduction, covering nuts and bolts features like state, props, and effects. This post is all about snippets, an exciting new feature that allows for content reuse, and more importantly, injecting content into components you render.

::: info Article Series



```component VPCard
{
  "title": "Introducing Svelte 5",
  "desc": "Svelte 5 introduces significant improvements in reactivity, state management, and prop handling, maintaining its user-friendly Developer Experience (DX). ",
  "link": "/frontendmasters.com/introducing-svelte-5.md",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "Snippets in Svelte 5",
  "desc": "Out with slots, in with snippets.",
  "link": "/frontendmasters.com/snippets-in-svelte-5.md",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "Fine-Grained Reactivity in Svelte 5",
  "desc": "Svelte is already quite lightweight and fast, but Svelte 5 still overs big improvements in fine-grained reactivity, meaning re-rendering as absolutely little as possible. ",
  "link": "/frontendmasters.com/fine-grained-reactivity-in-svelte-5.md",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

:::

If you’d like to see and experiment with the code in this post, [see the GitHub repo (<VPIcon icon="iconfont icon-github"/>`arackaf/svelte-snippets`)](https://github.com/arackaf/svelte-snippets).

<SiteInfo
  name="arackaf/svelte-snippets"
  desc=""
  url="https://github.com/arackaf/svelte-snippets/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/0b2a9f75163ac2a41051c63d728d55cd9ffd915b09d79cc9e38afbdf96e3445f/arackaf/svelte-snippets"/>

---

## What are snippets?

Snippets are a new feature in Svelte 5. They allow you to define, well… snippets of content. They’re*almost*lightweight components that you can find inside of a component file. Before you get too excited: they do not, as of now, allow you to define multiple components in one file. Snippets cannot be exported from anywhere, and even if they could, they do not allow you to define state. They are limited to props.

They seem initially similar to React’s minimally useful Stateless Functional Components from back before hooks were a thing. But snippets also have a second use: they allow you to inject content into other components, and in so doing replace one of Svelte’s most awkward features: slots.

Let’s see how.

---

## Defining snippets

We define snippets with the `#snippet` directive. The simplest snippet imaginable looks like this:

```svelte
{#snippet helloWorld()}
  <span>Hello World</span>
{/snippet}
```

That defines the snippet. To render the snippet, we use the`@render`directive, like this:

```js
{@render helloWorld()}
```

As you might have guessed, snippets can also receive props, or really, parameters, since snippets are more of a function, than a component. Parameters are listed in the parens, with types if you’re using TypeScript.

```svelte
{#snippet productDisplay(p: Product)}
<div>
  <img src="{p.url}" alt="product url" />
  <div>
    <h2>{p.name}</h2>
    <span>${p.price.toFixed(2)}</span>
  </div>
</div>
{/snippet}
```

### Snippets can render other snippets

For example, this simple snippet…

```svelte
{#snippet productReview(review: Review)}
<div>
  <span>{review.date}</span>
  <span>{review.content}</span>
</div>
{/snippet}
```

… can be used in this bigger snippet:

```svelte :collapsed-lines
{#snippet productDisplay(p: Product)}
<div>
  <div>
    <img src="{p.url}" alt="product url">
    <div>
      <h2>{p.name}</h2>
      <span>${p.price.toFixed(2)}</span>
    </div>
  </div>
  <h3>Reviews:</h3>
  <div>
    {#each p.reviews ?? [] as review}
      {@render productReview(review)}
    {/each}
  </div>
</div>
{/snippet}
```

Then you can reuse that `productDisplay` snippet with different products in your component. Let’s see a minimal, full example:

```svelte :collapsed-lines
<script lang="ts"> type Review = {
    date: string;
    content: string;
  };
  type Product = {
    name: string;
    url: string;
    price: number;
    reviews?: Review[];
  };

  let searchedBook = $state<Product>({
    name: "Effective TypeScript: 83 Specific Ways to Improve Your TypeScript, 2nd Edition",
    url: "https://m.media-amazon.com/images/I/71eWL4AqPqL._SL1500_.jpg",
    price: 44.99,
    reviews: [
      { date: "2/14/2024", content: "Absolutely loved this book" },
      { date: "6/2/2024", content: "Even better than the first edition" },
    ],
  });
  let relatedProduct = $state<Product>({
    name: "Modern C++ Design: Generic Programming and Design Patterns Applied",
    url: "https://m.media-amazon.com/images/I/914ncVx1hxL._SL1413_.jpg",
    price: 55.49,
  });
</script>

{#snippet productReview(review: Review)}
<div>
  <span>{review.date}</span>
  <span>{review.content}</span>
</div>
{/snippet}

{#snippet productDisplay(p: Product)}
<div>
  <div>
    <img src="{p.url}" alt="product url" />
    <div>
      <h2>{p.name}</h2>
      <span>${p.price.toFixed(2)}</span>
    </div>
  </div>
  <h3>Reviews:</h3>
  <div>{#each p.reviews ?? [] as review} {@render productReview(review)} {/each}</div>
</div>
{/snippet}

<section>
  <h1>Product Display Page</h1>

  {@render productDisplay(searchedBook)}

  <aside>You might also be interested in:</aside>

  {@render productDisplay(relatedProduct)}
</section>
```

If that was the extent of Snippets they’d be a marginally useful convenience for re-using small bits of markup within a single component.

But the main benefit of snippets is for **injecting content into components**. Previously, if you wanted to pass content into a component you’d use slots. Slots were always an awkward feature of Svelte, but they’re now deprecated in Svelte 5. We won’t cover them here, so check out[<VPIcon icon="iconfont icon-svelte"/>the docs](https://svelte.dev/docs/special-elements#slot)if you’re curious.

---

## Passing snippets to components

Snippets shine brightest when we pass them into other components. Let’s imagine a (grossly simplified)`DisplayProduct`page. It takes in a product, an optional related product, and a snippet to display a single product. This component will also render content in the header, which we’ll also pass in as a snippet.

```svelte :collapsed-lines
<script lang="ts"> import type { Snippet } from "svelte";
  import type { Product } from "./types";

  type Props = {
    product: Product;
    relatedProduct?: Product;
    productDisplay: Snippet<[Product]>;
    children: Snippet;
  };

  let { product, relatedProduct, productDisplay, children }: Props = $props(); </script>

<section>
  {@render children()}
  {@render productDisplay(product)}
  
  {#if relatedProduct}
    <aside>You might also be interested in:</aside>
    {@render productDisplay(relatedProduct)}
  {/if}
</section>
```

There’s a`Snippet`type that Svelte exports for us, so we can type the snippets we’re receiving. Specifying the parameters that a snippet receives is a little weird, because of how TypeScript is: we list the argumentes as a Tuple. So our `productDisplay` snippet will take a single argument that’s a `Product`.

The snippet for showing the header I decided to name “children” which has some significance as we’ll see in a moment.

Let’s put this component to use:

```svelte
{#snippet productDisplay(p: Product)}
<div>
  <img src="{p.url}" alt="Image of product">
  <div>
    <h2>{p.name}</h2>
    <span>${p.price.toFixed(2)}</span>
  </div>
</div>
{/snippet}

<DisplayProduct product="{searchedBook}" relatedProduct="{recommendedBook}" {productDisplay}>
  <h1>Product Display Page</h1>
</DisplayProduct>
```

We’re passing the`productDisplay`snippet in for the`productDisplay`prop. Little note: Svelte allows you to write `{a}` instead of `a={a}` as a convenient shortcut.

But notice the content we put directly inside of the`DisplayProduct`tags. If the component has a prop called`children`that’s a snippet, this content will be passed as that snippet. This is a special case just for props called children (similar to the children prop in React). You don’t*have*to do this; you’re free to manually pass a`children`prop, just like we did for`productDisplay`if you really want to.

Let’s take a look at one more authoring convenience Svelte 5 gives us. If we’re just defining a snippet to be passed one time, to one component, Svelte lets us clean the syntax up a bit, like so:

```svelte
<DisplayProduct product="{searchedBook}" relatedProduct="{recommendedBook}">
  <h1>Product Display Page</h1>
  {#snippet productDisplay(p: Product)}
  <div>
    <img src="{p.url}" alt="product url" />
    <div>
      <h2>{p.name}</h2>
      <span>${p.price.toFixed(2)}</span>
    </div>
  </div>
  {/snippet}
</DisplayProduct>
```

As before, we have our`<h1>`content directly inside of the tags, as children. But we’ve also defined a snippet inside of those tags. This is a nice shorthand for passing a snippet as a prop (with the same name) to our component. Don’t worry, if the name you give this inline snippet doesn’t match a prop, TypeScript will tell you.

---

## Default Content with Snippets

One nice feature with slots is that you could define default content pretty easily.

```svelte
<slot name="header-content">
  <span>Default content</span>
</slot>
```

Snippets don’t quite have anything like this built in, but they’re a flexible enough primitive that you really don’t need it.

Let’s see how we can provide our own default content for when a Snippet is *not* passed in. As before let’s say we have our`DisplayProduct`component, except now our `productDisplay` and `children` snippets are optional

```ts
type Props = {
  product: Product;
  relatedProduct?: Product;
  productDisplay?: Snippet<[Product]>;
  children?: Snippet;
};

let { product, relatedProduct, productDisplay, children }: Props = $props();
```

We have a few straightforward options for falling back to our own default content. We can simply test if we have a value for the snippet right in our template, and render the fallback if not.

```svelte
{#if children}
  {@render children()} 
{:else}
  <h1>Fallback content</h1>
{/if}
```

Or, we can set up our fallback right in our script:

```ts
let productDisplaySnippetToUse: Snippet<[Product]> = productDisplay ?? productDisplayFallback;
```

```svelte
{#snippet productDisplayFallback(p: Product)}
<div>
  <img src="{p.url}" alt="product url" />
  <div>
    <h2>{p.name}</h2>
  </div>
</div>
{/snippet}
```

Then we render that:

```svelte
{@render productDisplaySnippetToUse(product)}
```

---

## Parting thoughts

Svelte 5 is an exciting release. This post turned to one of the more interesting new features: snippets, useful for injecting content into components, and for re-using small bits of content within a single component.

Out with slots, in with snippets.

::: info Article Series

```component VPCard
{
  "title": "Introducing Svelte 5",
  "desc": "Svelte 5 introduces significant improvements in reactivity, state management, and prop handling, maintaining its user-friendly Developer Experience (DX). ",
  "link": "/frontendmasters.com/introducing-svelte-5.md",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "Snippets in Svelte 5",
  "desc": "Out with slots, in with snippets.",
  "link": "/frontendmasters.com/snippets-in-svelte-5.md",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "Fine-Grained Reactivity in Svelte 5",
  "desc": "Svelte is already quite lightweight and fast, but Svelte 5 still overs big improvements in fine-grained reactivity, meaning re-rendering as absolutely little as possible. ",
  "link": "/frontendmasters.com/fine-grained-reactivity-in-svelte-5.md",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Snippets in Svelte 5",
  "desc": "Out with slots, in with snippets.",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/snippets-in-svelte-5.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
