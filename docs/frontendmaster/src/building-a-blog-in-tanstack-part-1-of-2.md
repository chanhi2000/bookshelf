---
lang: en-US
title: "Building a Blog in TanStack (Part 1 of 2)"
description: "Article(s) > Building a Blog in TanStack (Part 1 of 2)"
icon: iconfont icon-tanstack
category:
  - Node.js
  - React.js
  - Tanstack
  - Article(s)
tag:
  - blog
  - blog.master.dev
  - node
  - nodejs
  - node-js
  - react
  - reactjs
  - react-js
  - tanstack
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Building a Blog in TanStack (Part 1 of 2)"
    - property: og:description
      content: "Building a Blog in TanStack (Part 1 of 2)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.master.dev/building-a-blog-in-tanstack-part-1-of-2.html
prev: /programming/js-react/articles/README.md
date: 2026-04-17
isOriginal: false
author:
  - name: Adam Rackis
    url: https://blog.master.dev/author/adamrackis/
cover: https://blog.master.dev/wp-json/social-image-generator/v1/image/9303
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

[[toc]]

---

<SiteInfo
  name="Building a Blog in TanStack (Part 1 of 2)"
  desc="A site building framework like TanStack Start can be used to make a server-side rendered blog, no problemo. "
  url="https://blog.master.dev/building-a-blog-in-tanstack-part-1-of-2/"
  logo="https://blog.master.dev/favicon.ico"
  preview="https://blog.master.dev/wp-json/social-image-generator/v1/image/9303"/>

[<VPIcon icon="iconfont icon-tanstack"/>TanStack Start](https://tanstack.com/start/latest) is one of the newest web frameworks, and its popularity is rising quickly. Start is a thin server-side layer that sits atop TanStack Router and provides features like server functions, API endpoints, and server-side rendering. I wrote [**a three-part introduction to Router**](/blog.master.dev/blog/introducing-tanstack-router.md) and [**an introduction to Start**](/blog.master.dev/blog/introducing-tanstack-start.md).

This post will be a bit different. We’ll explore TanStack start via a more traditional, old-school use case: we’ll implement a blog (you can see [the complete thing on GitHub (<VPIcon icon="iconfont icon-github"/>`arackaf/tanstack-blog-blog-post`)](https://github.com/arackaf/tanstack-blog-blog-post)). It’s somewhat of a cliche, but it will let us explore important features, such as server functions and routing parameters, as well as niche patterns, such as static pre-rendering.

::: info Article Series

```component VPCard
{
  "title": "Building a Blog in TanStack (Part 1 of 2)",
  "desc": "A site building framework like TanStack Start can be used to make a server-side rendered blog, no problemo. ",
  "link": "/blog.master.dev/building-a-blog-in-tanstack-part-1-of-2.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "Building a Blog in TanStack (Part 2 of 2)",
  "desc": "A blog is a perfect use case for pre-rendering, so that the static build files can render all on their own. TanStack Start can even help with the server functions via middleware.",
  "link": "/blog.master.dev/building-a-blog-in-tanstack-part-2-of-2.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

:::

Here in part 1, we’ll implement our blog. Then, in part 2, we’ll explore static generation in order to deploy it in the most sensible way. Stay tuned for that!

---

## Setting Up

We’ll write our blog posts in Markdown files and scan the appropriate directory to discover the posts we have, so we can generate links to them. Then, for the page that displays an individual blog post, we’ll parse the Markdown content and generate HTML with code highlighting.

### Finding the Posts

As a good first step, we’ll need to read all our blog posts. These posts are under the blog folder, in eponymous folders, each with an <VPIcon icon="fa-brands fa-markdown"/>`index.md`.

![A visual representation of a folder structure for a blog site, showing a <VPIcon icon="fas fa-folder-open"/>`src` folder containing a <VPIcon icon="fas fa-folder-open"/>`blog` folder with two subfolders <VPIcon icon="fas fa-folder-open"/>`post-1` and <VPIcon icon="fas fa-folder-open"/>`post-2`, each containing an <VPIcon icon="fa-brands fa-markdown"/>`index.md` file.](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/04/img1.png?resize=296%2C276&ssl=1)

We just want the names of these posts so we can generate links on our homepage. Vite actually has a nice `import.meta.glob` method to read in all files in a dynamic way.

```ts
const allPosts: Record<string, any> = import.meta.glob(
  "../blog/**/*.md", 
  { query: "?raw", eager: true }
);
```

From there, we can inspect the URL of each `.md` file we find and get the correct name. Here’s the entire method for this.

```ts
export const getAllBlogPosts = () => {
  const allPosts: Record<string, any> = import.meta.glob("../blog/**/*.md", { query: "?raw", eager: true });

  return Object.entries(allPosts).reduce(
    (result, [key, module]) => {
      const paths = key.split("/");
      const slug = paths.at(-2)!;

      result[slug] = module.default;
      return result;
    },
    {} as Record<string, string>,
  );
};
```

### Reading Metadata About Each Blog Post

We’ll use [<VPIcon icon="fa-brands fa-npm"/>`gray-matter`](https://npmjs.com/package/gray-matter) to read metadata from our blog posts.

```ts
import matter from "gray-matter";
```

This will allow us to put metadata at the top of our Markdown blog files.

```md
---
title: Post 1
date: "2025-12-05T10:00:00.000Z"
description: Post 1
---
```

From that, we can get the title, date, and description. We’ll whip up some types and helpers for this data.

```ts
export type PostMetadata = {
  title: string;
  date: string;
  description: string;
  slug: string;
  author: string;
  ogImage: string;
  coverImage: string;
};

export type Post = PostMetadata & {
  content: string;
};
```

```ts
const metadataFields: (keyof PostMetadata)[] = ["title", "date", "description", "slug", "author", "ogImage", "coverImage"];
const postFields: (keyof Post)[] = [...metadataFields, "content"];
```

And a function to read the metadata for a single blog post.

```ts
export function getPostMetadata(slug: string, fileContents: string): PostMetadata {
  const { data } = matter(fileContents);

  const result: PostMetadata = {
    slug,
  } as PostMetadata;

  // Ensure only the minimal needed data is exposed
  metadataFields.forEach(field => {
    if (typeof data[field] !== "undefined") {
      result[field] = data[field];
    }
  });

  return result;
}
```

---

## Building the Homepage

Let’s build the main page for our blog.

Here’s the route for our root index (/) path. We’ve defined a loader, as well as specified the component we want rendered. The loader will read the titles and metadata for each post. Then our component will render links for each.

```ts
export const Route = createFileRoute("/")({
  loader: async () => {
    const posts = await getAllPosts();
    return {
      posts,
    };
  },
  component: App,
});
```

Don’t let the boilerplate details here scare you. Even without AI, the standard TanStack file watcher that runs in dev mode will generate a minimal route object with the correct path whenever you add a new file in the routes folder.

Our loader reads our posts. Then we connect up a React component for this route. Let’s look at each, in turn.

If you’re thinking our loader can just call those utility methods we looked at before, well, not so fast. Those methods were reading file contents on disk. That’s all well and good, but in TanStack Start, our loaders are isomorphic. When you first browse to your website, that initial page will run its loader on the server, and the server will render your React component. Any subsequent time you browse to any page, that loader will run on the client, in your user’s browser. That means there’s no way we can run Node APIs to read file contents.

The solution is to use a Server Function. The docs [<VPIcon icon="iconfont icon-tanstack"/>are here](https://tanstack.com/start/latest/docs/framework/react/guide/server-functions), but the short version is that a TanStack Server Function is a function you define that always runs on the server. If you call a server function from a server-only location, such as an API endpoint, another server function, or even a route loader running on the server, TanStack will simply invoke it. And if you call a Server Function from the client, TanStack will do the legwork of firing off the correct network request.

This call below is a Server Function:

```ts
const posts = await getAllPosts();
```

Let’s look at its definition.

```ts
const getAllPosts = createServerFn().handler(async () => {
  const postContentLookup = getAllBlogPosts();

  const blogPosts = Object.entries(postContentLookup).map(([slug, content]) => getPostMetadata(slug, content));

  const allPosts: PostMetadata[] = blogPosts
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return allPosts;
});
```

We get all the posts on disk, then read the metadata for each. This is a server function, so it will always run on the server, no matter where the route’s loader runs.

### Rendering the Blog Links

We won’t show the entire route component, but we will read the data from the loader.

```tsx
function App() {
  const { posts } = Route.useLoaderData();
```

Later, we’ll loop it and emit links for each blog post.

```tsx
<div>
  {posts.map(post => (
    <div key={post.title} className="blog-list-item">
      <h1>
        <Link to={`/blog/$slug`} params={{ slug: post.slug }}>
          {post.title}
        </Link>
      </h1>
      <small>
        <DateFormatter dateString={post.date}></DateFormatter>
      </small>
      <p>{post.description}</p>
    </div>
  ))}
</div>
```

We can see it works!

![](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/04/img2.png?resize=948%2C954&ssl=1)

---

## Rendering Each Blog Post

Let’s get a route created to render an individual blog post. As the `<Link>` component from the homepage implied, we want our URLs of the form `/blog/title-of-post`. Obviously `title-of-post` is dynamic, so we’ll need a route variable. In TanStack, we do this by first creating a folder called `blog` inside of our `routes` folder, and then inside of that, we create a `$slug.tsx` file.

The dollar sign in front of `$slug` means that $slug is actually a route parameter, which will be replaced with whatever is in the URL at that location.

As before, the TanStack file watcher will scaffold a minimal route for us.

```tsx
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/blog/$slug")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/junk/$slug"!</div>;
}
```

Let’s fill it out with some details.

```tsx
export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    return await getPostContent({ data: { slug: params.slug } });
  },
  head: ({ params }) => {
    return {
      meta: [
        {
          title: `${params.slug} | Adam Rackis's blog`,
        },
      ],
    };
  },
  component: RouteComponent,
});`
```

We add a loader that again calls a Server Function we’ll create in a moment. The loader takes a params object we can destructure, which contains the value of our path parameter, which we named `$slug`. This was because our route was named <VPIcon icon="fa-brands fa-react"/>`$slug.tsx`.

Then we have a `head` function which allows us to set a title for this page (among other things), and like the loader, allows us access to the path params.

Now let’s look at our server function that grabs our post’s content, for whatever slug we have in our url.

```tsx
export const getPostContent = createServerFn()
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }) => {
    const postContentLookup = getAllBlogPosts();

    if (!postContentLookup[data.slug]) {
      throw new Error(`Post not found: ${data.slug}`);
    }

    const post = await getPost(data.slug, postContentLookup[data.slug]);

    return { post };
  });`
```

We get the entire list of all blog posts, and verify that the one we want is in there. If it is, we call `getPost` and return the result. Let’s take a look at `getPost` now

```tsx
export async function getPost(slug: string, fileContents: string): Promise<Post> {
  const { data, content: markdownContent } = matter(fileContents);
  const content = await markdownToHtml(markdownContent);

  const result: Post = {
    slug,
    content,
  } as Post;

  // Ensure only the minimal needed data is exposed
  postFields.forEach(field => {
    if (typeof data[field] !== "undefined") {
      result[field] = data[field];
    }
  });

  return result;
}
```

The real work happens in `markdownToHtml` which converts our Markdown to HTML.

I decided to use [<VPIcon icon="iconfont icon-github"/>`markdown-it/markdown-it`](https://github.com/markdown-it/markdown-it) along with [<VPIcon icon="fas fa-globe"/>Shiki](https://shiki.matsu.io/), but there are endless options out there. Here’s what it looks like.

```tsx :collapsed-lines
import Shiki from "@shikijs/markdown-it";
import MarkdownIt from "markdown-it";

const markdownIt = MarkdownIt({
  html: true,
}).use(
  await Shiki({
    themes: {
      light: "dark-plus",
      dark: "dark-plus",
    },
    transformers: [
      {
        name: "line-numbers-pre",
        preprocess: (_: string, options: any) => {
          if (options?.meta?.__raw?.includes("line-numbers")) {
            options.attributes = {};
            options.attributes.lineNumbers = true;
          }
        },
      },
      {
        name: "line-numbers-post",
        postprocess: (html, options: any) => {
          if (options?.attributes?.lineNumbers) {
            return html.replace(/<pre /g, "<pre data-linenumbers ");
          }
          return html;
        },
      },
    ],
  }),
);

export default async function markdownToHtml(markdown: string) {
  return markdownIt.render(markdown);
}
```

The vast majority of this setup was for a custom transformer that allows these special keywords after the triple backticks in Markdown.

````md
```sql line-numbers
SELECT id, SUM(amount)
FROM some_table st
JOIN other_table ot
ON st.id = ot.id
WHERE active = true
GROUP BY ot.id
```
````

This then adds a `data-linenumbers` attribute to the pre element

```html
<pre data-linenumbers="">
```

And this attribute allows me to render line numbers via a CSS counter.

```css
pre[data-linenumbers] code {
  counter-reset: step;
  counter-increment: step 0;
}

pre[data-linenumbers] code .line::before {
  content: counter(step);
  counter-increment: step;
  width: 1rem;
  margin-right: 1rem;
  display: inline-block;
  text-align: right;
  color: rgba(115, 138, 148, 0.4);
}
```

I previously [**blogged about CSS counters**](/blog.master.dev/css-counters-in-action.md), and of course, the complete code for this sample blog [is on GitHub (<VPIcon icon="iconfont icon-github"/>`arackaf/tanstack-blog-blog-post`)](https://github.com/arackaf/tanstack-blog-blog-post).

Now we can see our post.

![](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/04/img3.png?resize=987%2C1024&ssl=1)

And our line numbers work:

![](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/04/img4.png?resize=1024%2C349&ssl=1)

---

## On to Part 2

Our blog is set up and working. In Part 2 (coming soon!), we’ll look at some simple tricks for deploying our blog as a static site with no server dependencies.

::: info Article Series

```component VPCard
{
  "title": "Building a Blog in TanStack (Part 1 of 2)",
  "desc": "A site building framework like TanStack Start can be used to make a server-side rendered blog, no problemo. ",
  "link": "/blog.master.dev/building-a-blog-in-tanstack-part-1-of-2.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "Building a Blog in TanStack (Part 2 of 2)",
  "desc": "A blog is a perfect use case for pre-rendering, so that the static build files can render all on their own. TanStack Start can even help with the server functions via middleware.",
  "link": "/blog.master.dev/building-a-blog-in-tanstack-part-2-of-2.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Building a Blog in TanStack (Part 1 of 2)",
  "desc": "A site building framework like TanStack Start can be used to make a server-side rendered blog, no problemo. ",
  "link": "https://chanhi2000.github.io/bookshelf/blog.master.dev/building-a-blog-in-tanstack-part-1-of-2.html",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
