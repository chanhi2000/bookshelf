---
lang: en-US
title: "Useful DevTools Tips and Tricks"
description: "Article(s) > Useful DevTools Tips and Tricks"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - smashingmagazine.com
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Useful DevTools Tips and Tricks"
    - property: og:description
      content: "Useful DevTools Tips and Tricks"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/smashingmagazine.com/popular-devtools-tips.html
prev: /programming/css/articles/README.md
date: 2023-06-27
isOriginal: false
author:
  - name: Patrick Brosset
    url : https://smashingmagazine.com/author/patrickbrosset/
cover: https://files.smashing.media/articles/popular-devtools-tips/popular-devtools-tips.jpg
---

# {{ $frontmatter.title }} 관련

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
  name="Useful DevTools Tips and Tricks"
  desc="Let’s discover the most popular DevTools tips that can boost your productivity and revolutionize your debugging workflow."
  url="https://smashingmagazine.com/2023/06/popular-devtools-tips/"
  logo="https://smashingmagazine.com/images/favicon/favicon.svg"
  preview="https://files.smashing.media/articles/popular-devtools-tips/popular-devtools-tips.jpg"/>

You might think you know all the tricks when it comes to browser DevTools, but did you know that there are dozens of panels and hundreds of features waiting to supercharge your debugging workflow? Whatever your debugging use case is, there’s probably a tool that’s right for the job. Let’s discover the most popular DevTools tips that can boost your productivity.

When it comes to browser DevTools, we all have our own preferences and personal workflows, and we pride ourselves in knowing that “one little trick” that makes our debugging lives easier.

But also — and I know this from having worked on DevTools at Mozilla and Microsoft for the past ten years — most people tend to use the same three or four DevTools features, leaving the rest unused. This is unfortunate as there are dozens of panels and hundreds of features available in DevTools across all browsers, and even the less popular ones can be quite useful when you need them.

As it turns out, I’ve maintained the [<VPIcon icon="fas fa-globe"/>DevTools Tips website](https://devtoolstips.org/) for the past two years now. More and more tips get added over time, and traffic keeps growing. I recently started tracking the most popular tips that people are accessing on the site, and I thought it would be interesting to share some of this data with you!

So, here are the top 15 most popular DevTools tips from the website.

If there are other tips that you love and that make you more productive, consider sharing them with our community in the comments section!

Let’s count down, starting with…

---

## 15: Zoom DevTools

If you’re like me, you may find the text and buttons in DevTools too small to use comfortably. I know I’m not alone here, judging by the number of people who ask our team how to make them bigger!

Well, it turns out you can actually zoom into the DevTools UI.

DevTools’ user interface is built with HTML, CSS, and JavaScript, which means that it’s rendered as web content by the browser. And just like any other web content in browsers, it can be zoomed in or out by using the <kbd>Ctrl</kbd>+<kbd>+</kbd> and <kbd>Ctrl</kbd>+<kbd>-</kbd> keyboard shortcuts (or <kbd>Cmd</kbd>+<kbd>+</kbd> and <kbd>Cmd</kbd>+<kbd>-</kbd> on macOS).

So, if you find the text in DevTools too small to read, click anywhere in DevTools to make sure the focus is there, and then press <kbd>Ctrl</kbd>+<kbd>+</kbd> (or <kbd>Cmd</kbd>+<kbd>+</kbd> on macOS).

<VidStack src="vimeo/836119521" />

::: note

To learn more, see “[**Zoom the DevTools UI to your liking**](/devtoolstips.org/zoom-devtools-content.md).”

:::

---

## 14: Delete Annoying Overlays

Unfortunately, a big part of the web today suffers from a disease where content gets covered by countless banners, ads, and popups, making it hard to actually view or do what we came for in the first place.

While there are other solutions to do this (like using Reader Mode in some browsers), those of us who spend our entire lives within DevTools might prefer this tip:

- Click the button in DevTools to select an element. That’s the pointer-looking icon in the top-left corner. You can also use <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>C</kbd> instead (or <kbd>Cmd</kbd>+<kbd>Shift</kbd>+<kbd>C</kbd> on macOS).
- Now, hover the page and select the nasty popup or overlay you want to remove by clicking it.
- Press <kbd>Delete</kbd> on your keyboard!

<VidStack src="vimeo/836121767" />

::: note

To learn more, see “[**Remove annoying page overlays and other elements**](/devtoolstips.org/remove-annoying-overlays.md).”

:::

---

## 13: List The Fonts Used On A Page

I can see two use cases for this:

1. You’re browsing a nicely designed website and want to find out which font the site uses.
2. You’re debugging a problem on your own website where an incorrect font is being used, perhaps because of a font fallback issue or a missing glyph.

In both of these cases, you can use DevTools to find out exactly which font was used to render a piece of content.

Firefox has a really nice **Fonts** panel in the sidebar of its **Inspector** tool that lists the fonts that were used to render text content. This tool works in conjunction with the selected element too, so if you select `<body>`, then all fonts will be listed, but if you select an element like a `<p>` tag within the content, then the fonts used to render only that one element will be listed.

![([<VPIcon icon="fas fa-file-image"/>Large preview](https://files.smashing.media/articles/popular-devtools-tips/1-devtools-list-fonts.png))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/popular-devtools-tips/1-devtools-list-fonts.png)

Chromium-based browsers such as Chrome, Edge, Brave, or Opera can also display the font used by an element that contains the text:

- Select an element that only contains text children.
- Open the **Computed** tab in the sidebar of the **Elements** tool.
- Scroll down to the bottom of the tab.
- The rendered fonts are displayed.

::: note

To learn more, see “[**List the fonts used on a page or an element**](/devtoolstips.org/list-used-fonts.md).”

:::

---

## 12: Measure Arbitrary Distances On A Page

Sometimes it can be useful to quickly measure the size of an area on a webpage or the distance between two things. You can, of course, use DevTools to get the size of any given element. But sometimes, you need to measure an arbitrary distance that may not match any element on the page.

When this happens, one nice way is to use Firefox’s measurement tool:

1. If you haven’t done so already, enable the tool. This only needs to be done once: Open DevTools, go into the **Settings** panel by pressing F1 and, in the **Available Toolbox Buttons**, check the **Measure a portion of the page** option.
2. Now, on any page, click the new **Measure a portion of the page** icon in the toolbar.
3. Click and drag with the mouse to measure distances and areas.

![([<VPIcon icon="fas fa-file-image"/>Large preview](https://files.smashing.media/articles/popular-devtools-tips/2-measure-arbitrary-distances.png))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/popular-devtools-tips/2-measure-arbitrary-distances.png)

::: note

To learn more, see “[**Measure arbitrary distances in the page**](/devtoolstips.org/measure-distances.md).”

:::

---

## 11: Detect Unused Code

One way to make a webpage appear fast to your users is to make sure it only loads the JavaScript and CSS dependencies it truly needs.

This may seem obvious, but today’s complex web apps often load huge bundles of code, even when only a small portion is needed to render the first page.

In Chromium-based browsers, you can use the **Coverage** tool to identify which parts of your code are unused. Here is how:

1. Open the **Coverage** tool. You can use the Command Menu as a shortcut: press <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (or <kbd>Cmd</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> on macOS), type “coverage” and then press <kbd>Enter</kbd>.
2. Click **Start instrumenting coverage and refresh the page**.
3. Wait for the page to reload and for the coverage report to appear.
4. Click any of the reported files to open them in the **Sources** tool.

The file appears in the tool along with blue and red bars that indicate whether a line of code is used or unused, respectively.

![([<VPIcon icon="fas fa-file-image"/>Large preview](https://files.smashing.media/articles/popular-devtools-tips/3-coverage-tool-unused-code.png))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/popular-devtools-tips/3-coverage-tool-unused-code.png)

::: note

To learn more, see “[**Detect unused CSS and JavaScript code**](/devtoolstips.org/detect-unused-code.md).”

:::

---

## 10: Change The Playback Rate Of A Video

Usually, when a video appears on a webpage, the video player that displays it also provides buttons to control its playback, including a way to speed it up or slow it down. But that’s not always the case.

> [<VPIcon icon="fa-brands fa-x-twitter"/>In cases when the webpage makes it difficult or impossible to control a video, you can use DevTools to control it via JavaScript istead.](https://twitter.com/share?text=%0aIn%20cases%20when%20the%20webpage%20makes%20it%20difficult%20or%20impossible%20to%20control%20a%20video,%20you%20can%20use%20DevTools%20to%20control%20it%20via%20JavaScript%20istead.%0a&url=https://smashingmagazine.com%2f2023%2f06%2fpopular-devtools-tips%2f)

1. Open DevTools.
2. Select the `<video>` element in the **Elements** tool (called **Inspector** in Firefox).
3. Open the **Console** tool.
4. Type the following: `$0.playbackRate = 2;` and press <kbd>Enter</kbd>.

The [**`$0` expression**](/devtoolstips/get-recently-selected-dom-nodes-in-console.md) is a shortcut that refers to whatever element is currently selected in DevTools; in this case, it refers to the `<video>` HTML element.

By using the `playbackRate` property of the `<video>` element, you can speed up or slow down the video. Note that you could also use any of the other `<video>` element properties or methods, such as:

- `$0.pause()` to pause the video;
- `$0.play()` to resume playing the video;
- `$0.loop = true` to repeat the video in a loop.

![([<VPIcon icon="fas fa-file-image"/>Large preview](https://files.smashing.media/articles/popular-devtools-tips/4-playback-rate-video.png))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/popular-devtools-tips/4-playback-rate-video.png)

::: note

To learn more, see “[**Speed up or slow down a video**](/devtoolstips.org/change-video-playback-rate.md).”

:::

---

## 9: Use DevTools In Another Language

If, like me, English isn’t your primary language, using DevTools in English might make things harder for you.

If that’s your case, know that you can actually use a translated version of DevTools that either matches your operating system, your browser, or a language of your choice.

The procedure differs per browser.

In Safari, both the browser and Web Inspector (which is what DevTools is called in Safari) inherit the language of the operating system. So if you want to use a different language for DevTools, you’ll need to set it globally by going into **System preferences** → **Language & Region** → **Apps**.

In Firefox, DevTools always matches the language of the browser. So, if you want to use DevTools in, say, French, then download Firefox in French.

Finally, in Chrome or Edge, you can choose to either match the language of the browser or set a different language just for DevTools.

To make your choice:

1. Open DevTools and press <kbd>F1</kbd> to open the **Settings**.
2. In the **Language** drop-down, choose either **Browser UI language** to match the browser language or choose another language from the list.

![([<VPIcon icon="fas fa-file-image"/>Large preview](https://files.smashing.media/articles/popular-devtools-tips/5-devtools-different-languages.png))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/popular-devtools-tips/5-devtools-different-languages.png)

::: note

To learn more, see “[**Use DevTools in another language**](/devtoolstips.org/use-another-language.md).”

:::

---

## 8: Disable Event Listeners

Event listeners can sometimes get in the way of debugging a webpage. If you’re investigating a particular issue, but every time you move your mouse or use the keyboard, unrelated event listeners are triggered, this could make it harder to focus on your task.

A simple way to disable an event listener is by selecting the element it applies to in the **Elements** tool (or **Inspector** in Firefox). Once you’ve found and selected the element, do either of the following:

- In Firefox, click the **event** badge next to the element, and in the popup that appears, uncheck the listeners you want to disable.
- In Chrome or Edge, click the **Event Listeners** tab in the sidebar panel, find the listener you want to remove, and click **Remove**.

![([<VPIcon icon="fas fa-file-image"/>Large preview](https://files.smashing.media/articles/popular-devtools-tips/6-devtools-disable-event-listeners.png))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/popular-devtools-tips/6-devtools-disable-event-listeners.png)

::: note

To learn more, see “[**Remove or disable event listeners**](/devtoolstips.org/disable-event-listeners.md).”

:::

---

## 7: View Console Logs On Non-Safari Browsers On iOS

As you might know, Safari isn’t the only browser you can install and use on an iOS device. Firefox, Chrome, Edge, and others can also be used. Technically, they all run on the same underlying browser rendering engine, WebKit, so a website should more or less look the same in all of these browsers in iOS.

However, it’s possible to have bugs on other browsers that don’t replicate in Safari. This can be quite tricky to investigate. While it’s possible to debug Safari on an iOS device by attaching the device to a Mac with a USB cable, it’s impossible to debug non-Safari browsers.

Thankfully, there is a way to at least see your console logs in Chrome and Edge (and possibly other Chromium-based browsers) when using iOS:

1. Open Chrome or Edge on your iOS device and go to the special `about:inspect` page.
2. Click **Start Logging**.
3. Keep this tab open and then open another one.
4. In the new tab, go to the page you’re trying to debug.
5. Return to the previous tab. Your console logs should now be displayed.

![([<VPIcon icon="fas fa-file-image"/>Large preview](https://files.smashing.media/articles/popular-devtools-tips/7-console-logs-non-safari-browsers.png))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/popular-devtools-tips/7-console-logs-non-safari-browsers.png)

::: note

To learn more, see “[**View console logs from non-Safari browsers on an iPhone**](/devtoolstips.org/view-logs-for-other-browsers-on-ios/).”

:::

---

## 6: Copy Element Styles

Sometimes it’s useful to extract a single element from a webpage, maybe to test it in isolation. To do this, you’ll first need to extract the element’s HTML code via the **Elements** tool by right-clicking the element and choosing **Copy** → **Copy outer HTML**.

Extracting the element’s styles, however, is a bit more difficult as it involves going over all of the CSS rules that apply to the element.

Chrome, Edge, and other Chromium-based browsers make this step a lot faster:

1. In the **Elements** tool, select the element you want to copy styles from.
2. Right-click the selected element.
3. Click **Copy** → **Copy styles**.
4. Paste the result in your text editor.

You now have all the styles that apply to this element, including inherited styles and custom properties, in a single list.

![([<VPIcon icon="fas fa-file-image"/>Large preview](https://files.smashing.media/articles/popular-devtools-tips/8-devtools-copy-element-styles.png))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/popular-devtools-tips/8-devtools-copy-element-styles.png)

::: note

To learn more, see “[**Copy an element’s styles**](/devtoolstips/copy-element-styles.md).”

:::

---

## 5: Download All Images On The Page

This nice tip isn’t specific to any browser and can be run anywhere as long as you can execute JavaScript. If you want to download all of the images that are on a webpage, open the **Console** tool, paste the following code, and press <kbd>Enter</kbd>:

```js
$('img').forEach(async (img) => {
 try {
   const src = img.src;
   // Fetch the image as a blob.
   const fetchResponse = await fetch(src);
   const blob = await fetchResponse.blob();
   const mimeType = blob.type;
   // Figure out a name for it from the src and the mime-type.
   const start = src.lastIndexOf('/') + 1;
   const end = src.indexOf('.', start);
   let name = src.substring(start, end === -1 ? undefined : end);
   name = name.replace(/[^a-zA-Z0-9]+/g, '-');
   name += '.' + mimeType.substring(mimeType.lastIndexOf('/') + 1);
   // Download the blob using a <a> element.
   const a = document.createElement('a');
   a.setAttribute('href', URL.createObjectURL(blob));
   a.setAttribute('download', name);
   a.click();
 } catch (e) {}
});
```

![([<VPIcon icon="fas fa-file-image"/>Large preview](https://files.smashing.media/articles/popular-devtools-tips/9-devtools-download-images.png))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/popular-devtools-tips/9-devtools-download-images.png)

Note that this might not always succeed: the CSP policies in place on the web page may cause some of the images to fail to download.

If you happen to use this technique often, you might want to turn this into a [**reusable snippet**](/devtoolstips/use-scripts-as-snippets/) of code by pasting it into the **Snippets** panel, which can be found in the left sidebar of the **Sources** tool in Chromium-based browsers.

In Firefox, you can also press <kbd>Ctrl</kbd>+<kbd>I</kbd> on any webpage to open **Page Info**, then go to **Media** and select **Save As** to download all the images.

::: note

To learn more, see “[**Download all images from the page**](/devtoolstips.org/download-all-images.md).”

:::

---

## 4: Visualize A Page In 3D

The HTML and CSS code we write to create webpages gets parsed, interpreted, and transformed by the browser, which turns it into various tree-like data structures like the DOM, compositing layers, or the stacking context tree.

While these data structures are mostly internal in-memory representations of a running webpage, it can sometimes be helpful to explore them and make sure things work as intended.

A three-dimensional representation of these structures can help see things in a way that other representations can’t. Plus, let’s admit it, it’s cool!

Edge is the only browser that provides a tool dedicated to visualizing webpages in 3D in a variety of ways.

1. The easiest way to open it is by using the **Command Menu**. Press <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (or <kbd>Cmd</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> on macOS), type “3D” and then press <kbd>Enter</kbd>.
2. In the **3D View** tool, choose between the three different modes: **Z-Index**, **DOM**, and **Composited Layers**.
3. Use your mouse cursor to pan, rotate, or zoom the 3D scene.

The **Z-Index** mode can be helpful to know which elements are stacking contexts and which are positioned on the z-axis.

The **DOM** mode can be used to easily see how deep your DOM tree is or find elements that are [**outside of the viewport**](/devtoolstips/spot-out-of-viewport-elements.md).

The **Composited Layers** mode shows all the different layers the browser rendering engine creates to paint the page as quickly as possible.

![([<VPIcon icon="fas fa-file-image"/>Large preview](https://files.smashing.media/articles/popular-devtools-tips/10-devtools-visualize-page-3D.png))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/popular-devtools-tips/10-devtools-visualize-page-3D.png)

Consider that Safari and Chrome also have a **Layers** tool that shows composited layers.

::: note

To learn more, see “[**See the page in 3D**](/devtoolstips/see-the-page-in-3d.md).”

:::

---

## 3: Disable Abusive Debugger Statements

Some websites aren’t very nice to us web developers. While they seem normal at first, as soon as you open DevTools, they immediately get stuck and pause at a JavaScript breakpoint, making it very hard to inspect the page!

These websites achieve this by adding a `debugger` statement in their code. This statement has no effect as long as DevTools is closed, but as soon as you open it, DevTools pauses the website’s main thread.

If you ever find yourself in this situation, here is a way to get around it:

1. Open the **Sources** tool (called **Debugger** in Firefox).
2. Find the line where the debugger statement is. That shouldn’t be hard since the debugger is currently paused there, so it should be visible right away.
3. Right-click on the line number next to this line.
4. In the context menu, choose **Never pause here**.
5. Refresh the page.

![([<VPIcon icon="fas fa-file-image"/>Large preview](https://files.smashing.media/articles/popular-devtools-tips/11-disable-abusive-debugger-statements.png))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/popular-devtools-tips/11-disable-abusive-debugger-statements.png)

::: note

To learn more, see “[**Disable abusive debugger statements that prevent inspecting websites**](/devtoolstips/disable-abusive-debugger-statement.md).”

:::

---

## 2: Edit And Resend Network Requests

When working on your server-side logic or API, it may be useful to send a request over and over again without having to reload the entire client-side webpage and interact with it each time. Sometimes you just need to tweak a couple of request parameters to test something.

One of the easiest ways to do this is by using Edge’s **Network Console** tool or Firefox’s **Edit and Resend** feature of the **Network** tool. Both of them allow you to start from an existing request, modify it, and resend it.

In Firefox:

- Open the **Network** tool.
- Right-click the network request you want to edit and then click **Edit and Resend**.
- A new sidebar panel opens up, which lets you change things like the URL, the method, the request parameters, and even the body.
- Change anything you need and click **Send**.

In Edge:

- First, enable the **Network Console** tool by going into the **Settings** panel (press <kbd>F1</kbd>) → **Experiments** → **Enable Network Console**.
- Then, in the **Network** tool, find the request you want to edit, right-click it and then click **Edit and Resend**.
- The **Network Console** tool appears, which lets you change the request just like in Firefox.
- Make the changes you need, and then click **Send**.

Here is what the feature looks like in Firefox:

![([<VPIcon icon="fas fa-file-image"/>Large preview](https://files.smashing.media/articles/popular-devtools-tips/12-edit-resend-network-requests.png))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/popular-devtools-tips/12-edit-resend-network-requests.png)

::: note

To learn more, see “[**Edit and resend faulty network requests to debug them**](/devtoolstips.org/edit-and-resend-network-requests.md).”

:::

If you need to resend a request without editing it first, you can  too. (See: [**Replay a XHR request**](/devtoolstips.org/replay-xhr.md))

And the honor of being the Number One most popular DevTools tip in this roundup goes to… 🥁

---

## 1: Simulate Devices

This is, by far, the most widely viewed DevTools tip on my website. I’m not sure why exactly, but I have theories:

- Cross-browser and cross-device testing remain, to this day, one of the most important pain points that web developers face, and it’s nice to be able to simulate other devices from the comfort of your development browser.
- People might be using it to achieve non-dev tasks. For example, people use it to post photos on Instagram from their laptops or desktop computers!

It’s important to realize, though, that DevTools can’t simulate what your website will look like on another device. Underneath it, it is all still the same browser rendering engine. So, for example, when you simulate an iPhone by using Firefox’s **Responsive Design Mode**, the page still gets rendered by Firefox’s rendering engine, Gecko, rather than Safari’s rendering engine, WebKit.

Always test on actual browsers and actual devices if you don’t want your users to stumble upon bugs you could have caught.

That being said,

> [<VPIcon icon="fa-brands fa-x-twitter"/>Simulating devices in DevTools is very useful for testing how a layout works at different screen sizes and device pixel ratios. You can even use it to simulate touch inputs and other user agent strings.](https://twitter.com/share?text=%0aSimulating%20devices%20in%20DevTools%20is%20very%20useful%20for%20testing%20how%20a%20layout%20works%20at%20different%20screen%20sizes%20and%20device%20pixel%20ratios.%20You%20can%20even%20use%20it%20to%20simulate%20touch%20inputs%20and%20other%20user%20agent%20strings.%0a&url=https://smashingmagazine.com%2f2023%2f06%2fpopular-devtools-tips%2f)

Here are the easiest ways to simulate devices per browser:

- In Safari, press <kbd>Ctrl</kbd>+<kbd>Cmd</kbd>+<kbd>R</kbd>, or click **Develop** in the menu bar and then click **Enter Responsive Design Mode**.
- In Firefox, press <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>M</kbd> (or <kbd>Cmd</kbd>+<kbd>Shift</kbd>+<kbd>M</kbd>), or use the browser menu → **More tools** → **Responsive design mode**.
- In Chrome or Edge, open DevTools first, then press <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>M</kbd> (or <kbd>Cmd</kbd>+<kbd>Shift</kbd>+<kbd>M</kbd>), or click the **Device Toolbar** icon.

Here is how simulating devices looks in Safari:

![([<VPIcon icon="fas fa-file-image"/>Large preview](https://files.smashing.media/articles/popular-devtools-tips/13-simulating-devices-safari.png))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/popular-devtools-tips/13-simulating-devices-safari.png)

::: note

To learn more, see “[**Simulate different devices and screen sizes**](/devtoolstips.org/simulate-devices.md).”

:::

Finally, if you find yourself simulating screen sizes often, you might be interested in using [<VPIcon icon="fas fa-globe"/>Polypane](https://polypane.app/). Polypane is a great development browser that lets you simulate multiple synchronized viewports at the same time, so you can see how your website renders at different sizes at the same time.

![([<VPIcon icon="fas fa-file-image"/>Large preview](https://files.smashing.media/articles/popular-devtools-tips/14-devtools-polypane-browser.png))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/popular-devtools-tips/14-devtools-polypane-browser.png)

Polypane comes with its own set of unique features, which you can also find on [<VPIcon icon="fas fa-globe"/>DevTools Tips](https://devtoolstips.org/browser/polypane/).

---

## Conclusion

I’m hoping you can see now that DevTools is very versatile and can be used to achieve as many tasks as your imagination allows. Whatever your debugging use case is, [**there’s probably a tool**](https://devtoolstips/discover-all-tools.md) that’s right for the job. And if there isn’t, you may be able to find out what you need to know by running JavaScript in the **Console**!

If you’ve discovered cool little tips that come in handy in specific situations, please share them in the comments section, as they may be very useful to others too.

::: info Further Reading on Smashing Magazine

- “[CSS Auditing Tools](https://smashingmagazine.com/2021/03/css-auditing-tools/),” Iris Lješnjanin
- “[DevTools Debugging Tips And Shortcuts (Chrome, Firefox, Edge)](https://smashingmagazine.com/2021/02/useful-chrome-firefox-devtools-tips-shortcuts/),” Vitaly Friedman
- “[Accessibility In Chrome DevTools](https://smashingmagazine.com/2020/08/accessibility-chrome-devtools/),” Umar Hansa
- “[How To Make Life Easier When Using Git](https://smashingmagazine.com/make-life-easier-when-using-git/),” Shane Hudson

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Useful DevTools Tips and Tricks",
  "desc": "Let’s discover the most popular DevTools tips that can boost your productivity and revolutionize your debugging workflow.",
  "link": "https://chanhi2000.github.io/bookshelf/smashingmagazine.com/popular-devtools-tips.html",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```
