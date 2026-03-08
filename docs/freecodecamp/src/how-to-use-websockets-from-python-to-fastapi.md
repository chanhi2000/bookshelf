---
lang: en-US
title: "How to Use WebSockets: From Python to FastAPI"
description: "Article(s) > How to Use WebSockets: From Python to FastAPI"
icon: iconfont icon-typescript
category:
  - Python
  - FastAPI
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
  - fastapi
  - py-fastapi
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Use WebSockets: From Python to FastAPI"
    - property: og:description
      content: "How to Use WebSockets: From Python to FastAPI"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-websockets-from-python-to-fastapi.html
prev: /programming/py-fastapi/articles/README.md
date: 2026-03-12
isOriginal: false
author:
  - name: Nneoma Uche
    url: https://freecodecamp.org/news/author/Nene23/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/8acb0854-7289-4794-8f97-242ec5d8ca61.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "FastAPI > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py-fastapi/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Use WebSockets: From Python to FastAPI"
  desc="Real-time data powers much of modern software: live stock prices, chat applications, sports scores, collaborative tools. And to build these systems, you'll need to understand how real-time communicati"
  url="https://freecodecamp.org/news/how-to-use-websockets-from-python-to-fastapi"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/8acb0854-7289-4794-8f97-242ec5d8ca61.png"/>

Real-time data powers much of modern software: live stock prices, chat applications, sports scores, collaborative tools. And to build these systems, you'll need to understand how real-time communication actually works—which isn’t always straightforward.

I ran into this firsthand while trying to build a live options dashboard. HTTP requests weren't going to cut it, and everything I was reading seemed overly complex until I went back to the basics. This article is the result of that process.

We'll cover Python's `websockets` library from scratch, then move into FastAPI, where many Python backends live. It's worth noting that WebSockets aren't the only solution for real-time communication. WebRTC may be a better fit depending on your use case, but understanding WebSockets is the right starting point before exploring further.

---

## WebSocket Connections and Methods

A WebSocket connection enables bi-directional communication between a client and a server. Once a connection is established, both sides can communicate freely without either having to ask first. This is different from a regular HTTP request, where the client always has to ask before the server can respond.

It looks something like this:

```plaintext
        CLIENT  <===== open connection =====>  SERVER
```

Note that a WebSocket URL is not a regular web page, so you can't "visit it" like a website. You need a client to talk to it.

Different frameworks provide different methods for handling WebSocket connections. With Python’s `websockets` library, for instance, a connection is automatically accepted the moment a client connects. With frameworks like FastAPI, you have to explicitly call `await websocket.accept()`, otherwise the connection gets rejected.

Let’s look at the core methods provided by Python’s `websockets` library:

1. `websockets.serve(...)`:  starts a WebSocket server.
2. `websockets.connect(...)`: connects to a WebSocket server.
3. `websockets.send(...)`: sends a message from either side.
4. `websockets.recv()`: receives a message from client or server.

`recv()` takes no arguments because it's purely a waiting operation. It waits for the next message and returns it:

```py
message = await websocket.recv()
```

---

## How to Build Your First WebSocket in Python

Before we dive into frameworks, let’s explore Python’s `websockets` library. You’ll set up a simple server and client, and exchange messages over a WebSocket connection, giving you a solid foundation for understanding WebSockets under the hood.

### Environment Setup

Run the following in your virtual environment to install or verify the WebSockets package:

```sh
pip install websockets
# or, to check if it's already installed:
pip show websockets
```

### Create the WebSocket Server

Create <VPIcon icon="fa-brands fa-python"/>`server.py` in your project folder, and paste this:

```py title="server.py"
import asyncio
import websockets

async def handler(connection):
    print("Client connected")

    message = await connection.recv()
    print("Received from client:", message)
    await connection.send("Hello client!")


async def main():
    async with websockets.serve(handler, "localhost", 8000):
        print("Server running at ws://localhost:8000")
        #await asyncio.Future()  # runs forever
        await asyncio.sleep(30)

asyncio.run(main())
```

When this line executes:

```py
async with websockets.serve(handler, "localhost", 8000):
```

The library opens a TCP socket on the specified host and port and waits for incoming clients. When one connects, it creates a connection object and passes it into your handler function.

The handler is required because it defines what the server does with each connection. The `host` and `port` arguments are also important. Both default to `None` – passing neither raises an error because the OS cannot bind a network server without a port.

You could pass `port=0` to let the OS assign a free port automatically, but then you'd need an extra step to figure out which port was chosen, so the client can connect:

```py
server.sockets[0].getsockname()
```

It’s simpler to specify both host and port explicitly, so the client knows exactly where the server is running.

### Set Up the Client

Create <VPIcon icon="fa-brands fa-python"/>`client.py` in the same folder and add this:

```py title="client.py"
import asyncio
import websockets

async def client():
    async with websockets.connect("ws://localhost:8000") as websocket:
        await websocket.send("Hello server!")
        response = await websocket.recv()
        print("Server replied:", response)

asyncio.run(client())
```

### Test the Connection

First, open a terminal and run <VPIcon icon="fa-brands fa-python"/>`server.py`. You should see:

```plaintext
Server running at ws://localhost:8000
```

In a second terminal, run <VPIcon icon="fa-brands fa-python"/>`client.py`. Messages should appear in both terminals confirming that the connection is active and both sides are communicating.

Note that the server must be running before you start the client – otherwise the client has nothing to connect to, and the connection will fail.

#### Keeping the server alive: a note on asyncio.Future()

In <VPIcon icon="fa-brands fa-python"/>`server.py`, there’s a line currently commented out:

```py title="server.py"
await asyncio.Future()
```

This keeps the server running indefinitely. For local development and testing however, `await asyncio.sleep(30)` is a simpler alternative. It keeps the server alive for a fixed period without running forever.

---

## File Transfer Over WebSockets

WebSockets aren't limited to text. They support raw bytes too, which means you can send files directly over the connection. Here’s how a client can send a file to a server over a WebSocket connection:

### Update <VPIcon icon="fa-brands fa-python"/>`server.py`

```py title="server.py"
async def file_handler(ws):
    print("Client connected, waiting for file...")
    file_bytes = await ws.recv()  # receive bytes
    with open("received_file.png", "wb") as f:
        f.write(file_bytes)
    print("File received and saved!")
    await ws.send("File received successfully!")

async def main():
    async with websockets.serve(file_handler, "localhost", 8000):
        print("Server running on ws://localhost:8000")
        await asyncio.sleep(50)  # keep server alive

asyncio.run(main())
```

The handler waits for incoming bytes with `await ws.recv()`; the `websockets` library automatically detects whether the incoming message is text or bytes, so no extra configuration is needed. Once received, the file is written to disk in binary mode (`"wb"`) and the server sends a confirmation message back to the client.

### Update <VPIcon icon="fa-brands fa-python"/>`client.py`

```py title="client.py"
import asyncio
import websockets

async def send_file():
    uri = "ws://localhost:8000"
    async with websockets.connect(uri) as ws:
        with open("portfolio-image.png", "rb") as f:  #open file in binary mode
            file_bytes = f.read()
        await ws.send(file_bytes)  # send bytes
        response = await ws.recv()
        print("Server response:", response)

asyncio.run(send_file())
```

The client opens the image in binary mode (`"rb"`), reads the entire file into memory as bytes, and sends it in a single `ws.send()` call. It then waits for the server's confirmation before closing the connection.

### Test it

Add an image to your project folder and make sure the filename in <VPIcon icon="fa-brands fa-python"/>`client.py` matches. Run <VPIcon icon="fa-brands fa-python"/>`server.py` first, then <VPIcon icon="fa-brands fa-python"/>`client.py` in a second terminal.

Once the transfer completes, the server saves the file as <VPIcon icon="fas fa-file-image"/>`received_file.png` in the same directory. You should see it appear in your workspace immediately.

This approach loads the entire file into memory before sending. For large files, it’s better to read and send them in chunks. But this is the easiest way to understand WebSocket byte transfer.

---

## How to Connect to an External WebSocket

So far you've been connecting to servers you built yourself. But WebSocket clients can also connect to public servers. For example, a client can connect to Postman’s echo server:

```py title="client.py"
import asyncio
import websockets

async def connect_external():
    uri = "wss://ws.postman-echo.com/raw"  # public WebSocket server
    async with websockets.connect(uri) as ws:
        print("Connected to external server!")

        # Send a message
        await ws.send("Hello external server!")
        print("Message sent")

        # Receive response
        response = await ws.recv()
        print("Received from server:", response)
asyncio.run(connect_external())
```

Notice the client connects to Postman’s echo server using the `wss://` URI scheme instead of `ws://`. This indicates the connection is encrypted using TLS, similar to how `https://` secures regular web requests.

An echo server returns exactly what you send it. So "Hello external server!" comes straight back as the response. It's a useful sandbox for testing your client-side WebSocket code without needing your own server.

---

## WebSockets in FastAPI

FastAPI provides a WebSocket object (via Starlette under the hood) to manage real-time connections. You can define WebSocket endpoints just like HTTP routes, while Uvicorn handles the event loop – no manual asyncio server management needed. This makes FastAPI a natural fit for real-time projects, from chat apps to live dashboards and data feeds.

Before jumping into code, here's a quick reference of the core methods you'll be working with.

**Accepting:**

- `await websocket.accept()`: the `accept()` method must be called first, before anything else. Skip it and the connection gets rejected.

**Sending:**

- `await websocket.send_text(data)`: sends a string.
- `await websocket.send_bytes(data)`: sends binary data.
- `await websocket.send_json(data)`: serializes and sends JSON.

**Receiving:**

- `await websocket.receive_text()`: waits for a text message.
- `await websocket.receive_bytes()`: waits for binary data.
- `await websocket.receive_json()`: receives and deserializes JSON.
- `async for msg in websocket.iter_text()`: iterates over incoming messages, exits cleanly on disconnect.

**Closing:**

- `await websocket.close(code=1000)`: standard code for a normal closure. It accepts an optional “reason” argument.

Here's what the WebSocket lifecycle looks like in FastAPI:

![WebSocket in FastAPI](https://cdn.hashnode.com/uploads/covers/6426acfa5bc738c37852b5bd/b61b6b25-e027-47a1-8efc-b921e93b8521.png)

### Building a Simple Echo Server with FastAPI

As you saw with the Postman example, an echo server sends back the message a client provides. Let's build one with FastAPI.

#### 1. Install FastAPI

```py
pip install "fastapi[standard]"
```

#### 2. Update <VPIcon icon="fa-brands fa-python"/>`server.py`

```py title="server.py"
from fastapi import FastAPI, WebSocket

app = FastAPI()

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    data = await websocket.receive_text()
   
    await websocket.send_text(f"You said: {data}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
```

A few things to note here compared to the plain `websockets` library:

- WebSocket endpoints are defined with `@app.websocket("/ws")` just like an HTTP route.
- `await websocket.accept()` is required before anything else. FastAPI won't accept connections without it.
- Uvicorn handles the event loop and server startup for you via the `if name == "__main__"` block. No `asyncio.run()` or `asyncio.Future()` needed.

#### 3. Update client.py:

```py
async def test_client():
    uri = "ws://127.0.0.1:8000/ws"
    async with websockets.connect(uri) as ws:
        await ws.send("Hello FastAPI server!")
        response = await ws.recv()
        print("Server replied:", response)

asyncio.run(test_client())
```

Since the FastAPI server isn't secured with TLS, the client URI uses `ws://` instead of `wss://`. Make sure to match the host and port from your server code.

#### 4. Interact with the echo server:

Start <VPIcon icon="fa-brands fa-python"/>`server.py`, then run <VPIcon icon="fa-brands fa-python"/>`client.py` in another terminal. The server terminal should show the echoed message.

![](https://cdn.hashnode.com/uploads/covers/6426acfa5bc738c37852b5bd/88629d79-eb91-4af5-9752-f9596ff5e5a4.png)

---

## How to Handle WebSocket Disconnections in FastAPI

Clients will inevitably disconnect in real-time applications, sometimes intentionally, sometimes unexpectedly. If not handled properly, this can crash your server or leave it in a broken state.

The `WebSocketDisconnect` exception in FastAPI is raised whenever a client unexpectedly closes the connection, allowing the server to handle disconnects gracefully, log the event, and clean up resources without crashing.

Here’s an example:

```py
@app.websocket("/ws")
async def websocket_endpoint(ws: WebSocket):
    await ws.accept()
    try:
        while True:
            data = await ws.receive_text()
   
            if "bye" in data or "quit" in data:
                await ws.send_text("Closing connection")
                await ws.close(code=1000, reason="Server requested close")  
                break
            await ws.send_text(f"I got your request: {data}")
    except WebSocketDisconnect:
        print("Client disconnected")  # connection already closed
```

The server runs a continuous loop waiting for messages. If the client message contains "bye" or "quit", the server responds, calls `await ws.close(code=1000)`, and breaks out of the loop cleanly.

But if the client disconnects unexpectedly, `WebSocketDisconnect` is caught by the except block and the server moves on without crashing. At this point the connection is already closed on the client side, so calling `ws.close()` inside the except block is unnecessary.

---

## Conclusion

WebSockets make real-time communication possible by keeping a persistent connection open between client and server. Starting with Python’s `websockets` library helps clarify how the protocol works under the hood, while frameworks like FastAPI provide the structure needed for production applications.

The parts that trip most people up early on are `asyncio` and FastAPI's explicit `websocket.accept()`. With `asyncio`, the question is usually why it's needed and why the server dies instantly without something keeping it alive. And it's easy to ignore `websocket.accept()` if you're coming from the plain `websockets library` where that happens automatically. Once those click, everything else follows naturally.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Use WebSockets: From Python to FastAPI",
  "desc": "Real-time data powers much of modern software: live stock prices, chat applications, sports scores, collaborative tools. And to build these systems, you'll need to understand how real-time communicati",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-websockets-from-python-to-fastapi.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
