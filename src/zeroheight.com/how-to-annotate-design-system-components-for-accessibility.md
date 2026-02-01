---
lang: en-GB
title: "How to annotate design system components for accessibility"
description: "Article(s) > How to annotate design system components for accessibility"
icon: fas fa-pen-ruler
category:
  - Design
  - System
  - Article(s)
tag:
  - blog
  - zeroheight.com
  - design
  - system
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to annotate design system components for accessibility"
    - property: og:description
      content: "How to annotate design system components for accessibility"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/zeroheight.com/how-to-annotate-design-system-components-for-accessibility.html
prev: /academics/system-design/articles/README.md
date: 2025-12-15
isOriginal: false
author: Geri Reid
cover: https://zeroheight-wordpress-uploads.s3.amazonaws.com/wp-content/uploads/2025/10/blogpost-elyse-1-1.png
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
  name="How to annotate design system components for accessibility"
  desc="Geri Reid shares how accessibility annotations for design systems help teams document components, create reusable specs, and build inclusive products."
  url="https://zeroheight.com/how-to-annotate-design-system-components-for-accessibility"
  logo="https://zeroheight.com/favicon.ico"
  preview="https://zeroheight-wordpress-uploads.s3.amazonaws.com/wp-content/uploads/2025/10/blogpost-elyse-1-1.png"/>

Picture this: Your design system team is building a pagination component. You’re using the design system foundations, which have been carefully crafted to provide strong color contrast, responsive typography, and generous spacing. Accessible by default, right?

Nearly.

What's missing are the accessibility requirements.

Like: How do users navigate between pages using just a keyboard? How do screen readers announce the current page? What happens when a user zooms to 400%? These requirements are essential, yet they're often missing from designs.

Accessibility annotations bridge this gap.

This article outlines a systematic process for documenting accessibility requirements when you build design system components. We'll cover what to annotate, how to create reusable specifications, and why machine-readable formats unlock greater value than sticky notes and design tool callouts.

---

## Why annotate?

Annotations [<VPIcon icon="fa-brands fa-youtube"/>shift accessibility ‘left’](https://youtu.be/DP6GBoWNKZw?si=KJJPdetOQ1GgeiZr) in your process, catching issues early when decisions are cheap and straightforward to make. They get the team aligned before any code is written. You might know exactly what's needed, but if it's not documented, accessibility requirements can easily get overlooked by your team during the build.

Most importantly, annotations can help prevent accessibility debt at scale. Design systems amplify both good and bad decisions. When you specify accessibility properly at the component level, those thoughtful decisions scale across your entire product.

---

## A systematic approach to accessibility documentation

Accessibility annotations are most effective when they're integrated into your regular workflow. Here's a practical approach to follow that will set you up for success.

- **Research accessibility patterns.** Study proven implementations from established sources like the [<VPIcon icon="iconfont icon-w3c"/>ARIA Authoring Practices Guide](https://w3.org/WAI/ARIA/apg/patterns/), [<VPIcon icon="fas fa-globe"/>GOV.UK Design System](https://design-system.service.gov.uk/components/), and [<VPIcon icon="fas fa-globe"/>USWDS](https://designsystem.digital.gov/components/overview/). Also, [**test existing components**](/zeroheight.com/5-accessibility-checks-to-run-on-every-component.md) with screen readers, keyboard navigation, and at 400% zoom to understand best practices before you build.  
- **Get together.** Make accessibility annotations a standard part of speccing out a component. When it's built into the process, your team won't view it as extra work or something to tackle at the end. You may already have an established call you can use to bring the team together to refine tickets.  
- **Start with a visual reference.** Use your existing design or reference a component from another design system as a foundation. Even rough sketches work for initial discussions. What matters is having something visual to annotate.  
- **Document systematically.** Break down each interactive element, state, and behavior. Step through different user requirements at every touchpoint. Be methodical about it. Your future self (and every developer who uses this component) will appreciate you.

Let's walk through what to capture in your annotations, using a basic **Pagination** component as our example. Pagination is often used on news or ecommerce sites to help users quickly navigate through a set of results.

Pagination appears visually as a series of links. Most users click the arrow icons to advance or the page numbers to quickly skip ahead. But keyboard users and those using assistive tools, such as screen readers, need pagination to be structured and labeled thoughtfully to navigate it efficiently.

This example assumes that your design system already covers foundational requirements, such as color contrast, minimum touch target sizes, and legible, responsive typography. We'll focus on the accessibility requirements of components that you need to annotate. Let's go!

---

## What should you annotate?

### 1. Semantics, relationships, and structure

Semantics sound technical, but they're just the meaning that HTML and ARIA assign to elements. Think of it like labeling boxes in your house: Label a storage box ‘Winter Clothes’, and anyone knows what's inside without opening it. Web semantics work the same way. They tell assistive technologies that “this is a button”, “this is a navigation menu”, and “this text is a heading”, so users can navigate and interact with the page with confidence.

- **Why it matters:** Screen readers and assistive tech rely on semantics to understand a component's purpose and how it fits within the page hierarchy. Without proper semantics, users can't distinguish between clickable elements, understand relationships, or navigate efficiently.  
- **What to annotate:** HTML elements and ARIA roles, landmark regions, heading hierarchy, grouping relationships, and structural patterns that create meaning for assistive technologies. See [<VPIcon icon="fas fa-globe"/>WebAIM](https://webaim.org/techniques/semanticstructure/) and [<VPIcon icon="fa-brands fa-firefox"/>MDN docs](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility/HTML) for good explainers.

::: tip Pagination example

- Wrap pagination in a `<nav aria-label="Pagination">` element to define a navigation region. The component will announce to screen readers as ‘pagination, navigation’ and appears in the landmarks menu for quick access.
- Each page number should be a link: `<a href="">`.
- Group links inside an unordered list: `<ul>`.

![Diagram showing the semantic structure of a pagination component.](https://zeroheight-wordpress-uploads.s3.amazonaws.com/wp-content/uploads/2025/12/Pagination1-1.png)

:::

### 2. Keyboard interactions

Keyboard interactions define how users navigate and operate your interface without a pointing device.

- **Why it matters:** Not everyone uses a mouse. Some users rely exclusively on keyboards, while others prefer keyboard shortcuts for increased efficiency.  
- **What to annotate:** Tab order sequence, which keys trigger which actions, focus management between states, and any keyboard shortcuts or alternative navigation patterns.

::: tip Pagination example

- <kbd>Tab</kbd> and <kbd>Shift</kbd>+<kbd>Tab</kbd> move sequentially through controls in a logical order.
- <kbd>Enter</kbd> or <kbd>Space</kbd> activates the focused link or button.
- Disabled controls are skipped in the tab order.
- Provide a distinct visual hover style and a focus indicator that achieves a contrast ratio of at least 3:1.

![Diagram showing the focus order of a pagination component.](https://zeroheight-wordpress-uploads.s3.amazonaws.com/wp-content/uploads/2025/12/image.png)

:::

### 3. Zoom and responsive behavior

Users interact across a variety of screen sizes, and components need to adapt thoughtfully.

- **Why it matters:** People with low vision may zoom in or increase type size at the browser or device level. Components must remain functional without horizontal scrolling or loss of information.  
- **What to annotate:** Reflow behavior at different zoom levels, responsive breakpoint behavior, and how text overflows or truncates.

::: tip Pagination example

- Support up to 400% zoom without losing information.
- Consider a compact view to avoid horizontal scrolling on small viewports or when zoomed.
- Keep touch targets at least 44 × 44 px.

![Diagram showing minimum touch target sizes and a compact view when zoomed into a pagination component.](https://zeroheight-wordpress-uploads.s3.amazonaws.com/wp-content/uploads/2025/12/image-1.png)

:::

### 4. States and feedback

Users need clear feedback about their current location, available actions, and system responses.

- **Why it matters:** If states are not communicated clearly, users can become disoriented or miss critical system changes.  
- **What to annotate:** Visual and programmatic states for default, hover, focus, active, disabled, and loading states where applicable. Include how state changes are announced to screen readers and whether announcements are immediate or polite.

::: tip Pagination example

- Add `aria-current="page"` to the active page, so screen readers can announce it.
- Add `aria-disabled="true"` to disabled links.

![Diagram showing ARIA states for page links in a pagination component.](https://zeroheight-wordpress-uploads.s3.amazonaws.com/wp-content/uploads/2025/12/image-2.png)

:::

### 5. Labels and instructions

Every interactive element needs a text-based name that explains its purpose.

- **Why it matters:** Clear, meaningful labels help users understand what each element does and how to interact with it.  
- **What to annotate:** Accessible names for all interactive elements, descriptive text for complex controls, alt text for icons and images, error messages, and instructional content that may not be visually apparent. Include whether labels should be visible text or programmatic.

::: tip Pagination example

- Add descriptive labels for arrow controls, such as `aria-label="Previous page"` and `aria-label="Next page"`, which do not have a visible text label.
- Use `aria-label="Page {number}"` to make it explicit that the numbers are links to page numbers. The screen reader will announce “Page 5” rather than just announcing the number.

![Diagram showing ARIA labels for page links in a pagination component](https://zeroheight-wordpress-uploads.s3.amazonaws.com/wp-content/uploads/2025/12/Pagination5.png)

:::

### 6. Motion, animation, and timing

This covers anything that moves, animates, transitions, auto-plays, or changes over time.

- **Why it matters:** Some users struggle with motion or find it disorientating, and some just prefer static screens. Motion can trigger vestibular disorders, while timed content can be missed by users who need more time to process information.  
- **What to annotate:** Reduced motion alternatives, animation duration limits, auto-play controls, timeout behaviors, and focus management during transitions. Document any content that flashes or moves automatically.  

::: tip Pagination example

- If page changes animate, respect the “prefers-reduced-motion” user setting.

:::

---

## How to record annotations

### Design annotation kits

Our design tools don't have space for essential accessibility information. Much of it is non-visual, so it’s easy to overlook during implementation. Design annotation kits offer a solution to this.

There are some excellent open-source examples shared in community files that you can tailor to your organization's needs. Check out the [<VPIcon icon="fa-brands fa-figma"/>CVS Health kit](https://figma.com/community/file/1311421011482282592/web-accessibility-annotation-kit) on Figma and [<VPIcon icon="iconfont icon-penpot"/>Stéphanie Walter's kit](https://penpot.app/penpothub/libraries-templates/accessibility-documentation) on PenPot, for example. And if you're looking for inspiration on how to use annotation kits, watch Jan Maarten and Daniel Henderson-Ede's talk on how [<VPIcon icon="fa-brands fa-youtube"/>different design teams annotate for accessibility](https://youtube.com/live/O1GmngpGokU?si=Y6uxWmX1Z6pxfRDD) at 2025’s Inclusive Design 24.
  
Design annotations can be helpful discussion starters. But the trouble with sticky-note annotations is that they can get left behind once development begins. They're also not reusable. Every new component means starting from scratch, re-documenting the same accessibility patterns you've already specified.  
  
Recording annotations in a reusable way can provide more value.

### Create reusable documentation

Moving beyond static annotations in design files opens up powerful possibilities for scaling accessibility knowledge across your design system.

- **Text-first specification:** In mature design systems with tokenized values, text-based component specs often prove faster than visual annotations and enable quicker implementation cycles.  
- **Structured accessibility data:** If you record accessibility annotations in machine-readable formats, such as JSON or markdown tables, they become reusable. This transforms annotations from sticky notes into queryable, testable records.  
- **AI-powered documentation:** Machine-readable formats unlock AI integration. Tools like [<VPIcon icon="iconfont icon-zeroheight"/>zeroheight's MCP Server](https://help.zeroheight.com/hc/en-us/articles/39914754674843-Using-the-zeroheight-MCP-server) could surface accessibility requirements when consumers ask about components.  
- **Automated testing hooks:** You could even structure annotations to generate automated acceptance criteria, reducing the gap between specification and validation.  
- **Cross-platform portability:** Specifications can be shared across teams working on different platforms to help maintain consistent accessibility patterns, whether you're building for web, iOS, or Android.

Here's an example of how structured annotations might look for our pagination component:

```json
{
  "pagination": {
    "semantics": {
      "element": "nav",
      "role": "navigation",
      "ariaLabel": "Pagination",
      "structure": "ul > li > a[href]",
    },
    "keyboard": {
      "navigation": ["tab", "shift+tab"],
      "activation": ["enter", "space"],
      "skip": ["disabled controls"]
    },
    "zoom": {
      "reflowAt400Percent": true,
      "avoidHorizontalScroll": true,
      "touchTargetMin": "44x44px"
    },
    "states": {
      "active": "aria-current=page",
      "disabled": "aria-disabled=true"
    },
    "labels": {
      "previous": "aria-label=Previous page",
      "next": "aria-label=Next page",
      "pageLinks": "aria-label=Page {number}"
    },
    "motion": {
      "prefersReducedMotion": true
    }
  }
}
```

When annotations repeat across components, you could even define them as accessibility tokens – reusable, portable values defined just like color or spacing tokens.

---

## Let's wrap up

Make accessibility annotations part of your component specification process. Annotations create cross-team alignment on accessibility requirements before any code is written.  
  
Choose a format that suits how your team likes to work. Sticky notes and callouts can be a great conversation starter between design and engineering, while machine-readable documentation could unlock automation, AI integration, and cross-platform consistency.  
  
A single design system component can't be 'accessible' in isolation, but thinking about your user needs and technical implementation from the outset will set your consuming teams up for success. The invisible requirements you document today become the inclusive experiences your users depend on tomorrow.

### Resources

<SiteInfo
  name="A Designer’s Guide to Documenting Accessibility & User Interactions by Stéphanie Walter"
  desc="Why, what and how designers should document accessibility requirements and user interactions to make product better and more inclusive"
  url="https://stephaniewalter.design/blog/a-designers-guide-to-documenting-accessibility-user-interactions//"
  logo="https://stephaniewalter.design/wp-content/themes/stephaniewalter/assets/favicons/favicon-16x16.png"
  preview="https://stephaniewalter.design/wp-content/uploads/2022/09/og-Documenting-Accessibility-Designers-1.jpg"/>

```component VPCard
{
  "title": "Web: How to document the screen reader user experience - Accessibility, Your Team and You",
  "desc": "User experience designers guide - How to document the screen reader user experience for web content. Using your visual as a starting point, we’ll take you step by step through how to document the screen reader UX introducing concepts along the way.",
  "link": "https://bbc.github.io/accessibility-news-and-you/guides/screen-reader-ux.html/",
  "logo": "https://bbc.github.io/favicon.ico",
  "background": "rgba(159,134,68,0.2)"
}
```

<SiteInfo
  name="Accessibility annotation kits only annotate"
  desc="Liking an idea does not mean the idea is exempt from criticism."
  url="https://ericwbailey.website/published/accessibility-annotation-kits-only-annotate/"
  logo="https://ericwbailey.website/static/favicons/favicon.svg"
  preview="https://ericwbailey.website/img/posts/accessibility-annotation-kits-only-annotate/share-image-facebook.png"/>

*For advice on annotating a pagination component for accessibility, I took inspiration from these excellent examples:*

<SiteInfo
  name="A Quick Primer on Accessible Pagination - AFixt"
  desc="Pagination is a common feature across many websites, from news archives and product listings to blogs and search results. Despite its simplicity on the surface, pagination is one of those UI patterns that can be surprisingly nuanced when it comes to accessibility. Most developers implement it using visual styling alone, assuming it “just works.” Unfortunately, […]"
  url="https://afixt.com/a-quick-primer-on-accessible-pagination//"
  logo="https://afixt.com/favicon.ico"
  preview="https://afixt.com/wp-content/uploads/2023/11/logo-light-png.png"/>

<SiteInfo
  name="Pagination nav"
  desc="How to code and test an accessible pagination nav for Web"
  url="https://atomica11y.com/accessible-web/pagination//"
  logo="https://atomica11y.com/assets/favicon/favicon.ico"
  preview="https://atomica11y.com/assets/favicon/og-preview.png"/>

<SiteInfo
  name="Pagination"
  desc="Paginated content is any content split into multiple pages determined only by a specific amount of content per page, not split by any meaningful attribute, like feature or subject or step. Search results and article collections are often paginated. Readers use the pagination component to move from page to page in paginated content, or directly to the first or last page of the paginated set."
  url="https://designsystem.digital.gov/components/pagination//"
  logo="https://designsystem.digital.gov/assets/img/favicons/favicon-192.png"
  preview="https://designsystem.digital.gov/img/uswds-logo/lg-black.png"/>

::: info

Big thanks to [Maryia Radchuk (<VPIcon icon="fa-brands fa-linkedin" />`mariya-radchuk`)](https://linkedin.com/in/mariya-radchuk/), Senior Web UI Engineer at Just Eat Takeaway.com, for feedback on this article.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to annotate design system components for accessibility",
  "desc": "Geri Reid shares how accessibility annotations for design systems help teams document components, create reusable specs, and build inclusive products.",
  "link": "https://chanhi2000.github.io/bookshelf/zeroheight.com/how-to-annotate-design-system-components-for-accessibility.html",
  "logo": "https://zeroheight.com/favicon.ico",
  "background": "rgba(255,72,82,0.2)"
}
```
