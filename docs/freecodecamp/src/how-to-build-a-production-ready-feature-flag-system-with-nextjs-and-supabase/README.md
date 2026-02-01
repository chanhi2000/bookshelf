---
lang: en-US
title: "How to Build a Production-Ready Feature Flag System with Next.js and Supabase"
description: "Article(s) > How to Build a Production-Ready Feature Flag System with Next.js and Supabase"
icon: iconfont icon-nextjs
category:
  - Node.js
  - Next.js
  - Supabase
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - next
  - nextjs
  - next-js
  - supabase
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build a Production-Ready Feature Flag System with Next.js and Supabase"
    - property: og:description
      content: "How to Build a Production-Ready Feature Flag System with Next.js and Supabase"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-production-ready-feature-flag-system-with-nextjs-and-supabase.html
prev: /programming/js-next/articles/README.md
date: 2026-02-06
isOriginal: false
author:
  - name: David Aniebo
    url : https://freecodecamp.org/news/author/davidaniebo/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1770312675718/c462d3b5-5369-45e0-ad47-c91b441fe96f.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Next.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-next/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Supabase > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-supabase/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build a Production-Ready Feature Flag System with Next.js and Supabase"
  desc="Feature flags are powerful tools that let you control which features are visible to users without deploying new code. They enable gradual rollouts, A/B testing, and instant feature toggles, which are all essential for modern software development. In ..."
  url="https://freecodecamp.org/news/how-to-build-a-production-ready-feature-flag-system-with-nextjs-and-supabase"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1770312675718/c462d3b5-5369-45e0-ad47-c91b441fe96f.png"/>

Feature flags are powerful tools that let you control which features are visible to users without deploying new code. They enable gradual rollouts, A/B testing, and instant feature toggles, which are all essential for modern software development.

In this article, we’ll build a real, production-ready feature flag system, not just a simple boolean toggle.

Specifically, we’ll implement:

- A global on/off flag to enable or disable features instantly
- User-specific flags to grant access to individual users (for beta testing or internal users)
- Percentage-based rollouts to gradually expose features to a subset of users
- A React-powered admin dashboard to manage flags without redeploying
- Client-side and server-side enforcement, so features are gated consistently everywhere

By the end, we’ll finish by wiring a real Todo feature behind a feature flag, showing how entire pages and components can be safely toggled on and off in production.

::: note Prerequisites

Before you begin, make sure you have:

- Node.js 18 or higher installed
- A basic understanding of React and Next.js
- Familiarity with TypeScript
- A Supabase account (free tier works perfectly)
- A code editor like VS Code
- Basic understanding of React Query (TanStack Query) for server state management

:::

---

## What Are Feature Flags?

Feature flags (also called feature toggles) are configuration mechanisms that let you enable or disable features in your application without changing code. Think of them as light switches for your features.

Here are some common use cases:

- **Gradual rollouts**: Release a feature to 10% of users first, then gradually increase
- **User-specific access**: Enable features for beta testers or VIP users
- **Emergency kill switches**: Instantly disable a feature if something goes wrong
- **A/B testing**: Test different versions of features with different user groups

---

## Project Setup

Start by creating a new Next.js project with TypeScript:

```sh
npx create-next-app@latest supabase-feature-flag --typescript --tailwind --app
cd supabase-feature-flag
```

Next, install the required dependencies:

```sh
npm i @supabase/ssr @supabase/supabase-js @tanstack/react-query
```

The `@supabase/ssr` package provides server-side rendering support for Supabase, which is essential for Next.js App Router. `@tanstack/react-query` provides powerful server state management with automatic caching, invalidation, and real-time updates, which is perfect for feature flags that need to reflect changes immediately without page refreshes.

---

## Table of Contents

- [Database Schema Design](#heading-database-schema-design)
- [Setting Up Supabase](#heading-setting-up-supabase)
- [Building the Core Feature Flag Logic](#heading-building-the-core-feature-flag-logic)
- [Setting Up React Query](#heading-setting-up-react-query)
- [Creating the React Hook](#heading-creating-the-react-hook)
- [Building the Admin Dashboard](#heading-building-the-admin-dashboard)
- [Implementing a Real-World Example](#heading-implementing-a-real-world-example)
- [Server-Side Usage](#heading-server-side-usage)
- [Why React Query?](#heading-why-react-query)
- [Conclusion](#heading-conclusion)

---

## Database Schema Design

Before writing any code, you need to design your database schema. A feature flag needs several properties:

![Database-schema-design](https://cdn.hashnode.com/res/hashnode/image/upload/v1769945095969/86610ba1-e0c8-4c0c-a500-8cdc061555ba.webp)

- A unique key to identify the flag
- A name and description for human readability
- An enabled/disabled state
- Support for user-specific access
- Support for percentage-based rollouts

Here's the SQL migration that creates the `feature_flags` table:

```sql
-- Create feature_flags table
CREATE TABLE IF NOT EXISTS feature_flags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  enabled BOOLEAN DEFAULT false NOT NULL,
  enabled_for_users JSONB DEFAULT '[]'::jsonb,
  enabled_for_percent INTEGER DEFAULT 0 CHECK (enabled_for_percent >= 0 AND enabled_for_percent <= 100),
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);
```

::: info Let's break down each field:

- `id`: A unique identifier for each flag
- `key`: A unique string identifier (like "new-dashboard" or "beta-feature")
- `name`: A human-readable name
- `description`: Optional description of what the flag controls
- `enabled`: Global on/off switch
- `enabled_for_users`: JSON array of user IDs who have access
- `enabled_for_percent`: Percentage of users who should see the feature (0-100)
- `metadata`: Flexible JSON field for additional configuration
- `created_at` and `updated_at`: Timestamps for tracking

:::

The migration also includes indexes for performance:

```sql
-- Create indexes for fast lookups
CREATE INDEX IF NOT EXISTS idx_feature_flags_key ON feature_flags(key);
CREATE INDEX IF NOT EXISTS idx_feature_flags_enabled ON feature_flags(enabled);
```

Indexes on `key` and `enabled` ensure fast queries when checking flag status.

---

## Setting Up Supabase

### Step 1: Create a Supabase Project

To start, go to [<VPIcon icon="iconfont icon-supabase"/>supabase.com](http://supabase.com) and sign up or log in. Then click on "New Project". Fill in your project details and wait for it to initialize.

### Step 2: Run the Migration

In your Supabase dashboard, navigate to the SQL Editor:

![Supabase-row-level-security(RLS)-policies](https://cdn.hashnode.com/res/hashnode/image/upload/v1769945875099/72595159-3301-422e-a648-49602c4088ec.png)

Then click "New Query". Copy and paste the complete migration SQL (including the indexes and RLS policies shown below) and click "Run".

Here's the complete migration with Row Level Security (RLS) policies:

```sql :collapsed-lines
-- Create feature_flags table
CREATE TABLE IF NOT EXISTS feature_flags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  enabled BOOLEAN DEFAULT false NOT NULL,
  enabled_for_users JSONB DEFAULT '[]'::jsonb,
  enabled_for_percent INTEGER DEFAULT 0 CHECK (enabled_for_percent >= 0 AND enabled_for_percent <= 100),
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_feature_flags_key ON feature_flags(key);
CREATE INDEX IF NOT EXISTS idx_feature_flags_enabled ON feature_flags(enabled);

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_feature_flags_updated_at
  BEFORE UPDATE ON feature_flags
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE feature_flags ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public read access
CREATE POLICY "Allow public read access"
  ON feature_flags
  FOR SELECT
  USING (true);

-- Policy: Allow public write access (for admin operations)
CREATE POLICY "Allow public write access"
  ON feature_flags
  FOR ALL
  USING (true)
  WITH CHECK (true);
```

The RLS policies allow:

- Public read access: Anyone can check if a feature flag is enabled
- Public write access: Allows the admin dashboard to create/update flags (in production, you'd restrict this further)

### Step 3: Get Your API Credentials

Go to Settings and then API in your Supabase project. Copy your Project URL and Publishable Key. THen create a <VPIcon icon="iconfont icon-dotenv"/>`.env.local` file in your project root:

```sh title=".env.local"
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your_publishable_key
```

---

## Building the Core Feature Flag Logic

Now let's build the core logic for checking feature flags. You'll create separate utilities for client-side and server-side usage.

### TypeScript Types

First, define the types you'll use throughout the application:

```ts title="types/feature-flag.ts"
export interface FeatureFlag {
  id: string;
  key: string;
  name: string;
  description: string | null;
  enabled: boolean;
  enabled_for_users: string[];
  enabled_for_percent: number;
  metadata: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface FeatureFlagCheckResult {
  enabled: boolean;
  reason?: string;
}
```

The `FeatureFlag` interface matches your database schema. The `FeatureFlagCheckResult` includes a `reason` field that explains why a flag is enabled or disabled, which is useful for debugging.

### Supabase Client Setup

Create the Supabase client for client-side usage:

```ts title="lib/supabase/client.ts"
import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

export const createClient = () =>
  createBrowserClient(supabaseUrl!, supabaseKey!);
```

The `createBrowserClient` function from `@supabase/ssr` creates a client optimized for browser usage.

For server-side usage:

```ts title="lib/supabase/server.ts"
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

export const createClient = (cookieStore: ReturnType<typeof cookies>) => {
  return createServerClient(
    supabaseUrl!,
    supabaseKey!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    },
  );
};
```

This server client handles cookies properly for Next.js server components and API routes.

### Client-Side Feature Flag Logic

Create the client-side utility for checking feature flags:

```ts title="lib/feature-flags/client.ts"
import { createClient } from '@/lib/supabase/client';
import { FeatureFlag, FeatureFlagCheckResult } from '@/types/feature-flag';

// Simple cache with 5 second TTL (React Query handles primary caching)
// This cache is just for reducing redundant calls within a very short window
const cache = new Map<string, { data: FeatureFlag | null; expires: number }>();
const CACHE_TTL = 5000; // 5 seconds - short enough to not interfere with React Query invalidation

function getCached(key: string): FeatureFlag | null | undefined {
  const cached = cache.get(key);
  if (cached && cached.expires > Date.now()) {
    return cached.data;
  }
  return undefined;
}

function setCached(key: string, data: FeatureFlag | null): void {
  cache.set(key, { data, expires: Date.now() + CACHE_TTL });
}
```

The cache reduces database queries by storing flag data in memory for 5 seconds. This is a secondary cache layer – React Query handles the primary caching and automatic invalidation, ensuring changes reflect immediately across all components.

The `getFeatureFlag` function fetches a flag from the database:

```ts
export async function getFeatureFlag(key: string): Promise<FeatureFlag | null> {
  const cached = getCached(key);
  if (cached !== undefined) return cached;

  const supabase = createClient();
  const { data, error } = await supabase
    .from('feature_flags')
    .select('*')
    .eq('key', key)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      setCached(key, null);
      return null;
    }
    console.error('Error fetching feature flag:', error);
    return null;
  }

  setCached(key, data);
  return data;
}
```

The function first checks the cache. If the flag isn't cached, it queries Supabase. The error code `PGRST116` means "not found." In that case, you cache `null` to avoid repeated queries for non-existent flags.

The core logic is in `isFeatureEnabled`:

```ts :collapsed-lines
export async function isFeatureEnabled(
  key: string,
  userId?: string
): Promise<FeatureFlagCheckResult> {
  const flag = await getFeatureFlag(key);

  if (!flag) {
    return { enabled: false, reason: 'Flag not found' };
  }

  if (!flag.enabled) {
    return { enabled: false, reason: 'Flag is globally disabled' };
  }

  // Check user-specific access
  if (userId && flag.enabled_for_users.length > 0) {
    if (flag.enabled_for_users.includes(userId)) {
      return { enabled: true, reason: 'User has explicit access' };
    }
    return { enabled: false, reason: 'User not in allowed list' };
  }

  // Check percentage rollout
  if (flag.enabled_for_percent > 0) {
    const hash = simpleHash(userId || key);
    const percentage = hash % 100;
    const enabled = percentage < flag.enabled_for_percent;

    return {
      enabled,
      reason: enabled
        ? `User falls within ${flag.enabled_for_percent}% rollout`
        : `User falls outside ${flag.enabled_for_percent}% rollout`,
    };
  }

  return { enabled: true, reason: 'Flag is globally enabled' };
}
```

::: info The function follows this logic

1. **Flag doesn't exist**: Return disabled
2. **Flag is globally disabled**: Return disabled
3. **User-specific list exists**: Check if the user is in the list
4. **Percentage rollout is set**: Use a hash function to assign users to buckets deterministically
5. **Otherwise**: Flag is globally enabled

:::

The hash function ensures consistent assignment, so that the same user always gets the same result:

```ts
function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}
```

This creates a deterministic hash, so `simpleHash("user-123")` always returns the same number, ensuring consistent feature flag decisions.

### Server-Side Feature Flag Logic

The server-side version is similar but uses the server Supabase client:

```ts :collapsed-lines title="lib/feature-flags/server.ts"
import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { FeatureFlag, FeatureFlagCheckResult } from '@/types/feature-flag';

export async function getFeatureFlag(key: string): Promise<FeatureFlag | null> {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from('feature_flags')
    .select('*')
    .eq('key', key)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    console.error('Error fetching feature flag:', error);
    return null;
  }

  return data;
}

export async function isFeatureEnabled(
  key: string,
  userId?: string
): Promise<FeatureFlagCheckResult> {
  const flag = await getFeatureFlag(key);

  if (!flag) {
    return { enabled: false, reason: 'Flag not found' };
  }

  if (!flag.enabled) {
    return { enabled: false, reason: 'Flag is globally disabled' };
  }

  // Check user-specific access
  if (userId && flag.enabled_for_users.length > 0) {
    if (flag.enabled_for_users.includes(userId)) {
      return { enabled: true, reason: 'User has explicit access' };
    }
    return { enabled: false, reason: 'User not in allowed list' };
  }

  // Check percentage rollout
  if (flag.enabled_for_percent > 0) {
    const hash = simpleHash(userId || key);
    const percentage = hash % 100;
    const enabled = percentage < flag.enabled_for_percent;

    return {
      enabled,
      reason: enabled
        ? `User falls within ${flag.enabled_for_percent}% rollout`
        : `User falls outside ${flag.enabled_for_percent}% rollout`,
    };
  }

  return { enabled: true, reason: 'Flag is globally enabled' };
}

function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}
```

The logic is identical to the client version, but it uses the server Supabase client that handles cookies correctly.

---

## Setting Up React Query

We’ll rely heavily on React Query throughout this tutorial because feature flags are server-driven values that can change at runtime while users are actively using the application.

React Query provides robust server-state management through caching, background refetching, and cache invalidation. This allows feature flag changes to propagate automatically across the app without forcing page refreshes or manual state synchronization.

### Create the Query Provider

First, create the <VPIcon icon="fas fa-folder-open"/>`providers/`<VPIcon icon="fa-brands fa-react"/>`QueryProvider.tsx` file to configure and initialize React Query for the entire application:

```tsx title="providers/QueryProvider.tsx"
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 20 * 1000,
            refetchOnWindowFocus: true,
            refetchOnReconnect: true,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
```

What’s happening in this code:

- This file runs on the client because React Query relies on React hooks, which only execute in the browser.
- A single QueryClient instance is created and stored in state so it persists across renders and isn’t recreated.
- The QueryClient defines how server data is cached, when it becomes stale, and when it should be refetched.

This is important because components no longer need to handle fetch logic, loading states, or caching manually. Also, server data is shared and reused across components instead of being refetched repeatedly. And feature flag updates propagate automatically, keeping the app consistent without manual refreshes.

### Add Provider to Root Layout

Next, update the <VPIcon icon="fas fa-folder-open"/>`app/`<VPIcon icon="fa-brands fa-react"/>`layout.tsx` file to wrap the application with the React Query provider.

```tsx title="app/layout.tsx"
import type { Metadata } from 'next'
import './globals.css'
import { QueryProvider } from '@/providers/QueryProvider'

export const metadata: Metadata = {
  title: 'Feature Flag System',
  description: 'Production-ready feature flag system with Next.js and Supabase',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  )
}
```

We wrap the entire application with `QueryProvider`, so React Query can manage server data globally across the app.

::: info What `QueryProvider` actually does

`QueryProvider` creates and shares a single Query Client that is responsible for:

- Caching data fetched from the server
- Tracking loading and error states
- Automatically refetching data when needed
- Synchronizing data between components

:::

By wrapping the app, every component inside it can use React Query hooks without any extra setup.

---

## Creating the React Hook

Create the <VPIcon icon="fas fa-folder-open"/>`hooks/`<VPIcon icon="iconfont icon-typescript"/>`useFeatureFlag.ts` file to check whether a feature flag is enabled for a user, using React Query to cache and share the data across components:

```ts title="hooks/useFeatureFlag.ts"
'use client';

import { useQuery } from '@tanstack/react-query';
import { isFeatureEnabled } from '@/lib/feature-flags/client';
import { FeatureFlagCheckResult } from '@/types/feature-flag';

export function useFeatureFlag(key: string, userId?: string) {
  const {
    data: result = { enabled: false, reason: 'Loading...' },
    isLoading: loading,
    error,
  } = useQuery<FeatureFlagCheckResult>({
    queryKey: ['featureFlag', key, userId],
    queryFn: () => isFeatureEnabled(key, userId),
    staleTime: 30 * 1000,
    refetchOnWindowFocus: true,
  });

  return { ...result, loading, error };
}
```

::: info What’s happening in the code

- `'use client';` ensures this file runs in the browser because React Query hooks can only run on the client.
- `useQuery` fetches the feature flag status from the server and caches the result.
- `queryKey: ['featureFlag', key, userId]` uniquely identifies this query so React Query can cache it separately for each feature and user.
- `queryFn: () => isFeatureEnabled(key, userId)` is the function that actually checks if the feature is enabled.
- `staleTime: 30 * 1000` keeps the cached data fresh for 30 seconds before refetching.
- `refetchOnWindowFocus: true` automatically refetches the data when the user switches back to the tab.
- `return { ...result, loading, error }` makes it easy for components to access the flag status, loading state, and any errors.

:::

### Admin Hooks for Managing Flags

We’re going to create a set of React Query hooks to manage feature flags from the admin dashboard. These hooks allow you to fetch, create, update, and delete feature flags while automatically keeping your UI in sync.

#### Step 1: Create the hooks file

Start by creating a new file at <VPIcon icon="fas fa-folder-open"/>`hooks/`<VPIcon icon="iconfont icon-typescript"/>`useFeatureFlags.ts` file. This is where we’ll implement all the hooks for the admin to manage feature flags.

After creating the <VPIcon icon="fas fa-folder-open"/>`hooks/`<VPIcon icon="iconfont icon-typescript"/>`useFeatureFlags.ts` file, import React Query hooks and the FeatureFlag type so we can fetch, update, create, and delete feature flags with type safety and caching.

```ts title="hooks/useFeatureFlags.ts"
'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FeatureFlag } from '@/types/feature-flag';
```

::: info In this code

- `useQuery` fetches and caches server data automatically.
- `useMutation` sends updates, creates, or deletes data on the server.
- `useQueryClient` gives access to the query cache so we can invalidate or update queries after mutations.
- `FeatureFlag` is the TypeScript type definition for feature flags, ensuring our hooks use correct data structures.

:::

#### Step 2: Add a hook to fetch all feature flags

Next, in the same <VPIcon icon="fas fa-folder-open"/>`hooks/`<VPIcon icon="iconfont icon-typescript"/>`useFeatureFlags.ts` file, add a hook to fetch all feature flags for the admin page. This hook will allow components to retrieve the list of flags and automatically cache the data using React Query.

```ts title="hooks/useFeatureFlags.ts"
export function useFeatureFlags() {
  return useQuery<FeatureFlag[]>({
    queryKey: ['featureFlags'],
    queryFn: async () => {
      const response = await fetch('/api/feature-flags');
      const { data } = await response.json();
      return data || [];
    },
    staleTime: 30 * 1000,
  });
}
```

::: info What’s happening in the code

- `useQuery` fetches all feature flags from the server and caches them automatically.
- `queryKey: ['featureFlags']` uniquely identifies this query so React Query can manage caching and refetching.
- `queryFn` is an async function that calls the `/api/feature-flags` endpoint and returns the data.
- `staleTime: 30 * 1000` keeps the cached data fresh for 30 seconds before refetching.

:::

This matters because admin components always display the latest flags without manual refresh. Also, cached data reduces unnecessary network requests. Finally, any component using this hook will automatically update when the flags change.

#### Step 3: Add a hook to update a feature flag

Next, in the same <VPIcon icon="fas fa-folder-open"/>`hooks/`<VPIcon icon="iconfont icon-typescript"/>`useFeatureFlags.ts` file, add a hook to update an existing feature flag. This hook will allow the admin to modify a flag and ensure all components using it get the updated value automatically.

```ts :collapsed-lines title="hooks/useFeatureFlags.ts"
export function useUpdateFeatureFlag() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      key,
      updates,
    }: {
      key: string;
      updates: Partial<FeatureFlag>;
    }) => {
      const response = await fetch(`/api/feature-flags/${key}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error('Failed to update feature flag');
      }

      const { data } = await response.json();
      return data;
    },
    onSuccess: (data, variables) => {
      // Invalidate and refetch feature flags list
      queryClient.invalidateQueries({ queryKey: ['featureFlags'] });
      // Invalidate the specific feature flag check
      queryClient.invalidateQueries({
        queryKey: ['featureFlag', variables.key],
      });
      // Invalidate all feature flag checks (in case userId was involved)
      queryClient.invalidateQueries({ queryKey: ['featureFlag'] });
    },
  });
}
```

::: info What’s happening in the code

- `useMutation` creates a function to update a feature flag on the server.
- `mutationFn` is an async function that sends a PATCH request to `/api/feature-flags/${key}` with the updated data.
- `onSuccess` runs after a successful update to **invalidate cached queries** so the latest data is available everywhere:
  - `['featureFlags']` updates the full list of flags.
  - `['featureFlag', variables.key]` updates the specific flag that was changed.
  - `['featureFlag']` updates any other cached flag checks (for example, per user checks).

#### Step 4: Add a hook to delete a feature flag

Next, add the `useDeleteFeatureFlag` hook to delete a feature flag. This hook allows the admin to remove a flag from the system and ensures the UI updates automatically everywhere the flag was used.

```ts :collapsed-lines
export function useDeleteFeatureFlag() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (key: string) => {
      const response = await fetch(`/api/feature-flags/${key}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete feature flag');
      }
    },
    onSuccess: (_, key) => {
      // Invalidate and refetch feature flags list
      queryClient.invalidateQueries({ queryKey: ['featureFlags'] });
      // Invalidate the specific feature flag check
      queryClient.invalidateQueries({ queryKey: ['featureFlag', key] });
    },
  });
}
```

::: info What’s happening in the code

- `useMutation` creates a function to delete a feature flag from the server.
- `mutationFn` is an async function that sends a DELETE request to `/api/feature-flags/${key}`.
- `onSuccess` runs after the flag is successfully deleted to **invalidate the cache** so the UI updates:
  - `['featureFlags']` refetches the full list of flags.
  - `['featureFlag', key]` removes the deleted flag from any cached queries.

#### Step 5: Add a hook to create a new feature flag

Finally, add the `useCreateFeatureFlag` hook to create a new feature flag. This allows the admin to add new flags and ensures the dashboard updates automatically when a new flag is created.

```ts :collapsed-lines
export function useCreateFeatureFlag() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (flag: {
      key: string;
      name: string;
      description?: string;
      enabled?: boolean;
      enabled_for_users?: string[];
      enabled_for_percent?: number;
      metadata?: Record<string, any>;
    }) => {
      const response = await fetch('/api/feature-flags', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(flag),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create feature flag');
      }

      const { data } = await response.json();
      return data;
    },
    onSuccess: () => {
      // Invalidate and refetch feature flags list
      queryClient.invalidateQueries({ queryKey: ['featureFlags'] });
    },
  });
}
```

::: info What’s happening in the code

- `useMutation` creates a function to send a new feature flag to the server.
- `mutationFn` is an async function that posts the flag data to `/api/feature-flags`.
- `onSuccess` runs after a successful creation to **invalidate the cached list of flags**, so the admin dashboard shows the new flag immediately.

:::

### Feature Flag Gate Component

Now we’ll create a wrapper component to conditionally render UI based on feature flags. This helps you show or hide parts of your app depending on whether a flag is enabled for a user.

Create the <VPIcon icon="fas fa-folder-open"/>`components/`<VPIcon icon="fa-brands fa-react"/>`FeatureFlagGate.tsx` file and add the following code:

```tsx :collapsed-lines title="components/FeatureFlagGate.tsx"
'use client';

import { ReactNode } from 'react';
import { useFeatureFlag } from '@/hooks/useFeatureFlag';

interface FeatureFlagGateProps {
  flagKey: string;
  userId?: string;
  children: ReactNode;
  fallback?: ReactNode;
  showLoading?: ReactNode;
}

export function FeatureFlagGate({
  flagKey,
  userId,
  children,
  fallback = null,
  showLoading = null,
}: FeatureFlagGateProps) {
  const { enabled, loading } = useFeatureFlag(flagKey, userId);

  if (loading && showLoading !== null) {
    return <>{showLoading}</>;
  }

  if (!enabled) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
```

::: info What’s happening in the code

- `useFeatureFlag(flagKey, userId)` checks whether the feature is enabled for a specific user and tracks loading state.
- `loading && showLoading !== null`: if the data is still loading, render the optional `showLoading` UI.
- `!enabled`: if the feature is disabled, render the optional `fallback` UI.
- `children` renders the actual content only if the flag is enabled and not loading.

:::

This makes it easy to conditionally render features without scattering logic throughout your components. It also supports custom loading and fallback UI for better user experience. And it works with React Query caching automatically, so flag changes propagate immediately.

---

## Building the Admin Dashboard

Admins need a way to manage feature flags in your app. To do this, we’ll create API routes that support CRUD operations (Create, Read, Update, Delete). These routes will interact with Supabase to store and modify flag data.

### Step 1: Create the main feature flags API route

Start by creating the <VPIcon icon="fas fa-folder-open"/>`app/api/feature-flags/`<VPIcon icon="iconfont icon-typescript"/>`route.ts` file. This file will handle fetching all feature flags (GET) and creating new ones (POST).

```ts :collapsed-lines title="app/api/feature-flags/route.ts"
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const { data, error } = await supabase
      .from('feature_flags')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const body = await request.json();

    if (!body.key || !body.name) {
      return NextResponse.json(
        { error: 'key and name are required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('feature_flags')
      .insert({
        key: body.key,
        name: body.name,
        description: body.description || null,
        enabled: body.enabled || false,
        enabled_for_users: body.enabled_for_users || [],
        enabled_for_percent: body.enabled_for_percent || 0,
        metadata: body.metadata || {},
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

::: info What’s happening in this file:

- `GET` fetches all feature flags from Supabase, ordered by creation date.
- `POST` creates a new feature flag in Supabase. It checks that `key` and `name` exist, and sets defaults for optional fields.
- `createClient(cookieStore)` authenticates requests with `Supabase` using cookies from the client.
- `NextResponse.json()` sends JSON responses with data or error messages.

:::

### Step 2: Create the dynamic route for individual flags

Next, Create the file <VPIcon icon="fas fa-folder-open"/>`app/api/feature-flags/[key]/`<VPIcon icon="iconfont icon-typescript"/>`route.ts`. This route handles updating (PATCH) and deleting (DELETE) individual flags based on their `key`.

```ts :collapsed-lines title="app/api/feature-flags/[key]/route.ts"
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { key: string } }
) {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const body = await request.json();

    const { data, error } = await supabase
      .from('feature_flags')
      .update({
        ...(body.name !== undefined && { name: body.name }),
        ...(body.description !== undefined && { description: body.description }),
        ...(body.enabled !== undefined && { enabled: body.enabled }),
        ...(body.enabled_for_users !== undefined && {
          enabled_for_users: body.enabled_for_users,
        }),
        ...(body.enabled_for_percent !== undefined && {
          enabled_for_percent: body.enabled_for_percent,
        }),
      })
      .eq('key', params.key)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { key: string } }
) {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase
      .from('feature_flags')
      .delete()
      .eq('key', params.key);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

::: info What’s happening in this file

- `PATCH` updates a feature flag with only the fields provided in the request body.
  - Uses the spread operator `(...)` to include only fields that exist.
- `DELETE` removes the feature flag identified by `key`.
- `eq('key', params.key)` ensures the operation targets the correct flag.

:::

### Step 3: Create the Admin Dashboard UI

Now, create the file <VPIcon icon="fas fa-folder-open"/>`app/admin/`<VPIcon icon="fa-brands fa-react"/>`page.tsx`. This is the main admin dashboard where you can view, create, and manage feature flags.

With React Query, the admin dashboard becomes much cleaner and automatically updates when flags change:

```tsx :collapsed-lines title="app/admin/page.tsx"
'use client';

import { useState } from 'react';
import { FeatureFlagList } from '@/components/admin/FeatureFlagList';
import { CreateFeatureFlagModal } from '@/components/admin/CreateFeatureFlagModal';
import { useFeatureFlags } from '@/hooks/useFeatureFlags';

export default function AdminPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { data: flags = [], isLoading: loading } = useFeatureFlags();

  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='mb-8 flex justify-between items-center'>
          <div>
            <h1 className='text-3xl font-bold text-gray-900'>
              Feature Flags Admin
            </h1>
            <p className='mt-2 text-sm text-gray-600'>
              Manage your feature flags and rollouts
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
          >
            Create Feature Flag
          </button>
        </div>

        {loading ? (
          <div className='text-center py-12'>
            <div className='inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
            <p className='mt-4 text-gray-600'>Loading feature flags...</p>
          </div>
        ) : (
          <FeatureFlagList flags={flags} />
        )}

        {showCreateModal && (
          <CreateFeatureFlagModal
            onClose={() => setShowCreateModal(false)}
            onSuccess={() => {
              setShowCreateModal(false);
            }}
          />
        )}
      </div>
    </div>
  );
}
```

::: info What’s happening in this file

- `'use client';` marks this page as a client component so hooks like `useState` and React Query can run.
- `useState` manages whether the “Create Feature Flag” modal is open or closed.
- `useFeatureFlags()` fetches all feature flags from the API and keeps the list in sync automatically.
- `const { data: flags = [], isLoading: loading }` :
  - `flags` contains the feature flag list
  - `loading` tracks whether the data is still being fetched
- `loading ? ... : <FeatureFlagList />` :
  - Shows a loading spinner while flags are being fetched
  - Renders the feature flag table once data is available
- `FeatureFlagList` displays all feature flags and their current states.

:::

### Using Feature Flags Mutations in Components

Earlier, we created mutation hooks for creating, updating, and deleting feature flags. Now let’s see how those hooks are actually used inside UI components to trigger updates and keep the interface in sync.

Here's how to use the mutation hooks in your components:

```tsx :collapsed-lines
'use client'

import { useState } from 'react'
import { FeatureFlag } from '@/types/feature-flag'
import { EditFeatureFlagModal } from './EditFeatureFlagModal'
import {
  useUpdateFeatureFlag,
  useDeleteFeatureFlag,
} from '@/hooks/useFeatureFlags'

interface FeatureFlagCardProps {
  flag: FeatureFlag
}

export function FeatureFlagCard({ flag }: FeatureFlagCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const updateFlag = useUpdateFeatureFlag()
  const deleteFlag = useDeleteFeatureFlag()

  const handleToggle = async () => {
    try {
      await updateFlag.mutateAsync({
        key: flag.key,
        updates: { enabled: !flag.enabled },
      })
    } catch (error) {
      console.error('Error toggling flag:', error)
      alert('Failed to toggle feature flag')
    }
  }

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete "${flag.name}"?`)) {
      return
    }

    try {
      await deleteFlag.mutateAsync(flag.key)
    } catch (error) {
      console.error('Error deleting flag:', error)
      alert('Failed to delete feature flag')
    }
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-semibold text-gray-900">
                {flag.name}
              </h3>
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${
                  flag.enabled
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {flag.enabled ? 'Enabled' : 'Disabled'}
              </span>
            </div>
            <p className="mt-1 text-sm text-gray-600 font-mono">{flag.key}</p>
            {flag.description && (
              <p className="mt-2 text-sm text-gray-500">{flag.description}</p>
            )}

            <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
              {flag.enabled_for_users.length > 0 && (
                <div>
                  <span className="font-medium">Users:</span>{' '}
                  {flag.enabled_for_users.length} user(s)
                </div>
              )}
              {flag.enabled_for_percent > 0 && (
                <div>
                  <span className="font-medium">Rollout:</span>{' '}
                  {flag.enabled_for_percent}%
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 ml-4">
            <button
              onClick={handleToggle}
              disabled={updateFlag.isPending}
              className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${
                flag.enabled
                  ? 'bg-red-100 text-red-700 hover:bg-red-200'
                  : 'bg-green-100 text-green-700 hover:bg-green-200'
              } disabled:opacity-50`}
            >
              {updateFlag.isPending
                ? '...'
                : flag.enabled
                ? 'Disable'
                : 'Enable'}
            </button>
            <button
              onClick={() => setIsEditing(true)}
              className="px-3 py-1.5 text-sm font-medium text-blue-700 bg-blue-100 rounded hover:bg-blue-200 transition-colors"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="px-3 py-1.5 text-sm font-medium text-red-700 bg-red-100 rounded hover:bg-red-200 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {isEditing && (
        <EditFeatureFlagModal
          flag={flag}
          onClose={() => setIsEditing(false)}
          onSuccess={() => {
            setIsEditing(false)
          }}
        />
      )}
    </>
  )
}
```

The component above works without any manual refetching or state synchronization logic. The moment a mutation succeeds, React Query automatically updates or invalidates the relevant cached data. That behavior is what enables the smooth, real-time updates you see in the UI.

Because all feature flag data is managed by React Query:

- When a flag is toggled, React Query automatically invalidates the relevant queries
- Any component using that flag immediately receives the updated value
- The admin dashboard stays in sync with the rest of the application without extra code
- Loading and error states are handled consistently across all mutations.

---

## Implementing a Real-World Example

To make all of this concrete, let’s walk through a real-world example.

In this section, we’ll build a simple Todo feature that is **entirely controlled by a feature flag**. When the flag is disabled, users see a message explaining that the feature isn’t available. When it’s enabled, the full Todo interface appears instantly without redeploying or refreshing the page.

This demonstrates how feature flags can safely gate entire pages or features in a live application.

Below is what the experience looks like as the feature flag is toggled on and off from the admin dashboard:

![feature-flag-disabled-page](https://cdn.hashnode.com/res/hashnode/image/upload/v1769946162379/33b4a9e3-5284-477e-b8c5-ecc0e137e7c1.png)

![feature-flag-enabled-page](https://cdn.hashnode.com/res/hashnode/image/upload/v1769946216049/edea8722-c298-4b2b-a4b5-bcc8306fb15f.png)

![Todo-app-with-feature-flag](https://cdn.hashnode.com/res/hashnode/image/upload/v1770299915271/54c124ac-24d5-4d3f-825c-0507675053ee.png)

### Step 1: Create the Todo Page File

Create a new file <VPIcon icon="fas fa-folder-open"/>`app/todos/`<VPIcon icon="fa-brands fa-react"/>`page.tsx`. This page shows how to use a feature flag to conditionally render a full component. Let's build a todo app that's controlled by a feature flag. This demonstrates real-world usage.

At the top of the file, import the hooks we need and define the Todo interface.

```tsx title="app/todos/page.tsx"
'use client';

import { useState, useEffect } from 'react';
import { FeatureFlagGate } from '@/components/FeatureFlagGate';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}
```

### Step 2: Initialize state in the component

Create the component and define state for todos and the input:

```ts
export default function TodosPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState('');
```

::: info Here’s what’s going on

- `todos` stores all todo items.
- `inputValue` tracks what the user types in the input field.

:::

### Step 3: Load and save todos from localStorage

```ts
  useEffect(() => {
    const saved = localStorage.getItem('todos');
    if (saved) setTodos(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);
```

In this code, the first `useEffect` loads saved todos from the browser’s `localStorage` when the component mounts. The second `useEffect` saves todos whenever the list changes. This ensures your todos persist across page reloads.

### Step 4: Add helper functions

```ts
  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos([...todos, { 
        id: Date.now().toString(), 
        text: inputValue.trim(), 
        completed: false 
      }]);
      setInputValue('');
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };
```

::: info In this code

- `addTodo` adds a new todo item with a unique `id` and resets the input.
- `toggleTodo` marks a todo as completed or incomplete.
- `deleteTodo` removes a todo from the list.

:::

### Step 5: Render the Todo App inside the FeatureFlagGate

```tsx
  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6">Todo App</h1>

      <FeatureFlagGate
        flagKey="test"
        fallback={
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6">
            <h3 className="font-semibold mb-2">Feature Not Available</h3>
            <p>Enable the "test" feature flag in the admin dashboard.</p>
          </div>
        }
      >
```

::: info What’s going on here

- We wrap the Todo app in `FeatureFlagGate`.
- `flagKey="test"` only shows the Todo app if this feature flag is enabled.
- `fallback` displays a message when the feature is disabled.

:::

### Step 6: Add the input field and Add button

```tsx
        <div className="mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTodo()}
              placeholder="What needs to be done?"
              className="flex-1 px-4 py-3 border rounded-lg"
            />
            <button
              onClick={addTodo}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg"
            >
              Add
            </button>
          </div>
        </div>
```

::: info In this code

- Input field captures new todo text.
- Pressing Enter or clicking Add triggers `addTodo`.
- It’s styled with Tailwind CSS for spacing and rounded borders.

:::

### Step 8: Display the list of todos

```tsx

        <div className="space-y-2">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg"
            >
              <button
                onClick={() => toggleTodo(todo.id)}
                className={`w-6 h-6 rounded-full border-2 ${
                  todo.completed
                    ? 'bg-green-500 border-green-500'
                    : 'border-gray-300'
                }`}
              >
                {todo.completed && '✓'}
              </button>
              <span className={todo.completed ? 'line-through' : ''}>
                {todo.text}
              </span>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-red-500"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </FeatureFlagGate>
    </div>
  );
}
```

::: info This code

- Loops over `todos` to display each item.
- Shows a toggle button to mark as complete, a delete button, and the todo text.
- Completed todos get a **line-through** style.
- All interaction happens **inside the FeatureFlagGate**, so users only see this when the flag is enabled.<br/>The entire todo app is wrapped in `FeatureFlagGate`. When the "test" flag is disabled, users see a message instead of the app. When enabled, they see the full todo interface.

:::

### Todo App Overview

This Todo app demonstrates how feature flags work in a live application. It shows how admins can enable or disable the "test" feature flag dynamically from the dashboard.

`FeatureFlagGate` ensures the interface updates immediately when the flag changes, and entire components or pages can be toggled on or off safely using feature flags.

---

## Server-Side Usage

Feature flags shouldn’t only live on the client. In many cases, you’ll want to enforce them on the server as well, especially for APIs, background jobs, or sensitive business logic.

In this example, we’ll protect an API route by checking a feature flag on the server before returning any data.

First, create the API route file <VPIcon icon="fas fa-folder-open"/>`app/api/some-feature/`<VPIcon icon="iconfont icon-typescript"/>`route.ts`. This demonstrates how to check a feature flag on the server before returning data.

```ts title="app/api/some-feature/route.ts"
import { isFeatureEnabled } from '@/lib/feature-flags/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const userId = request.headers.get('user-id') || undefined;
  const result = await isFeatureEnabled('new-feature', userId);

  if (!result.enabled) {
    return NextResponse.json(
      { error: 'Feature not available' },
      { status: 403 }
    );
  }

  // Feature is enabled, proceed with logic
  return NextResponse.json({ data: 'Feature content' });
}
```

::: info What’s happening in this file

- File creation: <VPIcon icon="fas fa-folder-open"/>`app/api/some-feature/`<VPIcon icon="iconfont icon-typescript"/>`route.ts` defines a new API route.
- `isFeatureEnabled`: Checks whether the `'new-feature'` flag is active for the user.
- Conditional response: Returns a `403` error if the feature is disabled. Otherwise, proceeds normally.
- Server-side gating: Lets you protect entire endpoints, so users only access functionality when the feature is enabled.

:::

---

## Why React Query?

Feature flags introduce a unique challenge because they must remain consistent across the entire UI even as they change dynamically. Without a dedicated server-state solution, you’d need to manually refetch data, coordinate updates between components, and handle edge cases where parts of the UI fall out of sync.

React Query treats feature flags as shared server state. Once fetched, flags are cached and reused across components. When an admin updates a flag, the cache is invalidated and refetched in the background, triggering immediate UI updates everywhere the flag is used. This makes React Query a natural fit for feature flags, where correctness, consistency, and real-time updates are critical.

### Real-World Impact

Before React Query:

```ts
// Had to manually refetch after every update
const handleToggle = async () => {
  await fetch(`/api/feature-flags/${key}`, { method: 'PATCH', ... });
  fetchFlags(); // Manual refetch
  // Other components still show old data until page refresh
};
```

After React Query:

```ts
// Automatic cache invalidation - everything updates instantly
const updateFlag = useUpdateFeatureFlag();
await updateFlag.mutateAsync({ key, updates });
// All components using this flag automatically update!
```

---

## Conclusion

You’ve now built a complete, production-ready feature flag system using Next.js and Supabase. The system supports global toggles, user-specific access, and percentage-based rollouts, all backed by a flexible database schema.

Feature flags can be checked on both the client and the server, ensuring consistent behavior across UI components and API routes. With React Query handling caching and invalidation, changes made in the admin dashboard propagate instantly throughout the application without deploying or refreshing the page.

Feature flags are a foundational tool for modern development. They let you deploy code safely, test new ideas with real users, and react quickly when something goes wrong. With this setup in place, you can confidently extend the system with audit logs, analytics, scheduled rollouts, or deeper CI/CD integrations as your product grows.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build a Production-Ready Feature Flag System with Next.js and Supabase",
  "desc": "Feature flags are powerful tools that let you control which features are visible to users without deploying new code. They enable gradual rollouts, A/B testing, and instant feature toggles, which are all essential for modern software development. In ...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-production-ready-feature-flag-system-with-nextjs-and-supabase.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
