---
lang: en-US
title: "Binary Exponentiation Algorithm - Explained with Practical Examples"
description: "Article(s) > Binary Exponentiation Algorithm - Explained with Practical Examples"
icon: fa-brands fa-python
category:
  - Python
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
  - algorithms
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Binary Exponentiation Algorithm - Explained with Practical Examples"
    - property: og:description
      content: "Binary Exponentiation Algorithm - Explained with Practical Examples"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/binary-exponentiation-algorithm-explained-with-examples.html
prev: /programming/py/articles/README.md
date: 2024-10-15
isOriginal: false
author: Sahil Mahapatra
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1728672475917/5eeec863-5481-42d8-8b1f-9c92915f570f.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Python > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Binary Exponentiation Algorithm - Explained with Practical Examples"
  desc="Binary exponentiation, also known as exponentiation by squaring, is a powerful algorithm used to efficiently calculate large powers of numbers. This technique is particularly useful in various fields of computer science, including cryptography, compe..."
  url="https://freecodecamp.org/news/binary-exponentiation-algorithm-explained-with-examples"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1728672475917/5eeec863-5481-42d8-8b1f-9c92915f570f.png"/>

Binary exponentiation, also known as exponentiation by squaring, is a powerful algorithm used to efficiently calculate large powers of numbers. This technique is particularly useful in various fields of computer science, including cryptography, competitive programming, and computer graphics.

In this article, we'll explore the concept of binary exponentiation, understand how it works, and implement it in code.

---

## What is Binary Exponentiation?

Binary exponentiation is a method to compute an (a raised to the power of $n$) using only multiplications, instead of the naïve $O\left(n\right)$ multiplications.

This significant improvement in efficiency makes it possible to calculate extremely large powers quickly, even when dealing with modular arithmetic.

---

## How Binary Exponentiation Works

The key idea behind binary exponentiation is to break down the exponent into its binary representation and use the properties of exponents to simplify the calculation.

Let's break it down step by step:

1. Convert the exponent `n` to its binary representation.
2. Initialize the result as 1 and the base as `a`.
3. Iterate through each bit of the binary representation of `n` from right to left:
    - (a). If the current bit is 1, multiply the result by the current base. 
    - (b). Square the base (multiply it by itself).
4. Return the final result.

For example, let's calculate $3^{13}$:

1. Convert $13$ to binary: $13_{10}=1101_{2}$
2. Initialize result $= 1$, base $= 3$
3. Iterate through the bits:
    - Bit $1$: result $=1\times{3}=3$, base $=3\times{3}=9$
    - Bit $0$: result $=3$, base $=9\times{9}=81$
    - Bit $1$: result $=3\times{81}=243$, base $=81\times{81}=6561$
    - Bit $1$: result $=243\times{6561}=1,594,323$

Thus, $313=1,594,323$.

---

## Why Binary Exponentiation is Efficient

The efficiency of binary exponentiation comes from two main factors:

1. **Reduced number of multiplications**: Instead of performing `n-1` multiplications as in the naïve approach, we only perform O(logn) multiplications. This is because we're essentially breaking down the problem into smaller subproblems based on the binary representation of the exponent.
2. **Reuse of previous calculations**: By squaring the base at each step, we're reusing the results of previous calculations, which significantly reduces the overall number of operations needed.

To illustrate this efficiency, consider calculating a1000000. The naïve approach would require 999,999 multiplications, while binary exponentiation would only require about 20 multiplications (as log2⁡(1000000)≈20).

---

## Algorithm Implementation

Let's implement the binary exponentiation algorithm in Python:

```py
def binary_exponentiation(base, exponent):
    result = 1
    while exponent > 0:
        # If the current bit is 1, multiply the result by the current base
        if exponent & 1:
            result *= base
        # Square the base
        base *= base
        # Move to the next bit
        exponent >>= 1
    return result

# Example usage
print(binary_exponentiation(3, 13))  # Output: 1594323
```

Let's break down the algorithm:

1. We initialize `result` to $1$, which is the identity for multiplication.
2. We use a while loop to iterate until the exponent becomes $0$.
3. We check if the least significant bit of the exponent is $1$ using the bitwise AND operator `&`. If it is, we multiply the result by the current base.
4. We square the base by multiplying it by itself.
5. We use the right shift operator `>>=` to move to the next bit of the exponent.
6. Finally, we return the result.

### Time Complexity Analysis

The time complexity of binary exponentiation is $O\left(\log_{}n\right)$, where `n` is the exponent. This is because:

1. The number of bits in the binary representation of `n` is $\lfloor\log_{2}n\rfloor+1$.
2. We perform at most two multiplications per bit (one for squaring the base, and potentially one for updating the result).

Therefore, the total number of multiplications is at most $2(\lfloor\log_{2}n\rfloor+1)$, which simplifies to $O\left(\log_{}n\right)$.

---

## Example Problems and Solutions

Let's look at some algorithmic problems that you can solve efficiently using binary exponentiation, along with detailed explanations of the solutions and how we arrived at using binary exponentiation.

### Problem 1: Modular Exponentiation

::: tabs

@tab:active Problem

Calculate

$$
3^{1000000}\:\text{mod}\:1000000007
$$

@tab Approach

1. We recognize that this problem involves a very large exponent ($1000000$), which would be impractical to compute using naïve exponentiation.
2. We also notice that we need to find the result modulo a large prime number ($1000000007$).
3. This combination of a large exponent and modular arithmetic is a clear indicator that we should use modular binary exponentiation.

@tab Solution

We'll modify our binary exponentiation function to include modular arithmetic:

```py
def mod_binary_exponentiation(base, exponent, mod):
    result = 1
    base %= mod
    while exponent > 0:
        if exponent & 1:
            result = (result * base) % mod
        base = (base * base) % mod
        exponent >>= 1
    return result

print(mod_binary_exponentiation(3, 1000000, 1000000007))  # Output: 624098969
```

@tab Explanation

1. We initialize `result` to 1 and set `base` to `base % mod` to handle cases where the initial base is larger than the modulus.
2. The main loop works similarly to the original binary exponentiation algorithm, but with two key differences:
    - When updating `result`, we perform `(result * base) % mod`. This ensures that `result` never exceeds `mod`, preventing integer overflow and maintaining the correct modular result.
    - When squaring `base`, we perform `(base * base) % mod` for the same reason.
3. The bitwise operations (`exponent & 1` and `exponent >>= 1`) work exactly as in the original algorithm, allowing us to process the binary representation of the exponent efficiently.
4. By applying the modulo operation at each step, we ensure that all intermediate results remain within the range $[0, mod-1]$. This is possible because of the properties of modular arithmetic:

$$
\left(a\times{b}\right)\:\text{mod}\:m=\left(\left(a\:\text{mod}\:m\right)\times\left(b\:\text{mod}\:m\right)\right)\text{mod}\:m
$$

:::

This problem would be impossible to solve with naïve exponentiation due to the huge result, but modular binary exponentiation makes it tractable by keeping all intermediate results manageable.

### Problem 2: Matrix Exponentiation

::: tabs

@tab:active Problem

Given a 2x2 matrix A, calculate An where $n=1000000$.

@tab Approach

1. We observe that we need to raise a matrix to a very large power ($1000000$).
2. Matrix multiplication is associative, which allows us to use the same principle as binary exponentiation for numbers.
3. We recognize that this is a perfect scenario for applying binary exponentiation to matrices.

@tab Solution

We can use binary exponentiation on matrices. Here's a Python implementation with explanations:

```py :collapsed-lines
import numpy as np

def matrix_multiply(A, B, mod):
    return np.array([[(A[0][0]*B[0][0] + A[0][1]*B[1][0]) % mod, (A[0][0]*B[0][1] + A[0][1]*B[1][1]) % mod],
                     [(A[1][0]*B[0][0] + A[1][1]*B[1][0]) % mod, (A[1][0]*B[0][1] + A[1][1]*B[1][1]) % mod]])

def matrix_power(A, n, mod):
    result = np.eye(2, dtype=int)
    while n > 0:
        if n & 1:
            result = matrix_multiply(result, A, mod)
        A = matrix_multiply(A, A, mod)
        n >>= 1
    return result

A = np.array([[1, 1], [1, 0]])
n = 1000000
mod = 1000000007

result = matrix_power(A, n, mod)
print(result)
#
# Output: [[690749268 297612485]
#         [297612485 393136783]]
```

@tab Explanation

1. `matrix_multiply(A, B, mod)`:
    - This function performs matrix multiplication of two 2x2 matrices, A and B.
    - Each element of the resulting matrix is computed using the standard matrix multiplication formula, followed by a modulo operation to keep the values manageable.
2. `matrix_power(A, n, mod)`:
    - This function implements binary exponentiation for matrices.
    - We start with `result` as the 2x2 identity matrix (created using `np.eye(2, dtype=int)`).
    - The main loop follows the same pattern as scalar binary exponentiation: a. If the current bit of n is 1, we multiply `result` by the current `A`. b. We square `A` (by multiplying it with itself). c. We right-shift n to move to the next bit.
    - All matrix multiplications are done using our `matrix_multiply` function, which incorporates modular arithmetic.

:::

This matrix exponentiation technique is particularly powerful for solving linear recurrence relations in logarithmic time, as demonstrated here with the Fibonacci sequence.

---

## Practice Problems

Here are some problems for you to solve using binary exponentiation:

### 1. Modular Exponentiation

Calculate

$$
71234567\:\text{mod}\:1000000009
$$

::: tip Hint

Use the `mod_binary_exponentiation` function from Problem 1 in the examples.

:::

### 2. Last Digit

Find the last digit of .

::: tip Hint

Observe the pattern of last digits of powers of 2 and use binary exponentiation with modulo 10.

:::

### 3. Power Tower

Calculate the last $3$ digits of $2^{2^{20}}$.

::: tip Hint

Use the property of modular arithmetic that $a^{b}\:\text{mod}\:m=a^{b\:\text{mod}\:\phi(m)}\:\text{mod}\:m$ where $\phi$ is Euler's totient function. You'll need to calculate $2^{20}\:\text{mod}\:\phi(1000)$ first.

:::

#### 4. Matrix Chains

Given a 2x2 matrix $A=\begin{bmatrix}1 & 2 \\ 3 & 4\end{bmatrix}$, calculate the last two digits of the sum of all elements in $A^{1000000}$.

::: tip Hint

Use matrix exponentiation as in Problem 2 from the examples, but only keep track of the last two digits of each element. You'll need to sum the elements after the final exponentiation.

:::

#### 5. Fibonacci Sequence

Find the 1000000th Fibonacci number modulo 1000000007.

::: tip Hint

Use the matrix form of the Fibonacci sequence $\begin{bmatrix}1 & 1 \\ 1 & 0\end{bmatrix}$ and apply matrix exponentiation as shown in Problem 2 of the examples.

:::

---

## Conclusion

Binary exponentiation is a powerful technique that can be applied to a wide range of problems involving large exponents. As we've seen in the example and practice problems, it's particularly useful in modular arithmetic, matrix operations, and solving recurrence relations.

By practicing these problems, you'll gain a deeper understanding of how to apply binary exponentiation in various scenarios. Remember, the key is to recognize when a problem involves raising something to a large power, whether it's a number, a matrix, or even a more complex structure.

If you found this explanation of Binary Exponentiation algorithm helpful, you might also enjoy more in-depth programming tutorials and concepts I cover on my [<VPIcon icon="fas fa-globe"/>blog](https://blog.theenthusiast.dev).

<SiteInfo
  name="The Enthusiast"
  desc="A blog from the enthusiast for the enthusiast."
  url="https://blog.theenthusiast.dev"
  logo="https://blog.theenthusiast.dev/favicon.svg"
  preview="https://blog.theenthusiast.dev/astropaper-og.jpg"/>


<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Binary Exponentiation Algorithm - Explained with Practical Examples",
  "desc": "Binary exponentiation, also known as exponentiation by squaring, is a powerful algorithm used to efficiently calculate large powers of numbers. This technique is particularly useful in various fields of computer science, including cryptography, compe...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/binary-exponentiation-algorithm-explained-with-examples.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
