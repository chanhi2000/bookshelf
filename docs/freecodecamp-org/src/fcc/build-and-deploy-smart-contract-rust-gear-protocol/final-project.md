---
lang: en-US
title: "Final Project - Battle Showdown"
description: "(10/10) How to Build and Deploy a Smart Contract With Rust and the Gear Protocol"
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
      content: "(10/10) How to Build and Deploy a Smart Contract With Rust and the Gear Protocol"
    - property: og:description
      content: "Final Project - Battle Showdown"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/build-and-deploy-smart-contract-rust-gear-protocol/final-project.html
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
  url="https://freecodecamp.org/news/build-and-deploy-smart-contract-rust-gear-protocol#heading-final-project"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2024/06/How-to-Build-and-Deploy-a-Smart-Contract-With-Rust-and-the-Gear-Protocol-Cover.png"/>

In this final project, you'll build a very simple game: where you (`player`) fights with the `boss`. So here is a simple layman's explanation of the game mechanics.

---

## Game Description

This game is a one-on-one battle between a player and a boss. To begin, the player selects their character from three options: Warrior, Mage, or Archer. Once the player's character data is stored in the program, the game begins.

In the game, the player immediately faces the boss, who starts with 10 lives (represented as an integer), while the player begins with 10 lives by default. The objective is to defeat the boss using a specific rule: the boss has weaknesses represented by letters (X, Y, Z), each associated with a random number.

During gameplay, if the player enters one of these letters, for example, 'Y' with a value of 4, and the boss starts with 0 lives, the program subtracts 4 lives from the boss, leaving 6. Similarly, when the player makes a move with a letter, the boss also makes a move with the a random letter with an associated value added to it.

The player progresses to the next level upon defeating the boss, continuing the battle with new challenges. I call this game Battle Showdown 🤣😁😂.

---

## **Battle Showdown** Mechanics Summary

### Player and Boss Lives

- Player starts with 10 lives.
- Boss starts with 10 lives.

### Weaknesses and Values

- Boss and the player has weaknesses represented by letters ( `X`, `Y`, `Z`), each associated with a random number.

### Gameplay

- Player inputs a letter (for example, `'Y'`) and the associated value (for example, `4`) is subtracted from the boss's lives.
- Boss retaliates with a letter and the same value is subtracted from the player's lives.
- The objective is for the player to reduce the boss's lives to 0 to progress to the next level.

---

## Match Equation

Let's define the key variables:

- (`Lp`) = Player's current lives.
- (`Lb`) = Boss's current lives.
- (`V`) = Value associated with the letter representing the attack.

::: tabs

@tab Initial conditions:

- ( `Lp` = 10 )
- ( `Lb` = 10 )

@tab Player's turn:

- Player selects a letter with an associated value (`V`).
- Boss's lives are reduced: (`Lb` = `Lb` - `V`).

@tab Boss's retaliation:

- Boss selects a letter (same value (`V`)).
- Player's lives are reduced: (`Lp` = `Lp` - `V`).

:::

This continues until either ( `Lb` ) (boss's lives) or ( `Lp` ) (player's lives) reaches 0. ### Equations

After the player's attack and the Boss's retaliation:  
\[`Lb` = `Lb` - `V`\]  
\[`Lp` = `Lp` - `V`\]

The game loop continues with the player and boss exchanging moves. Repeat until `Lb` `<= 0` or `Lp` `<= 0`

---

## Example

If the player inputs `'Y'` with a value of `4`:

- Initial: ( `Lp` = 10 ), ( `Lb` = 10 )
- Player's attack: ( `Lb` = 10 - 4 = 6 )
- Boss's retaliation: ( `Lp` = 10 - 4 = 6 )

Next move:

- If the player inputs another value, let's say: `'X'` with a value of `5`:
- Player's attack: ( `Lb` = 6 - 5 = 1 )
- Boss's retaliation: ( `Lp` = 6 - 5 = 1 )

The player wins as the Boss's lives ( `Lb` ) have reached 0. The match equation for each round of the game can be summarized as:

\[`Lb` = `Lb` - `V`\]  
\[`Lp` = `Lp` - `V`\]

This process is repeated until either the player's lives (( `Lp` )) or the Boss's lives (( `Lb` )) reach 0, determining the winner of the battle.

---

## Windows Error

If you use Windows, you may encounter an error with the <VPIcon icon="fas fa-gears"/>`link.exe`. Honestly, I cannot explain the reason behind the error, but in the Gear docs, it was made clear that Windows users might experience some problems when building their project.

But rest assured, there's a solution, and I'm going to guide you through it. So please follow these steps carefully so you don't have to deal with bugs along the way.

---

## Step 1 - Install WSL via Command Prompt

Open your CLI with administrative privileges, and run the command below:

```sh
wsl --install
```

After excutting the command, run the command below to list other Linux releases.

```sh
wsl -l -o
```

This command shows a list of other Linux distros, and you can select anyone you've used before. If you're new to Linux distros, I recommend selecting the <VPIcon icon="fa-brands fa-ubuntu"/>`Ubuntu-22.04`.

These are just lists and are read-only. In order to select your system, run the command below.

```sh
wsl --install -d {Distribtion Name here(Ubuntu-22.04)}
```

After you're done with the installation, restart your PC. Wait a little while for the terminal to popup and prompt you for your details such as your username and password. If the terminal doesn't open, go to your start menu, and you will find something similar to this in your `Start` menu.

![Ubuntu in start menu](https://freecodecamp.org/news/content/images/2024/04/image-6.png)

After that, the next thing to do is to install Rust on your WSL.

---

## How to Install Rust On Your WSL

To install Rust on your machine, I recommend that whenever you want to install any package, it is best practice to install updates and upgrades to the system before continuing with the installation.

```sh
sudo apt update && sudo apt upgrade -y
```

When you run `sudo apt update && sudo apt upgrade -y`, you first update the package lists to get the latest information about available software packages. Then, if the update is successful, it proceeds to upgrade the installed packages to their latest versions, automatically confirming the upgrades to avoid manual intervention. This is a common and recommended practice to keep your Linux system up-to-date and secure.

---

## Essential Dependencies.

The command below installs essential development tools (`build-essential`, `gcc`, and `make`) and the `curl` utility for making HTTP requests and downloading files. These packages are commonly required for software development, compilation, and system administration tasks.

```sh
sudo apt install curl build-essential gcc make -y
```

After that, run the command in the terminal

```sh
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

In the installation process, you'll be prompted a question: go with the `default` when it happens.

```sh
# 
# 1. Proceed with installation (default) --> Enter
# 2. Customize installation
# 3. Cancel installation.
# 
```

After this prompt, you have successfully installed Rust on the Ubuntu System. Now the next step is to restart your terminal, simply close the current terminal. Open a new one, and run the command below.

```sh
source "$HOME/.cargo/env"
```

What this command source `"$HOME/.cargo/env"` does is to activate the Rust environment. The reason is that the Rust environment comprises essential variables and configurations required for effective Rust usage. Now, once run, there's no output, so you can verify the installation by running the command below.

```sh
rustc -V
#
# rustc -V rustc 1.73.0 (cc66ad468 2024-02-07)
```

When you're done, there're also additional dependencies we have to install. So here, install them.

```sh
# 
# // Install the following.
# 
#  --> rustup toolchain add nightly-2023-09-18
#  --> rustup target add wasm32-unknown-unknown --toolchain nightly-2023-09-18
#  
```

After successfully installing them, head to the next section, which is building a game project.

In your WSL terminal, create your project name `battle-showdown`, and adding all the necessary **toml** files, and dependences. After that, `cd` into your project `battle-showdown` and added another program called **io**, this is where you write your metadate and other complex or simple data-type for your dApp.

```plaintext title="file structure"
battle-showdown
.
├── Cargo.toml
├── io
│   ├── Cargo.toml
│   └── src
│       └── lib.rs
└── src
    └── lib.rs
```

So head-over to to your <VPIcon icon="fas fa-folder-open"/>`io/src/`<VPIcon icon="fa-brands fa-rust"/>`lib.rs` and paste the follow code:

```rs title="io/src/lib.rs"
#![no_std]

use gmeta::Metadata;

pub struct BattleShowdown;

impl Metadata for BattleShowdown {
    type Init = ();
    type Handle = ();
    type State = ();
    type Reply = ();
    type Others = ();
    type Signal = ();
}
```

Here, you have defined a new public struct named `BattleShowdown`. Structs are used to create custom data types by grouping fields of various types together. But in this case, you're providing an implementation for the required types of the `Metadata` trait for the `BattleShowdown` struct: `impl Metadata for BattleShowdown`.

`type Init = ()`, `type Handle = ()`, `type State = ()`, `type Reply = ()`, `type Others = ()`, and `type Signal = ()` specifies that the handlers or functions data type for `BattleShowdown` is of type `()`, which in Rust's unit type, equivalent to `void` in other language such as `TypeScript`.

So for now, we're saying that these handlers do not send or receive data as such. Hence, the code just specifies how `BattlwShowdown` interacts with the system. However, it is worth mentioning that, the `BattleShowdown` struct itself doesn't have any specific initialization data, state, handling behavior, replies, signals, or other associated types defined.

---

## Building Our Game

First off, let's make register the io in your parent directory <VPIcon icon="iconfont icon-toml"/>`cargo.toml`. So head over to <VPIcon icon="iconfont icon-toml"/>`./cargo.toml` and paste the code below:

```toml title="Cargo.toml"
workspace = { members = ["io"] }
[package]
name = "battle-showdown"
version = "0.1.0"
edition = "2021"

[dependencies]
gstd = "1.4.1"
battle-showdown-io={path = "io"}



[build-dependencies]
gear-wasm-builder = "1.4.1"
battle-showdown-io={path = "io"}
```

I've ensured that the "battle-showdown-io" path is included in both the dependencies and build-dependencies sections. This decision was intentional because when it's added solely to build-dependencies, only the structs, enums, and other data types or functions within the build.rs file gain access to them, not the dependencies in your <VPIcon icon="fas fa-folder-open"/>`./src/`<VPIcon icon="fa-brands fa-rust"/>`lib.rs`. This is important because I'll be utilizing `battle-showdown-io` in both build-dependencies (<VPIcon icon="fa-brands fa-rust"/>`build.rs`) and dependencies (<VPIcon icon="fas fa-folder-open"/>`./src/`<VPIcon icon="fa-brands fa-rust"/>`lib.rs`).

This step is crucial because overlooking it can lead to frustrating import errors.

Next, is the file <VPIcon icon="fas fa-folder-open"/>`./io/`<VPIcon icon="fa-brands fa-rust"/>`cargo.toml`, paste the following code below.

```toml title="io/cargo.toml"
[package]
name = "battle-showdown-io"
version = "0.1.0"
edition = "2021"

# See more keys and their definitions at https://doc.rust-lang.org/cargo/reference/manifest.html

[dependencies]
gstd = "1.4.1"
gmeta = "1.4.1"
parity-scale-codec = { version = "3.6.12", default-features = false }
scale-info = { version = "2.11.3", default-features = false }
```

---

## Explaining Metadata For BattleShown

It's crucial to pay closer attention to this section, as I'll shed more light on explaining the metadata types for `BattleShown` and deploying it on the Vara Network.

```rs
#![no_std]

use gmeta::Metadata;

pub struct BattleShowdown;

impl Metadata for BattleShowdown {
    type Init = ();
    type Handle = ();
    type State = ();
    type Reply = ();
    type Others = ();
    type Signal = ();
}
```

---

## Defining Initialization - `Init`

To define the types for this purpose, consider whether your program or smart contract needs to store data or perform actions before the user can interact with it. In the case of this game, the answer is yes.

The game assumes that only one person is playing and does not allow users to create their characters or players. This means that you need to store data before proceeding to use this program, and in this scenario, we need information about the person/developer/actor/user deploying the contract or program, which is you.

Here is the information you'll want to store:

- **playerId - Type: ActorId** <br/>The playerId is actually the address associated with your account, which has the type of `ActorId`.
- **playerName - Type: String** <br/>This has a type of string, pretty much straightforward.
- **playerCharacterType - Type: Enum** <br/>The `playerCharacterType` is an enum that gives the actor an option to select which type they want to be, with options including Mage, Warrior, and Archer.

```rs
#![no_std]

use gmeta::Metadata;

pub struct BattleShowdown;

impl Metadata for BattleShowdown {
    type Init = InOut<InitBattleShowdown, String>;
    type Handle = ();
    type State = ();
    type Reply = ();
    type Others = ();
    type Signal = ();
}

#[derive(Debug, Clone, Copy, Encode, Decode, TypeInfo)]
pub enum CharacterType {
    Warrior,
    Mage,
    Archer,
}


#[derive(Default, Debug, Encode, Decode, TypeInfo)]
pub struct InitBattleShowdown {
    pub player_id: ActorId,
    pub player_character_type: CharacterType,
    pub player_name: String,
}
```

Although I've previously discussed metadata, you might be curious about what `type Init = InOut<InitBattleShowdown, String>;` means. Well, it's nothing complex. Here, we're simply stating that the `init` handle will accept a data type of `InitBattleShowdown` and will respond with a data type of `String`.

Before you continue, one more step remains: implementing a `default trait` for the enum `CharacterType`. This ensures that if the `CharacterType` is not explicitly defined, it defaults to `Warrior`. Simply add the following code to the existing code above:

```rs
impl Default for CharacterType {
    fn default() -> Self {
        CharacterType::Warrior
    }
}
```

---

## Defining the `Handle`

Defining a type for the `handle` function mirrors the process for the `init` function, but the actual implementation is left to the developer, which in this case, is you. After reviewing code and experimenting with different approaches, I discovered a method used by Gear Protocol (which shares similarities with some of their projects) that made more sense.

---

## Action & Event

In their implementation, they utilized Actions and Events. Actions represent a set of operations that the program can perform, while Events are the outcomes of these Actions.

For example, in the context of this game, you could have an action named `Attack` with a corresponding Event named `Attacked`. These could potentially accept parameters and return results.

Therefore, to define the handle type, include the following code in your existing codebase:

```rs
#[derive(Debug, Encode, Decode, TypeInfo)]
pub enum BattleShowdownAction {
    Attack {
        character_hit_power_value: PlayerHitPowerValue,
    },
}
```

Previously, when describing the game mechanics, I introduced a mechanic involving a letter with a randomly assigned number to inject an element of randomness. In this context, these letters correspond to an `ENUM` state of `X`, `Z`, and `Y`.

Therefore, to implement this mechanic, add the following code:

```rs
// ...
#[derive(Debug, Clone, Copy, Encode, Decode, TypeInfo)]
pub enum PlayerHitPowerValue {
    X,
    Y,
    Z,
}
```

When an actor or user decides to attack the boss, they can select from the options provided above, each with a random value. Consequently, each attack on the boss will yield different outcomes due to the variability in these values. Similar to how you implemented a default trait for the `CharacterType`, you should follow suit here.

```rs
impl Default for PlayerHitPowerValue {
    fn default() -> Self {
        PlayerHitPowerValue::X
    }
}
```

---

## Event

As mentioned earlier, events are the outcomes of actions. Unlike the `BattleShowdownAction`, which only had one action, the `BattleShowdownEvent` will encompass more than two actions. Why? Because the game's logic dictates that when the user attacks, the boss also counterattacks. This results in three possible outcomes: either the user loses, the boss is defeated, or the battle continues.

However, the third outcome is contingent upon the first two outcomes.  
Therefore, for the `BattleShowdownEvent`, you will need to define:

```rs
#[derive(Debug, Encode, Decode, TypeInfo)]
pub enum BattleShowdownEvent {
    Attacked {
        id: ActorId,
        character_type: CharacterType,
        name: String,
        player_lives: u32,
        boss_livesL: u32,
    },

    PlayerLost {
        id: ActorId,
        character_type: CharacterType,
        boss_livesL: u32,
        player_lives: u32,
        message: String,
    },

    BossLost {
        character_type: CharacterType,
        player_lives: u32,
        boss_livesL: u32,
        message: String,
    },
}
```

You have one action, but there are three possible events, correct? When the user/actor attacks the boss and the boss counterattacks, if either of them is defeated, the "Attacked" event is returned. However, if the player successfully defeats the boss, the "BossLost" event is returned.  
Now that you have a solid understanding, let's incorporate both the input and output types for the Handle function: `type Handle = InOut<BattleShowdownAction, BattleShowdownEvent>;`.

---

## Defining `State`

As previously mentioned, the state stores information within your program. For `BattleShowdown`, the state you'd want to store includes information about the player, the boss, and the current level.

```rs
#[derive(Default, Debug, Encode, Decode, TypeInfo)]
pub struct BattleShowdownState {
    pub player_id: ActorId,
    pub player_character_type: CharacterType,
    pub current_level: u32,
    pub player_lives: u32,
    pub player_name: String,
    pub boss_lives: u32,
    pub player_hit_power: u32,
    pub boss_hit_power: u32,
}
```

Therefore, whenever you call the state function, you should expect to see the result in this format. Now, add the `BattleShowdownState` to the state in the metadata, like so: `type State = Out<BattleShowdownState>;`.

With that, the setup is complete. Here is the entire code for the <VPIcon icon="fas fa-folder-open"/>`./io/src/`<VPIcon icon="fa-brands fa-rust"/>`lib.rs` file.

```rs :collapsed-lines title="io/src/lib.rs"
#![no_std]

use gmeta::{In, InOut, Metadata, Out};
use gstd::{prelude::*, ActorId};

// Define the main struct for the BattleShowdown
pub struct BattleShowdown;

// Implementing Metadata for BattleShowdown
impl Metadata for BattleShowdown {
    // Define the type for initialization messages
    type Init = InOut<InitBattleShowdown, String>;
    // Define the type for handle messages
    type Handle = InOut<BattleShowdownAction, BattleShowdownEvent>;
    // Define the type for state messages
    type State = Out<BattleShowdownState>;
    type Reply = ();
    type Others = ();
    type Signal = ();
}

// Struct for initializing the BattleShowdown
#[derive(Default, Debug, Encode, Decode, TypeInfo)]
pub struct InitBattleShowdown {
    pub player_id: ActorId,
    pub player_character_type: CharacterType,
    pub player_name: String,
}

// Struct representing the state of the BattleShowdown
#[derive(Default, Debug, Encode, Decode, TypeInfo)]
pub struct BattleShowdownState {
    pub player_id: ActorId,
    pub player_character_type: CharacterType,
    pub current_level: u32,
    pub player_lives: u32,
    pub player_name: String,
    pub boss_lives: u32,
    pub player_hit_power: u32,
    pub boss_hit_power: u32,
}

// Enum representing different character types
#[derive(Debug, Clone, Copy, Encode, Decode, TypeInfo)]
pub enum CharacterType {
    Warrior,
    Mage,
    Archer,
}

// Enum representing different values for player hit power
#[derive(Debug, Clone, Copy, Encode, Decode, TypeInfo)]
pub enum PlayerHitPowerValue {
    X,
    Y,
    Z,
}

// Implementing Default for PlayerHitPowerValue
impl Default for PlayerHitPowerValue {
    fn default() -> Self {
        PlayerHitPowerValue::X
    }
}

// Implementing Default for CharacterType
impl Default for CharacterType {
    fn default() -> Self {
        CharacterType::Warrior
    }
}

// Enum representing different actions in the BattleShowdown
#[derive(Debug, Encode, Decode, TypeInfo)]
pub enum BattleShowdownAction {
    Attack {
        character_hit_power_value: PlayerHitPowerValue,
    },
}

// Enum representing different events in the BattleShowdown
#[derive(Debug, Encode, Decode, TypeInfo)]
pub enum BattleShowdownEvent {
    Attacked {
        id: ActorId,
        character_type: CharacterType,
        name: String,
        player_lives: u32,
        boss_lives: u32,
    },
    PlayerLost {
        id: ActorId,
        character_type: CharacterType,
        boss_lives: u32,
        player_lives: u32,
        message: String,
    },
    BossLost {
        character_type: CharacterType,
        player_lives: u32,
        boss_lives: u32,
        message: String,
    },
}
```

---

## `build.rs`

Import `BattleShowdown` to the <VPIcon icon="fa-brands fa-rust"/>`build.rs` from your parent directory at <VPIcon icon="fas fa-folder-open"/>`./src/`<VPIcon icon="fa-brands fa-rust"/>`build.rs`. If you encounter an import error, make sure that in your <VPIcon icon="iconfont icon-toml"/>`cargo.toml`, you're registering `battle-showdown-io={path = "io"}` there.

```rs title="src/build.rs"
use battle_showdown_io::BattleShowdown;

fn main() {
    gear_wasm_builder::build_with_metadata::<BattleShowdown>();
}
```

That's it for the <VPIcon icon="fa-brands fa-rust"/>`build.rs`, and what it does is to build your project into `wasm` and then build the `metadata` for `BattleShown` for you.

---

## Game Logic Implementation - <VPIcon icon="fas fa-folder-open"/>`./src/`<VPIcon icon="fa-brands fa-rust"/>`lib.rs`

For this section, I'll write the code below, then I'll explain this as we go. There's going to be a problem I'd want you to solve, which will be about the state.

```rs :collapsed-lines title="src/lib.rs"
#![no_std]

use gstd::{exec, msg, prelude::*, ActorId};

use battle_showdown_io::*;

// Function to generate random number between 1 and 3
fn get_random_u32() -> u32 {
    let salt = msg::id();
    let (hash, _num) = exec::random(salt.into()).expect("get_random_u32(): random call failed");
    (u32::from_le_bytes([hash[0], hash[1], hash[2], hash[3]]) % 3) + 1 // Generate random number between 1 and 3
}

#[derive(Debug, Default)]
pub struct BattleShowdown {
    pub player_id: ActorId,
    pub player_character_type: CharacterType,
    pub current_level: u32,
    pub player_lives: u32,
    pub player_name: String,
    pub boss_lives: u32,
    pub character_hit_power_value: PlayerHitPowerValue,
    pub player_hit_power: u32,
    pub boss_hit_power: u32,
    pub game_state: String,
}

static mut BATTLESHOWNDOWN: Option<BattleShowdown> = None;

#[no_mangle]
unsafe extern "C" fn init() {
    let init: InitBattleShowdown = msg::load().expect("Unable to decode InitBattleShowdown");

    let battle_showdown = BattleShowdown {
        player_id: msg::source(),
        player_character_type: init.player_character_type,
        player_name: init.player_name,
        boss_lives: 10,
        player_lives: 10,
        ..Default::default()
    };

    BATTLESHOWNDOWN = Some(battle_showdown);

    msg::reply_bytes("Successfully initialized", 0).expect("Failed to initialize successfully.");
}

impl Encode for BattleShowdown {
    fn encode(&self) -> Vec<u8> {
        let mut encoded = Vec::new();

        // Encode each field of BattleShowdown struct
        encoded.extend_from_slice(&self.player_id.encode());
        encoded.extend_from_slice(&self.player_character_type.encode());
        encoded.extend_from_slice(&self.current_level.encode());
        encoded.extend_from_slice(&self.player_lives.encode());
        encoded.extend_from_slice(&self.player_name.encode());
        encoded.extend_from_slice(&self.boss_lives.encode());
        encoded.extend_from_slice(&self.character_hit_power_value.encode());
        encoded.extend_from_slice(&self.player_hit_power.encode());
        encoded.extend_from_slice(&self.boss_hit_power.encode());
        encoded.extend_from_slice(&self.game_state.encode());

        encoded
    }
}

impl BattleShowdown {
    // Placeholder for the `attack` method
    fn attack(&mut self, _character_hit_power_value: PlayerHitPowerValue) -> BattleShowdownEvent {
        // Implement this method according to your game logic
        // For now, just returning an empty event

        // Calculate total hit power for player based on character type and random values
        let character_hit_power = match &self.player_character_type {
            CharacterType::Warrior => 4,
            CharacterType::Mage => 3,
            CharacterType::Archer => 2,
        };

        let player_hit_power = match &self.character_hit_power_value {
            PlayerHitPowerValue::X => character_hit_power + get_random_u32(),
            PlayerHitPowerValue::Y => character_hit_power + get_random_u32(),
            PlayerHitPowerValue::Z => character_hit_power + get_random_u32(),
        };

        // Placeholder for boss attack logic
        // Update boss hit power to a random value for each attack
        self.boss_hit_power = get_random_u32();

        self.player_hit_power = player_hit_power;

        // Reduce boss's lives based on player's hit power
        self.boss_lives = self.boss_lives.saturating_sub(self.player_hit_power);
        // Reduce player's lives based on boss's hit power
        self.player_lives = self.player_lives.saturating_sub(self.boss_hit_power);

        // Check if player or boss has lost
        if self.player_lives == 0 {
            // Player lost
            self.game_state = "Player lost.".to_string();
            return BattleShowdownEvent::PlayerLost {
                id: self.player_id,
                boss_lives: self.boss_lives,
                character_type: self.player_character_type,
                message: "".to_string(),
                player_lives: self.player_lives,
            };
        } else if self.boss_lives == 0 {
            // Boss lost
            self.game_state = "Boss lost.".to_string();
            return BattleShowdownEvent::BossLost {
                boss_lives: self.boss_lives,
                character_type: self.player_character_type,
                player_lives: self.player_lives,
                message: "You've defeated the boos".to_string(),
            };
        }

        self.game_state = "The games continues.".to_string();
        BattleShowdownEvent::Attacked {
            boss_lives: self.boss_lives,
            character_type: self.player_character_type,
            id: self.player_id,
            name: self.player_name.clone(),
            player_lives: self.player_lives,
        }
    }
}

#[no_mangle]
extern "C" fn handle() {
    let battle_showdown_action: BattleShowdownAction =
        msg::load().expect("Could not load BattleShowdownAction");
    let battle_showdown = unsafe {
        BATTLESHOWNDOWN
            .as_mut()
            .expect("`BattleShowdown` is not initialized.")
    };
    let result: BattleShowdownEvent = match battle_showdown_action {
        BattleShowdownAction::Attack {
            character_hit_power_value,
        } => battle_showdown.attack(character_hit_power_value),
    };
    msg::reply_bytes(result.encode(), 0)
        .expect("Failed to encode or reply with `BattleShowdownEvent`.");
}

#[no_mangle]
extern "C" fn state() {
    let battle_showdown = unsafe {
        BATTLESHOWNDOWN
            .take()
            .expect("Unexpected error in taking state")
    };

    msg::reply(battle_showdown, 0).expect("Unable to share the state");
}
```

At first glance this might seem a lot, but it isn't, so don't get too intimidated. Before you start, make sure you understand the whole logic of the game description I gave earlier since you'll be implementing it here.

Above, we have some important functions, `struct`, and `impl`, and here is an overview of what they do.

1. With the `get_random_u32` function, we generated a random number between 1 and 3.
2. The `BattleShowdown` struct in the `/src/lib.rs` represents the main state of the game. It holds information such as player and boss stats, current game level, and game state. The `static mut BATTLESHOWNDOWN: Option<BattleShowdown> = None;` is a static mutable variable that holds the current state of the game. It's wrapped in an `Option` to indicate whether the game has been initialized yet or not, which you'll use later in your implementation.
3. `unsafe extern "C" fn init()` is responsible for initializing the game state when called after the contract has been uploaded. It loads an initialization message, constructs a `BattleShowdown` instance based on that message, and sets `BATTLESHOWNDOWN` to `Some` with the constructed instance.
4. `impl Encode for BattleShowdown`: this trait is implemented for `BattleShowdown`, enabling it to be encoded into a byte representation. This is useful for serialization and sending the game state over the network. And there's a way to also implement the trait without creating an `impl` for `BattleShowdown`.
5. `impl BattleShowdown`: this `impl` for `BattleShowdown` is where the entire logic happens, and for now, we've only added an `attack` method for it. It worth noting that we'll be adding more as we continue this project.
6. So what does the `attack` method do? Well, The `attack` method simulates a combat encounter between the player and the boss character in our game. It calculates the hit power for both entities based on character type and randomness, manages their health points accordingly, and generates game events to reflect the outcome of the encounter.
7. `extern "C" fn handle()`: In our case, the `handle` function is used to process incoming messages, specifically `BattleShowdownAction`. So depending on the action perform by the actor, it dispatches a result of the action to the appropriate methods of `BattleShowdown`, such as `attack`, and sends back the resulting game events to the actor. Like disccued in the illustration.
8. And lastly, `extern "C" fn state()` simply retrieves the current game state represented by `BattleShowdown` and sends it as a reply.

This is the overall explanation to the code in the file. But leaving with this isn't enough for even me. Let's disccus more below.

---

## Understanding the `init()`

```rs :collapsed-line
#[derive(Debug, Default)]
pub struct BattleShowdown {
    pub player_id: ActorId,
    pub player_character_type: CharacterType,
    pub current_level: u32,
    pub player_lives: u32,
    pub player_name: String,
    pub boss_lives: u32,
    pub character_hit_power_value: PlayerHitPowerValue,
    pub player_hit_power: u32,
    pub boss_hit_power: u32,
    pub game_state: String,
}

static mut BATTLESHOWNDOWN: Option<BattleShowdown> = None;

#[no_mangle]
unsafe extern "C" fn init() {
    // Load initialization data
    let init: InitBattleShowdown = msg::load().expect("Unable to decode InitBattleShowdown");

    // Create a BattleShowdown instance with initial values
    let battle_showdown = BattleShowdown {
        player_id: msg::source(),
        player_character_type: init.player_character_type,
        player_name: init.player_name,
        boss_lives: 10,
        player_lives: 10,
        ..Default::default()
    };

    // Store the BattleShowdown instance
    BATTLESHOWNDOWN = Some(battle_showdown);

    // Reply to signal successful initialization
    msg::reply_bytes("Successfully initialized", 0).expect("Failed to initialize successfully.");
}
```

The function loads data from an initialization message (`InitBattleShowdown`) sent by the developer or player. This data includes the player's chosen `character type` and `name`. Based on the initialization data, a `BattleShowdown` instance is created with initial values, which is stored in `battle_showdown`.

This instance represents the state of the game, including player and boss stats, current level, and game state. The created `BattleShowdown` instance is stored in the `BATTLESHOWNDOWN` static variable, allowing the game logic to access and manipulate the game state throughout the gameplay. Finally, a reply message is sent back to the developer or player to indicate successful initialization of the game contract.

This function sets up the initial state of the game, paving the way for further interactions and gameplay logic.

---

## Understanding the `handle()`

```rs
#[no_mangle]
extern "C" fn handle() {
    // Load the action from the message
    let battle_showdown_action: BattleShowdownAction =
        msg::load().expect("Could not load BattleShowdownAction");

    // Retrieve the current game state
    let battle_showdown = unsafe {
        BATTLESHOWNDOWN
            .as_mut()
            .expect("`BattleShowdown` is not initialized.")
    };

    // Execute the appropriate action on the game state and get the result
    let result: BattleShowdownEvent = match battle_showdown_action {
        BattleShowdownAction::Attack {
            character_hit_power_value,
        } => battle_showdown.attack(character_hit_power_value),
    };

    // Send back the result as a reply message
    msg::reply_bytes(result.encode(), 0)
        .expect("Failed to encode or reply with `BattleShowdownEvent`.");
}
```

The `handle()` function plays a crucial role in processing incoming messages and orchestrating the game's actions. It serves as the bridge between player interactions and the game's internal logic. When invoked, `handle()` begins by loading the `action` sent by the player from the message.

This `action`, encapsulated as `BattleShowdownAction`, dictates the player's intended move, such as attacking the boss. Next, the function retrieves the current game state from the `BATTLESHOWNDOWN` variable. This state holds essential information about the player, the boss, and the overall game environment.

With both the action and the game state at hand, `handle()` proceeds to execute the appropriate action. For instance, if the player's action is an `attack`, the function triggers the `attack()` method on the `battle_showdown` instance. This method calculates the outcome of the player's attack, considering factors like the player's hit power and the boss's remaining health points.

Crucially, the `attack()` method requires a parameter: `character_hit_power_value`. This parameter corresponds to the player's choice between three options: `X`, `Y`, and `Z`, each associated with different hit power values as disccused in earlier sections.

Once the `action` is executed, `handle()` generates an event, encapsulated as `BattleShowdownEvent`, reflecting the outcome of the player's move. This event encapsulates important details, such as changes in player and boss health points. Finally, `handle()` responds to the player by replying with the result of the action as a byte-encoded message. This message contains the updated game state, allowing the player to understand their current situation, including their health status and that of the boss.

---

## Understanding the `impl BattleShowdown for attack`

```rs
impl BattleShowdown {
    fn attack(&mut self, _character_hit_power_value: PlayerHitPowerValue) -> BattleShowdownEvent {
        // Calculate total hit power for player based on character type and random values
        let character_hit_power = match &self.player_character_type {
            CharacterType::Warrior => 4,
            CharacterType::Mage => 3,
            CharacterType::Archer => 2,
        };

        let player_hit_power = match &self.character_hit_power_value {
            PlayerHitPowerValue::X => character_hit_power + get_random_u32(),
            PlayerHitPowerValue::Y => character_hit_power + get_random_u32(),
            PlayerHitPowerValue::Z => character_hit_power + get_random_u32(),
        };

        // Placeholder for boss attack logic
        // Update boss hit power to a random value for each attack
        self.boss_hit_power = get_random_u32();

        self.player_hit_power = player_hit_power;

        // Reduce boss's lives based on player's hit power
        self.boss_lives = self.boss_lives.saturating_sub(self.player_hit_power);
        // Reduce player's lives based on boss's hit power
        self.player_lives = self.player_lives.saturating_sub(self.boss_hit_power);

        // Check if player or boss has lost
        if self.player_lives == 0 {
            // Player lost
            self.game_state = "Player lost.".to_string();
            return BattleShowdownEvent::PlayerLost {
                id: self.player_id,
                boss_lives: self.boss_lives,
                character_type: self.player_character_type,
                message: "".to_string(),
                player_lives: self.player_lives,
            };
        } else if self.boss_lives == 0 {
            // Boss lost
            self.game_state = "Boss lost.".to_string();
            return BattleShowdownEvent::BossLost {
                boss_lives: self.boss_lives,
                character_type: self.player_character_type,
                player_lives: self.player_lives,
                message: "You've defeated the boss".to_string(),
            };
        }

        self.game_state = "The game continues.".to_string();
        // Return event indicating attack occurred
        BattleShowdownEvent::Attacked {
            boss_lives: self.boss_lives,
            character_type: self.player_character_type,
            id: self.player_id,
            name: self.player_name.clone(),
            player_lives: self.player_lives,
        }
    }
}
```

The `attack` method within the `BattleShowdown` implementation simulates a pivotal moment in the game: a combat encounter between the player and the boss character.

Here's how it works:

Firstly, the method calculates the total hit power for the player based on their character type (`character_hit_power`) and randomness (`player_hit_power`). Different character types (`Warrior`, `Mage`, or `Archer`) have different base hit powers.

Next, a random hit power value is added to the character's base hit power. This adds an element of unpredictability to each attack. The method then updates the boss's hit power (`self.boss_hit_power = get_random_u32();`) to a random value, representing the boss's retaliatory strike against the player.

After calculating the hit powers, the method reduces the boss's lives based on the player's hit power and vice versa, updating their respective health points accordingly.

```rs
        // Reduce boss's lives based on player's hit power
        self.boss_lives = self.boss_lives.saturating_sub(self.player_hit_power);
        // Reduce player's lives based on boss's hit power
        self.player_lives = self.player_lives.saturating_sub(self.boss_hit_power);
```

The game state is then checked to determine if either the player or the boss has lost the battle. If the player's health points reaches zero, the game state is updated to indicate that the player has lost. Conversely, if the boss's health points reach zero, the game state reflects the boss's defeat.

```rs
        // Check if player or boss has lost
        if self.player_lives == 0 {
            // Player lost
            self.game_state = "Player lost.".to_string();
            return BattleShowdownEvent::PlayerLost {
                id: self.player_id,
                boss_lives: self.boss_lives,
                character_type: self.player_character_type,
                message: "".to_string(),
                player_lives: self.player_lives,
            };
        } else if self.boss_lives == 0 {
            // Boss lost
            self.game_state = "Boss lost.".to_string();
            return BattleShowdownEvent::BossLost {
                boss_lives: self.boss_lives,
                character_type: self.player_character_type,
                player_lives: self.player_lives,
                message: "You've defeated the boss".to_string(),
            };
        }

        self.game_state = "The game continues.".to_string();
        // Return event indicating attack occurred
        BattleShowdownEvent::Attacked {
            boss_lives: self.boss_lives,
            character_type: self.player_character_type,
            id: self.player_id,
            name: self.player_name.clone(),
            player_lives: self.player_lives,
        }
```

Finally, if neither the player nor the boss has lost, the game state is updated to indicate that the battle continues.

---

## Understanding the `State()`

```rs
#[no_mangle]
extern "C" fn state() {
    let battle_showdown = unsafe {
        BATTLESHOWNDOWN
            .take()
            .expect("Unexpected error in taking state")
    };

    msg::reply(battle_showdown, 0).expect("Unable to share the state");
}
```

For this instance there's nothing more to share, it retrieves the current state of the game, represented by the `BattleShowdown` struct, from a static mutable variable `BATTLESHOWNDOWN`, and sends a reply message containing the game state back to the player. If there is an error sending the reply message, it will panic with an error message indicating the inability to share the state.

And that's that for this project. There are some exciting features you can consider if you want to extend this project. Imagine the possibility of resetting the game state, accommodating multiple players, or even resetting the game for a single player. And for the ambitious, you could even tackle the challenge of resetting the state for the entire game. These additions can offer new dimensions to the project and provide excellent opportunities for you to challenge yourself.

---

## Short Recording of what we've built - Demo

<SiteInfo
  name="Gear | The Most Advanced Platform for dApp development - 5 May 2024"
  desc="Use Loom to record quick videos of your screen and cam. Explain anything clearly and easily - and skip the meeting. An essential tool for hybrid workplaces."
  url="https://loom.com/"
  logo="https://cdn.loom.com/assets/favicons-loom/android-chrome-192x192.png"
  preview="https://cdn.loom.com/assets/img/og/loom-banner.png"/>

In the video you could see I added another method for resetting everything back to it inital state. Though I didn't guide you through the process of doing that, you should know it is easy to implement, and I've added [a GitHub repository (<VPIcon icon="iconfont icon-github"/>`rockyessel/battle-showdown`)](https://github.com/rockyessel/battle-showdown) for the entire code.

<SiteInfo
  name="rockyessel/battle-showdown: Embark on your journey into smart contract development with Gear Protocol through this beginner-friendly tutorial, covering everything from basic concepts to hands-on implementation."
  desc="Embark on your journey into smart contract development with Gear Protocol through this beginner-friendly tutorial, covering everything from basic concepts to hands-on implementation. - rockyessel/b..."
  url="https://github.com/rockyessel/battle-showdown/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/b4ef4e5c93d9794e570eeef534cef6a26d2914e4dcc38ebe7cc3825c61fe0d0a/rockyessel/battle-showdown"/>
