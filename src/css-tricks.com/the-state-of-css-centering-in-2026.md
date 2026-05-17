---
lang: en-US
title: "The State of CSS Centering in 2026"
description: "Article(s) > The State of CSS Centering in 2026"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - css-tricks.com
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > The State of CSS Centering in 2026"
    - property: og:description
      content: "The State of CSS Centering in 2026"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/the-state-of-css-centering-in-2026.html
prev: /programming/css/articles/README.md
date: 2026-05-22
isOriginal: false
author:
  - name: Temani Afif
    url: https://css-tricks.com/author/afiftemani/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/04/centered-text.webp
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
  name="The State of CSS Centering in 2026"
  desc="Despite the countless number of online resources, it’s easy to get confused when trying to center an element. There are documented solutions, but do you really understand why the code you picked works? Let's look at the current state of centering options today in 2026."
  url="https://css-tricks.com/the-state-of-css-centering-in-2026"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/04/centered-text.webp"/>

What? Another article about [<VPIcon icon="iconfont icon-css-tricks"/>centering](https://css-tricks.com/?s=centering)?! But all we have to do is use `display: flex | grid`, then `align-items: center`. No, it’s `align-content`… wait… I think it’s `justify-content`. Well, let’s use `margin: auto`, this one works all the time, right?

Despite the countless number of online resources (even [**CSS-Tricks has a full guide**](/css-tricks.com/centering-css-complete-guide.md) on it), it’s easy to get confused when trying to center an element, whether vertically, horizontally, or both. I am sure you will find something that works by googling or trying different combinations. But do you really understand *why* the code you picked works? Is it the right one for your use case? Because it really does depend and require consideration!

In this article, we will do a fresh exploration of centering in CSS, and hopefully, you will learn something new by the end of it.

> I already master CSS centering. Should I skip this article?

Stay with me because we will explore hidden tricks and modern features that you may not know — safe centering, `text-box`, centering in anchor positioning, etc.

---

## Is centering still hard?

No, centering is not hard. Considering all the different and various ways to center an element, it’s an easy task that generally requires two or three lines of code. But, how many ways do we have to center an element? I did the count, and I was able to enumerate [<VPIcon icon="fas fa-globe"/>100 different ways to center an element vertically and horizontally within a container](https://css-generators.com/center/).

> Are you serious,100 ways?! That’s insane.

Yes, 100 is a ridiculously high number for what should be a simple task, but that number is misleading. If you check the list, you will find I marked about 60 of them in **red,** meaning they are hacky and not recommended. This leaves us with roughly 30 valid approaches. And within those valid options, many are basically the same, only written differently, so we can consider them redundant.

At the end of the day, the number of “unique” and “valid” ways to center an element is less than 15 (or even 10) but it was a fun exercise enumerating the different codes that can center an element. Go check [<VPIcon icon="fas fa-globe"/>the full list](https://css-generators.com/center/), you may learn something new!

Let’s look at things from a beginner’s perspective. For me, who has been writing CSS day and night for years, it’s easy to say “centering is not hard,” but what about to a newcomer who reads this and confronted with all those different ways to center stuff? Nah, it’s not easy at all. `align-items`, `align-content`, `justify-content`, `place-self`, `margin: auto`. What the hell?!

Too many properties for a task that everyone claims is easy! Well, let’s pick a code that works and move on. After all, if the item is in the center, then it’s fine, right? Let’s avoid making a lot of noise around this, or the CSS fanatics will shout at me.

Don’t think that way! Centering can be hard, and that’s fine. It doesn’t mean you are stupid. It simply means you need to understand how it works.

Don’t skip the important step of “learning” (like many do); otherwise you will find yourself doing a lot of copy/paste without really understanding what is going on. Sometimes it works, but sometimes it doesn’t, and it can be very frustrating.

---

## Learn how to align before how to center

Centering is nothing but a special case of alignment in CSS, and alignment is a complex world. It’s not only left, center, right, or top, center, bottom. It’s more than that. The good news is that you can easily learn it. For this purpose, I wrote a deep dive I called [<VPIcon icon="fas fa-globe"/>“The fundamentals of alignment in CSS.”](https://css-tip.com/explore/alignment/)

It’s probably one of my longest writings, but believe me, it’s worth your time (and effort). I explain how alignment works in all the different CSS layout methods. It starts with understanding the alignment theory, which has two levels of alignment (“content” and “item”) and two axes (horizontal and vertical).

![Diagram showing that place-content equals align-content plus justify-content, place-self equals align-self plus justify-self, and place-items equals align-items plus justify-items, alongside a visual example of all three inside a white container and black border.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/04/s_11AB7300F4C2B3C7258DA83D06B69BFA5810FEA16962608FDEF9E8D5EBE2CA4D_1777322117445_image.png?resize=885%2C341)

Identifying the “content” and the “item” in every layout is the key to understanding how everything works. I insist on “every layout” because assuming it works the same everywhere is a very common mistake.

Do yourself a favor and [<VPIcon icon="fas fa-globe"/>read that detailed article](https://css-tip.com/explore/alignment/) — you will thank me later! And once you understand the core concept of alignment, centering will become child’s play.

---

## Should I use Flexbox or Grid?

I see a lot of people who always use the same method to center an element, whatever the situation. You have the CSS Grid team and the Flexbox team. While both work, I don’t advise you to think that way. Remember that the goal is to *understand* and avoid quick copy/paste approaches.

Study your layout and your requirements, then decide which method to use. Maybe your case requires `position: absolute` or a simple `text-align: center`. Flexbox or CSS Grid aren’t always mandatory for centering stuff, and there is no one way that’s better than another.

That said, if I have to pick something, I would consider the following codes. Each one for each type of layout.

```css
.container { 
  display: block;
  align-content: center;
  justify-items: center; 
}
.container {
  display: grid;
  place-content: center;
}
.container {
  display: flex;
  flex-wrap: wrap;
  place-content: center;
}
```

::: note

`justify-items` in the context of a block container is not supported by all the browsers. It’s Chrome-only for now, so consider using Chrome to see the following demos.

:::

The properties are defined in one place (the container), and the methods are suitable for centering one or multiple items.

You won’t notice a difference when centering a single item. The three methods behave the same.

<CodePen
  link="https://codepen.io/t_afif/pen/PwGMOgw/d24c67a21bed753a746711aaa015d25a"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="dark"/>

With multiple items, Flexbox behaves differently. It has a responsive behavior where the items are initially laid out horizontally and wrap when the container is narrowed. Resize the container and see what happens.

<CodePen
  link="https://codepen.io/t_afif/pen/XJjvzwZ/b362792195ee84abc7f7db4ea16e5497"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="dark"/>

And with multiple items of different sizes, they all behave differently.

<CodePen
  link="https://codepen.io/t_afif/pen/xbEvPoa/1ef9ffd555a2a19fb9ead68a0ba54ae9"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="dark"/>

We started with three approaches that give us the same “visual” result when working with a single item, but upon adding more items, we can clearly see they are different. This difference is important as it shows that it’s not about picking a random code to center stuff. It’s about understanding how each code behaves in different situations, then picking the most suitable one. It’s wrong to assume that we can center the same way using Flexbox, CSS Grid, etc. All the methods are different and rely on different mechanisms, even if they give the same result in the context of one item.

This also explains why we technically have 100 ways to center stuff. We have different layout types, and each layout has its own alignment logic. But when the structure is reduced to one item inside a container, we have a lot of choices, and many methods may look identical even though they are not.

So, let me repeat myself: Study the alignment logic behind each code to know which one is suitable for your use case. Don’t blindly copy/paste a code that simply “works.”

---

## What about centering text?

When centering “boxes,” we generally don’t have any issues if we apply the properties correctly. But once we start dealing with text, it can be tricky to perfectly center things vertically. You know the extra space above or below that you cannot really control and you have to use magic values for line-height or padding to rectify it.

We now have a new property that allows us to fix this: [**`text-box`**](/css-tricks.com/almanac-properties/text-box.md). It trims the extra space based on your configuration.

<CodePen
  link="https://codepen.io/t_afif/pen/raMXpOv/be3d619ca7c4a36359843075f0071de7"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="dark"/>

In both boxes, I align the content in the center using a common code. Notice that the first box is not that good. The text seems to be off, even though I am using the CSS properties correctly.

It’s frustrating, right? For CSS, everything is perfectly centered, but for us, it’s not. why!?

It’s related to how the font is designed and the space reserved for each character. Adding a border around the text will make things clear.

![Two examples of the word Text next to a red square. The first example is slightly off center due to line height and the second is perfect centered against the square due to removing extra line height.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/04/s_11AB7300F4C2B3C7258DA83D06B69BFA5810FEA16962608FDEF9E8D5EBE2CA4D_1777156519576_image.png?resize=582%2C273&ssl=1)

As you can see, the “text box” is centered, but there is unwanted space inside it. I was able to remove that space using one line of code:

```css
text-box: cap alphabetic;
```

Let’s try lowercase text without descenders or ascenders.

<CodePen
  link="https://codepen.io/t_afif/pen/YPGmYJw/fb9d957860145f1a5cd742f6d6862e78"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="dark"/>

This time I am using slightly different keywords:

```css
text-box: ex alphabetic;
```

…to remove the space for perfect centering

![Two examples of the word awesome next to a red square. The first example is slightly off center due to line height and the second is perfect centered against the square due to removing extra line height.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/04/s_11AB7300F4C2B3C7258DA83D06B69BFA5810FEA16962608FDEF9E8D5EBE2CA4D_1777157001493_image.png?resize=618%2C201)

The values look strange and unintuitive, but I have created [<VPIcon icon="fas fa-globe"/>a small generator](https://css-tip.com/text-box/) where you can easily specify which space you want to trim and get the code in no time.

![Highlighting the rendered line height of a text showing the space it adds to the content.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/04/s_11AB7300F4C2B3C7258DA83D06B69BFA5810FEA16962608FDEF9E8D5EBE2CA4D_1777157151200_image.png?resize=830%2C389)

And if you want more detail on that feature, check Danny Schwarz’s [**“Two CSS Properties for Trimming Text Box Whitespace.”**](/css-tricks.com/two-css-properties-for-trimming-text-box-whitespace.md)

---

## Centering with CSS Anchor Positioning

In some cases, you may need to use absolute or fixed position, which means we are dealing with an out-of-flow element and a different alignment logic; hence, another centering technique.

The common way to do that is the classic `top`/`left` combined with `translate`:

```css
left: 50%;
top: 50%;
transform: translate(-50%, -50%);
```

It works, and everyone is happy, but it’s not the suitable code to use. In 2026, I would consider that code hacky, and worth avoiding. It’s like [**creating layouts using `float`**](/css-tricks.com/in-defense-of-tables-and-floats-in-modern-day-development.md). That a was a valid approach until we got Flexbox and CSS Grid, which were intentionally designed for this sort for thing.

It’s the same thing with absolutely-positioned elements. Today, it’s better to rely on modern CSS features like this:

```css
inset: 0;
place-self: center;
```

The [**`inset`**](/css-tricks.com/almanac-properties/inset.md) property controls the “inset modified containing block” (IMCB) and [**`place-self`**](/css-tricks.com/almanac-properties/place-self.md) (the shorthand for `justify-self` and `align-self`) aligns the element inside the IMCB. [<VPIcon icon="fas fa-globe"/>I explain all those concepts in great detail in this article.](https://css-tip.com/explore/alignment/#what-about-inline-elements)

> Where is anchor positioning in all of this?

Great question! [**Anchor positioning**](/css-tricks.com/css-anchor-positioning-guide.md) relies on absolute (or fixed) elements and has its own mechanism for controlling an element’s placement relative to its anchor. We are specifically dealing with centering, so we have to talk about a new value, `anchor-center`.

Let’s start with the following example:

<CodePen
  link="https://codepen.io/t_afif/pen/OPRKEvE/c91880e2cc244625e3d0aeffcbfced37"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="dark"/>

I am placing the text box above the anchor using `position-area: top`. You can drag the anchor, and the text box will remain stuck to the top and centered.

Let’s update the alignment and use `place-self: center`.

<CodePen
  link="https://codepen.io/t_afif/pen/LERwJZa/e64e079d9a1b082d492e4a906e32d79d"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="dark"/>

The position looks a bit off at first glance, but if you drag the anchor and look closely, you will see the box centered within the top area.

![A light blue label that says CSS is Awesome in the top center of a container that includes an anchor icon places at the center left of the container. The container includes dashed red lines that highlight the position of both items.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/04/s_11AB7300F4C2B3C7258DA83D06B69BFA5810FEA16962608FDEF9E8D5EBE2CA4D_1777201251951_image.png?resize=933%2C429)

Centering is indeed not easy! It’s confusing if you don’t know in which area your element is centered. You will think that something is broken because your eyes might not see it as a centered element.

If you want to get back to the previous position, you can use this:

```css
place-self: end anchor-center;
```

…or this:

```css
align-self: end;
justify-self: anchor-center;
```

What’s happening here is that, vertically, we place the element at the end (the bottom), and horizontally, we consider the center of the anchor element. In other words, the `anchor-center` value is what makes the element follow the anchor when you drag it!

This means we have two different ways to use anchor positioning for centering: Either (1) center relative to the selected area using the `center` value, or (2) center relative to the anchor using the `anchor-center` value.

You will rarely need to use the `anchor-center` value in most cases because anchor positioning comes with [<VPIcon icon="iconfont icon-w3c"/>area-specific default alignment](https://w3.org/TR/css-anchor-position-1/#position-area-alignment). Setting `position-area` should be enough, but it’s good to know how to adjust the alignment and understand the difference between `center` and `anchor-center`.

If you want to explore alignment in anchor positioning, I have create [**an interactive demo**](/css-tip.com/position-area.md) that allows you to set the area, adjust the alignment, and see the result. There are 36 different positions you can set using `position-area` and five alignment values per axis.

![The UI for an interactive demo that places a label that says CSS is Awesome around different sides and edges of an anchor icon with controls to change that position and generate the CSS code for it.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/04/s_11AB7300F4C2B3C7258DA83D06B69BFA5810FEA16962608FDEF9E8D5EBE2CA4D_1777202093171_image.png?resize=835%2C622)

---

## Safe and unsafe centering

You are probably wondering what safety has to do with centering, right? Don’t worry, centering doesn’t present security risks, per se, but it can be a risky thing for your content!

Take the following example:

<CodePen
  link="https://codepen.io/t_afif/pen/XJjvPex/4b3c72d541a3369c8fd92e8f2e66270b"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="dark"/>

I am using CSS Grid to center a red square within a container and we have two situations. The red square is smaller than the container (a classic situation), and the red square is bigger than the container (a less common situation).

In both situations, the red square remains centered, i.e., its center point matches the container’s center point. This is an unsafe centering approach, and yet it’s the default behavior of many centering methods.

Why is it unsafe? The content inside the container is overflowing from all sides, so if you decide to hide the overflow and add a scrollbar, some parts of the content cannot be reached, which is a form of [**data loss**](/css-tricks.com/overflow-and-data-loss-in-css.md). In this case, the top and left parts are lost. That’s what I mean by *unsafe*.

Try scrolling the second container, and you will notice that you cannot see the red square’s top and left borders.

<CodePen
  link="https://codepen.io/t_afif/pen/xbEvaYe/08462980623dc79394344b0a030e6540"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="dark"/>

We can fix this by using `safe` alignment like this:

```css
place-content: safe center;
```

Now, when an overflow occurs, the browser will shift the element to a “safer” position that displays the whole content in case we need to scroll. In other words, the browser prioritizes content visibility over centering (the exact opposite of an unsafe alignment).

<CodePen
  link="https://codepen.io/t_afif/pen/KwgOxeQ/defc053bd2a13ad8d5b0170384cf4a28"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="dark"/>

I know what you’re probably thinking, and you shouldn’t be thinking that! Adding `safe` everywhere isn’t a good idea. Sometimes the unsafe behavior is actually what we want, so only consider `safe`when you’re faced with content obstruction.

Let’s get back to the anchor positioning demo:

<CodePen
  link="https://codepen.io/t_afif/pen/OPRKEvE/c91880e2cc244625e3d0aeffcbfced37"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="dark"/>

If you drag the anchor closer to the edges, the box is stopped by those edges (the containing block) and the default alignment is lost!

![A label that says CSS is Awesome centered above an anchor icon that sits toward the left edge of a container.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/04/s_11AB7300F4C2B3C7258DA83D06B69BFA5810FEA16962608FDEF9E8D5EBE2CA4D_1777203629933_image.png?resize=593%2C398)

In anchor positioning, the default behavior is `safe` alignment. If you don’t know about it, you may spend a lot of time trying to figure out why the element is not centered.

You can change that behavior using the `unsafe` keyword:

```css
place-self: unsafe end unsafe anchor-center;
```

Or:

```css
justify-self: unsafe anchor-center;
align-self: unsafe end;
```

Now, the browser allows the box to overflow the container. It will prioritize alignment over potential content loss due to the overflow.

<CodePen
  link="https://codepen.io/t_afif/pen/NPRQLew/461e5f9e12b9c6f1b93db31795c751fb"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="dark"/>

And if you think it’s useless to work with an `unsafe` alignment in anchor positioning, then you are wrong. Here is one use case where I needed to switch to an unsafe alignment. We have a sticky header with a small icon next to the website title that you can hover to show a tooltip. The sticky header creates a containing block for the tooltip and, by default, prevents it from overflowing its boundary. I had to use an unsafe alignment to allow the overflow and keep the tooltip correctly placed.

<CodePen
  user="anon"
  slug-hash="RNogQNE"
  title="Sticky header info bubble"
  :default-tab="['css','result']"
  :theme="dark"/>

I know it can be confusing, but you will rarely need to mess with safety. Keep using the default browser behavior, but remember you have the `safe` and `unsafe` values you can use to rectify a misalignment.

---

## Conclusion

I hope that after this article you will see centering from a different angle. It’s not about picking a code that works, and you’re done. It’s about [<VPIcon icon="fas fa-globe"/>understanding how alignment works](https://css-tip.com/explore/alignment/), considering your specific use case and layout, picking the appropriate code, and, more importantly, understanding *why* it works.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The State of CSS Centering in 2026",
  "desc": "Despite the countless number of online resources, it’s easy to get confused when trying to center an element. There are documented solutions, but do you really understand why the code you picked works? Let's look at the current state of centering options today in 2026.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/the-state-of-css-centering-in-2026.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
