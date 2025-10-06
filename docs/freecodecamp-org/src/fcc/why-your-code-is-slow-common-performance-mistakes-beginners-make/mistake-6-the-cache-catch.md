---
lang: en-US
title: "Mistake #6: The Cache (catch)"
description: "Article(s) > (6/8) Why Your Code is Slow: Common Performance Mistakes Beginners Make"
icon: fa-brands fa-python
category:
  - Python
  - Java
  - C#
  - C++
  - C
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
  - java
  - c#
  - csharp
  - c++
  - cpp
  - c
head:
  - - meta:
    - property: og:title
      content: "Article(s) > (6/8) Why Your Code is Slow: Common Performance Mistakes Beginners Make"
    - property: og:description
      content: "Mistake #6: The Cache (catch)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/why-your-code-is-slow-common-performance-mistakes-beginners-make/mistake-6-the-cache-catch.html
date: 2025-03-29
isOriginal: false
author:
  - name: Rahul
    url : https://freecodecamp.org/news/author/RAHULISM/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1743176201295/448f0407-8a15-4b59-a91f-8a197bc07578.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Why Your Code is Slow: Common Performance Mistakes Beginners Make",
  "desc": "Maybe you’ve experienced something like this before: you’ve written code that works, but when you hit “run,” it takes forever. You stare at the spinner, wondering if it’s faster to just solve the problem by hand. But you end up looking something like...",
  "link": "/freecodecamp.org/why-your-code-is-slow-common-performance-mistakes-beginners-make/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Why Your Code is Slow: Common Performance Mistakes Beginners Make"
  desc="Maybe you’ve experienced something like this before: you’ve written code that works, but when you hit “run,” it takes forever. You stare at the spinner, wondering if it’s faster to just solve the problem by hand. But you end up looking something like..."
  url="https://freecodecamp.org/news/why-your-code-is-slow-common-performance-mistakes-beginners-make#heading-mistake-6-the-cache-catch"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1743176201295/448f0407-8a15-4b59-a91f-8a197bc07578.png"/>

You’ve heard “cache matters,” but here’s the twist: your loops are lying to your CPU. The way you traverse multi-dimensional arrays can turn a 10x speed difference into a mystery that leaves you questioning reality.

---

## Row-Major vs. Column-Major Access

::: tabs

@tab:active What you think happens

*“Iterating over a 2D array is the same whether I go row-by-row or column-by-column. Right?”*

@tab What actually happens

Memory is laid out linearly, but CPUs prefetch data in chunks (cache lines). Traversing against the grain forces the CPU to fetch new cache lines *every single step*.

:::

::: tip Example in <FontIcon icon="iconfont icon-c"/>C

```c
// A "tiny" 1024x1024 matrix  
int matrix[1024][1024];  

// Fast: Row-major traversal (cache-friendly)  
for (int i = 0; i < 1024; i++) {  
    for (int j = 0; j < 1024; j++) {  
        matrix[i][j] = i + j;  
    }  
}  

// Slow: Column-major traversal (cache-hostile)  
for (int j = 0; j < 1024; j++) {  
    for (int i = 0; i < 1024; i++) {  
        matrix[i][j] = i + j;  
    }  
}
```

**The result**:

- Row-major: ~5ms (data flows like a river).
- Column-major: ~50ms (CPU drowns in cache misses).

:::

**Why it’s worse than you think**:

In C/C++, arrays are row-major. But in Fortran, MATLAB, or Julia, they’re column-major. Use the wrong traversal order in these languages, and you’ll get the same penalty.

---

## The Plot Twist: Your Programming Language is Gaslighting You

In C and Python (NumPy default), arrays use row-major order. But in Fortran, MATLAB, and Julia, arrays are column-major. If you assume the wrong layout, your loops will be slow for no apparent reason.

::: tip <FontIcon icon="fa-brands fa-python"/>Python Example

```py
import numpy as np  

# Row-major (C-style) → Fast for row-wise loops  
row_major = np.zeros((1024, 1024), order='C')  

# Column-major (Fortran-style) → Fast for column-wise loops  
col_major = np.zeros((1024, 1024), order='F')  

# ❌ Slow: Column-wise access on a row-major array  
for i in range(1024):  
    for j in range(1024):  
        col_major[i][j] = i + j  # Cache-miss chaos!
```

**Why this is a problem:**

- Row-major (default in NumPy) expects row-wise access, but the loop accesses it column-wise, causing cache misses.
- Fortran-style arrays are stored column-first, so row-wise loops will be slow instead.

:::

::: info The Fix:

- Match the array order to your access pattern using `order='C'` (row-major) or `order='F'` (column-major).
- Convert data layout with `np.asarray()` if needed.

:::

---

## The Multidimensional Illusion: 3D+ Arrays

::: tabs

@tab:active What you think happens

*“3D arrays are just 2D arrays with extra steps. No big deal.”*

@tab What actually happens:

Each dimension adds a layer of indirection. A 3D array in C is an array of arrays of arrays. Traversing the “wrong” dimension forces the CPU to dereference pointers repeatedly, killing locality.

:::

::: tip Example: 3D Array in Traversal in C

```c
// ✅ Fast: Iterate in Row-Major Order (Innermost Dimension Last)

int space[256][256][256];  

for (int x = 0; x < 256; x++) {  
    for (int y = 0; y < 256; y++) {  
        for (int z = 0; z < 256; z++) {  
            space[x][y][z] = x + y + z;  // Smooth memory access  
        }  
    }  
}
```

So what happens is that the innermost loop moves through contiguous memory, making full use of cache lines.

```c
// ❌ Slow: Iterate in the Wrong Order (Innermost Dimension First)

for (int z = 0; z < 256; z++) {  
    for (int y = 0; y < 256; y++) {  
        for (int x = 0; x < 256; x++) {  
            space[x][y][z] = x + y + z;  // Constant cache misses  
        }  
    }  
}
```

**Why this is bad**:

- This loop jumps across memory every time `x` changes.
- Instead of accessing contiguous memory, it dereferences pointers constantly.
- Penalty: Up to 100x slower for large 3D arrays!

:::

---

## The Nuclear Option: Cache-Aware Algorithms

For extreme performance (game engines, HPC), you need to design for cache lines:

::: tabs

@tab 1. Tiling

Split arrays into small blocks that fit in L1/L2 cache.

```py
#  Process 8x8 tiles to exploit 64-byte cache lines  
for (int i = 0; i < 1024; i += 8) {  
    for (int j = 0; j < 1024; j += 8) {  
        // Process tile[i:i+8][j:j+8]  
    }  
}
```

@tab 2. SoA vs. AoS

Prefer Structure of Arrays (SoA) over Array of Structures for SIMD.

```py
# Slow: Array of Structures (AoS)  
struct Particle { float x, y, z; };  
Particle particles[1000000];  

# Fast: Structure of Arrays (SoA)  
struct Particles {  
    float x[1000000];  
    float y[1000000];  
    float z[1000000];  
};
```

:::
