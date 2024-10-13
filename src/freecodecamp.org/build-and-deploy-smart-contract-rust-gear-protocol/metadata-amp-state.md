---
lang: en-US
title: "Metadata & State"
description: "(8/10) How to Build and Deploy a Smart Contract With Rust and the Gear Protocol"
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
      content: "(8/10) How to Build and Deploy a Smart Contract With Rust and the Gear Protocol"
    - property: og:description
      content: "Metadata & State"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-and-deploy-smart-contract-rust-gear-protocol/metadata-amp-state.html
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
  url="https://freecodecamp.org/news/build-and-deploy-smart-contract-rust-gear-protocol#heading-metadata-amp-state"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2024/06/How-to-Build-and-Deploy-a-Smart-Contract-With-Rust-and-the-Gear-Protocol-Cover.png"/>

Metadata and state goes hand in hand with each other. In order for your client application to allow users to interact or request data(state) from your smart contract, you need to define both the metadata and state, and even if the state is defined, and the metadata was not provided, you cannot access the any data.

So let's take each step by step.

---

## Metadata

In the Gear Protocol world, metadata is like a blueprint for defining how different parts of a decentralized app (dApp) talk to each other. It's similar to how interfaces or types work in TypeScript. These blueprints describe how things like initial data type to expect, handling messages, and swapping data happen in the dApp, whether `In`, `Out`, and `InOut`.

When we make clear blueprints, it helps developers make sure that all the different parts of the dApp understand each other's data formats. This makes it easy for the smart contract (program-actor) and the client side app to share data smoothly.

To create these blueprints for your program, we use the `gmeta` tool. It helps us define these blueprints by outlining how different interactions work and what kinds of data they involve.

So, think of metadata in your program as similar to how interfaces/types work in TypeScript. They help organize how the different parts of your dApp communicate and understand each other's data.

---

## Example Of A Metadata

```rs
use gmeta::{InOut, Metadata, Out};

pub struct ProgramMetadata;

// Be sure to describe all the types.
// But if any of the endpoints is missing in your program, you can use ();
// as indicated in the case of `type Signal`.

impl Metadata for ProgramMetadata {
    type Init = InOut<MessageInitIn, MessageInitOut>;
    type Handle = InOut<MessageIn, MessageOut>;
    type Others = InOut<MessageAsyncIn, Option<u8>>;
    type Reply = String;
    type Signal = ();
    type State = Out<Vec<Wallet>>;
}
```

The above is an example of how it is defined. Don't worry if you don't understand it now, I'll cover more into details later. Now let's talk about the state.

---

## State

In Gear Protocol, the `state` function serves as a dedicated storage space within a program. This storage allows us to store and retrieve data as needed. Since this data is stored in persistent memory, it remains accessible even after the contract stops running. What's fascinating is that anyone with access to the blockchain can view this stored data. The `state` function doesn't alter or modify the blockchain itself. Instead, it simply provides a way to access stored data within the program.

Here is an example of a `state` function:

```rs
// Describe state structure
#[derive(TypeInfo, Decode, Encode, Clone)]
pub struct Messages {
    pub id: ActorId,
    pub content: String,
}

// Declare and initialize the state
static mut MESSAGES: Vec<Messages> = Vec::new();

#[no_mangle]
extern "C" fn state() {
    msg::reply(unsafe { MESSAGES.clone() }, 0).expect("Failed to share state");
}
```

When the `state` function is called, it returns a list of `wallets` data stored within the program. This means that once a program is deployed on the blockchain, anyone can read its state.

Additionally, developers have the flexibility to create custom programs that can read the state. This empowers you and I to tailor our data access methods according to the specific needs for our dApp, even if the primary program undergoes changes.

The key takeaway is that, the `state` function facilitates access to data stored in smart contracts. It's worth noting that both users and other programs can access the state of a program, providing a versatile means of interacting with stored data.
