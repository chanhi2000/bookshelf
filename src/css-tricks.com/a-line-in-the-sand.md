---
lang: en-US
title: "A Line In The Sand, A Story About Meaty Chili and Using Classes"
description: "Article(s) > A Line In The Sand, A Story About Meaty Chili and Using Classes"
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
      content: "Article(s) > A Line In The Sand, A Story About Meaty Chili and Using Classes"
    - property: og:description
      content: "A Line In The Sand, A Story About Meaty Chili and Using Classes"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/a-line-in-the-sand.html
prev: /programming/css/articles/README.md
date: 2012-10-19
isOriginal: false
author:
  - name: Chris Coyier
    url : https://css-tricks.com/author/chriscoyier/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2021/12/default-social-css-tricks.png
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
  name="A Line In The Sand, A Story About Meaty Chili and Using Classes"
  desc="In college I worked at a bar. The bar had a small kitchen and served typical American bar food: burgers, wings, and soup. We had two soups, one would rotate,"
  url="https://css-tricks.com/a-line-in-the-sand"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2021/12/default-social-css-tricks.png"/>

In college I worked at a bar. The bar had a small kitchen and served typical American bar food: burgers, wings, and soup. We had two soups, one would rotate, one was always chili. We hand-made the chili every week. Sometimes we would sell out, sometimes we’d have chili leftover at the end of the week. If there was leftover, we would either throw it out or take it home. It was still perfectly good to eat, just not a good policy to sell week old chili at a restaurant.

I worked at this bar with a friend of mine. He was a vegetarian. He wasn’t a vegetarian for taste or personal health reasons, but for global sustainability. The chili had meat in it. So, typically off the menu for my friend.

One particular end of the week rolls around and we have leftover chili. My friend is working. He could dump this pan of chili down the drain, or he could take it home. Now, if you’re a vegetarian and you are a vegetarian solely for the purpose of global sustainability, surely the correct choice here is to take the chili home and eat it. Throwing away food and consuming something else is wasteful.

Yes, he could bring it home for me or bring it to his grandmother’s house. We could think of 100 alternative paths for this chili to take, but let’s stay in the analogy here - it does come up where one’s personal ideals are challenged by practicality. Sometimes it involves chili.

When this conundrum was discussed with my friend, I thought he presented a good argument for his not eating the chili. He said: *“it’s about drawing a line in the sand.”*. In all likelihood, he was probably [<VPIcon icon="fa-brands fa-youtube"/>referencing The Big Lebowski](http://youtu.be/O1kW2yYXEeQ#t=59s), but he went on to make a good point.

This isn’t about one pan of chili and one guy at one bar. It’s about not compromising for the long term and greater good. Maybe next time the bar makes chili, the bar will make a bit less or make it in smaller batches due to known waste. Maybe next time the bar revises the menu there will be less meaty stuff because we know there are uncompromising vegetarians like my friend who spend a lot of time at bars too. If this attitude becomes the standard, it becomes about millions of pans of chili and a changed world.

Right, so, HTML classes.

You know that it’s generally best to style with classes right? This is what [OOCSS (<VPIcon icon="iconfont icon-github"/>`stubbornella/oocss`)](https://github.com/stubbornella/oocss/wiki) and [<VPIcon icon="fas fa-globe"/>SMACSS](http://smacss.com/) and [<VPIcon icon="fas fa-globe"/>modern writing](http://csswizardry.com/2012/10/a-classless-class-on-using-more-classes-in-your-html/) about CSS is teaching. Not just “use classes smartly” but also “don’t use ID’s”. [<VPIcon icon="fas fa-globe"/>CSS Lint](http://csslint.net/) event tosses you a warning for using ID’s in selectors. What? Really? An *error* for writing a perfectly valid selector?

Yes, really. ID’s are infinitely more specific than classes. Well [almost (<VPIcon icon="fa-brands fa-codepen"/>`chriscoyier`)](http://codepen.io/chriscoyier/pen/lzjqh). That’s so strong it can get out of control quickly in CSS. Yep, it can be a quick, easy, powerful override, but then how do you override that? (Who watches the Watchmen?) If you agree with yourself (and team) to never use them, you don’t get in these arms races. These override predicaments can always be solved another way - through code refactoring, nesting a class, or something else calmer and more intelligent.

Plenty of smart people disagree with this ([<VPIcon icon="iconfont icon-css-tricks"/>see comment thread on another post](https://css-tricks.com/css-style-guides/#comment-185951)). But to me, this again comes down to *drawing a line in the sand*. I’m not going to use ID’s to style things. No compromise. Even if an ID might seem like it could save me in a short term way, the long term benefits of never using them are greater.

One day I just decided to draw my own line in the sand and I haven’t styled with an ID since. Once in a while it might feel like it defies logic, but overall I feel like it has improved my work.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "A Line In The Sand, A Story About Meaty Chili and Using Classes",
  "desc": "In college I worked at a bar. The bar had a small kitchen and served typical American bar food: burgers, wings, and soup. We had two soups, one would rotate,",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/a-line-in-the-sand.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
