---
lang: en-US
title: "How to Turn Your Favorite Tech Blogs into a Personal Podcast"
description: "Article(s) > How to Turn Your Favorite Tech Blogs into a Personal Podcast"
icon: fa-brands fa-node
category:
  - Node.js
  - DevOps
  - Github
  - Github Actions
  - Cloudflare
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - devops
  - github
  - github-actions
  - cloudflare
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Turn Your Favorite Tech Blogs into a Personal Podcast"
    - property: og:description
      content: "How to Turn Your Favorite Tech Blogs into a Personal Podcast"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-turn-your-favorite-blogs-into-personal-podcast.html
prev: /programming/js-node/articles/README.md
date: 2026-01-22
isOriginal: false
author:
  - name: Spruce Emmanuel
    url : https://freecodecamp.org/news/author/Spruce/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1769029504274/8900a8bf-73cd-4944-b0d6-e440efd1bc96.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Node.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-node/articles/README.md",
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

```component VPCard
{
  "title": "Cloudflare > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/cloudflare/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Turn Your Favorite Tech Blogs into a Personal Podcast"
  desc="These days it feels almost impossible to keep up with tech news. I step away for three days, and suddenly there is a new AI model, a new framework, and a new tool everyone says I must learn. Reading everything no longer scales, but I still want to st..."
  url="https://freecodecamp.org/news/how-to-turn-your-favorite-blogs-into-personal-podcast"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1769029504274/8900a8bf-73cd-4944-b0d6-e440efd1bc96.png"/>

These days it feels almost impossible to keep up with tech news. I step away for three days, and suddenly there is a new AI model, a new framework, and a new tool everyone says I must learn. Reading everything no longer scales, but I still want to stay informed.

So I decided to change the format instead of giving up. I took a few tech blogs I already enjoy reading, picked the best articles, converted them to audio using my own voice, and turned the result into a private podcast. Now I can stay up to date while walking, running, or driving.

In this tutorial, you’ll learn how to build a simplified version of that pipeline step by step.

---

## What You Are Going to Build

You will build a Node.js script that does the following:

- Fetches articles from RSS feeds.
- Extracts clean, readable text from each article.
- Filters out content you do not want to listen to.
- Cleans the text so it sounds good when spoken.
- Converts the text to natural-sounding audio using your own voice.
- Uploads the audio to Cloudflare R2.
- Generates a podcast RSS feed.
- Runs automatically on a schedule.

At the end, you will have a real podcast feed you can subscribe to on your phone.

![The generated podcast showing converted blog posts as episodes.](https://cdn.hashnode.com/res/hashnode/image/upload/v1768711883596/a35c2a6b-6f9f-4f3d-898f-0f9bff798e6e.png)

If you want to skip the tutorial and jump straight into using the finished tool, you can find the complete version and instructions on [Gi (<VPIcon icon="iconfont icon-github" />`iamspruce/postcast`)](https://github.com/iamspruce/postcast)tHub.

---

## Prerequisites

To follow along, you need basic JavaScript knowledge.

You also need:

- Node.js 22 or newer.
- A place to store audio files ([<VPIcno icon="fa-brands fa-cloudflare"/>Cloudflare](https://dash.cloudflare.com/) R2 in this tutorial).
- A text-to-speech API ([<VPIcon icon="fas fa-globe"/>OrangeClone](http://orangeclone.com) in this tutorial).

---

## Project Overview

Before writing code, it helps to understand the idea clearly.

This project is a pipeline:

```text
Fetch content -> Filter content -> Clean up content -> Convert to audio -> Repeat
```
<!-- TODO: mermaid화 -->

Each step takes the output of the previous one. Keeping the flow linear makes the project easier to reason about, debug, and automate.

All code in this tutorial lives in a single file called <VPIcon icon="fa-brands fa-js"/>`index.js`.

---

## Getting Started

Create a new project folder and your main file.

```sh
mkdir podcast-pipeline
cd podcast-pipeline
touch index.js
```

Initialize the project and install dependencies.

```sh
npm init -y
npm i rss-parser @mozilla/readability jsdom node-fetch uuid xmlbuilder @aws-sdk/client-s3
```

Enable ESM so `import` syntax works in Node 22.

```sh
npm pkg set type=module
```

Here is what each dependency is used for:

- `rss-parser` reads RSS feeds.
- `@mozilla/readability` extracts readable article text.
- `jsdom` provides a DOM for Readability.
- `node-fetch` fetches remote content.
- `uuid` generates unique filenames.
- `xmlbuilder` creates the podcast RSS feed.
- `@aws-sdk/client-s3` uploads audio to Cloudflare R2.

---

## How to Get the Content

The first decision is where your content comes from.

Avoid scraping websites directly. Scraped HTML is noisy and inconsistent. RSS feeds are structured and reliable. Most serious blogs provide one.

Open <VPIcon icon="fa-brands fa-js"/>`index.js` and define your sources.

```js title="index.js"
import Parser from "rss-parser";
import fetch from "node-fetch";
import { JSDOM } from "jsdom";
import { Readability } from "@mozilla/readability";

const parser = new Parser();

const NUMBER_OF_ARTICLES_TO_FETCH = 15;

const SOURCES = [
  "https://www.freecodecamp.org/news/rss/",
  "https://hnrss.org/frontpage",
];
```

Now fetch articles and extract readable content.

```js :collapsed-lines title="index.js"
async function fetchArticles() {
  const articles = [];

  for (const source of SOURCES) {
    const feed = await parser.parseURL(source);

    for (const item of feed.items.slice(0, NUMBER_OF_ARTICLES_TO_FETCH)) {
      if (!item.link) continue;

      const response = await fetch(item.link);
      const html = await response.text();

      const dom = new JSDOM(html, { url: item.link });
      const reader = new Readability(dom.window.document);
      const content = reader.parse();

      if (!content) continue;

      articles.push({
        title: item.title,
        link: item.link,
        content: content.content,
        text: content.textContent,
      });
    }
  }

  return articles.slice(0, NUMBER_OF_ARTICLES_TO_FETCH);
}
```

This function:

- Reads RSS feeds.
- Downloads each article.
- Extracts clean text using Readability.
- Returns a list of articles ready for processing.

---

## How to Filter the Content

Not every article deserves your attention. Start by filtering out topics you do not want to hear about.

```js title="index.js"
const BLOCKED_KEYWORDS = ["crypto", "nft", "giveaway"];

function filterByKeywords(articles) {
  return articles.filter(
    (article) =>
      !BLOCKED_KEYWORDS.some((keyword) =>
        article.text.toLowerCase().includes(keyword)
      )
  );
}
```

Next, remove promotional content.

```js title="index.js"
function removePromotionalContent(articles) {
  return articles.filter(
    (article) => !article.text.toLowerCase().includes("sponsored")
  );
}
```

Finally, remove articles that are too short.

```js title="index.js"
function filterByWordCount(articles, minWords = 700) {
  return articles.filter(
    (article) => article.text.split(/\s+/).length >= minWords
  );
}
```

After these steps, you are left with articles you actually want to listen to.

---

## How to Clean Up the Content

Raw articles text still need to be cleaned up to sound good when spoken. First, replace images with spoken placeholders.

```js title="index.js"
function replaceImages(html) {
  return html.replace(/<img[^>]*alt="([^"]*)"[^>]*>/gi, (_, alt) => {
    return alt ? `[Image: ${alt}]` : `[Image omitted]`;
  });
}
```

Next, remove code blocks.

```js title="index.js"
function replaceCodeBlocks(html) {
  return html.replace(
    /<pre><code>[\s\S]*?<\/code><\/pre>/gi,
    "[Code example omitted]"
  );
}
```

Strip URLs and replace them with spoken text.

```js title="index.js"
function replaceUrls(text) {
  return text.replace(/https?:\/\/\S+/gi, "link removed");
}
```

Normalize common symbols.

```js title="index.js"
function normalizeSymbols(text) {
  return text
    .replace(/&/g, "and")
    .replace(/%/g, "percent")
    .replace(/\$/g, "dollar");
}
```

Convert HTML to text so TTS does not read tags.

```js title="index.js"
function stripHtml(html) {
  return html.replace(/<[^>]+>/g, " ");
}
```

Combine everything into one cleanup step.

```js title="index.js"
function cleanArticle(article) {
  let cleaned = replaceImages(article.content);
  cleaned = replaceCodeBlocks(cleaned);
  cleaned = stripHtml(cleaned);
  cleaned = replaceUrls(cleaned);
  cleaned = normalizeSymbols(cleaned);

  return {
    ...article,
    cleanedText: cleaned,
  };
}
```

At this point, the text is ready for audio generation.

---

## How to Convert Content to Audio

Browser speech APIs sound robotic. I wanted something that sounded human and familiar. After trying several tools, I settled on OrangeClone. It was the only option that actually sounded like me.

Create a free account and copy your API key from the dashboard.

![OrangeClone dashboard with API key visible.](https://cdn.hashnode.com/res/hashnode/image/upload/v1768712061376/cd437cea-8957-4cb6-98c8-b5f6e520b57b.png)

Record 10 to 15 seconds of clean audio and save it as <VPIcon icon="fas fa-file-audio"/>`SAMPLE_VOICE.wav` in the project root. Then create a voice character (one-time setup).

```js title="index.js"
import fs from "node:fs/promises";

const ORANGECLONE_API_KEY = process.env.ORANGECLONE_API_KEY;
const ORANGECLONE_BASE_URL =
  process.env.ORANGECLONE_BASE_URL || "https://orangeclone.com/api";

async function createVoiceCharacter({ name, avatarStyle, voiceSamplePath }) {
  const audioBuffer = await fs.readFile(voiceSamplePath);
  const audioBase64 = audioBuffer.toString("base64");

  const response = await fetch(
    `${ORANGECLONE_BASE_URL}/characters/create`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${ORANGECLONE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        avatarStyle,
        voiceSample: {
          format: "wav",
          data: audioBase64,
        },
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to create character: ${errorText}`);
  }

  const data = await response.json();

  return (
    data.data?.id ||
    data.data?.characterId ||
    data.id ||
    data.characterId
  );
}
```

Generate audio from text.

```js title="index.js"
async function generateAudio(characterId, text) {
  const response = await fetch(`${ORANGECLONE_BASE_URL}/voices_clone`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${ORANGECLONE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      characterId,
      text,
    }),
  });

  return response.json();
}
```

Wait for the job to complete.

```js title="index.js"
async function waitForAudio(jobId) {
  while (true) {
    const response = await fetch(`${ORANGECLONE_BASE_URL}/voices/${jobId}`);
    const data = await response.json();

    if (data.status === "completed") {
      return data.audioUrl;
    }

    await new Promise((r) => setTimeout(r, 5000));
  }
}
```

---

## How to Upload the Audio to Cloudflare R2

OrangeClone returns an audio URL, but podcast apps need a stable, public file that will not expire.  
That is where Cloudflare R2 comes in.

R2 is S3-compatible storage, which means we can upload files using the AWS SDK and serve them publicly for podcast apps.

---

## How to Set Up Credentials

Create an R2 bucket in your Cloudflare dashboard and set the following environment variables:

- `R2_ACCOUNT_ID`
- `R2_ACCESS_KEY_ID`
- `R2_SECRET_ACCESS_KEY`
- `R2_BUCKET_NAME`
- `R2_PUBLIC_URL`

These values allow the script to upload files and generate public URLs for them.

---

## How to Initialize the R2 Client

```js title="index.js"
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const r2 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});
```

This creates an S3-compatible client that connects directly to your Cloudflare R2 account instead of AWS.

---

## How to Download the Audio

```js title="index.js"
async function downloadAudio(audioUrl) {
  const response = await fetch(audioUrl);
  const buffer = await response.arrayBuffer();
  return Buffer.from(buffer);
}
```

OrangeClone gives us a URL, not a file.  
This function downloads the audio and converts it into a Node.js buffer so it can be uploaded to R2. ---

## How to Upload to R2

```js title="index.js"
import { v4 as uuid } from "uuid";

async function uploadToR2(audioBuffer) {
  const fileName = `${uuid()}.mp3`;

  const command = new PutObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME,
    Key: fileName,
    Body: audioBuffer,
    ContentType: "audio/mpeg",
  });

  await r2.send(command);

  return `${process.env.R2_PUBLIC_URL}/${fileName}`;
}
```

This function uploads the audio buffer to R2 using a unique filename and returns a public URL that podcast apps can access.

---

## Putting It Together

```js title="index.js"
const audioUrl = await waitForAudio(jobId);
const audioBuffer = await downloadAudio(audioUrl);
const publicAudioUrl = await uploadToR2(audioBuffer);
```

At the end of this step, `publicAudioUrl` is the final audio file used in the podcast RSS feed.

---

## How to Make the Podcast

With public audio URLs, you can now generate an RSS feed.

```js title="index.js"
import xmlbuilder from "xmlbuilder";

function generatePodcastFeed(episodes) {
  const feed = xmlbuilder
    .create("rss", { version: "1.0" })
    .att("version", "2.0")
    .ele("channel");

  feed.ele("title", "My Tech Podcast");
  feed.ele("description", "Tech articles converted to audio");
  feed.ele("link", "https://your-site.com");

  episodes.forEach((ep) => {
    const item = feed.ele("item");
    item.ele("title", ep.title);
    item.ele("enclosure", {
      url: ep.audioUrl,
      type: "audio/mpeg",
    });
  });

  return feed.end({ pretty: true });
}
```

---

## How to Automate the Pipeline

Automation in this project happens in two stages. First, the code itself must be able to process multiple articles in one run. Second, the script must run automatically on a schedule. We’ll start with the code-level automation.

### Automating Inside the Code

Earlier, we fetched up to fifteen articles. Now we need to make sure every article that passes our filters goes through the full pipeline.

Add the following function near the bottom of <VPIcon icon="fa-brands fa-js"/>`index.js`.

```js :collapsed-lines title="index.js"
async function runPipeline() {
  const rawArticles = await fetchArticles();

  const filteredArticles = filterByWordCount(
    removePromotionalContent(filterByKeywords(rawArticles))
  );

  if (filteredArticles.length === 0) {
    console.log("No articles passed the filters");
    return [];
  }

  const characterId = await createVoiceCharacter({
    name: "My Voice",
    avatarStyle: "realistic",
    voiceSamplePath: "./SAMPLE_VOICE.wav",
  });

  const episodes = [];

  for (const article of filteredArticles) {
    console.log(`Processing: ${article.title}`);

    const cleaned = cleanArticle(article);

    const job = await generateAudio(characterId, cleaned.cleanedText);

    const audioUrl = await waitForAudio(job.id);
    const audioBuffer = await downloadAudio(audioUrl);
    const publicAudioUrl = await uploadToR2(audioBuffer);

    episodes.push({
      title: article.title,
      audioUrl: publicAudioUrl,
    });
  }

  return episodes;
}
```

This function does all the heavy lifting:

- Fetches articles
- Applies all filters
- Creates the voice character once
- Loops through every valid article
- Converts each article into audio
- Uploads the audio to Cloudflare R2
- Collects podcast episode data

At this point, one script run can generate multiple podcast episodes.

### Running the Pipeline and Generating the Feed

Now we need a single entry point that runs the pipeline and writes the podcast feed. Add this below the pipeline function.

```js title="index.js"
import fs from "node:fs/promises";

async function main() {
  const episodes = await runPipeline();

  if (episodes.length === 0) {
    console.log("No episodes generated");
    return;
  }

  const rss = generatePodcastFeed(episodes);

  await fs.mkdir("./public", { recursive: true });
  await fs.writeFile("./public/feed.xml", rss);

  console.log("Podcast feed generated at public/feed.xml");
}

main().catch(console.error);
```

When you run `node index.js`, this now:

- Processes all selected articles
- Creates multiple audio files
- Generates a valid podcast RSS feed

This is the core automation.

### Scheduling the Pipeline with GitHub Actions

The final step is to make this script run automatically. Create a GitHub Actions workflow file at <VPIcon icon="fas fa-folder-open"/>`.github/workflows/`<VPIcon icon="iconfont icon-yaml"/>`podcast.yml`.

```yaml title=".github/workflows/podcast.yml"
name: Podcast Pipeline

on:
  schedule:
    - cron: "0 6 * * *"

jobs:
  run:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
      - run: npm install
      - run: node index.js
        env:
          ORANGECLONE_API_KEY: ${{ secrets.ORANGECLONE_API_KEY }}
          R2_ACCOUNT_ID: ${{ secrets.R2_ACCOUNT_ID }}
          R2_ACCESS_KEY_ID: ${{ secrets.R2_ACCESS_KEY_ID }}
          R2_SECRET_ACCESS_KEY: ${{ secrets.R2_SECRET_ACCESS_KEY }}
          R2_BUCKET_NAME: ${{ secrets.R2_BUCKET_NAME }}
          R2_PUBLIC_URL: ${{ secrets.R2_PUBLIC_URL }}
```

This workflow runs the pipeline every morning at 6 AM.

Each run:

- Fetches new articles
- Generates fresh audio
- Updates the podcast feed

Once this is set up, your podcast updates itself without manual work.

---

## Conclusion

This is a basic version of my full production pipeline, [PostCast (<VPIcon icon="iconfont icon-github" />`iamspruce/postcast`)](https://github.com/iamspruce/postcast), but the core idea is the same.

You now know how to turn blogs into a personal podcast. Be mindful of copyright and only use content you are allowed to consume.

If you have questions, reach me on X at [<VPIcon icon="fa-brands fa-x-twitter" />`@sprucekhalifa`](https://x.com/sprucekhalifa). I write practical tech articles like this regularly.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Turn Your Favorite Tech Blogs into a Personal Podcast",
  "desc": "These days it feels almost impossible to keep up with tech news. I step away for three days, and suddenly there is a new AI model, a new framework, and a new tool everyone says I must learn. Reading everything no longer scales, but I still want to st...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-turn-your-favorite-blogs-into-personal-podcast.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
