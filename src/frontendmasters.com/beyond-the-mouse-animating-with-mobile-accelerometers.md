---
lang: en-US
title: "Beyond the Mouse: Animating with Mobile Accelerometers"
description: "Article(s) > Beyond the Mouse: Animating with Mobile Accelerometers"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - JavaScript
  - Article(s)
tag:
  - blog
  - frontendmasters.com
  - css
  - js
  - javascript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Beyond the Mouse: Animating with Mobile Accelerometers"
    - property: og:description
      content: "Beyond the Mouse: Animating with Mobile Accelerometers"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/beyond-the-mouse-animating-with-mobile-accelerometers.html
prev: /programming/css/articles/README.md
date: 2026-01-09
isOriginal: false
author:
  - name: Amit Sheen
    url : https://frontendmasters.com/blog/author/amitsheen/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/8178
---

# {{ $frontmatter.title }} 관련

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
  name="Beyond the Mouse: Animating with Mobile Accelerometers"
  desc="Mousing over an element and watching it tilt in 3D space is a beautiful and compelling effect. Let's bring it to mobile and use the phone itself rather than a cursor."
  url="https://frontendmasters.com/blog/beyond-the-mouse-animating-with-mobile-accelerometers/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/8178"/>

Adding user interactions is a powerful way to elevate a design, bringing an interface to life with subtle movements that follow the mouse and creating an effect that seemingly dances with the cursor.

<CodePen
  link="https://codepen.io/amit_sheen/pen/ogLXxrZ/8ce019ac342f047313a096553dad0d08"
  title="Animating with Mobile Accelerometers - demo 0"
  :default-tab="['css','result']"
  :theme="dark"/>

I’ve done dozens of demos and written several articles exploring these exact types of effects, but one thing has always bothered me: the moment a user switches to a mobile device, that magic vanishes, leaving behind a static and uninspiring experience.

::: info

```component VPCard
{
  "title": "The Deep Card Conundrum",
  "desc": "What if you could make a card like a 3D portal, with layers of depth? You probably should just click to see, it's a very compelling look.",
  "link": "/frontendmasters.com/the-deep-card-conundrum.md",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

:::

In a mobile-first world, we shouldn’t have to settle for these ‘frozen’ fallbacks. By leveraging the built-in accelerometers and motion sensors already in our users’ pockets, we can bridge this gap, breathing new life into our animations and creating a dynamic, tactile experience that moves with the user, literally.

::: note A quick note before we jump in:

While I usually recommend viewing my examples on a large desktop screen, the effects we are discussing today are purpose-built for mobile. So to see the magic in action, you’ll need to open these examples on a mobile device. A link to a full-page preview is provided below each demo.

:::

---

## Identifying the Environment

Before we dive into the code, let’s take the simple example above of the 3D effect, where the objects tilt and turn based on the cursor’s position. It creates a satisfying effect with a nice sense of depth on a desktop, but on mobile, it’s just a flat, lifeless image.

To bridge this gap, our code first needs to be smart enough to detect the environment, determine which interaction model to use, and switch between the mouse and the accelerometer at a reliable way.

While we could just check if the `DeviceOrientationEvent` exists, many modern laptops actually include accelerometers, which might lead our code to expect motion on a desktop. A more robust approach is to check for a combination of motion support and touch capabilities. This ensures that we only activate the motion logic on devices where it actually makes sense:

```js
const supportsMotion = typeof window.DeviceMotionEvent !== 'undefined';
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

if (supportsMotion && isTouchDevice) {
  // Initialize mobile motion sensors
  initMotionExperience();
} else {
  // Fallback to desktop mouse tracking
  initMouseFollow();
}
```

By making this distinction, we can tailor the experience to the hardware. If we detect a mobile device, we move to our first real hurdle: getting the browser’s permission to actually access those sensors.

You might be tempted to use the User Agent to detect mobile devices, but that is a slippery slope. Modern browsers, especially on tablets, often masquerade as desktop versions. By checking for specific features like touch support and sensor availability instead, we ensure our code works on any device that supports the interaction, regardless of its model or brand.

---

## The Gatekeeper: Handling Permissions

Now that we’ve identified we are on a mobile device, you might expect the sensors to start streaming data immediately. However, to protect user privacy, mobile browsers (led by iOS) now require explicit user consent before granting access to sensor data.

This creates a split in our implementation:

- The “Strict” Environment (iOS): Access must be requested via a specific method, and this request must be triggered by a “user gesture” (like clicking a button).
- The “Open” Environment (Android & Others): The data is often available immediately, but for consistency and future-proofing, we should treat the permission flow as a standard part of our logic.

The best way to handle this is to create a “Start” or “Enable Motion” interaction. This ensures that the user isn’t startled by sudden movements and satisfies the browser’s requirement for a gesture. Here is a clean way to handle the permission flow for both scenarios:

```js
// call on user gesture
async function enableMotion() {
  // Check if the browser requires explicit permission (iOS 13+)
  if (typeof DeviceOrientationEvent.requestPermission === "function") {
    try {
      const permissionState = await DeviceOrientationEvent.requestPermission();

      if (permissionState === "granted") {
        window.addEventListener("devicemotion", handleMotion);
      } else {
        console.warn("Permission denied by user");
      }
    } catch (error) {
      console.error("DeviceMotion prompt failed", error);
    }
  } else {
    // Non-iOS devices or older browsers
    window.addEventListener("devicemotion", handleMotion);
  }
}
```

By wrapping the logic this way, your app stays robust. On Android, the event listener attaches immediately. On iOS, the browser pauses and presents the user with a system prompt. Once they click “Allow,” the magic begins.

---

## Understanding Mobile Motion Sensors

Now that we know we’re on mobile and have the necessary permissions, we start receiving data. This information comes from a set of motion sensors found in almost every smartphone.

In the browser, these sensors are exposed through two main APIs: `DeviceOrientation`, which provides the absolute physical orientation of the device (its position in space), and `DeviceMotion`, which provides real-time data about the device’s acceleration and rotation.

For the first step, we want to focus on the movement itself, so we will start with the `DeviceMotion` API. This API provide us with two distinct types of data:

- **Linear Motion (Acceleration)**: This measures forces along the three primary axes: X, Y, and Z. It’s what detects when you are shaking the phone, dropping it, or walking. Within this property we can access three values (`x`, `y`, and `z`) that describe the change in acceleration along each specific axis.
- **Rotational Motion (Rotation Rate)**: This measures how fast the device is being tilted, flipped, or turned. This is where the magic happens for most UI effects, as it captures the “intent” of the user’s movement. The `rotationRate` property provides three values:
  - `alpha`: Rotation around the X axis, from front to back (tilting the top of the phone away from you).
  - `beta`: Rotation around the Y axis, from left to right (tilting the phone from side to side).
  - `gamma`: Rotation around the Z axis, perpendicular to the screen (spinning the phone on a table).

By listening to these rates of change, we can mirror the physical movement of the phone directly onto our digital interface, creating a responsive and tactile experience.

---

## Mapping Motion to CSS Variables

Now that we are receiving a steady stream of data via our `handleMotion` function, it’s time to put it to work. The goal is to take the movement of the phone and map it to the same visual properties we used for the desktop version.

Inside the function, our first step is to capture the rotation data:

```js
function handleMotion(event) {
  const rotation = event.rotationRate;
}
```

Now we can map the Alpha, Beta, and Gamma values to CSS variables that will rotate our rings.

In the desktop implementation, the rings responds to the mouse using two CSS variables: `--rotateX` and `--rotateY`. To support mobile, we can simply “piggyback” on these existing variables and add `--rotateZ` to handle the third dimension of movement.

Here is how the logic splits between the two worlds:

```js
// Desktop: Mapping mouse position to rotation
window.addEventListener('mousemove', (event) => {
  rings.style.setProperty('--rotateX', `${event.clientY / window.innerHeight * -60 + 30}deg`);
  rings.style.setProperty('--rotateY', `${event.clientX / window.innerWidth * 60 - 30}deg`);
});

// Mobile: Mapping rotation rate to CSS variables
function handleMotion(event) {
  const rotation = event.rotationRate;
    
  // We multiply by 0.2 to dampen the effect for a smoother feel. 
  // A higher number will make the rotation more intense.
  // Notice that the Y-axis is multiplied by a negative number to align with physical movement.
  rings.style.setProperty('--rotateX', `${rotation.alpha * 0.2}deg`);
  rings.style.setProperty('--rotateY', `${rotation.beta * -0.2}deg`);
  rings.style.setProperty('--rotateZ', `${rotation.gamma * 0.2}deg`);
}`
```

By multiplying the values by `0.2`, we “calm down” the sensor’s sensitivity, creating a more professional and controlled animation. Feel free to experiment with this multiplier to find the intensity that fits your design.

The final step is updating the CSS. Since `--rotateX` and `--rotateY` are already in use, we just need to add the Z-axis rotation:

```css
.rings {
  position: relative;
  transform: 
    rotateX(var(--rotateX, 0deg)) 
    rotateY(var(--rotateY, 0deg)) 
    rotateZ(var(--rotateZ, 0deg));
  
  /* The transition is key for smoothing out the sensor data */
  transition: transform 0.4s ease-out;
}
```

Now that all the pieces are in place, we have a unified experience: elegant mouse-tracking on desktop and dynamic, motion-powered interaction on mobile.

<CodePen
  link="https://codepen.io/amit_sheen/pen/pvbJyMm/55fc05ae10147ead220f712ccf43f4a9"
  title="Animating with Mobile Accelerometers - demo 1"
  :default-tab="['css','result']"
  :theme="dark"/>

::: info

([<VPIcon icon="fa-brands fa-codepen"/>Demo above in a full page preview](https://cdpn.io/pen/debug/pvbJyMm/55fc05ae10147ead220f712ccf43f4a9), for mobile.)

:::

---

## Adding Physical Depth with Acceleration

To take the effect even further, we can go beyond simple rotation. By using the `acceleration` property from the `DeviceMotion` event, we can make the object physically move across the screen as we move our hands.

Inside our `handleMotion` function, we’ll capture the acceleration data along the X, Y, and Z axes:

```js
function handleMotion(event) {
  const rotation = event.rotationRate;
  const acceleration = event.acceleration;

  // Rotation logic (as before)
  rings.style.setProperty('--rotateX', `${rotation.alpha * 0.2}deg`);
  rings.style.setProperty('--rotateY', `${rotation.beta * -0.2}deg`);
  rings.style.setProperty('--rotateZ', `${rotation.gamma * 0.2}deg`);

  // Translation logic: moving the object in space
  rings.style.setProperty('--translateX', `${acceleration.x * -25}px`);
  rings.style.setProperty('--translateY', `${acceleration.y * 25}px`);
  rings.style.setProperty('--translateZ', `${acceleration.z * -25}px`);
}`
```

By multiplying the acceleration by `25`, we amplify the small movements of your hand into visible shifts on the screen.

Finally, we update our CSS to include the `translate` property. Notice that we use a slightly longer transition for the translation (`0.7s`) than for the rotation (`0.4s`). This slight mismatch creates a “lag” effect that feels more organic and less mechanical:

```css
.rings {
  position: relative;
  
  /* Applying both motion and rotation */
  translate: 
    var(--translateX, 0px) 
    var(--translateY, 0px) 
    var(--translateZ, 0px);
    
  transform: 
    rotateX(var(--rotateX, 0deg)) 
    rotateY(var(--rotateY, 0deg)) 
    rotateZ(var(--rotateZ, 0deg));
  
  /* Different speeds for different movements create a more fluid feel */
  transition: 
    translate 0.7s ease-out, 
    transform 0.4s ease-out;
}
```

With these additions, our rings now not only tilt and spin with the phone’s movement but also shift position in 3D space, creating a rich, immersive experience that feels alive and responsive.

<CodePen
  link="https://codepen.io/amit_sheen/pen/azNQmvP/f9b047c7b4347d80ac86a1df38758c87"
  title="Animating with Mobile Accelerometers - demo 2"
  :default-tab="['css','result']"
  :theme="dark"/>

::: info

([<VPIcon icon="fa-brands fa-codepen"/>Demo above in a full page preview](https://cdpn.io/pen/debug/azNQmvP/f9b047c7b4347d80ac86a1df38758c87), for mobile.)

:::

---

## The “Wobble” Factor: Tilt vs. Movement

One key distinction to keep in mind is how the experience differs conceptually between devices. On desktop, we are tracking **position**. If you move your mouse to the corner and stop, the rings stay tilted. The effect is absolute.

On mobile, by using the `DeviceMotion`, we are tracking **movement**. If you tilt your phone and hold it still, the rings will float back to the center, because the *speed* of rotation is now zero. The rings only react *while* the device is in motion.

This difference stems naturally from the different ways we interact with a desktop versus a mobile device. Actually, my experience shows that in most cases involving visual interactions, like card angles or parallax control, this “reactionary” behavior actually looks better. Despite the inconsistency with the desktop version, it simply feels more natural in the hand.

However, if your design strictly requires a static behavior where the element locks to the device’s angle (similar to the mouse position), that is not a problem. This is exactly what `DeviceOrientation` is for.

---

## Using Device Orientation for Absolute Angles

Remember earlier when we mentioned `DeviceOrientation` provides the absolute physical orientation? This is the place to use it. First, in our setup and permission checks, we would switch from listening to `devicemotion` to `deviceorientation`.

```js
window.addEventListener('deviceorientation', handleOrientation);
```

Then, inside our handler, the mapping changes:

```js
function handleOrientation(event) {
  rings.style.setProperty('--rotateZ', `${event.alpha}deg`);
  rings.style.setProperty('--rotateX', `${event.beta}deg`);
  rings.style.setProperty('--rotateY', `${event.gamma * -1}deg`);
}`
```

Pay close attention here: the mapping of Alpha, Beta, and Gamma to the X, Y, and Z axes is different in `DeviceOrientation` compared to `DeviceMotion` (WHY?!).

- **Alpha** maps to the Z-axis rotation.
- **Beta** maps to the X-axis rotation.
- **Gamma** maps to the Y-axis rotation (which we again multiply by `-1` to align the movement with the physical world).

Here is a demo using `DeviceOrientation` where we track the absolute angle of the device, creating a behavior that more closely mimics the desktop mouse experience.

<CodePen
  link="https://codepen.io/amit_sheen/pen/zxBGBMz/8996caa8eb595029ece55462fb370460"
  title="Animating with Mobile Accelerometers - demo 3"
  :default-tab="['css','result']"
  :theme="dark"/>

::: info

([<VPIcon icon="fa-brands fa-codepen"/>Demo of the above in a full page preview](https://cdpn.io/pen/debug/zxBGBMz/8996caa8eb595029ece55462fb370460), for mobile.)

:::

If you want the object to start aligned with the screen regardless of how the user is holding their phone, you can capture a `baseOrientation` on the first event. This allows you to calculate the rotation relative to that initial position rather than the absolute world coordinates.

```js
let baseOrientation = null;

function handleMotion(event) {

  if (!baseOrientation) {
    baseOrientation = {
      alpha: event.alpha,
      beta: event.beta,
      gamma: event.gamma,
    };    
  }

  rings.style.setProperty('--rotateZ', `${event.alpha - baseOrientation.alpha}deg`);
  rings.style.setProperty('--rotateX', `${event.beta - baseOrientation.beta}deg`);
  rings.style.setProperty('--rotateY', `${(event.gamma - baseOrientation.gamma) * -1}deg`);
}`
```

If you want to let the user re-center the view, you can easily reset the `baseOrientation` with a simple interaction:

```js
rings.addEventListener('click', () => { baseOrientation = null; });
```

With this approach, you can create a mobile experience that feels both intuitive and consistent with your desktop design, all while leveraging the powerful capabilities of modern smartphones.

<CodePen
  link="https://codepen.io/amit_sheen/pen/ZYOGpQy/fd55aa73bfdc6b21a3ba15d81cbc59a4"
  title="Animating with Mobile Accelerometers - demo 4"
  :default-tab="['css','result']"
  :theme="dark"/>

::: info

[<VPIcon icon="fa-brands fa-codepen"/>Demo above in a full page preview](https://cdpn.io/pen/debug/ZYOGpQy/fd55aa73bfdc6b21a3ba15d81cbc59a4), for mobile. Please note that using absolute values can sometimes feel a bit jittery, so use it with caution.

:::

---

## Going Further: The Cube Portal

Here is an example borrowed from [**my last article**](/frontendmasters.com/the-deep-card-conundrum.md). In this case, the phone’s angles are not only used to rotate the outer cube, but also to determine the inner perspective and its origin:

```css
.card {
  transform:
    rotateX(var(--rotateX, 0deg))
    rotateY(var(--rotateY, 0deg))
    rotateZ(var(--rotateZ, 0deg));
}

.card-content {
  perspective: calc(cos(var(--rotateX, 0)) * cos(var(--rotateY, 0)) * var(--perspective));
  perspective-origin:
    calc(50% - cos(var(--rotateX, 0)) * sin(var(--rotateY, 0)) * var(--perspective))
    calc(50% + sin(var(--rotateX, 0)) * var(--perspective));
}
```

<CodePen
  user="anon"
  slug-hash="WbwYbZd/435ac24aab72287508a9de26f46249a6"
  title="N/A"
  :default-tab="['css','result']"
  :theme="dark"/>

::: info

([<VPIcon icon="fa-brands fa-codepen"/>Demo above in a full page preview](https://cdpn.io/pen/debug/WbwYbZd/435ac24aab72287508a9de26f46249a6), for mobile.)

:::

---

## Final Thoughts: Breaking the Fourth Wall

It is easy to treat mobile screens as static canvases, skipping the rich interactivity we build for desktop simply because the mouse is missing. But the devices in our pockets are powerful, sophisticated tools aware of their physical place in the world. And we can use it.

By tapping into these sensors, we do more than just “fix” a missing hover state. We break the fourth wall. We turn a passive viewing experience into a tactile, physical interaction where the user doesn’t just watch the interface, but *influences* it.

The technology is there. The math is accessible. The only limit is our willingness to experiment. So next time you build a 3D effect or a parallax animation, don’t just disable it for mobile. Ask yourself: “How can I make this move?”

Go ahead, pick up your phone, and start tilting.

---

## Bonus: Bringing the Mobile Feel to Desktop

We spent a lot of time discussing how to adapt mobile behavior to desktop standards, but there are cases where we might want the opposite: to have the desktop experience mimic the dynamic, movement-based nature of the mobile version.

To achieve this, instead of looking at the mouse’s *position*, we look at its *movement*.

If you want to implement this, it is quite straightforward. We simply define a `lastMousePosition` variable and use it to calculate the CSS variables based on the difference between frames:

```js
let lastMousePosition = null;

function initMouseFollow() {
  
  window.addEventListener('mousemove', (e) => {
    rings.style.setProperty('--rotateX', `${(e.clientY - lastMousePosition.y) / window.innerHeight * -720}deg`);
    rings.style.setProperty('--rotateY', `${(e.clientX - lastMousePosition.x) / window.innerWidth * 720}deg`);
    
    lastMousePosition.x = e.clientX;
    lastMousePosition.y = e.clientY;
  });
}`
```

This creates an effect on desktop that responds to the speed and direction of the mouse, rather than its specific location.

<CodePen
  link="https://codepen.io/amit_sheen/pen/KwMpgOQ/744fbe9094f184175e430a01ec0ab4f2"
  title="Animating with Mobile Accelerometers - demo 6"
  :default-tab="['css','result']"
  :theme="dark"/>

::: info

([<VPIcon icon="fa-brands fa-codepen"/>Demo above in a full page preview](https://cdpn.io/pen/debug/KwMpgOQ/744fbe9094f184175e430a01ec0ab4f2), for mobile.)

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Beyond the Mouse: Animating with Mobile Accelerometers",
  "desc": "Mousing over an element and watching it tilt in 3D space is a beautiful and compelling effect. Let's bring it to mobile and use the phone itself rather than a cursor.",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/beyond-the-mouse-animating-with-mobile-accelerometers.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
