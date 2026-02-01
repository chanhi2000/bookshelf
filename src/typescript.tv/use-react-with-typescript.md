---
lang: en-US
title: "Use React with TypeScript"
description: "Article(s) > Use React with TypeScript"
icon: fa-brands fa-react
category:
  - Node.js
  - React.js
  - Article(s)
tag:
  - blog
  - typescript.tv
  - node
  - nodejs
  - node-js
  - react
  - reactjs
  - react-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Use React with TypeScript"
    - property: og:description
      content: "Use React with TypeScript"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/use-react-with-typescript.html
prev: /programming/js-react/articles/README.md
date: 2020-12-17
isOriginal: false
author:
  - name: Benny Neugebauer
    url : https://stackoverflow.com/users/451634/benny-neugebauer
cover: https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp
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
  name="Use React with TypeScript"
  desc="This article provides code examples on how to type your React web application using TypeScript. It covers different scenarios such as function components, class components, components with props, components with HTML props, and more."
  url="https://typescript.tv/react/use-react-with-typescript"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp"/>

This article provides code examples on how to type your React web application using TypeScript. It covers different scenarios such as function components, class components, components with props, components with HTML props, and more.

React and TypeScript are a great team because TypeScript supports the JSX syntax. This tutorial will show you code examples on how to type your React web application, so that you can benefit from strong typing in your UI components.

---

## Function component

Typings for a stateless functional React component in TypeScript:

```tsx title="PostPreview.tsx"
import React from 'react';
 
const PostPreview: React.FC = (): JSX.Element => {
  return (
    <div>
      <h2>Title</h2>
      <p>Description</p>
      <span>Author</span>
    </div>
  );
};
 
export default PostPreview;
```

The React component from above can be used as follows:

```tsx title="main.tsx"
<PostPreview />
```

---

## Function component with props

Typings for a functional React component in TypeScript that received props:

```tsx title="PostPreview.tsx"
import React from 'react';
 
interface Props {
  author: string;
  description: string;
  title: string;
}
 
const PostPreview: React.FC<Props> = (props: Props): JSX.Element => {
  const {author, description, title} = props;
 
  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
      <span>{author}</span>
    </div>
  );
};
 
export default PostPreview;
```

The shown React component can receive properties (props) in three different ways:

```tsx title="main.tsx"
<PostPreview
  author={'Author'}
  description='Description'
  title="Title"
/>
```

---

## Function component with props and HTML props

![](https://typescript.tv/images/use-react-with-typescript/htmlprops.png)

```tsx title="PostPreview.tsx"
import React from 'react';
 
interface Props extends React.HTMLProps<HTMLDivElement> {
  author: string;
  description: string;
  title: string;
}
 
const PostPreview: React.FC<Props> = (props: Props): JSX.Element => {
  const {author, title, description} = props;
 
  return (
    <div style={props.style}>
      <h2>{title}</h2>
      <p>{description}</p>
      <span>{author}</span>
    </div>
  );
};
 
export default PostPreview;
```

```tsx title="PostPreview.tsx"
<PostPreview
  style={{backgroundColor: 'fuchsia'}}
  author={'Author'}
  description={'Description'}
  title={'Title'}
/>
```

---

## Function component with props and multiple HTML props

Here is a code recipe to style different HTML tags inside of your React component by providing just one set of styles from the calling component:

```tsx title="PostPreview.tsx"
import React from 'react';
 
interface Props {
  author: string;
  description: string;
  title: string;
  h2Props?: React.HTMLProps<HTMLHeadingElement>;
  pProps?: React.HTMLProps<HTMLParagraphElement>;
}
 
const PostPreview: React.FC<Props> = (props: Props): JSX.Element => {
  const {author, title, description} = props;
 
  return (
    <div>
      <h2 {...props.h2Props}>{title}</h2>
      <p {...props.pProps}>{description}</p>
      <span>{author}</span>
    </div>
  );
};
 
export default PostPreview;
```

```tsx title="main.tsx"
<PostPreview
 
  // Use red font color for the heading
  h2Props={{
    style: {
      color: 'red'
    }
  }}
 
  // Use blue font color for the paragraph
  pProps={{
    style: {
      color: 'blue'
    }
  }}
 
  // Render the following content
  author={'Author'}
  description={'Description'}
  title={'Title'}
 
/>
```

---

## Function component with props and inline-style

```tsx title="PostPreview.tsx"
import React, {CSSProperties} from 'react';
 
interface Props {
  author: string;
  description: string;
  title: string;
}
 
const PostPreview: React.FC<Props> = (props: Props): JSX.Element => {
  const {author, title, description} = props;
 
  const style: CSSProperties = {
    backgroundColor: 'lightgreen'
  };
 
  return (
    <div style={style}>
      <h2>{title}</h2>
      <p>{description}</p>
      <span>{author}</span>
    </div>
  );
};
 
export default PostPreview;
```

```tsx title="main.tsx"
<PostPreview author={'Author'} description={'Description'} title={'Title'} />
```

---

## Function component with props and style sheet

In order to import Cascading Style Sheets (CSS) in a React Component, you will have to update your [webpack](https://webpack.js.org/) configuration with the following [loaders](https://webpack.js.org/loaders/):

- The [<VPIcon icon="iconfont icon-github" />`webpack-contrib/css-loader`](https://github.com/webpack-contrib/css-loader) to interpret `import` statements with `.css` extensions
- The [<VPIcon icon="iconfont icon-github" />`webpack-contrib/style-loader`](https://github.com/webpack-contrib/style-loader) to process styles from CSS files

```css title="PostPreview.css"
.PostPreview {
  background-color: darkred;
}
 
.PostPreviewText {
  color: white;
}
```

```tsx title="PostPreview.tsx"
import React from 'react';
 
import './PostPreview.css';
 
interface Props {
  author: string;
  description: string;
  title: string;
}
 
const PostPreview: React.FC<Props> = (props: Props): JSX.Element => {
  const {author, title, description} = props;
 
  return (
    <div className={'PostPreview PostPreviewText'}>
      <h2>{title}</h2>
      <p>{description}</p>
      <span>{author}</span>
    </div>
  );
};
 
export default PostPreview;
```

```tsx title="main.tsx"
<PostPreview author={'Author'} description={'Description'} title={'Title'} />
```

---

## Function component with props, style sheet and state

```css title="PostPreview.css"
.PostPreview {
  background-color: darkred;
}
 
.PostPreviewText {
  color: white;
}
```

```tsx title="PostPreview.tsx"
import React, {useState} from 'react';
 
import './PostPreview.css';
 
interface Props {
  author: string;
  description: string;
  title: string;
}
 
const PostPreview: React.FC<Props> = (props: Props): JSX.Element => {
  const {author, title, description} = props;
 
  const [clicked, setClicked] = useState<boolean>(false);
 
  const clickHandler = (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    event.preventDefault();
    setClicked(!clicked);
  };
 
  const className = 'PostPreview PostPreviewText';
 
  return (
    <div
      className={clicked ? className : null}
      onClick={clickHandler}
    >
      <h2>{title}</h2>
      <p>{description}</p>
      <span>{author}</span>
    </div>
  );
};
 
export default PostPreview;
```

---

## Function component using HOC (withStyles)

```tsx
import React from 'react';
import { CircularProgress, createStyles, Theme, withStyles, WithStyles } from '@material-ui/core';
 
const styles = (theme: Theme) =>
  createStyles({
    ProgressIndicator: {
      margin: theme.spacing(2),
    },
  });
 
interface Props extends WithStyles<typeof styles> {}
 
const ProgressIndicator: React.FC<Props> = (props: Props): JSX.Element => {
  const { classes } = props;
  return (
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <CircularProgress className={classes.ProgressIndicator} />
    </div>
  );
};
 
export default withStyles(styles)(ProgressIndicator);
```

---

## Function component using Hook (useStyles)

```tsx
import React from 'react';
import { CircularProgress, makeStyles } from '@material-ui/core';
 
const useStyles = makeStyles((theme) => ({
  ProgressIndicator: () => ({
    margin: theme.spacing(2),
  }),
}));
 
const ProgressIndicator: React.FC = (): JSX.Element => {
  const classes = useStyles();
 
  return (
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <CircularProgress className={classes.ProgressIndicator} />
    </div>
  );
};
 
export default ProgressIndicator;
```

---

## Class component without JSX

```tsx title="PostPreview.ts"
import React from 'react';
 
class PostPreview extends React.Component {
  render() {
    const h2 = React.createElement('h2', null, 'Title');
    const span = React.createElement('span', null, 'Author');
    const p = React.createElement('p', null, 'Description');
    return React.createElement('div', null, [h2, span, p]);
  }
}
 
export default PostPreview;
```

---

## Class component with JSX

JSX is an extension to JavaScript, so that you can write HTML tags inside of JavaScript. In the TypeScript ecosystem, this technology is called TSX. If you want to use JSX syntax in your TypeScript code, you will have to add `"jsx": "react"` inside of the [<VPIcon icon="iconfont icon-typescript"/>compilerOptions](https://typescriptlang.org/tsconfig) section of your <VPIcon icon="iconfont icon-json"/>`tsconfig.json` file.

```tsx title="PostPreview.tsx"
import React from 'react';
 
class PostPreview extends React.Component {
  render(): JSX.Element {
    return (
      <div>
        <h2>Title</h2>
        <p>Description</p>
        <span>Author</span>
      </div>
    );
  }
}
 
export default PostPreview;
```

---

## Class component with props

```tsx title="PostPreview.tsx"
import React from 'react';
 
interface Props {
  author: string;
  description: string;
  title: string;
}
 
class PostPreview extends React.Component<Props> {
  render(): JSX.Element {
    const {author, description, title} = this.props;
 
    return (
      <div>
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
          <span>{author}</span>
        </div>
      </div>
    );
  }
}
 
export default PostPreview;
```

---

## Class component with props and state

```tsx :collapsed-lines title="PostPreview.tsx"
import React from 'react';
 
interface Props {
  author: string;
  description: string;
  title: string;
}
 
interface State {
  title: string;
}
 
class PostPreview extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      title: 'Placeholder'
    };
  }
 
  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then(json => {
        this.setState({
          title: json.title
        });
      });
  }
 
  render(): JSX.Element {
    const {author, description} = this.props;
 
    return (
      <div>
        <div>
          <h2>{this.state.title}</h2>
          <p>{description}</p>
          <span>{author}</span>
        </div>
      </div>
    );
  }
}
 
export default PostPreview;
```

---

## Template: Function Component

```tsx title="YourComponent.tsx"
import React from 'react';
 
interface YourProps {
 
}
 
const YourComponent: React.FC<YourProps> = (props: YourProps): JSX.Element => {
  return (
    <>
      {
        // Your code here...
      }
    </>
  );
};
 
export default YourComponent;
```

---

## Conditionally render React components

```tsx
const showPerformanceChart = (): JSX.Element => (
  <>
    {candleImport.candles.length ? (
      <PerformanceChart
        backtestResults={backtestResults}
        candleImport={candleImport}
        selectedInterval={selectedInterval}
        zoomTo={zoomTo}
      />
    ) : (
      <p style={{ textAlign: 'center' }}>No candles for selected timespan.</p>
    )}
  </>
);
```

---

## Component Children (Containment)

React components can contain other React components. By using the `props.children` property, these contained React components can be rendered from their wrapping component:

```tsx title="PostPage.tsx"
import React from 'react';
import PostPreview from './PostPreview';
 
const PostPage: React.FC = (): JSX.Element => {
  return (
    <div>
      <PostPreview title={'Breaking News'}>
        <p>This is some text rendered inside.</p>
      </PostPreview>
    </div>
  );
};
 
export default PostPage;
```

```tsx title="PostPreview.tsx"
import React from 'react';
 
interface Props extends React.HTMLProps<HTMLDivElement> {
  title: string;
}
 
const PostPreview: React.FC<Props> = (props: Props): JSX.Element => {
  const {title} = props;
 
  return (
    <>
      <h2>{title}</h2>
      ${props.children}
    </>
  );
};
 
export default PostPreview;
```

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Use React with TypeScript",
  "desc": "This article provides code examples on how to type your React web application using TypeScript. It covers different scenarios such as function components, class components, components with props, components with HTML props, and more.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/use-react-with-typescript.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
