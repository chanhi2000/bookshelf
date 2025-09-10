---
lang: en-US
title: "Less Common HTML Elements and How to Use Them in Your Code"
description: "Article(s) > Less Common HTML Elements and How to Use Them in Your Code"
icon: fa-brands fa-css3-alt
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
      content: "Article(s) > Less Common HTML Elements and How to Use Them in Your Code"
    - property: og:description
      content: "Less Common HTML Elements and How to Use Them in Your Code"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/less-common-html-elements-and-how-to-use-them.html
prev: /programming/css/articles/README.md
date: 2024-11-05
isOriginal: false
author: Joan Ayebola
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1730747551049/73b334f4-7b4a-448a-bfae-8b95cffe6119.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "CSS > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/css/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Less Common HTML Elements and How to Use Them in Your Code"
  desc="HTML has a lot of tags that many people use every day, like <div>, <p>, and <a>. But there are also some hidden gems that often go unnoticed. These tags can help make websites more engaging, accessible, and meaningful without much extra effort. In th..."
  url="https://freecodecamp.org/news/less-common-html-elements-and-how-to-use-them"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1730747551049/73b334f4-7b4a-448a-bfae-8b95cffe6119.png"/>

HTML has a lot of tags that many people use every day, like `<div>`, `<p>`, and `<a>`. But there are also some hidden gems that often go unnoticed. These tags can help make websites more engaging, accessible, and meaningful without much extra effort.

In this article, we’ll discuss a group of unique HTML elements that can enhance your web pages. They offer specific functions for formatting text, improving readability, and adding interactive features.

---

## The `<q>` Tag: Short Inline Quotes

The `<q>` tag is used to add short quotes inside a paragraph. It helps make quotes look different and easier to spot, without breaking up the flow of the text. This tag automatically adds quotation marks around the content.

### Description and Syntax

The basic structure of the `<q>` tag is simple:

::: normal-demo

```html
<p>She said, <q>This is amazing!</q></p>
```

:::

### How It Differs From the `<blockquote>` Element

The `<q>` tag is for short quotes inside a sentence. On the other hand, the `<blockquote>` element is used for longer quotes that usually need their own space or paragraph.

For example:

```html
<blockquote>
"This is a long quote that needs its own space. It is different from a short quote."
</blockquote>
```

This block will appear with indentation and is meant to highlight a bigger chunk of quoted text.

### Use Cases: Adding Quotations Within Paragraphs

The `<q>` tag is perfect for cases where you need to mention a quote in a sentence without separating it too much. For instance, when quoting someone in an article or blog post

::: normal-demo

```html
<p>The professor said, <q>Practice makes perfect</q>, during the class.</p>
```

:::

In this case, the `<q>` tag keeps the quote small and inside the same paragraph.

The professor said, Practice makes perfect, during the class.

### Browser Compatibility and Styling Tips

Most modern browsers automatically add quotation marks to the content inside a `<q>` tag. But you can change how it looks using CSS if needed. Here’s how you can style it:

```css
q {
  quotes: "«" "»";
  font-style: italic;
}
```

This code will change the quotes to French-style marks (« and ») and make the quote italic.

Most browsers support the `<q>` tag, so you don’t have to worry about compatibility issues for modern users. But older browsers may need extra care, so always test if your audience uses older versions.

---

## The `<s>` Tag: Strikethrough Text

The `<s>` tag is used to show text that is no longer correct, relevant, or has been removed. It puts a line through the middle of the text, which we call a "strikethrough." This tag is often used to indicate something that has been edited or updated.

### Explanation and Usage

The `<s>` tag is simple to use. Wrap it around the text you want to strike through:

This will display as

::: normal-demo

```html
<p>This product was <s>$50</s> now only $30!</p>
```

:::

### Common Use Cases: Indicating Removed or Irrelevant Content

The `<s>` tag is great for showing price changes, edits, or content that is no longer valid. For example:

**Price updates**:

::: normal-demo

```html
<p><s>$75</s> $50 (Limited Offer!)</p>
```

:::

**Corrections or changes**:

::: normal-demo

```html
<p><s>Old website address</s> New website address</p>
```

:::

**Content that’s no longer relevant**:

::: normal-demo

```html
<p>This feature is <s>no longer available</s>.</p>
```

:::

### Styling Possibilities With CSS

You can customize how the strikethrough looks using CSS. For example, you can change the color of the line or the text:

```css
s {
  text-decoration: line-through;
  color: red;
}
```

In this case, the text will have a red line through it, giving more emphasis to the fact it’s been crossed out.

### Semantic Meaning Versus Visual Decoration

The `<s>` tag holds some semantic meaning. It usually represents content that was once valid but is now incorrect or outdated. It’s more than just a style change. For example, it’s perfect for showing changes in legal documents, corrections in blog posts, or updates to prices.

On the other hand, if you're using strikethrough just for visual decoration without meaning that the text is wrong, it’s better to use CSS directly, like this:

```css
span.strike {
  text-decoration: line-through;
}
```

And then apply it in your HTML:

::: normal-demo

```html
<p>This text is <span class="strike">crossed out</span> just for fun!</p>
```

```css
span.strike {
  text-decoration: line-through;
}
```

:::

This approach is purely for styling and doesn’t carry the same meaning as the `<s>` tag.

---

## The `<mark>` Tag: Highlighted Text

The `<mark>` tag is used to highlight text. It helps draw attention to certain parts of your content, making them stand out. By default, browsers highlight text with a yellow background when the `<mark>` tag is used.

### Purpose of the `<mark>` Tag

The `<mark>` tag is great when you want to emphasize something important. It's often used to show search results, recent changes, or any text that needs special attention.

Here’s an example of how it works:

::: normal-demo

```html
<p>This is a <mark>highlighted</mark> word.</p>
```

:::

### Best Practices for Using `<mark>` for Emphasis or Search Results

**Highlighting key terms**: If you want to emphasize important words or phrases in an article or blog post, the `<mark>` tag is a simple way to do that:

::: normal-demo

```html
<p>The most important concept here is <mark>efficiency</mark>.</p>
```

:::

The most important concept here is efficiency.

**Search results**: When showing search results on a webpage, using the `<mark>` tag to highlight the matching terms makes it easier for users to find what they’re looking for:

::: normal-demo

```html
<p>Your search for <mark>HTML</mark> found these results:</p>
```

:::

Your search for HTML found these results:

**Recent updates**: You can also use the `<mark>` tag to show new updates or changes in your content:

::: normal-demo

```html
<p>We have recently added the <mark>new feature</mark> to the app.</p>
```

:::

We have recently added the new feature to the app.

### How to Style Highlighted Text Effectively

While the default color for `<mark>` is yellow, you can change it with CSS to match your website’s design. Here’s an example of how to customize the highlighted text:

```css
mark {
  background-color: lightblue;
  color: black;
  padding: 2px;
}
```

This will give the text a light blue background with black text.

If you want the text to stand out even more, you can add a border or change the font style:

```css
mark {
  background-color: yellow;
  color: black;
  font-weight: bold;
  border-radius: 4px;
}
```

This would make the highlighted text look more polished and noticeable.

### Browser Support and Accessibility Considerations

The `<mark>` tag is supported across all modern browsers, so you won’t face any compatibility issues. Just make sure the background color you choose provides enough contrast for readability, especially for users with visual impairments.

Using a light background with dark text is a good rule of thumb. Testing the color contrast ensures that the highlighted content remains accessible to everyone, including those using screen readers.

---

## The `<ruby>` Tag: Annotating East Asian Language Text

The `<ruby>` tag is used to add small annotations to text, often seen in East Asian languages like Japanese or Chinese. These annotations help readers with pronunciation or meaning, especially when the characters are complex or unfamiliar.

### Definition and Use Cases for `<ruby>`

In languages like Japanese, it's common to use a small guide above or beside characters to show how they should be pronounced. The `<ruby>` tag pairs the main text with a small annotation, usually in a simpler script.

Here’s a basic example:

```html
<ruby>漢 <rt>かん</rt> 字 <rt>じ</rt></ruby>
```

This shows the Japanese kanji characters *漢字* with their pronunciation (furigana) displayed above or beside them as *かんじ* (kanji).

::: normal-demo

```html
<ruby>漢 <rt>かん</rt> 字 <rt>じ</rt></ruby>
```

:::

### The Importance of the `<rp>` and `<rt>` Sub-Elements

The `<rt>` element is used inside the `<ruby>` tag to define the annotation (like pronunciation) for the main text. It stands for "ruby text."

This will display *漢* with *かん* (kan) above it as the annotation.

::: normal-demo

```html
<ruby>漢 <rt>かん</rt></ruby>
```

:::

The `<rp>` element, short for "ruby parenthesis," is used as a fallback for browsers that don’t support the `<ruby>` tag. It wraps extra characters, such as parentheses, around the ruby text to show that it’s an annotation:

If the browser doesn’t support ruby annotations, it will display the pronunciation inside parentheses, like this:  

::: normal-demo

```html
<ruby>漢 <rp>(</rp><rt>かん</rt><rp>)</rp></ruby>
```

:::

### Practical Examples: Ruby Annotations for Language Learning

The `<ruby>` tag is a helpful tool for language learners. It can display the pronunciation for unfamiliar words or characters directly above or beside them. This makes it easier for beginners to read and learn new vocabulary.

For example, let’s say you want to help someone learn the Chinese word for "person":

This would show *人* with the pronunciation *rén* above it.

::: normal-demo

```html
<ruby>人 <rt>rén</rt></ruby>
```

:::

For longer sentences

This helps students see both the characters and the correct pronunciation.

::: normal-demo

```html
<p><ruby>我 <rt>wǒ</rt></ruby> <ruby>是 <rt>shì</rt></ruby> <ruby>学生 <rt>xuéshēng</rt></ruby>.</p>
```

:::

### Cross-Browser Compatibility and Rendering Considerations

The `<ruby>` tag is supported across most modern browsers, but older ones might not render it correctly. That's where the `<rp>` element comes in handy, making sure the annotations are still readable if the browser doesn’t support ruby text.

For accessibility, make sure the annotations have enough space around them so that they are easy to read. You can also use CSS to adjust how the annotations look:

```css
ruby rt {
  font-size: 0.75em;
  color: gray;
}
```

This will make the ruby text smaller and in a different color to keep it visually separate from the main content.

Using `<ruby>` is a great way to improve readability for language learners or readers unfamiliar with certain scripts. Just remember to check browser support and add fallbacks for a better user experience across different devices.

---

## The `<time>` Tag: Semantic Time and Date

The `<time>` tag is used to mark dates or times in a machine-readable format. It helps search engines, browsers, and other tools recognize time-related information more clearly, which is useful for improving visibility in search results or for better data parsing.

### Using the `<time>` Tag for Machine-Readable Dates and Times

When you use the `<time>` tag, it allows you to provide dates or times that are easy for both people and computers to read. This is especially helpful on blogs, news articles, or event pages.

Here's an example:

The text "October 1, 2024" is what users will see, but the `datetime` attribute provides a machine-readable version of the date. Search engines can now easily interpret this date.

::: normal-demo

```html
<p>Published on <time datetime="2024-10-01">October 1, 2024</time></p>
```

:::

You can also use the `<time>` tag to display times:

This makes it clear to both users and machines when the event takes place.

::: normal-demo

```html
<p>The event starts at <time datetime="13:00">1:00 PM</time>.</p>
```

:::

### How `<time>` Improves SEO and Data Parsing for Event Details

Search engines rely on structured data to understand content better. The `<time>` tag gives them a clearer idea of when events, publications, or deadlines happen, improving the relevance of search results. For example, search engines can better display the publication date of a blog post or the time of an event.

For an event page, the following example provides both human-friendly and machine-friendly time information:

::: normal-demo

```html
<p>Join us for the workshop on <time datetime="2024-12-15">December 15, 2024</time> at <time datetime="15:30">3:30 PM</time>.</p>
```

:::

Search engines and web crawlers can then extract this data and use it to create rich snippets in search results, helping the event get noticed.

### Examples of Usage in Articles, Blogs, and Event Pages

Here are some practical examples of how you can use the `<time>` tag:

::: tabs

@tab:active 1. Blog posts

You can display when an article was published or last updated:

```html
<p>Last updated on <time datetime="2024-09-28">September 28, 2024</time>.</p>
```

@tab 2. Event listings

Event websites can use the `<time>` tag to list when an event will take place:

```html
<p>Our next meetup will be on <time datetime="2024-11-10">November 10, 2024</time> at <time datetime="18:00">6:00 PM</time>.</p>
```

@tab 3. Deadlines

When presenting important deadlines, use the `<time>` tag for clarity:

```html
<p>Submit your application before <time datetime="2024-10-30T23:59">October 30, 2024, 11:59 PM</time>.</p>
```

:::

In all of these examples, the `datetime` attribute ensures that computers can read the time information correctly, while users see a more readable version.

### Browser Support and Accessibility

The `<time>` tag is widely supported across modern browsers. It also improves accessibility because screen readers can interpret the date and time more accurately, giving a better experience for users with disabilities.

---

## The `<bdi>` Tag: Bi-Directional Text Isolation

The `<bdi>` tag stands for "bi-directional isolation" and is used to prevent text direction problems on multilingual websites. This tag is especially helpful when working with content that includes both left-to-right (LTR) and right-to-left (RTL) languages.

### `<bdi>` Tag’s Role in Multilingual Sites

When mixing languages with different text directions, like English (LTR) and Arabic (RTL), the natural flow of text can sometimes get messy. The `<bdi>` tag helps keep the layout of the text clean, ensuring that each portion of text displays correctly, no matter the direction of the language.

For example, if you want to display user input (like a username) next to other text, and you don’t know which language the username will be in, you can use `<bdi>` to make sure it doesn’t mess with the flow.

### How to Use `<bdi>` for Preventing Text Direction Issues

The `<bdi>` tag wraps around the part of the text you want to isolate, and it prevents the text direction from being affected by surrounding content.

Here’s a simple example:

```html
<p>User <bdi>اسم</bdi> has logged in.</p>
```

If the username is in Arabic (which reads RTL), the `<bdi>` tag ensures the rest of the sentence (which is in English and reads LTR) doesn’t get disrupted. Without the `<bdi>` tag, the sentence could display incorrectly due to the mix of text directions.

Another example with numbers:

```html
<p>Invoice number: <bdi>#1234</bdi></p>
```

If the invoice number includes text or numbers in different directions, the `<bdi>` tag makes sure the formatting stays correct.

### Examples of `<bdi>`

The `<bdi>` tag is commonly used in multilingual applications, user-generated content platforms, and websites that handle multiple languages at once. For instance, websites that allow users to input data, such as names or addresses, might use `<bdi>` to ensure proper text alignment.

Here’s an example on a forum:

```html
<p><bdi>مستخدم</bdi> liked your post!</p>
```

Without `<bdi>`, the text might display awkwardly, but with it, both the Arabic username and the English text display properly.

### Browser Compatibility

The `<bdi>` tag is supported in all modern browsers, including Chrome, Firefox, Safari, and Edge. It’s a lightweight solution, doesn’t require special styling, and helps keep your content layout neat when dealing with multilingual text.

---

## The `<dfn>` Tag: Defining Terms

The `<dfn>` tag is used to mark the first instance of a term that is being defined within a webpage. It helps readers quickly recognize that a particular word or phrase is a definition, improving the clarity of your content, especially in technical writing.

### How to Use `<dfn>` for Marking Definitions

The `<dfn>` tag is simple to use. You wrap it around the word or phrase that you want to define. Typically, the term appears near the explanation of its meaning.

Example:

```html
<p>The <dfn>DOM</dfn> (Document Object Model) is a programming interface for web documents.</p>
```

Here, the `<dfn>` tag highlights that "DOM" is the term being defined.

The DOM (Document Object Model) is a programming interface for web documents.

### Best Practices for Providing In-Article Explanations

When using the `<dfn>` tag, make sure the term you are defining is followed closely by its explanation. This keeps things clear and helps readers connect the term with its meaning right away.

It's also a good idea to only use `<dfn>` the first time a term is introduced, as repeating it multiple times can confuse the reader.

For example, in a technical article about HTML:

```html
<p>The <dfn>API</dfn> (Application Programming Interface) allows different software applications to communicate with each other. Once defined, an API can simplify many web development tasks.</p>
```

In this case, "API" is defined when it's first mentioned, and later uses of "API" don’t need the `<dfn>` tag anymore.

### How `<dfn>` Improves the Clarity of Technical Content

Using the `<dfn>` tag in technical writing is a great way to make content easier to follow. It clearly signals to readers when you're introducing a new term, which is especially useful when explaining complex ideas. This helps improve readability and allows users to grasp key concepts faster.

By marking definitions with `<dfn>`, search engines and other tools may also be able to better interpret your content, making it more accessible. For example, technical glossaries or educational websites can use `<dfn>` to make their terms stand out.

### Example of `<dfn>`

```html
<p>The <dfn>URL</dfn> (Uniform Resource Locator) is the address used to access a resource on the web.</p>
```

In this sentence, the reader is introduced to the term "URL," followed by a clear explanation. This method of introducing terms with the `<dfn>` tag helps make technical content much easier to read and understand, especially for those unfamiliar with the topic.

---

## The `<wbr>` Tag: Line Break Opportunities

The `<wbr>` tag is used to suggest where a word or URL can be split to create a line break if needed. This is useful when dealing with long words, URLs, or any text that could break the layout of a webpage.

### What the `<wbr>` Tag Is and Why it’s Essential for Long Words or URLs

Sometimes, long words or URLs can mess up the design of a webpage by causing horizontal scrolling or breaking the layout. The `<wbr>` tag gives the browser a hint on where to break the word, but only if necessary. This helps keep the text readable and prevents overflow.

For example, if you have a long URL, you can place the `<wbr>` tag to tell the browser where it can break the text:

```html
<p>Visit our website at https://www.example<wbr>.com/super/long-url-that-might-break-layout</p>
```

If the browser needs to break the URL, it will do so after the `<wbr>`, ensuring the design remains intact.

### Best Practices for Controlling Word Wrapping and Text Overflow

The `<wbr>` tag should be used in places where text might cause overflow issues, such as long technical terms, email addresses, or URLs. But don’t overuse it, as unnecessary breaks can make the text harder to read.

Here’s another example with a long word:

```html
<p>This word is too long: anti<wbr>disestablishmentarianism.</p>
```

If the word gets too long for the line, the browser will split it after "anti-" without affecting readability.

In combination with CSS, you can also control word wrapping and text overflow for better results:

```css
p {
  word-wrap: break-word;
  overflow-wrap: break-word;
}
```

This CSS ensures that the text will wrap neatly when necessary, and using `<wbr>` can give more control over where those breaks happen.

::: normal-demo

```html
<p>This word is too long: anti<wbr>disestablishmentarianism.</p>
```

```css
p {
  word-wrap: break-word;
  overflow-wrap: break-word;
}
```

:::

### Browser Support for `<wr>` and Potential Challenges

The `<wbr>` tag is supported in all major browsers, including Chrome, Firefox, Safari, and Edge. It’s lightweight and doesn’t need any special styling to work.

But one thing to watch for is that overuse of the tag can make text breaks appear unnatural if the content is resized or viewed on different screen sizes.

For example:

```html
<p>Contact us at longemail<wbr>@example<wbr>.com for more information.</p>
```

In this case, you can avoid long email addresses causing layout problems, but the email might appear broken at different places depending on the screen width.

Use `<wbr>` when you anticipate long strings of text that may not naturally break, keeping your design clean and functional across devices.

::: normal-demo

```html
<p>Contact us at longemail<wbr>@example<wbr>.com for more information.</p>
```

:::

---

## The `<ins>` Tag: Inserted Text

The `<ins>` tag is used to show text that has been added to a document. This is often helpful when tracking edits, updates, or changes in documents. It also comes with a default underline to highlight the new content.

### What Is the `<ins>` Tag and How Does it Compare to the `<s>` Tag?

The `<ins>` tag is designed for marking inserted content, while the `<s>` tag is used for text that has been removed or is no longer relevant. Both tags are useful when you need to show changes in a document, like updates or revisions.

Example:

```html
<p>This is the <ins>new text</ins> that was added.</p>
<p>This is the <s>old text</s> that is no longer valid.</p>
```

Here, the `<ins>` tag highlights what has been added, and the `<s>` tag shows what has been crossed out as outdated.

This is the new text that was added.

This is the ~old text~ that is no longer valid.

### Usage in Tracking Document Edits or Versioning

The `<ins>` tag is commonly used when managing documents that need version control or where edits should be visible. For example, you can use it in collaborative writing platforms or legal documents to show which parts have been added.

Example of a document with changes:

```html
<p>The contract was updated to include <ins>an extra clause</ins> on data privacy.</p>
```

This makes it clear to the reader that the section about "data privacy" was recently added.

In software development or content management, you might use the `<ins>` tag to show text that has been newly introduced in version-controlled files, making it easier to track edits and revisions over time.

### Styling Options to Emphasize Changes

The default appearance of the `<ins>` tag is underlined, but you can customize it using CSS for better emphasis, especially if you want the changes to stand out more.

Here’s how you can style the `<ins>` tag with different visual effects:

```css
ins {
  background-color: #d4edda;
  color: green;
  text-decoration: none; /* Removes default underline */
}
```

This will give the inserted text a green color and a light green background, making it more noticeable.

You can also add different styles like a bold font or a border:

```css
ins {
  font-weight: bold;
  border-bottom: 2px solid green;
}
```

These styling options make it easier for users to identify what has been added or changed, improving the readability and transparency of document edits.

Overall, the `<ins>` tag is a simple but effective way to track inserted content, making it very useful for both technical documents and collaborative platforms where revisions need to be clearly visible.

---

## The `<del>` Tag: Deleted Text

The `<del>` tag is used to show text that has been deleted or removed from a document. This tag strikes through the text by default, making it easy to identify what has been removed. It’s especially helpful in situations where tracking changes or revisions is necessary.

### Purpose and Usage of the `<del>` Tag for Strikethrough Text

The main job of the `<del>` tag is to visually show that some content has been removed. It’s common in documents, articles, or code where changes need to be made visible to the reader. The deleted text will usually have a strikethrough, indicating that it’s no longer relevant or valid.

Example:

```html
<p>This product costs <del>$50</del> $40 now.</p>
```

In this example, the price change is clear.

![The old price ($50) is struck through, and the new price ($40) follows right after.](https://cdn.hashnode.com/res/hashnode/image/upload/v1728749690070/6c971036-90b9-4bcb-9d74-1c13bd770750.png)

### How It Can Be Combined With `<ins>` for Tracking Revisions

The `<del>` tag can be paired with the `<ins>` tag to show both removed and newly added content, making it perfect for tracking edits or revisions. This is very useful in collaborative writing, legal documents, or any situation where changes must be recorded clearly.

Example of tracking revisions:

```html
<p>The meeting has been moved <del>Monday</del> <ins>Tuesday</ins>.</p>
```

Here, it’s easy to see that "Monday" was replaced with "Tuesday," and the reader knows exactly what changed.

![ee3f84d5-9e56-4f27-8ce3-6eac5a79a144](https://cdn.hashnode.com/res/hashnode/image/upload/v1728749828530/ee3f84d5-9e56-4f27-8ce3-6eac5a79a144.png)

### Best Practices for Displaying and Styling Deleted Content

By default, the `<del>` tag applies a strikethrough to the text, but you can style it further with CSS to make it more noticeable or match your design needs.

Here’s an example of customizing the appearance of deleted text:

```css
del {
  color: red;
  text-decoration: line-through;
}
```

This makes deleted text appear red, drawing more attention to it. You can also combine it with additional formatting, like fading out the text:

```css
del {
  color: gray;
  opacity: 0.7;
}
```

This style reduces the emphasis on deleted content, making it less distracting but still visible to readers.

The `<del>` tag provides a simple and effective way to track and display changes, especially when combined with the `<ins>` tag. It’s essential for keeping documents transparent and clear for anyone reviewing edits or updates.

---

## Conclusion

Making use of these unique HTML elements expands what’s possible on the web, which helps to create more meaningful and accessible content. Tags like `<q>`, `<s>`, `<mark>`, `<ruby>`, `<time>`, `<bdi>`, `<dfn>`, `<wbr>`, `<ins>`, and `<del>` each bring their own advantages for specific tasks. These elements do more than just style text; they add context, enhance user experiences, and improve document structure.

Using these tags correctly not only makes your web pages clearer but also boosts compatibility across devices and search engines. As you apply these elements, think about how each one serves both the visual presentation and the information structure. They offer simple but powerful ways to make websites richer and easier to understand while benefiting a wide range of users.

If you have any questions or suggestions, feel free to reach out on [LinkedIn (<VPIcon icon="fa-brands fa-linkedin"/>`joan-ayebola`)](https://ng.linkedin.com/in/joan-ayebola). If you enjoyed this content, consider [buying me a coffee](https://buymeacoffee.com/joanayebola) to support the creation of more developer-friendly contents.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Less Common HTML Elements and How to Use Them in Your Code",
  "desc": "HTML has a lot of tags that many people use every day, like <div>, <p>, and <a>. But there are also some hidden gems that often go unnoticed. These tags can help make websites more engaging, accessible, and meaningful without much extra effort. In th...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/less-common-html-elements-and-how-to-use-them.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
