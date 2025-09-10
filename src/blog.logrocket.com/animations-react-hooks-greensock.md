---
lang: en-US
title: "Animations using React Hooks and GreenSock"
description: "Article(s) > Animations using React Hooks and GreenSock"
icon: fa-brands fa-react
category:
  - Node.js
  - React.js
  - Article(s)
tag:
  - blog
  - blog.logrocket.com
  - node
  - nodejs
  - node-js
  - react
  - reactjs
  - react-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Animations using React Hooks and GreenSock"
    - property: og:description
      content: "Animations using React Hooks and GreenSock"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/animations-react-hooks-greensock.html
prev: /programming/js-react/articles/README.md
date: 2021-10-13
isOriginal: false
author:
  - name: Paul Ryan
    url : https://blog.logrocket.com/author/paulryan/
cover: /assets/image/blog.logrocket.com/animations-react-hooks-greensock/banner.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "React.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-react/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Animations using React Hooks and GreenSock"
  desc="Learn how to implement powerful animations using React Hooks and GreenSock in this tutorial, which covers basic and advanced concepts."
  url="https://blog.logrocket.com/animations-react-hooks-greensock"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/animations-react-hooks-greensock/banner.png"/>

::: note Editor’s note

This post was updated 13 October 2021 to removed the deprecated TweenMax method of animating and further update the tutorial. We also changed some language to reflect the current way of referencing GSAP.

:::

![Animations using React Hooks and GreenSock](/assets/image/blog.logrocket.com/animations-react-hooks-greensock/banner.png)

Delving into the world of animations on the web can either be a great journey or a tiresome one. My goal is to make it a great journey, while also using the power of React Hooks to further entice your learning experience.

---

## What do I need to know?

This article should not be treated as a primer on JavaScript or React. I will explain each of the concepts we use, but you should have at least a little knowledge of both. You can [<VPIcon icon="fa-brands fa-react"/>check out the React docs](https://reactjs.org/docs/getting-started.html) if you need to get started.

---

## What will we be creating?

We are going to create two separate animations with an increasing level of difficulty. Our first animation will be a simple loader, similar to Google’s:

![Our finished sample animated loader ](/assets/image/blog.logrocket.com/animations-react-hooks-greensock/finished-sample-animated-loader.webp)

Our second will be animating the LogRocket logo to make it even better!

![The LogRocket logo, pre-animation](/assets/image/blog.logrocket.com/animations-react-hooks-greensock/logrocket-logo-1.png)

---

## What is the GreenSock Animating Platform?

The [<VPIcon icon="fas fa-globe"/>GreenSock Animating Platform (GSAP)](https://greensock.com/) is a JavaScript library that allows us to create high-quality, high-performance animations on the web. It contains a toolset that developers can use to create superb animations quickly.

We can use GSAP to create SVG and CSS animations, and we can also use it to create immersive WebGL animations. We can also create Canvas animations using GreenSock. Most popular animation libraries like Three.js use GreenSock to animate their objects. Furthermore, GSAP can be used in other animation software like Adobe Animate and Easel JS.

---

## Animating a Google-style loader

Setting up is quick and easy: I have [<VPIcon icon="iconfont icon-codesandbox"/>created a CodeSandbox](https://codesandbox.io/s/greensock-set-up-forked-zp5de) that has the GreenSock npm module and React, so you can fork it and follow along.

::: sandpack#react philipszdavido / Greensock Set up (forked) [rtl theme=dark]

@file /App.js

```js
import React from "react";

function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}

export default App;
```

:::

Now, let’s start creating our `Loader` component.

### Rendering the loader graphic

The first thing we need for our loader is our graphic, which I have created above. The SVG is a basic one with a little markup.

```xml
<svg viewBox="0 0 150 33.2" width="180" height="150">
  <circle ref={circle} cx="16.1" cy="16.6" r="16.1" fill="#527abd" />
  <circle ref={circle} cx="55.2" cy="16.6" r="16.1" fill="#de4431" />
  <circle ref={circle} cx="94.3" cy="16.6" r="16.1" fill="#f4b61a" />
  <circle ref={circle} cx="133.4" cy="16.6" r="16.1" fill="#009e52" />
</svg>
```

Then, in our source code, we can create a `Loader` component, which is where the magic will happen. Inside the `Loader` component, we want to render our graphic.

```jsx title="loader.jsx"
import React from "react";

const Loader = () => {
  return (
    <svg viewBox="0 0 150 33.2" width="180" height="150">
      <circle cx="16.1" cy="16.6" r="16.1" fill="#527abd" />
      <circle cx="55.2" cy="16.6" r="16.1" fill="#de4431" />
      <circle cx="94.3" cy="16.6" r="16.1" fill="#f4b61a" />
      <circle cx="133.4" cy="16.6" r="16.1" fill="#009e52" />
    </svg>
  );
};

export default Loader;
```

You should now be seeing:

![Our loader, static, in SVG form](/assets/image/blog.logrocket.com/animations-react-hooks-greensock/static-loader-svg.png)

Fantastic! We now have our graphic in place, so let’s go animate it.

---

## Referencing the animated elements

When animating, the first thing you need is a reference to the elements you plan on animating. To get a reference to our elements, we can use the `useRef` Hook. `useRef` returns a ref object that has a `current` property, which is what we’ll target with our animations.

Creating a `useRef` is straightforward:

```js
const myElement = useRef(null) 
```

So, for our case, we have four elements that we need to target. We will create four refs, like so:

```js
const blue = useRef(null);
const red = useRef(null);
const yellow = useRef(null);
const green = useRef(null);
```

We then can add these refs to our SVG:

```xml
<svg viewBox="0 0 150 33.2" width="180" height="150">
  <circle ref={blue} cx="16.1" cy="16.6" r="16.1" fill="#527abd" />
  <circle ref={red} cx="55.2" cy="16.6" r="16.1" fill="#de4431" />
  <circle ref={yellow} cx="94.3" cy="16.6" r="16.1" fill="#f4b61a" />
  <circle ref={green} cx="133.4" cy="16.6" r="16.1" fill="#009e52" />
</svg>
```

Our component now looks like this:

```jsx title="loader.jsx"
import React, { useRef } from "react";

const Loader = () => {
  const blue = useRef(null);
  const red = useRef(null);
  const yellow = useRef(null);
  const green = useRef(null);

  return (
    <svg viewBox="0 0 150 33.2" width="180" height="150">
      <circle ref={blue} cx="16.1" cy="16.6" r="16.1" fill="#527abd" />
      <circle ref={red} cx="55.2" cy="16.6" r="16.1" fill="#de4431" />
      <circle ref={yellow} cx="94.3" cy="16.6" r="16.1" fill="#f4b61a" />
      <circle ref={green} cx="133.4" cy="16.6" r="16.1" fill="#009e52" />
    </svg>
  );
};

export default Loader;
```

With everything in place, we can start using GreenSock.

---

## Bounce animations with GreenSock: Google-style loader

First, we import `gsap`.

```js
import { gsap } from "gsap";
```

`gsap` is a fully-featured module from GreenSock that will aid us in creating our animations. It has many methods, and we will make use of a couple! GreenSock also offers us [<VPIcon icon="fas fa-globe"/>TweenLite](https://greensock.com/tweenlite/), which is a less featured module but is more lightweight.

For our animation, we want it to take place when our component mounts. In the traditional class-based component, we would use `componentDidMount`, but for Hooks we will use `useEffect`, which behaves the same with some small differences. To get a true deep dive into Hooks, you should check out this [**great article**](/blog.logrocket.com/useeffect-react-hook-complete-guide.md).

So when our component mounts, we will use `gsap`’s `fromTo` method to animate our circles. The `fromTo` method is passed four arguments:

```js
fromTo(element(s), duration, start, end)
```

Let’s focus on getting just the `blue` circle to move up and down. To do this we will target the `y` property of our animation.

So our code is as follows:

```js
gsap.fromTo(blue.current, 5, { y: 18 }, { y: -18 });
```

We first target our element, then we set a duration of `5s`. We start from `y` position `18` and finish on `-18`. This looks like the following:

![Our blue circle animation](/assets/image/blog.logrocket.com/animations-react-hooks-greensock/blue-circle-animation-1.webp)

Ok, so we have made a little progress, but it still has some issues — it is far too slow, and we also need the animation to be infinite.

To achieve this, all we need to do is add the `yoyo` and `repeat` properties to our `to` object.

```js
gsap.fromTo(blue.current, 0.5, { y: 18 }, { y: -18, yoyo: true, repeat: -1 });
```

`yoyo` means our animation will yo-yo between the start and finish positions. Setting `repeat` to `-1` will make our animation infinite. We also set our duration to half a second so it will be much faster.

Now, with our new properties in place, we have:

![Our blue circle animation, sped up](/assets/image/blog.logrocket.com/animations-react-hooks-greensock/sped-up-blue-circle-animation.gif)

As you can see from the completed animation at the top of this article, the yellow circle behaves the same as the blue circle. With this in mind, we can pass an array of elements (our `blue` and `yellow` refs) to our `fromTo` method.

```js
gsap.fromTo(
  [blue.current, yellow.current],
  0.5,
  { y: 18 },
  { y: -18, yoyo: true, repeat: -1 }
);
```

So now we have:

![Coordinating the yellow and blue circle animations](/assets/image/blog.logrocket.com/animations-react-hooks-greensock/blue-yellow-circle-animation.webp)

Success! I think you can now start seeing how powerful GreenSock is. To complete our animation, we just need to animate the red and green balls in the opposite way, like so:

```js
gsap.fromTo(
  [red.current, green.current],
  0.5,
  { y: -18 },
  { y: 18, repeat: -1, yoyo: true }
);
```

This code is almost the exact same as our code above except this time, we start on `y:-18` and finish on `y:18`.

Our final animation is now complete, and here’s how it should look:

![Our completed animated loader](/assets/image/blog.logrocket.com/animations-react-hooks-greensock/animated-loader-completed.webp)

You can find the complete code [<VPIcon icon="iconfont icon-codesandbox"/>here](https://codesandbox.io/s/google-style-loader-forked-1ykqg?file=/src/loader.jsx).

::: sandpack#react philipszdavido / Google Style Loader (forked) [rtl theme=dark]

@file /App.js

```js
import React from "react";

import Loader from "./loader";

function App() {
  return (
    <div className="App">
      <Loader />
    </div>
  );
}

export default App;
```

@file /loader.jsx

```jsx
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

const Loader = () => {
  const blue = useRef(null);
  const red = useRef(null);
  const yellow = useRef(null);
  const green = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      [blue.current, yellow.current],
      0.5,
      { y: 18 },
      { y: -18, yoyo: true, repeat: -1 }
    );
    gsap.fromTo(
      [red.current, green.current],
      0.5,
      { y: -18 },
      { y: 18, repeat: -1, yoyo: true }
    );
  }, []);

  return (
    <svg viewBox="0 0 150 33.2" width="180" height="150">
      <circle ref={blue} cx="16.1" cy="16.6" r="16.1" fill="#527abd" />
      <circle ref={red} cx="55.2" cy="16.6" r="16.1" fill="#de4431" />
      <circle ref={yellow} cx="94.3" cy="16.6" r="16.1" fill="#f4b61a" />
      <circle ref={green} cx="133.4" cy="16.6" r="16.1" fill="#009e52" />
    </svg>
  );
};

export default Loader;
```

@setup

```js
{
  dependencies: {
    "gsap": "3.8.0",
  }
}
```

:::

---

## Fill-in animations with GreenSock: LogRocket logo

One animation down, one to go!

I have created an `SVG` for the LogRocket icon, and it is a big one, so I have included it in the starter CodeSandbox, which you can [<VPIcon icon="iconfont icon-codesandbox"/>check out here.](https://codesandbox.io/s/starter-logrocket-animation-forked-pvuhs?file=/src/index.js)

::: sandpack#react philipszdavido / starter logrocket animation (forked) [rtl theme=dark]

@file /App.js

```js
import React from "react";

import LogRocket from "./logrocket";

function App() {
  return (
    <div className="App">
      <LogRocket />
    </div>
  );
}

export default App;
```

@file /logrocket.jsx

```jsx
import React from "react";

const LogRocket = () => {
  return (
    <svg width="200px" height="40px">
      <g
        id="Page-1"
        stroke="none"
        stroke-width="1"
        fill="none"
        fill-rule="evenodd"
      >
        <g id="Group-42">
          <g id="letters" transform="translate(34.000000, 6.000000)">
            <path
              d="M68.3308539,5.02749515 C68.3297154,5.05351456 68.3285769,5.08031068 68.3270588,5.10671845 C67.0044782,5.10671845 65.681518,5.11798058 64.3589374,5.10050485 C63.8875901,5.09429126 63.6879696,5.27992233 63.6894877,5.76419417 C63.6974573,8.44458252 63.6966983,11.1245825 63.6898672,13.8049709 C63.6887287,14.2803107 63.8963188,14.5179806 64.3547628,14.502835 C67.4948008,14.3991456 70.6439469,14.4034175 73.7722201,14.1443883 C75.9847438,13.9610874 77.6128273,12.3707961 77.882277,10.3723495 C77.9911954,9.56574757 77.8682353,8.63759223 77.5707021,7.87953398 C76.8355977,6.00497087 75.1528653,5.47836893 73.392334,5.29623301 C71.7133966,5.12264078 70.0185199,5.11060194 68.3308539,5.02749515 M80.3441366,23.9781748 C79.3312334,23.9781748 78.4830361,24.0255534 77.6450854,23.9506019 C77.3775332,23.9261359 77.0428083,23.6302136 76.9012524,23.367301 C76.0219355,21.7331262 75.196888,20.0678835 74.3357875,18.4232233 C74.050019,17.8775922 73.7350285,17.3436117 73.3843643,16.8399223 C73.2712713,16.6768155 73.0010626,16.5377864 72.8040987,16.5401165 C70.1574194,16.5700194 67.5114991,16.6321553 64.8651992,16.6748738 C63.6929032,16.6939029 63.6906262,16.6822524 63.6894877,17.9179806 C63.6875901,19.6535146 63.6701328,21.3894369 63.6985958,23.1245825 C63.708463,23.7319612 63.5615939,24.0107961 62.9035294,23.991767 C60.8075142,23.9311845 61.1350285,24.2504078 61.1300949,22.1874951 C61.1164326,16.0865243 61.1247818,9.98516505 61.1259203,3.88380583 C61.1259203,2.81895146 61.1278178,2.81778641 62.1809488,2.81778641 C65.2287666,2.81778641 68.2762049,2.79215534 71.3232638,2.82943689 C73.4185199,2.85506796 75.5058065,3.03487379 77.450778,3.93895146 C79.5437571,4.91215534 80.6648197,6.384 80.6932827,8.68302913 C80.7031499,9.46361165 80.6701328,10.256233 80.5452751,11.0243883 C80.2295256,12.9715728 79.0048577,14.2232233 77.3794307,15.1323495 C77.1240228,15.2752621 76.8052372,15.3540971 76.6219355,15.560699 C76.4579886,15.745165 76.2951803,16.1432233 76.3817078,16.3140971 C77.424592,18.3742913 78.5160531,20.4088544 79.5892979,22.4531262 C79.8249715,22.9016699 80.0401518,23.3618641 80.3441366,23.9781748"
              id="Fill-6"
              fill="#7649BD"
            />
            <path
              d="M48.3834156,10.6407379 C47.1158634,10.7013204 46.066907,11.0671456 45.1416698,11.9211262 C44.1572296,12.8306408 44.1393928,14.8158835 45.1519165,15.6877282 C46.8600759,17.1584078 48.7469829,17.1805437 50.7268691,16.4232621 C51.8559013,15.9914175 52.3450854,15.0834563 52.3754459,13.9017087 C52.406186,12.7098641 51.7944213,11.7141359 50.7143454,11.3005437 C49.9621632,11.0127767 49.1621632,10.8558835 48.3834156,10.6407379 M48.2634915,29.3883107 C48.2832258,29.3219029 48.3033397,29.2547184 48.323074,29.1879223 C49.9716509,29.1945243 51.5287666,28.9436505 52.8039089,27.7172427 C53.6608349,26.893165 53.6149146,25.5634563 52.6008729,24.9995728 C52.0331309,24.6834563 51.3944213,24.4294757 50.7598861,24.3250097 C49.1188994,24.0554951 47.4634915,23.8787961 45.8122581,23.6768544 C44.7272486,23.5448155 44.4991651,23.6857864 44.039203,24.7028738 C43.293093,26.3541359 43.6581784,27.9067573 45.0297154,28.4481165 C46.0710816,28.8586019 47.1826565,29.0815146 48.2634915,29.3883107 M42.720038,23.1669515 C42.3234535,22.9079223 41.9921442,22.6966602 41.6665275,22.4772427 C40.5921442,21.7521942 40.2999241,20.9428738 40.5086528,19.6298641 C40.6942315,18.4640388 41.3458444,17.6135534 42.120038,16.8201553 C42.3948008,16.5382136 42.5458444,16.2815146 42.3458444,15.8325825 C41.1188994,13.0787961 42.3503985,10.6776311 45.0179507,9.52306796 C47.5192789,8.44073786 50.063112,8.44578641 52.49537,9.87141748 C52.9006831,10.108699 53.2247818,10.036466 53.663112,9.84850485 C54.6262998,9.43530097 55.6429981,9.14132039 56.6547628,8.86326214 C57.0171917,8.76384466 57.5264896,8.74054369 57.4710816,9.39258252 C57.4209867,9.98093204 57.7659583,10.7619029 56.8012524,10.9634563 C56.1826565,11.0927767 55.5720304,11.2624854 54.9591271,11.4174369 C54.4999241,11.533165 54.3818975,11.7106408 54.6289564,12.219767 C55.1727894,13.3413204 55.153814,14.468699 54.5329412,15.6116117 C53.3340797,17.8189903 51.3902467,18.6248155 49.0817078,18.787534 C47.5014421,18.8989903 45.9708918,18.6939417 44.5287666,17.9595728 C44.353055,17.8698641 44.0335104,17.8558835 43.8877799,17.9619029 C42.8623529,18.7067573 42.9993548,20.379767 44.1837951,20.8170485 C45.1655787,21.1801553 46.2278178,21.3382136 47.2665275,21.5110291 C49.1412903,21.8236505 51.0323719,22.0349126 52.9003036,22.3824854 C53.5864516,22.5102524 54.2623529,22.8384078 54.8767742,23.1945243 C55.6278178,23.6298641 56.0270588,24.3327767 56.068425,25.2636505 C56.1762049,27.6954951 54.8122581,29.1716117 52.9082732,30.1704466 C49.7109298,31.8485049 46.3906262,31.7883107 43.2016319,30.2263689 C41.3557116,29.3219029 40.523074,28.0566602 40.9701328,26.0543301 C41.1412903,25.2865631 41.7344592,24.6135534 42.153814,23.9090874 C42.3006831,23.6620971 42.5018216,23.4488932 42.720038,23.1669515"
              id="Fill-8"
              fill="#7649BD"
            />
            <path
              d="M125.947666,15.6335146 C126.526034,15.1399223 127.12148,14.6649709 127.680114,14.1488544 C129.307818,12.6443883 130.913131,11.1142913 132.548046,9.61798058 C132.789032,9.39700971 133.134763,9.19739806 133.445579,9.17448544 C134.282011,9.11351456 135.126034,9.15351456 136.200797,9.15351456 C133.679355,11.4723495 131.315408,13.6463301 128.894156,15.8727379 C129.453548,16.4909903 129.964744,17.0972039 130.518824,17.6587573 C131.606869,18.7608932 132.647476,19.9302136 133.84482,20.8944854 C134.669867,21.5589515 135.725275,21.924 136.755636,22.4641942 C136.66038,22.7775922 136.562467,23.2471068 136.366262,23.6696311 C136.29112,23.8323495 135.99852,23.9632233 135.795863,23.9787573 C134.258861,24.0940971 132.964364,23.5904078 131.867211,22.4443883 C130.036471,20.532932 128.155636,18.6727379 126.290361,16.796233 C126.187514,16.692932 126.035332,16.6408932 125.782201,16.4921553 C125.748046,16.899534 125.700987,17.2036117 125.699848,17.5080777 C125.692638,19.405165 125.677457,21.3026408 125.70592,23.1989515 C125.715408,23.8113786 125.495294,23.9865243 124.917306,23.9915728 C122.825844,24.0113786 122.826224,24.0296311 122.826224,21.8579806 C122.826224,15.1096311 122.825844,8.36128155 122.826603,1.61254369 C122.826603,0.54807767 122.828501,0.54807767 123.884668,0.546135922 C125.696053,0.543417476 125.696053,0.543417476 125.696053,2.38652427 L125.696053,14.5010874 L125.696053,15.5259417 C125.779924,15.5616699 125.863795,15.5973981 125.947666,15.6335146"
              id="Fill-10"
              fill="#7649BD"
            />
            <path
              d="M87.5303985,16.4591456 C87.3148387,19.8614757 90.1668311,22.1469126 93.5152182,22.1523495 C96.7512713,22.1573981 99.4226186,19.7298252 99.3630361,16.6230291 C99.2992789,13.2937087 96.8229981,11.0389515 93.2939658,10.9399223 C90.2620873,10.8548738 87.2594307,13.2906019 87.5303985,16.4591456 M102.009715,16.3391456 C102.186186,19.9892427 99.7421632,22.555068 96.7118027,23.6506019 C93.3042125,24.8816699 90.0040228,24.5278835 87.1372296,22.1515728 C85.0992789,20.4622524 84.2393169,18.1383689 84.7524099,15.4871068 C85.4009867,12.1340971 87.6044023,10.1100194 90.7061101,9.20205825 C93.474611,8.39118447 96.243112,8.62458252 98.7311575,10.2366214 C100.933814,11.6634175 102.151271,13.7255534 102.009715,16.3391456"
              id="Fill-12"
              fill="#7649BD"
            />
            <path
              d="M146.59556,15.991534 C147.891195,15.991534 149.186452,15.9775534 150.481708,15.9985243 C151.051347,16.0074563 151.270702,15.7822136 151.293093,15.1899806 C151.388349,12.6835728 150.260455,11.2967767 147.751917,10.8991068 C145.219089,10.497165 142.499165,12.6299806 142.212258,15.2105631 C142.14888,15.7791068 142.293852,16.0086214 142.868425,15.9985243 C144.110171,15.976 145.353435,15.991534 146.59556,15.991534 M142.231992,18.0035728 C142.505996,18.6796893 142.686262,19.1857087 142.911309,19.6699806 C143.829715,21.6459029 145.579241,22.1573592 147.471841,22.1266796 C148.882846,22.1033786 150.290057,21.7600777 151.696129,21.5402718 C152.079431,21.4808544 152.452865,21.3538641 152.909791,21.2373592 C153.030854,21.7826019 153.204668,22.248233 153.206565,22.7146408 C153.207324,22.928233 152.904478,23.2692039 152.678672,23.3356117 C151.691195,23.6245437 150.691195,23.904932 149.677154,24.057165 C147.950778,24.3165825 146.2263,24.4346408 144.483226,23.999301 C141.665769,23.2956117 139.711309,21.0765825 139.533321,18.1169709 C139.468805,17.0416311 139.454383,15.9387184 139.610361,14.8781359 C140.089677,11.6163883 143.30296,9.09483495 146.436926,8.8528932 C148.485882,8.69483495 150.44186,8.91308738 152.089298,10.416 C152.955332,11.2059029 153.451347,12.2024078 153.594421,13.2839612 C153.766338,14.577165 153.670702,15.9123107 153.636167,17.2280388 C153.619469,17.8575534 153.11814,17.8653204 152.640721,17.8641553 C149.648311,17.8575534 146.655522,17.8556117 143.663112,17.8668738 C143.225541,17.8684272 142.788349,17.9480388 142.231992,18.0035728"
              id="Fill-14"
              fill="#7649BD"
            />
            <path
              d="M27.6550664,10.9627184 C26.1017457,10.9607767 25.3374194,11.0978641 24.057723,11.9968932 C22.174611,13.321165 21.089222,15.911068 21.9385579,18.1238835 C23.2543074,21.551068 26.1529791,22.5619417 29.1157875,21.9984466 C32.1924478,21.4135922 33.9988994,18.7860194 33.5062998,15.5821359 C33.0896015,12.8706796 30.5332448,10.8625243 27.6550664,10.9627184 M27.7996584,8.84038835 C30.0888425,8.74135922 32.115408,9.38330097 33.8220493,10.8392233 C35.2531689,12.0601942 36.3138899,13.5732039 36.3465275,15.5984466 C36.3598102,16.4337864 36.4114231,17.2978641 36.2372296,18.1025243 C35.6987097,20.5875728 34.030778,22.1937864 31.9078178,23.2718447 C29.4049715,24.5436893 26.7541176,24.6446602 24.1229981,23.7056311 C19.5226186,22.063301 17.5742315,17.3312621 19.9571537,13.0559223 C21.4247059,10.4229126 23.915408,9.08582524 26.9036433,8.8438835 C27.2190133,8.81864078 27.5385579,8.84038835 27.7996584,8.84038835"
              id="Fill-16"
              fill="#7649BD"
            />
            <path
              d="M0.866148008,13.3739417 C0.866148008,10.147534 0.880948767,6.92151456 0.854003795,3.6951068 C0.848690702,3.03064078 1.03920304,2.79763107 1.70827324,2.80267961 C3.59328273,2.81743689 3.59328273,2.78986408 3.59328273,4.74559223 C3.59328273,10.0325825 3.59176471,15.3195728 3.59442125,20.6061748 C3.59518027,21.6900583 3.60314991,21.6951068 4.65817837,21.6958835 C8.10220114,21.6978252 11.5469829,21.7238447 14.9906262,21.6772427 C15.8202277,21.6659806 16.1067552,21.9420971 15.9872106,22.7455922 C15.9674763,22.8780194 15.9697533,23.0182136 15.9864516,23.1514175 C16.065389,23.7929709 15.7940417,23.9999612 15.1712713,23.9918058 C12.9724099,23.9619029 10.7731689,23.9801553 8.5743074,23.9805437 C6.34888046,23.9805437 4.12345351,23.980932 1.89764706,23.9805437 C0.868045541,23.9805437 0.866527514,23.9789903 0.866148008,22.8900583 C0.865768501,19.7180194 0.866148008,16.5459806 0.866148008,13.3739417"
              id="Fill-18"
              fill="#7649BD"
            />
            <path
              d="M117.803112,11.8653204 C116.545806,11.534835 115.398178,11.1328932 114.217913,10.9433786 C110.885844,10.4090097 108.361366,12.6474563 108.369715,16.080466 C108.371233,16.8583301 108.401214,17.6633786 108.590588,18.4101748 C109.240304,20.9721165 111.739355,22.5293981 114.522277,22.1080388 C115.848653,21.9068738 117.155294,21.5701748 118.588311,21.2707573 C118.694573,21.6754175 118.86649,22.176 118.93518,22.6909515 C118.956053,22.8478447 118.72759,23.1387184 118.553017,23.207068 C117.7663,23.5146408 116.974649,23.8517282 116.154156,24.0167767 C114.217913,24.4055146 112.291537,24.4031845 110.352638,23.8478447 C107.632713,23.0692039 105.579583,20.3138641 105.497609,17.416 C105.477495,16.7123107 105.429677,15.9942524 105.537078,15.3053204 C106.08888,11.7530874 109.331006,8.92667961 112.866869,8.83386408 C114.548083,8.78998058 116.190588,8.8983301 117.763643,9.60279612 C118.390968,9.88318447 118.690778,10.1697864 118.264592,10.8618252 C118.043719,11.2206602 117.907097,11.6334757 117.803112,11.8653204"
              id="Fill-20"
              fill="#7649BD"
            />
            <path
              d="M161.027552,6.80730097 C161.056774,7.33778641 161.104972,7.87215534 161.110664,8.40691262 C161.115977,8.97040777 161.39112,9.15565049 161.909526,9.1463301 C162.942543,9.12846602 163.978596,9.18866019 165.008956,9.13040777 C165.863605,9.08186408 165.774042,9.6247767 165.789602,10.1816699 C165.80592,10.7599223 165.768729,11.1863301 165.004402,11.144 C163.974042,11.087301 162.937609,11.1513786 161.904972,11.1230291 C161.379355,11.1086602 161.104592,11.2764272 161.118634,11.8476893 C161.183909,14.4438058 161.183529,17.0430291 161.326983,19.6340971 C161.394156,20.847301 162.35962,21.7420583 163.511803,22.0088544 C163.815787,22.0791456 164.116357,22.1634175 164.380114,22.2313786 C164.416167,22.3575922 164.450323,22.4123495 164.442353,22.4601165 C164.18277,24.0461359 164.182391,24.0461359 162.594535,23.9882718 C160.609336,23.9164272 159.144061,22.7688544 158.768349,20.767301 C158.525844,19.4772039 158.49055,18.1385631 158.448425,16.8185631 C158.396812,15.2201165 158.414269,13.6185631 158.445389,12.0193398 C158.458672,11.3560388 158.240455,11.0810874 157.57518,11.1137087 C157.297761,11.127301 156.781632,10.9781748 156.769488,10.8612816 C156.720152,10.3727379 156.634763,9.62128155 156.899279,9.41118447 C158.123188,8.44031068 159.458292,7.61662136 160.758861,6.74904854 C160.803643,6.71875728 160.905731,6.77856311 161.027552,6.80730097"
              id="Fill-22"
              fill="#7649BD"
            />
          </g>
          <g id="rocket">
            <path
              d="M16.4576471,36.0703301 C15.8910436,37.092466 15.4356357,37.9980971 14.8959772,38.8470291 C14.6625806,39.2147961 14.2997723,39.611301 13.9153321,39.7363495 C13.3236812,39.9293592 13.1635294,39.3056699 12.9244402,38.8951845 C12.4140038,38.019068 11.8933207,37.148 11.3289943,36.1938252 C10.881556,36.5208155 10.4997723,36.836932 10.0842125,37.0947961 C9.40944972,37.5134369 8.94531309,37.266835 8.92254269,36.4579029 C8.89142315,35.348 8.89256167,34.2349903 8.92064516,33.124699 C8.94,32.3623689 9.30053131,32.1262524 10.0310816,32.4109126 C12.0614421,33.2023689 14.1259583,33.4575146 16.2489184,32.8909126 C16.7320304,32.7619806 17.1980645,32.5615922 17.6682732,32.3845049 C18.4504364,32.0901359 18.9437951,32.386835 18.9646679,33.2186796 C18.9908539,34.2753786 19.0060342,35.3347961 18.9487287,36.3887767 C18.9327894,36.6819806 18.7031879,37.100233 18.4640987,37.2066408 C18.2162808,37.3165437 17.796926,37.1907184 17.5259583,37.0342136 C17.1919924,36.8423689 16.9335484,36.5130485 16.4576471,36.0703301"
              id="Fill-24"
              fill="#7649BD"
            />
            <path
              d="M13.9117268,11.2561553 C13.0517647,11.2476117 12.0456926,12.0577087 12.0221632,12.7777087 C11.9990133,13.486835 13.0153321,14.3579029 13.8696015,14.3613981 C14.813814,14.3652816 15.4817457,13.7528544 15.5060342,12.8608155 C15.5325996,11.8903301 14.9128653,11.2662524 13.9117268,11.2561553 M18.0066034,12.6883883 C17.8517647,14.8876117 16.1124858,16.5008155 13.8445541,16.4448932 C12.2073624,16.4048932 10.894649,15.6623689 10.1352562,14.2033398 C9.48060721,12.9450874 9.50641366,11.8037282 10.9485389,10.248 C12.5644782,8.50508738 15.9716888,8.76528155 17.2441746,10.7788738 C17.6031879,11.3458641 17.7580266,12.048 18.0066034,12.6883883"
              id="Fill-26"
              fill="#FEFEFE"
            />
            <path
              d="M18.0066034,12.6881942 C17.7580266,12.0481942 17.6031879,11.3460583 17.2441746,10.7786796 C15.9716888,8.76508738 12.5644782,8.50528155 10.9485389,10.2481942 C9.50641366,11.8039223 9.48060721,12.9448932 10.1352562,14.2031456 C10.894649,15.6621748 12.2073624,16.404699 13.8445541,16.4450874 C16.1124858,16.5006214 17.8517647,14.8874175 18.0066034,12.6881942 M22.8119165,16.546835 C22.8119165,16.7367379 22.8346869,16.9297476 22.8077419,17.1153786 C22.6771917,18.0233398 22.9618216,18.6299417 23.8119165,19.0761553 C24.554611,19.4656699 25.2718786,19.996932 25.8441746,20.6167379 C27.0696015,21.9441165 27.9595446,23.3662524 27.3155218,25.4093592 C26.7747249,27.124699 26.5625806,28.9472233 26.1849715,30.7180971 C25.8555598,32.2621748 24.4282353,32.8058641 23.1709298,31.8606214 C21.8722581,30.884699 20.585351,29.8916893 19.3113472,28.8815922 C18.926907,28.5767379 18.6437951,28.5262524 18.1997723,28.8260583 C15.3109677,30.7759612 12.4145731,30.7763495 9.51666034,28.8004272 C9.32500949,28.6695534 8.88629981,28.6800388 8.69920304,28.8182913 C7.49958254,29.7029515 6.3656167,30.6819806 5.15195446,31.5441165 C4.65783681,31.8947961 4.02975332,32.1782913 3.44151803,32.2283883 C2.67946869,32.2932427 2.1026186,31.8621748 1.89426945,31.0089709 C1.44759013,29.1763495 0.966375712,27.3530485 0.493889943,25.5274175 C-0.116356736,23.1670291 0.809639469,21.3872233 2.71666034,20.0314951 C3.39028463,19.5530485 4.08516129,19.0963495 4.69996205,18.5472233 C4.90489564,18.3643107 4.96903226,17.9227573 4.96296015,17.6015922 C4.91817837,15.2485825 5.19218216,12.9340194 5.98724858,10.7316893 C7.26694497,7.1872233 9.25024668,4.08236893 11.8980645,1.43537864 C12.066186,1.268 12.2821252,1.1511068 12.4714991,1.00469903 C14.0149526,-0.189087379 14.0005313,-0.172776699 15.4373435,1.10023301 C17.0308918,2.51227184 18.3136243,4.17130097 19.4456926,5.98683495 C21.1014801,8.64275728 22.3037571,11.459068 22.6866793,14.6054757 C22.7648577,15.2481942 22.7944592,15.8975146 22.8460721,16.5437282 C22.8346869,16.5448932 22.8233017,16.5456699 22.8119165,16.546835"
              id="Fill-4"
              fill="#7649BD"
            />
            <path
              d="M13.9117268,11.2561553 C14.9128653,11.2662524 15.5325996,11.8903301 15.5060342,12.8608155 C15.4817457,13.7528544 14.813814,14.3652816 13.8696015,14.3613981 C13.0153321,14.3579029 11.9990133,13.486835 12.0221632,12.7777087 C12.0456926,12.0577087 13.0517647,11.2476117 13.9117268,11.2561553"
              id="Fill-40"
              fill="#7649BD"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

export default LogRocket;
```

@setup

```js
{
  dependencies: {
    "gsap": "3.8.0",
  }
}
```

:::

The final animation will look like this:

![The goal animation for our LogRocket logo example](/assets/image/blog.logrocket.com/animations-react-hooks-greensock/logrocket-animation-goal.webp)

As you can see from above, there is more to this than our first animation, so let’s get cracking!

The first part we are going to focus on is the rocket, which animates upward from the bottom. We have a `g` element with the `id` of `rocket`. This is the element we are going to target with GreenSock.

### Sequential animation with `TimelineMax`

Previously, we would have used `gsap` to do this, but now we will use `TimelineMax` because we want each of our elements to animate sequentially, not all at once.

We import `TimelineMax` like so:

```js
import { TimelineMax } from "gsap";
```

We first need to create a `Timeline`, and we do this by creating an instance of the `TimelineMax` class:

```js
const tl = new TimelineMax();
```

Similarly to `TweenMax`, our instance (`tl`) also has a `fromTo` method that we will use:

```js
tl.fromTo("#rocket", 2, { y: 50 }, { y: 0 });
```

This is very similar to our first animation except here, instead of using a `ref`, we are just passing the ID — either way is fine.

Now our rocket should be coming up from the bottom like so:

![Isolated rocket animation](/assets/image/blog.logrocket.com/animations-react-hooks-greensock/rocket-animation-1.gif)

The next part is to `draw` our letters. All of our letter `path`s are wrapped in a `g` tag with the `id` `letters`, so they are easy for us to target.

To get the drawing effect, we need to use a couple of `attributes`, which are `stroke-dasharray` and `stroke-dashoffset`. These are quite complicated, and to read in more detail, I recommend [<VPIcon icon="fa-brands fa-firefox"/>heading here](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dashoffset).

### What is `stroke-dasharray`

`stroke-dasharray` is both an SVG and a CSS property used to render a line with a dashed pattern. It is used to specify the lengths of the dashes and gaps in a line. `stroke-dasharray` is used in SVG elements like `circle` and `line`.

Example:

```xml
<circle
  cx="50"
  cy="50"
  r="40"
  stroke="black"
  stroke-width="3"
  fill="transparent"
  stroke-dasharray="1, 3"
/>
```

This will stroke the shape of the circle with a dashed line. The first number is the length of the dash, and the second number is the length of the gap.

### What is `stroke-dashoffset`?

`stroke-dashoffset` is used to specify the distance into the dash pattern to start the dash. It is used in combination with `stroke-dasharray` to create a dashed line.

Example:

```xml
<circle
  cx="50"
  cy="50"
  r="40"
  stroke="black"
  stroke-width="3"
  fill="transparent"
  stroke-dasharray="1, 3"
  stroke-dashoffset="1"
/>
```

This will gives the stroke pattern a length of `1`.

For our case, we use these properties to break our paths into little pieces so we can animate them back together, which is what gives us our drawing effect. My rule of thumb here is setting the value of the two attributes to be the same, and once our text disappears, we are good to go. `100` is the value we will go with.

In our <VPIcon icon="fa-brands fa-css3-alt"/>`styles.css` file, we will set these two properties on our paths. As a side note, a `stroke` must be present on the `path` for this to work (this includes a `path` inheriting a `stroke` from a parent).

```css title="styles.css"
svg #letters path {
  stroke-dasharray: 100;
  stroke-dashoffset: 100;
}
```

So now you are seeing the following:

![The LogRocket wordmark without the stroke](/assets/image/blog.logrocket.com/animations-react-hooks-greensock/logrocket-wordmark-no-stroke.png)

This is the same as what we had, but the letters are not as thick — that is because we have removed the `stroke`, but it still has a `fill`. The next step is setting the `fill-opacity` to `0`.

```css title="styles.css"
svg #letters path {
  stroke-dasharray: 100;
  stroke-dashoffset: 100;
  fill-opacity: 0;
}
```

With this in place, our letters have disappeared, so now we focus on getting them back.  
All we need to do is animate our `strokeDashoffset` back to `0`. We will use our `tl` instance and the `to` method.

```js
tl.to("#letters path", 3, {
  strokeDashoffset: 0
});
```

As you can see, we use our `letters` selector and then target each `path` within that group. With that in place, our letters should now start drawing:

![The LogRocket logo's letter paths are drawn](/assets/image/blog.logrocket.com/animations-react-hooks-greensock/animated-logrocket-logo-letter-paths.webp)

The final piece of the puzzle is to animate our `fill-opacity` to `1`. Once more, we use our `tl` instance and the `to` method.

```js
tl.to("#letters path", 3, { "fill-opacity": 1 });
```

And that’s that! Our LogRocket animation is now complete — not too bad, eh?

![The goal animation for our LogRocket logo example](/assets/image/blog.logrocket.com/animations-react-hooks-greensock/logrocket-animation-goal.webp)

You can see the power of `TimelineMax` here. Normally, to run animations sequentially, you would have to use delays, but `TimelineMax` takes care of this for us.

The [<VPIcon icon="fas fa-globe"/>complete CodeSandbox](https://ozon2.csb.app/) can be found below.

::: sandpack#react philipszdavido / complete logrocket animation (forked) [rtl theme=dark]

@file /App.js

```js
import React from "react";

import LogRocket from "./logrocket";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <LogRocket />
    </div>
  );
}

export default App;
```

@file /logrocket.jsx

```jsx
import React, { useEffect } from "react";
import { TimelineMax } from "gsap";

const LogRocket = () => {
  useEffect(() => {
    const tl = new TimelineMax();
    tl.fromTo("#rocket", 2, { y: 50 }, { y: 0 });
    tl.to("#letters path", 3, {
      strokeDashoffset: 0
    });
    tl.to("#letters path", 3, { "fill-opacity": 1 });
  }, []);

  return (
    <svg viewBox="0 0 200 40" width="400px" height="80px">
      <g
        id="Page-1"
        stroke="none"
        stroke-width="1"
        fill="none"
        fill-rule="evenodd"
      >
        <g id="Group-42">
          <g
            stroke="#7649bd"
            id="letters"
            transform="translate(34.000000, 6.000000)"
          >
            <path
              d="M68.3308539,5.02749515 C68.3297154,5.05351456 68.3285769,5.08031068 68.3270588,5.10671845 C67.0044782,5.10671845 65.681518,5.11798058 64.3589374,5.10050485 C63.8875901,5.09429126 63.6879696,5.27992233 63.6894877,5.76419417 C63.6974573,8.44458252 63.6966983,11.1245825 63.6898672,13.8049709 C63.6887287,14.2803107 63.8963188,14.5179806 64.3547628,14.502835 C67.4948008,14.3991456 70.6439469,14.4034175 73.7722201,14.1443883 C75.9847438,13.9610874 77.6128273,12.3707961 77.882277,10.3723495 C77.9911954,9.56574757 77.8682353,8.63759223 77.5707021,7.87953398 C76.8355977,6.00497087 75.1528653,5.47836893 73.392334,5.29623301 C71.7133966,5.12264078 70.0185199,5.11060194 68.3308539,5.02749515 M80.3441366,23.9781748 C79.3312334,23.9781748 78.4830361,24.0255534 77.6450854,23.9506019 C77.3775332,23.9261359 77.0428083,23.6302136 76.9012524,23.367301 C76.0219355,21.7331262 75.196888,20.0678835 74.3357875,18.4232233 C74.050019,17.8775922 73.7350285,17.3436117 73.3843643,16.8399223 C73.2712713,16.6768155 73.0010626,16.5377864 72.8040987,16.5401165 C70.1574194,16.5700194 67.5114991,16.6321553 64.8651992,16.6748738 C63.6929032,16.6939029 63.6906262,16.6822524 63.6894877,17.9179806 C63.6875901,19.6535146 63.6701328,21.3894369 63.6985958,23.1245825 C63.708463,23.7319612 63.5615939,24.0107961 62.9035294,23.991767 C60.8075142,23.9311845 61.1350285,24.2504078 61.1300949,22.1874951 C61.1164326,16.0865243 61.1247818,9.98516505 61.1259203,3.88380583 C61.1259203,2.81895146 61.1278178,2.81778641 62.1809488,2.81778641 C65.2287666,2.81778641 68.2762049,2.79215534 71.3232638,2.82943689 C73.4185199,2.85506796 75.5058065,3.03487379 77.450778,3.93895146 C79.5437571,4.91215534 80.6648197,6.384 80.6932827,8.68302913 C80.7031499,9.46361165 80.6701328,10.256233 80.5452751,11.0243883 C80.2295256,12.9715728 79.0048577,14.2232233 77.3794307,15.1323495 C77.1240228,15.2752621 76.8052372,15.3540971 76.6219355,15.560699 C76.4579886,15.745165 76.2951803,16.1432233 76.3817078,16.3140971 C77.424592,18.3742913 78.5160531,20.4088544 79.5892979,22.4531262 C79.8249715,22.9016699 80.0401518,23.3618641 80.3441366,23.9781748"
              id="Fill-6"
              fill="#7649BD"
            />
            <path
              d="M48.3834156,10.6407379 C47.1158634,10.7013204 46.066907,11.0671456 45.1416698,11.9211262 C44.1572296,12.8306408 44.1393928,14.8158835 45.1519165,15.6877282 C46.8600759,17.1584078 48.7469829,17.1805437 50.7268691,16.4232621 C51.8559013,15.9914175 52.3450854,15.0834563 52.3754459,13.9017087 C52.406186,12.7098641 51.7944213,11.7141359 50.7143454,11.3005437 C49.9621632,11.0127767 49.1621632,10.8558835 48.3834156,10.6407379 M48.2634915,29.3883107 C48.2832258,29.3219029 48.3033397,29.2547184 48.323074,29.1879223 C49.9716509,29.1945243 51.5287666,28.9436505 52.8039089,27.7172427 C53.6608349,26.893165 53.6149146,25.5634563 52.6008729,24.9995728 C52.0331309,24.6834563 51.3944213,24.4294757 50.7598861,24.3250097 C49.1188994,24.0554951 47.4634915,23.8787961 45.8122581,23.6768544 C44.7272486,23.5448155 44.4991651,23.6857864 44.039203,24.7028738 C43.293093,26.3541359 43.6581784,27.9067573 45.0297154,28.4481165 C46.0710816,28.8586019 47.1826565,29.0815146 48.2634915,29.3883107 M42.720038,23.1669515 C42.3234535,22.9079223 41.9921442,22.6966602 41.6665275,22.4772427 C40.5921442,21.7521942 40.2999241,20.9428738 40.5086528,19.6298641 C40.6942315,18.4640388 41.3458444,17.6135534 42.120038,16.8201553 C42.3948008,16.5382136 42.5458444,16.2815146 42.3458444,15.8325825 C41.1188994,13.0787961 42.3503985,10.6776311 45.0179507,9.52306796 C47.5192789,8.44073786 50.063112,8.44578641 52.49537,9.87141748 C52.9006831,10.108699 53.2247818,10.036466 53.663112,9.84850485 C54.6262998,9.43530097 55.6429981,9.14132039 56.6547628,8.86326214 C57.0171917,8.76384466 57.5264896,8.74054369 57.4710816,9.39258252 C57.4209867,9.98093204 57.7659583,10.7619029 56.8012524,10.9634563 C56.1826565,11.0927767 55.5720304,11.2624854 54.9591271,11.4174369 C54.4999241,11.533165 54.3818975,11.7106408 54.6289564,12.219767 C55.1727894,13.3413204 55.153814,14.468699 54.5329412,15.6116117 C53.3340797,17.8189903 51.3902467,18.6248155 49.0817078,18.787534 C47.5014421,18.8989903 45.9708918,18.6939417 44.5287666,17.9595728 C44.353055,17.8698641 44.0335104,17.8558835 43.8877799,17.9619029 C42.8623529,18.7067573 42.9993548,20.379767 44.1837951,20.8170485 C45.1655787,21.1801553 46.2278178,21.3382136 47.2665275,21.5110291 C49.1412903,21.8236505 51.0323719,22.0349126 52.9003036,22.3824854 C53.5864516,22.5102524 54.2623529,22.8384078 54.8767742,23.1945243 C55.6278178,23.6298641 56.0270588,24.3327767 56.068425,25.2636505 C56.1762049,27.6954951 54.8122581,29.1716117 52.9082732,30.1704466 C49.7109298,31.8485049 46.3906262,31.7883107 43.2016319,30.2263689 C41.3557116,29.3219029 40.523074,28.0566602 40.9701328,26.0543301 C41.1412903,25.2865631 41.7344592,24.6135534 42.153814,23.9090874 C42.3006831,23.6620971 42.5018216,23.4488932 42.720038,23.1669515"
              id="Fill-8"
              fill="#7649BD"
            />
            <path
              d="M125.947666,15.6335146 C126.526034,15.1399223 127.12148,14.6649709 127.680114,14.1488544 C129.307818,12.6443883 130.913131,11.1142913 132.548046,9.61798058 C132.789032,9.39700971 133.134763,9.19739806 133.445579,9.17448544 C134.282011,9.11351456 135.126034,9.15351456 136.200797,9.15351456 C133.679355,11.4723495 131.315408,13.6463301 128.894156,15.8727379 C129.453548,16.4909903 129.964744,17.0972039 130.518824,17.6587573 C131.606869,18.7608932 132.647476,19.9302136 133.84482,20.8944854 C134.669867,21.5589515 135.725275,21.924 136.755636,22.4641942 C136.66038,22.7775922 136.562467,23.2471068 136.366262,23.6696311 C136.29112,23.8323495 135.99852,23.9632233 135.795863,23.9787573 C134.258861,24.0940971 132.964364,23.5904078 131.867211,22.4443883 C130.036471,20.532932 128.155636,18.6727379 126.290361,16.796233 C126.187514,16.692932 126.035332,16.6408932 125.782201,16.4921553 C125.748046,16.899534 125.700987,17.2036117 125.699848,17.5080777 C125.692638,19.405165 125.677457,21.3026408 125.70592,23.1989515 C125.715408,23.8113786 125.495294,23.9865243 124.917306,23.9915728 C122.825844,24.0113786 122.826224,24.0296311 122.826224,21.8579806 C122.826224,15.1096311 122.825844,8.36128155 122.826603,1.61254369 C122.826603,0.54807767 122.828501,0.54807767 123.884668,0.546135922 C125.696053,0.543417476 125.696053,0.543417476 125.696053,2.38652427 L125.696053,14.5010874 L125.696053,15.5259417 C125.779924,15.5616699 125.863795,15.5973981 125.947666,15.6335146"
              id="Fill-10"
              fill="#7649BD"
            />
            <path
              d="M87.5303985,16.4591456 C87.3148387,19.8614757 90.1668311,22.1469126 93.5152182,22.1523495 C96.7512713,22.1573981 99.4226186,19.7298252 99.3630361,16.6230291 C99.2992789,13.2937087 96.8229981,11.0389515 93.2939658,10.9399223 C90.2620873,10.8548738 87.2594307,13.2906019 87.5303985,16.4591456 M102.009715,16.3391456 C102.186186,19.9892427 99.7421632,22.555068 96.7118027,23.6506019 C93.3042125,24.8816699 90.0040228,24.5278835 87.1372296,22.1515728 C85.0992789,20.4622524 84.2393169,18.1383689 84.7524099,15.4871068 C85.4009867,12.1340971 87.6044023,10.1100194 90.7061101,9.20205825 C93.474611,8.39118447 96.243112,8.62458252 98.7311575,10.2366214 C100.933814,11.6634175 102.151271,13.7255534 102.009715,16.3391456"
              id="Fill-12"
              fill="#7649BD"
            />
            <path
              d="M146.59556,15.991534 C147.891195,15.991534 149.186452,15.9775534 150.481708,15.9985243 C151.051347,16.0074563 151.270702,15.7822136 151.293093,15.1899806 C151.388349,12.6835728 150.260455,11.2967767 147.751917,10.8991068 C145.219089,10.497165 142.499165,12.6299806 142.212258,15.2105631 C142.14888,15.7791068 142.293852,16.0086214 142.868425,15.9985243 C144.110171,15.976 145.353435,15.991534 146.59556,15.991534 M142.231992,18.0035728 C142.505996,18.6796893 142.686262,19.1857087 142.911309,19.6699806 C143.829715,21.6459029 145.579241,22.1573592 147.471841,22.1266796 C148.882846,22.1033786 150.290057,21.7600777 151.696129,21.5402718 C152.079431,21.4808544 152.452865,21.3538641 152.909791,21.2373592 C153.030854,21.7826019 153.204668,22.248233 153.206565,22.7146408 C153.207324,22.928233 152.904478,23.2692039 152.678672,23.3356117 C151.691195,23.6245437 150.691195,23.904932 149.677154,24.057165 C147.950778,24.3165825 146.2263,24.4346408 144.483226,23.999301 C141.665769,23.2956117 139.711309,21.0765825 139.533321,18.1169709 C139.468805,17.0416311 139.454383,15.9387184 139.610361,14.8781359 C140.089677,11.6163883 143.30296,9.09483495 146.436926,8.8528932 C148.485882,8.69483495 150.44186,8.91308738 152.089298,10.416 C152.955332,11.2059029 153.451347,12.2024078 153.594421,13.2839612 C153.766338,14.577165 153.670702,15.9123107 153.636167,17.2280388 C153.619469,17.8575534 153.11814,17.8653204 152.640721,17.8641553 C149.648311,17.8575534 146.655522,17.8556117 143.663112,17.8668738 C143.225541,17.8684272 142.788349,17.9480388 142.231992,18.0035728"
              id="Fill-14"
              fill="#7649BD"
            />
            <path
              d="M27.6550664,10.9627184 C26.1017457,10.9607767 25.3374194,11.0978641 24.057723,11.9968932 C22.174611,13.321165 21.089222,15.911068 21.9385579,18.1238835 C23.2543074,21.551068 26.1529791,22.5619417 29.1157875,21.9984466 C32.1924478,21.4135922 33.9988994,18.7860194 33.5062998,15.5821359 C33.0896015,12.8706796 30.5332448,10.8625243 27.6550664,10.9627184 M27.7996584,8.84038835 C30.0888425,8.74135922 32.115408,9.38330097 33.8220493,10.8392233 C35.2531689,12.0601942 36.3138899,13.5732039 36.3465275,15.5984466 C36.3598102,16.4337864 36.4114231,17.2978641 36.2372296,18.1025243 C35.6987097,20.5875728 34.030778,22.1937864 31.9078178,23.2718447 C29.4049715,24.5436893 26.7541176,24.6446602 24.1229981,23.7056311 C19.5226186,22.063301 17.5742315,17.3312621 19.9571537,13.0559223 C21.4247059,10.4229126 23.915408,9.08582524 26.9036433,8.8438835 C27.2190133,8.81864078 27.5385579,8.84038835 27.7996584,8.84038835"
              id="Fill-16"
              fill="#7649BD"
            />
            <path
              d="M0.866148008,13.3739417 C0.866148008,10.147534 0.880948767,6.92151456 0.854003795,3.6951068 C0.848690702,3.03064078 1.03920304,2.79763107 1.70827324,2.80267961 C3.59328273,2.81743689 3.59328273,2.78986408 3.59328273,4.74559223 C3.59328273,10.0325825 3.59176471,15.3195728 3.59442125,20.6061748 C3.59518027,21.6900583 3.60314991,21.6951068 4.65817837,21.6958835 C8.10220114,21.6978252 11.5469829,21.7238447 14.9906262,21.6772427 C15.8202277,21.6659806 16.1067552,21.9420971 15.9872106,22.7455922 C15.9674763,22.8780194 15.9697533,23.0182136 15.9864516,23.1514175 C16.065389,23.7929709 15.7940417,23.9999612 15.1712713,23.9918058 C12.9724099,23.9619029 10.7731689,23.9801553 8.5743074,23.9805437 C6.34888046,23.9805437 4.12345351,23.980932 1.89764706,23.9805437 C0.868045541,23.9805437 0.866527514,23.9789903 0.866148008,22.8900583 C0.865768501,19.7180194 0.866148008,16.5459806 0.866148008,13.3739417"
              id="Fill-18"
              fill="#7649BD"
            />
            <path
              d="M117.803112,11.8653204 C116.545806,11.534835 115.398178,11.1328932 114.217913,10.9433786 C110.885844,10.4090097 108.361366,12.6474563 108.369715,16.080466 C108.371233,16.8583301 108.401214,17.6633786 108.590588,18.4101748 C109.240304,20.9721165 111.739355,22.5293981 114.522277,22.1080388 C115.848653,21.9068738 117.155294,21.5701748 118.588311,21.2707573 C118.694573,21.6754175 118.86649,22.176 118.93518,22.6909515 C118.956053,22.8478447 118.72759,23.1387184 118.553017,23.207068 C117.7663,23.5146408 116.974649,23.8517282 116.154156,24.0167767 C114.217913,24.4055146 112.291537,24.4031845 110.352638,23.8478447 C107.632713,23.0692039 105.579583,20.3138641 105.497609,17.416 C105.477495,16.7123107 105.429677,15.9942524 105.537078,15.3053204 C106.08888,11.7530874 109.331006,8.92667961 112.866869,8.83386408 C114.548083,8.78998058 116.190588,8.8983301 117.763643,9.60279612 C118.390968,9.88318447 118.690778,10.1697864 118.264592,10.8618252 C118.043719,11.2206602 117.907097,11.6334757 117.803112,11.8653204"
              id="Fill-20"
              fill="#7649BD"
            />
            <path
              d="M161.027552,6.80730097 C161.056774,7.33778641 161.104972,7.87215534 161.110664,8.40691262 C161.115977,8.97040777 161.39112,9.15565049 161.909526,9.1463301 C162.942543,9.12846602 163.978596,9.18866019 165.008956,9.13040777 C165.863605,9.08186408 165.774042,9.6247767 165.789602,10.1816699 C165.80592,10.7599223 165.768729,11.1863301 165.004402,11.144 C163.974042,11.087301 162.937609,11.1513786 161.904972,11.1230291 C161.379355,11.1086602 161.104592,11.2764272 161.118634,11.8476893 C161.183909,14.4438058 161.183529,17.0430291 161.326983,19.6340971 C161.394156,20.847301 162.35962,21.7420583 163.511803,22.0088544 C163.815787,22.0791456 164.116357,22.1634175 164.380114,22.2313786 C164.416167,22.3575922 164.450323,22.4123495 164.442353,22.4601165 C164.18277,24.0461359 164.182391,24.0461359 162.594535,23.9882718 C160.609336,23.9164272 159.144061,22.7688544 158.768349,20.767301 C158.525844,19.4772039 158.49055,18.1385631 158.448425,16.8185631 C158.396812,15.2201165 158.414269,13.6185631 158.445389,12.0193398 C158.458672,11.3560388 158.240455,11.0810874 157.57518,11.1137087 C157.297761,11.127301 156.781632,10.9781748 156.769488,10.8612816 C156.720152,10.3727379 156.634763,9.62128155 156.899279,9.41118447 C158.123188,8.44031068 159.458292,7.61662136 160.758861,6.74904854 C160.803643,6.71875728 160.905731,6.77856311 161.027552,6.80730097"
              id="Fill-22"
              fill="#7649BD"
            />
          </g>
          <g id="rocket">
            <path
              d="M16.4576471,36.0703301 C15.8910436,37.092466 15.4356357,37.9980971 14.8959772,38.8470291 C14.6625806,39.2147961 14.2997723,39.611301 13.9153321,39.7363495 C13.3236812,39.9293592 13.1635294,39.3056699 12.9244402,38.8951845 C12.4140038,38.019068 11.8933207,37.148 11.3289943,36.1938252 C10.881556,36.5208155 10.4997723,36.836932 10.0842125,37.0947961 C9.40944972,37.5134369 8.94531309,37.266835 8.92254269,36.4579029 C8.89142315,35.348 8.89256167,34.2349903 8.92064516,33.124699 C8.94,32.3623689 9.30053131,32.1262524 10.0310816,32.4109126 C12.0614421,33.2023689 14.1259583,33.4575146 16.2489184,32.8909126 C16.7320304,32.7619806 17.1980645,32.5615922 17.6682732,32.3845049 C18.4504364,32.0901359 18.9437951,32.386835 18.9646679,33.2186796 C18.9908539,34.2753786 19.0060342,35.3347961 18.9487287,36.3887767 C18.9327894,36.6819806 18.7031879,37.100233 18.4640987,37.2066408 C18.2162808,37.3165437 17.796926,37.1907184 17.5259583,37.0342136 C17.1919924,36.8423689 16.9335484,36.5130485 16.4576471,36.0703301"
              id="Fill-24"
              fill="#7649BD"
            />
            <path
              d="M13.9117268,11.2561553 C13.0517647,11.2476117 12.0456926,12.0577087 12.0221632,12.7777087 C11.9990133,13.486835 13.0153321,14.3579029 13.8696015,14.3613981 C14.813814,14.3652816 15.4817457,13.7528544 15.5060342,12.8608155 C15.5325996,11.8903301 14.9128653,11.2662524 13.9117268,11.2561553 M18.0066034,12.6883883 C17.8517647,14.8876117 16.1124858,16.5008155 13.8445541,16.4448932 C12.2073624,16.4048932 10.894649,15.6623689 10.1352562,14.2033398 C9.48060721,12.9450874 9.50641366,11.8037282 10.9485389,10.248 C12.5644782,8.50508738 15.9716888,8.76528155 17.2441746,10.7788738 C17.6031879,11.3458641 17.7580266,12.048 18.0066034,12.6883883"
              id="Fill-26"
              fill="#FEFEFE"
            />
            <path
              d="M18.0066034,12.6881942 C17.7580266,12.0481942 17.6031879,11.3460583 17.2441746,10.7786796 C15.9716888,8.76508738 12.5644782,8.50528155 10.9485389,10.2481942 C9.50641366,11.8039223 9.48060721,12.9448932 10.1352562,14.2031456 C10.894649,15.6621748 12.2073624,16.404699 13.8445541,16.4450874 C16.1124858,16.5006214 17.8517647,14.8874175 18.0066034,12.6881942 M22.8119165,16.546835 C22.8119165,16.7367379 22.8346869,16.9297476 22.8077419,17.1153786 C22.6771917,18.0233398 22.9618216,18.6299417 23.8119165,19.0761553 C24.554611,19.4656699 25.2718786,19.996932 25.8441746,20.6167379 C27.0696015,21.9441165 27.9595446,23.3662524 27.3155218,25.4093592 C26.7747249,27.124699 26.5625806,28.9472233 26.1849715,30.7180971 C25.8555598,32.2621748 24.4282353,32.8058641 23.1709298,31.8606214 C21.8722581,30.884699 20.585351,29.8916893 19.3113472,28.8815922 C18.926907,28.5767379 18.6437951,28.5262524 18.1997723,28.8260583 C15.3109677,30.7759612 12.4145731,30.7763495 9.51666034,28.8004272 C9.32500949,28.6695534 8.88629981,28.6800388 8.69920304,28.8182913 C7.49958254,29.7029515 6.3656167,30.6819806 5.15195446,31.5441165 C4.65783681,31.8947961 4.02975332,32.1782913 3.44151803,32.2283883 C2.67946869,32.2932427 2.1026186,31.8621748 1.89426945,31.0089709 C1.44759013,29.1763495 0.966375712,27.3530485 0.493889943,25.5274175 C-0.116356736,23.1670291 0.809639469,21.3872233 2.71666034,20.0314951 C3.39028463,19.5530485 4.08516129,19.0963495 4.69996205,18.5472233 C4.90489564,18.3643107 4.96903226,17.9227573 4.96296015,17.6015922 C4.91817837,15.2485825 5.19218216,12.9340194 5.98724858,10.7316893 C7.26694497,7.1872233 9.25024668,4.08236893 11.8980645,1.43537864 C12.066186,1.268 12.2821252,1.1511068 12.4714991,1.00469903 C14.0149526,-0.189087379 14.0005313,-0.172776699 15.4373435,1.10023301 C17.0308918,2.51227184 18.3136243,4.17130097 19.4456926,5.98683495 C21.1014801,8.64275728 22.3037571,11.459068 22.6866793,14.6054757 C22.7648577,15.2481942 22.7944592,15.8975146 22.8460721,16.5437282 C22.8346869,16.5448932 22.8233017,16.5456699 22.8119165,16.546835"
              id="Fill-4"
              fill="#7649BD"
            />
            <path
              d="M13.9117268,11.2561553 C14.9128653,11.2662524 15.5325996,11.8903301 15.5060342,12.8608155 C15.4817457,13.7528544 14.813814,14.3652816 13.8696015,14.3613981 C13.0153321,14.3579029 11.9990133,13.486835 12.0221632,12.7777087 C12.0456926,12.0577087 13.0517647,11.2476117 13.9117268,11.2561553"
              id="Fill-40"
              fill="#7649BD"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

export default LogRocket;
```

@file /styles.css

```css
.App {
  font-family: sans-serif;
  text-align: center;
}
svg {
  margin-top: 50px;
}
svg #letters path {
  stroke-dasharray: 100;
  stroke-dashoffset: 100;
  fill-opacity: 0;
}
```

@setup

```js
{
  dependencies: {
    "gsap": "3.8.0",
  }
}
```

:::

---

## Conclusion

So that’s all, folks. This was definitely more of an introduction to GreenSock than it was to React Hooks, but I hope you learned something about both. The guys at GreenSock have put in a massive amount of work for their library, so be sure to go even further with it to create great animations.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Animations using React Hooks and GreenSock",
  "desc": "Learn how to implement powerful animations using React Hooks and GreenSock in this tutorial, which covers basic and advanced concepts.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/animations-react-hooks-greensock.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
