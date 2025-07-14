---
lang: en-US
title: "TypeScript without Build Tools"
description: "Article(s) > TypeScript without Build Tools"
icon: iconfont icon-typescript
category:
  - TypeScript
  - Article(s)
tag:
  - blog
  - frontendmasters.com
  - ts
  - typescript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > TypeScript without Build Tools"
    - property: og:description
      content: "TypeScript without Build Tools"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/typescript-without-build-tools.html
prev: /programming/ts/articles/README.md
date: 2024-12-30
isOriginal: false
author:
  - name: Chris Coyier
    url : https://frontendmasters.com/blog/author/chriscoyier/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/4407
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
  name="TypeScript without Build Tools"
  desc="You can build your own TypeScript build process, and you might want to if you need true type checking and compatibility with a wider ecosystem of tools. But lots of tools, including now Node itself, just accept TypeScript as if it were JavaScript. "
  url="https://frontendmasters.com/blog/typescript-without-build-tools/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/4407"/>

::: note TL;DR

[There are a bunch of tools](#the-tools) these days that allow you to write in TypeScript and… *just not think about it* much more than that. You needn’t deal with converting that code into JavaScript yourself.

:::

Here’s what has me thinking about all that.

We’ve got a monorepo at [<FontIcon icon="fa-brands fa-codepen"/>work](https://codepen.io/).

We’ve been moving to TypeScript for years, with mostly positive results. I’m fairly convinced that the code output from writing in TypeScript is better and the experience of writing and editing existing TypeScript code is better DX.

It’s not without challenges though. I hate wasting time futzing with types when I just know it really isn’t improving the quality of my code I’m just fighting with a machine. This concern is multiplied when you see your team doing the same thing.

Another challenge is the part where **you actually have to produce JavaScript**. This is not a difficult job in and of itself. There are loads of tools that do this from [<FontIcon icon="iconfont icon-typescript"/>the canonical `tsc`](https://typescriptlang.org/docs/handbook/compiler-options.html) to tools that do no type checking but can very speedily compile TS to JS (like [<FontIcon icon="fas fa-globe"/>esbuild](https://esbuild.github.io/content-types/#typescript)). But sometimes, you still have to *do* it.

One example from our monorepo is that we have some components that we’d like to write in `.tsx`, but they can be consumed by a number of different site building tools (e.g. a Next.js site, an Astro site, an classic Just Load React On The Page site, etc). The most sane way of handling this is processing the TS into JS ahead of time. That way whatever site that wants to import them can do it as native, normal JavaScript ESM stuff.

```plaintext title="file structure"
monorepo  
  website-1  
  website-2  
  packages  
    components  
      dist  
        MyVeryImportantComponent  
          index.js  
      src  
        MyVeryImportantComponent  
          index.tsx   
```

Now I need to make a **build process** to do this. I’ll probably write a little script. `npm run process-packages` or whatever, fine. I’ll probably use `tsc` for this on purpose, knowing that it isn’t the fastest, but it’s the one that is capable of actually throwing errors when there are TypeScript problems. This is useful because I can call my script in a pre-commit hook in Git, for example, to prevent myself and my team from committing bad TypeScript. I can call the script in CI as well which is additional protection.

So now I have `tsc` building from `src` to `dist`, great. But TypeScript explicitly [will never build an “other files” copy machine (<FontIcon icon="iconfont icon-github"/>`Microsoft/TypeScript`)](https://github.com/Microsoft/TypeScript/issues/30835). Well that’s annoying. What about my other stuff?

```plaintext title="file structure"
packages
  components  
    src  
      MyVeryImportantComponent  
        index.tsx  
        queries.graphql  
        styles.module.scss
```

Now I have to wire up some *new* machine to copy anything that isn’t TypeScript over from `src` to `dist`. Blech. Fine, I’ll do it.

But this is all complicated by the fact that this script we’re building needs to be able to run two ways:

1. As a builder, where you call it and it does the job
2. As a watcher, where it runs the build when any pertinent file changes

It’s unacceptable DX to expect a developer to run a build command after every file change manually. So we have to build our own little watcher too. I guess it’s [<FontIcon icon="iconfont icon-github"/>`paulmillr/chokidar`](https://github.com/paulmillr/chokidar) time? I hate piling on dependencies, but that’s the only watcher that’s ever felt truly reliable to me.

I don’t mean to paint this picture too negatively. This is all doable. *This is the job.* There are tools to help with this that get better over time. But wow, it’s a lot when you consider it was just TypeScript, this invisible layer of special code helping syntax, that pushed us this far into toolsville.

I’d rather focus on the positive stuff I’m seeing here. As the years tick by, and TypeScripts popularity remains high, the surrounding tools that deal in JavaScript are more and more fine with “just leave it as TypeScript.” I find that interesting!

This “native” support of TypeScript is a product choice. *We know some of our customers write and prefer TypeScript so we’ll make it easier for them.* But there is no Official™ way to do this. The product needs to decide how they are going to handle it. Are they going to check types for you and alert you (somehow? somewhere?) to type problems? Or are they leaving type problems to you, and if the code compiles to JavaScript, so it shall be. What version of TypeScript is it going to support? Is configuration necessary?

So what are these products?

---

## Tools & Products That Let You Write TypeScript “Natively”

### Frameworks

- [Astro](https://docs.astro.build/en/guides/typescript/): *“Astro ships with built-in support for[<FontIcon icon="iconfont icon-typescript"/>TypeScript](https://typescriptlang.org/). You can import`.ts`and`.tsx`files in your Astro project, write TypeScript code directly inside your[<FontIcon icon="iconfont icon-astro"/>Astro component](https://docs.astro.build/en/basics/astro-components/#the-component-script), and even use an[`astro.config.ts`](https://docs.astro.build/en/guides/configuring-astro/#the-astro-config-file)file for your Astro configuration if you like.”*
- [<FontIcon icon="iconfont icon-nextjs"/>Next.js](https://nextjs.org/docs/pages/api-reference/config/typescript): *“Next.js comes with built-in TypeScript, automatically installing the necessary packages and configuring the proper settings”*
- This is pretty common in UI meta frameworks… [<FontIcon icon="iconfont icon-nuxt"/>Nuxt](https://nuxt.com/docs/guide/concepts/typescript), [<FontIcon icon="fas fa-globe"/>Remix](https://remix.run/docs/hi/main/guides/typescript), [<FontIcon icon="iconfont icon-svelte"/>SvelteKit](https://svelte.dev/docs/svelte/typescript), [<FontIcon icon="fas fa-globe"/>Redwood](https://docs.redwoodjs.com/docs/typescript/introduction), etc. This, likely, is the thing that pushed other products to do the same.

### Runtimes

- [<FontIcon icon="fas fa-globe"/>Deno](https://docs.deno.com/runtime/fundamentals/typescript/): *“TypeScript is a first class language in Deno, just like JavaScript or WebAssembly.”* You can just `deno run script.ts`, deploy `.ts` files to their cloud service, and there is a type checking command. See what I mean about it being a product choice?
- [<FontIcon icon="fas fa-globe"/>Bun](https://bun.sh/docs/runtime/typescript): *“Bun treats TypeScript as a first-class citizen.”*
- [<FontIcon icon="fa-brands fa-cloudflare"/>Cloudflare Workers:](https://developers.cloudflare.com/workers/languages/typescript/) *“TypeScript is a first-class language on Cloudflare Workers.”*

### Bundlers

- [<FontIcon icon="fas fa-globe"/>Vite](https://vite.dev/guide/features#typescript): *“Vite supports importing`.ts`files out of the box.”*
- [<FontIcon icon="fas fa-globe"/>esbuild](https://esbuild.github.io/content-types/#typescript): *“…esbuild has built-in support for parsing TypeScript syntax and discarding the type annotations.”*
- [<FontIcon icon="fas fa-globe"/>Parcel](https://parceljs.org/languages/typescript/): *“Parcel supports TypeScript out of the box without any additional configuration.”*

### Meta

- [tsx](https://tsx.is/): The big thing here is the tsx project, or “TypeScript Execute”. A lot of times what you’re trying to do in Node is `node script.ts`, like in an npm script, but you can’t, because Node doesn’t support TypeScript “natively”. But replace `node` with `tsx`, and it works.

---

## Drumroll?

I started writing this post a few weeks ago, and now I’ve just seen: [<FontIcon icon="fas fa-globe"/>Node.js Now Supports TypeScript By Default](https://totaltypescript.com/typescript-is-coming-to-node-23).

::: info <FontIcon icon="fas fa-globe"/><code>totaltypescript.com</code>

> Node 23 will soon be able to run TypeScript files without any extra configuration.
> 
> You can run`node index.ts`with no further flags
> 
> Node will strip out the types using a version of`swc`, then run the resulting code.

:::

Well there ya have it. Feels like we were on to something there eh?

I feel like this pushed it more into Official™ territory and now this will be less of a product-level choice and more of a “leverage what the technology already does” choice. For instance, products don’t have do anything special or build additional technology to support TypeScript, they’ll just do what Node does. And they won’t have to fret over “well should we do type checking?” because they can just follow in the steps of what the tool already does (just strip them).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "TypeScript without Build Tools",
  "desc": "You can build your own TypeScript build process, and you might want to if you need true type checking and compatibility with a wider ecosystem of tools. But lots of tools, including now Node itself, just accept TypeScript as if it were JavaScript. ",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/typescript-without-build-tools.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
