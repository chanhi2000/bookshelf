---
lang: en-US
title: "How to Run Rust on Jupyter Notebooks"
description: "Article(s) > How to Run Rust on Jupyter Notebooks"
icon: fa-brands fa-rust
category:
  - Rust
  - Python
  - Jupyter Notebook
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - rs
  - rust
  - py
  - python
  - jupyter
  - py-jupyter
  - jupyternotebook
  - jupyter-notebook
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Run Rust on Jupyter Notebooks"
    - property: og:description
      content: "How to Run Rust on Jupyter Notebooks"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-run-rust-on-jupyter-notebooks.html
prev: /programming/rs/articles/README.md
date: 2026-02-21
isOriginal: false
author:
  - name: Daniel Iwugo
    url: https://freecodecamp.org/news/author/elementmerc/
cover: https://cloudmate-test.s3.us-east-1.amazonaws.com/uploads/covers/5e1e335a7a1d3fcc59028c64/6e411f5d-65a1-407d-a4f0-0beceb1e784b.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Rust > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/rs/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Run Rust on Jupyter Notebooks"
  desc="If you've ever wanted to combine the power of Rust with the interactive goodness of Jupyter notebooks, you're in the right place. Maybe you're tired of compiling every single time you want to test a s"
  url="https://freecodecamp.org/news/how-to-run-rust-on-jupyter-notebooks"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cloudmate-test.s3.us-east-1.amazonaws.com/uploads/covers/5e1e335a7a1d3fcc59028c64/6e411f5d-65a1-407d-a4f0-0beceb1e784b.png"/>

If you've ever wanted to combine the power of Rust with the interactive goodness of Jupyter notebooks, you're in the right place. Maybe you're tired of compiling every single time you want to test a snippet, learn Rust in a more interactive way, or just have a crazy idea pop into your head like I do.

Most people think Jupyter is just for Python and data science stuff, but apparently you can run Rust in one, too.

::: note Friendly Disclaimer

This tutorial assumes you know the basics of both Rust and Jupyter. If you break something, that's on you, mate 🙂.

:::

So without further ado, let's jump in.

---

## What is EvCxR?

EvCxR (pronounced "Evaluator" to my fellow linguists’ horror) is a Rust REPL and Jupyter kernel. It's basically the magic that lets you run Rust code interactively in Jupyter notebooks instead of the traditional compile-run-debug cycle.

The name stands for "Evaluation Context for Rust", and it’s an open source project actively maintained on GitHub. Here are a few things that make this terribly named tool absolutely brilliant:

1. **Interactive development:** It lets you test Rust snippets without creating a whole project 🧪
2. **Prototyping:** You can quickly try out ideas before committing to a full implementation 💡
3. **Data visualisation:** And yes, you can even plot charts with Rust (more on that later) 📊

---

## How to Install the Rust Jupyter kernel

### Prerequisites

Before we dive into the installation, make sure you have these sorted:

1. **A Linux System:** Or at least, Windows Subsystem for Linux (There’s a little note below for Windows users.)
2. **The Rust toolchain:** You can get it from [<VPIcon icon="fas fa-globe"/>rustup.rs](https://rustup.rs/) if you haven't already
3. **Jupyter:** Install via pip – `pip install jupyter`
4. **Patience:** This might take a minute or two ⏱️

Once you’ve got all that, we can get rusty (pun intended).

::: note

If you’re using Windows, you’ll need to do a little extra to get started. Here’s the quick rundown:

1. Go to ...

<SiteInfo
  name="Microsoft C++ Build Tools - Visual Studio"
  desc="Visual Studio Build Tools offers essential components for building C++ projects on Windows outside of the IDE – perfect for command-line workflows and continuous integration pipelines. This includes the latest tools shipped in Visual Studio 2015 and later: Microsoft C++ (MSVC) compiler and linker, standard library, ATL and MFC, Windows SDK, Clang tools for Windows, AddressSanitizer, and the vcpkg package manager."
  url="https://visualstudio.microsoft.com/visual-cpp-build-tools//"
  logo="https://visualstudio.microsoft.com/wp-content/uploads/2022/05/Microsoft-120.png"
  preview="https://visualstudio.microsoft.com/wp-content/uploads/2025/03/vscom-share-image.jpg"/>

2. Download and run the installer
3. Select **"Desktop development with C++"**
4. Install it (it's large, ~5GB)

:::

### Step 1: Install EvCxR

Open your terminal and run this command:

```sh
cargo install evcxr_jupyter
```

Now go grab a cup of joe ☕. This will take a few minutes as Cargo downloads and compiles everything. And don't panic if it seems stuck. Rust compilation is thorough but not particularly fast.

If you get any errors about missing system libraries, you might need to install some dependencies. On Ubuntu/Debian, try:

```sh
sudo apt install jupyter-notebook jupyter-core python-ipykernel
sudo apt install cmake
```

On macOS with Homebrew:

```sh
brew install cmake jupyter
```

### Step 2: Install the Jupyter Kernel

Once the installation finishes, you’ll need to register the EvCxR kernel with Jupyter:

```sh
evcxr_jupyter --install
```

You should see output that looks something like this at the end:

```plaintext title="Output"
Installation complete
```

### Step 3: Launch Jupyter and Create a Rust Notebook

Let’s test out our baby. Fire up Jupyter:

```sh
jupyter notebook
```

Your browser should open automatically (if it doesn't, copy the URL from the terminal).

In the Jupyter interface:

1. Click **New** in the top right
2. Select **Rust** from the dropdown (or "evcxr" depending on your version)
3. A new notebook opens

Welcome to interactive Rust! 🦀

### Step 4: Write Your First Rust Code

Let's start with a classic:

```rs
println!("Hello my fellow Rustaceans! 🦀");
```

Hit `Shift + Enter` to run the cell. You should see the output appear below the cell. Simple as that.

Note that notebooks execute code at the top level, so you don’t have to wrap it around the `main()` function. If you still want to do that, you’re going to have to call it like this:

```rs
fn main() {
    println!("Hello my fellow Rustaceans! 🦀");
}
//Calling the function
main()
```

Now let's try something more interesting:

```rs
fn fibonacci(n: u32) -> u32 {
    match n {
        0 => 0,
        1 => 1,
        _ => fibonacci(n - 1) + fibonacci(n - 2)
    }
}

for i in 0..10 {
    println!("fibonacci({}) = {}", i, fibonacci(i));
}
```

Run it and watch the Fibonacci sequence appear.

```plaintext title="Output"
fibonacci(0) = 0
fibonacci(1) = 1
fibonacci(2) = 1
fibonacci(3) = 2
fibonacci(4) = 3
fibonacci(5) = 5
fibonacci(6) = 8
fibonacci(7) = 13
fibonacci(8) = 21
fibonacci(9) = 34
```

---

## Handy Tips and Tricks

Functions aren’t the only things that behave differently when using Rust in notebooks. Here are a few other things you might want to keep in mind:

### Variables Persist Between Cells

Unlike traditional Rust compilation, variables you define in one cell stick around for the next cells:

```rs
let mut counter = 0;
```

Then in the next cell:

```rs
counter += 1;
println!("Counter: {}", counter);
```

The output would be:

```plaintext title="Output"
Counter: 1
```

This is great for building up complex examples step by step.

### You Can Use External Crates

Add dependencies with the `:dep` command in one cell:

```rs
:dep serde = { version = "1.0", features = ["derive"] }
:dep serde_json = "1.0"
```

Then use them normally in the next:

```rs
use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize, Debug)]
struct Person {
    name: String,
    age: u32,
}

let person = Person {
    name: "Amina".to_string(),
    age: 24,
};

let json = serde_json::to_string(&person).unwrap();
println!("{}", json);
// 
// {"name":"Amina","age":24}
```

Pretty neat, huh?

### Visualisation Support

You can even create graphs. To get started, install the `plotters` crate:

```rs
:dep plotters = { version = "0.3", default-features = false, features = ["evcxr", "all_series", "bitmap_backend", "bitmap_encoder"] }
```

Then create a simple sine graph:

```rs
use plotters::prelude::*;

let root = SVGBackend::new("sine_wave.svg", (640, 480)).into_drawing_area();
root.fill(&WHITE).unwrap();

let mut chart = ChartBuilder::on(&root)
    .caption("Sine Wave", ("Arial", 20))
    .margin(5)
    .x_label_area_size(30)
    .y_label_area_size(30)
    .build_cartesian_2d(-3.14..3.14, -1.2..1.2)
    .unwrap();

chart.configure_mesh().draw().unwrap();

chart.draw_series(LineSeries::new(
    (-314..314).map(|x| {
        let x = x as f64 / 100.0;
        (x, x.sin())
    }),
    &RED,
)).unwrap();

root.present().unwrap();
println!("Plot saved to sine_wave.svg");
```

Output:

![Sine wave graph showing output of the code](https://cdn.hashnode.com/res/hashnode/image/upload/v1771272251271/c07b1c22-4ea1-408c-984a-4179a47058d9.png)

::: note A word on plotting

You can actually display plots directly inline in your notebook. But if you're using WSL with VSCode (like I do), inline plotting may not work properly due to rendering issues on the notebook interface. That’s why I used it as an svg file that I can easily view in my text editor.

:::

### Checking Types

Not sure what type something is? Use `:vars`. This shows all variables and their types:

```rs
let x = vec![1, 2, 3];
```

```rs
:vars
```

```plaintext title="Output"
Variable	    Type
       x	Vec<i32>
```

---

## Common Issues and Solutions

### Compilation Errors Everywhere

If you're getting weird compilation errors, remember:

- Each cell is compiled separately
- You might need to reimport things in each cell

### Slow Execution

The first time you run code in a session, it's slow due to the compilation overhead. Subsequent runs are faster. If it's really slow, you might want to:

- Use release mode: `:opt 2`
- Reduce dependency features to only what you need
- Consider if Jupyter is the right tool for your use case

### Dependencies Not Loading

If a crate won't load:

- Make sure the version exists on [crates.io](http://crates.io)
- Check your internet connection (it needs to download)
- Try specifying features explicitly
- Clear the cargo cache if things get really wonky: `rm -rf ~/.evcxr`

---

## When NOT to Use Jupyter for Rust

Jupyter notebooks are great for learning and experimenting, but they're not always the best choice in:

- **Production code:** Use proper projects with cargo
- **Performance-critical code:** The overhead isn't worth it
- **Large applications:** Notebooks get very messy, very fast
- **Team collaboration:** Version control with notebooks is quite the nightmare

Stick to notebooks for prototyping and quick experiments. For anything serious, fire up your favourite editor and create a proper Rust project.

---

## Conclusion

Let's summarise what you've learned:

1. How to install the EvCxR Jupyter kernel
2. How to create and run Rust notebooks
3. How to use external crates in notebooks
4. Tips and tricks for interactive Rust development

Jupyter notebooks make Rust more accessible for learning and experimentation. Give it a go next time you want to try out a quick Rust snippet without the ceremony of creating a full project. And with that, we've come to the end of this tutorial.

Cheers.

::: info Resources

1. [EvCxR GitHub Repository (<VPIcon icon="iconfont icon-github" />`evcxr/evcxr`)](https://github.com/evcxr/evcxr)
2. [Rust Book](https://doc.rust-lang.org/book/)
3. [<VPIcon icon="iconfont icon-jupyter"/>Jupyter Documentation](https://jupyter.org/documentation)

:::

::: note Acknowledgements

Thanks to [Anuoluwapo Victor (<VPIcon icon="fa-brands fa-linkedin" />`a-n-u-o`)](https://linkedin.com/in/a-n-u-o/), [Chinaza Nwukwa, (<VPIcon icon="fa-brands fa-linkedin" />`a-n-u-o`)](https://linkedin.com/in/a-n-u-o/) [Holumidey Mer (<VPIcon icon="fa-brands fa-linkedin" />`chinaza-nwukwa-22a256230`)](https://linkedin.com/in/chinaza-nwukwa-22a256230/)[cy (<VPIcon icon="fa-brands fa-linkedin" />`mercy-holumidey-88a542232`)](https://linkedin.com/in/mercy-holumidey-88a542232/), [Favour Ojo, (<VPIcon icon="fa-brands fa-linkedin" />`mercy-holumidey-88a542232`)](https://linkedin.com/in/mercy-holumidey-88a542232/) [Georgina (<VPIcon icon="fa-brands fa-linkedin" />`favour-ojo-906883199`)](https://linkedin.com/in/favour-ojo-906883199/) [Awani (<VPIcon icon="fa-brands fa-linkedin" />`georgina-awani-254974233`)](https://linkedin.com/in/georgina-awani-254974233/), [and my family (<VPIcon icon="fa-brands fa-linkedin" />`georgina-awani-254974233`)](https://linkedin.com/in/georgina-awani-254974233/) for the inspiration, support and knowledge used to put this post together.

And thanks to the EvCxR project maintainers for making this possible, the Rust community for being awesome, and to anyone reading this for wanting to learn. You inspire me daily.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Run Rust on Jupyter Notebooks",
  "desc": "If you've ever wanted to combine the power of Rust with the interactive goodness of Jupyter notebooks, you're in the right place. Maybe you're tired of compiling every single time you want to test a s",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-run-rust-on-jupyter-notebooks.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
