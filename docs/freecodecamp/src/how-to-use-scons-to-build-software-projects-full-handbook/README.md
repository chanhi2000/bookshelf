---
lang: en-US
title: "How to Use SCons to Build Software Projects [Full Handbook]"
description: "Article(s) > How to Use SCons to Build Software Projects [Full Handbook]"
icon: iconfont icon-c
category:
  - C++
  - Python
  - Hardware
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - c++
  - cpp
  - c-plus-plus
  - py
  - python
  - hw
  - hardware
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Use SCons to Build Software Projects [Full Handbook]"
    - property: og:description
      content: "How to Use SCons to Build Software Projects [Full Handbook]"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-scons-to-build-software-projects-full-handbook/
prev: /programming/cpp/articles/README.md
date: 2026-05-08
isOriginal: false
author:
  - name: Nikheel Vishwas Savant
    url: https://freecodecamp.org/news/author/nsavant/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/05c9c2af-e245-4740-b50e-1144e4db1484.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Python > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "C++ > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/cpp/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Hardware > Article(s)",
  "desc": "Article(s)",
  "link": "/hw/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Use SCons to Build Software Projects [Full Handbook]"
  desc="If you've ever wrestled with Makefile syntax, fought tab-versus-spaces bugs, or tried to make a build system work across Linux, macOS, and Windows, SCons is worth your attention. It replaces Make, aut"
  url="https://freecodecamp.org/news/how-to-use-scons-to-build-software-projects-full-handbook/"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/05c9c2af-e245-4740-b50e-1144e4db1484.png"/>

If you've ever wrestled with <VPIcon icon="iconfont icon-gnu"/>`Makefile` syntax, fought tab-versus-spaces bugs, or tried to make a build system work across Linux, macOS, and Windows, SCons is worth your attention. It replaces Make, autoconf, and automake with a single tool where every build file is a real Python script.

This handbook walks through SCons from first principles. You'll install it, build a multi-file C++ project with a static library, set up cross-compilation for an embedded target (Qualcomm's QuRT real-time operating system), and learn the internals that make SCons different from Make and CMake.

By the end, you'll have a working build system you can adapt to your own projects.

The full example code is self-contained. You can type it out, run it, and see real output at every step.

---

## Table of Contents

- [Prerequisites](#heading-prerequisites)
- [What is SCons and Why Does it Exist](#heading-what-is-scons-and-why-does-it-exist)
- [How SCons Compares to Make, CMake, and Meson](#heading-how-scons-compares-to-make-cmake-and-meson)
- [A Side-by-Side Look at Make Versus SCons](#heading-a-side-by-side-look-at-make-versus-scons)
- [Installing SCons](#heading-installing-scons)
- [Core Concepts You Need Before Writing a Build File](#heading-core-concepts-you-need-before-writing-a-build-file)
- [The Three Environments in SCons](#heading-the-three-environments-in-scons)
- [Construction Variables Reference](#heading-construction-variables-reference)
- [Your First <VPIcon icon="fa-brands fa-python"/>`SConstruct` File](#heading-your-first-sconstruct-file)
- [Building a Multi-File C++ Project Step by Step](#heading-building-a-multi-file-c-project-step-by-step)
- [Detailed Walkthrough of Every File in the Project](#heading-detailed-walkthrough-of-every-file-in-the-project)
- [Running the Build and Understanding the Output](#heading-running-the-build-and-understanding-the-output)
- [What Happens During an Incremental Build](#heading-what-happens-during-an-incremental-build)
- [Cross-Compiling for QuRT (Qualcomm Real-Time OS)](#heading-cross-compiling-for-qurt-qualcomm-real-time-os)
- [Writing QuRT-Specific Application Code](#heading-writing-qurt-specific-application-code)
- [Building Both Native and QuRT From One <VPIcon icon="fa-brands fa-python"/>`SConstruct`](#heading-building-both-native-and-qurt-from-one-sconstruct)
- [How SCons Detects Dependencies and Decides What to Rebuild](#heading-how-scons-detects-dependencies-and-decides-what-to-rebuild)
- [Writing a Custom Scanner](#heading-writing-a-custom-scanner)
- [The Shared Build Cache](#heading-the-shared-build-cache)
- [Working with Shared Libraries](#heading-working-with-shared-libraries)
- [Adding Command-Line Options with AddOption](#heading-adding-command-line-options-with-addoption)
- [Configure Checks for Portability](#heading-configure-checks-for-portability)
- [Custom Builders for Non-Standard File Types](#heading-custom-builders-for-non-standard-file-types)
- [Aliases, Default Targets, and Install Rules](#heading-aliases-default-targets-and-install-rules)
- [Platform-Specific Configuration](#heading-platform-specific-configuration)
- [Customizing Build Output](#heading-customizing-build-output)
- [How to Debug SCons Build Files](#heading-how-to-debug-scons-build-files)
- [The SCons Command-Line Reference](#heading-the-scons-command-line-reference)
- [Common Mistakes and How to Avoid Them](#heading-common-mistakes-and-how-to-avoid-them)
- [Summary](#heading-summary)

::: note Prerequisites

You need Python 3.7 or newer installed on your system. You also need a C++ compiler (GCC, Clang, or MSVC). Familiarity with basic C/C++ compilation (what a compiler and linker do) is assumed. Prior experience with Make or any build system is helpful but not required.

For the QuRT cross-compilation sections, you need the Qualcomm Hexagon SDK installed on your machine. Those sections are self-contained, so you can skip them if you're only interested in native builds.

:::

---

## What is SCons and Why Does it Exist?

SCons is an open-source, cross-platform software construction tool written entirely in Python. Steven Knight created it in 2001 after his design won the Software Carpentry SC Build competition in August 2000. The competition asked participants to design a better build tool, and Knight's "ScCons" entry beat out the alternatives. The name was later shortened to "SCons" after the project separated from Software Carpentry.

Knight's design drew heavily from Cons, a Perl-based build tool created by Bob Sidebotham in the late 1990s. Cons introduced several ideas that were radical at the time: content-based change detection (using MD5 hashes instead of timestamps), automatic dependency scanning for C/C++ headers, and a single global dependency graph that eliminated the problems with recursive Make.

SCons took all of these ideas and reimplemented them in Python, adding a proper configuration API, cross-platform support, and extensibility through Python's object model.

The project is currently maintained by William Deegan and Gary Oberbrunner, and it's released under the MIT license. The current stable version is 4.10.x. Development happens on GitHub, and the community communicates through a Discord server, IRC (#scons on Libera.Chat), and mailing lists.

### How SCons Works

The central idea behind SCons is straightforward: build files should be written in a real programming language, not a domain-specific language with quirky syntax rules.

An <VPIcon icon="fa-brands fa-python"/>`SConstruct` file is a Python script. You have access to loops, conditionals, functions, classes, and every Python library on your system. There are no special syntax rules to memorize, no tab-sensitivity bugs, and no distinction between spaces and tabs that silently breaks your build. If you can write Python, you can write SCons build files.

SCons also differs from Make in how it determines what needs to be rebuilt. Make compares file timestamps. If you run `touch main.c`, Make will recompile it even though nothing actually changed.

SCons computes a content hash (MD5 by default) of every source file. If the content hasn't changed, SCons skips the rebuild. This eliminates an entire class of unnecessary recompilations. It also means you never need to run `make clean` because you are unsure whether the build state is consistent. SCons' build state is always correct, because it tracks content, not time.

Several large projects have used SCons in production. The Godot game engine uses SCons as its build system. MongoDB used SCons for years. PlatformIO, the embedded development ecosystem, uses SCons as its core build engine. National Instruments has used it for projects with over 5,000 source files. NSIS (the Nullsoft Scriptable Install System) and several aerospace projects (including the Aerosonde UAV) have also relied on SCons.

---

## How SCons Compares to Make, CMake, and Meson

Understanding where SCons fits relative to other build tools helps you decide when to reach for it.

### SCons versus Make

Make uses a custom DSL that is notoriously finicky. Tabs matter (a space where a tab should be silently does nothing). Variable expansion rules are complex and have multiple flavors (`=`, `:=`, `?=`, `+=`). Dependency detection for C/C++ headers requires manual setup or external tools like `makedepend` or compiler-generated `.d` files.

Recursive Make (the standard pattern for multi-directory projects) can miss cross-directory dependencies entirely, a problem documented in Peter Miller's famous 1997 paper "Recursive Make Considered Harmful."

SCons solves all of these problems. It scans C/C++ source files automatically, builds a single global dependency graph across all directories in a single pass, and uses content hashing instead of timestamps.

The tradeoff is startup speed. SCons must read every build file and construct the full dependency graph before building anything, which adds overhead that Make doesn't have. On small to medium projects (up to a few thousand source files), this overhead is negligible. On very large projects (tens of thousands of files), it can add several seconds to every invocation.

### SCons versus CMake

CMake is not a build tool. It's a meta-build system that generates Makefiles, Ninja files, or Visual Studio project files. You write CMakeLists.txt, run `cmake` to generate the native build files, then run `make` or `ninja` to actually build.

SCons builds directly. There is no generation step. CMake has a much larger ecosystem, better IDE integration (it can generate Xcode projects, Visual Studio solutions, and CLion configurations), and a huge library of `find_package` modules for locating third-party libraries like Boost, OpenSSL, and Qt. SCons has nothing comparable.

Where SCons wins is in simplicity and debuggability. Your build files are Python. You can `print()` variables, set breakpoints with `pdb`, use list comprehensions, and call any Python function. CMake's custom language is harder to debug, has surprising scoping rules, and requires learning a distinct syntax that's not used anywhere else.

### SCons versus Meson

Meson is a newer build tool that generates Ninja files for fast parallel builds. It uses a custom DSL that is intentionally not Turing-complete. You can't write loops over source files or call arbitrary external programs during the configuration phase. This sounds limiting, but it prevents an entire class of build file bugs (like accidentally depending on host state that doesn't exist on other developers' machines).

Meson is faster than SCons on large projects because Ninja, its backend, is extremely optimized for incremental builds. Meson also has better built-in support for cross-compilation through a dedicated "cross file" format.

SCons gives you more flexibility through Python, but Meson's opinionated approach catches more mistakes at configuration time and produces faster builds.

The short version: use SCons when you want the full power of Python in your build files, when you need content-based rebuild detection, when you're working on a project that already uses it, or when you're doing embedded work where the build system needs to handle unusual toolchains and file types.

Use CMake when IDE integration and ecosystem size matter most. Use Meson when build speed on large projects is the primary concern.

---

## A Side-by-Side Look at Make Versus SCons

Seeing the same build expressed in both Make and SCons makes the differences concrete. Consider a simple project with two C files and a header.

The <VPIcon icon="iconfont icon-gnu"/>`Makefile` looks like this:

```makefile title="Makefile"
CC = gcc
CFLAGS = -Wall -O2
OBJECTS = main.o utils.o

myapp: $(OBJECTS)
    \((CC) \)(CFLAGS) -o \(@ \)^

main.o: main.c utils.h
    \((CC) \)(CFLAGS) -c $<

utils.o: utils.c utils.h
    \((CC) \)(CFLAGS) -c $<

clean:
    rm -f myapp $(OBJECTS)
```

This <VPIcon icon="iconfont icon-gnu"/>`Makefile` has 13 lines and requires you to manually list every header dependency. If you add a new header file and forget to update the Makefile, your build will succeed but produce incorrect output. The indented lines must use literal tab characters, not spaces. The `\(@`, `\)^`, and `$<` automatic variables are cryptic until you memorize them.

The equivalent <VPIcon icon="fa-brands fa-python"/>`SConstruct` file looks like this:

```py
env = Environment(CCFLAGS=['-Wall', '-O2'])
env.Program('myapp', ['main.c', 'utils.c'])
```

Two lines. SCons detects the header dependency on `utils.h` automatically by scanning the `#include` directives in the source files. There's no `clean` target because `scons -c` handles cleanup. There are no tab sensitivity issues because this is Python.

The <VPIcon icon="iconfont icon-gnu"/>`Makefile` approach has one advantage: it starts faster on large projects because it doesn't need to scan every source file for includes.

On a two-file project, this difference is unmeasurable. On a 10,000-file project, the SCons overhead might add 2 to 5 seconds. Whether that tradeoff matters depends on your project size and your tolerance for manual dependency management.

---

## Installing SCons

The simplest installation method is pip, since SCons is a pure Python package with no compiled dependencies.

```sh
pip install scons
```

This installs the `scons` command globally (or in your active virtual environment). The package name on PyPI is `SCons`. On some systems, you may need to use `pip3` instead of `pip` to target Python 3. You can also install through system package managers:

```sh
# Debian / Ubuntu
sudo apt install scons

# Fedora
sudo dnf install scons

# macOS with Homebrew
brew install scons

# Arch Linux
sudo pacman -S scons

# Conda
conda install -c conda-forge scons
```

The `pip install` line pulls the SCons package from PyPI and places the `scons` executable on your PATH. System package managers do the same thing but integrate with your OS's package database. Either approach works. The pip method tends to give you the latest version, while system packages may lag behind by one or two releases.

Verify the installation by checking the version.

```sh
scons --version
```

You should see output showing the SCons version number and the Python version it's running under. If the command isn't found, make sure your Python scripts directory is on your PATH. On Linux, this is typically <VPIcon icon="fas fa-folder-open"/>`~/.local/bin` for user installs. On macOS with Homebrew Python, it's usually <VPIcon icon="fas fa-folder-open"/>`/usr/local/bin` or <VPIcon icon="fas fa-folder-open"/>`/opt/homebrew/bin`.

---

## Core Concepts You Need Before Writing a Build File

SCons organizes builds around five core concepts. Understanding them before you write any code saves confusion later.

### The <VPIcon icon="fa-brands fa-python"/>`SConstruct` Build File

This is the top-level build file. When you run `scons` in a directory, it looks for a file named `SConstruct` (capital S, capital C, no file extension). SCons also accepts the alternative names `Sconstruct` and `sconstruct`, but the capitalized version is the convention.

This file is a Python script. It defines what to build and how. There is exactly one <VPIcon icon="fa-brands fa-python"/>`SConstruct` per project, and it lives in the project root.

### <VPIcon icon="fa-brands fa-python"/>`SConscript` Build Files

These are subsidiary build files for subdirectories. The top-level <VPIcon icon="fa-brands fa-python"/>`SConstruct` calls `SConscript('src/SConscript')` to pull in build definitions from the `src` directory.

All file paths inside an <VPIcon icon="fa-brands fa-python"/>`SConscript` are relative to that SConscript's location, not the project root. The `#` character at the start of a path means "relative to the <VPIcon icon="fa-brands fa-python"/>`SConstruct` directory," which is useful for referencing shared include directories from any <VPIcon icon="fa-brands fa-python"/>`SConscript` at any depth.

For example, `#include` always refers to the `include` directory at the project root, regardless of which subdirectory's <VPIcon icon="fa-brands fa-python"/>`SConscript` uses it.

### Construction Environment

This is a Python object (created with `Environment()`) that holds all the configuration for a build: which compiler to use, what flags to pass, where to find headers, what libraries to link. You can create multiple environments for different build configurations (debug vs. release, or native vs. cross-compiled).

Every environment has a set of construction variables (like `CC`, `CCFLAGS`, `CPPPATH`, `LIBS`) and a set of builders (like `Program`, `Library`, `Object`). When you modify an environment with `env.Append()` or `env.Replace()`, you change the configuration for all subsequent builder calls on that environment. To isolate changes, clone the environment first with `env.Clone()`.

### Builder Methods

These are methods on the Environment object that know how to produce specific types of output.

- `env.Program()` compiles and links an executable.
- `env.StaticLibrary()` creates a static library (`.a` on Linux, `.lib` on Windows).
- `env.SharedLibrary()` creates a shared library (`.so` on Linux, `.dylib` on macOS, `.dll` on Windows).
- `env.Object()` compiles a single source file to an object file.
- `env.Command()` runs an arbitrary shell command.

Every builder returns a list of Node objects representing the files it will produce. You can define your own builders for file types that SCons doesn't know about, such as protocol buffer definitions, shader files, or firmware images.

### Nodes

These are SCons' internal representation of files and directories. When you call `env.Object('main.cpp')`, you get back a Node object, not a string. You can pass Node objects to other builders, concatenate them with the `+` operator, and use them anywhere SCons expects a file reference.

Working with Nodes instead of raw strings makes your build files portable across platforms because SCons handles platform-specific file extensions and path separators internally.

You can also create Nodes explicitly: `File('foo.c')` creates a file Node, `Dir('src')` creates a directory Node, and `Entry('ambiguous')` creates a Node whose type (file or directory) SCons determines later.

---

## The Three Environments in SCons

SCons distinguishes three types of environments, and confusing them is a common source of bugs. Understanding the distinction upfront prevents a category of hard-to-diagnose build failures.

The **External Environment** is your shell's environment, accessible through `os.environ` in Python. It contains variables like `PATH`, `HOME`, `PKG_CONFIG_PATH`, and anything else you have set in your `.bashrc` or `.zshrc`.

SCons doesn't automatically import this environment. This is deliberate. If SCons inherited your shell environment, your build would depend on whatever happened to be set in each developer's shell, making builds non-reproducible. A build that works on your machine but fails on a colleague's machine because they have a different `PATH` is exactly the kind of problem SCons tries to prevent.

The **Construction Environment** is the `Environment()` object you create in your <VPIcon icon="fa-brands fa-python"/>`SConstruct` file. It holds construction variables that control how SCons invokes tools.

- `CC` specifies the C compiler.
- `CXX` specifies the C++ compiler.
- `CCFLAGS` holds flags for both C and C++ compilation.
- `CPPPATH` lists header search directories.
- `LIBS` lists libraries to link.
- `LIBPATH` lists library search directories.

These variables don't come from your shell. SCons populates them with platform-appropriate defaults (for example, `CC` defaults to `gcc` on Linux and `cl` on Windows with MSVC).

The **Execution Environment** is a dictionary stored at `env['ENV']` inside the construction environment. This is the environment that gets passed to child processes (compilers, linkers, archivers) when SCons runs them.

By default, it contains a minimal `PATH` sufficient to find the compiler. If your build tools need additional environment variables (for example, a cross-compiler that reads `HEXAGON_SDK_ROOT`), you must add them to `env['ENV']` explicitly.

When a build fails because a tool is "not found," the problem is almost always that the tool is on your shell's `PATH` (external environment) but not on the execution environment's `PATH` (`env['ENV']['PATH']`). The fix is to pass it through:

```py
import os
env = Environment()
env['ENV']['PATH'] = os.environ['PATH']
```

This line copies your shell's `PATH` into the execution environment so child processes can find the same tools you can find in your terminal.

A broader approach is `env = Environment(ENV=os.environ.copy())`, which copies everything, but this reduces reproducibility because your build now depends on every variable in your shell.

---

## Construction Variables Reference

SCons has dozens of construction variables. The ones you'll use most frequently for C/C++ projects are worth knowing by name.

`CC` is the C compiler command. Defaults to the platform's default C compiler (`gcc` on Linux, `clang` on macOS, `cl` on Windows with MSVC). Override it to use a different compiler or a cross-compiler.

`CXX` is the C++ compiler command. Same defaults as `CC` but for C++.

`CCFLAGS` holds flags passed to both the C and C++ compilers during compilation. Use this for warnings (`-Wall`), optimization (`-O2`), and other flags that apply regardless of language.

`CFLAGS` holds flags passed only to the C compiler. Use this for C-specific flags like `-std=c11`.

`CXXFLAGS` holds flags passed only to the C++ compiler. Use this for C++-specific flags like `-std=c++17`.

`CPPPATH` is a list of directories to search for header files. SCons translates each entry into a `-I` flag. The `#` prefix means relative to the <VPIcon icon="fa-brands fa-python"/>`SConstruct` directory.

`CPPDEFINES` is a list of preprocessor definitions. `env.Append(CPPDEFINES=['DEBUG', ('VERSION', '2')])` translates to `-DDEBUG -DVERSION=2`. Using `CPPDEFINES` instead of adding `-D` flags to `CCFLAGS` is preferred because SCons tracks them as structured data and can compare them correctly for rebuild decisions.

`LIBS` is a list of libraries to link against. `LIBS=['pthread', 'm']` translates to `-lpthread -lm`. You can also pass Node objects returned by `StaticLibrary` or `SharedLibrary` builders.

`LIBPATH` is a list of directories to search for libraries. Translates to `-L` flags.

`LINKFLAGS` holds flags passed to the linker. Use this for linker-specific options like `-nostdlib`, `-Wl,--gc-sections`, or `-static`.

`AR` is the static library archiver command. Defaults to `ar` on POSIX systems.

`LINK` is the linker command. Defaults to the C or C++ compiler (which invokes the linker internally).

`PROGSUFFIX` is the suffix for executable files. Empty on POSIX, `.exe` on Windows. You rarely need to set this, as SCons detects it from the platform.

All of these variables can be set in the `Environment()` constructor, modified with `env.Append()`, `env.Prepend()`, or `env.Replace()`, or overridden per-builder-call by passing them as keyword arguments.

---

## Your First <VPIcon icon="fa-brands fa-python"/>`SConstruct` File

Create a directory for experimentation and put a single C file in it.

```c
// hello.c
#include <stdio.h>

int main() {
    printf("Hello from SCons!\n");
    return 0;
}
```

This is a minimal C program that prints a message and exits. Nothing complicated. It exists solely to give SCons something to build.

Now create an <VPIcon icon="fa-brands fa-python"/>`SConstruct` file in the same directory.

```py
Program('hello.c')
```

This single line is a complete <VPIcon icon="fa-brands fa-python"/>`SConstruct` file. `Program` is a default builder that's available without creating an explicit Environment. Behind the scenes, SCons creates a default environment with platform-appropriate compiler settings and uses it for this `Program` call. It tells SCons to compile `hello.c` and link it into an executable.

Run the build.

```sh
scons
```

SCons prints output showing the compilation and linking commands it executes. On Linux with GCC, you'll see something like `gcc -o hello.o -c hello.c` followed by `gcc -o hello hello.o`. The resulting executable is named `hello` (on Linux/macOS) or `hello.exe` (on Windows). SCons derives the output name from the source file name by stripping the extension.

Run `scons` again without changing anything. SCons prints `scons: 'hello' is up to date.` and does nothing. It read the content hash of `hello.c`, compared it to the stored hash from the previous build, and determined that no rebuild was necessary. This is the content-based rebuild detection in action.

Now run `touch hello.c` and then `scons` again. SCons still does nothing. The content of `hello.c` didn't change, so the hash is identical. Make would have recompiled here. SCons does not.

For a slightly more realistic example, create an explicit environment with custom flags.

```py
env = Environment(
    CC='gcc',
    CCFLAGS=['-Wall', '-Wextra', '-O2'],
)
env.Program('hello', 'hello.c')
```

This version creates a construction environment, sets the compiler to `gcc` explicitly, enables extra warnings with `-Wextra`, and optimizes with `-O2`. The `Program` call now takes two arguments: the target name `'hello'` and the source file `'hello.c'`. When you provide both, you control the output name directly.

You can add multiple programs in the same <VPIcon icon="fa-brands fa-python"/>`SConstruct`:

```py
env = Environment(CCFLAGS=['-Wall', '-O2'])
env.Program('hello', 'hello.c')
env.Program('goodbye', 'goodbye.c')
```

Running `scons` builds both executables. Running `scons hello` builds only the first one. SCons accepts target names on the command line to build selectively.

---

## Building a Multi-File C++ Project Step by Step

A single-file example is useful for verifying your installation, but real projects have multiple source files, libraries, and header directories. This section builds a complete project with all of those elements.

The project structure looks like this:

```sh
myproject/
    <VPIcon icon="fa-brands fa-python"/>`SConstruct`
    include/
        config.h
    lib/
        SConscript
        mathutils.h
        mathutils.cpp
        stringutils.h
        stringutils.cpp
    src/
        SConscript
        main.cpp
        app.h
        app.cpp
```

This diagram shows a project with three directories beneath the root. The `include` directory holds a shared configuration header that defines version constants. The `lib` directory contains two utility modules (math and string operations) that get compiled into a static library called `libmyutils.a`. The `src` directory holds the main application code that depends on the library.

Each directory with compilable source files has its own `SConscript` file. The top-level `SConstruct` orchestrates everything.

The build system compiles the library first, then the application, and places all build artifacts in a separate `build` directory to keep the source tree clean. This separation means you can delete the entire `build` directory and rebuild from scratch without touching any source files.

Create the project directory and all subdirectories first.

```sh
mkdir -p myproject/include myproject/lib myproject/src
cd myproject
```

These commands create the full directory tree. The `-p` flag on `mkdir` creates parent directories as needed and does not error if they already exist.

Now create each file. Start with the shared configuration header.

```cpp title="include/config.h"
#ifndef CONFIG_H
#define CONFIG_H
#define APP_VERSION "1.0.0"
#define APP_NAME "SCons Demo"
#endif
```

This header defines version and name constants that the application code will reference. The include guards (`#ifndef` / `#define` / `#endif`) prevent double-inclusion, which is standard practice in C/C++ headers. Because this header is in the `include` directory, any source file that wants to use it must have `include` on its header search path. The <VPIcon icon="fa-brands fa-python"/>`SConstruct` file handles this through the `CPPPATH` variable.

Next, the math utility library:

```cpp title="lib/mathutils.h"
#ifndef MATHUTILS_H
#define MATHUTILS_H

int factorial(int n);
double circle_area(double radius);

#endif
```

```cpp title="lib/mathutils.cpp"
#include "mathutils.h"
#include <cmath>

int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

double circle_area(double radius) {
    return M_PI * radius * radius;
}
```

The `mathutils` module provides two functions: a recursive factorial calculation and a circle area computation. The header declares the function signatures so that other translation units can call them. The implementation file defines the function bodies. The `cmath` include brings in `M_PI`, the mathematical constant for pi.

When SCons processes <VPIcon icon="iconfont icon-cpp"/>`mathutils.cpp`, it scans the `#include` directives and discovers that <VPIcon icon="iconfont icon-cpp"/>`mathutils.cpp` depends on both <VPIcon icon="iconfont icon-c"/>`mathutils.h` and the system header `cmath`. If you later modify <VPIcon icon="iconfont icon-c"/>`mathutils.h`, SCons knows to recompile <VPIcon icon="iconfont icon-cpp"/>`mathutils.cpp` without any manual dependency declaration.

Now the string utility:

```cpp title="lib/stringutils.h"
#ifndef STRINGUTILS_H
#define STRINGUTILS_H
#include <string>

std::string to_upper(const std::string& s);

#endif
```

```cpp title="lib/stringutils.cpp"
#include "stringutils.h"
#include <algorithm>
#include <cctype>

std::string to_upper(const std::string& s) {
    std::string result = s;
    std::transform(result.begin(), result.end(),
                   result.begin(), ::toupper);
    return result;
}
```

The `stringutils` module has a single function that converts a string to uppercase using the standard library's `transform` algorithm. The `::toupper` passed as the transformation function is the C locale version from `<cctype>`. Together with `mathutils`, these two modules form a small utility library that the application will link against.

Now the application layer:

```cpp title="src/app.h"
#ifndef APP_H
#define APP_H

void run_app();

#endif
```

```cpp title="src/app.cpp"
#include "app.h"
#include "config.h"
#include "mathutils.h"
#include "stringutils.h"
#include <iostream>

void run_app() {
    std::cout << "Application: " << APP_NAME << std::endl;
    std::cout << "Version: " << APP_VERSION << std::endl;
    std::cout << "5! = " << factorial(5) << std::endl;
    std::cout << "Circle area (r=3): " << circle_area(3.0) << std::endl;
    std::cout << to_upper("hello scons") << std::endl;
}
```

```cpp title="src/main.cpp"
#include "app.h"

int main() {
    run_app();
    return 0;
}
```

The <VPIcon icon="iconfont icon-cpp"/>`app.cpp` file includes headers from all three directories: `config.h` from `include`, <VPIcon icon="iconfont icon-c"/>`mathutils.h` and `stringutils.h` from `lib`, and its own <VPIcon icon="iconfont icon-c"/>`app.h`.

This cross-directory dependency pattern is common in real projects and is precisely the scenario where Make's manual dependency tracking becomes error-prone. SCons handles it automatically. The <VPIcon icon="iconfont icon-cpp"/>`main.cpp` file is deliberately thin, delegating all work to `run_app()`. This pattern (a thin `main` that calls into application logic) makes the code easier to test because you can link <VPIcon icon="iconfont icon-cpp"/>`app.cpp` against a test harness without pulling in `main`.

Now the build files. Start with the top-level <VPIcon icon="fa-brands fa-python"/>`SConstruct`:

```py title="SConstruct"
import os

env = Environment(
    CPPPATH=['#include', '#lib'],
    CCFLAGS=['-Wall', '-std=c++17'],
)

debug = ARGUMENTS.get('debug', '0')
if debug == '1':
    env.Append(CCFLAGS=['-g', '-O0', '-DDEBUG'])
    variant = 'build/debug'
else:
    env.Append(CCFLAGS=['-O2', '-DNDEBUG'])
    variant = 'build/release'

Export('env')

lib = SConscript('lib/SConscript',
                 variant_dir=variant + '/lib',
                 duplicate=0)

SConscript('src/SConscript',
           variant_dir=variant + '/src',
           duplicate=0,
           exports={'mylib': lib})
```

This <VPIcon icon="fa-brands fa-python"/>`SConstruct` file is the control center of the build. The next section walks through every line in detail.

The library's <VPIcon icon="fa-brands fa-python"/>`SConscript` file:

```py title="lib/SConscript"
Import('env')

lib = env.StaticLibrary('myutils', [
    'mathutils.cpp',
    'stringutils.cpp',
])

Return('lib')
```

This file imports the shared environment, compiles both library source files into a static library named `libmyutils.a` (on Linux) or `myutils.lib` (on Windows), and returns the resulting Node to the caller.

The source file paths <VPIcon icon="iconfont icon-cpp"/>`mathutils.cpp` and <VPIcon icon="iconfont icon-cpp"/>`stringutils.cpp` are relative to this <VPIcon icon="fa-brands fa-python"/>`SConscript` file's directory, which is `lib/`. You don't need to write `lib<VPIcon icon="iconfont icon-cpp"/>/mathutils.cpp` because SCons already knows the context.

The application's <VPIcon icon="fa-brands fa-python"/>`SConscript` file:

```py title="src/SConscript"
Import('env')
Import('mylib')

app = env.Program(
    target='myapp',
    source=['main.cpp', 'app.cpp'],
    LIBS=[mylib, 'm'],
    LIBPATH=['#build/release/lib', '#build/debug/lib'],
)

Return('app')
```

This file imports both the shared environment and the library Node. It compiles the application sources and links them against the `myutils` library and the math library (`-lm`). The `LIBPATH` tells the linker where to find `libmyutils.a`.

Both the debug and release library paths are listed so the linker finds the library regardless of which build variant is active.

---

## Detailed Walkthrough of Every File in the Project

This section explains the <VPIcon icon="fa-brands fa-python"/>`SConstruct` and <VPIcon icon="fa-brands fa-python"/>`SConscript` files line by line. Understanding each line is the difference between cargo-culting a build system and being able to modify it confidently.

### The <VPIcon icon="fa-brands fa-python"/>`SConstruct` File

```py
import os
```

Standard Python import. You might need `os.environ` later to pass shell environment variables into the build, `os.path.join` to construct portable file paths, or `os.path.exists` to check for optional toolchains. Even if you don't use it immediately, having it available is common practice in <VPIcon icon="fa-brands fa-python"/>`SConstruct` files.

```py
env = Environment(
    CPPPATH=['#include', '#lib'],
    CCFLAGS=['-Wall', '-std=c++17'],
)
```

`Environment()` creates a construction environment. This is the central configuration object that holds everything SCons needs to compile and link your code. `CPPPATH` sets the header search path. The `#` prefix means "relative to the directory containing <VPIcon icon="fa-brands fa-python"/>`SConstruct`." So `#include` resolves to `myproject/include` and `#lib` resolves to `myproject/lib`, regardless of which <VPIcon icon="fa-brands fa-python"/>`SConscript` file uses this environment.

When SCons invokes the compiler, it translates `CPPPATH` entries into `-I` flags automatically: `-Iinclude -Ilib`. `CCFLAGS` holds compiler flags passed to both the C and C++ compilers. `-Wall` enables all standard warnings. `-std=c++17` selects the C++17 standard. Note that `-std=c++17` is a language standard flag, so it could also go in `CXXFLAGS` (C++ only), but placing it in `CCFLAGS` is harmless here because this project has no C files.

```py
debug = ARGUMENTS.get('debug', '0')
if debug == '1':
    env.Append(CCFLAGS=['-g', '-O0', '-DDEBUG'])
    variant = 'build/debug'
else:
    env.Append(CCFLAGS=['-O2', '-DNDEBUG'])
    variant = 'build/release'
```

`ARGUMENTS` is a global dictionary that SCons populates from command-line key=value pairs. Running `scons debug=1` sets `ARGUMENTS['debug']` to the string `'1'`. The `get` method provides a default of `'0'` when the key is absent, so running `scons` without arguments builds in release mode.

Depending on the value, the code appends debug flags (`-g` for debug symbols so GDB can show source lines, `-O0` for no optimization so variable values are not optimized away, and `-DDEBUG` to define a preprocessor macro your code can check with `#ifdef DEBUG`) or release flags (`-O2` for optimization and `-DNDEBUG` to disable `assert()` statements).

The `variant` variable determines the output directory for build artifacts. `env.Append()` adds to an existing variable without overwriting what is already there. If `CCFLAGS` already contains `['-Wall', '-std=c++17']`, appending `['-g', '-O0', '-DDEBUG']` produces `['-Wall', '-std=c++17', '-g', '-O0', '-DDEBUG']`.

```py
Export('env')
```

`Export` makes the `env` variable available to <VPIcon icon="fa-brands fa-python"/>`SConscript` files that call `Import('env')`. This is SCons' mechanism for sharing data between build files. It works through a global namespace managed by SCons, not through Python's module import system. You can export any Python object: environments, strings, lists, dictionaries, or Node objects. Multiple variables can be exported at once: `Export('env', 'version', 'platform')`.

```py
lib = SConscript('lib/SConscript',
                 variant_dir=variant + '/lib',
                 duplicate=0)
```

`SConscript()` reads and executes a subsidiary build file. The first argument is the path to the <VPIcon icon="fa-brands fa-python"/>`SConscript` file relative to the <VPIcon icon="fa-brands fa-python"/>`SConstruct`. The `variant_dir` parameter redirects all build output from `lib/` into the variant directory (for example, `build/release/lib`). This keeps compiled object files and libraries out of your source tree. `duplicate=0` tells SCons not to copy (or symlink) source files into the variant directory.

Without this flag, SCons creates copies of your source files inside `build/release/lib` so that the build tool sees sources and outputs in the same directory. This duplication is rarely necessary and can be confusing because you end up with two copies of every source file. Setting `duplicate=0` tells SCons to reference the original source files in place. The return value of `SConscript()` is whatever the subsidiary file passes to `Return()`. In this case, it's the Node object representing the built static library.

```py
SConscript('src/SConscript',
           variant_dir=variant + '/src',
           duplicate=0,
           exports={'mylib': lib})
```

This second `SConscript` call reads the application's build file. The `exports` parameter is different from the global `Export()` function. It passes the library Node (returned from the library SConscript) into the application <VPIcon icon="fa-brands fa-python"/>`SConscript` under the name `mylib`.

This is a scoped export: only this specific <VPIcon icon="fa-brands fa-python"/>`SConscript` call receives `mylib`. The application <VPIcon icon="fa-brands fa-python"/>`SConscript` retrieves it with `Import('mylib')`. This is how the application build file knows about the library without hardcoding paths to `.a` files.

### The Library SConscript

```py
Import('env')
```

`Import` retrieves a variable from SCons' global export namespace. This pulls in the environment that the <VPIcon icon="fa-brands fa-python"/>`SConstruct` file exported with `Export('env')`. After this line, `env` refers to the same Environment object created in <VPIcon icon="fa-brands fa-python"/>`SConstruct`. Any modifications you make to `env` here will affect it everywhere. If you need local modifications, use `env.Clone()` first.

```py
lib = env.StaticLibrary('myutils', [
    'mathutils.cpp',
    'stringutils.cpp',
])
```

`env.StaticLibrary()` is a builder that compiles the listed source files into object files and then archives them into a static library using `ar`.

The first argument is the library name. SCons automatically adds the platform-appropriate prefix and suffix: `libmyutils.a` on Linux/macOS, `myutils.lib` on Windows. You never need to hard-code these. The source file paths are relative to this <VPIcon icon="fa-brands fa-python"/>`SConscript` file's directory (which is `lib/`).

SCons also automatically scans these<VPIcon icon="iconfont icon-cpp"/> `.cpp` files for `#include` directives to establish implicit dependencies on header files. If <VPIcon icon="iconfont icon-cpp"/>`mathutils.cpp` includes <VPIcon icon="iconfont icon-c"/>`mathutils.h`, that dependency is tracked without any action from you.

```py
Return('lib')
```

`Return` sends the library Node back to the calling `SConscript()` function in <VPIcon icon="fa-brands fa-python"/>`SConstruct`. The string `'lib'` is the name of the local variable to return, not a file path. This is similar to a Python `return` statement, but it works across SCons' build file execution model. You can return multiple values: `Return('lib', 'headers')`.

### The Application SConscript

```py
Import('env')
Import('mylib')
```

Two imports: the shared construction environment (from the global `Export`) and the library Node (from the scoped `exports` parameter of the `SConscript()` call in the <VPIcon icon="fa-brands fa-python"/>`SConstruct` file). These are separate `Import` calls, but you can also write `Import('env', 'mylib')` on a single line.

```py
app = env.Program(
    target='myapp',
    source=['main.cpp', 'app.cpp'],
    LIBS=[mylib, 'm'],
    LIBPATH=['#build/release/lib', '#build/debug/lib'],
)
```

`env.Program()` compiles source files and links them into an executable. `target` is the output executable name (SCons adds `.exe` on Windows automatically). `source` lists the C++ files to compile. The order of source files doesn't matter for the final result, but convention is to list <VPIcon icon="iconfont icon-cpp"/>`main.cpp` first.

`LIBS` specifies libraries to link against. Passing the `mylib` Node directly (instead of a string like `'myutils'`) is the correct approach because SCons then knows the exact file dependency and will rebuild the executable if the library changes.

The `'m'` string links the system math library (`-lm` on the command line), needed because <VPIcon icon="iconfont icon-cpp"/>`mathutils.cpp` uses functions from `<cmath>`. `LIBPATH` tells the linker where to search for libraries, translated to `-L` flags. Both debug and release paths are listed so the correct one is found regardless of build type.

These keyword arguments (`LIBS`, `LIBPATH`) override the environment's values for this specific builder call only. They don't modify the shared `env`.

```py
Return('app')
```

Returns the application Node to the caller. The <VPIcon icon="fa-brands fa-python"/>`SConstruct` doesn't use this return value in the current example, but returning it is good practice because it allows future extensions. You might later add `env.Install('/usr/local/bin', app)` in the <VPIcon icon="fa-brands fa-python"/>`SConstruct`, or create an `env.Alias('run', app, './build/release/src/myapp')` to define a `scons run` command.

---

## Running the Build and Understanding the Output

With all files in place, run the build from the project root.

```sh
scons
```

SCons produces output like this (on Linux with GCC):

```plaintext
scons: Reading <VPIcon icon="fa-brands fa-python"/>`SConscript` files ...
scons: done reading <VPIcon icon="fa-brands fa-python"/>`SConscript` files.
scons: Building targets ...
g++ -o build/release/lib/mathutils.o -c -Wall -std=c++17 -O2 -DNDEBUG -Iinclude -Ilib lib/mathutils.cpp
g++ -o build/release/lib/stringutils.o -c -Wall -std=c++17 -O2 -DNDEBUG -Iinclude -Ilib lib/stringutils.cpp
ar rc build/release/lib/libmyutils.a build/release/lib/mathutils.o build/release/lib/stringutils.o
ranlib build/release/lib/libmyutils.a
g++ -o build/release/src/main.o -c -Wall -std=c++17 -O2 -DNDEBUG -Iinclude -Ilib src/main.cpp
g++ -o build/release/src/app.o -c -Wall -std=c++17 -O2 -DNDEBUG -Iinclude -Ilib src/app.cpp
g++ -o build/release/src/myapp build/release/src/main.o build/release/src/app.o -Lbuild/release/lib -Lbuild/debug/lib build/release/lib/libmyutils.a -lm
scons: done building targets.
```

The first two lines show SCons reading all <VPIcon icon="fa-brands fa-python"/>`SConstruct` and <VPIcon icon="fa-brands fa-python"/>`SConscript` files. During this phase, it constructs the complete dependency graph in memory. No compilation happens yet.

The "Building targets" section shows the actual commands executed. Each `g++` call includes the `-I` flags derived from `CPPPATH` (note `-Iinclude -Ilib`), the flags from `CCFLAGS` (`-Wall -std=c++17 -O2 -DNDEBUG`), and the `-c` flag for compilation (producing an object file, not linking).

The `ar rc` command creates the static library archive, and `ranlib` generates the archive index so the linker can find symbols efficiently.

The final `g++` line links everything together, with `-L` flags from `LIBPATH` pointing the linker to the library directories, the explicit library file path, and `-lm` for the system math library.

Run the resulting executable:

```sh
./build/release/src/myapp
```

The output is:

```plaintext
Application: SCons Demo
Version: 1.0.0
5! = 120
Circle area (r=3): 28.2743
HELLO SCONS
```

Each line corresponds to a function call in `run_app()`. The version and name come from `config.h`. The factorial and circle area come from `mathutils`. The uppercase string comes from `stringutils`. All libraries linked correctly and all header paths resolved.

Now build the debug version:

```sh
scons debug=1
```

This creates a parallel set of build artifacts under `build/debug/`. The release build artifacts under `build/release/` remain untouched.

You can switch between debug and release builds without triggering a full recompile of the other variant. Each variant has its own `.o` files, `.a` library, and executable. The directory structure under `build/debug/` mirrors `build/release/`.

---

## What Happens During an Incremental Build

Understanding what SCons does on the second and subsequent builds helps you trust the system and diagnose unexpected rebuilds.

Run `scons` again after a successful build. The output is:

```plaintext
scons: Reading <VPIcon icon="fa-brands fa-python"/>`SConscript` files ...
scons: done reading <VPIcon icon="fa-brands fa-python"/>`SConscript` files.
scons: Building targets ...
scons: `.' is up to date.
scons: done building targets.
```

SCons still reads every <VPIcon icon="fa-brands fa-python"/>`SConscript` file and constructs the full dependency graph. It then walks the graph and checks every node.

For each source file, it computes the content hash and compares it to the hash stored in `.sconsign.dblite`. For each target file, it checks whether the source hashes, compiler command, and flags match the values from the previous build. Everything matches, so nothing is rebuilt.

Now modify `lib/mathutils.h` by adding a new function declaration:

```cpp
// Add this line to mathutils.h
int fibonacci(int n);
```

Run `scons` again. SCons recompiles <VPIcon icon="iconfont icon-cpp"/>`mathutils.cpp` (because it includes <VPIcon icon="iconfont icon-c"/>`mathutils.h`, which changed), recompiles <VPIcon icon="iconfont icon-cpp"/>`app.cpp` (because it also includes <VPIcon icon="iconfont icon-c"/>`mathutils.h`), re-archives the static library (because `mathutils.o` changed), and re-links the executable (because both the library and `app.o` changed).

It doesn't recompile <VPIcon icon="iconfont icon-cpp"/>`stringutils.cpp` (it doesn't include <VPIcon icon="iconfont icon-c"/>`mathutils.h`) or <VPIcon icon="iconfont icon-cpp"/>`main.cpp` (it only includes <VPIcon icon="iconfont icon-c"/>`app.h`, which didn't change).

This is the dependency graph at work. SCons knows the complete chain: <VPIcon icon="iconfont icon-c"/>`mathutils.h` changed, so every file that directly or transitively depends on it gets rebuilt. Files that don't depend on it are untouched. You didn't need to specify any of these dependencies manually.

Now add a comment to <VPIcon icon="iconfont icon-cpp"/>`stringutils.cpp` without changing any actual code:

```cpp
// This is just a comment
#include "stringutils.h"
```

Run `scons`. SCons recompiles <VPIcon icon="iconfont icon-cpp"/>`stringutils.cpp` because its content hash changed (comments are part of the content).

But here's where SCons gets clever: after recompiling, it computes the hash of the new `stringutils.o`. If the compiler produced an identical object file (which it often does for comment-only changes because comments don't affect the compiled output), SCons doesn't re-archive the library or re-link the executable.

This "short-circuiting" behavior prevents unnecessary downstream rebuilds. Make can't do this because it only looks at timestamps, not content.

---

## Cross-Compiling for QuRT (Qualcomm Real-Time OS)

One of SCons' strengths is that setting up cross-compilation does not require a separate toolchain file format (like CMake's toolchain files). You configure everything in Python, using the same Environment API you already know.

### What is QuRT

[**QuRT is Qualcomm's proprietary real-time operating system**](/freecodecamp.org/qurt-the-real-time-os-inside-your-phone-s-processor-full-handbook/README.md) that runs on the Hexagon DSP (Digital Signal Processor) found in Snapdragon processors. The Hexagon DSP is a separate processor core on the Snapdragon SoC (System on Chip), distinct from the ARM application cores that run Android or Linux.

While the ARM cores handle the user interface and general application logic, the Hexagon DSP handles computationally intensive, latency-sensitive tasks: audio processing, sensor fusion, camera image processing, and machine learning inference.

QuRT provides the threading, memory management, and interrupt handling layer on the Hexagon DSP. It's a microkernel RTOS with hard real-time guarantees: interrupt latencies are bounded and predictable, which is essential for applications like audio where a missed deadline produces an audible glitch. QuRT supports POSIX-like threading (with `qurt_thread_create` instead of `pthread_create`), mutexes, semaphores, signals, and memory-mapped I/O.

Building code for QuRT requires the Hexagon SDK, which includes the Hexagon compiler (`hexagon-clang` and `hexagon-clang++`), linker, assembler, archiver, and QuRT-specific system headers and libraries. The SDK also includes a simulator (`hexagon-sim`) that can run Hexagon binaries on your development machine for testing without physical hardware.

### The Hexagon SDK Directory Structure

The Hexagon SDK follows a specific layout that you need to know to configure your build system. A typical installation looks like this:

```plaintext :collapsed-lines
$HEXAGON_SDK_ROOT/
  tools/
    HEXAGON_Tools/
      8.8.06/
        Tools/
            bin/
              hexagon-clang
              hexagon-clang++
              hexagon-ar
              hexagon-ranlib
              hexagon-as
              hexagon-sim
            include/
            lib/
  rtos/
    qurt/
      computev66/
        include/
          qurt.h
          qurt_thread.h
          qurt_mutex.h
          posix/
        lib/
          libqurt.a
      computev73/
          include/
          lib/
  libs/
    common/
```

The `tools/HEXAGON_Tools` directory contains the compiler toolchain. The version number (like `8.8.06`) corresponds to the Hexagon Tools release. The `rtos/qurt` directory contains the QuRT kernel headers and prebuilt libraries, organized by architecture variant. `computev66` targets the Hexagon V66 architecture (found in older Snapdragon chips), while `computev73` targets the V73 (found in newer ones like Snapdragon 8 Gen 2). Each variant has its own `include` and `lib` directories because the kernel is compiled differently for each architecture version.

### The Cross-Compilation <VPIcon icon="fa-brands fa-python"/>`SConstruct`

The following <VPIcon icon="fa-brands fa-python"/>`SConstruct` file configures a cross-compilation environment for QuRT. It assumes the Hexagon SDK is installed and the `HEXAGON_SDK_ROOT` environment variable points to it.

```py :collapsed-lines title="SConstruct"
# `SConstruct` for QuRT / Hexagon cross-compilation
import os
import sys

hexagon_sdk = os.environ.get('HEXAGON_SDK_ROOT',
                              '/opt/hexagon/sdk')
if not os.path.isdir(hexagon_sdk):
    print('Error: HEXAGON_SDK_ROOT not set or directory does not exist')
    print('Set it with: export HEXAGON_SDK_ROOT=/path/to/hexagon/sdk')
    Exit(1)

hexagon_tools = os.path.join(hexagon_sdk, 'tools', 'HEXAGON_Tools')
hexagon_ver = os.environ.get('HEXAGON_TOOLS_VER', '8.8.06')
tool_base = os.path.join(hexagon_tools, hexagon_ver, 'Tools')
tool_bin = os.path.join(tool_base, 'bin')

hexagon_arch = ARGUMENTS.get('arch', 'v73')
qurt_root = os.path.join(hexagon_sdk, 'rtos', 'qurt')
qurt_variant = 'compute' + hexagon_arch
qurt_inc = os.path.join(qurt_root, qurt_variant, 'include')
qurt_lib = os.path.join(qurt_root, qurt_variant, 'lib')

env = Environment(
    CC=os.path.join(tool_bin, 'hexagon-clang'),
    CXX=os.path.join(tool_bin, 'hexagon-clang++'),
    AR=os.path.join(tool_bin, 'hexagon-ar'),
    RANLIB=os.path.join(tool_bin, 'hexagon-ranlib'),
    AS=os.path.join(tool_bin, 'hexagon-as'),
    LINK=os.path.join(tool_bin, 'hexagon-clang++'),
    CPPPATH=[
        '#include',
        '#lib',
        qurt_inc,
        os.path.join(qurt_inc, 'posix'),
    ],
    CCFLAGS=[
        '-m' + hexagon_arch,
        '-G0',
        '-Wall',
        '-O2',
        '-fPIC',
        '-DQURT',
        '-D__QURT',
    ],
    LINKFLAGS=[
        '-m' + hexagon_arch,
        '-G0',
        '-nostdlib',
    ],
    LIBPATH=[
        '#build/qurt/lib',
        qurt_lib,
    ],
    LIBS=[
        'qurt',
        'qcc',
        'timer',
    ],
    ENV={
        'PATH': tool_bin + ':' + os.environ.get('PATH', ''),
        'HEXAGON_SDK_ROOT': hexagon_sdk,
    },
)

env['CCCOMSTR'] = '  HEX-CC   $TARGET'
env['CXXCOMSTR'] = '  HEX-CXX  $TARGET'
env['LINKCOMSTR'] = '  HEX-LINK $TARGET'
env['ARCOMSTR'] = '  HEX-AR   $TARGET'

Export('env')

lib = SConscript('lib/SConscript',
                 variant_dir='build/qurt/lib',
                 duplicate=0)

SConscript('src/SConscript',
           variant_dir='build/qurt/src',
           duplicate=0,
           exports={'mylib': lib})
```

This file does a lot, so it's worth going through the key parts in detail.

The first block validates and constructs file paths to the Hexagon toolchain. `HEXAGON_SDK_ROOT` is the standard environment variable set when you install the Hexagon SDK. If it's not set, the build exits with a clear error message instead of failing later with a cryptic "compiler not found" error. The `tool_bin` variable points to the directory containing `hexagon-clang`, `hexagon-clang++`, `hexagon-ar`, and other cross-compilation tools.

The architecture is configurable through the command line with `scons arch=v66` or `scons arch=v73`. The `hexagon_arch` variable defaults to `v73` and feeds into both the compiler flags (`-mv73`) and the QuRT directory path (`computev73`). This makes it easy to target different Hexagon versions from the same build file.

The `qurt_root`, `qurt_inc`, and `qurt_lib` variables locate the QuRT headers and prebuilt libraries. The `posix` subdirectory inside the include path contains POSIX-compatible wrappers that let you use familiar function signatures (like `pthread_mutex_init`) that map to QuRT's native API underneath.

The `Environment()` call overrides every tool. `CC`, `CXX`, `AR`, `RANLIB`, `AS`, and `LINK` all point to the Hexagon cross-compiler tools instead of the host system's native compiler.

This is the fundamental mechanism for cross-compilation in SCons: you swap out the tools in the construction environment. The same <VPIcon icon="fa-brands fa-python"/>`SConscript` files that work for native builds work for cross-builds because they only interact with the environment through the `env` variable, never by calling `gcc` directly.

The `CCFLAGS` array contains Hexagon-specific flags. `-mv73` (assembled from `-m` + the architecture variable) targets the V73 architecture and tells the compiler to generate Hexagon V73 instructions.

`-G0` disables the small data section. On the Hexagon DSP, the small data section uses a special register (GP) for faster access to small global variables, but disabling it with `-G0` is standard practice for shared libraries and position-independent code where the GP register cannot be relied upon.

`-fPIC` generates position-independent code, required for shared objects on the DSP. The `-DQURT` and `-D__QURT` defines are preprocessor macros that QuRT headers and application code check with `#ifdef` to detect a QuRT build and enable RTOS-specific code paths.

The `LINKFLAGS` include `-nostdlib` because QuRT provides its own C runtime. The standard GNU C library (glibc) is built for Linux and would pull in Linux system calls that don't exist on the Hexagon DSP. QuRT provides its own versions of functions like `malloc`, `printf`, and `memcpy` that are implemented on top of the QuRT kernel.

The `LIBS` list specifies QuRT-specific libraries: `qurt` (the RTOS kernel interface, providing threading, mutexes, and memory management), `qcc` (Qualcomm C compiler runtime, providing low-level arithmetic helpers and compiler intrinsics), and `timer` (hardware timer access for profiling and delay functions).

The `ENV` dictionary controls what environment the child processes (compilers, linkers) see when SCons invokes them. The Hexagon tool binary directory is prepended to `PATH` so that tools can find each other (for example, `hexagon-clang` may internally invoke `hexagon-as` for assembly steps). `HEXAGON_SDK_ROOT` is passed through because some Hexagon tools reference it internally to locate standard headers and runtime libraries.

The `CCCOMSTR`, `CXXCOMSTR`, `LINKCOMSTR`, and `ARCOMSTR` variables customize the build output. Instead of printing the full compiler command line (which can be hundreds of characters long with all the flags and paths), SCons prints a short summary like `HEX-CXX build/qurt/lib/mathutils.o`. This makes it easy to see at a glance that you're using the cross-compiler, not the host compiler.

To see the full commands (useful for debugging), remove these four lines or run `scons` with `verbose=1` and add the corresponding check in the <VPIcon icon="fa-brands fa-python"/>`SConstruct`.

Everything after the environment setup is identical to the native build: `Export`, `SConscript` calls with variant directories, and the same library and application <VPIcon icon="fa-brands fa-python"/>`SConscript` files.

The <VPIcon icon="fa-brands fa-python"/>`SConscript` files don't know or care whether they're building for the host or for QuRT. They just use whatever environment they receive through `Import('env')`. This separation is a key design advantage. Your build logic (what files to compile, what libraries to create) stays in the <VPIcon icon="fa-brands fa-python"/>`SConscript` files. Your toolchain configuration stays in the <VPIcon icon="fa-brands fa-python"/>`SConstruct`.

To build for QuRT, set the SDK path and run SCons.

```sh
export HEXAGON_SDK_ROOT=/path/to/hexagon/sdk
scons
```

The output shows the Hexagon compiler being invoked instead of GCC.

```plaintext
  HEX-CXX  build/qurt/lib/mathutils.o
  HEX-CXX  build/qurt/lib/stringutils.o
  HEX-AR   build/qurt/lib/libmyutils.a
  HEX-CXX  build/qurt/src/main.o
  HEX-CXX  build/qurt/src/app.o
  HEX-LINK build/qurt/src/myapp
```

Each line confirms that the Hexagon tools are running, not the host tools. The resulting `myapp` binary is a Hexagon executable. You can't run it directly on your development machine (it contains Hexagon instructions, not x86 or ARM). To test it, use the Hexagon simulator: `hexagon-sim build/qurt/src/myapp`.

To target a different Hexagon architecture, pass the `arch` argument.

```sh
scons arch=v66
```

This changes the compiler flag to `-mv66` and selects the `computev66` QuRT headers and libraries. Everything else remains the same.

---

## Writing QuRT-Specific Application Code

Real QuRT applications use the RTOS API for threading, synchronization, and hardware interaction. The following example replaces the generic <VPIcon icon="iconfont icon-cpp"/>`main.cpp` with a QuRT-specific version that creates threads and uses a mutex.

```cpp :collapsed-lines title="src/main_qurt.cpp"
#include "app.h"
#include <qurt.h>
#include <qurt_thread.h>
#include <qurt_mutex.h>
#include <stdio.h>

#define STACK_SIZE 4096

static qurt_mutex_t print_mutex;
static char worker_stack[STACK_SIZE];

void worker_thread(void *arg) {
    int id = (int)(long)arg;
    qurt_mutex_lock(&print_mutex);
    printf("Worker thread %d running on QuRT\n", id);
    run_app();
    qurt_mutex_unlock(&print_mutex);
    qurt_thread_exit(0);
}

int main() {
    qurt_thread_t thread_id;
    qurt_thread_attr_t attr;

    qurt_mutex_init(&print_mutex);

    qurt_thread_attr_init(&attr);
    qurt_thread_attr_set_name(&attr, "worker");
    qurt_thread_attr_set_stack_addr(&attr, worker_stack);
    qurt_thread_attr_set_stack_size(&attr, STACK_SIZE);
    qurt_thread_attr_set_priority(&attr, 100);

    qurt_thread_create(&thread_id, &attr,
                       worker_thread, (void *)1);

    int status;
    qurt_thread_join(thread_id, &status);

    qurt_mutex_destroy(&print_mutex);
    return 0;
}
```

This code demonstrates the core QuRT threading API.

- `qurt_mutex_init` initializes a mutex for synchronizing access to `printf` (which isn't thread-safe on QuRT without protection).
- `qurt_thread_attr_init` creates a thread attribute structure, and the subsequent calls configure the thread's name (visible in the debugger), stack memory (you provide the buffer, QuRT doesn't allocate it for you), stack size (4096 bytes is typical for lightweight threads), and priority (QuRT uses priority-based preemptive scheduling where lower numbers mean higher priority).
- `qurt_thread_create` spawns the thread, passing a function pointer and an argument.
- `qurt_thread_join` blocks until the thread completes, similar to `pthread_join`.
- `qurt_mutex_destroy` cleans up the mutex.

Several differences from POSIX threading matter for correctness. On QuRT, you must provide the stack memory yourself as a statically allocated buffer (or dynamically allocated via `qurt_malloc`). The RTOS doesn't have a general-purpose `malloc`-like stack allocator the way Linux does. Thread priorities are explicit and mandatory – there's no default priority. And `qurt_thread_exit` must be called at the end of every thread function: falling off the end of the function without calling it is undefined behavior on QuRT.

To build with this QuRT-specific main instead of the generic one, modify the <VPIcon icon="fas fa-folder-open"/>`src/`<VPIcon icon="fa-brands fa-python"/>`SConscript` to select the right file:

```py title="SConscript"
# (QuRT-aware version)
Import('env')
Import('mylib')

import os
is_qurt = 'DQURT' in ' '.join(env.get('CCFLAGS', []))

main_src = 'main_qurt.cpp' if is_qurt else 'main.cpp'

app = env.Program(
    target='myapp',
    source=[main_src, 'app.cpp'],
    LIBS=[mylib, 'm'],
    LIBPATH=['#build/qurt/lib', '#build/release/lib', '#build/debug/lib'],
)

Return('app')
```

This <VPIcon icon="fa-brands fa-python"/>`SConscript` inspects the environment's `CCFLAGS` to determine whether the QuRT preprocessor define is present. If it is, the build uses <VPIcon icon="iconfont icon-cpp"/>`main_qurt.cpp`. If not, it uses the standard <VPIcon icon="iconfont icon-cpp"/>`main.cpp`.

This is a simple example of using Python logic in a build file to adapt to different targets, something that requires convoluted syntax in Make and a separate toolchain file in CMake.

---

## Building Both Native and QuRT From One <VPIcon icon="fa-brands fa-python"/>`SConstruct`

If you need both a native build (for running unit tests on your development machine) and a QuRT build (for deployment to the DSP), you can configure both in a single <VPIcon icon="fa-brands fa-python"/>`SConstruct`.

```py :collapsed-lines title="SConstruct"
# (dual-target: native + QuRT)
import os
import sys

native_env = Environment(
    CPPPATH=['#include', '#lib'],
    CCFLAGS=['-Wall', '-std=c++17', '-O2'],
)

hexagon_sdk = os.environ.get('HEXAGON_SDK_ROOT', '')
build_qurt = os.path.isdir(hexagon_sdk)

if build_qurt:
    hexagon_tools = os.path.join(hexagon_sdk, 'tools', 'HEXAGON_Tools')
    hexagon_ver = os.environ.get('HEXAGON_TOOLS_VER', '8.8.06')
    tool_bin = os.path.join(hexagon_tools, hexagon_ver, 'Tools', 'bin')
    hexagon_arch = ARGUMENTS.get('arch', 'v73')
    qurt_root = os.path.join(hexagon_sdk, 'rtos', 'qurt')
    qurt_variant = 'compute' + hexagon_arch
    qurt_inc = os.path.join(qurt_root, qurt_variant, 'include')
    qurt_lib = os.path.join(qurt_root, qurt_variant, 'lib')

    qurt_env = Environment(
        CC=os.path.join(tool_bin, 'hexagon-clang'),
        CXX=os.path.join(tool_bin, 'hexagon-clang++'),
        AR=os.path.join(tool_bin, 'hexagon-ar'),
        RANLIB=os.path.join(tool_bin, 'hexagon-ranlib'),
        LINK=os.path.join(tool_bin, 'hexagon-clang++'),
        CPPPATH=['#include', '#lib', qurt_inc,
                 os.path.join(qurt_inc, 'posix')],
        CCFLAGS=['-m' + hexagon_arch, '-G0', '-Wall',
                 '-O2', '-fPIC', '-DQURT', '-D__QURT'],
        LINKFLAGS=['-m' + hexagon_arch, '-G0', '-nostdlib'],
        LIBPATH=[qurt_lib],
        LIBS=['qurt', 'qcc', 'timer'],
        ENV={'PATH': tool_bin + ':' + os.environ.get('PATH', ''),
             'HEXAGON_SDK_ROOT': hexagon_sdk},
    )
    qurt_env['CXXCOMSTR'] = '  HEX-CXX  $TARGET'
    qurt_env['LINKCOMSTR'] = '  HEX-LINK $TARGET'
    qurt_env['ARCOMSTR'] = '  HEX-AR   $TARGET'

native_lib = SConscript('lib/SConscript',
                        variant_dir='build/native/lib',
                        duplicate=0,
                        exports={'env': native_env})
SConscript('src/SConscript',
           variant_dir='build/native/src',
           duplicate=0,
           exports={'env': native_env, 'mylib': native_lib})

if build_qurt:
    qurt_lib_node = SConscript('lib/SConscript',
                               variant_dir='build/qurt/lib',
                               duplicate=0,
                               exports={'env': qurt_env})
    SConscript('src/SConscript',
               variant_dir='build/qurt/src',
               duplicate=0,
               exports={'env': qurt_env, 'mylib': qurt_lib_node})
```

Each `SConscript` call passes a different environment through the `exports` parameter. The <VPIcon icon="fa-brands fa-python"/>`SConscript` files themselves remain completely unchanged from the single-target version. SCons executes both variants in a single invocation and correctly handles dependencies between them. The native build always runs. The QuRT build runs only when `HEXAGON_SDK_ROOT` points to a valid directory. This means developers who don't have the Hexagon SDK installed can still build and test the native version without errors.

This pattern shows why Python build files are powerful. Conditional logic, environment detection, path validation, and multi-target builds all use standard Python constructs. There's no special cross-compilation syntax to learn, no separate toolchain file format, and no need to run the build tool twice with different arguments.

---

## How SCons Detects Dependencies and Decides What to Rebuild

SCons ships with built-in scanners for C/C++ (`#include` directives), Fortran (`INCLUDE` and `USE` statements), Java (`import` statements), D (`import` statements), and LaTeX (`\include` and `\input` commands).

When SCons compiles <VPIcon icon="iconfont icon-cpp"/>`app.cpp`, it reads the file, finds `#include "config.h"`, `#include "mathutils.h"`, and the other includes, resolves them against the `CPPPATH` search path, and automatically adds those headers to the dependency graph.

If you change <VPIcon icon="iconfont icon-c"/>`mathutils.h`, SCons knows to recompile <VPIcon icon="iconfont icon-cpp"/>`app.cpp` even though you didn't list that dependency anywhere. Make requires you to set this up manually or use a tool like `gcc -MM` to generate dependency files, and if you forget, your build produces incorrect results silently.

The default rebuild strategy uses content hashing. SCons computes an MD5 hash of every source file and stores it in a database file called `.sconsign.dblite` in the project root. On the next build, it recomputes hashes and compares. If the hash hasn't changed, the file isn't rebuilt.

This extends to the build outputs themselves: if recompiling a<VPIcon icon="iconfont icon-cpp"/> `.cpp` file produces an identical `.o` file (for example, because you only changed a comment), SCons won't re-link the final executable.

This "short-circuiting" behavior can save significant time on large projects where a header change triggers recompilation of many files but only a few actually produce different object code.

The `.sconsign.dblite` file stores more than just content hashes. It records the full build signature for each target: the content hashes of all source files, the compiler command line (including all flags), and the implicit dependencies discovered by scanners. If you change a compiler flag (for example, switching from `-O2` to `-O3`), SCons detects that the build signature has changed and recompiles everything, even though no source files changed. Make can't do this because it only tracks file timestamps.

You can change the rebuild strategy with the `Decider` function:

```py
Decider('content')            # Default: MD5 hash comparison
Decider('timestamp-newer')    # Make-like: rebuild if source is newer
Decider('timestamp-match')    # Rebuild if timestamp changed at all
Decider('content-timestamp')  # Hybrid: only hash if timestamp changed
```

`'content'` is the default and the most correct. It reads every source file on every build to compute hashes, which is thorough but adds I/O overhead.

`'timestamp-newer'` mimics Make's behavior: rebuild if the source file's modification time is newer than the target's. This is fast but misses cases where a file is restored from backup (older timestamp, different content).

`'timestamp-match'` rebuilds if the timestamp has changed in either direction, which handles the restore case.

`'content-timestamp'` is the best hybrid: it only reads file contents (to compute hashes) when the timestamp has changed, skipping the I/O for files that haven't been touched. On projects with thousands of source files, this can cut SCons' startup overhead noticeably.

You can also change the hash algorithm:

```py
SetOption('hash_format', 'sha256')
```

This switches from MD5 to SHA-256. MD5 is not collision-resistant for adversarial inputs, but for build system purposes (detecting accidental changes to source files), it's perfectly adequate. SHA-256 is an option for environments with strict compliance requirements.

You can write a custom decider function for specialized rebuild logic:

```py
def my_decider(dependency, target, prev_ni, repo_node=None):
    return dependency.get_timestamp() != prev_ni.timestamp

env.Decider(my_decider)
```

The custom decider receives the dependency node, the target node, and the "node info" from the previous build. It returns `True` to trigger a rebuild or `False` to skip. This is useful for exotic scenarios like triggering rebuilds based on external state (database versions, API schemas) that aren't captured by file content.

---

## Writing a Custom Scanner

If your project uses a file format that includes other files (similar to C's `#include`), you can write a custom scanner so SCons tracks those dependencies automatically.

Consider a custom configuration file format where `@import filename.cfg` includes another file:

```py
import re

import_re = re.compile(r'^@import\s+(\S+)', re.MULTILINE)

def cfg_scan(node, env, path):
    contents = node.get_text_contents()
    includes = import_re.findall(contents)
    return [env.File(f) for f in includes]

cfg_scanner = Scanner(
    function=cfg_scan,
    skeys=['.cfg'],
    recursive=True,
)

env.Append(SCANNERS=cfg_scanner)
```

The `cfg_scan` function reads the file contents, finds all `@import` directives using a regular expression, and returns a list of File nodes representing the imported files.

The `skeys` parameter tells SCons to apply this scanner to files with the `.cfg` extension.

The `recursive=True` parameter tells SCons to scan the imported files as well, so transitive dependencies are tracked. After appending the scanner to the environment, any builder that processes `.cfg` files will automatically detect and track `@import` dependencies.

---

## The Shared Build Cache

SCons supports `CacheDir`, a shared build cache that stores compiled artifacts indexed by their build signature (a hash incorporating the source content, compiler command, and flags). If another developer on your team has already built an identical configuration, you get the cached result instead of recompiling.

```py
CacheDir('/shared/network/build_cache')
```

This line is all you need to enable caching. When SCons builds a file, it stores a copy in the cache directory, named by the build signature hash. On subsequent builds (by you or anyone else pointing to the same cache), if the build signature matches, the cached file is copied into the build directory instead of running the compiler. This works like ccache but applies to any build artifact, not just compiled objects. Libraries, executables, generated code, and any other builder output can be cached.

The build signature is comprehensive. It incorporates the content hashes of all source files, the full compiler command line (including flags), and the tool version. Different compiler flags produce different cache entries, so debug and release builds don't interfere with each other. If two developers use the same compiler version and the same flags on the same source code, they share cache hits.

Several command-line flags control cache behavior:

```sh
scons --cache-show       # Show what command would have run for cached targets
scons --cache-disable    # Ignore cache for this run
scons --cache-readonly   # Read from cache but do not write new entries
scons --cache-force      # Update cache even if target is up to date
```

`--cache-show` is useful for debugging. When a target is retrieved from cache, SCons normally prints nothing (or a short message). With `--cache-show`, it prints the command that would have been executed, so you can verify the cached entry matches your expectations.

`--cache-readonly` is useful for CI systems that should consume cache entries built by developers but not pollute the cache with CI-specific configurations.

---

## Working with Shared Libraries

Building shared libraries (`.so` on Linux, `.dylib` on macOS, `.dll` on Windows) requires different compiler and linker flags than static libraries. SCons handles most of this automatically through the `SharedLibrary` builder.

```py
env = Environment()
shared_lib = env.SharedLibrary('myutils', [
    'mathutils.cpp',
    'stringutils.cpp',
])
```

On Linux, this produces `libmyutils.so`. SCons automatically adds `-fPIC` to the compilation flags for source files that go into a shared library (it uses `SharedObject` internally instead of `StaticObject`). On Windows, it produces `myutils.dll` plus `myutils.lib` (the import library).

For versioned shared libraries on POSIX systems, use the `SHLIBVERSION` parameter:

```py
shared_lib = env.SharedLibrary('myutils', sources,
                                SHLIBVERSION='1.2.3')
```

This produces three files: `libmyutils.so.1.2.3` (the actual library), `libmyutils.so.1` (the soname symlink used at runtime), and `libmyutils.so` (the development symlink used at link time). SCons creates all three and manages the symlinks.

You can't mix `StaticObject` and `SharedObject` files. If you compile a file with `env.Object()` (which creates a static object without `-fPIC`), you can't put it into a `SharedLibrary`. SCons enforces this and produces an error if you try. If you need the same source file compiled both ways, call each builder separately.

```py
static_objs = [env.StaticObject(f) for f in sources]
shared_objs = [env.SharedObject(f) for f in sources]

static_lib = env.StaticLibrary('myutils', static_objs)
shared_lib = env.SharedLibrary('myutils', shared_objs)
```

Each source file gets compiled twice: once without `-fPIC` for the static library, once with `-fPIC` for the shared library. The resulting object files have different names (SCons appends different suffixes) so they don't collide.

---

## Adding Command-Line Options with AddOption

The `ARGUMENTS` dictionary works for simple key=value pairs, but for more complex command-line interfaces (flags like `--prefix`, `--enable-feature`, or `--with-library`), use `AddOption`.

```py
AddOption('--prefix',
    dest='prefix',
    type='string',
    nargs=1,
    action='store',
    metavar='DIR',
    default='/usr/local',
    help='Installation prefix (default: /usr/local)')

AddOption('--enable-tests',
    dest='enable_tests',
    action='store_true',
    default=False,
    help='Build and run unit tests')

prefix = GetOption('prefix')
build_tests = GetOption('enable_tests')

env = Environment(PREFIX=prefix)

app = env.Program('myapp', sources)
env.Install(os.path.join(prefix, 'bin'), app)

if build_tests:
    test_env = env.Clone()
    test_env.Program('test_runner', test_sources)
```

`AddOption` uses Python's `optparse` module under the hood, so the parameter names (`dest`, `type`, `action`, `metavar`, `default`, `help`) follow the same conventions. `GetOption` retrieves the parsed value. These options appear in `scons --help` output alongside SCons' built-in options, giving users a clean command-line interface.

Running `scons --prefix=/opt/myapp --enable-tests` installs to `/opt/myapp/bin` and builds the test suite. Running `scons --help` shows all available options with their descriptions.

The advantage over `ARGUMENTS` is discoverability. `ARGUMENTS` requires the user to know which key=value pairs your build file accepts. `AddOption` makes them visible in `--help` output and provides type checking and default values.

---

## Configure Checks for Portability

SCons includes an autoconf-like system for probing the build environment. You can check for headers, libraries, functions, and type sizes before building.

```py
env = Environment()
conf = Configure(env)

if not conf.CheckCHeader('math.h'):
    print('Error: math.h not found')
    Exit(1)

if not conf.CheckCXXHeader('iostream'):
    print('Error: C++ standard library headers not found')
    Exit(1)

if not conf.CheckLib('pthread', language='C'):
    print('Error: pthread library not found')
    Exit(1)

if conf.CheckFunc('posix_memalign'):
    conf.env.Append(CPPDEFINES=['HAVE_POSIX_MEMALIGN'])

if conf.CheckFunc('aligned_alloc'):
    conf.env.Append(CPPDEFINES=['HAVE_ALIGNED_ALLOC'])

if conf.CheckTypeSize('long') == 8:
    conf.env.Append(CPPDEFINES=['HAVE_64BIT_LONG'])

env = conf.Finish()
```

`Configure()` creates a configuration context that compiles and links small test programs behind the scenes to determine whether headers exist, libraries can be linked, and functions are available. Each `Check` method writes a tiny C or C++ program, compiles it with the current environment settings, and returns `True` or `False` based on whether compilation and linking succeeded. `conf.Finish()` returns the (possibly modified) environment and cleans up.

`CheckCHeader` verifies that a C header can be included. `CheckCXXHeader` does the same for C++ headers. `CheckLib` verifies that a library can be linked; the `language` parameter determines whether to use the C or C++ compiler for the test. `CheckFunc` checks whether a function is available (it creates a test program that references the function and attempts to link it). `CheckTypeSize` compiles a program that uses `sizeof()` and returns the size as an integer.

The `CPPDEFINES` added by the checks (like `HAVE_POSIX_MEMALIGN`) follow the standard autoconf convention. Your source code can then use these defines:

```cpp
#ifdef HAVE_POSIX_MEMALIGN
    posix_memalign(&ptr, alignment, size);
#elif defined(HAVE_ALIGNED_ALLOC)
    ptr = aligned_alloc(alignment, size);
#else
    ptr = malloc(size);
#endif
```

This pattern makes your code portable across systems that may or may not have specific functions, without hardcoding platform assumptions.

Configure checks are cached in `.sconf_temp/` and `.sconsign.dblite`. On subsequent builds, if the environment hasn't changed, SCons skips the checks and uses the cached results. You can force rechecking with `scons --config=force`.

---

## Custom Builders for Non-Standard File Types

You can define builders for file types that SCons doesn't know about. A builder wraps a shell command (or a Python function) with source/target suffix handling.

### Builder with an External Command

```py
protobuf = Builder(
    action='protoc --cpp_out=\(TARGET.dir \)SOURCE',
    suffix='.pb.cc',
    src_suffix='.proto',
)
env.Append(BUILDERS={'Protobuf': protobuf})
env.Protobuf('messages.proto')
```

This creates a `Protobuf` builder that runs `protoc` on `.proto` files and produces `.pb.cc` files. The `action` string uses SCons variable substitution: `\(SOURCE` expands to the input file path and `\)TARGET.dir` expands to the directory of the output file. The `suffix` and `src_suffix` parameters let SCons infer target and source file names automatically. After appending the builder to the environment, you call `env.Protobuf('messages.proto')` and SCons produces `messages.pb.cc`.

The critical detail: use `env.Append(BUILDERS={...})` to add your builder. If you set `BUILDERS` directly in the `Environment()` constructor, like `Environment(BUILDERS={'Protobuf': protobuf})`, you overwrite the entire builder dictionary and lose all the default builders (Program, Library, Object, and so on).

### Builder with a Python Function

```py
def generate_version_header(target, source, env):
    version = env.get('APP_VERSION', '0.0.0')
    with open(str(target[0]), 'w') as f:
        f.write('#ifndef VERSION_H\n')
        f.write('#define VERSION_H\n')
        f.write('#define VERSION "%s"\n' % version)
        f.write('#endif\n')
    return 0

version_builder = Builder(action=generate_version_header,
                           suffix='.h',
                           src_suffix='.ver')
env.Append(BUILDERS={'VersionHeader': version_builder})
env.VersionHeader('version.h', 'version.ver',
                  APP_VERSION='2.1.0')
```

The Python function receives three arguments: `target` (a list of target Node objects), `source` (a list of source Node objects), and `env` (the construction environment). Node objects must be converted to strings with `str()` to get the file path. The function must return 0 for success or a non-zero value for failure.

Using a Python function instead of a shell command is useful when the build step involves logic that is awkward to express in shell (like reading a file, parsing JSON, or generating code with complex structure).

### The Command Builder for One-Off Rules

For build rules that are used only once, the `Command` builder avoids the overhead of defining a named builder.

```py
env.Command('config.h', 'config.h.in',
            "sed 's/@VERSION@/1.0.0/g' < \(SOURCE > \)TARGET")
```

This runs `sed` to substitute a version placeholder in `config.h.in` and writes the result to `config.h`. The `Command` builder is the SCons equivalent of a Make rule with a custom recipe. It takes the target, source, and action as arguments. The action can be a shell command string, a Python function, or a list of either.

---

## Aliases, Default Targets, and Install Rules

`env.Alias()` creates named targets you can invoke from the command line. `Default()` specifies what gets built when you run `scons` with no arguments.

```py
app = env.Program('myapp', sources)
tests = env.Program('test_runner', test_sources)

Default(app)
env.Alias('test', tests)
env.Alias('all', [app, tests])
```

Running `scons` builds only `myapp` because it's the default target. Running `scons test` builds the test executable. Running `scons all` builds everything. Without the `Default` call, SCons builds everything in the current directory and below, which includes both the application and the tests.

Install targets copy built files to a destination directory.

```py
env.Install('/usr/local/bin', app)
env.Install('/usr/local/lib', shared_lib)
env.InstallAs('/usr/local/bin/my-application', app)

env.Alias('install', '/usr/local/bin')
env.Alias('install', '/usr/local/lib')
```

`env.Install()` copies the specified file to the destination directory. `env.InstallAs()` copies it with a different name. Install targets aren't built by default because they write outside the project tree. You must invoke them explicitly with `scons install` (which works because the Alias connects the name "install" to the install directories).

You can combine Alias with a command action to create a "run" target.

```py
env.Alias('run', app, './build/release/src/myapp')
```

Running `scons run` builds the application (if needed) and then executes it. The third argument to `Alias` is an action that runs after the target is built.

---

## Platform-Specific Configuration

Because <VPIcon icon="fa-brands fa-python"/>`SConstruct` files are Python, platform-specific configuration uses standard Python constructs.

```py title="SConstruct"
import sys
import os

env = Environment(
    CPPPATH=['#include'],
    CCFLAGS=['-Wall'],
)

if sys.platform == 'win32':
    env.Append(LIBS=['ws2_32', 'advapi32'])
    env.Append(CPPDEFINES=['_WIN32', 'NOMINMAX'])
elif sys.platform == 'darwin':
    env.Append(FRAMEWORKS=['CoreFoundation', 'Security'])
    env.Append(CCFLAGS=['-mmacosx-version-min=10.15'])
elif sys.platform.startswith('linux'):
    env.Append(LIBS=['pthread', 'dl', 'rt'])
    env.Append(CPPDEFINES=['_GNU_SOURCE'])
```

`sys.platform` returns `'win32'` on Windows, `'darwin'` on macOS, and `'linux'` on Linux. The `FRAMEWORKS` variable is macOS-specific and translates to `-framework CoreFoundation -framework Security` on the linker command line. On Linux, `-lrt` links the POSIX realtime library (for `clock_gettime` on older glibc versions), and `-ldl` links the dynamic loading library (for `dlopen`).

For more granular detection, use `platform.machine()` to check the CPU architecture.

```py
import platform

if platform.machine() == 'aarch64':
    env.Append(CCFLAGS=['-march=armv8-a'])
elif platform.machine() == 'x86_64':
    env.Append(CCFLAGS=['-march=x86-64-v2'])
```

You can also use `env['PLATFORM']` which SCons sets to `'posix'`, `'win32'`, or `'darwin'`.

For integrating with system libraries that provide `pkg-config` metadata, use `ParseConfig`.

```py
env.ParseConfig('pkg-config --cflags --libs libpng')
env.ParseConfig('pkg-config --cflags --libs zlib')
```

`ParseConfig` runs the specified command, captures its output, and parses the flags into the appropriate construction variables. `-I` flags go into `CPPPATH`, `-L` flags go into `LIBPATH`, `-l` flags go into `LIBS`, and remaining flags go into `CCFLAGS`. This is the SCons equivalent of `$(pkg-config --cflags --libs libpng)` in a Makefile.

---

## Customizing Build Output

By default, SCons prints the full compiler command line for every file it processes. On projects with long include paths and many flags, this produces walls of text that obscure the build progress. You can customize the output with `COMSTR` variables:

```py
env = Environment()

env['CCCOMSTR'] = '  CC    $TARGET'
env['CXXCOMSTR'] = '  CXX   $TARGET'
env['LINKCOMSTR'] = '  LINK  $TARGET'
env['ARCOMSTR'] = '  AR    $TARGET'
env['SHCCCOMSTR'] = '  CC    $TARGET (shared)'
env['SHCXXCOMSTR'] = '  CXX   $TARGET (shared)'
env['SHLINKCOMSTR'] = '  LINK  $TARGET (shared)'
env['RANLIBCOMSTR'] = '  INDEX $TARGET'
env['INSTALLSTR'] = '  INST  $TARGET'
```

With these settings, the build output looks clean and scannable. Each line shows the action type and the target file. The `$TARGET` variable in the string is expanded by SCons at runtime.

To support both quiet and verbose modes, check a command-line argument.

```py
if ARGUMENTS.get('verbose', '0') != '1':
    env['CCCOMSTR'] = '  CC    $TARGET'
    env['CXXCOMSTR'] = '  CXX   $TARGET'
    env['LINKCOMSTR'] = '  LINK  $TARGET'
    env['ARCOMSTR'] = '  AR    $TARGET'
```

Running `scons` shows the short output. Running `scons verbose=1` shows the full command lines. This pattern is common in SCons projects and mimics the `V=1` convention used by the Linux kernel's build system.

---

## How to Debug SCons Build Files

When a build doesn't do what you expect, SCons provides several debugging tools.

### Print Variables

Because <VPIcon icon="fa-brands fa-python"/>`SConstruct` files are Python, you can print anything.

```py
env = Environment(CCFLAGS=['-Wall', '-O2'])
print('CCFLAGS:', env['CCFLAGS'])
print('CC:', env['CC'])
print('CPPPATH:', env.get('CPPPATH', []))
```

This prints the current values of construction variables. Use this to verify that your flags are set correctly, especially after `Append`, `Prepend`, or `Clone` calls.

### The `--debug` flag

SCons has a `--debug` option with several modes.

```sh
scons --debug=explain
```

This tells SCons to print the reason for every rebuild. Instead of silently recompiling a file, it prints something like `scons: rebuilding 'build/release/lib/mathutils.o' because 'lib/mathutils.h' changed`. This is invaluable for understanding unexpected rebuilds.

```sh
scons --debug=tree
```

This prints the full dependency tree for every target, showing which files depend on which other files. The output can be large, so combine it with a specific target: `scons --debug=tree build/release/src/myapp`.

```sh
scons --debug=includes
```

This prints the include files found by the C/C++ scanner for each source file. Useful for diagnosing "header not found" errors or unexpected include paths.

```sh
scons --debug=presub
```

This prints the un-substituted command line (with `\(CC`, `\)CCFLAGS`, and so on still as variable names) before SCons expands them. Helps you understand which variables contribute to the final command.

### The `--dry-run` flag

`scons -n` shows what SCons would do without actually doing it. Every command that would be executed is printed, but no files are created or modified. This is a safe way to verify your build logic before running it.

### The `Dump` method

`env.Dump()` returns a formatted string of every construction variable and its value. It produces a lot of output, so pipe it to a file or search for specific variables.

```py
print(env.Dump())
```

This is the nuclear option for debugging: it shows everything SCons knows about the environment.

---

## The SCons Command-Line Reference

SCons accepts many command-line options. The ones you will use most frequently are listed here.

- `scons` builds the default targets (or everything if no `Default()` is set).
- `scons -j N` runs up to N build commands in parallel. Set N to the number of CPU cores on your machine for fastest builds. You can also set this in the <VPIcon icon="fa-brands fa-python"/>`SConstruct` with `SetOption('num_jobs', 4)`.
- `scons -c` cleans (removes) all built targets. This is the equivalent of `make clean` but doesn't require you to write a clean rule. SCons knows exactly which files it created and removes only those.
- `scons -n` is a dry run. Shows what would be built without building anything.
- `scons -Q` suppresses SCons' status messages ("Reading <VPIcon icon="fa-brands fa-python"/>`SConscript` files", "Building targets", etc.) and shows only the build commands. Useful for piping build output to other tools.
- `scons -s` is silent mode. Suppresses both status messages and build commands. Only errors are printed.
- `scons --debug=explain` explains why each target is being rebuilt.
- `scons --debug=tree` prints the dependency tree.
- `scons --config=force` forces re-running of all Configure checks, ignoring cached results.
- `scons target_name` builds only the specified target and its dependencies. You can specify multiple targets: `scons myapp test_runner`.
- `scons key=value` passes a key-value pair accessible through `ARGUMENTS.get('key')` in the <VPIcon icon="fa-brands fa-python"/>`SConstruct`.
- `scons --help` shows SCons' built-in options plus any options added with `AddOption` in the <VPIcon icon="fa-brands fa-python"/>`SConstruct`.

---

## Common Mistakes and How to Avoid Them

**Overwriting default builders:** Passing `BUILDERS` as a keyword argument to `Environment()` replaces the entire builder dictionary. You lose `Program`, `Library`, `Object`, and everything else. Always add custom builders with `env.Append(BUILDERS={'Name': builder})`.

**Assuming shell environment variables are available:** SCons deliberately doesn't import your shell environment. If your build fails because a tool isn't found, you probably need to pass `PATH` through explicitly.

The safest approach for finding the compiler is `env['ENV']['PATH'] = os.environ['PATH']`. Importing the entire environment with `ENV=os.environ.copy()` works but reduces build reproducibility because your build now depends on every variable in your shell.

**Modifying a shared environment in a <VPIcon icon="fa-brands fa-python"/>`SConscript` file:** If the <VPIcon icon="fa-brands fa-python"/>`SConstruct` exports one environment and multiple <VPIcon icon="fa-brands fa-python"/>`SConscript` files import it, any `Append` or modification in one <VPIcon icon="fa-brands fa-python"/>`SConscript` affects all of them because they all hold a reference to the same Python object. Clone the environment first with `local_env = env.Clone()` and modify the clone. The clone is a deep copy that can be modified independently.

**Forgetting Return() in SConscript:** If your <VPIcon icon="fa-brands fa-python"/>`SConstruct` calls `lib = SConscript('lib/SConscript')` and the <VPIcon icon="fa-brands fa-python"/>`SConscript` file has no `Return()` statement, `lib` is `None`. You'll get a confusing error later when you try to link against it, typically something like `TypeError: expected a string or list of strings` when `None` is passed as a library.

**Confusing variant_dir with source paths:** When you use `variant_dir`, the source file paths in your <VPIcon icon="fa-brands fa-python"/>`SConscript` are still relative to the SConscript's original location, not the variant directory.

SCons handles the mapping internally. Don't use paths into the build directory in your <VPIcon icon="fa-brands fa-python"/>`SConscript` files. Writing `Object('build/release/lib/mathutils.cpp')` is wrong, while writing `Object('mathutils.cpp')` inside `lib/SConscript` is correct.

**Forgetting to add .sconsign.dblite to .gitignore:** SCons stores its dependency database in this file. It should never be committed to version control because it contains absolute paths and machine-specific data.

Add `.sconsign.dblite`, the `build/` directory, and the `.sconf_temp/` directory (created by Configure checks) to your `.gitignore`.

```plaintext
# .gitignore
.sconsign.dblite
.sconf_temp/
build/
```

This `.gitignore` file has three entries.

- `.sconsign.dblite` is the dependency database.
- `.sconf_temp/` is the directory where Configure check test programs are compiled.
- `build/` is the variant directory containing all compiled artifacts.

**Expecting** `touch` **to trigger a rebuild:** SCons uses content hashing by default. Running `touch` on a source file changes its modification time but not its content, so the hash is identical and SCons doesn't rebuild. If you need Make-like timestamp behavior, call `Decider('timestamp-newer')` in your <VPIcon icon="fa-brands fa-python"/>`SConstruct`.

**Using string file names instead of Nodes:** Passing raw strings with platform-specific extensions makes your build files non-portable.

```py
# Fragile: hardcodes the .o extension
Program('myapp', ['main.o', 'utils.o'])
```

```py
# Portable: let SCons handle extensions
main_obj = env.Object('main.cpp')
utils_obj = env.Object('utils.cpp')
env.Program('myapp', [main_obj, utils_obj])
```

The first version breaks on Windows where object files use the `.obj` extension. The second version works everywhere because the Node objects carry platform-specific metadata.

**Getting the target/source argument order wrong:** Builder methods take the target first, then the source. `Program('output_name', 'source.c')` is correct. `Program('source.c', 'output_name')` compiles `output_name` (which doesn't exist) and tries to create `source.c` as the executable. The convention mimics assignment: target = source.

**Expecting Install targets to build by default:** `env.Install('/usr/local/bin', app)` creates an install target, but SCons does not build it unless you explicitly request it. Targets outside the project directory tree are never default targets. Use `env.Alias('install', '/usr/local/bin')` and run `scons install` to trigger the installation.

**Using Glob without understanding it returns Nodes:** `Glob('*.cpp')` returns a list of Node objects, not strings. You can concatenate them with other Node lists using `+`, pass them to builders, and use them in most places that accept source lists. You can't call string methods on them directly. Use `[str(n) for n in Glob('*.cpp')]` if you need strings, but prefer working with Nodes whenever possible.

---

## Summary

SCons replaces Make with a build system where every configuration file is a Python script.

The `Environment` object holds your compiler, flags, and paths. Builders like `Program`, `StaticLibrary`, and `SharedLibrary` know how to produce specific output types. `SConscript` files organize multi-directory projects, and `variant_dir` keeps build artifacts separate from source code. Content hashing eliminates unnecessary rebuilds, and automatic header scanning removes the need to manually specify implicit dependencies.

Cross-compilation to targets like QuRT requires nothing more than pointing the environment's tool variables (`CC`, `CXX`, `LINK`) at the cross-compiler and adding the target's include paths and libraries. The same <VPIcon icon="fa-brands fa-python"/>`SConscript` files work for both native and cross-compiled builds because they operate on whatever environment they receive through `Import`.

QuRT-specific features (threading, mutexes, hardware timers) are accessed through standard C function calls, and the build system's only responsibility is making sure the right compiler, headers, and libraries are in place.

The Configure subsystem replaces autoconf for probing the build environment. Custom builders extend SCons to handle file types it does not know about (protocol buffers, shaders, firmware images).

Aliases and install rules give users a clean command-line interface (`scons`, `scons test`, `scons install`). And the `--debug=explain` flag tells you exactly why any file is being rebuilt, eliminating the guesswork that plagues Make-based builds.

SCons isn't the fastest build tool for very large codebases, and its ecosystem is smaller than CMake's. But for projects where build file clarity, correctness, cross-compilation flexibility, and the ability to express complex logic in a real programming language matter more than raw speed, it's a strong choice.

The Python foundation means you already know the language, and the content-based rebuild strategy means you can trust that what gets built actually needs to be built.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Use SCons to Build Software Projects [Full Handbook]",
  "desc": "If you've ever wrestled with Makefile syntax, fought tab-versus-spaces bugs, or tried to make a build system work across Linux, macOS, and Windows, SCons is worth your attention. It replaces Make, aut",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-scons-to-build-software-projects-full-handbook/",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
