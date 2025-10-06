---
lang: en-US
title: "Setting Up the Project"
description: "Article(s) > (2/13) Learn TypeScript - A Handbook for Developers"
category:
  - TypeScript
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - ts
  - typesccript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > (2/13) Learn TypeScript - A Handbook for Developers"
    - property: og:description
      content: "Setting Up the Project"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/learn-typescript-with-react-handbook/setting-up-the-project.html
date: 2025-02-08
isOriginal: false
author:
  - name: oghenekparobo Stephen
    url : https://freecodecamp.org/news/author/Xtephen/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1738941922431/cfb485ae-1c59-415a-ad56-393a9803d4d8.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Learn TypeScript - A Handbook for Developers",
  "desc": "This handbook will teach you the basics of TypeScript, including what it is, why it is useful, and the key features it offers. TypeScript was created by Anders Hejlsberg, a prominent software engineer at Microsoft who’s also known for his work on C# ...",
  "link": "/freecodecamp.org/learn-typescript-with-react-handbook/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Learn TypeScript - A Handbook for Developers"
  desc="This handbook will teach you the basics of TypeScript, including what it is, why it is useful, and the key features it offers. TypeScript was created by Anders Hejlsberg, a prominent software engineer at Microsoft who’s also known for his work on C# ..."
  url="https://freecodecamp.org/news/learn-typescript-with-react-handbook#heading-setting-up-the-project"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1738941922431/cfb485ae-1c59-415a-ad56-393a9803d4d8.png"/>

We will be using [<FontIcon icon="fas fa-globe"/>Vite](https://vite.dev/guide/) to set up our TypeScript project. Vite is a modern build tool designed to offer a faster and leaner development experience for web projects.

To get started, run the following command to create a new Vite project with TypeScript support:

```sh
npm create vite@latest
```

Then enter a name for your project (you may choose any name you prefer). Follow the instructions carefully in the subsequent steps

![creating a project with `npm create vite@latest`](https://cdn.hashnode.com/res/hashnode/image/upload/v1736769678848/93e22821-6044-4b06-b5ba-86cd3f01ca98.png)

Select your project template by choosing ‘React’ from the available options. We will be using React with TypeScript for this project's development.

![project template when you run, `npm create vite@latest`](https://cdn.hashnode.com/res/hashnode/image/upload/v1736769912180/e94dc70c-32e2-4f9f-89cc-d70d35e3a86e.png)

When prompted for a variant selection, choose 'TypeScript' from the available options.

![variant selection of typescript, in create vite@latest template](https://cdn.hashnode.com/res/hashnode/image/upload/v1736770059262/d605726e-8d4f-4e73-8fb7-3854ce0b4e72.png)

After completing these steps, you will be prompted to navigate to your project directory and run `npm install`. You can use any code editor of your choice. For this example, I will be using VS Code.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1736771043869/e3f81f8b-19b7-4fb6-a439-2f24e3f55df5.png)

![overview of your project in vscode and running npm install to install project dependencies](https://cdn.hashnode.com/res/hashnode/image/upload/v1736771426441/4c524149-4557-40bf-b50a-79400c6c3c91.png)

After running `npm install`, run `npm run dev` to start the project on the local server. Once that’s up and running, we are ready to dive into learning TypeScript concepts.

![our landing page after running npm run dev in our project](https://cdn.hashnode.com/res/hashnode/image/upload/v1736772238962/36f9523c-d316-43e3-ae05-e1ebfa9398f1.png)

But first, let's create our first TypeScript file, <FontIcon icon="iconfont icon-typescript"/>`test.ts` (you can choose to use `.ts` or `.tsx`). Create the <FontIcon icon="iconfont icon-typescript"/>`test.ts` file inside the <FontIcon icon="fas fa-folder-open"/>`src` folder of your project, and add the following code to log a test message:

```ts title="test.ts"
console.log('Testing our first TypeScript file');
```

To view this in the console, import the <FontIcon icon="iconfont icon-typescript"/>`test.ts` file into the <FontIcon icon="fa-brands fa-react"/>`main.tsx` file located in the <FontIcon icon="fas fa-folder-open"/>`src` folder.

![highlighting the <FontIcon icon="fa-brands fa-react"/>`main.tsx` and <FontIcon icon="fa-brands fa-react"/>`test.tsx` file](https://cdn.hashnode.com/res/hashnode/image/upload/v1736773745661/8492e586-7bc0-44a8-ac54-fb576119cdea.png)

```ts title="main.tsx"
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "./test.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

To view the log in the console, make sure to import the <FontIcon icon="iconfont icon-typescript"/>`test.ts` file into the <FontIcon icon="fa-brands fa-react"/>`main.tsx` file located in the <FontIcon icon="fas fa-folder-open"/>`src` folder. After that, check the console of your project running on the local server, and you should see the logged message displayed there.

**Voilà!**

![our result in `console.log`](https://cdn.hashnode.com/res/hashnode/image/upload/v1736774231199/9a270631-0639-40e0-84de-513143b4478d.png)

Now let’s get down to the real business of learning TypeScript.
