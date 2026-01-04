---
lang: en-US
title: "Real-Time Systems for Web Developers: From Theory to a Live Go + React App"
description: "Article(s) > Real-Time Systems for Web Developers: From Theory to a Live Go + React App"
icon: fa-brands fa-golang
category:
  - Go
  - Node.js
  - React.js
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - go
  - golang
  - node
  - nodejs
  - node-js
  - react
  - reactjs
  - react-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Real-Time Systems for Web Developers: From Theory to a Live Go + React App"
    - property: og:description
      content: "Real-Time Systems for Web Developers: From Theory to a Live Go + React App"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/real-time-systems-for-web-developers-from-theory-to-a-live-go-react-app.html
prev: /programming/go/articles/README.md
date: 2026-01-08
isOriginal: false
author:
  - name: Emmanuel Etukudo
    url : https://freecodecamp.org/news/author/eetukudo/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1767748231282/074fcd8b-8808-4a3d-8c9c-17d5a7b388e6.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Go > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/go/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

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
  name="Real-Time Systems for Web Developers: From Theory to a Live Go + React App"
  desc="Many developers think that “real-time” is about Websockets, Live data, or instant refreshes on web application dashboards. And although these concepts are closely related to what real-time means, the systems engineering definition is a bit different...."
  url="https://freecodecamp.org/news/real-time-systems-for-web-developers-from-theory-to-a-live-go-react-app"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1767748231282/074fcd8b-8808-4a3d-8c9c-17d5a7b388e6.png"/>

Many developers think that “real-time” is about Websockets, Live data, or instant refreshes on web application dashboards.

And although these concepts are closely related to what real-time means, the systems engineering definition is a bit different. A real-time system is not defined by how fast it is, but how predictable it is.

In this tutorial, you’ll learn about what real-time systems are, why most web applications are not real-time, and how to build a **soft real-time system** with tools you’re likely already familiar with: Go, React, and TypeScript.

At the end of this tutorial, we’ll build a live application that:

- processes time-sensitive events
- enforces deadlines
- drops work when it’s too late
- and visualises latency and missed deadlines in real-time

This article will help shape your mind the next time you’re building a real-time system.

::: note Prerequisites

This tutorial assumes that you have basic knowledge of `Go`, `React`, and `WebSockets`, particularly working with go-routines and consuming `WebSockets` events in `React`. If you don’t, I strongly recommend reviewing introductory tutorials before continuing so you can get the most out of this guide.

Helpful references include:

- **Go Concurrency and Goroutines:** The official Go blog covers concurrency patterns, including goroutines and channels, which are [<VPIcon icon="fa-brands fa-golang"/>fundamental for writing concurrent Go code](https://go.dev/blog/concurrency-patterns).
- **WebSockets with Go:** A thorough WebSocket tutorial using the popular gorilla/websocket package that shows how to set up a WebSocket server in Go and manage connections and messages. [<VPIcon icon="fas fa-globe"/>Here’s a Go WebSocket tutorial (with gorilla/websocket)](https://tutorialedge.net/golang/go-websocket-tutorial).
- **WebSockets in React:** A complete guide to WebSockets in React, explaining how to open and manage a WebSocket connection and handle incoming messages in components. [<VPIcon icon="fas fa-globe"/>Here’s a complete guide to WebSockets with React](https://ably.com/blog/websockets-react-tutorial).

Technologies we’ll work with include:

- `Go`, for building our backend system and enforcing real-time guarantees
- `React`, for building a responsive frontend `UI` that displays streamed events
- `Websocket`, for low-latency delivery of data from the backend to the client

:::

---

## What a Real-Time System Really Means

In a traditional web application, correctness is measured by whether the system produced the right result. In a real-time system, correctness is measured by whether the system produced the right result **before the deadline**. If the result from the test is “No”, then the system has failed – even though the result is correct.

### Types of Real-Time Systems

There are a few different types of real-time systems that you should be aware of, each with varying levels of strictness:

#### Hard Real-time

Missing a deadline is catastrophic here.

::: tip Niche applicable

Flight Control & Pacemakers

:::

#### Soft Real-time

Missing deadline degrades quality but does not crash the system.

::: tip Niche applicable

Video Streaming & Trading Dashboards

:::

#### Firm Real-time

Late results are useless and should be discarded.

::: tip Niche applicable

Car Auction Web/Mobile Apps

:::

The majority of web-based real-time systems fall under the soft real-time category, and that’s exactly what we’ll build here.

### Why Most Web Apps Are Not Real-Time

There are many reasons a system may not be real-time, and typically, even those marketed as real-time applications lack this guarantee.

Here’s why:

1. Websockets guarantee delivery, not timeliness
2. Massage queues are optimized for durability and throughput
3. Infinite buffering hides deadlines
4. User Interfaces (UIs) render when they can, not when they should

In other words, data will arrive eventually, but nothing enforces when it must be processed. That’s exactly the gap we’ll address in this tutorial.

---

## What We Are Going to Build

In this tutorial, we’ll build a Deadline-Aware Live Event Monitor. You can think of it as a simplified real-time system for sensor data, trading events, alerts, or live telemetry.

Our app will have these features and constraints:

- Events are generated at a fixed rate
- Each event has a deadline
- The backend processes events only if they can be completed on time
- Late events are marked or dropped
- The frontend visualizes:
  - processing latency
  - missed deadlines
  - and system health

This will give us the required metrics to measure the real-time behavior of the system instead of guessing.

---

## System Architecture

The high-level system architecture looks like this:

```plaintext
+-------------+     +------------------+     +----------------+
| Event       | --> | Deadline-Aware   | --> | WebSocket      |
| Generator   |     | Go Processor     |     | Server         |
+-------------+     +------------------+     +----------------+
                                                     |
                                                     v
                                           +----------------+
                                           | React Dashboard|
                                           +----------------+
```
<!-- TODO: mermaid 화 -->

Let’s break down the responsibilities:

### Backend

- Generates time-sensitive events
- Enforces deadline
- Applies back pressure
- Streams result to client (frontend)

### Front End

- Consumes real-time events
- Renders live metrics
- Remains responsive under load

### Time is part of your Data Model

In a real-time system, time is explicit, not implicit. This means that each event processed includes:

- when it was created
- how long is it allowed to live, and
- when it was processed

Conceptually, a typical data model for an event looks like this:

```ts
{
  id: string
  createdAt: number
  deadlineMs: number
  processedAt?: number
  status: "on-time" | "late" | "dropped"
}
```

This is the mindset shift we hope to establish: in a real-time system, time is an essential component for your system that guarantees accuracy.

---

## Why Go is a Good Fit for Our Use Case

Go is not a hard real-time language, but it’s excellent for soft real-time workloads. This is because of its:

- Cheap goroutines
- Structured concurrency with channels
- Deadline propagation via `context.Context`
- Simple runtime behavior

Most importantly, Go makes it easy to **fail fast**, which is essential for real-time systems.

### Generating Events with Go

We’ll begin the development of our backend system by first defining the Event struct and creating a fixed-rate event generator function:

```go
type Event struct {
    ID         string
    CreatedAt time.Time
    DeadlineMs  time.Duration
}
```

Here we’ve created an `Event` struct with the following properties:

- `ID` a unique identifier that helps in the management of each event processed by the system
- `CreatedAt` to track the time the event was created
- `Deadline` to help evaluate if the event met the assigned deadline or if it failed

Next, we’ll create the event generator `startGenerator` function:

```go
func startGenerator(out chan<- Event) {
        ticker := time.NewTicker(50 * time.Millisecond)
        defer ticker.Stop()

        for range ticker.C {
                event := Event{
                        ID:         uuid.New().String(),
                        CreatedAt:  time.Now(),
                        DeadlineMs: 100,
                }


                select {
                case out <- event:
                default:
                  // Drop event when load peaks on the goroutine
                }
        }
}
```

Here, the event generator function accepts a `Go` channel as a parameter and uses a `time.Ticker` channel that fires every **50 milliseconds**. On each tick, it creates a new `Event` with a unique`ID`, a creation timestamp, and a **deadline of 100 milliseconds** (`DeadlineMs: 100`).

The generator then attempts to send the event into the output channel using a non-blocking send. If the channel is ready, the event is delivered immediately. If the channel is not ready (for example, because downstream consumers are slow or overloaded), the `default` case is executed, and the event is dropped.

Why do we have to drop the event here? Well, because hiding overload drops real-time guarantees. In short, **dropping events is a deliberate backpressure strategy**: it prevents overload from cascading through the system and protects latency bounds, which is often more important than completeness in real-time streaming systems.

### Deadline-aware Processing

Next, we’ll create the `processEvent` function to handle the processing of the event. In Go, you can enforce deadlines by using `context.WithTimeout` like this:

```go
func processEvent(event Event) string {
        ctx, cancel := context.WithTimeout(
                context.Background(),
                event.Deadline,
        )

        defer cancel()
        workDone := make(chan struct{})

        go func() {
                time.Sleep(50 * time.Millisecond)
                close(workDone)

        }()

        select {
        case <-workDone:
                return "on-time"
        case <-ctx.Done():
                return "late"
        }
}
```

Here we’ve intentionally ensured that work finishes before the deadline or it fails immediately.

In the `processEvent` function, each event is processed under a hard deadline enforced by a context with a timeout. The timeout duration is derived directly from the event’s deadline, meaning the event is only considered valid within the specified time window.

The actual work is executed in a separate goroutine, which simulates processing by sleeping for **50 milliseconds** and then signaling completion by closing the `workDone` channel. We’ve intentionally structured this so that work either completes within the deadline or is treated as a failure immediately.

### **Applying Back-Pressure**

In real-time systems, queues do not solve overload – they merely postpone it. When incoming events arrive faster than they can be processed, a queue continues to grow, increasing the time each event spends waiting.

Buffers can also hide failure. By absorbing excess load, they create the illusion that the system is healthy, even as processing delays grow beyond acceptable limits. This hidden degradation is dangerous because the system continues operating in a compromised state, producing results that are technically correct but operationally useless due to lateness.

As queues and buffers grow, latency increases silently. There is often no explicit error or signal that deadlines are being missed – the system simply becomes slower over time. In real-time systems, this silent latency growth is especially harmful because it violates the assumption that results are delivered within a known and bounded time window.

For these reasons, I strongly recommend that you use bounded channels. When the system becomes overwhelmed, bounded channels enforce back-pressure by refusing additional work. Instead of blocking indefinitely or growing unbounded queues, the system drops events when it cannot keep up.

This behavior makes failures visible. Dropped events are an explicit signal that the system is operating beyond its capacity. Rather than degrading unpredictably, the system degrades in a controlled and observable way. In this context, dropping events is a feature, not a bug, because it preserves latency guarantees for the events that do get processed and allows operators to detect, reason about, and respond to overload conditions immediately.

### Streaming Events to the Browser

Next, we’ll build the Websocket broadcast system to push processed events to the frontend using the [Gorilla (<VPIcon icon="iconfont icon-github"/>`gorilla/websocket`)](http://github.com/gorilla/websocket) `Go` websocket package (but feel free to use any package of your choice).

```go
package main

import (
        "encoding/json"
        "net/http"
        "github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
        CheckOrigin: func(r *http.Request) bool {
                return true
        },
}

func wsHandler(out <-chan Event) http.HandlerFunc {
        return func(w http.ResponseWriter, r *http.Request) {
                conn, _ := upgrader.Upgrade(w, r, nil)
                defer conn.Close()
                for event := range out {
                        data, _ := json.Marshal(event)
                        conn.WriteMessage(websocket.TextMessage, data)
                }
        }
}
```

Here, we simply upgrade an incoming `HTTP` request to a `WebSocket` connection and continuously reads events from our `Event` channel we created earlier, serializing each event to `JSON` and broadcasting it to the connected client. It acts purely as a transport layer, pushing already-processed events to clients with low latency.

It’s important to note that `WebSockets` do not make a system real-time. `WebSockets` merely provide low-latency delivery from the backend to the client. The real-time guarantees are established earlier in the backend pipeline through deliberate design choices: fixed-rate event generation, explicit per-event deadlines, bounded queues, non-blocking sends, deadline-aware processing using contexts, and fail-fast behavior when deadlines are exceeded.

By the time an event is sent over a `WebSocket`, it has already either met its real-time constraints or been discarded. The `WebSocket` layer simply transports the result – it doesn’t enforce or create real-time behavior.

### Consuming a WebSocket Event (React + TypeScript)

Up until now, we’ve been building the backend of our real-time event generator and broadcast system. In the next sections, we’ll build the frontend of the system using `React` and `TypeScript`.

We’ll start by initializing a `WebSocket` client to consume incoming events from the backend using the traditional WebSocket browser interface.

```ts
const socket = new WebSocket("ws://localhost:8080/ws");
socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  buffer.push(data);
};
```

Here we simply initialize a new `WebSocket`, passing along the WebSocket URL from the backend. You have to reference the same URL. Instead of rendering every message immediately, it’s recommended that you always batch updates.

### Making React Real-Time Friendly

Next, let’s create a `React` `useRealTimeEvents` hook to handle streaming and processing of event broadcasts from the backend. Rendering on every message causes render storms, UI lag, and misleading dashboards. Instead, we render on animation frames.

```tsx
import { useEffect, useRef, useState } from 'react';
import type { RealTimeEvent } from 'types/types';

function useRealTimeEvents() {
  const [events, setEvents] = useState<RealTimeEvent[]>([]);
  const buffer = useRef<RealTimeEvent[]>([]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080/ws');
    ws.onmessage = (msg) => {
      buffer.current.push(JSON.parse(msg.data));
    };

    let raf: number;

    const flush = () => {
      if (buffer.current.length > 0) {
        const pendingEvents = buffer.current.slice(0);

        setEvents((prev) => {
          const next = [...prev, ...pendingEvents];
          return next.slice(-50);
        });
      }
      raf = requestAnimationFrame(flush);
    };

    raf = requestAnimationFrame(flush);

    return () => {
      ws.close();
      cancelAnimationFrame(raf);
    };
  }, []);
  return events;
}

export default useRealTimeEvents;
```

The UI is part of the real-time system. It’s important to note that the system broadcasts messages to the frontend in milliseconds. This behavior already crosses the web browser refresh rate threshold.

In certain situations, you might even guess that the use of `setTime` should come in handy here. And that’s a good alternative – but there’s a better solution: using `requestAnimationFrame()`.

The `requestAnimationFrame()` takes in a callback function `flush` which is regulated by the animation frame, ensuring that we don’t cross the refresh rate threshold before the next repaint. You can learn more about it `requestAnimationFrame()` [<VPIcon icon="fa-brands fa-firefox" />here](https://developer.mozilla.org/en-US/docs/Web/API/DedicatedWorkerGlobalScope/requestAnimationFrame).

### Creating the StatsBar Component

Next, let’s create a little `statusBar` component to show events that arrived within the deadline and those that came in late.

Create a new component `StatsBar` and add the code below:

```tsx
import { type FC } from 'react';
import type { RealTimeEvent } from 'types/types';

const StatsBar: FC<{ events: RealTimeEvent[] }> = ({ events }) => {
  const late = events.filter((e) => e.status === 'late').length;
  return (
    <div className="flex flex-row gap-2 bg-gray-500 w-full py-2.5 px-2">
      <strong>Events: {events.length} | </strong>
      <strong>Late: {late}</strong>
    </div>
  );
};

export default StatsBar;
```

Here we are creating a minimal stats component to show the total number of events and those that arrived late by looping through the incoming event list whose statuses are late.

### Creating the Events Table

Next, we’ll create a `EventTable` component to display the events.

```tsx
import { type FC } from 'react';
import type { RealTimeEvent } from 'types/types';

export const EventsTable: FC<{ events: RealTimeEvent[] }> = ({ events }) => {
  const formatDate = (date: string) => new Date(date).toLocaleString();
  return (
    <div className="w-full">
      <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
        <table className="w-full text-sm text-left rtl:text-right text-body">
          <thead className="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default">
            <tr>
              <th scope="col" className="px-6 py-3 font-medium">
                ID
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Satus
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Created At
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Processed At
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Deadline
              </th>
            </tr>
          </thead>
          <tbody>
            {events.map((e, i) => (
              <tr
                key={e.id + i}
                className="bg-neutral-primary border-b border-default"
              >
                <td className="px-6 py-4">{e.id.slice(0, 6)}</td>
                <td className="px-6 py-4">{e.status}</td>
                <td className="px-6 py-4">{formatDate(e.createdAt)}</td>
                <td className="px-6 py-4">{formatDate(e.processedAt)}</td>
                <td className="px-6 py-4">{e.deadlineMs}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
```

Here we loop through all incoming events and display the event’s `id`, `status`, and `deadline`. These metrics will help us gain insight into the performance of our real-time events broadcast system.

### Putting it All Together

At this point, we have implemented a complete, end-to-end real-time application that connects a deadline-aware `Go` backend to a lightweight `React` frontend. On the backend, events are generated at a fixed rate, processed under explicit deadlines, and dropped when the system is under load to preserve real-time guarantees. Only events that meet these guarantees are forwarded to connected clients via `WebSocket` broadcast.

On the frontend, we’ve built the `useRealtimeEvents` hook to establish a persistent `WebSocket` connection and continuously stream events from the backend as they arrive. The `StatsBar` component provides immediate visibility into the system’s behavior by summarizing key characteristics of the event stream, while the `EventTable` component renders individual events in the order they are received. Together, these components clearly mirror the behavior of the system under normal conditions in real-time.

With both the frontend and backend components in place, the application now functions as a real-time monitor. The backend enforces timelines and correctness, and the frontend simply reflects the outcome of those decisions in real-time. There is no buffering or replay logic on the client side – what’s displayed on the `UI` is exactly what the system was able to process within the specified deadline.

Finally, replace your `Welcome` component with the code below to display the `StatusBar` and `EventsTable` component.

```tsx
import { useRealtimeEvents } from "./hooks/useRealtimeEvents";
import { StatsBar } from "./components/StatsBar";
import { EventTable } from "./components/EventTable";

export default function App() {
  const events = useRealtimeEvents();

  return (
    <div>
      <h1>Real-Time Event Monitor</h1>
      <StatsBar events={events} />
      <EventTable events={events} />
    </div>
  );
}
```

The React frontend is scaffolded using [<VPIcon icon="fa-brands fa-react"/>create-react-app](https://react.dev/learn/creating-a-react-app), but the same approach can be used for other frameworks, such as `Next.js` or `Vite`. The complete source code, including the frontend and backend, is available in the repository [here (<VPIcon icon="iconfont icon-github" />`emmanueletukudo/realtime-go-react`)](https://github.com/emmanueletukudo/realtime-go-react). You can reach out to me on the [X platform (<VPIcon icon="fa-brands fa-x-twitter" />`eetukudo_`)](https://x.com/eetukudo_) if you need my assistance.

---

## Final Thoughts

If you’ve followed this tutorial up to this point, congratulations! You’ve learnt the most critical part of building resilient deadline-aware real-time systems.

Remember, real-time systems are not about being fast, but about how **predictable they are.** You don’t need a Real-Time Operating System (RTOS), a PhD, or specialized hardware to start learning real-time design.

All you need to excel is to respect time, bound your resources, and accept that sometimes, dropping data is the correct behavior. If you understand that, you’re already thinking like a real-time systems engineer.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Real-Time Systems for Web Developers: From Theory to a Live Go + React App",
  "desc": "Many developers think that “real-time” is about Websockets, Live data, or instant refreshes on web application dashboards. And although these concepts are closely related to what real-time means, the systems engineering definition is a bit different....",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/real-time-systems-for-web-developers-from-theory-to-a-live-go-react-app.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
