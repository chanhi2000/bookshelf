---
lang: en-US
title: "How to Apply Academic Theories to Human-Centered Web Design [Full Handbook"
description: "Article(s) > How to Apply Academic Theories to Human-Centered Web Design [Full Handbook"
icon: fas fa-pen-ruler
category:
  - Design
  - System
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - design
  - system
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Apply Academic Theories to Human-Centered Web Design [Full Handbook"
    - property: og:description
      content: "How to Apply Academic Theories to Human-Centered Web Design [Full Handbook"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-apply-academic-theories-to-human-centered-web-design-handbook.html
prev: /academics/system-design/articles/README.md
date: 2026-05-09
isOriginal: false
author:
  - name: Great John
    url: https://freecodecamp.org/news/author/greatujah/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/d7621fda-83a6-460e-aa38-bce970d4a655.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "System Design > Article(s)",
  "desc": "Article(s)",
  "link": "/academics/system-design/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Apply Academic Theories to Human-Centered Web Design [Full Handbook"
  desc="Have you ever abandoned an app right at the sign‑up page? Or felt uneasy navigating a website because the buttons were scattered randomly, the colors clashed, and the layout felt confusing and unneces"
  url="https://freecodecamp.org/news/how-to-apply-academic-theories-to-human-centered-web-design-handbook"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/d7621fda-83a6-460e-aa38-bce970d4a655.png"/>

Have you ever abandoned an app right at the sign‑up page? Or felt uneasy navigating a website because the buttons were scattered randomly, the colors clashed, and the layout felt confusing and unnecessarily complex?

Maybe you were asked to complete twenty fields in one go. You carefully filled everything out, hit Submit — and only then were you told that your password didn't meet some hidden, unspoken requirement. A requirement that was never communicated upfront.

Instead of helpful guidance, you were met with a vague message: “Invalid input." Invalid how, you wonder?

Required fields weren’t marked. There was no real‑time validation. No helpful red outline showing which field was wrong. Just a generic prompt telling you to “go back and correct missing information,” as if you’re supposed to magically know what the system wants.

So you scroll.

You search.

You guess.

And you're now getting frustrated.

The reason you're frustrated is simple: no one enjoys repeating a task they thought they had already completed — especially when the mistakes could've been prevented with clear guidance along the way.

You manage to fill in the form and you tap the Submit button.

Nothing happens.

No loading spinner.

No subtle animation.

No confirmation message.

No success screen.

Just silence. For a brief moment, you’re left wondering: Did it go through? So you tap again. And maybe… one more time.

At this point, you become fed up and you either postpone the signup process to when you have the time, or you may not ever return.

Even if you haven’t experienced this exact scenario, you’ve almost certainly felt the same kind of friction: that moment when a digital interface makes you pause, hesitate, or wonder what you’re supposed to do next.

These frustrations often arise because frontend developers either overlook or are unaware of the essential design principles and theories that underpin a smooth, intuitive user experience.

As a frontend developer, your interface should minimise cognitive load, provide immediate clarity, and guide users effortlessly through every task.

In this handbook, I'll introduce the academic theories that should inform and elevate your frontend decisions.

You might wonder what academic theories have to do with frontend development.

The answer is simple. Academic theories aren't abstract ideas. There are the result of rigorous scientific investigation — controlled experiments, validated models, and decades of research into how humans think, learn, perceive, and interact with information.

Because these theories are grounded in evidence rather than opinion, they offer reliable guidance for building interfaces that align with how the human brain actually processes information.

Applying them to frontend development means you're not designing by guesswork or personal preference. Instead, you're applying tested, scientific insights to create clearer, faster, more humane user experiences.

In other words, when you build with academic theory in mind, your frontend becomes more than just visually appealing — it becomes cognitively efficient, behaviourally aligned, and measurably easier for users to navigate.

You can use the following laws and principles to guide your development work. Let’s start by looking at Fitt’s law.

---

## 1.0 Fitts’s Law:

Fitts’s law is the brainchild of Paul Fitts. He was among the early psychologists who recognised that many human errors result from flawed design rather than simple human weakness.

During World War II, he studied airplane cockpit layouts and concluded that numerous incidents attributed to pilot error were actually caused by poor design decisions (Hall, 2023; Budiu, 2022).

Here's the formula:

$$
T= a+b\cdot\log_2\left(1+\frac{D}{W}\right)
$$

- $T$: Movement Time
- $D$ Distance to the target
- $W$: Width (size) of the target
- $a$, $b$ = Empirically determined constants

Based on his findings, Fitts postulated that the time required to acquire/reach a target is determined by the distance to the target and the size of the target.

![Fig 1.0: Illustration of Fitts Law.](https://cdn.hashnode.com/uploads/covers/6998def93dc17c4862075045/7d2699bd-4878-4ab0-8669-21616cb8faf1.png)

From the above, between Target B and Target C, it will be faster to interact with Target C than Target B simply because of the distance (Target B is farther away). Interestingly, though Target A and Target C are at the same distance, Target C will still be faster to interact with and less error-prone because of its larger size.

In simple terms, Fitt’s Law tells us that the time required to move to a target depends on two main factors: the distance to the target and the size of the target. The farther away an element is, the longer it takes to reach. The smaller it is, the more precision it demands, which increases the interaction time and the likelihood of errors.

Conversely, closer and larger targets reduce cognitive load, motor effort, and frustration.

In a nutshell, Fitts’s main message to developers is to reduce the distance users must travel on the screen and to make important buttons large and visually dominant.

![Fig 1.1: Showing Call-to-Action buttons are the largest and most visually prominent elements on each screen.](https://cdn.hashnode.com/uploads/covers/6998def93dc17c4862075045/bc293949-cadc-46b2-892d-bdfa1dfc6db3.jpg)

From the image above, you can see that the Call-to-Action buttons on each of the screens are the most visually dominant button and largest in size. They're also placed within the natural region. This makes them faster/easier to interact with.

You should also place your Call-to-Action button within the natural zone. This is a zone on a mobile phone where it's easy to reach with the thumb (as most people use their thumbs to select things on a phone screen). Here's a diagram showing the "natural zone" on a typical smartphone. It's much faster for a user to interact within the "natural zone" than the "hard zone" (see figure).

![Fig 1.2: Showing three different zones for buttons placement (natural, stretching and hard region)](https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/e98d8d91-b4e6-4b4a-96e5-2524a6e09028.png)

### 1.1 Use Padding Wisely

Fitts' law can be applied to your development by increasing padding wisely. You can also use padding to increase the interactive area. By doing this, you're increasing the size of the targets.

This is important, because imagine a menu that disappears the moment your cursor drifts a few inches away. You’re weren't trying to close it — you simply moved slightly, and suddenly the entire menu collapses. That tiny slip forces you to start the interaction all over again. It’s a small mistake, but it creates a disproportionately frustrating experience.

This happens because the interactive area is too narrow.

That’s why effective padding — or more broadly, generous interactive zones — is essential. By increasing the clickable or hoverable area around a menu, you are increasing the size of the targets, which makes the interaction more stable, more forgiving, and far less cognitively demanding.

This ensures users can move naturally without fear of accidentally “falling off” the target.

### 1.2 Use Infinite Targets

Another fundamental principle that emerges from Fitt’s Law is the idea of infinite targets. When an interface element is placed at the very edge or corner of a screen, it becomes effectively “infinite” because the cursor can't move beyond the screen boundary. The edge acts as a physical barrier, allowing the user to fling the mouse in that direction without precision or careful aiming.

As a result, corners and edges become the fastest, easiest, and most reliable places for users to access important controls.

This is why operating systems such as Apple’s macOS and Microsoft Windows position their most essential menus and buttons at these locations. The macOS Apple Menu sits in the top‑left corner, Windows historically placed the Start button in the bottom‑left corner, and both systems anchor taskbars, docks, and notification areas along screen edges.

These placements reduce cognitive load, minimise motor effort, and increase interaction speed because users do not need to slow down or correct their cursor movement. The screen itself “catches” the pointer.

In essence, infinite targets transform small interface elements into large, easy‑to‑hit zones simply by leveraging the geometry of the screen.

What this means for you: place your most important and frequently used actions where users can reach them with the least effort. Screen edges and corners act as natural stopping points, meaning users can't overshoot them.

### Design Takeaways from Fitts Law:

#### Place Primary Actions Where the Task Ends

Placing a submit button at the top‑right forces users to travel all the way back after completing a long form. This increases interaction cost and breaks flow. The best place for a submit button is at the bottom of the form — exactly where the user finishes the task. This aligns with natural reading and interaction patterns.

#### Keep Related Actions Physically Close

Separating “Add to Cart” and “Check Out” across opposite sides of the screen forces unnecessary thumb movement. Group related actions to reduce effort and speed up decisions.

#### Make Primary Targets Large and Visually Dominant

Your main CTAs (“Subscribe Now,” “Pay Now,” “Create Account,” “Sign Up”) should be the most recognisable elements on the screen. Large, high‑contrast targets reduce errors and improve speed.

#### Place High‑Value Actions at Screen Edges and Corners

Edges and corners act as “infinite targets” because the cursor can’t overshoot them. This makes them the fastest, easiest, and most reliable places for critical controls.

A tiny icon in the middle of the screen is hard to hit. The same icon placed at an edge becomes effectively huge because the boundary “catches” the pointer. Also, actions like navigation, primary CTAs, or global controls should live where users can reach them with minimal effort. Avoid burying important actions in the centre of the screen.

#### Increase Target Size With Generous Padding

Small interactive zones force users to aim with pixel‑level precision. Adding padding expands the clickable or hoverable area, making interactions easier, faster, and more forgiving.

#### Prevent Accidental “Fall‑Off” With Larger Hit Areas

Menus that collapse the moment the cursor drifts slightly create frustration. A wider interactive zone keeps the menu open during natural mouse movement, reducing accidental resets.

Users don’t move perfectly. Interfaces should accommodate slight slips without punishing them. Larger targets reduce cognitive load and eliminate unnecessary frustration. so by increasing the effective size of buttons, menus, and controls, you create interactions that feel stable and predictable, and users can move confidently without fear of losing their place.

::: note To Sum Up

The farther away an element is, the longer it takes to reach. The smaller it is, the more precision it demands, which increases the interaction time and the likelihood of errors. Conversely, closer and larger targets reduce cognitive load, motor effort, and frustration.

:::

---

## 2.0 Hick's Law*

Hick’s Law is a psychological principle that describes the relationship between the number of choices presented to a user and the time it takes them to make a decision. It was formulated by William Edmund Hick in 1952 (Yablonski, 2022; Proctor & Scheider, 2018).

The law states that as the number of options increases, the decision time increases logarithmically. In simple terms, more choices slow users down, while fewer choices speed up decision-making.

$$
T=a+b\cdot\log_2(n + 1)
$$

Where:

- $T$: time to make a decision,
- $n$: number of choices,
- $b$: a constant that depends on the task and the individual

![Figure 2.0 illustrates the relationship between user experience, reaction time, and the number of actions.](https://cdn.hashnode.com/uploads/covers/6998def93dc17c4862075045/d2c45f4b-77e9-42dc-a9c3-165dfe5f7ce7.jpg)

This is how users feel, for example, when they encounter a form that asks for too much information upfront. The longer the form gets, the more frustrated they become.

Examples of this are overloading menus with too many items, presenting long, unorganised forms, giving too many calls-to-action on one screen, and building nested menus with excessive depth.

All of these create friction and can lead to cognitive overload.

### Design Takeaway from Hick's Law

#### Avoid Overloading Users With Too Many Actions

Too many buttons, menu items, or choices at once increases cognitive load and slows decision‑making. Users freeze when everything competes for attention.

#### Keep Navigation Clean and Focused

Cluttered menus hurt both usability and SEO. Search engines struggle to track overly complex navigation structures, and users struggle to find what matters.

#### Use Progressive Disclosure to Reduce Complexity

Hide advanced or rarely used options under “More” or expandable sections. Reveal complexity only when the user needs it.

#### Break Complex Tasks Into Smaller, Manageable Steps

Progressive disclosure works beautifully for multi‑step forms and decision flows. Smaller steps reduce overwhelm and improve completion rates.

#### Group Related Options Into Logical Categories

Organising actions into meaningful clusters helps users process information faster. For example, placing “Edit” and “Delete” together leverages natural mental grouping.

<VidStack src="youtube/mbYIfRxSkHs" />

> Video 2.0: Video description of Progressive Disclosure.

From the video above, instead of showing all the menu details at once, it is better to hide them initially. As you can see, the additional information only appears when the arrow down button is pressed. This approach prevents overwhelming the user and keeps the interface clean and focused.

You should also reduce decision anxiety, as too many choices create doubt and friction (as they say, the more you ask from a user, the less you get).

Beyond this, try to use recommended labels, show brief descriptions, provide visual previews, and use comparison tables wisely to show comparison between products especially when they have many characteristics. An example of a comparison table is shown below:

![Figure 2.1: A comparison table being used to simplify complex information.](https://cdn.hashnode.com/uploads/covers/6998def93dc17c4862075045/5e52527a-3faf-4da1-97c2-a2a09ca7af8b.jpg)

Also, rather than showing advanced configuration options by default, display only the most commonly used settings. Advanced options can be hidden under an expandable section like “Advanced” or “More Settings. This makes your interface less cluttered and more visually organized.

And speaking of visual organization, this is the perfect moment to introduce Gestalt principles — the psychological rules that explain how users naturally group and interpret what they see.

::: note To Sum Up

As the number of options increases, the decision time increases logarithmically.

:::

---

## 3.0 Gestalt Principles*

In the 1920s, a group of German psychologists – Max Wertheimer, Kurt Koffka, and Wolfgang Köhlern – introduced what are now known as the Gestalt Principles. Their work sought to understand how humans perceive and interpret visual information (Bustamante, 2023).

The word “Gestalt” is German for “unified whole,” reflecting the core idea behind the theory: people naturally perceive objects as organised patterns and complete forms rather than as separate, disconnected parts.

These principles explain how the human mind structures visual elements to make sense of the world. Over time, they have become highly influential in fields such as design, user experience (UX), psychology, and data visualization, where understanding perception is critical.

### Key Gestalt Principles:

### 3.1 Proximity

Elements that are placed close to each other are perceived as a group, while those spaced far apart are seen as separate. This is why labels are placed directly next to their corresponding input fields.

For example: In a blog feed, the "Title," "Author," and "Date" should have small margins between them (8px), while the space between one blog post card and the next should be much larger (40px). This tells the user's brain: "These three text strings belong to this specific post."

![Fig 3:0 Illustration of proximity (Gestalt Principle)](https://cdn.hashnode.com/uploads/covers/6998def93dc17c4862075045/b68ab7f4-1b2e-47f1-8e8c-8ae8f32198c1.jpg)

From the fig above, the spacing within the blog feed plays a powerful role in how effortlessly users interpret what they see. When elements sit close together, the brain instinctively treats them as belonging to the same unit. This is why placing the author credit just 8px beneath the title creates an immediate mental link. The viewer doesn’t need to pause or decode who wrote which article; proximity does the cognitive work automatically, forming a tight, intuitive grouping.

Equally important is the generous 40px gap between individual cards. This larger spacing introduces “visual breathing room.” Without it, a feed can quickly collapse into a dense wall of text, overwhelming the user and discouraging exploration. The wider margin establishes a clear boundary—a natural stop-and-start rhythm—that makes each card feel distinct and the entire layout more scannable.

Finally, subtle spacing differences can guide behaviour, not just perception. The slightly larger 12px margin above the read‑more link separates it from the passive information above it. This spacing cues the user that the link represents an action rather than another piece of descriptive text. It’s a small adjustment, but it shifts the element’s role from informational to interactive, helping users understand what they can *do* next.

Together, these spacing decisions transform a simple list of posts into a structured, intuitive, and behaviourally clear interface—one where the user never has to think about the layout, because the layout is already thinking for them.

Proximity controls meaning: move elements closer to show connection, separate them to show difference.

### 3.2 Similarity

We naturally group elements that share similar visual characteristics, such as color, shape, size, or orientation.

For example, even if buttons are spread across a page, if they're all the same shade of blue, the user understands they perform similar functions.

If your primary "Submit" button is blue with rounded corners, every other primary action on your site should look exactly the same. If you suddenly use a square red button for a primary action, the user will be confused because the "similarity" is broken.

![Fig 3:1 : illustration of similarity (Gestalt principle)](https://cdn.hashnode.com/uploads/covers/6998def93dc17c4862075045/151d9658-5a4b-4d1d-b885-02c73c53cdbd.jpg)

As you can see from above, the layout clearly demonstrates how the Gestalt Principle of Similarity works by showing two different visual situations: one where everything matches, and one where a single element breaks the pattern.

All three product cards share the same visual characteristics:

- Same card shape
- Same border and shadow
- Same image size and placement
- Same blue “Add to Cart” button
- Same font style and spacing

Because these elements look alike, your brain automatically groups them as one category — “products that belong together.”  
You don’t have to think about it; the similarity creates instant visual unity.

This is the Gestalt Principle of Similarity in action.

In the second row, everything is still similar except one button:

- The middle product’s button is orange, not blue
- It has square corners, not rounded
- The text is italic, not regular
- The label changes to “Quick Buy”

Because this button breaks the shared pattern, your brain immediately notices it and treats it as different or special.

Developers can use broken similarity to intentionally highlight featured items, promotions, or urgent actions.

When similarity is broken, the different element stands out and draws attention.

### 3.3 Continuity

The human eye prefers to follow a continuous path or curve rather than jagged or broken lines. We perceive items aligned on a line or curve as being related. This is often used in navigation menus or horizontal carousels to guide the user's gaze.

For example, you might have a horizontal carousel where the last visible card is slightly "cut off" at the edge of the screen. This visual break creates a path that encourages the user to keep scrolling as their eyes follow the line of cards.

![Fig 3:2: illustration of continuity (Gestalt principle)](https://cdn.hashnode.com/uploads/covers/6998def93dc17c4862075045/e44556e8-4174-4073-9c05-63b5df9a1278.jpg)

As you can see, all four form fields — *First Name*, *Last Name*, *Email Address*, and *Phone Number* — are perfectly aligned along one continuous horizontal path. Because the human eye naturally prefers to follow an unbroken line, your gaze moves smoothly from left to right across the fields without effort.

The final field is slightly cut off at the edge, which creates a subtle visual cue that the line continues beyond the visible area. This encourages the user to keep scrolling or swiping, because their eyes are already following the direction of the form.  
when elements are arranged along a straight path, curve, or flow, the brain automatically treats them as connected and expects the pattern to continue.

Another example is Instagram Stories, which are arranged in a smooth horizontal line at the top of the app. Instagram reinforces this by slightly revealing the next story circle at the edge of the screen. That tiny “peek” acts as a continuation cue — your eyes expect the line to keep going, so your finger follows.

![Fig 3:3: illustration of continuity (Gestalt principle)](https://cdn.hashnode.com/uploads/covers/6998def93dc17c4862075045/bb019a6d-33c9-4509-b1c7-191b5a453c46.jpg)

As you can see from above, all the circular story icons are arranged in a straight horizontal line, and your visual system instinctively follows that line from left to right without effort.

The slight visibility of the next story at the edge of the screen strengthens this effect, signaling that the sequence continues beyond what's currently shown. Also, because the icons share the same size, spacing, and shape, there are no visual interruptions, allowing your eyes to glide across them in one continuous motion.

This seamless flow is exactly what continuity describes: the tendency of the human eye to follow the direction of a line or pattern, assuming it continues even when part of it is out of view.

Continuity is the tendency of the human eye to follow the direction of a line or pattern, assuming it continues even when part of it is out of view.

### 3.4 Closure

Closure refers to the mind’s ability to perceive a complete, unified form even when parts of that form are missing. Rather than requiring every boundary, line, or shape to be explicitly drawn, the brain instinctively fills in the gaps. When used intentionally, closure allows interfaces to feel cleaner, more elegant, and more cognitively efficient.

When we look at a complex arrangement of visual elements, we tend to look for a single, recognisable pattern. If an image is missing parts, our brains fill in the gaps to "close" the shape.

One of the most celebrated examples of closure in visual identity design is the panda symbol used by the World Wide Fund for Nature (WWF). This logo demonstrates how strategic omission can produce a memorable, emotionally resonant, and universally recognisable mark.

At first glance, the panda illustration appears simple, composed of a few bold black shapes arranged against a white background.

Yet a closer look reveals that the panda is not fully drawn. There are no outlines defining the body, no complete contours around the head, and no explicit boundaries separating limbs from background. Instead, the designer uses a series of carefully placed shapes (ears, eye patches, nose, and partial limbs) to imply the rest of the animal. The viewer’s mind fills in the missing information, completing the silhouette effortlessly.

This is closure at its most effective: the brain constructs a whole from fragments, creating a sense of completeness without visual overload.

![Fig 3:4: illustration of closure (Gestalt principle)](https://cdn.hashnode.com/uploads/covers/6998def93dc17c4862075045/0c40effd-e4d2-4669-af1d-56faac976b4a.jpg)

For example, a "hamburger menu" (three lines) isn't a literal drawer, but our brains "close" the shape to understand it represents a menu.

![Fig 3:5: illustration of closure (Gestalt principle)](https://cdn.hashnode.com/uploads/covers/6998def93dc17c4862075045/b67253cd-2a2c-4565-9818-f5586dad6d36.jpg)

An example of closure in practice can be seen in step indicators commonly used in checkout flows. These components often rely on partial shapes, implied boundaries, and incomplete outlines to guide the user through a sequence of actions.

For instance, upcoming steps may be represented by dashed circles. Although the circles aren't fully drawn, the viewer immediately recognises them as complete shapes. The brain resolves the missing segments, allowing the interface to communicate progression without heavy borders or fully rendered icons. This subtle use of closure reduces visual clutter while preserving clarity.

Closure refers to the mind’s ability to perceive a complete, unified form even when parts of that form are missing.

### 3.5 Figure/Ground

This principle describes the mind's tendency to separate an object (the figure) from its surrounding area (the ground or background). In web design, using a "modal" or "pop-up" relies on this: by blurring the background, you force the user to see the pop-up as the focal figure.

When a user clicks "Login" on a modal/lightbox, the background site often dims (the "Ground") while the login box stays bright and centered (the "Figure"). This immediate depth change tells the user exactly where their attention belongs.

<VidStack src="youtube/UCdjymjASOU" />

> *Video 3.5.0 Video description of Figure/Ground (Gestalt Principle)*

From the video above, you can see that when the Quick View button is clicked, the selected figure stands out while the background darkens. This contrast guides the user’s attention and helps them focus on the figure. Developers can use this technique to direct users’ attention to what matters most or to what they want users to notice.

This principle describes the mind's tendency to separate an object (the figure) from its surrounding area (the ground or background).

### 3.6 Common Fate

Elements that move in the same direction are perceived as more related than elements that are stationary or move in different directions. Think of a dropdown menu: when all sub-items slide down together, they are clearly part of the same "unit."

For example, when you click a FAQ header and five sub-items slide down at the exact same speed and direction, the "Common Fate" tells the user that all those items belong to that specific category. If they flew in from different directions, the relationship would be lost.

<VidStack src="youtube/T10xmlne6E4" />

*Video 3.6.1 Video description of common fate (Gestalt Principle)*

<VidStack src="youtube/5FncGLRy0bM" />

*Video 3.6.2 Video description of common fate (Gestalt Principle)*

From the video shown above, the e‑commerce animation example demonstrates these principles clearly by using two distinct motion patterns: a group of regular products that move upward together, and a pair of special‑category items that enter dramatically from the left. Through these contrasting movements, the interface communicates category differences without relying on text labels or explicit instructions.

Therefore, developers can use this motion‑based differentiation as a design strategy to guide users’ perception—allowing the interface to signal hierarchy, category structure, and product importance purely through animated behaviour rather than through static visual labels.

Elements that move in the same direction are perceived as more related than elements that are stationary or move in different directions.

### 3.7 Focal Point

Whatever stands out visually will capture and hold the viewer’s attention first. This is essentially the principle of emphasis. A bright "Sign Up" button in a sea of gray text acts as the focal point, directing the user's primary action.

For example, an alert banner or a pricing table should stand out from its surroundings. Beyond this, in a three-tier pricing table (Basic, Pro, Enterprise), the "Pro" column is often slightly larger or a different color. This creates a focal point that draws the eye to the "recommended" option immediately.

![Fig 3:7: illustration of closure (Gestalt principle)](https://cdn.hashnode.com/uploads/covers/6998def93dc17c4862075045/711c9ee9-b546-4041-bf86-30c80154bd47.jpg)

In visual interface design, the Gestalt principle of Focal Point plays a crucial role in directing user attention toward the most important element on a screen.

A focal point is created when one element breaks the established pattern of surrounding elements, making it stand out immediately.

In e‑commerce interfaces, this principle is often applied to highlight primary actions such as purchasing, subscribing, or upgrading. The “Buy Now” button provides a clear and practical example of how focal points function within a layout.

From the example above, the first two buttons share the same visual characteristics: neutral colours, and regular weight text. This repetition establishes a visual pattern that the user quickly becomes familiar with.

But the “Buy Now” button intentionally disrupts this pattern. It uses a bright colour, which contrasts sharply with the muted tones of the other buttons. This colour difference alone is enough to draw the eye, as humans are naturally sensitive to changes in hue and saturation within a uniform environment.

The Focal Point may sound like it's similar to the principle of Similarity, but the two operate in completely opposite ways within perceptual psychology.

Similarity explains how the mind naturally groups elements that share visual characteristics – such as colour, shape, or size – into coherent units. Once this grouping is established, the interface gains structure and predictability.

Focal Point, on the other hand, works by intentionally breaking that structure. Instead of reinforcing uniformity, it introduces a deliberate contrast – through colour, scale, brightness, or motion – to draw the viewer’s attention to one specific element.

In other words, Similarity creates the background pattern, while Focal Point identifies the one element that must stand out against that pattern.

Whatever stands out visually will capture and hold the viewer’s attention first.

### Design Takeaways from the Gestalt Principles

#### Use Spacing as Your Primary Grouping Tool

Elements that belong together should sit closer to each other than to anything else. Spacing communicates structure faster than borders or boxes. Use tight internal spacing (6–12px) for related items and wide external spacing (24–48px) to separate groups.

#### Build a Strict, Consistent Visual System — and Stick to It

Define clear rules for button types, text styles, icon sizes, and alignment patterns. Consistent left‑aligned text blocks, predictable carousel lines, and stable flow patterns reduce cognitive load and make interfaces feel trustworthy.

#### Guide the Brain With Spacing, Alignment, Consistency, Contrast, and Motion

The human brain is always trying to group, follow, and prioritise what it sees. Your job is to guide that instinct through intentional layout decisions, not fight against it.

---

## 4.0 Von Restorff Effect (The Isolation Effect)*

This is the brainchild of Hedwig von Restorff, posited in 1933. In principle it states: An item that stands out is more noticable and more likely to be remembered than other items (Hunt, 1995).

So unique or visually distinct elements grab attention and are more memorable – in other words, distinctiveness dictates memory. When a user interacts with an interface, their brain naturally seeks patterns to minimize cognitive effort.

While consistency is generally a virtue in design, a perfectly uniform layout can lead to "banner blindness" or habituation, where the user stops noticing details.

By strategically breaking a pattern through changes in color, size, shape, or spacing, the developer can "isolate" an element, triggering a biological response that flags the item as high-priority.

Note that although the Focal Point principle may initially seem similar to the Von Restorff Effect, they describe two different psychological processes.

Focal Point is a Gestalt visual principle that explains how one element becomes the centre of attention within a composition because it carries the strongest visual contrast – through size, colour, brightness, position, or motion. Its purpose is to guide the viewer’s eye toward the most important element in the layout.

The Von Restorff Effect comes from cognitive psychology, not Gestalt theory. It states that an item that is noticeably different from a group of similar items is not only more attention‑grabbing but also more memorable.

So Focal Point is about where the eye goes first, while the Von Restorff Effect is about what the brain remembers later.

### Design takeaways from Von Restorff

#### Use Isolation to Make CTAs Impossible to Miss

On a page filled with neutral text and standard links, a single high‑contrast button (like a bold “Primary Blue” or “Emergency Red”) instantly becomes the standout element. This leverages the Von Restorff Effect to pull the user’s eye toward the most important action.

#### Create a Visual “Hitch” in the Scan Path

A distinct CTA interrupts the user’s natural left‑to‑right, top‑to‑bottom scanning rhythm. This makes actions like “Buy Now” or “Sign Up” the first thing they notice and the last thing they forget.

#### Make Critical Actions Visually Distinct

Because users naturally notice the one element that breaks a pattern, your most important actions should use deliberate contrast — color, size, shape, weight, or motion. Isolate key information instead of letting it blend into surrounding UI noise.

#### Avoid Over‑Differentiation — or Nothing Stands Out

If every button is loud, animated, or uniquely styled, the interface becomes chaotic. The Von Restorff Effect only works when there is a clear, stable pattern — and you break it once, intentionally.

::: note To Sum Up

An item that stands out is more noticable and more likely to be remembered than other items.

:::

---

## 5.0 Jakob’s Law

Jakob’s Law states that users spend most of their time on other sites, so they expect your interface to behave like the ones they already know.

Familiar patterns — hamburger menus, top navigation, search icons, and clickable top‑left logos — reduce cognitive load because users don’t have to interpret anything new.

But while Jakob’s Law is foundational to UX, I think it can also unintentionally suppress innovation.

When developers over‑prioritise familiarity, they fall into a standardisation trap: endlessly optimising conventional patterns instead of exploring fundamentally better ones.

The Pie Menu is a perfect illustration of this. According to Fitts’s Law, the time required to reach a target depends on its distance and size. Linear menus place the last item much farther from the cursor than the first, creating uneven interaction costs.

Radial menus position every option at an equal distance from the centre, and their wedge‑shaped targets effectively grow larger as the pointer moves outward.

Mathematically, pie/radial menu are faster to interact with and more efficient — yet they remain rare in mainstream web design because they violate users’ expectations. In other words, Jakob’s Law keeps us locked into a familiar but suboptimal pattern simply because “that’s how it’s always been done.”

But the challenge is not choosing between familiarity and innovation, but balancing them.

This is where the Aesthetic–Usability Effect becomes powerful. Research shows that users perceive attractive interfaces as easier to use, and they are more forgiving of minor usability friction when the design is visually pleasing.

A beautifully crafted Pie Menu, for example, can encourage users to invest the small amount of learning required to use it. By applying aesthetic delight strategically, developers can introduce innovative patterns without overwhelming users.

The principle that emerges is simple: Be conventional where it matters, and innovative where it delights.

### Design Takeaway from Jakob's Law

#### Keep Trust‑Critical Elements Predictable

Navigation, search, authentication, and other high‑stakes interactions must follow established conventions. Users rely on these patterns for speed, confidence, and safety — this is where Jakob’s Law should be respected without exception.

#### Experiment Only in Low‑Risk, High‑Creativity Areas

In creative or productivity‑focused zones — like editing tools in a photo app — you can safely introduce new interaction models such as radial menus, gesture wheels, or context‑aware tool selectors. These areas invite exploration and benefit from efficiency‑driven innovation.

::: note To Sum Up

Be conventional where it matters, and innovative where it delights.

:::

---

## 6.0 Miller’s Law

Miller’s Law originates from George A. Miller’s classic paper “The Magical Number Seven, Plus or Minus Two.” It states that the average person can hold only about 7 (±2) chunks of information in working memory at any given moment (Miller, 1956).

Crucially, Miller emphasised that the brain doesn’t store isolated items — it groups them into meaningful units called chunks. Because working memory is so limited, developers must structure information in ways that respect this cognitive boundary.

This principle has direct implications for interface design. Long, unbroken strings of information overwhelm users, whereas chunked formats are far easier to process.

For example, instead of displaying a phone number as 1234567890, formatting it as 123‑456‑7890 transforms ten digits into three manageable chunks. The same logic applies to navigation: aim for five to nine primary menu items, and if you need more, group them into categories. Users remember the category as a single chunk rather than each individual link.

Miller’s Law also explains why long forms are so intimidating. When a user sees 30 fields on one page, their brain interprets it as a single, massive task — far beyond the 7±2 limit.

A progressive stepper solves this by breaking the form into smaller stages of 5–7 fields each. This reduces cognitive load, creates a sense of progress, and significantly lowers abandonment rates.

The same principle applies to product listings or search results. Expecting users to compare 50 items at once is unrealistic. Instead, provide strong filtering tools so users can narrow the set to a manageable size — ideally within the range their working memory can meaningfully evaluate.

In essence, Miller’s Law reminds developers that humans don’t process information in bulk. They process it in structured, meaningful chunks.

![Fig 6.0: Illustrating progressive stepper](https://cdn.hashnode.com/uploads/covers/6998def93dc17c4862075045/3add2891-c6f8-4df1-a044-6cea6c5f1945.jpg)

In the example above, the interface uses both a progress bar and a stepper to guide the user through multiple stages of a task. After completing the first page and selecting “Continue,” the user moves to the next step, and the progress bar updates accordingly. This creates a clear sense of forward movement and accomplishment.

By breaking the process into smaller segments, the interface prevents cognitive overload. If all the information were presented on a single page, users might feel overwhelmed, unsure where to begin, or discouraged by the sheer volume of work.

A step‑by‑step flow transforms a large task into a sequence of manageable actions, increasing the likelihood of completion.

### Design Takeaway from Miller's Law

#### Respect the 7±2 Working‑Memory Limit

Users can only hold about seven chunks of information at once. Long, unbroken content overwhelms them, while chunked information is instantly easier to process.

#### Chunk Information Into Meaningful Units

The brain doesn’t store isolated items — it groups them. Format data (like phone numbers), menus, and settings into clear, memorable chunks instead of long, flat lists.

#### Keep Navigation Within 5–9 Primary Items

If you need more than nine options, group them into categories. Users remember the category as a single chunk, not each individual link.

#### Break Long Forms Into Smaller Steps

A 30‑field form feels like one giant task. A progressive stepper with 5–7 fields per step keeps users below the cognitive overload threshold and dramatically reduces abandonment.

#### Reduce Comparison Load With Strong Filters

Expecting users to compare 50 products at once is unrealistic. Provide filtering tools that shrink the decision set to something the working memory can actually handle.

#### Design for Chunked Thinking, Not Bulk Processing

Humans don’t process information in bulk — they process structured, meaningful groups. Interfaces that respect this limitation feel lighter, faster, and more intuitive.

::: note To Sum Up

A step‑by‑step flow transforms a large task into a sequence of manageable actions, increasing the likelihood of completion.

:::

---

## 7.0 The Goal-Gradient Hypothesis

This is the perfect moment to introduce the Goal‑Gradient Hypothesis, originally proposed by behaviorist Clark Hull in 1932 (Yablonski, 2022). The hypothesis states that people become more motivated as they get closer to achieving a goal. In other words, users naturally accelerate their engagement when they sense they are nearing completion.

This principle is incredibly powerful in UX design, especially for progress tracking, gamification, and reward systems.

The takeaway is straightforward: Because users are more motivated near the finish line, progress indicators should be prominent and meaningful.

Percentages, progress bars, and step counters reinforce momentum. Micro‑achievements — such as badges, checkmarks, or subtle confetti — amplify motivation by celebrating small wins.

Tasks should be broken into measurable milestones so users can see themselves advancing.

This is why e‑learning platforms display messages like “You’ve completed 8 of 10 lessons — almost there!” and why fitness apps highlight progress with prompts such as “3 km done, 2 km to go.” These cues leverage the goal‑gradient effect to keep users engaged, energized, and eager to finish.

By combining progressive steppers with clear progress feedback, developers create interfaces that feel lighter, more encouraging, and far more motivating — ultimately improving completion rates and overall user satisfaction.

But what happens when a goal isn't completed? Why do we sometimes feel uncomfortable leaving things unfinished? That discomfort is explained by another psychological principle called the Zeigarnik Effect — the tendency for people to remember and feel tension about incomplete tasks. We will look at this next.

### Design Takeaway from Goal-Gradient Hypothesis

#### Make Progress Visible to Boost Motivation

According to the Goal‑Gradient Hypothesis, users naturally speed up as they sense they’re nearing completion. Prominent progress bars, percentages, and step counters tap into this instinct and keep momentum high.

#### Celebrate Micro‑Achievements to Reinforce Engagement

Badges, checkmarks, subtle confetti, and “step completed” cues reward small wins. These micro‑rewards amplify motivation and make long tasks feel lighter and more achievable.

#### Break Tasks Into Measurable Milestones

Users stay motivated when they can see themselves advancing. Divide complex flows into clear steps so progress feels tangible rather than overwhelming.

#### Use Progress Feedback to Drive Completion

Messages like “8 of 10 lessons completed — almost there” or “3 km done, 2 km to go” leverage the goal‑gradient effect to energise users and pull them toward the finish line.

#### Combine Steppers With Clear Feedback for Maximum Impact

Progressive steppers paired with strong visual feedback create interfaces that feel encouraging, structured, and motivating — dramatically improving completion rates.

<VidStack src="youtube/-mDuFB3W2bg" />

> *Video 8.0 : Video illustrating goal gradient*

::: note To Sum Up

People become more motivated as they get closer to achieving a goal.

:::

---

## 8.0 Zeigarnik Effect

The Zeigarnik Effect is a psychological principle stating that people remember unfinished or interrupted tasks better than completed ones (Cherry, 2024).

Memory begins with sensory input, which is processed into short-term memory. Unfinished tasks persist in our thoughts, leading to active recall. This ongoing engagement can turn them into long-term memories, enhancing recall until resolved. This increases engagement, encourages task completion, improves retention, and drives conversions.

So because people remember unfinished tasks better than completed ones (Zeigarnik Effect), developers use progress indicators to make users aware that something is incomplete and motivate them to finish it.

In your designs, you can break long forms into multi-step processes to encourage completion and display profile completion percentages (for example, 70% complete) to push users toward 100%.

This is the main reason why e-commerce platforms send abandoned cart reminders to bring users back to complete their purchases. It's also why apps use streak systems to encourage daily engagement and habit formation and learning platforms show course completion bars to motivate users to finish modules.

### Design Takeaway from Zeigarnik Effect

#### Unfinished Tasks Stay Active in Memory — Use That to Drive Completion

Because incomplete tasks linger in working memory (Zeigarnik Effect), users naturally keep thinking about what they haven’t finished. This tension boosts recall, engagement, and the likelihood of returning to complete the task.

#### Make Incompleteness Visible With Progress Indicators

Progress bars, percentages, and step counters remind users that something is still unfinished. This gentle psychological pressure motivates them to continue until the task is complete.

#### Break Long Flows Into Multi‑Step Processes

A massive form feels overwhelming, but a stepper with smaller chunks keeps users moving. Showing “70% complete” nudges them toward finishing the last stretch.

#### Use Reminders to Re‑activate Unfinished Intent

Abandoned cart emails, streak reminders, and “continue your lesson” prompts work because the unfinished task is already active in the user’s mind. The reminder simply pulls them back into the loop.

#### Celebrate Completion to Close the Cognitive Loop

Checkmarks, confirmations, and completion badges give users closure. This resolves the mental tension created by the unfinished task and reinforces positive behaviour.

::: note To Sum Up

Unfinished tasks persist in our thoughts, leading to active recall.

:::

---

## 9.0 Tesler’s Law*

This law was proposed by Lawrence Tesler. He was a computer scientist known for his work on human-computer interaction, and he contributed significantly to making software more user-friendly, including work on cut, copy, and paste functionality.

This law is otherwise known as the Law of Conservation of Complexity. The core Idea here is every process has a certain amount of “inherent complexity" that can't be removed. You can only decide who handles it: the user or the system.

Some examples of these inherent complexities might be:

- translating user actions into correct operations behind the scenes,
- handling unreliable or slow network connections,
- connecting with third-party APIs, services, or legacy systems,
- sorting large datasets quickly,
- performing complex search operations
- managing version changes and compatibility issues,
- managing state, interactions, and animations without confusing the user.

All of these can be inherently complex, but it's the job of the developer to deal with the complexity.

As a developer, you should always try as much as possible to push complexity to the system. For example, instead of making a user type their full address manually, use an Auto-complete API (Google’s Places and Map is best for this). The complexity of finding and validating the address still exists, but the software handles the work for them.

Here's a practical example: let’s say you're designing a student platform that requires users to enter their university name. A practical approach would be to store an array of all universities in the UK in your codebase (This is the hard part Tesla hinted at).

As the user types, they don't need to enter the full name, and their full university name is shown (relating to what they have typed). For instance, if they intend to type “University of Sheffield,” simply typing “Sheff” should prompt the system to display the full university name, which they can then select.

In Dart, you can use a package like fuzzysearch to implement this kind of intelligent matching.

The advantage of this approach is greater than it first appears. It improves data consistency because users often enter the same information in different ways. For example, some users might type “Uni of Sheff,” others “Sheffield University,” and others “Uni of Sheffield,” while all are referring to “University of Sheffield.”

This is how messy data is created, and it creates more work for data analysts. Little wonder that data analysts spend up to 70% of their time cleaning data.

If developers invested more time in structuring how data is collected to ensure consistency, there would be far less work downstream for analysts. This same logic should be applied in how we collect date, time, and other information.

So apart from people's names and email addresses, you should try to standardize the data your app collects as much as possible. Use date and time pickers, stepper controls, input masks, checkboxes, dropdown menu and radio buttons, toggle switches. and so on.

The essence of removing complexity from the user is not only about improving usability, but also about ensuring that the data collected is standardised, structured, and consistent.

### Design Takeaway from Tesler's Law

#### Push Complexity to the System, Not the User

Every process contains unavoidable complexity. Your job is to handle it behind the scenes so the user experiences the simplest possible interaction.

#### Automate Tasks Users Shouldn’t Have to Think About

Use tools like autocomplete, fuzzy search, intelligent defaults, and validation APIs to remove manual effort. The complexity still exists — but the system absorbs it instead of the user.

#### Standardise Inputs to Prevent Messy Data

Users enter the same information in wildly different ways. Use pickers, dropdowns, input masks, radio buttons, and toggles to enforce consistent, structured data collection.

#### Handle Inherent Technical Complexity Internally

Network issues, API quirks, large dataset sorting, search optimisation, state management, and animation logic are all developer responsibilities. Users should never feel this complexity.

::: note To Sum Up

Every process contains unavoidable complexity. Your job as a developer is to handle it behind the scenes so the user experiences the simplest possible interaction.

:::

---

## 10.0 Peak End Rule*

In 1993, Daniel Kahneman, Barbara Fredrickson, Charles Schreiber, and Donald Redelmeier invited volunteers into a lab for what sounded like a simple experiment. The task was straightforward: place a hand into a container of painfully cold water (Kahneman et al., 1993)

In the first round, participants kept their hand in 14°C water for 60 seconds. It was uncomfortable, sharp, and unpleasant but after one minute, it was over.

In the second round, they again endured 60 seconds in 14°C water. But this time, they were asked to keep their hand in for an extra 30 seconds. The temperature was raised slightly to 15°C. Still cold. Still unpleasant. Just slightly less intense.

Objectively, the second experience was worse. It lasted 90 seconds instead of 60. More total pain. More suffering.

Later, the researchers asked a simple question:

If you had to repeat one of the trials, which would you choose?” Surprisingly, most participants chose the longer one.

Why would anyone choose more pain?

The researchers realised something profound: people don’t remember experiences by calculating total discomfort. Instead, the mind summarizes the experience using just two key moments — the most intense point (the peak) and the final moment (the end).

In both trials, the peak pain was the same: 14°C. But the longer trial ended slightly better, at 15°C. That small improvement at the end reshaped how the entire episode was remembered. The participants’ “experiencing self” suffered more during the longer trial. But their “remembering self” preferred it because it ended on a less painful note.

From this, the researchers introduced what became known as the Peak–End Rule: we judge experiences largely by their most intense moment and how they finish, not by how long they last.

Since people largely judge an experience by how it ends, developers should focus on designing satisfying confirmation screens and smooth exit interactions. You should concentrate less on making every single moment perfect and instead prioritise optimising the peak and final moments.

A negative ending can overshadow an otherwise good experience, so carefully avoid frustrating final steps such as unexpected fees or confusing confirmations.

Emotional intensity strongly shapes memory, which is why many apps incorporate celebration animations, rewards, or success messages at key moments to leave a lasting positive impression.

### Design takeaway from Peak End Rule

#### People Judge Experiences by the Peak and the Ending — Not the Total Duration

Users don’t remember every moment. They remember the most intense point and how the experience ends. A slightly better ending can completely reshape how the entire interaction is remembered.

#### Prioritise Strong, Positive Endings in Your UX Flows

A smooth final step, a clear confirmation, or a satisfying success screen leaves a disproportionately strong impression. A bad ending can overshadow an otherwise great experience.

#### Design for Emotional Peaks at Key Moments

Celebration animations, rewards, checkmarks, and success messages create memorable emotional spikes. These peaks anchor the experience in the user’s memory.

#### Don’t Try to Perfect Every Moment — Perfect the Right Moments

Optimise the peak and the end of the journey. These two moments define how users recall the entire interaction.

#### Avoid Negative Surprises at the Finish Line

Unexpected fees, confusing confirmations, or friction at the last step can ruin the memory of the whole process. Protect the ending carefully.

::: note To Sum Up

We judge experiences largely by their most intense moment and how they finish, not by how long they last.

:::

---

## 11.0 Postel’s Law*

Jon Postel’s famous principle – “Be conservative in what you send, be liberal in what you accept” –  is a philosophy of kindness in software design. At its core, the principle argues that systems should be generous with what they accept from users, yet disciplined and predictable in what they output.

When developers follow this approach, users feel supported and understood. When they don’t, users feel punished for being human.

A user’s input is rarely perfect. People type quickly, make mistakes, follow their own habits, or rely on formats familiar to them. A robust system embraces this reality. It accepts messy, human input and quietly transforms it into clean, standardized data.

Real people don't think in strict formats. They write dates the way they learned in school, type phone numbers the way they say them aloud, and enter names and addresses in whatever structure feels natural to them.

A rigid system will reject anything that doesn’t match its narrow expectations, but a robust system, by contrast, adapts to the user.

Consider dates. A brittle interface might demand MM/DD/YYYY and reject everything else. A more humane system accepts a wide range of formats — “1 May 2024,” “2024‑05‑01,” “05/01/24,” or “May 1st, 2024” — and quietly converts them into a standard internal representation. This is where the complex handling described by Tesla's Law comes into play (Shifting complexity to the system, rather than the user).

Phone numbers follow the same pattern. People might enter (555) 123 4567, 555‑123‑4567, 5551234567, or +1 555 123 4567. A fragile system throws errors. A robust one parses all of them using libraries like libphonenumber and moves on.

Addresses are equally varied. “221B Baker St,” “221‑B Baker Street,” and “221 Baker St., Apt B” all refer to the same place. A forgiving system normalizes these instead of rejecting them.

Even names can be surprisingly complex. Hyphens, apostrophes, multiple words, and titles are all part of real human identity. Rejecting “O’Connor,” “Jean‑Luc,” or “Dr. Sarah Lee” is not just technically incorrect — it's disrespectful to the user.

Search bars offer another clear example. A strict search bar demands perfect spelling and exact phrasing. A robust one handles typos (“restuarant”), partial words (“resta”), synonyms (“food places”), and natural language (“where can I eat nearby”). It meets the user where they are instead of forcing them to think like a machine.

Currency should be normalized to a clear format such as GBP 5.00, no matter whether the user typed “£5,” “5 pounds,” or “5 GBP.”

Even file uploads benefit from standardization: whether the user uploads .jpeg, .jpg, .JPG, or .JPEG, the system should store everything as .jpg.

Error messages follow the same principle. Vague feedback like “Invalid password” leaves users confused and frustrated.

A clear, conservative message — “Incorrect password. Please try again.” — respects the user’s time. And instead of hiding password requirements, the system should state them upfront: minimum eight characters, at least one uppercase letter, at least one number.

Predictability reduces friction.

Because users inevitably make mistakes or enter data in unexpected ways, developers should design input fields that are tolerant rather than brittle. This means accepting flexible formats, offering autocorrect or intelligent parsing, and using forgiving validation rules that interpret the user’s intent instead of rejecting their effort.

Clear instructions, tooltips, and visible requirements should appear before submission so users understand what the system expects without trial and error.

When errors do occur, the interface should handle them gently—never crashing, and never forcing the user to start over.

Even simple variations, such as phone numbers typed with spaces, dashes, or parentheses, should be accepted and normalized behind the scenes.

By embracing flexibility on the input side and clarity on the output side, developers create systems that feel humane, resilient, and respectful of the way real people actually behave.

### Design Takeaway from Postel's Law

#### Accept Messy Human Input, Output Clean Structured Data

Users type dates, names, phone numbers, and addresses in unpredictable ways. A humane system accepts this variability and quietly normalises it into a consistent internal format.

Rigid interfaces punish users for being human. Robust interfaces interpret intent — handling typos, partial matches, synonyms, and natural language without complaint.

Also accept variations in spacing, punctuation, casing, and structure. Let users type naturally — the system should handle the complexity, not them.

#### Be Flexible With Input, Be Strict With Output

This is the heart of Postel’s Law. Let users express information naturally, but ensure your system stores and displays it in a predictable, standardised way.

#### Use Intelligent Parsing and Autocorrection to Reduce Errors

Libraries like libphonenumber, fuzzy search, and natural‑language parsers allow systems to accept a wide range of formats while still producing clean, reliable data.

#### Normalise Everything Behind the Scenes

Dates, phone numbers, currency, file extensions, and addresses should all be standardised internally. This prevents messy data and reduces downstream cleanup work.

#### Provide Clear, Predictable Feedback

Error messages should be specific and helpful. Requirements should be visible upfront. Users should never be surprised, confused, or forced to start over.

#### Combine Postel’s Law With Tesler’s Law

Shift complexity to the system. Intelligent handling of messy input reduces cognitive load, improves usability, and ensures consistent, high‑quality data.

::: note To Sum Up

A rigid system will reject anything that doesn’t match its narrow expectations, but a robust system, by contrast, adapts to the user.

:::

---

## 12.0 Doherty Threshold*

The Doherty Threshold is a principle in human–computer interaction which proposes that systems should respond quickly enough to keep users actively engaged (Mod 2024).

When response times stay below a certain limit, users remain focused and productive. But once performance already meets this optimal responsiveness level, making the system even faster or adding extra capability doesn't significantly enhance satisfaction or efficiency.

The idea was introduced by Walter J. Doherty in 1976 in his paper “A Comparison of Programming Systems and Doherty Threshold.” His research showed that maintaining rapid system feedback fast enough to sustain continuous interaction has a stronger impact on productivity than simply increasing system power or features beyond that point.

Doherty proposes that this shouldn't be greater than 400ms Rule: If the system responds within this window, the user feels in total control. If the response takes longer, the user's attention begins to wander, and their "train of thought" is broken.

The challenge, of course, is that not every operation can realistically complete within 400ms. Some tasks require heavy computation, large network calls, or complex rendering. This is where the concept of perceived performance becomes essential.

Even when the system can't finish the work quickly, it can feel fast by responding instantly at the UI level. Developers can achieve this illusion of speed through a combination of thoughtful design patterns and disciplined engineering practices.

On the technical side, performance begins with reducing unnecessary work. Keeping the number of HTML elements low helps the browser render faster. Rendering only the visible portion of long lists prevents the Document Oject Model (DOM) from becoming bloated. Splitting scripts and deferring non‑critical code ensures that essential interactions load first.

Using CSS transforms and opacity changes avoids expensive layout recalculations. Lazy‑loading images, videos, and scripts ensures that the interface becomes interactive long before all assets are downloaded.

These optimizations don’t just improve raw speed — they create the foundation for interfaces that feel responsive.

### Design Takeaways from Doherty Threshold

**Instant Feedback**: When a user clicks a button, provide a visual change (like a button press animation or a spinner) immediately, even if the background task takes longer.

**Skeleton Screens**: Use placeholder blocks that mimic the layout of the page while data loads. This makes the app feel like it is responding instantly.

**Progressive Loading**: Load text and basic structures first, then "pop in" high-resolution images later.

**Optimistic UI**: When a user hits "Save," don't wait for the server. Update the UI instantly (Doherty) and handle the "messy" data formatting on the backend (Postel).

**Live Inline Validation**: Show a green checkmark or a helpful error message as the user types. This keeps them below the 400ms "thought-break" limit.

**Debouncing**: In search bars, start showing results after a few keystrokes so the user feels the app is "predicting" their needs.

::: note To Sum Up

When response times stay below a certain limit, users remain focused and productive. But once performance already meets this optimal responsiveness level, making the system even faster or adding extra capability doesn't significantly enhance satisfaction or efficiency.

:::

---

## 13.0 Serial Position Effect (Primacy and Recency)*

Murdock’s study investigated how the position of a word in a list affects recall, known as the serial position effect. He presented 103 psychology students with lists of 10 to 40 words, one at a time, at either 1 or 2 seconds per word (McLeod, 2025).

Participants were divided into six groups, each experiencing a different combination of list length and presentation rate, and were asked to recall as many words as possible in any order.

The results showed that participants were most likely to remember words at the beginning of the list (primacy effect) and at the end of the list (recency effect), while words in the middle were recalled less often. The recency effect persisted even in longer lists, and the middle section of the recall curve formed a flat asymptote.

Murdock explained this using the multi-store model of memory: early words were rehearsed and transferred to long-term memory, last words remained in short-term memory, and middle words were neither sufficiently rehearsed nor retained, leading to poorer recall.

The experiment demonstrated that memory performance varies systematically with the position of information in a sequence.

This is the reason why the most important information or actions should never be buried in the middle.

As a developer, you should put your most critical navigation links (like "Home" or "Dashboard") at the far left or the top of a list. In a pricing table, put the most popular or recommended plan on the Place "Final Actions" (like "Log Out," "Cart," or "Support") at the end of a menu or the far right of a navigation bar.

In a long onboarding flow, put the most exciting benefit of the app on the very last slide so the user enters the app feeling motivated.

Avoid placing highly important buttons in the middle of a row. If you have a row of 7 buttons, the user is statistically likely to overlook the 4th one.

### Design Takeaways Serial Position Effect

#### Place Critical Items at the Beginning or End — Never the Middle

Users reliably remember the first and last items in any sequence (primacy and recency). Anything placed in the middle is statistically more likely to be forgotten or ignored. Also, actions such as “Log Out,” “Cart,” “Support,” or “Checkout” should sit at the far right or bottom — the natural recency position.

#### Put Essential Navigation Links at the Far Left or Top

Links like “Home,” “Dashboard,” or “Overview” should appear at the start of a menu, where recall and recognition are strongest.

::: note To Sum Up

The results showed that participants were most likely to remember words at the beginning of the list (primacy effect) and at the end of the list (recency effect), while words in the middle were recalled less often.

:::

---

## 14.0 Occam’s Razor*

Although first articulated in the 14th century by the Franciscan friar William of Ockham, Occam’s Razor remains one of the most indispensable principles in a developer’s toolkit. In fact, skipping this law while discussing other theories and principles would be like skipping the glue that holds the entire framework together.

At its core, Occam’s Razor states that “among competing explanations, the simplest one is usually the best.”

For example, if two user interfaces achieve the same goal, the one with fewer visual elements is typically superior because it requires less processing power.

The fundamental takeaway for modern developers regarding Occam’s Razor is that complexity is a tax on the user’s cognitive resources.

In an era of information density, the developer's primary role is no longer to provide "more" features – rather, it's to curate the most direct path to a solution.

In practice, Occam’s Razor becomes a reminder to keep things as simple as possible. This “less is more” mindset shapes everything from navigation to forms.

A good rule for navigation is the Rule of Five: aim for three to five main menu items instead of a long, overwhelming list. This keeps choices clear and prevents users from freezing up when they see too many options.

The same idea applies to data entry. When you ask only for the information that truly matters, you respect the user’s time and reduce the chance of “form fatigue,” which is one of the biggest reasons people abandon sign‑ups or checkout flows.

Simplicity isn’t just elegant — it’s practical, humane, and far more effective.

### Design Takeaway from Occam's Razor

#### Choose the Simplest Effective Solution

When two designs achieve the same goal, the one with fewer elements is almost always better. Simplicity reduces cognitive load and speeds up user decision‑making.

#### Simplicity Is Not Just Aesthetic — It’s Humane

Clear, minimal interfaces respect the user’s time, reduce friction, and make the product feel effortless. Simplicity is both a design strategy and an act of empathy.

::: note To Sum Up

Simplicity isn’t just elegant — it’s practical, humane, and far more effective.

:::

---

## 15.0 Parkinson's Law

Occam’s Razor teaches us to prefer the simplest solution that works. But why do we so often end up with complex systems in the first place? That tendency is explained by another principle: Parkinson’s Law.

Parkinson’s Law states that "work expands to fill the time available for its completion". In design, this means projects often become overly complex or take longer than necessary if given too much time, resulting in inefficient, over-designed, or cluttered interfaces.

In design, this manifests as Feature Creep. If you give yourself three months to build an app, you will spend three months adding "nice-to-have" animations, extra settings toggles, and niche edge cases that nobody asked for and in reality, what you have added isn’t that important.

You just succeeded in adding layers of complexity that might ends up violating some of the laws we spoke about. Occam’s Razor reminds us that the simplest solution is often the most effective.

By being aware of Parkinson’s Law and the tendency for work to expand, developers can manage their time intentionally and focus only on what truly matters.

### Design Takeaway for Parkinson's law

#### Set Clear Constraints to Keep Designs Focused

Intentional time limits and scope boundaries prevent over‑designing. Constraints force clarity, prioritisation, and simplicity.

#### Build Only What Truly Matters for the User

Parkinson’s Law reminds you to resist the urge to fill time with unnecessary features. Focus on the core experience, not the edge cases nobody asked for.

#### Use Occam’s Razor to Counterbalance Parkinson’s Law

As work expands, complexity grows. Occam’s Razor pulls you back to the simplest effective solution. Together, the two principles prevent bloated, over‑engineered products.

::: note To Sum Up

Work expands to fill the time available for its completion

:::

---

## Conclusion

Human-centered design is deeply influenced by a set of psychological principles that explain how users perceive, process, and interact with digital systems.

Among these, Fitts’s Law establishes that the time required to acquire a target depends on its size and distance. In practice, this means that larger and closer elements are easier and faster to interact with.

To apply this in practice, developers should make primary call-to-action elements prominent, large, and easily reachable – especially in mobile interfaces where thumb accessibility is critical.

Closely related to decision-making is Hick’s Law, which states that the more choices a user is presented with, the longer it takes to make a decision. Excessive options can overwhelm users and lead to decision fatigue.

To address this, developers should simplify interfaces, minimise unnecessary options, and guide users through processes step-by-step rather than presenting everything at once.

Another important cognitive principle discussed is Miller’s Law, which suggests that the average person can hold approximately seven (plus or minus two) items in working memory at a time. This limitation highlights the need to present information in manageable chunks.

By breaking content into smaller groups and avoiding information overload, developers can improve comprehension and usability.

User expectations are strongly shaped by Jakob’s Law, which says that people spend most of their time on other websites and therefore expect similar patterns across digital products.

Instead of reinventing basic interactions, developers should follow familiar conventions such as placing the logo in the top‑left, the shopping cart in the top‑right, and keeping scrolling behaviour predictable.

But innovation is still possible where it truly adds value. As we discussed with the Aesthetic‑Usability Effect, users are far more tolerant of new or unusual design patterns when the interface is visually appealing and thoughtfully crafted.

The Gestalt Principles provided additional insight into how users visually organise information. The principle of proximity suggests that objects placed close together are perceived as related, so grouping related elements improves clarity. Similarity indicates that elements with consistent colours, shapes, or styles are seen as belonging together, reinforcing visual hierarchy and function. Closure explains that users can perceive incomplete shapes as complete, allowing for minimalistic designs where the brain fills in missing details. Continuity highlights that users naturally follow smooth visual paths, meaning layouts should guide the eye logically through alignment and structure.

We also looked at The Von Restorff Effect which emphasizes that elements which stand out are more likely to be remembered. By using contrast in colour, size, or design, important features such as buttons or alerts can capture user attention.

Managing complexity was addressed by Tesler’s Law, which asserts that every system has inherent complexity that cannot be eliminated but only managed.

Developers must therefore shift complexity away from the user by simplifying interfaces while handling intricate processes behind the scenes.

The Zeigarnik Effect reveals that people remember unfinished tasks better than completed ones, creating a sense of mental tension. This can be leveraged by incorporating progress indicators, checklists, and reminders that encourage users to complete tasks.

Similarly, the Peak-End Rule suggests that users judge an experience based on its most intense moment and its conclusion. Developers should create memorable highlights and ensure a smooth, satisfying ending to user journeys.

We also discussed the Goal-Gradient Effect, which explains that users become more motivated as they approach the completion of a task. By showing progress –such as indicating that a process is “80% complete” – and breaking tasks into stages, developers can encourage users to finish what they have started.

In terms of system interaction, Postel’s Law advises developers to be flexible in accepting user input while maintaining strict standards for output. This means allowing different input formats while ensuring consistent and reliable system responses.

Performance is equally important, as highlighted by the Doherty Threshold, which shows that productivity increases when system response times stay under 400 milliseconds. Fast systems keep users engaged and create a sense of ease.

This means that developers should focus on building interfaces that feel instant, even when real processing takes longer, by combining smart engineering practices with thoughtful design patterns that maintain the illusion of speed.

Memory and attention are further explained by the Serial Position Effect, where users tend to remember the first and last items in a sequence more than those in the middle. Developers should position key information or actions at the beginning or end of lists.

Simplicity is reinforced by Occam’s Razor, which argues that the simplest solution is often the most effective. Eliminating unnecessary features reduces friction and enhances usability, and we further discussed about Parkinson’s Law, which suggests that tasks expand to fill the time available, indicating the importance of setting constraints such as deadlines or timers to encourage timely action.

These principles collectively highlight the importance of simplicity, clarity, performance, and user psychology in design. By applying them thoughtfully, developers can create intuitive, efficient, and engaging user experiences that align with both human behaviour and user expectations.

::: info References

<SiteInfo
  name="Fitts's Law and Its Applications in UX"
  desc="The movement time to a target depends on the size of the target and the distance to the target."
  url="https://nngroup.com/articles/fitts-law//"
  logo="https://media.nngroup.com/static/img/favicon.ico"
  preview="https://media.nngroup.com/media/articles/opengraph_images/FittsLaw-Application_89.png"/>

<SiteInfo
  name="What is Gestalt Psychology: Theory & Principles"
  desc="Gestalt psychology is a school of thought that looks at the human mind and behavior as a whole. It suggests that structures, perceived as a whole, have specific properties that are different from the sum of their individual parts. Founded by Max Wertheimer, Wolfgang Köhler, and Kurt Koffka in early 20th-century Germany, it helped shape modern ideas about perception, problem-solving, and how we make sense of the world."
  url="https://simplypsychology.org/what-is-gestalt-psychology.html/"
  logo="https://simplypsychology.org/wp-content/uploads/cropped-logo-192x192.jpg"
  preview="https://simplypsychology.org/wp-content/uploads/gestalt-examples.jpg"/>


<SiteInfo
  name="The Zeigarnik Effect Is Why You Keep Thinking of Unfinished Work"
  desc="The Zeigarnik effect refers to our tendency to better recall things we haven't yet finished. Learn how this effect influences what we remember."
  url="https://verywellmind.com/zeigarnik-effect-memory-overview-4175150/"
  logo="https://verywellmind.com/favicon.ico"
  preview="https://verywellmind.com/thmb/urrrS1Pga5OTgJelySPs63Zz148=/2121x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-665222464-5b995af6c9e77c00502745cd.jpg"/>

<SiteInfo
  name="Evaluations of pleasurable experiences: The peak-end rule - Psychonomic Bulletin & Review"
  desc="Prior research suggests that the addition of mild pain to an aversive event may lead people to prefer and directly choose more pain over less pain (Kahneman, Fredrickson, Schreiber, & Redelmeier, 1993). Kahneman et al. suggest that pain ratings are based on a combination of peak pain and final pain. Similarly, people rate a happy life that ends suddenly as being better than one with additional years of mild happiness (Diener, Wirtz, & Oishi, 2001), even though the former objectively consists of less pleasure than the latter. Applying these concepts to material goods, we investigated the impact of positivity and timing on the retrospective evaluations of material goods. We found strong evidence that the peak-end rule applies to both material goods and pain."
  url="https://link.springer.com/article/10.3758/PBR.15.1.96/"
  logo="https://link.springer.com/oscar-static/img/favicons/darwin/favicon-de0c289efe.ico"
  preview="https://media.springernature.com/full/springer-static/cover-hires/journal/13423"/>

<SiteInfo
  name="Inverse Halo Nevus : Dermatologic Surgery"
  desc="An abstract is unavailable."
  url="https://journals.lww.com/dermatologicsurgery/fulltext/2006/06000/inverse_halo_nevus.25.aspx/"
  logo="https://journals.lww.com/dermatologicsurgery/PublishingImages/WKfavicon.ico"
  preview="https://images.journals.lww.com/dermatologicsurgery/SocialThumb.00042728-200606000-00025.F1-25.jpeg"/>

<SiteInfo
  name="Pilot Error, Chapanis and The Shape of Things to Come"
  desc="How Alphonse Chapanis, a young psychologist, saved the lives of WWII pilots through clever design."
  url="https://uxmag.com/articles/pilot-error-chapanis-and-the-shape-of-things-to-come/"
  logo="https://uxmag.com/wp-content/uploads/2021/07/cropped-android-chrome-512x512-1-1-192x192.png"
  preview="https://uxmag.com/wp-content/uploads/2023/08/1_v37LjXBzQplAW-9D4BNVSg-1024x608.webp"/>

<SiteInfo
  name="The subtlety of distinctiveness: What von Restorff really did - Psychonomic Bulletin & Review"
  desc="The isolation effect is a well-known memory phenomenon whose discovery is frequently attributed to von Restorff (1933). If all but one item of a list are similar on some dimension, memory for the different item will be enhanced. Modern theory of the isolation effect emphasizes perceptual salience and accompanying differential attention to the isolated item as necessary for enhanced memory. In fact, von Restorff, whose paper is not available in English, presented evidence that perceptual salience is not necessary for the isolation effect. She further argued that the difference between the isolated and surrounding items is not sufficient to produce isolation effects but must be considered in the context of similarity. Von Restorff’s reasoning and data have implications for the use of distinctiveness in contemporary memory research, where distinctiveness is sometimes defined as perceptual salience and sometimes as a theoretical process of discrimination. As a theoretical construct, distinctiveness is a useful description of the effects of differences even in the absence of perceptual salience, but distinctiveness must be used in conjunction with constructs referring to similarity to provide an adequate account of the isolation effect and probably any other memory phenomena."
  url="https://link.springer.com/article/10.3758/BF03214414/"
  logo="https://link.springer.com/oscar-static/img/favicons/darwin/favicon-de0c289efe.ico"
  preview="https://media.springernature.com/full/springer-static/cover-hires/journal/13423"/>

<SiteInfo
  name="When More Pain Is Preferred to Less: Adding a Better End - Daniel Kahneman, Barbara L. Fredrickson, Charles A. Schreiber, Donald A. Redelmeier, 1993"
  desc="Subjects were exposed to two aversive experiences: in the short trial, they immersed one hand in water at 14 °C for 60 s; in the long trial, they immersed the o..."
  url="https://journals.sagepub.com/doi/10.1111/j.1467-9280.1993.tb00589.x/"
  logo="https://journals.sagepub.com/pb-assets/Icons/sj-favicon-1685528515030.png"
  preview="https://journals.sagepub.com/pb-assets/Images/SJ_Twitter_Card-1724841642283.jpg"/>

<SiteInfo
  name="Doherty Threshold: UX Law of Swift Interactions"
  desc="That's the reaction of most users when they encounter a slow-loading website with minimal responsiveness. The Doherty Threshold helps solve these issues"
  url="https://blog.uxtweak.com/doherty-threshold//"
  logo="https://blog.uxtweak.com/wp-content/themes/uxtweak/public/assets/images/favicons/favicon-dark.ico"
  preview="https://blog.uxtweak.com/wp-content/uploads/2024/03/Group-2263.png"/>

```component VPCard
{
  "title": "The magical number seven, plus or minus two: Some limits on our capacity for processing information.",
  "desc": "APA PsycNet DoiLanding page",
  "link": "https://psycnet.apa.org/doiLanding?doi=10.1037%2F0033-295X.101.2.343/",
  "logo": "https://psycnet.apa.org/favicon/favicon.ico",
  "background": "rgba(44,114,183,0.2)"
}
```

<SiteInfo
  name="Hick’s law for choice reaction time: A review - Robert W Proctor, Darryl W Schneider, 2018"
  desc="In 1952, W. E. Hick published an article in the Quarterly Journal of Experimental Psychology, “On the rate of gain of information.” It played a seminal role in ..."
  url="https://journals.sagepub.com/doi/10.1080/17470218.2017.1322622/"
  logo="https://journals.sagepub.com/pb-assets/Icons/sj-favicon-1685528515030.png"
  preview="/pb-assets/Images/SJ_Twitter_Card-1724841642283.jpg"/>

<SiteInfo
  name="Hick’s Law | Laws of UX"
  desc="The time it takes to make a decision increases with the number and complexity of choices."
  url="https://lawsofux.com/hicks-law//"
  logo="https://lawsofux.com/icons/favicon.svg"
  preview="https://lawsofux.com/hicks-law/social.png"/>

<SiteInfo
  name="Goal-Gradient Effect | Laws of UX"
  desc="The tendency to approach a goal increases with proximity to the goal."
  url="https://lawsofux.com/goal-gradient-effect//"
  logo="https://lawsofux.com/icons/favicon.svg"
  preview="https://lawsofux.com/goal-gradient-effect/social.png"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Apply Academic Theories to Human-Centered Web Design [Full Handbook",
  "desc": "Have you ever abandoned an app right at the sign‑up page? Or felt uneasy navigating a website because the buttons were scattered randomly, the colors clashed, and the layout felt confusing and unneces",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-apply-academic-theories-to-human-centered-web-design-handbook.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
