---
lang: en-US
title: "How to Run Python GUI Apps in GitHub Codespaces with Xvfb and noVNC"
description: "Article(s) > How to Run Python GUI Apps in GitHub Codespaces with Xvfb and noVNC"
icon: fa-brands fa-python
category:
  - Python
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Run Python GUI Apps in GitHub Codespaces with Xvfb and noVNC"
    - property: og:description
      content: "How to Run Python GUI Apps in GitHub Codespaces with Xvfb and noVNC"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/run-python-gui-in-github-codespaces.html
prev: /programming/py/articles/README.md
date: 2025-09-13
isOriginal: false
author:
  - name: Ayodele Aransiola
    url : https://freecodecamp.org/news/author/leomofthings/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1757716674058/86bb9af9-0977-4548-a050-36c3b9ea3e16.png
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

[[toc]]

---

<SiteInfo
  name="How to Run Python GUI Apps in GitHub Codespaces with Xvfb and noVNC"
  desc="GitHub Codespaces gives you a full development environment in the cloud, directly in your browser. It’s great for writing and running code, but there’s one big limitation: it doesn’t support graphical applications out of the box, especially for Pytho..."
  url="https://freecodecamp.org/news/run-python-gui-in-github-codespaces"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1757716674058/86bb9af9-0977-4548-a050-36c3b9ea3e16.png"/>

GitHub Codespaces gives you a full development environment in the cloud, directly in your browser. It’s great for writing and running code, but there’s one big limitation: it doesn’t support graphical applications out of the box, especially for Python code.

If you try to run a Python GUI library like Pygame, Tkinter, or PyQt inside Codespaces, you’ll get an error. That’s because Codespaces runs in a headless environment. There’s no physical display for your app to open a window on.

In this article, I’ll show you how to fix that. You’ll learn how to set up a virtual desktop using Xvfb and stream it into your browser using noVNC. By the end, you’ll be able to run any Python GUI application inside GitHub Codespaces.

::: note Prerequisites

Before you start, you should have:

- A GitHub account and access to GitHub Codespaces.
- Basic familiarity with Python.
- A Python GUI app to test (we’ll use a small Pygame example).

:::

---

## Why Codespaces Needs Extra Setup for GUIs

When you run GUI code like:

```py
import pygame
pygame.display.set_mode((800, 600))
```

On your local machine, Python tells your operating system to create a window. But Codespaces runs on a server with no monitor attached. Without a display, your GUI app cannot render.

That’s where [<VPIcon icon="fas fa-globe"/>Xvfb](https://x.org/archive/X11R7.7/doc/man/man1/Xvfb.1.xhtml) (X virtual framebuffer) comes in. It simulates a display in memory, so GUI programs think they’re running on a real screen. To make that screen visible in the browser, you can use [<VPIcon icon="fas fa-globe"/>noVNC](https://novnc.com/info.html), which streams the virtual display through a web client.

Together, Xvfb and noVNC turn Codespaces into a cloud-based desktop for GUI apps.

---

## Step 1: Create the Repo and Open Codespace

First, create a GitHub repository for your project (or a demo repo) and open it in Codespaces:

![Screenshot of a new repository](https://cdn.hashnode.com/res/hashnode/image/upload/v1757336978616/4a41c394-0d85-48de-b7d6-14a0a3dae56d.jpeg)

---

## Step 2: Add the Setup Script

Create a file called <VPIcon icon="iconfont icon-shell"/>`start-gui.sh` in the root of your project.

![a screenshot of GitHub codespace with a bash file created](https://cdn.hashnode.com/res/hashnode/image/upload/v1757337705472/b1b75b17-57b9-437c-a79e-18f6b1f55cae.png)

Paste the following code into the <VPIcon icon="iconfont icon-shell"/>`start-gui.sh` file:

```sh title="start-gui.sh"
#!/usr/bin/env bash
set -e

echo "Installing dependencies..."
sudo apt-get update -y
sudo apt-get install -y xvfb x11vnc fluxbox websockify novnc

echo "Starting virtual display..."
Xvfb :1 -screen 0 1024x768x24 &
export DISPLAY=:1
fluxbox &

echo "Starting VNC server..."
x11vnc -display :1 -nopw -forever -shared -rfbport 5900 &

echo "Starting noVNC on port 6080..."
websockify --web=/usr/share/novnc 6080 localhost:5900 &

echo ""
echo "GUI environment is ready!"
echo "Go to the Ports tab, set port 6080 to Public, and open the link."
```

Let’s explain this script so you can understand what it does:

### `set -e`

- This tells the shell to exit immediately if any command fails.
- Without it, the script would keep running even if something goes wrong (like a failed install).

### Installing Dependencies

- `sudo apt-get update -y`: updates your package list.
- `sudo apt-get install -y`: ⁣installs the packages we listed (xvfb, x11vnc, fluxbox, websockify, and novnc)
- **xvfb**: creates a “dummy” display (virtual screen in memory).
- **x11vnc**: shares that dummy display via the VNC protocol.
- **Fluxbox:** a lightweight window manager, so the desktop has a GUI environment.
- **websockify**: converts VNC traffic into WebSockets so it can run in a browser.
- **novnc**: provides a browser client to connect to the desktop.

### Virtual Display

- `Xvfb :1 -screen 0 1024x768x24 &`: Starts the virtual framebuffer on display `:1` with resolution `1024x768` and 24-bit color.
- `export DISPLAY=:1`: tells apps (like Python GUIs) to draw on this virtual screen instead of looking for a real display unit.
- `fluxbox &`: launches the window manager so GUI apps have a desktop to sit in.

### VNC Server

- `x11vnc -display :1`: connects you to the dummy display (`:1`).
- `-nopw`: ensures that no password is required.
- `-forever`: this keeps the VNC running even if clients disconnect.
- `-shared`: allows multiple clients.
- `-rfbport 5900`: exposes the internal server on VNC’s standard port.

### noVNC Server

- `websockify` acts as a bridge that converts WebSocket traffic to VNC protocol (on port 5900).
- `--web=/usr/share/novnc`: serves the noVNC web client files.
- `6080`: the port where you’ll connect in your browser (this is publicly accessible).
- `localhost:5900`: forwards traffic to the VNC server that was started earlier.

You should only expose **port 6080** (noVNC) as **Public** and keep **5900** (raw VNC) private because:

- **Prt 5900 (VNC)** uses the raw VNC protocol, which is **not encrypted** and doesn’t require a password in this setup. If exposed, anyone could connect directly and control your Codespace desktop.
- **Prt 6080 (noVNC)** runs over **WebSockets + HTTPS**, so traffic is encrypted and secured through GitHub Codespaces’ connection. It also only serves the noVNC web client, not the raw VNC protocol.

::: note

- `5900` = unsafe to expose
- `6080` = browser-safe way to view the GUI.

:::

The next step is for you to make the bash file executable by running the code below in the terminal:

```sh
chmod +x start-gui.sh
```

---

## Step 3: Start the GUI Environment

Run the script:

```sh
./start-gui.sh
```

![the terminal while running the bash script](https://cdn.hashnode.com/res/hashnode/image/upload/v1757339165120/f99b3381-d038-4eb6-944d-3fabad058c95.png)

This will:

1. Install all dependencies (Xvfb, fluxbox, x11vnc, novnc).
2. Start a virtual display (`DISPLAY=:1`).
3. Launch a lightweight window manager (fluxbox).
4. Stream the desktop to your browser via noVNC on port `6080`.

---

## Step 4: Open the noVNC Desktop

1. In Codespaces, open the Ports tab.
2. Find port 6080 and change its visibility to public. (right-click on the private word)
3. Open the URL in a new browser tab.
4. Click <VPIcon icon="fa-brands fa-html5"/>`vnc.html` or <VPIcon icon="fa-brands fa-html5"/>`vnc_auto.html` if prompted.

![screenshot of the port tab on codespace](https://cdn.hashnode.com/res/hashnode/image/upload/v1757339315843/e3fcfd7b-d946-4c46-b4a9-09b905574a80.png)

![open the port 6080 forwared address in a new tab, and you'd get this screen](https://cdn.hashnode.com/res/hashnode/image/upload/v1757339400603/d8e0e412-7669-4c41-b1e4-5f13d8125de1.png)

You should now see a lightweight Linux desktop running inside your browser.

![a light weight linux desktop running on your browser](https://cdn.hashnode.com/res/hashnode/image/upload/v1757339486345/f5831d0e-d66e-4549-902a-13e3c8bd8bf0.png)

---

## Step 5: Run Your Python GUI App

In a new Codespaces terminal, run:

```sh
export DISPLAY=:1
python3 your_script.py
```

Your Python GUI app should appear inside the noVNC desktop 🎉.

For example, here’s a simple Pygame script <VPIcon icon="fa-brands fa-python"/>`test.py`:

```py :collapsed-lines title="test.py"
import pygame
from pygame import display, font, event
from pygame.locals import *

# Setup display
pygame.init()
screen = display.set_mode()
display.set_caption("Capstone 2")
myFont = font.SysFont('arial', 12)  # Choose a font to use in game

# Directions displayed throughout game
directions = "Please press the 'Y' key for yes and the 'N' key for no."

# Counts how many questions have been asked
currentQuestion = 0


# Determines which question to ask
def story(answer, count):
    screen.fill("white")
    if count == 0:
        question1(answer)
    elif count == 1:
        question2(answer)
    elif count == 2:
        question3(answer)
    elif count == 3:
        end(answer)


# Displays the first part of the story
def intro():
    # Break up the string into multiple variables because there isn't text wrapping in Pygame
    intro1 = "Once upon a time lived a brave hero named Anya."
    intro2 = "She lived a simple life in a small village, making biscuits for the village people."
    intro3 = "One day, late at night, she hears a loud noise outside the village."
    q1 = "Should she go outside to investigate? Yes or no?"

    screen.fill("white")
    textSurface = myFont.render(intro1, True, "black")
    screen.blit(textSurface, (10, 10))
    textSurface = myFont.render(intro2, True, "black")
    screen.blit(textSurface, (10, 24))
    textSurface = myFont.render(intro3, True, "black")
    screen.blit(textSurface, (10, 38))
    textSurface = myFont.render(q1, True, "black")
    screen.blit(textSurface, (10, 52))
    textSurface = myFont.render(directions, True, "black")
    screen.blit(textSurface, (10, 66))


# First question
def question1(answer):
    if answer == K_y:
        yes1 = "She ventures into the dark, prepared for danger."
        yes2 = "Eventually, she sees an army of ogres coming toward her village!"
        q2 = "Should she fight the ogres? Yes or no?"

        textSurface = myFont.render(yes1, True, "black")
        screen.blit(textSurface, (10, 10))
        textSurface = myFont.render(yes2, True, "black")
        screen.blit(textSurface, (10, 24))
        textSurface = myFont.render(q2, True, "black")
        screen.blit(textSurface, (10, 38))
        textSurface = myFont.render(directions, True, "black")
        screen.blit(textSurface, (10, 52))

    elif answer == K_n:
        no1 = "She chooses the safety of her home and stays inside."
        no2 = "However, the sounds do not go away."
        no3 = "She can tell something is very wrong..."
        no4 = "Eventually, she sees an army of ogres coming toward her village!"
        q2 = "Should she fight the ogres? Yes or no?"

        textSurface = myFont.render(no1, True, "black")
        screen.blit(textSurface, (10, 10))
        textSurface = myFont.render(no2, True, "black")
        screen.blit(textSurface, (10, 24))
        textSurface = myFont.render(no3, True, "black")
        screen.blit(textSurface, (10, 38))
        textSurface = myFont.render(no4, True, "black")
        screen.blit(textSurface, (10, 52))
        textSurface = myFont.render(q2, True, "black")
        screen.blit(textSurface, (10, 66))
        textSurface = myFont.render(directions, True, "black")
        screen.blit(textSurface, (10, 80))


# Second question
def question2(answer):
    if answer == K_y:
        yes1 = "She bravely confronts the ogres, hoping to protect her village from harm."
        textSurface = myFont.render(yes1, True, "black")
        screen.blit(textSurface, (10, 10))

    elif answer == K_n:
        no1 = "The ogres raid the village but Anya manages to escape with her life."
        textSurface = myFont.render(no1, True, "black")
        screen.blit(textSurface, (10, 10))

    story2 = "The ogres decide to leave but she knows they will be back."
    story3 = "Anya decides to talk with a village elder about what she should do."
    story4 = "The elder says there is a powerful sword hidden in the Ancient Forest."
    q3 = "Should Anya risk her life to retrieve it? Yes or no?"

    textSurface = myFont.render(story2, True, "black")
    screen.blit(textSurface, (10, 24))
    textSurface = myFont.render(story3, True, "black")
    screen.blit(textSurface, (10, 38))
    textSurface = myFont.render(story4, True, "black")
    screen.blit(textSurface, (10, 52))
    textSurface = myFont.render(q3, True, "black")
    screen.blit(textSurface, (10, 66))
    textSurface = myFont.render(directions, True, "black")
    screen.blit(textSurface, (10, 80))


# Third question
def question3(answer):
    if answer == K_y:
        yes1 = "Although Anya almost died in the Ancient Forest,"
        yes2 = "she returns with the Sword of Legends!"
        yes3 = "In the dead of winter, the ogres come back."
        yes4 = "This time they are being led by their evil king."
        q4 = "Should Anya fight the ogre king now that she has the Sword of Legends?"

        textSurface = myFont.render(yes1, True, "black")
        screen.blit(textSurface, (10, 10))
        textSurface = myFont.render(yes2, True, "black")
        screen.blit(textSurface, (10, 24))
        textSurface = myFont.render(yes3, True, "black")
        screen.blit(textSurface, (10, 38))
        textSurface = myFont.render(yes4, True, "black")
        screen.blit(textSurface, (10, 52))
        textSurface = myFont.render(q4, True, "black")
        screen.blit(textSurface, (10, 66))
        textSurface = myFont.render(directions, True, "black")
        screen.blit(textSurface, (10, 80))

    elif answer == K_n:
        no1 = "Anya decides it's too risky to go into the forest alone."
        no2 = "She hopes for the best with the weapons she has."
        no3 = "In the dead of winter, the ogres come back."
        no4 = "This time they are being led by their evil king."
        q4 = "Should Anya fight the king even though she doesn't have the Sword of Legends?"

        textSurface = myFont.render(no1, True, "black")
        screen.blit(textSurface, (10, 10))
        textSurface = myFont.render(no2, True, "black")
        screen.blit(textSurface, (10, 24))
        textSurface = myFont.render(no3, True, "black")
        screen.blit(textSurface, (10, 38))
        textSurface = myFont.render(no4, True, "black")
        screen.blit(textSurface, (10, 52))
        textSurface = myFont.render(q4, True, "black")
        screen.blit(textSurface, (10, 66))
        textSurface = myFont.render(directions, True, "black")
        screen.blit(textSurface, (10, 80))


# Ending
def end(answer):
    if answer == K_y:
        yes1 = "Tension fills the air as she prepares to fight the king. The duel commences..."
        end1 = "After an intense battle, Anya strikes the final blow!"
        end2 = "The king surrenders and pleads for mercy."
        end3 = "Anya is a true hero, who shows mercy to the king."
        end4 = "This act of kindness warms the evil king's heart,"
        end5 = "who promises to leave the village alone for eternity."
        end6 = "The end!"

        textSurface = myFont.render(yes1, True, "black")
        screen.blit(textSurface, (10, 10))
        textSurface = myFont.render(end1, True, "black")
        screen.blit(textSurface, (10, 24))
        textSurface = myFont.render(end2, True, "black")
        screen.blit(textSurface, (10, 38))
        textSurface = myFont.render(end3, True, "black")
        screen.blit(textSurface, (10, 52))
        textSurface = myFont.render(end4, True, "black")
        screen.blit(textSurface, (10, 66))
        textSurface = myFont.render(end5, True, "black")
        screen.blit(textSurface, (10, 80))
        textSurface = myFont.render(end6, True, "black")
        screen.blit(textSurface, (10, 94))

    elif answer == K_n:
        no1 = "Anya refuses to duel the king, who laughs at her cowardice."
        end1 = "This buys some time for the villagers to escape."
        end2 = "Sadly, the ogre king takes over Anya's village."
        end3 = "She is just thankful that the villagers were able to get to safety."
        end4 = "The end!"

        textSurface = myFont.render(no1, True, "black")
        screen.blit(textSurface, (10, 10))
        textSurface = myFont.render(end1, True, "black")
        screen.blit(textSurface, (10, 24))
        textSurface = myFont.render(end2, True, "black")
        screen.blit(textSurface, (10, 38))
        textSurface = myFont.render(end3, True, "black")
        screen.blit(textSurface, (10, 52))
        textSurface = myFont.render(end4, True, "black")
        screen.blit(textSurface, (10, 66))


# Game loop
while True:
    # Checks to see if at beginning of game
    if currentQuestion == 0:
        intro()

    # Get the most recent event
    currentEvent = event.poll()

    # Displays the correct question based on event that occurs
    if currentEvent.type == KEYDOWN:
        story(currentEvent.key, currentQuestion)
        currentQuestion = currentQuestion + 1

    # add text to screen
    display.update()
```

> code source: codecombat (developing python game)

The code above is a simple interactive story game written with Pygame**.** In the first few lines, you import **Pygame** and its display, font, and event modules.

`pygame.locals` brings in constants like `K_y` (Y key), `K_n` (N key), and⁣ `KEYDOWN`.

The preceding line then initializes Pygame and creates a window (`screen`). It also sets the window title and then loads a font for rendering the text.

Then you have the section for functions that power the story (`intro`, `question1`, `question2`, `question3`, and conditions based on the player’s answer).

In summary, the code is a choose-your-own-adventure text game with a single character, Anya. The choices of the player determine which text is shown.

To run this script, install `pygame`.

```sh
sudo apt-get update
sudo apt-get install -y python3-pygame
pip install pygame
```

The above code will install `pygame` into your environment, after which you can then run the script.

```sh
python3 test.py
```

When you run this inside Codespaces, the window will appear in the noVNC tab. If it doesn’t open automatically, click on `connect`.

![screenshot of the python gui app output](https://cdn.hashnode.com/res/hashnode/image/upload/v1757340287440/77bafc3f-f3eb-402a-8ce1-9cfe6a739b3c.png)

::: tip Tips

![ALSA error in codespaces](https://cdn.hashnode.com/res/hashnode/image/upload/v1757340460701/c3c8376a-4b6f-4a05-8ed3-83c036476150.png)

- **Ignore ALSA errors**: Codespaces doesn’t have sound output, so audio warnings are normal.
- **Adjust resolution**: Change `1024x768x24` in the script if you want a bigger (or smaller) screen.
- **Use with other libraries**: Tkinter, PyQt, and Matplotlib interactive plots. All will work with this setup.
- **Automate DISPLAY export**: Add `export DISPLAY=:1` in your bash file if you don’t want to type it each time.

:::

---

## Conclusion

You’ve just turned GitHub Codespaces into a Python GUI environment. By using Xvfb and noVNC, you can run apps that normally require a desktop environment right inside your browser.

Whether you’re building games, testing interfaces, or teaching Python graphics, you can now do it all in Codespaces without leaving the cloud.

::: info

Want to try it yourself? Clone this [repo (<VPIcon icon="iconfont icon-github"/>`CodeLeom/Python-codespaces`)](https://github.com/CodeLeom/Python-codespaces), run `./start-gui.sh`, and launch your first GUI app in Codespaces today.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Run Python GUI Apps in GitHub Codespaces with Xvfb and noVNC",
  "desc": "GitHub Codespaces gives you a full development environment in the cloud, directly in your browser. It’s great for writing and running code, but there’s one big limitation: it doesn’t support graphical applications out of the box, especially for Pytho...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/run-python-gui-in-github-codespaces.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
