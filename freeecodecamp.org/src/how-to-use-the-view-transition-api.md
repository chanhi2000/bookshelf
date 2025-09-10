---
lang: en-US
title: "How to Use the View Transition API for Better Web Transitions"
description: "Article(s) > How to Use the View Transition API for Better Web Transitions"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - JavaScript
  - Node.js
  - React.js
  - Next.js
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - css
  - js
  - javascript
  - node
  - nodejs
  - node-js
  - react
  - reactjs
  - react-js
  - next
  - nextjs
  - next-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Use the View Transition API for Better Web Transitions"
    - property: og:description
      content: "How to Use the View Transition API for Better Web Transitions"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-the-view-transition-api.html
prev: /programming/css/articles/README.md
date: 2025-07-02
isOriginal: false
author:
  - name: Sumit Saha
    url : https://freecodecamp.org/news/author/sumitsaha/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1751324398272/d2f05e29-6925-43da-8c41-14b1c18a4898.png
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
  "title": "React.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-react/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Next.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-next/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Use the View Transition API for Better Web Transitions"
  desc="If you want to add some amazing and visually appealing animations to your web page, the View Transition API is a great animation tool. It lets you create Cross-Document Transitions when navigating between pages. And not just in classic multi-page app..."
  url="https://freecodecamp.org/news/how-to-use-the-view-transition-api"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1751324398272/d2f05e29-6925-43da-8c41-14b1c18a4898.png"/>

If you want to add some amazing and visually appealing animations to your web page, the [<VPIcon icon="fa-brands fa-firefox"/>View Transition API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API) is a great animation tool. It lets you create Cross-Document Transitions when navigating between pages. And not just in classic multi-page apps - you can also use it to build eye-catching transitions in single-page applications.

In this article, you’ll learn how to:

- Enable cross-document transitions with a single line of CSS
- Animate individual elements like titles and images
- Debug and fine-tune your transitions
- Apply the same API to dynamic interactions in single-page apps using JavaScript
- Get an idea of how this works in a [<VPIcon icon="fa-brands fa-react"/>React](https://react.dev/) or [<VPIcon icon="iconfont icon-nextjs"/>Next.js](https://nextjs.org/) environment.

::: note Prerequisites

To follow along and get the most out of this guide, you should have:

1. **Basic HTML and CSS:** You should understand how to structure a web page using HTML and apply styles using CSS.
2. **JavaScript fundamentals:** Familiarity with JavaScript DOM manipulation, event handling, and basic functions will help you follow along with the dynamic examples.
3. **Modern browser environment:** The View Transition API is currently supported in Chromium-based browsers like Chrome and Edge. Make sure you’re using a compatible browser.
4. **React and Next.js basics (optional):** Toward the end of the article, we explore how to integrate view transitions in React and Next.js. Basic knowledge of component structure and routing in these frameworks will be helpful, though not strictly required for the core concepts.

:::

If you’re new to any of these topics, you can still follow along and revisit the article later with hands-on practice.

I’ve also created a video to go along with this article. If you’re the type who likes to learn from video as well as text, you can check it out here:

---

## Example Setup

For your demo, you have two simple HTML pages - <VPIcon icon="fa-brands fa-html5"/>`from.html` and <VPIcon icon="fa-brands fa-html5"/>`to.html` - that share the same stylesheet (<VPIcon icon="fa-brands fa-css3-alt"/>`style.css`). <VPIcon icon="fa-brands fa-html5"/>`from.html` page displays a grid of story cards. When you click a card on the first page, its image enlarges and moves to the <VPIcon icon="fa-brands fa-html5"/>`to.html` page.

![View Transition Demo](https://cdn.hashnode.com/res/hashnode/image/upload/v1750879534660/6fb3252f-aef2-42f9-8e64-3e106369c0a5.gif)

```html title="from.html"
<link rel="stylesheet" href="style.css" />

<div class="stories-container">
  <div class="story-card">
    <img 
      src="./assets/image-3.jpg" 
      alt="World in the Glass" 
      id="story-image"
    />
    <a href="./to.html">
      <div class="story-overlay">
        <div class="story-content">
          <div class="story-tag" id="story-tag">Sci-Fi</div>
          <h2 class="story-title">World in the Glass</h2>
          <p class="story-description">
            A cyberpunk adventure in a dystopian future where reality and
            virtual worlds collide.
          </p>
        </div>
      </div>
    </a>
  </div>
  <!-- more story cards… -->
</div>
```

```html title="to.html"
<link rel="stylesheet" href="style.css" />

<section class="story-hero">
  <img id="hero-image" src="./assets/image-3.jpg" />
  <div class="story-hero-overlay" id="overlay">
    <div class="breadcrumb" id="breadcrumb">
      <a href="from.html">My Stories</a>
      <span class="breadcrumb-separator">/</span>
      <a href="#">World in the Glass</a>
    </div>
    <div class="story-tag" id="story-tag">Sci-Fi</div>
    <h1 class="story-title">World in the Glass</h1>
    <div class="story-meta" id="story-meta">
      <div class="story-meta-item">
        <span>Created: June 1, 2025</span>
      </div>
      <!-- additional markup… -->
    </div>
  </div>
</section>

<section class="story-content-wrapper">
  <div class="story-content">
    <div class="story-main">
      <div class="story-chapter">
        <h2 class="chapter-title" id="title">Chapter 1: The Discovery</h2>
        <!-- additional markup… -->
      </div>
    </div>
  </div>
</section>
```

Instead of showing the full HTML markup here, I’ve only included the key snippet to help you understand the idea. You’ll find the complete code in the GitHub repository at the end of the article.

You’ll see that most of our work happens in <VPIcon icon="fa-brands fa-css3-alt"/>`style.css`, because although the View Transition API is a JavaScript API, you control it heavily with CSS.

---

## Enabling Cross-Document Transitions

To turn on cross-document transitions, add just one line to your CSS:

```css title="style.css"
@view-transition {
  navigation: auto;
}
```

Now, when you navigate between two pages - even using the browser’s “Back” and “Forward” buttons - you’ll see a smooth cross-fade by default.

### Debug Transition

If the animation feels too fast, you can use the Developer Tools in Google Chrome browser to slow it down. This not only helps you follow the animation more clearly, but also gives you a chance to learn how to debug animations using Chrome’s DevTools. Just follow the steps below:

- Open DevTools in your Chrome Browser
- Click the three dot icon on top right corner (you can follow the diagram below)
- Click “More Tools” → Animations

![Debugging Animation with Chrome DevTools](https://cdn.hashnode.com/res/hashnode/image/upload/v1750877041736/c8aa8b70-eb85-490a-9668-fc8791de7194.jpeg)

- Then slow the animation speed (for example to 10%) so you can watch it in detail.

![Animation Speed Control with DevTools](https://cdn.hashnode.com/res/hashnode/image/upload/v1750877234236/9fe44c73-ec28-4216-a40f-d13fe3bd5854.jpeg)

### First View Transition

By default, the entire document cross-fades, which is quite boring. To animate a specific element - like the “page title” - give it a `view-transition-name`:

```css title="style.css"
#title {
  view-transition-name: title;
}
```

Both pages use the same `id="title"`, so the API knows to treat them as one element. Now, when you click a card, the title gracefully moves from its position on the first page to its spot on the detail page - forward and backward. Just with these three lines of code, you get a pretty decent morph transition! Isn’t it interesting?

### Understanding View Transition Internals

To see how the API works under the hood:

::: tabs

@tab:active 1.

Open DevTools and pause the animation.

@tab 2.

Navigate between pages. You’ll notice a new overlay in the Elements panel. This overlay is made up with the CSS pseudo-element `::view-transition`

![Discovering `::view-transition`](https://cdn.hashnode.com/res/hashnode/image/upload/v1750878635416/e58425ae-99a9-4a83-b16b-52b8fdf4f50f.jpeg)

@tab 3.

Inside, you’ll find two Pseudo-element groups:

- `::view-transition-group-root` (the default cross-fade)
- `::view-transition-group-title` (for the named element `title`)

![View Transition Pseudo-element groups](https://cdn.hashnode.com/res/hashnode/image/upload/v1750878743737/c84cd13d-0110-4f72-b635-6a31c08b2a11.jpeg)

:::

You can target these groups in CSS. For example, to control all transitions’ duration:

```css title="style.css"
::view-transition-group(*) {
  animation-duration: 0.5s;
}
```

Or to disable the `root` default cross-fade while keeping your `title` animation:

```css title="style.css"
::view-transition-group(root) {
  animation: none;
}
```

### Animating Images Across Pages

Let’s animate the story image from the gallery into the larger hero image on the detail page. Here, the IDs differ - `#story-image` on <VPIcon icon="fa-brands fa-html5"/>`from.html` and `#hero-image` on <VPIcon icon="fa-brands fa-html5"/>`to.html` - so you select both and name the transition `picture`:

```css title="style.css"
#story-image,
#hero-image {
  view-transition-name: picture;
}
```

#### Default Animation

By default, you’ll see two cross-fading snapshots (“old” and “new”). But this animation isn't perfect for us. To understand this you'll go a bit deeper. Open DevTools again and pause the animation. Then, click on the story card in the <VPIcon icon="fa-brands fa-html5"/>`from.html` page. Now, you can scrub the playhead back and forth in the Animations panel to understand the problem and fine-tune the overlap.

![Finding the default animation overlap problem](https://cdn.hashnode.com/res/hashnode/image/upload/v1750933857022/7edf89cf-9cb3-4692-9f86-d1124700827d.gif)

#### Digging Into the Problem to Understand It Better

Just by looking at it, you can already see the problem. While the animation is playing, the state of the <VPIcon icon="fa-brands fa-html5 "/>`from.html` page (you can think of this state as the snapshot of the old state) overlaps with the incoming state or snapshot of the <VPIcon icon="fa-brands fa-html5"/>`to.html` page. They blend into each other in a way that doesn’t look good visually. You can check the snapshots of the old and new state of the transitions in the elements panel in the DevTools.

![Overlapping issue identified](https://cdn.hashnode.com/res/hashnode/image/upload/v1750938129914/eb9cb31f-2aaf-49e8-b46d-9b8edeb43cf5.jpeg)

There, you’ll notice a new pseudo-element group `::view-transition-group(picture)`. If you expand it, another group appears: `::view-transition-image-pair(picture)`.

Inside that, you’ll find two more pseudo-elements: `::view-transition-old(picture)` and `::view-transition-new(picture)`. The naming is pretty self-explanatory. The “image pair” reflects my earlier analogy of treating the before-and-after states as snapshots - you have one for the old state and one for the new. Makes sense now?

#### Improving the Animation

Now that you understand the concept and have identified the issue, let’s adjust the CSS to improve the animation. You noticed that the new snapshot appears on top of the old one. The old snapshot covers the full height of the parent element `::view-transition-image-pair(picture)`, while the new one is smaller. They’re cross-fading over each other, which doesn’t look great.

To fix this, you can target both the “old” and “new” snapshots and set their `height` to 100%. Since the default cross-fade feels a bit dull, you’ll also disable the built-in animation and set their `mix-blend-mode` property to `normal` so they don’t visually overlap in an odd way. Finally, you’ll make sure both snapshots have the same `border-radius` so the transition between the two looks smooth and consistent.

```css title="style.css"
::view-transition-old(picture),
::view-transition-new(picture) {
  animation: none;
  mix-blend-mode: normal;
  height: 100%;
  border-radius: 0 0 30px 30px;
}
```

#### Digging Deeper to Discover Hidden Issues

Now, if you repeat the debugging process and take a closer look, you’ll see that the overlapping issue is resolved. But there’s still one problem: the `::view-transition-new(picture)` element on top appears distorted. You can fix this by setting its `object-fit` property to `cover` and hiding any `overflow`. This will ensure the image scales properly without stretching and stays neatly within its container.

```css title="style.css"
#to::view-transition-new(picture) {
  object-fit: cover;
  overflow: hidden;
}
```

Here, I’ve specifically targeted the `::view-transition-new(picture)` pseudo-element of the `to` page using the `#to` identifier - because I added unique IDs to the elements of both <VPIcon icon="fa-brands fa-html5"/>`from.html` and <VPIcon icon="fa-brands fa-html5"/>`to.html`.

```html title="from.html"
<html lang="en" id="from">
  <!-- code goes here -->
</html>
```

```html title="to.html"
<html lang="en" id="to">
  <!-- code goes here -->
</html>
```

Now, if you check the animation closely, you’ll notice that the transition from <VPIcon icon="fa-brands fa-html5"/>`from.html` to <VPIcon icon="fa-brands fa-html5"/>`to.html` looks perfect.

Next, let’s handle the “back” navigation - transitioning from <VPIcon icon="fa-brands fa-html5"/>`to.html` back to <VPIcon icon="fa-brands fa-html5"/>`from.html`. If you debug this reverse transition, you’ll see that the old snapshot `::view-transition-new(picture)` appears completely distorted during the animation.

![Back navigation distortion issue](https://cdn.hashnode.com/res/hashnode/image/upload/v1750939152019/65b715c6-0e2b-4997-a9d1-795a5daab922.jpeg)

To fix this, you can target the new snapshot on the `from` page and set its `object-fit` to `cover`.

```css title="style.css"
#from::view-transition-new(picture) {
  object-fit: contain;
}
```

Now, if you debug and inspect again, the distortion is gone! But if you carefully follow the animation, you’ll notice another issue - the lower snapshot (which is `::view-transition-old(picture)` on the <VPIcon icon="fa-brands fa-html5"/>`from.html` page) - is overlapping awkwardly, as illustrated in the diagram below:

![New snapshot overlapping the old one](https://cdn.hashnode.com/res/hashnode/image/upload/v1750939706428/6f084418-c14e-4eb7-af50-aaca93d30d40.jpeg)

To fix this final piece, you can target the `::view-transition-old(picture)` pseudo-element on the `from` page. Then you apply `object-fit: cover`, hide any `overflow`, and match the `border-radius` to `20px` - just like the destination snapshot - for a smooth and visually consistent transition.

```css title="style.css"
#from::view-transition-old(picture) {
  object-fit: cover;
  overflow: hidden;
  border-radius: 20px;
}
```

#### Further Fine-Tuning for Perfection

After making these changes, the picture animation finally feels perfect! As you can see, the View Transition API is both simple and powerful. All it really takes is targeting the right pseudo-elements and applying the CSS skills you already have to fine-tune the transition.

It might feel a bit tedious at first - but that’s the nature of animation work, whether it’s in web development or video editing.

These small, detailed adjustments are what make your animations smoother and your user experience truly delightful. The more you debug, the more opportunities you uncover for improvement. So let’s dive a bit deeper and see if there’s anything else you can refine.

If you pause the animation and navigate from the <VPIcon icon="fa-brands fa-html5 "/>`from.html` page to the <VPIcon icon="fa-brands fa-html5"/>`to.html` page, you’ll notice that the snapshot of the incoming page title overlaps with the old one - as shown in the diagram below.

![Page title overlap issue](https://cdn.hashnode.com/res/hashnode/image/upload/v1750961028146/c1946f2d-f659-4ffb-a597-93ec176d6dce.jpeg)

You can solve this easily. When your titles overlap during the transition, hide the old title at the right moment:

```css title="style.css"
::view-transition-old(title) {
  opacity: 0;
}
```

Now, if you check again, you’ll see that the title no longer overlaps - and the animation is finally looking perfect!

### Endless Animation Opportunities

The View Transition API isn’t limited to just targeting pseudo-elements or relying on default animations. You can bring in all your CSS animation and transition skills to craft stunning, eye-catching custom animations. Let’s look at one more example to get a better sense of what’s possible.

#### Finding the Opportunity

When you transition from the <VPIcon icon="fa-brands fa-html5 "/>`from.html` page to the <VPIcon icon="fa-brands fa-html5"/>`to.html` page, the image animates smoothly. But there’s an issue: a darker overlay suddenly appears on top of the image, along with the text content inside it. Both the overlay and the text pop in abruptly, which doesn’t look great. So let’s fix that.

If you inspect the elements in DevTools, you’ll see I’ve intentionally given the overlay an ID of `#overlay`. All the text content on the <VPIcon icon="fa-brands fa-html5"/>`to.html` page lives inside this element.

Ideally, when you transition from <VPIcon icon="fa-brands fa-html5"/>`from.html` to <VPIcon icon="fa-brands fa-html5"/>`to.html`, the overlay should also appear with a smooth animation. Notice that the <VPIcon icon="fa-brands fa-html5 "/>`from.html` page doesn’t have this overlay at all. Up to this point, everything you’ve done has involved transitioning between elements that exist on both pages - elements that have counterparts. But in this case, you want to transition from “nothing” to “something.” And yes, that’s also possible with the View Transition API.

#### Implement the Idea

Without saying anything else, let’s go ahead and target the `#overlay` element first and assign it a custom transition name "overlay". This gives us the flexibility to control its animation separately from the rest of the elements.

```css title="style.css"
#overlay {
  view-transition-name: overlay;
}
```

Now that you’ve set this up, let’s see what’s actually happening. If you pause the animation and debug it, just like before, you’ll notice a new pseudo-element `::view-transition-group(overlay)`. Inside this group, within the image pair, you’ll find only `::view-transition-new(overlay)` - there’s no `::view-transition-old(overlay)`.

Why is that? It’s simple: on the previous page (`from.html`), there is no element with the ID `overlay`. Since there’s nothing to take a snapshot of, the browser doesn’t create a `::view-transition-old(overlay)`.

Likewise, when navigating back from <VPIcon icon="fa-brands fa-html5"/>`to.html` to <VPIcon icon="fa-brands fa-html5 "/>`from.html`, there will only be a `::view-transition-old(overlay)` - and no `::view-transition-new(overlay)` - because the overlay exists only on the page you’re leaving.

What you want to do now is animate this element in a nice way. Since you’re transitioning from “nothing” to “something”, you can define a custom CSS animation. A simple and elegant effect could be a fade-in from the bottom.

#### Defining Custom Keyframes

To achieve that, you can define a custom keyframe animation called `fade-in`. In this animation, you’ll start from `opacity: 0` and position the element slightly lower - for example, `translateY(50px)` - and then animate it upwards as it fades in.

```css title="style.css"
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
}
```

For the reverse (fading out) you can simply transition the `opacity` back to `0`.

```css title="style.css"
@keyframes fade-out {
  to {
    opacity: 0;
  }
}
```

#### Using the Keyframe Animations

Now that you’ve defined our keyframe animations, you can target the `::view-transition-new(overlay)` element and apply the `fade-in` animation to it. You’ll also add a slight animation delay - let’s say `0.5` seconds. This delay ensures that our custom animation begins after the default cross-fade animation has completed. Since you previously set a `0.5` second delay for the transition, this timing helps everything flow smoothly, without overlapping animations.

```css title="style.css"
::view-transition-new(overlay) {
  animation: 250ms cubic-bezier(0, 0, 0.3, 1) both fade-in;
  animation-delay: 0.5s;
}
```

And in the case of the “old” state (meaning when you navigate back), you simply target the `::view-transition-old(overlay)` element and apply the `fade-out` animation to it.

```css title="style.css"
::view-transition-old(overlay) {
  animation: 50ms cubic-bezier(0.3, 0, 1, 1) both fade-out;
}
```

#### Fine-Tuning for Perfection

Now let’s pause for a moment and check if any fine-tuning is needed. This step is essential when working with View Transitions, which is why I keep emphasizing it.

If you look closely during the fade-in and fade-out animations, you’ll notice an overflow issue: a subtle black area briefly appears underneath the overlay.

![Black overlay underneath issue](https://cdn.hashnode.com/res/hashnode/image/upload/v1750972763490/73f112e5-3fc1-4115-bbe1-0f23eee66577.jpeg)

To fix this, you can simply select the entire `::view-transition-group(overlay)` and hide its `overflow`. That should take care of the issue immediately.

```css title="style.css"
::view-transition-group(overlay) {
  overflow: hidden;
}
```

Now, if you check again, you’ll see that the animation looks perfect!

---

## Single-Page Experience

Up until now, you’ve explored how the View Transition API works in the context of cross-document or multi-page applications - something that wasn’t natively possible before.

But now, let’s shift our focus to Single Page Applications (SPAs). In most SPAs, animations have always been part of the experience, even before the View Transition API was introduced. Developers have long used various JavaScript tricks to create smooth transitions within SPAs. But with the View Transition API, you can now implement these transitions natively and much more easily. Let’s quickly take a look at how that works.

Let’s talk about the interaction we’re focusing on. When you click the “New Story” button, a new story card should appear. Then, we are going to animate this interaction using the View Transition API.

But first, let me quickly show you how this works under the hood. It’s a simple DOM (Document Object Model) operation. I’ve specifically targeted the button and added an event listener to its `onclick` event. So what does that listener do? It creates a new card element and injects it directly into the DOM. Let’s break down how this code creates a new story card using JavaScript.

### Set Up the Event Listener

You can set up the Event Listener in five simple steps:

#### Step 1: Select the Button

You’ll begin by selecting the button that the user will click to create a new story card. This line uses `document.querySelector()` to grab the first element on the page with the class name `.new-story-btn` and stores it in the `newStoryButton` variable.

```js
const newStoryButton = document.querySelector(".new-story-btn");
```

#### Step 2: Set up the Click Event Listener

Next, add a click event listener to that button. This means that when the user clicks the “New Story” button, the function you define inside this event listener will run. The function is marked `async` in case you later want to use `await` inside it - for example, if you fetch data or run animations that need to wait.

```js
newStoryButton.addEventListener("click", async () => {
  // you will write the listener code here
});
```

#### Step 3: Select the Container for Story Cards

Now that the button has been clicked, you grab the container where our story cards are displayed. This is the element with the class `.stories-container`, and it’s where you’ll append the new card in the next steps.

```js
// select the container for story cards
const container = document.querySelector(".stories-container");
```

#### Step 4: Create a new Story Card

You’ll call a helper function named `addStoryCard()` - presumably a custom function that returns a ready-made DOM element representing a story card. We pass it the story details: tag, title, description, and an image path. This function likely handles the creation of the HTML structure, styling, and maybe even animations for the card.

```js
const newCard = addStoryCard({
  tag: "Fantasy",
  title: "Sky Kingdoms",
  description:
    "A tale of floating islands and the heroes who defend them.",
  image: "./assets/image-5.jpg",
});
```

#### Step 5: Add the Card to the Page

Finally, the newly created card is appended to the `.stories-container`, making it visible on the page. At this point, the user will see the “Sky Kingdoms” story card appear in the list of stories.

```js
container.appendChild(newCard);
```

That’s it. Here’s the full event listener function:

```js
newStoryButton.addEventListener("click", async () => {
  const container = document.querySelector(".stories-container");

  const newCard = addStoryCard({
    tag: "Fantasy",
    title: "Sky Kingdoms",
    description:
        "A tale of floating islands and the heroes who defend them.",
    image: "./assets/image-5.jpg",
  });

  container.appendChild(newCard);
});
```

### The Actual `addStoryCard()` Function

Let’s take a closer look at the helper function `addStoryCard()`, which is responsible for generating a brand-new story card using some predefined structure and inserting custom content into it.

#### Step 1: Find the Template Card

You begin by selecting the existing `.story-card` element from the DOM. This element acts as your template - a ready-made design that you can clone to create new cards. You also add a simple safety check: if for some reason the template doesn’t exist on the page, the function exits immediately by returning undefined.

```js
function addStoryCard(data) {
  const templateCard = document.querySelector(".story-card");
  if (!templateCard) return;
}
```

#### Step 2: Clone the Template

Once you have the template, you’ll create a deep clone of it using `cloneNode(true)`. This means it copies the element and all of its nested child elements - preserving the full structure of the card. At this point, you have a fresh new card element in memory that looks just like the original.

```js
const newCard = templateCard.cloneNode(true);
```

#### Step 3: Update the Image (if any)

If an image is provided in the data object, you find the `img` tag inside the new card and update its `img` attribute.

```js
if (data.image) {
  const currentImage = newCard.querySelector("img");
  currentImage.setAttribute("img", `url('${data.image}')`);
}
```

#### Step 4: Update the Text Content

Now you customize the card’s text:

- You look for the `.story-tag`, `.story-title`, and `.story-description` elements inside the card.
- If they exist, you set their text content based on the data object that was passed in. This is where the story gets its actual content - like the tag (“Fantasy”), title (“Sky Kingdoms”), and description.

```js
const tag = newCard.querySelector(".story-tag");
const title = newCard.querySelector(".story-title");
const desc = newCard.querySelector(".story-description");
if (tag) tag.textContent = data.tag;
if (title) title.textContent = data.title;
if (desc) desc.textContent = data.description;
```

#### Step 5: Return the Final Card

Finally, you return the fully prepared story card so it can be added to the page wherever needed.

```js
return newCard;
```

So here’s the full `addStoryCard` function:

```js :collapsed-lines
function addStoryCard(data) {
  const templateCard = document.querySelector(".story-card");
  if (!templateCard) return;

  // Clone the card
  const newCard = templateCard.cloneNode(true);

  // Update image if provided
  if (data.image) {
    const currentImage = newCard.querySelector("img");
    currentImage.setAttribute("img", `url('${data.image}')`);
  }

  // Update content
  const tag = newCard.querySelector(".story-tag");
  const title = newCard.querySelector(".story-title");
  const desc = newCard.querySelector(".story-description");
  if (tag) tag.textContent = data.tag;
  if (title) title.textContent = data.title;
  if (desc) desc.textContent = data.description;

  return newCard;
}
```

Now, if you click on the “New Story” button, a new story card appears dynamically - thanks to the simple DOM operations you’ve already written above. But you can make it more engaging. Instead of the card just popping into place, you want to add a smooth, eye-catching transition when it’s added to the container.

Can you do this with plain CSS? Unfortunately, no - because the card is being added dynamically via JavaScript, CSS alone won’t catch this change and animate it. That’s where the View Transition API in JavaScript comes in. With just a bit of extra code, you can bring this interaction to life with a smooth and polished transition effect.

### Applying the Animation

In your event listener function, after creating the card DOM node, you just appended it to the container using the below code:

```js
container.appendChild(newCard);
```

This line - `container.appendChild(newCard)` - is the core operation you want to animate.

So how do you make this transition happen smoothly? You can’t use CSS alone here, because the new element is being inserted dynamically using JavaScript. But that’s not a problem, as JavaScript gives you full control over DOM manipulation, including the ability to apply styles on the fly.

To enable the View Transition API for your `newCard`, you simply need to assign a `viewTransitionName` to it. You can do this by setting the `style.viewTransitionName` property on the `newCard` element. You’ll give the transition a name `targeted-card`, just like you did in the CSS-based example earlier.

```js
newCard.style.viewTransitionName = "targeted-card";
```

This tells the browser: “Track this element during the transition and animate it.” And with that single line, your dynamically added element becomes part of a smooth, native-feeling UI animation.

And now you can start the transition using the View Transition JavaScript API like below:

```js
const transition = document.startViewTransition(async () => {
  container.appendChild(newCard);
});
```

Here, you use the `startViewTransition()` method provided by the browser. This is a modern API that helps you animate changes between two visual states of the page - before and after the DOM updates. Inside `startViewTransition()`, you pass an asynchronous callback function, in this case:

```js
() => {
  container.appendChild(newCard);
}
```

This is the DOM change you want to animate: adding the `newCard` into the `.stories-container`. Normally, adding a new DOM element would just appear instantly on the page. But with this API, you’re telling the browser:

> Hey, I’m about to change the DOM. Please capture the visual state before the change, apply my DOM update, then animate the transition between the old and new state.

Now you need to pause here and wait until the animation is fully complete as this is an asynchronous task. You can do this like below:

```js
await transition.finished;
```

Now that the animation is finished, you remove that name by setting it to `null`. This step is important to avoid unintended animations if the card is later updated or moved again. Think of it as cleaning up after the animation is done.

```js
newCard.style.viewTransitionName = null;
```

So here’s the full code all in one go, combining everything we just discussed.

```js
// name the transition
newCard.style.viewTransitionName = "targeted-card";

// start the transition
const transition = document.startViewTransition(async () => {
    container.appendChild(newCard);
});

// wait for the transition to finish
await transition.finished;

// finally cleanup the transition when finished
newCard.style.viewTransitionName = null;
```

Now, if you reload the page and try it out, you’ll see a smooth, beautiful transition when a new card is created. It’s a subtle touch, but it makes the interaction feel much more polished and dynamic.

And that’s how you can harness the power of JavaScript to add any animation you want - just like you did with CSS, but by setting style properties dynamically. The possibilities are endless when you combine your CSS skills with the flexibility of JavaScript and the View Transition API.

![View Transition in SPA](https://cdn.hashnode.com/res/hashnode/image/upload/v1751052383696/5f166113-6ca7-4f4c-b5dd-8fde64972523.gif)

---

## View Transition in React.js

If you are a React Developer, you can play with the experimental `<ViewTransition>` React component to play with this API.

```js
import {unstable_ViewTransition as ViewTransition} from 'react';

<ViewTransition>
  <div>...</div>
</ViewTransition>
```

Please note that this API is experimental and is not available in a stable version of React yet. You can try it by upgrading React packages to the most recent experimental version.

- `react@experimental`
- `react-dom@experimental`
- `eslint-plugin-react-hooks@experimental`

You can check details from the [<VPIcon icon="fa-brands fa-react"/>React.js official Documentation](https://react.dev/reference/react/ViewTransition).

---

## View Transition in Next.js

If you are a Next.js Developer, just like vanilla React, you can try the View Transition API

To enable this feature, you need to set the `viewTransition` property to true in your <VPIcon icon="fa-brands fa-js"/>`next.config.js` file.

```js title="next.config.js"
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    viewTransition: true,
  },
}

module.exports = nextConfig
```

Please note that `viewTransition` is an experimental flag that enables the new experimental View Transitions API in React. Please check details from the [<VPIcon icon="iconfont icon-nextjs"/>Next.js official Documentation.](https://nextjs.org/docs/app/api-reference/config/next-config-js/viewTransition)

---

## Browser Support

Browser Support varies (Firefox doesn’t yet support it), so be sure to review the [<VPIcon icon="fa-brands fa-firefox"/>compatibility table](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API#browser_compatibility) before shipping to production.

---

## Wrap-Up

The View Transition API lets you:

- Enable cross-document transitions with one line of CSS
- Animate individual elements by naming them
- Debug transitions in DevTools and fine-tune timing and easing
- Apply the same approach to single-page apps using JavaScript

For more details, check out the [<VPIcon icon="fa-brands fa-firefox"/>MDN documentation](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API) on View Transitions. Enjoy creating seamless, native animations in your web projects!

You can find all the source code from this guide in [this GitHub repository (<VPIcon icon="iconfont icon-github"/>`logicbaselabs/view-transition-api-tutorial`)](https://github.com/logicbaselabs/view-transition-api-tutorial). If it helped you in any way, consider giving it a star to show your support!

Also, if you found the guide valuable, feel free to share it with others who might benefit from it. I’d really appreciate your thoughts - mention me on X [<VPIcon icon="fa-brands fa-x-twitter"/>`@sumit_analyzen`](https://x.com/sumit_analyzen), watch my [coding tutorials (<VPIcon icon="fa-brands fa-youtube"/>`@logicBaseLabs`)](https://youtube.com/@logicBaseLabs), or simply [connect with me on LinkedIn (<VPIcon icon="fa-brands fa-linkedin"/>`sumitanalyzen`)](https://linkedin.com/in/sumitanalyzen/).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Use the View Transition API for Better Web Transitions",
  "desc": "If you want to add some amazing and visually appealing animations to your web page, the View Transition API is a great animation tool. It lets you create Cross-Document Transitions when navigating between pages. And not just in classic multi-page app...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-the-view-transition-api.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
