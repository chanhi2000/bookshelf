---
lang: en-US
title: "The Application Database Design"
description: "Article(s) > (2/4) How to Build a Social Learning Platform using Next.js, Stream, and Supabase" 
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
      content: "Article(s) > (2/4) How to Build a Social Learning Platform using Next.js, Stream, and Supabase"
    - property: og:description
      content: "The Application Database Design"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-social-learning-platform-using-nextjs-stream-and-supabase/the-application-database-design.html
date: 2025-03-04
isOriginal: false
author:
  - name: David Asaolu
    url : https://freecodecamp.org/news/author/de/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1741009946459/dba65929-1b65-4278-9601-4d047042753a.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "How to Build a Social Learning Platform using Next.js, Stream, and Supabase",
  "desc": "Social media and real-time communication have transformed how people interact, making it easier to share ideas, collaborate, and learn from others, regardless of location. From professional networks to online study groups, these platforms allow vario...",
  "link": "/freecodecamp.org/how-to-build-a-social-learning-platform-using-nextjs-stream-and-supabase/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build a Social Learning Platform using Next.js, Stream, and Supabase"
  desc="Social media and real-time communication have transformed how people interact, making it easier to share ideas, collaborate, and learn from others, regardless of location. From professional networks to online study groups, these platforms allow vario..."
  url="https://freecodecamp.org/news/how-to-build-a-social-learning-platform-using-nextjs-stream-and-supabase#heading-the-application-database-design"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1741009946459/dba65929-1b65-4278-9601-4d047042753a.png"/>

In the previous section, we created two database tables: `instructors` and `students`, which store instructors and students separately. Instructors can also upload headshot images to [<VPIcon icon="iconfont icon-supabase"/>Supabase Storage](https://supabase.com/docs/guides/storage/quickstart).

In this section, you'll learn how to create these tables, define their access policies, and retrieve or modify data within the tables.

| **Announcements (data type)** | **Instructors (data type)** | **Students (data type)** |
| --- | --- | --- |
| `id` (int8) | `id` (uuid) | `id` (uuid) |
| `created_at` (timestamptz) | `created_at` (timestamptz) | `created_at` (timestamptz) |
| `author_name` (text) | `name` (text) | `email` (text) |
| `interest` (text) | `email` (text) | `name` (text) |
| `author_title` (text) | `occupation` (text) | `interest` (text) |
| `author_id` (uuid) | `bio` (text) | `following_list` (uuid[]) |
| `content` (text) | `url` (text) |  |
| `likes` (uuid []) | `interest` (text) |  |
| `author_image` (text) | `image` (text) |  |
|  | `followers` (uuid[]) | |

::: note

The `instructors` table includes an `image` column that stores the instructor's headshot URL. You can obtain this by creating a Supabase bucket named `headshot` and uploading the image when the instructor signs up.

:::

The `instructors` and `students` tables have two primary keys: `id` and `email`.

Supabase allows you to define policies for your tables, controlling the operations different users can perform within the application.

Next, let’s create the access policies for each table.

---

## Access Policy for the Announcements Table

The `announcements` table has four access policies:

```sql title="Enable delete operation for users based on their user ID."
ALTER POLICY "Enable delete for users based on user_id"
ON "public"."announcements"
TO public
USING (
  ((SELECT auth.uid() AS uid) = author_id)
);
```

```sql title="Enable insert operation for authenticated users only."
ALTER POLICY "Enable insert for authenticated users only"
ON "public"."announcements"
TO authenticated
WITH CHECK (true);
```

```sql title="Enable read access for all users."
ALTER POLICY "Enable read access for all users"
ON "public"."announcements"
TO public
USING (true);
```

```sql title="Enable update operation for authenticated users only."
ALTER POLICY "Enable update for authenticated users"
ON "public"."announcements"
TO authenticated
USING (
  (auth.role() = 'authenticated'::text)
);
```

---

## Access Policy for the Instructors Table

The `instructors` table has three policies:

```sql title="Allow only authenticated users to update the instructors table."
ALTER POLICY "Allow only authenticated users"
ON "public"."instructors"
TO authenticated
USING (
  (auth.role() = 'authenticated'::text)
);
```

```sql title="Enable insert operation for authenticated users only."
ALTER POLICY "Enable insert for authenticated users only"
ON "public"."instructors"
TO authenticated
WITH CHECK (
  true
);
```

```sql title="Enable read access for all users."
ALTER POLICY "Enable read access for all users"
ON "public"."instructors"
TO public
USING (
  true
);
```

---

## Access Policy for the Students Table

The `students` table has three access policies:

```sql title="Enable insert operation for authenticated users only."
ALTER POLICY "Enable insert for authenticated users only"
ON "public"."students"
TO authenticated
WITH check (
  true
);
```

```sql title="Enable update operation for authenticated users only."
ALTER POLICY "Enable update for only authenticated users"
ON "public"."students"
TO authenticated
USING ((auth.role() = 'authenticated'::text))
```

```sql title="Enable read access for authenticated users only."
ALTER POLICY "Read access for only authenticated users"
ON "public"."students"
TO authenticated
USING (
  true
);
```
