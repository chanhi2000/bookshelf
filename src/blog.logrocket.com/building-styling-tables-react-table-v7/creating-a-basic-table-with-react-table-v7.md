---
lang: en-US
title: "Creating a basic table with React Table v7"
description: "Article(s) > (2/7) What’s new in React Table v7?" 
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
      content: "Article(s) > (2/7) What’s new in React Table v7?"
    - property: og:description
      content: "Creating a basic table with React Table v7"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/building-styling-tables-react-table-v7/creating-a-basic-table-with-react-table-v7.html
date: 2020-04-02
isOriginal: false
author:
  - name: John Au-Yeung
    url : https://blog.logrocket.com/author/johnau-yeung/
cover: /assets/image/blog.logrocket.com/building-styling-tables-react-table-v7/banner.jpeg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "What’s new in React Table v7?",
  "desc": "The latest version of React Table, react-table v7, provides a modern, Hooks-based API that helps us create tables in React with little hassle.",
  "link": "/blog.logrocket.com/building-styling-tables-react-table-v7/README.md",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="What’s new in React Table v7?"
  desc="The latest version of React Table, react-table v7, provides a modern, Hooks-based API that helps us create tables in React with little hassle."
  url="https://blog.logrocket.com/building-styling-tables-react-table-v7#creating-a-basic-table-with-react-table-v7"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/building-styling-tables-react-table-v7/banner.jpeg"/>

Creating a basic table in a React app is easy with react-table. Run the following to install it:

::: code-tabs#sh

@tab:active <FontIcon icon="fa-brands fa-yarn"/>

```sh
yarn add react-table
```

@tab <FontIcon icon="fa-brands fa-npm"/>

```sh
npm i react-table
```

:::

Then we can use it as follows:

```jsx :collapsed-lines title="App.jsx"
import React from "react";
import { useTable } from "react-table";

const data = [
  { firstName: "jane", lastName: "doe", age: 20 },
  { firstName: "john", lastName: "smith", age: 21 }
];

const columns = [
  {
    Header: "Name",
    columns: [
      {
        Header: "First Name",
        accessor: "firstName"
      },
      {
        Header: "Last Name",
        accessor: "lastName"
      }
    ]
  },
  {
    Header: "Other Info",
    columns: [
      {
        Header: "Age",
        accessor: "age"
      }
    ]
  }
];

const Table = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({
    columns,
    data
  });

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default function App() {
  return (
    <div className="App">
      <Table columns={columns} data={data} />
    </div>
  );
}
```

In the code above, we imported the `useTable` Hook from the react-table package. Then we created the `data` to populate the table with data:

```jsx
const data = [
  { firstName: "jane", lastName: "doe", age: 20 },
  { firstName: "john", lastName: "smith", age: 21 }
];
```

We just put properties in objects to add additional data for a table row.

We can create columns in a list with the following code:

```js :collapsed-lines
const columns = [
  {
    Header: "Name",
    columns: [
      {
        Header: "First Name",
        accessor: "firstName"
      },
      {
        Header: "Last Name",
        accessor: "lastName"
      }
    ]
  }, {
    Header: "Other Info",
    columns: [
      {
        Header: "Age",
        accessor: "age"
      }
    ]
  }
];
```

The `Header` property has the string for the names that’ll be displayed, and the `accessor` property is the property name that’s in the array entry objects.

In the `Table` component code, we have:

```jsx :collapsed-lines
const Table = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({
    columns,
    data
  });

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
```

The `useTable` Hook takes the `column` and `data` from the props, which originate from those objects and arrays that we defined earlier. We get the functions from the `getTableProps` and `getTableBodyProps` from the object returned from the `useTable` Hook.

The `getHeaderProps()` function is called inside the `th` tags and spread to populate the headers. With this, we pass the props returned by the `getTableBodyProps()` function to `tbody` to spread the props to properly style and align the columns.

The `prepareRow(row);` returned from the `useTable` Hook creates the row entries, which can be automatically populated after the call to the function changes the `row` object in place.

Then we have:

```jsx
{rows.map((row, i) => {
  prepareRow(row);
  return (
   <tr {...row.getRowProps()}>
     {row.cells.map(cell => {
       return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
     })}
   </tr>
  );
})}
```

This automatically populates the cells by getting the items from the `getCellProps()` method and then populating the values from the returned object. We called `cell.render("Cell")` to render each `td` as a cell.

Finally, in `App`, we used the `Table` component, which takes the `column` and `data` props. The values are the `columns` and `data` objects that we created earlier.

The items displayed in the table in two panes. The left pane has the **Name** header with two columns: **First Name** and **Last Name**. Then, the right pane has the **Other Info** heading with the **Age** column.
