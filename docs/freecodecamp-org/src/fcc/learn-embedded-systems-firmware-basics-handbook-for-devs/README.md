---
lang: en-US
title: "Learn Embedded Systems Firmware Basics - A Handbook for Developers"
description: "Article(s) > Learn Embedded Systems Firmware Basics - A Handbook for Developers"
icon: iconfont icon-c 
category:
  - C
  - C++
  - Shell
  - GNU
  - GNU Make
  - Hardware
  - ST Microelectronics
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - c
  - cpp
  - c++
  - c-plus-plus
  - hw
  - hardware
  - stm
  - st-microelectronics
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Learn Embedded Systems Firmware Basics - A Handbook for Developers"
    - property: og:description
      content: "Learn Embedded Systems Firmware Basics - A Handbook for Developers"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/learn-embedded-systems-firmware-basics-handbook-for-devs/
prev: /programming/c/articles/README.md
date: 2025-06-24
isOriginal: false
author:
  - name: Soham Banerjee
    url : https://freecodecamp.org/news/author/sohamstars/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1750701027343/86918e8c-4348-4845-b048-6203ae0fcb38.png
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
  "title": "C++ > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/cpp/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "GNU Make > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/sh-make/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "ST Microelectronics > Article(s)",
  "desc": "Article(s)",
  "link": "/hw/stm/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Learn Embedded Systems Firmware Basics - A Handbook for Developers"
  desc="Have you ever wondered how your fridge knows when to cool, or how a coffee machine knows when to stop pouring? Behind the scenes, these devices are powered by embedded systems - small, dedicated computers designed to perform specific tasks reliably a..."
  url="https://freecodecamp.org/news/learn-embedded-systems-firmware-basics-handbook-for-devs"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1750701027343/86918e8c-4348-4845-b048-6203ae0fcb38.png"/>

Have you ever wondered how your fridge knows when to cool, or how a coffee machine knows when to stop pouring? Behind the scenes, these devices are powered by embedded systems - small, dedicated computers designed to perform specific tasks reliably and efficiently.

An embedded system typically goes through a simple but powerful cycle:

1. Sense - Gather information from the environment using sensors.
2. Process - Use software logic to decide what to do with the data.
3. Act - Trigger a response, like turning on a motor or lighting an LED.

Each project begins with a use case - a specific goal like brewing coffee or controlling a car’s fuel injection. From that, engineers define system requirements, which are split into:

- Hardware (for example, microcontrollers, sensors, actuators)
- Software (what we call embedded software)

This handbook focuses on the software side of embedded systems: how we write code to make embedded systems intelligent. Embedded software runs on resource-constrained devices like microcontrollers, which may have just a few kilobytes of memory. The software might need to be highly efficient, reliable, and often capable of working in real-time.

But embedded software isn't just about writing code - it’s also about understanding:

- How hardware works
- How to manage memory and power
- How to handle timing and communication
- How to build robust, fail-safe systems

While embedded systems development isn’t typically research-focused in most industry roles, it demands a broad skill set, from low-level programming to system-level design. What makes this field especially exciting is how it brings together diverse domains like machine learning, digital signal processing (DSP), and control systems, all of which can be applied directly in real-world devices.

In this article, I’ll give you:

- A high-level overview of what embedded software involves
- Key concepts every developer should know
- A tour of commonly used tools and frameworks
- Resources to help you learn and understand basics.

Whether you're just curious or planning a career in embedded systems, this guide is your launchpad.

---

## Table of Contents

- [HW Layer: Microcontroller](#heading-hw-layer-microcontroller)
- [Firmware Design and Tools](#heading-firmware-design-and-tools)
- [Tools and Concepts for Embedded Development](#heading-tools-and-concepts-for-embedded-development)
- [Bare Metal, RTOS, and Embedded Operating Systems](#heading-bare-metal-rtos-and-embedded-operating-systems)
- [Designing Drivers for Embedded Systems](#heading-designing-drivers-for-embedded-systems)
- [Security in Embedded Systems](#heading-security-in-embedded-systems)
- [Debugging and Forensics in Embedded Systems](#heading-debugging-and-forensics-in-embedded-systems)
- [Automation and Testing in Embedded Systems](#heading-automation-and-testing-in-embedded-systems)
- [Where to Go from Here](#heading-where-to-go-from-here)

This article offers a broad overview of embedded firmware development, but it doesn’t cover every aspect, particularly advanced software architecture frameworks or comprehensive lists of open source software and tools. Where appropriate, I have included external resources that were valuable in expanding my own understanding.

::: note Prerequisites

You don’t need to be an expert to follow this guide, but some prior knowledge will help you get the most out of it:

- Basic C or C++ programming: Familiarity with functions, pointers, and memory concepts is helpful.
- Computer architecture fundamentals: Understanding what a CPU does, how memory works, and basic instruction execution will make embedded concepts clearer.
- Electronics basics (optional): Knowing how sensors, resistors, or microcontrollers interact at a circuit level is useful but not mandatory.
- Comfort with the command line: Especially for working with build systems, compilers, and flashing tools.

:::

This guide is ideal for students, engineers, or hobbyists looking to deepen their understanding of how software interacts with hardware in real-world systems.

With that, let’s start from the ground up, hardware. Throughout this guide, most examples will reference ARM Cortex-M microcontrollers, as they are among the most commonly used in the embedded world.

---

## HW Layer: Microcontroller

One of the most important knowledge blocks in embedded firmware development is understanding how a microcontroller (MCU) works and how it connects to sensors, actuators, and other microcontrollers.

If you’re familiar with basic computer architecture (like instruction sets and memory organization), that knowledge translates well to embedded systems. In fact, Computer System Organization, often taught in computer science and electrical engineering programs, is a great foundation for understanding microcontrollers.

### What is a Microcontroller?

A microcontroller is a compact computing unit that includes:

- A CPU (Central Processing Unit or Microprocessor)
- Memory (Flash and RAM)
- Peripherals (for I/O, timers, communication, and so on)

In essence, it's a tiny computer-on-a-chip, optimized for specific control tasks like reading sensors or driving motors.

By contrast, a microprocessor is just the CPU. It requires external memory and peripherals to function. Microcontrollers are self-contained and better suited for embedded applications.

For example, this [<VPIcon icon="iconfont icon-st-microelectronics"/>reference manual](https://st.com/resource/en/reference_manual/dm00031020-stm32f405-415-stm32f407-417-stm32f427-437-and-stm32f429-439-advanced-arm-based-32-bit-mcus-stmicroelectronics.pdf) for the STM32F4 series (from STMicroelectronics) provides detailed documentation on not just the CPU but each peripheral’s functionality and the register map.

### Instruction Set Architecture (ISA)

A microprocessor executes a series of instructions defined by its Instruction Set Architecture (ISA). ISA as defined by [<VPIcon icon="iconfont icon-arm"/>ARM](https://arm.com/glossary/isa) is a part of the abstract model of a computer that defines how the CPU is controlled by the software. The ISA acts as an interface between the hardware and the software, specifying both what the processor is capable of doing as well as how it gets done.

For example:

- ARMv7 - used in ARM Cortex-M3.
- ARMv7E - used in Cortex-M4 and M7.

Many vendors (for example, STMicroelectronics, NXP, TI) manufacture MCUs that support ARM ISAs but include their own peripheral sets. Understanding the ISA is essential for low-level coding and interpreting assembly instructions.

This [<VPIcon icon="iconfont icon-arm"/>ARMv7-M architecture reference manual](https://developer.arm.com/documentation/ddi0403/ee/?lang=en) provides more details on v7 Architecture.

### Memory in Microcontrollers

Most microcontrollers typically feature two types of memory:

- **Flash** - Stores your code and read-only data.
- **RAM** - Used during program execution to hold:
  - The heap (for dynamic memory)
  - The stack
  - The .data and .bss sections (initialized/uninitialized global/static variables)

Later sections have resources that go deeper into memory mapping and how these regions interact during runtime.

### Clock and Power Management

Microcontrollers are digital logic devices built from:

- Combinatorial logic - Logic gates that evaluate outputs instantly
- Sequential logic - Relies on clocks to move through states

The clock tree distributes timing signals across the CPU and peripherals. MCUs often support multiple clock sources (internal RC, external crystal, PLL), and use prescalers to drive components at different frequencies.

For power-sensitive applications, MCUs offer multiple low-power modes:

- Sleep - CPU off, timers and peripherals are mostly active, memory is retained
- Deep Sleep - CPU off, most clocks off, memory is retained, wake-up is slower than sleep, power consumption is lower than Sleep
- Standby - CPU off, few interrupts are active, everything else is powered down, memory is not retained. Lowest power mode.

These modes reduce power consumption by turning off clocks and disabling unused peripherals. Designing the system to switch in and out of low-power states effectively is a core skill in embedded software development.

This article talks about [<VPIcon icon="fas fa-globe"/>Clock Trees and Oscillators](https://playembedded.org/blog/arm-cortex-clock-tree-101/) for the ARM Cortex microcontrollers.

### Interrupts

Interrupts let MCUs react to asynchronous events, like button presses or sensor signals.

An interrupt temporarily pauses normal code execution to run a dedicated handler. After it’s serviced, the CPU resumes its previous task. They are vital for:

- Fast event response
- Reduced polling
- Efficient power use (for example, waking from sleep)

### Timers

Timers are built-in peripherals used to track time or generate events.

Common uses are:

- Implementing software delays
- Creating precise software timers
- Waking up from low-power modes

Mastering timers helps with real-time behavior and precise event scheduling.

### Communication Protocols

Microcontrollers often need to talk to other devices via built-in communication peripherals:

- **UART (Universal Asynchronous Receiver/Transmitter):** Serial communication between two devices, great for logs and debugging.
- **I²C (Inter-Integrated Circuit):** Two wire protocol for talking to sensors and EEPROMs.
- **SPI (Serial Peripheral Interface):** High Speed, full-duplex protocol for devices like Flash or displays.
- **USB (Universal Serial Bus):** Complex but widely used for PCs, data acquisition and HID devices.

Here’s a figure showing multiple peripherals connected to a MCU:

![A MCU that is connected to Flash over SPI, connected to another MCU2 over UART, connected to Temperature Sensor over I2C and connected to Host Computer over USB. This picture shows how multiple peripherals are connected to a Host Computer](https://cdn.hashnode.com/res/hashnode/image/upload/v1750017729550/799b8649-bb39-4d5d-a309-9c3b76898eb8.png)

DMA or Direct Memory Access is an important peripheral which can be used to transfer data to/from memory without CPU involvement. It improves performance and allows the CPU to perform other tasks or enter low power mode to reduce power consumption.

This [<VPIcon icon="fas fa-globe"/>article](https://parlezvoustech.com/en/comparaison-protocoles-communication-i2c-spi-uart/) provides a good overview of the communication protocols I2C, UART and SPI.

We’ve now covered the essential building blocks of microcontroller hardware - from memory and clocks to interrupts and communication buses.

Next, we’ll explore the software principles and tools that bring these microcontrollers to life, including compilers, debuggers, and embedded development frameworks.

---

## Firmware Design and Tools

### Designing Embedded Software

Even though embedded systems operate under unique hardware constraints, software design principles are still crucial. Applying them thoughtfully becomes even more important when memory, CPU cycles, and responsiveness are limited.

Most Embedded firmware projects begin with a structured design approach:

1. Understand the problem statement
2. List assumptions
3. Define use cases
4. Define system and software requirements
5. Create high-level architecture
6. Drill down to detailed design and implementation

If you’re new to software design, check out my [**article**](/freecodecamp.org/learn-software-design-basics/README.md) on design principles.

Here’s a figure showing the five blocks of software design:

![Blocks of software design: Problem statement describes the problem, Use cases describe the use case for which the problem statement is valid, then comes collecting the requirements, creating the architecture and the final design  ](https://cdn.hashnode.com/res/hashnode/image/upload/v1750557879213/eab45a1f-ec1a-4c3d-81ce-c67365a451d4.png)

### Using Design Patterns

Once you're designing individual components, design patterns help you write scalable and maintainable code. Here are some common patterns in embedded systems:

- Publisher-Subscriber (Observer) - Useful for decoupling event producers and consumers (for example, sensor data being broadcast to multiple modules).
- Singleton - Ensures only one instance of a module or resource manager exists (for example, for drivers or HAL layers).
- Adapter - Translates between incompatible interfaces (for example, wrapping platform-specific code into a portable application layer).
- State Machine - Represents system behavior as transitions between states (for example, Bluetooth states: `IDLE → SCANNING → CONNECTING → CONNECTED → DISCONNECTED`).

Design patterns often need to be adapted for memory and timing constraints, but the core concepts remain highly relevant.

There are lot of great resources on design patterns - here are a few that helped me:

1. Book: [<VPIcon icon="fa-brands fa-amazon"/>Head-first Design patterns](https://amazon.com/Head-First-Design-Patterns-Object-Oriented/dp/149207800X/) - A great book to get understand the concept of design patterns
2. Book: [<VPIcon icon="fa-brands fa-amazon"/>Design Patterns: Elements of Reusable Object-Oriented Software](https://amazon.com/Design-Patterns-Elements-Reusable-Object-Oriented/dp/0201633612/)
3. Course: [**Object-Oriented Programming and Design Patterns in C#**](/freecodecamp.org/master-object-oriented-programming-and-design-patterns-in-c.md)
4. Article on HSM: [<VPIcon icon="fas fa-globe"/>Hierarchical State Machine Overview (Barr Group)](https://barrgroup.com/blog/introduction-hierarchical-state-machines)

### Programming Languages for Embedded Systems

While any language can theoretically be used if it compiles to machine code, in practice, three dominate the embedded world:

- C - The industry standard. Provides deterministic behavior and low-level access, making it ideal for memory and timing-sensitive code.
- C++ - Adds object-oriented features while maintaining control. Once considered risky in embedded due to synthesized code and overhead, it’s now widely adopted where systems benefit from abstraction and modularity.
- Rust - A memory-safe alternative gaining traction in safety-critical and open-source embedded development.

Languages like Python (via MicroPython or CircuitPython) are used in educational or prototyping contexts but are not suitable for production due to performance and memory overhead.

Some resources on programming languages that might be helpful to understand concepts:

1. [<VPIcon icon="fas fa-globe"/>The Embedded Rust Book](https://docs.rust-embedded.org/book/)
2. [**C Programming Language by K&R**](/freecodecamp.org/learn-c-programming-classic-book-dr-chuck.md)

### Data Structures Matter

Embedded systems require careful data handling due to strict memory and timing constraints. Mastering core data structures is essential:

- Arrays - fixed-size data.
- Linked Lists - Common in software timers, queues.
- Stacks and Queues - Task scheduling, event management and data storage.
- Bitfields/Flags - Memory efficient state representation.
- Binary Trees - Used in routing tables or decision logic.
  
You'll often build event queues, circular buffers, or timer lists, all of which rely on these foundational structures.

There are a lot of resources for understanding data structures, but I have found this one to be helpful for learning and practicing: [<VPIcon icon="fas fa-globe"/>GeeksForGeeks DSA Tutorial](https://geeksforgeeks.org/dsa/dsa-tutorial-learn-data-structures-and-algorithms/). And [**here’s a full course on DSA**](/freecodecamp.org/learn-data-structures-and-algorithms-2.md) if you want to dive deeper.

### Bit Manipulation: A Core Embedded Skill

Unlike general-purpose software, embedded systems often require low-level access to registers and require precise bit control:

- Setting and clearing individual bits
- Using bitwise operators like `AND (&)`, `OR (|)`, `XOR (^)`
- Bit masking and shifting (`<<`, `>>`)

Mastering bit hacks is essential for writing hardware drivers or manipulating control registers.

This resource provides a good number of examples for bit manipulation: [<VPIcon icon="fas fa-globe"/>Stanford Bit Hacks](https://graphics.stanford.edu/~seander/bithacks.html).

---

## Tools and Concepts for Embedded Development

### Cross Compilation

Embedded code is compiled on a host (like your PC) for a target architecture using cross-compilers.

To do this, you need:

- A compiler (for example, `arm-none-eabi-gcc` for ARM Cortex-M) that compiles high level language code into Assembly language instructions.
- A linker to layout and combine object files.
- A Makefile or build system to organize and automate compilation, linking and binary creation.

Here’s an example to compile a main.c to create a main.elf that can be flashed on the device:

```sh
arm-none-eabi-gcc main.c -o main.elf
```

A Makefile is a script used by the `make` build automation tool to compile and link programs to create a binary. It defines how to build your program from source files, manages compilation order based on dependencies and defines commands to complete the build.

For example, lets write a Makefile for building a project for an ARM Cortex-M4 target that has three source files: a main.c, utils.c, and sensor.c

```makefile :collapsed-lines
CC = arm-none-eabi-gcc
CFLAGS = -c -mcpu=cortex-m4 -mthumb -Wall -O2
LDFLAGS = -mcpu=cortex-m4 -mthumb
TARGET = main.elf
OBJS = main.o utils.o sensor.o
SRC = main.c utils.c sensor.c

$(TARGET): $(OBJS)
    $(CC) $(OBJS) -o $(TARGET)

main.o: main.c
    $(CC) $(CFLAGS) main.c

utils.o: utils.c
    $(CC) $(CFLAGS) utils.c

sensor.o: sensor.c
    $(CC) $(CFLAGS) sensor.c

clean:
    rm -f *.o *.elf
```

In the above makefile, here’s a description of the flags:

- `-mcpu=cortex-m4`: Targets the ARM Cortex-M4 processor.
- `-mthumb`: Enables Thumb instruction set, which is used by ARM Cortex-M series.
- `-Wall`: Enables all common warnings.
- `-O2`: Optimization level 2 for balance between performance and code size.

Makefiles can seem intimidating, but they’re just scripts that define how to build your program from source. Once you understand the basics, they’re a huge productivity booster.

A linker script tells the linker (`ld`) how to organize the program in memory where to place code, data, stack, heap, and so on. It's crucial for embedded systems because you're working with limited memory and specific memory-mapped hardware.

Here’s an example of a simple linker script for a STM32F4 microcontroller:

```makefile :collapsed-lines title+"Makefile"
/* STM32F4 Cortex‑M4 Simple Linker Script */

ENTRY(Reset_Handler)

/* Define memory regions based on STM32F4 datasheet */
MEMORY
{
  FLASH (rx) : ORIGIN = 0x08000000, LENGTH = 1024K
  RAM   (rwx): ORIGIN = 0x20000000, LENGTH = 128K
}

/* Section layout */
SECTIONS
{
  /* Interrupt vectors and code go into Flash */
  .isr_vector :
  {
    KEEP(*(.isr_vector))    /* Keep vector table (reset, etc.) */
  } > FLASH

  .text :
  {
    *(.text*)               /* All code */
    *(.rodata*)             /* Read-only data */
    . = ALIGN(4)
    _etext = .             /* End of code (used for data init) */
  } > FLASH

  /* Initialized data: load from Flash, run in RAM */
  .data : AT(_etext)
  {
    _sdata = .            /* Start of .data in RAM */
    *(.data*)
    . = ALIGN(4)
    _edata = .            /* End of .data */
  } > RAM

  /* Uninitialized data (zero-filled) */
  .bss :
  {
    _sbss = .
    *(.bss*)
    *(COMMON)
    . = ALIGN(4)
    _ebss = .
  } > RAM

  /* Define stack end (top of RAM) */
  _estack = ORIGIN(RAM) + LENGTH(RAM);
}
```

Descriptions of the above file:

- MEMORY: Defines your microcontroller’s memory layout - 1 MB Flash and 128 KB SRAM.
- ENTRY(Reset_Handler): Sets the reset handler as the program entry point.
- .isr_vector and .text: Code sections placed in Flash. `.isr_vector` must use `KEEP()` so it's not removed during linking.
- .data : AT(_etext): Loads initialized variables from Flash but places them in RAM.
- .bss: Zero-initialized data, allocated in RAM
- _estack: Defines the initial stack pointer using the end of RAM.

Here are some sources to understand Makefiles, cross-compilation, and Linkers. And just note that using Makefile in a project is the best way to learn and master Makefiles:

1. Makefiles:
    - [<VPIcon icon="fas fa-globe"/>GNU Make Manual](https://gnu.org/software/make/manual/make.pdf)
    - [<VPIcon icon="fas fa-globe"/>Makefile Tutorial](https://makefiletutorial.com/)
    - [<VPIcon icon="fas fa-globe"/>In Pyjama Makefile Article](https://gnu.org/software/make/manual/make.pdf)
2. Linker Scripts:
    - [<VPIcon icon="fas fa-globe"/>Interrupt Blog on Linker Scripts](https://interrupt.memfault.com/blog/how-to-write-linker-scripts-for-firmware)
    - [Intro to Linker Files - Medium (<VPIcon icon="fa-brands fa-medium"/>`@pc0is0me`)](https://medium.com/@pc0is0me/an-introduction-to-linker-file-59ce2e9c5e73)

### Flashing the Binary

Once you’ve compiled your code into a binary file, the next step is to **flash** it into the target microcontroller’s non-volatile memory via **SWD** (Serial Wire Debug) or **JTAG**. Flashing tools like OpenOCD, ST-Link, J-Link, or vendor-specific utilities manage this process.

#### What Is Flashing?

Flashing is the process of writing a compiled firmware image (typically a `.bin` or `.hex` file) into the microcontroller’s Flash memory. This enables the embedded system to retain and run your code even after power is removed.

The flashing tool communicates with the microcontroller over SWD or JTAG to:

- Halt the MCU (if needed)
- Access the internal flash controller
- Erase the relevant flash sectors
- Write the binary data to specific memory addresses
- Verify that the data was written correctly

OpenOCD (Open On-Chip Debugger) is a powerful, open-source utility that facilitates debugging and flashing of ARM-based microcontrollers. It supports a wide variety of hardware interfaces and microcontroller families, including STM32. OpenOCD provides:

- Flashing capabilities for `.elf`, `.bin`, and `.hex` files
- Debugging via GDB (GNU’s open source debugger) integration
- Support for multiple debug probes (J-Link, ST-Link, CMSIS-DAP)
- Scripting via configuration files for board-specific and target-specific setups

A simple command to flash a binary using OpenOCD might look like this:

```sh
bashCopyEditopenocd \
-f interface/stlink.cfg \
-f target/stm32f4x.cfg \
-c "program main.elf verify reset exit"
```

This tells OpenOCD to:

- Use the ST-Link interface
- Load the STM32F4 target configuration
- Program `main.elf` into flash
- Verify it was written correctly
- Reset the MCU
- Exit the session

For a detailed walkthrough, check out: [<VPIcon icon="fas fa-globe"/>OpenOCD Deep Dive - Kickstart Embedded](https://kickstartembedded.com/2024/03/26/openocd-one-software-to-rule-debug-them-all/)

---

## Bare Metal, RTOS, and Embedded Operating Systems

When writing embedded software, you can approach the problem in three main ways, each with its own trade-offs:

1. Bare-Metal Programming
2. Real-Time Operating Systems (RTOS) (like FreeRTOS, Zephyr)
3. Embedded Operating Systems (like Embedded Linux)

The best choice depends on your use case, application’s complexity, hardware constraints, and real-time needs.

Most Modern 32-bit microcontrollers (for example, STM32, NXP, Renesas) come with vendor-provided development tools that include:

- HAL (Hardware Abstraction Layer) libraries
- Startup code and linker scripts
- Peripheral drivers
- Sometimes even middleware like USB, BLE, or file system stacks

These tools (like [<VPIcon icon="iconfont icon-st-microelectronics"/>STM32Cube](https://st.com/en/ecosystems/stm32cube.html) Config Tools) simplify setup and peripheral configuration, helping you get started quickly, without needing to write low-level code manually.

**Benefits of HALs**:

- Rapid prototyping and development
- Clean, reusable APIs for peripherals
- Great for onboarding and small teams

**Drawbacks**:

- Code bloat - HALs support many edge cases and configurations, which can inflate your binary size
- Extra latency - HAL often inserts unnecessary layers that reduce performance.

For performance-critical systems, developers often replace HAL drivers with custom, low-level implementations.

### Bare-Metal Programming

Bare-metal programming is the most direct and lightweight approach. There’s no OS, and your code runs directly on the hardware with full control.

Typical setup includes:

- Include the correct header files, especially MCU and peripheral-specific headers provided by the vendor’s HAL (Hardware Abstraction Layer).
- Implement a `main()` function with an infinite loop (`while(1)`)
- Perform all hardware initialization before entering the loop
- Use Interrupts to handle asynchronous events.
- Continuously check and control inputs/outputs inside the loop

This assumes your toolchain provides startup code and memory setup from the vendor.

```c
#include "MCU_Header.h"

int main(void) {
    /* Initialize the MCU and the peripherals */
    init_clock();
    init_peripherals();

    /* runs in a loop forever */
    while (1) {
        // Task 1 : Read sensor data
        read_sensor(); 
        // Task 2 : Update the actuator based on the sensor data
        update_actuator(); 
    }
}
```

#### How does it run?

When the device powers on or resets, the startup code provided by the vendor is executed first. This code:

- Initializes the reset vector
- Copies initialized data from Flash to RAM
- Zeros out the `.bss` section (for uninitialized global/static variables)
- Calls your `main()` function

After calling `main()`, the system enters an infinite loop where your logic runs. The only other context switch occurs when an interrupt is triggered, briefly diverting control to an Interrupt Service Routine (ISR), after which it returns to the main loop.

::: important When to use it

- Simpler applications (for example, blinking LEDs, reading sensors)
- Ultra-low-power or ultra-low-latency needs
- When every byte of Flash and RAM matters

:::

::: tabs

@tab:active Pros

- Minimal memory usage
- Maximum control
- Great for learning

@tab Cons

- No built-in task management or scheduling
- Can become hard to maintain for complex systems

:::

This resource provides good details and example on [Bare Metal Programming (<VPIcon icon="iconfont icon-github"/>`cpq/bare-metal-programming-guide`)](https://github.com/cpq/bare-metal-programming-guide). For more details, this book is great as well: [<VPIcon icon="fas fa-globe"/>ARM Baremetal Ebook](https://umanovskis.se/files/arm-baremetal-ebook.pdf).

### Real-Time Operating Systems (RTOS)

A Real-Time Operating System (like [<VPIcon icon="fas fa-globe"/>FreeRTOS](https://freertos.org/Documentation/01-FreeRTOS-quick-start/01-Beginners-guide/00-Overview), [<VPIcon icon="fas fa-globe"/>Zephyr](https://docs.zephyrproject.org/latest/)) adds lightweight multitasking capabilities to your embedded application. It allows you to split your software into independent tasks that run concurrently and communicate through queues, semaphores, or message passing.

RTOS kernels often support different scheduling strategies like:

- Rate Monotonic Scheduling (RMS) - Tasks with shorter periods get higher priority
- Earliest Deadline First (EDF) - Tasks are prioritized based on impending deadlines

::: tip Example use cases

- A drone where sensor data, motor control, and telemetry need to run in parallel
- A medical device where timing is critical for safety
- Rockets

:::

::: info Typical RTOS features

- Task scheduling
- Timers
- Inter-task communication
- Interrupt handling integration
- Power management

:::

::: tabs

@tab:active Pros

- Modular code structure with tasks
- Easier to scale as complexity grows
- Deterministic execution (when configured correctly)

@tab Cons

- Slightly higher memory footprint than bare-metal
- Learning curve for scheduling and priority tuning

:::

RTOS Scheduling techniques are interesting - this part of the docs talks about [<VPIcon icon="fas fa-globe"/>Zephyr](https://docs.zephyrproject.org/latest/kernel/services/scheduling/index.html#scheduling-algorithm) scheduling.

### Embedded Operating Systems

Sometimes an embedded system is powerful enough to run a full-fledged OS like Embedded Linux, Android Things, or Windows IoT Core. This is common on devices with a display, networking stack, or file system.

It’s best used when the system requires multitasking, user interfaces, file systems, or network stacks, and when there’s plenty of processing power (for example, ARM Cortex-A).

Think of:

- Smart home hubs
- Automotive infotainment
- Industrial gateways

This table provides a high level methodology for choosing the right type of OS based on your application:

| **Criteria** | **Bare Metal** | **RTOS** | **Embedded OS** |
| --- | --- | --- | --- |
| **System** **Complexity** | Low | Medium | High |
| **Memory** **Footprint** | Very Low | Moderate | High |
| **Real-Time Guarantees** | Limited | Yes | Depends on Kernel Design |
| **Learning Curve** | Steep for scaling | Moderate | Steeper (OS internals, tools) |
| **Use Case Examples** | Blinking LED, sensor polling | Drones, medical devices | Gateways, touchscreens |

To understand OS fundamentals, this is a great book: [<VPIcon icon="fa-brands fa-amazon"/>Operating System Concepts](https://amazon.com/Operating-System-Concepts-Abraham-Silberschatz/dp/0470128720) and this is a great course: [<VPIcon icon="fa-brands fa-youtube"/>UC Berkeley: CS162](https://youtube.com/playlist?list=PLF2K2xZjNEf97A_uBCwEl61sdxWVP7VWC).

So far, we’ve looked at how embedded applications are structured, whether using bare-metal loops, RTOS multitasking, or full operating systems. But regardless of which execution model you choose, your software ultimately needs to interact with the hardware.

This is where driver development comes in. Drivers form the crucial link between your code and the peripherals it controls, whether it's reading temperature, blinking an LED, or transmitting data over SPI. Let’s take a closer look at how to design robust, portable drivers for embedded systems.

---

## Designing Drivers for Embedded Systems

When working with embedded software, one of the most practical and common tasks you’ll encounter is driver development.

A driver is a piece of software that enables the microcontroller (MCU) to interface with a hardware peripheral. This could be a temperature sensor, a motor controller, a display, or even a wireless module.

Drivers act as a bridge between your hardware and the application logic. They abstract away the raw register-level programming so that higher-level code can use clear function calls like `read_temperature()` or `start_motor()`.

### What Goes Into a Driver?

A typical embedded driver will include:

- Configuration - Setting up the peripheral with initial parameters (for example, baud rate for UART)
- Initialization - Preparing the peripheral for use, including enabling clocks and interrupts
- Calibration (if needed) - Adjusting the peripheral based on specific environment or use case
- Register Access - Reading from and writing to hardware registers (if applicable)
- Power Management - Enabling/disabling the peripheral to save power or putting the peripheral into a low power mode
- Interrupt Management - Handling asynchronous events triggered by the peripheral

Here’s a simplified view of a sensor driver API:

```c
void sensor_init(void);
void sensor_calibrate(void);
float sensor_read_temperature(void);
void sensor_sleep(void);
void sensor_write(uint8_t reg, uint8_t value); // Assumption : 8 bit register address and 8 bit data value
```

The actual implementation might involve:

- Register definitions from the peripheral’s datasheet
- Bit manipulations for control and status registers
- Interrupt Service Routines (ISRs)
- Timing and delay management

### Platform Abstraction: Why It Matters

One of the most important principles in driver design is decoupling the application from the platform. This makes your code easier to:

- Port to different MCUs
- Adapt for similar hardware (for example, different sensor models)
- Test across simulated or real environments

#### Platform-Agnostic Design Example (in C++):

Let’s say you're writing a driver for a temperature sensor:

```cpp
// Abstracts the HW platform on which the sensor driver is being written
class TemperatureSensorPlatform {
public:
    void i2cInit(void);
    void i2cWrite(uint8_t reg, uint8_t value);
    uint8_t i2cRead(uint8_t reg);
};

// Creates a generic Temperature sensor driver interface
class TemperatureSensor {
public:
    virtual void init() = 0;
    virtual float read() = 0;
    virtual void sleep() = 0;
};
```

You can implement this interface differently for a specific type of temperature sensor and also add the platform support for the HW platform you are writing the driver on for example STM32.

```cpp
class TempSensorTMP117 : public TemperatureSensor {
public:
    TempSensorTMP117(TemperatureSensorPlatform platform) : 
    _platform(platform)
    TemperatureSensor()
    {}

    void init() override {
        // TMP117-specific register configuration
    }

    float read() override {
        // Read ADC value and convert
        return 25.4f;
    }

    void sleep() override {
        // Put sensor in low-power mode
    }
private:
    TemperatureSensorPlatform _platform; // Implements the I2C driver for STM32
};
```

Your application code now depends on the `TemperatureSensor` interface and Temperature Sensor Platform passed in the constructor making it portable and testable across temperature sensors and HW platforms.

One of my previous [**articles**](/freecodecamp.org/connect-read-process-sensor-data-on-microcontrollers-for-beginners.md) provides details on how to interface a sensor and how to design a driver for it.

Designing robust and modular drivers helps your firmware interact seamlessly with hardware, but in today’s connected world, that’s only part of the challenge. As embedded devices increasingly communicate with other systems, security becomes just as critical as functionality.

Now that we’ve covered how to interface with hardware, let’s explore how to protect those systems from unauthorized access, tampering, and data breaches.

---

## Security in Embedded Systems

Security is often overlooked in embedded development but it shouldn’t be. Embedded systems are increasingly connected to networks, cloud services, or other devices, which makes them vulnerable to attacks like unauthorized access, firmware tampering, or data leaks.

Even simple devices like smart plugs or fitness trackers can be exploited if their firmware is insecure.

### Key Security Practices

- **Secure Boot:** Ensure the firmware is cryptographically signed and verified before execution. This prevents unauthorized firmware from running.
- **Firmware Update Integrity:** Use encrypted or signed updates, especially for Over-the-Air (OTA) upgrades. Unprotected updates can be a major attack vector.
- **Lock Debug Interfaces:** After flashing the final firmware, disable or lock access to JTAG, SWD, or UART debug ports to prevent reverse engineering.
- **Minimal Exposure:** Disable unused peripherals (for example, Bluetooth, USB, network interfaces) and avoid exposing debug info (like UART prints) in production.
- **Watchdog Timers:** While not security features per se, watchdogs help ensure system recovery in the event of unexpected software behavior - which could result from attacks or bugs.

Security should be layered, as no single mechanism is sufficient on its own. Build security into every stage of the development process, from boot to communication to update handling.

Whether you're designing a consumer product or an industrial controller, proactive security practices are essential for protecting user data, system reliability, and device reputation.

This resource provides a good understanding of Embedded Systems Security: [<VPIcon icon="fas fa-globe"/>BlackBerry QNX: Embedded System Security Guide](https://blackberry.qnx.com/en/ultimate-guides/embedded-system-security)

---

## Debugging and Forensics in Embedded Systems

Debugging embedded systems is one of the most challenging and fascinating aspects of development. Unlike in desktop or web applications, bugs in embedded systems often manifest as unexpected hardware behavior rather than error messages.

For example, suppose your code is supposed to blink an LED once per second:

- If the LED stays on, your delay code might be broken.
- If it blinks erratically, you might have a timing bug.
- If it doesn’t blink at all, you might never be reaching that part of your code or the hardware might not be configured correctly.

### Why Debugging is Critical

Embedded systems directly control real-world hardware, often in critical or safety-sensitive environments. A small bug can lead to large consequences.

Historical Note: During the Apollo 11 moon landing, the onboard computer started throwing alarms due to a task overflow. The system restarted and was able to recover itself and allowing the mission to continue safely.

Debugging and post-mortem analysis (forensics) are essential skills for embedded developers.

### Common Debugging Tools and Techniques

#### 1. Print Statements (UART Logging)

The simplest and most common method. They send debug messages over a serial connection (UART).

You can use `printf()` or similar to track variable values, function entries/exits, and system state

- Pros: Easy to implement
- Cons: Can affect timing - not usable if UART is unavailable or disabled

#### 2. Trace Variables

In systems without output peripherals (like UART), you can use trace flags, setting bits in a global variable to indicate code progress.

```c
uint32_t trace_flags = 0;

void init_sensor() 
{
    trace_flags |= (1 << 0); // Bit 0: sensor init started
    // ...
    trace_flags |= (1 << 1); // Bit 1: sensor init complete
}
```

You can then examine `trace_flags` in memory to track execution flow, even post-mortem. The trace flags can be printed out or dumped via lldb or gdb.

#### 3. Hardware Debugging: JTAG, SWD, and Debuggers

Modern microcontrollers (like ARM Cortex-Ms) support hardware debugging interfaces such as:

- JTAG (Joint Test Action Group)
- SWD (Serial Wire Debug)

These allow a debugger to:

- Pause execution
- Set breakpoints
- Inspect and modify memory
- Single-step through code

[<VPIcon icon="iconfont icon-arm"/>ARM CoreSight](https://developer.arm.com/documentation/102520/0100) is a debug and trace architecture developed by ARM for its processor cores (like Cortex-M, Cortex-A, Cortex-R). It provides a set of hardware modules built into ARM-based chips that allow developers to:

- Debug the system while it's running (non-intrusively)
- Trace code execution, memory accesses, and peripheral activity
- Analyze system performance and find hard-to-catch bugs

In short: CoreSight lets you look inside your embedded system while it's alive and working, without halting it unnecessarily.

### Why CoreSight Exists

Traditional debugging tools (like breakpoints or single-stepping with JTAG) are often intrusive (they pause the system), limited (can't capture what happened right before a crash), or not suitable for real-time systems.

CoreSight solves these by enabling real-time tracing and non-intrusive observation of what's happening inside the chip.

#### Popular Debug Tools

- ST-Link - HW from STMicrocontrollers
- J-Link - Universal debugger supporting a wide range of MCUs
- OpenOCD - Open-source interface for hardware debugging
- GDB / LLDB - Command-line debuggers used alongside the above

Single-stepping is most effective when compiler optimizations are off. With optimization, code might be reordered, inlined, or even eliminated.

### 4. Using Map and Disassembly Files

When debugging complex issues, especially crashes or memory overflows, you'll need to go deeper.

Map Files show the layout of functions and variables in memory (Flash and RAM). They help you locate:

- Stack overflows
- Unexpected memory usage
- Function addresses

Disassembly Files let you see the machine code generated from your source. This is critical when:

- Code is heavily optimized
- You’re diagnosing instruction-level failures
- You’re working without source code (e.g., binary-only drivers)

This resource provides a good overview on Map files, linkers and ELF format: [<VPIcon icon="fas fa-globe"/>Tenouk’s ELF/Map/Linker Guide](https://tenouk.com/ModuleW.html)

### Common Bug: Buffer Overflows

Buffer overflows are one of the most frequent (and dangerous) issues in embedded systems. They happen when data is written past the end of an allocated array, overwriting nearby memory and causing unpredictable behavior.

Symptoms:

- Code crashes mysteriously
- Data appears to “corrupt itself”
- Variables change value without explanation

You can learn more in my article on [**Debugging Buffer Overflows**](/freecodecamp.org/how-to-debug-and-prevent-buffer-overflows-in-embedded-systems.md), which walks through ways to debug a buffer overflow and build robust buffer code.

### Embedded Forensics

Sometimes, a device fails in the field, where you can’t attach a debugger. That’s where forensics comes in:

- Use watchdog timers to reset the system and log failure info
- Save crash signatures to non-volatile memory (for example, EEPROM, Flash)
- Implement assert handlers that log file names, line numbers, or fault types

These techniques help you reconstruct what went wrong after the device has rebooted or been recovered.

You can learn more here: [Debugging Techniques for Embedded Systems - Medium (<VPIcon icon="fa-brands fa-medium"/>`lanceharvieruntime`)](https://medium.com/@lanceharvieruntime/debugging-techniques-for-embedded-systems-94d00582074a).

Debugging and forensics are invaluable when something goes wrong - but a robust system should aim to catch issues before they reach deployment.

That’s where automated testing becomes essential. With embedded software increasingly powering critical applications, the ability to run consistent, repeatable tests across hardware configurations saves time, improves reliability, and enables faster development cycles.

Next, let’s explore how embedded testing works, the challenges unique to hardware, and how automation frameworks help streamline validation.

---

## Automation and Testing in Embedded Systems

Like all other areas of software engineering, testing is essential in embedded systems. But testing embedded software comes with its own set of challenges, mainly because it interacts with hardware.

Manual testing can be time-consuming and resource-intensive, especially when tests need to be repeated for multiple firmware versions or configurations. That’s where automated testing becomes invaluable.

### Why Automated Testing?

Automated testing helps:

- Catch regressions early
- Test edge cases consistently
- Reduce human error
- Scale testing across versions and hardware setups

But automating tests for embedded systems isn’t just writing test cases - it’s about setting up an infrastructure that connects your code to the physical hardware under test.

### Test Architecture: Host + DUT

Most embedded test setups involve two components:

- Host: Your development PC or CI test controller, which sends test commands and receives data.
- DUT (Device Under Test): The microcontroller board or embedded system running the firmware.

These two communicate over a physical link, commonly USB, UART, or FTDI, which carries commands and test data between them.

#### Diagram (suggested structure)

You could visualize this as:

![Describes the flow of automation, Automation Manager on the host that takes CSV and Config Files and is the control center of Automation. Automation Manager on the DUT helps parse commands coming from host and provide replies to the host, the automation manager on the DUT will forward queries to different modules in the DUT for actions and queries. The communication protocol between Host and DUT is over USB or UART over FTDI](https://cdn.hashnode.com/res/hashnode/image/upload/v1749953253453/4a94ae37-dd17-4be1-aece-d1c2bee0248d.png)

### Key Components of Embedded Test Automation

#### 1. File Management

Many automated tests rely on **CSV or JSON files** to define:

- Input configurations
- Expected outputs
- Test parameters

Python makes it easy to:

- Read input vectors from CSVs
- Write logs or pass/fail results
- Parse structured data

#### 2. Data Communication

Maintaining a stable and reliable link between the Host and DUT is critical. This includes:

- Opening and managing UART or USB connections (for example, with `pyserial`)
- Framing test commands using opcodes or simple protocols
- Handling timeouts, retries, and error recovery

::: tip Example (Python with PySerial)

```py
import serial

ser = serial.Serial('/dev/ttyUSB0', 115200) #set Baud rate
ser.write(b'\x01')  # Send opcode for "start test"
response = ser.read(64)  # Read 64 bytes of response
```

:::

#### 3. Automation Manager (DUT-side)

A lightweight software agent runs on the embedded device. Its responsibilities:

- Parse incoming commands
- Trigger specific test routines
- Send response data back to the host

This is often implemented using a `switch-case` structure in `C` or `C++`:

```c
void automation_manager(uint8_t opcode) {
    switch(opcode) {
        case 0x01: run_sensor_test(); break;
        case 0x02: run_motor_test(); break;
        default: break;
    }
}
```

#### 4. Automation Manager (Host-side)

This is the control center of your test workflow:

- Sends test commands and parameters to the DUT
- Waits for and logs results
- Compares responses to expected output
- Handles communication retries or failures

Often written in Python using:

- `pyserial` for communication
- `pandas` for file/data processing
- `unittest` or `pytest` for test structure

::: tip Tips for Effective Automation

- Use unique opcodes for each test command to avoid ambiguity
- Implement timeout handling to avoid hanging scripts
- Log everything, responses, errors, test timestamps
- Use versioned test input files to track changes over time
- Include self-tests on the DUT to validate hardware state before running full tests

:::

Automated testing in embedded systems is not just about running scripts, it's about building a bridge between your host PC and your device, managing the flow of commands and data, and ensuring tests are consistent, repeatable, and reliable.

While this requires effort to set up, the payoff is huge: confidence in your firmware, faster development cycles, and reduced risk of bugs making it into production.

---

## Where to Go from Here

### Building your Embedded Project

After exploring the theory and tooling of embedded systems, it's time to apply what you've learned. This section walks you through the steps to create your own embedded system - from concept to code and deployment.

Use the checklist below to guide your first project, whether you're prototyping a sensor device or automating a simple process.

#### Project Setup Checklist:

##### 1. Define the Goal

- What task does the system perform?
- Identify inputs (for example, temperature sensor) and outputs (for example, relay or LED).

##### 2. Requirements Gathering

- Functional: What features must it support?
- Non-functional: Memory limits, real-time behavior, power constraints.
- Any security or safety-critical elements?

##### 3. Choose Your Hardware

- Microcontroller (for example, STM32F4)
- Sensors and actuators
- Communication interfaces (UART, I2C, SPI, and so on)

##### 4. Software Architecture

- Bare-metal, RTOS, or embedded OS?
- Driver abstraction: will you use HAL or custom low-level code?
- Organize code into layers: application logic, drivers, hardware init.

##### 5. Toolchain Setup

- Install GCC toolchain (for example, `arm-none-eabi-gcc`)
- Configure Makefile and linker script
- Set up debugger and flashing tools (for example, OpenOCD, ST-Link)

##### 6. **Firmware Implementation**

- Initialize peripherals
- Implement control logic inside `main()` or tasks
- Use interrupts or timers for responsiveness

##### 7. Flashing and Initial Tests

- Use OpenOCD or ST-Link to flash the binary
- Test peripheral behavior and debug with UART or GDB

##### 8. Debug and Profile

- Use JTAG/SWD, CoreSight, and trace logs
- Check memory layout with map/disassembly files
- Identify bottlenecks and edge cases

##### 9. Security Hardening

- Disable debug interfaces post-flash
- Add firmware signing and secure boot
- Minimize surface area: disable unused features

##### 10. Testing and Automation

- Connect Host to DUT via UART/USB
- Use Python + PySerial to send test vectors
- Log, compare, and report test outcomes

Embedded firmware development is a deep and rewarding field where software meets the hardware. Whether you're controlling an LED, reading from a sensor, or orchestrating multiple tasks in real time, the embedded stack teaches you how hardware, software, timing, and efficiency all come together.

---

## Summary

In this guide, we walked through the essential building blocks at a high level:

- What embedded systems are, and how they sense → process → act
- How microcontrollers work, from memory layout to interrupts and protocols
- How to design robust, scalable embedded software with clean architecture
- When to choose bare-metal, RTOS, or full OS solutions
- How to build drivers, write modular code, and interface with peripherals
- Tools for debugging, tracing, and analyzing system behavior
- Strategies for automating embedded testing using Python and host-device communication
- And finally, why security matters, especially in a connected world

Whether you're preparing for embedded job interviews, building your own IoT projects, or just exploring how software drives real-world systems, this article gives you a launchpad for deeper learning.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Learn Embedded Systems Firmware Basics - A Handbook for Developers",
  "desc": "Have you ever wondered how your fridge knows when to cool, or how a coffee machine knows when to stop pouring? Behind the scenes, these devices are powered by embedded systems - small, dedicated computers designed to perform specific tasks reliably a...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/learn-embedded-systems-firmware-basics-handbook-for-devs/",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
