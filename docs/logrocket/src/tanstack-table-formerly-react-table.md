---
lang: en-US
title: "A complete guide to TanStack Table (formerly React Table)"
description: "Article(s) > A complete guide to TanStack Table (formerly React Table)"
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
      content: "Article(s) > A complete guide to TanStack Table (formerly React Table)"
    - property: og:description
      content: "A complete guide to TanStack Table (formerly React Table)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/tanstack-table-formerly-react-table.html
prev: /programming/js-react/articles/README.md
date: 2025-03-28
isOriginal: false
author:
  - name: Paramanantham Harrison
    url : https://blog.logrocket.com/author/paramananthamharrison/
cover: /assets/image/blog.logrocket.com/tanstack-table-formerly-react-table/banner.png
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
  name="A complete guide to TanStack Table (formerly React Table)"
  desc="Discover how to use TanStack Table, formerly known as React Table, to build a table UI for a variety of use cases."
  url="https://blog.logrocket.com/tanstack-table-formerly-react-table"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/tanstack-table-formerly-react-table/banner.png"/>

## What is TanStack Table?

[TanStack Table (<VPIcon icon="iconfont icon-github"/>`table/latest`)](https://tanstack.com/table/latest), formerly known as [React Table (<VPIcon icon="iconfont icon-github"/>`tannerlinsley/react-table`)](https://github.com/tannerlinsley/react-table), is a headless UI for building tables and datagrids across multiple frameworks, including React, Solid, Vue, and even React Native. Being “headless” means it doesn’t provide pre-built components or styles, giving you full control over markup and design. It’s perfect if you want a customizable and lightweight table solution that can be used with [**any JavaScript framework**](/blog.logrocket.com/10-most-important-javascript-frameworks-past-decade.md), thanks to it being framework agnostic.

![](/assets/image/blog.logrocket.com/tanstack-table-formerly-react-table/banner.png)

---

## What happened to React Table?

In July 2022, Tanner Linsley, creator of TanStack, announced the [release of TanStack Table (<VPIcon icon="fa-brands fa-x-twitter"/>`tannerlinsley`)](https://x.com/tannerlinsley/status/1542925072502968320?lang=en), which offers a major upgrade from React Table v7. TanStack Table v8 was completely rewritten in TypeScript to be more performant and feature-rich, while also expanding support to frameworks like Vue, Solid, and Svelte.

The [<VPIcon icon="fa-brands fa-npm"/>`react-table`](https://npmjs.com/package/react-table) NPM package is no longer stable or maintained. The new version is published under the **@tanstack** scope, with the `@tanstack/react-table` adapter handling React-specific state management and rendering.

::: note Editor’s note

This article was last updated by [<VPIcon icon="fas fa-globe"/>Saleh Mubashar](https://blog.logrocket.com/author/salehmubashar/) in March 2025 to explain TanStack Table’s emergence over the now-outdated React Table, and provide a direct comparison between TanStack Table, Material React Table, and Material UI table.*

:::

---

## When to use a table in React

Tables are useful in React for displaying structured data, such as financial reports, sports leaderboards, and pricing comparisons:

![TanStack Table Use Cases](/assets/image/blog.logrocket.com/tanstack-table-formerly-react-table/react-table-use-cases.png)

Popular products like Airtable, Asana List View, Google Sheets, and Notion rely heavily on tables, while major companies like Google, Apple, and Microsoft use TanStack Table in their applications.

---

## TanStack Table UI features

Below, we’ve listed the most important features present in TanStack table. These are some of the many reasons why TanStack Table is one of the top React table libraries:

### Basic features

- Clean, customizable UI for readability and accessibility
- Remote data fetching with API integration
- Search, column-specific filtering, and basic sorting

### Advanced features

- Custom sorting and filtering based on data types (e.g., numbers, strings, Booleans)
- Pagination for large datasets and column visibility toggles
- Inline or modal-based row editing
- Fixed headers, responsive design, and resizable columns
- Smooth scrolling (horizontal/vertical) and expandable rows for detailed views

---

## Getting started with TanStack Table

### Migrating to TanStack V8

If you’re upgrading from React Table v7 to TanStack Table v8, follow [<VPIcon icon="fas fa-globe"/>this migration guide](https://tanstack.com/table/latest/docs/guide/migrating#migrating-to-v8). Below is a summary of the key steps.

Start by uninstalling React Table and installing TanStack Table using the following commands:

```sh
npm uninstall react-table @types/react-table
npm i @tanstack/react-table
```

Next, rename all instances of `useTable` to `useReactTable` and update the syntax where needed. Table options like `disableSortBy` have been renamed to `enableSorting`. Column definitions now use `accessorKey` for strings and `accessorFn` for functions, while `Header` has been renamed to `header`.

Markup changes include replacing `cell.render('Cell')` with `flexRender()`, manually defining props like `colSpan` and `key`, and using `getValue()` instead of `value` for cell rendering. Column definitions have been reorganized, and custom filters now return a boolean instead of filtering rows directly. Overall, the migration requires minor adjustments, but the core concept and functionality remain the same.

### Installation

If you are starting from scratch, the installation process is quite straightforward. Install the TanStack Table adapter for React using the following command:

```sh
npm i @tanstack/react-table
```

The `@tanstack/react-table` adapter is a wrapper around the core table logic. It will provide a number of Hooks and types to manage the table state. The package works with React 16.8 and later, including [**React 19**](/blog.logrocket.com/how-react-19-can-help-you-make-faster-websites.md) (though compatibility with the upcoming React Compiler may change in future updates).

---

## TanStack Table example: Setting up a simple table

Let’s create a basic table using TanStack Table and some dummy data. We first define the data and column structure:

```tsx :collapsed-lines
import * as React from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import "./styles.css";

// Define the type for our table data
type Person = {
  name: string;
  age: number;
  status: string;
};

// Sample dataset
const data: Person[] = [
  { name: "Alice", age: 25, status: "Active" },
  { name: "Bob", age: 30, status: "Inactive" },
  { name: "Charlie", age: 35, status: "Pending" },
];

// Create a column helper to ensure type safety
const columnHelper = createColumnHelper<Person>();

// Define columns for the table
const columns = [
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("age", {
    header: "Age",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: (info) => info.getValue(),
  }),
];
```

Now, we use `useReactTable` to manage the table’s data and structure.

```tsx
export default function App() {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

You can view the demo [<VPIcon icon="iconfont icon-codesandbox"/>here](https://codesandbox.io/p/sandbox/d6g8k3). Here’s the basic rundown of how everything works. You can always read the docs for a detailed explanation of individual Hooks/properties:

1. **Data setup** – The table is built using an array of objects where each object represents a person
2. **Column definitions** – `createColumnHelper` ensures type safety when defining column headers and cell content
3. **Table initialization** – `useReactTable` sets up the table structure
4. **Rendering the table** – `table.getHeaderGroups()` generates table headers, while `table.getRowModel().rows` dynamically renders table rows

---

## Fetching and displaying API data in a table

Instead of using static data, we can populate our table dynamically using an API. Here is the [TanStack Table example (<VPIcon icon="iconfont icon-github"/>`)](https://github.com/HussainArif12/react-table-demo) we’ll be working with.

### Calling an API with Axios

For our application, we’ll use Axios to retrieve movie information with the search term `snow` from the [<VPIcon icon="fas fa-globe"/>TVMAZE API](https://tvmaze.com/api). Below is the endpoint for this operation:

```plaintext
https://api.tvmaze.com/search/shows?q=snow
```

To call the API, let’s install [**Axios**](/blog.logrocket.com/http-requests-axios.md):

```sh
npm i axios
```

Modify <VPIcon icon="fa-brands fa-react"/>`App.tsx` to fetch data when the component loads:

```tsx title="App.tsx"
import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://api.tvmaze.com/search/shows?q=snow");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return <></>;
}

export default App;
```

Above, we created a state called `data`. Once the component gets mounted, we fetch movie content from the TVMAZE API using Axios and save the returned result in the `data` state variable.

This API returns an array of TV shows, each containing properties like `name`, `type`, and `language`:

```json :collapsed-lines
// the API gives an array of TV Shows. Here is one item:
// we will later use this response to create a TypeScript object..
//that will help us model the Show interface
[
  {
    "score": 0.86069167,
    "show": {
      "id": 10412,
      "url": "...",
      "name": "Snow",
      "type": "Scripted",
      "language": "English",
      "genres": [
        "Comedy"
      ],
      "status": "...",
      "runtime": 120,
      "averageRuntime": 120,
      "premiered": "...",
      "ended": "...",
      "officialSite": "..",
      "schedule": {
        "time": "..",
        "days": [
          ".."
        ]
      },
      "rating": {
        "average": null
      },
      "weight": 40,
      "network": {
        "id": 26,
        "name": "..",
        "country": {
          "name": "..",
          "code": "..",
          "timezone": "..."
        },
        "officialSite": ".."
      },
      "webChannel": null,
      "dvdCountry": null,
      "externals": {
        "tvrage": null,
        "thetvdb": null,
        "imdb": null
      },
      "image": {
        "medium": "..."
      },
      "summary": "...",
      "updated": 1670595447,
      "_links": {
        "self": {
          "href": ".."
        },
        "previousepisode": {
          "href": "...",
          "name": "..."
        }
      }
    }
  },
  //other TV shows..
]
```

The `data` prop is the data we got through the API call, and `columns` will be an object that configures our table columns.

In the <VPIcon icon="fas fa-folder-open"/>`/src` folder, create a new <VPIcon icon="fa-brands fa-react"/>`Table.tsx` file and paste the following code:

```tsx title="Table.tsx"

//create a Show object for TypeScript(see API response above for reference):
//only these properties are relevant to us:

export type Show = {
  show: {
    status: string;
    name: string;
    type: string;
    language: string;
    genres: string[];
    runtime: number;
  };
};

// now create types for props for this Table component(https://tanstack.com/table/latest/docs/framework/react/examples/sub-components)
type TableProps<TData> = {
  data: TData[];
  columns: GroupColumnDef<TData>[];
};

export default function Table({ columns, data }:TableProps<Show>) {
  // Table component logic and UI come here
  return <></>;
}
```

Let’s modify the content in <VPIcon icon="fa-brands fa-react"/>`App.tsx` to include the columns for our table and also render the `Table` component:

```tsx :collapsed-lines title="App.tsx"
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { createColumnHelper } from "@tanstack/react-table";
import Table, { Show } from "./Table";

function App() {
  const [data, setData] = useState<Show[]>();
  const columnHelper = createColumnHelper<Show>();
  //define our table headers and data
  const columns = useMemo(
    () => [
      //create a header group:
      columnHelper.group({
        id: "tv_show",
        header: () => <span>TV Show</span>,
        //now define all columns within this group
        columns: [
          columnHelper.accessor("show.name", {
            header: "Name",
            cell: (info) => info.getValue(),
          }),
          columnHelper.accessor("show.type", {
            header: "Type",
            cell: (info) => info.getValue(),
          }),
        ],
      }),
      //create another group:
      columnHelper.group({
        id: "details",
        header: () => <span> Details</span>,
        columns: [
          columnHelper.accessor("show.language", {
            header: "Language",
            cell: (info) => info.getValue(),
          }),
          columnHelper.accessor("show.genres", {
            header: "Genres",
            cell: (info) => info.getValue(),
          }),
          columnHelper.accessor("show.runtime", {
            header: "Runtime",
            cell: (info) => info.getValue(),
          }),
          columnHelper.accessor("show.status", {
            header: "Status",
            cell: (info) => info.getValue(),
          }),
        ],
      }),
    ],
    [],
  );
  const fetchData = async () => {
    const result = await axios("https://api.tvmaze.com/search/shows?q=snow");
    setData(result.data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return <>{data && <Table columns={columns} data={data} />}</>;
}

export default App;
```

In the code above, we used the [**`useMemo` Hook**](/blog.logrocket.com/react-usememo-vs-usecallback.md) to create a memoized array of columns; we defined two level headers, each with different columns for our table heads.

We’ve set up all of the columns to have an accessor, which is the data returned by the TVMAZE API set to `data`.

Now, let’s finish our `Table` component:

```tsx :collapsed-lines title="Table.tsx"
//extra code removed for brevity..
import {
  flexRender,
  getCoreRowModel,
  GroupColumnDef,
  useReactTable,
} from "@tanstack/react-table";

export default function Table({ columns, data }: TableProps<Show>) {
  //use the useReact table Hook to build our table:
  const table = useReactTable({
    //pass in our data
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  // Table component logic and UI come here
  return (
    <div>
      <table>
        <thead>
          {/*use the getHeaderGRoup function to render headers:*/}
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {/*Now render the cells*/}
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

Above, we passed `columns` and `data` to `useReactTable`. The `useReactTable` Hook will return the necessary props for the table, body, and the transformed data to create the header and cells. React will then generate the header by iterating through the headers using the `getHeaderGroups` function, and the table body’s rows will be generated via the `getRowModel()` function.

You’ll also notice that the `genre` field is an array, but React will render it to a comma-separated string in our final output.

If we run our application at this point, we should get the following output:

![Table Rendered With TanStack Table](/assets/image/blog.logrocket.com/tanstack-table-formerly-react-table/table-rendered-react-table.png)

### Custom styling in TanStack Table

While this table is adequate for most applications, what if we require custom styles? With TanStack Table, you can define custom styles for each cell; it’s possible to define styles in the `column` object, as shown below.

For example, let’s make a badge-like custom component to display each genre:

```tsx :collapsed-lines title="App.tsx"
//extra code removed for brevity
type GenreProps = {
  genres: string[];
};

const Genres = ({ genres }: GenreProps) => {
  // Loop through the array and create a badge-like component instead of a comma-separated string
  return (
    <>
      {genres.map((genre, idx) => {
        return (
          <span
            key={idx}
            style={{
              backgroundColor: "green",
              marginRight: 4,
              padding: 3,
              borderRadius: 5,
            }}
          >
            {genre}
          </span>
        );
      })}
    </>
  );
};

//this function will convert runtime(minutes) into hours and minutes
function convertToHoursAndMinutes(runtime: number) {
  const hour = Math.floor(runtime / 60);
  const min = Math.floor(runtime % 60);
  return `${hour} hour(s) and ${min} minute(s)`;
}

function App() {
  const columns = useMemo(
    () => [
      //...
      columnHelper.group({
        //..
        columns: [
          ,
          //...
          columnHelper.accessor("show.genres", {
            header: "Genres",
            //render the Genres component here:
            cell: (info) => <Genres genres={info.getValue()} />,
          }),
          columnHelper.accessor("show.runtime", {
            header: "Runtime",
            //use our convertToHoursAndMinutes function to render the runtime of the show
            cell: (info) => convertToHoursAndMinutes(info.getValue()),
          }),
          //...
        ],
      }),
    ],
    [],
  );
  //further code..
}

//...
```

We updated the `Genres` column above by iterating and sending its values to a custom component, creating a badge-like element. We also changed the `runtime` column to show the watch hour and minute based on the time. Following this step, our table UI should look like the following:

![Table Styling Has Changed](/assets/image/blog.logrocket.com/tanstack-table-formerly-react-table/table-styling-changed.png)

As you can see, TanStack Table has successfully styled our table with relative ease! If you need more help rendering custom cells, refer to the [<VPIcon icon="fas fa-globe"/>documentation](https://tanstack.com/table/v8/docs/guide/cells#cell-rendering).

We’ve seen how we can customize the styles for each cell based on our needs; you can show any custom element for each cell based on the data value.

---

## Adding search functionality with `getFilteredRowModel`

### Global filtering

Using the guide for [<VPIcon icon="fas fa-globe"/>global filtering](https://tanstack.com/table/v8/docs/api/features/global-filtering), we can extend our table by adding global search capabilities. The `getFilteredRowModel` property in the `useReactTable` Hook will let TanStack Table know that we want to implement filtering in our project.

First, let’s create a search input in <VPIcon icon="fa-brands fa-react"/>`Table.tsx`:

```ts :collapsed-lines title="Table.tsx"
// Create a searchbar:
function Searchbar({
  value: initialValue,
  onChange,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
  const [value, setValue] = useState(initialValue);
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);
  //if the entered value changes, run the onChange handler once again.
  useEffect(() => {
    onChange(value);
  }, [value]);
  //render the basic searchbar:
  return (
    <input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

export default function Table({ columns, data }: TableProps<Show>) {
  const [globalFilter, setGlobalFilter] = useState("");
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    filterFns: {},
    state: {
      globalFilter, //specify our global filter here
    },
    onGlobalFilterChange: setGlobalFilter, //if the filter changes, change the hook value
    globalFilterFn: "includesString", //type of filtering
    getFilteredRowModel: getFilteredRowModel(), //row model to filter the table
  });
  return (
    <div>
    {/*Render the searchbar:*/}
      <Searchbar
        value={globalFilter ?? ""}
        onChange={(value) => setGlobalFilter(String(value))}
        placeholder="Search all columns..."
      />
      {/*Further code..*/}
    </div>
  );
}
```

Let’s break this code down:

- First, we created a simple `Searchbar` component. As the name suggests, this component will send user input to TanStack Table. The library will then filter the table rows to match the user input
- Later on, we used the `getFilteredRowModel` method and passed our `globalFilter` Hook to the `state` property in the `useReactTable` Hook
- Finally, we rendered the `SearchBar` component

This will be the result:

![Table Demonstrating Global Search](/assets/image/blog.logrocket.com/tanstack-table-formerly-react-table/global-search-functionality.webp)

### Column searching

Thanks to TanStack Table, column searching is also available to help the user filter out a specific column.

The code snippet below introduces column searching functionality in our app:

```tsx :collapsed-lines
import { ColumnFiltersState } from "@tanstack/react-table";

export default function Table({ columns, data }: TableProps<Show>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    //....
    state: {
      columnFilters,
      globalFilter,
    },
    onColumnFiltersChange: setColumnFilters,
    //...
  });
  // Table component logic and UI come here
  return (
    <div className="p-2">
      {/*...further code..*/}
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                  <div>
                    {/*If the column can be filtered, render the Filter component.*/}
                    {header.column.getCanFilter() ? (
                      <div>
                        <Filter column={header.column} />
                      </div>
                    ) : null}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        {/*further code..*/}
      </table>
      <div className="h-4" />
    </div>
  );
}
//create a Filter component to use for column searching:
function Filter({ column }: { column: Column<Show, unknown> }) {
  const columnFilterValue = column.getFilterValue();

  return (
    <Searchbar
      onChange={(value) => {
        column.setFilterValue(value);
      }}
      placeholder={`Search...`}
      type="text"
      value={(columnFilterValue ?? "") as string}
    />
  );
}
```

If you notice, the code above is similar to that of its global counterpart. The only difference is that we’re rendering a `Filter` component for those columns, which can be filtered.

This will be the result:

![Table With Column Searching Functionality](/assets/image/blog.logrocket.com/tanstack-table-formerly-react-table/column-searching-functionality.webp)

These are very basic examples for filters, and the TanStack Table API provides several options. Be sure to check out the [<VPIcon icon="fas fa-globe"/>API documentation](https://tanstack.com/table/latest/docs/guide/column-filtering) for more information.

---

## Adding sorting with `getSortedRowModel`

Let’s implement one more basic functionality for our table: sorting. TanStack Table allows sorting via the `getSortedRowModel` method:

```tsx :collapsed-lines title="Table.tsx"
import { SortingState, getSortedRowModel } from "@tanstack/react-table";
const [sorting, setSorting] = useState<SortingState>([]);
const table = useReactTable({
  //...
  getSortedRowModel: getSortedRowModel(),
  onSortingChange: setSorting,
  state: {
    sorting,
  },
  //...
});

return (
  <div>
    {/*Extra code to render table and logic..(removed for brevity)*/}
    <thead>
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            return (
              <th key={header.id} colSpan={header.colSpan}>
                {header.isPlaceholder ? null : (
                  <div
                    //when clicked, check if it can be sorted
                    //if it can, then sort this column
                    onClick={header.column.getToggleSortingHandler()}
                    title={
                      header.column.getCanSort()
                        ? header.column.getNextSortingOrder() === "asc"
                          ? "Sort ascending"
                          : header.column.getNextSortingOrder() === "desc"
                            ? "Sort descending"
                            : "Clear sort"
                        : undefined
                    }
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                    {{
                      //display a relevant icon for sorting order:
                      asc: " ",
                      desc: " ",
                    }[header.column.getIsSorted() as string] ?? null}
                  </div>
                )}
              </th>
            );
          })}
        </tr>
      ))}
    </thead>
  </div>
);
```

Here, we passed in our `getSortedRowModel` and `onSortingChange` properties to inform the library that we want to add sorting to our project.

After our sorting implementation, the UI looks like the following:

![Table With Sorting Functionality](/assets/image/blog.logrocket.com/tanstack-table-formerly-react-table/table-sorting-functionality.webp)

As you can see, the user can now click to enable sorting for any column. You can disable the sorting functionality for certain columns via the `enableSorting` flag:

```ts
// column related data in src/App.tsx:
columns: [
  columnHelper.accessor("show.name", {
    header: "Name",
    cell: (info) => info.getValue(),
    enableSorting: false, //disable sorting for this one
  }),
  columnHelper.accessor("show.type", {
    header: "Type",
    cell: (info) => info.getValue(),
  }),
]
//...
```

---

## Grouping with `getGroupedRowModel`

We can even add a grouping feature using the `getGroupedRowModel` method. This is great for cases where users want to group columns according to a certain category.

To start, first add the `aggregationFn` property to the `show.language`, `show.name`, and `show.type` columns:

```tsx title="App.tsx"
const columns = useMemo(
  () => [
    columnHelper.group({
      //...
      columns: [
        columnHelper.accessor("show.name", {
          //...
          aggregationFn: "count",
        }),
        columnHelper.accessor("show.type", {
          //...
          aggregationFn: "count",
        }),
      ],
    }),
    columnHelper.group({
      //...
      columns: [
        columnHelper.accessor("show.language", {
          //...
          aggregationFn: "count",
        }),
      ],
    }),
  ],
  //extra code removed for brevity..
  [],
);
```

Here, we’re setting the `aggregationFn` property to `count`. This tells React to just use count-based aggregation for those columns.

Next, make these changes to the <VPIcon icon="fa-brands fa-react"/>`Table.tsx` component:

```tsx :collapsed-lines title="Table.tsx"
import { GroupingState, getGroupedRowModel, getExpandedRowModel } from "@tanstack/react-table";

const [grouping, setGrouping] = useState<GroupingState>([]);

const table = useReactTable({
  //..
  getExpandedRowModel: getExpandedRowModel(),
  getGroupedRowModel: getGroupedRowModel(),
  onGroupingChange: setGrouping,
  state: {
    //..
    grouping,
  },
});
return (
  <div>
    {/*Further code..*/}
    <thead>
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            return (
              <th key={header.id} colSpan={header.colSpan}>
                {header.isPlaceholder ? null : (
                  <div>
                    {header.column.getCanGroup() ? (
                      // If the header can be grouped, let's add a toggle
                      <button
                        {...{
                          onClick: header.column.getToggleGroupingHandler(),
                          style: {
                            cursor: "pointer",
                          },
                        }}
                      >
                        {header.column.getIsGrouped()
                          ? `(grouped): `
                          : `(ungrouped):`}
                      </button>
                    ) : null}{" "}
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </div>
                )}
              </th>
            );
          })}
        </tr>
      ))}
    </thead>
    {/*Further code..*/}
  </div>
);
```

::: info Here’s what’s happening in this code block:

- Initially, we used the `getExpandedRowModel` and `getGroupedRowModel` properties to help us use sorting in our project
- Later on, we rendered a `button` for every column. When clicked, it will trigger the `header.column.getToggleGroupingHandler()` function. This will toggle grouping for the selected column
- Finally, we also ensured that a relevant title was displayed if the selected column was grouped/ungrouped via the `header.column.getIsGrouped()` method

:::

This will be the result:

![Grouping In TanStack Table](/assets/image/blog.logrocket.com/tanstack-table-formerly-react-table/grouping-react-table.webp)

---

## Column resizing

Tanstack Table also provides a [<VPIcon icon="fas fa-globe"/>`ColumnSizing`](https://tanstack.com/table/v8/docs/api/features/column-sizing) API to help users resize table columns. This is great for situations where a certain row has to be expanded to make their table use up extra available width on the screen.

This code block demonstrates how to implement resizing functionality:

```tsx title="Table.tsx"
const [columnResizeMode, setColumnResizeMode] =
  React.useState<ColumnResizeMode>("onChange");

const [columnResizeDirection, setColumnResizeDirection] =
  React.useState<ColumnResizeDirection>("ltr");

const table = useReactTable({
  data,
  columns,
  columnResizeMode, //specify that we'll use resizing in this table
  columnResizeDirection,
  getCoreRowModel: getCoreRowModel(),
  debugTable: true,
  debugHeaders: true,
  debugColumns: true,
});
return (
  <div style={{ direction: table.options.columnResizeDirection }}>
    <table
      {...{
        style: {
          width: table.getCenterTotalSize(),
        },
      }}
    >
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                {...{
                  key: header.id,
                  colSpan: header.colSpan,
                  style: {
                    width: header.getSize(),
                  },
                }}
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                <div
                  {...{
                    onDoubleClick: () => header.column.resetSize(),
                    //when held down, enable resizing functionality.
                    onMouseDown: header.getResizeHandler(),
                    onTouchStart: header.getResizeHandler(),
                    className: `resizer ${
                      table.options.columnResizeDirection
                    } ${header.column.getIsResizing() ? "isResizing" : ""}`,
                    style: {
                    //keep on increasing/decreasing the column till resize mode is finished.
                      transform:
                        columnResizeMode === "onEnd" &&
                        header.column.getIsResizing()
                          ? `translateX(${
                              (table.options.columnResizeDirection === "rtl"
                                ? -1
                                : 1) *
                              (table.getState().columnSizingInfo.deltaOffset ??
                                0)
                            }px)`
                          : "",
                    },
                  }}
                />
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td
                {...{
                  key: cell.id,
                  style: {
                  //set the width of this column
                    width: cell.column.getSize(),
                  },
                }}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
```

The explanation of the code is in the comments.

Let’s test it out! This will be the output:

![column resizing tanstack table](/assets/image/blog.logrocket.com/tanstack-table-formerly-react-table/update_8_tanstack_column-resizing.webp)

---

## TanStack Table vs. Material UI Table vs Material React Table: Which is right for you?

|  | TanStack Table | Material React Table | Material UI Table |
| --- | --- | --- | --- |
| Type | Headless table library for building tables and data grids — framework agnostic | UI component library built on TanStack Table and using Material UI V6 design principles | A component within the broader Material UI (MUI) React component library |
| UI framework | No built-in UI | Uses Material UI V6 with Emotion styling | Uses Material UI styling |
| Customization | Fully customizable, requires manual UI implementation | Pre-styled with Material UI but still customizable | Limited customization using MUI styling options |
| Framework support | Works with TS/JS, React, Vue, Solid, Qwik, and Svelte | React-only | React-only |
| Dependencies | Fully independent | Requires Material UI and Emotion as peer dependencies | Requires Material UI |
| Advanced features | Filtering, sorting, resizing, pinning, reordering, visibility control, grouping, aggregation | Filtering, sorting, resizing, pinning, reordering, grouping, aggregation | Basic table columns with manual customization |

::: tip Which One Should You Choose?

- **Choose TanStack Table** if you need maximum flexibility and want to implement a highly customized UI while supporting multiple frameworks
- **Choose Material React Table** if you want a pre-built UI but need more advanced features that are often not present in component libraries like [**MUI**](/blog.logrocket.com/mui-adoption-guide.md) or [**Bootstrap**](/blog.logrocket.com/bootstrap-adoption-guide/)
- **Choose Material UI Table** if you need a basic table within a Material UI project and don’t require advanced functionality

:::

---

## FAQs

::: details Q. What happened to React Table?

TanStack Table replaced React Table in July 2022, offering a TypeScript rewrite for better performance and multi-framework support. The `react-table` package is deprecated, with React-specific features now in `@tanstack/react-table`.

:::

::: details Q. What is the difference between TanStack Table and Material React Table?

TanStack Table is a headless table library for building tables and data grids for any JavaScript framework, while Material React Table is a component library built on top of TanStack Table v8’s API. So basically, it is a combination of TanStack functionality and Material UI v6 design.

:::

::: details Q. What is the difference between TanStack Table and Material UI Table?

TanStack Table is a headless table library for building tables and data grids for any JavaScript framework, while Material UI Table is a component within the MUI React component library.

:::

::: details Q. How do I create a table in React?

You can use `@tanstack/react-table` for a powerful, customizable table or the native HTML `<table>` element for simple use cases. For styled tables, you can also look at libraries like Material React Table, Material UI Table, or [**React Bootstrap**](/blog.logrocket.com/using-bootstrap-react-tutorial-examples.md).

:::

---

## Conclusion

In this article, we learned how to build a table UI using React and TanStack Table. It’s not difficult to create your own table for basic use cases, but make sure you’re not reinventing the wheel wherever possible.

I hope you enjoyed learning about table UIs. Let me know about your experience with tables in the comments below.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "A complete guide to TanStack Table (formerly React Table)",
  "desc": "Discover how to use TanStack Table, formerly known as React Table, to build a table UI for a variety of use cases.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/tanstack-table-formerly-react-table.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
