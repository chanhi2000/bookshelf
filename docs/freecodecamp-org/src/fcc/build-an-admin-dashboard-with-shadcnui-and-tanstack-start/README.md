---
lang: en-US
title: "How to Build an Admin Dashboard with shadcn/ui and TanStack Start"
description: "Article(s) > How to Build an Admin Dashboard with shadcn/ui and TanStack Start"
icon: iconfont icon-shadcn
category:
  - Node.js
  - Shadcn
  - React.js
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - node-js
  - nodejs
  - shadcn
  - react
  - react-js
  - reactjs
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build an Admin Dashboard with shadcn/ui and TanStack Start"
    - property: og:description
      content: "How to Build an Admin Dashboard with shadcn/ui and TanStack Start"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-an-admin-dashboard-with-shadcnui-and-tanstack-start.html
prev: /programming/js-shadcn/articles/README.md
date: 2025-12-05
isOriginal: false
author:
  - name: Ajay Patel
    url : https://freecodecamp.org/news/author/ajaypatel9016/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1764780775287/b8cb826d-ac42-497c-8bb9-b9ffe797df83.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Shadcn > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-shadcn/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

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
  name="How to Build an Admin Dashboard with shadcn/ui and TanStack Start"
  desc="In this guide, we’ll build a feature-rich admin dashboard using shadcn/ui for beautiful, reusable components and TanStack Start for a powerful, type-safe full-stack framework. By the end, you’ll have: A fully functional /dashboard layout A statisti..."
  url="https://freecodecamp.org/news/build-an-admin-dashboard-with-shadcnui-and-tanstack-start"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1764780775287/b8cb826d-ac42-497c-8bb9-b9ffe797df83.png"/>

In this guide, we’ll build a feature-rich admin dashboard using shadcn/ui for beautiful, reusable components and TanStack Start for a powerful, type-safe full-stack framework.

By the end, you’ll have:

- A fully functional `/dashboard` layout
- A statistics-rich dashboard home page with charts and tables
- A Products page using TanStack Query and TanStack Table
- A Settings page with profile and notification controls

![TanStack Start dashboard](https://cdn.hashnode.com/res/hashnode/image/upload/v1764155564957/eda17d57-3f13-4526-be89-be55ec27453c.png)

::: note Prerequisites

Before we start the guide, let’s understand the basic requirements of the project:

- Node.js 18+ installed
- Basic knowledge of React and TypeScript
- Familiarity with TailwindCSS

:::

::: info What we will build

In this article, we’ll build a fully functional admin dashboard with three main sections:

1. **Dashboard overview**: A home page that displays various charts showing sales metrics, product insights widgets, and a transaction history table.
2. **Products:** A product page that demonstrates data fetching, server-side pagination, and advanced table features like column searching, sorting, and column filtering.
3. **Settings:** A user-friendly settings page with profile management and notification preferences.

The dashboard will include a responsive sidebar navigation, breadcrumb trails, a user profile dropdown, and a language selector.

:::

---

## Why TanStack Start?

[<VPIcon icon="iconfont icon-tanstack"/>TanStack Start](https://tanstack.com/start/latest) is a modern full-stack React framework built on top of TanStack Router. It aims to be a flexible, type-safe alternative to traditional meta-frameworks like Next.js.

Some key benefits of TanStack Start include:

- Type-safe routing and data loading
- Server-side rendering (SSR) out of the box
- Built on TanStack Router, with file-based routing
- Great DX with TypeScript and TanStack Query integration

We’ll pair it with shadcn/ui to quickly build a polished admin dashboard.

---

## Why shadcn/ui?

[<VPIcon icon="iconfont icon-shadcn"/>shadcn/ui](https://ui.shadcn.com/) is a collection of beautifully designed, accessible React components built on top of Radix UI and styled with Tailwind CSS.

Instead of installing a package, you can copy and paste the component's code directly into your project or use a CLI to generate it. This gives you full control over the code structure & styling. This approach makes Shadcn highly customizable for frameworks like TanStack Start, Next.js, Astro, and so on.

---

## Table of Contents

3. [How to Build the Admin Dashboard Using shadcn/ui and TanStack Start](#heading-how-to-build-the-admin-dashboard-using-shadcnui-and-tanstack-start)
4. [Live Demo & Source Code](#heading-live-demo-amp-source-code)
5. [Summary](#heading-summary)

---

## How to Build the Admin Dashboard Using shadcn/ui and TanStack Start

### 1. Create a new TanStack app

To get started, you’ll need to create a new TanStack Start app. You can do that with the following command:

```sh
pnpm create @tanstack/start@latest
```

During the CLI setup, when it asks about add-ons, make sure to select:

- Shadcn
- Table
- Query

These will give you the shadcn/ui setup and the TanStack Query + Table integrations we’ll use later.

### 2. Initial Cleanup

TanStack Start’s starter template comes with some demo routes and a header we don’t need.

Clean up the project as follows:

1. Remove the demo folder inside the <VPIcon icon="fas fa-folder-open"/>`src/routes` directory (or wherever your router directory lives).
2. Delete <VPIcon icon="fa-brands fa-react"/>`Header.tsx` from <VPIcon icon="fas fa-folder-open"/>`src/components`.
3. Remove the `Header` import and usage from <VPIcon icon="fas fa-folder-open"/>`src/routes/`<VPIcon icon="fa-brands fa-react"/>`__root.tsx`.
4. Clean up the <VPIcon icon="fas fa-folder-open"/>`src/routes/`<VPIcon icon="fa-brands fa-react"/>`index.tsx` file to something minimal (or leave a simple landing page).

At this point, you can make the initial commit to your repo.

### 3. Setting Up shadcn/studio Blocks

Before we set up, let’s make sure you’re clear on what the shadcn/studio and Shadcn registries are.

#### What is shadcn/studio?

[<VPIcon icon="iconfont icon-shadcn"/>shadcn/studio](https://shadcnstudio.com) is an open-source collection of copy-and-paste shadcn/ui components, blocks, and templates. It’s paired with a powerful shadcn theme generator to help you craft, customize, and ship faster.

#### What is Shadcn Registry?

A shadcn registry is a system for sharing and distributing reusable code assets such as UI components, hooks, and theme configurations across different projects. Running your own registry allows you to publish your custom components that others can then use. The registry uses a <VPIcon icon="iconfont icon-json"/>`registry.json` file to define and organize the components and their associated files.

If you want to know more about registries, you can refer to the [<VPIcon icon="iconfont icon-shadcn"/>official documentation here](https://ui.shadcn.com/docs/registry).

For quick building, we will use shadcn/studio’s free shadcn block – dashboard shell.

First, configure the registries in your <VPIcon icon="iconfont icon-json"/>`components.json`:

```json title="components.json"
{
  // ...existing config
  "registries": {
    "@shadcn-studio": "https://shadcnstudio.com/r/{name}.json",
    "@ss-components": "https://shadcnstudio.com/r/components/{name}.json",
    "@ss-blocks": "https://shadcnstudio.com/r/blocks/{name}.json",
    "@ss-themes": "https://shadcnstudio.com/r/themes/{name}.json"
  }
}
```

If you face any issues while setting up, you can refer to the [<VPIcon icon="iconfont icon-shadcn"/>docs](https://shadcnstudio.com/docs/getting-started/how-to-use-shadcn-cli).

#### Install the Dashboard Shell Block

To get started, visit [<VPIcon icon="iconfont icon-shadcn"/>Shadcn blocks](https://shadcnstudio.com/blocks) and navigate to the Dashboard and App section. Then select the [<VPIcon icon="iconfont icon-shadcn"/>Dashboard Shell 1](https://shadcnstudio.com/blocks/dashboard-and-application/dashboard-shell#dashboard-shell-1) block (it’s free to use).

On the top-right, you’ll see a command to install the block into your project:

![shadcn/stuidio dashboard shell](https://cdn.hashnode.com/res/hashnode/image/upload/v1764155098742/23d1bee2-e082-4b19-860a-8112fe6bf41c.png)

Copy that command, paste it into your terminal, and run it. This will install all the components needed for the dashboard layout (sidebar, header, dropdowns, and so on).

### 4. Routing Structure for the Dashboard

Next, we’ll set up the dashboard routes.

First, create a new layout route for `/dashboard` by adding a file at:

<VPIcon icon="fas fa-folder-open"/>`src/routes/`<VPIcon icon="fa-brands fa-react"/>`dashboard.tsx`

Then, inside a `dashboard` directory, create the three pages that will live under this layout:

- <VPIcon icon="fas fa-folder-open"/>`src/routes/dashboard/`<VPIcon icon="fa-brands fa-react"/>`index.tsx` – main dashboard overview
- <VPIcon icon="fas fa-folder-open"/>`src/routes/dashboard/`<VPIcon icon="fa-brands fa-react"/>`products.tsx` – products table page
- <VPIcon icon="fas fa-folder-open"/>`src/routes/dashboard/`<VPIcon icon="fa-brands fa-react"/>`settings.tsx` – settings page

Your `routes` folder should look like this:

```sh title="file structure"
src/routes/
├── __root.tsx
├── index.tsx
├── dashboard.tsx          # Layout for all /dashboard/* pages
└── dashboard/
    ├── index.tsx          # /dashboard
    ├── products.tsx       # /dashboard/products
    └── settings.tsx       # /dashboard/settings
```

### 5. Creating the `/dashboard` Layout

This will set up the layout for the dashboard. Create <VPIcon icon="fas fa-folder-open"/>`src/routes/`<VPIcon icon="fa-brands fa-react"/>`dashboard.tsx` and paste:

file: <VPIcon icon="fas fa-folder-open"/>`src/routes/`<VPIcon icon="fa-brands fa-react"/>`dashboard.tsx`

```tsx :collapsed-lines title="routes/dashboard.tsx
import LanguageDropdown from '@/components/shadcn-studio/blocks/dropdown-language'
import ProfileDropdown from '@/components/shadcn-studio/blocks/dropdown-profile'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger
} from '@/components/ui/sidebar'
import { createFileRoute, Link, Outlet, useLocation } from '@tanstack/react-router'
import {
    FacebookIcon,
    InstagramIcon,
    LanguagesIcon,
    LayoutDashboard,
    LinkedinIcon,
    LogIn,
    Package,
    Settings,
    TwitterIcon,
    User2
} from 'lucide-react'
import React from 'react'

export const Route = createFileRoute('/dashboard')({
    component: DashboardLayout
})

function DashboardLayout() {
    const location = useLocation()
    const pathSegments = location.pathname.split('/').filter(Boolean)

    return (
        <div className='flex min-h-dvh w-full'>
            <SidebarProvider>
                <Sidebar>
                    <SidebarContent>
                        <SidebarHeader>
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    <SidebarMenuButton size="lg" asChild>
                                        <Link to="/">
                                            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                                                <User2 className="size-4" />
                                            </div>
                                            <div className="grid flex-1 text-left text-sm leading-tight">
                                                <span className="truncate font-semibold">Your App</span>
                                                <span className="truncate text-xs">Dashboard</span>
                                            </div>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </SidebarHeader>

                        <SidebarGroup>
                            <SidebarGroupLabel>General</SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <Link to='/dashboard'>
                                                <LayoutDashboard />
                                                <span>Dashboard</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <Link to='/dashboard/products'>
                                                <Package />
                                                <span>Products</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <Link to='/dashboard/settings'>
                                                <Settings />
                                                <span>Settings</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </SidebarContent>
                </Sidebar>
                <div className='flex flex-1 flex-col'>
                    <header className='bg-card sticky top-0 z-50 border-b'>
                        <div className='mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-2 sm:px-6'>
                            <div className='flex items-center gap-4'>
                                <SidebarTrigger className='[&_svg]:h-5 [&_svg]:w-5' />
                                <Separator orientation='vertical' className='hidden h-4 sm:block' />
                                <Breadcrumb className='hidden sm:block'>
                                    <BreadcrumbList>
                                        <BreadcrumbItem>
                                            <BreadcrumbLink asChild>
                                                <Link to='/'>Home</Link>
                                            </BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator />
                                        {pathSegments.map((segment, index) => {
                                            const path = `/${pathSegments.slice(0, index + 1).join('/')}`
                                            const isLast = index === pathSegments.length - 1
                                            const title = segment.charAt(0).toUpperCase() + segment.slice(1)

                                            return (
                                                <React.Fragment key={path}>
                                                    <BreadcrumbItem>
                                                        {isLast ? (
                                                            <BreadcrumbPage>{title}</BreadcrumbPage>
                                                        ) : (
                                                            <BreadcrumbLink asChild>
                                                                <Link to={path as any}>{title}</Link>
                                                            </BreadcrumbLink>
                                                        )}
                                                    </BreadcrumbItem>
                                                    {!isLast && <BreadcrumbSeparator />}
                                                </React.Fragment>
                                            )
                                        })}
                                    </BreadcrumbList>
                                </Breadcrumb>
                            </div>
                            <div className='flex items-center gap-1.5'>
                                <LanguageDropdown
                                    trigger={
                                        <Button variant='ghost' size='icon'>
                                            <LanguagesIcon />
                                        </Button>
                                    }
                                />
                                <ProfileDropdown
                                    trigger={
                                        <Button variant='ghost' size='icon' className='h-10 w-10'>
                                            <Avatar className='h-10 w-10 rounded-md'>
                                                <AvatarImage src='https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png' />
                                            </Avatar>
                                        </Button>
                                    }
                                />
                            </div>
                        </div>
                    </header>
                    <main className='mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6'>
                        <Outlet />
                    </main>
                    <footer>
                        <div className='text-muted-foreground mx-auto flex w-full items-center justify-between gap-3 px-4 py-3 flex-col sm:flex-row sm:gap-6 sm:px-6'>
                            <p className='text-sm text-center sm:text-left'>
                                {`©${new Date().getFullYear()}`}{' '}
                                <a href='#' className='text-primary'>
                                    TanStack Start
                                </a>
                                , Made for better web design
                            </p>
                            <div className='flex items-center gap-5'>
                                <a href='#'>
                                    <FacebookIcon className='h-4 w-4' />
                                </a>
                                <a href='#'>
                                    <InstagramIcon className='h-4 w-4' />
                                </a>
                                <a href='#'>
                                    <LinkedinIcon className='h-4 w-4' />
                                </a>
                                <a href='#'>
                                    <TwitterIcon className='h-4 w-4' />
                                </a>
                            </div>
                        </div>
                    </footer>
                </div>
            </SidebarProvider>
        </div>
    )
}
```

You now have a full layout for all `/dashboard/*` routes.

Let's break down the key parts of our dashboard layout:

- **Sidebar structure:** The `<Sidebar>` component wraps our navigation menu. Inside, we use `<SidebarMenu>` and `<SidebarMenuItem>` to create navigation links. Each menu item uses TanStack Router's `<Link>` component for type-safe navigation. We also have a header set up in the `<SidebarProvider>`
- **Dynamic breadcrumbs:** The breadcrumb section uses `location.pathname` to split the current URL into segments, then maps over them to create breadcrumb links. The `isLast` check ensures the final breadcrumb renders as plain text rather than a link.
- **Header actions**: The header includes two dropdowns: `<LanguageDropdown>` for internationalization and `<ProfileDropdown>` for user account actions. These come from the `shadcn/studio` blocks we installed.
- **Outlet component:** The `<Outlet />` component is where child routes (like `/dashboard`, `/dashboard/products`) will render. This makes our layout reusable across all dashboard pages. The layout uses Tailwind's utility classes for spacing, colors, and responsive behavior, making it easy to customize for your use case.

For more details regarding the Sidebar component, you can [<VPIcon icon="iconfont icon-shadcn"/>refer to the official docs here](https://ui.shadcn.com/docs/components/sidebar).

You now have a full layout for all `/dashboard/*` routes.

### 6. Building the Dashboard Home Page

Create <VPIcon icon="fas fa-folder-open"/>`src/routes/dashboard/`<VPIcon icon="fa-brands fa-react"/>`index.tsx`:

```tsx :collapsed-lines title="routes/dashboard/index.tsx"
import { type Item } from '@/components/shadcn-studio/blocks/datatable-transaction'
import { createFileRoute } from '@tanstack/react-router'

import { Card } from '@/components/ui/card'

import SalesMetricsCard from '@/components/shadcn-studio/blocks/chart-sales-metrics'
import TransactionDatatable from '@/components/shadcn-studio/blocks/datatable-transaction'
import StatisticsCard from '@/components/shadcn-studio/blocks/statistics-card-01'
import ProductInsightsCard from '@/components/shadcn-studio/blocks/widget-product-insights'
import TotalEarningCard from '@/components/shadcn-studio/blocks/widget-total-earning'

import {
    CalendarX2Icon,
    TriangleAlertIcon,
    TruckIcon
} from 'lucide-react'

// Statistics card data
const StatisticsCardData = [
    {
        icon: <TruckIcon className='h-4 w-4' />,
        value: '42',
        title: 'Shipped Orders',
        changePercentage: '+18.2%'
    },
    {
        icon: <TriangleAlertIcon className='h-4 w-4' />,
        value: '8',
        title: 'Damaged Returns',
        changePercentage: '-8.7%'
    },
    {
        icon: <CalendarX2Icon className='h-4 w-4' />,
        value: '27',
        title: 'Missed Delivery Slots',
        changePercentage: '+4.3%'
    }
]

// Earning data for Total Earning card
const earningData = [
    {
        img: 'https://cdn.shadcnstudio.com/ss-assets/blocks/dashboard-application/widgets/zipcar.png',
        platform: 'Zipcar',
        technologies: 'Vuejs & HTML',
        earnings: '-$23,569.26',
        progressPercentage: 75
    },
    {
        img: 'https://cdn.shadcnstudio.com/ss-assets/blocks/dashboard-application/widgets/bitbank.png',
        platform: 'Bitbank',
        technologies: 'Figma & React',
        earnings: '-$12,650.31',
        progressPercentage: 25
    }
]

// Transaction table data
const transactionData: Item[] = [
    {
        id: '1',
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png',
        avatarFallback: 'JA',
        name: 'Jack Alfredo',
        amount: 315.0,
        status: 'paid',
        email: 'jack@shadcnstudio.com',
        paidBy: 'mastercard'
    },
    {
        id: '2',
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-2.png',
        avatarFallback: 'MG',
        name: 'Maria Gonzalez',
        amount: 253.4,
        status: 'pending',
        email: 'maria.g@shadcnstudio.com',
        paidBy: 'visa'
    },
    {
        id: '3',
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-3.png',
        avatarFallback: 'JD',
        name: 'John Doe',
        amount: 852.0,
        status: 'paid',
        email: 'john.doe@shadcnstudio.com',
        paidBy: 'mastercard'
    },
    {
        id: '4',
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-4.png',
        avatarFallback: 'EC',
        name: 'Emily Carter',
        amount: 889.0,
        status: 'pending',
        email: 'emily.carter@shadcnstudio.com',
        paidBy: 'visa'
    },
    {
        id: '5',
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-5.png',
        avatarFallback: 'DL',
        name: 'David Lee',
        amount: 723.16,
        status: 'paid',
        email: 'david.lee@shadcnstudio.com',
        paidBy: 'mastercard'
    },
    {
        id: '6',
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-6.png',
        avatarFallback: 'SP',
        name: 'Sophia Patel',
        amount: 612.0,
        status: 'failed',
        email: 'sophia.patel@shadcnstudio.com',
        paidBy: 'mastercard'
    },
    {
        id: '7',
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-7.png',
        avatarFallback: 'RW',
        name: 'Robert Wilson',
        amount: 445.25,
        status: 'paid',
        email: 'robert.wilson@shadcnstudio.com',
        paidBy: 'visa'
    },
    {
        id: '8',
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-8.png',
        avatarFallback: 'LM',
        name: 'Lisa Martinez',
        amount: 297.8,
        status: 'processing',
        email: 'lisa.martinez@shadcnstudio.com',
        paidBy: 'mastercard'
    },
    {
        id: '9',
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-9.png',
        avatarFallback: 'MT',
        name: 'Michael Thompson',
        amount: 756.9,
        status: 'paid',
        email: 'michael.thompson@shadcnstudio.com',
        paidBy: 'visa'
    },
    {
        id: '10',
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-10.png',
        avatarFallback: 'AJ',
        name: 'Amanda Johnson',
        amount: 189.5,
        status: 'pending',
        email: 'amanda.johnson@shadcnstudio.com',
        paidBy: 'mastercard'
    },
    {
        id: '11',
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-11.png',
        avatarFallback: 'KB',
        name: 'Kevin Brown',
        amount: 1024.75,
        status: 'paid',
        email: 'kevin.brown@shadcnstudio.com',
        paidBy: 'visa'
    },
    {
        id: '12',
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-12.png',
        avatarFallback: 'SD',
        name: 'Sarah Davis',
        amount: 367.2,
        status: 'failed',
        email: 'sarah.davis@shadcnstudio.com',
        paidBy: 'mastercard'
    },
    {
        id: '13',
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-13.png',
        avatarFallback: 'CG',
        name: 'Christopher Garcia',
        amount: 598.45,
        status: 'processing',
        email: 'christopher.garcia@shadcnstudio.com',
        paidBy: 'visa'
    },
    {
        id: '14',
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-14.png',
        avatarFallback: 'JR',
        name: 'Jennifer Rodriguez',
        amount: 821.3,
        status: 'paid',
        email: 'jennifer.rodriguez@shadcnstudio.com',
        paidBy: 'mastercard'
    },
    {
        id: '15',
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-15.png',
        avatarFallback: 'DM',
        name: 'Daniel Miller',
        amount: 156.75,
        status: 'pending',
        email: 'daniel.miller@shadcnstudio.com',
        paidBy: 'visa'
    },
    {
        id: '16',
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-16.png',
        avatarFallback: 'NW',
        name: 'Nicole White',
        amount: 934.1,
        status: 'paid',
        email: 'nicole.white@shadcnstudio.com',
        paidBy: 'mastercard'
    },
    {
        id: '17',
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-17.png',
        avatarFallback: 'AL',
        name: 'Anthony Lopez',
        amount: 412.85,
        status: 'failed',
        email: 'anthony.lopez@shadcnstudio.com',
        paidBy: 'visa'
    },
    {
        id: '18',
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-18.png',
        avatarFallback: 'MH',
        name: 'Michelle Harris',
        amount: 675.5,
        status: 'processing',
        email: 'michelle.harris@shadcnstudio.com',
        paidBy: 'mastercard'
    },
    {
        id: '19',
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-19.png',
        avatarFallback: 'JC',
        name: 'James Clark',
        amount: 289.95,
        status: 'paid',
        email: 'james.clark@shadcnstudio.com',
        paidBy: 'visa'
    },
    {
        id: '20',
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-20.png',
        avatarFallback: 'RL',
        name: 'Rachel Lewis',
        amount: 1156.25,
        status: 'pending',
        email: 'rachel.lewis@shadcnstudio.com',
        paidBy: 'mastercard'
    },
    {
        id: '21',
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-21.png',
        avatarFallback: 'TY',
        name: 'Thomas Young',
        amount: 543.6,
        status: 'paid',
        email: 'thomas.young@shadcnstudio.com',
        paidBy: 'visa'
    },
    {
        id: '22',
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-22.png',
        avatarFallback: 'SB',
        name: 'Stephanie Brown',
        amount: 789.3,
        status: 'processing',
        email: 'stephanie.brown@shadcnstudio.com',
        paidBy: 'mastercard'
    },
    {
        id: '23',
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-23.png',
        avatarFallback: 'BM',
        name: 'Brandon Moore',
        amount: 425.75,
        status: 'failed',
        email: 'brandon.moore@shadcnstudio.com',
        paidBy: 'visa'
    },
    {
        id: '24',
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-24.png',
        avatarFallback: 'KT',
        name: 'Kelly Taylor',
        amount: 1203.5,
        status: 'paid',
        email: 'kelly.taylor@shadcnstudio.com',
        paidBy: 'mastercard'
    },
    {
        id: '25',
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-25.png',
        avatarFallback: 'MA',
        name: 'Mark Anderson',
        amount: 356.2,
        status: 'pending',
        email: 'mark.anderson@shadcnstudio.com',
        paidBy: 'visa'
    }
]

export const Route = createFileRoute('/dashboard/')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <div className='grid grid-cols-2 gap-6 lg:grid-cols-3'>
            {/* Statistics Cards */}
            <div className='col-span-full grid gap-6 sm:grid-cols-3 md:max-lg:grid-cols-1'>
                {StatisticsCardData.map((card, index) => (
                    <StatisticsCard
                        key={index}
                        icon={card.icon}
                        title={card.title}
                        value={card.value}
                        changePercentage={card.changePercentage}
                    />
                ))}
            </div>

            <div className='grid gap-6 max-xl:col-span-full lg:max-xl:grid-cols-2'>
                {/* Product Insights Card */}
                <ProductInsightsCard className='justify-between gap-3 *:data-[slot=card-content]:space-y-5' />

                {/* Total Earning Card */}
                <TotalEarningCard
                    title='Total Earning'
                    earning={24650}
                    trend='up'
                    percentage={10}
                    comparisonText='Compare to last year ($84,325)'
                    earningData={earningData}
                    className='justify-between gap-5 sm:min-w-0 *:data-[slot=card-content]:space-y-7'
                />
            </div>

            <SalesMetricsCard className='col-span-full xl:col-span-2 *:data-[slot=card-content]:space-y-6' />
            <Card className='col-span-full w-full py-0'>
                <TransactionDatatable data={transactionData} />
            </Card>
        </div>
    )
}
```

Our dashboard homepage uses various shadcn-studio blocks like:

- **Statistics cards** display KPIs (Shipped Orders, Damaged Returns, and so on) with trend indicators. Each card receives props for the icon, value, title, and percentage change, making them reusable for any metric.
- **Chart components** like `<SalesMetricsCard>` use `recharts` under the hood to visualize data. The styling comes from shadcn/ui's card component and Tailwind utilities.
- **Transaction data table** demonstrates TanStack Table integration. We pass an array of transaction objects, and the `<TransactionDatatable>` component handles rendering, sorting, and pagination. Notice how we use TypeScript's `Item[]` type for full type safety.

If you now navigate to `/dashboard`, you should see an admin dashboard with KPI statistics, charts, a dashboard, and a transaction table. Here is what it would look like:

![tanstack start dashboard demo](https://cdn.hashnode.com/res/hashnode/image/upload/v1764747793227/ca1c0e10-e295-45c4-8e3c-15702583c887.jpeg)

We have built this beautiful dashboard quickly by using the shadcn/studio’s pre-built blocks.

### 7. Set up the Products Page

Before building our products table, we need to install **Zod**, a TypeScript-first schema validation library. We'll use it to validate the data structure of requests to our server function.

#### Why Zod?

TanStack Start's server functions use Zod to ensure type-safe data transfer between client and server. When we request to fetch products, Zod validates that the request includes the correct types for `page`, `pageSize`, `sortBy`, and `filters`. This catches errors at runtime and provides excellent TypeScript inference.

Now, let’s set up the products page with a products table. But before that, let’s install the zod package dependency. Here is the command for it:

```sh
pnpm add zod
```

#### Creating Mock Product Data

We will need to store our mock products’ data somewhere. For that, we will create a new file <VPIcon icon="fas fa-folder-open"/>`data/`<VPIcon icon="iconfont icon-typescript"/>`products.ts` and paste the code below. This will help us mock the product data for our products table.

```ts :collapsed-lines title="data/products.ts"
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export type Product = {
    id: string
    name: string
    category: string
    price: number
    stock: number
    status: 'active' | 'draft' | 'archived'
    image: string
}

// Define the type for the data parameter
type ProductQueryParams = {
    page: number;
    pageSize: number;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
    filters?: {
        name?: string;
        category?: string;
        status?: string;
    };
};

const products: Product[] = [
    {
        id: 'PROD-001',
        name: 'Wireless Noise Cancelling Headphones',
        category: 'Electronics',
        price: 299.99,
        stock: 45,
        status: 'active',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&q=80',
    },
    {
        id: 'PROD-002',
        name: 'Ergonomic Office Chair',
        category: 'Furniture',
        price: 199.50,
        stock: 12,
        status: 'active',
        image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=100&q=80',
    },
    {
        id: 'PROD-003',
        name: 'Mechanical Gaming Keyboard',
        category: 'Electronics',
        price: 129.99,
        stock: 0,
        status: 'archived',
        image: 'https://images.unsplash.com/photo-1587829741301-dc798b91add1?w=100&q=80',
    },
    {
        id: 'PROD-004',
        name: 'Smart Fitness Watch',
        category: 'Wearables',
        price: 149.00,
        stock: 89,
        status: 'active',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&q=80',
    },
    {
        id: 'PROD-005',
        name: 'Minimalist Desk Lamp',
        category: 'Lighting',
        price: 45.00,
        stock: 23,
        status: 'draft',
        image: 'https://images.unsplash.com/photo-1507473888900-52e1ad14723b?w=100&q=80',
    },
    {
        id: 'PROD-006',
        name: 'Portable Bluetooth Speaker',
        category: 'Electronics',
        price: 79.99,
        stock: 150,
        status: 'active',
        image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=100&q=80',
    },
    {
        id: 'PROD-007',
        name: 'Ceramic Coffee Mug Set',
        category: 'Kitchen',
        price: 24.99,
        stock: 200,
        status: 'active',
        image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=100&q=80',
    },
    {
        id: 'PROD-008',
        name: 'Leather Messenger Bag',
        category: 'Accessories',
        price: 129.50,
        stock: 15,
        status: 'active',
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100&q=80',
    },
    {
        id: 'PROD-009',
        name: 'Wireless Charging Pad',
        category: 'Electronics',
        price: 39.99,
        stock: 75,
        status: 'active',
        image: 'https://images.unsplash.com/photo-1586816879360-004f5b0c51e3?w=100&q=80',
    },
    {
        id: 'PROD-010',
        name: 'Succulent Plant Set',
        category: 'Home & Garden',
        price: 29.99,
        stock: 30,
        status: 'active',
        image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=100&q=80',
    },
    {
        id: 'PROD-011',
        name: 'Professional Chef Knife',
        category: 'Kitchen',
        price: 89.95,
        stock: 42,
        status: 'active',
        image: 'https://images.unsplash.com/photo-1593618998160-e34014e67546?w=100&q=80',
    },
    {
        id: 'PROD-012',
        name: 'Yoga Mat',
        category: 'Fitness',
        price: 35.00,
        stock: 100,
        status: 'active',
        image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=100&q=80',
    },
    {
        id: 'PROD-013',
        name: 'Smart Thermostat',
        category: 'Home Automation',
        price: 199.00,
        stock: 0,
        status: 'archived',
        image: 'https://images.unsplash.com/photo-1567789884554-0b844b597180?w=100&q=80',
    },
    {
        id: 'PROD-014',
        name: 'Vintage Film Camera',
        category: 'Photography',
        price: 450.00,
        stock: 3,
        status: 'draft',
        image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=100&q=80',
    },
    {
        id: 'PROD-015',
        name: 'Cotton T-Shirt Pack',
        category: 'Apparel',
        price: 49.99,
        stock: 150,
        status: 'active',
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&q=80',
    },
    {
        id: 'PROD-016',
        name: 'Electric Toothbrush',
        category: 'Personal Care',
        price: 69.99,
        stock: 55,
        status: 'active',
        image: 'https://images.unsplash.com/photo-1559656914-a30970c1affd?w=100&q=80',
    },
    {
        id: 'PROD-017',
        name: 'Gaming Mouse',
        category: 'Electronics',
        price: 59.99,
        stock: 88,
        status: 'active',
        image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=100&q=80',
    },
    {
        id: 'PROD-018',
        name: 'Essential Oil Diffuser',
        category: 'Home & Garden',
        price: 34.50,
        stock: 25,
        status: 'active',
        image: 'https://images.unsplash.com/photo-1602928321679-560bb453f190?w=100&q=80',
    },
    {
        id: 'PROD-019',
        name: 'Running Shoes',
        category: 'Footwear',
        price: 119.99,
        stock: 60,
        status: 'active',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&q=80',
    },
    {
        id: 'PROD-020',
        name: 'Digital Drawing Tablet',
        category: 'Electronics',
        price: 249.00,
        stock: 18,
        status: 'active',
        image: 'https://images.unsplash.com/photo-1561525140-c2a4cc68e4bd?w=100&q=80',
    },
    {
        id: 'PROD-021',
        name: 'Bamboo Cutting Board',
        category: 'Kitchen',
        price: 22.99,
        stock: 95,
        status: 'active',
        image: 'https://images.unsplash.com/photo-1594385208974-2e75f8d7bb48?w=100&q=80',
    },
    {
        id: 'PROD-022',
        name: 'Sunglasses',
        category: 'Accessories',
        price: 159.00,
        stock: 40,
        status: 'active',
        image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=100&q=80',
    },
    {
        id: 'PROD-023',
        name: 'Water Bottle',
        category: 'Fitness',
        price: 19.99,
        stock: 300,
        status: 'active',
        image: 'https://images.unsplash.com/photo-1602143407151-01114192003f?w=100&q=80',
    },
    {
        id: 'PROD-024',
        name: 'Throw Pillow Set',
        category: 'Home Decor',
        price: 45.99,
        stock: 28,
        status: 'active',
        image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e6?w=100&q=80',
    },
    {
        id: 'PROD-025',
        name: 'Wireless Earbuds',
        category: 'Electronics',
        price: 89.99,
        stock: 120,
        status: 'active',
        image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=100&q=80',
    }
]

export const getProducts = createServerFn({ method: "GET" })
    .inputValidator(
        z.object({
            page: z.number().default(0),
            pageSize: z.number().default(10),
            sortBy: z.string().optional(),
            sortOrder: z.enum(["asc", "desc"]).optional(),
            filters: z
                .object({
                    name: z.string().optional(),
                    category: z.string().optional(),
                    status: z.string().optional(),
                })
                .optional(),
        })
    )
    .handler(async ({ data }: { data: ProductQueryParams }) => {
        const { page, pageSize, sortBy, sortOrder, filters } = data;

        // Apply filters
        let filteredProducts = [...products];

        if (filters) {
            if (filters.name) {
                filteredProducts = filteredProducts.filter((product) =>
                    product.name.toLowerCase().includes(filters.name!.toLowerCase())
                );
            }

            if (filters.category) {
                filteredProducts = filteredProducts.filter(
                    (product) =>
                        product.category.toLowerCase() === filters.category!.toLowerCase()
                );
            }

            if (filters.status) {
                filteredProducts = filteredProducts.filter(
                    (product) => product.status === filters.status
                );
            }
        }

        // Apply sorting
        if (sortBy) {
            filteredProducts.sort((a, b) => {
                const aValue = a[sortBy as keyof Product];
                const bValue = b[sortBy as keyof Product];

                if (typeof aValue === "string" && typeof bValue === "string") {
                    return sortOrder === "desc"
                        ? bValue.localeCompare(aValue)
                        : aValue.localeCompare(bValue);
                }

                if (typeof aValue === "number" && typeof bValue === "number") {
                    return sortOrder === "desc" ? bValue - aValue : aValue - bValue;
                }

                return 0;
            });
        }

        // Calculate pagination
        const totalCount = filteredProducts.length;
        const totalPages = Math.ceil(totalCount / pageSize);
        const paginatedProducts = filteredProducts.slice(
            page * pageSize,
            (page + 1) * pageSize
        );

        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        return {
            products: paginatedProducts,
            pagination: {
                page,
                pageSize,
                totalCount,
                totalPages,
            },
        };
    });
```

Let’s understand the server function and break down what's happening in `getProducts`:

- **Input validation**: The `.inputValidator()` method uses a Zod schema to validate incoming requests. It ensures `page` and `pageSize` are numbers, `sortOrder` is either "asc" or "desc", and filters are optional strings.
- **Filtering products**: The function filters the products array based on the provided filters (name, category, status). This simulates what a real database query would do.
- **Sorting**: Products are sorted by the specified column (`sortBy`) in ascending or descending order (`sortOrder`).
- **Pagination**: We calculate which slice of products to return based on `page` and `pageSize`, along with metadata like `totalCount` and `totalPages`.

#### Create the Products table

Once the data is done, let’s create a table in `/dashboard/`<VPIcon icon="fa-brands fa-react"/>`products.tsx`. This table will use our mock product data and will provide multiple functions in the table, like search, sort, and filter. This table demonstrates the powerful combination of TanStack Query for data management and TanStack Table for rendering.

Paste the code below in the <VPIcon icon="fa-brands fa-react"/>`products.tsx` file:

```tsx :collapsed-lines title="dashboard/products.tsx"
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    VisibilityState,
} from '@tanstack/react-table'
import {
    ArrowUpDown,
    ChevronDown,
    Filter,
    Loader2,
    MoreHorizontal,
    Plus,
    Search
} from 'lucide-react'
import { useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { getProducts, type Product } from '@/data/products'

export const Route = createFileRoute('/dashboard/products')({
    component: ProductsPage,
})

export const columns: ColumnDef<Product>[] = [
    {
        accessorKey: 'name',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Product Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="flex items-center gap-3">
                <img
                    src={row.original.image}
                    alt={row.getValue('name')}
                    className="h-10 w-10 rounded-md object-cover"
                />
                <div className="flex flex-col">
                    <span className="font-medium">{row.getValue('name')}</span>
                    <span className="text-xs text-muted-foreground">{row.original.id}</span>
                </div>
            </div>
        ),
    },
    {
        accessorKey: 'category',
        header: 'Category',
        cell: ({ row }) => <div>{row.getValue('category')}</div>,
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
            const status = row.getValue('status') as string
            return (
                <Badge variant={status === 'active' ? 'default' : status === 'draft' ? 'secondary' : 'outline'}>
                    {status}
                </Badge>
            )
        },
    },
    {
        accessorKey: 'price',
        header: () => <div className="text-right">Price</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue('price'))
            const formatted = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
            }).format(amount)

            return <div className="text-right font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: 'stock',
        header: () => <div className="text-right">Stock</div>,
        cell: ({ row }) => {
            const stock = parseFloat(row.getValue('stock'))
            return <div className={`text-right ${stock === 0 ? 'text-red-500 font-medium' : ''}`}>{stock}</div>
        },
    },
    {
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => {
            const product = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(product.id)}
                        >
                            Copy Product ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Edit Product</DropdownMenuItem>
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]

function ProductsPage() {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    })

    const { data, isLoading } = useQuery({
        queryKey: ['products', pagination, sorting, columnFilters],
        queryFn: () => getProducts({
            data: {
                page: pagination.pageIndex,
                pageSize: pagination.pageSize,
                sortBy: sorting[0]?.id,
                sortOrder: sorting[0]?.desc ? 'desc' : 'asc',
                filters: {
                    name: (columnFilters.find((f) => f.id === 'name')?.value as string) || undefined,
                    status: (columnFilters.find((f) => f.id === 'status')?.value as string) || undefined,
                }
            }
        }),
    })

    const products = data?.products || []
    const totalPages = data?.pagination.totalPages || 0
    const totalCount = data?.pagination.totalCount || 0

    const table = useReactTable({
        data: products,
        columns,
        pageCount: totalPages,
        manualPagination: true,
        manualSorting: true,
        manualFiltering: true,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        onPaginationChange: setPagination,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
            pagination,
        },
    })

    return (
        <div className="w-full space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight">Products</h2>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                        <Filter className="mr-2 h-4 w-4" />
                        Filter
                    </Button>
                    <Button size="sm">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Product
                    </Button>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Product Management</CardTitle>
                    <CardDescription>
                        Manage your product catalog, track inventory, and update prices.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center py-4 gap-2">
                        <div className="relative flex-1">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Filter products..."
                                value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                                onChange={(event) =>
                                    table.getColumn("name")?.setFilterValue(event.target.value)
                                }
                                className="pl-8 max-w-sm"
                            />
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="ml-auto">
                                    Columns <ChevronDown className="ml-2 h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                {table
                                    .getAllColumns()
                                    .filter((column) => column.getCanHide())
                                    .map((column) => {
                                        return (
                                            <DropdownMenuCheckboxItem
                                                key={column.id}
                                                className="capitalize"
                                                checked={column.getIsVisible()}
                                                onCheckedChange={(value) =>
                                                    column.toggleVisibility(!!value)
                                                }
                                            >
                                                {column.id}
                                            </DropdownMenuCheckboxItem>
                                        )
                                    })}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => {
                                            return (
                                                <TableHead key={header.id}>
                                                    {header.isPlaceholder
                                                        ? null
                                                        : flexRender(
                                                            header.column.columnDef.header,
                                                            header.getContext()
                                                        )}
                                                </TableHead>
                                            )
                                        })}
                                    </TableRow>
                                ))}
                            </TableHeader>
                            <TableBody>
                                {isLoading ? (
                                    <TableRow>
                                        <TableCell colSpan={columns.length} className="h-24 text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <Loader2 className="h-6 w-6 animate-spin" />
                                                <span>Loading products...</span>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : table.getRowModel().rows?.length ? (
                                    table.getRowModel().rows.map((row) => (
                                        <TableRow
                                            key={row.id}
                                            data-state={row.getIsSelected() && "selected"}
                                        >
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell key={cell.id}>
                                                    {flexRender(
                                                        cell.column.columnDef.cell,
                                                        cell.getContext()
                                                    )}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell
                                            colSpan={columns.length}
                                            className="h-24 text-center"
                                        >
                                            No results.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                    <div className="flex items-center justify-end space-x-2 py-4">
                        <div className="flex-1 text-sm text-muted-foreground">
                            {table.getFilteredSelectedRowModel().rows.length} of{" "}
                            {totalCount} row(s) selected.
                        </div>
                        <div className="space-x-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => table.previousPage()}
                                disabled={!table.getCanPreviousPage()}
                            >
                                Previous
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => table.nextPage()}
                                disabled={!table.getCanNextPage()}
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
```

Now you can see the fully functional products page by navigating the `/products` where you can search and sort the products.

![tanstack start dashboard demo](https://cdn.hashnode.com/res/hashnode/image/upload/v1764748681745/6f73dc04-ac9a-4f75-a1ab-88ed1fc5c6f3.jpeg)

#### How do TanStack Query and TanStack Table Work in the products table?

Our products page uses TanStack Query for data fetching and TanStack Table for rendering.

`useQuery` is a fundamental hook in TanStack Query for managing server state in web applications. It simplifies data fetching, caching, and synchronization.

The below code snippet below shows how we have used useQuery in our product table:

```tsx
import { useQuery } from '@tanstack/react-query';

const { data, isLoading } = useQuery({
    queryKey: ['products', pagination, sorting, columnFilters],
    queryFn: () => getProducts({...})
}
```

The `useQuery` hook manages data fetching in our application. For more details, you can [<VPIcon icon="iconfont icon-tanstack"/>refer to the official docs here](https://tanstack.com/query/latest).

**useReactTable:**

```ts
import { useReactTable } from '@tanstack/react-table'

const table = useReactTable({
    data: products,
    columns,
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
})
```

**TanStack Table** manages the UI state and rendering. By setting `manualPagination`, `manualSorting`, and `manualFiltering` to `true`, we tell the table that server-side logic handles these operations.

When users sort, filter, or paginate, the table updates its states, and React Query detects the state change in the `queryKey`. It refetches data from the server, and the table re-renders with fresh data.

This architecture is production-ready and scales to thousands of rows. You just need to replace the mock API endpoint with your real API endpoint.

### 8. Settings Page

Finally, let’s add a simple Settings page with a profile section and some basic notification preferences.

Below is the code for the Settings Page. You can paste it into `/dashboard/settings.tsx`:

```tsx :collapsed-lines title="dashboard/settings.tsx"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/settings')({
  component: SettingsPage,
})

function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Settings</h3>
        <p className="text-sm text-muted-foreground">
          Manage your account settings and set e-mail preferences.
        </p>
      </div>
      <Separator />

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>
              This is how others will see you on the site.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src="https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <Button variant="outline">Change Avatar</Button>
            </div>
            <div className="space-y-1">
              <label htmlFor="username" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Username</label>
              <Input id="username" defaultValue="jdoe" />
            </div>
            <div className="space-y-1">
              <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Email</label>
              <Input id="email" defaultValue="john.doe@example.com" />
            </div>
            <div className="space-y-1">
              <label htmlFor="bio" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Bio</label>
              <Input id="bio" placeholder="Tell us a little bit about yourself" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save Changes</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>
              Configure how you receive notifications.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <label className="text-base font-medium">Communication emails</label>
                <p className="text-sm text-muted-foreground">
                  Receive emails about your account activity.
                </p>
              </div>
              {/* Toggle would go here, using a simple checkbox for now */}
              <Checkbox defaultChecked />
            </div>
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <label className="text-base font-medium">Marketing emails</label>
                <p className="text-sm text-muted-foreground">
                  Receive emails about new products, features, and more.
                </p>
              </div>
              <Checkbox />
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline">Update Preferences</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
```

In this page, we have created two sections:

1. Profile Section
2. Notification Section

These two sections have been built using shadcn/ui components like Card, Footer, Checkbox, Avatar, Input, and so on.

At this point, we have:

- A dashboard layout with sidebar, header, breadcrumbs, and footer
- A Dashboard page with charts, insights, and a transaction table
- A Products page powered by:
  - TanStack Start server functions
  - TanStack Query
  - TanStack Table
- A clean Settings page using shadcn/ui components

::: info Live Demo & Source Code

You can check out the full source code on GitHub here:

<SiteInfo
  name="themeselection/tanstack-dashboard-demo: A admin dashboard build with tanstack-start and shadcn/ui"
  desc="A admin dashboard build with tanstack-start and shadcn/ui - themeselection/tanstack-dashboard-demo"
  url="https://github.com/themeselection/tanstack-dashboard-demo/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/57d89efe9c2b04ec576e431c02355dc02c2f891f4feb9a8d1c7c5c6e29ed9513/themeselection/tanstack-dashboard-demo"/>

```component VPCard
{
  "title": "TanStack Start Starter",
  "desc": "",
  "link": "https://tanstack-dashboard-demo.vercel.app/dashboard/",
  "logo": "https://tanstack-dashboard-demo.vercel.app/favicon.ico",
  "background": "rgba(244,245,255,0.2)"
}
```

Feel free to clone, experiment, and extend it to fit your own application needs!

:::

---

## Summary

Congratulations! You've built a complete, production-ready admin dashboard using TanStack Start, TanStack Table, TanStack Query, Shadcn/ui, and shadcn/studio.

Throughout this tutorial, you’ve gained some hands-on experience in:

- **Full-stack application development with type safety**: We’ve developed a full-stack application with TanStack Start's server functions with Zod validation to create type-safe APIs.
- **Advanced data fetching**: We’ve implemented TanStack Query for data fetching with automatic caching and background updates.
- **Complex table interactions**: We’ve built feature-rich data tables with TanStack Table, including server-side pagination, sorting, and filtering.
- **Building UI quicker**: We’ve leveraged shadcn/ui and shadcn/studio blocks to quickly build polished interfaces.
- **Responsive layouts**: And we’ve created adaptive designs that work seamlessly from mobile to desktop

### What’s Next?

Now that you have a solid foundation, consider implementing some or all of the below features if you want to work more on this:

- **Authentication**: Add user authentication with Clerk, NextAuth, or Auth.js
- **Real database**: Replace mock data with Prisma + PostgreSQL or Drizzle + SQLite
- **Form validation**: Integrate React Hook Form with Zod for robust form handling
- **Theming**: Implement dark mode and custom color schemes using shadcn/ui's theming system
- **API routes for CRUD**: Add CRUD operations for products (create, update, delete)
- **Internationalization:** Make the dashboard compatible with multiple languages by integrating internationalization.

We shipped a scalable and production-ready dashboard much faster than starting from scratch. Hope you enjoyed the process – and thanks for reading!

### Resources:

- [TanStack Start Documentation](https://tanstack.com/start)
- [TanStack Table Docs](https://tanstack.com/table)
- [TanStack Query Docs](https://tanstack.com/query)
- [Shadcn UI Components](https://shadcnstudio.com/components)

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build an Admin Dashboard with shadcn/ui and TanStack Start",
  "desc": "In this guide, we’ll build a feature-rich admin dashboard using shadcn/ui for beautiful, reusable components and TanStack Start for a powerful, type-safe full-stack framework. By the end, you’ll have: A fully functional /dashboard layout A statisti...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-an-admin-dashboard-with-shadcnui-and-tanstack-start.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
