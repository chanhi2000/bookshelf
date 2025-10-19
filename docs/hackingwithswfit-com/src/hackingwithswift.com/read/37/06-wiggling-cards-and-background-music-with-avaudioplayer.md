---
lang: ko-KR
title: "Wiggling cards and background music with AVAudioPlayer"
description: "Article(s) > Wiggling cards and background music with AVAudioPlayer"
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
      content: "Article(s) > Wiggling cards and background music with AVAudioPlayer"
    - property: og:description
      content: "Wiggling cards and background music with AVAudioPlayer"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/37/06-wiggling-cards-and-background-music-with-avaudioplayer.html
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
  "title": "Wiggling cards and background music with AVAudioPlayer | Hacking with iOS",
  "desc": "Wiggling cards and background music with AVAudioPlayer",
  "link": "https://hackingwithswift.com/read/37/6/wiggling-cards-and-background-music-with-avaudioplayer",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

The last part of our misdirection is going to be truly evil. That being said, it is entirely optional because I won't be teaching any vital new techniques here - I just enjoy screwing with my friends' heads!

We're going to add two more simple distractions to our app. First, we're going to make random cards move ever so slightly on the screen. The movement has to be small so that people catch it in the corner of their eye, but then aren't 100% sure anything actually happened. Second, we're going to add some background music to make people wonder whether there's something in the sound effects that tells you where the star is.

Making the cards move just a bit is easy thanks to the method `perform(_:with:afterDelay:)` that I introduced earlier. We're going to write a new method that scales a card so that it's a mere 1% larger than normal, before dropping it down again. To make things more interesting, we want this animation to happen only occasionally, so the users aren't sure when it will happen again.

This misdirection is clever because human eyes are extremely sensitive to motion at the edges of vision, so your eye notices a card moves and jumps to it, but of course by then our animation has stopped so your user isn't sure whether anything happened. If you want to create a more pronounced effect, just increase the transform scale that gets applied.

Open <VPIcon icon="fa-brands fa-swift"/>`CardViewController.swift` for editing, then add this new method somewhere in the class:

```swift
@objc func wiggle() {
    if Int.random(in: 0...3) == 1 {
        UIView.animate(withDuration: 0.2, delay: 0, options: .allowUserInteraction, animations: {
            self.back.transform = CGAffineTransform(scaleX: 1.01, y: 1.01)
        }) { _ in
            self.back.transform = CGAffineTransform.identity
        }

        perform(#selector(wiggle), with: nil, afterDelay: 8)
    } else {
        perform(#selector(wiggle), with: nil, afterDelay: 2)
    }
}
```

There are two things of interest in that new method. First, I've used the `.allowUserInteraction` animation option so that users can tap a card even when it's animating. Second, the method calls itself so that the wiggle animation happens repeatedly, but, in a particularly evil twist, the delay is much longer after a card already moved. This means if someone's eye jumps to a card when they think it moved, they'll have to stare at it for a full eight seconds before it moves again.

Once the `wiggle()` method has been called once it will carry on calling itself, so we just need to make that initial call to get things moving. To do that, add this code to the end of `viewDidLoad()` for the card view controller:

```swift
perform(#selector(wiggle), with: nil, afterDelay: 1)
```

The very last piece of misdirection is an easy one: making some music play. Some mystic-sounding music was in the Content folder you should have downloaded from GitHub in the first chapter, and is a piece of music called "Phantom from Space" by Kevin MacLeod. It's licensed under Creative Commons Attribution 3.0 - see [<VPIcon icon="fas fa-globe"/>this link](http://incompetech.com/music/royalty-free/index.html?isrc=USUAN1500038) for more information.

You should already have added the Content folder to your project, so all that's left is to use it. This is done with four small changes in <VPIcon icon="fa-brands fa-swift"/>`ViewController.swift`, starting with this import to the top:

```swift
import AVFoundation
```

Now create a property to hold our music audio:

```swift
var music: AVAudioPlayer!
```

Next we need to create a `playMusic()` method that loads in the music and plays it. This is almost identical to code we've covered before, but there is a small change because we need the music to loop. This is done by setting the audio player's `numberOfLoops` property to any negative number, such as -1. Here's the new method, again for <VPIcon icon="fa-brands fa-swift"/>`ViewController.swift`:

```swift
func playMusic() {
    if let musicURL = Bundle.main.url(forResource: "PhantomFromSpace", withExtension: "mp3") {
        if let audioPlayer = try? AVAudioPlayer(contentsOf: musicURL) {
            music = audioPlayer
            music.numberOfLoops = -1
            music.play()
        }
    }
}
```

The fourth and final change is just to call that new `playMusic()` method from within the view controller's `viewDidLoad()` method. So, add this to the end:

```swift
playMusic()
```

That completes our misdirections: we've added a shifting color gradient, we've added falling stars, we've made the cards move, and now we've added music too. With so many distractions in place hopefully your friends won't be able to guess the trick.

Speaking of tricks, that's our very next job: how to fix the app so you always guess correctly!

