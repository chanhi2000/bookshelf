---
lang: en-US
title: "Filtering"
description: "Article(s) > (5/7) What’s new in React Table v7?" 
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
      content: "Article(s) > (5/7) What’s new in React Table v7?"
    - property: og:description
      content: "Filtering"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/building-styling-tables-react-table-v7/filtering.html
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
  url="https://blog.logrocket.com/building-styling-tables-react-table-v7#filtering"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/building-styling-tables-react-table-v7/banner.jpeg"/>

Filtering is more complex than creating a simple table or sorting. We have to create a component with an input control we can use to filter our items. The input component will take the functions that are returned from the `useTable` as props and call them in the inputs.

For instance, we can write the following code to do that:

```jsx :collapsed-lines
import React from "react";
import { useTable, useFilters, useGlobalFilter } from "react-table";

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
        accessor: "firstName",
        filter: "text"
      },
      {
        Header: "Last Name",
        accessor: "lastName",
        filter: "text"
      }
    ]
  },
  {
    Header: "Other Info",
    columns: [
      {
        Header: "Age",
        accessor: "age",
        filter: "text"
      }
    ]
  }
];

const DefaultColumnFilter = ({
  column: { filterValue, preFilteredRows, setFilter }
}) => {
  const count = preFilteredRows.length;

  return (
    <input
      value={filterValue || ""}
      onChange={e => {
        setFilter(e.target.value || undefined);
      }}
      placeholder={`Search ${count} records...`}
    />
  );
};

const GlobalFilter = ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter
}) => {
  const count = preGlobalFilteredRows && preGlobalFilteredRows.length;

  return (
    <span>
      Search:{" "}
      <input
        value={globalFilter || ""}
        onChange={e => {
          setGlobalFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
        }}
        placeholder={`${count} records...`}
        style={{
          border: "0"
        }}
      />
    </span>
  );
};

const Table = ({ columns, data }) => {
  const filterTypes = React.useMemo(
    () => ({
      text: (rows, id, filterValue) => {
        return rows.filter(row => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      }
    }),
    []
  );

  const defaultColumn = React.useMemo(
    () => ({
      Filter: DefaultColumnFilter
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      filterTypes
    },
    useFilters,
    useGlobalFilter
  );

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>
                {column.render("Header")}
                <div>{column.canFilter ? column.render("Filter") : null}</div>
              </th>
            ))}
          </tr>
        ))}
        <tr>
          <th
            colSpan={visibleColumns.length}
            style={{
              textAlign: "left"
            }}
          >
            <GlobalFilter
              preGlobalFilteredRows={preGlobalFilteredRows}
              globalFilter={state.globalFilter}
              setGlobalFilter={setGlobalFilter}
            />
          </th>
        </tr>
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

In the code above, we added the `GlobalFilter` component as follows:

```jsx
const GlobalFilter = ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter
}) => {
  const count = preGlobalFilteredRows && preGlobalFilteredRows.length;

  return (
    <span>
      Search:{" "}
      <input
        value={globalFilter || ""}
        onChange={e => {
          setGlobalFilter(e.target.value || undefined);
        }}
        placeholder={`${count} records...`}
        style={{
          border: "0"
        }}
      />
    </span>
  );
};
```

This is used to search all the columns present in the data by calling the `setGlobalFilter` function that’s passed in as props. The `preGlobalFilteredRows` is an array in which we can count the number of rows that we’re searching for.

Then, in the `Table` component, we added the following code:

```jsx
const filterTypes = React.useMemo(
  () => ({
    text: (rows, id, filterValue) => {
      return rows.filter(row => {
        const rowValue = row.values[id];
        return rowValue !== undefined
          ? String(rowValue)
              .toLowerCase()
              .startsWith(String(filterValue).toLowerCase())
          : true;
      });
    }
  }),
  []
);

const defaultColumn = React.useMemo(
  () => ({
    Filter: DefaultColumnFilter
  }),
  []
);

const {
  getTableProps,
  getTableBodyProps,
  headerGroups,
  rows,
  prepareRow,
  state,
  visibleColumns,
  preGlobalFilteredRows,
  setGlobalFilter
} = useTable(
  {
    columns,
    data,
    defaultColumn,
    filterTypes
  },
  useFilters,
  useGlobalFilter
);
```

The `defaultColumn` has a cached object, which has the `DefaultColumnFilter` set as follows:

```jsx
const DefaultColumnFilter = ({
  column: { filterValue, preFilteredRows, setFilter }
}) => {
  const count = preFilteredRows.length;

  return (
    <input
      value={filterValue || ""}
      onChange={e => {
        setFilter(e.target.value || undefined);
      }}
      placeholder={`Search ${count} records...`}
    />
  );
};
```

The `defaultColumn` caches the input component that’s used to search individual columns. We also have the `filterTypes` constant, which has the cached value of the filter we used to search our table.

We have an object with the `text` method, which is used to search the entries that we’re looking for as we type. In the method, we called `filter` on `rows` to return the items that start with the given search string, which is stored in `filterValue`.

We also used more of the returned properties from the `useTable` Hook and passed in more arguments to the Hook, including the `useFilters` and `useGlobalFilter` Hooks to let us filter by column and globally, respectively.

Also, we added the `defaultColumn` and `filterTypes` objects to the object in the first argument to let us set the component we’ll use to do the filtering by default. `filterTypes` lets us set the value to the name of our function that we created for returning filtered data from our array of data.

In the end, we get two inputs to filter each column individually and one that can filter the items from all columns globally.
