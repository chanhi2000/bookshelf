---
lang: en-US
title: "The Gamepad API Lies to You: A Practical Guide to Reading Controller Input in JavaScript"
description: "Article(s) > The Gamepad API Lies to You: A Practical Guide to Reading Controller Input in JavaScript"
icon: fa-brands fa-js
category:
  - JavaScript
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - js
  - javascript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > The Gamepad API Lies to You: A Practical Guide to Reading Controller Input in JavaScript"
    - property: og:description
      content: "The Gamepad API Lies to You: A Practical Guide to Reading Controller Input in JavaScript"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/gamepad-api-javascript-guide.html
prev: /programming/js/articles/README.md
date: 2026-09-08
isOriginal: false
author:
  - name: taimoor bamazai
    url: https://freecodecamp.org/news/author/taimoorbamazai/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/25358bd5-321e-477c-8561-e783792bce9e.png
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

[[toc]]

---

<SiteInfo
  name="The Gamepad API Lies to You: A Practical Guide to Reading Controller Input in JavaScript"
  desc="The Gamepad API is one of the smallest browser APIs you'll ever use. Four properties, one function, and no permissions prompt. You can have a controller drawn on screen in about fifteen lines. Those f"
  url="https://freecodecamp.org/news/gamepad-api-javascript-guide"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/25358bd5-321e-477c-8561-e783792bce9e.png"/>

The Gamepad API is one of the smallest browser APIs you'll ever use. Four properties, one function, and no permissions prompt. You can have a controller drawn on screen in about fifteen lines.

Those fifteen lines will also quietly report that a broken controller is fine.

I found this out the slow way, building a browser-based controller tester. A user emailed to say the site told him his gamepad was healthy when the stick was visibly drifting in every game he owned. He was right. The browser had handed us zeros.

This article covers the parts of the Gamepad API that aren't in the spec docs and that cost me real debugging time: why you have to poll, why the values you get on page load aren't the values the hardware sent, why you can't tell what controller is plugged in, and how to tell a drifting analog stick apart from a person holding one.

All the code here runs in a browser console with a controller connected. Press a button first, or the API will pretend nothing is plugged in.

::: note Prerequisites

This is a hands-on guide. There's nothing to install and no build step, but a few things need to be true before the code below will do anything.

**What you should already know:**

- JavaScript at a working level: functions, arrays and array methods like `reduce` and `filter`, arrow functions, and destructuring.
- What an animation frame loop is. Several of the examples run inside `requestAnimationFrame`.
- How to open your browser's developer tools and paste code into the console.

One section does a little vector arithmetic: the mean of a set of x and y samples and the length of that mean vector. If `Math.hypot(x, y)` makes sense to you, that section will too.

**What you need to have:**

- A desktop browser that supports the Gamepad API. Chrome, Edge, Firefox and Safari have all supported it since 2017, so whatever you have open is almost certainly fine.
- A physical game controller, connected by USB or Bluetooth. There's no way to fake one in software, and none of the code below does anything useful without hardware attached.
- Ideally, a controller you know is faulty, like one with stick drift if you have it. Several of the behaviours in this article only show up on broken hardware. A healthy controller will hide them from you.

:::

You don't need any frameworks or libraries, or npm install. Every block below is plain JavaScript that runs as written.

---

## The Tester That Doesn't Work

Here's the version almost everyone writes first. It's the version in most tutorials.

```js
window.addEventListener("gamepadconnected", (e) => {
  const pad = navigator.getGamepads()[e.gamepad.index];
  console.log(pad.axes);    // [0, 0, 0, 0]
  console.log(pad.buttons.filter(b => b.pressed).length);   // 0
});
```

Plug in a controller with severe stick drift, one that pulls a character across the screen on its own in every game, and this prints `[0, 0, 0, 0]`.

There are two separate bugs in those five lines, and the second one is the interesting one.

---

## Why You Have to Poll

The first bug is that there are no input events. `gamepadconnected` and `gamepaddisconnected` fire, and that's the entire event surface. There's no `gamepadaxischange` and no `gamepadbuttondown`. If you want to know what the sticks are doing, you have to ask, over and over, usually in `requestAnimationFrame`.

The second part of the same bug: you have to call `navigator.getGamepads()` again every single frame. It returns snapshots. Holding on to a `Gamepad` object and reading it later gets you the values from the moment you grabbed it, frozen, forever.

```js
function loop() {
  const pads = navigator.getGamepads();     // re-read every frame, do not cache
  for (const pad of pads) {
    if (!pad) continue;                     // the array has empty slots, always guard
    render(pad.index, pad.axes, pad.buttons);
  }
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
```

Two practical notes on that loop.

First, the array is sparse. `navigator.getGamepads()` returns a fixed length array with `null` in the slots that have nothing connected, so a plain `for...of` without the guard will throw on the first `null`.

Second, polling isn't free. A `requestAnimationFrame` loop that starts at page load and runs forever is real main thread work on a page that may have no controller connected at all and never will.

Here's a pattern that works well: idle at a low rate, something like 8 times a second with `setTimeout`, purely to notice a controller appearing, then switch to full `requestAnimationFrame` once one is actually connected, and drop back down when it disconnects. The API is cheap to sample, but sampling it 60 times a second on every page view for nothing is a waste you'll see in a performance profile.

---

## The Sanitization Rule

Now the part that is genuinely under-documented, and the reason the drifting controller reported zeros.

Chromium won't report an axis's real value until it has seen that axis at rest at least once.

Not until the user moves it. Until the browser observes it near zero.

The mechanism is in one file, [<VPIcon icon="fas fa-foler-open"/>`device/gamepad/`<VPIcon icon="iconfont icon-c"/>`gamepad_pad_state_provider.cc (<VPIcon icon="iconfont icon-github"/>`chromium/chromium`)](https://github.com/chromium/chromium/blob/2ef21ead8cf5ba3ce6202d7e8cb5cb41450e605e/device/gamepad/gamepad_pad_state_provider.cc#L23). The browser keeps two bitfields per connected controller, an `axis_mask` and a `button_mask`. While an axis's bit is unset, its reported value is forced to `0.0`. The bit gets set the first time that axis reports a magnitude below a constant called `kMinAxisResetValue`, which is `0.1f`. From then on, real values flow through.

Buttons work the same way through `button_mask`, with a stricter test: the bit is set the first time the button reports as not pressed. A button that's held down as the page loads, or a trigger that a broken spring is holding halfway, reports `pressed: false` and `value: 0` until the browser sees it released once.

This isn't a bug, and it's worth understanding why it's there. The comment in the source explains it: a controller can report input when nobody is touching it, because of a hardware fault or because something heavy is leaning on a stick. Without this rule, that stray input would be treated as a user gesture, and the page would learn about a device the user never chose to reveal. So each axis and each button has to prove it can sit at rest before the browser will tell you anything about it.

Read the consequence carefully, because it's the opposite of what you would guess:

**The worse the drift, the longer the browser insists the controller is fine.**

A stick with a small offset will pass under `0.1` on some frame soon enough and unmask itself. A badly worn stick that never settles back inside that window stays masked indefinitely. The controller that most needs reporting is the one that reports nothing.

This also explains something that looks like magic in controller testers. Instructions like "move both sticks in a full circle" don't work because movement unlocks the axis. They work because a full circle passes through the centre on the way back.

Here is a demo you can paste into a console. Connect a controller, load the page, and don't touch the sticks. Then push the left stick to the edge and let it spring back.

```js
const start = performance.now();
let woke = false;

requestAnimationFrame(function loop() {
  const pad = navigator.getGamepads()[0];
  if (pad && !woke) {
    const [x, y] = pad.axes;
    if (x !== 0 || y !== 0) {
      woke = true;
      console.log(
        "left stick started reporting after",
        Math.round(performance.now() - start), "ms,",
        "first values:", x.toFixed(3), y.toFixed(3)
      );
    }
  }
  requestAnimationFrame(loop);
});
```

On a healthy controller sitting still, the axes unmask almost immediately, because a healthy stick rests at roughly zero. On a drifting one, nothing is logged until you send the stick through the centre yourself.

The practical rule that falls out of this: never draw a conclusion about hardware from the first frame after connection. Wait until you've seen each axis report a non zero value at least once, or ask the user to move the sticks, and only then trust what you're reading.

---

## You Can't Identify the Hardware, Either

The second surprise is smaller but it will bite you in the UI layer.

The spec gives you `pad.id`, a string the browser makes up. On Linux and often on macOS it contains a USB vendor and product ID in hex, and you can look the device up. On Windows, XInput devices (which is to say most Xbox style controllers) expose no vendor or product ID at all. The string looks like `"Xbox 360 Controller (XInput STANDARD GAMEPAD)"`, and a third party clone reports exactly the same thing as first party hardware.

macOS has its own version of this. A DualShock 4 connected to Chrome on macOS arrives as `"Wireless Controller (STANDARD GAMEPAD)"`. No vendor ID, no product ID, and a name generic enough that half a dozen unrelated controllers share it.

That last one cost me a real bug. Our glyph rendering keyed off a parsed `id` string, so every DualShock 4 on a Mac fell through to the generic fallback and drew Xbox-style button labels on a PlayStation controller. Every Mac user of that feature saw the wrong thing for months, and no Windows or Linux test would ever have caught it.

Branch on capability instead:

```js
function describe(pad) {
  return {
    standard: pad.mapping === "standard",   // trust axes/buttons ordering only if true
    axes: pad.axes.length,                  // 4 on a normal twin stick pad
    buttons: pad.buttons.length,            // 17 on standard mapping with a guide button
    analogTriggers: pad.buttons.slice(6, 8).every(b => typeof b.value === "number"),
    rumble: Boolean(pad.vibrationActuator)
  };
}
```

Use `pad.id` for display, and to let the user confirm what they have plugged in. Don't use it to decide what your code does.

---

## Telling Drift from a Human Hand

Once you can actually read the sticks, you hit the real problem: an off centre reading doesn't mean the hardware is broken. It usually means a person is holding the stick.

The obvious detector is a threshold and a timer. If an axis stays past some value for N milliseconds, call it drift. I shipped that. It was wrong, and it was wrong in the worst direction, because our own on screen instruction told users to rotate both sticks in full circles, and a slow circle holds an axis past a threshold for a long time. The tester told people their working controllers were broken.

What separates the two cases isn't how far the stick is from centre. It's two things together.

**Gate one, is it near rest.** Real drift is a small persistent offset, typically well under half deflection. A hand on a stick is usually much further out. Require the mean magnitude over the sample window to be below about 0.6. **Gate two, is it directionally coherent.** This is the one that does the work. Drift comes from a worn or miscalibrated sensor, so it holds one direction with very little variation. A human hand wanders, even when trying to hold still. Compare the length of the mean vector to the mean of the individual magnitudes. If every sample points the same way, those two numbers are nearly equal and the ratio approaches 1. If the samples fan out, the mean vector is shorter than the mean magnitude and the ratio drops. Require above about 0.9.

```js
// samples: array of { x, y } collected over a rolling window, one per frame
function looksLikeDrift(samples) {
  if (samples.length < 30) return false;                 // not enough evidence yet

  const magnitude = s => Math.hypot(s.x, s.y);
  const meanMagnitude =
    samples.reduce((sum, s) => sum + magnitude(s), 0) / samples.length;

  if (meanMagnitude < 0.02) return false;                // resting at centre, nothing wrong
  if (meanMagnitude > 0.6) return false;                 // gate 1: too far out to be drift

  const meanX = samples.reduce((sum, s) => sum + s.x, 0) / samples.length;
  const meanY = samples.reduce((sum, s) => sum + s.y, 0) / samples.length;
  const coherence = Math.hypot(meanX, meanY) / meanMagnitude;

  return coherence > 0.9;                                // gate 2: holds one direction
}
```

And the collector that feeds it:

```js
const window_ = [];
const WINDOW = 120;   // about two seconds at 60fps

requestAnimationFrame(function loop() {
  const pad = navigator.getGamepads()[0];
  if (pad) {
    window_.push({ x: pad.axes[0], y: pad.axes[1] });
    if (window_.length > WINDOW) window_.shift();
    if (looksLikeDrift(window_)) console.log("left stick looks like drift");
  }
  requestAnimationFrame(loop);
});
```

The measurement, because a claim like this is worth a number: replaying the same 64 seconds of recorded live controller input, the threshold and timer version raised a drift condition on **2,144 frames**. The two gate version raised it on **zero**. That recording contained no drifting hardware. Every one of those 2,144 frames was a person moving a stick, mostly following our own instructions.

Neither gate is magic, and it's worth saying where this one still fails. A hand held deliberately still and off centre in a single direction passes both gates, because that's genuinely hard to tell apart from a worn sensor by looking at the numbers alone. The fix isn't a third gate, it's context: run the check during a moment when you've asked the user to let go of the sticks, rather than against arbitrary input. Detection logic gets much easier when you control the conditions it runs in.

One design rule came out of that, and it generalises well beyond controllers: a gate may only suppress a report, never create one. Both gates can veto. Neither can raise the alarm on its own. If you find yourself adding a rule that turns a quiet signal into a loud one, you're building a false positive generator.

---

## Known Limits

There are four things worth knowing before you ship.

Vibration isn't portable. Feature detect `pad.vibrationActuator` and treat rumble as a bonus, never as a requirement.

Non-standard mappings are real. When `pad.mapping` isn't `"standard"`, the axis and button ordering is whatever the browser and driver agreed on, and index 0 isn't guaranteed to be anything in particular. Handle that case or refuse it explicitly, but don't assume it away.

Bluetooth polling is less consistent than USB. Sample intervals wobble, so anything you compute from timing should be tolerant of jitter rather than assuming a steady 60Hz.

And browser support for newer controllers lags the hardware. A controller released last year may be recognised by one browser and not another on the same machine, which makes "my controller doesn't work" a browser question at least as often as a hardware one.

---

## Wrapping Up

The Gamepad API is small and mostly pleasant to work with. The thing to carry away is that it's not a direct line to the hardware. The browser sits in between, protecting the user from the page, and the value it hands you isn't always the value the controller sent.

So poll instead of listening, re-read `getGamepads()` every frame, wait for each axis to prove itself before you trust it, branch on capability rather than on the `id` string, and require more than a threshold before you tell someone their hardware is broken.

And test with a controller you know is broken. A tester that has only ever been run against working hardware hasn't been tested at all.

::: note

I build [<VPIcon icon="fas fa-globe"/>JoyCheck](https://joycheck.io/), a browser-based gamepad tester, which is where these measurements come from.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The Gamepad API Lies to You: A Practical Guide to Reading Controller Input in JavaScript",
  "desc": "The Gamepad API is one of the smallest browser APIs you'll ever use. Four properties, one function, and no permissions prompt. You can have a controller drawn on screen in about fifteen lines. Those f",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/gamepad-api-javascript-guide.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
