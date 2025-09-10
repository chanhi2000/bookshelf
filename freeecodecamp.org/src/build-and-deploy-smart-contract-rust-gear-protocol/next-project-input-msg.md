---
lang: en-US
title: "Next Project - input-msg"
description: "(7/10) How to Build and Deploy a Smart Contract With Rust and the Gear Protocol"
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
      content: "(7/10) How to Build and Deploy a Smart Contract With Rust and the Gear Protocol"
    - property: og:description
      content: "Next Project - input-msg"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-and-deploy-smart-contract-rust-gear-protocol/next-project-input-msg.html
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
  url="https://freecodecamp.org/news/build-and-deploy-smart-contract-rust-gear-protocol#heading-next-project-input-msg"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2024/06/How-to-Build-and-Deploy-a-Smart-Contract-With-Rust-and-the-Gear-Protocol-Cover.png"/>

Just like the illustration earlier, you're going to interact with your program by sending an input value to your smart contract deployed on [<FontIcon icon="fas fa-globe"/>IDEA](https://idea.gear-tech.io/programs?node=wss%3A%2F%2Ftestnet.vara.network). [<FontIcon icon="fas fa-globe"/>IDEA](https://idea.gear-tech.io/programs?node=wss%3A%2F%2Ftestnet.vara.network) is your deployment environment where you deploy your smart contract on the Vara Network.  
The point here is for you to load input values from your user, and process it by concatenating a string to the user's input value: "We've received your query. {user's-input}".

This is the reply you'll send back to the user that sends a message (input value).

So in your <FontIcon icon="fas fa-folder-open"/>`freecodecamp-gear-protocol` directory, run the command below to add another member to your <FontIcon icon="fas fa-folder-open"/>`freecodecamp-gear-protocol/`<FontIcon icon="iconfont icon-toml"/>`Cargo.toml`.

```sh
cargo new --lib input-msg
```

After adding another member or project in the <FontIcon icon="fas fa-folder-open"/>`freecodecamp-gear-protocol`, your path should be <FontIcon icon="fas fa-folder-open"/>`freecodecamp-gear-protocol/input-msg`.

Earlier, I made mention of how to access input values into the smart contract or program by using `gstd`, which has a function or method called `load()`. For the next step, clear your <FontIcon icon="fas fa-folder-open"/>`freecodecamp-gear-protocol/input-msg/src/`<FontIcon icon="fa-brands fa-rust"/>`lib.rs`, and paste the following code and run `cargo check`.

```rs title="input-msg/src/lib.rs"
#![no_std]

use gstd::{msg, prelude::*};

#[no_mangle]
extern "C" fn handle() {
    let new_msg = msg::load().expect("Unable to create string");
    let reply_msg = format!("We've received your query {}", new_msg);
    msg::reply_bytes(reply_msg, 0).expect("Unable to reply.");
}
```

The check fails, but why? Well, the `load()` function has a type of `unknown`. And since Rust is a strongly typed language, it has to always know the type before hand, which wasn't the case, so it failed to build the project.

This should tell you that the `load()` doesn't have a type, and it is up to you to set the right data type, and failure to do so would result in some frustrating errors like below.

---

## Debugging

Now if you were to use a single project and not a workspace, then debugging the error might have easy like below.

```plaintext 
 error[E0282]: type annotations needed
  --> C:\Users\user\Desktop\2024\web3\re-gear\input-msg\src\lib.rs:7:9
   |
 7 |     let new_msg = msg::load().expect("Unable to create string");
   |         ^^^^^^^
   |
 help: consider giving `new_msg` an explicit type
   |
 7 |     let new_msg: /* Type */ = msg::load().expect("Unable to create string");
   |                ++++++++++++
```

But since you and I are using a workspace, it makes debugging a little difficult. This is my error message i got, when dubgging this error.

```plaintext

  error[E0275]: overflow evaluating the requirement `gstd::parity_scale_codec::Compact<_>: gstd::Decode`
    |
    = help: consider increasing the recursion limit by adding a `#![recursion_limit = "256"]` attribute to your crate (`input_msg`)
    = note: required for `gstd::parity_scale_codec::Compact<_>` to implement `gstd::Decode`
    = note: 125 redundant requirements hidden
    = note: required for `gstd::parity_scale_codec::Compact<<_ as CompactAs>::As>` to implement `gstd::Decode`

  For more information about this error, try `rustc --explain E0275`.
  error: could not compile `input-msg` (lib) due to 1 previous error
  warning: build failed, waiting for other jobs to finish...
  error: cargo command run failed: exit status: 101
warning: build failed, waiting for other jobs to finish...

```

And if you look closely, you can tell that the `input-msg` is what creating the error. In this case, run `rustc --explain E0275`, which output an suggestion like this

```plaintext
An evaluation of a trait requirement overflowed.

Erroneous code example:

trait Foo {}

struct Bar<T>(T);

impl<T> Foo for T where Bar<T>: Foo {}

This error occurs when there was a recursive trait requirement that overflowed before it could be
evaluated. This often means that there is an unbounded recursion in resolving some type bounds.

To determine if a T is Foo, we need to check if Bar<T> is Foo. However, to do this check, we need to
determine that Bar<Bar<T>> is Foo. To determine this, we check if Bar<Bar<Bar<T>>> is Foo, and so on. This
is clearly a recursive requirement that can't be resolved directly.

Consider changing your trait bounds so that they're less self-referential.
```

Now, though, compared to the first error message, this message doesn't provide a direct solution, it does tells you that, there's a type error in your code. And the reason is that, the `load()` can load any data type, so you should always defined a type for it.

```rs title="input-msg/src/lib.rs"
#![no_std]

use gstd::{msg, prelude::*};

#[no_mangle]
extern "C" fn handle() {
    let new_msg: String = msg::load().expect("Unable to create string");
    let reply_msg = format!("We've received your query {}", new_msg);
    msg::reply_bytes(reply_msg, 0).expect("Unable to reply.");
}
```

In the above code, you've added a type `String` to the `new_msg` because that's the `type` you're expecting. Now run the build command, and deploy the file `.opt.wasm` to `IDEA`.

```plaintext title="file-structure"

.freecodecamp-gear-protocol
├── receive-joke
├── Cargo.toml
├── input-msg
│   └── ...
└── target
    ├── ...
    └── wasm32-unknown-unknown
        ├── ...
        └── release
            ├── input_msg.opt.wasm <--- Optimized for deployment.         
            ├── input_msg.wasm
            ├── receive_joke.opt.wasm
            └── receive_joke.wasm

```

When you're done, go to your program and click on the **Send Messages**. Type any value into the `payload` field, and it should be a `type` of `String`.

Submit and approve and head back to your program, then select your `reply_message` box and you should see your `reply message`.

![Smart Contract - Reply Message](https://freecodecamp.org/news/content/images/2024/04/Screenshot-2024-04-06-080437.png)

[<FontIcon icon="fas fa-globe"/>You can find the program here on the Vara Network](https://idea.gear-tech.io/programs/0x25629eaa3c7a51ec407f89bbaae7ccb4f58c6026283758d0fccb50e3bb042bdd).