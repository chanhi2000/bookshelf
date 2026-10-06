---
lang: en-US
title: "Understanding Bidirectional Text: A Guide for Developers"
description: "Article(s) > Understanding Bidirectional Text: A Guide for Developers"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - AI
  - LLM
  - Article(s)
tag:
  - blog
  - blog.master.dev
  - css
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Understanding Bidirectional Text: A Guide for Developers"
    - property: og:description
      content: "Understanding Bidirectional Text: A Guide for Developers"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.master.dev/you-dont-know-bidi-and-neither-does-chatgpt.html
prev: /programming/css/articles/README.md
date: 2026-09-30
isOriginal: false
author:
  - name: Mojtaba Seyedi
    url: https://blog.master.dev/author/mojtabaseyedi/
cover: https://blog.master.dev/wp-json/social-image-generator/v1/image/11201
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
  "title": "LLM > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/llm/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Understanding Bidirectional Text: A Guide for Developers"
  desc="Discover the complexities of bidirectional text, its challenges, and how to properly render languages like Arabic and Persian in the digital world."
  url="https://blog.master.dev/you-dont-know-bidi-and-neither-does-chatgpt/"
  logo="https://blog.master.dev/favicon.ico"
  preview="https://blog.master.dev/wp-json/social-image-generator/v1/image/11201"/>

If your first language is written left to right, you might be surprised to learn that some languages are written the opposite way. Arabic, Persian, Hebrew, and others flow from right to left. That can be an interesting fact to learn about, but it’s not always fun to live with in the digital world.

Take a look at this sentence that contains a Persian phrase. For reference, “چه” means “how” and “قشنگه” means “beautiful”:

He opened the gift, said چه قشنگه, and then started crying.

Text like this, which mixes words, phrases, or sentences written in different directions, is called bidirectional text.

![In this example, you read from left to right until you reach the Persian part, then jump over it and read it from right to left. Once you finish, jump back and continue reading the English.](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/09/bidi-reading-order.jpg?resize=1024%2C215&quality=89&ssl=1)

So far, everything displays correctly.

Now, let’s make the Persian phrase more exciting by adding an exclamation mark. Where would you add it? Since we read the phrase from right to left, we add the mark at the end:

He opened the gift and said چه قشنگه! and then started crying.

Although I typed the exclamation mark at the end of the phrase, as you can see, the browser displayed it on the right side.

That is the phenomenon I’d like to dig into in this article.

---

## Welcome to the Other Direction

If you grew up reading left to right, you probably never had to think about text direction. It’s invisible to you. Computers were born in Western countries, built by people who read the same way, and that assumption got baked into everything from the ground up.

You type from left to right. You read from left to right. You code from left to right. Even your operating system draws pixels on your screen from left to right. For people who grew up with Arabic, Persian, Urdu, Hebrew, or other right-to-left (RTL) languages, things have been very different.

Remember [<VPIcon icon="iconfont icon-subl"/>Sublime Text](https://sublimetext.com/)? God, that editor was amazing back then (and still is). But apart from all its greatness, it had one significant flaw: it didn’t support RTL languages. If you needed to add content in an RTL language or write a comment in one, it was frustrating.

I actually reinstalled it just to double-check.

![Screenshot of Sublime Text showing Persian text rendered character by character from left to right, with letters disconnected.](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/09/bidi-sublime-text-rtl.png?resize=1024%2C665&quality=80&ssl=1)

No, still no RTL support. But wow, had I missed Sublime!

Sublime Text renders RTL characters one by one from left to right, in the order you type them, with no mechanism to display them from right to left. Also, some RTL languages, such as Arabic and Persian, are cursive by nature, and Sublime ignores that too.

Anyway, VS Code came along, and many of us switched and never looked back.

Putting Sublime Text aside, let’s test one of the most widely used digital tools out there today (ChatGPT).

```md title="prompt"
Hey, you are an expert in counting. Spell out numbers from one to six and use Arabic words for three and four. Also, use arrows in between.
```

![Screenshot of ChatGPT spelling out numbers one to six with arrows between them, where the Arabic words for three and four appear in the wrong order.](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/09/bidi-chatgpt-numbers-arabic.png?resize=1024%2C584&quality=80&ssl=1)

You’ll be surprised to learn that “ثلاثة” means “three” in Arabic!

Now let’s try something else. “Now do the opposite. Spell out everything in Arabic except three and four. Spell those in English.”

![Screenshot of ChatGPT spelling out numbers in Arabic with three and four in English, where the English words and the arrows between them display in the wrong order.](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/09/bidi-chatgpt-numbers-english-1024x580.png?resize=1024%2C580&quality=80&ssl=1)

Notice another issue?

Apart from putting three and four in the wrong order, the arrows aren’t displayed correctly either.

The world’s most impressive AI tool can write code and explain quantum physics, but it can’t render bidirectional text properly.

And to be fair, this isn’t just ChatGPT. You’ll find the same problems across many platforms and tools on different operating systems. Although there has been significant improvement, this problem persists and shows up in unexpected places.

Keep reading to find out why.

---

## The Unicode Bidirectional Algorithm

Going back to our first example, every word sits where it’s supposed to, and each character’s visual order is correct.

He opened the gift and said چه قشنگه and then started crying.

You didn’t need to do anything here. You typed the characters in logical order, and the browser still placed each one in the right visual spot. That’s the Unicode Bidirectional Algorithm at work.

According to the Unicode Standard, every character has a directional property. Latin characters are strongly LTR. Arabic characters are strongly RTL.

In the example above, when the user agent (your browser in this case, not the AI agents you’re playing with these days) reads through the logical order of characters (the order you typed them), it uses each character’s directional property to determine the correct visual order (the order you see on screen).

::: note

We don’t need to cover or understand the full algorithm, but if you’re curious, here’s an [<VPIcon icon="fa-brands fa-youtube"/>ancient video from Fantasi on YouTube](https://youtu.be/XgqP0qogg6U) explaining how it works.

:::

So far, we’ve only used strong characters (almost), and the browser has handled our bidirectional text using the bidi algorithm perfectly.

### Neutral Characters

Unfortunately, not all characters are strong. Some Unicode characters have no inherent LTR or RTL direction. They’re called neutral or weak characters.

Think about the equal sign (`=`). It looks the same in all languages, regardless of direction.

Spaces and most punctuation are neutral characters. When the browser encounters one, it looks at the characters on either side. If both sides are LTR, the neutral character becomes LTR. If both sides are RTL, it becomes RTL. You can think of it as a sandwich rule.

![Diagram of the sentence Coffee = Developer Fuel with each character labeled L for left-to-right or N for neutral, and a second row showing every neutral character resolved to L.](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/09/bidi-sandwich-rule.jpg?resize=1024%2C352&quality=89&ssl=1)

But don’t let the term “neutral” fool you. These characters cause real trouble for the bidi algorithm.

What happens when both sides don’t share the same directionality?

![Diagram of the word said followed by a Persian word, with the characters labeled L for left-to-right and R for right-to-left, and the space between them labeled N for neutral.](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/09/bidi-mixed-neighbors.jpg?resize=699%2C201&quality=89&ssl=1)

In these cases, the algorithm needs more information. It needs to know the directional context in which the characters appear.

### The Base Direction

Base direction tells the browser how your content flows: left to right or right to left. Think of it as giving a document, paragraph, or piece of text directional context.

Every HTML document has a base direction, and by default it is left to right. If you’re building an LTR page, you don’t need to set anything. If the overall document is right-to-left, set `dir="rtl"` on the `<html>` element. This sets the base direction for the entire document, and the setting propagates to child elements unless you explicitly override it.

You can also change the direction for a smaller piece of content. If a section, paragraph, or short phrase needs a different direction, wrap it in an element and set the appropriate `dir` value. In general, set the direction as close as possible to the content that needs it, rather than changing the direction of a larger part of the document.

The Unicode Bidirectional Algorithm needs base-direction context to determine how text should be ordered when displayed.

Going back to our example, since we haven’t set any direction explicitly, the base direction defaults to `ltr`. The algorithm treats `!` as an LTR candidate, and that’s why it ends up on the wrong side of the Persian phrase. The following image shows what happens to the space between two different strong characters. The same thing happens to the exclamation mark.

![Diagram of the word said followed by a Persian word, showing the neutral space between them resolving to L because the base direction is left to right.](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/09/bidi-base-direction-fallback.jpg?resize=723%2C363&quality=89&ssl=1)

As a developer, you help the browser by giving it the context it needs.

---

## How to Help the Browser Set the Right Direction

To help the browser place characters in the right visual order, you need to specify your intent by providing the context the browser needs. In our example, the browser doesn’t know what you intend regarding the exclamation mark. To clarify, set the base direction where the browser can’t figure it out on its own.

```html
<p>
  He opened the gift and said <span dir="rtl">چه قشنگه!</span> and then started crying.
</p>
```

In general, any string that mixes text in more than one direction needs information about what the base direction should be. Without that information, the display can significantly change the meaning or cause confusion.

As I mentioned, you can set the `dir` attribute on any element in HTML.

If you know the direction the content should flow, set the `dir` attribute on an element tightly wrapped around the text. If no such element exists, wrap the text in an inline element like `<span>` and set its `dir` attribute to the required direction (`ltr` or `rtl`), as we did in the previous example.

### The `auto` Value of the `dir` Attribute

Most of the time, you’re not dealing with static content. Content gets injected into the DOM at runtime, which means you don’t know the direction beforehand. Think of a chat interface like WhatsApp: every chat bubble can contain text from different languages with different directions. This is where the `auto` value of the `dir` attribute comes in handy. The `auto` value tells the user agent to look at the first strong character in the element and use its directionality to determine the element’s direction.

```html
<!-- ltr -->
<div class="chat-bubble" dir="auto">
  Yo! Look at my first character.
</div>

<!-- rtl -->
<div class="chat-bubble" dir="auto">
  سلام بچه look at my first character.
</div>
```

### The `<bdi>` Element

Occasionally, there’s no existing element tightly wrapped around the text that needs a direction. This is where the `<bdi>` HTML element comes in. The `<bdi>` element does two things: it wraps your content and sets the direction to `auto` without you writing that explicitly. So our main example could have been written using `<bdi>`:

```html
<p>
  He opened the gift and said <bdi>چه قشنگه!</bdi> and then started crying.
</p>
```

### Unicode Marks

You can also help the browser using invisible Unicode characters designed for this purpose: the Left-to-Right Mark and the Right-to-Left Mark.

- `U+200E` = Left-to-Right Mark (LRM)
- `U+200F` = Right-to-Left Mark (RLM)

These characters do one thing: they sit among your other characters and act as a strong directional signal. So when the sandwich rule works against you, you can insert one of these marks to nudge the algorithm in the right direction. You can find [<VPIcon icon="iconfont icon-w3c"/>more Unicode characters like these here](https://w3.org/International/questions/qa-bidi-unicode-controls#basedirection).

You can fix the original exclamation mark example by adding a Right-to-Left Mark after it. Since the RLM is invisible, the reader never notices, but the algorithm now sees the exclamation mark sandwiched between two RTL characters and handles it correctly.

```html
<p>
  He opened the gift and said چه قشنگه!&rlm; and then started crying.
</p>
```

### The `unicode-bidi` CSS Property

So far, I’ve talked about the ways you should help the browser. However, there’s one approach you should avoid, and ironically, it’s the most convenient: using CSS.

Never use the [`unicode-bidi` property in CSS](https://css-tricks.com/almanac/properties/u/unicode-bidi/) to control how bidirectional text renders. Rendering text correctly is a content-level concern, not a style-level one. If a tool (or an AI scraper) uses your content without paying attention to your styles, you’ll end up sharing confusing information.

---

## Where Bidi Breaks in the Wild

So far, you’ve learned that the Unicode Bidirectional Algorithm’s limitations show up where it doesn’t know your intention. A punctuation mark, a number, or even a space can leave the algorithm guessing. Let’s walk through three common scenarios where this happens.

### Nested Bidi

The W3C has a great example of nested bidirectional text: imagine English text containing an Arabic phrase that itself includes an English part at the end.

I’m looking for a book titled “Introduction to Programming in C++” to learn about C++ in Arabic.

“مقدمة في البرمجة بلغة ++C”

To keep things simple, let’s first imagine the book is about C++’s ancestor: C.

I’m looking for a book titled “مقدمة في البرمجة بلغة C”.

Here you spot one issue: the “C” ends up on the right side of the title, which you now understand why. To fix it, you need to specify the base direction for the book title, which is written in an RTL language:

```html
<p>
  I'm looking for a book titled <span dir="rtl">مقدمة في البرمجة بلغة C</span> to learn about C in Arabic.
</p>
```

<CodePen
  user="anon"
  slug-hash="dPvNJKe"
  title="bidirectional text — demo 1"
  :default-tab="['css','result']"
  :theme="dark"/>

The character sequences are now in the correct order, meaning you will see the C letter on the left side of the text.

Now let’s change the language to C++ and see what happens:

<CodePen
  user="anon"
  slug-hash="YPZNYjj"
  title="bidirectional text — demo 2"
  :default-tab="['css','result']"
  :theme="dark"/>

Spot the troublemakers? As soon as you add the plus signs, the algorithm has to decide. The C is a strong LTR character, but each `+` is neutral. To place a neutral character, the algorithm looks at what surrounds it. On one side it finds the C, which pulls left-to-right. On the other side there is nothing strong to rely on. So the algorithm falls back to the base direction, which is RTL (specified by the `dir` attribute), so the `++` lands on the left of the C instead of the right.

You might expect the English after the title to help. It can’t. The `dir="rtl"` attribute isolates the title from the surrounding text, so characters outside the isolate never influence what happens inside it. The same isolation that fixed the earlier examples is what stops the algorithm from fixing this one.

To fix this, you need to go one layer deeper and give that part its own directional context:

```html
<p>
  I'm looking for a book titled <span dir="rtl">مقدمة في البرمجة بلغة <span dir="ltr">C++</span></span> to learn about C++ in Arabic.
</p>
```

### Following Numbers

When it comes to directionality, numbers are a different breed. Numeric digits, whether European (1, 2, 3) or Arabic-Indic (١، ٢، ٣), always run left to right. But they don’t break directional runs because they have weak directionality. In that sense, they behave like punctuation and spaces.

Say you have a list of book titles with review counts:

- Title 3 reviews
- Title 100 reviews
- عنوان 3 reviews

Because “3” is weakly typed, the algorithm treats it as part of the preceding Persian text. It continues in the same direction as the previous character (a strong RTL character).

To prevent this, isolate the book title so it doesn’t get mixed with the following number. From a bidirectional text perspective, you can’t just wrap any HTML element around your text and call it isolation. You need to use the `dir` attribute or the `<bdi>` element, both of which isolate text and give it its own directional context without leaking directionality to adjacent content.

<CodePen
  user="anon"
  slug-hash="VYpPyqB"
  title="bidirectional text — demo 3"
  :default-tab="['css','result']"
  :theme="dark"/>

### Lists

Remember the ChatGPT example with numbers and arrows? Let’s see why that was happening.

Imagine you have a list of international friends, and you’d like to use their names in their own languages. Two of your friends are Persian. Here’s the order you have in mind:

1. Emma
2. Alex
3. آتنا
4. آرزو
5. Geoff

If you list them in a paragraph, the order breaks:

Emma, Alex, آتنا, آرزو, Geoff

The comma is a neutral character. Its neighbors are strong RTL characters, so it takes on RTL directionality. Suddenly the entire “آتنا, آرزو” sequence becomes an RTL run, and the order falls apart.

To prevent commas from joining forces with the Persian words, isolate each name so no directionality leaks across boundaries.

<CodePen
  user="anon"
  slug-hash="RNpKxvE"
  title="bidirectional text — demo 4"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## When There’s Nothing We Can Do (Almost)

Some cases are impossible to solve with markup alone. So far, every example has been somewhat preventable: you either know the direction and specify it in advance, or you don’t know the direction but know bidirectional text will appear, so you warn the algorithm with `dir="auto"` or the `<bdi>` element.

Now imagine an online international book search. The user can search for any book, and titles come in many languages with mixed directions.

A book is titled “The best programming language: CSS” but it’s written in Urdu. It looks like this:

سب سے بہترین پروگرامنگ زبان: CSS

The website displays a helpful message to show how many titles were found:

Your search for “سب سے بہترین پروگرامنگ زبان: CSS” found 0 results.

You and I know how to prevent the problem: wrap the search term in `<bdi>` and done.

Now, what if the book title were slightly different? CSS is the best programming language.

Previously, the search string began with an RTL character, signaling that the entire string needed an RTL context. That was exactly what the algorithm needed. But this time, the string starts with “CSS” rather than ending with it. The algorithm looks at the first strong character, assumes an LTR context, and commits to that, but the actual context is RTL. The string just happens to start with an English name.

So there is no way for you to prevent this from happening using the mentioned approaches:

<CodePen
  user="anon"
  slug-hash="JoWEMVp"
  title="bidirectional text — demo 5"
  :default-tab="['css','result']"
  :theme="dark"/>

To handle this, you’d need scripting to detect the string’s overall direction and apply it to the markup.

For example, [Google’s Closure Library (<VPIcon icon="iconfont icon-github"/>`google/closure-library`)](https://github.com/google/closure-library/blob/b312823ec5f84239ff1db7526f4a75cba0420a33/closure/goog/i18n/bidi.js#L817) has an `estimateDirection` function that tackles this exact problem in a smart way, which I encourage you to take a look at. It basically splits the string into words, counts how many are RTL and how many are LTR, and picks the direction that dominates.

---

## The Curious Case of LLMs

So far you’ve seen that resolving a bidi text problem has two parts: understanding the text and rendering the text. The bidi algorithm handles the latter, while our judgment and the scripting we discussed handle the former. The example where we had no good solution was also an “understanding the text” problem.

Luckily, we now have something smarter than the scripting method mentioned above: LLMs. After all, an LLM can look at a sentence and understand that it is English or Arabic.

Looking back at those ChatGPT screenshots with the swapped arrows and the reordered numbers, it would be unfair to say the model is confused. It isn’t. It knows the words and their meaning. The problem is somewhere else: the model understands the text, but the renderer has to figure out how to display it.

And now we have an interesting question: what if we could pass some of that contextual understanding to the renderer?

An application like ChatGPT could know that a message is primarily Persian, or that a particular piece of text belongs to another direction, and express that intent with the tools we already have, like the `dir` attribute, the `<bdi>` element, or an invisible Unicode mark such as RLM or LRM.

For example, try giving ChatGPT or Claude this prompt:

```md
Hey, you are an expert in the Unicode Bidirectional Algorithm.  
  
I have this English template: Your search for "" found 0 results.  
  
Fill the blank with this book title, which mixes languages with different text directions (English and Persian): CSS بهترین کتاب دنیا  
  
Rendering requirements:  
- Outer sentence: the template is English, so its direction is LTR.\*\*  
- Title direction: decide the title's base direction by linguistic judgment.  
- Isolation: wrap the title, and only the title, in LRI (U+2066) or RLI (U+2067) according to that decision, closed with PDI (U+2069). The quotation marks stay outside the isolate.
```

Just to be clear, I’m not suggesting that we should prompt an LLM for every bidi direction problem. I’m just trying to show that the model is capable of resolving this kind of contextual question. If the model can understand the text and determine its direction, there should be a way to use that information at the application level.

---

## Wrapping Up

Bidirectional text is a complex topic developers have discussed for years. My goal here was simply to shine a light on it once more, especially for developers joining the industry today, who may never run into these discussions thanks to the convenience of AI tools and modern platforms.

And this is also a reminder for the people building those platforms: don’t forget the users who read and write in a different direction. The technology is damn good nowadays. We should be able to get this right.

::: info

If you’re curious to learn more about preparing your websites and web apps for an international audience, the best place to start is the W3C itself:

```component VPCard
{
  "title": "List of articles and videos - W3C Internationalization",
  "desc": "A list of articles, tutorials, guidelines, and videos from the W3C Internationalization Activity.",
  "link": "https://w3.org/International/articlelist#direction",
  "logo": "https://w3.org/favicon.ico",
  "background": "rgba(0,90,156,0.2)"
}
```

:::

[![](https://i0.wp.com/blog.master.dev/wp-content/uploads/2024/01/interop-thumb.jpg?fit=1000%2C500&quality=89&ssl=1&resize=350%2C200)](https://blog.master.dev/the-popular-vote-of-interop-2024/ "The Popular Vote of Interop 2024")

#### [The Popular Vote of Interop 2024](https://blog.master.dev/the-popular-vote-of-interop-2024/ "The Popular Vote of Interop 2024")

I believe it will be sometime in January we'll hear what the Interop Project is going to focus on in 2024. This is a cross-company effort that picks certain web platform features to make sure work perfectly across browsers, meaning us web developers will more happily choose to implement them.…

```component VPCard
{
  "title": "A Complete Guide to Beginning with JavaScript",
  "desc": "This guide serves as an introduction to learning JavaScript, covering necessary prerequisite knowledge and addressing common obstacles. It highlights JavaScript’s origins, essential concepts, and practical applications across different environments.",
  "link": "/blog.master.dev/a-complete-guide-to-beginning-with-javascript.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "5 CSS Properties You Should Know for Better Text Designs",
  "desc": "Includes background-clip for masking backgrounds, vertical-align for aligning elements, box-decoration-mode for consistent edge styling, letter-spacing for spacing control, and text-combine-upright for vertical text layouts.",
  "link": "/blog.master.dev/typographic-css-tricks.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Understanding Bidirectional Text: A Guide for Developers",
  "desc": "Discover the complexities of bidirectional text, its challenges, and how to properly render languages like Arabic and Persian in the digital world.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.master.dev/you-dont-know-bidi-and-neither-does-chatgpt.html",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
