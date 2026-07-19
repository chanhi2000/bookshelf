---
lang: en-US
title: "How Programmatic Advertising Works"
description: "Article(s) > How Programmatic Advertising Works"
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
      content: "Article(s) > How Programmatic Advertising Works"
    - property: og:description
      content: "How Programmatic Advertising Works"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-programmatic-advertising-works.html
prev: /programming/py/articles/README.md
date: 2026-07-23
isOriginal: false
author:
  - name: Manish Shivanandhan
    url: https://freecodecamp.org/news/author/manishshivanandhan/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/ead3788a-52c2-4821-b5c9-1c626c50d375.png
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
  name="How Programmatic Advertising Works"
  desc="Most tutorials on programmatic advertising stop at the web banner. That's a shame, because the idea gets far more interesting once you follow it off the screen and into the physical world. If you've n"
  url="https://freecodecamp.org/news/how-programmatic-advertising-works"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/ead3788a-52c2-4821-b5c9-1c626c50d375.png"/>

Most tutorials on [<VPIcon icon="fa-brands fa-amazon"/>programmatic advertising](https://advertising.amazon.com/blog/programmatic-advertising#1) stop at the web banner. That's a shame, because the idea gets far more interesting once you follow it off the screen and into the physical world.

If you've never worked in advertising, don't worry. You don't need any ad industry background to follow along. If you can read basic Python, you have everything you need.

The advertising part is just the setting. The real subject is a skill you'll use everywhere: taking a messy slice of the real world and turning it into data that software can act on.

In this article, you'll learn what programmatic advertising is and why it worked so well on the web. You'll see why bringing it to a billboard is really a data modeling problem, and you'll build small Python models for each step.

---

## What Is Programmatic Advertising?

Advertising has two sides. A publisher, such as a news site, has ad space to fill. And an advertiser, such as a shoe brand, wants to fill it. For decades, connecting the two meant phone calls, emails, and paperwork.

Programmatic advertising replaces that manual process with software. No human negotiates the placement. A system looks at an ad slot and decides, in milliseconds, whether to buy it and at what price.

Here's how it works when you open a web page. The page tells an ad exchange that a slot is open, along with some context about the page and the viewer. Advertisers' systems bid on the slot in a live auction. The winning ad appears before the page finishes loading. This process is called [<VPIcon icon="fa-brands fa-wikipedia-w"/>real-time bidding](https://en.wikipedia.org/wiki/Real-time_bidding), and it happens billions of times a day.

Two quick terms will help. Inventory means the ad space a seller has to offer. An impression means one view of an ad by one person.

On the web, this model arrived fast and felt almost effortless. It's worth understanding why.

---

## Why the Web Made Programmatic Easy

The web made programmatic easy by accident. Every web ad slot came pre-structured. It had an address, meaning a URL and a position on the page. It sat inside a document with a known shape, the [<VPIcon icon="fa-brands fa-firefox"/>Document Object Model](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model). And it could report back whether an ad had loaded and been seen.

The whole environment was machine-readable from birth, because machines were already serving it. When automated buying showed up, it had a clean surface to work against. The medium had already done the hard modeling work.

Keep that in mind. It's the key to the whole lesson.

---

## The Billboard Problem

Now point the same idea at a billboard. None of that convenient structure exists.

A physical sign doesn't announce where it is or which way it faces. It doesn't say what it costs this week or whether it's even available. For most of its history, that information lived in rate cards and salespeople's memories, not in anything a program could query.

Here's the insight. Out-of-home advertising, the industry term for billboards, transit posters, and public screens, didn't lag the web because it was a weaker medium. It lagged because it had no machine-readable interface. The audience was always there. The structured data was not.

So the real work of bringing programmatic to the physical world isn't clever bidding logic. It's data modeling.

Let's make that concrete. There are four steps. Each one maps to a pattern you'll see in many other engineering problems.

---

## Step 1: Resolve Entities

The same billboard often shows up in several vendors' datasets. Each vendor gives it a different name and slightly different coordinates. Before you can do anything else, one physical object has to become one record. This is known as [<VPIcon icon="fa-brands fa-wikipedia-w"/>record linkage](https://en.wikipedia.org/wiki/Record_linkage), here with a geographic twist.

A simple approach: treat two records as the same panel if they sit close together and share a similar name. To measure the distance between two coordinates, you can use the [<VPIcon icon="fa-brands fa-wikipedia-w"/>haversine formula](https://en.wikipedia.org/wiki/Haversine_formula).

```py
from math import radians, sin, cos, asin, sqrt

def haversine_m(lat1, lon1, lat2, lon2):
    """Distance between two coordinates in meters."""
    lat1, lon1, lat2, lon2 = map(radians, [lat1, lon1, lat2, lon2])
    a = sin((lat2 - lat1) / 2) ** 2 + \
        cos(lat1) * cos(lat2) * sin((lon2 - lon1) / 2) ** 2
    return 6371000 * 2 * asin(sqrt(a))

def same_panel(a, b, max_distance_m=25):
    close = haversine_m(a["lat"], a["lon"], b["lat"], b["lon"]) <= max_distance_m
    similar_name = a["name"].lower().split()[0] == b["name"].lower().split()[0]
    return close and similar_name

vendor_a = {"name": "I-95 North Bulletin", "lat": 25.7907, "lon": -80.1300}
vendor_b = {"name": "I-95 Bulletin #4421", "lat": 25.7908, "lon": -80.1301}

print(same_panel(vendor_a, vendor_b))  # True – one billboard, one record
```

Real systems use fuzzier matching and more signals, but the principle is the same. Entity resolution comes first, or every later step counts the same billboard twice.

---

## Step 2: Model Location as Computed Context

A coordinate is not an audience. To make a panel useful to a buying system, you have to represent it as a point with an orientation. Then you estimate who actually passes it by joining it against road and traffic data.

The useful value is computed, not given:

```py
def estimate_impressions(panel, traffic_by_road):
    """Estimate daily impressions from road traffic data."""
    daily_vehicles = traffic_by_road[panel["road_id"]]
    # Only traffic moving toward the panel's face can see it
    facing_share = 0.5
    avg_occupancy = 1.4  # people per vehicle
    return int(daily_vehicles * facing_share * avg_occupancy)

panel = {"id": "P-4421", "road_id": "I-95-N", "facing": "south"}
traffic = {"I-95-N": 120000}

print(estimate_impressions(panel, traffic))  # 84000
```

Notice what happened. The raw record was just a point on a map. It got enriched into something a buyer can reason about: 84,000 estimated daily impressions. This pattern shows up everywhere in data work. A raw record plus outside data equals a useful field.

---

## Step 3: Represent Availability as a Schedule, Not a Boolean

A web ad slot is either open right now or it isn't. In code, that's a boolean: a value that is simply true or false. A billboard gets booked in date ranges, and its state changes underneath you. Inventory gets held, booked, and released. You need live data, not a snapshot.

```py
from datetime import date

class PanelSchedule:
    def __init__(self):
        self.bookings = []  # list of (start, end) tuples

    def book(self, start, end):
        if not self.is_available(start, end):
            raise ValueError("Panel not available for that range")
        self.bookings.append((start, end))

    def is_available(self, start, end):
        return all(end < b_start or start > b_end
                   for b_start, b_end in self.bookings)

schedule = PanelSchedule()
schedule.book(date(2026, 8, 1), date(2026, 8, 14))

print(schedule.is_available(date(2026, 8, 10), date(2026, 8, 20)))  # False
print(schedule.is_available(date(2026, 8, 15), date(2026, 8, 31)))  # True
```

The lesson carries over. Whenever you model the real world, ask whether a value is truly fixed. Often it's state that changes over time. Availability, stock levels, and seat maps are all schedules pretending to be booleans.

---

## Step 4: Express Price as a Function, Not a Number

The rate card says one number. Reality prices by date, demand, and how much inventory is left:

```py
def price_for(base_rate, start, weeks_out, occupancy):
    """Price a booking based on lead time and demand."""
    demand_multiplier = 1 + occupancy          # busier market, higher price
    urgency_discount = 0.9 if weeks_out > 8 else 1.0  # reward early booking
    return round(base_rate * demand_multiplier * urgency_discount, 2)

print(price_for(base_rate=3000, start=date(2026, 12, 1),
                weeks_out=19, occupancy=0.85))  # 4995.0
print(price_for(base_rate=3000, start=date(2026, 8, 1),
                weeks_out=2, occupancy=0.40))   # 4200.0
```

Once price is a function, software can compare thousands of panels and dates instantly. That's exactly what automated buying needs.

---

## Putting It Together

You now have resolved entities, computed audience, live availability, and dynamic pricing. With that in place, [<VPIcon icon="fas fa-globe"/>programmatic digital out of home](https://adquick.com/guides/programmatic-dooh) advertising works in the physical world the same way it does online. Software can plan a campaign across physical screens, buy them automatically, adjust in near real time, and measure the result.

It was never really about the web. It was about whether the inventory had a schema, meaning a defined structure that tells software what each piece of data is. Once you give the physical world a schema, the automation follows.

---

## An Exercise to Build the Intuition

You don't need special access to practice this. Take any messy, location-based public dataset and rehearse the four steps. A good source is [<VPIcon icon="fas fa-globe"/>OpenStreetMap](https://openstreetmap.org/), which offers free data on millions of real-world places.

First, resolve duplicates by merging records that describe the same real-world thing. Second, enrich each point with computed context instead of treating the raw record as complete. Third, model one field as state that changes over time rather than a fixed value. Fourth, wrap the result in a clean interface, such as a class or a small API, that something else could query.

You won't have built an ad platform, but you'll have practiced the exact skills that let automated buying reach a new field.

---

## The Takeaway

A good abstraction survives contact with the real world.

When you first learn a concept in a tidy setting, it's easy to think the tidiness is part of the concept. It rarely is. You only find out how general an idea is when you drag it somewhere messy and watch it still work.

Programmatic buying, moved off the screen and onto a wall by a road, is one of the cleaner proofs of that. Keep an eye out for the same pattern elsewhere: a rich domain waiting on nothing but a schema.

::: info About Author

Hope you enjoyed this article. You can [connect with me on LinkedIn (<VPIcon icon="fa-brands fa-linkedin"/>`manishmshiva`)](https://linkedin.com/in/manishmshiva).

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How Programmatic Advertising Works",
  "desc": "Most tutorials on programmatic advertising stop at the web banner. That's a shame, because the idea gets far more interesting once you follow it off the screen and into the physical world. If you've n",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-programmatic-advertising-works.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
