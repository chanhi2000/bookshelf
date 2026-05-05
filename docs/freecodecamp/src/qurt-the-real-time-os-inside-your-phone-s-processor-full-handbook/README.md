---
lang: en-US
title: "QuRT: The Real-Time OS Inside Your Phone's Processor [Full Handbook]"
description: "Article(s) > QuRT: The Real-Time OS Inside Your Phone's Processor [Full Handbook]"
icon: iconfont icon-c
category:
  - C
  - Python
  - Hardware
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - c
  - clang
  - py
  - python
  - hw
  - hardware
head:
  - - meta:
    - property: og:title
      content: "Article(s) > QuRT: The Real-Time OS Inside Your Phone's Processor [Full Handbook]"
    - property: og:description
      content: "QuRT: The Real-Time OS Inside Your Phone's Processor [Full Handbook]"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/qurt-the-real-time-os-inside-your-phone-s-processor-full-handbook.html
prev: /programming/c/articles/README.md
date: 2026-05-07
isOriginal: false
author:
  - name: Nikheel Vishwas Savant
    url: https://freecodecamp.org/news/author/nsavant/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/e20376ee-713a-473e-946c-5c837eef0b12.png
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
  "title": "C > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/c/articles/README.md",
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
  name="QuRT: The Real-Time OS Inside Your Phone's Processor [Full Handbook]"
  desc="The Hexagon DSP in every Qualcomm-powered phone handles wake word detection, sensor processing, noise cancellation, and Bluetooth audio streaming – all while the main ARM CPU runs Android. The operati"
  url="https://freecodecamp.org/news/qurt-the-real-time-os-inside-your-phone-s-processor-full-handbook"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/e20376ee-713a-473e-946c-5c837eef0b12.png"/>

The Hexagon DSP in every Qualcomm-powered phone handles wake word detection, sensor processing, noise cancellation, and Bluetooth audio streaming – all while the main ARM CPU runs Android.

The operating system orchestrating that work on the DSP is QuRT (Qualcomm Real-Time Operating System), a POSIX-like, priority-based, preemptive RTOS purpose-built for Qualcomm's Hexagon Digital Signal Processor.

This article is a practical guide to Qualcomm's Real-Time Operating System. It covers QuRT from the ground up: architecture, thread creation, synchronization primitives, memory management, interrupt handling, timers, inter-processor communication through FastRPC, and a complete sensor fusion pipeline. Every concept includes working code and an explanation of what's happening under the hood.

---

## Table of Contents

- [Setting Up Your Development Environment](#heading-setting-up-your-development-environment)
- [The QuRT Programming Model](#heading-the-qurt-programming-model)
- [Creating Your First QuRT Thread](#heading-creating-your-first-qurt-thread)
- [How Thread Creation Works Internally](#heading-how-thread-creation-works-internally)
- [Working with Multiple Threads](#heading-working-with-multiple-threads)
- [Synchronization Primitives](#heading-synchronization-primitives)
- [Memory Management](#heading-memory-management)
- [Timers and Timing](#heading-timers-and-timing)
- [Interrupt Handling](#heading-interrupt-handling)
- [Pipes and Message Queues](#heading-pipes-and-message-queues)
- [QuRT and FastRPC](#heading-qurt-and-fastrpc)
- [Building a Sensor Fusion Pipeline](#heading-building-a-sensor-fusion-pipeline)
- [Debugging QuRT Applications](#heading-debugging-qurt-applications)
- [Common Pitfalls](#heading-common-pitfalls)
- [Performance Optimization](#heading-performance-optimization)
- [API Quick Reference](#heading-api-quick-reference)
- [Next Steps](#heading-next-steps)

---

## Why QuRT Matters

Consider what happens during a phone call. The device is simultaneously running noise cancellation on the microphone audio, executing a neural network for wake word detection, reading accelerometer data 400 times per second, and managing Bluetooth audio streaming.

None of this runs on the main ARM CPU. It all happens on Qualcomm's **Hexagon DSP**, and the operating system coordinating it is **QuRT**.

QuRT (Qualcomm Real-Time Operating System) is a POSIX-like, priority-based, preemptive RTOS that runs on Qualcomm's Hexagon Digital Signal Processor. Where Linux is a general-purpose operating system designed for flexibility, QuRT is a precision instrument designed for deterministic, microsecond-level scheduling.

### Where QuRT Fits in the System

![The two-processor architecture inside a Qualcomm SoC](https://cdn.hashnode.com/uploads/covers/68a51326db25241b7cb0c047/23b64c27-4715-4923-bf97-b55742a71032.png)

This diagram shows the two-processor architecture inside a Qualcomm SoC. The ARM CPU on the left runs Android or Linux and handles general application logic. The Hexagon DSP on the right runs QuRT and handles latency-sensitive workloads: audio processing, sensor fusion, ML inference, and compute offload.

The two processors communicate through a framework called **FastRPC**. You write code for the DSP side using the Hexagon SDK, and QuRT is the OS that executes your code on the Hexagon processor.

---

## Setting Up Your Development Environment

Before writing any QuRT code, you need the toolchain and either a simulator or physical hardware.

### Prerequisites

You will need the Hexagon SDK (version 3.5+ or 4.x), which is Qualcomm's official SDK and includes the Hexagon Tools compiler toolchain.

For running your code, you can use either a Qualcomm development board (such as the Robotics RB5 or an SM8250 HDK) or the SDK's built-in simulator. A Linux host machine running Ubuntu 18.04 or 20.04 works best for development.

### Installing the Hexagon SDK

```sh
# Download the Hexagon SDK from Qualcomm's developer portal
# https://developer.qualcomm.com/software/hexagon-dsp-sdk

# Extract and run the installer
chmod +x qualcomm_hexagon_sdk_4_x_x_x.bin
./qualcomm_hexagon_sdk_4_x_x_x.bin

# Set up environment variables
export HEXAGON_SDK_ROOT=~/Qualcomm/Hexagon_SDK/4.x.x.x
export HEXAGON_TOOLS_ROOT=~/Qualcomm/Hexagon_SDK/4.x.x.x/tools
source $HEXAGON_SDK_ROOT/setup_sdk_env.source
```

This installs the SDK to your home directory and sets up the environment variables that the build system and simulator need. The `setup_sdk_env.source` script configures your shell with paths to the compiler, simulator, and libraries.

### Verifying Your Setup

```sh
# Check the Hexagon compiler
hexagon-clang --version

# You should see something like:
# Qualcomm Hexagon Clang version 8.x.xx

# Run the QuRT simulator to make sure it works
$HEXAGON_SDK_ROOT/tools/HEXAGON_Tools/8.x.xx/Tools/bin/hexagon-sim \
--simulated_returnval --cosim_file \
$HEXAGON_SDK_ROOT/libs/common/qurt/computev66/sdksim_bin/osam.cfg \
-- $HEXAGON_SDK_ROOT/libs/common/qurt/computev66/sdksim_bin/bootimg.pbn
```

The first command confirms that the Hexagon Clang compiler is installed and accessible. The second command launches the QuRT simulator, which is analogous to an Android emulator: it lets you test QuRT programs without physical hardware. Timing won't match real hardware, but the simulator is valuable for validating correctness during development.

### Project Structure

The Hexagon SDK uses **SCons** as its underlying build system. Projects live inside the SDK tree and are configured through <VPIcon icon="fas fa-file-lines"/>`.min` files, which are declarative build descriptors that the SDK's SCons infrastructure parses.

A minimal project looks like this:

```sh
$HEXAGON_SDK_ROOT/examples/my_qurt_project/
├── src/
│   └── main.c              # Your QuRT application code
├── inc/
│   └── my_module.h         # Header files
├── hexagon.min              # SCons build config for Hexagon DSP side
└── android.min              # SCons build config for ARM side (if using FastRPC)
```

The <VPIcon icon="fas fa-file-lines"/>`hexagon.min` file configures the DSP-side build, while <VPIcon icon="fas fa-file-lines"/>`android.min` handles the ARM side when using FastRPC for cross-processor communication. Both are read by the SDK's top-level `SConstruct` file, which lives at `$HEXAGON_SDK_ROOT/SConstruct`. You don't need a separate <VPIcon icon="iconfont icon-gnu"/>`Makefile` or `SConscript` for projects inside the SDK tree.

### Build Configuration with SCons

A minimal <VPIcon icon="fas fa-file-lines"/>`hexagon.min` build file looks like this:

```sh
# hexagon.min - SCons build descriptor for the DSP side

BUILD_LIBS = libmy_qurt_app

# Source files
libmy_qurt_app_C_SRCS = src/main.c

# QuRT OS library
libmy_qurt_app_LIBS = atomic rpcmem

# Compiler flags
libmy_qurt_app_HEXAGON_CFLAGS = -O2 -Wall

# Link against QuRT
libmy_qurt_app_DLLS = libmy_qurt_app_skel
```

The `.min` file format is specific to the Hexagon SDK's SCons build system. `BUILD_LIBS` names the library target. `C_SRCS` lists source files. `LIBS` specifies libraries to link against. `HEXAGON_CFLAGS` sets compiler flags. `DLLS` defines the shared library output name, where the `_skel` suffix is a FastRPC convention for DSP-side implementations.

Under the hood, the SDK's `SConstruct` walks the project tree, reads each `.min` file, and translates its declarations into SCons build targets. The `V` (variant) parameter you pass at build time selects the target architecture, build type, and toolchain version. For example, `V=hexagon_Release_dynamic_toolv84_v66` means: build for Hexagon, release mode, dynamic linking, using the v84 toolchain targeting the v66 DSP architecture.

For projects that need more control than the `.min` format provides, you can write a standalone `SConscript` file:

```py title="SConscript"
# SConscript - Standalone SCons build for a QuRT project

Import('env')

env = env.Clone()

# Add include paths
env.Append(CPPPATH = ['inc'])

# Compiler flags
env.Append(CCFLAGS = ['-O2', '-Wall'])

# Build the shared library
sources = ['src/main.c']
libs = ['atomic', 'rpcmem']

env.SharedLibrary(
    target = 'libmy_qurt_app_skel',
    source = sources,
    LIBS = libs
)
```

The `SConscript` approach gives you full access to SCons features: conditional compilation, custom build steps, dependency scanning, and variant builds. The `Import('env')` call pulls in the build environment configured by the SDK's top-level `SConstruct`, which already knows about Hexagon compiler paths, QuRT headers, and system libraries. `env.Clone()` creates a copy so your modifications do not affect other projects in the tree.

---

## The QuRT Programming Model

The core mental model for QuRT programming is straightforward:

**QuRT is a priority-based preemptive RTOS.** That means everything runs in a thread (there is no bare-metal main loop). Higher priority threads always preempt lower priority ones, immediately and without negotiation. Threads at the same priority level are round-robin scheduled.

The scheduler is tick-less, meaning it doesn't wake up periodically. It only runs when something changes, such as a thread blocking, a signal being set, or a higher-priority thread becoming ready.

```plaintext
Priority Levels (0-255, lower number = higher priority)

 000  ┃ ████ Interrupt handlers (do not touch this)
 001  ┃ ████ Critical system tasks
 ...  ┃
 064  ┃ ████ Your high-priority audio processing
 ...  ┃
 128  ┃ ████ Your medium-priority sensor fusion
 ...  ┃
 192  ┃ ████ Your low-priority logging/reporting
 ...  ┃
 255  ┃ ████ Idle thread (QuRT's built-in background)
```

This priority map shows how QuRT's 256 priority levels are typically allocated. Priority 0 is the **highest** priority and 255 is the **lowest**. This is the opposite of FreeRTOS, where higher numbers mean higher priority.

Interrupt handlers occupy the top priority levels, system tasks sit just below, and user threads occupy the middle range. The idle thread at priority 255 runs only when nothing else is ready.

---

## Creating Your First QuRT Thread

The simplest QuRT program creates a single thread that prints a message and exits.

```c :collapsed-lines title="main.c"
/* First QuRT program */

#include <stdio.h>
#include <stdlib.h>
#include <qurt.h>

#define STACK_SIZE 4096

/* Thread stack must be 8-byte aligned */
static char thread_stack[STACK_SIZE] __attribute__((aligned(8)));

void my_thread_func(void *arg)
{
    int thread_id = (int)(uintptr_t)arg;

    printf("Hello from QuRT thread %d!\n", thread_id);
    printf("My thread ID: %lu\n", qurt_thread_get_id());

    /* Thread must explicitly exit */
    qurt_thread_exit(QURT_EOK);
}

int main(void)
{
    qurt_thread_t      thread_id;
    qurt_thread_attr_t attr;

    printf("Main thread starting on QuRT!\n");

    /* Initialize thread attributes */
    qurt_thread_attr_init(&attr);

    /* Configure the thread */
    qurt_thread_attr_set_name(&attr, "my_first_thread");
    qurt_thread_attr_set_stack_addr(&attr, thread_stack);
    qurt_thread_attr_set_stack_size(&attr, STACK_SIZE);
    qurt_thread_attr_set_priority(&attr, 128);  /* Medium priority */

    /* Create and start the thread */
    int result = qurt_thread_create(&thread_id, &attr,
                                     my_thread_func,
                                     (void *)42);

    if (result != QURT_EOK) {
        printf("Thread creation failed with error: %d\n", result);
        return -1;
    }

    printf("Thread created successfully! ID: %lu\n", thread_id);

    /* Wait for the thread to finish */
    int status;
    qurt_thread_join(thread_id, &status);

    printf("Thread finished with status: %d\n", status);
    return 0;
}
```

This program demonstrates the four-step thread creation process in QuRT. First, `qurt_thread_attr_init()` initializes a thread attribute's structure. Second, the program configures the thread with a debug name (which shows up in crash dumps), a stack address, a stack size, and a priority. Third, `qurt_thread_create()` creates and immediately starts the thread, passing a function pointer and an argument. Fourth, `qurt_thread_join()` blocks the calling thread until the new thread calls `qurt_thread_exit()`.

Two details are critical. QuRT doesn't allocate stack memory for you: you must provide a statically allocated, 8-byte-aligned buffer. And every thread must call `qurt_thread_exit()` before returning. If a thread function simply returns without calling exit, the behavior is undefined.

### Thread Creation Flow

```plaintext
     qurt_thread_attr_init()
              │
              ▼
    ┌─────────────────────┐
    │  Set name           │
    │  Set stack address  │
    │  Set stack size     │
    │  Set priority       │
    └─────────────────────┘
              │
              ▼
     qurt_thread_create()
              │
              ▼
    Thread starts running ──► my_thread_func()
              │                      │
              ▼                      ▼
     qurt_thread_join()       qurt_thread_exit()
     (waits for exit)         (signals "I'm done")
```
<!-- TODO: mermaid화 -->

This flow shows the lifecycle of a single thread. The attributes structure acts as a configuration object: you set all the thread parameters, then pass it to `qurt_thread_create()`. Once created, the thread runs its entry function. When the entry function calls `qurt_thread_exit()`, the thread terminates and any thread blocked in `qurt_thread_join()` is unblocked and receives the exit status code.

---

## How Thread Creation Works Internally

Most tutorials skip what happens inside `qurt_thread_create()`. Understanding the internals makes debugging and priority design decisions much clearer.

### What the Kernel Does During Thread Creation

When you call `qurt_thread_create()`, you're making a **system call** into the QuRT kernel. The kernel performs five steps in sequence:

```plaintext
  Your code calls qurt_thread_create()
         │
         ▼
  ┌──────────────────────────────────────────────────────────┐
  │  1. VALIDATE                                             │
  │     • Is the stack pointer non-NULL and aligned?         │
  │     • Is the stack size >= minimum (typ. 2KB)?           │
  │     • Is the priority in range 0-255?                    │
  │     • Is the entry function pointer non-NULL?            │
  │     (If any check fails → return QURT_EINVALID)          │
  ├──────────────────────────────────────────────────────────┤
  │  2. ALLOCATE THREAD CONTROL BLOCK (TCB)                  │
  │     • QuRT allocates a kernel-side data structure        │
  │     • This holds: thread ID, priority, state, saved      │
  │       registers, signal masks, mutex wait list, etc.     │
  ├──────────────────────────────────────────────────────────┤
  │  3. INITIALIZE THE STACK FRAME                           │
  │     • The kernel sets up a synthetic stack frame at the  │
  │       top of YOUR stack memory                           │
  │     • It writes the initial register values:             │
  │       ┌──────────────────────────────────────┐           │
  │       │  Stack Top (high address)            │           │
  │       │  ┌──────────────────────────────────┐│           │
  │       │  │ PC  = my_thread_func (entry)     ││           │
  │       │  │ SP  = stack_addr + stack_size    ││           │
  │       │  │ R0  = arg (your void* argument)  ││           │
  │       │  │ LR  = qurt_thread_exit           ││           │
  │       │  │ SR  = default status register    ││           │
  │       │  │ R1-R31 = 0                       ││           │
  │       │ └──────────────────────────────────┘│            │
  │       │  ... (rest of stack is untouched) ...│           │
  │       │  Stack Bottom (low address)          │           │
  │       └──────────────────────────────────────┘           │
  ├──────────────────────────────────────────────────────────┤
  │  4. INSERT INTO READY QUEUE                              │
  │     • The TCB is added to the scheduler's ready queue    │
  │       at the appropriate priority level                  │
  │     • The thread's state is set to READY                 │
  ├──────────────────────────────────────────────────────────┤
  │  5. TRIGGER A RESCHEDULE                                 │
  │     • The scheduler checks: "Is this new thread's        │
  │       priority higher than the currently running         │
  │       thread?"                                           │
  │     • If YES: context switch happens RIGHT NOW           │
  │       (the calling thread is preempted)                  │
  │     • If NO: the new thread waits in the ready queue     │
  │       until it's the highest priority runnable thread    │
  └──────────────────────────────────────────────────────────┘
         │
         ▼
  qurt_thread_create() returns to the caller
  (but the new thread may already be running!)
```
<!-- TODO: mermaid화 -->

The most surprising aspect of this flow is step 5. If the new thread has higher priority than the thread that created it, **the new thread starts running before** `qurt_thread_create()` **returns to the caller**. The creating thread is preempted mid-call. This is what "preemptive" means in practice: the scheduler doesn't wait for a convenient moment. It enforces priority ordering immediately.

### How the Stack Frame Launches Your Function

When the scheduler context-switches to a brand-new thread for the first time, it does exactly what it does for any context switch: it restores the saved registers from the TCB and jumps to the saved Program Counter.

For a new thread, those registers were set up synthetically by the kernel during step 3. The **PC (Program Counter)** was set to `my_thread_func`, so the processor jumps to your function. **R0** was set to your `arg` parameter, so your function receives it as the first argument (following the Hexagon calling convention). The **SP (Stack Pointer)** was set to the top of your stack, so your function has a working stack. And the **LR (Link Register)** was set to `qurt_thread_exit`, so if your function returns normally (which you should not rely on), it falls through to `qurt_thread_exit`.

```plaintext
The illusion:
──────────────
To your thread function, it looks like someone
"called" it normally with the argument you passed.

The reality:
──────────────
The scheduler restored a set of synthetic registers
that make the processor THINK it is returning from
a function call into your entry point.

It's like waking up in a room you have never been in,
but someone arranged everything so perfectly that
you do not realize you did not walk in through the door.
```
<!-- TODO: mermaid화 -->

This diagram contrasts the programmer's mental model (a normal function call) with what actually happens at the hardware level (a register restore that simulates a function call). The thread function has no way to distinguish between these two scenarios, which is exactly the point. The kernel creates a seamless illusion.

### Context Switch Walkthrough

Consider a concrete example: thread A (priority 128) creates thread B (priority 64, which is higher priority). The following timeline shows what happens at each step:

```plaintext
Time ──────────────────────────────────────────────►

Thread A (pri 128)          Kernel/Scheduler         Thread B (pri 64)
────────────────           ────────────────           ────────────────
Calls                      
qurt_thread_create()       
   │                       
   ├─► System call ──────►  Validates params
                            Allocates TCB
                            Sets up stack frame
                            Inserts B into ready queue
                            
                            "B (64) > A (128)?  YES."
                            
                            SAVE A's registers   ──┐
                            to A's TCB             │
                                                   │
                            LOAD B's registers   ◄─┘
                            from B's TCB (the
                            synthetic ones)
                            
                            Jump to PC ─────────► my_thread_func(arg)
                                                   │
                                                   │ does work...
                                                   │ calls qurt_thread_exit()
                                                   │
                            B is removed ◄─────── Exit system call
                            from ready queue
                            
                            "Who's next? A."
                            
                            LOAD A's registers
   │                        Jump to A's PC
   │◄──────────────────────
   │
   ├─► qurt_thread_create()
   │   returns QURT_EOK
   │
   ▼ continues...
```
<!-- TODO: mermaid화 -->

From thread A's perspective, `qurt_thread_create()` is just a function call that takes a while to return. Thread A has no idea it was suspended. It doesn't know thread B already ran to completion during that pause.

The scheduler makes preemption invisible to the preempted thread. This is a fundamental property of preemptive scheduling: threads don't need to cooperate or even be aware of each other's existence.

### Thread Control Block Contents

The TCB is the kernel's internal data structure for tracking each thread. You never access it directly, but understanding its contents explains a lot of QuRT behavior:

```c
/* Conceptual TCB layout (simplified, not actual QuRT source) */
struct qurt_tcb {
    /* Identity */
    qurt_thread_t   thread_id;
    char            name[16];
    
    /* Scheduling */
    uint8_t         base_priority;
    uint8_t         effective_priority; /* May differ due to priority inheritance */
    uint8_t         state;             /* READY, RUNNING, BLOCKED, SUSPENDED */
    
    /* Saved CPU context (filled during context switch) */
    uint32_t        saved_regs[32];
    uint32_t        saved_pc;
    uint32_t        saved_sp;
    uint32_t        saved_sr;
    
    /* Stack info (for debugging and overflow detection) */
    void           *stack_base;
    size_t          stack_size;
    
    /* Blocking info */
    void           *wait_object;  /* Mutex/signal/pipe being waited on */
    uint32_t        wait_mask;    /* Signal bits being waited for */
    
    /* Linked list pointers */
    struct qurt_tcb *next_ready;
    struct qurt_tcb *next_waiting;
    
    /* Join support */
    int             exit_status;  /* Value passed to qurt_thread_exit() */
    qurt_thread_t   joiner;      /* Thread waiting in qurt_thread_join() */
};
```

The TCB stores everything the scheduler needs: identity information (thread ID and debug name), scheduling state (base and effective priority, current state), saved CPU context (all 32 general-purpose registers plus PC, SP, and status register), stack bounds, blocking information (what the thread is waiting on), linked list pointers for the ready and wait queues, and join support fields.

The `effective_priority` field may differ from `base_priority` when priority inheritance is active, which is covered in the synchronization section.

### Thread State Machine

A QuRT thread is always in one of four states:

```plaintext
                    qurt_thread_create()
                           │
                           ▼
                    ┌──────────┐
          ┌─────────│  READY   │◄──────────────────────────┐
          │         └──────────┘                           │
          │              │ ▲                               │
          │  Scheduler   │ │ Preempted by                  │
          │  picks this  │ │ higher-priority               │
          │  thread      │ │ thread                        │
          │              ▼ │                               │
          │         ┌──────────┐     Signal/mutex/         │
          │         │ RUNNING  │     timer event           │
          │         └──────────┘     unblocks thread       │
          │              │                                 │
          │  Thread calls│                                 │
          │  blocking    │                                 │
          │  API:        │                                 │
          │  - mutex_lock│                                 │
          │  - signal_   │                                 │
          │    wait      │                                 │
          │  - pipe_     │                                 │
          │    receive   ▼                                 │
          │         ┌──────────┐                           │
          │         │ BLOCKED  │───────────────────────────┘
          │         └──────────┘
          │
          │  qurt_thread_exit()
          │         │
          │         ▼
          │    ┌──────────┐
          └───►│  DEAD    │
               └──────────┘
```
<!-- TODO: mermaid화 -->

- **READY** means the thread can run and is waiting for a hardware thread slot.
- **RUNNING** means the thread is currently executing on a hardware thread (only one thread per hardware thread slot is in this state at a time).
- **BLOCKED** means the thread is waiting for an external event: a mutex to be released, a signal to be set, or a timer to expire.
- **DEAD** means the thread called `qurt_thread_exit()`. If another thread called `qurt_thread_join()` on it, that thread receives the exit status.

### Hardware Thread Slots

The Hexagon DSP is a **hardware-multithreaded processor** with multiple hardware thread slots per core (typically 2 to 4). This means QuRT can run multiple threads truly simultaneously on a single core, not just time-sliced.

```plaintext
┌─────────────────────────────────────────┐
│          Hexagon DSP Core               │
│                                         │
│  ┌───────────┐  ┌───────────┐           │
│  │ HW Thread │  │ HW Thread │           │
│  │ Slot 0    │  │ Slot 1    │  ...      │
│  │           │  │           │           │
│  │ Thread A  │  │ Thread B  │           │
│  │ (running) │  │ (running) │           │
│  └───────────┘  └───────────┘           │
│                                         │
│  Ready Queue: [C, D, E, F, ...]         │
│  The scheduler fills HW slots with      │
│  the highest-priority READY threads     │
└─────────────────────────────────────────┘
```
<!-- TODO: mermaid화 -->

This diagram shows a single Hexagon core with two hardware thread slots. Each slot can execute a thread independently and simultaneously. The scheduler fills the hardware slots with the highest-priority ready threads. When there are more software threads than hardware slots, the scheduler time-slices the lower-priority threads. But the highest-priority threads get dedicated hardware slots and run without context switching at all.

On a typical Hexagon v66 with 4 hardware threads, the top 4 priority threads each have their own execution pipeline. Context switches only happen when a thread blocks or a higher-priority thread wakes up and displaces one from a hardware slot. This is why QuRT achieves such low scheduling latency.

### Full Thread Lifecycle

The following code shows a complete thread lifecycle with annotations for what QuRT does at each step:

```c
static char stack[8192] __attribute__((aligned(8)));

void my_func(void *arg)
{
    /* State: RUNNING. Stack is fresh, R0 contains arg. */
    int val = *(int *)arg;

    qurt_mutex_lock(&some_mutex);
    /* If mutex is held: state becomes BLOCKED until holder unlocks */

    shared_data = val;
    qurt_mutex_unlock(&some_mutex);

    qurt_thread_exit(QURT_EOK);
    /* State becomes DEAD. Joiner (if any) is unblocked. */
}

int main(void)
{
    qurt_thread_t tid;
    qurt_thread_attr_t attr;
    int my_arg = 42;

    qurt_thread_attr_init(&attr);
    qurt_thread_attr_set_stack_addr(&attr, stack);
    qurt_thread_attr_set_stack_size(&attr, sizeof(stack));
    qurt_thread_attr_set_priority(&attr, 100);

    qurt_thread_create(&tid, &attr, my_func, &my_arg);
    /* If my_func's priority (100) > main's: main is preempted here */

    int status;
    qurt_thread_join(tid, &status);
    /* Blocks until my_func exits; returns immediately if already exited */

    return 0;
}
```

When `my_func` starts running, the kernel has already set up its registers so that `arg` contains the pointer to `my_arg`. The thread's state is RUNNING.

When it calls `qurt_mutex_lock()`, one of two things happens: if the mutex is available, the thread acquires it and continues. If the mutex is held by another thread, the calling thread's state changes to BLOCKED, its registers are saved to its TCB, and the scheduler picks the next highest-priority ready thread.

When the mutex holder calls `qurt_mutex_unlock()`, the blocked thread moves back to READY and the scheduler re-evaluates priorities.

On the `main` side, `qurt_thread_create()` may or may not return before `my_func` finishes. If `my_func` has higher priority than `main`, the scheduler preempts `main` immediately, and `qurt_thread_create()` doesn't return until `my_func` completes (or blocks). `qurt_thread_join()` either blocks `main` until `my_func` exits, or returns immediately if `my_func` has already exited.

One important note about stack sizing: if you set `STACK_SIZE` to something too small (say, 256 bytes) and your thread calls `printf`, the result is a **stack overflow**. QuRT doesn't detect stack overflows for you. The crash will be silent and difficult to diagnose. Always give your threads at least 8192 bytes of stack and optimize later after profiling.

### Building and Running on the Simulator

The Hexagon SDK provides a `make` wrapper that invokes SCons underneath. Both of the following commands produce the same result:

```sh
# Option 1: Use the make wrapper (invokes SCons internally)
cd $HEXAGON_SDK_ROOT
make V=hexagon_Release_dynamic_toolv84_v66 \
     tree=my_qurt_project

# Option 2: Invoke SCons directly
cd $HEXAGON_SDK_ROOT
python tools/build/scons/scons.py \
    V=hexagon_Release_dynamic_toolv84_v66 \
    my_qurt_project
```

Both commands build the project for the Hexagon v66 architecture using the v84 toolchain in release mode. The `make` wrapper is a convenience layer: it parses the `V=` and `tree=` arguments and forwards them to SCons. Using SCons directly gives you access to additional flags such as `--jobs=N` for parallel builds and `--verbose` for full compiler command output.

```sh
# Run on the simulator
hexagon-sim --simulated_returnval \
    --cosim_file osam.cfg \
    -- bootimg.pbn \
    -- my_qurt_app.so
```
<!-- TODO: mermaid화 -->

The `hexagon-sim` command launches the QuRT simulator with your compiled application. The `--simulated_returnval` flag captures the return value from your `main` function, and `--cosim_file` points to the QuRT OS configuration.

---

## Working with Multiple Threads

Real QuRT applications have multiple threads running simultaneously. The producer-consumer pattern is one of the most common in DSP programming: one thread reads from hardware, another processes the data.

```c :collapsed-lines
#include <stdio.h>
#include <qurt.h>

#define STACK_SIZE    8192
#define BUFFER_SIZE   16
#define NUM_ITEMS     100

/* Thread stacks */
static char producer_stack[STACK_SIZE] __attribute__((aligned(8)));
static char consumer_stack[STACK_SIZE] __attribute__((aligned(8)));

/* Shared buffer */
static int buffer[BUFFER_SIZE];
static int head = 0;
static int tail = 0;
static int count = 0;

/* Synchronization primitives */
qurt_mutex_t buffer_mutex;
qurt_cond_t  not_full;
qurt_cond_t  not_empty;

void producer_thread(void *arg)
{
    for (int i = 0; i < NUM_ITEMS; i++) {
        qurt_mutex_lock(&buffer_mutex);

        /* Wait until there is space in the buffer */
        while (count == BUFFER_SIZE) {
            qurt_cond_wait(&not_full, &buffer_mutex);
        }

        /* Produce an item */
        buffer[head] = i;
        head = (head + 1) % BUFFER_SIZE;
        count++;

        printf("[Producer] Put item %d (buffer count: %d)\n", i, count);

        /* Signal the consumer that data is available */
        qurt_cond_signal(&not_empty);
        qurt_mutex_unlock(&buffer_mutex);
    }

    qurt_thread_exit(QURT_EOK);
}

void consumer_thread(void *arg)
{
    for (int i = 0; i < NUM_ITEMS; i++) {
        qurt_mutex_lock(&buffer_mutex);

        /* Wait until there is data in the buffer */
        while (count == 0) {
            qurt_cond_wait(&not_empty, &buffer_mutex);
        }

        /* Consume an item */
        int item = buffer[tail];
        tail = (tail + 1) % BUFFER_SIZE;
        count--;

        printf("[Consumer] Got item %d (buffer count: %d)\n", item, count);

        /* Signal the producer that space is available */
        qurt_cond_signal(&not_full);
        qurt_mutex_unlock(&buffer_mutex);
    }

    qurt_thread_exit(QURT_EOK);
}

int main(void)
{
    qurt_thread_t producer, consumer;
    qurt_thread_attr_t attr;

    /* Initialize sync primitives BEFORE creating threads */
    qurt_mutex_init(&buffer_mutex);
    qurt_cond_init(&not_full);
    qurt_cond_init(&not_empty);

    /* Create producer (higher priority) */
    qurt_thread_attr_init(&attr);
    qurt_thread_attr_set_name(&attr, "producer");
    qurt_thread_attr_set_stack_addr(&attr, producer_stack);
    qurt_thread_attr_set_stack_size(&attr, STACK_SIZE);
    qurt_thread_attr_set_priority(&attr, 100);
    qurt_thread_create(&producer, &attr, producer_thread, NULL);

    /* Create consumer (lower priority) */
    qurt_thread_attr_init(&attr);
    qurt_thread_attr_set_name(&attr, "consumer");
    qurt_thread_attr_set_stack_addr(&attr, consumer_stack);
    qurt_thread_attr_set_stack_size(&attr, STACK_SIZE);
    qurt_thread_attr_set_priority(&attr, 110);
    qurt_thread_create(&consumer, &attr, consumer_thread, NULL);

    /* Wait for both threads to finish */
    int status;
    qurt_thread_join(producer, &status);
    qurt_thread_join(consumer, &status);

    /* Clean up */
    qurt_mutex_destroy(&buffer_mutex);
    qurt_cond_destroy(&not_full);
    qurt_cond_destroy(&not_empty);

    printf("All done! Produced and consumed %d items.\n", NUM_ITEMS);
    return 0;
}
```

This code implements a classic bounded-buffer producer-consumer pattern. The shared buffer is a circular array of 16 integers protected by a mutex. The producer writes items into the buffer and the consumer reads them out.

When the buffer is full, the producer blocks on the `not_full` condition variable. When the buffer is empty, the consumer blocks on `not_empty`. Each side signals the other after modifying the buffer.

The producer has higher priority (100) than the consumer (110) for a deliberate reason. In a real DSP scenario, the producer is typically reading from hardware (a microphone, a sensor). If the producer misses a hardware sample, that data is lost forever. The consumer can always process data later. This is a general RTOS design principle: **never starve your hardware-facing threads.**

---

## Synchronization Primitives

QuRT provides five main synchronization mechanisms: mutexes, condition variables, signals, barriers, and semaphores.

```plaintext
┌──────────────┬────────────────────────────────────────────────────┐
│ Primitive    │ When to Use                                        │
├──────────────┼────────────────────────────────────────────────────┤
│ Mutex        │ Protecting shared data from concurrent access      │
│ Condition Var│ "Wait until X is true" (always paired with mutex)  │
│ Signal       │ One thread notifying another (like poking someone) │
│ Barrier      │ "Everyone wait here until all threads arrive"      │
├──────────────┼────────────────────────────────────────────────────┤
│ Semaphore    │ Controlling access to a limited resource pool      │
│              │ (for example, 4 DMA channels shared by 10 threads)        │
└──────────────┴────────────────────────────────────────────────────┘
```
<!-- TODO: table -->

This table summarizes each primitive and its primary use case. Mutexes enforce exclusive access to shared data. Condition variables let a thread sleep until a specific data condition becomes true, and are always used in combination with a mutex. Signals provide lightweight one-to-one notifications between threads. Barriers synchronize a group of threads at a common point. Semaphores control access to a pool of N identical resources.

### Mutexes

A mutex ensures that only one thread accesses a critical section at a time. QuRT mutexes also support non-blocking acquisition through `qurt_mutex_try_lock()`.

```c
qurt_mutex_t my_mutex;

void init_example(void)
{
    /* Always initialize before use */
    qurt_mutex_init(&my_mutex);
}

void critical_section_example(void)
{
    qurt_mutex_lock(&my_mutex);

    /* Only one thread can be here at a time */
    shared_counter++;
    shared_buffer[index] = new_value;

    qurt_mutex_unlock(&my_mutex);
}

/* Non-blocking version */
void try_lock_example(void)
{
    int result = qurt_mutex_try_lock(&my_mutex);

    if (result == QURT_EOK) {
        shared_counter++;
        qurt_mutex_unlock(&my_mutex);
    } else {
        printf("Busy, will try later\n");
    }
}

void cleanup_example(void)
{
    qurt_mutex_destroy(&my_mutex);
}
```

The `qurt_mutex_lock()` call blocks the calling thread until the mutex is available, then acquires it. `qurt_mutex_try_lock()` attempts to acquire the mutex and returns immediately with `QURT_EOK` on success or an error code if the mutex is held. Always call `qurt_mutex_destroy()` when you're done with a mutex.

QuRT mutexes implement **priority inheritance**. If a high-priority thread is waiting for a mutex held by a low-priority thread, the low-priority thread temporarily gets boosted to the high-priority level. This prevents **priority inversion**, the classic bug that caused the Mars Pathfinder spacecraft to repeatedly reset during its mission.

QuRT handles priority inheritance automatically, but you should be aware it's happening so you don't get confused by unexpected priority behavior during debugging.

### Signals

Signals in QuRT are a lightweight notification mechanism. A thread waits for specific signal bits, and another thread (or an ISR) sets those bits to wake it up.

```c :collapsed-lines
#include <qurt.h>

#define SIGNAL_DATA_READY   0x01
#define SIGNAL_STOP         0x02
#define SIGNAL_ERROR        0x04

qurt_signal_t my_signal;

void signal_init(void)
{
    qurt_signal_init(&my_signal);
}

/* Waiting thread */
void waiter_thread(void *arg)
{
    unsigned int received_signals;

    while (1) {
        /* Wait for ANY of these signals */
        received_signals = qurt_signal_wait(
            &my_signal,
            SIGNAL_DATA_READY | SIGNAL_STOP | SIGNAL_ERROR,
            QURT_SIGNAL_ATTR_WAIT_ANY
        );

        if (received_signals & SIGNAL_STOP) {
            printf("Received stop signal. Exiting.\n");
            break;
        }

        if (received_signals & SIGNAL_DATA_READY) {
            printf("Data is ready! Processing...\n");
            process_data();
            /* Clear the signal after handling it */
            qurt_signal_clear(&my_signal, SIGNAL_DATA_READY);
        }

        if (received_signals & SIGNAL_ERROR) {
            printf("Error occurred! Handling...\n");
            handle_error();
            qurt_signal_clear(&my_signal, SIGNAL_ERROR);
        }
    }

    qurt_signal_destroy(&my_signal);
    qurt_thread_exit(QURT_EOK);
}

/* Signaling thread (or ISR) */
void sender_thread(void *arg)
{
    prepare_data();
    qurt_signal_set(&my_signal, SIGNAL_DATA_READY);

    /* Later, tell it to stop */
    qurt_signal_set(&my_signal, SIGNAL_STOP);

    qurt_thread_exit(QURT_EOK);
}
```

The waiting thread calls `qurt_signal_wait()` with a bitmask of the signals it cares about. `QURT_SIGNAL_ATTR_WAIT_ANY` means the thread wakes up when any of the specified bits are set. The sender thread calls `qurt_signal_set()` to set one or more bits. After handling a signal, the waiter must call `qurt_signal_clear()` to reset the bit. If you forget to clear a signal, the next call to `qurt_signal_wait()` returns immediately, and your thread processes the same event again.

The choice between signals and condition variables depends on the use case. Signals are best for notifications between unrelated threads, or from an ISR, because they're simpler and lighter weight. Condition variables are better when the notification is tied to a specific data condition (buffer full, queue empty) and you need mutex protection for the data check.

### Barriers

A barrier blocks all participating threads until every one of them has reached the barrier point. This is useful when a computation is split into phases and each phase depends on the results of the previous one.

```c
#define NUM_WORKER_THREADS  4

qurt_barrier_t sync_barrier;

void worker_thread(void *arg)
{
    int thread_num = (int)(uintptr_t)arg;

    /* Phase 1: Each thread computes its portion */
    printf("Thread %d: Computing phase 1...\n", thread_num);
    compute_partial_result(thread_num);

    /* All threads wait here until everyone finishes phase 1 */
    qurt_barrier_wait(&sync_barrier);

    /* Phase 2: All partial results are ready, combine them */
    printf("Thread %d: Computing phase 2...\n", thread_num);
    combine_results(thread_num);

    qurt_thread_exit(QURT_EOK);
}

int main(void)
{
    qurt_barrier_init(&sync_barrier, NUM_WORKER_THREADS);

    /* Create worker threads */
    for (int i = 0; i < NUM_WORKER_THREADS; i++) {
        create_worker(i);
    }

    join_all_workers();

    qurt_barrier_destroy(&sync_barrier);
    return 0;
}
```

The barrier is initialized with the number of participating threads. Each thread calls `qurt_barrier_wait()` when it reaches the synchronization point. The call blocks until all threads have arrived. Once the last thread calls `qurt_barrier_wait()`, all threads are released simultaneously and continue to phase 2. ### Semaphores

A semaphore controls access to a pool of N identical resources. Unlike a mutex (which is a semaphore with N=1), a semaphore allows up to N threads to hold it simultaneously.

```c
#define MAX_DMA_CHANNELS 4

qurt_sem_t dma_semaphore;

void init_dma_pool(void)
{
    /* 4 DMA channels available */
    qurt_sem_init_val(&dma_semaphore, MAX_DMA_CHANNELS);
}

void thread_needing_dma(void *arg)
{
    /* Acquire a DMA channel (blocks if all 4 are in use) */
    qurt_sem_down(&dma_semaphore);

    int channel = allocate_dma_channel();
    perform_dma_transfer(channel);
    release_dma_channel(channel);

    /* Release the semaphore slot */
    qurt_sem_up(&dma_semaphore);

    qurt_thread_exit(QURT_EOK);
}
```

The semaphore starts with a count of 4, matching the number of DMA channels. Each `qurt_sem_down()` decrements the count and blocks if the count reaches zero. Each `qurt_sem_up()` increments the count and unblocks one waiting thread if any are queued. This guarantees that no more than 4 threads use DMA channels simultaneously.

---

## Memory Management

Memory on a DSP is limited. A typical Hexagon DSP has between 256 KB and 2 MB of tightly-coupled memory (TCM) plus access to DDR. QuRT provides tools to manage both effectively.

### The Memory Map

```plaintext
┌───────────────────────────────────┐  High Address
│         DDR (Shared with ARM)     │
│   - Large buffers                 │
│   - Neural network weights        │
│   - Audio/video frames            │
├───────────────────────────────────┤
│         QuRT Virtual Memory       │
│   - User heap                     │
│   - Thread stacks                 │
├───────────────────────────────────┤
│         L2 Cache (TCM Mode)       │
│   - Frequently accessed buffers   │
│   - Lookup tables                 │
├───────────────────────────────────┤
│         QuRT Kernel               │
│   - Scheduler, ISR handlers       │
│   - System data structures        │
└───────────────────────────────────┘  Low Address
```

This diagram shows the Hexagon DSP memory layout from low to high addresses. The QuRT kernel occupies the lowest addresses and is off-limits to user code. Above that, L2 cache configured in TCM mode provides fast storage for hot data. The virtual memory region holds the user heap and thread stacks. At the top, DDR is shared with the ARM CPU and is used for large data buffers, ML model weights, and media frames. DDR has higher latency than TCM but much more capacity.

### Dynamic Memory Allocation

```c
#include <qurt.h>
#include <stdlib.h>

void memory_examples(void)
{
    /* Standard malloc/free works (QuRT provides a heap) */
    int *data = (int *)malloc(1024 * sizeof(int));
    if (!data) {
        printf("malloc failed! Out of heap memory.\n");
        return;
    }

    for (int i = 0; i < 1024; i++) {
        data[i] = i * 2;
    }

    free(data);
}
```

QuRT provides a standard C heap, so `malloc` and `free` work as expected. But `malloc` has unpredictable execution time because it may need to search the free list, split blocks, or coalesce adjacent free regions. This makes it unsuitable for real-time hot paths, where execution time must be deterministic. Use `malloc` for setup and teardown, not for per-frame or per-sample allocation.

### Cache Management

On the Hexagon DSP, explicit cache management is essential when sharing memory with the ARM CPU.

```c
#include <qurt.h>

void cache_management_example(void)
{
    void *buffer;
    size_t buffer_size = 4096;

    /* Allocate physically contiguous, cache-aligned memory */
    int result = qurt_mem_region_create(
        &buffer,
        buffer_size,
        qurt_mem_default_pool,
        QURT_MEM_REGION_SHARED
    );

    if (result != QURT_EOK) {
        printf("Memory region creation failed\n");
        return;
    }

    /* BEFORE reading data written by another processor (e.g., ARM): */
    qurt_mem_cache_clean(buffer, buffer_size,
                          QURT_MEM_CACHE_INVALIDATE);

    /* Read data from the buffer... */

    /* AFTER writing data that another processor will read: */
    fill_buffer_with_results(buffer, buffer_size);
    qurt_mem_cache_clean(buffer, buffer_size,
                          QURT_MEM_CACHE_FLUSH);
}
```

The `qurt_mem_region_create()` call allocates a physically contiguous memory region suitable for sharing with other processors. The `QURT_MEM_REGION_SHARED` flag marks it for cross-processor use.

The cache rules for shared memory are simple but critical:

1. **Invalidate** before you **read**, so you see the latest data written by the ARM CPU rather than stale cache entries.
2. **Flush** after you **write**, so the ARM CPU sees your changes rather than the old contents of main memory.

Forgetting these operations causes bugs where your code is logically correct but operates on stale data.

### Memory Pools for Predictable Allocation

Memory pools provide O(1) allocation time, making them suitable for real-time hot paths.

```c
#include <qurt.h>

#define BLOCK_SIZE    256
#define NUM_BLOCKS    32

/* Pool memory is statically allocated for determinism */
static char pool_memory[BLOCK_SIZE * NUM_BLOCKS] __attribute__((aligned(8)));
static qurt_mem_pool_t my_pool;

void pool_init(void)
{
    qurt_mem_pool_create(&my_pool, pool_memory,
                          BLOCK_SIZE * NUM_BLOCKS,
                          BLOCK_SIZE);
}

void *pool_alloc(void)
{
    void *block = qurt_mem_pool_alloc(&my_pool);
    if (!block) {
        printf("Pool exhausted!\n");
    }
    return block;
}

void pool_free(void *block)
{
    qurt_mem_pool_free(&my_pool, block);
}
```

This code creates a pool of 32 blocks, each 256 bytes. The pool memory is statically allocated to avoid any dependency on `malloc` at runtime.

`qurt_mem_pool_alloc()` returns a block in constant time, and `qurt_mem_pool_free()` returns it in constant time. If the pool is exhausted, the allocation returns NULL rather than blocking or searching for memory elsewhere.

This determinism makes memory pools the right choice for audio processing loops, sensor data handlers, and any other code that runs on a strict deadline.

---

## Timers and Timing

QuRT provides hardware-backed timers for precise timing. This is critical for DSP work: if you're processing audio at 48 kHz, you need a new buffer every 10.67 milliseconds, with no exceptions.

### One-Shot Timer

```c
#include <qurt.h>
#include <qurt_timer.h>

qurt_timer_t my_timer;
qurt_signal_t timer_signal;

#define TIMER_EXPIRED_SIGNAL  0x01

void timer_example(void)
{
    qurt_signal_init(&timer_signal);

    qurt_timer_attr_t attr;
    qurt_timer_attr_init(&attr);

    /* Set timer duration: 10 milliseconds */
    qurt_timer_attr_set_duration(&attr,
        qurt_timer_convert_time_to_ticks(10000,  /* microseconds */
                                          QURT_TIME_USEC));

    /* Set the signal to fire when timer expires */
    qurt_timer_attr_set_signal(&attr, &timer_signal);
    qurt_timer_attr_set_signal_mask(&attr, TIMER_EXPIRED_SIGNAL);

    /* One-shot: fires once */
    qurt_timer_attr_set_type(&attr, QURT_TIMER_ONESHOT);

    /* Create and start the timer */
    qurt_timer_create(&my_timer, &attr);

    /* Wait for the timer to expire */
    qurt_signal_wait(&timer_signal,
                      TIMER_EXPIRED_SIGNAL,
                      QURT_SIGNAL_ATTR_WAIT_ANY);

    printf("Timer expired! 10ms have passed.\n");
    qurt_signal_clear(&timer_signal, TIMER_EXPIRED_SIGNAL);

    /* Clean up */
    qurt_timer_delete(my_timer);
    qurt_signal_destroy(&timer_signal);
}
```

This creates a one-shot timer that fires after 10 milliseconds. The timer is configured with an attributes structure that specifies the duration, the signal object to notify, the signal bitmask to set, and the timer type (`QURT_TIMER_ONESHOT`). When the timer expires, it sets the specified signal bit, which wakes up the thread blocked in `qurt_signal_wait()`. After handling the event, the thread clears the signal and cleans up the timer.

### Periodic Timer

```c :collapsed-lines
void periodic_timer_thread(void *arg)
{
    qurt_timer_t periodic_timer;
    qurt_signal_t periodic_signal;
    qurt_timer_attr_t attr;

    qurt_signal_init(&periodic_signal);
    qurt_timer_attr_init(&attr);

    /* Fire every 1 millisecond */
    qurt_timer_attr_set_duration(&attr,
        qurt_timer_convert_time_to_ticks(1000, QURT_TIME_USEC));
    qurt_timer_attr_set_signal(&attr, &periodic_signal);
    qurt_timer_attr_set_signal_mask(&attr, 0x01);
    qurt_timer_attr_set_type(&attr, QURT_TIMER_PERIODIC);

    qurt_timer_create(&periodic_timer, &attr);

    int iteration = 0;
    while (iteration < 1000) {
        qurt_signal_wait(&periodic_signal, 0x01,
                          QURT_SIGNAL_ATTR_WAIT_ANY);
        qurt_signal_clear(&periodic_signal, 0x01);

        /* This runs every 1ms */
        process_audio_frame(iteration);
        iteration++;
    }

    qurt_timer_delete(periodic_timer);
    qurt_signal_destroy(&periodic_signal);
    qurt_thread_exit(QURT_EOK);
}
```

The periodic timer uses `QURT_TIMER_PERIODIC` instead of `QURT_TIMER_ONESHOT`. It fires repeatedly at the specified interval. This example runs 1000 iterations at 1 ms intervals, processing one audio frame per tick. The signal must be cleared after each iteration, or the next `qurt_signal_wait()` will return immediately.

### Reading the Current Time

```c
void timing_example(void)
{
    unsigned long long start_ticks = qurt_sysclock_get_hw_ticks();

    heavy_computation();

    unsigned long long end_ticks = qurt_sysclock_get_hw_ticks();
    unsigned long long elapsed_ticks = end_ticks - start_ticks;

    unsigned long long elapsed_us =
        qurt_timer_convert_ticks_to_time(elapsed_ticks, QURT_TIME_USEC);

    printf("Computation took %llu microseconds\n", elapsed_us);
}
```

`qurt_sysclock_get_hw_ticks()` reads the hardware cycle counter, which provides the highest-resolution timing available on the DSP. `qurt_timer_convert_ticks_to_time()` converts raw ticks to human-readable units (microseconds in this case). Use this pattern to profile individual functions and identify performance bottlenecks.

---

## Interrupt Handling

On a DSP, interrupts are how hardware signals that it needs attention. QuRT provides a thread-based interrupt model that's more structured than bare-metal ISR handlers.

```c
#include <qurt.h>
#include <qurt_interrupt.h>

#define MY_SENSOR_IRQ      42
#define IRQ_SIGNAL         0x01

static qurt_signal_t irq_signal;

void sensor_isr_thread(void *arg)
{
    int irq = MY_SENSOR_IRQ;

    /* Register this thread as the handler for IRQ 42 */
    qurt_interrupt_register(irq, &irq_signal, IRQ_SIGNAL);

    printf("Sensor ISR thread ready, waiting for interrupts...\n");

    while (1) {
        /* Block until the hardware interrupt fires */
        unsigned int sigs = qurt_signal_wait(
            &irq_signal, IRQ_SIGNAL, QURT_SIGNAL_ATTR_WAIT_ANY);

        if (sigs & IRQ_SIGNAL) {
            qurt_signal_clear(&irq_signal, IRQ_SIGNAL);

            /* Read sensor data quickly */
            int sensor_value = read_sensor_register();

            /* Put data in a queue for the processing thread */
            enqueue_sensor_data(sensor_value);

            /* Signal the processing thread */
            qurt_signal_set(&processing_signal, DATA_READY);

            /* Re-enable the interrupt */
            qurt_interrupt_acknowledge(irq);
        }
    }
}
```

QuRT ISRs are different from bare-metal ISRs. They run in a dedicated thread context, which means you can use mutexes and signals inside them. But the ISR thread should still do minimal work: read the hardware register, enqueue the data, signal a processing thread, and acknowledge the interrupt. All expensive computation should happen in a separate, lower-priority processing thread.

```plaintext
Hardware IRQ
     │
     ▼
ISR Thread (high priority)     Processing Thread (medium priority)
┌──────────────────┐          ┌──────────────────────────┐
│ Read HW register │          │ Wait for DATA_READY      │
│ Enqueue data     │ ──────►  │ Dequeue data             │
│ Signal "ready"   │          │ Run FFT / filter / etc.  │
│ ACK interrupt    │          │ Write results            │
└──────────────────┘          └──────────────────────────┘
```
<!-- TODO: mermaid화 -->

This diagram shows the ISR offloading pattern. The ISR thread on the left handles the hardware interrupt with minimal latency: it reads the sensor register, enqueues the raw data, signals the processing thread, and acknowledges the interrupt so it can fire again. The processing thread on the right does the expensive work (FFT, filtering, ML inference) at a lower priority.

This design ensures that the ISR thread is always available to service the next hardware interrupt, even if the processing thread is still working on the previous sample.

---

## Pipes and Message Queues

QuRT provides built-in pipe support for safe, structured inter-thread communication. Pipes are fixed-size message queues with blocking send and receive operations.

```c :collapsed-lines
#include <qurt.h>
#include <qurt_pipe.h>

#define PIPE_ELEMENTS   16
#define ELEMENT_SIZE    sizeof(sensor_msg_t)

typedef struct {
    int sensor_id;
    int value;
    unsigned long long timestamp;
} sensor_msg_t;

/* Pipe buffer must be allocated by you */
static char pipe_buffer[PIPE_ELEMENTS * ELEMENT_SIZE]
    __attribute__((aligned(8)));

qurt_pipe_t sensor_pipe;

void pipe_init(void)
{
    qurt_pipe_attr_t attr;
    qurt_pipe_attr_init(&attr);
    qurt_pipe_attr_set_buffer(&attr, pipe_buffer);
    qurt_pipe_attr_set_buffer_partition(&attr, PIPE_ELEMENTS);
    qurt_pipe_attr_set_elements(&attr, PIPE_ELEMENTS);
    qurt_pipe_attr_set_element_size(&attr, ELEMENT_SIZE);

    qurt_pipe_create(&sensor_pipe, &attr);
}

/* Producer: send sensor data into the pipe */
void sensor_reader_thread(void *arg)
{
    while (1) {
        sensor_msg_t msg;
        msg.sensor_id = 1;
        msg.value = read_accelerometer();
        msg.timestamp = qurt_sysclock_get_hw_ticks();

        /* Blocking send: waits if pipe is full */
        qurt_pipe_send(&sensor_pipe, (char *)&msg, ELEMENT_SIZE);
    }
}

/* Consumer: receive sensor data from the pipe */
void data_processor_thread(void *arg)
{
    sensor_msg_t msg;

    while (1) {
        /* Blocking receive: waits if pipe is empty */
        qurt_pipe_receive(&sensor_pipe, (char *)&msg, ELEMENT_SIZE);

        printf("Sensor %d: value=%d at tick=%llu\n",
               msg.sensor_id, msg.value, msg.timestamp);

        process_sensor_reading(&msg);
    }
}
```

A QuRT pipe is configured with a statically allocated buffer, a number of elements, and an element size. Like stacks, the buffer memory is your responsibility. `qurt_pipe_send()` copies a message into the pipe and blocks if the pipe is full. `qurt_pipe_receive()` copies a message out and blocks if the pipe is empty. The pipe handles all internal synchronization, so you don't need a separate mutex.

Pipes are a natural fit for the sensor data pattern shown here: the reader thread samples hardware at a fixed rate and pushes messages into the pipe, while the processor thread pulls messages out and handles them. The pipe provides buffering and backpressure automatically.

---

## QuRT and FastRPC

In real Qualcomm devices, you rarely use QuRT alone. Your Android or Linux application on the ARM CPU offloads compute-intensive work to the DSP using **FastRPC** (Fast Remote Procedure Call). The following diagram shows the full pipeline:

```plaintext
┌───────────────────────────────────────────────────────────────┐
│                         ARM CPU Side                          │
│                                                               │
│   your_app.c                                                  │
│   ┌───────────────────────────────────────────────────┐       │
│   │  #include "my_dsp_module.h"  // auto-generated    │       │
│   │                                                   │       │
│   │  // This looks like a normal function call,       │       │
│   │  // but it actually executes on the DSP!          │       │
│   │  result = my_dsp_module_process_audio(            │       │
│   │      input_buffer, output_buffer, num_samples);   │       │
│   └───────────────────┬───────────────────────────────┘       │
│                       │ FastRPC                               │
└───────────────────────┼───────────────────────────────────────┘
            (crosses processor boundary)          
┌───────────────────────┼───────────────────────────────────────┐
│                       ▼                                       │
│                  DSP Side (QuRT)                              │
│   my_dsp_module_skel.c  // auto-generated skeleton            │
│   ┌───────────────────────────────────────────────────┐       │
│   │  int my_dsp_module_process_audio(                 │       │
│   │      const int16_t *input,                        │       │
│   │      int16_t *output,                             │       │
│   │      int num_samples)                             │       │
│   │  {                                                │       │
│   │      // This runs on the Hexagon DSP under QuRT   │       │
│   │      apply_noise_reduction(input, output,         │       │
│   │                             num_samples);         │       │
│   │      return 0;                                    │       │
│   │  }                                                │       │
│   └───────────────────────────────────────────────────┘       │
└───────────────────────────────────────────────────────────────┘
```

This diagram shows the FastRPC architecture. On the ARM CPU side, your application calls a function that appears to be a normal C function. Under the hood, FastRPC serializes the arguments, sends them across the processor boundary to the Hexagon DSP, executes the function under QuRT, and returns the result. The programmer experience is a transparent remote procedure call.

### Step 1: Define the Interface (IDL File)

Create a `.idl` file that describes the functions the ARM can call on the DSP:

```c title="my_dsp_module.idl"
/* my_dsp_module.idl */
#include "remote.idl"
#include "AEEStdDef.idl"

interface my_dsp_module {

    /* Simple computation */
    long process_audio(
        in sequence<short> input,
        rout sequence<short> output,
        in long num_samples
    );

    /* Matrix multiply offload */
    long matrix_multiply(
        in sequence<float> mat_a,
        in sequence<float> mat_b,
        rout sequence<float> result,
        in long rows_a,
        in long cols_a,
        in long cols_b
    );
};
```

The IDL (Interface Definition Language) file defines the cross-processor API. Each function specifies its parameters with direction qualifiers: `in` for data flowing from ARM to DSP, `rout` for data flowing from DSP back to ARM. The `sequence<type>` syntax specifies a variable-length array. The Hexagon SDK's IDL compiler generates stub code for the ARM side and skeleton code for the DSP side from this definition.

### Step 2: Implement the DSP Side

```c title="my_dsp_module_imp.c"
/* DSP implementation */

#include "my_dsp_module.h"
#include <qurt.h>
#include <stdio.h>

int my_dsp_module_process_audio(
    const int16_t *input, int input_len,
    int16_t *output, int output_len,
    int num_samples)
{
    if (!input || !output || num_samples <= 0) {
        return -1;
    }

    /* Invalidate cache: ARM wrote this data */
    qurt_mem_cache_clean((void *)input,
                          num_samples * sizeof(int16_t),
                          QURT_MEM_CACHE_INVALIDATE);

    /* Process on the DSP */
    for (int i = 0; i < num_samples; i++) {
        /* Simple noise gate */
        if (abs(input[i]) < 100) {
            output[i] = 0;
        } else {
            output[i] = input[i];
        }
    }

    /* Flush cache: ARM will read this data */
    qurt_mem_cache_clean(output,
                          num_samples * sizeof(int16_t),
                          QURT_MEM_CACHE_FLUSH);

    return 0;
}
```

The DSP implementation receives the input buffer that the ARM CPU wrote. Before reading it, the code invalidates the cache so the DSP sees the latest data from main memory rather than stale cache entries. After writing the output, the code flushes the cache so the ARM CPU sees the DSP's results. The actual processing (a simple noise gate in this example) runs between the cache operations.

### Step 3: Implement the ARM Side

```c :collapsed-lines title="main_arm.c"
/* ARM/Android application */

#include <stdio.h>
#include <stdlib.h>
#include <rpcmem.h>
#include "my_dsp_module.h"

int main(void)
{
    int num_samples = 1024;

    /* Use ION memory for zero-copy sharing with DSP */
    rpcmem_init();

    int16_t *input = (int16_t *)rpcmem_alloc(
        RPCMEM_HEAP_ID_SYSTEM,
        RPCMEM_DEFAULT_FLAGS,
        num_samples * sizeof(int16_t));

    int16_t *output = (int16_t *)rpcmem_alloc(
        RPCMEM_HEAP_ID_SYSTEM,
        RPCMEM_DEFAULT_FLAGS,
        num_samples * sizeof(int16_t));

    if (!input || !output) {
        printf("rpcmem_alloc failed!\n");
        return -1;
    }

    /* Fill input with audio data */
    for (int i = 0; i < num_samples; i++) {
        input[i] = (int16_t)(i % 256);
    }

    /* This call goes to the DSP via FastRPC */
    int result = my_dsp_module_process_audio(
        input, num_samples,
        output, num_samples,
        num_samples);

    if (result != 0) {
        printf("DSP processing failed: %d\n", result);
    } else {
        printf("DSP processing succeeded!\n");
        printf("First 10 output samples: ");
        for (int i = 0; i < 10; i++) {
            printf("%d ", output[i]);
        }
        printf("\n");
    }

    rpcmem_free(input);
    rpcmem_free(output);
    rpcmem_deinit();

    return 0;
}
```

The ARM side uses `rpcmem_alloc()` to allocate ION memory, which is a shared memory region accessible by both the ARM CPU and the Hexagon DSP without copying. The call to `my_dsp_module_process_audio()` looks like a normal function call, but FastRPC transparently routes it to the DSP. When the call returns, the output buffer contains the DSP's results.

### Building the Complete Project

A FastRPC project requires two SCons builds: one for the ARM CPU side and one for the Hexagon DSP side. Each side has its own `.min` file (`android.min` and `hexagon.min`), and both are processed by the SDK's `SConstruct`.

```sh
cd $HEXAGON_SDK_ROOT

# Build for ARM target (Android) via make wrapper
make V=android_Release tree=my_dsp_module

# Build for Hexagon DSP via make wrapper
make V=hexagon_Release_dynamic_toolv84_v66 tree=my_dsp_module

# Or invoke SCons directly for both variants
python tools/build/scons/scons.py \
    V=android_Release \
    V=hexagon_Release_dynamic_toolv84_v66 \
    my_dsp_module

# Push to device
adb push android_Release/ship/my_dsp_module /data/local/tmp/
adb push hexagon_Release_dynamic_toolv84_v66/ship/libmy_dsp_module_skel.so \
    /data/local/tmp/

# Run it
adb shell "cd /data/local/tmp && ./my_dsp_module"
```

The build produces two outputs: an ARM executable (compiled from the stub and your `main_arm.c`) and a Hexagon shared library (the `_skel.so` file, compiled from your DSP implementation). SCons handles the IDL compilation step automatically: it detects the `.idl` file, generates the stub and skeleton C source files, and includes them in the appropriate variant build. Both outputs are pushed to the device.

When the ARM executable runs and calls a FastRPC function, the system loads the skeleton library onto the DSP and routes the call through.

---

## Building a Sensor Fusion Pipeline

This section brings together threads, synchronization, timers, and signals into a complete, realistic QuRT application. The pipeline reads from three simulated sensors (accelerometer, gyroscope, magnetometer), fuses the data using a complementary filter, and reports orientation at 100 Hz.

```c :collapsed-lines title="sensor_fusion.c"
/*
 * Multi-sensor fusion pipeline on QuRT
 *
 * Architecture:
 *   [Accel ISR] ──► [Fusion Thread] ──► [Report Thread]
 *   [Gyro ISR]  ──►       ▲
 *   [Mag ISR]   ──►       │
 *                    [Timer Thread]
 *                    (triggers fusion every 10ms)
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <qurt.h>
#include <qurt_timer.h>

/* Configuration */
#define STACK_SIZE          8192
#define FUSION_PERIOD_US    10000   /* 10ms = 100Hz fusion rate */
#define QUEUE_DEPTH         32

/* Data types */
typedef struct {
    float x, y, z;
    unsigned long long timestamp;
} vec3_sample_t;

typedef struct {
    vec3_sample_t accel;
    vec3_sample_t gyro;
    vec3_sample_t mag;
    float roll, pitch, yaw;
} fused_state_t;

/* Thread stacks */
static char accel_stack[STACK_SIZE]  __attribute__((aligned(8)));
static char gyro_stack[STACK_SIZE]   __attribute__((aligned(8)));
static char mag_stack[STACK_SIZE]    __attribute__((aligned(8)));
static char fusion_stack[STACK_SIZE] __attribute__((aligned(8)));
static char report_stack[STACK_SIZE] __attribute__((aligned(8)));

/* Shared state */
static vec3_sample_t latest_accel;
static vec3_sample_t latest_gyro;
static vec3_sample_t latest_mag;
static fused_state_t latest_fused;

static qurt_mutex_t sensor_mutex;
static qurt_mutex_t fused_mutex;
static qurt_signal_t fusion_signal;
static qurt_signal_t report_signal;

#define SIG_FUSION_TICK    0x01
#define SIG_NEW_FUSED_DATA 0x01
#define SIG_SHUTDOWN       0x80

static volatile int running = 1;

/* Simulated sensor reads */
static void read_accelerometer(vec3_sample_t *sample)
{
    sample->x = 0.01f;
    sample->y = 0.02f;
    sample->z = 9.81f;
    sample->timestamp = qurt_sysclock_get_hw_ticks();
}

static void read_gyroscope(vec3_sample_t *sample)
{
    sample->x = 0.001f;
    sample->y = -0.002f;
    sample->z = 0.0005f;
    sample->timestamp = qurt_sysclock_get_hw_ticks();
}

static void read_magnetometer(vec3_sample_t *sample)
{
    sample->x = 25.0f;
    sample->y = -5.0f;
    sample->z = 40.0f;
    sample->timestamp = qurt_sysclock_get_hw_ticks();
}

/* Accelerometer thread */
void accel_thread(void *arg)
{
    printf("[Accel] Thread started\n");

    while (running) {
        vec3_sample_t sample;
        read_accelerometer(&sample);

        qurt_mutex_lock(&sensor_mutex);
        latest_accel = sample;
        qurt_mutex_unlock(&sensor_mutex);

        /* ~400Hz sample rate */
        qurt_timer_sleep(2500);
    }

    printf("[Accel] Thread exiting\n");
    qurt_thread_exit(QURT_EOK);
}

/* Gyroscope thread */
void gyro_thread(void *arg)
{
    printf("[Gyro] Thread started\n");

    while (running) {
        vec3_sample_t sample;
        read_gyroscope(&sample);

        qurt_mutex_lock(&sensor_mutex);
        latest_gyro = sample;
        qurt_mutex_unlock(&sensor_mutex);

        /* 1kHz sample rate */
        qurt_timer_sleep(1000);
    }

    printf("[Gyro] Thread exiting\n");
    qurt_thread_exit(QURT_EOK);
}

/* Magnetometer thread */
void mag_thread(void *arg)
{
    printf("[Mag] Thread started\n");

    while (running) {
        vec3_sample_t sample;
        read_magnetometer(&sample);

        qurt_mutex_lock(&sensor_mutex);
        latest_mag = sample;
        qurt_mutex_unlock(&sensor_mutex);

        /* 100Hz sample rate */
        qurt_timer_sleep(10000);
    }

    printf("[Mag] Thread exiting\n");
    qurt_thread_exit(QURT_EOK);
}

/* Simplified complementary filter */
static void compute_orientation(
    const vec3_sample_t *accel,
    const vec3_sample_t *gyro,
    const vec3_sample_t *mag,
    fused_state_t *state)
{
    float dt = 0.01f;

    float accel_roll = atan2f(accel->y, accel->z) * 57.2958f;
    float accel_pitch = atan2f(-accel->x,
        sqrtf(accel->y * accel->y + accel->z * accel->z)) * 57.2958f;

    /* Trust gyro short-term, accel long-term */
    state->roll = 0.98f * (state->roll + gyro->x * dt * 57.2958f)
                + 0.02f * accel_roll;
    state->pitch = 0.98f * (state->pitch + gyro->y * dt * 57.2958f)
                 + 0.02f * accel_pitch;

    state->yaw = atan2f(mag->y, mag->x) * 57.2958f;

    state->accel = *accel;
    state->gyro = *gyro;
    state->mag = *mag;
}

/* Fusion thread (runs every 10ms) */
void fusion_thread(void *arg)
{
    qurt_timer_t fusion_timer;
    qurt_timer_attr_t timer_attr;

    printf("[Fusion] Thread started\n");

    qurt_timer_attr_init(&timer_attr);
    qurt_timer_attr_set_duration(&timer_attr,
        qurt_timer_convert_time_to_ticks(FUSION_PERIOD_US,
                                          QURT_TIME_USEC));
    qurt_timer_attr_set_signal(&timer_attr, &fusion_signal);
    qurt_timer_attr_set_signal_mask(&timer_attr, SIG_FUSION_TICK);
    qurt_timer_attr_set_type(&timer_attr, QURT_TIMER_PERIODIC);

    qurt_timer_create(&fusion_timer, &timer_attr);

    while (running) {
        unsigned int sigs = qurt_signal_wait(
            &fusion_signal,
            SIG_FUSION_TICK | SIG_SHUTDOWN,
            QURT_SIGNAL_ATTR_WAIT_ANY);

        if (sigs & SIG_SHUTDOWN) break;

        qurt_signal_clear(&fusion_signal, SIG_FUSION_TICK);

        /* Snapshot sensor data under lock */
        vec3_sample_t a, g, m;
        qurt_mutex_lock(&sensor_mutex);
        a = latest_accel;
        g = latest_gyro;
        m = latest_mag;
        qurt_mutex_unlock(&sensor_mutex);

        /* Run the fusion algorithm (no lock needed, local data) */
        fused_state_t state;
        qurt_mutex_lock(&fused_mutex);
        state = latest_fused;
        qurt_mutex_unlock(&fused_mutex);

        compute_orientation(&a, &g, &m, &state);

        /* Publish fused result */
        qurt_mutex_lock(&fused_mutex);
        latest_fused = state;
        qurt_mutex_unlock(&fused_mutex);

        /* Notify reporter */
        qurt_signal_set(&report_signal, SIG_NEW_FUSED_DATA);
    }

    qurt_timer_delete(fusion_timer);
    printf("[Fusion] Thread exiting\n");
    qurt_thread_exit(QURT_EOK);
}

/* Reporting thread */
void report_thread(void *arg)
{
    int report_count = 0;

    printf("[Report] Thread started\n");

    while (running) {
        unsigned int sigs = qurt_signal_wait(
            &report_signal,
            SIG_NEW_FUSED_DATA | SIG_SHUTDOWN,
            QURT_SIGNAL_ATTR_WAIT_ANY);

        if (sigs & SIG_SHUTDOWN) break;

        qurt_signal_clear(&report_signal, SIG_NEW_FUSED_DATA);

        fused_state_t state;
        qurt_mutex_lock(&fused_mutex);
        state = latest_fused;
        qurt_mutex_unlock(&fused_mutex);

        /* Report every 100th update (once per second at 100Hz) */
        if (++report_count % 100 == 0) {
            printf("[Report] Orientation - Roll: %.2f  Pitch: %.2f  "
                   "Yaw: %.2f  (update #%d)\n",
                   state.roll, state.pitch, state.yaw, report_count);
        }
    }

    printf("[Report] Thread exiting\n");
    qurt_thread_exit(QURT_EOK);
}

/* Main */
int main(void)
{
    qurt_thread_t threads[5];
    qurt_thread_attr_t attr;
    int status;

    printf("=== Sensor Fusion Pipeline Starting ===\n");

    /* Initialize synchronization primitives */
    qurt_mutex_init(&sensor_mutex);
    qurt_mutex_init(&fused_mutex);
    qurt_signal_init(&fusion_signal);
    qurt_signal_init(&report_signal);
    memset(&latest_fused, 0, sizeof(latest_fused));

    struct {
        const char *name;
        char *stack;
        int priority;
        void (*func)(void *);
    } thread_configs[] = {
        {"accel_reader", accel_stack,  60, accel_thread},
        {"gyro_reader",  gyro_stack,   60, gyro_thread},
        {"mag_reader",   mag_stack,    70, mag_thread},
        {"fusion",       fusion_stack, 80, fusion_thread},
        {"reporter",     report_stack, 120, report_thread},
    };

    /* Create all threads */
    for (int i = 0; i < 5; i++) {
        qurt_thread_attr_init(&attr);
        qurt_thread_attr_set_name(&attr, thread_configs[i].name);
        qurt_thread_attr_set_stack_addr(&attr, thread_configs[i].stack);
        qurt_thread_attr_set_stack_size(&attr, STACK_SIZE);
        qurt_thread_attr_set_priority(&attr, thread_configs[i].priority);

        int result = qurt_thread_create(&threads[i], &attr,
                                         thread_configs[i].func, NULL);
        if (result != QURT_EOK) {
            printf("Failed to create thread '%s': %d\n",
                   thread_configs[i].name, result);
            return -1;
        }
        printf("Created thread '%s' (priority %d)\n",
               thread_configs[i].name, thread_configs[i].priority);
    }

    /* Let it run for 10 seconds */
    printf("Pipeline running for 10 seconds...\n");
    qurt_timer_sleep(10000000);

    /* Shutdown */
    printf("Shutting down...\n");
    running = 0;
    qurt_signal_set(&fusion_signal, SIG_SHUTDOWN);
    qurt_signal_set(&report_signal, SIG_SHUTDOWN);

    /* Wait for all threads to finish */
    for (int i = 0; i < 5; i++) {
        qurt_thread_join(threads[i], &status);
    }

    /* Clean up */
    qurt_mutex_destroy(&sensor_mutex);
    qurt_mutex_destroy(&fused_mutex);
    qurt_signal_destroy(&fusion_signal);
    qurt_signal_destroy(&report_signal);

    printf("=== Sensor Fusion Pipeline Complete ===\n");
    return 0;
}
```

This pipeline demonstrates several QuRT patterns working together.

Three sensor reader threads run at the highest priority (60 for accel and gyro, 70 for the slower magnetometer) and continuously write the latest samples into shared state under a mutex.

A fusion thread, triggered by a periodic timer every 10 ms, snapshots all three sensor readings, runs a complementary filter to compute roll, pitch, and yaw, and publishes the fused result.

A reporting thread at the lowest priority (120) receives a signal each time new fused data is available and logs orientation once per second.

### Priority Assignment

```plaintext
Priority 60:  Sensor readers (highest priority, never miss hardware data)
Priority 80:  Fusion engine (runs every 10ms, must finish quickly)
Priority 120: Reporter (lowest priority, only logging)
```

The priority assignments follow a strict rule: threads closer to hardware get higher priority. If the fusion thread takes too long, the reporter waits. That's acceptable because a delayed log message has no real-time consequence. If a sensor read gets delayed, the fusion algorithm operates on stale data.

In a real application controlling a drone or robot, stale IMU data means incorrect orientation estimates, which can lead to physical failures.

---

## Debugging QuRT Applications

QuRT debugging is more limited than Linux debugging. There's no `gdb` with a TUI, and error messages from crashes are often unhelpful. The following techniques form a practical debugging toolkit.

### Printf Debugging

```c
#include <stdio.h>

void debug_example(void)
{
    printf("[%s:%d] value = %d\n", __func__, __LINE__, some_var);
}
```

QuRT supports `printf` through a semi-hosting mechanism. On the simulator, output goes to stdout. On hardware, it goes to a DIAG buffer (similar to Android's logcat). This is the most common debugging technique in QuRT development.

### QuRT Error Codes

```c
switch (result) {
    case QURT_EOK:
        break;
    case QURT_EINVALID:
        printf("Invalid argument\n");
        break;
    case QURT_EFAILED:
        printf("General failure\n");
        break;
    case QURT_EMEM:
        printf("Out of memory\n");
        break;
    case QURT_ENOTALLOWED:
        printf("Operation not allowed (check permissions)\n");
        break;
    case QURT_ETIMEOUT:
        printf("Operation timed out\n");
        break;
    default:
        printf("Unknown error: %d\n", result);
}
```

Always check return values from QuRT API calls. These are the error codes you'll encounter most frequently.

`QURT_EINVALID` usually means a bad parameter (unaligned stack, null pointer, out-of-range priority). `QURT_EMEM` means the kernel ran out of memory for internal structures. `QURT_ENOTALLOWED` often indicates a permissions issue on hardware.

### Thread State Inspection

```c
void dump_thread_info(void)
{
    qurt_thread_t tid = qurt_thread_get_id();
    char name[QURT_THREAD_ATTR_NAME_MAXLEN];

    qurt_thread_get_name(name, sizeof(name));

    printf("Thread: %s (ID: %lu)\n", name, tid);
}
```

This function prints the current thread's name and ID, which is useful when you have multiple threads writing to the same log output and need to distinguish which thread produced each message.

### Stack Overflow Detection

```c
#define STACK_CANARY 0xDEADBEEF

static char my_stack[STACK_SIZE] __attribute__((aligned(8)));

void init_stack_canary(void)
{
    /* Write canary at the bottom of the stack */
    ((unsigned int *)my_stack)[0] = STACK_CANARY;
    ((unsigned int *)my_stack)[1] = STACK_CANARY;
}

void check_stack_canary(void)
{
    if (((unsigned int *)my_stack)[0] != STACK_CANARY ||
        ((unsigned int *)my_stack)[1] != STACK_CANARY) {
        printf("STACK OVERFLOW DETECTED!\n");
    }
}
```

QuRT doesn't detect stack overflows. This canary pattern writes a known value at the bottom of the stack before the thread starts. If the stack grows downward past its bounds, it overwrites the canary value. Periodically checking the canary (or checking it on thread exit) catches overflows that would otherwise manifest as mysterious, unrelated crashes.

### Using the Hexagon Simulator

```sh
# Run with instruction tracing
hexagon-sim --timing --pmu_statsfile stats.txt \
--cosim_file osam.cfg \
-- bootimg.pbn -- my_app.so

# The stats file gives you:
# - Total cycles
# - Cache hit/miss rates
# - Stall cycles
# - Instructions per cycle (IPC)
```

The `--timing` flag enables cycle-accurate simulation, and `--pmu_statsfile` writes performance counter data to a file. The stats file reports total cycles, cache hit and miss rates, stall cycles, and instructions per cycle (IPC). This data is essential for identifying whether your bottleneck is compute-bound, memory-bound, or stall-bound.

---

## Common Pitfalls

### Pitfall 1: Forgetting to Exit Threads

```c
/* BAD: thread function returns without exit */
void bad_thread(void *arg) {
    do_work();
    return;  /* CRASH or undefined behavior */
}

/* GOOD */
void good_thread(void *arg) {
    do_work();
    qurt_thread_exit(QURT_EOK);
}
```

A QuRT thread that returns from its entry function without calling `qurt_thread_exit()` causes undefined behavior. The kernel set the link register to `qurt_thread_exit` as a safety net during thread creation, but you shouldn't rely on this. Always call `qurt_thread_exit()` explicitly.

### Pitfall 2: Stack Allocated in Wrong Scope

```c
/* BAD: stack is on the calling thread's stack */
void create_thread_bad(void) {
    char stack[4096];
    qurt_thread_attr_set_stack_addr(&attr, stack);
    qurt_thread_create(&tid, &attr, func, NULL);
}   /* stack disappears here, new thread crashes */

/* GOOD: use static or heap allocation */
static char stack[4096] __attribute__((aligned(8)));
void create_thread_good(void) {
    qurt_thread_attr_set_stack_addr(&attr, stack);
    qurt_thread_create(&tid, &attr, func, NULL);
}
```

The stack memory must outlive the thread that uses it. If you allocate the stack as a local variable in a function, it's freed when that function returns, but the thread may still be running. Use static allocation (as shown) or heap allocation with careful lifetime management.

### Pitfall 3: Priority Inversion Without Awareness

```c
/* BAD: manual spinlock, no priority inheritance */
volatile int lock = 0;
while (__sync_lock_test_and_set(&lock, 1)) { /* spin */ }

/* GOOD: QuRT mutex with priority inheritance */
qurt_mutex_lock(&my_mutex);
```

If a high-priority thread spins on a manual spinlock held by a low-priority thread, and a medium-priority thread preempts the lock holder, the high-priority thread is effectively blocked by the medium-priority thread.

QuRT mutexes solve this with automatic priority inheritance: the lock holder is temporarily boosted to the priority of the highest-priority waiter. Manual spinlocks don't get this treatment.

### Pitfall 4: Unaligned Memory

```c
/* BAD */
char stack[4096];

/* GOOD */
char stack[4096] __attribute__((aligned(8)));

/* For DMA buffers, you often need 256-byte alignment */
char dma_buffer[1024] __attribute__((aligned(256)));
```

Thread stacks must be 8-byte aligned. DMA buffers typically require 256-byte alignment. Unaligned memory causes hard faults on the Hexagon architecture that produce minimal diagnostic output.

### Pitfall 5: Blocking in ISR Context

```c
/* BAD: mutex_lock may block indefinitely */
void isr_handler(void *arg) {
    qurt_mutex_lock(&some_mutex);
    qurt_mutex_unlock(&some_mutex);
}

/* GOOD: non-blocking try_lock with fallback */
void isr_handler(void *arg) {
    if (qurt_mutex_try_lock(&some_mutex) == QURT_EOK) {
        /* Quick update */
        qurt_mutex_unlock(&some_mutex);
    } else {
        /* Defer to processing thread */
        qurt_signal_set(&deferred_signal, DEFERRED_WORK);
    }
}
```

Although QuRT ISR threads can technically call blocking APIs, doing so in a high-priority interrupt handler freezes interrupt processing until the blocking condition is resolved. Use `qurt_mutex_try_lock()` for non-blocking attempts, and defer work to a lower-priority thread using signals if the lock is unavailable.

---

## Performance Optimization

### Using HVX (Hexagon Vector Extensions)

```c
#include <hexagon_types.h>
#include <hvx_hexagon_protos.h>

/* Process 128 bytes at once with HVX */
void vectorized_gain(int16_t *audio, int num_samples, int16_t gain)
{
    HVX_Vector *vptr = (HVX_Vector *)audio;
    HVX_Vector vgain = Q6_Vh_vsplat_R(gain);
    int num_vectors = num_samples * sizeof(int16_t) / sizeof(HVX_Vector);

    for (int i = 0; i < num_vectors; i++) {
        vptr[i] = Q6_Vh_vmpy_VhVh_sat(vptr[i], vgain);
    }
}
```

HVX provides 128-byte SIMD operations on the Hexagon DSP. The `Q6_Vh_vsplat_R` intrinsic broadcasts a scalar value across all lanes of a vector register. `Q6_Vh_vmpy_VhVh_sat` performs a saturating multiply of two half-word vectors. A single HVX instruction processes 64 16-bit samples, which can yield an order-of-magnitude speedup over scalar code for audio and signal processing workloads.

### Locking L2 Cache for Hot Data

```c
void lock_cache_example(void)
{
    extern float fft_twiddle_factors[];
    size_t twiddle_size = 1024 * sizeof(float);

    /* Pin data in L2 to prevent eviction */
    qurt_mem_l2cache_lock((unsigned int)fft_twiddle_factors,
                           twiddle_size);

    /* When done: */
    qurt_mem_l2cache_unlock((unsigned int)fft_twiddle_factors,
                             twiddle_size);
}
```

`qurt_mem_l2cache_lock()` pins a memory region in the L2 cache, preventing it from being evicted by other cache traffic. This is useful for lookup tables and constant data that are accessed frequently in hot loops (such as FFT twiddle factors).

Locking too much data in L2 reduces the cache available for other threads, so use this technique selectively.

### Avoiding Dynamic Memory in Hot Paths

```c
/* BAD: malloc in the audio processing loop */
void process_audio_bad(void) {
    while (1) {
        float *temp = malloc(1024 * sizeof(float));
        process(temp);
        free(temp);
    }
}

/* GOOD: pre-allocate everything */
static float temp_buffer[1024];
void process_audio_good(void) {
    while (1) {
        process(temp_buffer);
    }
}
```

`malloc` and `free` have non-deterministic execution time because they may traverse free lists, split or coalesce blocks, and in the worst case, request additional memory from the kernel.

In a real-time audio processing loop running at 48 kHz, a single slow allocation can cause an audible glitch. Pre-allocate all buffers during initialization and reuse them.

---

## API Quick Reference

```plaintext
┌─────────────────────────────────────────────────────────────────┐
│                    QuRT API Quick Reference                     │
├─────────────────┬───────────────────────────────────────────────┤
│ THREADS         │                                               │
│  create         │ qurt_thread_create(&id, &attr, func, arg)     │
│  exit           │ qurt_thread_exit(status)                      │
│  join           │ qurt_thread_join(id, &status)                 │
│  get id         │ qurt_thread_get_id()                          │
│  sleep          │ qurt_timer_sleep(usec)                        │
├─────────────────┼───────────────────────────────────────────────┤
│ MUTEX           │                                               │
│  init           │ qurt_mutex_init(&mutex)                       │
│  lock           │ qurt_mutex_lock(&mutex)                       │
│  try lock       │ qurt_mutex_try_lock(&mutex)                   │
│  unlock         │ qurt_mutex_unlock(&mutex)                     │
│  destroy        │ qurt_mutex_destroy(&mutex)                    │
├─────────────────┼───────────────────────────────────────────────┤
│ SIGNALS         │                                               │
│  init           │ qurt_signal_init(&signal)                     │
│  wait           │ qurt_signal_wait(&sig, mask, attr)            │
│  set            │ qurt_signal_set(&signal, mask)                │
│  clear          │ qurt_signal_clear(&signal, mask)              │
│  destroy        │ qurt_signal_destroy(&signal)                  │
├─────────────────┼───────────────────────────────────────────────┤
│ TIMERS          │                                               │
│  create         │ qurt_timer_create(&timer, &attr)              │
│  delete         │ qurt_timer_delete(timer)                      │
│  sleep          │ qurt_timer_sleep(usec)                        │
│  ticks          │ qurt_sysclock_get_hw_ticks()                  │
├─────────────────┼───────────────────────────────────────────────┤
│ MEMORY          │                                               │
│  cache flush    │ qurt_mem_cache_clean(addr, sz, FLUSH)         │
│  cache inval    │ qurt_mem_cache_clean(addr, sz, INVALIDATE)    │
│  l2 lock        │ qurt_mem_l2cache_lock(addr, size)             │
│  l2 unlock      │ qurt_mem_l2cache_unlock(addr, size)           │
├─────────────────┼───────────────────────────────────────────────┤
│ SEMAPHORE       │                                               │
│  init           │ qurt_sem_init_val(&sem, count)                │
│  down (wait)    │ qurt_sem_down(&sem)                           │
│  up (post)      │ qurt_sem_up(&sem)                             │
│  destroy        │ qurt_sem_destroy(&sem)                        │
├─────────────────┼───────────────────────────────────────────────┤
│ BARRIER         │                                               │
│  init           │ qurt_barrier_init(&barrier, count)            │
│  wait           │ qurt_barrier_wait(&barrier)                   │
│  destroy        │ qurt_barrier_destroy(&barrier)                │
└─────────────────┴───────────────────────────────────────────────┘
```

This table lists the most commonly used QuRT API functions organized by category. The left column names the operation and the right column shows the function signature.

- Thread operations cover creation, termination, joining, and sleeping.
- Mutex operations provide lock, try-lock, and unlock.
- Signal operations support wait, set, and clear with bitmask-based notifications. Timer operations handle creation, deletion, and sleeping, plus reading the hardware tick counter.
- Memory operations cover cache flush and invalidate (essential for cross-processor buffers) and L2 cache locking for performance-critical data.
- Semaphore and barrier operations round out the synchronization primitives.

---

## Next Steps

This handbook covered the fundamentals of QuRT programming: thread management, synchronization, memory, timers, interrupts, pipes, FastRPC, and a multi-sensor fusion pipeline. The next steps for deeper learning follow a natural progression.

Start by downloading the Hexagon SDK and running the included example projects on the simulator. The examples in `$HEXAGON_SDK_ROOT/examples/` demonstrate real ARM-DSP communication patterns through FastRPC and are the best way to see complete, working projects.

Read the QuRT User Guide in `$HEXAGON_SDK_ROOT/docs/`. It covers every API discussed in this article in full detail, plus many that weren't covered (such as QuRT's TLB management and power management interfaces).

Experiment with HVX, the Hexagon Vector Extensions. HVX is where the real performance of the Hexagon DSP lives, and learning to write vectorized DSP code is the single largest performance lever available to you.

Finally, get a development board (such as the Qualcomm RB5) and run your code on real hardware. The simulator validates correctness, but only real hardware reveals timing behavior, cache effects, and the interaction between your code and other software running on the DSP.

### Recommended Reading

The Hexagon SDK Documentation is located at `\(HEXAGON_SDK_ROOT/docs/`. The QuRT API Reference is at `\)HEXAGON_SDK_ROOT/docs/qurt/`. The Qualcomm Developer Network at developer.qualcomm.com provides additional resources, forums, and application notes. The Hexagon DSP Architecture Reference is the definitive guide to the hardware itself.

QuRT is a precision instrument. It won't hold your hand, but it gives you microsecond-level control over real-time processing on one of the most powerful DSP architectures in the world. The learning curve is steep, but once you are past it, you will understand why billions of devices trust this tiny OS with their most time-critical tasks.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "QuRT: The Real-Time OS Inside Your Phone's Processor [Full Handbook]",
  "desc": "The Hexagon DSP in every Qualcomm-powered phone handles wake word detection, sensor processing, noise cancellation, and Bluetooth audio streaming – all while the main ARM CPU runs Android. The operati",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/qurt-the-real-time-os-inside-your-phone-s-processor-full-handbook.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
