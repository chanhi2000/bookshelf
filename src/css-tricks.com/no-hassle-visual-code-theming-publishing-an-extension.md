---
lang: en-US
title: "No Hassle Visual Code Theming: Publishing an Extension"
description: "Article(s) > No Hassle Visual Code Theming: Publishing an Extension"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - VSCode
  - Article(s)
tag:
  - blog
  - css-tricks.com
  - css
  - vscode
  - visualstudiocode
  - productivity
head:
  - - meta:
    - property: og:title
      content: "Article(s) > No Hassle Visual Code Theming: Publishing an Extension"
    - property: og:description
      content: "No Hassle Visual Code Theming: Publishing an Extension"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/no-hassle-visual-code-theming-publishing-an-extension.html
prev: /programming/css/articles/README.md
date: 2026-02-03
isOriginal: false
author:
  - name: Zell Liew
    url : https://css-tricks.com/author/zellwk/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/11/vs-code-highlight.jpg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "CSS > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/css/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "VSCode > Article(s)",
  "desc": "Article(s)",
  "link": "/tool/vscode/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="No Hassle Visual Code Theming: Publishing an Extension"
  desc="You’d think that publishing a VS Code extension is an easy process, but it’s not. You have to publish your theme in at least two places."
  url="https://css-tricks.com/no-hassle-visual-code-theming-publishing-an-extension"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/11/vs-code-highlight.jpg"/>

[**Creating your theme is the fun part.**](/css-tricks.com/no-hassle-visual-studio-code-theming-building-an-extension.md) After you’re done, the next step is to publish your theme so you — and others — can enjoy your creation!

You’d think that publishing a VS Code extension is an easy process, but it’s not. (Maybe I’m used to the ease of publishing npm packages and take registries for granted.)

Anyway, you have to publish your theme in two places:

1. [<VPIcon icon="iconfont icon-vscode"/>Visual Studio Marketplace](https://marketplace.visualstudio.com) for VS Code users
2. [<VPIcon icon="fas fa-globe"/>Open VSX](https://open-vsx.org) for other text editors

You might also want to publish to [<VPIcon icon="fa-brands fa-npm"/>npm](https://npmjs.com) for others to use your theme easily for other contexts — like syntax highlighting via [<VPIcon icon="iconfont icon-shiki"/>Shiki](https://shiki.style/guide/).

---

## Preparing your theme

When you name your theme, you cannot put it under a scope like `@scope/theme-name`. Doing so will prevent you from publishing to Open VSX.

So, make sure your theme name is unscoped. (The `theme` word is optional):

```js
{
  "name": "twilight-cosmos-theme",
}
```

To include an icon for your theme, you need a `128px` square image file that can be accessible within your project. Put this under the `icon` property to point to the file:

```js
{
  "icon": "path/to/icon.png",
}
```

Next, you want to ensure that you have a [<VPIcon icon="iconfont icon-vscode"/>`contributes`](https://code.visualstudio.com/api/references/contribution-points) key in your <VPIcon icon="iconfont icon-json"/>`package.json` file. VS Code and other text editors search for this to find themes.

```js
{
  "contributes": {
    "themes": [
      {
        "label": "<Theme Name>",
        "uiTheme": "vs-dark",
        "path": "./<path-to-theme>.json"
      }
    ]
  },
}
```

Finally, you want to include several keywords to make your theme searchable on both VS Marketplace and Open VSX.

If you’re having problems with this, give AI your theme file and ask it to generate keywords for you 😉

```js
{
  "keywords": [
    "theme",
    "dark theme",
    "twilight",
    "cosmos",
    "color-theme",
    "dark",
    "purple",
    "blue",
    "vscode-theme"
  ],
}
```

---

## Publishing to Visual Studio Marketplace

Microsoft lets you publish to Visual Studio Marketplace via [<VPIcon icon="fa-brands fa-npm"/>`@vscode/vsce`](https://npmjs.com/package/@vscode/vsce) if you have a personal access token from an [<VPIcon icon="iconfont icon-microsoftazure"/>Azure DevOps account](https://azure.microsoft.com/en-us/products/devops/?nav=min).

Unfortunately, while creating this article, I encountered several problems setting up my Azure Devops account so I had to publish my extension via the manual route.

I’ll talk about both routes here.

Before publishing, you need to have a Visual Studio Marketplace account. So, [<VPIcon icon="iconfont icon-vscode"/>sign up](https://marketplace.visualstudio.com) for one if you don’t have it yet.

Then do the following:

- Click on **Publish Extension**.
- Create a publisher account.

This step is needed for publishing both via `vsce` and the manual route.

### Publishing via VSCE

For this to work, you need a Azure DevOps account. When you have that, you can create a Personal Access Token with [<VPIcon icon="iconfont icon-vscode"/>these steps](https://code.visualstudio.com/api/working-with-extensions/publishing-extension#get-a-personal-access-token).

Note: It’s kinda irritating that you can’t have an lifetime access token with Azure DevOps. The maximum expiry is about one year later.

Also note: I had immense trouble creating my Azure DevOps account when I tried this — the back end kept hanging and I couldn’t find the right page, even when I copy-pasted the URL! Anyway, don’t be alarmed if this happens to you. You might just need to wait 1-2 days before you try again. It will work, eventually.

Once you have the personal access token, the rest of the steps is pretty straightforward.

First, you login to VSCE with your publisher ID that you created in Visual Studio Marketplace. (Insert the publisher ID, not the user ID!).

```sh
npx vsce login <PUBLISHER_ID>
```

You’ll have to insert the access token when it asks you to. Then, run the next command to publish to the marketplace:

```sh
npx vsce publish
```

And you’re done!

### Publishing manually

You’ll have to follow this route if you had problems with the personal access token like I did. Thankfully, it’s pretty straightforward as well. You can go to Visual Studio Marketplace and do the following:

- Click on **Publish Extensions**.
- Click **New Extension**.
- Use the `vsce package` command to package your extension as a [<VPIcon icon="iconfont icon-vscode"/>`visx` file](https://learn.microsoft.com/en-us/visualstudio/extensibility/anatomy-of-a-vsix-package?view=vs-2022).
- Drag and drop the packaged `visx` file to upload your extension.

![Sowing a dialog window with instructions to upload a Visual Code extension with drag and drop.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/11/CleanShot-2025-11-11-at-16.00.56.png?resize=544%2C289)

That’s it!

### Getting verified on Visual Studio Code

If this is your first extension, you can only get “verified” on the Visual Studio Marketplace if your extension is at least six months old. So, if you want to get verified, set a reminder in six months and [<VPIcon icon="iconfont icon-vscode"/>visit this page](https://code.visualstudio.com/api/working-with-extensions/publishing-extension#verify-a-publisher) for more information.

---

## Publishing to Open VSX

Thanks to Claude, I understood VS Code uses the Visual Studio Marketplace, but other text editors, like Cursor, use [<VPIcon icon="fas fa-globe"/>Open VSX](https://open-vsx.org).

Publishing to Open VSX is a bit more complex. You have to:

- Login to Open VSX via GitHub.
- Create an [<VPIcon icon="iconfont icon-eclipse"/>Eclipse Foundation](https://auth.eclipse.org/auth/realms/community/protocol/openid-connect/auth?response_type=code&client_id=open-vsx-org&scope=openid%20profile%20email%20openvsx_publisher_agreement&state=Rx2_vmdvfW1oPPlcyMn6sm1PSPFhE-60hRWEovGfymM%3D&redirect_uri=https://open-vsx.org/login/oauth2/code/eclipse&nonce=0QgnG2_pujB-H0jmkLITcNSC8GO3HKsfWGp-QOeNqls) account
- Link your GitHub repository to the Eclipse Foundation account.
- Sign their agreement.
- Create a [<VPIcon icon="fas fa-globe"/>publisher namespace](https://open-vsx.org/user-settings/namespaces) and add this as the `publisher` in your <VPIcon icon="iconfont icon-json"/>`package.json` file.
- Create an [<VPIcon icon="fas fa-globe"/>access token](https://open-vsx.org/user-settings/tokens).
- Then, finally, run `npx ovsx publish` to publish your package.

Likewise, `ovsx` will ask you for a personal access token when you try to publish for the first time. Thankfully, `ovsx` seems to have a lifetime access token seems so we don’t have to worry about it expiring.

### Claiming the publisher namespace

This is essentially getting “verified” with Open VSX, but Open VSX calls it “claiming” the publisher namespace to get verified. Without harping on the language too much — this process takes a bit of to-and-fro but can be done now (instead of six months later).

Once you have created a publisher namespace, you’ll see a glaring warning sign:

![Bright orange warning banner that says, This namespace is not verified. See the documentation to learn about claiming namespaces.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/11/CleanShot-2025-11-12-at-11.38.47%402x.png?resize=1096%2C194)

To claim the publisher namespace, you need to [create a GitHub issue with Eclipse Foundation (<VPIcon icon="iconfont icon-github" />`EclipseFdn/open-vsx.org`)](https://github.com/EclipseFdn/open-vsx.org/issues/new/choose) and state that you want to claim the namespace.

In that issue:

- Include your GitHub repository (if you make it publicly available).
- Offer to give access temporarily to your GitHub repository (if it’s private).

And someone will handle the rest.

The team at Eclipse Foundation seems to be pretty responsive, so I wouldn’t worry about communication breakdown here.

---

## Including images for your theme

It makes sense to include images to showcase your theme in the `Readme.md` file. Doing so allows users to get a sense of your theme colors before deciding whether they want to download it.

Unfortunately, both VS Marketplace and Open VSX do not allow you to use relative URLs — images will be broken if you use relative links from your repository — so you have to link to an absolute URL instead.

The best place to link to is the GitHub repository, as long as it is set to public access.

The URL will be something like this:

```md
![Alt Text](https://raw.githubusercontent.com/<github_username>/<repo-name>/master/<path-to-image>)
```

---

## Wrapping up

It can be tedious to publish your first VS Code editor theme. But don’t let that process stop you from letting you — and others – enjoy your theme!

If you’re wondering, my first theme is called Twilight Cosmos. You can find out more about the creation process [**in my previous article**](/css-tricks.com/no-hassle-visual-studio-code-theming-building-an-extension.md).

Enjoy the (somewhat frustrating) process! You’ll finish it before you know it.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "No Hassle Visual Code Theming: Publishing an Extension",
  "desc": "You’d think that publishing a VS Code extension is an easy process, but it’s not. You have to publish your theme in at least two places.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/no-hassle-visual-code-theming-publishing-an-extension.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
