---
lang: en-US
title: "Concurrency patterns in Golang: WaitGroups and Goroutines"
description: "Article(s) > Concurrency patterns in Golang: WaitGroups and Goroutines"
icon: fa-brands fa-golang
category:
  - Go
  - Article(s)
tag:
  - blog
  - blog.logrocket.com
  - go
  - golang
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Concurrency patterns in Golang: WaitGroups and Goroutines"
    - property: og:description
      content: "Concurrency patterns in Golang: WaitGroups and Goroutines"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/concurrency-patterns-golang-waitgroups-goroutines.html
prev: /programming/go/articles/README.md
date: 2021-12-03
isOriginal: false
author:
  - name: Oluwatomisin Bamimore
    url : https://blog.logrocket.com/author/oluwatomisinbamimore/
cover: /assets/image/blog.logrocket.com/concurrency-patterns-golang-waitgroups-goroutines/banner.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Go > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/go/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Concurrency patterns in Golang: WaitGroups and Goroutines"
  desc="Explore goroutines, communication between goroutines using channels, and syncing goroutines using WaitGroups."
  url="https://blog.logrocket.com/concurrency-patterns-golang-waitgroups-goroutines"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/concurrency-patterns-golang-waitgroups-goroutines/banner.png"/>

Concurrency is a program’s ability to run more than one task independently in overlapping periods. In a concurrent program, several tasks can run at the same time in no particular order, which communicate, share resources, and interfere with each other.

![Concurrency Patterns In Go: WaitGroups And Goroutines](/assets/image/blog.logrocket.com/concurrency-patterns-golang-waitgroups-goroutines/banner.png)

With the rise of multicore CPUs and the ability to execute threads in parallel, developers can now build truly concurrent programs.

Golang provides goroutines to support concurrency in Go. A goroutine is a function that executes simultaneously with other goroutines in a program and are lightweight threads managed by Go.

A goroutine takes about 2kB of stack space to initialize. In contrast, a standard thread can take up to 1MB, meaning creating a thousand goroutines takes significantly fewer resources than a thousand threads.

In this tutorial, we will explore goroutines, communication between goroutines using channels, and syncing goroutines using `WaitGroup`s.

---

## Goroutines tutorial prerequisites

To follow and understand this tutorial, you need the following:

- A working [**knowledge of Go**](/blog.logrocket.com/getting-started-with-go-for-frontend-developers.md)
- Go 1.x runtime installed on your machine

You can also clone this [guide’s repository (<VPIcon icon="iconfont icon-github" />`Bamimore-Tomi/go-templates-guide`)](https://github.com/Bamimore-Tomi/go-templates-guide) to access the complete template files or run the following in your terminal:

```sh
git clone https://github.com/Bamimore-Tomi/goroutines-logrocket.git
```

---

## Creating goroutines in Golang

Adding the keyword `go` in front of a function call executes the Go runtime as a goroutine.

To demonstrate, let’s write a function that prints out random numbers, then sleeps. The first example is a sequential program and the second example uses goroutines:

```go :collapsed-lines
package main
 
import (
    "fmt"
    "math/rand"
    "time"
)
 
// name is a string to identify the function call
// limit the number of numbers the function will print
// sleep is the number of seconds before the function prints the next value
func randSleep(name string, limit int, sleep int) {
    for i := 1; i <= limit; i++ {
        fmt.Println(name, rand.Intn(i))
        time.Sleep(time.Duration(sleep * int(time.Second)))
 
    }
 
}
func main() {
    randSleep("first:", 4, 3)
    randSleep("second:", 4, 3)
 
}
// 
// first: 0
// first: 1
// first: 2
// first: 3
// second: 0
// second: 0
// second: 1
// second: 0
```

In this sequential run, Go prints the numbers in the order the function calls. In the following program, the functions run concurrently:

```go
package main
 
import (
    "fmt"
    "math/rand"
    "time"
)
 
// name is a string to identify the function call
// limit the number of numbers the function will print
// sleep is the number of seconds before the function prints the next value
func randSleep(name string, limit int, sleep int) {
    for i := 1; i < limit; i++ {
        fmt.Println(name, rand.Intn(i))
        time.Sleep(time.Duration(sleep * int(time.Second)))
 
    }
 
}
func main() {
    go randSleep("first:", 4, 3)
    go randSleep("second:", 4, 3)
 
}
```

This program will not print anything out in the terminal because the `main` function completes before the goroutines execute, which is an issue; you don’t want your `main` to complete and terminate before the goroutines complete their execution.

If there is another sequential code after the goroutine, it runs concurrently until the sequential code completes its execution. The program then terminates regardless of completion.

```go
package main
 
import (
    "fmt"
    "math/rand"
    "time"
)
 
// name is a string to identify the function call
// limit the amount of number the function will print
// sleep is the number of seconds before the function prints the next value
func randSleep(name string, limit int, sleep int) {
    for i := 1; i <= limit; i++ {
        fmt.Println(name, rand.Intn(i))
        time.Sleep(time.Duration(sleep * int(time.Second)))
 
    }
 
}
func main() {
    go randSleep("first:", 10, 2)
    randSleep("second:", 3, 2)
 
}
//
// second: 0
// first: 0
// second: 1
// first: 1
// first: 1
// second: 0
```

The program terminates after the function below the goroutine completes its execution, regardless of whether the goroutine completes or not.

To solve this issue, Golang provides `WaitGroup`s.

### `WaitGroup`s in Golang

`WaitGroup`, provided in the sync package, allows a program to wait for specified goroutines. These are sync mechanisms in Golang that block the execution of a program until goroutines in the `WaitGroup` completely execute, as shown below:

```go
package main
 
import (
    "fmt"
    "math/rand"
    "sync"
    "time"
)
 
// wg is the pointer to a waitgroup
// name is a string to identify the function call
// limit the number of numbers the function will print
// sleep is the number of seconds before the function prints the next value
func randSleep(wg *sync.WaitGroup, name string, limit int, sleep int) {
    defer wg.Done()
    for i := 1; i <= limit; i++ {
        fmt.Println(name, rand.Intn(i))
        time.Sleep(time.Duration(sleep * int(time.Second)))
 
    }
 
}
func main() {
    wg := new(sync.WaitGroup)
    wg.Add(2)
    go randSleep(wg, "first:", 10, 2)
    go randSleep(wg, "second:", 3, 2)
    wg.Wait()
 
}
//
// second: 0
// first: 0
// first: 1
// second: 1
// second: 1
// first: 0
// first: 1
// first: 0
// first: 4
// first: 1
// first: 6
// first: 7
// first: 2
```

Here, `wg := new(sync.WaitGroup)` creates a new `WaitGroup` while `wg.Add(2)` informs `WaitGroup` that it must wait for two goroutines.

This is followed by `defer wg.Done()` alerting the `WaitGroup` when a goroutine completes.

`wg.Wait()` then blocks the execution until the goroutines’ execution completes.

The whole process is like adding to a counter in `wg.Add()`, subtracting from the counter in `wg.Done()`, and waiting for the counter to hit `0` in `wg.Wait()`.

---

## Communicating between Goroutines

In programming, concurrent tasks can communicate with each other and share resources. Go provides a way for bidirectional communication between two goroutines through channels.

Bidirectional communication means either party can send or receive a message, so [**Go provides channels as the mechanism to send or receive data between goroutines**](/blog.logrocket.com/how-use-go-channels.md).

You can create a channel by declaring or using the `make` function:

```go
package main
 
import (
    "fmt"
)
 
func main() {
    // creating a channel by declaring it
    var mychannel1 chan int
    fmt.Println(mychannel1)
 
    // creating a channel using make()
 
    mychannel2 := make(chan int)
    fmt.Println(mychannel2)

}
```

Bidirectional channels in Go are blocking, meaning that when sending data into a channel, Go waits until the data is read from the channel before execution continues:

```go
package main
 
import (
    "fmt"
    "sync"
)
 
func writeChannel(wg *sync.WaitGroup, limitchannel chan int, stop int) {
    defer wg.Done()
    for i := 1; i <= stop; i++ {
        limitchannel <- i
    }
 
}
 
func readChannel(wg *sync.WaitGroup, limitchannel chan int, stop int) {
    defer wg.Done()
    for i := 1; i <= stop; i++ {
        fmt.Println(<-limitchannel)
    }
}
 
func main() {
    wg := new(sync.WaitGroup)
    wg.Add(2)
    limitchannel := make(chan int)
    defer close(limitchannel)
    go writeChannel(wg, limitchannel, 3)
    go readChannel(wg, limitchannel, 3)
    wg.Wait()
 
}
// 
// 1
// 2
// 3
```

With `limitchannel <- i`, the value of `i` enters the channel. `fmt.Println(<-limitchannel)` then receives the channel’s value and prints it out.

However, note that the number of sending operations must be equal to the number of receiving operations because if you send data to a channel and don’t receive it elsewhere, you get a `fatal error: all goroutines are asleep - deadlock!`.

### Buffered channels

If you were wondering why you must always receive from a channel after sending, this is because Go does not have anywhere to store the values passed into the channel.

However, you can create a channel that stores several values, meaning sending data into that channel won’t block until you exceed the capacity:

```go
limitchannel := make(chan int, 6)
```

This program sends data into a buffered channel and does not read it until the goroutine executes:

```go
package main
 
import (
    "fmt"
    "sync"
)
 
func writeChannel(wg *sync.WaitGroup, limitchannel chan int, stop int) {
    defer wg.Done()
    for i := 1; i <= stop; i++ {
        limitchannel <- i
    }
 
}
 
func main() {
    wg := new(sync.WaitGroup)
    wg.Add(1)
    limitchannel := make(chan int, 2)
    defer close(limitchannel)
    go writeChannel(wg, limitchannel, 2)
    wg.Wait()
    fmt.Println(<-limitchannel)
    fmt.Println(<-limitchannel)
 
}
// 
// 1
// 2
```

---

## Conclusion

`WaitGoup`s are just enough if you don’t need any data returned from a goroutine. However, you’ll often need to pass data around when building concurrent applications, which channels are extremely helpful for.

Understanding when to use channels is vital to avoid a deadlock situation and [**bugs, which can be extremely hard to trace**](/blog.logrocket.com/comparing-go-debugging-tools.md). Sometimes, [**pointers and `WaitGroups` can achieve the purpose of a channel**](/blog.logrocket.com/how-to-use-pointers-in-go.md), but this is outside the scope of this article.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Concurrency patterns in Golang: WaitGroups and Goroutines",
  "desc": "Explore goroutines, communication between goroutines using channels, and syncing goroutines using WaitGroups.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/concurrency-patterns-golang-waitgroups-goroutines.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
