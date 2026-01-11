---
lang: en-US
title: "How to Build a Local-First CLI Financial Tracker with Rust [Full Handbook]"
description: "Article(s) > How to Build a Local-First CLI Financial Tracker with Rust [Full Handbook]"
icon: fa-brands fa-rust
category:
  - Rust
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - rs
  - rust
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build a Local-First CLI Financial Tracker with Rust [Full Handbook]"
    - property: og:description
      content: "How to Build a Local-First CLI Financial Tracker with Rust [Full Handbook]"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-local-first-cli-financial-tracker-with-rust.html
prev: /programming/rust/articles/README.md
date: 2026-01-10
isOriginal: false
author:
  - name: Stephen Emmanuel
    url : https://freecodecamp.org/news/author/stephcrown/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1767998415383/82c48f39-cd5e-4f66-af83-2b65bafccd65.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Rust > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/rust/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build a Local-First CLI Financial Tracker with Rust [Full Handbook]"
  desc="Most financial apps store your sensitive data on remote servers. This requires you to trust a company with your records and rely on their service staying online. But if you build a local-first application, you can keep your data on your own machine i..."
  url="https://freecodecamp.org/news/how-to-build-a-local-first-cli-financial-tracker-with-rust"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1767998415383/82c48f39-cd5e-4f66-af83-2b65bafccd65.png"/>

Most financial apps store your sensitive data on remote servers. This requires you to trust a company with your records and rely on their service staying online. But if you build a local-first application, you can keep your data on your own machine in a format you can actually read.

In this guide, you’ll learn how to create a financial tracker that runs entirely in your terminal. You’ll use Rust to build a system that saves transactions to a local JSON file, ensuring that you have total ownership of your information.

Along the way, you’ll learn how to use the Rust type system to validate financial data and handle file errors gracefully. You’ll also use the Clap library to create a professional command line interface. By the time you finish, you’ll understand how to manage local state, serialize data with Serde, and structure a modular Rust application.

---

## Table of Contents

2. [Commands You’ll Build](#heading-commands-youll-build)
3. [Step 1: Set Up the Project](#heading-step-1-set-up-the-project)
4. [Step 2: Design the Data Model](#heading-step-2-design-the-data-model)
5. [Step 3: Handle Errors Properly](#heading-step-3-handle-errors-properly)
6. [Step 4: Create File Operations](#heading-step-4-create-file-operations)
7. [Step 5: Set Up the CLI Structure](#heading-step-5-set-up-the-cli-structure)
8. [Step 6: Create Response Types](#heading-step-6-create-response-types)
9. [Step 7: Create Argument Parsing Helpers](#heading-step-7-create-argument-parsing-helpers)
10. [Step 8: Implement the Init Command](#heading-step-8-implement-the-init-command)
11. [Step 9: Implement the Add Command](#heading-step-9-implement-the-add-command)
12. [Step 10: Implement the List Command](#heading-step-10-implement-the-list-command)
13. [Step 11: Implement the Update Command](#heading-step-11-implement-the-update-command)
14. [Step 12: Implement the Delete Command](#heading-step-12-implement-the-delete-command)
15. [Step 13: Implement Subcategory Commands](#heading-step-13-implement-subcategory-commands)
16. [Step 14: Implement the Total Command](#heading-step-14-implement-the-total-command)
17. [Step 15: Wire Up the Main Function](#heading-step-15-wire-up-the-main-function)
18. [Test Your Application](#heading-test-your-application)
19. [What's Next and Advanced Features](#heading-whats-next-and-advanced-features)

::: notes Prerequisites

To follow along with this tutorial, you should have a basic comfort level with Rust syntax. You don’t need to be an expert, but you should understand how to use variables, functions, and structs.

You’ll also need the following tools and knowledge:

- Rust installed (version 1.70 or later). If you don't have Rust installed, follow the [<VPIcon icon="fas fa-globe"/>official installation guide](https://rust-book.cs.brown.edu/ch01-01-installation.html). You can verify your installation by running `rustc --version` in your terminal.
- Familiarity with command-line tools and terminal usage.
- Basic knowledge of the JSON format.

:::

---

## Commands You’ll Build

This tutorial will guide you on how to implement these commands step-by-step:

- `init`: Initializes a new tracker and creates your storage file.
- `add`: Saves new income or expense records to your data.
- `list`: Allows you to view and filter your saved transactions.
- `update`: Modifies existing records in your storage.
- `delete`: Removes specific records from your history.
- `subcategory`: Manages custom subcategories (list, add, delete, rename)
- `total`: Calculates your financial totals and net balance.

---

## Step 1: Set Up the Project

To start, you need to create a new Rust project. Open your terminal and run these commands:

```sh
cargo new fintrack
cd fintrack
```

This creates a new directory called `fintrack` with a basic Rust project structure. `cargo` is Rust's package manager and build tool. It handles dependencies, compilation, and project management.

Now, open <VPIcon icon="iconfont icon-toml"/>`Cargo.toml` in your editor. This file defines the metadata and libraries for your project. Add the following dependencies that your application will need:

```toml title="Cargo.toml
[package]
name = "fintrack"
version = "1.0.0"
edition = "2021"

[dependencies]
chrono = "0.4.42"
clap = { version = "4.5.53", features = ["derive"] }
dirs = "6.0.0"
serde = { version = "1.0.228", features = ["derive"] }
serde_json = "1.0.148"
strum = { version = "0.26", features = ["derive"] }
```

Here’s what each dependency does in your project:

- `chrono`: Handles dates and times. You'll use it to parse dates from user input and format them for display.
- `clap`: A library for building command-line interfaces. It manages the process of parsing and validating the arguments you type into the terminal.
- `dirs`: Provides a cross-platform way to find the user's home directory, where you'll store the tracker data.
- `serde` and `serde_json`: `serde` is Rust's serialization framework. Combined with `serde_json`, it lets you convert Rust structs to JSON and back. This is how you'll save and load your tracker data.
- `strum`: Provides macros to automatically generate useful code for enums, like converting them to strings and parsing strings into enums.

The `features = ["derive"]` for `clap` and `serde` enables their derive macros, which will let you use attributes like `#[derive(...)]` to automatically generate the code needed for parsing and data conversion.

---

## Step 2: Design the Data Model

Before writing any command logic, you’ll want to define the structure of the data your tracker will store. In Rust, you use structs to group related data much like a record in a database, and **enums** to represent values that can only be one of several fixed variants.

Create a new file src/models.rs and add the code to define a record:

```rs
use chrono::NaiveDate;
use serde::{Deserialize, Serialize};
use std::collections::HashMap;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Record {
    pub id: usize,
    pub category: usize,
    pub amount: f64,
    pub subcategory: usize,
    pub description: String,
    pub date: String,
}
```

This Record struct represents a single income or expense transaction. The `#[derive(...)]` attribute automatically implements traits that allow you to print the struct for debugging, copy it, and convert it to or from JSON. The `pub` keyword ensures that these fields are accessible to the other modules you will build.

Next, add the main data structure to the <VPIcon icon="fas fa-folder-open"/>`src/`<VPIcon icon="fa-brands fa-rust"/>`models.rs` file:

```rs
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct TrackerData {
    pub version: u32,
    pub currency: String,
    pub created_at: String,
    pub last_modified: String,
    pub opening_balance: f64,
    pub categories: HashMap<String, usize>,
    pub subcategories_by_id: HashMap<usize, String>,
    pub subcategories_by_name: HashMap<String, usize>,
    pub next_subcategory_id: u32,
    pub records: Vec<Record>,
    pub next_record_id: usize,
}
```

This struct holds the state of the entire application. It uses a HashMap for categories and subcategories to allow for fast lookups by name or ID. All individual transactions are stored in the `records` vector, which can grow dynamically as you add more data.

Now, add enums to handle your fixed categories and supported currencies:

```rs
#[derive(clap::ValueEnum, Clone, Debug, strum::Display, strum::EnumString)]
#[strum(serialize_all = "lowercase", ascii_case_insensitive)]
pub enum Category {
    Income,
    Expenses,
}

#[derive(clap::ValueEnum, Clone, Debug, strum::Display, strum::EnumString)]
#[strum(serialize_all = "UPPERCASE", ascii_case_insensitive)]
pub enum Currency {
    NGN,
    USD,
    GBP,
    EUR,
    CAD,
    AUD,
    JPY,
}
```

These enums ensure the user can only input valid categories or currencies. The strum attributes handle the conversion between terminal input strings and your Rust code, while `clap::ValueEnum` allows these types to work directly with your command-line arguments.

### Add Methods to the TrackerData

To interact with this data in the `TrackerData` struct, you need to add methods using an `impl` block. These methods will handle adding records and calculating totals:

```rs :collapsed-lines
impl TrackerData {
    pub fn push_record(&mut self, record: Record) -> &Self {
        self.records.push(record);
        self
    }

    pub fn category_id(&self, category: &str) -> usize {
        self.categories[category]
    }

    pub fn miscellaneous_subcategory_id(&self) -> Option<usize> {
        self.subcategories_by_name.get("miscellaneous").copied()
    }

    pub fn subcategory_id(&self, name: &str) -> Option<usize> {
        self.subcategories_by_name.get(&name.to_lowercase()).copied()
    }

    pub fn category_name(&self, id: usize) -> Option<&String> {
        self.categories.iter().find(|(_, v)| **v == id).map(|(k, _)| k)
    }

    pub fn subcategory_name(&self, id: usize) -> Option<&String> {
        self.subcategories_by_id.get(&id)
    }

    pub fn totals(&self) -> (f64, f64) {
        self.records.iter().fold((0.0, 0.0), |mut acc, r| {
            if r.category == 1 {
                acc.0 += r.amount;
            } else {
                acc.1 += r.amount;
            }
            acc
        })
    }
}
```

These methods utilize key Rust patterns to manage the tracker's state:

- `&mut self` is used when you need to modify the data, such as pushing a new record into the vector.
- `Option` handles cases where a value might not exist, returning `Some(value)` or `None`.
- `iter()` and `fold` are used in the `totals()` method to process all records and accumulate the total income and expenses into a single tuple `(f64, f64)` representing total income and total expenses.

Finally, add a helper function to create the default tracker JSON structure. Add this to <VPIcon icon="fas fa-folder-open"/>`src/`<VPIcon icon="fa-brands fa-rust"/>`models.rs`:

```rs title="models.rs"
pub fn default_tracker_json(currency: &Currency, opening_balance: f64) -> serde_json::Value {
    serde_json::json!({
        "version": 1,
        "currency": currency.to_string(),
        "opening_balance": opening_balance,
        "created_at": chrono::Utc::now().to_rfc3339(),
        "last_modified": chrono::Utc::now().to_rfc3339(),
        "categories": {
            "income": 1,
            "expenses": 2
        },
        "subcategories_by_id": {
            "1": "miscellaneous"
        },
        "subcategories_by_name": {
            "miscellaneous": 1
        },
        "records": [],
        "next_record_id": 1,
        "next_subcategory_id": 2
    })
}
```

Then, register this module in your <VPIcon icon="fas fa-folder-open"/>`src/`<VPIcon icon="fa-brands fa-rust"/>`lib.rs` file so the rest of your application can use it:

```rs title="lib.rs"
pub mod models;
```

---

## Step 3: Handle Errors Properly

In a financial application, error handling is critical to ensure you don’t lose or corrupt your data. Rust uses a `Result` type to handle operations that might fail. A `Result` is either an `Ok` containing the successful value or an `Err` containing the error details. This structure forces you to address potential failures explicitly before your code will compile.

Create a new file named <VPIcon icon="fas fa-folder-open"/>`src/`<VPIcon icon="fa-brands fa-rust"/>`error.rs` and start with the necessary imports:

```rs title="error.rs"
use std::io;
```

Now, define your custom error types using enums:

```rs title="error.rs"
#[derive(Debug)]
pub enum ValidationErrorKind {
    AmountTooSmall { amount: f64 },
    InvalidDate { provided: String, expected_format: String },
    SubcategoryNotFound { name: String },
    SubcategoryAlreadyExists { name: String },
    RecordNotFound { id: usize },
    SubcategoryHasRecords { name: String, count: usize },
    CannotDeleteMiscellaneous,
    CategoryImmutable { category: usize },
    InvalidCategoryName { name: String, reason: String },
    InvalidName { name: String, reason: String },
    InvalidAmount { reason: String },
    TrackerAlreadyInitialized,
    InvalidSubcommand { subcommand: String },
}

#[derive(Debug)]
pub enum CliError {
    FileNotFound(String),
    InvalidJson(String),
    ValidationError(ValidationErrorKind),
    PermissionDenied(String),
    CorruptedData { backup_restored: bool, timestamp: String },
    FileAlreadyExists,
    Other(String),
}
```

This nested structure allows you to categorize every possible failure that can occur during the execution of your program. The CliError enum acts as the top-level container for all errors in the application. It handles errors like missing files, denied permissions, validation errors, file existence conflicts, and so on.

One specific variant, `ValidationError`, carries a `ValidationErrorKind` as its payload. This allows you to group all validation-specific failures (such as invalid date formats, duplicate subcategory names, or attempts to delete protected system categories) under a single error type while still preserving the specific details of what went wrong.

Structuring your errors this way allows you to report exactly what caused a failure alongside the specific data that triggered it. For example, a validation error can include the exact amount or date that failed your rules, while a system error can pinpoint the specific file path or permission issue that stopped the program.

### Map System Errors to Custom Errors

To keep your application code clean, you can use the `From` trait to automatically convert low-level system errors into your custom `CliError`. This allows you to use the `?` operator later in your logic to propagate errors gracefully.

Add these implementations to <VPIcon icon="fas fa-folder-open"/>`src/`<VPIcon icon="fa-brands fa-rust"/>`error.rs`:

```rs title="error.rs"
impl From<std::io::Error> for CliError {
    fn from(err: std::io::Error) -> Self {
        match err.kind() {
            std::io::ErrorKind::NotFound => CliError::FileNotFound(err.to_string()),
            std::io::ErrorKind::PermissionDenied => CliError::PermissionDenied(err.to_string()),
            std::io::ErrorKind::AlreadyExists => CliError::FileAlreadyExists,
            // ... add more here as is required.
            _ => CliError::Other(format!("IO error: {}", err)),
        }
    }
}

impl From<serde_json::Error> for CliError {
    fn from(err: serde_json::Error) -> Self {
        CliError::InvalidJson(err.to_string())
    }
}
```

The `match` block inside the `std::io::Error` implementation allows you to inspect the system error and categorize it correctly. If the system reports a "NotFound" error, your application transforms it into a `CliError::FileNotFound`. This ensures that your user-facing messages remain consistent.

### Prepare for Error Output

Finally, add a method signature to the `CliError` block. This will later connect your error logic to a dedicated output module that formats these errors for the terminal:

```rs
impl CliError {
    pub fn write_to(&self, writer: &mut impl std::io::Write) -> io::Result<()> {
        crate::output::write_error(self, writer)
    }
}
```

The `&mut impl std::io::Write` parameter is a flexible way to say this method can write to any output stream, whether it’s the standard error stream in the terminal or a log file.

Register the error module in your <VPIcon icon="fas fa-folder-open"/>`src/`<VPIcon icon="fa-brands fa-rust"/>`lib.rs` file so it’s available to the rest of your project:

```rs title="lib.rs"
pub mod models;
pub mod error;
```

---

## Step 4: Create File Operations

To manage your tracker data, you need a reliable way to read and write JSON files. Instead of repeating file logic in every command, you’ll create a trait. In Rust, traits allow you to add new methods to existing types. Here, you’ll add custom file-handling methods directly to `Path` and `PathBuf`.

First, create a new directory named <VPIcon icon="fas fa-folder-open"/>`src/utils` and create a file inside it called <VPIcon icon="fas fa-folder-open"/>`src/utils/`<VPIcon icon="fa-brands fa-rust"/>`file.rs`. Start with the necessary imports:

```rs title="utils/file.rs"
use std::{
  fs::{self, File},
  io::{self, prelude::*},
  path::Path,
};

use serde_json::Value;

use crate::CliError;
```

Now, define and implement the FilePath trait:

```rs :collapsed-lines title="utils/file.rs"
pub trait FilePath: AsRef<Path> {
    fn create_file_if_not_exists(&self) -> io::Result<File> {
        let path = self.as_ref();
        if let Some(parent) = path.parent() {
            fs::create_dir_all(parent)?;
        }
        File::options().write(true).create_new(true).open(path)
    }

    fn read_file(&self) -> io::Result<File> {
        File::options().read(true).open(self.as_ref())
    }

    fn open_read_write(&self) -> io::Result<File> {
        File::options().read(true).write(true).open(self.as_ref())
    }

    fn open_read(&self) -> io::Result<File> {
        File::options().read(true).open(self.as_ref())
    }

    fn delete_if_exists(&self) -> io::Result<()> {
        let path = self.as_ref();
        if !path.exists() {
            return Ok(());
        }
        if path.is_dir() {
            fs::remove_dir_all(path)?;
        } else {
            fs::remove_file(path)?;
        }
        Ok(())
    }
}

impl<P: AsRef<Path>> FilePath for P {}
```

This "blanket implementation" at the end is powerful. It ensures that any type capable of representing a file path, like a `PathBuf` or a standard `String`, automatically gains these methods.

Throughout these methods, you use the `?` operator. This is Rust’s shorthand for error propagation. If an operation like `create_dir_all fails`, the ? immediately returns the error from the function. If it succeeds, the program continues to the next line. This keeps your logic flat and readable without nested error checks.

### Add JSON Utility Functions

Writing financial data to a file requires precision. You must ensure that you are completely overwriting the old data rather than just appending to it. Add this helper function to <VPIcon icon="fas fa-folder-open"/>`src/utils/`<VPIcon icon="fa-brands fa-rust"/>`file.rs`:

```rs title="utils/file.rs"
pub fn write_json_to_file(json: &Value, file: &mut File) -> Result<(), CliError> {
    let json_string = serde_json::to_string_pretty(&json)?;

    file.seek(io::SeekFrom::Start(0))?;
    file.set_len(0)?;
    file.write_all(json_string.as_bytes())?;

    Ok(())
}
```

The `seek` call moves the file pointer back to the very beginning, and `set_len(0)` truncates the file to zero bytes. Using `to_string_pretty` ensures your JSON file is human-readable, which fits the local-first goal of keeping your data accessible.

### Register the Utilities

To make these tools available to the rest of your application, you need to set up the module tree. Create <VPIcon icon="fas fa-folder-open"/>`src/`<VPIcon icon="fa-brands fa-rust"/>`utils.rs` and add this line:
 title="utils.rs"
```rs title="utils.rs"
pub mod file;
```

Then, update your <VPIcon icon="fas fa-folder-open"/>`src/`<VPIcon icon="fa-brands fa-rust"/>`lib.rs` file to include the new utils module and export the types you've built so far:

```rs title="lib.rs"
pub mod models;
pub mod error;
pub mod utils;

pub use error::{CliError, ValidationErrorKind};
pub use models::{Category, Currency, Record, TrackerData};
```

---

## Step 5: Set Up the CLI Structure

In this step, you will organize the interface that allows users to interact with your code. Building a CLI is more than just reading strings. It involves mapping specific terminal commands to the internal logic of your application.

### The Command Architecture

You’ll follow a modular pattern where each command has its own definition and execution logic. This separation ensures that adding a new feature in the future doesn’t break your existing commands.

Create a file named <VPIcon icon="fas fa-folder-open"/>`src/`<VPIcon icon="fa-brands fa-rust"/>`commands.rs`. This file acts as a central dispatcher that declares your command modules and routes terminal input to the correct function:

```rs :collapsed-lines title="commands.rs"
use crate::{CliResult, command_prelude::*};
use clap::{ArgMatches, Command};

pub type Exec = fn(&mut GlobalContext, &ArgMatches) -> CliResult;

pub fn cli() -> Vec<Command> {
    vec![
        init::cli(),
        add::cli(),
        list::cli(),
        update::cli(),
        delete::cli(),
        subcategory::cli(),
        total::cli(),
    ]
}

pub fn build_exec(cmd: &str) -> Option<Exec> {
    match cmd {
        "init" => Some(init::exec),
        "add" => Some(add::exec),
        "list" => Some(list::exec),
        "update" => Some(update::exec),
        "delete" => Some(delete::exec),
        "subcategory" => Some(subcategory::exec),
        "total" => Some(total::exec),
        _ => None,
    }
}

pub mod init;
pub mod add;
pub mod list;
pub mod update;
pub mod delete;
pub mod subcategory;
pub mod total;
```

The `Exec` type alias defines a standard signature for all your command functions. Every command will receive the global context and the arguments parsed by clap, and every command will return a CliResult.

The `Exec` type alias defines a standard signature for all your command functions. Every command will receive the global context and the arguments parsed by `clap`. The `build_exec` function then uses pattern matching to return the specific execution logic associated with the user's input.

### Manage Paths with Global Context

Since your application is local-first, it needs to know exactly where to find the data directory on different operating systems. You will create a `GlobalContext` struct to centralize these paths so you don’t have to rebuild them manually in every command module.

Now create <VPIcon icon="fas fa-folder-open"/>`src/utils/`<VPIcon icon="fa-brands fa-rust"/>`context.rs` for managing file paths:

```rs title="utils/context.rs"
use std::path::PathBuf;

#[derive(Debug)]
pub struct GlobalContext {
    home_path: PathBuf,
    base_path: PathBuf,
    tracker_path: PathBuf,
}

impl GlobalContext {
    pub fn new(home_dir: PathBuf) -> Self {
        let base_path = home_dir.join(".fintrack");
        let tracker_path = base_path.join("tracker.json");

        GlobalContext {
            home_path: home_dir,
            base_path,
            tracker_path,
        }
    }

    pub fn tracker_path(&self) -> &PathBuf {
        &self.tracker_path
    }

    pub fn home_path(&self) -> &PathBuf {
        &self.home_path
    }

    pub fn base_path(&self) -> &PathBuf {
        &self.base_path
    }
}
```

The `join()` method is a cross-platform way to combine paths. It automatically uses the correct separator for your operating system, such as a backslash on Windows or a forward slash on Linux.

### Register the Command System

To tie these components together, update your utility and library files. In <VPIcon icon="fas fa-folder-open"/>`src/`<VPIcon icon="fa-brands fa-rust"/>`utils.rs`, add the context module:

```rs title="utils.rs" title="utils.rs"
pub mod file;
pub mod context;
```

Finally, update <VPIcon icon="fas fa-folder-open"/>`src/`<VPIcon icon="fa-brands fa-rust"/>`lib.rs` to expose the command structures and the new context type. You’ll also define a `CliResult` type alias to keep your function signatures consistent throughout the project:

```rs title="lib.rs"
pub mod models;
pub mod error;
pub mod utils;
pub mod commands;

pub use error::*;
pub use models::*;
pub use utils::command_prelude;
pub use utils::context::GlobalContext;
pub use utils::parsers;
```

By defining the result type here, you ensure that every command follows the same error-handling and response rules you established in previous steps.

---

## Step 6: Create Response Types

Commands in your tracker do more than just execute logic. They return data that must be formatted and displayed to the user.

In a command-line tool, your "user interface" is the text printed to the terminal, so you need a structured way to handle various results. You’ll create a `ResponseContent` enum to categorize these different outputs, such as single records, transaction lists, or financial totals. This ensures that your application communicates both successful results and informative error messages clearly.

### Define the Response Structures

Open your <VPIcon icon="fas fa-folder-open"/>`src/`<VPIcon icon="fa-brands fa-rust"/>`models.rs` file and add these structures to manage how the application packages its data:

Add to <VPIcon icon="fas fa-folder-open"/>`src/`<VPIcon icon="fa-brands fa-rust"/>`models.rs`:

```rs :collaped-lines title="models.rs"
#[derive(Debug)]
pub enum ResponseContent {
    Message(String),
    Record {
        record: Record,
        tracker_data: TrackerData,
        is_update: bool,
    },
    List {
        records: Vec<Record>,
        tracker_data: TrackerData,
    },
    TrackerData(TrackerData),
    Total(Total),
    Categories(Vec<(usize, String)>),
    Subcategories(Vec<(usize, String)>),
}

#[derive(Debug, Clone)]
pub struct Total {
    pub currency: Currency,
    pub opening_balance: f64,
    pub income_total: f64,
    pub expenses_total: f64,
}

#[derive(Debug)]
pub struct CliResponse {
    content: Option<ResponseContent>,
}

impl CliResponse {
    pub fn new(content: ResponseContent) -> Self {
        CliResponse {
            content: Some(content),
        }
    }

    pub fn success() -> Self {
        CliResponse { content: None }
    }

    pub fn content(&self) -> Option<&ResponseContent> {
        self.content.as_ref()
    }

    pub fn write_to(&self, writer: &mut impl std::io::Write) -> std::io::Result<()> {
        crate::output::write_response(self, writer)
    }
}

pub type CliResult = Result<CliResponse, CliError>;
```

The `CliResponse` struct acts as a container for your output. By using an `Option<ResponseContent>`, you can represent a simple success message when the content is `None`, or provide more complex data like a `Total` struct when needed. This approach keeps your command logic consistent because every operation will return the same response type.

### Implement the Output Module

Next, you need a central place to turn these Rust types into formatted text for the terminal. Create a new file named <VPIcon icon="fas fa-folder-open"/>`src/`<VPIcon icon="fa-brands fa-rust"/>`output.rs`. This module will handle the printing logic for both successful responses and the errors you defined earlier.

```rs :collapsed-lines title="output.rs"
use crate::{CliError, CliResponse, ResponseContent};

pub fn write_response(res: &CliResponse, writer: &mut impl std::io::Write) -> std::io::Result<()> {
    let Some(content) = res.content() else {
        writeln!(writer, "✓ Success")?;
        return Ok(());
    };

    match content {
        ResponseContent::Message(msg) => {
            writeln!(writer, "✓ {}", msg)?;
        }
        ResponseContent::Record { record, .. } => {
            writeln!(writer, "✓ Record created:")?;
            writeln!(writer, "  ID: {}", record.id)?;
            writeln!(writer, "  Amount: {}", record.amount)?;
            // More formatting later
        }
        ResponseContent::List { records, .. } => {
            for record in records {
                writeln!(writer, "{:?}", record)?;
            }
        }
        ResponseContent::Total(total) => {
            writeln!(writer, "Opening Balance: {} {}", total.opening_balance, total.currency)?;
            writeln!(writer, "Total Income: {} {}", total.income_total, total.currency)?;
            writeln!(writer, "Total Expenses: {} {}", total.expenses_total, total.currency)?;
            let net_balance = total.opening_balance + total.income_total - total.expenses_total;
            writeln!(writer, "Net Balance: {} {}", net_balance, total.currency)?;
        }
        _ => {}
    }
    Ok(())
}

pub fn write_error(err: &CliError, writer: &mut impl std::io::Write) -> std::io::Result<()> {
    match err {
        CliError::FileNotFound(msg) => writeln!(writer, "Error: File not found: {}", msg),
        CliError::InvalidJson(msg) => writeln!(writer, "Error: Invalid JSON: {}", msg),
        CliError::ValidationError(kind) => {
            match kind {
                crate::ValidationErrorKind::AmountTooSmall { amount } => {
                    writeln!(writer, "Error: Amount must be greater than 0, got {}", amount)
                }
                crate::ValidationErrorKind::SubcategoryNotFound { name } => {
                    writeln!(writer, "Error: Subcategory '{}' not found", name)
                }
                crate::ValidationErrorKind::RecordNotFound { id } => {
                    writeln!(writer, "Error: Record with ID {} not found", id)
                }
                _ => writeln!(writer, "Error: Validation failed"),
            }
        }
        CliError::FileAlreadyExists => {
            writeln!(writer, "Error: Tracker already initialized. Use 'fintrack clear' to start fresh.")
        }
        _ => writeln!(writer, "Error: {}", err),
    }
}
```

By centralizing the output logic in this module, you fulfill the goal of reporting the exact data that caused a failure alongside the error message itself. If a user enters an invalid amount, the error output clearly identifies the problematic value.

### Update the Library Registration

To finalize this step, register the output module and export the new response types in your <VPIcon icon="fas fa-folder-open"/>`src/`<VPIcon icon="fa-brands fa-rust"/>`lib.rs` file:

```rs title="lib.rs"
pub mod commands;
pub mod error;
pub mod models;
pub mod output;
pub mod utils;

pub use error::*;
pub use models::*;
pub use utils::command_prelude;
pub use utils::context::GlobalContext;
pub use utils::parsers;
```

---

## Step 7: Create Argument Parsing Helpers

Extracting specific values like transaction amounts, dates, or categories from raw command-line input can quickly lead to repetitive code. While `clap` provides the basic parsing, you need a streamlined way to convert those inputs into the specific types used by your tracker. By creating a custom trait to extend `clap`, you handle type conversion and error reporting in a single, consistent place.

Create a new file named <VPIcon icon="fas fa-folder-open"/>`src/utils/`<VPIcon icon="fa-brands fa-rust"/>`cli.rs` and add the following implementation:

```rs :collapsed-lines title="utils/cli.rs"
use chrono::NaiveDate;
use clap::ArgMatches;
use crate::{Category, CliError, Currency};

const DEFAULT_F64: f64 = 0.0;
const DEFAULT_USIZE: usize = 0;
const DEFAULT_SUBCATEGORY: &str = "miscellaneous";

pub trait ArgMatchesExt {
    fn get_category(&self, id: &str) -> Result<&Category, CliError>;
    fn get_usize(&self, id: &str) -> Result<usize, CliError>;
    fn get_category_opt(&self, id: &str) -> Option<&Category>;
    fn get_f64_opt(&self, id: &str) -> Option<f64>;
    fn get_usize_opt(&self, id: &str) -> Option<usize>;
    fn get_string_opt(&self, id: &str) -> Option<String>;
    fn get_subcategory_opt(&self, id: &str) -> Option<String>;
    fn get_date_opt(&self, id: &str) -> Option<NaiveDate>;
    fn get_currency_opt(&self, id: &str) -> Option<&Currency>;
    fn get_f64_or_default(&self, id: &str) -> f64;
    fn get_usize_or_default(&self, id: &str) -> usize;
    fn get_string_or_default(&self, id: &str) -> String;
    fn get_subcategory_or_default(&self, id: &str) -> String;
    fn get_currency_or_default(&self, id: &str) -> &Currency;
    fn get_vec<T: Clone + Send + Sync + 'static>(&self, id: &str) -> Vec<T>;
    fn contains_id(&self, id: &str) -> bool;
}

impl ArgMatchesExt for ArgMatches {
    fn get_category(&self, id: &str) -> Result<&Category, CliError> {
        self.get_one::<Category>(id).ok_or_else(|| {
            CliError::ValidationError(crate::ValidationErrorKind::InvalidCategoryName {
                name: id.to_string(),
                reason: "Category not provided".to_string(),
            })
        })
    }

    fn get_usize(&self, id: &str) -> Result<usize, CliError> {
        self.get_one::<usize>(id).copied().ok_or_else(|| {
            CliError::Other(format!("Required argument '{}' not provided", id))
        })
    }

    fn get_category_opt(&self, id: &str) -> Option<&Category> {
        self.get_one::<Category>(id)
    }

    fn get_f64_opt(&self, id: &str) -> Option<f64> {
        self.get_one::<f64>(id).copied()
    }

    fn get_usize_opt(&self, id: &str) -> Option<usize> {
        self.get_one::<usize>(id).copied()
    }

    fn get_string_opt(&self, id: &str) -> Option<String> {
        self.get_one::<String>(id).cloned()
    }

    fn get_subcategory_opt(&self, id: &str) -> Option<String> {
        self.get_one::<String>(id).cloned()
    }

    fn get_date_opt(&self, id: &str) -> Option<NaiveDate> {
        self.get_one::<NaiveDate>(id).copied()
    }

    fn get_currency_opt(&self, id: &str) -> Option<&Currency> {
        self.get_one::<Currency>(id)
    }

    fn get_f64_or_default(&self, id: &str) -> f64 {
        self.get_one::<f64>(id).copied().unwrap_or(DEFAULT_F64)
    }

    fn get_usize_or_default(&self, id: &str) -> usize {
        self.get_one::<usize>(id).copied().unwrap_or(DEFAULT_USIZE)
    }

    fn get_string_or_default(&self, id: &str) -> String {
        self.get_one::<String>(id).cloned().unwrap_or_default()
    }

    fn get_subcategory_or_default(&self, id: &str) -> String {
        self.get_one::<String>(id)
            .cloned()
            .unwrap_or_else(|| DEFAULT_SUBCATEGORY.to_string())
    }

    fn get_currency_or_default(&self, id: &str) -> &Currency {
        self.get_one::<Currency>(id).unwrap_or(&Currency::NGN)
    }

    fn get_vec<T: Clone + Send + Sync + 'static>(&self, id: &str) -> Vec<T> {
        self.get_many::<T>(id)
            .map(|iter| iter.cloned().collect())
            .unwrap_or_default()
    }

    fn contains_id(&self, id: &str) -> bool {
        ArgMatches::contains_id(self, id)
    }
}
```

These helper methods allow you to decide exactly how to handle missing data. Methods like `ok_or_else` convert an empty input into a specific `CliError` that informs the user exactly which argument is missing. In contrast, `unwrap_or_else` allows the application to provide sensible fallbacks, such as defaulting to the "miscellaneous" subcategory if the user does not specify one.

### Implement Custom Data Parsers

Standard command-line arguments are received as strings. To turn them into useful data types like dates or categories, you need specific parsing logic. Create a new file <VPIcon icon="fas fa-folder-open"/>`src/utils/`<VPIcon icon="fa-brands fa-rust"/>`parsers.rs`:

```rs title="utils/parsers.rs"
use chrono::NaiveDate;
use crate::Category;

pub fn parse_date(s: &str) -> Result<NaiveDate, String> {
    NaiveDate::parse_from_str(s, "%d-%m-%Y")
        .map_err(|_| format!("'{}' is not in the format DD-MM-YYYY", s))
}

pub fn parse_category(s: &str) -> Result<Category, String> {
    s.parse::<Category>().map_err(|_| {
        format!("'{}' is not a valid category. Use 'income' or 'expenses'", s)
    })
}
```

We'll use these parsers to ensure that any input that doesn’t match your expected format is caught immediately with a clear error message before it ever reaches your core logic.

To finalize this setup, update <VPIcon icon="fas fa-folder-open"/>`src/`<VPIcon icon="fa-brands fa-rust"/>`utils.rs` to include the new helper files:

```rs title="utils.rs"
pub mod cli;
pub mod command_prelude;
pub mod context;
pub mod file;
pub mod parsers;
```

This infrastructure ensures that when you begin implementing the actual financial commands, you can focus on the business logic instead of fighting with string conversions and repeating argument validation.

Next we'll begin implementing the business logic for the commands, starting with the `init` command.

---

## Step 8: Implement the Init Command

The init command will set up the workspace for the financial tracker. It will handle the creation of the hidden directory structure in your home folder and generate the initial JSON file with default settings like the currency and starting balance.

Create the <VPIcon icon="fas fa-folder-open"/>`src/commands/`<VPIcon icon="fa-brands fa-rust"/>`init.rs` file and add this code:

```rs :collapsed-lines title="commands/init.rs"
use clap::{Arg, ArgMatches, Command};

use crate::command_prelude::ArgMatchesExt;
use crate::utils::file::{FilePath, write_json_to_file};
use crate::{CliResponse, CliResult, Currency, GlobalContext, default_tracker_json};

pub fn cli() -> Command {
    Command::new("init")
        .about("Initialize a new financial tracker")
        .arg(
            Arg::new("currency")
                .short('c')
                .value_parser(clap::value_parser!(Currency))
                .default_value("ngn"),
        )
        .arg(
            Arg::new("opening")
                .short('o')
                .value_parser(clap::value_parser!(f64)),
        )
}

pub fn exec(gctx: &mut GlobalContext, args: &ArgMatches) -> CliResult {
    let currency = args.get_currency_or_default("currency");
    let opening_balance = args.get_f64_or_default("opening");

    let mut file = gctx.tracker_path().create_file_if_not_exists()?;

    let default_json = default_tracker_json(currency, opening_balance);
    write_json_to_file(&default_json, &mut file)?;

    Ok(CliResponse::success())
}
```

The `cli` function defines the command's interface. `Command::new("init")` sets the name of the subcommand the user types. Within the `.arg()` blocks, `.short('c')` and `.long("currency")` allow for two different ways to provide the same data. A user can choose the concise short form or the more descriptive long form:

```sh
fintrack init -c usd -o 5000
# Or
fintrack init --currency usd --opening 5000
```

Both commands map to the same internal `"currency"` and `"opening"` arguments.

The `exec` function performs the actual initialization of the tracker. It uses the helpers built in previous steps to keep the logic concise. Specifically, it uses `get_currency_or_default` and `get_f64_or_default` from the `ArgMatchesExt` trait you created in <VPIcon icon="fas fa-folder-open"/>`src/utils/`<VPIcon icon="fa-brands fa-rust"/>`cli.rs`.

When attempting :collapsed-lines to create the tracker file, it calls `create_file_if_not_exists`. This method belongs to the `FilePath` trait you implemented in <VPIcon icon="fas fa-folder-open"/>`src/utils/`<VPIcon icon="fa-brands fa-rust"/>`file.rs`. Because that method was built using `create_new(true)`, it acts as a guard that fails if a tracker already exists with an error `std::io::ErrorKind::AlreadyExists`. This failure is caught and converted into a `CliError::FileAlreadyExists` message, which was defined in your error handling logic in <VPIcon icon="fas fa-folder-open"/>`src/`<VPIcon icon="fa-brands fa-rust"/>`error.rs`.

The `default_tracker_json` function builds the initial state for the application. It packages the base currency, opening balance, and default "miscellaneous" subcategory into a JSON structure. Finally, the `write_json_to_file` helper from <VPIcon icon="fas fa-folder-open"/>`src/utils/`<VPIcon icon="fa-brands fa-rust"/>`file.rs` writes this data to the disk.

---

## Step 9: Implement the Add Command

The `add` command will add a new record. To do this, you’ll implement code that will read the existing data from the JSON file, validate the new input, and save the updated record back to the JSON file.

Create <VPIcon icon="fas fa-folder-open"/>`src/commands/`<VPIcon icon="fa-brands fa-rust"/>`add.rs` and insert this code:

```rs :collapsed-lines title="commands/add.rs"
use chrono::Local;
use clap::{Arg, ArgMatches, Command};

use crate::command_prelude::ArgMatchesExt;
use crate::utils::file::{FilePath, write_json_to_file};
use crate::utils::parsers::{parse_category, parse_date};
use crate::{
    CliError, CliResponse, CliResult, GlobalContext, Record, ResponseContent, TrackerData,
};

pub fn cli() -> Command {
    Command::new("add")
        .about("Record a new income or expense transaction")
        .arg(
            Arg::new("category")
                .index(1)
                .required(true)
                .value_parser(parse_category),
        )
        .arg(
            Arg::new("amount")
                .index(2)
                .required(true)
                .value_parser(clap::value_parser!(f64)),
        )
        .arg(
            Arg::new("subcategory")
                .short('s')
                .long("subcategory")
                .default_value("miscellaneous"),
        )
        .arg(
            Arg::new("description")
                .short('d')
                .long("description"),
        )
        .arg(
            Arg::new("date")
                .short('D')
                .long("date")
                .value_parser(parse_date),
        )
}

pub fn exec(gctx: &mut GlobalContext, args: &ArgMatches) -> CliResult {
    let mut file = gctx.tracker_path().open_read_write()?;
    let mut tracker_data: TrackerData = serde_json::from_reader(&file)?;

    let category = args.get_category("category")?;
    let amount = args.get_f64_or_default("amount");

    if amount <= 0.0 {
        return Err(CliError::ValidationError(
            crate::ValidationErrorKind::AmountTooSmall { amount },
        ));
    }

    let subcategory_name = args.get_subcategory_or_default("subcategory");
    let description = args.get_string_or_default("description");

    let category_str = category.to_string();
    let category_id = tracker_data.category_id(&category_str);

    let subcategory_id = tracker_data
        .subcategory_id(&subcategory_name)
        .ok_or_else(|| {
            CliError::ValidationError(crate::ValidationErrorKind::SubcategoryNotFound {
                name: subcategory_name,
            })
        })?;

    let date = args
        .get_date_opt("date")
        .map(|d| d.format("%d-%m-%Y").to_string())
        .unwrap_or_else(|| Local::now().format("%d-%m-%Y").to_string());

    let record_id = tracker_data.next_record_id;
    let record = Record {
        id: record_id,
        category: category_id,
        amount,
        subcategory: subcategory_id,
        description,
        date,
    };

    tracker_data.next_record_id += 1;
    tracker_data.last_modified = chrono::Utc::now().to_rfc3339();
    tracker_data.push_record(record.clone());

    let tracker_json = serde_json::json!(tracker_data);
    write_json_to_file(&tracker_json, &mut file)?;

    Ok(CliResponse::new(ResponseContent::Record {
        record,
        tracker_data,
        is_update: false,
    }))
}
```

The `cli` function here defines positional arguments using `.index(1)` and `.index(2)`. This means users can provide the category and amount without specific flags. An example usage looks like this:

```sh
fintrack add income 1500 -s salary -d "Monthly pay"
```

In this command, `"income"` maps to the `"category"` and 1500 maps to the `"amount"`. The parser logic for these inputs makes use of the `parse_category` and `parse_date` functions created in <VPIcon icon="fas fa-folder-open"/>`src/utils/`<VPIcon icon="fa-brands fa-rust"/>`parsers.rs`.

The `exec` function here opens the data file with `open_read_write` from the `FilePath` trait (<VPIcon icon="fas fa-folder-open"/>`src/utils/`<VPIcon icon="fa-brands fa-rust"/>`file.rs`) and extracts user input using the `ArgMatchesExt` trait (<VPIcon icon="fas fa-folder-open"/>`src/utils/`<VPIcon icon="fa-brands fa-rust"/>`cli.rs`).

The date :collapsed-lines logic handles optional input through a chain of methods. `ge title="utils/cli.rs"t_date_opt` returns an `Option`, such that when a date exists, `.map` transforms it into the required string format. When a date doesn’t exist, `.unwrap_or_else` provides the current system date as a default.

Once the `Record` struct is populated, the code updates the `TrackerData` state and saves the result using the `write_json_to_file` helper. The final `CliResponse` contains the record details for the output module in <VPIcon icon="fas fa-folder-open"/>`src/output.rs` to display.

---

## Step 10: Implement the List Command

The `list` command will provide a way to view and filter records. This logic involves loading the data file, applying criteria like date ranges or categories, and sorting the results chronologically.

Create <VPIcon icon="fas fa-folder-open"/>`src/commands/`<VPIcon icon="fa-brands fa-rust"/>`list.rs` and add the following code:

```rs :collapsed-lines title="commands/list.rs"
use chrono::NaiveDate;
use clap::{Arg, ArgGroup, ArgMatches, Command};

use crate::command_prelude::ArgMatchesExt;
use crate::utils::file::FilePath;
use crate::utils::parsers::{parse_category, parse_date};
use crate::{CliResponse, CliResult, GlobalContext, Record, ResponseContent, TrackerData};

pub fn cli() -> Command {
    Command::new("list")
        .about("View and filter your transaction records")
        .arg(
            Arg::new("first")
                .short('f')
                .long("first")
                .value_parser(clap::value_parser!(usize)),
        )
        .arg(
            Arg::new("last")
                .short('l')
                .long("last")
                .value_parser(clap::value_parser!(usize)),
        )
        .group(
            ArgGroup::new("first_or_last")
                .args(["first", "last"])
                .multiple(false),
        )
        .arg(
            Arg::new("start")
                .short('S')
                .long("start")
                .value_parser(parse_date),
        )
        .arg(
            Arg::new("end")
                .short('E')
                .long("end")
                .value_parser(parse_date),
        )
        .arg(
            Arg::new("category")
                .short('c')
                .long("category")
                .value_parser(parse_category),
        )
        .arg(
            Arg::new("subcategory")
                .short('s')
                .long("subcategory"),
        )
}

pub fn exec(gctx: &mut GlobalContext, args: &ArgMatches) -> CliResult {
    let file = gctx.tracker_path().open_read()?;
    let tracker_data: TrackerData = serde_json::from_reader(&file)?;

    let start_date = args.get_date_opt("start");
    let end_date = args.get_date_opt("end");

    let category_filter = args
        .get_category_opt("category")
        .map(|cat| tracker_data.category_id(&cat.to_string()));

    let subcategory_filter = args
        .get_subcategory_opt("subcategory")
        .and_then(|name| tracker_data.subcategory_id(&name));

    let mut filtered_data: Vec<Record> = tracker_data
        .records
        .iter()
        .filter(|r| {
            let matches_category = category_filter
                .map(|expected_id| r.category == expected_id)
                .unwrap_or(true);

            let matches_subcategory = subcategory_filter
                .map(|expected_id| r.subcategory == expected_id)
                .unwrap_or(true);

            let matches_date = NaiveDate::parse_from_str(&r.date, "%d-%m-%Y")
                .map(|record_date| {
                    let after_start = start_date.map_or(true, |start| record_date >= start);
                    let before_end = end_date.map_or(true, |end| record_date <= end);
                    after_start && before_end
                })
                .unwrap_or(false);

            matches_category && matches_subcategory && matches_date
        })
        .cloned()
        .collect();

    filtered_data.sort_by(|a, b| {
        let date_a = NaiveDate::parse_from_str(&a.date, "%d-%m-%Y").unwrap_or(NaiveDate::MIN);
        let date_b = NaiveDate::parse_from_str(&b.date, "%d-%m-%Y").unwrap_or(NaiveDate::MIN);
        date_a.cmp(&date_b)
    });

    if args.contains_id("first") {
        let first = args.get_usize_or_default("first");
        if first > 0 {
            filtered_data.truncate(first);
        }
    } else if args.contains_id("last") {
        let last = args.get_usize_or_default("last");
        if last > 0 && filtered_data.len() > last {
            let start_idx = filtered_data.len() - last;
            filtered_data = filtered_data.into_iter().skip(start_idx).collect();
        }
    }

    Ok(CliResponse::new(ResponseContent::List {
        records: filtered_data,
        tracker_data,
    }))
}
```

The `cli` function utilizes an `ArgGroup` named `"first_or_last"`. This ensures the user cannot request both the first N and last N records at the same time. The command supports multiple filtering flags, which allows a user to run queries like:

```sh
fintrack list -c expenses -S 01-01-2024 -E 31-01-2024
```

The command above filters for "expenses" specifically within the month of January 2024. The `exec` function uses `open_read` from the `FilePath` trait (<VPIcon icon="fas fa-folder-open"/>`src/utils/`<VPIcon icon="fa-brands fa-rust"/>`file.rs`) to access the tracker file without write permissions. The filtering logic makes use of methods like `and_then` and `map_or` to handle optional criteria. For example, the date filter uses `map_or(true, ...)` to include a record if no specific start or end date was provided.

The record sorting uses `sort_by` to compare record dates. Since dates are stored as strings in the JSON file, they are parsed into `NaiveDate` objects temporarily for an accurate chronological comparison. Finally, the function uses `truncate` or `skip` to limit the results based on the `"first"` or `"last"` arguments before returning a `ResponseContent::List` for the output module in <VPIcon icon="fas fa-folder-open"/>`src/output.rs` to process.

---

## Step 11: Implement the Update Command

The `update` command will allow the user to modify specific fields in an existing record. It will accept similar arguments as the `add` command but unlike the `add` command, every argument except the ID will be optional, enabling the user to change only what is necessary.

Create <VPIcon icon="fas fa-folder-open"/>`src/commands/`<VPIcon icon="fa-brands fa-rust"/>`update.rs` and add the following code:

```rs :collapsed-lines title="commands/update.rs"
use clap::{Arg, ArgMatches, Command};

use crate::command_prelude::ArgMatchesExt;
use crate::utils::file::{FilePath, write_json_to_file};
use crate::utils::parsers::{parse_category, parse_date};
use crate::{CliError, CliResponse, CliResult, GlobalContext, ResponseContent, TrackerData};

pub fn cli() -> Command {
    Command::new("update")
        .about("Modify an existing transaction record")
        .arg(
            Arg::new("record_id")
                .index(1)
                .required(true)
                .value_parser(clap::value_parser!(usize)),
        )
        .arg(
            Arg::new("category")
                .short('c')
                .long("category")
                .value_parser(parse_category),
        )
        .arg(
            Arg::new("amount")
                .short('a')
                .long("amount")
                .value_parser(clap::value_parser!(f64)),
        )
        .arg(
            Arg::new("subcategory")
                .short('s')
                .long("subcategory"),
        )
        .arg(
            Arg::new("description")
                .short('d')
                .long("description"),
        )
        .arg(
            Arg::new("date")
                .short('D')
                .long("date")
                .value_parser(parse_date),
        )
}

pub fn exec(gctx: &mut GlobalContext, args: &ArgMatches) -> CliResult {
    let mut file = gctx.tracker_path().open_read_write()?;
    let mut tracker_data: TrackerData = serde_json::from_reader(&file)?;

    let record_id = args
        .get_usize("record_id")
        .map_err(|_| CliError::ValidationError(crate::ValidationErrorKind::RecordNotFound { id: 0 }))?;

    let category_id = args.get_category_opt("category").map(|category| {
        let category_str = category.to_string();
        tracker_data.category_id(&category_str)
    });

    let subcategory_id = args
        .get_subcategory_opt("subcategory")
        .map(|name| {
            tracker_data.subcategory_id(&name).ok_or_else(|| {
                CliError::ValidationError(crate::ValidationErrorKind::SubcategoryNotFound { name })
            })
        })
        .transpose()?;

    let record = tracker_data
        .records
        .iter_mut()
        .find(|r| r.id == record_id)
        .ok_or_else(|| {
            CliError::ValidationError(crate::ValidationErrorKind::RecordNotFound { id: record_id })
        })?;

    if let Some(cat_id) = category_id {
        record.category = cat_id;
    }

    if let Some(amount) = args.get_f64_opt("amount") {
        if amount <= 0.0 {
            return Err(CliError::ValidationError(
                crate::ValidationErrorKind::AmountTooSmall { amount },
            ));
        }
        record.amount = amount;
    }

    if let Some(subcat_id) = subcategory_id {
        record.subcategory = subcat_id;
    }

    if let Some(description) = args.get_string_opt("description") {
        record.description = description;
    }

    if let Some(date) = args.get_date_opt("date") {
        record.date = date.format("%d-%m-%Y").to_string();
    }

    tracker_data.last_modified = chrono::Utc::now().to_rfc3339();

    let updated_record = record.clone();

    let tracker_json = serde_json::json!(tracker_data);
    write_json_to_file(&tracker_json, &mut file)?;

    Ok(CliResponse::new(ResponseContent::Record {
        record: updated_record,
        tracker_data,
        is_update: true,
    }))
}
```

The `cli` function requires a positional `"record_id"` so the program knows which record to target. Users can find this ID by running the `list` command. An `update` command looks like this:

```sh
fintrack update 5 -a 2000 -d "Updated price"
```

The command above specifically updates the amount and description for record number 5, leaving all other fields unchanged.

The `exec` function uses `iter_mut()` and `find()` to locate the specific record in your data list. Because `iter_mut()` provides a mutable reference, any changes made to the record variable directly update the object inside `tracker_data.records`.

To handle the optional subcategory update, the code uses `transpose()`. This method is essential here because looking up a subcategory name is optional. But if a name is provided and it doesn't exist, the program should stop and return an error. `transpose()` flips the `Option<Result>` into a `Result<Option>`, allowing the `?` operator to handle the error while still giving you an `Option` to work with.

The final state is saved back to the file using the `write_json_to_file` helper from <VPIcon icon="fas fa-folder-open"/>`src/utils/`<VPIcon icon="fa-brands fa-rust"/>`file.rs`. The `CliResponse` indicates that an update occurred by setting `is_update: true`, which the `output` module uses to format the success message appropriately.

---

## Step 12: Implement the Delete Command

The `delete` command will remove specific records from the tracker. This implementation will support multiple deletion strategies: targeting individual IDs, removing an entire category, or clearing a specific subcategory.

```rs :collapsed-lines title="commands/delete.rs"
use std::collections::HashSet;

use clap::{Arg, ArgAction, ArgGroup, ArgMatches, Command};

use crate::{
    CliResponse, CliResult, GlobalContext, TrackerData,
    command_prelude::ArgMatchesExt,
    utils::file::{FilePath, write_json_to_file},
    utils::parsers::parse_category,
};

pub fn cli() -> Command {
    Command::new("delete")
        .about("Delete transaction records")
        .arg(
            Arg::new("ids")
                .short('i')
                .long("ids")
                .value_parser(clap::value_parser!(usize))
                .action(ArgAction::Append)
                .value_delimiter(','),
        )
        .arg(
            Arg::new("by-cat")
                .short('c')
                .long("by-cat")
                .value_parser(parse_category),
        )
        .arg(
            Arg::new("by-subcat")
                .short('s')
                .long("by-subcat"),
        )
        .group(
            ArgGroup::new("delete_by")
                .args(["ids", "by-cat", "by-subcat"])
                .multiple(false)
                .required(true),
        )
}

pub fn exec(gctx: &mut GlobalContext, args: &ArgMatches) -> CliResult {
    let mut file = gctx.tracker_path().open_read_write()?;
    let mut tracker_data: TrackerData = serde_json::from_reader(&file)?;

    if args.contains_id("ids") {
        let ids: Vec<usize> = args.get_vec::<usize>("ids");
        let ids_set: HashSet<usize> = ids.into_iter().collect();

        tracker_data.records.retain(|r| !ids_set.contains(&r.id));
    } else if args.contains_id("by-cat") {
        let category = args.get_category("by-cat")?;
        let category_str = category.to_string();
        let category_id = tracker_data.category_id(&category_str);

        tracker_data.records.retain(|r| r.category != category_id);
    } else if args.contains_id("by-subcat") {
        let subcategory_name = args
            .get_subcategory_opt("by-subcat")
            .ok_or_else(|| crate::CliError::Other("Subcategory not provided".to_string()))?;

        let subcategory_id = tracker_data
            .subcategory_id(subcategory_name.as_str())
            .ok_or_else(|| {
                crate::CliError::ValidationError(crate::ValidationErrorKind::SubcategoryNotFound {
                    name: subcategory_name.clone(),
                })
            })?;

        tracker_data
            .records
            .retain(|r| r.subcategory != subcategory_id);
    }

    tracker_data.last_modified = chrono::Utc::now().to_rfc3339();

    let tracker_json = serde_json::json!(tracker_data);
    write_json_to_file(&tracker_json, &mut file)?;

    Ok(CliResponse::success())
}
```

The `cli` function makes use of an `ArgGroup` to enforce that only one deletion method is used at a time (`"ids`, `"by-cat"`, or `"by-subcat"`). The `"ids"` argument uses `value_delimiter(',')`, allowing a user to pass multiple IDs separated by a comma (','). For example:

```sh
fintrack delete --ids 1,4,7
```

Also, a user can clear all records of a particular category or subcategory using the `"by-cat"` or `"by-subcat"` flag. For example:

```sh
fintrack delete --by-cat expenses
```

The `exec` function determines which records to target based on three possible inputs. If `--ids` is used, it collects the provided values directly into a HashSet. If `--by-cat` or `--by-subcat` is used, the code iterates through existing records and gathers the IDs of every record that matches that specific category or subcategory and stores it in a HashSet. Regardless of the flag used, the logic converges on a HashSet containing all IDs scheduled for removal.

Using a HashSet makes the final cleanup highly efficient because it allows the program to check if an ID exists in the "delete list" almost instantly. The retain method then keeps only the records whose IDs are not in that set, effectively pruning the data in place.

After the removal, the code calculates the difference between the initial and final record counts. If no records were removed, it returns a `RecordNotFound` error. Otherwise, it updates the `last_modified` timestamp and saves the updated JSON using the `write_json_to_file` helper from <VPIcon icon="fas fa-folder-open"/>`src/utils/`<VPIcon icon="fa-brands fa-rust"/>`file.rs`.

---

## Step 13: Implement Subcategory Commands

The `subcategory` command will serve as a parent for several nested subcommands, allowing users to organize their records beyond the basic "income" and "expenses" categories. This structure will use a modular approach, where each management task will live in its own dedicated file.

Create the entry point file at <VPIcon icon="fas fa-folder-open"/>`src/commands/`<VPIcon icon="fa-brands fa-rust"/>`subcategory.rs`:

```rs :collapsed-lines title="commands/subcategory.rs"
use clap::{ArgMatches, Command};

use crate::{CliResult, GlobalContext, commands::Exec, invalid_subcommand_error};

pub fn cli() -> Command {
    Command::new("subcategory")
        .about("Manage your subcategories")
        .subcommand_required(true)
        .subcommands(build_cli())
}

pub fn exec(gctx: &mut GlobalContext, args: &ArgMatches) -> CliResult {
    match args.subcommand() {
        Some((cmd, sub_args)) => {
            let exec_fn = build_exec(cmd).ok_or_else(|| invalid_subcommand_error(cmd))?;

            exec_fn(gctx, sub_args)
        }
        None => Err(invalid_subcommand_error("")),
    }
}

fn build_cli() -> Vec<Command> {
    vec![add::cli(), delete::cli(), list::cli(), rename::cli()]
}

fn build_exec(cmd: &str) -> Option<Exec> {
    match cmd {
        "add" => Some(add::exec),
        "delete" => Some(delete::exec),
        "list" => Some(list::exec),
        "rename" => Some(rename::exec),
        "update" => Some(rename::exec),
        _ => None,
    }
}

pub mod list;
pub mod add;
pub mod delete;
pub mod rename;
```

The `cli` function here sets `subcommand_required(true)`. This means the user must specify an action. The `exec` function uses a `match` statement to delegate the logic to the appropriate module.

### List Subcategories

Create <VPIcon icon="fas fa-folder-open"/>`src/commands/subcategory/`<VPIcon icon="fa-brands fa-rust"/>`list.rs`:

```rs :collapsed-lines title="commands/subcategory/list.rs"
use clap::{ArgMatches, Command};

use crate::{CliResponse, CliResult, GlobalContext, ResponseContent, TrackerData, utils::file::FilePath};

pub fn cli() -> Command {
    Command::new("list")
        .about("View all available subcategories")
}

pub fn exec(gctx: &mut GlobalContext, _args: &ArgMatches) -> CliResult {
    let file = gctx.tracker_path().open_read()?;
    let tracker_data: TrackerData = serde_json::from_reader(&file)?;

    let mut subcategories: Vec<(usize, String)> = tracker_data
        .subcategories_by_id
        .iter()
        .map(|(&id, name)| (id, name.clone()))
        .collect();

    subcategories.sort_by_key(|(id, _)| *id);

    Ok(CliResponse::new(ResponseContent::Subcategories(subcategories)))
}
```

The `exec` function first accesses the data file using the `open_read` helper method defined earlier in <VPIcon icon="fas fa-folder-open"/>`src/utils/`<VPIcon icon="fa-brands fa-rust"/>`file.rs`. Once the file is open, it reads the JSON content into the `TrackerData` struct. The logic then pulls the specific list of IDs and names from the `subcategories_by_id` map found in <VPIcon icon="fas fa-folder-open"/>`src/`<VPIcon icon="fa-brands fa-rust"/>`models.rs` and converts them into a simple list for the user to view.

### Add Subcategories

Create <VPIcon icon="fas fa-folder-open"/>`src/commands/subcategory/`<VPIcon icon="fa-brands fa-rust"/>`add.rs`:

```rs :collapsed-linse title="commands/subcategory/add.rs"
use clap::{Arg, ArgMatches, Command};

use crate::{
    CliError, CliResponse, CliResult, GlobalContext, TrackerData,
    utils::file::{FilePath, write_json_to_file},
    utils::parsers::parse_label,
};

pub fn cli() -> Command {
    Command::new("add")
        .about("Create a new subcategory")
        .arg(
            Arg::new("name")
                .index(1)
                .required(true)
                .value_parser(parse_label),
        )
}

pub fn exec(gctx: &mut GlobalContext, args: &ArgMatches) -> CliResult {
    let mut file = gctx.tracker_path().open_read_write()?;
    let mut tracker_data: TrackerData = serde_json::from_reader(&file)?;

    let name = args
        .get_one::<String>("name")
        .ok_or_else(|| CliError::Other("Subcategory name not provided".to_string()))?;

    let name_lower = name.to_lowercase();
    let name_title = {
        let mut chars = name_lower.chars();
        match chars.next() {
            None => return Err(CliError::Other("Invalid name".to_string())),
            Some(first) => first.to_uppercase().collect::<String>() + &chars.as_str().to_lowercase(),
        }
    };

    if name_lower == "miscellaneous" {
        return Err(CliError::ValidationError(
            crate::ValidationErrorKind::CannotDeleteMiscellaneous,
        ));
    }

    if tracker_data.subcategories_by_name.contains_key(&name_lower) {
        return Err(CliError::ValidationError(
            crate::ValidationErrorKind::SubcategoryAlreadyExists {
                name: name_title.clone(),
            },
        ));
    }

    let subcategory_id = tracker_data.next_subcategory_id as usize;
    tracker_data.subcategories_by_id.insert(subcategory_id, name_title.clone());
    tracker_data.subcategories_by_name.insert(name_lower, subcategory_id);
    tracker_data.next_subcategory_id += 1;
    tracker_data.last_modified = chrono::Utc::now().to_rfc3339();

    let tracker_json = serde_json::json!(tracker_data);
    write_json_to_file(&tracker_json, &mut file)?;

    Ok(CliResponse::new(crate::ResponseContent::Message(format!(
        "Subcategory '{}' added (ID: {})",
        name_title, subcategory_id
    ))))
}
```

The `exec` function here makes use of `open_read_write` to load the data for modification. It retrieves the user's input through the `get_string_opt` helper from the `ArgMatchesExt` trait.

To maintain consistency, the `normalize_name` function ensures all names follow a standard title case format. Before saving, the logic checks the `subcategories_by_name` map from <VPIcon icon="fas fa-folder-open"/>`src/`<VPIcon icon="fa-brands fa-rust"/>`models.rs` to ensure the name is unique.

Once validated, it updates the `next_subcategory_id` and writes the changes back to disk using `write_json_to_file`.

### Delete Subcategories

Create <VPIcon icon="fas fa-folder-open"/>`src/commands/subcategory/`<VPIcon icon="fa-brands fa-rust"/>`delete.rs`:

```rs :collapsed-lines title="commands/subcategory/delete.rs"
use clap::{Arg, ArgMatches, Command};

use crate::{
    CliError, CliResponse, CliResult, GlobalContext, TrackerData,
    utils::file::{FilePath, write_json_to_file},
    utils::parsers::parse_label,
};

pub fn cli() -> Command {
    Command::new("delete")
        .about("Delete a subcategory")
        .arg(
            Arg::new("name")
                .index(1)
                .required(true)
                .value_parser(parse_label),
        )
}

pub fn exec(gctx: &mut GlobalContext, args: &ArgMatches) -> CliResult {
    let mut file = gctx.tracker_path().open_read_write()?;
    let mut tracker_data: TrackerData = serde_json::from_reader(&file)?;

    let name = args
        .get_one::<String>("name")
        .ok_or_else(|| CliError::Other("Subcategory name not provided".to_string()))?;

    let name_lower = name.to_lowercase();

    if name_lower == "miscellaneous" {
        return Err(CliError::ValidationError(
            crate::ValidationErrorKind::CannotDeleteMiscellaneous,
        ));
    }

    let subcategory_id = tracker_data
        .subcategory_id(&name_lower)
        .ok_or_else(|| {
            CliError::ValidationError(crate::ValidationErrorKind::SubcategoryNotFound {
                name: name.to_string(),
            })
        })?;

    let record_count = tracker_data
        .records
        .iter()
        .filter(|r| r.subcategory == subcategory_id)
        .count();

    if record_count > 0 {
        return Err(CliError::ValidationError(
            crate::ValidationErrorKind::SubcategoryHasRecords {
                name: name.to_string(),
                count: record_count,
            },
        ));
    }

    tracker_data.subcategories_by_id.remove(&subcategory_id);
    tracker_data.subcategories_by_name.remove(&name_lower);
    tracker_data.last_modified = chrono::Utc::now().to_rfc3339();

    let tracker_json = serde_json::json!(tracker_data);
    write_json_to_file(&tracker_json, &mut file)?;

    Ok(CliResponse::new(crate::ResponseContent::Message(format!(
        "Subcategory '{}' deleted",
        name
    ))))
}
```

The `exec` function performs a safety check before removing any data. It first locates the ID of the target subcategory using the name provided by the user. Then, it iterates through the records vector in the tracker data to count if any records are currently linked to that ID. If the count is greater than zero, the operation stops and returns a `SubcategoryHasRecords` error, preventing you from accidentally creating "orphaned" records that point to a missing subcategory. If the check passes, the subcategory is removed from both HashMaps in <VPIcon icon="fas fa-folder-open"/>`src/`<VPIcon icon="fa-brands fa-rust"/>`models.rs`.

### Rename Subcategories

Create <VPIcon icon="fas fa-folder-open"/>`src/commands/subcategory/`<VPIcon icon="fa-brands fa-rust"/>`rename.rs`:

```rs :collapsed-lines title="commands/subcategory/rename.rs"
use clap::{Arg, ArgMatches, Command};

use crate::{
    CliError, CliResponse, CliResult, GlobalContext, TrackerData,
    utils::file::{FilePath, write_json_to_file},
    utils::parsers::parse_label,
};

pub fn cli() -> Command {
    Command::new("rename")
        .about("Rename an existing subcategory")
        .arg(
            Arg::new("old")
                .index(1)
                .required(true)
                .value_parser(parse_label),
        )
        .arg(
            Arg::new("new")
                .index(2)
                .required(true)
                .value_parser(parse_label),
        )
}

pub fn exec(gctx: &mut GlobalContext, args: &ArgMatches) -> CliResult {
    let mut file = gctx.tracker_path().open_read_write()?;
    let mut tracker_data: TrackerData = serde_json::from_reader(&file)?;

    let old_name = args
        .get_one::<String>("old")
        .ok_or_else(|| CliError::Other("Old subcategory name not provided".to_string()))?;
    let new_name = args
        .get_one::<String>("new")
        .ok_or_else(|| CliError::Other("New subcategory name not provided".to_string()))?;

    let old_name_lower = old_name.to_lowercase();
    let new_name_lower = new_name.to_lowercase();
    let new_name_title = {
        let mut chars = new_name_lower.chars();
        match chars.next() {
            None => return Err(CliError::Other("Invalid new name".to_string())),
            Some(first) => first.to_uppercase().collect::<String>() + &chars.as_str().to_lowercase(),
        }
    };

    let subcategory_id = tracker_data
        .subcategory_id(&old_name_lower)
        .ok_or_else(|| {
            CliError::ValidationError(crate::ValidationErrorKind::SubcategoryNotFound {
                name: old_name.to_string(),
            })
        })?;

    if tracker_data.subcategories_by_name.contains_key(&new_name_lower) {
        return Err(CliError::ValidationError(
            crate::ValidationErrorKind::SubcategoryAlreadyExists {
                name: new_name_title.clone(),
            },
        ));
    }

    tracker_data
        .subcategories_by_id
        .insert(subcategory_id, new_name_title.clone());
    tracker_data.subcategories_by_name.remove(&old_name_lower);
    tracker_data
        .subcategories_by_name
        .insert(new_name_lower, subcategory_id);
    tracker_data.last_modified = chrono::Utc::now().to_rfc3339();

    let tracker_json = serde_json::json!(tracker_data);
    write_json_to_file(&tracker_json, &mut file)?;

    Ok(CliResponse::new(crate::ResponseContent::Message(format!(
        "Subcategory renamed: '{}' → '{}'",
        old_name, new_name_title
    ))))
}
```

The `exec` function implements a "swap" logic to preserve record history. It first finds the numeric ID associated with the current name. Instead of changing any individual record, it simply removes the old name from the `subcategories_by_name` HashMap and inserts the new name with the same ID. This ensures that all existing records in <VPIcon icon="fas fa-folder-open"/>`src/`<VPIcon icon="fa-brands fa-rust"/>`models.rs` immediately reflect the new name because they reference the subcategory by ID rather than by a string.

---

## Step 14: Implement the Total Command

The `total` command will aggregate every transaction record in your JSON file to provide a clear view of your ledger's standing. It will sum up all income and expenses to show you exactly how your balance has changed since you initialized the tracker.

Create <VPIcon icon="fas fa-folder-open"/>`src/commands/total.rs` and add the following code:

```rs :collapsed-lines title="commands/total.rs"
use clap::{ArgMatches, Command};

use crate::{
    CliError, CliResponse, CliResult, Currency, GlobalContext, Total, TrackerData,
    utils::file::FilePath,
};

pub fn cli() -> Command {
    Command::new("total")
        .about("Display financial summary with totals")
}


pub fn exec(gctx: &mut GlobalContext, _args: &ArgMatches) -> CliResult {
  let file = gctx.tracker_path().open_read()?;
  let tracker_data: TrackerData = serde_json::from_reader(&file)?;

  let opening_balance = tracker_data.opening_balance;

  let currency = tracker_data
    .currency
    .parse::<Currency>()
    .map_err(|e| CliError::Other(format!("Invalid currency in tracker data: {}", e)))?;

  let (income_total, expenses_total) = tracker_data.totals();

  Ok(CliResponse::new(crate::ResponseContent::Total(Total {
    currency,
    opening_balance,
    income_total,
    expenses_total,
  })))
}
```

The `cli` function defines a straightforward interface without extra flags. It focuses entirely on processing the complete dataset.

The `exec` function first accesses the data file using the `open_read` helper. After parsing the JSON into the `TrackerData` struct, the logic calls the `totals()` method you implemented in <VPIcon icon="fas fa-folder-open"/>`src/`<VPIcon icon="fa-brands fa-rust"/>`models.rs`. That method iterates through your records to return the raw sums of all income and expenses.

The `Total` struct contains the opening balance, income total, and expenses total. The net balance is calculated in the output module by adding `income_total` to the `opening_balance` and subtracting `expenses_total`. Finally you return a `CliResponse` which allows the output module to take these raw numbers and render them in the terminal.

---

## Step 15: Wire Up the Main Function

This step brings every separate module back to the source. Until now, the models, error handling, and command logic existed as isolated parts. You will now create the <VPIcon icon="fa-brands fa-rust"/>`main.rs` file to establish the central entry point that connects these pieces, allowing the application to function as a unified binary.

First, update <VPIcon icon="fas fa-folder-open"/>`src/`<VPIcon icon="fa-brands fa-rust"/>`lib.rs` to expose the internal modules:

```rs :collapsed-lines title="lib.rs"
pub mod commands;
pub mod error;
pub mod models;
pub mod output;
pub mod utils;

pub use error::*;
pub use models::*;
pub use utils::command_prelude;
pub use utils::context::GlobalContext;
pub use utils::parsers;
```

Next, create <VPIcon icon="fas fa-folder-open"/>`src/main.rs`:

```rs :collapsed-lines title="main.rs"
use std::io;

use clap::Command;
use fintrack::{GlobalContext, commands};

fn main() {
    let exit_code = match run() {
        Ok(_) => 0,
        Err(e) => {
            eprintln!("Error: {}", e);
            1
        }
    };
    std::process::exit(exit_code);
}

fn run() -> Result<(), String> {
    let home_dir = dirs::home_dir()
        .ok_or_else(|| "Failed to determine home directory".to_string())?;

    let mut gctx = GlobalContext::new(home_dir);

    let matches = Command::new("fintrack")
        .bin_name("fintrack")
        .about("A local-first CLI financial tracker for managing income and expenses")
        .version(env!("CARGO_PKG_VERSION"))
        .subcommand_required(true)
        .subcommands(commands::cli())
        .get_matches();

    let (cmd, args) = matches
        .subcommand()
        .expect("subcommand required but not found");

    let exec_fn = commands::build_exec(cmd)
        .ok_or_else(|| format!("Unknown command: {}", cmd))?;

    let exec_result = exec_fn(&mut gctx, args);
    process_result(&exec_result).expect("An error occurred displaying response");

    Ok(())
}

fn process_result(result: &fintrack::CliResult) -> io::Result<()> {
    match result {
        Ok(res) => res.write_to(&mut std::io::stdout()),
        Err(err) => err.write_to(&mut std::io::stderr()),
    }
}
```

The `main` function serves as the supervisor for the entire process. It triggers the `run` function and maps the final outcome to a standard system exit code. This informs the terminal whether the operation succeeded or encountered a failure.

The `run` function initiates a complete roundtrip through the architecture you built in previous steps. It starts by determining the user's home directory and passing it into `GlobalContext::new(home_dir)`. This instantiation creates the `gctx` object from Step 5, which determines the cross platform paths for the .fintrack folder and the tracker.json file.

When a user types a command like `fintrack add` in the terminal, the process begins by calling `commands::cli()`. This function, which you have defined in your central dispatcher <VPIcon icon="fas fa-folder-open"/>`src/commands.rs` from Step 5, collects the list of all available subcommands (`init`, `add`, `list`, etc). It pulls the specific configuration for each command into a single clap instance so the terminal can understand the user intent.

If the user provides the correct input and arguments and `clap`'s validation is passed, it calls `commands::build_exec(cmd)` which uses the pattern matching logic also defined in Step 5. This function returns a pointer to the specific `exec` function for that command. For example, if the user typed `fintrack add ...`, it retrieves the exec function from <VPIcon icon="fas fa-folder-open"/>`src/commands/`<VPIcon icon="fa-brands fa-rust"/>`add.rs`. The code then executes this function using a mutable reference to the `gctx` you just instantiated. This grants the command access to the file paths and data it needs.

The final execution phase happens in `process_result`. This function takes the `CliResult` returned by the command and calls the `write_to` method you defined earlier in the Step 6 output logic. Providing mutable references to `std::io::stdout()` for successes or `std::io::stderr()` for errors ensures the application prints the result or error message to the terminal.

---

## Test Your Application

You can build and test your application using cargo run. The double dash `--` tells Cargo to pass the following flags directly to your fintrack binary rather than interpreting them as Cargo arguments:

```sh
cargo build
cargo run -- init --currency USD --opening 1000
cargo run -- add income 500 --subcategory salary
cargo run -- add expenses 50 --subcategory groceries
cargo run -- list
cargo run -- total
```

### Install the Binary

Running with `cargo run` is useful during development, but you can install the binary directly to your system to use the `fintrack` command globally. It will use `fintrack` because that's the value in the `name` field in your Cargo.toml file, which you set in the first step when you ran `cargo new fintrack`.

Run this to install `fintack` as a command:

```sh
cargo install --path .
```

When you run the installation command, Cargo compiles your code in release mode and places the executable in your Cargo bin folder (typically <VPIcon icon="fas fa-folder-open"/>`~/.cargo/bin`). Once installed, the operating system recognizes `fintrack` as a standalone command. You can now call your application from any directory without prefixing it with `cargo`:

```sh
fintrack total
```

---

## What's Next and Advanced Features

Congratulations! You've built a complete local-first CLI financial tracker. The application you've created includes:

- Data persistence in JSON format
- Full CRUD operations for financial records
- Subcategory management
- Financial calculations
- Comprehensive error handling
- Type-safe command-line argument parsing

### Advanced Features to Explore

The modular architecture you built makes this tool easily extensible. To add new commands, you simply follow the pattern established in previous steps: create a new command module, define its logic, and register it within the `cli()` and `build_exec` functions in <VPIcon icon="fas fa-folder-open"/>`src/`<VPIcon icon="fa-brands fa-rust"/>`commands.rs`.

Consider implementing these features to enhance the tool:

- **Export**: Add an `export.rs` module to convert your JSON data into CSV format for analysis in spreadsheet applications.
- **Describe**: Create a command that uses terminal plotting libraries to generate visual charts of your spending patterns.
- **Enhanced Output Formatting**: Update <VPIcon icon="fas fa-folder-open"/>`src/output.rs` with libraries like `colored` or `tabled` to add colors and professional borders to your terminal summaries.

You can find the complete implementation of `fintrack` with all features, including advanced output formatting, export functionality, and more, in the [GitHub repository (<VPIcon icon="iconfont icon-github" />`steph-crown/fintrack`)](https://github.com/steph-crown/fintrack). The repository also includes installation instructions for downloading the binary or installing via Cargo.

---

## Conclusion

In this tutorial, you've learned how to:

- Structure a Rust CLI application with proper error handling
- Use traits to extend functionality
- Work with JSON serialization
- Parse and validate command-line arguments
- Manage file I/O operations
- Implement a complete data model with relationships

The patterns you've learned here apply to many Rust applications. Traits, error handling with `Result`, and the ownership system are fundamental to writing idiomatic Rust code. These techniques ensure that as the application grows, the code remains maintainable and safe.

The modular nature of this tracker also means that the source code is now a template for any local-first tool. By swapping out the financial models for other data types, this same architecture can power a task manager, a personal wiki, or a time tracker.

Keep building, and happy tracking!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build a Local-First CLI Financial Tracker with Rust [Full Handbook]",
  "desc": "Most financial apps store your sensitive data on remote servers. This requires you to trust a company with your records and rely on their service staying online. But if you build a local-first application, you can keep your data on your own machine i...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-local-first-cli-financial-tracker-with-rust.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
