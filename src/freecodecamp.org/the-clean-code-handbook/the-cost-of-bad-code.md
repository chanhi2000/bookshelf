---
lang: en-US
title: "The Cost of Bad Code"
description: "Article(s) > (1/7) The Clean Code Handbook: How to Write Better Code for Agile Software Development" 
category:
  - JavaScript
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - js
  - javascript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > (1/7) The Clean Code Handbook: How to Write Better Code for Agile Software Development"
    - property: og:description
      content: "The Cost of Bad Code"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/the-clean-code-handbook/the-cost-of-bad-code.html
date: 2025-01-30
isOriginal: false
author:
  - name: Programming with Shahan
    url : https://freecodecamp.org/news/author/codewithshahan/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1738170236859/edacf21e-7180-4f65-9e7e-f7cf95b4f9d8.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "The Clean Code Handbook: How to Write Better Code for Agile Software Development",
  "desc": "Building scalable software applications requires writing clean code that’s so simple that any dev can understand it. In this article, I’ll explain and demonstrate what clean code is. Then I’ll share my favorite clean code patterns for building modern...",
  "link": "/freecodecamp.org/the-clean-code-handbook/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="The Clean Code Handbook: How to Write Better Code for Agile Software Development"
  desc="Building scalable software applications requires writing clean code that’s so simple that any dev can understand it. In this article, I’ll explain and demonstrate what clean code is. Then I’ll share my favorite clean code patterns for building modern..."
  url="https://freecodecamp.org/news/the-clean-code-handbook#heading-the-cost-of-bad-code"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1738170236859/edacf21e-7180-4f65-9e7e-f7cf95b4f9d8.png"/>

![Image of cost of messy code vs clean code graph by shahan](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/wdai6npb55j71sguj6kl.png)

To explain this stack bar graph, in the initial development phase, bad code is **slightly** more costly to change than clean code.

But as we move into the maintenance and refactoring phases, the gap widens significantly, with bad code costing nearly twice as much as clean code.

By the legacy phase, bad code reaches 100% cost – now it’s extremely expensive to update, while clean code remains more manageable at 45%.

As of now, the most recent analysis on the cost of poor software quality in the U.S. is the 2022 report by the Consortium for Information and Software Quality ([<FontIcon icon="fas fa-globe"/>cisq.org](http://cisq.org)). This report estimates that poor software quality cost the U.S. economy at least $2.41 trillion in 2022, with technical debt accounting for about $1.52 trillion of this amount.

You can [<FontIcon icon="fas fa-globe"/>read more about that here](https://it-cisq.org/the-cost-of-poor-quality-software-in-the-us-a-2022-report/).

Recent discussions continue to highlight the significant impact of technical debt on software quality and business performance.

For instance, [<FontIcon icon="fas fa-globe"/>a 2024 survey](https://vfunction.com/blog/how-to-manage-technical-debt) indicated that for more than 50% of companies, technical debt accounts for greater than a quarter of their total IT budget. And this can really hinder innovation if it’s not addressed.

As you can see, there’s no doubt that bad code is a costly problem in software development.
