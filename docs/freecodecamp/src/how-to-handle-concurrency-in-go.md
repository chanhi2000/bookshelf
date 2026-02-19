---
lang: en-US
title: "How to Handle Concurrency with Goroutines and Channels in Go"
description: "Article(s) > How to Handle Concurrency with Goroutines and Channels in Go"
icon: fa-brands fa-golang
category: 
  - Go
  - Article(s)
tag: 
  - blog
  - freecodecamp.org
  - go
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Handle Concurrency with Goroutines and Channels in Go"
    - property: og:description
      content: "How to Handle Concurrency with Goroutines and Channels in Go"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-handle-concurrency-in-go.html
prev: /programming/go/articles/README.md
date: 2024-05-11
isOriginal: false
author:
  - name: Destiny Erhabor
    url: https://freecodecamp.org/news/author/CaesarSage/
cover: https://freecodecamp.org/news/content/images/2024/05/joshua-sortino-LqKhnDzSF-8-unsplash.jpg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Go > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/go/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Handle Concurrency with Goroutines and Channels in Go"
  desc="Concurrency is the ability of a program to perform multiple tasks simultaneously. It is a crucial aspect of building scalable and responsive systems.  Go's concurrency model is based on the concept of goroutines, lightweight threads that can run mult..."
  url="https://freecodecamp.org/news/how-to-handle-concurrency-in-go"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2024/05/joshua-sortino-LqKhnDzSF-8-unsplash.jpg"/>

Concurrency is the ability of a program to perform multiple tasks simultaneously. It is a crucial aspect of building scalable and responsive systems.

Go's concurrency model is based on the concept of goroutines, lightweight threads that can run multiple functions concurrently, and channels, a built-in communication mechanism for safe and efficient data exchange between goroutines.

Go's concurrency features enable developers to write programs that can:

- Handle multiple requests simultaneously, improving responsiveness and throughput.
- Utilize multi-core processors efficiently, maximizing system resources.
- Write concurrent code that is safe, efficient, and easy to maintain.

Go's concurrency model is designed to minimize overhead, reduce latency, and prevent common concurrency errors like race conditions and deadlocks.

With Go, developers can build high-performance, scalable, and concurrent systems with ease, making it an ideal choice for building modern distributed systems, networks, and cloud infrastructure.

---

## Case Study: A Bank Teller

Imagine a busy bank with two tellers, Maria and David. Customers arrive at the bank to conduct various transactions like deposits, withdrawals, and transfers. The goal is to serve customers quickly and efficiently.

### Sequential Processing (No Concurrency)

Maria and David work sequentially, one at a time. When a customer arrives, Maria helps the customer, and David waits until Maria is finished before helping the next customer. This leads to a long wait time for customers.

### Concurrency

Maria and David work concurrently, serving customers simultaneously. When a customer arrives, Maria helps the customer with a transaction, and David simultaneously helps another customer with a different transaction. They work together, sharing resources like the bank's database and cash supplies, to serve multiple customers at the same time.

In this scenario, concurrency enables Maria and David to work together efficiently, serving multiple customers simultaneously, and improving the overall customer experience. This same concept applies to computer programming, where concurrency enables multiple tasks to run simultaneously, improving responsiveness, efficiency, and performance.

---

## What are Goroutines and Channels?

A goroutine is a lightweight thread managed by the Go runtime. It is a function that runs on the Go runtime. It helps address concurrency and async flow requirements.

Goroutines allow you to start up and run other threads of execution concurrently within your program.

Channels are used to communicate between goroutines. It is a typed conduit through which you can send and receive values with the channel operator: `<-`.

### How to Implement a Goroutine

To use and implement a `goroutine`, the `go` keyword is used to precede a function.

```go
package main

import (
  "fmt"
  "math/rand"
  "time"
)

func pause() {
  time.Sleep(time.Duration(rand.Intn(1000)) * time.Millisecond)
}

func sendMsg(msg string) {
  pause()
  fmt.Println(msg)
}

func main() {
  sendMsg("hello") // sync

  go sendMsg("test1") // async
  go sendMsg("test2") // async
  go sendMsg("test3") // async

  sendMsg("main") // sync

  time.Sleep(2 * time.Second)
}
```

From the example above,

- The `sendMsg` function is called synchronously and asynchronously.
- The `sendMsg` function is called synchronously when the `sendMsg` function is called without the `go` keyword.
- The `sendMsg` function is called asynchronously when the `sendMsg` function is called with the `go` keyword.

### How Does a Goroutine Work?

When the `sendMsg` function is called with the `go` keyword, the `main` function will not wait for the `sendMsg` function to finish executing before it continues to the next line of code and will return immediately after the `sendMsg` function is called.

Otherwise, the function is called synchronously, and the `main` function will wait for the `sendMsg` function to finish executing before it continues to the next line of code.

The order of the output when you run the above example will differ from the order of the code because the three `goroutine` all run concurrently and since the functions pause for a period of time, the order which they wake will differ and be outputted.

The `time.Sleep(2 * time.Second)` is a quick and simple method used to keep the main function running for 2 seconds to allow the `goroutine` to finish executing before the main function exits. Otherwise, the main function will exit immediately after the `goroutine` is called and the `goroutine` will not have enough time to finish executing resulting to errors.

### What are WaitGroups?

Unlike the `time.Sleep(2 * time.Second)` used in the example above, the `WaitGroups` are more standard to wait for a collection of goroutines to finish executing. It is a simple way to synchronize multiple goroutines.

A goroutine can also be declared with anonymous functions

```go
package main

import (
  "fmt"
  "sync"
  "time"
  "math/rand"
)

func pause() {
  time.Sleep(time.Duration(rand.Intn(1000)) * time.Millisecond)
}

func sendMsg(msg string, wg *sync.WaitGroup) {
  defer wg.Done()
  pause()
  fmt.Println(msg)
}

func main() {
  var wg sync.WaitGroup

  wg.Add(3)

  go func(msg string) {
    defer wg.Done()
    pause()
    fmt.Println(msg)
  }("test1")


  go sendMsg("test2", &wg)
  go sendMsg("test3", &wg)

  wg.Wait()
}
```

From the example above, the `sync.WaitGroup` is used to wait for the three `goroutine` to finish executing before the main function exits. It synchronizes the three `goroutine` and the main function.

- The `sync.WaitGroup (wg)` manages the goroutines and keeps track of the number of goroutines that are running.
- The `sync.WaitGroup.Add (wg.Add)` method is used to add the number of goroutines as arguments that are running.
- The `sync.WaitGroup.Done (wg.Done)` method is used to decrement the number of goroutines that are running.
- The `sync.WaitGroup.Wait (wg.Wait)` method is used to wait for all the goroutines to finish executing before the main function exits.

---

## What are Channels?

Channels are used to communicate between goroutines. It is a typed conduit through which you can send and receive messages with the channel operator, `<-`.

In their simplest form, one goroutine writes messages into the channel and another goroutine reads the same messages out of the channel.

Channels are created using the `make` method and the `chan` keyword together with its type. Channels are used to transfer messages of which type it was declared with.

::: tip Example:

```go
package main

func main(){
    msgChan := make(chan string)
}
```

The example above creates a channel `msgChan` of type `string`.

:::

### How to Write Data to a Channel

To write data to a channel, first specify the name (`msgChan`) of the channel, followed by the `<-` operator and the message. This is considered the **Sender.**

```go
msgChan <- "hello world"
```

### How to Read Data from a Channel

To read data from a channel, simple move the operator (`<-`) to front of the channel name (`msgChan`) and you can assign it to a variable. This is considered the **Receiver.**

```go
msg := <- msgChan
```

### How to Implement Channels with Goroutine

```go
package main

import (
  "fmt"
  "math/rand"
  "time"
)

func main() {

  msgChan := make(chan string)

  go func() {
    time.Sleep(time.Duration(rand.Intn(1000)) * time.Millisecond)
    msgChan <- "hello" // Write data to the channel
    msgChan <- "world" // Write data to the channel
  }()

  msg1 := <- msgChan
  msg2 := <- msgChan

  fmt.Println(msg1, msg2)
}
```

The example above shows how to write and read data from a channel. The `msgChan` channel is created and the `go` keyword is used to create a goroutine that writes data to the channel. The `msg1` and `msg2` variables are used to read data from the channel.

Channels behave as a `first-in-first-out` queue. So, when one goroutine writes data to the channel, the other goroutine reads the data from the channel in the same order it was written.

---

## What are Channel Buffers?

Channels can be `buffered` or `unbuffered`. The previous examples include the use of an unbuffered channels.

### What is an Unbuffered Channel?

An unbuffered channel causes the sender to block immediately after sending a message into the channel until the receiver receives the message.

### What is a Buffered Channel?

A buffered channel allows the sender to send messages into the channel without blocking until the buffer is full. So, the sender blocks only once the buffer has filled up and waits until another goroutine reads off the channel, making sure the space size becomes available before unblocking.

### How to Create a Buffered Channel

When creating a buffered channel, use the `make` function and specify a second parameter to indicate the buffer size.

```go
msgBufChan := make(chan string, 2)
```

The example above creates a buffered channel `msgBufChan` of type `string` with a buffer size of 2. This means that the channel can hold up to two messages before it blocks.

```go
package main

import (
  "time"
)

func main() {
  size := 3
  msgBufChan := make(chan int, size)

  // reader (receiver)
  go func() {
    for {
      _ = <- msgBufChan
      time.Sleep(time.Second)
    }
  }()

  //writer (sender)
  writer := func() {
    for i := 0; i <=> 10; i++ {
      msgBufChan <- i
      println(i)
    }
  }

  writer()
}
```

The example above creates a buffered channel `msgBufChan` of type `int` with a buffer size of 3.

- The `writer` function writes data to the channel and the `reader` function reads data from the channel.
- When the program runs, you will see that the number `0 through to 3` printed out immediately and the remaining numbers `5 through to 10` are printed out slowly about one per second (`time.Sleep(time.Second`).
- This is showing the effect of buffered channel that specify the size it can hold before it blocks.

---

## What are Channel Directions?

When using channels as function parameters, by default, you can send and receive messages within the function. To provide additional safety at compile time, channel function parameters can be defined with a direction. That is, they can be defined to be **read-only** or **write-only**.

::: tip Example

```go
package main

import (
  "fmt"
  "time"
)

func writer(channel chan<- string, msg string) {
  channel <- msg
}

func reader(channel <-chan string) {
  msg := <- channel
  fmt.Println(msg)
}

func main() {
  msgChan := make(chan string, 1)

  go reader(msgChan)


  for i :- 0; i < 10; i++ {
    writer(msgChan, fmt.Sprintf("msg %d", i))
  }

  time.Sleep(time.Second * 5)
}
```

The example above shows how to define a channel with a direction.

- The `writer` function is defined with a write-only channel and
- The `reader` function is defined with a read-only channel.

:::

The `msgChan` channel is created with a buffer size of 1. The `writer` function writes data to the channel and the `reader` function reads data from the channel.

---

## How to Handle Multiple Communication Operations with Channel Select

The `select` statement lets a goroutine wait on multiple communication operations. A `select` blocks until one of its cases can run, then it executes that case. It chooses one at random if multiple are ready.

The `select` and `case` statements are used to simplify the management and readability of `wait` across multiple channels.

::: tip Example:

```go
package main

import (
  "fmt"
  "time"
  "math/rand"
)

func pause() {
  time.Sleep(time.Duration(rand.Intn(1000)) * time.Millisecond)
}

func test1(c chan<- string) {
  for {
    pause()
    c <- "hello"
  }
}

func test2(c chan<- string) {
  for {
    pause()
    c <- "world"
  }
}

func main() {
  rand.Seed(time.Now().Unix())

  c1 := make(chan string)
  c2 := make(chan string)

  go test1(c1)
  go test2(c2)

  for {
    select {
    case msg1 := <- c1:
      fmt.Println(msg1)
    case msg2 := <- c2:
      fmt.Println(msg2)
    }
  }
}
```

The example above shows how to use the `select` statement to wait on multiple channels. The `test1` and `test2` functions write data to the `c1` and `c2` channels respectively. The `main` function reads data from the `c1` and `c2` channels using the `select` statement.

:::

The select statement will block until one of the channels is ready to send or receive data. If both channels are ready, the select statement will choose one at random.

---

## How to Timeout Long Running Processes in a Channel

The `time.After` function is used to create a channel that sends a message after a specified duration. This can be used to implement a timeout for a channel.

It can be specified in a `select` statement to help manage situations where it's taking too long to receive a message from any of the channels being monitored.

Also consider using `timeout` when working with external resources as you can never guarantee the response time and, therefore may need to proactively take action after a predetermined time has passed.

Implementing a `timeout` with a `select` statement is very straightforward.

::: tip Example:

```go
package main

import (
  "fmt"
  "time"
)

func main() {
     c1 := make(chan string)

    go func(channel chan string) {
        time.Sleep(1 * time.Second)
        channel <- "hello world"
    }(c1)

    select {
    case msg2 := <-c1:
        fmt.Println(msg2)
    case <-time.After(2 * time.Second): //Timeout after 2 second
        fmt.Println("timeout")
  }
}
```

- The example above shows how to use the `time.After` function to create a channel that sends a message after a specified duration.
- The `main` function reads data from the `c1` channel using the `select` statement.
- The `select` statement will block until one of the channels is ready to send or receive data.
- If the `c1` channel is ready, the `main` function will print the message.
- If the `c1` channel is not ready after 2 seconds, the `main` function will print a timeout message.

:::

---

## How to Close a Channel

Closing a channel is used to indicate that no more values will be sent on the channel. It is used to signal to the receiver that the channel has been closed and no more values will be sent.

Go channels can be explicitly closed to help with synchronization issues. The default implementation will close the channel when all the values have been sent.

Closing a channel is done by invoking the built-in `close` function.‌

```go
close(channel)
```

::: tip Example:

```go
package main

import (
  "fmt"
  "bytes"
)

func process(work <-chan string, fin chan<- string) {
  var b bytes.Buffer
  for {
    if msg, notClosed := <-work; notClosed {
      fmt.Printf("%s received...\n", msg)
    } else {
      fmt.Println("Channel closed")
      fin <- b.String()
      return
    }
  }
}

func main() {
  work := make(chan string, 3)
  fin := make(chan string)

  go process(work, fin)

  word := "hello world"

  for i := 0; i < len(word); i++ {
    letter := string(word[i])
    work <- letter
    fmt.Printf("%s sent ...\n", letters)
  }

  close(work)

  fmt.Printf("result: %s\n", <-fin)
}
```

The example above shows how to close a channel. The `work` channel is created with a buffer size of 3. The `process` function reads data from the `work` channel and writes data to the `fin` channel. The `main` function writes data to the `work` channel and closes the `work` channel. The `process` function will print the message if the `work` channel is not closed. If the `work` channel is closed, the `process` function will print a message and write the data to the `fin` channel.

:::

---

## How to Iterate Over Channel Messages

Channels can be iterated over by using the `range` keyword, similar to `arrays, slice, and/or maps`. This allows you to quickly and easily iterate over the messages within a channel.

::: tip Example:

```go
package main

import (
  "fmt"
)

func main() {
  c := make(chan string, 3)

  go func() {
    c <- "hello"
    c <- "world"
    c <- "goroutine"
    close(c) // Closing the channel is very important before proceeding to the iteration hence deadlock error
  }()

  for msg := range c {
    fmt.Println(msg)
  }
}
```

The example above shows how to iterate over a channel using the `range` keyword. The `c` channel is created with a buffer size of 3. The `go` keyword is used to create a goroutine that writes data to the `c` channel. The `main` function iterates over the `c` channel using the `range` keyword and prints the message.

:::

---

## Conclusion

In this article, we learned how to handle concurrency with goroutines and channels in Go. We learned how to create goroutines, and how to use `WaitGroups` and channels to communicate between goroutines.

We also learned how to use channel buffers, channel directions, channel `select`, channel timeout, channel closing, and channel range.

Goroutines and channels are powerful features in Go that help address concurrency and async flow requirements.

As always, I hope you enjoyed the article and learned something new. If you want, you can also follow me on [LinkedIn (<VPIcon icon="fa-brands fa-linkedin" />`destiny-erhabor`)](https://linkedin.com/in/destiny-erhabor) or [Twitter (<VPIcon icon="fa-brands fa-x-twitter" />`caesar_sage`)](https://twitter.com/caesar_sage).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Handle Concurrency with Goroutines and Channels in Go",
  "desc": "Concurrency is the ability of a program to perform multiple tasks simultaneously. It is a crucial aspect of building scalable and responsive systems.  Go's concurrency model is based on the concept of goroutines, lightweight threads that can run mult...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-handle-concurrency-in-go.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
