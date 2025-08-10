---
lang: en-US
title: "How to Index Your Next.js Apps Faster Using IndexNow"
description: "Article(s) > How to Index Your Next.js Apps Faster Using IndexNow"
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
      content: "Article(s) > How to Index Your Next.js Apps Faster Using IndexNow"
    - property: og:description
      content: "How to Index Your Next.js Apps Faster Using IndexNow"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-index-nextjs-pages-with-indexnow.html
prev: /programming/js-next/articles/README.md
date: 2024-08-06
isOriginal: false
author:
  - name: Vivek Sahu
    url : https://freecodecamp.org/news/author/viv1/
cover: https://freecodecamp.org/news/content/images/2024/08/IndexNowSites-1.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Next.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-next/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Index Your Next.js Apps Faster Using IndexNow"
  desc="Next.js is a powerful framework for building lightning-fast applications. However, getting these applications indexed quickly by search engines is crucial for visibility and traffic, and sadly, this is not immediate. Even after uploading your sitemap, it can take up to weeks or even months before search engines crawl your pages..."
  url="https://freecodecamp.org/news/how-to-index-nextjs-pages-with-indexnow/"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2024/08/IndexNowSites-1.png"/>

Next.js is a powerful framework for building lightning-fast applications. However, getting these applications indexed quickly by search engines is crucial for visibility and traffic, and sadly, this is not immediate.

Even after uploading your sitemap, it can take up to weeks or even months before search engines crawl your pages. In fact, if you have updated or added any new page, it can take weeks for the search engines to notice.

So, can we do any better?

In this article, you'll learn how to boost your Next.js app's SEO on major search engines like Bing, Yahoo, and so on with fast indexing using IndexNow.

---

## What is IndexNow?

[<FontIcon icon="fas fa-globe"/>IndexNow](https://indexnow.org/) is a protocol that drastically reduces indexing time. Here's how it's defined on their website:

::: info IndexNow Home (<FontIcon icon="fas fa-globe"/><code>indexnow.org</code>)

> IndexNow is an easy way for websites owners to instantly inform search engines about latest content changes on their website. In its simplest form, IndexNow is a simple ping so that search engines know that a URL and its content has been added, updated, or deleted, allowing search engines to quickly reflect this change in their search results.

:::

It's a protocol that is adopted by the likes of Bing, Naver, Seznam.cz, Yandex, Yep and others. Google does not support this protocol as of the writing of this article.

This is natively integrated into many CMS like Wix, and there are many third party plugins for others like Drupal or WordPress. However, there is no native support in NextJS.

### How Does it Work?

Every time you update something, all you need to do is "ping" or call their API and inform them of the change.

When this information is received, the search engines can now prioritize crawling these URLs over the other URLs that are being crawled naturally.

In this guide, we'll walk through the process of integrating IndexNow into your existing Next.js app so that any changes to URLs can be submitted and indexed by the search engines.

### Prerequisites

- A Next.js app.
- A <FontIcon icon="iconfont icon-code"/>`sitemap.xml` for your Next.js app.

### High Level Steps

1. We first need to "prove ownership" of the host for which URLs will be submitted.
2. Create a simple Node.js script to get all URLs from your sitemap.
3. Call the IndexNow API.

### How to Prove Ownership of the Host

Go to the [<FontIcon icon="fas fa-globe"/>`IndexNow`](https://bing.com/indexnow/getstarted) [<FontIcon icon="fas fa-globe"/>page](https://bing.com/indexnow/getstarted) for Bing. Since there is no direct integration for Next.js, scroll down to the section of <FontIcon icon="fas fa-globe"/>[manual integration](https://bing.com/indexnow/getstarted#implementation).

Click on "Generate" to generate a new API Key.

In your Next.js app, go to the <FontIcon icon="fas fa-folder-open"/>`public` directory in your root. All the static content is rendered through this directory. Create a new file and store this API key:

```sh
# Assuming API Key is "f34f184d10c049ef99aa7637cdc4ef04". Change according to yourr generated API Key
echo "f34f184d10c049ef99aa7637cdc4ef04" > f34f184d10c049ef99aa7637cdc4ef04.txt
```

Build and run your Next.js app:

```sh
npm run build && npm run start
```

Then confirm that the file is available in your path <FontIcon icon="fas fa-file-lines"/>`/f34f184d10c049ef99aa7637cdc4ef04.txt`.

That is, opening `https://localhost:3000/f34f184d10c049ef99aa7637cdc4ef04.txt` should give a response with text "f34f184d10c049ef99aa7637cdc4ef04" on your browser.

Depending on your API Key, modify the above key value. Commit, push and deploy this changes to your production.

On successful deployment, verify that `<Your URL>/<API Key>.txt` renders `<API Key>` text. That is: `<Your URL>/f34f184d10c049ef99aa7637cdc4ef04.txt` should render `f34f184d10c049ef99aa7637cdc4ef04`.

### How to Create a Script to Get All URLs from Your Sitemap

First, create the Node script file:

```sh
touch lib/indexnow.js
```

Then add the code below:

```js :collapsed-lines title="lib/indexnow.js"
const xml2js = require('xml2js');

// Configuration
const sitemapUrl = '<Your URL>/<FontIcon icon="iconfont icon-code"/>`sitemap.xml`'; // TODO: Update
const host = '<Your URL>'; // TODO: Update
const key = '<API Key>'; // TODO: Update
const keyLocation = 'https://<Your URL>/<API Key>.txt'; // TODO: Update

const modifiedSinceDate = new Date(process.argv[2] || '1970-01-01');

if (isNaN(modifiedSinceDate.getTime())) {
  console.error('Invalid date provided. Please use format YYYY-MM-DD');
  process.exit(1);
}

function fetchSitemap(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve(data);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

function parseSitemap(xmlData) {
  return new Promise((resolve, reject) => {
    xml2js.parseString(xmlData, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

function filterUrlsByDate(sitemap, date) {
  const urls = sitemap.urlset.url;
  return urls
    .filter(url => new Date(url.lastmod[0]) > date)
    .map(url => url.loc[0]);
}


async function main() {
  try {
    const xmlData = await fetchSitemap(sitemapUrl);
    const sitemap = await parseSitemap(xmlData);
    const filteredUrls = filterUrlsByDate(sitemap, modifiedSinceDate);
    console.log(filteredUrls);
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

main();
```

We basically fetch URLs from the sitemap that have been modified from a certain date. The date can be passed as an argument to the script.

Next, install the <FontIcon icon="fa-brands fa-npm"/>`xml2js` library which we'll use to parse the XML response from sitemap.

```sh
npm install xml2js --save-dev
```

Then run the script to fetch URLs and check if everything works:

```sh
node lib/indexnow.js 2024-01-01
```

This should output a list of URLs that have been modified since 1 Jan, 2024. You can pass any date to it.

### How to Call the IndexNow API

Here's the IndexNow API Schema:

::: tabs

@tab:active Request

```http
POST /IndexNow HTTP/1.1
Content-Type: application/json; charset=utf-8
Host: api.indexnow.org
{
  "host": "www.example.org",
  "key": "7e3f6e8bc47b4f2380ba54aab6088521",
  "keyLocation": "https://www.example.org/7e3f6e8bc47b4f2380ba54aab6088521.txt",
  "urlList": [
      "https://www.example.org/url1",
      "https://www.example.org/folder/url2",
      "https://www.example.org/url3"
      ]
}
```

@tab Response

| HTTP Code | Response | Reasons |
| --- | --- | --- |
| 200 | Ok | URL submitted successfully |
| 400 | Bad request | Invalid format |
| 403 | Forbidden | In case of key not valid (e.g., key not found, file found but key not in the file) |
| 422 | Unprocessable Entity | In case URLs don't belong to the host or the key is not matching the schema in the protocol |
| 429 | Too Many Requests | Too Many Requests (potential Spam) |

:::

Now that we are certain that our URL fetching portion works correctly, let's add the main function to call the IndexNow API:

Open the <FontIcon icon="fas fa-folder-open"/>`lib/`<FontIcon icon="fa-brands fa-js"/>`index.js` file using your favorite IDE and add the following function:

```js :collapsed-lines title="lib/index.js"
function postToIndexNow(urlList) {
  const data = JSON.stringify({
    host,
    key,
    keyLocation,
    urlList
  });

  const options = {
    hostname: 'api.indexnow.org',
    port: 443,
    path: '/IndexNow',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Length': data.length
    }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let responseData = '';
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          statusMessage: res.statusMessage,
          data: responseData
        });
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(data);
    req.end();
  });
}
```

This function makes the call to the IndexNow API by passing a list of URLs that is passed to it, along with the `<API Key>`.

Call this function from the main function. Modify the main function as following:

```js
async function main() {
  try {
    const xmlData = await fetchSitemap(sitemapUrl);
    const sitemap = await parseSitemap(xmlData);
    const filteredUrls = filterUrlsByDate(sitemap, modifiedSinceDate);
    console.log(filteredUrls);

    if (filteredUrls.length > 0) {
      const response = await postToIndexNow(filteredUrls);
      console.log('IndexNow API Response:');
      console.log('Status:', response.statusCode, response.statusMessage);
      console.log('Data:', response.data);
    } else {
      console.log('No URLs modified since the specified date.');
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
}
```

The `IndexNow API` will now be called for every URL that we pass to it.

Run the script, and you should see a similar output on success, or an error message in case of any issues:

```plaintext title="output"
% node lib/indexnow.js 2024-07-24

[
  'https://<Your URL>',
  'https://<Your URL>/page1',
  'https://<Your URL>/page1'
]
IndexNow API Response:
Status: 200 OK
Data:
```

Voila, your APIs can now work with IndexNow for faster indexing.

---

## Next Steps and Improvements

We just looked at how to write and execute a script locally to index our pages via IndexNow. However, there are many things that can be done to improve this further, for instance:

- Integrate IndexNow into your CI/CD pipeline for automatic updates.
- Handle large sitemaps efficiently with batching or queuing.
- Monitor and log IndexNow submissions for debugging and analytics.
- Explore the IndexNow API for additional functionalities (for example: URL deletion).
- Provide CLI version.
- Add TypeScript support.

However, these are out of scope for this article. There are few production ready npm modules that implement some or more of these advanced behaviors that can be easily integrated into your app. I have created one ([<FontIcon icon="fas fa-globe"/>see indexnow-submitter announcement](https://wewake.dev/posts/introducing-indexnow-submitter-fast-search-engine-indexing/)) as well as adding missing features/support in the ecosystem. You can plug and use any of these modules in your Node based applications.

---

## Conclusion

In this article, you learned how to add the `IndexNow` protocol to your Next.js application. You can leverage this protocol to get a much faster, automated and convenient page indexing experience whenever you make any change to your website, allowing search engines to fetch the latest content from your pages.

I hope this was useful, and feel free to experiment and customize this integration further to suit your needs.

::: info Links and References

```component VPCard
{
  "title": "Documentation | IndexNow.org",
  "desc": "Technical and implementation documenation for indexnow. Detailed information for webmasters/website owners on how to use IndexNow protocol. Get information from submitting one URL or set of URLs to the search engines to verifying the ownership of the website with examples.",
  "link": "https://indexnow.org/documentation/",
  "logo": "https://indexnow.org/favicon.ico",
  "background": "rgba(200,0,0,0.2)"
}
```

```component VPCard
{
  "title": "FAQ | IndexNow.org",
  "desc": "Read the frequently asked questions(FAQ) about using IndexNow.",
  "link": "https://indexnow.org/faq/",
  "logo": "https://indexnow.org/favicon.ico",
  "background": "rgba(200,0,0,0.2)"
}
```

```component VPCard
{
  "title": "How to add IndexNow to your website | Bing Webmaster Tools",
  "desc": "Learn to easily add IndexNow to your website. Find CMSs with built-in support, compatible CDNs, and API integration steps for non-supported systems",
  "link": "https://bing.com/indexnow/getstarted?toWww=1&redig=9B1C0B6C2C27465295E720D880B47EF1#implementation/",
  "logo": "https://bing.com/indexnow/Content/img/favicon.ico",
  "background": "rgba(67,118,215,0.2)"
}
```

<SiteInfo
  name="indexnow-submitter"
  desc="An IndexNow Submission module with caching and analytics. Latest version: 1.3.1, last published: a year ago. Start using indexnow-submitter in your project by running `npm i indexnow-submitter`. There are no other projects in the npm registry using indexnow-submitter."
  url="https://npmjs.com/package/indexnow-submitter/"
  logo="https://static-production.npmjs.com/da3ab40fb0861d15c83854c29f5f2962.png"
  preview="https://static-production.npmjs.com/338e4905a2684ca96e08c7780fc68412.png"/>

```component VPCard
{
  "title": "Introducing IndexNow Submitter: Fast Search Engine Indexing",
  "desc": "Introducing IndexNow Submitter, an npm module I created to boost your node app’s SEO with faster indexing using IndexNow protocol.",
  "link": "https://wewake.dev/posts/introducing-indexnow-submitter-fast-search-engine-indexing//",
  "logo": "https://wewake.dev/assets/img/favicons/favicon.ico",
  "background": "rgba(240,248,255,0.2)"
}
```

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Index Your Next.js Apps Faster Using IndexNow",
  "desc": "Next.js is a powerful framework for building lightning-fast applications. However, getting these applications indexed quickly by search engines is crucial for visibility and traffic, and sadly, this is not immediate. Even after uploading your sitemap...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-index-nextjs-pages-with-indexnow.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
