---
lang: en-US
title: "How to Port a Jekyll Blog Theme to Python: Lessons From Actually Doing It"
description: "Article(s) > How to Port a Jekyll Blog Theme to Python: Lessons From Actually Doing It"
icon: fa-brands fa-python
category:
  - Python
  - DevOps
  - Github
  - Github Actions
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
  - devops
  - github
  - github-actions
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Port a Jekyll Blog Theme to Python: Lessons From Actually Doing It"
    - property: og:description
      content: "How to Port a Jekyll Blog Theme to Python: Lessons From Actually Doing It"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-reading-focused-blog-with-python-markdown-and-github-pages-for-free.html
prev: /programming/py/articles/README.md
date: 2026-09-22
isOriginal: false
author:
  - name: brooklyn
    url: https://freecodecamp.org/news/author/brkln/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/1691ded5-fe4e-405e-aa70-19cd95a700da.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Python > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Github > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/github/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Port a Jekyll Blog Theme to Python: Lessons From Actually Doing It"
  desc="I've been following a tufte-jekyll styled blog for a couple of years and that led me to discover Edward Tufte's book layout. Edward Tufte is renowned for his work on data visualization and information"
  url="https://freecodecamp.org/news/how-to-build-a-reading-focused-blog-with-python-markdown-and-github-pages-for-free"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/1691ded5-fe4e-405e-aa70-19cd95a700da.png"/>

I've been following a [<VPIcon icon="iconfont icon-github"/>`clayh53/tufte-jekyll`](https://github.com/clayh53/tufte-jekyll) styled blog for a couple of years and that led me to discover Edward Tufte's [<VPIcon icon="fas fa-globe"/>book](https://edwardtufte.com/books/) layout.

[<VPIcon icon="fa-brands fa-wikipedia-w"/>Edward Tufte](https://en.wikipedia.org/wiki/Edward_Tufte) is renowned for his work on data visualization and information design, and he's a fierce advocate of high data density and for the removal of "[<VPIcon icon="fa-brands fa-wikipedia-w"/>chartjunk](https://en.wikipedia.org/wiki/Chartjunk)".

This is what [<VPIcon icon="fas fa-globe"/>tufte-css](https://edwardtufte.github.io/tufte-css/) (and its many ports, including this one) brings to the web: generous whitespace, a serif reading column, and precious *sidenotes* for supplementary information (instead of disruptive modals).

I liked almost everything about *tufe-jekyll* blogs except the parts that had nothing to do with writing: a [<VPIcon icon="fas fa-globe"/>Jekyll](https://jekyllrb.com/) powered [<VPIcon icon="fa-brands fa-wikipedia-w"/>Ruby](https://en.wikipedia.org/wiki/Ruby_(programming_language)) version I only ever touched for this one project.

So I rewrote the whole theme in Python. Not because Jekyll is bad. It isn't. But because I wanted a toolchain I'm comfortable with. I was also curious whether I actually understood and could assimilate how a [<VPIcon icon="iconfont icon-netlify"/>static site generator](https://netlify.com/blog/2020/04/14/what-is-a-static-site-generator-and-3-ways-to-find-the-best-one/) works.

![Animated screenshot that displays an accessible Tufte layout template.](https://cdn.hashnode.com/uploads/covers/67c84561e3f229edf2351ba2/72b186a8-6781-4101-a58c-09331f54fba0.gif)

[<VPIcon icon="iconfont icon-github"/>`hyperphantasia/tufte-python`](https://github.com/hyperphantasia/tufte-python) is that port and this write-up acts as a guide: what actually has to happen when you move a Liquid-based Jekyll theme to a Python one, and *the specific places* I got it wrong before I got it right.

None of this is Jekyll-specific advice. The same pattern applies whether your target is [<VPIcon icon="iconfont icon-github"/>`gohugoio/hugo`](https://github.com/gohugoio/hugo) (GoLang), [<VPIcon icon="iconfont icon-github"/>`11ty/buildawesome`](https://github.com/11ty/buildawesome) (JavaScript), or something else.

Here, you'll tinker on very focused technical points but also discover a way to break things down. If you're porting a different theme, or porting to a different language entirely, remember: the syntax changes but *the shape* of the challenge is the same.

---

## But Wait, Why a Static Blog?

Compared to dynamic websites, a [<VPIcon icon="fas fa-globe"/>static](https://wix.com/blog/static-vs-dynamic-website) site has a simple publishing workflow. In this case, it consists of five steps:

1. Write a Markdown file.
2. Run the generator.
3. Preview and review the result.
4. Commit the source files.
5. Let GitHub Actions publish the site.

This workflow is simple enough for the needs I have: occasionally publishing posts on my personal Dev blog. It keeps the content readable in a text editor and makes every change easy to review.

Like its predecessor, the actual codebase keeps Jinja2 [<VPIcon icon="fas fa-globe"/>templates](https://geeksforgeeks.org/python/getting-started-with-jinja-template/), Markdown, and a YAML [<VPIcon icon="fas fa-globe"/>front matter](https://markdownlang.com/advanced/frontmatter.html) for contents. A GitHub Actions workflow builds the site and deploys the generated <VPIcon icon="fas fa-folder-open"/>`_site/` directory to GitHub Pages.

---

## Why Port a Theme Instead of Just Using It As-Is ?

There are various reasons for doing it this way.

First, maybe you want out of a toolchain you don't use anywhere else. For me that was [<VPIcon icon="fas fa-globe"/>Ruby](https://infoworld.com/article/2337962/whatever-happened-to-ruby.html) installed on my machine for exactly and only this purpose. It was flaky enough that *update my blog* occasionally turned into *fix my Ruby environment* first.

Or maybe you already write in the target language daily, and would rather read and extend a generator you're fluent in than learn just enough of another ecosystem to (eventually) tweak a plugin file.

Or perhaps you want to understand static site generators, not just operate one. Porting forces you to read every template, every custom tag, and every build step closely enough to re-implement it. You learn and retain information differently. It's a very different level of understanding than *oh! it works,* and it's one of the best ways to achieve mastery.

::: note What You'll Need

- Basic Python: virtual environments, reading someone else's code.
- Git and a GitHub account, since the destination for both versions is GitHub Pages.
- Familiarity with [<VPIcon icon="fa-brands fa-markdown"/>Markdown](https://markdownguide.org/) and [<VPIcon icon="fas fa-globe"/>Git](https://learngitbranching.js.org/) (you can even learn it as a [<VPIcon icon="fas fa-globe"/>game](https://blinry.itch.io/oh-my-git)).
- Basic familiarity with Jekyll's project [<VPIcon icon="fas fa-globe"/>layout](https://jekyllrb.com/docs/step-by-step/04-layouts/): `_config.yml`, `_layouts/`, `_includes/`, and Liquid template [<VPIcon icon="fas fa-globe"/>syntax](https://jekyllrb.com/docs/step-by-step/02-liquid/).
- No prior Jinja2 experience required. It's close enough to Liquid conceptually that you'll pick it up as you go.

:::

---

## See the Destination First: Get the Finished Port Running

Before I get into how the port actually came together (including the parts that broke), it's worth seeing where it ends up. The theme I'm describing already exists as a ready-to-ship project. [<VPIcon icon="iconfont icon-github"/>`hyperphantasia/tufte-python`](https://github.com/hyperphantasia/tufte-python) comes with its own tutorials and you can have it [<VPIcon icon="fas fa-globe"/>running](https://hyperphantasia.github.io/tufte-python) locally within minutes.

This gives you something concrete to compare against as you read the rest of this, and something to fork if you'd rather adapt an existing port than build your own from zero.

### Setup

First, clone it and point it at your own repository (or fork it)

Start by creating a new, empty repository on GitHub. Give it a name such as `my-blog`:

```sh
git clone https://github.com/hyperphantasia/tufte-python.git my-blog
cd my-blog
```

Next, change the origin remote to point to your repository

```sh
git remote set-url origin <your-repository-url>
```

Then push the project:

```sh
git push -u origin main
```

Next, install the dependencies in a virtual environment

```sh
python -m venv .venv
# Uncomment to match your OS
# source .venv/bin/activate      # macOS/Linux
# .venv\Scripts\Activate.ps1     # Windows PowerShell
pip install -r requirements.txt
```

Now you'll want to set basic configuration values before your first build.

Open <VPIcon icon="iconfont icon-yaml"/>`config.yml` at the project root:

```yaml title="config.yaml"
title: "A Quiet Corner of the Web"
author: "Your Name"
email: "you@example.com"

url: "https://yourusername.github.io"
baseurl: "/my-blog"              # "" instead, if this is a user/org page
permalink: "/articles/{year}/{slug}/"

theme: "solAArized"
options:
  mathjax: true
```

If you're publishing at `https://yourusername.github.io/my-blog/`, `baseurl` needs to match the repository name exactly, leading slash and no trailing slash. If you get this one wrong, every internal link and stylesheet reference on the deployed site will 404 while working fine locally (more on why in the point below).

Finally, build and preview it:

```sh
python build.py --serve --watch
```

![Terminal of a deployed instance of tufte-python showing the localhost.](https://cdn.hashnode.com/uploads/covers/67c84561e3f229edf2351ba2/9a27cf22-f9c7-4596-8933-a7691376adb4.png)

Open the address the terminal prints `http://localhost:8000` (usually) and you should see the demo content that is already in `content/`. Leave `--watch` running and edit a post: the page rebuilds without you re-running anything.

One thing is worth knowing now before it costs you a confusing afternoon later: the local `--serve` preview ignores `baseurl` on purpose, so links and assets resolve from the root of your *dev* *server* instead of a subdirectory.

If you want to check the site exactly as it'll look once deployed, including the real `baseurl`: run `python build.py --serve --production-urls` instead. This is meant to preview the site using the production URL structure.

That distinction is the entire reason the *works locally, breaks in production* bug exists for static sites in subdirectories, and it's worth deliberately testing both modes at least once before you deploy for real.

### Write your First Post

You can see the theme's features render on your own content instead of the demo's. Create <VPIcon icon="fas fa-folder-open"/>`content/posts/`<VPIcon icon="fa-brands fa-markdown"/>`2024-06-07-hello.md`:

```md title="content/posts/2024-06-07-hello.md"
---
title: "Hello, Margins"
date: 2024-06-07 14:30:00
categories: notes
tags: [smile, writing]
---

{% newthought 'A new thought' %} can open a section without another heading.

Here's a sidenote{% sidenote 'note-1' 'This appears in the right margin on wide screens, and behind a tap target on narrow ones.' %} to try the feature that made me want this theme in the first place.

<!--more-->

Everything past the `<!--more-->` marker stays off the homepage excerpt but shows up on the full post.
```

Many other [<VPIcon icon="fas fa-globe"/>visual features](https://hyperphantasia.github.io/tufte-python/articles/2024/fcc-tutorial/) are available. They are discussed in details [below](#the-rendered-features), during implementation.

Rebuild (or let `--watch` pick it up), and you should see a small-caps opening phrase and a numbered note sitting in the margin next to the paragraph that references it. If both of those render, the theme's core mechanism is working end to end on your machine, good! This is the mechanic the rest of this tutorial is all about.

![GitHub pages section screenshot showing the GitHub actions source to deploy correctly.](https://cdn.hashnode.com/uploads/covers/67c84561e3f229edf2351ba2/9956118e-ce14-4b85-a6a4-8b41df5812a0.png)

In your repository's **Settings → Pages**, set the source to **GitHub Actions** if it isn't already. The workflow bundled with the project builds and deploys automatically on every push to <VPIcon icon="fas fa-code-branch"/>`main`. I'll walk through what that workflow is actually doing in Step 6, since GitHub Pages *doesn't know* what to do with a Python build script.

Ship it once you're happy with it locally:

```sh
git add config.yml content/
git commit -m "Configure site and add first post"
git push
```

With that running, you've got a working reference point online. Now here's how it got built.

---

## From tufte-jekyll to tufte-python, Step by Step

To migrate a Jekyll theme to a Python build system, it's important to follow structural steps that deconstruct the existing setup.

Here, I determined six high-level steps, but that can vary depending on your task. It's very important to "own" the result in your mind first. This approach will enable you to consolidate a configuration and modernize the tooling with minimal breaks during the process.

### Step 1: Inventory the Source Theme's Moving Parts

**Before** writing any Python, I listed every piece of Jekyll machinery the theme actually depended on. For [<VPIcon icon="iconfont icon-github"/>`clayh53/tufte-jekyll`](https://github.com/clayh53/tufte-jekyll) Liquid-heavy theme, that breaks into four categories:

| Jekyll piece | What it does | Expected Python equivalent |
| --- | --- | --- |
| `_config.yml` + <VPIcon icon="fas fa-folder-open"/>`_data/*.yml` | Site metadata, base URL, permalink pattern, feature toggles, structured data like social links | One <VPIcon icon="iconfont icon-yaml"/>`config.yml` |
| <VPIcon icon="fas fa-folder-open"/>`_layouts/` + <VPIcon icon="fas fa-folder-open"/>`_includes/` | Page templates and partials | A <VPIcon icon="fas fa-folder-open"/>`templates/` directory of title="config.yaml" Jinja2 templates |
| <VPIcon icon="fas fa-folder-open"/>`_plugins/*.rb` | Ruby classes registering the theme's custom Liquid tags | A small Python module expanding the same tag syntax |
| <VPIcon icon="fas fa-folder-open"/>`_sass/*.scss` | Sass partials compiled into one stylesheet at build time | Plain CSS files, no compile step |

I missed a fifth category on my first pass: the original theme ships two separate [<VPIcon icon="fa-brands fa-wikipedia-w"/>Rake](https://en.wikipedia.org/wiki/Rake_(software)) tasks, one for scaffolding new posts and pages, and a completely different one: `UploadToGithub.Rakefile` for pushing the built site to a `gh-pages` branch by hand.

This is needed because the theme's plugins aren't in Jekyll's Pages-safe [<VPIcon icon="fas fa-globe"/>allowlist](https://web.archive.org/web/20140223145829/http://blog.nitrous.io/2013/08/30/using-jekyll-plugins-on-github-pages.html). I'd read the main `Rakefile` and assumed I had the whole deploy story, then wondered for some time how the original author actually got the site live.

::: note Advice

*read the whole repository root*, not just the files with obvious names, before you commit to a structure.

:::

### Step 2: Collapse Scattered Config Into One File

The Jekyll version spreads settings across <VPIcon icon="iconfont icon-yaml"/>`_config.yml` (site title, URL, baseurl, permalink pattern) and one or more files under <VPIcon icon="fas fa-folder-open"/>`_data/`: a toggle for MathJax and font loading in one file, a list of social links in another. That split follows Jekyll's own data-file conventions, but it's a complexity you don't need when you're writing your own (minimal) loader.

I consolidated all of it into a single file with clearly named sections, so anyone extending the theme later can find every setting in one place instead of three. You get something like this:

```yaml title="config.yml"
# --- site metadata ---
title: "A Quiet Corner of the Web"
author: "Your Name"
email: "you@example.com"

# --- URL settings ---
url: "https://yourusername.github.io"
baseurl: "/my-blog"
permalink: "/articles/{year}/{slug}/"

# --- feature toggles (previously in _data/options.yml) ---
mathjax: true
justify_text: false

# --- social links (previously in _data/social.yml) ---
social:
  - link: "github.com/yourusername"
    icon: icon-github
```

### Step 3: Rebuild Custom Liquid Tags as Text Shortcodes

This is the part that took the longest to tinker with. It's also where most of the theme's actual personality lives. This is where you actually build the visual features: sidenotes, margin figures, and epigraphs.

#### How Jekyll does it

Custom Liquid tags live in <VPIcon icon="fas fa-folder-open"/>`_plugins/`, as Ruby classes Jekyll registers with its Liquid parser. Jekyll expands them during its Liquid render pass, *before* handing the result to its Markdown engine.

A tag like `{% sidenote "note-1" "Some aside." %}` never reaches the Markdown converter as-is. It's already been swapped for HTML by the time Markdown sees the page.

#### Why you can't just port this 1:1 into Jinja2. Jinja2 has its own tag system, but it's built for template-authoring logic (with loops, conditionals, and so on) not for parsing arbitrary quoted arguments out of prose sitting inside a Markdown file. And even if I'd built a Jinja2 extension for it, every existing post using the old `{% sidenote ... %}` syntax would need rewriting. This catch defeats the entire point of a drop-in port.

#### What Actually Works

Treat the tag syntax as plain text, and expand it with a preprocessing pass over the raw Markdown, before handing it to the Markdown renderer. The strategy is to mirror Jekyll's own tag-then-Markdown order exactly. A simplified version of that pass looks like this:

```py :collapsed-lines
import re, shlex

TAG_RE = re.compile(r"\{%\s*(\w+)\s*(.*?)\s*%\}")

def split_args(raw: str) -> list[str]:
    lexer = shlex.shlex(raw, posix=True)
    lexer.whitespace_split = True
    return list(lexer)

def render_sidenote(args, resolve_img, render_md):
    note_id, text = args[0], args[1]
    text = render_md(text)
    return (f"<label for='{note_id}' class='margin-toggle sidenote-number'>"
            f"</label><input type='checkbox' id='{note_id}' "
            f"class='margin-toggle'/><span class='sidenote'>{text}</span>")

HANDLERS = {"sidenote": render_sidenote}  # All visual features are registered here

def expand_shortcodes(text: str, resolve_img, render_md) -> str:
    def dispatch(match: re.Match) -> str:
        name, raw_args = match.group(1), match.group(2)
        handler = HANDLERS.get(name)
        if handler is None:
            return match.group(0)  # leave unknown tags untouched
        return handler(split_args(raw_args), resolve_img, render_md)
    return TAG_RE.sub(dispatch, text)
```

The snippet above acts as a custom "search-and-replace" engine that converts shorthand tags into HTML before the final page is rendered. It uses a regular expression to scan the text for patterns like `{% tag arguments %}`.

**The Regex (`TAG_RE`) is the "Scanner":**

The regex is responsible for finding the tags in the big block of text. It breaks every match into two specific groups:

- Group 1 (the name): the word immediately after {% (for example, "sidenote").
- Group 2 (the raw arguments): everything else until the closing %} (for example, "note-1" "Some aside.").

**`expand_shortcodes` is the "Coordinator":**

This function manages the overall process. It uses `re.sub` to loop through the text. Every time the regex finds a match, `expand_shortcodes` triggers the dispatch function, which does two things:

- It uses the name from Group 1 to look up the correct logic in the `HANDLERS` dictionary.
- It passes the raw arguments from Group 2 into `split_args` before sending them to the parser.

**`split_args` is the "Parser":**

`split_args` uses the [<VPIcon icon="fa-brands fa-python"/>shlex library](https://docs.python.org/3/library/shlex.html) to "smart-split" the string. It recognizes quotes, so that anything inside quotation marks is kept together as a single argument. This produces a clean list where Arguments containing spaces, like a sentence inside quotes are treated as a single piece of data rather than multiple separate words (for example, ['note-1', 'Some aside.']). The final handler function can easily process that.

**Render:**

The last step is the actual rendering. Each tag name identified in the `HANDLERS` dictionary is tied to a specific Python function that knows how to return the corresponding HTML markup (for example, `render_sidenote()` for sidenotes).

You can have a look at the `.sidenote` and `.margin-toggle` [CSS classes (<VPIcon icon="iconfont icon-github"/>`hyperphantasia/tufte-python`)](https://github.com/hyperphantasia/tufte-python/blob/main/static/css/tufte.css), to grasp an idea of how they behave visually.

Two bugs taught me why the details above matter. Both were found by throwing real old posts at the new build instead of just the demo content:

- **Quoting** broke first. My first argument splitter was `raw.split()` on whitespace. It worked fine until I fed it a post with an apostrophe in a sidenote.<br/>**Example**: "reader's" is problematic. It split into two arguments and shift every argument after it by one. Liquid's own [tag documentation](https://liquidjs.com/tags/include.html#Outputs-amp-Filters) actually spells out the fix: accept either single or double quotes, and allow a backslash to escape a quote inside the text. `shlex` in POSIX mode does exactly that in about two lines, which is a smaller fix than the bug deserved.
- **Code fences** broke second. I wrote a post explaining the shortcode syntax itself, with an example wrapped in a fenced code block. This is a case of context-blindness. The regular expression is designed to find the pattern `{% ... %}` anywhere it appears in the document, but it doesn't know the difference between "live" code that should be executed and "example" code that is just meant to be displayed as-is to the reader. `The expand_shortcodes` function sees the `{% and %}` inside that code block and says, "Aha! A visual feature!" It then replaces the example text with the actual HTML for a sidenote and you end up seeing a broken layout where a functional feature is floating inside a code block.
<br/>The fix is to stash fenced and inline code spans behind placeholders (like `##CODEBLOCK_1##`) before running the tag regex, then restore them afterward.

#### The Rendered Features

The margin is not *decoration.* The Tufte-inspired layout remains readable thanks to the restrained typography and a generous margin set for supporting materials.

Secondary information moves into the margin instead of becoming a long interruption in the body of the article. It gives other visual elements such as notes, references, and figures a unique place to live without interrupting the main argument.

From there, porting the rest of the tags was repetitive and mechanical: same pattern, a different handler and argument count each time, the entire code is available in this [file (<VPIcon icon="iconfont icon-github"/>`hyperphantasia/tufte-python`)](https://github.com/hyperphantasia/tufte-python/blob/main/tufte_ssg/shortcodes.py) and this is how they render:

::: tabs

@tab New Thought:

![Tufte-Python: NewThouht example screenshot.](https://cdn.hashnode.com/uploads/covers/67c84561e3f229edf2351ba2/e05dfc4d-a76d-41fa-80e4-b6dc65413683.png)

- Liquid tag: `{% newthought 'text' %}`

@tab Sidenote:

![Tufte-Python: sidenote example screenshot.](https://cdn.hashnode.com/uploads/covers/67c84561e3f229edf2351ba2/879c459d-085e-4b4b-9341-5a4dcb34341b.png)

- Liquid tag: `{% sidenote 'id' 'text' %}`

Sidenotes are numbered aside in the right margin.

@tab Margin note:

![Tufte-Python: margin note example screenshot.](https://cdn.hashnode.com/uploads/covers/67c84561e3f229edf2351ba2/312efc73-1f49-4774-997c-fec4b490de9b.png)

- Liquid tag: `{% marginnote 'id' 'text' %}`

Margin notes are unnumbered aside in the margin.

@tab Margin figure:

![Tufte-Python: Margin figures example screenshot.](https://cdn.hashnode.com/uploads/covers/67c84561e3f229edf2351ba2/2a2d7d4c-7fc4-499b-a18d-19a159efe33f.png)

- Liquid tag: `{% marginfigure 'id' 'path' 'caption' %}`

The supporting image is confined to the margin column. Handling images isn't a big challenge, since HTML provides `img` tags. Positioning them correctly within the viewport is bit more tricky but was already handled well by the original SCSS.

@tab Main column figure:

![Tufte-Python: Main column figure example screenshot.](https://cdn.hashnode.com/uploads/covers/67c84561e3f229edf2351ba2/5b467bb2-0dec-4a71-8013-c06c7214d5b9.png)

- Liquid tag: `{% maincolumn 'path' 'caption' %}`

The main image is confined to the main text column.

@tab Full-width figure:

![Tufte-Python: full width figure example screenshot.](https://cdn.hashnode.com/uploads/covers/67c84561e3f229edf2351ba2/7a1bfc24-c28b-4b70-8c0f-d0cc670075c7.png)

- Liquid tag: `{% fullwidth 'path' 'caption' %}`

The full image spans on both columns.

@tab Epigraph:

![Tufte-Python: epigraph example screenshot.](https://cdn.hashnode.com/uploads/covers/67c84561e3f229edf2351ba2/7c49ef48-1f20-4b08-a5dd-d5b9a183b77a.png)

- Liquid tag: `{% epigraph 'quote' 'author' 'source' %}`

This is meant for a standalone attributed quotation.

@tab Math:

![Tufte-Python: MathJax example screenshot.](https://cdn.hashnode.com/uploads/covers/67c84561e3f229edf2351ba2/971ddc29-ad59-4d60-b09d-0f6c51f2ad1d.png)

- Liquid tag: `{% math %} ... {% endmath %}`

This is pure block [<VPIcon icon="fa-brands fa-wikipedia-w"/>LaTeX](https://en.wikipedia.org/wiki/LaTeX), rendered via [MathJax](https://math.meta.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference).

:::

You can also use standard markdown features, like code snippets:

![Tufte-Python: code snippet example screenshot.](https://cdn.hashnode.com/uploads/covers/67c84561e3f229edf2351ba2/f5eff9c6-53cd-4b39-8431-f32400f399c8.png)

or tables:

![Tufte-Python: table example screenshot.](https://cdn.hashnode.com/uploads/covers/67c84561e3f229edf2351ba2/6b8b573c-0780-4822-b20d-42b3e801ee5c.png)

These last two elements were easier to implement. Since they render in pure Markdown, it really is just about handling them directly in the CSS style sheet (for example, the Table styling section in the [tufte.css (<VPIcon icon="iconfont icon-github"/>`hyperphantasia/tufte-python`)](https://github.com/hyperphantasia/tufte-python/blob/main/static/css/tufte.css) file).

### Step 4: Replace Compiled Sass With Swappable Plain CSS

Jekyll's Sass pipeline compiles <VPIcon icon="fas fa-folder-open"/>`_sass/` partials into a single stylesheet at build time, baking one fixed color palette into the output.

I didn't want a Sass-compilation dependency just to port a theme, so I stopped compiling colors into CSS.

The plain CSS stylesheet comes into two layers: structural CSS that *never hardcodes a color*, only references custom properties like `color: var(--color-text)`, and one small theme file per palette that defines nothing but `--color-*` properties. The build copies just the selected theme's file into the output, based on a `theme:` key in <VPIcon icon="iconfont icon-yaml"/>`config.yml`.

![Tufte python ssg animated screenshot of the available accessible the title="config.yaml"mes.](https://cdn.hashnode.com/uploads/covers/67c84561e3f229edf2351ba2/a8688624-19bb-4b22-acdc-4d9b4c9e5caa.gif)

Custom themes were a **big improvement** I wanted to implement. This turned into more than a workaround once I actually checked the numbers. I'd defaulted to [<VPIcon icon="fas fa-globe"/>Solarized](https://ethanschoonover.com/solarized/) first because I liked it, and only later discovered it's not [<VPIcon icon="fas fa-globe"/>optimal](https://innocen.at/2020/05/on-solarized-and-why-i-stopped-using-it/) in terms of [<VPIcon icon="fas fa-globe"/>accessibility](https://johnsy.com/blog/2025/12/15/accessible-colours-over-solarized/). That's a known, documented property: it trades some contrast for reduced eye strain.

Shipping it as the *default* without flagging it felt wrong for something other people might actually use to read.

Since the theme system is just swappable CSS files, the fix was adding one more file: a [<VPIcon icon="iconfont icon-w3c"/>WCAG 2.0 AA](https://w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html) accessible variant with the same palette adjusted to clear 4.5:1 contrast, alongside the original. That's the option this tutorial's config example points at: [<VPIcon icon="iconfont icon-github"/>`paulcpederson/solAArized`](https://github.com/paulcpederson/solAArized).

The custom-properties approach *paid off* again a moment later: because colors are resolved at runtime by the browser instead of baked in at build time, adding a light/dark toggle driven by `prefers-color-scheme` was just a small [JS file (<VPIcon icon="iconfont icon-github"/>`hyperphantasia/tufte-python`)](https://github.com/hyperphantasia/tufte-python/blob/main/static/js/theme-toggle.js) to wrap. This is something a Sass-compiled single palette can't do without recompiling twice.

### Step 5: Swap Filesystem-Watching for an Explicit Build Cache

`jekyll serve -w` bundles file-watching and incremental regeneration. Incremental involves tracking the actual state.

My first cache just tracked each post's own modification time: unchanged file, skip re-rendering. That's correct right up until you edit a shared template. I changed the post layout, rebuilt, and only two of my posts picked up the change: the ones I'd also touched that day. The others were "unchanged" by the only definition the cache knew about, so they kept their stale, pre-edit HTML in <VPIcon icon="fas fa-folder-open"/>`_site/`.

The fix is a second, separate timestamp that isn't tied to any one document: track the newest modification time across *global* build inputs: templates, <VPIcon icon="iconfont icon-yaml"/>`config.yml`, and the generator's own source. If any of those is newer than the cache, force a full rebuild regardless of what any individual post's timestamp title="config.yaml" says.

```py
import json
from pathlib import Path

CACHE_FILE = Path(".build_cache.json")

def load_cache() -> dict:
    if not CACHE_FILE.exists():
        return {"global_mtime": 0.0, "docs": {}}
    return json.loads(CACHE_FILE.read_text())

def needs_rebuild(src: Path, out: Path, cache: dict, global_stale: bool) -> bool:
    if global_stale or not out.exists():
        return True
    cached_mtime = cache["docs"].get(str(src))
    return cached_mtime is None or src.stat().st_mtime > cached_mtime

def save_cache(cache: dict, docs: dict) -> None:
    cache["docs"] = docs
    CACHE_FILE.write_text(json.dumps(cache))
```

The `load_cache()` function reads a saved JSON file that remembers when each document was last modified or it creates a fresh empty cache if the file doesn't exist yet.

The `needs_rebuild()` function checks whether a source file actually needs to be rebuilt by comparing its current modification time with the timestamp stored in the cache. If the file is newer than what's cached, or if the output file doesn't exist, it returns `True` (meaning "rebuild needed").

Finally, `save_cache()` updates the cache with the new build information and saves it back to the JSON file, so next time you run your build, you can skip files that haven't changed.

There's no cheap way to know *which* pages a shared template actually touches without re-parsing everything, so I stopped trying to be clever about it. It costs one slower build after a template edit but that's in exchange for never silently shipping a page that looks like it built successfully but didn't actually pick up the change.

### Step 6: Replace Jekyll's Native GitHub Pages Build With Your Own CI

GitHub Pages knows how to build Jekyll natively. It has no idea what `python build.py` means, so the port needs its own CI step to build the site and hand the output to Pages:

```yaml title=".github/workflows/deploy.yml"
name: Build and deploy site
on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: "3.12"
      - run: pip install -r requirements.txt
      - run: python build.py
      - uses: actions/upload-pages-artifact@v3
        with:
          path: _site

  deploy:
    needs: build
    runs-on: ubuntu-latest
    permissions:
      pages: write
      id-token: write
    steps:
      - uses: actions/deploy-pages@v4
```

What happens? When you push, GitHub's servers automatically run the build job, which checks out your code, installs Python 3.12, downloads the project dependencies (from `requirements.txt`), runs `build.py` to generate the website, and then uploads the generated `_site` folder as an artifact.

After that succeeds, the deploy job automatically runs and takes that artifact to publish it live to GitHub Pages. Note the `needs: build` line. It validates the deploy step only happens after the build completes successfully, so you can't accidentally deploy a broken build.

This is the workflow the [quickstart](#write-your-first-post) earlier in this piece relies on. Remember that in **Settings → Pages**, the source has to be set to **GitHub Actions** rather than a branch (this replaces Jekyll's built-in build step entirely). I missed that setting the first time and spent a few minutes convinced the workflow had silently failed, when it had actually succeeded and just had nowhere configured to deploy to.

### Step 7: Verify Feature Parity, Not Just "It Builds"

A port that compiles cleanly isn't necessarily a correct one. Every bug I've described above passed a clean build first. Before I called it done, I tested against:

- **Real, unmodified posts from the original theme**, not just demo content. This is what actually caught the quoting bug and the code-fence bug, neither of which showed up until I stopped testing against content I'd written specifically to be easy.
- **Quoting edge cases** deliberately: an apostrophe inside a note, Markdown formatting inside a note, an escaped double quote.
- **Responsive behavior**, since sidenotes and margin notes that **tap-to-reveal** on narrow screens are easy to get right on desktop and silently break on mobile versions.

![Tufte python powered blog displaying a responsive state.](https://cdn.hashnode.com/uploads/covers/67c84561e3f229edf2351ba2/47a91b88-357d-4979-a15f-e46414d61c7c.gif)

Responsive design is sometimes neglected and definitely not an option regarding nowadays devices diversity. Always consider it as a full and distinct user experience.

---

## What I'd Tell Myself at the Start

Every real bug in this port came from the same root cause: testing against content I'd written to be easy, instead of content that already existed.

Don't have opinions about how the old tags should behave. The fix, every time, was the same instinct: go find the actual edge case in the old repository's documentation and code, rather than guessing at what "probably" needs to be supported.

The steps themselves generalize past this one theme: inventory the source generator's moving parts, consolidate its config, re-implement custom tags as a text-preprocessing pass instead of fighting your new template engine's syntax, swap compiled styling for something your new stack can produce without extra tooling, write your own incremental cache with an explicit escape hatch for global changes, replace whatever native deploy step you're leaving behind with your own CI, and verify against real content, not a clean build. That holds whether you're moving from Jekyll to Python, Python to Go, or anywhere else.

::: info

Thanks for reading! Feel free to contribute to [<VPIcon icon="iconfont icon-github"/>`hyperphantasia/tufte-python`](https://github.com/hyperphantasia/tufte-python)! I'm very curious about what you can come with to make this library better. More personal projects are available on my [GitHub (<VPIcon icon="iconfont icon-github"/>`hyperphantasia`)](https://github.com/hyperphantasia) and [Kaggle (<VPIcon icon="iconfont icon-kaggle"/>`grimespoint`)](https://kaggle.com/grimespoint). You can also connect with me directly on [LinkedIn (<VPIcon icon="fa-brands fa-linkedin"/>`to-b-one`)](https://linkedin.com/in/to-b-one) as well.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Port a Jekyll Blog Theme to Python: Lessons From Actually Doing It",
  "desc": "I've been following a tufte-jekyll styled blog for a couple of years and that led me to discover Edward Tufte's book layout. Edward Tufte is renowned for his work on data visualization and information",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-reading-focused-blog-with-python-markdown-and-github-pages-for-free.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
