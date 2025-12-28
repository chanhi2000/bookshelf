---
lang: en-US
title: "Getting to Grips with React.Memo"
description: "Article(s) > Getting to Grips with React.Memo"
icon: fa-brands fa-react
category:
  - Node.js
  - React.js
  - Article(s)
tag:
  - blog
  - digitalocean.com
  - node
  - nodejs
  - node-js
  - react
  - reactjs
  - react-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Getting to Grips with React.Memo"
    - property: og:description
      content: "Getting to Grips with React.Memo"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/digitalocean.com/react-learning-react-memo.html
prev: /programming/js-react/articles/README.md
date: 2019-08-15
isOriginal: false
author: Paul Ryan
cover: https://digitalocean.com/_next/static/media/intro-to-cloud.d49bc5f7.jpeg
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
  name="Getting to Grips with React.Memo"
  desc="Learn how to use React.Memo to improve the performance of your React applications. "
  url="https://digitalocean.com/community/tutorials/react-learning-react-memo"
  logo="https://digitalocean.com/_next/static/media/favicon.594d6067.ico"
  preview="https://digitalocean.com/_next/static/media/intro-to-cloud.d49bc5f7.jpeg"/>

`React.memo` gives us the ability of pure components in React but for functional based components rather than class based ones.

`memoization` is computer science jargon which means caching the result of expensive function calls and returning the cached version when the arguments are the same.

In React terms:

![Illustrated React.Memo](https://assets.digitalocean.com/articles/alligator/react/learning-react-memo/illustrated-memo.png)

We don’t want `MyNewComponent` re-rendering when the `props` being passed are the same.

---

## Simple Counter Example

I’ve created the [<VPIcon icon="iconfont icon-codesandbox"/>following example in `Codesandbox` to help cement in your mind how `React.memo` works](https://codesandbox.io/s/kind-wilbur-2zl0g).

It’s a simple app that counts the number of times a button is clicked. You can see from the below screenshot we have a banner on top of the page.

![Screenshot of the demo App](https://assets.digitalocean.com/articles/alligator/react/learning-react-memo/picture-of-the-app.png)

Imagine the `Banner` is a UI component that can have different types, in this case you want to use the `info` type banner so you create your `Banner` as follows:

```jsx
<Banner type="info" />
```

Our `CounterComponent` looks like this:

```jsx
class CounterComponent extends Component {
  state = { buttonPressedCount: 0 };
  render() {
    const { buttonPressedCount } = this.state;
    return (
      <div className="new-component">
        <h4>Button Pressed Count: {buttonPressedCount}</h4>
        <button
          onClick={() =>
            this.setState({ buttonPressedCount: buttonPressedCount + 1 })
          }
        >
          Increase Count
        </button>
        <Banner type="info" />
      </div>
    );
  }
}
```

And our `Banner` component looks as follows:

```jsx
const Banner = props => {
  const { type } = props;

  if (type === "info") {
    return <div className="info-banner">I am an info banner</div>;
  }
};
```

In our `CounterComponent`, every time we click the button we increase the `buttonPressedCount` variable which causes a re-render which is what you would expect. The problem with this is that the `Banner` component also re-renders even though the `props` being passed to it haven’t changed.

To circumvent this, we use `memo` which acts like `PureComponent` in the fact that it will stop re-renders when the `props` haven’t changed. Our code updated looks like:

```jsx
const Banner = memo(props => {
  const { type } = props;

  if (type === "info") {
    return <div className="info-banner">I am an info banner</div>;
  }
});
```

Now our `Banner` component will only re-render when the `props` to it have changed.

This is core fundamental idea of React memo.

---

## areEqual

Ok so let’s get a little more advanced and talk about custom equality. By default, `memo` only does a `shallow` comparison of props and prop’s objects. You can pass a second argument to indicate a custom equality check:

```js
React.memo(Component, [areEqual(prevProps, nextProps)]);
```

This is similar to `shouldComponentUpdate` but the inverse i.e. returning `true` in `shouldComponentUpdate` causes another render whereas `areEqual` is the opposite.

Imagine we had a `Person` component that accepted a `prop` person which is an object, we could check if the `name` is the same.

```jsx
const areEqual = (prevProps, nextProps) => {
  return (prevProps.name === nextProps.name)
};
React.memo(Person, areEqual);
```

---

## Conclusion

This is a really nice addition to React, allowing us to use functional components without having the worry about needless re-renders. As always, I hope you learned something good with this post!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Getting to Grips with React.Memo",
  "desc": "Learn how to use React.Memo to improve the performance of your React applications. ",
  "link": "https://chanhi2000.github.io/bookshelf/digitalocean.com/react-learning-react-memo.html",
  "logo": "https://digitalocean.com/_next/static/media/favicon.594d6067.ico",
  "background": "rgba(44,103,246,0.2)"
}
```
