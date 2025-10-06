---
lang: en-US
title: "How Event Propagation Works - Bubbling and Capturing."
description: Article(s) > (16/18) The JavaScript Interview Prep Handbook - Essential Topics to Know + Code Examples
category: 
  - JavaScript
  - Article(s)
tag: 
  - blog
  - freecodecamp.org
  - js
  - javascript
head:
  - - meta:
    - property: og:title
      content: Article(s) > (16/18) The JavaScript Interview Prep Handbook - Essential Topics to Know + Code Examples
    - property: og:description
      content: "How Event Propagation Works - Bubbling and Capturing."
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/js-interview-prep-handbook/how-event-propagation-works-bubbling-and-capturing.html
date: 2024-09-10
isOriginal: false
author:
  - name: Kunal Nalawade
    url: https://freecodecamp.org/news/author/KunalN25/
cover: https://freecodecamp.org/news/content/images/size/w2000/2024/05/JavaScript-Interview-Prep-Cover.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "The JavaScript Interview Prep Handbook - Essential Topics to Know + Code Examples",
  "desc": "JavaScript is a widely used language in web development and powers interactive features of virtually every website out there. JavaScript makes it possible to create dynamic web pages and is very versatile. JavaScript remains one of the most in-demand programming languages in 2024. Many companies are looking for proficiency in...",
  "link": "/freecodecamp.org/js-interview-prep-handbook/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="The JavaScript Interview Prep Handbook - Essential Topics to Know + Code Examples"
  desc="JavaScript is a widely used language in web development and powers interactive features of virtually every website out there. JavaScript makes it possible to create dynamic web pages and is very versatile. JavaScript remains one of the most in-demand programming languages in 2024. Many companies are looking for proficiency in..."
  url="https://freecodecamp.org/news/js-interview-prep-handbook#heading-how-event-propagation-works-bubbling-and-capturing"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/size/w2000/2024/05/JavaScript-Interview-Prep-Cover.png"/>

Event propagation takes place when an event is captured and handled by the target element and all its ancestors. Take the following example:

```html
<body>
  <div id="box"> <button id="button">Click Me</button> </div>
  <script src="script.js"></script>
</body>
```

When you click the button, you have also clicked the `div` element as well the `body`. The event is propagated throughout the DOM tree. Let's add handlers to all the above elements:

```js
document.body.addEventListener("click", () => {
    console.log("Body clicked");
});

document.getElementById("box").addEventListener("click", () => {
    console.log("div clicked");
});

document.getElementById("button").addEventListener("click", () => {
    console.log("Button clicked");
});
```

Event propagation occurs in two ways:

---

## Event Bubbling

When the button is clicked, the event handler of the button is called first. Then, the event bubbles up the DOM tree and the event handlers of parents are called sequentially from the immediate parent to the highest ancestor. That is: the `div` and `body` elements respectively.

![Event Bubbling](https://freecodecamp.org/news/content/images/2024/05/image-52.png)

---

## ‌Event Capturing

This works similar to event bubbling, but in reverse. The event is first captured by the root element, then travels down the DOM tree to the target element.

The event handlers are called in sequence starting from the root element, down to the target element. This can be achieved by passing `true` as the third parameter in the `addEventListener()` function.‌

```js
document.body.addEventListener("click", () => {
  console.log("Body clicked");
}, true);
```

![Event Capturing](https://freecodecamp.org/news/content/images/2024/05/image-53.png)

However, this looks counter-productive. After all, the user only wants to click the button, they have no idea of the DOM tree structure. So, to prevent this behaviour, we can use the `stopPropagation()` method.

```js
document.getElementById("button").addEventListener("click", (event) => {
    event.stopPropagation();
    console.log("Button clicked");
});
```

![Stopped propagation](https://freecodecamp.org/news/content/images/2024/05/image-54.png)
