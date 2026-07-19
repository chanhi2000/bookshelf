---
lang: en-US
title: "How Clients and Servers Communicate: Full Handbook on HTTP/1.1, HTTP/2, REST, WebSockets, GraphQL, gRPC, and Protocol Buffers"
description: "Article(s) > How Clients and Servers Communicate: Full Handbook on HTTP/1.1, HTTP/2, REST, WebSockets, GraphQL, gRPC, and Protocol Buffers"
icon: fas fa-computer
category:
  - Engineering
  - Computer
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - engineering
  - coen
  - computerengineering
  - computer-engineering
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How Clients and Servers Communicate: Full Handbook on HTTP/1.1, HTTP/2, REST, WebSockets, GraphQL, gRPC, and Protocol Buffers"
    - property: og:description
      content: "How Clients and Servers Communicate: Full Handbook on HTTP/1.1, HTTP/2, REST, WebSockets, GraphQL, gRPC, and Protocol Buffers"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-clients-and-servers-communicate-handbook-http-rest-websockets-graphql-grpc-protobuf.html
prev: /academics/coen/articles/README.md
date: 2026-07-24
isOriginal: false
author:
  - name: Oluwaseyi Fatunmole
    url: https://freecodecamp.org/news/author/foluwaseyi/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/b44f7067-5398-492a-b1f7-789f73673c34.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Computer Engineering > Article(s)",
  "desc": "Article(s)",
  "link": "/academics/coen/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How Clients and Servers Communicate: Full Handbook on HTTP/1.1, HTTP/2, REST, WebSockets, GraphQL, gRPC, and Protocol Buffers"
  desc="You've built and consumed APIs. You know what a GET request is, what a JSON response looks like, and how to add an Authorization header. You've used REST, maybe tried GraphQL, and perhaps heard of gRP"
  url="https://freecodecamp.org/news/how-clients-and-servers-communicate-handbook-http-rest-websockets-graphql-grpc-protobuf"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/b44f7067-5398-492a-b1f7-789f73673c34.png"/>

You've built and consumed APIs. You know what a GET request is, what a JSON response looks like, and how to add an Authorization header. You've used REST, maybe tried GraphQL, and perhaps heard of gRPC.

But do you know what actually happens when your application sends a request? What travels through the wire? Why does HTTP/2 make things faster? Why do WebSockets exist when HTTP already works? What makes Protocol Buffers different from JSON at a fundamental level?

And when you're designing a system, how do you decide which communication approach to use?

These are the questions this handbook answers.

This isn't a beginner's guide to APIs. This is a deep dive into how clients and servers actually communicate: the protocols, the trade-offs, the history of why each approach was built, and the engineering thinking behind choosing one over another.

By the end, you won't just know what these technologies are. You'll understand why they exist, how they work at a level that makes you a better engineer, and how to make deliberate architectural decisions about communication in your systems.

---

## The Foundation: How Two Machines Talk to Each Other

Before any protocol, data format, or architectural style enters the picture, two machines need to establish a connection. Understanding this foundation makes everything else click.

### IP Addresses and Ports

Every device on a network has an IP address: a unique identifier that works like a postal address. When your application sends a request to `api.example.com`, the first thing that happens is a DNS lookup, which translates that human-readable name into an IP address like `93.184.216.34`. That IP address is where the packet is going.

But an IP address alone isn't enough. A single server might be running dozens of different services simultaneously: a web server, a database, an email server, an SSH daemon.

Ports tell the operating system which service should handle the incoming connection. Port 80 is the conventional port for HTTP. Port 443 is for HTTPS. Port 5432 is for PostgreSQL. Port 22 is for SSH. When you call `api.example.com/users`, you are actually calling `api.example.com:443/users`. The browser fills in the port automatically.

### TCP: The Reliable Foundation

Most web communication runs over TCP (Transmission Control Protocol). TCP is a connection-oriented protocol, which means before any data is exchanged, both parties go through a handshake to establish a connection.

The TCP handshake works in three steps, which is why it's called the three-way handshake:

```plaintext
Client                    Server
  |                          |
  |-------- SYN ----------->|   "I want to connect"
  |                          |
  |<------- SYN-ACK --------|   "Okay, I acknowledge. Ready?"
  |                          |
  |-------- ACK ----------->|   "Great, let's go"
  |                          |
  [Connection established]
```
<!-- TODO: mermaid화-->

SYN stands for synchronize. ACK stands for acknowledge. After these three packets, the connection exists and data can flow.

TCP guarantees three things that make it the foundation of reliable communication:

1. **Delivery**: if a packet is lost in transit, TCP detects this and retransmits it automatically. The application layer never has to worry about lost packets.
2. **Order**: packets arrive in the same order they were sent. If packets arrive out of order (which happens frequently on real networks), TCP reorders them before delivering them to the application.
3. **Error detection**: every TCP packet includes a checksum. If the data is corrupted in transit, TCP detects and discards the corrupted packet, then requests a retransmission.

This reliability comes at a cost: the overhead of the handshake, the acknowledgment packets, and the retransmission logic.

For many use cases, this cost is worth it. For some (live video streaming, online gaming, DNS lookups), UDP (User Datagram Protocol) is preferred because it sends packets without any of this overhead, accepting some loss in exchange for speed. HTTP/3, which we'll cover later, is built on a protocol that brings reliability to UDP.

### TLS: Encrypting the Connection

On the modern web, most connections use HTTPS rather than plain HTTP. The S stands for Secure, and the security is provided by TLS (Transport Layer Security), the successor to SSL.

TLS adds an additional handshake on top of the TCP connection. During the TLS handshake:

1. The client and the server agree on which version of TLS to use and which encryption algorithms to support
2. The server presents its digital certificate (issued by a trusted Certificate Authority)
3. The client verifies the certificate is valid and belongs to the server it intended to reach
4. They exchange encryption keys using asymmetric cryptography
5. From that point forward, all communication is encrypted with symmetric encryption

The TLS handshake adds latency. In TLS 1.2, it takes two round trips before any application data can flow. TLS 1.3, released in 2018, reduced this to one round trip, and even supports zero round-trip resumption for returning connections.

Understanding TCP and TLS matters because every protocol we discuss runs on top of them (until HTTP/3, which changes the underlying transport). When people talk about the "overhead" of HTTPS or the "cost" of establishing a connection, they're talking about the time and packets spent on these handshakes before a single byte of your actual request travels.

---

## HTTP/1.1: The Protocol That Built the Web

HTTP (HyperText Transfer Protocol) was invented by Tim Berners-Lee in 1991 to transfer HTML documents between computers. HTTP/1.0 was simple: one request per connection, then the connection closes.

HTTP/1.1, standardized in 1997, brought significant improvements and became the dominant version of HTTP for nearly two decades. It introduced persistent connections (keep connections open across multiple requests), chunked transfer encoding, and more sophisticated caching mechanisms.

### How an HTTP/1.1 Request Works

An HTTP request is a text message with a specific structure:

```plaintext
POST /api/users HTTP/1.1
Host: api.example.com
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9...
Accept: application/json
Content-Length: 45
User-Agent: MyApp/2.0

{"name": "John Smith", "email": "john@example.com"}
```

The first line is the request line: the HTTP method (POST), the path (/api/users), and the protocol version.

Below that are the headers: key-value pairs that provide metadata about the request. The host, the content type, the authorization token, what format the client accepts, and how large the body is.

After a blank line comes the body: the actual data being sent.

The server processes this and responds:

```plaintext
HTTP/1.1 201 Created
Content-Type: application/json
Location: /api/users/usr_789
Date: Mon, 21 Jul 2026 09:15:00 GMT
Content-Length: 89

{"id": "usr_789", "name": "John Smith", "email": "john@example.com", "created_at": "..."}
```

The response has a status line (the protocol version, the status code, and a reason phrase), headers, and a body.

### HTTP Methods and Their Semantics

HTTP/1.1 defines several methods, each with specific semantics:

- **GET** retrieves a resource. A GET request should have no side effects. It shouldn't create or modify anything. It's safe and idempotent, meaning calling it multiple times has the same effect as calling it once.
- **POST** submits data to create a new resource or trigger an action. It's neither safe nor idempotent: calling POST twice typically creates two resources.
- **PUT** replaces a resource entirely with the provided data. It's idempotent: calling PUT twice with the same data has the same effect as calling it once.
- **PATCH** partially updates a resource. Only the fields provided are changed.
- **DELETE** removes a resource. It's idempotent: deleting something that doesn't exist is still considered successful.
- **HEAD** is identical to GET but the server only returns headers, not the body. It's used to check if a resource exists or has been modified without downloading the full content.
- **OPTIONS** asks the server what methods are allowed for a resource. It's used in CORS preflight requests.

### Status Codes

HTTP status codes are three-digit numbers grouped into five categories:

**1xx Informational** — the server has received the request and is continuing to process it. These are rarely seen in practice outside of specific use cases like HTTP upgrade (used to establish WebSocket connections).

**2xx Success** — the request was received, understood, and accepted.

- 200 OK: standard success response
- 201 Created: a new resource was created
- 204 No Content: success but nothing to return (common for DELETE)

**3xx Redirection** — further action is required to complete the request.

- 301 Moved Permanently: the resource has a new URL forever
- 302 Found: temporary redirect
- 304 Not Modified: the cached version is still valid (used with ETags)

**4xx Client Error** — the request contains bad syntax or can't be fulfilled.

- 400 Bad Request: the request is malformed
- 401 Unauthorized: authentication is required (despite the name, it means unauthenticated)
- 403 Forbidden: authenticated but not authorized to access this resource
- 404 Not Found: the resource doesn't exist
- 422 Unprocessable Entity: the request is syntactically valid but semantically wrong (common for validation errors)
- 429 Too Many Requests: rate limit exceeded

**5xx Server Error** — the server failed to fulfill a valid request.

- 500 Internal Server Error: something went wrong on the server
- 502 Bad Gateway: the server received an invalid response from an upstream server
- 503 Service Unavailable: the server is temporarily unavailable
- 504 Gateway Timeout: the upstream server did not respond in time

### Caching in HTTP/1.1

One of HTTP/1.1's most powerful features is its built-in caching model. Responses can include headers that tell clients and intermediate caches how long to store a response and when to revalidate it.

- `Cache-Control: max-age=3600` tells the client to cache this response for one hour.
- `Cache-Control: no-cache` tells the client to always revalidate with the server before using a cached response.
- `Cache-Control: no-store` tells the client never to cache this response.

`ETag` is a fingerprint of the response content. When the client makes a subsequent request, it sends the ETag back in an `If-None-Match` header. If the content hasn't changed, the server responds with 304 Not Modified and no body, saving bandwidth.

`Last-Modified` works similarly: the client sends `If-Modified-Since` and the server confirms whether the content has changed.

Caching is one of the key reasons REST over HTTP became dominant. GET requests to well-designed REST APIs can be cached at the CDN level, meaning the same response is served to thousands of users without the request ever reaching your origin server.

---

## The Problems HTTP/1.1 Could Not Solve

HTTP/1.1 served the web well for two decades. But as the web grew more complex, applications more dynamic, and user expectations higher, its architectural limitations became significant performance bottlenecks.

### Head-of-Line Blocking

HTTP/1.1 processes requests sequentially on a single connection. The server must finish responding to one request before the next one on the same connection begins.

```plaintext
Connection 1:
Request 1 (slow database query) -----> [3 seconds] -----> Response 1
Request 2 (fast in-memory read) -----> [waits 3 seconds] -----> Response 2
Request 3 (static file) -----------> [waits 3+ seconds] -----> Response 3
```

Request 2 and Request 3 are fast operations. But they're stuck waiting for Request 1 to complete. This is head-of-line blocking: the head of the queue blocks everything behind it.

Browsers worked around this by opening multiple parallel TCP connections to the same server, typically six. But each connection requires its own TCP handshake and TLS negotiation, consuming resources on both the client and server.

### Verbose Headers on Every Request

Every HTTP/1.1 request sends its complete headers as plain text. Consider a mobile application making fifty requests during a session. On every single request, the following headers are sent in full:

```plaintext
Host: api.example.com
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c3JfMTIzIn0...
Content-Type: application/json
Accept: application/json
Accept-Language: en-US,en;q=0.9
Accept-Encoding: gzip, deflate, br
User-Agent: Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)...
```

The Authorization header alone, carrying a JWT, can be 400 to 600 bytes. Multiplied by fifty requests, that is 20 to 30 kilobytes of data carrying nothing but headers that haven't changed between requests.

On a 4G mobile connection with limited bandwidth, this is waste. On a 2G connection in a network-constrained environment, it's a significant performance penalty.

### No Server Push

HTTP/1.1 is strictly request-response. The server can't send data until the client asks for it. This fundamental limitation means the server can never proactively inform the client of changes.

For applications requiring real-time updates, short polling became a common workaround: the client sends a request every few seconds asking "has anything changed?" This is inefficient because most polling requests receive a "no, nothing has changed" response, consuming bandwidth and server resources for no purpose.

Long polling was a refinement: the client sends a request and the server holds it open until something changes or a timeout occurs. This reduces unnecessary responses but keeps connections open indefinitely, consuming server resources.

Both are workarounds for a fundamental limitation of HTTP/1.1's request-response model.

### Inefficient Use of Connections

Opening a new TCP connection requires the three-way handshake plus the TLS handshake: a process that can take 200 to 500 milliseconds on a mobile connection.

HTTP/1.1 introduced keep-alive connections to reuse connections across multiple requests, but head-of-line blocking made this only partially effective. Browsers opened multiple connections to compensate, but six parallel connections per domain is both a client limitation and a server resource concern at scale.

---

## HTTP/2: Rebuilding the Foundation

Google published a protocol called SPDY (pronounced "speedy") in 2009, designed to address HTTP/1.1's performance limitations. SPDY demonstrated that significant improvements were possible without changing the fundamental HTTP semantics. HTTP/2, standardized by the IETF in 2015, was heavily based on SPDY and became the successor to HTTP/1.1. HTTP/2 doesn't change what you send. From the application developer's perspective, requests still have methods, paths, headers, and bodies. Responses still have status codes, headers, and bodies. What HTTP/2 changes is how all of this is transmitted.

### Binary Framing: The Core Change

HTTP/1.1 is a text protocol. Headers, status lines, and method names are all ASCII text. Machines must parse this text character by character to interpret it.

HTTP/2 is a binary protocol. Every piece of information is encoded as binary frames rather than text. Binary is more compact and significantly faster for machines to parse. Instead of tokenizing a string looking for colons and newlines to separate header names from values, a binary parser reads fixed-length fields directly from memory.

The binary framing layer is the foundation everything else in HTTP/2 is built upon.

### Multiplexing: Many Streams, One Connection

HTTP/2 introduces the concept of streams. A stream is an independent, bidirectional sequence of frames within a single TCP connection. Multiple streams can exist simultaneously on the same connection.

```plaintext
Single TCP connection to api.example.com

Stream 1: GET /user/profile ---------> Response arrives
Stream 2: GET /user/balance ---------> Response arrives
Stream 3: POST /transactions --------> Response arrives
Stream 4: GET /notifications --------> Response arrives

All four streams active simultaneously
No stream waits for any other stream
```

This is multiplexing: many independent requests and responses interleaved on the same connection. Head-of-line blocking at the HTTP level is eliminated. A slow request on Stream 1 doesn't prevent Stream 2, 3, or 4 from receiving their responses.

One connection replaces six parallel connections. The TCP handshake and TLS negotiation happen once. Connection overhead drops dramatically.

### Header Compression with HPACK

HTTP/2 compresses headers using an algorithm called HPACK specifically designed for HTTP headers.

HPACK works in two ways. First, it maintains a table of previously seen headers. Instead of retransmitting a header that was sent on the previous request, it sends a reference to the table entry: a single integer instead of hundreds of bytes of text.

Second, HPACK uses Huffman encoding for new header values, reducing the size of strings that can't be referenced from the table.

The result: a mobile application sending the same Authorization header on every request transmits it in full on the first request, then sends a one-byte or two-byte reference on every subsequent request. What was 500 bytes of overhead becomes 2 bytes.

Across fifty requests in a session, this eliminates thousands of bytes of redundant header transmission.

### Stream Prioritization

HTTP/2 allows clients to assign priority to streams. A browser loading a web page can signal that the CSS file (needed to render anything) is higher priority than the analytics script (not needed for initial render). The server can use these priorities to decide the order in which it sends frames when multiple streams are active.

In practice, stream prioritization has been inconsistently implemented and is being redesigned in HTTP/3. ### Server Push

HTTP/2 allows the server to proactively send resources to the client without waiting for a request. When a browser requests an HTML file, the server can immediately push the CSS and JavaScript files it knows the browser will need next, before the browser has even parsed the HTML to discover it needs them.

```plaintext
Client: GET /index.html
Server: Here is index.html
Server: (push) Here is styles.css — you will need this
Server: (push) Here is app.js — you will need this too
```

In practice, server push has had mixed adoption due to implementation complexity and the risk of pushing resources the client already has cached. HTTP/3 is reconsidering how push should work.

### HTTP/2 and gRPC

HTTP/2's multiplexing and persistent connections make it the ideal transport for gRPC. A single HTTP/2 connection can carry many concurrent gRPC calls, including long-running streaming calls that push data continuously. This is why gRPC requires HTTP/2: the features that make gRPC efficient are provided by the transport layer.

---

## HTTP/3 and QUIC: The Next Evolution

Even with HTTP/2's improvements, one fundamental problem remained: TCP head-of-line blocking.

HTTP/2 eliminated head-of-line blocking at the HTTP level. Multiple HTTP/2 streams can proceed independently. But all of those streams share a single TCP connection. TCP guarantees ordered delivery of all bytes in a connection. If a single TCP packet is lost, the entire connection stalls while TCP retransmits that packet, even for streams that have nothing to do with the lost packet.

```plaintext
HTTP/2 over TCP — packet loss scenario:

Stream 1: data in flight...
Stream 2: data in flight...
Stream 3: packet LOST — TCP retransmission required

Stream 1: STALLED (waiting for TCP retransmission)
Stream 2: STALLED (waiting for TCP retransmission)
Stream 3: retransmission in progress...
```

Both streams 1 and 2 are blocked by a packet loss that affected only stream 3. This is TCP head-of-line blocking, and HTTP/2 can't eliminate it because it operates above the TCP layer.

### QUIC: A New Transport Protocol

Google developed QUIC (Quick UDP Internet Connections) to solve this problem. QUIC is a new transport protocol built on UDP instead of TCP, designed to provide some very helpful new features:

1. **Multiplexing without head-of-line blocking:** QUIC understands streams natively. A packet loss in one QUIC stream only stalls that stream. Other streams on the same connection continue flowing freely.
2. **Built-in encryption:** Unlike TLS which runs on top of TCP, QUIC has TLS 1.3 built into the protocol itself. The transport and security layers are integrated, reducing the number of round trips required before data can flow.
3. **Faster connection establishment:** A new QUIC connection requires one round trip before data can flow. For returning connections where a session ticket exists, QUIC can send data in zero round trips (0-RTT).
4. **Connection migration:** A TCP connection is identified by the four-tuple of source IP, source port, destination IP, and destination port. If any of these change (say, a mobile device switches from WiFi to cellular), the TCP connection breaks and must be re-established. QUIC connections are identified by a connection ID that survives network changes, enabling seamless handoff.

### HTTP/3

HTTP/3 is HTTP semantics over QUIC. The request and response model remains the same. Headers, status codes, and methods are all identical. The transport underneath is QUIC instead of TCP.

HTTP/3 is particularly impactful for:

1. **Mobile networks** where packet loss is more common and devices frequently switch between networks.
2. **High-latency connections** where the reduced handshake round trips save meaningful time.
3. **Applications with many concurrent streams** where TCP head-of-line blocking was a real bottleneck.

As of 2026, HTTP/3 is supported by major browsers, CDNs, and an increasing number of backend servers. Adoption continues to grow.

---

## Data Formats: How Information Is Encoded

Independent of which protocol carries data, systems need to agree on how data is encoded. The most important formats for API communication are JSON and Protocol Buffers.

### JSON: The Universal Language

JSON (JavaScript Object Notation) was derived from JavaScript syntax and formalized as a standalone data format. Its design philosophy is human readability and simplicity.

A JSON object is a collection of key-value pairs enclosed in curly braces. Keys are always strings. Values can be strings, numbers, booleans, null, arrays, or other objects.

```json
{
  "id": "usr_001",
  "name": "John Smith",
  "age": 28,
  "is_verified": true,
  "scores": [98, 87, 92],
  "address": {
    "city": "Lagos",
    "country": "Nigeria"
  }
}
```

JSON became the dominant API data format for several reasons. It's human-readable: a developer can look at a JSON response in a browser's developer tools and immediately understand it. It maps naturally to data structures in virtually every programming language. It requires no special tooling or schema definition. And it's flexible: fields can be added or removed without necessarily breaking existing clients.

### The Structural Cost of JSON

JSON's human-readable design comes with a structural cost that becomes significant at scale.

Every field name is a string that travels over the network on every single response. In the example above, the strings `"is_verified"`, `"address"`, `"country"` aren't data. They're labels for data. They consume bytes, they must be tokenized and parsed, and they're repeated on every response for every user.

JSON is a text format, which means it must be parsed from text into the application's native data structures. This parsing isn't free: it requires allocating memory for strings, walking the text byte by byte to find delimiters, and constructing objects from the parsed values.

For a fintech platform with an internal API that returns a 1000-field response and is called by dozens of internal services millions of times per day, the cumulative cost of JSON's verbosity and parsing overhead becomes measurable in bandwidth bills and server CPU time.

JSON also has no formal schema at the network level. There's nothing in the JSON format itself that prevents a backend from changing `"account_balance"` to `"balance"`. The change compiles fine. The server deploys. Clients that depend on `"account_balance"` break silently at runtime.

### XML: The Predecessor

Before JSON, XML (eXtensible Markup Language) was the dominant data format for web services (used in SOAP, the predecessor to REST). XML is more verbose than JSON, wrapping every value in opening and closing tags:

```xml
<user>
  <id>usr_001</id>
  <name>John Smith</name>
  <age>28</age>
  <is_verified>true</is_verified>
</user>
```

XML has advantages: it supports schemas (XSD), namespaces, and complex document structures. It's still used in enterprise systems, document formats (DOCX, SVG, RSS), and configuration files. But for API communication, JSON's simplicity won.

---

## REST: The Architecture That Took Over the World

REST (Representational State Transfer) was defined by Roy Fielding in his doctoral dissertation in 2000. Fielding was one of the principal authors of the HTTP specification, and REST emerged from his analysis of what made HTTP architecturally successful.

REST isn't a protocol. It's an architectural style: a set of constraints that, when applied to a distributed system, produce desired properties including scalability, simplicity, and modifiability.

### The Six REST Constraints

Fielding defined six constraints that define a RESTful architecture. Most APIs described as "REST" implement a subset of these, which is why the term "RESTful" covers a wide spectrum.

**1. Client-Server:** The client and server are separate concerns. The client manages the user interface. The server manages data storage and business logic. They evolve independently. This separation allows each to scale and change without affecting the other.

**2. Stateless:** Each request from the client to the server must contain all the information needed to understand and process the request. The server doesn't store any session state between requests. If a client needs to be authenticated, the authentication information (typically a token) travels with every request.

Statelessness is what makes REST APIs horizontally scalable. Any server instance can handle any request because no session state needs to be co-located with the request. Load balancers can route requests freely.

**3. Cacheable:** Responses must define themselves as cacheable or non-cacheable. If a response is cacheable, clients and intermediate layers (CDN, reverse proxies) can store and reuse the response without hitting the server.

Caching is one of the most powerful properties of REST. A well-designed REST API can serve millions of identical GET requests from CDN cache, with only a fraction ever reaching the origin server.

**4. Uniform Interface:** The interface between client and server is standardized. Resources are identified by URIs. Resources are manipulated through representations. Messages are self-descriptive. This uniformity is what makes REST APIs universally accessible: a developer in any language can call a REST API using standard HTTP tooling.

**5. Layered System:** The client doesn't need to know whether it's connected directly to the server or to an intermediary (load balancer, CDN, API gateway, caching proxy). Each layer only sees the layer it is interacting with. This enables transparent scaling and security.

**6. Code on Demand (Optional):** Servers can extend client functionality by sending executable code (JavaScript). This is the only optional constraint and is the basis for how browsers work, but rarely relevant to API design.

### Resources and URIs

The central concept in REST is the resource. A resource is any piece of information that can be named, like a user, an order, a product, or a collection of transactions.

Resources are identified by URIs (Uniform Resource Identifiers). The URI identifies what the resource is, not what to do with it. The HTTP method expresses the operation.

```plaintext
GET    /users           — retrieve all users
GET    /users/123       — retrieve user 123
POST   /users           — create a new user
PUT    /users/123       — replace user 123 entirely
PATCH  /users/123       — partially update user 123
DELETE /users/123       — delete user 123

GET    /users/123/orders        — orders belonging to user 123
POST   /users/123/orders        — create an order for user 123
GET    /users/123/orders/456    — order 456 belonging to user 123
```

The URI structure forms a hierarchy that reflects the relationships between resources. This makes APIs predictable: a developer who understands the resource model can guess the correct URIs.

### Why REST Won

REST became the dominant architectural style for web APIs for reasons that go beyond technical merit:

**Universal accessibility:** Any device, any language, any framework that can make an HTTP request can call a REST API. There's no special client library needed.

**HTTP alignment:** REST leverages HTTP's existing infrastructure. CDN caching works for free. Load balancers understand HTTP. Monitoring tools speak HTTP. The entire ecosystem is built around HTTP semantics.

**Simplicity:** A REST API can be designed, documented, and consumed with minimal tooling. A developer can test endpoints in a browser or with `curl` immediately.

**Developer experience:** JSON over HTTP is something every web developer already understands. The learning curve is essentially zero.

**Ecosystem maturity:** OpenAPI/Swagger provides standardized documentation. Postman provides testing. Every programming language has robust HTTP client libraries.

### The Limits of REST

REST's success is real. But so are its limitations, and understanding them is essential to knowing when to reach for something else.

#### Overfetching: Getting More Than You Need

A REST endpoint returns a fixed shape of data. The `/users/123` endpoint returns the full user object: name, email, phone, address, preferences, account status, and thirty other fields.

A mobile screen that displays only the user's name and avatar must receive all of those fields to use two of them. The rest is waste: wasted bandwidth, serialization on the server, and deserialization on the client.

On a constrained mobile connection, this overfetching isn't just inefficient. It's a measurable degradation of user experience.

#### Underfetching: Not Getting Enough at Once

The opposite problem is equally common. A screen needs data from multiple resources: the user's profile, their recent orders, their notification count, and their account balance.

A REST API typically models these as separate endpoints. Loading this screen requires four separate HTTP requests, each with its own round-trip latency.

```plaintext
GET /users/123         → profile data
GET /users/123/orders  → orders data
GET /notifications?user=123 → notification count
GET /accounts/123/balance   → balance data
```

Four sequential round trips. On a 200ms latency connection, that's 800ms of network time before the screen can render completely.

#### The N+1 Problem

A common variant of underfetching: you fetch a list of resources, then must fetch additional data for each item in the list.

```plaintext
GET /orders            → returns 20 orders (each with a user_id)
GET /users/1           → user for order 1
GET /users/2           → user for order 2
...
GET /users/20          → user for order 20
```

21 requests to load one screen. This pattern appears constantly in REST APIs and is addressed in various ways: including nested data in responses, adding query parameters to expand related resources, or creating purpose-built endpoints for specific screens.

All of these workarounds create tension: the API becomes less general as it's optimized for specific client needs.

#### No Native Real-Time Support

REST is request-response. The client initiates every interaction. The server can never proactively push data.

Real-time features like live notifications, collaborative editing, and streaming data require either polling (inefficient), long-polling (complex), or a separate real-time technology bolted alongside the REST API.

#### The Documentation Drift Problem

A REST API contract lives in documentation. Nothing in the HTTP protocol enforces that the documentation accurately reflects the API's actual behavior. As APIs evolve, documentation falls behind. Fields are renamed, types change, endpoints are deprecated. Clients built against outdated documentation break.

This isn't a theoretical problem. It's a daily reality in engineering teams where the backend and frontend evolve at different speeds.

---

## GraphQL: Letting the Client Decide

GraphQL was developed at Facebook starting in 2012 and open-sourced in 2015. Facebook built it to solve a specific problem: their mobile app needed to fetch complex, interconnected social data from a REST API, and the resulting overfetching and multiple round trips were degrading performance on mobile devices.

GraphQL's core insight is simple and radical: instead of the server deciding what data to return, let the client specify exactly what it needs.

### The Query Language

GraphQL is both a query language for APIs and a runtime for executing those queries. Rather than calling different endpoints for different data, all GraphQL requests go to a single endpoint (typically `/graphql`) and include a query that describes precisely what data is needed.

A GraphQL query for a user profile screen:

```graphql
query UserProfile {
  user(id: "usr_123") {
    name
    avatarUrl
    recentOrders(limit: 3) {
      id
      total
      status
      createdAt
    }
    notificationCount
  }
}
```

The response contains exactly and only the fields requested. Nothing more. If the client needs only `name` and `avatarUrl`, it requests only those two fields. The response contains only two fields.

### Mutations and Subscriptions

GraphQL has three operation types:

1. **Queries** fetch data. They're the GraphQL equivalent of GET requests.
2. **Mutations** modify data: creating, updating, or deleting resources. They're the GraphQL equivalent of POST, PUT, PATCH, and DELETE.
3. **Subscriptions** establish a persistent connection and push data in real-time when specified events occur. A subscription to `orderStatusChanged` receives a push every time any order's status changes. This is GraphQL's real-time capability, typically implemented over WebSockets.

### The Schema

Every GraphQL API is defined by a schema written in the Schema Definition Language (SDL). The schema declares every type, query, mutation, and subscription the API supports.

```graphql
type User {
  id: ID!
  name: String!
  email: String!
  orders: [Order!]!
  notificationCount: Int!
}

type Order {
  id: ID!
  total: Float!
  status: OrderStatus!
  createdAt: String!
}

enum OrderStatus {
  PENDING
  PROCESSING
  SHIPPED
  DELIVERED
}

type Query {
  user(id: ID!): User
  orders(userId: ID!, limit: Int): [Order!]!
}

type Mutation {
  createOrder(userId: ID!, items: [OrderItemInput!]!): Order!
}
```

The schema is introspectable: clients can query the schema itself to discover what types and operations are available. This enables powerful tooling: GraphQL IDEs can autocomplete queries, validate them against the schema before sending, and display documentation inline.

### Where GraphQL Wins

**Precise data fetching:** Clients request exactly what they need. Overfetching is eliminated by design.

**Single round trip for complex data:** Data from multiple resources is fetched in a single request. The N+1 problem is solved at the query level rather than requiring the client to make multiple requests.

**Strongly typed schema:** The schema is the contract. Clients can validate their queries against it at build time. Type mismatches are caught before deployment.

**Frontend agility:** Frontend teams can evolve their data requirements without asking backend teams to create new endpoints. New screens, data combinations, and features are all handled by writing a new query.

**Excellent tooling:** GraphiQL and Apollo Studio provide interactive schema exploration, query building, and performance analysis.

### Where GraphQL Struggles

**Query complexity:** A malicious or poorly written query can request enormous amounts of nested data. A query that fetches every user, each user's orders, each order's items, and each item's product details can bring a server to its knees.

REST endpoints can be individually optimized. GraphQL requires query complexity analysis, depth limiting, and rate limiting to protect the server.

**Caching is harder:** REST GET requests are cacheable at the HTTP level by default. GraphQL queries all go through POST requests to a single endpoint, breaking standard HTTP caching. Clients must implement their own caching (Apollo Client does this), but CDN-level caching is essentially unavailable for dynamic queries.

**Over-engineering simple APIs:** If your API is straightforward CRUD operations with no complex data relationships and no mobile clients with aggressive data constraints, GraphQL's added setup cost exceeds its benefit.

**Real-time at scale is complex:** GraphQL subscriptions work, but scaling WebSocket connections for thousands of concurrent subscribers is infrastructure-intensive and requires careful architecture.

**Error handling is non-standard:** A GraphQL request can partially succeed: some fields resolve successfully while others fail. The response includes both data and errors simultaneously. Handling this gracefully requires more nuanced error handling logic than a simple HTTP status code.

---

## WebSockets: When HTTP Is Not Enough

HTTP, in all its versions, is fundamentally request-response. The client speaks first. The server responds. The conversation ends. Even with HTTP/2's server push, the client initiates every new exchange.

But some applications genuinely need both sides to be able to speak at any moment, without waiting for the other to ask first. For example, a chat application where both parties send messages freely. A live collaborative document where every keystroke is broadcast to co-editors. An online game where the server pushes state updates as they happen and the client sends actions continuously.

For these cases, WebSockets provide a fundamentally different communication model.

### The WebSocket Handshake

A WebSocket connection starts as an HTTP request and then upgrades to a WebSocket connection. This upgrade mechanism means WebSockets work through existing HTTP infrastructure (firewalls, proxies, load balancers) without requiring special configuration.

The upgrade request:

```plaintext
GET /chat HTTP/1.1
Host: api.example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
Sec-WebSocket-Version: 13
```

The server confirms the upgrade:

```plaintext
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=
```

Status code 101 means "Switching Protocols." From this point forward, the HTTP connection is replaced by a WebSocket connection. The protocol has changed. HTTP headers, status codes, and methods no longer apply.

### Full-Duplex, Persistent Communication

The WebSocket connection is:

- **Full-duplex:** both the client and server can send messages at any time, simultaneously, without waiting for the other to finish.
- **Persistent:** the connection stays open until explicitly closed by either party or until a network interruption occurs.
- **Low overhead:** once established, WebSocket messages have minimal framing overhead compared to HTTP. A small WebSocket message may have only 2 to 10 bytes of overhead, versus potentially hundreds of bytes of HTTP headers.

```plaintext
WebSocket connection open

Client: "Hello, I'm user 123"
Server: "Welcome, user 123"
Server: "User 456 just sent you a message: Hey!"
Client: "Thanks, here's my reply: Hi there!"
Server: "New notification: your payment was confirmed"
Client: "Great, show me my balance"
Server: "Your balance is NGN 500,000"
Server: "Another notification: transfer from user 789 received"

[Both sides communicate freely, at any time, simultaneously]
```

### Where WebSockets Win

**True real-time bidirectional communication**: Applications where both client and server need to send messages at unpredictable times and at high frequency. For example, chat, live collaboration, multiplayer games, financial trading terminals.

**Low-latency messaging:** Once the connection is established, message round-trip times can be in the single-digit milliseconds, limited only by network latency rather than connection setup overhead.

**Native browser support:** The WebSocket API is built into every modern browser. No libraries are needed for the fundamental connection.

**Event-driven architecture on the client:** WebSocket events (message, close, error) map naturally to event-driven client code.

### Where WebSockets Struggle

**Stateful connections:** Each WebSocket connection must be maintained by a specific server instance. When scaling horizontally, a client connected to Server A can't receive messages from Server B without a shared pub/sub layer (like Redis) that all server instances publish to and subscribe from. This adds infrastructure complexity.

**No built-in request-response correlation:** WebSockets are a message stream. If you send a message and expect a response, there's no built-in mechanism to correlate which response corresponds to which request. You have to build this yourself.

**No schema or contract:** WebSockets send raw text or binary. The format of messages is defined entirely by the application. Two systems communicating over WebSockets must agree on message format out of band, in documentation, and there's nothing to enforce it at the connection level.

**Firewall and proxy complications:** Some corporate networks and older proxies don't support the HTTP upgrade mechanism correctly, breaking WebSocket connections. This is less common than it was but still occurs in enterprise environments.

**Reconnection must be handled manually:** WebSocket connections can drop due to network instability. Applications must implement reconnection logic, including managing state across reconnections.

---

## Server-Sent Events: The Simpler Real-Time Option

Between REST's pure request-response and WebSocket's full bidirectional communication lies a middle option that most developers overlook: Server-Sent Events (SSE).

SSE establishes a one-directional persistent connection: the server pushes data to the client over a regular HTTP connection, and the client listens. The client can't send data back through the same connection.

### How SSE Works

The client makes a standard HTTP GET request with an `Accept: text/event-stream` header:

```plaintext
GET /notifications HTTP/1.1
Host: api.example.com
Accept: text/event-stream
Authorization: Bearer token123
```

The server responds with a 200 OK and keeps the connection open, periodically sending events:

```plaintext
HTTP/1.1 200 OK
Content-Type: text/event-stream
Cache-Control: no-cache

data: {"type": "balance_update", "balance": 500000}

data: {"type": "transaction", "id": "txn_001", "amount": -5000}

event: notification
data: {"message": "Your transfer has been confirmed"}

id: 42
data: {"type": "order_status", "status": "shipped"}
```

Each event is separated by a blank line. Events can include a `data` field, an optional `event` type, and an optional `id` for resumability.

### Automatic Reconnection

One of SSE's most practical features is automatic reconnection. If the connection drops, the browser automatically reconnects, sending the last received event ID in a `Last-Event-ID` header. The server can resume from that point, ensuring no events are missed.

### Where SSE Wins

**Simplicity:** SSE works over plain HTTP. There's no protocol upgrade needed, and no special infrastructure. It works through every HTTP/2 connection, load balancer, and CDN that supports streaming.

**Native browser support:** The `EventSource` API is built into every modern browser. Automatic reconnection is built in.

**Perfect for one-directional feeds:** Live dashboards, notification streams, news feeds, real-time analytics, server logs: any scenario where the server pushes a continuous stream of updates and the client only reads.

**HTTP/2 multiplexing:** Over HTTP/2, multiple SSE connections can share a single TCP connection. The browser connection limit that affected SSE over HTTP/1.1 doesn't apply.

**Natural fit for existing infrastructure:** SSE responses are just HTTP responses. Existing load balancers, authentication middleware, and monitoring tools work without modification.

### Where SSE Struggles

**One direction only:** The client can't send data back through the SSE connection. For bidirectional scenarios, SSE isn't sufficient on its own.

**Text only (natively):** SSE events are text. Binary data must be base64-encoded, adding overhead.

**No native support in all environments.** SSE is a browser API. In other environments (mobile apps, server-to-server), it requires an HTTP client configured to handle streaming responses.

### SSE vs WebSockets: The Decision

Choose SSE when the server pushes data and the client only reads: notifications, live feeds, dashboards, or streaming responses from an AI model. SSE is simpler, works over plain HTTP, and has automatic reconnection built in.

Choose WebSockets when both the client and server need to send messages freely and simultaneously: chat, collaborative editing, and games. The added complexity of WebSockets is justified when you genuinely need bidirectional communication.

---

## Protocol Buffers: A New Language for Data

Protocol Buffers (protobuf) is a binary serialization format developed by Google. Where JSON encodes data as human-readable text, protobuf encodes data as compact binary. This single difference has cascading implications for payload size, parsing speed, type safety, and schema enforcement.

### The Schema-First Approach

Unlike JSON, where you simply start writing key-value pairs, protobuf requires defining a schema first. You describe your data structures in a `.proto` file using Protocol Buffer Language, a language-agnostic schema definition language.

The schema definition:

```protobuf
syntax = "proto3";

message User {
  string id = 1;
  string name = 2;
  string email = 3;
  double balance = 4;
  bool is_verified = 5;
  int32 kyc_level = 6;
}

message Order {
  string id = 1;
  string user_id = 2;
  double total = 3;
  string status = 4;
  int64 created_at = 5;
}
```

Each field has a name and a type, as in any structured data format. But it also has a field number: the small integer after the equals sign. This field number is the key to protobuf's efficiency.

### Binary Encoding: Why Field Numbers Matter

When protobuf encodes data to binary, field names don't appear in the output. Instead, only the field number and the encoded value are written. Field 1 (id) becomes a tag byte indicating "field 1, type string" followed by the string's length and bytes. Field 4 (balance) becomes a tag byte indicating "field 4, type 64-bit float" followed by eight bytes of IEEE 754 double-precision float.

No `"id":` string, `"balance":` string, quotation marks, colons, or braces. Just field tags and values in a compact binary stream.

The same user object that occupies approximately 100 bytes in JSON occupies approximately 35 bytes in protobuf. For a 1000-field enterprise API response called millions of times per day, this difference translates directly to reduced bandwidth consumption and infrastructure cost.

Parsing binary is also fundamentally faster than parsing text. A binary parser reads a fixed-length tag, determines the type and length of the following value, reads that value, and moves to the next field. A JSON parser must tokenize a text stream character by character, handle escape sequences, infer types from value format, and construct a dynamic object from parsed key-value pairs.

On constrained devices or in high-throughput server-to-server communication, this parsing speed difference is meaningful.

### Code Generation: The Contract Comes Alive

The `.proto` schema file is the input to the `protoc` compiler. This compiler generates data classes in any supported language from the same schema definition.

The same `user.proto` file generates:

- A `User` class in Go for the backend server
- A `User` class in Dart for the Flutter client
- A `User` class in Python for the data processing service
- A `User` class in TypeScript for the web frontend

Every generated class has typed fields, serialization/deserialization methods, and equality comparison. There's no manual JSON parsing, type casting, or risk of field name typos. The compiler guarantees that every language's representation of a `User` is identical.

When the schema changes — a new field is added or a field is removed, for example — every team regenerates their classes. If the change is breaking (a required field removed or a type changed in an incompatible way), the compiler reports errors in every affected codebase. The problem is caught before any code reaches production.

### Schema Evolution Rules

Protobuf's field number system enables backward-compatible schema evolution. Because fields are identified by number rather than name, the following changes are safe:

- Adding a new field with a new number is always safe. Existing clients ignore fields they don't recognize. New clients receive the new field.
- Removing a field by marking it as reserved is safe. Existing encoded data that contains the removed field is simply ignored when decoded. The field number must be marked reserved to prevent its reuse.
- Renaming a field is safe. Names aren't encoded. Only the number matters at the binary level.
- Changing a field's type in incompatible ways is unsafe and breaks existing encoded data.

This evolution model means protobuf schemas can grow over time without coordinated updates across all clients and servers.

### Trade-offs

Protobuf's efficiency comes with costs that make it inappropriate for all contexts.

Binary data isn't human-readable. You can't open a protobuf response in a browser's developer tools and see what it contains. Debugging requires either decoding the binary with the schema or using specialized tools.

Protobuf also requires tooling. Every consumer of a protobuf-encoded API needs the schema and a protobuf library to decode it. For public APIs consumed by unknown third parties, this is a significant barrier. JSON requires nothing: every programming environment can parse it with built-in libraries.

Schema changes require coordination. When a schema changes, every consumer must update. For internal systems where you control all consumers, this is manageable. For public APIs, it requires versioning and migration strategies.

---

## gRPC: Remote Procedure Calls at Scale

gRPC combines Protocol Buffers with HTTP/2 and Remote Procedure Call semantics to produce a framework for service-to-service communication that is faster, more structured, and more powerful than REST for specific use cases.

### Remote Procedure Calls: The Core Concept

A Remote Procedure Call (RPC) framework makes calling a function on a remote server feel like calling a local function. Instead of constructing an HTTP request, serializing a body, parsing a response, and handling status codes, you call a function with typed arguments and receive a typed return value. The network communication is abstracted away.

```plaintext
// Without RPC (manual REST)
const response = await http.post('/users', headers: {...}, body: json.encode(data));
const user = User.fromJson(json.decode(response.body));

// With RPC (gRPC)
final user = await userService.createUser(CreateUserRequest(name: "John", email: "john@example.com"));
```

The second form is simpler, type-safe, and requires no knowledge of HTTP methods, endpoints, or serialization formats.

### The Four Communication Patterns

gRPC's most significant advantage over REST is its support for four distinct communication patterns, all defined in the same `.proto` schema and accessible through the same generated client.

**Unary RPC** is the familiar request-response pattern. One request and one response. It's equivalent to a REST API call.

```plaintext
Client ——— LoginRequest ——→ Server
Client ←—— LoginResponse —— Server
```

**Server Streaming RPC** sends one request and receives a continuous stream of responses. The server pushes messages as they become available without the client needing to request each one.

```plaintext
Client ——— WatchBalanceRequest ——→ Server
Client ←— BalanceResponse ———————— Server (balance: 500,000)
Client ←— BalanceResponse ———————— Server (balance: 495,000)
Client ←— BalanceResponse ———————— Server (balance: 1,000,000)
[Stream stays open, server pushes on every change]
```

**Client Streaming RPC** sends a stream of messages to the server and receives one response at the end. The server processes all received messages and responds once.

```plaintext
Client ——— DocumentChunk 1 ——→ Server
Client ——— DocumentChunk 2 ——→ Server
Client ——— DocumentChunk 3 ——→ Server
Client ←————— UploadResponse —— Server (all chunks processed)
```

**Bidirectional Streaming RPC** allows both client and server to send streams of messages simultaneously, in any order.

```plaintext
Client ——— ChatMessage ——→ Server
Server ←— ChatMessage ——— Client
Client ——— ChatMessage ——→ Server
Server ←— ChatMessage ——— Client  (server-initiated)
[Both sides communicate freely and simultaneously]
```

### Why HTTP/2 and Protobuf Make gRPC Efficient

gRPC's efficiency comes from the combination of its two underlying technologies working together.

HTTP/2's multiplexed persistent connections mean many concurrent gRPC calls, including long-running streaming calls, share a single connection. There's no connection setup overhead per call. Multiple streams proceed in parallel without blocking each other.

Protocol Buffer's binary encoding means payloads are compact and parsing is fast. A high-frequency service-to-service call that would transmit 100 bytes of JSON transmits 35 bytes of protobuf. At thousands of calls per second between microservices, this difference is significant.

The generated clients eliminate all serialization and deserialization code. The schema enforces that client and server agree on the contract. Breaking changes are caught by the compiler.

### The Organizational Contract

In organizations using gRPC at scale, `.proto` files live in a dedicated repository separate from any individual service. This repository is the single source of truth for every service contract.

When an engineer wants to add a new field to an API, they open a pull request in the proto repository. Engineers from every affected team review it. The change is discussed, refined, and approved before any implementation begins. When it merges, every team regenerates their clients. Changes that break existing behavior are caught in code review, not in production.

This governance model transforms API evolution from a coordination problem into a code review process.

### gRPC's Limitations

gRPC doesn't work natively in web browsers. Browsers can't directly make HTTP/2 requests with the necessary control required for gRPC. A proxy layer (gRPC-Web) is required to translate between gRPC-Web's browser-compatible format and standard gRPC. This adds infrastructure complexity and limits gRPC's applicability for browser-based clients.

gRPC also requires HTTP/2. Environments that don't support HTTP/2 can't use gRPC.

Binary encoding makes debugging harder as well. Inspecting gRPC traffic requires specialized tools and access to the proto schema.

For public APIs consumed by third-party developers, gRPC's tooling requirements are a higher barrier than REST's universally accessible JSON over HTTP.

---

## The Complete Comparison

|  | HTTP/1.1 | HTTP/2 | REST | GraphQL | WebSockets | SSE | gRPC |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Protocol | HTTP/1.1 | HTTP/2 | HTTP/1.1 or 2 | HTTP/1.1 or 2 | WebSocket | HTTP | HTTP/2 |
| Data format | Any | Any | JSON (typical) | JSON | Any | Text | Protobuf (binary) |
| Communication | Request-Response | Request-Response | Request-Response | Request-Response + Subscriptions | Bidirectional | Server to Client | All four patterns |
| Contract | None | None | Documentation | Schema (SDL) | None | None | .proto file |
| Code generation | No | No | Optional | Optional | No | No | Mandatory |
| Real-time | No | Limited (push) | No (polling) | Subscriptions | Yes | Yes (one-way) | Yes (built-in) |
| Browser native | Yes | Yes | Yes | Yes | Yes | Yes | No (needs proxy) |
| Caching | Excellent | Excellent | Excellent | Difficult | Not applicable | Not applicable | Not applicable |
| Payload size | Medium | Medium | Medium (JSON) | Medium (JSON) | Low overhead | Low overhead | Small (binary) |
| Human readable | Yes | No (binary frames) | Yes | Yes | Depends | Yes | No |
| Schema enforcement | None | None | None | Compile-time | None | None | Compile-time |

---

---

## How to Choose: The Engineering Decision Framework

No single communication approach is universally best. Each exists because it solves specific problems better than the alternatives. The engineering decision involves matching the tool to your requirements.

### When to Use REST

Use REST when the API is public or consumed by third parties. REST's universal accessibility makes it the only reasonable choice for public APIs. Any developer in any language can call a REST API with standard HTTP tools. There are no schema files, generated clients, or special libraries.

REST is also a good fit when caching is a priority. REST GET responses can be cached at every layer: CDN, reverse proxy, and browser. For content that doesn't change frequently, REST with proper cache headers can serve millions of requests without hitting the origin server.

It's also solid when the operation is simple request-response. If you're building straightforward CRUD operations with no streaming requirements and no complex data relationships, REST is simpler to implement, document, and debug than any alternative.

And finally use REST when developer experience for the consumer matters. REST APIs are immediately accessible in a browser. They can be tested with `curl`. Every developer already understands them.

### When to Use GraphQL

Use GraphQL when multiple client types have significantly different data needs. A mobile app that needs minimal data for a list view and richer data for a detail view, alongside a desktop app that needs comprehensive data, are ideal GraphQL consumers. Each queries exactly what it needs.

GraphQL also works well for complex interconnected data with many relationships. Social graphs, product catalogs with deeply nested attributes, or content management systems with rich content relationships: GraphQL's ability to traverse relationships in a single query is a genuine advantage.

It's also a good choice for frontend teams that need to iterate quickly. When the frontend can evolve its data requirements without backend changes, development velocity increases. New screens, new data combinations, no new endpoints needed.

And finally, GraphQL works well if you're comfortable with the operational complexity. GraphQL requires query complexity protection, custom caching strategies, and more sophisticated error handling. These are worth the effort when the data fetching advantages are real.

### When to Use WebSockets

Use WebSockets when both the client and server need to send messages at any time. Genuine bidirectional real-time communication where either party can initiate a message at any moment.

WebSockets also work great for chat, collaboration, and games. Live chat applications, collaborative document editing, multiplayer real-time games are the canonical WebSocket use cases.

And WebSockets is a solid choice when low-latency messaging is critical. The minimal framing overhead and persistent connection make WebSockets the lowest-latency option for frequent message exchange.

### When to Use Server-Sent Events

Use SSE when the server needs to push updates but the client only reads. Notification feeds, live dashboards, streaming AI responses, real-time analytics, or any scenario where the server has a continuous stream of data to deliver and the client only consumes.

SSE also works well when you value simplicity over full bidirectionality. SSE is significantly simpler to implement and operate than WebSockets for one-directional use cases. Automatic reconnection is built in. It works over plain HTTP.

### When to Use gRPC

Use gRPC when multiple internal services share the same contract. When several teams build services that call each other, a `.proto` schema enforced by the compiler prevents contract drift. Everyone generates their clients from the same source of truth.

gRPC also works well for high-frequency service-to-service communication. Two microservices exchanging thousands of calls per second benefit from protobuf's compact binary encoding and HTTP/2's persistent multiplexed connections.

It's also a solid choice for large payloads that are consumed by many internal systems. An internal enterprise API with hundreds of fields called by dozens of internal applications benefits enormously from protobuf's size reduction. Less bandwidth, less parsing overhead, and compiled contract enforcement.

gRPC also works great when low-bandwidth networks matter. For mobile applications in markets where network conditions are variable or constrained, protobuf's binary encoding reduces payload size by 3 to 10 times compared to JSON. The difference between a 15 kilobyte response and a 3 kilobyte response is the difference between a 3-second load and a sub-second load on a 2G connection.

And finally, use gRPC when streaming is a core requirement and you want one framework. gRPC's four communication patterns (unary, server streaming, client streaming, and bidirectional) cover every scenario without requiring separate WebSocket infrastructure alongside your API.

### The Hybrid Reality

Most sophisticated systems use multiple approaches, each where it genuinely wins:

```plaintext
A Large Engineering Organization

Public REST API
  External developers, partners, open integrations
  JSON over HTTPS. OpenAPI documentation.
  CDN caching for frequently accessed resources.

Internal gRPC Network
  Service-to-service communication
  Auth service, payment service, notification service,
  fraud detection: all communicating with typed contracts
  over efficient binary protobuf on HTTP/2. Real-Time Layer
  WebSockets for bidirectional features (live chat, collaboration)
  SSE for one-directional feeds (notifications, live dashboards)
  gRPC streaming for real-time data with typed contracts

Mobile API
  REST for standard operations (profile, settings, history)
  gRPC for high-frequency or large payload calls
  SSE for notification streaming
```

There's no architectural purity requirement. Each layer uses what fits its requirements. The discipline is in making these choices deliberately rather than by habit or default.

---

## Conclusion

The history of how clients and servers communicate is the history of engineers discovering the limitations of existing tools and building better ones.

HTTP/1.1 gave us a universal request-response protocol that built the web. Its text-based format and sequential connection model worked well for the web of the 1990s and 2000s. As applications became more complex and performance expectations rose, its limitations became bottlenecks.

HTTP/2 rebuilt the transport layer with binary framing and multiplexing, eliminating head-of-line blocking at the HTTP level, compressing headers, and enabling server push. HTTP/3 took this further by replacing TCP with QUIC, addressing the remaining head-of-line blocking at the transport level and making connection establishment faster.

JSON became the dominant data format because of its human readability and universal support. Protocol Buffers emerged as an alternative for contexts where JSON's verbosity and lack of schema enforcement create real problems: internal services, high-frequency communication, constrained networks, and teams needing compile-time contract enforcement.

REST codified HTTP's architectural strengths into a style that made APIs universally accessible and HTTP-native. Its success wasn't purely technical: it aligned with what developers already understood and what the HTTP ecosystem already supported. Its limitations in data fetching efficiency and real-time communication opened the door for GraphQL and streaming alternatives.

GraphQL solved REST's overfetching and underfetching problems by inverting control: the client specifies exactly what it needs. WebSockets solved REST's inability to support genuine bidirectional real-time communication. Server-Sent Events provided a simpler real-time option for one-directional streaming. gRPC combined Protocol Buffers, HTTP/2, and RPC semantics into a framework that excels at typed service-to-service communication at scale.

Understanding all of these tools, along with why each was built, what problem it solves, and where it struggles, is what enables you to make deliberate architectural decisions rather than defaulting to whatever is most familiar.

The right communication approach is always the one that fits the specific requirements of the system you're building: the clients consuming it, the data being exchanged, the network conditions it operates in, the teams building and maintaining it, and the operational complexity you are prepared to manage.

That clarity of fit is what engineering judgment looks like in practice.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How Clients and Servers Communicate: Full Handbook on HTTP/1.1, HTTP/2, REST, WebSockets, GraphQL, gRPC, and Protocol Buffers",
  "desc": "You've built and consumed APIs. You know what a GET request is, what a JSON response looks like, and how to add an Authorization header. You've used REST, maybe tried GraphQL, and perhaps heard of gRP",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-clients-and-servers-communicate-handbook-http-rest-websockets-graphql-grpc-protobuf.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
