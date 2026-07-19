---
lang: en-US
title: "How to Make a Static HTML Page Editable in the Browser with Vanilla JavaScript"
description: "Article(s) > How to Make a Static HTML Page Editable in the Browser with Vanilla JavaScript"
icon: fa-brands fa-js
category:
  - JavaScript
  - CSS
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - js
  - javascript
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Make a Static HTML Page Editable in the Browser with Vanilla JavaScript"
    - property: og:description
      content: "How to Make a Static HTML Page Editable in the Browser with Vanilla JavaScript"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-make-a-static-html-page-editable-in-the-browser-with-vanilla-javascript.html
prev: /programming/js/articles/README.md
date: 2026-07-23
isOriginal: false
author:
  - name: timothy ogbemudia
    url: https://freecodecamp.org/news/author/glamboyosa/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/08400ed2-ef6a-404f-a135-b6cefe9d6919.png
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
  name="How to Make a Static HTML Page Editable in the Browser with Vanilla JavaScript"
  desc="When you maintain a document for someone else, such as a résumé, a one-page portfolio, or a printable menu, the bottleneck is rarely the layout. It's the edit loop. Every small change (”move this bull"
  url="https://freecodecamp.org/news/how-to-make-a-static-html-page-editable-in-the-browser-with-vanilla-javascript"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/08400ed2-ef6a-404f-a135-b6cefe9d6919.png"/>

When you maintain a document for someone else, such as a résumé, a one-page portfolio, or a printable menu, the bottleneck is rarely the layout. It's the edit loop.

Every small change ("move this bullet up", "delete that line", "this link is dead") goes through you, the person with the code editor, even though the person requesting the change knows exactly what they want.

I ran into this maintaining a family member's résumé as a single static HTML file. The design was done. The content was theirs. But every revision, whether it was reordering a role, adding a certification, fixing a link, or nudging a print page break, meant another round of "send me the change, I'll edit the file." After the tenth round, the fix became obvious: make the page edit itself.

In this article, you'll build an in-browser editing layer for a static HTML page using `contenteditable`, about a hundred lines of vanilla JavaScript, and no build step. The person editing can change any text, reorder or delete any block, add new content, edit links, control print pagination, and print to PDF. A refresh restores the original file, untouched.

::: note Prerequisites

To follow along, you should have:

- Working knowledge of HTML and CSS, including CSS Grid and `@media print`
- Basic understanding of JavaScript DOM APIs (`querySelector`, event listeners, creating elements)
- No frameworks, libraries, or build tools. That's the point.

:::

::: info What You Will Learn

- What `contenteditable` gives you for free, and where it stops
- How to attach move/delete controls to repeatable blocks with one reusable function
- How to show controls only on the innermost hovered block using `:has()`
- How to reorder DOM nodes without a framework, and the markup prep that makes it safe
- How to edit link URLs inside an editable region
- How to let users place print page breaks themselves
- How to add new content from templates, with placeholder text pre-selected
- Why "nothing persists" can be a feature, not a limitation

:::

## What Is `contenteditable`?

`contenteditable` is an HTML attribute that turns any element into an editable region. The browser handles the hard parts: caret placement, text selection, typing, deletion, clipboard, and undo history.

```html
<div class="page" contenteditable="true" spellcheck="false">
  <!-- the entire document -->
</div>
```

That one attribute gets you further than you might expect. Clicking any paragraph places a caret. Cmd+Z undoes typing. Pressing Enter inside a `<ul>` creates a new `<li>`. The browser understands list semantics natively, so "add a bullet by pressing Enter" works with zero code.

But `contenteditable` alone isn't an editor. It has no concept of *blocks*. It won't move a job entry above another one, delete a card cleanly, or change an `href`. Clicking a link inside an editable region just places the caret in its text. Everything structural is on you. The rest of this article is about filling that gap.

---

## Why Not a React App?

The obvious alternative is to rebuild the page as a "real" app: components, state, a form per section, and an export button. I decided against it, and the tradeoff is important.

The file lives in a `public/` folder and is served as a static asset. It works from a URL, from disk, or from an email attachment. It has no dependencies to install, no build to run, and no way to rot when a toolchain updates.

The editing needs are small and bounded: change text, move blocks, delete blocks, add blocks, and print. That's DOM manipulation, the thing the DOM API is already good at.

A framework earns its complexity when state outlives the DOM: persistence, collaboration, validation, and syncing. This page has none of those requirements. When your state *is* the DOM and the lifetime is one session, a framework is an extra layer that buys you nothing.

---

## How to Prepare the Markup for Reordering

Before writing any JavaScript, look at your markup for anything positional, meaning elements that only make sense *between* other elements. In my case, jobs were separated by `<hr>` dividers:

```html
<div class="job">...</div>
<hr class="divider">
<div class="job">...</div>
```

The moment blocks can move or be deleted, separators like this become landmines. Delete a job and its divider survives as an orphaned line. Move a job and the divider stays behind.

The fix is to delete the `<hr>` elements entirely and derive the separator from adjacency:

```css
.section .job + .job {
  border-top: 0.5px solid var(--rule);
  padding-top: 18px;
}
```

The sibling combinator draws a rule above every job that follows another job. Reorder them, delete them, add new ones, and the separators are always exactly where they should be, because they're computed from structure rather than stored in it. This is the same principle as deriving state instead of duplicating it, applied to CSS.

---

## How to Attach Controls to Every Block

Each movable block gets a small control cluster with move up, move down, and delete actions, injected by one reusable function:

```js
const SELECTORS = ['.section', '.job', '.bullets li', '.cert-card', '.skills-row', '.edu-row'];
const BREAKABLE = new Set(['.section', '.job']);

function makeBlock(el, sel) {
  el.classList.add('blk');
  el.dataset.sel = sel;
  const ctl = document.createElement('span');
  ctl.className = 'ctl';
  ctl.setAttribute('contenteditable', 'false');
  ctl.innerHTML =
    '<button data-act="up" data-tip="Move this up">↑</button>' +
    '<button data-act="down" data-tip="Move this down">↓</button>' +
    (BREAKABLE.has(sel) ? '<button data-act="brk" data-tip="Page break: start a new printed page here">⇟</button>' : '') +
    '<button data-act="del" data-tip="Remove this. Refresh to bring it back">×</button>';
  el.appendChild(ctl);
}

SELECTORS.forEach(sel => {
  page.querySelectorAll(sel).forEach(el => makeBlock(el, sel));
});
```

A few design decisions are worth calling out.

First, `contenteditable="false"` on the control cluster. Editable regions inherit. Everything inside the page is editable unless you opt out. Without this, the user could place a caret inside your buttons and delete them like text.

Second, `el.dataset.sel` records *which selector matched*. This matters later: when a block moves, it should only swap with siblings of its own kind. A bullet moves among bullets, a job among jobs. Storing the selector on the element makes that check trivial.

Third, the controls live *inside* the block they control. That gives you positioning for free, with `position: absolute` against the block's own `position: relative`, and means a block carries its controls with it wherever it moves.

---

## How to Show Controls Only on the Innermost Block

Blocks nest: a bullet sits inside a job, which sits inside a section. Hovering a bullet technically hovers all three, and naïve CSS shows three control clusters at once. The result is visual noise exactly where the user is trying to focus.

Modern CSS solves this in one line:

```css
.blk:hover:not(:has(.blk:hover)) > .ctl { display: inline-flex; }
```

Read it inside out: show a block's controls when it's hovered, *unless* some descendant block is also hovered, in which case that deeper block wins. Hover a bullet, you get bullet controls. Hover the job's title (outside any bullet), you get job controls. One rule, no JavaScript.

`:has()` is supported in every current browser, but a fallback costs one more rule:

```css
@supports not selector(:has(*)) {
  .blk:hover > .ctl { display: inline-flex; }
}
```

Older browsers get the noisier all-ancestors behavior instead of no controls at all. Degrade loudly, not silently.

---

## How to Move and Delete Blocks

With controls attached, the actual reordering is short. One delegated listener handles every button on the page:

```js
function siblings(el) {
  return [...el.parentElement.children].filter(c =>
    c.classList.contains('blk') && c.dataset.sel === el.dataset.sel);
}

page.addEventListener('click', e => {
  const btn = e.target.closest('.ctl button');
  if (!btn) return;
  e.preventDefault();
  const el = btn.closest('.blk');
  const sibs = siblings(el);
  const i = sibs.indexOf(el);
  const act = btn.dataset.act;
  if (act === 'up' && i > 0) sibs[i - 1].before(el);
  else if (act === 'down' && i < sibs.length - 1) sibs[i + 1].after(el);
  else if (act === 'del') el.remove();
  else if (act === 'brk') el.classList.toggle('page-break');
});
```

`siblings()` is where `dataset.sel` pays off: it filters the parent's children down to blocks *of the same kind*, so a job can never swap into the middle of a bullet list. `before()` and `after()` move the live node with no cloning or re-rendering, and the block's own controls travel with it.

There's one subtle bug to prevent. Clicking a button inside an editable region moves the text caret first, which can scroll the page or collapse a selection. Suppress it at `mousedown`, before the browser acts:

```js
page.addEventListener('mousedown', e => {
  if (e.target.closest('.ctl, .add-btn')) e.preventDefault();
});
```

Forgetting this is the kind of thing you only notice as a vague feeling that clicking buttons "jumps." It's worth ruling out before it ships.

---

## How to Edit Links Inside `contenteditable`

Inside an editable region, single-clicking a link places the caret instead of navigating. That's correct for text editing but leaves no way to change the URL itself. The `href` isn't text, it's an attribute.

Double-click is unclaimed real estate, so hang URL editing off it:

```js
page.addEventListener('dblclick', e => {
  const a = e.target.closest('a');
  if (!a) return;
  e.preventDefault();
  const url = prompt('Link URL (leave empty to remove the link):', a.getAttribute('href'));
  if (url === null) return;
  if (!url.trim()) a.replaceWith(document.createTextNode(a.textContent));
  else a.setAttribute('href', url.trim());
});
```

Yes, `prompt()`. It's unfashionable, but consider what a custom modal would cost: markup, styles, focus management, and an escape handler, all for a dialog that asks one question. `prompt()` is native, keyboard-accessible, and can't break.

The empty-string branch is a nice touch: it unwraps the link entirely, replacing it with its own text, so "remove this link" doesn't require knowing any HTML.

Since none of this is discoverable, tell the user. A `title` attribute on every link ("Double-click to change this link") surfaces the affordance exactly where it's needed.

---

## How to Let Users Control Print Pagination

If the document's destination is a printed PDF, page breaks are content decisions, like "start my Skills section on page three," and the user should own them. CSS makes the break itself easy:

```css
@media print {
  .page-break { break-before: page; page-break-before: always; }
  .job { break-inside: avoid; page-break-inside: avoid; }
}
```

The interesting part is the interface. The `⇟` button you saw in `makeBlock` just toggles the `page-break` class on a job or section. On screen, the class renders as a dashed accent line above the block, a visible seam showing where the printed page will end:

```css
.page .page-break {
  border-top: 1.5px dashed var(--accent) !important;
  padding-top: 14px !important;
}

@media print {
  .page .page-break { border-top: none !important; padding-top: 0 !important; }
}
```

The dashed line exists only on screen. In print it vanishes and the actual break takes its place. The user toggles, glances at the seam, and prints. Nobody edits CSS to re-paginate a document, and just as importantly, nobody asks me to.

The same `@media print` block hides every piece of editing chrome (`.toolbar, .ctl, .add-btn { display: none !important; }`), so the printed output is indistinguishable from the original static page.

---

## How to Add New Content from Templates

Editing and deleting only go so far. Eventually someone needs a new bullet, a new role, or a new certification. Each repeatable container gets a dashed "+ Add" button that builds a blank block from a template:

```js
skillsSection.appendChild(newAddBtn('+ Add skill row', 'Adds a blank row. Type over the placeholder.', btn => {
  const row = document.createElement('div');
  row.className = 'skills-row';
  row.innerHTML =
    '<span class="skill-label">Label</span>' +
    '<span class="skill-items">Skill one, skill two, skill three</span>';
  skillsSection.insertBefore(row, btn);
  makeBlock(row, '.skills-row');
  selectText(row.querySelector('.skill-label'));
}));
```

Two details here do most of the work.

New blocks go through the same `makeBlock` as everything parsed at load. There is exactly one code path for "this is a block now", so added content is immediately movable and deletable. For roles it gets its own nested "+ Add bullet" button.

If you find yourself writing a second registration path for dynamic content, stop. You're about to fork behavior that must stay identical.

And `selectText` pre-selects the placeholder:

```js
function selectText(node) {
  const range = document.createRange();
  range.selectNodeContents(node);
  const sel = getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
}
```

Click "+ Add skill row" and the word `Label` is already highlighted, so typing replaces it. No clicking into the field, no manually deleting placeholder text, and no placeholders accidentally left in the printed document.

One caveat: select the *text node*, not the block. The block contains your `contenteditable="false"` control cluster, and a selection spanning it will delete your buttons along with the placeholder on the first keystroke.

---

## Why Nothing Persists

Every edit lives in the DOM and dies on refresh. That sounds like the missing feature, but it's the design.

The workflow this page serves is: open, adjust, print to PDF, close. The PDF is the artifact. The page is a template you stamp from. Ephemerality gives you a free, bulletproof undo-everything (refresh), zero risk of a half-finished edit becoming the new baseline, and a canonical version that always matches source control.

The toolbar says it plainly: *"Nothing is saved. Refresh resets everything."* Stated upfront, it reads as a guarantee rather than a gotcha.

Persistence would also be the complexity cliff. The moment edits survive refresh you inherit serialization, versioning, merge conflicts with the source file, and "which copy is real?" Those are the exact problems this design exists to avoid.

---

## Conclusion

You now have a static HTML page that edits itself: `contenteditable` for text, one `makeBlock` function for structure, `:has()` for focused hover controls, a class toggle for print pagination, and templates with pre-selected placeholders for new content. Around a hundred lines of JavaScript, with no dependencies and no build.

Just as important is knowing when this approach stops being right. If edits must persist, if multiple people edit concurrently, or if the content needs validation and workflow, you've outgrown the DOM-as-state model. In those cases, reach for a real application and a database.

But for the wide middle ground of documents that one person adjusts and prints, such as résumés, invoices, certificates, and programmes, the browser already ships the editor. You just have to turn it on.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Make a Static HTML Page Editable in the Browser with Vanilla JavaScript",
  "desc": "When you maintain a document for someone else, such as a résumé, a one-page portfolio, or a printable menu, the bottleneck is rarely the layout. It's the edit loop. Every small change (”move this bull",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-make-a-static-html-page-editable-in-the-browser-with-vanilla-javascript.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
