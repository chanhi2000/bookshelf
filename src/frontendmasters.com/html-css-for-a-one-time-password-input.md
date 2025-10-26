---
lang: en-US
title: "HTML & CSS for a One-Time Password Input"
description: "Article(s) > HTML & CSS for a One-Time Password Input"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - frontendmasters.com
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > HTML & CSS for a One-Time Password Input"
    - property: og:description
      content: "HTML & CSS for a One-Time Password Input"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/html-css-for-a-one-time-password-input.html
prev: /programming/css/articles/README.md
date: 2025-02-05
isOriginal: false
author: 
  - name: Chris Coyier
    url: https://frontendmasters.com/blog/author/chriscoyier/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/5067
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
  name="HTML & CSS for a One-Time Password Input"
  desc="The typical approach for these inputs is using multiple HTML inputs, one for each character. But is that a good idea? "
  url="https://frontendmasters.com/blog/html-css-for-a-one-time-password-input/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/5067"/>

You know those One Time Password inputs? The UI is typically 4 or 6 numbers with individual inputs. Just from today…

![Here’s the UI the Safeway app uses in the Pharmacy section to log in.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/02/IMG_2817.png?resize=764%2C1024&ssl=1)

![Here’s how Substack authenticates.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/02/Screenshot-2025-02-04-at-9.10.08%E2%80%AFAM.png?resize=1024%2C534&ssl=1)

Brad Frost was [<VPIcon icon="fas fa-globe"/>blogging about them](https://bradfrost.com/blog/post/the-ux-of-login-codes/) recently. They certainly have some issue! Here’s one he spells out that I agree with wholeheartedly:

::: info The UX of login codes | Brad Frost <VPIcon icon="fas fa-globe"/><code>bradfrost.com</code>

<SiteInfo
  name="The UX of login codes"
  desc="I could do a deep dive into the UX of login codes, but I'll do my best to keep it short. If your product texts/emails login codes, the experience better be amazing. The text/email never comes. You find yourself in limbo and eventually have to go fishing for the ”Didn't get your code?"
  url="https://bradfrost.com/blog/post/the-ux-of-login-codes/"
  logo="https://bradfrost.com/favicon.ico"
  preview="https://bradfrost.com/wp-content/uploads/2025/01/Screenshot-2025-01-14-at-9.13.07 AM.png"/>

I don’t like the pattern where each digit is its own text box. It’s an affordance that’s supposed to make things clearer, but it doesn’t (for me at least). Can I paste?*Where*do I paste? Is my paste going to carry over into all of the little boxes? Half the time there’s a dash in the code; does that get included?

:::

It’s awfully tricky to get right, considering the user confusion that can happen before you’re interacting with those little boxes. And once you are, the experience better be awfully accommodating.

A while back I read an article by Phuoc Nguyen about them called [<VPIcon icon="fas fa-globe"/>Build an OTP input field](https://phuoc.ng/collection/html-dom/build-an-otp-input-field/). I’d say all-in-all, Phuoc did a good job. The design and user experience was considered, like using the arrow keys to move between the inputs and handling “paste”. I’d say accessibility too but I feel like this is complicated enough of an interaction I can’t personally vouch for that.

But I’m also also like — *damn* — that’s complicated. That’s a lot of JavaScript code. Why is this so hard? And what would happen without JavaScript? Seems like it would be a pretty gnarly experience. A particular thing that *makes* it hard is making each character a separate `<input />` in the HTML.

```html
<div class="otp">
  <input type="text" maxlength="1" />
  <input type="text" maxlength="1" />
  <input type="text" maxlength="1" />
  <input type="text" maxlength="1" />
</div>
```

That complicates validation, input, pasting, accessibility, navigation… literally everything.

And then I was like… why can’t this just be *one* input? The rectangles behind the numbers is just visual theater. Just a bit of trendy decoration. It’s just a **_styling concern_**, not a semantic, usability, or any other concern.

So I was like… I’m just gonna make those rectangles `background-image`s and see if that works. So I built a demo, but it had a flaw: as you typed the last character, the value would kinda slide one direction and look bad. [You can see it here. (<VPIcon icon="fa-brands fa-codepen"/>`chriscoyier`)](https://codepen.io/chriscoyier/pen/LYqJXxW)

But I posed the challenge in our [<VPIcon icon="fas fa-globe"/>ShopTalk Discord](https://patreon.com/shoptalkshow) and others had some ideas. Josh Collingsworth [had an idea (<VPIcon icon="fa-brands fa-codepen"/>`collinsworth`)](https://codepen.io/collinsworth/pen/xxMyOqO?editors=1100) where you could cover up some area at the end and prevent the movement issue (the yellow block would be white or whatever covers up properly). Alex Fimion did it a smidge cleaner by covering the last bit with `background-image` instead of a pseudo-element. Here’s that:

<CodePen
  user="fimion"
  slug-hash="NWoOrGL"
  title="OTP Single Input"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

Is that better than the 4-inputs approach?

I’m giving an only-slightly-hesitant thumbs up 👍. My hesitation is that in order for this to look right, there is a *lot* of “magic number” usage. That is, numbers that are just visually tweaked by hand to make it all work, and based on finicky things like font metrics (which might change over time and with different fonts) rather than hard foundational layout.

So let’s call this a pretty good take. I think when you consider the HTML used alone you can see using a one-input approach feels best:

```html
<input
  required
  type="text"
  autocomplete="one-time-code"
  inputmode="numeric"
  maxlength="4"
  pattern="\d{4}"
>
```

In fact, if I started having problems with the look of the “rectangles behind the numbers” approach, I’d just make it a big ol’ single input *without* the individual rectangles. Like I said, I feel those are just something of a design trend anyway.

---

## What does AI want to do?

Just as a fun little exercise, I used the *very generic* prompt `create a 4 digit PIN input UI` with zero rounds of feedback/iteration across a number of different scaffolding tools.

![v0 used TSX and four individual inputs and tried to help with dealing with the complex UX. It worked decently once, then two more tries it tried using shadcn and some toast library and all kinds of stuff and just failed to run at all.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/02/Screenshot-2025-02-05-at-1.58.26%E2%80%AFPM.png?resize=1024%2C726&ssl=1)

![Copilot wanted four individual inputs and helped with the moving to the next input after any character typed, but none of the other issues.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/02/Screenshot-2025-02-05-at-2.01.50%E2%80%AFPM.png?resize=1024%2C871&ssl=1)

![Cascade (in Windsurf) went with a single input (!) and got the HTML pretty decent.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/02/Screenshot-2025-02-05-at-2.03.15%E2%80%AFPM.png?resize=1024%2C663&ssl=1)

![Bolt.new used a React/TSX/Tailwind approach with four inputs and handled pasting, input moving, etc pretty nicely.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/02/Screenshot-2025-02-05-at-2.04.34%E2%80%AFPM.png?resize=1024%2C761&ssl=1)

I’m fairly confident that if you provided a more elaborate prompt with more specific requirements and were willing to go through rounds of iteration, you could get what you want out of these tools. I just found it interesting that by default, based on the code they were trained on, that what you get tends to focus on using multiple inputs, not to mention a heap of tools you don’t ask for.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "HTML & CSS for a One-Time Password Input",
  "desc": "The typical approach for these inputs is using multiple HTML inputs, one for each character. But is that a good idea? ",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/html-css-for-a-one-time-password-input.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
