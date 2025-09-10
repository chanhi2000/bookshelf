---
lang: en-US
title: "How to Use RxStomp with React: Build A Chat App"
description: "Article(s) > How to Use RxStomp with React: Build A Chat App"
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
      content: "Article(s) > How to Use RxStomp with React: Build A Chat App"
    - property: og:description
      content: "How to Use RxStomp with React: Build A Chat App"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-chat-app-with-stomp-and-react.html
prev: /programming/js-react/articles/README.md
date: 2024-10-23
isOriginal: false
author: Harsh Deep
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1729648105968/2926c346-0058-4a84-981e-2ff4bd6833df.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "React.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-react/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Use RxStomp with React: Build A Chat App"
  desc="STOMP is an amazingly simple yet powerful protocol for sending messages implemented by popular servers like RabbitMQ, ActiveMQ, and Apollo. Using STOMP over WebSocket is a straightforward protocol, making it a popular choice for sending messages from..."
  url="https://freecodecamp.org/news/build-chat-app-with-stomp-and-react"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1729648105968/2926c346-0058-4a84-981e-2ff4bd6833df.png"/>

STOMP is an amazingly simple yet powerful protocol for sending messages implemented by popular servers like RabbitMQ, ActiveMQ, and Apollo. Using STOMP over WebSocket is a straightforward protocol, making it a popular choice for sending messages from a web browser because protocols like AMQP are limited by major browsers blocking TCP connections.

To use STOMP over WebSocket, you can use [<VPIcon icon="fa-brands fa-npm"/>`@stomp/stompjs`](https://npmjs.com/package/@stomp/stompjs), but that has tricky callbacks and a complicated API that caters to more specialized use cases. Luckily, there’s also the lesser-known [<VPIcon icon="fa-brands fa-npm"/>`@stompjs/rx-stomp`](https://npmjs.com/package/@stomp/rx-stomp) which provides a nice interface via [<VPIcon icon="fa-brands fa-npm"/>`rxjs`](https://npmjs.com/package/rxjs) observables. Observables aren't exclusive to Angular, and they fit quite well with how React works. It's a neat interface when composing complex workflows and pipelines with many different message sources.

The tutorial follows a somewhat similar path as the initial version in [<VPIcon icon="fas fa-globe"/>Angular](https://stomp-js.github.io/guide/rx-stomp/rx-stomp-with-angular.html), but the component structure and code style are tuned towards the functional style of React.

::: note

This tutorial is written with `strict` TypeScript, but the JavaScript code is almost identical since we only have 5 type declarations. For the JS version, you can skip the type imports and definitions.

:::

---

## Goals

Here, we’ll build a simplified chatroom application that shows various aspects of RxStomp across different components. Overall, we want to have:

- A React frontend connected with RxStomp to a STOMP server.
- A live connection status display based on our connection to the STOMP server.
- Pub/Sub logic for any configurable topic.
- Splitting RxStomp logic across multiple components to show how to separate logic and responsibility.
- Aligning RxStomp connection/subscription lifecycles with React component lifecycles to ensure that there are no leaks or unclosed watchers.

::: note Prerequisites

- You should have a STOMP server running so that the React application can connect to it. Here, we’ll use RabbitMQ with the `rabbitmq_web_stomp` extension.
- Latest React version. This tutorial will use v18, although older versions will probably work as well.
- Some familiarity with observables will also help.

:::

---

## Starter STOMP Server with RabbitMQ

If you’d like to use RabbitMQ too (not strictly required), here’s are [<VPIcon icon="iconfont icon-rabbitmq"/>installation guides for different operating systems](https://rabbitmq.com/docs/download). To add the extension, you’ll need to run:

```sh
rabbitmq-plugins enable rabbitmq_web_stomp
```

If you’re able to use `Docker`, a Docker file similar to [this (<VPIcon icon="iconfont icon-github"/>`harsh183/rabbitmq-intro`)](https://github.com/harsh183/rabbitmq-intro/blob/master/code_examples/Dockerfile) will set everything needed for the tutorial:

<SiteInfo
  name="harsh183/rabbitmq-intro"
  desc="These are some slide shows and code examples for RabbitMQ."
  url="https://github.com/harsh183/rabbitmq-intro/blob/master/code_examples/Dockerfile"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/e53259f0bc4fca887603257d415e5466691d6d502101b0e13d45e5f667b77f2a/harsh183/rabbitmq-intro"/>

```dockerfile
FROM rabbitmq:3.8.8-alpine

run rabbitmq-plugins enable --offline rabbitmq_web_stomp

EXPOSE 15674
```

---

## Starter React Template

For this tutorial, we'll use [<VPIcon icon="iconfont icon-vitejs"/>Vite](https://vite.dev/guide/)'s `react-ts` template. The central part of our application will be in the `App` component, and we'll create child components for other specific STOMP functionality.

---

## How to Install RxStomp

We’ll use the <VPIcon icon="fa-brands fa-npm"/>`@stomp/rx-stomp` npm package:

```sh
npm i @stomp/rx-stomp rxjs
```

This will install version `2.0.0`

::: note

This tutorial still works without explicitly specifying `rxjs` since it's a sister dependency, but it's good practice to be explicit about it.

:::

---

## How to Manage Connection and Disconnection with the STOMP Server

Now, let's open <VPIcon icon="fa-brands fa-react"/>`App.tsx` and initialize our `RxStomp` client. Since the client isn't a state that will change for rendering, we’ll wrap it in the `useRef` Hook.

```tsx title="App.tsx"
import { useRef } from 'react'
import { RxStomp } from '@stomp/rx-stomp'

import './App.css'

function App() {
  const rxStompRef = useRef(new RxStomp())
  const rxStomp = rxStompRef.current

  return (
    <>
      <h1>Hello RxStomp!</h1>
    </>
  )
}

export default App
```

Assuming the default ports and authentication details, we’ll define some configuration for our connection next.

```tsx title="App.tsx"
import { RxStomp } from '@stomp/rx-stomp'
import type { RxStompConfig } from '@stomp/rx-stomp'
// ...
const rxStompConfig: RxStompConfig = {
  brokerURL: 'ws://localhost:15674/ws',
  connectHeaders: {
    login: 'guest',
    passcode: 'guest',
  },
  debug: (msg) => {
    console.log(new Date(), msg)
  },
  heartbeatIncoming: 0,
  heartbeatOutgoing: 20000,
  reconnectDelay: 200,
}

function App() {
  // ...
}
```

For a better dev experience, we logged all messages with timestamps to a local console and set low timer frequencies. Your configuration should be quite different for your production application, so check out the [<VPIcon icon="fas fa-globe"/>RxStompConfig docs](https://stomp-js.github.io/api-docs/latest/classes/RxStompConfig.html) for all the options available.

Next, we’ll pass the configuration to `rxStomp` inside a `useEffect` Hook. This manages the connection's activation alongside the component lifecycle.

```tsx title="App.tsx"
// ...
function App() {
  const rxStompRef = useRef(new RxStomp())
  const rxStomp = rxStompRef.current

  useEffect(() => {
    rxStomp.configure(rxStompConfig)
    rxStomp.activate()

    return () => { 
      rxStomp.deactivate() 
    }
  })
  // ...
}
```

While there's no visual change in our app, checking the logs should show connection and ping logs. Here's an example of what that should look like:

```plaintext
Date ... >>> CONNECT
login:guest
passcode:guest
accept-version:1.2,1.1,1.0
heart-beat:20000,0

Date ... Received data 
Date ... <<< CONNECTED
version:1.2
heart-beat:0,20000
session:session-EJqaGQijDXqlfc0eZomOqQ
server:RabbitMQ/4.0.2
content-length:0

Date ... connected to server RabbitMQ/4.0.2 
Date ... send PING every 20000ms 
Date ... <<< PONG 
Date ... >>> PING
```

::: note

Generally, if you see duplicate logs, it may be a sign that a deactivation or unsubscribe functionality wasn't implemented correctly. React renders each component twice in a dev environment to help people catch these bugs via `React.StrictMode`

:::

---

## How to Monitor the Connection Status

RxStomp has a [<VPIcon icon="fas fa-globe"/>RxStompState enum](https://stomp-js.github.io/api-docs/latest/miscellaneous/enumerations.html#RxStompState) that represents possible connection states with our broker. Our next goal is to display the connection status in our UI.

Let's create a new component for this called <VPIcon icon="fa-brands fa-react"/>`Status.tsx`:

```tsx title="Status.tsx"
import { useState } from 'react'

export default function Status() {
  const [connectionStatus, setConnectionStatus] = useState('')

  return (
    <>
      <h2>Connection Status: {connectionStatus}</h2>
    </>
  )
}
```

We can use the `rxStomp.connectionState$` observable to bind to our `connectionStatus` string. Similar to how we used `useEffect`, we’ll use the unmount action to `unsubscribe()`.

```tsx title="Status.tsx"
import { RxStompState } from '@stomp/rx-stomp'
import { useEffect, useState } from 'react'
import type { RxStomp } from '@stomp/rx-stomp'


export default function Status(props: { rxStomp: RxStomp }) {
  const [connectionStatus, setConnectionStatus] = useState('')

  useEffect(() => {
    const statusSubscription = props.rxStomp.connectionState$.subscribe((state) => {
      setConnectionStatus(RxStompState[state])
    })

    return () => {
      statusSubscription.unsubscribe()
    }
  }, [])

  return (
    <>
      <h2>Connection Status: {connectionStatus}</h2>
    </>
  )
}
```

To view it, we include it in our app:

```tsx title="App.tsx"
import Status from './Status'
  // ...
  return (
    <>
      <h1>Hello RxStomp!</h1>

      <Status rxStomp={rxStomp}/>
    </>
  )
```

At this point, you should have a working visual indicator on the screen. Try playing around by taking the STOMP server down and see if the logs work as expected.

---

## How to Send Messages

Let's create a simple chatroom to show a simplified end-to-end messaging flow with the broker.

We can place the functionality in a new `Chatroom` component. First, we can create the component with a custom `username` and `message` field that's bound to inputs.

```tsx title="Chatroom.tsx"
import { useState } from 'react'
import type { RxStomp } from '@stomp/rx-stomp'

export default function Chatroom(props: {rxStomp: RxStomp}) {
  const [message, setMessage] = useState('')
  const [userName, setUserName] = useState(`user${Math.floor(Math.random() * 1000)}`)

  return (
    <>
      <h2>Chatroom</h2>

      <label htmlFor='username'>Username: </label>
      <input
        type='text'
        name='username'
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />

      <label htmlFor='message'>Message: </label>

      <input
        type='text'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        name='message'
      />
    </>
  )    
}
```

Let’s include this within our **App** with a toggle to join the chatroom:

```tsx title="App.tsx"
import { useEffect, useState, useRef } from 'react'
import Chatroom from './Chatroom'
// ...

function App() {
  const [joinedChatroom, setJoinedChatroom] = useState(false)
  // ...
  return (
    <>
      <h1>Hello RxStomp!</h1>

      <Status rxStomp={rxStomp}/>

      {!joinedChatroom && (
        <button onClick={() => setJoinedChatroom(true)}>
          Join chatroom!
        </button>
      )}

      {joinedChatroom && (
        <>
          <button onClick={() => setJoinedChatroom(false)}>
            Leave chatroom!
          </button>

          <Chatroom rxStomp={rxStomp}/>
        </>
      )}
    </>
  )
}
```

Time to actually send messages. STOMP is best for sending text-based messages (binary data is also possible). We’ll define the structure of the data we're sending in a new <VPIcon icon="iconfont icon-typescript"/>`types` file:

```ts title="types.ts"
interface ChatMessage {
  userName: string,
  message: string
}
```

::: note

If you're not using TypeScript, you can skip adding this type definition.

:::

Next, let's use JSON to serialize the message and send messages to our STOMP server using `.publish` with a destination topic and our JSON `body`.

```tsx title="Chatroom.tsx"
import type { ChatMessage } from './types'
// ...
const CHATROOM_NAME = '/topic/test'

export default function Chatroom(props: {rxStomp: RxStomp}) {
  // ...
  function sendMessage(chatMessage: ChatMessage) {
    const body = JSON.stringify({ ...chatMessage })
    props.rxStomp.publish({ destination: CHATROOM_NAME, body })
    console.log(`Sent ${body}`)
    setMessage('')
  }

  return (
    <>
      <h2>Chatroom</h2>

      <label htmlFor="username">Username: </label>
      <input
        type="text"
        name="username"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />

      <label htmlFor="message">Message: </label>

      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        name="message"
      />

      <button onClick={() => sendMessage({userName, message})}>Send Message</button>
    </>
  )
}
```

To test it out, try clicking the **Send Message** button a few times and see if the serialization works fine. While you won't be able to see any visual changes yet, the console logs should show it:

```plaintext
Date ... >>> SEND
destination:/topic/test
content-length:45

Sent {"userName":"user722","message":"1234567890"}
```

---

## How to Receive Messages

We’ll create a new component to show the list of messages from all the users. For now, we'll use the same type, pass the topic name as a prop, and display everything as a list. All this goes into a new component called `MessageList`.

```tsx title="MessageDisplay.tsx"
import { useEffect, useState } from 'react'
import type { RxStomp } from '@stomp/rx-stomp'
import type { ChatMessage } from './types'

export default function MessageDisplay(props: {rxStomp: RxStomp, topic: string}) {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {userName: 'admin', message: `Welcome to ${props.topic} room!`}
  ])

  return(
  <>
    <h2>Chat Messages</h2>
    <ul>
      {chatMessages.map((chatMessage, index) => 
        <li key={index}>
          <strong>{chatMessage.userName}</strong>: {chatMessage.message}
        </li>
      )}
    </ul>
  </>
  )
}
```

Time to bring everything together!

Similar to managing the subscription with the `Status` component, we set up the subscription on mount, and unsubscribe on unmount.

Using RxJS `pipe` and `map`, we can deserialize our JSON back to our `ChatMessage`. The modular design can let you set up a more complicated pipeline as needed using `RxJS` operators.

```tsx title="MessageDisplay.tsx"
// ...
import { map } from 'rxjs'

export default function MessageDisplay(props: {rxStomp: RxStomp, topic: string}) {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {userName: 'admin', message: `Welcome to ${props.topic} room!`}
  ])

  useEffect(() => {
    const subscription = props.rxStomp
      .watch(props.topic)
      .pipe(map((message) => JSON.parse(message.body)))
      .subscribe((message) => setChatMessages((chatMessages) => [...chatMessages, message]))

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  // ...
}
```

At this point, the chat GUI should show messages correctly, and you can experiment with opening multiple tabs as different users.

Another thing to try here is turning off the STOMP server, sending a few messages, and turning it back on. The messages should get queued locally and dispatched once the server is ready to go. Neat!

---

## Summary

In this tutorial, we:

- Installed <VPIcon icon="fa-brands fa-npm"/>`@stomp/rx-stomp` for a nice dev experience.
- Set up `RxStompConfig` to configure our client with the connection details, debugger logging and timer settings.
- Used `rxStomp.activate` and `rxStomp.deactivate` to manage the client’s main lifecycle.
- Monitored the subscription state using `rxStomp.connectionState$` observable.
- Published messages using `rxStomp.publish` with configurable destinations and message bodies.
- Created an observable for a given topic using `rxStomp.watch`.
- Used both console logs and React components to see the library in action, and verify functionality and fault tolerance.

You can find the final code on Gitlab:

<SiteInfo
  name="harsh183/rxstomp-react-tutorial"
  desc="Harsh Deep / RxStomp React Tutorial"
  url="https://gitlab.com/harsh183/rxstomp-react-tutorial/"
  logo="https://gitlab.com/assets/favicon-72a2cad5025aa931d6ea56c3201d1f18e68a8cd39788c7c80d5b2b82aa5143ef.png"
  preview="https://gitlab.com/assets/twitter_card-570ddb06edf56a2312253c5872489847a0f385112ddbcd71ccfa1570febab5d2.jpg"/>

Feel free to use it as a starter template too and report any issues that may come up.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Use RxStomp with React: Build A Chat App",
  "desc": "STOMP is an amazingly simple yet powerful protocol for sending messages implemented by popular servers like RabbitMQ, ActiveMQ, and Apollo. Using STOMP over WebSocket is a straightforward protocol, making it a popular choice for sending messages from...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-chat-app-with-stomp-and-react.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
