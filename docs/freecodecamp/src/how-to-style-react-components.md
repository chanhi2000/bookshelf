---
lang: en-US
title: "How to Style React Components"
description: "Article(s) > How to Style React Components"
icon: fa-brands fa-react
category: 
  - Node.js
  - React.js
  - CSS
  - TailwindCSS
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
  - css
  - tailwind
  - tailwind-css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Style React Components"
    - property: og:description
      content: "How to Style React Components"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-style-react-components.html
prev: /programming/js-react/articles/README.md
date: 2024-05-22
isOriginal: false
author:
  - name: Matéu.sh
    url: https://freecodecamp.org/news/author/mateush/
cover: https://freecodecamp.org/news/content/images/2024/05/How-to-style-react-components.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "React.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-react/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Tailwind CSS > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/css-tailwind/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Style React Components"
  desc="You can only make your React app visually appealing to users with styling. That makes styling a fundamental aspect of building captivating user interfaces. With React's component-based architecture, there are a ton of options for styling. These inclu..."
  url="https://freecodecamp.org/news/how-to-style-react-components"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2024/05/How-to-style-react-components.png"/>

You can only make your React app visually appealing to users with styling. That makes styling a fundamental aspect of building captivating user interfaces.

With React's component-based architecture, there are a ton of options for styling. These include traditional CSS, utility-first approach, CSS-in-JS solutions, and more.

In this article, we'll explore various ways to style React components. We'll dive into the best practices for responsive and accessible design, and take a look at performance considerations to guide you in choosing the most effective styling approach for your projects.

---

## How to Style React Components with Inline Styling

Every JSX element has a `style` property you can add to its opening tag. This means you can add inline styling to JSX in a React component like in traditional HTML.

The primary difference is that you must specify inline styles as objects. In this object, the keys are the CSS properties written in *camelCase*, and the values are strings corresponding to valid CSS values.

And because the stylings have to be an object, you have to add them inside two curly braces if you're passing them directly to the element:

```jsx
<h1 style={{ textAlign: 'center', marginTop: '2rem', color: '#F43596' }}>
  Hello
</h1>
```

You can define the same styles as a separate object and pass it into the `style` property:

```jsx
export default function Home() {
  const myStyles = {
       textAlign: 'center',
       marginTop: '2rem',
      color: '#F43596',
  };

  return (
      <main>
        <h1 style={myStyles}>Hello</h1>
       </main>
  );
}
```

If you want to handle conditional CSS with inline styling in React, you can use a combination of the `useState` hook and ternary operator:

```jsx
"use client";

import { useState } from "react";

const ConditionalInlineStyling = () => {
  const [isActive, setIsActive] = useState(false);

  const buttonStyle = {
    margin: "0 auto",
    backgroundColor: isActive ? "green" : "gray",
    cursor: isActive ? "pointer" : "not-allowed",
    color: "white",
    padding: "0.6rem 1.2rem",
    border: "none",
  };

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <button style={buttonStyle}>{isActive ? "Active" : "Inactive"}</button>
    </div>
  );
};

export default ConditionalInlineStyling;
```

![Conditional inline styling in React](https://freecodecamp.org/news/content/images/2024/05/conditional-inline-styling.png)

The advantage of using inline styling is that it's quick and scoped to an element, while the disadvantage is that it's limited in features, as you cannot directly handle pseudo-classes and pseudo-elements.

---

## How to Use CSS Stylesheets in React

Using external stylesheets is a common styling approach in React because it's straightforward.

All you need to do is create a CSS file, define your styles in it, and then import the stylesheet into your React component.

But you import the stylesheet using the `import` keyword and then specify the relative path of the stylesheet, not with the `link` tag as you do in HTML.

```js
import 'relative-path-to-css-file.css'
```

I have moved the inline styling for the `ConditionalInlineStyling` component into a separate CSS file and imported it into the page like below:

```jsx
'use client';

import { useState } from 'react';
import '@/styles/styles.css'; // Import the CSS file


const ConditionalStyledComponent = () => {
 const [isActive, setIsActive] = useState(false);

 return (
   <div className="container">
     <button
       className={`button ${isActive ? 'button-active' : 'button-inactive'}`}
     >
       {isActive ? 'Active' : 'Inactive'}
     </button>
   </div>
 );
};

export default ConditionalStyledComponent;
```

Everything still works fine:

![Conditional styling with CSS file in React](https://freecodecamp.org/news/content/images/2024/05/conditional-inline-styling-1.png)

The advantage of using traditional stylesheets to style React components is that it's easy to start with, and the only learning curve is how you import it into a component.

---

## How to Use CSS Modules for Component-Specific Styling

CSS Modules offer a powerful solution for writing component-specific styles in React. They let you scope styles to individual components, thereby letting you avoid naming conflicts and simplifying style maintenance.

If you're using Next JS or any other popular React framework, you don't need any additional steps to start using CSS modules.

To use CSS modules in React, create a file with the `.module.css` extension. For example, <VPIcon icon="fa-brands fa-css3-alt"/>`styles.module.css`. You then need to import the file into your component with the `import` keyword and a name you want, for example, `styles` or `classes`, followed by the relative path of the CSS modules file:

```js
import styles from 'relative-path-to-css-modules-file.module.css';
```

The name you choose is now an object, the keys are the classes in the CSS modules file and the values are the respective properties in the class.

To use a class from the CSS modules file, you scope the choice import name (`style` or `classes`) to a class name. For example `<div className={styles.container}>`.

I have moved all the styles for the `ConditionalInlineStyling` component into a CSS modules file I call <VPIcon icon="fa-brands fa-css3-alt"/>`styles.module.css`. Here's how I imported and used it:

```jsx
'use client';

import { useState } from 'react';
import styles from '@/styles/styles.module.css'; // Import the CSS modules file

const ConditionalStyledComponent = () => {
 const [isActive, setIsActive] = useState(false);


 return (
   <div className={styles.container}>
     <button
       className={`${styles.button} ${
         isActive ? styles.buttonActive : styles.buttonInactive
       }`}
     >
       {isActive ? 'Active' : 'Inactive'}
     </button>
   </div>
 );
};

export default ConditionalStyledComponent;
```

---

## Tailwind CSS and Utility-First Styling in React

Tailwind CSS is a utility-first CSS framework that accelerates styling directly in your markup.

Tailwind does this by offering a comprehensive set of pre-defined utility classes. Instead of writing custom CSS and importing them, you apply the classes to your JSX or HTML elements, minimizing the need for custom CSS.

You can add Tailwind CSS to a Next JS starter by selecting Tailwind in the prompts after running `npx create-next-app@latest` and everything will be set up for you.

![`create-next-app` CLI tool asking to enable Tailwind CSS](https://freecodecamp.org/news/content/images/2024/05/Screenshot-2024-05-22-at-09.39.45.png)

Or you can add Tailwind to an existing project by running the commands below:

```sh
npm install tailwindcss
npx tailwindcss init
```

You'll then need to do the configuration yourself, according to your needs. After that, make sure you have the following directives in your <VPIcon icon="fa-brands fa-css3-alt"/>`globals.css` file:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

I have rewritten the `ConditionalInlineStyling` component to show you what using Tailwind CSS looks like:

```jsx
'use client';

import { useState } from 'react';

const ConditionalStyledComponent = () => {
 const [isActive, setIsActive] = useState(true);

 return (
   <div className="text-center mt-8">
     <button
       className={`px-4 py-2 ${
         isActive
           ? 'bg-green-600 text-white cursor-pointer'
           : 'bg-gray-500 text-white cursor-not-allowed'
       }`}
     >
       {isActive ? 'Active' : 'Inactive'}
     </button>
   </div>
 );
};

export default ConditionalStyledComponent;
```

![Conditional styling with Tailwind CSS in React](https://freecodecamp.org/news/content/images/2024/05/active-inactive-with-tailwind.png)

Tailwind CSS is great because it doesn't have a steep learning curve and is the best option for quick prototyping. Other utility-first frameworks are Bootstrap, Bulma, and Chakra UI.

---

## How to Style React Apps with CSS-in-JS

CSS-in-JS is a styling approach in which CSS is written in JavaScript, allowing you to style your components using JavaScript syntax.

This method offers a more dynamic and modular way to manage styles, making it easier to handle themes, scoped styles, and both pseudo-classes and pseudo-elements.

styled-components is the most Popular CSS-in-JS library. Others are Emotion and styled-jss.

To use styled-components, you first need to add it to your project by installing it with NPM or any other package manager:

```sh
npm i styled-components
```

You then need to import `styled` from `styled-components`:

```jsx
import styled from 'styled-components'
```

To define styles for an element or a whole component, you have to define a component and assign it to `styled.element-name`, then define the styles you want inside the backticks.

For example, the syntax below will create styles for a `Button` component you can use directly:

```jsx
const Button = styled.button `
  /* CSS styles go here */
`;
```

Here's how I have rewritten the component to use styled-components:

```jsx
'use client';

import { useState } from 'react';
import styled from 'styled-components';

const Button = styled.button`
 background-color: ${(props) => (props.isActive ? 'green' : 'gray')};
 color: white;
 padding: 0.6rem 1.2rem;
 border: none;
 cursor: ${(props) => (props.isActive ? 'pointer' : 'not-allowed')};
 transition: background-color 0.3s;
`;

const Container = styled.div`
 display: flex;
 justify-content: center;
 align-items: center;
`;


const ConditionalStyledComponent = () => {
 const [isActive, setIsActive] = useState(false);

 return (
   <Container>
     <Button isActive={isActive}>
       {isActive ? 'Active' : 'Inactive'}
     </Button>
   </Container>
 );
};

export default ConditionalStyledComponent;
```

To use pseudo-classes with styled-components, use the `&` sign to represent the current component, then specify the pseudo-class, for example, `:hover`.

Here's how I did it:

```jsx
'use client';

import styled from 'styled-components';

const Button = styled.button`
 background-color: green;
 color: white;
 padding: 0.6rem 1.2rem;
 border: none;
 transition: background-color 0.3s;


 &:hover {
   background-color: crimson;
   cursor: pointer;
 }
`;

const Container = styled.div`
 display: flex;
 justify-content: center;
 align-items: center;
 margin-top: 2rem;
`;

const Hover = () => {
 return (
   <Container>
     <Button>Hover me</Button>
   </Container>
 );
};

export default Hover;
```

![Hover animation using styled-components](https://freecodecamp.org/news/content/images/2024/05/hover-with-styled-components.gif)

---

## Best Practices for Responsive and Accessible Design

### Use Responsive Units Everywhere Necessary

Using responsive units like percentages (`%`), `em`, `rem`, and viewport units (`vw` and `vh`) instead of fixed units like px helps your layout adapt fluidly to different screen sizes.

**Percentage values** allow elements to scale relative to their container, making it easier to create fluid layouts.

**Units like `em` and `rem`** are based on font size, ensuring that elements scale proportionally to the text size. This is particularly useful for responsive typography, where relative units allow text to scale based on user settings and preferences.

**Viewport units (`vw` and `vh`)** are relative to the viewport size, making them ideal for creating elements that scale with the browser window.

### Use Media Queries for Responsive Design

Media queries are foundational to responsive design, as they let you apply different styles based on the device screen size.

By using media queries, you can create breakpoints at specific screen widths and heights to adjust your layout, font sizes, and other styles.

Like traditional CSS, CSS-in-JS libraries like styled-components and Emotion support media queries within their syntax, allowing you to define responsive styles directly in your JavaScript files.

### Take Advantage of Flexbox and Grid

The CSS Grid and Flexbox algorithms revolutionized responsive design. If you're not using them, you're missing out on a cool CSS feature.

**CSS Grid** allows you to create complex grid-based layouts that adjust automatically to different screen sizes. This makes it easy to define areas of your layout that should expand or contract.

**Flexbox** provides a flexible box model that can rearrange and resize items dynamically.

With CSS grid and Flexbox, you can create responsive navigation bars, form layouts, and other UI components that adjust gracefully as the user resizes the screen.

### Use Sufficient Color Contrast for Readability and Accessibility

Color contrast between text and background is vital for readability and accessibility. High contrast improves readability and ensures that content is accessible to a wider audience.

Analyzing color contrast visually is not an easy task, that's why there are tools like the [<VPIcon icon="fas fa-globe"/>WebAIM Color Contrast Checke](https://webaim.org/resources/contrastchecker/)r to help you verify that your color choices meet the necessary contrast ratios.

---

## Performance Considerations for Styling React Components

### Avoid Inline Styles for Large Components

The convenience that comes with using inline styles can trick you into using it everywhere.

Excessive inline styles can lead to performance issues because they are recalculated on every render. This potentially causes unnecessary reflows and repaints.

In large components, consider using CSS classes or CSS-in-JS libraries that generate static class names, which are more efficient and easier for the browser to handle.

### Minimize and Optimize CSS Files

Because large CSS files can increase the load time of your application, you should consider minimizing your CSS by removing unused styles and compressing the file size.

Tools like [<VPIcon icon="fas fa-globe"/>CSS Nano](https://cssnano.github.io/cssnano/) and [<VPIcon icon="fas fa-globe"/>PurgeCSS](https://purgecss.com/) let you compress and minimize CSS files. These tools strip out unnecessary CSS rules, reducing the overall size and improving load times. Additionally, consider splitting your CSS into smaller, component-specific files that can be loaded on demand.

### Use CSS-in-JS with Caution

When a component renders, CSS-in-JS libraries generate and inject styles, which can become costly if overused. To reduce this, use static styles whenever possible and avoid excessive use of dynamic styles that rely on props or state. Also, consider using the CSS helper or styled function judiciously to keep styles efficient.

### Use Simple and Efficient Selectors

Deeply nested selectors or overly generic selectors can slow down the browser's rendering engine. Aim for simple and efficient selectors that target specific elements or classes. This practice reduces the time the browser spends matching elements to styles.

---

## Conclusion

React is agnostic of the styling approach you use. That's why it offers a range of styling methods for various needs. Each approach offers unique advantages for creating responsive and accessible designs.

Choosing the appropriate styling method should align with your project requirements and personal preferences. By looking at the strengths of each method, you can develop performant, maintainable, and visually appealing apps that serve a diverse user base across multiple devices.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Style React Components",
  "desc": "You can only make your React app visually appealing to users with styling. That makes styling a fundamental aspect of building captivating user interfaces. With React's component-based architecture, there are a ton of options for styling. These inclu...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-style-react-components.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
