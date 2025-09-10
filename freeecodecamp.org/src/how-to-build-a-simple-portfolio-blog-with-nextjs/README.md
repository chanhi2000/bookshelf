---
lang: en-US
title: "How To Build A Simple Portfolio Blog With Next.js"
description: "Article(s) > How To Build A Simple Portfolio Blog With Next.js"
icon: iconfont icon-nextjs
category:
  - Node.js
  - Next.js
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
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How To Build A Simple Portfolio Blog With Next.js"
    - property: og:description
      content: "How To Build A Simple Portfolio Blog With Next.js"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-simple-portfolio-blog-with-nextjs/
prev: /programming/js-next/articles/README.md
date: 2025-05-30
isOriginal: false
author:
  - name: Chidiadi Anyanwu
    url : https://freecodecamp.org/news/author/chidiadi01/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1747235586248/7424bce0-24da-4f70-a5aa-31249d799094.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Node.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-next/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How To Build A Simple Portfolio Blog With Next.js"
  desc="I have written articles on different platforms including LinkedIn, The Network Bits (Substack), and freeCodeCamp. So I wanted to bring all of these articles together in a single place where someone could go and see all my work. A blog sounded like a ..."
  url="https://freecodecamp.org/news/how-to-build-a-simple-portfolio-blog-with-nextjs"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1747235586248/7424bce0-24da-4f70-a5aa-31249d799094.png"/>

I have written articles on different platforms including LinkedIn, The Network Bits (Substack), and freeCodeCamp. So I wanted to bring all of these articles together in a single place where someone could go and see all my work.

A blog sounded like a good solution for this, so I set out to build one. In this article, I will walk you through how I did it with Next.js.

The basic idea here was to build a website where I wouldn’t need to write code in the future. I just wanted to be able to add the URL of a new article to a JSON file, and the website would extract information like the title, date, cover image, and description and then update itself with it. No database.

To understand how I would go about it, I checked the metadata of the HTML text from each of the platforms I considered. I used my articles, of course, like the one in the project folder. I found out that most of them used Open Graph metadata. So, that was easy to scrape. But, I also found out that some information wasn’t in the meta tags - instead, it was in the JSON-LD. At the end of the day, I ended up using both in my functions.

(1/5) [How the Blog Site Works](#heading-how-the-blog-site-works)
(2/5) [The Structure of an Article on the Blog](#heading-what-does-an-article-look-like)
(3/5) [How the Search Feature Works](#heading-how-does-the-search-feature-work)
(4/5) [The Project Structure](#heading-project-structure)
(5/5) [Steps to Build the Blog](#heading-steps-to-build-the-blog)

::: note Prerequisites

Understanding this article requires some knowledge of programming and web development. You need to have basic knowledge of HTTP, HTML, CSS, JavaScript, and React to be able to follow along easily.

If you don't have those skills, you may still be able to understand the general structure and working principles.

:::

---

## How the Blog Site Works

The project consists of client components and server components. It is a website, so ideally, it's just a front-end. But it has to fetch data from URLs - and doing that from the client-side won’t work due to CORS blocking, as the requests will be emanating from a browser. So, it has to run on the server.

![Home page calling the fetch articles function.](https://cdn.hashnode.com/res/hashnode/image/upload/v1748524048812/76baf11d-a80a-4d07-beba-065c74536541.png)

The `fetchArticles()` function runs on the server - then this happens:

![Rough flowchart showing what happens in the fetchArticles function](https://cdn.hashnode.com/res/hashnode/image/upload/v1748536836320/9813a669-ac07-480a-8270-6f2f36ceda22.png)

The `fetchArticles()` function accesses the URLs, extracts and processes the HTML and JSON Linked Data objects from the response, and returns an array of Article objects to the Home page.

![fetch articles function gets called and returns an array of Article objects](https://cdn.hashnode.com/res/hashnode/image/upload/v1748536952680/35fec49a-6c44-4978-9acb-755eb5ed810f.png)

The `HomePage` component is a client side component that has another component in it, named `HomeClient`. This `HomeClient` is a client side component. It has to be because it has useState hooks.

But the `HomePage` component calls the `fetchArticles()` function and sets the `articles` constant (which is an array of `Article` objects, as defined by the interface in the <FontIcon icon="fa-brands fa-react"/>`ArticleCard.tsx` file). The `articles` constant is then passed down to the `HomeClient` component as a prop.

![The HomePage component, and its child component, HomeClient.](https://cdn.hashnode.com/res/hashnode/image/upload/v1746881308147/1fedcbb0-f9d4-47dd-afea-b7f231595a58.png)

Inside the `HomeClient` component, there are two components - the `Hero` component, and the `MainBody` component. The Hero component shows the welcome message, and also has the search bar. The MainBody component is where the tags and the article grid are. Logic for filtering articles are also in the MainBody component.

![The Hero and MainBody components inside the HomeClient component.](https://cdn.hashnode.com/res/hashnode/image/upload/v1746881333468/267d0158-df41-4a1d-8098-e3219fe7db4d.png)

Inside the MainBody component, there is the `ArticleCard` component that takes the filtered array of Article objects from the MainBody as props, and renders an article card for each. These cards are rendered inside the grid in the MainBody component.

### What does an article look like?

The articles are defined by an interface:

```ts
export interface Article {
  id: number;
  title?: string;
  description?: string;
  publishedDate?: string;
  url: string;
  imgUrl?: string;
  siteName?: string;
  tags?: string[];
}
```

The interface, as shown above, specifies that the object will have eight properties, of which only the `id` and `url` are compulsory. Those compulsory properties are actually what’s needed in the JSON file from which the web server will read.

When the URL is visited by the server, the title, description, and other properties (except the tags) are obtained automatically and populated. Then the object is created.

![Article card renderings](https://cdn.hashnode.com/res/hashnode/image/upload/v1746881670519/a2cbdbbf-6cfd-40e7-91e5-5da711198dc7.png)

The article cards consist of the article’s cover image, the name of the platform where it was published, the date published, the title, and a description. All of this is wrapped in an anchor linking to the URL. The tags are not visible on the cards, but are used in filtering operations.

![Array of Article objects in browser console.](https://cdn.hashnode.com/res/hashnode/image/upload/v1746881715907/7ab4ad87-7da6-44e2-8329-35bcb999b825.png)

### How does the search feature work?

There's a reason why the Hero component and the MainBody component are in the same parent component. That wasn't my initial design, but after I saw that the search bar would look better in the Hero component, and that I needed to set the `searchTerm` state in the Hero component and use it in the MainBody component, that became the best option for me: to put both of them in the same parent, so I could pass down the useState hook as props into both of them.

The search feature works basically by filtering the `articles` array based on the tags selected, or the search term entered. Here is what the code looks like:

```tsx :collapsed-lines
 useEffect(() => {
    const anyTagActive = isActive.some((val) => val);

    const filtered = articles.filter((article) => {
      console.log('Search term: ' + searchTerm || 'searchTerm');
      const searchMatch =
        article.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.tags?.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        article.siteName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.publishedDate?.toLowerCase().includes(searchTerm.toLowerCase());


        console.log('This is the searchMarch: ' + searchMatch || 'FALSE searchMatch');
        console.log(article.title || 'article.title no wan show');

      const tagMatch = article.tags?.some((tag) => {
        const index = tags.indexOf(tag);
        return index !== -1 && isActive[index];
      }) || false;

      if (anyTagActive) {
        return tagMatch && searchMatch; // Only return articles if tag is active and search matches
      }

      return searchMatch; // If no tags active, return all that match the search term
    });

    setFilteredArticles(filtered);
  }, [articles, searchTerm, isActive]);
```

Here, we use a `useEffect()` hook to monitor for changes in the `articles`, `searchTerm`, and `isActive` constants. `isActive` is a `useState()` hook that has an array of boolean values the length of the tags array.

```ts
const [isActive, setIsActive] = useState(tags.map(() => false));
```

Here, the `filtered` constant is equal to the filtered values of `articles`.

```ts
const filtered = articles.filter();
```

Inside the [<FontIcon icon="fa-brands fa-firefox"/>filter method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) is where the arrow function with the logic for filtering is written - `(article) => {//logic}`. We have two constants: `tagMatch` and `searchMatch`. The `searchMatch` constant is true when the title, description, tags, site name, or published date includes the search term. Else, it's false. The `tagMatch` constant is true when any tag from the article's array of tag is present in the tag list, and also has a corresponding `isActive` value of true.

If any tag at all is active, then the results for both `tagMatch` and `searchMatch` are returned, but if no tag at all is active, then only the `searchMatch` is returned as true.

The filtered article list is what is then passed into the `ArticleCard` component.

```tsx
<ArticleCard articles={filteredArticles} />
```

---

## Project Structure

![This is what the project file structure looks like:](https://cdn.hashnode.com/res/hashnode/image/upload/v1748605144895/e56eea92-8851-4717-ae82-0e15f70dc31f.png)

At the root, we have the config files and `node_modules` which is not displayed here. The `public` folder holds all the images and icons. Then, in the `src` folder, we have `app`, `component`, and `utils`.

The `components` folder holds the files for the components - the nav bar, footer, hero, main body and article card. The `utils` folder has all the functions that run in the background and do not need to render anything. The `fetchArticles` function is there, along with other functions for extracting the date published, title, description, image URL, and others from HTTP responses gotten from the article URLs. The `app` folder has the favicon, the global CSS stylesheet, the `page` and `layout` files, `articles.json` which is the JSON file where I add new article URLs for rendering, a test HTML file (wsl.html), and the `about/` and `api/` directories.

Inside the about folder, we have the about page, and inside the API folder, we have tthe folder, `metadata-local-test` which is no longer relevant to the project. I used it initially to create an internal API to fetch from the URLs. But I later restructured the codebase.

---

## Steps to Build the Blog

### 1. Install Next.js

To install Next.js, navigate to the folder where you want the project to reside and open that location in your terminal. Then type the following:

```sh
npx create-next-app@latest
```

You're going to be met with the following prompts:

![Installing Next.js](https://cdn.hashnode.com/res/hashnode/image/upload/v1746881930473/228a02f7-6571-46f0-9503-d4606e19bd10.png)

### 2. Navigate to your newly created project folder and install dependencies

In the newly created project folder, run the project in development mode to preview your newly created Next project. You will be shown a message directing you to localhost on port 3000. Now, it's time for us to start creating what we want.

![Success! Navigating to the project directory.](https://cdn.hashnode.com/res/hashnode/image/upload/v1746882046144/df46e975-14f2-4dc9-81d7-5bbb9a344f7b.png)

Now, one more thing you'll need to do. In the project, I used lucide-react to get one of the icons, and cheerio to extract data from the HTML. So, you’ll need to install those dependencies.

To install lucide-react, use this command in the project folder:

```sh
npm install lucide-react
```

Then install cheerio:

```sh
npm install cheerio
```

### 3. Change the title and description in the page metadata

The title is what shows up at the top of your browser tab when you open up the website. Right now, it should be showing 'Create Next App.' We don't want that.

Since this is not just HTML, there is no <FontIcon icon="fa-brands fa-html5"/>`index.html` to change the title in the header element. Rather, Next.js provides us a `Metadata` object we can use to change things like that. And it'll be in the <FontIcon icon="fa-brands fa-react"/>`layout.tsx` file in the <FontIcon icon="fas fa-folder-open"/>`app` or <FontIcon icon="fas fa-folder-open"/>`src` folder. Head over there and change it to whatever you want the title to be. I’m using “Chidiadi Portfolio Blog”.

![Changing metadata](https://cdn.hashnode.com/res/hashnode/image/upload/v1746882205569/b652a7de-00b7-4f0d-943c-4f80a62a7f91.png)

### 4. Create the necessary components

Navigate to the side panel, and under the <FontIcon icon="fas fa-folder-open"/>`src` folder, create a components folder. This is where the components will live. Here, create the article card, footer, main body and nav bar.

![Components folder](https://cdn.hashnode.com/res/hashnode/image/upload/v1746882335350/69d1f7ed-ea67-47e7-8b0a-e25429190a3e.png)

For the **Navbar**, this is the code:

```tsx title"Navbar.tsx"
export default function Navbar() {
    return(
        <>
        <div className="text-3xl md:text-base flex w-[100vw] md:w-[98.2vw] lg:w-[98.8vw] h-[60px] bg-black text-white px-0 md:px-7 md:py-2 items-center justify-center md:justify-between">
            <h1 className="font-bold">CHIDIADI   ANYANWU</h1>
            <div className="hidden md:block flex space-x-4">
                <a href="/" className="hover:text-gray-400">Blog</a>
                <a href="/about" className="hover:text-gray-400">About</a>    
            </div>
        </div>
        </>
    );
}
```

Here's what the **Hero** component looks like:

```tsx :collapsed-lines title="Hero.tsx"
"use client";

import { Search } from 'lucide-react';
import { useState } from 'react';

interface HeroProps {
    searchTerm: string;
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  }
export default function Hero({ searchTerm, setSearchTerm }: HeroProps) {
    const [buttonColor, setButtonColor] = useState('');

    return (
        <div className="bg-[url('/img-one-1.jpg')] bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center h-[400px] relative">
           <div className=" absolute inset-0 bg-black opacity-60"></div> 
            <h1 className="text-4xl text-white font-bold text-center z-10">My Portfolio Blog</h1>
            <p className="mt-4 mx-4 text-xlarge text-white md:text-xl text-justify md:text-center z-10" style={{ fontFamily: "Cormorant Garamond" }}>
                My name is Chidiadi Anyanwu. I am a technical writer with a strong background in networking. 
                I write about Networking, Cloud, DevOps, and even sometimes web development like this one. I built this
                website with Next.js, and there's also an <a href="/" className="text-blue-500 hover:text-blue-700 hover:underline">article about that.</a>
                  This website holds my technical articles in one place. It is a repository of my written works.
            </p>
            <div id="searchbar" className="h-9xl mt-4 flex align-items-center justify-center w-full" >

                <form onSubmit={(e) => {e.preventDefault();  setSearchTerm(searchTerm);}} className="group mt-4 relative w-[70%] md:w-[50%]">
                    <input  value={searchTerm} onChange={(e) => setSearchTerm(e.target.value) } onFocus={()=>{setButtonColor('bg-blue-500'); console.log('input focused')}} onBlur={()=>{setButtonColor('');}}type="search" placeholder="Search Chidiadi's articles" className="h-[50px] w-full px-[48px] border-3 border-blue-300 rounded-[25px] focus:outline-none focus:border-blue-500 text-black bg-white"/>
                    <button className={`h-[42px] w-[42px] absolute right-0 mr-1.5 mt-1 rounded-[50%] bg-blue-300 ${buttonColor}`}>
                        <Search  className='m-auto text-white'/>
                    </button>
                </form>

            </div>
        </div>
    );
}
```

In this file, we created the HeroProps interface to accept the search props. Then we deconstructed both `searchTerm` and `setSearchTerm` from it as props to the Hero component. We’ll make it a client component `'use client'` because of the buttonColor `useState()` hook that changes when the search bar is clicked and sets the search button background color.

The **MainBody** component looks like this:

```tsx :collapsed-lines title="MainBody.tsx"
"use client";

import { useEffect, useState } from 'react';
import ArticleCard, { Article } from './ArticleCard';

interface MainBodyProps {
  searchTerm: string;
  articles: Article[];
}

export default function MainBody({ searchTerm, articles }: MainBodyProps) {
  // Get articles from JSON file and create array of article objects

  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);

  const tags = ["Networking", "Cloud", "DevOps", "Web Dev", "Cybersecurity"];
  const [isActive, setIsActive] = useState(tags.map(() => false));


  // Filter articles based on search term and active tags
  useEffect(() => {
    const anyTagActive = isActive.some((val) => val);

    const filtered = articles.filter((article) => {
      console.log('Search term: ' + searchTerm || 'searchTerm');
      const searchMatch =
        article.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.tags?.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        article.siteName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.publishedDate?.toLowerCase().includes(searchTerm.toLowerCase());


        console.log('This is the searchMarch: ' + searchMatch || 'FALSE searchMatch');
        console.log(article.title || 'article.title no wan show');

      const tagMatch = article.tags?.some((tag) => {
        const index = tags.indexOf(tag);
        return index !== -1 && isActive[index];
      }) || false;

      if (anyTagActive) {
        return tagMatch && searchMatch; // Only return articles if tag is active and search matches
      }

      return searchMatch; // If no tags active, return all that match the search term
    });

    setFilteredArticles(filtered);
  }, [articles, searchTerm, isActive]); 

  console.log(filteredArticles);

  return (
    <div className='scroll-smooth'>
      <div id="tags" className="flex w-full h-[200px] md:h-[60px] justify-center gap-5 py-4 flex-wrap max-w-[100vw] scroll-smooth">
        {tags.map((tag, index) => (
          <p
            key={index}
            onClick={() => {
              const newIsActive = [...isActive];
              newIsActive[index] = !newIsActive[index];
              setIsActive(newIsActive);
            }}
            className={`h-[48px] w-[140px] border-3 rounded-[40px] px-2 py-2 text-center font-bold ${
              isActive[index]
                ? 'bg-black border-black text-white hover:bg-gray-700 hover:border-gray-700'
                : 'border-blue-500 hover:bg-blue-500 hover:text-white'
            }`}>
            {tag}
          </p>
        ))}
      </div>

      <div id="articlegrid" className="w-[100vw] md:w-[98vw] grid gap-2 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mt-5 px-3 py-3">
        <ArticleCard articles={filteredArticles} />
      </div>
    </div>
  );
}
```

Here, we have props from the parent component too, but we only need the articles fetched and the search term. We don't need to set the fetch term from this component.

To render the tags, I first created the array of tags and an array of boolean values to record the states of the tags (whether they're active or inactive).

```tsx
const tags = ["Networking", "Cloud", "DevOps", "Web Dev", "Cybersecurity"];
const [isActive, setIsActive] = useState(tags.map(() => false));
```

Then, inside the return statement, I mapped through the tag array to render them one by one. The onClick event handler also works here to make sure that the `isActive` state for that particular tag is toggled when it is clicked.

So how does this work? It creates a new array called `newIsActive` that is a copy of the `isActive` array. It then gets the particular tag by index number and inverts it. Then it sets the `isActive` array to this new array.

```tsx
{tags.map((tag, index) => (
          <p
            key={index}
            onClick={() => {
              const newIsActive = [...isActive];
              newIsActive[index] = !newIsActive[index];
              setIsActive(newIsActive);
            }} . . .
```

This is the code for the **ArticleCard**:

```tsx :collapsed-lines title="ARticleCard.tsx"
import React, { useState } from 'react';
import Image  from 'next/image';

export interface Article {
  id: number;
  title?: string;
  description?: string;
  publishedDate?: string;
  url: string;
  imgUrl?: string;
  siteName?: string;
  tags?: string[];
}

interface ArticleProps {
  articles: Article[];
}

const ArticleCard = ({ articles }: ArticleProps) => {

  return (
    <>
    {articles ?

      (articles.map((item, id) => (
        //anchor tag for the link
        <a key={id}  href={item.url} className='max-w-[350px] mx-auto mb-5'>
            <div className="sm:w-[350px] hover:brightness-70" data-title={item.title} data-description={item.description} data-published-date={item.publishedDate} data-tag="Networking" data-site-name={item.siteName}>
            <Image
              src={item.imgUrl || '/img-2.jpg'} 
              alt={item.title || 'Article Image'}
              width={350}
              height={400}
              className="object-cover rounded-[10px]"
            />
            <div className="flex h-[43px] text-[14px] text-gray-500 gap-2">
                <p id="Platform" className="py-2 h-[42px] md:text-sm mt-auto mb-auto">{item.siteName}</p>
                <div className="h-1 w-1 bg-black rounded-full mt-auto mb-auto bg-gray-500"></div>
                <p id="publishedDate" className="py-2 h-[42px] mt-auto mb-auto">{item.publishedDate}</p>
            </div>
            <h1 id="titleOfArticle" className="font-bold text-base md:text-3xl">{item.title}</h1>
            <br/>
            <p className='w-full md:w-[350px]'>{item.description}</p>
            </div>
        </a>
      )))
      :

      ( Array(6).fill(0).map((item, id) => (
        <div key={id} className="w-full md:w-[350px] h-[350px] bg-gray-500 mx-auto mb-5 hover:brightness-80 rounded-[10px] animate-pulse"></div>
      )))
    }
    </>
  );
};

export default ArticleCard;
```

Here, we defined and exported the `Article` interface so that we can create `Article` objects in the `MainBody`. Then, we created an interface to pass down the props of an array of `Article` objects.

Next, there's this part to ensure it renders something even if for some reason no Article object was passed:

```tsx
{
    article?
    ( {/*If article exists, render this*/} )
    :
    ( {/*Else, render this */} )
}
```

Our fail-safe here is an empty array of six objects with the Tailwind `animate-pulse`:

```tsx
(Array(6).fill(0).map((item, id) => (
    <div key={id} className="w-full md:w-[350px] h-[350px] bg-gray-500 mx-auto mb-5 hover:brightness-80 rounded-[10px] animate-pulse"></div>
)))
```

I could have made this part much better, but I was feeling a little lazy. I also used the `Image` from Next, instead of the regular `img`. This requires that you edit the <FontIcon icon="iconfont icon-typescript"/>`next.config.ts` file. I had to go add all the paths that the images could possibly be loaded from:

![<FontIcon icon="iconfont icon-typescript"/>`next.config.ts`](https://cdn.hashnode.com/res/hashnode/image/upload/v1746882422600/e3ad4762-1199-4276-a524-d27519a37c52.png)

Just like in the screenshot above, the syntax is:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
        {
            protocol:"https",
            hostname:"licdn.com",
            pathname:"/**"
        },
        {
            protocol:"",
            hostname:"",
            pathname:""
        }
        ],
    },
};
export default nextConfig;
```

It takes a `remotePatterns` array that consists of remote pattern objects, which have a protocol, hostname, and pathname property. Make sure the protocol and hostname properties are not empty like in the second object in the code sample above. That would cause errors. It’s either the objects are populated properly or they’re deleted.

The **Footer** looks like this:

```tsx title="Footer.tsx"
export default function Footer() {

    return (
        <footer className="bg-gray-100 text-center py-4 mt-10">
            <div className="flex align-items-center justify-center text-sm text-blue-400 font-bold">
                <a href="/" className="hover:text-blue-600">Home</a>
                <p> &nbsp; &nbsp; | &nbsp; &nbsp; </p>
                <a href="/about" className="hover:text-blue-600">About</a>
            </div>
            <p className="text-sm text-gray-600">© {new Date().getFullYear()} Chidiadi Anyanwu. All rights reserved.</p>
            <p className="text-sm text-gray-600">Built with Next.js and Tailwind CSS</p>
        </footer>
    );

}
```

This `new Date().getFullYear()` helps me get the current year all the time.

### 5. Place the components properly

The nav bar and footer components are things that will not change no matter the page you visit. So they should be placed in a more permanent and untouched location. We can put both of them in the root <FontIcon icon="fa-brands fa-react"/>`layout.tsx` file like this:

![<FontIcon icon="fa-brands fa-react"/>`layout.tsx` file](https://cdn.hashnode.com/res/hashnode/image/upload/v1746882493175/3d7381ca-48c6-43c1-becc-8692c6b090c4.png)

```tsx
<body className={`${geistSans.variable} ${geistMono.variable} antialiased scroll-smooth`}>
  <Navbar />
  {children}
  <Footer />
</body>
```

`{children}` is where the contents from <FontIcon icon="fa-brands fa-react"/>`page.tsx` will enter. So, we sandwiched all the other content in the Nav bar and footer. Apart from adding `<link />` tags for fonts (because this is where the root HTML is), we really don't have business with this file again.

Now, in the same <FontIcon icon="fas fa-folder-open"/>`app/` folder where this layout file is, create the `<HomeClient />` file. This is how it looks:

```tsx title="HomeClient.tsx"
'use client';

import { useState } from 'react';
import Hero from '../components/hero';
import MainBody from '../components/mainbody';
import { Article } from '../components/ArticleCard';

interface Props {
  initialArticles: Article[];
}

export default function HomeClient({ initialArticles }: Props) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [articles, setArticles] = useState<Article[]>(initialArticles);

  return (
    <div>
      <Hero searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <MainBody searchTerm={searchTerm} articles={articles} />
    </div>
  );
}
```

Then, put the `HomeClient` component inside the <FontIcon icon="fa-brands fa-react"/>`page.tsx` file:

```tsx title="page.tsx"
import { fetchArticles } from '../utils/fetchArticles';
import HomeClient from './HomeClient';

export const revalidate = 3600;

export default async function HomePage() {
  const articles = await fetchArticles(); 

  return <HomeClient initialArticles={articles} />;
}
```

The server is set to fetch the articles at build time, and fetch again (revalidate) every hour (3600s). So, it doesn't fetch the articles from the URLs upon user request of the page.

Initially, it worked by fetching any time the component was mounted, but I noticed that this caused the page to load very slowly. The articles didn't pop-up on time, because there's a lot of fetching to be done.

In that same <FontIcon icon="fas fa-folder-open"/>`app/` directory, create an <FontIcon icon="fas fa-folder-open"/>`about/` folder, and create the <FontIcon icon="fa-brands fa-react"/>`page.tsx` for that route:

```tsx :collapsed-lines title="page.tsx"
import Image from "next/image";
export default function About() {
    return (
        <>
            <div className="flex items-center justify-center">
                <div className="margin-auto w-[90vw] md:w-[60vw] lg:w-[50vw] h-[450px] hover:bg-gray-100 border-1 md:border-2 border-gray-200 shadow-sm flex flex-wrap  items-center justify-center gap-2 mt-10 mb-10 rounded-lg">
                    <Image
                        src="/MyPhotoChidiadi.jpg" 
                        alt="Avatar"
                        className="rounded-[50%] h-30 w-30"
                        width={120} 
                        height={120} 
                    />
                    <div className="w-[90%] mx-auto">
                        <h1 className="text-xl text-center my-1 font-bold">About Me</h1>
                        <p className="text-justify my-3">
                            My name is Chidiadi Anyanwu. I love breaking down complex concepts.
                            I write about Networking, Cloud, DevOps, and even sometimes web development. 
                            You can connect with me by following any of the links below.
                        </p>
                        <hr className="border-gray-300 my-3" />
                        <div className="flex gap-7 w-full my-3 justify-center"> 
                            <a href="https://github.com/chidiadi01">
                                <Image src='/github-icon.svg' alt="github logo" width={24} height={24} />
                            </a>
                            <a href="https://linkedin.com/in/chidiadi-anyanwu">
                                <Image src='linkedin-icon.svg' alt="linkedin logo" width={24} height={24}/>
                            </a>
                            <a href="https://x.com/chidiadi01">
                                <Image src='x-2.svg' alt="x logo" width={24} height={24}/> 
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
```

### 6. Create the <FontIcon icon="fas fa-folder-open"/>`utils` folder and all the functions

The next step is to create all these files.

![<FontIcon icon="fas fa-folder-open"/>`utils` folder](https://cdn.hashnode.com/res/hashnode/image/upload/v1746947058303/01b6fd3d-3666-46fe-8928-1ad5b1532625.png)

Under the same <FontIcon icon="fas fa-folder-open"/>`app/` directory, create the <FontIcon icon="fas fa-folder-open"/>`utils/` folder. <FontIcon icon="fas fa-folder-open"/>`app/utils/`. Then start with the `fetchArticles()` function. The `fetchArticles()` function is what accesses the API route in the project to obtain the array of Article objects from an array of URLs. The `fetchArticles()` function returns an array of those objects which are then stored in the `articles` variable. It looks like this:

```tsx :collapsed-lines
import { getPublishedDate } from './getPublishedDate';
import { getTitle } from './getTitle';
import { getImageURL } from './getImageURL';
import { getDescription } from './getDescription';
import { getPlatform } from './getPlatform';
import articleFile from '../app/articles.json';
import { Article } from '../components/ArticleCard';
import * as cheerio from 'cheerio';

export async function fetchArticles(): Promise<Article[]> {
  console.log('Fetching articles...');
  const results = await Promise.all(
    articleFile.articles.map(async (item) => {
      //Validate URL first
       if (!item.url || typeof item.url !== 'string' || item.url.trim() === '') {
        console.warn(`Invalid URL: ${item.url}`);
        return null; // Skip this item
      } 
      console.log('The URL: ' + item.url);
      let data;
      try {

        // Fetch metadata and HTML from the URL
        const response = await fetch(item.url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Referer': 'https://www.google.com/', 
          },
        });

        console.log('Fetched: '+ item.url);

        if (!response.ok) {
          console.error(`HTTP error! Status: ${response.status} for URL: ${item.url}`);
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const html = await response.text();
        const $ = cheerio.load(html);
        const jsonScript = $('script[type="application/ld+json"]').html();

        console.log('Gotten HTML response');

        if (!jsonScript) {
          throw new Error('No JSON-LD script found on page');
        }

        const metadata = JSON.parse(jsonScript);
        console.log('Gotten metadata');


        // Combine metadata and HTML into a single object
        data = { metadata, html };
      } catch (error) {
        console.error(`Failed to fetch metadata for URL: ${item.url}`, error);
        return null;
        console.log('The default empty object has been returned here');
      }

      // Use the combined data (metadata and HTML) to construct the article object
      if(getTitle(data) && getDescription(data) &&
         getPublishedDate(data) && getImageURL(data) &&
         getPlatform(data) || (item.title && item.description &&
         item.image)) {
        return {
        ...item,
        id: item.id ?? 0,
        tags: item.tags ?? [],
        title: getTitle(data) || item.title || 'No title',
        description: item.description || getDescription(data) || 'No description',
        publishedDate: getPublishedDate(data) ?? 'No date',
        imgUrl: getImageURL(data) || item.image || '/img-2.jpg',
        siteName: getPlatform(data) || data.metadata?.publisher?.name || 'Unknown site',
        url: item.url || '',
      } as Article;
      console.log('Proper item returned');
      } else { return null; }
    })
  );

  // Filter out null values and sort the articles by published date in descending order
  const filteredResults = results.filter((article): article is Article => article !== null);
  const sortedResults = filteredResults.sort((a, b) => {
    const dateA = new Date(a.publishedDate || '').getTime();
    const dateB = new Date(b.publishedDate || '').getTime();
    return dateB - dateA;
  });
  console.log(sortedResults);
  return sortedResults;
}
```

It maps through the articles in the articleFile, which is the JSON file with an array of objects with article URLs. For each of them, it sends a request to the URL, and from the data gotten, returns an Article object. Then, the array of objects created, `results`, is first filtered to remove null objects, and [<FontIcon icon="fa-brands fa-firefox"/>sorted](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) in descending order by their date properties. So, the latest article shows up first.

It’s then assigned in the `HomeClient` component:

```ts
const articles = await fetchArticles();
```

In the `fetchArticles()` code above, you can see that some other functions were used to extract the properties from the URLs, and assign them. Also, during deployment, I found that Substack couldn’t be accessed by the server, so I’m going to add code to allow creation of Article objects from an RSS feed. That will be in the [project repository (<FontIcon icon="iconfont icon-github"/>`chidiadi01/simple-writer-portfolio`)](https://github.com/chidiadi01/simple-writer-portfolio/tree/main/01-simple-blog).

Now, let's talk about the other functions.

#### The `getTitle()` function:

```tsx
import * as cheerio from 'cheerio';

export function getTitle(data:any): string {
  if (!data) return 'Title Loading . . .';

  if (data?.html) {
    const $ = cheerio.load(data?.html);
    const ogTitle = $('meta[property="og:title"]').attr('content') || $('title').text();
    return ogTitle;
  }

  return 'The Title of The Article';
}
```

This is a very simple function. It takes the `data` parameter, and if there's no data, it returns `Title loading . . .`. But if there is data, it checks to see if there's HTML in the data. If there is, it then uses cheerio to load the HTML text and extract the title from the Open Graph `title` metadata or from the `<title>` tag in the HTML header. Else, it returns `The Title of the Article`.

Here, we use jQuery-like syntax `$` to select the HTML elements, like in `$('title')`. The data taken as a parameter is the response gotten from a HTTP request to the article's URL.

#### The `getDescription()` function:

```tsx
import * as cheerio from 'cheerio';

export function getDescription(data: any): string {
  if (!data) return 'Description Loading . . .';

  if (data?.metadata || data?.html) {
    const $ = cheerio.load(data?.html || '');
    const description = data?.metadata?.description ?? $('meta[property="og:description"]').attr('content') ?? 'No description found';
    return description;
  }

  return 'No description found';
}
```

#### The `getURL()` function:

```tsx
import * as cheerio from 'cheerio';

export function getURL(data: any): string{
  if (!data) return 'url';

  if (data?.metadata || data?.html){
    const $ = cheerio.load(data?.html);
    const url = data?.metadata.url || $('meta[property="og:url"]').attr('content');
    return url;
  }
  return 'url';
}
```

This function is not really used to get the URL of the article for use in the object. Rather, it is used to get the URL for another function, `getPlatform()`. It works the same way as the ones we discussed before.

#### The `getPlatform()` function:

```tsx
import { getURL } from './getURL';

export function getPlatform(data: any): string {
  if (!data) return 'Platform1';

  const url = getURL(data);

  if (data?.html) {
    const regex = /^(?:https?:\/\/)?(?:www.)?([^\/\n]+).(?:[a-zA-Z]{2,})/;
    const platform = url.match(regex);
    return platform?.[1].toUpperCase() || 'Platform2'; 
  }

  return 'Platform3';
}
```

This function is meant to extract the name of the platform where the article is posted. I toyed with various ideas for how this should work. One of them was using the `siteName` property in the OG meta tags, but I realised from my inspection that not all platforms had it populated in a helpful way. So, the results gotten from that method would be too unpredictable.

So I decided to use [**regex (Regular Expressions)**](/freecodecamp.org/practical-regex-guide-with-real-life-examples.md) to extract the site name from the URL. As you can see from the code, I didn't achieve a perfect result, but it is usable.

First of all, it gets the URL of the article with the `getURL()` function. Then, it uses regex:

```plaintext
/^(?:https?:\/\/)?(?:www.)?([^\/\n]+).(?:[a-zA-Z]{2,})/
```

Here, `/` and `/` at the beginning and end are to start and end the regex string. The caret `^` marks the beginning of a line.

Then, we have four groups `()()()()`. The first one is a non-captured group `(?: )`. That means whatever text that matches that should be grouped together in a string, but should not be captured to be assigned to the variable. It captures any text with a 'http' in it, with or without the s `s?`, and with two slashes after. The forward slashes were escaped with backward slashes so they can be recognised as literal characters. Then, the whole group itself is made optional by adding the question mark after it `(...)?`. So, whether such a group is matched or not, the code works.

The second group is also a non-capturing group, also denoted by `?:` being the first thing inside the bracket. This one matches any 'www.' in the string. It's also optional. A URL may not necessarily be written with it.

The third group is a capturing group as it doesn't have `?:` inside the brackets. Rather, it has a character class in it `[]`. But it's a negated class `[^ ]`. It makes sure that the class does not contain a newline character `n` (the newline character n is not a string of letter n - that's why it is escaped) or a forward slash `/`, because a URL is supposed to be one line, and not multiple lines. The `+` means one or more characters, `([^\/\n]+)`. Whatever is in this group will get captured in the variable.

Then, the next one matches a dot (it is escaped with a backslash `.`). After that is the last group which is also non-capturing and matches any character which is alphanumeric, capital or small letter `[a-zA-Z]`, that occurs more than two times `{2, }`.

So, if we have `'https://www.linkedin,com'` we would have an array of captured groups `['https://www.linkedin.com','https://','www.','linkedin','com']`. Group 1 = 'https://', group 2 = 'www.', group 3 ='linkedin', group 4 = 'com'. But since only group 3 is a captured group, others will be discarded, and we have an array with only two items, the full string, and the captured group: `['https://www.linkedin.com','linkedin']`.

So, here, we return the second item in the array. The first item is always the full string we matched.

```ts
return platform?.[1].toUpperCase()
```

This doesn't account for sub domains, though. This is tricky because sometimes you want to use the name of the subdomain (as in my Substack), and sometimes you want to use the name of the domain. So, I left it like that.

![Image of an article with platform showing THENETWORKBITS.SUBSTACK](https://cdn.hashnode.com/res/hashnode/image/upload/v1746947172558/7f0f47c0-a1d5-4db7-a8e5-d45d1116aaac.png)

#### The `getImageURL()` function:

```tsx
import * as cheerio from 'cheerio';

export function getImageURL(data: any): string {
  if (!data) return '/img-2.jpg'; 

  if (data?.metadata || data?.html) {
    const $ = cheerio.load(data?.html);
    const ogImage = $('meta[property="og:image"]').attr('content') || data?.metadata.image;
    return ogImage || '/img-2.jpg'; 
  }

  return '/img-2.jpg'; 
}
```

This function works just like others, and obtains the cover image URL from either the Open Graph image meta tag `$('meta[property="og:image"]').attr('content')` or `||` the image property in the JSON-LD data `data?.metadata.image`.

#### The `getPublishedDate()` function:

```tsx
import * as cheerio from 'cheerio';

export function getPublishedDate(data: any): string {

  if (!data) return 'Date';

  const publishedDate = data?.metadata?.datePublished;

  if (publishedDate) {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(publishedDate).toLocaleDateString('en-US', options);
  }

  if (data?.html) {
    const $ = cheerio.load(data?.html);
    const ogPublishedTime = $('meta[property="article:published_time"]').attr('content') ||
                            $('meta[property="og:published_time"]').attr('content') || 
                            $('meta[name="pubdate"]').attr('content');

    if (ogPublishedTime) {
      const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(ogPublishedTime).toLocaleDateString('en-US', options);
    }
  }
  return 'Date';
}
```

This function is especially useful because of the need to convert the date from the ISO 8601 format (2025-04-07T10:47:19+00:00) to the more readable format I want (April 7, 2025). Here, I used the `.toLocaleDateString()` JavaScript function to make it work (see the ([<FontIcon icon="fa-brands fa-firefox"/>MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString)).

### 7. Create your JSON file

Now, remember that we're building this to be able to pull URLs from a JSON file to put together and render the web page. That JSON file is the starting point of everything. I believe by now you're getting an error concerning that. So we need to create the JSON file.

In the <FontIcon icon="fas fa-folder-open"/>`app/` directory, create a new file and name it <FontIcon icon="iconfont icon-json"/>`articles.json`.

![The <FontIcon icon="fas fa-folder-open"/>`app/` directory](https://cdn.hashnode.com/res/hashnode/image/upload/v1746947297567/ed6b282b-971e-428b-a7b6-9d6bf5e44520.png)

Then populate it like in this file below - an array of objects with id, URL, tags, and so on. Even though we are not trying to get the title, description, and everything from this file directly, I put in that feature. If you go back to our `fetchArticles()` function, you'll see that for most of the properties, whatever you write here will override what was gotten from the URLs.

It was partly a fail-safe because I thought that LinkedIn would block all requests, and as you can see from my blog already, some description tags were not well organized. So, we can replace them later with a cleaner description just by modifying this file.

```json title="articles.json"
{
    "articles": [
        {
            "id": 1,
            "url": "https://thenetworkbits.substack.com/p/an-overview-of-json",
            "tags": ["Web Dev", "DevOps", "Cloud"],
            "title": "",
            "description": "",
            "image": ""
        },
        {
            "id": 2,
            "url": "https://websecuritylab.org/how-safe-is-public-wi-fi-a-network-engineer-explains/",
            "tags": ["Networking", "Cybersecurity"],
            "title": "",
            "description": "",
            "image": ""
        },
        {
            "id": 3,
            "url": "https://freecodecamp.org/news/automate-cicd-with-github-actions-streamline-workflow/",
            "tags": ["DevOps"],
            "title": "",
            "description": "",
            "image": ""
        }
    ]
}
```

Here, we have an "articles" object with an array of objects, each of which have "id", "url", "tags", "title", "description", and "image" properties. You don't necessarily need the values of all of these except the ID and URL, but the keys have to be there to prevent errors.

### 8. Add the finishing touches

Now you can add your own favicon in the app directory. It could be a 24px by 24px file, or 48px by 48px file. It doesn't necessarily have to be in the app directory or be an icon file or be named 'favicon' - but I did it that way. You can just add this in the HTML header of your layout.tsx file which is your Next.js version of <FontIcon icon="fa-brands fa-html5"/>`index.html`. The favicon is the icon that shows on the tab in your browser when you open the page.

```html title="index.html"
<link rel="icon" href="/favicon.ico" sizes="any" />
```

You can also read the Next.js documentations on that here: [Metadata Files: favicon, icon, and apple-icon | Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/app-icons). Then add your images to your `public/` directory. Be sure to name them correctly, and reference them correctly.

Now, if your development server was down, spin it up again to see your end results!

```sh
npm run dev
```

![The blog above the fold](https://cdn.hashnode.com/res/hashnode/image/upload/v1746947429494/1134babc-6b26-4f88-99df-7c3c8a2e8ba6.png)

![Articles on the blog](https://cdn.hashnode.com/res/hashnode/image/upload/v1746947441422/5b87e888-a040-4ca1-bc27-7d09e50561ce.png)

![About page](https://cdn.hashnode.com/res/hashnode/image/upload/v1746947455924/64e57b54-feb9-46c9-99c9-8a7260aff45d.png)

---

## Conclusion

If you've read this far, then you must be really interested in seeing the results of all this :) I already have that covered. [<FontIcon icon="fas fa-globe"/>Here's the blog](https://chidiadi-portfolio.vercel.app/). You can go through it and interact with it.

Also, [this is the codebase (<FontIcon icon="iconfont icon-github"/>`chidiadi01/simple-writer-portfolio`)](https://github.com/chidiadi01/simple-writer-portfolio/tree/main/01-simple-blog). Feel free to fork it, clone it, and interact with it as well. If you enjoyed the article, please share it with others. You can also connect with me on [LinkedIn (<FontIcon icon="fa-brands fa-linkedin"/>`chidiadi-anyanwu`)](https://linkedin.com/in/chidiadi-anyanwu) or [X](https://x.com/chidiadi01). Thanks for reading.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How To Build A Simple Portfolio Blog With Next.js",
  "desc": "I have written articles on different platforms including LinkedIn, The Network Bits (Substack), and freeCodeCamp. So I wanted to bring all of these articles together in a single place where someone could go and see all my work. A blog sounded like a ...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-simple-portfolio-blog-with-nextjs.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
