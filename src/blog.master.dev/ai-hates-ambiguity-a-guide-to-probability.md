---
lang: en-US
title: "AI Hates Ambiguity: A Guide to Probability"
description: "Article(s) > AI Hates Ambiguity: A Guide to Probability"
icon: fa-brands fa-react
category:
  - Node.js
  - React.js
  - AI
  - LLM
  - Anthropic
  - Claude
  - Article(s)
tag:
  - blog
  - master.dev
  - node
  - nodejs
  - node-js
  - react
  - reactjs
  - react-js
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
  - anthropic
  - claude
head:
  - - meta:
    - property: og:title
      content: "Article(s) > AI Hates Ambiguity: A Guide to Probability"
    - property: og:description
      content: "AI Hates Ambiguity: A Guide to Probability"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.master.dev/ai-hates-ambiguity-a-guide-to-probability.html
prev: /programming/js-react/articles/README.md
date: 2026-02-19
isOriginal: false
author:
  - name: Durgesh Rajubhai Pawar
    url: https://blog.master.dev/author/durgesh/
cover: https://blog.master.dev/wp-json/social-image-generator/v1/image/8618
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "React.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-react/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Claude > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/claude/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="AI Hates Ambiguity: A Guide to Probability"
  desc="The more effort you put in to what you put in, the higher quality you're going to get out."
  url="https://blog.master.dev/ai-hates-ambiguity-a-guide-to-probability/"
  logo="https://blog.master.dev/favicon.ico"
  preview="https://blog.master.dev/wp-json/social-image-generator/v1/image/8618"/>

We often treat Large Language Models (LLMs) like magic chat boxes. Brilliant colleagues ever awaiting our next question. This isn’t terribly far off these days. We’re certainly past the [stochastic parrot (<VPIcon icon="fa-brands fa-bluesky"/>`damonberes.com`)](https://bsky.app/profile/damonberes.com/post/3mdjwxhps5c2r) phase. As with a human colleague, the more specific we are in our questions and requests, the more useful the conversation will be.

Every time you send a prompt, you are defining a **probability distribution**. You provide the context (the input tokens), and the model calculates the most likely/useful next set of output tokens based on the weights in its neural network.

When you **constrain** that distribution effectively, the result feels magical: precise, production-ready code. But when we force the AI to **guess** our intent — because we were vague, assumed it “knew the context,” or skipped the edge cases — we **widen the continuation space**. We force the model to choose from a massive array of potential answers, most of which are mediocre.

In engineering, we often call bogus results “hallucinations,” but in practice, they’re **probability drift** caused by unclear guidance. It happens because we failed to anchor the model’s completion path to a specific, high-quality distribution.

To fix this, we need to stop “chatting” and start **architecting**. Let’s look at exactly what happens when we ignore the mechanism.

---

## The “Hostile” Prompt

I call the prompt below “hostile” because it ignores the model’s statistical reality. It treats the AI like a mind reader rather than a pattern matcher.

The Prompt:

```md title="prompt"
Write a function to fetch user data from an API and save it to state.
```

In this simple request, there are three distinct **specification gaps** that will break your production app:

1. **The Tutorial Bias:** The model’s training data is dominated by simple tutorials where APIs never fail. Without constraints, it defaults to this “Happy Path” because it is statistically the most common pattern.
2. **Type Blindness:** It generates generic JavaScript instead of strict TypeScript because the constraints weren’t negotiated.
3. **The State Gap:** It writes the fetch logic immediately (prediction) without handling intermediate states (loading/error), causing UI flashes.

---

## 🛠 The “Before” Output (The Drift)

```jsx
// The AI's "Default" Response
useEffect(() => {
  fetch('/api/users')
    .then(res => res.json())
    .then(data => setUsers(data)); // Risky: No loading state, no
error handling, race conditions.
  }, []);
```

This code isn’t “broken”, it’s just optimized for brevity, not production. It lacks cancellation, error boundaries, and loading indicators.

### The Theory (Why This Happens)

Why did the AI give us such mediocre code? It wasn’t because it’s “dumb.” It was a failure of **Contextual Anchoring**.

To fix this, we need to respect the architecture. The model operates on a complex Transformer architecture, but the behavior can be summarized as:

1. **Ingest:** It maps your input tokens into a high-dimensional vector space.
2. **Attention:** It calculates “attention weights” — deciding which previous tokens are most relevant to predicting the next one.
3. **Sampling:** It selects the next token based on the calculated probabilities.

### The Limitation: Attention Decay

Critically, the model’s attention mechanism is finite. It suffers from **Token Locality**. As a conversation grows longer, the influence of earlier tokens (like your initial instructions) can dilute.

If you paste a 500-line file and ask for a refactor at the bottom, the model is statistically less likely to “attend” to the specific style guide you pasted at the very top. To combat this, effective engineers re-inject critical constraints (like “Remember to use strict TypeScript”) closer to the generation point.

### The “Likelihood” Mistake

In our hostile prompt, we ignored this mechanism. We provided a short, vague input, which left the “search space” for the answer too wide. When you say “Write a function”, the model maximizes likelihood by choosing the path of least resistance: the tutorial snippet. Every time we leave a constraint undefined, the model fills the gap with the most common pattern in its dataset.

We need to move from **Implied Intent** (hoping it gets it) to **Explicit Constraint** (forcing the distribution toward quality).

---

## Solutions

We are going to make three specific negotiations with the AI to ensure stability.

1. **The Persona Negotiation (System Context)**: The AI isn’t “wrong” when it gives you a simple script; it is fulfilling the pattern of a “helpful assistant”. We need to narrow the distribution to “Senior Engineering.” The fix here is to use a system prompt of sorts, or global context. Something like a <VPIcon icon="fa-brands fa-markdown"/>`claude.md` file or <VPIcon icon="fa-brands fa-markdown"/>`agents.md` file. It could have context like this: *You are a Senior Frontend Engineer who prioritizes defensive coding. You reject “happy path” code. You always implement error handling, type safety, and cleanup functions.*
2. **The Format Negotiation (Output Constraints):** Just as [**the browser struggles**](/blog.master.dev/the-browser-hates-surprises.md) when elements load out of order, the AI struggles when it mixes conversational filler with code. We need to force a strict structure. The fix here is to include extra information in our prompts, to the tune of: *Return only the code block. Do not add introductory text. Ensure the code is strictly typed TypeScript.*
3. **The Logic Anchor (Chain of Thought):** This is the most critical technique. Normally, the AI predicts code token-by-token immediately. This is like coding without a plan. By asking for a “plan” first, we force the model to generate tokens that **bias the** **attention weights** for the subsequent code. If the model writes “I must handle the race condition *before* it writes the code, the probability of it actually writing AbortController skyrockets. The fix here might be prompting to ask for a plan first, like: *Before generating the code, list the 3 most likely failure modes for this feature (e.g., race conditions, network errors) and explain how you will prevent them.*

### Phase 4: The “Stable” Interaction

Here is a prompt asking for the same thing we did originally, but negotiated correctly.

The Orchestrated Prompt:

```md title="prompt"
Write a useUsers hook.

1. Use AbortController to handle unmounting (Race Condition).
2. Strictly type the response.
3. Return a tuple: [data, loading, error]
```

### 🛠 The “After” Output

```jsx :collapsed-lines
// The AI's "Production" Response
const useUsers = (): [User[], boolean, Error | null] => {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null); // Reset error state on new fetch
    const fetchData = async () => {
      try {
        const res = await fetch("/api/users", {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        const result = await res.json();
        setData(result);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err as Error);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false); // Guard against unmounted state updates
        }
      }
    };
    fetchData();
    return () => controller.abort(); // Cleanup negotiated.
  }, []);
};
```

Notice the difference. It handles the loading state. It resets errors on retry. It cleans up after itself. It feels like it was written by a human engineer because we gave the model the constraints it needed *before* it started predicting.

### A Note on Limitations

It is important to acknowledge that prompt engineering is not magic. Even the most perfectly constrained prompt cannot force a model to solve a problem that exceeds its training data or reasoning capabilities. If the model simply doesn’t know a library, no amount of “persona setting” will teach it.

However, for the vast majority of daily engineering tasks, the failure point is not the model’s capability — it is the prompt’s ambiguity.

---

## Conclusion

Prompt Engineering is not about “tricking” the machine; it is about **constraining** the machine. Every bug, every generic tutorial script, and every “hallucination” is a signal that the continuation space was too wide. We failed to give the AI the context it needed to converge on the right answer.

Stop hoping for good code. Start **architecting** for it.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "AI Hates Ambiguity: A Guide to Probability",
  "desc": "The more effort you put in to what you put in, the higher quality you're going to get out.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.master.dev/ai-hates-ambiguity-a-guide-to-probability.html",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
