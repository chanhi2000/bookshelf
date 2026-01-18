---
lang: en-US
title: "React WebSocket tutorial: Real-time messaging with WebSockets and Socket.IO"
description: "Article(s) > React WebSocket tutorial: Real-time messaging with WebSockets and Socket.IO"
icon: fa-brands fa-node
category:
  - Node.js
  - React.js
  - Article(s)
tag:
  - blog
  - blog.logrocket.com
  - node
  - nodejs
  - node-js
  - react
  - reactjs
  - react-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > React WebSocket tutorial: Real-time messaging with WebSockets and Socket.IO"
    - property: og:description
      content: "React WebSocket tutorial: Real-time messaging with WebSockets and Socket.IO"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/websocket-tutorial-socket-io.html
prev: /programming/js-react/articles/README.md
date: 2025-05-12
isOriginal: false
author:
  - name: Avanthika Meenakshi
    url : https://blog.logrocket.com/author/avanthikameenakshi/
cover: /assets/image/blog.logrocket.com/websocket-tutorial-socket-io/banner.jpg
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
  name="React WebSocket tutorial: Real-time messaging with WebSockets and Socket.IO"
  desc="Learn how to build a real-time collaborative document editing app with a Node.js backend and React frontend using the WebSocket protocol."
  url="https://blog.logrocket.com/websocket-tutorial-socket-io"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/websocket-tutorial-socket-io/banner.jpg"/>

In this article, I will explain the theoretical concepts behind the WebSocket protocol. Additionally, I’ll demonstrate how to build a real-time collaborative document editing app with a Node.js backend and React frontend using the WebSocket protocol.

![WebSockets Tutorial With Node And React](/assets/image/blog.logrocket.com/websocket-tutorial-socket-io/banner.jpg)

It was previously quite common for most web apps to have a closely connected backend and frontend, so the apps served data with the view content to the user’s browser. Nowadays, we typically develop loosely coupled, separate backends and frontends by connecting the two with a network-oriented communication line.

For example, developers often use the RESTful pattern with the HTTP protocol to implement a communication line between the frontend and backend for data transfer. But the HTTP-based RESTful concept uses a simplex communication (one-way), so we can’t push data directly from the server (backend) to the client (frontend) without implementing workarounds such as polling.

The WebSocket protocol solves this drawback of the traditional HTTP pattern, offers a full-duplex (or two-way) communication mechanism, and helps developers build real-time apps, such as chat, trading, and multi-player game apps.

---

## What is the WebSocket protocol?

The WebSocket protocol offers persistent, real-time, full-duplex communication between the client and the server over a single TCP socket connection.

The WebSocket protocol has only two agendas: to open up a handshake and to help the data transfer. Once the server accepts the handshake request sent by the client and initiates a WebSocket connection, they can send data to each other with less overhead at will.

[**WebSocket communication**](/blog.logrocket.com/implementing-websocket-communication-next-js.md) takes place over a single TCP socket using either WS (port 80) or WSS (port 443) protocol. Every browser except Opera Mini provides admirable support for WebSockets at the time of writing, according to [<VPIcon icon="iconfont icon-caniuse"/>Can I Use](https://caniuse.com/#feat=websockets).

The following video explains how the WebSocket protocol works and benefits users compared to the traditional HTTP protocol:

::: note Editor’s note

This post was updated by* [<VPIcon icon="iconfont icon-logrocket"/>Isaac Okoro](https://blog.logrocket.com/author/isaacjunior/) in May 2025 to add a native WebSocket example using React Hooks, explain the usage of react-use-websocket, and clarify the role of Socket.IO.

:::

---

## WebSocket vs. HTTP polling, HTTP streaming, and server-sent events

Historically, creating web apps that needed real-time data required an [<VPIcon icon="fa-brands fa-wikipedia-w"/>abuse of HTTP protocol](https://tools.ietf.org/html/rfc6202) to establish bidirectional data transfer. There were multiple methods used to achieve real-time capabilities by enabling a way to send data directly from the server to clients, but none of them were as efficient as WebSocket. HTTP polling, HTTP streaming, [<VPIcon icon="fa-brands fa-wikipedia-w"/>Comet](https://en.wikipedia.org/wiki/Comet_(programming)), and SSE  (server-sent events) all have their drawbacks.

### HTTP polling

The very first attempt to solve the problem was by polling the server at regular intervals. The normal polling approach fetches data from the server frequently based on an interval defined on the client side (typically using `setInterval` or recursive `setTimeout`). On the other hand, the long polling approach is similar to normal polling, but the server handles the timeout/waiting time.

The HTTP long polling lifecycle is as follows:

1. The client sends out a request and waits for a response
2. The server defers its response until there’s a change, update, or timeout. The request stays “hanging” until the server has something to return to the client
3. When there’s some change or update on the server end, it sends a response back to the client
4. The client sends a new long-poll request to listen to the next set of changes

There were a lot of loopholes in long polling  —  header overhead, latency, timeouts, caching, and so on.

### HTTP streaming

This mechanism saved the pain of network latency because the initial request is kept open indefinitely. The request is never terminated, even after the server pushes the data. The first three lifecycle methods of HTTP streaming are the same in HTTP long polling.

When the response is sent back to the client, however, the request is never terminated; the server keeps the connection open and sends new updates whenever there’s a change. HTTP streaming is a generic concept, and you can design your own streaming architecture with available low-level streaming APIs in server-side and client-side modules, i.e., building an HTTP streaming solution with [**Node streams**](/blog.logrocket.com/working-node-js-streams.md) and the [**browser’s Fetch API**](/blog.logrocket.com/fetch-api-node-js.md).

### Server-sent events (SSE)

With SSE, the server pushes data to the client, similar to HTTP streaming. SSE is a standardized form of the HTTP streaming concept and comes with a [<VPIcon icon="fa-brands fa-firefox"/>built-in browser API](https://developer.mozilla.org/en-US/docs/Web/API/EventSource).

A chat or gaming application cannot completely rely on SSE. This is because we can’t send data from the client to the server using the same server-side event stream, as SSE isn’t full-duplex and only lets you send data directly from the server to clients.

The perfect use case for SSE would be, for example, the Facebook news feed: whenever new posts come in, the server pushes them to the timeline. SSE is sent over traditional HTTP and has restrictions on the number of open connections.

Learn more about the SSE architecture from [this GitHub Gist file (<VPIcon icon="iconfont icon-github"/>`CMCDragonkai`)](https://gist.github.com/CMCDragonkai/6bfade6431e9ffb7fe88). These methods were not just inefficient compared to WebSockets. The code that went into them appeared as a workaround to make a request-reply-type protocol full-duplex-like.

---

## Why you should use WebSockets

WebSockets are designed to supersede existing bidirectional communication methods. The existing methods described above are neither reliable nor efficient when it comes to full-duplex real-time communications.

WebSockets are similar to SSE but also allow messages to be sent from the client to the server. Connection restrictions are no longer an issue because data is served over a single TCP socket connection.

---

## How to use WebSockets with Node.js and React

As mentioned in the introduction, the WebSocket protocol has only two agendas:

1. to open up a handshake, and 
2. to help the data transfer.

Let’s see how WebSockets fulfill those agendas. To do that, I’m going to spin off a Node.js server and [**connect it to a client built with React**](https://blog.logrocket.com/websockets-two-way-communication-react-app.md).

First, download or clone [this GitHub repository (<VPIcon icon="iconfont icon-github" />`codezri/react-node-websockets-demo`)](https://github.com/codezri/react-node-websockets-demo) onto your computer. This repository contains the source code of the sample collaborative document editing app. Open it with your favorite code editor. You will see two directories as follows:

```plaintext
server: A Node.js WebSocket server that handles the document editor’s backend logic
client: The React app that connects to the WebSocket server for real-time features
```

You can start the document editor app with the following commands:

```sh
# Set up and start the server
cd server
npm install # or yarn install
npm start # or yarn start

# Set up and start the client
cd client
npm install # or yarn install
npm start # or yarn start
```

Run the app with the above commands, try to open it with two browser windows, then edit the document from both:

![Testing The Sample App With Two Browser Windows](/assets/image/blog.logrocket.com/websocket-tutorial-socket-io/testing-sample-app-two-browser-windows.webp)

Let’s study the source code and learn how it works using WebSockets!

---

## Agenda 1: WebSocket establishes a handshake between the server and the client

### Creating a handshake at the server level with Node.js

We can make use of a single port to spin off the HTTP server and attach the WebSocket server. The code below (taken from <VPIcon icon="fas fa-folder-open"/>`server/`<VPIcon icon="fa-brands fa-js"/>`index.js`) shows the creation of a simple HTTP server. Once it is created, we tie the WebSocket server to the HTTP port:

```js title="server/index.js"
const { WebSocketServer } = require('ws');
const http = require('http');

// Spinning the HTTP server and the WebSocket server.
const server = http.createServer();
const wsServer = new WebSocketServer({ server });
const port = 8000;
server.listen(port, () => {
  console.log(`WebSocket server is running on port ${port}`);
});
```

In the sample project, I used the popular [ws library (<VPIcon icon="iconfont icon-github" />`websockets/ws`)](https://github.com/websockets/ws) to attach a WebSocket server instance to an HTTP server instance. Once the WebSocket server is attached to the HTTP server instance, it will accept the incoming WebSocket connection requests by upgrading the protocol from HTTP to WebSocket.

I maintain all the connected clients as an object in my code with a unique key generated via the [`uuid` package (<VPIcon icon="iconfont icon-github" />`uuidjs/uuid`)](https://github.com/uuidjs/uuid) on receiving their request from the browser:

```js
// I'm maintaining all active connections in this object
const clients = {};

// A new client connection request received
wsServer.on('connection', function(connection) {
  // Generate a unique code for every user
  const userId = uuidv4();
  console.log(`Received a new connection.`);

  // Store the new connection and handle messages
  clients[userId] = connection;
  console.log(`${userId} connected.`);
});
```

When you open the app with a new browser tab, you’ll see a generated UUID on your terminal as follows:

![The Terminal Shows New WebSocket Client Connection IDs](/assets/image/blog.logrocket.com/websocket-tutorial-socket-io/terminal-shows-new-websocket-client-connection-ids.webp)

### When the HTTP connection is accepted

When initiating a standard HTTP request to establish a connection, the client includes the `Sec-WebSocket-Key` within the request headers. The server encodes and hashes this value and adds a predefined GUID. It echoes the generated value in the `Sec-WebSocket-Accept` in the server-sent handshake.

Once the request is accepted in the server (after necessary validations in production), the handshake is fulfilled with [<VPIcon icon="fa-brands fa-firefox"/>status code](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/101) `101` (switching protocols). If you see anything other than status code `101` in the browser, the WebSocket upgrade has failed, and the normal HTTP semantics will be followed.

The `Sec-WebSocket-Accept` header field indicates whether the server is willing to accept the connection or not. Also, if the response lacks an `Upgrade` header field, or the `Upgrade` does not equal `websocket`, it means the WebSocket connection has failed.

The successful WebSocket server handshake looks like this:

```plaintext title="output"
HTTP GET ws://127.0.0.1:8000/ 101 Switching Protocols
Connection: Upgrade
Sec-WebSocket-Accept: Nn/XHq0wK1oO5RTtriEWwR4F7Zw=
Upgrade: websocket
```

### Creating a handshake request at the client level

At the client level, I use the [React–use-websocket (<VPIcon icon="fa-brands fa-npm" />`react-use-websocket`)](thttps://npmjs.com/package/react-use-websocket) library to initiate a WebSocket connection. We can also use the built-in native WebSocket browser API without any third-party package. However, using the browser API directly in React functional components typically generates complex code.

Bear with me: for those who may not fancy the react-use-websocket library, I will show you how it is done using the native WebSocket afterwards.

We can also create a custom React Hook for WebSocket connections, but then we will re-invent the wheel and create a react-use-websocket clone. React react-use-websocket offers the `useWebSocket` Hook to manage WebSocket connections from React functional components.

As soon as the request is accepted by the server, we will see `WebSocket connection established` on the browser console.

Here’s the initial scaffold to create the connection to the server via the `App` component (in `client/src/`<VPIcon icon="fa-brands fa-react"/>`App.jsx`):

```jsx title="App.jsx"
// App.jsx basic setup
import React, { useEffect, useRef } from 'react';
import useWebSocket from 'react-use-websocket';

const WS_URL = 'ws://127.0.0.1:8000';

function App() {
  const wsRef = useRef(null);

  const { getWebSocket, readyState } = useWebSocket(WS_URL, {
    onOpen: () => {
      console.log('WebSocket connection established.');
      wsRef.current = getWebSocket();
    },
    onClose: () => {
      console.log('WebSocket connection closed.');
    }
  });

  // Lifecycle cleanup
  useEffect(() => {
    return () => {
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.close();
      }
    };
  }, []);

  return (
    <div>Hello WebSockets!</div>
  );
}

export default App;
```

The following headers are sent by the client to establish the handshake:

```js
HTTP GET ws://127.0.0.1:8000/ 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: vISxbQhM64Vzcr/CD7WHnw==
Origin: http://localhost:3000
Sec-WebSocket-Version: 13
```

Now that the client and server are connected via the WebSocket handshake event, the WebSocket connection can transmit messages as it receives them, thereby fulfilling the second agenda of the WebSocket protocol.

---

## Agenda 2: Real-time message transmission

![Inspecting Real-Time Message Transmission Using Chrome DevTools](/assets/image/blog.logrocket.com/websocket-tutorial-socket-io/inspecting-real-time-message-transmission-using-chrome-devtools.webp)

Users can join together and edit a document in the sample React app. The app tracks two events:

1. **User activities —** Every time a user joins or leaves, I broadcast the message to all the other connected clients
2. **Content changes —** Every time content in the editor is changed, it is broadcast to all the other connected clients

The protocol allows us to send and receive messages as binary data or UTF-8 (N.B., transmitting and converting UTF-8 has less overhead). Try inspecting WebSocket messages by using Chrome DevTools to see sent/received messages, as shown in the preview above.

Understanding and implementing WebSockets is very easy as long as we have a good understanding of the socket events: `onopen`, `onclose`, and `onmessage`. The terminologies are the same on both the client and the server side.

### Sending and listening to messages on the client side using React useWebSocket

From the client, when a new user joins in or when content changes, we trigger a message to the server using `sendJsonMessage` to take the new information to the server:

```jsx :collapsed-lines
/* When a user joins, I notify the
server that a new user has joined to edit the document. */
// For the login and content change section
function LoginSection({ onLogin }) {
  const [username, setUsername] = useState('');

  // Share WebSocket connection from parent
  useWebSocket(WS_URL, {
    share: true,
    filter: () => false // Don't process messages in this component
  });

  const logInUser = useCallback(() => {
    if(!username.trim()) {
      return;
    }
    onLogin && onLogin(username);
  }, [username, onLogin]);

  return (
    <form onSubmit={(e) => { e.preventDefault(); logInUser(); }}>
      <input 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
      />
      <button type="submit">Join</button>
    </form>
  );
}
  // ----
  // ----

/* When content changes, we send the
current content of the editor to the server. */
function Editor({ html, onContentChange }) {
  const editorRef = useRef(null);

  // Sync with incoming content changes
  useEffect(() => {
    if (editorRef.current && editorRef.current.value !== html) {
      editorRef.current.value = html;
    }
  }, [html]);

  const handleHtmlChange = useCallback((e) => {
    onContentChange({
      type: 'contentchange',
      content: e.target.value
    });
  }, [onContentChange]);

  return (
    <textarea 
      ref={editorRef}
      value={html} 
      onChange={handleHtmlChange} 
    />
  );
}
```

Listening to messages from the server is pretty simple. For example, see how the `History` component listens to user events and renders the activity log:

```js
function History() {
  const { lastJsonMessage } = useWebSocket(WS_URL, {
    share: true,
    filter: isUserEvent
  });

  const activities = useMemo(() => {
    return lastJsonMessage?.data?.userActivity || [];
  }, [lastJsonMessage]);

  return (
    <ul>
      {activities.map((activity, index) => (
        <li key={`activity-${index}`}>{activity}</li>
      ))}
    </ul>
  );
}
```

Here we used the `share: true` setup to reuse the existing WebSocket connection we initiated in the `App` component. By default, the `useWebSocket` Hook re-renders the component whenever the WebSocket connection receives a new message from the server and the connection state changes.

As a result, the `History` component will re-render for user and editor events. So, as a performance enhancement, we use the `filter: isUserEvent` setup to re-render the component only for user events.

As pointed out earlier, using the native WebSocket, our code will look like this:

```js :collapsed-lines title="NativeWebSocketExample.js"
import React, { useState, useEffect, useRef, useCallback } from 'react';

const NativeWebSocketExample = () => {
  // State for tracking messages and connection status
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [connectionStatus, setConnectionStatus] = useState('Disconnected');

  // Use useRef to keep a reference to the WebSocket instance
  // This ensures the same instance persists between renders
  const socketRef = useRef(null);

  // Setup WebSocket connection
  useEffect(() => {
    // Create a new WebSocket connection
    const socket = new WebSocket('ws://localhost:8000');

    // Store the socket in our ref
    socketRef.current = socket;

    // Setup event handlers
    socket.onopen = () => {
      console.log('WebSocket connection established');
      setConnectionStatus('Connected');
    };

    socket.onmessage = (event) => {
      // Parse incoming messages
      try {
        const data = JSON.parse(event.data);
        setMessages((prevMessages) => [...prevMessages, data]);
      } catch (error) {
        console.error('Error parsing message:', error);
        setMessages((prevMessages) => [...prevMessages, { text: event.data, type: 'text' }]);
      }
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
      setConnectionStatus('Error');
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed');
      setConnectionStatus('Disconnected');
    };

    // Clean up the WebSocket connection when the component unmounts
    return () => {
      console.log('Closing WebSocket connection');
      if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
        socketRef.current.close();
      }
    };
  }, []); // Empty dependency array means this runs once on mount

  // Function to send messages
  const sendMessage = useCallback(() => {
    if (
      socketRef.current && 
      socketRef.current.readyState === WebSocket.OPEN && 
      inputMessage.trim() !== ''
    ) {
      // Create a message object
      const messageObj = {
        type: 'message',
        text: inputMessage,
        timestamp: new Date().toISOString()
      };

      // Send as JSON string
      socketRef.current.send(JSON.stringify(messageObj));

      // Clear input field after sending
      setInputMessage('');
    }
  }, [inputMessage]);

  // Handle Enter key in the input field
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="websocket-container">
      <div className="status-bar">
        Status: <span className={`status-${connectionStatus.toLowerCase()}`}>{connectionStatus}</span>
      </div>

      <div className="message-container">
        {messages.length === 0 ? (
          <div className="no-messages">No messages yet</div>
        ) : (
          messages.map((msg, index) => (
            <div key={index} className="message">
              <div className="message-text">{msg.text}</div>
              {msg.timestamp && (
                <div className="message-time">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <div className="input-area">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
          disabled={connectionStatus !== 'Connected'}
        />
        <button 
          onClick={sendMessage}
          disabled={connectionStatus !== 'Connected' || inputMessage.trim() === ''}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default NativeWebSocketExample;

// Usage in another component:
/*
import React from 'react';
import NativeWebSocketExample from './NativeWebSocketExample';

function App() {
  return (
    <div className="App">
      <h1>WebSocket Chat Example</h1>
      <NativeWebSocketExample />
    </div>
  );
}

export default App;
```

Using the native WebSocket is particularly useful when you need better control over your WebSocket implementation, or when you want to minimize external dependencies in your React application.

### Sending and listening to messages on the Node.js WebSocket server

In the server, we simply have to catch the incoming message and broadcast it to all the clients connected to the WebSocket.

This is one of the differences between the infamous [**Socket.IO and WebSocket**](/blog.logrocket.com/building-real-time-location-app-node-js-socket-io.md); we need to manually send the message to all clients when we use WebSocket. Socket.IO is a full-fledged library, so it offers built-in methods to broadcast messages to all connected clients or specific clients based on a namespace.

See how we handle broadcasting in the backend by implementing the `broadcastMessage()` function:

```js
function broadcastMessage(json) {
  // We are sending the current data to all connected active clients
  const data = JSON.stringify(json);
  for(let userId in clients) {
    let client = clients[userId];
    if(client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  };
}
```

![Sending And Listening To Messages Server Side Using WebSockets](/assets/image/blog.logrocket.com/websocket-tutorial-socket-io/sending-listening-messages-server-side-using-websockets.webp)

---

## What happens when the browser is closed?

When the browser is closed, the WebSocket invokes the `close` event, which allows us to write the logic to terminate the current user’s connection. In my code, I broadcast a message to the remaining users when a user leaves the document:

```js
function handleDisconnect(userId) {
    console.log(`${userId} disconnected.`);
    const json = { type: typesDef.USER_EVENT };
    const username = users[userId]?.username || userId;
    userActivity.push(`${username} left the document`);
    json.data = { users, userActivity };
    delete clients[userId];
    delete users[userId];
    broadcastMessage(json);
}

// User disconnected
connection.on('close', () => handleDisconnect(userId));
```

Test this implementation by closing a browser tab that has this app. You’ll see information on both the history section of the app and the browser console, as shown in the following preview:

![How Does The App Respond When A Logged User Disconnects](/assets/image/blog.logrocket.com/websocket-tutorial-socket-io/how-does-app-respond-when-logged-user-disconnects.webp)

---

## WS vs. WSS: Understanding WebSocket Secure

In the sample app, we used WS as the protocol identifier of the WebSocket connection URL. WS refers to a normal WebSocket connection that gets established via the plain-text HTTP protocol.

This connection stream is not as secure as traditional `http://` URLs and can be intercepted by external entities, so WebSocket offers the WebSocket Secure (WSS) mode via the WSS protocol identifier by integrating the SSL/TLS protocol. Similar to `https://` URLs, the WSS-based connections cannot be intercepted by external entities because data gets encrypted with the SSL/TLS protocol.

Here is a summary of the differences between WS and WSS:

| Comparison factor | WS | WSS |
| --- | --- | --- |
| The abbreviation stands for | WebSocket | WebSocket Secure |
| Connection initialization protocol | HTTP | HTTPS (HTTP Secure) |
| Data encryption | No | Yes, via the SSL/TLS protocol using RSA-like algorithms |
| Transport layer security | No | Yes, data encryption is handled via the SSL/TLS protocol |
| Application layer security | No, the developer should handle these protections | No, the developer should handle these protections |

Using WSS over WS is recommended to prevent [<VPIcon icon="fa-brands fa-wikipedia-w"/>man-in-the-middle (MITM) attacks](https://en.wikipedia.org/wiki/Man-in-the-middle_attack), but using WSS doesn’t implement cross-origin and application-level security. Make sure to implement necessary URL origin checks in WebSocket servers and a strong authentication method (i.e., a token-based technique) in applications to prevent application-level security vulnerabilities.

---

For example, if a chat app needs login/signup, make sure to let only authenticated users establish WebSocket connections by validating a token before the HTTP handshake succeeds.

Using WSS instead of WS is programmatically simple. You need to use `wss` in the WebSocket connection URL in the React app:

```js
const WS_URL = 'wss://example.com';
```

Also, make sure to use the `https` module with digital certificates/keys as follows:

```js
const https = require('https');
const fs = require('fs');

const httpsOptions = {
  key: fs.readFileSync('./crypto/key.pem'),
  cert: fs.readFileSync('./crypto/certificate.pem')
};

const server = https.createServer(httpsOptions);
```

That’s all for enabling WSS from the programming perspective, but from the networking perspective, you have to generate cryptographic keys and certificates via a trusted Certificate Authority (CA).

---

## Using popular WebSocket libraries in React

Node.js doesn’t offer an inbuilt API to create WebSocket servers or client instances, so we should use a WebSocket library on Node.js. For example, we used the ws library in this tutorial.

The browser standard offers the built-in WebSocket API to connect with WebSocket servers, so selecting an external library is optional on the browser. Using libraries may improve your code readability on frontend frameworks and boost productivity as they come with pre-developed features.

For example, we used the React useWebSocket library with React to connect to the WebSocket server, writing less implementation code. React-use-websocket is a specialized Hook library that helps simplify WebSocket integration in [**React applications**](/blog.logrocket.com/9-ways-deploy-react-app-free.md).

It provides a simple way to establish WebSocket connections, manage their lifecycle, and handle real-time data exchange, all within a React component.

### When would you want to use use WebSocket library?

- When building a real-time application with React
- When you need simplified WebSocket state management
- When you want to share WebSocket connections across multiple components
- When you need built-in reconnection logic and connection status tracking

### Basic example of using react-use-websocket:

```jsx :collapsed-lines
import React from 'react';
import useWebSocket from 'react-use-websocket';

function WebSocketComponent() {
  const socketUrl = 'ws://127.0.0.1:8000';

  const {
    sendMessage,
    sendJsonMessage,
    lastMessage,
    lastJsonMessage,
    readyState,
    getWebSocket
  } = useWebSocket(socketUrl, {
    onOpen: () => console.log('WebSocket connection established'),
    onClose: () => console.log('WebSocket connection closed'),
    shouldReconnect: (closeEvent) => true, // Attempt to reconnect on all close events
    reconnectAttempts: 10,
    reconnectInterval: 3000
  });

  // Example of sending a message
  const handleSendMessage = () => {
    sendJsonMessage({ type: 'hello', content: 'Hello Server!' });
  };

  // Process incoming messages
  React.useEffect(() => {
    if (lastJsonMessage) {
      console.log('Received message:', lastJsonMessage);
    }
  }, [lastJsonMessage]);

  return (
    <div>
      <button onClick={handleSendMessage}>Send Message</button>
      <div>Last message: {lastMessage ? lastMessage.data : null}</div>
      <div>Connection status: {readyState}</div>
    </div>
  );
}
```

The library is available on npm at [<VPIcon icon="fa-brands fa-npm"/>`react-use-websocket`](https://npmjs.com/package/react-use-websocket) and has gained significant popularity for React WebSocket implementations with over 227,000 weekly downloads.

React useWebSocket is not the only library that lets you work with WebSockets in React. Choose a preferred WebSocket library for React from the following table based on the listed pros and cons:

<SiteInfo
  name="socketio/socket.io"
  desc="Realtime application framework (Node.JS server)."
  url="https://github.com/socketio/socket.io/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/2e4a17f686ecc8d68ed15c7252961cc02eaa7b266fac39dcb8d2a64eecf018c9/socketio/socket.io"/>

Bidirectional and low-latency communication for every platform

::: tabs

@tab:active Pros

Fallbacks to HTTP polling if WebSocket connections are not supported. Offers many inbuilt features, such as broadcasting, offline message queue, client namespaces, automatic re-connect logic, etc.

@tab Cons

Doesn’t offer React-specific APIs, so developers have to write connectivity, cleanup code with core React Hooks. App bundle size increment is higher than React itself

:::

<SiteInfo
  name="robtaussig/react-use-websocket"
  desc="React Hook for WebSocket communication."
  url="https://github.com/robtaussig/react-use-websocket/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/0dc30e552b349798cdc98a849afd0b64c537712e0f0867224a3bcf91f93065be/robtaussig/react-use-websocket"/>

React Hook for WebSocket communication

::: tabs

@tab:active Pros

Offers a pre-developed React hook with inbuilt React-specific features, such as auto re-render, using a shared WS object among components, etc. Supports Socket.IO connections and implements automatic re-connect logic. [<VPIcon icon="fas fa-globe"/>Lightweight](https://bundlephobia.com/package/react-use-websocket) compared to other libraries

@tab Cons

Doesn’t work inside React class components. Requires React 16.8 or higher. Doesn’t implement fallback transport methods

:::

<SiteInfo
  name="sockjs/sockjs-client"
  desc="WebSocket emulation - Javascript client."
  url="https://github.com/sockjs/sockjs-client/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/1789c62621f55a6cb56b57467cde00b824eea1095ebb0b8d3aa7fb5173bd41c9/sockjs/sockjs-client"/>

A JavaScript library for browser that provides a WebSocket-like object

::: tabs

@tab:active Pros

Fallbacks to HTTP polling if WebSocket connections are not supported. Offers a W3C WebSockets API-like interface

@tab Cons

Doesn’t offer React-specific APIs. App bundle size increment is higher than React itself

:::

<SiteInfo
  name="anephenix/sarus: A WebSocket JavaScript library"
  desc="A WebSocket JavaScript library. Contribute to anephenix/sarus development by creating an account on GitHub."
  url="https://github.com/anephenix/sarus/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/e4ac893611f44c763b0aa217c948a9ec8bad4ae5e8db212d05e7203ccc17bf4f/anephenix/sarus"/>

A minimal WebSocket library for the browser

::: tabs

@tab:active Pros

A minimal library that implements an offline message queue and re-connect logic. Offers a simple API that anyone can learn in seconds

@tab Cons

Doesn’t offer React-specific APIs. Doesn’t implement fallback transport methods

:::

::: note N.B.

Bundle size increments were calculated using the [BundlePhobia (<VPIcon icon="iconfont icon-github" />`pastelsky/bundlephobia`)](https://github.com/pastelsky/bundlephobia) npm package size calculator tool.

<SiteInfo
  name="pastelsky/bundlephobia"
  desc="🏋️ Find out the cost of adding a new frontend dependency to your project"
  url="https://github.com/pastelsky/bundlephobia/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/0cf0712c47554fc8ab98db2159ee19a8a15a5a3e392e18e1eb34706c89a86b37/pastelsky/bundlephobia"/>

:::

If your app doesn’t need a fallback transport method, selecting react-use-websocket is a good decision. You can also drop reactuse-WebSocket to make a more lightweight app bundle by using the native WebSocket browser API. Choose a library or use the native browser API according to your preference.

Note that [**Socket.IO**](/blog.logrocket.com/real-time-data-transfer-with-socket-io.md) and SockJS work as fully-featured bidirectional messaging frameworks that use WebSockets as the first transport method. They offer productive inbuilt features with fallback mechanisms, but they also increase your app bundle size. They want you to use a specific library for implementing the server (i.e., using the socket.io package for Node-based servers).

---

## When to use Socket.IO

When is it appropriate to use Socket.IO, and how does it differ from native WebSocket?

Socket.IO is quite a great choice for React apps, especially when you want features like chat or live updates without managing the messy parts yourself. As I mentioned earlier, it uses WebSocket underneath when possible, but then it adds its own protocol on top. This gives us extras like automatic reconnection, fallback support, and easy event handling, all of which fit nicely with React’s Hook-based structure.

Native WebSocket, on the other hand, is the raw, browser-standard option. It’s faster and lightweight, but it comes with more manual work, like handling reconnections and parsing messages. It’s your best option if you need full control.

---

## Conclusion

WebSockets are one of the most interesting and convenient ways to achieve real-time capabilities in a modern application. They give us a lot of flexibility to leverage full-duplex communications. I’d strongly suggest working with WebSocket using the native WebSocket API or other available libraries that use WebSocket as a transport method.

Happy coding! !🙂

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "React WebSocket tutorial: Real-time messaging with WebSockets and Socket.IO",
  "desc": "Learn how to build a real-time collaborative document editing app with a Node.js backend and React frontend using the WebSocket protocol.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/websocket-tutorial-socket-io.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
