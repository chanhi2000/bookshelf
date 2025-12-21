---
lang: en-US
title: "The Timsort Algorithm in Python"
description: "Article(s) > (8/8) Sorting Algorithms in Python"
category:
  - Python
  - Article(s)
tag:
  - blog
  - realpython.com
  - python
  - py
head:
  - - meta:
    - property: og:title
      content: "Article(s) > (8/8) Sorting Algorithms in Python"
    - property: og:description
      content: "The Timsort Algorithm in Python"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/sorting-algorithms-python/the-timsort-algorithm-in-python.html
next: /realpython.com/sorting-algorithms-python/README.md#conclusion
date: 2020-04-15
isOriginal: false
author:
  - name: Santiago Valdarrama
    url : https://realpython.com/team/svaldarrama/
cover: https://files.realpython.com/media/Sorting-Algorithms-in-Python-Merge-Sort-vs-Bubble-Sort_Watermarked.5c97ff618265.jpg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Sorting Algorithms in Python",
  "desc": "In this tutorial, you'll learn all about five different sorting algorithms in Python from both a theoretical and a practical standpoint. You'll also learn several related and important concepts, including Big O notation and recursion.",
  "link": "/realpython.com/sorting-algorithms-python/README.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Sorting Algorithms in Python"
  desc="In this tutorial, you'll learn all about five different sorting algorithms in Python from both a theoretical and a practical standpoint. You'll also learn several related and important concepts, including Big O notation and recursion."
  url="https://realpython.com/sorting-algorithms-python#the-timsort-algorithm-in-python"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/Sorting-Algorithms-in-Python-Merge-Sort-vs-Bubble-Sort_Watermarked.5c97ff618265.jpg"/>

The **Timsort** algorithm is considered a **hybrid** sorting algorithm because it employs a best-of-both-worlds combination of insertion sort and merge sort. Timsort is near and dear to the Python community because it was created by Tim Peters in 2002 to be used as the [<VPIcon icon="fa-brands fa-wikipedia-w"/>standard sorting algorithm of the Python language](https://en.wikipedia.org/wiki/Timsort).

The main characteristic of Timsort is that it takes advantage of already-sorted elements that exist in most real-world datasets. These are called **natural runs**. The algorithm then iterates over the list, collecting the elements into runs and merging them into a single sorted list.

---

## Implementing Timsort in Python

In this section, you’ll create a barebones Python implementation that illustrates all the pieces of the Timsort algorithm. If you’re interested, you can also check out the [original C implementation of Timsort (<VPIcon icon="iconfont icon-github"/>`python/cpython`)](https://github.com/python/cpython/blob/master/Objects/listobject.c).

The first step in implementing Timsort is modifying the implementation of `insertion_sort()` from before:

```py{1-3,7,21} :collapsed-lines
def insertion_sort(array, left=0, right=None): 
    if right is None:
        right = len(array) - 1

    # Loop from the element indicated by
    # `left` until the element indicated by `right`
    for i in range(left + 1, right + 1):
        # This is the element we want to position in its
        # correct place
        key_item = array[i]

        # Initialize the variable that will be used to
        # find the correct position of the element referenced
        # by `key_item`
        j = i - 1

        # Run through the list of items (the left
        # portion of the array) and find the correct position
        # of the element referenced by `key_item`. Do this only
        # if the `key_item` is smaller than its adjacent values.
        while j >= left and array[j] > key_item: 
            # Shift the value one position to the left
            # and reposition `j` to point to the next element
            # (from right to left)
            array[j + 1] = array[j]
            j -= 1

        # When you finish shifting the elements, position
        # the `key_item` in its correct location
        array[j + 1] = key_item

    return array
```

This modified implementation adds a couple of parameters, `left` and `right`, that indicate which portion of the array should be sorted. This allows the Timsort algorithm to sort a portion of the array in place. Modifying the function instead of creating a new one means that it can be reused for both insertion sort and Timsort.

Now take a look at the implementation of Timsort:

```py :collapsed-lines
def timsort(array):
    min_run = 32
    n = len(array)

    # Start by slicing and sorting small portions of the
    # input array. The size of these slices is defined by
    # your `min_run` size.
    for i in range(0, n, min_run):
        insertion_sort(array, i, min((i + min_run - 1), n - 1))

    # Now you can start merging the sorted slices.
    # Start from `min_run`, doubling the size on
    # each iteration until you surpass the length of
    # the array.
    size = min_run
    while size < n:
        # Determine the arrays that will
        # be merged together
        for start in range(0, n, size * 2):
            # Compute the `midpoint` (where the first array ends
            # and the second starts) and the `endpoint` (where
            # the second array ends)
            midpoint = start + size - 1
            end = min((start + size * 2 - 1), (n-1))

            # Merge the two subarrays.
            # The `left` array should go from `start` to
            # `midpoint + 1`, while the `right` array should
            # go from `midpoint + 1` to `end + 1`.
            merged_array = merge(
                left=array[start:midpoint + 1],
                right=array[midpoint + 1:end + 1])

            # Finally, put the merged array back into
            # your array
            array[start:start + len(merged_array)] = merged_array

        # Each iteration should double the size of your arrays
        size *= 2

    return array
```

Although the implementation is a bit more complex than the previous algorithms, we can summarize it quickly in the following way:

- **Lines 8 and 9** create small slices, or runs, of the array and sort them using insertion sort. You learned previously that insertion sort is speedy on small lists, and Timsort takes advantage of this. Timsort uses the newly introduced `left` and `right` parameters in `insertion_sort()` to sort the list in place without having to create new arrays like merge sort and Quicksort do.
- **Line 16** merges these smaller runs, with each run being of size `32` initially. With each iteration, the size of the runs is doubled, and the algorithm continues merging these larger runs until a single sorted run remains.

Notice how, unlike merge sort, Timsort merges subarrays that were previously sorted. Doing so decreases the total number of comparisons required to produce a sorted list. This advantage over merge sort will become apparent when running experiments using different arrays.

Finally, **line 2** defines `min_run = 32`. There are two reasons for using `32` as the value here:

1. Sorting small arrays using insertion sort is very fast, and `min_run` has a small value to take advantage of this characteristic. Initializing `min_run` with a value that’s too large will defeat the purpose of using insertion sort and will make the algorithm slower.
2. Merging two balanced lists is much more efficient than merging lists of disproportionate size. Picking a `min_run` value that’s a power of two ensures better performance when merging all the different runs that the algorithm creates.

Combining both conditions above offers several options for `min_run`. The implementation in this tutorial uses `min_run = 32` as one of the possibilities.

::: note

In practice, Timsort does something a little more complicated to compute `min_run`. It picks a value between 32 and 64 inclusive, such that the length of the list divided by `min_run` is exactly a power of 2. If that’s not possible, it chooses a value that’s close to, but strictly less than, a power of 2.

If you’re curious, you can read the [<VPIcon icon="fas fa-globe"/>complete analysis on how to pick `min_run`](https://hg.python.org/cpython/file/tip/Objects/listsort.txt) under the *Computing minrun* section.

:::

---

## Measuring Timsort’s Big O Complexity

On average, the complexity of Timsort is **$O\left(n\:\log_{2}{n}\right)$**, just like merge sort and Quicksort. The logarithmic part comes from doubling the size of the run to perform each linear merge operation.

However, Timsort performs exceptionally well on already-sorted or close-to-sorted lists, leading to a best-case scenario of $O\left(n\right)$. In this case, Timsort clearly beats merge sort and matches the best-case scenario for Quicksort. But the worst case for Timsort is also $O\left(n\:\log_{2}{n}\right)$, which surpasses Quicksort’s $O\left(n^2\right)$.

---

## Timing Your Timsort Implementation

You can use `run_sorting_algorithm()` to see how Timsort performs sorting the ten-thousand-element array:

```py{8} :collapsed-lines
if __name__ == "__main__":
    # Generate an array of `ARRAY_LENGTH` items consisting
    # of random integer values between 0 and 999
    array = [randint(0, 1000) for i in range(ARRAY_LENGTH)]

    # Call the function using the name of the sorting algorithm
    # and the array you just created
    run_sorting_algorithm(algorithm="timsort", array=array)
```

Now execute the script to get the execution time of `timsort`:

```sh
python sorting.py
# 
# Algorithm: timsort. Minimum execution time: 0.5121690789999998
```

At `0.51` seconds, this Timsort implementation is a full `0.1` seconds, or 17 percent, faster than merge sort, though it doesn’t match the `0.11` of Quicksort. It’s also a ridiculous 11,000 percent faster than insertion sort!

Now try to sort an already-sorted list using these four algorithms and see what happens. You can modify your `__main__` section as follows:

```py
if __name__ == "__main__":
    # Generate a sorted array of ARRAY_LENGTH items
    array = [i for i in range(ARRAY_LENGTH)]

    # Call each of the functions
    run_sorting_algorithm(algorithm="insertion_sort", array=array)
    run_sorting_algorithm(algorithm="merge_sort", array=array)
    run_sorting_algorithm(algorithm="quicksort", array=array)
    run_sorting_algorithm(algorithm="timsort", array=array)
```

If you execute the script now, then all the algorithms will run and output their corresponding execution time:

```plaintext title="output"
Algorithm: insertion_sort. Minimum execution time: 53.5485634999991
Algorithm: merge_sort. Minimum execution time: 0.372304601
Algorithm: quicksort. Minimum execution time: 0.24626494199999982
Algorithm: timsort. Minimum execution time: 0.23350277099999994
```

This time, Timsort comes in at a whopping thirty-seven percent faster than merge sort and five percent faster than Quicksort, flexing its ability to take advantage of the already-sorted runs.

Notice how Timsort benefits from two algorithms that are much slower when used by themselves. The genius of Timsort is in combining these algorithms and playing to their strengths to achieve impressive results.

---

## Analyzing the Strengths and Weaknesses of Timsort

The main disadvantage of Timsort is its complexity. Despite implementing a very simplified version of the original algorithm, it still requires much more code because it relies on both `insertion_sort()` and `merge()`.

One of Timsort’s advantages is its ability to predictably perform in $O\left(n\:\log_{2}{n}\right)$ regardless of the structure of the input array. Contrast that with Quicksort, which can degrade down to $O\left(n^2\right)$. Timsort is also very fast for small arrays because the algorithm turns into a single insertion sort.

For real-world usage, in which it’s common to sort arrays that already have some preexisting order, Timsort is a great option. Its adaptability makes it an excellent choice for sorting arrays of any length.
