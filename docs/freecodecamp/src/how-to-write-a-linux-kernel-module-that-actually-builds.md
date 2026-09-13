---
lang: en-US
title: "How to Write a Linux Kernel Module That Actually Builds"
description: "Article(s) > How to Write a Linux Kernel Module That Actually Builds"
icon: iconfont icon-c
category:
  - C
  - DevOps
  - Linux
  - Debian
  - Ubuntu
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - c
  - clang
  - devops
  - linux
  - debian
  - ubuntu
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Write a Linux Kernel Module That Actually Builds"
    - property: og:description
      content: "How to Write a Linux Kernel Module That Actually Builds"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-write-a-linux-kernel-module-that-actually-builds.html
prev: /programming/c/articles/README.md
date: 2026-09-16
isOriginal: false
author:
  - name: Chris Roy
    url: https://freecodecamp.org/news/author/thechrisin/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/f8a7aabd-8494-42d5-86a1-e1eb51c2d0a7.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "C > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/c/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Linux - Debian > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/linux-debian/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Write a Linux Kernel Module That Actually Builds"
  desc="A Linux kernel module is a small piece of code that can be loaded into the running kernel without rebuilding the entire kernel. That sounds simple enough, but even a minimal module produces a surprisi"
  url="https://freecodecamp.org/news/how-to-write-a-linux-kernel-module-that-actually-builds"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/f8a7aabd-8494-42d5-86a1-e1eb51c2d0a7.png"/>

A Linux `kernel module` is a small piece of code that can be loaded into the running kernel without rebuilding the entire kernel.

That sounds simple enough, but even a minimal module produces a surprising amount of machinery around it: object files, metadata, exported and unresolved symbols, and a final `.ko` file that is quite different from an ordinary executable.

Here's a complete, working Linux kernel module. It's just twenty-two lines, seven of which are includes and metadata:

```c
#include <linux/init.h>
#include <linux/module.h>
#include <linux/kernel.h>

MODULE_LICENSE("GPL");
MODULE_AUTHOR("Chris Roy");
MODULE_DESCRIPTION("A minimal loadable kernel module");
MODULE_VERSION("0.1");

static int __init hello_init(void)
{
    pr_info("hello: loaded, module at %pS\n", hello_init);
    return 0;
}

static void __exit hello_exit(void)
{
    pr_info("hello: unloaded\n");
}

module_init(hello_init);
module_exit(hello_exit);
```

Compiled on the machine I'm writing this on, that produces a file of about 106,000 bytes. Strip the debug information out and the same module is 4,864 bytes. Ninety-five percent of what the build gave you isn't code.

Your total will differ from mine, and not by a predictable amount. Part of it is where you built: the debug information records the directory you compiled in, so a deeply nested path costs a few hundred bytes that a short one doesn't. Your compiler version and kernel configuration move it further. The proportion is what holds. The exact byte count is only what this machine produced.

That gap is a good place to start, because most kernel module tutorials show you the listing above, tell you to run `make`, and stop.

This one follows what the build actually produced, what your module already depends on before you wrote anything useful, and why the tutorial you found from 2014 no longer compiles.

---

## What You Need

To follow along here, you'll need a Linux machine you're willing to load code into, the headers for the kernel you're running, and a compiler.

On Debian or Ubuntu:

```sh
sudo apt install build-essential linux-headers-$(uname -r)
```

On Fedora, the equivalent is `kernel-devel` and `kernel-headers`, and on Arch it's the `linux-headers` package matching your kernel.

Check that the headers landed where the build expects them:

```sh
ls -d /lib/modules/$(uname -r)/build
```

That path is a symlink into the headers package, and its absence is the single most common reason a module build fails with an error that mentions nothing about headers.

Two things will stop you from loading a module even after it builds. Secure Boot rejects unsigned modules, and kernel lockdown blocks loading in confidentiality mode. Check both:

```sh
mokutil --sb-state
cat /sys/kernel/security/lockdown
```

On the machine here, Secure Boot is disabled and lockdown reports `[none] integrity confidentiality`, with the brackets marking the active mode. If yours shows Secure Boot enabled, you'll need to sign the module or disable Secure Boot in firmware before it will load.

I'm on Ubuntu 22.04 with kernel 5.15.0-190-generic and gcc 11.4. Your versions will differ, and the article says where that matters.

---

## The Smallest Module That Works

Save the code from the beginning of this article as <VPIcon icon="iconfont icon-c"/>`hello.c`. Here it is again for reference:

```c title="hello.c"
#include <linux/init.h>
#include <linux/module.h>
#include <linux/kernel.h>

MODULE_LICENSE("GPL");
MODULE_AUTHOR("Chris Roy");
MODULE_DESCRIPTION("A minimal loadable kernel module");
MODULE_VERSION("0.1");

static int __init hello_init(void)
{
    pr_info("hello: loaded, module at %pS\n", hello_init);
    return 0;
}

static void __exit hello_exit(void)
{
    pr_info("hello: unloaded\n");
}

module_init(hello_init);
module_exit(hello_exit);
```

Four things in it are doing real work.

`module_init` and `module_exit` register the functions the kernel calls when your module is loaded and unloaded. They aren't `main`. A module has no single entry point that runs and returns. It has hooks that fire on two specific events, and it does nothing in between unless something else calls into it.

`__init` and `__exit` are section markers. `__init` tells the kernel this code runs once and its memory can be freed afterward, which is why you'll see "Freeing unused kernel memory" in your boot log. `__exit` tells the build that this function is only needed if the module can be unloaded at all.

`MODULE_LICENSE("GPL")` isn't paperwork. The kernel checks it at load time, and a module declaring a non-GPL license is denied access to symbols marked `EXPORT_SYMBOL_GPL`, which is most of the interesting ones. Omit the macro entirely and the kernel taints itself and logs a complaint.

`pr_info` is the modern spelling of `printk(KERN_INFO ...)`. It writes to the kernel ring buffer, not to your terminal, which trips up nearly everyone the first time.

The `MODULE_AUTHOR`, `MODULE_DESCRIPTION`, and `MODULE_VERSION` macros are metadata rather than behavior, and they end up in the file for `modinfo` to read. Leave them out and nothing breaks, but recent kernels warn at build time about a missing `MODULE_DESCRIPTION`, which is reason enough to write all three from the start.

---

## The Makefile is Stranger Than it Looks

```makefile title="Makefile"
obj-m += hello.o

all:
	make -C /lib/modules/$(shell uname -r)/build M=$(PWD) modules

clean:
	make -C /lib/modules/$(shell uname -r)/build M=$(PWD) clean
```

This looks like a `Makefile`, and mostly isn't one. `obj-m += hello.o` isn't a Make variable you invented. It's a declaration read by kbuild, the kernel's own build system.

The `make -C` line changes directory into the kernel headers and runs the kernel's build system there, passing `M=$(PWD)` to say "the module source is over here." Your `Makefile` is a thin wrapper that hands the job to a build system you didn't write and can't easily replace.

That indirection is why module builds fail in ways that seem unrelated to your code. You're not compiling against the kernel headers the way you compile against libc headers. You're running the kernel's build, on your file, with its flags and its rules.

---

## What the Build Actually Did

Run `make` and read the output rather than skipping it:

```plaintext
make -C /lib/modules/5.15.0-190-generic/build M=/home/chris/lkm modules
make[1]: Entering directory '/usr/src/linux-headers-5.15.0-190-generic'
  CC [M]  /home/chris/lkm/hello.o
  MODPOST /home/chris/lkm/Module.symvers
  CC [M]  /home/chris/lkm/hello.mod.o
  LD [M]  /home/chris/lkm/hello.ko
  BTF [M] /home/chris/lkm/hello.ko
Skipping BTF generation for /home/chris/lkm/hello.ko due to unavailability of vmlinux
```

![Diagram of the kernel module build pipeline: hello.c compiles to hello.o, MODPOST checks undefined symbols against the kernel export table and generates hello.mod.c, that compiles to hello.mod.o, the linker combines both into hello.ko at roughly 106 KB of which only 4,864 bytes survive stripping, and a final BTF step is skipped because Ubuntu ships no vmlinux](https://cdn.hashnode.com/uploads/covers/6a783a81a29db580b40f1bc8/9e38d600-4a16-4f2d-8f45-8f4897f5f44c.png)

Five steps, and only the first is the compile you expected.

`CC [M] hello.o` compiles your source. Ordinary.

`MODPOST` is the step worth knowing about. It scans your object file for symbols you referenced but didn't define, checks each one against the kernel's table of exported symbols, and fails the build if you used something the kernel doesn't offer you. It also generates <VPIcon icon="iconfont icon-c"/>`hello.mod.c`, a small file of glue containing your module's metadata.

`CC [M] hello.mod.o` compiles that generated glue, and `LD [M]` links it together with your object into the final `.ko`.

`BTF [M]` would attach type information used by tracing tools. Here it was skipped, because generating BTF needs the uncompressed `vmlinux` image and Ubuntu doesn't ship it by default. The build warns and continues, which is correct: BTF is useful, not required.

---

## What's Inside a .ko File

A `.ko` is an ordinary ELF object with kernel-specific sections bolted on. Look at its metadata:

```sh
modinfo ./hello.ko
#
# version:        0.1
# description:    A minimal loadable kernel module
# author:         Chris Roy
# license:        GPL
# srcversion:     39D86510C9FF65D797EAF90
# depends:        
# retpoline:      Y
# name:           hello
# vermagic:       5.15.0-190-generic SMP mod_unload modversions
```

All of that lives in one ELF section, stored as null-separated strings. You can read it straight out of the file:

```sh
objcopy -O binary --only-section=.modinfo hello.ko /dev/stdout | tr '\0' '\n'
```

Which brings us back to the number from the opening. The module is about 106,000 bytes on disk:

```sh
ls -l hello.ko
cp hello.ko /tmp/ && strip --strip-debug /tmp/hello.ko && ls -l /tmp/hello.ko
#
# 105984  hello.ko
#   4864  /tmp/hello.ko
```

The actual module is under five kilobytes. Everything else is DWARF debug information the build keeps so that tools like `crash` and `gdb` can make sense of your code if it panics. When you load the module, the kernel doesn't load the debug sections, so the memory cost is the small number rather than the large one.

---

## Your Hello World Already Depends on Three Things

This is the part I'd have wanted someone to show me first. Ask the object what it needs from the kernel:

```sh
nm -u hello.ko
#
# U __fentry__
# U _printk
# U __x86_return_thunk
```

`U` means undefined: symbols your module references and the kernel must supply at load time.

`_printk` you can account for, since `pr_info` expands to it.

`__fentry__` is a call the compiler placed at the top of every one of your functions, because the kernel is built with function tracing support. Every function you write in a module gets that hook whether you asked for it or not, and it's what lets `ftrace` instrument your code later without recompiling anything.

`__x86_return_thunk` is a Spectre mitigation. Your compiler replaced ordinary return instructions with a call to a thunk that avoids the speculative execution path the vulnerability relies on. It appears in a module that prints one line, because the mitigation applies to all kernel code on this machine, module or not.

Two of the three symbols in your hello world are infrastructure the machine imposed on you. That's a fair picture of what writing kernel code is like.

MODPOST verified all three exist before the link succeeded. Had you called a function the kernel doesn't export, the build would have failed there with an "undefined symbol" error rather than producing a module that fails at load.

---

## `vermagic`, and Why Your Module Refuses to Load

Look again at that line from `modinfo`:

```plaintext
vermagic: 5.15.0-190-generic SMP mod_unload modversions
```

The kernel compares that string against its own before loading anything, and refuses on a mismatch. It covers the release, whether the kernel is SMP, whether module unloading is compiled in, and whether symbol versioning is on.

This is why a module built on one machine usually won't load on another, and why upgrading your kernel means rebuilding your modules.

There's no ABI stability guarantee inside the Linux kernel. Internal structures change between releases, and a module compiled against one layout that ran against another would corrupt memory rather than fail cleanly. Refusing to load is the kernel being careful.

It's also why DKMS exists. If you have VirtualBox, ZFS, or an NVIDIA driver installed, you already have a module being rebuilt this way. On the machine here:

```sh
modinfo vboxdrv | head -3
#
# filename:       /lib/modules/5.15.0-190-generic/updates/dkms/vboxdrv.ko
# version:        6.1.50_Ubuntu r161033 (0x00320000)
# license:        GPL
```

Note the `updates/dkms/` in that path. DKMS keeps the source and rebuilds the module each time you install a new kernel, which is the maintenance cost the vermagic check makes unavoidable.

---

## Passing Parameters at Load Time

A module that always does the same thing is rarely what you want. `module_param` exposes a variable so its value can be set at load time. Save this as <VPIcon icon="iconfont icon-c"/>`param.c` alongside <VPIcon icon="iconfont icon-c"/>`hello.c`:

```c title="hello.c"
#include <linux/init.h>
#include <linux/module.h>

MODULE_LICENSE("GPL");
MODULE_DESCRIPTION("A module that takes parameters");

static char *who = "world";
static int times = 1;

module_param(who, charp, 0444);
MODULE_PARM_DESC(who, "who to greet");
module_param(times, int, 0644);
MODULE_PARM_DESC(times, "how many times to greet");

static int __init param_init(void)
{
    int i;

    for (i = 0; i < times; i++)
        pr_info("param: hello, %s\n", who);
    return 0;
}

static void __exit param_exit(void)
{
    pr_info("param: unloaded\n");
}

module_init(param_init);
module_exit(param_exit);
```

Add it to the `Makefile`, which takes a list:

```makefile
obj-m += hello.o param.o
```

The three arguments are the variable, its type, and the permissions on the file that will represent it under `/sys/module/<name>/parameters/`. A mode of `0444` makes it readable and fixed once loaded. `0644` lets root write to that file and change the value while the module is running, which is useful. It's also how you introduce a race if the module reads the variable without expecting it to change.

`charp` is a char pointer, and the other common types are `int`, `bool`, `long` and `charp` arrays via `module_param_array`. Pass a type that doesn't match the variable and the build fails rather than misbehaving later.

`MODULE_PARM_DESC` puts the description into the module metadata, where `modinfo` finds it:

```plaintext
name:           param
parm:           who:who to greet (charp)
parm:           times:how many times to greet (int)
```

Set them at load time as `name=value` pairs:

```sh
sudo insmod ./param.ko who=kernel times=3
```

Anyone can read what parameters a module accepts before loading it, which is the main reason to bother with `MODULE_PARM_DESC` at all.

---

## Loading it, and Where the Output Goes

```sh
sudo insmod ./hello.ko
sudo dmesg | tail -2
lsmod | grep hello
sudo rmmod hello
```

The `pr_info` output goes to the kernel ring buffer, so it appears in `dmesg` rather than your terminal. If `dmesg` refuses without root, that's `kernel.dmesg_restrict`, and `sudo journalctl -k | tail` reads the same messages through the journal.

The `%pS` in the format string prints a kernel pointer as a symbol name and offset instead of a raw address, which is how you get something readable out of a log line rather than a hexadecimal number.

`lsmod` reads `/proc/modules` and shows three columns: the module name, its size in memory, and a use count with the names of anything depending on it. A module with a non-zero use count can't be unloaded, which is the most common reason `rmmod` refuses.

One caution before you load anything. A bug in userspace crashes your program. But a bug here can take the machine down or corrupt a filesystem. Do this in a virtual machine the first several times. The cost of a snapshot is far lower than the cost of a corrupted disk.

---

## Four Build Errors and What They Mean

These four account for most of the time people lose, and each says something specific once you know what to read.

`No rule to make target 'modules'. Stop.` The kernel headers are missing or the symlink at <VPIcon icon="fas fa-folder-open"/>`/lib/modules/$(uname -r)/build` points nowhere. Install the headers package matching the exact kernel you're running, which is often not the newest one installed if you haven't rebooted since an update.

`ERROR: modpost: "some_function" [hello.ko] undefined!` You referenced a symbol the kernel doesn't export. Here's what that looks like from a real build:

```plaintext
ERROR: modpost: "this_symbol_does_not_exist" [bad.ko] undefined!
make[2]: *** [scripts/Makefile.modpost:133: Module.symvers] Error 1
```

Retrying won't help. Either the function is internal to the kernel and never exported, or it's exported with `EXPORT_SYMBOL_GPL` and your module declares a non-GPL license. Check with `grep the_symbol /proc/kallsyms`, where a capital `T` in the second column means it's a global text symbol.

`insmod: ERROR: could not insert module: Invalid module format`: The build succeeded but vermagic doesn't match the running kernel. Compare `modinfo ./hello.ko | grep vermagic` against `uname -r`. Rebuilding against the correct headers fixes it.

`insmod: ERROR: could not insert module: Operation not permitted`: Usually Secure Boot rejecting an unsigned module, or lockdown in confidentiality mode. Check `mokutil --sb-state` and `cat /sys/kernel/security/lockdown` before assuming your code is at fault.

One more thing, which is easier to learn now than to debug later. Loading any out-of-tree module sets a taint flag on the kernel, which is recorded and reported in any subsequent oops or panic:

```sh
cat /proc/sys/kernel/tainted
```

The value is a bitmask. It reads 4096 on the machine here, which is bit 12, `TAINT_OOT_MODULE`, meaning an out-of-tree module has been loaded at some point.

Bit 13 is the neighboring one people confuse it with, `TAINT_UNSIGNED_MODULE`, which is what Secure Boot cares about.

The full list is in `include/linux/panic.h` in the kernel source. Kernel developers will ask you to reproduce a bug on an untainted kernel before they look at it, and this is the file that tells them whether you did.

---

## Why the Tutorial You Found Doesn't Compile

Most module tutorials on the web predate several changes, and these are the ones that bite.

`printk(KERN_INFO "...")` still works, but `pr_info` is the current spelling and carries the log level for you.

`init_module` and `cleanup_module` as bare function names were the old convention. Use `module_init` and `module_exit` with your own names instead, which lets a file define both without collisions.

`MODULE_LICENSE` was once optional in practice. It's now load-bearing, since it gates access to GPL-only exported symbols.

The `M=` argument used to be spelled `SUBDIRS=`. That spelling was removed, and a tutorial using it fails with an error that doesn't mention `SUBDIRS` anywhere.

Header paths moved. Anything referring to <VPIcon icon="fas fa-folder-open"/>`/usr/src/linux` predates the split into per-kernel headers packages and is old enough that the rest of it needs checking too. A smaller sign: `<linux/module.h>` has included `<linux/moduleparam.h>` for years, so a tutorial that carefully includes both is copying from something old, even though including both is harmless.

If a tutorial builds without warnings on your kernel, it's current enough. If it doesn't, the kernel version it targeted is usually printed in the first error.

---

## Conclusion

You can now build a kernel module, read what the build produced, and explain every symbol it depends on.

More usefully, you know why it fails in the specific ways it does. A missing <VPIcon icon="fas fa-folder-open"/>`/lib/modules/$(uname -r)/build` is a headers problem. A vermagic mismatch is a rebuild. An undefined symbol at MODPOST means the kernel doesn't export what you asked for, and no amount of retrying will change that.

There are a few directions to go from here. Register a `/proc` entry with `proc_create` and read from it, which is the smallest useful thing a module can do.

Read the kernel's own `Module.symvers` under <VPIcon icon="fas fa-folder-open"/>`/usr/src/linux-headers-$(uname -r)/` to see the table MODPOST checked against, which is 26,420 exported symbols on this machine and marks each one `EXPORT_SYMBOL` or `EXPORT_SYMBOL_GPL`.

Or trace your own module's functions, which works because of the `__fentry__` hook that was there from the first build. There's no `ftrace` command to run. It's an interface under `/sys/kernel/tracing`, so you drive it by writing to files:

```sh
sudo sh -c 'echo hello_init > /sys/kernel/tracing/set_ftrace_filter'
sudo sh -c 'echo function > /sys/kernel/tracing/current_tracer'
sudo cat /sys/kernel/tracing/trace
```

On older systems, that path is `/sys/kernel/debug/tracing` instead. If you would rather not write to files by hand, `trace-cmd` wraps the same interface.

---

## Epilogue

Everything above assumes you're allowed to do it, and that assumption is the part I find interesting. A loaded module runs with the same authority as the kernel itself. It can read any memory, patch any function, and ignore any policy the system thought it was enforcing, because by the time it runs there's nothing left above it to say no.

That makes module loading the one operation a permission model can't contain, which is why the kernel guards it with signatures and lockdown rather than with permissions.

I ran into that floor while working on a capability-backed desktop OS, one where a program's manifest is the whole of what it may do, and the Debian ecosystem still has to work underneath it. Modules are where that model stops being expressible, so working out exactly what the kernel checks before accepting one stopped being a detail and became a design constraint.

::: info About Author

I write about systems and their mysteries at [<VPIcon icon="fas fa-globe"/>thechris.in](https://thechris.in).

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Write a Linux Kernel Module That Actually Builds",
  "desc": "A Linux kernel module is a small piece of code that can be loaded into the running kernel without rebuilding the entire kernel. That sounds simple enough, but even a minimal module produces a surprisi",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-write-a-linux-kernel-module-that-actually-builds.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
