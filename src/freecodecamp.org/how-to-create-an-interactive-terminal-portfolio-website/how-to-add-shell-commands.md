---
lang: en-US
title: "How to Add Shell Commands"
description: "Article(s) > (13/19) How to Create an Interactive Terminal Portfolio Website" 
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
      content: "Article(s) > (13/19) How to Create an Interactive Terminal Portfolio Website"
    - property: og:description
      content: "How to Add Shell Commands"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-create-an-interactive-terminal-portfolio-website/how-to-add-shell-commands.html
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
  url="https://freecodecamp.org/news/how-to-create-an-interactive-terminal-portfolio-website#heading-how-to-add-shell-commands"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1730895455049/8fefc48c-761d-4ec5-8f60-b6eb2f97a42a.png"/>

Now we can add the most important commands that allow us to navigate through the portfolio. We will implement directories as the main entry point so the user will need to type the `ls` command to see a list of things, `cd` into that directory, and `ls` again to see the contents.

```js :collapsed-lines
const directories = {
  education: [
    '',
    '<white>education</white>',

    '* <a href="https://en.wikipedia.org/wiki/Kielce_University_of_Technology">Kielce University of Technology</a> <yellow>"Computer Science"</yellow> 2002-2007 / 2011-2014',
    '* <a href="https://pl.wikipedia.org/wiki/Szko%C5%82a_policealna">Post-secondary</a> Electronic School <yellow>"Computer Systems"</yellow> 2000-2002',
    '* Electronic <a href="https://en.wikipedia.org/wiki/Technikum_(Polish_education)">Technikum</a> with major <yellow>"RTV"</yellow> 1995-2000',
    ''
  ],
  projects: [
    '',
    '<white>Open Source projects</white>',
    [
       [
        'jQuery Terminal',
        'https://terminal.jcubic.pl',
        'library that adds terminal interface to websites'
       ], [
        'LIPS Scheme',
        'https://lips.js.org',
        'Scheme implementation in JavaScript'
       ], [
        'Sysend.js',
        'https://jcu.bi/sysend',
        'Communication between open tabs'
       ], [
        'Wayne',
        'https://jcu.bi/wayne',
        'Pure in browser HTTP requests'
       ],
    ].map(([name, url, description = '']) => {
      return `* <a href="${url}">${name}</a> &mdash; <white>${description}</white>`;
    }),
    ''
  ].flat(),
  skills: [
    '',
    '<white>languages</white>',
    [
      'JavaScript',
      'TypeScript',
      'Python',
      'SQL',
      'PHP',
      'Bash'
    ].map(lang => `* <yellow>${lang}</yellow>`),
      '',
      '<white>libraries</white>',
    [
      'React.js',
      'Redux',
      'Jest',
    ].map(lib => `* <green>${lib}</green>`),
      '',
      '<white>tools</white>',
      [
        'Docker',
        'git',
        'GNU/Linux'
      ].map(lib => `* <blue>${lib}</blue>`),
      ''
  ].flat()
};
```

This is our basic structure. You can edit it and add your own information. First, we will add a `cd` command that changes the directory.

```js
const root = '~';
let cwd = root;

const commands = {
  cd(dir = null) {
    if (dir === null || (dir === '..' && cwd !== root)) {
        cwd = root;
    } else if (dir.startsWith('~/') && dirs.includes(dir.substring(2))) {
        cwd = dir;
    } else if (dir.startsWith('../') && cwd !== root &&
               dirs.includes(dir.substring(3))) {
        cwd = root + '/' + dir.substring(3);
    } else if (dirs.includes(dir)) {
        cwd = root + '/' + dir;
    } else {
        this.error('Wrong directory');
    }
  }
};
```

This will handle all the cases of changing the directory. Next is to add a prompt.

To see what directory we are in, we need to add a custom `prompt`. We can create a function as a `prompt` option:

```js
const user = 'guest';
const server = 'freecodecamp.org';

function prompt() {
  return `<green>${user}@${server}</green>:<blue>${cwd}</blue>$ `;
}
```

And use it as an option:

```js
const term = $('body').terminal(commands, {
  greetings: false,
  checkArity: false,
  completion: true,
  exit: false,
  prompt
});
```

The green color don't look very good, so we can use a color from Ubuntu to make the terminal look more real. We can overwrite the default XML color tags like this:

```js
$.terminal.xml_formatter.tags.green = () => {
  return `[[;#44D544;]`;
};
```

Next is the `ls` command.

```js :collapsed-lines
function print_home() {
  term.echo(dirs.map(dir => {
    return `<blue class="directory">${dir}</blue>`;
  }).join('\n'));
}

const commands = {
  ls(dir = null) {
    if (dir) {
      if (dir.match(/^~\/?$/)) {
        // ls ~ or ls ~/
        print_home();
      } else if (dir.startsWith('~/')) {
        const path = dir.substring(2);
        const dirs = path.split('/');
        if (dirs.length > 1) {
          this.error('Invalid directory');
        } else {
          const dir = dirs[0];
          this.echo(directories[dir].join('\n'));
        }
      } else if (cwd === root) {
        if (dir in directories) {
          this.echo(directories[dir].join('\n'));
        } else {
          this.error('Invalid directory');
        }
      } else if (dir === '..') {
        print_home();
      } else {
        this.error('Invalid directory');
      }
    } else if (cwd === root) {
      print_home();
    } else {
      const dir = cwd.substring(2);
      this.echo(directories[dir].join('\n'));
    }
  }
};
```

Similar to the green we had before, the blue color is not that great. So we can use the color from Ubuntu again. To do this, we need to use the same custom XML tags for the color blue:

```js
$.terminal.xml_formatter.tags.blue = (attrs) => {
  return `[[;#55F;;${attrs.class}]`;
};
```

We added the HTML class for a reason. Let's change directory when the user clicks the directory. Just like we did with commands, we can invoke the `cd` command the same way as as a user would type it.

```js
term.on('click', '.directory', function() {
  const dir = $(this).text();
  term.exec(`cd ~/${dir}`);
});
```

::: note

if you have long command and want to get the text for that command, it's better to use: `$(this).data('text')`. When the single formatting is wrapped (when text is longer than the width of the terminal) the `.text()` will no longer have full text, but the full text is always in the `data-text` HTML attribute.

:::

We also need to update our CSS to change the cursor:

```css
.command, .directory {
    cursor: pointer;
}
```
