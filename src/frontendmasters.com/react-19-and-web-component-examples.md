---
lang: en-US
title: "React 19 and Web Component Examples"
description: "Article(s) > React 19 and Web Component Examples"
icon: fa-brands fa-react
category:
  - Node.js
  - React.js
  - Article(s)
tag:
  - blog
  - frontendmasters.com
  - node
  - nodejs
  - node-js
  - react
  - reactjs
  - react-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > React 19 and Web Component Examples"
    - property: og:description
      content: "React 19 and Web Component Examples"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/react-19-and-web-component-examples.html
prev: /programming/js-react/articles/README.md
date: 2024-12-16
isOriginal: false
author:
  - name: Chris Coyier
    url : https://frontendmasters.com/blog/author/chriscoyier/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/4800
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
  name="React 19 and Web Component Examples"
  desc="There is lots of news of React 19 and going stable and now supporting Web Components. Or… “custom elements” I should say, as that refers to the HTML expression of them as <dashed-elements>, which is where the trouble laid. Apparently it was hard for React to know, in JSX, if props should be treated as a property or an attribute. So they’ve just decided this is how it will work:"
  url="https://frontendmasters.com/blog/react-19-and-web-component-examples/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/4800"/>

There is lots of news of [<VPIcon icon="fa-brands fa-react"/>React 19 and going stable](https://react.dev/blog/2024/12/05/react-19) and now supporting Web Components. Or… “custom elements” I should say, as that refers to the HTML expression of them as `<dashed-elements>`, which is where the trouble laid. Apparently it was hard for React to know, in JSX, if props should be treated as [<VPIcon icon="fas fa-globe"/>a property or an attribute](https://jakearchibald.com/2024/attributes-vs-properties/). So they’ve just decided this is how it will work:

::: tabs

@tab:active Server Side Rendering

props passed to a custom element will render as attributes if their type is a primitive value like`string`,`number`, or the value is`true`. Props with non-primitive types like`object`,`symbol`,`function`, or value`false`will be omitted.

@tab Client Side Rendering

props that match a property on the Custom Element instance will be assigned as properties, otherwise they will be assigned as attributes.

:::

That’s enough to pass all the tests at [<VPIcon icon="fas fa-globe"/>Custom Elements Everywhere](https://custom-elements-everywhere.com/), which tracks such things. (And apparently every single framework is now 100% fine. Cool.)

This got me thinking about what this actually means and how I might make use of it. I use both React and Web Components sometimes, but only rarely do I combine them, and the last time I did I had more issues with the Shadow DOM than I did with React doing anything funky.

So here I’ve made a LitElement and rendered it within a React component:

<CodePen
  user="chriscoyier"
  slug-hash="yyBJxdp"
  title="React 19 and Web Components"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

What I was thinking there was… *what if I make a `<designsystem-button>` and need a click handler on it?* Turns out that’s not really a problem. You can just slap a React `onClick` right on it and it’s fine.

```jsx
<MyCard>
  <p>blah blah</p>
  <!-- this is fine -->
  <designsystem-button onClick={() => {}}></designsystem-button>
</MyCard>
```

That wasn’t a problem anyway, apparently.

What *is* a problem is if I want to send in a function from React-land for the Web Component to call. You’d think we could send the function in how LitElement generally wants you to do that like:

```html
<!-- nope -->
<designsystem-button .mySpecialEvent=${specialEvent}>
```

But nope, JSX really doesn’t like that “dot syntax” and won’t compile.

So you gotta send it in more like this:

```html
<designsystem-button onSpecialEvent={() => mySpecialEvent()}
```

Then in order to “call” that event, you “dispatch” and event named properly. Like:

```js
this.dispatchEvent(new CustomEvent("SpecialEvent", { bubbles: true }));
```

Here’s that with a “raw” Web Component:

<CodePen
  user="chriscoyier"
  slug-hash="RNboKBL"
  title="React 19 and Web Components"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

I took that idea from Jared White’s article [<VPIcon icon="fas fa-globe"/>Oh Happy Day! React Finally Speaks Web Components](https://thathtml.blog/2024/12/oh-happy-day-react-finally-speaks-web-component/). Where he’s got some other examples. Another is passing in a “complex object” which is one of those things that would have been impossible in React 18 and under apparently, and now we can do:

<CodePen
  user="chriscoyier"
  slug-hash="GgKNrzx"
  title="React 19 and Web Components"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "React 19 and Web Component Examples",
  "desc": "",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/react-19-and-web-component-examples.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
