---
lang: ko-KR
title: "Debugging with breakpoints"
description: "Article(s) > Debugging with breakpoints"
category:
  - Swift
  - iOS
  - Article(s)
tag: 
  - blog
  - hackingwithswift.com
  - crashcourse
  - swift
  - xcode
  - appstore
  - ios  
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Debugging with breakpoints"
    - property: og:description
      content: "Debugging with breakpoints"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/18/04-debugging-with-breakpoints.html
isOriginal: false
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Hacking with iOS - learn to code iPhone and iPad apps with free Swift tutorials",
  "desc": "Learn Swift coding for iOS with these free tutorials - learn Swift, iOS, and Xcode",
  "link": "/hackingwithswift.com/read/README.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

[[toc]]

---

```component VPCard
{
  "title": "Debugging with breakpoints | Hacking with iOS",
  "desc": "Debugging with breakpoints",
  "link": "https://hackingwithswift.com/read/18/4/debugging-with-breakpoints",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

<VidStack src="youtube/OCeKmiCJLtg" />

It’s time to start using that Project18 project you made, because we’re about to look at breakpoints. These are easy to use initially, but have a lot of hidden complexity if you want to get more advanced. 

Let's start small, with a simple loop that prints numbers from 1 to 100. Add this to `viewDidLoad()`:

```swift
for i in 1 ... 100 {
    print("Got number \(i)")
}
```

If we wanted to see exactly what our program state was at the time we call the `print()` function, look to the left of where you've been typing and you'll see the line number markers. Click on the line number where `print()` is, and a blue marker will appear to signal that a breakpoint has been placed. This means that execution of your code will stop when that line is reached, and you have the opportunity to inspect your app’s internal state to see what values everything has.

If you click on a breakpoint again, the blue arrow will become faint to show that the breakpoint exists but is disabled. This is useful when you want to keep your place, but don’t want execution to stop right now. You can click again to make it active, or right-click and choose Delete Breakpoint to remove it entirely.

**No line numbers?** If your Xcode isn't showing line numbers by default, I suggest you turn them on. Go to the Xcode menu and choose Preferences, then choose the Text Editing tab and make sure "Line numbers" is checked.

With that breakpoint in place, Xcode will pause execution when it's reached and show you the values of all your variables. Try running it now, and you should see your app paused, with a light green marker on the line of code that is about to be executed. At the bottom of the Xcode window you should see Xcode telling you that `i` currently has a value of 1. That's because it paused as soon as this line is reached, which is the very first iteration of our loop.

From here, you can carry on execution by pressing F6, but you may need to use Fn+F6 because the function keys are often mapped to actions on Macs. This shortcut is called Step Over and will tell Xcode to advance code execution by one line. You can walk through the loop in its entirety by pressing F6 again and again, but there's another command called Continue (<kbd>Ctrl</kbd>+<kbd>Cmd</kbd>+<kbd>Y</kbd>) that means "continue executing my program until you hit another breakpoint."

When your program is paused, you'll see something useful on the left of Xcode's window: a *back trace* that shows you all the threads in your program and what they are executing. So if you find a bug somewhere in method `d()`, this back trace will show you that `d()` was called by `c()`, which was called by `b()`, which in turn was called by `a()` - it effectively shows you the events leading up to your problem, which is invaluable when trying to spot bugs.

Xcode also gives you an interactive LLDB debugger window, where you can type commands to query values and run methods. If it’s visible, you’ll see “(lldb)” in the bottom of your Xcode window. If you don’t see that, go to View > Debug Area > Activate Console, at which point focus will move to the LLDB window. Try typing `p i` to ask Xcode to print the value of the `i` variable.

While your app is paused, here’s one more neat trick that few people know about: that light green arrow that shows your current execution position can be *moved*. Just click and drag it somewhere else to have execution pick up from there - although Xcode will warn you that it might have unexpected results, so tread carefully!

Breakpoints can do two more clever things, but for some reason both of them aren't used nearly enough. The first is that you can make breakpoints conditional, meaning that they will pause execution of your program only if the condition is matched. Right now, our breakpoint will stop execution every time our loop goes around, but what if we wanted it to stop only every 10 times?

Right-click on the breakpoint (the blue arrow marker) and choose Edit Breakpoint. In the popup that appears, set the condition value to be `i % 10 == 0` - this uses modulo, as seen in project 8. With that in place, execution will now pause only when `i` is 10, 20, 30 and so on, up to 100. You can use conditional breakpoints to execute debugger commands automatically - the "Automatically continue" checkbox is perfect for making your program continue uninterrupted while breakpoints silently trigger actions.

The second clever thing that breakpoints can do is be automatically triggered when an exception is thrown. Exceptions are errors that aren't handled, and will cause your code to crash. With breakpoints, you can say "pause execution as soon as an exception is thrown," so that you can examine your program state and see what the problem is.

To make this happen, press <kbd>Cmd</kbd>+<kbd>8</kbd> to choose the breakpoint navigator - it's on the left of your screen, where the project navigator normally sits. Now click the + button in the bottom-left corner and choose "Exception Breakpoint." That's it! The next time your code hits a fatal problem, the exception breakpoint will trigger and you can take action.

