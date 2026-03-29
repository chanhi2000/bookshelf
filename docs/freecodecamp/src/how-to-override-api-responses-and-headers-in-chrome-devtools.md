---
lang: en-US
title: "How to Override API Responses and Headers in Chrome DevTools: A Step-by-Step Guide"
description: "Article(s) > How to Override API Responses and Headers in Chrome DevTools: A Step-by-Step Guide"
icon: fa-brands fa-chrome
category:
  - Web Browser
  - Google
  - Chrome
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - browser
  - webbrowser
  - web-browser
  - google
  - chrome
  - googlechrome
  - google-chrome
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Override API Responses and Headers in Chrome DevTools: A Step-by-Step Guide"
    - property: og:description
      content: "How to Override API Responses and Headers in Chrome DevTools: A Step-by-Step Guide"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-override-api-responses-and-headers-in-chrome-devtools.html
prev: /tool/chrome/articles/README.md
date: 2026-03-27
isOriginal: false
author:
  - name: Tapas Adhikary
    url: https://freecodecamp.org/news/author/atapas/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/a2fee8e9-cb71-4065-af8e-ef0357e6ca2c.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Google Chrome > Article(s)",
  "desc": "Article(s)",
  "link": "/tool/chrome/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Override API Responses and Headers in Chrome DevTools: A Step-by-Step Guide"
  desc="Have you ever faced a situation as a frontend developer where you needed to show a demo to your product manager, and something was broken in the API response? Or, a production bug where you were block"
  url="https://freecodecamp.org/news/how-to-override-api-responses-and-headers-in-chrome-devtools"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/a2fee8e9-cb71-4065-af8e-ef0357e6ca2c.png"/>

Have you ever faced a situation as a frontend developer where you needed to show a demo to your product manager, and something was broken in the API response? Or, a production bug where you were blocked by waiting on your backend team to provide you with a fix to implement further on the frontend?

To make things even worse, how about a CORS error that completely prevented you from showing the page?

It happens, right? Going back to the backend team and getting a quick fix for these issues would be ideal, but may not be realistic in most cases. It depends on the availability of the backend developers, the priority items they're working on, communication protocols between teams, and even interpersonal relationships.

Now, the question is, can you afford to wait? Wait for things to work in your favour within the given deadline so that you can show that demo or deliver the work to your customer? The answer is NO. You may not have that luxury.

Today, in this article, you'll learn a couple of mind-blowing tips and tricks that will save you from these situations. You'll understand how to set up your Chrome browser so that you can continue with your frontend development even when the backend API returns an incorrect response or a CORS error.

This is a step-by-step guide that'll help make you comfortable with all the required configurations and get you set up to use it on your web projects. This guide is also available as a video tutorial as part of the [<VPIcon icon="fa-brands fa-youtube"/>Thinking in Debugging](https://youtube.com/playlist?list=PLIJrr73KDmRwT8Msc4H3_CP5Tf8MqqqVZ) series. You can check it out if you’d like:

<VidStack src="youtube/ndrPcDNmwFk" />

Let's get started with the problems and their solutions.

---

## Problem 1: The Backend Response Is Wrong

Here is a classic case of a wrong API response, but you still need to continue with your frontend work.

Take a look at the image below. Do you see that something is off? Yeah, on the first card, the spelling of `Banana` seems to be misspelled as `Banananana`. This user interface is constructed using the data we have received as an API response.

![Incorrect spelling of banana on first card](https://cdn.hashnode.com/uploads/covers/5c9bb4026656f09759cdc1f0/2bef7ac2-98c0-419a-b783-ee64900f8121.png)

We can go to the backend team and request that they fix it as soon as possible. But it may not happen until the next sprint starts, which might be 15 days from now.

So, what can we do to continue with our work and all the validations on the frontend side? We can use the `Content Overriding` feature of the Chrome browser to mitigate this situation.

### How to Use `Content Overriding`

First, open up the DevTools of your Chrome browser by pressing the F12 (on Mac, Cmd+F12) key. Then move to the network tab and inspect the API request that returns the incorrect response.

![Network Request](https://cdn.hashnode.com/uploads/covers/5c9bb4026656f09759cdc1f0/f9689133-c7cd-400e-b0cc-5275fe1ca7ec.png)

Next, right-click on the API request and select the `Override content` option from the context menu.

You may wonder what content means here, and what I am overriding? You're overriding the API response so that it can reflect on the UI locally.

![Override Content Option](https://cdn.hashnode.com/uploads/covers/5c9bb4026656f09759cdc1f0/31d4e340-d9fa-4dec-81cc-08fbf644aa58.png)

This will bring up a UI at the top where you can select a folder to store override files. It's important to understand that all the content overrides are locally stored on your machine's hard disk. This means you can use these persisted overrides again and again until someone fixes the issue permanently at the backend.

Now click on the `Select folder` button.

![Select a Folder](https://cdn.hashnode.com/uploads/covers/5c9bb4026656f09759cdc1f0/7d238b9d-146c-4592-9008-26c7c189a0de.png)

This will open up the folder explorer for you. Create a new folder and select it, or select an existing folder where you want to save the overrides. In my case, I've named the folder as `debug_devtools`.

![Select a Folder](https://cdn.hashnode.com/uploads/covers/5c9bb4026656f09759cdc1f0/7bc13c7b-0ffa-442a-899e-98a805fcddac.png)

Now, Chrome DevTools will ask for confirmation that you're allowing DevTools to edit files on your local system. Just click on the `Allow` button.

![Allow](https://cdn.hashnode.com/uploads/covers/5c9bb4026656f09759cdc1f0/07ff30f6-8bef-40c3-aee9-bcd55545c67f.png)

That's all for the setup. Now, you'll find the same response in the editable mode under the `Sources` tab of DevTools. Let's take a deeper look at the image below:

1. The Local overrides are listed under the `Sources > Oveerides` tab of the DevTools.
2. On the left side, the `Enable Local Overrides` checkbox is selected, and the overrides are listed below. You can find the same folder you created before, and under that, you'll see another folder called `localhost:3001` and a file called `edibles` under it. The localhost:3001 folder name is related to the API endpoint namespace we're connecting to. The edibles file name under it goes with the request name.
3. On the right side, you can see the content (that is, the response to the edibles request) in editable mode.

![](https://cdn.hashnode.com/uploads/covers/5c9bb4026656f09759cdc1f0/fc918250-c1ab-4b56-8505-3032e698b8cc.png)

You can even cross-check now by traversing to the file system's `debug_devtools` folder. You should find the same folders and files as you saw in the DevTools.

![Response in folder](https://cdn.hashnode.com/uploads/covers/5c9bb4026656f09759cdc1f0/81fd4e82-ae7d-4d07-88d8-5a757edbc3ef.png)

You can open up the `edibles` file. The file content should match exactly the response you saw before.

![edibles content](https://cdn.hashnode.com/uploads/covers/5c9bb4026656f09759cdc1f0/4ba75464-0a29-4f11-9bc6-be0463e10dd5.png)

Now, it's time to override. Coming to the Sources tab's editable response panel, you can fix the spelling. Save your changes using Ctrl + S (or Cmd + S).

![edit text](https://cdn.hashnode.com/uploads/covers/5c9bb4026656f09759cdc1f0/c33701f0-ddb1-478c-8fe6-d68ddf8dd638.png)

Now, hard refresh your browser. You should be able to see your change reflected on the UI.

![Banana Fixed](https://cdn.hashnode.com/uploads/covers/5c9bb4026656f09759cdc1f0/1414be9d-adf4-41a6-8cbc-d115a49bb8a6.png)

Awesome!! You can now share this overridden response (the `edibles` file) with other developers to point to from their Chrome DevTools to get the same local fix until the backend fixes it.

---

## Problem 2: Validating a UI Scenario Without Backend Changes

Imagine you need to validate that certain items are low in stock on an item listing page. If the stock quantity of an item hits 50 or below, you want to show a `Low Stock` label for that item.

Now, what if the API response doesn't return a quantity of 50 or below? Content overriding can come to the rescue once again!

You can edit the response to set the quantity value to 50 or below and follow the same process as before to reflect the change on the UI. Look at the image below:

1. We have edited the quantity on the right-side panel.
2. Once saved and refreshed, we not only see the updated count on the UI, but it also runs the underlying JavaScript logic to show the `Low Stock` label automatically. This is a superpower.

![Stock](https://cdn.hashnode.com/uploads/covers/5c9bb4026656f09759cdc1f0/77b8578e-ecc9-4397-b980-e24cc0ab099e.png)

---

## Problem 3: Handling CORS Errors

[<VPIcon icon="fa-brands fa-youtube"/>Cross-Origin Resource Sharing (CORS)](https://youtu.be/lPiQClBVYY4) is a browser security feature that allows a web server to explicitly grant requests coming from a domain other than its own. By default, browsers don't allow these cross-origin requests and follow a strict rule called `Same Origin Resource Sharing`.

In many cases, your API server and the web server could be hosted on different domains. In those cases, when the web application attempts to access an API, it faces the CORS error.

![CORS Error](https://cdn.hashnode.com/uploads/covers/5c9bb4026656f09759cdc1f0/f739eb08-6bb1-4534-9080-0417d511396c.png)

On the server side, you need to have explicit configurations to allow cross-origin requests. For example, you need to add the following response headers:

```sh
Access-Control-Allow-Origin: http://localhost:5174
Access-Control-Allow-Methods: GET
Access-Control-Allow-Headers: *
```

So, again, it may not be guaranteed that your CORS error will be resolved at the server side as soon as you want. But you cann't afford to get blocked due to it. So, what's the way around? Yes! The overriding, but this time, overriding the response header.

Go to the network tab of the Chrome DevTools and right-click on the request that has the CORS error. Now, select the `Override headers` option from the context menu.

By the way, have you noticed that the `Override content` option is disabled here? This is because we don't have any response as content from this request, as it got an error.

![](https://cdn.hashnode.com/uploads/covers/5c9bb4026656f09759cdc1f0/4d81fbb1-e960-48f2-bdd7-597e686faff6.png)

Clicking on the `Overriding headers` will take you to the `Headers` tab where you can find the option to add additional headers to the response headers. Click on the `+ Add header` button to add the CORS-related headers.

![Add Header](https://cdn.hashnode.com/uploads/covers/5c9bb4026656f09759cdc1f0/9acdbde3-0b12-4cef-9437-844ca92d502c.png)

Add all three headers with their respective values one by one:

```sh
Access-Control-Allow-Origin: http://localhost:5174 
Access-Control-Allow-Methods: GET 
Access-Control-Allow-Headers: *
```

Each of these headers has its own important use:

1. With the `Access-Control-Allow-Origin` header, you can specify the origin domains that are allowed to have a cross-origin request to the server. In this case, the value is `http://localhost:5174` where we're running a Vite-based ReactJS app.
2. The header `Access-Control-Allow-Methods` specifies what kind of HTTP methods are allowed from the originating domain. In this case, we're allowing only the `GET` method.
3. The `Access-Control-Allow-Headers` HTTP response headers specify which HTTP headers can be safely used during a cross-origin request.

Alright, let's add them all and save.

![CORS Headers](https://cdn.hashnode.com/uploads/covers/5c9bb4026656f09759cdc1f0/02fc7203-9ca6-47cf-a478-f20d928ece54.png)

Like overriding content, overriding the header will also create a folder with the context of the server domain, and under that, a file called `.headers`. As the file name starts with a dot(.), it may be treated as a hidden file by most operating systems. So make sure you go through the OS settings to view the hidden files to view this file.

![Hidden headers file](https://cdn.hashnode.com/uploads/covers/5c9bb4026656f09759cdc1f0/ab93a8d4-b87d-4cf4-8a0e-1d6ce4d26537.png)

Once you view and open the file, you'll see the headers you have added with overriding.

![headers content](https://cdn.hashnode.com/uploads/covers/5c9bb4026656f09759cdc1f0/8dfe3ee3-2250-489a-a465-f9796934a470.png)

Now, hard refresh your browser, and try to perform the same operation that was giving you the CORS error before. Wow, the error has gone now! You should be able to see the request success and the response coming back from the server.

![User Data](https://cdn.hashnode.com/uploads/covers/5c9bb4026656f09759cdc1f0/351dcb19-af06-4058-b08d-d449b92ab898.png)

Just imagine, not a single line of server-side code changes, and you're unblocked so you can move forward with your client-side UI work. Fantastic, isn't it?

---

## Additional Tips

Before we end, let's learn about a couple more handy tips.

### Applying Overrides Globally

We applied the CORS error-related header overriding only on the `/user` API endpoint. What if you need to apply the same overriding for other endpoints, too? You can do it easily by following these simple steps:

1. Navigate to the `Sources` tab.
2. Select the `Overrides` sub-tab.
3. Click on the `.headers` override.
4. On the right-side panel, change the value of the `Apply to` to `*`.

That's it. Now, the same response headers will be applied as overrides for all the endpoints.

![Apply To](https://cdn.hashnode.com/uploads/covers/5c9bb4026656f09759cdc1f0/c15a94e4-a2e9-48b1-8ae1-c781424be388.png)

### Disabling or Removing Overrides

Sometimes, you might want to disable or remove overrides. To disable overrides without removing them, just uncheck the `Enable Local Overrides` checkbox. To remove all the overrides permanently, click on the stop icon at the top-right corner. Also, to selectively remove an override, right-click on it and delete.

![](https://cdn.hashnode.com/uploads/covers/5c9bb4026656f09759cdc1f0/80c59dc2-0eea-48ad-b499-be1d4493512c.png)

::: info Learn More From the Thinking in Debugging Mindset

If you've liked this practical, example-driven guide, you'll enjoy my other debugging-related content from the *Thinking in Debugging* series. Please [<VPIcon icon="fa-brands fa-youtube"/>check it out](https://youtube.com/playlist?list=PLIJrr73KDmRwT8Msc4H3_CP5Tf8MqqqVZ).

![<VPIcon icon="fa-brands fa-youtube"/>Thinking in Debugging](https://cdn.hashnode.com/uploads/covers/5c9bb4026656f09759cdc1f0/9046f04f-71f1-4303-b39c-7267fd3814bc.png)

:::

---

## Before We End…

That’s all! I hope you found this insightful.

Let’s connect:

- Subscribe to my [YouTube Channel (<VPIcon icon="fa-brands fa-youtube"/>`tapasadhikary`)](https://youtube.com/tapasadhikary).
- Check out my courses, [<VPIcon icon="fa-brands fa-youtube"/>40 Days of JavaScript](https://youtube.com/playlist?list=PLIJrr73KDmRw2Fwwjt6cPC_tk5vcSICCu) and [<VPIcon icon="fa-brands fa-youtube"/>15 Days of React Design Patterns](https://youtube.com/playlist?list=PLIJrr73KDmRyQVT__uFZvaVfWPdfyMFHC)
- Follow on [LinkedIn (<VPIcon icon="fa-brands fa-linkedin"/>`tapasadhikary`)](https://linkedin.com/in/tapasadhikary/) if you don't want to miss the daily dose of up-skilling tips.
- Join my [<VPIcon icon="fa-brands fa-discord"/>Discord Server](https://discord.gg/zHHXx4vc2H), and let’s learn together.
- Follow my work on [GitHub (<VPIcon icon="iconfont icon-github"/>`tapascript`)](https://github.com/tapascript).

See you soon with my next article. Until then, please take care of yourself and keep learning.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Override API Responses and Headers in Chrome DevTools: A Step-by-Step Guide",
  "desc": "Have you ever faced a situation as a frontend developer where you needed to show a demo to your product manager, and something was broken in the API response? Or, a production bug where you were block",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-override-api-responses-and-headers-in-chrome-devtools.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
