---
lang: en-US
title: "What Is Dash?"
description: "Article(s) > (1/5) Develop Data Visualization Interfaces in Python With Dash"
category:
  - Python
  - Article(s)
tag:
  - blog
  - realpython.com
  - python
  - py
head:
  - - meta:
    - property: og:title
      content: "Article(s) > (1/5) Develop Data Visualization Interfaces in Python With Dash"
    - property: og:description
      content: "What Is Dash?"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/python-dash/what-is-dash.html
date: 2023-02-20
isOriginal: false
author:
  - name: Dylan Castillo
    url : https://realpython.com/team/dcastillo/
cover: https://files.realpython.com/media/Data-Visualization-With-Dash_Watermarked.b3eae31c557f.jpg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Develop Data Visualization Interfaces in Python With Dash",
  "desc": "In this tutorial, you'll learn how to build a dashboard using Python and Dash. Dash is a framework for building data visualization interfaces. It helps data scientists build fully interactive web applications quickly.",
  "link": "/realpython.com/python-dash/README.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Develop Data Visualization Interfaces in Python With Dash"
  desc="In this tutorial, you'll learn how to build a dashboard using Python and Dash. Dash is a framework for building data visualization interfaces. It helps data scientists build fully interactive web applications quickly."
  url="https://realpython.com/python-repl#what-is-dash"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/Data-Visualization-With-Dash_Watermarked.b3eae31c557f.jpg"/>

Dash is an open-source framework for building data visualization interfaces. Released in 2017 as a Python library, it’s grown to include implementations for R, Julia, and F#. Dash helps data scientists build analytical web applications without requiring advanced web development knowledge.

Three technologies constitute the core of Dash:

1. <FontIcon icon="iconfont icon-flask"/>Flask supplies the web server functionality.
2. <FontIcon icon="fa-brands fa-react"/>React.js renders the user interface of the web page.
3. **Plotly.js** generates the charts used in your application.

But you don’t have to worry about making all these technologies work together. Dash will do that for you. You just need to write Python, R, Julia, or F# and sprinkle in a bit of CSS.

[<FontIcon icon="iconfont icon-plotly"/>Plotly](https://plotly.com/), a Canada-based company, built Dash and supports its development. You may know the company from the [<FontIcon icon="iconfont icon-plotly"/>popular graphing libraries](https://plotly.com/graphing-libraries/) that share its name. The company released Dash as open source under an [<FontIcon icon="fas fa-globe"/>MIT license](https://tldrlegal.com/license/mit-license), so you can use Dash at no cost.

Plotly also offers a commercial companion to Dash called [<FontIcon icon="iconfont icon-plotly"/>Dash Enterprise](https://plotly.com/dash/). This paid service provides companies with support services such as hosting, deploying, and handling authentication on Dash applications. But these features live outside of Dash’s open-source ecosystem.

Dash will help you build dashboards quickly. If you’re used to analyzing data or building data visualizations using Python, then Dash will be a useful addition to your toolbox. Here are a few examples of what you can make with Dash:

- [<FontIcon icon="fas fa-globe"/>A dashboard showing object detection for self-driving cars](https://dash.gallery/self-driving/)
- [<FontIcon icon="fas fa-globe"/>A visualization of millions of Uber rides](https://dash.gallery/dash-uber-rides-demo/)
- [<FontIcon icon="fas fa-globe"/>An interactive tool for analyzing soccer match data](https://dash.gallery/soccer-match-analytics/)

This is just a tiny sample. If you’d like to see other interesting use cases, then go check out the [<FontIcon icon="fas fa-globe"/>Dash App Gallery](https://dash.gallery/).

::: note

You don’t need advanced knowledge of web development to follow this tutorial, but some familiarity with [**HTML and CSS**](/realpython.com/html-css-python.md) won’t hurt.

You should know the basics of the following topics, though:

- Python graphing libraries such as Plotly, [**Bokeh**](/realpython.com/python-data-visualization-bokeh.md), and [**Matplotlib**](/realpython.com/python-matplotlib-guide.md)
- HTML and the [<FontIcon icon="fa-brands fa-firefox"/>structure of an HTML file](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Getting_started)
- [<FontIcon icon="fa-brands fa-firefox"/>CSS and style sheets](https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps/Getting_started)

:::

If you feel comfortable with the requirements and want to learn how to use Dash in your next project, then continue to the following section!
