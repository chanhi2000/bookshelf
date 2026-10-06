---
lang: en-US
title: "A look at the geolocation HTML element and how it works"
description: "Article(s) > A look at the geolocation HTML element and how it works"
icon: fa-brands fa-js
category:
  - JavaScript
  - CSS
  - Article(s)
tag:
  - blog
  - piccalil.li
  - js
  - javascript
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > A look at the geolocation HTML element and how it works"
    - property: og:description
      content: "A look at the geolocation HTML element and how it works"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/piccalil.li/a-look-at-the-geolocation-html-element-and-how-it-works.html
prev: /programming/js/articles/README.md
date: 2026-08-20
isOriginal: false
author:
  - name: Daniel Schwarz
    url: https://piccalil.li/author/daniel-schwarz
cover: https://piccalil.b-cdn.net/api/og-image?slug=a-look-at-the-geolocation-html-element-and-how-it-works/
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
  name="A look at the geolocation HTML element and how it works"
  desc="There’s a new HTML in town that provides a much better interface for geolocation than the older API. Daniel Schwarz is here to explain how it all works together."
  url="https://piccalil.li/blog/a-look-at-the-geolocation-html-element-and-how-it-works"
  logo="https://piccalil.li/favicons/favicon.ico"
  preview="https://piccalil.b-cdn.net/api/og-image?slug=a-look-at-the-geolocation-html-element-and-how-it-works/"/>

The `<geolocation>` HTML element does exactly what you might think it does. It’s a dedicated element that gets the user’s location, either once or continuously. The options are set using HTML attributes instead of JavaScript, but JavaScript is still needed. However, `<geolocation>` requires *fewer lines* of JavaScript and also offers superior error and permission handling. In fact, the `<geolocation>` element started off as an all-purpose `<permission>` element, but is now dedicated to handling geolocation.

Fewer lines of code is always a good thing, but it’s the permission prompt that’s key here. When using the aging Geolocation JavaScript API, denying permission at any point can lock the user out with no way to recover unless they change the browser or operating system permissions manually. This can be a painful experience, especially for users that aren’t tech-savvy. Plus, as developers, we have to get the Permissions API involved.

Whereas, the `<geolocation>` element offers:

- Better error handling, and where applicable, recovery handholding
- User-controlled permission prompting, even if the user denied permission previously
- Auto-location if the user granted permission previously
- A styleable granted state via the `:granted` CSS pseudo-class

`<geolocation>` is better in every way except browser support (it requires Chrome 144+), so in this article, I’ll explain how to use it alongside the ~older~ current Geolocation JavaScript API so that users get the better experience, if the new element is available.

---

## Requesting the user’s location using `<geolocation>`

The `<geolocation>` element accepts several attributes that largely correspond to the options of the `getCurrentPosition()` and `watchPosition()` methods of the aging Geolocation API.

Firstly, the `accuracymode` attribute accepts two values — `approximate` (which is the default value) and `precise`.

`accuracymode=approximate` is equivalent to the `enableHighAccuracy: false` option (again, the default) from the Geolocation API, whereas `accuracymode=precise` is equivalent to `enableHighAccuracy: true`, which provides a more accurate location if the device is able to get one.

The `autolocate` boolean attribute attempts to get the user’s location automatically, assuming that they’ve granted the website permission previously.

The `watch` boolean attribute is equivalent to calling the `watchPosition()` method instead of the `getCurrentPosition()` method. `getCurrentPosition()` fetches the user’s location once, whereas `watchPosition()` tracks their location over time. Like `accuracymode=precise` and `enableHighAccuracy: true`, this drains the battery faster.

The `onlocation` event handler attribute can be used to execute JavaScript whenever location data or error information is passed to the browser.

What the `<geolocation>` element doesn’t offer, though, is the ability to specify the `timeout` (how long the browser should wait for a response) or `maximumAge` (how old a cached location can be). Instead the browser handles these as it sees fit, which is actually a good thing, because choosing the right values on a case-by-case basis is a complexity that we just don’t need.

In practice, this is how you might use `<geolocation>`:

```html
<!-- Precisely autolocate and follow the user -->
<geolocation accuracymode="precise" autolocate watch>
  <!-- Render this when <geolocation> is unsupported -->
  <button id="fallbackButton">Use precise location</button>
</geolocation>
```

That is, of course, not including the JavaScript side of `<geolocation>` nor the Geolocation (JavaScript) API fallback. If you just want the full code then you’re looking for the `getCurrentPosition()` version and `watchPosition()` version. Note that geolocation doesn’t work in insecure contexts, so while the logic is sound, the CodePen demos won’t actually work. They’re raw-logic templates anyway, not fully working demonstrations.

Anyway, let’s get into the JavaScript of it all, starting with the JavaScript that sits on the other side of that `<geolocation>` markup.

---

## Handling the `<geolocation>` data with JavaScript

First, we want to make sure that `<geolocation>` is supported with `if ("HTMLGeolocationElement" in window)`. If it is, then we select it with `const geoElement = document.querySelector("geolocation")`.

Unfortunately, we then have to dive into the most complex part of `<geolocation>` — it’s validity — where the `isValid` property returns `true` or `false` and the `invalidReason` property returns `""` (an empty string) or an enumerated value stating the reason.

These reasons mostly come down to developer oversight, so users *shouldn’t* encounter these ‘blockers’, but if they do, the `<geolocation>` button will be disabled. Here are the scenarios in which that can happen (note that the blockers are ordered by severity, and that `invalidReason` only returns the most severe one):

- `illegal_subframe`: the `<geolocation>` element is nested within a `<fencedframe>` or insecure `<iframe>` (the latter of which is why the CodePen demos don’t work)
- `unsuccessful_registration`: the page has more than three `<geolocation>` elements
- `recently_attached`: the `<geolocation>` element has only recently been attached to the DOM (this blocker expires fairly quickly)
- `intersection_changed`: the `<geolocation>` element is moving
- `intersection_out_of_viewport_or_clipped` : the `<geolocation>` element isn’t within the viewport fully
- `intersection_occluded_or_distorted`: something is obscuring the `<geolocation>` element
- `style_invalid`: the `<geolocation>` element is styled in a way that isn’t allowed (more on this later)

As you can see, these blockers are permanently avoidable as long as we catch and fix them. Let’s have a proper look at how `invalidReason` reports these blockers, though.

As the JavaScript comment below describes, `isValid` always returns `false` at first, while `invalidReason` returns `recently_attached`. This basically disables the `<geolocation>` button for a fraction of a second to prevent clickjacking. That is, unless a blocker of higher severity applies. We don’t actually need the line below, it’s there just to show you how `<geolocation>` will never be valid when the page loads.

```js
/* At first, isValid === false and invalidReason === "recently_attached"
unless isValid === false and invalidReason === "a reason of higher severity" */
console.warn(`isValid: ${geoElement.isValid}, invalidReason: ${geoElement.invalidReason}`);
```

If `<geolocation>` then becomes invalid for a more permanent reason, `isValid` will obviously remain `false`, so we can’t use the `validationstatuschange` event listener here. However, we can wrap the line in `setTimeout()` (as below). This will either log a new blocker into the console, or log that `isValid` is `true` (in which case `invalidReason` will be an empty string).

```js
/* After ~300ms, when <geolocation> is no longer ‘recently attached’ (to the DOM)
either isValid === true and invalidReason === "" (an empty string)
or isValid === false and invalidReason === "the reason with the highest severity" */
setTimeout(() => {
  console.log(`isValid: ${geoElement.isValid}, invalidReason: ${geoElement.invalidReason}`);
}, 300);
```

If the validation status changes later, *then* we can use the `validationstatuschange` event listener (again, as below). Note that if there are no persistent blockers, this will fire almost immediately as `invalidReason` switches from `recently_attached` to an empty string.

```js
/* If the validity of <geolocation> changes */
geoElement.addEventListener("validationstatuschange", () => {
  if (geoElement.isValid) {
    /* <geolocation> is valid (if there aren’t any blockers,
    it will become valid after it’s no longer ‘recently attached’ */
  } else {
    console.error(`<geolocation> invalid: ${geoElement.invalidReason}`);
  }
});
```

Now that you know how to debug the validation status and permanently fix any persistent blockers, let’s talk about the *permission* status.

We’re given a few properties and events to work with:

- `initialPermissionStatus`: a property that returns `denied`, `granted`, or `prompt` (i.e., neither) based on the permission status when the page first loaded
- `permissionStatus`: the *current* permission status
- `promptaction`: an event that fires when the user denies or grants permission from the `<geolocation>` permission prompt dialog
- `promptdismiss`: fires when the user dismisses the dialog, in which case the `permissionStatus` remains unchanged

```js :collapsed-lines
/* Determine the initial permission status */
if (geoElement.initialPermissionStatus === "denied") {
  /* The user previously denied permission */
} else if (geoElement.initialPermissionStatus === "granted") {
  /* The user previously granted permission */
} else if (geoElement.initialPermissionStatus === "prompt") {
  /* The user hasn’t made a choice */
}

/* If the user denies or grants permission */
geoElement.addEventListener("promptaction", () => {
  if (geoElement.permissionStatus === "denied") {
    /* The user denied permission */
  } else if (geoElement.permissionStatus === "granted") {
    /* The user granted permission */
  }
});

/* If the user dismisses the prompt */
geoElement.addEventListener("promptdismiss", () => {
  if (geoElement.permissionStatus === "denied") {
    /* The permission state remained denied */
  } else if (geoElement.permissionStatus === "granted") {
    /* The permission state remained granted */
  } else if (geoElement.permissionStatus === "prompt") {
    /* The permission state remained prompt */
  }
});
```

That being said, I honestly don’t know what we’d need any of that for. If the user previously denied permission, for example, the `<geolocation>` permission prompt dialog would enable the user to recover from that automatically:

![Two confirmation boxes. One reads "You previously didn't allow location for this site" and the other reads "To use your location on this site, give Chrome access"](https://piccalil.b-cdn.net/images/blog/geolocation-1.png?auto=format&w=1500)

This is in contrast to the older Geolocation API, which is unlikely to help users recover. In this case we need to read the permission status, manage the state of the component accordingly, and provide recovery instructions so that users can grant access manually, but `<geolocation>` takes care of all of that.

What you *will* need is the new `location` event, which fires whenever the browser passes location data (`geoElement.position` in this case) or error information (`geoElement.error`) to us.

Then, in the event listener callback, assuming that `geoElement.position` is truthy, we can access `position.coords` and `position.timestamp`, synthesizing the location data like this:

```js
/* If the browser passes location data or error information */
geoElement.addEventListener("location", () => {
  /* If location data */
  if (geoElement.position) {
    /* Synthesize the data */
    const {
      latitude,
      longitude,
      altitude,
      accuracy,
      altitudeAccuracy,
      heading,
      speed
    } = geoElement.position.coords;

    const timestamp = geoElement.position.timestamp;
  } else if (geoElement.error) {
    /* If error information */
  }
});
```

However, if `geoElement.error` is truthy, we can access `error.message` (that’s for us to log into the console) and `error.code`, which is much more suitable for error handling.

In short, there are three possible error codes, each with an associated constant so that we don’t need to remember what each error code represents. So `1` represents `PERMISSION_DENIED`, `2` represents `POSITION_UNAVAILABLE`, and finally, `3` represents `TIMEOUT`, and then we just evaluate them like this:

```js
/* If the browser passes location data or error information */
geoElement.addEventListener("location", () => {
  if (geoElement.position) {
    /* If location data */
  } else if (geoElement.error) {
    /* If error information */
    console.error(`<geolocation> error: ${geoElement.error.message}`);

    if (geoElement.error.code === geoElement.error.PERMISSION_DENIED) {
      /* No HTTPS or server misconfiguration */
    } else if (geoElement.error.code === geoElement.error.POSITION_UNAVAILABLE) {
      /* No location source (GPS satellite or nearby Wi-Fi network/cellular tower) */
    } else if (geoElement.error.code === geoElement.error.TIMEOUT) {
      /* Location source detection or hardware took too long */
    }
  }
});
```

`PERMISSION_DENIED` means that the website isn’t being served over HTTPS (the browser denied permission), or that there’s some kind of server misconfiguration (the server denied permission), but those two errors are permanently fixable and shouldn’t occur in production.

The only way to deny permission (as far as I’m aware) is to block location access from the browser settings, then click on the `<geolocation>` button, then choose to continue denying. In my opinion, that’s not likely to happen and doesn’t warrant an error message anyway. There isn’t a denial mechanism for OS-level blocks so as not to make the impression that the browser can enforce one. In short, I don’t think we need to do anything for `PERMISSION_DENIED`.

And to clarify, because `<geolocation>` is user-invoked, `<geolocation>` itself never sets the permission status to denied (again, as far as I know).

`POSITION_UNAVAILABLE` means that the device can’t detect a location source (nearby Wi-Fi networks and cellular towers as well as GPS satellites) to determine the location. Using a VPN or visiting the website via an in-app browser could cause this error too, so this is the trickiest error to convey to users.

`TIMEOUT` means that the location source detection or hardware took too long, and that users should try again.

How you communicate errors to users is totally up to you.

---

## Falling back to the Geolocation JavaScript API

Ready for round two? Now we’re going to do the same thing but with the aging Geolocation API, which is supported in every browser, but kind of a headache.

This is where we’re at currently:

```js
/* If <geolocation> is supported */
if ("HTMLGeolocationElement" in window) {
  /* What we covered in the previous section */
} else {
  /* What we’re focusing on now (the fallback) */
}
```

Within that `else` block, which runs when `<geolocation>` isn’t supported, we start off by selecting the fallback button (`const fallbackButton = document.querySelector("#fallbackButton")`). If you recall, this is nested within `<geolocation>` so that it’s ignored when `<geolocation>` *is* supported.

After that we create a function (`updateState()`) that manages the component state and provides recovery instructions. As arguments we supply the `state` as a string (`‌granted`, `‌prompt`, or `‌denied`, corresponding with the `permissionStatus`), and optionally, `statusMessage`, which’ll be used to convey status messages to the user. I don’t want to make any assumptions about your component, so how you convey the `statusMessage` and expand upon `updateState()` is up to you.

If `state === "denied"`, we disable the button with `fallbackButton.disabled = true` and provide some kind of recovery instruction of which should be passed as the second argument of the function. The reason why we disable the button is that *this* Geolocation API isn’t user-invoked, so to protect the user from spam requests, the browser can suppress requests and send the API straight to jail without passing go, triggering `PERMISSION_DENIED`. Additionally, if we make the API user-invoked (as we have), users can spam the button themselves and basically shadowblock themselves, but disabling the button fixes that.

If `state === "granted"` or `state === "prompt"`, we can enable the button (`fallbackButton.disabled = false`).

Now is a good time to mention that the earlier JavaScript code for the `<geolocation>` element works regardless of whether the element has the `watch` attribute or not. However, when using this older Geolocation API, there are two additional things that we need to take care of when trying to keep track of the user’s location continuously. The first thing is the watcher ID, which is returned by the `watchPosition()` method. Knowing this ID enables us to clear the watcher before registering a new one, which is a must-do for performance reasons.

So we `let watcherID = null` for now, and then we create the function that attempts to get the location (`getLocation()`), and the first thing that we do within that function, assuming that `watcherID !== null` (meaning that it’s been set before), is clear the watcher using `navigator.geolocation.clearWatch(watcherID)` and make `watcherID = null` again:

```js
/* A function for getting the location */
const getLocation = () => {
  /* If a watcher has already been registered */
  if (watcherID !== null) {
    /* Unregister it */
    navigator.geolocation.clearWatch(watcherID);
    watcherID = null;
  }
}
```

Then we disable the button using `fallbackButton.disabled = true` to, again, prevent spam clicks. If you want to bake some kind of loading indicator in, feel free to, but `<geolocation>` doesn’t.

After that we call `navigator.geolocation.watchPosition()`, setting `watcherID` to the returned watcher ID. This method has three parameters — success, error, and options.

```js
watcherID = navigator.geolocation.watchPosition(
  (position) => {
    /* Success */
  },
  (error) => {
    /* Error */
  },
  {
    /* Options */
  }
);
```

For the success callback function we synthesize the location data similarly to last time, then call `updateState("granted")`.

For the error callback function (optional but highly recommended) we clear the watcher and, again, make `watcherID = null`, but otherwise run the same error handling logic that `<geolocation>` runs. However, there are more circumstances in which the errors can occur.

For example, because `watchPosition()` and `getCurrentPosition()` aren’t necessarily user-invoked, there are more scenarios in which users are able to deny access, triggering the `PERMISSION_DENIED` error. Accordingly, we should call `updateState("denied", "Permission denied (try this or that)")`, offering a useful status message and clear recovery instructions.

Similarly, `POSITION_UNAVAILABLE` can also be triggered by an OS-level block, since not all web browsers catch this during the permission prompt dialog. `updateState("prompt", "Position unavailable (try this or that)")` is what we’re looking for this time.

Finally, another scenario that doesn’t occur with `<geolocation>` but does with *this* Geolocation API, is that if the browser prompts the user to grant permission at the OS-level, but then the user cancels their request, that can trigger the `TIMEOUT` error. Either way, call `updateState("prompt", "Request timed out (try this or that)”)`, once again tweaking it to your liking.

As you can see, the error reporting isn’t the best. Sometimes the error isn’t identified correctly, and even when it is, the error can occur for various reasons, which makes it difficult for us to convey a useful status message and clear recovery instructions. `<geolocation>` handles this better — the errors are identified correctly, and the nature of `<geolocation>` ensures that certain errors never occur to begin with. But why the error categories? Why not tell us exactly what went wrong?

Well, the reason is to make fingerprinting more difficult, and while we can totally put in the extra work to pinpoint the exact problem, simply stating what happened and what the user should do next is perfectly fine. Of course, `error.message` tells us more than `error.code` does, but the messages can be a bit vague and differ in every web browser, so we can’t read them or even output them reliably.

Anyway, the optional third parameter expects an object where we can set:

- `enableHighAccuracy`: `true` or `false`
- `timeout`: `20000` (20 seconds) is reasonable if `enableHighAccuracy: true`, `3000` - `5000` otherwise
- `maximumAge`: `0` for turn-by-turn navigation, `5000` - `10000` (5-10 seconds) for live tracking, `300000` - `600000` (5-10 minutes) for frequent updates (e.g., weather)

I’d rather that the web browser choose the `timeout` and `maximumAge` for us, especially considering the impact that they have on the `TIMEOUT` error and device battery, but of course, that’s exactly what `<geolocation>` does.

```js :collapsed-lines
/* Attempt to get the location and store the returned ID */
watcherID = navigator.geolocation.watchPosition(
  /* If location data is passed (like before) */
  (position) => {
    /* Synthesize the data (again, like before) */
    const {
      latitude,
      longitude,
      altitude,
      accuracy,
      altitudeAccuracy,
      heading,
      speed
    } = position.coords;

    const timestamp = position.timestamp;

    /* And update the state */
    updateState("granted");
  },

  /* If error information is passed (yep, like before) */
  (error) => {
    console.error(`Geolocation error: ${error.message}`);

    /* Again, unregister the watcher (if necessary) */
    if (watcherID !== null) {
      navigator.geolocation.clearWatch(watcherID);
      watcherID = null;
    }

    if (error.code === error.PERMISSION_DENIED) {
      /* No HTTPS, server misconfiguration, or the user denied access */
      updateState("denied", "Permission denied (try this or that)");
    } else if (error.code === error.POSITION_UNAVAILABLE) {
      /* No location source (GPS satellite or nearby Wi-Fi network/cellular tower) or OS-level access */
      updateState("prompt", "Position unavailable (try this or that)");
    } else if (error.code === error.TIMEOUT) {
      /* Location source detection or hardware took too long, or the user canceled their request */
      updateState("prompt", "Request timed out (try this or that)");
    }
  },
  {
    enableHighAccuracy: true,
    timeout: 20000 /* 20 seconds because enableHighAccuracy: true */,
    maximumAge: 0 /* 0 seconds because we’re demanding high accuracy */
  }
);
```

After that we need to query the permission status using the Permissions API (`navigator.permissions.query({ name: "geolocation" }).then((permissionStatus) => { /* ... */ })`), and then execute all of the aforementioned logic based on that.

If `permissionStatus.state === "granted"`, we call `getLocation()`, which is essentially what the `autolocate` attribute does. If you don’t want autolocation, simply delete this part. If it’s anything else, we basically determine the initial state by calling `updateState(permissionStatus.state)`.

```js
/* Query the permission status */
navigator.permissions.query({ name: "geolocation" }).then((permissionStatus) => {
  /* Equivalent to the autolocate attribute */
  if (permissionStatus.state === "granted") {
    getLocation();
  } else {
    /* React accordingly */
    updateState(permissionStatus.state);
  }
});
```

Finally, make the button respond to clicks:

```js
/* If the user clicks the fallback button */
fallbackButton.addEventListener("click", () => {
  getLocation();
});
```

If we only want to get the user’s location once (rather than watch it continuously), these are the modifications that we need to make:

- Remove everything related to the `watcherID`
- Swap `watchPosition()` for `getCurrentPosition()`
- Provide different settings for the options parameter

Note that the `change` event, which could help us update the state whenever the user changes their browser-level permission status, doesn’t fire in Safari. Besides, the standard browser behavior is to ask users to refresh the page, so let’s stick with that.

One more thing — I wanted the button to say “Refresh precise location” and “Getting precise location…” at certain points, but `<geolocation>` doesn’t do this, so I didn’t either. That’s up to you, though.

---

## Styling the `<geolocation>` element

`<geolocation>` has a `:granted` pseudo-class. If we throw `:not(:granted)` into the mix, we can target the prompt/denied states too:

```css
geolocation {
  &:granted {
    /* Permission granted */
  }

  &:not(:granted) {
    /* Permission not granted */
  }
}
```

With the Geolocation API, we can toggle classes as needed to achieve the same effect, but honestly, I’ve never felt compeled to style such a button in this way. Personally, I’d like to be able to change the icon and text (maybe this is something that you can bake into the `updateState()` function), but this is one of the things that the `<geolocation>` element outright forbids.

![A button element labelled "use precise location"](https://piccalil.b-cdn.net/images/blog/geolocation-2.png?auto=format&w=1500)

Before we dive into all *that*, here’s a rundown of `<geolocation>` rules stated by Google’s explainer and Mozilla’s explainer:

- There must be sufficient color contrast
- The alpha channel must resolve to `1` (so no transparency)
- The minimum and maximum width, height, and font size must be respected
- Negative margins and outline offsets aren’t allowed either
- Distortion effects — including linear gradients — are banned

It’s also worth noting that some of these rules function like guardrails (for example, you physically can’t style the height above 50px), whereas others cause `invalidReason` to return `style_invalid` and the `<geolocation>` button to be disabled.

Some of the rules seem to have changed (or are currently bugged). `<geolocation>` doesn’t respect `prefers-color-scheme` either, but it’s a developing feature, so I’m not going to comment on all of that too much. I’ll just state what I do and don’t like:

- I don’t like that the button becomes disabled because of a style (guardrails are better, but I don’t really like either)
- I don’t like the forced icon and text, and I’m also not too happy about not being able to use gradients or `corner-shape`
- I can make peace with everything else because I’d normally design within those guardrails anyway
- The text being localized into different languages is very cool, but it’s a first for web standards and I don’t currently enjoy that it’s a thing for only these permission buttons

While I obviously support preventing web authors from tricking users into giving away their location, I think it’d be better if `<geolocation>` were fully styleable and the permission prompt dialog be ultra clear about what the user is about to commit to.

Even though I can style the background, color, border, border radius, and box shadow how I’d want them (as in the image below, which is most of what I’d want), this feels like a step back towards unstyleable controls. Having said that, this approach means well (*extremely* well), so I can’t wait to see where this goes (and frankly, to be able to throw the aging Geolocation API in the bin).

![A purple button element with white text, labelled "use precise location"](https://piccalil.b-cdn.net/images/blog/geolocation-3.png?auto=format&w=1500)

---

## What now? What else?

When all web browsers support `<geolocation>`, the user experience and developer experience will improve dramatically.

But that’s not all!

What was once the `<permission>` element is now the `<geolocation>` element, `<install>` element (which facilitates the installation of Progressive Web Apps), `<usermedia>` element (which facilitates access to the user’s camera and/or microphone), and `<camera>` and `<microphone>` elements (which facilitates access to them individually).

All of these are being trialed in Chrome as part of a larger initiative to improve the process and experience of requesting permission, which is bloody great, in my opinion.

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "A look at the geolocation HTML element and how it works",
  "desc": "There’s a new HTML in town that provides a much better interface for geolocation than the older API. Daniel Schwarz is here to explain how it all works together.",
  "link": "https://chanhi2000.github.io/bookshelf/piccalil.li/a-look-at-the-geolocation-html-element-and-how-it-works.html",
  "logo": "https://piccalil.li/favicons/favicon.ico",
  "background": "rgba(253,208,0,0.2)"
}
```
