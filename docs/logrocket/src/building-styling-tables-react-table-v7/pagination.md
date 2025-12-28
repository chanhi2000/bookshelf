---
lang: en-US
title: "Pagination"
description: "Article(s) > (6/7) What’s new in React Table v7?" 
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
      content: "Article(s) > (6/7) What’s new in React Table v7?"
    - property: og:description
      content: "Pagination"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/building-styling-tables-react-table-v7/pagination.html
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
  url="https://blog.logrocket.com/building-styling-tables-react-table-v7#pagination"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/building-styling-tables-react-table-v7/banner.jpeg"/>

We can add pagination using the `usePagination` Hook, which is passed in as the argument for the `useTable` Hook.

The `useTable` Hook then returns a bunch of pagination-related variables that we used to track the pagination and navigate to different pages.

To make a simple table with pagination, we can write the following code:

```jsx :collapsed-lines title="App.jsx"
import React from "react";
import { useTable, usePagination } from "react-table";

const firstNames = ["jane", "john", "alex"];
const lastName = ["smith", "jones"];

const data = Array(100)
  .fill()
  .map(a => ({
    firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
    lastName: lastName[Math.floor(Math.random() * lastName.length)],
    age: Math.ceil(75 * Math.random())
  }));

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
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize }
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 }
    },
    usePagination
  );

  return (
    <>
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
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>{" "}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"<"}
        </button>{" "}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {">"}
        </button>{" "}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>{" "}
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <span>
          | Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "100px" }}
          />
        </span>{" "}
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
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

In the code above, we generated 100 array entries with random names and pages of people. The headers are the same as the simple table example above.

In the `Table` component, we have:

```jsx
const {
  getTableProps,
  getTableBodyProps,
  headerGroups,
  prepareRow,
  page,
  canPreviousPage,
  canNextPage,
  pageOptions,
  pageCount,
  gotoPage,
  nextPage,
  previousPage,
  setPageSize,
  state: { pageIndex, pageSize }
} = useTable(
  {
    columns,
    data,
    initialState: { pageIndex: 0 }
  },
  usePagination
);
```

With this, we can get various pieces of data we need for pagination, like `pageSize` to change the number of items displayed on each page.

`canPreviousPage` and `canNextPage` tell us whether we can move to the previous or next page respectively. `pageCount` has the total page count, and `gotoPage` is a function that lets us skip to the given page number. `previousPage` and `nextPage` are also functions that let us navigate to the given page.

They’re used in the following `div`to navigate between pages:

```jsx :collapsed-lines
<div>
  <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
    {"<<"}
  </button>{" "}
  <button onClick={() => previousPage()} disabled={!canPreviousPage}>
    {"<"}
  </button>{" "}
  <button onClick={() => nextPage()} disabled={!canNextPage}>
    {">"}
  </button>{" "}
  <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
    {">>"}
  </button>{" "}
  <span>
    Page{" "}
    <strong>
      {pageIndex + 1} of {pageOptions.length}
    </strong>{" "}
  </span>
  <span>
    | Go to page:{" "}
    <input
      type="number"
      defaultValue={pageIndex + 1}
      onChange={e => {
        const page = e.target.value ? Number(e.target.value) - 1 : 0;
        gotoPage(page);
      }}
      style={{ width: "100px" }}
    />
  </span>{" "}
  <select
    value={pageSize}
    onChange={e => {
      setPageSize(Number(e.target.value));
    }}
  >
    {[10, 20, 30, 40, 50].map(pageSize => (
      <option key={pageSize} value={pageSize}>
        Show {pageSize}
      </option>
    ))}
  </select>
</div>
```

Then we get a table with the same columns as in the example above, but with pagination buttons added. We can also use the dropdown to change the size of each page.
