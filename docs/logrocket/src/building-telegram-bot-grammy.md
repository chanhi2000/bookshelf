---
lang: en-US
title: "Building a Telegram bot with grammY"
description: "Article(s) > Building a Telegram bot with grammY"
icon: iconfont icon-typescript
category:
  - TypeScript
  - Article(s)
tag:
  - blog
  - blog.logrocket.com
  - ts
  - typesccript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Building a Telegram bot with grammY"
    - property: og:description
      content: "Building a Telegram bot with grammY"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/building-telegram-bot-grammy.html
prev: /programming/ts/articles/README.md
date: 2025-02-20
isOriginal: false
author:
  - name: Amazing Enyichi Agu
    url : https://blog.logrocket.com/author/amazingenyichiagu/
cover: /assets/image/blog.logrocket.com/building-telegram-bot-grammy/banner.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "TypeScript > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/ts/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Building a Telegram bot with grammY"
  desc="Build a Telegram bot with Node.js and grammY to automate text, audio, and image responses using the Telegram API and Google Gemini."
  url="https://blog.logrocket.com/building-telegram-bot-grammy"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/building-telegram-bot-grammy/banner.png"/>

One feature that makes [<VPIcon icon="fa-brands fa-telegram"/>Telegram](https://telegram.org/) stand out from other messaging apps is how easy it is to build bots in it. Telegram bots are lightweight, programmable applications that run within the Telegram app. They use the Telegram interface to accept commands and display results, allowing users to seamlessly interact with them.

![Building A Telegram Bot With GrammY](/assets/image/blog.logrocket.com/building-telegram-bot-grammy/banner.png)

Telegram bots don’t only run inside the app; they use the [<VPIcon icon="fa-brands fa-telegram"/>Telegram Bot API](https://core.telegram.org/bots) to perform tasks like messaging a user, joining [<VPIcon icon="fa-brands fa-telegram"/>groups](https://telegram.org/tour/groups) or [<VPIcon icon="fa-brands fa-telegram"/>channels](https://telegram.org/tour/channels), and more. Bots can do most things a human user of the app can do — with the help of the API. And because bots are computer programs, they can be written in any programming language, making them highly flexible and adaptable.

Because they’re programmable, Telegram bots can automate tasks, perform logical operations, and offer custom interaction interfaces that aren’t available to regular users. In Telegram, bots are easily distinguishable from human users.

This article starts by exploring the many use cases of Telegram bots. It then walks you through a tutorial on building a Telegram bot using TypeScript and Node.js.

---

## Use cases for Telegram bots

Here are some key benefits Telegram users gain from bots:

- **Improving** **the** **messaging experience**: Telegram offers several bots designed to improve the messaging experience in the app. These bots help with tasks like moderating groups, setting up polls, and translating text. Examples include [<VPIcon icon="fa-brands fa-telegram"/>Rose](https://t.me/MissRose_bot) for community moderation, [<VPIcon icon="fa-brands fa-telegram"/>VoteBot](https://t.me/vote) for polls, and [<VPIcon icon="fa-brands fa-telegram"/>Translator](https://t.me/TgTranslatorBot) for language translation within groups
- **Customer service support**: Telegram bots also make great chatbots for customer service. Businesses can set up bots to handle common customer inquiries, saving time and offering quick responses to users who already use the app. With the integration of AI-powered large language models, these bots can provide natural-sounding replies and handle complex queries
- **Automated notifications**: Telegram bots are a great platform to set up automated alerts from third-party applications like email, GitHub, or Trello. You can even configure these bots so users can reply directly to those notifications within Telegram without needing to open the third-party app that triggered the notification. Examples of bots like this are [<VPIcon icon="fa-brands fa-telegram"/>GmailBot](https://t.me/GmailBot), [<VPIcon icon="fa-brands fa-telegram"/>GitHub](https://t.me/GitHubbot), and many others
- **Facilitating payments**: With Telegram bots, you can run a fully functional [<VPIcon icon="fa-brands fa-telegram"/>ecommerce store](https://core.telegram.org/bots/payments#payments-for-physical-products). Telegram allows bot developers to generate invoices for customers and accept payments

Telegram bots have a wide range of uses, including serving as an alternative to mobile apps. Since they function similarly to [<VPIcon icon="fa-brands fa-telegram"/>apps](https://core.telegram.org/bots/webapps), they can even run [<VPIcon icon="fa-brands fa-telegram"/>games](https://core.telegram.org/bots/games). Developers can also use bots to quickly prototype CRUD applications

---

## How to build a Telegram bot

The rest of the article will focus on how to build a custom telegram bot in Node.js. To follow along, you need knowledge of Node.js APIs and TypeScript. Make sure to have [**Node.js v20**](/blog.logrocket.com/exploring-node-js-v20-features.md) or above installed.

The following tutorial is an implementation of a Telegram bot any Telegram user can chat with about anything. The chatbot will be able to respond to text, photo, and voice messages. Our project will be implemented using the following tools:

- [<VPIcon icon="fas fa-globe"/>grammY](https://grammy.dev/): A simple library for building Telegram bots. It runs on different JavaScript runtimes (Node.js and Deno). grammY’s API maps to the official [<VPIcon icon="fa-brands fa-telegram"/>Telegram HTTP Bot API](https://core.telegram.org/bots/api) so developers don’t miss out on any functionality when using this library
- [<VPIcon icon="fa-brands fa-google"/>Google Gemini](https://ai.google.dev/gemini-api/docs): Gemini is a set of generative AI models from Google. The tutorial uses the [<VPIcon icon="fa-brands fa-google"/>`gemini-1.5-flash` AI model](https://ai.google.dev/gemini-api/docs/models/gemini#gemini-1.5-flash) to generate the responses sent to users. It also uses that model to respond to voice notes and images

::: info

The final source code of the project can be found in this [GitHub repository (<VPIcon icon="iconfont icon-github"/>`enyichiaagu/telegram-bot`)](https://github.com/enyichiaagu/telegram-bot).

:::

The first step to creating a new Telegram Bot is to message [<VPIcon icon="fa-brands fa-telegram"/>BotFather](https://t.me/BotFather) in the app. Open the Telegram App and give BotFather the `/start` command. BotFather will then provide a comprehensive menu of all the services it offers. Follow the menu to create a new bot.

For this example, the bot’s name is `Gemini AI Bot` with the username `gemini01_bot`. You’ll have to create a unique username for your use case.

Finally, BotFather will generate a bot token for you. This token is a unique [<VPIcon icon="fas fa-globe"/>authentication token](https://frontegg.com/blog/token-based-authentication) for your new bot. Anyone with access to it can make changes to the bot, so be sure to copy it and store it somewhere safe — you’ll need it soon.

---

## How to set up grammY

To get started with grammY in Node.js, first create the project folder. This tutorial will name the project `telegram-bot`:

```sh
mkdir telegram-bot
```

Then, navigate into the project folder and initialize npm in the command line:

```sh
cd telegram-bot
npm init -y
```

Next, install grammY, TypeScript, and Node.js type definitions ([<VPIcon icon="fa-brands fa-npm"/>`@types/node`](https://npmjs.com/package/@types/node)) from npm:

```sh
npm install grammy 
# Install grammY -- the bot library -- as a dependency
npm install --save-dev typescript @types/node
# This is necessary for developing TypeScript applications in Node.js
```

Initialize TypeScript:

```sh
npx tsc --init
```

Inside the newly created <VPIcon icon="iconfont icon-json"/>`tsconfig.json` file, set the configuration below. This makes sure the project can use [**ESmodules**](/blog.logrocket.com/es-modules-in-node-today.md):

```json title="tsconfig.json
{
  "compilerOptions": {
    ...
    "target": "es2017",
    "module": "nodenext",
    ... 
  }
}
```

Set up the following file structure for the project:

```plaintext title="file structure"
├── bot.ts
├── .env
├── .gitignore
├── node_modules
├── package.json
├── package-lock.json
└── tsconfig.json
```

Inside the <VPIcon icon="iconfont icon-git"/>`.gitignore` file, exclude the following from git commits:

```sh
node_modules/
.env
bot.js
```

Finally, open the <VPIcon icon="iconfont icon-doitenv" />`.env` file and bind the Telegram Bot token to a constant:

```sh title=".env"
TELEGRAM_BOT_TOKEN=xxxxx
```

With that done, the folder is now set up for the project.

---

## How to set up the Google Gemini API

To get started with Google Gemini, you need to first create an API key. You can do so in the [<VPIcon icon="fa-brands fa-google"/>Google AI Studio](https://aistudio.google.com/app/apikey).

After obtaining the API key, open the <VPIcon icon="iconfont icon-doitenv" />`.env` file and bind the API key to a constant:

```sh title=".env"
...
GEMINI_API_KEY=xxxxx
```

After that, install the [Google AI JavaScript SDK (<VPIcon icon="fa-brands fa-npm "/>`@google/generative-ai`)](https://npmjs.com/package/@google/generative-ai):

```sh
npm install @google/generative-ai 
```

With the library installed, open the <VPIcon icon="iconfont icon-typescript"/>`bot.ts` file and use the constants in the <VPIcon icon="iconfont icon-doitenv" />`.env` file to configure both Gemini and grammY:

```ts :collapsed-lines title="bot.ts"
import { Bot } from 'grammy';
import { GoogleGenerativeAI, type Part } from '@google/generative-ai';
import type { User, File } from 'grammy/types';

const BOT_API_SERVER = 'https://api.telegram.org';
const { TELEGRAM_BOT_TOKEN, GEMINI_API_KEY } = process.env;
if (!TELEGRAM_BOT_TOKEN || !GEMINI_API_KEY) {
  throw new Error('TELEGRAM_BOT_TOKEN and GEMINI_API_KEY must be provided!');
}

const bot = new Bot(TELEGRAM_BOT_TOKEN);
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
  systemInstruction:
    'You are a Telegram Chatbot. Maintain a friendly tone. Keep responses one paragraph short unless told otherwise. You have the ability to respond to audio and pictures.',
});
const chat = model.startChat();
```

As you can see from the <VPIcon icon="iconfont icon-typescript"/>`bot.ts` file, it also imported some [**types**](/blog.logrocket.com/types-vs-interfaces-typescript.md) from `grammy/types`, which will be important later. Also, observe the `systemInstruction` given in the Gemini Configuration. This lets you define consistent behavior for the responses to user queries in the chatbot.

To get your first response using the Gemini API with the chatbot, set up a response to the bot with the `/start` command. It is the first command any user will give a bot:

```ts title="bot.ts"
...

bot.command('start', async (ctx) => {
  const user: User | undefined = ctx.from;
  const fullName: string = `${user?.first_name} ${user?.last_name}`;
  const prompt: string = `Welcome user with the fullname ${fullName} in one sentence.`;
  const result = await chat.sendMessage(prompt);
  return ctx.reply(result.response.text(), { parse_mode: 'Markdown' });
});

bot.start();
```

To make type checking and running the bot easier, set up your <VPIcon icon="iconfont icon-json"/>`package.json` with the following scripts:

```json title="package.json"
{
...
  "type": "module",
  "scripts": {
      "start": "node --env-file=.env bot.js",
      "watch": "tsc -w",
      "dev": "node --env-file=.env --watch bot.js"
    },
...
}
```

Finally, use the following CLI command to start the application:

```sh
npm run watch & npm run dev
```

The command type checks the <VPIcon icon="iconfont icon-typescript"/>`bot.ts` file on any changes, compiles the file, and then runs the resulting `bot.js` file. After running the command, test your telegram bot using the URL`https://t.me/<BOT USERNAME>`. Start the bot with the `/start` command and watch the bot respond. Make sure to keep the bot server running on your local host device:

![The Gemini AI Bot Responding To The Start Command From A User](https://blog.logrocket.com/wp-content/uploads/2025/02/Gemini-AI-bot-responding-start-command.png)

---

## How to respond to text

As stated earlier, this bot will respond to texts using the Google Gemini API. We’ll learn how to implement that in this section.

In the <VPIcon icon="iconfont icon-typescript"/>`bot.ts` file, add the following:

```ts title="bot.ts"
...

bot.on('message:text', async (ctx) => {
  const prompt: string = ctx.message.text;
  const result = await chat.sendMessage(prompt);
  return ctx.reply(result.response.text(), { parse_mode: 'Markdown' });
});

bot.start()
```

Here, grammY listens for a text message sent to the bot. After that, grammY sends that text message to Gemini and forwards Gemini’s response as a reply to the user. Here is the result:

![Telegram Bot Responding To Text From A User](https://blog.logrocket.com/wp-content/uploads/2025/02/telegram-bot-responding-text.png)

---

## How to respond to voice messages

After receiving an audio file, Google Gemini can transcribe it and give a response. This project will prompt Gemini to reply to the transcript of the audio file. A user can send audio using Telegram’s built-in voice message feature:

```ts :collapsed-lines title="bot.ts"
...
bot.on('message:voice', async (ctx) => {
  const file: File = await ctx.getFile();
  const filePath: string | undefined = file.file_path;
  if (!filePath) return;

  const fileURL: string = `${BOT_API_SERVER}/file/bot${TELEGRAM_BOT_TOKEN}/${filePath}`;
  const fetchedResponse = await fetch(fileURL);
  const data: ArrayBuffer = await fetchedResponse.arrayBuffer();
  const base64Audio: string = Buffer.from(data).toString('base64');

  const prompt: Array<string | Part> = [
    {
      inlineData: {
        mimeType: 'audio/ogg',
        data: base64Audio,
      },
    },
    {
      text: 'Please respond to the audio prompt.',
    },
  ];
  const result = await chat.sendMessage(prompt);
  return ctx.reply(result.response.text(), { parse_mode: 'Markdown' });
});

bot.start();
```

Now the bot should be able to reply to voice messages:

![Telegram Bot Responding To A User's Voice Message](https://blog.logrocket.com/wp-content/uploads/2025/02/telegram-bot-responding-voice-message.png)

---

## How to respond to pictures

Similar to audio files, Gemini can also interpret images. Here, the project will use grammY to place a listener for sent images. Then it will prompt Gemini to either use the photo caption as a prompt or describe what is in the photo (if it does not have a caption):

```ts :collapsed-lines title="bot.ts"

...
type MINE = 'image/jpeg' | 'image/png';
const ExtToMINE: Record<string, MINE> = {
  jpeg: 'image/jpeg',
  jpg: 'image/jpeg',
  png: 'image/png',
};

bot.on('message:photo', async (ctx) => {
  const caption: string | undefined = ctx.message.caption;
  const photoFile: File = await ctx.getFile();
  const photoFilePath: string | undefined = photoFile.file_path;
  if (!photoFilePath) return;

  const photoURL: string = `${BOT_API_SERVER}/file/bot${TELEGRAM_BOT_TOKEN}/${photoFilePath}`;
  const fetchedResponse = await fetch(photoURL);

  const data: ArrayBuffer = await fetchedResponse.arrayBuffer();
  const base64Photo: string = Buffer.from(data).toString('base64');
  let match: RegExpMatchArray | null = photoFilePath.match(/[^.]+$/);
  if (!match) return;

  let photoExt: string = match[0];
  const prompt: Array<string | Part> = [
    { inlineData: { mimeType: ExtToMINE[photoExt], data: base64Photo } },
    { text: caption ?? 'Describe what you see in the photo' },
  ];

  const result = await chat.sendMessage(prompt);
  return ctx.reply(result.response.text(), { parse_mode: 'Markdown' });
});

bot.start()
```

Now, the Telegram chatbot can respond to images as well:

![Telegram Bot Responding To A Photo Sent By A User](https://blog.logrocket.com/wp-content/uploads/2025/02/telegram-bot-responding-image.png)

---

## Catching errors with grammY

One great benefit grammY offers is the ease of [<VPIcon icon="fas fa-globe"/>handling errors](https://grammy.dev/guide/errors). With the library, a developer can use the `bot.catch()` method to catch and handle whatever errors a bot application encounters. Below is a simple error-handling script in grammY:

```ts title="bot.ts"

...
bot.catch((error) => {
  const ctx = error.ctx;
  console.log(error);
  return ctx.reply('Something went wrong. Try again!');
});

bot.start()
```

The snippet above logs the error to the command line and then replies to a bot user with the message “Something went wrong. Try again.”

---

## Deploying the Telegram bot

For a Telegram bot to keep running at all times, it needs to be deployed to a host that is always up and active. The developer’s local host is most likely unreliable as it could go off at any time.

The grammY documentation offers [<VPIcon icon="fas fa-globe"/>several guides](https://grammy.dev/hosting/comparison) for deploying a bot to different platforms. Fundamentally, a grammY application is a lightweight backend server (in Node.js or Deno), which means you can easily deploy it as you would deploy any other server. After deploying it, anybody can now interact with your Telegram bot at any point in time.

---

## Wrapping up

This article introduced Telegram bots and walked through the process of building one with Node.js. It began by exploring various use cases for bots, then covered how to obtain a bot token, set up a grammY project in Node.js, and get a Gemini API key. The tutorial then demonstrated how to use grammY and Google Gemini to respond to text, audio, and images.

As we’ve seen, Telegram bots can solve a wide range of problems, offering powerful automation and interaction capabilities. Use this guide as a starting point to experiment and build your own custom Telegram bot. You can find the complete source code for this project [here (<VPIcon icon="iconfont icon-github"/>`enyichiaagu/telegram-bot`)](https://github.com/enyichiaagu/telegram-bot).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Building a Telegram bot with grammY",
  "desc": "Build a Telegram bot with Node.js and grammY to automate text, audio, and image responses using the Telegram API and Google Gemini.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/building-telegram-bot-grammy.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
