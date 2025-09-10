---
lang: en-US
title: "“CPC Rock Paper Scissors” by Amit: A project with fireworks animations"
description: "Article(s) > (1/5) How to Become an Analytical Programmer - Solve the “Rock, Paper, Scissors” Game 5 Ways Using JavaScript & Mermaid.js" 
icon: fas fa-computer
category:
  - Node.js
  - Mermaid.js
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - mermaid
  - mermaidjs
  - mermaid-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > (1/5) How to Become an Analytical Programmer - Solve the “Rock, Paper, Scissors” Game 5 Ways Using JavaScript & Mermaid.js"
    - property: og:description
      content: "“CPC Rock Paper Scissors” by Amit: A project with fireworks animations"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-become-an-analytical-programmer-compare-five-projects/1-cpc-rock-paper-scissors-by-amit-a-project-with-fireworks-animations.html
date: 2025-05-12
isOriginal: false
author:
  - name: evaristo.c
    url : https://freecodecamp.org/news/author/ec001/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1746812725602/cd4a5bc4-71f2-4678-8f5d-5571d9cc38e8.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "How to Become an Analytical Programmer - Solve the “Rock, Paper, Scissors” Game 5 Ways Using JavaScript & Mermaid.js",
  "desc": "Over the past year, I’ve explored tools and practices that help developers build an analytical mindset. One recurring theme is how experienced programmers often describe understanding code as forming a mental picture - a conceptual map of the program...",
  "link": "/freecodecamp.org/how-to-become-an-analytical-programmer-compare-five-projects/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Become an Analytical Programmer - Solve the “Rock, Paper, Scissors” Game 5 Ways Using JavaScript & Mermaid.js"
  desc="Over the past year, I’ve explored tools and practices that help developers build an analytical mindset. One recurring theme is how experienced programmers often describe understanding code as forming a mental picture - a conceptual map of the program..."
  url="https://freecodecamp.org/news/how-to-become-an-analytical-programmer-compare-five-projects#heading-1-cpc-rock-paper-scissors-by-amit-a-project-with-fireworks-animations"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1746812725602/cd4a5bc4-71f2-4678-8f5d-5571d9cc38e8.png"/>

<CodePen
  user="ghaste"
  slug-hash="XWLxQEw"
  title="CPC Rock Paper Scissors"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

Amit is a prolific CodePen user who has been uploading about 2-3 projects per week since as early as 2021. Their most recent projects (year 2025) have increased in complexity and quality while maintaining the high productivity rate.

But in Sept 2024, Amit made a simple (JavaScript) version of the Rock, Paper, Scissors game. This code is a lightweight, user-friendly implementation with fun visual elements like result display, animations, and visual feedback for wins and losses.

Key features of this project are:

- It provides a complete Rock, Paper, Scissors game with a visual spinning effect when the computer is selecting its choice.
- The game has animated fireworks to celebrate wins and changes the background color to red for losses.
- The game keeps the interface interactive and fun through the use of emoji, quick animations, and visual feedback for the player’s performance.

---

## Analysis of the Project

### Quickly discovering of the start and end of the workflow

The code of this pen runs immediately once it’s called. Several variables are initialized (the `animationContainer`, the `choices`, the `emojiMap`, and so on).

Amit also made three separate functions for each item (that is, “rock”, “paper” and “scissors”). Each of them will be added as a **click event** to the interface (the HTML) and they all run the same function after clicking (`playGame`) each with a different argument based on what the user clicked.

After the interface is cleared, some variables are initialized, and the click event is added to the different emoji. The interface will wait for click interactions from the user, which will trigger the `playGame` function.

Let’s make a quick diagram showing this high level of generalization:

```mermaid :collapsed-lines title=""
---
title: “CPC Rock Paper Scissors” by Amit - Simple SB-Diagram
config:
    theme: dark
    layout: "elk"
    flowchart:
        nodeSpacing: 50
        rankSpacing: 50
---
flowchart TD
subgraph _
subgraph main
init
subgraph clickEventListener[Click Event]
    eventHandler@{shape: fr-rect, label: "event handler\n(*<u>playGame</u>*)"}
end
end
init --> |"(1) initialize values<br>clean interface<br>add event listeners (event handler:**playGame**)"|interface
clickEventListener --> stop@{shape: framed-circle}
start@{shape: start} --> init@{shape: hex, label: "Initial Settings"}
choices --> |"(2) user choice: either paper, rock or scissors"| clickEventListener
clickEventListener --> |"(3) animations, results"| interface
end
style start fill:black
style stop fill:black, fill-stroke:white
```

```mermaid
---
title: “CPC Rock Paper Scissors” by Amit - Simple SB-Diagram
config:
    theme: dark
    layout: "elk"
    flowchart:
        nodeSpacing: 50
        rankSpacing: 50
---
flowchart TD
subgraph _
subgraph main
init
subgraph clickEventListener[Click Event]
    eventHandler@{shape: fr-rect, label: "event handler\n(*<u>playGame</u>*)"}
end
end
init --> |"(1) initialize values<br>clean interface<br>add event listeners (event handler:**playGame**)"|interface
clickEventListener --> stop@{shape: framed-circle}
start@{shape: start} --> init@{shape: hex, label: "Initial Settings"}
choices --> |"(2) user choice: either paper, rock or scissors"| clickEventListener
clickEventListener --> |"(3) animations, results"| interface
end
style start fill:black
style stop fill:black, fill-stroke:white
```

<!-- TODO: 내용 비교 후 이미지 삭제 -->
![Simple SB-Diagram of the RPS game by Amit](https://cdn.hashnode.com/res/hashnode/image/upload/v1746177298317/0b9f4609-9810-4ba5-8d8f-6e0869080fdb.jpeg)

### The `playGame` Event Handler

Let’s take a closer look at the `playGame` function:

```js
function playGame(playerChoice) {
  const computerChoice = choices[Math.floor(Math.random() * choices.length)];
  const animationDiv = document.getElementById("animation");
  const resultDiv = document.getElementById("result");

  clearInterval(animationInterval);
  let currentIndex = 0;

  animationInterval = setInterval(() => {
    animationDiv.textContent = emojiMap[choices[currentIndex]];
    currentIndex = (currentIndex + 1) % choices.length;
  }, 100);

  setTimeout(() => {
    clearInterval(animationInterval);
    animationDiv.textContent = emojiMap[computerChoice];
    displayResult(playerChoice, computerChoice);
  }, 1500);
}
```

It seems that there is a lot going on only in this function that could be assumed as separated functionalities. Although not explicit, there are different sections in it:

- one dedicated to calculating the computer’s choice
- then a `setInterval` to handle an animation
- then a `setTimeout` to clear the previous animation and run the `displayResult` function

### Refinement

The first functionality operation that’s easy to identify within the whole code, and that could be set apart, is the one in charge of displaying the results: the `displayResult` func.

But we need to clarify the relationships in our diagram. The `displayResult` function is not coming after the event handler but is called from the event handler itself. We could argue that the event handler *uses* the `displayResult` function. Let’s clarify these definitions on the diagram, and also add a legend:

```mermaid :collapsed-lines title=""
---
title: “CPC Rock Paper Scissors” by Amit - SB Diagram Refinement 01
config:
    theme: dark
    layout: "elk"
    flowchart:
        nodeSpacing: 50
        rankSpacing: 50
---
flowchart TD
subgraph _
subgraph main
init
subgraph clickEventListener[Click Event]
    eventHandler@{shape: fr-rect, label: "event handler\n(*<u>playGame</u>*)"}
end
displayFunc@{shape: fr-rect, label: "display func\n(*<u>displayResult</u>*)"} -.-o eventHandler
end
init -.-o |"(1) initialize values<br>clean interface<br>add event listeners (event handler:**playGame**)"|interface@{shape: curv-trap, label: "interface display"}
clickEventListener --> stop@{shape: framed-circle}
start@{shape: start} --> init@{shape: hex, label: "Initial Settings"}
choices@{shape: rounded} --> |"(2) user choice: either paper, rock or scissors"| clickEventListener
clickEventListener --> |"(3) animations, results"| interface

subgraph legend
      direction LR
      start1[ ] -->|"next step"| stop1[ ]
      style start1 height:0px;
      style stop1 height:0px;
      start2[ ] -.-o|"assignation"| stop2[ ]
      style start2 height:0px;
      style stop2 height:0px; 
end

end

interface ~~~ legend

style start fill:black
style stop fill:black, fill-stroke:white
```

```mermaid
---
title: “CPC Rock Paper Scissors” by Amit - SB Diagram Refinement 01
config:
    theme: dark
    layout: "elk"
    flowchart:
        nodeSpacing: 50
        rankSpacing: 50
---
flowchart TD
subgraph _
subgraph main
init
subgraph clickEventListener[Click Event]
    eventHandler@{shape: fr-rect, label: "event handler\n(*<u>playGame</u>*)"}
end
displayFunc@{shape: fr-rect, label: "display func\n(*<u>displayResult</u>*)"} -.-o eventHandler
end
init -.-o |"(1) initialize values<br>clean interface<br>add event listeners (event handler:**playGame**)"|interface@{shape: curv-trap, label: "interface display"}
clickEventListener --> stop@{shape: framed-circle}
start@{shape: start} --> init@{shape: hex, label: "Initial Settings"}
choices@{shape: rounded} --> |"(2) user choice: either paper, rock or scissors"| clickEventListener
clickEventListener --> |"(3) animations, results"| interface

subgraph legend
      direction LR
      start1[ ] -->|"next step"| stop1[ ]
      style start1 height:0px;
      style stop1 height:0px;
      start2[ ] -.-o|"assignation"| stop2[ ]
      style start2 height:0px;
      style stop2 height:0px; 
end

end

interface ~~~ legend

style start fill:black
style stop fill:black, fill-stroke:white
```

<!-- TODO: 내용 비교 후 이미지 삭제 -->
![First Refinement of SB-Diagram of the RPS game by Amit](https://cdn.hashnode.com/res/hashnode/image/upload/v1746177264415/e826d8e8-bddb-4f9e-9f86-8454f4671ac1.jpeg)

Similarly, the `displayResult` function uses two functions dedicated to the animations: `triggerFireworks` and `triggerLossBackground`. All the functions are declared on the *main scope*.

```mermaid :collapsed-lines title=""
---
title: “CPC Rock Paper Scissors” by Amit - SB Diagram Refinement 02
config:
    theme: dark
    layout: "elk"
    flowchart:
        nodeSpacing: 50
        rankSpacing: 50
---
flowchart TD
subgraph _
subgraph main
data@{shape: lean-r, label: "<span style="color:#f1ce32">constants</span>"} --> eventHandler
init
subgraph clickEventListener[Click Event]
    eventHandler@{shape: fr-rect, label: "<code style="color:orange">playGame</code><br/>event handler"}
end
    displayFunc@{shape: fr-rect, label: "<code style="color:orange">displayResult</code><br/>display func"} -.-o |"(3) the event handler calls the display function"| eventHandler
    display01@{shape: fr-rect, label: "<code style="color:orange">triggerFireworks</code><br/>animation"} -.-o displayFunc
    display02@{shape: fr-rect, label: "<code style="color:orange">triggerLossBackground</code><br/>animation"} -.-o displayFunc
end
init -.-o |"(1) initialize values<br>clean interface<br>add event listeners (event handler:<code style="color:orange;">playGame</code>)"|interface@{shape: curv-trap, label: "interface display"}
clickEventListener --> stop@{shape: framed-circle}
start@{shape: start} --> init@{shape: hex, label: "Initial Settings"}
choices@{shape: rounded} --> |"(2) user choice: either paper, rock or scissors"| clickEventListener
eventHandler --> |"(4) animations, results"| interface

subgraph legend
      direction LR
      subgraph flowlines
        start1[ ] -->|"next step"| stop1[ ]
        style start1 height:0px;
        style stop1 height:0px;
        start2[ ] -.-o|"assignation"| stop2[ ]
        style start2 height:0px;
        style stop2 height:0px;
      end
      subgraph shapes
      variable["variable"]
      style variable width:135px, fill:none, stroke:none, color:#f1ce32
      subprocess[<code style="color:orange;">subprocess</code>]
      end
end
end
interface ~~~ legend

style start fill:black
style stop fill:black, fill-stroke:white
```

```mermaid
---
title: “CPC Rock Paper Scissors” by Amit - SB Diagram Refinement 02
config:
    theme: dark
    layout: "elk"
    flowchart:
        nodeSpacing: 50
        rankSpacing: 50
---
flowchart TD
subgraph _
subgraph main
data@{shape: lean-r, label: "<span style="color:#f1ce32">constants</span>"} --> eventHandler
init
subgraph clickEventListener[Click Event]
    eventHandler@{shape: fr-rect, label: "<code style="color:orange">playGame</code><br/>event handler"}
end
    displayFunc@{shape: fr-rect, label: "<code style="color:orange">displayResult</code><br/>display func"} -.-o |"(3) the event handler calls the display function"| eventHandler
    display01@{shape: fr-rect, label: "<code style="color:orange">triggerFireworks</code><br/>animation"} -.-o displayFunc
    display02@{shape: fr-rect, label: "<code style="color:orange">triggerLossBackground</code><br/>animation"} -.-o displayFunc
end
init -.-o |"(1) initialize values<br>clean interface<br>add event listeners (event handler:<code style="color:orange;">playGame</code>)"|interface@{shape: curv-trap, label: "interface display"}
clickEventListener --> stop@{shape: framed-circle}
start@{shape: start} --> init@{shape: hex, label: "Initial Settings"}
choices@{shape: rounded} --> |"(2) user choice: either paper, rock or scissors"| clickEventListener
eventHandler --> |"(4) animations, results"| interface

subgraph legend
      direction LR
      subgraph flowlines
        start1[ ] -->|"next step"| stop1[ ]
        style start1 height:0px;
        style stop1 height:0px;
        start2[ ] -.-o|"assignation"| stop2[ ]
        style start2 height:0px;
        style stop2 height:0px;
      end
      subgraph shapes
      variable["variable"]
      style variable width:135px, fill:none, stroke:none, color:#f1ce32
      subprocess[<code style="color:orange;">subprocess</code>]
      end
end
end
interface ~~~ legend

style start fill:black
style stop fill:black, fill-stroke:white
```

<!-- TODO: 내용 비교 후 이미지 삭제 -->
![Second Refinement of SB-Diagram of the RPS game by Amit](https://cdn.hashnode.com/res/hashnode/image/upload/v1746177244326/42474333-e6c5-499e-ba95-86541ebd525b.jpeg)

### Imperative Programming

This code is very much imperative. Here’s a definition of imperative programming from Wikipedia:

> Imperative programming focuses on describing *how* a program operates step by step (generally order of the steps being determined in source code by the placement of statements one below the other), rather than on high-level descriptions of its expected results

Finding that the project follows an imperative paradigm is helpful as it provides some general idea of what we can expect in terms of how the code is organized and the type of logic we might use. We can expect that the computation logic will follow a certain workflow.

### Finalizing the diagram

Now that we have uncovered the most explicit modules and their relationships, we can work on identifying sections of the code that might be considered separated functional/operational units. These separate units can be defined as “use cases” and will become the steps of the workflow.

As a way of enhancing the diagram, I have differentiated between steps and process blocks to prevent confusion between “modules” and “cases”.

```mermaid :collapsed-lines title=""
---
title: “CPC Rock Paper Scissors” by Amit - Final SB Diagram
config:
    theme: dark
    layout: "elk"
    flowchart:
        nodeSpacing: 50
        rankSpacing: 50
---
flowchart TD
subgraph _
choices ~~~ stop
subgraph main
init
data@{shape: lean-r, label: "<span style="color:#f1ce32">constants</span>"} --> eventHandler
subgraph clickEventListener[Click Event]
    subgraph eventHandler["<code style="color:orange">playGame</code><br/>event handler"]
       subgraph step03[step03 - result handling and presentation]
        delay01
        delay02
        delay01 ~~~ nonode01[ ]
        style nonode01 fill:none,stroke:none;
       end
       step01@{label: "step01 - compute computer choice"} --> step02@{label: "step02 - prepare display"}
       step02 --> delay01@{shape: delay, label: setInterval}
       delay01 --> delay02@{shape: delay, label: setTimeout}
    end
end
    subgraph displayFunc["<code style="color:orange">displayResult</code><br/>display func"]
       step04@{label: "step01 - compute winner"} --> step05@{label: "step02 - show results"}
    end
    displayFunc -.-o |"(3) the event handler calls the display function"| delay02
    display01@{shape: fr-rect, label: "<code style="color:orange">triggerFireworks</code><br/>animation"} -.-o step05
    display02@{shape: fr-rect, label: "<code style="color:orange">triggerLossBackground</code><br/>animation"} -.-o step05
end
init -.-o |"(1) initialize values<br>clean interface<br>add event listeners (event handler:<code style="color:orange;">playGame</code>)"|interface@{shape: curv-trap, label: "interface display"}
clickEventListener --> stop@{shape: framed-circle}
start@{shape: start} --> init@{shape: hex, label: "Initial Settings"}
choices@{shape: rounded} --> |"(2) user choice: either paper, rock or scissors"| clickEventListener
step05 --> |"(4) animations, results"| interface

subgraph legend
      direction LR
      subgraph flowlines
        start1[ ] -->|"next step"| stop1[ ]
        style start1 height:0px;
        style stop1 height:0px;
        start2[ ] -.-o|"assignation"| stop2[ ]
        style start2 height:0px;
        style stop2 height:0px;
      end
      subgraph shapes
      variable["variable"]
      style variable width:135px, fill:none, stroke:none, color:#f1ce32
      subprocess[<code style="color:orange;">subprocess</code>]
      stepLegend["----step----"]
      style stepLegend fill:#474949, stroke: #CCC, color:#CCC
      end
end
end

interface ~~~ legend

style start fill:black
style stop fill:black, fill-stroke:white
classDef subProc fill:#1f2020, stroke: #CCC, color:#CCC
class eventHandler,displayFunc subProc
classDef step fill:#474949, stroke: #CCC, color:#CCC
class step01,step02,step03,step04,step05,step06 step
```

```mermaid
---
title: “CPC Rock Paper Scissors” by Amit - Final SB Diagram
config:
    theme: dark
    layout: "elk"
    flowchart:
        nodeSpacing: 50
        rankSpacing: 50
---
flowchart TD
subgraph _
choices ~~~ stop
subgraph main
init
data@{shape: lean-r, label: "<span style="color:#f1ce32">constants</span>"} --> eventHandler
subgraph clickEventListener[Click Event]
    subgraph eventHandler["<code style="color:orange">playGame</code><br/>event handler"]
       subgraph step03[step03 - result handling and presentation]
        delay01
        delay02
        delay01 ~~~ nonode01[ ]
        style nonode01 fill:none,stroke:none;
       end
       step01@{label: "step01 - compute computer choice"} --> step02@{label: "step02 - prepare display"}
       step02 --> delay01@{shape: delay, label: setInterval}
       delay01 --> delay02@{shape: delay, label: setTimeout}
    end
end
    subgraph displayFunc["<code style="color:orange">displayResult</code><br/>display func"]
       step04@{label: "step01 - compute winner"} --> step05@{label: "step02 - show results"}
    end
    displayFunc -.-o |"(3) the event handler calls the display function"| delay02
    display01@{shape: fr-rect, label: "<code style="color:orange">triggerFireworks</code><br/>animation"} -.-o step05
    display02@{shape: fr-rect, label: "<code style="color:orange">triggerLossBackground</code><br/>animation"} -.-o step05
end
init -.-o |"(1) initialize values<br>clean interface<br>add event listeners (event handler:<code style="color:orange;">playGame</code>)"|interface@{shape: curv-trap, label: "interface display"}
clickEventListener --> stop@{shape: framed-circle}
start@{shape: start} --> init@{shape: hex, label: "Initial Settings"}
choices@{shape: rounded} --> |"(2) user choice: either paper, rock or scissors"| clickEventListener
step05 --> |"(4) animations, results"| interface

subgraph legend
      direction LR
      subgraph flowlines
        start1[ ] -->|"next step"| stop1[ ]
        style start1 height:0px;
        style stop1 height:0px;
        start2[ ] -.-o|"assignation"| stop2[ ]
        style start2 height:0px;
        style stop2 height:0px;
      end
      subgraph shapes
      variable["variable"]
      style variable width:135px, fill:none, stroke:none, color:#f1ce32
      subprocess[<code style="color:orange;">subprocess</code>]
      stepLegend["----step----"]
      style stepLegend fill:#474949, stroke: #CCC, color:#CCC
      end
end
end

interface ~~~ legend

style start fill:black
style stop fill:black, fill-stroke:white
classDef subProc fill:#1f2020, stroke: #CCC, color:#CCC
class eventHandler,displayFunc subProc
classDef step fill:#474949, stroke: #CCC, color:#CCC
class step01,step02,step03,step04,step05,step06 step
```

<!-- TODO: 내용 비교 후 이미지 삭제 -->
![Final SB Diagram of the RPS game by Amit](https://cdn.hashnode.com/res/hashnode/image/upload/v1746178100298/bf5f7240-b125-4780-aaf8-fdbbdd911390.jpeg)

Let’s summarize what’s happening here:

- In this project, a function acting as an event handler contains most of the project logic and it assumes full execution responsibility over some of the steps of the workflow.
- Once the event handler is triggered, the choice of the user is passed to it and the same function calculates the choice of the computer.
- That calculation is followed by part of the preparation of the interface, then an animation managed by an `Interval` - followed by a nested `Timeout` JavaScript method.
- The Timeout method has the `displayResult` function as a callback function. This function will take the responsibility of the remaining steps.
- It is inside the `displayResult` where the calculation of the winner takes place. The same function controls the rest of the display of results with different displays delegated to two other functions based on who wins the game.
