---
lang: en-US
title: "Third Project - Building Messages"
description: "(9/10) How to Build and Deploy a Smart Contract With Rust and the Gear Protocol"
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
      content: "(9/10) How to Build and Deploy a Smart Contract With Rust and the Gear Protocol"
    - property: og:description
      content: "Third Project - Building Messages"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/build-and-deploy-smart-contract-rust-gear-protocol/third-project-building-messages.html
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
  url="https://freecodecamp.org/news/build-and-deploy-smart-contract-rust-gear-protocol#heading-third-project-building-messages"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2024/06/How-to-Build-and-Deploy-a-Smart-Contract-With-Rust-and-the-Gear-Protocol-Cover.png"/>

In our last project `input-msg`, we didn't keep track of the messages that got sent. So in this project, we'll cover the metadata and state.

Run the command below to create your project in <VPIcon icon="fas fa-folder-open"/>`freecodecamp-gear-protocol`:

```sh
cargo new --lib messages
```

Next, add your **build.rs** file, and make the workspace dependencies available to the <VPIcon icon="fas fa-folder-open"/>`/freecodecamp-gear-protocol/messages`.

---

## Adding Metadata to Messages

To setup a metadata for your project, you need to create an additional crate to manage that, so `cd` into <VPIcon icon="fas fa-folder-open"/>`messages`, and run the command below.

```sh
cargo new --lib io
```

In your `freecodecamp-gear-protocol/messages/io/`<VPIcon icon="iconfont icon-toml"/>`Cargo.toml`, copy and paste the following code:

```toml title="messages/io/Cargo.toml"
[package]
name = "messages-io"
version.workspace = true
edition.workspace = true


[dependencies]
gstd.workspace = true
gmeta.workspace = true
```

Here, I changed the name from `io` to `messages-io`, and the reason is for me to identify, and separate it for other `io`'s in the workspace. And add the dependencies.

In order to use the `io` in your workspace, you need to go the <VPIcon icon="fas fa-folder-open"/>`freecodecamp-gear-protocol/`<VPIcon icon="iconfont icon-toml"/>`Cargo.toml`, and add a path from your `io` to your workspace, which you can then use in any of the projects that need `struct`, `enum`, and `method`.

In <VPIcon icon="fas fa-folder-open"/>`freecodecamp-gear-protocol/`<VPIcon icon="iconfont icon-toml"/>`Cargo.toml`:

```toml title="Cargo.toml"
[workspace]
resolver = "2"
members = ["receive-joke","input-msg"]


[workspace.package]
name = "freecodecamp-gear-protocol"
version = "0.1.0"
edition = "2021"
authors = ["Rocky Essel"]
license = "MIT"
publish = false

[workspace.dependencies]
# Internal Crates
messages-io={path = "messages/io"} < ---- Here

# External Crates
gstd = "1.4.1"
gmeta = "1.4.1"
gtest  = "1.4.1"
gear-wasm-builder = "1.4.1"
parity-scale-codec = { version = "3.6.12", default-features = false }
scale-info = { version = "2.11.3", default-features = false }
```

And that's the `Internal Crate` I talked about earlier. Next, you need to include the `messages-io` in your `messages` project, like below:

```toml
[package]
name="messages"
version.workspace = true
edition.workspace = true
authors.workspace = true
license.workspace = true
publish.workspace = true


[dependencies]
gstd.workspace = true
messages-io.workspace = true <---

[build-dependencies]
gear-wasm-builder.workspace = true
messages-io.workspace = true < ---
```

The reason for adding `messages-io.workspace` to both the `[dependencies]` and `[build-dependencies]` is to make the `struct`, `enums`, `pub variables` and `methods` accessible to <VPIcon icon="fas fa-folder-open"/>`messages/src/`<VPIcon icon="fa-brands fa-rust"/>`lib.rs`, and <VPIcon icon="fas fa-folder-open"/>`messages/`<VPIcon icon="fa-brands fa-rust"/>`build.rs` using `messages-io.workspace`.

---

## Metadata in <VPIcon icon="fas fa-folder-open"/>`io/src/`<VPIcon icon="fa-brands fa-rust"/>`lib.rs`

```rs title="io/src/lib.rs"
#![no_std]

use gmeta::{InOut, Metadata, Out};
use gstd::{prelude::*, ActorId, Vec};

pub struct MessageMetadata;

pub static mut MESSAGES: Vec<User> = Vec::new();

pub struct Message {
    pub id: ActorId,
    pub content: String,
}

impl Metadata for MessageMetadata {
    type Init = InOut<Message, String>;
    type Handle = InOut<Message, String>;
    type State = Out<Vec<Message>>;
    type Reply = ();
    type Others = ();
    type Signal = ();
}
```

To implement the logic of the message-handling system for your program or smart contract, understanding how to set the metadata of your program is crucial.  
Therefore, much attention is needed here.

The `MessageMetadata` struct you've defined implements the `Metadata` trait, which then structures the message metadata for the program. Also, a mutable static variable `MESSAGES` is declared to store all the messages you and your users send to the program. And since it’s a mutable static variable, unsafe code will be required to modify it due to Rust's safety guarantees around mutable static variables.

The `Message` struct is defined with two fields: `id` (sender's identifier) and `content` (the message text).

The `Metadata` trait is implemented for `MessageMetadata`, defining several associated types. The `Init` type is set to `InOut<MessageInit, String>`, specifying the input-output types for the initialization phase.

This means that when the contract is initialized, it will accept a `MessageInit` type and return a `String`. The `Handle` type is set to `InOut<Message, String>`, specifying the input-output types for handling messages. It accepts a `Message` type as input and returns a `String`.

The `State` type is set to `Out<Vec<Message>>`, defining the state output type, meaning that the state of the contract will be a vector of `Message` objects, and it doesn’t accept any input to retrieve this state. The `Reply`, `Others`, and `Signal` types are all set to `()`, indicating no additional reply, other types, or signals are used in this case.

---

## Further Context of its usage

In this system, the metadata definition specifies how the smart contract should handle initialization and message handling. During the initialization phase (`Init`), when the contract is deployed on the Vara Network, it uses the `Init` type to set up the initial state. The input is expected to be of type `MessageInit`, and the output will be a `String`. During deployment, you provide your ID and message content, which the contract processes using the `init()` method.

After deployment, the contract can handle new messages using the `Handle` type, which expects a `Message` type as input and returns a `String` as a response. This functionality is useful for adding new messages to the `MESSAGES` vector. For state management (`State`), the contract’s state is a list of messages (`Vec<Message>`), and it doesn’t accept any input to retrieve the state but outputs the current state when queried.

So to summarize, the code in <VPIcon icon="fas fa-folder-open"/>`freecodecamp-gear-protocol/messages/io/src/`<VPIcon icon="fa-brands fa-rust"/>`lib.rs` defines the structure and behavior of a message-handling smart contract, specifying how it initializes, handles messages, and manages state.

---

## Building the Metadata

In order to build your project with the metadata, you need to modify the <VPIcon icon="fa-brands fa-rust"/>`build.rs`, which initially looks like below:

```rs title="build.rs"
fn main() {
    gear_wasm_builder::build();
}
```

There's nothing wrong with using the above code, but if you plan to build your program and deploy on the blockchain to use it on the client or anywhere else, it would be impossible to interact with your smart contract if the metadata is not defined. Think of it like `ABI` in other blockchain environment.

So replace the code with:

```rs
use messages_io::MessageMetadata;

fn main() {
    gear_wasm_builder::build_with_metadata::<MessageMetadata>();
}
```

Finally, you would be handling the logic for your smart contract in the <VPIcon icon="fas fa-folder-open"/>`messages/src/`<VPIcon icon="fa-brands fa-rust"/>`lib.rs` using the `handle()` function.

Here is the code for the <VPIcon icon="fa-brands fa-rust"/>`lib.rs`:

```rs title="messages/src/lib.rs"
#![no_std]

use gstd::{exec, msg, prelude::*, ActorId};

use messages_io::*;

#[no_mangle]
extern "C" fn init() {
    let init: Message = msg::load().expect("Unable to decode Message");
    let init_message = Message {
        id: init.id,
        content: init.content,
    };

    unsafe { MESSAGES.push(init_message) };    
    msg::reply_bytes("Successfully initialized", 0).expect("Failed to initialize successfully.");
}


#[no_mangle]
extern "C" fn handle() {

    let message_handler: Message = msg::load().expect("Unable to decode Message");
    let message = Message {
        id: message_handler.id,
        content: message_handler.content,
    };
    unsafe { MESSAGES.push(message) };
    msg::reply_bytes("Message sent successfully.", 0).expect("Failed to send  reply message.");
}


#[no_mangle]
extern "C" fn state() {
    msg::reply(unsafe { MESSAGES.clone() }, 0).expect("Failed to share state");
}
```

---

## Initialization Function (`init`)

```rs
#[no_mangle]
extern "C" fn init() {
    let init: Message = msg::load().expect("Unable to decode Message");
    let init_message = Message {
        id: init.id,
        content: init.content,
    };

    unsafe { MESSAGES.push(init_message) };
    msg::reply_bytes("Successfully initialized", 0).expect("Failed to initialize successfully.");
}
```

The `init` function is the entry point for initializing the smart contract. It is marked with `#[no_mangle]` to prevent Rust from applying name mangling, making the function accessible from the smart contract runtime.

The function begins by loading the initial message from the input payload using `msg::load()`. This message is expected to be of type `Message`, and if decoding fails, the function will panic with an error message. Next, a new `Message` instance is created from the loaded data. This new message is then added to the global `MESSAGES` vector, which is a mutable static variable marked as unsafe due to potential data races. Finally, the function sends a reply indicating successful initialization using `msg::reply_bytes`. If this reply fails, the function will panic.

---

## Message Handling Function (`handle`)

```rs
#[no_mangle]
extern "C" fn handle() {
    let message_handler: Message = msg::load().expect("Unable to decode Message");
    let message = Message {
        id: message_handler.id,
        content: message_handler.content,
    };
    unsafe { MESSAGES.push(message) };
    msg::reply_bytes("Message sent successfully.", 0).expect("Failed to send  reply message.");
}
```

The `handle` function is designed to handle incoming messages after the contract is deployed. Like the `init` function, it is marked with `#[no_mangle]` to ensure it can be called from the smart contract runtime. The function begins by loading the incoming message from the input payload. This message is decoded into a `Message` struct, and if decoding fails, the function will panic.

A new `Message` instance is then created from the decoded data and added to the global `MESSAGES` vector using an unsafe block. The function then sends a reply indicating that the message was sent successfully. If the reply fails, the function will panic.

---

## State Query Function (`state`)

```rs
#[no_mangle]
extern "C" fn state() {
    msg::reply(unsafe { MESSAGES.clone() }, 0).expect("Failed to share state");
}
```

The `state` function allows querying the current state of the smart contract. It is also marked with `#[no_mangle]` for the same reasons as the previous functions. The function replies with a cloned version of the global `MESSAGES` vector, containing all the messages that have been added so far. This is done within an unsafe block due to the mutable static variable. If the function fails to send the state, it will panic.

So this code simply defines a smart contract with three main functions: `init` for initialization, `handle` for processing incoming messages, and `state` for querying the current state of the contract. Where each function carefully manages the global `MESSAGES` vector.

---

## Deployment on the Vara Network

<SiteInfo
  name="Gear | The Most Advanced Platform for dApp development - 1 June 2024"
  desc="Use Loom to record quick videos of your screen and cam. Explain anything clearly and easily - and skip the meeting. An essential tool for hybrid workplaces."
  url="https://loom.com/"
  logo="https://cdn.loom.com/assets/favicons-loom/android-chrome-192x192.png"
  preview="https://cdn.loom.com/assets/img/og/loom-banner.png"/>

Now you're done with this project, and hope you learned and have understood most of what I've written. In our next project, you'll be building something a bit more complex than this. So let's begin.

[<VPIcon icon="fas fa-globe"/>Here is the program deployed on Vara Network](https://idea.gear-tech.io/programs/0x58acd467aa011554b0dc167f741e745b336a03943df6f1eba635e9c28ca9824e), and this is the [<VPIcon icon="fas fa-globe"/>entire repository for the 3 projects](https://github.com/rockyessel/freecodecamp-gear-protocol) we've built so far. The next project is going to be stand-alone project so you won't use the workspace.
