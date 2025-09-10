---
lang: en-US
title: "What are Smart Pointers in Rust? Explained with Code Examples"
description: "Article(s) > What are Smart Pointers in Rust? Explained with Code Examples"
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
      content: "Article(s) > What are Smart Pointers in Rust? Explained with Code Examples"
    - property: og:description
      content: "What are Smart Pointers in Rust? Explained with Code Examples"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/smart-pointers-in-rust-with-code-examples.html
prev: /programming/rust/articles/README.md
date: 2024-10-30
isOriginal: false
author: Oduah Chigozie
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1730260779440/3d82425c-fdff-4a17-bb88-8193d964e6ba.jpeg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Rust > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/rust/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="What are Smart Pointers in Rust? Explained with Code Examples"
  desc="Smart pointers are data structures that act like pointers but contain extra information and have functionalities that make them excel over regular pointers in certain situations. So what are regular pointers? Regular pointers (just called “pointers”)..."
  url="https://freecodecamp.org/news/smart-pointers-in-rust-with-code-examples"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1730260779440/3d82425c-fdff-4a17-bb88-8193d964e6ba.jpeg"/>

Smart pointers are data structures that act like pointers but contain extra information and have functionalities that make them excel over regular pointers in certain situations.

So what are regular pointers? Regular pointers (just called “pointers”) are variables that hold memory addresses as their values. They allow programs to store, read, and write data to memory locations with their addresses.

Here’s a diagram to give an idea of what they are:

![Diagram showing a table of variables and memory addresses. "Text" and "Name" are pointers that hold addresses 0x80012 and 0x80018 respectively](https://cdn.hashnode.com/res/hashnode/image/upload/v1730198558597/cd21ca42-32bb-4b41-98d3-b30956a6a398.png)

In programming languages like C, C++, and Rust, pointers are useful for accessing manually allocated memory, but they come with these limitations:

- The memory address that a pointer holds can be deallocated while the pointer still references it, making it a dangling pointer.
- The pointer doesn’t help with managing the memory allocation, which can cause memory leaks or other types of memory bugs in cases where handling memory allocations are complex.

Rust doesn’t give the same level of control of pointers as with C and C++. However, like C++, Rust provides smart pointers that overcome the limitations of regular pointers while providing extra functionalities.

In Rust, there are four major types of smart pointers: `Box`, `Rc`, `Arc`, and `Weak`. I’ll be discussing them in this article. I’ll also touch a little on `RefCell`, because it adds a specific functionality that is missing in other smart pointers.

---

## `Box` Pointers

`Box` is the most straightforward type of a smart pointer. It allows you to manually allocate memory in the heap.

```rs
#[allow(dead_code)]
#[derive(Debug)]
struct Point {
    x: f32,
    y: f32,
}

fn main() {
    let point = Box::new(Point { x: 0.0, y: 0.0 });
    println!("{:?}", point);
}
```

You can access the contents of a `Box` pointer like you would with a regular variable:

```rs
println!("{}", point.x); // -> output: 0.0
println!("{}", point.y); // -> output: 0.0
```

It works almost identically to `malloc` in C and `new` in c++, with the exception that `Box` automatically gets freed when it goes out of scope, or when the program execution ends, as opposed to manually freeing the allocation in `malloc` and `new`.

---

## `Rc` and `Arc` Pointers

I’m putting `Rc` and `Arc` together because they’re very similar in what they do and how they work.

`Rc` and `Arc` are reference counted pointers that allow multiple ownership of a memory allocation. Similar to `Box`, they allocate memory in the heap, but what differentiates them from `Box` is that they also include a reference count.

`Rc` and `Arc` allows you to create multiple clones of a reference to a memory allocation. This allows you to move those references to multiple scopes, and in the case of `Arc`, multiple threads, without borrowing. For example:

```rs
use std::sync::Arc;
use std::thread;
use std::thread::JoinHandle;

struct GameState {
    user_name: String,
}

impl GameState {
    fn new() -> Self {
        GameState { user_name: "Chigozie".to_string() }
    }
}

fn main() {
    let mut threads: Vec<JoinHandle<()>> = vec![];
    let game_state = Arc::new( GameState::new() );

    let g1 = Arc::clone(&game_state); // first clone
    threads.push(thread::spawn(move || {
        let username = &g1.user_name;
        // ...
    }));

    let g2 = Arc::clone(&game_state); // second clone
    threads.push(thread::spawn(move || {
        let username = &g2.user_name;
        // ...
    }));

    let g3 = Arc::clone(&game_state); // third clone
    threads.push(thread::spawn(move || {
        let username = &g3.user_name;
        // ...
    }));

    let g4 = Arc::clone(&game_state); // fourth clone
    threads.push(thread::spawn(move || {
        let username = &g4.user_name;
        // ...
    }));

    let g5 = Arc::clone(&game_state); // fifth clone
    threads.push(thread::spawn(move || {
        let username = &g5.user_name;
        // ...
    }));

    for th in threads {
        th.join().unwrap();
    }
}
```

In this example, I created an instance of a game struct in an `Arc` data structure, spawned five threads, then created and passed five more `Arc` references of the game struct to the five spawned threads.

The difference between `Rc` and `Arc` pointers is that references in `Arc` pointers are counted atomically, while references in `Rc` pointers are counted using the usual mathematical operations. This means that the operations that go into counting the references in `Arc` pointers are guaranteed to not be interrupted or overlapped by other threads or processes, making them very useful for multi-threaded environments.

One useful application of `Rc` and `Arc` pointers is in reference-based data structures, like linked lists, where each node has its value and a reference to the next node. For example:

```rs
use std::rc::Rc;

#[derive(Debug)]
struct Node {
    value: i32,
    next: Option<Rc<Node>>,
}

fn main() {
    // A chain of nodes
    let node1 = Rc::new(Node { value: 1, next: None });
    let node2 = Rc::new(Node { value: 2, next: Some(Rc::clone(&node1)) });
    let node3 = Rc::new(Node { value: 3, next: Some(Rc::clone(&node2)) });

    // Multiple owners of node2
    let another_ref_to_node2 = Rc::clone(&node2);

    println!("Node 3: {:?}", node3);
    println!("Another reference to Node 2: {:?}", another_ref_to_node2);
}
```

The memory allocations pointed to by `Rc` and `Arc` references are dropped when their reference counts goes to 0. The reference count of `Rc` and `Arc` pointers goes to 0 when it and all its clones have gone out of scope, or have been dropped manually.

---

## `Weak` Pointers

Unlike `Arc` or `Rc` pointers, `Weak` pointers are non-owning references to memory allocations. This means that they don’t count towards ownership of the memory allocation and don’t stop memory allocations from being dropped.

`Weak` references are helpful in scenarios where you might prefer a reference to a memory allocation to prevent it from being deallocated. A good example of a scenario like this is a doubly linked list, where each node holds a reference to the next node and the previous node:

![Diagram of a doubly linked list. Each node in the doubly linked list has a pointer to the node that comes before it and the node that comes after it.](https://cdn.hashnode.com/res/hashnode/image/upload/v1729610464614/f2f11dcd-56e9-401d-b35b-f5a29d8d9dc5.png)

A scenario like this using `Rc` or `Arc` for both the next and previous nodes can cause reference cycles. Reference cycles prevent nodes from being deallocated because for one node to be deallocated all `Arc` or `Rc` references to it must be 0. Since the nodes in this case hold references to other nodes that also hold references back to it, both nodes can’t be deallocated automatically and they can end up stopping all other nodes in the data structure from being deallocated, causing a memory leak.

To prevent reference cycles while allowing nodes to both reference previous and next nodes, you can make each node’s reference to its previous node a `Weak` reference. For example:

```rs
use std::rc::{Rc, Weak};
use std::cell::RefCell;

#[derive(Debug)]
struct Node {
    value: i32,
    next: Option<Rc<RefCell<Node>>>,
    prev: Option<Weak<RefCell<Node>>>, // Weak reference to avoid cycles
}

fn main() {
    let node1 = Rc::new(RefCell::new(Node { value: 1, next: None, prev: None }));
    let node2 = Rc::new(RefCell::new(Node { value: 2, next: None, prev: Some(Rc::downgrade(&node1)) }));

    // Set node1's next to node2
    node1.borrow_mut().next = Some(Rc::clone(&node2));

    println!("Node 1: {:?}", node1);
    println!("Node 2: {:?}", node2);
}
```

However, since `Weak` references have non-owning references to memory allocations, they need to be upgraded to `Rc` or `Arc` references with `.upgrade()` to allow access to the memory allocation they point to.

Also, as you can see in code example below (as well as above on line 13), `Rc` and `Arc` references can be downgraded to `Weak` references with `Rc::downgrade()` or `Arc::downgrade()`:

```rs
use std::rc::{Rc, Weak};

fn main() {
    let strong = Rc::new(5);
    let weak = Rc::downgrade(&strong);

    // Drop the weak reference
    drop(weak);

    // try to upgrade the weak reference
    if let Some(shared) = weak.upgrade() {
        println!("Data is still alive: {}", shared);
    } else {
        println!("Data has been dropped");
    }
}
```

Running this results in the following output:

```rs
Data has been dropped
```

This shows that only having weak references to a memory allocation doesn’t prevent it from being dropped. If a `Weak` pointer’s memory allocation is dropped, calling `.upgrade()` on the `Weak` pointer would return `None`.

---

## `RefCell`

To ensure memory safety, Rust doesn’t allow you to mutate the data that smart pointers point to. This can prevent hidden mutations, but can become really inconvenient when you need to build something that is dynamically changing (for example the ability to add a new node to anywhere in a linked-list data structure).

`RefCell` allows you to overcome this limitation because it is a data structure that allows interior mutability of immutable variables by enforcing Rust’s borrowing rules at runtime.

You may have noticed it’s usage in the `Weak` pointer example earlier:

```rs
use std::rc::{Rc, Weak};
use std::cell::RefCell;

#[derive(Debug)]
struct Node {
    value: i32,
    next: Option<Rc<RefCell<Node>>>,
    prev: Option<Weak<RefCell<Node>>>,
}

fn main() {
    let node1 = Rc::new(RefCell::new(Node { value: 1, next: None, prev: None }));
    let node2 = Rc::new(RefCell::new(Node { value: 2, next: None, prev: Some(Rc::downgrade(&node1)) }));

    // Set node1's next to node2
    node1.borrow_mut().next = Some(Rc::clone(&node2));

    println!("Node 1: {:?}", node1);
    println!("Node 2: {:?}", node2);
}
```

You can call `.borrow()` and `.borrow_mut()` on a `RefCell` type to borrow references to its internal value at runtime, while keeping its own type as immutable making it useful in cases like this that require immutability.

Mutable and immutable borrows in a `RefCell` type work just like regular borrows that are checked at compile time, but they allow you to bypass compile time restrictions to be checked instead at runtime.

One major borrowing rule to look out for is the “single mutable ownership and multiple immutable ownership” rule. Borrowing two mutable references to a `RefCell` would result in a panic, crashing the application. For example:

```rs
#![allow(unused_variables)]
#![allow(dead_code)]
#![allow(unused_mut)]
use std::cell::RefCell;

fn main() {
    let counter = RefCell::new(100);
    let mut c1 = counter.borrow_mut();
    let mut c2 = counter.borrow_mut();

    println!("I'm done");
}

/**
 * output:
 *  thread 'main' panicked at src/main.rs:9:26:
 *  already borrowed: BorrowMutError
 *  note: run with `RUST_BACKTRACE=1` environment variable to display a backtrace
 */
```

---

## Summary

To give an overview of the points made in this article, there are four common types of smart pointers in Rust:

- `Box` is used for manually allocating memory in the heap (similar to `malloc` and `new` in C and C++ respectively)
- `Rc` and `Arc` are used for allowing multiple ownership of a memory allocation. `Arc` is best for multi-threaded environments, and `Rc` is best for single-threaded environments.
- `Weak` is best used in giving multiple ownership of a memory allocation while preventing reference cycles.
- `RefCell` allows mutability in scenarios that require immutability, for example, in smart pointers.

I hope this article has provided clarity on smart pointers in Rust and how they work. Thanks for reading!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "What are Smart Pointers in Rust? Explained with Code Examples",
  "desc": "Smart pointers are data structures that act like pointers but contain extra information and have functionalities that make them excel over regular pointers in certain situations. So what are regular pointers? Regular pointers (just called “pointers”)...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/smart-pointers-in-rust-with-code-examples.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
