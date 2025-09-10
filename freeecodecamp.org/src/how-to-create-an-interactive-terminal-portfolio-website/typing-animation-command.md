---
lang: en-US
title: "Typing Animation Command"
description: "Article(s) > (15/19) How to Create an Interactive Terminal Portfolio Website" 
category:
  - JavaScript
  - jQuery
  - Linux
  - Shell
  - Article(s)
tag: 
  - blog
  - freecodecamp.org
  - js
  - javascript
  - jquery
  - linux
  - sh
  - shell
  - cli
head:
  - - meta:
    - property: og:title
      content: "Article(s) > (15/19) How to Create an Interactive Terminal Portfolio Website"
    - property: og:description
      content: "Typing Animation Command"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-create-an-interactive-terminal-portfolio-website/typing-animation-command.html
date: 2024-04-29
isOriginal: false
author:
  - name: Jakub T. Jankiewicz
    url : https://freecodecamp.org/news/author/jcubic/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1730895455049/8fefc48c-761d-4ec5-8f60-b6eb2f97a42a.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "How to Create an Interactive Terminal Portfolio Website",
  "desc": "In this article, you will learn how to create an interactive terminal-based portfolio and a résumé in JavaScript. We'll use the jQuery Terminal library (and a few other tools) to create a website that looks like a real terminal. This article will sho...",
  "link": "/freecodecamp.org/how-to-create-an-interactive-terminal-portfolio-website/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Create an Interactive Terminal Portfolio Website"
  desc="In this article, you will learn how to create an interactive terminal-based portfolio and a résumé in JavaScript. We'll use the jQuery Terminal library (and a few other tools) to create a website that looks like a real terminal. This article will sho..."
  url="https://freecodecamp.org/news/how-to-create-an-interactive-terminal-portfolio-website#heading-typing-animation-command"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1730895455049/8fefc48c-761d-4ec5-8f60-b6eb2f97a42a.png"/>

Another command that we will add is an animated joke. We will print random jokes using an API that looks like the user typing.

We will use the [<VPIcon icon="fas fa-globe"/>Joke API](https://jokeapi.dev/) for this purpose.

The API returns JSON with two types of responses: `twopart` and a `single`. This is the code that prints the text on the terminal:

```js
// we use programming jokes so it fit better
// developer portfolio
const url = 'https://v2.jokeapi.dev/joke/Programming';
const commands = {
  async joke() {
    const res = await fetch(url);
    const data = await res.json();
    if (data.type == 'twopart') {
      // as said before in every function, passed directly
      // to the terminal, you can use `this` object
      // to reference terminal instance
      this.echo(`Q: ${data.setup}`);
      this.echo(`A: ${data.delivery}`);
    } else if (data.type === 'single') {
      this.echo(data.joke);
    }
  },
}
```

To add typing animation, you need to add an option to the `echo` method:

```js
this.echo(data.joke, { delay: 50, typing: true });
```

There is one caveat: if you have a sequence of typing animations, you need to await for the previous one to finish (the echo will return a promise when animating). When creating such animation you can wrap your code with `animation` method:

```js :collapsed-lines
// we use programming jokes so it fits better
// developer portfolio
const url = 'https://v2.jokeapi.dev/joke/Programming';
const commands = {
  async joke() {
    const res = await fetch(url);
    const data = await res.json();
    if (data.type == 'twopart') {
      // this method allow to create sequence of animations
      this.animation(async () => {
        // as said before in every function, passed 
        // directly to terminal, you can use `this` object
        // to reference terminal instance
        // and since we use arrow function we reference
        // this from joke function/command
        await this.echo(`Q: ${data.setup}`, {
          delay: 50,
          typing: true
        });
        await this.echo(`A: ${data.delivery}`, {
          delay: 50,
          typing: true
        });
      });
    } else if (data.type === 'single') {
      this.echo(data.joke, {
        delay: 50,
        typing: true
      });
    }
  }
};
```

You can read more about typing animation in this article: [Typing Animation (<VPIcon icon="iconfont icon-github"/>`jcubic/jquery.terminal`)](https://github.com/jcubic/jquery.terminal/wiki/Typing-Animation#sequence-of-animations)
