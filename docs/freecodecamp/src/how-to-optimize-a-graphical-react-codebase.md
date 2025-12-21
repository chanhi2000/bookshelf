---
lang: en-US
title: "How to Optimize a Graphical React Codebase — Optimize d3-zoom and dnd-kit Code"
description: "Article(s) > How to Optimize a Graphical React Codebase — Optimize d3-zoom and dnd-kit Code"
icon: fa-brands fa-react
category:
  - Node.js
  - React.js
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - react
  - reactjs
  - react-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Optimize a Graphical React Codebase — Optimize d3-zoom and dnd-kit Code"
    - property: og:description
      content: "How to Optimize a Graphical React Codebase — Optimize d3-zoom and dnd-kit Code"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-optimize-a-graphical-react-codebase.html
prev: /programming/js-react/articles/README.md
date: 2025-10-16
isOriginal: false
author:
  - name: Cedd Burge
    url : https://freecodecamp.org/news/author/ceddlyburge/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1760617553059/99fd830f-39a8-4067-9727-e9b35850168d.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "React.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-react/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Optimize a Graphical React Codebase — Optimize d3-zoom and dnd-kit Code"
  desc="Miro and Figma are online collaborative canvas tools that became very popular during the pandemic. Instead of using sticky notes on a physical wall, you can add a virtual post—and an array of other things—to a virtual canvas. This lets teams collabor..."
  url="https://freecodecamp.org/news/how-to-optimize-a-graphical-react-codebase"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1760617553059/99fd830f-39a8-4067-9727-e9b35850168d.png"/>

Miro and Figma are online collaborative canvas tools that became very popular during the pandemic. Instead of using sticky notes on a physical wall, you can add a virtual post—and an array of other things—to a virtual canvas. This lets teams collaborate virtually in ways that feel familiar from the physical world.

I previously wrote an article showing [how to create a Figma/Miro Clone in React and TypeScript](/freecodecamp.org/how-to-create-a-figma-miro-style-canvas-with-react-and-typescript.md). The [code in the article (<VPIcon icon="iconfont icon-github"/>`ceddlyburge/react-figma-miro-canvas-part-3`)](https://github.com/ceddlyburge/react-figma-miro-canvas-part-3) was designed to be as easy to understand, and in this article, we’re going to optimize it. The code used [<VPIcon icon="fas fa-globe"/>DndKit](https://dndkit.com/) for dragging and dropping, and [D3 Zoom (<VPIcon icon="iconfont icon-github"/>`d3/d3-zoom`)](https://github.com/d3/d3-zoom) for panning and zooming. There were four components (`App`, `Canvas`, `Draggable` and `Addable`), and about 250 lines of code. You do not need to read the original article to understand this one.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1759863968693/38c8784c-47c8-46e0-9f06-0567c0ebf668.gif)

Standard optimizations such as `useCallback`, `memo`, and similar made it about twice as fast when dragging, but made no difference for panning and zooming. More creative/intensive optimizations made it about ten times as fast in most cases.

You can see the optimized code on [GitHub (<VPIcon icon="iconfont icon-github"/>`ceddlyburge/react-figma-miro-canvas-optimised`)](https://github.com/ceddlyburge/react-figma-miro-canvas-optimised) and there is a [<VPIcon icon="fas fa-globe"/>live demo on GitHub pages](https://ceddlyburge.github.io/react-figma-miro-canvas-optimised/) to test out the speed with 100,000 cards.

---

## How to Measure Performance in React Apps

There are three common ways to measure performance in React Apps

- [<VPIcon icon="fa-brands fa-chrome"/>Chrome Dev Tools profiler](https://developer.chrome.com/docs/devtools/performance/overview), especially using [<VPIcon icon="fas fa-globe"/>custom tracks](https://debugbear.com/blog/favourite-devtools-features-in-2025#add-custom-tracks-to-performance-recordings)
- [<VPIcon icon="fa-brands fa-react"/>Profiler component](https://react.dev/reference/react/Profiler)

These tools are all great, but none of them are quite the right fit in this case. In most codebases, the time spent executing JavaScript code (both our code and that of the React framework) is the primary issue. However, after all your code has run and React has updated the Dom, the browser still has a lot of work to do:

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1760025146277/7ae9ef2a-e248-491b-a07d-c674694d3fa9.png)
<!-- TODO: mermaid화 -->

In this case, this browser layout and rendering time was significant, and is not accounted for by the React profiling.

You can use custom tracks in the Chrome dev tools profiler, but it is very cumbersome to use.

For us, the JavaScript [<VPIcon icon="fa-brands fa-firefox"/>performance API](https://developer.mozilla.org/en-US/docs/Web/API/Performance) is the best option, which gives results that are closer to those experienced by the user, and is relatively easy to use.

First, we make a call to [<VPIcon icon="fa-brands fa-firefox"/>`performance.mark`](https://developer.mozilla.org/en-US/docs/Web/API/Performance/mark) in the event handler that starts the action, with a string to describe the time point. For example, when starting a zoom or pan operation:

```js
zoomBehavior.on("start", () => {
  performance.mark('zoomingOrPanningStart');
}
```

Then, in a `useEffect` hook, we call [<VPIcon icon="fa-brands fa-firefox"/>`performance.mark`](https://developer.mozilla.org/en-US/docs/Web/API/Performance/mark) again, and call [<VPIcon icon="fa-brands fa-firefox"/>`performance.measure`](https://developer.mozilla.org/en-US/docs/Web/API/Performance/measure) to calculate the time between the two points:

```js
useEffect(() => {
  performance.mark('zoomingOrPanningEnd');
  performance.measure('zoomingOrPanning', 'zoomingOrPanningStart', 'zoomingOrPanningEnd');
});
```

The [<VPIcon icon="fa-brands fa-react"/>React docs](https://react.dev/reference/react/useEffect) states that `useEffect` usually fires after the browser has painted the updated screen, which is what we want.

This isn't perfect, and will vary depending on the machine specifications, and what else the machine is doing at the time, but it was good enough to verify which optimizations worked best. It is possible to go further if you need to. For example, using [<VPIcon icon="fas fa-globe"/>Cypress to automate and profile scenarios](https://filiphric.com/testing-frontend-performance-with-cypress), potentially running many times to get a good mean, or using [<VPIcon icon="fas fa-globe"/>Browserstack to test on a variety of devices](https://browserstack.com/guide/performance-testing-with-cypress).

---

## How to Investigate the Performance

Most of the investigation involved using the [<VPIcon icon="fa-brands fa-chrome"/>React Dev Tools profiler](https://chromewebstore.google.com/detail/react-developer-tools) to record profiles of user interactions.

The performance data shows how many commits there were in the profile, and how long each one took, which is a great way to see if there are too many commits.

Each commit displays a flame chart showing which components rendered and why they re-rendered. This makes it much easier to find ways to avoid the re-rendering, and to check that memoization strategies are working as expected. This does have some caveats though. It often says ['The parent component rendered' (<VPIcon icon="iconfont icon-github"/>`facebook/react`)](https://github.com/facebook/react/issues/19732), which is misleading default text for when it doesn’t understand what happened (and is often due to a change in a parent context). It also says things like 'hook 9 changed', which makes it time consuming to work out exactly which hook changed.

The flame chart also shows how long each component took to render. This helps target problem components that we need to focus on.

---

## How to Optimize Panning and Zooming the Canvas

The original [Canvas (<VPIcon icon="iconfont icon-github"/>`ceddlyburge/react-figma-miro-canvas-part-`)](https://github.com/ceddlyburge/react-figma-miro-canvas-part-3/blob/main/src/Canvas.tsx) element used the CSS transform `translate3d(x, y, k)` to pan and zoom the canvas. This works, but it doesn't scale child elements, so when the zoom changes, all the cards on the canvas have to be re-rendered with a new CSS transform for the new zoom level ([`scale(${canvasTransform.k})` (<VPIcon icon="iconfont icon-github"/>`ceddlyburge/react-figma-miro-canvas-part-`)](https://github.com/ceddlyburge/react-figma-miro-canvas-part-3/blob/97935f5b03ecff2f0732f6138e173a0c5e71a1ed/src/Draggable.tsx#L31)).

```jsx
 <div
  ...
  className="canvas"
  style={{
    transform: `translate3d(${transform.x}px, ${transform.y}px, ${transform.k}px)`,
    ...
  }}>
  ...
</div>
<div
  className="card"
  style={{
    ...
    transform: `scale(${canvasTransform.k})`,
  }}>
  ...
</div>
```

I changed this to use `translateX(x) translateY(y) scale(k)`, which has the same effect, but does scale child elements. This way, when the zoom changes, none of the cards will be re-rendered (the `style` of the `card` component no longer uses the `canvasTransform.k`).

```jsx
 <div
  ...
  className="canvas"
  style={{
    transform: `translateX(${transform.x}px) translateY(${transform.y}px) scale(${transform.k})`,
    ...
  }}>
  ...
</div>
<div
  className="card"
  ...
</div>
```

The `Canvas` still needed to re-render whenever the pan or zoom changed, and it is possible to prevent this with `useRef`, and updating the CSS transform with direct JavaScript Dom manipulation in the [<VPIcon icon="fas fa-globe"/>d3-zoom](https://d3js.org/d3-zoom) event handler. This doesn’t make a significant improvement to the performance though, and is a definite hack, so the trade off is not worthwhile.

Both zooming and panning get a bit slower when the canvas is zoomed very far out and there are (a lot) more cards visible on the screen, just due to the browser having to render them all. It's still workable at 100,000 cards though. There are things you can do about this. An easy option is limiting the maximum zoom extent. This is a functional change, so potentially something that doesn’t meet requirements, but it is easy to do in d3-zoom using [<VPIcon icon="fas fa-globe"/>`scaleExtent`](https://d3js.org/d3-zoom#zoom_scaleExtent):

```tsx
zoom<HTMLDivElement>().scaleExtent([0.1, 100])
```

Another option is to create a bitmap for very low zoom levels and render that as a single element. This may be difficult, but it means that there will be no change to the functionality.

---

## How to Optimize Dragging Cards Around the Canvas

### Starting a drag

The `useDraggable` hook from `DndContext` causes some re-renders when starting a drag operation.

It is possible to improve this by changing the [`Draggable` (<VPIcon icon="iconfont icon-github"/>`ceddlyburge/react-figma-miro-canvas-optimised`)](https://github.com/ceddlyburge/react-figma-miro-canvas-optimised/blob/main/src/Draggable.tsx) component to just have this hook (and the things that use it) and having a `DraggableInner` component for everything else (inside a `memo`). This works well for reducing the re-renders, in that the `DraggableInner` almost never get re-rendered, and improves the speed of starting a drag operation. However, it was still fairly slow, and the time was all under the `DndContext`.

A better option is to create a new [`NonDraggable` (<VPIcon icon="iconfont icon-github"/>`ceddlyburge/react-figma-miro-canvas-optimised`)](https://github.com/ceddlyburge/react-figma-miro-canvas-optimised/blob/main/src/NonDraggable.tsx) component, that looks exactly like the [`Draggable` (<VPIcon icon="iconfont icon-github"/>`ceddlyburge/react-figma-miro-canvas-optimised`)](https://github.com/ceddlyburge/react-figma-miro-canvas-optimised/blob/main/src/Draggable.tsx) component, but does not hook up with `DndContext`. These cards are shown on the Canvas, and have an [`onMouseEnter` (<VPIcon icon="iconfont icon-github"/>`ceddlyburge/react-figma-miro-canvas-optimised`)](https://github.com/ceddlyburge/react-figma-miro-canvas-optimised/blob/56d0c8256350ef3a0d8f50cc442305bd6c9d03c1/src/NonDraggable.tsx#L10) event, to swap in the [`Draggable` (<VPIcon icon="iconfont icon-github"/>`ceddlyburge/react-figma-miro-canvas-optimised`)](https://github.com/ceddlyburge/react-figma-miro-canvas-optimised/blob/main/src/Draggable.tsx) component for the active card, so that dragging continued to work.

```js
const onMouseEnter = useCallback(() => {
  setHoverCard(card);
}, []);
```

This works well, and significantly improves the speed when starting a drag operation, but it was still quite slow with large numbers of cards. Nearly nothing was getting re-rendered, but there is still a time cost to when using `memo`, as it needs to check whether components have changed.

To fix this, we create an [`AllCards` (<VPIcon icon="iconfont icon-github"/>`ceddlyburge/react-figma-miro-canvas-optimised`)](https://github.com/ceddlyburge/react-figma-miro-canvas-optimised/blob/main/src/AllCards.tsx) component, that contains all the cards on the canvas as [`NonDraggable` (<VPIcon icon="iconfont icon-github"/>`ceddlyburge/react-figma-miro-canvas-optimised`)](https://github.com/ceddlyburge/react-figma-miro-canvas-optimised/blob/main/src/NonDraggable.tsx) components. Because it always renders all the cards, it nearly never needs to be re-rendered, and it is used with `memo`. So instead of each individual card using a `memo` (with the associated time cost), there is now just one component using a `memo`. To make it so that the dragging still works, the active [`Draggable` (<VPIcon icon="iconfont icon-github"/>`ceddlyburge/react-figma-miro-canvas-optimised`)](https://github.com/ceddlyburge/react-figma-miro-canvas-optimised/blob/main/src/Draggable.tsx) component is rendered on top, obscuring the [`NonDraggable` (<VPIcon icon="iconfont icon-github"/>`ceddlyburge/react-figma-miro-canvas-optimised`)](https://github.com/ceddlyburge/react-figma-miro-canvas-optimised/blob/main/src/NonDraggable.tsx) component beneath it. There is also a [`Cover` (<VPIcon icon="iconfont icon-github"/>`ceddlyburge/react-figma-miro-canvas-optimised`)](https://github.com/ceddlyburge/react-figma-miro-canvas-optimised/blob/main/src/Cover.tsx) component beneath that, so that when the [`Draggable` (<VPIcon icon="iconfont icon-github"/>`ceddlyburge/react-figma-miro-canvas-optimised`)](https://github.com/ceddlyburge/react-figma-miro-canvas-optimised/blob/main/src/Draggable.tsx) component is dragged away, the [`NonDraggable` (<VPIcon icon="iconfont icon-github"/>`ceddlyburge/react-figma-miro-canvas-optimised`)](https://github.com/ceddlyburge/react-figma-miro-canvas-optimised/blob/main/src/NonDraggable.tsx) component underneath remains hidden.

Original code, where each card is a [`Draggable` (<VPIcon icon="iconfont icon-github"/>`ceddlyburge/react-figma-miro-canvas-optimised`)](https://github.com/ceddlyburge/react-figma-miro-canvas-optimised/blob/main/src/Draggable.tsx) component:

```jsx
<DndContext ...>
  {cards.map((card) => (
    <Draggable card={card} key={card.id} canvasTransform={transform} />
  ))}
</DndContext>
```

Optimized code, where the [`AllCards` (<VPIcon icon="iconfont icon-github"/>`ceddlyburge/react-figma-miro-canvas-optimised`)](https://github.com/ceddlyburge/react-figma-miro-canvas-optimised/blob/main/src/AllCards.tsx) component renders all the cards as [`NonDraggable` (<VPIcon icon="iconfont icon-github"/>`ceddlyburge/react-figma-miro-canvas-optimised`)](https://github.com/ceddlyburge/react-figma-miro-canvas-optimised/blob/main/src/NonDraggable.tsx) components, and then a [`Cover` (<VPIcon icon="iconfont icon-github"/>`ceddlyburge/react-figma-miro-canvas-optimised`)](https://github.com/ceddlyburge/react-figma-miro-canvas-optimised/blob/main/src/Cover.tsx) and a [`Draggable` (<VPIcon icon="iconfont icon-github"/>`ceddlyburge/react-figma-miro-canvas-optimised`)](https://github.com/ceddlyburge/react-figma-miro-canvas-optimised/blob/main/src/Draggable.tsx) component for the active card.

```jsx
<AllCards cards={cards} setHoverCard={setHoverCard} />
<DndContext ...>
  <Cover card={hoverCard} />
  <Draggable card={hoverCard} canvasTransform={transform} />
</DndContext>
```

This works very well. With a low number of cards, the speed is about the same, but with a high numbers of cards, it’s about twenty times faster.

There is now a new potential performance issue with the [`onMouseEnter` (<VPIcon icon="iconfont icon-github"/>`ceddlyburge/react-figma-miro-canvas-optimised`)](https://github.com/ceddlyburge/react-figma-miro-canvas-optimised/blob/56d0c8256350ef3a0d8f50cc442305bd6c9d03c1/src/NonDraggable.tsx#L10) event that swaps in the [`Draggable` (<VPIcon icon="iconfont icon-github"/>`ceddlyburge/react-figma-miro-canvas-optimised`)](https://github.com/ceddlyburge/react-figma-miro-canvas-optimised/blob/main/src/Draggable.tsx) component for the active card, but this just adds two components to the Dom, and is very quick even with large numbers of cards.

### Finishing a drag

Finishing a drag operation is hard to optimize, as the position of a card changes, and that does need to re-render, which means that the [`AllCards` (<VPIcon icon="iconfont icon-github"/>`ceddlyburge/react-figma-miro-canvas-optimised`)](https://github.com/ceddlyburge/react-figma-miro-canvas-optimised/blob/main/src/AllCards.tsx) component has to re-render as well.

You can see original code below. Even when using `memo` with the Draggable component, the end drag operation still takes 2500ms with 100,000 cards, mostly due to the complexity of the `Draggable` component and its integration with DndKit.

```jsx
<DndContext ...>
  {cards.map((card) => (
    <Draggable card={card} key={card.id} canvasTransform={transform} />
  ))}
</DndContext>
```

However, we now use the [`NonDraggable` (<VPIcon icon="iconfont icon-github"/>`ceddlyburge/react-figma-miro-canvas-optimised`)](https://github.com/ceddlyburge/react-figma-miro-canvas-optimised/blob/main/src/NonDraggable.tsx) components, which all `memo` successfully, and only the dragged card is re-rendered. There is still a time cost using the `memo`, and this is the slowest part of the solution, but it leads to an increase in speed to 500ms with 100,000 cards.

```jsx
const NonDraggable = memo(...)

const AllCards = memo((cards, setHoverCard) => {
  <>
    {cards.map((card) => {
      <NonDraggable card={card} key={card.id} setHoverCard={setHoverCard} />);
    })}
  </>;
});
```

---

## Results

The base unoptimized version started to get slow between 1000 and 5000 cards. Standard optimizations improved this to around 10,000 cards, and the more optimization took it to about 100,000 cards. The trade off is that the code becomes significantly more complicated, which makes it harder to understand and modify, especially for people new to the codebase.

::: tabs

@tab:active 1,000 cards

| **Pan (ms)** | **Zoom (ms)** | **Start drag (ms)** | **End drag (ms)** | **Card hover (ms)** |
| ---: | --- | --- | --- | --- |
| Base | 3 | 4 | 200 | 50 | - |
| Basic optimization | 2 | 3 | 200 | 30 | - |
| Intensive optimization | 10 | 10 | 7 | 15 | 2 |

@tab 5,000 cards

| **Pan (ms)** | **Zoom (ms)** | **Start drag (ms)** | **End drag (ms)** | **Card hover (ms)** |
| ---: | --- | --- | --- | --- |
| Base | 20 | 150 | 450 | 200 | - |
| Basic optimization | 20 | 150 | 200 | 80 | - |
| Intensive optimization | 10 | 10 | 25 | 40 | 2 |

@tab 10,000 cards

| **Pan (ms)** | **Zoom (ms)** | **Start drag (ms)** | **End drag (ms)** | **Card hover (ms)** |
| ---: | --- | --- | --- | --- |
| Base | 50 | 300 | 900 | 400 | - |
| Basic optimization | 50 | 300 | 400 | 180 | - |
| Intensive optimization | 25 | 25 | 50 | 50 | 2 |

@tab 50,000 cards

| **Pan (ms)** | **Zoom (ms)** | **Start drag (ms)** | **End drag (ms)** | **Card hover (ms)** |
| ---: | --- | --- | --- | --- |
| Base | 1000 | 1500 | 4000 | 1800 | - |
| Basic optimization | 1000 | 1500 | 1900 | 900 | - |
| Intensive optimization | 150 | 150 | 150 | 250 | 5 |

@tab 100,000 cards

| **Pan (ms)** | **Zoom (ms)** | **Start drag (ms)** | **End drag (ms)** | **Card hover (ms)** |
| ---: | --- | --- | --- | --- |
| Base | - | - | - | - | - |
| Basic optimization | 3000 | 4500 | 5000 | 2500 | - |
| Intensive optimization | 150 | 250 | 300 | 500 | 15 |

:::

---

## Summary

It is unusual to display 100,000 or more items on screen in a standard React App, but in a highly graphical codebase, it becomes much more likely.

With these numbers, the browser rendering engine is likely to take a significant amount of time, so it is best to use the performance API to measure performance, instead of the usual React tools.

Standard React optimization strategies do work and improve the situation, but there is a need to go further, by finding ways to avoid renders, and even to avoid too many `memo` comparisons.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Optimize a Graphical React Codebase — Optimize d3-zoom and dnd-kit Code",
  "desc": "Miro and Figma are online collaborative canvas tools that became very popular during the pandemic. Instead of using sticky notes on a physical wall, you can add a virtual post—and an array of other things—to a virtual canvas. This lets teams collabor...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-optimize-a-graphical-react-codebase.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
