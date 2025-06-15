---
lang: en-US
title: "How to Build a Realtime Chat Application with Angular 20 and Supabase"
description: "Article(s) > How to Build a Realtime Chat Application with Angular 20 and Supabase"
icon: fa-brands fa-angular
category:
  - Node.js
  - Angular.js
  - Supabase
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - angular
  - angularjs
  - angular-js
  - ng
  - supabase
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build a Realtime Chat Application with Angular 20 and Supabase"
    - property: og:description
      content: "How to Build a Realtime Chat Application with Angular 20 and Supabase"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-realtime-chat-app-with-angular-20-and-supabase.html
prev: /programming/js-angular/articles/README.md
date: 2025-06-17
isOriginal: false
author:
  - name: deji adesoga
    url : https://freecodecamp.org/news/author/desoga/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1750094888966/7ac31fee-bd4d-4353-b8cb-911ac60b4516.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Angular.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-angular/articles/README.md",
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
  name="How to Build a Realtime Chat Application with Angular 20 and Supabase"
  desc="Chat applications let you talk in real-time with your friends, family, or coworkers, and help you quickly, effectively, and efficiently transfer of information. When you’re building modern web applications, chat applications are now pretty much a req..."
  url="https://freecodecamp.org/news/how-to-build-a-realtime-chat-app-with-angular-20-and-supabase"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1750094888966/7ac31fee-bd4d-4353-b8cb-911ac60b4516.png"/>

Chat applications let you talk in real-time with your friends, family, or coworkers, and help you quickly, effectively, and efficiently transfer of information. When you’re building modern web applications, chat applications are now pretty much a requirement to enable collaboration and enhanced the user experience.

In this tutorial, we will break down how to build a chat application using modern technologies like Angular and Supabase. Building this chat application will help you learn features such as Google OAuth 2.0 for authentication, Angular router for navigation, the `CanActivate` route guard for route protection, and how to call Supabase functions to create, fetch and delete chats.

On the backend, you will learn how to create database tables in Supabase. You’ll also learn about Supabase functions and Supabase triggers.

---

## Table of Contents

(1/14) [Installations and Account Configuration:](#heading-installations-and-account-configuration)
(2/14) [How to Create the User Interface of the Angular Application](#heading-how-to-create-the-user-interface-of-the-angular-application)
(3/14) [How to Set Up a New Supabase Project](#heading-how-to-set-up-a-new-supabase-project)
(4/14) [How to Set Up Google OAuth 2.0 for Authentication and Authorization](#heading-how-to-set-up-google-oauth-20-for-authentication-and-authorization)
(5/14) [How to Configure the Router of the Angular Application](#heading-how-to-configure-the-router-of-the-angular-application)
(6/14) [How to Set Up the Authentication Service](#heading-how-to-set-up-the-authentication-service)
(7/14) [How to Create Route Protection in Angular](#heading-how-to-create-route-protection-in-angular)
(8/14) [How to Create and Setup the Users Table in Supabase using the SQL Editor](#heading-how-to-create-and-setup-the-users-table-in-supabase-using-the-sql-editor)
(9/14) [How to Create and Setup the Chat Table in Supabase using the User Interface](#heading-how-to-create-and-setup-the-chat-table-in-supabase-using-the-user-interface)
(10/14) [How to Create and Setup the Chat Table Policies in Supabase](#heading-how-to-create-and-setup-the-chat-table-policies-in-supabase)
(11/14) [How to Integrate Functionality to Create a New Chat Message in the Angular Application](#heading-how-to-integrate-functionality-to-create-a-new-chat-message-in-the-angular-application)
(12/14) [How to Fetch Data in the Angular Application from Supabase](#heading-how-to-fetch-data-in-the-angular-application-from-supabase)
(13/14) [How to Delete Data in the Angular Application](#heading-how-to-delete-data-in-the-angular-application)
(14/14) [How to Implement Logout Functionality in the Angular Application](#heading-how-to-implement-logout-functionality-in-the-angular-application)

::: note Prerequisites

- HTML
- JavaScript
- TypeScript

:::

---

## Installations and Account Configuration:

Before we begin, make sure you have the following installed and ready:

- **Node.js and npm:** Angular requires Node. You can check to see if you have it (and what version you have) by running `node -v` in your terminal.
- **Angular CLI:** This is the command-line tool to scaffold and manage Angular projects. If you don’t have it, install it with `npm install -g @angular/cli`. Verify with `ng version`.
- **A Supabase account:** Supabase offers a free tier. Sign up on the [<FontIcon icon="iconfont icon-supabase"/>Supabase](http://supabase.com/) website if you haven’t already.

You can also watch the video version of this article below, or on my [<FontIcon icon="fa-brands fa-youtube"/>YouTube channel](https://youtu.be/8SRhekaJ5iI):

<VidStack src="youtube/8SRhekaJ5iI" />

---

## How to Create the User Interface of the Angular Application

To create the user interface of the application, we’ll use [<FontIcon icon="fas fa-globe"/>Bootstrap 5](https://getbootstrap.com/docs/5.0/getting-started/introduction/). In the `index.html` file of the Angular application, you are going to paste the Bootstrap 5 CDN link as seen below:

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <title>NgChat</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" 
    rel="stylesheet"
    integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" 
    crossorigin="anonymous">
</head>

<body>
  <app-root></app-root>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
    crossorigin="anonymous"></script>
</body>

</html>
```

Above, you have two CDN links from Bootstrap 5. The first is the `<link>` tag within the head section, while the second is the `<script>` tag which is right below the `<app-root></app-root>` tag.

Now that you have the Bootstrap 5 CDN link setup within the project, the next step is to create two new components called **chat** and **login**, respectively, within a pages folder. You can do that using the command below:

```sh
ng g c pages/chat-component && ng g c pages/login-component
```

The <FontIcon icon="fa-brands fa-html5"/>`login-component.html` is going to contain the code below:

```html title="login-component.html"
<section class="login-block">
  <div class="container">

    <div class="row">
      <div class="col-md-12">
        <a class="btn btn-lg btn-google btn-block text-uppercase btn-outline" href="#"><img
            src="https://res.cloudinary.com/dz4tt9omp/image/upload/v1712537582/google-logo.png"> Signup Using Google</a>
      </div>
    </div>
  </div>
</section>
```

While the <FontIcon icon="fa-brands fa-css3-alt"/>`login-component.css` will contain the code below:

```css title="login-component.css"
.login-block {
  width: 300px;
  margin: 0 auto;
  display:flex;
  justify-content:center;
  align-items:center;
  height:100vh;
}

.btn {
  border-radius: 2px;
  text-transform: capitalize;
  font-size: 15px;
  padding: 10px 19px;
  cursor: pointer
}


.btn-google {
  color: #545454;
  background-color: #ffffff;
  box-shadow: 0 1px 2px 1px #ddd;
}
```

To see how the user interface looks, you can call the `<app-login />` tag with the <FontIcon icon="fa-brands fa-html5"/>`app.component.html` file, since the route navigations have not yet been configured. The user interface should look like the screenshot below:

![Screenshot of a web page running on localhost at port 4200. The page displays a centered white background with a single button labeled "SIGNUP USING GOOGLE" that includes a Google logo icon. The button is slightly elevated with a shadow effect.](https://cdn.hashnode.com/res/hashnode/image/upload/v1746232060227/98f18b59-d433-486b-adbe-f28302e8d901.png)

---

## How to Set Up a New Supabase Project

To set up Supabase, you will need to create a new account on [<FontIcon icon="iconfont icon-supabase"/>Supabase.com](https://supabase.com/) by using either a GitHub account, or the traditional email and password. Once you’ve done this, you will be presented with a form to create a new organization as you can see in the image below:

![Supabase form to create a new organization with name, type, and plan fields.](https://cdn.hashnode.com/res/hashnode/image/upload/v1747178536860/972076bf-ae5e-4b33-b18c-011e1e63b3a0.png)

The organization will be created as fast as your internet speed. Once that is done, the next form you’ll see will allow you to create a new Supabase project.

![Supabase interface for creating a new project, showing fields for organization, project name, database password, and region selection.](https://cdn.hashnode.com/res/hashnode/image/upload/v1747180463389/a41cd54d-4514-4a8b-8230-a348723b0a2f.png)

As you can see from the image above, all you need to do to create a new project is to set a database password and select a region close to where you think most of your users will be. This will help reduce latency. With that you can now click on the create button to create a new project.

Once the project creation is complete, you will be navigated to the dashboard below:

![Supabase dashboard showing a new project with no tables and a task list in progress.](https://cdn.hashnode.com/res/hashnode/image/upload/v1747180885966/b9b89775-36cb-49e8-a596-c5ae4bad75a7.png)

With that, you have now set up your new Supabase project.

---

## How to Set Up Google OAuth 2.0 for Authentication and Authorization

To set up Google OAuth 2.0, you need to create an account on [<FontIcon icon="iconfont icon-gcp"/>Google Cloud Console](https://console.cloud.google.com). Once you create an account, you will be navigated to the dashboard, where you can create a new project by clicking on the select project button on the top left-hand side of the dashboard.

![Google Cloud console welcome page showing a $300 free credit offer. A 'Select a project' button is highlighted near the top.](https://cdn.hashnode.com/res/hashnode/image/upload/v1747353793461/b42cd8f9-5a6c-4579-be15-074f9bf90e13.png)

Once you’ve selected the newly created project, you can now begin implementing Google OAuth 2.0 by following these steps:

- Click on the hamburger menu on the left-hand side of the dashboard and hover over **APIs and services.**
- Click on **Credentials**, on the Credentials page, select **Create Credentials** at the top menu of the dashboard. A dropdown menu will appear. Select **Create OAuth client ID**.
- On the Client ID page, you’ll get a warning message that says “To create an OAuth client ID, you must first configure your consent screen.” Click on the **Configure consent screen** button.

Next, you’ll be directed to the Branding page. Click on the getting Started button, and you’ll be presented with a form on the overview page as you can see below. Then just fill out the form:

![Google Cloud console showing the 'Create branding' page under the Google Auth Platform. The user is filling out app information, including app name and support email, as part of the project configuration steps.](https://cdn.hashnode.com/res/hashnode/image/upload/v1747358499033/47c07eda-9b1e-45ce-ae0b-bb478178a0a2.png)

You can now create the OAuth Consent Screen by heading to the Clients tab on the left-side of the dashboard and filling out the details for your application type, the name of your OAuth 2.0 client, as well as the Authorized JavaScript origins.

For the Authorized JavaScript origins, you can enter the URL (`http://localhost:4200`), since that is the development URL for our Angular application. Then click on the create button. You may get a warning saying “Note: It may take five minutes to a few hours for settings to take effect.”

Once the configuration is complete, you will get a modal that contains a Client ID and a Client Secret, as you can see below:

![A Google Cloud OAuth client creation dialog displays the Client ID, Client secret, creation date, status as enabled, and a warning about downloading credentials before June 2025.](https://cdn.hashnode.com/res/hashnode/image/upload/v1747361106624/6ba6ed98-469a-4154-9d47-6719d982176e.png)

Make sure you copy the Client ID and Client secret, as you will use this in the Supabase dashboard.

To complete the authentication and authorization setup, head to the Supabase dashboard. Then navigate to the Authentication menu, which is located in the items on the left-side of the dashboard. On this part of the dashboard, you will select **Sign In / Providers**.

On the Sign In / Providers page, scroll down to the **Auth Providers**, then select and enable **Google**. This is where you will paste in the credentials of the Client ID and Client Secret created on the **Google Cloud Console**. Then click on the save button – and make sure you copy the Callback URL (for OAuth).

The final step in this process is to head back to the GCP dashboard, and under the Clients tab, click on the edit icon of the OAuth 2.0 Client IDs you created previously.

Under the Authorized redirect URIs, click on the Add URI button. An input box will appear. Paste in the link of the Callback URL (for OAuth) you grabbed in the Supabase dashboard and click save.

---

## How to Configure the Router of the Angular Application

Earlier in this tutorial, you created two components: Chat and Login. At this point, you need to setup the route configuration in the <FontIcon icon="iconfont icon-typescript"/>`app.routes.ts`. In this file, add the code below:

```ts title="app.routes.ts"
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'chat',
    loadComponent: () =>
      import('./pages/chat/chat-component').then((com) => com.ChatComponent),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login-component').then((com) => com.LoginComponent),
  },
  {
    path: '',
    loadComponent: () =>
      import('./pages/login/login-component').then((com) => com.LoginComponent),
  },
];
```

Above, you can see the two components now have their separate routes called **chat** and **login**, respectively. They can be accessed anywhere in the application.

---

## How to Set Up the Authentication Service

To setup the authentication service in the Angular application, use the following command:

```sh
ng g s services/auth-service
```

Next, you’ll generate the environments folders to setup the environment variables using the below command:

```sh
ng g environments
```

The final configuration you need to do from the terminal before you begin creating the function for the Angular authentication service is to install Supabase with the command below:

```sh
npm i @supabase/supabase-js
```

And with that, you now have Supabase installed in the project and you can begin integrating the functions in the service. Start from the `environment.development.ts` file**.** The current structure of this file should look this way by default:

```ts
export const environment = {};
```

To configure this file, you need to head to the Supabase dashboard. Locate and select the settings menu on the left hand panel of the dashboard. Under the **Configuration** tab, click on Data API.

![Screenshot of Supabase API settings, showing the project URL and API keys section with arrows pointing to the URL and keys, plus buttons to copy each credential.](https://cdn.hashnode.com/res/hashnode/image/upload/v1747569518560/94ae00c7-4f62-4cc7-a0f9-250088754acb.png)

You can now grab both the Project URL and anon public key (the arrow is pointing to it in the image above). You can now head over to the <FontIcon icon="iconfont icon-typescript"/>`environment.development.ts` file and paste in the values of the copied link following the format below:

```ts title="environment.development.ts"
export const environment = {
  production: false,
  supabaseUrl: 'https://zktqzszvllbxvjfzkhvk.supabase.co',
  supabaseKey:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InprdHF6c3p2bGxieHZqZnpraHZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyNTg3MDgsImV4cCI6MjA2MjgzNDcwOH0.qf3MA-La6se8QijzLFALKc_XdiISmzDk7AZw4-na0uA',
};
```

With the environment variables all in place, you can now create the functions for the authentication service.

In the <FontIcon icon="iconfont icon-typescript"/>`auth-service.ts` which you created previously, start by importing the Supabase package as well as the environments file as you can see below:

```ts title="auth-service.ts"
import { Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment.development';
```

Next, complete the injection of the Supabase `npm` package by injecting it into your constructor:

```ts title="auth-service.ts"
import { Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  supabase!: SupabaseClient;

  constructor() {
      this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }
}
```

### How to Create the Service Functions for Login and Sign Out Functionality

The final step in setting up the `Authservice` is to create the functions which will later be called in the template. You are going to create four functions which you can see in the code below:

```ts :collapsed-lines title="auth-service.ts"
export class AuthService {
  private router = inject(Router);
  private _ngZone = inject(NgZone);

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );

    this.supabase.auth.onAuthStateChange((event, session) => {

      localStorage.setItem('session', JSON.stringify(session?.user));

      if (session?.user) {
        this._ngZone.run(() => {
          this.router.navigate(['/chat']);
        });
      }
    });
  }

  get isLoggedIn(): boolean {
    const user = localStorage.getItem('session') as string;

    return user === 'undefined' ? false : true;
  }

  async signInWithGoogle() {
    await this.supabase.auth.signInWithOAuth({
      provider: 'google',
    });
  }

  async signOut() {
    await this.supabase.auth.signOut();
  }
}
```

The first function created is within the constructor. This is the `onAuthStateChange` callback function which is derived from Supabase and allows us to listen to Auth changes. It accepts two parameters called `event` and `session`.

Here, two conditions were instantiated within the `onAuthStateChange` callback function. They say that when the `session?.user` exists, you proceed to set the value to the local storage, and then navigate the user to the dashboard using the Angular router (which has been imported and injected using the `inject()` function).

The second function, `isLoggedIn()`, is a getter function that returns a Boolean. It returns either true or false, depending on if it is able to retrieve the user session from `localStorage`. This function will be used in the authentication guard which you’ll create later.

The third function, `signInWithGoogle()`, allows the user log into the dashboard using the `signInWithOAuth()` method provided by Supabase. This allows the user to log into the dashboard using a Google Gmail account.

The final function, `signOut()`, allows users to logout of the dashboard by resetting the state of the user session to null.

With all these functions created, the final code base in the <FontIcon icon="iconfont icon-typescript"/>`auth-service.ts` should look like this:

```ts :collapsed-lines title="auth-service.ts"
import { Injectable, NgZone, inject } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment.development';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private supabase!: SupabaseClient;

  private router = inject(Router);
  private _ngZone = inject(NgZone);
  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );

    this.supabase.auth.onAuthStateChange((event, session) => {
      console.log('event', event);
      console.log('session', session);

      localStorage.setItem('session', JSON.stringify(session?.user));

      if (session?.user) {
        this._ngZone.run(() => {
          this.router.navigate(['/chat']);
        });
      }
    });
  }

  get isLoggedIn(): boolean {
    const user = localStorage.getItem('session') as string;

    return user === 'undefined' ? false : true;
  }

  async signInWithGoogle() {
    await this.supabase.auth.signInWithOAuth({
      provider: 'google',
    });
  }

  async signOut() {
    await this.supabase.auth.signOut();
  }
}
```

You can now utilize these functions anywhere in the Angular project as a form of state management.

### How to Integrate the Authentication Service Function in the Template

The first function we’ll use is the `signInWithGoogle()` function. We’ll use it in the <FontIcon icon="iconfont icon-typescript"/>`login-component.ts` file to allow users log into the application as you can see below:

```ts title="login-component.ts"
import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent {
  private auth = inject(AuthService);

  async handleAuth() {
    const response = await this.auth.signInWithGoogle();
  }
}
```

Above, you implemented three features:

- Importing `AuthService` into the `LoginComponent`
- Injecting `AuthService` using the Inject function into the `LoginComponent`
- Creating the `handleAuth()` function that allows you call the `signInWithGoogle()` from the `AuthService` file.

Now you can head to the <FontIcon icon="fa-brands fa-html5"/>`login-component.html` file and call the `handleAuth()` function as below within the `<a>` tag:

```html title="login-component.html"
<section class="login-block">
  <div class="container">

    <div class="row">
      <div class="col-md-12">
        <a (click)="handleAuth()" class="btn btn-lg btn-google btn-block text-uppercase btn-outline" href="#"><img
            src="https://res.cloudinary.com/dz4tt9omp/image/upload/v1712537582/google-logo.png"> Signup Using Google</a>
      </div>
    </div>
  </div>
</section>
```

Before you test the implementation, you will need to set the URL configuration in the Supabase dashboard. The URL configuration allows the URLs that authentication providers permit to redirect and post authentication, including wildcards.

![Interface displaying authentication settings, including site URL configuration and allowed redirect URLs for a web application.](https://cdn.hashnode.com/res/hashnode/image/upload/v1748363896805/0b8f2ed1-ba45-44b9-93b8-0f470cb5ff32.png)

As you can see in the above image, the two Redirect URLs provided are localhost, since we are still currently creating the app in our local machine.

With this, you can test the Google OAuth 2.0 configuration by typing the localhost URL (`http://localhost:4200`) in the browser, clicking on the **Signup Using Google** button**,** and selecting a Gmail account you want to sign up/login with. Then you should get navigated to the Chat component.

---

## How to Create Route Protection in Angular

To create route protection in Angular, you can use an in-built mechanism called a **Route Guard**. The Route Guard is used to control access to certain parts of the Angular application using certain conditions before a route is activated or accessible to the user.

In our case, you will be generating the Route Guard as a function (which is the default in our current version of Angular (20), instead of as a class) using the command below:

```sh
ng generate guard auth-guard
```

![You will then see this prompt that asks “Which type of guard would you like to create?”](https://cdn.hashnode.com/res/hashnode/image/upload/v1748365560338/650c5bf7-8e1c-45cf-915b-c988c167416a.png)

Use the spacebar to select `CanActivate`, and then press the Enter key to generate the Guard. Two files will be generated: the <FontIcon icon="iconfont icon-typescript"/>`auth-guard.spec.ts` file (for testing), and the <FontIcon icon="iconfont icon-typescript"/>`auth-guard.ts` file. Within the <FontIcon icon="iconfont icon-typescript"/>`auth-guard.ts` file, you will see the boilerplate code below:

```ts title="auth-guard.ts"
import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  return true;
};
```

You can start modifying the above template by importing the Angular Router, the `AuthService` file that you created earlier, as well as the Inject function:

```ts title="auth-guard.ts"
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth-service';
import { inject } from '@angular/core';
```

Next, use the `isLoggedIn` getter that you created earlier in the `AuthService` file (which returns a Boolean) to conditionally activate the Chat dashboard for the user based on their login status using the code below:

```ts title="auth-guard.ts"
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth-service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  if (inject(AuthService).isLoggedIn === false) {
    inject(Router).navigate(['/login']);
    return false;
  } else {
    return true;
  }
};
```

To complete the Guard integration, head over to the <FontIcon icon="iconfont icon-typescript"/>`app.routes.ts` file and import and inject the Authentication Guard as you can see below:

```ts :collapsed-lines title="app.routes.ts"
import { Routes } from '@angular/router';
import { authGuard } from './auth-guard';

export const routes: Routes = [
  {
    path: 'chat',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/chat/chat-component').then((com) => com.ChatComponent),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login-component').then((com) => com.LoginComponent),
  },
  {
    path: '',
    loadComponent: () =>
      import('./pages/login/login-component').then((com) => com.LoginComponent),
  },
];
```

With this, the route protection implementation is now complete and only authenticated users can view the dashboard.

---

## How to Create and Setup the Users Table in Supabase using the SQL Editor

To create and setup the users table, use the schema below:

- `id` (uuid)
- `full_name` (text)
- `avatar_url` (text)

You can use the **SQL** Editor in Supabase. The SQL Editor is the third item on the menu panel in the Supabase dashboard. Here you are going to type in the query below in the SQL Editor input field:

```sql
CREATE TABLE public.users (
  id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  full_name TEXT NULL,
  avatar_url TEXT NULL,
  PRIMARY KEY (id)
);
```

You can now click on the Run button on the bottom right. You should get a message that says: **Success. No rows returned**, as you can see in the image below:

![SQL code for creating a user profile table with fields for id, full name, and avatar URL. Returns No rows returned after execution.](https://cdn.hashnode.com/res/hashnode/image/upload/v1748394167618/5db26c97-a947-4233-8232-3aba72187a12.png)

Now let’s go ahead and enable row level security, as well as the Supabase function and trigger.

### How to Configure Row Level Security Policies in Supabase with the SQL Editor

Row Level Security (RLS) in Supabase allows you to control access to individual rows in your database tables based on custom logic. It’s one of the core features for building secure, multi-user applications with Supabase.

RLS lets you define SQL policies that determine which users can `SELECT`, `INSERT`, `UPDATE`, or `DELETE` specific rows in a table.

To enable RLS in the **users** table, type the command below in your SQL Editor:

```sql
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
```

For the purpose of this tutorial, you are going to create just two policies, which are:

1. The ability for users to access their own profile
2. The ability for users to update their own profile

#### The ability for users to access their own profile

To enable users access their own profile, head back to the SQL editor and create a new snippet with the following query:

```sql
CREATE POLICY "Permit Users to Access Their Profile"
ON public.users
FOR SELECT USING ( auth.uid() = id );
```

With this query, users will be able to access their own profile as long as the authenticated user’s ID matches the `id` of the column of the row.

#### The ability for users to update their own profile

To enable users update their own profile, head back to the SQL editor and create a new snippet with the following query:

```sql
CREATE POLICY "Permit Users to Update Their Profile"
ON public.users
FOR UPDATE USING ( auth.uid() = id );
```

With the above query, users will be able to update their own profile as long as the authenticated user’s ID matches the `id` of the column of the row.

![Screenshot of SQL Editor displaying a policy script for user profile updates, with navigation pane and no results returned.](https://cdn.hashnode.com/res/hashnode/image/upload/v1748397263186/11e886f4-0d08-4907-9859-9269ee0da2ef.png)

### How to Configure Supabase Functions in Supabase with the SQL Editor

**Supabase Functions** are serverless functions that can be deployed and run within your Supabase project using **Supabase Edge Functions**.

In this project, you will create a trigger function that automatically creates a new row in the users table whenever a new user is created in the `auth.users` table.

```sql
CREATE OR REPLACE FUNCTION public.user_profile() RETURNS TRIGGER AS $$ 
  BEGIN
    INSERT INTO public.users (
      id, full_name, avatar_url
    ) VALUES (
      NEW.id,
      NEW.raw_user_meta_data ->> 'full_name'::TEXT,
      NEW.raw_user_meta_data ->> 'avatar_url'::TEXT
    );
    RETURN NEW;
  END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

To summarize the above query:

- You start by defining or replacing a function named `user_profile()` that will be used as a trigger.
- Next, the trigger inserts a new row into the `public.users` table, and then extracts the `full_name` and `avatar_url` from the user's metadata as text.
- The inserted record is now returned when the trigger function is complete
- Finally, you use the `SECURITY DEFINER` keyword so that the function can run with the privileges of the user who created it.

### How to Configure Supabase Trigger in Supabase with the SQL Editor

A trigger in Supabase is a PostgreSQL feature used to automatically run a function in response to events on a table (SELECT, INSERT, UPDATE, or DELETE). It’s mostly used with Row Level Security or syncing data across tables.

In this project, you will create a Supabase trigger that automatically runs a function after a new user is created in the `auth.users` table.

```sql
CREATE TRIGGER create_user_trigger
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE PROCEDURE
public.user_profile();
```

To summarize the above query:

- The first line creates a **trigger** named `create_user_trigger`.
- Next, the INSERT ON statement is activated when a user signs up and a new row is inserted into the `auth.users` table
- Then the trigger runs once for every new user added in a new row.
- Finally, the custom function `public.user_profile()` is called to perform some logic, typically inserting data into the `users` table.

With the above integration, you can now log into the dashboard with a new google account and view the users table. There you will see the data that contains the **id**, **full_name**, and **avatar_url** as you can see below:

![Screenshot of a database table editor displaying user data, including name and avatar URL, with options for filtering and sorting.](https://cdn.hashnode.com/res/hashnode/image/upload/v1748560146471/4c7663a8-6708-461a-8ed5-7ed8a3931318.png)

---

## How to Create and Setup the Chat Table in Supabase using the User Interface

To create the chat table, you will use the user interface in Supabase instead of the SQL Editor. To do this, you need to head to the Table Editor menu on the dashboard and click on the **New Table** button.

Once selected, a modal will popup which contains some input fields such as the table name, description, and columns. You can call the table name chat and omit the description for now since it’s optional. In the columns section, fill out the fields using the schema below:

- `id` (uuid)
- `created_at` (date)
- `text` (text)
- `editable` (boolean)
- `sender` (uuid)

You can see the configuration for this in the table below:

![Screenshot of a table editor interface displaying fields for creating a new database table with various data types and options.](https://cdn.hashnode.com/res/hashnode/image/upload/v1748564800333/0e879684-75d3-4c47-9f38-56d6041d6b38.png)

Next up, you need to add a foreign key relation for the users table. To do this, you scroll to the bottom of the modal and click on the **Add foreign key relation** button. This will prompt another modal on top of the current modal. Here you can take the following steps:

- Under the **Select a table to reference to** label, select the **users** table**.**
- Under the **public.chat** label, select the **sender** option.
- Under public.users label, select **uuid.**
- Under the **Action if referenced row is updated** label, select **Cascade**.
- Under the **Action if referenced row is removed** label, select **Cascade** as well.

If you’ve followed the above steps, you can now click on the save button, which successfully creates the chat table.

---

## How to Create and Setup the Chat Table Policies in Supabase

The final step you need to perform for the chat table is to add a Row Level Security policy. You can do this by clicking the **Add RLS policy** button at the top of the chat table page.

![A web interface displaying a Table Editor with options for managing chat and user data in a database schema.](https://cdn.hashnode.com/res/hashnode/image/upload/v1748567233239/6f69e305-5e09-4485-89b7-0115d41c8e0f.png)

A new page will appear. Then you can click on the **Create policy** button, which displays a modal.

The first policy you will create is the **DELETE** policy, which will have the configuration you can see in the image below:

![Screenshot of a database policy settings interface for deleting user records based on user ID in a chat application.](https://cdn.hashnode.com/res/hashnode/image/upload/v1748779442105/f977dafb-ab73-4bb7-8643-9aa4e889c359.png)

From the above image, we made these four implementations:

- First, we entered the policy name as “**Delete by User ID**“.
- Next we selected the `DELETE` policy command clause.
- Then under the targeted roles, we selected authenticated in the drop down select, to allow only authenticated users to perform delete operations.
- Finally, under the **USE OPTIONS ABOVE TO EDIT** section, in line 7, we condition the query as `(auth.uid() = sender)` This allows only logged in users to delete their data.

You can now click on the **Save policy** button to complete the DELETE setup.

The second policy you will create is the `INSERT` policy, which will have the configuration you can see in the image below:

![A policy configuration interface for inserting records in a chat table, targeting authenticated users with specific criteria.](https://cdn.hashnode.com/res/hashnode/image/upload/v1748823531256/14aea41d-f221-42df-a739-b40a680395e3.png)

From the above image, four implementations were made:

- First, we entered the policy name as “**Insert for Authenticated Users**“.
- Next we selected the `INSERT` policy command clause.
- Then under the targeted roles, we selected authenticated in the drop down to allow only authenticated users perform insert operations.
- Finally, under the `USE OPTIONS ABOVE TO EDIT` section, in line 7, the query was conditioned as `((sender = auth.uid()) AND (created_at = now()))`. The first condition ensures that the `sender` field in the inserted row matches the currently logged-in user's ID (from the Supabase JWT), while the second condition ensures that the `created_at` field is exactly equal to the current timestamp at the time of insertion.

The third policy you will create is the `SELECT` policy, which will have the configuration you can see in the image below:

![Row-level security policy configuration for a database table, specifying access permissions for authenticated users based on SELECT criteria.](https://cdn.hashnode.com/res/hashnode/image/upload/v1748824129598/8c15b701-dadb-4763-b5eb-e9484bd84470.png)

From the above image, we implemented four things:

- First, we entered the policy name as “**Read Data for Authenticated Users**“.
- Next we selected the `SELECT` policy command clause, _pun intended_ **😊**.
- Then under the targeted roles, we selected authenticated in the drop down to allow only authenticated users perform select operations.
- Finally, under the `USE OPTIONS ABOVE TO EDIT` section, in line 7, the query was conditioned as `true`. This allows all authenticated users to read all rows, or chats in our case.

With the above implementation, you’ve created all the policies needed for the chat application.

---

## How to Integrate Functionality to Create a New Chat Message in the Angular Application

Now let’s add the code that lets users create a new chat message. First, start by creating a new Angular service using the command below:

```sh
ng g s services/chat-service
```

Within the <FontIcon icon="iconfont icon-typescript"/>`chat-service.ts` file, you can now configure the Supabase client, just as we did in the <FontIcon icon="iconfont icon-typescript"/>`auth-service.ts` file as seen below:

```ts title="chat-service.ts"
import { Injectable, signal } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  supabase!: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }
}
```

Next, create the function that enables you to create a new chat message. The function called `chatMessage()` is below:

```ts title="chat-service.ts"
import { Injectable, signal } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  supabase!: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  async chatMessage(text: string) {
    try {
      const { data, error } = await this.supabase.from('chat').insert({ text });

      if (error) {
        alert(error.message);
      }
    } catch (error) {
      alert(error);
    }
  }
}
```

The above `chatMessage` function sends a chat message by inserting it into the `chat` table in Supabase.

You can now call this service in the <FontIcon icon="iconfont icon-typescript"/>`chat-component.ts` file. Within the <FontIcon icon="iconfont icon-typescript"/>`chat-component.ts`, import and inject the <FontIcon icon="iconfont icon-typescript"/>`chat-service.ts` file.

To send the data to the Supabase database, you need to setup Reactive form. Reactive form in Angular enables you to get data from an input field, which can be passed as a payload and then inserted into the database.

To setup a Reactive form in Angular, follow these steps:

- Import `FormBuilder`, `FormGroup`, `ReactiveFormsModule`, and `Validators` from `@angular/forms`
- Insert the `ReactiveFormsModule` inside of the imports array.
- Inject the `FormBuilder` as a variable.
- Declare a property that will hold the **Reactive Form group.**
- Inject the `FormBuilder` into the `ngOnInit` lifecycle hook.

The code for the Reactive form setup is below:

```ts title="chat-component.ts"
import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './chat-component.html',
  styleUrl: './chat-component.css',
})
export class ChatComponent {
  chatForm!: FormGroup;
  private fb = inject(FormBuilder);

  ngOnInit() {
    this.chatForm = this.fb.group({
      chat_message: ['', Validators.required],
    });
  }
}
```

To complete the Reactive form setup, bind the `FormGroup` into the HTML file. Also bind the disabled attribute, which disables the button when the form is invalid, as you can see below:

```html
<form [formGroup]="chatForm">
  <div class="flex-grow-0 py-3 px-4 border-top">
    <div class="input-group">
      <input formControlName="chat_message" type="text" class="form-control" placeholder="Type your message">
      <button [disabled]="!chatForm.valid" class="btn btn-primary">Send</button>
    </div>
  </div>
</form>
```

With the Reactive form setup complete, you can now create the function that calls the service which allows you create a new chat message.

```ts title="chat-component.ts"
import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ChatService } from '../../services/chat-service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './chat-component.html',
  styleUrl: './chat-component.css',
})
export class ChatComponent {
  private chat_service = inject(ChatService);
  chatForm!: FormGroup;
  private fb = inject(FormBuilder);

  ngOnInit() {
    this.chatForm = this.fb.group({
      chat_message: ['', Validators.required],
    });
  }

  onSubmit() {
    const formValue = this.chatForm.value.chat_message;
    this.chat_service
      .chatMessage(formValue)
      .then((res) => {
        this.chatForm.reset();
      })
      .catch((err) => {
        alert(err.message);
      });
  }
}
```

The `onSubmit()` function in the above code basically does the following tasks:

- Gets the data from the Reactive form input field using the variable called `formValue`
- Calls the `chatMessage()` method from the `ChatService`, passing the data from the input field.
- If successful, it resets the form.
- If there's an error, it shows an alert with the error message.

In the <FontIcon icon="fa-brands fa-html5"/>`chat-component.html` file, use of the `(ngSubmit)` directive to bind the `onSubmit()` function to the form:

```html title="chat-component.html"
<form [formGroup]="chatForm" (ngSubmit)="onSubmit()">
```

You can now test to see if the data we send from the input field saves directly into the **chat** database table.

::: note

make sure you **delete all current users saved in the users table and authentication page on Supabase** before trying this out for best results.

:::

![Screenshot of a chat interface showing a message from "Sharon Doe," with a timestamp and a text input field at the bottom.](https://cdn.hashnode.com/res/hashnode/image/upload/v1749042436895/a50416e7-3f8b-48a9-b8f3-96df520b2238.png)

From the above image, you will click on the send button and send the **Test** data in the input field.

![Table editor interface displaying the "chat" table with columns including ID, created_at, text, editable, and sender, showing entries and configuration options.](https://cdn.hashnode.com/res/hashnode/image/upload/v1749043485066/94b53998-e924-44c2-bbfd-e26d591fdf54.png)

The data should now be successfully saved into the database and the `INSERT` operation should now be integrated into the Angular application.

---

## How to Fetch Data in the Angular Application from Supabase

To fetch data from the chat table from Supabase, start by creating a service function in the <FontIcon icon="iconfont icon-typescript"/>`chat-service.ts` file, as seen below:

```ts :collapsed-lines title="chat-service.ts"
import { Injectable, signal } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  supabase!: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  async chatMessage(text: string) {
    try {
      const { data, error } = await this.supabase.from('chat').insert({ text });
      if (error) {
        alert(error.message);
      }
    } catch (error) {
      alert(error);
    }
  }

    async listChat() {
    try {
      const { data, error } = await this.supabase
        .from('chat')
        .select('*,users(*)');

      if (error) {
        alert(error.message);
      }

      return data;
    } catch (error) {
      throw error;
    }
  }
}
```

To summarize the function above called `listChat()`:

- We fetch the chat messages from the `chat` table using the `from` clause.
- Then we include the related user info by joining the users table with `(select(', users()'))`.
- An alert message is shown if there's a Supabase error.
- Finally, the fetched data is returned, an error is thrown if something goes wrong.

Before you head to the <FontIcon icon="iconfont icon-typescript"/>`chat-component.ts` file to consume the `listChat()` service function, you need to create an interface which helps shape the structure of the array of objects returned from Supabase. This gives us type safety and consistency.

To set up the interface, create an **interface** folder within the **app** directory. Here you will create a file called <FontIcon icon="iconfont icon-typescript"/>`chat-response.ts`. Then create the structure below:

```ts title="chat-response.ts"
export interface Ichat {
  created_at: string;
  editable: boolean;
  id: string;
  sender: string;
  text: string;
  users: {
    avatar_url: string;
    id: string;
    full_name: string;
  };
}
```

Heading back to the <FontIcon icon="iconfont icon-typescript"/>`chat-component.ts`, import both the interface which was named `Ichat` as well as `signal` and `effect` from `@angular/core`:

```ts title="chat-component.ts"
import { Component, effect, inject, signal } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ChatService } from '../../services/chat-service';
import { Ichat } from '../../interface/chat-response';
```

Next, create a variable called `chats`, which will hold the response from the Supabase client as a signal:

```ts
chats = signal<Ichat[]>([]);
```

With this, you can now create the function that fetches the chat array of objects from the Supabase dashboard:

```ts
onListChat() {
  this.chat_service
    .listChat()
    .then((res: Ichat[] | null) => {
      console.log(res);
      if (res !== null) {
        this.chats.set(res);
      } else {
        console.log('No messages Found');
      }
    })
    .catch((err) => {
      alert(err.message);
    });
}
```

To summarize the function above, we started by:

- Calling the `listChat()` function from the `ChatService` to fetch the chat messages.
- If messages are returned, it updates the chats signal with the result, by using the `set()` method derived from signals.
- In the event where no messages are returned, it logs `"No messages Found"` to the console.
- If an error occurs, it shows an alert with the error message.

We then call the `onListChat()` function within the constructor using the `effect()` function, which helps handle asynchronous operations.

```ts
constructor() {
  effect(() => {
    this.onListChat();
  });
}
```

When the application is saved, you can see the data in the console from the image below:

![Screenshot of a chat application showing a message from Sharon Doe, along with developer tools displaying the message data in an array of object.](https://cdn.hashnode.com/res/hashnode/image/upload/v1749066359110/dedaa60a-c711-42d9-bac1-c9a130fcc4d1.png)

You can now display the chat data in the HTML file of the page by getting rid of the placeholder text.

To do this, you can use the `@for` control flow in Angular as seen below:

```html
<main>
  <div class="container">
    <h3 class="mb-3">
      Supa Chat 
      <button class="btn btn-secondary" style="float: right;">
        Log out
      </button>
    </h3>
    <div class="card">
      <div>
        <div class="col-12 col-lg-12 col-xl-12">
          @for (msg of this.chats(); track msg) {
          <div class="position-relative">
            <div class="chat-messages p-4">
              <div class="chat-message-left pb-4">
                <div class="me-5">
                  <img src={{msg?.users?.avatar_url}} class="rounded-circle mr-1" alt="image" width="40" height="40">
                  <div class="text-muted small text-nowrap mt-2">{{msg?.created_at | date: 'M/d/yy, h:mm a'}}</div>
                </div>
                <div class="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
                  <div class="font-weight-bold mb-1">{{msg?.users?.full_name}}</div>
                  {{msg?.text}}
                </div>
              </div>
            </div>
          </div>
          } @empty {
          <div>No chats available</div>
          }
          <form [formGroup]="chatForm" (ngSubmit)="onSubmit()">
            <div class="flex-grow-0 py-3 px-4 border-top">
              <div class="input-group">
                <input formControlName="chat_message" type="text" class="form-control" placeholder="Type your message">
                <button [disabled]="!chatForm.valid" class="btn btn-primary">Send</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</main>
```

From the code above, right above the `div` with the `position-relative` class, we declared the `@for (msg of this.chats(); track msg)` control flow, which does the following:

- Loops through the array returned by `this.chats()` which is the signal variable that was declared in the template.
- Assigns each item in the array to the `msg` variable.
- Tracks each item by identity `track msg` for DOM updates.

Next, within the loop, you called the data in the appropriate HTML tag to display the image, the date the chat was created, the full name, and the chat message as well.

Finally, you created an `@empty` block which displays the message `No chats available` if there are no items in the array.

You should have the outcome below:

![A chat interface displaying two messages from the user "adedeji adesoga," dated June 4, 2025, with a text input box at the bottom.](https://cdn.hashnode.com/res/hashnode/image/upload/v1749082870784/85184bf1-3cfe-4808-a149-64a6b925e097.png)

---

## How to Delete Data in the Angular Application

When creating the delete functionality, first you need to create a service function in the <FontIcon icon="iconfont icon-typescript"/>`chat-service.ts` file as seen below:

```ts title="chat-service.ts"
async deleteChat(id: string) {
  const data = await this.supabase.from('chat').delete().eq('id', id);
  return data;
}
```

All the above function does is find the specific id provided from the parameter, and return the result of the delete operation.

Next, track the selected chat that was clicked from the array of listed chats and then pass the data down to your service.

To do this, first create a function within the service called `selectedChats()` which helps receive the data from the template:

```ts title="chat-service.ts"
public savedChat = signal({});

selectedChats(msg: Ichat) {
  this.savedChat.set(msg);
}
```

Above, we created the variable called `savedChat`. It’s declared as a signal that helps receive the object of the chat that we want to delete using the `set()` method.

You can now head to the <FontIcon icon="iconfont icon-typescript"/>`chat-component.ts` file to create the function that passed the data down to the `selectedChats()` function.

You can see this function below:

```ts title="chat-component.ts"
openDropDown(msg: Ichat) {
  console.log(msg);
  this.chat_service.selectedChats(msg);
}
```

As you can see from the function above, once you bind it to the HTML element, it will make sure that you get the object of the specific chat that was clicked.

In our <FontIcon icon="fa-brands fa-html5"/>`chat-component.html` file, create a menu drop down that will help achieve this result as seen below:

```html :collapsed-lines title="chat-component.html"
<main>
  <div class="container">
    <h3 class="mb-3">
      Supa Chat
      <button class="btn btn-secondary" style="float: right;">
        Log out
      </button>
    </h3>
    <div class="card">
      <div>

        <div class="col-12 col-lg-12 col-xl-12">
          @for (msg of this.chats(); track msg) {
          <div class="position-relative">
            <div class="chat-messages p-4">
              <div class="chat-message-left pb-4">
                <div class="me-5">
                  <img src={{msg?.users?.avatar_url}} class="rounded-circle mr-1" alt="image" width="40" height="40">
                  <div class="text-muted small text-nowrap mt-2">{{msg?.created_at | date: 'M/d/yy, h:mm a'}}</div>
                </div>
                <div class="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
                  <div class="font-weight-bold mb-1">{{msg?.users?.full_name}}</div>
                  {{msg?.text}}
                </div>

                <!-- Delete Modal Button Menu-->
                <div class="dropdown">
                  <span (click)="openDropDown(msg)" class="mt-3 ms-5" type="button" id="dropdownMenuButton1"
                    data-bs-toggle="dropdown" aria-expanded="false">
                    ...
                  </span>
                  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li>
                      <a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#exampleModal">Delete</a>
                    </li>
                  </ul>
                </div>


              </div>
            </div>
          </div>
          } @empty {
          <div>No chats available</div>
          }

          <form [formGroup]="chatForm" (ngSubmit)="onSubmit()">
            <div class="flex-grow-0 py-3 px-4 border-top">
              <div class="input-group">
                <input formControlName="chat_message" type="text" class="form-control" placeholder="Type your message">
                <button [disabled]="!chatForm.valid" class="btn btn-primary">Send</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</main>
```

From the above code, take note of the following: the comment with the text `<!-- Delete Modal Button Menu-->` is created within the `@for` control flow. This is essential because it allows the `openDropDown(msg)` to receive the right object as a parameter when the drop down menu is clicked. A quick look at the console will reveal this.

You can now create the delete modal component, which allows you to consume the delete service required for a chat to be deleted.

To create the delete component, use the command below:

```sh
ng g component layout/modal-component
```

The design for the delete component is a Bootstrap 5 modal that looks like this:

```html title="modal-componet.html"
<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        Are really sure you want to delete this message?
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
        <button [attr.data-bs-dismiss]="!this.dismiss() === true ? 'modal' : null" (click)="deleteChat()" type="button"
          class="btn btn-primary">Yes</button>
      </div>
    </div>
  </div>
</div>
```

If you paste the above code directly in your code editor, you’re going to get a host of errors because we have not created the `deleteChat()` function as well as the `dismiss()` signal variable in the template file. Let’s go ahead and do that.

The first step in setting up the `modal-componet.ts` file component is to import the appropriate modules as seen below:

```ts title="modal-componet.ts"
import { Component, effect, inject, signal } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Router } from '@angular/router';
```

Next, inject the `chatservice`, `Angular router`, as well as the the `dismiss` variable which is a signal as seen below:

```ts title="modal-componet.ts"
private chat_service = inject(ChatService);
private router = inject(Router);
dismiss = signal(false);
```

With this you can now create the `deleteChat()` function as seen below:

```ts title="modal-componet.ts"
  deleteChat() {
    const id = (this.chat_service.savedChat() as { id: string }).id;

    console.log(id);

    this.chat_service
      .deleteChat(id)
      .then(() => {
        let currentUrl = this.router.url;

        this.dismiss.set(true);

        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => {
            this.router.navigate([currentUrl]);
          });
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  }
```

- The first thing we did under the `deleteChat()` method was to extract the `id` from the chat service.
- This `id` is then passed into the `deleteChat()` method from our service which helps delete the specific chat that was selected.
- Once the chat has been deleted, the current route gets reloaded to update the UI.

To activate the modal, you need to import the Modal Component in the <FontIcon icon="fa-brands fa-html5"/>`chat-component.html` file

```html title="chat-component.html"
<main>
  <div class="container">
    <h3 class="mb-3">
        Supa Chat
        <button class="btn btn-secondary" style="float: right;">
          Log out
        </button>
    </h3>
    <div class="card">
      <div>

        <div class="col-12 col-lg-12 col-xl-12">
          @for (msg of this.chats(); track msg) {
          <div class="position-relative">
            <div class="chat-messages p-4">
              <div class="chat-message-left pb-4">
                <div class="me-5">
                  <img src={{msg?.users?.avatar_url}} class="rounded-circle mr-1" alt="image" width="40" height="40">
                  <div class="text-muted small text-nowrap mt-2">{{msg?.created_at | date: 'M/d/yy, h:mm a'}}</div>
                </div>
                <div class="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
                  <div class="font-weight-bold mb-1">{{msg?.users?.full_name}}</div>
                  {{msg?.text}}
                </div>

                <!-- Delete Modal Button Menu-->
                <div class="dropdown">
                  <span (click)="openDropDown(msg)" class="mt-3 ms-5" type="button" id="dropdownMenuButton1"
                    data-bs-toggle="dropdown" aria-expanded="false">
                    ...
                  </span>
                  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li>
                      <a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#exampleModal">Delete</a>
                    </li>
                  </ul>
                </div>


              </div>
            </div>
          </div>
          } @empty {
          <div>No chats available</div>
          }

          <form [formGroup]="chatForm" (ngSubmit)="onSubmit()">
            <div class="flex-grow-0 py-3 px-4 border-top">
              <div class="input-group">
                <input formControlName="chat_message" type="text" class="form-control" placeholder="Type your message">
                <button [disabled]="!chatForm.valid" class="btn btn-primary">Send</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</main>

<!-- modal -->

<app-modal />
```

::: note

Don’t forget to import the **ModalComponent** file in the <FontIcon icon="iconfont icon-typescript"/>`chat-component.ts` file to avoid having any errors.

:::

You have now implemented the ability to Insert, read, and delete data. The final implementation is to integrate the logout functionality.

---

## How to Implement Logout Functionality in the Angular Application

Earlier in the tutorial, within the <FontIcon icon="iconfont icon-typescript"/>`auth-service.ts` file, you created a function called `signOut()` as seen below:

```ts title="auth-service.ts"
async signOut() {
  await this.supabase.auth.signOut();
}
```

In the <FontIcon icon="iconfont icon-tyepscript"/>`chat-component.ts` file, you will import and inject the `sigOut()` method. To do this, follow these steps:

- Import and inject the Angular router.
- Import and inject the Authentication Service file
- Create the `logOut()` function that consumes the `signOut()` service:

```ts title="chat-component.ts"
async logOut() { 
  this.auth
    .signOut()
    .then(() => { this.router.navigate(['/login']); }) 
    .catch((err) => { alert(err.message); });
}
```

- Finally in the <FontIcon icon="fa-brands fa-html5"/>`chat-component.html` file, within the button tag at the top of the page, call the `logout()` function using the `(click)` event handler:

```html title="chat-component.html"
<h3 class="mb-3">Supa Chat 
  <button (click)="logOut()" class="btn btn-secondary" style="float: right;">Log Out</button>
</h3>
```

Once the Log Out button is clicked, the user gets navigated to the Login page and the user state gets reset in the browser.

---

## Conclusion

In this tutorial, you learned how to build a real-time chat application using Angular and Supabase. We covered the following key concepts:

- How to create database tables in Supabase
- How to create triggers and functions in Supabase
- How to use signals to manage state in an Angular
- How to create authentication and authorization using Supabase and Google OAuth 2.0
- How to work with Reactive forms in Angular

and lots more.

You can access the full codebase by cloning the repository on [GitHub (<FontIcon icon="iconfont icon-github"/>`desoga10/ng-chat-20`)](https://github.com/desoga10/ng-chat-20).

If you found this article helpful, consider subscribing to my [YouTube channel (<FontIcon icon="fa-brands fa-youtube"/>`TheCodeAngle`)](https://youtube.com/@TheCodeAngle) where I share hands-on tutorials on modern web development technologies like JavaScript, HTML, CSS, Angular, Supabase, Firebase, React, Third party API and AI tools, and many more. Cheers!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build a Realtime Chat Application with Angular 20 and Supabase",
  "desc": "Chat applications let you talk in real-time with your friends, family, or coworkers, and help you quickly, effectively, and efficiently transfer of information. When you’re building modern web applications, chat applications are now pretty much a req...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-realtime-chat-app-with-angular-20-and-supabase.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
