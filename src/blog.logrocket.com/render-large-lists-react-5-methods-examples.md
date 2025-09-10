---
lang: en-US
title: "Rendering large lists in React: 5 methods with examples"
description: "Article(s) > Rendering large lists in React: 5 methods with examples"
icon: fa-brands fa-react
category:
  - Node.js
  - React.js
  - Article(s)
tag:
  - blog
  - blog.logrocket.com
  - node
  - nodejs
  - node-js
  - react
  - reactjs
  - react-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Rendering large lists in React: 5 methods with examples"
    - property: og:description
      content: "Rendering large lists in React: 5 methods with examples"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/render-large-lists-react-5-methods-examples.html
prev: /programming/js-react/articles/README.md
date: 2022-07-14
isOriginal: false
author: 
  - name: Samaila Bala
    url: https://blog.logrocket.com/author/samailabala/
cover: /assets/image/blog.logrocket.com/render-large-lists-react-5-methods-examples/banner.png
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
  name="Rendering large lists in React: 5 methods with examples"
  desc="Explore five methods for easily rendering large lists in React, including pagination, infinite scroll, and several libraries."
  url="https://blog.logrocket.com/render-large-lists-react-5-methods-examples"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/render-large-lists-react-5-methods-examples/banner.png"/>

::: note Editor’s note

This article was last updated on 14 July 2022 to replace tools that are no longer maintained.

:::

![React Render Larg Lists](/assets/image/blog.logrocket.com/render-large-lists-react-5-methods-examples/banner.png)

Lists are an integral part of most web applications because they help display data in a more presentable format. But, when an app tries to handle too much data in a list, it often leads to performance problems.

In this guide, we’ll outline some problems associated with bloated lists, then walk through five different methods you can use to overcome these performance challenges in React applications.

To follow along with this tutorial, you’ll need the following:

- A general understanding of JavaScript and React
- npm≥v5.2 or Yarn installed on your machine
- Node.js≥v12

---

## Performance problems with large lists

Let’s create a sample application to demonstrate what happens to your app’s performance and the DOM tree when you try to render a large list of 10,000 records.

Launch your terminal and paste the code below to create a React application:

npx create-react-app render-list

Run the code below to install the [<VPIcon icon="fas fa-globe"/>Faker library](https://fakerjs.dev), which we’ll use to generate random data to use in our application:

```sh
npm i @faker-js/faker
```

Next, go to the `App` component in the <VPIcon icon="fas fa-folder-open"/>`src` directory and enter the code below:

```jsx :collapsed-lines title="App.jsx"
import React from 'react';
import faker from 'faker';
import './App.css';

const data = new Array(10000).fill().map((value, index) => ({ 
  id: index, title: faker.lorem.words(5), body: faker.lorem.sentences(4) 
})) 

function App() {
  return (
    <div>
      {data.map(((item) => (
        <div key={ item.id } className="post">
          <h3>{ item.title } - { item.id }</h3>
          <p>{item.body}</p> 
        </div> 
      )))}
    </div>
  );
}
  


export default App;
```

Go the <VPIcon icon="fa-brands fa-css3-alt"/>`App.css` file and add the lines of code below to add a little styling to the list:

```css :collaspsed-lines title="App.css"
.post {
  background-color: #eee;
  margin: 2rem;
  padding: 1rem;
}

.pagination {
  margin: 1rem auto;
  list-style: none;
  display: flex;
  justify-content: space - evenly;
  width: 50 %;
}

.active {
  border: 1px solid black;
  border-radius: 100 %;
  padding: 0 3px;
  outline: none;
}
```

The code above renders a list of 10,000 records. Start the React application in your browser and open your console:

![Faker Example Rendered Lists Problems](/assets/image/blog.logrocket.com/render-large-lists-react-5-methods-examples/faker-examplw-rendered-lists-problems.png)

When the page loads, there is a noticeable lag as you scroll. It’s not the large array of data that’s causing the lag, but the rendered DOM elements.

Large lists can be rendered both conditionally or dynamically. In React, conditional rendering refers to a concept of rendering components based on if certain conditions are met. There are various ways to use conditional rendering to render lists, like `if` or `else` statements, the ternary operator, and the logical `&&` operator.

On the other hand, dynamic rendering renders components mainly by looping over an array of data using the `map()` method. Rendering large lists using either conditional or dynamic rendering has its pros and cons.

To better demonstrate, let’s cover five ways to solve list-related performance issues in React apps.

---

## Pagination

Pagination allows you to render data in pages as opposed to rendering all the information at once. This way, you basically control the amount of data that is shown on the page so you don’t have to put too much stress on the DOM tree.

Most UI libraries in React come with a pagination component, but if you want to quickly implement pagination without having to install a UI library, you might want to check out [<VPIcon icon="fa-brands fa-npm"/>`react-paginate`](https://npmjs.com/package/react-paginate). The library renders a pagination component that accepts some props helps you navigate through your data.

To install the library, run the code below in your terminal:

```sh
npm i react-paginate
```

After installation, you can modify your `App` component to paginate the data instead of rendering it at once. Paste the code below in your `App` component:

```jsx :collapsed-lines title="App.jsx"
import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import faker from 'faker';
import './App.css';

function App() {
  const [pagination, setPagination] = useState({
    data: new Array(1000).fill().map((value, index) => (({
      id: index,
      title: faker.lorem.words(5),
      body: faker.lorem.sentences(8)
    }))),
    offset: 0,
    numberPerPage: 10,
    pageCount: 0,
    currentData: []
  });
  useEffect(() => {
    setPagination((prevState) => ({
      ...prevState,
      pageCount: prevState.data.length / prevState.numberPerPage,
      currentData: prevState.data.slice(pagination.offset, pagination.offset + pagination.numberPerPage)
    }))
  }, [pagination.numberPerPage, pagination.offset])
  const handlePageClick = event => {
    const selected = event.selected;
    const offset = selected * pagination.numberPerPage
    setPagination({ ...pagination, offset })
  }
  return (
    <div>
      {pagination.currentData && pagination.currentData.map(((item, index) => (
        <div key={item.id} className="post">
          <h3>{`${item.title} - ${item.id}`}</h3>
          <p>{item.body}</p>
        </div>
      )))
      }
      <ReactPaginate
        previousLabel={'previous'}
        nextLabel={'next'}
        breakLabel={'...'}
        pageCount={pagination.pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
    </div>
  );
}

export default App;
```

In this example, we’re storing the details responsible for the pagination in our paginating state. Instead of rendering the data at once, we only render the current data, which we get by slicing the main data based on the current offset and the number of records to be displayed on the page.

The `ReactPaginate` component accepts an event handler as a prop, which is called whenever the page changes. The event handler calculates the current offset, which is then used to calculate the current data to display when the page loads.

Below is a screenshot of how the app looks after pagination has been added to it:

![Faker Example List Pagination](/assets/image/blog.logrocket.com/render-large-lists-react-5-methods-examples/faker-example-list-pagination.png)

---

## Infinite scroll

Another way to render a large amount of data is with infinite scroll. Infinite scroll involves appending data to the end of the page as you scroll down the list. When the page initially loads, only a subset of data is loaded. As you scroll down the page, more data is appended.

There are several ways to implement infinite scroll in React. Personally, I prefer to use [<VPIcon icon="fa-brands fa-npm"/>`react-infinite-scroller`](https://npmjs.com/package/react-infinite-scroller). To install it, run the following code in your terminal:

npm i react-infinite-scroller

Open your `App` component and paste the following code:

```jsx :collapsed-lines title="App.jsx"
import React, { useState } from 'react';
import faker from 'faker';
import InfiniteScroll from "react-infinite-scroller";
import './App.css';

function App() {
  const data = new Array(1000).fill().map((value, index) => ({
    id: index,
    name: faker.name.firstName(5),
    body: faker.lorem.paragraph(8),
  }));
  const showItems = (posts) => {
    var items = [];
    for (var i = 0; i < records; i++) {
      items.push(
        <div className="post" key={posts[i].id}>
          <h3>{`${posts[i].name} - ${posts[i].id}`}</h3>
          <p>{posts[i].body}</p>
        </div>
      );
    }
    return items;
  };
  const itemsPerPage = 20;
  const [hasMore, setHasMore] = useState(true);
  const [records, setrecords] = useState(itemsPerPage);
  const loadMore = () => {
    if (records === data.length) {
      setHasMore(false);
    } else {
      setTimeout(() => {
        setrecords(records + itemsPerPage);
      }, 2000);
    }
  };
  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={loadMore}
      hasMore={hasMore}
      loader={<h4 className="loader">Loading...</h4>}
      useWindow={false}
    >
      {showItems(data)}
    </InfiniteScroll>
  );
}

export default App;
```

Basically, whenever the user scrolls to the end of the page, it checks if the `hasMore` property is `false`. If it isn’t, it appends more data to the page. It continues appending data to the end of the page until the `hasMore` property becomes false.

---

## `react-virtualized`

[<VPIcon icon="fa-brands fa-npm"/>`react-virtualized`](https://npmjs.com/package/react-virtualized) was specifically designed for rendering large lists and tabular data. It uses a technique similar to infinite scroll called windowing that renders only thevisible parts of a list to the screen.

One advantage `react-virtualized` has over the aforementioned solutions is its wealth of useful components, including `Collection`, `Grid`, `List`, `Masonryf`, and `Table`.

To install `react-virtualized`, launch your terminal and run the following code:

```sh
npm i react-virtualized
```

Go to your `App` component and paste the code below:

```jsx :collapsed-lines title="App.jsx"
import React from 'react';
import faker from 'faker'
import { List } from "react-virtualized";
import './App.css';

function App() {
  const data = new Array(1000).fill().map((value, id) => (({
    id: id,
    title: faker.lorem.words(5),
    body: faker.lorem.sentences(8)
  })))

  const renderRow = ({ index, key, style }) => (
   <div>
    <div key={key} style={style} className="post">
      <h3>{`${data[index].title}-${data[index].id}`}</h3>
      <p>{data[index].body}</p>
    </div>
   </div>
  )
  return (
    <List
      width={1200}
      height={700}
      rowRenderer={renderRow}
      rowCount={data.length}
      rowHeight={120}
    />
  );
}

export default App;
```

The `List` component takes the `width` and `height` props to set the dimensions of the window. It also takes the `rowHeight` prop, which represents the height of every item in the list, and `rowCount`, which represents the length of the array. `rowRenderer` takes a function that is responsible for rendering each row:

`react-virtualized` comes with [several other options for handling large lists](https://blog.logrocket.com/rendering-large-lists-with-react-virtualized-82741907a6b3/). <!-- TODO: /blog.logrocket.com/rendering-large-lists-with-react-virtualized.md -->
---

## `react-window`

[<VPIcon icon="fa-brands fa-npm"/>`react-window`](https://npmjs.com/package/react-window) is a set of components for efficiently rendering large lists in React. A complete rewrite of `react-virtualized`, the library aims to address shortcomings related to size and speed. `react-window` also covers more edge cases than `react-virtualized`.

Install `react-window` by running the code below in your terminal:

```sh
npm i react-window
```

Go to your `App` component and replace the code with the code below:

```jsx :collapsed-lines title="App.jsx"
import React from 'react';
import faker from 'faker'
import { FixedSizeList as List } from "react-window";
import './App.css';

function App() {
  const data = new Array(1000).fill().map((value, id) => (({
    id: id,
    title: faker.lorem.words(5),
    body: faker.lorem.sentences(8)
  })))

  const Row = ({ index, key, style }) => (
   <div>
    <div key={key} style={style} className="post">
      <h3>{`${data[index].title}-${data[index].id}`}</h3>
      <p>{data[index].body}</p>
    </div>
   </div>
  )
  return (
    <List
      width={1400}
      height={700}
      itemCount={data.length}
      itemSize={120}
    >
      {Row}
    </List>
  );
}

export default App;
```

The code is very similar to that of `react-virtualized`. We used a `List` component, which accepts a set of props that defines the list, and passed in a `Row` component function, which is responsible for rendering each row in the list.

The author of the library outlined the [differences between `react-window`and `react-virtualized` (<VPIcon icon="iconfont icon-github"/>`bvaughn/react-window#how-is-react-window-different-from-react-virtualized`)](https://github.com/bvaughn/react-window#how-is-react-window-different-from-react-virtualized) at this GitHub repository.

---

## React ViewPort List

Like `react-virtualized`, [React ViewPort List (<VPIcon icon="fa-brands fa-npm"/>`react-viewport-list`)](https://npmjs.com/package/react-viewport-list) utilizes a technique called windowing, which renders only a portion of the list at a time, significantly reducing the time it takes to re-render components as well as the number of DOM nodes created. React ViewPort List has some interesting features like:

- Support for vertical and horizontal lists️️
- Support for scroll to index
- Flexbox alignment
- Dynamic height and width for viewport

Install React ViewPort List by running the code below in your terminal:

```sh
npm i react-viewport-list
```

Go to your `App` component and replace the existing code with the code below:

```jsx :collapsed-lines title="App.jsx"
import React from "react";
import { faker } from "@faker-js/faker";
import { useRef } from "react";
import ViewportList from "react-viewport-list";
const App = () => {
  const ref = useRef(null);
  const items = new Array(1000).fill().map((value, index) => ({
    id: index,
    name: faker.name.firstName(5),
    body: faker.lorem.paragraph(8),
  }));
  return (
    <div className="scroll-container" ref={ref}>
      <ViewportList viewportRef={ref} items={items} itemMinSize={40} margin={8}>
        {(item) => (
          <div key={item.id} className="post">
            <h3>
              {item.name} - {item.id}
            </h3>
            <p>{item.body}</p>
          </div>
        )}
      </ViewportList>
    </div>
  );
};

export default App;
```

The `ViewportList` component accepts an `item` prop that is assigned to a set of data for the lists. The list is then rendered as rows with a margin of 8px and a minimum height size of 40px.

---

## Conclusion

When handling a large list, it’s important not to render all the data at once to avoid overloading the DOM tree.

The best approach to improving performance depends on your use case. If you prefer to render all the data in one place, infinite scroll or a windowing technique would be your best bet. Otherwise, you may prefer a pagination solution that segments data into different pages.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Rendering large lists in React: 5 methods with examples",
  "desc": "Explore five methods for easily rendering large lists in React, including pagination, infinite scroll, and several libraries.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/render-large-lists-react-5-methods-examples.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
