---
lang: en-US
title: "ChatGPT and the proliferation of obsolete and broken solutions to problems we hadn’t had for over half a decade before its launch"
description: "Article(s) > ChatGPT and the proliferation of obsolete and broken solutions to problems we hadn’t had for over half a decade before its launch"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - AI
  - LLM
  - OpenAI
  - Article(s)
tag:
  - blog
  - frontendmasters.com
  - css
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
  - openai
  - open-ai
  - chatgpt
head:
  - - meta:
    - property: og:title
      content: "Article(s) > ChatGPT and the proliferation of obsolete and broken solutions to problems we hadn’t had for over half a decade before its launch"
    - property: og:description
      content: "ChatGPT and the proliferation of obsolete and broken solutions to problems we hadn’t had for over half a decade before its launch"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/chatgpt-and-old-and-broken-code.html
prev: /programming/css/articles/README.md
date: 2025-05-20
isOriginal: false
author:
  - name: Ana Tudor
    url : https://frontendmasters.com/blog/author/anatudor/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/5808
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
  "title": "OpenAI > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/openai/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="ChatGPT and the proliferation of obsolete and broken solutions to problems we hadn’t had for over half a decade before its launch"
  desc="It was a lovely day on the internet when someone asked how to CSS animated gradient text like ChatGPT’s “Searching the web” and promptly got an answer saying “Have you tried asking ChatGPT? Here’s what it told me!” - well, maybe not these exact words, but at least it rhymes. Both the question and this […]"
  url="https://frontendmasters.com/blog/chatgpt-and-old-and-broken-code/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/5808"/>

It was a lovely day on the internet when someone asked how to CSS animated gradient text like ChatGPT’s “Searching the web” and promptly got an answer saying “Have you tried asking ChatGPT? Here’s what it told me!” - well, maybe not these exact words, but at least it rhymes.

<VidStack src="https://videopress.com/a6d5e9a3-67f7-4e11-b01f-715e618a5273" />

Both the question and this answer have since been deleted. But we still have[<VPIcon icon="iconfont icon-openai"/>the chat link](https://chatgpt.com/share/68109ae9-9068-8000-8b23-eef6e849d296)that got posted in the answer and we’re going to look into it.

::: details Screenshot of ChatGPT Generated Code

![screenshot of the code produced by ChatGPT](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/05/438759054-4ee31b92-e0c5-4551-8a5a-745be326e83f.png?resize=635%2C965&ssl=1)

:::

This is the code that ChatGPT spat out in text format:

```html :collapsed-lines title="index.html"
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Text Color Loading Animation</title>
    <style> body {
        background-color: #111;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
      }

      .loading-text {
        font-size: 3rem;
        font-weight: bold;
        background: linear-gradient(90deg, #00f, #0ff, #00f);
        background-size: 200% auto;
        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;
        -webkit-text-fill-color: transparent;
        animation: shimmer 2s linear infinite;
      }

      @keyframes shimmer {
        0% {
          background-position: -100% 0;
        }
        100% {
          background-position: 100% 0;
        }
      } </style>
  </head>
  <body>
    <div class="loading-text">Loading...</div>
  </body>
</html>
```

Now you may be thinking: what’s the problem with this code, anyway? If you copy-paste into CodePen, it does produce the desired result, doesn’t it?

Well, we also get the exact same result if we replace this CSS:

```css
.loading-text {
  font-size: 3rem;
  font-weight: bold;
  background: linear-gradient(90deg, #00f, #0ff, #00f);
  background-size: 200% auto;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
  animation: shimmer 2s linear infinite;
}

@keyframes shimmer {
  0% {
    background-position: -100% 0;
  }
  100% {
    background-position: 100% 0;
  }
}
```

with this CSS:

```css
.loading-text {
  font-size: 3rem;
  font-weight: bold;
  background: linear-gradient(90deg, #00f, #0ff, #00f) -100%/ 200%;
  -webkit-background-clip: text;
          background-clip: text;
  color: transparent;
  animation: shimmer 2s linear infinite;
}

@keyframes shimmer {
  to {
    background-position: 100%;
  }
}
```

You might think the ChatGPT solution includes some fallbacks that maybe make it work in more browsers. You’d be wrong. There are exactly zero browsers in which the ChatGPT solution isn’t broken, but the alternative above is. Zero! Not a single one. In all of the (very old) browsers where the alternative above breaks, the ChatGPT solution breaks too.

---

## The history of gradient text solutions and what ChatGPT gets wrong

<SiteInfo
  name="ChatGPT and the proliferation of obsolete and now broken solutions to problems we hadn't had for over half a decade before its launch"
  desc="ChatGPT and the proliferation of obsolete and now broken solutions to problems we hadn't had for over half a decade before its launch - bad-chat-gpt-solutions.md"
  url="https://gist.github.com/thebabydino/6a5be00091644389be347816d25d592d#the-history-of-gradient-text-solutions-and-what-chatgpt-gets-wrong"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://github.githubassets.com/assets/gist-og-image-54fd7dc0713e.png"/>

Let’s go some 15 years back in time. I discovered CSS in August 2009, just as it was getting new shiny features like transforms and gradients. One of the first tricks I came across online in early 2010 was precisely this — creating image text in general and CSS gradient text in particular.

The declaration I ditched completely from what ChatGPT generated was:

```css
-webkit-text-fill-color: transparent;
```

This answer only included`-webkit-text-fill-color`, though I’ve seen versions of this circulating online that use:

```css
-webkit-text-fill-color: transparent;
        text-fill-color: transparent;
```

There is no such thing as`text-fill-color`. There isn’t even a standard spec for it. It’s just something that was implemented in WebKit with a prefix[<VPIcon icon="iconfont icon-webkit"/>almost 2 decades ago](https://webkit.org/blog/85/introducing-text-stroke/)and then became used enough on the web that other browsers had to support it too. With the`-webkit-`prefix. So the prefixed version is the*only*one that has ever been implemented in*any*browser.

While WebKit introduced this property alongside`-webkit-text-stroke`, its usage would end up far exceeding that of`-webkit-text-stroke`. This is something that started about 15 years ago when`-webkit-text-fill-color`became a common tactic for making text transparent*only*in WebKit browsers. Precisely for[<VPIcon icon="fas fa-globe"/>image text](https://trentwalton.com/2010/03/24/css3-background-clip-text/)in general and then a lot more often for gradient text in particular.

At the time, clipping backgrounds to`text`was[<VPIcon icon="iconfont icon-webkit"/>only supported in WebKit browsers](https://webkit.org/blog/164/background-clip-text/)via the (back then) non-standard`-webkit-background-clip: text`. If we wanted to get a visible gradient text this way, we had to be able to see through the actual text on top of the clipped`background`. Problem was, back in 2010, if we set`color`to`transparent`, then we’d get:

- Gradient text as desired in browsers supporting both`-webkit-background-clip: text`and CSS gradients
- No visible text and a gradient rectangle in browsers supporting CSS gradients, but not`-webkit-background-clip: text`(in 2010, this would have been the case for Firefox)
- Nothing visible at all in browsers not supporting CSS gradients (remember the first IE version to support CSS gradients was IE10, which only came out in 2012; plus Opera still had its own engine back then and wouldn’t get CSS gradients for another year)

![Visual representation of the three cases described above.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/05/439226155-3c23de1e-bdbf-4795-8d2b-5cf745aa1a9f.png?resize=1024%2C374&ssl=1)

So given the only browsers we could get gradient text in at the time were WebKit browsers, it made sense to restrict both setting a gradient`background`and making the text`transparent`to WebKit browsers. At the time, all gradients were prefixed, so that made the first part easier. For the second part, the solution was to use`-webkit-text-fill-color`to basically override`color`*just*for WebKit browsers.

So to get an aqua to blue gradient text with a decent in-between blue text fallback in non-supporting browsers, the code we had to write in 2010 looked like this:

```css
color: #07f;
background: 
  -webkit-gradient(linear, 0 0, 100% 0, 
    color-stop(0, #0ff), color-stop(1, #00f));
-webkit-background-clip: text;
-webkit-text-fill-color: transparent
```

Note that at the time, this was seen as a temporary WebKit-only solution, as other options for getting such gradient text[<VPIcon icon="iconfont icon-w3s"/>were being discussed](https://w3.org/Style/CSS/Tracker/issues/17). The “temporary” solution stuck, I guess. And so[<VPIcon icon="fas fa-globe"/>it’s now in the spec](https://drafts.csswg.org/css-backgrounds-4/#background-clip).

And yes, that is[<VPIcon icon="iconfont icon-webkit"/>a different gradient syntax](https://webkit.org/blog/175/introducing-css-gradients/)(which, by the way, is still supported to this day in Chrome). The syntax for CSS gradients went through multiple iterations. After this one, we had another`-webkit-`prefixed version, a lot more similar to what we have today, but still not the same. If you’re curious, you can see a bit more about the support timeline in[my 10 year old rant(<VPIcon icon="fa-brands fa-codepen"/>`thebabydino`)](https://codepen.io/thebabydino/full/pjxVWp)about using gradient generators without understanding the code they spit out and without having a clue how much of it is really necessary. Because before we had AI chatbots spitting out too much needless CSS for the desired result, we had all these CSS3 generators doing pretty much the same! Like a song says, oh, it was different… and yet the same!

Using`-webkit-text-fill-color`to override`color`just for WebKit browsers, we got:

![the state of things in 2010<br/>Visual representation of possible results in 2010, when using `-webkit-text-fill-color: transparent` to allow seeing through the text in WebKit browsers. If all `-webkit- prefixed` properties were supported, we got a left to right, aqua to blue gradient text. If none were supported, we got an in-between blue fallback. If `-webkit-background-clip: text` was not supported while `-webkit-gradient` and `-webkit-text-fill-color` were, then we got no visible text on a left to right, aqua to blue gradient rectangle. If `-webkit-text-fill-color` was supported and set the text to transparent, but `-webkit-gradient` wasn't, then nothing would show up. In this final case, the support status for `-webkit-background-clip: text` was irrelevant.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/05/439277178-151a9a27-accf-4c04-bd71-5a1f9d6e1456.png?resize=1024%2C700&ssl=1)

Better, I guess, but not ideal.

Since support for`-webkit-text-fill-color`came before for CSS gradients, that left a gap where the text would be made transparent, but there would be no gradient to be clipped to (making the support status for`-webkit-background-clip: text`irrelevant). In this case, there would be no visible text and no gradient… just nothing but empty space.

I first thought that anyone who’d be using one of these browsers that would always be the first to support new and shiny things would also care about keeping them updated, right? Right?

Wrong! Some months later, I went to a job interview. I’ve always been a show-off, I’m like a fish in the water when live coding, so I jumped on the chance to actually get in front of a computer and impress with all the cool things I could do thanks to the new CSS features. They were using a Chrome version that was quite a bit behind the then current one. CSS gradients did not work.

I started using[<VPIcon icon="fas fa-globe"/>Modernizr](https://modernizr.com/)to test for CSS gradient support after that. We didn’t have`@supports`back then, so Modernizr was the way to go for many years.

Then there was[<VPIcon icon="fas fa-globe"/>the Android problem](https://css-tricks.com/image-under-text/#aa-but-there-is-no-perfect-system-for-this)- CSS gradients being supported, but not`-webkit-background-clip: text`, though support tests returned false positives. Since I didn’t have a smartphone and I don’t think I even knew anyone who had one at the time, I couldn’t test if any fix found on the internet would work and I don’t recall anyone ever complaining, so I confess I never even bothered with trying to cover this case.

Then things started to get even funnier.

In 2011, WebKit browsers started supporting a newer, different gradient syntax. Still with a prefix, still different from the standard one. Most notably, angles were going[<VPIcon icon="fas fa-globe"/>in the opposite direction](https://kittygiraudel.com/2013/02/04/dig-deep-into-css-gradients/)and the gradient start was offset by`90°`relative to the current version, meaning the`0°`gradient start was taken to be at 3 o’clock, rather than at 12 o’clock like in the case of the current standard one.

This really caught on. Prefixes[<VPIcon icon="fas fa-globe"/>were meant to solve a problem](https://alistapart.com/article/prefix-or-posthack/), but a lot of developers skipped reading the instructions on the box, so they wrote code with either too many prefixed versions of the same properties or, more commonly, not enough… usually just the WebKit one. Which meant other browsers started considering supporting the`-webkit-`prefix too.

There was[<VPIcon icon="fas fa-globe"/>a lot](http://glazman.org/weblog/dotclear/index.php?post/2012/02/09/CALL-FOR-ACTION:-THE-OPEN-WEB-NEEDS-YOU-NOW)[<VPIcon icon="fas fa-globe"/>written](https://christianheilmann.com/2012/02/09/now-vendor-prefixes-have-become-a-problem-want-to-help-fix-it/)[<VPIcon icon="fas fa-globe"/>about it](https://sitepoint.com/w3c-css-webkit-prefix-crisis/)at the time, but basically what this meant was that Opera first implemented`-webkit-`prefixes in 2012 and then[<VPIcon icon="fas fa-globe"/>switched away](https://tobiasahlin.com/blog/opera-moves-to-webkit/)from Presto altogether a year later, at around the same time Blink[<VPIcon icon="fa-brands fa-chrome"/>was announced](https://blog.chromium.org/2013/04/blink-rendering-engine-for-chromium.html). Another year later, IE[<VPIcon icon="fa-brands fa-edge"/>added](https://blogs.windows.com/msedgedev/2015/06/17/building-a-more-interoperable-web-with-microsoft-edge/)the`-webkit-`prefix too. This would carry over to Edge and then Edge would also move to Blink. And then in[<VPIcon icon="fa-brands fa-firefox"/>2015](https://bugzilla.mozilla.org/show_bug.cgi?id=1107378)-[<VPIcon icon="fa-brands fa-firefox"/>2016](https://hacks.mozilla.org/2016/09/firefox-49-fixes-sites-designed-with-webkit-in-mind-and-more/), Firefox also implemented some non-standard`-webkit-`prefixed properties and mapped some other`-webkit-`prefixed properties to their`-moz-`or standard equivalents.

What this meant was that for a while, we had support for`-webkit-`prefixed gradients in non-WebKit browsers… but not support for`-webkit-text-fill-color`,`-webkit-background-clip: text`, so the following code:

```css
color: #07f;
background: -webkit-linear-gradient(left, #0ff, #00f);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent
```

would for example produce a mid blue text on an aqua to blue gradient rectangle in Opera in-between starting to support the`-webkit-`prefix and switching to Blink. Not very readable, right?

![The text 'Loading...' in an in-between blue on top of a left to right, aqua to blue gradient. The contrast between the text and the background is poor. It could at most pass AA for large text (above 18pt or bold above 14pt) and AA for user interface components and graphical objects on the left end, but would fail WCAG 2.0 and 2.1 everywhere else.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/05/439339272-c6f54d56-4f55-4094-bcb7-d8c25760e568.png?resize=800%2C320&ssl=1)

So the[<VPIcon icon="fas fa-globe"/>solution for that](https://nimbupani.com/using-background-clip-for-text-with-css-fallback.html)was to add another fully transparent`-o-`prefixed gradient*after*the`-webkit-`one:

```css
color: #07f;
background: -webkit-linear-gradient(left, #0ff, #00f);
background: -o-linear-gradient(transparent, transparent);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent
```

Quite the mess indeed.

Since 2016, all browsers except Opera Mini have supported clipping backgrounds to`text`. Given the lack of support for clipping backgrounds to`text`was why we avoided setting`color`to`transparent`, what’s the point of still using`-webkit-text-fill-color`now?

You might say support. Indeed, there are people stuck on old browsers without the option to update because they are stuck on old operating systems which they cannot upgrade because of the age of hardware. I live in Romania and not only do I know people still using Windows XP on computers from the ’90s, I have seen that some public institutions still use Windows XP too. Newer browser versions don’t work there… but even so, the last browser versions that support Windows XP all support clipping backgrounds to`text`. And with automatic updates, all I’ve seen have been warnings about being unable to update to a newer version, not browsers stuck even further back.

Even if they were that far back, the ChatGPT solution sets `color` to `transparent` alongside`-webkit-text-fill-color`. The whole point of using`-webkit-text-fill-color`before clipping backgrounds to`text`became cross-browser was to avoid setting`color`to`transparent`, which ChatGPT isn’t doing because it’s dumping that declaration in there too. So it’s not improving support, it’s just adding redundant code. Or breaking the solution for a problem that had become obsolete over half a decade before ChatGPT was launched. Whichever you prefer.

In any case, the ChatGPT code is what we call “struţocămilă” in Romanian - an impossible animal that’s half ostrich, half camel.

![A strange hybrid animal with the body of an ostrich and the head and neck of a camel.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/05/438891078-ee838909-3cd9-404a-bc22-705e62217d63.png?resize=1024%2C683&ssl=1)

Not to mention today we have something far better for handling such situations: `@supports`!

I get the extending support argument for not setting`background-clip: text`in the shorthand or even unprefixed. Though now supported unprefixed and in the shorthand in the current versions of all major desktop and mobile browsers, support doesn’t extend to the last browser versions on Windows XP, 7 or 8. That being said, if manually including both the prefixed and standard versions of a property, please always include the unprefixed one last. There are very rare situations where having the prefixed version of a property override the standard one might make sense for getting around some weird bug, but that’s definitely not the case here.

---

## On`background-size`

<SiteInfo
  name="ChatGPT and the proliferation of obsolete and now broken solutions to problems we hadn't had for over half a decade before its launch"
  desc="The history of gradient text solutions and what ChatGPT gets wrong"
  url="https://gist.github.com/thebabydino/6a5be00091644389be347816d25d592d#on-background-size"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://github.githubassets.com/assets/gist-og-image-54fd7dc0713e.png"/>

Another thing you may have noticed is the ChatGPT solution sets`background-size`separately, not in the shorthand and that it uses two values, not just one, the second one being auto.

There is a historical (although also completely pointless today) reason behind this too. 15 years ago, when we first got this pure CSS gradient text technique, most browsers didn’t yet support setting `background-size`in the shorthand. So it was set separately. But that has not been an issue for over a decade.

Another issue with`background-size`was that initially, WebKit browsers implemented an earlier draft of the spec where a missing second value was taken to be equal to the first value, rather than`auto`, which in the case of gradients means the height of the box specified by`background-origin`(by default the`padding-box`). However, in the case of a horizontal gradient like the one we have here, the second`background-size`value is completely irrelevant, regardless of the`background-position`. Whether it’s`200%`(duplicating the first value) or`auto`(`100%`of the`padding-box`height in this case), the visual result is always exactly the same for horizontal gradients.

So there is no reason why setting it in the shorthand with a single value wouldn’t produce the exact same result. And that has been the case for over a decade.

---

## Finessing things

<SiteInfo
  name="ChatGPT and the proliferation of obsolete and now broken solutions to problems we hadn't had for over half a decade before its launch"
  desc="Finessing things"
  url="https://gist.github.com/thebabydino/6a5be00091644389be347816d25d592d#finessing-things"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://github.githubassets.com/assets/gist-og-image-54fd7dc0713e.png"/>

Similar to how we can omit the second`background-size`value, we can also omit it for`background-position`. The default is`50%`, but any other value produces the exact same result in the case of any gradient covering the entire height of the`background-origin`box. And in the case of a horizontal gradient like we have here, it wouldn’t matter even if we had a different`background-size`height.

We can also easily omit one of the two end keyframes and set its`background-position`in the shorthand. Then the missing end keyframe gets generated out of there. This is not a new feature, I’ve been using this for over a decade.

Then I’m not a fan of those`body`styles. Firstly, without zeroing its[def<VPIcon icon="fas fa-globe"/>ault](https://miriamsuzanne.com/2022/07/04/body-margin-8px/)`margin`, setting itsheight to`100vh` creates a scrollbar. Secondly, it[<VPIcon icon="fa-brands fa-chrome"/>can also be problematic](https://issues.chromium.org/issues/41390045#comment5)even when setting`margin: 0`. Just don’t do it and do this instead, it has better support than`dvh`:

```css
html, body { display: grid }

html { height: 100% }

body { background: #222 }

.loading-text { place-self: center }
```

Finally, default fonts might be ugly, so let’s go for a prettier one. We could also make it scale with the viewport within reasonable limits.

```css
font: 900 clamp(2em, 10vw, 10em) exo, sans-serif
```

Here’s a CodePen demo:

<CodePen
  user="thebabydino"
  slug-hash="RNNQNxx"
  title="Animated gradient text"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

---

## This is not just ChatGPT

<SiteInfo
  name="ChatGPT and the proliferation of obsolete and now broken solutions to problems we hadn't had for over half a decade before its launch"
  desc="This is not just ChatGPT"
  url="https://gist.github.com/thebabydino/6a5be00091644389be347816d25d592d#this-is-not-just-chatgpt"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://github.githubassets.com/assets/gist-og-image-54fd7dc0713e.png"/>

ChatGPT is in the title because it was what got used in this case. But this “dump in old popular solutions and sprinkle in some modern CSS to create a grotesque hybrid” is not unique to ChatGPT.

I saw Gemini spit out this monstruosity (that doesn’t even produce the desired result)[<VPIcon icon="fas fa-globe"/>just a day earlier](https://mastodon.social/@anatudor/114413999066444872):

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/05/439663969-ce0535bf-4441-4e9e-bbc2-3a401013ce25.png?resize=725%2C729&ssl=1)

It makes sense. Older solutions have had more time to become more popular and they’re often at the top in search results too. But that doesn’t necessarily mean they’re still the best choice today. At least when you’re looking at an article or a Stack Overflow answer, you can check the date. An AI solution might link to resources (and in one instance, I discovered it was my own 12-year old, obsolete StackOverflow answer that was being referenced), but if it doesn’t or if you don’t check the resources, then you can never know just how outdated a technique might be. Or how badly it got messed up on the way.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "ChatGPT and the proliferation of obsolete and broken solutions to problems we hadn’t had for over half a decade before its launch",
  "desc": "It was a lovely day on the internet when someone asked how to CSS animated gradient text like ChatGPT’s “Searching the web” and promptly got an answer saying “Have you tried asking ChatGPT? Here’s what it told me!” - well, maybe not these exact words, but at least it rhymes. Both the question and this […]",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/chatgpt-and-old-and-broken-code.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
