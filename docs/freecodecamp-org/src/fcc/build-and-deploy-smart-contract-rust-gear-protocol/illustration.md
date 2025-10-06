---
lang: en-US
title: "Illustration"
description: "(4/10) How to Build and Deploy a Smart Contract With Rust and the Gear Protocol"
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
      content: "(4/10) How to Build and Deploy a Smart Contract With Rust and the Gear Protocol"
    - property: og:description
      content: "Illustration"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/build-and-deploy-smart-contract-rust-gear-protocol/illustration.html
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
  url="https://freecodecamp.org/news/build-and-deploy-smart-contract-rust-gear-protocol#heading-illustration"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2024/06/How-to-Build-and-Deploy-a-Smart-Contract-With-Rust-and-the-Gear-Protocol-Cover.png"/>

Let's discuss more about the diagrams below, and how they each interact with each other.

![UI Update](https://freecodecamp.org/news/content/images/2024/04/image-1.png)

This illustration above is just a bird's eye view of how communication flows from the user to the program**.** I'll provide a complete illustration for more clarity. But before that, let's break the overview illustration into three stages.

---

## Initial Interaction Stage

As said earlier, this is when the user interacts with the program, both `@gear-js/api` and `gstd`.

![Initial Interaction Stage](https://freecodecamp.org/news/content/images/2024/03/image-124.png)

---

## Business/Program Logic

This section depicts the communication between the program and Gear within Vara Network. The `gstd` is used by the program to access the transmitted message (`msg::load()`) from the initial stage to perform business logic.

![Business/Program Logic](https://freecodecamp.org/news/content/images/2024/03/image-126.png)

---

## Reply (Response)

This final stage shows how user feedback is delivered to the user or program. `@gear-js/api` translates it if necessary, and then updates the dApp's UI with the results. This allows the user to see the outcome of their action within the dApp.

![Reply(Response)](https://freecodecamp.org/news/content/images/2024/03/image-127.png)

That's great, right? This should help you understand how messages are passed from the client to the program. But what does Vara Network role mean here? Earlier I said that, the message object get transmitted across the Vara Network, but I didn't say how. Let's explain that.
