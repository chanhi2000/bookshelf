---
lang: en-US
title: "How to Create an AI-Powered Bot that Can Post on Twitter/X"
description: "Article(s) > How to Create an AI-Powered Bot that Can Post on Twitter/X"
icon: fa-brands fa-node
category:
  - Node.js
  - AI
  - LLM
  - Google
  - Gemini
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - ai
  - aritificial-intelligence
  - llm
  - large-language-models
  - google
  - google-gemini
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Create an AI-Powered Bot that Can Post on Twitter/X"
    - property: og:description
      content: "How to Create an AI-Powered Bot that Can Post on Twitter/X"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-create-an-ai-powered-bot.html
prev: /programming/js-node/articles/README.md
date: 2025-04-24
isOriginal: false
author:
  - name: Arunachalam B
    url : https://freecodecamp.org/news/author/arunachalamb/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1745416845372/5eb9963d-e092-4844-99d9-01fa70032169.png
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
  "title": "Gemini > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/gemini/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Create an AI-Powered Bot that Can Post on Twitter/X"
  desc="These days, everyone wants to be a content creator. But it can be hard to find time to create and curate content, post on social media, build engagement, and grow your brand. And I’m not an exception to this. I wanted to create more content, and had ..."
  url="https://freecodecamp.org/news/how-to-create-an-ai-powered-bot"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1745416845372/5eb9963d-e092-4844-99d9-01fa70032169.png"/>

These days, everyone wants to be a content creator. But it can be hard to find time to create and curate content, post on social media, build engagement, and grow your brand.

And I’m not an exception to this. I wanted to create more content, and had an idea based on something I’ve observed. I subscribe to a few technology newsletters, and I read lots of updates every day about the tech ecosystem. But I’ve noticed that many of my peers often don’t seem to be aware of this news. So, I decided to post my top three news stories (especially about AI) on my Twitter/X account every day.

I did this for a couple of weeks, but after that I couldn’t find the time to keep it going. So, I did some research into how I could automate the process, and I found a solution. In this guide, I’ll explain the process so you can use it, too.

By the end of this tutorial, you’ll have created your own AI bot that:

- Fetches data from an API or crawls a webpage
- Processes the data using AI
- Posts the results on Twitter/X

And the great thing: this entire process is automated.

::: note Prerequisites

Before we begin creating a bot, you’ll need to have the following setup and tools ready to go:

- [<VPIcon icon="fa-brands fa-node"/>NodeJS](https://nodejs.org/en/learn/getting-started/introduction-to-nodejs) - A simple NodeJS app to code the bot

You’ll also need some API keys, secrets, and tokens. So, you’ll need to have the following accounts created:

- [<VPIcon icon="fa-brands fa-x-twitter"/>Twitter Developer](https://developer.x.com/) - To generate the Twitter/X API keys, secrets, and tokens
- [<VPIcon icon="fa-brands fa-google"/>Google AI Studio](https://aistudio.google.com/) - To generate the Gemini API key

:::

---

## How to Build the Bot

There are a number of steps I’ll walk you through to build your bot.

We’ll start by generating an API Key and Secret so we can use the Twitter/X API. Then we’ll generate an access token and access token secret with “Read and Write” permissions that’ll be able to post in your account. After that we’ll generate an API Key in Google Gemini (we’ll be using the Gemini API to process the data).

With all that taken care of, we’ll start working on the Node.js app. The app will be able to fetch data from an API, process the data using AI, and then post that data in the form of tweets on Twitter/X.

Finally, we’ll automate the entire process and schedule it to run daily.

### Step 1: Generate the Twitter API Key

::: tabs

@tab:active 1.

Navigate to [<VPIcon icon="fa-brands fa-x-twitter"/>Twitter Developer Website](https://developer.x.com/).

@tab 2.

Click on the “Developer Portal” in the top right:

![Image showing developer portal highlighted](https://cdn.hashnode.com/res/hashnode/image/upload/v1745152618491/214fe6d6-b699-40bb-8ac0-533b0c72b927.png)

@tab 3.

Signup using your account.

@tab 4.

You’ll be asked to fill out a form asking how will you use the Twitter API, and a few basic details. It may take up to 24 hours to get approved. But, it’s approved instantly for me.

![Form asking how you'll use the Twitter API](https://cdn.hashnode.com/res/hashnode/image/upload/v1745152170917/d2c2ba21-f3f5-4bc6-bdd5-58d222e203e6.png)

@tab 5.

After login, Navigate to "Projects and Apps" and under “Overview” click on "Create App":

![Create App screen](https://cdn.hashnode.com/res/hashnode/image/upload/v1745153184830/1a731639-0df2-47e3-baf2-3633e1735a69.png)

@tab 6.

Enter a name for your app and click “Next” to proceed with creating your app. At the end, you’ll be shown your API Key and Secret. Don’t copy that now.

@tab 7.

Click on the project you created from the left side drawer and click on the "Edit" option in “User authentication settings” section.

![Editing the user authentication settings section](https://cdn.hashnode.com/res/hashnode/image/upload/v1745153746932/002f3b38-5aaf-43ef-8d7c-0368f141524f.png)

@tab 8.

Select “Read and Write” in App Permissions section, “Web App, Automated App or Bot” in Type of App section, and enter your website URL (it can be any URL including http://localhost) in the “Callback URI” and “Website URL”. Then hit “Save”.

@tab 9.

Go to “Keys and tokens” tab.

@tab 10.

Click on “Regenerate” button in “API Key and Secret” section.

@tab 11.

Copy and save the API Key and Secret somewhere securely.

:::

### Step 2: Generate Access Token and Secret

::: tabs

@tab:active 1.

Go to “Keys and tokens” tab.

@tab 2.

Click on “Generate” or “Regenerate” button in “Access Token and Secret” section.

@tab 3.

Copy and save the Access Token and Secret somewhere securely.

![Generating or regenerating keys and tokens](https://cdn.hashnode.com/res/hashnode/image/upload/v1745154373207/4309dbcc-1081-46b7-be71-5babf950eae0.png)

:::

### Step 3: Generate an API Key in Google Gemini

::: tabs

@tab:active 1.

Navigate to [<VPIcon icon="fa-brands fa-google"/>Google AI Studio](https://aistudio.google.com/).

@tab 2.

Login to your account.

@tab 3.

Click on “Get API Key” button at the top right.

@tab 4.

Click on “Create API Key” button.

![Create API screen](https://cdn.hashnode.com/res/hashnode/image/upload/v1745154646809/54c4fa1a-097e-4bf6-8a5f-229c01845d28.png)

@tab 5.

Copy and save the API Key somewhere securely.

:::

Alright, we are done with creating the necessary API Keys and Secrets for our project. Let’s put on our coding shoes.

---

## Node.js Project Setup

There are 5 major steps for this part of the project. They are:

1. Fetch data from the API
2. Upload the data as a file to Gemini API
3. Prompt Gemini with the uploaded file to get the latest AI news
4. Post news to Twitter/X using their API
5. Delete the file uploaded in Gemini API

These are just the snippets of code that can be assembled together to run this project.

### Step 1: Fetch Data from the API

In my case, I’ll be using `techmeme.com` to get the latest news. But this site does not offer an API. So, I’ll be downloading the HTML of this site.

```js :collapsed-lines title="index.js"
async function fetchHtml(url) {
  console.log(`Fetching HTML from ${url}...`);
  try {
    const response = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });
    if (response.status !== 200) {
      throw new Error(`Failed to fetch HTML: Status code ${response.status}`);
    }
    console.log("HTML fetched successfully.");
    return response.data;
  } catch (error) {
    console.error(`Error fetching HTML from ${url}:`, error.message);
    throw error;
  }
}
```

<!-- TODO: https://gist.github.com/arunachalam-b/b204531fbfda5e805202b5f5ab5aa55d/raw/44c3911195469c15ce787e5fbefbda1ae0ccf388/index.js -->

In the `User-Agent` header, we pass the value that mimics a browser user agent to avoid potential blocks.

### Step 2: Upload the Data as a File to Gemini API

Now we need to store this HTML in a separate file. We cannot directly pass the HTML code in the prompt to the Gemini API, as it’ll result in an error. This is because Gemini accepts only a limited number of tokens in this API. The HTML code of any website will always result in huge number of tokens. So, we’ll create a separate file.

Upload the file to the Gemini API. Refer to the file id in the prompt to Gemini.

```js :collapsed-lines title="index.js"
async function uploadHtmlToGemini(htmlContent, filename = "techmeme.html") {
  console.log(`Uploading ${filename} to Gemini File API...`);
  const tempFilePath = path.join(os.tmpdir(), filename);

  try {
    await fs.writeFile(tempFilePath, htmlContent);
    console.log(`HTML saved temporarily to ${tempFilePath}`);

    const uploadResult = await ai.files.upload({
      file: tempFilePath,
      config: {
        mimeType: "	text/html",
        displayName: filename,
      },
    });

    fileName = uploadResult.name;

    console.log(
      `File uploaded successfully. File Name: ${fileName}, URI: ${uploadResult.uri}`
    );

    await fs.unlink(tempFilePath);
    console.log(`Temporary file ${tempFilePath} deleted.`);

    return uploadResult;
  } catch (error) {
    console.error("Error during file upload to Gemini:", error);
    try {
      await fs.access(tempFilePath);
      await fs.unlink(tempFilePath);
      console.log(`Temporary file ${tempFilePath} cleaned up after error.`);
    } catch (cleanupError) {
      console.warn(
        `Could not cleanup temporary file ${tempFilePath}: ${cleanupError.message}`
      );
    }
    throw new Error(
      `Failed to upload file to Gemini File API: ${error.message}`
    );
  }
}
```

<!-- TODO: https://gist.github.com/arunachalam-b/5ebfed570c79a0f0faa8c4e42559c673/raw/5fd1e4296c39f07ca08dd05c351a6bc181e94a81/index.js -->

### Step 3: Prompt Gemini to Get the Latest AI News

Let’s write a prompt to Gemini asking it to generate top news by referring to the HTML file provided. We’ll ask it to provide a headline, short description, URL, and three relevant hashtags for each tweet. We’ll also give some example data of how it should look. We’ll ask it to generate a structured response by providing the format of the JSON that we want the output to be.

You can use whatever model you want to, but I’ll be using the `gemini-2.5-pro-exp-03-25` model for this use case. I’m using this model because we need a thinking model that thinks and picks the correct top news - not just one that predicts the next token/word. The Gemini 2.5 Pro model best qualifies for this.

```js :collapsed-lines title="index.js"
async function extractAiNewsWithGemini(uploadedFile) {
  console.log("Sending HTML to Gemini for AI news extraction...");
  try {
    const prompt = `
            Analyze the content of the provided HTML file (${uploadedFile.displayName}), which contains the Techmeme homepage. Identify the top 3 news headlines specifically related to Artificial Intelligence (AI), Machine Learning (ML), Large Language Models (LLMs), Generative AI, or significant AI company news (like OpenAI, Anthropic, Google AI, Meta AI, etc.).
            For each of the top 3 AI news items, provide:
            1. The main headline text (title) not exceeding 60 characters.
            2. A short description (not exceeding 120 characters) summarizing the news.
            3. The direct URL (link) associated with that headline on Techmeme. Link to the news article source. 
            4. A list of 1-3 relevant hashtags (e.g., #Google, #Gemini, #LLM, #Llama, #Funding, #Research, #OpenAI, #ChatGPT, #Claude, #Sonnet, #Microsoft, #Techcrunch, #Bloomberg). Don't include #AI or #ArtificialIntelligence hashtags. If possible, include one hashtag of the publisher. 
            Return the result ONLY as a JSON array of objects, where each object has the keys "title", "short_description", "link", and "hashtags" (which is an array of strings). Do not include any explanations around the JSON. However, you may include emojis. 
            Also, give me a short content before these lines to start with and give me a short content asking the user to follow to receive more content at the end. 
            Here's an example: 
            Intro:
            From big price tags to free college perks, the AI world isn’t slowing down. Here are today’s top 3 stories you should know:
            Top 3 AI News:
            1️⃣ Google's Gemini 2.5 Pro Comes with a Premium Price Tag 💰
            Google reveals pricing for Gemini 2.5 Pro—its most expensive model yet—at $1.25 per million input tokens and $10 per million output tokens.
            (Source: TechCrunch - Maxwell Zeff)
            Because what's cutting-edge AI without a price that cuts deep?
            2️⃣ OpenAI Gives ChatGPT Plus to College Students for Free 🎓
            College students in the US and Canada can now access ChatGPT Plus for free until May 2025, in a clear jab at Anthropic’s campus push.
            (Source: VentureBeat - Michael Nuñez)
            Nothing says “future of education” like AI doing your homework—for free.
            3️⃣ Midjourney V7 Enters Alpha With a Whole New Brain 🧠
            Midjourney launches V7 in alpha, its first major model update in nearly a year, built on a “totally different architecture.”
            (Source: TechCrunch - Kyle Wiggers)
            Just when you mastered prompts, they dropped a new engine like it’s Fast & Furious: AI Drift.
            Outro:
            That’s a wrap on today’s AI buzz. Follow for more quick updates—minus the fluff. ⚡
        `;

    const response = await ai.models.generateContent({
      model: "models/gemini-2.5-pro-exp-03-25",
      contents: [
        createUserContent([
          prompt,
          createPartFromUri(uploadedFile.uri, uploadedFile.mimeType),
        ]),
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            intro: {
              type: Type.STRING,
              description: "Introduction to the post",
              nullable: false,
            },
            news_items: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: {
                    type: Type.STRING,
                    description:
                      "Title of the news not exceeding 60 characters",
                    nullable: false,
                  },
                  short_description: {
                    type: Type.STRING,
                    description:
                      "Short description of the news not exceeding 120 characters",
                    nullable: false,
                  },
                  link: {
                    type: Type.STRING,
                    description: "Link to the news article",
                    nullable: false,
                  },
                  hashtags: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.STRING,
                      description:
                        "Hashtags related to the news. Don't include #AI or #ArtificialIntelligence hashtags",
                      nullable: false,
                    },
                    minItems: 1,
                    maxItems: 3,
                  },
                },
                required: ["title", "link", "hashtags"],
              },
            },
            outro: {
              type: Type.STRING,
              description: "Conclusion of the post",
              nullable: false,
            },
          },
        },
      },
    });

    const text = response.text;

    console.log("Gemini response received", text);

    let cleanedText = text.trim();
    if (cleanedText.startsWith("```json")) {
      cleanedText = cleanedText.substring(7);
    }
    if (cleanedText.endsWith("```")) {
      cleanedText = cleanedText.substring(0, cleanedText.length - 3);
    }
    cleanedText = cleanedText.trim();

    let aiNews;
    try {
      aiNews = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error("Error parsing JSON response from Gemini:", parseError);
      console.error("Raw Gemini response text:", text);
      throw new Error("Failed to parse structured data from Gemini.");
    }

    if (!aiNews.intro || !aiNews.outro || !Array.isArray(aiNews.news_items)) {
      throw new Error(
        "Gemini response does not contain the expected structure."
      );
    }

    aiNews.news_items.forEach((item, index) => {
      if (
        !item.title ||
        !item.link ||
        !item.hashtags ||
        !Array.isArray(item.hashtags)
      ) {
        console.warn(
          `News item at index ${index} has missing or invalid fields:`,
          item
        );
      }
      if (item.link && item.link.startsWith("/")) {
        item.link = `https://techmeme.com${item.link}`;
      }
      const hashTags = item.hashtags?.map((hashtag) => {
        if (hashtag.startsWith("#")) {
          return hashtag;
        }
        return `#${hashtag}`;
      }) || [];
      item.hashtags = hashTags;
    });

    console.log(`Extracted ${aiNews.length} AI news items.`);
    const newsItems = aiNews.news_items;
    newsItems.slice(0, 3);
    aiNews.news_items = newsItems;
    return aiNews;
  } catch (error) {
    console.error("Error interacting with Gemini API:", error.message);
    if (error.response) {
      console.error("Gemini Error Details:", error.response);
    }
    throw error;
  }
}
```

<!-- TODO: [view raw]() [index.js](https://gist.github.com/arunachalam-b/466449de313bcbc4241eaf3b6e1646a7#file-index-js) hosted with ❤ by [GitHub](https://github.com) -->

### Step 4: Post Using the Twitter/X API

Here’s the core of our app. We need to post all the tweets we received from Gemini. We’ll be posting the tweet as a thread. This means that the first tweet will be the root tweet and subsequent tweets will be in the comments of the prior tweet. This makes it a thread.

To do this, we’ll take the id of each tweet after it’s posted and pass it on to the next tweet as a reference. One additional thing to note here is, after each successful tweet, we’ll give a pause of 5 seconds before posting the next tweet. There are few reasons for doing it this way.

1. When any script runs, it usually runs at a much higher speed (usually in milliseconds). So, the second tweet may get posted before the first tweet was posted (maybe due to some poor internet connection). Also, I believe Twitter implements some queue system which may quickly process the second tweet before your first. So it’s always better to leave a small gap - if not 5 seconds then at least 1 second
2. Twitter may have implemented some rate limiting mechanism. So if there are multiple request received from a same IP within a short time frame, they may block the IP and consider your account as spam.
3. Since we’re using a Free tier API, we are limited to 1500 tweets per month. If you’ve paid for this API, you won’t have to worry about this (since you’ll have a higher limit and the rate limiting mechanism -refer to point #2 - might not be applicable). All of this depends on their [<VPIcon icon="fa-brands fa-x-twitter"/>pricing](https://docs.x.com/x-api/introduction#access-levels), so just refer to that and make your call accordingly.

I’m using the free tier, and since it’s a hobby project, having a 5 seconds wait time makes sense. I have not faced any issues so far with this.

```js
async function postNewsToTwitter(aiNews) {
  if (!aiNews || aiNews.news_items.length === 0) {
    console.log("No news items to post.");
    return;
  }

  console.log(
    `Posting ${aiNews.news_items.length} news items to Twitter as a thread...`
  );

  let previousTweetId = null;

  let tweetText = aiNews.intro;
  tweetText += `\n\n#AI #ArtificialIntelligence #MachineLearning #LLM #GenerativeAI #OpenAI #Anthropic #GoogleAI #MetaAI #Gemini #Techmeme`;
  let postOptions = { text: tweetText };
  const { data: createdTweet } = await twitterUserClient.v2.tweet(postOptions);
  console.log(`Intro tweet posted successfully! ID: ${createdTweet.id}`);
  previousTweetId = createdTweet.id;

  await new Promise((resolve) => setTimeout(resolve, 5000));

  let hasError = false;

  for (let i = 0; i < aiNews.news_items.length; i++) {
    const item = aiNews.news_items[i];
    const hashtagString = item.hashtags.join(" ");
    let tweetText = `${item.title}\n\n${item.short_description}\n\n${item.link}\n\n${hashtagString}`;

    if (aiNews.news_items.length > 1) {
      // tweetText += `\n\n(${i + 1}/${aiNews.news_items.length})`;
    }

    if (tweetText.length > 280) {
      console.warn(
        `Tweet ${i + 1} might be too long (${
          tweetText.length
        } chars), attempting to post anyway...`
      );
    }

    try {
      console.log(`Posting tweet ${i + 1}: ${item.title}`);
      const postOptions = { text: tweetText };

      if (previousTweetId) {
        postOptions.reply = { in_reply_to_tweet_id: previousTweetId };
      }

      const { data: createdTweet } = await twitterUserClient.v2.tweet(
        postOptions
      );
      console.log(`Tweet ${i + 1} posted successfully! ID: ${createdTweet.id}`);
      previousTweetId = createdTweet.id;

      if (i < aiNews.news_items.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, 5000));
      }
    } catch (error) {
      hasError = true;
      console.error(`Error posting tweet ${i + 1}:`, error.message || error);
      if (error.data) {
        console.error("Twitter API Error Details:", error.data);
      }

      // if (i === 0) {
      //   console.error("Aborting further posts due to error.");
      //   break;
      // }
    }
  }

  if (!hasError) {
    await new Promise((resolve) => setTimeout(resolve, 5000));

    let tweetText = aiNews.outro;
    tweetText += `\n\n@AI_Techie_Arun`;

    postOptions = { text: tweetText };

    if (previousTweetId) {
      postOptions.reply = { in_reply_to_tweet_id: previousTweetId };
    }

    const { data: createdTweet } = await twitterUserClient.v2.tweet(
      postOptions
    );
    console.log(`Outro tweet posted successfully! ID: ${createdTweet.id}`);
    previousTweetId = createdTweet.id;
  }
  console.log("Finished posting thread.");
}
```

<!-- TODO: https://gist.github.com/arunachalam-b/b049fda9e567bc68c7fb33de0ce67cd3/raw/f9ab12c7172676f767aff382530265f856ddfbad/index.js -->

### Step 5: Delete the File Uploaded in the Gemini API

After posting all the tweets, it’s time to clean up the system. The only thing we need to do as a clean up is delete the uploaded file. It’s always a best practice to remove an unused file that’s no longer needed. And since we’ve already posted the tweets, we no longer need that file. So, we’ll be deleting it in this step.

```js :collapsed-lines title="index.js"
async function deleteFile(fileName) {
  if (fileName === "") {
    console.log("File not uploaded. Skipping deletion.");
    return;
  }

  try {
    console.log(`Deleting file ${fileName}...`);
    await ai.files.delete({
      name: fileName,
    });
    console.log(`File ${fileName} deleted successfully.`);
  } catch (error) {
    console.error("Error deleting file:", error.message);
  }
}
```

<!-- TODO: https://gist.github.com/arunachalam-b/741c5b13603187c76905f7b349661293/raw/5b3a3aab17b1fb06ad582f257fb104dfb73620b6/index.js -->

That’s it. We’re all done. You just need to copy these blocks of code into an `index.js` file and install some dependencies into the project and you should be good to go.

To make this even more simple, I have created a repo and made it public. Here’s the [Github repo URL (<VPIcon icon="iconfont icon-github"/>`arunachalam-b/existential-crisis-alert-bot`)](https://github.com/arunachalam-b/existential-crisis-alert-bot). You just need to clone the repo, install the dependencies, and run the `post` command

```sh
git clone https://github.com/arunachalam-b/existential-crisis-alert-bot.git
cd existential-crisis-alert-bot
npm i
```

Create a <VPIcon icon="fas fa-file-lines"/>`.env` file and update your API keys and secrets in that file:

```sh title=".env"
GEMINI_API_KEY=
TWITTER_API_KEY=
TWITTER_API_SECRET=
TWITTER_ACCESS_TOKEN=
TWITTER_ACCESS_TOKEN_SECRET=
```

Run the following command to post the latest AI news to your account:

```sh
npm run post
```

### The Result

![Here’s a sample output of that command](https://cdn.hashnode.com/res/hashnode/image/upload/v1745169397786/14e08ef8-dba5-45e0-a5d5-f3c6135c6347.png)

You can modify the code/prompt to fetch data from a different API and post the top results in your Twitter account.

---

## Conclusion

I hope you now understand how you can automate a slightly complex process using AI and some APIs. Just note that this example is not completely automated. You still have to manually run the command everyday to post the tweets.

But you can automate that process as well. Just drop me a message if you wish to know about that. That topic itself deserves to be a separate tutorial. Also, I would request that you give a star for my project if you enjoyed this tutorial.

Meanwhile, you can follow my [Twitter/X account (<VPIcon icon="fa-brands fa-x-twitter"/>`AI_Techie_Arun`)](https://x.com/AI_Techie_Arun) to receive the top AI news everyday. If you wish to learn more about automation, subscribe to [<VPIcon icon="fas fa-globe"/>my email newsletter](https://5minslearn.gogosoon.com/?ref=fcc_automated_tweet) and follow me on social media.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Create an AI-Powered Bot that Can Post on Twitter/X",
  "desc": "These days, everyone wants to be a content creator. But it can be hard to find time to create and curate content, post on social media, build engagement, and grow your brand. And I’m not an exception to this. I wanted to create more content, and had ...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-create-an-ai-powered-bot.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
