---
lang: en-US
title: "How to Set up Server-Side Authentication with Supabase"
description: "Article(s) > (1/4) How to Build a Social Learning Platform using Next.js, Stream, and Supabase" 
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
      content: "Article(s) > (1/4) How to Build a Social Learning Platform using Next.js, Stream, and Supabase"
    - property: og:description
      content: "How to Set up Server-Side Authentication with Supabase"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/how-to-build-a-social-learning-platform-using-nextjs-stream-and-supabase/how-to-set-up-server-side-authentication-with-supabase.html
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
  url="https://freecodecamp.org/news/how-to-build-a-social-learning-platform-using-nextjs-stream-and-supabase#heading-how-to-set-up-server-side-authentication-with-supabase"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1741009946459/dba65929-1b65-4278-9601-4d047042753a.png"/>

Here, you'll learn how to configure Supabase, add server-side authentication, and protect pages from unauthorized users in a Next.js application. You'll also learn how to handle the authentication logic efficiently using [<VPIcon icon="iconfont icon-nextjs"/>Next.js server actions](https://nextjs.org/docs/13/app/api-reference/functions/server-actions#with-client-components).

---

## How to Configure Supabase Authentication in a Next.js application

First, create a [<VPIcon icon="iconfont icon-supabase"/>Supabase account](https://supabase.com/) and an organization that will contain your various Supabase projects.

![Screenshot of a form on the Supabase website to create a new organization. It includes fields for organization name, type, and plan, with options such as "Personal" and "Free - $0/month." There are buttons for "Cancel" and "Create organization."](https://cdn.hashnode.com/res/hashnode/image/upload/v1740653729412/35339612-4688-489e-b9d2-2cc825962519.png)

Add a new Supabase project to the organisation and copy the following credentials on your dashboard into a <VPIcon icon="fas fa-file-lines"/>`.env.local` file at the root of your project:

```sh title=".env.local"
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon_key_from_Supabase_dashboard>
NEXT_PUBLIC_SUPABASE_URL=<supabase_project_url>
```

Create a <VPIcon icon="fas fa-folder-open"/>`utils/supabase` folder at the root of the Next.js project and add the following files to the folder: <VPIcon icon="iconfont icon-typescript"/>`client.ts`, <VPIcon icon="iconfont icon-typescript"/>`middleware.ts`, and <VPIcon icon="iconfont icon-typescript"/>`server.ts`.

```sh
mkdir utils && cd utils
mkdir supabase && cd supabase
touch client.ts middleware.ts server.ts
```

Copy the following code into <VPIcon icon="fas fa-folder-open"/>`utils/supabase/`<VPIcon icon="iconfont icon-typescript"/>`client.ts`. This initializes a Supabase browser client to interact with Supabase on client-side routes:

```ts title="utils/supabase/client.ts"
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
```

Next, copy the following code into <VPIcon icon="fas fa-folder-open"/>`utils/supabase/`<VPIcon icon="iconfont icon-typescript"/>`server.ts`. This creates a Supabase server client for handling authentication and interacting with Supabase in server-side requests:

```ts :collapsed-lines title="utils/supabase/server.ts"
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
}
```

Now, copy the following code into <VPIcon icon="fas fa-folder-open"/>`utils/supabase/`<VPIcon icon="iconfont icon-typescript"/>`middleware.ts`. This middleware creates authentication cookies and protects pages from unauthorized access:

```ts :collapsed-lines title="utils/supabase/middleware.ts"
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });
  //👇🏻 creates the Supabase cookie functions
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );
  // 👉🏻 placeholder for protected route controller
}
```

To enforce authentication, add the following code inside the placeholder in <VPIcon icon="iconfont icon-typescript"/>`middleware.ts`. This checks if a user is signed in and redirects unauthenticated users to the login page:

```ts :collapsed-lines title="utils/supabase/middleware.ts"
//👇🏻 gets current user
const {
  data: { user },
} = await supabase.auth.getUser();

//👇🏻 declares protected routes
if (
  !user &&
  request.nextUrl.pathname !== "/" &&
  !request.nextUrl.pathname.startsWith("/instructor/auth") &&
  !request.nextUrl.pathname.startsWith("/student/auth")
) {
  //👇🏻 Redirect unauthenticated users to the login page
  const url = request.nextUrl.clone();
  url.pathname = "/student/auth/login"; // 👈🏼 redirect page
  return NextResponse.redirect(url);
}
//👇🏻 returns Supabase response
return supabaseResponse;
```

Add another <VPIcon icon="iconfont icon-typescript"/>`middleware.ts` file to the root of the Next.js project and copy the following code into the file:

```ts :collapsed-lines title="utils/supabase/middleware.ts"
import { type NextRequest } from "next/server";
import { updateSession } from "./utils/supabase/middleware";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
```

Finally, create an [`auth/confirm` (<VPIcon icon="iconfont icon-github"/>`dha-stix/stream-lms`)](https://github.com/dha-stix/stream-lms/blob/main/src/app/auth/confirm/route.ts) route and [error (<VPIcon icon="iconfont icon-github"/>`dha-stix/stream-lms`)](https://github.com/dha-stix/stream-lms/blob/main/src/app/error/page.tsx) page within the Next.js app folder.

You've successfully [<VPIcon icon="iconfont icon-supabase"/>configured authentication in your Next.js project](https://supabase.com/docs/guides/auth/server-side/nextjs) using Supabase.

---

## Student Authentication with Supabase

In this section, you will learn how to create the signup and login functions for the students within the application.

First, create an <VPIcon icon="fas fa-folder-open"/>`actions` folder in the root of your Next.js project and add an <VPIcon icon="iconfont icon-typescript"/>`auth.ts` file inside it. This file will contain all Supabase authentication functions.

Add the following imports to the top of the <VPIcon icon="iconfont icon-typescript"/>`auth.ts` file:

```ts title="actions/auth.ts"
"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "../utils/supabase/server";
```

Next, you need to create the server functions that accept form data from the client and sign users up or log them in as students.

Copy the following code snippet into the <VPIcon icon="fas fa-folder-open"/>`actions/`<VPIcon icon="iconfont icon-typescript"/>`auth.ts` file to create the user sign-up function:

```ts :collapsed-lines title="actions/auth.ts"
export async function studentSignUp(formData: FormData) {
  const supabase = await createClient();

  //👇🏻 Extract form data
  const credentials = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    interest: formData.get("interest") as string,
    name: formData.get("name") as string,
  };

  //👇🏻 Supabase sign up function (options attribute :- for user metadata)
  const { data, error } = await supabase.auth.signUp({
    email: credentials.email,
    password: credentials.password,
    options: {
      data: {
        interest: credentials.interest,
        name: credentials.name,
      },
    },
  });

  //👉🏻 return user or error object
}
```

The code snippet above accepts the form credentials such as email, password, interest, and name, and signs the user up as a Supabase user.

Modify the function to return the user or error object.

```ts :collapsed-lines title="actions/auth.ts"
export async function studentSignUp(formData: FormData) {
  //...form inputs and supabase functions

  if (error) {
    return { error: error.message, status: error.status, user: null };
  } else if (data.user?.identities?.length === 0) {
    return { error: "User already exists", status: 409, user: null };
  }

  revalidatePath("/", "layout");
  return { error: null, status: 200, user: data.user };
}
```

Create the student login function as shown below:

```ts :collapsed-lines title="actions/auth.ts"
export async function studentLogIn(formData: FormData) {
  const supabase = await createClient();

  const credentials = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };
  const { data, error } = await supabase.auth.signInWithPassword(credentials);

  if (error) {
    return { error: error.message, status: error.status, user: null };
  }
  //👇🏻 only instructors have an image attribute
  if (data && data.user.user_metadata.image) {
    return { error: "You are not a student", status: 400, user: null };
  }

  //👉🏻 create a student row and add to the database

  revalidatePath("/", "layout");
  return { error: null, status: 200, user: data.user };
}
```

The code above takes the student's email and password to log them into the application.

- If an error occurs, it returns an error message.
- If the user object includes an image attribute (indicating that they are an instructor), they are prevented from logging in.

Once the student is signed in, you must store their details in a Supabase table. This allows you to add a `following_list` column that tracks the instructors they follow. The list will be updated whenever the student follows or unfollows an instructor.

```ts :collapsed-lines title="actions/auth.ts"
export async function studentLogIn(formData: FormData) {
  //...other functions

  const { data: existingUser } = await supabase
    .from("students")
    .select()
    .eq("email", credentials.email)
    .single();

  //👇🏻 if student doesn't exist
  if (!existingUser) {
    const { error: insertError } = await supabase.from("students").insert({
      email: credentials.email,
      name: data.user.user_metadata.name,
      interest: data.user.user_metadata.interest,
      id: data.user.id,
      following_list: [] as string[],
    });

    if (insertError) {
      return { error: insertError.message, status: 500, user: null };
    }
  }

  revalidatePath("/", "layout");
  return { error: null, status: 200, user: data.user };
}
```

Every time a student logs in, the code checks if they already exist in the `students` table.

- If the student is found, no new entry is created.
- If the student is not found, a new row with their details is added.

Each student’s data includes two primary keys: `id` and `email` and additional columns: `interest`, `name`, and `following_list`.

![Student registration form with fields for full name, email address, interest, and password. Includes a "Register" button and a sign-in option for existing accounts. The browser tab shows the URL "localhost:3000".](https://cdn.hashnode.com/res/hashnode/image/upload/v1740654932982/724fcf11-55e3-4163-9a6e-0b2771d0874c.gif)

---

## Instructor Authentication with Supabase

The instructor's user object is quite different from the student's. It includes data such as email, password, name, interest, occupation, bio, URL, and image.

Add the following function to <VPIcon icon="fas fa-folder-open"/>`actions/`<VPIcon icon="iconfont icon-typescript"/>`auth.ts` to handle instructor sign-ups:

```ts :collapsed-lines title="actions/auth.ts"
export async function instructorSignUp(formData: FormData) {
  const supabase = await createClient();

  //👇🏻 get user credentials from the form
  const credentials = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    interest: formData.get("interest") as string,
    name: formData.get("name") as string,
    occupation: formData.get("occupation") as string,
    bio: formData.get("bio") as string,
    url: formData.get("url") as string,
    image: formData.get("image") as File,
  };

  //👉🏻 following code snippet below
}
```

Next, upload the image to Supabase Storage and retrieve its download URL before signing up the user as an instructor. Update the `instructorSignUp` function to show this:

```ts :collapsed-lines title="actions/auth.ts"
export async function instructorSignUp(formData: FormData) {
  //👇🏻 upload instructor's image
  const { data: imageData, error: imageError } = await supabase.storage
    .from("headshots")
    .upload(`${crypto.randomUUID()}/image`, credentials.image);

  if (imageError) {
    return { error: imageError.message, status: 500, user: null };
  }
  //👇🏻 get the image URL
  const imageURL = `${process.env.STORAGE_URL!}${imageData.fullPath}`;

  //👇🏻 authenticate user as instructor
  const { data, error } = await supabase.auth.signUp({
    email: credentials.email,
    password: credentials.password,
    options: {
      data: {
        interest: credentials.interest,
        name: credentials.name,
        occupation: credentials.occupation,
        bio: credentials.bio,
        url: credentials.url,
        image: imageURL,
      },
    },
  });

  //👇🏻 return user or error object
  if (error) {
    return { error: error.message, status: error.status, user: null };
  }

  revalidatePath("/", "layout");
  return { error: null, status: 200, user: data.user };
}
```

Finally, an [instructor login function (<VPIcon icon="iconfont icon-github"/>`dha-stix/stream-lms`)](https://github.com/dha-stix/stream-lms/blob/main/actions/auth.ts) that authenticates the user, similar to the student login function, should be created. It should check whether the instructor already exists in the `instructors` table. If the instructor does not exist, execute the function to add the instructor's user object to the database table.

Here is the Supabase function for adding an instructor to the table:

```ts
const { error: insertError } = await supabase.from("instructors").insert({
  email: credentials.email,
  name: data.user.user_metadata.name,
  occupation: data.user.user_metadata.occupation,
  bio: data.user.user_metadata.bio,
  url: data.user.user_metadata.url,
  image: data.user.user_metadata.image,
  id: data.user.id,
  interest: data.user.user_metadata.interest,
  followers: [],
});
```

The `instructors` table includes an additional `followers` attribute, which stores an array of student IDs following the instructor. You can find the [complete code on GitHub (<VPIcon icon="iconfont icon-github"/>`dha-stix/stream-lms`)](https://github.com/dha-stix/stream-lms/blob/main/actions/auth.ts).

Additionally, authentication functions like [`getUserSession` (<VPIcon icon="iconfont icon-github"/>`dha-stix/stream-lms`)](https://github.com/dha-stix/stream-lms/blob/main/actions/auth.ts) and [`logOut` (<VPIcon icon="iconfont icon-github"/>`dha-stix/stream-lms`)](https://github.com/dha-stix/stream-lms/blob/main/actions/auth.ts) must be created. These functions will retrieve the current user's object and allow them to log out when necessary, such as when clicking a logout button.

![Instructor login page with fields for email and password, a "Sign in" button, and a link to create an account. A sidebar on the left displays "LinkedUp" with a "Student Sign-in" link.](https://cdn.hashnode.com/res/hashnode/image/upload/v1740655472825/4c038412-fe6d-4449-b2a9-d9d3649da2f8.gif)
