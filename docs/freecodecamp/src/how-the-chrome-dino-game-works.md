---
lang: en-US
title: "How the Chrome Dino Game Works Under the Hood: A Tour of Chromium's Source Code"
description: "Article(s) > How the Chrome Dino Game Works Under the Hood: A Tour of Chromium's Source Code"
icon: fa-brands fa-js
category:
  - JavaScript
  - Web Browser
  - Google
  - Google Chrome
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - js
  - javascript
  - browser
  - webbrowser
  - web-browser
  - google
  - chrome
  - googlechrome
  - google-chrome
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How the Chrome Dino Game Works Under the Hood: A Tour of Chromium's Source Code"
    - property: og:description
      content: "How the Chrome Dino Game Works Under the Hood: A Tour of Chromium's Source Code"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-the-chrome-dino-game-works.html
prev: /programming/js/articles/README.md
date: 2026-08-14
isOriginal: false
author:
  - name: Alex Oliinyk
    url: https://freecodecamp.org/news/author/alexov/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/dfca07f2-cf19-46c5-9c46-dad380bd0ed4.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "JavaScript > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Google Chrome > Article(s)",
  "desc": "Article(s)",
  "link": "/tool/chrome/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How the Chrome Dino Game Works Under the Hood: A Tour of Chromium's Source Code"
  desc="You've seen it a hundred times: the Wi-Fi drops, Chrome shrugs, and a little pixelated T-Rex appears, ready to sprint through a desert the moment you hit the spacebar. That tiny game, hidden behind th"
  url="https://freecodecamp.org/news/how-the-chrome-dino-game-works"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/dfca07f2-cf19-46c5-9c46-dad380bd0ed4.png"/>

You've seen it a hundred times: the Wi-Fi drops, Chrome shrugs, and a little pixelated T-Rex appears, ready to sprint through a desert the moment you hit the spacebar.

That tiny game, hidden behind the "No Internet" error since 2014, is played roughly 270 million times every month. Its internal codename at Google was "Project Bolan," a nod to Marc Bolan, frontman of the rock band T. Rex.

And because Chrome is built on the open-source Chromium project, the entire game – every constant, design decision, and hack – is sitting in public for anyone to read.

![The Chrome dino world, assembled from the original sprite sheet](https://cdn.hashnode.com/uploads/covers/6a60e4e5f99e7bbad25386f1/5d2fb3c2-7ee8-47d8-90fa-de05a6cad06f.png)

So I read it. All of it. And it turns out this "simple" game is a small masterclass in game design: it quietly onboards you, refuses to kill you unfairly, animates a moon through seven phases, and has been shipping a typo to billions of devices for a decade.

In this article, we'll walk through the real source code and unpack how the dino game actually works. If you want the game open in a tab while you read, you don't need to kill your Wi-Fi. You can play the [<VPIcon icon="fa-brands fa-chrome"/>Dinosaur Game](https://chromedino.com/) online, and freeCodeCamp also has a [**guide to launching it on and offline**](/freecodecamp.org/how-to-play-the-no-internet-google-chrome-dinosaur-game-both-online-and-offline.md).

And the code itself lives in the Chromium tree, browsable at [<VPIcon icon="fa-brands fa-chrome"/>source.chromium.org](https://source.chromium.org/chromium/chromium/src/+/main:components/neterror/resources/dino_game/). This is historically a single file of roughly 3,000 lines of dependency-free vanilla JavaScript, drawing on a plain `<canvas>`. No engine. No framework. Not even jQuery.

By the way, here's the entire game's artwork. It's one small PNG, with every sprite the code refers to by coordinates:

![The original sprite sheet, annotated: every visual in the game lives in this one image](https://cdn.hashnode.com/uploads/covers/6a60e4e5f99e7bbad25386f1/9f00025c-0c09-46b8-821b-8053393fc911.png)

---

## The Clock: Why the Game Runs the Same Speed Everywhere

The first problem every game has to solve: browsers don't repaint at a fixed rate. A 144 Hz gaming monitor fires `requestAnimationFrame` 144 times a second. But a struggling laptop might manage 40. If you move things a fixed number of pixels per frame, your game literally runs 3× faster on better hardware.

The dino's solution is the standard one, executed cleanly. The game defines its speeds in pixels per frame *at an assumed 60 FPS*, then scales every movement by how much time actually passed:

```js
this.msPerFrame = 1000 / FPS;
// ...in each update:
this.xPos -= Math.floor((currentSpeed * FPS / 1000) * deltaTime);
```

Every moving thing in the game from the dino's jump to the cacti, clouds, and even the moon, is multiplied by `deltaTime`. That's why your high score is comparable to your friend's, whatever machines you're both on.

If you take one engineering habit away from this article, take this one: **never move anything by "per frame" amounts. Always scale by elapsed time.**

---

## The T-Rex: Four Constants and a Typo

The dino's entire physical existence is defined by a handful of numbers in `Trex.config` and `Runner.config`:

```js
GRAVITY: 0.6,
INIITAL_JUMP_VELOCITY: -10,
SPEED: 6,
ACCELERATION: 0.001,
MAX_SPEED: 13,
```

Yes, you read that right: `INIITAL_JUMP_VELOCITY`, with three I's. That misspelling shipped in Chrome, on billions of devices, and has survived for roughly a decade, because renaming it was never worth the risk. Let it comfort you the next time you find a typo in your own production code.

The units are pixels per frame at 60 FPS. Convert them and the physics becomes intuitive: gravity is 0.6 px/frame², jump velocity −10 px/frame. Run the math and the jump arc peaks at about 83 pixels roughly 0.28 seconds after takeoff. On a 150-pixel-tall playfield, that's more than half the screen.

The world starts scrolling at 6 px/frame (360 px/s) and gains 0.001 px/frame every frame until it hits the cap of 13, a little over twice the starting speed. That cap matters: it's the promise that the game gets *hard*, but never *impossible*.

But here's the detail most clones miss: **the jump height is variable.** Watch the code that runs when you release the spacebar:

```js
endJump: function () {
  if (this.reachedMinHeight &&
    this.jumpVelocity < this.config.DROP_VELOCITY) {
    this.jumpVelocity = this.config.DROP_VELOCITY;
  }
},
```

Tap the spacebar and the dino does a short hop, but hold it and the dino rides the full arc. Releasing the key early clamps the upward velocity, cutting the jump short (as long as a minimum height was reached, so you can't glitch yourself into a cactus). And if you press the Down arrow mid-air, `setSpeedDrop` multiplies the fall speed by 3, slamming the dino back to the ground for a fast recovery.

Two tiny mechanics, and suddenly the single-button game has an expressive skill ceiling: short hop, full jump, fast slam. That's why the top players' runs look nothing like yours.

---

## The Fairness Engine: How the Game Refuses to Cheat You

This is my favorite part of the codebase, because none of it is visible. You can only *feel* it. Every obstacle in the game is declared with a small config, and the configs encode a set of fairness rules. Here's the small cactus:

```js
{
    type: 'CACTUS_SMALL',
    width: 17,
    height: 35,
    multipleSpeed: 4,
    minGap: 120,
    minSpeed: 0,
    // ...
}
```

Let's unpack the rules hiding in there and elsewhere in the spawning code:

**Rule 1: The first three seconds are empty.** `CLEAR_TIME: 3000` guarantees no obstacle spawns for the first three seconds of a run. That's silent onboarding: you get a moment to feel the controls before the game asks anything of you.

**Rule 2: Clusters are gated by speed.** A cactus can spawn as a group of up to `MAX_OBSTACLE_LENGTH: 3`, but only when the current speed exceeds its `multipleSpeed` (4 for small cacti, 7 for large). Why? Because your jump *distance* grows with the world speed. The arc lasts a fixed time, so the faster the ground moves, the more ground you clear per jump.

Wide obstacles only appear once your jump is physically long enough to clear them. The game never generates a wall it knows you can't cross.

**Rule 3: Gaps scale with speed too.** The gap after each obstacle is computed as roughly `obstacleWidth × speed + minGap × 0.6`, plus randomness. So the faster the game, the more room you're given to react. Difficulty comes from the speed itself, never from unfair spacing.

**Rule 4: No obstacle appears three times in a row.** There's a function whose entire job is variety:

```js
duplicateObstacleCheck: function (nextObstacleType) {
    var duplicateCount = 0;
    for (var i = 0; i < this.obstacleHistory.length; i++) {
        duplicateCount = this.obstacleHistory[i] == nextObstacleType ?
            duplicateCount + 1 : 0;
    }
    return duplicateCount >= Runner.config.MAX_OBSTACLE_DUPLICATION;
},
```

With `MAX_OBSTACLE_DUPLICATION: 2`, the spawner keeps a history and re-rolls if the same obstacle type would appear a third consecutive time. You've never noticed this rule, which is exactly the point. You'd have noticed its absence.

**Rule 5: The pterodactyl is a late-game boss.** Its config says `minSpeed: 8.5`, meaning it can't appear at all until you're two-thirds of the way to max speed. It flies at one of three heights (so sometimes you jump it, sometimes you duck, and sometimes at 50 pixels you must decide), it never spawns in groups (`multipleSpeed: 999`), and it has its own `speedOffset: 0.8`, meaning each pterodactyl flies slightly faster or slower than the world scrolls. That last detail breaks your rhythm-based muscle memory precisely when you've gotten comfortable.

Together these rules are the answer to a question every game designer faces: how do you make a game *harder* without making it *unfair*? Players can feel the difference between "I lost because I was slow" and "I lost because the game cheated". And the dino, in ten years and trillions of runs, has never cheated anyone.

---

## Collision Detection: The Dino Is Six Rectangles

Naïve collision detection would wrap the dino in one bounding box and check overlap. But look at the dino: he has a snout sticking out, a tail, a gap under his chin. With a single box, a cactus grazing the empty air under his jaw would kill you, and it would feel terrible.

So the real dino is six boxes:

```js
Trex.collisionBoxes = {
    RUNNING: [
        new CollisionBox(22, 0, 17, 16),   // head
        new CollisionBox(1, 18, 30, 9),    // torso
        new CollisionBox(10, 35, 14, 8),   // legs
        new CollisionBox(1, 24, 29, 5),
        new CollisionBox(5, 30, 21, 4),
        new CollisionBox(9, 34, 15, 4)
    ],
    DUCKING: [
        new CollisionBox(1, 18, 55, 25)    // one long low box
    ]
};
```

Six small rectangles that trace the dino's actual silhouette: head, torso, and a staircase of boxes down the belly and legs. When the dino ducks, the whole set is swapped for one long, low box.

The obstacles get the same treatment: a small cactus is three boxes tracing its trunk and arms, and the pterodactyl is *five*, following its wings and beak.

Here's what those boxes actually look like, drawn over the real sprites:

![The real collision boxes from the source code, drawn over the sprites: 6 for the running T-Rex, 3 for a large cactus, 5 for the pterodactyl](https://cdn.hashnode.com/uploads/covers/6a60e4e5f99e7bbad25386f1/9a0dc54d-f59d-4427-8f18-cb42b2fa9092.png)

The algorithm is a classic two-phase check: first a cheap outer-box test (do the overall rectangles even touch?), and only if that passes, the detailed loop comparing every dino box against every obstacle box. Fast in the common case, precise in the moment that matters. If a cactus needle visually passes through the notch under the dino's chin, you live, and the code agrees with your eyes.

This is the cheapest possible version of a technique that scales all the way up to fighting-game hitboxes and hurtboxes. The lesson generalizes: **collision should match what the player sees, not what's convenient for the math.**

---

## Night Mode and the Seven-Phase Moon

Reach 700 points (`INVERT_DISTANCE: 700`) and the world inverts: dark sky, pale ground, stars. Twelve seconds later (`INVERT_FADE_DURATION: 12000`), day returns. Numerically it's just a class toggle plus a CSS-style inversion of the palette. But the charming part is what happens in the sky.

The moon isn't a static sprite. The sprite sheet contains it in seven versions, and the code cycles through them:

```js
NightMode.phases = [140, 120, 100, 60, 40, 20, 0];
```

Those are x-offsets into the sprite sheet, from a thin crescent through the half moons to a full disc:

![All seven moon phases, cropped straight from the sprite sheet at the offsets the code defines](https://cdn.hashnode.com/uploads/covers/6a60e4e5f99e7bbad25386f1/9823b7ea-c309-4db3-8e16-fcda9211f9af.png)

Every time night falls, the moon advances one phase. Stars drift at their own speed (`STAR_SPEED: 0.3`), slower than the ground, giving the night a whisper of parallax depth. Nobody needed a lunar calendar in a browser error page. Somebody built one anyway, and that somebody understood that details like this are the difference between a feature and a beloved thing.

---

## The Small Delights Hiding in Plain Sight

A few more finds from the source that reward the attentive:

**The dino blinks.** While the game waits for you to start, the idle dino blinks at randomized intervals. And there's a constant, `MAX_BLINK_COUNT: 3`, limiting how many times he'll do it. The blink delay itself is `Math.ceil(Math.random() * Trex.BLINK_TIMING)`. Someone at Google tuned the randomness of a dinosaur's eyelid.

**Your score isn't pixels.** The distance meter multiplies actual pixels traveled by `COEFFICIENT: 0.025`. So a score of 100 means you've run 4,000 pixels. Every 100 points (`ACHIEVEMENT_DISTANCE: 100`), the score flashes at four beats per second – a tiny dopamine metronome that makes round numbers feel like events.

**The counter is theatrical about overflow.** The display shows `MAX_DISTANCE_UNITS: 5` digits. Roll past 99,999 and the score visually resets. The internal counter keeps going, but the odometer effect stays, a deliberate homage to arcade cabinets.

**Mobile players get a handicap.** `MOBILE_SPEED_COEFFICIENT: 1.2`: the game runs faster... wait, no: it adjusts for the smaller screens and touch latency so the experience feels equivalent. The point is that someone measured the difference between a thumb on glass and a finger on a spacebar, and encoded the answer in a constant.

**Restart is protected.** After a crash there's a `GAMEOVER_CLEAR_TIME: 750`. For three-quarters of a second, your jump key won't restart the game. That's there because you *will* be hammering the spacebar when you die, and instantly restarting would rob you of the chance to see your score. A 750-millisecond act of mercy.

---

## What You Can Steal for Your Own Projects

The dino game is a masterclass precisely because its constraints were brutal: it had to be tiny, load instantly, run on everything from gaming rigs to $50 phones, and be understood by anyone in one second.

The techniques it uses under those constraints transfer to any project:

- **Scale by time, not frames.** Delta-time movement is why the game is fair across hardware.
- **Gate difficulty behind capability.** Wide clusters appear only when the jump can clear them. Ask what the player *can do*, then spawn accordingly.
- **Give the player an empty runway.** Three quiet seconds teach the controls better than a tutorial screen.
- **Enforce variety.** A three-line history check prevents monotony the player would notice only as vague boredom.
- **Make hitboxes honest.** Six rectangles that match the silhouette beat one rectangle that betrays the player's eyes.
- **Spend effort on invisible details.** Blinking, moon phases, the restart grace period: none are necessary, but all are felt. Ten years on, the Chrome dino is proof that a great game doesn't need photorealistic graphics or a 100-gigabyte install. It just needs tight controls, fair rules, one button, and a moon that keeps its phases. Now you know exactly why it feels so good: because someone, line by line, made sure it would.

Go read the source. It's one of the best free game design lessons on the internet, and it's been hiding behind your worst Wi-Fi days all along.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How the Chrome Dino Game Works Under the Hood: A Tour of Chromium's Source Code",
  "desc": "You've seen it a hundred times: the Wi-Fi drops, Chrome shrugs, and a little pixelated T-Rex appears, ready to sprint through a desert the moment you hit the spacebar. That tiny game, hidden behind th",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-the-chrome-dino-game-works.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
