---
lang: en-US
title: "How to Avoid Overusing useCallback and useMemo in React"
description: "Article(s) > How to Avoid Overusing useCallback and useMemo in React"
icon: fa-brands fa-react
category:
  - Node.js
  - React.js
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
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Avoid Overusing useCallback and useMemo in React"
    - property: og:description
      content: "How to Avoid Overusing useCallback and useMemo in React"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-avoid-overusing-usecallback-and-usememo-in-react.html
prev: /programming/js-react/articles/README.md
date: 2026-06-18
isOriginal: false
author:
  - name: Olaleye Blessing
    url: https://freecodecamp.org/news/author/Jongbo/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/88ac6adf-ef3d-4f28-9dac-22ea12ed5005.png
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
  name="How to Avoid Overusing useCallback and useMemo in React"
  desc="If you've spent enough time in the React ecosystem, you'll have likely seen codebases where nearly every function is wrapped with useCallback and the computed value is wrapped with useMemo. The reason"
  url="https://freecodecamp.org/news/how-to-avoid-overusing-usecallback-and-usememo-in-react"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/88ac6adf-ef3d-4f28-9dac-22ea12ed5005.png"/>

If you've spent enough time in the React ecosystem, you'll have likely seen codebases where nearly every function is wrapped with `useCallback` and the computed value is wrapped with `useMemo`.

The reason behind this is “memoization equals better performance”. But most of the time, this doesn’t really translate to better performance, and it often produces code that's harder to debug.

In this article, you'll learn how to structure your code to avoid overusing `useCallback` and `useMemo`.

::: note Prerequisites

You should be comfortable with React hooks and components before reading this tutorial. Familiarity with `useState`, `useEffect`, and `useRef` is assumed. You can read the following freeCodeCamp articles if you need a refresher on `useCallback` and `useMemo`:

- [**How to Use the useMemo and useCallback Hooks**](/freecodecamp.org/caching-in-react.md#)
- [**Difference between the useMemo and useCallback Hooks**](/freecodecamp.org/difference-between-usememo-and-usecallback-hooks.md#)

:::

---

## What `useCallback` and `useMemo` Do

Before moving to how to avoid overusing them, we'll look briefly at what these hooks do.

### `useMemo`

`useMemo` caches the return value of a function between re-renders. Imagine you have a sorted list of items in a component:

```tsx
interface Item {
  name: string;
  createdAt: string;
}

function App() {
  // == some other states ==
  // == some other states ==
  const [items, setItems] = useState<Item[]>([]);

  const sortedItems = [...items].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  );

  return (
    <>
      <ul>
        {sortedItems.map((i) => (
          <li key={i.name}>{i.name}</li>
        ))}
      </ul>
    </>
  );
}
```

React recomputes `sortedItems` every time the `App` component re-renders. This means `sortedItems` will be recalculated anytime there are any state changes in the `App` component.

React developers often use `useMemo` to cache values like this.

Wrapping it with `useMemo` ensures that `sortedItems` is only calculated when `items` actually changes:

```tsx
const sortedItems = useMemo(() => {
  return [...items].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  );
}, [items]);
```

### `useCallback`

`useCallback` caches the function itself. The function below will be recreated every time some states in the component change:

```tsx
function App() {
  // == some other states ==
  // == some other states ==
  const [userId, setUserId] = useState(0);

  const verifyUser = async () => {
    // update a state to show loading
    console.log("__ Do something with user id __", userId);
    // update a state to remove loading
  };

  return (
    <>
      <button onClick={verifyUser}>Verify</button>
    </>
  );
}
```

Wrapping it with `useCallback` keeps the same function reference as long as `userId` hasn’t changed:

```ts
function App() {
  // == some other states ==
  // == some other states ==
  const [userId, setUserId] = useState(0);

  const verifyUser = useCallback(async () => {
    // update a state to show loading
    console.log("__ Do something with user id __", userId);
    // update a state to remove loading
  }, [userId]);

  return (
    <>
      <button onClick={verifyUser}>Verify</button>
    </>
  );
}
```

---

## Problem With Memoization

Nothing is free in life, and memoization is no exception. Every time you use `useCallback` or `useMemo`:

- Your app allocates memory to store the cached value and dependency array.
- Your component runs a comparison to check if the dependencies have changed

This memoization isn't useful most of the time. Creating a JavaScript function is cheap. Sorting a list of 50 items is cheap. Wrapping these in a memoization hook adds more cost than it prevents. (But keep in mind that if profiling shows sorting is a bottleneck, `useMemo` is still reasonable there.)

The better approach is to structure your components so that re-renders are less frequent.

---

## The Problematic Page

To see this in action, you'll go through a search page where a parent component manages all the state and logic for the entire page.

To code along, you can clone a simple Next.js project I set up for this:

```sh
git clone https://github.com/Olaleye-Blessing/freecodecamp-usecallback-usememo.git

# navigate to the folder
cd freecodecamp-usecallback-usememo

# install the packages
pnpm install

# start development
pnpm dev
```

The search page consists of the following:

- [A Header (<VPIcon icon="iconfont icon-github"/>`Olaleye-Blessing/freecodecamp-avoid-overusing-memoization`)](https://github.com/Olaleye-Blessing/freecodecamp-avoid-overusing-memoization/blob/main/app/_components/header.tsx) that shows the title of the page.
- [A Search field (<VPIcon icon="iconfont icon-github"/>`Olaleye-Blessing/freecodecamp-avoid-overusing-memoization`)](https://github.com/Olaleye-Blessing/freecodecamp-avoid-overusing-memoization/blob/main/app/_components/search.tsx) that allows user to search for the name of a product
- [A Filter button (<VPIcon icon="iconfont icon-github"/>`Olaleye-Blessing/freecodecamp-avoid-overusing-memoization`)](https://github.com/Olaleye-Blessing/freecodecamp-avoid-overusing-memoization/blob/0d3f5eb7fadc88e8608d0965daf01148c2a35f83/app/_components/header.tsx#L49) that opens a drawer for more filtering.
- [A Drawer (<VPIcon icon="iconfont icon-github"/>`Olaleye-Blessing/freecodecamp-avoid-overusing-memoization`)](https://github.com/Olaleye-Blessing/freecodecamp-avoid-overusing-memoization/blob/main/app/_components/filter-drawer.tsx) for filtering by country, color, mode, and/or price range.
- [A Product table (<VPIcon icon="iconfont icon-github"/>`Olaleye-Blessing/freecodecamp-avoid-overusing-memoization`)](https://github.com/Olaleye-Blessing/freecodecamp-avoid-overusing-memoization/blob/main/app/_components/products-table.tsx) that shows the search result

![A demo of the search page. The user searches for "alpine", clears it, then applies filters in the drawer.](https://cdn.hashnode.com/uploads/covers/629122ced97f80b5091d8058/423d6239-2603-4b32-8fe9-080f28d136ad.gif)

All the child components mentioned above maintain no states and functions. They all derive their states and functions from the `SearchPage` component.

We won’t be going through the child components. They only render the UIs. They have no logic whatsoever.

The `SearchPage` component looks like this:

```tsx :collapsed-lines
"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  fetchColors,
  fetchCountries,
  fetchModes,
  fetchProducts,
} from "./utils";
import { Header } from "./_components/header";
import { FilterDrawer } from "./_components/filter-drawer";
import { ProductTable } from "./_components/products-table";
import { FilterChips } from "./_components/filter-chips";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FilterState, LocalSortField, SortDir, SortField } from "./interfaces";

const DEFAULTS: FilterState = {
  query: "",
  country: "",
  color: "",
  mode: "",
  minPrice: "",
  maxPrice: "",
  sortField: "name",
  sortDir: "asc",
};

export default function SearchPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const [localSort, setLocalSort] = useState<{
    field: LocalSortField;
    dir: "asc" | "desc";
  } | null>(null);

  const searchRef = useRef<HTMLInputElement>(null);
  const searchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const filters: FilterState = {
    query: searchParams.get("q") ?? DEFAULTS.query,
    country: searchParams.get("country") ?? DEFAULTS.country,
    color: searchParams.get("color") ?? DEFAULTS.color,
    mode: searchParams.get("mode") ?? DEFAULTS.mode,
    minPrice: searchParams.get("minPrice") ?? DEFAULTS.minPrice,
    maxPrice: searchParams.get("maxPrice") ?? DEFAULTS.maxPrice,
    sortField:
      (searchParams.get("sortField") as SortField) ?? DEFAULTS.sortField,
    sortDir: (searchParams.get("sortDir") as SortDir) ?? DEFAULTS.sortDir,
  };

  const apiFilters = {
    query: filters.query,
    country: filters.country || undefined,
    color: filters.color || undefined,
    mode: filters.mode || undefined,
    minPrice: filters.minPrice ? Number(filters.minPrice) : undefined,
    maxPrice: filters.maxPrice ? Number(filters.maxPrice) : undefined,
    sortField: filters.sortField,
    sortDir: filters.sortDir,
  };

  const productsQuery = useQuery({
    queryKey: ["products", apiFilters],
    queryFn: () => fetchProducts(apiFilters),
  });

  const countriesQuery = useQuery({
    queryKey: ["countries"],
    queryFn: fetchCountries,
    staleTime: Infinity,
  });

  const colorsQuery = useQuery({
    queryKey: ["colors"],
    queryFn: fetchColors,
    staleTime: Infinity,
  });

  const modesQuery = useQuery({
    queryKey: ["modes"],
    queryFn: fetchModes,
    staleTime: Infinity,
  });

  // Updates the filter in the drawer
  const setFilters = (partial: Partial<FilterState>) => {
    const next = new URLSearchParams(searchParams.toString());
    const merged = { ...filters, ...partial };

    const keyMap: Record<keyof FilterState, string> = {
      query: "q",
      country: "country",
      color: "color",
      mode: "mode",
      minPrice: "minPrice",
      maxPrice: "maxPrice",
      sortField: "sortField",
      sortDir: "sortDir",
    };

    (Object.keys(merged) as (keyof FilterState)[]).forEach((k) => {
      const paramKey = keyMap[k];
      const val = merged[k];
      const def = DEFAULTS[k];
      if (val && val !== def) {
        next.set(paramKey, val);
      } else {
        next.delete(paramKey);
      }
    });

    router.push(`\({pathname}?\){next.toString()}`, { scroll: false });
  };

  const resetFilters = () => {
    router.push(pathname, { scroll: false });
  };

  const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;

    if (searchTimerRef.current) clearTimeout(searchTimerRef.current);

    searchTimerRef.current = setTimeout(() => {
      setFilters({ query: val });
    }, 400);
  };

  const handleClearQuery = () => {
    if (searchRef.current) {
      searchRef.current.value = "";
    }

    setFilters({ query: "" });
  };

  const handleColumnClick = (field: LocalSortField) => {
    setLocalSort((prev) => {
      if (!prev || prev.field !== field) return { field, dir: "asc" };

      if (prev.dir === "asc") return { field, dir: "desc" };

      return null;
    });
  };

  const hasPriceFilter = filters.minPrice || filters.maxPrice;
  const priceLabel = [
    filters.minPrice ? `$${filters.minPrice}` : null,
    filters.maxPrice ? `$${filters.maxPrice}` : null,
  ]
    .filter(Boolean)
    .join(" - ");

  const activeFilterCount = [
    filters.country,
    filters.color,
    filters.mode,
    filters.minPrice,
    filters.maxPrice,
  ].filter(Boolean).length;

  let sortedProducts = [...(productsQuery.data || [])];
  if (localSort) {
    sortedProducts = [...sortedProducts].sort((a, b) => {
      const aVal = a[localSort.field];
      const bVal = b[localSort.field];
      const cmp =
        typeof aVal === "string"
          ? aVal.localeCompare(bVal as string)
          : (aVal as number) - (bVal as number);
      return localSort.dir === "desc" ? -cmp : cmp;
    });
  }

  useEffect(() => {
    return () => {
      if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
    };
  }, []);

  return (
    <div className="min-h-screen bg-stone-50">
      <Header
        query={filters.query}
        handleClearQuery={handleClearQuery}
        onToggleFilters={() => setDrawerOpen((v) => !v)}
        activeFilterCount={activeFilterCount}
        searchRef={searchRef}
        handleChange={handleQueryChange}
      />

      <FilterDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        filters={filters}
        onChange={setFilters}
        onReset={resetFilters}
        countries={countriesQuery.data ?? []}
        colors={colorsQuery.data ?? []}
        modes={modesQuery.data ?? []}
        activeFilterCount={activeFilterCount}
      />

      <main className="max-w-6xl mx-auto px-4 py-6">
        {activeFilterCount > 0 && (
          <FilterChips
            filters={filters}
            setFilters={setFilters}
            hasPriceFilter={hasPriceFilter}
            priceLabel={priceLabel}
            resetFilters={resetFilters}
          />
        )}

        <ProductTable
          products={sortedProducts}
          isLoading={productsQuery.isLoading}
          handleColumnClick={handleColumnClick}
          localSort={localSort}
        />
      </main>
    </div>
  );
}
```

The `SearchPage` component keeps track of all the logic needed to render the page:

- It fetches the `products`, `countries`, `colors`, and `modes`. It passes the `countries`, `colors` and `modes` to the drawer component
- It keeps track of the drawer state.
- It defines the functions needed to sort the product locally, and so on.

The problem here is that a change in any of the states will lead to recreating all the functions in `SearchPage` component. For example, when `isLoading` in the `useQuery` of products (`productsQuery`) changes from `false` to `true`, all our functions and derived values will be recreated.

The first thing that might come to mind is caching functions and derived values using `useCallback` and `useMemo`. While this will work, it will add unnecessary performance overhead to this page.

A better solution is to move state and logic closer to where they are actually used.

### How to Move State Down

The idea is this: if only one component needs a piece of state or a function, that component should own it. When a child component manages its own state, changes to that state don't re-render the parent. This means all the sibling components’ states and functions stay stable without any memoization.

That said, don’t move logic so far down that shared behavior becomes harder to test or coordinate. The goal isn't to hide every piece of logic inside the deepest possible component. The goal is to place state and logic at the lowest level where they still make sense for the feature.

#### Move ProductTable Logic to Its Component

Looking at how products are fetched and sorted, you'll notice that the only component that uses this data is `ProductsTable`. This means we can move the fetching and sorting logic to the `ProductsTable`.

The `ProductsComponent` currently receives its states and logic as props:

```ts
"use client";

interface ProductTableProps {
  products: Product[];
  isLoading: boolean;
  handleColumnClick: (field: LocalSortField) => void;
  localSort: { field: LocalSortField; dir: SortDir } | null;
}

export function ProductTable({
  products,
  isLoading,
  handleColumnClick,
  localSort,
}: ProductTableProps) {
  // renders the UI using the props
}
```

Now, `ProductTable` will fetch and manage its logic:

```ts
interface ProductTableProps {
  filters: FilterState;
}

export function ProductTable({ filters }: ProductTableProps) {
  const [localSort, setLocalSort] = useState<{
    field: LocalSortField;
    dir: "asc" | "desc";
  } | null>(null);

  const apiFilters = {
    query: filters.query,
    country: filters.country || undefined,
    color: filters.color || undefined,
    mode: filters.mode || undefined,
    minPrice: filters.minPrice ? Number(filters.minPrice) : undefined,
    maxPrice: filters.maxPrice ? Number(filters.maxPrice) : undefined,
    sortField: filters.sortField,
    sortDir: filters.sortDir,
  };

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products", apiFilters],
    queryFn: () => fetchProducts(apiFilters),
  });

  const handleColumnClick = (field: LocalSortField) => {
    setLocalSort((prev) => {
      if (!prev || prev.field !== field) return { field, dir: "asc" };
      if (prev.dir === "asc") return { field, dir: "desc" };

      return null;
    });
  };

  let sortedProducts = products;
  if (localSort) {
    sortedProducts = [...products].sort((a, b) => {
      const aVal = a[localSort.field];
      const bVal = b[localSort.field];
      const cmp =
        typeof aVal === "string"
          ? aVal.localeCompare(bVal as string)
          : (aVal as number) - (bVal as number);
      return localSort.dir === "desc" ? -cmp : cmp;
    });
  }

  return <>{/*== renders the UI using the props ==*/}</>;
}
```

Now when `isLoading` changes, the `SearchPage` component won’t re-render. This means the derived values and other functions in the `SearchPage` component won’t be recreated. The only value and function that will be recreated here are the `sortedProducts` and `handleColumnClick`.

The `SearchPage` component becomes this:

```tsx :collapsed-lines
"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchColors, fetchCountries, fetchModes } from "./utils";
import { Header } from "./_components/header";
import { FilterDrawer } from "./_components/filter-drawer";
import { ProductTable } from "./_components/products-table";
import { FilterChips } from "./_components/filter-chips";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FilterState, SortDir, SortField } from "./interfaces";

const DEFAULTS: FilterState = {
  query: "",
  country: "",
  color: "",
  mode: "",
  minPrice: "",
  maxPrice: "",
  sortField: "name",
  sortDir: "asc",
};

export default function SearchPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const searchRef = useRef<HTMLInputElement>(null);
  const searchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const filters: FilterState = {
    query: searchParams.get("q") ?? DEFAULTS.query,
    country: searchParams.get("country") ?? DEFAULTS.country,
    color: searchParams.get("color") ?? DEFAULTS.color,
    mode: searchParams.get("mode") ?? DEFAULTS.mode,
    minPrice: searchParams.get("minPrice") ?? DEFAULTS.minPrice,
    maxPrice: searchParams.get("maxPrice") ?? DEFAULTS.maxPrice,
    sortField:
      (searchParams.get("sortField") as SortField) ?? DEFAULTS.sortField,
    sortDir: (searchParams.get("sortDir") as SortDir) ?? DEFAULTS.sortDir,
  };

  const countriesQuery = useQuery({
    queryKey: ["countries"],
    queryFn: fetchCountries,
    staleTime: Infinity,
  });

  const colorsQuery = useQuery({
    queryKey: ["colors"],
    queryFn: fetchColors,
    staleTime: Infinity,
  });

  const modesQuery = useQuery({
    queryKey: ["modes"],
    queryFn: fetchModes,
    staleTime: Infinity,
  });

  // Updates the filter in the drawer
  const setFilters = (partial: Partial<FilterState>) => {
    const next = new URLSearchParams(searchParams.toString());
    const merged = { ...filters, ...partial };

    const keyMap: Record<keyof FilterState, string> = {
      query: "q",
      country: "country",
      color: "color",
      mode: "mode",
      minPrice: "minPrice",
      maxPrice: "maxPrice",
      sortField: "sortField",
      sortDir: "sortDir",
    };

    (Object.keys(merged) as (keyof FilterState)[]).forEach((k) => {
      const paramKey = keyMap[k];
      const val = merged[k];
      const def = DEFAULTS[k];
      if (val && val !== def) {
        next.set(paramKey, val);
      } else {
        next.delete(paramKey);
      }
    });

    router.push(`\({pathname}?\){next.toString()}`, { scroll: false });
  };

  const resetFilters = () => {
    router.push(pathname, { scroll: false });
  };

  const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;

    if (searchTimerRef.current) clearTimeout(searchTimerRef.current);

    searchTimerRef.current = setTimeout(() => {
      setFilters({ query: val });
    }, 400);
  };

  const handleClearQuery = () => {
    if (searchRef.current) {
      searchRef.current.value = "";
    }

    setFilters({ query: "" });
  };

  const hasPriceFilter = filters.minPrice || filters.maxPrice;
  const priceLabel = [
    filters.minPrice ? `$${filters.minPrice}` : null,
    filters.maxPrice ? `$${filters.maxPrice}` : null,
  ]
    .filter(Boolean)
    .join(" - ");

  const activeFilterCount = [
    filters.country,
    filters.color,
    filters.mode,
    filters.minPrice,
    filters.maxPrice,
  ].filter(Boolean).length;

  useEffect(() => {
    return () => {
      if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
    };
  }, []);

  return (
    <div className="min-h-screen bg-stone-50">
      <Header
        query={filters.query}
        onChange={setFilters}
        handleClearQuery={handleClearQuery}
        onToggleFilters={() => setDrawerOpen((v) => !v)}
        activeFilterCount={activeFilterCount}
        searchRef={searchRef}
        handleChange={handleQueryChange}
      />

      <FilterDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        filters={filters}
        onChange={setFilters}
        onReset={resetFilters}
        countries={countriesQuery.data ?? []}
        colors={colorsQuery.data ?? []}
        modes={modesQuery.data ?? []}
        activeFilterCount={activeFilterCount}
      />

      <main className="max-w-6xl mx-auto px-4 py-6">
        {activeFilterCount > 0 && (
          <FilterChips
            filters={filters}
            setFilters={setFilters}
            hasPriceFilter={hasPriceFilter}
            priceLabel={priceLabel}
            resetFilters={resetFilters}
          />
        )}

        <ProductTable filters={filters} />
      </main>
    </div>
  );
}
```

The `SearchPage` component no longer maintains fetching and sorting products data.

#### Move Filtering Logic To Its Component

We have different states, data, and functions to make this work:

- `drawerOpen` and `setDrawerOpen` to control the filter drawer.
- `countries`, `colors` and `modes` data to allow user to select different options.
- `activeFilterCount` to show the number of active filters.

There are two components for the filtering currently. First is a button inside the `Header` component that looks like this:

```tsx
<button
  onClick={onToggleFilters}
  className="relative ml-auto flex items-center gap-2 px-3 py-2 text-sm text-black font-medium border border-stone-300 rounded-lg hover:bg-stone-100 transition"
>
  <SlidersHorizontal className="w-4 h-4" />
  <span className="hidden sm:inline">Filters</span>
  {activeFilterCount > 0 && (
    <span
      className="absolute -top-1.5 -right-1.5 flex items-center justify-center 
                             w-5 h-5 rounded-full bg-stone-900 text-white text-xs font-bold"
    >
      {activeFilterCount}
    </span>
  )}
</button>;
```

Second is the `FilterDrawer` component that looks like this:

```ts :collapsed-lines
"use client";

import { useEffect, useRef } from "react";
import { X, RotateCcw } from "lucide-react";
import { FilterState } from "../interfaces";
import { SortSection } from "./filter/sort-section";
import { NarrowResultsSection } from "./filter/narrow-result-section";

interface FilterDrawerProps {
  open: boolean;
  onClose: () => void;
  filters: FilterState;
  onChange: (partial: Partial<FilterState>) => void;
  onReset: () => void;
  countries: string[];
  colors: string[];
  modes: string[];
  activeFilterCount: number;
}

export function FilterDrawer({
  open,
  onClose,
  filters,
  onChange,
  onReset,
  countries,
  colors,
  modes,
  activeFilterCount,
}: FilterDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  // Prevent body scroll while open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/30 transition-opacity duration-300 ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Drawer panel */}
      <aside
        ref={drawerRef}
        className={`fixed top-0 right-0 z-50 h-full w-80 bg-white shadow-2xl 
                    flex flex-col transition-transform duration-300 ease-in-out
                    ${open ? "translate-x-0" : "translate-x-full"}`}
        aria-hidden={!open}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-100">
          <h2 className="font-semibold text-stone-900">
            Filters &amp; Sort
            {activeFilterCount > 0 && (
              <span className="ml-2 text-xs bg-stone-900 text-white px-1.5 py-0.5 rounded-full">
                {activeFilterCount}
              </span>
            )}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md hover:bg-stone-100 transition"
            aria-label="Close filters"
          >
            <X className="w-5 h-5 text-stone-600" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-6">
          <SortSection
            sortField={filters.sortField}
            sortDir={filters.sortDir}
            onChange={onChange}
          />

          <hr className="border-stone-100" />

          <NarrowResultsSection
            filters={filters}
            onChange={onChange}
            countries={countries}
            colors={colors}
            modes={modes}
          />
        </div>

        {/* Footer */}
        {activeFilterCount > 0 && (
          <div className="px-5 py-4 border-t border-stone-100">
            <button
              onClick={() => {
                onReset();
                onClose();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 
                         border border-stone-300 rounded-lg text-sm font-medium 
                         hover:bg-stone-100 transition text-stone-700"
            >
              <RotateCcw className="w-4 h-4" />
              Clear all filters
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
```

You can combine the 2 components into a single `Filter` component that owns all of this logic:

```tsx :collapsed-lines
import { RotateCcw, SlidersHorizontal, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SortSection } from "./filter/sort-section";
import { NarrowResultsSection } from "./filter/narrow-result-section";
import { FilterState } from "../interfaces";
import { usePathname, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchColors, fetchCountries, fetchModes } from "../utils";

interface FilterProps {
  filters: FilterState;
  onChange: (partial: Partial<FilterState>) => void;
}

const Filter = ({ filters, onChange }: FilterProps) => {
  const { data: countries = [] } = useQuery({
    queryKey: ["countries"],
    queryFn: fetchCountries,
    staleTime: Infinity,
  });

  const { data: colors = [] } = useQuery({
    queryKey: ["colors"],
    queryFn: fetchColors,
    staleTime: Infinity,
  });

  const { data: modes = [] } = useQuery({
    queryKey: ["modes"],
    queryFn: fetchModes,
    staleTime: Infinity,
  });

  const router = useRouter();
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const drawerRef = useRef<HTMLDivElement>(null);

  const onClose = () => setDrawerOpen(false);
  const openDrawer = () => setDrawerOpen(true);
  const resetFilters = () => {
    onClose();
    router.push(pathname, { scroll: false });
  };

  const activeFilterCount = [
    filters.country,
    filters.color,
    filters.mode,
    filters.minPrice,
    filters.maxPrice,
  ].filter(Boolean).length;

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  // Prevent body scroll while open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  return (
    <>
      <button
        onClick={openDrawer}
        className="relative ml-auto flex items-center gap-2 px-3 py-2 text-sm text-black font-medium border border-stone-300 rounded-lg hover:bg-stone-100 transition"
      >
        <SlidersHorizontal className="w-4 h-4" />
        <span className="hidden sm:inline">Filters</span>
        {activeFilterCount > 0 && (
          <span
            className="absolute -top-1.5 -right-1.5 flex items-center justify-center 
                             w-5 h-5 rounded-full bg-stone-900 text-white text-xs font-bold"
          >
            {activeFilterCount}
          </span>
        )}
      </button>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/30 transition-opacity duration-300 ${
          drawerOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Drawer panel */}
      <aside
        ref={drawerRef}
        className={`fixed top-0 right-0 z-50 h-full w-80 bg-white shadow-2xl 
                    flex flex-col transition-transform duration-300 ease-in-out
                    ${drawerOpen ? "translate-x-0" : "translate-x-full"}`}
        aria-hidden={!drawerOpen}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-100">
          <h2 className="font-semibold text-stone-900">
            Filters &amp; Sort
            {activeFilterCount > 0 && (
              <span className="ml-2 text-xs bg-stone-900 text-white px-1.5 py-0.5 rounded-full">
                {activeFilterCount}
              </span>
            )}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md hover:bg-stone-100 transition"
            aria-label="Close filters"
          >
            <X className="w-5 h-5 text-stone-600" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-6">
          <SortSection
            sortField={filters.sortField}
            sortDir={filters.sortDir}
            onChange={onChange}
          />

          <hr className="border-stone-100" />

          <NarrowResultsSection
            filters={filters}
            onChange={onChange}
            countries={countries}
            colors={colors}
            modes={modes}
          />
        </div>

        {/* Footer */}
        {activeFilterCount > 0 && (
          <div className="px-5 py-4 border-t border-stone-100">
            <button
              onClick={resetFilters}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 
                         border border-stone-300 rounded-lg text-sm font-medium 
                         hover:bg-stone-100 transition text-stone-700"
            >
              <RotateCcw className="w-4 h-4" />
              Clear all filters
            </button>
          </div>
        )}
      </aside>
    </>
  );
};

export default Filter;
```

You can take this even further. Notice that `NarrowResultsSection` is the only component that uses the fetched `countries`, `colors`, and `modes`. And inside it, each `SelectField` uses a piece of this data.

```tsx :collapsed-lines
import { FilterState } from "../../interfaces";
import { PriceRangeField } from "./price-range";
import { SelectField } from "./select-field";

interface NarrowResultsSectionProps {
  filters: FilterState;
  onChange: (partial: Partial<FilterState>) => void;
  countries: string[];
  colors: string[];
  modes: string[];
}

export function NarrowResultsSection({
  filters,
  onChange,
  countries,
  colors,
  modes,
}: NarrowResultsSectionProps) {
  return (
    <section className="flex flex-col gap-4">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-500">
        Narrow Results
      </h3>

      <SelectField
        label="Country"
        value={filters.country}
        options={countries}
        onChange={(v) => onChange({ country: v })}
        placeholder="All countries"
      />

      <SelectField
        label="Color"
        value={filters.color}
        options={colors}
        onChange={(v) => onChange({ color: v })}
        placeholder="All colors"
      />

      <SelectField
        label="Mode"
        value={filters.mode}
        options={modes}
        onChange={(v) => onChange({ mode: v })}
        placeholder="All modes"
      />

      <PriceRangeField
        minPrice={filters.minPrice}
        maxPrice={filters.maxPrice}
        onChange={onChange}
      />
    </section>
  );
}
```

Instead of fetching everything at the top and passing it down, you can give each `SelectField` its own query.

The `SelectField` looked like this:

```ts
interface SelectFieldProps {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
  placeholder: string;
}

export function SelectField({
  label,
  value,
  options,
  onChange,
  placeholder,
}: SelectFieldProps) {
  return <>{/*=== Renders UI ===*/}</>;
}
```

Now, it looks like this:

```ts
import { useQuery } from "@tanstack/react-query";

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  queryFn(): Promise<string[]>;
  queryKey: string;
}

export function SelectField({
  label,
  value,
  onChange,
  placeholder,
  queryFn,
  queryKey,
}: SelectFieldProps) {
  const { data: options = [] } = useQuery({
    queryKey: [queryKey],
    queryFn: queryFn,
    staleTime: Infinity,
  });

  return <>{/*=== Renders UI ===*/}</>;
}
```

Now each dropdown manages its own data. A state change inside one `SelectField` doesn't affect its siblings or its parent.

#### Move Search Logic Into Its Component

The `Search` component is the only component using the debouncing logic (`searchTimerRef`, `handleQueryChange`, `handleClearQuery`). You'll move logic inside the component:

```ts
"use client";

import { Search as SearchIcon, X } from "lucide-react";
import { ChangeEvent, useEffect, useRef } from "react";
import { FilterState } from "../interfaces";

interface SearchProps {
  query: string;
  onChange: (partial: Partial<FilterState>) => void;
}

const Search = ({ query, onChange }: SearchProps) => {
  const searchRef = useRef<HTMLInputElement>(null);
  const searchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleClearQuery = () => {
    if (searchRef.current) {
      searchRef.current.value = "";
    }

    onChange({ query: "" });
  };

  const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;

    if (searchTimerRef.current) clearTimeout(searchTimerRef.current);

    searchTimerRef.current = setTimeout(() => {
      onChange({ query: val });
    }, 400);
  };

  useEffect(() => {
    return () => {
      if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
    };
  }, []);

  return <div>{/*=== Renders UI ===*/}</div>;
};

export default Search;
```

#### Move Filter Chips into Its Component

The `FilterChips` component renders chips for active filters. The `hasPriceFilter` and `priceLabel` values that feed it can live inside the component instead of `SearchPage`:

```ts
interface FilterChipsProps {
  filters: FilterState;
  setFilters: (partial: Partial<FilterState>) => void;
  resetFilters: () => void;
}

export function FilterChips({
  filters,
  setFilters,
  resetFilters,
}: FilterChipsProps) {
  const priceLabel = [
    filters.minPrice ? `$${filters.minPrice}` : null,
    filters.maxPrice ? `$${filters.maxPrice}` : null,
  ]
    .filter(Boolean)
    .join(" - ");

  const hasPriceFilter = filters.minPrice || filters.maxPrice;

  return <>{/*=== Renders UI ===*/}</>;
}
```

#### The Final SearchPage

After moving all state and logic to the components that need it, the `SearchPage` component looks like this:

```tsx :collapsed-lines
"use client";

import { Header } from "./_components/header";
import { ProductTable } from "./_components/products-table";
import { FilterChips } from "./_components/filter-chips";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FilterState, SortDir, SortField } from "./interfaces";

const DEFAULTS: FilterState = {
  query: "",
  country: "",
  color: "",
  mode: "",
  minPrice: "",
  maxPrice: "",
  sortField: "name",
  sortDir: "asc",
};

export default function SearchPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filters: FilterState = {
    query: searchParams.get("q") ?? DEFAULTS.query,
    country: searchParams.get("country") ?? DEFAULTS.country,
    color: searchParams.get("color") ?? DEFAULTS.color,
    mode: searchParams.get("mode") ?? DEFAULTS.mode,
    minPrice: searchParams.get("minPrice") ?? DEFAULTS.minPrice,
    maxPrice: searchParams.get("maxPrice") ?? DEFAULTS.maxPrice,
    sortField:
      (searchParams.get("sortField") as SortField) ?? DEFAULTS.sortField,
    sortDir: (searchParams.get("sortDir") as SortDir) ?? DEFAULTS.sortDir,
  };

  const setFilters = (partial: Partial<FilterState>) => {
    const next = new URLSearchParams(searchParams.toString());
    const merged = { ...filters, ...partial };

    const keyMap: Record<keyof FilterState, string> = {
      query: "q",
      country: "country",
      color: "color",
      mode: "mode",
      minPrice: "minPrice",
      maxPrice: "maxPrice",
      sortField: "sortField",
      sortDir: "sortDir",
    };

    (Object.keys(merged) as (keyof FilterState)[]).forEach((k) => {
      const paramKey = keyMap[k];
      const val = merged[k];
      const def = DEFAULTS[k];
      if (val && val !== def) {
        next.set(paramKey, val);
      } else {
        next.delete(paramKey);
      }
    });

    router.push(`\({pathname}?\){next.toString()}`, { scroll: false });
  };

  const resetFilters = () => {
    router.push(pathname, { scroll: false });
  };

  const activeFilterCount = [
    filters.country,
    filters.color,
    filters.mode,
    filters.minPrice,
    filters.maxPrice,
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-stone-50">
      <Header filters={filters} onChange={setFilters} />

      <main className="max-w-6xl mx-auto px-4 py-6">
        {activeFilterCount > 0 && (
          <FilterChips
            filters={filters}
            setFilters={setFilters}
            resetFilters={resetFilters}
          />
        )}

        <ProductTable filters={filters} />
      </main>
    </div>
  );
}
```

Notice that `setFilters`, `resetFilters` and `activeFilterCount` are still in the `SearchPage` component. This is intentional. These values depend on the URL. Any component that reads from the URL will re-render whenever the URL changes. It doesn’t matter where the values are calculated.

### Fix Your Code Before Reaching For These Hooks

You might be tempted to reach for `useCallback` or `useMemo` when you have infinite re-rendering. Unstable object reference often leads to infinite re-renders, especially when a child component has a `useEffect` that depends on the object. It’s always better to understand why the loop is happening and fix the root cause.

Look at this example:

```tsx :collapsed-lines
"use client";

import { useEffect, useState } from "react";
import { fetchUsers, Filter, User } from "./utils";

interface UserListProps {
  filters: Filter;
  onLoad(data: User[]): void;
  users: User[];
}

function UserList({ filters, onLoad, users }: UserListProps) {
  console.count("__ USER LIST __");

  useEffect(() => {
    fetchUsers(filters).then((data) => {
      onLoad(data);
    });
  }, [filters, onLoad]);

  return (
    <ul className="h-screen flex items-center justify-center flex-col">
      {users.map((u) => (
        <li key={u.id}>{u.name}</li>
      ))}
    </ul>
  );
}

const UserPage = () => {
  const [userData, setUserData] = useState<User[]>([]);

  const filters = {
    role: "admin",
    active: true,
  };

  return <UserList filters={filters} onLoad={setUserData} users={userData} />;
};

export default UserPage;
```

The `UserList` component fetches users when it mounts. It uses `filters` and `onLoad` as dependencies.

The problem here is that the `filters` object in the `UserPage` component is recreated on every render. Even though the value looks the same, it’s a new reference each time there is a re-render. `UserList` sees it as a new value every time. This triggers its `useEffect` because it’s a dependency.

![The browser showing infinite log of "USER LIST".](https://cdn.hashnode.com/uploads/covers/629122ced97f80b5091d8058/c201dff7-3e6b-4648-8caf-9323057df3df.gif)

Wrapping `filters` in `useMemo` will stop the loop, but it misses the real issue. `useMemo` isn't meant to stop infinite re-rendering. There are some better solutions to fix this:

The first option is to use primitives in the dependency array instead of objects. Object compares by reference. This is why the `useEffect` sees different references whenever it reads the `filter` props. Primitives compare by value.

```ts
function UserList({ filters, onLoad, users }: UserListProps) {
  console.count("__ USER LIST __");

  useEffect(() => {
    fetchUsers(filters).then((data) => {
      onLoad(data);
    });
  }, [filters.active, filters.role]); // primitives compare by value, not reference

  return (
    <ul>
      {users.map((u) => (
        <li key={u.id}>{u.name}</li>
      ))}
    </ul>
  );
}
```

The second option is to define the object outside the component so it has a stable reference.

```ts
const filters = {
  role: "admin",
  active: true,
};

const UserPage = () => {
  const [userData, setUserData] = useState<User[]>([]);

  return <UserList filters={filters} onLoad={setUserData} users={userData} />;
};
```

The third solution is to store the object in a state if it's dynamic.

```ts
const UserPage = () => {
  const [userData, setUserData] = useState<User[]>([]);
  const [filters, setFilters] = useState({
    role: "admin",
    active: true,
  });

  return <UserList filters={filters} onLoad={setUserData} users={userData} />;
};
```

---

## When to Use `useCallback` and `useMemo`

The goal of this article is not to tell you never to use these hooks. There are real situations where these hooks shine.

### Measure Before You Optimize

Before going for any optimization, be it `useCallback`, `useMemo,` or restructuring your component, you should first confirm that there is a performance problem. Optimizing code that doesn’t need it isn’t beneficial to anybody.

React DevTools has a Profiler tab that lets you record a session and see exactly which components are re-rendering, how often, and how long each render takes. You should read [**How to Use React Developer Tools – Explained With Examples**](/freecodecamp.org/how-to-use-react-devtools.md). If you are a video person, you can watch how Ben shows [<VPIcon icon="fa-brands fa-youtube"/>how to use the React Profiler to find and fix performance problems](https://youtu.be/00RoZflFE34).

<VidStack src="youtube/00RoZflFE34" />

### Stabilize References for `React.memo` Children

`React.memo` prevents a component from re-rendering if its props haven't changed. But if you pass a function or object as a prop, the child will still re-render on every parent render because functions and objects are recreated with new references each time.

This is the right time to use `useCallback` or `useMemo`:

```tsx
const Child = React.memo(({ onClick }: { onClick: () => void }) => {
  console.log("Child rendered");
  return <button onClick={onClick}>Click me</button>;
});

function Parent() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    console.log("clicked");
  }, []);

  return (
    <>
      <button onClick={() => setCount((c) => c + 1)}>Increment: {count}</button>
      <Child onClick={handleClick} />
    </>
  );
}
```

Without `useCallback`, `Child` re-renders every time `count` changes, even though `handleClick` has nothing to do with `count`. With `useCallback`, the function reference stays stable.

It's often best to use both `useCallback` and `React.memo` together. But `React.memo` can be useful by itself if props are primitives or otherwise stable. And `useCallback` can be useful outside `React.memo`, such as when passing stable callbacks into effects, custom hooks, or third-party components.

---

## Conclusion

`useCallback` and `useMemo` are useful memoization tools, but they're not a free performance upgrade. Every call adds memory overhead and a dependency comparison on each render.

Always structure your components so that optimization is rarely needed. Move state and logic as close as possible to the components that use them. Use `useCallback` and `useMemo` along with `React.memo` after you confirm that renders are actually a problem.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Avoid Overusing useCallback and useMemo in React",
  "desc": "If you've spent enough time in the React ecosystem, you'll have likely seen codebases where nearly every function is wrapped with useCallback and the computed value is wrapped with useMemo. The reason",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-avoid-overusing-usecallback-and-usememo-in-react.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
