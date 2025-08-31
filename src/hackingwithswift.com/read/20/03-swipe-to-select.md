---
lang: ko-KR
title: "Swipe to select"
description: "Article(s) > Swipe to select"
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
      content: "Article(s) > Swipe to select"
    - property: og:description
      content: "Swipe to select"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/20/03-swipe-to-select.html
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
  "title": "Swipe to select | Hacking with iOS",
  "desc": "Swipe to select",
  "link": "https://hackingwithswift.com/read/20/3/swipe-to-select",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

<VidStack src="youtube/Mshbpgs-PJE" />

Now that you can see fireworks shooting across your screen, it's time to reveal the difficulty element. You see, every game needs some challenge, and in our case the challenge is to destroy fireworks in groups of the same color. We're going to make it so that players can select only one color of firework at a time, so if they choose two red then touch a green, the two red will become deselected.

So, the challenge will be to select and detonate fireworks based on their color, and as you'll see shortly we're going to heavily bias scores so that players receive many more points for larger groups.

What we're going to code now is the touch handling method, `checkTouches()`. We're going to call this from `touchesBegan()` and `touchesMoved()` so that users can either tap to select fireworks or just swipe across the screen.

The method needs to start by figuring out where in the scene the player touches, and what nodes are at that point. It will then loop through all nodes under the point to find any with the name "firework". When it finds one, it will set its name to be "selected" rather than "firework" and change its `colorBlendFactor` value to 0. That will disable the color blending entirely, making the firework white.

To make this code a little cleaner I want to introduce you to a new piece of Swift syntax that is a bit confusing at first because it uses three keywords back to back: `for case let`.

You see, when we ask for all the nodes under the users finger we’ll get back an array of `SKNode`, and that’s not good enough - we can’t set the color blend factor of an `SKNode`, because it might not have a texture. Instead, what we want to do is go over only the *sprite* nodes in the returned array - we want to run the body of our loop only for sprite nodes, not for the other items.

This is where `for case let` comes in: it lets us attempts some work (typecasting to `SKSpriteNode` in this case), and run the loop body only for items that were successfully typecast.

So, rather than writing this:

```swift
for node in nodesAtPoint {
```

We write this:

```swift
for case let node as SKSpriteNode in nodesAtPoint {
```

The `let node` part creates a new constant called `node`, the `case…as SKSpriteNode` part means “if we can typecast this item as a sprite node, and of course the `for` loop is the loop itself.

Here's the `checkTouches()` method with that functionality in there:

```swift
func checkTouches(_ touches: Set<UITouch>) {
    guard let touch = touches.first else { return }

    let location = touch.location(in: self)
    let nodesAtPoint = nodes(at: location)

    for case let node as SKSpriteNode in nodesAtPoint {
        guard node.name == "firework" else { continue }
        node.name = "selected"
        node.colorBlendFactor = 0
    }
}
```

Apart from the `for case let` you've seen most of that previously, but that's because I missed out the logic to handle ensuring that players select only one color at a time. The above code will let them select all the fireworks, regardless of color.

So, we need to insert a second loop just before the `node.name = "selected"` line. When you place one loop inside another it's called an inner loop, and you need to be careful: if you have one loop that executes 100 times it's OK, and if you have another loop that executes 200 times that's OK too, but if you put one inside the other you now have 20,000 iterations of your loop and that's almost certainly *not* OK. Here, though, we'll have maybe two or three items in our outer loop and a maximum of 10 or so in the inner, so we're quite safe.

Remember, this inner loop needs to ensure that the player can select only one firework color at a time. So if they select red then another red, both are selected. But if they then select a green, we need to deselect the first two because they are red.

So, the loop will go through every firework in our `fireworks` array, then find the firework image inside it. Remember, that array holds the container node, and each container node holds the firework image and its spark emitter. If the firework was selected *and* is a different color to the firework that was just tapped, then we'll put its name back to "firework" and put its `colorBlendFactor` back to 1 so it resumes its old color.

So, put this code just before the `node.name = "selected"` line:

```swift
for parent in fireworks {
    guard let firework = parent.children.first as? SKSpriteNode else { continue }

    if firework.name == "selected" && firework.color != node.color {
        firework.name = "firework"
        firework.colorBlendFactor = 1
    }
}
```

That's the entire method, so all we need to do is make sure it's called. To make that happen, we need to modify the existing `touchesBegan()` method and add one for `touchesMoved()` too. All they will do is send the touch information on to `checkTouches()`, like this:

```swift
override func touchesBegan(_ touches: Set<UITouch>, with event: UIEvent?) {
    super.touchesBegan(touches, with: event)
    checkTouches(touches)
}

override func touchesMoved(_ touches: Set<UITouch>, with event: UIEvent?) {
    super.touchesMoved(touches, with: event)
    checkTouches(touches)
}
```

There's one more thing we need to code before moving on, and that's some additions to the `update()` method. This is because we need to handle the fireworks that the player *doesn't* destroy, and our solution is simple enough: if they get past 900 points up vertically, we consider them dead and remove them from the `fireworks` array and from the scene.

There is one curious quirk here, and it's down to how you remove items from an array. When removing items, we're going to loop through the array backwards rather than forwards. The reason for is that array items move down when you remove an item, so if you have 1, 2, 3, 4 and remove 3 then 4 moves down to become 3. If you're counting forwards, this is a problem because you just checked three and want to move on, but there's now a new 3 and possibly no longer a 4! If you're counting backwards, you just move on to 2.

Note: I chose 900 rather than 800 to mean "off screen vertically" because it's nice to give players a little extra time when making important actions. It's possible that the top firework is at 890 and the bottom one still on screen and being manipulated, so at least this way the player has the best possible window in which to make all their selections.

Here's the new `update()` method:

```swift
override func update(_ currentTime: TimeInterval) {
    for (index, firework) in fireworks.enumerated().reversed() {
        if firework.position.y > 900 {
            // this uses a position high above so that rockets can explode off screen
            fireworks.remove(at: index)
            firework.removeFromParent()
        }
    }
}
```

