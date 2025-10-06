---
lang: en-US
title: "Vara Network's Role"
description: "(5/10) How to Build and Deploy a Smart Contract With Rust and the Gear Protocol"
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
      content: "(5/10) How to Build and Deploy a Smart Contract With Rust and the Gear Protocol"
    - property: og:description
      content: "Vara Network's Role"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/build-and-deploy-smart-contract-rust-gear-protocol/vara-networks-role.html
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
  url="https://freecodecamp.org/news/build-and-deploy-smart-contract-rust-gear-protocol#heading-vara-networks-role"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2024/06/How-to-Build-and-Deploy-a-Smart-Contract-With-Rust-and-the-Gear-Protocol-Cover.png"/>

In Vara, all participants, including user interfaces (through `@gear-js/api`) and smart contracts (programs & `gstd`), are considered as actors. Another point to know is that, actors don't directly call functions within other actors (as in, programs interacting with other programs or even users).

Instead, they send messages containing data or instructions. So in our explanation of the message-based communication, Vara serves as the underlying decentralized network infrastructure for communication of our system (dApps). It provides a secure and reliable platform for message transmission across distributed network of nodes. And since Vara utilize a consensus mechanism NPoS (Nominated Proof-of-Stake), it ensures network security and transaction validation.
