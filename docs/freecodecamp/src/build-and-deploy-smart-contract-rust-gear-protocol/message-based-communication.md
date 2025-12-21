---
lang: en-US
title: "Message-based Communication"
description: "(3/10) How to Build and Deploy a Smart Contract With Rust and the Gear Protocol"
category: 
  - Rust
  - Article(s)
tag: 
  - blog
  - freecodecamp.org
  - rust
  - rs
head:
  - - meta:
    - property: og:title
      content: "(3/10) How to Build and Deploy a Smart Contract With Rust and the Gear Protocol"
    - property: og:description
      content: "Message-based Communication"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/build-and-deploy-smart-contract-rust-gear-protocol/message-based-communication.html
date: 2024-06-04
isOriginal: false
cover: https://freecodecamp.org/news/content/images/2024/06/How-to-Build-and-Deploy-a-Smart-Contract-With-Rust-and-the-Gear-Protocol-Cover.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "How to Build and Deploy a Smart Contract With Rust and the Gear Protocol",
  "desc": "Smart contracts are like digital agreements that run on blockchain technology, making transactions automatic and secure. While many people use Ethereum and Solidity to create these contracts, there are other options that can be just as powerful.  One...",
  "link": "/freecodecamp.org/build-and-deploy-smart-contract-rust-gear-protocol/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build and Deploy a Smart Contract With Rust and the Gear Protocol"
  desc="Smart contracts are like digital agreements that run on blockchain technology, making transactions automatic and secure. While many people use Ethereum and Solidity to create these contracts, there are other options that can be just as powerful.  One..."
  url="https://freecodecamp.org/news/build-and-deploy-smart-contract-rust-gear-protocol#heading-message-based-communication"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2024/06/How-to-Build-and-Deploy-a-Smart-Contract-With-Rust-and-the-Gear-Protocol-Cover.png"/>

Similarly, the Gear Protocol operates based on user or program interactions. 

::: note

Programs on Gear can also interact with each other.  
So here is a detailed explanation to the whole communication flow in Gear.

:::

---

## User Interaction and @gear-js/api

When a user (actor) interacts with the dApp's UI elements (like buttons or forms), `_@gear-js/api_` (which is integrated into the UI) captures these interactions. Based on the interactions, it extracts information and potentially pre-defined message formats, and then contracts a message object containing the user's intent or request.

---

## How to Send Messages

The constructed message object encapsulates the user's input and becomes the data `@gear-js/api` transmits across the Vara Network to the Gear crate within the program.

---

## How the Program Receives and Processes Messages

Gear (`crate`) delivers the message object to the appropriate program deployed on the Vara Network based on the location the user initiated the action. The Gear crate within the program utilizes functions like `msg::load()` and access the delivered message object, which the program extracts information (such as `payload`, `source`, `messsageId`) from, and process it according to how it's designed by the developer.

---

## How to Generate a Reply

Based on the processed input, the program creates a new message object containing a reply (`response` in `web2`) to the user's action or interaction (called `reply`) to or for the user.

Note, the program typically doesn't send the original message object back, it generates a new one based message received, which a reply is sent back to be received by `@gear-js/api` using the `gstd` crate from the program utilizing functions like the `msg::reply` or `msg::reply_bytes`.

---

## UI Update

`@gear-js/api`, within the dApp, receives the reply message object delivered by the `gstd` crate from the program across the Vara Network and extracts the response data from the reply object, and finally updates the UI reflecting the program's response to the user's interaction.

And that's pretty much the communication between the Users, Client(dApp), Gear Protocol(`gstd`), and finally Vara Network.
