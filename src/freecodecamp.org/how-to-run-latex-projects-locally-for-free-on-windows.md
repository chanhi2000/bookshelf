---
lang: en-US
title: "How to Run LaTeX Projects Locally (for Free) On Windows"
description: "Article(s) > How to Run LaTeX Projects Locally (for Free) On Windows"
icon: iconfont icon-tex
category:
  - LaTeX
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - tex
  - latex
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Run LaTeX Projects Locally (for Free) On Windows"
    - property: og:description
      content: "How to Run LaTeX Projects Locally (for Free) On Windows"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-run-latex-projects-locally-for-free-on-windows.html
prev: /programming/latex/articles/README.md
date: 2025-02-26
isOriginal: false
author:
  - name: Md. Fahim Bin Amin
    url : https://freecodecamp.org/news/author/FahimFBA/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1740494599916/ce7cfadb-985c-4245-9cc8-1ccba483ba69.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "LaTeX > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/latex/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Run LaTeX Projects Locally (for Free) On Windows"
  desc="LaTeX is a high-quality typesetting system that is widely used in technical, academic, and scientific writing. It’s very popular in academia, especially in fields like mathematics, physics, computer science, and engineering. LaTeX is not a word proce..."
  url="https://freecodecamp.org/news/how-to-run-latex-projects-locally-for-free-on-windows"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1740494599916/ce7cfadb-985c-4245-9cc8-1ccba483ba69.png"/>

LaTeX is a high-quality typesetting system that is widely used in technical, academic, and scientific writing. It’s very popular in academia, especially in fields like mathematics, physics, computer science, and engineering.

LaTeX is not a word processor like Microsoft Word – rather, it’s a document preparation system that allows you to focus on the content of your writing while it handles the formatting. If you use LaTeX to write your formal documents (like a CV, résumé, or research paper), then you don’t need to worry about the formatting and structure, as everything can be done using LaTeX scripts.

If you use LaTeX to write your academic or research papers, you might be familiar with website-based applications like [<FontIcon icon="fas fa-globe"/>Overleaf](https://overleaf.com/). Overleaf is a website that allows anyone to read, write, and compile LaTeX scripts online.

These sites are okay for small tasks or compilations, or if you need only a little bit of free collaboration. But if you need to work on bigger projects or need to conduct many collaborative tasks, then the free tier may be insufficient. And in my opinion, the paid subscription costs too much.

But don’t worry: running LaTeX locally may be the perfect solution for you. I know this because I also faced a similar situation, and this simply changed my life! I also keep all of the tracks in Git (GitHub, GitLab, and so on) along with unlimited collaboration opportunities and compilation. And the great thing is, all of these are completely free as it’s all happening on my local machine.

So in this article, I am going to discuss the methods in detail. I have also created an in-depth video for you to understand how this works.

::: info Video Tutorial

<VidStack src="youtube/vA45lWrndVHA" />

:::

---

## Resources You’ll Need:

::: tabs

@tab:active 1. GitHub Repository

This entire guide is available in one of my GitHub projects named [<FontIcon icon="iconfont icon-github"/>`FahimFBA/Install-LaTeX`](https://github.com/FahimFBA/Install-LaTeX). The live website is available [<FontIcon icon="fas fa-GLOBE"/>here (fahimfba.github.io/Install-LaTeX](https://fahimfba.github.io/Install-LaTeX/) as well. I would highly appreciate it if you star (⭐) the repository. Also, you can create issues [there](https://github.com/FahimFBA/Install-LaTeX/issues) if you face any problems. Any kind of good contribution is also welcome here.

@tab 2. Operating System

You can install LaTeX on any major operating system (Windows, MacOS, and Linux-based OSes). But in this article, I am only going to talk about the Windows operating system.

Here, I’m using the latest Windows 11 operating system, but the same procedure should be applicable to all of the Windows-based operating systems that are going to come out in the future. Windows 10 should also be okay too.

@tab 3. Editor

I am going to use the popular [<FontIcon icon="iconfont icon-vscode"/>Visual Studio Code](https://code.visualstudio.com/) as my editor. It is a 100% free and robust editor that’s very popular among devs all over the world. If you don’t already have it, go ahead and install it before proceeding further.

![VS Code](https://cdn.hashnode.com/res/hashnode/image/upload/v1739972339481/729ecab1-b87e-43d6-baf5-dbda170bcefc.png)

@tab 4. LaTeX Compiler/IDE

To work on LaTeX files, you’ll need a specific compiler. I am going to use [<FontIcon icon="fas fa-globe"/>MikTeX](https://miktex.org/). There are other tools out there, but this is the best tool right now (according to me!). It is completely free and supports all major operating systems as well. It also has a built-in IDE, but we are going to use VS Code as our main editor.

![MiKTeX](https://cdn.hashnode.com/res/hashnode/image/upload/v1739972305065/8119b362-3c95-42a0-9458-be211d2ead35.png)

Download the Windows executable file from the Download section.

![Download MiKTeX](https://cdn.hashnode.com/res/hashnode/image/upload/v1739972408494/71b39032-3adc-426e-8bd9-3a18dc454cf5.png)

After the download is finished, install the executable. At the end of the installation, keep the tick in “Check for updates now”.

![Check for update](https://cdn.hashnode.com/res/hashnode/image/upload/v1739972492255/a59f7000-8137-46c5-89f1-4f7151a751b6.png)

You will find the MikTeX console in your taskbar. Open that.

![MiKTeX console](https://cdn.hashnode.com/res/hashnode/image/upload/v1739972541856/e7bad89a-4920-4175-a361-ba8fb51f6b20.png)

Go to the “Updates” tab and click “Update now”. It will install all of those packages.

![6d585388-0218-4792-b78e-798c75dee6a6](https://cdn.hashnode.com/res/hashnode/image/upload/v1739972581283/6d585388-0218-4792-b78e-798c75dee6a6.png)

At the end, it will prompt you to close the console. Click “OK”. Open MiKTeX again.

![926b5aba-0a3a-4c80-a103-fef5a5aafc38](https://cdn.hashnode.com/res/hashnode/image/upload/v1739972610846/926b5aba-0a3a-4c80-a103-fef5a5aafc38.png)

That’s it for this tool.

@tab 5. Perl

The commands we are going to execute for building the LaTeX files are dependent on Perl. As the Windows operating system doesn’t come with a built-in Perl compiler, we are going to install the [<FontIcon icon="fas fa-globe"/>Strawberry Perl](https://strawberryperl.com/).

![Perl](https://cdn.hashnode.com/res/hashnode/image/upload/v1739972724660/7a6ad623-c2cc-45bd-bac6-08afdd5512c1.png)

Download the latest MSI package from it.

![Download Strawberry perl](https://cdn.hashnode.com/res/hashnode/image/upload/v1739972749178/33c95897-37af-4be7-a24f-3520c3c1486e.png)

Install the executable after it gets finished downloading the application.

We need to add Perl’s path to the system environment. To do that, go into the location where it has been installed. By default, it gets installed inside <FontIcon icon="fas fa-folder-open"/>`C:\Strawberry\perl\bin` directory. Copy the path.

Now search for “env” in the Windows search bar until you find something called “Edit the system environment variable”.

![env](https://cdn.hashnode.com/res/hashnode/image/upload/v1739972898818/7cfdab3a-9ad0-47a7-b0ed-7721b589de97.png)

Now click on “Environment Variables…”.

![System Properties](https://cdn.hashnode.com/res/hashnode/image/upload/v1739972945973/832e011b-0841-4318-a9b8-8b7a8ae42819.png)

Now select “Path” from “System variables” and click “Edit”.

![System variables](https://cdn.hashnode.com/res/hashnode/image/upload/v1739973034756/df3d91f0-907e-42bf-9f1d-883172abd268.png)

Click “New”. Paste the path. Now exit every windows sequentially by clicking on “OK” in each window.

![add var inside system path](https://cdn.hashnode.com/res/hashnode/image/upload/v1739973087965/b73dd5e2-5c35-4399-a645-cb92ba43fe7b.png)

:::

---

## Visual Code Studio Extensions

We need some extensions in VS Code to streamline our workflow.

First, let’s get [<FontIcon icon="iconfont icon-vscode"/>LaTeX Workshop](https://marketplace.visualstudio.com/items?itemName=James-Yu.latex-workshop). It is the core extension for working with LaTeX files inside VS Code Studio.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1739973174197/2311c19b-d56e-4363-a3c0-75a9b0a323ee.png)

Next, you’ll need [<FontIcon icon="iconfont icon-vscode"/>Rewrap](https://marketplace.visualstudio.com/items?itemName=stkb.rewrap). It is an amazing tool that lets you wrap longer lines. It helps you work in a long line in separate lines without breaking any structure or sentence.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1739973216887/86bacaa6-77ff-441c-acca-08ee6a74d354.png)

---

## Build the LaTeX File

Whenever you want to build any LaTeX file inside VS Code studio, simply open that file in it. Then open the command palette using <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>.

Search for `LaTeX Workshop: Build with recipe` and go there. It will start building the file. Whenever it prompts you to install any missing package, untick the box that says `Always show this dialog` and press “Install”. I do this because clicking on “Install” on hundreds of prompt windows for building a LaTeX file is very difficult for me.

![package installation](https://cdn.hashnode.com/res/hashnode/image/upload/v1739973393900/0ec3a626-38bb-4fbd-8f98-658cb6bc4853.png)

After it finishes building the LaTeX file, you will get the output PDF file inside VS Code. You can open the PDF file directly in VS Code.

If you want to go into any specific line in the code from the output PDF file like Overleaf, simply click on that specific portion in the PDF by pressing the <kbd>Ctrl</kbd> key. It will immediately take you to the code part where it belongs.

That’s it! It’s now running on your local machine and there are no restrictions or limitation to it, literally! Also, for collaboration and keeping track of the history, using Git is the best option, like I do.

---

## Conclusion

Thanks for reading this short tutorial. I hope it helped you interact more easily with LaTeX.

You can follow me on [GitHub (<FontIcon icon="iconfont icon-github"/>`FahimFBA`)](https://github.com/FahimFBA), [LinkedIn (<FontIcon icon="fa-brands fa-linkedin"/>`fahimfba`)](https://linkedin.com/in/fahimfba/), and [YouTube (<FontIcon icon="fa-brands fa-youtube"/>`FahimAmin`)](https://youtube.com/@FahimAmin) to get more content like this. Also, my [<FontIcon icon="fas fa-globe"/>website](https://fahimbinamin.com/) is always available for you!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Run LaTeX Projects Locally (for Free) On Windows",
  "desc": "LaTeX is a high-quality typesetting system that is widely used in technical, academic, and scientific writing. It’s very popular in academia, especially in fields like mathematics, physics, computer science, and engineering. LaTeX is not a word proce...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-run-latex-projects-locally-for-free-on-windows.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
