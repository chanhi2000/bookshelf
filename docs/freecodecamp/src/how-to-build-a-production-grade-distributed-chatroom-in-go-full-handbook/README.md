---
lang: en-US
title: "How to Build a Production-Grade Distributed Chatroom in Go [Full Handbook]"
description: "Article(s) > How to Build a Production-Grade Distributed Chatroom in Go [Full Handbook]"
icon: fa-brands fa-golang
category:
  - Go
  - DevOps
  - Dockers
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - go
  - golang
  - devops
  - docker
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build a Production-Grade Distributed Chatroom in Go [Full Handbook]"
    - property: og:description
      content: "How to Build a Production-Grade Distributed Chatroom in Go [Full Handbook]"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-production-grade-distributed-chatroom-in-go-full-handbook.html
prev: /programming/go/articles/README.md
date: 2026-02-14
isOriginal: false
author:
  - name: Destiny Erhabor
    url: https://freecodecamp.org/news/author/CaesarSage/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1770999686180/3bccee22-e7e9-477f-8a5f-50800896e972.png
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
  "title": "Docker > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/docker/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build a Production-Grade Distributed Chatroom in Go [Full Handbook]"
  desc="If you've ever wondered how chat applications like Slack, Discord, or WhatsApp work behind the scenes, this tutorial will show you. You'll build a real-time chat server from scratch using Go, learning the fundamental concepts that power modern commun..."
  url="https://freecodecamp.org/news/how-to-build-a-production-grade-distributed-chatroom-in-go-full-handbook"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1770999686180/3bccee22-e7e9-477f-8a5f-50800896e972.png"/>

If you've ever wondered how chat applications like Slack, Discord, or WhatsApp work behind the scenes, this tutorial will show you. You'll build a real-time chat server from scratch using Go, learning the fundamental concepts that power modern communication systems.

By the end of this guide, you'll have built a working chatroom that supports unlimited concurrent users chatting in real-time, message persistence that survives server crashes, session management so users can reconnect after network interruptions, private messaging between users, and graceful handling of slow or disconnected clients.

More importantly, you'll understand the fundamental concepts behind distributed systems. You'll learn concurrent programming with goroutines and channels, TCP socket programming for network communication, write-ahead logging for data durability, state management with mutexes, and how to design systems that degrade gracefully under failure. These concepts power everything from databases to message queues to web servers.

::: info

The complete source code for this project is available on [GitHub (<VPIcon icon="iconfont icon-github"/>`Caesarsage/distributed-system`)](https://github.com/Caesarsage/distributed-system/tree/main/chatroom-with-broadcast) if you'd like to reference it while following along.

<SiteInfo
  name="distributed-system/chatroom-with-broadcast at main · Caesarsage/distributed-system"
  desc="Distributed system implementations and paper references - Caesarsage/distributed-system"
  url="https://github.com/Caesarsage/distributed-system/tree/main/chatroom-with-broadcast/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/6af8cf71382272431ca22c7931c1adcc57b8ad3708ef2c36c5fea0b948f9ffbe/Caesarsage/distributed-system"/>

:::

---

## What is a Distributed Chatroom?

A chatroom is a server that lets multiple users connect simultaneously and exchange messages in real-time. When we say "production-grade," we mean it includes features you'd expect in a real application: it persists data so messages aren't lost when the server restarts, it handles network failures gracefully, and it can support many concurrent users without slowing down.

The "distributed" aspect refers to how the system manages multiple clients connecting from different locations, all trying to send and receive messages at the same time. This introduces interesting challenges: how do you ensure everyone sees messages in the same order? How do you handle clients with slow internet connections? What happens when someone disconnects unexpectedly?

These aren't just theoretical problems. Every networked application deals with concurrency, state management, and failure handling. Whether you're building a chat app, a multiplayer game, a collaborative editor, or a trading platform, you'll face similar challenges. The patterns you'll learn here apply broadly across distributed systems.

Chat applications are excellent learning projects because they combine several challenging problems in one place. You need to manage concurrent connections safely, broadcast messages to multiple clients without blocking, handle unreliable networks, persist data durably, and ensure the system recovers gracefully from crashes. Each of these topics could be its own tutorial, but here you'll see how they work together in a real application.

---

## What You'll Learn

This tutorial demonstrates several important concepts that are fundamental to building distributed systems. Here's what you'll learn:

### 1. TCP Socket Programming in Go

You'll learn how to accept incoming TCP connections, read and write data over network sockets, and handle connection failures gracefully. These skills are essential for any networked application, from web servers to database clients.

### 2. Concurrent Programming with Goroutines and Channels

Go's concurrency model is one of its strongest features. You'll see how to use goroutines to handle multiple clients simultaneously without blocking. You'll use channels to coordinate between goroutines safely, avoiding the common pitfalls of shared memory concurrency like race conditions and deadlocks.

### 3. State Management in Distributed Systems

Managing shared state across concurrent operations is tricky. You'll learn when to use mutexes versus channels, how to design lock granularity to avoid bottlenecks, and how to ensure data consistency when multiple goroutines access the same data.

### 4. Write-Ahead Logging (WAL) for Durability

Databases use WAL to ensure data isn't lost during crashes. You'll implement the same pattern, learning how to balance durability with performance. You'll see why fsync is critical, understand the trade-offs of different persistence strategies, and learn how to recover state after unexpected shutdowns.

### 5. Session Management and Reconnection

Networks are unreliable. Users disconnect, WiFi drops, mobile connections switch towers. You'll build a token-based session system that lets users reconnect seamlessly, preserving their chat history and identity without requiring passwords or complex authentication.

### 6. Graceful Degradation and Fault Tolerance

Perfect reliability is impossible, so you need to design for partial failures. You'll learn how to prevent slow clients from affecting fast ones, how to continue operating when persistence fails, and how to clean up resources properly when things go wrong.

::: note Prerequisites

To get the most out of this tutorial, you should have some foundational knowledge. You don't need to be an expert, but you should be comfortable with the basics.

- Go basics (goroutines, channels, interfaces)
- TCP/IP networking fundamentals
- Basic concurrency concepts
- File I/O operations

:::

---

## Tutorial Overview

This tutorial takes you through building a production-ready chatroom step by step.

You'll start by exploring the overall architecture to understand how components fit together. Then you'll learn about core concepts like concurrency models and persistence strategies.

Next, you'll set up your project structure and define the core data types that represent clients, messages, and the chatroom. Then you'll implement the server initialization and event loop, which is where all coordination happens.

After that, you'll build the networking layer to handle client connections, implement message broadcasting so messages reach all users, and add persistence using write-ahead logging and snapshots.

You'll then implement session management for reconnection, build a command system for user actions, and create a simple client application to test your server.

Finally, you’ll learn how to test and deploy your chatroom, and review key lessons from building a distributed system.

By the end, you'll have a complete, working chatroom and understand how distributed systems handle concurrency, persistence, and failure recovery.

---

## Table of Contents

5. [Architecture Overview](#heading-architecture-overview)
6. [Core Concepts You Need to Know](#heading-core-concepts-you-need-to-know)
7. [How to Set Up the Project Structure](#heading-how-to-set-up-the-project-structure)
8. [How to Define Core Data Types](#heading-how-to-define-core-data-types)
9. [How to Initialize the Server](#heading-how-to-initialize-the-server)
10. [How to Build the Event Loop](#heading-how-to-build-the-event-loop)
11. [How to Handle Client Connections](#heading-how-to-handle-client-connections)
12. [How to Implement Message Broadcasting](#heading-how-to-implement-message-broadcasting)
13. [How to Add Persistence with WAL and Snapshots](#heading-how-to-add-persistence-with-wal-and-snapshots)
14. [How to Implement Session Management](#heading-how-to-implement-session-management)
15. [How to Build the Command System](#heading-how-to-build-the-command-system)
16. [How to Create the Client](#heading-how-to-create-the-client)
17. [How to Test Your Chatroom](#heading-how-to-test-your-chatroom)
18. [How to Deploy Your Server](#heading-how-to-deploy-your-server)
19. [Enhancements You Can Add](#heading-enhancements-you-can-add)

---

## Architecture Overview

The system follows a client-server architecture with internal components that work together to provide a robust chat experience.

### High-Level Architecture

![Chatroom broadcast architecture diagram](https://cdn.hashnode.com/res/hashnode/image/upload/v1770347113467/2ca609e9-c902-4311-a571-e9c3b1280786.jpeg)

### Component Breakdown

#### 1. Network Layer

- **TCP Listener**: Accepts incoming connections on port 9000
- **Connection Handler**: Manages individual client connections with dedicated goroutines
- **Protocol**: Simple newline-delimited text protocol

#### 2. Client Management

Each client connection spawns two goroutines:

- **Read Goroutine**: Receives messages from client
- **Write Goroutine**: Sends messages to client (non-blocking with buffered channels)

#### 3. ChatRoom Core

This is the heart of the system – a single goroutine running an event loop:

```go
for {
    select {
        case client := <-cr.join:
            // Handle new client
        case client := <-cr.leave:
            // Handle disconnection
        case message := <-cr.broadcast:
            // Broadcast to all clients
        case client := <-cr.listUsers:
            // Send user list
        case dm := <-cr.directMessage:
            // Handle private message
    }
}
```

#### 4. State Management

We have three synchronized data structures:

- `clients map[*Client]bool`: Active connections (mutex-protected)
- `sessions map[string]*SessionInfo`: User sessions for reconnection
- `messages []Message`: In-memory message history

#### 5. Persistence Layer

Two-tier approach:

- **Write-Ahead Log (WAL)**: Immediate append-only log for durability
- **Snapshots**: Periodic full state dumps for faster recovery

#### 6. Session Management

This enables reconnection with token-based authentication:

- Generates unique tokens per user
- 1-hour session timeout
- Preserves chat history for returning users

### Message Flow

Here's how a message travels through the system:

```sh
User Input → Client Read → Server Receive → Broadcast Channel 
    → ChatRoom Loop → Persist to WAL → Fan-out to All Clients
    → Client Write Goroutines → TCP Send → User Display
```
<!-- TODO: mermaid화-->

The broadcast channel acts as a synchronization point, ensuring total message ordering.

---

## Core Concepts You Need to Know

### Understanding the Concurrency Model

This chatroom uses Go's CSP (Communicating Sequential Processes) model. This is a fundamentally different approach to concurrency than you might be used to from other languages.

In traditional concurrent programming, you protect shared memory with locks (mutexes). Multiple threads access the same data structure, and you use locks to ensure only one thread modifies it at a time. This works, but it's error-prone. Forget a lock, and you have a race condition. Hold locks too long, and you have deadlocks.

Go encourages a different approach: instead of communicating by sharing memory, you share memory by communicating. You pass data between goroutines through channels. Only one goroutine owns the data at a time, eliminating many concurrency bugs by design.

Channels provide several advantages. They eliminate most race conditions by design, because if only one goroutine owns the data at a time, there's no race to access it. They provide natural flow control since channels can block when full (back pressure) or block when empty (waiting for data). They make it easier to reason about message flow because you can trace how data moves through your system by following the channels. And they offer better composability since you can combine channels with select statements to coordinate multiple operations.

That said, we’ll still use mutexes in this project. Channels aren't always the right tool. We’ll use mutexes when multiple goroutines need quick, frequent access to shared data structures like maps. And we’ll use channels when we want to coordinate behavior or transfer ownership of data.

Here's how the chatroom uses channels to coordinate everything:

```go
type ChatRoom struct {
    join          chan *Client        // New connections
    leave         chan *Client        // Disconnections
    broadcast     chan string         // Messages to all
    listUsers     chan *Client        // User list requests
    directMessage chan DirectMessage  // Private messages

    // Shared state (mutex-protected)
    clients    map[*Client]bool
    mu         sync.Mutex

    // Message history (separate mutex)
    messages   []Message
    messageMu  sync.Mutex
}
```

Notice that we have five channels for different types of events. The main event loop receives from all these channels using a select statement. This means all state changes happen sequentially in one place, making the system much easier to reason about.

We could have used one channel that accepts different message types, but separate channels make the code clearer. When you send to `chatRoom.join`, it's obvious what you're doing. When you send to `chatRoom.broadcast`, same thing.

The mutexes protect data that many goroutines read frequently. The `clients` map needs to be accessed every time we broadcast a message. Using a mutex for quick read access is more efficient than passing the entire map through a channel.

### Understanding the Persistence Strategy

When your server crashes (and it will eventually), you need to recover the chat history. Users expect their messages to be there when the server restarts. But persistence is expensive: writing to disk is thousands of times slower than writing to memory. So you need a strategy that balances durability with performance.

We’ll use a two-tier approach that's similar to what real databases use: WAL (Write-ahead log) and snapshots.

The WAL is your primary durability mechanism. Here's how it works: every message is immediately appended to a file called <VPIcon icon="iconfont icon-code"/>`messages.wal`. This file is append-only, which means we only write to the end. Append-only writes are fast because the disk doesn't need to seek to different locations.

Each message is written as a single line of JSON. After writing each message, we call `fsync`. This tells the operating system to actually write the data to the physical disk right now, not just buffer it in memory. Without fsync, the OS might lose your data if the power fails before it gets around to writing.

The WAL is append-only and never modified. This makes it very reliable. If the server crashes mid-write, the worst case is one corrupted line at the end, which we can detect and skip during recovery.

The problem with a write-ahead log is that it grows forever. If you have a million messages, you need to replay a million log entries every time you restart the server. That's slow.

Snapshots solve this problem. Every 5 minutes, if there are more than 100 new messages, we write the entire message history to a separate file called <VPIcon icon="iconfont icon-json"/>`snapshot.json`. This is the complete state of the chat at that moment.

After creating a snapshot, we truncate (empty) the WAL. New messages continue to append to the WAL, but now we only need to replay messages since the last snapshot.

When the server starts, it first loads the snapshot file (if it exists). This gives us the state from the last snapshot, which might be 100,000 messages. Loading this takes about 100ms. Then it replays all entries from the WAL. This gives us messages written since the last snapshot, which might be only 50 messages. Replaying this takes milliseconds. Finally, it resumes normal operation.

Total recovery time is a few hundred milliseconds instead of several minutes.

This two-tier system gives us the best of both worlds: fast writes during normal operation with the append-only WAL, fast recovery after crashes with snapshot plus small WAL replay, guaranteed durability through fsync after every message, and bounded recovery time because the WAL never grows too large.

The trade-off is that snapshots use more disk space temporarily since you have both the snapshot and the WAL. But disk space is cheap, and correctness is expensive.

Now that you understand the key concepts behind the chatroom's design, it's time to start building. You'll begin by setting up your project structure and creating the necessary directories and files.

---

## How to Set Up the Project Structure

First, create the directory structure for your project. You will create their files as we walk through the tutorial:

```sh
mkdir -p chatroom-with-broadcast/cmd/server
mkdir -p chatroom-with-broadcast/cmd/client
mkdir -p chatroom-with-broadcast/internal/chatroom
mkdir -p chatroom-with-broadcast/pkg/token
mkdir -p chatroom-with-broadcast/chatdata
cd chatroom-with-broadcast
```

![Chatroom project structure](https://cdn.hashnode.com/res/hashnode/image/upload/v1770347289299/82f067a8-2cd0-49f0-8338-a002846e618b.png)

Then initialize the Go module.

Note that you’ll need Go 1.23.2 or later installed on your machine. Earlier versions might work, but the code examples assume features available in Go 1.23 and above. This version includes improvements to the standard library that make concurrent programming more efficient.

```sh
go mod init github.com/yourusername/chatroom
```

Your `go.mod` file should look like this:

```mod title="go.mod"
module github.com/yourusername/chatroom

go 1.23.2
```

With your project structure in place, you're ready to start writing code. The first step is defining the data types that will represent the core components of your chatroom: messages, clients, and the chatroom itself.

---

## How to Define Core Data Types

Create a new file <VPIcon icon="fas fa-folder-open"/>`internal/chatroom/`<VPIcon icon="fa-brands fa-golang"/>`types.go` to define your core data structures. These types form the foundation of your chatroom, so it's important to understand what each one represents and why it's designed the way it is.

```go :collapsed-lines title="internal/chatroom/types.go"
package chatroom

import (
    "net"
    "os"
    "sync"
    "time"
)

// Message represents a single chat message with metadata
type Message struct {
    ID        int       `json:"id"`
    From      string    `json:"from"`
    Content   string    `json:"content"`
    Timestamp time.Time `json:"timestamp"`
    Channel   string    `json:"channel"` // "global" or "private:username"
}

// Client represents a connected user
type Client struct {
    conn         net.Conn      // TCP connection
    username     string        // Display name
    outgoing     chan string   // Buffered channel for writes
    lastActive   time.Time     // For idle detection
    messagesSent int           // Statistics
    messagesRecv int
    isSlowClient bool          // Testing flag

    reconnectToken string
    mu             sync.Mutex   // Protects stats fields
}

// ChatRoom is the central coordinator
type ChatRoom struct {
    // Communication channels
    join          chan *Client
    leave         chan *Client
    broadcast     chan string
    listUsers     chan *Client
    directMessage chan DirectMessage

    // State
    clients       map[*Client]bool
    mu            sync.Mutex
    totalMessages int
    startTime     time.Time

    // Message history
    messages      []Message
    messageMu     sync.Mutex
    nextMessageID int

    // Persistence
    walFile       *os.File
    walMu         sync.Mutex
    dataDir       string

    // Sessions
    sessions      map[string]*SessionInfo
    sessionsMu    sync.Mutex
}

// SessionInfo tracks reconnection data
type SessionInfo struct {
    Username       string
    ReconnectToken string
    LastSeen       time.Time
    CreatedAt      time.Time
}

// DirectMessage represents a private message
type DirectMessage struct {
    toClient *Client
    message  string
}
```

#### Understanding the Message Type

The `Message` struct stores everything we need to know about a chat message. The `ID` field uniquely identifies each message and ensures messages stay in order. The `Timestamp` lets us show when messages were sent, which is important for chat history.

The `Channel` field is interesting. Right now, we only use "global" for public messages, but this design lets us add private channels or chat rooms later without changing the data structure. Good data structures anticipate future needs.

#### Understanding the Client Type

Each connected user is represented by a `Client` struct. The `conn` field is their TCP connection – this is how we send and receive data.

The `outgoing` channel is crucial for performance. Notice it's a `chan string`, which means it's a channel of strings. We'll make this a buffered channel (size 10). This buffer means we can queue up 10 messages for this client without blocking. If a client is slow to read, we can keep sending to other clients.

Without this buffer, one slow client would block the entire broadcast. With the buffer, slow clients just miss messages if they can't keep up, which is much better than slowing everyone down.

The `lastActive` timestamp helps us detect idle users. If someone hasn't sent a message in 5 minutes, we can disconnect them to free up resources.

The `mu` mutex protects the statistics fields. Multiple goroutines will update `messagesSent` and `messagesRecv`, so we need a mutex to prevent race conditions.

#### Understanding the ChatRoom Type

This is the heart of the system. Notice that we have two kinds of fields: channels and protected state.

The five channels (`join`, `leave`, `broadcast`, `listUsers`, `directMessage`) are how different parts of the system communicate with the main event loop. When a new client connects, we send them to the `join` channel. When someone sends a message, it goes to the `broadcast` channel.

These channels are unbuffered (capacity 0) because we want synchronization. When you send to an unbuffered channel, you block until someone receives. This ensures the event loop processes events in order.

The protected state (maps and slices) needs mutexes because multiple goroutines access it. Notice that we use separate mutexes for different data. The `mu` mutex protects the `clients` map. The `messageMu` mutex protects the `messages` slice. The `sessionsMu` mutex protects the `sessions` map.

Why separate mutexes? Performance. If we used one mutex for everything, broadcasting a message would lock all the data, preventing new clients from joining. Separate mutexes mean different operations can happen concurrently.

The WAL file (`walFile`) also has its own mutex (`walMu`) because writing to disk is slow. We don't want to hold the main mutex while waiting for disk I/O.

With your data types defined, the next step is creating a function to initialize the server. This function will set up all your data structures, restore any persisted state from previous runs, and start background workers.

---

## How to Initialize the Server

Server initialization is critical because you need to set up all your data structures in the right order. If you restore state after opening the WAL, you might replay messages twice. If you start accepting connections before loading history, users won't see old messages.

Create a file <VPIcon icon="fas fa-folder-open"/>`internal/chatroom/`<VPIcon icon="fa-brands fa-golang"/>`run.go` to bootstrap the server:

```go :collapsed-lines title="internal/chatroom/run.go"
package chatroom

import (
    "fmt"
    "net"
    "time"
)

func NewChatRoom(dataDir string) (*ChatRoom, error) {
    cr := &ChatRoom{
        clients:       make(map[*Client]bool),
        join:          make(chan *Client),
        leave:         make(chan *Client),
        broadcast:     make(chan string),
        listUsers:     make(chan *Client),
        directMessage: make(chan DirectMessage),
        sessions:      make(map[string]*SessionInfo),
        messages:      make([]Message, 0),
        startTime:     time.Now(),
        dataDir:       dataDir,
    }

    // Restore from snapshot if available
    if err := cr.loadSnapshot(); err != nil {
        fmt.Printf("Failed to load snapshot: %v\n", err)
    }

    // Initialize WAL for new messages
    if err := cr.initializePersistence(); err != nil {
        return nil, err
    }

    // Start background snapshot worker
    go cr.periodicSnapshots()

    return cr, nil
}

func (cr *ChatRoom) periodicSnapshots() {
    ticker := time.NewTicker(5 * time.Minute)
    defer ticker.Stop()

    for range ticker.C {
        cr.messageMu.Lock()
        messageCount := len(cr.messages)
        cr.messageMu.Unlock()

        if messageCount > 100 {
            if err := cr.createSnapshot(); err != nil {
                fmt.Printf("Snapshot failed: %v\n", err)
            }
        }
    }
}
```

Let's break down what happens during initialization:

#### 1. Creating Data Structures

We start by creating all the maps and channels. The `make` function initializes these properly. For maps, this creates an empty map ready to use. For channels, this creates an unbuffered channel (capacity 0).

Notice we create the `messages` slice with initial capacity 0 but room to grow: `make([]Message, 0)`. This is more efficient than starting with `nil` because the slice is ready to append immediately without allocation.

#### 2. Loading the Snapshot

Before we accept any connections, we try to load a snapshot from disk. This restores the chat history from the last time the server ran. If the snapshot doesn't exist (first run) or fails to load (corrupted file), we just continue with an empty history.

This step must happen before initializing the WAL. If we opened the WAL first, we might replay messages that are already in the snapshot, creating duplicates.

#### 3. Initializing the WAL

The `initializePersistence()` function opens the WAL file in append mode. It also replays any entries in the WAL that happened after the last snapshot. This ensures we don't lose any messages that were written to the WAL but not yet included in a snapshot.

If this step fails, we return an error and refuse to start. Why? Because if we can't write to the WAL, we can't guarantee durability. It's better to refuse to start than to lie to users by accepting messages we can't persist.

#### 4. Starting Background Workers

The `periodicSnapshots()` function runs in a separate goroutine. It wakes up every 5 minutes and checks if we need to create a snapshot. Notice the `defer ticker.Stop()` – this is important. If we forget to stop the ticker, it leaks a goroutine and wastes resources.

The goroutine acquires the `messageMu` lock just to read the message count, then releases it immediately. We don't hold the lock during the snapshot creation because that's slow and would block message broadcasting.

#### Why 5 Minutes and 100 Messages?

These are tunable parameters. 5 minutes means recovery never needs to replay more than 5 minutes of messages. 100 messages means we don't create snapshots too frequently during quiet periods.

In a production system, you might make these configurable. A high-traffic chat might want shorter intervals. A low-traffic chat might want longer intervals to reduce disk I/O.

Now that your server is initialized with all the necessary data structures and background workers, you need to build the core coordination mechanism. The event loop is where all state changes happen in your chatroom. It's the heartbeat that keeps everything synchronized.

---

## How to Build the Event Loop

The event loop is the heart of your chatroom. Every client connection, message, and disconnection flows through this single point. This might seem like it could be a bottleneck, but it's actually what makes the system simple and safe.

The `Run()` method is the server's heartbeat. This is where all the magic happens. Every event in the system flows through this loop. Add this to <VPIcon icon="fa-brands fa-golang"/>`run.go`:

```go title="run.go"
func (cr *ChatRoom) Run() {
    fmt.Println("ChatRoom heartbeat started...")
    go cr.cleanupInactiveClients()

    for {
        select {
        case client := <-cr.join:
            cr.handleJoin(client)

        case client := <-cr.leave:
            cr.handleLeave(client)

        case message := <-cr.broadcast:
            cr.handleBroadcast(message)

        case client := <-cr.listUsers:
            cr.sendUserList(client)

        case dm := <-cr.directMessage:
            cr.handleDirectMessage(dm)
        }
    }
}
```

#### Understanding the Select Statement

The `select` statement is one of Go's most powerful concurrency features. It's like a switch statement for channels. The select waits until one of its cases can proceed, then it executes that case.

Here's what happens: The loop blocks on the select statement, waiting for data on any of the five channels. When data arrives on any channel, that case executes. After the case completes, the loop goes back to waiting.

For example, when a new client connects, code elsewhere in your program sends that client to `cr.join`. The select receives it and executes `cr.handleJoin(client)`. Once that finishes, the loop goes back to waiting.

#### Why Use a Single Event Loop?

This might seem like a bottleneck. You have one goroutine processing all events sequentially. Why not process events in parallel?

The answer is consistency. Here's what you gain from sequential processing:

##### 1. No Race Conditions on State

Only one goroutine modifies the `clients` map, the `messages` slice, and the `sessions` map. You never need to worry about two operations interfering with each other. When you add a client in `handleJoin`, you know for certain that no other code is simultaneously removing clients or broadcasting messages.

This is incredibly powerful. Most bugs in concurrent systems come from unexpected interleaving of operations. By processing events sequentially, you eliminate an entire class of bugs.

##### 2. Total Ordering of Events

Messages are broadcast in the order they arrive. This seems obvious, but it's important. If Alice sends "Hello" and then Bob sends "Hi", you can guarantee everyone sees them in that order. With parallel processing, you'd need additional synchronization to maintain ordering.

##### 3. Simple State Transitions

You can reason about your system state as a series of transitions. "After this join event, the client is in the map. After this leave event, the client is removed." You don't need to worry about concurrent state changes making your reasoning invalid.

##### 4. Easy to Debug

When something goes wrong, you can add logging to the event loop and see exactly what sequence of events led to the problem. With parallel processing, the order of events depends on thread scheduling, making bugs hard to reproduce.

#### Is This Actually a Bottleneck?

You might worry that sequential processing limits performance. In practice, it's fine for this workload. Here's why:

The handlers are fast. They do simple things like adding to a map, removing from a map, or forwarding a message to channels. These operations take microseconds. The event loop can process thousands of events per second.

The slow operations (writing to disk, sending to client connections) happen in other goroutines. The event loop doesn't wait for them. It just sends data to a channel or adds work to a queue, then immediately moves to the next event.

If you needed higher throughput, you could shard your chat into multiple rooms, each with its own event loop. But for a single chatroom, sequential processing is both simpler and fast enough.

#### Understanding the Cleanup Worker

Notice the line `go cr.cleanupInactiveClients()` before the loop. This starts a background goroutine that periodically checks for idle clients.

Why not include this in the event loop? Because it's time-based, not event-based. The cleanup worker wakes up every 30 seconds and sends disconnect events for idle clients. These events flow through the normal event loop, maintaining our single-threaded state mutation property.

Now add the `runServer()` function and shutdown handler:

```go :collapsed-lines
import (
    "os"
    "os/signal"
    "syscall"
)

func runServer() {
    chatRoom, err := NewChatRoom("./chatdata")
    if err != nil {
        fmt.Printf("Failed to initialize: %v\n", err)
        return
    }
    defer chatRoom.shutdown()

    // Set up signal handling for graceful shutdown
    sigChan := make(chan os.Signal, 1)
    signal.Notify(sigChan, syscall.SIGINT, syscall.SIGTERM)

    go func() {
        <-sigChan
        fmt.Println("\nReceived shutdown signal")
        chatRoom.shutdown()
        os.Exit(0)
    }()

    go chatRoom.Run()

    listener, err := net.Listen("tcp", ":9000")
    if err != nil {
        fmt.Println("Error starting server:", err)
        return
    }
    defer listener.Close()

    fmt.Println("Server started on :9000")

    for {
        conn, err := listener.Accept()
        if err != nil {
            fmt.Println("Error accepting connection:", err)
            continue
        }
        fmt.Println("New connection from:", conn.RemoteAddr())
        go handleClient(conn, chatRoom)
    }
}

func (cr *ChatRoom) shutdown() {
    fmt.Println("\nShutting down...")
    if err := cr.createSnapshot(); err != nil {
        fmt.Printf("Final snapshot failed: %v\n", err)
    }
    if cr.walFile != nil {
        cr.walFile.Close()
    }
    fmt.Println("Shutdown complete")
}
```

::: info The `runServer()` function ties everything together:

1. Create the chatroom with `NewChatRoom()`
2. Defer the shutdown function so it runs when the function exits
3. Start the event loop in a separate goroutine with `go chatRoom.Run()`
4. Listen for TCP connections on port 9000
5. For each connection, spawn a goroutine with `go handleClient()`

:::

The defer statement is important. No matter how the function exits (normal return, panic, error), the shutdown function runs. This ensures we create a final snapshot and close the WAL file cleanly.

The signal handling goroutine listens for SIGINT (<kbd>Ctrl</kbd>+<kbd>C</kbd>) or SIGTERM (system shutdown). When it receives one, it calls `shutdown()` and exits gracefully. This means when you press <kbd>Ctrl</kbd>+<kbd>C</kbd>, the server saves its state before stopping.

With your event loop running and listening for connections, the next step is handling what happens when a client actually connects. This involves reading their username, creating a session, and setting up the communication channels.

---

## How to Handle Client Connections

When a client connects to your server, several things need to happen: you need to establish the TCP connection, prompt for a username, create a Client object to represent them, start goroutines to read and write messages, and handle both normal disconnections and unexpected failures.

Create a file <VPIcon icon="fas fa-folder-open"/>`internal/chatroom/`<VPIcon icon="fa-brands fa-golang"/>`io.go` for managing client connections. When a client connects, `handleClient()` manages the entire lifecycle:

```go :collapsed-lines title="internal/chatroom/io.go"
package chatroom

import (
    "bufio"
    "fmt"
    "math/rand"
    "net"
    "strings"
    "time"
)

func handleClient(conn net.Conn, chatRoom *ChatRoom) {
    defer func() {
        if r := recover(); r != nil {
            fmt.Printf("Panic in handleClient: %v\n", r)
        }
        conn.Close()
    }()

    // Set initial timeout for username entry
    conn.SetReadDeadline(time.Now().Add(30 * time.Second))

    reader := bufio.NewReader(conn)

    // Prompt for username or reconnection
    conn.Write([]byte("Enter username (or 'reconnect:<username>:<token>'): \n"))

    input, err := reader.ReadString('\n')
    if err != nil {
        fmt.Println("Failed to read username:", err)
        return
    }
    input = strings.TrimSpace(input)

    var username string
    var reconnectToken string
    var isReconnecting bool

    // Parse reconnection attempt
    if strings.HasPrefix(input, "reconnect:") {
        parts := strings.Split(input, ":")
        if len(parts) == 3 {
            username = parts[1]
            reconnectToken = parts[2]
            isReconnecting = true
        } else {
            conn.Write([]byte("Invalid format. Use: reconnect:<username>:<token>\n"))
            return
        }
    } else {
        username = input
    }

    // Generate guest name if empty
    if username == "" {
        username = fmt.Sprintf("Guest%d", rand.Intn(1000))
    }

    // Validate reconnection or check for duplicate
    if isReconnecting {
        if chatRoom.validateReconnectToken(username, reconnectToken) {
            fmt.Printf("%s reconnected successfully\n", username)
            conn.Write([]byte(fmt.Sprintf("Welcome back, %s!\n", username)))
        } else {
            conn.Write([]byte("Invalid token or session expired.\n"))
            return
        }
    } else {
        // Prevent duplicate logins
        if chatRoom.isUsernameConnected(username) {
            conn.Write([]byte("Username already connected. Use reconnect if you lost connection.\n"))
            return
        }

        // Create or retrieve session
        chatRoom.sessionsMu.Lock()
        existingSession := chatRoom.sessions[username]
        chatRoom.sessionsMu.Unlock()

        if existingSession != nil {
            token := existingSession.ReconnectToken
            msg := fmt.Sprintf("Tip: Save this token: %s\n", token)
            msg += fmt.Sprintf("To reconnect: reconnect:%s:%s\n", username, token)
            conn.Write([]byte(msg))
        } else {
            session := chatRoom.createSession(username)
            token := session.ReconnectToken
            msg := fmt.Sprintf("Your token: %s\n", token)
            msg += fmt.Sprintf("To reconnect: reconnect:%s:%s\n", username, token)
            conn.Write([]byte(msg))
        }
    }

    // Create client object
    client := &Client{
        conn:           conn,
        username:       username,
        outgoing:       make(chan string, 10), // Buffered
        lastActive:     time.Now(),
        reconnectToken: reconnectToken,
        isSlowClient:   rand.Float64() < 0.1, // 10% chance for testing
    }

    // Clear timeout for normal operation
    conn.SetReadDeadline(time.Time{})

    // Notify chatroom
    chatRoom.join <- client

    // Send welcome message
    welcomeMsg := buildWelcomeMessage(username)
    conn.Write([]byte(welcomeMsg))

    // Start read/write loops
    go readMessages(client, chatRoom)
    writeMessages(client) // Blocks until disconnect

    // Update session on disconnect
    chatRoom.updateSessionActivity(username)
    chatRoom.leave <- client
}

func buildWelcomeMessage(username string) string {
    msg := fmt.Sprintf("Welcome, %s!\n", username)
    msg += "Commands:\n"
    msg += "  /users - List all users\n"
    msg += "  /history [N] - Show last N messages\n"
    msg += "  /msg <user> <msg> - Private message\n"
    msg += "  /token - Show your reconnect token\n"
    msg += "  /stats - Show your stats\n"
    msg += "  /quit - Leave\n"
    return msg
}
```

The initial 30-second timeout prevents connection exhaustion by disconnecting clients who don't enter a username quickly. The buffered `outgoing` channel prevents slow clients from blocking the broadcaster. Token-based reconnection lets users resume their session without complex authentication. The dual goroutine design means reading and writing happen independently, so a slow write doesn't block incoming messages.

### How to Read Messages from Clients

Add the `readMessages()` goroutine to handles all incoming data:

```go :collapsed-lines
func readMessages(client *Client, chatRoom *ChatRoom) {
    defer func() {
        if r := recover(); r != nil {
            fmt.Printf("Panic in readMessages for %s: %v\n", client.username, r)
        }
    }()

    reader := bufio.NewReader(client.conn)

    for {
        // Set 5-minute idle timeout
        client.conn.SetReadDeadline(time.Now().Add(5 * time.Minute))

        message, err := reader.ReadString('\n')
        if err != nil {
            if netErr, ok := err.(net.Error); ok && netErr.Timeout() {
                fmt.Printf("%s timed out\n", client.username)
            } else {
                fmt.Printf("%s disconnected: %v\n", client.username, err)
            }
            return
        }

        client.markActive() // Update activity timestamp

        message = strings.TrimSpace(message)
        if message == "" {
            continue
        }

        client.mu.Lock()
        client.messagesRecv++
        client.mu.Unlock()

        // Process commands vs. regular messages
        if strings.HasPrefix(message, "/") {
            handleCommand(client, chatRoom, message)
            continue
        }

        // Regular message - format and broadcast
        formatted := fmt.Sprintf("[%s]: %s\n", client.username, message)
        chatRoom.broadcast <- formatted
    }
}
```

5 minutes of idle time triggers auto-disconnect. This prevents zombie connections from consuming resources.

### How to Write Messages to Clients

Add the `writeMessages()` function to drain the client's `outgoing` channel:

```go
func writeMessages(client *Client) {
    defer func() {
        if r := recover(); r != nil {
            fmt.Printf("Panic in writeMessages for %s: %v\n", client.username, r)
        }
    }()

    writer := bufio.NewWriter(client.conn)

    for message := range client.outgoing {
        // Simulate slow client (testing mode)
        if client.isSlowClient {
            time.Sleep(time.Duration(rand.Intn(500)) * time.Millisecond)
        }

        _, err := writer.WriteString(message)
        if err != nil {
            fmt.Printf("Write error for %s: %v\n", client.username, err)
            return
        }

        err = writer.Flush()
        if err != nil {
            fmt.Printf("Flush error for %s: %v\n", client.username, err)
            return
        }
    }
}
```

Real-world clients have varying network speeds. A client with a slow internet connection shouldn't block message delivery to other users. This is a fundamental challenge in any system that broadcasts to multiple recipients.

To handle this, we use two techniques. First, the `outgoing` channel is buffered with a size of 10. This means the system can queue up 10 messages for a client without blocking. If a client temporarily slows down (maybe they're loading a large webpage in another tab), the buffer absorbs the slowdown.

Second, when broadcasting messages (which you'll see in the next section), we use non-blocking sends. If a client's buffer is full because they're consistently too slow, we skip sending to them rather than blocking everyone else. The slow client misses some messages, but everyone else continues normally. This is called graceful degradation: the system continues working even when parts of it have problems.

With client connections handled, the next step is implementing the core feature of any chat system: broadcasting messages to all connected users. Broadcasting means taking one message and sending it to many recipients efficiently and safely.

---

## How to Implement Message Broadcasting

Broadcasting is the heart of a chat application. When one user sends a message, it needs to reach everyone else instantly. But this is trickier than it sounds because you need to persist the message for durability, send it to clients at different speeds without blocking, and maintain message ordering across all clients.

Create <VPIcon icon="fas fa-folder-open"/>`internal/chatroom/`<VPIcon icon="fa-brands fa-golang"/>`handlers.go` to handle events.

The `handleBroadcast()` method is where messages reach all users:

```go :collapsed-lines title="internal/chatroom/handlers.go"
package chatroom

import (
    "fmt"
    "strings"
    "time"
)

func (cr *ChatRoom) handleBroadcast(message string) {
    // Parse message metadata
    parts := strings.SplitN(message, ": ", 2)
    from := "system"
    actualContent := message

    if len(parts) == 2 {
        from = strings.Trim(parts[0], "[]")
        actualContent = parts[1]
    }

    // Create persistent message record
    cr.messageMu.Lock()
    msg := Message{
        ID:        cr.nextMessageID,
        From:      from,
        Content:   actualContent,
        Timestamp: time.Now(),
        Channel:   "global",
    }
    cr.nextMessageID++
    cr.messages = append(cr.messages, msg)
    cr.messageMu.Unlock()

    // Persist to WAL
    if err := cr.persistMessage(msg); err != nil {
        fmt.Printf("Failed to persist: %v\n", err)
        // Continue anyway - availability over consistency
    }

    // Collect current clients
    cr.mu.Lock()
    clients := make([]*Client, 0, len(cr.clients))
    for client := range cr.clients {
        clients = append(clients, client)
    }
    cr.totalMessages++
    cr.mu.Unlock()

    fmt.Printf("Broadcasting to %d clients: %s", len(clients), message)

    // Fan-out to all clients
    for _, client := range clients {
        select {
        case client.outgoing <- message:
            client.mu.Lock()
            client.messagesSent++
            client.mu.Unlock()
        default:
            fmt.Printf("Skipped %s (channel full)\n", client.username)
        }
    }
}
```

#### Consistency Trade-off:

If a WAL write fails, you still broadcast the message. Why? Because availability is more important than perfect consistency for a chat application. Users get their messages immediately, and you can handle WAL repair manually if needed.

### How to Handle Join and Leave Events

Add these handlers to <VPIcon icon="fa-brands fa-golang"/>`handlers.go`:

```go :collapsed-lines title="internal/chatroom/handlers.go"
func (cr *ChatRoom) handleJoin(client *Client) {
    cr.mu.Lock()
    cr.clients[client] = true
    cr.mu.Unlock()

    client.markActive()

    fmt.Printf("%s joined (total: %d)\n", client.username, len(cr.clients))

    cr.sendHistory(client, 10)

    announcement := fmt.Sprintf("*** %s joined the chat ***\n", client.username)
    cr.handleBroadcast(announcement)
}

func (cr *ChatRoom) handleLeave(client *Client) {
    cr.mu.Lock()
    if !cr.clients[client] {
        cr.mu.Unlock()
        return
    }
    delete(cr.clients, client)
    cr.mu.Unlock()

    fmt.Printf("%s left (total: %d)\n", client.username, len(cr.clients))

    // Close channel safely
    select {
    case <-client.outgoing:
        // Already closed
    default:
        close(client.outgoing)
    }

    announcement := fmt.Sprintf("*** %s left the chat ***\n", client.username)
    cr.handleBroadcast(announcement)
}
```

The `handleJoin` function adds the client to the active clients map, marks them as active for idle tracking, sends them the last 10 messages so they can see recent conversation, and broadcasts an announcement so everyone knows they joined.

The `handleLeave` function removes the client from the map, closes their outgoing channel safely (the select checks if it's already closed to avoid a panic), and broadcasts a departure announcement.

### How to Send User Lists and History

Add these helper functions to <VPIcon icon="fa-brands fa-golang"/>`handlers.go`:

```go :collapsed-lines title="internal/chatroom/handlers.go"
func (cr *ChatRoom) sendHistory(client *Client, count int) {
    cr.messageMu.Lock()
    defer cr.messageMu.Unlock()

    start := len(cr.messages) - count
    if start < 0 {
        start = 0
    }

    historyMsg := "Recent messages:\n"
    for i := start; i < len(cr.messages); i++ {
        msg := cr.messages[i]
        historyMsg += fmt.Sprintf(" [%s]: %s\n", msg.From, msg.Content)
    }

    select {
    case client.outgoing <- historyMsg:
    default:
    }
}

func (cr *ChatRoom) sendUserList(client *Client) {
    cr.mu.Lock()
    defer cr.mu.Unlock()

    list := "Users online:\n"
    for c := range cr.clients {
        status := ""
        if c.isInactive(1 * time.Minute) {
            status = " (idle)"
        }
        list += fmt.Sprintf("  - %s%s\n", c.username, status)
    }

    list += fmt.Sprintf("\nTotal messages: %d\n", cr.totalMessages)
    list += fmt.Sprintf("Uptime: %s\n", time.Since(cr.startTime).Round(time.Second))

    select {
    case client.outgoing <- list:
    default:
    }
}

func (cr *ChatRoom) handleDirectMessage(dm DirectMessage) {
    select {
    case dm.toClient.outgoing <- dm.message:
        dm.toClient.mu.Lock()
        dm.toClient.messagesSent++
        dm.toClient.mu.Unlock()
    default:
        fmt.Printf("Couldn't deliver DM to %s\n", dm.toClient.username)
    }
}

func (cr *ChatRoom) findClientByUsername(username string) *Client {
    cr.mu.Lock()
    defer cr.mu.Unlock()

    for client := range cr.clients {
        if client.username == username {
            return client
        }
    }
    return nil
}

func (c *Client) markActive() {
    c.mu.Lock()
    defer c.mu.Unlock()
    c.lastActive = time.Now()
}

func (c *Client) isInactive(timeout time.Duration) bool {
    c.mu.Lock()
    defer c.mu.Unlock()
    return time.Since(c.lastActive) > timeout
}
```

You now have a working chat system where clients can connect and exchange messages.

But there's a critical problem: if the server crashes or restarts, all messages are lost. The next step is adding persistence so messages survive failures.

---

## How to Add Persistence with WAL and Snapshots

Persistence ensures your chat history survives server crashes and restarts. Without it, users would lose all their conversations every time the server goes down.

You'll implement this using two complementary mechanisms: a write-ahead log for immediate durability and snapshots for fast recovery.

Create <VPIcon icon="fas fa-folder-open"/>`internal/chatroom/`<VPIcon icon="fa-brands fa-golang"/>`persistence.go` to handle data durability.

The WAL ensures messages survive crashes:

```go :collapsed-lines title="internal/chatroom/persistence.go"
package chatroom

import (
    "bufio"
    "encoding/json"
    "fmt"
    "io"
    "os"
    "path/filepath"
)

func (cr *ChatRoom) initializePersistence() error {
    if err := os.MkdirAll(cr.dataDir, 0755); err != nil {
        return fmt.Errorf("create data dir: %w", err)
    }

    walPath := filepath.Join(cr.dataDir, "messages.wal")

    if err := cr.recoverFromWAL(walPath); err != nil {
        fmt.Printf("Recovery failed: %v\n", err)
    }

    file, err := os.OpenFile(walPath, os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
    if err != nil {
        return fmt.Errorf("open wal: %w", err)
    }

    cr.walFile = file
    fmt.Printf("WAL initialized: %s\n", walPath)
    return nil
}

func (cr *ChatRoom) recoverFromWAL(walPath string) error {
    file, err := os.Open(walPath)
    if err != nil {
        if os.IsNotExist(err) {
            fmt.Println("No WAL found (fresh start)")
            return nil
        }
        return err
    }
    defer file.Close()

    scanner := bufio.NewScanner(file)
    recovered := 0

    for scanner.Scan() {
        line := scanner.Text()
        if line == "" {
            continue
        }

        var msg Message
        if err := json.Unmarshal([]byte(line), &msg); err != nil {
            fmt.Printf("Skipping corrupt line: %s\n", line)
            continue
        }

        cr.messages = append(cr.messages, msg)

        if msg.ID >= cr.nextMessageID {
            cr.nextMessageID = msg.ID + 1
        }
        recovered++
    }

    fmt.Printf("Recovered %d messages\n", recovered)
    return nil
}

func (cr *ChatRoom) persistMessage(msg Message) error {
    cr.walMu.Lock()
    defer cr.walMu.Unlock()

    data, err := json.Marshal(msg)
    if err != nil {
        return err
    }

    _, err = cr.walFile.Write(append(data, '\n'))
    if err != nil {
        return err
    }

    return cr.walFile.Sync()
}
```

Each line is a JSON-encoded message:

```json
{"id":1,"from":"Alice","content":"Hello world","timestamp":"2024-02-06T10:00:00Z","channel":"global"}
{"id":2,"from":"Bob","content":"Hi Alice!","timestamp":"2024-02-06T10:00:05Z","channel":"global"}
```

The `Sync()` call is critical for durability. Without it, the OS might buffer writes in memory, losing them on a crash. The trade-off is that `Sync()` is expensive (about 1-10ms per call). Production systems might batch multiple messages to improve throughput.

### How to Create and Load Snapshots

Add snapshot functionality to <VPIcon icon="fa-brands fa-golang"/>`persistence.go`:

```go :collapsed-lines title="internal/chatroom/persistence.go"
func (cr *ChatRoom) createSnapshot() error {
    snapshotPath := filepath.Join(cr.dataDir, "snapshot.json")
    tempPath := snapshotPath + ".tmp"

    file, err := os.Create(tempPath)
    if err != nil {
        return err
    }
    defer file.Close()

    cr.messageMu.Lock()
    data, err := json.MarshalIndent(cr.messages, "", "  ")
    cr.messageMu.Unlock()

    if err != nil {
        return err
    }

    if _, err := file.Write(data); err != nil {
        return err
    }

    if err := file.Sync(); err != nil {
        return err
    }

    file.Close()

    if err := os.Rename(tempPath, snapshotPath); err != nil {
        return err
    }

    fmt.Printf("Snapshot created (%d messages)\n", len(cr.messages))
    return cr.truncateWAL()
}

func (cr *ChatRoom) truncateWAL() error {
    cr.walMu.Lock()
    defer cr.walMu.Unlock()

    if cr.walFile != nil {
        cr.walFile.Close()
    }

    walPath := filepath.Join(cr.dataDir, "messages.wal")
    file, err := os.OpenFile(walPath, os.O_TRUNC|os.O_CREATE|os.O_WRONLY, 0644)
    if err != nil {
        return err
    }
    cr.walFile = file
    fmt.Println("WAL truncated")
    return nil
}

func (cr *ChatRoom) loadSnapshot() error {
    snapshotPath := filepath.Join(cr.dataDir, "snapshot.json")
    file, err := os.Open(snapshotPath)
    if err != nil {
        if os.IsNotExist(err) {
            return nil
        }
        return err
    }
    defer file.Close()

    data, err := io.ReadAll(file)
    if err != nil {
        return err
    }

    cr.messageMu.Lock()
    err = json.Unmarshal(data, &cr.messages)
    cr.messageMu.Unlock()

    if err != nil {
        return err
    }

    for _, msg := range cr.messages {
        if msg.ID >= cr.nextMessageID {
            cr.nextMessageID = msg.ID + 1
        }
    }

    fmt.Printf("Loaded %d messages from snapshot\n", len(cr.messages))
    return nil
}
```

Writing to `.tmp` then renaming ensures you never have a half-written snapshot. Even if power fails mid-write, the old snapshot remains valid.

#### Recovery Flow

When the server starts, it first loads the snapshot if it exists, which might contain 100K messages and takes about 100ms. Then it replays WAL entries written since the snapshot, which might be only recent messages. Total recovery time is seconds instead of minutes.

With persistence in place, your messages are safe. But network connections are unreliable. Users get disconnected when their WiFi drops, their phone switches towers, or their laptop goes to sleep. The next step is implementing session management so users can reconnect without losing their identity or chat history.

---

## How to Implement Session Management

Session management lets users reconnect to your server after network interruptions without needing to create a new account or re-enter credentials. You'll implement this using cryptographically secure tokens that persist across connections.

Create <VPIcon icon="fas fa-folder-open"/>`internal/chatroom/`<VPIcon icon="fa-brands fa-golang"/>`session.go` for reconnection handling.

```go :collapsed-lines title="internal/chatroom/session.go"
package chatroom

import (
    "fmt"
    "time"

    "github.com/yourusername/chatroom/pkg/token"
)

func (cr *ChatRoom) createSession(username string) *SessionInfo {
    cr.sessionsMu.Lock()
    defer cr.sessionsMu.Unlock()

    tok := token.GenerateToken()

    session := &SessionInfo{
        Username:       username,
        ReconnectToken: tok,
        LastSeen:       time.Now(),
        CreatedAt:      time.Now(),
    }

    cr.sessions[username] = session

    fmt.Printf("Created session for %s (token: %s...)\n", username, tok[:8])

    return session
}

func (cr *ChatRoom) validateReconnectToken(username, token string) bool {
    cr.sessionsMu.Lock()
    defer cr.sessionsMu.Unlock()

    session, exists := cr.sessions[username]
    if !exists {
        return false
    }

    if session.ReconnectToken != token {
        return false
    }

    if time.Since(session.LastSeen) > 1*time.Hour {
        delete(cr.sessions, username)
        return false
    }

    session.LastSeen = time.Now()

    return true
}

func (cr *ChatRoom) updateSessionActivity(username string) {
    cr.sessionsMu.Lock()
    defer cr.sessionsMu.Unlock()

    if session, exists := cr.sessions[username]; exists {
        session.LastSeen = time.Now()
    }
}

func (cr *ChatRoom) isUsernameConnected(username string) bool {
    cr.mu.Lock()
    defer cr.mu.Unlock()

    for client := range cr.clients {
        if client.username == username {
            return true
        }
    }

    return false
}

func (cr *ChatRoom) cleanupInactiveClients() {
    ticker := time.NewTicker(30 * time.Second)
    defer ticker.Stop()

    for range ticker.C {
        cr.mu.Lock()
        var toRemove []*Client

        for client := range cr.clients {
            if client.isInactive(5 * time.Minute) {
                fmt.Printf("Removing inactive: %s\n", client.username)
                toRemove = append(toRemove, client)
            }
        }
        cr.mu.Unlock()

        for _, client := range toRemove {
            cr.leave <- client
        }
    }
}
```

### How to Generate Secure Tokens

Create `pkg/token/token.go` for token generation:

```go
package token

import (
    "crypto/rand"
    "encoding/hex"
)

// GenerateToken returns a secure random 16-byte hex token
func GenerateToken() string {
    b := make([]byte, 16)
    _, _ = rand.Read(b)
    return hex.EncodeToString(b)
}
```

Tokens here are transmitted in plaintext over TCP. For production use, you should use TLS encryption to protect tokens in transit, hash tokens before storage so a database breach doesn't expose them, and implement rate limiting on reconnection attempts to prevent brute force attacks.

Your chatroom now supports basic messaging and reconnection. But users need ways to interact with the system beyond just sending messages. The command system provides features like listing users, viewing history, and sending private messages.

---

## How to Build the Command System

Commands are messages that start with a forward slash and perform special actions instead of being broadcast to everyone. This is a pattern used by many chat applications like Slack and Discord. You'll implement several useful commands that enhance the user experience.

Add command handling to <VPIcon icon="fa-brands fa-golang"/>`io.go`:

```go :collapsed-lines title="internal/chatroom/io.go"
func handleCommand(client *Client, chatRoom *ChatRoom, command string) {
    parts := strings.Fields(command)
    if len(parts) == 0 {
        return
    }

    switch parts[0] {
    case "/users":
        chatRoom.listUsers <- client

    case "/stats":
        client.mu.Lock()
        stats := fmt.Sprintf("Your Stats:\n")
        stats += fmt.Sprintf("  Messages sent: %d\n", client.messagesSent)
        stats += fmt.Sprintf("  Messages received: %d\n", client.messagesRecv)
        stats += fmt.Sprintf("  Last active: %s ago\n", 
            time.Since(client.lastActive).Round(time.Second))
        client.mu.Unlock()

        select {
        case client.outgoing <- stats:
        default:
        }

    case "/msg":
        if len(parts) < 3 {
            select {
            case client.outgoing <- "Usage: /msg <username> <message>\n":
            default:
            }
            return
        }

        targetUsername := parts[1]
        messageText := strings.Join(parts[2:], " ")

        targetClient := chatRoom.findClientByUsername(targetUsername)
        if targetClient == nil {
            select {
            case client.outgoing <- fmt.Sprintf("User '%s' not found\n", targetUsername):
            default:
            }
            return
        }

        privateMsg := fmt.Sprintf("[From %s]: %s\n", client.username, messageText)
        select {
        case targetClient.outgoing <- privateMsg:
        default:
            select {
            case client.outgoing <- fmt.Sprintf("%s's inbox is full\n", targetUsername):
            default:
            }
            return
        }

        select {
        case client.outgoing <- fmt.Sprintf("Message sent to %s\n", targetUsername):
        default:
        }

    case "/history":
        count := 20
        if len(parts) > 1 {
            fmt.Sscanf(parts[1], "%d", &count)
        }
        if count > 100 {
            count = 100
        }
        cr.sendHistory(client, count)

    case "/token":
        chatRoom.sessionsMu.Lock()
        session := chatRoom.sessions[client.username]
        chatRoom.sessionsMu.Unlock()

        if session != nil {
            msg := fmt.Sprintf("Your reconnect token:\n")
            msg += fmt.Sprintf("   reconnect:%s:%s\n", client.username, session.ReconnectToken)
            select {
            case client.outgoing <- msg:
            default:
            }
        }

    case "/quit":
        announcement := fmt.Sprintf("%s left the chat\n", client.username)
        chatRoom.broadcast <- announcement

        select {
        case client.outgoing <- "Goodbye!\n":
        default:
        }

        time.Sleep(100 * time.Millisecond)
        client.conn.Close()

    default:
        select {
        case client.outgoing <- fmt.Sprintf("Unknown: %s\n", parts[0]):
        default:
        }
    }
}
```

Your server is now complete with all the core features: connection handling, message broadcasting, persistence, session management, and commands. But to actually use your chatroom, you need a client application. The client is much simpler than the server because it just needs to connect and relay messages.

---

## How to Create the Client

The client application provides the user interface for your chatroom. It connects to the server, displays incoming messages, and sends outgoing messages typed by the user. While the server is complex with many concurrent components, the client is straightforward

Create <VPIcon icon="fas fa-folder-open"/>`internal/chatroom/`<VPIcon icon="fa-brands fa-golang"/>`client.go` for the client implementation.

```go :collapsed-lines title="internal/chatroom/client.go"
package chatroom

import (
    "bufio"
    "fmt"
    "net"
    "os"
    "strings"
)

func StartClient() {
    conn, err := net.Dial("tcp", ":9000")
    if err != nil {
        fmt.Println("Error connecting:", err)
        return
    }
    defer conn.Close()

    fmt.Println("Connected to chat server")

    // Background goroutine: read from server
    go func() {
        reader := bufio.NewReader(conn)
        for {
            message, err := reader.ReadString('\n')
            if err != nil {
                fmt.Println("Disconnected from server.")
                os.Exit(0)
            }
            // Clear current prompt line and print message
            fmt.Print("\r" + message)
            fmt.Print(">> ")
        }
    }()

    // Main goroutine: read from stdin
    inputReader := bufio.NewReader(os.Stdin)
    fmt.Println("Welcome to the chat server!")

    for {
        fmt.Print(">> ")
        message, _ := inputReader.ReadString('\n')
        message = strings.TrimSpace(message)

        if message == "" {
            continue
        }

        conn.Write([]byte(message + "\n"))
    }
}
```

#### How the Client Works:

The client uses two goroutines to handle communication simultaneously. The main goroutine reads from stdin (your keyboard) and sends messages to the server. When you type a message and press Enter, it gets sent over the TCP connection immediately.

The background goroutine continuously reads from the server. Whenever a message arrives, it prints it to your screen. The `\r` (carriage return) clears the current `>>` prompt before printing the message, so new messages don't appear on the same line as your input. After printing the message, it reprints the prompt so you can continue typing.

This dual-goroutine design means you can receive messages while typing. If someone sends a message while you're in the middle of typing yours, their message appears immediately and your prompt reappears below it.

The `defer conn.Close()` ensures the connection is properly closed when the function exits. If the server disconnects, the read goroutine gets an error and calls `os.Exit(0)` to terminate the entire client program gracefully.

### How to Create Entry Points

Create <VPIcon icon="fas fa-folder-open"/>`cmd/server/`<VPIcon icon="fa-brands fa-golang"/>`main.go`:

```go title="cmd/server/main.go"
package main

import (
    "fmt"
    "os"

    "github.com/yourusername/chatroom/internal/chatroom"
)

func main() {
    fmt.Println("Starting server from cmd/server...")
    chatroom.StartServer()
    os.Exit(0)
}
```

Create `cmd/client/main.go`:

```go
package main

import (
    "fmt"
    "github.com/yourusername/chatroom/internal/chatroom"
)

func main() {
    fmt.Println("Starting client from cmd/client...")
    chatroom.StartClient()
}
```

Add a wrapper function in <VPIcon icon="fas fa-folder-open"/>`internal/chatroom/`<VPIcon icon="fa-brands fa-golang"/>`server.go`:

```go title="internal/chatroom/server.go"
package chatroom

func StartServer() {
    runServer()
}
```

With all your entry points created, your chatroom is complete and ready to test. The next step is learning how to test your implementation to ensure everything works correctly.

---

## How to Test Your Chatroom

Testing a concurrent system like a chatroom requires a different approach than testing typical sequential code. You need to verify that goroutines coordinate correctly, messages arrive in the right order, and the system handles edge cases like disconnections.

### How to Write Unit Tests

Unit tests verify individual components in isolation. For your chatroom, the most important test is verifying that messages broadcast correctly to all connected clients.

Create <VPIcon icon="fas fa-folder-open"/>`internal/chatroom/`<VPIcon icon="fa-brands fa-golang"/>`chatroom_test.go`:

```go :collapsed-lines title="internal/chatroom/chatroom_test.go"
package chatroom

import (
    "testing"
    "strings"
    "time"
)

func TestBroadcast(t *testing.T) {
    cr, _ := NewChatRoom("./testdata")
    defer cr.shutdown()

    go cr.Run()

    // Create mock clients
    client1 := &Client{
        username: "Alice",
        outgoing: make(chan string, 10),
    }
    client2 := &Client{
        username: "Bob",
        outgoing: make(chan string, 10),
    }

    // Join clients
    cr.join <- client1
    cr.join <- client2
    time.Sleep(100 * time.Millisecond)

    // Broadcast message
    cr.broadcast <- "[Alice]: Hello!"

    // Verify both receive it
    select {
    case msg := <-client1.outgoing:
        if !strings.Contains(msg, "Hello!") {
            t.Fatal("Client1 didn't receive correct message")
        }
    case <-time.After(1 * time.Second):
        t.Fatal("Client1 didn't receive message")
    }

    select {
    case msg := <-client2.outgoing:
        if !strings.Contains(msg, "Hello!") {
            t.Fatal("Client2 didn't receive correct message")
        }
    case <-time.After(1 * time.Second):
        t.Fatal("Client2 didn't receive message")
    }
}
```

#### Understanding the Test

This test creates a chatroom instance and starts its event loop with `go cr.Run()`. Then it creates two mock clients. Notice these aren't real TCP connections – they're just Client structs with outgoing channels. This lets you test the broadcast logic without needing actual network connections.

The test sends both clients to the join channel, waits 100 milliseconds for them to be processed, then broadcasts a message. The `select` statements with timeout are crucial. They try to receive from each client's outgoing channel, but if nothing arrives within 1 second, the test fails. This prevents the test from hanging forever if something goes wrong.

The `time.Sleep(100 * time.Millisecond)` gives the event loop time to process the join events before broadcasting. In a real system, you'd use channels to synchronize, but for tests, a small sleep is acceptable.

Run tests with:

```sh
go test ./internal/chatroom -v
```

The `-v` flag shows verbose output, printing each test as it runs. You'll see whether the broadcast test passes and how long it took. Below is the output showing that the test passed:

![Chatroom unit test](https://cdn.hashnode.com/res/hashnode/image/upload/v1770480869735/1102c089-1d10-43fc-bd7f-5571283213a0.png)

### How to Do Integration Testing

Integration tests verify the entire system working together – the real server, real clients, and real network connections. Unlike unit tests that mock components, integration tests exercise the full stack.

Test the full client-server flow:

```sh
# Terminal 1: Start server
go run cmd/server/main.go

# Terminal 2: Client 1
go run cmd/client/main.go
# Enter username: Alice

# Terminal 3: Client 2  
go run cmd/client/main.go
# Enter username: Bob

# Terminal 4: Client 3  
go run cmd/client/main.go
# Enter username: John

# Test messaging between clients
```

#### What to Test

Once you have the server running and multiple clients connected, you can verify all the features you built. Here's what a complete test session looks like:

1. **Basic Messaging**: Send a message from Alice and verify Bob and John both receive it. You should see the message appear in all client windows with the sender's username in brackets. Try sending from each client to verify the broadcast works in all direction
2. **Join and Leave Announcements**: When a new client connects, all existing clients should see a "joined the chat" announcement. When someone disconnects (either with `/quit` or by closing their terminal), everyone should see a "left the chat" message. This confirms your join and leave handlers work correctl
3. **Private Messaging**: Use `/msg Bob this is a private message` from Alice's client. The message should appear only in Bob's window, not in John's or Alice's. Try sending private messages between different pairs of users to verify the routing works correctly. The sender should receive a confirmation that the message was sen
4. **User List**: Run `/users` from any client. You should see a list of all connected users. If someone has been idle for over a minute, they should show an "(idle)" status. The command should also display total message count and server uptim
5. **Chat History**: New clients should automatically receive the last 10 messages when they join. You can also use `/history 20` to request the last 20 messages. This verifies your message persistence is workin
6. **Session Reconnection**: From one client, use `/token` to get your reconnection token. It will look something like `reconnect:Alice:338f04ca...`. Copy this token, disconnect the client with <kbd>Ctrl</kbd>+<kbd>C</kbd>, start a new client, and paste the reconnection string when prompted. You should rejoin the chat with your previous identity, and other users won't see duplicate join announcement
7. **Statistics**: Use `/stats` to see how many messages you've sent and received, and when you were last active. This verifies the client-side statistics tracking work
8. **Error Handling**: Try connecting with a username that's already in use – you should be rejected. Try sending a private message to a non-existent user – you should get an error. Try using an invalid reconnection token – you should be denied. These tests verify your validation logic work

Look at the server terminal to see the server's perspective. You'll see connection logs, broadcast confirmations, and any errors. When clients disconnect, you should see their sessions being updated. When the server creates snapshots, you'll see those logged, too.

Integration testing catches problems that unit tests miss, like network timeouts, message ordering issues across multiple clients, or problems with how the WAL file is created and locked. The screenshot below shows a successful integration test with three clients (Alice, Bob, and John) all communicating successfully, with private messages, public broadcasts, and proper join/leave handling.

![chatroom broadcast test](https://cdn.hashnode.com/res/hashnode/image/upload/v1770348441963/d66bb2da-088b-4b9c-95a2-e5f401c5f49e.png)

---

## How to Deploy Your Server

Deploying your chatroom means running it on a server that stays up 24/7, automatically restarts if it crashes, and starts when the server boots. There are several approaches depending on your infrastructure.

### How to Use Systemd

Systemd is the standard init system on most Linux distributions. It manages services, handles restarts, and ensures your chatroom starts on boot.

Create <VPIcon icon="fas fa-folder-open"/>`/etc/systemd/system/`<VPIcon icon="fas fa-file-lines"/>`chatroom.service`:

```ini title="/etc/systemd/system/chatroom.service"
[Unit]
Description=Chatroom Server
After=network.target

[Service]
Type=simple
User=chatroom
WorkingDirectory=/opt/chatroom
ExecStart=/opt/chatroom/server
Restart=on-failure
RestartSec=5s

[Install]
WantedBy=multi-user.target
```

#### Understanding the Configuration:

The `[Unit]` section describes the service and its dependencies. `After=network.target` ensures the network is up before starting your chatroom.

The `[Service]` section defines how to run your server. `Type=simple` means systemd should just run the command and consider it started. `User=chatroom` runs the server as a dedicated user (not root) for security. `WorkingDirectory` sets where the server runs, which is important because your WAL and snapshot files are created relative to this directory.

`Restart=on-failure` tells systemd to automatically restart your server if it crashes. `RestartSec=5s` waits 5 seconds before restarting, preventing rapid restart loops if there's a persistent problem.

The `[Install]` section makes your service start at boot when you enable it.

#### Deploying Your Server:

First, build your server binary:

```sh
go build -o server cmd/server/main.go
```

Then copy it to the deployment location:

```sh
sudo mkdir -p /opt/chatroom
sudo cp server /opt/chatroom/
sudo mkdir -p /opt/chatroom/chatdata
```

Create a dedicated user for running the service:

```sh
sudo useradd -r -s /bin/false chatroom
sudo chown -R chatroom:chatroom /opt/chatroom
```

Enable and start the service:

```sh
sudo systemctl enable chatroom
sudo systemctl start chatroom
```

Check that it's running:

```sh
sudo systemctl status chatroom
```

You can view logs with:

```sh
sudo journalctl -u chatroom -f
```

The `-f` flag follows the logs in real-time, similar to `tail -f`.

### How to Use Docker

Docker packages your application with all its dependencies, making it easy to deploy anywhere that runs Docker.

Create a <VPIcon icon="fa-brands fa-docker"/>`Dockerfile`:

```dockerfile title="Dockerfile"
FROM golang:1.23-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN go build -o server cmd/server/main.go

FROM alpine:latest
RUN apk --no-cache add ca-certificates
WORKDIR /root/
COPY --from=builder /app/server .
COPY --from=builder /app/chatdata ./chatdata
EXPOSE 9000
CMD ["./server"]
```

#### Understanding the Dockerfile:

This uses a multi-stage build. The first stage (`builder`) uses the full Go image to compile your server. The second stage uses a minimal Alpine Linux image and copies only the compiled binary. This keeps the final image small (about 20MB instead of 800MB).

`EXPOSE 9000` documents which port the container uses. `CMD ["./server"]` specifies what command runs when the container starts.

Build and Run:

```sh
docker build -t chatroom .
docker run -p 9000:9000 -v $(pwd)/chatdata:/root/chatdata chatroom
```

The `-p 9000:9000` maps port 9000 in the container to port 9000 on your host, making the chatroom accessible. The `-v $(pwd)/chatdata:/root/chatdata` mounts your local chatdata directory into the container, so messages persist even if you stop and remove the container.

#### Running in Production:

For production, you'd typically use Docker Compose or Kubernetes. Here's a simple <VPIcon icon="iconfont icon-yaml"/>`docker-compose.yml`:

```yaml title="docker-compose.yml"
version: '3.8'
services:
  chatroom:
    build: .
    ports:
      - "9000:9000"
    volumes:
      - ./chatdata:/root/chatdata
    restart: unless-stopped
```

Run with:

```sh
docker-compose up -d
```

The `restart: unless-stopped` policy ensures your container restarts automatically if it crashes or if the Docker daemon restarts

---

## Enhancements You Could Add

### 1. Multi-Room Support

You could add the concept of channels/rooms like this:

```go
type ChatRoom struct {
    rooms map[string]*Room
}

type Room struct {
    name    string
    clients map[*Client]bool
    history []Message
}
```

### 2. User Authentication

You could replace simple usernames with proper authentication for added security:

```go
type User struct {
    ID           int
    Username     string
    PasswordHash string
    Email        string
    CreatedAt    time.Time
}
```

### 3. File Sharing

You could allow users to upload files:

```go
type FileMessage struct {
    Message
    FileName string
    FileSize int64
    FileURL  string
}
```

### 4. WebSocket Support

You could add HTTP/WebSocket endpoint for web clients.

### 5. Horizontal Scaling

For massive scale, you could shard across multiple servers using Redis pub/sub or NATS for inter-server communication.

---

## Conclusion

You've now built a production-ready distributed chatroom from scratch. This project demonstrates important distributed systems concepts including concurrency patterns, network programming, state management, persistence, and fault tolerance.

Additional resources:

- **Go Concurrency**: "Concurrency in Go" by Katherine Cox-Buday
- **Distributed Systems**: "Designing Data-Intensive Applications" by Martin Kleppmann
- **Networking**: "Unix Network Programming" by Stevens

::: info

The full source code is available on [GitHub (<VPIcon icon="iconfont icon-github"/>`Caesarsage/distributed-system`)](https://github.com/Caesarsage/distributed-system/tree/main/chatroom-with-broadcast). Feel free to open issues or contribute improvements.

<SiteInfo
  name="distributed-system/chatroom-with-broadcast at main · Caesarsage/distributed-system"
  desc="Distributed system implementations and paper references - Caesarsage/distributed-system"
  url="https://github.com/Caesarsage/distributed-system/tree/main/chatroom-with-broadcast/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/6af8cf71382272431ca22c7931c1adcc57b8ad3708ef2c36c5fea0b948f9ffbe/Caesarsage/distributed-system"/>

:::

As always, I hope you enjoyed this guide and learned something. If you want to stay connected or see more hands-on DevOps content, you can follow me on [LinkedIn (<VPIcon icon="fa-brands fa-linkedin" />`destiny-erhabor`)](https://linkedin.com/in/destiny-erhabor).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build a Production-Grade Distributed Chatroom in Go [Full Handbook]",
  "desc": "If you've ever wondered how chat applications like Slack, Discord, or WhatsApp work behind the scenes, this tutorial will show you. You'll build a real-time chat server from scratch using Go, learning the fundamental concepts that power modern commun...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-production-grade-distributed-chatroom-in-go-full-handbook.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
