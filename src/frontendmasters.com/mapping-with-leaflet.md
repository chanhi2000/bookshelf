---
lang: en-US
title: "Mapping with Leaflet"
description: "Article(s) > Mapping with Leaflet"
icon: fa-brands fa-js
category:
  - JavaScript
  - Article(s)
tag:
  - blog
  - frontendmasters.com
  - js
  - javascript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Mapping with Leaflet"
    - property: og:description
      content: "Mapping with Leaflet"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/mapping-with-leaflet.html
prev: /programming/js/articles/README.md
date: 2025-01-29
isOriginal: false
author:
  - name: Raymond Camden
    url: https://frontendmasters.com/blog/author/raymondcamden/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/5055
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

[[toc]]

---

<SiteInfo
  name="Mapping with Leaflet"
  desc="Leaflet.js is a free open-source mapping library. We'll look at how to use it to create a basic map with location points of cats up for adoption. "
  url="https://frontendmasters.com/blog/mapping-with-leaflet/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/5055"/>

It *seems* relatively simple: you have some data that involves location and you want to display those locations on a map.

*But how do you choose which service to use?*

Most folks default to Google Maps, which is a very powerful platform, but also comes with probably way more than you need, and has a cost involved at a certain level. What if there were a simpler, smaller, and dare I say, *free and open source* alternative?[<VPIcon icon="fas fa-globe"/>Leaflet.js](https://leafletjs.com/)is exactly that.

Leaflet is incredibly simple and flexible. It lets you quickly add interactive maps to your web pages with little overhead.

Before we jump into code, let’s consider a simple, but realistic example. You run a website that helps prospective cat owners find cats that need a new home. Your data comes from an API (which for our sake will be a JSON file) and includes information like:

- Characterstics of the cat
- How to contact the current owner
- Where the cat could be picked up, a location in latitude and longitude.

What we want to do here is see how much effort is required to add this to a web page. Let’s get started!

---

## Including the Leaflet Library

We’ll start with a simple bit of HTML. I’m using CodePen for the samples so this will be a subset of the entire page of course. First, just some introductory content and a place for our map.

```html
<h2>Cat Connector</h2>

<p>
  Use the map below to help find cats who need a new home. 
  Every cat deserves a loving home!
</p>

<div id="map"></div>
```

The map will need a size of some sort, so I used the following CSS:

```css
#map {
  width: 100%;
  height: 500px;
}
```

If you follow the[<VPIcon icon="fas fa-globe"/>Leaflet Quick Start](https://leafletjs.com/examples/quick-start/), you can see two dependencies that need adding, first, a CSS resource:

```html
<link 
  rel="stylesheet" 
  href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
  integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
  crossorigin=""
/>
```

And then the library itself:

```html
<script 
  src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
  integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
  crossorigin="">
</script>
```

For CodePen, these was done in the Pen Settings in the External Stylesheets and External Scripts sections.

Now, we need to actually add the map, and here’s where you need to think a bit. In order to create a map, you’ll need a location to begin with. What this location is depends on a lot of factors. If I were rendering maps in the continental United States, I could center it on America. If I were mapping castles in Germany, obviously I’d pick a location somewhere in the country.

Another factor you have to consider is the initial zoom. How close, or how far, the map initially shows itself will also depend on the kind of data you’re rendering.

For our pretend cat rehoming website, we’ll assume Lafayette, Louisiana, which just so happens to be where I live. The latitude of Lafayette is 30.216667 and the longitude is -92.033333. This can be done with one line:

```js
let map = L.map('map').setView([30.216667, -92.033333], 12);
```

If you were to run this right now, you would see:

![Big gray box, useless!](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/01/l1.png?resize=650%2C512&ssl=1)

Where’s the map? The final part you need is a tile provider. Map tiles are the parts that make up any interactive map. As you go to different locations, and different zoom levels, the map is rendered from a set of tiles, based on those factors (location and zoom). [OpenStreetMap](https://openstreetmap.org/#map=4/38.01/-95.84) provides free map tiles (with attribution!) and can be added to Leaflet like so:

```js
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
```

Let’s take a look at what we have so far:

<CodePen
  user="cfjedimaster"
  slug-hash="VYZdqZL"
  title="FM - Leaflet 1"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

We haven’t actually added any data yet and it’s possible we may need to tweak multiple things. Maybe the map needs to be bigger? Maybe our centered location isn’t quite right? Our default zoom may not be optimal either. These are all things that will come into play as we start adding data — so let’s do that next!

---

## Our Data

Before we get into how Leaflet can show data, let’s look at our sample data. Our cats will be returned as static data, an array of results. Here’s a portion of the data:

```js :collapsed-lines
let availableCats = [
  {
    cat: {
      name: "Fluffy",
      age: 5,
      gender: "male",
      breed: "calico"
    },
    owner: {
      name: "Raymond Camden",
      contactEmail: "raymondcamden@gmail.com",
      contactPhone: "555-555-5555"
    },
    location: {
      latitude: 30.227394,
      longitude: -92.02909
    }
  },
  {
    cat: {
      name: "Pig",
      age: 12,
      gender: "female",
      breed: "calico"
    },
    owner: {
      name: "Lindy Camden",
      contactEmail: "lindyjcamden@gmail.com",
      contactPhone: "555-555-5555"
    },
    location: {
      latitude: 30.231695,
      longitude: -92.007103
    }
  }
];
```

To emulate an API call, we can wrap this up in a function like so:

```js
async function getAvailableCats() {
  return [
    // list of cats here...
  ]
}
```

And then update our code to let us call this asynchronously:

```js
document.addEventListener("DOMContentLoaded", init, false);
async function init() {
  let cats = await getAvailableCats();

  let map = L.map("map").setView([30.216667, -92.033333], 12);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);
}
```

At this point, we’ve got data, but how to add it to the map? Leaflet lets you ‘draw’ on a map in many different ways, but the simplest is by adding a marker:

```js
let marker = L.marker([latitude, longitude]).addTo(map);
```

Since we got the cats earlier in the function, we just need to loop over them:

```js
cats.forEach(c => {
  let marker = L.marker([c.location.latitude, c.location.longitude]).addTo(map);
});
```

You can see this version below:

<CodePen
  user="cfjedimaster"
  slug-hash="QwLxzEr"
  title="FM - Leaflet 2"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

Notice that it’s possible that changing the zoom may help here, there’s a lot of space around the data and we could get clodser in. However, maybe we know our organization could, at any time, get more data farther out. This is exactly what I was talking about in terms of understanding your data, both what’s immediately available and what may come later.

Leaflet also supports the idea of taking a set of locations and ensuring they all ‘fit’ by default. That’s just one example of how powerful the API is, but we’ll keep it simple for now.

---

## Adding Interactivity

Now for the last part of the puzzle. In order for the information on the map to actually be useful, we need to associate the data for those markers and provide some form of UI to share that with the users. In it’s simplest form, Leaflet lets you bind popups to markers in, literally, one simple method call.

You take this:

```js
let marker = L.marker([latitude, longitude]).addTo(map);
```

And add:

```js
let marker = L.marker([latitude, longitude]).addTo(map).bindPopup('Set some HTML or just regular text here.');
```

That’s it! So given our loop over the cat data, here’s a new version with that. I created a template string to more nicely format the information:

```js
cats.forEach(c => {
  let desc = `
    <h3>${c.cat.name}</h3>
    <p>
      ${c.cat.name} is a ${c.cat.gender} ${c.cat.breed}.
    </p>
    <p>
      Owner: ${c.owner.name}<br>
      Email: ${c.owner.contactEmail}<br>
      Tel: ${c.owner.contactPhone}<br>
    </p>
  `;
  L.marker([c.location.latitude, c.location.longitude]).addTo(map).bindPopup(desc);
});`
```

This one method handles the click interaction, creating the popup, even automatically closing another popup if you forget to close one. Here’s the complete demo:

<CodePen
  user="cfjedimaster"
  slug-hash="zxOJNEP"
  title="FM - Leaflet 3"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

---

## What Else?

This introduction only scratches the surface of what’s possible and you should peruse the[<VPIcon icon="fas fa-globe"/>docs](https://leafletjs.com/reference.html)for a full idea. Leaflet is great, and free, but, you should also be aware of some of the things you*don’t*get that you would with Google Maps or [<VPIcon icon="fas fa-globe"/>HERE](https://maps.here.com/?map=44.09044,-120.73045,8.44). These include the various ‘services’, like

- Routing
- Traffic information
- Geocoding (and Reverse Geocoding)

This doesn’t mean you can’t make use of those services*along*with Leaflet. I discussed an example of this late last year:[<VPIcon icon="fas fa-globe"/>“Using Geocoding with Leaflet”](https://raymondcamden.com/2024/10/04/using-geocoding-with-leaflet). That being said, keep this in mind when planning your projects as it may impact your decision on whether or not to use the library.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Mapping with Leaflet",
  "desc": "Leaflet.js is a free open-source mapping library. We'll look at how to use it to create a basic map with location points of cats up for adoption. ",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/mapping-with-leaflet.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
