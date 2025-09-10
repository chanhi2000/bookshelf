---
lang: en-US
title: "A guide to graceful degradation in web development"
description: "Article(s) > A guide to graceful degradation in web development"
icon: iconfont icon-typescript
category:
  - TypeScript
  - Article(s)
tag:
  - blog
  - blog.logrocket.com
  - ts
  - typsecript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > A guide to graceful degradation in web development"
    - property: og:description
      content: "A guide to graceful degradation in web development"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/guide-graceful-degradation-web-development.html
prev: /programming/ts/articles/README.md
date: 2025-02-11
isOriginal: false
author:
  - name: Rosario De Chiara
    url : https://blog.logrocket.com/author/rosariodechiara/
cover: /assets/image/blog.logrocket.com/guide-graceful-degradation-web-development/banner.png
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
  name="A guide to graceful degradation in web development"
  desc="Implement graceful degradation in frontend apps by handling failures, mitigating API timeouts, and ensuring a seamless UX with fallbacks."
  url="https://blog.logrocket.com/guide-graceful-degradation-web-development"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/guide-graceful-degradation-web-development/banner.png"/>

Graceful degradation is a design principle in software and system engineering that ensures a system continues functioning - albeit with reduced performance or features - when one or more of its components fail or encounter problems.

![A Guide To Graceful Degradation In Web Development](/assets/image/blog.logrocket.com/guide-graceful-degradation-web-development/banner.png)

Rather than completely breaking down, the system “degrades gracefully” by maintaining core functionality and providing a minimally viable user experience. Which aspect is degraded depends on the kind of system/software.

For example, a mapping service might stop returning additional details about a city area because of a network slowdown but still will let the user navigate the areas of the map that have already been downloaded; a website might remain navigable and readable even if certain scripts, images, or advanced features don’t load, like webmail that will still let you edit your emails even if you are in airplane mode.

The concept of “graceful degradation” contrasts with “fail-fast” approaches, where a system immediately halts operations when it encounters a failure. Graceful degradation emphasizes resilience and user-centric design by ensuring critical services remain accessible during partial disruptions.

As usual, the code for this article [is available on GitHub. (<VPIcon icon="iconfont icon-github"/>`rosdec/graceful_degradetion`)](https://github.com/rosdec/graceful_degradetion) We will use tags to follow our path along the “degradation” of the functionalities.

---

## Implementing graceful degradation in a demo application

To support our explanation, we will use a simple application (written in [**Deno/Fresh**](/blog.logrocket.com/getting-started-deno-fresh.md) but the language/framework is irrelevant in this article) that will invoke a remote API to get a fresh joke for the user.

The interface is pretty simple and the code can be found on the repository (at [this tag (<VPIcon icon="iconfont icon-github"/>`rosdec/graceful_degradetion`)](https://github.com/rosdec/graceful_degradetion/releases/tag/initial_setup) in particular).

The <VPIcon icon="fas fa-folder-open"/>`islands\`<VPIcon icon="fa-brands fa-react"/>`Joke.tsx` file is a preact component responsible for displaying a random joke in a web interface. It uses the [**`useState` and `useEffect` Hooks**](/blog.logrocket.com/react-hooks-cheat-sheet-solutions-common-problems.md) to manage the joke’s state and fetch data when the component mounts. The joke is fetched from the `/api/joke` endpoint, and users can retrieve a new one by clicking a button. The component renders the joke along with a button that triggers fetching a new joke dynamically when clicked.

The <VPIcon icon="fas fa-folder-open"/>`routes\api\`<VPIcon icon="iconfont icon-typescript"/>`joke.ts` file defines an API endpoint that returns a random joke. It fetches a joke from an external API (for this example, we use [<VPIcon icon="fas fa-globe"/>a service](https://official-joke-api.appspot.com/random_joke) but any other similar service is fine) and extracts the setup and punchline. The response is then formatted as a single string (`setup + punchline`) and returned as a JSON response to the client.

---

## Failures and mitigations

The application doesn’t do much, but from an architectural point of view, it is comprised of two tiers: the frontend and the backend with the API. Our frontend is simple and cannot fail, but the backend, our “joke” API, can fail: it relies on an external service that is out of our control.

Let’s look at the current version of the API:

```ts
import { FreshContext } from "$fresh/server.ts";

export const handler = async (_req: Request, _ctx: FreshContext): Promise<Response> => {
  const res = await fetch(
    "https://official-joke-api.appspot.com/random_joke",
  );
  const newJoke = await res.json();

  const body = JSON.stringify(newJoke.setup + " " + newJoke.punchline);

  return new Response(body);
};
```

### First failure: Handling API timeouts gracefully

The first kind of failure we will implement is aiming to randomly get a timeout on the external API call. Let’s modify the code:

```ts
import { FreshContext } from "$fresh/server.ts";

export const handler = async (
  _req: Request,
  _ctx: FreshContext,
): Promise<Response> => {
  // Simulate a timeout by setting a timeout promise
  const timeoutPromise = new Promise((resolve) =>
    setTimeout(() => resolve(null), 200)
  );

  // Fetch the joke from the external API
  const fetchPromise = fetch(
    "https://official-joke-api.appspot.com/random_joke",
  );

  // Race the fetch promise against the timeout
  const res = await Promise.race([fetchPromise, timeoutPromise]);

  if (res instanceof Response) {
    const newJoke = await res.json();
    const body = JSON.stringify(newJoke.setup + " " + newJoke.punchline);
    return new Response(body);
  } else {
    return new Response("Failed to fetch joke", { status: 500 });
  }
};
```

In this new version, we add a `timeoutPromise` that will “`race`” with our external API call: if the external API answers in less than `200ms` (i.e. wins the race), we get a new joke, otherwise, we get `null` as a result. This is disruptive - our frontend relies on the response from the API as a JSON object, and it gets a message (“Failed to fetch joke”) and a 500 HTTP error. In the browser, it will produce these effects:

![Random Joke Generator Frontend Sample](/assets/image/blog.logrocket.com/guide-graceful-degradation-web-development/random-joke-generator-frontend.png)

The joke is not refreshed and you get an error message in the console because the message you get from the API is not a formatted JSON. To mitigate the random timeouts we injected in our API code, we can provide a safety net: when the fetch fails, we return a standard joke formatted as the frontend expects:

```ts
// ...
  // Race the fetch promise against the timeout
  const res = await Promise.race([fetchPromise, timeoutPromise]);

  if (res === null) {
    // If the timeout wins, return a fallback response
    const fallbackJoke = {
      setup: "[cached] Why did the developer go broke?",
      punchline: "Because they used up all their cache!",
    };
    const body = JSON.stringify(
      fallbackJoke.setup + " " + fallbackJoke.punchline,
    );
    return new Response(body);
  }
// ...
```

To mitigate the effects of the failure we just created, we check the call has returned null; in such case, it comes in handy to have a `fallbackJoke` that will be returned in the same format expected by the frontend. This simple mechanism has augmented the resilience of our API to a particular type of failure: the unpredictable timeout of the external API.

### Second failure: Handling network errors gracefully

In the timeout example, the mechanism we deployed to mitigate still relies on the fact that the server with the external API is reachable. If you unplug the network cable from your PC (or activate airplane mode), you will see that the frontend will fail in a new way:

![Random Joke Generator With A Frontend Failure](/assets/image/blog.logrocket.com/guide-graceful-degradation-web-development/random-joke-generator-frontend-failures.png)

The reason is that the backend is not able to reach the external API server and thus returns an error to the backend (check the logs from Deno for more information). To mitigate this situation, we must modify the backend to be aware of the failure of the external API and then handle it by serving a fallback joke:

```ts
  // ...
    // If the fetch completes in time, proceed as usual
    if (res instanceof Response) {
      const newJoke = await res.json();
      const body = JSON.stringify(newJoke.setup + " " + newJoke.punchline);
      return new Response(body);
    } else {
      throw new Error("Failed to fetch joke");
    }
  } catch (_error) {
    // Handle any other errors (e.g., network issues)
    const errorJoke = {
      setup: "[cached] Why did the API call fail?",
      punchline: "Because it couldn't handle the request!",
    };
    const body = JSON.stringify(errorJoke.setup + " " + errorJoke.punchline);
    return new Response(body, { status: 500 });
  }
};
```

The mitigation relies on the fact that instead of returning a generic “Failed to fetch joke” message, we wrap the whole interaction with the external API server in a try/catch block. This block will let us handle the network failure by serving a local joke instead of an expressive error message. This is the final solution to the possible errors you can get on the backend, and it increases the system’s resilience.

---

## Mitigation for the frontend

In the previous section, we increased the resilience to failures but we also want to keep a user-centric approach as a part of the graceful degradation. At the moment, the user is not aware if the joke they get is fresh or not. To increase this knowledge, we will extend the JSON returned from the backend to keep track of the freshness of the joke. When the external API fails, the JSON that is returned to the frontend will state that the joke is not fresh (`fresh` is `false`):

```ts
const errorJoke = {
  setup: "Why did the API call fail?",
  punchline: "Because it couldn't handle the request!",
  fresh: false
};
```

Otherwise, when the external API succeeds, we return a JSON object with the `fresh` field set to `true`:

```ts
if (res instanceof Response) {
  const newJoke = await res.json();
  newJoke.fresh = true;
  const body = JSON.stringify(newJoke);
  return new Response(body);
}
```

Now that the frontend receives the freshness of every joke, we just need to show it to the user:

![Random Joke Generator Frontend Sample](/assets/image/blog.logrocket.com/guide-graceful-degradation-web-development/random-joke-generator-frontend.png)

When the external API call fails, a message is shown in red, so the user knows what they are getting.

---

## Conclusion

In this article, we explored the concept of graceful degradation, highlighting two mechanisms for mitigating system failures. We explored two principles for implementing graceful degradation: building resilient components to withstand failures and adopting a user-centric approach so users are aware of any limited functionalities of the system in case of failures.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "A guide to graceful degradation in web development",
  "desc": "Implement graceful degradation in frontend apps by handling failures, mitigating API timeouts, and ensuring a seamless UX with fallbacks.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/guide-graceful-degradation-web-development.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
