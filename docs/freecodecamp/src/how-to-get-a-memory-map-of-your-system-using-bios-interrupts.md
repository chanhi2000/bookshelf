---
lang: en-US
title: "How to Get a Memory Map of Your System using BIOS Interrupts"
description: "Article(s) > How to Get a Memory Map of Your System using BIOS Interrupts"
icon: fas fa-microchip
category: 
  - Hardware
  - Kernel
  - Article(s)
tag: 
  - blog
  - freecodecamp.org
  - hardware
  - hw
  - kernel
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Get a Memory Map of Your System using BIOS Interrupts"
    - property: og:description
      content: "How to Get a Memory Map of Your System using BIOS Interrupts"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-get-a-memory-map-of-your-system-using-bios-interrupts.html
prev: /hw/articles/README.md
date: 2024-09-23
isOriginal: false
author:
  - name: Nikolaos Panagopoulos
    url: https://freecodecamp.org/news/author/kerneldevgr/
cover: https://cdn.hashnode.com/res/hashnode/image/stock/unsplash/iar-afB0QQw/upload/7b7f724f7260216b7427408112d5f8c4.jpeg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Hardware > Article(s)",
  "desc": "Article(s)",
  "link": "/hw/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Get a Memory Map of Your System using BIOS Interrupts"
  desc="When you are developing a kernel, one of the most important things is memory. The kernel must know how much memory is available and where it's located to avoid overwriting crucial system resources. But not all memory is freely available for use. Some..."
  url="https://freecodecamp.org/news/how-to-get-a-memory-map-of-your-system-using-bios-interrupts"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/stock/unsplash/iar-afB0QQw/upload/7b7f724f7260216b7427408112d5f8c4.jpeg"/>

When you are developing a kernel, one of the most important things is memory. The kernel must know how much memory is available and where it's located to avoid overwriting crucial system resources.

But not all memory is freely available for use. Some memory sections are reserved for system functions and others may be occupied by hardware devices. That’s why it is very important to get the system’s memory map.

---

## What is a Memory Map?

But what is a memory map? A memory map is a representation (think about it like a table) that shows how physical memory is organized in your system. It shows the address of each memory region, it’s length and it’s type.

Type 1 means that the region is available for you to use freely and type 2 means that it is reserved by your system. Type 3 means that the region is reserved for the Advanced configuration and power interface (ACPI 3.x). While a type 3 region might not be used by the system, it can be reclaimed later.

Using a memory map will allow you to manage memory resources successfully without any issues such as crashes or system instability.

There are some ways you can detect your system’s available memory. One is by using the BIOS and interrupt 15h. Another one is by doing memory probing.

In this article you will learn which tools are available to help you get a memory map of your system, which ones you should use, and which ones you should avoid and why. Then finally, you will see some assembly code that you can use in your own bootloader / kernel.

::: note Prerequisites

if you want to follow along with the code shown in this article, you’ll need:

- A Linux operating system
- Some knowledge of assembly language
- A text editor of your choice
- An emulator installed. For this example I use QEMU.
- FASM assembler installed
- Git to be able to clone the repository ([https://github.com/nikolaospanagopoulos/memoryMapBoot (<VPIcon icon="iconfont icon-github"/>`nikolaospanagopoulos/memoryMapBoot`)](https://github.com/nikolaospanagopoulos/memoryMapBoot))

:::

---

## A Few Words about BIOS int 15h

In Real mode, the BIOS offers many interrupts that interact with the hardware and can give you information.

There are some interrupts that can help with getting a memory map, but the most powerful one is int15h with E820h function (hexadecimal numbers! very important to remember. Decimal numbers will not work). This method offers a detailed memory map that you can use to safely determine which areas of memory can be used for vital tasks like setting up paging, memory allocation, and more.

In this article you will see how you can use this interrupt to get a detailed memory map of your system.

Now, before we go deeper, I would like to add a few things about memory probing and why you should avoid it.

---

## Memory probing and why you should avoid it

Memory probing is the process of manually accessing physical memory and determining whether it is available or not. The issue is that not all memory is designed to be accessed directly.

Accessing parts of memory that you shouldn’t can cause unpredictable behavior like:

- **System Crashes:** some memory is reserved for BIOS structures, hardware devices etc. Accessing those areas can lead to system crashes or system instability.
- **Memory Corruption:** accessing reserved memory areas can lead to corruption of those areas. This can cause again crashes, instability, malfunctions etc

So, you should avoid memory probing because it’s an unnecessary risk to your kernel development process.

---

## The Code

### Step 1: Prepare to Call int 15h

In this part, you will basically setup the environment needed to invoke int 15h. The general purpose registers need to be stored so that no important data on them is lost during the interrupt invocation. Then the registers `bp`, `ebx` are cleared so that they can be set to their initial values.

The “SMAP” value is stored in the `edx` register to ensure the correct format that the BIOS will return. Finally, we setup the `0xe820` function and request memory map data.

```plaintext
pusha
mov di, 0x0504        ; Set DI register for memory storage
xor ebx, ebx          ; EBX must be 0
xor bp, bp            ; BP must be 0 (to keep an entry count)
mov edx, 0x534D4150   ; Place "SMAP" into edx | The "SMAP" signature ensures that the BIOS provides the correct memory map format
mov eax, 0xe820       ; Function 0xE820 to get memory map
mov dword [es:di + 20], 1 ; force a valid ACPI 3.X entry | allows us to get additional information (extended attributes)
mov ecx, 24           ; Request 24 bytes of data
```

- The `pusha` command pushed all general purpose registers to the stack to save their values during the interrupt call. They can be restored after the interrupt call to avoid corruption of other areas.
- The `mov di, 0x0504` instruction sets the di register to 0×0504 (where the memory map entries will be stored).
- `xor ebx, ebx` the xor instruction uses the xor operator to clear the ebx register. It must be set to 0 to start retrieving entries.
- `xor bp, bp` use of the same xor operator here to set bp to 0. This will keep track of your memory entries.
- `mov edx, 0x534D4150` this instruction will store `0x534D4150` (ASCII string “SMAP”) into the edx register. It makes certain that the BIOS will return the correct format for your memory map.
- `mov eax, 0xe820` this instruction sets the function 0xe280 which will get the memory map along with int15h.
- `mov dword [es:di + 20], 1` this instruction forces a valid ACPI (Advanced Configuration and Power Interface) 3.x entry. This way the BIOS provides extra information in the form of extra attributes.
- `mov ecx, 24` this instruction asks the BIOS for 24 bytes of memory data. This is the size that ACPI 3.x entries need to include extra information.

### Step 2: Call int15h

Here, you can finally invoke the interrupt to fetch the memory map. You need to check that the function is supported by the BIOS and that valid data is being fetched. You also need to ensure that the correct format is being fetched by setting again the “SMAP” into the `edx` register.

```plaintext
    int 0x15                 ; using interrupt
    jc short .failed         ; carry set on first call means "unsupported function"
    mov edx, 0x534D4150      ; Some BIOSes apparently trash this register? lets set it again
    cmp eax, edx             ; on success, eax must have been reset to "SMAP"
    jne short .failed
    test ebx, ebx            ; ebx = 0 implies list is only 1 entry long (worthless)
    je short .failed
```

- `int 0x15` this instruction invokes the interrupt 0×15.
- `jc short .failed` is the carry flag that is set. It means the function is unsupported and the call has failed. It jumps to our error handler.
- `mov edx, 0x534D4150` set again the “SMAP” because some BIOSes corrupt this register after the call.
- `cmp eax, edx` if the call is successfull, on success the BIOS will return the “SMAP” value in eax.
- `jne short .failed` if it doesn’t, it means the call has failed and it jumps to our error handling label.
- `test ebx, ebx` this instruction checks if ebx is 0 after the first call. This means that the memory map only contains one entry. This entry is probably invalid, so it jumps to the error handling label.

### Step 3: Loop Through Memory Entries

After a successful first invocation, you need to loop through each entry of the memory map.

In the loop, you will invoke again int 15h to get all subsequent memory entries while checking each entry’s length and other attributes. If it meets the criteria, you increment the counter and you store the entry. This continues until there are no entries left to process.

```plaintext
    jmp short .jmpin
.e820lp:
    mov eax, 0xe820          ; eax, ecx get trashed on every int 0x15 call
    mov dword [es:di + 20], 1 ; force a valid ACPI 3.X entry
    mov ecx, 24              ; ask for 24 bytes again
    int 0x15
    jc short .e820f          ; carry set means "end of list already reached"
    mov edx, 0x534D4150      ; repair potentially trashed register
.jmpin:
    jcxz .skipent            ; skip any 0 length entries (If ecx is zero, skip this entry (indicates an invalid entry length))
    cmp cl, 20               ; got a 24 byte ACPI 3.X response?
    jbe short .notext
    test byte [es:di + 20], 1 ;if bit 0 is clear, the entry should be ignored
    je short .skipent         ; jump if bit 0 is clear 
.notext:
    mov eax, [es:di + 8]     ; get lower uint32_t of memory region length
    or eax, [es:di + 12]     ; "or" it with upper uint32_t to test for zero and form 64 bits (little endian)
    jz .skipent              ; if length uint64_t is 0, skip entry
    inc bp                   ; got a good entry: ++count, move to next storage spot
    add di, 24               ; move next entry into buffer
.skipent:
    test ebx, ebx            ; if ebx resets to 0, list is complete
    jne short .e820lp
```

- `.e820lp` is a label for looping through each memory map entry.

The next lines are used to call int15h to get the next memory entry:

- `jc short .e820f` if the carry flag is set, it means that we have reached the end of the list.
- `jcxz .skipent` if ecx register is 0, it means the length of the memory entry is invalid. So the code skips it.
- `cmp cl, 20` checks if the memory entry is a valid ACPI 3.x entry. (It would be 24 bytes long). If it is not, the code jumps to `.notext`.
- `test byte [es:di + 20], 1` checks if bit 0 is set in the memory entry's extended attributes, indicating a valid entry. If it's clear, the entry is skipped.
- `mov eax, [es:di + 8]` gets the lower 32 bits of the memory region length and then we combine it using the or operator, with the upper 32 bits. If the total length is 0, then the entry is skipped.
- `inc bp` increments entry count.
- `add di, 24` moves the pointer di forward to the next memory entry. Each entry is 24 bytes long.

### Step 4: End of Memory Entries Handling

Finally, you can store the entry count. And by using the `popa` instruction, you will restore all general purpose registers to their previous values. If an error occurs during the process, the code jumps to `.failed` label which is our error handling function.

```plaintext
.e820f:
    mov [mmap_ent], bp       ; store the entry count
    clc                      ; there is "jc" on end of list to this point, so the carry must be cleared

    popa
    ret
.failed:
    stc                      ; "function unsupported" error exit
    ret
```

- `mov [mmap_ent], bp` stores the entry count.
- `clc` clears the carry flag because it is already set.
- `popa` pops all general purpose registers back from the stack.
- `.failed` we use this label for error handling.

Here is a video from my YouTube account where I implement and explain the above code:

<VidStack src="youtube/WW3pduHMWkc" />

---

## Epilogue

In kernel development, one of the most important tasks is managing memory. The above is a reliable way to detect your system’s memory layout information. This means that you can make safe decisions when allocating resources, implementing paging, and so on.

It might appear to be complex and it maybe is, but if you follow the code line by line you will be able to understand it. These techniques will allow you to build a robust kernel capable of running on different hardware configurations.

Keep Coding!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Get a Memory Map of Your System using BIOS Interrupts",
  "desc": "When you are developing a kernel, one of the most important things is memory. The kernel must know how much memory is available and where it's located to avoid overwriting crucial system resources. But not all memory is freely available for use. Some...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-get-a-memory-map-of-your-system-using-bios-interrupts.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
