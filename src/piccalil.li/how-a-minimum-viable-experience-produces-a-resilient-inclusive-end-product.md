---
lang: en-US
title: "How a minimum viable experience produces a resilient, inclusive end-product"
description: "Article(s) > How a minimum viable experience produces a resilient, inclusive end-product"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - piccalil.li
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How a minimum viable experience produces a resilient, inclusive end-product"
    - property: og:description
      content: "How a minimum viable experience produces a resilient, inclusive end-product"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/piccalil.li/how-a-minimum-viable-experience-produces-a-resilient-inclusive-end-product.html
prev: /programming/css/articles/README.md
date: 2023-02-27
isOriginal: false
author:
  - name: Andy Bell
    url : https://piccalil.li/author/andy-bell
cover: https://api.urlbox.io/v1/ln9ptArKXobLRpDQ/092d5a9e50aaa79495ef35ece9360ddb1d02e298cafc38dd7041d0d6af1b44cc/png?url=https://piccalil.li/og/how-a-minimum-viable-experience-produces-a-resilient-inclusive-end-product/&width=1024&height=526&retina=true
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
  name="How a minimum viable experience produces a resilient, inclusive end-product"
  desc=""
  url="https://piccalil.li/blog/how-a-minimum-viable-experience-produces-a-resilient-inclusive-end-product"
  logo="https://piccalil.li/favicons/favicon.ico"
  preview="https://api.urlbox.io/v1/ln9ptArKXobLRpDQ/092d5a9e50aaa79495ef35ece9360ddb1d02e298cafc38dd7041d0d6af1b44cc/png?url=https://piccalil.li/og/how-a-minimum-viable-experience-produces-a-resilient-inclusive-end-product/&width=1024&height=526&retina=true"/>

The whole idea of progressive enhancement is using the power that the web platform gives us for free — specifically, HTML, CSS and JavaScript — to provide a baseline experience for the people who visit our sites and/or apps, and *then* build on that where appropriate and necessary, depending on the capabilities of the technology that they are using.

These capabilities can and do vary hugely. A very large cohort of people that use the internet, do so on [<VPIcon icon="fas fa-globe"/>Android devices (72% + market global share)](https://gs.statcounter.com/os-market-share/mobile/worldwide), often on [<VPIcon icon="fa-brands fa-wikipedia-w"/>slow connections](https://en.wikipedia.org/wiki/List_of_countries_by_Internet_connection_speeds). This makes the probability of the browser environment being **hostile** to websites and apps that are distributed with a single point of failure, very high. This is often the case with client-side JavaScript-heavy single page applications, known as SPAs.

We can mediate this weakness with progressive enhancement, though, and a **minimum viable experience** approach helps us to use a [<VPIcon icon="fas fa-glboe"/>principle of least power](https://adactio.com/journal/14327) to make sure that **everyone** gets a great experience.

---

## What is a minimum viable experience?

I started using this term as a nod to a more commonly used term: **minimum viable product**, which is a the minimum version of a product that satisfies the purpose of itself, making it worth existing in the first place.

A good example of a minimum viable experience is an email client that is just a HTML form that when submitted, sends an email to the specified address. You could then enhance this minimum viable experience **if** JavaScript is available by adding client-side validation, auto-complete and all of the other handy tricks our modern email clients give us. The important thing is that **when** JavaScript fails, we can still provide the basic capability that the user needs.

The real beauty of progressive enhancement is that if you really take it seriously, a user won’t even notice if they don’t have the “optimal experience”. The fact they have an acceptable experience at all — a minimum viable experience — is good enough, as mentioned in [<VPIcon icon="fa-brands fa-youtube"/>this talk](https://youtu.be/5uhIiI9Ld5M) I did last year.

![](https://andy-bell.imgix.net/2023/02/diagram-1024x692.png)

This sort of diagram is often used to illustrate a minimum viable product, but I think it perfectly illustrates what progressive enhancement is.

The top row shows four steps with a car as the optimal experience, right at the end. The problem is that in the preceding three steps, the experience is either completely broken or unusable. A car is useless with just one wheel or with no windows or roof (especially in rain-sodden England where I am based). It’s only when everything works perfectly when this experience is optimal, which in the case of the web, knowing that the likelihood that everything will work perfect is *extremely low*, seems like a suboptimal approach.

Step in the second row, which has the same four steps. The difference here is instead of a single wheel: step 1 is a skateboard. Instead of a chassis and wheels only, step 2 is a micro scooter. Step 3 is a push bike, instead of a car with no roof or windows, and finally, step 4 is a motor scooter instead of a car. Every step is acceptable and gets the user from A to B. It just so happens that with each *progression*, the experience gets better.

I deliberately chose the motor scooter as the optimal experience in this illustration because if you work with a progressive enhanced mindset — creating a minimum viable experience — you more often-than-not, create a much lighter end-product. This is because you don’t need to mess around with backwards-compatibility hacks or polyfills.

---

## Identifying a minimum viable experience

I’ll quickly run-down the process of how I identify a minimum viable experience and then, enhance it. I’ll use the context of [<VPIcon icon="fas fa-globe"/>this jotter app I made](https://jotter.space/), for quick note-taking on the web.

![The jotter app, where there is a large text box. It features a placeholder: “Add your day notes here”.](https://andy-bell.imgix.net/2023/02/CleanShot-2023-02-27-at-17.32.42@2x-1024x717.jpg)

First up: what’s the minimum viable experience? It’s a humble `<textarea>` element! HTML allows us to create something useful immediately, and all this app needs to work is a `<textarea>` to write notes in.

Now, how can we enhance that minimum viable experience? Firstly, we can add some CSS to make the `<textarea>` fill the space up and remove some default styles, like this:

```css
textarea {
  display: block;
  width: 100%;
  min-height: 100vh;
  border: none;
  background: transparent;
  font-size: 1.2rem;
  padding: 1rem;
  resize: none;
}
```

Along with some light CSS that provides our layout and look and feel, it’s all nice and simple, so far and things are nice and resilient.

Right about now is the time to start adding some JavaScript. [<VPIcon icon="fas fa-globe"/>As you can see on the app](https://jotter.space/), there’s a toggle for dark mode and light mode because although honouring the colour scheme user preference by default is useful: you should give users a choice because frankly, they might not like your dark/light mode!

Next on the list of JavaScript **enhancements** of this app is offline storage, using [<VPIcon icon="fa-brands fa-firefox" />local storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) to save your notes as you type. This means that if you accidentally refresh your browser: you won’t lose what you were typing. It also means that your notes will be there if you come back another time. This is especially useful for shopping lists, I find.

Lastly, you can enhance it even further by using a [<VPIcon icon="fa-brands fa-google"/>service worker to make it work completely offline](https://developers.google.com/web/fundamentals/codelabs/offline) by putting all the assets into cache storage then routing all requests through the service worker. Suddenly, you’ve got an installable, progressive web app, that works offline!

Not bad for something that starts as a humble `<textarea>`, right?

![The same jotter app as before, but this time, it says “Progressive Enhancement Rules” in the text box](https://andy-bell.imgix.net/2023/02/CleanShot-2023-02-27-at-17.33.05@2x-1024x717.jpg)

---

## Wrapping up

I appreciate that the above is a very simplified example, but it illustrates how a minimum viable experience approach to building for the web *really does make things scale*, far beyond the limited, fragile approach of heavy-duty, client-side JavaScript-driven development. Progressive enhancement is how so much of the web works already — especially the flexible, declarative programming languages that power it: HTML and CSS. [It’s why so many websites that are now decades old, still work (<VPIcon icon="fa-brands fa-medium"/>`business-startup-development-and-more`)](https://medium.com/business-startup-development-and-more/7-ancient-abandoned-websites-that-still-work-63395b92b428)!

JavaScript is not something to turn your nose up at either. It’s extremely good at *enhancing a user’s experience*. **When** it doesn’t load, it doesn’t matter, because if you produce a solid minimum viable experience: the user can likely do what they came to do anyway.

If you prioritise the experience of your users over your experience developing something, trust me: *everyone* will be much happier overall.

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How a minimum viable experience produces a resilient, inclusive end-product",
  "desc": "",
  "link": "https://chanhi2000.github.io/bookshelf/piccalil.li/how-a-minimum-viable-experience-produces-a-resilient-inclusive-end-product.html",
  "logo": "https://piccalil.li/favicons/favicon.ico",
  "background": "rgba(253,208,0,0.2)"
}
```
