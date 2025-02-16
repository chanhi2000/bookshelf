---
lang: en-US
title: "A Complete Guide to Beginning with JavaScript"
description: "Article(s) > A Complete Guide to Beginning with JavaScript"
icon: fa-brands fa-js
category:
  - JavaScript
  - Article(s)
tag:
  - blog
  - frontendmasters.com
  - js
  - javascript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > A Complete Guide to Beginning with JavaScript"
    - property: og:description
      content: "A Complete Guide to Beginning with JavaScript"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/a-complete-guide-to-beginning-with-javascript.html
prev: /programming/js/articles/README.md
date: 2024-09-04
isOriginal: false
author: Cody Lindley
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/3539
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "JavaScript > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="A Complete Guide to Beginning with JavaScript"
  desc="This guide serves as an introduction to learning JavaScript, covering necessary prerequisite knowledge and addressing common obstacles. It highlights JavaScript’s origins, essential concepts, and practical applications across different environments."
  url="https://frontendmasters.com/blog/a-complete-guide-to-beginning-with-javascript/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/3539"/>

This guide is not itself the means to learn JavaScript. This guide addresses issues around getting started (obstacles, preliminary knowledge, etc.) and then points you to curated resources to start learning.

Consider this material a prologue or an introduction to the learning process itself so, you have the needed background and context before beginning the learning process.

::: info Required Prerequisite Knowledge

The list below entails the knowledge required before attempting to learn JavaScript:

- A necessary step to learning any programming language is first to understand how [<FontIcon icon="fa-brands fa-firefox"/>computer programming languages](https://developer.mozilla.org/en-US/docs/Glossary/computer_programming) work in general (i.e., the conceptual mechanics of any programming language). We’ve yet to find a better book for this than “[<FontIcon icon="fa-brands fa-amazon"/>How Computer Programming Works](https://amazon.com/gp/product/1893115232?ie=UTF8&SubscriptionId=1MGPYB6YW3HWK55XCGG2&linkCode=ll1&tag=frontendma0da-20&linkId=0dbce68cc369c480aca733198727ec06&language=en_US&ref_=as_li_ss_tl)” by Daniel Appleman. The book is old, and the language used isn’t JavaScript, but the mechanics it teaches are relevant to all languages. If you prefer to learn by instruction and want a lot more details, look at the [<FontIcon icon="fas fa-globe"/>Crash Course on Computer Science](https://thecrashcourse.com/topic/computerscience/) (episodes: #11, #12, #13, #14, #16).
- A basic understanding of the [<FontIcon icon="fas fa-globe"/>internet](https://internetfundamentals.com/), web browsers, [<FontIcon icon="fas fa-globe"/>HTML](https://frontendmasters.com/bootcamp/introduction-html/) (i.e. web pages), and [<FontIcon icon="fas fa-globe"/>CSS](https://frontendmasters.com/bootcamp/introduction-css/).
- A basic understanding of a [<FontIcon icon="fa-brands fa-wikipedia-w"/>command line interface](https://en.wikipedia.org/wiki/Command-line_interface) (see [<FontIcon icon="fas fa-globe"/>Crash Course #22](https://thecrashcourse.com/courses/keyboards-command-line-interfaces-crash-course-computer-science-22/)) and a [<FontIcon icon="fa-brands fa-wikipedia-w"/>graphical user interface](https://en.wikipedia.org/wiki/Graphical_user_interface) (see [<FontIcon icon="fas fa-globe"/>Crash Course #26](https://thecrashcourse.com/courses/graphical-user-interfaces-crash-course-computer-science-26/)).

:::

---

## Helpful Background

- In 1995 a programming language, which we call JavaScript today, was written in ten days and embedded into the Netscape web browser (i.e., a host environment) to validate user inputted data into HTML forms. That is the origin story of JavaScript in a nutshell. Fast forward 27 years, and today it is the most used programming language in the world and is not limited to web browser runtimes. JavaScript, today is used almost anywhere a programmer can prefer it. From the front-end (e.g., [<FontIcon icon="fa-brands fa-react"/>React](https://react.dev/)) and back-end (e.g., [<FontIcon icon="iconfont icon-expressjs"/>Express](http://expressjs.com/)) of a web application, to command CLI tools (e.g., [ESlint](https://eslint.org/)), to a database (e.g., [<FontIcon icon="iconfont icon-mongodb"/>MongoDB](https://mongodb.com/)). JavaScript is everywhere, and professionals and as well as novices use it.
- JavaScript is a [<FontIcon icon="fa-brands fa-wikipedia-w"/>scripted programming language](https://en.wikipedia.org/wiki/Scripting_language). It typically is found in a “host environment” where a programing language is required for scripting or programming something using an application programming interface (aka APIs). In the context of web browsers, [<FontIcon icon="fa-brands fa-firefox"/>JavaScript works along](https://developer.mozilla.org/en-US/docs/Web/JavaScript/JavaScript_technologies_overview#introduction) with web APIs like the [<FontIcon icon="fa-brands fa-firefox"/>BOM](https://developer.mozilla.org/en-US/docs/Web/API/Window) (i.e., Browser Object Model), [<FontIcon icon="fa-brands fa-firefox"/>DOM (i.e., Document Object Model)](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model), and [<FontIcon icon="fa-brands fa-firefox"/>CSSOM (i.e., CSS Object Model)](https://developer.mozilla.org/en-US/docs/Web/API/CSS_Object_Model)to script or program web browsers and web pages. In the context of [<FontIcon icon="fa-brands fa-node"/>Node.js](https://nodejs.org/en), JavaScript is the language used to produce applications and tools using Node.js APIs.
- [<FontIcon icon="fa-brands fa-wikipedia-w"/>JavaScript requires an engine to execute JavaScript source code](https://en.wikipedia.org/wiki/JavaScript_engine). JavaScript is written using a text/code editor and then fed into an [<FontIcon icon="fa-brands fa-wikipedia-w"/>ECMAScript engine](https://en.wikipedia.org/wiki/JavaScript_engine) to be run/executed in the context of a host environment. The two most common host environments are a web browser and Node.js. The most well-known engine is [V8](https://v8.dev/). The V8 engine is the engine used by the Edge and Chrome web browsers as well as Node.js.
- [<FontIcon icon="fas fa-globe"/>JavaScript has undergone two historically significant](https://exploringjs.com/impatient-js/ch_history.html#timeline-of-ecmascript-versions) language changes. The first occurred in 2009 when ES5 was released, and the second occurred in 2015 when ES6 was released (Note: ES6 today is called “ES2015”). I’m not going to list the language changes because, as of 2022, the details are not as important as they once were. Just beware that ES3 to ES5 and ES5 to ES6 was when the two most significant changes to the language occurred.
- Today [small incremental changes to the JavaScript language occur yearly (<FontIcon icon="iconfont icon-github"/>`tc39/proposals`)](https://github.com/tc39/proposals/blob/HEAD/finished-proposals.md). Before 2015 changes to the language [<FontIcon icon="fas fa-globe"/>were sparse and often separated by several years](https://exploringjs.com/impatient-js/ch_history.html#timeline-of-ecmascript-versions). The name/label given to these yearly changes is ES2015, ES2016, ES2017, ES2018, etc. This year, the language will have a set of changes known as ES2022. ---

---

## Getting Started Obstacles

- Once upon a time, some perceived JavaScript as an inferior programming language for professional endeavors. While this is no longer the case today, you might still encounter this notion. One can mostly ignore this opinion as of today, given JavaScript is used in a wide variety of professional contexts today.
- Newbies and even some veterans of the JavaScript language don’t realize that the word “JavaScript” is interchangeable with “ECMAScript.” JavaScript is the commercial name for ECMAScript and a historical relic. The actual name of the programming language in use today is ECMAScript. Anytime you hear JavaScript, you can mentally replace it with “ECMAScript.” ECMAScript is the programming language used by [<FontIcon icon="fas fa-globe"/>ECMAScript engines like V8](https://v8.dev/docs/feature-launch-process). Consider that the module format used in JavaScript is called “ECMAScript Modules,” also known as “ES Modules” or “ESM.” And, consider that if you want to know which language features are available in a web browser or Node.js, you have to review which [<FontIcon icon="fas fa-globe"/>ECMAScript specification is supported by the engine](https://kangax.github.io/compat-table/es2016plus/) (e.g., ES3, ES5, ES6, ES2015 thru ES2023). As you learn JavaScript, be aware that the core language, commonly called “JavaScript,” is technically not “JavaScript”; it is ECMAScript. Knowing this will elevate several layers of indirection as you learn about the language.
- You will be sorely disappointed if you think you can learn programming or JavaScript by reading the [<FontIcon icon="fas fa-globe"/>ECMAScript specification](https://262.ecma-international.org/). The ECMAScript specification does not exist with the intent of being a resource for learning programming or JavaScript. The ECMAScript specification defines the language details for engineers building an ECMAScript engine (e.g., V8). At times, however, advanced JavaScript programmers might [<FontIcon icon="fas fa-globe"/>read up on the rules of the language by reading the language specification](https://timothygu.me/es-howto/). Regardless, you should know that the document is not written as a learning resource but to help engine authors develop JavaScript engines.
- Focus on the language, alone, at first! Learning JavaScript does not have to come with the overhead of understanding the host environments in which JavaScript runs, regardless of what millions of tutorials on the web directly and indirectly assert. Learning JavaScript is more accessible when [<FontIcon icon="fa-brands fa-firefox"/>first focusing on the language and ignoring the runtimes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/JavaScript_technologies_overview#javascript_the_core_language_ecmascript). If you are new to programming, focus on the language, not web or Node.js APIs (Yes, you’ll need to know enough about a JavaScript runtime to run JavaScript. But learn enough to run JavaScript and then focus on the language).
- JavaScript is not a [<FontIcon icon="fa-brands fa-wikipedia-w"/>strongly typed](https://en.wikipedia.org/wiki/Strong_and_weak_typing) language. It is a [<FontIcon icon="fa-brands fa-wikipedia-w"/>loosely typed](https://en.wikipedia.org/wiki/Strong_and_weak_typing) language. I’m not going to get into what this means because if you are reading this guide, this distinction will either be lost on you or cause noise. [<FontIcon icon="iconfont icon-typescript"/>TypeScript](https://typescriptlang.org/) exists to add a non-native strongly typed syntax to JavaScript. If you are new to programming and coming to JavaScript without programming experience, don’t learn TypeScript before learning JavaScript. Resist the urge to jump on the TypeScript bandwagon until you have an informed and experienced reason, which comes from knowing JavaScript first.
- You’ll bump up against JavaScript compilers sooner than later while learning JavaScript. [<FontIcon icon="iconfont icon-babel"/>Babel](https://babeljs.io/), [<FontIcon icon="iconfont icon-typescript"/>Typescript](https://typescriptlang.org/), [SWC](https://swc.rs/), and [Surcase](https://github.com/alangpierce/sucrase#sucrase/) all take ECMAScript and even TypeScript and compile it to a backward-compatible version of JavaScript (e.g. ES2022 to ES3). Using a compiler before understanding why you need one can be problematic. Don’t compile JavaScript until you know why you are compiling.
- JavaScript had no [<FontIcon icon="fa-brands fa-wikipedia-w"/>built-in module mechanism](https://en.wikipedia.org/wiki/Modular_programming) for a long time, and several bolt-on solutions stood up over the years to fill the void (e.g., [<FontIcon icon="fa-brands fa-wikipedia-w"/>CJS](https://en.wikipedia.org/wiki/CommonJS) and [AMD](https://github.com/amdjs/amdjs-api/blob/master/AMD.md)). This period is coming to a close. Yippie! We’ve come a long way, and mass adoption of the official [<FontIcon icon="fa-brands fa-firefox"/>ES module format](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) is taking place. But the history of JavaScript modules is fragmented and comes with a long tail. Trying to understand modules before you understand JavaScript will cause indirection. Don’t focus on ES modules before you know the language. When you have a firm grasp of the language, your next learning stop should be ES Modules.
- If you are new to installing and using packages, there is a lot of historical information and a complicated learning curve. JavaScript packages can use different module formats; [<FontIcon icon="fa-brands fa-firefox"/>ESM](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules), [<FontIcon icon="fa-brands fa-wikipedia-w"/>CJS](https://en.wikipedia.org/wiki/CommonJS), or [AMD](https://github.com/amdjs/amdjs-api/blob/master/AMD.md). Also, [the UMD (<FontIcon icon="iconfont icon-github"/>`umdjs/umd`)](https://github.com/umdjs/umd) module format combines and abstracts other formats like ESM, CJS, and AMD. Due to the sorted and complicated history of JavaScript module formats, there is also a complex history around the formats found in the [<FontIcon icon="fa-brands fa-npm"/>npm registry](https://npmjs.com/), which is a public registry of JavaScript packages (a package is a set of JavaScript modules). Set all this aside while one learns JavaScript.
- [<FontIcon icon="iconfont icon-json"/>JavaScript Object Notation (aka JSON)](https://json.org/json-en.html) is another topic that might not land with you until you understand JavaScript datatypes and some basic programming concepts. Note that the JSON syntax isn’t part of the ECMAScript specification, and the community [<FontIcon icon="iconfont icon-json"/>conventionally](http://json-schema.org/) drives any standardized usage. However, JavaScript does provide JSON methods to parse and stringify JSON. As a JavaScript neophyte, I would set aside trying to understand JSON until you understand JavaScript datatypes and JavaScript’s implementation of strings, objects, and arrays. If you need a mental model slot to place JSON into today, consider JSON a conventional way of writing data as text, and simultaneously valid JavaScript, in a universally understandable way so that other languages can transport and translate the data.
- You might hear about JavaScript fatigue because the JavaScript development scene is massive and comes with an enormous spectrum of solutions, tools, and churn. It makes sense, given JavaScript is the most used programming language in the world. Set all this churning noise aside until you spend time learning the language. The language is solid.

---

## Why Learn/Use JavaScript?

One should learn JavaScript because:

- JavaScript is the most ubiquitous programming language in the world.
- JavaScript is ideal for those new to programming.
- To start running JavaScript is accessible and straightforward (i.e., open a web browser and start writing JavaScript immediately in the DevTools console).
- The job market is vast for developers who know JavaScript.
- A sea of instructional resources (i.e., Traditional Degree Programs, Boot Camps, Independent Learning).
- JavaScript is very unlikely to become unpopular anytime soon.

---

## Top Use Cases of JavaScript

The web platform (i.e., web browsers) and Node.js are the two most common runtimes that use JavaScript as their programming language. We’ll briefly review both runtimes and then discuss the commonality between the two runtimes (i.e., a JavaScript engine).

### The Web Platform Runtime

As you might know, HTML or hypertext markup language is the foundational language used to construct a web page. When opened in a web browser, the following HTML file will render the text “Hello, I’m a webpage.”

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Title of webpage</title>
  </head>
  <body>
    <h1>Hello, I'm a webpage.</h1>
  </body>
</html>
```

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/08/javascript-webpage-1024x450-1.png?resize=1024%2C450&ssl=1)

JavaScript is the scripting language used to add programmatic behavior to web browsers and web pages (i.e., [<FontIcon icon="fa-brands fa-firefox"/>UI activities and interactions based on events](https://developer.mozilla.org/en-US/docs/Web/API/UI_Events)).

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Name of webpage</title>
  </head>
  <body>
    <h1>
      Hello, I'm a webpage.
      <button onclick="callThisFunction()">Click this button</button>
    </h1>
    <script> // e.g. programming aspects of the web page
      const callThisFunction = () => {
        document
          .getElementsByTagName("h1")[0]
          .insertAdjacentHTML(
            "afterend",
            "JavaScript adds behavior to HTML and CSS (i.e. webpages)"
          );
        // e.g. programming aspects of the browser
        setTimeout(() => {
          alert("you change the web page");
        }, 2000);
      }; </script>
  </body>
</html>
```

In the HTML document above ([<FontIcon icon="iconfont icon-codesandbox"/>see live demo](https://codesandbox.io/s/condescending-chatterjee-l73scj?file=/index.html)), we are using JavaScript the language to call the runtime [<FontIcon icon="fa-brands fa-firefox"/>DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model) API’s [<FontIcon icon="fa-brands fa-firefox"/>getElementById()](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById) and [<FontIcon icon="fa-brands fa-firefox"/>insertAdjacentHTML()](https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML) as well as the BOM API’s [<FontIcon icon="fa-brands fa-firefox"/>alert()](https://developer.mozilla.org/en-US/docs/Web/API/Window/alert) and [<FontIcon icon="fa-brands fa-firefox"/>setTimeout()](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout). Using JavaScript runtime API’s, the webpage and browser window become scriptable.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/09/javascript-alert.png?resize=1024%2C581&ssl=1)

This small webpage is just a tiny glimpse of what can be programmed on the web platform using the JavaScript programming language. Note that JavaScript is the scripting language used to program web browsers and webpages.

### Node.js Runtime

Node.js, loosely speaking, is a command line application that runs a standalone ECMAScript engine that runs Node.js applications. This JavaScript environment’s purpose is to author JavaScript applications like web servers (e.g., [<FontIcon icon="iconfont icon-expressjs"/>express.js](http://expressjs.com/)) and CLI tools (e.g., [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/)) outside of the browser.

The following JavaScript code is a Node.js application that imports an [<FontIcon icon="fa-brands fa-node"/>internal http node module](https://nodejs.org/api/http.html#httpcreateserveroptions-requestlistener) to set up a basic web server.

```js
import http from "http";

const hostname = "127.0.0.1";
const port = 3000;
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World");
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});`
```

Typically, Node gets installed on your local system or a server, but one can run the previous Node.js application online for demonstration purposes.

Try opening [<FontIcon icon="fas fa-globe"/>this live demo](https://stackblitz.com/edit/node-eby9e1?embed=1&file=index.js). When the link is open in a web browser, run the JavaScript source code from the terminal using the command `node index.js`.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/09/javascript-serve-node.png?resize=754%2C273&ssl=1)

Running the command will start the Node.js application and server the results to a browser view (i.e., “Hello World”).

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/09/javascript-node-helloworld.png?resize=678%2C261&ssl=1)

If you see “Hello World,” then you are using the Node.js CLI application to run the Node.js source code (i.e., “node index.js”), and this source code is a small application that servers a plain text document to a web browser from a web server.

Note that in the context of a Node.js application, JavaScript is viewed as a programming language to create Node.js applications.

### JavaScript Engines

Web browsers and Node.js have different runtime details, but both use a JavaScript engine. The context of what you are doing with the language differs, but JavaScript and the engine can be the same. So, for example, whether you open a [<FontIcon icon="fa-brands fa-chrome"/>JavaScript console in the latest version of the Chrome web browser](https://developer.chrome.com/docs/devtools/console/#javascript) and execute some JavaScript or open a .js file and begin writing a Node.js application executed by the [Node REPL](https://nodejs.dev/en/learn/how-to-use-the-nodejs-repl), both are being run by a version of the V8 ECMAScript engine.

---

## Before Learning JavaScript

We suggest selecting and becoming comfortable using the following before you begin learning JavaScript:

- A JavaScript authoring tool (i.e., [<FontIcon icon="fa-brands fa-firefox"/>a text or code editor, e.g., VS Code](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/Installing_basic_software))
- A JavaScript runtime (e.g., [<FontIcon icon="fas fa-globe"/>web pages](https://frontendmasters.com/bootcamp/introduction-html/), [<FontIcon icon="fas fa-globe"/>JSFiddle](https://jsfiddle.net/), or [<FontIcon icon="fas fa-globe"/>Node.js](https://frontendmasters.com/courses/node-js-v2/))
- A JavaScript reference (i.e., language and support documentation)

### Authoring Tool

Today [<FontIcon icon="fa-brands fa-stack-overflow"/>most developers](https://survey.stackoverflow.co/2022/#most-loved-dreaded-and-wanted-new-collab-tools-want) use [VS Code](https://code.visualstudio.com/) for authoring JavaScript. We recommend using VS Code but using a simple text editor will get the job done if you prefer not to add on the overhead of learning how to use a code editor. Alternatively, if you want to start ASAP, you can always just open [JSFiddle](https://jsfiddle.net/) and start typing JavaScript into the JavaScript pane and then press the “Run” button.

### Runtime

One will need to select a runtime in which they plan on learning JavaScript. We recommend starting with a [web browser and html (i.e., webpages)](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web) instead of Node.js if you are new to programming (e.g., [Edge](https://microsoft.com/en-us/edge) or [Chrome](https://google.com/chrome/) will do).

### Reference

There is only one JavaScript reference we recommend using when studying the built-in parts of the language, the [<FontIcon icon="fa-brands fa-firefox"/>Mozilla JavaScript reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference) (aka MDN). We also recommend purposely savoiding all other reference sources while first learning JavaScript. When searching the web, focus on MDN resources by adding the “mdn” string to all of your searches (e.g., “[mdn array foreach](https://google.com/search?q=mdn+array+foreach)”) so that MDN results show up first.

---

## Start Learning JavaScript

### Step 1 - Learn Programming fundamentals

1. Programming Basics
   - values
   - operations
   - variables
   - expressions and statements
   - decisions
   - loops
   - functions
2. Types & Coercion
3. Scope & Closure

#### Video Courses

- [Learn JavaScript](https://frontendmasters.com/bootcamp/introduction-javascript/) \[free\]
- [Getting Started with JavaScript, v2](https://frontendmasters.com/courses/getting-started-javascript-v2/) \[free\]
- [Complete JavaScript Learning Path](https://frontendmasters.com/learn/javascript/) \[$\]
  - [JavaScript: From First Steps to Professional](https://frontendmasters.com/courses/javascript-first-steps/) \[$\]
  - [JavaScript: The Hard Parts](https://frontendmasters.com/courses/javascript-hard-parts-v2/) \[$\]
  - [Deep JavaScript Foundations, v3](https://frontendmasters.com/courses/deep-javascript-v3/) \[$\]
  - [JavaScript: The Recent Parts](https://frontendmasters.com/courses/js-recent-parts/) \[$\]

#### Reading Material

- [JavaScript basics](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/JavaScript_basics) \[free\]
- [JavaScript First Steps](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps) \[free\]
- [You Don’t Know JS Yet: Get Started - 2nd Edition](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/get-started/README.md) \[free to $\]
- [MDN A re-introduction to JavaScript (JS tutorial)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript) \[free\]
- [Eloquent JavaScript](https://eloquentjavascript.net/) \[free to $\] - Chapters 1 - 12

### Step 2 - Learn Intermediate & Advanced Programming Paradigms

#### Classes

- Video Course: [The Hard Parts of Object Oriented JavaScript](https://frontendmasters.com/courses/object-oriented-js/) \[$\]
- Reading Material: [The Principles of Object-Oriented JavaScript 1st Edition](https://nostarch.com/oojs) \[$\]

#### Functional Programming with JavaScript

- Video Course: [Functional JavaScript First Steps](https://frontendmasters.com/courses/functional-first-steps/) \[$\]
- [The Hard Parts of Functional JavaScript](https://frontendmasters.com/courses/functional-js-fundamentals/) \[$\]

#### JavaScript Async/Promises

- Video Course: [JavaScript: The New Hard Parts](https://frontendmasters.com/courses/javascript-new-hard-parts/) \[$\]
- Reading Material: [Understanding JavaScript Promises](https://amazon.com/Understanding-JavaScript-Promises-Nicholas-Zakas/dp/1678034150?&linkCode=ll1&tag=frontendma0da-20&linkId=cbcbfc33e77fe8718446de6fa5d782ef&language=en_US&ref_=as_li_ss_tl) \[$\]

### Step 3 - Learn ES Modules

#### Reading Material

- [Chapter 9 : Using ES2015 Modules Today](https://frontendmasters.com/guides/javascript-enlightenment/#9) \[free\]
- [Chapter 10 : Writing ES2015 Module Syntax](https://frontendmasters.com/guides/javascript-enlightenment/#10) \[free\] 
- [Modules • JavaScript for impatient programmers](https://exploringjs.com/impatient-js/ch_modules.html) \[free to $\]

---

## Commonly Asked JavaScript Questions

::: details Question: What is JavaScript?

**Answer**

Simplistically expressed, JavaScript is a [programming language](https://en.wikipedia.org/wiki/Programming_language) used to program runtimes like web browsers & web pages as well as Node.js applications. If you are new to programming languages, that is about all you can understand at this point. If you’re a seasoned programmer, then what you need to know is:

> **JavaScript** (often shortened to **JS**) is a lightweight, interpreted, object-oriented language with [first-class functions](https://en.wikipedia.org/wiki/First-class_function), and is best known as the scripting language for Web pages, but it’s [used in many non-browser environments](https://en.wikipedia.org/wiki/JavaScript#Other_usage) as well. It is a [prototype-based](https://en.wikipedia.org/wiki/Prototype-based_programming), multi-paradigm scripting language that is dynamic, and supports object-oriented, imperative, and functional programming styles.”
>
> [MDN reference: About JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/About_JavaScript)

:::

::: details Question: What is a JavaScript Array?

**Answer**

How would one store multiple usernames as a single value called “userNames” in JavaScript?

Doing this with one comma-separated JavaScript string wouldn’t be ideal.

```js
let userNames = "Pat Jones, Bob Riley, Cody Dallas";
```

As a comma-separated string value, there isn’t an ideal way to operate on each value as a separate value.

A JavaScript Array is a value in JavaScript that holds multiple values that can be stored and accessed using a numeric index starting at zero. (i.e., separate values stored and accessed using a numeric order). A better solution would be to use a JavaScript Array so each value can be stored and accessed as an individual value.

```js
// create an array with three string values
let userNames = ["Pat Jones", "Bob Riley", "Cody Dallas"]; // short hand Array syntax

// access each value in the array
console.log(userNames[0]); // logs 'Pat Jones' at index 0 in the array
console.log(userNames[1]); // logs 'Bob Riley' at index 1 in the array
console.log(userNames[2]); // logs 'Cody Dallas' at index 2 in the array

console.log(userNames.length); // logs 3
```

Once you have a set of values in an Array, JavaScript [provides built-in](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) properties (e.g., [`.length`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length)) and methods (e.g., [`.forEach()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)) that are incredibly handy when working on Array values.

:::

::: details Question: What is a JavaScript Loop?

**Answer**

To output the numbers between 0 and 50 (i.e., 1 thru 49) using JavaScript we could log out one digit at a time using a `console.log()` method.

```js
console.log(1);
console.log(2);
console.log(3);
console.log(4);
console.log(5);
console.log(6);
// ... so on, and so on

// logs
// 1
// 2
// 3
// 4
// ... to 49
```

Logging each digit would be redundant and unnecessary, and given that programming languages offer a mechanism to repeat code, a better solution exists. A JavaScript loop to repeat code without manually writing out each iteration would be a better solution.

The code below uses JavaScript [`for`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for) statement to loop over a `console.log()` method, calling the `.log()` method 49 times with the current value of `i` upon each iteration of the loop.

```js
/* 
  We can read the following JavaScript like so: 

     i is equal to 1, 
     if i is less than 50 do a loop 
     (i.e. run the code inside the loop) 
     with the current value of i
     then increment the value of i by 1 and do another loop 
     as long as i is less than 50 
*/

for (let i = 1; i < 50; i = i + 1) {
  console.log(i);
}

// stop looping when i is greater than 50
// logs
// 1
// 2
// 3
// 4
// ... to 49
```

The result is the same as if we had written out 49 sequential `console.log()`’s, each with a numerical value.

JavaScript loops are simply a mechanism that will call code repeatedly until you tell it to stop (e.g., [`break`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/break)).

JavaScript has many different looping mechanisms, some generic and some value specific. Below is a list of these looping mechanisms:

- [for statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration#for_statement)
- [do…while statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration#do...while_statement)
- [while statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration#while_statement)
- [for…in statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration#for...in_statement)
- [for…of statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration#for...of_statement)
- [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#iterate_over_an_array)
  - `every()`
  - `filter()`
  - `flatMap()`
  - `forEach()`
  - `map()`
  - `reduce()`
  - `reduceRight()`

:::

::: details Question: How do I use the Array methods `.map()` and `.forEach()`?

**Answer**

The `.forEach()` method defines a function that is called for each value in an Array (i.e., all the values from the array are sequentially passed into the function).

The task of looping over an Array of strings is made easy with the `.forEach()` method.

Below, the index and value from the animals array is log to the console using `.forEach()`.

```js
const animals = ["dog", "cat", "rat", "snake", "bird"];

// loop over animals passing each value to a function, the function runs console.log()
animals.forEach(<em>function</em> (value, valueIndex) {
  console.log(`at index ${valueIndex} the value is ${value}`);
});

/* 
  logs
    "at index 0 the value is dog"
    "at index 1 the value is cat"
    "at index 2 the value is rat"
    "at index 3 the value is snake"
    "at index 4 the value is bird"
 */`
```

The `.map()` Array method also loops over an Array of values, but it’s used to return a new augmented Array of values based on the Array the map method was called on.

Below the values from the animals’ Array are changed one by one to be a different value in a different Array.

```js
const animals = ["dog", "cat", "rat", "snake", "bird"];

const pluralAnimals = animals.map(<em>function</em> (value) {
  return value + "s";
});

console.log(pluralAnimals);

// logs ["dogs", "cats", "rats", "snakes", "birds"]

console.log(animals);
// logs ["dog", "cat", "rat", "snake", "bird"]
// animals Array did not change, map() created a new array of values
```

:::

::: details Question: How do I find a substring in a string?

**Answer**

If one means by “find” to verify that a substring is within another string, the String `.includes()` method can be used.

```js
const myString = "my favorite animal is a dog";

console.log(myString.includes("dog")); // logs true
```

If one means by “find” is locating the starting index of a substring within a string, that can be accomplished using the `.indexOf()` method.

```js
const myString = "my favorite animal is a dog";

console.log(myString.length); // logs 27,
// which means the string has 27 characters starting at a zero index

const indexOfDog = myString.indexOf("dog"); // find starting index of substring 'dog'

console.log(indexOfDog); // logs 24, meaning that the character "d" is at index 24
console.log(myString.at(24)); // logs "d", can use .at() to verify

// so we know that dog starts at index 24 and ends at 27
// .substring() will pull the string 'dog' from 'my favorite animal is a dog'
console.log(myString.substring(indexOfDog, indexOfDog + 3)); // logs 'dog'
```

The `indexOf()` method searches a string for a substring and returns the first index where the substring begins.

---

## What’s Next?

Make sure to checkout the [learning path on JavaScript](https://frontendmasters.com/learn/javascript/) if you’re interested in learning JavaScript in the browser, or the [learning path on Node.js](https://frontendmasters.com/learn/node-js/) if you want to use JavaScript on the server.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "A Complete Guide to Beginning with JavaScript",
  "desc": "This guide serves as an introduction to learning JavaScript, covering necessary prerequisite knowledge and addressing common obstacles. It highlights JavaScript’s origins, essential concepts, and practical applications across different environments.",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/a-complete-guide-to-beginning-with-javascript.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
