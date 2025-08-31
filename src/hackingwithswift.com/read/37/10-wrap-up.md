---
lang: ko-KR
title: "Wrap up"
description: "Article(s) > Wrap up"
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
      content: "Article(s) > Wrap up"
    - property: og:description
      content: "Wrap up"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/37/10-wrap-up.html
next: /hackingwithswift.com/read/38/overview.md
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
  "title": "Wrap up | Hacking with iOS",
  "desc": "Wrap up",
  "link": "https://hackingwithswift.com/read/37/10/wrap-up",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

The app is finished, but really your work is about to begin: I've given you all the code you need, but it's down to you to provide some meaningful patter to convince your friends! See "Polishing your patter" below for some example patter to get you started, but first give the app a quick try to make sure it all works.

To get started, run the app on your phone, then run it on your Watch. Note that installing apps and launching apps are both quite slow on Apple Watch, so make sure you prepare ahead of time. Once the Watch app is running, remember that it will go to sleep in 70 seconds unless you stop it, and when the Watch sleeps you won't get any haptic taps. The easiest thing to do is very gently rotate the Digital Crown every 30 seconds or so, just to be sure.

So, the app is complete and you've learned all about `CAGradientLayer`, `CAEmitterLayer`, card flip effects, `perform()`, 3D Touch and more - good job! If you want to try taking the app further, try implementing the `sessionWatchStateDidChange()` method in <FontIcon icon="fa-brands fa-swift"/>`ViewController.swift` to detect when the Watch goes to sleep - if you make your phone play a brief but innocuous sound, it would alert you to wake your watch.

If you're looking for something more advanced, try adding a hidden button to the Watch user interface that enables "always win mode" - i.e., every card that gets tapped will be the star. Your patter can then be, "I promise it's not a trick, in fact I can even transfer my psychic power to you!" and watch as your friend suddenly finds the star every time.

---

## Polishing your patter

Patter is verbal misdirection: what you say to your friends to confuse them while they are trying to figure out the trick. At the very least, you should explain to your friend how the cards work: there are eight cards with different shapes on, but only one has a green star. Let your friend try finding the card by hand, to prove the set up is real. Lucky people will guess the star correctly; very lucky people will guess twice in a row; but it's almost impossible that someone will get the answer right three times in a row - that's where you come in!

The easiest way to get started with the trick is by putting your finger down over one card, then dragging it slowly over the other cards. Note: don't tap the cards, because that will turn one of them over. Instead, slide your finger over them as if you're feeling for - *ahem* - psychic vibrations.

When you've done the trick correctly once or twice, your doubting friend will almost certainly think that there's some secret signal on the screen that is alerting you to the correct card, or perhaps you're performing some sort of gesture on the screen that triggers the star. In this situation, up the ante: tell them you can do the trick without even seeing the screen. In fact, you can do it without even *touching* the screen - they can do all the touching for you.

This works in just the same way, except now your friend is the one stroking their finger across the screen. Just wait for your Watch to tap your wrist, then say something like "go back to that card - I felt something there..."

Remember, misdirection is key. So, don't tap the right answer as soon as your phone vibrates. Say something like "hmm... this card feels really warm... let me try some others first." Or go to one of the cards nearby and say "this card feels warm, but not as warm as the previous one..."

Finally, once you've fooled everyone and had your fun, let them in on the joke - after all, if you can't have fun, why bother?

