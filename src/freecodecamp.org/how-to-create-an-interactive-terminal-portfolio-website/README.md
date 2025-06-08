---
lang: en-US
title: "How to Create an Interactive Terminal Portfolio Website"
description: "Article(s) > How to Create an Interactive Terminal Portfolio Website"
icon: fa-brands fa-js
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
      content: "Article(s) > How to Create an Interactive Terminal Portfolio Website"
    - property: og:description
      content: "How to Create an Interactive Terminal Portfolio Website"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-create-an-interactive-terminal-portfolio-website/
prev: /programming/js/articles/README.md
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
  "title": "jQuery > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Shell > Article(s)",
  "desc": "Article(s)",
  "link": "programming/sh/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Create an Interactive Terminal Portfolio Website"
  desc="In this article, you will learn how to create an interactive terminal-based portfolio and a résumé in JavaScript. We'll use the jQuery Terminal library (and a few other tools) to create a website that looks like a real terminal. This article will sho..."
  url="https://freecodecamp.org/news/how-to-create-an-interactive-terminal-portfolio-website"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1730895455049/8fefc48c-761d-4ec5-8f60-b6eb2f97a42a.png"/>

In this article, you will learn how to create an interactive terminal-based portfolio and a résumé in JavaScript. We'll use the [<FontIcon icon="iconfont icon-jQuery"/>jQuery Terminal library](https://terminal.jcubic.pl/) (and a few other tools) to create a website that looks like a real terminal.

This article will show more advanced usage of the jQuery Terminal library. If you want something more basic, you can check this article: [<FontIcon icon="fas fa-globe"/>How to create interactive terminal like website with JavaScript](https://itnext.io/how-to-create-interactive-terminal-like-website-888bb0972288) that is written for more entry level programmers. You can also read it (or skim it) first before you begin reading this one.

---

## Table of Contents

(1/20) [What is the terminal and its history?](#heading-what-is-the-terminal-and-its-history)
(2/20) [What is jQuery Terminal?](#heading-what-is-jquery-terminal)
(3/20) [Base html file](#heading-base-html-file)
(4/20) [How to Initialize the Terminal](#heading-how-to-initialize-the-terminal)
(5/20) [Welcome message](#heading-welcome-message)
(6/20) [Line Gaps](#heading-line-gaps)
(7/20) [How to Add Colors to ASCII Art](#heading-how-to-add-colors-to-ascii-art)
(8/20) [How to Make Your First Command](#heading-how-to-make-your-first-command)
(9/20) [Default Commands](#heading-default-commands)
(10/20) [How to Make Help Commands Executable](#heading-how-to-make-help-commands-executable)
(11/20) [Syntax Highlighting](#heading-syntax-highlighting)
(12/20) [Tab Completion](#heading-tab-completion)
(13/20) [How to Add Shell Commands](#heading-how-to-add-shell-commands)
(14/20) [How to Improve Completion](#heading-how-to-improve-completion)
(15/20) [Typing Animation Command](#heading-typing-animation-command)
(16/20) [Credits Command](#heading-credits-command)
(17/20) [Prefilled Commands](#heading-prefilled-commands)
(18/20) [Sharing Link to Terminal Session](#heading-sharing-link-to-terminal-session)
(19/20) [Working Terminal Portfolio Demo](#heading-working-terminal-portfolio-demo)
(20/20) [Adding Executables to Home Directory](#heading-adding-executables-to-home-directory)

---

## What is the terminal and its history?

Terminals have a long history. It started as an upgrade from [<FontIcon icon="fa-brands fa-wikipedia-w"/>punch cards](https://en.wikipedia.org/wiki/Punched_card). Computers back in the day used teletypes, which was just a keyboard and a printer. You'd type on the keyboard, and the keystrokes would be sent to the computer (usually mainframe) and the output got printed on a printer.

Later on, the teletypes were replaced with terminals. A terminal was like the dump computer we see today. It was a CRT Monitor with a keyboard. So instead of getting the output on the printer, it would be displayed on the monitor.

Today we still use this type of interface (the Command Line) to talk with computers.

The command line is a terminal emulator and is a big part of Unix systems, like GNU/Linux or MacOS. On Windows, you have PowerShell or cmd.exe file that allows you to type commands and get responses in the form of text. You can also install GNU/Linux system on Windows in the form of WSL. CLI interfaces are used mostly by power users, developers, and system administrators.

If you're new to the command line, you can read this article:

```component VPCard
{
  "title": "Command Line for Beginners – How to Use the Terminal Like a Pro [Full Handbook]",
  "desc": "Hi everyone! In this article we'll take a good look at the command line (also known as the CLI, console, terminal or shell). The command line is one of the most useful and efficient tools we have as developers and as computer users in general. But us...",
  "link": "/freecodecamp.org/command-line-for-beginners/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

---

## What is jQuery Terminal?

jQuery Terminal is a JavaScript library. It's a plugin for the [<FontIcon icon="fa-brands fa-wikipedia-w"/>jQuery library](https://en.wikipedia.org/wiki/JQuery). jQuery Terminal is more like a framework that has jQuery as its dependency. We'll mostly use JavaScript and very little jQuery in this article.

Let's create our terminal-based portfolio using jQuery Terminal.

### Base HTML file

The first thing you need to do is to include jQuery and jQuery Terminal library in your project.

This is a basic HTML file:

```html
<!DOCTYPE html>
<html>
  <head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/jquery.terminal/css/jquery.terminal.min.css"/>
</head>
<body>
  <script src="https://cdn.jsdelivr.net/npm/jquery"></script>
  <script src="https://cdn.jsdelivr.net/npm/jquery.terminal/js/jquery.terminal.min.js"></script>
  <script src="my-terminal.js"></script>
</body>
</html>
```

Then inside the <FontIcon icon="fa-brands fa-js"/>`my-terminal.js` file, we will write our code in JavaScript.

### How to Initialize the Terminal

To create a basic terminal, you need to put in this code:

```js
const commands = {};

const term = $('body').terminal(commands);
```

The string `'body'` indicates the CSS selector where terminal should be created. Here we use `'body'` so the terminal will be the only thing on the page. But it doesn't have to be full screen. You can create a website where the terminal is only part of the page, like in a window that looks like part of the Operating System.

The first argument to the terminal method is called an interpreter. It's a way to add your commands. An object is the simplest way to create them. See [creating the interpreter (<FontIcon icon="iconfont icon-github"/>`jcubic/jquery.terminal`)](https://github.com/jcubic/jquery.terminal/wiki/Getting-Started#creating-the-interpreter) to learn more.

If the terminal font is too small, you can make it a little bit bigger with CSS custom properties (also known as CSS variables):

```css
:root {
  --size: 1.2;
}
```

### Welcome Message

The first thing we need to do is to get rid of the default greeting message and replace it with nice-looking custom [<FontIcon icon="fa-brands fa-wikipedia-w"/>ASCII Art](https://en.wikipedia.org/wiki/ASCII_art). We will use the [<FontIcon icon="fa-brands fa-wikipedia-w"/>Filget library](https://en.wikipedia.org/wiki/FIGlet) written in JavaScript to do this.

There are a few Figlet libraries on npm. We will use a package named [<FontIcon icon="fa-brands fa-npm"/>`figlet`](https://npmjs.com/package/figlet).

The first thing you should do is pick the right font. Go to [<FontIcon icon="fas fa-globe"/>figlet playground](https://patorjk.com/software/taag/) and write the text you want for your greeting. We will use "Terminal Portfolio" and click "Test All". It should display your text with all the fonts. Scroll through the list and pick the font you like.

I picked a font "slant" that looks like this:

![Terminal Portfolio ASCII Art](https://freecodecamp.org/news/content/images/2024/04/Przechwycenie-obrazu-ekranu_2024-04-26_22-18-26.png)

You can copy this text and put into a string, but you will have issues like with the backslash that needs to be escaped using quote characters.

```js
const greetings = `  ______                    _             __   ____             __  ____      ___     
 /_  __/__  _________ ___  (_)___  ____ _/ /  / __ \____  _____/ /_/ __/___  / (_)___ 
  / / / _ \\/ ___/ __ `__ \\/ / __ \\/ __ `/ /  / /_/ / __ \\/ ___/ __/ /_/ __ \\/ / / __ \\
 / / /  __/ /  / / / / / / / / / / /_/ / /  / ____/ /_/ / /  / /_/ __/ /_/ / / / /_/ /
/_/  \___/_/  /_/ /_/ /_/_/_/ /_/\__,_/_/  /_/    \____/_/   \__/_/  \____/_/_/\____/`

const term = $('body').terminal(commands, {
    greetings
});
```

::: note

The second argument to the jQuery Terminal is an object with options – we used a single option `greetings`.

:::

This doesn't look good and it's hard to modify. Also, if you create the greeting by hardcoding a string, it may get distorted on smaller screens. That's why we will use the figlet library in JavaScript.

First, we need to include the figlet library in HTML:

```html
<script src="https://cdn.jsdelivr.net/npm/figlet/lib/figlet.js"></script>
```

To initialize the library in JavaScript, we need to load the fonts:

```js
const font = 'Slant';

figlet.defaults({ fontPath: 'https://unpkg.com/figlet/fonts/' });
figlet.preloadFonts([font], ready);
```

This code will load the `'Slant'` font and call the function `ready` when the font is loaded.

So we need to write this function:

```js
function ready() {

}
```

Now we can do two things, we can put the initialization of jQuery Terminal inside that function:

```js
let term;

function ready() {
  term =  $('body').terminal(commands, {
    greetings
  });
}
```

With this, we can use the `greeting` option. But we can also use the `echo` method to render the greeting, and when initializing the terminal we will put `null` or `false` as a `greetings` to disable the default one:

```js
const term = $('body').terminal(commands, {
  greetings: false
});

function ready() {
  term.echo(greetings);
}
```

This will work better because the library will initialize the terminal immediately and will not need to wait for loading the fonts.

Note that we still need to define the greetings using figlet. To do this we can write this function:

```js
function render(text) {
  const cols = term.cols();
  return figlet.textSync(text, {
    font: font,
    width: cols,
    whitespaceBreak: true
  });
}
```

This function uses the `figlet::textSync()` method to return a string and use `terminal::cols()`, to get the number of characters per line. With this, we can make our text responsive.

This function can be used inside `ready`.

```js
function ready() {
  term.echo(render('Terminal Portfolio'));
}
```

This will create a string and pass it to the `echo` method. But this will be the same as with:

```js
term.echo(greeting);
```

And our hard-coded greetings. So if you resize the terminal, the greetings can still get distorted. To make the text responsive, you need to `echo` a function. This function will be called on each re-render of the terminal, which will happen when you resize the page.

We can use the arrow function for this:

```js
function ready() {
  term.echo(() => render('Terminal Portfolio'));
}
```

If you want to add some text below the ASCII art, you can do this by concatenating the string after render:

```js
function ready() {
  term.echo(() => {
    const ascii = render('Terminal Portfolio');
    return `${ascii}\nWelcome to my Terminal Portfolio\n`;
  });
}
```

::: note

If you run this code, you will notice that there is an empty line after the ASCII art. This is because the figlet library adds some spaces after the text.

To get rid of this, you can use `string::replace()` with a regular expression that will remove all spaces and newlines from the end.

:::

We can't use `string::trim()`, because we don't want to remove the leading lines:

```js
function render(text) {
  const cols = term.cols();
  return trim(figlet.textSync(text, {
     font: font,
     width: cols,
     whitespaceBreak: true
  }));
}

function trim(str) {
  return str.replace(/[\n\s]+$/, '');
}
```

You can also pause the terminal when it loads the fonts:

```js
const term = $('body').terminal(commands, {
  greetings: false
});

term.pause();

function ready() {
  term.echo(() => render('Terminal Portfolio')).resume();
}
```

You can can chain terminal methods, the same as with jQuery.

### Line Gaps

If the font you pick creates gaps between the lines, like in this image with font ANSI Shadow:

![Image: ASCII Art with line gaps](https://freecodecamp.org/news/content/images/2024/05/Przechwycenie-obrazu-ekranu_2024-05-08_14-06-41.png)

You can remove the gaps by adding the `ansi` option set to `true`. The option was added specifically to fix an issue with displaying [<FontIcon icon="fa-brands fa-wikipedia-w"/>ANSI Art](https://en.wikipedia.org/wiki/ANSI_art).

```js
term.echo(() => render('Terminal Portfolio'), { ansi: true });
```

The above ASCII Art will look like this:

![Image: ASCII Art with gaps removed](https://freecodecamp.org/news/content/images/2024/05/Przechwycenie-obrazu-ekranu_2024-05-08_14-57-16.png)

---

## How to Add Colors to ASCII Art

You can spice up your ASCII Art by using a library called lolcat. lolcat is a Linux command that can style text in the terminal with rainbow colors. There is also a library called [<FontIcon icon="fa-brands fa-npm"/>`isomorphic-lolcat`](https://npmjs.com/package/isomorphic-lolcat), that you can use in JavaScript to make your ASCII Art in rainbow colors.

### Terminal Formatting

To use the lolcat library, you first need to know how to change the colors of the terminal.

You can do this using low-level formatting that looks like this:

```lisp
[[b;red;]some text]
```

The whole text is wrapped in brackets and the formatting of the text is in additional brackets, where each argument is separated by a semicolon. To learn more about the syntax, you can read the Wiki Article: [Formatting and Syntax Highlighting (<FontIcon icon="iconfont icon-github"/>`jcubic/jquery.terminal`)](https://github.com/jcubic/jquery.terminal/wiki/Formatting-and-Syntax-Highlighting).

Here, we'll only use a basic change of color. Instead of red, you can use CSS color names, hex color, or `rgb()`.

### How to Use the Lolcat Library

To use the library, we first need to include it in HTML:

```html
<script src="https://cdn.jsdelivr.net/npm/isomorphic-lolcat"></script>
```

To format the string with colors, we can use this function:

```js
function rainbow(string) {
  return lolcat.rainbow(function(char, color) {
    char = $.terminal.escape_brackets(char);
    return `[[;${hex(color)};]${char}]`;
  }, string).join('\n');
}

function hex(color) {
  return '#' + [color.red, color.green, color.blue].map(n => {
    return n.toString(16).padStart(2, '0');
  }).join('');
}
```

The `lolcat.rainbow` will call a function in every character from the input string, and pass color as an object with RGB values and the character.

### Rainbow ASCII Art Greetings

To use this code, you need to wrap the call to render with `rainbow`:

```js
function ready() {
  term.echo(() => {
    const ascii = rainbow(render('Terminal Portfolio'));
    return `${ascii}\nWelcome to my Terminal Portfolio\n`;
  }).resume();
}
```

You can also use two calls to echo, since only the Figlet message needs to be executed inside the function:

```js
function ready() {
  term.echo(() => rainbow(render('Terminal Portfolio')))
    .echo('Welcome to my Terminal Portfolio\n').resume();
}
```

You'll notice that when you resize the window, the rainbow changes randomly. This is the default behavior of lolcat. To change it, you need to set the [<FontIcon icon="fa-brands fa-wikipedia-w"/>random seed](https://en.wikipedia.org/wiki/Random_seed).

```js
function rand(max) {
  return Math.floor(Math.random() * (max + 1));
}

function ready() {
  const seed = rand(256);
  term.echo(() => rainbow(render('Terminal Portfolio'), seed))
    .echo('Welcome to my Terminal Portfolio\n').resume();
}

function rainbow(string, seed) {
    return lolcat.rainbow(function(char, color) {
        char = $.terminal.escape_brackets(char);
        return `[[;${hex(color)};]${char}]`;
    }, string, seed).join('\n');
}
```

The `rand` function returns a pseudo-random number from 0 to max value. Here we created a random value from 0 to 256. ### How to Make the Greeting Text White

As we showed previously, you can make the text white with terminal formatting. You can use:

- `[[;white;]Welcome to my Terminal Portfolio]`
- `[[;#fff;]Welcome to my Terminal Portfolio]`
- `[[;rgb(255,255,255);]Welcome to my Terminal Portfolio]`

Moreover, if you include additional file XML formatting, you can use XML-like syntax. That makes formatting much easier.

```html
<script src="https://cdn.jsdelivr.net/npm/jquery.terminal/js/xml_formatting.js"></script>
```

After including the above file in HTML, you can use CSS named colors as XML tags:

```xml
<white>Welcome to my Terminal Portfolio</white>
```

The XML formatting supports more tags like links and images. See [Extension XML Formatter (<FontIcon icon="iconfont icon-github"/>`jcubic/jquery.terminal`)](https://github.com/jcubic/jquery.terminal/wiki/Formatting-and-Syntax-Highlighting#extension-xml-formatter) for more info.

::: note

XML formatter is a function added to `$.terminal.defaults.formatters`, which transforms the input XML-like text into terminal formatting. You can add the same to your own formatters.

:::

---

## How to Make Your First Command

After the greeting, we can write our first command. It will be helpful and will work with any commands we add later.

```js
const commanns = {
  help() {

  }
};
```

This will be our help command where we'll add a list of commands available to our terminal portfolio. We will use [<FontIcon icon="fa-brands fa-firefox"/>`Intl.ListFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/ListFormat), which creates a list of elements with and before the last element.

```js
const formatter = new Intl.ListFormat('en', {
  style: 'long',
  type: 'conjunction',
});
```

To create a list, we need to use `formatter.format()` and pass an array of commands. To get that array we can use `Object.keys()`:

```js
const commands = {
  help() {
    term.echo(`List of available commands: ${help}`);
  }
};

const command_list = Object.keys(commands);
const help = formatter.format(command_list);
```

When you type help you should see:

```plaintext title="output"
List of available commands: help
```

You also need to add the `echo` command:

```js
const commands = {
  help() {
    term.echo(`List of available commands: ${help}`);
  },
  echo(...args) {
    term.echo(args.join(' '));
  }
};
```

Now the help command works:

```plaintext title="output"
List of available commands: help and echo
```

But if you try to execute 'echo hello' you will get an error:

```plaintext title="output"
[Arity] Wrong number of arguments. The function 'echo' expects 0 got 1!
```

By default, jQuery Terminal checks the number of arguments and the number of parameters the function accepts. The problem is that the `rest` operator makes all arguments optional and the length function property is 0. To fix the issue we need to disable the `Arity` check with an option:

```js
const term = $('body').terminal(commands, {
  greetings: false,
  checkArity: false
});
```

Now the echo commands should work.

---

## Default Commands

By default, the jQuery Terminal has two default commands:

- `clear`: this command clears everything on the terminal.
- `exit`: this command exits from nested interpreters.

You can disable them by passing the name to the option and setting it to false. Since we won't use nested interpreters, we can disable `exit`:

```js
const term = $('body').terminal(commands, {
    greetings: false,
    checkArity: false,
    exit: false
});
```

But `clear` can be useful. So we can add it to the list of commands:

```js
const command_list = ['clear'].concat(Object.keys(commands));
```

---

## How to Make Help Commands Executable

We can make the UX better to allow clicking on the command and execute it just like when the user types it.

We will need a few things to do this. First, we need to add formatting to each command and add an HTML class attribute. We can also make the command white so it's more visible.

```js
const command_list = Object.keys(commands);
const formatted_list = command_list.map(cmd => {
  return `<white class="command">${cmd}</white>`;
});
const help = formatter.format(formatted_list);
```

Next is to add [<FontIcon icon="fa-brands fa-wikipedia-w"/>affordance](https://en.wikipedia.org/wiki/Affordance). To indicate that the user can click the command, we need to change the cursor in CSS:

```css
.command {
  cursor: pointer;
}
```

The last step is to execute the command when the user clicks the command. We need to add an event handler with jQuery (jQuery Terminal dependency) or we can use the native browser [<FontIcon icon="fa-brands fa-firefox"/>`addEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener). Here we use jQuery:

```js
term.on('click', '.command', function() {
  const command = $(this).text();
  term.exec(command);
});
```

`terminal::exec()` is a way to execute a command programmatically, just like user would type it and press enter.

You can test it by typing `help` and clicking `help` again.

Clicking `echo` will print an empty line. We can fix it by checking if the array of arguments is not empty, before executing `terminal::echo()`:

```js
const commands = {
  echo(...args) {
    if (args.length > 0) {
      term.echo(args.join(' '));
    }
  }
};
```

Now clicking on `echo` will only show the executed command.

::: note

If for any reason you don't want to show the prompt and the command that has been executed, you can silence the `exec` by passing `true` as the second argument.

```js
term.exec('help', true);
```

:::

---

## Syntax Highlighting

As we discussed earlier, we can use custom syntax highlighting of our shell by pushing a function into `$.terminal.defaults.formatters`.We can also use the `$.terminal.new_formatter` helper function.

Let's make our commands white as we type them. The formatter can be an array (of regex and replacement), or a function. We have a fixed number of commands and we only want to make those that are on the list white. We can do this by adding a regular expression:

```js
const any_command_re = new RegExp(`^\s*(${command_list.join('|')})`);
```

This regular expression will check if, at the beginning of the string, there is an optional whitespace and one of the commands. Right now the regex will look like this: `/^\s*(help|echo)/`. This is how to create new formatter:

```js
$.terminal.new_formatter([any_command_re, '<white>$1</white>']);
```

If you would like to make command arguments in different colors, you'll need a function, where you will use [<FontIcon icon="fa-brands fa-firefox"/>`String::replace()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace).

```js
const re = new RegExp(`^\s*(${command_list.join('|')}) (.*)`);

$.terminal.new_formatter(function(string) {
  return string.replace(re, function(_, command, args) {
    return `<white>${command}</white> <aqua>${args}</aqua>`;
  });
});
```

This is just an example of using `String::replace`. If you have just one replacement, you can use an array. This will be the same:

```js
const re = new RegExp(`^\s*(${command_list.join('|')})(\s?.*)`);

$.terminal.new_formatter([re, function(_, command, args) {
  return `<white>${command}</white><aqua>${args}</aqua>`;
}]);
```

::: note

If you add the class `<white class="command">` to the formatter, you will be able to click on the typed command to execute it again.

:::

---

## Tab Completion

Another feature we can add is to complete the command when you press the tab key. This is super easy – we only need to add the completion option set to true:

```js
const term = $('body').terminal(commands, {
  greetings: false,
  checkArity: false,
  exit: false,
  completion: true
});
```

Now when you type `h` and press tab, it will complete the command `help` for you.

---

## How to Add Shell Commands

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

---

## How to Improve Completion

Our completion is not perfect as it only completes the commands. If you'd like to have completion that also handles directories, you need to use a function:

```js
const term = $('body').terminal(commands, {
  greetings: false,
  checkArity: false,
  completion(string) {
    // in every function we can use `this` to reference term object
    const cmd = this.get_command();
    // we process the command to extract the command name
    // and the rest of the command (the arguments as one string)
    const { name, rest } = $.terminal.parse_command(cmd);
    if (['cd', 'ls'].includes(name)) {
      if (rest.startsWith('~/')) {
        return dirs.map(dir => `~/${dir}`);
      }
      if (rest.startsWith('../') && cwd != root) {
        return dirs.map(dir => `../${dir}`);
      }
      if (cwd === root) {
        return dirs;
      }
    }
    return Object.keys(commands);
  },
  prompt
});
```

::: note

The string argument was left as documentation. It can be used if you only want to complete a single word.

:::

---

## Typing Animation Command

Another command that we will add is an animated joke. We will print random jokes using an API that looks like the user typing.

We will use the [<FontIcon icon="fas fa-globe"/>Joke API](https://jokeapi.dev/) for this purpose.

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

You can read more about typing animation in this article: [Typing Animation (<FontIcon icon="iconfont icon-github"/>`jcubic/jquery.terminal`)](https://github.com/jcubic/jquery.terminal/wiki/Typing-Animation)[.](https://github.com/jcubic/jquery.terminal/wiki/Typing-Animation#sequence-of-animations)

---

## Credits Command

The last command we will add is a credits command where we will list the JavaScript libraries we used:

```js
const commands = {
  credits() {
    return [
      '',
      '<white>Used libraries:</white>',
      '* <a href="https://terminal.jcubic.pl">jQuery Terminal</a>',
      '* <a href="https://github.com/patorjk/figlet.js/">Figlet.js</a>',
      '* <a href="https://github.com/jcubic/isomorphic-lolcat">Isomorphic Lolcat</a>',
      '* <a href="https://jokeapi.dev/">Joke API</a>',
      ''
    ].join('\n');
  }
};
```

This is an example of another way to print something on the terminal – if you return something from a function it will be printed. You can also return a [**Promise**](/freecodecamp.org/javascript-promises-explained.md), so you can send an [<FontIcon icon="fa-brands fa-wikipedia-w"/>AJAX](https://en.wikipedia.org/wiki/Ajax_\(programming\)) request to the server and print the results.

---

## Prefilled Commands

You can make it easier for users to know what to do with the terminal, especially if they are not that familiar with Unix. You can do this by executing example commands:

```js
term.exec(command)
```

You can also use animation with `exec`:

```js
term.exec(command, { typing: true, delay: 50 });
```

---

## Sharing Link to Terminal Session

Another cool thing that I will show you is recording commands in the URL. You can create whole terminal session and save it in a [<FontIcon icon="fa-brands fa-firefox"/>URL hash](https://developer.mozilla.org/en-US/docs/Web/API/URL/hash). To start recoding a session you need to execute the following:

```js
term.history_state(true);
```

When you execute the command `echo x`, it should create a URL hash that looks like this: `#[[0,1,"echo%20x"]]`.

To stop recording, you can use:

```js
term.history_state(false);
```

You can write this into a command `record start | stop`, so it will be easier to record sessions.

The last thing to do to restore the session is to use the option `execHash: true`.

```js
const term = $('body').terminal(commands, {
  /* rest of the options */
  execHash: true
});
```

When you do this and refresh the page, while having the URL hash with the session, it should replay the session and you should see same output as you did when you recorded it.

If you want the `exec` to be animated you can use this option:

```js
const term = $('body').terminal(commands, {
  /* rest of the options */
  execHash: true,
  execAnimation: true
});
```

To share the link, it’s better to use a URL shortener like [<FontIcon icon="fas fa-globe"/>TinyURL](https://tinyurl.com/). Make sure you test the shortened URL to see if it works.

---

## How to Add Executables to the Home Directory

Another thing you can do to improve the portfolio is to help your visitor learn what commands they can use, by introducing executable when running ls. They will look like binaries on the Linux system.

```js
// not every command needs to be binary
// we picked those three that works more like real programs
const files = [
  'joke',
  'credits',
  'record'
];

function print_home() {
  term.echo(dirs.map(dir => {
    return `<blue class="directory">${dir}</blue>`;
  }).join('\n'));
  term.echo(files.map(file => {
    return `<green class="command">${file}</green>`;
  }).join('\n'));
}
```

With this, you will be able to click the command and execute it. So your visitors will know that they can run `joke` command without the need to type `help` command. For this to work, we need one last change, adding class to the green XML tag:

```js
$.terminal.xml_formatter.tags.green = (attrs) => {
  return `[[;#44D544;;${attrs.class}]`;
};
```

---

## Working Terminal Portfolio Demo

Here is a fully working Demo of our [Interactive Terminal Portfolio Website (<FontIcon icon="fa-brands fa-codepen"/>`jcubic`)](https://codepen.io/jcubic/full/ZEZPWRY).

---

## What Next?

You can add a lot of commands to this portfolio. The only limitation is your imagination.

You can check these examples for inspiration:

```component VPCard
{
  "title": "jQuery Terminal Demos - a Collection by  Jakub T. Jankiewicz on CodePen",
  "desc": "This is a list of various jQuery Terminal demos I've created over time.",
  "link": "https://codepen.io/collection/LPjoaW/",
  "logo": "https://cpwebassets.codepen.io/assets/favicon/favicon-aec34940fbc1a6e787974dcd360f2c6b63348d4b1f4e06c77743096d55480f33.ico",
  "background": "rgba(71,207,115,0.2)"
}
```

<CodePen
  user="jcubic"
  slug-hash="BwBYOZ"
  title="Vintage (Retro) Fake Terminal Emulator in JavaScript"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

<SiteInfo
  name="Examples for jQuery Terminal plugin"
  desc="jQuery plugin for Command Line applications. Automatic JSON-RPC, custom object or a function. History, Authentication, Bash Shortcuts. Tab completion."
  url="https://terminal.jcubic.pl/examples.php/"
  logo="https://terminal.jcubic.pl/favicon.ico"
  preview="https://terminal.jcubic.pl/signature.png"/>

```component VPCard
{
  "title": "Fake Linux Terminal - Online Simulator",
  "desc": "This is example of using jQuery Terminal Emulator to create Fake Linux System. It's work in progress. Check GitHub Repo for more information.",
  "link": "https://fake.terminal.jcubic.pl//",
  "logo": "",
  "background": "rgba(10,10,10,0.2)"
}
```

If you have an idea that is not listed here, you can ask on [<FontIcon icon="fa-brands fa-stack-overflow"/>StackOverflow with jquery-terminal tag](https://stackoverflow.com/questions/tagged/jquery-terminal). If you have something more time consuming, you can also ask for [<FontIcon icon="fas fa-globe"/>paid support](https://support.jcubic.pl/).

::: info Share what you’ve created

If you create a cool terminal portfolio, you can [share it and tag me on Twitter (<FontIcon icon="fa-brands fa-x-twitter"/>`jcubic`)](http://x.com/jcubic). I would love to take a look. Especially if you create something more than what’s included in the tutorial. You can also share on a [<FontIcon icon="fas fa-globe"/>terminal chat on my website](https://jcu.bi/chat) (it’s a similar terminal portfolio, but with chat).

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Create an Interactive Terminal Portfolio Website",
  "desc": "In this article, you will learn how to create an interactive terminal-based portfolio and a résumé in JavaScript. We'll use the jQuery Terminal library (and a few other tools) to create a website that looks like a real terminal. This article will sho...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-create-an-interactive-terminal-portfolio-website.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
