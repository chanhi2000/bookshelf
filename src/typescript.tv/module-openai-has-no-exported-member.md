---
lang: en-US
title: "Module openai has no exported member"
description: "Article(s) > Module openai has no exported member"
icon: iconfont icon-typescript
category:
  - TypeScript
  - AI
  - LLM
  - OpenAI
  - Article(s)
tag:
  - blog
  - typescript.tv
  - ts
  - typescript
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
  - openai
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Module openai has no exported member"
    - property: og:description
      content: "Module openai has no exported member"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/module-openai-has-no-exported-member.html
prev: /programming/ts/articles/README.md
date: 2024-04-24
isOriginal: false
author:
  - name: Benny Neugebauer
    url: https://stackoverflow.com/users/451634/benny-neugebauer
cover: https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp
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
  name="Module openai has no exported member"
  desc="OpenAI's Node.js API Library has updated from Version 3 to Version 4. Changes include updating imports adjusting method calls."
  url="https://typescript.tv/hands-on/module-openai-has-no-exported-member"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp"/>

OpenAI's Node.js API Library has updated from Version 3 to Version 4. Changes include updating imports adjusting method calls.

There has been a major upgrade in OpenAI's Node.js API Library. When switchting from Version 3 to Version 4 you have to take into account some breaking API changes. You may also run into "insufficient_quota" errors if you don't upgrade legacy User API keys to to Project API keys ([<VPIcon icon="iconfont icon-openai"/>read more](https://platform.openai.com/docs/api-reference/api-keys)).

---

## API Changes

Here is a list of the most common changes and how to update them.

> Module '"openai"' has no exported member 'Configuration'. Did you mean to use 'import Configuration from "openai"' instead?

::: tabs

@tab:active Version 3

```ts
import { Configuration } from 'openai';
```

@tab After

```ts{1}
import OpenAI from 'openai';
```

:::

> '"openai"' has no exported member named 'OpenAIApi'. Did you mean 'OpenAI'?

::: tabs

@tab:active Version 3

```ts
import { Configuration, OpenAIApi } from 'openai';
 
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
 
const openai = new OpenAIApi(configuration);
```

@tab After

```ts{3-5}
import OpenAI from 'openai';
 
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
```

:::

> Module '"openai"' has no exported member 'ChatCompletionRequestMessage'. Did you mean to use 'import ChatCompletionRequestMessage from "openai"' instead?

::: tabs

@tab:active Version 3

```ts
const commands: ChatCompletionRequestMessage[] = [
  {
    content: 'You are a summarizer.',
    role: 'system',
  },
];
```

@tab After

```ts{1}
import type { ChatCompletionMessageParam } from 'openai/resources/index.mjs';
 
const commands: ChatCompletionRequestMessage[] = [
  {
    content: 'You are a summarizer.',
    role: 'system',
  },
];
```

:::

> Property 'createChatCompletion' does not exist on type 'OpenAI'.

::: tabs

@tab:active Version 3

```ts
const { data } = await openai.createChatCompletion({
  max_tokens: 196,
  messages: commands,
  model: 'gpt-3.5-turbo',
  temperature: 0,
  top_p: 0.1,
});
```

@tab After

```ts{1}
const data = await openai.chat.completions.create({
  max_tokens: 196,
  messages: commands,
  model: 'gpt-3.5-turbo',
  temperature: 0,
  top_p: 0.1,
});
```

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Module openai has no exported member",
  "desc": "OpenAI's Node.js API Library has updated from Version 3 to Version 4. Changes include updating imports adjusting method calls.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/module-openai-has-no-exported-member.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
