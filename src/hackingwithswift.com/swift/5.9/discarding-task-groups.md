---
lang: en-US
title: Discarding task groups
description: Article(s) > Discarding task groups
category:
  - Swift
  - Article(s)
tag: 
  - blog
  - hackingwithswift.com
  - swift
  - swift-5.9
head:
  - - meta:
    - property: og:title
      content: Article(s) > Discarding task groups
    - property: og:description
      content: Discarding task groups
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swift/5.9/discarding-task-groups.html
next: /hackingwithswift.com/swift/5.8/lift-result-builder-limitations.md
isOriginal: false
author:
  - name: Paul Hudson
    url: https://hackingwithswift.com/about
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "HACKING WITH SWIFT",
  "desc": "What's new in Swift?",
  "link": "/hackingwithswift.com/swift/README.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

[[toc]]

---

```component VPCard
{
  "title": "Discarding task groups | Changes in Swift 5.9",
  "desc": "Discarding task groups",
  "link": "https://hackingwithswift.com/swift/5.9/discarding-task-groups", 
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

> Available from Swift 5.9

[SE-0381 (<FontIcon icon="iconfont icon-github"/>`apple/swift-evolution`)](https://github.com/apple/swift-evolution/blob/main/proposals/0381-task-group-discard-results.md) adds new discardable task groups that fix an important gap in the current API: tasks that are created inside a task group are automatically discarded and destroyed as soon as they finish, which means task groups that run for extended periods of time (or perhaps forever, as in the case of a web server) won’t leak memory over time.

When using the original `withTaskGroup()` API, a problem can occurs because of the way Swift only discards a child task and its resulting data when we call `next()` or loop over the task group’s children. Calling `next()` will cause your code to suspend if all child tasks are currently executing, so we hit the problem: you want a server that’s always listening for connections so you can add tasks to process them, but you also need to stop every so often to clean up old tasks that have completed.

There was no clean solution to this until Swift 5.9, which adds `withDiscardingTaskGroup()` and `withThrowingDiscardingTaskGroup()` functions that create new *discarding* task groups. These are task groups that automatically discard and destroy each task as soon as it completes, without us needing to call `next()` to consume it manually.

To give you an idea of what triggers the problem, we could implement a naive directory watcher that loops forever and reports back the names of any files or directories that have been added or removed:

```swift
import Foundation

struct FileWatcher {
    // The URL we're watching for file changes.
    let url: URL

    // The set of URLs we've already returned.
    private var handled = Set<URL>()

    init(url: URL) {
        self.url = url
    }

    mutating func next() async throws -> URL? {
        while true {
            // Read the latest contents of our directory, or exit if a problem occurred.
            guard let contents = try? FileManager.default.contentsOfDirectory(at: url, includingPropertiesForKeys: nil) else {
                return nil
            }

            // Figure out which URLs we haven't already handled.
            let unhandled = handled.symmetricDifference(contents)

            if let newURL = unhandled.first {
                // If we already handled this URL then it must be deleted.
                if handled.contains(newURL) {
                    handled.remove(newURL)
                } else {
                    // Otherwise this URL is new, so mark it as handled.
                    handled.insert(newURL)
                    return newURL
                }
            } else {
                // No file difference; sleep for a few seconds then try again.
                try await Task.sleep(for: .microseconds(1000))
            }
        }
    }
}
```

We could then use that from inside a simple app, although for brevity we’ll just print the URLs rather than do any actual complicated processing:

```swift
struct FileProcessor {
    static func main() async throws {
        var watcher = FileWatcher(url: URL(filePath: "/Users/twostraws"))

        try await withThrowingTaskGroup(of: Void.self) { group in
            while let newURL = try await watcher.next() {
                group.addTask {
                    process(newURL)
                }
            }
        }
    }

    static func process(_ url: URL) {
        print("Processing \(url.path())")
    }
}
```

That will run forever, or at least until either the user terminates the program or the directory we’re watching stops being accessible. However, because it uses `withThrowingTaskGroup()` it has a problem: a new child task is created every time `addTask()` is called, but because it doesn’t call `group.next()` anywhere those child tasks are never destroyed. Little by little – maybe only a few hundred bytes each time – this code will eat more and more memory until eventually the operating system runs out of RAM and is forced to terminate the program.

This problem goes away entirely with discarding task groups: just replacing `withThrowingTaskGroup(of: Void.self)` with `withThrowingDiscardingTaskGroup` means each child task is automatically destroyed as soon as its work finishes.

In practice, this problem is mainly going to be faced by server code, where the server must be able to accept new connections while handling existing ones smoothly.

::: details Other Changes in Swift 5.9

```component VPCard
{
  "title": "if and switch expressions | Changes in Swift 5.9",
  "desc": "if and switch expressions",
  "link": "/hackingwithswift.com/swift/5.9/if-switch-expressions.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "Value and Type Parameter Packs | Changes in Swift 5.9",
  "desc": "Value and Type Parameter Packs",
  "link": "/hackingwithswift.com/swift/5.9/variadic-generics.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "Macros | Changes in Swift 5.9",
  "desc": "Macros",
  "link": "/hackingwithswift.com/swift/5.9/macros.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "Noncopyable structs and enums | Changes in Swift 5.9",
  "desc": "Noncopyable structs and enums",
  "link": "/hackingwithswift.com/swift/5.9/noncopyable-structs-and-enums.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "consume operator to end the lifetime of a variable binding | Changes in Swift 5.9",
  "desc": "consume operator to end the lifetime of a variable binding",
  "link": "/hackingwithswift.com/swift/5.9/consume-operator.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "Convenience Async[Throwing]Stream.makeStream methods | Changes in Swift 5.9",
  "desc": "Convenience Async[Throwing]Stream.makeStream methods",
  "link": "/hackingwithswift.com/swift/5.9/convenience-asyncthrowingstream-makestream.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "Add sleep(for:) to Clock | Changes in Swift 5.9",
  "desc": "Add sleep(for:) to Clock",
  "link": "/hackingwithswift.com/swift/5.9/sleep-for-clock.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```
<!-- 
```component VPCard
{
  "title": "Discarding task groups | Changes in Swift 5.9",
  "desc": "Discarding task groups",
  "link": "/hackingwithswift.com/swift/5.9/discarding-task-groups.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```
-->
[<FontIcon icon="fas fa-file-zipper"/>Download Swift 5.9 playground](https://hackingwithswift.com/files/playgrounds/swift/playground-5-8-to-5-9.playground.zip)

:::

