---
lang: en-US
title: "How to Authenticate Your React App Using Firebase"
description: "Article(s) > How to Authenticate Your React App Using Firebase"
icon: fa-brands fa-react
category:
  - Node.js
  - React.js
  - Google
  - Firebase
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
  - google
  - google-firebase
  - firebase
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Authenticate Your React App Using Firebase"
    - property: og:description
      content: "How to Authenticate Your React App Using Firebase"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/authenticate-react-app-using-firebase.html
prev: /programming/js-react/articles/README.md
date: 2024-10-02
isOriginal: false
author: Ijeoma Igboagu
cover: https://cdn.hashnode.com/res/hashnode/image/stock/unsplash/Uw_8vSroCSc/upload/a8799e4ad43b3b8fe966910f9171ccd3.jpeg
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
  name="How to Authenticate Your React App Using Firebase"
  desc="Authentication is a fundamental aspect of modern web and mobile applications. It ensures that users can securely access an app while protecting their data. Firebase, a platform developed by Google, offers a simple and efficient way to add authenticat..."
  url="https://freecodecamp.org/news/authenticate-react-app-using-firebase"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/stock/unsplash/Uw_8vSroCSc/upload/a8799e4ad43b3b8fe966910f9171ccd3.jpeg"/>

Authentication is a fundamental aspect of modern web and mobile applications. It ensures that users can securely access an app while protecting their data.

Firebase, a platform developed by Google, offers a simple and efficient way to add authentication to your app.

In this article, I’ll walk you through the steps to authenticate your app using Firebase. Whether you're working on a web or mobile application, Firebase provides a straightforward way to integrate various authentication methods.

By the end of this article, you'll have a fully functional authentication system that allows users to sign up, sign in, and manage their accounts securely.

::: note Prerequisites

Before we begin, you need to have the following:

- **A Google Account**: Firebase is a Google product, and you need a Google account to access the Firebase Console and use Firebase services. If you don’t have a Google account, [<FontIcon icon="fa-brands fa-google"/>you can create one here](https://support.google.com/mail/answer/56256?hl=en).

:::

---

## Why Use Firebase for Authentication?

Firebase Authentication provides backend services and easy-to-use SDKs to authenticate users to your app. It supports various authentication methods, including:

- **Email and password authentication**
- **Google, Facebook, Twitter, and GitHub Authentication**
- **Phone Number Authentication**
- **Anonymous Authentication**

These features make Firebase an excellent choice for developers who want to implement secure and reliable authentication without dealing with the complexities of building a custom authentication system.

Let’s get started with the setup!

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1727802131211/b57dce67-663e-4c03-baa2-21668b543d68.jpeg)

---

## Step 1: How to Set Up a Firebase Project

Before using Firebase Authentication, you need to set up a Firebase project.

::: tabs

@tab:active i. Create a Firebase Project

Go to the [<FontIcon icon="iconfont icon-firebase"/>Firebase Console.](https://firebase.google.com/)

![Firebase website](https://cdn.hashnode.com/res/hashnode/image/upload/v1723410569746/560dfa39-e8d5-4b22-bb84-94946daeac08.png)

Click "Add Project" and follow the on-screen instructions to create a new project.

![Creating a project base](https://cdn.hashnode.com/res/hashnode/image/upload/v1727812540013/eceb505e-ea69-43f0-a845-ad26d86d5c26.gif)

Once your project is created, you’ll be directed to the Firebase project dashboard.

@tab ii. Add Your App to the Project

- In the Firebase console, click on the "Web" icon (`</>`) to add a web app to your Firebase project.
- Register your app with a nickname, and click "Register app."
- You will be provided with a Firebase SDK snippet (Software Development Kit), which you'll need to add to your app.

![Registering your project to firebase](https://cdn.hashnode.com/res/hashnode/image/upload/v1723412408046/4bf3956f-1d7d-4dff-8a70-72a757c01d2b.gif)

:::

---

## Step 2: How to Install Firebase in Your Project

To start with Firebase Authentication, you'll first need to install Firebase in your project. Here's how you can do it:

- In your code editor, open the terminal for your project.
- Run the following command to install Firebase:

```sh
npm install firebase
```

This command will add Firebase to your project, allowing you to use its authentication and other features.

---

## Step 3: How to Initialize Firebase in Your App

After installing Firebase, the next step is to initialize it in your project using the configuration snippet provided in the Firebase console, commonly referred to as the Firebase SDK snippet.

**To set this up:**

1. Create a folder named **config** in your project directory.
2. Inside the folder, create a file called <FontIcon icon="fa-brands fa-js"/>`firebase.js`.
3. Paste the SDK snippet you obtained from the Firebase console into the <FontIcon icon="fa-brands fa-js"/>`firebase.js` file.

Here’s what your project setup should look like:

![Pasting the SDK in your project](https://cdn.hashnode.com/res/hashnode/image/upload/v1723459271302/4773d484-b5a2-4cbe-9626-76765cafd9b8.png)

This code initializes Firebase in your app, enabling you to utilize Firebase authentication and other services, such as Firebase storage, for managing your data.

::: note

Ensure you generate your unique application key for your application to function correctly.

:::

---

## Step 4: How to Set Up Authentication Methods

Firebase supports multiple authentication methods, like using Google, Facebook, GitHub, and so on.

But let’s set up email and password authentication as an example:

- Go to "Authentication" in the left-hand menu in the Firebase console.
- Click on the "Sign-in method" tab.
- Enable "Email/Password" under the "Sign-in providers" section.

![Authentication using email and password](https://cdn.hashnode.com/res/hashnode/image/upload/v1723457322104/6914efdc-87cf-4fce-b84f-bd407b6b4918.gif)

Now that you've enabled email/password authentication, you can create a sign-up and a sign-in function in your app.

Let’s create a working example of a sign-up function:

- In your project, create a file named **sign-up.jsx**.
- Import the function needed to create a user from Firebase. The function you'll use to create a user is `createUserWithEmailAndPassword`.
- Before creating a user, make sure to import the auth instance that is initialized in **firebase.js** into the **sign-up.jsx** file.

```js
import { auth } from '../../../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const SignUp = () => {
  // To create the user with email and password
  const handleUser = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('User created successfully');
    } catch (err) {
      console.error(err);
    }
  };

  // ... (rest of your SignUp component)
};
```

In the return statement, I will use a form, so we need to import the `useState()` Hook to manage and track changes in the form's input fields.

```html
<div>
  <h2>Register your Account</h2>
  <form onSubmit={handleCreateUser}>
    <div>
      <label>Name</label>
      <input
        type="text"
        id="name"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </div>

    <div>
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>

    <div>
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>

    <div>
      <label htmlFor="confirm_password" className={styles.label}>
        Confirm Password
      </label>
      <input
        type="password"
        id="confirm_password"
        name="confirm_password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
    </div>

    <div>
      <div>
        <input type="checkbox" id="terms" name="terms" className="mr-2" />
        <label htmlFor="terms">
          I agree to the <a href="#">Terms and Conditions</a>
        </label>
      </div>
    </div>

    <button type="submit">Register</button>
  </form>
</div>
```

Putting all code together (<FontIcon icon="fa-brands fa-react"/>`Sign-up.jsx`):

```jsx
import { useState } from 'react';
import { auth } from '../../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('User created successfully');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Register your Account</h2>
      <form onSubmit={handleCreateUser}>
        <div>
          <label>Name</label>
          <input
            type='text'
            id='name'
            name='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor='confirm_password'>
            Confirm Password
          </label>
          <input
            type='password'
            id='confirm_password'
            name='confirm_password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <div>
          <div>
            <input
              type='checkbox'
              id='terms'
              name='terms'
              className='mr-2'
            />
            <label htmlFor='terms'>
              I agree to the{' '}
              <a href='#'>
                Terms and Conditions
              </a>
            </label>
          </div>
        </div>

        <button type='submit'>Register</button>
      </form>
    </div>
  );
};

export default SignUp;
```

Now that you've created the sign-up function, it's time to add a sign-in function so users can log into your app.

Here's how to create a simple sign-in function:

- In your project, create a new file named <FontIcon icon="fa-brands fa-react"/>`sign-in.jsx`.
- Import the initialized `auth` instance from <FontIcon icon="fa-brands fa-js"/>`firebase.js` into <FontIcon icon="fa-brands fa-react"/>`sign-in.jsx`.
- Use the `signInWithEmailAndPassword` function from Firebase to allow users to sign in.

Here’s the structure for the sign-in function:

```jsx
import { useState } from 'react';
import { auth } from '../../config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Signed in successfully');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Sign In</h2>
      <form onSubmit={handleSignIn}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;
```

The visual display of the result from the code above both sign-up and sign-in

![Visual Result of signup and signin put together](https://cdn.hashnode.com/res/hashnode/image/upload/v1727813072045/5a91493d-69a0-4a90-98b2-61905b23e460.gif)

---

## Authentication Method Using Google

As mentioned earlier, you can collect users' emails directly through a form before they use your app and other ways to authenticate the users.

**To use Google authentication:**

- In the Firebase console, navigate to "Authentication" in the left-hand menu.
- Click on the "Sign-in method" tab.
- Enable "Google" under the "Sign-in providers" section (for this tutorial, we'll stick with Google, though you can choose other providers).

![Enabling Google Auth](https://cdn.hashnode.com/res/hashnode/image/upload/v1727813344687/f1838b83-9af9-42a7-bf98-6a7d617cedc3.gif)

Now that you've enabled Google authentication, you can create a Google sign-up and sign-in function for your app.

Let's go through how to set up a Google sign-up function:

- First, create a file named <FontIcon icon="fa-brands fa-react"/>`Google.jsx` in your project.
- Import `auth` and `GoogleAuthProvider` from the <FontIcon icon="fa-brands fa-js"/>`firebase.js` file

```js
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';


const firebaseConfig = {
  apiKey: ....,
  authDomain: ....,
  projectId:.... ,
  storageBucket: .... ,
  messagingSenderId: .... ,
  appId: ....,
  measurementId: ....,
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth= getAuth(app);
export const googleProvider = new GoogleAuthProvider(app);
```

- Initialize the Google provider and export it for use in other parts of your application.

```js
import { auth, googleProvider } from './firebase';  // Adjust the path to your Firebase config file
import { signInWithPopup } from 'firebase/auth';
```

- Import the necessary Firebase function to authenticate a user. Use the `signInWithPopup` method to authenticate users with Google.

While there are other authentication methods available, `signInWithPopup` is preferable as it keeps users within the app, avoiding the need to open a new browser tab.

```jsx
const signInWithGoogle = async () => {
  try {
    await signInWithPopup(auth, googleProvider);
    alert('Signed in successfully with Google');
  } catch (error) {
    console.error('Error signing in with Google', error);
  }
};
```

- In your return statement, create a button to trigger the Google sign-in.

```jsx
return (
  <div>
    <button onClick={signInWithGoogle}>Sign in with Google</button>
  </div>
);
```

The visual display of the result from the code above:

![Using `signInWithPop()`](https://cdn.hashnode.com/res/hashnode/image/upload/v1727813634035/14c00c73-f289-480a-a396-3abd839b3a75.gif)

Firebase allows you to sign users out of your application easily. Here's how you can implement a sign-out function:

- First, import the `signOut` function from Firebase.
- Once imported, you can call `signOut` to log the user out of the app.

Here’s a simple example:

```js
import { auth } from './config/firebase'; // Adjust the path based on your file structure
import { signOut } from 'firebase/auth';

const handleSignOut = async () => {
  try {
    await signOut(auth);
    alert('User signed out successfully');
  } catch (error) {
    console.error('Error signing out:', error);
  }
};
```

With this function, users can easily log out of the app.

In the return statement, you'll typically have a button that triggers the `handleSignOut` function when clicked.

```jsx
return (
  <div>
    <h2>Welcome to the app!</h2>
    <button onClick={handleSignOut}>Sign Out</button>
  </div>
)
```

The visual display of the result from the code above

![`signOut()` visual display](https://cdn.hashnode.com/res/hashnode/image/upload/v1727813736679/21c2162b-b376-43b7-87cb-242d78acef38.gif)

Make sure your Firebase project is configured to handle authentication correctly, including Google sign-in, to ensure a smooth sign-in and sign-out experience.

---

## Step 5: How to Upload to GitHub

Before pushing your project to GitHub, make sure to store your Firebase API key in an environment variable to keep it secure. This will prevent sensitive information from being exposed in your shared code.

### Creating a <FontIcon icon="fas fa-file-lines"/>`.env` file

- At the root of your application, create a <FontIcon icon="fas fa-file-lines"/>`.env` file.

![Storing the API keys in <FontIcon icon="fas fa-file-lines"/>`.env` file](https://cdn.hashnode.com/res/hashnode/image/upload/v1727813941388/5e647b8c-c76b-4671-b44b-21ac4dcddc89.png)

- Add your Firebase API key to the <FontIcon icon="fa-brands fa-js"/>`firebase.js` file.
- Use `import` or `process.env` to access your Firebase API key. Since the app was created with Vite, I used `import`.

![Firebase file](https://cdn.hashnode.com/res/hashnode/image/upload/v1727814253953/514db02f-44f8-44fc-b03c-4cf77cb5c4ba.png)

- Finally, update your **.gitignore** file to include the<FontIcon icon="fas fa-file-lines"/>`.env` file. This step also protects other sensitive files and directories, like <FontIcon icon="fas fa-folder-open"/>`node_modules`.

```gitignore
# Logs
logs
node_modules
.env
```

---

## Conclusion

In conclusion, this guide explains how to integrate Firebase Authentication into your app. Firebase simplifies adding authentication features such as email/password and Google login.

By setting up a Firebase project, installing, and initializing it in your app, you can efficiently build secure user sign-up and sign-in functionalities without the need to start from scratch or set up a server.

If you found this article helpful, share it with others who may also find it interesting.

Stay updated with my projects by following me on [Twitter (<FontIcon icon="fa-brands fa-x-twitter"/>`ijaydimples`)](https://x.com/ijaydimples), [LinkedIn (<FontIcon icon="fa-brands fa-linkedin"/>`ijeoma-igboagu`)](https://linkedin.com/in/ijeoma-igboagu/) and [GitHub (<FontIcon icon="iconfont icon-github"/>`ijayhub`)](https://github.com/ijayhub).

The code I used for this tutorial article can be found on my [GitHub (<FontIcon icon="iconfont icon-github"/>`ijayhub/authentication-example-tutorial`)](https://github.com/ijayhub/authentication-example-tutorial).

Thank you for reading.