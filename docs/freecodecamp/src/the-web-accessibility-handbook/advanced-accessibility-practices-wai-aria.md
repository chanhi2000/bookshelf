---
lang: en-US
title: "Advanced Accessibility Practices: WAI-ARIA"
description: Article(s) > (4/6) Everything You Need to Know About Web Acessibility 
category:
  - CSS
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - css
head:
  - - meta:
    - property: og:title
      content: Article(s) > (4/6) Everything You Need to Know About Web Acessibility
    - property: og:description
      content: "Advanced Accessibility Practices: WAI-ARIA"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/the-web-accessibility-handbook/advanced-accessibility-practices-wai-aria.html
date: 2025-03-19
isOriginal: false
author:
  - name: Kunal Nalawade
    url : https://freecodecamp.org/news/author/KunalN25/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1742318086251/103cec5f-3330-4559-8554-4ec76b16ec76.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Everything You Need to Know About Web Acessibility",
  "desc": "The web is a great place to access information and connect with people. It has opened up countless opportunities, making life more convenient in many ways. But not everyone experiences the web in the same way. Websites are difficult to use for people...",
  "link": "/freecodecamp.org/the-web-accessibility-handbook/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Everything You Need to Know About Web Acessibility"
  desc="The web is a great place to access information and connect with people. It has opened up countless opportunities, making life more convenient in many ways. But not everyone experiences the web in the same way. Websites are difficult to use for people..."
  url="https://freecodecamp.org/news/the-web-accessibility-handbook#heading-advanced-accessibility-practices-wai-aria"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1742318086251/103cec5f-3330-4559-8554-4ec76b16ec76.png"/>

As applications started to get bigger and more complex, developers started needing a new set of accessibility features. Semantic elements alone were not enough, especially for complex elements like date pickers and custom widgets.

Depending on semantic HTML does not help when content is updated dynamically on the web page. Nowadays, all websites built with JavaScript have content that isn’t loaded initially, but updated dynamically based on user interactions.

WAI-ARIA (Web Accessibility Initiative - Accessible Rich Internet Applications) was introduced to add more accessibility features wherever they were needed. It defines a set of HTML attributes that you can use to provide additional semantics to your website and improve accessibility.

In the following sections, you’ll learn which attributes were introduced and how you can use them to enhance accessibility.

---

## The `role` attribute

The `role` attribute helps add semantic information to non-semantic elements by defining their “role" on the web page. With roles, screen readers can accurately read non-semantic elements and help identify them for people with disabilities.

W3C defines several roles that you can use, depending on their purpose. But keep in mind that you should only use `role` when necessary. In most cases, it’s better to just use the right semantic elements like `<button>`, `<nav>`, `<header>`, and so on.

But, when semantic elements are not fulfilling your purpose, roles can help. So, let’s understand how to use them with some examples:

If you want to create a button with custom `div`, adding the `role` attribute specifies that this element is being used as a button.

```html
<div role="button" tabindex="0">Click Me</div>
```

When you test this with Mac’s VoiceOver (⌘+F5), it reads out the element as a button. As discussed before, always include the `tabindex` attribute.

But if you want to use a `div` instead of a button, you still need to add JavaScript functionality, as explained in the the [Keyboard Accessibility](/freecodecamp.org/the-web-accessibility-handbook/basic-accessibility-practices.md#keyboard-accessibility) section.

Another example is if you are writing a custom link. You can use the following role, so that the screen reader interprets this as a link:

```html
<div role="link">Visit our website</div>
```

Apart from interactive elements, `role` attribute can also be used to define elements as navigation menus, side bars, banners, etc. If you are using non-semantic elements for these purposes, always include a role, like the following:

```html
<div role="navigation">
  <!-- Navigation menu items -->
</div>
```

In this case, the screen reader announces this as a navigation area.

Also, if you have an element that serves as an alert for the user, including the following role makes the screen reader announce it as soon as it shows up on the screen, even if it doesn’t have focus:

```html
<div role="alert">
  Please respond to this alert
</div>
```

You can find the full list of available roles at [<VPIcon icon="fa-brands fa-firefox" />MDN Docs: WAI-ARIA Roles](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles).

---

## `aria-*` attributes

Apart from `role`, ARIA (Accessible Rich Internet Applications) defines extra attributes to enhance the accessibility of web applications. These attributes give screen readers more information about elements, helping people with disabilities better understand them.

If native semantic elements or the `role` attribute alone are not sufficient, `aria-*` attributes can provide extra context. You can find a full list of these attributes in [<VPIcon icon="fa-brands fa-firefox" />MDN Docs-ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes).

In the following sections, we’ll see how role and `aria-*` attributes can improve accessibility. We won’t cover all the attributes here, but we’ll focus on the most commonly used ones.

---

## Dynamic Content Updates

When a web page loads for the first time, its content is read out by the screen reader. But screen readers cannot capture dynamic content, that is content that gets added or removed.

For example, when a web page is showing live sport updates, it gets updated almost every minute. Screen readers will only read out the content displayed when the page is first rendered, but don’t show dynamic updates.

This is not really a problem for many users, but for people with visual impairments, screen readers may not be able to read the changes on the page. Most modern websites are dynamic in nature, so it’s important to consider accessibility of dynamic content updates.

Check out the [<VPIcon icon="fas fa-globe"/>aria-no-live](https://mdn.github.io/learning-area/accessibility/aria/aria-no-live.html) example from MDN Docs. It loads a new quote every 10 seconds, which you can see clearly as a user with no visual impairment. But the screen reader only reads the initial page content and does not announce the updates. This is not good for accessibility.

To fix this, WAI-ARIA provides the [<VPIcon icon="fa-brands fa-firefox" />`aria-live`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-live) attribute that makes the screen reader read out content that is updated. You can add this attribute to the element that contains the dynamic content.

It takes the following three values:

- `aria-live="off"`: Default value that means no content is read out
- `aria-live="polite"` Updates only announced when the user is idle
- `aria-live="assertive"`: Content read out as soon as it is updated.

Depending on the importance of the update, you can decide which value to use.

```html
<div aria-live="polite">
  <!-- Dynamic Content here -->
</div>
```

In this case, the screen reader waits till the user is done with their current task before announcing the update.

You can add more detail here. With the above attribute, only the text that is updated is read out. But, screen reader users may get confused as to which part of the page is being read out. So, it is helpful if the entire element is read out.

```html
<div aria-live="assertive" aria-atomic="true">
  <!-- Dynamic Content here -->
</div>
```

The [<VPIcon icon="fa-brands fa-firefox" />`aria-atomic`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-atomic) attribute tells screen readers to read out the entire element as a single atomic unit. This avoids confusion for visually impaired users. Check out the [<VPIcon icon="fas fa-globe"/>aria-live](https://mdn.github.io/learning-area/accessibility/aria/aria-live.html) example from MDN Docs with Mac’s VoiceOver (⌘+F5). It reads out the entire element when the content is updated.

---

## Form Validation and Errors

Let’s say you have added some validation to your form through JavaScript. When the validation fails, an error message gets added on the screen. For example, a required message shows up if you have missed a field.

The implementation for error handling involves creating an element containing an error message or a list of errors that render on certain conditions, depending on the JavaScript code. Just as we discussed in the previous section, the screen reader does not read out new content updates.

So, we should make sure that the screen reader reads out the error message as soon as it shows up, to let visually impaired users know that an error has been thrown. We can use the following attributes for this purpose:

```html
<div class="errors" role="alert" aria-relevant="all">
  <ul></ul>
</div>
```

The [<VPIcon icon="fa-brands fa-firefox" />`alert`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/alert_role) role does two things. It semantically identifies this element as a piece of important information. Secondly, this role turns the element into a [<VPIcon icon="fa-brands fa-firefox" />live](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions) region which means the screen reader is notified immediately if there are any changes.

The [<VPIcon icon="fa-brands fa-firefox" />`aria-relevant`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-relevant) attribute describes what changes need to be announced in a live region. The attribute takes a space-separated list of the following values:

- `additions`: Announces new content added to the live region
- `removals`: Content removed from the live region is read out
- `text`: Announces any modifications to existing content.

It also takes a value `all` which is a shorthand for `additions removals text`, meaning all three types of content are read out.

You can check the [<VPIcon icon="fas fa-globe"/>Form Validation Example](https://mdn.github.io/learning-area/accessibility/css/form-validation.html) from the MDN Docs.

Next, let’s see what to do if we want to mark certain fields as required. Normally, we’d add visual cues like a `*` and the following message at the top of the form:

```html
<p>Fields marked with an asterisk (*) are required.</p>
```

This is helpful for regular users, but visually impaired users may get confused as to which fields are required. To make it easier for them, we can use the [<VPIcon icon="fa-brands fa-firefox" />`aria-required`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-required) attribute.

```html
<input type="text" name="name" id="name" aria-required="true" />
```

With this attribute, the screen reader mentions this field as “required" while reading it out.

When you are creating input fields, it’s important to include a label, as some screen readers do not read out placeholder text. If you don’t want to include a label field, here are the following alternatives:

You can use the `aria-label` attribute to add labels to input fields that do not have a label associated with them.

```html
<input type="email" name="email" aria-label="Enter email" />
```

This attribute provides some text to be read out by a screen reader to describe the input field.

You can go one step further and use the `aria-labelledby` attribute that uses another element to act as a label for the input field. For example:

```html
<div>
  <span id="emailLabel">Enter your email</span>
  <input type="email" name="email" aria-labelledby="emailLabel" />
</div>
```

The screen reader reads out the text inside the `<span>` element to describe the input element. This is similar to having a `<label>` with a `for` attribute. You can also use this attribute to reference other interactive elements like `<button>` or `<a>` that do not have a label field to reference them.

Keep in mind that the `aria-labelledby` attribute only defines an accessible name for the element - it does not provide other functionality like clicking on the label to focus on the input element. It’s better to use `<label>` with a `for` attribute.

We have already discussed form labels in the [Interactive Elements](/freecodecamp.org/the-web-accessibility-handbook/basic-accessibility-practices.md#interactive-elements) section.

You’ve now seen some of the different attributes that WAI-ARIA offers and how they enhance accessibility. You can visit [<VPIcon icon="fa-brands fa-firefox" />MDN Docs: WAI-ARIA](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility/WAI-ARIA_basics#accessibility_of_non-semantic_controls_2) to check out additional details I may have missed.

Before we move on, remember one thing: *use WAI-ARIA only when necessary*. Usually, semantic elements are able to achieve majority of your accessibility goals. Don’t over-use WAI-ARIA as they might end up complicating your code.
