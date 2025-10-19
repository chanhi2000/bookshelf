---
lang: en-US
title: "How to Create Role-Based Access Control (RBAC) with Custom Claims Using Firebase Rules"
description: "Article(s) > How to Create Role-Based Access Control (RBAC) with Custom Claims Using Firebase Rules"
icon: iconfont icon-firebase
category:
  - Node.js
  - Google
  - Firebase
  - React.js
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - google
  - firebase
  - react
  - reactjs
  - react-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Create Role-Based Access Control (RBAC) with Custom Claims Using Firebase Rules"
    - property: og:description
      content: "How to Create Role-Based Access Control (RBAC) with Custom Claims Using Firebase Rules"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/firebase-rbac-custom-claims-rules.html
prev: /programming/js-supabase/articles/README.md
date: 2025-10-16
isOriginal: false
author:
  - name: Ayodele Aransiola
    url : https://freecodecamp.org/news/author/leomofthings/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1760557889448/ac51a7a3-cdd8-46c9-964d-a7e281e1affc.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Supabase > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-supabase/articles/README.md",
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
  name="How to Create Role-Based Access Control (RBAC) with Custom Claims Using Firebase Rules"
  desc="When you’re building an application, not all users should have the same level of access. For example, an admin might be able to update or delete some data (logs excluded), while a regular user should only be able to read it. This is where Role-Based ..."
  url="https://freecodecamp.org/news/firebase-rbac-custom-claims-rules"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1760557889448/ac51a7a3-cdd8-46c9-964d-a7e281e1affc.png"/>

When you’re building an application, not all users should have the same level of access. For example, an admin might be able to update or delete some data (logs excluded), while a regular user should only be able to read it. This is where **Role-Based Access Control (RBAC)** comes in.

[<VPIcon icon="iconfont icon-firebase"/>Firebase](https://firebase.google.com/) makes this possible with [<VPIcon icon="iconfont icon-firebase"/>custom claims](https://firebase.google.com/docs/auth/admin/custom-claims) and security rules. In this article, you’ll learn how to:

- Add custom claims to users with the Firebase Admin SDK.
- Use Firebase Security Rules to enforce RBAC.
- Test your rules with different roles.

By the end, you’ll have a working setup where roles like `admin` and `user` are enforced directly in Firestore.

::: note Prerequisites

To follow along, you should:

- Have a Firebase project set up with Authentication and Firestore enabled.
- Be comfortable with JavaScript/Node.js.
- Have the Firebase SDK and Admin SDK installed.

If you’re new to Firebase, check out the [<VPIcon icon="iconfont icon-firebase"/>official setup guide](https://firebase.google.com/docs/web/setup) before continuing.

:::

---

## Step 1: Understand Firebase Custom Claims

Firebase custom claims allow you to attach extra information (like a role) to a user’s authentication token. You set this information **server-side** using the Admin SDK. They are included in the user’s `request.auth.token`, and you can’t set them directly from the client (for security reasons).

Here’s an example: a user’s ID token might look like this after a claim is added:

```json
{
  "user_id": "abc123",
  "email": "jane@example.com",
  "role": "admin"
}
```

In this example, the `role` field determines access privileges in your application. Firebase automatically includes this claim in the user’s ID token, so it can be securely validated both on the server and in Firestore rules.

---

## Step 2: Assign a Role with the Firebase Admin SDK

The Firebase Admin SDK allows you to manage users and assign roles securely from your backend (or through a script).

First, install the Admin SDK in a Node environment (not in your frontend app):

```sh
npm install firebase-admin
```

Then initialize it with your Firebase service account credentials:

```js
const admin = require("firebase-admin");
const serviceAccount = require("./service-account.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
```

To get your service-account.json file, navigate to your firebase settings > project settings > service account.

![an image showing the service account interface on firebase console](https://cdn.hashnode.com/res/hashnode/image/upload/v1760235082674/8f542b00-2246-4585-b267-f8cb663797ea.png)

Click on Generate private key, and it will automatically download the JSON file. You can rename the file or use it as it is.

You can now define a simple function to set a user’s role:

```js
async function setUserRole(uid, role) {
  await admin.auth().setCustomUserClaims(uid, { role });
  console.log(`Role ${role} assigned to user ${uid}`);
}
```

The `role` parameter can be anything you define, for example:

- `"admin"`: Full read/write access.
- `"editor"`: Can create or modify limited content.
- `"user"`: Read-only access.

The role you assign to a user depends on your app’s needs. In most applications, you’ll start simple, perhaps just `admin` and `user` and expand over time.

::: tip Usage example:

Once you’ve defined the function, call it with a user’s UID:

```js
setUserRole("USER_UID_HERE", "admin");
```

This securely attaches a custom claim to the user.

:::

::: note

The user must log out and log back in (or refresh their token) for the new claim to take effect.

:::

---

## Step 3: Write Firestore Security Rules for RBAC

Firestore `Security Rules` control how your data can be read or written. They are executed **before** any client request reaches your database, ensuring that your security logic isn’t bypassed.

Open your Firestore Rules (`firestore.rules`) and define role-based access like this:

![image showing the firebase rules section](https://cdn.hashnode.com/res/hashnode/image/upload/v1760234391658/9e9cf217-6291-4189-a135-8310c8905587.png)

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    match /posts/{postId} {
      // Anyone logged in can read
      allow read: if request.auth != null;

      // Only admins can write
      allow write: if request.auth.token.role == "admin";
    }
  }
}
```

Here’s what’s happening:

- `request.auth != null`: ensures the user is logged in.
- `request.auth.token.role == "admin"`: Grants write access only to users with the admin role.

You can expand this for multiple roles:

```js
allow write: if request.auth.token.role in ["admin", "editor"];
```

::: note Quick Reference

Keep these points in mind when managing Firebase RBAC:

- **Keep your roles simple** (for example, `admin`, `editor`, `user`). Don’t overcomplicate.
- **Don’t store roles in Firestore documents**. Enforce via custom claims instead.
- **Always test rules** locally before deploying.
- Remember that users must **refresh their tokens** after claims are updated.

:::

---

## Step 4: Build the Frontend with Next.js and Firebase

Let’s bring this to life with a [working demo (<VPIcon icon="iconfont icon-github"/>`CodeLeom/firebase-rbac`)](https://github.com/CodeLeom/firebase-rbac) using Next.js and Firebase.

```sh title="file structure"
firebase-rbac/
├── firebase-admin-scripts/       # Server-side scripts for setting user roles
│   ├── assignRole.js             # Uses Firebase Admin SDK to assign custom claims
│   ├── .env                      # Contains service account path and test UID
│   └── fir-rbac-...json          # Firebase Admin SDK service account json file
│
├── src/
│   ├── app/
│   │   ├── page.js               # Main Next.js page for login + post display
│   │   ├── layout.js             # Global layout
│   │   └── globals.css           # Tailwind global styles
│   └── lib/
│       └── firebase.js           # Firebase client initialization
│
├── .env.local                    # Firebase web config (NEXT_PUBLIC_ variables)
├── package.json
└── README.md
```

In your <VPIcon icon="fas fa-folder-open"/>`.env.local`, complete these variables with your Firebase project config information:

```sh title=".env.local"
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

```js title="Firebase Initialization: src/lib/firebase.js"
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
```

This component lets you log in, view posts, and, if you’re an admin, create new posts.

```jsx :collapsed-lines title="Demo Component: src/app/page.jsx"
"use client";

import { useState, useEffect } from "react";
import { auth, db } from "@/lib/firebase";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { collection, getDocs, addDoc } from "firebase/firestore";

export default function Page() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) await loadPosts();
      else setPosts([]);
    });
    return () => unsubscribe();
  }, []);

  const loadPosts = async () => {
    const snapshot = await getDocs(collection(db, "posts"));
    setPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Logged in!");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Login failed:", error.message);
      alert("Login failed: " + error.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  const handleAddPost = async () => {
    try {
      await addDoc(collection(db, "posts"), { text: newPost });
      setNewPost("");
      await loadPosts();
      alert("New Post added!");
    } catch (e) {
      alert("Opps!! Only admins can add posts.");
      console.error(e.message);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-gray-100 px-4">
      <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-lg p-8 space-y-6">
        <h1 className="text-2xl font-bold text-center text-indigo-400">
          Firebase RBAC Demo (Next.js)
        </h1>

        {/* Login Form */}
        {!user ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-gray-300 text-sm mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <button
              type="submit"
              className="w-full px-6 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition font-medium text-white"
            >
              Login
            </button>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-col items-center">
              <p className="text-gray-300 mb-2">
                Logged in as{" "}
                <span className="font-semibold text-indigo-400">
                  {user.email}
                </span>
              </p>
              <button
                onClick={handleLogout}
                className="text-sm text-red-400 hover:text-red-300 underline"
              >
                Logout
              </button>
            </div>

            <section className="border-t border-gray-700 pt-4">
              <h2 className="text-lg font-semibold text-indigo-300 mb-3">
                Posts
              </h2>

              {posts.length > 0 ? (
                <ul className="space-y-2">
                  {posts.map((p) => (
                    <li
                      key={p.id}
                      className="bg-gray-700 rounded-md px-3 py-2 text-gray-200"
                    >
                      {p.text}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400 italic">No posts yet.</p>
              )}

              <div className="mt-4 flex items-center gap-2">
                <input
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  placeholder="New post"
                  className="flex-1 px-3 py-2 rounded-md bg-gray-700 border border-gray-600 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <button
                  onClick={handleAddPost}
                  className="px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 transition font-medium text-white"
                >
                  Add
                </button>
              </div>
            </section>
          </div>
        )}
      </div>

      <footer className="mt-8 text-gray-500 text-sm">
        Built with Next.js + Firebase | &copy; FreeCodeCamp 2025
      </footer>
    </main>
  );
}
```

---

## Step 5: Test the RBAC Workflow

Now that everything is set up, it’s time to test the entire Role-Based Access Control flow to ensure your rules and roles are working correctly.

### Enable Authentication

Head over to your Firebase Console, select your project, and navigate to Authentication then Sign-in method. Select Add New Provider. Then enable Email/Password authentication. This will let you create and sign in with test users directly from your app.

![an image of authentication section on firebase](https://cdn.hashnode.com/res/hashnode/image/upload/v1760441502551/7ce05b9b-51f2-4704-83ed-1b62bf22ef2c.png)

### Configure Firestore Rules

Next, you’ll need to update the Firestore rules. Navigate to Firestore Database, located in the build drop-down. Once you’re there, click on Rules where you will be able to update the rules.

Replace the default rules with the RBAC rules you defined earlier. These rules ensure that only authenticated users can read data, and only admins can create or modify posts.

Then publish the updated version and you are good to go.

![9a34a908-0692-4f84-92c4-7526aafdbd51](https://cdn.hashnode.com/res/hashnode/image/upload/v1760441655143/9a34a908-0692-4f84-92c4-7526aafdbd51.png)

### Assign a Role to a User

To test admin permissions, assign an admin role to one of your test users. Open your terminal, change into the firebase-admin-scripts directory, and run:

```sh
cd firebase-admin-scripts
node assignRole.js
```

This executes the Admin SDK script that adds a custom claim to your test user. Once the role is set, you’ll get a message confirming that the `admin` role has been assigned to the specified user ID.

If the user is logged in already, the user must log out and log back in for the new role to take effect.

### Run the App

Now you can start your Next.js development server:

```sh
npm run dev
```

Visit `http://localhost:3000` in your browser. You should find the Firebase RBAC demo app.

### Verify Role-Based Access

Try logging in as the user who was assigned the **admin** role. Once logged in, you should be able to create new posts successfully. Next, log in as a regular user. You’ll notice that you can view existing posts, but any attempt to add a new post will fail with a “Permission denied” alert.

If you see these behaviors, then your RBAC system is working as intended!

By enforcing permissions at the Firestore layer, you ensure that security is handled centrally and can’t be bypassed by manipulating the client-side code. This approach keeps your app secure and scalable, even as your roles and data grow more complex.

Next steps:

- Add more roles (like editor, and more as you wish).
- Combine RBAC with document-level validation for fine-grained control.
- Explore Firebase’s [<VPIcon icon="iconfont icon-firebase"/>security rules](https://firebase.google.com/docs/rules/).

---

## Conclusion

You just learned a simple but important **role-based access control (RBAC)** functionality in Firebase. In this guide, we covered custom claims and how to set roles using the Admin SDK. You also learned how to enforce those roles in Firestore security rules.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Create Role-Based Access Control (RBAC) with Custom Claims Using Firebase Rules",
  "desc": "When you’re building an application, not all users should have the same level of access. For example, an admin might be able to update or delete some data (logs excluded), while a regular user should only be able to read it. This is where Role-Based ...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/firebase-rbac-custom-claims-rules.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
