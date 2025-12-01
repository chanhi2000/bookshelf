---
lang: en-US
title: "How to Build an AI-Powered RAG Chatbot with Amazon Lex, Bedrock, and S3"
description: "Article(s) > How to Build an AI-Powered RAG Chatbot with Amazon Lex, Bedrock, and S3"
icon: fa-brands fa-aws
category:
  - DevOps
  - Amazon
  - AWS
  - AI
  - LLM
  - Amazon Bedrock
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - amazon
  - amazon-web-services
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
  - bedrock
  - amazon-bedrock
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build an AI-Powered RAG Chatbot with Amazon Lex, Bedrock, and S3"
    - property: og:description
      content: "How to Build an AI-Powered RAG Chatbot with Amazon Lex, Bedrock, and S3"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-an-ai-powered-rag-chatbot.html
prev: /devops/aws/articles/README.md
date: 2025-12-04
isOriginal: false
author:
  - name: Chisom Uma
    url : https://freecodecamp.org/news/author/ChisomUma123/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1764801036311/e1bb9ed8-f64e-433f-916f-fd3079aac4d3.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "AWS > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/aws/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Amazon Bedrock > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/llm/bedrock/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build an AI-Powered RAG Chatbot with Amazon Lex, Bedrock, and S3"
  desc="Chatbots are widely adopted among software companies, especially those that interact heavily with customers. It is typically used for tasks such as customer support, answering questions, and providing information on websites, apps, and messaging plat..."
  url="https://freecodecamp.org/news/how-to-build-an-ai-powered-rag-chatbot"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1764801036311/e1bb9ed8-f64e-433f-916f-fd3079aac4d3.png"/>

Chatbots are widely adopted among software companies, especially those that interact heavily with customers. It is typically used for tasks such as customer support, answering questions, and providing information on websites, apps, and messaging platforms.

These days, as expected, some chatbots are AI-powered and can generate answers to queries through Retrieval-Augmented Generation (RAG). I have been curious about how this works, built it out myself, and now, we’ll look at how to build an AI-powered RAG chatbot.

For this tutorial, you’ll build a RAG chatbot that answers queries about travel policies to Mars. The chatbot retrieves its answers from our own data source (travel policy documents) stored in an S3 bucket. The document serves as our internal data source for the chatbot to reference when generating prompts.

Instead of scripted responses from pre-trained data, the chatbot will pull contextual answers directly from the knowledge base.

Let's get started

::: note Prerequisites

- An AWS account, logged in as an IAM user with admin privileges
- Access to Amazon Titan Embeddings G1 - text model on Amazon Bedrock
- Access to Anthropic Claude 3.5 Sonnet on Amazon Bedrock.
- Access to travel policy documents. You can download these from Google Drive [<VPIcon icon="fa-brands fa-google-drive"/>here](https://drive.google.com/file/d/1kyewU4eCFnaYS3wQ7Fyv22G3ycthbfJb/view).
- Experience using the AWS console.
- No coding required

:::

---

## What is Retrieval-Augmented Generation (RAG)?

Large Language Models (LLMs) like GPT-4 and Claude are basically everywhere. They get some things amazingly right and others very interestingly wrong, like hallucinations, where the model generates factually incorrect or fabricated information. This brings us to the idea of RAG.

*Marina Danilevsky*, *Senior Research Scientist at IBM*, in a [<VPIcon icon="fa-brands fa-youtube"/>lecture](https://youtu.be/T-D1OfcDW1M), referred to RAG as a “framework” for helping LLMs be more accurate and up-to-date.

Before going into the full scope of RAG, let’s talk briefly about the “generation” part. Generation, in the context of RAG, refers to LLMs that generate texts in response to a user query, referred to as a prompt.

These LLMs can sometimes give incorrect answers, due to limited context or outdated information. Especially because they only fetch information from pre-trained data. Imagine you're asked how many Grammy Awards your favorite artist has, and you give an answer you read in a magazine four years ago. You might be correct, but there are two problems with this answer: first, you didn't cite a source, and second, it's outdated.

This is the problem LLMs have traditionally had. The answers were outdated, and no credible sources were cited.

Now, imagine if you had looked up the answer first, from a reputable source on Google. Your answer would be more accurate and factual, and if there was ever a doubt from the person who asked the question, you could easily share the link to the reputable source on Google, and there would be no further doubts or questions.

What does this have to do with LLMs and RAG? Well, now, instead of the LLM only getting answers from its pre-trained data, risking providing outdated answers, when RAG gets involved, it retrieves answers to queries directly from a content store, which could comprise external sources, such as the internet, or internal sources, such as documents (which will be used in this tutorial). This way, its generated answers are more accurate.

RAG helps the LLM stay up to date by further retrieving information from other sources rather than solely from its pre-trained data.

---

## What is Amazon Bedrock?

[<VPIcon icon="fa-brands fa-aws"/>Amazon Bedrock](https://aws.amazon.com/bedrock/?trk=68c792bf-53f8-44a0-a8eb-87bc8e0048bf&sc_channel=ps&ef_id=CjwKCAiAraXJBhBJEiwAjz7MZalEEwHhrurF7NUoWofbXeTPsMNnKXsegyAKvkDEfBF2f7Jd4xxwuhoCWW8QAvD_BwE:G:s&s_kwcid=AL!4422!3!692062173758!e!!g!!amazon%20bedrock!21054971963!158684190945&gad_campaignid=21054971963&gbraid=0AAAAADjHtp__vpwZM9pm6Gjqc9UY3wYEa&gclid=CjwKCAiAraXJBhBJEiwAjz7MZalEEwHhrurF7NUoWofbXeTPsMNnKXsegyAKvkDEfBF2f7Jd4xxwuhoCWW8QAvD_BwE) is AWS's managed service that gives you access to foundation models, essentially the core AI engines that power generative AI applications. The beauty of Bedrock is that it handles all the heavy lifting for you. No need to provision GPUs, set up model pipelines, or deal with infrastructure headaches.

It's a single platform where you can experiment with, customize, and deploy top-tier AI models from providers like *Anthropic*, *Stability A*I, and Amazon's own *Titan* models (used in this tutorial).

Here's a practical example: let’s say you're building a customer support chatbot. With Bedrock, you simply pick a language model that fits your needs, fine-tune it for your specific use case, and integrate it into your app, all without touching server configuration or infrastructure code.

---

## Getting Started: Access models on Bedrock

To get access to models on AWS via Bedrock:

- Log in to your AWS IAM account with root privileges.
- Navigate to **Amazon Bedrock > Model catalog.**

![Image of Amazon bedrock model catalog page](https://cdn.hashnode.com/res/hashnode/image/upload/v1764493545469/839771fb-c3aa-47d4-b1b9-60cd67ba26c5.png)

- Locate the “Titan Embeddings G1 - Text” model and “Claude 3.5 Sonnet” models.

When you click these models, you are directed to a page with more details. You don’t need to do anything on this page. We will be using these models later in this tutorial. In the following sections, we’ll walk through the steps to build the chatbot.

---

## Step 1: Upload Travel Policy Documents to the S3 Bucket

To upload documents, navigate to the Amazon S3 page in your AWS console, then create a bucket. For more details on creating a bucket, refer to the [<VPIcon icon="fa-brands fa-aws"/>AWS documentation](https://docs.aws.amazon.com/AmazonS3/latest/userguide/create-bucket-overview.html). Next, upload the downloaded document to the S3 bucket.

Note that the document is zipped; you will need to unzip it before uploading.

---

## Step 2: Create a Knowledge base in Amazon Bedrock

Now that we have created our S3 buckets and uploaded our documents, we can’t just hook up our chatbot built with Lex directly to the S3 buckets. S3 isn’t really “smart” from an AI perspective. To get the AI capabilities needed to make this work, we need Amazon Bedrock.

First, we need to create a knowledge base in Amazon Bedrock.

To get started, head back to the Bedrock page opened up earlier and navigate to **Build** > **Knowledge Bases**. Click **Create**. From the dropdown, choose “Knowledge base with vector store.” Leave IAM permissions as “Create and use a new service role”. This is what allows Bedrock to access other services. Choose “Amazon S3” as the data source type. Click **Next**.

Next, click **Browse S3** and select the created bucket with the uploaded documents. Click **Next**. On the next page, click **Select model** to choose an embedding model. Select the “Titan Embeddings G1 - Text”, then select “Amazon OpenSearch Serverless” and click **Apply**.

Leave everything else the same and click **Next**. On the next page, click **Create Knowledge Base**. Note that this takes some time (a few minutes), so you need to be patient with this step. Once your knowledge base is created, you’ll be taken to a new page with a message like one in the image below:

![image of successful Bedrock knowledge creation ](https://cdn.hashnode.com/res/hashnode/image/upload/v1764493716382/fd92d1d9-51ef-470f-bae9-b1cb636a260e.png)

The second message tells you that you need to sync the knowledge base with data sources. To do this, scroll down to the *Data source* section, select the data source, then click **Sync**. Wait a few seconds and everything syncs.

**Note:** If you have more data than we have in this tutorial (just four PDFs), syncing may take longer.

Now, we have our Bedrock knowledge base set up. The knowledge base connects to the S3 bucket containing the travel documents.

It's now time to create the chatbot. For this, we’ll use [<VPIcon icon="fa-brands fa-aws"/>Amazon Lex](https://aws.amazon.com/lex/).

---

## Step 3: Create an Amazon Lex Chatbot

In your AWS console, navigate to Amazon Lex, then click **Create bot**. Select **Create a blank bot** under the *Traditional* creation method. For the bot name, you can call it “Mars travel bot” or any name you prefer.

Under the “*IAM permissions*” section, select **Create a role with basic Amazon Lex permissions**. Under the “*Children’s Online Privacy Protection Act (COPPA)*” section, select **No,** since our bot isn't subject to COPPA, and click **Next**.

On the next page, enter a short description in the *Description* text field. Select your preferred voice interaction option available for text-to-speech. This is the voice your users will hear when they use the chatbot.

![Image of Amazon Lex bot voices](https://cdn.hashnode.com/res/hashnode/image/upload/v1764493888022/29ad9758-c0b7-42f4-8308-8255137c4649.png)

The cool thing about Lex is that you can play a voice sample for each voice. This can help you make the best decision for your business. Next, click **Done**.

---

## Step 4: Add a Welcome Intent to Your Chatbot

After hitting the **Done** button, you should see a page for creating an intent next. An intent is basically an action that fulfils a user's request.

Let's start with creating a welcome intent. To get started, change Intent name to “WelcomeIntent”. Then scroll down to the “*Sample utterances*” section and add utterances. These are example texts that you expect a user to type or speak when they start using your chatbot. So, if the user says “Hi” the chatbot responds with a welcome message. For this tutorial, I added the following expected utterances:

- “Hi”
- “Hey”
- “hello”

You can add as many as you want.

In the “*Initial response*” section, you can provide a response to the user's utterance. Under the **Message group** dropdown, you can type in something like “Hi! welcome! How can I help you today?” Next, click the *Advanced options* button. This reveals a dialog box. Under *Set values*, select the “Wait for users input” option. You can select other options, but for this tutorial, we are going with this. Click **Update options**.

When you navigate back to the *Intents* page, you’ll notice a “Fallbackintent” intent automatically generated for you. This intent is supposed to be invoked when a user launches your bot with an utterance that differs from the one created for the welcome intent.

---

## Step 5: Build the Chatbot

In the previous step, we built an intent for the bot. Now it's time to build the actual chatbot that bundles up all of this configuration into something usable.

To get started, click **Build** at the top-right side of your screen.

![Image of building bot](https://cdn.hashnode.com/res/hashnode/image/upload/v1764494047899/cac4a609-f551-4b3e-9714-1330da3e7908.png)

Once the building is completed, you’ll get a message at the top of the page. Now, it’s time to test the bot. Next, click **Test** at the top-right side of your screen.

You get a pre-built chatbot for testing your implementation. Enter a text or utterance, in this case, for example, “Hi”, and you get an initial response. Remember, the utterance and initial response were set in the previous section.

![Image of interaction with bot](https://cdn.hashnode.com/res/hashnode/image/upload/v1764494109571/391fbcc9-b3b0-498c-85f9-43e28d12b58d.png)

When you click on Inspect. You’ll see the current intent. In this case, the welcomeIntent.

At this point, we haven’t fully integrated the AI capabilities required to get answers about travel policies to Mars.

---

## Step 6: Adding Amazon QnAIntent

The Amazon QnAIntent introduces GenAI capabilities to our bot. It is a built-in intent that uses Generative AI to fulfill Frequently Asked Questions (FAQ) requests by querying the authorized knowledge content.

To get started, navigate to **Add intent > Use built-in intent** on the Intents page. Select the QnAIntent option, as shown in the image below:

![Image of built-in intent](https://cdn.hashnode.com/res/hashnode/image/upload/v1764494196339/d28020cb-c3a2-4595-aae0-f02463d422a7.png)

Give it a name of your choice. Click **Add**. You’ll be directed to the intent page. In the “*QnA configuration”* section, select **Claude3.5 Sonnet** as the desired model.

![Image of model and knowledge base config in Lex](https://cdn.hashnode.com/res/hashnode/image/upload/v1764494285444/9d49daed-02ed-44a6-a7e6-763611f3a214.png)

For the ID, since we had already created a knowledge base earlier, navigate back to **Amazon Bedrock** > **Knowledge Bases** and copy your *Knowledge Base ID* and paste it into the “Knowledge base for Amazon Bedrock Id” field. Click **Save intent**. Before testing your changes, click **Build** to build the bot again.

Now, let’s run a little test with the chatbot. I will be prompting it about items I can expense for my trip.

![Image of AI implementation and interaction with Chabot, retrieving answers to queries from S3 via Bedrock knowledgebase](https://cdn.hashnode.com/res/hashnode/image/upload/v1764494425584/65ec0a99-e438-44d3-ad62-965d82200142.png)

The image above shows me having a conversation with the chatbot. I sent an utterance for the welcome intent, and it responded with a welcome message. When I asked the chatbot about what items I can expense for the trip, it pulled the information from the Bedrock knowledge base, which is connected to the S3 bucket housing the travel policy documents.

Try experimenting with other questions like “How much does my trip cost?” or “Can I bring my pets?”

Want to add a proper web UI to your bot? Follow the step-by-step instructions in this [GitHub repository (<VPIcon icon="iconfont icon-github"/>`aws-samples/aws-lex-web-ui`)](https://github.com/aws-samples/aws-lex-web-ui).

FYI - you should delete resources such as your knowledge base, S3 bucket, and vector store (navigate to **Amazon OpenSearch Service** > **Serverless** > **Dashboard** and delete the knowledge base vector collection) to avoid incurring any unwanted charges from AWS.

---

## Conclusion

You've just built an AI-powered chatbot that pulls answers from your own data sources. No more generic responses or outdated information. By combining Amazon Lex, Bedrock, S3, and RAG, you've created a system that actually understands your documentation/knowledge base and delivers accurate, contextual answers.

The real power here isn't just in the technology stack, it's in what you can do with it. Scale this approach to handle customer support queries, internal HR questions, product documentation, or any scenario where you need instant, accurate responses from your own knowledge base.

This is just the beginning. Experiment with different foundation models in Bedrock, expand your knowledge base with more documents, or refine your intents to handle more complex conversations. The infrastructure is built, now it's time to customize it for your specific use case.

If you found this tutorial helpful, consider sharing it with your team or fellow developers.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build an AI-Powered RAG Chatbot with Amazon Lex, Bedrock, and S3",
  "desc": "Chatbots are widely adopted among software companies, especially those that interact heavily with customers. It is typically used for tasks such as customer support, answering questions, and providing information on websites, apps, and messaging plat...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-an-ai-powered-rag-chatbot.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
