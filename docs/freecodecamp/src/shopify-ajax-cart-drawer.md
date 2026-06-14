---
lang: en-US
title: "How to Build an AJAX Cart Drawer in Shopify (the 2026 Way)"
description: "Article(s) > How to Build an AJAX Cart Drawer in Shopify (the 2026 Way)"
icon: fa-brands fa-shopify
category:
  - Node.js
  - Shopify
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - shopify
  - liquid
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build an AJAX Cart Drawer in Shopify (the 2026 Way)"
    - property: og:description
      content: "How to Build an AJAX Cart Drawer in Shopify (the 2026 Way)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/shopify-ajax-cart-drawer.html
prev: /programming/js-shopify/articles/README.md
date: 2026-07-04
isOriginal: false
author:
  - name: baslefeber
    url: https://freecodecamp.org/news/author/baslefeber/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/16d974f7-5940-4fef-a053-6e1790ed6107.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Shopify > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-shopify/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build an AJAX Cart Drawer in Shopify (the 2026 Way)"
  desc="Add a product to a Shopify store the default way and the whole page reloads. The shopper is looking at your product, they click Add to cart, and the browser throws the page away and rebuilds it. On a "
  url="https://freecodecamp.org/news/shopify-ajax-cart-drawer"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/16d974f7-5940-4fef-a053-6e1790ed6107.png"/>

Add a product to a Shopify store the default way and the whole page reloads. The shopper is looking at your product, they click **Add to cart**, and the browser throws the page away and rebuilds it.

On a slow connection, that's two or three seconds of blank screen. Sometimes they even land on `/cart`, a full page away from the thing they were about to buy, and the momentum is gone.

A cart drawer fixes that. It's the slide-out panel that appears when someone adds an item: the cart updates, a Checkout button sits right there, and the shopper never leaves the page they were on.

Nearly every high-converting Shopify store has one, and you don't need an app to build it. You need two Ajax endpoints and less than a hundred lines of JavaScript.

The catch is that most tutorials, and most AI coding tools, build it the fragile way. They keep a running count in a JavaScript variable and update the DOM by hand. That looks fine in a demo and falls apart the first time two lines merge into one, a discount lands, or a variant sells out between the click and the checkout.

This guide builds it the way a senior developer does, where the server is always the source of truth. Then it shows the 2026 addition that lets your drawer speak the same language as apps and AI shopping agents.

If you want to code along, open a development theme you can edit and build each piece as we go. Everything here runs on a stock Online Store 2.0 theme (Horizon or Dawn) with no app installed.

![The finished drawer: add to cart, no page reload, the panel slides in showing the real cart.](https://cdn.hashnode.com/uploads/covers/6a424d9ed27378c517882227/a5246d30-ff15-4759-b6e5-9f38741fef3f.gif)

---

::: info What You'll Build

By the end, you'll have a drawer that:

- adds to cart over Ajax with no page reload
- re-reads the cart after every change and treats that response as the truth
- renders its own contents and slides open
- handles quantity plus/minus with a single delegated listener
- removes a line and clears the cart
- and, as the final upgrade, exposes itself through Shopify's new standard storefront actions so apps and AI agents can drive it

:::

::: note Prerequisites

- A Shopify theme you can edit (examples assume Online Store 2.0, such as Horizon or Dawn)
- Comfort with `fetch` and promises
- Basic Liquid
- No app, no framework, no build step

:::

---

## Step 1: The Drawer Markup

You'll build the drawer as a section so it renders on every page, and then render the current cart **server-side with Liquid** before any JavaScript runs.

This matters: if a shopper arrives with items already in their cart, the drawer is correct on first paint, and your JavaScript only has to update it after changes. That's progressive enhancement, and it is the first thing a homemade build skips.

The `data-*` attributes below are the contract between the markup and the script. Everything the JavaScript touches, it finds through one of these attributes, never through a class name or a tag position.

```liquid :collapsed-lines
{%- comment -%} sections/cart-drawer.liquid {%- endcomment -%}
<button type="button" class="cart-toggle" data-cart-toggle>
  Cart <span class="cart-count" data-cart-count>{{ cart.item_count }}</span>
</button>

<aside class="drawer" data-drawer aria-label="Cart" aria-hidden="true">
  <div class="drawer__head">
    <h2>Your cart</h2>
    <button type="button" class="drawer__close" data-drawer-close aria-label="Close cart">&times;</button>
  </div>

  <div class="drawer__body">
    <p class="drawer__empty" data-drawer-empty {% if cart.item_count > 0 %}style="display:none"{% endif %}>
      Your cart is empty.
    </p>
    <ul class="drawer__items" data-drawer-items>
      {%- for item in cart.items -%}
        <li class="drawer__item" data-line data-line-key="{{ item.key }}" data-quantity="{{ item.quantity }}">
          {{ item.image | image_url: width: 96 | image_tag: class: 'drawer__item-img', loading: 'lazy', alt: item.product.title }}
          <span class="drawer__item-title">{{ item.product.title }}</span>
          <span class="drawer__item-price">{{ item.final_line_price | money }}</span>
        </li>
      {%- endfor -%}
    </ul>
  </div>

  <div class="drawer__foot">
    <div class="drawer__subtotal">
      <span>Subtotal</span>
      <span data-cart-subtotal>{{ cart.total_price | money }}</span>
    </div>
    <p class="drawer__ship">Shipping &amp; taxes calculated at checkout.</p>
    <a href="{{ routes.cart_url }}" class="drawer__checkout">Checkout</a>
  </div>
</aside>
<div class="drawer__scrim" data-drawer-scrim></div>
```

Two details worth pausing on here: the line item uses `item.final_line_price`, not `item.line_price`. Both exist on the cart, but `final_line_price` reflects line-level discounts, so it's the number the shopper will actually be charged. And each `<li>` carries `data-line-key` and `data-quantity`, which the quantity and remove controls will read later.

The add button lives on your product card or product page and carries the variant id straight from Liquid, so the right variant is added every time:

```liquid
{%- comment -%} in the product card / PDP {%- endcomment -%}
<button
  type="button"
  class="pdp__add"
  data-add
  data-variant-id="{{ product.selected_or_first_available_variant.id }}"
>
  Add to cart
</button>
```

---

## Step 2: Add to Cart Without a Reload

Here is the whole pattern in one sentence: mutate the cart, then re-read it, then render and open. Written out, that is `POST /cart/`<VPIcon icon="fa-brands fa-js"/>`add.js` to add the variant, `GET /cart.js` to read the entire cart back, and then paint the drawer from what came back.

```js
// assets/cart-drawer.js
document.querySelectorAll("[data-add]").forEach(function (btn) {
  btn.addEventListener("click", function () {
    var id = Number(btn.getAttribute("data-variant-id"));
    fetch("/cart/add.js", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: id, quantity: 1 }),
    })
      .then(function (r) { return r.json(); })
      .then(function () { return refresh(); })  // re-read /cart.js
      .then(openDrawer);                         // then slide it in
  });
});
```

Why re-read the cart when <VPIcon icon="fas fa-folder-open"/>`/cart/`<VPIcon icon="fa-brands fa-js"/>`add.js` already returned something? Because the response to <VPIcon icon="fa-brands fa-js"/>`add.js` describes the line you just added, not the whole cart, and the whole cart is what the drawer shows.

More importantly, Shopify is the one that decides the final cart. It might merge your new line into an existing one, apply an automatic discount, or reject a sold-out variant. The only way to be sure the drawer matches reality is to ask for reality. That's what `refresh()` does, and it's the single function in this whole file that's allowed to touch the cart UI:

```js
function refresh() {
  return fetch("/cart.js").then(function (r) { return r.json(); }).then(render);
}
```

Both endpoints here (<VPIcon icon="fas fa-folder-open"/>`/cart/`<VPIcon icon="fa-brands fa-js"/>`add.js` and <VPIcon icon="fa-brands fa-js"/>`/cart.js`) are part of Shopify's [Ajax API](https://shopify.dev/docs/api/ajax), which is available on every storefront with no setup.

![Mutate, then re-read, then render. The same loop runs for add, for quantity changes, and for remove.](https://cdn.hashnode.com/uploads/covers/6a424d9ed27378c517882227/c58705c9-daa0-4650-980b-0db4e3facaa7.png)

---

## Step 3: Render the Drawer from the Server's Truth

`render(cart)` takes a <VPIcon icon="fa-brands fa-js"/>`/cart.js` response and paints the drawer from it. Notice what it doesn't do: it never adds up a total or increments a counter. It reads `item_count` and `total_price` straight off the object Shopify handed back.

```js title="cart.js"
function money(cents) {
  return "$" + (cents / 100).toFixed(2);
}

function render(cart) {
  document.querySelector("[data-cart-count]").textContent = cart.item_count;
  document.querySelector("[data-cart-subtotal]").textContent = money(cart.total_price);

  var itemsEl = document.querySelector("[data-drawer-items]");
  var emptyEl = document.querySelector("[data-drawer-empty]");
  itemsEl.innerHTML = "";
  if (!cart.items.length) { emptyEl.style.display = "block"; return; }
  emptyEl.style.display = "none";

  cart.items.forEach(function (line) {
    var li = document.createElement("li");
    li.className = "drawer__item";
    li.setAttribute("data-line", "");
    li.setAttribute("data-line-key", line.key);
    li.setAttribute("data-quantity", line.quantity);
    li.innerHTML =
      '<img class="drawer__item-img" src="' + (line.image || "") + '" alt="">' +
      '<span class="drawer__item-title">' + line.title + "</span>" +
      '<span class="drawer__item-price">' + money(line.final_line_price) + "</span>";
    itemsEl.appendChild(li);
  });
}
```

The one thing that trips people up is money. The Ajax API returns prices in **cents**. A line that costs `$18.99` comes back as `1899`. Forget to divide by 100 and you ship a `$1,899` coffee. The `money()` helper does that conversion in one place.

One production note: this reads `final_line_price`, which reflects line-level discounts, so it's the number the shopper is actually charged (`line_price` is the pre-discount amount). On a multi-currency store, swap the hand-rolled `money()` for Shopify's own money formatting so the symbol and decimals follow the active market.

![The drawer rendered entirely from a* <VPIcon icon="fa-brands fa-js"/>`/cart.js` *response. The count, the line, and the subtotal all came from the server.](https://cdn.hashnode.com/uploads/covers/6a424d9ed27378c517882227/47f48e61-0d93-434c-914d-bf3a143214b8.gif)

---

## Step 4: Quantity Plus and Minus, with Event Delegation

Every drawer lets the shopper nudge quantities. The obvious way to wire the plus and minus buttons is to loop over them and attach a click handler to each. Do that and the controls go dead after the first change.

Here's why: every time the cart changes you re-render the list. This replaces those `<li>` elements, and the handlers you attached went with the old elements. The new buttons have no listeners.

The fix is **event delegation**. Attach one listener to the parent that never gets replaced (the `<ul>`), and when a click bubbles up, check what was actually clicked. One handler, and it keeps working through every re-render because the element it's attached to never moves.

```js
var itemsEl = document.querySelector("[data-drawer-items]");

itemsEl.addEventListener("click", function (e) {
  var inc = e.target.closest("[data-qty-inc]");
  var dec = e.target.closest("[data-qty-dec]");
  if (!inc && !dec) return;

  var line = e.target.closest("[data-line]");
  var key = line.getAttribute("data-line-key");
  var qty = Number(line.getAttribute("data-quantity"));
  var nextQty = inc ? qty + 1 : qty - 1;

  fetch("/cart/change.js", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: key, quantity: nextQty }),
  })
    .then(function (r) { return r.json(); })
    .then(render);
});
```

For this version, `render()` emits the stepper controls inside each line:

```js
li.innerHTML =
  '<img class="drawer__item-img" src="' + (line.image || "") + '" alt="">' +
  '<span class="drawer__item-title">' + line.title + "</span>" +
  '<span class="drawer__item-qty">' +
    '<button class="qty-btn" data-qty-dec aria-label="Decrease">-</button>' +
    '<span class="qty-value">' + line.quantity + "</span>" +
    '<button class="qty-btn" data-qty-inc aria-label="Increase">+</button>' +
  "</span>" +
  '<span class="drawer__item-price">' + money(line.final_line_price) + "</span>";
```

One detail that's easy to get wrong: the change request sends `id: key`, the line **key**, not the variant id. A cart can hold the same variant on two separate lines when they carry different line-item properties (an engraving, a gift note). The key is what uniquely identifies a single line, so that's what <VPIcon icon="fas fa-folder-open"/>`/cart/`<VPIcon icon="fa-brands fa-js"/>`change.js` wants.

![One delegated listener drives every line's stepper, now and after every re-render.](https://cdn.hashnode.com/uploads/covers/6a424d9ed27378c517882227/f8d4e99b-a446-4a7c-b3de-70fbfdcbf184.gif)

---

## Step 5: Remove a Line, and Clear the Cart

New developers might go looking for <VPIcon icon="fas fa-folder-open"/>`/cart/`<VPIcon icon="fa-brands fa-js"/>`remove.js`, but it doesn't exist. In Shopify's cart API, removing a line **is** changing its quantity to zero on the same <VPIcon icon="fas fa-folder-open"/>`/cart/`<VPIcon icon="fa-brands fa-js"/>`change.js` route you just used for the stepper. Clearing the whole cart has its own endpoint, <VPIcon icon="fas fa-folder-open"/>`/cart/`<VPIcon icon="fa-brands fa-js"/>`clear.js`, which takes no body.

```js
// Remove: one delegated listener, quantity 0 deletes the line.
itemsEl.addEventListener("click", function (e) {
  var remove = e.target.closest("[data-remove]");
  if (!remove) return;
  var key = e.target.closest("[data-line]").getAttribute("data-line-key");
  fetch("/cart/change.js", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: key, quantity: 0 }),
  })
    .then(function (r) { return r.json(); })
    .then(render);
});

// Clear: empty the whole cart, no body.
document.querySelector("[data-cart-clear]").addEventListener("click", function () {
  fetch("/cart/clear.js", { method: "POST" })
    .then(function (r) { return r.json(); })
    .then(render);
});
```

Both re-render from the server response, same as everything else. That's the discipline that keeps a removed item from lingering in the count: you don't splice the `<li>` out of the DOM and hope. You tell the server, then draw what the server says.

---

## Step 6: Re-Rendering with the Section Rendering API (the Version You'd Ship)

Everything so far rebuilds the drawer's HTML in JavaScript. It works, but look at what it costs: your drawer markup now lives in two places, once in the Liquid from Step 1 and once in the template strings inside `render()`. Change the design and you have to change both, in sync, forever.

Shopify's answer is **bundled section rendering**. You ask the cart endpoint to return the re-rendered section HTML in the same request that changes the cart. The markup lives only in Liquid, and the server hands you the finished HTML to drop in.

You opt in by adding a `sections` parameter to the cart request:

```js
fetch("/cart/add.js", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    id: variantId,
    quantity: 1,
    sections: "cart-drawer",              // section id(s), comma-separated
    sections_url: window.location.pathname // optional render context
  }),
})
  .then(function (r) { return r.json(); })
  .then(function (cart) {
    // Shopify returns rendered HTML under `sections`, keyed by id.
    var html = cart.sections["cart-drawer"];
    if (html) {
      document.querySelector("[data-drawer]").innerHTML =
        new DOMParser().parseFromString(html, "text/html")
          .querySelector("[data-drawer]").innerHTML;
    }
    openDrawer();
  });
```

What's worth knowing about it, all from the [<VPIcon icon="fa-brands fa-shopify"/>Ajax Cart API reference](https://shopify.dev/docs/api/ajax/reference/cart) and the [<VPIcon icon="fa-brands fa-shopify"/>Section Rendering API docs](https://shopify.dev/docs/api/ajax/section-rendering):

- Bundled section rendering is available on <VPIcon icon="fas fa-folder-open"/>`/cart/add`, <VPIcon icon="fas fa-folder-open"/>`/cart/change`, <VPIcon icon="fas fa-folder-open"/>`/cart/clear`, and <VPIcon icon="fas fa-folder-open"/>`/cart/update`.
- `sections` is a comma-separated list (or array) of section IDs, up to five.
- `sections_url` must begin with `/`. If you omit it, sections render in the context of the current page (based on the `Referer` header).
- The rendered HTML comes back under the `sections` key of the JSON response, keyed by section ID.
- A section that fails to render, including one that doesn't exist, comes back as `null` with an HTTP 200. Always guard for null.
- The section ID is `section.id` in Liquid, or the `id="shopify-section-[id]"` on the wrapper. For a section rendered by filename (for example `{% section 'cart-drawer' %}` in `theme.liquid`), the ID is just `cart-drawer`. Inside a JSON template it gets a dynamic ID like `template--123__cart-drawer`, so check the wrapper before you hardcode the key.

The plain Section Rendering API (a `GET` with `?sections=` or `?section_id=` appended to any page URL) is the same idea for non-cart updates like paginated search or infinite scroll. Shopify's own guidance is: for anything driven by a cart change, prefer bundled section rendering over a separate call, because it saves a round trip.

This isn't a toy pattern. Shopify's own Horizon theme drives its cart exactly this way: its cart components send a `sections` list on their <VPIcon icon="fas fa-folder-open"/>`/cart/`<VPIcon icon="fa-brands fa-js"/>`change.js` calls and re-render from `response.sections`, reading each section's id from a data attribute rather than hardcoding it. That's the production version of the caveat above: never assume the id is a bare `cart-drawer`. Read it off the rendered wrapper instead.

---

## The 2026 Upgrade: Standard Storefront Events and Actions

Everything above is timeless Shopify. Now the new part.

On June 17, 2026, as part of the Spring '26 Edition, Shopify shipped [<VPIcon icon="fa-brands fa-shopify"/>standard storefront events and actions](https://shopify.dev/changelog/standard-storefront-events-and-actions), and they're generally available.

The idea is that themes now **emit** a standardized set of DOM events (all namespaced `shopify:`) and **expose** a standardized set of actions on `Shopify.actions`. An app or an AI shopping agent can now interact with any storefront through one contract, instead of reverse-engineering each theme's private JavaScript.

To feel why that matters, think about how an upsell app used to detect an add-to-cart on a theme it had never seen.

It had four bad options: monkey-patch `fetch` to sniff calls to <VPIcon icon="fas fa-folder-open"/>`/cart/add`, listen for a theme-specific custom event whose name changed from theme to theme, poll <VPIcon icon="fa-brands fa-js"/>`/cart.js` on a timer and diff it, or scrape the DOM for a cart-count node by selector. Every one of them breaks when the merchant reskins or switches themes.

This is also the exact code an AI assistant tends to generate when you ask it to "run something after add to cart," because that brittle pattern dominates its training data.

The problem was never that the developer was careless. There was simply no stable interface to target.

![Four fragile per-theme tactics collapse into one integration against a contract that survives a reskin.](https://cdn.hashnode.com/uploads/covers/6a424d9ed27378c517882227/59634003-a020-4b57-8d12-7ddcfde97f7f.png)

Crucially, this layer sits **on top of** the drawer you just built. It doesn't replace the Ajax API. The docs even show the theme-side event wrapping the same <VPIcon icon="fas fa-folder-open"/>`/cart/`<VPIcon icon="fa-brands fa-js"/>`add.js` and <VPIcon icon="fa-brands fa-js"/>`/cart.js` calls, and Shopify shipped a helper whose only job is to convert a <VPIcon icon="fa-brands fa-js"/>`/cart.js` response into the event's payload shape. So none of your work is wasted. You're about to give it a public door.

### The Events: the Theme Tells the World What Happened

Each event uses the `shopify:` namespace, follows a `category:action` naming pattern, dispatches from the most specific element (a product card, the cart, a collection container), and bubbles to `document`. The payloads follow the Storefront GraphQL API shape, with camelCase fields.

| Event | Fires when |
| --- | --- |
| `shopify:page:view` | Every page load |
| `shopify:product:view` | A product becomes visible |
| `shopify:product:select` | Buyer changes variant selection |
| `shopify:cart:view` | Cart becomes visible |
| `shopify:cart:lines-update` | Cart lines added, updated, or removed |
| `shopify:cart:note-update` | Cart note changes |
| `shopify:cart:discount-update` | Discount codes applied or removed |
| `shopify:cart:error` | A cart mutation fails |
| `shopify:collection:view` | Collection page loads |
| `shopify:collection:update` | Collection filters or sort change |
| `shopify:search:update` | Search filters or sort change |

An app subscribes with the ordinary DOM API. No SDK:

```js
document.addEventListener('shopify:cart:lines-update', (event) => {
  console.log(event.action, event.lines);
  event.promise?.then(({ cart }) => {
    console.log(cart.cost.totalAmount.amount);
  });
});
```

The cart, note, discount, product-select, collection-update, and search-update events carry a `promise` field for their async result. That lets a listener show a loading or optimistic state immediately, then read the settled `{ cart }` when the operation resolves.

### Emitting an Event From Your Theme

The events library is hosted on the Shopify CDN. You load it through an import map (for module themes like Horizon) or assign it to a global (for Dawn-style themes).

A theme fires an event by constructing the event class and calling `dispatchEvent()`. Read this carefully and you'll see that it wraps the exact same <VPIcon icon="fas fa-folder-open"/>`/cart/`<VPIcon icon="fa-brands fa-js"/>`add.js` and <VPIcon icon="fa-brands fa-js"/>`/cart.js` calls from Step 2:

```js title="/cart/add.js"
import { CartLinesUpdateEvent, CartErrorEvent } from '@theme/standard-events';

const deferred = CartLinesUpdateEvent.createPromise();
element.dispatchEvent(new CartLinesUpdateEvent({
  action: 'add',
  context: 'product',
  lines: [{ merchandiseId: variantId, quantity: 1 }],
  promise: deferred.promise,
}));

try {
  const response = await fetch(window.Shopify.routes.root + 'cart/add.js', { method: 'POST', body, headers });
  if (!response.ok) throw new Error('Add to cart failed');
  const ajaxCart = await fetch(window.Shopify.routes.root + 'cart.js').then(r => r.json());
  deferred.resolve({
    cart: CartLinesUpdateEvent.createCartFromAjaxResponse(ajaxCart),
  });
} catch (e) {
  element.dispatchEvent(new CartErrorEvent({ error: e.message, code: 'SERVICE_UNAVAILABLE' }));
  deferred.reject(e);
}
```

That static `createCartFromAjaxResponse(ajaxCart)` is the bridge between the classic Ajax drawer and the new event contract. It converts your <VPIcon icon="fa-brands fa-js"/>`/cart.js` response into the Storefront-API-shaped payload the events expect, so the drawer you already have plugs straight in.

### The Actions: the World Asks the Theme to Do Something

Actions are async functions on `Shopify.actions`, injected on every Liquid storefront with no script tag of your own:

```js title="cart.js"
// Add, update, or remove lines. Also handles note + discountCodes.
const { cart, userErrors, warnings } = await Shopify.actions.updateCart({
  lines: [
    { merchandiseId: "gid://shopify/ProductVariant/123", quantity: 1 }, // add
    { id: "gid://shopify/CartLine/456", quantity: 5 },                  // update
    { id: "gid://shopify/CartLine/789", quantity: 0 },                  // remove
  ],
});
//
// Promise<{ cart, userErrors?, warnings? }>

await Shopify.actions.openCart();                 // Promise<void>
const { cart } = await Shopify.actions.getCart(); // reads current cart
```

The defaults work on a stock theme with no changes: `updateCart` writes to the Storefront API and refreshes in place, falling back to a full page reload. `openCart` opens a `<cart-drawer-component>` or `<cart-drawer>` element if one exists, otherwise it redirects to `/cart`. `getCart` reads the current cart. And when a configured action succeeds, the runtime **auto-emits** the matching event, so an app that calls `updateCart` never has to also dispatch `shopify:cart:lines-update`.

### Overriding an Action to Drive Your Drawer

This is the payoff. Because a theme can override an action's default, you can intercept `openCart` and `updateCart` so that any app's call routes through the drawer you already built, instead of triggering a page reload. The app doesn't need to know your markup. It calls the standard action, and your override decides what the UI does.

Register the override inside a `DOMContentLoaded` listener placed **above** `{{ content_for_header }}` in your layout, so it runs before any app code:

```js
document.addEventListener('DOMContentLoaded', () => {
  Shopify.actions.updateCart.configure({
    eventTarget: (meta) => {
      if (meta.type === 'shopify:cart:note-update') return document.querySelector('cart-note');
      if (meta.type === 'shopify:cart:discount-update') return document.querySelector('cart-discount');
      if (meta.type === 'shopify:cart:lines-update' && meta.action === 'add') {
        return document.querySelector('product-form');
      }
      return document.querySelector('cart-items');
    },
    async handler(defaultHandler, payload, options) {
      const result = await defaultHandler();
      customUpdateUI(result); // your render() + openDrawer() from earlier
      return result;
    },
  });
});
```

`openCart` has a simpler override:

```js
Shopify.actions.openCart.configure({
  handler() { document.querySelector('cart-drawer')?.open(); },
});
```

A few rules that will save you time:

- `eventTarget` is required for `updateCart`. It decides which element the auto-emitted events dispatch from.
- `getCart` is intentionally **not** configurable. Calling `configure()` on it is a TypeScript error and a runtime `TypeError`.
- `isDefault()` tells you whether the theme has overridden an action yet.
- `updateCart` resolves with `{ cart, userErrors?, warnings?, detail? }` and rejects only when it couldn't run at all (a network failure or a malformed payload). A `userErrors` array means the mutation was rejected (codes like `INVALID`, `MAXIMUM_EXCEEDED`). A `warnings` array means it succeeded with caveats (`MERCHANDISE_OUT_OF_STOCK`, `DISCOUNT_NOT_FOUND`). Check both before you trust `cart`.

![An app or AI agent calls a standard action, a theme override routes it through the existing cart-drawer logic, and the drawer opens in place with no reload](https://cdn.hashnode.com/uploads/covers/6a424d9ed27378c517882227/1401861d-5800-40b7-ad04-7887625986ec.png)

### Verifying it

Run `shopify theme dev` and the CLI loads a development build of the events runtime that validates payloads and logs a warning when a field is malformed or missing.

Those checks are stripped in production. Add the `--standard-events-inspector` flag and it injects a floating debug panel into your local pages with two tabs: **Events**, which shows every emitted standard event live with its full payload, and **Actions**, which lets you dispatch actions by hand and inspect the result. When you're wiring up payloads, trust the inspector over any tutorial, including this one.

---

## Why This Matters

Two ideas in this build outlast the specific code, and they're the difference between a drawer that works and one you can maintain.

### Event Delegation

One listener on a parent that never gets replaced, reading `e.target.closest(...)`, handles every child element: the ones on the page now and the ones you have not rendered yet. Bind a handler per button instead and it dies the instant the list re-renders, which in a cart drawer is constantly.

Delegation is also, not by coincidence, the pattern AI tools most reliably get wrong, because per-element binding is what shows up most in their training data. Knowing to reach for delegation is exactly the kind of judgment that doesn't come from the syntax.

### The Section Rendering API

Instead of keeping your drawer's markup in two places and praying they stay in sync, you let the server render the section and hand you the HTML. Your markup lives in one file, and it stays correct when a merchant edits the section in the theme editor.

The trade is a slightly larger response and a parse step, in exchange for never maintaining the same markup twice.

And under all of it, one rule: after every mutation, re-read the cart (or the rendered section) and paint from the server's response. The local counter is the bug. Everything else in this article is a variation on trusting the server.

---

## The Complete Files

For anyone who scrolled straight here, this is the whole thing: the section markup, the JavaScript, and the CSS. The JavaScript combines add, quantity, remove, and clear, all re-rendering from the server response.

```liquid title="sections/cart-drawer.liquid"
<button type="button" class="cart-toggle" data-cart-toggle>
  Cart <span class="cart-count" data-cart-count>{{ cart.item_count }}</span>
</button>

<aside class="drawer" data-drawer aria-label="Cart" aria-hidden="true">
  <div class="drawer__head">
    <h2>Your cart</h2>
    <button type="button" class="drawer__close" data-drawer-close aria-label="Close cart">&times;</button>
  </div>

  <div class="drawer__body">
    <p class="drawer__empty" data-drawer-empty {% if cart.item_count > 0 %}style="display:none"{% endif %}>
      Your cart is empty.
    </p>
    <ul class="drawer__items" data-drawer-items>
      {%- for item in cart.items -%}
        <li class="drawer__item" data-line data-line-key="{{ item.key }}" data-quantity="{{ item.quantity }}">
          {{ item.image | image_url: width: 96 | image_tag: class: 'drawer__item-img', loading: 'lazy', alt: item.product.title }}
          <span class="drawer__item-title">{{ item.product.title }}</span>
          <span class="drawer__item-qty">
            <button type="button" class="qty-btn" data-qty-dec aria-label="Decrease">-</button>
            <span class="qty-value">{{ item.quantity }}</span>
            <button type="button" class="qty-btn" data-qty-inc aria-label="Increase">+</button>
          </span>
          <span class="drawer__item-price">{{ item.final_line_price | money }}</span>
          <button type="button" class="drawer__remove" data-remove aria-label="Remove">Remove</button>
        </li>
      {%- endfor -%}
    </ul>
  </div>

  <div class="drawer__foot">
    <div class="drawer__subtotal">
      <span>Subtotal</span>
      <span data-cart-subtotal>{{ cart.total_price | money }}</span>
    </div>
    <button type="button" class="drawer__clear" data-cart-clear>Clear cart</button>
    <a href="{{ routes.cart_url }}" class="drawer__checkout">Checkout</a>
  </div>
</aside>
<div class="drawer__scrim" data-drawer-scrim></div>

{% schema %}
{ "name": "Cart drawer" }
{% endschema %}
```

```js :collapsed-lines title="assets/cart-drawer.js"
(function () {
  var countEl = document.querySelector("[data-cart-count]");
  var itemsEl = document.querySelector("[data-drawer-items]");
  var emptyEl = document.querySelector("[data-drawer-empty]");
  var subtotalEl = document.querySelector("[data-cart-subtotal]");
  var drawer = document.querySelector("[data-drawer]");
  var scrim = document.querySelector("[data-drawer-scrim]");
  var clearBtn = document.querySelector("[data-cart-clear]");

  // --- Add to cart: mutate, re-read, render, open ---
  document.querySelectorAll("[data-add]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var id = Number(btn.getAttribute("data-variant-id"));
      fetch("/cart/add.js", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: id, quantity: 1 }),
      })
        .then(function (r) { return r.json(); })
        .then(function () { return refresh(); })
        .then(openDrawer);
    });
  });

  // --- Quantity +/- : one delegated listener on the stable list ---
  itemsEl.addEventListener("click", function (e) {
    var inc = e.target.closest("[data-qty-inc]");
    var dec = e.target.closest("[data-qty-dec]");
    if (!inc && !dec) return;
    var line = e.target.closest("[data-line]");
    var key = line.getAttribute("data-line-key");
    var qty = Number(line.getAttribute("data-quantity"));
    var nextQty = inc ? qty + 1 : qty - 1;
    fetch("/cart/change.js", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: key, quantity: nextQty }),
    }).then(function (r) { return r.json(); }).then(render);
  });

  // --- Remove a line: quantity 0 (there is no /cart/remove.js) ---
  itemsEl.addEventListener("click", function (e) {
    var remove = e.target.closest("[data-remove]");
    if (!remove) return;
    var key = e.target.closest("[data-line]").getAttribute("data-line-key");
    fetch("/cart/change.js", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: key, quantity: 0 }),
    }).then(function (r) { return r.json(); }).then(render);
  });

  // --- Clear the whole cart ---
  clearBtn.addEventListener("click", function () {
    fetch("/cart/clear.js", { method: "POST" })
      .then(function (r) { return r.json(); })
      .then(render);
  });

  // --- The one function that paints the drawer from the cart ---
  function money(cents) { return "$" + (cents / 100).toFixed(2); }

  function render(cart) {
    countEl.textContent = cart.item_count;
    subtotalEl.textContent = money(cart.total_price);
    itemsEl.innerHTML = "";
    if (!cart.items.length) { emptyEl.style.display = "block"; return; }
    emptyEl.style.display = "none";
    cart.items.forEach(function (line) {
      var li = document.createElement("li");
      li.className = "drawer__item";
      li.setAttribute("data-line", "");
      li.setAttribute("data-line-key", line.key);
      li.setAttribute("data-quantity", line.quantity);
      li.innerHTML =
        '<img class="drawer__item-img" src="' + (line.image || "") + '" alt="">' +
        '<span class="drawer__item-title">' + line.title + "</span>" +
        '<span class="drawer__item-qty">' +
          '<button type="button" class="qty-btn" data-qty-dec aria-label="Decrease">-</button>' +
          '<span class="qty-value">' + line.quantity + "</span>" +
          '<button type="button" class="qty-btn" data-qty-inc aria-label="Increase">+</button>' +
        "</span>" +
        '<span class="drawer__item-price">' + money(line.final_line_price) + "</span>" +
        '<button type="button" class="drawer__remove" data-remove aria-label="Remove">Remove</button>';
      itemsEl.appendChild(li);
    });
  }

  function refresh() {
    return fetch("/cart.js").then(function (r) { return r.json(); }).then(render);
  }
  function openDrawer() { drawer.classList.add("is-open"); scrim.classList.add("is-open"); }
  function closeDrawer() { drawer.classList.remove("is-open"); scrim.classList.remove("is-open"); }

  document.querySelector("[data-cart-toggle]").addEventListener("click", function () { refresh().then(openDrawer); });
  document.querySelector("[data-drawer-close]").addEventListener("click", closeDrawer);
  scrim.addEventListener("click", closeDrawer);

  refresh(); // paint on load
})();
```

```css title="assets/cart-drawer.css"
.drawer {
  position: fixed;
  inset: 0 0 0 auto;
  width: min(420px, 100%);
  background: #fff;
  transform: translateX(100%);
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
}
.drawer.is-open { transform: translateX(0); }
.drawer__scrim {
  position: fixed; inset: 0;
  background: rgba(30, 18, 6, 0.45);
  opacity: 0; pointer-events: none;
  transition: opacity 0.3s ease;
}
.drawer__scrim.is-open { opacity: 1; pointer-events: auto; }
```

---

## Wrap Up

You now have a cart drawer that adds, updates, removes, and clears without a reload, that never lets its UI drift from the real cart, and that, with an action override, presents a clean public interface to the entire app ecosystem, humans and AI agents alike.

The Ajax foundation is the same it has been for years. The 2026 layer sits on top of it, so the drawer you built today is ready for whatever calls it tomorrow.

::: info

If you want to build this exact drawer interactively, writing the JavaScript and watching the real storefront react, you can do it for free at [<VPIcon icon="fas fa-globe"/>learnshopify.dev](https://learnshopify.dev/learn/cart-drawer-component).

![learnshopify.dev landings page, interactive platform to learn shopify development](https://cdn.hashnode.com/uploads/covers/6a424d9ed27378c517882227/7bd7cf3b-389d-413c-b2e6-c287ffcafbc3.png)

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build an AJAX Cart Drawer in Shopify (the 2026 Way)",
  "desc": "Add a product to a Shopify store the default way and the whole page reloads. The shopper is looking at your product, they click Add to cart, and the browser throws the page away and rebuilds it. On a ",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/shopify-ajax-cart-drawer.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
