---
lang: en-US
title: "How to Use OpenStreetMap as a Free Alternative to Google Maps"
description: "Article(s) > How to Use OpenStreetMap as a Free Alternative to Google Maps"
icon: fa-brands fa-react
category:
  - Node.js
  - React.js
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
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Use OpenStreetMap as a Free Alternative to Google Maps"
    - property: og:description
      content: "How to Use OpenStreetMap as a Free Alternative to Google Maps"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-openstreetmap-free-alternative-to-google-maps.html
prev: /programming/js-react/articles/README.md
date: 2026-03-26
isOriginal: false
author:
  - name: Aiyedogbon Abraham
    url: https://freecodecamp.org/news/author/abrahamaiyedogbon/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/0ab3655a-4212-451d-93e1-5c707ed1b07e.png
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

[[toc]]

---

<SiteInfo
  name="How to Use OpenStreetMap as a Free Alternative to Google Maps"
  desc="Google Maps has been the default choice for developers building location-based applications for years. But for many teams, especially those operating at scale, pricing has become a real concern. Googl"
  url="https://freecodecamp.org/news/how-to-use-openstreetmap-free-alternative-to-google-maps"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/0ab3655a-4212-451d-93e1-5c707ed1b07e.png"/>

Google Maps has been the default choice for developers building location-based applications for years. But for many teams, especially those operating at scale, pricing has become a real concern.

Google Maps provides a $200 monthly credit, but beyond that, usage is billed per request. For applications like logistics, ride-hailing, or fleet tracking – where thousands of requests are made daily – costs can grow quickly depending on which APIs you use.

OpenStreetMap (OSM) offers a different approach. Instead of charging for access to map APIs, it provides free, open geographic data that you can build on.

In this guide, you'll learn what OpenStreetMap is, how it differs from Google Maps, and how to integrate it into a React application using Leaflet.

---

## What is OpenStreetMap?

OpenStreetMap is a free, open, and community-driven map of the world. Anyone can contribute to it, and anyone can use it.

Unlike Google Maps, which gives access through controlled APIs, OpenStreetMap gives you access to the underlying geographic data itself.

This data is structured in three main ways:

1. **Nodes**: single points (for example, a bus stop or a tree)
2. **Ways**: lines or shapes made up of nodes (like roads or buildings)
3. **Relations**: groups of nodes and ways that define more complex things (like routes or boundaries)

Each of these elements includes tags (key-value pairs), such as:

```plaintext
highway=residential
name=Allen Avenue
```

So instead of just displaying a map, OpenStreetMap lets you work with structured geographic data.

### The Open Database License (ODbL)

OpenStreetMap data is licensed under the ODbL. This means:

- You can use it for commercial or personal projects
- You must give proper attribution

This makes it especially useful for developers who want clarity around data ownership.

---

## Why Choose OpenStreetMap Over Google Maps?

### Cost

OpenStreetMap data is free to use. But it's important to be precise here: **OpenStreetMap removes licensing costs, but not infrastructure costs.**

You may still need to pay for:

- Tile hosting
- Geocoding services
- Routing engines

### Control

With Google Maps, you can't modify the data, and you rely entirely on Google's APIs

But with OpenStreetMap, you can download and store the data, modify it, and build custom solutions on top of it.

### Customization

OpenStreetMap gives you more flexibility:

- You control how maps are rendered
- You can choose or build your own map styles
- You can create domain-specific maps

### Adoption

OpenStreetMap is widely used. Companies like Meta and Microsoft contribute to it, and many platforms rely on it directly or indirectly.

This shows that the ecosystem is mature and reliable.

---

## Understanding the OpenStreetMap Ecosystem

A common mistake is to think that OpenStreetMap works like a single API. It doesn't.

Instead, it works as a set of layers, where each layer handles a different responsibility.

### Data Layer (OpenStreetMap)

This is the foundation. It contains all the raw geographic data:

- Roads
- Buildings
- Landmarks
- Boundaries

This is what you are ultimately working with.

### Rendering Layer (Leaflet, MapLibre)

Raw data isn't visual. It needs to be turned into something users can see.

There are two main approaches:

1. **Raster tiles** (used by Leaflet): pre-rendered images
2. **Vector tiles** (used by MapLibre): raw geometry styled in the browser

Leaflet uses raster tiles by default, which makes it simple and fast to start with.

### Services Layer

This is what makes your map interactive. **Geocoding** converts addresses into coordinates, while **reverse geocoding** converts coordinates into addresses.

**Routing** calculates directions between points, and **tile servers** provide the actual map visuals.

### How Everything Works Together

When a user searches for a place:

1. The user enters a location
2. A geocoding service converts it into coordinates
3. The map updates its position
4. A tile server provides the visual map

Each part is separate, but they work together to create the full experience.

---

## How to Integrate OpenStreetMap in React with Leaflet

Let's build a simple map.

### Step 1: Create a React App

```sh
npm create vite@latest osm-app -- --template react
cd osm-app
npm install
```

### Step 2: Install Dependencies

```sh
npm i leaflet react-leaflet
npm i --save-dev @types/leaflet
```

### Step 3: Import Leaflet CSS

```js
import 'leaflet/dist/leaflet.css';
```

This is required for the map to display correctly.

### Step 4: Create a Map Component

```js
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

function Map() {
  const position = [51.505, -0.09]; // latitude, longitude

  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ height: '100vh' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>Hello from OpenStreetMap</Popup>
      </Marker>
    </MapContainer>
  );
}

export default Map;
```

Let's break down the important parts here:

`MapContainer` initializes the map.

- `center` is where the map starts
- `zoom` is how close the view is
- `style` must include height, or the map won't show

`TileLayer` defines where the map visuals come from.

- `{z}` is the zoom level
- `{x}`, `{y}` are the tile coordinates
- `{s}` is the subdomain

Each tile is a small image (usually 256×256 pixels), and Leaflet combines them to form the full map.

`Marker` adds a point on the map at a specific coordinate.

`Popup` displays information when the marker is clicked.

::: important Important note:

The default OpenStreetMap tile server:

```plaintext
https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
```

is meant for learning, demos, and low-traffic apps. For production, you should use a dedicated provider or your own tile server.

:::

---

## How to Add Geocoding with Nominatim

Nominatim is OpenStreetMap's geocoding service. It allows you to convert addresses into coordinates and coordinates into readable locations.

### Custom Hook for Geocoding

```js
import { useState } from 'react';

export function useGeocoding() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchAddress = async (query) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=5`,
        {
          headers: {
            'User-Agent': 'YourAppName/1.0'
          }
        }
      );

      if (!response.ok) {
        throw new Error('Request failed');
      }

      const data = await response.json();
      setLoading(false);
      return data;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return [];
    }
  };

  return { searchAddress, loading, error };
}
```

::: info In this code:

- `useState` manages loading and error states
- `encodeURIComponent` ensures safe URLs
- `User-Agent` is required by Nominatim
- `response.json()` converts response into usable data

:::

Nominatim returns coordinates as strings, so you have to convert them before using them.

### Important Usage Rules

The public Nominatim service:

- Allows about 1 request per second
- Requires proper identification
- May block excessive usage

You should debounce user input, cache results, and avoid repeated requests.

### Creating a Search Component

The search component lets users type an address or place name and get matching locations via Nominatim. It includes a text input and a submit button.

When the form is submitted, it calls our `searchAddress` function (from the `useGeocoding` hook), which fetches up to 5 address results. These results are displayed below the input as clickable items.

When the user clicks a result, the component parses the returned latitude and longitude into numbers and passes them (along with a display name) up to the parent component via the `onLocationSelect` callback. This will allow the parent (for example, the map) to update its center based on the chosen location.

```jsx :collapsed-lines
function SearchBox({ onLocationSelect }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const { searchAddress, loading } = useGeocoding();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    const data = await searchAddress(query);
    setResults(data);
  };

  const selectLocation = (result) => {
    onLocationSelect({
      lat: parseFloat(result.lat),
      lon: parseFloat(result.lon),
      name: result.display_name
    });
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search location"
        />
        <button type="submit">
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      <div>
        {results.map((result) => (
          <div key={result.place_id} onClick={() => selectLocation(result)}>
            {result.display_name}
          </div>
        ))}
      </div>
    </div>
  );
}
```

::: info Key concepts here:

- `useState` stores the current input (`query`) and the array of search `results`.
- `e.preventDefault()` stops the form submission from reloading the page.
- Calling `searchAddress(query)` fetches geocoding results from Nominatim.
- `parseFloat()` converts the returned `lat`/`lon` strings into JavaScript numbers before using them.
- `onLocationSelect` is a callback prop that sends the selected coordinates and name back to the parent component (for example to update the map).

:::

---

## Advanced Features

We can further extend the map app by adding more advanced functionality. For example:

### Routing (OSRM, GraphHopper)

You can integrate turn-by-turn routing on your map. A common solution is to use a library like [<VPIcon icon="fas fa-globe"/>Leaflet Routing Machine](https://liedman.net/leaflet-routing-machine/), which supports OSRM out of the box and has plugins for GraphHopper. This adds a route UI control where users enter start and end points, and the library fetches a route from one of these engines to draw on the map.

### Custom Tile Providers (Carto, MapTiler, and so on)

Instead of the standard [<VPIcon icon="fas fa-globe"/>`tile.openstreetmap.org`](http://tile.openstreetmap.org), you can use hosted tile services that offer OSM-based maps. For example, Carto and MapTiler both provide tile APIs (often with custom style options and higher usage limits).

Carto, MapTiler, and similar services are listed among the providers that allow free usage of OSM tiles. By using a custom tile provider, you gain flexibility in map design and avoid hitting the public server’s limits.

### Vector Maps (MapLibre GL JS)

You can switch from raster tiles to vector tiles for even richer interactivity. Vector tiles send raw map data (geometries and attributes) to the client, which are then rendered in the browser. This allows dynamic styling and advanced features: for instance, you can change the map’s theme on the fly (for example, switch to a “dark mode” style at night) or highlight certain features like bike lanes more prominently.

Libraries like MapLibre GL JS (the open-source successor to Mapbox GL) can display OSM vector tiles with highly customizable styles and smooth zooming/rotation. This makes your map more responsive and adaptable to different use cases.

---

## When to Choose OpenStreetMap vs Google Maps

### Choose OpenStreetMap when

- You need flexibility
- You want to reduce costs at scale
- You want control over data

### Choose Google Maps when

- You want an all-in-one solution
- You need features like Street View
- You want minimal setup

---

## Wrapping Up

OpenStreetMap offers a powerful alternative to Google Maps for developers who need cost control, data ownership, and customization. While it requires understanding different components, the flexibility it provides is worth the learning curve.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Use OpenStreetMap as a Free Alternative to Google Maps",
  "desc": "Google Maps has been the default choice for developers building location-based applications for years. But for many teams, especially those operating at scale, pricing has become a real concern. Googl",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-openstreetmap-free-alternative-to-google-maps.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
