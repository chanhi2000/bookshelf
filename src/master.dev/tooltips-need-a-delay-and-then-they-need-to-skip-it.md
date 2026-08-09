---
lang: en-US
title: "Tooltips Need a Delay, and Then They Need to Skip It"
description: "Article(s) > Tooltips Need a Delay, and Then They Need to Skip It"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - JavaScript
  - AI
  - LLM
  - Anthropic
  - Claude
  - Article(s)
tag:
  - blog
  - master.dev
  - css
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
  - anthropic
  - claude
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Tooltips Need a Delay, and Then They Need to Skip It"
    - property: og:description
      content: "Tooltips Need a Delay, and Then They Need to Skip It"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/master.dev/tooltips-need-a-delay-and-then-they-need-to-skip-it.html
prev: /programming/css/articles/README.md
date: 2026-08-13
isOriginal: false
author:
  - name: Abhishek Jakhar
    url: https://master.dev/blog/author/abhishekjakhar/
cover: https://master.dev/blog/wp-json/social-image-generator/v1/image/10635
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
  "title": "JavaScript > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Claude > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/claude/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Tooltips Need a Delay, and Then They Need to Skip It"
  desc="Thinking about UX, a slight delay on a simple tooltip can be nice so that mousing over something quickly doesn't trigger it, but if there are related tooltips nearby, maybe we don't need to wait."
  url="https://master.dev/blog/tooltips-need-a-delay-and-then-they-need-to-skip-it/"
  logo="https://master.dev/favicon.ico"
  preview="https://master.dev/blog/wp-json/social-image-generator/v1/image/10635"/>

On the question listing pages for my product, [<VPIcon icon="fas fa-globe"/>FrontPrep](https://frontprep.com/user-interface), I display company logos next to the interview questions. When you hover over a logo, a tooltip shows the company name.  
  
One thing had been annoying me for a couple of days. If I just moved the cursor across the page, tooltips kept showing up instantly along the way. The cause was simple: I had set the tooltip delay to `0`, so it appeared the moment the cursor hovered over the logo.  
  
To fix this issue, I added a 200ms transition delay, which worked but created a new problem. If you look at the user interface, there are a couple of rows where multiple logos sit next to each other because the same interview questions are asked at multiple companies. Now, moving from one logo to another meant waiting the same 200ms delay every time you hovered over a different company logo, which felt sluggish and led to a poor user experience.

This post is not about building a tooltip. It’s about one small interaction pattern, the same one you will find in browser toolbars and various websites, and people are unaware of it.

Here is a short video of the before-and-after experience on my website. It helps you understand the problem better.

<VidStack src="https://videopress.com/f6e1e92c-43e2-4b4e-99f3-724ad2b0342d" />

> Before (Without the delay of 200ms)

<VidStack src="https://videopress.com/5d42304a-79fd-486a-b15a-c4ce2404d2f7" />

After (With the delay of 200ms & instant tooltips)

---

## A Solution

I will divide my solution into three parts.

1. You hover over a logo. The tooltip waits 200ms before opening.
2. A tooltip closes, and a 300ms timer starts. I call this the warm window or warm page. If you hover over another logo while this 300ms timer is running, or we could say when the page is warm, the tooltip opens instantly without any waiting or animation.
3. When the 300ms timer expires, everything returns to normal, and the page becomes cold. If you hover over the logo again, the next tooltip has to wait 200ms again. Without this step, the first tooltip you opened would turn off the delay for the whole page permanently.

hover → wait 200ms → tooltip opens (page is now warm)  
leave → tooltip closes → 300ms cooldown  
            ├─ hover another tooltip before cooldown → opens instantly, page stays warm  
            └─ cooldown ends → page is cold, the 200ms wait is back

In FrontPrep, my tooltips are built with Radix and Motion. I will demonstrate the pattern using a simpler React version below, and later in the post, I will put this idea into a Claude skill which you can use to audit your own codebase.

<CodePen
  user="anon"
  slug-hash="GgrYMOo"
  title="Warm Tooltips"
  :default-tab="['css','result']"
  :theme="dark"/>

::: info

[**Here’s a follow-up article**](/master.dev/delayed-then-instant-tooltips-with-html-css-alone.md) that replicates the basic UX here without any JavaScript.

:::

---

## How the Code Works

I will try to explain the code in the same order in which things happen when you move the cursor.

### Step 1: You Hover Over a Logo

When `onMouseEnter` is triggered on a logo, this function is called:

```js
function handleEnter() {
  // `tooltips` is a useContext variable where the isWarm state is tracked between components
  If (tooltips.isWarm) {
    show();
    return;
  }
  // `openTimer` is a useRef variable, so .current is how you set/access the value.
  openTimer.current = setTimeout(show, tooltips.openDelay);
}
```

On hover, this component asks one question: is the page warm? If it is, the tooltip opens instantly. If not, it starts a 200ms timer and waits. You might be wondering where this tooltips object came from. It comes from the `TooltipProvider` which I will discuss in the last step.

### Step 2: The Tooltip Opens

Here’s that show function that handles the opening of the tooltip:

```js
function show() {
  setInstant(tooltips.isWarm);
  setOpen(true);
  tooltips.markOpened();
}
```

This does three things:

1. It copied the value of `tooltips.isWarm` into a state called `instant`. 
2. It opens the tooltip.
3. It tells the provider that the tooltip is open, which makes the page warm.

Coming back to point 1, it copied what `tooltips.isWarm` returns into a flag called instant because this instant flag is added to the tooltip as a data attribute, which CSS uses to skip the entrance animation.

```css
.tooltip[data-instant="true"] {
  transition-duration: 0ms;
}
```

This is the reason why, when the page is warm, a tooltip opens without any animation or delay.

### Step 3: You Leave the Logo

When `onMouseLeave` is triggered on a logo, this function is called:

```js
function handleLeave() {
  clearTimeout(openTimer.current);
  If (!open) return;
  setOpen(false);
  setInstant(false);
  tooltips.markClosed();
}
```

First, we have to know whether the tooltip is currently open.

Let’s say your cursor crosses a logo in 50ms, which is far less than 200ms, so the timer started by `handleEnter` is still running and the tooltip is not opened yet. `clearTimeout` in `handleLeave` cancels that timer so the tooltip never opens at all, and `if (!open) return;` stops the function right there, because the tooltip, which never opened has nothing to close and no cooldowns to start. In the first video, a sweep opened every tooltip in its path; now, the same sweep opens no tooltips. 

If the tooltip is open, this happens when you rest your cursor on the logo for more than 200ms, or when the page is warm, and the tooltip opens instantly on enter. We will close the tooltip and tell our provider, the provider will then start a 300ms cooldown timer, if you hover over the next logo before this timer ends, the tooltip opens instantly. 

### Step 4: The Provider

```js
const warm = useRef(false);
const cooldownTimer = useRef(null);

useEffect(() => () => clearTimeout(cooldownTimer.current), []);

const tooltips = useMemo(
  () => ({
    openDelay,
    isWarm: () => skipWhenWarm && warm.current,
    markOpened() {
      warm.current = true;
      clearTimeout(cooldownTimer.current);
    },
    markClosed() {
      clearTimeout(cooldownTimer.current);
      cooldownTimer.current = setTimeout(() => {
        warm.current = false;
      }, warmFor);
    },
  }),
  [openDelay, warmFor, skipWhenWarm]
);
```

This is the shared state we need for this whole pattern to work. The page could either be warm or cold. If you notice, markOpened cancels the pending cooldowns; this is what keeps the page warm when you move from one logo to another. Basically, every new tooltip cancels the cooldown started by the previous one.

You don’t need to get confused about `skipWhenWarm` flag, it is just for the before and after toggle in the demo; turning it off always makes the provider cold to help you see the before behavior.

Another important detail here is that `isWarm` is a ref and not a React state because changing it does not re-render all the tooltips on the page. This ref is only read inside the event handlers.

---

## Why a Timer of 200ms?

If we choose a timer of less than 150ms, when a cursor passes over a tooltip trigger, it will most likely open the tooltip. If we choose a timer of more than 250ms, the hover will feel sluggish and broken. So, 200ms is a good, balanced number in this case.

---

## Judgement & Taste

If you ask AI to build a tooltip, it will build a fully functional tooltip, but in the end, it is you, the human, who will decide if the tooltip built is worthy because there are details that separate a working tooltip from a polished tooltip, the same way they separate a working product and a polished product. AI can build a polished product only if you guide it to do so, and you can guide it when you have developed taste and judgment, which come from years of experience, mistakes, and practice.

However, you can use skills of other engineers/designers to have their taste of a polished product and eventually build yours as you start developing your own judgement, you can create/use skills around colors, accessibility, forms, animations, typography etc, you can generate solid outputs but it again does not mean it is production ready, you are still there at the end to judge and ship it only if it meets your standards and taste.

---

## Skill

I have created a Claude skill for solving the above problem which I faced, you can build a similar skill or copy the one written below and run it to audit your codebase. Every codebase is different, and every codebase uses different libraries for tooltips or has written custom tooltips differently; this skill will work for all.

```sh title="file structure"
.claude  
  /skills  
    /tooltip  
      /SKILL.md
```

````md :collapsed-lines
---
name: tooltip
description: Tooltips need a delay so they don't open up on unintentional mouse travel
---

# Tooltip Timing

A click is always intentional whereas a hover is not intentional. The cursor travels across the page to get wherever it has to, and it passes over elements on the way, so a tooltip cannot tell from the hover whether the user wants to open it. The 200ms is how it finds out.

```css
.tooltip {
 transition-delay: 200ms;
}
```

---

## The three numbers and states

| Value       | Number | Why                                                                                                     |
| ----------- | ------ | ------------------------------------------------------------------- |
| Open delay  | 200ms  | Below 150ms a cursor that is only passing over a trigger still opens it. Above 250ms an intentional hover feels broken. |
| Warm window | 300ms  | Long enough to cover the move from one trigger to the next one. Short enough that a hover a second later waits again. |
| Close delay | 0ms    | Leaving a trigger should be clear. So there is nothing to wait for.|

---

## How it should behave

```
hover -> wait 200ms -> tooltip opens (page is now warm)
leave -> tooltip closes -> 300ms cooldown
```
````

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Tooltips Need a Delay, and Then They Need to Skip It",
  "desc": "Thinking about UX, a slight delay on a simple tooltip can be nice so that mousing over something quickly doesn't trigger it, but if there are related tooltips nearby, maybe we don't need to wait.",
  "link": "https://chanhi2000.github.io/bookshelf/master.dev/tooltips-need-a-delay-and-then-they-need-to-skip-it.html",
  "logo": "https://master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
