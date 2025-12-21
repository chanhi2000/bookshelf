---
lang: en-US
title: "The Road To Reusable HTML Components"
description: "Article(s) > The Road To Reusable HTML Components"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - smashingmagazine.com
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > The Road To Reusable HTML Components"
    - property: og:description
      content: "The Road To Reusable HTML Components"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/smashingmagazine.com/road-reusable-html-components.html
prev: /programming/css/articles/README.md
date: 2012-10-23
isOriginal: false
author:
  - name: Niels Matthijs
    url : https://smashingmagazine.com/author/niels-matthijs/
cover: https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/39c47875-8de2-411a-b45e-10c9577e5640/boston-news.jpeg
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
  name="The Road To Reusable HTML Components"
  desc="In a previous post, Niels Matthijs sampled a couple of common content types (such as products, stories and videos) across different websites. In this article, he sticks to four different views of a single content type: the story (or news article)."
  url="https://smashingmagazine.com/2012/10/road-reusable-html-components/"
  logo="https://smashingmagazine.com/images/favicon/favicon.svg"
  preview="https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/39c47875-8de2-411a-b45e-10c9577e5640/boston-news.jpeg"/>

In a previous post, Niels Matthijs sampled a couple of common content types (such as products, stories and videos) across different websites. In this article, he sticks to four different views of a single content type: the story (or news article).

A few weeks ago, I dug up an old article that I wrote for Smashing Magazine, “[**When One Word Is More Meaningful Than a Thousand**](/smashingmagazine.com/when-one-word-is-more-meaningful-than-a-thousand.md).” While I stand firmly behind all of the HTML development principles I listed back then, the article lacked one important thing: hands-on examples.

Sure enough, the theory behind component-based HTML is interesting in its own right, but without a few illustrative examples, it’s all very dry and abstract. Not that HTML enthusiasts should shy away from that (on the contrary, I would say), but there’s nothing like a good example to clear up some of the finer points of a concept.

So, that’s what I’ve set out to do in this article. In the previous one, I sampled a couple of common content types (such as products, stories and videos) across different websites. Now I’ll stick to four different views of a single content type: the story (or news article). It’s a pretty simple and straightforward content type that most people know and have developed at some point in their career. For some real-world inspiration, I’ll refer to the Boston Globe website (a front-end favorite of mine).

One important disclaimer before we get started. This article isn’t so much about the resulting HTML as it is about the methodology of writing HTML. Your opinion on the class names, structures and source order that I suggest along the way may differ, but that’s not what the article is really about (although I’m not saying it wouldn’t yield some interesting discussion).

---

## The Difference Between This And Other Popular Component-Based Methodologies

Component-based HTML development isn’t exactly new. A couple of months ago, Smashing Magazine has run articles on [**BEM**](/smashingmagazine.com/a-new-front-end-methodology-bem.md), [**OOCSS**](/smashingmagazine.com/an-introduction-to-object-oriented-css-oocss.md) and [**SMACSS**](/smashingmagazine.com/decoupling-html-from-css.md). While I don’t have enough information to judge BEM, the other two methodologies are clearly opposed to what I am going to propose here.

Methodologies such as OOCSS and SMACCS were born out of frustration with CSS, but these methodologies try to ease CSS development by altering the HTML code. I think this is definitely not the way to go (and if you check the original presentation by Nicole Sullivan, you’ll find that she proposes an early version of mixins as a better alternative). Writing HTML is about so much more than making sure the CSS has the hooks it needs for you to implement the design; so, coming at it from a CSS angle can only diminish the overall quality of the HTML you write. The problem is not limited to providing the right hooks for CSS and JavaScript; the true challenge is to make sure that every element across a website is identifiable. If you can accomplish that, then you’ve got CSS, JavaScript and whatever other script technology you’re using covered without having to worry about the project’s specifics.

The methodology I will demonstrate below was conceived with reusability and robustness in mind. It is largely independent of project-specific requirements and remains as close as possible to the purity that HTML development deserves, resulting in individual HTML snippets that are as versatile as they are reusable.

---

## Step 1: Gather All Views And Instances Of A Single Component

Let’s take this one step at a time. First of all, we need to state the requirements of our content type. To do that, we would normally run through all of the wireframes of a project, listing and grouping all of the different instances and views of each content type. To keep our example as clear and simple as possible, though, I’ve hand-picked four representative views that I’ve encountered on the [<VPIcon icon="fas fa-globe"/>Boston Globe](https://bostonglobe.com/) website.

![Boston News](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/39c47875-8de2-411a-b45e-10c9577e5640/boston-news.jpeg)

I peeked quickly behind the curtains and found the following hooks in the HTML code:

1. Shortlist view: `.in-section ul li`
2. Thumb view: `.feat-thumb`
3. Summary view: `div.story`
4. Detail view: `div.article` (or no root at all)

To be honest, I find this quite messy. If for some reason you wanted to single out all stories on your page or website (whether for CSS, JavaScript, analytics or another reason), you would have to work around quite a few ambiguities. Surely, we can do a better job.

---

## Step 2: Define The Root

```xml
<article class="story">
   …
</article>
```

There! That wasn’t too difficult now, was it? We picked the `article` element and hooked a single class name to it, which we’ll use as a base indicator for all stories. This way, we make sure that we can target all story instances using a single fixed identifier. As you can see from the Boston Globe examples, though, each view requires unique styling. Relying solely on the context of our story instances is far from flexible, so let’s introduce a specifying class for each view:

1. Shortlist view: `.story.shortlist`
2. Thumb view: `.story.thumb`
3. Summary view: `.story.summary`
4. Detail view: `.story.detail`

The reason for adding specifying classes to the root element itself (rather than, for example, to a list surrounding it) is flexibility. If tomorrow you are asked to build a composite list that holds both summary and shortlist views of the story component, you want to be able to do that without breaking a sweat.

---

## Step 3: Defining The Logical Units Inside

With that out of the way, it’s time to look at what’s inside each story component. Rather than writing the HTML for each separate view, we’ll start by going through all of the different views, listing all of the elements (i.e. logical units) that we find inside. For each element, we’ll define the HTML. Mind that these logical units could probably reappear in a different context and that they are usually components by themselves, so chances are high that you’ve already written HTML snippets for them elsewhere in your project.

### Heading

There’s always a heading. The heading summarizes all of the content that follows, so it’s one of the most essential parts of your content type (apart from the content itself, of course). All of the views listed above contain a heading, but even if you come across a view that doesn’t visually display a heading, put it in the HTML code anyway and hide it with CSS if necessary. This way, you will always “enter” your content type knowing what it’s going to be about. As for the actual code, that’s pretty straightforward:

```html
<h1>news heading</h1>
```

### Thumbnail

The second thing we see is a thumbnail image. Thumbnail images aren’t quite a part of the actual content, although in some cases a thumbnail is little more than a (browser-)resized version of the first image within the story content. It doesn’t have to be, though, because a thumbnail functions mainly as a visual cue that attracts the visitor’s attention to the story. In some cases, it isn’t even featured at all in the story itself, so let’s consider it a standalone item.

Again, the code is pretty simple. We’ve just added a wrapper around the `img` element so that we can easily add a caption if needed.

```html
<div class="image thumb"><img src="…" alt="…" /></div>
```

### Meta Data

Most content types feature meta data. Meta data isn’t truly a part of the content itself, but it tells you something extra about the content embedded within the content type. In the views above, we find several types of meta data: author, publication date, section indicator and a “first published in \[resource\]” line.

Coming up with the markup for meta data is a little trickier. If you follow the HTML5 specficiation to the letter, then you are supposed to use a definition list. Meta data is nothing more than a list of label-value pairs, which is exactly what the specification’s authors had in mind when they expanded the semantic range of the HTML5 definition list. But because the markup for definition lists is still missing a wrapper for list items, it’s not very robust, and in many cases styling it proves to be a real hassle (if not impossible). You could invalidate your code by wrapping a div around each `dd`-`dt` pair (so that you still enjoy the semantic benefits of the element), but I usually prefer to keep my code valid, sacrificing some tag semantics in the process.

```html
<div class="meta">
  <div class="author">
    <span class="dt">label:</span><span class="dd">value</span>
  </div>
  <div class="publishDate">
    <span class="dt">label:</span><span class="dd">value</span>
  </div>
  <div class="section">
    <span class="dt">label:</span><span class="dd">value</span>
  </div>
  <div class="publishedIn">
    <span class="dt">label:</span><span class="dd">value</span>
  </div>
</div>
```

### Abstract

An abstract is a short summary of or introduction to your content type. In some cases, but not always, it is identical to the actual introductory text. If the abstract is identical to the introductory text, then you could consider it a part of the actual content; if it’s tailored copy, then it should be marked up separately.

As for the HTML, you could use a paragraph tag with a class attached to it, but then you’d limit abstracts to a single paragraph. Looking at the Boston Globe example, it’s fine, but if we want our code to be portable across projects, then keeping our options open is probably best. This results in the following HTML code:

```html
<div class="abstract">
  <p> … </p>
</div>
```

### Action Links

In the detail view of the story, we see a list of actions related to the story itself. Typically, lists such as these include print and mail actions and, of course, the token social sharing options. Instead on relying on source order or numbered classes, we’ll give each link a unique class so that we can play around with it if needed.

```html
<div class="actions">
  <ul>
   <li class="recommend">…</li>
   …
   <li class="print">…</li>
  </ul>
</div>
```

You’ll notice that the action list is placed above the content, making it a likely candidate to be put inside a `header` element. While I’ll stick to that as a concession to the design, the links actually belong in the `footer` element of your content type. These are actions that become relevant once you know the context. You wouldn’t (or at least shouldn’t) share an article based merely on the title; knowing the content is crucial to deciding on your action. Adventurous CSS’ers could leave room in the header and then position the list from within the footer, but that would make the CSS implementation more fragile.

### Actual Content

Finally, we get to the crux of the matter, the story itself. What’s actually inside a story often depends on the freedom you’ve given to your content editors. Either you’ve given them a fixed set of templates to work with, or you’ve just dropped a WYSIWYG editor into the CMS and hoped for the best. One thing you need to do, though, is contain the content section, if only as a warning that what follows may be user content.

```html
<div class="content">
  …
</div>
```

### Related Stories

Finally, we find a shortlist of related stories. The most important thing to recognize here is that example one is exactly the same view as the list of related stories that we’re trying to make, so there’s really no reason to differentiate the HTML code between the two instances.

```html
<section class="storyList">
  <div class="main">
    <article class="story"> … </article>
  </div>
</section>
```

---

## Step 4: Defining Structural Containers

The elements listed above have not only a logical sequence of elements, but also a logical hierarchical structure. Some elements precede the content itself and should be placed separate from the main content. Some elements are afterthoughts or additional information and should be placed after the actual content. To do this, we set up a typical `header`-`main`-`footer` structure.

```html
<article class="story">
 <header> … </header>
 <div class="main"> … </div>
 <footer> … </footer>
<article>
```

The main wrapper might not look absolutely necessary at first glance, but because it is a logical unit, it deserves a container of its own.

---

## Step 5: Throw Everything Together

Now that all of the HTML snippets are ready, it is time to throw everything together, creating one master component.

```html
<article class="story">
  <header>
    <h1>story heading</h1>
    <div class="image thumb"><img src="…" alt="…" /></div>
    <div class="meta">
      <div class="author">
        <span class="dt">label:</span><span class="dd">value</span>
      </div>
      <div class="publishDate">
        <span class="dt">label:</span><span class="dd">value</span>
      </div>
      <div class="section">
        <span class="dt">label:</span><span class="dd">value</span>
      </div>
      <div class="publishedIn">
        <span class="dt">label:</span><span class="dd">value</span>
      </div>
    </div>
    <div class="abstract">
      <p> … </p>
    </div>
    <div class="actions">
      <ul>
        <li class="recommend">…</li>
        …
        <li class="print">…</li>
      </ul>
    </div>
  </header>
  <div class="main">
    <div class="content"> … </div>
    <aside>
      <section class="storyList">
        <div class="main">
           <article class="story">…</article>
        </div>
      </section>
    </aside>
  </div>
  <footer> (used for read more links, links to comment section, etc.) </footer>
<article>
```

---

## Step 6: Adding Microdata

Even though the HTML code is now flexible and descriptive enough for other scripts to extract or pinpoint whatever structure they need, our component still misses a common vocabulary. Sure enough, we’ve added a `.story` class to the root element, but what about using `.news`, `.article` or `.newsItem`? They’re still not very semantic. Well, HTML5 provides us with microdata, a part of the HTML5 specification, which allows us to add a global vocabulary to our HTML code. You can make your own vocabulary if you wish, but if you check a website such as [<VPIcon icon="fas fa-globe"/>Schema.org](https://schema.org/) you’ll see that plenty are already available for the most common objects. As a bonus, search engines such as Google, Yahoo and Bing support microdata already.

The `itemscope` property should be placed in the root element, together with the `itemtype` (which specifies a URL for the vocabulary — in this case, the Schema.org website). After that, it’s just a matter of running through the available vocabulary properties and adding them to your code using `itemprop`. This will give us the following HTML component:

```html :collapsed-lines
<article class="story" itemscope="itemscope" itemtype="https://schema.org/NewsArticle">
  <meta content="en" itemprop="inLanguage" />
  <header>
    <h1 itemprop="headline">story heading</h1>
    <div class="image thumb"><img src="…" alt="…" itemprop="image"/></div>
    <div class="meta">
      <div class="author">
        <span class="dt">label:</span><span class="dd" itemprop="author">value</span>
      </div>
      <div class="publishDate">
        <span class="dt">label:</span><span class="dd" itemprop="datePublished">value</span>
      </div>
      <div class="section">
        <span class="dt">label:</span><span class="dd" itemprop="articleSection">value</span>
      </div>
      <div class="publishedIn">
        <span class="dt">label:</span><span class="dd">value</span>
      </div>
    </div>
    <div class="abstract" itemprop="description">
      <p> … </p>
    </div>
    <div class="actions">
      <ul>
        <li class="recommend">…</li>
        …
        <li class="print">…</li>
      </ul>
    </div>
  </header>
  <div class="main">
    <div class="content" itemprop="articleBody"> … </div>
    <aside>
      <section class="storyList">
        <div class="main">
          <article class="story" itemscope="itemscope" itemtype="https://schema.org/NewsArticle">…</article>
        </div>
      </section>
    </aside>
  </div>
  <footer> (used for read more links, links to comment section, etc.) </footer>
<article>
```

---

## Step 7: And Finally…

Now that we have our master component, all that’s left to do is check each view and remove the elements from the master component that are not needed. If this results in any leftover (`= empty`) structural wrappers, we’ll remove them, too. This will give us the following snippets:

### Shortlist View

```html
<article class="story shortlist" itemscope="itemscope" itemtype="https://schema.org/NewsArticle">
  <meta content="en" itemprop="inLanguage" />
  <header>
    <h1 itemprop="headline">story heading</h1>
  </header>
<article>
```

### Thumb View

```xml
<article class="story thumb" itemscope="itemscope" itemtype="https://schema.org/NewsArticle">
  <meta content="en" itemprop="inLanguage" />
  <header>
    <h1 itemprop="headline">story heading</h1>
    <div class="image thumb"><img src="…" alt="…" itemprop="image"/></div>
    <div class="meta">
      <div class="section">
        <span class="dt">label:</span><span class="dd" itemprop="articleSection">value</span>
      </div>
    </div>
  </header>
<article>
```

### Summary View

```html
<article class="story summary" itemscope="itemscope" itemtype="https://schema.org/NewsArticle">
  <meta content="en" itemprop="inLanguage" />
  <header>
    <h1 itemprop="headline">story heading</h1>
    <div class="image thumb"><img src="…" alt="…" itemprop="image"/></div>
    <div class="meta">
      <div class="author">
        <span class="dt">label:</span><span class="dd" itemprop="author">value</span>
      </div>
    </div>
    <div class="abstract" itemprop="description">
      <p> … </p>
    </div>
  </header>
  <div class="main">
    <aside>
      <section class="storyList">
        <div class="main">
          <article class="story" itemscope="itemscope" itemtype="https://schema.org/NewsArticle">…</article>
        </div>
      </section>
    </aside>
  </div>
<article>
```

### Detail View

```html
<article class="story detail" itemscope="itemscope" itemtype="https://schema.org/NewsArticle">
  <meta content="en" itemprop="inLanguage" />
  <header>
    <h1 itemprop="headline">story heading</h1>
    <div class="meta">
      <div class="author">
        <span class="dt">label:</span><span class="dd" itemprop="author">value</span>
      </div>
      <div class="publishDate">
        <span class="dt">label:</span><span class="dd" itemprop="datePublished">value</span>
      </div>
      <div class="section">
        <span class="dt">label:</span><span class="dd" itemprop="articleSection">value</span>
      </div>
      <div class="publishedIn">
        <span class="dt">label:</span><span class="dd">value</span>
      </div>
    </div>
    <div class="actions">
      <ul>
        <li class="recommend">…</li>
        …
        <li class="print">…</li>
      </ul>
    </div>
  </header>
  <div class="main">
    <div class="content" itemprop="articleBody">…</div>
  </div>
<article>
```

---

## Reusable HTML Components Make Sense

If you look closely at the core principles of HTML, you will see that HTML leaves little room for variation. The HTML code we write is supposed to describe our content as clearly as possible, independent of the styling; so, there is really no reason to make different structural versions of a single component that appears in different contexts, pages or even projects. A news article is a news article, and while the inner particles may vary, the core structure, tag selection and naming conventions need not be tampered with. Of course, there is still room to accommodate the author’s personality, including minor personal preferences, certain ideologies and overall experience, but one author should ideally stick to a single structure for a single component.

Component-based HTML also has important practical advantages. Of course, the news article above is just one simple example, but you could do the same for all of the components that you use across projects. This might seem like a lot of work at first, but you’ll need to do it only once; after that, you can spend the time that you’ve saved on the dumb monkey work of fine-tuning your library. When I write the HTML for a new website these days, about 80 to 85% of the components are out of the box; the remaining 15 to 20% consist of small changes for project-specific requirements and new components (which might get added to my core library later on). This speeds up HTML development dramatically.

It’s also a tremendous advantage for people who prefer to design in the browser. One of the biggest drawbacks of designing in the browser is that the HTML is usually the least of your worries. You might intend to clean it up later, but if you’re honest with yourself, then you know that the probability that you’ll take the time to perfect an aspect of your work that’s mostly invisible to the client anyway is quite low. **By using your own library of components, you won’t need to worry about the HTML anymore.** If you need a certain component, you can just pluck it out of the box, knowing that you’re getting quality HTML from the start, and leaving you to focus on the design and CSS.

The most important advantage of component-based HTML is the quality of service you will be providing to your clients. Rather than delivering project-specific (i.e. styled) templates, you can offer them a solid HTML and component framework. This way, you give clients the option to deploy these components across multiple websites. Again, this will greatly speed up HTML development (and back-end implementation) in future projects — projects that can now start as soon as the wireframes are finished, rather than once the graphical designs are done. You could even go so far as to wireframe using your HTML components (with a white-label CSS attached to them). The possibilities seem endless. At the same time, this methodology will introduce an unprecedented level of consistency and predictability in code across all of the client’s websites, two things that are often lacking these days.

---

## The Future Of HTML

The way I see it, reusable, component-based HTML is definitely the way forward, and it’s about time we take this next step in HTML development. Just start from the components that you’ve already built, make yourself a snippet library, and go from there. Of course, some level of customization will always be needed, but I’m confident that the HTML snippet above can handle 90% of all story content types that you’ll find on the Web. The meta data may differ a little sometimes, and certain visualizations might require you to change the source order, but the basics are there to create whatever you need in less than five minutes. This is about applying the DRY principle (“don’t repeat yourself”) not just within a single project, but across multiple websites and even multiple clients.

In the end, methodologies such as OOCSS and SMACSS will only work against this ideal, because they are rooted in visual styling that prohobits the proper reuse of components across different websites. Not only that, but they will slow down the development cycle because the design becomes just another dependency. For now, this means you’ll have to rely on CSS preprocessors if you want maintainable CSS, but in the long run, we’ll benefit greatly from adapting the methodology described above. I’m interested in hearing your thoughts on this.

*[<VPIcon icon="fas fa-globe"/>Image source](https://flickr.com/photos/opensourceway/4749432099/) of picture on front page.*

::: info Further Reading

```component VPCard
{
  "title": "An Introduction To Object Oriented CSS (OOCSS)",
  "desc": "Have you ever heard the phrase “Content is King”? Being a Web developer, and therefore having a job that’s often linked to content creation, it’s likely you have. It’s a fairly overused but true statement about what draws visitors to a site.",
  "link": "/smashingmagazine.com/an-introduction-to-object-oriented-css-oocss.md",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```

- [**Client-Side Templating**](/smashingmagazine.com/client-side-templating.md)

```component VPCard
{
  "title": "Semantic CSS With Intelligent Selectors",
  "desc": "In this article, we will explore an alternative approach to styling Web documents. With the use of “intelligent” selectors, we’ll cover how to query the extant, functional nature of semantic HTML in such a way as to reward well-formed markup. If you code it right, you’ll get the design you were hoping for. Heydon Pickering hopes that employing some of these ideas will make your workflow simpler and more transferable between projects.",
  "link": "/smashingmagazine.com/semantic-css-with-intelligent-selectors.md",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The Road To Reusable HTML Components",
  "desc": "In a previous post, Niels Matthijs sampled a couple of common content types (such as products, stories and videos) across different websites. In this article, he sticks to four different views of a single content type: the story (or news article).",
  "link": "https://chanhi2000.github.io/bookshelf/smashingmagazine.com/road-reusable-html-components.html",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```
