---
lang: en-US
title: "Basic Accessibility Practices"
description: Article(s) > (2/6) Everything You Need to Know About Web Acessibility 
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
      content: Article(s) > (2/6) Everything You Need to Know About Web Acessibility
    - property: og:description
      content: "Basic Accessibility Practices"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/the-web-accessibility-handbook/basic-accessibility-practices.html
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
  url="https://freecodecamp.org/news/the-web-accessibility-handbook#heading-basic-accessibility-practices"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1742318086251/103cec5f-3330-4559-8554-4ec76b16ec76.png"/>

Accessibility is not just an added feature on top of a website you’ve already developed. It is a practice that needs to be followed throughout the development process. Whenever you are creating content on the web page, ask yourself if it is really accessible.

Another important point is that accessibility is not just for people with impairments. It benefits everybody by making a website easier to use, thus improving overall user experience.

How do you achieve good accessibility? Well, there are some practices that you should follow while writing HTML, CSS, and JavaScript code. We’ll discuss some basic practices in this section.

Before we get into it, let’s start by understanding what semantic and non-semantic HTML tags are:

---

## Semantic and Non-semantic HTML

Non-semantic HTML tags do not convey specific meaning or purpose. They can be used for anything, depending on the CSS styling and JavaScript functionality. Examples of non-semantic tags are: `<div>` and `<span>`. These tags are mostly used as containers for wrapping other elements.

Semantic HTML tags clearly describe their purpose to the browser and the developers through their names. They improve code readability and also help with [<FontIcon icon="fas fa-globe"/>SEO (Search Engine Optimisation)](https://seo.co/semantic-html/). Examples of semantic tags include: `<button>`, `<a>`, `<header>`, `<footer>`.

You can find a list of all semantic elements [<FontIcon icon="fa-brands fa-firefox"/>here](https://developer.mozilla.org/en-US/docs/Glossary/Semantics#semantic_elements).

### Importance of using semantic HTML

An essential part of accessibility is using the correct HTML element for its intended purpose. This means, for example, using a `<button>` tag when you want to render a button.

But why use semantic elements? After all, you can use CSS to make a `<div>` look like a button. True, but using semantic elements is important for the following reasons:

- Semantic elements have built-in styles and functionality that you otherwise would need to add through CSS and JavaScript. This makes them easier to use.
- They make the code easier to read and maintain, as you can actually see the elements being used rather than seeing a bunch of divs everywhere.
- Screen readers can easily read and interpret semantic elements, helping people with visual impairments.

In the following sections, we’ll understand basic accessibility practices for each type of content you render on HTML. We'll explore how to use the correct HTML tags for each situation, helping you see how choosing the right tag for its purpose improves accessibility.

Feel free to test each example with a screen reader. On Mac, use ⌘+F5 to activate VoiceOver, Mac’s built-in screen reader. For Windows, you can use the built-in screen reader called Narrator by pressing Ctrl + Windows Key + Enter.

---

## Text Content

When writing text content, it’s important to use the correct elements for headings, paragraphs, and lists. Let’s understand with the following examples.

Let’s say you write headings and paragraphs in the following way:

```html
<span id="heading1">Heading 1</span>
<br />
<br />
<span id="heading2">Heading 2</span>
<br />
<br />
This is one paragraph
<br />
<br />
This is another paragraph
```

This approach has the following problems:

- The screen reader won’t be able to distinguish between headings and paragraphs - it would just read out the contents in one go, thus confusing people who depend on screen readers.
- It’s difficult to style individual paragraphs, since there are no selectors. Even if you add a `<span>` to each one, it requires extra CSS styling.
- It also contains unnecessary line breaks which can be avoided by using the right elements.

The above code is an example of bad semantics. This is what you should do instead:

```html
<h1>Heading 1</h1>
<h2>Heading 2</h2>
<p>This is one paragraph</p>
<p>This is another paragraph</p>
```

Here, we have used the right semantic elements for the text content, which has the following benefits:

- A screen reader is able to distinguish the headings from the paragraph text by reading out the heading level before reading the text.
- `h1`, `h2`, and `p` come with built-in styles and they each render on a new line. This eliminates the need to use line breaks.
- The code looks cleaner and is much more readable.

### Lists

To render a list of items, we have the following approaches. The non-semantic approach just groups a bunch of divs together and applies CSS styles to them.

```html
<h2>TODO List</h2>
<div id="mylist">
  <div>Make Breakfast</div>
  <div>Do Laundry</div>
  <div>Complete blog post</div>
</div>
```

Again, this achieves the desired output but it’s difficult for screen readers to identify this content as a list of items. Instead, use semantic elements:

```html
<h2>TODO List</h2>
<ul id="mylist">
  <li>Make Breakfast</li>
  <li>Do Laundry</li>
  <li>Complete blog post</li>
</ul>
```

This helps screen readers identify the element as an unordered list and read out each item. `<ul>` also comes with default styles and bullet points for each list item. You can also use `<ol/>` for numbered lists, where the screen reader reads out the number on each list item.

You can test the above examples with Mac’s VoiceOver to see the difference.

### Emphasized Text

Emphasized text refers to highlighted text that gives importance to certain words or phrases within a piece of content. When adding emphasized text, it’s important to use the right semantic elements like [<FontIcon icon="fa-brands fa-firefox"/>`<strong>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/strong) and [`<em>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/em).

```html
<p>For best results, use <em>fresh ingredients</em> when cooking.</p>

<p>The process of water turning into gas is called <strong>evaporation</strong>.</p>
```

These elements add some built-in styles to the text like *bold* and *italic*. Also, if you test with VoiceOver, you’ll notice that it puts some emphasis on the text inside these elements. This helps people using screen readers identify emphasised text.

You may also add some colour to the emphasized text. But, there’s no need to add a lot of styles, else it may cause confusion. Visit [<FontIcon icon="fa-brands fa-firefox"/>MDN Docs-Emphasis and Importance](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Emphasis_and_importance) to learn more about text emphasis in HTML.

### Abbreviations

Next, when writing abbreviations (or acronyms), it’s a good practice to make them visually different and also include the full expansion of the acronym. You can also add some simple styling to the abbreviation. Learn more about abbreviations in [<FontIcon icon="fa-brands fa-firefox"/>MDN Docs-Abbreviations](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Advanced_text_features#abbreviations).

### Other best practices

Apart from the above, there are a few other practices that are good to follow:

- Use clear language, wherever possible. For example, expand abbreviations: instead of Jan, write January.
- When writing ranges, avoid using dashes if possible, write 1 to 5 instead of 1-5.
- Avoid using characters that may confuse users when a screen reader reads them out, for example `~` or `*`.
- Avoid excessive exclamations and emojis.

Also, when writing CSS for text content, remember these practices:

- When using styles like font sizes, line height, and letter spacing, ensure that the text is comfortable to read.
- Your headings should stand out from the other text, in case you are using CSS styles. Usually, this is achieved by just using the right heading tags.
- Text color should have 4.5:1 contrast with the background. See the [Color Contrast](/freecodecamp.org/the-web-accessibility-handbook/additional-css-and-javascript-practices.md#color-contrast) section for details.

If you want more tips on styling text, visit [<FontIcon icon="fa-brands fa-firefox"/>MDN Docs - CSS Text Styling](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Text_styling).

---

## Page Layouts

Page layout is concerned with how the content is laid out on the screen. When you start designing a web page, your first thought is how your content should be positioned on the screen.

Typically, a web page consists of a header, nav bar, footer, main content, and sidebar. In the *bad old days* (phrase borrowed from the docs, sorry), developers used tables to create page layouts consisting of these elements.

But tables made the layouts incredibly complex and hard to maintain. Table layouts are also difficult for screen readers to read, affecting accessibility.

Nowadays, there are much better ways to write page layouts. If you are including a header, nav bar, and footer along with the main content, you can use the following semantic elements:

```html
<header>
  <h1>Header</h1>
  <nav>
    <!-- main navigation in here -->
  </nav>
</header>

<!-- Here is our page's main content -->
<main>
  <!-- Main content here -->
</main>

<footer>
  <!-- footer content in here -->
</footer>
```

Let’s understand each tag used above (skip if you already know):

- `<header>`: Represents the introductory section of a webpage, typically containing headings, logos, or navigation links.
- `<nav>`: Defines a navigation section that contains links to other parts of the website or page, providing easy access to important sections.
- `<main>`: Represents the main content area that focusses on the primary purpose of the page or the website, excluding common elements like header, footer, or sidebar (may include sidebar depending on the website).
- `<footer>`: Represents the bottom section of the web page, typically containing metadata, copyright information, or links to related resources.

These elements are called [<FontIcon icon="fa-brands fa-firefox"/>sectioning elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element#content_sectioning). Following are advantages of using these elements:

- The layout is clear with each element clearly describing its purpose, making the code readable and maintainable.
- Using the right semantic elements makes screen readers identify each part of the layout, thus helping visually impaired users understand how the website is structured.

Of course, you can write the above layouts by using divs, but sectioning elements provide good semantics and help users understand the type of content they are navigating.

---

## Interactive Elements

These consist of elements through which a user interacts with the web page. These elements include buttons, form fields, links, and so on.

### Keyboard Accessibility

Each interactive element on a web page should be navigable through the keyboard. This gives a user flexibility while navigating your website. Keyboard accessibility is really helpful for people with mobility impairments that may struggle to use a mouse.

For instance, visit [<FontIcon icon="fas fa-globe"/>this](https://mdn.github.io/learning-area/tools-testing/cross-browser-testing/accessibility/native-keyboard-accessibility.html) page and try to navigate to each interactive element by pressing Tab on your keyboard. You can also press Enter/Spacebar to click on a button or a link. This should give you an idea of what a keyboard-accessible website looks like.

For the most part, using the right semantic elements should ensure keyboard accessibility, as they come with built-in functionality. Check out the following example:

```html
<p>
  Visit my blog at 
  <a href="https://freecodecamp.org/news/author/KunalN25/">freecodecamp.org</a>
</p>

<button>Click me</button>
<button>Click me again</button>

<div>
  <input type="text" placeholder="Enter your name" />
</div>
```

Here, we have used the correct semantic elements for the hyperlink, button, and input element. All these elements can be accessed through Tab and interacted with using Enter/Spacebar. Check out other form-related elements in this [<FontIcon icon="fa-brands fa-firefox"/>list](https://developer.mozilla.org/en-US/docs/Web/HTML/Element#forms).

Some people use a `div` or `span` and make them look like an anchor tag or a button with CSS styling. But this is bad for accessibility for two reasons:

- `div` and `span` are not tab-able by default. So, even if you do make a `div` look like a button, the user cannot navigate to it using the keyboard.
- Screen readers won’t be able to identify them as buttons, while in the case of semantic elements, they read these elements out as buttons or links.

But if you absolutely have to use a `div` to create a clickable element, include the following attributes:

```html
<div id="customButton" role="button" tabindex="0">Click me</div>
```

Here, we have added two attributes, `tabindex` and `role`. We’ll understand the `role` attribute in a later section.

The [<FontIcon icon="fa-brands fa-firefox"/>`tabindex`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) attribute takes an integer that specifies the tab order of tab-able elements, instead of the default top to bottom tab order. A positive integer means the element is focussed in an order specified by the attribute’s value.

But using tabindex to change the default tab order is not recommended, as it may cause confusion for keyboard navigators and affect accessibility. And frankly, it’s not necessary.

You should only ever use the following two values:

- `tabindex="0"` makes an element tab-able which means it can be accessed through a keyboard in the natural tab order.
- `tabindex="-1"` means the element is not reachable via keyboard navigation.

These attributes make the `div` behave like a button, but there’s a small piece of JS code you still need to add to make the button clickable via Enter/Return:

```js
document.getElementById("customButton").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    document.activeElement.click();
  }
});
```

Here, we have added an event listener to the element that listens for the keydown event. If the key pressed is Enter, then it calls the element’s `onclick` method.

If you are using a non-semantic element as a button, you need to add this extra code to make it work like a button. So, only use it if it's absolutely necessary. Otherwise, it's always better to use the correct semantic element in the first place.

Keyboard Accessibility is important for audio and video controls too. We’ll discuss this in the [Multimedia Accessibility](/freecodecamp.org/the-web-accessibility-handbook/multimedia-accessibility.md) section.

---

## Form Labels

A form label is some text that describes what you need to enter in a form field. Adding labels to form fields is a necessary practice since it lets the user know how to fill the form. But using the right semantic elements is important.

You could do the following and still achieve the desired output:

```html
Enter name: <input type="text" id="name" name="name" />
```

This is not good for screen reader users, as it does not read out what the input field is for. Even if it reads out “Enter name", the user may not associate it with the input field. Instead, use the `<label>` element for form labels.

```html
<div>
  <label for="name">Enter name:</label>
  <input type="text" id="nameField" name="name" />
</div>
```

The `for` attribute associates the label with the input field. With this, when the screen reader’s focus is on the input field, it reads out the label, followed by “edit field" to let the user know they should enter their name in the input field.

Check out the [<FontIcon icon="fas fa-globe"/>form without label](https://mdn.github.io/learning-area/accessibility/html/good-form.html) and [<FontIcon icon="fas fa-globe"/>form with label](https://mdn.github.io/learning-area/accessibility/html/bad-form.html) examples for more clarity. Use Mac’s Voiceover (⌘+F5) or Windows’ Narrator (Ctrl+Windows+Enter) to see how it reads out the form elements.

Using `<label>` offers more advantages:

- By linking a `<label>` to an input field with the `for` attribute (clickable association), clicking on the label focuses on the input field.
- Clickable association with input field helps the user’s select small inputs like [<FontIcon icon="fa-brands fa-firefox"/>checkboxes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox) or [<FontIcon icon="fa-brands fa-firefox"/>radio buttons](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio).
- It follows semantic HTML and specifies that the text is being used as a form label.

Lastly, remember that the label text should clearly describe what the user should enter into the field. For examples, “Enter name" or “Enter email".

This applies to buttons as well. Ensure that button text is descriptive enough to tell the user what they are clicking on. Vague texts like “Click me!" or “Click here!" are not helpful. Examples of descriptive text are “Submit Form" or “Download Report" that give the users a clear idea of the button’s action.

Along with these, links also come under interactive elements. But since there are a lot of examples for Links, I’ll discuss them in their own section now.

---

## Links

Links are a key part of web pages as they allow the user to navigate the website. Links serve different purposes: going to a different page in the same website, going to an external website, or downloading something. In this section, you’ll learn about several practices with links that contribute towards accessibility.

### Linking to External Websites

When you add a link that lets users open an external website, including the `target=_blank` attribute opens the link in a new tab.

```html
<a href="https://www.wikipedia.org/" target="_blank"> Wikipedia </a>
```

This is helpful for users as they don’t need to exit the website, saving them from the hassle of navigating back to the website.

Also, if your link opens in a new tab, it’s a good idea to mention it so the screen readers can read it out and help visually impaired users.

```html
<a href="https://www.wikipedia.org/" target="_blank" >
  Wikipedia (opens in new tab)
</a>
```

Similarly, if your link opens a non-HTML file, like a pdf or docx, you should mention it:

```html
<a target="_blank" href="jan-salary-slip.pdf">
  Salary-January (PDF)
</a>
```

Alternatively, you can use an icon to indicate a link opening in new tab.

```html
<a href="https://www.wikipedia.org/" target="_blank">
  Wikipedia
  <img src="new-tab-icon.png" alt="Opens in new tab" style="width:16px; height:16px; margin-left:5px;">
</a>
```

When using an icon, make sure that you include the alt attribute with description about the image. We’ll understand its purpose in the [Multimedia Accessibility](/freecodecamp.org/the-web-accessibility-handbook/multimedia-accessibility.md) section.

### Skip Links

A skip link is a link element placed at the top of a page that links directly to the main content of the page. This allows the users to skip the headers and all the navigation menus, and directly jump to the main content of the page. This is helpful on websites where there’s lot of repetitive content on top like menus or banners.

Skip links are especially helpful for people who are visually impaired and who might be using screen readers. These links provide a way to bypass repetitive navigation menus and directly access the main content. This also helps keyboard navigators, thus saving time and enhancing the user experience.

To add a skip link, add an anchor tag at the very top, just under the body tag, and link it to the main content.

```html
<body>
  <a href="#main">Skip to main content</a>
  <header>
    <h1>Page Title</h1>
    <nav>
      <ul id="nav-links">
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/blog">Blog</a></li>
        <!-- other nav links -->
      </ul>
    </nav>
  </header>
  <main id="main">
    <!-- Main Content -->
  </main>
</body>
```

The skip link is keyboard accessible and is also read out by the screen reader. Clicking on it takes you straight to the main content. Visit [<FontIcon icon="fas fa-globe"/>WebAIM](https://webaim.org/) and press Tab on your keyboard to see skip links in action.

### Link Styling

By default, links created with the anchor tag are visually different from non-link text. This is because the anchor tag has built-in styles like colour, [<FontIcon icon="fa-brands fa-firefox"/>text-decoration](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration), focus-ring (displays when you tab on to the link with the keyboard) and hover effects.

Links should look different from the other text so they’re easily distinguishable. As you saw above, the browser does that for you, so you don’t need to do much. But if you are adding custom styles to the link that fit in better with your theme, you need to follow some best practices:

- Links should have different colors for default, [<FontIcon icon="fa-brands fa-firefox"/>visited](https://developer.mozilla.org/en-US/docs/Web/CSS/:visited), [<FontIcon icon="fa-brands fa-firefox"/>focus](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus) and [<FontIcon icon="fa-brands fa-firefox"/>hover](https://developer.mozilla.org/en-US/docs/Web/CSS/:hover) states.
- Link text color should be different from the non-link text and should have different styling.
- Link text color should have a contrast of 3:1 between other text and 4.5:1 contrast between background color. See the [Color Contrast](/freecodecamp.org/the-web-accessibility-handbook/additional-css-and-javascript-practices.md#color-contrast) section for more understanding

An example of custom styling for links is shown below (from the Docs):

```css
a {
  color: #ff0000;
}

a:hover,
a:visited,
a:focus {
  color: #a60000;
  text-decoration: none;
}

a:active {
  color: #000000;
  background-color: #a60000;
}
```

With the help of [<FontIcon icon="fa-brands fa-firefox"/>pseudo-classes](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes), this adds different styles for when link is hovered, previously visited, focussed (with the keyboard), or active (when the link is being clicked).

You can experiment with different colors and styles, but don’t remove the `cursor: pointer` or `outline` properties. Both are important for people using keyboard navigation.

Remember, links already have built-in styles for all the link states. Only add your own if you want something in line with your website’s theme.

### Avoid using onclick handlers

Links are used to navigate to another web page on the same website or navigate to an external website. Specifying the link in the [<FontIcon icon="fa-brands fa-firefox"/>href](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#href) attribute does this for you without any need to add JavaScript code.

But some people add an `onclick` attribute to anchor elements, to make them behave like buttons and set `href="#"` or `href="javascript:void(0)"` to avoid page refresh. This causes unexpected behaviour and may lead to the following problems:

- Copying or dragging this link adds an unnecessary `#` or `void(0)` to the URL, which does not make sense.
- Clicking the link immediately scrolls the page to the top, which may lead to the user losing track of where they were.
- If JavaScript is still downloading, clicking the link does nothing and the web page becomes unresponsive.

It is also bad for semantics and accessibility, as people using screen readers may get confused. If you want to add JavaScript functionality on click of an element, just use a `<button>`. Only use links when navigating to a proper URL.

### Meaningful Link Text

Similar to buttons, when writing link text, keep it meaningful and descriptive and avoid using “Click here" or “Click this".

```html
<p>
  For more information about accessibility
  <a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility">
    click here
  </a>
</p>
```

Instead of the above, do this:

```html
<p>
  For more information about accessibility, visit
  <a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility">
    MDN Docs - Accessibility
  </a>
</p>
```

Check out the [<FontIcon icon="fas fa-globe"/>Good Links](https://mdn.github.io/learning-area/accessibility/html/good-links.html) and [<FontIcon icon="fas fa-globe"/>Bad Links](https://mdn.github.io/learning-area/accessibility/html/bad-links.html) examples from the docs. You can also test them with VoiceOver (⌘+F5).

### Link Proximity

If your web page has a lot of interactive elements like links and buttons, ensure that they are spaced properly to prevent accidental clicks. This helps people with [<FontIcon icon="fas fa-globe"/>Motor Control Issues](https://axesslab.com/hand-tremors/) that may click on the wrong link.

Using the [<FontIcon icon="fa-brands fa-firefox"/>`margin`](https://developer.mozilla.org/en-US/docs/Web/CSS/margin) property should be enough to ensure spacing.

---

## Table Accessibility

In the page layouts section, we saw that using tables for creating page layouts is an outdated practice. However, tables can still be used if you want to display a large amount of data in tabular form. Incorporating accessibility in tables helps screen readers interpret them and help visually impaired users.

Check out [<FontIcon icon="fa-brands fa-firefox"/>MDN Docs - Table Accessibility](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Table_accessibility) to understand best practices.