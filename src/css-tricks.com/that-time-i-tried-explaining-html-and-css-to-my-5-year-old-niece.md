---
lang: en-US
title: "That Time I Tried Explaining HTML and CSS to My 5-Year Old Niece"
description: "Article(s) > That Time I Tried Explaining HTML and CSS to My 5-Year Old Niece"
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
      content: "Article(s) > That Time I Tried Explaining HTML and CSS to My 5-Year Old Niece"
    - property: og:description
      content: "That Time I Tried Explaining HTML and CSS to My 5-Year Old Niece"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/that-time-i-tried-explaining-html-and-css-to-my-5-year-old-niece.html
prev: /programming/css/articles/README.md
date: 2025-12-08
isOriginal: false
author:
  - name: Kevine Nzapdi
    url : https://css-tricks.com/author/kevinenzapdi/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/11/apple-css.webp
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
  name="That Time I Tried Explaining HTML and CSS to My 5-Year Old Niece"
  desc="I would like to tell you what I learned from a five-year old child about HTML and CSS. It’s funny how explaining something you do almost naturally teaches you about yourself and what you take for granted."
  url="https://css-tricks.com/that-time-i-tried-explaining-html-and-css-to-my-5-year-old-niece"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/11/apple-css.webp"/>

I would like to tell you what I learned from a five-year old child about HTML and CSS.

Just when I opened my code editor and browser and began writing basic [**HTML boilerplate**](/css-tricks.com/html-boilerplates.md), my niece walked in. She is tiny and normally very loud, but was standing quietly next to my desk on this particular day, as if she was looking for something.

```md
**Niece:** Wassat? Wassat you typing?  
**Me:** Something for the computer.  
**Niece:** It looks funny. All the little lines.  
**Me:** They are instructions.  
**Niece:** Instwu… inschu… instwushun?  
**Me:** Instructions.
```

I paused and remembered a [<VPIcon icon="fa-brands fa-quora"/>Quora question](https://quora.com/A-6-year-old-wants-to-make-a-website-I-know-basic-HTML-CSS-but-Im-not-good-at-teaching-How-or-where-should-I-start) I stumbled on few days earlier about explaining HTML and CSS to a child. I totally skipped the question — I was just scrolling around at the time — but now with my niece standing next to me, I found myself wishing I’d looked it over.

Here’s how I answered. It’s funny how explaining something you do almost naturally teaches you about yourself and what you take for granted.

---

## We’re building a “house” with “bricks”

My niece didn’t seem to care about the actual code I was writing, like the specific HTML tags that littered my code editor. No, she was more concerned with what was happening in the browser.

```md
**Niece:** Oh. So, this big box is your house?  
**Me:** Kind of, yes.
```

At that time the screen was empty, looking more like a vast expanse than a webpage. I love that she saw a big white space and likened it to a house that I was building. Her observation pushed me to explain the most basic part of what I was doing.

I told her the editor is where I place my building blocks — not totally unlike having a place where she keeps her LEGOS together as building materials. She watched quietly while I added a simple heading, a short line of text and a button that did not have any behavior yet.

Her eyes were glued on the screen as I refreshed my browser, a few texts appeared. She jerked her head backward a bit when the screen refreshed and turned from an empty house to something with rendered elements.

<CodePen
  user="anon"
  slug-hash="zxqzzvJ"
  title="School Project Draft"
  :default-tab="['css','result']"
  :theme="dark"/>

She was getting it! No, she couldn’t read the code. But she could see the connection between the house and LEGO pieces that gave it structure.

---

## The LEGOS are just bricks in the house

I explained that HTML is what structures the house, merely stacking bricks on the white screen. It has nothing to do with what those bricks should look like. A heading is a heading, a paragraph is a paragraph, and a button is another kind of brick. The browser follows my instructions for adding the bricks I want to the house.

Trying to explain that to her forced me to slow down. I found myself describing HTML as the vocabulary of the page: it gives names to each piece so the browser can build the document tree behind the scenes. Then the tree becomes the foundation that CSS and JavaScript can later rely on. Without those names, the browser would not know where the different elements should relate to one other. Already, I was finding it tough to describe HTML without getting into the other core languages.

I paused, watching her reaction, and was reminded something. Every polished writing begins as a bare idea and then transforms into an outline — just like a polished interface begins with an outline. Before any colors, space, or layout, all we have is structure.

Explaining this to her made those fundamentals feel important to me again, like when I first realized the importance of having a separation of concerns between HTML, CSS, and JavaScript.

My niece began to stare at my screen for an inordinate amount of time, and the silence felt heavy. Even though the structure was there, the page still looked empty to her and she finally asked why the page looked like that.

She expected something more like a house; something with shapes and rooms. What she saw instead was a plain surface with nothing to hold on to. I pointed out the editor and showed the semantic tags I had written. The `<body>` acts as a container, I told her. The `<header>` is sort of like the “roof” of the house and the `<footer>` like the bottom floor.

I explained to her that those elements behave more like rooms and doorways than decoration. They tell the browser what exists and how one part relates to another one. They do not make anything look good, they “frame” document like you frame a house before putting up doors, walls, paint, and carpet.

<CodePen
  user="anon"
  slug-hash="jEqwmgm"
  title="My Digital House - HTML"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Decorating the house

Once the concept of structure clicked with her, I began adding some very simple CSS rules. I kept it minimal by adding a `width`, some `height` and a `border` to one of the elements. She watched the characters appear in my dark editor with the same focus you would give to a puzzle. Those properties names, curly braces and brackets look nothing like layout instructions to her but rather unfamiliar symbols.

Then came the moment, I had to take a step back again and try to explain CSS to her. I told her what I was typing are also instructions, just like HTML, but instead of instructions for laying bricks, these were instructions for how the bricks should look. For example, I can tell the browser how large a brick should be, where it should sit, and how it should appear.

This is the core of CSS, right? You select a brick and describe to the browser how it looks. Saying it out loud reminded me that [<VPIcon icon="fas fa-globe"/>CSS is literal and logical](https://geoffgraham.me/css-is-logical/).

A width. A height. And a border. That’s all it takes to add a little shape.

<CodePen
  user="anon"
  slug-hash="LENWMBQ"
  title="Just a box."
  :default-tab="['css','result']"
  :theme="dark"/>

I know there is probably a more “academic” way to teach CSS. For example, [<VPIcon icon="fas fa-globe"/>writing modes are probably an excellent starting point](https://rachelandrew.co.uk/archives/2018/10/04/the-way-we-talk-about-css/) to get into directionality and positioning before a single splash of color is on the page. That’s all fine and whatnot, but all of that is gibberish to a five-year old. I can’t even get into things like `aspect-ratio` without first getting into the basic `width` and `height`. Those fancy things can wait for now.

What I was looking for was an [**“A-ha!” moment**](/css-tricks.com/moment-css-started-making-sense.md). I continued the exercise and drew a little house. Then I refreshed the page and the structure finally had a shape.

<CodePen
  user="anon"
  slug-hash="azNwwoa"
  title="My DIgital House CSS Outline"
  :default-tab="['css','result']"
  :theme="dark"/>

It wasn’t much, of course: a little triangle that looked like a roof, a square pretending to be a wall, two tiny squares for windows, and a skinny rectangle that I guess could be a door. It looked like something you draw fast with a dull pencil. Regardless, my niece leaned in right away, almost bumping her forehead on the screen.

```md
**Niece:** Why does the house not have color? It looks so plain.  
**Me:** I haven’t added color yet.  
**Niece:** You forgot. You always forgot.  
**Me:** I’ll add it.
```

I added a little color to the house. And that’s when things started to click.

<CodePen
  user="anon"
  slug-hash="ZYQvXdM"
  title="My Digital House"
  :default-tab="['css','result']"
  :theme="dark"/>

```md
**Niece:** So this brick says what is there.  
**Me:** Yes.  
**Niece:** And this color thing make it pretty?  
**Me:** That’s right.  
**Niece:** So HTML says what is there, and CSS makes it pretty.  
**Me:** Exactly.
```

That observation presented the perfect opportunity to clarify the separation between the HTML and CSS. HTML describes what exists in the document tree. CSS describes how those elements should appear. Without styling, every element is technically present but visually absent.

“Now it looks *real*!” she declared. She even pointed to the drawers in the room we were in and related them to the structure of boxes and the decorations that made them look the way they were.

HTML lays down the pieces and CSS brings them to life with lines, colors, and other bits of decoration and positioning. This can still feel magical even to us, right? Getting my niece to this point reminded me why even the basics of what we do is satisfying.

---

## What I learned from a five-year old

“Now I can do computer, too!” she announced. That’s when my niece decided she was satisfied and bounced out of the room. I kept the little house on my screen for a while longer and thought about the exchange.

It’s easy to get into a rut where the magic of what we do is superseded by other things. We have a job we need to do and we sweep away the “boring” stuff to get things done. And once those things are done, how often do we pause and actually look at what we’re doing, line by line?

That’s the biggest thing I learned from my five-year old niece: there’s still magic in what we do, no matter how big or small the task. We might spend hours in blog posts and social threads getting pedantic about preferred toolsets, specific techniques, what’s considered best practice, and how things should be named. And, yes, these do matter matter. But the brief time I spent with my niece felt more important, meaningful, and satisfying than anything else. Strip everything away and the [<VPIcon icon="fas fa-globe"/>web still runs on something simple](https://remysharp.com/2016/01/20/why-i-love-working-with-the-web).

Those few boxes with color on them capture my attention longer than the assignment I was supposed to be doing. I don’t even know why I kept staring at it. Maybe because I realized I rush through these basics without even noticing. That moment sort of pushed me to slow down and actually look at what I was doing, line by line, instead of jumping straight to the point.

HTML suddenly looks less like code and more like building materials to me. CSS, meanwhile, not only steps in with a paint brush, but has the ability to mold those materials into beautiful shapes like clay.

So, even though my niece came to me to help her understand HTML and CSS, she was actually the one who taught me a thing or two about it. It was the way she looked at the page and saw a house that made things click more succinctly for me than how I’ve heard or read it anywhere else. The way she articulated the relationship between HTML and CSS cut straight to the point in a way nothing else has for me.

---

## How would you explain it?

Taking time to explain the basics of HTML and CSS proved to me that teaching what we do — or anything, really — reveals what we know and especially what we assume we know. Teaching someone who has never seen or written a single line of code forces you to check yourself. Apparently, that’s what [<VPIcon icon="fas fa-globe"/>The Feynman Technique](https://mometrix.com/blog/the-feynman-technique/) for learning is all about: teaching to learn.

Learning is a subjective journey rather than a one-size-fits-all sort of deal. Some of us learn visually, some learn by reading, and others learn through activity. And, naturally, something like age drastically impacts things. Adults come in with way more context and experience than a child, even if that context and experience has nothing to do with writing code. So, while I might have taken a more technical route with an adult, perhaps, finding an analogy that resonates with something my niece relates to was the way more effective path for her, even if it didn’t really require writing code.

Which begs me to ask the question: How would you have approached explaining HTML and CSS to my niece? Or maybe not my niece, but a five-year old in your life that you know? What analogies would you use, if any? I think it would be very cool for you to take time to do exactly that and reflect on exactly what you said. What does that tell you about what you know and assume about your work?

---

## Further reading

```component VPCard
{
  "title": "HTML, CSS and our vanishing industry entry points – Rachel Andrew",
  "desc": "Everyone is angry about CSS again. I’m not even going to try to summarize the arguments. However it always seems to boil down to the fact that CSS is simultaneously too easy to bother with, yet so hard it needs to be wrapped up in a ball of JavaScript in case it scares the horses. You can read a more sensible take from Chris Coyier in The Great Divide.",
  "link": "https://rachelandrew.co.uk/archives/2019/01/30/html-css-and-our-vanishing-industry-entry-points//",
  "logo": "https://rachelandrew.co.uk/wp-content/uploads/2022/07/favicon1.png",
  "background": "rgba(0,0,0,0.2)"
}
```

- [**“In Praise of the Basics”**](/smashingmagazine.com/in-praise-of-the-basics.md) (Geoff Graham)

```component VPCard
{
  "title": "Learning to Learn",
  "desc": "There’s been a lot of talk recently about whether or not you need a degree to be in tech (spoiler: you don’t). But please don’t take this to mean you don’t",
  "link": "/css-tricks.com/learning-to-learn.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

<SiteInfo
  name="A 6-year old wants to make a website. I know basic HTML/CSS but I'm not good at teaching. How or where should I start?"
  desc="Answer (1 of 9): Why you mention you are not good at teaching. I think it somehow don’t make sens and not relevant to the question? I assume what you want is a static website and it’s easy to make a website if you have basic knowledge at html/css. Just create simple html file locally with the c..."
  url="https://quora.com/A-6-year-old-wants-to-make-a-website-I-know-basic-HTML-CSS-but-Im-not-good-at-teaching-How-or-where-should-I-start/"
  logo="//qsf.fs.quoracdn.net/-4-ans_frontend_assets.favicon-new.ico-26-e7e93fe0a7fbc991.ico"
  preview="https://qph.cf2.quoracdn.net/main-custom-t-2433-600x315-qaptadjlpyoampylfxbwsfhyroksvihq.jpeg"/>

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "That Time I Tried Explaining HTML and CSS to My 5-Year Old Niece",
  "desc": "I would like to tell you what I learned from a five-year old child about HTML and CSS. It’s funny how explaining something you do almost naturally teaches you about yourself and what you take for granted.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/that-time-i-tried-explaining-html-and-css-to-my-5-year-old-niece.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
