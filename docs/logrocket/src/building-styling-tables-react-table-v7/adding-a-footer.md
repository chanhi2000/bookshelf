---
lang: en-US
title: "Adding a footer"
description: "Article(s) > (3/7) What’s new in React Table v7?" 
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
      content: "Article(s) > (3/7) What’s new in React Table v7?"
    - property: og:description
      content: "Adding a footer"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/building-styling-tables-react-table-v7/adding-a-footer.html
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
  url="https://blog.logrocket.com/building-styling-tables-react-table-v7#adding-a-footer"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/building-styling-tables-react-table-v7/banner.jpeg"/>

We can add a footer by adding a `Footer` property to out column objects. We can write the following code to do that:

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
    Footer: "Name",
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
    Footer: "Other Info",
    columns: [
      {
        Header: "Age",
        accessor: "age",
        Footer: info => {
          const total = React.useMemo(
            () => info.rows.reduce((sum, row) => row.values.age + sum, 0),
            [info.rows]
          );

          return <>Average Age: {total / info.rows.length}</>;
        }
      }
    ]
  }
];

const Table = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
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
      <tfoot>
        {footerGroups.map(group => (
          <tr {...group.getFooterGroupProps()}>
            {group.headers.map(column => (
              <td {...column.getFooterProps()}>{column.render("Footer")}</td>
            ))}
          </tr>
        ))}
      </tfoot>
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

In the code above, we added the `Footer` property to the `columns` array as follows:

```jsx
const columns = [
  {
    Header: "Name",
    Footer: "Name",
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
    Footer: "Other Info",
    columns: [
      {
        Header: "Age",
        accessor: "age",
        Footer: info => {
          const total = React.useMemo(
            () => info.rows.reduce((sum, row) => row.values.age + sum, 0),
            [info.rows]
          );

          return <>Average Age: {total / info.rows.length}</>;
        }
      }
    ]
  }
];
```

We added the `Footer` property to the top-level of each object.

Also, we add a function for the `Footer` property in the object for the Age column.

The `Footer` property in the object for the Age column is:

```jsx
info => {
  const total = React.useMemo(
    () => info.rows.reduce((sum, row) => row.values.age + sum, 0),
    [info.rows]
  );

  return <>Average Age: {total / info.rows.length}</>;
}
```

It takes the `info` object, which has all the table data. Then we summed by all the `age` property values for each entry and divided it by `info.row.length` to return the average age. This is displayed at the bottom of the table below the **Age** column.

The average will change as the row changes since we have `[info.rows]`, which watches the rows for changing values and recomputes the value when the rows change.
