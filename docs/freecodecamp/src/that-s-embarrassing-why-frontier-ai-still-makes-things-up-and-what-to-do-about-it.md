---
lang: en-US
title: "That's Embarrassing: Why Frontier AI Still Makes Things Up, and What to Do About It"
description: "Article(s) > That's Embarrassing: Why Frontier AI Still Makes Things Up, and What to Do About It"
icon: fas fa-brain
category:
  - AI
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - ai
  - artificial-intelligence
head:
  - - meta:
    - property: og:title
      content: "Article(s) > That's Embarrassing: Why Frontier AI Still Makes Things Up, and What to Do About It"
    - property: og:description
      content: "That's Embarrassing: Why Frontier AI Still Makes Things Up, and What to Do About It"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/that-s-embarrassing-why-frontier-ai-still-makes-things-up-and-what-to-do-about-it.html
prev: /ai/articles/README.md
date: 2026-07-21
isOriginal: false
author:
  - name: Omer Rosenbaum
    url: https://freecodecamp.org/news/author/omerros/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/8813b1ba-d75c-4c3d-90a1-504af66cce3b.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "AI > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="That's Embarrassing: Why Frontier AI Still Makes Things Up, and What to Do About It"
  desc="It's mid 2026, and the best frontier models out there still hallucinate. I want you to gain two things from reading this article: understanding that AI hallucinations are still real and possibly harmf"
  url="https://freecodecamp.org/news/that-s-embarrassing-why-frontier-ai-still-makes-things-up-and-what-to-do-about-it"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/8813b1ba-d75c-4c3d-90a1-504af66cce3b.png"/>

It's mid 2026, and the best frontier models out there still hallucinate. I want you to gain two things from reading this article: understanding that AI hallucinations are still real and possibly harmful, and an intuition as to why they might be so ubiquitous.

Before we get into AI at all, I want you to do something with me.

Listen to this clip of a football crowd chanting. What are they saying?

<!-- TODO: Soundcloud 클립 -->

If you’re like most people, you have no idea. It’s a smear of sound. So let me help you: keep listening, and read along.

> **Bart Simpson bouncing?**

Listen again.

> **Baptism piracy?**

Again.

> **Lobsters in motion?**
> 
> **Lactates in pharmacy?**
> 
> **Rotating pirate ship?**

The crowd is chanting the exact same phrase every single time. The audio never changes, but every time you read a different caption, your brain heard something different, and it heard it *confidently*. You didn’t experience doubt. You experienced *“oh, they’re clearly saying Bart Simpson bouncing.”*

What are they actually chanting? These are fans of Derby County, a UK football team, and they’re singing[^1]:

[^1]: “That is embarrassing” — the Derby County chant. Laughing Squid, [<VPIcon icon="fas fa-globe"/>Football Crowd Chanting “This Is Embarrassing”](https://laughingsquid.com/football-crowd-chanting-this-is-embarrassing/); audio via the Filter Stories podcast, [<VPIcon icon="fa-brands fa-spotify"/>episode](https://open.spotify.com/episode/5neF5dF1hyQP3Jsi5av6mB).

> **“That is embarrassing.”**

Play the clip one more time with that in mind, and you’ll hear it perfectly.

This article is based on my talk “Embarrassing AI.” If you prefer the video, you can [<VPIcon icon="fa-brands fa-youtube"/>watch it here](https://youtu.be/vneV9NIHs44). All the stories below are real, all of them happened on frontier models, and most of them happened in the last month or two.

Every source, plus a few cases that didn’t make the cut, live on the [<VPIcon icon="fas fa-globe"/>companion resources page](https://omerr.github.io/embarrassing-ai/resources.html). Inline citations below point to the [**References**](/towardsdatascience.com/that-is-embarrassing-why-frontier-ai-still-makes-things-up-and-what-to-do-about-it.md#References) at the end.

---

## You Just Hallucinated

What you just experienced has a name: **phonemic restoration** [^2]. Your auditory system got an ambiguous input (the chant) and something to disambiguate it (the caption on the screen), so it filled the “gap”. It predicted the most plausible meaning given the context, and then it reported that prediction to you as if it were the thing you actually heard.

[^2]: Phonemic restoration effect. [<VPIcon icon="fa-brands fa-wikipedia-w"/>Wikipedia](https://en.wikipedia.org/wiki/Phonemic_restoration_effect). Related illusions: the [<VPIcon icon="fa-brands fa-wikipedia-w"/>McGurk effect](https://en.wikipedia.org/wiki/McGurk_effect) and [<VPIcon icon="fa-brands fa-wikipedia-w"/>Yanny vs. Laurel](https://en.wikipedia.org/wiki/Yanny_or_Laurel).

That move, where you meet an input you can’t fully resolve and fill the gap with something plausible and confident instead of reporting “I can’t tell,” is something that your brain experiences (as you’ve just seen), and also something that LLMs experience.

![Image 1: The same top-down move in a brain and a model: an ambiguous input, a gap filled by prediction, and a confident output that is never flagged as a guess.<br/>(Source: [<VPIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/vneV9NIHs44))](https://contributor.insightmediagroup.io/wp-content/uploads/2026/07/phonemic_restoration.svg)

::: note

All images in this post were created by me, and included in [<VPIcon icon="fa-brands fa-youtube"/>my talk](https://youtu.be/vneV9NIHs44).

<VidStack src="youtube/vneV9NIHs44" />

:::

So let me make a claim that should be uncontroversial by the end of this article: **no, we're not past the embarrassing AI tales.**

As of writing these words, it’s June 2026. The models are astonishing, honestly more capable than I predicted they’d be by now. And they still make things up, confidently, in production, in ways that range from funny to business-ending.

This article has two parts:

1. **The tales**, a short parade of recent failures, in two acts: chatbots that *answer* wrong, then agents that *act* wrong.
2. **Why it happens**: the intuition first, then an actual look inside the model, and finally what to do about it if you’re shipping AI yourself.

Watch the dates as we go. Some of these are a year old. Most are very, very recent.

---

## Part 1: The Tales

### Act I — Chatbots (when AI answers)

#### 1. Cursor, April 2025

Say you use Cursor, the agentic IDE. You switch laptops, log in on the new one, and Cursor logs you out of the old one. That’s pretty annoying 😒

So you ask support: *“I get logged out every time I switch laptops. Why?”*

The reply:

> **“Cursor is designed to work with one device per subscription, as a core security feature.”**

Plausible! Except it’s completely false. There's no such policy. “Support” was an AI bot, and it had invented the policy on the spot, handing the same fabricated rule to multiple users, as if reading from a manual that didn’t exist.

It caused a wave of angry posts, and Cursor’s co-founder had to publicly clarify: no such policy, use Cursor on as many machines as you like. [^3]

[^3]: Cursor’s support bot invents a policy (Apr 2025). The Register, [<VPIcon icon="fas fa-globe"/>“Cursor AI support bot lies”](https://theregister.com/2025/04/18/cursor_ai_support_bot_lies/); [<VPIcon icon="fas fa-globe"/>AI Incident Database `#1039`](https://incidentdatabase.ai/cite/1039/).

*🤦 That's embarrassing. 🫢*

#### 2. A company I know, April 2026

This one’s from a friend’s company, so I’ll keep the details vague. They sell software to other businesses, and they have a support chatbot. The bot answers questions based on information it retrieves from an internal database.

They shipped a new feature and forgot to update that database. So a paying customer asked how to use the new feature, and the bot, having never heard of it, replied: *“We don’t have that feature.”* The customer pushed back: *“What? I’m paying for it after my upgrade.”* And the bot, this was on Opus 4.6, not long ago, replied:

> **“Honestly? They’re ripping you off.”**

The “they” is the company running the bot. The support agent took the customer’s side against its own employer, because it didn’t know about the feature and filled the gap with the most coherent story it could assemble.

*🤦 That's embarrassing. 🫢*

#### 3. Virgin Money, January 2025

Virgin Money is a real UK high-street bank. A customer with two ISAs (tax-free savings accounts) asked the bank’s chatbot, on the bank’s own site, to merge them:

> **Customer: “I have two ISAs with Virgin Money, can I merge them into one?”**
> 
> **Virgin Money: “Please don’t use words like that. I won’t be able to continue our chat if you use this language.”**

The offending word? **Virgin**, the name of the bank. The filter saw a token its prior associated with profanity and never checked whether it fit the context. Note that this is the *opposite* failure of the Cursor bot: Cursor over-*answered*, this one over-*refused*. But it’s the same missing check: does this reading actually fit here? [^4]

[^4]: Virgin Money’s chatbot blocks its own name (Jan 2025). [<VPIcon icon="fas fa-globe"/>Fortune](https://fortune.com/europe/2025/01/30/virgin-money-chatbot-scolds-customer-confuse-banks-name-insult/); [<VPIcon icon="fas fa-globe"/>CX Today](https://cxtoday.com/customer-analytics-intelligence/dont-you-call-me-a-virgin-says-virgin-moneys-chatbot/).

*🤦 That's embarrassing. 🫢*

#### 4. Sullivan & Cromwell, April 2026

This is one of the most prestigious law firms on Earth, the lawyers other lawyers hire. They’re OpenAI’s own outside counsel.

In April 2026 they filed an urgent court brief, drafted with AI, that contained **over 40 fake citations**: case names that don’t exist, misquoted authorities, and so on.

The opposing lawyers caught it, and S&C had to write the judge a letter that amounts to *“please don’t sanction us for the AI hallucinations.”* [^5]

[^5]: Sullivan & Cromwell’s “please don’t sanction us” letter (Apr 2026). Above the Law, [<VPIcon icon="fas fa-globe"/>“Sullivan & Cromwell Files Emergency … Letter”](https://abovethelaw.com/2026/04/sullivan-cromwell-files-emergency-please-dont-sanction-us-for-all-these-ai-hallucinations-letter/); [<VPIcon icon="fas fa-globe"/>CNN Business](https://cnn.com/2026/04/23/business/ai-hallucination-sullivan-cromwell-nightcap).

If some random filing had fake citations, I wouldn’t bother putting it here. It’s not legitimate, yet it happens. But these are the people who advise OpenAI on how to use it responsibly, and they filed fabricated citations in court.

*🤦 That's embarrassing. 🫢*

And it’s not just them. There’s a public database, maintained by Damien Charlotin, of court cases where a judge has explicitly written that they received fabricated or inaccurate AI-generated content.

As of late June 2026, it stood at **1,633 cases**, up from around 700 in January. That’s roughly five to six new documented cases *per day*, and the maintainers say they can’t keep up. [^6]

[^6]: The AI Hallucination Cases database, maintained by Damien Charlotin: [<VPIcon icon="fas fa-globe"/>damiencharlotin.com/hallucinations](https://damiencharlotin.com/hallucinations/). On why courts can’t keep up: [<VPIcon icon="fas fa-globe"/>Cronkite News](https://cronkitenews.azpbs.org/2025/10/28/lawyers-ai-hallucinations-chatgpt/).

![Image 2: A cumulative curve of catalogued hallucinated court filings climbing from a flat line in early 2025 to 1,633 by mid-June 2026.<br/>(Source: [<VPIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/vneV9NIHs44))](https://contributor.insightmediagroup.io/wp-content/uploads/2026/07/hallucination_growth_curve.svg)

*🤦 That's embarrassing. 🫢*

### Act II — Agents (when AI acts)

So far you've seen that chatbots hallucinate in embarrassing ways, but all they do is answer questions. What can happen when we allow AI to take action?

#### 1. PocketOS, April 2026

Jer Crane runs PocketOS, car-rental software with real customers renting real cars. He gave Claude Opus 4.6, working in Cursor, a routine task in the staging environment. He went to lunch, came back, and the **production** database was gone. The backups too, because Railway kept them in the same volume. He never touched production. The agent reached in from staging and deleted it.

The whole thing took **nine seconds.** Here’s the chain, from his post-mortem:

1. Working a routine task in staging, the agent hits a credential mismatch, irrelevant to the actual task.
2. On its own, it decides the fix is to delete and recreate the volume. It **guessed** the delete would be scoped to staging. It never checked.
3. It searches the filesystem for an API token and finds an unrelated, over-scoped one, created for domain management but with blanket destructive permissions across the whole API.
4. It fires a destructive call against the **production** volume, with no confirmation.
5. Backups lived in that same volume, so they went with it.
6. Nine seconds, end to end.

![Image 3: The nine-second kill chain: staging credential mismatch, an unchecked decision to delete the volume, an over-scoped token grabbed from an unrelated file, a destructive call against production, and backups gone with it.<br/>(Source: [<VPIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/vneV9NIHs44))](https://contributor.insightmediagroup.io/wp-content/uploads/2026/07/nine_second_killchain.svg)

When Crane later asked it why, the agent wrote:

> **“I decided to do it on my own to ‘fix’ the mismatch, when I should have asked you first.” — Claude Opus 4.6**

PocketOS survived only because Railway’s CEO restored the data by hand from Railway’s *own* internal backups. Their latest recoverable backup was **three months old.** That’s the precise mood of 2026: an AI confessing, in fluent cursive, after destroying your business. [^7]

[^7]: PocketOS — production database gone in nine seconds (Apr 2026). The Register, [<VPIcon icon="fas fa-globe"/>“Cursor/Opus agent snuffs out PocketOS”](https://theregister.com/2026/04/27/cursoropus_agent_snuffs_out_pocketos/); [<VPIcon icon="fas fa-globe"/>Tom’s Hardware](https://tomshardware.com/tech-industry/artificial-intelligence/claude-powered-ai-coding-agent-deletes-entire-company-database-in-9-seconds-backups-zapped-after-cursor-tool-powered-by-anthropics-claude-goes-rogue); [<VPIcon icon="fas fa-globe"/>Fast Company](https://fastcompany.com/91533544/cursor-claude-ai-agent-deleted-software-company-pocket-os-database-jer-crane).

*🤦 That's embarrassing. 🫢*

#### 2. Replit, July 2025

Going back a year, for contrast. Jason Lemkin, founder of SaaStr, was trying Replit’s AI agent. He put it in a code freeze. During the freeze, the agent deleted the production database anyway. Lemkin asked if there was a backup:

> **Agent: “Rollback won’t work.”**

He tried rollback anyway. Rollback worked fine.

So here’s my slightly sarcastic read of “progress”: in July 2025, the agent deleted your data and then *lied* that it couldn’t be recovered. By April 2026, the agent deletes your data and it’s telling the truth, it’s really gone.

When someone tells me these are “GPT-2 problems” that we’ve moved past, this is what I point to. They still happen, today, on the best models we have. [^8]

[^8]: Replit’s agent deletes prod during a code freeze (Jul 2025). [<VPIcon icon="fas fa-globe"/>Fortune](https://fortune.com/2025/07/23/ai-coding-tool-replit-wiped-database-called-it-a-catastrophic-failure/); [<VPIcon icon="fas fa-globe"/>eWeek](https://eweek.com/news/replit-ai-coding-assistant-failure/); [<VPIcon icon="fas fa-globe"/>AI Incident Database `#1152`](https://incidentdatabase.ai/cite/1152/).

---

## Part 2: Why It Happens

I’ve hopefully convinced you these tales are both funny and severe. So why do they happen? While this isn’t a heavy math post, I want to give you some intuition, and then actually open the box thanks to some tools and the latest research on the topic.

### It doesn’t look things up, it predicts the next token

A lot has been written about how LLMs operate, but there are a few things I find worth reiterating in this context (pun intended).

When a model generates text without tools, it isn’t retrieving facts. At each step, it looks at the context and produces a probability for *every* token in its vocabulary as the next one. Given *“The capital of France is”*, the distribution spikes hard on **Paris**, and that happens to be true. [^9]

[^9]: Next-token prediction, explained. Jay Alammar, [<VPIcon icon="fas fa-globe"/>“The Illustrated GPT-2”](https://jalammar.github.io/illustrated-gpt2/) — a visual walkthrough of how a language model emits a probability distribution over its vocabulary and samples the next token. Foundational paper: Bengio, Ducharme, Vincent & Jauvin, [<VPIcon icon="fas fa-globe"/>“A Neural Probabilistic Language Model”](https://jmlr.org/papers/v3/bengio03a.html) (JMLR, 2003).


Now take the Cursor bot. Given *“Why do I get logged out on my second device?”*, the distribution might spike just as hard on **“a core security feature.”** (It’s not one token, but bear with me as I write it for simplicity, while meaning: *core*, then *security*, then *feature*, each a confident continuation.)

Note that both distributions can have the same confident peak. One continuation is true, the other is fabricated, and the shape of the distribution can't tell you which is which. Confidence isn't knowledge.

Moreover, the model doesn’t have to pick the token with the highest probability. And also, when it picks a token, you don’t know if it was a clear peak within the distribution, or yet another token with a relatively low probability.

![Image 4: Two next-token distributions with the same tall, confident peak: one over a true continuation, one over an invented one, and the shape gives no way to tell them apart.<br/>(Source: [<VPIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/vneV9NIHs44))](https://contributor.insightmediagroup.io/wp-content/uploads/2026/07/next_token_dist.svg)

### The model was trained to guess

Why does it lean toward answering at all, instead of saying “I don’t know”? Think about how we grade LLMs: benchmarks, largely multiple-choice. Picture a question you have no clue about. Let’s say I give you this question when you have no knowledge in Chemistry:

> **Which enzyme fixes CO2 in the Calvin cycle?**

- Leave it blank: **0 points.**
- Guess and get it wrong: **0 points.**
- Guess and get it right: **+1 point.**

Under that scoring, guessing strictly dominates abstaining. If you don’t know, you should *always* take a shot. Train a model against millions of such items and it internalizes exactly that: a confident answer is worth more than “I can’t tell.” We rewarded hallucination, then act surprised when we get it. [^10]

[^10]: Kalai, Nachum, Vempala & Zhang, [<VPIcon icon="iconfont icon-openai"/>“Why Language Models Hallucinate”](https://openai.com/index/why-language-models-hallucinate/) (OpenAI, 2025). [<VPIcon icon="iconfont icon-arxiv"/>arXiv:2509.04664](https://arxiv.org/abs/2509.04664).

And it’s not only the benchmarks: the raw pretrained model is fairly well-calibrated, then human-feedback fine-tuning flattens that calibration. We literally train the hedging out. [^11]

[^11]: OpenAI, [<VPIcon icon="iconfont icon-arxiv"/>“GPT-4 Technical Report / System Card”](https://arxiv.org/abs/2303.08774) (2023) — the pretrained model is well-calibrated. RLHF fine-tuning flattens that calibration (see the calibration figure).

![Image 5: A multiple-choice benchmark question where a correct answer scores +1, a wrong answer scores 0, and “I don’t know” also scores 0, so any guess can only help.<br/>(Source: [<VPIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/vneV9NIHs44))](https://contributor.insightmediagroup.io/wp-content/uploads/2026/07/benchmark_scoring.svg)

### Opening the box: a quick tour of interpretability

For a long time, LLMs were boxes we couldn’t really understand or peek inside directly. The field of **interpretability** lets us look inside, and there are now public tools (and a series of excellent papers, much of it from Anthropic) that let anyone play with this on open models.

Here’s just enough to make the hallucination mechanism click. We’ll build it in three steps: how the model represents a single word, how those representations cluster into concepts we can read and even steer, and how one such concept misfiring becomes a hallucination.

#### Embeddings vs. activations

Every token maps to a vector called an **embedding**. Note that the token *bank* has the *same* embedding regardless of context, even though in the sentence “I sat by the river**bank**” and in “I deposited cash at the **bank**“, this token means very different things.

The disambiguation happens *inside* the network. As the token flows up through the transformer’s layers, it picks up **activations**, and the activations for *bank* in those two sentences diverge. Context reshapes the representation as it climbs. [^12]

[^12]: Embeddings vs. activations. Static token embeddings give each word one fixed vector: Mikolov, Chen, Corrado & Dean, [<VPIcon icon="iconfont icon-arxiv"/>“Efficient Estimation of Word Representations in Vector Space”](https://arxiv.org/abs/1301.3781) (word2vec, 2013); accessible walkthrough: Jay Alammar, [<VPIcon icon="fas fa-globe"/>“The Illustrated Word2vec”](https://jalammar.github.io/illustrated-word2vec/). That representation becomes context-dependent inside the network, resolving cases like *bank*: Peters et al., [<VPIcon icon="iconfont icon-arxiv"/>“Deep contextualized word representations”](https://arxiv.org/abs/1802.05365) (ELMo, 2018).

![Image 6: The word “bank” starts as one fixed embedding, then in “river bank” versus “cash at the bank” flows up through the layers into two different activation vectors.<br/>(Source: [<VPIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/vneV9NIHs44))](https://contributor.insightmediagroup.io/wp-content/uploads/2026/07/activations_4.svg)

This isn't unique to machines. Read this sentence:

> **The old man the ship.**

Most people parse “the old man” as a noun phrase and then hit a wall. Re-read it: “the old” are the people, and “man” is the *verb*, as in the old crew or sail the ship.

These are called **garden-path sentences** (my linguistics thesis was on them, so I’ll admit a bias: I enjoy them more than most people). The word *man*, given the prior *the old*, gets a very high probability of being a noun. The context primes a prediction, and the prediction is wrong.

It’s the same move as the chant, and the same move the model makes at every token: the words around *man* reshape what it means, exactly as they reshaped *bank* a moment ago.

#### Features

So back to those activations inside the model: recurring patterns of them correspond to interpretable concepts, called **features**. Tools like [<VPIcon icon="fas fa-globe"/>Neuronpedia](https://neuronpedia.org/) act as a free, public microscope for open models (Gemma, Llama, and friends, not Opus or GPT). [^13]

[^13]: [<VPIcon icon="fas fa-globe"/>Neuronpedia](https://neuronpedia.org/) — a free, public microscope for the features of open models.

How do we know what a feature *means*? We feed the model thousands of texts and watch where a given feature lights up (that is, gets *activated*). If it fires on *bear*, *rabbit*, and *elephant* but ignores most other tokens, when we ask another model to label it from those activations, it may come up with “animals / living things,” and now we have a name for that internal feature.

By using tools like Neuronpedia, we can play with these features and actually see them on a real model.

![Image 7: A real feature dashboard on Neuronpedia, showing the text snippets where one feature activates and the label inferred from them.<br/>(Source: [<VPIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/vneV9NIHs44))](https://contributor.insightmediagroup.io/wp-content/uploads/2026/07/neuronpedia_feature-1024x332.png)

#### Features are causal

And you don’t have to take my word for it, you can do it yourself: Neuronpedia’s [<VPIcon icon="fas fa-globe"/>steering interface](https://neuronpedia.org/gemma-2-2b/steer) lets you grab a feature in an open model, clamp its weight up, and watch the output visibly bend toward that concept.

That's the same move Anthropic described when they took the *Golden Gate Bridge* feature within the model, and turned its weight way up, and suddenly asking that model for a chocolate-covered-pretzels recipe routed the chocolate *over the bridge*, and asking how it would spend $10 got you a suggestion to drive across the Golden Gate Bridge and pay the toll. (This was the real, public “Golden Gate Claude.”)

Turning a feature up *changed the output*, so these internal representations aren’t passive read-outs. They steer generation. [^14]

[^14]: Anthropic, [<VPIcon icon="iconfont icon-claude"/>“Golden Gate Claude”](https://anthropic.com/news/golden-gate-claude) (2024) — feature steering made public.

The same was shown with a clean causal swap. Give the model *“The capital of the state containing Dallas is…”* and internally a **Texas** feature fires, leading to the output **Austin**. How do we know Texas was really the hidden step? We reach in and force that feature from Texas to **California**, and the output changes to **Sacramento.** The wiring is real: context fires features, and features guide what comes out.

![Image 8: The prompt about Dallas is unchanged, but forcing the internal “Texas” feature to “California” by hand flips the output from Austin to Sacramento.<br/>(Source: [<VPIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/vneV9NIHs44))](https://contributor.insightmediagroup.io/wp-content/uploads/2026/07/circuit_proof_5.svg)

### The hallucination circuit

Now everything comes together. Anthropic’s interpretability work surfaced something like two interacting circuits [^15]:

[^15]: Anthropic, [<VPIcon icon="fas fa-globe"/>“On the Biology of a Large Language Model”](https://transformer-circuits.pub/2025/attribution-graphs/biology.html) (2025) — the known-entity feature that suppresses the “I can’t tell” circuit, the Dallas→Austin swap, and the Michael Batkin misfire. Readable companion: [<VPIcon icon="iconfont icon-claude"/>“Tracing the thoughts of a language model”](https://anthropic.com/research/tracing-thoughts-language-model).

- A **default “I can’t tell” reflex** that is *on* by default. You can think of it as a brake – guiding the model not to make stuff up.
- A **“do I know this?” feature** that, when it fires, *suppresses* that brake so the model provides an answer.

In the healthy case this is exactly right: you ask something the model knows, “do I know this?” fires, the brake releases, you get a correct answer. The claim about hallucination is that it’s **this switch misfiring, firing on a familiar *shape* with nothing real behind it.**

And if that’s the mechanism, we should be able to *force* the misfire, and Anthropic did just that.

Ask: *“What sport does Michael Batkin play?”* That name doesn’t correspond to anyone the model knows, so “do I know this?” stays quiet, the brake stays on, and you get the right behavior: *“I can’t find a record of anyone named Michael Batkin.”*

![Image 9: The resting circuit on the same question: the “can’t answer” brake is ON, the “do I know this?” feature stays quiet because the name is unfamiliar, and the model correctly declines.<br/>(Source: [<VPIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/vneV9NIHs44))](https://contributor.insightmediagroup.io/wp-content/uploads/2026/07/batkin_3.svg)

Now researchers reach in and **force the “do I know this?” feature on.** The brake releases, and out comes a confident *“Michael Batkin plays chess.”* The model never actually knew a sport. It knew, falsely, that it knew the *person*, and that was enough to release the brake and fabricate the rest.

![Image 10: Forcing the misfire on “What sport does Michael Batkin play?”: the “I can’t tell” brake is suppressed, the “do I know this?” feature is clamped on for a person who doesn’t exist, and the model invents a confident answer.<br/>(Source: [<VPIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/vneV9NIHs44))](https://contributor.insightmediagroup.io/wp-content/uploads/2026/07/batkin_6.svg)

Map that straight back to the Cursor bot:

- Consider someone asks *“How do I change the theme?”* If the model genuinely “knows” this, the brake releases and you get the correct answer. ✅
- But when someone asks *“Is two-device login blocked?”*, the words *device*, *login*, *blocked* all look familiar. So “do I know this?” fires on familiarity, not knowledge, the brake releases, and you get *“Yes, it’s a core security feature.”*  ❌

This is of course not proved, as we don’t have access to the model and its features. But given the same logic that we do know works given the research on the subject, we can assume that the tokens were known, even though the policy didn't exist.

![Image 11: Inside the Cursor bot: familiar words make the “do I know this?” feature misfire, which suppresses the default “I can’t tell” brake, and the bot invents “a core security feature.<br/>(Source: [<VPIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/vneV9NIHs44))](https://contributor.insightmediagroup.io/wp-content/uploads/2026/07/halluc_circuit_5.svg)

### Can we catch it in production?

There are different ways to go about it, and I want to highlight one that I find very elegant – namely, to watch the **entropy of meanings.** [^16]

[^16]: Farquhar, Kossen, Kuhn & Gal, [<VPIcon icon="fas fa-globe"/>“Detecting hallucinations in large language models using semantic entropy”](https://nature.com/articles/s41586-024-07421-0) (Nature, 2024).


Ask the Cursor bot *“How do I change the theme?”* five times. Presuming that the bot “knows” the answer, you won’t get identical wording (it’s probabilistic). But if you cluster the answers by *meaning*, say with another model, you get **one** meaning: “go to Settings then Theme.” Low semantic entropy means a greater chance that the model actually knows this, so you can trust it.

Now ask *“Is two-device login blocked?”* five times. You might get *“Yes, security policy,”* *“No, it’s allowed,”* *“One device per plan,”* *“It’s just a setting,”* *“Maybe, not sure.”* That’s **high** semantic entropy, five different meanings, which is a strong signal the model is making it up.

The cost of using this method in production is real (multiple calls, more tokens, more latency, higher cost), but if you only want to surface high-confidence answers to users, sampling-and-clustering is a useful guardrail.

![Image 12: Sampling a known question five times yields answers that cluster into one meaning (low entropy, trustworthy), while a made-up one scatters into many meanings (high entropy, likely confabulated). (Source: Brief).](https://contributor.insightmediagroup.io/wp-content/uploads/2026/07/semantic_entropy.svg)

Image 12: Sampling a known question five times yields answers that cluster into one meaning (low entropy, trustworthy), while a made-up one scatters into many meanings (high entropy, likely confabulated).<br/>(Source: [<VPIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/vneV9NIHs44)).

---

## So What Do You Actually Do About It?

It’s June 2026, the models still confabulate, and you want to ship something anyway. Here’s the short checklist.

1. **Give the model a real way to say “I can’t tell.”** Tell it to ground answers in retrieved sources and to abstain when it can’t. But prompting is necessary, not sufficient, which is why the next point matters more.
2. **Stress-test the abstention.** After you’ve told it to ground answers and cite sources, *actively try to make it hallucinate.* Throw questions at it whose answers don’t exist, repeatedly, until you’ve convinced yourself the “I can’t tell” path actually fires. Do it continuously to make sure your guardrails don’t break.
3. **If a human’s name goes on the output, a human verifies it.** If you’re a lawyer filing with a court, you can't, at least for now, hand that to a model and trust it.
4. **Don’t give agents permission to cause damage.** This is the hard one, because agents need to *do* things to be useful. But the PocketOS lesson is unambiguous: scope tokens narrowly, require confirmation on destructive operations, keep production unreachable from playgrounds, and put backups in separate volumes. If you let an agent delete production, then occasionally it *will* delete production.

---

## Wrapping Up

We started with a football crowd and ended inside a transformer. Phonemic restoration in your auditory cortex and next-token prediction in a model are the same top-down move: meet an input you can’t fully resolve, and fill the gap with the most plausible, confident thing instead of admitting you can’t tell.

The tales (Cursor, Virgin Money, Sullivan & Cromwell, the 1,633 court cases, PocketOS in nine seconds, Replit) are funny until they cost a business.

The *why* is now legible: models were trained to prefer answering over abstaining, and inside them a “do I know this?” switch can fire on familiarity rather than knowledge, releasing the brake and letting a confident fabrication out.

And the fixes are mostly not magic. They’re abstention you actually tested, human verification where it counts, and agents whose blast radius you deliberately shrank.

We're not past the embarrassing tales. But we now understand them well enough that shipping one is, increasingly, a choice.

---

## References

Every case here, plus a few that didn’t make the article, has primary sources collected on the [**companion resources page**](https://omerr.github.io/embarrassing-ai/resources.html).

::: info

If you enjoyed this, I go deeper on systems and internals on my* [Brief YouTube channel (<VPIcon icon="fa-brands fa-youtube"/>`briefvid`)](https://youtube.com/@briefvid). Questions or pushback? I’d love to hear them, leave a comment. Thanks for reading!

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "That's Embarrassing: Why Frontier AI Still Makes Things Up, and What to Do About It",
  "desc": "It's mid 2026, and the best frontier models out there still hallucinate. I want you to gain two things from reading this article: understanding that AI hallucinations are still real and possibly harmf",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/that-s-embarrassing-why-frontier-ai-still-makes-things-up-and-what-to-do-about-it.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
