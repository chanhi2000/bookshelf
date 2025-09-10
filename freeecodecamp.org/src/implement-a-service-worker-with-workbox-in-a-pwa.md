---
lang: en-US
title: "How to Implement a Service Worker with WorkBox in a Progressive Web App"
description: "Article(s) > How to Implement a Service Worker with WorkBox in a Progressive Web App"
icon: fa-brands fa-js
category:
  - JavaScript
  - CSS
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - js
  - javascript
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Implement a Service Worker with WorkBox in a Progressive Web App"
    - property: og:description
      content: "How to Implement a Service Worker with WorkBox in a Progressive Web App"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/implement-a-service-worker-with-workbox-in-a-pwa/
prev: /programming/js/articles/README.md
date: 2025-06-23
isOriginal: false
author:
  - name: Damilola Oniyide
    url : https://freecodecamp.org/news/author/LolaVictoria/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1750687028879/b12e57cb-290a-4562-8584-95eb5713a871.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "JavaScript > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "CSS > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/css/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Implement a Service Worker with WorkBox in a Progressive Web App"
  desc="Imagine having a web app that looks and feels just like a native mobile app. It launches from your home screen, runs in full-screen mode, and responds smoothly to your interactions. But here’s the surprising part: it wasn’t downloaded from an app sto..."
  url="https://freecodecamp.org/news/implement-a-service-worker-with-workbox-in-a-pwa"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1750687028879/b12e57cb-290a-4562-8584-95eb5713a871.png"/>

Imagine having a web app that looks and feels just like a native mobile app. It launches from your home screen, runs in full-screen mode, and responds smoothly to your interactions. But here’s the surprising part: it wasn’t downloaded from an app store. It’s a Progressive Web App (PWA).

PWAs bring the power of the web to your fingertips with the experience of a mobile app. Even better? If you lose internet connection while on the go, the app can still function, showing your previously loaded data and getting updates once you’re back online.

In this tutorial, you’ll learn how to implement a service worker with WorkBox in a weather app using HTML, CSS, and JavaScript. We’ll start by understanding what a PWA is, the core components behind the scenes, especially service workers, and how to use Workbox to supercharge your app with offline capabilities.

---

## Table of Contents

- [What We’ll Cover](#heading-what-well-cover)
- [What is a Progressive Web App (PWA)?](#heading-what-is-a-progressive-web-app-pwa)
- [What Makes a Web App “Progressive”?](#heading-what-makes-a-web-app-progressive)
- [Components of a PWA](#heading-components-of-a-pwa)
- [What is a Service Worker in PWA?](#heading-what-is-a-service-worker-in-pwa)
- [Why Use Workbox Instead of Manual Service Workers?](#heading-why-use-workbox-instead-of-manual-service-workers)
- [Introduction to WorkBox](#heading-introduction-to-workbox)
- [Project Setup](#heading-project-setup)
- [Creating the Offline HTML Structure](#heading-creating-the-offline-html-structure)
- [Styling with CSS](#heading-styling-with-css)
- [How to Set Up app.js and config.js](#heading-how-to-set-up-appjs-and-configjs)
- [How to Create a Manifest File](#heading-how-to-create-a-manifest-file)
- [How to Add WorkBox to Your service-worker.js File](#heading-how-to-add-workbox-to-your-service-workerjs-file)
- [How to Create your Service Worker in the service-worker.js File](#heading-how-to-create-your-service-worker-in-the-service-workerjs-file)
- [How to Set Up App Installation](#heading-how-to-set-up-app-installation)
- [How to Install the Weather App](#heading-how-to-install-the-weather-app)
- [Conclusion](#heading-conclusion)

---

## What We’ll Cover

- **Setting Up the Project:** We'll build a simple weather app using HTML, CSS, and JavaScript. This approach is perfect for this tutorial because it keeps things simple and accessible while focusing on core PWA concepts without the added complexity of frameworks like React or Vue.
- **Turning the App into a PWA:** Next, we’ll walk through the concept of a Progressive Web App, covering the key features and best practices of PWAs.
- **Implementing Service Worker via WorkBox:** Finally, we’ll dive deeper into how service workers function and explore why using Workbox simplifies the process.

Here’s what the final application will look like:

![Weatherly app interface showing Tokyo weather with 24°C temperature, overcast clouds, city search functionality, and location services button](https://cdn.hashnode.com/res/hashnode/image/upload/v1747272664555/8ec876bc-0881-4a63-8010-02136de91db3.png)

### Audience

This tutorial is for web developers of all levels. Whether you're new to Progressive Web Apps (PWAs) or just starting to explore service workers, this guide will walk you through the core concepts and demonstrate why using a Google-backed library like Workbox to implement service workers can be more efficient than manual implementation.

::: note Prerequisites

Before you begin

1. Get a free API key from the [<VPIcon icon="fas fa-globe"/>OpenWeatherAPI](https://openweathermap.org/) website
2. Make sure you’re familiar with HTML, CSS, and JavaScript.
3. If you’re new to PWAs, you might want to read some introductory articles to get a quick overview.
    - [<VPIcon icon="fa-brands fa-firefox"/>Progressive web apps](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
    - [<VPIcon icon="iconfont icon-webdev"/>Workbox](https://web.dev/articles/workbox)

---

## What is a Progressive Web App (PWA)?

A PWA is a web application that combines the best of web and mobile apps. It’s built using standard web technologies like HTML, CSS, and JavaScript, but it behaves and feels like a native mobile app on your phone or tablet.

Think of apps like Instagram Web, Twitter Lite, or Spotify Web Player. Even though you’re not using a native app from an app store:

- You can still scroll your feed, view media, and send messages.
- It works even on slow or unstable networks.
- You can “install” it on your home screen and launch it like a regular app.
- You even get push notifications just like a mobile app!

With PWAs, you get the reach of the web and the feel of an app without the heavy storage or installation process.

---

## What Makes a Web App “Progressive”?

A PWA is not just any website. It’s built to progressively enhance the user experience, depending on their device and browser capabilities. Here are the core characteristics that define a PWA:

- **Responsive**: Works on all screen sizes, that is, phones, tablets, and desktops.
- **Reliable**: Loads instantly, even when offline or on poor networks.
- **Installable**: Can be added to the home screen without needing an app store.
- **Engaging**: Supports features like push notifications and background sync.

---

## Compone**nts of a P

Before your web app can be considered a PWA, it must include the following:

### A Web Application Manifest

The web app manifest is a JSON file that tells the browser about your web app, how it should appear, and behave when installed on a user's device.

Think of it like your app’s business card. It includes details like:

- **App name and short name** - How your app is labeled on the home screen or app list.
- **Icons** - Images used for app icons on different screen sizes and resolutions.
- **Theme color and background color** - Defines the look of your app’s UI and loading screen.
- **Start URL** - The page that opens when the app is launched.
- **Display mode** - Controls whether the app opens in a browser tab, fullscreen, or a native-like window.
- **Screenshots** - Optional preview images that show how your app looks on different devices in app stores or installation prompts.

### A Service Worker

This is a script that runs in the background. It handles offline behaviour, caching, background sync, and push notifications needed to make your PWA function.

More details about the service worker will be discussed later in this article.

### HTTPS

PWAs must be served over HTTPS. This is not optional. Here’s why:

- It protects users by ensuring secure data transfer.
- It enables important features like service workers and push notifications.
- Browsers won’t allow service workers to register on non-secure origins.

If you're testing locally, you can use `localhost` (which is treated as secure), But for production, your site must have an SSL certificate.

---

## What is a Service Worker in PWA?

In PWAs, a service worker is a JavaScript file that runs in the background, separate from your main app, and acts like a network proxy. It can:

- Cache resources and serve them offline
- Intercept network requests and apply caching strategies
- Handle background syncs
- Manage push notifications

Think of it as your app’s behind-the-scenes assistant—makes it load fast, works offline, and stays updated, even when you're not looking.

---

## Why Use Workbox Instead of Manual Service Workers?

Service workers are essential in creating a PWA, but getting started with them can be challenging. Writing service worker code from scratch can often be tedious and prone to errors. For example, you'd need to:

- Manually configure caching strategies
- Handle service worker updates
- Write and maintain a lot of repetitive boilerplate code

Workbox, a library from Google, makes things easier by letting developers focus on what matters, without worrying about the complicated parts of service workers.

However, it’s still important to understand how service workers function, since they handle some complex tasks under the hood.

Here are key things a service worker (with or without Workbox) does:

- **Install event**: Set up cache
- **Activate event**: Clean up old caches
- **Fetch event**: Intercept network requests and serve from cache

With Workbox, these are wrapped in easy-to-use functions.

---

## Introduction to WorkBox

Workbox is a collection of libraries that helps developers build efficient service workers quickly, with best practices built right in. It supports strategies like:

- `CacheFirst`: Load from cache, fall back to network
- `NetworkFirst` : Try network, fall back to cache
- `StaleWhileRevalidate`: Serve from cache and update in the background

### Understanding Workbox Modules

Workbox is more than just a tool. It is a collection of powerful modules, each designed to simplify different parts of working with service workers. These modules are flexible and can be used in three key contexts:

- **Service Worker Context** - Inside your service worker file, where you handle caching, routing, and other background tasks.
- **Window Context** - Inside your main application (the client-side JS), where you register and communicate with the service worker.
- **Build Tools Integration** - Tools like Webpack use Workbox to generate service worker files and precache manifests during your build process.

Let’s break down some of the most popular and essential modules Workbox offers:

#### 1. workbox-routing

This module handles routing network requests within your service worker. Think of it like a traffic director that listens for `fetch` events and decides what to do with them.

::: tip Use case

Route API requests to the network while routing static asset requests to the cache.

:::

#### 2. workbox-strategies

This is where caching strategies like `CacheFirst`, `NetworkFirst`, and `StaleWhileRevalidate` are used. It provides a clean and consistent API for handling how your app responds to different requests.

::: tip Use case

Apply different caching behaviours for images, fonts, or dynamic data with minimal code.

:::

#### 3. **workbox-precaching

This module handles precaching by storing static assets during the service worker’s install phase. It makes it easy to cache files ahead of time and ensures that updates are managed efficiently.

::: tip Use case

Preload essential assets (like HTML, CSS, and logo images) so your app loads instantly, even offline.

:::

#### 4. **workbox-expiration

It is used as a plugin alongside caching strategies. This module adds smart cache expiration. You can automatically remove old or excessive items from the cache based on how long they've been stored or how many items exist.

::: tip Use case

Keep your cache size under control without manually tracking and deleting outdated files.

:::

#### 5. workbox-window

This module is designed for the browser (window) side of your app. It simplifies service worker registration and allows you to communicate with the service worker from your page easily.

::: tip Use case

Detect when a new service worker is available and prompt the user to refresh the app to update.

:::

You can use WorkBox via:

- npm
- CDN (which we'll use here for simplicity)

---

## Project Setup

Let's start by creating our project structure:

```plaintext title="file structure"
weather-pwa/
├── index.html
├── style.css
├── js/
│   ├── app.js
│   └── install.js
├── service-worker.js
├── images/
│   └── [your image files and folders here]
├── manifest.json
├── config.js  
└── offline.html
```

### The HTML Structure

First, let's build our <VPIcon icon="fa-brands fa-html5"/>`index.html` file:

```html :collapsed-lines title="index.html"
<!DOCTYPE html>
<html lang="en">
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" href="/images/logo.png" type="image/png">
    <meta name="description" content="Simple Weather Progressive Web App" />
    <link rel="stylesheet" href="/styles.css" />
    <title>Weatherly</title>
  </head>
  <body>
    <header class="header">
      <img loading="lazy" class="logo" src="images/logo.png" alt="Weatherly Logo">
      <h1>Weatherly</h1>
    </header>

    <main class="main">
      <div class="weather-card">
        <div class="location-container">
          <input type="text" id="location-input" placeholder="Enter city name">
          <button id="search-btn">Search</button>
          <button id="locationBtn">📍 Use My Location</button>
          <button id="installBtn" style="display: none;">Install App</button>
        </div>

        <div id="offline-message" class="offline-message">
          You are currently offline. Weather data may not be up-to-date.
        </div>


        <div class="error">
          <p id="error-message"></p>
        </div>

        <div id="weather-container" class="weather-container">
          <h3>Your last searched location weather:</h3>
          <div class="location-info">
            <h2 id="city"></h2>
            <p id="date"></p>
          </div>

          <div class="current-weather">
            <img loading="lazy" id="weather-icon" src="" alt="Weather icon">
            <div class="temperature-container">
              <h3 id="temperature"></h3>
              <p id="weather-description"></p>
            </div>
          </div>

          <div class="weather-details">
            <div class="detail">
              <img loading="lazy" id="humidity-icon" src="/images/humidity.png" alt="Humidity icon">
              <span class="label">Humidity</span>
              <span id="humidity" class="value"></span>
            </div>
            <div class="detail">
              <img loading="lazy" id="wind-icon" src="/images/wind.png" alt="Wind icon">
              <span class="label">Wind</span>
              <span id="wind" class="value"></span>
            </div>
          </div>
        </div>

        <!-- Your location weather -->
        <div class="location-weather">
          <h3>Your location's weather:</h3>
          <div class="weather-info" id="weatherInfo">

          </div>
        </div>
      </div>
    </main>

    <footer>
      <p>Made with ❤️ by <a href="www.linkedin.com/in/damilola-oniyide">Damilola Oniyide</a>
    </footer>
    <script type="module" src="/js/app.js" defer></script>
</body>
</html>
```

---

## Creating the Offline HTML Structure

The <VPIcon icon="fa-brands fa-html5"/>`offline.html` is the page that users will see when they lose network connection and try to navigate to a page that isn’t cached.

```html :collapsed-lines title="offline.html"
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="theme-color" content="#2196f3">
  <title>Weatherly - Offline</title>
  <link rel="stylesheet" href="/styles.css">
  <style>
    .offline-icon {
      font-size: 5rem;
      margin-bottom: 1.5rem;
      color: #2196f3;
    }

    .offline-message {
      font-size: 1.5rem;
      margin-bottom: 1.5rem;
    }

    .offline-subtext {
      font-size: 1rem;
      margin-bottom: 2rem;
      color: #666;
    }

    .retry-button {
      padding: 0.75rem 1.5rem;
      background-color: #2196f3;
      color: white;
      border: none;
      border-radius: 12px;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.3s;
    }

    .retry-button:hover {
      background-color: #2980b9;
    }
  </style>
</head>
<body>
  <header>
    <h1>Weatherly</h1>
  </header>

  <main>
    <div class="app-container">
      <div class="weather-card">
        <div class="offline-container">
          <div class="offline-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
              <path d="M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm-2.715 5.933a.5.5 0 0 1-.183-.683A4.498 4.498 0 0 1 8 9.5a4.5 4.5 0 0 1 3.898 2.25.5.5 0 0 1-.866.5A3.498 3.498 0 0 0 8 10.5a3.498 3.498 0 0 0-3.032 1.75.5.5 0 0 1-.683.183zM10 8c-.552 0-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5S10.552 8 10 8z"/>
            </svg>
          </div>
          <h2 class="offline-message">You're offline</h2>
          <p class="offline-subtext">Please check your internet connection and try again.</p>
          <button class="retry-button" onclick="window.location.href='/'">Retry</button>
        </div>
      </div>
    </div>
  </main>

  <footer>
    <p>Made with ❤️ by Damilola Oniyide</p>
  </footer>
</body>
</html>
```

---

## Styling with CSS

Now, let's create our <VPIcon icon="fa-brands fa-css3-alt"/>`style.css` file for a responsive and user-friendly design:

```css collapsed-lines title="style.css"
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f5f5f5;
  color: #333;
  line-height: 1.6;
}

.header {
  background-color: #2196f3;
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.header h1 {
  font-size: 1.5rem;
}


.header img {
  width: 55px;
  height: 55px;
  border: #ffff 1px solid;
  margin-right: 4px;
  border-radius: 10%;
}


.main {
  padding: 1rem;
  max-width: auto;
  margin: 0 auto;
}

.weather-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 1.5rem 3rem;
  margin-top: 1rem;
}

/* Location input styles */
.location-container {
  display: flex;
  margin-bottom: 1.5rem;
  justify-content: center;
}

#location-input {
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px 0 0 4px;
  font-size: 1rem;
  max-width: 240px;
}

#location-input:focus {
  outline: none;
  border-color: #2196f3;
}
#location-input::placeholder {
  color: #999;
}   

#search-btn, #locationBtn {
  background-color: #2196f3;
  color: white;
  border: none;
  padding: 0.75rem 1rem;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  font-size: 1rem;
  margin-right: 2.5px;
}


#installBtn {
  background-color: #2196f3;
  color: white;
  border: none;
  padding: 0.75rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

#search-btn:focus, #locationBtn:focus, #installBtn:focus {
  outline: none;
  box-shadow: 0 0 5px rgba(33, 150, 243, 0.5);
}
#search-btn:hover, #locationBtn:hover, #installBtn:hover {
  background-color: #1976d2;
}

.error, .loading {
  text-align: center;
  font-weight: bold;
  font-size: 14px;
  margin-top: 10px;
  display: none;;
}

.error-message {
  color: #d32f2f;

}
/* Weather display styles */
.weather-container {
  display: none 
}

#weather-icon {
  width: 1000px; 
  height: 100px;
}

.current-weather{
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
}

.location-weather{
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
}


#weather-icon {
  width: 80px;
  height: 80px;
  margin-right: 1rem;
}

.location-info {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.location-info h2,  .current-weather h3, .weather-container h3, .location-weather h3 {
  font-size: 1.8rem;
  margin-bottom: 0.25rem;
}



.location-info p, .current-weather p {
  color: #666;
  font-size: 1.4rem;
}

.temperature-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
}

.temperature-container h3 {
  font-size: 2.5rem;
  margin-bottom: 0.25rem;
}

.temperature-container p {
  color: #666;
  text-transform: capitalize;
}

.weather-details {
  display: flex;
  justify-content: center;
  background-color: #f9f9f9;
  border-radius: 4px;
  padding: 1rem;
}

#humidity-icon, #wind-icon{
  width: 40px;
  height: 40px;
}

.detail {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 1rem;
  text-align: center;
}

.label {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.25rem;
}

.value {
  font-size: 1.2rem;
  font-weight: 500;
}

/* Error and offline message styles */
.error-message {
  color: #d32f2f;
  text-align: center;
  margin-top: 1rem;
  display: none;
} 

.offline-message {
  background-color: #ffab91;
  color: #7f0000;
  padding: 0.75rem;
  text-align: center;
  margin-top: 1rem;
  border-radius: 4px;
  display: none;
}


/* 5 days forecast weather */
.forecast-container {
  display: flex;
  justify-content: space-around;
  gap: 1rem;
}

.forecast-item {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 1rem 4rem;
  text-align: center;
}



footer {
  background-color: #2196f3;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: .7rem 0;
}

footer p, footer a {
  color: #f9f9f9;
  font-weight: 500;
}
/* Responsive styles */
@media (max-width: 480px) {
  .header h1 {
    font-size: 1.2rem;
  }

  .location-container {
    flex-direction: column;
    align-items: center;
    gap: .6rem
  }

  .current-weather {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .weather-container h3, .location-weather h3, .forecast h3 {
    font-size: 1.5rem;
  }

  #weather-icon {
    margin-right: 0;
    margin-bottom: 1rem;
  }

  .forecast-container {
    flex-direction: column;
    align-items: center;
  }
}
```

---

## How to Set Up <VPIcon icon="fa-brands fa-js"/>`app.js` and <VPIcon icon="fa-brands fa-js"/>`config.js`

Now, let's create our <VPIcon icon="fa-brands fa-js"/>`app.js` file to add functionality to the weather app. Before proceeding, ensure you’ve obtained your **API key** from [<VPIcon icon="fas fa-globe"/>OpenWeather](https://openweathermap.org/). For best practice, store your API key in a separate file like <VPIcon icon="fa-brands fa-js"/>`config.js` to keep things organized and avoid hardcoding sensitive data.

Here's what your <VPIcon icon="fa-brands fa-js"/>`config.js` should look like:

```js title="config.js"
export const CONFIG = {
  WEATHER_API_KEY: "WRITE-YOUR-API-KEY-HERE",
};
```

Ensure you add the <VPIcon icon="fa-brands fa-js"/>`config.js` file to <VPIcon icon="iconfont icon-git"/>`.gitignore` to avoid leaking sensitive information on a public platform like GitHub.

Now let’s move to <VPIcon icon="fa-brands fa-js"/>`app.js`. This is where the main logic of your weather app will live. You can now reference your API key using `Weather_API_KEY` from the <VPIcon icon="fa-brands fa-js"/>`config.js` file.

Below is the structure of your <VPIcon icon="fa-brands fa-js"/>`app.js` file:

```js :collapsed-lines title="app.js"
import { CONFIG } from './config.js';
const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?&appid=${CONFIG.WEATHER_API_KEY}&units=metric&q=`;

const cityName = document.getElementById('location-input');
const searchButton = document.getElementById('search-btn');
const weatherIcon = document.getElementById('weather-icon');
const locationBtn = document.getElementById('locationBtn');
const weatherInfo = document.getElementById('weatherInfo');


function getWeatherIcon(condition) {
  switch (condition) {
    case "Clear":
      return "images/weather-icons/clear.png";
    case "Clouds":
      return "images/weather-icons/clouds.png";
    case "Drizzle":
      return "images/weather-icons/drizzle.png";
    case "Rain":
      return "images/weather-icons/drizzle.png";
    case "Mist":
      return "images/weather-icons/mist.png";
    case "Snow":
      return "images/weather-icons/snow.png";
    default:
      return "images/weather-icons/default.png";
  }
}
//Search for weather by city name
async function checkWeatherBySearch(city){
  if (city.length == 0) {
    document.getElementsByClassName('error')[0].style.display = 'block';
    document.getElementsByClassName('error')[0].innerHTML = "Please enter a city name!";
    document.getElementsByClassName('error')[0].style.color = 'red';
    document.getElementById('weather-container').style.display = 'none'; 
    return;
  }
  const response = await fetch(BASE_URL + city);
  document.getElementsByClassName('error')[0].style.display = 'block';
  document.getElementsByClassName('error')[0].innerHTML = "Wait a sec, your location's data will be displayed soon!";

  if (response.status == 404) {
    document.getElementsByClassName('error')[0].style.display = 'block';
    document.getElementsByClassName('error')[0].innerHTML = "City not found! Please enter a valid city name.";
    document.getElementsByClassName('error')[0].style.color = 'red';
    document.getElementById('weather-container').style.display = 'none';       
  } else {
    const data = await response.json();
    document.getElementById('weather-container').style.display = 'block';
    document.getElementsByClassName('error')[0].style.display = 'none';
    localStorage.setItem('lastCity', city);
    document.getElementById('city').innerHTML = data.name;
    document.getElementById('date').innerHTML = new Date(data.dt * 1000).toLocaleDateString();
    document.getElementById("temperature").innerHTML = Math.round(data.main.temp) + "°C";
    document.getElementById("humidity").innerHTML = data.main.humidity + "%";
    document.getElementById("wind").innerHTML = data.wind.speed + "m/s";
    document.getElementById('weather-description').innerHTML = data.weather[0].description;
    const weatherCondition = data.weather[0].main;
    weatherIcon.src = getWeatherIcon(weatherCondition);
  }
}

 // display next 5-day forecast by coordinates
function display5DaysForecast(forecast) {
  const fragment = document.createDocumentFragment(); 
  const forecastWrapper = document.createElement('div');
  forecastWrapper.className = 'forecast';

  const heading = document.createElement('h3');
  heading.innerHTML = "Your location's next 5 days forecast:";

  const container = document.createElement('div');
  container.className = 'forecast-container';

  const addedDates = new Set();
  const today = new Date().toDateString();

  forecast.forEach((entry) => {
    const entryDateObj = new Date(entry.dt * 1000);
    const entryDateStr = entryDateObj.toDateString();

    if (entryDateStr !== today && !addedDates.has(entryDateStr)) {
      addedDates.add(entryDateStr);
      if (addedDates.size > 6) return;

      const condition = entry.weather[0].main;
      const iconSrc = getWeatherIcon(condition);

      const forecastItem = document.createElement('div');
      forecastItem.className = 'forecast-item';

      const date = document.createElement('p');
      date.id = 'date';
      date.innerHTML = `<strong>${new Date(entry.dt * 1000).toLocaleDateString()}</strong>`;

      const icon = document.createElement('img');
      icon.loading = 'lazy';
      icon.id = 'weather-icon';
      icon.src = iconSrc;
      icon.alt = `${condition} icon`;

      const tempContainer = document.createElement('div');
      tempContainer.className = 'temperature-container';

      const temp = document.createElement('h3');
      temp.id = 'temperature';
      temp.innerHTML = `${Math.round(entry.main.temp)} °C`;

      const description = document.createElement('p');
      description.id = 'weather-description';
      description.innerHTML = `${entry.weather[0].description}`;

      tempContainer.appendChild(temp);
      tempContainer.appendChild(description);
      forecastItem.appendChild(date);
      forecastItem.appendChild(icon);
      forecastItem.appendChild(tempContainer);
      container.appendChild(forecastItem);
    }
  });

  forecastWrapper.appendChild(heading);
  forecastWrapper.appendChild(container);
  fragment.appendChild(forecastWrapper);
  weatherInfo.appendChild(fragment); 
}

// Fetch next 5-day forecast by coordinates
function get5DaysForecast(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${CONFIG.WEATHER_API_KEY}&units=metric`
  )
    .then(res => res.json())
    .then(data => {
      requestIdleCallback(() => {
        setTimeout(() => display5DaysForecast(data.list), 0);
      });        
    })
    .catch(() => {
      weatherInfo.innerHTML = 'Error fetching forecast data.';
  });
}

 // Display current weather data
function displayUserWeather(data) {
  const weatherCondition = data.weather[0].main;
  const iconSrc = getWeatherIcon(weatherCondition);

  weatherInfo.innerHTML = `
    <h2 id="city">${data.name}, ${data.sys.country}</h2>

    <div class="current-weather">
      <img loading="lazy" id="weather-icon" src="${iconSrc}" alt="Weather icon">
      <div class="temperature-container">
        <h3 id="temperature"> ${Math.round(data.main.temp)} °C</h3>
        <p id="weather-description">${data.weather[0].description}</p>
      </div>
    </div>

    <div class="weather-details">
      <div class="detail">
        <img loading="lazy" id="humidity-icon" src="/images/humidity.png" alt="Humidity icon">
        <span class="label">Humidity</span>
        <span id="humidity" class="value"> ${data.main.humidity}%</span>
      </div>
      <div class="detail">
        <img loading="lazy" id="wind-icon" src="/images/wind.png" alt="Wind icon">
        <span class="label">Wind</span>
        <span id="wind" class="value"> ${data.wind.speed} m/s</span>
      </div>
    </div>
  `;
}

// Fetch weather by coordinates
function getWeatherByCoords(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${CONFIG.WEATHER_API_KEY}&units=metric`
  )
    .then(res => res.json())
    .then(data => {
      displayUserWeather(data);
      get5DaysForecast(lat, lon);
    })
    .catch(() => {
      weatherInfo.innerHTML = 'Please turn on your device&apos;s location to get weather data.';;
    });
}

// Event listeners for search button and input field
cityName.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') checkWeatherBySearch(cityName.value);
});

  // Search button click event
searchButton.addEventListener('click', ()=>{
  checkWeatherBySearch(cityName.value);
});

// Geolocation button
locationBtn.addEventListener('click', () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      pos => {
        const { latitude, longitude } = pos.coords;
        getWeatherByCoords(latitude, longitude);
      },
      () => {
        weatherInfo.innerHTML = 'Unable to retrieve location.';
      }
    );
  } else {
    weatherInfo.innerHTML = 'Geolocation not supported.';
  }
});


// Load last searched city
window.onload = () => {
  const lastCity = localStorage.getItem('lastCity');
  if (lastCity) {
      checkWeatherBySearch(lastCity);
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      pos => {
        const { latitude, longitude } = pos.coords;
        getWeatherByCoords(latitude, longitude);
      },
      () => {
        weatherInfo.innerHTML = 'Unable to retrieve location.';
      }
    );
  } else {
    weatherInfo.innerHTML = 'Geolocation not supported.';
  }
};
```

Now that we have our weather app. Let’s go further to make it a progressive web app.

---

## How to Create a Manifest File

We need to create a <VPIcon icon="iconfont icon-json"/>`manifest.json` file, a critical part of making your app a PWA. We’ll also use [<VPIcon icon="fa-brands fa-npm"/>`pwa-asset-generator`](https://npmjs.com/package/pwa-asset-generator), a CLI tool that helps you to generate all the necessary icons and splash screens from a single image (like your logo). This tool also updates your <VPIcon icon="iconfont icon-json"/>`manifest.json` and optionally injects relevant `<link>` tags into <VPIcon icon="fa-brands fa-html5"/>`index.html`.

Below is the <VPIcon icon="iconfont icon-json"/>`manifest.json` file containing key properties that define how the Progressive Web App behaves and appears when installed.

```json title="manifest.json"
{
  "name": "Weatherly",                      // The full name of your app that may be shown to users.
  "short_name": "Weatherly",               // A shorter name used when space is limited, like on the home screen.
  "description": "A simple weather Progressive Web App", // A short description of what your app does.
  "start_url": "/index.html",              // The page that opens when the app is launched from the home screen.
  "display": "standalone",                 // Makes the app look like a native app without browser UI (like address bar).
  "background_color": "#ffffff",           // The background color used when the app is loading.
  "theme_color": "#2196f3",                // The main color of the app’s UI, like the status bar.
  "orientation": "portrait",                // Locks the screen orientation to portrait mode.
  "screenshots": [                         //helps show users a preview of your app before installing it — especially in places like the "Add to Home screen" prompt on Android or in app stores that support PWAs.
    {
      "src": "images/screenshots/desktop-screenshot.png",
      "sizes": "1337x645",
      "type": "image/png",
      "form_factor": "wide"
    },
    {
      "src": "images/screenshots/mobile-screenshot.png",
      "sizes": "720x1417",
      "type": "image/png",
      "form_factor": "narrow"
    }
  ]
}
```

### How to Generate Icons and Splash Screens

Inside your <VPIcon icon="fas fa-folder-open"/>`images` folder, create a new folder called <VPIcon icon="fas fa-folder-open"/>`assets`. This will store all the generated icons and splash screens. When your app is launched from the home screen, these splash screens will help improve the user experience on iOS devices.

Run the following command to generate PWA assets, update the <VPIcon icon="iconfont icon-json"/>`manifest.json`, and inject `<link>` tags into <VPIcon icon="fa-brands fa-html5"/>`index.html`

```sh
npx pwa-asset-generator logo.png ./images/assets -m manifest.json -i index.html
```

### Injected Link Tags in <VPIcon icon="fa-brands fa-html5"/>`index.html`

Once the command runs successfully, a series of `<link>` and `<meta>` Tags will be automatically added to your <VPIcon icon="fa-brands fa-html5"/>`index.html` `<head>`. These tags ensure support for splash screens and icons across various Apple devices:

```html title="index.html"
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <!-- Other meta/link tags -->

  <link rel="apple-touch-icon" href="images/assets/apple-icon-180.png">
  <meta name="mobile-web-app-capable" content="yes">

  <link rel="apple-touch-startup-image" href="images/assets/apple-splash-2048-2732.jpg" media="(device-width: 1024px) and (device-height: 1366px) and (orientation: portrait)">
  <link rel="apple-touch-startup-image" href="images/assets/apple-splash-2732-2048.jpg" media="(device-width: 1024px) and (device-height: 1366px) and (orientation: landscape)">
  <!-- ...more splash screen tags for various devices... -->
</head>
```

Here’s how the <VPIcon icon="iconfont icon-json"/>`manifest.json` file should look like now:

```json :collapsed-lines title="manifest.json"
{
  "name": "Weatherly",
  "short_name": "Weatherly",
  "description": "A simple weather Progressive Web App",
  "start_url": "/index.html",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#2196f3",
  "orientation": "portrait",
  "icons": [
    {
      "src": "images/assets/manifest-icon-192.maskable.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "images/assets/manifest-icon-192.maskable.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "maskable"
    },
    {
      "src": "images/assets/manifest-icon-512.maskable.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "images/assets/manifest-icon-512.maskable.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable"
    }
  ],
  "screenshots": [
    {
      "src": "images/screenshots/desktop-screenshot.png",
      "sizes": "1337x645",
      "type": "image/png",
      "form_factor": "wide"
    },
    {
      "src": "images/screenshots/mobile-screenshot.png",
      "sizes": "720x1417",
      "type": "image/png",
      "form_factor": "narrow"
    }
  ]
}
```

You can then link your manifest file to your HTML file:

```html title="index.html"
<link rel="manifest" href="manifest.json" />
```

---

## How to Add WorkBox to Your <VPIcon icon="fa-brands fa-js"/>`service-worker.js` File

In this tutorial, WorkBox will be added to <VPIcon icon="fa-brands fa-html5"/>`index.html` via CDN. You can copy the import code below or visit WorkBox to get the link. You can then add it to the <VPIcon icon="fa-brands fa-html5"/>`index.html` file by placing the URL inside a `<script>` tag. You can copy the import code below or visit the WorkBox website for the latest link.

```js title="service-worker.js"
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js');
```

---

## How to Create your Service Worker in the <VPIcon icon="fa-brands fa-js"/>`service-worker.js` File

Here, we’ll implement the necessary functionalities needed to make the weather app a PWA

### Step 1:** Activate the New Service Worker Immediate

Add `workbox.core.skipWaiting()` to make the newly installed service worker activate right away instead of waiting for the old one to be removed in the <VPIcon icon="fa-brands fa-js"/>`service-worker.js` file.

```js
workbox.core.skipWaiting();
```

### Step 2:** Take Control of Open Ta

Add `workbox.core.clientsClaim()` to ensure that the activated service worker takes control of all currently open pages, so the latest version of your app works immediately across all tabs after it becomes active.

```js
workbox.core.clientsClaim();
```

### Step 3: Check if Workbox is Loaded

Before using Workbox, make sure it has loaded properly.

```js
if (workbox) {
  console.log('Workbox loaded successfully');
} else {
  console.log('Workbox failed to load');
}
```

This confirms that the `workbox` object is available and ready to use. If not, the fallback message in the `else` block will be shown.

We then proceed to create the functions inside the `if` block

### Step 4: Pre-cache Core Files

Pre-cache essential files enable your app to work offline. This caches your app shell (HTML, CSS, JS), so it loads even without a network connection.

```js
workbox.precaching.precacheAndRoute([
  { url: '/index.html', revision: '3' },
  { url: '/style.css', revision: '11' },
  { url: '/app.js', revision: '7' },
  { url: '/images/logo.png', revision: '3' },
  { url: '/manifest.json', revision: '5' },
  { url: '/offline.html', revision: '1' },
]);
```

The `revision` helps with updating cached files when changes are made.

### Step 5: Cache API Responses Dynamically

Set up a route to cache data from your weather API using the `NetworkFirst` caching strategy. This tells Workbox to try fetching fresh data from the network first. If the network fails, it serves the cached version instead.

```js
// Cache API requests 
workbox.routing.registerRoute(
  ({ url }) => url.origin === 'https://api.openweathermap.org',
  new workbox.strategies.NetworkFirst({
    cacheName: 'weather-api-cache',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxAgeSeconds: 24 * 60 * 60,
        maxEntries: 10,
      }),
    ],
  })
);
```

### Step 6: Dynamic Image Caching

This function enables dynamic caching for images using the `StaleWhileRevalidate` strategy. When a user requests an image, Workbox first serves it from the cache (if available) for faster load times, while simultaneously fetching an updated version from the network to refresh the cache. This ensures users get a quick response without missing out on updated content. It’s a smart way to handle images by balancing speed and freshness.

```js
// Cache images
workbox.routing.registerRoute(
  ({ request }) => request.destination === 'image',
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'image-cache',
  })
);
```

### Step 7: Serve Cached Resources

The commonly used static files (like HTML, CSS, JS, fonts, and so on) are served quickly from the cache. It uses the `CacheFirst` strategy, meaning that the service worker will look in the cache first and only fetch from the network if the file isn’t already stored. The cache is named `"static-cache"` and it’s set to automatically remove items older than seven days using the `expiration` plugin. This helps keep the cache fresh and avoids taking up too much space.

```js
// Serve Cached Resources 
workbox.routing.registerRoute(
  ({ url }) => url.origin === self.location.origin,  
  new workbox.strategies.CacheFirst({
    cacheName: 'static-cache',  
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxAgeSeconds: 7 * 24 * 60 * 60,  // Cache static resources for 7 days
      }),
    ],
  })
);
```

### Step 8: Cache** HTML Pages with Offline Suppo

The <VPIcon icon="fa-brands fa-html5"/>`index.html` page will be handled using the NetworkFirst strategy. This means that the service worker tries to fetch the latest version from the network first. If the user is offline or the network fails, it falls back to the cached version. The cache is named `"pages-cache"` and the offline fallback page (`offline.html`) is returned when the requested page isn’t available. This ensures that users can still navigate the app even without an internet connection.

```js :collapsed-lines title="service-worker.js"
// Serve HTML pages with Network First and offline fallback
workbox.routing.registerRoute(
  ({ request }) => request.mode === 'navigate',
  async ({ event }) => {
    try {
      const response = await workbox.strategies.networkFirst({
        cacheName: 'pages-cache',
        plugins: [
          new workbox.expiration.ExpirationPlugin({
            maxEntries: 50,
          }),
        ],
      }).handle({ event });
      return response || await caches.match('/offline.html');
    } catch (error) {
      return await caches.match('/offline.html');
    }
  }
);
```

### Step 9: Handle When Workbox Doesn’t Load

You should always provide a fallback in case something goes wrong. The `if` block will have an `else` block to catch issues during development and debugging.

```js
else {
  console.log('Workbox failed to load');
}
```

Once the service worker finishes handling the different conditions in the `if-else` block, we add a general cleanup step to remove any outdated or unused caches.

### Step 10:** Clean Up Outdated Cach

During the service worker's activation phase, old or unused caches are removed. It compares all existing cache names with a list of current ones (`precache`, `weather-api-cache`, `image-cache`, `pages-cache`, and `static-resources`). If a cache doesn’t match the current list, it gets deleted. This helps keep the app lightweight and ensures that outdated data doesn't persist.

```js :collapsed-lines title="service-worker.js"
// Clean up old/unused caches during activation
self.addEventListener('activate', event => {
  const currentCaches = [
    workbox.core.cacheNames.precache,
    'weather-api-cache',
    'image-cache',
    'pages-cache',
    'static-cache'
  ];

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!currentCaches.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
```

This is what your <VPIcon icon="fa-brands fa-js"/>`service-worker.js` file should look like:

```js :collapsed-lines title="service-worker.js"
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js');

// Force waiting service worker to become active
workbox.core.skipWaiting();
workbox.core.clientsClaim();

if (workbox) {
  console.log('Workbox loaded successfully');

  // Precache critical files with revisions (update revisions when files change)
  workbox.precaching.precacheAndRoute([
    { url: '/index.html', revision: '3' },
    { url: '/style.css', revision: '11' },
    { url: '/app.js', revision: '7' },
    { url: '/images/logo.png', revision: '3' },
    { url: '/manifest.json', revision: '5' },
    { url: '/offline.html', revision: '1' },
  ]);

  // Cache API requests 
  workbox.routing.registerRoute(
    ({ url }) => url.origin === 'https://api.openweathermap.org',
    new workbox.strategies.NetworkFirst({
      cacheName: 'weather-api-cache',
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxAgeSeconds: 24 * 60 * 60,
          maxEntries: 10,
        }),
      ],
    })
  );

  // Cache images
  workbox.routing.registerRoute(
    ({ request }) => request.destination === 'image',
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'image-cache',
    })
  );

  // Serve Cached Resources 
  workbox.routing.registerRoute(
    ({ url }) => url.origin === self.location.origin,  
    new workbox.strategies.CacheFirst({
      cacheName: 'static-cache',  
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxAgeSeconds: 7 * 24 * 60 * 60,  // Cache static resources for 7 days
        }),
      ],
    })
  );

  // Serve HTML pages with Network First and offline fallback
workbox.routing.registerRoute(
  ({ request }) => request.mode === 'navigate',
  async ({ event }) => {
    try {
      const response = await workbox.strategies.networkFirst({
        cacheName: 'pages-cache',
        plugins: [
          new workbox.expiration.ExpirationPlugin({
            maxEntries: 50,
          }),
        ],
      }).handle({ event });
      return response || await caches.match('/offline.html');
    } catch (error) {
      return await caches.match('/offline.html');
    }
  }
);
} else {
  console.log('Workbox failed to load');
}

// Clean up old/unused caches during activation
self.addEventListener('activate', event => {
  const currentCaches = [
    workbox.core.cacheNames.precache,
    'weather-api-cache',
    'image-cache',
    'pages-cache',
    'static-cache'
  ];

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!currentCaches.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
```

---

## How to Set Up App Installation

The code to install the app will be written in <VPIcon icon="fa-brands fa-js"/>`install.js` following the steps below:

### Step 1:** Register the Service Work

Register the service worker to activate and run it in your app.

```js title="install.js"
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(reg => {
      reg.onupdatefound = () => {
        const newWorker = reg.installing;
        newWorker.onstatechange = () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            window.location.reload();
          }
        };
      };
    });
  })
}
```

### Step 2: Enable Custom Install Prompt

Next, we will allow users to install the weather PWA with a custom button. Inside the <VPIcon icon="fa-brands fa-js"/>`install.js` file, add the `beforeinstallprompt` event which intercepts the default prompt and shows your install button instead. When clicked, it triggers the install prompt.

```js title="install.js"
let deferredPrompt;

document.addEventListener('DOMContentLoaded', () => {
  const installBtn = document.getElementById('installBtn');

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;

    // Show the button
    installBtn.style.display = 'block';

    installBtn.addEventListener('click', () => {
      // Directly triggered by user click
      installBtn.style.display = 'none';

      // Show the install prompt
      deferredPrompt.prompt();

      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
        deferredPrompt = null;
      });
    });
  });
  // ...
```

The `appinstalled` event confirms successful installation.

```js
  // ...
  window.addEventListener('appinstalled', () => {
    console.log('PWA was installed');
  });
});
```

### Step 3: Add script tag to import <VPIcon icon="fa-brands fa-js"/>`install.js` in <VPIcon icon="fa-brands fa-html5"/>`index.html`

Add the `<script>` tag for <VPIcon icon="fa-brands fa-js"/>`install.js` inside the <VPIcon icon="fa-brands fa-html5"/>`index.html` file to include the installation logic.

```xml
<script type="module" src="/js/install.js"></script>
```

---

## How to Install the Weather App

You can choose to install the Weatherly app on your phone or desktop. Below is a demonstration on how to install it on your mobile phone:

Open the [<VPIcon icon="fas fa-globe"/>Weatherly](https://weatherly-taupe-two.vercel.app/) app in your browser. You should see an **“Install App”** button, as shown in the image below. Click on the button to continue.

![Weatherly app interface showing Install App button along with city search field, location services, and Tokyo weather history](https://cdn.hashnode.com/res/hashnode/image/upload/v1747272209446/2ade0ad7-eda5-46df-b443-a1efce90003b.png)

After clicking, a preview of the app will appear along with an **“Install”** option, as shown below. Click the Install button.

![Browser PWA installation dialog showing Weatherly app preview with Install button and app description.](https://cdn.hashnode.com/res/hashnode/image/upload/v1748387183047/b6be3b6c-6550-4c94-a453-eb928cc70dbe.png)

Once the installation is complete, the Weatherly app will appear on your home screen, just like a native app. And that’s it! Your weather app is now a Progressive Web App (PWA).

---

## Conclusion

Progressive Web Apps combine the best of web and native app experiences, and service workers are the backbone of that functionality. With tools like Workbox, you don’t have to worry about manually handling caching, offline support, or background sync. Its simple APIs and built-in strategies make it easier to build fast, reliable, and installable web apps. Whether it’s a small weather app like [<VPIcon icon="fas fa-globe"/>Weatherly](https://weatherly-pwa.vercel.app/) or a more complex project, Workbox helps you deliver a seamless user experience.

You can check out the full project and assets on [GitHub (<VPIcon icon="iconfont icon-github"/>`LolaVictoria/weatherly`)](https://github.com/LolaVictoria/weatherly)

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Implement a Service Worker with WorkBox in a Progressive Web App",
  "desc": "Imagine having a web app that looks and feels just like a native mobile app. It launches from your home screen, runs in full-screen mode, and responds smoothly to your interactions. But here’s the surprising part: it wasn’t downloaded from an app sto...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/implement-a-service-worker-with-workbox-in-a-pwa.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
