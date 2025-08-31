---
lang: ko-KR
title: "Setting up"
description: "Article(s) > Setting up"
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
      content: "Article(s) > Setting up"
    - property: og:description
      content: "Setting up"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/01/01-setting-up.html
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
  "title": "Setting up | Hacking with iOS",
  "desc": "Setting up",
  "link": "https://hackingwithswift.com/read/1/1/setting-up",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

<VidStack src="youtube/lCHpZjERVdY" />

In this project you'll produce an application that lets users scroll through a list of images, then select one to view. It's deliberately simple, because there are many other things you'll need to learn along the way, so strap yourself in - this is going to be long!

Launch Xcode, and choose "Create a new Xcode project" from the welcome screen. Choose Single View App from the list and click Next. For Product Name enter Project1, then make sure you have Swift selected for the language.

![Creating a new Single View App project in Xcode.](https://hackingwithswift.com/img/books/hws/1-4@2x.png)

One of the fields you'll be asked for is "Organization Identifier", which is a unique identifier usually made up of your personal web site domain name in reverse. For example, I would use **com.hackingwithswift** if I were making an app. You'll need to put something valid in there if you're deploying to devices, but otherwise you can just use **com.example**.

![Setting your Organization Identifier in Xcode.](https://hackingwithswift.com/img/books/hws/1-5@2x.png)

::: important

some of Xcode's project templates have checkboxes saying "Use Core Data", "Include Unit Tests" and "Include UI Tests". Please ensure these boxes are unchecked for this project and indeed almost all projects in this series - there’s only one project where this isn’t the case, and it’s made pretty clear there!

:::

Now click Next again and you'll be asked where you want to save the project - your desktop is fine. Once that's done, you'll be presented with the example project that Xcode made for you. The first thing we need to do is make sure you have everything set up correctly, and that means running the project as-is.

When you run a project, you get to choose what kind of device the iOS Simulator should pretend to be, or you can also select a physical device if you have one plugged in. These options are listed under the Product > Destination menu, and you should see iPad Air, iPhone 8, and so on.

There's also a shortcut for this menu: at the top-left of Xcode's window is the play and stop button, but to the right of that it should say Project1 then a device name. You can click on that device name to select a different device.

**For now, please choose iPhone XR, and click the Play triangle button in the top-left corner.** This will compile your code, which is the process of converting it to instructions that iPhones can understand, then launch the simulator and run the app. As you'll see when you interact with the app, our “app” just shows a large white screen - it does nothing at all, at least not yet.

![The basic Single View App project in Xcode. Yes, it’s just a large white space.](https://hackingwithswift.com/img/books/hws/1-6@2x.png)

You'll be starting and stopping projects a lot as you learn, so there are three basic tips you need to know:

- You can run your project by pressing <kbd>Cmd</kbd>+<kbd>R</kbd>. This is equivalent to clicking the play button.
- You can stop a running project by pressing <kbd>Cmd</kbd>+<kbd>.</kbd> when Xcode is selected.
- If you have made changes to a running project, just press <kbd>Cmd</kbd>+<kbd>R</kbd> again. Xcode will prompt you to stop the current run before starting another. Make sure you check the "Do not show this message again" box to avoid being bothered in the future.

This project is all about letting users select images to view, so you're going to need to import some pictures. Download the files for this project from [GitHub (<FontIcon icon="iconfont icon-github"/>`twostraws/HackingWithSwift`)](https://github.com/twostraws/HackingWithSwift), and look in the “project1-files” folder. You'll see another folder in there called Content, and I’d like you to drag that Content folder straight into your Xcode project, just under where it says "Info.plist".

::; tip

If you’re not sure what to download, use this link: [archive/main.zip< (<FontIcon icon="iconfont icon-github"/>`twostraws/HackingWithSwift`)](https://github.com/twostraws/HackingWithSwift/archive/main.zip) - that’s the zip file for all my project files.

:::

A window will appear asking how you want to add the files: make sure "Copy items if needed" is checked, and "Create groups" is selected. **Important: do not choose "Create folder references" otherwise your project will not work.**

![When you add items to Xcode, make sure you choose Create Folder References.](https://hackingwithswift.com/img/books/hws/1-7@2x.png)

Click Finish and you'll see a yellow Content folder appear in Xcode. If you see a blue one, you didn't select "Create groups", and you'll have problems following this tutorial!

