---
lang: en-US
title: "Sorting"
description: "Article(s) > (4/7) What’s new in React Table v7?" 
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
      content: "Article(s) > (4/7) What’s new in React Table v7?"
    - property: og:description
      content: "Sorting"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/building-styling-tables-react-table-v7/sorting.html
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
  url="https://blog.logrocket.com/building-styling-tables-react-table-v7#sorting"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/building-styling-tables-react-table-v7/banner.jpeg"/>

We can add sorting to a table by calling a few functions. We have to pass in the `useSortBy` Hook as the second argument of the `useTable` Hook to get sorting capability in our table.

Then, in our JSX code, we have to pass in `column.getSortByToggleProps()` to `column.getHeaderProps` to get the sorting order of the columns in the rendered column.

We can check the order in which a column is sorted by using the `column.isSorted` and `column.isSortedDesc` to check if a column is sorted by ascending or descending order, respectively.

Also, we can add a `sortType` property to the column array entries so we can specify the sort type. For instance, we can write the following code to add basic sorting to our table:

```jsx :collapsed-lines
import React from "react";
import { useTable, useSortBy } from "react-table";

const data = [
  { firstName: "jane", lastName: "doe" },
  { firstName: "john", lastName: "smith" }
];

const columns = [
  {
    Header: "Name",
    columns: [
      {
        Header: "First Name",
        accessor: "firstName",
        sortType: "basic"
      },
      {
        Header: "Last Name",
        accessor: "lastName",
        sortType: "basic"
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
  } = useTable(
    {
      columns,
      data
    },
    useSortBy
  );

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render("Header")}
                <span>
                  {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
                </span>
              </th>
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

In the code above, we specified that `sortType` is `'basic'` so that words are sorted alphabetically and numbers are sorted numerically.

Then we rendered the `thead` by writing:

```jsx
<thead>
  {headerGroups.map(headerGroup => (
    <tr {...headerGroup.getHeaderGroupProps()}>
      {headerGroup.headers.map(column => (
        <th {...column.getHeaderProps(column.getSortByToggleProps())}>
          {column.render("Header")}
          <span>
            {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
          </span>
        </th>
      ))}
    </tr>
  ))}
</thead>
```

This adds icons for indicating the sort order of each column and getting the order by which the column is sorted.

After writing that code, we’ll see a sort button to the right of our column headings that we can click on to sort the columns.
