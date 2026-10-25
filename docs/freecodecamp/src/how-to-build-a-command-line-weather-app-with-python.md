---
lang: en-US
title: "How to Build a Command-Line Weather App with Python"
description: "Article(s) > How to Build a Command-Line Weather App with Python"
icon: fa-brands fa-python
category:
  - Python
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build a Command-Line Weather App with Python"
    - property: og:description
      content: "How to Build a Command-Line Weather App with Python"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-command-line-weather-app-with-python.html
prev: /programming/py/articles/README.md
date: 2026-10-29
isOriginal: false
author:
  - name: Sameer Qaiser
    url: https://freecodecamp.org/news/author/sameerqaiser17/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/b79396ff-d6f7-4e08-a4e0-282b0eb881da.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Python > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build a Command-Line Weather App with Python"
  desc="After doing a few basic Python projects, I got a bit bored of programs that just take input and print something back. I wanted to make something that actually gets data from the internet. So, I built "
  url="https://freecodecamp.org/news/how-to-build-a-command-line-weather-app-with-python"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/b79396ff-d6f7-4e08-a4e0-282b0eb881da.png"/>

After doing a few basic Python projects, I got a bit bored of programs that just take input and print something back. I wanted to make something that actually gets data from the internet.

So, I built this little weather app. If APIs still feel a bit abstract to you, don't worry. Just remember that an API is basically a way for your program to ask another program for information.

The idea is straightforward: you type a city name in the terminal, and it shows you the current temperature and wind speed. It's nothing fancy, but it’s a nice way to get comfortable with APIs, HTTP requests, and command-line arguments.

By the end of this tutorial, you'll know how to make HTTP requests, parse JSON data, handle errors gracefully, and build a script you can actually use from your terminal.

::: note What You Need to Get Started

Before we start, make sure you have:

- Python installed
- A code editor (l use VS Code)
- The **requests** library.

If you don’t have requests yet, open your terminal and run:

```sh
pip install requests
```

:::

---

## How to Turn a City Name into Coordinates

Weather APIs usually want latitude and longitude, not city names. So the first thing we need is a way to convert “Karachi” or “New York” into coordinates.

Open-Meteo has a free geocoding API that does exactly that. Here’s the function I used:

```py
import requests

def get_coordinates(city_name):
    url = "https://geocoding-api.open-meteo.com/v1/search"

    params = {
        "name": city_name,
        "count": 1
    }

    response = requests.get(url, params=params, timeout=5)
    response.raise_for_status()

    data = response.json()

    if not data.get("results"):
        return None

    latitude = data["results"][0]["latitude"]
    longitude = data["results"][0]["longitude"]

    return latitude, longitude
```

It's pretty simple. We send the city name, ask for one result, and pull out the latitude and longitude. If the API doesn’t find anything, we just return None instead of crashing later.

One small warning: some city names exist in multiple places. This code just grabs the first match, so it might not always pick the one you meant. Just make sure you double-check before you use it in your project.

---

## How to Get the Actual Weather Data

Once we have the coordinates, we can ask for the weather:

```py
def get_weather(latitude, longitude):
    url = "https://api.open-meteo.com/v1/forecast"

    params = {
        "latitude": latitude,
        "longitude": longitude,
        "current": "temperature_2m,wind_speed_10m"
    }

    response = requests.get(url, params=params, timeout=5)
    response.raise_for_status()

    data = response.json()

    return data["current"]
```

The temperature_2m and wind_speed_10m parameters ask for the temperature at 2 meters above ground and wind speed at 10 meters. By specifying current, we tell the API we only want the data for right now, rather than a multi-day forecast. The API actually returns a bunch of other data too, but we'll just extract the current section.

---

## How to Run it From the Terminal

I wanted to be able to run it like this:

```sh
python weather.py Karachi
```

So, I used the **sys** module:

```py title="weather.py"
import sys

def main():
    if len(sys.argv) < 2:
        print("Usage: python weather.py <city_name>")
        return

    city = " ".join(sys.argv[1:])

    try:
        coordinates = get_coordinates(city)

        if not coordinates:
            print(f"City not found: {city}")
            return

        latitude, longitude = coordinates
        weather = get_weather(latitude, longitude)

        print(f"\nWeather in {city.title()}")
        print(f"Temperature: {weather['temperature_2m']}°C")
        print(f"Wind speed: {weather['wind_speed_10m']} km/h")

    except requests.exceptions.RequestException:
        print("Couldn't connect to the weather service. Check your internet connection and try again.")

    except (KeyError, ValueError):
        print("Something went wrong while reading the weather data.")

if __name__ == "__main__":
    main()
```

The sys module gives us access to the command-line arguments. `sys.argv` is a list of everything you type in the terminal. `sys.argv[0]` is the file name (<VPIcon icon="fa-brands fa-python"/>`weather.py`), and `sys.argv[1]` is the city name. Using `" ".join(sys.argv[1:])` allows us to handle city names with spaces, like New York.

---

## Let’s Test it Out

Save the file as <VPIcon icon="fa-brands fa-python"/>`weather.py`, open a terminal in that folder, and try:

```sh
python weather.py Madrid
python weather.py Paris
python weather.py Washington
```

If you forget to type a city, it just tells you how to use it.

```plaintext
Weather in Madrid
Temperature: 15.2°C
Wind speed: 8.4 km/h
```

::: note What I Might Add Next

Once the basic version works, there are a few easy upgrades you can make:

- Add humidity (relative_humidity_2m)
- Show a short forecast instead of just current conditions
- Let the user pick from multiple matching cities when the name is ambiguous
- Make the output a bit prettier

I usually pick one small improvement, get it working, then move on. Trying to do everything at once usually just gets messy.

:::

---

## Final Thoughts

This is a solid little project once you’re past the “print hello world” stage and want to build something that actually talks to the internet. You get real practice with functions, dictionaries, error handling, and APIs, which is stuff you’ll use all the time.

But here’s the important bit. Once you get it working, close this page and try building the whole thing again from scratch.

You’ll forget something. You’ll probably hit some weird error and waste an hour staring at it. That’s fine. That’s the part that actually teaches you something. Copy-pasting my code doesn’t really solidify anything in your brain. Figuring out why yours is broken does.

After you’ve got the weather app working, try the same approach with a completely different API (like movies, crypto prices, sports scores, whatever). The pattern is pretty much the same. Just get the basic version running first, then go break it.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build a Command-Line Weather App with Python",
  "desc": "After doing a few basic Python projects, I got a bit bored of programs that just take input and print something back. I wanted to make something that actually gets data from the internet. So, I built ",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-command-line-weather-app-with-python.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
