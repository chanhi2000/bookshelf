---
lang: en-US
title: "How to Discover a CSS Trick"
description: "Article(s) > How to Discover a CSS Trick"
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
      content: "Article(s) > How to Discover a CSS Trick"
    - property: og:description
      content: "How to Discover a CSS Trick"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/how-to-discover-a-css-trick.html
prev: /programming/css/articles/README.md
date: 2025-07-25
isOriginal: false
author:
  - name: Lee Meyer
    url : https://css-tricks.com/author/leemeyer/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2019/01/Untitled_Artwork-scaled.jpg
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
  name="How to Discover a CSS Trick"
  desc="Do we invent or discover CSS tricks? Lee Meyer discusses how creative limitations, recursive thinking, and unexpected combinations lead to his most interesting ideas."
  url="https://css-tricks.com/how-to-discover-a-css-trick"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2019/01/Untitled_Artwork-scaled.jpg"/>

Do we invent or discover CSS tricks? Michelangelo described his sculpting process as chiseling away superfluous material [<FontIcon icon="fas fa-globe"/>to reveal the sculpture hidden inside the marble](https://goodreads.com/quotes/1191114-the-sculpture-is-already-complete-within-the-marble-block-before), and Stephen King [<FontIcon icon="fas fa-globe"/>says his ideas](https://goodreads.com/quotes/7348210-stories-are-found-things-like-fossils-in-the-ground-stories) are pre-existing things he locates and uncovers “like fossils in the ground.” Paragraph one is early for me to get pretentious enough to liken myself to those iconic creative forces, but my work on CSS-Tricks feels like “discovering,” not “inventing,” secret synergies between CSS features, which have been eyeing each other from disparate sections of the [<FontIcon icon="fa-brands fa-firefox"/>MDN web docs](https://developer.mozilla.org/en-US/docs/Web/CSS) and patiently waiting for someone to let them dance together in front of the world.

---

## Matchmaking for CSS features

A strategy for finding unexpected alliances between CSS features to achieve the impossible is [<FontIcon icon="fas fa-globe"/>recursive thinking](https://publish.obsidian.md/followtheidea/Content/John/Recursive+Thinking+-+explored), which I bring to the CSS world from my engineering background. When you build recursive logic, you need to find an escape hatch to avoid infinite recursion, and this inception-style mindset helps me identify pairings of CSS features that seem at odds with each other yet work together surprisingly well. Take these examples from my CSS experiments:

- **What if [<FontIcon icon="iconfont icon-css-tricks"/>`view-timeline`](https://css-tricks.com/almanac/functions/v/view/) took control of the thing that triggers `view-timeline`?** This led to a pairing between `view-timeline` and [<FontIcon icon="fas fa-globe"/>`position: fixed`](https://codecademy.com/resources/docs/css/position/fixed). These two features are like a bickering yet symbiotic “odd couple” at the heart of my [**<FontIcon icon="fa-brands fa-css3-alt"/>`web-slinger.css`**](/css-tricks.com/web-slinger-css-like-wow-js-but-with-css-y-scroll-animations.md) library for scroll-triggered animations in pure CSS.
- **What if [<FontIcon icon="iconfont icon-css-tricks"/>keyframe animations](https://css-tricks.com/almanac/properties/a/animation/) could trigger other keyframe animations?** This idea led to a [<FontIcon icon="fas fa-globe"/>throuple](https://jbsolicitors.com.au/throuple/) comprised of keyframe animations, [<FontIcon icon="fa-brands fa-chrome"/>style queries](https://developer.chrome.com/docs/css-ui/style-queries), and [<FontIcon icon="fa-brands fa-firefox"/>`animation-play-state`](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-play-state), which together can simulate [**collision detection in CSS**](/css-tricks.com/worlds-collide-keyframe-collision-detection-using-style-queries.md).
- **What if [<FontIcon icon="fa-brands fa-firefox"/>`scroll-state:(scrollable: value`)](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_conditional_rules/Container_scroll-state_queries#using_scrollable_queries) could control which directions are scrollable?** That question led to a [<FontIcon icon="fas fa-globe"/>scrollytelling](https://dl.acm.org/doi/fullHtml/10.1145/3605655.3605683) version of a “[<FontIcon icon="fas fa-globe"/>Choose Your Own Adventure](https://cyoa.com/),” which — wait, I haven’t published that one yet, but when I do, try to look surprised.

---

## Accepting there is nothing new under the sun

Indeed, Mark Twain thought [<FontIcon icon="fas fa-globe"/>new ideas don’t exist](https://goodreads.com/quotes/843880-there-is-no-such-thing-as-a-new-idea-it) — he described them as illusions we create by combining ideas that have always existed, turning and overlaying them in a “mental kaleidoscope” to “make new and curious combinations.” It doesn’t mean creating is easy. No more than a safe can be cracked just by knowing the possible digits.

This brings back memories of playing [<FontIcon icon="fa-brands fa-wikipedia-w"/>Space Quest III](https://en.wikipedia.org/wiki/Space_Quest_III) as a kid because after you quit the game, it would output smart-aleck command-line messages, one of which was: “Remember, we did it all with ones and zeros.” Perhaps the point of the mock inspirational tone is that we likely will not be able to sculpt like Michelangelo or make a bestselling game, even if we were given the same materials and tools (is this an inspirational piece or what?). However, understanding the limits of what creators do is the foundation for cracking the combination of creativity to open the door to somewhere we haven’t been. And one truth that helps with achieving magic with CSS is that its constraints help breed creativity.

---

## Embracing limitations

Being asked “Why would you do that in CSS when you could just use JavaScript?” is like if you asked me: “Why would you write a poem when it’s easier to write prose?” Samuel Coleridge [<FontIcon icon="fas fa-globe"/>defined](https://goodreads.com/quotes/537027-prose-words-in-their-best-order-poetry-the-best-words) prose as “words in their best order,” but poetry as “the best words in the best order.” If you think about it, the difference between prose and poetry is that the latter is based on increased constraints, which force us to find unexpected connections between ideas.

Similarly, the artist [<FontIcon icon="fas fa-globe"/>Phil Hansen](https://philinthecircle.com/) learned that [<FontIcon icon="fa-brands fa-youtube"/>embracing limitation](https://youtu.be/YrZTho_o_is?feature=shared) could drive creativity after he suffered permanent nerve damage in his hand, causing it to jitter, which prevented him from drawing the way he had in the past. His early experiments using this new mindset included limiting himself to creating [<FontIcon icon="fa-brands fa-meta"/>a work using only 80 cents’ worth of supplies](https://facebook.com/Starbucks/photos/amazing-artwork-from-phil-hansen-were-honored-to-be-part-of-it-httpsbuxcozgys4v/10151485693453057/?_rdr). This dovetails with [<FontIcon icon="fas fa-globe"/>the quote](https://goodreads.com/quotes/19905-perfection-is-achieved-not-when-there-is-nothing-more-to) from Antoine de Saint-Exupéry often [<FontIcon icon="fas fa-globe"/>cited in web design](https://uxmag.com/articles/when-theres-nothing-left-to-take-away), which says that perfection is achieved when there is nothing left to take away.

---

## Embracing nothingness

The interesting thing about web design is how much it blends art and science. In both art and science, we challenge assumptions about whether commonsense relationships of cause and effect truly exist. Contrary to the saying in vernacular that “you can’t prove a negative,” [<FontIcon icon="fa-brands fa-wikipedia-w"/>we can](https://en.wikipedia.org/wiki/Null_hypothesis). It’s not necessarily harder than proving a positive. So, in keeping with the discussion above of embracing limitations and removing the superfluous until a creation reveals itself, many of my article ideas prove a negative by challenging the assumption that one thing is necessary to produce another.

- Maybe we don’t need JavaScript to produce a [**Sudoku solver**](/css-tricks.com/generating-and-solving-sudokus-in-css.md), a [**Tinder-style swiper**](https://css-tricks.com/web-slinger-css-across-the-swiper-verse.md), or a [**classic scroll-driven animation demo**](/css-tricks.com/slide-through-unlimited-dimensions-with-css-scroll-timelines.md).
- Maybe we don’t need checkbox hacks to make [**CSS games**](/css-tricks.com/time-travelling-css-with-target.md).
- Maybe we don’t need to hack CSS at all to [**recreate similar effects**](/css-tricks.com/the-what-if-machine-bringing-the-iffy-future-of-css-into-the-present.md) to what’s possible in browsers that support the [**CSS `if()` function**](/css-tricks.com/poking-at-the-css-if-function-a-little-more-conditional-color-theming.md).
- Maybe I can impart web dev wisdom on CSS-Tricks without including CSS at all, by sharing the “source code” of my thought process to help make you [**a better developer and a better person**](/css-tricks.com/applying-the-web-dev-mindset-to-dealing-with-life-challenges.md).

---

## Going to extremes

Sometimes we can make a well-worn idea new again by taking it to the extreme. Seth Godin coined the term “[<FontIcon icon="fas fa-globe"/>edgecraft](https://seths.blog/2013/09/edgecraft-instead-of-brainstorming/)” to describe a technique for generating ideas by pushing a competitive advantage as far to the edge as the market dares us to go. Similarly, sometimes you can take an old CSS feature that people have seen before, but push it further than anyone else to create something unique. For example:

- CSS-Tricks covered [**checkbox hacks and radio button hacks**](/css-tricks.com/the-checkbox-hack.md) back in 2011. But in 2021, I decided to see if I could use hundreds of radio button hacks using HTML generated with [**Pug**](/sitepoint.com/a-beginners-guide-to-pug.md) to create a working Sudoku app. At one point, I found out that Chrome dev tools can display an infinite spinner of death when you throw too much generated CSS at it, which meant I had to limit myself to a 4×4 Sudoku, but that taught me more about what CSS can do and what it can’t.
- **The `:target` selector has existed since the 2000s.** But in 2024, I took it to the extreme by using [<FontIcon icon="fas fa-globe"/>HAML](https://haml.info/) to render the thousands of possible states of Tic Tac Toe to create a game with a computer opponent in pure CSS. At one point, CodePen refused to output as much HTML as I had asked it to, but it’s a fun way for newcomers to learn an important CSS feature; more engaging in my opinion than a [<FontIcon icon="fa-brands fa-firefox"/>table of contents](https://developer.mozilla.org/en-US/docs/Web/CSS/:target) demo.

---

## Creating CSS outsider art

Chris Coyier [**has written**](/css-tricks.com/is-css-a-programming-language.md) about his distaste for the gatekeeping agenda hidden behind the question of whether CSS is a programming language. If CSS isn’t deemed as “real” programming, that can be used as an excuse to hold CSS experts in less esteem than people who code in imperative languages, which leads to unfair pay and toxic workplace dynamics.

But maybe the other side always seems greener due to the envy radiating from the people on that side, because as a full-stack engineer who completed a computer science degree, I always felt left out of the front-end conversations. It didn’t feel right to put “full stack developer” on my résumé when the creation of everything users can see in a web app seemed mysterious to me.

And maybe it wasn’t just psychosomatic that CSS made my head hurt compared to other types of coding because [<FontIcon icon="fas fa-globe"/>research](https://samgilbert.net/pubs/Alexiou2009DesignStudies.pdf) indicates if you do fMRIs on people who are engaged in design tasks, you see that design cognition appears to involve a unique cognitive profile compared to conventional problem-solving, reflected in the areas of the brain that light up on the fMRIs. Studies show that the [<FontIcon icon="fas fa-globe"/>brain’s structure changes](https://pnas.org/doi/pdf/10.1073/pnas.070039597) as people [get better](https://jneurosci.org/content/23/27/9240) at [<FontIcon icon="fas fa-globe"/>different types of jobs](https://frontiersin.org/journals/sports-and-active-living/articles/10.3389/fspor.2024.1393988/full). The brain’s [<FontIcon icon="fas fa-globe"/>structural plasticity](https://frontiersin.org/journals/neuroscience/articles/10.3389/fnins.2020.00075/full) is reminiscent of the way different muscles grow more pronounced with different types of exercise, but achieving what some of my colleagues could with CSS when my brain had been trained for decades on imperative logic felt about as approachable as lifting a car over my head.

The intimidation I felt from CSS started to change when I learned about the checkbox hack because I could relate to hiding and showing divs based on checkboxes, which was routine in my work in the [**back of the front-end**](/css-tricks.com/front-of-the-front-back-of-the-front.md). My designer workmate challenged me to make a game in one night using just CSS. I came up with a pure text adventure game made out of radio button hacks. Since creative and curious people are [<FontIcon icon="fas fa-globe"/>more sensitive to novel stimuli](https://cambridge.org/core/journals/behavioral-and-brain-sciences/article/shared-noveltyseeking-basis-for-creativity-and-curiosity/F812089A4E78C25A4A01C86EB2C873A1), the design experts on my team were enthralled by my primitive demo, not because it was cutting-edge gameplay but because it was something they had never seen before. My engineering background was now an asset rather than a hindrance in the unique outsider perspective I could bring to the world of CSS. I was hooked.

The hack I found to rewire my brain to become more CSS-friendly was to find analogies in CSS to the type of problem-solving I was more familiar with from imperative programming:

- [**CSS custom properties**](/css-tricks.com/a-complete-guide-to-custom-properties.md) are like [<FontIcon icon="iconfont icon-vuejs"/>reactive variables in Vue](https://vuejs.org/guide/essentials/reactivity-fundamentals.html).
- The `:target` selector in CSS is like [<FontIcon icon="fas fa-globe"/>client-side routing](https://info340.github.io/client-side-routing.html) in a single-page application.
- The `min()` and `max()` [<FontIcon icon="fas fa-globe"/>functions](https://web.dev/articles/min-max-clamp) in CSS can be used to simulate some of the [<FontIcon icon="fa-brands fa-microsoft"/>logical operations](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/operators/boolean-logical-operators) we take for granted in imperative programming.

So if you are still learning web development and CSS (ultimately, we are all still learning), instead of feeling imposter syndrome, consider that the very thing that makes you feel like an outsider could be what enables you to bring something unique to your usage of CSS.

---

## Finding the purpose

Excited as I was when my CSS hacking ended up providing the opportunity to publish my experiments on CSS-Tricks, the [<FontIcon icon="iconfont icon-css-tricks"/>first comment](https://css-tricks.com/generating-and-solving-sudokus-in-css/#comment-1771282) on the first hack I published on CSS-Tricks was a generic, defeatist “Why would you do that?” criticism. The other comments popped up and turned out to be more supportive, and I [**said in a previous article**](/css-tricks.com/applying-the-web-dev-mindset-to-dealing-with-life-challenges.md) that I’ve made my peace with the fact that not everybody will like my articles. However, this is the second article in which I’ve brought up the critical comment from back in 2021. Hmm…

Surely it wasn’t the reason I didn’t write another CSS-Tricks article for years. And it’s probably a coincidence that when I returned to CSS-Tricks last year, my [**first new article**](/css-tricks.com/time-travelling-css-with-target.md) was a CSS hack that lends itself to accessibility after the person who left the negative comment about my first article seemed to have a bee in their bonnet about [<FontIcon icon="iconfont icon-css-tricks"/>checkbox hacks breaking accessibility](https://css-tricks.com/whack-a-mole-the-css-edition/#comment-1767099), even in fun CSS games not intended for production. Then again, limiting myself to CSS hacking that enables accessibility became a source of inspiration. We can all do with a reminder to at all times empathize with users who require screen readers, even when we are doing wacky experimental stuff, because we need to embrace the limitations not just of CSS but of our audience.

I suppose the reason the negative comment continues to rankle with me is that I agree that clarifying the relevance and purpose of a CSS trick is important. And yet, if I’m right in saying a CSS trick is more like something we discover than something we make, then it’s like finding a beautiful feather when we go for a walk. At first, we pick it up just because we can, but if I bring you with me on the journey that led to the discovery, then you can help me decide whether the significance is that the feather we discovered makes a great quill or reveals that a rare species of bird lives in this region.

It’s a [<FontIcon icon="fa-brands fa-youtube"/>journey versus destination](https://youtu.be/3G8Utd1OhQ4) thing to share the failures that led to compromises and the limitations I came up against when pushing the boundaries of CSS. When I bring you along on the route to the curious item I found, rather than just showing you that item, then after we part ways, you might retrace the steps and try a different fork in the path we followed, which could lead you to discover your own CSS trick.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Discover a CSS Trick",
  "desc": "Do we invent or discover CSS tricks? Lee Meyer discusses how creative limitations, recursive thinking, and unexpected combinations lead to his most interesting ideas.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/how-to-discover-a-css-trick.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
