---
lang: en-US
title: "ITCM vs DTCM vs DDR: Embedded Memory Types Explained [Full Handbook]"
description: "Article(s) > ITCM vs DTCM vs DDR: Embedded Memory Types Explained [Full Handbook]"
icon: iconfont icon-c
category:
  - Python
  - C
  - Hardware
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
  - c
  - clang
  - hw
  - hardware
head:
  - - meta:
    - property: og:title
      content: "Article(s) > ITCM vs DTCM vs DDR: Embedded Memory Types Explained [Full Handbook]"
    - property: og:description
      content: "ITCM vs DTCM vs DDR: Embedded Memory Types Explained [Full Handbook]"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/itcm-vs-dtcm-vs-ddr-embedded-memory-types-explained-handbook.html
prev: /programming/c/articles/README.md
date: 2026-05-07
isOriginal: false
author:
  - name: Nikheel Vishwas Savant
    url: https://freecodecamp.org/news/author/nsavant/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/66013473-45d1-4f6f-87f4-727bf75e0c5e.png
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
  name="ITCM vs DTCM vs DDR: Embedded Memory Types Explained [Full Handbook]"
  desc="Most embedded engineers hit this problem early on: the same code on the same processor runs fast in one scenario and surprisingly slow in another. The culprit is almost always where the code and data "
  url="https://freecodecamp.org/news/itcm-vs-dtcm-vs-ddr-embedded-memory-types-explained-handbook"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/66013473-45d1-4f6f-87f4-727bf75e0c5e.png"/>

Most embedded engineers hit this problem early on: the same code on the same processor runs fast in one scenario and surprisingly slow in another. The culprit is almost always *where* the code and data are stored in memory.

Desktop and server processors hide memory latency behind multi-level caches. Many embedded processors, especially ARM Cortex-M and Cortex-R based chips, take a different approach. They give you direct control over multiple memory regions, each with very different performance characteristics.

This handbook covers what ITCM, DTCM, and DDR memory are, how they differ, how to place code and data in the right region, and how to profile and monitor firmware memory usage over time.

::: note Prerequisites

To get the most from this guide, you should have a basic understanding of C programming, including pointers, structs, and the difference between static and local variables.

Some familiarity with embedded development concepts like compiling, linking, and flashing firmware to a target board will also help.

Finally, a general sense of how a CPU fetches and executes instructions will make the performance discussions easier to follow.

You don't need to be an expert in any of these. The article explains each concept as it comes up.

:::

---

## Why Embedded Memory Architecture Matters

A modern embedded processor might be clocked at 400 MHz or higher. It can execute an instruction every few nanoseconds.

But when it needs to fetch that instruction from memory, or read a variable, the memory might not keep up. The processor ends up stalling, waiting for the memory subsystem to deliver the data it asked for. Those stall cycles add up fast.

On a desktop computer, hardware caches (L1, L2, L3) sit between the CPU and main memory, automatically keeping recently-used data nearby. The cache hardware decides what to keep and what to evict, and it does this transparently. The programmer rarely needs to think about it, and performance is generally good enough without manual intervention.

On many embedded processors, the situation is different. Instead of hardware caches, you get **three distinct memory regions**, each attached to the CPU in a different way.

| Memory Type | What It Stores | Access Speed | Typical Size |
| --- | --- | --- | --- |
| **ITCM** | Instructions (executable code) | Single-cycle (deterministic) | 512 KB to 2 MB |
| **DTCM** | Data (variables, stacks, buffers) | Single-cycle (deterministic) | 512 KB to 1.5 MB |
| **DDR** | Everything else | Multi-cycle (variable) | 4 MB to several GB |

The table above shows the three memory types you'll encounter on a typical ARM Cortex-M or Cortex-R-based embedded system. ITCM and DTCM are fast but small. DDR is slow but large.

The "deterministic" label on TCM means that the access time is always the same, every single time, regardless of what accessed that memory before or what else is happening on the chip. The "variable" label on DDR means the access time can change depending on the internal state of the DDR chip and its controller.

You, the developer, control which region each piece of your firmware lives in. The compiler and linker don't make these decisions automatically. You specify them through section attributes in your source code and placement rules in your linker script. Getting this right is often the difference between firmware that meets its real-time deadlines and firmware that misses them.

---

## What is ITCM (Instruction Tightly-Coupled Memory)?

ITCM stands for **Instruction Tightly-Coupled Memory**.

The "Instruction" part means this memory is used for storing executable machine code, the compiled instructions your CPU fetches and runs.

The "Tightly-Coupled" part means the memory is physically located on the same silicon die as the CPU core, connected through a dedicated bus with no arbitration or contention. There's no shared bus to compete with. There's no cache hierarchy to traverse. The CPU asks for an instruction, and ITCM delivers it directly, through a private path that nothing else on the chip can interfere with.

The CPU can fetch an instruction from ITCM in a **single clock cycle, every time**. This access time is both fast and deterministic. It doesn't vary based on access patterns, recent history, or what else is happening on the bus.

This determinism is just as important as the raw speed, because it makes worst-case execution time analysis possible. In safety-critical systems, you need to be able to *prove* that a function will always complete within a certain number of cycles. ITCM makes that proof much simpler.

### Why Single-Cycle Fetch Matters

Every line of C code compiles down to one or more machine instructions. Each of those instructions must be fetched from memory before the CPU can decode and execute it. This fetch step happens for every single instruction, so even small per-instruction delays compound rapidly in loops and frequently-called functions.

Consider a loop that runs 1,000,000 iterations, where each iteration involves 10 instruction fetches. That's 10 million fetches total.

```plaintext
ITCM:  10,000,000 fetches x 1 cycle  = 10,000,000 cycles
DDR:   10,000,000 fetches x 8 cycles = 80,000,000 cycles

Difference: 70,000,000 cycles
At 400 MHz: 70,000,000 / 400,000,000 = 0.175 seconds = 175 ms
```

This calculation compares the total cycle count when the same loop runs from ITCM versus DDR. With ITCM, each fetch takes 1 cycle, so 10 million fetches cost 10 million cycles.

With DDR, each fetch takes 8 cycles (a conservative average), so the same 10 million fetches cost 80 million cycles. The difference is 70 million cycles, which at 400 MHz translates to 175 milliseconds.

In a real-time system running a control loop at 1 kHz (one iteration every 1 ms), 175 ms of extra latency spread across your processing isn't a minor inconvenience. It can cause the system to miss deadlines, drop sensor readings, or produce incorrect outputs. In motor control applications, a missed deadline can mean physical damage to the hardware. In audio processing, it means audible glitches. The cost of slow instruction fetch isn't abstract.

### What Should Go in ITCM?

Because ITCM is small (typically 512 KB to 2 MB), you can't fit your entire firmware in it. You need to be selective about what earns a spot.

**Interrupt Service Routines (ISRs)** are the highest-priority candidates. ISRs run in response to hardware events like a timer tick, an ADC conversion completing, or a communication peripheral receiving data. They need to execute and return as quickly as possible.

A slow ISR delays all lower-priority interrupts and can cause missed events. If your ISR fetches its instructions from DDR, each fetch takes multiple cycles, and the total ISR execution time increases by a factor that could push it past its deadline.

Placing ISRs in ITCM ensures they run at maximum speed with completely predictable timing.

**Real-time processing functions** are the next priority. These include signal processing routines, motor control loops, audio processing pipelines, and any function that runs at a fixed rate and must complete within a strict time budget.

If your audio codec callback needs to process a buffer of samples every 5 ms, every instruction fetch cycle counts. Placing these functions in ITCM gives you the maximum amount of CPU time for actual computation rather than waiting on memory.

**Inner loops of your main processing pipeline** also benefit significantly from ITCM placement. If your firmware spends 80% of its time in a handful of functions, those functions should be in ITCM. Profiling tools and the linker map file (covered later in this article) can help you identify which functions are the hottest.

**Functions that require deterministic timing** belong in ITCM even if they aren't the fastest path. ITCM access time doesn't vary, which makes timing analysis predictable. This matters for safety-critical systems (automotive, medical, aerospace) where you need to prove worst-case execution times to a certification authority.

### How to Place a Function in ITCM

You use a GCC section attribute to tell the compiler that a function belongs in a specific memory section. Then, in your linker script, you map that section to the ITCM memory region.

```c
__attribute__((section(".itcm_text")))
void my_critical_isr(void) {
    volatile uint32_t *sensor_reg = (volatile uint32_t *)0x40001000;
    uint32_t reading = *sensor_reg;
    process_sample(reading);
}
```

In this code, the `__attribute__((section(".itcm_text")))` directive tells the compiler to emit this function's compiled machine code into a section called `.itcm_text` instead of the default `.text` section. The function itself reads a sensor register at the memory-mapped address `0x40001000`, stores the result in a local variable, and passes it to `process_sample()` for further processing. The `volatile` keyword tells the compiler that this memory address can change at any time (because it is a hardware register), so the compiler must not optimize away the read.

On its own, the section attribute doesn't determine where the function ends up in physical memory. It just tells the compiler to label the function's code with a specific section name.

The actual memory placement is the linker script's job, which maps `.itcm_text` to the ITCM address range. We'll cover the linker script in detail in a later section.

### How Much ITCM is Typical?

A real-world memory profile from an embedded project, to give you a sense of scale:

```plaintext
Memory region         Used Size  Region Size  %age Used
            ITCM:      570936 B         2 MB     27.22%
            DTCM:      727240 B    1572608 B     46.24%
             DDR:      622915 B         4 MB     14.85%
```

This output comes from the linker map file's summary section. It shows three memory regions and how much of each one is used by the compiled firmware.

ITCM has 2 MB available and the firmware is using about 557 KB (27.22%). DTCM has about 1.5 MB available and is using 727 KB (46.24%). DDR has 4 MB available and is using about 609 KB (14.85%).

This project uses about 557 KB of the available 2 MB of ITCM, roughly 27%. That leaves good headroom for growth.

In practice, you want to keep ITCM utilization below 80-85% to leave room for future features and library updates. If utilization climbs above 90%, you're one feature addition away from a build failure, and you should proactively move less-critical code to DDR.

---

## What is DTCM (Data Tightly-Coupled Memory)?

DTCM stands for **Data Tightly-Coupled Memory**. It works on the same principle as ITCM (physically close to the CPU core, connected via a dedicated bus, single-cycle access) but it stores **data** instead of instructions.

If ITCM is where your code lives, DTCM is where your code *works*. It's the fast scratch space that the CPU reads from and writes to while executing your performance-critical functions. Every variable read, every array access, every stack push and pop in your hot code paths goes through data memory. Making that data memory as fast as possible eliminates one of the biggest sources of stall cycles.

### What Kind of Data Belongs in DTCM?

**Stack frames** are the most important thing in DTCM. Every function call pushes a stack frame containing local variables, the return address, and saved registers. Every function return pops that frame. I

f your stack is in DTCM, the memory-access portion of function calls and returns happens in a single cycle. If your stack were in DDR, every function call and return would incur multiple cycles of memory latency just for the stack operations alone, before the function even begins doing useful work.

On most Cortex-M and Cortex-R configurations, the startup code initializes the stack pointer to point into DTCM by default, so you get this benefit without any extra configuration.

**Frequently accessed global variables** are another strong candidate. State machine variables, control flags, sensor readings that are updated and read in every loop iteration, counters that are incremented in ISRs and read in the main loop: all of these benefit from single-cycle access.

If a variable is read or written thousands of times per second, the cumulative latency difference between DTCM and DDR adds up.

**Small lookup tables used in hot paths** belong in DTCM when they're small enough to fit. Sine/cosine tables for motor control, filter coefficients for audio processing, and CRC tables for communication protocols are common examples.

These tables are typically a few hundred bytes to a few kilobytes, and they get accessed on every iteration of a processing loop. The key word is "small." A 512-byte sine table is a good fit for DTCM. A 64 KB calibration table is not, and should go in DDR instead.

**DMA buffers** can sometimes go in DTCM, but this depends on your chip's bus architecture. On some chips, the DMA controller has a direct path to DTCM through the bus matrix. On others, the DMA controller can only reach DDR and possibly other SRAM regions. If you place a DMA buffer in DTCM on a chip where the DMA controller can't reach it, the transfer will silently fail or write to a completely wrong address.

Always check your chip's bus matrix diagram in the reference manual before putting DMA buffers in DTCM.

### How to Place Data in DTCM

Placing data in DTCM uses the same section attribute mechanism as ITCM, but with a section name that your linker script maps to the DTCM address range.

```c
__attribute__((section(".dtcm_data")))
static int16_t audio_buffer[256];

__attribute__((section(".dtcm_data")))
static volatile uint32_t sensor_state = 0;
```

In this code, `audio_buffer` is an array of 256 signed 16-bit integers (512 bytes total) that will be placed in DTCM. This could be a buffer for audio samples that gets filled by a DMA transfer and processed by an ISR. The `static` keyword means the buffer has file scope and persists for the lifetime of the program (it's not allocated on the stack).

The `sensor_state` variable is a 32-bit unsigned integer marked as `volatile`, meaning the compiler must read it from memory every time it's accessed rather than caching it in a register.

This is important for variables that are written in an ISR and read in the main loop, since the compiler needs to know the value can change at any time. Placing it in DTCM ensures that both the ISR write and the main loop read happen in a single cycle.

### DTCM Fills Up Faster Than ITCM

Looking at the memory profile again:

```plaintext
            DTCM:      727240 B    1572608 B     46.24%
```

This single line from the linker map file summary shows that DTCM has 1,572,608 bytes (about 1.5 MB) available, and the firmware is using 727,240 bytes (about 710 KB), which is 46.24% of the total capacity.

DTCM fills up faster than ITCM because many things compete for it: your stack, your heap (if you have one), your global variables, and data sections from every library you link against. Every C library function that uses static data, every RTOS data structure, every middleware component brings its own data footprint. This creates a constant sizing exercise.

For every data structure, you need to ask: does this really need single-cycle access, or can it work from DDR?

### A Concrete Example of the Performance Impact

Say your processor runs at 400 MHz. DTCM gives you 1-cycle access. DDR gives you 8-cycle access. You have a lookup table that gets accessed 100,000 times per second.

```sh
DTCM: 100,000 accesses x 1 cycle  = 100,000 cycles/sec
DDR:  100,000 accesses x 8 cycles = 800,000 cycles/sec

Difference: 700,000 cycles/sec
At 400 MHz: 700,000 / 400,000,000 = 0.00175 seconds = 1.75 ms
```

This calculation shows the cycle cost of 100,000 memory accesses per second in both memory types. In DTCM, each access is 1 cycle, totaling 100,000 cycles. In DDR, each access is 8 cycles, totaling 800,000 cycles. The difference of 700,000 cycles per second, at a 400 MHz clock rate, translates to 1.75 milliseconds of additional CPU time spent waiting on memory.

If you're running a real-time control loop at 1 kHz (1 ms period), 1.75 ms of additional memory latency per second means that some individual iterations are running longer than their 1 ms budget. Whether this causes actual deadline misses depends on how the accesses are distributed across iterations and how much slack you have in your time budget, but it shows why memory placement decisions have real consequences in embedded systems.

---

## What is DDR (Double Data Rate) Memory?

DDR is external memory. It sits on the circuit board outside the processor die, connected through a memory controller. It's much larger than TCM (typically 4 MB to several GB), but significantly slower to access.

The name "Double Data Rate" refers to how data is transferred between the DDR chip and the memory controller: data is sent on both the rising edge and the falling edge of the clock signal, effectively doubling the transfer rate compared to a single-data-rate design. But this doesn't eliminate the latency of activating rows and columns inside the DDR chip, which is where the slowness comes from.

### How DDR Access Works

When your CPU reads from DDR, a multi-step process occurs inside the memory controller and DDR chip.

First, the CPU sends an address request to the memory controller. The memory controller is a hardware block inside the processor that translates CPU addresses into the specific row and column addresses that the DDR chip understands.

Second, the memory controller activates the correct row inside the DDR chip. This step is called the RAS (Row Address Strobe) phase. The DDR chip is organized as a grid of tiny capacitors, and "activating a row" means reading all the capacitors in that row into a row buffer inside the DDR chip. This takes several clock cycles.

Third, the memory controller selects the correct column within the activated row. This is called the CAS (Column Address Strobe) phase. The DDR chip uses the column address to pick the right bits out of the row buffer. This also takes several clock cycles.

Fourth, the data is transferred back to the memory controller, and from there to the CPU. The data transfer happens on both clock edges (the "double data rate" part), which helps with throughput but doesn't reduce the initial latency of the RAS and CAS phases.

The total latency depends on what state the memory is in when the request arrives. If the correct row is already activated from a previous access (a "row hit"), the RAS phase can be skipped, and the access is faster. If a different row is active and needs to be closed (precharged) before the new row can be opened (a "row miss"), the access takes longer. If the DDR chip happens to be performing a refresh cycle at that moment, the access is delayed further.

In practice, DDR access latency ranges from about 5 to 20+ CPU clock cycles, depending on the access pattern and timing.

### Why DDR is Necessary

Because firmware often doesn't fit in TCM alone. Real embedded projects include protocol stacks, connectivity libraries, file system drivers, debug interfaces, and more. TCM is typically 2 to 3.5 MB total (ITCM + DTCM combined), and a full-featured firmware image can easily exceed that.

A real example showing memory usage before and after adding a wireless connectivity stack:

```sh
Without connectivity stack:
    ITCM:      506,996 B     (24.18%)
    DTCM:      628,408 B     (39.96%)
    DDR:       558,779 B     (13.32%)

With connectivity stack:
    ITCM:      570,936 B     (27.22%)
    DTCM:      727,240 B     (46.24%)
    DDR:       622,915 B     (14.85%)

Delta:
    ITCM: +63,940 B   (~62 KB of additional code)
    DTCM: +98,832 B   (~96 KB of additional data)
    DDR:  +64,136 B   (~62 KB of additional data/code)
```

This comparison shows memory usage from the same project built with and without a wireless connectivity stack.

The "Without" rows show the baseline. The "With" rows show the usage after adding the connectivity feature. The "Delta" rows show the difference.

Adding this single feature consumed an extra ~220 KB across all three memory regions. The time-critical parts of the stack (interrupt handlers, buffer management) went into ITCM and DTCM. The rest (packet parsers, connection management, configuration logic) went into DDR where it doesn't need single-cycle performance.

### What Belongs in DDR?

**Initialization and configuration code** is the easiest category. Functions that run once at boot, like parsing a configuration file, initializing peripherals, or setting up data structures, don't need fast execution. They run once, take a few extra milliseconds because of DDR latency, and then never run again. Nobody notices. Put them in DDR and save TCM space for the code that runs a million times per second.

**Large buffers** must go in DDR because they simply can't fit in TCM. An image framebuffer for a 320x240 display at 16 bits per pixel is 150 KB. A network packet pool might be 32 KB or more. A file system cache might be 64 KB. These buffers would consume a significant fraction of DTCM's total capacity, leaving no room for the stack and variables that actually need single-cycle access.

**Infrequently accessed data** belongs in DDR as well. Calibration tables that are loaded once at boot and then read occasionally during operation, string tables for debug messages that are only printed during development or error conditions, and error description tables are all fine in DDR. The extra latency per access is irrelevant when the access count is low.

**Non-time-critical code** rounds out the DDR category. Protocol stacks (Bluetooth, Wi-Fi, TCP/IP), file system drivers, OTA update handlers, and shell/debug command interpreters all do important work, but none of them need to execute in a single clock cycle per instruction. They can tolerate the higher latency of DDR without affecting system behavior.

### How to Place Code and Data in DDR

```c
__attribute__((section(".ddr_text")))
void parse_config_file(const char *path) {
    // Runs from DDR, slower instruction fetch,
    // but config parsing happens once at boot,
    // so the latency does not affect runtime performance.
}

__attribute__((section(".ddr_bss")))
static uint8_t network_packet_pool[32768];

__attribute__((section(".ddr_bss")))
static uint8_t framebuffer[320 * 240 * 2];  // 150 KB, far too large for TCM
```

In this code, `parse_config_file` is placed in the `.ddr_text` section, which the linker script maps to DDR. Every instruction in this function will be fetched from DDR at multi-cycle latency, but since config parsing happens once at boot, the extra time is negligible.

The `network_packet_pool` is a 32 KB buffer placed in `.ddr_bss`. The `.bss` suffix is a convention indicating that this is zero-initialized data (the linker will ensure the memory is zeroed at startup rather than storing 32 KB of zeros in the firmware image). This buffer is used for network packet storage, which is not time-critical enough to justify DTCM space.

The `framebuffer` is a 150 KB buffer (320 pixels wide, 240 pixels tall, 2 bytes per pixel) also placed in `.ddr_bss`. At 150 KB, this single buffer would consume about 10% of DTCM's total capacity, which is far too expensive when the display update isn't a hard real-time operation.

---

## How They Compare: A Side-by-Side Overview

| Property | ITCM | DTCM | DDR |
| --- | --- | --- | --- |
| **Purpose** | Instruction storage | Data storage | General-purpose storage |
| **Location** | On-die, dedicated bus | On-die, dedicated bus | Off-chip, through memory controller |
| **Access latency** | 1 cycle (deterministic) | 1 cycle (deterministic) | 5 to 20+ cycles (variable) |
| **Typical size** | 512 KB to 2 MB | 512 KB to 1.5 MB | 4 MB to several GB |
| **Technology** | SRAM | SRAM | DRAM (requires refresh) |
| **Power** | Low (no refresh needed) | Low (no refresh needed) | Higher (constant refresh) |
| **Best for** | ISRs, real-time loops, DSP | Stack, hot variables, lookup tables | Large buffers, init code, protocol stacks |

This table summarizes the key differences between the three memory types. The most important columns are "Access latency" and "Typical size," because they represent the fundamental tradeoff: TCM is fast but small, DDR is slow but large.

The "Technology" column explains why: TCM uses SRAM (static RAM), which stores each bit using a flip-flop circuit that holds its state as long as power is applied. DDR uses DRAM (dynamic RAM), which stores each bit as charge in a tiny capacitor. Because capacitors leak charge, DRAM must be periodically refreshed, which adds power consumption and introduces occasional access delays when a refresh cycle coincides with a read request.

### The Memory Map

```md
Address Space:
  +------------------------------+  0x00000000
  |                              |
  |         ITCM (2 MB)          |  Single-cycle Inst Fetch
  |    ISRs, real-time loops,    |
  |    DSP, critical code        |
  |                              |
  +------------------------------+  0x00200000
  |       (reserved/gap)         |
  +------------------------------+  0x20000000
  |                              |
  |       DTCM (~1.5 MB)         |  Single-cycle Data Access
  |    Stack, hot variables,     |
  |    lookup tables, DMA bufs   |
  |                              |
  +------------------------------+  0x20180000
  |       (reserved/gap)         |
  +------------------------------+  0x80000000
  |                              |
  |         DDR (4 MB)           |  Multi-cycle Access
  |    Large buffers, init code, |
  |    protocol stacks, config   |
  |                              |
  +------------------------------+  0x80400000
```

This diagram shows the CPU's address space laid out from low addresses at the top to high addresses at the bottom. ITCM occupies the lowest 2 MB starting at address 0x00000000. After a gap of reserved/unused address space, DTCM sits at 0x20000000 and spans about 1.5 MB. Another gap of reserved space follows, and then DDR starts at 0x80000000 with 4 MB of space.

The gaps between regions are important. They're reserved address ranges that don't map to any physical memory. If your code accidentally reads from or writes to an address in one of these gaps, the result depends on the chip's bus fault configuration: it might trigger a HardFault exception, or it might silently return garbage data.

These addresses are illustrative. Every chip has its own memory map, documented in its Technical Reference Manual (TRM). Always consult your chip's TRM for the exact addresses and sizes.

---

## How to Decide Where to Place Code and Data

```plaintext
Is it code or data?
|
+-- CODE (instructions):
|   +-- Called from an ISR or runs in a real-time loop?
|   |   +-- YES -> ITCM (deterministic timing is critical)
|   +-- Called frequently in the main processing pipeline?
|   |   +-- YES -> ITCM (if space is available)
|   +-- Called rarely (init, config, debug)?
|       +-- DDR (save ITCM space for critical code)
|
+-- DATA (variables, buffers, tables):
    +-- Accessed in an ISR or real-time context?
    |   +-- YES -> DTCM (single-cycle, deterministic)
    +-- Small and frequently accessed?
    |   +-- YES -> DTCM (if space is available)
    +-- Large buffer (>16 KB)?
    |   +-- Probably DDR (DTCM cannot afford the space)
    +-- Accessed only once at boot or very rarely?
        +-- DDR (do not use DTCM for this)
```

This decision tree captures the thought process for placing each piece of firmware into the right memory region.

Start by asking whether you're placing code (instructions) or data (variables, buffers, tables). For code, the primary question is how often it runs and whether it has timing constraints. ISR code and real-time loop code goes in ITCM. Everything else goes in DDR. For data, the primary question is how often it's accessed and how large it is. Small, frequently accessed data goes in DTCM. Large buffers and rarely-accessed data go in DDR.

The general principle: **put the hottest code and data in TCM, and everything else in DDR**. "Hot" means frequently accessed, latency-sensitive, or requiring deterministic timing. When in doubt, start with DDR placement and move things to TCM only when profiling shows it's necessary. It's much easier to promote a function from DDR to ITCM after discovering it's a bottleneck than to cram everything into ITCM from the start and run out of space.

---

## How the Linker Script Controls Memory Placement

Everything we've discussed so far (section attributes, memory placement, address assignments) comes together in the **linker script**. This is a file (usually with a `.ld` extension) that tells the linker exactly which sections go into which memory regions. The linker script is the single source of truth for your firmware's memory layout.

```plaintext
MEMORY
{
    ITCM    (rx)  : ORIGIN = 0x00000000, LENGTH = 2M
    DTCM    (rw)  : ORIGIN = 0x20000000, LENGTH = 1536K
    DDR     (rwx) : ORIGIN = 0x80000000, LENGTH = 4M
}

SECTIONS
{
    /* === ITCM: Critical code === */
    .itcm_text :
    {
        KEEP(*(.isr_vector))          /* Interrupt vector table */
        *(.itcm_text)                 /* Functions with __attribute__((section(".itcm_text"))) */
        *audio_processing.o(.text)    /* All code from audio_processing.c */
        *motor_control.o(.text)       /* All code from motor_control.c */
    } > ITCM

    /* === DDR: Non-critical code === */
    .ddr_text :
    {
        *(.text)                      /* Default catch-all for remaining code */
        *(.text*)
        *(.rodata)                    /* Read-only data (string literals, constants) */
        *(.rodata*)
    } > DDR

    /* === DTCM: Critical data === */
    .dtcm_data :
    {
        *(.dtcm_data)                 /* Data with __attribute__((section(".dtcm_data"))) */
        *audio_processing.o(.data)    /* All initialized data from audio_processing.c */
        *audio_processing.o(.bss)     /* All zero-initialized data from audio_processing.c */
    } > DTCM

    /* === DTCM: Stack === */
    .stack (NOLOAD) :
    {
        . = ALIGN(8);
        __stack_start = .;
        . = . + 8K;                  /* 8 KB stack */
        __stack_end = .;
    } > DTCM

    /* === DDR: Everything else === */
    .ddr_data :
    {
        *(.data)                      /* Default catch-all for remaining initialized data */
        *(.bss)                       /* Default catch-all for remaining zero-initialized data */
        *(COMMON)
    } > DDR
}
```

This linker script has two main blocks: `MEMORY` and `SECTIONS`.

The `MEMORY` block defines the physical memory regions available on the chip. Each line declares a region name, its permissions (`rx` for read-execute, `rw` for read-write, `rwx` for read-write-execute), its starting address (`ORIGIN`), and its size (`LENGTH`). These values must match your chip's actual memory map as documented in its reference manual.

The `SECTIONS` block defines how the linker should distribute compiled code and data across those memory regions. Each section rule consists of a section name (like `.itcm_text`), a list of input patterns that specify which object file sections to include, and a `> REGION` directive that tells the linker which memory region to place the output section in.

The `.itcm_text` section collects the interrupt vector table (`KEEP(*(.isr_vector))`), any functions explicitly marked with `__attribute__((section(".itcm_text")))`, and all code from `audio_processing.o` and `motor_control.o`. The `KEEP` directive prevents the linker from discarding the interrupt vector table during garbage collection, even if no code appears to reference it directly. All of this goes into ITCM.

The `.ddr_text` section uses catch-all patterns `*(.text)` and `*(.text*)` to collect all remaining code that wasn't claimed by the ITCM section above. It also collects read-only data (`.rodata`), which includes string literals and `const` variables. All of this goes into DDR.

The `.dtcm_data` section collects explicitly-placed data and all data from `audio_processing.o`. The `.stack` section reserves 8 KB for the stack with 8-byte alignment, and exports the `__stack_start` and `__stack_end` symbols that your startup code and stack profiling code can reference. Both go into DTCM.

The `.ddr_data` section collects all remaining data with catch-all patterns, and goes into DDR.

### How Section Matching Works

The linker processes sections from top to bottom. When it encounters a wildcard pattern like `*(.text)`, it matches all `.text` sections that haven't already been claimed by a more specific rule earlier in the script.

So in the example above, `*audio_processing.o(.text)` in the ITCM section claims all code from `audio_processing.c` first. Then, when the linker reaches `*(.text)` in the DDR section, `audio_processing.o`'s `.text` section has already been placed, so it's skipped. Only unclaimed `.text` sections from other object files match the DDR catch-all.

This means the **order of sections in your linker script matters**. Place your specific rules (individual object files, named sections) before the generic catch-all rules. If you put the `*(.text)` catch-all before the `*audio_processing.o(.text)` rule, the catch-all would claim everything first, and the specific rule would match nothing.

---

## Common Mistakes to Avoid

### 1. Stack Overflow in DTCM

Your stack lives in DTCM. DTCM is small. If you declare a large local array inside a function, it goes on the stack:

```c
void problematic_function(void) {
    uint8_t huge_local_buffer[65536];  // 64 KB allocated on the stack
    // This consumes 64 KB of DTCM immediately
}
```

This code declares a 64 KB local array. Because it's a local variable (not `static`), it is allocated on the stack when the function is called. If your total stack size is 8 KB (as in the linker script example above), this single declaration overflows the stack by 56 KB, writing into whatever memory is adjacent to the stack in DTCM.

On a desktop OS, a stack overflow triggers a segmentation fault because the OS uses virtual memory and guard pages to detect it.

In an embedded system without memory protection, the stack silently grows into adjacent memory regions, corrupting whatever data is stored there. The resulting bugs are extremely difficult to diagnose because the symptoms (corrupted variables, erratic behavior, intermittent crashes) appear unrelated to the actual cause. You might spend days debugging a seemingly random data corruption issue before realizing the root cause is a stack overflow from a function three call levels deep.

**The fix**: Use `static` allocation or heap allocation for large buffers, and place them in DDR:

```c
void fixed_function(void) {
    __attribute__((section(".ddr_bss")))
    static uint8_t huge_buffer[65536];  // In DDR, not on the stack

    // Stack is safe, DTCM is not wasted
}
```

By making the buffer `static`, it's no longer allocated on the stack. Instead, the linker allocates it once in the `.ddr_bss` section, which maps to DDR. The buffer persists for the entire lifetime of the program (like a global variable), but its name is scoped to this function. The stack only holds a pointer to the buffer, which is a few bytes instead of 64 KB.

### 2. Overfilling ITCM

If you exceed ITCM's capacity, the linker will produce an error along the lines of "region ITCM overflowed by N bytes." But if you're *close* to the limit, you're one library update or feature addition away from a build failure. A minor version bump of your RTOS or connectivity stack could add enough code to push ITCM over the edge.

Keep headroom. The 27% utilization shown earlier is healthy. If you're above 85%, you should actively work on moving less-critical code to DDR. If you're above 95%, you have no room for growth and need to make immediate changes. Setting up automated memory budget checks in your CI pipeline (covered later in this article) prevents surprises.

### 3. Ignoring Alignment Requirements

TCM memories often have alignment requirements. On Cortex-M processors with strict alignment enforcement, accessing a 32-bit value at an unaligned address causes a HardFault exception.

```c
/* Problematic: packed struct can create unaligned fields */
__attribute__((section(".dtcm_data"), packed))
struct badly_aligned {
    uint8_t  flag;
    uint32_t counter;  // May be at byte offset 1, unaligned
};

/* Correct: natural alignment, with minor padding */
__attribute__((section(".dtcm_data")))
struct properly_aligned {
    uint32_t counter;  // At offset 0, 4-byte aligned
    uint8_t  flag;     // At offset 4
    // 3 bytes of padding follow, a small cost for correctness
};
```

In the first struct, the `packed` attribute tells the compiler to use no padding between fields. This means `counter` starts at byte offset 1 (right after the 1-byte `flag`), which isn't a multiple of 4. When the CPU tries to read a 32-bit value from a non-4-byte-aligned address in TCM, it triggers a HardFault on processors with strict alignment (which includes most Cortex-M cores).

In the second struct, the fields are ordered so that `counter` (4 bytes) comes first at offset 0, which is naturally 4-byte aligned. The `flag` (1 byte) follows at offset 4. The compiler inserts 3 bytes of padding after `flag` to bring the struct size to 8 bytes (a multiple of 4), but this is a small price for correct, crash-free operation.

### 4. DMA Transfers to TCM on Incompatible Bus Architectures

Some DMA controllers can't access TCM memory. Whether DMA can reach TCM depends entirely on your chip's internal bus architecture (the bus matrix).

If you set up a DMA transfer from a peripheral to a DTCM buffer, but the DMA controller doesn't have a bus path to DTCM, the transfer will either silently fail or write to an incorrect address.

Neither produces an obvious error. The DMA controller thinks it completed successfully, your code reads the buffer expecting fresh data, and you get stale or garbage values instead. This is one of the most confusing bugs in embedded development because everything *looks* correct in the code.

**Always check your chip's bus matrix diagram** in the reference manual before using DMA with TCM buffers. The bus matrix diagram shows which masters (CPU, DMA, USB, and so on) can access which slaves (ITCM, DTCM, SRAM, DDR, peripherals). Look for whether the DMA controller's master port has a connection line to the TCM slave port. If it doesn't, your DMA transfers to TCM will not work.

---

## Performance Comparison With Real Numbers

The following table compares access latencies across memory types, assuming a Cortex-R class processor at 400 MHz:

```plaintext
+---------------------+----------+----------+----------+
| Operation           | ITCM/    |   DDR    | Slowdown |
|                     | DTCM     |          | Factor   |
+---------------------+----------+----------+----------+
| Instruction fetch   | 1 cycle  | 5-20 cyc |   5-20x  |
| Data read (32-bit)  | 1 cycle  | 5-20 cyc |   5-20x  |
| Data write (32-bit) | 1 cycle  | 5-20 cyc |   5-20x  |
| Sequential burst    | 1 cyc/wd | 2-4 cy/wd|    2-4x  |
| Random access       | 1 cycle  | 10-20 cyc|  10-20x  |
+---------------------+----------+----------+----------+
```

This table shows the latency for five different types of memory operations. The first three rows (instruction fetch, data read, data write) show that individual accesses to TCM are always 1 cycle, while individual accesses to DDR range from 5 to 20 cycles depending on the memory's internal state. The slowdown factor is the ratio between the two.

The "Sequential burst" row shows what happens when you read or write consecutive addresses. DDR performs much better in burst mode (2-4 cycles per word instead of 5-20) because once a row is activated, subsequent reads from the same row skip the RAS phase. TCM is still 1 cycle per word because it doesn't have the row/column structure of DDR.

The "Random access" row shows the worst case for DDR. When each access hits a different row, the memory controller must precharge the old row and activate the new one every time. This is the 10-20 cycle range, and it's common in workloads that jump around in memory (traversing linked lists, hash table lookups, and indirect function calls through function pointer arrays).

The practical takeaway: if your code accesses DDR data, try to access it sequentially. Iterating through an array in order is much faster than jumping to random positions. Your memory controller and the DDR chip's internal prefetch logic work in your favor during sequential access patterns.

---

## How TCM Affects Power Consumption

Memory placement has a direct impact on power consumption, something that becomes critical for battery-powered products.

**DDR requires constant refresh cycles.** DRAM stores each bit as charge in a tiny capacitor, and that charge leaks over time.

To prevent data loss, the memory controller must read and rewrite every row in the DDR chip approximately every 64 ms. This refresh process consumes power even when the processor is sleeping and no code is running. On some systems, DDR refresh can account for a significant portion of the total sleep-mode power budget.

**TCM is SRAM-based and doesn't require refresh.** SRAM stores data using flip-flop circuits that hold their state as long as power is applied. There is some leakage current (no transistor is perfect), but it is orders of magnitude lower than DDR refresh power.

For battery-powered devices (wearables, IoT sensors, medical devices), this means you should keep data that must survive sleep modes in DTCM when possible.

If your hardware supports it, power-gate the DDR chip during deep sleep to eliminate its refresh power entirely. The less DDR your firmware uses at runtime, the more aggressively you can manage DDR power states, which directly extends battery life.

---

## How to Profile Memory Usage

After placing code and data into ITCM, DTCM, and DDR, you need to verify that everything fits, monitor usage over time, and catch regressions before they become build failures. There are several techniques for this, ranging from simple command-line tools to automated CI checks.

### Method 1: The Linker Map File

Every time you build your firmware, the linker can produce a **map file**, a detailed text file that records where every symbol (function, variable, constant) ended up and how large it is. This is the most useful single artifact in embedded development for understanding memory usage.

To generate one, add `-Wl,-Map=output.map` to your linker flags:

```sh
arm-none-eabi-gcc \
-T linker_script.ld \
-Wl,-Map=firmware.map \
-o firmware.elf \
main.o audio.o bluetooth.o
```

This command invokes the ARM GCC toolchain to link three object files (`main.o`, `audio.o`, `bluetooth.o`) using the linker script `linker_script.ld`. The `-Wl,-Map=firmware.map` flag tells GCC to pass the `-Map=firmware.map` option to the linker, which causes it to write a detailed map file alongside the output ELF binary. The map file can be thousands of lines long, but the most useful part is the summary at the end.

The summary at the end of the map file shows overall utilization per memory region:

```plaintext
Memory region         Used Size  Region Size  %age Used
            ITCM:      570936 B         2 MB     27.22%
            DTCM:      727240 B    1572608 B     46.24%
             DDR:      622915 B         4 MB     14.85%
```

This summary shows three columns: how many bytes are used, the total size of the region, and the percentage used. It gives you the health of your firmware at a glance. As a rule of thumb, below 80% is healthy with room for growth. Between 80% and 90% is getting tight, and you should plan for how you will accommodate the next feature. Above 90% requires action: start moving things to a cheaper memory region or optimizing existing placement.

### Method 2: Parsing the Map File for Per-Module Breakdown

The summary tells you *how much* memory is used, but not *who* is using it. The map file contains per-symbol details, but they're difficult to read manually because the file can be thousands of lines long with a format that isn't designed for human consumption.

The following Python script parses the map file and produces a per-module report showing which object files are consuming memory in which regions.

```py :collapsed-lines
#!/usr/bin/env python3
"""Parse a linker map file and report memory usage per object file."""

import re
import sys
from collections import defaultdict

def parse_map_file(map_path):
    """Extract symbol placements from a GCC linker map file."""
    usage = defaultdict(lambda: defaultdict(int))

    regions = {
        'ITCM': (0x00000000, 0x00200000),
        'DTCM': (0x20000000, 0x20180000),
        'DDR':  (0x80000000, 0x80400000),
    }

    def addr_to_region(addr):
        for name, (start, end) in regions.items():
            if start <= addr < end:
                return name
        return 'UNKNOWN'

    symbol_re = re.compile(
        r'^\s+\S+\s+(0x[0-9a-fA-F]+)\s+(0x[0-9a-fA-F]+)\s+(\S+.o)'
    )

    with open(map_path) as f:
        for line in f:
            m = symbol_re.match(line)
            if m:
                addr = int(m.group(1), 16)
                size = int(m.group(2), 16)
                obj = m.group(3).split('/')[-1]
                region = addr_to_region(addr)
                usage[obj][region] += size

    return usage

def print_report(usage):
    """Print a sorted memory usage report."""
    print(f"{'Object File':<35} {'ITCM':>10} {'DTCM':>10} {'DDR':>10} {'Total':>10}")
    print("-" * 80)

    totals = defaultdict(int)
    rows = []

    for obj, regions in usage.items():
        total = sum(regions.values())
        rows.append((obj, regions, total))
        for r, s in regions.items():
            totals[r] += s

    rows.sort(key=lambda x: x[2], reverse=True)

    for obj, regions, total in rows[:20]:
        print(f"{obj:<35} "
              f"{regions.get('ITCM', 0):>10,} "
              f"{regions.get('DTCM', 0):>10,} "
              f"{regions.get('DDR', 0):>10,} "
              f"{total:>10,}")

    print("-" * 80)
    grand = sum(totals.values())
    print(f"{'TOTAL':<35} "
          f"{totals.get('ITCM', 0):>10,} "
          f"{totals.get('DTCM', 0):>10,} "
          f"{totals.get('DDR', 0):>10,} "
          f"{grand:>10,}")

if __name__ == '__main__':
    usage = parse_map_file(sys.argv[1])
    print_report(usage)
```

This script does three things. First, `parse_map_file` reads the map file line by line, looking for lines that match the format of a symbol placement entry (a section name, an address, a size, and an object file name). For each match, it converts the hex address to an integer, determines which memory region it falls in using the `addr_to_region` helper, and accumulates the size into a nested dictionary keyed by object file and region.

Second, `print_report` sorts the object files by total memory usage (largest first), prints the top 20, and shows how much each one uses in each region.

Third, the `if __name__ == '__main__'` block makes the script runnable from the command line.

You'll need to adjust the address ranges in the `regions` dictionary to match your chip's memory map.

Run it with:

```sh
python3 parse_map.py firmware.map
```

Sample output:

```plaintext
Object File                              ITCM       DTCM        DDR      Total
--------------------------------------------------------------------------------
bluetooth_stack.o                      42,380     65,200     38,400    146,080
audio_processing.o                     89,200     32,000          0    121,200
wifi_driver.o                          21,560     33,632     25,736     80,928
sensor_hub.o                           45,000     18,400          0     63,400
libc.a(memcpy.o)                       12,340          0          0     12,340
...
--------------------------------------------------------------------------------
TOTAL                                 570,936    727,240    622,915  1,921,091
```

This output shows the top memory consumers in the firmware, sorted by total usage. Each row shows an object file and how many bytes it contributes to each memory region.

The `bluetooth_stack.o` file is the largest consumer at 146 KB total, spread across all three regions. The `audio_processing.o` file uses 121 KB, all in ITCM and DTCM (0 bytes in DDR), which makes sense because audio processing is time-critical and was placed entirely in TCM. The `libc.a(memcpy.o)` entry shows a C library function that was placed in ITCM, likely because it is called from performance-critical code paths.

### Method 3: The `size` Command

For a quick check without parsing the map file, use `arm-none-eabi-size`:

```sh
arm-none-eabi-size -A firmware.elf
```

Output:

```plaintext
firmware.elf  :
section               size        addr
.itcm_text          570936           0
.dtcm_data          530240   536870912
.dtcm_bss           196000   537401152
.stack                8192   537600000
.ddr_text           422915  2147483648
.ddr_data           120000  2147906563
.ddr_bss             80000  2148026563
Total              1928283
```

This output lists every section in the ELF binary, its size in bytes, and its starting address (shown in decimal).

You can map sections to memory regions by looking at the address: addresses near 0 are ITCM, addresses near 536 million (0x20000000) are DTCM, and addresses near 2.1 billion (0x80000000) are DDR.

Alternatively, the section names themselves indicate the region (`.itcm_text` is in ITCM, `.dtcm_data` and `.dtcm_bss` are in DTCM, `.ddr_text` and `.ddr_data` and `.ddr_bss` are in DDR).

The `-A` flag gives per-section sizes instead of the default BSD-format output. It's less detailed than the map file approach, but it runs instantly and gives you the big picture.

### Method 4: Runtime Stack Profiling

Static analysis (map files, `size` output) tells you about compile-time placement. But some memory usage is dynamic, particularly the stack, which grows and shrinks at runtime based on call depth and local variable sizes. A function that allocates a 2 KB local buffer only uses that stack space while it is executing, so static analysis can't tell you the peak stack usage.

A common technique is **stack watermarking**: fill the entire stack region with a known pattern at boot, then periodically check how much of the pattern has been overwritten.

```c
#define STACK_FILL_PATTERN 0xDEADBEEF

void stack_watermark_init(void) {
    extern uint32_t __stack_start;
    extern uint32_t __stack_end;
    uint32_t *p = &__stack_start;

    register uint32_t sp asm("sp");
    while (p < (uint32_t *)(sp - 64)) {
        *p++ = STACK_FILL_PATTERN;
    }
}

uint32_t stack_usage_bytes(void) {
    extern uint32_t __stack_start;
    extern uint32_t __stack_end;
    uint32_t *p = &__stack_start;

    while (p < &__stack_end && *p == STACK_FILL_PATTERN) {
        p++;
    }

    return (uint32_t)(&__stack_end) - (uint32_t)p;
}

void check_stack_health(void) {
    uint32_t used = stack_usage_bytes();
    uint32_t total = 8192;
    uint32_t percent = (used * 100) / total;

    if (percent > 80) {
        log_warning("Stack usage: %lu / %lu bytes (%lu%%)",
                    used, total, percent);
    }
}
```

The `stack_watermark_init` function fills the stack memory (from `__stack_start` to just below the current stack pointer) with the pattern `0xDEADBEEF`. The `extern` declarations reference the linker symbols defined in the linker script's `.stack` section. The `register uint32_t sp asm("sp")` line reads the current stack pointer value so the function knows where to stop filling (you do not want to overwrite your own stack frame). The 64-byte safety margin ensures the fill loop doesn't get too close to the active stack.

The `stack_usage_bytes` function scans from the bottom of the stack upward, counting how many words still contain the fill pattern. The first word that does *not* match the pattern indicates the deepest point the stack has reached (the high-water mark). The function returns the number of bytes from that point to the top of the stack.

The `check_stack_health` function computes the percentage of stack used and logs a warning if it exceeds 80%. Call this function periodically during normal operation to monitor stack usage.

Call `stack_watermark_init()` as early as possible in your startup code (before `main()` if you can), then call `check_stack_health()` periodically during normal operation. This tells you the high-water mark, the maximum stack depth your firmware has reached so far.

### Method 5: Tracking Memory Across Builds

Every time you add a feature or merge a change, run the memory profile before and after:

```sh
arm-none-eabi-size -A firmware_before.elf > mem_before.txt
arm-none-eabi-size -A firmware_after.elf > mem_after.txt
diff mem_before.txt mem_after.txt
```

These three commands capture the section sizes of two firmware builds (before and after a change) into text files, then diff them to see what changed. This is useful but the raw diff output can be hard to read. The following script provides a cleaner view by computing the delta per memory region:

```sh title="memory_diff.sh"
#!/bin/bash
# Compare memory usage between two builds

echo "Memory Impact of Change:"
echo "========================"

parse_size() {
    arm-none-eabi-size -A "$1" | awk '
    /.itcm/  { itcm += $2 }
    /.dtcm/  { dtcm += $2 }
    /.ddr/   { ddr += $2 }
    /.stack/ { dtcm += $2 }
    END { printf "%d %d %d", itcm, dtcm, ddr }
    '
}

read itcm_before dtcm_before ddr_before <<< \((parse_size "\)1")
read itcm_after  dtcm_after  ddr_after  <<< \((parse_size "\)2")

printf "ITCM: %+d bytes (%d -> %d)\n" \
    \(((itcm_after - itcm_before)) \)itcm_before $itcm_after
printf "DTCM: %+d bytes (%d -> %d)\n" \
    \(((dtcm_after - dtcm_before)) \)dtcm_before $dtcm_after
printf "DDR:  %+d bytes (%d -> %d)\n" \
    \(((ddr_after - ddr_before)) \)ddr_before $ddr_after
```

This script takes two ELF files as arguments (the "before" and "after" builds). The `parse_size` function runs `arm-none-eabi-size -A` on the given ELF file and uses `awk` to sum up section sizes by memory region. Sections whose names contain `.itcm` are counted toward ITCM, sections containing `.dtcm` or `.stack` toward DTCM, and sections containing `.ddr` toward DDR. The main body reads the before and after values, then prints the delta for each region with a `+` or `-` sign.

Usage and output:

```sh
./memory_diff.sh firmware_without_bt.elf firmware_with_bt.elf
#
# Memory Impact of Change:
# ========================
# ITCM: +63940 bytes (506996 -> 570936)
# DTCM: +98832 bytes (628408 -> 727240)
# DDR:  +64136 bytes (558779 -> 622915)
```

This output shows that adding the Bluetooth feature increased ITCM by about 62 KB, DTCM by about 96 KB, and DDR by about 62 KB. You can put this in your CI/CD pipeline so that every pull request shows exactly how much memory it costs.

### Method 6: Automated Memory Budget Checks in CI

You can integrate memory profiling into your CI/CD pipeline to catch overflows before they land in your main branch.

```sh title="memory_check.sh"
#!/bin/bash
# Fail CI if memory usage exceeds thresholds

ITCM_LIMIT=85   # percent
DTCM_LIMIT=80
DDR_LIMIT=90

check_region() {
    local name=\(1 used=\)2 total=\(3 limit=\)4
    local percent=$((used * 100 / total))

    if [ \(percent -ge \)limit ]; then
        echo "FAIL: \(name usage is \){percent}% (limit: ${limit}%)"
        echo "      Used: \(used / \)total bytes"
        return 1
    else
        echo "OK:   \(name usage is \){percent}% (limit: ${limit}%)"
        return 0
    fi
}

ITCM_USED=\((grep "ITCM:" firmware.map | awk '{print \)2}')
ITCM_TOTAL=$((2 * 1024 * 1024))

DTCM_USED=\((grep "DTCM:" firmware.map | awk '{print \)2}')
DTCM_TOTAL=1572608

DDR_USED=\((grep "DDR:" firmware.map | awk '{print \)2}')
DDR_TOTAL=$((4 * 1024 * 1024))

FAILED=0
check_region "ITCM" \(ITCM_USED \)ITCM_TOTAL $ITCM_LIMIT || FAILED=1
check_region "DTCM" \(DTCM_USED \)DTCM_TOTAL $DTCM_LIMIT || FAILED=1
check_region "DDR"  \(DDR_USED  \)DDR_TOTAL  $DDR_LIMIT  || FAILED=1

exit $FAILED
```

This script reads memory usage numbers from the linker map file and compares them against configurable percentage thresholds. The `check_region` function takes a region name, the number of bytes used, the total bytes available, and the percentage limit. It computes the actual percentage and prints either "OK" or "FAIL" along with the numbers. If any region exceeds its limit, the script exits with a non-zero status, which causes the CI build to fail.

The thresholds at the top (85% for ITCM, 80% for DTCM, 90% for DDR) should be adjusted based on your project's growth rate and how much headroom you want to maintain. DTCM has a lower limit because it fills up faster and is harder to free up.

Add this script to your build pipeline so every pull request shows its memory cost. If a change pushes any region past its threshold, the build fails and the developer knows immediately.

### Method 7: Heap Tracking at Runtime

If your embedded project uses dynamic memory allocation (`malloc`/`free`), you can wrap the allocator to track usage.

```c
static size_t heap_used = 0;
static size_t heap_peak = 0;

void *tracked_malloc(size_t size) {
    size_t *block = (size_t *)malloc(size + sizeof(size_t));
    if (!block) return NULL;

    *block = size;
    heap_used += size;
    if (heap_used > heap_peak) {
        heap_peak = heap_used;
    }

    return (void *)(block + 1);
}

void tracked_free(void *ptr) {
    if (!ptr) return;
    size_t *block = ((size_t *)ptr) - 1;
    heap_used -= *block;
    free(block);
}

void print_heap_stats(void) {
    printf("Heap: current=%zu bytes, peak=%zu bytes\n",
           heap_used, heap_peak);
}
```

This code wraps `malloc` and `free` with tracking logic. The `tracked_malloc` function allocates slightly more memory than requested (an extra `sizeof(size_t)` bytes) and stores the requested size in the first word of the allocation. It then updates the `heap_used` counter and, if the new total exceeds the previous peak, updates `heap_peak`. It returns a pointer that's offset past the size header, so the caller sees a normal pointer to their data.

The `tracked_free` function reverses the process: it subtracts one `size_t` from the pointer to find the hidden size header, subtracts that size from `heap_used`, and calls the real `free` on the original block.

The `print_heap_stats` function prints the current and peak heap usage. Call it periodically or on demand through a debug interface (UART console, debug CLI) to monitor how much heap your firmware is using.

This approach has a small overhead (one extra word per allocation), but it gives you visibility into dynamic memory usage that's otherwise completely invisible. It's especially useful for tracking down memory leaks: if `heap_used` keeps growing over time without ever decreasing, something is allocating without freeing.

---

## Summary

Embedded processors based on ARM Cortex-M and Cortex-R architectures give you direct control over three memory regions with very different performance characteristics.

**ITCM (Instruction Tightly-Coupled Memory)** stores your most performance-critical code. It provides single-cycle, deterministic instruction fetch. It's small (typically 512 KB to 2 MB), so reserve it for ISRs, real-time processing functions, and hot loops.

**DTCM (Data Tightly-Coupled Memory)** stores your most performance-critical data. It also provides single-cycle, deterministic access. Your stack lives here by default. It's even smaller than ITCM and fills up quickly, so be deliberate about what you place in it.

**DDR (Double Data Rate) memory** stores everything else. It's much larger but slower (5 to 20+ cycles per access, with variable latency). Use it for initialization code, large buffers, protocol stacks, and anything that doesn't need deterministic timing.

You control placement through `__attribute__((section(...)))` in your C code and section-to-region mappings in your linker script. You verify placement through map files, the `size` command, and runtime profiling techniques like stack watermarking. The core skill is knowing which region each piece of your firmware belongs in, and having the tooling to catch mistakes early.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "ITCM vs DTCM vs DDR: Embedded Memory Types Explained [Full Handbook]",
  "desc": "Most embedded engineers hit this problem early on: the same code on the same processor runs fast in one scenario and surprisingly slow in another. The culprit is almost always where the code and data ",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/itcm-vs-dtcm-vs-ddr-embedded-memory-types-explained-handbook.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
