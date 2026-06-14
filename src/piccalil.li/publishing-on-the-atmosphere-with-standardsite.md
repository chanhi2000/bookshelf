---
lang: en-US
title: "Publishing on the Atmosphere with Standard.site"
description: "Article(s) > Publishing on the Atmosphere with Standard.site"
icon: fa-brands fa-node
category:
  - Node.js
  - Article(s)
tag:
  - blog
  - piccalil.li
  - node
  - nodejs
  - node-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Publishing on the Atmosphere with Standard.site"
    - property: og:description
      content: "Publishing on the Atmosphere with Standard.site"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/piccalil.li/publishing-on-the-atmosphere-with-standardsite.html
prev: /programming/js-node/articles/README.md
date: 2026-06-25
isOriginal: false
author:
  - name: Declan Chidlow
    url: https://piccalil.li/author/declan-chidlow
cover: https://piccalil.b-cdn.net/api/og-image?slug=publishing-on-the-atmosphere-with-standardsite/
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Node.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-node/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Publishing on the Atmosphere with Standard.site"
  desc="It's the summer of Standard.site and overwhelmingly, we've heard folks find the process complicated so Declan Chidlow is here to break the process down into something rather straightforward for you. "
  url="https://piccalil.li/blog/publishing-on-the-atmosphere-with-standardsite"
  logo="https://piccalil.li/favicons/favicon.ico"
  preview="https://piccalil.b-cdn.net/api/og-image?slug=publishing-on-the-atmosphere-with-standardsite/"/>

[<VPIcon icon="fas fa-globe"/>Standard.site](https://standard.site/) provides a set of lexicons for publishing long-form content on the internet using the same protocol used under the hood by Bluesky.

If you are wondering what ‘lexicons’ and ‘the Atmosphere’ are, don’t fret. This article will explain what they mean, why you should care about Standard.site, and walk you through exactly how you can implement Standard.site using some simple JavaScript or a plugin for your favourite content management system.

---

## What Standard.site is and why you should care

If Bluesky is the network’s answer to short-form microblogging, think of Standard.site as its equivalent for blogs, newsletters, and long-form journalism.

At its core, Standard.site is an open schema that dictates how articles and essays should be formatted as data. When you publish a blog post normally, it lives on your website and relies on scrapers or RSS feeds to be shared. By adopting the Standard.site lexicon, your long-form content becomes a natively understood piece of data on the decentralised web.

One of the most overt benefits we get from defining Standard.site lexicons for our publication are enhanced rich embeds on Bluesky, like this:

![A mock bluesky post showing a linked blog post, featuring a richer UI experience with direct call to action to view publisher](https://piccalil.b-cdn.net/images/blog/standard-site-bluesky-post.png?auto=format&w=1500)

We also get many other benefits. For example, I was surprised to see that the professional identity network Sifa ID [<VPIcon icon="fas fa-globe"/>displayed my posts upon my profile](https://sifa.id/p/vale.rocks#publications). It was also pleasant to see my posts naturally populate on readers like [<VPIcon icon="fas fa-globe"/>pckt](https://pckt.blog/), [<VPIcon icon="fas fa-globe"/>Docs.surf](https://docs.surf/), [<VPIcon icon="fas fa-globe"/>potatonet](https://potatonet.app/), and [<VPIcon icon="fas fa-globe"/>Leaflet](https://leaflet.pub/) without any additional work on my part.

The strength of AT Protocol is that data is interoperable and can be shared, which plays into the strength of Standard.site, which is that a single set of well structured-schemas. The result is that various indexers and tools can all work with the available data in their own ways, knowing how it’ll be structured. Your content can be moved between hosts without losing your data or the audience you’ve built, and there is no single controlling authority. To get further into this, however, we must first establish an understanding of the AT Protocol.

---

## Understanding the AT Protocol

To implement Standard.site, you will want to understand the Authenticated Transfer Protocol (known colloquially as the ‘AT Protocol’ or ‘atproto’) at least at a surface level. The AT Protocol is a decentralised system designed to give users ownership of their data.

To explain it at its simplest, you have a Personal Data Server (PDS) which hosts user accounts. Currently, the largest PDS is provided by Bluesky, but anyone can run their own. A PDS holds lots of user accounts, and each user account can hold records, which are data.

Each user account can be identified by a globally unique DID (Decentralised Identifier) that acts as their permanent ID. A DID looks like this: `did:plc:7qg6mz2xtzozxkgbcvf4pdnu`. Each account also has a handle, which comes in the form of a DNS record. We can see this in that people on Bluesky’s PDS who haven’t configured a custom domain for their account have a handle like this: `bsky.bsky.social`. If you navigate to that in a browser, it’ll take you to the Bluesky page.

<SiteInfo
  name="Bluesky"
  desc="Social media as it should be. Find your community among millions of users, unleash your creativity, and have some fun again."
  url="https://bsky.social/about/"
  logo="https://bsky.social/about/images/favicon-16x16.png"
  preview="https://bsky.social/about/images/social-card-default-gradient.png"/>

Each account features a data repository that holds collections of JSON records. These JSON records must follow specific structures called lexicons. Lexicons are just schemas, like JSON-Schema or OpenAPI, which define how the JSON must be structured and formatted. Records are put into ‘collections’, which we can think of as folders. A collection is identified by a Namespace Identifier (NSID) which makes reference to a domain to identify schemas.

Let’s run through an example with Bluesky so we can really get a handle on things. When a user signs up to Bluesky, a `self` record is created in the `app.bsky.actor.profile` collection of that user’s data repository with information about the account, like its name and profile description. Piccalilli’s looks something like this:


```json
{
  "uri": "at://did:plc:lyk2pixxcmyeu4jrapaq26fy/app.bsky.actor.profile/self",
  "cid": "bafyreihzo3igobmunvk6tmsaqgyatyw5gona4kiayvm2f62lymc5dzqjvu",
  "value": {
    "$type": "app.bsky.actor.profile",
    "createdAt": "2024-08-01T12:44:51.324Z",
    "description": "Level up your front-end skills. Stay for the approachable, friendly content and go away with transferable skills you can use day to day.",
    "displayName": "Piccalilli"
  }
}
```

Then, every time a post is made, or the Piccalilli account likes something, or blocks someone, or does anything else on Bluesky, a new record is created to represent that action. For instance, when Piccalilli reposts something, a new record is created under the `app.bsky.feed.repost` collection.

**Almost everything is a record, inside a collection, under a user account (identified by a DID), on a PDS.**

Notably, everything on ATProto is public. There is no concept of private records, which means we can go out and inspect or reference all the data on the protocol. There are a number of tools for inspecting AT Protocol data, but [<VPIcon icon="fas fa-globe"/>Taproot](https://atproto.at/) and [<VPIcon icon="fas fa-globe"/>PDSLs](https://pdsls.dev/) are my favourites. Search for your account handle, and you’ll be greeted by your underlying records. Have a poke around to help wrap your head around the structure and how everything fits together.

---

## The two core records

Now we’ve (hopefully) got at least (somewhat) of a (fledgeling) understanding of AT Protocol, we can start hooking up Standard.site. To get started with Standard.site, we need to create two specific types of records in your AT Protocol repository:

1. A Publication Record, which defines information about our publication itself.
2. Document Records, which contain information about individual articles themselves.

It is these records that Bluesky and the rest of the Atmosphere will reference. You can [<VPIcon icon="fas fa-globe"/>create them any one of a number of ways](https://atproto.com/guides/writing-data#writing-data). AT Protocol is very open, and you can create records via a variety of methods, but for the purposes of this article, I’ll be showing a JavaScript approach using the official [<VPIcon icon="fas fa-globe"/>`@atproto/api`](https://npmx.dev/package/@atproto/api) npm package.

You will need to authenticate to create these records. The easiest way to do so is by creating an app password under Privacy and Security in Bluesky’s settings. An app password gives access to your account and looks like this: `fg2g-xob3-xl78-5ezy`.

::: note FYI

An app password gives *full* access to your account and bypasses multi-factor authentication. Be *extremely* careful with it. It is a secret, and you should take extreme care of it. This illustrative code shows including the app password inline, but you should consider putting it in an environment variable.

If you think your app password has been made public, you should revoke it, which can be done through the same interface you created it.

:::

### Publication record

The first step in support is having a publication record adhering to the [<VPIcon icon="fas fa-globe"/>`site.standard.publication` lexicon](https://standard.site/docs/lexicons/publication/). You only need to create this record once per-publication.

Using the AT Protocol SDK, you can authenticate and create this underlying JSON record for your site with the script below, replacing the template values here with your publication’s details.

For the purpose of illustration, this script only sets required properties.

```jsx :collapsed-lines
import { AtpAgent } from "@atproto/api";

// Initialise the agent (use your specific PDS if not on Bluesky)
const agent = new AtpAgent({ service: "<https://bsky.social>" });

async function createPublicationRecord() {
  // 1. Authenticate (Always use an App Password, never your main password)
  await agent.login({
    identifier: "your-handle.bsky.social",
    password: "your-app-password",
  });

  const did = agent.session.did;

  // 2. Define the Publication Record
  const publicationRecord = {
    $type: "site.standard.publication",
    url: "<https://example.com>",
    name: "My Awesome Blog",
  };

  // 3. Write the record to your repository
  try {
    const response = await agent.com.atproto.repo.createRecord({
      repo: did,
      collection: "site.standard.publication",
      record: publicationRecord,
    });

    console.log("Publication record created!");
    console.log("Your AT-URI is:", response.data.uri);
  } catch (error) {
    console.error("Failed to create publication:", error);
  }
}

createPublicationRecord();
```

If this script was successful, it should output a message reading ‘Publication record created!’, followed by an AT-URI. Save this, because we’ll need it later. In the future if we need to amend this record, we can [<VPIcon icon="fas fa-globe"/>revise the record directly](https://atproto.com/guides/writing-data#updating-records).

### Theming

Though the above script is great, we can take it a bit further and add some more pizazz by [<VPIcon icon="fas fa-globe"/>defining a theme](https://standard.site/docs/lexicons/theme/). You can create a theme to lend some more style to how your content displays in readers and how Bluesky embeds it. This is done by adding theming fields to your publication record. You need to specify a `background`, `foreground`, `accent`, and `accentForeground`. If you’re setting any of these values, you must set *all* of them.

Bluesky uses `accent` and `accentForeground` like so:

![A diagram pointing out the accent and accentForeground in the context of the call to action button](https://piccalil.b-cdn.net/images/blog/standard-site-theme-diagram.png?auto=format&w=1500)

You should check that your foreground and background and accent and accent foreground all have appropriate contrast. Bluesky previously took these values directly, but now they do [some contrast adjustment of their own (<VPIcon icon="fa-brands fa-bluesky"/>`esb.lol`)](https://bsky.app/profile/esb.lol/post/3mnilfmgqns2d).

You, unfortunately, cannot change the text which appears on the Bluesky embed button, which will always be ‘View Publication’ if you publish yourself. Some external Standard.site enabled services have their own special buttons with custom text and icons, but these are hard coded in the Bluesky client.

### Verifying your publication

Next, we have the optional step of creating a file at <VPIcon icon="fas fa-folder-open"/>`/.well-known/site.standard.publication` containing the AT-URL outputted by our record creation script. This verifies that your domain controls your publication record.

Most services, Bluesky included, don’t require this verification. Indeed, some hosts might not let you write to the <VPIcon icon="fas fa-folder-open"/>`/.well-known` path. However, if you *can* create a file named `site.standard.publication` within <VPIcon icon="fas fa-folder-open"/>`/.well-known` and put your AT-URL within it, your publication will be more widely supported. This verification only needs to be done once.

You can check this has been created correctly by going to your URL on your site. For example, for my personal website, I can visit [<VPIcon icon="fas fa-globe"/>vale.rocks/.well-known/site.standard.publication](https://vale.rocks/.well-known/site.standard.publication) in my browser and see my AT-URI:

```plaintext
at://did:plc:7qg6mz2xtzozxkgbcvf4pdnu/site.standard.publication/3mn2c332ulp2u
```

### Document records

Now that your publication record exists, you need to create per-document records following the [<VPIcon icon="fas fa-globe"/>`site.standard.document` lexicon](https://standard.site/docs/lexicons/document/). Every document needs its own record.

Standard.site supports having your document’s content in the record, which is the approach that Offprint, pckt, Leaflet, and some other publishing platforms use. Whether you do this is up to you.

If you *do* include the content, then it can be displayed natively in Standard.site reader applications, and Bluesky embeds will provide a reading time estimate. For the purpose of this script, I’ll again only be including required properties.

```js
import { AtpAgent } from "@atproto/api";
const agent = new AtpAgent({ service: "<https://bsky.social>" });

async function publishDocumentRecrd() {
  await agent.login({
    identifier: "your-handle.bsky.social",
    password: "your-app-password",
  });

  const did = agent.session.did;

  // 1. Define the Document Record
  const documentRecord = {
    $type: "site.standard.document",
    site: `at://your-did/site.standard.publication/your-pub-rkey`, // Full AT-URI of your publication
    title: "My New Post",
    publishedAt: "2026-06-11T00:00:00.000Z",
  };

  // 2. Write the record to your repository
  try {
    const response = await agent.com.atproto.repo.createRecord({
      repo: did,
      collection: "site.standard.document",
      record: documentRecord,
    });

    console.log("Success! Document record published to the Atmosphere:");
    console.log(response.data.uri);
  } catch (error) {
    console.error("Failed to publish document:", error);
  }
}

publishDocumentRecord();
```

If this script was successful, it should output a message reading ‘Success! Document record published to the Atmosphere:’, followed by an AT-URI. Save this, because we need it to verify the document.

### Verifying your document

To complete the two-way verification, the HTML `<head>` of your live article must contain a link tag pointing back to the document record you just created:

```html
<link rel="site.standard.document" href="at://did:plc:your-did/site.standard.document/the-record-rkey" />
```

Once these ends are tied together, your webpage and document record point to each other, and clients across the decentralised web can seamlessly reference the record.

### Adding images

If you look through the Standard.site docs at all, you might notice references to icons and cover images. To make use of these, [<VPIcon icon="fas fa-globe"/>we must upload a *blob*](https://atproto.com/guides/images-and-video), which is what unstructured data (like images) within a repository are called.

We need to upload the blob first, so that we can refer to it with a reference in our record. Here is an example of uploading an image as a blob and then referencing it to use it as a cover image.

```js :collapsed-lines
import fs from "fs";
import { AtpAgent } from "@atproto/api";
const agent = new AtpAgent({ service: "<https://bsky.social>" });

async function uploadImageAndPublishDocument() {
  await agent.login({
    identifier: "your-handle.bsky.social",
    password: "your-app-password",
  });

  const did = agent.session.did;

  // 1. Read the local image file into a buffer
  const imageBuffer = fs.readFileSync("./path/to/your/cover.jpg");

  // 2. Upload the blob to your repository
  const { data: blobResponse } = await agent.com.atproto.repo.uploadBlob(
    imageBuffer,
    { encoding: "image/jpeg" }
  );

  console.log("Blob successfully uploaded!");

  // 3. Define the Document Record, attaching the returned blob reference
  const documentRecord = {
    $type: "site.standard.document",
    site: `at://your-did/site.standard.publication/your-pub-rkey`,
    title: "My New Post with a Cover Image",
    publishedAt: "2026-06-18T12:00:00.000Z",
    cover: blobResponse.blob, // This links the blob to your document
  };

  // 4. Write the document record to your repository
  try {
    const response = await agent.com.atproto.repo.createRecord({
      repo: did,
      collection: "site.standard.document",
      record: documentRecord,
    });

    console.log("Document record with cover image published:");
    console.log(response.data.uri);
  } catch (error) {
    console.error("Failed to publish document:", error);
  }
}

uploadImageAndPublishDocument();
```

---

## Setting up Standard.site on CMS platforms

If writing JavaScript to push records manually sounds tedious, or you’re already using a major content management system, you might prefer to have the process handled for you. How you integrate Standard.site depends very much on how your own site is built, and some platforms have ready-made integrations via plugins that handle all of the above behind the scenes:

- **WordPress:** Has [<VPIcon icon="fa-brands fa-wordpress"/>the ATmosphere plugin](https://wordpress.org/plugins/atmosphere/) and [<VPIcon icon="fa-brands fa-wordpress"/>the Wireservice plugin](https://wordpress.wireservice.net/).
- **CraftCMS:** Has [<VPIcon icon="fas fa-globe"/>a plugin simply called Standard.site](https://plugins.craftcms.com/standard-site).
- **Obsidian:** Has a [community plugin (<VPIcon icon="iconfont icon-github"/>`SootyOwl/obsidian-standard-site`)](https://github.com/SootyOwl/obsidian-standard-site).
- **Static sites**: Generators like 11ty, Hugo, Astro, and Jekyll can use a dedicated CLI tool called [<VPIcon icon="fas fa-globe"/>Sequoia](https://sequoia.pub/).

---

## Checking it works

Obviously, creating all these records and configuring all this Standard.site business is a bit useless if it doesn’t actually work. The easiest way to test is by just plopping a link to a post on Bluesky and hoping it embeds, but if it doesn’t, it can feel a tad opaque when it comes to figuring out what went wrong.

To rectify this, you can [<VPIcon icon="fas fa-globe"/>make use of Standard.site Validator](https://site-validator.fly.dev/) by [<VPIcon icon="fas fa-globe"/>Thomas Karpiniec](https://octet-stream.net/). Consider returning to [<VPIcon icon="fas fa-globe"/>Taproot](https://atproto.at/) or [<VPIcon icon="fas fa-globe"/>PDSLs](https://pdsls.dev/) to study and review your records. Both will let you know if anything fails to validate and where things went awry.

---

## Further reading

For some further reading, Piccalilli’s own [<VPIcon icon="fas fa-globe"/>Mat Marquis](https://wil.to/), creator of the [<VPIcon icon="fas fa-globe"/>JavaScript for Everyone](https://piccalil.li/javascript-for-everyone) course, has written his own posts documenting his [<VPIcon icon="fas fa-globe"/>understanding of](https://wil.to/posts/standard-site/) and [<VPIcon icon="fas fa-globe"/>implementation of](https://wil.to/posts/implementing-standard-site/) Standard.site on his own blog.

If you want to have multiple Standard.site publications under a single domain, then Jason Lengstorf has [<VPIcon icon="fas fa-globe"/>an in-depth guide on the Code.TV blog](https://codetv.dev/blog/multiple-standard-site-publications-on-one-website).

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Publishing on the Atmosphere with Standard.site",
  "desc": "It's the summer of Standard.site and overwhelmingly, we've heard folks find the process complicated so Declan Chidlow is here to break the process down into something rather straightforward for you. ",
  "link": "https://chanhi2000.github.io/bookshelf/piccalil.li/publishing-on-the-atmosphere-with-standardsite.html",
  "logo": "https://piccalil.li/favicons/favicon.ico",
  "background": "rgba(253,208,0,0.2)"
}
```
