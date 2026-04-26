---
lang: en-US
title: "Motion Controls In The Browser"
description: "Article(s) > Motion Controls In The Browser"
icon: fa-brands fa-js
category:
  - JavaScript
  - CSS
  - Article(s)
tag:
  - blog
  - smashingmagazine.com
  - js
  - javascript
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Motion Controls In The Browser"
    - property: og:description
      content: "Motion Controls In The Browser"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/smashingmagazine.com/motion-controls-browser.html
prev: /programming/js/articles/README.md
date: 2022-10-28
isOriginal: false
author:
  - name: Yaphi Berhanu
    url: https://smashingmagazine.com/author/yaphi-berhanu/
cover: https://res.cloudinary.com/indysigner/image/upload/v1666964645/motion-controls-browser_eenha4.jpg
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
  "title": "CSS > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/css/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Motion Controls In The Browser"
  desc="If you've ever wanted to build a web app that you can control with hand gestures as if by magic, this article is for you. With a couple of APIs and some JavaScript, you can build apps that behave like sorcery."
  url="https://smashingmagazine.com/2022/10/motion-controls-browser/"
  logo="https://smashingmagazine.com/images/favicon/favicon.svg"
  preview="https://res.cloudinary.com/indysigner/image/upload/v1666964645/motion-controls-browser_eenha4.jpg"/>

If you’ve ever wanted to build a web app that you can control with hand gestures as if by magic, this article is for you. With a couple of APIs and some JavaScript, you can build apps that behave like sorcery.

In this article, I’m going to explain how to implement motion controls in the browser. That means you’ll be able to create an application where you can move your hand and make gestures, and the elements on the screen will respond.

Here’s an example:

<CodePen
  user="smashingmag"
  slug-hash="vYrEEYw"
  title="Magic Hand - Motion controls for the web [forked]"
  :default-tab="['css','result']"
  :theme="dark"/>

Anyways, there are a few main ingredients you’ll need to make motion controls work for you:

1. Video data from a webcam;
2. Machine learning to track hand motions;
3. Gesture detection logic.

::: note

This article assumes a general familiarity with HTML, CSS, and JavaScript, so if you’ve got that, we can get started. Also note that you may need to click on the CodePen demos in case any previews appear blank (camera permissions not granted).

:::

---

## Step 1: Get The Video Data

The first step of creating motion controls is to access the user’s camera. We can do that using the browser’s [<VPIcon icon="fa-brands fa-firefox"/>`getMediaDevices` API](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia#width_and_height).

Here’s an example that gets the user’s camera data and draws it to a `<canvas>` every 100 milliseconds:

<CodePen
  user="smashingmag"
  slug-hash="QWxwwbG"
  title="Camera API test (MediaDevices) [forked]"
  :default-tab="['css','result']"
  :theme="dark"/>

From the example above, this code gives you the video data and draws it to the canvas:

```js
const constraints = {
  audio: false, video: { width, height }
};

navigator.mediaDevices.getUserMedia(constraints)
  .then(function(mediaStream) {
    video.srcObject = mediaStream;
    video.onloadedmetadata = function(e) {
      video.play();
      setInterval(drawVideoFrame, 100);
    };
  })
  .catch(function(err) { console.log(err); });

function drawVideoFrame() {
  context.drawImage(video, 0, 0, width, height);
  // or do other stuff with the video data
}
```

When you run `getUserMedia`, the browser starts recording camera data after asking the user for permission. The `constraints` parameter lets you indicate whether you want to include video and audio and, if you have video, what you want its resolution to be.

The camera data comes as an object known as a [<VPIcon icon="fa-brands fa-firefox"/>`MediaStream`](https://developer.mozilla.org/en-US/docs/Web/API/MediaStream), which you can then toss into an HTML `<video>` element via its `srcObject` property. Once the video is ready to go, you start it up and then do whatever you want with the frame data. In this case, the code example draws a video frame to the canvas every 100 milliseconds.

You can create more canvas effects with your video data, but for the purposes of this article, you know enough to move on to the next step.

---

## Step 2: Track The Hand Motions

Now that you can access frame-by-frame data of a video feed from a webcam, the next step in your quest to make motion controls is to figure out where the user’s hands are. For this step, we’ll need machine learning.

To make this work, I used an open-source machine learning library from Google called [<VPIcon icon="fa-brands fa-google"/>MediaPipe](https://google.github.io/mediapipe/solutions/hands.html). This library takes video frame data and gives you the coordinates of multiple points (also known as `landmarks`) on your hands.

::: info Twitter (<VPIcon icon="fa-brands fa-x-twitter"/><code>x.com</code>

That’s the beauty of machine learning libraries: complex technology needn’t be complex to use.

:::

Here’s the library in action:

<CodePen
  user="smashingmag"
  slug-hash="XWYJJpY"
  title="MediaPipe Test [forked]"
  :default-tab="['css','result']"
  :theme="dark"/>

![Hand coordinates rendered on a canvas. ([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/8b928505-2b2a-40be-95c7-b40213077631/1-motion-controls-in-browser.png))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/8b928505-2b2a-40be-95c7-b40213077631/1-motion-controls-in-browser.png)

Here’s some boilerplate to get started (adapted from MediaPipe’s [<VPIcon icon="fa-brands fa-google"/>JavaScript API example](https://google.github.io/mediapipe/solutions/hands.html#javascript-solution-api)):

```html :collapsed-lines
<script src="https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/@mediapipe/control_utils/control_utils.js" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils/drawing_utils.js" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js" crossorigin="anonymous"></script>

<video class="input_video"></video>
<canvas class="output_canvas" width="1280px" height="720px"></canvas>

<script>
const videoElement = document.querySelector('.input_video');
const canvasElement = document.querySelector('.output_canvas');
const canvasCtx = canvasElement.getContext('2d');

function onResults(handData) {
  drawHandPositions(canvasElement, canvasCtx, handData);
}

function drawHandPositions(canvasElement, canvasCtx, handData) {
  canvasCtx.save();
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  canvasCtx.drawImage(
      handData.image, 0, 0, canvasElement.width, canvasElement.height);
  if (handData.multiHandLandmarks) {
    for (const landmarks of handData.multiHandLandmarks) {
      drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS,
                     {color: '#00FF00', lineWidth: 5});
      drawLandmarks(canvasCtx, landmarks, {color: '#FF0000', lineWidth: 2});
    }
  }
  canvasCtx.restore();
}

const hands = new Hands({locateFile: (file) => {
  return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
}});
hands.setOptions({
  maxNumHands: 1,
  modelComplexity: 1,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5
});
hands.onResults(onResults);

const camera = new Camera(videoElement, {
  onFrame: async () => {
    await hands.send({image: videoElement});
  },
  width: 1280,
  height: 720
});
camera.start();

</script>
```

The above code does the following:

- Load the library code;
- Start recording the video frames;
- When the hand data comes in, draw the hand landmarks on a canvas.

Let’s take a closer look at the `handData` object since that’s where the magic happens. Inside `handData` is `multiHandLandmarks`, a collection of 21 coordinates for the parts of each hand detected in the video feed. Here’s how those coordinates are structured:

```js
{
  multiHandLandmarks: [
    // First detected hand.
    [
      {x: 0.4, y: 0.8, z: 4.5},
      {x: 0.5, y: 0.3, z: -0.03},
      // ...etc.
    ],

    // Second detected hand.
    [
      {x: 0.4, y: 0.8, z: 4.5},
      {x: 0.5, y: 0.3, z: -0.03},
      // ...etc.
    ],

    // More hands if other people participate.
  ]
}
```

::: note A couple of notes

- The first hand doesn’t necessarily mean the right or the left hand; it’s just whichever one the application happens to detect first. If you want to get a specific hand, you’ll need to check which hand is being detected using `handData.multiHandedness[0].label` and potentially swapping the values if your camera isn’t mirrored.
- For performance reasons, you can restrict the maximum number of hands to track, which we did earlier by setting `maxNumHands: 1`.
- The coordinates are set on a scale from `0` to `1` based on the size of the canvas.

:::

Here’s a visual representation of the hand coordinates:

![A map of numbered points on a hand. (Source: [<VPIcon icon="fa-brands fa-google"/>google.github.io](https://google.github.io/mediapipe/solutions/hands.html#hand-landmark-model)) ([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/be31d316-6994-408d-a5fa-b4288fbb7371/2-motion-controls-in-browser.jpg))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/be31d316-6994-408d-a5fa-b4288fbb7371/2-motion-controls-in-browser.jpg)

Now that you have the hand landmark coordinates, you can build a cursor to follow your index finger. To do that, you’ll need to get the index finger’s coordinates.

You could use the array directly like this `handData.multiHandLandmarks[0][5]`, but I find that hard to keep track of, so I prefer labeling the coordinates like this:

```js
const handParts = {
  wrist: 0,
  thumb: { base: 1, middle: 2, topKnuckle: 3, tip: 4 },
  indexFinger: { base: 5, middle: 6, topKnuckle: 7, tip: 8 },
  middleFinger: { base: 9, middle: 10, topKnuckle: 11, tip: 12 },
  ringFinger: { base: 13, middle: 14, topKnuckle: 15, tip: 16 },
  pinky: { base: 17, middle: 18, topKnuckle: 19, tip: 20 },
};
```

And then you can get the coordinates like this:

```js
const firstDetectedHand = handData.multiHandLandmarks[0];
const indexFingerCoords = firstDetectedHand[handParts.index.middle];
```

I found cursor movement more pleasant to use with the middle part of the index finger rather than the tip because the middle is more steady.

Now you’ll need to make a DOM element to use as a cursor. Here’s the markup:

```html
<div class="cursor"></div>
```

And here are the styles:

```css
.cursor {
  height: 0px;
  width: 0px;
  position: absolute;
  left: 0px;
  top: 0px;
  z-index: 10;
  transition: transform 0.1s;
}

.cursor::after {
  content: '';
  display: block;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  position: absolute;
  left: 0;
  top: 0;
  transform: translate(-50%, -50%);
  background-color: #0098db;
}
```

::: note A few notes about these styles:

- The cursor is absolutely positioned so it can be moved without affecting the flow of the document.
- The visual part of the cursor is in the `::after` pseudo-element, and the `transform` makes sure the visual part of the cursor is centered around the cursor’s coordinates.
- The cursor has a `transition` to smooth out its movements.

:::

Now that we’ve created a cursor element, we can move it by converting the hand coordinates into page coordinates and applying those page coordinates to the cursor element.

```js
function getCursorCoords(handData) {
  const { x, y, z } = handData.multiHandLandmarks[0][handParts.indexFinger.middle];
  const mirroredXCoord = -x + 1; /* due to camera mirroring */
  return { x: mirroredXCoord, y, z };
}

function convertCoordsToDomPosition({ x, y }) {
  return {
    x: `${x * 100}vw`,
    y: `${y * 100}vh`,
  };
}

function updateCursor(handData) {
  const cursorCoords = getCursorCoords(handData);
  if (!cursorCoords) { return; }
  const { x, y } = convertCoordsToDomPosition(cursorCoords);
  cursor.style.transform = `translate(${x}, ${y})`;
}

function onResults(handData) {
  if (!handData) { return; }
  updateCursor(handData);
}
```

Note that we’re using the CSS `transform` property to move the element rather than `left` and `top`. This is for performance reasons. When the browser renders a view, it goes through a [<VPIcon icon="iconfont icon-webdev"/>sequence of steps](https://web.dev/rendering-performance/#the-pixel-pipeline). When the DOM changes, the browser has to start again at the relevant rendering step. The `transform` property responds quickly to changes because it is applied at the last step rather than one of the middle steps, and therefore the browser has less work to repeat.

Now that we have a working cursor, we’re ready to move on.

---

## Step 3: Detect Gestures

The next step in our journey is to detect gestures, specifically **pinch gestures**.

First, what do we mean by a pinch? In this case, we’ll define a pinch as a gesture where the thumb and forefinger are close enough together.

To designate a pinch in code, we can look at when the `x`, `y`, and `z` coordinates of the thumb and forefinger have a small enough difference between them. “Small enough” can vary depending on the use case, so feel free to experiment with different ranges. Personally, I found `0.08`, `0.08`, and `0.11` to be comfortable for the `x`, `y`, and `z` coordinates, respectively. Here’s how that looks:

```js
function isPinched(handData) {
  const fingerTip = handData.multiHandLandmarks[0][handParts.indexFinger.tip];
  const thumbTip = handData.multiHandLandmarks[0][handParts.thumb.tip];
  const distance = {
    x: Math.abs(fingerTip.x - thumbTip.x),
    y: Math.abs(fingerTip.y - thumbTip.y),
    z: Math.abs(fingerTip.z - thumbTip.z),
  };
  const areFingersCloseEnough = distance.x < 0.08 && distance.y < 0.08 && distance.z < 0.11;

  return areFingersCloseEnough;
}
```

It would be nice if that’s all we had to do, but alas, it’s never that simple.

What happens when your fingers are on the edge of a pinch position? If we’re not careful, the answer is chaos.

With slight finger movements as well as fluctuations in coordinate detection, our program can rapidly alternate between pinched and not pinched states. If you’re trying to use a pinch gesture to “pick up” an item on the screen, you can imagine how chaotic it would be for the item to rapidly alternate between being picked up and dropped.

In order to prevent our pinch gestures from causing chaos, we’ll need to introduce a slight delay before registering a change from a pinched state to an unpinched state or vice versa. This technique is called a [<VPIcon icon="fas fa-globe"/>`debounce`](https://davidwalsh.name/javascript-debounce-function), and the logic goes like this:

- When the fingers enter a pinched state, start a timer.
- If the fingers have stayed in the pinched state uninterrupted for long enough, register a change.
- If the pinched state gets interrupted too soon, stop the timer and don’t register a change.

The trick is that the delay must be long enough to be reliable but short enough to feel quick.

We’ll get to the debounce code soon, but first, we need to prepare by tracking the state of our gestures:

```js
const OPTIONS = {
  PINCH_DELAY_MS: 60,
};

const state = {
  isPinched: false,
  pinchChangeTimeout: null,
};
```

Next, we’ll prepare some [<VPIcon icon="fa-brands fa-firefox"/>custom events](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent) to make it convenient to respond to gestures:

```js
const PINCH_EVENTS = {
  START: 'pinch_start',
  MOVE: 'pinch_move',
  STOP: 'pinch_stop',
};

function triggerEvent({ eventName, eventData }) {
  const event = new CustomEvent(eventName, { detail: eventData });
  document.dispatchEvent(event);
}
```

Now we can write a function to update the pinched state:

```js
function updatePinchState(handData) {
  const wasPinchedBefore = state.isPinched;
  const isPinchedNow = isPinched(handData);
  const hasPassedPinchThreshold = isPinchedNow !== wasPinchedBefore;
  const hasWaitStarted = !!state.pinchChangeTimeout;

  if (hasPassedPinchThreshold && !hasWaitStarted) {
    registerChangeAfterWait(handData, isPinchedNow);
  }

  if (!hasPassedPinchThreshold) {
    cancelWaitForChange();
    if (isPinchedNow) {
      triggerEvent({
        eventName: PINCH_EVENTS.MOVE,
        eventData: getCursorCoords(handData),
      });
    }
  }
}

function registerChangeAfterWait(handData, isPinchedNow) {
  state.pinchChangeTimeout = setTimeout(() => {
    state.isPinched = isPinchedNow;
    triggerEvent({
      eventName: isPinchedNow ? PINCH_EVENTS.START : PINCH_EVENTS.STOP,
      eventData: getCursorCoords(handData),
    });
  }, OPTIONS.PINCH_DELAY_MS);
}

function cancelWaitForChange() {
  clearTimeout(state.pinchChangeTimeout);
  state.pinchChangeTimeout = null;
}
```

Here’s what `updatePinchState()` is doing:

- If the fingers have passed the pinch threshold by starting or stopping a pinch, we’ll start a timer to wait and see if we can register a legitimate pinch state change.
- If the wait is interrupted, that means the change was just a fluctuation, so we can cancel the timer.
- However, if the timer is *not* interrupted, we can update the pinched state and trigger the correct custom change event, namely, `pinch_start` or `pinch_stop`.
- If the fingers have not passed the pinch change threshold and are currently pinched, we can dispatch a custom `pinch_move` event.

We can run `updatePinchState(handData)` each time we get hand data so that we can put it in our `onResults` function like this:

```js
function onResults(handData) {
  if (!handData) { return; }
  updateCursor(handData);
  updatePinchState(handData);
}
```

Now that we can reliably detect a pinch state change, we can use our custom events to define whatever behavior we want when a pinch is started, moved, or stopped. Here’s an example:

```js
document.addEventListener(PINCH_EVENTS.START, onPinchStart);
document.addEventListener(PINCH_EVENTS.MOVE, onPinchMove);
document.addEventListener(PINCH_EVENTS.STOP, onPinchStop);

function onPinchStart(eventInfo) {
  const cursorCoords = eventInfo.detail;
  console.log('Pinch started', cursorCoords);
}

function onPinchMove(eventInfo) {
  const cursorCoords = eventInfo.detail;
  console.log('Pinch moved', cursorCoords);
}

function onPinchStop(eventInfo) {
  const cursorCoords = eventInfo.detail;
  console.log('Pinch stopped', cursorCoords);
}
```

Now that we’ve covered how to respond to movements and gestures, we have everything we need to build an application that can be controlled with hand motions.

Here are some examples:

<CodePen
  user="smashingmag"
  slug-hash="WNybveM"
  title="Beam Sword - Fun with motion controls! [forked]"
  :default-tab="['css','result']"
  :theme="dark"/>

<CodePen
  user="smashingmag"
  slug-hash="OJEPVJj"
  title="Magic Quill - Air writing with motion controls [forked]"
  :default-tab="['css','result']"
  :theme="dark"/>

I’ve also put together some other motion control demos, including [<VPIcon icon="fas fa-globe"/>movable playing cards](https://magic-hand.vercel.app/cards.html) and an [<VPIcon icon="fas fa-globe"/>apartment floor plan](https://magic-hand.vercel.app/floor_plan.html) with movable images of the furniture, and I’m sure you can think of other ways to experiment with this technology.

---

## Conclusion

If you’ve made it this far, you’ve seen how to implement motion controls with a browser and a webcam. You’ve read camera data using browser APIs, you’ve gotten hand coordinates via machine learning, and you’ve detected hand motions with JavaScript. With these ingredients, you can create all sorts of motion-controlled applications.

What use cases will you come up with? Let me know in the comments!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Motion Controls In The Browser",
  "desc": "If you've ever wanted to build a web app that you can control with hand gestures as if by magic, this article is for you. With a couple of APIs and some JavaScript, you can build apps that behave like sorcery.",
  "link": "https://chanhi2000.github.io/bookshelf/smashingmagazine.com/motion-controls-browser.html",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```
