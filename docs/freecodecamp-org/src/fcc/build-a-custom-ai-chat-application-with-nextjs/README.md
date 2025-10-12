---
lang: en-US
title: "How to Build a Custom AI Chat Application with Next.js: Fine-Tune GPT Using Your Data"
description: "Article(s) > How to Build a Custom AI Chat Application with Next.js: Fine-Tune GPT Using Your Data"
icon: iconfont icon-nextjs
category:
  - Node.js
  - Next.js
  - AI
  - LLM
  - OpenAI
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - next
  - nextjs
  - next-js
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
  - openai
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build a Custom AI Chat Application with Next.js: Fine-Tune GPT Using Your Data"
    - property: og:description
      content: "How to Build a Custom AI Chat Application with Next.js: Fine-Tune GPT Using Your Data"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-a-custom-ai-chat-application-with-nextjs.html
prev: /programming/js-next/articles/README.md
date: 2025-10-07
isOriginal: false
author:
  - name: Sharvin Shah
    url : https://freecodecamp.org/news/author/Sharvin26/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1759834368425/fc26010c-077e-4af9-86cd-e16f1c218560.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Next.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-next/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "OpenAI > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/openai/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build a Custom AI Chat Application with Next.js: Fine-Tune GPT Using Your Data"
  desc="In 2025, AI-powered applications have advanced from generic chatbots to highly specialised assistants that understand your specific field, communicate in your style, and give contextually relevant answers. While Large Language Models (LLMs) like GPT-..."
  url="https://freecodecamp.org/news/build-a-custom-ai-chat-application-with-nextjs"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1759834368425/fc26010c-077e-4af9-86cd-e16f1c218560.png"/>

In 2025, AI-powered applications have advanced from generic chatbots to highly specialised assistants that understand your specific field, communicate in your style, and give contextually relevant answers. While Large Language Models (LLMs) like GPT-5 have impressive general abilities, there is an increasing demand for AI that deeply understands particular businesses, personal brands, or specialised areas of knowledge.

Imagine having an AI assistant that not only knows about web development in general but also understands your specific coding style, knows your project history, and can answer questions in your voice. This isn't science fiction - it's what fine-tuning makes possible today.

In this tutorial, you'll learn how to fine-tune OpenAI's latest GPT-4.1 models and create a production-ready chat application using Next.js 15. I will guide you through the entire process: from preparing your dataset and submitting it for fine-tuning, to building a sleek chat interface that uses your custom model.

I'll show you this process using content from my agency website, mtechzilla.com, as example data. You'll learn how to scrape, clean, and format real-world content for training. Naturally, you'll want to use your own data - whether it's documentation, blog posts, customer support transcripts, or any other text that reflects the knowledge and style you want your AI to have.

This tutorial is for developers who are familiar with React and Node.js but are new to fine-tuning AI models. By the end, you'll have a fully functional, custom AI chat application ready to deploy.

As of September 2025, fine-tuning GPT-5 is not supported yet. This tutorial uses GPT-4.1. When GPT-5 fine-tuning becomes available, you'll mainly need to change the base model name.

---

## Understanding Fine-Tuning

Before we jump into the code, let's explain what fine-tuning really means and when it's the best option for your project.

Fine-tuning means taking a pre-trained language model and training it further with your specific dataset. It's like teaching a smart student about your particular area of expertise and communication style. The model retains its general knowledge but becomes specialised in your field.

This is quite different from other methods of customising AI behavior. Retrieval-Augmented Generation (RAG) involves providing relevant context to the model when a query is made, similar to giving someone reference materials to use while answering questions. Prompt engineering, on the other hand, involves creating smart instructions to direct the model's behavior without any additional training. Fine-tuning, however, results in a model that has deeply learned and internalised your data.

The trade-offs in 2025 are clearer than ever. Fine-tuning requires an upfront investment in data preparation and training costs, but it leads to faster inference, no need for context injection, and a more consistent personality. RAG systems are cheaper to set up and easier to update, but they need vector databases and can have trouble matching nuanced styles. Prompt engineering is free and immediate, but it limits how much customisation you can achieve.

As of September 2025, OpenAI supports supervised fine-tuning for three new models: GPT-4.1, GPT-4.1-mini, and GPT-4.1-nano. Each model has different capabilities and costs. GPT-4.1-nano is the most affordable option, ideal for simpler tasks. GPT-4.1-mini balances performance and cost, while GPT-4.1 offers the highest intelligence for complex, domain-specific applications.

Fine-tuning is best when you need a consistent voice and style, have specialised knowledge not well-covered by the base model, want to reduce delay by removing context injection, or need to ensure specific behaviours without complicated prompts. If your needs involve frequently changing information, simple factual lookups, or only occasional customisation, consider using RAG or prompt engineering instead.

::: note Prerequisites

Before we begin, make sure you have the following tools and accounts set up:

1. Node.js v22+ and npm (check with `node --version`)
2. Basic JavaScript knowledge for the scripts
3. Familiarity with React and TypeScript for the web app
4. An OpenAI API key with billing enabled (get one at [<FontIcon icon="iconfont icon-openai"/>platform.openai.com/docs/overview](https://platform.openai.com/docs/overview))
5. A code editor

You'll also need some content to train your model on. This could be blog posts, documentation, transcripts, or any text that represents the knowledge and style you want to impart to your AI.

:::

If you get stuck, you can check the GitHub repository for assistance or contact me (I'm happy to help fellow developers).

::: info Repository link

<SiteInfo
  name="Sharvin26/ai-fine-tuning-project"
  desc="Contribute to Sharvin26/ai-fine-tuning-project development by creating an account on GitHub."
  url="https://github.com/Sharvin26/ai-fine-tuning-project/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/f3e662f74a2db70647dc1d47ccac59b97312682be569695bdbdbd8baaafe8321/Sharvin26/ai-fine-tuning-project"/>

:::

## Table of Contents

- [Step 1: Dataset Preparation](#heading-step-1-dataset-preparation)
- [Step 2: Fine-Tuning Submission](#heading-step-2-fine-tuning-submission)
- [Step 3: Next.js Application Setup](#heading-step-3-nextjs-application-setup)
- [Step 4: Building the Chat Interface](#heading-step-4-building-the-chat-interface)
- [Step 5: API Route Integration](#heading-step-5-api-route-integration)
- [Step 6: Testing Your Application](#heading-step-6-testing-your-application)

---

## Step 1: Dataset Preparation

The key to a successful fine-tuning project is having a well-prepared dataset. OpenAI needs training data in JSONL (JSON Lines) format, where each line is a complete JSON object representing a conversation. JSONL is a format where each line is a separate JSON object, which is great for handling large datasets efficiently. It allows for easy streaming and handling of data, making it ideal for machine learning tasks.

The JSONL structure that OpenAI requires for fine-tuning is as follows:

```json
{
  "messages":[
    {
      "role":"system",
      "content":"You are a helpful assistant."
    },
    {
       "role":"user",
       "content":"What is React?"
    },
    {
       "role":"assistant",
       "content":"React is a JavaScript library..."
    }
  ]
}
```

Each line represents a complete conversation. For fine-tuning to be effective, you need at least 10 examples, though 50-100 typically yields better results.

Let's build a Node.js scraper that extracts content from a website and converts it into the proper format.

First, let's set up our scripts folder structure:

```sh
mkdir ai-fine-tuning-project
cd ai-fine-tuning-project
mkdir scripts
cd scripts
npm init -y
npm install cheerio axios dotenv openai
touch scraper.js fine-tune.js .gitignore .env
```

Open the <FontIcon icon="fas fa-folder-open"/>`ai-fine-tuning-project` in a code editor and copy the following values into a <FontIcon icon="fas fa-file-lines"/>`.env` file in the scripts folder.

```sh title=".env"
OPENAI_API_KEY=sk-...your-api-key-here...
OPENAI_ORG_ID=org-...your-org-id...
```

Update the ENV variables with a valid API Key and Org ID from OpenAI.

1. Generate an API Key using this guide: [<FontIcon icon="iconfont icon-openai"/>Where do I find my OpenAI API Key?](https://help.openai.com/en/articles/4936850-where-do-i-find-my-openai-api-key). Here are the best practices to keep your API Key safe: [<FontIcon icon="iconfont icon-openai"/>Best Practices for API Key Safety](https://help.openai.com/en/articles/5112595-best-practices-for-api-key-safety).
2. You can find your OpenAI Org ID here: [<FontIcon icon="iconfont icon-openai"/>OpenAI Organization Settings](https://platform.openai.com/settings/organization/general).

Add the following code to the <FontIcon icon="iconfont icon-git"/>`.gitignore` file:

```sh title=".gitignore"
# Environment variables
.env
.env.local
.env.*.local

# Dependencies
node_modules/

# Logs
*.log
logs/

# Cache and temporary files
.cache/
temp/
tmp/

# OS files
.DS_Store
Thumbs.db

# IDE files
.vscode/
.idea/
*.swp
*.swo
```

Update the scraper script (<FontIcon icon="fa-brands fa-js"/>`scraper.js`) with the following code:

```js :collapsed-lines title="scraper.js"
const cheerio = require("cheerio");
const axios = require("axios");
const fs = require("fs");
const OpenAI = require("openai");
require("dotenv").config();

const config = {
  urls: [
    {
        url: "https://www.mtechzilla.com/",
        contentType: "general",
    },
    {
        url: "https://www.mtechzilla.com/company/about-us",
        contentType: "about",
    },
    {
        url: "https://www.mtechzilla.com/services",
        contentType: "services",
    },
  ],
  openai: {
    apiKey: process.env.OPENAI_API_KEY,
    model: "gpt-5",
    trainingExamples: 50,
  },
  outputFile: "training_data.jsonl",
};

class AIScraper {
  constructor(config) {
      this.urls = config.urls;
      this.openaiConfig = config.openai;
      this.outputFile = config.outputFile;
      this.scrapedContent = [];
      this.trainingData = [];
      this.openai = new OpenAI({
        apiKey: this.openaiConfig.apiKey,
      });
      this.totalCost = 0;
  }

  async fetchPage(url) {
    try {
      const response = await axios.get(url, {
        timeout: 30000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; AI-Training-Data-Scraper/1.0)'
        }
      });
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch ${url}: ${error.message}`);
      return null;
    }
  }

  extractContent(html, urlConfig) {
    const $ = cheerio.load(html);

    $('script, style, nav, header, footer').remove();
    $('[class*="cookie"], [class*="popup"], [class*="ad"]').remove();
    $('button, .btn').remove();

    const headings = [];
    $('h1, h2, h3, h4').each((_, elem) => {
      const text = $(elem).text().trim();
      if (text.length > 3 && text.length < 200) {
        headings.push(text);
      }
    });

    const paragraphs = [];
    $('p').each((_, elem) => {
      const text = $(elem).text().trim();
      if (text.length > 20) {
        paragraphs.push(text);
      }
    });

    const listItems = [];
    $('ul li, ol li').each((_, elem) => {
      const text = $(elem).text().trim();
      if (text.length > 5 && text.length < 200) {
        listItems.push(text);
      }
    });

    return {
      url: urlConfig.url,
      contentType: urlConfig.contentType,
      title: $('title').text().trim(),
      metaDescription: $('meta[name="description"]').attr('content') || '',
      headings: headings.slice(0, 10),
      paragraphs: paragraphs.slice(0, 15),
      listItems: listItems.slice(0, 20)
    };
  }

    formatContentForPrompt(content) {
      let formattedContent = `URL: ${content.url}\n`;
      formattedContent += `Content Type: ${content.contentType}\n`;
      formattedContent += `Title: ${content.title}\n\n`;

      if (content.metaDescription) {
        formattedContent += `Description: ${content.metaDescription}\n\n`;
      }

      if (content.headings.length > 0) {
        formattedContent += `Headings:\n${content.headings.map(h => `- ${h}`).join('\n')}\n\n`;
      }

      if (content.paragraphs.length > 0) {
        formattedContent += `Content:\n${content.paragraphs.join('\n\n')}\n\n`;
      }

      if (content.listItems.length > 0) {
        formattedContent += `Features/Services:\n${content.listItems.map(item => `- ${item}`).join('\n')}\n\n`;
      }

      return formattedContent;
    }

    async generateTrainingDataWithAI() {
      const allContent = this.scrapedContent.map(content => 
        this.formatContentForPrompt(content)
      ).join('\n' + '='.repeat(50) + '\n');

      const prompt = `Based on the website content below, generate ${this.openaiConfig.trainingExamples} diverse, natural Q&A pairs for training a customer service chatbot.

Website Content:
${allContent}

Create varied questions a real customer might ask, including:
- Company/business information
- Services or products offered  
- Contact and support questions
- General greetings and conversational questions
- FAQ-style questions

Make questions natural and human-like. Generate accurate answers based ONLY on the provided website content. Keep answers concise but informative.

Return a JSON object with a "training_data" array containing the Q&A pairs.`;

      try {
        const response = await this.openai.chat.completions.create({
          model: this.openaiConfig.model,
          messages: [
            {
              role: "system",
              content: "You are an expert at creating training data for AI chatbots. Always return valid JSON. Output your final JSON response directly without any reasoning or explanation."
            }, {
              role: "user",
              content: prompt,
            },
          ],
          response_format: { 
            type: "json_schema",
            json_schema: {
              name: "training_data_generation",
              schema: {
                type: "object",
                properties: {
                  training_data: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        question: {
                          type: "string",
                          description: "A natural question a customer might ask"
                        },
                        answer: {
                          type: "string", 
                          description: "An accurate answer based on the website content"
                        }
                      },
                      required: ["question", "answer"]
                    }
                  }
                },
                required: ["training_data"]
              }
            }
          }
        });

        const generatedContent = response.choices[0].message.content?.trim();

        const actualInputTokens = response.usage.prompt_tokens;
        const actualOutputTokens = response.usage.completion_tokens;
        const actualCost = (actualInputTokens * 1.25 / 1000000) + (actualOutputTokens * 10 / 1000000);
        this.totalCost += actualCost;

        if (!generatedContent) {
          throw new Error("No content generated in response");
        }

        const structuredData = JSON.parse(generatedContent);
        const validTrainingData = [];

        if (structuredData.training_data && Array.isArray(structuredData.training_data)) {
          structuredData.training_data.forEach(item => {
            if (item.question && item.answer) {
              validTrainingData.push({
                messages: [
                  {
                    role: "system",
                    content: "You are a helpful assistant. Answer questions accurately based on the website content."
                  }, {
                    role: "user", 
                    content: item.question
                  }, {
                    role: "assistant",
                    content: item.answer
                  }
                ]
              });
            }
          });
        }

        this.trainingData = validTrainingData;
        console.log(`Generated ${validTrainingData.length} training examples`);

      } catch (error) {
        console.error(`OpenAI API error: ${error.message}`);
        throw error;
      }
    }

    async scrape() {
      console.log(`Starting scraper for ${this.urls.length} URLs`);

      for (const urlConfig of this.urls) {
        const html = await this.fetchPage(urlConfig.url);

        if (html) {
          const content = this.extractContent(html, urlConfig);
          this.scrapedContent.push(content);
          console.log(`Scraped: ${content.title || urlConfig.url}`);
        }

        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      if (this.scrapedContent.length === 0) {
        throw new Error("No content scraped successfully");
      }

      await this.generateTrainingDataWithAI();

      console.log(`Scraped ${this.scrapedContent.length} pages, generated ${this.trainingData.length} examples`);
      console.log(`Total cost: $${this.totalCost.toFixed(4)}`);
    }

    saveToFile() {
      if (this.trainingData.length === 0) {
        console.error("No training data to save!");
        return;
      }

    const jsonl = this.trainingData
      .map(example => JSON.stringify(example))
      .join('\n');

    fs.writeFileSync(this.outputFile, jsonl);
    console.log(`Saved ${this.trainingData.length} examples to ${this.outputFile}`);
  }
}

async function main() {
    try {
        if (!config.openai.apiKey) {
            console.error("Please set your OpenAI API key in .env file");
            return;
        }

        const scraper = new AIScraper(config);
        await scraper.scrape();
        scraper.saveToFile();

        console.log("Scraping complete!");

    } catch (error) {
        console.error("Error:", error.message);
    }
}

main();
```

If you used a version of Node.js before 22, you might encounter issues when running the script. The recommended version is `v22.18.0`.

This code sets up an automated system for web scraping and creating AI-powered training data. It generates training datasets from website content. The script uses Cheerio to parse HTML from given URLs, extracting useful information like headings, paragraphs, and list items while ignoring unnecessary parts like scripts, navigation menus, and ads. After gathering the content, it uses OpenAI's API (configured to use GPT-4.1 with structured JSON output) to intelligently create natural question-and-answer pairs for fine-tuning purposes.

The generated Q&A pairs are formatted into JSONL files according to OpenAI's fine-tuning format. Each entry includes a system message, a user question, and an assistant response. The scraper also has useful features like rate limiting between requests, error handling, and cost tracking based on token usage ($1.25 per million input tokens and $10 per million output tokens). This allows you to keep track of expenses while generating training data.

However, this is a basic script that can be improved based on your website's design, audience, and goals. While it extracts various content sections and creates diverse question-and-answer pairs, you'll need to manually check the output to ensure quality and correct formatting, as OpenAI will reject improperly formatted data. In production environments, this verification process can be automated by updating the script with additional validation logic and quality checks.

Now, let's create our <FontIcon icon="iconfont icon-json"/>`training_data.jsonl` file by running our scraper:

```sh
node scraper.js
```

You should see the following output:

```plaintext title="output"
Starting scraper for 3 URLs
Scraped: MTechZilla: Custom Software and App Development Company
Scraped: About MTechZilla | Custom Software Development Agency
Scraped: Expert App & Web Development Services | MTechZilla
Generated 50 training examples
Scraped 3 pages, generated 50 examples
Total cost: $0.0632
Saved 50 examples to training_data.jsonl
Scraping complete!
```

::: tip Pro tip

Quality is more important than quantity. Review the generated <FontIcon icon="iconfont icon-json"/>`training_data.jsonl` file and refine any examples that don't accurately reflect the content or tone you want your AI to adopt.

:::

---

## Step 2: Fine-Tuning Submission

With our dataset prepared, let's create a script to submit it to OpenAI for fine-tuning. We'll use the GPT-4.1 models and handle the entire process from upload to completion.

Update the fine-tuning script (<FontIcon icon="fa-brands fa-js"/>`fine-tune.js`):

```js :collapsed-lines title="fine-tune.js"
const OpenAI = require("openai");
const fs = require("fs");
require("dotenv").config();

const CONFIG = {
  // Choose your base model for fine-tuning
  MODEL: "gpt-4.1-nano-2025-04-14", // Options: gpt-4.1-nano-2025-04-14, gpt-4.1-mini-2025-04-14, gpt-4.1-2025-04-14

  // Training file path
  TRAINING_FILE: "training_data.jsonl",

  // Polling interval for job status (in milliseconds)
  POLL_INTERVAL: 30000, // 30 seconds
};

class FineTuningManager {
  constructor() {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY environment variable is required");
    }

    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      organization: process.env.OPENAI_ORG_ID,
    });
  }

  // Step 1: Validate training data format
  validateTrainingData() {
    console.log("🔍 Validating training data format...");

    if (!fs.existsSync(CONFIG.TRAINING_FILE)) {
      throw new Error(`Training file not found: ${CONFIG.TRAINING_FILE}`);
    }

    const content = fs.readFileSync(CONFIG.TRAINING_FILE, "utf-8");
    const lines = content.split("\n").filter(line => line.trim());

    if (lines.length < 10) {
      throw new Error(`Need at least 10 examples. Found: ${lines.length}`);
    }

    let validExamples = 0;
    lines.forEach((line, index) => {
      try {
        const data = JSON.parse(line);

        // Validate JSONL structure as per OpenAI documentation
        if (!data.messages || !Array.isArray(data.messages) || data.messages.length < 2) {
          throw new Error(`Invalid structure at line ${index + 1}`);
        }

        // Check for required roles
        const hasUser = data.messages.some(m => m.role === 'user');
        const hasAssistant = data.messages.some(m => m.role === 'assistant');

        if (!hasUser || !hasAssistant) {
          throw new Error(`Missing user or assistant message at line ${index + 1}`);
        }

        validExamples++;
      } catch (e) {
        console.warn(`⚠️ Skipping line ${index + 1}: ${e.message}`);
      }
    });

    if (validExamples < 10) {
      throw new Error(`Need at least 10 valid examples. Found: ${validExamples}`);
    }

    console.log(`✅ Validation passed: ${validExamples} valid examples`);
    return validExamples;
  }

  // Step 2: Upload training file to OpenAI
  async uploadTrainingFile() {
    console.log("📤 Uploading training file...");

    const file = await this.openai.files.create({
      file: fs.createReadStream(CONFIG.TRAINING_FILE),
      purpose: "fine-tune",
    });

    console.log(`✅ File uploaded: ${file.id}`);
    return file.id;
  }

  // Step 3: Create fine-tuning job
  async createFineTuningJob(fileId) {
    console.log(`🚀 Creating fine-tuning job with model: ${CONFIG.MODEL}`);

    const job = await this.openai.fineTuning.jobs.create({
      training_file: fileId,
      model: CONFIG.MODEL,
      method: {
        type: "supervised"
      }
    });

    console.log(`✅ Fine-tuning job created: ${job.id}`);
    return job.id;
  }

  // Step 4: Monitor job until completion
  async monitorJob(jobId) {
    console.log("⏳ Monitoring fine-tuning job...");
    console.log("This typically takes 10-30 minutes...\n");

    while (true) {
      const job = await this.openai.fineTuning.jobs.retrieve(jobId);

      console.log(`Status: ${job.status}`);

      if (job.status === "succeeded") {
        console.log("\n🎉 Fine-tuning completed successfully!");
        console.log(`🎆 Your fine-tuned model ID: ${job.fine_tuned_model}`);
        return job.fine_tuned_model;
      } 

      if (job.status === "failed") {
        throw new Error(`Fine-tuning failed: ${job.error?.message || 'Unknown error'}`);
      }

      if (job.status === "cancelled") {
        throw new Error("Fine-tuning was cancelled");
      }

      // Wait before checking again
      await new Promise(resolve => setTimeout(resolve, CONFIG.POLL_INTERVAL));
    }
  }

  // Complete supervised fine-tuning workflow
  async runFineTuning() {
    try {
      console.log("🤖 Starting OpenAI Supervised Fine-Tuning\n");
      console.log(`📋 Using model: ${CONFIG.MODEL}`);
      console.log(`📄 Training file: ${CONFIG.TRAINING_FILE}\n`);

      // Step 1: Validate data
      const validExamples = this.validateTrainingData();

      // Step 2: Upload file
      const fileId = await this.uploadTrainingFile();

      // Step 3: Create job
      const jobId = await this.createFineTuningJob(fileId);

      // Step 4: Monitor completion
      const modelId = await this.monitorJob(jobId);

      console.log("\n" + "=".repeat(60));
      console.log("SUCCESS! Your fine-tuned model is ready!");
      console.log("=".repeat(60));
      console.log(`\n Model ID: ${modelId}`);
      console.log(`Trained on ${validExamples} examples`);
      console.log("\n Next steps:");
      console.log("1. Copy the Model ID above");
      console.log("2. Use it in your application to access your custom model");

      return modelId;

    } catch (error) {
      console.error(`\n❌ Fine-tuning failed: ${error.message}`);

      if (error.message.includes("not found")) {
        console.log("💡 Tip: Make sure training_data.jsonl exists in the current directory");
      } else if (error.message.includes("API_KEY")) {
        console.log("💡 Tip: Set OPENAI_API_KEY in your .env file");
      }

      throw error;
    }
  }
}

// Main execution
async function main() {
  const manager = new FineTuningManager();
  await manager.runFineTuning();
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = FineTuningManager;
```

This script manages the entire fine-tuning process once your training data is ready from the scraper. It works as an automated manager, taking your JSONL training file and turning it into a custom OpenAI model designed for your specific needs. The process begins with thorough validation, ensuring your training file exists, has at least 10 valid examples, and follows OpenAI's required format with correct message roles (user and assistant). This validation step is important because OpenAI will reject data that isn't formatted correctly, so identifying issues early saves you time and API costs.

This script provides a complete fine-tuning workflow with the new GPT-4.1 models. You can choose from nano (cheapest), mini (balanced), or full (most capable) models, depending on your needs and budget. Once validation is successful, the script uploads your training file to OpenAI's servers and starts a fine-tuning job using your selected base model. The script uses supervised fine-tuning, which means your model learns directly from the question-answer pairs you provided, adjusting its responses to fit your website's information and tone.

The easiest part is the monitoring phase, where the script automatically checks the fine-tuning job status every 30 seconds until it's done. Fine-tuning usually takes 10-30 minutes, depending on your dataset size and the base model you chose. During the process, you'll get clear status updates in the console. Once it's finished, the script gives you your custom model ID, which you can use right away in your applications. It also provides helpful error messages and tips if something goes wrong, like reminding you to check your API key or verify that your training file exists.

Now let's submit our `training_data.jsonl` file for fine-tuning with the following command:

```sh
node fine-tune.js
```

You should see the following output:

```plaintext title="output"
🎉 Fine-tuning completed successfully!
🎆 Your fine-tuned model ID: ft:gpt-4.1-nano-2025-04-14:...

============================================================
SUCCESS! Your fine-tuned model is ready!
============================================================

 Model ID: ft:ft:gpt-4.1-nano-2025-04-14:...
Trained on 50 examples

 Next steps:
1. Copy the Model ID above
2. Use it in your application to access your custom model
```

::: tip Pro tip

Start with the nano model to test your dataset and workflow. It's the most cost-effective option and often enough for domain-specific knowledge. You can always train with a larger model later by updating configuration in <FontIcon icon="fa-brands fa-js"/>`fine-tune.js`.

:::

---

## Step 3: Next.js Application Setup

Now that our model is trained, let's build a modern chat application. We'll set up a separate web folder with a Next.js app using TypeScript and shadcn/ui for components.

First, navigate back to the project root:

```sh
cd ..
```

Then create the web application:

```sh
npx create-next-app@latest web
```

Choose the following options during the setup:

```plaintext title="output"
✔ Would you like to use TypeScript? › Yes
✔ Which linter would you like to use? › ESLint
✔ Would you like to use Tailwind CSS? › Yes
✔ Would you like your code inside a `src/` directory? › Yes
✔ Would you like to use App Router? (recommended) › Yes
✔ Would you like to use Turbopack? (recommended) › No
✔ Would you like to customize the import alias (`@/*` by default)? › No
```

Navigate to the web directory:

```sh
cd web
```

Install the required packages using the following command:

```sh
npm install ai @ai-sdk/openai @ai-sdk/react openai lucide-react
```

Now let's set up shadcn/ui for beautiful components:

```sh
npx shadcn@latest init
```

Choose the following option during the setup:

```plaintext title="output"
✔ Which color would you like to use as the base color? › Slate
```

And add the following shadcn components:

```sh
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add scroll-area
npx shadcn@latest add avatar
```

Create the <FontIcon icon="fas fa-file-lines"/>`.env.local` file using the following command:

```sh
touch .env.local
```

Add your environment variables in <FontIcon icon="fas fa-folder-open"/>`web/`<FontIcon icon="fas fa-file-lines"/>`.env.local`:

```sh title="web/.env.local"
OPENAI_API_KEY=sk-...your-api-key...
OPENAI_ORG_ID=org-...your-org-id...
FINE_TUNED_MODEL=ft:gpt-4.1-nano-2025-04-14:... # Your model ID from fine-tuning
```

In the <FontIcon icon="fas fa-folder-open"/>`src` directory, create a new folder named <FontIcon icon="fas fa-folder-open"/>`types`. Inside this folder, create a file called <FontIcon icon="iconfont icon-typescript"/>`chat.ts` and copy and paste the following code:

```ts title="web/src/types/chat.ts"
export interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  createdAt?: Date;
}

export interface ChatRequest {
  messages: Message[];
  model?: string;
}

export interface ChatResponse {
  message: Message;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}
```

This TypeScript code defines the data structures (interfaces) for a chat application, setting a standard for how messages and API interactions should be formatted in your app. The `Message` interface specifies what each chat message must include: a unique ID, a role indicating if it's from the user, assistant, or system, the message content, and an optional timestamp. The `ChatRequest` interface organizes the data you send to your fine-tuned model, including an array of messages (the conversation history) and an optional model parameter to specify which fine-tuned model to use.

Finally, the `ChatResponse` interface defines what you'll receive from the API: the assistant's reply message and optional usage statistics that show how many tokens were used for prompts and completions. This helps you track costs. By defining these interfaces, TypeScript ensures type safety throughout your application, catching errors during development and providing autocomplete suggestions in your code editor. This makes your chat application more robust and easier to maintain.

Update the <FontIcon icon="fas fa-folder-open"/>`app/`<FontIcon icon="fa-brands fa-react"/>`layout.tsx` with meta information and chat layout:

```tsx title="web/app/layout.tsx"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Chat - Powered by Custom Fine-Tuned Model",
  description: "Chat with an AI trained on custom content",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${inter.className} h-full bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900`}
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  );
}
```

This code sets up the root layout for a Next.js application, acting as a wrapper around every page in your chat app. It starts by importing the Inter font from Google Fonts and configures it to use Latin characters, giving your application a clean, modern appearance.

The `metadata` object sets the page title and description that appear in browser tabs and search engine results, which is important for SEO and user experience. The `RootLayout` component brings everything together: it wraps all your app's pages (using the `children` prop) in a consistent HTML structure with full-height styling (`h-full`) and a pleasant gradient background. This background changes from light slate tones in light mode to dark slate in dark mode, automatically matching the user's system settings. The `suppressHydrationWarning` attribute addresses a common Next.js issue where server-rendered HTML might slightly differ from client-rendered HTML (often due to things like timestamps or theme detection), preventing console warnings.

This layout ensures that every page in your chat application shares the same basic styling, typography, and metadata, so you don't need to repeat the code on each page. It gives us a solid foundation with TypeScript for type safety, shadcn/ui for standard components, effective management of environment variables, and a clean project structure that is easy to maintain and expand.

---

## Step 4: Building the Chat Interface

Let's build a beautiful, responsive chat interface using shadcn components and the Vercel AI SDK's powerful streaming features.

First, create the main chat component in <FontIcon icon="fas fa-folder-open"/>`src/components/`<FontIcon icon="fa-brands fa-react"/>`chat.tsx`:

```tsx :collapsed-lines title="web/src/components/chat.tsx"
export default function Chat() {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState("");

  const {
    messages,
    sendMessage,
    status,
    error,
    regenerate,
    stop,
    setMessages,
  } = useChat({
    onError: (error) => {
      console.error("Chat error:", error);
    },
    onFinish: () => {
      inputRef.current?.focus();
    },
  });

  const isLoading = status === "streaming" || status === "submitted";

  // Add welcome message on mount
  useEffect(() => {
    if (messages.length === 0) {
      setMessages((prev) => [
        ...prev,
        {
          id: "welcome",
          role: "assistant" as const,
          parts: [
            {
              type: "text" as const,
              text: "Hello! I'm your custom AI assistant, trained on specific content. How can I help you today?",
            },
          ],
        },
      ]);
    }
  }, [messages.length, setMessages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    sendMessage({
      role: "user",
      parts: [{ type: "text", text: input }],
    });
    setInput("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]"
      );
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  return (
    <div className="flex h-screen max-w-5xl mx-auto p-4">
      <Card className="flex-1 flex flex-col shadow-xl overflow-hidden">
        {/* Header */}
        <CardHeader className="border-b flex-shrink-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  <Bot className="h-6 w-6" />
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-background animate-pulse" />
            </div>
            <div className="flex-1">
              <CardTitle>Custom AI Assistant</CardTitle>
              <CardDescription>
                Powered by your fine-tuned model
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        {/* Messages Area */}
        <ScrollArea ref={scrollAreaRef} className="flex-1 min-h-0">
          <div className="p-4 space-y-4 pb-4">
            {messages.map((message) => {
              const isUser = (message.role as string) === "user";
              return (
                <div
                  key={message.id}
                  className={cn(
                    "flex",
                    isUser ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "flex items-start gap-3 max-w-[85%] min-w-0",
                      isUser && "flex-row-reverse"
                    )}
                  >
                    {/* Avatar */}
                    <Avatar className="h-8 w-8 shrink-0">
                      <AvatarFallback
                        className={cn(
                          isUser
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        )}
                      >
                        {isUser ? (
                          <User className="h-4 w-4" />
                        ) : (
                          <Bot className="h-4 w-4" />
                        )}
                      </AvatarFallback>
                    </Avatar>

                    {/* Message Content */}
                    <div className="space-y-1 min-w-0 flex-1">
                      <div
                        className={cn(
                          "rounded-lg px-4 py-2.5 text-sm max-w-full",
                          isUser
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        )}
                      >
                        <div className="whitespace-pre-wrap break-words leading-relaxed overflow-wrap-anywhere">
                          {message.parts?.map((part, index) => {
                            if (part.type === "text") {
                              return <p key={index}>{part.text}</p>;
                            }
                            return null;
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-3 max-w-[85%]">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-muted">
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-muted rounded-lg px-4 py-2.5">
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-3 w-3 animate-spin" />
                      <span className="text-sm text-muted-foreground">
                        Thinking...
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="flex justify-center px-4">
                <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3 max-w-md">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-destructive mt-0.5" />
                    <div className="space-y-1">
                      <p className="text-sm text-destructive">
                        {error.message ||
                          "Something went wrong. Please try again."}
                      </p>
                      <Button
                        onClick={() => regenerate()}
                        variant="ghost"
                        size="sm"
                        className="h-7 px-2 text-xs"
                      >
                        Retry last message
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input Area */}
        <CardContent className="border-t p-4 flex-shrink-0">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Type your message..."
              disabled={isLoading}
              className={cn(
                "flex-1 px-3 py-2 text-sm rounded-md border border-input bg-background",
                "placeholder:text-muted-foreground",
                "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                "disabled:cursor-not-allowed disabled:opacity-50"
              )}
              autoFocus
            />

            {isLoading ? (
              <Button
                type="button"
                onClick={stop}
                variant="destructive"
                size="sm"
              >
                Stop
              </Button>
            ) : (
              <Button type="submit" disabled={!input.trim()} size="sm">
                <Send className="h-4 w-4" />
                <span className="ml-2 hidden sm:inline">Send</span>
              </Button>
            )}
          </form>

          {/* Character Counter */}
          {input.length > 0 && (
            <div className="mt-2 text-xs text-muted-foreground text-right">
              {input.length} / 4000
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
```

This code creates the main chat interface component where users interact with your fine-tuned AI model. It primarily uses the `useChat` hook from Vercel's AI SDK, which manages all the complex messaging tasks, such as sending messages, receiving streaming responses, managing conversation state, and handling errors. The component sets up several React hooks: `useRef` for managing DOM elements like the scroll area and input field, `useState` for the input text, and `useEffect` for side effects like auto-scrolling and showing a welcome message when the chat first loads.

The UI is built using shadcn/ui components to create a polished, professional look with minimal effort. The layout has three main sections: a header showing the AI assistant's status (with a pulsing green dot to indicate it's online), a scrollable message area in the middle, and an input form at the bottom. Each message is displayed with an avatar (a user icon for human messages and a bot icon for AI responses) and styled differently based on who sent it. User messages appear on the right with a primary color background, while assistant messages appear on the left with a muted background. The component includes thoughtful UX details like automatic scrolling to the latest message, focus management that returns to the input field after sending, and a character counter showing how close you are to the 4000-character limit.

The component also manages different states smoothly: it shows a "Thinking..." animation with a spinning loader while the AI creates a response, displays error messages with a retry button if something goes wrong, and even lets users stop the response mid-stream if it takes too long. When loading, the send button changes into a "Stop" button, giving users full control over the conversation. Everything is wrapped in responsive styling that adjusts to different screen sizes, ensuring your chat interface looks great whether users are on desktop or mobile devices.

Now, update the main page to use the chat component:

```tsx title="web/app/page.tsx"
import Chat from "@/components/chat";

export default function Home() {
  return (
    <main className="h-screen">
      <Chat />
    </main>
  );
}
```

This chat interface uses shadcn/ui components to create a polished, professional look. It includes features like real-time message streaming, animated loading states, error handling with retry options, automatic scrolling to the latest messages, a responsive design for all devices, keyboard shortcuts, accessibility features, and a character counter to keep users informed.

---

## Step 5: API Route Integration

Now let's create the backend API route that connects our chat interface to the fine-tuned OpenAI model with proper streaming support.

```tsx title="web/app/api/chat/route.ts"
import { openai } from "@ai-sdk/openai";
import { streamText, convertToModelMessages } from "ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Parse request body
    const body = await req.json();
    const { messages } = body;

    // Validate messages
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid request format" },
        { status: 400 }
      );
    }

    // Convert UI messages to model messages using AI SDK utility
    const modelMessages = convertToModelMessages(messages);

    // Check if we have any valid messages
    if (modelMessages.length === 0) {
      return NextResponse.json(
        { error: "No valid messages provided" },
        { status: 400 }
      );
    }
    // Add system prompt to prevent hallucination and guide the model
    const systemPrompt = {
      role: "system" as const,
      content: `You are a helpful assistant answering questions about MTechZilla, a software development company. 

IMPORTANT INSTRUCTIONS:
- Only answer questions based on information you were specifically trained on about MTechZilla
- If you don't know something or weren't trained on specific information, say "I don't have that specific information in my training data"
- Never make up or guess information about MTechZilla
- Be accurate and only provide information you're confident about

Answer questions accurately based on your training data about MTechZilla's services, technologies, and approach.`
    };

    // Prepend system message if not already present
    const hasSystemMessage = modelMessages.some((msg) => msg.role === "system");
    if (!hasSystemMessage) {
      modelMessages.unshift(systemPrompt);
    }

    // Load fine-tuned model ID from environment variable
    const fineTunedModelId = process.env.FINE_TUNED_MODEL;

    // Ensure we have a valid model ID
    if (!fineTunedModelId) {
      throw new Error("No fine-tuned model ID available");
    }

    // Call OpenAI with streaming using the new AI SDK
    const result = streamText({
      model: openai(fineTunedModelId),
      messages: modelMessages,
      temperature: 0.1, // Lower temperature for more deterministic, factual responses
    });

    // Log stream start
    console.log(`Stream started`);

    // Return UI message stream response for useChat compatibility
    return result.toUIMessageStreamResponse({
      headers: {
        "Cache-Control": "no-cache, no-transform",
        "X-Accel-Buffering": "no",
      },
    });
  } catch (error: unknown) {
    console.error("Chat API Error:", error);

    // Handle specific errors
    if (error && typeof error === "object" && "status" in error) {
      const errorWithStatus = error as { status: number };

      if (errorWithStatus.status === 401) {
        return NextResponse.json(
          {
            error: "Authentication failed. Check API key configuration.",
          },
          { status: 401 }
        );
      }

      if (errorWithStatus.status === 404) {
        return NextResponse.json(
          {
            error: "Model not found. Check your fine-tuned model ID.",
          },
          { status: 404 }
        );
      }

      if (errorWithStatus.status === 429) {
        return NextResponse.json(
          {
            error: "OpenAI rate limit reached. Please try again later.",
          },
          { status: 429 }
        );
      }
    }

    // Generic error
    return NextResponse.json(
      { error: "An error occurred. Please try again." },
      { status: 500 }
    );
  }
}
```

This code sets up the backend API endpoint that connects your chat interface to your fine-tuned OpenAI model. When a user sends a message, this Next.js API route receives the request, checks if the messages are correctly formatted, and converts them from the UI format to the structure that OpenAI's API needs using the AI SDK's `convertToModelMessages` tool. A key feature is the system prompt injection before sending messages to your model. The code automatically adds specific instructions, telling the AI to only respond based on its training data about MTechZilla (in this example) and to clearly say "I don't have that specific information" instead of making things up. This is crucial for preventing errors and ensuring the chatbot remains accurate and reliable.

The route loads your fine-tuned model ID from environment variables to keep sensitive settings secure. It uses Vercel's AI SDK to call OpenAI with streaming enabled, so responses appear word-by-word in real-time instead of waiting for the entire response. The temperature is set to 0.1, making the model more predictable and factual—perfect for a customer service chatbot where accuracy is more important than creativity. The `streamText` function handles all the streaming details, and the response is returned in a format that works directly with the `useChat` hook in your frontend component.

The code includes thorough error handling for common issues: authentication failures (invalid API keys), model not found errors (incorrect model ID), rate limiting (too many requests), and general server errors. Each error type returns a specific, helpful message to make debugging easier during development and to provide clear feedback to users if something goes wrong. The response headers include cache control directives to ensure fresh data and prevent buffering issues during streaming, guaranteeing a smooth, real-time chat experience for your users.

---

## Step 6: Testing Your Application

With everything set up, let's test the complete application and ensure it works correctly.

First, make sure you've added your fine-tuned model ID to the environment file:

```sh title="web/.env.local"
OPENAI_API_KEY=sk-...your-api-key...
OPENAI_ORG_ID=org-...your-org-id...
FINE_TUNED_MODEL=ft:gpt-4.1-nano-2025-04-14:... # Copy from scripts/model_info.json
```

Start the development server:

```sh
npm run dev
```

Open `http://localhost:3000` in your browser, and you'll see the following UI:

![Screenshot of a chat window with "Custom AI Assistant" at the top. The AI greets the user, saying, "Hello! I'm your custom AI assistant, trained on specific content. How can I help you today?" A message input field and send button are at the bottom.](https://cdn.hashnode.com/res/hashnode/image/upload/v1757941475393/692f92ff-11bc-451d-a9fa-a288c87f7d78.png)

Test various scenarios:

1. **Domain Knowledge Test**: Ask questions related to your training data
2. **Conversation Flow**: Have a multi-turn conversation
3. **Edge Cases**: Try very long inputs, rapid messages, network interruptions
4. **Mobile Testing**: Test on different screen sizes

---

## Conclusion

Congratulations! You've successfully fine-tuned a GPT-4.1 model and built a chat application ready for production, showing the power of custom AI. We've transformed raw website content into structured training data, used OpenAI's latest models for fine-tuning, and built a modern Next.js app with real-time streaming and a nice interface. The key to successful fine-tuning is knowing when it's the right choice - use it for a consistent brand voice, specialised domain knowledge, and reducing RAG complexity, but consider the RAG option for information that changes often. Our modular project structure keeps training scripts separate from the web app, making it easy to retrain models and add new features.

As you continue, remember that fine-tuning is a step-by-step process. Watch how users interact, gather feedback, and keep improving your model with new training examples. Avoid common mistakes like using too little data (aim for 50+ good examples), ignoring validation errors, and not setting up proper rate limits and error handling. In 2025, AI customisation is changing fast, with trends toward more efficient models, continuous learning, and hybrid methods that mix different techniques. What used to need a team of ML engineers can now be done by few developers with the right skills. You now have the tools and knowledge to create specialised AI applications that truly understand and serve your specific area.

::: info

For founders considering AI adoption, I've created a free guide: [<FontIcon icon="fa-brands fa-notion"/>AI or No AI? The 2025 Founder's Decision Playbook](https://notion.so/AI-or-No-AI-The-2025-Founder-s-Decision-Playbook-25ec9ed724ec80668a8fc42bb804515a) - a framework to help decide when AI truly adds value.

Feel free to connect with me on [LinkedIn (<FontIcon icon="fa-brands fa-linkedin"/>`sharvinshah`)](https://linkedin.com/in/sharvinshah/) and [Twitter (<FontIcon icon="fa-brands fa-x-twitter"/>`sharvinshah`)](https://twitter.com/sharvinshah26).

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build a Custom AI Chat Application with Next.js: Fine-Tune GPT Using Your Data",
  "desc": "In 2025, AI-powered applications have advanced from generic chatbots to highly specialised assistants that understand your specific field, communicate in your style, and give contextually relevant answers. While Large Language Models (LLMs) like GPT-...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-a-custom-ai-chat-application-with-nextjs.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
