---
lang: en-US
title: "Is it Time to Un-Sass?"
description: "Article(s) > Is it Time to Un-Sass?"
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
      content: "Article(s) > Is it Time to Un-Sass?"
    - property: og:description
      content: "Is it Time to Un-Sass?"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/is-it-time-to-un-sass.html
prev: /programming/css/articles/README.md
date: 2025-09-17
isOriginal: false
author:
  - name: Jeff Bridgforth
    url : https://css-tricks.com/author/jeffbridgforth/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2019/10/sass-sparkles.png
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
  name="Is it Time to Un-Sass?"
  desc="Many of the Sass features we've grown to love have made their way into native CSS in some shape or form. So, should we still use Sass? This is how developer Jeff Bridgforth is thinking about it."
  url="https://css-tricks.com/is-it-time-to-un-sass"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2019/10/sass-sparkles.png"/>

Several weeks ago, I participated in [<VPIcon icon="fas fa-globe"/>Front End Study Hall](https://events.indieweb.org/2025/08/front-end-study-hall-034-UzkXwuTEzyuG). Front End Study Hall is an HTML and CSS focused meeting held on Zoom every two weeks. It is an opportunity to learn from one another as we share our common interest in these two building blocks of the Web. Some weeks, there is more focused discussion while other weeks are more open ended and members will ask questions or bring up topics of interest.

Joe, the moderator of the group, usually starts the discussion with something he has been thinking about. In this particular meeting, he asked us about [<VPIcon icon="fa-brands fa-sass"/>Sass](https://sass-lang.com/). He asked us if we used it, if we liked it, and then to share our experience with it. I had planned to answer the question but the conversation drifted into another topic before I had the chance to answer. I saw it as an opportunity to write and to share some of the things that I have been thinking about recently.

---

## Beginnings

I started using Sass in March 2012. I had been hearing about it through different things I read. I believe I heard Chris Coyier talk about it on his then-new podcast, [<VPIcon icon="fas fa-globe"/>ShopTalk Show](https://shoptalkshow.com/003/). I had been interested in redesigning my personal website and I thought it would be a great chance to learn Sass. I bought an e-book version of *[<VPIcon icon="fa-brands fa-amazon"/>Pragmatic Guide to Sass](https://amazon.com/Pragmatic-Guide-Hampton-Lintorn-Catlin/dp/1934356840)* and then put what I was learning into practice as I built a new version of my website. The book suggested using [<VPIcon icon="fas fa-globe"/>Compass](https://web.archive.org/web/20120228013912/http://compass-style.org/) to process my Sass into CSS. I chose to use SCSS syntax instead of indented syntax because SCSS was similar to plain CSS. I thought it was important to stay close to the CSS syntax because I might not always have the chance to use Sass, and I wanted to continue to build my CSS skills.

It was very easy to get up and running with Sass. I used a GUI tool called Scout to run Compass. After some frustration trying to update Ruby on my computer, Scout gave me an environment to get up and going quickly. I didn’t even have to use the command line. I just pressed “Play” to tell my computer to watch my files. Later I learned how to use Compass through the command line. I liked the simplicity of that tool and wish that at least one of today’s build tools incorporated that same simplicity.

I enjoyed using Sass out of the gate. I liked that I was able to create reusable variables in my code. I could set up colors and typography and have consistency across my code. I had not planned on using nesting much but after I tried it, I was hooked. I really liked that I could write less code and manage all the relationships with nesting. It was great to be able to nest a media query inside a selector and not have to hunt for it in another place in my code.

Fast-forward a bit…

After my successful first experience using Sass in a personal project, I decided to start using it in my professional work. And I encouraged my teammates to embrace it. One of the things I liked most about Sass was that you could use as little or as much as you liked. I was still writing CSS but now had the superpower that the different helper functions in Sass enabled.

I did not get as deep into Sass as I could have. I used the Sass [`@extend` rule](https://sass-lang.com/documentation/at-rules/extend/) more in the beginning. There are a lot of features that I did not take advantage of, like [<VPIcon icon="fa-brands fa-sass"/>placeholder selectors](https://sass-lang.com/documentation/style-rules/placeholder-selectors/) and [<VPIcon icon="fa-brands fa-sass"/>`for` loops](https://sass-lang.com/documentation/at-rules/function/). I have never been one to rely much on shortcuts. I use very few of the shortcuts on my Mac. I have dabbled in things like [**Emmet**](/css-tricks.com/emmet.md) but tend to quickly abandon them because I am just use to writing things out and have not developed the muscle memory of using shortcuts.

---

## Is it time to un-Sass?

By my count, I have been using Sass for over 13 years. I chose Sass over [<VPIcon icon="fas fa-globe"/>Less.js](https://lesscss.org) because I thought it was a better direction to go at the time. [**And my bet paid off**](/css-tricks.com/sass-vs-less.md). That is one of the difficult things about working in the technical space. There are a lot of good tools but some end up rising to the top and others fall away. I have been pretty fortunate that most of the decisions I have made have gone the way that they have. All the agencies I have worked for have used Sass.

At the beginning of this year, I finally jumped into building a prototype for a personal project that I have been thinking about for years: my own memory keeper. One of the few things that I liked about Facebook was the Memories feature. I enjoyed visiting that page each day to remember what I had been doing on that specific day in years past. But I felt at times that Facebook was not giving me all of my memories. And my life doesn’t just happen on Facebook. I also wanted a way to view memories from other days besides just the current date.

As I started building my prototype, I wanted to keep it simple. I didn’t want to have to set up any build tools. I decided to write CSS without Sass.

Okay, so that was my intention. But I soon realized that that I was using nesting. I had been working on it a couple of days before I realized it.

But my code was working. That is when I realized that the [**native nesting in CSS**](/css-tricks.com/css-nesting-specificity-and-you.md) works much the same nesting in Sass. I had followed [**the discussion about implementing nesting**](/css-tricks.com/help-choose-the-syntax-for-css-nesting.md) in native CSS. At one point, the syntax was going to be very different. To be honest, I lost track of where things had landed because I was continuing to use Sass. Native CSS nesting was not a big concern to me right then.

I was amazed when I realized that nesting works just the same way. And it was in that moment that I began to wonder:

Is this finally the time to *un*-Sass?

I want to give credit where credit is due. I’m borrowing the term “un-Sass” from [<VPIcon icon="fas fa-globe"/>Stu Robson](https://alwaystwisted.com), who is actually in the middle of writing a series called [**“Un-Sass’ing my CSS”**](/css-tricks.com/compiling-multiple-css-files-into-one.md) as I started thinking about writing this post. I love the term “un-Sass” because it is easy to remember and so spot on to describe what I have been thinking about.

Here is what I am taking into consideration:

---

## Custom Properties

I knew that a lot about what I liked about Sass had started to make its way into native CSS. Custom properties were one of the first things. [**Custom properties**](/css-tricks.com/a-complete-guide-to-custom-properties.md) are more powerful than [<VPIcon icon="fa-brands fa-sass"/>Sass variables](https://sass-lang.com/documentation/variables/) because you can assign a new value to a custom property in a media query or in a theming system, like light and dark modes. That’s something Sass is unable to do since variables become static once they are compiled into vanilla CSS. You can also assign and update custom properties with JavaScript. Custom properties also work with inheritance and have a broader scope than Sass variables.

So, yeah. I found that not only was I already fairly familiar with the concept of variables, thanks to Sass, but [**the native CSS version was much more powerful**](https://css-tricks.com/difference-between-types-of-css-variables.md).

I first used CSS Custom Properties when building two different themes (light and dark) for a client project. I also used them several times with JavaScript and liked how it gave me new possibilities for using CSS and JavaScript together. In [<VPIcon icon="fas fa-globe"/>my new job](https://jeffbridgforth.com/get-to-know-me-roh/), we use custom properties extensively and I have completely switched over to using them in any new code that I write. I made use of custom properties extensively when I redesigned my personal site last year. I took advantage of it to create a light and dark theme and I utilized it with [<VPIcon icon="fas fa-globe"/>Utopia](https://utopia.fyi) for typography and spacing utilities.

---

## Nesting

When Sass introduced nesting, it simplified the writing of CSS code because you write style rules within another style rule (usually a parent). This means that you no longer had to write out the full descendent selector as a separate rule. You could also nest media queries, feature queries, and container queries.

This ability to group code together made it easier to see the relationships between parent and child selectors. It was also useful to have the media queries, container queries, or feature queries grouped inside those selectors rather than grouping all the media query rules together further down in the stylesheet.

I already mentioned that I stumbled across native CSS nesting when writing code for my memory keeper prototype. I was very excited that the specification extended what I already knew about nesting from Sass.

Two years ago, the nesting specification was going to require you to start the nested query with the & symbol, which was different from how it worked in Sass.

```scss
.footer {
  a { color: blue }
}
```

```css
/* 2023 */
.footer {
  & a { color: blue } /* This was valid then */
}
```

But that changed sometime in the last two years and you no longer need the ampersand (`&`) symbol to write a nested query. You can write just as you had been writing it in Sass. I am very happy about this change because it means native CSS nesting is just like I have been writing it in Sass.

```css
/* 2025 */
.footer {
  a { color: blue } /* Today's valid syntax */
}
```

There are some differences in the native implementation of nesting versus Sass. One difference is that you cannot create concatenated selectors with CSS. If you love [**BEM**](/css-tricks.com/bem-101.md), then you probably made use of this feature in Sass. But it does not work in native CSS.

```css
.card {
  &__title {}
  &__body {}
  &__footer {}
}
```

It does not work because the `&` symbol is a live object in native CSS and it is always treated as a separate selector. Don’t worry, if you don’t understand that, neither do I. The important thing is to understand the implication – you cannot concatenate selectors in native CSS nesting.

If you are interested in reading a bit more about this, I would suggest Kevin Powell’s, [<VPIcon icon="fas fa-globe"/>“Native CSS Nesting vs. Sass Nesting”](https://thecascade.dev/article/native-css-nesting-vs-scss-nesting/) from 2023. Just know that the information about having to use the `&` symbol before an element selector in native CSS nesting is out of date.

I never took advantage of concatenated selectors in my Sass code so this will not have an impact on my work. For me, nesting is native CSS is equivalent to how I was using it in Sass and is one of the reasons why to consider un-Sassing.

My advice is to be careful with nesting. I would suggest trying to keep your nested code to three levels at the most. Otherwise, you end up with very long selectors that may be more difficult to override in other places in our codebase. Keep it simple.

---

## The `color-mix()` function

I liked using the Sass color module to lighten or darken a color. I would use this most often with buttons where I wanted the hover color to be different. It was really easy to do with Sass. (I am using `$color` to stand in for the color value).

```scss
background-color: darken($color, 20%);
```

The [<VPIcon icon="iconfont icon-css-tricks"/>`color-mix()`](https://css-tricks.com/almanac/functions/c/color-mix/) function in native CSS allows me to do the same thing and I have used it extensively in the past few months since learning about it from [<VPIcon icon="fas fa-globe"/>Chris Ferdinandi](https://gomakethings.com/mixing-colors-with-css/).

```css
background-color: color-mix(in oklab, var(--color), #000000 20%);
```

---

## Mixins and functions

I know that a lot of developers who use Sass make extensive use of [<VPIcon icon="iconfont icon-css-tricks"/>mixins](https://css-tricks.com/videos/132-quick-useful-case-sass-math-mixins/). In the past, I used a fair number of mixins. But a lot of the time, I was just pasting mixins from previous projects. And many times, I didn’t make as much use of them as I could because I would just plain forget that I had them. They were always nice helper functions and allowed me to not have to remember things like [**clearfix**](/css-tricks.com/clearfix-a-lesson-in-web-development-evolution.md) or font smoothing. But those were also techniques that I found myself using less and less.

I also utilized [<VPIcon icon="fa-brands fa-sass"/>functions](https://sass-lang.com/documentation/at-rules/function/) in Sass and created several of my own, mostly to do some math on the fly. I mainly used them to convert pixels into `em`s because I liked being able to define my typography and spacing as relative and creating relationships in my code. I also had written a function to covert pixels to `em`s for custom media queries that did not fit within the breakpoints I normally used. I had learned that it was a much better practice to use `em`s in media queries so that layouts would not break when a user used page zoom.

Currently, we do not have a way to do mixins and functions in native CSS. But there is work being done to add that functionality. [**Geoff wrote about the CSS Functions and Mixins Module**](/css-tricks.com/css-functions-and-mixins-module-notes.md).

I did a little experiment for the use case I was using Sass functions for. I wanted to calculate `em` units from pixels in a custom media query. My standard practice is to set the body text size to `100%` which equals 16 pixels by default. So, I wrote a [**`calc()` function**](/css-tricks.com/a-complete-guide-to-calc-in-css.md) to see if I could replicate what my Sass function provided me.

```css
@media (min-width: calc((600 / 16) * 1em));
```

This custom media query is for a minimum width of `600px`. This would work based on my setting the base font size to `100%`. It could be modified.

---

## Tired of tooling

Another reason to consider un-Sassing is that I am simply *tired* of tooling. Tooling has gotten more and more complex over the years, and not necessarily with a better [**developer experience**](/css-tricks.com/what-is-developer-experience-dx.md). From what I have observed, today’s tooling is predominantly geared towards JavaScript-first developers, or anyone using a framework like React. All I need is a tool that is easy to set up and maintain. I don’t want to have to learn a complex system in order to do very simple tasks.

Another issue is dependencies. At my current job, I needed to add some new content and styles to an older WordPress site that had not been updated in several years. The site used Sass, and after a bit of digging, I discovered that the previous developer had used [<VPIcon icon="fas fa-globe"/>CodeKit](https://codekitapp.com/) to process the code. I renewed my Codekit license so that I could add CSS to style the content I was adding. It took me a bit to get the settings correct because the settings in the repo were not saving the processed files to the correct location.

Once I finally got that set, I continued to encounter errors. [<VPIcon icon="fa-brands fa-sass"/>Dart Sass](https://sass-lang.com/dart-sass/), the engine that powers Sass, introduced changes to the syntax that broke the existing code. I started refactoring a large amount of code to update the site to the correct syntax, allowing me to write new code that would be processed. 

I spent about 10 minutes attempting to refactor the older code, but was still getting errors. I just needed to add a few lines of CSS to style the new content I was adding to the site. So, I decided to go rogue and write the new CSS I needed directly in the WordPress template. I have had similar experiences with other legacy codebases, and that’s the sort of thing that can happen when you’re super reliant on third-party dependencies. You spend more time trying to refactor the Sass code so you can get to the point where you can add new code and have it compiled.

All of this has left me tired of tooling. I am fortune enough at my new position that the tooling is all set up through the Django CMS. But even with that system, [<VPIcon icon="fas fa-globe"/>I have run into issues](https://jeffbridgforth.com/weeknotes-july-10-2025/#django-and-sass). For example, I tried using a mixture of percentage and pixels values in a [<VPIcon icon="iconfont icon-css-tricks"/>`minmax()`](https://css-tricks.com/almanac/functions/m/minmax/) function and Sass was trying to evaluate it as a math function and the units were incompatible.

```css
grid-template-columns: repeat(auto-fill, minmax(min(200px, 100%), 1fr));
```

I needed to be able to escape and not have Sass try to evaluate the code as a math function:

```scss
grid-template-columns: repeat(auto-fill, minmax(unquote("min(200px, 100%)"), 1fr));
```

This is not a huge pain point but it was something that I had to take some time to investigate that I could have been using to write HTML or CSS. Thankfully, that is something [**Ana Tudor has written about**](/css-tricks.com/when-sass-and-new-css-features-collide.md).

All of these different pain points lead me to be tired of having to mess with tooling. It is another reason why I have considered un-Sassing.

---

## Verdict

So what is my verdict — is it time to un-Sass?

Please don’t hate me, but my conclusion is: **it depends**. Maybe not the definitive answer you were looking for.

But you probably are not surprised. If you have been working in web development even a short amount of time, you know that there are very few definitive ways of doing things. There are a lot of different approaches, and just because someone else solves it differently, does not mean you are right and they are wrong (or vice versa). Most things come down to the project you are working on, your audience, and a host of other factors.

For my personal site, yes, I would like to un-Sass. I want to kick the build process to the curb and eliminate those dependencies. I would also like for other developers to be able to view source on my CSS. You can’t view source on Sass. And part of the reason I write on my site is to share solutions that might benefit others, and making code more accessible is a nice maintenance enhancement.

My personal site does not have a very large codebase. I could probably easily un-Sass it in a couple of days or over a weekend.

But for larger sites, like the codebase I work with at my job. I wouldn’t suggest un-Sassing it. There is way too much code that would have to be refactored and I am unable to justify the cost for that kind of effort. And honestly, it is not something I feel motivated to tackle. It works just fine the way that it is. And Sass is still a very good tool to use. It’s not “breaking” anything.

Your project may be different and there might be more gains from un-Sassing than the project I work on. Again, it depends.

---

## The way forward

It is an exciting time to be a CSS developer. The language is continuing to evolve and mature. And every day, it is incorporating new features that first came to us through other third-party tools such as Sass. It is always a good idea to stop and re-evaluate your technology decisions to determine if they still hold up or if more modern approaches would be a better way forward.

That does not mean we have to go back and “fix” all of our old projects. And it might not mean doing a complete overhaul. A lot of newer techniques can live side by side with the older ones. We have a mix of both Sass variables and CSS custom properties in our codebase. They don’t work against each other. The great thing about web technologies is that they build on each other and there is usually backward compatibility.

Don’t be afraid to try new things. And don’t judge your past work based on what you know today. You did the best you could given your skill level, the constraints of the project, and the technologies you had available. You can start to incorporate newer ways right alongside the old ones. [Just build websites (<VPIcon icon="iconfont icon-github"/>`melanierichards/just-build-websites`)](https://github.com/melanierichards/just-build-websites)!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Is it Time to Un-Sass?",
  "desc": "Many of the Sass features we've grown to love have made their way into native CSS in some shape or form. So, should we still use Sass? This is how developer Jeff Bridgforth is thinking about it.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/is-it-time-to-un-sass.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
