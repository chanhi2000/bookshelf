---
lang: en-US
title: "Am I a Sadistic Developer? Are You?"
description: "Article(s) > Am I a Sadistic Developer? Are You?"
icon: fas fa-user-tie
category:
  - Career
  - Tip
  - Article(s)
tag:
  - blog
  - frontendmasters.com
  - career
  - tip
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Am I a Sadistic Developer? Are You?"
    - property: og:description
      content: "Am I a Sadistic Developer? Are You?"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/am-i-a-sadistic-developer-are-you.html
prev: /projects/career/articles/README.md
date: 2025-04-24
isOriginal: false
author:
  - name: Amit Sheen
    url : https://frontendmasters.com/blog/author/amitsheen/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/5619
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Career > Article(s)",
  "desc": "Article(s)",
  "link": "/projects/career/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Am I a Sadistic Developer? Are You?"
  desc=""
  url="https://frontendmasters.com/blog/am-i-a-sadistic-developer-are-you/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/5619"/>

> This code looks… sadistic.
> 
> Someone reviewing some code I wrote this week

*Sadistic*, as in I purposefully wrote the code this way to make things harder for myself. Coding in a way that no typical developer would ever write on purpose.

At first, I laughed it off. I mean, I’m not someone who likes working hard for no reason. People who know me know I’m actually pretty lazy.

But the comment stuck with me, and I started wondering: what does “developer sadism” even mean? What does it look like in real life? Who’s the real sadist here? Me? *You?*

Let’s find out.

---

## Not All Code Matters Equally

To be fair, the code in question wasn’t part of some production project or even a side project. It was just a little CodePen experiment I was playing around with. I was testing out a new CSS feature, trying weird things on purpose to explore how the browser handled different edge cases. That’s it.

I’ve always believed in pushing tools to their limits as a way to learn them better. Over the years, I’ve done that with pretty much every technology I’ve worked with. The harder I pushed, the more I understood. *“Train hard, fight easy.”* So yes, maybe the code looked a bit messy or over-engineered in that moment. That’s fine. That’s not sadism, that’s how you grow.

All that said, Developer Sadism isn’t something I just made up (I mean, *I did*, but bear with me). We’ve all run into tools, APIs, or processes that punish instead of guide, and feel less like helpful utilities and more like a trap. We’ve all stared at a piece of code and thought, *what on earth was this person thinking?*

But does that count as sadism? We all make mistakes, especially when writing code. Maybe it’s perfectionism, maybe it’s a lack of empathy, or maybe it’s that “tough love” culture we’ve internalized from years of bad code reviews. I want to believe no one actually means to make things difficult and harder, so maybe it’s more of an ‘unintentional sadism’. Still, whether we mean to or not, or even *know* it or not, we sometimes end up sabotaging ourselves and our code.

---

## The Deadly Sins

One of the (worst?) sins is when there is over-engineering for purity rather than usability, and a perfectly fine solution is sacrificed to chase some ideal architecture. Developers forget that code is meant to be read, understood, and changed by real people. Instead they end up with five layers of abstraction so neat that nobody can figure out how they all connect. This is not clever. This is building walls just to admire them.

Another favorite of mine is when developers chase every shiny new trend without asking if it fits the project. They throw a dozen experimental libraries at a simple page and call it innovation. They never stop to wonder if the tool actually solves their problem or if it just looks cool. The result is a bloated mess that breaks on the slightest breeze. Great for internet points. Horrible for shipping anything.

A nice sub-sin of trend-chasing is when developers fall in love with a specific tool or feature and try to use it for everything (everything!), regardless of whether it’s the right tool for job or not. I’ve seen developers using routing libraries to navigate between elements, just because they love working with React Router. Or developers who slap `* { display: flex; }` in their CSS, simply because it’s all they know. While these tools and features have their place, overusing them in situations where they’re unnecessary can lead to code that’s hard to maintain and harder to understand. It’s a good rule of thumb to ask: *“Does this tool actually solve my problem, or am I just using it because it’s my favorite hammer?”*

You can even get overly attached to a development philosophy itself. There’s [<FontIcon icon="fas fa-globe"/>a great post by Blake Watson](https://blakewatson.com/journal/fancy-foreach-with-functional-programming-in-javascript/) that talks about how he took functional programming too far in a real-world project, only to realize later that clarity and pragmatism matter more than theoretical purity. It’s a good reminder that no paradigm, however elegant, should override the basic goal: to write code that works, is readable, and makes life easier for the team.

On the more common side, you’ll find the sin of laziness. You see it every time you encounter a constant named a, a function named `doit()`, or an error message like `‘Invalid data’` that doesn’t tell you anything. Sometimes, this laziness can also lead us to skip steps, resulting in things like too-deeply nested ternary expressions. It might seem clever or smart in the moment, but try reading this:

```js
const status = isActive
  ? hasAccess
    ? "green"
    : isPending
      ? "orange"
      : "red"
  : "gray";
```

There are plenty more sins we could call out, but I’ll save those for another day. For now, consider this one last example: I once knew a developer who set up a CI check so strict, he couldn’t even merge his own pull requests. He must have thought watching the team spin in circles was hilarious. Spoiler alert: no one was laughing.

---

## Consequences

Sure, Developer Sadism might start off as a joke, or as a side effect of chasing perfection. But the consequences are very real. Let’s talk about two of the most immediate ones.

### Technical Debt in Disguise

A lot of this unintentional sadism hides behind good intentions. It wears the costume of “best practices”, “clean architecture” or “modern tooling.” But when you peel that back, it’s often just technical debt in disguise.

These excuses can, and will, slow you down. They make the code harder to change, harder to fix, and harder to trust. The real kicker is that nobody *thinks* they’re writing bad code while they’re doing it. That’s the trap.

### The Human Cost

The bigger problem? People burn out. Teams waste time. Developers grow cynical.

When every task feels like battling some overengineered monster, momentum dies. You stop improving the product and start just surviving the codebase. That kills creativity, motivation, and morale. And it’s contagious, one person’s impossible setup becomes the whole team’s daily nightmare.

You know that feeling when a new teammate joins and their first reaction to your codebase is “…why?” That’s not a rite of passage, that’s a warning sign.

---

## Doing Better with Code That Cares

It doesn’t have to be this way. Writing code shouldn’t feel like setting traps for yourself or others. It *can* be better. We can write code that supports us, rather than sabotages us. We can build tools that invite collaboration, not confusion. It starts with being a little more mindful and a lot more human.

### Self‑audit your habits

As developers, we often fall into routines without realizing the impact they have on our workflow and the team. It’s easy to get stuck in certain habits, like hoarding knowledge, overcomplicating solutions, or getting fixated on “perfect” code. But all of these tendencies can lead to friction and unnecessary difficulty. Self-auditing means taking a step back and regularly evaluating your own development practices.

Are you the type to hoard useful information, leaving others to struggle or reinvent the wheel? Do you make decisions that you think are clever, but that only you understand? It’s time to ask yourself: “Is this really the best way to do things? Could someone else come in and immediately grasp what’s going on?” This kind of reflection helps you become more aware of your own habits and opens the door to more thoughtful and accessible solutions.

By identifying bad habits, we can focus on being more intentional and sharing knowledge freely. It’s a simple shift, but it can have a huge impact on both your own productivity and the overall team dynamic.

### Empathy as a Feature

Great code isn’t just about functionality; it’s about making things easy for the people who will interact with it. Empathy means considering your fellow developers and users when building tools, writing documentation, and designing error messages.

Think of onboarding flows and error messages as part of the “user experience.” Make sure they’re clear, helpful, and easy to navigate. This ensures that everyone, from your teammates to your users, feels supported and empowered to keep moving forward.

### Design for Forgiveness

Mistakes are inevitable, and good tooling should help people recover from them, not punish them for it. Designing with forgiveness in mind means acknowledging that no one gets everything right on the first try.

Add helpful hints, dry-run flags, or “undo” options in your tooling. These small touches can save time and frustration, allowing people to recover from errors quickly and easily. It’s about creating a system that lets people try, fail, and learn without making the process feel like a dead-end.

### Seek Feedback Constantly

No one’s code is perfect, and it’s important to invite others to offer their perspectives and learn how they interact with your code. Fresh eyes can catch issues you might have missed and provide valuable insights on usability, clarity, and overall functionality.

Feedback isn’t just about finding bugs; it’s about understanding how your design and decisions affect the people using it. By actively seeking feedback, you foster a collaborative environment, ensure your code is accessible, and discover new ways to improve your development practices.

### Invest Time in DX

Developer Experience (DX) often gets overlooked, but investing a little extra time in creating clear documentation or providing example scripts can save hours of frustration for the entire team. A small upfront effort to clarify the usage of a tool, library, or API can go a long way in helping others get up to speed quickly and avoid confusion.

A fine-tuned experience and a well-documented system isn’t just nice to have, it’s a game-changer for team productivity and happiness. By thinking ahead about how others will interact with your code, you create an environment where everyone can work more efficiently and with less friction.

---

## Conclusion: Let’s Break Free from Sadism

At the end of the day, no one wants to be the source of frustration in the team. By recognizing and improving our own development practices, we’re not just making life easier for ourselves, but we’re helping create a healthier, more productive team environment. The goal isn’t perfection, it’s improvement, one step at a time.

Have you seen yourself in any of the “sadistic” practices talked about above? See if you can try to eliminate it in some way this week. Whether it’s simplifying your solutions, sharing knowledge more freely, or making your code more approachable, small steps lead to big changes.

And remember, we’ve all been there.

Got a horror story to share? Or maybe you have your own tips for avoiding sadistic habits? Drop a comment and let’s keep the conversation going!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Am I a Sadistic Developer? Are You?",
  "desc": "",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/am-i-a-sadistic-developer-are-you.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
