---
lang: en-US
title: "How to Benchmark Your Code in C#"
description: "Article(s) > How to Benchmark Your Code in C#"
icon: iconfont icon-csharp
category:
  - C#
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - cs
  - csharp
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Benchmark Your Code in C#"
    - property: og:description
      content: "How to Benchmark Your Code in C#"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-benchmark-your-code-in-csharp.html
prev: /programming/cs/articles/README.md
date: 2024-11-19
isOriginal: false
author: Grant Riordan
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1731752379027/4ec760c3-4183-4852-9d3d-e3a5c75b4bcf.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": " > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/cs/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Benchmark Your Code in C#"
  desc="Knowing how your code performs is a crucial part of development. We strive to write the most optimal and performant code whilst keeping readability. In this article, I will show you how to test the performance of your code, benchmark your code, and i..."
  url="https://freecodecamp.org/news/how-to-benchmark-your-code-in-csharp"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1731752379027/4ec760c3-4183-4852-9d3d-e3a5c75b4bcf.png"/>

Knowing how your code performs is a crucial part of development. We strive to write the most optimal and performant code whilst keeping readability.

In this article, I will show you how to test the performance of your code, benchmark your code, and identify areas of improvement within your code base.

---

## What is Benchmarking?

Benchmarking measures the performance of your code, application, system, or hardware under specific conditions.

The goal is to gather precise data about how the system behaves for metrics like processing speed, memory usage, resource consumption, or throughput and to identify areas where performance can be optimized.

---

## Why Using a Stopwatch is Not Reliable

Using the `Stopwatch` class for benchmarking in C# comes with many problems. Although it provides a simple way to measure elapsed time on a method or process, it lacks the precision, control, and consistency needed for accurate benchmarking.

Before I get into the negatives of this utility, let’s look at how you could use it for very simple tasks.

```cs
using System.Diagnostics;

// Create a new Stopwatch instance
var sw = new Stopwatch();

// Start the stop watch clock
sw.Start();

// run your code
var sum = 0;
for (int i = 0; i < 100; i++)
{
    sum += i * i;
    Console.WriteLine($"{sw.ElapsedMilliseconds}");
}
// Stop the clock !
sw.Stop();

// Output total time elapsed on the Stopwatch.
Console.WriteLine($"Elapsed time: {sw.ElapsedMilliseconds} ms");
```

This would print out how many milliseconds have elapsed on each iteration as well as the end elapsed milliseconds. As this is a short program, you can convert to nanoseconds by using `ticks` like so:

```cs
long ticks = stopwatch.ElapsedTicks;
double nanoseconds = (ticks * 1e9) / Stopwatch.Frequency;
```

Using a stopwatch can be useful if you want to quickly compare two methods or identify obvious performance bottlenecks during development. It’s a lightweight way to get an initial sense of which sections of code might need optimization.

### Cons of Stopwatch

- Lack of precision by default, being only accurate to around 100 nanoseconds, which may not be useful for smaller quick micro operations.
- JIT (Just in Time) compilation - When code runs for the first time, a JIT compiler compiles the code before running, causing a delay and skewing the timing of completion. Subsequent runs of the code will be slightly faster, however, `Stopwatch` does not account for this. Keeping this in mind, it is worth running the code a few times to try and alleviate this problem.
- Garbage Collection (GC) - If garbage collection happens during a `Stopwatch` measurement, the time recorded will include GC pause time, which does not reflect the actual execution time of your code.

These are just some of the basic, and most common flaws of using a `Stopwatch` to test the performance of your code but there are others.

So what is the best approach?

**BenchmarkDotNet** is a popular and robust library for benchmarking in .NET, which can be installed using `nuget`.

It overcomes many of the above challenges, in the following ways:

- Code Warm Ups - Automatically warms up the code (by running the code a few times) to avoid JIT-related inaccuracies.
- Multiple code iterations - Runs the code multiple times to analyze and calculates statistical summaries, around execution time, heap memory allocation and more. The number of times the code is ran can be configured.
- Isolated Environments - Manages garbage collection and isolates the execution environment to reduce external interference.

---

## How to Use BenchMarkDotnet

Firstly, we need to install the Nuget package. To do this, run the following command in your command line/terminal:

```sh
dotnet add package BenchmarkDotnet
```

We then need some methods to benchmark, so create a .Net 8 C# console app with the following two class files:

```cs title="Program.cs"
using BenchmarkDotNet.Running;

BenchmarkRunner.Run<Benchmarks>();
```

```cs title="Benchmarks.cs"
using BenchmarkDotNet.Attributes;

public class Benchmarks
{
    private readonly int[] _numbers = Enumerable.Range(1, 1000).ToArray();

    [Benchmark]
    public int ForLoopSum()
    {
        int sum = 0;
        for (int i = 0; i < _numbers.Length; i++)
        {
            sum += _numbers[i];
        }

        return sum;
    }

    [Benchmark]
    public int ForeachLoopSum()
    {
        var sum = 0;
        foreach (int number in _numbers)
        {
            sum += number;
        }

        return sum;
    }

    [Benchmark]
    public int LinqSelect()
    {
        return _numbers.Sum();
    }
}
```

Above, we have 3 different methods to add up an array of integers, each doing so in a slightly different fashion. This is a perfect example to show how benchmarking can aid us to choose the best solution in our code base.

### How to Run the Benchmarks

To run the benchmarks, you can run the following commands in your terminal/command line.

```sh
dotnet build
# then run 
dotnet run -c Release
```

BenchmarkDotnet will then run the methods marked with the `[Benchmark]` attribute multiple times, and will output the results in an easy to read table, like so:

```plaintext title="output"
| Method         | Mean     | Error   | StdDev  |
|--------------- |---------:|--------:|--------:|
| ForLoopSum     | 434.2 ns | 0.40 ns | 0.31 ns |
| ForeachLoopSum | 321.9 ns | 1.22 ns | 1.14 ns |
| LinqSelect     | 189.4 ns | 0.84 ns | 0.70 ns |
```

What does this mean?

- **Method**: Name of the method under test
- **Mean**: Shows the mean (average) time it took in nanoseconds.
- **Error**: Represents the margin of error, telling you how much the "Mean" result might vary due to random factors in the system. The lower the number the better, here you can see a very small margin of error meaning the results are stable, whilst large numbers would mean more uncertainty/ unreliable results.
- **StdDev**: (Standard Deviation) shows how consistent the benchmark results are. A low deviation score indicates the time taken was very similar across multiple runs, increasing reliability. If the standard deviation is high, it would mean the method’s execution time varied a lot between runs.

### How to Measure Memory Allocation

Knowing how fast your methods run is a great statistic to understand and know. However, your performance and optimization isn’t just about the time of execution, sometimes you should ensure that there are no memory leaks or large sums of memory utilized, especially with large execution process.

We can use the `[MemoryDiagnoser]` to the `Benchmarks` class, which informs the benchmarking library to include memory statistics to the methods under test.

When we run our benchmarks, we get the following output:

```plaintext title="output"
| Method         | Mean     | Error   | StdDev  | Allocated |
|--------------- |---------:|--------:|--------:|----------:|
| ForLoopSum     | 436.8 ns | 5.32 ns | 4.98 ns |         - |
| ForeachLoopSum | 324.6 ns | 2.20 ns | 2.06 ns |         - |
| LinqSelect     | 192.7 ns | 2.40 ns | 2.24 ns |         - |
```

But wait, the **Allocated** column has but a dash ? Where are the results?

Simple operations, like summing values in an array generally don’t allocate memory, as they often only use stack memory, which BenchmarkDotNet doesn’t track in the same way.

But using the following tests, we can see how memory allocation can be analyzed:

```cs title="MemoryBenchmark.cs"
public class MemoryBenchmark
{
    [Benchmark]
    public string StringConcatenation()
    {
        string result = "";
        for (int i = 0; i < 1000; i++)
        {
            result += "text";
        }
        return result;
    }

    [Benchmark]
    public string StringBuilderConcatenation()
    {
        var builder = new System.Text.StringBuilder();
        for (int i = 0; i < 1000; i++)
        {
            builder.Append("text");
        }
        return builder.ToString();
    }
}
```

Output:

```plaintext title="output"
| Method                     | Mean       | Error     | StdDev    | Gen0     | Allocated  |
|--------------------------- |-----------:|----------:|----------:|---------:|-----------:|
| StringConcatenation        | 218.930 us | 0.7230 us | 0.6409 us | 641.8457 | 3933.56 KB |
| StringBuilderConcatenation |   1.645 us | 0.0034 us | 0.0030 us |   2.6875 |   16.47 KB |
```

Here we have 2 new columns:  

- **Gen0 Column**: The **Gen0** column indicates how many Gen 0 garbage collections occurred during each method’s execution. <br/>.Net uses a generational garbage collection system, where memory is divided into three "generations" (Gen0, Gen1, and Gen2).
- **Gen0 (Generation 0)**: Holds short-lived objects, such as temporary variables and small, quickly discarded objects. Gen0 collections are the fastest type of GC but still introduce some overhead. Examples of Gen0 would be local variables in methods, temporary objects, or method call arguments that aren’t used later on.
- **Gen1 and Gen2**: This is for longer-lived objects that survive Gen0 collections, like static objects that are kept alive for the lifetime of the application (that is, singletons), caching objects or large collections used across many operations.

Objects in **Gen0** are collected quickly but often, and objects in **Gen2** are collected infrequently but with more effort because they are larger or more persistent. A lot of **Gen0** collections can be an indicator of inefficient memory usage, while **Gen2 or 3** collections may indicate that your app is keeping too many long-lived objects in memory.

**Allocated Column:**  
The **Allocated** column shows the total memory allocated by each method during its execution. This is typically reported in kilobytes (KB).

This information helps you see how memory-intensive each method is, which can impact performance, especially if the method is called frequently.

For example, `StringBuilderConcatenation` is much more memory-efficient than `StringConcatenation`, which makes it preferable in cases where memory usage is a concern or where this operation is performed frequently.

---

## What Else Can You Test with BenchmarkDotnet?

### Throughput

- Analyzes how many iterations of a method can be executed per second.
- Indicates the efficiency and scalability of the code.

### JIT (Just-In-Time) Optimization Impact

- Evaluates the effects of JIT optimizations on performance.
- Can test cold starts (first-run performance) versus steady-state performance (subsequent runs).

### Platform and Framework Differences

You could run benchmarks of the same code across different .NET runtimes (for example, .NET 6, .NET 8, .NET Framework) to compare whether it’s worth upgrading your application to newer systems or not.

Simply update the TargetFramework node in the `.csproj` file of your application to target the frameworks you wish to test.

Add the following attributes to your benchmark class (based on the target runtime).

```cs
[SimpleJob(runtimeMoniker: RuntimeMoniker.Net60)]
[SimpleJob(runtimeMoniker: RuntimeMoniker.Net80)]
```

when you run your application you will get an output as below highlighting the differenes in methods across both .net 6 and .net 8

| Method | Job | Runtime | Mean | Error | StdDev |
| ---: | :---: | :---: | :---: | :---: | :---: |
| `StringConcatenation` | .NET 6.0 | .NET 6.0 | 286.503 us | 3.5004 us | 3.1030 us |
| `StringBuilderConcatenation` | .NET 6.0 | .NET 6.0 | 4.595 us | 0.0620 us | 0.0580 us |
| `StringConcatenation` | .NET 8.0 | .NET 8.0 | 222.270 us | 1.7561 us | 1.4664 us |
| `StringBuilderConcatenation` | .NET 8.0 | .NET 8.0 | 1.650 us | 0.0139 us | 0.0116 us |

### Impact of Input Parameters

- Supports parameterized benchmarks to test how different inputs affect performance.
- Helps identify optimal input ranges or problematic edge cases.

You can do something like this

```cs title="SortBenchmark.cs"
using BenchmarkDotNet.Attributes;
using BenchmarkDotNet.Running;

public class SortBenchmark
{
    [Params(10, 100, 1000)]  // Size of the array
    public int N;

    [Params(10, 100, 1000)]  // Maximum value of the array elements
    public int MaxValue;

    private int[] data;

    // Setup method to create an array before each benchmark
    [GlobalSetup]
    public void Setup()
    {
        data = new int[N];
        var rand = new Random();
        for (int i = 0; i < N; i++)
        {
            data[i] = rand.Next(MaxValue);
        }
    }

    [Benchmark]
    public void SortArray()
    {
        Array.Sort(data);  // Sort the array
    }
}

class Program
{
    static void Main(string[] args)
    {
        // Run the benchmark
        BenchmarkRunner.Run<SortBenchmark>();
    }
}
```

Giving the output of:

| Method | N | MaxValue | Mean | Error | StdDev | Allocated |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| `SortArray` | 10 | 10 | 3.5 ns | 0.1 ns | 0.05 ns | 0 B |
| `SortArray` | 10 | 1000 | 4.0 ns | 0.2 ns | 0.1 ns | 0 B |
| `SortArray` | 100 | 10 | 20.1 ns | 0.5 ns | 0.3 ns | 0 B |
| `SortArray` | 100 | 1000 | 25.2 ns | 0.8 ns | 0.4 ns | 0 B |
| `SortArray` | 1000 | 10 | 300.3 ns | 5.6 ns | 2.7 ns | 0 B |
| `SortArray` | 1000 | 1000 | 320.1 ns | 6.3 ns | 3.1 ns | 0 B |

### Third-Party Library Performance

Using the techniques mentioned above, you can compare the performance of different third-party libraries for the same task to make informed decisions on library usage.

---

## Conclusion

There you have it, how to benchmark your C# application. Using a combination of these methods, tools and techniques, the possibilities of benchmarking are incredible.

You can use benchmarking to improve your application’s code base, help make decisions on upgrade paths, and method choices.

I hope you find this article helpful, and as always, if you wish to discuss it you can follow me on [X (<VPIcon icon="fa-brands fa-x-twitter"/>`grantdotdev`)](https://x.com/grantdotdev).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Benchmark Your Code in C#",
  "desc": "Knowing how your code performs is a crucial part of development. We strive to write the most optimal and performant code whilst keeping readability. In this article, I will show you how to test the performance of your code, benchmark your code, and i...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-benchmark-your-code-in-csharp.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
